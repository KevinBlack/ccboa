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
      <el-form ref="formData" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议名称">
              <el-input v-model="formData.meetingName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议类型">
              <el-select style="width:100%" v-model="formData.meetType" clearable>
                <el-option
                  v-for="(item,index) in meetingTypeList"
                  :key="index"
                  :label="item.paramName"
                  :value="item.paramName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主办部门">
              <el-input
                v-model="formData.hostDepartment"
                readonly="readonly"
                placeholder="请选择"
              >
                <el-button slot="append" @click="getTreeData" icon="el-icon-plus"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input v-model="formData.orderUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议室名称">
              <el-input v-model="formData.roomName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
              <el-date-picker
                v-model="formData.orderDate"
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="使用日期">
              <el-date-picker
                v-model="formData.meetUseDate"
                value-format="yyyy-MM-dd"
                type="daterange"
                style="width:100%"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前状态">
              <el-select style="width:100%" v-model="formData.orderStatus">
                <el-option
                  v-for="(item,index) in statusList"
                  :key="index"
                  :label="item.value"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-button type="primary" @click="search('btn')">搜索</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <m-table
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @cellClick="cellClick"
        size="medium"
        :isIndex="true"
        :isHandle="false"
        :searchData="formData"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
      ></m-table>
    </div>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></treeCofig>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/mTable";
import minixs from "@/minixs/index";
import treeCofig from "components/tree/tree-fawen";
export default {
  name: "query",
  components: {
    mTable,treeCofig
  },
  mixins: [minixs],
  data() {
    return {
      formData: {
        meetingName: "",
        meetType: "",
        hostDepartment: "",
        orderUserName: "",
        roomName: "",
        orderDate: [],
        meetUseDate:[],
        orderStatus: "0"
      },
      tableData: [],
      tableCols:[
          { label: "会议名称", prop: "meetingName", align: "center" },
          { label: "会议室名称", prop: "roomName", align: "center" },
          { label: "会议类型", prop: "meetType", align: "center" },
          { label: "使用时间", prop: "meetUseDate", align: "center" ,width:200},
          { label: "申请日期", prop: "cteatTime", align: "center",width:160 },
          { label: "申请人", prop: "orderUserName", align: "center" },
          { label: "申请人联系方式", prop: "orderUserPhon", align: "center" },
          { label: "到达时间", prop: "arriveTime", align: "center",width:160 },
          { label: "当前状态", prop: "orderStatus", align: "center" },
          { label: "主办部门", prop: "hostDepartment", align: "center" }
        ],
      pagination: {
        page: 1,
        total: 0,
        limit: 20
      },
      statusList: [
        { code: "0", value: "审批中" },
        { code: "1", value: "预订成功" },
        { code: "2", value: "已取消" },
        { code: "4", value: "使用完毕" }
      ],
      //会议类型
      meetingTypeList: [],
      searchFun:{
        function:'findOrder',
        page: 1,
        total: 0,
        limit: 20
      },
      //tree
      treeData: [],
      singelCheckF: true,
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      zhuCheckData: [], //主办部门选中数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      seletOptionsData: [], //弹窗下拉框数据
      dialogState: false,
      dialogTit: "", // 弹框标题
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      loadingTree: false,
      unitTreeFun: {
        function: "getUnitTreeAll",
        flag: true
      },
    };
  },
  computed: {},
  methods: {
    reset() {
      this.formData = {
        meetingName: "",
        meetType: "",
        hostDepartment: "",
        orderUserName: "",
        roomName: "",
        orderDate: [],
        meetUseDate:[],
        orderStatus: "0"
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
      }
      var obj = Object.assign(this.searchFun, parseList,this.pagination);
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
      this.search();
    },
    handleCurrentChange(page){
      this.search();
    },
    getMeetTypeList(){//type:1会议类型；2所需服务
      let httpData={
        function:'doFindParams',
        paramType:'1',
      };
      this.$post
        .postData(
          "doFindParams",
          JSON.stringify(httpData),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            this.meetingTypeList=res.data
          }else{
            this.$message.error(res.data.message);
          }
        })
        .catch(erro => {
         this.$message.error("请求失败");
        });
    },
    cellClick(row, column, cell, event) {
      let pageData={
        id:row.id,
        orderStatu:'',
        roomId:row.roomId
      };
      switch(row.orderStatus){
        case '审批中':
          if(row.state=='1'){//state 1:已办 0：待办
            pageData.orderStatu='2';
          }
          break
        case '已取消':
          pageData.orderStatu='1';
          break
        case '预订成功':
          pageData.orderStatu='3';
          break
        case '使用完毕':
          pageData.orderStatu='4';
          break
      }
      if(pageData.orderStatu!=''){
        this.goNewPage('/meeting/yd/blueDetail1',pageData)
      }else{
        this.goNewPage('/meeting/yd/blueDetail',pageData)
      }
    },
    goNewPage (path,pageData) {
      const routeData = this.$router.resolve({
        path: path,
        query: pageData
      });
      window.open(routeData.href, "_blank");
    },
    //树弹框
    getTreeData() {
      this.dialogTit = "选择部门";
      this.treeData = [];
      this.hasRadio = true;
      this.canTab = false;
      this.singelCheckF = true;
      this.showCompDialog();
      this.$post
        .postData(
          "getUnitTreeAll",
          JSON.stringify(this.unitTreeFun),
          this.$businessCode.hysyd
        )
        .then(res => {
          this.treeData = (res && res.data) || [];
        });
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params) {
      let that = this;

      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(";");
          ids = ids.join(";");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        this.formData.hostDepartment = names;
        this.formData.hostDepartmentId = ids;
        this.zhuCheckData = this.checkData;
        this.$forceUpdate();
      }

      this.dialogState = !this.dialogState;
      if (this.dialogState) {
        this.backDialogData();
      }
    },
    //弹窗回显数据
    backDialogData() {
      this.checkIds = this.formData.hostDepartmentId
        ? this.formData.hostDepartmentId.split(";")
        : [];
      this.checkData = this.zhuCheckData;
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.getMeetTypeList();
    if(sessionStorage.getItem('page_sw')){
      this.formData = Object.assign(this.formData,JSON.parse(sessionStorage.getItem('page_sw')));
      this.pagination={
        page: this.formData.page, //第几页
        total: this.formData.total, //共有条数
        limit: this.formData.limit, //每页条数
      };
      this.search();
    };
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
