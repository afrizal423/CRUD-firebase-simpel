import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueFire from 'vuefire'

Vue.use(VueFire)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
