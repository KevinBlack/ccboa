<template>
  <div class="alterDeptEdit">
    <div class="handleButton">
      <el-button type="primary" @click="$router.back()">关闭</el-button>
    </div>
    <div class="alterInfoTable">
      <div class="alterInfoTitle">新旧部门对应表</div>
      <div class="alterInfoTableBody">
        <m-form
          :formCfg="formCfg"
          :formData="formData"
          :showButton="false"
          :isInline="false"
          labelWidth="220px"
        ></m-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from "components/form/mForm";

export default {
  name: "alterDeptEdit",
  components: {
    mForm,
  },
  props: {},
  data () {
    return {
      formCfg: [
        {
          label: "机构全称",
          prop: "unitPname",
          type: "input",
          disabled: true,
        },
        {
          label: "机构ID",
          prop: "unitPcode",
          type: "input",
          disabled: true,
        },
        {
          label: "原部门名称",
          prop: "unitName",
          type: "input",
          disabled: true,
        },
        {
          label: "新部门名称",
          prop: "newUnitName",
          type: "input",
          disabled: true,
        },
        // {
        //     label: "新部门OA简称",
        //     prop: "newOaUnitShort",
        //     type: "input",
        //     disabled: true,
        // },
        // {
        //     label: "原部门OA简称",
        //     prop: "oaUnitShort",
        //     type: "input",
        //     disabled: true,
        // },
        {
          label: "原部门ID",
          prop: "unitCode",
          type: "input",
          disabled: true,
        },
        {
          label: "新部门ID",
          prop: "newUnitCode",
          type: "input",
          disabled: true,
        },
        {
          label: "原部门全层次名称",
          prop: "unitLevel",
          type: "input",
          disabled: true,
        },
        {
          label: "新部门全层次名称",
          prop: "newUnitLevel",
          type: "input",
          disabled: true,
        },
        {
          label: "原部门全层次ID",
          prop: "unitLevel",
          type: "input",
          disabled: true,
        },
        {
          label: "新部门全层次ID",
          prop: "newUnitLevel",
          type: "input",
          disabled: true,
        },
      ],
      formData: {},
    };
  },
  computed: {},
  methods: {},
  activated () { },
  mounted () { },
  created () {
    this.formData = JSON.parse(this.$route.query.detail);
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.alterDeptEdit {
  height: 100vh;

  .alterInfoTable {
    padding: 0px 70px;

    .alterInfoTitle {
      margin-bottom: 40px;
      font-size: 30px;
      line-height: 75px;
      color: #ff0502;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #ff0502;
    }

    .alterInfoTableBody {
      margin-left: 8%;
    }
  }
}
</style>
