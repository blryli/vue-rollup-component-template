import VuePopover from './popover.vue';

/* istanbul ignore next */
VuePopover.install = function(Vue) {
  Vue.component(VuePopover.name, VuePopover);
};

export default VuePopover;