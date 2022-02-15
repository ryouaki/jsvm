const { Scope, declareVariable } = require('./../src/lib/scope');

test('Scope: 新建执行上下文', () => {
  const scope = new Scope();
  expect(scope instanceof Scope).toBe(true)
  expect(scope instanceof Object).toBe(true)
  expect(Object.keys(scope).length).toBe(0)
})

test('Scope: 原型链&死区', () => {
  const scope1 = new Scope();
  scope1.a = 1
  expect(scope1.a.value).toBe(1)
  const scope2 = new Scope(scope1)
  expect(scope2.a.value).toBe(1)
  scope2.a = 2
  expect(scope2.a.value).toBe(2)
  expect(scope1.a.value).toBe(1)
})

test('Scope: 作用域死区 let', () => {
  const scope = new Scope();
  try {
    scope.a = 1

    declareVariable(scope, 'a', 'let', 'Value of letA')
    expect(scope.a.value).toBe('Value of letA')
  } catch(e) {
    expect(e.message).toBe(`Identifier 'a' has already been declared`)
  }

  try {
    declareVariable(scope, 'letA', 'let', 'Value of letA')
    expect(scope.letA.value).toBe('Value of letA')

    declareVariable(scope, 'letA', 'let', 'Value of letA')
    expect(scope.letA.value).toBe('Value of letA')
  } catch(e) {
    expect(e.message).toBe(`Identifier 'letA' has already been declared`)
  }

  try {
    scope.letA = 'new Value of letA'
    expect(scope.letA.value).toBe('new Value of letA')
  } catch(e) {
    expect(e.message).toBe(`Identifier 'letA' has already been declared`)
  }
})

test('Scope: 作用域死区 const', () => {
  const scope = new Scope();
  try {
    scope.a = 1

    declareVariable(scope, 'a', 'const', 'Value of constA')
    expect(scope.a.value).toBe('Value of constA')
  } catch(e) {
    expect(e.message).toBe(`Identifier 'a' has already been declared`)
  }

  try {
    declareVariable(scope, 'constA', 'const', 'Value of constA')
    expect(scope.constA.value).toBe('Value of constA')

    declareVariable(scope, 'constA', 'const', 'Value of constA')
    expect(scope.constA.value).toBe('Value of constA')
  } catch(e) {
    expect(e.message).toBe(`Identifier 'constA' has already been declared`)
  }

  try {
    scope.constA = 'new Value of constA'
    expect(scope.constA.value).toBe('new Value of constA')
  } catch(e) {
    expect(e.message).toBe(`Assignment to constant variable 'constA'`)
  }
})