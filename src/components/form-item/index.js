import vueFormItem from './form-item.vue';

/* istanbul ignore next */
vueFormItem.install = function(Vue) {
  Vue.component(vueFormItem.name, vueFormItem);
};

export default vueFormItem;
