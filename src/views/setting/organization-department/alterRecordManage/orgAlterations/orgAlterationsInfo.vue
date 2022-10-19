<template>
  <div class="alterOrgEdit">
    <div class="handleButton">
      <el-button type="primary" @click="$router.back()">关闭</el-button>
    </div>
    <div class="alterInfoTable">
      <div class="alterInfoTitle">机构变更记录</div>
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
  name: "alterOrgEdit",
  components: {
    mForm,
  },
  props: {},
  data () {
    return {
      formCfg: [
        {
          label: "操作人",
          prop: "operatorName",
          type: "input",
          disabled: true,
        },
        {
          label: "操作时间",
          prop: "operateTime",
          type: "input",
          disabled: true,
        },
        {
          label: "操作类型",
          // prop: "operateType",
          prop: "operateType",
          type: "input",
          disabled: true,
        },
        /*{
          label: "操作人IP",
          prop: "operateIp",
          type: "input",
          disabled: true,
        },*/
        {
          label: "变更内容",
          prop: "remark",
          type: "textarea",
          rows: 3,
          disabled: true,
        },
      ],
      formData: JSON.parse(this.$route.query.detail),
    };
  },
  computed: {},
  methods: {
    saveOrgIndexInfo () {
      this.$router.push({
        path: "/setting/orgDepartment/alterRecord/orgAlterRecord/list",
      });
    },
  },
  activated () {
  },
  mounted () {
  },
  created () {
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.alterOrgEdit {
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
