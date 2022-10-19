<!--
 * @Author: wy
 * @Date: 2020-08-31 14:20:09
 * @LastEditTime: 2020-10-08 15:25:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\themeLexicon\index.vue
-->
<template>
  <div class="themeLexiconSet">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="配置类别词" name="classifier">
        <classifier v-if="tabs.classifier"></classifier>
      </el-tab-pane>
      <el-tab-pane label="配置类属词" name="genus">
        <genus v-if="tabs.genus"></genus>
      </el-tab-pane>
      <el-tab-pane label="配置公共类属词" name="publicGenus">
        <publicGenus v-if="tabs.publicGenus"></publicGenus>
      </el-tab-pane>
      <el-tab-pane label="配置文种词" name="practice">
        <practice v-if="tabs.practice"></practice>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import classifier from './classifier/index'
import genus from './genus/index'
import practice from './practice/index'
import publicGenus from './public-genus/index'
export default {
  name: 'themeLexiconSet',
  components: {
    classifier,
    genus,
    practice,
    publicGenus
  },
  props: {},
  data () {
    return {
      activeName: 'classifier',
      tabs: {
        classifier: false,
        genus: false,
        practice: false,
        publicGenus: false,
      }
    }
  },
  computed: {},
  methods: {
    handleClick (tab) {
      for (const key in this.tabs) {
        if (this.tabs.hasOwnProperty(key)) {
          this.$set(this.tabs, key, false)
        }
      }
      this.$set(this.tabs, tab.name, true)
    }
  },
  mounted () {
    if (this.$route.query.activeName) {
      let activeNam = this.$route.query.activeName
      this.activeName = activeNam
      this.tabs[activeNam] = true
    } else {
      this.tabs.classifier = true
    }
  },
  created () {
  }
}
</script>
<style scoped lang='less' rel='stylesheet/less'>
</style>
