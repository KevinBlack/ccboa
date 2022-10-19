<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="全部" name="tabs-all">
      <!-- <optionalfield></optionalfield> -->
    </el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
    <el-row class="mtJ20">
      <!-- <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row class="search_form">
            <el-col :span="4">
              <el-form-item label="示例标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="发送人" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="isAll || isMid">
              <el-form-item label="当前环节" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="isAll">
              <el-form-item label="状态" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="float:right">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down">
            <el-row>
              <el-form-item label="示例类型" prop="example">
                <el-radio-group v-model="ruleForm.example">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="模板"></el-radio>
                  <el-radio label="范文"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="文件类型" prop="file">
                <el-radio-group v-model="ruleForm.file">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="发文"></el-radio>
                  <el-radio label="签报"></el-radio>
                  <el-radio label="便函"></el-radio>
                  <el-radio label="呈送件"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <el-col class="down" v-if="down">
            <el-button type="info" size="small" @click="arrow()">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col>
        </el-form>
      </el-col> -->
          <!-- :to="{name:'AdminFw'}" -->

      <el-col class="mt20end">
        <el-button @click="handleMuban('1')" size="small" type="primary">新增模板及范文</el-button>
        <el-button
          @click="handleMuban('2')"
          size="small" type="primary"
          v-if="adminAdd"
        >管理员起草</el-button>
      </el-col>
      <el-col style="margin: 10px 0;">
        <m-table
          size="medium"
          :isSelection="false"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :tableData="tableData"
          :state="bank_tableParams.state"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
  </el-tabs>
    <!--选择部门-->
    <el-dialog
      :visible.sync="showChosDept"
      :modal-append-to-body="false"
      :chooseRangeStr="chooseRangeStr"
      :close-on-click-modal="false"
      title="选择部门"
    >
      <el-form>
        <el-form-item>
          <el-select
            v-model="bank_chosDept.deptName"
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in deptArr"
              :key="item.currUnitName"
              :label="item.currUnitName"
              :value="item.humanId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showChosDept = false">取 消</el-button>
        <el-button type="primary" @click="handleChosDept(type_fw)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";

const otherData = [
  { label: "序号", prop: "RN", align: "center" },
  { label: "示例类型", prop: "SAMPLETYPE", align: "center" },
  { label: "示例标题", prop: "FILETITLE", align: "center" },
  { label: "文件类型", prop: "FILETYPE", align: "center" },
  // { label: "当前环节", prop: "PCSAVYNM", align: "center" },CURNODENAME
  { label: "当前环节", prop: "CURNODENAME", align: "center" },
  // { label: "发送人", prop: "AUTHOR", align: "center" }
  // { label: "状态", prop: "currentNode", align: "center" }
];
const allData = [
  { label: "序号", prop: "rownum_", align: "center" },
  { label: "示例类型", prop: "sampleType", align: "center" },
  { label: "示例标题", prop: "fileTitle", align: "center" },
  { label: "文件类型", prop: "fileType", align: "center" },
  { label: "当前环节", prop: "cur_node_name", align: "center" },
  // { label: "发送人", prop: "author", align: "center" }
];


export default {
  name: "ModelFw",
  components: {
    mTable,
    // optionalfield
  },
  data() {
    return {
      adminAdd: false,
      chooseRangeStr: "",
      bank_countersignature: {
        function: "getAll",
        state: 0,
        page: 1,
        total: 0,
        limit: 20
      },
      bank_tableParams: {
        function: "getWFTask",
        state: 1, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 10, //每页条数
        tplbsnid: "mf_mf",
        totalCount: 0
      },
      down: false,
      ruleForm: {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        name: "",
        region: "",
        example: "全部",
        file: "全部",
        desc: ""
      },
      options: [],
      tableLoading: false,
      activeName: sessionStorage.getItem('MBLISTtab')||"tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isAll: true,
      isMid: false,
      isComplete: false,
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      baowenzd: "A08461302",

      //选择部门
      deptArr: [],
      deptArrFlag: false, //选择部门显示隐藏
      showChosDept: false,
      bank_chosDept: {
        function: "",
        deptName: ""
      },
      curhumanId: "",
      type_fw: "",
    };
  }, 
  created() {
    // 页码修改0823
    if(sessionStorage.getItem('MBLIST')){
      if(sessionStorage.getItem('MBLIST').state == 0){
        this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('MBLIST')))
      }else{
        this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('MBLIST')))
      }
    }
    // 页码修改0823 end
    let transArr =
      (localStorage.getItem("unitInfo") &&
        JSON.parse(localStorage.getItem("unitInfo"))) ||
      [];
    if(transArr.length>0) {
      transArr.forEach(element => {
        if(element.firstUnitName != element.currUnitName) {
          element.currUnitName = element.firstUnitName+'/'+ element.currUnitName
        }
      });
    }
    let userInfo =
      (localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo"))) ||
      "";
    this.curhumanId = userInfo.humanId;
    if (transArr.length > 1) {
      transArr.forEach(element => {
        if (element.unitId == userInfo.unitId) {
          this.deptArr.push(element);
        }
      });
       let curDept = JSON.parse(localStorage.getItem("userInfo")).humanId
      this.deptArr.forEach(element => {
        if(element.humanId == curDept) {
          this.bank_chosDept.deptName = element.humanId
        }
      });
    }

    // this.initData();
    // this.inittableData();
    this.handleLoadData()
    if (JSON.parse(localStorage.getItem("tcHumanRole"))) {
      let humanRole = JSON.parse(localStorage.getItem("tcHumanRole"));
      let humanArr = humanRole.filter(
        el => el.codeName == "系统管理员" || el.codeName == "超级管理员"||el.codeName == "系统管理员(分级维护)"||el.codeName == "管理员（分级维护）"
      );
      console.log(humanArr);
      if (humanArr.length > 0) {
        this.adminAdd = true;
      } else {
        this.adminAdd = false;
      }
    }
  },
  mounted() {
    document.title="范文管理"
  },
  
  methods: {
    // 起草电子
    handleMuban(val) {
      this.type_fw = val
      let newHref = '';
      if(this.deptArr.length>0) {
        this.showChosDept = true
      } else {
        if(val=="1") {
          newHref = this.$router.resolve({
            path: '/addMuban'
          }) 
        } else {
          newHref = this.$router.resolve({
            path: '/adminFw'
          }) 
        }
        window.open(newHref.href, "_blank");
      }
    },
    handleChosDept() {
      let newHref = ''
      this.showChosDept = false;
      this.$post.postData(
        "switchUserInfo",
        JSON.stringify({
          function: "switchUserInfo",
          human_Id: this.bank_chosDept.deptName
        }),
        this.$businessCode.ggfwgl1
      ).then((res) => {
        if(this.type_fw == "1") {
          newHref = this.$router.resolve({
            path: '/AddMuban'
          }) 
          this.showChosDept = false;
        } else {
          newHref = this.$router.resolve({
            path: '/AdminFw'
          }) 
        }        
        window.open(newHref.href, "_blank");
      })
    },
    // 页面初始化加载数据
    handleLoadData(tabindex = "1",type) {
      sessionStorage.setItem('MBLIST',JSON.stringify(this.pagination));
      this.bank_countersignature.state = this.bank_tableParams.state = witchState(this.activeName)
      if (this.bank_countersignature.state == "0") {
        this.tableCols = allData;
        this.bank_countersignature.page = this.pagination.page
        this.bank_countersignature.limit = this.pagination.limit
        this.$post
          .postData(
            "getAll",
            JSON.stringify(this.bank_countersignature),
            this.$businessCode.fwgl1
          )
          .then(res => {
            console.log(res);
            this.tableData = (res.data && res.data.rows) || [];
             this.bank_tableParams.totalCount = 0
            this.pagination.total = (res.data && res.data.total) || 0;
          });
      } else {
        if(type){
          this.bank_tableParams.totalCount = this.bank_tableParams.totalCount!=0?this.bank_tableParams.totalCount:0
        }else{
          this.bank_tableParams.totalCount = 0
        }
        this.bank_tableParams.page = this.pagination.page
        this.bank_tableParams.limit = this.pagination.limit
        this.$post
          .postData(
            "getWFTask",
            JSON.stringify(this.bank_tableParams),
            this.$businessCode.ggfwgl1
          )
          .then(res => {
            console.log(res);
            this.tableData = (res.data && res.data.rows) || [];
            this.pagination.total = res.data.total;
            this.bank_tableParams.totalCount =
              (res.data && res.data.total) || 0;
          });
      }
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange(events) {
      console.log(this.ruleForm.endTime);
    },
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      sessionStorage.setItem('MBLISTtab',tab.name); // 页码修改0823
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.bank_tableParams.state = tab.index;
      this.bank_tableParams.page = 1;
      this.pagination.page = 1;
      if(tab.index==0){
        this.tableCols = allData;
      }else{
        this.tableCols = otherData;
      }
      this.handleLoadData(tab.index);
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData(this.bank_tableParams.state,true)
    },

    handleSizeChange(val) {
      this.pagination.limit = val
      this.tableData = []
      this.handleLoadData(this.bank_tableParams.state,true)
    },
    cellClick(row, column, cell, event) {
      let states =  this.bank_tableParams.state;
      if( row.flow_state == "已办" ){
        if( row.CURRENT_USER == JSON.parse(localStorage.getItem("userInfo")).humanName ){
           states = 2;
        }
         
          if( row.cur_node_name == "处理完毕【办结】" ){
            states = 3;
          }
      }else if( row.flow_state == "待办" ){
          states = 1;
      }
      // this.$router.push({
      //   // path: "/countersignend",
      //   path: "/bankDispach",
      //   targ: '_blank',
      //   query: {
      //     id: row.id
      //   }
      // });
      let path='';
      if(row.FANWEN=='1'){
        path='/adminFw';
      }else{
        path='/detailFw';
      }
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: row.ID,
          state:states,
          readFlag: row.READFLAG
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm(formName) {
      /*this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = {};
    }
  }
};
</script>

<style lang="less" scoped>
/deep/
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 10px 20px 0 0 !important;
  position: relative;
  border: 1px solid #f0f0f0;
  margin: 0 !important;
}
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
/deep/ .el-tabs__header {
  margin: 0 0 7px !important;
}
.mtJ20 {
  margin-top: -20px!important;
  .mt20end {
    margin-top: 20px;
    .sysTirp {
      margin-left: 20px;
      font-size: 12px;
      color: red;
    }
  }
}
.search_form label {
  width: 80px;
}
</style>
