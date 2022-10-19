<!--
 * @Author: your name
 * @Date: 2020-07-31 15:53:34
 * @LastEditTime: 2020-08-11 14:22:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\query.vue
-->
/**
* create by zz on 2020/7/31 16:00
* 类注释：
* 备注：会议预订/查询
*/
<template>
  <div class="query">
    <div class="process_content">
      <el-form ref="formData" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用日期">
              <el-date-picker
                v-model="formData.meetUseDate"
                value-format="yyyy-MM-dd"
                type="daterange"
                align="left"
                unlink-panels
                style="width:100%"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="当前环节">
              <el-select style="width:100%" v-model="formData.orderStatus">
                <el-option
                  v-for="(item,index) in nodeList"
                  :key="index"
                  :label="item.value"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="text-align: right;">
            <el-form-item>
              <el-button type="primary" @click="search('btn')">搜索</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="text-align: right;padding: 3px 0;">
        <el-button type="danger" @click="deleteLot">删除</el-button>
        <el-button @click="printAll">批量打印</el-button>
        <el-button @click="toExcel">导出</el-button>
      </el-row>
      <m-table
        id="table"
        :isSelection="isSelection"
        @select="tableSelect"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @cellClick="cellClick"
        size="medium"
        :isIndex="false"
        :isHandle="false"
        :searchData="formData"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isIndexPage="true"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/mTable";
import exportTable from "@/minixs/exportTable";
export default {
  name: "managerQuery",
  components: {
    mTable
  },
  data() {
    return {
      isSelection:true,
      formData: {
        meetUseDate:[],
        orderStatus: "5"
      },
      tableData: [],
      tableCols:[
          { label: "使用时间", prop: "meetUseDate", align: "center" ,width:200},
          { label: "会议室名称", prop: "roomName", align: "center" },
          { label: "会议类型", prop: "meetType", align: "center" },
          { label: "主办部门", prop: "hostDepartment", align: "center" },
          { label: "申请人", prop: "orderUserName", align: "center" },
          { label: "联系电话", prop: "orderUserPhon", align: "center" },
          { label: "参会领导", prop: "attendUsers", align: "center",width:160 }
        ],
      pagination: {
        page: 1,
        total: 0,
        limit: 20
      },
      nodeList: [
        { code: "5", value: "全部" },
        { code: "0", value: "审批中" },
        { code: "1", value: "预订成功" },
        { code: "2", value: "已取消" },
        { code: "4", value: "使用完毕" }
      ],
      searchFun:{
        function:'findOrder',
        manage:'',
        page: 1,
        total: 0,
        limit: 20
      },
      tableSelectList:[],
    };
  },
  computed: {},
  methods: {
    reset() {
      this.formData = {
        meetUseDate:[],
        orderStatus: "5"
      };
    },
    search(type) {
      let parseList = JSON.parse(JSON.stringify(this.formData));
      if(type=='btn'){
        this.pagination={
          page: 1,
          total: 0,
          limit: 20
        };
        this.tableSelectList=[];
      }
      var obj = Object.assign(this.searchFun, parseList, this.pagination);
      sessionStorage.setItem('page_sw',JSON.stringify(obj));
      this.$post
        .postData("findOrder", JSON.stringify(obj), this.$businessCode.hysyd)
        .then(res => {
          if (res && res.success) {
            this.tableData=res.data && res.data.rows||[];
            this.pagination.total=res.data&&res.data.total||0;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "查询失败",
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "网络错误",
            duration: 2000
          });
        });

    },
    handleSizeChange(limit){
      this.pagination.page =  1;
      this.pagination.limit = limit;
      this.tableData = [];
      this.search();
    },
    handleCurrentChange(page){
      this.pagination.page = page;
      this.tableData = [];
      this.search();
    },
    cellClick(row, column, cell, event) {
      let pageData={
        id:row.id,
        orderStatu:row.orderStatus,
        roomId:row.roomId,
      };
      this.goNewPage('/meeting/yd/managerBlueDetail',pageData)
    },
    goNewPage (path,pageData) {
      const routeData = this.$router.resolve({
        path: path,
        query: pageData
      });
      window.open(routeData.href, "_blank");
    },
    tableSelect(rows, row){
      this.tableSelectList=rows;
    },
    printAll(){
      if(this.tableSelectList.length==0){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择需要打印的数据！",
          duration: 1500
        });
      }else{
        sessionStorage.setItem("managerPrintData", JSON.stringify(this.tableSelectList));
        this.goNewPage('/meeting/yd/managerPrint');
      }
    },
    toExcel(){
      this.isSelection=false;
      setTimeout(()=>{
        exportTable.exportExcel("会议室预定单");
        this.isSelection=true;
      },10)
    },
    deleteLot(){
      if(this.tableSelectList.length==0){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请先选择要删除的表单！",
          duration: 1500
        });
      }else{
        this.$confirm("是否确认删除？", "提示", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          callback: action => {
            if (action == "confirm") {
              let deletIds="";
              this.tableSelectList.forEach((item,index) => {
                debugger;
                deletIds=deletIds+(index==0?item.id:(','+item.id));
              });
              let httpobj={
                function:'delBatchOrder',
                ids:deletIds
              };
              this.$post.postData("delBatchOrder", JSON.stringify(httpobj), this.$businessCode.hysyd)
                .then(res=>{
                  if(res&& res.success){
                    this.tableSelectList=[];
                    this.pagination={
                      page: 1,
                      total: 0,
                      limit: 20
                    };
                    this.search();
                    this.$message({
                      type: "success",
                      showClose: true,
                      offset: 400,
                      message: "删除成功！",
                      duration: 1500
                    });
                  }else{
                    this.$message({
                      type: "error",
                      showClose: true,
                      offset: 400,
                      message: res.message,
                      duration: 1500
                    });
                  }
                })
            }
          }
        });
      }
    },
  },
  activated() {},
  mounted() {
  },
  created() {
    if(sessionStorage.getItem('page_sw')){
      this.formData = Object.assign(this.formData,JSON.parse(sessionStorage.getItem('page_sw')));
      this.pagination={
        page: this.formData.page, //第几页
        total: this.formData.total, //共有条数
        limit: this.formData.limit, //每页条数
      };
    }
    this.search();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.query {
  background: white;
  margin: 0 auto;
}
/deep/ .el-range-editor.el-input__inner{
  padding:0 15px
}
</style>
