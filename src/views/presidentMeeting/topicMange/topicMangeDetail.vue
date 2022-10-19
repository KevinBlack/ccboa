<template>
  <div class="qcDetail">
    <div class="headerClick">
      <div class="right">
        <el-button type="primary" plain size="mini" @click="close_btn">关闭</el-button>
        <el-button type="primary" plain size="mini" @click="back_btn" v-show="isShow">退回</el-button>
      </div>
    </div>
    <div class="qcHeader">
      <div class="title-text">中国建设银行行长办公会议议题报送单</div>
      <el-form :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="主汇报部门" prop="deptName">
              <el-input v-model="formData.deptName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="curuserChinaName">
              <el-input v-model="formData.curuserChinaName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号" prop="tel">
              <el-input v-model.number="formData.tel" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上报时间" prop="sbSj">
              <el-input v-model="formData.sbSj" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="议题名称" prop="ytMc">
              <el-input autosize v-model="formData.ytMc" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上会依据" prop="attach">
              <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
              <!-- <el-input type="textarea" autosize v-model="formData.attach"  disabled></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="formData.remark" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "topicDetail",
  components: {
    uploadFileTs
  },
  data() {
    return {
      id: "",
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      // isOnly: true,
      formData: {},
      input: "",
      value1: "",
      rules: {
        tel: [
          {
            type: "number",
            required: true,
            message: "年龄不能为空",
            trigger: "blur"
          }
        ],
        ytMc: [{ required: true, message: "请输入议题名称", trigger: "blur" }],
        curuserChinaName: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        attach: [{ required: true, trigger: "blur" }]
      }
    };
  },
  computed: {},
  methods: {
    // 选中 打开
    fileList(files) {
      files.map(item => {
        this.formdata.push(item);
      });
      console.log("2", this.formdata);

      this.$forceUpdate();
    },
    // save_btn() {
    //   this.$api.secreatary.meeting
    //     .saveTopic({ ...this.formData })
    //     .then((res) => {
    //       console.log(res);
    //       this.$router.go(-1);
    //     });
    // },
    // 关闭
    close_btn() {
      this.$confirm("是否退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$intent.closeWindow(this);
        })
        .catch(() => {});
    },
    getDetail() {
      this.$api.secreatary.meeting
        .topDetailQuery({
          id: this.id
        })
        .then(res => {
          console.log(res);
          this.formData = res.data;
          this.formData.sbSj = formatData(this.formData.sbSj, "YYYY-MM-DD");
          this.formData.backTime = this.formData.backTime
            ? formatData(this.formData.backTime.getTime(), "YYYY-MM-DD")
            : "";
          this.isOnly = true;
        });
    },
    back_btn() {
      this.$confirm("是否退回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$api.secreatary.meeting
          .topicBack({
            id: this.id
          })
          .then(res => {
            this.$router.back();
          });
      });
    }
  },
  activated() {},
  created() {
    this.id = JSON.parse(this.$route.query.rowData).id;
    console.log(this.$route.query.rowData);
    console.log(JSON.parse(this.$route.query.rowData).isSubmit);
    console.log(!Number(JSON.parse(this.$route.query.rowData).isSubmit));

    this.isShow = !Number(JSON.parse(this.$route.query.rowData).isSubmit);
    this.getDetail();
  },
  mounted() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-button--primary.is-plain.is-disabled {
  color: #409eff;
  // color: #3b85ef;

  background-color: #fff;
  border-color: #d9ecff;
}
.qcDetail {
  background: white;
  margin: 0 auto;
  height: 100vh;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-right: 130px;
      float: right;
    }
  }

  .qcHeader {
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

  .process_content {
    width: 80%;
    min-height: 460px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .cur_sess {
        padding-right: 40px;
        p {
          padding-right: 20px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 20px;
          float: left;
          span {
            color: #f9aa21;
          }
        }
      }
    }

    .bottom-span {
      span {
        display: block;
        margin-left: 10%;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
    }
  }
}

// .bank_grid_comtent_active {
//   border: 1px solid #fff;
//   background: #0563c8;
//   color: #fff;
// }

// .bank_dispach_content {
//   width: 100%;
//   height: auto;

//   .bank_dispach_side_nav {
//     width: 45px;
//     height: auto;
//     position: fixed;
//     bottom: 8px;
//     left: 10%;
//     margin-left: -43px;
//     text-align: center;

//     a {
//       width: 45px;
//       height: 70px;
//       border: 2px solid #3b85ef;
//       font-size: 16px;
//       margin: 15px 0;
//       color: #3b85ef;
//       background: #fff;
//       border-radius: 10px 0 0 10px;
//       font-weight: 600;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//     }

//     .active {
//       background: #3b85ef;
//       color: #fff;
//     }
//   }
// }

// .bank_dispach_file_tit {
//   width: 100%;
//   height: 50px;
//   line-height: 50px;
//   color: #3b85ef;
//   font-size: 16px;
//   padding: 10px;
// }

// .height_90 {
//   height: 200px;
//   margin-top: -200px;
// }
// .adviceInfo {
//   position: absolute;
//   width: 100%;
//   right: 20px;
//   bottom: 0;
//   text-align: right;
//   color: #606266;
// }
// .pad_lr10 {
//   margin: 0 16px;
// }
</style>
