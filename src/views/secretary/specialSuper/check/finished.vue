/**
* create by zx on 2020/7/21 14:48
* 类注释：办结
* 备注：
*/
<template>
  <div class="finished">
    <el-date-picker style="margin-bottom: 10px"
                    type="year"
                    v-model="searchData.year"
                    placeholder="选择年">
    </el-date-picker>
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
        name: "finished",
        components: {
            mTable
        },
        props: {},
        data() {
            return {
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
            loadData(){}
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
