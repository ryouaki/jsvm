class Scope {
  constructor(parent = {}) {
    let _values = new Map();
    let _parent = parent;

    return new Proxy(this, {
      get(_target, prop) {
        if (_values.has(prop)) {
          return _values.get(prop);
        } else {
          return _parent[prop];
        }
      },
      set(_target, prop, value) {
        _values.set(prop, value)
        return true;
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
    return ''
  }
  toString() {
    return ''
  }
}

const s = new Scope()
s.a = '1'
s['a']
const a = new Scope(s)
console.log(a.a)
a.a = 2
console.log(a.a, s.a)
delete a.a
console.log(a.a, s.a)
delete a.a
console.log(a.a, s.a)
