/**
* create by zx on 2020/8/26 19:33
* 类注释：
* 备注：
*/
<template>
  <div class="flowChart">
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
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
    import mTable from "../table/tTable";

    export default {
        name: "flowChart",
        components: {
            mTable
        },
        props: {
            title: {type: String, default: "查看流程"},
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
                    {label: '处理环节', prop: 'NODE'},
                    {
                        label: '操作时间', prop: 'TMS', formatter(row) {
                            return formatBData(row.TMS)
                        }
                    },
                    {label: '处理人', prop: 'EXCNM'},
                    {label:"操作记录",prop:"DSC"}
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
