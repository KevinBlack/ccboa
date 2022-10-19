/**
* create by zx on 2020-6-29 14:16
* 类注释：导入uass人员
* 备注：
*/
<template>
  <div class="importUass">

    <div class="organizationConfig">
      <div class="handleButton">
        <el-button type="primary" @click="saveOrgInfo()">确定</el-button>
        <el-button type="primary" @click="$router.go(-1)">取消</el-button>
      </div>
      <div class="orgInfoTable">
        <div class="orgInfoTitle">导入UASS账户</div>
        <div>
          <label>导入execl文件</label>
          <input type="file"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "importUass",
    components: {},
    props: {},
    data() {
      return {}
    },
    computed: {},
    methods: {},
    activated() {
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .importUass {
    .orgInfoTable {
      padding: 21px 70px;
      .orgInfoTitle {
        margin-bottom: 15px;
        font-size: 30px;
        line-height: 84px;
        color: #3b85f0;
        font-weight: 600;
        text-align: center;
      }
    }
  }
</style>
