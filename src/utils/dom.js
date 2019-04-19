export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, function (e) {
          handler(e)
        }, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, function (e) {
          handler(e)
        })
      }
    }
  }
})()

// 解除绑定事件
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

export const removeBody = function (self, ref) {
  const pos = self.$refs[ref];
  if (pos && pos.$el && pos.$el.parentNode === document.body) {
    document.body.removeChild(pos.$el);
  } else if (pos && pos.parentNode === document.body) {
    document.body.removeChild(pos);
  }
}

export const getParentNodes = function (parent) {
  let parentNodes = [window];
  while (parent !== document.body) {
    parentNodes.push(parent);
    if (!parent.parentNode || parent.parentNode.name) return parentNodes;
    parent = parent.parentNode;
  }
  return parentNodes;
}

export const enableEventListener = function (parentNodes, handler) {
  parentNodes.forEach(p => {
    p.addEventListener('resize', handler, {
      passive: true
    });
    p.addEventListener('scroll', handler, {
      passive: true
    });
  })
};

export const removeEventListener = function (parentNodes, handler) {
  parentNodes.forEach(p => {
    p.removeEventListener('resize', handler);
    p.removeEventListener('scroll', handler);
  })
};

export const getDomClientRect = function (target) {
  const targetRect = target.getBoundingClientRect();
  const top = targetRect.top;
  const bottom = targetRect.bottom;
  const left = targetRect.left;
  const right = targetRect.right;
  const width = targetRect.width || right - left;
  const height = targetRect.height || bottom - top;
  return {
    x: left + document.documentElement.scrollLeft,
    y: right + document.documentElement.scrollTop,
    width: width,
    height: height,
    top: top,
    right: right,
    bottom: bottom,
    left: left
  }
};