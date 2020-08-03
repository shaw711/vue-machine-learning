<template>
  <div>
    <template>
    <el-table
      :data="tabledata"
      style="width: 100%"
      height="500px"
      >
      <el-table-column
        v-for="(item,index) in rowname"
        :key="index"
        :property ="item"
        :label= "item"
        width="180"
        sortable
        >
         <template slot-scope="scope">
                   {{scope.row[scope.column.property]}}  <!-- 渲染对应表格里面的内容 -->
          </template>
      </el-table-column>
    </el-table>
  </template>
  </div>
</template>

<script>
export default {
  name: 'Showtable',
  props: ['tabledata'],
  data () {
    return {
      rowname: []
    }
  },
  methods: {
    getData (val) {
      this.tdata = val
    }
  },
  mounted () {
    this.rowname = Object.keys(this.tabledata[0])
  }
}
</script>

<style>

</style>
