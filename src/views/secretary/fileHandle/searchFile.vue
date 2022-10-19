
<template>
  <div class="selectDept">
    <el-tabs v-model="activeName" @tab-click="handelClick">
      <el-tab-pane label="全部">
        <div style="margin-left: 30px;">
          <el-form label-position="right" class="formData" label-width="80px" :model="formData" ref="formData">
            <el-row>
              <el-col :span="12">
                 <el-form-item label="开始时间" prop="createStartDate">
                    <el-date-picker style="width: 80%;" v-model="formData.createStartDate" placeholder="选择日期"></el-date-picker>
                 </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-form-item label="截止时间" prop="createEndDate">
                   <el-date-picker style="width: 80%;" v-model="formData.createEndDate" placeholder="选择日期"></el-date-picker>
                 </el-form-item>
              </el-col>
            </el-row>
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
  import exportTable from "../../../minixs/exportTable"
  import apis from '@/httpTansun/api/secreatary/fileHandle.js'
 
    export default {
      name: "files",
      components: {
        mTable
      },
        data() {
            return {
              btnType: '',
              formData:{
                createStartDate:"",
                createEndDate:"",
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
              pageSize: 10,
            },
              tableData:[]
            }
        },
        created(){
          this.loadD()
        },
        methods:{
          addNew(){},
          loadD() {
            const _this = this
            let data = {
              btnType: this.btnType,
              ..._this.formData
            }
            apis.fileList(data, _this.pagination).
            then( res => {
              console.log(res)
            })
          },
          cellClick(row) {
           this.$router.push({
             path:'/detail',query:{data:row,identify:2}
           })
          },
          selectRow() {
            
          },
          onLoad(){
            
          },
          handelClick(tab){
            console.log(tab)
            switch(tab){
              case '1': this.btnType = '1'
              break;
              case '2': this.btnType = '2'
              break;
              case '0': this.btnType = '3'
              break;
              default: this.btnType = '0'
              break;
            }
            if(tab==="3"){
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
