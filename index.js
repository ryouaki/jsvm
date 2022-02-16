const jsvm = require('./src/index')

console.log(JSON.stringify(jsvm(`let c, d, rest;
[c, d, ...rest] = [1,2,3,4,5,6];
rest;`, 
global)))