/**
* create by zx on 2020/8/31 15:12
* 类注释：
* 备注：
*/
<template>
  <div class="proceHas" id="bianhanzhifa">
    <!-- 将表单内容抽成一个table表格，用于收藏表单数据 -->
    <collectionPage :formdata="formdata" pagetype="zf" :formList="formList"></collectionPage>

    <!--header部分按钮组-->
    <div class="headerClick">
      <div class="right">
        <el-button
          plain
          @click="buttonClick(item.name)"
          class="bank_grid_comtent_active"
          v-show="item.show"
          v-for="(item,index) in buttonList"
          :key="index"
        >{{item.name}}</el-button>
      </div>
    </div>

    <!--表单标题-->
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
                  <el-radio-group v-model="formdata.feedbackMode" :disabled="inputDisable">
                    <el-radio :label="'0'">无需反馈</el-radio>
                    <el-radio :label="'1'">反馈意见</el-radio>
                    <el-radio :label="'2'">反馈意见及附件</el-radio>
                  </el-radio-group>
                </template>
              </div>
            </div>

            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
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
                  v-if= "isZH"
                  label
                  prop="isbnbh"
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
                <el-form-item label="拟稿日期">
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
                <el-form-item label="拟稿人">
                  <el-input v-model="formdata.draftUser" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话">
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

            <el-form-item label="签发意见" prop="opinionSend">
              <template>
                <el-row v-if="!formdata.sendList||formdata.sendList.length==0">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formdata.opinionSend"
                      :disabled="inputDisable"
                    ></el-input>
                  </el-col>
                </el-row>
                <format-form-fild
                  :isInput="isInput"
                  :arrayList="formdata.sendList"
                  :disabled="inputDisable"
                ></format-form-fild>
              </template>
            </el-form-item>
            <el-form-item label="审核意见" prop="opinionCheck">
              <template>
                <el-row v-if="!formdata.checkList||formdata.checkList.length==0">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formdata.opinionCheck"
                      :disabled="inputDisable"
                    ></el-input>
                  </el-col>
                </el-row>
                <format-form-fild
                  :isInput="isInput"
                  :arrayList="formdata.checkList"
                  :disabled="inputDisable"
                ></format-form-fild>
              </template>
            </el-form-item>
            <el-form-item label="传阅意见" prop="cyyj">
              <el-col :span="23">
                <el-input
                  type="textarea"
                  :autosize="{ minRows:3}"
                  resize="none"
                  v-model="formdata.cyyj"
                  v-if="formdata.cyList&&formdata.cyList.length==0"
                  :disabled="inputDisable"
                ></el-input>
              </el-col>
              <format-form-fild :isInput="isInput" :arrayList="formdata.cyList"></format-form-fild>
            </el-form-item>
            <el-form-item label="备注" prop="comments">
              <el-col :span="23">
                <el-input
                  v-if="!(formdata.commentsList && formdata.commentsList.length!=0)"
                  type="textarea"
                  :autosize="{ minRows:3}"
                  resize="none"
                  v-model="formdata.comments"
                  :disabled="inputDisable"
                  placeholder="填写意见不可多于500字"
                  maxlength="500"
                  show-word-limit
                ></el-input>
              </el-col>
              <format-form-fild
                :arrayList="formdata.commentsList"
                :isInput="isInput"
                :disabled="inputDisable"
              ></format-form-fild>
            </el-form-item>
            <el-col :span="23">
              <el-form-item label="传阅人员">
                <div class="con-box" style="border:1px solid #ccc;margin-bottom:1px">
                  <div class="clear-fix chuanyue1">
                    <p class="chuanyue-p1">未阅</p>
                    <el-input
                      class="chuanyue-p2 chuanyue-textarea"
                      disabled
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
            </el-col>
            <el-form-item
              label="承办单位"
              v-show="formdata.feedbackMode!=0&&formdata.undertakeDepartment"
            >
              <el-row>
                <el-col :span="23">
                  <el-table :data="formList.cbList" border id="yijiantable">
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
                                    <div
                                      class="adviceInfo"
                                      style="position:relative;background-color:transparent"
                                    >
                                      {{item.departmentName}}
                                      <span
                                        class="pad_lr10"
                                      >{{item.userName}}</span>
                                      <p class="creat_time">{{item.createTime}}</p>
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
                              v-for="item in scope.row.attachList"
                              :key="item.id"
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
              v-show="formdata.feedbackMode==0&&formdata.undertakeDepartment"
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
            <upfileList :canmoveOrdown="false" label="制发单附件" :fileList="formdata.attchmentFileInfo" ></upfileList>
          </el-form>
        </div>
      </div>
    </div>

    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <!--查看承办流程-->
    <cb-flow v-model="showCbFlow" :tableData="formList.cbList"></cb-flow>
  </div>
</template>

<script >
import { mapGetters, mapActions } from "vuex";
import beanList from "../../../util/beanList";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import userInfo from "../../../util/userInfo";
import UE from "components/editor/ue.vue";
import cbFlow from "../components/cbFlow";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import exportTable from "../../../minixs/exportTable";
import sidebarNavigation from "../components/sidebarNavigation"; //侧边栏
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import formatFormFild from "../components/formatFormFiled";
import collectionPage from "../components/collectionPage"; //收藏
import upfileList from "../components/showUploadFile"; //附件展示

export default {
  name: "proceHas",
  components: {
    shiwuFlow,
    UE,
    sidebarNavigation,
    formatFormFild,
    collectionPage,
    cbFlow,
    upfileList
  },
  props: {},
  mixins: [openOrDownLoadFile, bianhanPublic],
  data() {
    return {
      isInput: true,
      showCbFlow: false,
      isZH: JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000",
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      id: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      flowChartList: [],
      showFlowChart: false,
      formdata: {},
      formList: { cbList: [] },
      inputDisable: true,
      buttonList: [
        { name: "关闭", show: true },
        { name: "收回", show: this.$route.query.type == "1" },
        { name: "查看承办流程", show: this.$route.query.type == "1" },
        { name: "催办", show: this.$route.query.type == "1" },
        { name: "导出反馈意见", type: "daochufankuiyijian", show: false },
        { name: "批量下载反馈附件", type: "daochufankuiyijian", show: false },
        { name: "查看流程", show: true },
        { name: "打印处理单", show: true },
        { name: "收藏", show: true },
        { name: "操作指南", show: true }

      ]
    };
  },
  computed: {
    ...mapGetters(["todoItem"])
  },
  methods: {
    isZonghe() {
      return userInfo.isZongHe();
    },
    loadData() {
      this.$api.bianhan.distriDeal({ id: this.id,numYear:this.numyear }).then(res => {
        this.isBnEdit=res.isBnEdit;
        this.formdata = res.bHMainOrderDo;
        this.formdata.sendList = res.sendList;
        this.formdata.commentsList = res.commentsList;

        //需要反馈则显示批量下载反馈附件继承导出反馈意见
        if(this.formdata.feedbackMode!=0){
           this.buttonList[4].show=true;
           this.buttonList[5].show=true;
        }else{
          //无需反馈则不现实查看承办流程
          this.buttonList[2].show=false;
        }
        const userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || '';
         if(this.formdata.isReadFlag == '0'&& res.oldUserCode == userInfo.humanCode){
          this.buttonList[1].show=true;
        }else{
          this.buttonList[1].show=false;
        }
       
        //收回按钮
        //const userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || '';
        // if(this.formdata.beAuthUserId == undefined || !this.formdata.beAuthUserId){
        //   if(this.formdata.oldBeAuthUserId == undefined || !this.formdata.oldBeAuthUserId){
        //     if(this.formdata.oldUserId == userInfo.humanId){
        //       this.buttonList[1].show = true;
        //     }else{
        //       this.buttonList[1].show = false;
        //     }
        //   }else{
        //      if(this.formdata.isReadFlag == '1'){//0是未读1已读
        //         this.buttonList[1].show = false;
        //       }else{
        //         if(this.formdata.oldBeAuthUserId == userInfo.humanId){
        //           this.buttonList[1].show = true;
        //         }else{
        //           this.buttonList[1].show = false;
        //         }
        //       }
        //   }
        // }else{
        //   if(this.formdata.isReadFlag == '1'){//0是未读1已读
        //     this.buttonList[1].show = false;
        //   }else{
        //     if(this.formdata.oldUserId == userInfo.humanId){
        //       this.buttonList[1].show = true;
        //     }else{
        //       this.buttonList[1].show = false;
        //     }
        //   }
        
        // }  
        try {
          this.formdata.cyList = res.cyList.filter(item => {
            //取传阅意见附件
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
        this.formdata.checkList = res.checkList;
            try {
              this.formList.cbList = res.cbList.filter(item => {
                if(res.bHMainOrderDo.feedbackMode!=0){
                this.$api.setSysConfig
                  .getTextemList({ id: item.id,numYear:this.numyear })
                  .then(res => {
                    this.$set(item, "attachList", res.data);
                  });
                  return item;
                }else{
                  return item;
                }

              });
            } catch (e) {
              this.formdata.cyList = res.cyList;
            }
        this.formdata.draftDepartmentOne =this.formdata.draftDepartmentOne || this.formdata.draftDepartment;
         let self = this;
        setTimeout(() => {
          this.$refs.ue.setUEContent(self.formdata.content);
          this.$refs.ue.setDsabled();
        }, 1000);
        this.getFileList();
      });
    },
    //仅能输入数字和‘-’
    btKeyDown(e) {
      this.formdata.phone = e.target.value.replace(/[^\d||\-]/g, "");
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          //this.$intent.closeWindow(this);
              window.location.href = "about:blank";
      window.close();
          break;
        case "收回":
          this.$api.bianhan
            .zfBack({
              id: this.id,
              avyId: this.formdata.supPcsAvyId,
              oldCurrentNode: this.formdata.supNodeCode
            })
            .then(res => {
              this.$message({ type: "sucess", message: "收回成功" });
              this.$intent.closeWindow(this);
            });
          break;
        case "查看流程":
          this.$refs.dialogLine.openDialog();
          this.$api.bianhan
            .getLiuCheng({ id: this.id, type: "0",numYear:this.numyear})
            .then(res => {
              this.showFlowChart = true;
              this.flowChartList = res.list;
            });
          break;
        case "查看承办流程":
          this.showCbFlow = true;
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/bianhanZf",
            query: { id: this.id,numYear:this.numyear }
          });
          break;
        case "导出反馈意见":
          exportTable.exportExcel("承办意见", "#yijiantable", true, true);
          break;
        case "操作指南":
          this.handBook("BHGL");
          break;
        case "批量下载反馈附件":
          this.batchExporFeedbackFile();
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
          break;
      }
    },
    //批量下载反馈附件
    batchExporFeedbackFile() {
      for (let i = 0; i < this.formList.cbList.length; i++) {
        let self=this;
        let item = this.formList.cbList[i].attachList;
        for (let n = 0; !!item && n < item.length; n++) {
          setTimeout(() => {
            this.downFile(item[n],this.formList.cbList[i].cbUnitShort+'_');
          }, (n / 10) * 500);
        }
      }
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id,numYear:this.numyear }).then(res => {
        this.$set(this.formdata, "attchmentFileInfo", res.data);
      });
    }
  },
  activated() {},
  mounted() {},
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
  clear: both;
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
        line-height: 14px;

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
        width: 120px;
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
  padding: 0 0 0 10px;
}
.creat_time {
  position: relative;
  top: -10px;
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
/deep/.chuanyue-p2 .el-textarea__inner[disabled] {
  min-height: 62px !important;
}
</style>
