<template>
  <div class="transactions-wrapper">
    <div class="transactions-controls">
      <Button
        type="success"
        @click="subscribe"
        :disabled="subscribed"
      >Start</Button>
      <Button
        type="danger"
        @click="unsubscribe"
        :disabled="!subscribed"
      >Stop</Button>
      <Button
        type="warning"
        @click="reset"
        :disabled="!transactions.length"
      >Reset</Button>
    </div>
    <h2 class="transactions-sum">Sum {{ sum }} BTC</h2>
    <Table
      stripe
      border
      :data="transactions">
      <TableColumn
        prop="from"
        label="From"
        width="180">
      </TableColumn>
      <TableColumn
        prop="to"
        label="To"
        width="180">
      </TableColumn>
      <TableColumn
        prop="sum"
        label="Sum">
      </TableColumn>
    </Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Button, Table, TableColumn } from 'element-ui'
import { SUBSCRIBE, UNSUBSCRIBE } from '@/core/api.config'
import { Transaction } from '@/types/interfaces'

@Component({
  name: 'Transactions',
  components: {
    Button,
    Table,
    TableColumn
  }
})
export default class extends Vue {
  subscribed = false

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

  subscribe(): void {
    this.subscribed = true
    this.$store.dispatch('sendMessage', SUBSCRIBE)
  }

  unsubscribe(): void {
    this.subscribed = false
    this.$store.dispatch('sendMessage', UNSUBSCRIBE)
  }

  reset(): void {
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

.transactions-sum {
  margin-bottom: 20px;
}
</style>
