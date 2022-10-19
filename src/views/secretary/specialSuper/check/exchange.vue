/**
* create by zx on 2020/7/21 14:27
* 类注释：查看流转
* 备注：
*/
<template>
  <div class="exchange">
    <el-row style="margin-bottom: 10px">
      <el-col :span="24">
        <el-badge :max="99" :value="30" class="item" type="primary">
          <el-button type="text" class="btn" :class="{'select':selectIndex==0}" @click="typeClick(0)"> 全部流转</el-button>
        </el-badge>
        <el-badge :max="99" :value="34" class="item" type="primary">
          <el-button type="text" class="btn" :class="{'select':selectIndex==1}" @click="typeClick(1)"> 代办</el-button>
        </el-badge>
        <el-badge :max="99" :value="120" class="item" type="primary">
          <el-button type="text" class="btn" :class="{'select':selectIndex==2}" @click="typeClick(2)"> 已办</el-button>
        </el-badge>
      </el-col>
    </el-row>
    <m-table
      @refresh="loadData()"
      size="medium"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from 'components/table/mTable'

    export default {
        name: "exchange",
        components: {
            mTable
        },
        props: {},
        data() {
            return {
                selectIndex: 0,
                searchData: {},
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
                    {label: '登记日期', prop: 'data'},
                    {label: '编号', prop: 'num'},
                    {label: '是由提要', prop: 'title'},
                    {label: '承办部门', prop: 'title'},
                    {label: '当前环节', prop: 'title'},
                    {label: '当前处理人', prop: 'title'},
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
            typeClick(index) {
                this.selectIndex = index;
            }
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
  .btn {
    color: #333
  }

  .select {
    color: #409EFF
  }

  .item {
    margin-right: 50px;
  }
</style>
