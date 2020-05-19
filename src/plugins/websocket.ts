import Vue from 'vue'
import VueWebSocket from 'vue-native-websocket'
import store from '@/store'
import { API_URL, VWSOptions } from '@/core/api.config'

Vue.use(VueWebSocket,
  API_URL,
  {
    store,
    ...VWSOptions
  }
)
