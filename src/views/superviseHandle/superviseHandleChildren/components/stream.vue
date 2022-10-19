<template>
  <div class="dispatchcswhlshwh" style="min-height:500px;">
    <el-row>
         <el-col :span="6">
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
        <el-col :span="6" >
          <el-button type="text" style="color:#000;float:left;width:20%;font-size:13px;">年度</el-button>
          <div class="block">
            <el-date-picker
              v-model="year"
              :clearable="false"
              type="year"
              placeholder="选择年"
            ></el-date-picker>
          </div>
        </el-col>
      <el-col :span="2" style="margin-bottom: 10px;text-align: right;">
        <el-button type="primary" size="small" @click="initData('2')">查询</el-button>
      </el-col>
      <el-col :span="8" style="margin-bottom: 10px;text-align: right;">
        <el-button type="primary" size="small" @click="handleAddData">新增流水号配置</el-button>
        <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
      </el-col>
    </el-row>
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
      @select="handleSelectionChange"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      v-loading="tableLoading"
    ></m-table>

    <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible" :modal-append-to-body="false" title="流水号配置">
      <el-form
        :model="fromdata"
        ref="fromdata"
        label-width="160px"
        class="demo_ruleForm"
      >
       <div style="height:500px;">
          <el-scrollbar style="height:100%;">
        <el-row>

          <el-col>
            <h3 class="titleGroup">流水号配置</h3>
          </el-col>
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">参数间以英文半角“;”进行分隔</p>
          </div>
        <el-col>
            <el-form-item label="机构名称">
                <el-input
                  v-model="fromdata.orgName"
                  placeholder="请输入机构名称"
                  style="width: 100%;"
                  readonly
                >

                </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="代字" class="is-required" prop="redHead" ref="redHead">
                 <el-select v-model="fromdata.redHead" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="item in sendType"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-form-item label="文号生成类型" prop="produceType" ref="produceType">
              <el-radio-group v-model="fromdata.produceType">
                <el-radio  :label="1" class="alternative">自动生成</el-radio>
                <el-radio :label="0" class="alternative">手动生成</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item class="is-required" label="年度" prop="year">
              <el-input v-model="fromdata.year" @input="changeContactPhone('year')">
                <!-- <template slot="prepend">系统在任务截止时间前</template> -->
              </el-input>
            </el-form-item>
          </el-col>

          <el-col >
            <el-form-item label="起始文号" class="is-required" props="startNum" ref="startNum">
              <el-input
                v-model="fromdata.startNum"
                placeholder="请输入"
                @input="changeContactPhone('startNum')"
                style="width:100%"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col >
            <el-form-item label="当前最大文号" class="is-required" props="currMaxNum" ref="currMaxNum">
              <el-input
                v-model="fromdata.currentMaxNum"
                @input="changeContactPhone('currentMaxNum')"
                placeholder="请输入"
                style="width:100%"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="空缺文号">
              <el-input
                v-model="fromdata.reservedNum"
                @input="changeContactPhone('reservedNum')"
                @change="undateDate($event)"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-scrollbar>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handlequxiao">取 消</el-button>
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
  { label: "代字", prop: "redHead", align: "center" },
  { label: "年度", prop: "year", align: "center" },
  { label: "起始文号", prop: "startNum", align: "center" },
  { label: "当前最大文号", prop: "currentMaxNum", align: "center" },
];

export default {
  name: 'Fwcspz',
  components: { mTable, treeCofig,selectOrgOrDept},
  data () {
    return {
      year:new Date(),
      isGly:false,
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      copyRule:{},
      bank_add:{
        function:"selectNumById",
        state:1,
        unitId: ""
      },
       bank_countersignature: {
        function: "selectNumByPage",
        state: 1,
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount:0,
        unitId: "",
        year:"",
      },
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 10 //每页条数
      },
      rules: {

      },
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
      fromdata: {
        unitOrg:"",//机构名称
        orgName:"",//文号生成类型：0：自动生成  1：手动生成
        //produceType:"",//工作日期
        year:"",//年度
        startNum:"",//起始文号
        currentMaxNum:"",//当前最大文号
        remindTime:"",//提醒时间设置
        documentCode:"",//代字
        sendType:"",
        reservedNum:"",
      },
      sendType:"",
      haveData: true
    }
  },
  methods: {
    undateDate(e){
      //oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"
      this.$forceUpdate();
    },
     // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      console.log(org, this.unitName , this.unitId);
    },
    // 判断登陆人是否业务管理员或系统管理员
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
    initData(type) {
      this.bank_countersignature.year = this.year.getFullYear()
      this.bank_countersignature.unitName = this.unitName
      this.bank_countersignature.unitId = this.unitId
      this.$post
        .postData(
          "selectNumByPage",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.zxdb
        )
        .then(res => {
          console.log(res.data.rows)
          this.bank_countersignature.totalCount = res.data.total||0;
          this.pagination.total = res.data.total||0;
          this.tableData = res.data.rows||[];
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeContactPhone(type){
      if(type=="year"){
        this.fromdata.year = this.fromdata.year.replace(/[^\\,\d\*\ ]/g,'');
      }else if(type=="startNum"){
        this.fromdata.startNum = this.fromdata.startNum.replace(/[^\\,\d\*\ ]/g,'');
      }else if(type=="currentMaxNum"){
        this.fromdata.currentMaxNum = this.fromdata.currentMaxNum.replace(/[^\\,\d\*\ ]/g,'');
      }else if(type=="reservedNum"){
        this.fromdata.reservedNum = this.fromdata.reservedNum.replace(/[^\;\d\*\ ]/g,'');
      }
      this.$forceUpdate();
    },
    handlequxiao(){
      this.fromdata = Object.assign(this.fromdata,this.copyRule)
      this.dialogVisible = false;
    },
    handleCurrentChange(val){
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData('1');
    },
    handleSizeChange(val) {
      this.bank_countersignature.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_countersignature.page = 1;
      this.tableData = [];
      this.initData('1');
    },
    handleAddData () {
      this.fromdata = {
        unitOrg:"",//机构名称
        orgName:this.unitName,
        //produceType:"",//工作日期
        year:"",//年度
        unitId:this.unitId,
        startNum:"",//起始文号
        currentMaxNum:"",//当前最大文号
        remindTime:"",//提醒时间设置
        documentCode:"",//代字
        sendType:"",
        year:"",
        reservedNum:"",
      };
      this.bank_add.unitId = this.unitId;
      this.$post
      .postData(
        "selectNumById",
          JSON.stringify({
            function:"selectNumById",
            state:1,
            unitId:this.unitId
          }),
          this.$businessCode.zxdb
      ).then(res=>{
        this.fromdata = Object.assign(this.fromdata,res.data);
        this.fromdata.sendType =this.sendType= JSON.parse(res.data.sendType);
        if(!this.fromdata.year){
          let a = new Date;
          this.fromdata.year = a.getFullYear()
        }
        this.$forceUpdate();

      }).catch(err=>{
        console.log(2,err)
      })
      this.dialogVisible = true
    },
    handleSave () {
      if(!this.fromdata.redHead){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择代字",
          duration: 1000
        });
        return
      }
      if(!this.fromdata.year){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入年度",
          duration: 1000
        });
        return
      }
      if((!this.fromdata.startNum)&&this.fromdata.startNum!=0){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入起始文号",
          duration: 1000
        });
        return
      }
      if(!this.fromdata.currentMaxNum){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入当前最大文号",
          duration: 1000
        });
        return
      }
      if(parseInt(this.fromdata.currentMaxNum)>100000){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "最大文号不能大于五位数",
          duration: 1000
        });
        return
      }
      this.fromdata = Object.assign(this.fromdata, {
        function: 'doSaveByNum',
        unitId:this.unitId,
        manager:""
      })
     let parseObj = this.fromdata;
      delete parseObj.sendType
      this.$post
        .postData('doSaveByNum', JSON.stringify(this.fromdata), this.$businessCode.zxdb)
        .then(res => {
          if(res.success){
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            for (const key in this.fromdata) {
              delete this.fromdata[key]
            }
            this.dialogVisible = false;
            this.initData('1');
          }else{
            this.$message({
              type: 'error',
              message: res.message
            })
          }

          
        })
    },
    cellClick(row, column, cell, event) {
      if(!this.sendType){
        this.$post
        .postData(
          "selectNumById",
            JSON.stringify({
              function:"selectNumById",
              state:1,
              unitId:this.unitId
            }),
            this.$businessCode.zxdb
        ).then(res=>{
          this.sendType= JSON.parse(res.data.sendType);
        })
      }
      this.dialogVisible = true;
      row.isLockMain =parseInt(row.isLockMain);
      row.isSenProtect = parseInt(row.isSenProtect);
      row.handleTime = parseInt(row.handleTime);
      row.timeType = parseInt(row.timeType);
      //row.reservedNum = parseInt(row.reservedNum)||'';
      this.fromdata.sendType = this.sendType
      row.startNum = row.startNum;
      this.fromdata = row;
      this.fromdata = Object.assign(this.fromdata, {
        function: 'saveOrUpdateXDHJ'
      })
      this.copyRule = Object.assign(this.copyRule,row)
      this.$forceUpdate()
    },
    handleSelectionChange (val) {
      this.checkedArr = val;
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id);
      }
      this.deleteIds = idsArr.join(",");
    },
    handleBatchDelete () {
      debugger
      if (this.deleteIds === "") {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据!'
        })
        return;
      }else{
        this.$post
        .postData(
          'deleteByNumById',
          JSON.stringify({
            function: "deleteByNumById",
            id: this.deleteIds,
            unitId:this.unitId,
            manager:''
          }),
          this.$businessCode.zxdb
        )
        .then(res => {
          console.log('a',res)
          this.$message({
            type:"success",
            message:"删除成功"
          })
          this.initData('1');
        })
        .catch(err => {
          console.log('b',err);
        });
      }
    },
  },
  created () {
    this.bank_countersignature.year = this.year && this.year.getFullYear() || ""
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
      this.initData('1');
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
.bank_dispach_annotation {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fef7e7;
  border: 1px solid #ff6600;
  display: flex;
  font-size: 12px;
  margin: 40px 0;
  position: relative;
  .bank_dispach_annotation_current {
    padding: 0 30px 0 10px;
    span {
      color: #ff6600;
    }
  }
  .bank_article_illustrates {
    position: absolute;
    top: 3px;
    right: 10px;
  }
}
</style>
