
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
  Literal(node, env) {
    return node.value;
  }
}

function runCode (node, env) {
  return InterpreterMap[node.type](node, env);
}

module.exports = runCode;