const jsvm = require('./../src/index');

test('Expression: 表达式 基本类型 number', () => {
  const ctx = {}
  const ret1 = jsvm(`2`, ctx);
  expect(ret1).toBe(2)
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

test('Expression: 表达式 =', () => {
  const ret1 = jsvm(`let a = 1; a;`, global);
  expect(ret1).toBe(1)

  const ret2 = jsvm(`let a = '1'; a;`, global);
  expect(ret2).toBe('1')

  const ret3 = jsvm(`let a = '1' + 1; a;`, global);
  expect(ret3).toBe('11')
})

test('Expression: 表达式 +', () => {
  const ret1 = jsvm(`1 + 1;`, global);
  expect(ret1).toBe(2)
})

test('Expression: 表达式 -', () => {
  const ret1 = jsvm(`1 - 1;`, global);
  expect(ret1).toBe(0)
})

test('Expression: 表达式 *', () => {
  const ret1 = jsvm(`1 * 1;`, global);
  expect(ret1).toBe(1)
})

test('Expression: 表达式 /', () => {
  const ret1 = jsvm(`1 / 1;`, global);
  expect(ret1).toBe(1)

  const ret2 = jsvm(`1 / 0;`, global);
  expect(ret2).toBe(Infinity)
})

test('Expression: 表达式 /=', () => {
  const ret1 = jsvm(`let a = 1; a /= 2;`, global);
  expect(ret1).toBe(0.5)
})

test('Expression: 表达式 **', () => {
  const ret1 = jsvm(`2 ** 4;`, global);
  expect(ret1).toBe(16)
})

test('Expression: 表达式 **=', () => {
  const ret1 = jsvm(`let a = 2; a **= 4;`, global);
  expect(ret1).toBe(16)
})

test('Expression: 表达式 in', () => {
  const ret1 = jsvm(`let a = { b : 1}; 'b' in a;`, global);
  expect(ret1).toBe(true)
})

test('Expression: 表达式 >', () => {
  const ret1 = jsvm(`1 > 2`, global);
  expect(ret1).toBe(false)

  const ret2 = jsvm(`2 > 1`, global);
  expect(ret2).toBe(true)
})

test('Expression: 表达式 >=', () => {
  const ret1 = jsvm(`1 >= 2`, global);
  expect(ret1).toBe(false)

  const ret2 = jsvm(`2 >= 1`, global);
  expect(ret2).toBe(true)

  const ret3 = jsvm(`1 >= 1`, global);
  expect(ret3).toBe(true)
})

test('Expression: 表达式 <', () => {
  const ret1 = jsvm(`1 < 2`, global);
  expect(ret1).toBe(true)

  const ret2 = jsvm(`2 < 1`, global);
  expect(ret2).toBe(false)
})

test('Expression: 表达式 <=', () => {
  const ret1 = jsvm(`1 <= 2`, global);
  expect(ret1).toBe(true)

  const ret2 = jsvm(`2 <= 1`, global);
  expect(ret2).toBe(false)

  const ret3 = jsvm(`1 <= 1`, global);
  expect(ret3).toBe(true)
})

test('Expression: 表达式 ,', () => {
  const ret1 = jsvm(`1,2`, global);
  expect(ret1).toBe(2)

  const ret2 = jsvm(`let a = 1,b = 22; a;`, global);
  expect(ret2).toBe(1)

  const ret3 = jsvm(`let a, b, c = 1;`, global);
  expect(ret3).toBe(undefined)
})

test('Expression: 表达式 +=', () => {
  const ret1 = jsvm(`let a = 1; a+=1;`, global);
  expect(ret1).toBe(2)

  const ret2 = jsvm(`let a = 1; a+='1';`, global);
  expect(ret2).toBe('11')
})

test('Expression: 表达式 -=', () => {
  const ret1 = jsvm(`let a = 1; a-=1;`, global);
  expect(ret1).toBe(0)

  const ret2 = jsvm(`let a = 1; a-='1';`, global);
  expect(ret2).toBe(0)
})

test('Expression: 表达式 ==', () => {
  const ret1 = jsvm(`1 == 1`, global);
  expect(ret1).toBe(true)

  try {
    jsvm(`a == a`, global);
  } catch(e) {
    expect(e.message).toBe('a is not defined')
  }

  const ret2 = jsvm(`let a = {}; a == {}`, global);
  expect(ret2).toBe(false)

  const ret3 = jsvm(`'a' == 'a'`, global);
  expect(ret3).toBe(true)

  const ret4 = jsvm(`1 == '1'`, global);
  expect(ret4).toBe(true)
})

test('Expression: 表达式 ===', () => {
  const ret1 = jsvm(`1 === 1`, global);
  expect(ret1).toBe(true)

  try {
    jsvm(`a === a`, global);
  } catch(e) {
    expect(e.message).toBe('a is not defined')
  }

  const ret2 = jsvm(`let a = {}; a === {}`, global);
  expect(ret2).toBe(false)

  const ret3 = jsvm(`'a' === 'a'`, global);
  expect(ret3).toBe(true)

  const ret4 = jsvm(`1 === '1'`, global);
  expect(ret4).toBe(false)
})

test('Expression: 表达式 ? :', () => {
  const ret1 = jsvm(`true ? 1 : 2`, global);
  expect(ret1).toBe(1)

  try {
    jsvm(`a ? 1 : 2`, global);
  } catch(e) {
    expect(e.message).toBe('a is not defined')
  }

  const ret2 = jsvm(`true == true ? 1 : 2`, global);
  expect(ret2).toBe(1)

  const ret3 = jsvm(`true ? (false ? "2" : "1") : "1"`, global);
  expect(ret3).toBe("1")

  const ret4 = jsvm(`1 === '1' ? true : false`, global);
  expect(ret4).toBe(false)
})

test('Expression: 表达式 &', () => {
  const ret1 = jsvm(`1 & 1`, global);
  expect(ret1).toBe(1)

  const ret2 = jsvm(`1 & 0`, global);
  expect(ret2).toBe(0)

  const ret3 = jsvm(`0 & 0`, global);
  expect(ret3).toBe(0)
})

test('Expression: 表达式 &=', () => {
  const ret1 = jsvm(`let a = 5; a &= 3;`, global);
  expect(ret1).toBe(1)
})

test('Expression: 表达式 ~', () => {
  const ret1 = jsvm(`let a = 5; ~a`, global);
  expect(ret1).toBe(-6)
})

test('Expression: 表达式 |', () => {
  const ret1 = jsvm(`let a = 5; let b = 3; a | b`, global);
  expect(ret1).toBe(7)
})


test('Expression: 表达式 |=', () => {
  const ret1 = jsvm(`let a = 5; a |= 3;a;`, global);
  expect(ret1).toBe(7)
})

test('Expression: 表达式 ^', () => {
  const ret1 = jsvm(`let a = 5; a ^ 3;`, global);
  expect(ret1).toBe(6)
})

test('Expression: 表达式 ^=', () => {
  const ret1 = jsvm(`let a = 5; a ^= 3;`, global);
  expect(ret1).toBe(6)
})

test('Expression: 表达式 --', () => {
  const ret1 = jsvm(`let a = 5; a--;`, global);
  expect(ret1).toBe(5)

  const ret2 = jsvm(`let a = 5; --a;`, global);
  expect(ret2).toBe(4)
})

test('Expression: 表达式 ++', () => {
  const ret1 = jsvm(`let a = 5; a++;`, global);
  expect(ret1).toBe(5)

  const ret2 = jsvm(`let a = 5; ++a;`, global);
  expect(ret2).toBe(6)
})

test('Expression: 表达式 delete', () => {
  const ret1 = jsvm(`let a = {b: 1}; delete a.b; a`, global);
  expect(ret1.b).toBeUndefined()
})

test('Expression: 表达式 Destructuring', () => {
  const ret1 = jsvm(`let [a, b] = [1, 2];a;`, global);
  expect(ret1).toBe(1)

  const ret2 = jsvm(`let [a, b] = [1, 2];b;`, global);
  expect(ret2).toBe(2)

  const ret3 = jsvm(`let [a, b, ...c] = [1, 2, 3,4,5,6];c;`, global);
  expect(ret3).toEqual(expect.arrayContaining([3,4,5,6]))
})