/**
用于表单域内容格式化展示
展示包含：内容区域[可编辑]，部门区域，人员区域
参数：
@param inputDisable[boolean],控制域是否可编辑
@param isUndertakeOver[string],表单是否是回收单
@param currentUserId[string],当前登录人id
@param arrayList[array],内容数组
@param lastOptionTime[string]所有可删除意见最后一条意见添加时间
@param isInput[boolean],是否是input标签，默认值false
 */
<template>
  <div class="formatFildContainer" v-if="arrayList1&&arrayList1.length>0">
    <template>
      <div v-for="item in arrayList1" :key="item.id" style="overflow:hidden;width: 100%" class='border-line'>
        <div :class="{'d_flex':true,'el-col-23':true}" >
          <el-row class="d_b100">
            <el-col :span="24" class="elcol">
              <el-input
                v-if='!isInput'
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                :value="item.content"
                :disabled="inputdisabled"
                :class="{'d_f1':true,'withoutborder':inputdisabled}"
              ></el-input>
              <!--解决收藏样式问题-->
              <div v-if='isInput'>{{item.content}}</div>
              <!--是否含有附件-->
              <!-- <div>{{!!item.attachmentPos}}附件{{item.attachmentPos}}</div> -->
              <div v-if="!!item.attachmentPos&&item.attachmentPos.length>0">
                    <div v-for="file in item.attachmentPos" :key="file.id"
                      style="background-color: rgba(228,231,237,.32)">
                        <a class="name down" style="cursor:pointer"
                          @click="viewFile(file)">{{file.fileName}}</a>
                   </div>
              </div>
              <div class="adviceInfo">
                {{item.departmentName}}
                <span class="pad_lr10">{{item.userName}}</span>
                <p class="creat_time">{{item.createTime}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--可以删除条件：1.所有可删除意见最后一条意见2.为当前操作人添加的意见-->
        <i class="el-icon-delete"
          @click="deleteItem(item)"
          style="font-size:20px;margin-left:10px;cursor:pointer"
          v-if="item.createTime==lastOptionTime&&item.userId==currentUserId"></i>
      </div>
    </template>
  </div>
</template>

<script>
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
export default {
  name: "formatFiled",
  props: {
    arrayList: {
      type: Array,
      default() {
        return [];
      }
    },
    isInput:{
      type: Boolean,
      default() {
        return false;
      }
    },
    inputDisable: {
      type: Boolean,
      default() {
        return true;
      }
    },
    isUndertakeOver: {
      type: String,
      default() {
        return "0";
      }
    },
    lastOptionTime:{
      type:String,
      default(){
        return "0";
      }
    },
    currentUserId: {
      type: String,
      default() {
        return "0";
      }
    }
  },
   mixins: [openOrDownLoadFile],
  data() {
    return {
      inputdisabled: true,
      arrayList1:this.arrayList
    };
  },
  watch: {
    inputDisable(newvalue, oldvalue) {
      this.inputdisabled = newvalue;
    },
    arrayList: {
      handler(newv) {
        this.arrayList1 = newv;
      },
      deep:true
    },
    isUndertakeOver(newvalue, oldvalue) {
      this.isUndertakeOver = newvalue;
    },
    currentUserId(newvalue, oldvalue) {
      this.currentUserId = newvalue;
    },
    lastOptionTime(newvalue,oldvalue){
      this.lastOptionTime=newvalue;
    }
  },
  methods: {
    deleteItem(item) {
      this.$emit("deteleteOptionFun", item);
    }
  }
};
</script>

<style scoped lang="less">
.formatFildContainer {
  // background-color: #e4e7ed52;
  min-height: 32px;
}
/deep/.withoutborder .el-textarea__inner[disabled],
/deep/.withoutborder .el-textarea__inner{
  border: none !important;
  background-color: transparent!important;
}
.formatFildContainer .elcol {
  background: #e4e7ed52;
  padding: 0;
  word-break: break-all;
  padding-left: 8px;
}
.formatFildContainer .d_flex {
 // border: 1px solid #969aa2;
  background-color: #e4e7ed52;
  // border-radius: 4px;

}
.formatFildContainer .border-line:first-child .d_flex{
  border:1px solid #e4e7ed;
  border-bottom: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.formatFildContainer .border-line .d_flex{
    border:1px solid #e4e7ed;
    border-top: 0;
    border-bottom: 0;
}
.formatFildContainer .border-line:last-child .d_flex{
    border-bottom-left-radius: 4px;
   border-bottom-right-radius: 4px;
    border:1px solid #e4e7ed;
    border-top: 0;
}
// .formatFildContainer .d_flex:hover {
//   border: 1px solid #8996af;
// }
.pad_lr10 {
  padding: 0 0 0 10px;
}
.creat_time{
    position: relative;
    top: -6px;
}
.adviceInfo {
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
  user-select: text;
}
</style>