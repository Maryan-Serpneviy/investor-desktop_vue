<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Desktop</router-link> |
      <router-link to="/transactions">Transactions</router-link>
      <button-reset v-if="desktopPage" />
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ButtonReset from '@/components/ButtonReset.vue'

@Component({
  components: {
    ButtonReset
  }
})
export default class extends Vue {
  get desktopPage(): boolean {
    return this.$route.path == '/'
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  border-bottom: 1px dashed #2c3e50;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
