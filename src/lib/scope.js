class IValue {
  constructor(props) {
    this.value = props;
  }
}
class ValueVar extends IValue {
  constructor(props) {
    super(props)
  }
}

class ValueLet extends IValue {
  constructor(props) {
    super(props)
  }
}

class ValueConst extends IValue {
  constructor(props) {
    super(props)
  }
}

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
          if (_parent[prop] instanceof ValueLet || _parent[prop] instanceof ValueConst) {
            return undefined;
          }
          return _parent[prop];
        }
      },
      set(_target, prop, value) {
        const isDeclare = value instanceof IValue; // 是变量定义 否则是属性赋值
        const val = _deadScope.get(prop) || _values.get(prop) || undefined
        
        // let const 不能重复定义定义
        if (isDeclare && val &&
          ((value instanceof ValueLet || value instanceof ValueConst) || 
            ((val instanceof ValueLet || val instanceof ValueConst) && value instanceof ValueVar))) {
              console.log(prop, val, value)
          throw new SyntaxError(`Identifier '${prop}' has already been declared`)
        } else if (val && val instanceof ValueConst) {
          throw new TypeError(`Assignment to constant variable '${prop}'`)
        }

        if ((value instanceof ValueLet || value instanceof ValueConst)) { 
          _deadScope.set(prop, value)
        } else if (val instanceof ValueLet) {
          _deadScope.set(prop, new ValueLet(value))
        } else if (value instanceof ValueVar) {
          _values.set(prop, value)
        } else { // 动态增加属性
          _values.set(prop, new ValueVar(value))
        }

        return true
      },
      deleteProperty(_t, _prop) {
        return false; // 定义不可以被删除。但是可以被赋值undefined
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

// 曲线救国, 需要将定义和赋值区分对待。由于需要识别类型。因此只能除此下册
function declareVariable(ctx, name, type, value) {
  switch(type) {
    case 'var':
      ctx[name] = new ValueVar(value);
      break;
    case 'let':
      ctx[name] = new ValueLet(value);
      break;
    case 'const':
      ctx[name] = new ValueConst(value);
      break;
    default:
      break;
  }
}

module.exports = {
  IValue,
  declareVariable,
  Scope
};