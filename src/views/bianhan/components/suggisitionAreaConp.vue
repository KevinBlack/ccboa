/**
可控编辑域,用于管理员
参数：
@param isWeiHu[boolean],控制域是否可编辑
@param lableTitle[string],控制域标题名称
@param formadatalist[array],内容数组
delefunc [function],删除数据方法
*/
<template>
  <el-form-item :label="lableTitle" suggsiotionType="" :id="formId">
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
              <el-button type="danger" @click="deleSugg(item.id,lableTitle, arrayList)" :disabled="isWeiHu">删除</el-button>
            </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-top:12px">
          <el-col :span="2">
            <span>用户部门</span>
          </el-col>
          <el-col :span="5">
            <el-tooltip class="item" effect="dark" :content="item.deptName" placement="top">
              <el-input v-model="item.deptName" :disabled="isWeiHu"></el-input>
            </el-tooltip>
          </el-col>
          <div style="margin-left:12px">
            <el-col :span="2">
              <span>用户名</span>
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.createUser" :disabled="isWeiHu"></el-input>
            </el-col>
          </div>
          <el-col :span="2">
            <span>提交时间</span>
          </el-col>
          <el-col :span="5">
            <el-input v-model="item.createTime" :disabled="isWeiHu"></el-input>
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
    formId:{ype: String, default: ""},
    isWeiHu: { type: Boolean, default: true },
    lableTitle: { type: String, default: "标题" },
    suggestionType: { type: String, default: "1" },
    tableType: { type: String, default: "1" },
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
  watch: {
    isWeiHu(newvalue, oldvalue) {
      this.isWeiHu = newvalue;
    },
    formadatalist(newvalue, oldvalue){
      this.arrayList = newvalue;
    }
  },
  methods:{
   
    addSucc() {
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD");
      this.arrayList.push({
        content: "",
        deptName: this.AdepartmentName,
        createUser: this.AcreateUser,
        createTime: AcreateTime,
        type: this.suggestionType,
        tableType: this.tableType
      });
    },
    deleSugg(dataId,lableTitle,arrayList) {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("delefunc", { id: dataId, lableTitle: lableTitle ,arrayList: this.arrayList });
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