/**
* create by zx on 2020/7/21 10:59
* 类注释：
* 备注：
*/
<template>
    <div class="settingMessageList">
      <el-row style="padding-bottom: 10px">
        <el-col :span="8">
          <el-select style="margin-right: 10px" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        name: "settingMessageList",
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
                searchData:{},
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
                    {label: '立项依据', prop: 'data'},
                    {label: '紧急程度', prop: 'num'},
                    {label: '协办是否锁定文件', prop: 'title'},
                    {label: '办理天数', prop: 'title'},
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
