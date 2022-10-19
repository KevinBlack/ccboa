<template>
  <div class="check">
    <div style="margin: 15px 0">        
        <el-tabs v-model="activeName" @tab-click="handleTabsClick">
                <el-tab-pane label="筹备" name="tabs-look">              
                </el-tab-pane>     
                <el-tab-pane label="办结" name="tabs-sleep">
                    <el-date-picker
                    style="float:right"
                            v-model="value"
                            type="year"
                            @change = "changeYear"
                            placeholder="2020">       
                    </el-date-picker>
                </el-tab-pane>  
            <el-row>  
            <el-button type="primary" style="float:left"  @click="create_btn">起草会议主办单</el-button>                 
            <el-button type="primary" style="margin-left:20px;float:left"  @click="exportData">导出</el-button>
        </el-row>             
        </el-tabs>   
    </div>
    <!-- <el-dialog title="请选择类型及拟稿部门" :visible.sync="dialogFormVisible">
      <el-form style="margin:0 10%" :data="formData1">
        <el-form-item label="主办部门" v-if="this.deptList.length>1">
          <el-select v-model="selectDept" style="width:50%" @change="change(selectDept)">
            <el-option
              v-for="item in deptList"
              :key="item.firstUnitId"
              :label="item.firstUnitName"
              :value="item.humanId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemClick('cancel')">取 消</el-button>
        <el-button type="primary" @click="itemClick('sure')">确 定</el-button>
      </div>
    </el-dialog> -->
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
    import exportTable from "../../../minixs/exportTable";
    export default {
        name: "conferList",
        components: {
            mTable
        },
        props: {},
        data() {
            return {
                  formData1: {},
                 activeName: "tabs-look",
                //   dialogFormVisible: false,
                searchData:{},
                tableData: [
                    // {title:'bm',hyTime:'st',draftUser:'ming',draftDate:'ren'}
                ],
                tableCols: [                  
                    {label: '会议名称', prop: 'title'},
                    {label: '会议时间', prop: 'hyTimeStr'},
                    {label: '拟稿人', prop: 'draftUser'},           
                    {label: '拟稿日期', prop: 'draftDate'},
                  
                ],
                tableCols0: [
                    {label: '会议名称', prop: 'title'},
                    {label: '会议时间', prop: 'hyTimeStr'},
                    {label: '拟稿人', prop: 'draftUser'},           
                    {label: '拟稿日期', prop: 'draftDate'},
                ],
                tableCols1: [
                    {label: '会议名称', prop: 'title'},
                    {label: '会议时间', prop: 'hyTimeStr'},                           
                    {label: '办结日期', prop: 'finishDate'},
                ],
              
                pagination: {
                    pageNum: 1,
                    pageSize: 10
                },
                options: [],
                value: "",
                status:'0'
            }
        },
        computed: {},
        methods: {
    //            addData1(){
    //           this.$api.meeting.getDeptList({})
    //         .then(
    //             res => {
    //     this.deptList = res.result;
    //     if (this.deptList.length == 1) {
    //       this.selectDept = JSON.stringify(this.deptList[0])
    //       this.formData1.deptDetail = JSON.stringify(this.deptList[0])
    //     } else {
    //       this.selectDept = this.deptList[0].humanId
    //       let select1 = {}
    //       this.deptList.forEach(item => {
    //         if (item.humanId == this.selectDept) {
    //           select1 = item
    //         }
    //       })
    //       this.formData1.deptDetail = JSON.stringify(select1)
    //     }
    //   }
    //         );
    //         //   let row={}
    //         //   row.type=0
    //         //     this.$router.push({
    //         //         path:'/secretary/presidentMeeting/topicSub/topicDetail',
    //         //        query: {rowData: JSON.stringify(row)}
    //         //     })
    //         },         
              itemClick (params) {
      switch (params) {
        case 'sure':
          // console.log()
          if (this.formData1.type) {
            this.$intent.goNewPage(this, { path: "/presidentMeeting/conferList/conferDetail", query: this.formData1 })
            this.dialogFormVisible = false
          } else {
            this.$message({
              message: '请选择会议类型',
              type: 'warning'
            });
          }
          break
        case 'cancel':
          // this.$intent.closeWindow(this)
          this.dialogFormVisible = false
          break
      }
    },
            change (p) {
      console.log('pppp', p)
      let select = {}
      // this.selectDept = this.deptList[0].humanId
      this.deptList.forEach(item => {
        // this.selectDept = p
        if (item.humanId == p) {
          select = item
        }
      })
      this.formData1.deptDetail = JSON.stringify(select)
      console.log(9090909, this.formData1)
      this.$forceUpdate()
    },
       
            //  cellClick(row) {},
             changeYear(){
               let  year=this.value.getFullYear().toString()
                this.$api.secreatary.meeting.mainList(
                    {curYear:year},
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,
                    }

                ).then(res => {
                    this.pagination.total = res.total    
                    //   res.data.map(item=>{
                    //     // item.hyTime=formatData(item.hyTime,'YYYY-MM-DD hh:mm:ss')
                    //     // item.draftDate=formatData(item.draftDate,'YYYY-MM-DD hh:mm:ss')
                    //     // item.finishDate=formatData(item.finishDate,'YYYY-MM-DD hh:mm:ss')
                    // })
                    this.tableData = res.data
                })
                
             },
             exportData(){
                exportTable.exportExcel("会议主办单");
            },
        
                handleTabsClick(tab) {
            if (tab.index == 0) {
            this.tableCols = deepClone(this.tableCols0);
            this.status = '0'
            this.pagination.pageNum=1
            this.loadData()
            } else if (tab.index == 1) {
            this.tableCols = deepClone(this.tableCols1);
             this.status = '1'
            this.pagination.pageNum=1
            this.loadData()
            } 
            },
             select(row) {},
            loadData() {
                this.$api.secreatary.meeting.mainList(
                    { status:this.status},
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,
                    }
                ).then(res => {
                    console.log(res)
                    this.pagination.total = res.total
                    // res.data.map(item=>{
                    //     item.hyTime=formatData(item.hyTime,'YYYY-MM-DD')
                    //     item.draftDate=formatData(item.draftDate,'YYYY-MM-DD')
                    //     item.finishDate=formatData(item.finishDate,'YYYY-MM-DD')
                    // })
                    this.tableData = res.data
                  
                })
            },
            cellClick(row) {
                row.type=1              
                this.$router.push({
                    path:'/secretary/presidentMeeting/conferList/conferDetail',
                     query: {rowData:JSON.stringify(row)}
                })
            },
            // create_btn(){
            //     let row={}
            //     row.type=0       
            //     this.$router.push({
            //         path:'/secretary/presidentMeeting/conferList/conferDetail',
            //         query: {rowData: JSON.stringify(row)}
            //     })
            // }
            
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

</style>


