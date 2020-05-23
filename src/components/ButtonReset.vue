<template>
  <Button
    type="info"
    plain
    id="reset-button"
    title="Reset panels config"
    @click="$store.dispatch('resetTilesConfig')"
  >
    Reset
  </Button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Button } from 'element-ui'

@Component({
  components: {
    Button
  }
})
export default class extends Vue { }
</script>

<style scoped>
#reset-button {
  position: absolute;
  opacity: 0.75;
  right: 20px;
  top: 10px;
}
</style>
