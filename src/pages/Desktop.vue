<template>
  <div class="desktop">
    <app-tile v-for="panel in panels" :panel="panel" :key="panel.id" />
    <transition name="pop" mode="out-in">
      <app-restore-panel v-if="deleted.length" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Panel } from '@/types/interfaces'
import Tile from '@/components/Tile.vue'
import RestorePanel from '@/components/RestorePanel.vue'

@Component({
  name: 'Desktop',
  components: {
    AppTile: Tile,
    AppRestorePanel: RestorePanel
  }
})
export default class extends Vue {
  created() {
    this.$store.dispatch('loadPanels')
    this.$store.dispatch('loadDeleted')
  }

  mounted() {
    this.$store.dispatch('cancelSelection')
  }

  get panels(): Array<Panel> {
    return this.$store.getters.panels
  }

  get deleted(): Array<Panel> {
    return this.$store.getters.deleted
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.desktop {
  height: 90vh;
}

.pop-enter-active {
  animation: pop-in 0.5s ease-in-out
}

.pop-leave-active {
  animation: pop-out 0.25s
}

@keyframes pop-in {
  from {
    opacity: 0;
    transform: scale(0)
  }
  to {
    opacity: 1;
    transform: scale(1)
  }
}

@keyframes pop-out {
  from {
    transform: translateX(0px)
  }
  to {
    transform: translateX(-90vw)
  }
}
</style>
