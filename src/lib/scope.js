class Scope {
  constructor(parent) {
    Object.defineProperty(this, 'values', {
      value: new Map(),
      writable: false
    });
    Object.defineProperty(this, 'parent', {
      value: parent || {},
      writable: false
    });
  }

  setValue(key, value) {
    this.values.set(key, value);
  }

  getValue(key) {
    if (this.values.has(key)) {
      return this.values.get(key);
    } else {
      return this.parent.getValue(key);
    }
  }
}

module.exports = Scope;