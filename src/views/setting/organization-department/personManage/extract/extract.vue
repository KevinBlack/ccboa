<!--
 * @Author: your name
 * @Date: 2020-08-13 14:59:29
 * @LastEditTime: 2020-09-24 14:20:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\setting\organization-department\personManage\extract\extract.vue
--> 
/**
* create by zx on 2020-6-29 10:47
* 类注释：提取人员
* 备注：
*/
<template>
  <div class="extract">
    <el-row>
      <el-button type="primary" @click="pullPer">提取</el-button>
      <el-button type="primary" @click="$router.go(-1)">退出</el-button>
    </el-row>
    <div style="text-align: center;width:40%;margin: 0 auto">
      <p class="title">人员提取</p>
      <el-form label-width="80px">
        <el-form-item label="提取方式">
          <el-radio-group v-model="perInfo.type">
            <el-radio :label="3">个人</el-radio>
            <el-radio :label="6">精准</el-radio>
            <el-radio :label="9">模糊</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="填写层次">
          <el-input v-model="perInfo.levelInfo" style="width:100%" type="text"></el-input>
        </el-form-item>
        <el-form-item label="填写说明">
          <el-input v-model="perInfo.textInfo" style="width:100%;" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "extract",
  components: {},
  props: {},
  data() {
    return {
      perInfo: {
        levelInfo: "",
        textInfo: "",
        type: "",
      },
    };
  },
  computed: {},
  methods: {
    pullPer() {
      console.log(this.perInfo);
    },
  },
  activated() {},
  mounted() {},
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.extract {
  font-size: 25px;
  padding: 39px 48px 50px;
  .title {
    width: 100%;
    height: 70px;
    color: #2b66e3;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }
}
</style>
