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
    <div class="cSpace"></div>
    <m-table
      @refresh="searchOrg()"
      size="medium"
      :isSelection="true"
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
                searchData:{},
                deleteArry:'',
                region: '',
                formData:{},
                tableData: [],
                tableCols: [
                    {label: '主题词', prop: 'topicWord'},
                    {label: '对应部门', prop: 'deptName'},
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
                this.formData.curBankId= org.id
                this.searchOrg()
            },
            searchOrg(){
                this.$api.setSysConfig.KeyorgSearTable(
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
                this.$api.setSysConfig.viewKeyWord(
                    {
                        searchData:this.searchData
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
                    name:'keywordeditor',
                    query:{
                         rowData:row
                    }
                })
            },
            deleteData() {
                this.$api.setSysConfig.deleteKeyWord(
                    {
                        id:this.deleteArry
                    }
                ).then(res => {
                    if(res.code=="SUCCESS"){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    this.searchOrg()
                })
            },
            createData(){
              this.$router.push({
                  name:'keywordeditor',
                  query:{}
              })
            },
            select(row) {
                let dataArry=[]
                row.map(function(value,index){
                    dataArry.push(value.id)
                })
                this.deleteArry=dataArry.join(",")
                console.log("-------->",this.deleteArry,row)
            },
            btnevent(params) {
                switch (params.prop) {
                    case '$deletedata':
                        this.deleteData()
                        break;

                }
            },
        },
        created() {
           this.$api.setting.organization.getTree({
            unitClass: 1,
            unitCode: '1',
            }).then((res) => {
                let data = []
                data=res.data
                if(data&&data.length>0){
                    this.formData.orgName = data[0].unitName
                    this.formData.orgCode = data[0].unitCode
                    this.formData.curBankId= data[0].unitCode
                    this.searchOrg()
                }
            }).catch(err => {
            
            });
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .cSpace{
    width:100%;
    height:20px;
  }
</style>