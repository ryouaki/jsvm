const Scope = require('./../src/lib/scope');

test('Scope: 新建执行上下文', () => {
  const scope = new Scope();
  expect(scope instanceof Scope).toBe(true)
  expect(scope instanceof Object).toBe(true)
  expect(Object.keys(scope).length).toBe(0)
})

test('Scope: 原型链', () => {
  const scope1 = new Scope();
  scope1.a = 1
  expect(scope1.a).toBe(1)
  const scope2 = new Scope(scope1)
  expect(scope2.a).toBe(1)
  scope2.a = 2
  expect(scope2.a).toBe(2)
  expect(scope1.a).toBe(1)
  delete scope2.a
  expect(scope2.a).toBe(1)
  expect(scope1.a).toBe(1)
  delete scope1.a
  expect(scope2.a).toBe(undefined)
  expect(scope1.a).toBe(undefined)
})