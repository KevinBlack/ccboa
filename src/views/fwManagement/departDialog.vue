<template>
  <div>
    <el-dialog title="上传部门" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-scrollbar style="height:400px">
        <el-tree
         show-checkbox
         ref="departTree"
         :data="treeData"
         :props="defaultProps" 
         :check-on-click-node="true"
         :check-strictly="false"
         :default-expand-all="true"
         @check="handleNodeClick"
         node-key="id">
        </el-tree>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["treeData"],
  data() {
    return {
      dialogVisible: false,
      // treeData: [
      //   {
      //     text: "",
      //     children: []
      //   }
      // ],
      defaultProps: {
        children: "children",
        label: "name"
      },
      checKList:{}
    };
  },

  methods: {
    handleNodeClick(data) {
      // console.log(data);
      this.checKList = data;
      // console.log(this.checKList)
      this.$nextTick(()=>{
        this.$refs['departTree'].setCheckedKeys([data.id]);
      })
    },
    submit(){
      this.$emit("checkNode", this.checKList);
      this.handleClose();
    },
    // 打开弹窗
    openDialog() {
      this.dialogVisible = true;
    },
    //关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-tree {
  height: 100%;
}
</style>