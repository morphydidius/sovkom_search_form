import Vue from 'vue'
import App from './index.vue'

import './scss/index.scss'

import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

