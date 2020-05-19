<template>
  <transition name="remove" mode="out-in">
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
        <span class="button-remove" title="Remove tile" @click="removeTile(panel.id)">&times;</span>
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
  </transition>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Coordinate } from '@/core/constructors'
import { DRAG_STEP, PIN_POSITIONS } from '@/core/config'
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
   * stored in panel object in local storage
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
   * @returns {boolean} information from store about resizing state
   */
  get resizing(): boolean {
    return this.$store.getters.resizing
  }

  isOffPageLimits(left: number, top: number): boolean {
    return left < 0 || top < 0
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
   * Updates panel's coordinates on grid
   * Tile coords are updated only by @constant DRAG_STEP value
   */
  drag(event: any): void {
    if (this.resizing) return
    const shift = new Coordinate(event.pageX - this.pageCoords.x, event.pageY - this.pageCoords.y)
    if (event.target.offsetLeft + shift.x < 0 || event.target.offsetTop + shift.y < 0) {
      return
    }
    if (shift.x % DRAG_STEP == 0) {
      event.target.style.left = this.panel.posX + shift.x + 'px'
    }
    if (shift.y % DRAG_STEP == 0) {
      event.target.style.top = this.panel.posY + shift.y + 'px'
    }
  }

  /**
   * @method drag only executes if resize isn't toggled
   * @constructs Coordinate shift - a diff between start event coords and cursor.
   * Updates panel's coordinates
   * Tile coords are updated only by @constant DRAG_STEP value
   * Sends tile page coords to the store
   */
  dragEnd(event: any): void {
    if (this.resizing) return
    const shift = new Coordinate(event.pageX - this.pageCoords.x, event.pageY - this.pageCoords.y)
    if (event.target.offsetLeft + shift.x < 0 || event.target.offsetTop + shift.y < 0) {
      return
    }
    if (shift.x % DRAG_STEP == 0) {
      event.target.style.left = this.panel.posX + shift.x + 'px'
    }
    if (shift.y % DRAG_STEP == 0) {
      event.target.style.top = this.panel.posY + shift.y + 'px'
    }
    if (event.target.offsetLeft < 0 || event.target.offsetTop < 0) {
      this.$store.dispatch('returnTile', this.panel.id)
    }

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
  background-color: #f7f7f7;
  overflow: hidden;
  position: absolute;
  width: 300px;
  height: 100px;
  min-width: 200px;
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

.button-remove {
  position: absolute;
  right: 5px;
  top: 0;
  font-size: 1.4rem;
  cursor: pointer;
}

.remove-leave-active {
  animation: remove-out 0.35s ease-out
}

@keyframes remove-out {
  from {
    transform: translateY(0px)
  }
  to {
    transform: translateY(100vw) scale(0.4)
  }
}

@media screen and(max-width: 980px) {
  .panel {
    margin-left: 25px;
  }
}
</style>
