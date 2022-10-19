<template>
  <div class="process_order" id="bianhanzhifa">
    <!-- 将表单内容抽成一个table表格，用于收藏表单数据 -->
    <collectionPage :formdata="formdata" :pagetype="cyType" iscypage></collectionPage>

    <div class="headerClick">
      <div class="right">
        <template>
          <el-button @click="buttonClick('关闭')" plain class="bank_grid_comtent_active">关闭</el-button>
          <el-button
            plain
            @click="buttonClick('保存')"
            v-show="!inputDisable"
            class="bank_grid_comtent_active"
          >保存</el-button>
          <el-button plain @click="buttonClick('打印处理单')" class="bank_grid_comtent_active">打印处理单</el-button>
          <el-button plain @click="buttonClick('操作指南')" class="bank_grid_comtent_active">操作指南</el-button>
          <el-button plain @click="buttonClick('维护')" class="bank_grid_comtent_active">维护</el-button>
        </template>
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
                当前处理人：
                <span>{{currentUser}}</span>
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
                    format="yyyy-MM-dd"
                    v-model="formdata.feedTime"
                    style="width: 100%"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="编号" prop="documentNo">
                  <el-input v-model="formdata.documentNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item v-if= "isZH" label prop="isbnbh" style="text-align: right">
                  <el-checkbox v-model="formdata.bnbh" true-label="1" false-label="0" disabled>部内便函</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="!!cyType&&cyType!='zf'">
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
                class="zhusong"
                type="textarea"
                :autosize="{ minRows: 1}"
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
              <el-radio-group v-model="formdata.showApp" disabled>
                <el-radio :label="'0'">是</el-radio>
                <el-radio :label="'1'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-form-item label="签发意见">
              <format-form-fild :arrayList="formdata.sendList" :isInput='isInput' disabled></format-form-fild>
            </el-form-item>
            
           
            <el-form-item label="审核意见" v-if="!!cyType&&cyType=='zf'">
               <el-col :span="23">
              <el-input
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                :disabled="inputDisable"
                v-if="!(formdata.checkList && formdata.checkList.length!=0)"
              ></el-input>
               </el-col>
              <template>
                <format-form-fild :isInput='isInput' :arrayList="formdata.checkList"></format-form-fild>
              </template>
            </el-form-item>
                      
            <!--制发单传阅不显示附件，最终意见，过程意见-->
            <el-form-item label="最终意见" v-if="!!cyType&&cyType!='zf'">
              <format-form-fild :isInput='isInput' :arrayList="formdata.zzOpinion" disabled></format-form-fild>
              <el-col :span="23">
               <el-input
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                v-model="formdata.finalOpinion"
                :disabled="inputDisable"
              ></el-input>
               </el-col>
            </el-form-item>
                               
            <el-form-item label="过程意见" v-if="!!cyType&&cyType!='zf'">
              <format-form-fild :isInput='isInput' :arrayList="formdata.processList" disabled></format-form-fild>
               <el-col :span="23">
              <el-input
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                :disabled="inputDisable"
                v-if="!(formdata.processList && formdata.processList.length!=0)"
              ></el-input>
               </el-col>
            </el-form-item>
           
            <el-col :span="23">
            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="传阅意见"
              :canWeiHu="canWeiHu"
              listtype="cyList"
              :formadatalist="formdata.handlecyList"
              @delefunc="delefunc"
            ></controllableEditingField>
            </el-col>

            <el-col :span="23">
            <el-form-item label="传阅说明">
              <el-input v-model="formdata.cyExplain" disabled></el-input>
            </el-form-item>
            </el-col>

            <el-col :span="23">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                :disabled="inputDisable"
                v-model="formdata.comments"
                placeholder="填写意见不可多于500字"
                maxlength="500"
                show-word-limit
                v-if="!(formdata.commentsList && formdata.commentsList.length!=0)"
              ></el-input>
              <format-form-fild :isInput='isInput' :arrayList="formdata.commentsList" disabled></format-form-fild>
            </el-form-item>
            </el-col>
            <el-col :span="23">
            <el-form-item label="一次传阅人员">
              <el-input
                disabled
                v-show="!inputDisable"
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                class="chuanyue-textarea"
                v-model="formdata.cyry"
              ></el-input>
              <div
                data-v-6f414dea
                class="chuanyue-textarea el-textarea el-input--small is-disabled"
                v-show="inputDisable"
                style="word-break:  break-all;
                   background-color:rgba(228,231,237,.32)!important;
                   line-height: 24px;
                    padding: 4px 5px;"
              >{{formdata.cyry}}</div>
            </el-form-item>
            </el-col>
            <el-col :span="23">
            <el-form-item label="二次传阅人员">
              <div class="con-box" style="border:1px solid #ccc;margin-bottom:1px">
                <div class="clear-fix chuanyue1" style="overflow:hidden">
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
                <div class="clear-fix chuanyue chuanyue-textarea2" style="overflow:hidden">
                  <p class="chuanyue-p1">已阅</p>
                  <el-input
                    class="chuanyue-p2"
                    disabled
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
              v-if="!!cyType&&cyType!='zf'&&formdata.feedbackMode!=0&&formdata.undertakeDepartment"
            >
              <el-row>
                <el-col :span="23">
                  <el-table :data="formdata.cbList" border id="table">
                    <el-table-column label-class-name="displayClass">
                      <template slot="header">{{formdata.title}}{{formdata.documentNo}}反馈意见</template>

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
                                      <div style="background-color: rgba(228,231,237,.32)">{{item.content}}</div>
                                      <div class="adviceInfo" style="position: static;right: 0;">
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
                          <!-- <format-form-fild :arrayList='scope.row.opinionDoList'></format-form-fild> -->
                          <div
                            class="name down"
                            @click="viewFile(item)"
                            v-for="item in scope.row.attachList"
                            :key="item.id"
                          >{{item.fileName}}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <upfileList
              v-if="formdata.attchmentFileInfoZhi&&formdata.attchmentFileInfoZhi.length"
              :canmoveOrdown="false"
              label="制发单附件"
              :fileList="formdata.attchmentFileInfoZhi"
            ></upfileList>

            <upfileList
              v-if="(formdata.feedbackMode=='2'||formdata.feedbackMode=='1')&&cyType=='cb'"
              :canmoveOrdown="false"
              label="承办单附件"
              :fileList="formdata.attchmentFileInfo"
            ></upfileList>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import beanList from "../../../util/beanList";
import UE from "components/editor/ue.vue";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import exportTable from "../../../minixs/exportTable";
import sidebarNavigation from "../components/sidebarNavigation";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import viewDraft from "@/minixs/viewDraft";
import formatFormFild from "../components/formatFormFiled";
import controllableEditingField from "../components/controllableEditingField";
import collectionPage from "../components/collectionPage";
import upfileList from "../components/showUploadFile"; //附件展示

export default {
  name: "circulate",
  components: {
    UE,
    sidebarNavigation,
    formatFormFild,
    controllableEditingField,
    collectionPage,
    upfileList
  },
  mixins: [openOrDownLoadFile, bianhanPublic,viewDraft],
  data() {
    return {
      isInput:true,
      isZH: JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000",
      currentUser:JSON.parse(localStorage.getItem('userInfo')).shortCurrUnitName+' '+JSON.parse(localStorage.getItem('userInfo')).humanName,
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      type: "",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      id: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      showIdeaDialog1: "",
      showIdeaDialog: "",
      cyType: "", //表单是来自制发还是承办，param[zf,cb]
      formdata: {
        cyCount: ""
      },
      inputDisable: true,
      canWeiHu: false,
      zfId: "",
      cbId: ""
    };
  },
  mounted() {
    //this.handleSetLoacl();
  },
  created() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.cyType = this.$route.query.cyType;
    this.loadData();
  },
  methods: {
    delefunc(item) {
      this.$api.bianhan.delProcessList(item).then(res => {
        this.loadData();
      });
    },
    // 保存
    save() {
      let that = this;

      try{
      this.formdata.handlecyList.filter(e=>{
        e.dataId=that.id;
        e.type=that.cyType;
        e.parentId=that.formdata.parentDocId;
        return e;
      })
      }catch(e){
        console.log(e)
      }
      let cyDattaForm = {
        type: "admin",
        cyList: this.formdata.handlecyList
      };

      this.$api.bianhan.handleProcessList(cyDattaForm).then(res => {
        that.$message({
          message: "保存成功",
          type: "success"
        });
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
        case "操作指南":
          this.handBook('BHGL');
          break;
        case "收藏":
          console.log(this.id)
          let dataCyType = ''
          if (this.type == '9') {
            dataCyType = 'bj'
          } else {
            dataCyType = 'lz'
          }
          exportTable.collect(this, this.id, 'cy', dataCyType,this.numyear)
          break;
        case "打印处理单":
          if (this.formdata.cyType == "zf") {
            //制发单的传阅单需要 打印制发附件
            this.$intent.goNewPage(this, {
              path: "/bianhanCy",
              query: { id: this.id, fileid: this.formdata.parentDocId,numYear:this.numyear}
            });
          } else {
            this.$intent.goNewPage(this, {
              path: "/bianhanCy",
              query: { id: this.id,numYear:this.numyear }
            });
          }
          break;
        case "维护":
          //维护时仅可以维护传阅意见
          this.inputDisable = !this.inputDisable;
          break;
      }
    },
    loadData() {
      let self = this;
      this.$api.bianhan
        .chuanyueDetail({
          id: this.id,
          type:'admin',
          numYear:this.numyear
        })
        .then(res => {
          this.formdata = res.data;
          this.cyType = res.data.cyType;
          this.formdata.cyry = res.cyry;
          if(!!res.twCyType){
            this.cyType=res.twCyType;
          }
          if(!!res.receiveDate){
            this.formdata.receiveDate=res.receiveDate.slice(0,10);
          }
          this.formdata.twocyry = res.twocyry;
          this.formdata.commentsList = res.commentsList;
          this.zfId = res.zfId;
          if (!!res.cbId) {
            this.cbId = res.cbId;
          }
          try {
            this.formdata.cbList = res.cbList.filter(item => {
              this.$api.setSysConfig
                .getTextemList({ id: item.id,numYear:this.numyear })
                .then(res => {
                  this.$set(item, "attachList", res.data);
                });
              return item;
            });
            this.$forceUpdate();
          } catch (e) {
            this.formdata.cbList = res.cbList;
          }

          // try {
          //   this.formdata.cyList = res.cyList.filter(item => {
          //     this.$api.setSysConfig
          //       .getTextemList({ id: item.dataId, fileType: "10010" })
          //       .then(res => {
          //         this.$set(item, "attachmentPos", res.data);
          //       });
          //     return item;
          //   });
          // } catch (e) {
          //   this.formdata.cyList = res.cyList;
          // }
          this.formdata.processList = res.processList;
          this.formdata.sendList = res.sendList;
          // try {
          //   this.formdata.twocyList = res.twocyList.filter(item => {
          //     this.$api.setSysConfig
          //       .getTextemList({ id: item.dataId, fileType: "10010" })
          //       .then(res => {
          //         this.$set(item, "attachmentPos", res.data);
          //       });
          //     return item;
          //   });
          // } catch (e) {
          //   this.formdata.twocyList = res.twocyList;
          // }
          var handlecyList = [];
          try{
            res.twocyList.filter(item => {
              if (item.dataId == self.id) {
                handlecyList.push(item);
              }
            });
          }catch(e){
            console.log(e)
          }
          try{
            res.cyList.filter(item => {
              if (item.dataId == self.id) {
                handlecyList.push(item);
              }
            });
          }catch(e){
            console.log(e)
          }
            
         
          self.$set(self.formdata, "handlecyList", handlecyList);
          this.formdata.zzOpinion = res.zzOpinion;
          this.formdata.checkList = res.checkList;
          this.formdata.draftDepartmentOne =
            this.formdata.draftDepartmentOne || this.formdata.draftDepartment;
          this.formdata.wyIds = res.wyIds;
          this.formdata.yyIds = res.yyIds;
          this.formdata.wyPle = res.wyPle;
          this.formdata.yyPle = res.yyPle;
          this.getFileList();
          setTimeout(() => {
            this.$refs.ue.setUEContent(this.formdata.content);
            this.$refs.ue.setDsabled();
          }, 1000);
        });
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.zfId,numYear:this.numyear }).then(res => {
        this.formdata.attchmentFileInfoZhi = res.data;
        this.$forceUpdate();
      });
      if (!!this.cbId) {
        this.$api.setSysConfig.getTextemList({ id: this.cbId,numYear:this.numyear }).then(res => {
          this.$set(this.formdata, "attchmentFileInfo", res.data);
        });
      }
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
  clear: both;
}

.adviceInfo {
  position: absolute;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
  background-color: rgba(228,231,237,.32)
}

.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}

.process_order {
  background: white;
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
        margin-top: 15px;

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
        margin-top: 3px;

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
