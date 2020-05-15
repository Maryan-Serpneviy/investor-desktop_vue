<template>
  <div class="desktop">
    <app-tile v-for="panel in panels" :panel="panel" :key="panel.id" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Tile from '@/components/Tile.vue'

@Component({
  name: 'Desktop',
  components: {
    AppTile: Tile
  }
})
export default class extends Vue {
  created() {
    this.$store.dispatch('loadPanels')
  }

  get panels() {
    return this.$store.getters.panels
  }
}
</script>

<style>
.desktop {
  padding: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
