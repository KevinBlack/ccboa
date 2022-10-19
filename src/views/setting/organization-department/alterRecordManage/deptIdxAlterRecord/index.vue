<template>
  <div class="deptList">
    <el-row style="padding: 20px">
      <el-col>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <m-table
      @refresh="loadData()"
      size="medium"
      @select="select"
      @selectAll="selectAll"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      @cellClick="getRowData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable"
export default {
  name: "deptIndexAlterationsLists",
  components: {
    mTable
  },
  props: {
    //  1 机构索引变更记录
    //  2 机构变更记录
    //  3部门变更记录
    typeNum: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      value: '',
      selectRowData: null,
      options: [{
        value: '1',
        label: '北京行分行1'
      }, {
        value: '2',
        label: '北京行分行2'
      },],
      tableData: [
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" },
        { time: "2012-12-12", opertae: "资产保全部", adm: "资产保全部", type: "D939170" }
      ],
      pagination: {
        pageNum: 1,
        total: 55
      },
    }
  },
  computed: {
    tableCols () {
      if (this.typeNum == 1) {
        return [
          { label: '操作', prop: 'opertae' },
          { label: '操作时间', prop: 'time' },
          { label: '制作人', prop: 'adm' },
          { label: '变更类型', prop: 'type' },
        ]
      } else {
        return [
          { label: '操作类型', prop: 'opertae' },
          { label: '操作时间', prop: 'time' },
          { label: '操作人', prop: 'adm' },
        ]
      }
    }
  },
  methods: {
    loadData () { },
    getRowData (row) {
      if (this.typeNum == 1) {
        this.$intent.go(this, { name: "deptIdxAlterList", query: { detail: JSON.stringify(row), type: 1 } })
      } else if (this.typeNum == 2) {
        this.$intent.go(this, { name: "orgAlterationsInfo", query: { detail: JSON.stringify(row), type: 2 } })
      } else if (this.typeNum == 3) {
        this.$intent.go(this, { name: "deptAlterationsInfo", query: { detail: JSON.stringify(row), type: 3 } })
      }

    },
    select (val) {
      this.selectRowData = val
      console.log("-- - 单选----")
    },
    selectAll (vals) {
      this.selectRowData = vals
      console.log("---全选----")
    },

  },
  activated () {
  },
  mounted () {

  },
  created () {
  }

}
</script>

<style  scoped lang="less" rel="stylesheet/less">
</style>
