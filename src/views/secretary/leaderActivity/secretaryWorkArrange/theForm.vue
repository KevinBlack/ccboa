/**
* create by zx on 2020/7/23 09:38
* 类注释：
* 备注：
*/
<template>
  <div class="Newactivity">
    <div class="common-header">
      <div class="headerClick">
        <el-button @click="closeData('关闭')" class="bank_grid_comtent_active">关闭</el-button>
        <el-button @click="closeData('保存')" class="bank_grid_comtent_active">保存</el-button>
        <el-button @click="closeData('打印处理单')" class="bank_grid_comtent_active">打印处理单</el-button>
        <el-button @click="closeData('操作指南')" class="bank_grid_comtent_active">操作指南</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="shiwuTitle">中国建设银行秘书处工作安排</div>
      <div class="content">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          style="margin-top:20px;"
          :rules="rules"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="活动名称" prop="title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开始日期" prop="startDate">
                <el-date-picker
                  v-model="form.startDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束日期" prop="endDate">
                <el-date-picker
                  v-model="form.endDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开始时间" prop="startTime">
                <el-time-select
                  v-model="form.startTime"
                  :picker-options="{start: '07:00',step: '01:00',end: '18:00'}"
                ></el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="结束时间" prop="endTime">
                <el-time-select
                  v-model="form.endTime"
                  :picker-options="{start: '07:00',step: '01:00',end: '18:00'}"
                ></el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动类型" prop="activeType">
                <el-select v-model="form.activeType" placeholder="请选择活动类型">
                  <el-option
                    v-for="(item,index) in ActivityTypes"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动地点" prop="activeAddress">
                <el-input v-model="form.activeAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="活动内容" prop="activeContent">
                <el-input type="textarea" v-model="form.activeContent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注" prop="draftDate">
                <el-input
                  type="textarea"
                  v-model="form.remark"
                  :rows="5"
                  resize="none"
                  maxlength="500"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "theForm",
  components: {},
  props: {},
  data() {
    return {
      ActivityTypes: [], //活动类型
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        startDate: [
          { required: true, message: "请选择开始日期", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请选择结束日期", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ]
      },
      //表单数据
      form: {
        title: "", //活动名称
        startDate: "", //开始日期
        endDate: "", //结束日期
        startTime: "", //开始时间
        endTime: "", //结束时间
        activeAddress: "", //活动地址
        activeType: "", //活动类型
        activeContent: "", //活动内容
        remark: "" //备注
      }
    };
  },
  computed: {},
  methods: {
    closeData(i) {
      switch (i) {
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/secretary/leaderActivity/printProcessing",
            query: { id: this.$route.query.id }
          });
          break;
        case "操作指南":
          this.caozuozhinan();
          break;
        case "关闭":
          this.$confirm("是否保存表单数据?", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning"
          })
            .then(() => {
              this.Savedata();
              this.$intent.closeWindow(this);
            })
            .catch(() => {
              this.$intent.closeWindow(this);
            });
          break;
        case "保存":
          this.Savedata();
          break;
      }
    },
    Savedata() {
      this.$refs["form"].validate((valid, object) => {
        if (valid) {
          this.$api.secreatary.activety.mishuSave(this.form).then(res => {
            if (res.code === "SUCCESS") {
              this.$message({
                message: "保存成功",
                type: "success"
              });

              window.opener.location.reload();
              this.$intent.closeWindow(this);
            }
          });
        } else {
          //滚动到必填项
          for (let i in object) {
            let dom = this.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
        }
      });
      // this.form.leaderCheckedValue = this.form.leaderCheckedValue.toString()
    },
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "YZGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_WordTs",
                  query: {
                    state: "viewFile",
                    id: this.sendId || this.$route.query.id, //表单id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: "000000iiii",
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false
                  }
                });
                window.open(data.href, "_blank");
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件不存在",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    },
    details(id) {
      this.$api.secreatary.activety.Detailsms({ id: id }).then(res => {
        console.log(res, "秘书详情");
        if (res.code === "SUCCESS" && res.data.data) {
          this.form = res.data.data;
        }
      });
    }
  },
  activated() {},
  mounted() {},
  created() {
    //活动类型
    this.$api.secreatary.activety.ActivityType({}).then(res => {
      console.log(res, "活动类型");
      this.ActivityTypes = res.data;
    });
    if (this.$route.query.id) {
      let id = this.$route.query.id;
      this.details(id.trim());
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.Newactivity {
  .el-form {
    border: 1px solid #dcdfe6;
    width: 90%;
    padding: 2% 2%;
    margin: auto;
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

  .message {
    margin: 10px 10%;

    .tables {
      margin-top: 20px;
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
      border-left: 1px solid #eee;

      .line {
        display: flex;
        border-top: 1px solid #eee;
        line-height: 40px;

        .left {
          width: 150px;
          text-align: center;
          border-right: 1px solid #eee;
        }

        .right {
          margin-left: 20px;
          flex: 1;
        }
      }

      .line-item {
        line-height: 25px;
        font-size: 13px;
      }
    }
  }
}
</style>
