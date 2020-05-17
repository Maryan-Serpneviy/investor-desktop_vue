import { PanelsService } from '@/core/services/panels.service'
import { Panel } from '@/types/interfaces'
import { Type } from './mutation-types'

const {
  LOAD_PANELS,
  LOAD_DELETED,
  SHOW_ON_TOP,
  MARK_PANEL_ACTIVE,
  MARK_ALL_INACTIVE,
  CHANGE_RESIZING_STATE,
  SAVE_PANEL_POSITION,
  SAVE_PANEL_SIZE,
  MOVE_TO_DELETED,
  MOVE_FROM_DELETED
} = Type

export const desktopModule = {
  state: () => ({
    panels: [] as [] | Panel[],
    deleted: [] as [] | Panel[],
    resizing: false
  }),
  getters: {
    panels: (state: { panels: Panel[] }) => state.panels,
    deleted: (state: { deleted: Panel[] | [] }) => state.deleted
  },
  mutations: {
    [LOAD_PANELS] (state: { panels: Panel[] }) {
      state.panels = PanelsService.loadPanels()
    },
    [LOAD_DELETED] (state: { deleted: Panel[] }) {
      state.deleted = PanelsService.loadDeleted()
    },
    [SHOW_ON_TOP] (state: { panels: Panel[] }, id: number) {
      const matched = state.panels.find((panel: { id: number }) => panel.id == id)
      state.panels.forEach((panel: { zIndex: number }) => {
        panel.zIndex = 1
      })
      if (matched) matched.zIndex = 2
    },
    [MARK_PANEL_ACTIVE] (state: { panels: Panel[] }, id: number) {
      state.panels.forEach((panel: { active: boolean }) => {
        panel.active = false
      })
      const matched = state.panels.find((panel: { id: number }) => panel.id == id)
      if (matched) matched.active = true
    },
    [MARK_ALL_INACTIVE] (state: { panels: Panel[] }) {
      state.panels.forEach((panel: { active: boolean }) => {
        panel.active = false
      })
    },
    [CHANGE_RESIZING_STATE] (state: { resizing: boolean }, status: boolean) {
      state.resizing = status
    },
    [SAVE_PANEL_POSITION] (state: { panels: Panel[] }, payload: { id: number; x: number; y: number }) {
      const matched = state.panels.find((panel: { id: number }) => panel.id == payload.id)
      if (matched) {
        matched.posX = payload.x
        matched.posY = payload.y
      }
    },
    [SAVE_PANEL_SIZE] (state: { panels: Panel[] }, payload: { id: number; width: number; height: number }) {
      const matched = state.panels.find((panel: { id: number }) => panel.id == payload.id)
      if (matched) {
        matched.width = payload.width
        matched.height = payload.height
      }
    },
    [MOVE_TO_DELETED] (state: { panels: any[]; deleted: Panel[] }, id: number) {
      const matched = state.panels.find((panel: { id: number }) => panel.id == id)
      const matchedIndex = state.panels.indexOf(matched)
      const deleted = state.panels.splice(matchedIndex, 1)[0]

      state.deleted.push(deleted)
    },
    [MOVE_FROM_DELETED] (state: { deleted: any[]; panels: Panel[] }, id: number) {
      const matched = state.deleted.find((panel: { id: number }) => panel.id == id)
      const matchedIndex = state.deleted.indexOf(matched)
      const restored = state.deleted.splice(matchedIndex, 1)[0]

      restored.width = 300
      restored.height = 100
      restored.posX = 0
      restored.posY = 0

      state.panels.push(restored)
    }
  },
  actions: {
    loadPanels(store: { commit: (arg0: string) => void }) {
      store.commit(LOAD_PANELS)
    },
    loadDeleted(store: { commit: (arg0: string) => void }) {
      store.commit(LOAD_DELETED)
    },
    showOnTop(store: { commit: (arg0: string, id: number) => void }, id: number) {
      store.commit(SHOW_ON_TOP, id)
    },
    toggleActive(store: { commit: (arg0: string, id: number) => void }, id: number) {
      store.commit(MARK_PANEL_ACTIVE, id)
    },
    cancelSelection(store: { commit: (arg0: string) => void }) {
      store.commit(MARK_ALL_INACTIVE)
    },
    toggleResize(store: { commit: (arg0: string, status: boolean) => void }, status: boolean) {
      store.commit(CHANGE_RESIZING_STATE, status)
    },
    saveTileCoords(store: { commit: (arg0: string, payload: { id: number; x: number; y: number }) => void; state: { panels: Panel[] } }, payload: { id: number; x: number; y: number }) {
      store.commit(SAVE_PANEL_POSITION, payload)
      PanelsService.savePanels(store.state.panels)
    },
    saveTileSize(store: { commit: (arg0: string, payload: { id: number; width: number; height: number }) => void; state: { panels: Panel[] } }, payload: { id: number; width: number; height: number }) {
      store.commit(SAVE_PANEL_SIZE, payload)
      PanelsService.savePanels(store.state.panels)
    },
    removeTile(store: { commit: (arg0: string, id: number) => void; state: { panels: Panel[]; deleted: Panel[] } }, id: number) {
      store.commit(MOVE_TO_DELETED, id)
      PanelsService.savePanels(store.state.panels)
      PanelsService.saveDeleted(store.state.deleted)
    },
    restoreTile(store: { commit: (arg0: string, id: number) => void; state: { panels: Panel[]; deleted: Panel[] } }, id: number) {
      store.commit(MOVE_FROM_DELETED, id)
      PanelsService.savePanels(store.state.panels)
      PanelsService.saveDeleted(store.state.deleted)
    }
  }
}
