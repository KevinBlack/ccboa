<template>
  <div class="dispatchcswhlshwh" style="min-height:500px;">
    <el-row style="margin:10px 0 5px 0;">
      <el-col :span="8">
          <el-button type="text" style="color:#000;float:left;width:20%;font-size:13px;">机构名称</el-button>
          <select-org-or-dept @select="selectOrg" style="width:80%;float:left" :disabled="!isGly">
              <el-input
                type="text"
                readonly="readonly"
                placeholder="请选择"
                v-model="unitName"
                suffix-icon="el-icon-arrow-down"
              />
          </select-org-or-dept>
        </el-col>
        <el-col :span="6" style="margin-left: 20px;">
          <el-button type="primary" size="small" @click="initData()">查询</el-button>
        </el-col>
      <el-col :span="4" style="margin-bottom: 10px;" v-show="this.hasTable">
        <el-button type="primary" size="small" @click="handleAddData">新增公文种类配置</el-button>
      </el-col>
      <el-col :span="4"> 
        <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
      </el-col>
    </el-row>
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      @select="handleSelectionChange"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
      v-loading="tableLoading"
      :default-sort="sortDate"
    ></m-table>

    <el-dialog :visible.sync="dialogVisible" 
    v-dialogDrag
    class="newClassForDialog"
    :modal-append-to-body="false" title="专项督办配置">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo_ruleForm"
      >
       <div style="height:500px;">
          <el-scrollbar style="height:100%;">
        <el-row>
         
          <el-col>
            <h3 class="titleGroup">专项督办配置</h3>
          </el-col>
        <el-col>
            <el-form-item label="机构名称">
                <el-input
                v-model="ruleForm.orgName"
                readonly
                placeholder="请选择机构名称"
                style="width: 100%;" 
                >
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="is-required" label="办理期限" prop="term">
              <el-input v-model="ruleForm.term" @input="changeContactPhone()">
            <template slot="append" style="width:10%">{{autoTime}}</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="is-required" label="办理期限设置" prop="handleTime" ref="handleTime">
              <el-radio-group v-model="ruleForm.handleTime" @change="autoTimeChange()">
                <el-radio :label="1" class="alternative">以工作日设置办理期限</el-radio>
                <el-radio :label="0" class="alternative">以自然日设置办理期限</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item class="is-required" label="提醒时间设置" prop="remindTime">
              <el-input v-model="ruleForm.remindTime" oninput="value=value.replace(/[^\d\*\ ]/g,'')">
                <template slot="prepend" style="width:10%">系统在任务截止时间前</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" label-width="0px">
                    <el-select v-model="ruleForm.dayHours" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="times in dayHoursList"
                        :key="times.label"
                        :label="times.label"
                        :value="times.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
          </el-col>
          <el-col :span="2"  style="white-space: nowrap;">
            <el-form-item label="对承办人发提醒通知"></el-form-item>  
          </el-col>
          <el-col>
            <el-form-item class="is-required" label="时间类型" prop="handleDays" ref="handleDays">
              <el-radio v-model="ruleForm.handleDays" :label="1" class="alternative">以工作日设置提醒时间</el-radio>
              <el-radio v-model="ruleForm.handleDays" :label="0" class="alternative">以自然日设置提醒时间</el-radio>
            </el-form-item>
          </el-col>
          <el-col >
            <el-form-item label="紧急程度" class="is-required"  props="degree" ref="degree">
              <el-input
                v-model="ruleForm.degree"
                placeholder="请输入"
                style="width:100%"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="is-required" label="立项依据" prop="basis">
              <el-input v-model="ruleForm.basis"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="is-required" label="协办是否锁定为主文档" prop="isLockMain" ref="isLockMain">
              <el-radio-group v-model="ruleForm.isLockMain">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="is-required" label="是否启用敏感信息防护" prop="isSenProtect" ref="isSenProtect">
              <el-radio-group v-model="ruleForm.isSenProtect">
                <el-radio  :label="1">是</el-radio>
                <el-radio  :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="is-required" label="代字" prop="number">
              <el-input v-model="ruleForm.number" @input="noCh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item class="is-required" label="文号生成类型">
              <el-radio-group v-model="ruleForm.numProduceType">
                <el-radio :label="1">自动生成</el-radio>
                <el-radio :label="0">手动生成</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-scrollbar>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hadleCanle">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  <treeCofig
        :treeData="treeData"
        :canTab="canTab"
        :hasRadio="hasRadio"
        :dialogType="dialogType"
        :dialogTit="dialogTit"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        :offenUse="offenUse"
        :seletOptionsData="seletOptionsData"
      ></treeCofig>

  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from "components/tree/tree-fawen";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const tableCol = [
  { label: "机构名称", prop: "orgName", align: "center" }, 
  { label: "立项依据", prop: "basis", align: "center" },
  { label: "紧急程度", prop: "degree", align: "center" },
  { label: "办理期限", prop: "term", align: "center" },
];

export default {
  name: 'Fwcspz',
  components: { mTable, treeCofig,selectOrgOrDept},
  data () {
    return {
      isGly:false,
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      copyRule:{},
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 10 //每页条数
      },
      bank_add:{
        function:"selectDicById",
        unitId: "",
        state:1,
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount:0
      },
      hasTable:true,
      bank_countersignature: {
        limit: 10,
        page:1,
        function: "selectDicByPage",
        state: 1,
        manager:"",
        unitId: ""
      },
      autoTime:"",
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      isStandardFile:"",
      checkIds: [], //列表
      orgType:'',
      checkData: [], //选中数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      benCheckData: [], //本行选中数据
      SemergencyLevel: [],//紧急程度
      SsecretFlagType: [],//秘密标志
      SysecretFlagType: [],//商业密级
      SybzsecretFlagType: [],//秘密标志
      jmtjFlagType:[],//解密条件
      dayHoursList:[
        {label:'天'},
        {label:'小时'}
      ],
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      baoWenZiDuan: "A08461302",
      appendWriteDialog: true,
      dspcPrmShow: false,
      tableData: [],
      tableCols: tableCol,
      deleteIds: '',
      tableLoading: false,
      sortDate: [{ prot: "date", order: "descnding" }],
      
      referForm: {
        function: 'selectXDHJyPage'
      },
       //主送、抄送
      bank_main: {
        function: "getTcPriDeliveryDic",
        organizationId: "root"
      },
      ruleForm: {
        secretLimitType:"",//秘密期限类型
        numProduceType:1,
        term:"",//办理期限
        workTime:"",//工作日期
        orgName:"",//机构名称
        unitId:"",//机构id
        handleTime:"",//办理期限设置  :1: 以工作日设置办理期限 ,0:自然日设置办理期限
        remindTime:"",//提醒时间设置
        dayHours:"",//天或小时  1:天，0：小时
        handleDays:"",//时间类型 1：以工作日设置提醒时间 0：以自然日设置提醒时间
        basis:"",//立项依据
        degree:"",//紧急程度
        number:"",//编号
        secretFlag:"",//秘密标志
        tradeSecret:"",//商业密级
        secretType:"",
        secretFlagContent:"",//解密条件
        isLockMain:"",//协办是否锁定为主文档
        handleDays:"",//办理天数
        isSenProtect:"",//是否启用敏感信息防护功能
      },
      // 强制性要求
      rules: {
       
      },
      haveData: true
    }
  },
  methods: {
     // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      console.log(org, this.unitName , this.unitId);
    },
    //el-form-item is-required el-form-item--small  ml-24px  el-form-item__label  pl40px
    // 判断登陆人是否业务管理员或系统管理员 .el-input width: 95%;
    addDrafOrgNm() {
      let manager = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.draforgnmPeople = manager.filter(item => {
        return (
          item.codeType === "manager_type" && item.dicCode === "sys_manager"
        );
      });
      if (this.draforgnmPeople.length !== 0) {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = true;
        this.identity = false;
      }
      console.log(this.unitName,this.unitId)
    },
    noCh(){
      this.ruleForm.number = this.ruleForm.number.replace(/；/g,"");
    },
    initData() {
      this.bank_countersignature.unitName = this.unitName
      this.bank_countersignature.unitId = this.unitId
      this.$post
        .postData(
          "selectDicByPage",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.zxdb
        )
        .then(res => {
          if(res.data.rows.length>0){this.hasTable = false;}else{
            this.hasTable = true
          }
          // if(res.data.rows[0]){
          //   res.data.rows[0].orgName = JSON.parse(localStorage.getItem('userInfo')).shortUnitName;
          // }
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectType(){},
    bankmain(n) {
      let name = "";
      if(!this.ruleForm.signDepartment){
        this.checkIds = [];
        this.huiCheckData = [];
      }
      switch (n) {
        case "zhusong":
          name = "主送";
          break;
        case "chao":
          name = "抄送";
          break;
        case "hui":
          name = "会签";
          break;
        case "ben":
          name = "本行发送";
          break;
        case "dosend":
          name = "完成并发送";
          break;
        case "other":
          name = "";
          break
      }
      this.dialogTit = name;
      this.canTab = true;
      this.treeData = [];
      this.dialogType = n;
      if (n === "hui") {
        this.hasRadio = false;
        this.canTab = false;
        this.singelCheckF = false;
      }
      this.showCompDialog();
      this.$post
        .postData(
          "getTcPriDeliveryDic",
          JSON.stringify(this.bank_main),
          this.baoWenZiDuan
        )
        .then(res => {
          console.log(JSON.stringify(res.data));
          this.treeData = (res && res.data) || [];
          if (this.treeData.length) {
            this.treeData.forEach(item => {
              item.content = JSON.parse(item.content);
              if (n === "hui") {
                item.text = item.typeName;
              }
            });
          }
        });
    },
    handleCurrentChange(val){
      this.pagination.pageNum = val;
    },
    handleAddData () {
      this.bank_add.unitId = this.unitId;
      this.$post
      .postData(
        "selectDicById",
          JSON.stringify(this.bank_add),
        this.$businessCode.zxdb
      ).then(res=>{
        this.ruleForm = Object.assign(this.ruleForm,res.data);
        this.ruleForm.orgName = this.unitName;
        this.ruleForm.unitId = this.unitId;
        console.log(1,res)
      }).catch(err=>{
        console.log(2,err)
      })
      this.dialogVisible = true
    },
    hadleCanle(){
      //this.ruleForm = Object(this.ruleForm,this.copyRule)
      this.dialogVisible = false;
      this.initData();
    },
    handleSave(){
      if(!this.ruleForm.term){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入办理期限",
          duration: 1000
        });
        return
      }
      if(this.ruleForm.handleTime != '1'&&this.ruleForm.handleTime != '0'){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择办理期限设置",
          duration: 1000
        });
        return
      }
      if(this.ruleForm.remindTime == ''){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入提醒时间设置",
          duration: 1000
        });
        return
      }
      if(this.ruleForm.handleDays != '1'&&this.ruleForm.handleDays != '0'){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择时间类型",
          duration: 1000
        });
        return
      }
      if(!this.ruleForm.degree){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入紧急程度",
          duration: 1000
        });
        return
      }
      if(!this.ruleForm.basis){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入立项依据",
          duration: 1000
        });
        return
      }
      if(this.ruleForm.isLockMain != '1'&&this.ruleForm.isLockMain != '0'){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择协办是否锁定为主文档",
          duration: 1000
        });
        return
      }
      if(this.ruleForm.isSenProtect != '1'&&this.ruleForm.isSenProtect != '0'){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择是否启用敏感信息防护",
          duration: 1000
        });
        return
      }
      if(!this.ruleForm.number){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入代字",
          duration: 1000
        });
        return
      }

      this.ruleForm = Object.assign(this.ruleForm, {
        function: 'saveOrUpdateDic',
        manager:"",
        unitId:this.unitId
      })
      this.$post
        .postData('saveOrUpdateDic', JSON.stringify(this.ruleForm), this.$businessCode.zxdb)
        .then(res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.dialogVisible = false;
          for (const key in this.ruleForm) {
            delete this.ruleForm[key]
          }
          this.initData();
        })
    },
    changeContactPhone(){
      this.ruleForm.term = this.ruleForm.term.replace(/[^\\,\d\*\ ]/g,'');
      this.$forceUpdate();
    },
    cellClick(row, column, cell, event) {
      this.dialogVisible = true;
      this.copyRule = Object.assign(this.copyRule,this.ruleForm)
      row.isLockMain =parseInt(row.isLockMain);
      row.isSenProtect = parseInt(row.isSenProtect);
      row.handleTime = parseInt(row.handleTime);
      row.handleDays = parseInt(row.handleDays);
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: 'saveOrUpdateXDHJ'
      })
      this.autoTimeChange();
      this.$forceUpdate()
    },
    handleSelectionChange (val) {
      this.checkedArr = val;
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id);
      }
      this.deleteIds = idsArr.join(";");
    },
    handleBatchDelete () {
      if (this.deleteIds === "") {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据!'
        })
        return;
      }else{
        this.$post
        .postData(
          '',
          JSON.stringify({
            function: "deleteDicById",
            id: this.deleteIds,
            manager:"",
          }),
          this.$businessCode.zxdb
        )
        .then(res => {
          this.$message({
            type:"success",
            message:"删除成功"
          })
          setTimeout(()=>{
            window.location.reload();
          },1000)
        })
        .catch(err => {
          console.log('b',err);
        });
        this.initData();
      }
    },
    autoTimeChange(){
      this.autoTime=this.ruleForm.handleTime==1?'工作日':'自然日';
    },
  },
  created () {
    this.isGly = isGlyId();
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf:"1",
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.initData();
    })
  }
}
</script>

<style lang="less" scoped>
.titleGroup {
  color: #409EFF;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
}
/deep/.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
  line-height: 25px;
}
/deep/ .dispatchcswhlshwh{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
/deep/ .el-card__body{
  min-height: 500px !important;
}
</style>