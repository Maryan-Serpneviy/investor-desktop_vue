export interface Panel {
  id: number
  posX: number
  posY: number
  width: number
  height: number
  zIndex: number
  active: boolean
}

export interface Transaction {
  from: string
  to: string
  sum: number
}
