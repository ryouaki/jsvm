const jsvm = require('./../src/index');

test('Variable: 定义变量', () => {
  const ret1 = jsvm(`var a = 1; a;`, global);
  expect(ret1).toBe(1)

  const ret2 = jsvm(`var a = '1'; a;`, global);
  expect(ret2).toBe('1')

  const ret3 = jsvm(`var a = true; a;`, global);
  expect(ret3).toBe(true)

  const ret4 = jsvm(`var a = null; a;`, global);
  expect(ret4).toBeNull()

  const ret5 = jsvm(`var a = undefined; a;`, global);
  expect(ret5).toBeUndefined()

  const ret6 = jsvm(`var a = undefined; a = 1; a;`, global);
  expect(ret6).toBe(1)

  const ret7 = jsvm(`var a = Symbol(); a;`, global);
  expect(typeof ret7).toBe('symbol')
  
})

test('Variable: 定义变量 const', () => {
  const ret1 = jsvm(`const a = 1; a;`, global);
  expect(ret1).toBe(1)

  try {
    jsvm(`const a = 1; var a = 2;`, global);  
  } catch(e) {
    expect(e.message).toContain(`Identifier 'a' has already been declared`)
  }

  try {
    jsvm(`const a = 1; a = 2;`, global);  
  } catch(e) {
    expect(e.message).toContain(`Assignment to constant variable 'a'`)
  }
})

test('Variable: 定义变量 let', () => {
  const ret1 = jsvm(`let a = 1; a;`, global);
  expect(ret1).toBe(1)

  try {
    jsvm(`let a = 1; var a = 2;`, global);  
  } catch(e) {
    expect(e.message).toContain(`Identifier 'a' has already been declared`)
  }

  const ret2 = jsvm(`let a = 1; a = 2; a;`, global);
  expect(ret2).toBe(2);
})

test('Variable: 定义变量 ', () => {

})