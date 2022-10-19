<template>
  <div class="registerForm">
    <el-container>
      <!-- header:页头，功能区 -->
      <!-- <el-header>
        <el-row type="flex" align="middle" justify="space-between">
          <el-col :span="6">
            <div class="back" @click="backkKeeperRegister">
              <i class="el-icon-arrow-left"></i>
              <span>印章保管人登记单</span>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="btn_box">
              <el-button
                v-for="(item, index) in headerBtnList"
                :key="index"
                @click="headerBtnClick(item)"
                plain
              >{{item}}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>-->
      <!-- <div class="btn_box">
        <el-button
          v-for="(item, index) in headerBtnList"
          :key="index"
          @click="headerBtnClick(item)"
          plain
        >{{item}}</el-button>
      </div>-->

      <el-main>
        <div style="width:100%">
          <el-button type="primary" @click="closedata">关闭</el-button>
          <el-button type="primary" @click="toEdit" v-if="!this.isAdd">编辑</el-button>
          <el-button type="primary" v-else @click="saveData">保存</el-button>
          <el-button type="primary"  @click="shoucang">收藏</el-button>
        </div>
        <!-- <div class="register-main"> -->
        <div class="title">{{bankName}}印章保管人登记单</div>
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          :rules="rules"
          class="registerForm-mainform"
        >
          <el-row>
            <el-col :span="18">
              <el-form-item label="机构名称">
                <select-org-or-dept :disabled="this.canInput" @select="selectOrg" :orgOrDeptId="initOrgId">
                  <el-input
                    type="text"
                    readonly="readonly"
                    placeholder="请选择机构"
                    v-model="form.draftOrgan"
                    suffix-icon="el-icon-arrow-down"
                  />
                </select-org-or-dept>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="部门名称">
                <select-org-or-dept
                  :disabled="this.canInput"
                  @select="selectdep"
                  :orgOrDept="0"
                  :orgOrDeptId="form.draftOrganId"
                >
                  <el-input
                    type="text"
                    readonly="readonly"
                    placeholder="请选择部门"
                    v-model="form.draftDepartment"
                    suffix-icon="el-icon-arrow-down"
                  />
                </select-org-or-dept>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" prop="chineseNodeUser">
                <el-select :disabled="this.canInput" v-model="form.chineseNodeUser" placeholder="请选择" @change="changePerson">
                  <el-option
                    v-for="item in peopleInfo"
                    :key="item.deptHumanId"
                    :label="item.deptHumanName"
                    :value="item.deptHumanId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <!-- TODO:在印章保管人处理环节，必填项 -->
                <label slot="label">
                  <span class="red">*</span>性别
                </label>
                <el-radio-group :disabled="this.canInput" v-model="form.sex" change="isEnabledChange">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期" prop="webFzDate">
                <!-- <label slot="label">
                  <span class="red">*</span>出生日期
                </label>-->
                <el-date-picker
                  :disabled="this.canInput"
                  type="date"
                  placeholder="请选择日期"
                  v-model="form.webFzDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="职务" prop="zhiwu">
                <!-- <label slot="label">
                  <span class="red">*</span>职务
                </label>-->
                <el-input v-model="form.zhiwu" :disabled="this.canInput"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="学历" prop="xueli">
                <!-- <label slot="label">
                  <span class="red">*</span>学历
                </label>-->
                <el-input v-model="form.xueli" :disabled="this.canInput"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="联系电话" prop="lianXiFsh">
                <!-- <label slot="label">
                  <span class="red">*</span>联系电话
                </label>-->
                <el-input
                  onkeyup="value=value.replace(/[^\-\,\d\*\ ]/g, '')"
                  v-model="form.lianXiFsh"
                  :disabled="this.canInput"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="培训情况" prop="peixun">
            <!-- <label slot="label">
              <span class="red">*</span>培训情况
            </label>-->
            <el-input type="textarea" v-model="form.peixun" :rows="3" :disabled="this.canInput"></el-input>
          </el-form-item>
          <el-form-item label="保管印章名称">
            <el-input v-model="form.bgMarkName" :disabled="this.canInput"></el-input>
          </el-form-item>
          <el-form-item label="保管印章角色">
            <el-input v-model="form.bgMarkJiaose" :disabled="this.canInput"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="到岗日期" prop="daogangDate">
                <!-- <label slot="label">
                  <span class="red">*</span>到岗日期
                </label>-->
                <el-date-picker
                  type="date"
                  :disabled="this.canInput"
                  placeholder="请选择日期"
                  v-model="form.daogangDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="离岗日期">
                <el-date-picker
                  type="date"
                  placeholder="请选择日期"
                  v-model="form.ligangDate"
                  value-format="yyyy-MM-dd"
                  :disabled="this.canInput"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark" :disabled="this.canInput" :rows="5"></el-input>
          </el-form-item>
        </el-form>
      </el-main>
      <!-- Footer:页脚 -->
      <el-footer>
        <el-alert :closable="false" title="填写说明：" type="info"></el-alert>
        <el-alert :closable="false" title="1.  行章保管人员必填为工作3年以上的中长期合同制员工。" type="info"></el-alert>
        <el-alert
          :closable="false"
          title="2.  行章保管岗位一般应每5年进行一次岗位交流，在年度内应视情况实行顶岗和强制休假制度。"
          type="info"
        ></el-alert>
        <el-alert :closable="false" title="3.  各级机构负责人一律不得自行保管行章。" type="info"></el-alert>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import selectOrgOrDept from "components/select/selectOrgOrDept";
import selectOrg from "components/select/selectOrg";
import shiwuLineWord from "@/minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";

import minixs from "@/minixs/index";

import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "registerForm",
  components: {
    selectOrgOrDept
    // selectOrg
  },
  mixins:[shiwuLineWord,minixs,draftMuban,viewDraft,dispatchIndex,isNowUser],
  data: function data() {
    return {
      initOrgId: "0",
      value: "",
      peopleInfo: [],
      firstDepName: "",
      canInput: true,
      //人员
      hasRadio: false, //是否單選
      offenUse: false,
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogType: "next",
      dialogTypeNow: "next",
      dialogState: false, //显示隐藏
      treeData: [], //人员树
      singelCheckF: true, // 单选true 多选为false
      seletOptionsData: [],
      id: "",
      isAdd: "",
      organFullName: "",
      currDepId: "",
      headerBtnList: ["关闭", "保存"],
      deptList: [], // 通过弹出窗口，选择单位，单选，窗口中的单位由本机构中所有一级部门的名称和直属下级行的机构简称组成
      userList: [],
      bankName: "",
      user: [],
      form: {
        draftUserId: "",
        draftOrgan: "", // 机构名称
        draftOrganId: localStorage.getItem("userInfo").unitId,
        chineseNodeUser: "", // 姓名
        draftUser: "",
        sex: "", // 性别
        webFzDate: "", // 出生日期
        draftDepartment: "", // 部门名称
        draftDepartmentId: "",
        zhiwu: "", // 职务
        xueli: "", // 学历
        lianXiFsh: "", // 联系方式
        peixun: "", // 培训情况
        bgMarkName: "", // 保管印章名称
        bgMarkJiaose: "", // 保管印章角色
        ligangDate: "", // 离岗日期
        daogangDate: "",
        remark: "", // 备注
        explain: "" // 填写说明
      },

      rules: {
        chineseNodeUser: [
          { required: true, message: "请选择姓名", trigger: "blur" }
        ],
        webFzDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        xueli: [{ required: true, message: "请填写学历", trigger: "blur" }],
        lianXiFsh: [{ required: true, message: "请填写电话", trigger: "blur" }],
        peixun: [
          { required: true, message: "请填写培训情况", trigger: "blur" }
        ],
        daogangDate: [
          { required: true, message: "请填写日期", trigger: "blur" }
        ],
        zhiwu: [{ required: true, message: "请填写职务", trigger: "blur" }]
      },
      getPeopleQuerry: {
        humanUnitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        frozenStatus: 0,
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        humanUnit: JSON.parse(localStorage.getItem("userInfo")).unitId,
        sleepDeptName: ""
      },
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 10
      }
    };
  },
  computed: {},
  methods: {
    changePerson(person) {
      console.log(person, "人人");
      this.$set(this.form, "draftUserId", person + "");
      this.user = this.peopleInfo.filter(item => {
        return item.deptHumanId == person;
      });
      console.log(this.user, "人人1");
      this.$set(this.form, "draftUser", this.user[0].deptHumanName);
      console.log(this.form.draftUser, "draftUser");
    },
    getPeopleInfo() {
      this.$set(this.getPeopleQuerry, "humanType", 1);
      this.$set(this.getPeopleQuerry, "unitCode", this.form.draftDepartmentId);
      this.$set(this.getPeopleQuerry, "isNeedChild", "no");
      this.$set(this.getPeopleQuerry, "seletSelf", 0);
      this.$set(this.getPeopleQuerry, "unitClass", 2);
      this.$set(this.getPeopleQuerry, "validFlag", 1);
      this.$set(this.getPeopleQuerry, "postList", "336");
      this.$set(this.getPeopleQuerry, "resDataType", "allUser");
      this.$api.setting.organization
        .getOrgPerson(this.getPeopleQuerry, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          console.log(res, "人员信息");
          this.peopleInfo = res.data;
        });
    },
    selectdep(dep) {
      this.$set(this.form, "draftDepartment", dep.unitName);
      this.$set(this.form, "draftDepartmentId", dep.id);
      // this.$set(this.form, "chineseNodeUser", '');
      this.$forceUpdate();
      this.form.draftUser = "";
      this.user.deptHumanId = "";
      this.value = "";
      console.log(this.form.draftUser, "draftUser");
      this.getPeopleInfo();
    },
    selectOrg(org) {
      console.log(org, "选择机构触发");
      this.$set(this.form, "draftOrgan", org.unitName);
      this.$set(this.form, "draftOrganId", org.id);
      this.$forceUpdate();
      // this.$set(this.form, "chineseNodeUser", '');
      // this.$set(this.form, "draftUser",'');
      this.form.draftDepartment = "";
      this.form.draftDepartmentId = "";
      this.form.draftUser = "";
      this.user.deptHumanId = "";
      this.value = "";
    },
    toEdit() {
      this.isAdd = true;
      this.canInput = false;
    },
    closedata() {
      if (this.isAdd) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.saveData();
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$intent.closeWindow(this);
      }
      // this.$confirm("是否退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$router.push("/sealManage/keeperRegister/index");
      //     this.$refs.form.resetField();
      //   })
      //   .catch(() => {});
    },
    selectPerson(select) {
      if (select) {
        this.$set(this.form, "draftUserId", select.id);
        this.$set(this.form, "draftUser", select.unitName);
        this.$set(this.form, "chineseNodeUser", select.unitName);
        console.log("11111");
      }
    },
    // 选择机构

    //选择部门
    selectDept(dept) {
      this.form.draftDepartment = dept.unitName;
      this.form.draftDepartmentId = dept.id;
      // this.searchData.unitCode = dept.id;
      // this.loadData();
    },
    choosePerson() {
      this.singelCheckF = true;
      this.dialogState = true;
    },
    showCompDialog(data, status, type, params, dtype) {
      //   console.log("--------->", data);
      this.dialogState = false;
      this.$set(this.form, "chineseNodeUser", data[0].name);
      //  this.$set(this.form, "humanId", data[0].id + "");
    },
    backkKeeperRegister() {
      this.$router.push({
        path: "/sealManage/keeperRegister"
      });
    },
    headerBtnClick(btnName) {
      switch (btnName) {
        case "关闭":
          this.$confirm("是否退出?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$router.push("/sealManage/keeperRegister");
              // this.$router.go(-1);
            })
            .catch(() => {
              // this.$router.back();
            });
          break;
        case "保存":
          this.saveData();
          break;
        // TODO:其他按钮的功能以后再添加
        default:
          console.log("你点击了按钮:" + btnName);
      }
    },
    // 查询所有的印章类别，从“印章刻制类别”配制项获取
    // TODO:
    queryAllSealTypes: function() {
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          let sealTypes = [
            "行章",
            "党委章",
            "领导人员名章",
            "部门内设章",
            "合同专用章"
          ];
          resolve(sealTypes);
        }, 200);
      });
    },
    // 查询所有的申请单位
    // TODO:
    queryApplyRegions: function() {
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          resolve([{ label: "中国银行", value: "中国银行" }]);
        }, 200);
      });
    },
    shoucang(){
      this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              this.$api.sealManage
                .shoucang({
                  markOrderType: "12",
                  id: this.$route.query.id || this.id
                })
                .then(res => {
                  console.log(res,'收藏')
                  let obj = {};
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName
                  this.downFile(obj);
                  this.$message({
                    type: "success",
                    offset: "200",
                    message: "收藏完成"
                  });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
    },
    saveData() {
      if (this.id) {
        console.log("要编辑页面");
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(this.form, "通过ID获取的表单详情");
            this.$api.sealManage.personLogin
              .addForm({ ...this.form })
              .then(res => {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                // console.log(res, "6666666666");
                // this.$router.push({
                //   path: "/sealManage/keeperRegister/index",
                //   query: {
                //     orgName: this.form.draftOrgan,
                //     id: this.form.draftOrganId
                //   }
                // });
              })
              .catch(res => {
                console.log(res);
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              });
          } else {
            this.$message({
              message: "请完善表单",
              type: "warning"
            });
          }
        });
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(this.form);
            this.$api.sealManage.personLogin
              .addForm({ ...this.form })
              .then(res => {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                console.log(res, "6666666666");
                this.$router.push({
                  path: "/sealManage/keeperRegister/index",
                  query: {
                    orgName: this.form.draftOrgan,
                    id: this.form.draftOrganId
                  }
                });
              })
              .catch(res => {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              });
          } else {
            this.$message({
              message: "请完善表单",
              type: "warning"
            });
          }
        });
      }
    }
    // saveData: function () {

    //   var jsonData = {};
    //   jsonData.orgName = form.orgName;
    //   PJF.communication.cpsJsonReq({
    //     maskAll: true,
    //     fwServiceId: "simpleTransaction",
    //     fwTranId: "A0161WG20",
    //     jsonData: PJF.util.json2str(jsonData),
    //     success: function (data) {
    //       //	alert(PJF.util.json2str(data));
    //       if ("00" == data.BK_STATUS) {
    //         new PJF.ui.messageBox({
    //           style: "success",
    //           title: "提示",
    //           content:
    //             "业务类型新增成功,等待审核<br/>申请编号：" +
    //             data.Aply_ID +
    //             "<br/>全局跟踪号：" +
    //             data._COMMON.SYS_EVT_TRACE_ID,
    //         });
    //         g_obj.addWin.destroy();
    //         doSearch();
    //       } else {
    //         new PJF.ui.errorMessageBox({
    //           style: "warning",
    //           title: "提示",
    //           desc: data.BK_DESC,
    //           code: data.BK_CODE,
    //           traceId: data._COMMON.SYS_EVT_TRACE_ID,
    //         });
    //       }
    //     },
    //     failure: function (data) {
    //       new PJF.ui.errorMessageBox({
    //         style: "warning",
    //         title: "提示",
    //         desc: data.BK_DESC,
    //         code: data.BK_CODE,
    //         traceId: data._COMMON.SYS_EVT_TRACE_ID,
    //       });
    //     },
    //   });
    // },
  },
  watch: {
    "form.isEnabled": function(val) {
      console.log("watch:", val, this);
    }
  },
  created: function() {
    this.currDepId = JSON.parse(localStorage.getItem("userInfo")).currUnitId;
    this.organFullName = JSON.parse(localStorage.getItem("userInfo")).unitName;
    this.firstDepName = JSON.parse(
      localStorage.getItem("userInfo")
    ).shortFirstUnitName;
    this.$api.setting.organization
      .getDepDetail({ unitCode: this.currDepId })
      .then(res => {
        console.log(res, "部门信息部门信息部门信息部门信息");
        if (res.data.unitAndConfig.isSpecialHead == "0") {
          this.bankName = this.organFullName;
        } else {
          this.bankName = this.firstDepName;
        }
      });

    // console.log("registerForm页面生命周期created");
    if (this.$route.query.id) {
      this.isAdd = false;
      this.id = this.$route.query.id;
      this.$api.sealManage.personLogin.getDetail({ id: this.id }).then(res => {
        console.log(res, "通过ID通过ID通过ID通过ID");
        this.form = res.data;
        this.getPeopleInfo();
        this.value = res.data.draftUser;
      });
    } else {
      console.log("新增");
      this.isAdd = true;
      this.canInput = false;
    }
    // 初始化所有的印章类别
    // this.queryAllSealTypes()
    //     .then((sealTypes) => {
    //         console.log('查询sealTypes成功:', sealTypes, this);
    //         this.sealTypes = sealTypes;
    //     })
    //     .catch((err) => {
    //          console.log('查询sealTypes失败:', err);
    //         this.sealTypes = [];
    //     });

    // 查询所有的申请单位（由本机构中所有一级部门的名称和直属下级行的机构简称组成）
    // this.queryApplyRegions()
    //     .then((applyRegions)=>{
    //         console.log('查询applyRegions成功：', applyRegions);
    //         this.applyRegions = applyRegions;
    //     })
    //     .catch(function(err){
    //         console.log('查询applyRegions失败：', err);
    //         this.applyRegions = [];
    //     });
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/ .el-input {
  width: 70%;
}
/deep/ .el-footer {
  height: 150px;
}
.read {
  color: "#E00";
}
.registerForm {
  background: #fff;
  min-height: 100vw;
}
.el-header {
  background-color: #409eff;
  color: #333;
  line-height: 60px;
  .back {
    line-height: 60px;
    height: 60px;
    cursor: pointer;
    color: #eee;
  }
  .btn_box {
    display: flex;
    justify-content: flex-end;
  }
}

.el-main {
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 35px;
    color: #409eff;
    font-weight: 800;
  }
  .registerForm-mainform {
    width: 90%;
    border: 1px solid #dcdfe6;
    padding: 2% 2%;
    margin: auto;
  }
}
</style>
