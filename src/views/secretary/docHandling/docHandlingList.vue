
<template>
    <div class="selectDept">
      <el-tabs v-model="activeName" @tab-click="handelClick">
        <el-tab-pane label="全部">
          <div style="margin-left: 30px;">
            <el-form label-position="right" class="formData" label-width="80px" :model="formData" ref="formData">
              
              <el-form-item label="文号" prop="fileCode">
                <el-input v-model="formData.fileCode" ></el-input>
              </el-form-item>
              <el-form-item label="文件标题" prop="title">
                <el-input v-model="formData.title"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
               <el-button type="primary" @click=loadD>搜索</el-button>
               <el-button type="primary" @click="onClear">清空</el-button>
            </div>
           
          </div>
        </el-tab-pane>
        <el-tab-pane label="待办">
          <div class="btn">
            <el-button type="primary" @click=addNew>新建</el-button>
            <el-button type="primary" @click=del>删除</el-button>
         </div>
        </el-tab-pane>
        <el-tab-pane label="已办"></el-tab-pane>
        <el-tab-pane label="办结"></el-tab-pane>
      </el-tabs>
  
      <mTable
        style="margin-top: 30px;"
        ref="PersonTable"
        @refresh="loadD"
        :isSelection="true"
        @select="selectRow"
        @cellClick="cellClick"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
      ></mTable>
      
    </div>
  </template>
  
  <script>
    import mTable from "components/table/tTable";
    import exportTable from "@/minixs/exportTable"
    import apis from '@/httpTansun/api/secreatary/fileHandle.js'
   
      export default {
        name: "docHandlingList",
        components: {
          mTable
        },
          data() {
              return {
                selectedRowId: '',
                btnType: '0',
                formData:{
                  title:"",
                  hqDept:""
                },
                activeName:"1",
                tableCols: [
                { label: "日期", prop: "createDate" },
                { label: "编号", prop: "documentNo" },
                { label: "文件标题", prop: "title" },
                { label: "来文单位", prop: "fromDept" },
                { label: "当前环节", prop: "currentNode" },
                { label: "操作人", prop: "currentUser" },
              ],
              pagination: {
                pageNum: 1,
                pageSize: 20,
              },
                tableData:[]
              }
          },
          created(){
            this.loadD()
          },
          methods:{
            //删除按钮
            del(){
              const data = {
                id: this.selectedRowId
              }
              apis.paramsMatainianDel(data).then(res=> {
                if (res.code==='SUCCESS') {
                  this.$message({
                      message: '删除成功',
                      type: 'success'
                  })
                  this.loadD()
                }
              })
            },
            //新建按钮
            addNew(){
              this.$router.push({ name: 'docDetail', query: { identify: 1 } });
            },
            //加载列表数据
            loadD() {
              const _this = this
              let data = {
                btnType: this.btnType,
                ..._this.formData
              }
  
              let createStartDate = this.formData.createStartDate
              let createEndDate = this.formData.createEndDate
              this.formData.createStartDate = createStartDate? createStartDate.getFullYear() +"-"+ (createStartDate.getMonth()+1) +"-"+createStartDate.getDate(): ''
              this.formData.createEndDate = createEndDate ? createEndDate.getFullYear() +"-"+ (createEndDate.getMonth()+1) +"-"+createEndDate.getDate(): ''
              apis.fileList(data, {
              PAGE_JUMP: this.pagination.pageNum,
              REC_IN_PAGE: this.pagination.pageSize,
            }).
              then( res => {
                if (res.code==="SUCCESS") {
                  this.tableData = res.data
                }
                console.log(res)
              })
            },
            //点击行进详情
            cellClick(row) {
              this.$router.push({ name: 'docDetail', query: { identify: 2 , data: row} });
            //  this.$router.push({ name:'detail',query:{data:row,identify:2}})
            },
            //选择选项框
            selectRow(data) {
              console.log("xuanzhonghang-----", data)
              const len = data.length;
              const selectedRowId = []
              for(let i=0; i<len; i++ ) {
                selectedRowId.push(data[i].id)
              }
              this.selectedRowId=selectedRowId.join(',')
              console.log("this.selectedRowId-----", this.selectedRowId)
            },
            onLoad(){
              
            },
            //tab也签切换
            handelClick(tab){
              console.log(tab.index)
              switch(tab.index){
                case '1': this.btnType = '0'; this.loadD()
                break;
                case '2': this.btnType = '1'; this.loadD()
                break;
                case '3': this.btnType = '2'; this.loadD()
                break;
                default: this.btnType = '3'; this.loadD()
                break;
              }
              if(tab.index==="3"){
                this.tableCols=[
                { label: "日期", prop: "createDate" },
                { label: "编号", prop: "documentNo" },
                { label: "文件标题", prop: "title" },
                { label: "来文单位", prop: "fromDept" }
                ]
              }else {
                this.tableCols=[
                { label: "日期", prop: "createDate" },
                { label: "编号", prop: "documentNo" },
                { label: "文件标题", prop: "title" },
                { label: "来文单位", prop: "fromDept" },
                { label: "当前环节", prop: "currentNode" },
                { label: "操作人", prop: "currentUser" },
                ]
              }
            },
            onClear(){
              this.$refs.formData.resetFields()
              console.log(this.$refs.formData)
              console.log(11)
            }
          }
      }
  </script>
  
  <style scoped lang="less" rel="stylesheet/less">
  .el-input{
    width: 1100px;
  }
  .btn{
    margin-left:500px;
  }
  
  </style>
  