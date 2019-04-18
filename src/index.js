import VueTest from './components/test.vue'

export {
  VueTest,
}

const plugin = {
  // eslint-disable-next-line no-undef
  // version: VERSION,
  install (Vue, options) {
    Vue.component(VueTest.name, VueTest)
  },
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
