import Vue from 'vue'
import App from './App.vue'
import VueFormLayer from '../../'
import '../../dist/vue-rollup-component.css'

Vue.config.productionTip = false

Vue.use(VueFormLayer)

new Vue({
  el: '#app',
  render: h => h(App)
})
