<template>
  <div id="activetyBox">
    <el-header>
      <div class="headerClick">
        <el-button
          class="bank_grid_comtent_active"
          style="background: #0563c8!important;
           color: #fff!important;"
          @click="shutDown"
        >关闭</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
      </div>
    </el-header>
    <div id="printHtml">
      <div class="maintitle">{{formData.draftOrgan}}领导活动资料管理单</div>
      <div class="container">
        <div class="content-header">
          <p>
            当前环节：
            <span style="color: #f60; color: red !important;">{{formData.curNodeName}}</span>
          </p>
          <p>
            当前处理人：
            <span style="color: #f60; color: red !important;">{{formData.currentUser}}</span>
          </p>
        </div>
        <el-form ref="RefForm" :model="formData" label-width="120px" :rules="rules">
          <el-row :gutter="200">
            <el-col :span="12">
              <el-form-item label="日期">
                <el-date-picker
                  v-model="formData.activeDate"
                  type="date"
                  placeholder="选择日期"
                  :disabled="isAlldisabled"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="时间">
                <el-time-select
                  v-model="formData.activeTime"
                  placeholder="选择时间"
                  :disabled="isAlldisabled"
                ></el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="地点">
              <el-input
                placeholder="请输入内容"
                v-model="formData.activeAddress"
                type="textarea"
                :disabled="isAlldisabled"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-col :span="19">
              <el-form-item label="参与人员" prop="attendMemCn">
                <el-input placeholder="请选择内容" v-model="formData.attendMemCn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="margin:5px 0 0 5px">
              <el-button type="primary" @click="selectPersonBtn" :disabled="isAlldisabled">选择</el-button>
              <el-button type="primary" @click="selectReset" :disabled="isAlldisabled">清空</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="活动名称" prop="title">
                <el-input
                  placeholder="请输入内容"
                  v-model="formData.title"
                  clearable
                  :disabled="isAlldisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="活动类型">
                <el-input
                  placeholder="请输入内容"
                  v-model="formData.activeType"
                  clearable
                  :disabled="isAlldisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="活动描述">
                <el-input
                  placeholder="请输入内容"
                  v-model="formData.activeContent"
                  clearable
                  :disabled="isAlldisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="附件名称">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="formData.attTitle"
                  :disabled="isAlldisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="附件">
              <el-col :span="23">
                <div class="tree_w">
                  <el-scrollbar>
                    <div
                      v-for="(item) in this.attchmentFileInfoList"
                      :key="item.id"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_file">
                          <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downFile(item)"
                              round
                            >下载</el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
  </div>
</template>

<script>
import uploadFileTs from "components/uploadFile/uploadFileTs";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import exportTable from "../../../minixs/exportTable";
import minixs from "../../../minixs/index";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
export default {
  name: "activityManage",
  components: {
    uploadFileTs,
    shiwuFlow
  },
  mixins: [minixs, openOrDownLoadFile],
  data() {
    return {
      attchmentFileInfoList: [], //储存附件的数据
      showFlowChart: false, //查看流程
      isAlldisabled: false,
      shanchubtn: true, //约束条件删除按钮
      uploadConfig: {
        formId: "mishuActivity",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      id: "",
      formData: {
        curNodeName: "起草",
        currentNowName: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName +
            " " +
            JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        draftUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        draftUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        draftDepartmentId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
          : "",
        draftOrgan: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitName
          : "",
        authorCn: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "", //拟稿人
        activeDate: formatData(new Date().getTime(), "YYYY-MM-DD"), //日期
        activeTime: new Date()
          .toLocaleTimeString("chinese", { hour12: false })
          .substr(0, 5), //时间
        activeAddress: "", //地点
        attendMemCn: "", //参与人员
        attendMemCnId: "", //参与人员ID
        title: "", //活动名称
        activeType: "", //活动类型
        activeContent: "", //活动描述
        attFullDir: "", //附件位置
        attTitle: "", //附件名称
        id: "",
        handleButton: "" //区分完成并发送和办结的标识
      },
      rules: {
        attendMemCn: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        title: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      buttonList: [
        { name: "催办", type: "cuiban", show: true },
        { name: "收回", type: "shouhui", show: false },
        { name: "查看流程", type: "ckliucheng", show: true },
        { name: "打印处理单", type: "dayinchulidan", show: true },
        { name: "收藏", type: "shoucang", show: true },
        { name: "操作指南", type: "caozuozhinan", show: true }
      ]
    };
  },
  computed: {},
  methods: {
    //关闭
    shutDown() {
      this.$intent.closeWindow(this);
    },
    //选择人员按钮
    selectPersonBtn() {},
    //清空
    selectReset() {
      this.formData.attendMemCn = "";
      this.formData.attendMemCnId = "";
    },
    //打印处理单
    Printprocessing() {
      let data = this.$router.resolve({
        path: "/LeaderActivities",
        query: { dataList: this.formData.id, type: this.$route.query.type }
      });
      window.open(data.href, "_blank");
    },
    //按钮
    buttonClick(params) {
      switch (params) {
        case "操作指南":
          this.handBook("MSGZ");
          break;
        case "查看流程":
          this.$api.activityInformation
            .proessViewActivity({ id: this.formData.id })
            .then(res => {
              this.showFlowChart = true;
              this.flowChartList = res.list;
              this.$nextTick(() => {
                this.$refs.dialogLine.openDialog();
              });
            });
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              this.$api.activityInformation
                .collecTion({ id: this.formData.id })
                .then(res => {
                  console.log(res);
                  this.downFile(res);
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });

          // let titleId = "printHtml";
          // let that = this;
          // let activetyTitle = this.formData.draftOrgan + "领导活动资料管理单";
          // let draftInfo = this.attchmentFileInfoList;
          // exportTable.getPdf(
          //   activetyTitle,
          //   draftInfo,
          //   titleId,
          //   this.$businessCode.msgzfj,
          //   activetyTitle,
          //   that
          // );
          break;
        case "催办":
          this.$api.activityInformation
            .UrgingActivity({ id: this.formData.id })
            .then(res => {
              // this.$api.activityInformation
              //   .UrgingMessageActivity({
              //     userId: JSON.parse(localStorage.getItem("userInfo")).humanId, //用于催办的消息提醒
              //     productCode: "cuiB",
              //     urgentType: "",
              //     infoType: "秘书工作领导活动资料催办",
              //     infoTitle: this.formData.draftOrgan + "领导活动资料管理单",
              //     infoUser: this.formData.draftUser
              //   })
              //   .then(res => {
              //     this.$message({
              //       type: "success",
              //       showClose: true,
              //       message: res.msg
              //     });
              //   });
              this.$message({
                type: "success",
                showClose: true,
                message: res.msg
              });
            });
          break;
        case "收回":
          this.$api.activityInformation
            .RecoverActivity({ id: this.formData.id })
            .then(res => {
              this.$message({
                type: "success",
                showClose: true,
                message: "收回成功"
              });
              this.$intent.closeWindow(this);
            });
          break;
        case "打印处理单":
          this.Printprocessing();
          break;
      }
    },
    loadData() {
      this.$api.activityInformation
        .viewActivity({ id: this.$route.query.data })
        .then(res => {
          this.formData = res.data;
          this.id = res.data.id;

          // 获取当前登陆用户信息
          const userInfoJSON = localStorage.getItem('userInfo');
          const userInfo = userInfoJSON ? JSON.parse(userInfoJSON) : {};
          // 判断 收回按钮显示，(收回按钮显示默认为 false，不显示)
          // 当前登陆用户 humanCode 与上一办理人的 oldUserCode 相等， isReadFlag === '0' 未阅时， 不是办结阶段
          // 以上条件满足时，显示 收回按钮
          if (userInfo.humanCode === this.formData.oldUserCode && this.formData.isReadFlag === '0' && this.$route.query.type != "办结") {
            let shouhuiIndex = undefined;
            const shouhuiObj = this.buttonList.find((item, index) => {
              if (item.type === 'shouhui') {
                shouhuiIndex = index
                return true
              }
              return false
            });
            this.$set(this.buttonList, shouhuiIndex, { ...shouhuiObj, show: true })
          }

          this.getFileList();
        });
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
        this.attchmentFileInfoList = res.data;
        let attTitleList = [];
        res.data.forEach(item => {
          attTitleList.push(item.fileName);
        });
        this.formData.attTitle = attTitleList.join("\n");
      });
    },
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
              // location.href =
              //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              //     res.filePath +
              //     "&fileName=" +
              //     res.fileName;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    }
  },
  created() {
    if (this.$route.query.data) {
      this.formData.id = this.$route.query.data;
      this.id = this.$route.query.data; //暂时写一个变量
      this.loadData();
      this.isAlldisabled = true;
    }
    const cuibanIndex = this.buttonList.findIndex(item => item.type === 'cuiban');
    const shouhuiIndex = this.buttonList.findIndex(item => item.type === 'shouhui');
    if (this.$route.query.type == "已办") {
      this.buttonList[cuibanIndex].show = true;
    } else if (this.$route.query.type == "办结") {
      this.buttonList[cuibanIndex].show = false;
      this.buttonList[shouhuiIndex].show = false;
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.container {
  .content-header {
    display: flex;
    font-size: 14px;
    padding: 10px;
    margin-bottom: 20px;
    // border: 1px solid #f9aa21;
    border: 1px solid #f60;
    background: #fef7e7;
    box-sizing: border-box;
    p {
      padding-right: 20px;
    }
  }
}
.el-col ::v-deep {
  border: 1px solid transparent;
}
.el-header {
  background-color: #3b85ef;
  line-height: 60px;
}
.title {
  color: #ffffff;
}
.btn {
  float: right;
}
.btnstyle {
  color: #3b85ef;
}
.btnstyle:hover {
  background-color: #3b85ef;
  color: cornsilk;
}
.maintitle {
  font-size: 30px;
  color: rgb(14, 117, 214);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
}
.container {
  width: 80%;
  padding-bottom: 20px;
  margin: 30px auto;
  border: 1px solid rgb(218, 215, 215);
  padding: 20px 20px;
  position: relative;
}
.c-header {
  background-color: #fef7e7;
  border: 1px solid #f9aa21;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.el-table .cell {
  white-space: pre-line;
}
.el-form-item ::v-deep {
  margin-bottom: 12px;
}
.form-word {
  width: 80px;
  float: left;
  line-height: 20px;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
.person {
  text-align: right;
  color: #606266;
  p {
    line-height: 1.5;
    font-size: 14px;
  }
}
//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;

    .one_btn {
      width: 80px;
      height: 42px;
      line-height: 42px;
    }

    .btns {
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
    }

    .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }

    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
.tree_w1 {
  height: 100px;
  padding: 0;
  // overflow: scroll;
  margin: 0;
}
</style>