<template>
  <div class="restore-panel">
    <p class="restore-panel__text">Restore recently removed</p>
    <div class="restore-panel__removed">
      <button
        class="removed-panel"
        v-for="(panel) in removed"
        :key="panel.id"
        @click="restoreTile(panel.id)"
      >Tile {{ tileId(panel.id) }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Panel } from '@/types/interfaces'

@Component
export default class extends Vue {
  get removed(): [] | Array<Panel> {
    return this.$store.getters.deleted
  }

  /**
   * computed @method getTileId performs search in deleted panels by id passed in param
   * @returns {number} id of found panel
   */
  get tileId() {
    return (id: number) => {
      const deleted = this.$store.getters.deleted.find((panel: Panel) => panel.id == id)
      return deleted.id
    }
  }

  restoreTile(id: number): void {
    this.$store.dispatch('restoreTile', id)
  }
}
</script>

<style scoped>
.restore-panel {
  background-color: cadetblue;
  position: absolute;
  min-height: 2.5rem;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: 'Lucida Sans', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.restore-panel__text {
  color: #fff;
  margin: 5px 0 0 0;
}

.restore-panel__removed {
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.removed-panel {
  min-width: 6rem;
  height: 1.5rem;
  margin-right: 15px;
  cursor: pointer;
}
</style>
