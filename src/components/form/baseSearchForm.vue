/**
* create by zx on 2020/8/17 09:57
* 类注释：搜索基类
* 备注：
*/
<template>
  <div class="baseSearchForm">
    <el-row>
      <slot name="oneLine"></slot>
      <el-col :span="6" style="text-align:right">
        <el-col v-if="!show" class="arrowup">
          <el-button type="primary" @click="submit">开始搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button type="info" size="small" @click="show=!show">
            <i class="el-icon-arrow-down el-icon--left"></i> 展开
          </el-button>
        </el-col>
      </el-col>
    </el-row>
    <slot name="more" v-if="show"></slot>
    <el-row style="text-align: center;" v-if="show">
      <el-button type="primary" @click="submit">开始搜索</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-row>
    <el-row>
      <el-col class="down" v-if="show">
        <el-button type="info" size="small" @click="show=!show">
          <i class="el-icon-arrow-up el-icon--left"></i> 收起
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "baseSearchForm",
  components: {},
  props: {},
  data () {
    return {
      show: false,
    }
  },
  computed: {},
  methods: {
    submit () {
      this.$emit("submit")
    },
    reset () {
      this.$emit("reset")
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
.down {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
