import Vue from 'vue'
import { Transaction } from '@/types/interfaces'
import { Type } from './mutation-types'

const {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR,
  CLEAR_TRANSACTIONS
} = Type

export const transactionsModule = {
  state: () => ({
    socket: {
      isConnected: false,
      reconnectError: false,
      message: '' as '' | Transaction
    },
    transactions: [] as [] | Transaction[],
    sum: 0
  }),
  getters: {
    transactions: (state: { transactions: Transaction[] }) => state.transactions,
    sum: (state: { sum: number }) => state.sum
  },
  mutations: {
    [SOCKET_ONOPEN] (state: { socket: { isConnected: boolean } }, event: { currentTarget: any }) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    [SOCKET_ONCLOSE] (state: { socket: { isConnected: boolean } }, event: any) {
      state.socket.isConnected = false
    },
    [SOCKET_ONERROR] (state: any, event: any) {
      console.error(state, event)
    },
    [SOCKET_ONMESSAGE] (state: { transactions: Transaction[]; sum: number; socket: { message: any } }, message: { x: { inputs: string | any[]; out: string | any[] } }) {
      /**
       * We're performing here a synthetic filter:
       * there's one sender and one addressee to slow down a little
       * a speed of incoming "transactions" so our UI wasn't clogged too fast
       */
      if (message.x.inputs.length == 1 && message.x.out.length == 1) {
        const from = message.x.inputs[0].prev_out.addr
        const to = message.x.out[0].addr
        const sum = (message.x.inputs[0].prev_out.value - message.x.out[0].value) / 10000000

        state.transactions.push({ from, to, sum })
        state.sum += sum
      }
      state.socket.message = message
    },
    [SOCKET_RECONNECT] (state: any, count: any) {
      console.info(state, count)
    },
    [SOCKET_RECONNECT_ERROR] (state: { socket: { reconnectError: boolean } }) {
      state.socket.reconnectError = true
    },
    [CLEAR_TRANSACTIONS] (state: { transactions: Transaction[]; sum: number }) {
      state.transactions = []
      state.sum = 0
    }
  },
  actions: {
    sendMessage(store: any, message: any) {
      Vue.prototype.$socket.sendObj(message)
    },
    resetTransactions(store: { commit: (arg0: Type) => void }) {
      store.commit(CLEAR_TRANSACTIONS)
    }
  }
}
