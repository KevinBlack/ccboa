<template>
  <div class="receive_dispatch">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>

        <div class="grid_comtent">
          <!-- <el-button size="small" @click="drafting(2)" v-if="hasFaw&&mainPage">修改正文</el-button> -->
          <!-- <el-button size="small" @click="drafting('newFile')" v-if="hasFaw&&mainPage">新建正文</el-button> -->
          <el-button size="small" @click="handelclose">关闭</el-button>
          <el-button size="small" @click="handelsave">保存</el-button>
        </div>
      </el-col>
    </el-row>
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
                  <!-- <el-input v-model="value['value']" :disabled="value['label'] == '创建时间' ||value['label'] == '修改时间' ||value['label'] == '拟稿时间'"></el-input> -->
                  <el-input
                    v-model="value['value']"
                    :disabled="value['label'] == '创建时间' ||value['label'] == '修改时间' ||value['label'] == '拟稿时间'" v-if="!(value['label'] == '附件标题' && value['key'] == 'attachmentTitle')"
                  ></el-input>
                  <el-input
                      autosize
                      resize="none"
                      type="textarea"
                      v-model="value['value']"
                      v-if="value['label'] == '附件标题' && value['key'] == 'attachmentTitle'"
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
                  <el-button @click="addSuggess(index,item.label)" :disabled="(finalYJ&&item.label=='最终意见')||item.delete == 0">新增意见</el-button>
                  <!--  -->
                </div>
              </el-col>
              <el-col
                :span="19"
                class="yijian_wrap"
                :style="{height:item.value.length<1?'260px':item.value.length*260+'px'}"
              >
                <div v-for="(innerItem,index) in item.value" :key="innerItem.id" style="height:260px;padding:10px 0">
                  <el-row class="m-10">
                    <el-col :span="12">
                      <el-input type="textarea" v-model="innerItem.content" :disabled="item.disabled == 1"></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="m-10 flex_ac">
                    <el-col :span="2">用户部门</el-col>
                    <el-col :span="8">
                      <el-input v-model="innerItem.departmentName" :disabled="item.disabled == 1"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">部门Id</el-col>
                    <el-col :span="8">
                      <el-input v-model="innerItem.departmentId" :disabled="item.disabled == 1"></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="m-10 flex_ac">
                    <el-col :span="2">提交时间</el-col>
                    <el-col :span="8">
                      <el-input v-model="innerItem.createTime" :disabled="item.disabled == 1"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">用户中文名</el-col>
                    <el-col :span="8">
                      <el-input v-model="innerItem.userName" :disabled="item.disabled == 1"></el-input>
                    </el-col>
                  </el-row>
                   <el-row class="m-10 flex_ac">
                     <el-col :span="2">用户Id</el-col>
                      <el-col :span="8">
                        <el-input v-model="innerItem.userId" :disabled="item.disabled == 1"></el-input>
                      </el-col>
                      <el-col :span="8" style="text-align:center">
                        <el-button type="primary" @click="scYj(innerItem.id,index,item.label)"
                         :disabled="item.delete == 0"
                        >删除</el-button>
                      </el-col>
                   </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="file-wrap" v-if="editAttach&&editAttach.length>0">
            <el-row>{{editAttach[0].label}}
              <uploadFiles
                ref="uploadComponent"
                @preserve="handelsave('fj')"
                :uploadConfig="uploadConfig"
              ></uploadFiles>
              <el-col v-if="editAttach[0].value.length>0">
                <div
                  class="tree_w"
                  style="margin-left:138px;" >
                  <el-scrollbar>
                    <div
                      v-for="(item,index) in editAttach[0].value" :key="index"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_wrap">
                          <span class="name">{{index+1}}</span>
                          <span
                            class="name down"
                            :title="item.fileName"
                            @click="viewFile(item)"
                          >{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
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
            v-for="(item,index) in readAttach" :key="index"
            >{{item.label}}
              <el-col>
                <div
                  class="tree_w"
                  style="margin-left:138px;" >
                  <el-scrollbar v-if="item.value.constructor == Array">
                    <div
                      v-for="(innerItem,index) in item.value" :key="index"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_wrap">
                          <span class="name">{{index+1}}</span>
                          <span
                            class="name down"
                            :title="innerItem.fileName"
                            @click="viewFile(innerItem)"
                          >{{innerItem.fileName}}</span>
                          <span class="name">{{innerItem.createrName}}</span>
                          <span class="name">{{innerItem.createTime}}</span>
                          <div class="btns">
                            <!-- <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index,innerItem.id)"
                              :disabled="innerItem.disabled"
                              round
                            >删除</el-button> -->
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
                  <el-scrollbar v-if="item.value.constructor == Object">
                    <div
                      v-for="(innerItem,key,index) in item.value" :key="index"
                      class="comp_list"
                    >
                    <el-col :span="24" style="font-size:14px;">{{key}}</el-col>
                      <el-col v-for="(obj,key,index1) in innerItem" :key="index">
                        <template>
                        <div class="command_wrap">
                          <!-- <span class="name">{{index+1}}</span> -->
                          <span
                           style="padding-left:5%;"
                            class="name down"
                            :title="obj.fileName"
                            @click="viewFile(obj)"
                          >{{obj.fileName}}</span>
                          <span class="name">{{obj.createrName}}</span>
                          <span class="name">{{obj.createTime}}</span>
                          <div class="btns">
                            <!-- <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index,obj.id)"
                              :disabled="obj.disabled"
                              round
                            >删除</el-button> -->
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
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFile/uploadFile";
export default {
  components: {
    uploadFiles
  },
  // watch: {
  //   $route: {
  //     handler(nVal, oVal) {
  //       console.log(nVal);
  //     },
  //     immediate: true
  //   }
  // },
  data() {
    return {
      editAttach:[],//可编辑附件
      readAttach:[],//不可编辑附件
      attach:[],//不可编辑附件
      finalYJ:false,//最终意见是否新增
      mainPage:true,    //true 主表单 false会签、协办、退文、强制回收等在管理员维护等页面 标识
      fileTypeName:"",//判断附件是哪种
      title:"",
      hasUpload:true,//是否可以上传附件
      hasFaw:false,
      subData: {
        id: this.$route.query.id,
        manager: '1',
        unitId: this.$route.query.unitId,
        beforeLog:{},
        afterLog:{}
      }, //保存参数
      url: "", //保存接口
      bcType:0,
      fileObj: [],
      fileObj1: [],
      suggessObj: [],
      oneSuggess: [{}],
      ip: "",
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      fromdata: {
        id: this.$route.query.id,
        attchmentFileInfo: [],
        assistAttchmentFileInfo: [],
        underTakeAttchmentFileInfo:[],
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
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        attachTitle: "", //附件标题
        subTempAddF: false, //是否可以上传附件 true是不能上传   false是可以上传
        manager:"",
        unitId:this.$route.query.unitId||"",
      },
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
        id: "",
        unitId:this.$route.query.unitId||'',
        manager:"",
      },
      selectUrl:"",
      sendType: ""
    };
  },
  created() {
    this.mainPage = this.$route.query.mainPage;
    this.title=this.$route.query.title;
    this.sendType=this.$route.query.sendType;
    this.selectUrl=this.$route.query.selectUrl;
    this.uploadConfig.id = this.$route.query.id;
    this.fileObj = JSON.parse(sessionStorage.getItem("fileObj"))||[];
    if(JSON.parse(sessionStorage.getItem("attachObj"))){
      this.attach = JSON.parse(sessionStorage.getItem("attachObj"))||[];
    }
    if(JSON.parse(sessionStorage.getItem("suggessObj"))){
      this.suggessObj = JSON.parse(sessionStorage.getItem("suggessObj"));
    }
    if(this.attach.length>0){
      for (let i = 0; i < this.attach.length; i++) {
        if(this.attach[i].key == 1){
          this.editAttach.push(this.attach[i])
        }else{
          this.readAttach.push(this.attach[i])
        }
      }
    }
    if(sessionStorage.getItem("suggessObj")){
      for (let index = 0; index < JSON.parse(sessionStorage.getItem("suggessObj")).length; index++) {
        if(JSON.parse(sessionStorage.getItem("suggessObj"))[index].key == 'helpFileList'){
          this.fileObj1 = JSON.parse(sessionStorage.getItem("suggessObj"))[index].value;
        }
        if(JSON.parse(sessionStorage.getItem("suggessObj"))[index].label == '最终意见'){
          if(JSON.parse(sessionStorage.getItem("suggessObj"))[index].value.length > 0){
            this.finalYJ = true;
          }
        }
      }
    }


    this.fileTypeName = '附件';
    if(this.$route.query.type=='sw'&&this.$route.query.sign=='swxb'){
      this.fileTypeName = '反馈附件'
    }else if(this.$route.query.type=='sw'&&this.$route.query.sign=='swcb'){
        this.fileTypeName = '反馈附件'
    }
    if(this.bcType == 0){
      if(!sessionStorage.getItem("suggessObj")||sessionStorage.getItem("suggessObj")==="undefined"){
          this.suggessObj = [];
      }else{
        this.suggessObj = JSON.parse(sessionStorage.getItem("suggessObj"));
        if(this.suggessObj.length && this.suggessObj[0].key == "final_opinion"&&this.suggessObj[0].value.length==0) {
          this.addSuggess(0)
        }
      }
    }else{
     this.receiveselectlist();
    }

    this.subData.ip = this.ip;
    this.subData.unitId=this.$route.query.unitId;
    //修改前Log
    this.logInfo('beforeLog');
    //不同类型模块判断
      if(this.$route.query.sign == "swsw"){
          Object.assign(this.subData, { function: "updateReceive",receiveType: this.$route.query.receiveType,choseYear: this.$route.query.choseYear });
          this.url = "updateReceive";
      }else if(this.$route.query.sign == "swcy"){
          Object.assign(this.subData, { function: "saveOrUpdateCY",choseYear: this.$route.query.choseYear});
          this.url = "saveOrUpdateCY";
      }else if(this.$route.query.sign == "swxd"){
          Object.assign(this.subData, { function: "updateReceiveXDHJ"});
          this.url = "updateReceiveXDHJ";
      }else if(this.$route.query.sign == "swxb"){
          Object.assign(this.subData, { function: "editToReceiveDocHelp",choseYear: this.$route.query.choseYear});
          this.url = "editToReceiveDocHelp";
      }else if(this.$route.query.sign == "swcb"){
          Object.assign(this.subData, { function: "editToReceiveDocUndertake",choseYear: this.$route.query.choseYear});
          this.url = "editToReceiveDocUndertake";
      }else if(this.$route.query.sign == "swth"){
          Object.assign(this.subData, { function: "editReceiveDocBack",choseYear: this.$route.query.choseYear});
          this.url = "editReceiveDocBack";
      }
      this.uploadConfig.code = this.$businessCode.swglfj;
      this.tradeLine = this.$businessCode.swgl;
  },
  methods: {
    scYj(id,index,label){
      if(label == '最终意见'){
        this.finalYJ = false;
      }
      if(!id){
        for (let index = 0; index < this.suggessObj.length; index++) {
          if(label == this.suggessObj[index].label){
             this.suggessObj[index].value.splice(this.suggessObj[index].value.length-1,1)
              break
          }
        }
        this.$forceUpdate();

      }
      // if(label == this.suggessObj[index].label){
      //   for (let i = 0; i < this.suggessObj[index].value.length; i++) {
      //     if(id = this.suggessObj[index].value[i].id){
      //       this.suggessObj[index].value.splice(i,1)
      //       sessionStorage.setItem("suggessObj",JSON.stringify(this.suggessObj))
      //       break
      //     }
      //   }
      // }
      this.$post
      .postData(
        "doDeleteOpinionById",
        JSON.stringify({
            function: "doDeleteOpinionById",
            id: id
          }),
        this.$route.query.type == "sw"&&this.$route.query.sign == "swcy"?this.tradeLine:this.tradeLine
      )
      .then(res => {
        for (let i1 = 0; i1 < this.suggessObj.length; i1++) {
          if(label == this.suggessObj[i1].label){
            for (let i = 0; i < this.suggessObj[i1].value.length; i++) {
              if(id = this.suggessObj[i1].value[i].id){
                console.log(this.suggessObj[i1].value[i])
                this.suggessObj[i1].value.splice(index,1)
                break
              }
            }
          }
        }
        //this.handelsave('2');
      });

    },
    logInfo(bora){
      this.fileObj.forEach(item => {
        this.subData[bora][item["key"]] = item["value"];
      });
      this.suggessObj.forEach(item=>{
        this.subData[bora][item["key"]] = item["value"];
      })
    },
    addSuggess(key,value) {
      if(value == '最终意见'){
        this.finalYJ = true;
      }
      this.suggessObj[key].value.push({});
    },
    preserve() {
      this.receiveselectlist();
    },
   async handelsave(type) {
     if(type == 'fj'){
       this.$post.postData(
          "getSysFiles",
          JSON.stringify({
              function :"getSysFiles",
              id:this.$route.query.id,
              parentId:this.$route.query.parentId,
              processInstId:this.$route.query.processInstId,
              documentType:this.$route.query.documentType,
              manager:"",
              unitId:this.$route.query.unitId,
              choseYear: this.$route.query.choseYear
            }),
            this.tradeLine
        ).then(res => {
            sessionStorage.setItem("attachObj", JSON.stringify(res.data));
            this.attach =res.data;
            this.editAttach = [];
            this.readAttach = [];
            if(this.attach){
              for (let i = 0; i < this.attach.length; i++) {
                if(this.attach[i].key == 1){
                  this.editAttach.push(this.attach[i])
                }else{
                  this.readAttach.push(this.attach[i])
                }
              }
            }
            this.$forceUpdate();
        })
        .catch(err => {
          console.log(err);
      });
      return
     }
     if(this.$route.query.sign == "swsw"){
          Object.assign(this.subData, { function: "updateReceive",receiveType: this.$route.query.receiveType,choseYear: this.$route.query.choseYear });
          this.url = "updateReceive";
      }else if(this.$route.query.sign == "swcy"){
          Object.assign(this.subData, { function: "saveOrUpdateCY",choseYear: this.$route.query.choseYear});
          this.url = "saveOrUpdateCY";
      }else if(this.$route.query.sign == "swxd"){
          Object.assign(this.subData, { function: "updateReceiveXDHJ"});
          this.url = "updateReceiveXDHJ";
      }else if(this.$route.query.sign == "swxb"){
          Object.assign(this.subData, { function: "editToReceiveDocHelp",choseYear: this.$route.query.choseYear});
          this.url = "editToReceiveDocHelp";
      }else if(this.$route.query.sign == "swcb"){
          Object.assign(this.subData, { function: "editToReceiveDocUndertake",choseYear: this.$route.query.choseYear});
          this.url = "editToReceiveDocUndertake";
      }else if(this.$route.query.sign == "swth"){
          Object.assign(this.subData, { function: "editReceiveDocBack",choseYear: this.$route.query.choseYear});
          this.url = "editReceiveDocBack";
      }
      this.uploadConfig.code = this.$businessCode.swglfj;
      this.tradeLine = this.$businessCode.swgl;
     this.bcType=1;
      let successState = false;
       this.suggessObj.forEach(item=>{
        this.subData[item["key"]] = item["value"];
      });
      this.fileObj.forEach(item => {
        this.subData[item["key"]] = item["value"];
      });
      this.fileObj1.forEach(item => {
        this.subData[item["key"]] = item["value"]
      });
      this.logInfo('afterLog');
      //修改后Log
     await this.$post
        .postData(this.url, JSON.stringify(this.subData), this.tradeLine)
        .then(res => {
          if (res.success) {
            if(type==="uploadfile"){
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            }
            if(type&&type!="uploadfile"){
              this.$message({type: "success",message: "保存成功",});
              window.opener.location.reload();
              window.opener.opener.location.reload();
              setTimeout(()=>{
                window.close();
              },1000)
            }
            if(!type){
              this.$post.postData(
                "getSysFiles",
                JSON.stringify({
                    function :"getSysFiles",
                    id:this.$route.query.id,
                    parentId:this.$route.query.parentId,
                    processInstId:this.$route.query.processInstId,
                    documentType:this.$route.query.documentType,
                  }),
                  this.tradeLine
              ).then(res => {
                 sessionStorage.setItem("attachObj", JSON.stringify(res.data));
                  this.attach =res.data;
                  this.editAttach = [];
                  this.readAttach = [];
                  if(this.attach){
                    for (let i = 0; i < this.attach.length; i++) {
                      if(this.attach[i].key == 1){
                        this.editAttach.push(this.attach[i])
                      }else{
                        this.readAttach.push(this.attach[i])
                      }
                    }
                  }
                  this.$forceUpdate();
              })
              .catch(err => {
                console.log(err);
            });
            }
          }else{
            this.$message({type: "warning",message: "保存失败",});
            successState = false;
          }

        })
        .catch(err => {
          console.log(err);
        });
        return successState;
    },
    handelclose() {
      this.$confirm("是否退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.location.href = "about:blank";
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
    },
    receiveselectlist() {
      sessionStorage.setItem("fileObj",JSON.stringify(this.fileObj))
      sessionStorage.setItem("suggessObj",JSON.stringify(this.suggessObj))
      sessionStorage.setItem("suggessObj",JSON.stringify(this.suggessObj))
      this.uploadConfig.id = this.$route.query.id;
      let data={ function: this.selectUrl, id: this.uploadConfig.id };
      if(this.$route.query.type == "sw"&&this.$route.query.sign == "swcy"){
        Object.assign(data,{mainDocId:this.$route.query.mainDocId,multiTenancyId:this.$route.query.multiTenancyId})
      }
      this.$post
        .postData(
          this.selectUrl,
          JSON.stringify(data),
          this.$route.query.type == "sw"&&this.$route.query.sign == "swcy"?this.tradeLine:this.tradeLine
        )
        .then(res => {
          if (res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            if(this.$route.query.type=='sw'&&this.$route.query.sign=='swxb'){
              this.fileTypeName = '反馈附件'
              this.fromdata.attchmentFileInfo=res.data.helpFileList;
            }else if(this.$route.query.type=='sw'&&this.$route.query.sign=='swcb'){
               this.fileTypeName = '反馈附件'
              this.fromdata.attchmentFileInfo=res.data.undertakeFileList;
            }else if(this.$route.query.type=='fw'){
              if(this.$route.query.sign=='2'||this.$route.query.sign=='4'){
                this.fromdata.attchmentFileInfo=res.data.attchmentFileSignInfo;
              }
            }
            this.uploadConfig.multiTenancyId = res.data.multiTenancyId;

            if(this.$route.query.type == 'db'){
              if(this.$route.query.sign == '3'){
                this.attchmentFileInfo = res.data.underTakeAttchmentFileInfo;
                this.fileTypeName = '承办附件'
              }
              if(this.$route.query.sign == '2'||this.$route.query.sign == '1'){
                this.attchmentFileInfo = res.data.attchmentFileInfo;
                this.fileTypeName = '督办附件'
              }
              if(this.$route.query.sign == '4'){
                this.attchmentFileInfo = res.data.assistAttchmentFileInfo;
                this.fileTypeName = '协办附件'
              }
            }
          }else{
            // this.$message({type: "warning",message: res.message,});
          }
        });
    },
    // 处理正文
    drafting(state, judge) {
      let that = this;
      this.zhengWenState = state;
      this.getFileInfo(that).then(res => {
        if (res.state) {
          this.handelsave().then(save => {
            if (save) {
              this.doDraft(res);
            }
          });
        }
      });
    },
     //请求文件路径
    async getFileInfo(self,thInfo) {
      var successInfo = {state:false};
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.tradeLine
        )
        .then(res => {
          if (res && res.success) {
            if(thInfo){
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            }else{
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          }else{
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
         successInfo.state = false
        });
        return successInfo
    },
    //正文跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: this.fromdata.id, //id
          zhengWenState: this.zhengWenState,
          JYcode: this.uploadConfig.code,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          showBtns: false
        }
      });
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
      let newCode = this.tradeLine.replace(this.tradeLine.charAt(this.tradeLine.length-1),parseInt(this.tradeLine.charAt(this.tradeLine.length-1))+1)
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
              this.bank_deleteFileById.id = id;
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.tradeLine
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 1500
              });
            this.editAttach[0].value.splice(n, 1);
            this.$post.postData(
                "getSysFiles",
                JSON.stringify({
                    function :"getSysFiles",
                    id:this.$route.query.id,
                    parentId:this.$route.query.parentId,
                    processInstId:this.$route.query.processInstId,
                    documentType:this.$route.query.documentType,
                  }),
                  this.tradeLine
              ).then(res => {
                 sessionStorage.setItem("attachObj", JSON.stringify(res.data));
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
                duration: 1500
              });
            }
          }
        });


        })
      //this.tradeLine.replace(this.tradeLine.charAt(this.tradeLine.length-1),parseInt(this.tradeLine.charAt(this.tradeLine.length-1))+1)

    },
    //查看附件
    viewFile(file) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.tradeLine.replace(this.tradeLine.charAt(this.tradeLine.length-1),parseInt(this.tradeLine.charAt(this.tradeLine.length-1))+1)
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
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.tradeLine.replace(this.tradeLine.charAt(this.tradeLine.length-1),parseInt(this.tradeLine.charAt(this.tradeLine.length-1))+1)
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

