<template>
  <div class="content">
    <el-row style="margin-bottom: 10px" :gutter="20">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg">
          <el-input type="text" readonly="readonly" placeholder="请选择" v-model="formData.orgName" suffix-icon="el-icon-arrow-down"/>
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="createData" style="margin-left:24px">新增</el-button>
        <el-button type="danger" @click="deleteData" style="margin-left:24px">删除</el-button>
      </el-col>
    </el-row>
<!--    <div class="formData">-->
<!--      <fd-form-->
<!--        @event="btnevent"-->
<!--        :columns="[-->
<!--        [-->
<!--            {type: 'select', prop: 'select', options: {1: '系统管理员1', 2: '系统管理员2'}},-->
<!--            {type: 'button-primary', prop: '$createdata', value: '新建',style:{marginLeft:'20px'}},-->
<!--            {type: 'button-primary', prop: '$deletedata', value: '删除'},-->
<!--        ]-->
<!--    ]"-->
<!--      />-->
<!--    </div>-->
    <div class="cSpace"></div>
    <m-table
      @refresh="loadData()"
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      @select="select"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from 'components/table/tTable'
    import FdForm from 'vue-elementui-freedomen/components/form'
    import selectOrgOrDept from "components/select/selectOrgOrDept";
    export default {
        name: 'systable',
        components: {
            mTable,
            FdForm,
            selectOrgOrDept
        },
        props: {},
        data() {
            return {
                formData:{},
                searchData:{},
                deleteArry: [],
                region: '',
                tableData: [],
                tableCols: [
                    {label: '所属机构', prop: 'curBank'},
                    {label: '对应部门', prop: 'deptName'},
                    {label: '创建时间', prop: 'createTime'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize:10
                }
            }
        },
        methods: {
            selectOrg(org) {
                this.formData.orgName = org.unitName;
                this.formData.orgCode = org.id;
                this.formData.curBankId=org.id
                this.searchOrg()
            },
            searchOrg(){
                this.$api.setSysConfig.orgSearTable(
                    {
                        searchData:this.searchData,
                        ...this.formData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    },
                ).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data
                })
            },
            loadData() {
                this.$api.setSysConfig.payFiflterTable(
                    {
                        searchData:this.searchData,
                        ...this.formData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    },
                ).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data
                })
            },
            cellClick(row) {
                this.$router.push({
                    name: 'payfiflterEditor',
                    query: {
                        rowData: row
                    }
                })
            },
            btnevent(params) {
                switch (params.prop) {
                    case '$createdata':

                        break;
                    case '$deletedata':

                        break;
                }
            },
            createData(){
                this.$router.push('/setting/sysConfig/payfiflter/editor')
            },
            deleteData() {
                this.$confirm("是否删除数据?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$api.setSysConfig.deletePayFiflter(
                            {
                                id: this.deleteArry
                            }
                        ).then(res => {

                            if (res.code == "SUCCESS") {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            }else{
                                this.$message({
                                    message: '删除失败',
                                    type: 'error'
                                });
                            }
                            this.loadData()
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });

            },
            select(row) {
                let dataArry = []
                row.map(function (value, index) {
                    dataArry.push(value.id)
                })
                this.deleteArry = dataArry.join(",")
            },
            submit() {

            }
        },
        created() {
            this.loadData()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .cSpace{
    width:100%;
    height:20px;
  }
</style>
