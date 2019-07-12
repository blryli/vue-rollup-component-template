import Vue from 'vue'
import App from './App.vue'
import VueRollupComponentTemplate from '../../'
import '../../dist/vue-rollup-component-template.css'

Vue.use(VueRollupComponentTemplate)

new Vue({
  el: '#app',
  render: h => h(App)
})
