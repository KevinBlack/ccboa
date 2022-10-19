/**
* create by zx on 2020/8/17 17:48
* 类注释：活动类别配置
* 备注：
*/
<template>
  <div class="index">
    <el-col>
      <el-button type="primary" @click="addData">
        新增
      </el-button>
      <el-button type="primary" @click="deleteSelect">
        删除
      </el-button>
    </el-col>
    <m-table
      @refresh="loadData()"
      @cellClick="jumpdeal"
      :isIndex="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from 'components/table/tTable'

    export default {
        name: "index",
        components: {
            mTable
        },
        props: {},
        data() {
            return {
                formData: {},
                tableData: [],
                tableCols: [
                    {label: '拟稿日期', prop: 'draftTime'},
                    {label: '编号', prop: 'documentNo'},
                    {label: '标题', prop: 'title'},
                    {label: '当前环节', prop: 'currentNode'},
                    {label: '操作人', prop: 'currentUser'},
                    {label: '拟稿人', prop: 'draftUser'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize: 10,
                },
            }
        },
        computed: {},
        methods: {
            loadData() {
                this.$api.secreatary.duty.activityTypeList(this.formData, {
                    PAGE_JUMP: this.pagination.pageNum,
                    REC_IN_PAGE: this.pageSize
                }).then(res => {

                })
            },
            addData() {

            },
            deleteSelect() {

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
