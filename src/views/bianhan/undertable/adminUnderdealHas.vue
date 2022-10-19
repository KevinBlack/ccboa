<template>
  <div class="process_order" id="bianhanzhifa">
    <!-- 将表单内容抽成一个table表格，用于收藏表单数据 -->
    <collectionPage :formdata="formdata" pagetype="cb"></collectionPage>

    <div class="headerClick">
      <div class="right">
        <el-button
          plain
          class="bank_grid_comtent_active"
          @click="buttonClick('关闭')"
          style="margin-right: 10px"
        >关闭</el-button>
        <!--v-if="$route.query.type==-1"判断 管理员-制办-详情跳转过来展示按钮-->
        <!--维护：表单可编辑状态
        流程调度：制办完成并发送-->
        <el-button
          plain
          @click="buttonClick('保存')"
          v-show="!inputDisable"
          class="bank_grid_comtent_active"
        >保存</el-button>
        <el-button plain @click="buttonClick('重新流转')">重新流转</el-button>
        <el-button plain @click="buttonClick('查看流程')">查看流程</el-button>
        <el-button plain @click="buttonClick('打印处理单')">打印处理单</el-button>
        <el-button plain @click="buttonClick('收藏')">收藏</el-button>
        <el-button plain @click="buttonClick('操作指南')">操作指南</el-button>
        <el-button v-if="$route.query.type==-1" plain @click="buttonClick('维护')">维护</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="shiwuTitle">{{formdata.deptTableHeader}}</div>
    </div>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <sidebarNavigation container="#bank_dispach_content"></sidebarNavigation>

      <div class="bank_dispach_file">
        <div class="process_content">
          <div class="cur_box">
            <div class="cur_sess">
              <p>
                当前环节：
                <span>{{formdata.currentNode}}</span>
              </p>
              <p v-if="formdata.currentNode!='办理结束'">
                当前处理人：
                <span>{{formdata.currentNowName}}</span>
              </p>
            </div>
            <div class="feed_back">
              <p class="label_title">反馈方式</p>
              <template>
                <el-radio-group v-model="formdata.feedbackMode" disabled>
                  <el-radio :label="'0'">无需反馈</el-radio>
                  <el-radio :label="'1'">反馈意见</el-radio>
                  <el-radio :label="'2'">反馈意见及附件</el-radio>
                </el-radio-group>
              </template>
            </div>
          </div>
          <el-form label-width="120px" :model="formdata">
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <el-row>
              <el-col :span="formdata.feedbackMode!='0'?16:24">
                <el-form-item label="正文标题">
                  <el-input v-model="formdata.title" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.feedbackMode!='0'">
                <el-form-item label="反馈截止日期">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="formdata.feedTime"
                    style="width: 100%"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="formdata.bnbh?24:16">
                <el-form-item label="编号" prop="documentNo">
                  <el-input v-model="formdata.documentNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.isBnBh">
                <el-form-item v-if='isZH' label prop="isbnbh" style="text-align: right">
                  <el-checkbox
                    v-model="formdata.isBnBh"
                    true-label="1"
                    false-label="0"
                    disabled
                  >部内便函</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="接收日期" prop="receiveDate">
                  <el-input v-model="formdata.receiveDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="主送">
              <el-input
                v-model="formdata.main"
                disabled
                type="textarea"
                :autosize="{ minRows: 1}"
                class="zhusong"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="抄送">
              <el-input
                v-model="formdata.copy"
                disabled
                type="textarea"
                :autosize="{ minRows: 1}"
                class="chaosong"
                resize="none"
              ></el-input>
            </el-form-item>

            <div class="editor_box" style="position:relative">
              <label>内容</label>
              <UE :defaultMsg="formdata.content" :config="config" id="UE" ref="ue"></UE>
            </div>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿部门">
                  <el-input v-model="formdata.draftDepartmentOne" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟稿日期">
                  <el-date-picker
                    type="date"
                    v-model="formdata.draftTime"
                    value-format="yyyy-MM-dd"
                    disabled
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿人">
                  <el-input v-model="formdata.draftUser" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话">
                  <el-input v-model="formdata.phone" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="移动端展示" v-if="isZH">
              <el-radio-group v-model="formdata.isMobileServiceShow" disabled>
                <el-radio :label="'0'">是</el-radio>
                <el-radio :label="'1'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>

            <el-form-item label="签发意见">
              <template>
                <format-form-fild :arrayList="formdata.sendList" disabled></format-form-fild>
                <el-row v-if="!(formdata.sendList && formdata.sendList.length!=0)">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      :disabled="true"
                    ></el-input>
                  </el-col>
                </el-row>
              </template>
            </el-form-item>
            <!-- <controllableEditingField 
             :isWeiHu="inputDisable" lableTitle='签发意见' 
              listtype='send'
            :formadatalist='formdata.sendList' @delefunc='delefunc'></controllableEditingField>-->

            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="最终意见"
              listtype="final"
              :formadatalist="formdata.zzOpinion"
              @delefunc="delefunc"
            ></controllableEditingField>

            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="过程意见"
              listtype="process"
              :formadatalist="formdata.processList"
              @delefunc="delefunc"
            ></controllableEditingField>

            <el-form-item label="传阅意见">
              <div v-for="item in formdata.cyList" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows:3}"
                        resize="none"
                        :value="item.content"
                        disabled
                        class="d_f1"
                      ></el-input>
                      <div v-for="file in item.attachmentPos" :key="file.id">
                        <span
                          class="name down"
                          style="cursor:pointer;background-color: rgba(228,231,237,.32)"
                          @click="viewFile(file)"
                        >{{file.fileName}}</span>
                      </div>
                      <div class="adviceInfo" style="position: static;right: 0;">
                        {{item.departmentName}}
                        <span class="pad_lr10">{{item.userName}}</span>
                        {{item.createTime}}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <el-input
                v-if="!(formdata.cyList && formdata.cyList.length!=0)"
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                disabled
              ></el-input>
            </el-form-item>

            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="备注"
              listtype="comment"
              :formadatalist="formdata.commentsList"
              @delefunc="delefunc"
            ></controllableEditingField>

            <el-form-item label="传阅人员">
              <div class="con-box" style="border:1px solid #ccc;margin-bottom:1px">
                <div class="clear-fix chuanyue1">
                  <p class="chuanyue-p1">未阅</p>
                  <el-input
                    class="chuanyue-p2 chuanyue-textarea"
                    v-model="formdata.wyPle"
                    type="textarea"
                    disabled
                    :autosize="{ minRows:2}"
                    resize="none"
                  ></el-input>
                </div>
                <div class="clear-fix chuanyue chuanyue-textarea2">
                  <p class="chuanyue-p1">已阅</p>
                  <el-input
                    class="chuanyue-p2"
                    type="textarea"
                    disabled
                    :autosize="{ minRows:2}"
                    resize="none"
                    v-model="formdata.yyPle"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <upfileList
              v-if="formdata.attchmentFileInfoZhi&&formdata.attchmentFileInfoZhi.length"
              :canmoveOrdown="false"
              label="制发单附件"
              :fileList="formdata.attchmentFileInfoZhi"
              disabled
            ></upfileList>

            <upfileList
              v-if="formdata.feedbackMode=='2'||formdata.feedbackMode=='1'"
              :canmoveOrdown="!inputDisable"
              label="承办单附件"
              :fileList="formdata.attchmentFileInfo"
            >
              <upload-file-ts :uploadConfig="uploadConfig"  :disabled="inputDisable" :fileId="fileId" @fileList="fileList"></upload-file-ts>
            </upfileList>
          </el-form>
        </div>
      </div>
    </div>
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
  </div>
</template>

<script type="text/ecmascript-6">
import beanList from "../../../util/beanList";
import FdForm from "vue-elementui-freedomen/components/form";
import exportTable from "../../../minixs/exportTable";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import { mapGetters, mapActions } from "vuex";
import UE from "components/editor/ue.vue";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import sidebarNavigation from "../components/sidebarNavigation";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import formatFormFild from "../components/formatFormFiled";
import controllableEditingField from "../components/controllableEditingField";
import collectionPage from "../components/collectionPage";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import upfileList from "../components/showUploadFile"; //附件展示

export default {
  name: "proceorderdeal",
  components: {
    FdForm,
    shiwuFlow,
    UE,
    sidebarNavigation,
    formatFormFild,
    controllableEditingField,
    collectionPage,
    uploadFileTs,
    upfileList
  },
  mixins: [openOrDownLoadFile, bianhanPublic],
  data() {
    return {
      fileId: "",
      isZH: JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000",
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      inputDisable: true, //表单类是否可编辑
      formdata: { zzList: [], processList: [], zzOpinion: {} },
      id: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      isMulti:this.$route.query.ismulti,
      radio: 0,
      showFlowChart: false,
      flowChartList: []
    };
  },
  computed: {
    ...mapGetters(["todoItem"])
  },
  created() {
    this.id = this.$route.query.id;
    this.loadData();
  },
  mounted() {},
  methods: {
    delefunc(item) {
      this.$api.bianhan.delProcessList(item).then(res => {
        this.loadData();
      });
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.$intent.closeWindow(this);
          break;
        case "保存":
          this.save();
          break;
        case "收藏":
          exportTable.collect(this, this.id, 'cb','',this.numyear)
          break;
        case "催办":
          this.$api.bianhan.cuiban({ ids: this.id, type: "1" }).then(res => {
            this.$message({
              message: "催办成功",
              type: "success"
            });
          });
          break;
        case "收回":
          this.$api.bianhan
            .zfBack({
              id: this.id,
              avyId: this.todoItem.avyId,
              oldCurrentNode: this.todoItem.oldCurrentNode,
              type: "CB"
            })
            .then(res => {
              this.$message({ type: "sucess", message: "收回成功" });
              this.$intent.closeWindow(this);
            });
          break;
        case "重新流转":
          this.$confirm(
            "系统将删除办结库及待归库中的办结文件，是否继续？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(() => {
            this.formdata.type='cb';
            this.$api.bianhan.refloat(this.formdata).then(res => {
              this.$message({
                message: "操作成功",
                type: "success"
              });
            });
             this.$intent.closeWindow(this);
          });
          break;
        case "查看流程":
          this.$refs.dialogLine.openDialog();
          this.$api.bianhan
            .getLiuCheng({ id: this.id, type: "1",numYear:this.numyear })
            .then(res => {
              this.showFlowChart = true;
              this.flowChartList = res.list;
            });
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/bianhanCb",
            query: { id: this.id,numYear:this.numyear }
          });
          break;
        case "操作指南":
          this.handBook('BHGL');
          break;
        case "维护":
          this.inputDisable = !this.inputDisable;
          try {
            if (this.inputDisable) {
              this.$refs.ue.setDsabled();
            } else {
              this.$refs.ue.setEable();
              console.log(this.$refs.ue.setEable());
            }
          } catch (e) {}

          break;
      }
    },
    save() {
      this.formdata.type = "admin";
      this.formdata.content =
        process.env.NODE_ENV == "production"
          ? this.$refs.ue.getUEContent()
          : "";
      let that = this;
      //数据过滤，为新增或修改数据添加表单id,用于管理员数据维护
      try {
        this.formdata.commentsList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
      try {
        this.formdata.processList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
      try {
        this.formdata.zzOpinion.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
      this.$api.bianhan.underAlertData(this.formdata).then(res => {
        that.$message({
          message: "保存成功",
          type: "success"
        });
        this.loadData();
      });
    },
    fileList(files) {
      if (
        this.formdata.attchmentFileInfo &&
        this.formdata.attchmentFileInfo.length
      ) {
        this.formdata.attchmentFileInfo.push(...files);
      } else {
        this.formdata.attchmentFileInfo = files;
      }
      this.$forceUpdate();
    },
    loadData() {
      this.$api.bianhan.underDeal({ id: this.id, type: "admin",numYear:this.numyear,isMulti:this.isMulti }).then(res => {
        this.formdata = res.bHCbOrderDo;
        this.buttonDisabled = false;
        this.$set(this.formdata, "zzOpinion", []);
        this.$set(this.formdata, "commentsList", []);
        this.$set(this.formdata, "processList", []);
        this.formdata.receiveDate = res.bHCbOrderDo.receiveDate.slice(0, 10);
        try {
          this.formdata.cyList = res.cyList.filter(item => {
            this.$api.setSysConfig
              .getTextemList({ id: item.dataId, fileType: "10010",numYear:this.numyear })
              .then(res => {
                this.$set(item, "attachmentPos", res.data);
                this.$forceUpdate();
              });
            return item;
          });
        } catch (e) {
          this.formdata.cyList = res.cyList;
        }
        this.formdata.sendList = res.sendList;
        this.formdata.zzOpinion = res.zzOpinion;
        this.formdata.processList = res.processList;
        this.formdata.zzList = res.zzList;
        this.formdata.commentsList = res.commentsList;
        this.formdata.draftDepartmentOne =
          this.formdata.draftDepartmentOne || this.formdata.draftDepartment;
        this.getFileList();
        setTimeout(() => {
          this.$refs.ue.setDsabled();
          this.$refs.ue.setUEContent(this.formdata.content);
        }, 1000);
      });
    },
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({ id: this.formdata.parentDocId ,numYear:this.numyear})
        .then(res => {
          this.$set(this.formdata, "attchmentFileInfoZhi", res.data);
        });
      this.$api.setSysConfig.getTextemList({ id: this.id,numYear:this.numyear }).then(res => {
        this.$set(this.formdata, "attchmentFileInfo", res.data);
      });
    }
  }
};
</script>
<style scoped lang="less">
/deep/.zhusong .el-textarea__inner,
/deep/.chaosong .el-textarea__inner {
  min-height: 31px !important;
}
/deep/.el-textarea__inner[disabled] {
  background-color: #e4e7ed52 !important;
  color: #606266 !important;
  cursor: not-allowed;
}
/deep/.chuanyue-textarea .el-textarea__inner {
  min-height: 31px !important;
  margin-top: 0px;
  margin-bottom: 0px;
  height: 32px;
  border: 0;
  outline: medium;
  padding: 0;
  height: auto;
  line-height: 31px;
}
/deep/.chuanyue-textarea2 .el-textarea__inner {
  min-height: 31px !important;
  margin-top: 0px;
  margin-bottom: 0px;
  height: 32px;
  padding: 0;
  height: auto;
  line-height: 31px;
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}

.height_90 {
  height: 200px;
  margin-top: -200px;
}

.bank_dispach_content {
  width: 100%;
  height: auto;
}

.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.process_order {
  background: white;
  min-height: 1000px;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    width: 100%;
    height: 70px;
    line-height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1999;
    align-items: center;

    .left {
      margin-left: 20px;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;
  }

  .process_content {
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;

    .cur_box {
      .el-radio-group {
        margin-top: 9px !important;
        margin-right: 12px !important;
      }

      .el-radio {
        margin-right: 0 !important;
        margin-left: 16px !important;
      }

      .cur_sess {
        float: left;
        display: flex;
        margin-top: 12px;

        p {
          // height: 30px;
          line-height: 6px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
        }
      }

      .feed_back {
        float: right;
        display: flex;
        font-size: 14px;
        height: 30px;
        line-height: 6px;
        color: #0f100e;

        .label_title {
          margin-top: 12px;
        }
      }
    }

    .form_taxt {
      width: 90%;
      height: 100%;
      margin: 0 auto;

      .el-form-item__label {
        text-align: left !important;
      }

      .annex_btn_list {
        width: 86%;
        margin: 0 auto;
        margin-top: 16px;
        display: flex;

        div {
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: #0562c7;
          color: #fff;
          border-radius: 5px;
          margin-left: 16px;
          cursor: pointer;
        }

        div:nth-child(4) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }

        div:nth-child(5) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }
      }
    }

    .editor_box {
      height: 450px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 130px;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}

.adviceInfo {
  position: absolute;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
  background-color: rgba(228,231,237,.32)
}

.pad_lr10 {
  padding: 0 10px;
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

.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}

.chuanyue1 {
  border-bottom: 1px solid #ccc;
}

.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  float: left;
  border-right: 1px solid #ccc;
  text-align: center;
  min-height: 62px;
  line-height: 62px;
}

.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
</style>
