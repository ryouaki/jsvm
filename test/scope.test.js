const { Scope, TScope } = require('./../src/lib/scope');

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

test('Scope: 作用域死区 let', () => {
  const scope = new Scope();
  try {
    scope.letA = new TScope({
      name: 'letA',
      type: 'let',
      init: true,
      value: 'letA'
    })
    expect(scope.letA.value).toBe('letA')

    scope.letA = new TScope({
      name: 'letA',
      type: 'let',
      init: false,
      value: 'new letA'
    })
    expect(scope.letA.value).toBe('new letA')

    scope.letA = new TScope({
      name: 'letA',
      type: 'let',
      init: true,
      value: 'new letA'
    })
  } catch(e) {
    expect(e.message).toBe(`Identifier 'letA' has already been declared`)
  }
})

test('Scope: 作用域死区 const', () => {
  const scope = new Scope();
  scope.constA = new TScope({
    name: 'constA',
    type: 'const',
    init: true,
    value: 'constA'
  })
  expect(scope.constA.value).toBe('constA')

  try {
    scope.constA = new TScope({
      name: 'constA',
      type: 'const',
      init: true,
      value: 'new constA'
    })
  } catch(e) {
    expect(e.message).toBe(`Identifier 'constA' has already been declared`)
  }

  try {
    scope.constA = new TScope({
      name: 'constA',
      type: 'const',
      init: false,
      value: 'new constA'
    })
  } catch(e) {
    expect(e.message).toBe(`Assignment to constant variable 'constA'`)
  }
})