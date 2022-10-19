<template>
  <el-input :disabled="true">
  </el-input>
</template>

<script>
    import external from '../../config/external.js'
    import base from '../../mixins/base.js'

    export default {
        props: ['item'],
        mixins: [base],
        name: "fddiv",
        methods: {},
        created() {
            this.defalutStyles = external.defaultStyles
        }
    }
</script>

<style scoped>
  /deep/ .el-input__inner {
    border: none !important;
  }

</style>
