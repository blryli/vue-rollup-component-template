"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.last-index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.split");

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global['vue-form-layer'] = {}));
})(void 0, function (exports) {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var on = function () {
    if (document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, function (e) {
            handler(e);
          }, false);
        }
      };
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, function (e) {
            handler(e);
          });
        }
      };
    }
  }(); // 解除绑定事件


  var off = function () {
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
  }();

  var getParentNodes = function getParentNodes(parent) {
    var parentNodes = [window];

    while (parent !== document.body) {
      parentNodes.push(parent);
      if (!parent.parentNode || parent.parentNode.name) return parentNodes;
      parent = parent.parentNode;
    }

    return parentNodes;
  };

  var enableEventListener = function enableEventListener(parentNodes, handler) {
    parentNodes.forEach(function (p) {
      p.addEventListener('resize', handler, {
        passive: true
      });
      p.addEventListener('scroll', handler, {
        passive: true
      });
    });
  };

  var removeEventListener = function removeEventListener(parentNodes, handler) {
    parentNodes.forEach(function (p) {
      p.removeEventListener('resize', handler);
      p.removeEventListener('scroll', handler);
    });
  };

  var getDomClientRect = function getDomClientRect(target) {
    var targetRect = target.getBoundingClientRect();
    var top = targetRect.top;
    var bottom = targetRect.bottom;
    var left = targetRect.left;
    var right = targetRect.right;
    var width = targetRect.width || right - left;
    var height = targetRect.height || bottom - top;
    return {
      x: left + document.documentElement.scrollLeft,
      y: right + document.documentElement.scrollTop,
      width: width,
      height: height,
      top: top,
      right: right,
      bottom: bottom,
      left: left
    };
  };

  var script = {
    name: "VueForm",
    componentName: "VueForm",
    props: {
      model: [Object, Array],
      layer: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      labelWidth: String,
      labelPosition: String,
      lineHeight: {
        type: String,
        default: "32px"
      },
      itemGutter: {
        type: Number,
        default: 0
      },
      response: {
        type: Boolean,
        default: true
      },
      rowledge: {
        type: String,
        default: "24px"
      }
    },
    data: function data() {
      return {
        layerCopy: Object.freeze(null),
        initModel: Object.freeze(null),
        isResponse: false,
        initLayer: Object.freeze([]),
        reload: true,
        layerComponents: [],
        layerSwich: {}
      };
    },
    computed: {
      formClass: function formClass() {
        var formClass = "";
        this.labelPosition && (formClass += "vue-form--label-".concat(this.labelPosition));
        this.response && this.isResponse && (formClass += " vue-form-response");
        return formClass;
      }
    },
    created: function created() {
      var _this = this;

      this.layerComponents = [];
      this.$on("popover.show", function (prop) {
        _this.$emit("show", prop);
      });
      this.$on("popover.hide", function (prop) {
        _this.$emit("hide", prop);
      });
      this.$on("layer.add", function (obj) {
        _this.layerComponents.push(obj);
      });
      this.init();
    },
    watch: {
      layer: {
        handler: function handler() {
          var _this2 = this;

          this.reload = false;
          this.initLayer = Object.freeze([]);
          this.$nextTick(function () {
            _this2.reload = true;

            _this2.init();
          });
        },
        deep: false
      }
    },
    methods: {
      formationLayer: function formationLayer() {
        return (this.layer || []).reduce(function (acc, cur) {
          var show = cur.show === undefined ? true : cur.show;
          (cur.data || []).forEach(function (da) {
            da.id = cur.id;

            var layer = _objectSpread({}, cur.view, da, {
              show: show
            });

            var findIndex = acc.findIndex(function (l) {
              return l.prop === da.prop;
            });

            if (findIndex === -1) {
              acc.push({
                prop: da.prop,
                layer: [layer]
              });
            } else {
              acc[findIndex].layer.push(layer);
            }
          });
          return acc;
        }, []);
      },
      init: function init() {
        this.initLayer = Object.freeze(this.formationLayer());
        this.initLayerFn();
        this.initModelFn();
      },
      initLayerFn: function initLayerFn() {
        this.layerCopy = Object.freeze(JSON.parse(JSON.stringify(this.initLayer)));
      },
      initModelFn: function initModelFn() {
        this.model && (this.initModel = Object.freeze(JSON.parse(JSON.stringify(this.model))));
      },
      changeShow: function changeShow(id) {
        !id && console.error("changeShow \u65B9\u6CD5\u5FC5\u987B\u4F20\u5165 layer id");
        if (!this.layer.find(function (d) {
          return d.id && d.id === id;
        })) console.error("not find ".concat(id, " in layer"));
        this.layerComponents.forEach(function (d) {
          d.layer.changeShow(id);
        });
      },
      recalculate: function recalculate(id, callback) {
        if (typeof callback !== "function") {
          console.error("recalculate方法 回调参数必须是 函数");
          return;
        }

        if (!id) {
          console.error("recalculate方法 必须传入 layer ID");
          return;
        }

        this.recalculateField(id);
        var valid = true;
        (this.initLayer || []).forEach(function (da) {
          if (da.id === id) {
            (da.data || []).find(function (d) {
              return d.data;
            }) && (valid = false);
          }
        });
        callback(valid);
      },
      recalculateEmit: function recalculateEmit(obj) {
        this.$emit('recalculate', obj);
      },
      recalculateField: function recalculateField(id, prop) {
        !id && console.error("recalculateField \u65B9\u6CD5\u5FC5\u987B\u4F20\u5165 layer id");
        !this.model && console.error("model is not define");
        this.layerComponents.forEach(function (d) {
          d.layer.recalculateField(id, prop);
        });
      },
      clearCalculate: function clearCalculate(id) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var resetModel = arguments.length > 2 ? arguments[2] : undefined;
        this.layerComponents.forEach(function (d) {
          d.layer.clearCalculate(id, props = [], resetModel);
        });
      },
      resetData: function resetData(prop) {
        var _this3 = this; // 初始化值


        if (!this.initModel) return;
        !this.model && console.error("model is not define");

        if (Array.isArray(this.model)) {
          (this.model || []).forEach(function (d, i) {
            _this3.$set(d, prop, _this3.initModel[i][prop] || "");
          });
        } else {
          this.$set(this.model, prop, this.initModel[prop] || "");
        }
      },
      resetFields: function resetFields(id) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        this.clearCalculate(id, props, true);
      }
    },
    mounted: function mounted() {
      if (this.response) {
        var width;

        if (window.innerWidth) {
          width = window.innerWidth;
        } else if (document.body && document.body.clientWidth) {
          width = document.body.clientWidth;
        }

        if (width <= 768) {
          this.isResponse = true;
        }
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;
  /* script */

  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.reload ? _c("form", {
      ref: "vueForm",
      staticClass: "vue-form",
      class: _vm.formClass,
      style: {
        margin: "0 -" + _vm.itemGutter / 2 + "px"
      }
    }, [_vm._t("default")], 2) : _vm._e();
  };

  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  var vueForm = normalizeComponent_1({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

  var generateId = function generateId() {
    return Math.floor(Math.random() * 10000);
  };

  var debounce = function debounce(func) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var immediate = arguments.length > 2 ? arguments[2] : undefined;
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      if (timeout) clearTimeout(timeout);

      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(function () {
          timeout = null;
        }, wait);
        if (callNow) func.apply(context, args);
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      }
    };
  }; //
  //
  //
  //
  //
  //
  //
  //
  //


  var script$1 = {
    name: "VueFormItem",
    props: {
      label: String,
      labelWidth: String,
      required: Boolean
    },
    data: function data() {
      return {};
    },
    computed: {
      form: function form() {
        var parent = this.$parent;
        var parentName = parent.$options.name;

        while (parentName !== "VueForm") {
          parent = parent.$parent;
          parentName = parent.$options.name;
        }

        return parent;
      },
      lineHeight: function lineHeight() {
        return this.form.lineHeight;
      },
      // 行距
      rowledge: function rowledge() {
        return this.form.rowledge;
      }
    }
  };
  /* script */

  var __vue_script__$1 = script$1;
  /* template */

  var __vue_render__$1 = function __vue_render__$1() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vue-form-item",
      class: {
        "is-required": _vm.required
      },
      style: {
        marginBottom: _vm.rowledge,
        "--lineHeight": _vm.lineHeight
      }
    }, [_vm.label ? _c("label", {
      staticClass: "vue-form-item__label",
      style: {
        flex: "0 0 " + _vm.labelWidth
      }
    }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c("div", {
      ref: "formItemContent",
      staticClass: "vue-form-item__content"
    }, [_vm._t("default")], 2)]);
  };

  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;
  /* style */

  var __vue_inject_styles__$1 = undefined;
  /* scoped */

  var __vue_scope_id__$1 = undefined;
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = false;
  /* style inject */

  /* style inject SSR */

  var vueFormItem = normalizeComponent_1({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);
  var script$2 = {
    name: "VueLayer",
    props: {
      prop: String,
      layer: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    },
    data: function data() {
      return {
        betraye: {
          left: [],
          right: [],
          top: [],
          bottom: []
        },
        addLayer: false,
        layerData: Object.freeze(this.layer),
        resetLayerData: Object.freeze(JSON.parse(JSON.stringify(this.layer)))
      };
    },
    computed: {
      form: function form() {
        var parent = this.$parent;
        var parentName = parent.$options.name;

        while (parentName !== "VueForm") {
          parent = parent.$parent;
          parentName = parent.$options.name;
        }

        return parent;
      }
    },
    render: function render(h) {
      var defaultReferenceId = "".concat(generateId()).concat(this.prop, "/default");
      var referenceNode = h("div", {
        attrs: {
          id: defaultReferenceId,
          class: {
            "vue-layer__reference": true
          }
        }
      }, [this.$slots.default[0]]);
      var placementObj = {
        left: [],
        right: [],
        top: [],
        bottom: []
      };
      var layers = [];

      for (var i = 0, len = (this.layerData || []).length; i < len; i++) {
        var d = this.layerData[i];
        var referenceId = "".concat(generateId()).concat(this.prop, "/").concat(i); // 参考点id

        var data = typeof d.template === "function" ? d.template(d.data, this.prop) : d.data; // 展示内容

        if (!d.type || d.type === "popover") {
          var placement = d.placement || "top"; // 默认展示位置

          var disabled = d.disabled === true || d.show === false ? 1 : 0; // 是否禁用

          var placementId = "".concat(defaultReferenceId, "/").concat(placement, "/").concat(placementObj[placement].length + 1);

          if (typeof d.reference === "function") {
            layers.push(h("div", {
              attrs: {
                id: referenceId,
                class: {
                  "vue-popover__reference-function": true
                }
              }
            }, [d.reference()]));
            placementId = "";
          } else {
            referenceId = defaultReferenceId;
            placementObj[placement].push({
              id: placementId,
              disabled: disabled
            });
          } // 图层懒加载


          (d.showAlways || this.addLayer) && layers.push(h("vue-popover", {
            attrs: {
              referenceId: referenceId,
              placementId: placementId,
              data: data,
              placement: placement,
              disabled: disabled,
              trigger: d.trigger,
              effect: d.effect,
              visibleArrow: d.visibleArrow,
              order: d.order,
              borderColor: d.borderColor,
              showAlways: d.showAlways,
              enterable: d.enterable,
              popoverClass: d.popoverClass,
              hideDelay: d.hideDelay,
              prop: this.prop,
              betraye: this.betraye,
              placementObj: this.placementObj,
              onAddBetrayer: this.addBetrayer,
              onRemoveBetrayer: this.removeBetrayer
            }
          }));
        } else if (d.type === "text") {
          referenceNode = h("div", {
            attrs: {
              id: referenceId,
              class: {
                "vue-text": true
              }
            }
          }, [referenceNode]);
          layers.push(h("vue-text", {
            attrs: {
              referenceId: referenceId,
              data: data,
              placement: d.placement,
              disabled: d.disabled,
              effect: d.effect
            }
          }));
        }
      }

      return h("div", {
        attrs: {
          onMouseenter: this.layerLoad,
          class: {
            "vue-layer": true
          }
        }
      }, [referenceNode, layers]);
    },
    methods: {
      // 计算叛逆列表
      addBetrayer: function addBetrayer(betrayer) {
        betrayer.id && !this.betraye[betrayer.placement].find(function (d) {
          return d === betrayer.id;
        }) && this.betraye[betrayer.placement].push(betrayer.id);
      },
      removeBetrayer: function removeBetrayer(betrayer) {
        var index = this.betraye[betrayer.placement].findIndex(function (d) {
          return d === betrayer.id;
        });
        index !== -1 && this.betraye[betrayer.placement].splice(index, 1);
      },
      // 加载图层
      layerLoad: function layerLoad() {
        if (!this.addLayer) {
          this.addLayer = true;
        }
      },
      changeShow: function changeShow(id) {
        this.layerData.forEach(function (d) {
          d.id === id && (d.show = !d.show);
        });
      },
      recalculateField: function recalculateField(id, prop) {
        var _this = this;

        this.layerLoad();
        this.layerData = Object.freeze(this.layerData.map(function (d) {
          if (d.id !== id || !d.recalculate || prop && _this.prop !== prop) return d;
          typeof d.recalculate !== "function" && console.error("recalculate \u5FC5\u987B\u662F function"); // 获取 value

          var p = prop || _this.prop;
          var key = p.substring(p.lastIndexOf("/") + 1);
          var value = Array.isArray(_this.form.model) ? _this.form.model[p.split("/")[p.split("/").length - 2] * 1][key] : _this.form.model[key] || _this.$set(_this.form.model, key, ""); // 获取重算返回对象

          var cb = d.recalculate(value) || null;
          d.data = cb.message;
          d.referenceBorderColor = cb.referenceBorderColor;
          d.disabled = cb.disabled;

          if (_typeof(cb) === "object") {
            Array.isArray(cb) && console.error("recalculate 返回值必须是 object");
          } else {
            console.error("recalculate 返回值必须是 object");
          }

          _this.updateSlot(d.referenceBorderColor);

          _this.form.recalculateEmit({
            id: d.id,
            prop: _this.prop,
            data: d.data
          });

          return d;
        }));
      },
      clearCalculate: function clearCalculate(id) {
        var _this2 = this;

        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var resetModel = arguments.length > 2 ? arguments[2] : undefined;
        this.layerData = Object.freeze(this.layerData.map(function (d, i) {
          if (d.id !== id) return d;
          var resetObj = _this2.resetLayerData[i];

          if (props.length && props.find(function (prop) {
            return prop === _this2.prop;
          }) || !props.length) {
            _this2.updateSlot(_this2.resetLayerData[i].referenceBorderColor);

            resetModel && _this2.form.resetData(_this2.prop.substring(_this2.prop.lastIndexOf("/") + 1));
            d.data = resetObj.data;
            d.referenceBorderColor = resetObj.referenceBorderColor;
            d.disabled = resetObj.disabled;
            return d;
          }
        }));
      },
      updateSlot: function updateSlot(referenceBorderColor) {
        this.$children[0].update(referenceBorderColor);
      }
    },
    mounted: function mounted() {
      // console.log(this.$children[0])
      this.$emit.apply(this.form, ["layer.add", {
        prop: this.prop,
        layer: this
      }]);
    }
  };
  /* script */

  var __vue_script__$2 = script$2;
  /* template */

  /* style */

  var __vue_inject_styles__$2 = undefined;
  /* scoped */

  var __vue_scope_id__$2 = undefined;
  /* module identifier */

  var __vue_module_identifier__$2 = undefined;
  /* functional template */

  var __vue_is_functional_template__$2 = undefined;
  /* style inject */

  /* style inject SSR */

  var Layer = normalizeComponent_1({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined); //
  //
  //
  //
  //
  //

  var script$3 = {
    name: "VueCol",
    props: {
      span: Number
    },
    data: function data() {
      return {};
    },
    computed: {
      style: function style() {
        var style = {};

        if (this.gutter) {
          style.paddingLeft = this.gutter / 2 + "px";
          style.paddingRight = style.paddingLeft;
        }

        if (this.span) {
          style.width = Math.floor(this.span / 24 * 100 * 10000) / 10000 + "%";
        } else {
          style.width = '100%';
        }

        return style;
      },
      gutter: function gutter() {
        var parent = this.$parent;

        while (parent && parent.$options.name !== "VueRow") {
          parent = parent.$parent;
        }

        return parent ? parent.gutter : 0;
      }
    },
    methods: {}
  };
  /* script */

  var __vue_script__$3 = script$3;
  /* template */

  var __vue_render__$2 = function __vue_render__$2() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vue-col",
      style: _vm.style
    }, [_vm._t("default")], 2);
  };

  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;
  /* style */

  var __vue_inject_styles__$3 = undefined;
  /* scoped */

  var __vue_scope_id__$3 = undefined;
  /* module identifier */

  var __vue_module_identifier__$3 = undefined;
  /* functional template */

  var __vue_is_functional_template__$3 = false;
  /* style inject */

  /* style inject SSR */

  var vueCol = normalizeComponent_1({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined);
  var script$4 = {
    name: "VueFormLine",
    components: {
      VueFormItem: vueFormItem,
      VueLayer: Layer,
      VueCol: vueCol
    },
    props: {
      cols: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      label: String,
      required: Boolean,
      span: {
        type: Number,
        default: 24
      },
      labelWidth: String
    },
    computed: {
      form: function form() {
        var parent = this.$parent;
        var parentName = parent.$options.name;

        while (parentName !== "VueForm") {
          parent = parent.$parent;
          parentName = parent.$options.name;
        }

        return parent;
      },
      // 间距
      itemGutter: function itemGutter() {
        return this.form.itemGutter / 2;
      },
      // 响应式
      isResponse: function isResponse() {
        return this.form.isResponse;
      }
    },
    render: function render(h) {
      var _this = this; // 获取节点


      var slotNodes = this.$slots.default.filter(function (d, i) {
        return _this.$slots.default[i].tag;
      });
      var nodes = []; // form-line 实际插入的节点

      var abreastSlotNodes = []; // form-item 内并排节点
      // form-line 节点处理

      (slotNodes || []).forEach(function (slotNode, index) {
        var remainSpace = 24;
        var remainNodeNum = slotNodes.length;
        (_this.cols || []).forEach(function (d) {
          if (d.span) {
            remainSpace -= d.span;
            remainNodeNum--;
          }
        });
        var span, label, labelWidth, prop, required;

        if (_this.cols && _this.cols.length && _this.cols[index]) {
          span = _this.cols[index].span || remainSpace / remainNodeNum;
          label = _this.cols[index].label || "";
          labelWidth = _this.cols[index].labelWidth || _this.labelWidth || _this.form.labelWidth || "80px";
          prop = _this.cols[index].prop || "";
          required = _this.cols[index].required || false;
        } else {
          span = remainSpace / remainNodeNum;
        }

        _this.isResponse && (span = 24);

        var layerRow = _this.form.initLayer.find(function (d) {
          return d.prop === prop;
        });

        var hasColor = layerRow && (layerRow.layer || []).find(function (l) {
          return l.referenceBorderColor;
        });
        var referenceBorderColor = hasColor && hasColor.referenceBorderColor;
        slotNode = h("render-slot", {
          attrs: {
            slotNode: slotNode,
            referenceBorderColor: referenceBorderColor
          }
        }); // 图层分发到 slotNode

        layerRow && (slotNode = h("vue-layer", {
          attrs: {
            layer: layerRow.layer,
            prop: layerRow.prop
          }
        }, [slotNode])); // slotNode 分发

        if (!_this.label) {
          // 基本布局
          nodes.push(h("vue-col", {
            attrs: {
              slotNode: slotNode,
              style: {
                padding: "0 ".concat(_this.itemGutter, "px")
              }
            }
          }, [h("vue-form-item", {
            attrs: {
              label: label,
              labelWidth: labelWidth,
              required: required
            }
          }, [slotNode])]));
        } else {
          // 并列布局
          abreastSlotNodes.push([h("vue-col", {
            attrs: {
              span: span,
              class: {
                "form-line--abreast": true
              }
            }
          }, [slotNode])]);
        }
      }); // 并列布局添加节点

      if (this.label) {
        nodes.push(h("vue-form-item", {
          attrs: {
            label: this.label,
            labelWidth: this.labelWidth || "80px",
            required: this.required,
            style: {
              padding: "0 ".concat(this.itemGutter, "px")
            }
          }
        }, [abreastSlotNodes]));
      }

      var span = this.isResponse ? 24 : this.span;
      return h("vue-col", {
        attrs: {
          span: span,
          class: {
            "form-line--abreast": true
          }
        }
      }, [h("div", {
        attrs: {
          class: {
            "vue-form-line": true
          }
        }
      })]);
    }
  };
  /* script */

  var __vue_script__$4 = script$4;
  /* template */

  /* style */

  var __vue_inject_styles__$4 = undefined;
  /* scoped */

  var __vue_scope_id__$4 = undefined;
  /* module identifier */

  var __vue_module_identifier__$4 = undefined;
  /* functional template */

  var __vue_is_functional_template__$4 = undefined;
  /* style inject */

  /* style inject SSR */

  var VueFormLine = normalizeComponent_1({}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, undefined, undefined);
  var script$5 = {
    name: "VueContent",
    props: ["data"],
    render: function render(h) {
      return h('div', {
        attrs: {
          class: 'vue-layer__content'
        }
      }, [this.data]);
    }
  };
  /* script */

  var __vue_script__$5 = script$5;
  /* template */

  /* style */

  var __vue_inject_styles__$5 = undefined;
  /* scoped */

  var __vue_scope_id__$5 = undefined;
  /* module identifier */

  var __vue_module_identifier__$5 = undefined;
  /* functional template */

  var __vue_is_functional_template__$5 = undefined;
  /* style inject */

  /* style inject SSR */

  var Content = normalizeComponent_1({}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, undefined, undefined);

  function $(params) {
    return document.getElementById(params);
  }

  var Mixin = {
    methods: {
      // 获取参考点ID
      getReferenceId: function getReferenceId() {
        var _this = this;

        if (this.placementId) {
          var samePlacementArr = this.placementObj[this.placement].sort(this.compare("disabled"));
          var index = samePlacementArr.findIndex(function (d) {
            return d.id === _this.placementId;
          });
          if (index !== -1 && samePlacementArr[index - 1]) return samePlacementArr[index - 1].id; // 取同向的前一个
        }
      },
      compare: function compare(property) {
        return function (a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        };
      },
      // 参考点是否在叛逆列表
      referenceInBetrayet: function referenceInBetrayet() {
        var _this2 = this;

        return this.betraye[this.placement].find(function (d) {
          return d === _this2.getReferenceId();
        });
      },
      // 获取变化后的参考点
      getChangeReference: function getChangeReference(placement) {
        var _this3 = this;

        var last = this.placementObj[placement].find(function (d, i) {
          return i === _this3.placementObj[placement].length - 1;
        }); // 取反方向的最后一个

        return last ? $(last.id) : this.reference;
      },
      getPlacementAllRect: function getPlacementAllRect() {
        var placement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.placement;
        var width = 0;
        var height = 0;
        (this.placementObj[placement] || []).forEach(function (d) {
          height += getDomClientRect($(d.id)).height + 12;
          width += getDomClientRect($(d.id)).width + 12;
        });
        return {
          width: width,
          height: height
        };
      },
      calculateCoordinate: function calculateCoordinate() {
        !this.addedBody && this.popoverAddedBody();
        var popoverRect = getDomClientRect(this.$el);
        var reference = $(this.getReferenceId()) || this.reference;
        var referenceRect = getDomClientRect(reference);
        var referenceRectCount = referenceRect;
        var position = {
          top: 0,
          left: 0 // 判断是否改变方向与确定最终参考点

        };

        switch (this.placement) {
          case "top":
            if (getDomClientRect(this.reference).top - this.getPlacementAllRect().height < 0 && getDomClientRect(this.reference).bottom + this.getPlacementAllRect("bottom").height > window.innerHeight) {
              this.momentPlacement = "top";
              break;
            }

            if (this.referenceInBetrayet()) {
              this.momentPlacement = "bottom";
            } else {
              if (referenceRect.top - popoverRect.height - 12 < 0) {
                this.momentPlacement = "bottom";
                reference = this.getChangeReference(this.momentPlacement);
                referenceRectCount = getDomClientRect(reference);
              } else {
                this.momentPlacement = "top";
              }
            }

            break;

          case "left":
            if (getDomClientRect(this.reference).left - this.getPlacementAllRect().width < 0 && getDomClientRect(this.reference).right + this.getPlacementAllRect("right").width > window.innerWidth) {
              this.momentPlacement = "left";
              break;
            }

            if (this.referenceInBetrayet()) {
              this.momentPlacement = "right";
            } else {
              if (referenceRect.left - popoverRect.width - 12 < 0) {
                this.momentPlacement = "right";
                reference = this.getChangeReference(this.momentPlacement);
                referenceRectCount = getDomClientRect(reference);
              } else {
                this.momentPlacement = "left";
              }
            }

            break;

          case "right":
            if (getDomClientRect(this.reference).left - this.getPlacementAllRect("left").width < 0 && getDomClientRect(this.reference).right + this.getPlacementAllRect().width > window.innerWidth) {
              this.momentPlacement = "right";
              break;
            }

            if (this.referenceInBetrayet()) {
              this.momentPlacement = "left";
            } else {
              if (referenceRect.right + popoverRect.width + 12 > window.innerWidth) {
                this.momentPlacement = "left";
                reference = this.getChangeReference(this.momentPlacement);
                referenceRectCount = getDomClientRect(reference);
              } else {
                this.momentPlacement = "right";
              }
            }

            break;

          case "bottom":
            if (getDomClientRect(this.reference).top - this.getPlacementAllRect("top").height < 0 && getDomClientRect(this.reference).bottom + this.getPlacementAllRect().height > window.innerHeight) {
              this.momentPlacement = "bottom";
              break;
            }

            if (this.referenceInBetrayet()) {
              this.momentPlacement = "top";
            } else {
              if (referenceRect.bottom + popoverRect.height + 12 > window.innerHeight) {
                this.momentPlacement = "top";
                reference = this.getChangeReference(this.momentPlacement);
                referenceRectCount = getDomClientRect(reference);
              } else {
                this.momentPlacement = "bottom";
              }
            }

            break;

          default:
            console.error("Wrong placement prop");
        } // 计算节点坐标


        switch (this.momentPlacement) {
          case "top":
            position.left = referenceRectCount.left - popoverRect.width / 2 + referenceRectCount.width / 2;
            position.top = referenceRectCount.top - popoverRect.height - 12;
            break;

          case "left":
            position.left = referenceRectCount.left - popoverRect.width - 12;
            position.top = referenceRectCount.top + referenceRectCount.height / 2 - popoverRect.height / 2;
            break;

          case "right":
            position.left = referenceRectCount.left + referenceRectCount.width + 12;
            position.top = referenceRectCount.top + referenceRectCount.height / 2 - popoverRect.height / 2;
            break;

          case "bottom":
            position.left = referenceRectCount.left - popoverRect.width / 2 + referenceRectCount.width / 2;
            position.top = referenceRectCount.top + referenceRectCount.height + 12;
            break;

          default:
            console.error("Wrong placement prop");
        }

        this.$el.style.top = position.top + "px";
        this.$el.style.left = position.left + "px";
      }
    }
  }; //

  var script$6 = {
    name: "VuePopover",
    mixins: [Mixin],
    components: {
      Content: Content
    },
    props: {
      referenceId: String,
      // 需要监听的事件
      trigger: {
        type: String,
        default: "hover"
      },
      effect: {
        type: String,
        default: "dark"
      },
      borderColor: String,
      // popover消息提示
      data: [String, Object, Array],
      disabled: [Boolean, Number],
      placement: {
        type: String,
        default: "top"
      },
      placementId: String,
      betraye: Object,
      // 叛逆者对象
      placementObj: Object,
      // popover 各个方向成员
      visibleArrow: {
        type: Boolean,
        default: true
      },
      showAlways: Boolean,
      positions: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      enterable: Boolean,
      popoverClass: String,
      hideDelay: {
        type: Number,
        default: 200
      },
      prop: String
    },
    data: function data() {
      return {
        reference: null,
        show: false,
        addedBody: false,
        timeoutPending: null,
        momentPlacement: this.placement,
        parentNodes: []
      };
    },
    watch: {
      show: function show(val) {
        if (this.showAlways) return;

        if (val) {
          this.$emit.apply(this.form, ["popover.show", this.prop]);
          this.popoverAddedBody();
          this.calculateCoordinate();
        } else {
          this.$emit.apply(this.form, ["popover.hide", this.prop]);
        }
      },
      // 叛逆者管理
      momentPlacement: function momentPlacement(val) {
        val === this.placement ? this.$emit("removeBetrayer", {
          id: this.placementId,
          placement: this.placement
        }) : this.$emit("addBetrayer", {
          id: this.placementId,
          placement: this.placement
        });
      }
    },
    computed: {
      // 对应方向是否有多个图层
      isMorePlacement: function isMorePlacement() {
        var _this = this;

        var isMorePlacement = false;

        if (['top', 'bottom'].find(function (d) {
          return d === _this.placement;
        })) {
          this.placementObj['top'].length + this.placementObj['bottom'].length >= 2 && (isMorePlacement = true);
        }

        if (['left', 'right'].find(function (d) {
          return d === _this.placement;
        })) {
          return this.placementObj['left'].length + this.placementObj['right'].length >= 2 && (isMorePlacement = true);
        }

        return isMorePlacement;
      },
      form: function form() {
        var parent = this.$parent;
        var parentName = parent.$options.name;

        while (parentName !== "VueForm") {
          parent = parent.$parent;
          parentName = parent.$options.name;
        }

        return parent;
      },
      isVisible: function isVisible() {
        return (this.showAlways || this.show) && !this.disabled;
      },
      pClass: function pClass() {
        return "".concat(this.effect ? "is-".concat(this.effect) : "is-light", "  vue-popover__").concat(this.momentPlacement, " ").concat(this.popoverClass || "", " ").concat(this.isVisible ? "vue-popover--visible" : "vue-popover--hidden");
      },
      popoverStyle: function popoverStyle() {
        var style = {
          "--borderColor": "#ccc",
          "--bgColor": "#fff"
        };

        if (typeof this.effect === "string") {
          switch (this.effect) {
            case "light":
              style["--borderColor"] = "#ccc";
              style["--bgColor"] = "#fff";
              break;

            case "dark":
              style["--borderColor"] = "#303133";
              style["--bgColor"] = "#303133";
              style["--color"] = "#fff";
              break;

            case "info":
              style["--borderColor"] = "#e6a23c";
              style["--bgColor"] = "#e6a23c";
              style["--color"] = "#fff";
              break;

            case "error":
              style["--borderColor"] = "#f56c6c";
              style["--bgColor"] = "#f56c6c";
              style["--color"] = "#fff";
              break;

            default:
              style["--borderColor"] = this.borderColor || this.effect;
              style["--bgColor"] = this.effect;
              style["--color"] = "#fff";
              break;
          }
        }

        return style;
      }
    },
    methods: {
      popoverAddedBody: function popoverAddedBody() {
        if (!this.addedBody && (this.show || this.showAlways)) {
          document.body.appendChild(this.$el);
          this.addedBody = true;
        }
      },
      triggerClick: function triggerClick(e) {
        var popover = this.$el;
        var trigger = this.reference;
        if (!popover || !trigger || !e.target) return;

        if (trigger.contains(e.target)) {
          !this.disabled && (this.show = !this.show);
        } else if (popover.contains(e.target)) {
          return;
        } else {
          this.show = false;
        }
      },
      doShow: function doShow() {
        if (!this.disabled && this.trigger !== "click") {
          if (this.timeoutPending) {
            clearTimeout(this.timeoutPending);
            this.show = true;
          } else {
            this.show = true;
          }
        }
      },
      doHide: function doHide() {
        var _this2 = this;

        if (!this.disabled && this.trigger !== "click") {
          this.timeoutPending = setTimeout(function () {
            _this2.show = false;
          }, this.hideDelay);
        }
      },
      mouseenterWrap: function mouseenterWrap() {
        this.enterable && clearTimeout(this.timeoutPending);
      },
      mouseleaveWrap: function mouseleaveWrap() {
        var _this3 = this;

        if (this.enterable && this.trigger !== "click") {
          this.timeoutPending = setTimeout(function () {
            _this3.show = false;
          }, 200);
        }
      },
      scrollChange: function scrollChange() {
        if (this.isVisible) {
          this.calculateCoordinate(); // 可见的popover实时计算位置
        } else {
          this.isMorePlacement && debounce(this.calculateCoordinate)(); // 不可见的popover,如果是多图层，位置计算开启节流
        }
      }
    },
    mounted: function mounted() {
      var _this4 = this;

      this.$nextTick(function () {
        var referenceId = document.getElementById(_this4.referenceId);
        if (!referenceId) return;
        _this4.reference = referenceId.children[0];
        _this4.parentNodes = getParentNodes(_this4.reference);
        enableEventListener(_this4.parentNodes, _this4.scrollChange);

        _this4.calculateCoordinate();

        if (_this4.trigger === "hover") {
          on(_this4.reference, "mouseenter", _this4.doShow);
          on(_this4.reference, "mouseleave", _this4.doHide);
        } else if (_this4.trigger === "focus") {
          on(_this4.reference, "focus", _this4.doShow);
          on(_this4.reference, "blur", _this4.doHide);
        } else {
          on(window, "click", _this4.triggerClick);
        }
      });
    },
    beforeDestroy: function beforeDestroy() {
      if (!this.reference || !this.reference.nodeName) return;
      removeEventListener(this.parentNodes, this.scrollChange);

      if (this.trigger === "hover") {
        off(this.reference, "mouseenter", this.doShow);
        off(this.reference, "mouseleave", this.doHide);
      } else if (this.trigger === "focus") {
        off(this.reference, "focus", this.doShow);
        off(this.reference, "blur", this.doHide);
      } else {
        off(window, "click", this.triggerClick);
      }

      this.addedBody && document.body.removeChild(this.$el);
    }
  };
  /* script */

  var __vue_script__$6 = script$6;
  /* template */

  var __vue_render__$3 = function __vue_render__$3() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("transition", {
      attrs: {
        name: "fade"
      }
    }, [_c("div", {
      ref: "popover",
      staticClass: "vue-popover",
      class: _vm.pClass,
      style: _vm.popoverStyle,
      attrs: {
        id: _vm.placementId
      },
      on: {
        mouseenter: _vm.mouseenterWrap,
        mouseleave: _vm.mouseleaveWrap
      }
    }, [_vm.visibleArrow ? _c("div", {
      staticClass: "vue-popover__arrow"
    }) : _vm._e(), _vm._v(" "), _c("vue-content", {
      attrs: {
        data: _vm.data
      }
    })], 1)]);
  };

  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;
  /* style */

  var __vue_inject_styles__$6 = undefined;
  /* scoped */

  var __vue_scope_id__$6 = undefined;
  /* module identifier */

  var __vue_module_identifier__$6 = undefined;
  /* functional template */

  var __vue_is_functional_template__$6 = false;
  /* style inject */

  /* style inject SSR */

  var VuePopover = normalizeComponent_1({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, undefined, undefined); //

  var script$7 = {
    name: "VueText",
    components: {
      Content: Content
    },
    props: {
      referenceId: String,
      data: [String, Object, Array],
      disabled: Boolean,
      effect: String,
      placement: {
        type: String,
        default: "bottom"
      }
    },
    data: function data() {
      return {
        reference: null
      };
    },
    methods: {
      calculateCoordinate: function calculateCoordinate() {
        if (!this.$el) return;

        switch (this.placement) {
          case "top":
            this.$el.style.top = -this.$el.offsetHeight - 3 + "px";
            break;

          case "right":
            this.$el.style.width = this.$el.offsetWidth + "px";
            this.$el.style.left = this.reference.offsetWidth + 3 + "px";
            break;

          case "bottom":
            break;

          case "left":
            this.$el.style.width = this.$el.offsetWidth + "px";
            this.$el.style.left = -this.$el.offsetWidth - 3 + "px";
            break;

          default:
            console.error("placement 必须是 top/right/bottom/left");
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        _this.reference = document.getElementById(_this.referenceId);

        _this.calculateCoordinate();
      });
    }
  };
  /* script */

  var __vue_script__$7 = script$7;
  /* template */

  var __vue_render__$4 = function __vue_render__$4() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("vue-content", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.disabled,
        expression: "!disabled"
      }],
      ref: "vueTextContent",
      staticClass: "vue-text-content",
      class: "vue-text__" + _vm.placement,
      style: {
        color: _vm.effect
      },
      attrs: {
        data: _vm.data
      }
    });
  };

  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;
  /* style */

  var __vue_inject_styles__$7 = undefined;
  /* scoped */

  var __vue_scope_id__$7 = undefined;
  /* module identifier */

  var __vue_module_identifier__$7 = undefined;
  /* functional template */

  var __vue_is_functional_template__$7 = false;
  /* style inject */

  /* style inject SSR */

  var VueText = normalizeComponent_1({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, undefined, undefined);
  var script$8 = {
    name: "RenderSlot",
    componentName: "RenderSlot",
    props: ["slotNode", "referenceBorderColor"],
    render: function render(h) {
      return this.slotNode;
    },
    data: function data() {
      return {
        focusNode: null,
        borderColor: this.referenceBorderColor
      };
    },
    watch: {
      borderColor: function borderColor(val) {
        var _this = this;

        this.$nextTick(function () {
          if (_this.focusNode !== _this.$el) {
            _this.focusNode.style.borderColor = val || "#dcdfe6";
          } else {
            _this.$el.style.borderColor = val || "transparent";
          }
        });
      }
    },
    methods: {
      allChildNodes: function allChildNodes(node, names) {
        // 1.创建全部节点的数组
        var allCN = [];
        names.find(function (d) {
          return d === node.nodeName;
        }) && allCN.push(node); // 2.递归获取全部节点

        var getAllChildNodes = function getAllChildNodes(node, names, allCN) {
          // 获取当前元素所有的子节点nodes
          var nodes = node.childNodes; // 获取nodes的子节点

          for (var i = 0; i < nodes.length; i++) {
            var child = nodes[i]; // 判断是否为指定类型节点

            if (names.find(function (d) {
              return d === child.nodeName;
            })) {
              allCN.push(child);
            }

            getAllChildNodes(child, names, allCN);
          }
        };

        getAllChildNodes(node, names, allCN); // 3.返回全部节点的数组

        return allCN;
      },
      update: function update(borderColor) {
        this.borderColor = borderColor;
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      this.$nextTick(function () {
        var focusNodes = _this2.allChildNodes(_this2.$el, ["TEXTAREA", "INPUT", "SELECT"]);

        if (focusNodes.length === 1) {
          _this2.focusNode = focusNodes[0];
        } else {
          _this2.focusNode = _this2.$el;
          _this2.focusNode.style.cssText = "border: 1px solid ".concat(_this2.borderColor || "transparent");
        }
      });
    }
  };
  /* script */

  var __vue_script__$8 = script$8;
  /* template */

  /* style */

  var __vue_inject_styles__$8 = undefined;
  /* scoped */

  var __vue_scope_id__$8 = undefined;
  /* module identifier */

  var __vue_module_identifier__$8 = undefined;
  /* functional template */

  var __vue_is_functional_template__$8 = undefined;
  /* style inject */

  /* style inject SSR */

  var RenderSlot = normalizeComponent_1({}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined);
  var components = [vueForm, VueFormLine, vueFormItem, VuePopover, vueCol, Content, VueText, Layer, RenderSlot];
  var plugin = {
    install: function install(Vue) {
      components.forEach(function (component) {
        Vue.component(component.name, component);
      });
    }
  };
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.Col = vueCol;
  exports.Content = Content;
  exports.Form = vueForm;
  exports.FormItem = vueFormItem;
  exports.FormLine = VueFormLine;
  exports.Layer = Layer;
  exports.Popover = VuePopover;
  exports.RenderSlot = RenderSlot;
  exports.VueText = VueText;
  exports.default = plugin;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});