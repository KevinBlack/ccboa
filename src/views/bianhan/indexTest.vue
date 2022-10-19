<!--
 * @Author: liyaling
 * @Date: 2020-11-07 11:00:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\sysConfig\MenuPermissionConfig\index.vue
-->
<template>
    <div class="menuPermissionConfig">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已授权" name="authorized">
         <authorized v-if="tabs.authorized"></authorized>
        </el-tab-pane>
        <el-tab-pane label="未授权" name="unauthorized">
         <unauthorized v-if="tabs.unauthorized"></unauthorized>
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  
  <script>
  // import authorized from './permissionAssignment/authorized'
  import authorized from 'views/bianhan/teset1'
  // import unauthorized from './permissionAssignment/unauthorized'
  import unauthorized from 'views/bianhan/test'
  export default {
    name: 'menuPermissionConfig',
    components: {
      authorized,
      unauthorized
    },
    props: {},
    data () {
      return {
        activeName: 'unauthorized',
        tabs: {
          authorized: false,
          unauthorized: true,
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
  