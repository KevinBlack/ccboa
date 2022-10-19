<template>
  <div>
    <el-dialog
      title="文号选择"
      :visible.sync="isShow"
      width="30% !important"
      height="200px"
      :before-close="handleClose"
    >
      <el-row class="isdialog">
        <el-col :span="4">
          <span>当前文号</span>
        </el-col>
        <el-col :span="20">
          <el-radio-group @change="disoAn" v-model="dangqian1">
            <el-radio :label="fileNo"></el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <div>
        <el-row class="isdialog">
          <el-col :span="4">
            <span>空缺文号</span>
            <!-- <el-button el-button type="primary" @click="currentCode">使用当前文号</el-button> -->
          </el-col>
          <el-col
            :span="20"
            class="el-table__body-wrapper"
            style="overflow-y: auto;max-height: 200px;margin-top: 8px;"
          >
            <!-- <el-radio :label="1"></el-radio> -->
            <el-radio-group
              @change="diso"
              style="display:block;line-height:31px;"
              v-model="deleteapplyCode"
              v-for="item in kongQuelist"
              :key="item.index"
            >
              <el-radio :label="item" style="margin-right: 16px">
                {{
                item
                }}
              </el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="delecurrentCode">确定</el-button>
        <el-button @click="closeWH">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "bianhao",
  props: {
    isShow: { type: Boolean, default: true },
    // 当前值
    fileNo: {},
    //空缺的值
    // kongQue: { type: String, default: "" },
    kongQuelist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      delCode: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      dangqian: 20,
      dangqian1:'',
      deleteapplyCode:''
    };
  },
  watch: {
    //控制域
    // isShow(newvalue, oldvalue) {
    //   this.isShow = newvalue;
    // },
    // //意见数据
    // formadatalist(newvalue, oldvalue) {
    //   console.log(newvalue,oldvalue,'22')
    //   this.arrayList = newvalue;
    // }
  },
  methods: {
    diso() {
        this.dangqian1 = ''
    },
    disoAn() {
        this.deleteapplyCode = ''
    },
    delecurrentCode() {
      console.log("确定");
      console.log(this.dangqian1,this.deleteapplyCode)
      if(!this.dangqian1&&!this.deleteapplyCode){
        this.$message({
          type: "warning",
          message: "编号不能为空请选择编号!"
        });
        return
      }
      this.$emit('isok',this.dangqian1||this.deleteapplyCode)
    },
    closeWH() {
      console.log("取消");
      this.dangqian1 = ''
      this.deleteapplyCode = ''
     this.$emit('isclose')
    },
    handleClose() {
      this.dangqian1 = ''
      this.deleteapplyCode = ''
     this.$emit('isclose')

    }
  }
};
</script>

<style lang="less" scoped>
.isdialog{
  height: 34px;
  line-height: 34px;
}
</style>