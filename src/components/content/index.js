import Content from './content.vue';

/* istanbul ignore next */
Content.install = function(Vue) {
  Vue.component(Content.name, Content);
};

export default Content;
