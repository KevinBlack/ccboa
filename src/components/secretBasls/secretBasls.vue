<template>
  <!-- 定密依据 -->
  <div class="secretBasls">
    <el-dialog title="定密依据" :visible.sync="dialogVisible">
      <el-col>
        <el-radio
          v-model="fromdata.secretBasls"
          label="泄露后会使得本行经济利益和竞争优势遭受特别严重的损害;"
          style="width:100%;font-size:16px;margin:5px;"
        >泄露后会使得本行经济利益和竞争优势遭受特别严重的损害;</el-radio>
        <el-radio
          v-model="fromdata.secretBasls"
          label="泄露后会使得本行经济利益和竞争优势遭受严重的损害;"
          style="width:100%;font-size:16px;margin:5px;"
        >泄露后会使得本行经济利益和竞争优势遭受严重的损害;</el-radio>
        <el-radio
          v-model="fromdata.secretBasls"
          label="泄露后会使得本行经济利益和竞争优势遭受一般程度的损害;"
          style="width:100%;font-size:16px;margin:5px;"
        >泄露后会使得本行经济利益和竞争优势遭受一般程度的损害;</el-radio>
        <!-- <el-radio
          v-model="fromdata.secretBasls"
          label="111"
          style="width:100%;font-size:16px;margin:5px;"
        >111</el-radio>
        <el-radio
          v-model="fromdata.secretBasls"
          label="222"
          style="width:100%;font-size:16px;margin:5px;"
        >222</el-radio> -->
        <el-radio
          v-model="fromdata.secretBasls"
          label="其他情形："
          style="width:100%;font-size:16px;margin:5px;"
        >其他情形：</el-radio>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" @click="dialogVisible = false">取 消</el-button>
        <el-button size="big" type="primary" @click="savesecretBasls">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      fromdata: [
        {
          secretBasls: ""
        }
      ],
      dialogVisible: false
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    //定密依据子组件向父组件传参
    savesecretBasls() {
      this.dialogVisible = false;
      this.$emit("childsavesecretBasls", this.fromdata.secretBasls);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
