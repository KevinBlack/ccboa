<template>
  <div class="reasonWrap">
    <!-- 起草正文字数友情提示 -->
    <el-dialog
      title="友情提示"
      v-dialogDrag
      width="20%"
      :visible.sync="wordsLimitInfo.dialogSetLimit"
    >
      <span>根据建行党委要求，此类文件正文字数不得超过{{wordsLimitInfo.wordsLimit}}字，请拟稿时注意。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click='setLimitControl'>是</el-button>
      </span>
    </el-dialog>
    <!-- 起草正文字数限制提示 -->
    <el-dialog
      title="友情提示"
      v-dialogDrag
      width="20%"
      :visible.sync="wordsLimitInfo.dialogDraftTips"
    >
      <span>根据建行党委要求，此类文件正文字数不得超过{{wordsLimitInfo.wordsLimit}}字，此文件字数超过{{wordsLimitInfo.draftWords-wordsLimitInfo.wordsLimit}}字，请具体说明原因。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chaoChuTiSYuanY">说明原因</el-button>
        <el-button type="primary" @click="chaoChuTiSXiuG">修改</el-button>
      </span>
    </el-dialog>
    <!-- 具体原因少于10个字提示 -->
    <el-dialog
      title="友情提示"
      v-dialogDrag
      width="20%"
      :visible.sync="wordsLimitInfo.dialogReasonTips"
    >
      <span>请说明具体原因不能少于{{wordsLimitInfo.reasonLimitNum?wordsLimitInfo.reasonLimitNum:"10"}}个字</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click='chaoChuTiSYuanY'>是</el-button>
      </span>
    </el-dialog>
    <!-- 上一处理人说明原因 -->
    <el-dialog
      title="友情提示"
      v-dialogDrag
      width="20%"
      :visible.sync="wordsLimitInfo.dialogNextStepTips"
    >
      <span>根据建行党委要求，此类文件正文字数不得超过{{wordsLimitInfo.wordsLimit}}字，此文件字数超出{{wordsLimitInfo.draftWords-wordsLimitInfo.wordsLimit}}字，上一处理人已说明具体原因。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click='wordsLimitInfo.dialogNextStepTips = false'>确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    wordsLimitInfo:{
      reasonDom:{
        default: "",
        type: String
      },
      wordsLimit:{//正文限制字数
        default: 0,
        type: Number
      },
      draftWords:{//正文字数
         default: 0,
        type: Number
      },
      reasonWords:{//超限原因字数
        default: 0,
        type: Number
      },
      stepsNames:{//流程环节
        default: "",
        type: String
      },
      dialogSetLimit:{//友情提示
        default: ()=>{return false},
        type: Boolean
      },
      dialogDraftTips:{//拟稿人正文字数超限提示
        default: ()=>{return false},
        type: Boolean
      },
      dialogReasonTips:{//超限原因字数提示
        default: ()=>{return false},
        type: Boolean
      },
      dialogNextStepTips:{//下一处理人打开文件后：如果收到的文件字数已超限，则弹出
        default: ()=>{return false},
        type: Boolean
      },
      reasonLimitNum:{
        default: 0,
        type: Number
      }
    }
  },
  data() {
    return {

    };
  },
  methods: {
    setLimitControl(){
      this.wordsLimitInfo.dialogSetLimit = false;
      this.$emit('drafting',1,'nocheck');
    },
    chaoChuTiSYuanY(){
      this.wordsLimitInfo.dialogDraftTips = false;
      this.wordsLimitInfo.dialogReasonTips = false;
      this.$emit('chaoChuTiSYuanY',this.wordsLimitInfo.reasonDom);
    },
    chaoChuTiSXiuG(){
      this.wordsLimitInfo.dialogDraftTips = false;
      this.$emit('drafting',2,'nocheck');
    },
    dialogSetLimitDialog() {
      // this.dialogSetLimit = true;

    }
  }
};
</script>
<style lang="less" scoped>

</style>
