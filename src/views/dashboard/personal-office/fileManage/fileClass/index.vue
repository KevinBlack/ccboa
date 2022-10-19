<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="按部门显示" name="first">
        <fd-form
          style="margin:0 1%"
          :data="applyformData"
          :columns="applyformCfg"
          :config="serverconfig"
          @event="btnevent"
        ></fd-form>
      </el-tab-pane>
      <el-tab-pane label="按文号显示" name="second">
        <fd-form
          style="margin:0 1%"
          :data="applyformData"
          :columns="applyformCfgSec"
          :config="serverconfig"
        ></fd-form>
      </el-tab-pane>
      <el-tab-pane label="按类型显示" name="third">
        <fd-form
          style="margin:0 1%"
          :data="applyformData"
          :columns="applyformCfgThr"
          :config="serverconfig"
        ></fd-form>
      </el-tab-pane>
    </el-tabs>
    <m-table
      @refresh="loadData()"
      size="medium"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/mTable'
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: 'fileManagement',
  components: {
    mTable,
    FdForm
  },
  props: {},
  data () {
    return {
      typeData:"1",
      activeName: 'first',
      region: '',
      applyformData: {},
      applyformCfg: [

        [
          { type: 'select', prop: '1', style: { width: '30%' }, options: { 1: '1', 2: '2', 3: '3' } },
          { type: 'button-primary', prop: '$selected', value: '借阅申请', style: { margin: '0px 14px' } },
          { type: 'formitem', label: '' }
        ],
      ],
      applyformCfgSec: [

        [
          { type: 'select', prop: '1', style: { width: '30%' }, options: { 1: '1', 2: '2', 3: '3' } },
          { type: 'formitem', label: '' }
        ],
      ],
      applyformCfgThr: [

        [
          { type: 'select', prop: '1', style: { width: '30%' }, options: { 1: '1', 2: '2', 3: '3' } },
          { type: 'formitem', label: '' }
        ],
      ],
      serverconfig: {
        labelWidth: '100px'
      },
      tableData: [
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' }
      ],

      tableCols: [
        { label: '归档部门', prop: 'data' },
        { label: '文号', prop: 'serve' },
        { label: '文件类型', prop: 'serve' },
        { label: '文件标题', prop: 'serve' },
        { label: '文件日期', prop: 'serve' },
        { label: '文件载体', prop: 'serve' },
        { label: '密级', prop: 'serve' },
        { label: '期限', prop: 'serve' },
        { label: '归档号', prop: 'serve' },

      ],
      pagination: {
        pageNum: 1,
        total: 15
      }
    }
  },
  methods: {
    loadData (typeData) {
      console.log("------>")
    },
    init () {
      this.tableCols = [
        { label: '归档部门', prop: 'data' },
        { label: '文号', prop: 'serve' },
        { label: '文件类型', prop: 'serve' },
        { label: '文件标题', prop: 'serve' },
        { label: '文件日期', prop: 'serve' },
        { label: '文件载体', prop: 'serve' },
        { label: '密级', prop: 'serve' },
        { label: '期限', prop: 'serve' },
        { label: '归档号', prop: 'serve' },
      ]
    },
    handleClick () {
      this.init()
      if (this.activeName == 'first') {
        this.typeData="1"
        // this.tableCols.splice(0, 1, ...this.tableCols.splice(0, 1, this.tableCols[0]))

      } else if (this.activeName == 'second') {
        this.typeData="2"
        this.tableCols.splice(0, 1, ...this.tableCols.splice(1, 1, this.tableCols[0]))

      } else {
        this.typeData="3"
        this.tableCols.splice(0, 1, ...this.tableCols.splice(2, 1, this.tableCols[0]))

      }
    },
    btnevent (params) {
      switch (params.prop) {
        case '$selected':
          console.log("111111")
          break;
      }
    },
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.file_title {
  width: 100%;
  text-align: center;
  font-size: 28px;
  color: #458cf1;
  margin-bottom: 16px;
}
</style>
