<template>
  <div class="departConfig">
    <div class="handleButton">
      <el-button type="primary" @click="toSave">保存</el-button>
      <el-button type="primary" @click="orgBack">返回</el-button>
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
    <select-person
      :subOrgFlag="false"
      :canTab="false"
      :loadingTree="true"
      :hasRadio="hasRadio"
      :offenUse="offenUse"
      :treeData="treeData"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择人员"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    ></select-person>
    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      :seletSelf="seletSelf"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from "components/form/mForm";
// import selectPerson from "components/tree/tree-fawen";
import selectPerson from 'components/tree/treeTansun'
import orgTree from 'components/tree/shiwuOrgTree'
export default {
  readonly: true,
  components: {
    mForm,
    selectPerson,
    orgTree
  },
  props: {},
  data () {
    return {
      title: '选择部门',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '0',
      seletSelf: 0,
      canInput: true,
      formCfg: [],
      formRules: {
        unitPname: [
          { required: true, message: "请选择直属上级组织", trigger: "blur" },
        ],
        unitName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        unitShort: [
          { required: true, message: "请输入部门简称", trigger: "blur" },
        ],
        unitHeader: [
          { required: false, trigger: "blur" },
        ],
        comDeputyCh: [
          { required: false, trigger: "blur" },
        ],
      },
      formData: {
        ifInner: 0,
        validFlag: 1,
        ifProtect:0
      },
      orgList: [],
      deptType: [],
      treeData: [], //人员树
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: false,
    };
  },
  computed: {},
  methods: {
    getOrgList (org) {
      if (org && org.unitClass == 1) {
        this.formRules = {
          unitPname: [
            { required: true, message: "请选择直属上级组织", trigger: "blur" },
          ],
          unitName: [
            { required: true, message: "请输入部门名称", trigger: "blur" },
          ],
          unitShort: [
            { required: true, message: "请输入部门简称", trigger: "blur" },
          ],
          unitHeader: [
            { required: true, message: "请输入部门代字", trigger: "blur" },
          ],
        }
      } else {
        this.formRules = {
          unitPname: [
            { required: true, message: "请选择直属上级组织", trigger: "blur" },
          ],
          unitName: [
            { required: true, message: "请输入部门名称", trigger: "blur" },
          ],
          unitShort: [
            { required: true, message: "请输入部门简称", trigger: "blur" },
          ],
          unitHeader: [
            { required: false, trigger: "blur" },
          ],
          comDeputyCh: [
            { required: false, trigger: "blur" },
          ],
        }
      }
      if (this.orgOrDeptId == '0') {
        // this.mformData.manageBankId = org.id
        // this.$set(this.formData, 'manageBank', org.unitName)
        // this.$set(this.formData, 'manageBankId', org.id)
        // console.log(this.formData.manageBank)
        // this.orgSelect()
        // this.initData()
      } else {
        let deptId = []
        let deptName = []
        this.$nextTick(() => {
          this.$set(this.formData, 'unitPname', org.unitName)
          this.$set(this.formData, 'unitPcode', org.id)
        })
      }
    },
    selectOrg () {
      this.title = '选择机构'
      this.isSingle = true
      this.orgOrDept = 1
      this.orgOrDeptId = '0'
      this.showOrgTree = true
    },
    toSave () {
      this.$refs.mForm.validate().then((res) => {
        if (res) {
          //   this.formData.oaUnitShort = this.formData.unitName
          this.$api.setting.organization
            .sendDeparentConfig(this.formData)
            .then((res) => {
              //   console.log("成功");
              this.$message({ type: "success", message: "保存成功" });
              this.$router.push("/setting/orgDepartment/departManage/depManageView");
            });
        } else {
          this.$message({
            type: 'error',
            message: "请填写必填项"
          })
        }
      })
    },
    orgBack () {
      this.$confirm("是否确认关闭当前页面？").then(() => {
        this.$router.back();
      });
    },
    toEdit () {
      this.isAdd = !this.isAdd;
      this.canInput = false;
      this.init();
    },
    init () {
      this.formCfg = [

        {
          label: "部门名称",
          prop: "unitName",
          type: "input",
          showAdditionSpan: true,
          additionSpan: `例如：住房金融与个人信贷部`,
          additionSpanStyle: {
            color: "#F5150B",
            display: 'block',
          },
        },
        {
          label: "部门简称",
          prop: "unitShort",
          type: "input",
          showAdditionSpan: true,
          additionSpan: `例如：房金部`,
          additionSpanStyle: {
            color: "#F5150B",
            display: 'block',
          },
        },
        // {
        //     label: "部门层次（级别）",
        //     prop: "unitLevel",
        //     type: "input",
        //     disabled: true,
        // },
        {
          label: "直属上级组织",
          prop: "unitPname",
          type: "input",
          disabled: true,
          showAdditionButton: true,
          additionButtonLabel: "选择",
          additionButtonhandel: () => {
            this.title = '选择直属上级组织'
            this.isSingle = true
            this.orgOrDept = 2
            this.orgOrDeptId = JSON.parse(localStorage.getItem('userInfo')).unitId
            this.seletSelf = 1
            this.showOrgTree = true
          },
        },
        {
          label: "部门类别",
          prop: "deptType",
          type: "radio",
          width: "300px",
          radios: this.deptType
        },
        {
          label: "部门代字",
          prop: "unitHeader",
          type: "input",
          additionSpan: `例如:'房'`,
          showAdditionSpan: true,
          additionSpanStyle: {
            color: "#F5150B",
            display: 'block',
          },
        },
        {
          label: "是否启用部门",
          prop: "validFlag",
          type: "radio",
          rule: 'must',
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
          radios: [
            {
              label: "是",
              value: '1',
            },
            {
              label: "否",
              value: '0',
            },
          ],
        },
        {
          label: "是否为内设部门",
          prop: "ifInner",
          type: "radio",
          additionSpan: `内设部门:下级机构”作为上级机构的"部门",为区分正常"部门"与特殊"机构"的标志,主要是解决印章管理模块使用`,
          showAdditionSpan: true,
          additionSpanStyle: {
            color: "#F5150B",
            display: 'block',
          },
          change: () => {
            console.log("radio", this.formData.ifInner)
            if (this.formData.ifInner === 0) {
              this.formCfg.splice(7, 1)
            } else if (this.formData.ifInner === 1) {
              this.formCfg.splice(7, 0, {
                label: "机构部门代字",
                prop: "unitDeptHeader",
                type: "input",
                additionSpan: `部门机构代字:对内设部门使用印章是生成编号，特殊配置唯一代字`,
                showAdditionSpan: true,
                additionSpanStyle: {
                  color: "#F5150B",
                  display: 'block',
                },
              })
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
          showAdditionSpan: true,
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
          prop: "deptHeadsName",
          type: "textarea",
          showAdditionButton: true,
          additionButtonLabel: "选择",
          additionButtonhandel: () => {
            // this.dialogTypeNow = "zheng";
            // this.singelCheckF = false;
            // this.dialogState = true;
             this.$message({
                type: "waring",
                message: "该部门还未保存，无法选择人员",
              });
          },
        },
        {
          label: "部门副职",
          prop: "deptDeputysName",
          type: "textarea",
          showAdditionButton: true,
          additionButtonLabel: "选择",
          additionButtonhandel: () => {
            // this.dialogTypeNow = "fu";
            // this.singelCheckF = false;
            // this.dialogState = true;
             this.$message({
                type: "waring",
                message: "该部门还未保存，无法选择人员",
              });
          },
        },
        {
          label: "部门综合代表",
          prop: "comDeputyCh",
          type: "input",
          showAdditionButton: true,
          additionButtonLabel: "选择",
          additionButtonhandel: () => {
            // this.dialogTypeNow = "zong";
            // this.singelCheckF = true;
            // this.dialogState = true;
             this.$message({
                type: "waring",
                message: "该部门还未保存，无法选择人员",
              });
          },
        },
      ];
      // if (this.formData.unitChange == "0") {
      //     this.formCfg.splice(8, 1);
      // }
    },
    loadDate () {

    },
    //获取部门层级
    deparLevel () {
      this.$api.setSysConfig
        .deparLevel(
          {
            searchData: this.searchData,
            ...this.formData
          }
        )
        .then((res) => {
          this.pagination.total = res.total;
          let opArr = [];
          if (this.moduleId == "字典维护") {
            this.tableData = res.data;
          } else if (this.moduleId == "数据维护") {
            this.tableData = res.data.two || res.data;
            if (res.data.one && res.data.one.length > 0) {
              this.optionList = deepClone(res.data.one)
              this.optionList && this.optionList.map((item) => {
                if (item.iscodeName != "") {
                  opArr.push(item.isCodeName);
                }
              });
              this.optionsData = deepClone(opArr);
            }
          } else {
            return;
          }
          this.initData();
        });
    },
    showCompDialog (data, status, type, params, dtype) {
      this.dialogState = false;
      let person = [];
      let names = [];
      data.map((item) => {
        person.push({ humanId: item.idStr, humanName: item.name });
        names.push(item.name);
      });
      switch (dtype) {
        case "zheng":
          this.formData.deptHeads = person;
          this.$set(this.formData, "deptHeadsName", names.join(","));
          break;
        case "fu":
          this.formData.deptDeputys = person;
          this.$set(this.formData, "deptDeputysName", names.join(","));
          break;
        case "zong":
          this.formData.comDeputyId = data[0].idStr;
          this.$set(this.formData, "comDeputyCh", data[0].name);
          break;
        default:
          break;
      }
    },
  },
  activated () {
  },
  mounted () {
    this.init()
  },
  created () {
    this.$api.designDictionary.getDeptList({ deptConfig: {} }).then(res => {
      res.data.forEach(item => {
        let data = {}
        data.label = item.deptTypeId,
          data.value = item.deptTypeName
        this.deptType.push(data)
      })
      this.init();
    })
    this.$api.designDictionary
      .getOrgList(
        { code: JSON.parse(localStorage.getItem('userInfo')).firstUnitId }
      )
      .then((res) => {
        res.data && res.data.map(item => {
          this.orgList.push({ label: item.unitTypeName, value: item.id })
          // this.orgList[item.id]=item.unitTypeName
        })
      });
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
