const fs = require('fs')
const jsvm = require('./src/index')

console.log(jsvm(fs.readFileSync('./test/code.js', { encoding: 'utf8' }), global));