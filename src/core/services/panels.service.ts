import getPanels from '../data/panels'
import { Panel } from '@/types/interfaces'
import { APP_PREFIX } from '@/core/config'

const PANELS = `${APP_PREFIX}/panels`
const DELETED = `${APP_PREFIX}/deleted`

export class PanelsService {
  static save(payload: Array<Panel>, storageKey: string) {
    try {
      const serializedPanels = JSON.stringify(payload)
      window.localStorage.setItem(storageKey, serializedPanels)
    } catch (err) {
      console.error(err)
    }
  }

  static savePanels(payload: Array<Panel>) {
    this.save(payload, PANELS)
  }

  static saveDeleted(payload: Array<Panel>) {
    this.save(payload, DELETED)
  }

  static loadPanels() {
    try {
      const serializedPanels = window.localStorage.getItem(PANELS)
      if (serializedPanels === null) {
        return getPanels()
      }
      return JSON.parse(serializedPanels)
    } catch (err) {
      return undefined
    }
  }

  static loadDeleted() {
    try {
      const serializedPanels = window.localStorage.getItem(DELETED)
      if (serializedPanels === null) {
        return []
      }
      return JSON.parse(serializedPanels)
    } catch (err) {
      return undefined
    }
  }

  static clear() {
    try {
      if (window.localStorage.getItem(PANELS)) {
        window.localStorage.removeItem(PANELS)
      }
      if (window.localStorage.getItem(DELETED)) {
        window.localStorage.removeItem(DELETED)
      }
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }
}
