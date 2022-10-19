/**
* create by zx on 2020-6-30 09:44
* 类注释：人员详细信息
* 备注：
*/
<template>
  <div class="detailPerson">
    <div class="handleButton">
      <el-button type="primary" @click="configOrgInfo()">编辑</el-button>
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">机构信息表</div>
      <!-- 机构索引信息 -->
      <div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark titleFont">机构索引信息</div>
          </el-col>
        </el-row>
        <el-row :gutter="5" v-for="item in 10" :key="item">
          <el-col :span="6">
            <div class="grid-content bg-purple normalFont">姓名</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light normalFont">张三</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple normalFont">年龄</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light normalFont">23</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "detailPerson",
  components: {},
  props: {},
  data () {
    return {
      detail: JSON.parse(this.$route.query.detail)
    }
  },
  computed: {},
  methods: {
    configOrgInfo () {
      this.$intent.go(this, { name: "editPerson", query: { detail: JSON.stringify(this.detail) } })
    }
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
.detailPerson {
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
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
    }
  }
}
</style>
