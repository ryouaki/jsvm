// const fs = require('fs')
// const jsvm = require('./src/index')

// console.log(jsvm(fs.readFileSync('./test/code.js', { encoding: 'utf8' }), global));

const { Scope, TScope } = require('./src/lib/scope');

const scope = new Scope();

const letA = new TScope({
  name: 'letA',
  type: 'let',
  init: true,
  value: 'letA'
})

scope.letA = letA;

console.log(scope.letA)

try {
  scope.letA = letA;
} catch(e) {
  console.log(e.message)
}

scope.letA = new TScope({
  name: 'letA',
  type: 'let',
  init: false,
  value: 'new letA'
})

console.log(scope.letA)

let constA = new TScope({
  name: 'constA',
  type: 'const',
  init: true,
  value: 'letA'
})

scope.constA = constA

console.log(scope.constA)
try {
  scope.constA = constA
} catch(e) {
  console.log(e.message)
}

try {
  scope.constA = new TScope({
    name: 'constA',
    type: 'const',
    init: false,
    value: 'new constA'
  }) 
} catch(e) {
  console.log(e.message)
}

let scope2 = new Scope(scope)
console.log(scope2.constA)
