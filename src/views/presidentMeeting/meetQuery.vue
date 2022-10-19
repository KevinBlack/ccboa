<template>
  <div class="searchForm"> 
    <search-form
      ref="searchForm"
      :formData="formData"
      :formCfg="formCfg"
      @reset="reset"
      @event="btnevent"
      @submit="submit">    
        <el-col :span="12">
        <el-form-item label="会议日期">
          <el-date-picker
            v-model="formData.hyTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            style="width:100%"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
      </el-col>
    </search-form>
    <el-row>
    <el-col :span="4" style="position: relative;left:0px;top:-10px;">
      <el-button  type="primary" @click="exportData">导出</el-button>
    </el-col>
    </el-row>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      :searchData="searchData"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection='true'
      :pageSizeList="[20, 30, 50, 100, 200, 500]"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import searchForm from "components/form/searchForm";
    import mTable from "components/table/tTable";
    export default {
        name: "meetQuery",
        components: {
            searchForm,
            mTable,
        },
        props: {},
        data() {
            return {             
                isdialog: false,
                // title: "选择部门",
                // showOrgTree: false,
                // isSingle: false,
                // orgOrDept: 1,
                // orgOrDeptId: "0",
                searchData:{},
                formCfg: [                  
                    {type: "select", style: {width: "100%"},prop: "status", label: "会议状态", span: 24, options: {2: "全部",1:"已召开", 0: "筹备中"},},
                    {type: "input", style: {width: "100%"},prop: "title", label: "会议名称", span: 24},
                    {type: "input", style: {width: "100%"},prop: "ytMc", label: "议题名称", span: 24},
                    {type: "input", style: {width: "100%"},prop: "strZhbr", label: "主汇报部门", span: 24},
                    {type: "input", style: {width: "100%"},prop: "strLxName", label: "列席部门", span: 24},
                    [
                        {type: "button-primary", prop: "$submit", value: "搜索"},
                        {type: "button", prop: "$reset", value: "清空 "},
                        {type: "formitem", style: {"text-align": "center", "margin-left": "-120px"}},
                    ],
                    
                ],
                formData: { 
                },
                tableData: [],
                tableCols: [
                    {label: '会议时间', prop: 'hyTime'},
                    {label: '会议名称', prop: 'title'},
                    {label: '议题名称', prop: 'ytMc'},
                    {label: '主汇报部门', prop: 'strZhbr'},
                ],
                pagination: {
                    pageNum: 1, //第几页
                    pageSize: 10 //每页条数
                },
            };
        },
        computed: {},
        methods: {
            reset() {
                this.formData = {}
            },
            submit(params) {
                this.formData = params;
                this.loadData()
            },
            
          //  loadData() {
          //       this.$api.secreatary.meeting.queryForm(this.formData, {
          //           PAGE_JUMP: this.pagination.pageNum,
          //           REC_IN_PAGE: this.pagination.pageSize
          //       }).then(res => {
          //           this.pagination.total = res.total;
          //           this.tableData = res.data
          //       })
          //   },     
               loadData(status) {
                // if(!status){
                //     this.pagination.pageNum=1
                // }
                if(this.formData.hyTime){
                    this.formData.startDate=this.formData.hyTime[0]
                    this.formData.endDate=this.formData.hyTime[1]
                }
                 this.$api.secreatary.meeting.queryForm({
                        ...this.formData,
                      
                    },{
                    PAGE_JUMP: this.pagination.pageNum,
                    REC_IN_PAGE: this.pagination.pageSize
                }).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data
                })                
            },       
            cellClick(row){
                let rowdata=JSON.stringify(row)
                this.$intent.goNewPage(this,{path:'',query:{}})
            },
            handleClose() {
                this.isdialog = false
            },
            delecurrentCode() {
                this.isdialog = false

            },
            select(){

            },
            //导出
         exportData(){
                exportTable.exportExcel("行长办公会议");
            },
            btnevent(params) {

            //     switch (params.prop) {
            //         case "$selectOrg":
            //             this.title = "选择机构";
            //             this.isSingle = true;
            //             this.orgOrDept = 1;
            //             this.orgOrDeptId = "0";
            //             this.showOrgTree = true
            //             break
            //         case "$selectDepar":
            //             if (!this.formData.curbankId) {
            //                 this.$message({
            //                     message: '请先选择机构',
            //                     type: 'success'
            //                 });
            //                 return
            //             }
            //             this.title = "部门";
            //             this.isSingle = false;
            //             this.orgOrDept = 0;
            //             this.orgOrDeptId = this.formData.curbankId;
            //             this.showOrgTree = true
            //             break
            //         case '$selectDoOrg':
            //             this.isdialog=true
            //             break
            //     }
            },
        },
        activated() {
        },
        mounted() {
        },
        created() {
            this.loadData()
        },
    };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .formHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }

  .down {
    // position: absolute;
    // bottom: 0px;
    font-size: 12px;
    text-align: center;
  }
</style>
