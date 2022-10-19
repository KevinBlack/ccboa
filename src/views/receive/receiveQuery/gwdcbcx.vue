<template>
  <div>
    <el-row class="mtJ20">
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select
                  v-model="choseYear"
                  @change="selectYear"
                  placeholder="近两年"
                  style="width: 100%;"
                >
                  <el-option value label="近两年"></el-option>
                  <el-option
                    v-for="yearItem in yearList"
                    :key="yearItem"
                    :label="yearItem"
                    :value="yearItem"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收文日期">
                <div class="block">
                  <el-date-picker
                    @change="receiveTimeChange"
                    v-model="receiveTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    style="max-width:300px;"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="收文字号" prop="documentCode">
                <el-input v-model="ruleForm.documentCode" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="text-align: center;margin-bottom: 10px;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="down=!down">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down">
            <el-row>
              <el-col :span="8">
                <el-form-item label="督办日期">
                  <div class="block">
                    <el-date-picker
                      @change="superviseSTimeChange"
                      v-model="superviseSTime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
                      style="max-width:300px;"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="督办人" prop="superviserName">
                  <el-input v-model="ruleForm.superviserName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="来文单位" prop="sendOrgName">
                  <el-input v-model="ruleForm.sendOrgName" placeholder="请选择或输入">
                    <el-button slot="append" @click="getTreeData('lai')" icon="el-icon-plus"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="承办部门" prop="undertakeDeptName">
                  <el-input
                    v-model="ruleForm.undertakeDeptName"
                    readonly="readonly"
                    placeholder="请选择"
                  >
                    <el-button slot="append" @click="getTreeData('chen')" icon="el-icon-plus"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="公文状态">
                <el-radio-group v-model="ruleForm.curNodeCode">
                  <el-radio label>全部</el-radio>
                  <el-radio label="0">流转</el-radio>
                  <el-radio label="800">办结</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="收文形式">
                <el-radio-group v-model="ruleForm.receiveType">
                  <el-radio label>全部</el-radio>
                  <el-radio label="电子收文"></el-radio>
                  <el-radio label="实物收文"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="表单类型">
                <el-radio-group v-model="ruleForm.formType">
                  <el-radio label>全部</el-radio>
                  <el-radio label="0">协办单</el-radio>
                  <el-radio label="1">非协办单</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <!-- <el-row>
              <el-form-item label="督办事项">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio label="请示事项"></el-radio>
                  <el-radio label="其他事项"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>-->

            <el-row>
              <el-form-item label="文种类型">
                <el-radio-group v-model="ruleForm.documentClass">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="请示"></el-radio>
                  <el-radio label="决定"></el-radio>
                  <el-radio label="公告"></el-radio>
                  <el-radio label="通知"></el-radio>
                  <el-radio label="批复"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <el-col class="down" v-if="down">
            <el-button type="info" size="small" @click="down=!down">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col>
        </el-form>
      </el-col>
      <div style="text-align: right;">
        <el-button style="text-align:right;" size="small" @click="exportExc" v-preventClick>导 出</el-button>
      </div>
      <el-col style="margin: 30px 0;" :class="{'is3':!down}">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="ruleForm"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import treeCofig from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
const finshData = [
  { label: "督办日期", prop: "superviseDate", align: "center",width:'90',formatter:(row)=>{
      return row.superviseDate && row.superviseDate.substr(0,10) || ''
    } },
  /*{ label: "归档日期", prop: "finishTime", align: "center",width:'150' },*/
  { label: "收文字号", prop: "documentCode", align: "center",width:'200' },
  { label: "标题", prop: "title", align: "left",minwidth:'150' },
  { label: "承办部门", prop: "undertakeDeptName", align: "center",width:'120' },
  { label: "承办部门办理情况", prop: "undertakeOrgOpinion", align: "center",width:'120' },
  { label: "办结情况", prop: "handleTerminateOpinion", align: "center",width:'100' },
  { label: "当前环节", prop: "curNodeName", align: "center",width:'120' },
  { label: "当前处理人", prop: "curUser", align: "center",width:'80' },
  { label: "办理时限", prop: "limitDate", align: "center",width:'90',formatter:(row)=>{
      return row.limitDate && row.limitDate.substr(0,10)|| ''
    }  },
  { label: "办理时长", prop: "disposeDuration", align: "center" ,width:'70'},
  { label: "办理进度", prop: "progress", align: "center",width:'70' }
];
const year = new Date().getFullYear();

export default {
  name: "Swcx",
  components: {
    mTable,
    treeCofig
  },
  data() {
    return {
      choseYear:"",
      yearList:[],
      treeTradeCode:"",
      //来文单位
      sendOrgIdData: {
        function: "unitTreeAll",
        openSup: true,
        openCurr: true,
        treeCofig: true,
        openEqual: true,
        openSub: true
      },
      //收文单位
      receiveOrgIdData: {
        function: "unitTreeAll",
        openSub: true,
        openCurr: true
      },
      // 承办单位
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true,
        showMyDept: ""
      },
      down: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      ruleForm: {
        function: "selectSuperviseByParam",
        state: 1,
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0,
        receiveStartTime: "", //收文起始日期
        receiveEndTime: "", //收文结束日期
        title: "", //标题
        documentCode: "〔"+year+"〕", //收文字号：
        superviseStartTime: "", //督办起始日期：
        superviseEndTime: "", //督办结束日期：
        superviserName: "", //督办人：
        curNodeCode: "", //  0-流转1-办结 公文状态：
        receiveType: "", //  电子收文，实物收文收文形式：
        formType: "", // 表单类型 0-协办  1-非协办
        sendType: "", //收文类型：
        documentClass: "", //文种：
        sendOrgName: "", //来文单位：
        receiveOrgName: "", //收文单位：
        undertakeDeptName: "" //承办部门：
      },
      receiveTime: "", //收文日期值
      superviseSTime: "", //督办日期值
      tableLoading: false,
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: finshData,

      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      //tree
      treeData: [],
      singelCheckF: true,
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      shouCheckData: [], //收文选中数据
      laiCheckData: [], //来文选中数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      seletOptionsData: [], //弹窗下拉框数据
      dialogState: false,
      dialogTit: "", // 弹框标题
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      loadingTree: false
    };
  },
  methods: {
    selectYear(val) {
      this.choseYear = val;      
      if (val != '') {
        this.ruleForm.documentCode = "〔"+this.choseYear+"〕"
      }else{
        this.ruleForm.documentCode = "〔"+year+"〕"
      }  
      // this.$router.push({
      //   query: {
      //     choseYear: val
      //   }
      // })
    },
    // 表格请求数据
    initData() {
      this.$router.push({
        query: {
          choseYear: this.choseYear
        }
      })
      sessionStorage.setItem('page_sw',JSON.stringify(this.ruleForm));
      this.$post
        .postData(
          "selectSuperviseByParam",
          JSON.stringify(this.ruleForm),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.data) {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请求出错",
              duration: 500
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择时间 收文
    receiveTimeChange(rangeTime) {
      if(!rangeTime||rangeTime=="null"||rangeTime=="undefined"){
        this.ruleForm.receiveStartTime = "";
        this.ruleForm.receiveEndTime = "";
        return false;
      }
      this.ruleForm.receiveStartTime = dateFormate.date(
        Date.parse(this.receiveTime[0])
      );
      this.ruleForm.receiveEndTime = dateFormate.date(
        Date.parse(this.receiveTime[1])
      );
    },
    // 选择时间 督办
    superviseSTimeChange() {

      // if(!rangeTime||rangeTime=="null"||rangeTime=="undefined"){
      //    this.ruleForm.superviseStartTime = "";
      //   this.ruleForm.superviseEndTime = "";
      //   return false;
      // }

      this.ruleForm.superviseStartTime = dateFormate.date(
        Date.parse(this.superviseSTime[0])
      );
      this.ruleForm.superviseEndTime = dateFormate.date(
        Date.parse(this.superviseSTime[1])
      );
    },

    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.ruleForm.page = this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    // 点击切换页数按钮切换
    handleSizeChange(val) {
      this.ruleForm.limit = this.pagination.limit = val;
      this.ruleForm.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
    },
    handleTabsClick(tab, event) {
      this.tableLoading = true;
      if (tab.index == "3") {
        this.tableCols = finshData;
        this.isEnd = true;
      } else {
        this.tableCols = otherData;
        this.isEnd = false;
      }
      this.tableLoading = false;
    },
    cellClick(row, column, cell, event) {
      let state,path='';
      let isDb = false;
      let unitinfo = JSON.parse(localStorage.getItem("unitInfo"))
      unitinfo.map((item)=>{
        if(row.curUserId == item.currUnitId){
          return isDb = true
        }
      })
      if(row.receiveType == "电子收文"){
        state = (row.curNodeCode == '800' || row.curUserId == '') ? 3 :(isDb?1:2)
        path = (row.curNodeCode == '800' || row.curUserId == '') ? '/receiveDzBjYb' :(isDb?'/receiveElectronDispatch':'/receiveDzBjYb')
      }
      if(row.receiveType == "实物收文"){
        state = (row.curNodeCode == '800' || row.curUserId == '') ? 3 :(isDb?1:2)
        path = (row.curNodeCode == '800' || row.curUserId == '') ? '/receiveBjYb' :(isDb?'/receiveDispatch':'/receiveBjYb')
      }
      if(row.receiveType == "协办"){
        state = (row.curNodeCode == '800' || row.curUserId == '') ? 3 :(isDb?1:2)
        path = (row.curNodeCode == '800' || row.curUserId == '') ? '/receiveSponsorReadonly' :(isDb?'/receiveSponsorDetail':'/receiveSponsorReadonly')
      }
      if(row.receiveType == "承办"){
        state = (row.curNodeCode == '800' || row.curUserId == '') ? 3 :(isDb?1:2)
        path = (row.curNodeCode == '800' || row.curUserId == '') ? '/shiwucbDetailReadonly' :(isDb?'/shiwucbDetail':'/shiwucbDetailReadonly')
      }
      const routeData = this.$router.resolve({
        path:path,
        query: {
          id: row.id,
          receiveType: row.receiveType,
          state:state,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm() {
      this.ruleForm.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
    },
    resetForm(formName) {
      (this.choseYear = '')
      (this.ruleForm.function = "selectSuperviseByParam"),
        (this.ruleForm.state = 1),
        (this.ruleForm.page = 1), //当前页数
        (this.ruleForm.limit = this.pagination.limit =  20), //每页条数
        (this.ruleForm.totalCount = 0),
        (this.ruleForm.receiveStartTime = ""), //收文起始日期
        (this.ruleForm.receiveEndTime = ""), //收文结束日期
        (this.ruleForm.title = ""), //标题
        (this.ruleForm.documentCode = "〔"+year+"〕"), //收文字号：
        (this.ruleForm.superviseStartTime = ""), //督办起始日期：
        (this.ruleForm.superviseEndTime = ""), //督办结束日期：
        (this.ruleForm.superviserName = ""), //督办人：
        (this.ruleForm.curNodeCode = ""), //  0-流转1-办结 公文状态：
        (this.ruleForm.receiveType = ""), //  电子收文，实物收文收文形式：
        (this.ruleForm.formType = ""), // 表单类型 0-协办  1-非协办
        (this.ruleForm.sendType = ""), //收文类型：
        (this.ruleForm.documentClass = ""), //文种：
        (this.ruleForm.sendOrgName = ""), //来文单位：
        (this.ruleForm.receiveOrgName = ""), //收文单位：
        (this.ruleForm.undertakeDeptName = ""); //承办部门：
      (this.ruleForm.sendOrgId = ""); //   制发单位id
      (this.ruleForm.receiveOrgId = ""); //   来文单位id
      (this.ruleForm.undertakeDeptId = ""); //   部门id
      this.receiveTime="", //收文日期值
        this.superviseSTime="" //督办日期值
        this.routeYear();
        this.tableData = [];
    },
    // 单位选择
    getTreeData(n) {
      let obj = {};
      let name = "";
      this.offenUse = false;
      this.dialogTypeNow = n;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = true;
      this.treeData = [];
      //手动清空时处理
      switch (n) {
        case "chen":
          name = "承办部门";
          obj = Object.assign(obj, this.bank_mainXiao);
          clearName = "undertakeOrganName";
          break;
        case "shou":
          obj = Object.assign(obj, this.receiveOrgIdData);
          name = "收文单位";
          clearName = "receiveOrgName";
          break;
        case "lai":
          obj = Object.assign(obj, this.sendOrgIdData);
          name = "来文单位";
          clearName = "sendOrgName";
          break;
      }
      //this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      if(n!='chen'){
        this.$post
          .postData(
            "getForwordOrgDept",
            JSON.stringify(obj),
            this.$businessCode.swglgg
          )
          .then(res => {
            that.treeData = (res && res.data) || [];
          });
      }else{
        this.$post
          .postData(
            "selUnitTreeByHQ",
            JSON.stringify(obj),
            this.$businessCode.swglgg
          )
          .then(res => {
            that.treeData = (res && res.data) || [];
          });
      }
    },

    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.ruleForm[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeOrganName") {
          this.ruleForm.undertakeOrganId = "";
          this.chenCheckData = [];
        }
        if (name === "sendOrgName") {
          this.ruleForm.sendOrgId = "";
          this.shouCheckData = [];
        }
        if (name === "receiveOrgName") {
          this.ruleForm.receiveOrgId = "";
          this.laiCheckData = [];
        }
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
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
        }

        switch (dtype) {
          case "chen":
            this.ruleForm.undertakeDeptName = names.join("");
            this.ruleForm.undertakeDeptId = ids.join("");
            this.chenCheckData = this.checkData;
            break;
          case "shou":
            this.ruleForm.receiveOrgName = names.join("");
            this.ruleForm.receiveOrgId = ids.join("");
            this.shouCheckData = this.checkData;
            break;
          case "lai":
            this.ruleForm.sendOrgName = names.join("");
            this.ruleForm.sendOrgId = ids.join("");
            this.laiCheckData = this.checkData;
            break;
        }
      }

      this.dialogState = !this.dialogState;
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },

    //弹窗回显数据
    backDialogData(type) {
      let newA = [];
      switch (type) {
        case "chen":
          this.checkIds = new Array(this.ruleForm.undertakeOrganId);
          this.checkData=this.chenCheckData;
          break;
        case "shou":
          this.checkIds = new Array(this.ruleForm.receiveOrgId);
          this.checkData=this.shouCheckData;
          break;
        case "lai":
          this.checkIds = new Array(this.ruleForm.sendOrgId);
          this.checkData=this.laiCheckData;
          break;
      }
    },
    //导出
    exportExc(){
      exportTable.exportExcel("公文督查办查询统计表",".el-table");
    },
    routeYear(){
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
    }
  },
  created() {
    this.$post
        .postData(
          "selTableYear",
          JSON.stringify({ function: "selTableYear" }),
          this.$businessCode.swgl
        ).then(res => {
          if(res){
            this.yearList = res.data
          }
      })
    this.treeTradeCode = this.$businessCode.swglgg;  //人员树交易线
    if(sessionStorage.getItem('page_sw')){
      this.ruleForm = Object.assign(this.ruleForm,JSON.parse(sessionStorage.getItem('page_sw')));
      if(this.ruleForm.receiveStartTime&&this.ruleForm.receiveEndTime){
        this.receiveTime=[this.ruleForm.receiveStartTime,this.ruleForm.receiveEndTime]
      }
      if(this.ruleForm.superviseStartTime&&this.ruleForm.superviseEndTime){
        this.superviseSTime=[this.ruleForm.superviseStartTime,this.ruleForm.superviseEndTime]
      }
      this.pagination={
        page: this.ruleForm.page, //第几页
        total: 0, //共有条数
        limit: this.ruleForm.limit //每页条数
      };
      this.initData();
    }
    // this.initData();
  }
};
</script>

<style lang="less" scoped>
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
  padding: 20px 0 0 0;
  position: relative;
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
  bottom: -64px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}

.arrowup {
  text-align: center;
}
.mtJ20>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>
