import getPanels from '../data/panels'
import { Panel } from '@/types/interfaces'
import { APP_PREFIX } from '@/core/config'

const PANELS = `${APP_PREFIX}/panels`

export class PanelsService {
  static save(payload: Array<Panel>) {
    try {
      const serializedPanels = JSON.stringify(payload)
      localStorage.setItem(PANELS, serializedPanels)
    } catch (err) {
      console.error(err)
    }
  }

  static load() {
    try {
      const serializedPanels = localStorage.getItem(PANELS)
      if (serializedPanels === null) {
        return getPanels()
      }
      return JSON.parse(serializedPanels)
    } catch (err) {
      return undefined
    }
  }
}
