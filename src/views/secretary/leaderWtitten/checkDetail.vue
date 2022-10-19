<template>
  <div class="checkDetail">
    <div class="checkHeader">
      <div class="title-text">参数维护</div>
    </div>
    <div class="box">
      <el-button type="primary" style="margin-left:20px;" @click="closeWin">关闭</el-button>
      <el-button type="primary" style="margin-left:20px;" v-if="this.isAdd" @click=" save_btn">保存</el-button>
      <el-button type="primary" style="margin-left:20px;" v-else @click="edit_btn">编辑</el-button>
      <el-button type="danger" style="margin-left:20px;" v-if="this.canDel" @click="del_btn">删除</el-button>
      <div class="wrap">
        <el-row>
          <el-col :span="8">
            <el-form>
              <el-form-item label="文件类型">
                <el-select v-model="selectData.docType" placeholder="请选择" :disabled="!this.isAdd">
                  <el-option
                    v-for="item in optionT"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form>
              <el-form-item label="领导姓名">
                <el-select v-model="selectData.numL" placeholder="请选择" :disabled="!this.isAdd">
                  <el-option
                    v-for="item in optionL"
                    :key="item.leaderId"
                    :label="item.leaderCnName"
                    :value="item.index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form>
              <el-form-item label="行领导秘书">
                <el-select v-model="selectData.numM" placeholder="请选择" :disabled="!this.isAdd">
                  <el-option
                    v-for="item in optionM"
                    :key="item.secId"
                    :label="item.secCnName"
                    :value="item.index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import FdForm from 'vue-elementui-freedomen/components/form'

export default {
  name: "checkDetail",
  components: {
    // FdForm
  },
  props: {},
  data() {
    return {
      isAdd: true,
      canDel: false,
      selectData: {
        docType: "",
        leaderCnName: "",
        secCnName: "",
        id: "",
        numL: "",
        numM: ""
      },

      optionT: [
        {
          label: "收文",
          value: "收文"
        },
        {
          label: "发文",
          value: "发文"
        },
        {
          label: "签报",
          value: "签报"
        },
        {
          label: "其他",
          value: "其他"
        }
      ],
      optionL: [],
      optionM: [],
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      isEdit: Boolean,
      formCfg: [],
      formData: {},
      serverconfig: {
        labelWidth: "160px"
      }
    };
  },
  methods: {
    // 删除
    del_btn() {
      this.$api.secreatary.leaderActivity
        .delLeader({ id: this.selectData.id })
        .then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.$router.go(-1);
        });
    },
    // 关闭
    closeWin() {
      if (this.isAdd) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.save_btn();
              // this.$intent.closeWindow(this);
              this.$router.go(-1);
            } else if (action === "cancel") {
              //点否
              // this.$intent.closeWindow(this);
              this.$router.go(-1);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$router.go(-1);
      }
      // this.$confirm("是否保存并退出当前页面?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   distinguishCancelAndClose: true,
      //   type: "warning",
      //   callback: action => {
      //     if (action === "confirm") {
      //       //点是
      //       this.save_btn();
      //       // this.$intent.closeWindow(this);
      //       this.$router.go(-1);
      //     } else if (action === "cancel") {
      //       //点否
      //       // this.$intent.closeWindow(this);
      //       this.$router.go(-1);
      //     } else if (action === "close") {
      //       //点右上角的x
      //     }
      //   }
      // });
    },

    // 保存
    save_btn() {
      if (this.selectData.id) {
        let obj = {};
        // console.log("selectData", this.selectData);

        // console.log(typeof this.selectData.numL === "number");
        // console.log(typeof this.selectData.numM === "number");
        if (typeof this.selectData.numM !== "number") {
          let a = this.optionM.filter(item => {
            return item.secCnName === this.selectData.numM;
          });
          console.log(a);
          obj.secCnName = a[0].secCnName;
          obj.secId = a[0].secId;
        } else if (typeof this.selectData.numM == "number") {
          obj.secCnName = this.optionM[this.selectData.numM].secCnName;
          obj.secId = this.optionM[this.selectData.numM].secId;
        }

        if (typeof this.selectData.numL !== "number") {
          let b = this.optionL.filter(item => {
            return item.leaderCnName === this.selectData.numL;
          });
          console.log(b, "b++++++");

          obj.leaderCnName = b[0].leaderCnName;
          obj.leaderId = b[0].leaderId;
          obj.leaderDeptFrameId = b[0].leaderDeptFrameId;
        } else if (typeof this.selectData.numL == "number") {
          obj.leaderId = this.optionL[this.selectData.numL].leaderId;
          obj.leaderCnName = this.optionL[this.selectData.numL].leaderCnName;
          obj.leaderDeptFrameId = this.optionL[
            this.selectData.numL
          ].leaderDeptFrameId;
        }
        console.log(obj, "obj+++++++");
        // obj.leaderId = this.optionL[this.selectData.numL].leaderId;
        // obj.leaderCnName = this.optionL[this.selectData.numL].leaderCnName;

        // obj.secCnName = this.optionM[this.selectData.numM].secCnName;
        // obj.secId = this.optionM[this.selectData.numM].secId;
        // obj.docType = this.selectData.docType;
        // console.log("详情");
        obj.id = this.selectData.id;

        this.$api.secreatary.leaderActivity.addEdit(obj).then(res => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.isAdd = !this.isAdd;
        });
      } else {
        console.log("新增");
        let obj = {};
        console.log("selectData", this.selectData);
        console.log(this.optionL[this.selectData.numL])

        // 判断是否所有选项都为空
        if (!this.optionL[this.selectData.numL] && !this.optionL[this.selectData.numL] && !this.selectData.docType) 
          {
            return this.$router.go(-1);
          }

        obj.leaderId = this.optionL[this.selectData.numL].leaderId;
        obj.leaderCnName = this.optionL[this.selectData.numL].leaderCnName;
        obj.leaderDeptFrameId = this.optionL[
          this.selectData.numL
        ].leaderDeptFrameId;

        obj.secCnName = this.optionM[this.selectData.numM].secCnName;
        obj.secId = this.optionM[this.selectData.numM].secId;
        obj.docType = this.selectData.docType;

        console.log("obj", obj);
        this.$api.secreatary.leaderActivity.addParams(obj).then(res => {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.$router.go(-1);
        });
      }
      // if (this.formData.id) {
      //   this.$api.argumentPre.baseConfigAlter(
      //     this.formData
      //   ).then(res => {
      //     if (res.code == "SUCCESS") {
      //       this.$message({
      //         message: '修改成功',
      //         type: 'success'
      //       });
      //       this.$router.back()
      //     }
      //   })
      // } else {
      //   this.$refs.fdForm.submit().then(data => {
      //     this.$api.argumentPre.baseConfigCreate(
      //       this.formData
      //     ).then(res => {
      //       if (res.code == "SUCCESS") {
      //         this.$message({
      //           message: '保存成功',
      //           type: 'success'
      //         });
      //         this.$router.back()
      //       }
      //     })
      //   })
      // }
    },
    // 编辑
    edit_btn() {
      this.isAdd = true;
      // this.setFormConfig();
    },
    setFormConfig() {
      this.formCfg = [
        {
          type: "select",
          prop: "manageBank",
          label: "文件类型",
          span: 18,
          disabled: this.isEdit,
          rule: "must",
          style: { width: "100%" }
        },
        {
          type: "select",
          prop: "manageBank",
          label: "领导姓名",
          span: 18,
          disabled: this.isEdit,
          rule: "must",
          style: { width: "100%" }
        },
        {
          type: "select",
          prop: "manageBank",
          label: "行领导秘书",
          span: 18,
          disabled: this.isEdit,
          rule: "must",
          style: { width: "100%" }
        }
      ];
    },
    loadData() {
      this.isAdd = JSON.parse(this.$route.query.isAdd);

      //列表详情跳过来
      if (!this.isAdd) {
        let obj = JSON.parse(JSON.parse(this.$route.query.detail));
        console.log("obj", obj);
        this.canDel = true;
        this.selectData.docType = obj.docType;
        this.selectData.numL = obj.leaderCnName;
        this.selectData.numM = obj.secCnName;
        this.selectData.id = obj.id;
        console.log("searchData", this.selectData);
        // obj.leaderId = this.optionL[this.selectData.numL].leaderId;
        // obj.leaderCnName = this.optionL[this.selectData.numL].leaderCnName;

        // obj.secCnName = this.optionM[this.selectData.numM].secCnName;
        // obj.secId = this.optionM[this.selectData.numM].secId;
      }

      //请求文件类型下拉框
      // this.$api.secreatary.leaderActivity.getLeaderSelect({}).then((res) => {
      //   let arr = [];
      //   res.data.map((item) => {
      //     let obj = {};
      //     obj.value = item.docType;
      //     obj.label = item.docType;
      //     arr.push(obj);
      //   });
      //   this.optionT = arr;
      // });

      //       leaderId 领导ID
      // secId  秘书ID
      //请求领导姓名下拉框
      this.$api.secreatary.leaderActivity.getLeaderName({}).then(res => {
        let arr = [];
        res.data.map((item, index) => {
          let obj = {};
          obj.index = index;
          obj.leaderId = item.leaderId;
          obj.leaderCnName = item.leaderCnName;
          obj.leaderDeptFrameId = item.leaderDeptFrameId;

          arr.push(obj);
        });
        this.optionL = arr;
        console.log("l", this.optionL);
      });
      //请求秘书姓名下拉框
      this.$api.secreatary.leaderActivity.getSecreatary({}).then(res => {
        let arr = [];
        res.data.map((item, index) => {
          let obj = {};
          obj.index = index;
          obj.secId = item.secId;
          obj.secCnName = item.secCnName;
          arr.push(obj);
        });
        this.optionM = arr;
        console.log("M", this.optionM);
      });
    }
  },
  mounted() {},
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.checkDetail {
  background: white;
  margin: 0 auto;
  min-height: 600px;
  .checkHeader {
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
}
.box {
  width: 80%;
  margin: 0 auto;
  .wrap {
    margin-top: 20px;
    border: 1px solid rgb(204, 204, 204);
    padding: 30px;
  }
}
</style>
