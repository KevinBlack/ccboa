
<template>
  <div class="cyIsSend">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>涉密文件不可发送传阅!</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "cyIsSend",
        data() {
          return {
            dialogVisible: true,
          }
        },
        methods: {
          handleClick(){
          },
          openDialog (){
            this.dialogVisible = true;
          }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
