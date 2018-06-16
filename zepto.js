!(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(global);
  } else if (typeof define === "function" && define.amd) {
    define(() => factory(global));
  } else {
    global.$ = factory(global);
  }
})(this, function factory(global) {
  const div = document.createElement("DIV");

  const toString = Object.prototype.toString;

  const isType = type => {
    const internalClass = `[object ${type}]`;
    return o => toString.apply(o) === internalClass;
  };
  const isFunction = isType("Function");
  const isString = isType("String");
  const isNumber = isType("Number");
  const isObject = isType("Object");
  const isNull = isType("Null");
  const isUndefined = isType("Undefined");
  const range = (max, min = 0) =>
    new Array(max).fill(0).map((it, index) => min + index);

  function zepto(selectorOrDOMReady) {
    if (isFunction(selectorOrDOMReady)) {
      bindDOMContentLoaded(selectorOrDOMReady);
    } else {
      return Zepto(selectorOrDOMReady);
    }
  }

  function bindDOMContentLoaded(listener) {
    document.addEventListener("DOMContentLoaded", listener);
  }

  function Zepto(selector, target) {
    return init(selector, target);
  }

  function init(selector, target) {
    const nodeList = query(selector, target);
    const zepto = Array.from(nodeList);

    zepto.__proto__ = Zepto.prototype;

    return zepto;
  }

  function query(selector, target) {
    if (isString(selector)) {
      if (/^<\w+/.test(selector)) {
        return create(selector);
      } else {
        return querySelector(selector, target);
      }
    } else if (selector instanceof HTMLElement) {
      return [selector];
    }
  }

  function create(selector) {
    div.innerHTML = selector;
    return div.childNodes;
  }

  function querySelector(selector, target) {
    return (target || document).querySelectorAll(selector);
  }

  function on(event, listener, optionsOrCapable) {
    this.forEach(node =>
      node.addEventListener(event, listener, optionsOrCapable)
    );
  }

  function off(event, listener) {
    this.forEach(node => node.removeEventListener(event, listener));
  }

  function html(html) {
    this.forEach(node => (node.innerHTML = html));
  }

  function text(text) {
    this.forEach(node => (node.innerText = text));
  }

  function forEach(iteratee, ctx) {
    for (var i = 0, len = this.length; i < len; i++) {
      iteratee.call(ctx || this, this[i], i);
    }
  }

  Zepto.prototype = {
    on,
    off,
    forEach,
    html,
    text
  };

  zepto.utils = {
    isFunction,
    range
  };

  return zepto;
});
