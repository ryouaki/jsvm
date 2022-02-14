const { parse } = require('acorn');
const JSVM = require('./lib/interpreter');

module.exports = function jsvm(code, ctx) {
  if (!code || typeof code !== 'string') {
    return;
  }
  const _ast = parse(code, { ecmaVersion: "latest" });
  const vm = new JSVM(_ast, ctx);
  return vm.run();
}