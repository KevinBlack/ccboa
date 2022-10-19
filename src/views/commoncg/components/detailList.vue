/**
可控编辑域,用于管理员
参数：
@param isWeiHu[boolean],控制域是否可编辑
@param canWeiHu[boolean],控制域是否能编辑
@param listtype[string],自定义意见type
@param lableTitle[string],控制域标题名称
@param formadatalist[array],内容数组
delefunc [function],删除数据方法
yanglipeng 印章管理员查看意见样式组件
*/
<template>
  <el-form-item :label="lableTitle" style="z-index:10;">
    <el-button type="primary" @click="addSucc()" :disabled="isWeiHu">新增意见</el-button>
    <!-- <el-radio-group v-model="Havesp1" @change="ldBjbtn1">
      <el-radio label="0">同意</el-radio>
      <el-radio label="1">不同意</el-radio>
    </el-radio-group> -->
    <!-- 只有保存的意见展示区域没有落款 -->
    <!-- <div v-if="texTs" style="margin-top:20px;">
      <el-input type="textarea" maxlength="500" v-model="texTs" show-word-limit :disabled="true"></el-input>
    </div>-->
    <!-- 带落款的意见展示区域 -->
    <div class="suggStyle">
      <!-- <el-radio
        
        v-model="i"
        :label="index"
        @change="A(index,arrayList)"
      > -->
        <div
          v-bind:class="['d_flex',{'border_line':index!=(arrayList.length-1)}]"
          style="margin-bottom:26px"
          v-for="(item,index) in arrayList"
        :key="index"
        >
          <el-row class="d_b100">
            <el-col :span="24">
              <el-col :span="2">
                <span>内容</span>
              </el-col>
              <el-col :span="19">
                <el-input
                  :disabled="isWeiHu"
                  type="textarea"
                  v-model="item.nr"
                  maxlength="500"
                  class="d_f1"
                  show-word-limit
                ></el-input>
              </el-col>
              <el-col :span="2" style="margin-left:12px">
                <el-button
                  type="danger"
                  @click="deleSugg(item.deleteId,index,item.id)"
                  :disabled="isWeiHu"
                >删除</el-button>
              </el-col>
            </el-col>
          </el-row>
          <el-row style="margin-top:12px">
            <el-col :span="2">
              <span>用户部门</span>
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.lkD" :disabled="isWeiHu"></el-input>
            </el-col>
            <el-col :span="2" style="margin-left:20px;">
              <span>用户名</span>
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.lkU" :disabled="isWeiHu"></el-input>
            </el-col>
            <el-col :span="2" style="margin-left:20px;">
              <span>提交时间</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.dateTime" :disabled="isWeiHu"></el-input>
            </el-col>
          </el-row>
        </div>
      <!-- </el-radio> -->
    </div>
  </el-form-item>
</template>

<script>
export default {
  name: "controllableEditingField",
  props: {
    isWeiHu: { type: Boolean, default: true },
    canWeiHu: { type: Boolean, default: true },
    listtype: { type: String, default: "0" },
    lableTitle: { type: String, default: "标题" },
    texTs: { type: String, default: "" },
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
      AuserName: JSON.parse(localStorage.getItem("userInfo")).humanName,
      userId: JSON.parse(localStorage.getItem("userInfo")).humanId,
      i: "",
      Havesp1: "0"
    };
  },
  mounted() {
    console.log(
      JSON.parse(localStorage.getItem("userInfo")),
      'JSON.parse(localStorage.getItem("userInfo"))'
    );
  },
  watch: {
    //控制域
    isWeiHu(newvalue, oldvalue) {
      this.isWeiHu = newvalue;
    },
    //意见数据
    formadatalist(newvalue, oldvalue) {
      console.log(newvalue,oldvalue,'22')
      this.arrayList = newvalue;
    },
    lableTitle(newvalue, oldvalue){
      console.log(newvalue,oldvalue,'22aaa')
      this.lableTitle = newvalue

    }

  },
  methods: {
    // A(val, content) {
    //   console.log(val, content);
    //   content.map((item, index) => {
    //     console.log(item);
    //     if (val === index) {
    //       if (this.Havesp1 == "0") {
    //         item.nr = item.nr + "同意";
    //       } else {
    //         item.nr = item.nr + "不同意";
    //       }
    //     }
    //   });
    // },
    // ldBjbtn1(val) {
    //   console.log(val);
    // },
    addSucc() {
      //   每次添加新数据push到数组中新增意见
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss");
      this.arrayList.push({
        // lk: this.AdepartmentName + " |    " + this.AcreateUser,//d当前部门 当前人拼接展示 u
        lkD: this.AdepartmentName,
        lkU: this.AcreateUser,
        userId: this.userId,
        nr: " ", //内容
        ct: AcreateTime, //当前时间
        deleteId: "0" //前端新增字段监听 做自己的数组删除
      });
      console.log(this.arrayList);
    },
    deleSugg(dataId, index, jkId) {
      console.log(dataId, index, jkId);
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //新加数据删除
          if (dataId == 0) {
            console.log(dataId, "id");
            this.arrayList = this.arrayList.splice(index, 1);
          } else {
            //服务端返回数据删除
            this.$emit("delefunc", { id: jkId },index);
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