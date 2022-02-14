const Scope = require('./../src/lib/scope');

test('Scope: 新建执行上下文', () => {
  const scope = new Scope();
  expect(scope instanceof Scope).toBe(true)
  expect(scope instanceof Object).toBe(true)
  expect(Object.keys(scope).length).toBe(0)
})

test('Scope: 原型链 case 1', () => {
  const scope = new Scope();
})