const { Scope, declareVariable, IValue } = require('./scope');

const operatorMap = {
  '+': function (lv, rv) {
    return lv + rv;
  },
  '-': function (lv, rv) {
    return lv - rv;
  },
  '*': function (lv, rv) {
    return lv * rv;
  },
  '/': function (lv, rv) {
    return lv / rv;
  },
  '==': function (lv, rv) {
    return lv == rv;
  },
  '===': function (lv, rv) {
    return lv === rv;
  },
  '&': function (lv, rv) {
    return lv & rv;
  },
  '~': function (lv, rv) {
    return ~rv;
  },
  '=': function (_lv, rv) {
    return rv;
  },
  '+=': function (lv, rv) {
    return lv + rv;
  },
  '-=': function (lv, rv) {
    return lv - rv;
  },
  '&=': function (lv, rv) {
    return lv & rv;
  },
  '|': function (lv, rv) {
    return lv | rv;
  },
  '|=': function (lv, rv) {
    return lv | rv;
  },
  '^': function (lv, rv) {
    return lv ^ rv;
  },
  '^=': function (lv, rv) {
    return lv ^ rv;
  },
  'true--': function (lv, rv) {
    return --rv;
  },
  'false--': function (lv, rv) {
    return rv--;
  },
  'true++': function (lv, rv) {
    return ++rv;
  },
  'false++': function (lv, rv) {
    return rv++;
  },
  'delete': function (lv, rv) {
    return delete lv[rv];
  },
  '/=': function (lv, rv) {
    return lv / rv;
  },
  '**': function (lv, rv) {
    return lv ** rv;
  },
  '**=': function (lv, rv) {
    return lv ** rv;
  },
  '>': function (lv, rv) {
    return lv > rv;
  },
  '>=': function (lv, rv) {
    return lv >= rv;
  },
  '<': function (lv, rv) {
    return lv < rv;
  },
  '<=': function (lv, rv) {
    return lv <= rv;
  },
  'in': function (lv, rv) {
    return lv in rv;
  }
}

const InterpreterMap = {
  Program(node, env) {
    let ret = undefined;
    const len = node.body.length;
    for (let i = 0; i < len; i++) {
      const pCode = node.body[i];
      ret = runCode(pCode, env)
    }
    return ret;
  },
  ExpressionStatement(node, env) {
    return runCode(node.expression, env);
  },
  BinaryExpression(node, env) {
    const leftRet = runCode(node.left, env);
    if (leftRet === undefined) {
      throw new ReferenceError(`${node.left.name} is not defined`)
    }
    const rightRet = runCode(node.right, env);

    return operatorMap[node.operator](leftRet, rightRet);
  },
  Literal(node, _env) {
    return node.value;
  },
  Identifier(node, env) {
    const val = env[node.name]

    if (val instanceof IValue) {
      return val.value;
    }
    return val;
  },
  MemberExpression(node, env) {
    const ret = runCode(node.object, env);
    return ret[node.property.name];
  },
  ThisExpression(_node, env) { // 需要按照统一的规范去处理type。日后好扩展
    return env;
  },
  VariableDeclaration(node, env) {
    const len = node.declarations.length;
    for (let i = 0; i < len; i++) {
      const dCode = node.declarations[i];
      const declarate = runCode(dCode, env);
      const len = declarate[0].length
      for (let j = 0; j < len; j++) {
        declareVariable(env, declarate[0][j], node.kind, declarate[1][j])
      }
    }
  },
  VariableDeclarator(node, env) {
    const value = !!node.init ? runCode(node.init, env) : node.init;
    const names = []
    const values = []
    if (node.id.type === 'ArrayPattern') {
      const len = node.id.elements.length;
      for (let i = 0; i < len; i++) {
        const ele = node.id.elements[i]
        if (ele.type === 'Identifier') {
          names.push(ele.name);
          values.push(value[i])
        } else if (ele.type === 'RestElement') {
          const name = ele.argument.name;
          const idx = names.indexOf(name)
          if (idx < 0) {
            names.push(name)
            values.push(value.slice(i))
          }
        }
      }
    } else {
      names.push(node.id.name);
      values.push(value);
    }
    
    return [names, values];
  },
  AssignmentExpression(node, env) {
    const lv = node.left
    const rv = runCode(node.right, env)
    let ret = undefined;
    if (lv.type === 'Identifier') {
      env[lv.name] = ret = operatorMap[node.operator](runCode(lv, env), rv);
    } else if (lv.type === 'ArrayPattern') {
      const len = lv.elements.length;
      for (let i = 0; i < len; i++) {
        const ele = lv.elements[i]
        if (ele.type === 'Identifier') {
          env[ele.name] = ret = rv[i]
        } else if (ele.type === 'RestElement') {
          env[ele.argument.name] = ret = rv.slice(i) || []
        }
      }
    }

    return ret;
  },
  ArrayExpression(node, env) {
    const len = node.elements.length;
    const tmpArray = []
    for (let i = 0; i < len; i++) {
      const aCode = node.elements[i];
      tmpArray.push(runCode(aCode, env))
    }
    return tmpArray;
  },
  BlockStatement(node, env) {
    const s = new Scope(env)
    const len = node.body.length
    const ret = {}
    for (let i = 0; i < len; i++) {
      // const bCode = node.body[i]
      
      // const name = bCode.label.name;
      // const value = runCode(bCode.body);

      // ret[name] = value;
    }
    return ret;
  },
  CallExpression(node, env) {
    const ctx = new Scope(env);
    const args = []
    
    const fn = runCode(node.callee, ctx);
    return fn.apply(ctx, args);
  },
  ObjectExpression(node, env) {
    const ret = {}
    const len = node.properties.length;
    for (let i = 0; i < len; i++) {
      const prop = node.properties[i];
      const name = prop.key.name;
      const value = runCode(prop.value, env)
      ret[name] = value;
    }
    return ret;
  },
  ConditionalExpression(node, env) {
    if (runCode(node.test, env)) {
      return runCode(node.consequent, env);
    } else {
      return runCode(node.alternate, env);
    }
  },
  SequenceExpression(node, env) {
    let ret = undefined;
    const len = node.expressions.length;
    for (let i = 0; i < len; i++) {
      const eCode = node.expressions[i];
      ret = runCode(eCode, env);
    }
    return ret;
  },
  UnaryExpression(node, env) {
    if (node.operator === 'delete') {
      return operatorMap[node.operator](runCode(node.argument.object, env), node.argument.property.name);  
    }
    return operatorMap[node.operator](null, runCode(node.argument, env));
  },
  UpdateExpression(node, env) {
    return operatorMap[node.prefix + '' +node.operator](null, runCode(node.argument, env));
  }
}

function runCode (node, env) {
  if (node)
    return InterpreterMap[node.type](node, env);
}

module.exports = runCode;