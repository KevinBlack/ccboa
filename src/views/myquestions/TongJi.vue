<template>
  <div>
    <el-row>
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
             <el-col :span="8">
              <el-form-item label="拟稿日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange"
                    v-model="times"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    size="small"
                    type="daterange"
                    range-separator="-"
                    start-placeholde="开始月份"
                    end-placeholde="结束月份"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span = "8">
              <!-- <el-form-item label="行名" prop="queryUnit">
                <el-select @change="change($event)" v-model="ruleForm.queryUnit" style="width:100%" clearable>
                  <el-option v-for="item in bankOptions" :key="item.unitId" :value="item.unitId" :label="item.unitName"></el-option>
                </el-select>
              </el-form-item> -->
              <div class="dispatchcswhlshwh">
                  <el-form-item label="行名" prop="queryUnit">
                        <select-org-or-dept @select="selectOrg"  style="width: 420px;">
                    <el-input
                      type="text"
                      readonly="readonly"
                      placeholder="请选择"
                      v-model="unitName"
                      suffix-icon="el-icon-arrow-down" />
                  </select-org-or-dept>
                      </el-form-item>
                </div>
            </el-col>
           
            <el-col :span="8">
              <el-form-item label="主办部门" prop="sendDeptId">
                <el-input v-model="ruleForm.sendDeptId" readonly="readonly" placeholder="请选择">
                  <el-button slot="append" @click="getTreeData('chen')" icon="el-icon-plus"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="width: 100%;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="initData">开始统计</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

      <el-col :span="24" style="padding:20px;">
        <table class="stcs_table">
         <tr>
             <td><h3 style="font-weight: bold;">统计结果</h3></td>
          </tr>
          <tr>
            <td>表头:{{queryUnitName}}<span v-if="ruleForm.sendDeptId.length<20">{{ruleForm.sendDeptId}}</span><span v-if="ruleForm.sendDeptId.length>20">全部</span><span v-if="queryUnitName || ruleForm.sendDeptId">公文问与答统计表</span></td>
          </tr>
           <tr>
            <td>部门:<span v-if="ruleForm.sendDeptId.length<20">{{ruleForm.sendDeptId}}</span><span v-if="ruleForm.sendDeptId.length>20">全部</span></td>
          </tr>
          <tr>
            <td>
              统计日期：{{ruleForm.startTime }}
              <span v-if="ruleForm.startTime">至</span>
              {{ruleForm.endTime}}
              <br />
             </td>
          </tr>
        </table>
      </el-col>
      <el-col style="margin: 20px 0;">
           <el-scrollbar style="height:100%;">
          <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
          <el-table-column prop="heji"></el-table-column>
          <el-table-column prop="bumen" label="部门"></el-table-column>
          <el-table-column prop="totalSendOrder" label="发文数量"></el-table-column>
          <el-table-column prop="totalAnswer" label="回答数量"></el-table-column>
          <el-table-column prop="totalQuestion" label="提问数"></el-table-column>
          <el-table-column prop="totalPercent" label="回答率"></el-table-column>
        </el-table>
        </el-scrollbar>
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
import dateFormate from "@/util/filters.js";
import treeCofig from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  // 按收文类型统计
  name: "StcsRecordType",
  components: {
    // mTable
    treeCofig,
    selectOrgOrDept
  },
  data() {
    return {
      unitId:"",
      unitName: "",
      queryUnitName:"",
      bankOptions:[],
      tableData: [],
      down: false,
      // 承办单位
       deptIdData: { function:"unitTreeByFirst","unitCode":this.unitId,"flag":false},
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
        function: "wenDaTongJi",
        queryUnit: "",
        sendDeptId: "",//主办部门
        startTime: "", //   统计起始日期
        endTime: "", //    统计结束日期
        isCodeName:'',
        deptId:""
      },
      times: "",
      tableLoading: false,
      activeName: "tabs-all",
      isEnd: false,
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
    // 选择机构
    selectOrg(org) {
      
      this.ruleForm.sendDeptId="";
      this.unitName = org.unitName;
      this.unitId = org.id;
      this.queryUnitName=org.unitName;
      this.ruleForm.deptId=org.id;
      this.ruleForm.queryUnit=org.unitName;
      console.log(org,this.unitName,this.unitId);

    },
    change(e){
      console.log(e)
      for(let i = 0;i<this.bankOptions.length;i++){
        if(this.bankOptions[i].unitId == e){
          this.queryUnitName = this.bankOptions[i].unitName;
        }
      }
    },
    exportExc() {
      exportTable.exportExcel("督办请示事项办理情况统计", ".el-table");
    },
    timeChange(events) {
      this.ruleForm.startTime = dateFormate.date(Date.parse(this.times[0]));
      this.start1 = dateFormate.date(Date.parse(this.times[0]), "YYYY-MM");
      this.ruleForm.endTime = dateFormate.date(Date.parse(this.times[1]));
      this.end1 = dateFormate.date(Date.parse(this.times[1]), "YYYY-MM");
      this.ruleForm.endTime = this.ruleForm.endTime.split("-");
      //this.ruleForm.endTime[2] = parseInt(this.ruleForm.endTime[2]);
      this.ruleForm.endTime = this.ruleForm.endTime.join("-");
    },
    // 单位选择
    getTreeData(n) {
      
      this.unitId=this.ruleForm.deptId;
      this.deptIdData.unitCode=this.ruleForm.deptId;
      if(this.deptIdData.unitCode=="全部"){
        this.deptIdData.unitCode=""
        // this.ruleForm.queryUnit="";
        // this.unitId="";
        // this.ruleForm.deptId=""
        this.ruleForm.sendDeptId=""
      }
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
          //this.bank_main
          this.ruleForm.queryUnit=this.queryUnit
          name = "主办部门";
          this.ruleForm.sendDeptId="全部";
          this.ruleForm.queryUnit=this.queryUnit
          obj = Object.assign(obj, this.deptIdData);
          clearName = "deptId";
          
          this.ruleForm.queryUnit=this.queryUnit
          break;
      }
      this.dialogTit = name;
      this.showCompDialog();
      this.deptIdData.unitCode=this.ruleForm.deptId;
      this.unitId=this.ruleForm.deptId;
      console.log(this.deptIdData.unitCode,"this.deptIdData.unitCode111")
      

      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(obj),
          this.$businessCode.swglgg
        )
        .then(res => {
          that.treeData = (res && res.data) || [];
        });
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
            ids.push(item.pId);
            that.checkIds.push(item.id);
          });
        }

        switch (dtype) {
          case "chen":
            this.ruleForm.sendDeptId = names.join("");
            this.ruleForm.deptId = ids.join("");
            this.chenCheckData = this.checkData;
            break;
          case "shou":
            this.ruleForm.receiveOrgName = names.join("");
            this.ruleForm.receiveOrgId = ids.join("");
            this.laiCheckData = this.checkData;
            break;
          case "lai":
            this.ruleForm.sendOrgName = names.join("");
            this.ruleForm.sendOrgId = ids.join("");
            this.shouCheckData = this.checkData;
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
          this.checkIds = this.ruleForm.undertakeOrganId;
          break;
        case "shou":
          this.checkIds = this.ruleForm.receiveOrgId;
          break;
        case "lai":
          this.checkIds = this.ruleForm.sendOrgId;
          break;
      }
    },
    initData() {
      let code=JSON.parse(localStorage.getItem("tcHumanRole"));
      this.ruleForm.queryUnit=this.unitId;
      console.log(this.ruleForm)
      for(var i=0;i<code.length;i++){
        if(code[i].dicId=="382" || code[i].dicId=="383"){
              this.ruleForm.isCodeName='1';
        }
      }
    if(this.times=="") {
        this.$message({
          type: "error",
          message:"请选择日期"
        });
        console.log()
      }else if(this.ruleForm.queryUnit==""){
        this.$message({
          type:"error",
          message:"请选择行名"
        });
      }else if(this.ruleForm.sendDeptId==""){
        this.$message({
          type:"error",
          message:"请选择主办部门"
        });
      }else{
if(this.ruleForm.sendDeptId.length>"20"){
                   this.ruleForm.sendDeptId="全部" 
                   this.ruleForm.deptId="全部"
              }
        this.$post
          .postData(
            "wenDaTongJi",
            JSON.stringify(this.ruleForm),
            this.$businessCode.swglgg
          )
          .then(res => {
            if(res.success=="false"){
              this.tableData="";
                  this.$message({
                    message:"数据为空",
                    type:"success",
                    duration:1000
                  })
            }else{ 
                this.tableData = [{
                  bumen:this.ruleForm.sendDeptId,
                  totalSendOrder:res.totalSendOrder,
                  totalQuestion:res.totalQuestion,
                  totalAnswer:res.totalAnswer,
                  totalPercent:res.totalPercent
                }];
            }
            
          })
          .catch(err => {
            console.log(err);
          });
      }
      
    },
    arrow() {
      this.down = !this.down;
    },
    cellClick(row, column, cell, event) {
      console.log(row.id);
      this.$router.push({
        path: "/countersignend",
        query: {
          id: row.id
        }
      });
    },
    resetForm(formName) {
      //this.$refs[formName].resetFields();
      this.unitName="";
      this.unitId="";
      this.ruleForm.deptId=""
      this.ruleForm.sendDeptId="";
      this.ruleForm.queryUnit = "";
      this.ruleForm.startTime = "";
      this.ruleForm.endTime = "";
      this.times = "";
       this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
    })
    .then((res) => {
      this.queryUnitName=res.data[0].unitName||'';
      this.ruleForm.sendDeptId="全部";
      this.ruleForm.deptId="全部";


     
      this.queryUnit=res.data[0].unitCode||'';
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      //this.initData();
    })
    }
  },
  created() {
    this.bankOptions = JSON.parse(localStorage.getItem("unitInfo"))||[];
    // this.initData();
    this.treeTradeCode = this.$businessCode.swglgg; //人员树交
       this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
    })
    .then((res) => {
      this.queryUnitName=res.data[0].unitName||'';
      this.ruleForm.sendDeptId="全部";
      this.ruleForm.deptId="全部";
      this.deptIdData.unitCode=this.unitId
       //    // 
      // this.deptIdData.unitCode=this.unitId
      // this.deptIdData.deptId=JSON.parse(localStorage.getItem('userInfo')).unitId
      // // 

      this.queryUnit=res.data[0].unitCode||'';
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      
      console.log(this.queryUnit,this.unitName,this.unitId,"res",res)
      //this.initData(); 
    })
    
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
  border: 1px solid #f0f0f0;
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
.mt20end {
  margin-top: 20px;
}

.arrowup {
  text-align: center;
}
.table-first {
  border-bottom: 2px solid #f0f0f0;
}
.stcs_table tr {
  height: 35px;
  line-height: 35px;
}
</style>
  