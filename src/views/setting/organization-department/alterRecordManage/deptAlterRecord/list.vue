<template>
  <div class="deptAlterLists">
    <div class="handleButton">
      <el-button type="primary" @click="closeOrgList">关闭</el-button>
      <el-button type="primary" @click="configOrgInfo()">编辑</el-button>
    </div>
    <div class="deptAlterTable">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark titleFont">新旧部门对应表</div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">机构全称</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">11</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">机构ID</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">11</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">原部门名称</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">22</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">新部门名称</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">22</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">原部门ID</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">33</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">新部门ID</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">44</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">原部门全层次名称</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">55</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">新部门全层次名称</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">66</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">原部门全层次ID</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">55</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">新部门全层次ID</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">66</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">备注</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light normalFont">77</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'deptAlterLists',
  components: {
  },
  props: {},
  data () {
    return {
      num: 2,
      detail: JSON.parse(this.$route.query.detail || "{}")
    }
  },
  computed: {},
  methods: {
    configOrgInfo () {
      this.$intent.go(this, { name: "alterDeptEdit", query: { detail: JSON.stringify(this.detail) } })
    },
    closeOrgList () {
      this.$router.push({
        path: '/setting/orgDepartment/alterRecord/alterDeptRecord'
      })
    },
  },
  activated () {
  },
  mounted () {
  },
  created () {

  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.deptAlterLists {
  height: 100vh;

  .deptAlterTable {
    margin-top: 10px;
    padding: 8px 70px;
    .deptInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #ff0502;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #ff0502;
    }
    .el-row {
      margin-bottom: 3px;
      .el-row:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #d8e8f4;
    }
    .bg-purple {
      color: #3b85f0;
      background: #e5f0fc;
    }
    .bg-purple-light {
      background: #e5f0fc;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 40px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .titleFont {
      font-size: 17px;
      text-align: center;
      line-height: 43px;
      font-weight: 600;
    }
    .normalFont {
      padding-left: 34px;
      font-size: 14px;
      text-align: left;
      line-height: 36px;
      margin-bottom: 6px;
    }
  }
}
</style>