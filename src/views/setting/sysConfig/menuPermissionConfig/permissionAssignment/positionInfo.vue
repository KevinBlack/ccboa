<!--
 * @Author: liyaling
 * @Date: 2020-11-07 15:15:19
 * @LastEditTime: 
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\MenuPermissionConfig\permissionAssignment\positionInfo.vue
-->
<template>
    <div class="positionInfo">
        
      <div class="title">
        岗位信息
      </div>
      <div class="positionBoxFrame">
        
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'positionInfo',
    components: {
    },
    props: {
    },
    data () {
      return {
      }
    },
    computed: {},
    methods: {
    },
    activated () {
    },
    mounted () {
      this.classifierDetail()
    },
    created () {
    }
  }
  </script>
  
  <style scoped lang="less" rel="stylesheet/less">
  .positionInfo {
    height: 100vh;
    .title {
        padding: 0px 70px;
        margin-bottom: 40px;
        border-bottom: 2px solid #409eff;
        font-size: 30px;
        line-height: 75px;
        color: #409eff;
        font-weight: 600;
        text-align: center;

      .positionBoxFrame {
          border: 1px solid grey;
          padding: 15px;
      }
      .message {
        padding-left: 20px;
        color: #ff0502;
        font-size: 12px;
        line-height: 50px;
      }
    }
  }
  </style>
  