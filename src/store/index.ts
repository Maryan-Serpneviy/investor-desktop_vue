import Vue from 'vue'
import Vuex from 'vuex'
import { PanelsService } from '@/core/services/panels.service'
import { Panel } from '@/types/interfaces'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    panels: [] as [] | Array<Panel>,
    deleted: [] as [] | Array<Panel>,
    resizing: false
  },
  getters: {
    panels: (state) => state.panels,
    deleted: (state) => state.deleted
  },
  mutations: {
    loadPanels(state) {
      state.panels = PanelsService.load()
    },
    showOnTop(state, id: number) {
      const matched = state.panels.find(panel => panel.id == id)
      state.panels.forEach(panel => {
        panel.zIndex = 1
      })
      if (matched) matched.zIndex = 2
    },
    markPanelActive(state, id: number) {
      state.panels.forEach(panel => {
        panel.active = false
      })
      const matched = state.panels.find(panel => panel.id == id)
      if (matched) matched.active = true
    },
    markAllInactive(state) {
      state.panels.forEach(panel => {
        panel.active = false
      })
    },
    changeResizingState(state, status: boolean) {
      state.resizing = status
    },
    savePanelPosition(state, payload: { id: number; x: number; y: number }) {
      const matched = state.panels.find(panel => panel.id == payload.id)
      if (matched) {
        matched.posX = payload.x
        matched.posY = payload.y
      }
    },
    savePanelSize(state, payload: { id: number; width: number; height: number }) {
      const matched = state.panels.find(panel => panel.id == payload.id)
      if (matched) {
        matched.width = payload.width
        matched.height = payload.height
      }
    },
    moveToDeleted(state, id: number) {
      const matched = state.panels.find(panel => panel.id == id)
      const matchedIndex = state.panels.indexOf(matched)
      const deleted = state.panels.splice(matchedIndex, 1)[0]

      state.deleted.push(deleted)
    },
    moveFromDeleted(state, id: number) {
      const matched = state.deleted.find(panel => panel.id == id)
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
    loadPanels(store) {
      store.commit('loadPanels')
    },
    showOnTop(store, id: number) {
      store.commit('showOnTop', id)
    },
    toggleActive(store, id: number) {
      store.commit('markPanelActive', id)
    },
    cancelSelection(store) {
      store.commit('markAllInactive')
    },
    toggleResize(store, status: boolean) {
      store.commit('changeResizingState', status)
    },
    saveTileCoords(store, payload: { id: number; x: number; y: number }) {
      store.commit('savePanelPosition', payload)
      PanelsService.save(store.state.panels)
    },
    saveTileSize(store, payload: { id: number; width: number; height: number }) {
      store.commit('savePanelSize', payload)
      PanelsService.save(store.state.panels)
    },
    removeTile(store, id: number) {
      store.commit('moveToDeleted', id)
    },
    restoreTile(store, id: number) {
      store.commit('moveFromDeleted', id)
    }
  },
  modules: {
  }
})
