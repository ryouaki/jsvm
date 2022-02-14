const Scope = require('./scope');

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

const InterpreterMap = {
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
    return env[node.name];
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
      runCode(dCode, env);
    }
  },
  VariableDeclarator(node, env) {
    const name = node.id.name
    const value = runCode(node.init, env)

    return env[name] = value;
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
      const bCode = node.body[i]
      
      const name = bCode.label.name;
      const value = runCode(bCode.body);

      ret[name] = value;
    }
    return ret;
  },
  CallExpression(node, env) {
    const ctx = new Scope(env);
    const args = []
    
    const fn = runCode(node.callee, ctx);
    return fn.apply(ctx, args);
  }
}

function runCode (node, env) {
  return InterpreterMap[node.type](node, env);
}

module.exports = runCode;