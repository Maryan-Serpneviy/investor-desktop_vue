import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueWebSocket from 'vue-native-websocket'
import { API_URL, VWSOptions } from '@/core/api.config'

Vue.config.productionTip = false

Vue.use(VueWebSocket,
  API_URL,
  {
    store,
    ...VWSOptions
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
