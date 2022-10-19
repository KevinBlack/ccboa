<!--
 * @Author: your name
 * @Date: 2020-08-07 15:01:58
 * @LastEditTime: 2021-01-12 10:40:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\secretary\adminDuty\maintain\weekdaysNotice.vue
--> 
<template>
  <div class="weekdaysNotice">
    <div class="handleButton">
      <el-button type="primary" @click="tosave" v-if="this.btnTypes==='to'" style="margin:5px">确认</el-button>
      <el-button type="primary" @click="closeWindow" v-if="this.btnTypes==='done'" style="margin:5px">关闭</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">中国建设银行值班通知</div>
    </div>
    <div class="content">
      <!-- <el-input
        type="textarea"
        :rows="10"
        resize="none"
        :readonly="form.isReadonly" 
        v-model="form.mtTmpOne"
      ></el-input>-->
      <div class="wrap">
        <div>{{form.remark}}</div>
        <p @click="toNotice" style="margin-top:30px;display:inline-block;color: coral;">值班须知</p>
      </div>
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
      id: "",
      btnTypes: "",
      contentFlag: "",
      isEdit: true,
      IDFlg: "",
      form: {},
    };
  },
  computed: {},
  methods: {
    // 获取详情  toGetList
    getLIst(){
      this.$api.secreatary.dutyWork
        .toGetList({ id: this.IDFlg })
        .then((res) => {
          this.form=res.data
          console.log(this.form,"this.form")
          if(this.form.feedBackFlag === "1"){
            this.btnTypes="to"
          }else if(this.form.feedBackFlag === "2"){
            console.log(this.form.feedBackFlag )
            this.btnTypes='done'
          }
        });
    },
    closeWindow() {
      this.$intent.closeWindow(this);
      // this.$router.go(-1)
    },
    tosave() {
      this.$api.secreatary.dutyWork
        .toGetInfor({ id: this.form.id })
        .then((item) => {
          this.$message({
            type: "success",

            message: "确认成功",
          });
          this.btnTypes='done'
        });
    },
    toNotice() {
      //2 3 节假日 this.formData{}
      console.log(this.form.dutyType);
      if (this.form.dutyType === "2" || this.form.dutyType === "3") {
        console.log("节假日");
        this.$router.push({
          path: "/secretary/adminDuty/maintain/holidayNotice",
          query: {
            routerType: "tiao",
          },
        });
      } else if (
        this.form.dutyType === "0" ||
        this.form.dutyType === "1"
      ) {
        console.log("工作日");
        this.$router.push({
          path: "/secretary/adminDuty/maintain/weekdaysNotice",
          query: {
            routerType: "tiao",
          },
        });
      }
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.IDFlg = this.$route.query.id || JSON.parse(this.$route.query.detail).id ;
    console.log(this.$route.query.id,"id");
    console.log(this.$route.query.detail,"detail");

    this.getLIst()
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.wrap {
  border: 1px solid #606266;
  padding: 30px;
  color: #606266;
  min-height: 200px;
  font-size: 14px;
  line-height: 20px;
}
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

