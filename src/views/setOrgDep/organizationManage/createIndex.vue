<template>
  <div class="organizationConfig">
    <div class="handleButton">
      <el-button type="primary" @click="saveOrgInfo()">保存</el-button>
      <el-button type="primary" @click="orgBack">返回</el-button>
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
    <select-person
      :canTab="false"
      :loadingTree="true"
      :hasRadio="hasRadio"
      :offenUse="offenUse"
      :treeData="treeData"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :orgId="orgId"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择人员"
      :checkIds="checkIds"
      :checkData="checkData"
      :subOrgFlag="false"
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
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from "components/form/mForm";
import selectPerson from 'components/tree/treeTansun'
import orgTree from "components/tree/orgTree"
export default {
  name: "orgManageConfig",
  components: {
    mForm,
    selectPerson,
    orgTree
  },
  props: {},
  data () {
    return {
      title: "选择机构",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",

      orgId:'',

      formRules: {
        validFlag: [
          { required: true, message: "请选择是否启用", trigger: "change" },
        ],
        unitHeader: [
          { required: true, message: "请输入机构代字", trigger: "blur" },
        ],
        // comDeputyCh: [
        //   { required: true, message: "请选择机构综合代表", trigger: "blur" },
        // ],
      },
      // isAdd: JSON.parse(this.$route.query.isAdd),
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
      formData: {
        validFlag: 1,
        isSyn:0,
        ifInner:0
      },
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
      orgList: []
    };
  },
  computed: {},
  methods: {
    getOrgList (org) {
      if (this.orgOrDeptId == "0") {
        this.formData.manageBankId = org.id
        this.$set(this.formData, 'unitPname', org.unitName)
        this.$set(this.formData, 'unitPcode', org.id)
      }
    },
    //返回
    orgBack () {
      this.$confirm("是否确认关闭当前页面？").then(() => {
        this.$router.back();
      });
    },
    init () {
      this.indexformCfg = [
        {
          label: "机构全称",
          prop: "unitName",
          type: "input",
        },
        {
          label: "机构简称",
          prop: "unitShort",
          type: "input",
        },
        {
          label: "上级机构（组织树）",
          prop: "unitPname",
          type: "input",
          disabled: true,
          additionButtonLabel: "选择",
          showAdditionButton: true,
          additionButtonhandel: () => {
            this.title = "选择机构";
            this.isSingle = true;
            this.orgOrDept = 1;
            this.orgOrDeptId = "0";
            this.showOrgTree = true
          },

        },
        {
          label: "机构类别",
          prop: "unitTypeName",
          type: "select",
          options: this.orgList,
        },
        // {
        //     label: "机构管理员",
        //     prop: "unitAdminName",
        //     type: "input",
        //     disabled: true,
        // },
      ];
      this.formCfg = [
        {
          label: "机构代字",
          prop: "unitHeader",
          type: "input",
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
          additionButtonhandel: () => {
            // this.dialogTypeNow = "jgzh";
            // this.dialogState = true;
            this.$message({
                type: "waring",
                message: "该机构还未保存，无法选择人员",
              });
          },
        },
        {
          label: "跨行签报管理员中文名",
          prop: "signOffUserCh",
          type: "input",
          disabled: true,
          additionButtonLabel: "选择",
          showAdditionButton: true,
          additionButtonhandel: () => {
            // this.dialogTypeNow = "khqb";
            // this.dialogState = true;
            this.$message({
                type: "waring",
                message: "该机构还未保存，无法选择人员",
              });
          },
        },
        {
          label: "跨行事务审批管理员中文名",
          prop: "thingUserCh",
          type: "input",
          disabled: true,
          additionButtonLabel: "选择",
          showAdditionButton: true,
          additionButtonhandel: () => {
            // this.dialogTypeNow = "khsq";
            // this.dialogState = true;
            this.$message({
                type: "waring",
                message: "该机构还未保存，无法选择人员",
              });
          },
        },
        {
          label: "移动服务",
          prop: "ifMove",
          type: "radio",
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
    saveOrgInfo () {
      this.$refs.orgmForm1.validate().then((res) => {
        if (res) {
          // indexformRules
           this.$refs.orgmForm.validate().then((res1) => {
        if (res1) {
          // indexformRules
          this.$api.setting.organization
            .sendOrgManage(this.formData)
            .then((res) => {
              this.$message({
                type: "success",
                message: "保存成功",
              });
              this.$router.push("/setting/orgDepartment/orgManage/orgManageView");
            });
        }else{
          this.$message({
                type: "waring",
                message: "请填写必填项",
              });
        }
      });
        }else{
          this.$message({
                type: "waring",
                message: "请填写必填项",
              });
        }
      });
    },
    showCompDialog (data, status, type, params, dtype) {
      this.dialogState = false;
      switch (dtype) {
        case "jgadm": //机构管理员
          this.formData.unitAdminId = data[0].idStr;
          this.$set(this.formData, "unitAdminName", data[0].name);
          break;
        case "jgzh": //机构综合
          this.formData.comDeputyId = data[0].idStr;
          this.$set(this.formData, "comDeputyCh", data[0].name);
          break;
        case "khqb": //跨行签报管理员中文名
          this.formData.signOffUserId = data[0].idStr;
          this.$set(this.formData, "signOffUserCh", data[0].name);
          break;
        case "khsq": //跨行事务审批管理员中文名
          this.formData.thingUserId = data[0].idStr;
          this.$set(this.formData, "thingUserCh", data[0].name);
          break;
        default:
          break;
      }
    },
    loadDate () {
      let code = JSON.parse(this.$route.query.detail).unitCode;
      this.$api.setting.organization
        .getOrgdetail({ unitCode: code })
        .then((res) => {
          this.formData = res.data;
          // this.formData.ifInner=res.data.ifInner.toString()
          this.init();
        });
    },
  },
  activated () { },
  mounted () {
    this.init()
  },
  updated () { },
  created () {
    this.$api.designDictionary
      .getOrgList(
        { unitCode: JSON.parse(localStorage.getItem('userInfo')).unitId }
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
