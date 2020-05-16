<template>
  <div class="transactions-wrapper">
    <div class="transactions-controls">
      <el-button type="success">Start</el-button>
      <el-button type="danger">Stop</el-button>
      <el-button type="warning">Reset</el-button>
    </div>
    <h2 class="transactions-sum">Sum: 0002345.04 BC</h2>
    <el-table
      stripe
      border
      :data="tableData">
      <el-table-column
        prop="date"
        label="From"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="To"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Sum">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { Button, Table, TableColumn } from 'element-ui'

@Component({
  components: {
    ElButton: Button,
    ElTable: Table,
    ElTableColumn: TableColumn
  }
})
export default class extends Vue {
  tableData = [{
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }, {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }, {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }]
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
