<template>
  <div class="transactions-wrapper">
    <div class="transactions-controls">
      <el-button type="success" @click="subscribe">Start</el-button>
      <el-button type="danger" @click="unsubscribe">Stop</el-button>
      <el-button type="warning" @click="reset">Reset</el-button>
    </div>
    <h2 class="transactions-sum">Sum: {{ sum }} BTC</h2>
    <el-table
      stripe
      border
      :data="transactions">
      <el-table-column
        prop="from"
        label="From"
        width="180">
      </el-table-column>
      <el-table-column
        prop="to"
        label="To"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sum"
        label="Sum">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Button, Table, TableColumn } from 'element-ui'
import { SUBSCRIBE, UNSUBSCRIBE } from '@/core/config'
import { Transaction } from '@/types/interfaces'

@Component({
  components: {
    ElButton: Button,
    ElTable: Table,
    ElTableColumn: TableColumn
  }
})
export default class extends Vue {
  get transactions(): Array<Transaction> {
    return this.$store.getters.transactions
  }

  get sum(): number {
    return this.$store.getters.sum.toFixed(7)
  }

  created() {
    this.$connect()
  }

  beforeDestroy() {
    this.$disconnect()
  }

  subscribe() {
    this.$store.dispatch('sendMessage', SUBSCRIBE)
  }

  unsubscribe() {
    this.$store.dispatch('sendMessage', UNSUBSCRIBE)
  }

  reset() {
    this.$store.dispatch('resetTransactions')
  }
}
</script>

<style scoped>
.transactions-wrapper {
  padding-top: 50px;
  margin: 0 auto;
  width: 600px;
  min-width: 400px;
}

.transactions-controls {
  margin-bottom: 30px;
}
</style>
