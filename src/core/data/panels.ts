import { Panel } from '@/types/interfaces'
import { PANEL_WIDTH, PANEL_HEIGHT } from '@/core/config'

export default (): Array<Panel> => ([
  {
    id: 1,
    posX: 20,
    posY: 60,
    width: PANEL_WIDTH,
    height: PANEL_HEIGHT,
    zIndex: 0,
    active: false
  },
  {
    id: 2,
    posX: 340,
    posY: 60,
    width: PANEL_WIDTH,
    height: PANEL_HEIGHT,
    zIndex: 0,
    active: false
  },
  {
    id: 3,
    posX: 660,
    posY: 60,
    width: PANEL_WIDTH,
    height: PANEL_HEIGHT,
    zIndex: 0,
    active: false
  },
  {
    id: 4,
    posX: 20,
    posY: 180,
    width: PANEL_WIDTH,
    height: PANEL_HEIGHT,
    zIndex: 0,
    active: false
  },
  {
    id: 5,
    posX: 340,
    posY: 180,
    width: PANEL_WIDTH,
    height: PANEL_HEIGHT,
    zIndex: 0,
    active: false
  }
])
