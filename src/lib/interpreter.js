const execHandle = require('./script');

module.exports = class JSVM {
  constructor(ast, ctx) {
    this._ast = ast;
    this._ctx = ctx || {};
  }

  run () {
    let ret = undefined;
    const len = this._ast.body.length;
    for (let i = 0; i < len; i++) {
      const node = this._ast.body[i];
      ret = execHandle(node, this._ctx);
    }
    return ret;
  }
}