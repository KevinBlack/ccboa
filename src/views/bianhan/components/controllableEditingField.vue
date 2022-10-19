/**
可控编辑域,用于管理员
参数：
@param isWeiHu[boolean],控制域是否可编辑
@param canWeiHu[boolean],控制域是否能编辑
@param listtype[string],自定义意见type
@param lableTitle[string],控制域标题名称
@param formadatalist[array],内容数组
delefunc [function],删除数据方法
*/
<template>
  <el-form-item :label="lableTitle">
    <el-button type="primary" @click="addSucc()" :disabled="isWeiHu">新增意见</el-button>
    <div class="suggStyle">
      <div
        v-bind:class="['d_flex',{'border_line':index!=(arrayList.length-1)}]"
        v-for="(item,index) in arrayList"
        :key="index"
        style="margin-bottom:26px"
      >
        <el-row class="d_b100">
          <el-col :span="24">
            <el-col :span="2">
              <span>内容</span>
            </el-col>
            <el-col :span="19">
              <el-input :disabled="isWeiHu" type="textarea" v-model="item.content" class="d_f1"></el-input>
            </el-col>
            <el-col :span="2" style="margin-left:12px">
              <el-button type="danger" @click="deleSugg(item.id,index)" :disabled="isWeiHu">删除</el-button>
            </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-top:12px">
          <el-col :span="2">
            <span>用户部门</span>
          </el-col>
          <el-col :span="5">
            <el-input v-model="item.departmentName" :disabled="isWeiHu&&canWeiHu"></el-input>
          </el-col>
          <div style="margin-left:12px">
            <el-col :span="2">
              <span>用户名</span>
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.userName" :disabled="isWeiHu&&canWeiHu"></el-input>
            </el-col>
          </div>
          <el-col :span="2">
            <span>提交时间</span>
          </el-col>
          <el-col :span="5">
            <el-input v-model="item.createTime" :disabled="isWeiHu&&canWeiHu"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-form-item>
</template>

<script>
export default {
  name: "controllableEditingField",
  props: {
    isWeiHu: { type: Boolean, default: true },
    canWeiHu: { type: Boolean, default: true},
    listtype: { type: String, default: "0" },
    lableTitle: { type: String, default: "标题" },
    formadatalist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      arrayList: [],   
      AdepartmentName: JSON.parse(localStorage.getItem("userInfo"))
        .firstUnitName,
      AcreateUser: JSON.parse(localStorage.getItem("userInfo")).humanName,
      AuserName: JSON.parse(localStorage.getItem("userInfo")).humanName
    };
  },
  mounted(){
  },
  watch: {
    isWeiHu(newvalue, oldvalue) {
      this.isWeiHu = newvalue;
    },
    canWeiHu(newvalue, oldvalue) {
      this.canWeiHu = newvalue;
    },
    formadatalist(newvalue, oldvalue){
      this.arrayList = newvalue;
    }
  },
  methods:{
    addSucc() {
      /*对于传阅，无法维护传阅人及部门，
      且当前单子有意见时仅能维护意见,
      无意见时可以增加意见
      */
      if(!this.canWeiHu){
         if(this.arrayList.length>1){
             this.$message({
          message: "当前意见不支持新增",
          type: "info"
        });
         }
      }
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss");
      this.arrayList.push({
        content: "",
        id:'0',//新加数据id取值为0
        type:this.listtype,
        departmentName: this.AdepartmentName,
        userName: this.AcreateUser,
        createTime: AcreateTime
      });
    },
    deleSugg(dataId,index) {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //新加数据删除
          if(dataId==0){
           this.arrayList=this.arrayList.splice(index,1)
          }else{
            //服务端返回数据删除
            this.$emit("delefunc", { id: dataId });
          }
         
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
}
</style>