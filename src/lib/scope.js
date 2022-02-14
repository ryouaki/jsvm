// 临时性死区
class TScope {
  constructor(params) {
    this.name = params.name || '';
    this.type = params.type || 'let';
    this.init = params.init === undefined ? true: params.init;
    this.value = params.value || undefined;
    this.parent = null;
  }
}
// 作用域
class Scope {
  constructor(parent = {}) {
    let _values = new Map();
    let _parent = parent;
    let _deadScope = new Map();

    return new Proxy(this, {
      get(_target, prop) {
        if (_values.has(prop)) {
          return _values.get(prop);
        } else if (_deadScope.has(prop)) {
          return _deadScope.get(prop);
        } else {
          return _parent[prop];
        }
      },
      set(_target, prop, value) {
        if (value instanceof TScope) {
          if (_deadScope.has(prop) && value.init) {
            throw new SyntaxError(`Identifier '${prop}' has already been declared`)
          }

          if (_deadScope.has(prop) && !value.init && value.type === 'const') {
            throw new TypeError(`Assignment to constant variable '${prop}'`)
          }

          value.parent = _target
          _deadScope.set(prop, value)
          return true
        } else {
          _values.set(prop, value)
          return true;
        }
      },
      deleteProperty(_t, prop) {
        if (_values.has(prop)) {
          return _values.delete(prop)
        } else if (_parent[prop]) {
          return delete _parent[prop]
        }
      }
    })
  }
  toJSON() {
    return '[Object Scope]'
  }
  toString() {
    return '[Object Scope]'
  }
}

module.exports = {
  TScope,
  Scope
};