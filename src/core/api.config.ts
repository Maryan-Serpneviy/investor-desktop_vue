export const API_URL = 'wss://ws.blockchain.info/inv'

export const SUBSCRIBE = { op: 'unconfirmed_sub' }
export const UNSUBSCRIBE = { op: 'unconfirmed_unsub' }

export const VWSOptions = {
  format: 'json',
  connectManually: true,
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 5000
}
