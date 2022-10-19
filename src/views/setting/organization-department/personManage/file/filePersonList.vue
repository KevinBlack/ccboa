/**
* create by zx on 2020-6-30 10:25
* 类注释：查看文件
* 备注：
*/
<template>
  <div class="filePersonList">
    <el-row style="padding: 20px">
      <el-col :span="23">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" @click="toAdd">新建</el-button>
      </el-col>
    </el-row>
    <m-table
      @refresh="loadData()"
      size="medium"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import mTable from "components/table/mTable"

  export default {
    name: "filePersonList",
    components: {
      mTable
    },
    props: {},
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: '',
        tableData: [
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"},
          {data: "12121", num: "1435345", title: "54654654654", depar: "567657"}
        ],

        tableCols: [
          {label: '系统注册名', prop: 'data'},
          {label: '中文名', prop: 'title'},
          {label: '部门类型', prop: 'depar'},
          {label: '部门名称', prop: 'depar'},
          {label: 'AB角', prop: 'depar'},
        ],
        pagination: {
          pageNum: 1,
          total: 55
        },
      }
    },
    computed: {},
    methods: {
      loadData() {
      },
      cellClick() {
      },
      toAdd() {
        this.$intent.go(this, {name: "addFilePerson"})
      },
    },
    activated() {
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
