const fs = require('fs')
const jsvm = require('./src/index')

// console.log(jsvm(fs.readFileSync('./test/code.js', { encoding: 'utf8' }), global));

// const { Scope, declareVariable } = require('./src/lib/scope');

// const scope = new Scope();

// declareVariable(scope, 'a', 'let', 1)

// const s2 = new Scope(scope)

// console.log(scope.a)
// console.log(s2.a)

console.log(jsvm('var a = null; a;', global))