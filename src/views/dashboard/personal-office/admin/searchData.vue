<template>
  <div class="content">
    <p class="use_object_title">专栏查询</p>
    <div class="cformdata">
      <search-form
        :formData="formData"
        @reset="reset"
        class="mt20"
        @submit="submit"
        @event="btnEvent"
        :formCfg="formCfg">
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="formData.zlTitle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="查询日期">
            <el-date-picker
              v-model="formData.dataDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              style="width:100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </el-form-item>
        </el-col>
      </search-form>
    </div>
    <div style="margin: 10px 0;">
        <el-button type="primary" @click="exportData">导出</el-button>
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
      ></m-table>
    </div>
  </div>
</template>
<script>
    import FdForm from 'vue-elementui-freedomen/components/form'
    import mTable from '@/components/table/tTable'
    import searchForm from "@/components/form/searchForm";
    import exportTable from "@/minixs/exportTable"

    export default {
        name: 'searchData',
        components: {
            mTable,
            searchForm
        },
        data() {
            return {
                searchData: {},
                formData: {},
                tableData: [],
                tableCols: [
                    {label: '专栏标题', prop: 'zlTitle'},
                    {label: '文号', prop: 'zlWh'},
                    {label: '栏目', prop: 'zlSslm'},
                    {label: '发布日期', prop: 'publicDate'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize: 10,
                },
                formCfg: [
                    {type: 'input', label: '所属栏目', prop: 'zlSslm', span: 20},
                    {
                        type: 'select', label: '制发行', prop: 'draftOrganid', span: 10,
                        // options:bankOptions1.join(",")
                    },
                    {type: 'input', prop: 'draftOr', span: 10},
                    {
                        type: 'select', label: '主办部门', prop: 'draftDepartment', span: 10,
                        // options:bankOptions2.join(",")
                    },
                    {type: 'input', prop: 'draftOrgan', span: 10},
                    // {type: 'input', label: '标题', prop: 'zlTitle', span: 20},
                    {type: 'input', label: '文号', prop: 'zlWh', span: 20,value:'〔〕'},
                    [
                        {type: 'button-primary', prop: '$submit', value: '开始查询'},
                        {type: 'button', prop: '$reset', value: '重置'},
                        {type: 'formitem', style: {'text-align': 'center'}}
                    ],
                ],
                serverconfig: {
                    labelWidth: '140px'
                },
                bankOptions1: [],
                bankOptions2: [],
                bankOptions3: [],
                bankOptions4: [],
                selectOPtion: {}
            }
        },
        created() {
            this.optionsData()
        },
        mounted(){
        },
        methods: {
            initDate() {
                if (this.formData.dataDate) {
                    this.formData.publicqianDate = this.formData.dataDate[0]
                    this.formData.publichouDate = this.formData.dataDate[1]
                }
            },
            optionsData() {
                this.initDate()
                this.$api.adminConfig.searchColumn(
                    {
                        type:'options',
                        searchData: this.searchData,
                        ...this.formData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    }
                ).then(res => {
                    this.bankOptions1.push(res.data.one.draftOrganid)
                    this.bankOptions3.push(res.data.one.draftId)
                    this.formData.draftId=res.data.one.draftId
                    this.bankOptions2 = []
                    let that = this
                    res.data.two&&res.data.two.map(function (value, index) {
                        that.bankOptions2.push(value.draftDepartment)
                    })
                    res.data.two&&res.data.two.map(function (value, index) {
                        that.bankOptions4.push(value)
                    })
                    this.initData()
                })
            },
            loadData() {
                this.initDate()
                this.$api.adminConfig.searchColumn(
                    {
                        type:'',
                        ...this.formData,
                        searchData:this.searchData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    }
                ).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data;
                    if (res.data.length === 0) {
                        this.$message({
                          message: '未查到符合条件的记录！',
                          type: 'warning'
                      });
                    }
                })
            },
            loadDataSec() {
                this.initDate()
                this.$api.adminConfig.searchColumn(
                    {
                        ...this.formData,
                        searchData: this.searchData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    }
                ).then(res => {

                    this.bankOptions2 = []
                    let that = this
                    res.data&&res.data.map(function (value, index) {
                        that.bankOptions2.push(value.draftDepartment)
                    })
                    this.initData()
                })
            },
            initData() {
                this.formCfg = [
                    {type: 'input', label: '所属栏目', prop: 'zlSslm', span: 20},
                    {
                        type: 'select', label: '制发行', prop: 'draftOrganid', span: 10,
                        options: this.bankOptions1.join(",")
                    },
                    {type: 'input', prop: 'draftOr', span: 10},
                    {
                        type: 'select', label: '主办部门', prop: 'draftDepartment', span: 10,
                        options: this.bankOptions2.join(",")
                    },
                    {type: 'input', prop: 'draftOrgan', span: 10},
                    // {type: 'input', label: '标题', prop: 'zlTitle', span: 20},
                    {type: 'input', label: '文号', prop: 'zlWh', span: 20,value:'〔〕'},
                    [
                        {type: 'button-primary', prop: '$submit', value: '开始查询'},
                        {type: 'button', prop: '$reset', value: '重置'},
                        {type: 'formitem', style: {'text-align': 'center'}}
                    ],
                ]
            },
            reset() {
                this.formData = {}
                // this.initData()
            },
            submit(params) {
                this.formData = params
                console.log(this.formData,'000');
                this.bankOptions4.forEach(element => {
                    if (this.formData.draftDepartment === element.draftDepartment) {
                        this.formData.draftDepartmentId = element.draftDepartmentId
                    }
                });
                this.loadData()
            },
            btnEvent(params){
                this.formData = params.row
                // if(params.prop=='draftOrganid'){
                //     this.formData.draftOrganid=params.value
                //     this.loadDataSec()
                // }
            },
            //导出
            exportData(){
                exportTable.exportExcel("专栏查询结果");
            },
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
    width: 100%;
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
