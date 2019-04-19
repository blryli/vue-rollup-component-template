import vueCol from './col.vue';

/* istanbul ignore next */
vueCol.install = function(Vue) {
  Vue.component(vueCol.name, vueCol);
};

export default vueCol;
