import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueWebSocket from 'vue-native-websocket'
import { VWSOptions } from '@/plugins/websocket'
import { WS_API_URL } from '@/core/config'

Vue.config.productionTip = false

Vue.use(VueWebSocket, WS_API_URL,
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
