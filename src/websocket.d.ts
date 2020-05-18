import Vue from 'vue'
import VueWebSocket from 'vue-websocket'

declare module 'vue/types/vue' {
  interface Vue {
    $options: {
      socket: typeof WebSocket
    }
    $connect: () => void
    $disconnect: () => void
  }
}
