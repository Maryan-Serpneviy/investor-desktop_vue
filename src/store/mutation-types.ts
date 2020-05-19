export enum Type {
  LOAD_PANELS = 'LOAD_PANELS',
  LOAD_DELETED = 'LOAD_DELETED',
  SHOW_ON_TOP = 'SHOW_ON_TOP',
  MARK_PANEL_ACTIVE = 'MARK_PANEL_ACTIVE',
  MARK_ALL_INACTIVE = 'MARK_ALL_INACTIVE',
  CHANGE_RESIZING_STATE = 'CHANGE_RESIZING_STATE',
  SAVE_PANEL_POSITION = 'SAVE_PANEL_POSITION',
  SAVE_PANEL_SIZE = 'SAVE_PANEL_SIZE',
  MOVE_TO_DELETED = 'MOVE_TO_DELETED',
  MOVE_FROM_DELETED = 'MOVE_FROM_DELETED',
  RETURN_PANEL = 'RETURN_PANEL',

  SOCKET_ONOPEN = 'SOCKET_ONOPEN',
  SOCKET_ONCLOSE = 'SOCKET_ONCLOSE',
  SOCKET_ONERROR = 'SOCKET_ONERROR',
  SOCKET_ONMESSAGE = 'SOCKET_ONMESSAGE',
  SOCKET_RECONNECT = 'SOCKET_RECONNECT',
  SOCKET_RECONNECT_ERROR = 'SOCKET_RECONNECT_ERROR',
  PUSH_TRANSACTION = 'PUSH_TRANSACTION',
  CLEAR_TRANSACTIONS = 'CLEAR_TRANSACTIONS'
}
