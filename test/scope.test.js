const Scope = require('./../src/lib/scope');

test('Scope: 新建执行上下文', () => {
  const scope = new Scope();
  expect(scope instanceof Scope).toBe(true)
  expect(scope instanceof Object).toBe(true)
  expect(scope.values.size).toBe(0)
  expect(Object.keys(scope).length).toBe(0)
})

test('Scope: 属性禁止修改 values', () => {
  const scope = new Scope();
  scope.values = null
  expect(scope.values instanceof Map).toBe(true)
  expect(scope.values.size).toBe(0)
})

test('Scope: 属性禁止修改 parent', () => {
  const scope = new Scope();
  scope.parent = undefined
  expect(scope.parent instanceof Object).toBe(true)
  expect(Object.keys(scope.parent).length).toBe(0)
})

test('Scope: 原型链 case 1', () => {
  const scope = new Scope();
  scope.parent = undefined
  expect(scope.parent instanceof Object).toBe(true)
  expect(Object.keys(scope.parent).length).toBe(0)
})