<template>
  <div class="check">
    <div style="margin: 20px 0">
      <el-row style="margin-bottom: 10px" :gutter="20">
        <el-col :span="6">
          <select-org-or-dept @select="selectOrg" style="z-index: 99999">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择"
              v-model="manageBankName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
        <el-button type="primary" style="margin-right:20px;margin-left:20px;" @click="add_btn">新增</el-button>
        <el-button type="danger" style="margin-right:20px;" @click="delete_btn">删除</el-button>
      </el-row>
    </div>

    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection='true'
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from '@/components/table/tTable'
    import selectOrgOrDept from "components/select/selectOrgOrDept";
    export default {
        name: "check",
        components: {
            mTable,
            selectOrgOrDept
        },
        props: {},
        data() {
            return {
                searchData:{},
                tableData: [
                ],
                tableCols: [
                    {label: '管理机构', prop: 'manageBank'},
                    {label: '自动办结期限/月', prop: 'autoEndTime'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize:20
                },
                options: [],
                value1: "",
                deleteArry:'',
                manageBankId: JSON.parse(localStorage.getItem('userInfo')).unitId,
                manageBankName:JSON.parse(localStorage.getItem('userInfo')).unitName
            }
        },
        computed: {},
        methods: {
            selectOrg(org) {
                // this.formData.orgName = org.unitName;
                // this.formData.unitId = org.id;
                this.manageBankName=org.unitName
                this.manageBankId = org.id
                this.loadData()
            },
            loadData() {
                this.$api.argumentPre.baseConfigTable(
                    {...this.searchData, manageBankId: this.manageBankId},
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,
                    }
                ).then(res => {
                    this.pagination.total = res.total
                    this.tableData = res.data
                })
            },
            cellClick(row) {
                let rowData = JSON.stringify(row)
                this.$router.push({

                    path: '/approval/parameter/base/checkDetail',
                    query: {data: rowData, type: 'check'}
                })
            },
            select(row) {
                let dataArry = []
                row.map(function (value, index) {
                    dataArry.push(value.id)
                })
                this.deleteArry = dataArry.join(",")
            },
            add_btn() {
                this.$router.push({
                    path: '/approval/parameter/base/checkDetail',
                    query: {data: '', type: 'edit'}
                })
            },
            delete_btn(){
                if(this.deleteArry){
                    this.$confirm("是否确定删除当前选中数据?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            this.$api.argumentPre.baseConfigDelete(
                                {id:this.deleteArry}
                            ).then(res => {
                                if(res.code=="SUCCESS"){
                                    this.deleteArry=''
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                }
                                this.loadData()
                            })
                        })
                        .catch(() => {});
                }else{
                    this.$message({
                        type:'warning',
                        message:'请选择要删除的数据'
                    })
                }
            }
        },
        activated() {
        },
        mounted() {
        },
        created() {
            this.loadData()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .check{
    min-height: 90vh;
  }
</style>

