/**
* create by zx on 2020/8/31 15:12
* 类注释：
* 备注：
*/
<template>
  <div class="proceHas" id="bianhanzhifa">
    <!-- 将表单内容抽成一个table表格，用于收藏表单数据 -->
    <collectionPage :formdata="formdata" pagetype="zf" :formList="formList"></collectionPage>
    <div class="headerClick">
      <div class="right">
        <el-button
          plain
          class="bank_grid_comtent_active"
          @click="buttonClick('关闭')"
          style="margin-right: 10px"
        >关闭</el-button>
        <el-button
          plain
          @click="buttonClick('保存')"
          v-show="!inputDisable"
          class="bank_grid_comtent_active"
        >保存</el-button>
        <el-button plain @click="buttonClick('归档')" v-show="!inputDisable&&onFileFlag!=1" class="bank_grid_comtent_active">归档</el-button>
         <el-button plain @click="buttonClick('区块链归档')" v-show="isNewFilePlace &&!inputDisable" class="bank_grid_comtent_active">区块链归档</el-button>
        <el-button plain @click="buttonClick('重新流转')" class="bank_grid_comtent_active">重新流转</el-button>
        <el-button plain @click="buttonClick('查看流程')" class="bank_grid_comtent_active">查看流程</el-button>
        <el-button plain @click="buttonClick('打印处理单')" class="bank_grid_comtent_active">打印处理单</el-button>
        <el-button plain @click="buttonClick('收藏')" class="bank_grid_comtent_active">收藏</el-button>
        <el-button plain @click="buttonClick('操作指南')" class="bank_grid_comtent_active">操作指南</el-button>
        <el-button v-if="$route.query.type==-1" plain @click="buttonClick('维护')" class="bank_grid_comtent_active">维护</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="shiwuTitle">{{formdata.deptTableHead}}</div>
    </div>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <sidebarNavigation container="#bank_dispach_content"></sidebarNavigation>
      <div class="bank_dispach_file">
        <div class="process_content">
          <el-form label-width="120px" :model="formdata">
            <div class="cur_box">
              <div class="cur_sess">
                <p>
                  当前环节：
                  <span>{{formdata.currentNode}}</span>
                </p>
                <p v-if="formdata.currentNode!='办结'">
                  当前处理人：
                  <span>{{formdata.currentNowName}}</span>
                </p>
              </div>
              <div class="feed_back">
                <p class="label_title">反馈方式</p>
                <template>
                  <el-radio-group
                    v-model="formdata.feedbackMode"
                    style="margin: 12px 10px 0 5px;"
                    :disabled="inputDisable"
                  >
                    <el-radio :label="'0'">无需反馈</el-radio>
                    <el-radio :label="'1'">反馈意见</el-radio>
                    <el-radio :label="'2'">反馈意见及附件</el-radio>
                  </el-radio-group>
                </template>
              </div>
            </div>

            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <el-row v-if="this.formdata.currentNode==='办结'">
            <el-col :span="12">
              <el-form-item label="是否归档">
                  <el-radio-group v-model="onFileFlag" :disabled="inputDisable">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否抽取">
                  <el-radio-group v-model="extractFlag" :disabled="inputDisable">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
              <el-col :span="formdata.feedbackMode!='0'?16:24">
                <el-form-item label="正文标题">
                  <el-input v-model="formdata.title" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.feedbackMode!='0'">
                <el-form-item label="反馈截止日期">
                  <el-date-picker
                    type="date"
                    format="yyyy-MM-dd"
                    v-model="formdata.feedTime"
                    style="width: 100%"
                    :disabled="inputDisable"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="编号" prop="documentNo">
                  <el-input v-model="formdata.documentNo" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label
                  prop="isbnbh"
                  v-if='isZH'
                  style="text-align: right"
                  :disabled="inputDisable"
                >
                  <el-checkbox
                    v-model="formdata.bnbh"
                    true-label="1"
                    false-label="0"
                    :disabled="inputDisable"
                  >部内便函</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="主送">
              <el-input
                v-model="formdata.main"
                :disabled="inputDisable"
                type="textarea"
                :autosize="{ minRows: 1}"
                class="zhusong"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="抄送">
              <el-input
                v-model="formdata.copy"
                :disabled="inputDisable"
                type="textarea"
                :autosize="{ minRows: 1}"
                class="chaosong"
                resize="none"
              ></el-input>
            </el-form-item>

            <div class="editor_box" style="position:relative">
              <label>内容</label>
              <UE :config="config" id="UE" ref="ue"></UE>
            </div>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿部门">
                  <el-input v-model="formdata.draftDepartmentOne" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟稿日期" prop="draftTime" ref="draftTime">
                  <el-date-picker
                    type="date"
                    v-model="formdata.draftTime"
                    style="width: 100%"
                    :disabled="inputDisable"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿人" prop="draftUser" ref="draftUser">
                  <el-input v-model="formdata.draftUser" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话" prop="phone" ref="phone">
                  <el-input
                    v-model="formdata.phone"
                    :disabled="inputDisable"
                    @keyup.native="btKeyDown"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="移动端展示" v-if="isZH">
              <el-radio-group v-model="formdata.showApp" :disabled="inputDisable">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>

            <controllableEditingField
              :isWeiHu="inputDisable"
              listtype="send"
              lableTitle="签发意见"
              :formadatalist="formdata.sendList"
              @delefunc="delefunc"
            ></controllableEditingField>
            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="审核意见"
              listtype="check"
              :formadatalist="formdata.checkList"
              @delefunc="delefunc"
            ></controllableEditingField>

            <el-form-item label="传阅意见" prop="cyyj">
              <div v-for="item in formdata.cyList" :key="item.id">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24" style="background-color: rgba(224,224,224,.34);padding: 5px 10px;">
                      <div style="min-height:80px;word-break: break-all;">{{item.content}}</div>
                      <div v-for="file in item.attachmentPos" :key="file.id">
                        <a
                          class="name down"
                          style="cursor:pointer;background-color: rgba(228,231,237,.32)"
                          @click="viewFile(file)"
                        >{{file.fileName}}</a>
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
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                v-model="formdata.cyyj"
                v-if="formdata.cyList&&formdata.cyList.length==0"
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
                    :disabled="true"
                    v-model="formdata.wyPle"
                    type="textarea"
                    :autosize="{ minRows:2}"
                    resize="none"
                  ></el-input>
                </div>
                <div class="clear-fix chuanyue">
                  <p class="chuanyue-p1 chuanyue-textarea2">已阅</p>
                  <el-input
                    class="chuanyue-p2"
                    :disabled="true"
                    v-model="formdata.yyPle"
                    type="textarea"
                    :autosize="{ minRows:2}"
                    resize="none"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              label="承办单位"
              v-if="formdata.feedbackMode!=0&&formdata.undertakeDepartment"
            >
              <el-row>
                <el-col :span="23">
                  <el-table :data="formList.cbList" border id="table">
                    <el-table-column prop="undertakeDepartment" label="部门名称" width="200"></el-table-column>
                    <el-table-column>
                      <template slot="header">
                        <span>意见</span>
                      </template>
                      <template slot-scope="scope">
                        <div
                          class="formatFildContainer"
                          v-if="scope.row.opinionDoList&&scope.row.opinionDoList.length>0"
                        >
                          <template>
                            <div v-for="item in scope.row.opinionDoList" :key="item.id">
                              <div class="d_flex">
                                <el-row class="d_b100">
                                  <el-col :span="24" class="elcol">
                                    <div>{{item.content}}</div>
                                    <div class="adviceInfo" style="position:relative">
                                      {{item.departmentName}}
                                      <span
                                        class="pad_lr10"
                                      >{{item.userName}}</span>
                                      {{item.createTime}}
                                    </div>
                                  </el-col>
                                </el-row>
                              </div>
                            </div>
                          </template>
                        </div>
                        <div
                          class="name down"
                          @click="viewFile(item)"
                          :key="item.id"
                          v-for="item in scope.row.attachList"
                        >{{item.fileName}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="finishTime" label="反馈时间" width="200"></el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
              label="承办单位"
              v-if="formdata.feedbackMode==0&&formdata.undertakeDepartment"
            >
              <el-row>
                <el-col
                  v-for="item in formList.cbList"
                  :key="item.id"
                  :span="6"
                >{{item.undertakeDepartment}}</el-col>
              </el-row>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <upfileList
              :canmoveOrdown="!inputDisable"
              label="制发单附件"
              :fileList="formdata.attchmentFileInfo"
            >
              <upload-file-ts
                :uploadConfig="uploadConfig"
                @fileList="fileList"
                :fileId="fileId"
                :disabled="inputDisable"
              ></upload-file-ts>
            </upfileList>
          </el-form>
        </div>
      </div>
    </div>

    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
  </div>
</template>

<script >
import { mapGetters, mapActions } from "vuex";
import beanList from "../../../util/beanList";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import userInfo from "../../../util/userInfo";
import UE from "components/editor/ue.vue";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import exportTable from "../../../minixs/exportTable";
import sidebarNavigation from "../components/sidebarNavigation";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import uploadFileTs from "components/uploadFile/uploadFileTs";
import formatFormFild from "../components/formatFormFiled";
import controllableEditingField from "../components/controllableEditingField";
import collectionPage from "../components/collectionPage";
import upfileList from "../components/showUploadFile"; //附件展示

export default {
  name: "proceHas",
  components: {
    shiwuFlow,
    UE,
    sidebarNavigation,
    formatFormFild,
    controllableEditingField,
    collectionPage,
    upfileList,
    uploadFileTs
  },
  props: {},
  mixins: [openOrDownLoadFile, bianhanPublic],
  data() {
    return {
      extractFlag:0,
      onFileFlag:0,
      fileId: "",
      isBnEdit: false, //部门内便函标志是否可编辑
      isZH: JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000",
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      id: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      flowChartList: [],
      showFlowChart: false,
      buttonList: [],
      formdata: {},
      formList: { cbList: [] },
      inputDisable: true,
       isNewFilePlace:'',//是否显示区块链归档
    };
  },
  computed: {
    ...mapGetters(["todoItem"])
  },
  methods: {
    delefunc(item) {
      this.$api.bianhan.delProcessList(item).then(res => {
        this.loadData();
      });
    },
    isZonghe() {
      return userInfo.isZongHe();
    },
    loadData() {
      this.$api.bianhan.distriDeal({ id: this.id, type: "admin",numYear:this.numyear}).then(res => {
        this.isBnEdit = res.isBnEdit;
        this.formdata = res.bHMainOrderDo;
        this.isNewFilePlace=res.isNewFilePlace;
        if(res.bHMainOrderDo.isFile){
          this.extractFlag=this.onFileFlag=Number(res.bHMainOrderDo.isFile);
        }else{
          this.extractFlag=this.onFileFlag=0;
        }

        this.formdata.sendList = res.sendList;
        this.formdata.commentsList = res.commentsList;
        try {
          this.formdata.cyList = res.cyList.filter(item => {
            //取传阅意见附件
            this.$api.setSysConfig
              .getTextemList({ id: item.dataId, fileType: "10010",numYear:this.numyear })
              .then(res => {
                this.$set(item, "attachmentPos", res.data);
              });
            return item;
          });
        } catch (e) {
          this.formdata.cyList = res.cyList;
        }
        this.formdata.checkList = res.checkList;
        try {
          this.formList.cbList = res.cbList.filter(item => {
            this.$api.setSysConfig.getTextemList({ id: item.id,numYear:this.numyear}).then(res => {
              this.$set(item, "attachList", res.data);
            });
            this.$forceUpdate();
            return item;
          });
        } catch (e) {
          this.formList.cbList = res.cbList;
        }
        this.formdata.draftDepartmentOne =
          this.formdata.draftDepartmentOne || this.formdata.draftDepartment;
        setTimeout(() => {
          this.$refs.ue.setUEContent(this.formdata.content);
          this.$refs.ue.setDsabled();
        }, 1000);
        this.getFileList();
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
      this.uploadConfig.filesHas = this.formdata.attchmentFileInfo;
      if (!this.formdata.attachs) {
        this.formdata.attachs = [];
      }
      files.forEach(item => {
        this.formdata.attachs.push(item.id);
      });
      this.formdata.attach = this.formdata.attachs.join(",");
      this.formdata.attachid = this.formdata.attachs.join(",");
      this.$forceUpdate();
    },
    //仅能输入数字和‘-’
    btKeyDown(e) {
      this.formdata.phone = e.target.value.replace(/[^\d||\-]/g, "");
    },
    // 保存
    save() {
      this.formdata.type = "admin";
      this.formdata.content =
        process.env.NODE_ENV == "production"
          ? this.$refs.ue.getUEContent()
          : "";
      let that = this;
      try {
        this.formdata.commentsList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
      try {
        this.formdata.sendList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
      try {
        this.formdata.checkList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}

      if(this.extractFlag==0||this.onFileFlag==0){
        this.formdata.isFile=0;
      }
      
      this.$api.bianhan.alertAddData(this.formdata).then(res => {
        this.$message({
          message: "保存成功",
          type: "success"
        });
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
        case "收回":
          this.$api.bianhan
            .zfBack({
              id: this.id,
              avyId: this.todoItem.avyId,
              oldCurrentNode: this.todoItem.oldCurrentNode
            })
            .then(res => {
              this.$message({ type: "sucess", message: "收回成功" });
              this.$intent.closeWindow(this);
            });
          break;
        case "归档":
          this.finishFile();

          break;
        case "区块链归档":
          this.newfinishFile();
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
            //type属性区分制发单与办结单
            this.formdata.type = "zf";
            this.$api.bianhan.refloat(this.formdata).then(res => {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.$intent.closeWindow(this);
            });
          });
          break;
        case "查看流程":
          this.$refs.dialogLine.openDialog();
          this.$api.bianhan
            .getLiuCheng({ id: this.id, type: "0",numYear:this.numyear })
            .then(res => {
              this.showFlowChart = true;
              this.flowChartList = res.list;
            });
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/bianhanZf",
            query: { id: this.id,numYear:this.numyear }
          });
          break;
        case "操作指南":
          this.handBook("BHGL");
          break;
        case "收藏":
          exportTable.collect(this, this.id, 'zf','',this.numyear)
          break;
        case "催办":
          this.$api.bianhan.cuiban({ ids: this.id, type: "0" }).then(res => {
            this.$message({
              message: "催办成功",
              type: "success"
            });
          });
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
    finishFile() {
      let _self = this;
      this.$api.bianhan
        .handlefile({ id: this.id,numYear:this.numyear })
        .then(res => {
          _self.loadData();
        })
        .catch(res => {});
    },
    newfinishFile() {
      let _self = this;
      this.$api.bianhan
        .newhandlefile({ id: this.id,numYear:this.numyear })
        .then(res => {
          _self.loadData();
        })
        .catch(res => {});
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id,numYear:this.numyear}).then(res => {
        this.$set(this.formdata, "attchmentFileInfo", res.data);
        this.$forceUpdate();
        this.uploadConfig.filesHas = this.formdata.attchmentFileInfo;
      });
    }
  },
  activated() {},
  mounted() {
    this.uploadConfig.id = this.id;
    this.fileId = this.$route.query.id;
  },
  created() {
    this.id = this.$route.query.id;
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
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

.proceHas {
  min-height: 1000px;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 70px;
    line-height: 70px;

    .left {
      margin-left: 20px;
    }

    .right {
      // margin-right: 20px;
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
      .cur_sess {
        float: left;
        display: flex;
        margin-top: 12px;

        p {
          // height: 30px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
        }
      }

      .feed_back {
        float: right;
        display: flex;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        color: #0f100e;
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

.select-chang {
  padding: 5px;
  font-size: 18px;
  margin-right: 8px;
  cursor: pointer;
}

.adviceInfo {
  position: absolute;
  right: 40px;
  bottom: 0;
  text-align: right;
  color: #606266;
  background-color: rgba(228, 231, 237, 0.32);
}

.pad_lr10 {
  padding: 0 10px;
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
  color: #606266;
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
