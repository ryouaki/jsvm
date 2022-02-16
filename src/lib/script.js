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
  }
}

const assignmentMap = {
  '=': function (_lv, rv) {
    return rv
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
      declareVariable(env, declarate[0], node.kind, declarate[1])
    }
  },
  VariableDeclarator(node, env) {
    const name = node.id.name
    const value = runCode(node.init, env)

    return [name, value];
  },
  AssignmentExpression(node, env) {
    const lv = node.left
    const rv = runCode(node.right, env)

    if (lv.type === 'Identifier') {
      env[lv.name] = rv;
    }

    return rv;
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
  }
}

function runCode (node, env) {
  return InterpreterMap[node.type](node, env);
}

module.exports = runCode;