import Vue from 'vue'
import Vuex from 'vuex'
import { PanelsService } from '@/core/services/panels.service'
import { Panel } from '@/types/interfaces'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    panels: PanelsService.load() as Array<Panel>,
    resizing: false
  },
  getters: {
    panels: (state) => state.panels
  },
  mutations: {
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
    }
  },
  actions: {
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
    }
  },
  modules: {
  }
})
