import VueText from './text.vue';

/* istanbul ignore next */
VueText.install = function(Vue) {
  Vue.component(VueText.name, VueText);
};

export default VueText;