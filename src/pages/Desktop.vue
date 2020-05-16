<template>
  <div class="desktop">
    <transition-group name="remove" mode="out-in">
      <app-tile v-for="panel in panels" :panel="panel" :key="panel.id" />
    </transition-group>
    <transition name="pop" mode="out-in">
      <restore-panel v-if="deleted.length" />
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
    RestorePanel
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

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.desktop {
  height: 90vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  overflow: hidden;
}

/* remove transition */

.remove-enter-active {
  animation: remove-in 0.35s ease-out;
}

.remove-leave-active {
  animation: remove-out 0.35s ease-out;
}

@keyframes remove-in {
  from {
    transform: translateY(120vw) scale(0);
  }
  to {
    transform: translateY(0px) scale(1);
  }
}

@keyframes remove-out {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(120vw) scale(0.4);
  }
}

/* pop transition */

.pop-enter-active {
  animation: pop-in 0.5s ease-in-out;
}

.pop-leave-active {
  animation: pop-out 0.25s;
}

@keyframes pop-in {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pop-out {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-100vw);
  }
}
</style>
