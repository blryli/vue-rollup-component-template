import Layer from './layer.vue';

/* istanbul ignore next */
Layer.install = function(Vue) {
  Vue.component(Layer.name, Layer);
};

export default Layer;
