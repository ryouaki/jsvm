const { parse } = require('acorn');
const JSVM = require('./lib/interpreter');
const { Scope } = require('./lib/scope');

module.exports = function jsvm(code, ctx) {
  if (!code || typeof code !== 'string') {
    return;
  }
  const _ast = parse(code, { ecmaVersion: "latest" });
  const scope = new Scope(ctx)
  const vm = new JSVM(_ast, scope);
  return vm.run();
}