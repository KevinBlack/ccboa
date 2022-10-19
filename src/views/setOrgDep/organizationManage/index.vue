<template>
  <div class="organizationConfig">
    <div class="handleButton">
      <el-button type="primary" v-if="!isAdd" @click="toEdit">编辑</el-button>
      <el-button type="primary" @click="saveOrgInfo()" v-if="isAdd">保存</el-button>
      <el-button type="primary" @click="orgBack">返回</el-button>
      <!--      <el-button type="danger" @click="toDelete">注销</el-button>-->
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">机构信息表</div>
      <div>
        <h3>机构索引信息</h3>
        <div class="orgInfoTableBody">
          <m-form
            ref="orgmForm1"
            :formCfg="indexformCfg"
            :formRules="indexformRules"
            :formData="formData"
            :showButton="false"
            :isInline="false"
            labelWidth="260px"
          ></m-form>
        </div>
      </div>
      <div>
        <h3>机构配置信息</h3>
        <div class="orgInfoTableBody">
          <m-form
            ref="orgmForm"
            :formCfg="formCfg"
            :formRules="formRules"
            :formData="formData"
            :showButton="false"
            :isInline="false"
            labelWidth="260px"
          ></m-form>
        </div>
      </div>
      <!-- <div class="explanation">
         <p>填写说明:</p>
         <p>机构全称：指机构在正式场合或公文内使用的名称；</p>
         <p>机构简称：指机构在OA系统中使用的系统名；</p>
         <p>机构ID：指机构在OA系统内作为关键字唯一编号；</p>
      </div>-->
    </div>

    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingle"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
      :selectDept="selectDept"
      :isNeedChild="isNeedChild"
    ></tree-person>
    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from "components/form/mForm";
// import selectPerson from "@/components/tree/tree-cyTansun";
import orgTree from "components/tree/orgTree";
import treePerson from "components/tree/sysTreePerson";
export default {
  name: "orgManageConfig",
  components: {
    mForm,
    // selectPerson,
    treePerson,
    orgTree,
  },
  props: {},
  data() {
    return {
      title: "选择机构",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",

      orgId1: JSON.parse(localStorage.getItem("userInfo")).unitId,
      formRules: {
        unitHeader: [
          { required: true, message: "请输入机构代字", trigger: "blur" },
        ],
        comDeputyCh: [
          { required: true, message: "请选择机构综合代表", trigger: "blur" },
        ],
      },
      isAdd: JSON.parse(this.$route.query.isAdd),
      canInput: true,
      // 机构索引信息
      indexformCfg: [],
      indexformRules: {
        unitName: [
          { required: true, message: "请输入机构全称", trigger: "blur" },
        ],
        unitShort: [
          { required: true, message: "请输入机构简称", trigger: "blur" },
        ],
        unitTypeName: [
          { required: true, message: "请选择机构类别", trigger: "change" },
        ],
      },
      // 机构配置信息
      formCfg: [],
      formData: {},
      showOrgPer: false,
      types: "",
      isNeedChild: "yes",
      unitClass: 0,
      humanType: 3,
      unitCode: JSON.parse(this.$route.query.detail).unitCode,
      selectDept: [],
      orgList: [],
      searchData2:
        this.$route.query.flag && this.$route.query.flag == 1
          ? JSON.parse(this.$route.query.searchData1)
          : {},
      pagination2:
        this.$route.query.flag && this.$route.query.flag == 1
          ? JSON.parse(this.$route.query.pagination1)
          : {},
      paneTab2:
        this.$route.query.flag && this.$route.query.flag == 1
          ? JSON.parse(this.$route.query.paneTab1)
          : "",
    };
  },
  computed: {},
  methods: {
    getOrgList(org) {
      if (this.orgOrDeptId == "0") {
        this.formData.manageBankId = org.id;
        this.$set(this.formData, "manageBank", org.unitName);
        this.$set(this.formData, "orgCode", org.id);
      }
    },
    toDelete() {
      this.$confirm("是否确定注销当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.setting.organization
            .sendOrgManage({ unitCode: this.formData.unitCode, validFlag: 0 })
            .then((res) => {
              this.$message({
                type: "success",
                message: "注销成功",
              });
              this.$router.back();
            });
        })
        .catch(() => {});
    },
    //返回
    orgBack() {
      this.$confirm("是否确认关闭当前页面？").then(() => {
        // this.$router.back();
        if (this.$route.query.flag == 1) {
          this.$intent.go(this, {
            path: "/setting/orgDepartment/orgManage/orgManageView",
            query: {
              flag2: 2,
              searchData2: JSON.stringify(this.searchData2),
              pagination2: JSON.stringify(this.pagination2),
              paneTab2: this.paneTab2,
            },
          });
        } else {
          console.log(1111);
          this.$intent.go(this, {
            path: "/setting/orgDepartment/orgManage/orgManageView",
          });
        }
      });
    },
    toEdit() {
      this.isAdd = !this.isAdd;
      this.canInput = false;
      //请求机构类别
      this.$api.designDictionary
        .getOrgList({ unitCode: this.orgId1 })
        .then((res) => {
          res.data &&
            res.data.map((item) => {
              this.orgList.push({ label: item.unitTypeName, value: item.id });
              // this.orgList[item.id]=item.unitTypeName
            });
        });
      this.init();
    },

    init() {
      this.indexformCfg = [
        {
          label: "机构序号",
          prop: "unitCodeIndex",
          disabled: true,
          class: "oin",
          type: "input",
        },
        {
          label: "机构全称",
          prop: "unitName",
          type: "input",
          disabled: this.canInput,
        },
        {
          label: "机构简称",
          prop: "unitShort",
          type: "input",
          disabled: this.canInput,
        },
        // {
        //   label: "OA机构简称",
        //   prop: "oaUnitShort",
        //   disabled: this.canInput,
        //   type: "input",
        // },
        // {
        //   label: "机构ID",
        //   prop: "unitCode",
        //   type: "input",
        //   disabled: true,
        // },
        {
          label: "上级机构（组织树）",
          prop: "unitPShortName",
          type: "input",
          disabled: true,
          additionButtonLabel: "选择",
          showAdditionButton: true,
          buttonDisabled: this.canInput,
          additionButtonhandel: () => {
            this.title = "选择机构";
            this.isSingle = true;
            this.orgOrDept = 1;
            this.orgOrDeptId = "0";
            this.showOrgTree = true;
          },
        },
        // {
        //   label: "上级机构（行政层次）",
        //   prop: "unitPShortName",
        //   type: "input",
        //   disabled: true,
        // },
        {
          label: "机构类别",
          prop: "unitTypeName",
          type: "select",
          options: this.orgList,
          disabled: this.canInput,
        },
        // {
        //   label: "机构管理员",
        //   prop: "unitAdminName",
        //   type: "input",
        //   disabled: true,
        //   // additionButtonLabel: "选择",
        //   // showAdditionButton: true,
        //   // buttonDisabled: this.canInput,
        //   // additionButtonhandel: () => {
        //   //   this.dialogTypeNow = "jgadm";
        //   //   this.dialogState = true;
        //   // },
        // },
      ];
      this.formCfg = [
        {
          label: "机构代字",
          prop: "unitHeader",
          type: "input",
          disabled: this.canInput,
          showAdditionSpan: true,
          additionSpan: "例如：建苏",
          additionSpanStyle: {
            color: "#F5150B",
          },
        },

        {
          label: "机构综合代表中文名",
          prop: "comDeputyCh",
          type: "input",
          disabled: true,
          additionButtonLabel: "选择",
          showAdditionButton: true,
          buttonDisabled: this.canInput,
          additionButtonhandel: () => {
            this.isSingle = true;
            this.types = "jgzh";
            this.showOrgPer = true;
          },
        },
        {
          label: "跨行签报管理员中文名",
          prop: "signOffUserCh",
          type: "input",
          disabled: true,
          additionButtonLabel: "选择",
          showAdditionButton: true,
          buttonDisabled: this.canInput,
          additionButtonhandel: () => {
            this.isSingle = true;
            this.types = "khqb";
            this.showOrgPer = true;
          },
        },
        {
          label: "跨行事务审批管理员中文名",
          prop: "thingUserCh",
          type: "input",
          disabled: true,
          additionButtonLabel: "选择",
          buttonDisabled: this.canInput,
          showAdditionButton: true,
          additionButtonhandel: () => {
            this.isSingle = true;
            this.types = "khsq";
            this.showOrgPer = true;
          },
        },
        {
          label: "移动服务",
          prop: "ifMove",
          type: "radio",
          disabled: this.canInput,
          radios: [
            {
              label: "启用",
              value: 1,
            },
            {
              label: "禁用",
              value: 0,
            },
          ],
        },
        {
          label: "该机构是否启用",
          prop: "validFlag",
          type: "radio",
          disabled: this.canInput,
          change: () => {
            if (this.formData.validFlag === 0) {
              this.formRules = {
                unitHeader: [
                  {
                    required: true,
                    message: "请输入机构代字",
                    trigger: "blur",
                  },
                ],
              };
            } else if (this.formData.validFlag === 1) {
              this.formRules = {
                unitHeader: [
                  {
                    required: true,
                    message: "请输入机构代字",
                    trigger: "blur",
                  },
                ],
                comDeputyCh: [
                  {
                    required: true,
                    message: "请选择机构综合代表",
                    trigger: "blur",
                  },
                ],
              };
            }
          },
          radios: [
            {
              label: "是",
              value: 1,
            },
            {
              label: "否",
              value: 0,
            },
          ],
        },
        {
          label: "是否授权同步",
          prop: "isSyn",
          type: "radio",
          disabled: this.canInput,
          radios: [
            {
              label: "是",
              value: 1,
            },
            {
              label: "否",
              value: 0,
            },
          ],
        },
        {
          label: "是否设为内部部门",
          prop: "ifInner",
          type: "radio",
          disabled: this.canInput,
          radios: [
            {
              label: "是",
              value: 1,
            },
            {
              label: "否",
              value: 0,
            },
          ],
        },
        {
          label: "该机构下组织机构是否同步商密OA系统",
          prop: "ifOaSecret",
          type: "radio",
          disabled: this.canInput,
          radios: [
            {
              label: "是",
              value: 1,
            },
            {
              label: "否",
              value: 0,
            },
          ],
        },
      ];
    },
    saveOrgInfo() {
      this.$refs.orgmForm1.validate().then((res) => {
        if (res) {
          // indexformRules
          this.$refs.orgmForm.validate().then((res1) => {
            if (res1) {
              this.$api.setting.organization
                .sendOrgManage(this.formData)
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: "保存成功",
                  });
                });
            } else {
              this.$message({
                type: "waring",
                message: "请填写必填项",
              });
            }
          });
        } else {
          this.$message({
            type: "waring",
            message: "请填写必填项",
          });
        }
      });
    },
    //  选择人员
    getperList(perList) {
      let person = [];
      let names = [];
      perList &&
        perList.map((item) => {
          person.push(item.deptHumanId);
          names.push(item.perName);
        });
      switch (this.types) {
        case "jgzh": //机构综合
          this.formData.comDeputyId = person[0] ? person[0] : 0;
          this.$set(this.formData, "comDeputyCh", names[0] ? names[0] : "");
          break;
        case "khqb": //跨行签报管理员中文名
          this.formData.signOffUserId = person[0] ? person[0] : 0;
          this.$set(this.formData, "signOffUserCh", names[0] ? names[0] : "");
          break;
        case "khsq": //跨行事务审批管理员中文名
          this.formData.thingUserId = person[0] ? person[0] : 0;
          this.$set(this.formData, "thingUserCh", names[0] ? names[0] : "");
          break;
        default:
          break;
      }
    },
    loadDate() {
      // let code = JSON.parse(this.$route.query.detail).unitCode;
      let code = JSON.parse(this.$route.query.detail).unitCode;
      // this.orgId=JSON.parse(this.$route.query.detail).unitCode
      this.$api.setting.organization
        .getOrgdetail({ unitCode: code })
        .then((res) => {
          this.formData = res.data;
          this.orgId = res.data.unitCode;
          // this.formData.ifInner=res.data.ifInner.toString()
          let rowData = JSON.parse(this.$route.query.detail);
          this.formData.unitCodeIndex = rowData.index + 1 + "";
          this.init();
        });
    },
  },
  activated() {},
  mounted() {
    this.init();
  },
  updated() {},
  created() {
    this.loadDate();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.oin {
  background-color: #efefef;
}

.organizationConfig {
  .orgInfoTable {
    padding: 8px 70px;

    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
    }

    h3 {
      margin-left: 10%;
      font-size: 17px;
      line-height: 57px;
      color: #3b85f0;
    }

    .orgInfoTableBody {
      margin-left: 9%;
    }

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
