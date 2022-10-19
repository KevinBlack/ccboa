<template>
  <!-- 常用批语 -->
  <div class="appendWriteList">
    <el-dialog title="常用批语" :visible.sync="dialogVisible">
      <el-form>
        <el-row>
          <el-col>
            <el-form-item>
              <el-input
                v-model="fromdata.appendWriteList"
                placeholder="添加常用批语"
                style="width: 100%;"
              >
                <el-button slot="append" icon="el-icon-plus" @click="addAppendWriteList"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row v-for="(item,index) in offenDevices" :key="index" class="messagelist" style="margin:10px 0">
        <el-col :span="1">
          <el-radio v-model="radio1"  :label="index"  @change="selectMassageInfo(item.hyDnr)"> </el-radio>
        </el-col>
        <el-col :span="23" class="piyu_info">
          <el-input
            :id="item.id"
            :value="item.hyDnr"
            placeholder="添加常用批语"
            style="width: 100%;"
          >
            <el-button slot="append" icon="el-icon-delete" @click="deleteMassage(item.id)">移除</el-button>
          </el-input>
        </el-col>
      </el-row>

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
            //批语删除
            deleteMassage(item) {
                this.$emit("deleId", item);
            },
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
                this.$emit('addCommonUse',this.fromdata.appendWriteList);
                this.fromdata.appendWriteList = "";
            },
            deleteMassageInfo(id){
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
        created() {
            console.log('offenDevices',this.offenDevices)
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
  /deep/ .el-input-group__append{
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }
  /deep/ .el-input-group__append {
     border: 0;
    border-radius: 4px;
    background-color: #409eff;
    color: #fff;
  }
    /deep/ .el-input-group__append:hover {
       box-shadow: 2px 2px 2px #3b6998;
  }
</style>
