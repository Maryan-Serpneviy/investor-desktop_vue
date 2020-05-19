<template>
  <el-button
    type="danger"
    plain
    id="reset-button"
    title="Reset panels config"
    @click="resetTiles"
  >
    Reset
  </el-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Button } from 'element-ui'

@Component({
  components: {
    ElButton: Button
  }
})
export default class extends Vue {
  resetTiles(): void {
    this.$store.dispatch('resetTilesConfig')
  }
}
</script>

<style scoped>
#reset-button {
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>
