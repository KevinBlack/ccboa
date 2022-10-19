<template>
  <div class="receive_dispatch">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>
<!-- 【关闭】【保存】【修改正文】【新建正文】 -->

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
          <el-button size="small" @click="handelsave('handSave')">保存</el-button>
          <el-button
            size="small"
            @click="drafting(2)"
            v-if="hasFaw&&mainPage == 'true' &&curNodeCode != '800'"
          >修改正文</el-button>
          <el-button size="small" @click="draftReminder" v-if="mainPage == 'true' && curNodeCode != '800' && tplbsnid != 'SWQB' && tplbsnid != 'KHQB_SP'">新建正文</el-button>
          <!-- <el-button size="small" @click="handelclose">关闭</el-button> -->
        </div>
      </el-col>
    </el-row>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <el-dialog title="提示" width="30%" :visible.sync="reminderDialog">
      <span>此操作将替换原有正文，请提前备份正文内容，是否继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="draftAgainNo">取消</el-button>
        <el-button type="primary" @click="draftReminderSure">确定</el-button>
      </span>
    </el-dialog>
    <!-- 起草正文 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="showDraft"
      :modal-append-to-body="false"
      width="600px"
      height="600px"
      title="起草正文"
    >
      <el-row>
        <el-col :span="24" class="mrg-b-20">
          <el-radio v-model="draftFlag" label="localFile">本地打开</el-radio>
        </el-col>
        <el-col :span="24">
          <el-radio v-model="draftFlag" label="newFile">空白文档</el-radio>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="draftAgainNo">取 消</el-button>
        <el-button type="primary" @click="draftAgain">确定</el-button>
      </div>
    </el-dialog>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{title}}</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form ref="fileObj" label-width="260px" class="demo-ruleForm mt20">
            <el-row>
              <el-col :span="12" v-for="(value,index) in fileObj" :key="index">
                <el-form-item :label="value['label']" v-if="value['key']!=='id'">
                  <el-input
                    v-model="value['value']"
                    :disabled="value['label'] == '创建时间' ||value['label'] == '修改时间'"
                    v-if="!(value['label'] == '附件名称' && value['key'] == 'attachTitle')"
                  ></el-input>
                  <el-input
                    autosize
                    resize="none"
                    type="textarea"
                    v-model="value['value']"
                    v-if="value['label'] == '附件名称' && value['key'] == 'attachTitle'"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div v-if="suggessObj.length>0">
            <el-row v-for="(item,index) in suggessObj" :key="index" v-if="item.key!='helpFileList'">
              <el-col
                :span="5"
                class="yijian_wrap flex_ac"
                :style="{height:item.value.length<1?'260px':item.value.length*260+'px'}"
              >
                <div>
                  <div>{{item.label}}</div>
                  <el-button
                    @click="addSuggess(index)"
                    :disabled="($route.query.sign=='swxb'||$route.query.sign=='swcb'||item.type=='sign' )&&item.label!='过程意见'
                  || ($route.query.type=='qb' && $route.query.sign == 2)&&item.label!='过程意见'&&item.label!='最终意见'
                  || ($route.query.type=='qb' && $route.query.sign == 3)&&item.label!='过程意见'&&item.label!='最终意见'
                  || ($route.query.type=='qb' && $route.query.sign == 2)&&(item.label=='最终意见'&&item.value&&item.value.length!=0)
                  || ($route.query.type=='qb' && $route.query.sign == 3)&&(item.label=='最终意见'&&item.value&&item.value.length!=0)
                  || ($route.query.qshType == 'qshType' && $route.query.sign == 1) && (item.label =='上级行批示意见' || item.label =='上级行办理情况')
                  || ($route.query.sphType == 'sphType' && $route.query.sign == 1) && item.label =='请示行意见'
                  || ($route.query.type=='qb' && $route.query.sign == 5)
                  "
                  >新增意见</el-button>
                  <!--  -->
                </div>
              </el-col>
              <el-col
                :span="19"
                class="yijian_wrap"
                :style="{height:item.value.length<1?'260px':item.value.length*260+'px'}"
              >
                <div
                  v-for="(innerItem,index) in item.value"
                  :key="innerItem.id"
                  style="height:260px;padding:10px 0"
                >
                  <el-row class="m-10">
                    <el-col :span="12">
                      <el-input
                        type="textarea"
                        maxlength="500"
                        v-model="innerItem.content"
                        :disabled="($route.query.sign=='swxb'||$route.query.sign=='swcb')&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 2)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 3)&&item.label!='过程意见'&&item.label!='最终意见'
                          
                          || ($route.query.qshType == 'qshType' && $route.query.sign == 1) && (item.label =='上级行批示意见' || item.label =='上级行办理情况')
                          || ($route.query.sphType == 'sphType' && $route.query.sign == 1) && item.label =='请示行意见'
                          || ($route.query.type=='qb' && $route.query.sign == 5)&&item.label!='传阅意见'
                          "
                      ></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="m-10 flex_ac">
                    <el-col :span="2">用户部门</el-col>
                    <el-col :span="8">
                      <el-input
                        v-model="innerItem.departmentName"
                        :disabled="($route.query.sign=='swxb'||$route.query.sign=='swcb')&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 2)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 3)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.qshType == 'qshType' && $route.query.sign == 1) && (item.label =='上级行批示意见' || item.label =='上级行办理情况')
                          || ($route.query.sphType == 'sphType' && $route.query.sign == 1) && item.label =='请示行意见'
                          || ($route.query.type=='qb' && $route.query.sign == 5)&&item.label!='传阅意见'
                          "
                      ></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">部门Id</el-col>
                    <el-col :span="8">
                      <el-input
                        v-model="innerItem.departmentId"
                        :disabled="($route.query.sign=='swxb'||$route.query.sign=='swcb')&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 2)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 3)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.qshType == 'qshType' && $route.query.sign == 1) && (item.label =='上级行批示意见' || item.label =='上级行办理情况')
                          || ($route.query.sphType == 'sphType' && $route.query.sign == 1) && item.label =='请示行意见'
                          || ($route.query.type=='qb' && $route.query.sign == 5)&&item.label!='传阅意见'
                          "
                      ></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="m-10 flex_ac">
                    <el-col :span="2">提交时间</el-col>
                    <el-col :span="8">
                      <el-input
                        v-model="innerItem.createTime"
                        :disabled="($route.query.sign=='swxb'||$route.query.sign=='swcb')&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 2)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 3)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.qshType == 'qshType' && $route.query.sign == 1) && (item.label =='上级行批示意见' || item.label =='上级行办理情况')
                          || ($route.query.sphType == 'sphType' && $route.query.sign == 1) && item.label =='请示行意见'
                          || ($route.query.type=='qb' && $route.query.sign == 5)&&item.label!='传阅意见'
                          "
                      ></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">用户中文名</el-col>
                    <el-col :span="8">
                      <el-input
                        v-model="innerItem.userName"
                        :disabled="($route.query.sign=='swxb'||$route.query.sign=='swcb')&&item.label!='过程意见'&&item.label!='最终意见'
                            || ($route.query.type=='qb' && $route.query.sign == 2)&&item.label!='过程意见'&&item.label!='最终意见'
                            || ($route.query.type=='qb' && $route.query.sign == 3)&&item.label!='过程意见'&&item.label!='最终意见'
                            || ($route.query.qshType == 'qshType' && $route.query.sign == 1) && (item.label =='上级行批示意见' || item.label =='上级行办理情况')
                            || ($route.query.sphType == 'sphType' && $route.query.sign == 1) && item.label =='请示行意见'
                            || ($route.query.type=='qb' && $route.query.sign == 5)&&item.label!='传阅意见'
                            "
                      ></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="m-10 flex_ac">
                    <el-col :span="2">用户Id</el-col>
                    <el-col :span="8">
                      <el-input
                        v-model="innerItem.userId"
                        :disabled="($route.query.sign=='swxb'||$route.query.sign=='swcb')&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 2)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 3)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.qshType == 'qshType' && $route.query.sign == 1) && (item.label =='上级行批示意见' || item.label =='上级行办理情况')
                          || ($route.query.sphType == 'sphType' && $route.query.sign == 1) && item.label =='请示行意见'
                          || ($route.query.type=='qb' && $route.query.sign == 5)&&item.label!='传阅意见'
                          "
                      ></el-input>
                    </el-col>
                    <el-col :span="8" style="text-align:center">
                      <el-button
                        type="primary"
                        @click="scYj(innerItem.id,index,item.label)"
                        :disabled="($route.query.sign=='swxb'||$route.query.sign=='swcb')&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 2)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 3)&&item.label!='过程意见'&&item.label!='最终意见'
                          || ($route.query.type=='qb' && $route.query.sign == 2)&&(item.label=='最终意见'&&item.value&&item.value.length!=0)
                          || ($route.query.type=='qb' && $route.query.sign == 3)&&(item.label=='最终意见'&&item.value&&item.value.length!=0)
                          || ($route.query.qshType == 'qshType' && $route.query.sign == 1) && (item.label =='上级行批示意见' || item.label =='上级行办理情况')
                          || ($route.query.sphType == 'sphType' && $route.query.sign == 1) && item.label =='请示行意见'
                          || ($route.query.type=='qb' && $route.query.sign == 5)&&item.label!='传阅意见'
                          "
                      >删除</el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>

          <div
            class="file-wrap"
            v-if="(tplbsnid == 'DZQB' || tplbsnid == 'KHQBQS' || tplbsnid == 'KHQB_SP') ||editAttach&&editAttach.length>0 || readAttach&&readAttach.length>0"
          >
            <el-row>
              <div
                v-if="tplbsnid == 'DZQB' || tplbsnid == 'KHQBQS' || tplbsnid == 'KHQB_SP'"
              >
                <uploadFiles
                  ref="uploadComponent"
                  @preserve="handelsave('fj')"
                  :uploadConfig="uploadConfig"
                  style="margin-left:0px;"
                ></uploadFiles>
              </div>
              <el-col v-if="editAttach&&editAttach.length>0">
                <div class="file_list_box" style="margin: 20px 0 0 0px;">
                  <el-scrollbar style="padding: 0px 15px 0 0;">
                    <div v-for="(item,index) in editAttach[0].value" :key="index" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="name">{{index+1}}.</span>
                          <span
                            class="down"
                            :title="item.fileName"
                            @click="viewFile(item)"
                          >{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="time">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index,item.id)"
                              :disabled="item.disabled"
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
            </el-row>
            <el-row
              v-if="readAttach&&readAttach.length>0"
              v-for="(item,index) in readAttach"
              :key="index"
            >
              {{item.label}}
              <el-col>
                <div class="file_list_box" style="margin: 20px 0 0 0px;">
                  <el-scrollbar
                    v-if="item.value.constructor == Array"
                    style="padding: 0px 15px 0 0;"
                  >
                    <div v-for="(innerItem,index) in item.value" :key="index" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="name">{{index+1}}.</span>
                          <span
                            class="down"
                            :title="innerItem.fileName"
                            @click="viewFile(innerItem)"
                          >{{innerItem.fileName}}</span>
                          <span class="name">{{innerItem.createrName}}</span>
                          <span class="time">{{innerItem.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index,item.id)"
                              disabled
                              round
                            >删除</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downFile(innerItem)"
                              round
                            >下载</el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                  <el-scrollbar
                    v-if="item.value.constructor == Object"
                    style="padding: 0px 15px 0 0;"
                  >
                    <div v-for="(innerItem,key,index) in item.value" :key="index" class="comp_list">
                      <el-col :span="24" style="font-size:14px;">{{key}}</el-col>
                      <el-col v-for="(obj,key,index1) in innerItem" :key="index1">
                        <template>
                          <div class="command_file">
                            <span
                              style="padding-left:5%;"
                              class="down"
                              :title="obj.fileName"
                              @click="viewFile(obj)"
                            >{{obj.fileName}}</span>
                            <span class="name">{{obj.createrName}}</span>
                            <span class="time">{{obj.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id)"
                                disabled
                                round
                              >删除</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(obj)"
                                round
                              >下载</el-button>
                            </div>
                          </div>
                        </template>
                      </el-col>
                    </div>
                  </el-scrollbar>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

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
import uploadFiles from "@/components/uploadFile/uploadFile";
import draftMuban from "@/minixs/draftMuban";
import minixs from "@/minixs/index";
import dateFormate from "@/util/filters.js";
import closeMessage from '@/components/closeMessage/index';
export default {
  components: {
    uploadFiles,
    closeMessage
  },
  mixins: [minixs, draftMuban],
  data() {
    return {
      curNodeCode:'',
      closeHandler:false,
      showCloseDialog: false,
      editAttach: [], //可编辑附件
      readAttach: [], //不可编辑附件
      attach: [], //不可编辑附件

      mainPage: this.$route.query.mainPage, //true 主表单 false会签、协办、退文、强制回收等在管理员维护等页面 标识
      fileTypeName: "", //判断附件是哪种
      title: "",
      hasUpload: true, //是否可以上传附件
      hasFaw: false,
      subData: {
        id: this.$route.query.id,
        beforeLog: {},
        afterLog: {}
      }, //保存参数
      url: "", //保存接口
      bcType: 0,
      fileObj: [],
      fileObj1: [],
      suggessObj: [],
      oneSuggess: [{}],
      ip: "",
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      fromdata: {
        id: this.$route.query.id,
        attchmentFileInfo: [],
        assistAttchmentFileInfo: [],
        underTakeAttchmentFileInfo: [],
        filePath: "",
        fileName: ""
      },
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        attachTitle: "", //附件标题
        subTempAddF: false, //是否可以上传附件 true是不能上传   false是可以上传
        unitId: this.$route.query.unitId||''
        // noattachTitleCheck: true
      },
      // uploadConfig: {
      //   id: "",
      //   url: "uploadFiles",
      //   code: "",
      //   multiTenancyId: "",
      //   formId: "swswzw",
      //   uploadBtn: false,
      //   noattachTitleCheck: true //是否校验附件名称
      // },
      tradeLine: "",
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
      selectUrl: "",
      sendType: "",
      reminderDialog: false,
      tableType: "",
      tplbsnid: "",
      unitId: this.$route.query.unitId
    };
  },
  created() {
    if (this.$route.query.type == "qb" && this.$route.query.sign == 1) {
      window.opener.location.reload();
      // if (this.$route.query.tplbsnid == 'KHQB_SP') {
      //   this.$post
      //     .postData(
      //       "getQianbaoKhShenpiPoById",
      //       JSON.stringify({
      //         function: "getQianbaoKhShenpiPoById",
      //         orderType: decodeURIComponent(this.$route.query.orderType),
      //         id: this.$route.query.id,
      //         unitId: this.unitId
      //       }),
      //       this.$businessCode.qbgl
      //     )
      //     .then(res => {
      //       if (res && res.success) {
      //         sessionStorage.setItem("fileObj", JSON.stringify(res.data));
      //         this.fileObj = JSON.parse(sessionStorage.getItem("fileObj")) || [];
      //         if (this.$route.query.type == "qb" && this.$route.query.sign == 1) {
      //           this.fileObj.forEach(item => {
      //             if (item.key == "filePath" && item.value != "") {
      //               this.hasFaw = true;
      //               this.fromdata.filePath = item.value;
      //             }
      //             if (item.key == "fileName" && item.value != "") {
      //               this.hasFaw = true;
      //               this.fromdata.fileName = item.value;
      //             }
      //             if (item.key == "multiTenancyId" && item.value != "") {
      //               this.fromdata.multiTenancyId = item.value;
      //             }
      //             if (item.key == "curNodeName" && item.value != "") {
      //               this.fromdata.curNodeName = item.value;
      //             }
      //           });
      //         }
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // } else {
        this.$post
          .postData(
            "getQianbaoById",
            JSON.stringify({
              function: "getQianbaoById",
              orderType: decodeURIComponent(this.$route.query.orderType),
              id: this.$route.query.id,
              unitId: this.unitId
            }),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res && res.success) {
              sessionStorage.setItem("fileObj", JSON.stringify(res.data));
              this.fileObj = JSON.parse(sessionStorage.getItem("fileObj")) || [];
              if (this.$route.query.type == "qb" && this.$route.query.sign == 1) {
                this.fileObj.forEach(item => {
                  if (item.key == "filePath" && item.value != "") {
                    this.hasFaw = true;
                    this.fromdata.filePath = item.value;
                  }
                  if (item.key == "fileName" && item.value != "") {
                    this.hasFaw = true;
                    this.fromdata.fileName = item.value;
                  }
                  if (item.key == "multiTenancyId" && item.value != "") {
                    this.fromdata.multiTenancyId = item.value;
                  }
                  if (item.key == "curNodeName" && item.value != "") {
                    this.fromdata.curNodeName = item.value;
                  }
                });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      // }

      this.$post
        .postData(
          "selectQianbaoSysOpinion",
          JSON.stringify({
            function: "selectQianbaoSysOpinion",
            orderType: decodeURIComponent(this.$route.query.orderType),
            id: this.$route.query.id,
            unitId: this.unitId
          }),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("suggessObj", JSON.stringify(res.data));
            this.suggessObj =
              JSON.parse(sessionStorage.getItem("suggessObj")) || [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.$route.query.type == "qb" && this.$route.query.sign == 5) {
      //&& this.$route.query.tableType=="chuanyue"
      window.opener.location.reload();
      this.$post
        .postData(
          "queryQianbaoCirculateInfoById",
          JSON.stringify({
            function: "queryQianbaoCirculateInfoById",
            orderType: decodeURIComponent(this.$route.query.orderType),
            id: this.$route.query.id,
            multiTenancyId: this.$route.query.multiTenancyId,
            unitId: this.unitId
          }),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("fileObj", JSON.stringify(res.data));
            this.fileObj = JSON.parse(sessionStorage.getItem("fileObj")) || [];
            if (this.$route.query.type == "qb" && this.$route.query.sign == 1) {
              this.fileObj.forEach(item => {
                if (item.key == "filePath" && item.value != "") {
                  this.hasFaw = true;
                  this.fromdata.filePath = item.value;
                }
                if (item.key == "fileName" && item.value != "") {
                  this.hasFaw = true;
                  this.fromdata.fileName = item.value;
                }
                if (item.key == "multiTenancyId" && item.value != "") {
                  this.fromdata.multiTenancyId = item.value;
                }
                if (item.key == "curNodeName" && item.value != "") {
                  this.fromdata.curNodeName = item.value;
                }
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$post
        .postData(
          "selectQianbaoSysOpinion",
          JSON.stringify({
            function: "selectQianbaoSysOpinion",
            orderType: decodeURIComponent(this.$route.query.orderType),
            id: this.$route.query.id,
            tableType: "chuanyue",
            unitId: this.unitId
          }),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("suggessObj", JSON.stringify(res.data));
            this.suggessObj =
              JSON.parse(sessionStorage.getItem("suggessObj")) || [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.fileObj = JSON.parse(sessionStorage.getItem("fileObj")) || [];
    }
    this.title = this.$route.query.title;
    this.sendType = this.$route.query.sendType;
    this.selectUrl = this.$route.query.selectUrl;
    this.uploadConfig.id = this.$route.query.id;
    this.tplbsnid = this.$route.query.tplbsnid;
    this.curNodeCode = this.$route.query.curNodeCode;
    this.tableType = this.$route.query.tableType;
    this.attach = JSON.parse(sessionStorage.getItem("attachObj")) || [];

    this.editAttach = [];
    this.readAttach = [];
    if (this.attach) {
      for (let i = 0; i < this.attach.length; i++) {
        if (this.attach[i].type == "editAttach") {
          this.editAttach.push(this.attach[i]);
        } else {
          this.readAttach.push(this.attach[i]);
        }
      }
      this.uploadConfig.filesHas =
        this.editAttach && this.editAttach[0] && this.editAttach[0].value;
    }

    if (sessionStorage.getItem("suggessObj")) {
      for (
        let index = 0;
        index < JSON.parse(sessionStorage.getItem("suggessObj")).length;
        index++
      ) {
        if (
          JSON.parse(sessionStorage.getItem("suggessObj"))[index].key ==
          "helpFileList"
        ) {
          this.fileObj1 = JSON.parse(sessionStorage.getItem("suggessObj"))[
            index
          ].value;
        }
      }
    }
    this.fileTypeName = "附件";
    if (this.$route.query.type == "sw" && this.$route.query.sign == "swxb") {
      this.fileTypeName = "反馈附件";
    } else if (
      this.$route.query.type == "sw" &&
      this.$route.query.sign == "swcb"
    ) {
      this.fileTypeName = "反馈附件";
    }
    if (this.bcType == 0) {
      if (
        !sessionStorage.getItem("suggessObj") ||
        sessionStorage.getItem("suggessObj") === "undefined"
      ) {
        this.suggessObj = [];
      } else {
        this.suggessObj = JSON.parse(sessionStorage.getItem("suggessObj"));
        if (
          this.suggessObj.length &&
          this.suggessObj[0].key == "final_opinion" &&
          this.suggessObj[0].value.length == 0
        ) {
          this.addSuggess(0);
        }
      }
    } else {
      this.receiveselectlist();
    }

    this.subData.ip = this.ip;
    //修改前Log
    this.logInfo("beforeLog");
    //不同类型模块判断
    if (this.$route.query.type == "sw") {
      if (this.$route.query.sign == "swsw") {
        Object.assign(this.subData, {
          function: "updateReceive",
          receiveType: this.$route.query.receiveType
        });
        this.url = "updateReceive";
      } else if (this.$route.query.sign == "swcy") {
        Object.assign(this.subData, { function: "saveOrUpdateCY" });
        this.url = "saveOrUpdateCY";
      } else if (this.$route.query.sign == "swxd") {
        Object.assign(this.subData, { function: "updateReceiveXDHJ" });
        this.url = "updateReceiveXDHJ";
      } else if (this.$route.query.sign == "swxb") {
        Object.assign(this.subData, { function: "editToReceiveDocHelp" });
        this.url = "editToReceiveDocHelp";
      } else if (this.$route.query.sign == "swcb") {
        Object.assign(this.subData, { function: "editToReceiveDocUndertake" });
        this.url = "editToReceiveDocUndertake";
      } else if (this.$route.query.sign == "swth") {
        Object.assign(this.subData, { function: "editReceiveDocBack" });
        this.url = "editReceiveDocBack";
      }
      this.uploadConfig.code = this.$businessCode.swglfj;
      this.tradeLine = this.$businessCode.swgl;
    } else if (this.$route.query.type == "fw") {
      this.uploadConfig.code = this.$businessCode.fawglfj;
      // Object.assign(this.subData, { function: "updateReceive",receiveType: this.$route.query.receiveType });
      // this.url = "updateReceive";
      this.tradeLine = this.$businessCode.fawgl;
      if (this.$route.query.sign == 1) {
        Object.assign(this.subData, { function: "updateSendOrderById" });
        this.url = "updateSendOrderById";
      } else if (this.$route.query.sign == 2) {
        Object.assign(this.subData, { function: "saveOrUpdateSignAdmin" });
        this.url = "saveOrUpdateSignAdmin";
      } else if (this.$route.query.sign == 3) {
        Object.assign(this.subData, { function: "updateAgainOrderById" });
        this.url = "updateAgainOrderById";
      } else if (this.$route.query.sign == 4) {
        Object.assign(this.subData, { function: "saveOrUpdateAgainSignAdmin" });
        this.url = "saveOrUpdateAgainSignAdmin";
      } else if (this.$route.query.sign == 5) {
        Object.assign(this.subData, { function: "updateBackOrderById" });
        this.url = "updateBackOrderById";
      } else if (this.$route.query.sign == 6) {
        Object.assign(this.subData, {
          function: "saveOrUpdateWithdrawOrderInfoAdmin"
        });
        this.url = "saveOrUpdateWithdrawOrderInfoAdmin";
      }
    } else if (this.$route.query.type == "qb") {
      this.uploadConfig.code = this.$businessCode.qbglfj;
      this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //完成并发送 树   流程交易线   chai
      // Object.assign(this.subData, { function: "updateReceive",receiveType: this.$route.query.receiveType });
      // this.url = "updateReceive";
      this.tradeLine = this.$businessCode.qbgl;
      if (this.$route.query.sign == 1) {
        Object.assign(this.subData, { function: "saveOrUpdateQianbao", unitId: this.unitId , orderType:decodeURIComponent(this.$route.query.orderType)});
        this.url = "saveOrUpdateQianbao"; 
      } else if (this.$route.query.sign == 2) {
        Object.assign(this.subData, { function: "saveOrUpdateQianbaoHuiqian", unitId: this.unitId });
        this.url = "saveOrUpdateQianbaoHuiqian";
      } else if (this.$route.query.sign == 3) {
        Object.assign(this.subData, { function: "doSaveOrUpdateXieban", unitId: this.unitId });
        this.url = "doSaveOrUpdateXieban";
      } else if (this.$route.query.sign == 4) {
        Object.assign(this.subData, { function: "saveOrUpdateQianbaoBack", unitId: this.unitId });
        this.url = "saveOrUpdateQianbaoBack";
      } else if (this.$route.query.sign == 5) {
        Object.assign(this.subData, {
          function: "saveOrUpdateQianbaoCirculateSys", 
          unitId: this.unitId
        });
        this.url = "saveOrUpdateQianbaoCirculateSys";
      }
    } else if (this.$route.query.type == "db") {
      this.uploadConfig.code = this.$businessCode.zxdbfj;
      this.uploadConfig.flowTranId = this.$businessCode.zxdb; //完成并发送 树 流程交易线   chai
      this.tradeLine = this.$businessCode.zxdb;
      Object.assign(this.subData, {
        function: "editSysSupervise",
        superviseDirect: `${this.$route.query.sign}`,
        unitId: this.unitId
      });
      this.url = "editSysSupervise";
    }

    //是否可以上传附件
    if (this.$route.query.type == "sw") {
      if (
        this.$route.query.sign == "swcy" ||
        this.$route.query.sign == "swxd" ||
        this.$route.query.sign == "swth"
      ) {
        this.hasUpload = false;
      }
    }
  },
  methods: {
    draftReminder() {
      if (this.fromdata.filePath && this.fromdata.fileName) {
          this.reminderDialog = true;
        } else {
          this.showDraft = true;
        }
      // this.handelsave()
      // 点击新建正文不掉保存接口
      // this.subData.unitId = this.unitId
      // this.$post
      //   .postData(
      //     "saveOrUpdateQianbao",
      //     JSON.stringify(this.subData),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     if (this.fromdata.filePath && this.fromdata.fileName) {
      //       this.reminderDialog = true;
      //     } else {
      //       this.showDraft = true;
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    draftAgainNo() {
      this.showDraft = false;
      this.reminderDialog = false;
    },
    draftReminderSure() {
      this.showDraft = true;
    },
    draftAgain() {
      this.zhengWenState = 1;
      this.doDraft();
      this.reminderDialog = false;
    },
    scFj() {
      this.attach = JSON.parse(sessionStorage.getItem("attachObj")) || [];
      console.log(this.attach);
      if (this.attach) {
        for (let i = 0; i < this.attach.length; i++) {
          if (this.attach[i].type == "editAttach") {
            this.editAttach.push(this.attach[i]);
          } else {
            this.readAttach.push(this.attach[i]);
          }
        }
      }
    },
    scYj(id, index, label) {
      if (!id) {
        for (let index = 0; index < this.suggessObj.length; index++) {
          if (label == this.suggessObj[index].label) {
            this.suggessObj[index].value.splice(
              this.suggessObj[index].value.length - 1,
              1
            );
            break;
          }
        }
        this.$forceUpdate();
      }

      for (let i1 = 0; i1 < this.suggessObj.length; i1++) {
            if (label == this.suggessObj[i1].label) {
              for (let i = 0; i < this.suggessObj[i1].value.length; i++) {
                if ((id = this.suggessObj[i1].value[i].id)) {
                  console.log(this.suggessObj[i1].value[i]);
                  this.suggessObj[i1].value.splice(index, 1);
                  break;
                }
              }
            }
          }
      // this.$post
      //   .postData(
      //     "doDeleteOpinionById",
      //     JSON.stringify({
      //       function: "doDeleteOpinionById",
      //       id: id
      //     }),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     for (let i1 = 0; i1 < this.suggessObj.length; i1++) {
      //       if (label == this.suggessObj[i1].label) {
      //         for (let i = 0; i < this.suggessObj[i1].value.length; i++) {
      //           if ((id = this.suggessObj[i1].value[i].id)) {
      //             console.log(this.suggessObj[i1].value[i]);
      //             this.suggessObj[i1].value.splice(index, 1);
      //             break;
      //           }
      //         }
      //       }
      //     }
      //   });
    },
    logInfo(bora) {
      this.fileObj.forEach(item => {
        this.subData[bora][item["key"]] = item["value"];
      });
      this.suggessObj.forEach(item => {
        this.subData[bora][item["key"]] = item["value"];
      });
    },
    addSuggess(key) {
      this.suggessObj[key].value.push({});
    },
    preserve() {
      this.receiveselectlist();
    },
    async handelsave(type) {
      var flag = true;
      this.suggessObj.forEach(item => {
        item.value.forEach(items=>{
          if(items.createTime){
            if(items.createTime.length == 19){
                if(items.createTime.indexOf(":")==-1||items.createTime.indexOf("-")==-1){
                  flag = false;
                }else{
                  try {
                    flag = dateFormate.dataFormat(Date.parse((items.createTime)));
                    } catch (err) {
                      flag = false;
                      return 
                    }
                }
            }else{
              flag = false;
              return 
            }
            
          }
          
        })
      });

      if(!flag){
        // alert(1)
        this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: '保存失败，意见域"提交时间"输入格式错误，请参照2020-01-01 00:00:00格式进行输入。',
              duration: 2000
            });
        return;
      }

      if (type == "fj") {
        this.$post
          .postData(
            "selectSysQianbaoFile",
            JSON.stringify({
              function: "selectSysQianbaoFile",
              tplbsnid:
                this.$route.query.type == "qb" && this.$route.query.sign == 5
                  ? ""
                  : this.tplbsnid,
              id: this.$route.query.id,
              tableType:
                this.$route.query.type == "qb" && this.$route.query.sign == 5
                  ? "chuanyue"
                  : "",
              unitId: this.unitId
            }),
            this.$businessCode.qbgl
          )
          .then(res => {
            sessionStorage.setItem("attachObj", JSON.stringify(res.data));
            this.attach = res.data;
            this.editAttach = [];
            this.readAttach = [];
            if (this.attach) {
              for (let i = 0; i < this.attach.length; i++) {
                if (this.attach[i].key == this.$route.query.sign) {
                  this.editAttach.push(this.attach[i]);
                } else {
                  this.readAttach.push(this.attach[i]);
                }
              }
            }
            // this.$forceUpdate();
            // window.location.reload();
          })
          .catch(err => {
            console.log(err);
          });
        return;
      }
      this.uploadConfig.code = this.$businessCode.qbglfj;
      this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //完成并发送 树   流程交易线   chai
      this.bcType = 1;
      let successState = false;
      this.suggessObj.forEach(item => {
        this.subData[item["key"]] = item["value"];
      });
      this.fileObj.forEach(item => {
        this.subData[item["key"]] = item["value"];
      });
      this.fileObj1.forEach(item => {
        this.subData[item["key"]] = item["value"];
      });
      this.logInfo("afterLog");
      if(this.url == "saveOrUpdateQianbao"){
        this.subData.orderType = decodeURIComponent(this.$route.query.orderType)
      }
      //修改后Log
      await this.$post
        .postData(this.url, JSON.stringify(this.subData), this.tradeLine)
        .then(res => {
          if (res.success) {
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            }

            if (type&&type != "uploadfile"&& type != "handSave") {
              this.$message({ type: "success", message: "保存成功" });
              window.opener.location.reload();
              window.opener.opener.location.reload();
            } else if (type=="handSave") {
              this.$message({ type: "success", message: "保存成功" });
              window.opener.location.reload();
              window.opener.opener.location.reload();
              setTimeout(() => {
                location.reload();
                // window.close();
              }, 1000);
            }

            if (!type) {
              this.$post
                .postData(
                  "selectSysQianbaoFile",
                  JSON.stringify({
                    function: "selectSysQianbaoFile",
                    // tplbsnid: this.tplbsnid,
                    // id: this.$route.query.id
                    tplbsnid:
                      this.$route.query.type == "qb" &&
                      this.$route.query.sign == 5
                        ? ""
                        : this.tplbsnid,
                    id: this.$route.query.id,
                    tableType:
                      this.$route.query.type == "qb" &&
                      this.$route.query.sign == 5
                        ? "chuanyue"
                        : "",
                    unitId: this.unitId
                  }),
                  this.$businessCode.qbgl
                )
                .then(res => {
                  sessionStorage.setItem("attachObj", JSON.stringify(res.data));
                  this.attach = res.data;
                  this.editAttach = [];
                  this.readAttach = [];
                  if (this.attach) {
                    for (let i = 0; i < this.attach.length; i++) {
                      if (this.attach[i].key == this.$route.query.sign) {
                        this.editAttach.push(this.attach[i]);
                      } else {
                        this.readAttach.push(this.attach[i]);
                      }
                    }
                  }
                  this.$forceUpdate();
                })
                .catch(err => {
                  console.log(err);
                });
            }
            successState = true;
            this.receiveselectlist();
          } else {
            this.$message({ type: "warning", message:res.message, duation: 1500 });
            successState = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
      return successState;
    },
    //关闭
    // handelclose() {
    //   this.$confirm("是否保存并退出当前页面?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.handelsave();
    //       window.location.href = "about:blank";
    //       window.close();
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         offset: 100,
    //         showClose: true,
    //         message: "已取消关闭",
    //         duation: 1000
    //       });
    //     });
    // },

    // 关闭
    async btnCloseHandler(val){
      if(val == 1){
        window.close();
      }else if(val == 2){
        await this.handelsave();
        window.location.href = "about:blank";
        window.opener.location.reload();window.close();
      }else{
        this.closeHandler = false
      }
    },
    // 关闭
    handleClose(val) {
      if(val=='1') {
        this.preserve().then(save => {
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

    receiveselectlist() {
      sessionStorage.setItem("fileObj", JSON.stringify(this.fileObj));
      sessionStorage.setItem("suggessObj", JSON.stringify(this.suggessObj));
      this.uploadConfig.id = this.$route.query.id;
      let data = { function: this.selectUrl, id: this.uploadConfig.id };
      if (this.$route.query.type == "sw" && this.$route.query.sign == "swcy") {
        Object.assign(data, {
          mainDocId: this.$route.query.mainDocId,
          multiTenancyId: this.$route.query.multiTenancyId,
          unitId: this.unitId
        });
      }
      this.$post
        .postData(
          this.selectUrl,
          JSON.stringify(data),
          this.$route.query.type == "sw" && this.$route.query.sign == "swcy"
            ? this.tradeLine
            : this.tradeLine
        )
        .then(res => {
          if (res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            if (
              this.$route.query.type == "sw" &&
              this.$route.query.sign == "swxb"
            ) {
              this.fileTypeName = "反馈附件";
              this.fromdata.attchmentFileInfo = res.data.helpFileList;
            } else if (
              this.$route.query.type == "sw" &&
              this.$route.query.sign == "swcb"
            ) {
              this.fileTypeName = "反馈附件";
              this.fromdata.attchmentFileInfo = res.data.undertakeFileList;
            } else if (this.$route.query.type == "fw") {
              if (
                this.$route.query.sign == "2" ||
                this.$route.query.sign == "4"
              ) {
                this.fromdata.attchmentFileInfo =
                  res.data.attchmentFileSignInfo;
              }
            }
            this.uploadConfig.multiTenancyId = res.data.multiTenancyId;

            if (this.$route.query.type == "db") {
              if (this.$route.query.sign == "3") {
                this.attchmentFileInfo = res.data.underTakeAttchmentFileInfo;
                this.fileTypeName = "承办附件";
              }
              if (
                this.$route.query.sign == "2" ||
                this.$route.query.sign == "1"
              ) {
                this.attchmentFileInfo = res.data.attchmentFileInfo;
                this.fileTypeName = "督办附件";
              }
              if (this.$route.query.sign == "4") {
                this.attchmentFileInfo = res.data.assistAttchmentFileInfo;
                this.fileTypeName = "协办附件";
              }
            }
          } else {
            // this.$message({type: "warning",message: res.message,});
          }
        });
    },
    // 处理正文
    drafting(state, judge) {
      let that = this;
      this.zhengWenState = state;
      console.log(this.fromdata.filePath, this.fromdata.fileName, state);
      this.getFileInfo(that).then(res => {
        if (res.state) {
          this.handelsave("save").then(save => {
            if (save) {
              this.doDraft(res);
            }
          });
        }
      });
    },
    //请求文件路径
    async getFileInfo(self, thInfo) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = thInfo
        ? thInfo.templateUrl.fileName
        : self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo
        ? thInfo.templateUrl.filePath
        : self.fromdata.filePath;
      self.bank_doDownloadFile.unitId = this.unitId;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.qbglfj
        )
        .then(res => {
          if (res && res.success) {
            if (thInfo) {
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            } else {
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端获取失败",
              duration: 500
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取失败",
            duration: 500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    //正文跳转
    doDraft(fileInfo,saveName) {
      let data;
      let fileConfig = fileInfo;
      let str = "";
      debugger
      let documentNo,qianbaoCode,title;
      if(!saveName){
        this.fileObj.forEach(item => {
          if(item.key == "documentNo"){
            documentNo = item.value;
          }else if(item.key == "qianbaoCode"){
            qianbaoCode = item.value;
          }else if(item.key == "title"){
            title = item.value;
          } 
        });
        if(documentNo){
          str = qianbaoCode + documentNo + title
        }else{
          str = title
        }
      }else{
        str = saveName;
      }
      console.log(str);
      let openParam = {
        path: "/openAndSave_Word",
        query: {
          state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
          id: getFormId(this.$route.query.id, "sfkhSignpageid"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.qbglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          // pageFlag: "sfkhSignpagePage",
          showBtns: this.zhengWenState == 0 ? false : true,
          stepsNowName: this.fromdata.curNodeName,
          flowTranId: this.$businessCode.qbgl, //流程交易线    chai
          page: "qianbao",
          unitId: this.unitId,
          noNeedColsepage:this.zhengWenState == 0 ? 1 : 0,
          saveSpecialFileName:str,
        }
      };
      if (this.zhengWenState == 1) {
        if (this.fileInfoOfMuBan.fileName) {
          fileConfig = this.fileInfoOfMuBan;
        }
        openParam.query.state = "newFile";
      } else {
        openParam.query.taoHongFlag =
          fileConfig && fileConfig.fileNameTh ? true : false;
        openParam.query.relativePath = fileConfig ? fileConfig.filePath : "";
        openParam.query.fileName = fileConfig ? fileConfig.fileName : "";
        openParam.query.tmpFileName = fileConfig ? fileConfig.fileNameTh : "";
        openParam.query.tmpFilePath = fileConfig ? fileConfig.filePathTh : "";
      }
      data = this.$router.resolve(openParam);
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.attchmentFileInfo[n - 1].id,
          sort: this.fromdata.attchmentFileInfo[n].sort
        },
        {
          id: this.fromdata.attchmentFileInfo[n].id,
          sort: this.fromdata.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
        n - 1
      ];
      this.fromdata.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.attchmentFileInfo[n + 1].id,
          sort: this.fromdata.attchmentFileInfo[n].sort
        },
        {
          id: this.fromdata.attchmentFileInfo[n].id,
          sort: this.fromdata.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
        n + 1
      ];
      this.fromdata.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.bank_deleteFileById.id = id;
          this.bank_deleteFileById.unitId = this.unitId;
          this.$post
            .postData(
              "deleteFileById",
              JSON.stringify(this.bank_deleteFileById),
              this.$businessCode.qbglfj
            )
            .then(res => {
              if (res) {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 1000
                  });
                  this.editAttach[0].value.splice(n, 1);
                  this.uploadConfig.filesHas = this.editAttach[0].value;
                  this.$post
                    .postData(
                      "selectSysQianbaoFile",
                      JSON.stringify({
                        function: "selectSysQianbaoFile",
                        // tplbsnid: this.tplbsnid,
                        // id: this.$route.query.id
                        tplbsnid:
                          this.$route.query.type == "qb" &&
                          this.$route.query.sign == 5
                            ? ""
                            : this.tplbsnid,
                        id: this.$route.query.id,
                        tableType:
                          this.$route.query.type == "qb" &&
                          this.$route.query.sign == 5
                            ? "chuanyue"
                            : ""
                      }),
                      this.$businessCode.qbgl
                    )
                    .then(res => {
                      sessionStorage.setItem(
                        "attachObj",
                        JSON.stringify(res.data)
                      );
                    })
                    .catch(err => {
                      console.log(err);
                    });
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "删除失败",
                    duration: 1000
                  });
                }
              }
            });
        })
        .catch(() => {});
    },
    //查看附件
    viewFile(file) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.bank_doDownloadFile.unitId = this.unitId;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.qbglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              fileType.map(item => {
                if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                  openPlugin = true;
                }
              });
              if (openPlugin) {
                this.zhengWenState = 0;
                this.doDraft(res);
              } else {
                window.open(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName +
                    "&openFile=true",
                  "_blank"
                );
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "后端获取文件失败",
                duration: 1500
              });
            }
          }
        });
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.bank_doDownloadFile.unitId = this.unitId;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.qbglfj
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
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 1500
              });
            }
          }
        });
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
.yijian_wrap {
  border: 1px solid #999;
  height: 260px;
}
.flex_ac {
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  align-items: center;
}
.m-10 {
  margin: 10px 5px;
}
.file-wrap {
  padding: 15px 10px;
  margin: 10px 0;
  border: 1px solid #999;
}
.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
    width: 180px;
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
.pl65 {
  padding-left: 65%;
}
.bank_dispach_content {
  width: 100%;
  height: auto;
  .bank_dispach_side_nav {
    width: 45px;
    height: auto;
    position: fixed;
    bottom: 8px;
    left: 10%;
    margin-left: -43px;
    text-align: center;
    a {
      width: 45px;
      height: 70px;
      border: 2px solid #3b85ef;
      font-size: 16px;
      margin: 15px 0;
      color: #3b85ef;
      background: #fff;
      border-radius: 10px 0 0 10px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active {
      background: #3b85ef;
      color: #fff;
    }
  }

  .bank_dispach_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        font-size: 12px;
        margin: 40px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: #ff6600;
          }
        }
        .bank_article_illustrates {
          position: absolute;
          top: 3px;
          right: 10px;
        }
      }
      .bank_db_height {
        height: auto;
      }
    }
    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 20px 0;
    }

    el-form-item {
      margin: 10px 0;
    }
  }

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.linecenter {
  /deep/ .el-form-item__label {
    width: 30px;
    text-align: center;
    padding: 0;
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
.pos_r {
  position: relative;
}
/deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #606266;
}
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  padding: 0 10px;
}
.disable_w {
  width: 100%;
}
.disable_w {
  width: 100%;
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
</style>

