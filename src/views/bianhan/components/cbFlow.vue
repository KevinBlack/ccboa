/**
* create by zx on 2020/8/26 19:33
* 类注释：承办流程
* 备注：
*/
<template>
  <div class="flowChart">
    <el-dialog title="承办流程" :visible.sync="dialogVisible" width="50%">
      <m-table
        :isIndex="true"
        :isHandle="false"
        :sortable="false"
        :isPagination="false"
        :tableData="tableData"
        :tableCols="tableCols"
      ></m-table>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from 'components/table/tTable'

    export default {
        name: "flowChart",
        components: {
            mTable
        },
        props: {
            value: {
                type: Boolean,
                default() {
                    return false
                }
            },
            tableData: {type: Array, default: () => []},
        },
        watch: {
            dialogVisible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.dialogVisible = val
            },
        },
        data() {
            return {
                dialogVisible: false,
                tableCols: [
                    {label: '承办部门', prop: 'undertakeDepartment'},
                    {label: '承办环节', prop: 'undertakeCurrentlinks'},
                    {label: '操作时间', prop: 'receiveDate'},
                    {
                        label: '当前处理人', prop: 'undertakeHandlePerson', formatter: (row) => {
                            if (!row.undertakeHandlePerson) {
                                return "已反馈"
                            }
                        }
                    },
                ]
            }
        },
        computed: {},
        methods: {},
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
