<template>
  <!-- 常用批语 -->
  <div class="appendWriteList">
    <el-dialog title="常用批语" :visible.sync="dialogVisible" v-dialogDrag>
      
      <el-form>
        
        <el-row>
          <el-col>
            <el-form-item>
              <el-input
                v-model="fromdata.appendWriteList"
                placeholder="添加常用批语"
                style="width: 100%;"
              >
                <el-button slot="append" icon="el-icon-plus" @click="addAppendWriteList" style="border:1px solid #000;color:#000;"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="height:300px;">
          <el-scrollbar style="height:100%;padding: 0px 15px 0 0;">
      <el-row v-for="(item,index) in offenDevices" :key="index" class="messagelist" style="margin:10px 0">
        <el-col :span="1">
          <el-radio v-model="radio1"  :label="index"  @change="selectMassageInfo(item.content)"> </el-radio>
        </el-col>
        <el-col :span="23" class="piyu_info">
          <el-input
          :id="item.id"
          :value="item.content"
          placeholder="添加常用批语"
          style="width: 100%;"
          >
          <el-button slot="append" icon="el-icon-delete" @click="deleteMassageInfo(item.id)"  style="border:1px solid #000;color:#000;">移除</el-button>
          </el-input>
        </el-col>
      </el-row>
      </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" @click="dialogVisible = false">取 消</el-button>
        <el-button size="big" type="primary" @click="saveselect">确 定</el-button>
      </span>
      
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    clickTypes:{type:Number},
    offenDevices:{type:Array,default:()=>[]},
  },
  data() {
    return {
      radio1:"",
      num:0,
      tableData: [
        {'data':1111}
      ],
      fromdata: [
        {
          appendWriteList: ""
        }
      ],
      dialogVisible: false,
      sendmessage:'',
      baoWenZiDuan: "A08461302",
      personPiyu:{
        function: "deletePiyu",
        nextNodeId: "", //批语id
      }
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },

    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addAppendWriteList() {
      if(!this.fromdata.appendWriteList){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "常用批语不能为空",
          duration: 500
        });
        return;
      }
      this.$emit('addCommonUse',1,null,this.fromdata.appendWriteList);
      this.fromdata.appendWriteList = "";
    },
    deleteMassageInfo(id){
      this.radio1 = "";
      this.sendmessage= '';
       this.$emit('deleteCommonUse',2,id);
    },
    selectMassageInfo(message){
      this.sendmessage = message
    },
    saveselect(message){
      this.dialogVisible = false;
      this.$emit("childsaveselect", this.sendmessage);
    },
  },
  watch:{
    dialogVisible(newv){
      if(newv){
        this.sendmessage = "";
        this.radio1 = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tr{
  text-align: right;
}
/deep/ .el-radio__label{
  display: none;
}
/deep/ .el-row{
      margin: 10px 0px;
    text-align: center;
    display: flex;
    align-items: center;
}

.piyu_info /deep/ .el-input__inner{
  border:0;
  padding-left: 0;
}
/deep/ .el-radio__inner {
    border: 1px solid #000;
}
</style>
