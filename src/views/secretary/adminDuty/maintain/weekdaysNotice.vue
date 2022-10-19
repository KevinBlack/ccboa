<!--
 * @Author: your name
 * @Date: 2020-08-07 15:01:58
 * @LastEditTime: 2021-01-15 09:42:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\secretary\adminDuty\maintain\weekdaysNotice.vue
--> 
<template>
  <div class="weekdaysNotice">
    <div class="handleButton" v-show="this.isShow==='0'">
      <el-button type="primary" @click="edit()" v-if="isEdit">编辑</el-button>
      <el-button type="primary" @click="save()" v-else>保存</el-button>
    </div>
    <div class="handleButton" v-show="this.isShow==='1'">
      <el-button type="primary" @click="toClose()" >关闭</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">工作日及周末值班须知</div>
    </div>
    <div class="content">
      <el-input
        type="textarea"
        :rows="18"
        resize="none"
        :readonly="form.isReadonly"
        v-model="form.mtTmpOne"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "weekdaysNotice",
  components: {},
  props: {},
  data() {
    return {
        isShow: "0",
      id: "",
      contentFlag: "",
      isEdit: true,
      form: {
        detailData: [],
        mtTmpOne: "",
        isReadonly: true,
      },
    };
  },
  computed: {},
  methods: {
    toClose(){
    this.$router.go(-1)
    },
    // {notiveType:'0',noticeContent:this.form.mtTmpOne}
    getList() {
      this.$api.secreatary.dutyWork.getList({ noticeType: "0",}).then((res) => {
        if (res.data.length === 0) {
          this.contentFlag = "new";
        } else {
          this.contentFlag = "old";
          this.form.mtTmpOne = res.data[0].noticeContent;
          this.id = res.data[0].id;
        }
      });
    },
    save() {
      // if()
      this.isEdit = true;
      console.log(this.contentFlag);
      if (this.contentFlag === "new") {
        console.log("新增");
        this.$api.secreatary.dutyWork
          .postNewContent({
            noticeType: "0",
            noticeContent: this.form.mtTmpOne,
          })
          .then((res) => {
            this.$message({
              type: "success",
              message: "新增成功",
            });
          });
      } else {
        console.log("更新");
        this.$api.secreatary.dutyWork
          .postOldContent({
            noticeType: "0",
            noticeContent: this.form.mtTmpOne,
            id: this.id,
          })
          .then((res) => {
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.getList();
          });
      }
      this.form.isReadonly = true;
    },
    // classifierDetail() {},
    //编辑、保存
    edit() {
      this.isEdit = false;
      this.form.isReadonly = false;
    },
  },
  activated() {},
  mounted() {
    // this.classifierDetail();
  },
  created() {
     if (this.$route.query.routerType) {
      console.log(this.$route.query);
      this.isShow = "1";
    }
    this.getList();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;
  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
.btn_list {
  text-align: left;
  padding: 10px;
}
.content {
  width: 80%;
  margin: auto;
}
</style>

