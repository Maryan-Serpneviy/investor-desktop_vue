import Vue from 'vue'
import VueWebSocket from 'vue-native-websocket'
import store from '@/store'

export const VWSOptions = {
  format: 'json',
  connectManually: true,
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 5000
}

Vue.use(VueWebSocket,
  'wss://ws.blockchain.info/inv',
  {
    store,
    ...VWSOptions
  }
)
