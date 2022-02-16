const jsvm = require('./../src/index');

test('Expression: 表达式 基本类型 number', () => {
  const ctx = {}
  const ret1 = jsvm(`2`, ctx);
  expect(ret1).toBe(2)

  const ret2 = jsvm(`2 + 2`, ctx);
  expect(ret2).toBe(4)
})

test('Expression: 表达式 基本类型 string', () => {
  const ctx = {}
  const ret1 = jsvm(`'2'`, ctx);
  expect(ret1).toBe('2')

  const ret2 = jsvm(`'2 + 2'`, ctx);
  expect(ret2).toBe('2 + 2')
})

test('Expression: 表达式 基本类型 array', () => {
  const ctx = {}
  const ret1 = jsvm(`[2]`, ctx);
  expect(ret1[0]).toBe(2)

  const ret2 = jsvm(`[1, 2]`, ctx);
  expect(ret2[0]).toBe(1)
  expect(ret2[1]).toBe(2)
})

test('Expression: 表达式 基本类型 null', () => {
  const ctx = {}
  const ret1 = jsvm(`null`, ctx);
  expect(ret1).toBe(null)
})

test('Expression: 表达式 基本类型 undefined', () => {
  const ctx = {}
  const ret1 = jsvm(`undefined`, ctx);
  expect(ret1).toBe(undefined)
})

test('Expression: 表达式 基本类型 object', () => {
  const ctx = {}
  const ret1 = jsvm(`{}`, ctx);
  expect(JSON.stringify(ret1)).toBe('{}')
  expect(Object.keys(ret1).length).toBe(0)
})

test('Expression: 表达式 基本类型 symbol', () => {
  const ret1 = jsvm(`Symbol()`, global);
  expect(typeof ret1).toBe('symbol')

  const ret2 = jsvm(`Symbol('test')`, global);
  expect(typeof ret2).toBe('symbol')
  expect(ret2).not.toBe(Symbol('test'))
})

test('Expression: 表达式 ==', () => {
  const ret1 = jsvm(`1 == 1`, global);
  expect(ret1).toBe(true)

  try {
    jsvm(`a == a`, global);
  } catch(e) {
    expect(e.message).toBe('a is not defined')
  }
  
  try {
    jsvm(`{} == {}`, global);
  } catch(e) {
    expect(e.message).toBe('a is not defined')
  }
})