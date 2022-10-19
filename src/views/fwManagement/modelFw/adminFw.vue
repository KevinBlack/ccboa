<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back" @click="goBack">
          <i class="el-icon-arrow-left"></i>模板及范文流转
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain v-show="!editState"  @click="preserve(1)">保存</el-button>
          <!-- <el-button plain @click="completeSending">完成并发送</el-button> -->
          <el-button plain v-show="!editState" @click="delFile">删除此文</el-button>
          <el-button plain v-show="!editState" @click="sendFile">发布</el-button>
          <!-- <el-button plain @click="flowScheme">查看流程</el-button> -->
          <el-button plain @click="flowScheme" v-show="editState">查看流程</el-button> 
          <el-button plain>操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{title}}</h3>
    </header>
    <div class="form_content">
      <!-- <div class="form_tip">
        <span>当前环节：拟稿</span>
        <span>当前处理人：测试人1</span>
      </div>-->
      <el-form
        ref="mubanform"
        :model="fromData.muBanVo"
        :rules="rules"
        label-width="110px"
        style="padding-top:20px"
        class="demo_ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="示例类型" prop="sampleType">
              <el-select v-model="fromData.muBanVo.sampleType" placeholder="请选择"  :disabled="editState">
                <el-option label="模板" value="模板"></el-option>
                <el-option label="范文" value="范文"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件类型" prop="fileType">
              <el-select v-model="fromData.muBanVo.fileType" placeholder="请选择文件类型" :disabled="editState">
                <el-option label="发文" value="发文"></el-option>
                <el-option label="签报" value="签报"></el-option>
                <!-- <el-option label="便函" value="便函"></el-option>
                <el-option label="呈送件" value="呈送件"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '发文'">
          <el-col :span="12">
            <el-form-item label="发文类型" prop="postType">
              <el-select v-model="fromData.muBanVo.postType" placeholder="请选择" @change="selectType" :disabled="editState">
                <!-- <el-option label="1" value="11"></el-option>
                <el-option label="2" value="22"></el-option>-->
                <el-option
                  v-for="item in sendType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务分类" prop="businessType">
              <el-select v-model="fromData.muBanVo.businessType" placeholder="请选择" :disabled="editState">
                <!-- <el-option label="3" value="33"></el-option>
                <el-option label="4" value="44"></el-option>-->
                <el-option
                  v-for="item in businessType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '发文'">
          <el-col :span="12">
            <el-form-item label="代字/红头" prop="redHead">
              <el-select v-model="fromData.muBanVo.redHead" placeholder="请选择" :disabled="editState">
                <el-option
                  v-for="item in SredHead"
                  :key="item.redHead"
                  :label="item.redHead"
                  :value="item.redHead"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文种" prop="documentCode">
              <el-select v-model="fromData.muBanVo.documentCode" placeholder="请选择" :disabled="editState">
                <el-option
                  v-for="item in textType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '签报'">
          <el-col :span="12">
            <el-form-item label="处理类型" prop="dealType">
              <el-select v-model="fromData.muBanVo.dealType" placeholder="请选择" :disabled="editState">
                <el-option label="批件" value="批件"></el-option>
                <el-option label="阅件" value="阅件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签报类型" prop="qianbaoType">
              <el-select v-model="fromData.muBanVo.qianbaoType" placeholder="请选择" :disabled="editState">
                <el-option
                  v-for="item in qianbaoType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '签报'">
          <el-col :span="12">
            <el-form-item label="签报字号" prop="qbNumber">
              <el-select v-model="fromData.muBanVo.qbNumber" placeholder="请选择" :disabled="editState">
                <el-option
                  v-for="item in qbNumber"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '呈送件'">
          <el-col :span="12">
            <el-form-item label="处理类型" prop="dealType">
              <el-select v-model="fromData.muBanVo.dealType" placeholder="请选择" :disabled="editState">
                <el-option label="批件" value="批件"></el-option>
                <el-option label="阅件" value="阅件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="呈送字号" prop="csNumber">
              <el-select v-model="fromData.muBanVo.csNumber" placeholder="请选择" :disabled="editState">
                <el-option label="e" value="ee"></el-option>
                <el-option label="ff" value="ff"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="示例标题" prop="fileTitle">
              <el-input v-model="fromData.muBanVo.fileTitle" :disabled="editState"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="关键词">
              <el-input v-model="fromData.muBanVo.keywords" :disabled="editState"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="示例可见范围" prop="visibleRange">
              <el-button @click="chooseBtn" :disabled="editState">选择可见范围</el-button>
              <div class="choose_sl">{{chooseRangeStr}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板/范文" prop="attachments" ref="attachments">
              <el-row>
                <!-- <loadAccessory></loadAccessory> -->
                <uploadFiles
                  ref="uploadComponent"
                  @preserve="preserve"
                  :isPreserve='isPreserve'
                  :uploadConfig="uploadConfig"
                  v-if="!editState"
                ></uploadFiles>
                <el-col>
                  <div
                    class="tree_w"
                    v-if="fromData.muBanVo.attachments&&fromData.muBanVo.attachments.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in  fromData.muBanVo.attachments"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_wrap">
                            <span class="name down" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fwglfj)">{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="upRow(index)"
                                v-if="fromData.muBanVo.attachments.length>1"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index)"
                                v-if="fromData.muBanVo.attachments.length>1"
                                :disabled="index==fromData.muBanVo.attachments.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id)"
                                :disabled="item.disabled|| editState"
                                round
                              >删除</el-button>
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
                <el-col v-for="(item,n) in fkfj" :key="n">
                  <el-form-item :label="item" :key="item">
                    <el-scrollbar>
                      <div v-for="item1 in fkfjList[n]" :key="item1.id" class="tree_w">
                        <template>
                          <div class="command_wrap">
                            <span class="name down" @click="viewDraftFile(item1.fileName,item1.filePath ,$businessCode.fwglfj)">{{item1.fileName}}</span>
                            <span class="name">{{item1.createrName}}</span>
                            <span class="name">{{item1.createTime}}</span>
                          </div>
                        </template>
                      </div>
                    </el-scrollbar>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="审批意见">
              <div v-for="(item,index) in fromdata.opinionCheckList" :key="item.id" class="d_flex">
                <el-row class="d_b100">
                  <el-col
                    :span="22"
                    :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime}]"
                  >
                    <el-input
                      type="textarea"
                      :value="item.content"
                      :disabled="true"
                      rows="3"
                      class="d_f1"
                    ></el-input>
                    <span class="adviceInfo">{{item.departmentName+" "+item.createTime}}</span>
                  </el-col>
                  <el-col :span="2" v-if="index==0&& item.createTime ==fromdata.opinionMaxTime">
                    <button
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      @click="deletService('huiqian',n)"
                    >
                      <i class="el-icon-delete"></i>
                    </button>
                  </el-col>
                </el-row>
              </div>
              <div style="display:flex">
                <el-input type="textarea" style="flex:1" v-model="fromData.opinionCheck"></el-input>
                <button
                  @click="writelistbox"
                  type="button"
                  class="el-button el-button--default dimi_btn"
                >
                  <i class="el-icon-plus"></i>
                </button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col>
            <el-form-item label="作者">
              <el-input v-model="fromData.muBanVo.author" :disabled="editState"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="备注">
              <el-input 
                type="textarea" 
                resize="none" 
                maxlength="500" 
                autosize 
                v-model="fromData.muBanVo.remark" 
                :disabled="editState">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <chooseRange
      :subdialogTit="subdialogTit"
      :subsingelCheckF="subsingelCheckF"
      :subdialogState="subdialogState"
      :chooseRangeData="chooseRangeData"
      :nowCheckList="nowCheckList"
      :nowCheckIds="nowCheckIds"
      @subshowCompDialog="subshowCompDialog"
      v-if="showChooseRang"
    ></chooseRange>
    <!-- <timeLine v-if="showTimeLine"></timeLine> -->
    <!--关闭-->
    <el-dialog v-dialogDrag title="关闭" :visible.sync="showCloseDialog">
      <el-row>
        <el-col style="text-aling:center;font-size:16px;line-height:60px;text-indent:2em;">是否保存并退出当前页面?</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose('2')">否</el-button>
        <el-button type="primary" @click="handleClose('1')">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import chooseRange from "../components/chooseRange";
// import timeLine from "../components/timeLine";
import loadAccessory from "@/components/LoadAccessory/LoadAccessory";
import timeDialog from "@/components/timedialog/timedialog";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFileFw";
import viewDraft from "@/minixs/viewDraft";
import http from "@/http/http";
export default {
  name: "App",
  components: {
    // loadAccessory,
    timeDialog,
    appendWriteList,
    chooseRange,
    // timeLine,
    uploadFiles
  },
  mixins: [viewDraft],
  data() {
    return {
      showCloseDialog:false,//关闭提示
      editState: false,//3不可编辑
      nowCheckIds: [],  // 选中数据的id
      nowCheckList: [], // 选中的数据
      isPreserve:false,
      /**111 */
      fkfj: [], //反馈附件
      fkfjList: [], //反馈附件
      historyTradeCode: this.$businessCode.ggfwgl1,
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        width: "auto",
        isSpecial: 5,
        zlwhCheck:false,
        formId: "formFile"
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      /**222 */
      showChooseRang: false,
      timeShow: false,
      fromData: {
        function: "document_save",
        muBanVo: {
          attachSort: [],
          id: "",
          workflowId: "",
          workflowCode: "",
          authorId: "",
          fabuTime: "",
          fanwen: "1",//0:模板范文；1管理员起草页面
          sampleType: "", //示例类型
          fileType: "", //文件类型
          postType: "", //发文类型
          businessType: "", //业务分类
          redHead: "", //红头
          documentCode: "", //文种
          dealType: "", //处理类型
          qianbaoType: "", //签报类型
          csNumber: "", //呈送字号
          qbNumber: "", //签报字号
          fileTitle: "", //示例标题
          keywords: "",
          visibleRange: [],
          author: "",
          remark: "",
          attachments:[]
        }
      },
      delParams: {
        function: "document_delete",
        id: ""
      },
      // fabuParams:{
      //   function:'document_fabu',
      //   muBanVo:{}
      // },
      //   签报
      qbParams: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      //发文
      fwParams: {
        function: "getSendOrderDicByParam",
        organizationId: ""
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: ""
      },
      searchAll_params: {
        function: "setup_SearchAll"
      },
      detail_params: {
        function: "document_getInfo",
        id: ""
      },
      //流程
      getHistoryActInfo_params:{
        function:"getHistoryActInfo",
        processInstId:''
      },
      title: "模板及范文上传单",
      fileList: [],
      appendWriteDialog: true,
      clickTypes: 1,
      bank_doSend: {
        id: ""
      },
      subsingelCheckF: false, // 单选true 多选为false
      subdialogTit: "人员选择", // 弹框标题
      // sendList: [],
      outerAddTeam: false,
      subdialogState: false,
      showTimeLine: false,
      //发文下拉框数据
      sendType: [], //发文类型
      businessType: [], //业务类型
      textType: [], //文种
      SredHead: [], //代字红头
      //签报
      qianbaoType: [], //签报类型
      qbNumber: [],
      chooseRangeData: [],
      chooseRangeStr: "",
      rules: {
        sampleType: [
          { required: true, message: "请选择示例类型", trigger: "change" }
        ],
        fileType: [
          { required: true, message: "请选择文件类型", trigger: "change" }
        ],
        postType: [
          { required: true, message: "请选择发文类型", trigger: "change" }
        ],
        businessType: [
          { required: true, message: "请选择业务分类", trigger: "change" }
        ],
        documentCode: [
          { required: true, message: "请选择文种", trigger: "change" }
        ],
        redHead: [
          { required: true, message: "请选择代字红头", trigger: "change" }
        ],
        dealType: [
          { required: true, message: "请选择处理类型", trigger: "change" }
        ],
        qianbaoType: [
          { required: true, message: "请选择签报类型", trigger: "change" }
        ],
        qbNumber: [
          { required: true, message: "请选择签报字号", trigger: "change" }
        ],
        csNumber: [
          { required: true, message: "请选择呈送字号", trigger: "change" }
        ],
        fileTitle: { required: true, message: "请输入标题", trigger: "blur" },
        visibleRange: { required: true ,message:'请选择示例可见范围'},
        attachments: { required: true, message: "请上传附件", trigger: "change" },
      }
    };
  },
  methods: {
    goBack() {
      window.location.href = "about:blank";
      window.opener.location.reload();
      window.close();
    },
     // 关闭
    handleClose(val) {
      if(val=='1') {
        this.preserveAsync().then(save => {
          if(save) {
            window.location.href = "about:blank";
            window.close();
          }
        });
      } else if(val=='2') {
        window.location.href = "about:blank";
        window.close();
      } else {
        this.showCloseDialog = false;
      }
    },
    handelclose() {
      this.showCloseDialog = true;
    },
    getQbList() {
      this.$post
        .postData(
          "getTcQbsignParamDicInfo",
          JSON.stringify(this.qbParams),
          this.$businessCode.qbgl
        )
        .then(res => {
          console.log(res);
          this.qianbaoType = JSON.parse(res.data.qianbaoType);
          this.qbNumber = JSON.parse(res.data.qbZihaoList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFwList() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.fwParams),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          this.sendType = JSON.parse(res.data.sendType);
          this.businessType = JSON.parse(res.data.businessType);
          this.textType = JSON.parse(res.data.textType);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.fromData.muBanVo.redHead = ""
      this.getTcDocTypeDicByParam();
    },
    //获取代字红头
    getTcDocTypeDicByParam() {
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res.data) {
            this.SredHead = res.data;
          }
        });
    },
    //保存
    preserve(type) {
      this.fromData.function = 'document_save'
      // if (type === "uploadfile") {
      //   /**111 */
      //   if (this.fromData.muBanVo.id != "") {
      //     this.$refs.uploadComponent.uploadFileNow();
      //     return;
      //   } else {
      //     this.$message.error("请先保存!");
      //     return;
      //   }
      // }
      // this.$refs["mubanform"].validate(valid => {
      //   if (valid) {
      //     alert(1111)
          
      //   }
      // });
      this.$post
            .postData(
              "document_save",
              JSON.stringify(this.fromData),
              this.$businessCode.fwgl1
            )
            .then(res => {
              console.log(res);
              if (res.success) {
                if(type && type != "uploadfile"){
                  this.$message({
                    message: "保存成功!",
                    type: "success"
                  });
                }
                this.fromData.muBanVo.id = res.data.id;
                if (type === "uploadfile") {
                  this.uploadConfig.id = res.data.id;
                  this.$refs.uploadComponent.uploadFileNow();
                }
                if(res.data.id){
                  this.isPreserve = true;
                }
                this.$router.replace({
                  path: "/adminFw",
                  query: {
                    id: res.data.id
                  }
                });
                window.opener&&window.opener.location.reload();
                this.getDetail(res.data.id);
              }
            })
            .catch(err => {
              console.log(err);
            });
    },
    //同步保存
    // 保存
    async preserveAsync(type) {
      let successState = false;
      this.fromData.function = 'document_save'
      await this.$post
        .postData(
          "document_save",
          JSON.stringify(this.fromData),
          this.$businessCode.fwgl1
        )
        .then(res => {
          if (res && res.success) {
            window.opener&&window.opener.location.reload();
            successState = true;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "保存失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 2000
          });
        });
      return successState;
    },
    getDetail(id) {
      this.detail_params.id = id;
      this.uploadConfig.id = id;
      this.$post
        .postData(
          "document_getInfo",
          JSON.stringify(this.detail_params),
          this.$businessCode.fwgl1
        )
        .then(res => {
          this.fromData.muBanVo = Object.assign(
            this.fromData.muBanVo,
            res.data
          );
          // this.fromData.muBanVo.remark = res.data.opinionMap.remark.length>0 ? res.data.opinionMap.remark[0].content : "";
          this.fromData.muBanVo.remark = res.data.curNodeCode==800 ? (res.data.opinionMap.remark.length>0 ? res.data.opinionMap.remark[0].content : "") : (res.data.remark.length>0 ? res.data.remark : "");
          //已上传的文件
          this.uploadConfig.filesHas = this.fromData.muBanVo.attachments||[];
          if(this.uploadConfig.filesHas && this.uploadConfig.filesHas.length){
            this.uploadConfig.zlwhCheck = true;
          }else{
            this.uploadConfig.zlwhCheck = false;
          }
          this.fromData.muBanVo.attachSort = [];
          this.processInstId = this.fromData.muBanVo.processInstId;
          this.fromData.muBanVo.visibleRange = JSON.parse(
            this.fromData.muBanVo.visibleRange
          );

          let rangeArr = [];
          this.nowCheckList = JSON.parse(res.data.visibleRange)||[];
          this.fromData.muBanVo.visibleRange = JSON.parse(res.data.visibleRange)||[];
          this.nowCheckList.forEach(item => {
            this.nowCheckIds.push(item.id);
            rangeArr.push(item.name);
          });
          this.chooseRangeStr = rangeArr.join("，");
          // this.btnShow();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 表单校验滚动
    scrollIntoForm(form) {
      let that = this;
      let result = true;
      this.$refs[form].validate((valid, object) => {
        if (!valid) {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
          result = false;
        }
      });
      return result;
    },
    //发布
    sendFile() {
      if (this.chooseRangeStr=="") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择可见范围",
          duration: 2000
        });
        return;
      }
      this.fromData.function = "dofinishworkflow";
      console.log(this.fromData);
      if (this.fromData.muBanVo.id !== "") {
        let scrollForm = this.scrollIntoForm('mubanform');
        if(!scrollForm){
          return;
        }
        if(!(this.fromData.muBanVo.attachments && this.fromData.muBanVo.attachments.length)){
          this.$message({
            message: "请先上传模板/范文!",
            type: "error"
          });
          return;
        }
        this.$post
          .postData(
            "dofinishworkflow",
            JSON.stringify(this.fromData),
            this.$businessCode.fwgl1
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.$message({
                message: "发布成功!",
                type: "success"
              });
              setTimeout(() => {
                this.goBack();
              }, 2000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message.error("文件未保存不能发布!");
      }
    },
    delFile() {
      if (this.fromData.muBanVo.id !== "") {
        this.delParams.id = this.fromData.muBanVo.id;
        this.$confirm("是否删除此文?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$post
            .postData(
              "document_delete",
              JSON.stringify(this.delParams),
              this.$businessCode.fwgl1
            )
            .then(res => {
              console.log(res);
              if (res.success) {
                this.$message({
                  message: "删除成功!",
                  type: "success"
                });
                this.$router.push("/modelFw");
              } else {
                this.$message.error("删除失败!");
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        });
      } else {
        this.$message.error("文件未保存不能删除!");
      }
    },

    //获取下拉框数据
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    upSuccess(response, file, fileList) {},
    upError(err, file, fileList) {
      console.log(err, file);
    },
    writelistvalue(data) {
      if (data) {
        console.log(data);
        this.fromData.opinionCheck = this.fromData.opinionCheck
          ? this.fromData.opinionCheck + data
          : data;
      }
    },
    // writelistbox() {
    //   this.appendWriteDialog = true;
    //   this.$nextTick(() => {
    //     this.$refs.writelist.openDialog();
    //   });
    // },
    chooseBtn() {
      this.$post
        .postData(
          "setup_SearchAll",
          JSON.stringify(this.searchAll_params),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          // let chooseRangeObj = Object.assign({},res.data)
          this.chooseRangeData = res.data;
          if (res.data) {
            this.showChooseRang = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    subshowCompDialog(data, type) {
      if(type) {
        console.log(data);
        this.fromData.muBanVo.visibleRange  = this.nowCheckList = data;
        let checkArr = [];
        this.nowCheckIds = [];
        data.forEach(item => {
          checkArr.push(item.name);
          this.nowCheckIds.push(item.id);
        });
        this.chooseRangeStr = checkArr.join(",");
      }
      this.showChooseRang = false;
    },
    flowScheme() {
      this.showTimeLine = true;
      let params = {
        function : 'getHistoryActInfo',
        processInstId: this.fromData.muBanVo.processInstId
      }
      // if(this.processInstId!=undefined && this.processInstId!=''){
      //   this.getHistoryActInfo_params.processInstId = this.processInstId
      //     params = this.getHistoryActInfo_params
      // }else{
      //     params = {};
      // }
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(params),
          this.historyTradeCode
        )
        .then(res => {
          console.log(res);
          if (res) {
            this.tableData = res.data;
            this.timeShow = true;
            // this.$nextTick(() => {
            //   this.$refs.dialogLine.openDialog();
            // });
          }
        });
    },
    completeSending() {
      console.log(this.fromData);
    },
     upRow(n) {
      let midObj;
      this.fromData.muBanVo.attachSort.push(
        {
          id: this.fromData.muBanVo.attachments[n - 1].id,
          sort: this.fromData.muBanVo.attachments[n].sort
        },
        {
          id: this.fromData.muBanVo.attachments[n].id,
          sort: this.fromData.muBanVo.attachments[n - 1].sort
        } 
      );
      midObj = this.fromData.muBanVo.attachments[n];
      this.fromData.muBanVo.attachments[
        n
      ] = this.fromData.muBanVo.attachments[n - 1];
      this.fromData.muBanVo.attachments[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromData.muBanVo.attachSort.push(
        {
          id: this.fromData.muBanVo.attachments[n + 1].id,
          sort: this.fromData.muBanVo.attachments[n].sort
        },
        {
          id: this.fromData.muBanVo.attachments[n].id,
          sort: this.fromData.muBanVo.attachments[n + 1].sort
        }
      );
      midObj = this.fromData.muBanVo.attachments[n];
      this.fromData.muBanVo.attachments[
        n
      ] = this.fromData.muBanVo.attachments[n + 1];
      this.fromData.muBanVo.attachments[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
      this.bank_deleteFileById.id = id;
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.$businessCode.fwglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 500
              });
              this.fromData.muBanVo.attachments.splice(n, 1);
              this.uploadConfig.filesHas = this.fromData.muBanVo.attachments;
              this.uploadConfig.zlwhCheck = false;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "删除失败",
                duration: 500
              });
            }
          }
        });
        });
    },
    doDraft(fileInfo) {
      let openPath = getMachineType() ? "/openAndSave_Word" : "openAndSave_Wps";
      let data = '';
      let fileConfig = fileInfo;
      data = this.$router.resolve({
        path: openPath,
        query: {
          state: "viewFile",
          id:'',
          zhengWenState: 0,
          JYcode: this.$businessCode.fwglfj,
          relativePath: fileConfig ? fileConfig.filePath : "",
          fileName: fileConfig ? fileConfig.fileName : "",
          showBtns: false,
        }
      });
      window.open(data.href, "_blank");
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fwglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +
                res.fileName, file.fileName);
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
    //初始化加载数据
    // this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    // this.bank_doSend.id = this.bank_dispach.id;
    if (this.$route.query.state) {
      if (this.$route.query.state==3) {
        this.editState = true;
      } else {
        this.editState = false;
      }
    } else {
      this.editState = false;
    }
    
    this.getQbList();
    this.getFwList();
    this.uploadConfig.code = this.$businessCode.fwglfj;
    this.uploadConfig.newcode = this.$businessCode.fwgl;
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.fromData.muBanVo.author = userInfo.humanName;
    }
    if (this.$route.query.id) {
      this.isPreserve = true;
    }
    this.nowCheckList = [{
      TYPE: "user",
      id: userInfo.firstUnitId,
      name: userInfo.shortFirstUnitName,
      pId: userInfo.unitId
    }]
    this.nowCheckIds.push( userInfo.firstUnitId );
    this.chooseRangeStr = userInfo.shortFirstUnitName;
    this.getDetail(this.$route.query.id);
  },
  watch: {
    "fromData.muBanVo.fileType": function(newv, oldv) {
      // console.log(oldv)
      if (oldv == "发文") {
        this.fromData.muBanVo.postType = "";
        this.fromData.muBanVo.businessType = "";
        this.fromData.muBanVo.redHead = "";
        this.fromData.muBanVo.documentCode = "";
      } else if (oldv == "签报") {
        this.fromData.muBanVo.dealType = "";
        this.fromData.muBanVo.qianbaoType = "";
        this.fromData.muBanVo.qbNumber = "";
      } else if (oldv == "呈送件") {
        this.fromData.muBanVo.dealType = "";
        this.fromData.muBanVo.csNumber = "";
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
  height: 90px;
  line-height: 90px;
}
.bank_dispach_tit {
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.bank_dispack_side {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3b85ef;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
    font-size: 24px;
    color: #fff;
    .el-icon-arrow-left {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #fff;
      color: #3b85ef;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 8px;
    }
  }
  .grid_comtent {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .bank_grid_comtent_active {
      border: 1px solid #fff;
      background: #0563c8;
      color: #fff;
    }
  }
}
.form_content {
  width: 60%;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #bfbfbf;
  padding: 10px 20px;
  margin-bottom: 20px;
  .form_tip {
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid #faaa20;
    background-color: #fef7e7;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    font-size: 14px;
  }
  .choose_sl {
   width: 100%;
    min-height: 50px;
    padding-left: 10px;
    line-height: 30px;
    margin-top: 10px;
    border: 1px solid #dcdfe6;
  }
  .el-select {
    width: 100%;
  }
}
.d_flex {
  display: flex;
  padding-bottom: 20px;
  .d_b100 {
    width: 100%;
  }
  .d_f1 {
    flex: 1;
  }
}
.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-scrollbar {
  height: 100%;
}
.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  font-size:14px;
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
  .down{
    cursor: pointer;
  }
  .down:hover{
   color: #3b85ef
  }
}
</style>
