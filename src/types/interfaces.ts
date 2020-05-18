export interface Panel {
  id: number
  active: boolean
  zIndex: number
  posX: number
  posY: number
  width: number
  height: number
}

export interface Transaction {
  from: string
  to: string
  sum: number
}
