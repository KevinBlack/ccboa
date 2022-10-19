/**
* create by zx on 2020-6-30 10:39
* 类注释：新增
* 备注：
*/
<template>
  <div class="add">
    <div class="handleButton">
      <el-button type="primary" @click="save()">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">文件交换人员配置</div>
    </div>
    <div class="detail">
      <el-form :inline="false" :model="formData">
        <el-form-item label="部门类型">
          <el-radio-group v-model="formData.a">
            <el-radio :label="3">部门</el-radio>
            <el-radio :label="6">领导</el-radio>
            <el-radio :label="9">分行</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input style="width: 300px;margin-right: 10px" v-model="formData.b"></el-input>
          <el-button type="primary">选择部门</el-button>
          <el-button type="primary">清空</el-button>
        </el-form-item>
        <el-form-item label="管理人员">
          <el-input style="width: 300px;margin-right: 10px" v-model="formData.c"></el-input>
          <el-button type="primary">选择人员</el-button>
          <el-button type="primary">清空</el-button>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-radio-group v-model="formData.d">
            <el-radio :label="3">A</el-radio>
            <el-radio :label="6">B</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "add",
  components: {},
  props: {},
  data () {
    return {
      formData: { a: 6 }
    }
  },
  computed: {},
  methods: {},
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.add {
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
  }
  .detail {
    margin-left: 35%;
  }
}
</style>
