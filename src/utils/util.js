const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

export const generateId = function () {
  return Math.floor(Math.random() * 10000);
};

export const offset = function (target) {
  if (!target || !target.offsetParent) return false;
  let top = 0;
  let left = 0;
  while (target.offsetParent) {
    top += target.offsetTop;
    left += target.offsetLeft;
    target = target.offsetParent;
  }
  return {
    top: top,
    left: left
  };
}

export const scroll = function () {
  if (window.pageYOffset != null) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else if (document.compatMode == 'CSS1Compat') {
    return {
      left: document.documentElement.scrollLeft,
      top: document.documentElement.scrollTop
    }
  }
  return {
    left: document.body.scrollLeft,
    top: document.body.scrollTop
  }
}

export const clone = function (obj) {
  var o = obj instanceof Array ? [] : {};
  for (var k in obj) {
    o[k] = obj[k];
  }
  return o;
}

export const debounce = (func, wait = 300, immediate) => {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}