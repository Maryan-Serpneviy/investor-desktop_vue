<template>
  <div
    :class="`resize-pin ${position}`"
    draggable="true"
    @dragstart="resizeStart"
    @dragend="resizeEnd"
  />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Coordinate } from '@/core/constructors'

@Component
export default class extends Vue {
  @Prop({ required: true }) panelId!: number
  @Prop({ required: true }) position!: string
  @Prop({ required: true }) tile!: Element

  /**
   * stores cursor coordinates when resize is triggered
   * @constructs Coordinate creates object with x and y axis coords
   */
  private startCoords = new Coordinate(0, 0)

  /**
   * @method resizeStart captures a moment when resizing starts.
   * Sets up coordinates of a point on page where drag events is triggered
   * Informs a store that resizing is triggered so that tile position
   * couldn't change during drag event in Tile component
   */
  private resizeStart(event: any): void {
    this.startCoords = new Coordinate(event.pageX, event.pageY)
    this.$store.dispatch('toggleResize', true)
  }

  /**
   * @method resizeEnd applies resize to tile
   * Use setTimeout with zero delay to throw function in the end of call stack
   * to prevent the 'dragend' event trigger and tile coords change
   */
  private resizeEnd(event: any): void {
    const shift = this.calculateShift(event.pageX, event.pageY)
    this.tile.style.width = this.tile.offsetWidth + shift.x + 'px'
    this.tile.style.height = this.tile.offsetHeight + shift.y + 'px'

    setTimeout(() => {
      this.$store.dispatch('toggleResize', false)
    }, 0)
  }

  /**
   * @method calculatesShift or distance in pixels between two points:
   * where resize was triggered and where it was over
   * @param {number} endCoordX hand over the resize event endpoint on X axis
   * @param {number} endCoordY hand over the resize event endpoint on Y axis
   * @returns {Coordinate} object with x and y axis coords
   */
  private calculateShift(endCoordX: number, endCoordY: number) {
    switch (this.position) {
      case 'bottom-left':
        return new Coordinate(this.startCoords.x - endCoordX, endCoordY - this.startCoords.y)
      case 'bottom-right':
        return new Coordinate(endCoordX - this.startCoords.x, endCoordY - this.startCoords.y)
      case 'bottom-middle':
        return new Coordinate(0, endCoordY - this.startCoords.y)
      case 'left':
        return new Coordinate(this.startCoords.x - endCoordX, 0)
      case 'right':
        return new Coordinate(endCoordX - this.startCoords.x, 0)
      default:
        return new Coordinate(0, 0)
    }
  }
}
</script>

<style scoped lang="scss">
$pin-shift: -1px;
$pin-size: 8px;

.resize-pin {
  position: absolute;
  z-index: 3;
  width: $pin-size;
  height: $pin-size;
  border: 1px solid #222222;
  background-color: #fff;
}

.top-left {
  top: $pin-shift;
  left: $pin-shift;
  cursor: se-resize;
}

.top-middle {
  top: $pin-shift;
  left: 50%;
  cursor: s-resize;
}

.top-right {
  top: $pin-shift;
  right: $pin-shift;
  cursor: sw-resize;
}

.right {
  right: $pin-shift;
  top: 50%;
  cursor: w-resize;
}

.bottom-right {
  bottom: $pin-shift;
  right: $pin-shift;
  cursor: se-resize;
}

.bottom-middle {
  bottom: $pin-shift;
  left: 50%;
  cursor: s-resize;
}

.bottom-left {
  bottom: $pin-shift;
  left: $pin-shift;
  cursor: sw-resize;
}

.left {
  left: $pin-shift;
  top: 50%;
  cursor: w-resize;
}
</style>
