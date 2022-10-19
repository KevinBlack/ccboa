<template>
  <div class="content">
    <!--    导出查询数据   必须放于最上边(以防与下边的table的id冲突)-->
    <export-excel
      v-show=false
      :tableData="excelTableData"
      :tableCols="tableCols"
      :excelTitle="excelTitle"
      :startExport="startExport"
    >
    </export-excel>
    <el-col :span="4" style="position: relative;left:0px;top:0px;">
      <el-button @click="exportSearch">导出</el-button>
    </el-col>
    <p class="use_object_title">本行信息查询</p>
    <div class="cformdata">
      <search-form
        ref="searchForm"
        :formData="formData"
        @reset="reset"
        class="mt20"
        @submit="submit"
        @event="btnEvent"
        :formCfg="formCfg">
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="查询日期">
            <el-date-picker
              v-model="formData.dataDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              style="width:100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </el-form-item>
        </el-col>
      </search-form>
    </div>
    <div class="table_data">
      <m-table
        @refresh="loadData()"
        size="medium"
        :isPagination="true"
        :isHandle="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :searchData="searchData"
        :isIndex="true"
        @cellClick="cellClick"
      ></m-table>
    </div>
    <!--    选择树-->
    <org-tree v-model="showOrgTree"
              :title="title"
              :isSingle="isSingle"
              :isMove="isMove"
              :orgOrDept="orgOrDept"
              :orgOrDeptId="orgOrDeptId"
              @orgList="getOrgList">
    </org-tree>
  </div>
</template>
<script>
    import FdForm from 'vue-elementui-freedomen/components/form'
    import mTable from '@/components/table/tTable'
    import searchForm from "@/components/form/searchForm";
    import orgTree from "components/tree/orgTree";
    import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
    import exportExcel from "components/viewFlow/exportDataExcel"

    export default {
        name: 'searchData',
        components: {
            mTable,
            searchForm,
            orgTree,
            exportExcel
        },
        mixins: [bianhanPublic],
        data() {
            return {
                startExport:false,
                excelTitle:'个人办公-信息发布查询',
                excelTableData:[],
                isMove:false,
                title: "选择部门",
                showOrgTree: false,
                isSingle: true,
                orgOrDept: 1,
                orgOrDeptId: "0",
                searchData: {
                    createStartDate:"",
                    createEndDate:"",
                },
                formData: {
                    createStartDate:"",
                    createEndDate:"",
                    draftOrgan: '',
                    title:'',
                    isFbbz:'0'

                },
                tableData: [],
                tableCols: [
                    {label: '拟稿日期', prop: 'createDate'},
                    {label: '拟稿人', prop: 'draftUser'},
                    {label: '拟稿部门', prop: 'draftDepartment'},
                    {label: '标题', prop: 'title'},
                    {label: '发布状态', prop: 'isFbbz'},

                ],
                adminType: '0',
                pagination: {
                    pageNum: 1,
                    total: 0,
                    pageSize: 20,
                },
                formCfg: [],
                serverconfig: {
                    labelWidth: '120px'
                },
                bankOptions1: [],
                bankOptions2: [],
                selectOPtion: {},
                btnType: '0',
                type: '',
                isOrg:true,
            }
        },
        created() {
            this.initData()
        },
        mounted(){
            this.$set(this.$refs.searchForm.fdFormData, 'CHANGEisFbbz', '未发布')
            this.initDate()
            this.loadData()
        },
        methods: {
            exportSearch() {
                if(this.formData.dataDate && this.formData.dataDate.length!=0) {
                    this.formData.createStartDate = this.formData.dataDate[0]
                    this.formData.createEndDate = this.formData.dataDate[1]
                    this.searchData.createStartDate = this.formData.dataDate[0]
                    this.searchData.createEndDate = this.formData.dataDate[1]
                } else {
                    this.formData.createStartDate = ''
                    this.formData.createEndDate = ''
                    this.searchData.createStartDate = ''
                    this.searchData.createEndDate = ''
                }
                this.$api.messPub.BankMessSear(
                    {
                        ...this.searchData,
                        ...this.formData,
                        btnType: this.btnType,
                        listType: '3'
                    },
                    {
                        PAGE_JUMP: '',
                        REC_IN_PAGE: ''
                    }
                ).then(res => {
                    this.excelTableData = res.data.list;
                    this.excelTableData && this.excelTableData.map(item => {
                        if (item.isFbbz == '0') {
                            item.isFbbz = '未发布'
                        } else if (item.isFbbz == '1') {
                            item.isFbbz = '已发布'
                        }
                        this.startExport=true
                        setTimeout(()=>{this.startExport=false},2000)
                    })

                })
            },
            initDate() {
                if (this.formData.dataDate) {
                    this.formData.createStartDate = this.formData.dataDate[0]
                    this.formData.createEndDate = this.formData.dataDate[1]
                }
            },
            loadData() {
                // this.$set(this.$refs.searchForm.fdFormData, 'CHANGEisFbbz', '未发布')
                if(this.formData.CHANGEisFbbz=='发布'){
                    this.formData.isFbbz='1'
                }else{
                    this.formData.isFbbz='0'
                }
                this.$api.messPub.BankMessSear(
                    {
                        ...this.searchData,
                        ...this.formData,
                        btnType: this.btnType,
                        listType: '3'
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    }
                ).then(res => {
                    this.pagination.total = res.total;
                    this.adminType = res.data.type
                    this.tableData = res.data.list;
                    this.tableData && this.tableData.map(item => {
                        if (item.isFbbz == '0') {
                            item.isFbbz = '未发布'
                        } else if (item.isFbbz == '1') {
                            item.isFbbz = '已发布'
                        }
                    })
                    this.type = res.data.type
                    this.formData.draftOrgan = res.data.unitName
                    this.formData.draftOrganId = res.data.unitId
                    this.$set(this.$refs.searchForm.fdFormData, 'draftOrgan', res.data.unitName)
                    if (res.data.type == '0') {
                        this.isOrg=false
                    } else if (res.data.type == '1') {
                        this.isOrg=false
                    }
                    // this.initData()
                })
            },
            initData() {
                this.formCfg = [
                    {type: 'radios', label: '信息状态', prop: 'CHANGEisFbbz', options: '未发布,发布', rule: "must"},
                    {type: 'input', label: '本行机构', prop: 'draftOrgan', span: 8, disabled: true, style: {width: '100%'}},
                    {
                        type: 'button-primary',
                        prop: '$selectOrg',
                        span: 2,
                        value: '选择',
                        disabled: this.isOrg,
                        style: {marginLeft: '-54px'}
                    },
                    {type: 'input', prop: 'oldOrgan', span: 8, disabled: this.isOrg},

                    {
                        type: 'input',
                        label: '主办部门',
                        prop: 'draftDepartment',
                        span: 8,
                        style: {width: '100%'},
                        disabled: true
                    },
                    {
                        type: 'button-primary',
                        prop: '$selectDepar',
                        span: 2,
                        value: '选择',
                        disabled: this.isSave,
                        style: {marginLeft: '-54px'}
                    },
                    {type: 'input', prop: 'oldDept', span: 8, disabled: this.isSave},


                    {type: 'input', label: '拟稿人', prop: 'draftUser', span: 20, style: {width: '94%'}},
                    [
                        {type: 'button-primary', prop: '$submit', value: '开始查询'},
                        {type: 'button', prop: '$reset', value: '重置'},
                        {type: 'formitem', style: {'text-align': 'center'}}
                    ],
                ]
            },
            reset() {

                this.$nextTick(()=>{
                    this.$set(this.formData,'title','')
                    this.$set(this.formData,'dataDate','')
                    // this.$set(this.formData,'CHANGEisFbbz','')
                    // this.$set(this.formData,'draftOrgan','')
                    // this.$set(this.formData,'draftOrganId','')
                    // this.$set(this.formData,'draftDepartment','')
                    // this.$set(this.formData,'draftDepartmentId','')
                    this.$set(this.formData,'isFbbz','0')
                    this.$set(this.formData,'createStartDate','')
                    this.$set(this.formData,'createEndDate','')
                    this.$set(this.searchData,'createStartDate','')
                    this.$set(this.searchData,'createEndDate','')
                    this.$set(this.$refs.searchForm.fdFormData, 'draftDepartmentId', '')
                    this.$set(this.$refs.searchForm.fdFormData, 'draftDepartment', '')
                    this.$set(this.$refs.searchForm.fdFormData, 'oldDept', '')
                    this.$set(this.$refs.searchForm.fdFormData, 'draftUser', '')
                    this.$set(this.$refs.searchForm.fdFormData, 'CHANGEisFbbz', '未发布')
                    this.loadData()
                })


            },
            submit(params) {
                this.formData = params
                if(this.formData.dataDate && this.formData.dataDate.length!=0) {
                    this.formData.createStartDate = this.formData.dataDate[0]
                    this.formData.createEndDate = this.formData.dataDate[1]
                    this.searchData.createStartDate = this.formData.dataDate[0]
                    this.searchData.createEndDate = this.formData.dataDate[1]
                } else {
                    this.formData.createStartDate = ''
                    this.formData.createEndDate = ''
                    this.searchData.createStartDate = ''
                    this.searchData.createEndDate = ''
                }
                if(null??this.formData.isFbbz){
                    console.log("params",params)
                    this.loadData()
                }else{
                    this.$message({
                        type:'warning',
                        message:'请选择信息发布状态'
                    })
                }
            },
            //fd按钮控制
            btnEvent(params) {
                switch (params.prop) {
                    case "$selectOrg":
                        this.title = "选择机构";
                        this.isSingle = true;
                        this.orgOrDept = 1;
                        this.orgOrDeptId = "0";
                        this.showOrgTree = true
                        break
                    case "$selectDepar":
                        if (!this.formData.draftOrganId) {
                            this.$message({
                                message: '请先选择机构',
                                type: 'success'
                            });
                            return
                        }
                        this.title = "部门";
                        this.isSingle = true;
                        this.orgOrDept = 0;
                        this.orgOrDeptId = this.formData.draftOrganId;
                        this.showOrgTree = true
                        break
                }
            },
            getOrgList(org) {
                if (this.orgOrDeptId == "0") {
                    this.formData.manageBankId = org.id
                    this.$set(this.$refs.searchForm.fdFormData, 'draftOrgan', org.unitName)
                    this.$set(this.formData, 'draftOrganId', org.id)
                    this.initData()
                } else {
                    let deptId = [];
                    let deptName = [];
                    // org.map(item => {
                    //     deptId.push(item.id)
                    //     deptName.push(item.unitName)
                    // })
                    // this.$refs.searchForm.fdFormData.draftDepartment=deptName.join(",")
                    this.$set(this.$refs.searchForm.fdFormData, 'draftDepartment', org.unitName)
                    this.$set(this.formData, 'draftDepartmentId', org.id)
                }
            },
            cellClick(row) {
                switch (row.listType) {
                    case '0':
                        this.hasOpened(row.id,{
                             'name': "selfBankInfoPub",
                             'query': row
                        })
                        // this.$router.push({
                        //     path: '/dashboard/personalOffice/publishInfo/selfBankInfoPub',
                        //     query: row
                        // })
                        break
                    case '1':
                        this.$intent.goNewPage(this, {
                            name: "finselfBankInfoPub",
                            query:row
                        });
                        // this.$router.push({
                        //     path: '/dashboard/personalOffice/publishInfo/finselfBankInfoPub',
                        //     query: row
                        // })
                        break
                    case '2':
                         this.$intent.goNewPage(this, {
                              name: "selfinquireDeal",
                              query: { id:row.id}
                         });
                        // this.$router.push({
                        //     path: '/dashboard/personalOffice/publishInfo/inquireDeal',
                        //     query: {id:row.id}
                        // })
                        break



                }
                // console.log(row)
                // let rowData=JSON.stringify(row)
                // this.$router.push({
                //     name:'selfinquireDeal',
                //     query:rowData
                // })
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .content {
    width: 100%;
    height: 100%;
    margin: 0 auto;

    .cformdata {
      margin-top: 24px;
    }
  }

  .use_object_title {
    width: 72%;
    text-align: center;
    color: #458cf1;
    font-size: 28px;
  }

  .btn_list {
    width: 100%;
    margin-left: 40%;
  }

  .mt20 {
    padding: 20px 0 0 0;
    position: relative;
    border: 1px solid #f0f0f0;
  }
</style>
