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
    panels: (state) => state.panels
  },
  mutations: {
    loadPanels(state) {
      state.panels = PanelsService.load()
    },
    markPanelActive(state, panelId: number) {
      state.panels.forEach(panel => {
        panel.active = false
      })
      const matchedPanel = state.panels.find(panel => panel.id == panelId)
      matchedPanel.active = true
    },
    markAllInactive(state) {
      state.panels.forEach(panel => {
        panel.active = false
      })
    },
    switchResizingState(state, status: boolean) {
      state.resizing = status
    },
    savePanelPosition(state, payload: { id: number; x: number; y: number }) {
      const matchedPanel = state.panels.find(panel => panel.id == payload.id)
      matchedPanel.posX = payload.x
      matchedPanel.posY = payload.y
    },
    savePanelSize(state, payload: { id: number; width: number; height: number }) {
      //
    }
  },
  actions: {
    loadPanels(store) {
      store.commit('loadPanels')
    },
    toggleActive(store, panelId: number) {
      store.commit('markPanelActive', panelId)
      return true
    },
    cancelSelection(store) {
      store.commit('markAllInactive')
      return true
    },
    toggleResize(store, status: boolean) {
      store.commit('switchResizingState', status)
      return true
    },
    saveTileCoords(store, payload: { id: number; x: number; y: number }) {
      store.commit('savePanelPosition', payload)
      PanelsService.save(store.state.panels)
      return true
    },
    saveTileSize(store, payload: { id: number; width: number; height: number }) {
      store.commit('savePanelSize', payload)
    }
  },
  modules: {
  }
})
