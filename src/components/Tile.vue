<template>
  <div
    :id="`panel-${panel.id}`"
    :class="tileClasses"
    :style="{ zIndex: panel.zIndex }"
    ref="tile"
    draggable="true"
    @dragstart="dragStart"
    @drag="drag"
    @dragend="dragEnd"
    @click="toggleActive"
    @mousedown="showOnTop"
  >
    <header>
      Tile {{ panel.id }}
      <span class="remove" title="Remove tile" @click="removeTile(panel.id)">&times;</span>
    </header>
    <div class="panel-content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi iusto id alias illo numquam ut delectus, sit, non harum quas molestias temporibus
    </div>

    <div v-if="panel.active">
      <resize-pin
        v-for="pin in pins"
        :key="pin"
        :position="pin"
        :panelId="panel.id"
        :tile="$refs.tile"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Coordinate } from '@/core/constructors'
import { PIN_POSITIONS } from '@/core/config'
import { Panel } from '@/types/interfaces'
import ResizePin from './ResizePin.vue'

@Component({
  components: {
    ResizePin
  }
})
export default class extends Vue {
  @Prop() panel!: Panel

  /**
   * holds screen coords where drag was started
   * @constructs Coordinate creates object with x and y axis coords
   */
  pageCoords = new Coordinate(0, 0)

  /**
   * holds array of constants which will be transformed
   * and corresponding resize markers will be rendered
   */
  pins: Array<string> = PIN_POSITIONS

  /**
   * Detect click on blank screen immediately when component is mounted
   * Load tile params
   */
  mounted(): void {
    document.addEventListener('click', this.deselect)
    this.loadTileParams()
  }

  /**
   * @method loadTileParams restores last page coords, last known size of tile
   * from local storage
   */
  loadTileParams() {
    const { tile } = this.$refs
    tile.style.left = this.panel.posX + 'px'
    tile.style.top = this.panel.posY + 'px'
    tile.style.width = this.panel.width + 'px'
    tile.style.height = this.panel.height + 'px'
    tile.style.zIndex = this.panel.zIndex
  }

  /**
   * Clean-up the listener that detects click on blank screen
   * when leaving "desktop" (tiles) page
   */
  beforeDestroy(): void {
    document.removeEventListener('click', this.deselect)
  }

  /**
   * Detects click on blank screen.
   * Condition is truthy if target html structure is less complex than el > el
   */
  deselect(event: any): void {
    if (event.path.length < 8) {
      this.$store.dispatch('cancelSelection')
    }
  }

  /**
   * Inform the store that current tile becomes active.
   * Make resize pin(s) show up (only on active tile)
   * Drop previous selection
   */
  toggleActive(): void {
    this.$store.dispatch('toggleActive', this.panel.id)
  }

  /**
   * Selected tile bubbles on top while rest go underneath
   */
  showOnTop(): void {
    this.$store.dispatch('showOnTop', this.panel.id)
  }

  /**
   * computed @method panelClasses generates class depending on whether
   * current tile is active or not
   * @returns {string} - merged css classes
   */
  get tileClasses(): string {
    const status = this.panel.active ? 'panel_active' : 'panel_inactive'
    return `panel ${status}`
  }

  /**
   * computed @method resizing
   * @returns {boolean} information from store about resize state
   */
  get resizing(): boolean {
    return this.$store.state.resizing
  }

  /**
   * @method dragStart captures and stores screen coords where drag was started
   */
  dragStart(event: any): void {
    this.pageCoords = new Coordinate(event.pageX, event.pageY)
  }

  /**
   * @method drag only executes if resize isn't toggled
   * @constructs Coordinate shift - a diff between start event coords and cursor.
   * Updates panel's coordinates
   */
  drag(event: any): void {
    if (this.resizing) return
    const shift = new Coordinate(event.pageX - this.pageCoords.x, event.pageY - this.pageCoords.y)
    event.target.style.left = this.panel.posX + shift.x + 'px'
    event.target.style.top = this.panel.posY + shift.y + 'px'
  }

  /**
   * @method drag only executes if resize isn't toggled
   * @constructs Coordinate shift - a diff between start event coords and cursor.
   * Updates panel's coordinates
   * Sends tile page coords to the store
   */
  dragEnd(event: any): void {
    if (this.resizing) return
    const shift = new Coordinate(event.pageX - this.pageCoords.x, event.pageY - this.pageCoords.y)
    event.target.style.left = this.panel.posX + shift.x + 'px'
    event.target.style.top = this.panel.posY + shift.y + 'px'

    const lastCoords = new Coordinate(parseInt(event.target.style.left), parseInt(event.target.style.top))
    this.$store.dispatch('saveTileCoords', { id: this.panel.id, ...lastCoords })
  }

  removeTile(id: number): void {
    this.$store.dispatch('removeTile', id)
  }
}
</script>

<style lang="scss" scoped>
.panel {
  border: 1px solid #ccc;
  margin-bottom: 25px;
  background-color: #f7f7f7;
  overflow: hidden;
  position: relative;
  width: 300px;
  height: 100px;
  min-width: 100px;
  min-height: 50px;

  header {
    background-color: #eee;
    border-bottom: 1px solid #ccc;
    color: #222;
    height: 20px;
    padding-top: 5px;
  }
}

.panel-content {
  padding: 15px;
}

.panel_active {
  outline: 2px dashed #ccc;
  z-index: 2;
}

.panel_inactive {
  outline: none;
  z-index: 1;
}

.remove {
  position: absolute;
  right: 5px;
  top: 0;
  font-size: 1.4rem;
  cursor: pointer;
}
</style>
