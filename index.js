const jsvm = require('./src/index')

console.log(JSON.stringify(jsvm(`let [a, b] = [1, 2]; let [c, d, ...rest] = [1,2,3,4,5,6];rest;`, 
global)))