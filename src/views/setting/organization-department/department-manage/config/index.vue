<template>
  <div class="departConfig">
    <div class="handleButton">
      <el-button type="primary" @click="toEdit()" v-if="!isAdd">编辑</el-button>
      <el-button type="primary" v-if="isAdd" @click="toSave">保存</el-button>
      <el-button type="primary" @click="orgBack">返回</el-button>
      <el-button type="danger" @click="toDelete">注销</el-button>
    </div>

    <div class="orgInfoTable">
      <div class="orgInfoTitle">部门信息表</div>
      <div class="orgInfoTableBody">
        <m-form
          ref="mForm"
          :formCfg="formCfg"
          :formRules="formRules"
          :formData="formData"
          :showButton="false"
          :isInline="false"
          labelWidth="220px"
        ></m-form>
      </div>
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
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from "components/form/mForm";
// import selectPerson from "components/tree/tree-fawen";
// import selectPerson from "@/components/tree/tree-cyTansun";
import treePerson from "components/tree/sysTreePerson";

export default {
  readonly: true,
  components: {
    mForm,
    // selectPerson,
    treePerson,
  },
  props: {},
  data() {
    return {
      // isEdit: [],
      isRequired: false,
      isAdd: JSON.parse(this.$route.query.isAdd),
      canInput: true,
      formCfg: [],
      orgId: JSON.parse(this.$route.query.detail).unitCode,
      formRules: {},
      formData: {},
      deptType: [],
      treeData: [], //人员树
      types: "",
      showOrgPer: false,
      unitClass: 2,
      humanType: 3,
      isNeedChild: "no",
      unitCode: JSON.parse(this.$route.query.detail).unitCode,
      isSingle: false,
      selectDept: [],
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
    initFormRules() {
      this.formRules = {
        unitName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        unitShort: [
          { required: true, message: "请输入部门简称", trigger: "blur" },
        ],
        unitHeader: [
          {
            required: this.isRequired,
            message: "请输入部门代字",
            trigger: "blur",
          },
        ],
        // comDeputyCh: [
        //   { required: this.isRequired, message: "请选择部门综合代表", trigger: "blur" },
        // ],
      };
    },
    toDelete() {
      this.$confirm("是否确定注销当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.setting.organization
            .sendDeparentConfig({
              unitCode: this.formData.unitCode,
              validFlag: 0,
            })
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
    toSave() {
      this.$refs.mForm.validate().then((res,object) => {
        console.log(res,object)
        if (res) {
          this.$api.setting.organization
            .sendDeparentConfig(this.formData)
            .then((res) => {
              this.$message({ type: "success", message: "保存成功" });
              this.isAdd = !this.isAdd;
              this.canInput = true;
              if (this.formData.ifInner == 1) {
                this.init1();
              } else {
                this.init();
              }
            });
        }else{
          this.$message({
            type: "warning",
            message: "请填写必填项后保存"
          });
        }
      });
    },
    orgBack() {
      this.$confirm("是否确认关闭当前页面？").then(() => {
        // this.$router.back();
        if (this.$route.query.flag == 1) {
          this.$intent.go(this, {
            path: "/setting/orgDepartment/departManage/depManageView",
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
            path: "/setting/orgDepartment/departManage/depManageView",
          });
        }
      });
    },
    toEdit() {
      this.isAdd = !this.isAdd;
      this.canInput = false;
      if (this.formData.ifInner == 1) {
        this.init1();
      } else {
        this.init();
      }
    },
    init() {
      this.formCfg = [
        {
          label: "部门序号",
          prop: "unitCodeIndex",
          type: "input",
          showAdditionSpan: true,
          additionSpan: `系统自动生成`,
          disabled: true,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
        },
        {
          disabled: this.canInput,
          label: "部门名称",
          prop: "unitName",
          type: "input",
          showAdditionSpan: true,
          additionSpan: `例如：住房金融与个人信贷部`,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
        },
        {
          disabled: this.canInput,
          label: "部门简称",
          prop: "unitShort",
          type: "input",
          showAdditionSpan: true,
          additionSpan: `例如：房金部`,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
        },
        /* {
             disabled: this.canInput,
             label: "OA部门简称",
             prop: "oaUnitShort",
             type: "input",
             showAdditionSpan: true,
             additionSpanStyle: {
                 color: "#F5150B",
             },
         },*/

        {
          label: "部门层次（级别）",
          prop: "unitLevel",
          type: "input",
          disabled: true,
        },
        {
          label: "直属上级组织",
          prop: "unitPname",
          type: "input",
          disabled: true,
        },

        {
          label: "部门类别",
          prop: "deptType",
          type: "radio",
          width: "300px",
          disabled: this.canInput,
          radios: this.deptType,
        },
        {
          label: "部门代字",
          prop: "unitHeader",
          type: "input",
          additionSpan: `例如:'房'`,
          showAdditionSpan: true,
          disabled: this.canInput,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
        },
        {
          label: "是否启用部门",
          prop: "validFlag",
          type: "radio",
          rule: "must",
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
        // {
        //   label: "是否授权同步",
        //   prop: "isSyn",
        //   type: "radio",
        //   disabled: this.canInput,
        //   radios: [
        //     {
        //       label: "是",
        //       value: 1,
        //     },
        //     {
        //       label: "否",
        //       value: 0,
        //     },
        //   ],
        // },
        {
          label: "是否授为特殊表头部门",
          prop: "isSpecialHead",
          type: "radio",
          disabled: this.canInput,
          radios: [
            {
              label: "是",
              value: "1",
            },
            {
              label: "否",
              value: "0",
            },
          ],
        },
        {
          label: "是否为内设部门",
          prop: "ifInner",
          type: "radio",
          disabled: this.canInput,
          additionSpan: `内设部门：“下级机构”作为上级机构的“部门”，为区分正常“部门”与特殊“机构”的标志，主要是解决印章管理模块使用`,
          showAdditionSpan: true,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
          change: () => {
            if (this.formData.ifInner == 1) {
              this.init1();
            } else {
              this.init();
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
        // {
        //     label: "部门机构代字",
        //     prop: "unitDeptHeader",
        //     type: "input",
        //     disabled: this.canInput,
        //     showAdditionSpan: true,
        //     additionSpan: "部门机构代字：“对内设部门使用印章是生成编号，特殊配置唯一代字”",
        //     additionSpanStyle: {
        //         color: "#F5150B",
        //     },
        // },
        {
          label: "是否需要消保审查",
          prop: "ifProtect",
          type: "radio",
          rule: "must",
          showAdditionSpan: true,
          disabled: this.canInput,
          change: () => {
            // if (this.formData.ifProtect == 0) {
            //    this.$message({type: "error",showClose: true, message: "请经过消保审查后重新提交",});
            // } 
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
          label: "部门成员",
          disabled: true,
          prop: "userNames",
          type: "textarea",
        },
        {
          label: "部门正职",
          disabled: true,
          prop: "deptHeadsName",
          type: "textarea",
          showAdditionButton: true,
          additionButtonLabel: "选择",
          buttonDisabled: this.canInput,
          additionButtonhandel: () => {
            this.isSingle = false;
            this.types = "zheng";
            this.backDialogData(this.formData.deptHeads);
            this.showOrgPer = true;
          },
        },
        {
          label: "部门副职",
          disabled: true,
          prop: "deptDeputysName",
          type: "textarea",
          showAdditionButton: true,
          additionButtonLabel: "选择",
          buttonDisabled: this.canInput,
          additionButtonhandel: () => {
            this.types = "fu";
            this.isSingle = false;
            this.backDialogData(this.formData.deptDeputys);
            this.showOrgPer = true;
          },
        },
        {
          label: "部门综合代表",
          disabled: true,
          prop: "comDeputyCh",
          type: "input",
          showAdditionButton: true,
          additionButtonLabel: "选择",
          buttonDisabled: this.canInput,
          additionButtonhandel: () => {
            this.types = "zong";
            this.isSingle = true
            this.backDialogData(this.formData.comDeputys);
            this.showOrgPer = true;
          },
        },
      ];
    },
    init1() {
      this.formCfg = [
        {
          label: "部门序号",
          prop: "unitCodeIndex",
          type: "input",
          showAdditionSpan: true,
          additionSpan: `系统自动生成`,
          disabled: true,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
        },
        {
          disabled: this.canInput,
          label: "部门名称",
          prop: "unitName",
          type: "input",
          showAdditionSpan: true,
          additionSpan: `例如：住房金融与个人信贷部`,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
        },
        {
          disabled: this.canInput,
          label: "部门简称",
          prop: "unitShort",
          type: "input",
          showAdditionSpan: true,
          additionSpan: `例如：房金部`,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
        },
        /* {
             disabled: this.canInput,
             label: "OA部门简称",
             prop: "oaUnitShort",
             type: "input",
             showAdditionSpan: true,
             additionSpanStyle: {
                 color: "#F5150B",
             },
         },*/

        {
          label: "部门层次（级别）",
          prop: "unitLevel",
          type: "input",
          disabled: true,
        },
        {
          label: "直属上级组织",
          prop: "unitPname",
          type: "input",
          disabled: true,
        },

        {
          label: "部门类别",
          prop: "deptType",
          type: "radio",
          width: "300px",
          disabled: this.canInput,
          radios: this.deptType,
        },
        {
          label: "部门代字",
          prop: "unitHeader",
          type: "input",
          additionSpan: `例如:'房'`,
          showAdditionSpan: true,
          disabled: this.canInput,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
        },
        {
          label: "是否启用部门",
          prop: "validFlag",
          type: "radio",
          rule: "must",
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
        // {
        //   label: "是否授权同步",
        //   prop: "isSyn",
        //   type: "radio",
        //   disabled: this.canInput,
        //   radios: [
        //     {
        //       label: "是",
        //       value: 1,
        //     },
        //     {
        //       label: "否",
        //       value: 0,
        //     },
        //   ],
        // },
        {
          label: "是否授为特殊表头部门",
          prop: "isSpecialHead",
          type: "radio",
          disabled: this.canInput,
          radios: [
            {
              label: "是",
              value: "1",
            },
            {
              label: "否",
              value: "0",
            },
          ],
        },
        {
          label: "机构部门代字",
          prop: "unitDeptHeader",
          type: "input",
          disabled: this.canInput,
          showAdditionSpan: true,
          additionSpan:
            "机构部门代字：“对内设部门使用印章是生成编号，特殊配置唯一代字”",
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
        },
        {
          label: "是否为内设部门",
          prop: "ifInner",
          type: "radio",
          disabled: this.canInput,
          additionSpan: `内设部门：“下级机构”作为上级机构的“部门”，为区分正常“部门”与特殊“机构”的标志，主要是解决印章管理模块使用`,
          showAdditionSpan: true,
          additionSpanStyle: {
            color: "#F5150B",
            display: "block",
          },
          change: () => {
            if (this.formData.ifInner == 1) {
              console.log('1')
              this.init1();
            } else {
              this.init();
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
          label: "是否需要消保审查",
          prop: "ifProtect",
          type: "radio",
          rule: "must",
          showAdditionSpan: true,
          disabled: this.canInput,
          change: () => {
            // if (this.formData.ifProtect == 0) {
            //    this.$message({type: "error",showClose: true, message: "请经过消保审查后重新提交",});
            // } 
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
          label: "部门成员",
          disabled: true,
          prop: "userNames",
          type: "textarea",
        },
        {
          label: "部门正职",
          disabled: true,
          prop: "deptHeadsName",
          type: "textarea",
          showAdditionButton: true,
          additionButtonLabel: "选择",
          buttonDisabled: this.canInput,
          additionButtonhandel: () => {
            this.isSingle = false;
            this.types = "zheng";
            this.backDialogData(this.formData.deptHeads);
            this.showOrgPer = true;
          },
        },
        {
          label: "部门副职",
          disabled: true,
          prop: "deptDeputysName",
          type: "textarea",
          showAdditionButton: true,
          additionButtonLabel: "选择",
          buttonDisabled: this.canInput,
          additionButtonhandel: () => {
            this.types = "fu";
            this.isSingle = false;
            this.backDialogData(this.formData.deptDeputys);
            this.showOrgPer = true;
          },
        },
        {
          label: "部门综合代表",
          disabled: true,
          prop: "comDeputyCh",
          type: "input",
          showAdditionButton: true,
          additionButtonLabel: "选择",
          buttonDisabled: this.canInput,
          additionButtonhandel: () => {
            this.types = "zong";
            this.isSingle = true;
            this.backDialogData([]);
            this.showOrgPer = true;
          },
        },
      ];
    },
    // 返显
    backDialogData(arr) {
      this.selectDept = [];
      let tempArr = [];
      if (arr instanceof Array && arr.length > 0) {
        arr.forEach((item) => {
          if (item.humanId && item.humanName) {
            let obj = {};
            obj.deptHumanId = item.humanId.toString();
            obj.perName = item.humanName;
            obj.disabled = true;
            tempArr.push(obj);
          }
        });
        this.selectDept = tempArr;
      }
    },
    loadDate() {
      let code = JSON.parse(this.$route.query.detail).unitCode;
      this.$api.setting.organization
        .getDepDetail({ unitCode: code })
        .then((res) => {
          console.log(res,'yanglipeng')
          this.checkData = [];
          if(!res.data.unitAndConfig.hasOwnProperty('ifProtect')){
             res.data.unitAndConfig.ifProtect=0;
          }
          this.formData = res.data.unitAndConfig;
          this.isRequired =
            res.data.unitAndConfig.isFristDept === "1" ? true : false;
          this.initFormRules();
          this.$set(
            this.formData,
            "deptType",
            res.data.unitAndConfig.deptType
              ? res.data.unitAndConfig.deptType
              : ""
          );
          if (this.formData.ifInner == 1) {
            this.init1();
          } else {
            this.init();
          }
          let deptHeadsNames = [];
          let zIds = []; //部门正职id
          this.formData.deptHeads.map((item) => {
            deptHeadsNames.push(item.humanName);
          });
          this.$set(this.formData, "deptHeadsName", deptHeadsNames.join(","));
          let deptDeputysNames = [];
          this.formData.deptDeputys.map((item) => {
            deptDeputysNames.push(item.humanName);
          });
          this.$set(
            this.formData,
            "deptDeputysName",
            deptDeputysNames.join(",")
          );
          // 部门综合代表
          // let Buzh = []
          // this.formData.comDeputyIds.map((item) => {
          //   Buzh.push(item.humanName);
          // });
          // this.$set(
          //   this.formData,
          //   "comDeputyCh",
          //   Buzh.join(",")
          // );
          this.getPersonList();
          let rowData = JSON.parse(this.$route.query.detail);
          this.formData.unitCodeIndex = rowData.index + 1 + "";
        });
    },
    getPersonList() {
      this.$api.setting.organization
        .getPeopleList({
          humanUnit: JSON.parse(this.$route.query.detail).unitCode,
          validFlag: 1,
        })
        .then((res) => {
          let names = [];
          res.data.map((item) => {
            names.push(item.humanName);
          });
          this.$set(this.formData, "userNames", names.join(","));
          this.$api.designDictionary
            .getDeptList({ deptConfig: {} })
            .then((res) => {
              res.data.forEach((item) => {
                let data = {};
                (data.label = item.deptTypeId),
                  (data.value = item.deptTypeName);
                this.deptType.push(data);
              });
              if (this.formData.ifInner == 1) {
                this.init1();
              } else {
                this.init();
              }
            });
        });
    },
    //  选择人员
    getperList(perList) {
      console.log(perList)
      let person = [];
      let names = [];
      perList &&
        perList.map((item) => {
          person.push({ humanId: item.deptHumanId, humanName: item.perName });
          names.push(item.perName);
        });
      switch (this.types) {
        case "zheng":
          this.formData.deptHeads = person;
          this.$set(this.formData, "deptHeadsName", names.join(","));
          break;
        case "fu":
          this.formData.deptDeputys = person;
          this.$set(this.formData, "deptDeputysName", names.join(","));
          break;
        case "zong":
          this.formData.comDeputys = person;
          this.$set(
            this.formData,
            "comDeputyCh",
            names.join(",")
          );
          break;
        default:
          break;
      }
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.loadDate();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-input.is-disabled .el-input__inner input {
  background-color: #efefef !important;
}

.departConfig {
  .orgInfoTable {
    padding: 0px 70px;

    .orgInfoTitle {
      margin-bottom: 40px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
    }

    .orgInfoTableBody {
      margin-left: 8%;
    }
  }
}
</style>
