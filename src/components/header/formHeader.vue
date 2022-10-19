/**
* create by zx on 2020-7-2 14:40
* 类注释：
* 备注：
*/
<template>
  <div class="formHeader">
    <div class="title-text">{{title}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "formHeader",
    components: {},
    props: {title: ""},
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
  .formHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #ff0502;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #ff0502;
    }
  }
</style>
