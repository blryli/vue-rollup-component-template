import vueForm from './form.vue';

/* istanbul ignore next */
vueForm.install = function(Vue) {
  Vue.component(vueForm.name, vueForm);
};

export default vueForm;
