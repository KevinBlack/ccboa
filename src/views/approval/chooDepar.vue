<template>
  <div class="checkShiwu">
    <el-dialog v-dialogDrag :visible.sync="isCreateShow" width="70%" height="100%" title="事务审批" :before-close="closedia">
      <!--    <h2 class="apply_title">事务审批</h2>-->
      <div style="height:30px;width:100%;"></div>
      <div class="form_class">
        <el-form :rules="rules" ref="chooRef" :model="formData" label-width="100px">
          <el-row>
            <el-form-item label="是否跨行" prop="isKh" v-if="!isZH">
              <el-radio-group v-model="formData.isKh" @change="KHchangeEvent">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row v-if="isShow">
            <el-form-item label="项目管理机构" prop="Organ">
              <el-select v-model="formData.unitTypeName" style="width:90%" @change="ORGchangeEvent">
                <el-option
                  v-for="item in managOrgList"
                  :key="item.id"
                  :label="item.unitTypeName||item.manageBank"
                  :value="item.unitTypeName||item.manageBank"
                  no-data-text="请选择"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="申请项目" prop="applyProjectName">
              <el-select v-model="formData.applyProjectName" style="width:90%" @change="selectData">
                <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label="item.applyProject"
                  :value="item.applyProject"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="部门" prop="draftName">
              <el-select
                v-model="formData.draftName"
                style="width:90%"
                @change="draftDepartmentChange"
              >
                <el-option
                  v-for="item in draftDepartmentList"
                  :key="item.currUnitId"
                  :label="item.unitNames"
                  :value="item.currUnitId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div style="width:100%;text-align:center;">
        <el-button type="primary" @click="savedata">确定</el-button>
        <el-button type="primary" @click="closedia">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "qccheckCy",
  components: {},
  props: {
    // isCreateShow:{
    //     type: Boolean,
    //     default() {
    //         return false
    //     }
    // }
  },
  data() {
    return {
      isZH:
        JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000"
          ? true
          : false, //当前登录人是否为总行
      applyFlag: false, //登录人是否为审计机构人员
      isCreateShow: false,
      isIF: true,
      managOrgList: [],
      OrgList: [],
      jiashe: ["1_a", "2_b", "3_c"],
      isKh: "0",
      isShow: false,
      formData: {
        applyProjectName: ""
      },
      formCfg: [],
      rules: {
        isKh: [{ required: true, message: "请选择是否跨行", trigger: "blur" }],
        pmOrgan: [
          { required: true, message: "请选择项目管理机构", trigger: "change" }
        ],
        applyProjectName: [
          { required: true, message: "请选择申请项目", trigger: "change" }
        ],
        draftName: [
          { required: true, message: "请选择部门", trigger: "change" }
        ]
      },
      userList: [
        // {userName:'总行跨行申请'}
      ],
      draftDepartmentList: [],
      isdeparAndOrganForJK:false,
    };
  },
  computed: {},
  //     watch:{
  //         applyProjectName(newName,oldName){
  //             if(newName!=oldName){
  //                 console.log('newName:',newName,'oldName:',newName)
  //                 this.$set(this.formData,'applyProjectName',this.formData.applyProjectName)
  //             }
  // }
  //     },
  methods: {
    //判断是否有审计机构
    auditOrg() {
      this.$api.checkLz.auditOrg({ id: "" }).then(res => {
        this.applyFlag = res.flag;
        if (res.flag) {
          this.loadDataSec();
        } else {
          this.loadDataFir();
        }
      });
    },
    closedia() {
      this.isCreateShow = false;
      this.$emit("setChooDepar", { isshow: this.isCreateShow });
    },
    //非审计机构人员请求起草
    loadDataFir() {
      this.$api.checkLz
        .deparAndOrgan({
          isKh: this.isKh,
          ...this.formData
        })
        .then(res => {
          this.isCreateShow = true;
          //填写审批单人id
          this.formData.humanId = res.user.humanId;
          this.formData.currentUser = res.user.humanName;
          this.formData.currentNode = "填写审批单";
          if (res.applyProjectList && res.applyProjectList.length > 0) {
            this.userList = res.applyProjectList;
          } else {
            this.userList = [];
            // this.formData.applyProjectName=''
          }
          if (res.departList && res.departList.length == 1) {
            this.formData.draftDepartment = res.departList[0].chatNum;
            this.formData.draftDepartmentId = res.departList[0].firstUnitId;
            this.formData.isUp = res.departList[0].currUnitId;

            this.formData.currentUser = res.departList[0].humanName;
            this.formData.currentUserId = res.departList[0].humanId;
            this.formData.draftUserName = res.departList[0].humanName;
            this.formData.draftUserId = res.departList[0].humanId;
            this.formData.curbank = res.departList[0].unitName;
            this.formData.curbankId = res.departList[0].unitId;
            this.formData.contactTel = res.departList[0].telMobile;

            this.draftDepartmentList = res.departList;
            this.formData.draftDepartmentList = res.departList;
          } else if (res.departList && res.departList.length > 1) {
            this.draftDepartmentList = res.departList;
            //this.draftDepartmentList=depList;
            this.formData.draftDepartmentList = res.departList;
          } else {
            this.formData.draftDepartment = "";
            this.draftDepartmentList = [];
          }

          this.formData.userList = this.userList;
          this.formData.contactName = res.user.humanName;
          this.formData.contactTel = res.user.telMobile;
          this.formData.unitName = res.user.unitName;
        });
    },
    //审计机构人员请求起草
    loadDataSec() {
      this.$api.checkLz
        .createAuditApply({
          isKh: this.isKh,
          ...this.formData
        })
        .then(res => {
          this.isCreateShow = true;
          //填写审批单人id
          this.formData.humanId = res.user.humanId;
          this.formData.currentUser = res.user.humanName;
          this.formData.currentNode = "填写审批单";
          if (res.applyProjectList && res.applyProjectList.length > 0) {
            this.userList = res.applyProjectList;
          } else {
            this.userList = [];
            // this.formData.applyProjectName=''
          }
          if (res.departList && res.departList.length == 1) {
            this.formData.draftDepartment = res.departList[0].chatNum;
            this.formData.draftDepartmentId = res.departList[0].firstUnitId;
            this.formData.isUp = res.departList[0].currUnitId;

            this.formData.currentUser = res.departList[0].humanName;
            this.formData.currentUserId = res.departList[0].humanId;
            this.formData.draftUserName = res.departList[0].humanName;
            this.formData.draftUserId = res.departList[0].humanId;
            this.formData.curbank = res.departList[0].unitName;
            this.formData.curbankId = res.departList[0].unitId;
            this.formData.contactTel = res.departList[0].telMobile;

            this.draftDepartmentList = res.departList;
            this.formData.draftDepartmentList = res.departList;
          } else if (res.departList && res.departList.length > 1) {
            this.draftDepartmentList = res.departList;
            //this.draftDepartmentList=depList;
            this.formData.draftDepartmentList = res.departList;
          } else {
            this.formData.draftDepartment = "";
            this.draftDepartmentList = [];
          }
          this.managOrgList = deepClone(res.pmOrganList);
          this.formData.userList = this.userList;
          this.formData.contactName = res.user.humanName;
          this.formData.contactTel = res.user.telMobile;
          this.formData.unitName = res.user.unitName;
        });
    },

    draftDepartmentChange() {
      this.draftDepartmentList &&
        this.draftDepartmentList.map(item => {
          if (item.currUnitId == this.formData.draftName) {
            this.formData.draftDepartmentId = item.firstUnitId;
            this.formData.draftDepartment = item.firstUnitName;
            this.formData.isUp = item.currUnitId;

            this.formData.currentUser = item.humanName;
            this.formData.currentUserId = item.humanId;
            this.formData.draftUserName = item.humanName;
            this.formData.draftUserId = item.humanId;
            this.formData.curbank = item.unitName;
            this.formData.curbankId = item.unitId;
            this.formData.contactTel = item.telMobile;
          }
        });
    },
    selectData(value) {
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$set(
          this.formData,
          "applyProjectName",
          this.formData.applyProjectName
        );
      });
      let that = this;
      this.userList &&
        this.userList.map(item => {
          if (that.formData.applyProjectName === item.applyProject) {
            that.formData.mainDepart = item.manageDept;
            that.formData.applyId = item.id;
            that.formData.projectShortName = item.projectShortName;
            that.formData.textMoudleName = item.textMoudleName;
            that.formData.textMoudlePath = item.textMoudlePath;
            that.formData.textMoudleId = item.textMoudleId;
            //制度
            that.formData.manageSystemId = item.manageSystemId;
            that.formData.manageSystemName = item.manageSystemName;
            that.formData.manageSystemPath = item.manageSystemPath;
            that.formData.yjhAttachid = item.manageBank;
            that.formData.ejhAttachid = item.manageBankId;
            // 是否展示 休假、因私、销假情况
            that.formData.beforeHoliday = item.beforeHoliday;
            that.formData.goAbroad = item.goAbroad;
            that.formData.backLeaveInfo = item.backLeaveInfo;
            that.formData.multiTenancyId1 = item.multiTenancyId1;
            that.formData.multiTenancyId2 = item.multiTenancyId2;
            console.log("-------4444------->", this.formData);
          }
        });
    },
    savedata() {
      this.$refs["chooRef"].validate(valid => {
        if (valid) {
          this.isCreateShow = false;
          this.$emit("setChooDepar", { isshow: this.isCreateShow });
          setTimeout(() => {
            let rowData = JSON.stringify(this.formData);
            console.log("-------->", this.formData);
            //改版后数据且是请假备案申请项目,进入新版页面
            if (
              (this.formData.applyProjectName == "主要负责人请假、备案申请" ||
                this.formData.applyProjectName == "主要负责人请假、备案申请") &&
              this.formData.ejhAttachid == "U010000"
            ) {
              this.$intent.goNewPage(
                this,
                {
                  name: "approvalDetailv",
                  query: {
                    dataForm: rowData,
                    iswait: true
                    //是否是代办页面
                  }
                },
                0
              );
            }
            else if(
              this.formData.applyProjectName == "在京机构（部门）负责人疫情期间离京申请"
            ) {
              this.formData.currentNode = "拟稿"
              this.$intent.goNewPage(
                this,
                {
                  name: "approvalDetailLj",
                  query: {
                    dataForm: JSON.stringify(this.formData),
                    iswait: true
                    //是否是代办页面
                  }
                },
                0
              );
            }
            else {
              this.$intent.goNewPage(
                this,
                {
                  name: "approvalDetail",
                  query: { dataForm: rowData }
                },
                0
              );
            }
          });
        }
      });
    },
    closedata() {
      this.isShowDiag = false;
    },
    deparAndOrganForJK() {
      return this.$api.checkLz.deparAndOrganForJK({
        unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId
      });
    },
    getDepartmentForJK(unitCode,unitPcode){
      this.$api.checkLz.getDepartmentForJK({
        unitCode: unitCode,
        unitPcode:unitPcode
      }).then(res=>{
          if (res.applyProjectList && res.applyProjectList.length > 0) {
            this.userList = res.applyProjectList;
          } else {
            this.userList = [];
            // this.formData.applyProjectName=''
          }
      });
    },
    KHchangeEvent(params) {
      this.formData.applyProjectName = "";
      this.formData.unitTypeName = "";
      if (params) {
        this.isKh = "1";

        if (this.applyFlag) {
          this.formData.checkType = "";
          this.loadDataSec();
        } else {
          this.formData.checkType = 1;
          this.deparAndOrganForJK().then(res => {
          
            console.log(res, "sssssssssssss");
            if (res.data.unitPcode == "U332409") {
                this.isdeparAndOrganForJK=true;
             // this.formData.unitTypeName = res.data.unitPname;
             
              this.managOrgList = [
               // { unitTypeName: res.data.unitPname, id: res.data.unitPcode,unitLevel:''}
               { unitTypeName: '建信金融科技有限责任公司', id: res.data.unitPcode,unitLevel:''}
              ];
              this.isCreateShow = true;
              //填写审批单人id
              // this.formData.humanId = res.user.humanId;
              // this.formData.currentUser = res.user.humanName;
                this.formData.currentNode = "填写审批单";
                this.userList = [];
                this.formData.draftDepartment = "";
                this.formData.unitCode=res.data.unitCode;
                this.formData.unitPcode=res.data.unitPcode;
             //   this.draftDepartmentList = [];
             console.log('KHchangeEvent,getDepartmentForJK',this.draftDepartmentList)
                this.getDepartmentForJK(res.data.unitCode,res.data.unitPcode)
              // this.formData.userList = this.userList;
              // this.formData.contactName = res.user.humanName;
              // this.formData.contactTel = res.user.telMobile;
              // this.formData.unitName = res.user.unitName;
            } else {
                this.isdeparAndOrganForJK=false;
              this.loadDataFir();
              this.queryLevel();
            }
          });
        }
        this.isShow = true;
        this.isIF = true;
        // this.queryLevel()
      } else {
        this.isKh = "0";
        this.formData.checkType = 0;
        if (this.applyFlag) {
          this.loadDataSec();
        } else {
          this.loadDataFir();
        }
        this.isShow = false;
        this.isIF = true;
      }
    },
    ORGchangeEvent() {
      this.formData.checkType = 2;
      let that = this;
      this.managOrgList &&
        this.managOrgList.map(item => {
          if (
            that.formData.unitTypeName == (item.unitTypeName || item.manageBank)
          ) {
            if (item.unitTypeName) {
              that.formData.pmOrgan =
                item.unitTypeName + "_" + item.unitLevelName;
            } else {
              that.formData.pmOrgan = item.manageBank + "_" + item.manageBankId;
            }
          }
        });
      if(this.applyFlag) {
        this.loadDataSec();
      } else if(!this.isdeparAndOrganForJK){       
        this.loadDataFir();
      }else{
        this.getDepartmentForJK(this.formData.unitCode,this.formData.unitPcode);
      }
    },
    //项目管理机构
    queryLevel() {
      let userUnit = JSON.parse(localStorage.getItem("userInfo")).unitId;
      console.log("userUnit", userUnit);
      this.$api.argumentPre
        .unitLevel({
          unitCode: userUnit,
          type: "up"
        })
        .then(res => {
          this.managOrgList = deepClone(res.data);
          // if(manageList&&manageList.length>0){
          //     this.managOrgList=[]
          //     let that -this
          //     manageList&&manageList.map(item=>{
          //         this.managOrgList.push({orgName:item.split("_")[0],orgId:item.split("_")[1]})
          //     })
          // }
        });
    }
  },
  activated() {},
  mounted() {
   // debugger;
    // let userDeparList=JSON.parse(localStorage.getItem('unitInfo')) //所有部门信息List
    // let unitId=JSON.parse(localStorage.getItem('userInfo')).unitId //当前机构ID
    // userDeparList&&userDeparList.map(item=>{
    //     if(item.unitId===unitId){  //筛选当前登陆机构部门
    //         if(item.firstUnitName!==item.currUnitName){ //筛选一级、二级...部门
    //             item.createDeparName=item.firstUnitName+'/'+item.currUnitName
    //             item.createDeparId=item.firstUnitId+'/'+item.currUnitId
    //         }else{
    //             item.createDeparName=item.firstUnitName
    //             item.createDeparId=item.firstUnitId
    //         }
    //         this.draftDepartmentList.push(item)
    //     }
    // })
    // console.log("部门list",this.draftDepartmentList)
  },
  created() {
    this.auditOrg();
    this.formData.checkType = 0;
    this.$set(this.formData, "isKh", 0);
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.apply_title {
  width: 100%;
  text-align: center;
  color: royalblue;
  font-size: 30px;
}
.form_class {
  margin-left: 10px;
}
</style>
