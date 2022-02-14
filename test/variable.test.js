const jsvm = require('./../src/index');

test('Variable: 定义变量 var', () => {
  const ret1 = jsvm(`var a = 1; a;`, global);
  expect(ret1).toBe(1)
})

test('Variable: 定义变量 const', () => {
  const ret1 = jsvm(`const a = 1; a;`, global);
  expect(ret1).toBe(1)
})

test('Variable: 定义变量 let', () => {
  const ret1 = jsvm(`let a = 1; a;`, global);
  expect(ret1).toBe(1)
  expect(global.a).toBe(1)
})

test('Variable: 变量作用于 var', () => {
  const ret1 = jsvm(`var a = 1; a;`, global);
  expect(ret1).toBe(1)
  expect(global.a).toBe(1)
})