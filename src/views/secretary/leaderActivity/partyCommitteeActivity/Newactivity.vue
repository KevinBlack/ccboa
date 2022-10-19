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
        <el-button
          v-if="btnshow"
          @click="closeData('加至领导资料库')"
          class="bank_grid_comtent_active"
        >加至领导资料库</el-button>
        <el-button
          v-if="LookId"
          @click="closeData('查看领导资料库')"
          class="bank_grid_comtent_active"
        >查看领导资料库</el-button>
        <!-- <el-button @click="closeData('加入值班动态')" class="bank_grid_comtent_active">加入值班动态</el-button> -->
      </div>
    </div>
    <div class="formHeader">
      <div class="shiwuTitle">本周党委成员活动安排表单</div>
      <div class="content">
        <el-row style="margin-bpttom:20px;">
          <el-col :offset="20">
            <el-radio-group v-model="form.isShareFlag">
              <el-radio label="1">共享</el-radio>
              <el-radio label="0">不共享</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
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
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间" prop="startTime">
                <el-time-select
                  v-model="form.startTime"
                  :picker-options="{start: '07:00',step: '01:00',end: '18:00'}"
                ></el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间" prop="endTime">
                <el-time-select
                  v-model="form.endTime"
                  :picker-options="{start: '07:00',step: '01:00',end: '18:00'}"
                ></el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="同时添加至" prop="newDate" >
                <el-date-picker
                  v-model="form.newDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
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
              <el-form-item label="行领导">
                <el-select v-model="form.leaderCheckedValue" multiple placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.leaderHumanId"
                    :label="item.leaderCnName"
                    :value="item.leaderHumanId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          
          </el-row>
          <!-- <el-row></el-row> -->
          <el-row>
              <!-- <el-col :span="8">
              <el-form-item label="参会行领导">
                <el-select v-model="form.attendBankLeader" multiple placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.leaderHumanId"
                    :label="item.leaderCnName"
                    :value="item.leaderHumanId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
             <el-col :span="8">
              <el-form-item label="活动地点" prop="activeAddress">
                <el-input v-model="form.activeAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="活动内容" prop="draftDate">
                <el-input type="textarea" v-model="form.activeContent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注" prop="remark">
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
  name: "Newactivity",
  components: {},
  props: {},
  data() {
    return {
      sendId: "", //表单id
      LookId: "",
      options1:[],
      // data: [],
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        startDate: [
          { required: true, message: "请选择开始日期", trigger: "blur" }
        ],
        startTime: [{ required: true, message: "开始时间", trigger: "blur" }],
        endTime: [{ required: true, message: "结束时间", trigger: "blur" }],
        newDate: [{ required: true, message: "添加至时间", trigger: "blur" }]
      },
      btnshow: this.$route.query.id,
      options: [],
      form: {
        isShareFlag: "1", //是否共享
        title: "", //活动名称
        startDate: "", //开始日期
        startTime: "", //开始时间
        endTime: "", //结束时间
        newDate: "", //添加至时间
        activeAddress: "", //活动地址
        activeType: "", //活动类型
        activeContent: "", //活动内容
        remark: "", //备注
        leaderCheckedValue: "", //行领导id
        // attendBankLeader:'', // 参会行领导
      },
      ActivityTypes: []
    };
  },
  computed: {},
  methods: {
    //获取行领导
    loadData() {
      this.$api.secreatary.activety.formbank({}).then(res => {
        console.log(res, "行领导");
        this.options1 = res.data.data;

        this.options = res.data.data2;
      });
    },

    closeData(i) {
      switch (i) {
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/secretary/leaderActivity/detel",
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
        case "加至领导资料库":
          let that = this;
          let parsm = {
            leaderActiveId: this.$route.query.id ? this.$route.query.id : "", //表单id
            id: this.form.leaderActiveDataId
              ? this.form.leaderActiveDataId
              : "", //加至id
            title: this.form.title, //活动名称
            activeDate: this.form.startDate, //日期
            activeTime: this.form.startTime, //时间
            activeAddress: this.form.activeAddress, //地点
            activeType: this.form.activeAddress, //活动类型
            activeContent: this.form.activeAddress, //活动描述
            attendMemCn: this.form.attendBankLeader, //主持行领导
            attendMemCnId: this.form.leaderCheckedValue.toString()//主持行领导id
          };
          this.$api.secreatary.activety.lingdao(parsm).then(res => {
            console.log(res, "加至领导资料库");
            if (res.code === "SUCCESS") {
              this.LookId = res.data.data.id;
              onsole.log(this.LookId)

              this.$message({
                showClose: true,
                type: "success",
                message: "加至领导资料库成功"
              });
            }
          });
          break;
        case "加入值班动态":
          this.$api.secreatary.activety
            .zhiban({ id: this.$route.query.id })
            .then(res => {
              console.log(res, "加入值班动态");
              if (res.code === "SUCCESS") {
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "加入值班动态成功"
                });
              }
            });
          break;
        case "查看领导资料库":
          console.log(this.LookId)
          if (this.LookId) {
            this.$intent.goNewPage(this, {
              path: "/secretary/datumManage/activityManage",
              query: { data: this.LookId, type: "datumManage_index" }
            });
          }
      }
    },
    Savedata() {
      if (!this.form.leaderCheckedValue) {
        this.form.leaderCheckedValue = "";
      }
      console.log(this.form, "222");

      this.form.leaderCheckedValue = this.form.leaderCheckedValue.toString();
      // this.form.attendBankLeader = this.form.attendBankLeader.toString();
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.secreatary.activety.Save(this.form).then(res => {
            if (res.code === "SUCCESS") {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              window.opener.location.reload();
              this.$intent.closeWindow(this);
            }
          });
        }
      });
    },
    details(id) {
      this.$api.secreatary.activety.Details({ id: id }).then(res => {
        console.log(res, "详情");
        this.form = res.data.data;
        console.log(this.form,'sss')
        this.form.leaderCheckedValue = this.form.leaderCheckedValue.split(","); //行领导专属组回显
        // this.form.attendBankLeader = this.form.attendBankLeader.split(","); //行领导专属组回显
        this.LookId = res.data.data.id;
          console.log(this.LookId)
          console.log(res.data.data.id)
      });
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
    }
  },
  activated() {},
  mounted() {},
  created() {
    // 行领导数据
    this.loadData();
    //活动类型
    this.$api.secreatary.activety.ActivityType({}).then(res => {
      console.log(res, "活动类型");
      this.ActivityTypes = res.data;
    });
    // this.form.one = ['13000011252']
    //判断是否查看表单详情
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
