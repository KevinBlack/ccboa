/**
* create by zx on 2020-6-29 13:01
* 类注释：添加人员详细信息
* 备注：
*/
<template>
  <div class="editPerson">
    <div class="organizationConfig">
      <div class="handleButton">
        <el-button type="primary" @click="saveOrgInfo()">{{editButtonText}}</el-button>
        <el-button type="primary" @click="goback">返回</el-button>
        <!-- <el-button type="primary" @click="$router.go(-1)">返回</el-button> -->
      </div>

      <div class="orgInfoTable">
        <div class="orgInfoTitle">用户人员基本信息表</div>
        <div class="orgInfoTableBody">
          <el-form
            :model="indexformData"
            :rules="rules"
            style="margin:0 1%"
            ref="ruleForm"
            label-width="120px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="humanName">
                  <el-input v-model="indexformData.humanName" :disabled="canInput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户类型" prop="humanType">
                  <el-radio-group
                    v-model="indexformData.humanType"
                    @change="formEvent('humanType')"
                    :disabled="perEdit"
                  >
                    <el-radio v-model="indexformData.humanType" :label="1">个人用户</el-radio>
                    <el-radio v-model="indexformData.humanType" :label="2">公用用户</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="所属行名" prop="humanOrgName">
                  <el-input v-model="indexformData.humanOrgName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="margin-left: 50px">
                <el-button type="primary" @click="formEvent('$buttonbank')" :disabled="canInput">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="所属部门" prop="humanDeptName">
                  <el-input v-model="indexformData.humanDeptName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="margin-left: 50px">
                <el-button type="primary" @click="formEvent('$buttondepar')" :disabled="canInput">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="绑定UASS账号" prop="account">
                  <el-input
                    v-model="indexformData.account"
                    :disabled="indexformData.humanType===1?canInput:true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="margin-left: 50px" v-if="indexformData.humanType===2">
                <el-button
                  type="primary"
                  @click="formEvent('$buttondePerson')"
                  :disabled="canInput"
                >选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="系统注册名" prop="oaAccount">
                  <el-input v-model="indexformData.oaAccount" :disabled="canInput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="所属岗位">
                  <el-checkbox-group v-model="humanPostName1" @change="handleCheckedHumanPost">
                    <el-checkbox
                      v-for="item in checkboxs"
                      :key="item.dicId"
                      :label="item.codeName"
                      :disabled="canInput"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="特殊授权">
                  <el-checkbox-group v-model="humanSpeName1" @change="handleCheckedHumanSpe">
                    <el-checkbox
                      v-for="item in radios"
                      :key="item.dicId"
                      :label="item.codeName"
                      :disabled="canInput"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="是否主用户">
                  <el-radio-group v-model="indexformData.jobStatus" :disabled="canInput">
                    <el-radio v-model="indexformData.jobStatus" :label="0">否</el-radio>
                    <el-radio v-model="indexformData.jobStatus" :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="VIP用户">
                  <el-radio-group v-model="indexformData.ifVip" :disabled="canInput">
                    <el-radio v-model="indexformData.ifVip" :label="0">否</el-radio>
                    <el-radio v-model="indexformData.ifVip" :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱">
                  <el-input v-model="indexformData.email" :disabled="canInput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="职务">
                  <el-input v-model="indexformData.humanJob" :disabled="canInput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="微信号">
                  <el-input v-model="indexformData.chatNum" :disabled="canInput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机">
                  <el-input v-model="indexformData.telMobile1" :disabled="canInput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公电话">
                  <el-input v-model="indexformData.telMobile0" :disabled="canInput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :autosize="{ minRows:3}"
                  resize="none"
                  v-model="indexformData.remark"
                  :disabled="canInput"
                ></el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <!-- <fd-form
            style="margin:0 1%"
            ref="fdFrom"
            :data="indexformData"
            :columns="indexformCfg"
            @event="formEvent"
          ></fd-form>-->
        </div>
      </div>
    </div>
    <!--    选择机构&部门-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    <!--    选择人员-->
    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingle"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
      :selectDept="selectDept"
    ></tree-person>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from "vue-elementui-freedomen/components/form";
import orgTree from "components/tree/orgTree";
import treePerson from "components/tree/sysTreePerson";

export default {
  name: "editPerson",
  components: {
    FdForm,
    orgTree,
    treePerson,
  },
  props: {},
  data() {
    return {
      rules: {
        humanName: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        humanType: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        humanOrgName: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        humanDeptName: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        account: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        oaAccount: [
          {
            message: "系统注册名不能包含中文",
            validator: this.checkOaAccount,
            trigger: "blur",
          },
        ],
      },
      selectDept: [],
      editButtonText: "保存",
      b: [],
      canInput: true,
      canInput2: true,
      isAdd: JSON.parse(this.$route.query.isAdd),
      indexformCfg: [{}],
      indexformData: {
        humanType: 1,
        jobStatus: 0,
        oaAccount: "",
        telMobile1: "",
        telMobile0: "",
      },
      humanSpeName1: [],
      humanPostName1: ["一般用户岗"],
      checkboxs: [],
      radios: [],
      //选择机构弹出框
      tempName: [],
      title: "",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      perEdit: false,
      telMobile1: "",
      telMobile0: "",
      showOrgPer: false,
      unitClass: 0,
      bankLeader: "",
      humanType: 1,
      unitCode: "",
      searchData2:
        this.$route.query.flag && this.$route.query.flag == 1
          ? JSON.parse(this.$route.query.searchData1)
          : {},
      pagination2:
        this.$route.query.flag && this.$route.query.flag == 1
          ? JSON.parse(this.$route.query.pagination1)
          : {},
      activeName2:
        this.$route.query.flag && this.$route.query.flag == 1
          ? JSON.parse(this.$route.query.activeName1)
          : "",
    };
  },
  computed: {},
  methods: {
    goback() {
      if (this.$route.query.flag == 1) {
        this.$intent.go(this, {
          name: "personManage",
          query: {
            flag2: 2,
            searchData2: JSON.stringify(this.searchData2),
            pagination2: JSON.stringify(this.pagination2),
            activeName2: this.activeName2,
          },
        });
        // this.$router.push({
        //   name: "personManage",
        //   query: {
        //     flag2: 2,
        //     searchData2: JSON.stringify(this.searchData2),
        //     pagination2: JSON.stringify(this.pagination2),
        //     activeName2: this.activeName2,
        //   },
        // });
      } else {
        this.$intent.go(this, {
          name: "personManage",
          // query: {
          //   flag2: 2,
          //     searchData2: JSON.stringify(this.searchData2),
          //     pagination2: JSON.stringify(this.pagination2),
          //     activeName2: this.activeName2,
          // },
        });
        // this.$router.push({
        //   name: "personManage",
        // });
      }
    },
    //表单事件
    formEvent(params) {
      switch (params) {
        case "$buttondepar":
          if (!this.indexformData.manageBankId) {
            this.$message({
              message: "请先选择所属行",
              type: "success",
            });
            return;
          }
          this.title = "选择所属部门";
          this.isSingle = true;
          this.orgOrDept = 0;
          this.orgOrDeptId = this.indexformData.manageBankId;
          this.showOrgTree = true;
          break;
        case "$buttonbank":
          this.title = "选择所属行";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "0";
          this.showOrgTree = true;
          break;
        case "$buttondePerson":
          if (!this.indexformData.humanUnit) {
            this.$message({
              message: "请先选择所属部门",
              type: "success",
            });
            return;
          }
          this.humanType = 1;
          if (this.bankLeader == "hld") {
            this.unitCode = this.indexformData.manageBankId;
          } else {
            this.unitCode = this.indexformData.humanUnit;
          }
          this.unitClass = 0;
          this.isSingle = false;
          this.selectDept = [];
          let idArr = [];
          let nameArr = [];
          let accountArr = [];
          let arr = [];
          if (
            this.indexformData.parentId &&
            this.indexformData.parentId.length > 0
          ) {
            accountArr = this.indexformData.account.split(",");
            nameArr = this.indexformData.parentName.split(",");
            idArr = this.indexformData.parentId.split(",");
            if (idArr.length > 0) {
              idArr.forEach((item, index) => {
                let obj = {};
                obj.deptHumanId = item;
                obj.perName = nameArr[index];
                obj.deptHumanAccount = accountArr[index];
                obj.disabled = true;
                arr.push(obj);
              });
              this.selectDept = arr;
            }
          }
          this.showOrgPer = true;
          break;
        case "humanType":
          if (this.indexformData.humanType == 1) {
            this.$set(this.indexformData, "account", "");
            this.indexformData.parentId = "";
          } else if (this.indexformData.humanType == 2) {
            this.$set(this.indexformData, "account", "");
          }
          break;
        default:
          break;
      }
    },
    handleCheckedHumanPost(val) {
      //默认岗位无法触发change事件
      // let humanPostArr = [];
      // this.checkboxs.filter(function (n) {
      //   if (val.indexOf(n.codeName) != -1) {
      //     humanPostArr.push(n.dicId);
      //   }
      // });
      // this.indexformData.humanPost = humanPostArr.join(",");
    },
    handleCheckedHumanSpe(val) {
      let humanSpeArr = [];
      this.radios.filter(function (n) {
        if (val.indexOf(n.codeName) != -1) {
          humanSpeArr.push(n.dicId);
        }
      });
      this.indexformData.humanSpe = humanSpeArr.join(",");
    },
    //  选择人员
    getperList(perList) {
      let that = this;
      let person = [];
      let personId = [];
      let personName = [];
      perList &&
        perList.map((item) => {
          if (item.deptHumanAccount && item.deptHumanId && item.perName) {
            person.push(item.deptHumanAccount);
            personId.push(item.deptHumanId);
            personName.push(item.perName);
          }
        });
      this.$set(this.indexformData, "account", person.join(","));
      this.$set(this.indexformData, "parentId", personId.join(","));
      this.$set(this.indexformData, "parentName", personName.join(","));
    },
    //选择部门机构确定
    getOrgList(org) {
      if (this.orgOrDeptId == "0") {
        if (
          this.indexformData.manageBankId &&
          org.id != this.indexformData.manageBankId
        ) {
          this.$set(this.indexformData, "humanDeptName", "");
          this.$set(this.indexformData, "humanUnit", "");
          if (this.indexformData.humanType == 2) {
            this.$set(this.indexformData, "account", "");
            this.$set(this.indexformData, "parentId", "");
          }
        }
        this.$set(this.indexformData, "humanOrgName", org.unitName);
        this.$set(this.indexformData, "manageBankId", org.id);
      } else {
        this.bankLeader = org.deptType;
        if (
          this.indexformData.humanUnit &&
          org.id != this.indexformData.humanUnit
        ) {
          if (this.indexformData.humanType == 2) {
            this.$set(this.indexformData, "account", "");
            this.$set(this.indexformData, "parentId", "");
          }
        }
        this.$set(this.indexformData, "humanDeptName", org.unitName);
        this.$set(this.indexformData, "humanUnit", org.id);
      }
    },
    checkOaAccount(rule, value, callback) {
      let isChinese = true;
      const reg1 = /[\u4e00-\u9fa5]/g; //汉字
      if (value && value.search(reg1) != -1) {
        isChinese = false;
      }
      if (!isChinese) {
        return callback(new Error("系统注册名不能包含中文"));
      } else {
        callback();
      }
    },
    saveOrgInfo() {
      console.log(this.indexformData);
      let that = this;

      if (that.editButtonText === "编辑") {
        that.toEdit();
      }
      if (that.editButtonText === "保存") {
        // that.indexformData.humanPost &&
        //   typeof that.indexformData.humanPost == "object" &&
        //   (that.indexformData.humanPost = that.indexformData.humanPost.join(
        //     ","
        //   ));
        // that.indexformData.humanSpe &&
        //   typeof that.indexformData.humanSpe == "object" &&
        //   (that.indexformData.humanSpe = that.indexformData.humanSpe.join(","));
        if (!that.indexformData.telMobile1 && !that.indexformData.telMobile0) {
          that.indexformData.telMobile = "";
        } else {
          if (!that.indexformData.telMobile1) {
            that.indexformData.telMobile1 = "";
          }
          if (!that.indexformData.telMobile0) {
            that.indexformData.telMobile0 = "";
          }
          that.indexformData.telMobile =
            that.indexformData.telMobile0 + "," + that.indexformData.telMobile1;
        }
        if (!that.indexformData.oaAccount) {
          that.indexformData.oaAccount = "";
        }
        let humanPostArr = [];
        that.checkboxs.filter(function (n) {
          if (that.humanPostName1.indexOf(n.codeName) != -1) {
            humanPostArr.push(n.dicId);
          }
        });
        this.indexformData.humanPost = humanPostArr.join(",");
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            if (that.indexformData.humanType == 1) {
              that.indexformData.operatorType = "uassCheck";
              //第一次保存走校验
              that.$api.setting.person
                .sendPerson(that.indexformData)
                .then((res) => {
                  if (res.msg == "0") {
                    //第二次保存真正保存
                    that.indexformData.operatorType = "";
                    that.$api.setting.person
                      .sendPerson(that.indexformData)
                      .then((res) => {
                        that.$message({
                          type: "success",
                          message: "保存成功",
                        });
                        that.details(
                          that.indexformData.humanId
                            ? that.indexformData.humanId
                            : res.data.humanId
                        );
                      });
                  } else if (res.msg == "1") {
                    that.$message({
                      type: "warning",
                      message: res.data,
                    });
                  } else if (res.msg == "2") {
                    that.indexformData.operatorType = "";
                    that
                      .$confirm(res.data, "提示", {
                        confirmButtonText: "是",
                        cancelButtonText: "否",
                        type: "warning",
                      })
                      .then(() => {
                        that.$api.setting.person
                          .sendPerson(that.indexformData)
                          .then((res) => {
                            that.$message({
                              type: "success",
                              message: "保存成功",
                            });
                            that.details(
                              that.indexformData.humanId
                                ? that.indexformData.humanId
                                : res.data.humanId
                            );
                          }); // 调用保存方法
                      })
                      .catch(() => {});
                  }
                })
                .catch((error) => {});
            } else {
              this.indexformData.operatorType = "";
              this.$api.setting.person
                .sendPerson(this.indexformData)
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: "保存成功",
                  });
                  this.details(
                    that.indexformData.humanId
                      ? that.indexformData.humanId
                      : res.data.humanId
                  );
                });
            }
            this.editButtonText = "编辑";
            this.perEdit = true;
            this.canInput = true;
          } else {
            this.$message({
              type: "error",
              message: "请填写必填项",
            });
          }
        });
      } else {
        this.editButtonText = "保存";
        this.canInput = false;
        this.perEdit = true;
      }
    },
    toEdit() {
      (this.perEdit = true),
        (this.canInput = false),
        (this.isAdd = !this.isAdd);
    },
    loadData() {
      this.$api.setting.person
        .getPersonInfo({ codeType: "role_type" })
        .then((res) => {
          this.checkboxs = [];
          this.checkboxs = res.data;
          this.$api.setting.person
            .getPersonInfo({ codeType: "human_speAuth" })
            .then((res) => {
              this.radios = res.data;
            });
        });
    },
    loadPersonDetail() {
      this.$api.setting.organization
        .getPersonDetail({
          humanId: JSON.parse(this.$route.query.detail).humanId,
        })
        .then((res) => {
          let tel = res.data.telMobile.split(",");
          res.data.telMobile1 = tel[1];
          res.data.telMobile0 = tel[0];
          this.indexformData = res.data;
        });
    },
    details(humanId) {
      let that = this;
      this.$api.setting.organization
        .getPersonDetail({ humanId })
        .then((res) => {
          this.indexformData = res.data;
          // this.indexformData.manageBank = res.data.humanOrgCode
          this.indexformData.manageBankId = res.data.humanOrgCode;
          this.indexformData.humanUnit = res.data.humanUnit;
          if (res.data.humanDeptType == "hld") {
            this.bankLeader = "hld";
          } else {
            this.bankLeader = "";
          }
          that.humanPostName1 = [];
          that.humanSpeName1 = [];
          if (res.data.humanPostName) {
            that.humanPostName1 = res.data.humanPostName.split(",");
          }
          if (res.data.humanSpeName) {
            that.humanSpeName1 = res.data.humanSpeName.split(",");
          }
          this.indexformData.humanDeptName = res.data.deptLevelName;
          if (res.data.telMobile && res.data.telMobile.length > 0) {
            let phoneArr = res.data.telMobile.split(",");
            that.$set(that.indexformData, "telMobile0", phoneArr[0]);
            that.$set(that.indexformData, "telMobile1", phoneArr[1]);
          }
        });
    },
  },
  activated() {},
  mounted() {},
  created() {
    let humanId = this.$route.query.humanId;
    if (humanId) {
      this.editButtonText = "编辑";
      this.details(humanId);
      this.canInput = true;
      this.perEdit = true;
    } else {
      this.canInput = false;
      this.perEdit = false;
    }
    this.canInput2 = false;
    this.loadData();
  },
  watch: {
    // indexformData: {
    //   handler (newVal, oldVal) {
    //     if (newVal.humanType == '1') {
    //       this.$set(this.indexformData, 'account', '')
    //       this.indexformData.parentId = ''
    //       this.init()
    //     } else {
    //       this.$set(this.indexformData, 'account', '')
    //       this.initPub()
    //     }
    //   },
    //   deep: true
    // }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.additionStyle[data-v-4743acd6] {
  margin-left: 0px;
}

.el-input--medium {
  font-size: 11px;
}

.organizationConfig {
  .orgInfoTable {
    padding: 21px 70px;

    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 84px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
    }

    h3 {
      margin-left: 113px;
      font-size: 17px;
      line-height: 57px;
      color: #3b85f0;
    }

    //   .orgInfoTableBody {
    //     margin-left: 10%;
    //   }

    .explanation {
      margin-left: 260px;
      margin-top: 28px;
      font-size: 14px;
      line-height: 22px;
      color: #ff3b4d;
    }
  }
}
</style>