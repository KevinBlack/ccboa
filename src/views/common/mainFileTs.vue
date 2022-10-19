<template>
  <div class="receive_dispatch">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>

        <div class="grid_comtent">
          <el-button @click="drafting(2)" v-if="hasFaw">修改正文</el-button>
          <el-button @click="handelsave">保存</el-button>
          <el-button @click="handelclose">关闭</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{fromdata.documentTitle||""}}</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form ref="fileObj" label-width="260px" class="demo-ruleForm mt20">
            <el-row>
              <el-col :span="12" v-for="(value,index) in fileObj" :key="index">
                <el-form-item :label="value['label']" v-if="value['key']!=='id'">
                  <el-input v-model="value['value']"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div v-if="suggessObj.length>0">
            <el-row v-for="(item,index) in suggessObj" :key="index">
              <el-col
                :span="5"
                class="yijian_wrap flex_ac"
                :style="{height:item.value.length<1?'260px':item.value.length*260+'px'}"
              >
                <div>
                  <div>{{item.label}}</div>
                  <el-button @click="addSuggess(index)" :disabled="$route.query.sign=='swxb'||$route.query.sign=='swcb'||item.type=='sign'">新增意见</el-button>
                </div>
              </el-col>
              <el-col
                :span="19"
                class="yijian_wrap"
                :style="{height:item.value.length<1?'260px':item.value.length*260+'px'}"
              >
                <div v-for="innerItem in item.value" :key="innerItem.id" style="height:260px;padding:10px 0">
                  <el-row class="m-10">
                    <el-col :span="12">
                      <el-input type="textarea" v-model="innerItem.content" :disabled="$route.query.sign=='swxb'||$route.query.sign=='swcb'"></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="m-10 flex_ac">
                    <el-col :span="2">用户部门</el-col>
                    <el-col :span="8">
                      <el-input v-model="innerItem.departmentName" :disabled="$route.query.sign=='swxb'||$route.query.sign=='swcb'"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">部门Id</el-col>
                    <el-col :span="8">
                      <el-input v-model="innerItem.departmentId" :disabled="$route.query.sign=='swxb'||$route.query.sign=='swcb'"></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="m-10 flex_ac">
                    <el-col :span="2">提交时间</el-col>
                    <el-col :span="8">
                      <el-input v-model="innerItem.createTime" :disabled="$route.query.sign=='swxb'||$route.query.sign=='swcb'"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">用户中文名</el-col>
                    <el-col :span="8">
                      <el-input v-model="innerItem.userName" :disabled="$route.query.sign=='swxb'||$route.query.sign=='swcb'"></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="m-10 flex_ac">
                    <el-col :span="2">用户Id</el-col>
                    <el-col :span="8">
                      <el-input v-model="innerItem.userId" :disabled="$route.query.sign=='swxb'||$route.query.sign=='swcb'"></el-input>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="file-wrap" v-if="hasUpload||(fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length>0)">
            <el-row>
              <uploadFiles
                v-if="hasUpload"
                ref="uploadComponent"
                @preserve="preserve"
                :uploadConfig="uploadConfig"
              ></uploadFiles>
              <el-col>
                <div
                  class="tree_w"
                  style="margin-left:138px;"
                  v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                >
                  <el-scrollbar>
                    <div
                      v-for="(item,index) in  fromdata.attchmentFileInfo"
                      :key="item.id"
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
                            <!-- <el-button
                              type="primary"
                              size="mini"
                              @click.native="upRow(index)"
                              v-if="fromdata.attchmentFileInfo.length>1"
                              :disabled="index==0"
                              round
                            >上移</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(index)"
                              v-if="fromdata.attchmentFileInfo.length>1"
                              :disabled="index==fromdata.attchmentFileInfo.length-1"
                              round
                            >下移</el-button> -->
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
                hasUpload:true,//是否可以上传附件
                hasFaw:false,
                subData: {
                    id: this.$route.query.id,
                    beforeLog:{},
                    afterLog:{}
                }, //保存参数
                url: "", //保存接口
                fileObj: [],
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
                    attchmentFileInfo: []
                },
                uploadConfig: {
                    id: "",
                    url: "uploadFiles",
                    code: "",
                    multiTenancyId: "",
                    formId: "swswzw",
                    uploadBtn: false,
                    noattachTitleCheck: true //是否校验附件名称
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
                    id: ""
                },
                selectUrl:"",
            };
        },
        created() {
            this.selectUrl=this.$route.query.selectUrl;
            this.ip = localStorage.getItem("ip") || "127.0.0.1";
            this.fileObj = JSON.parse(sessionStorage.getItem("fileObj"));
            if(!sessionStorage.getItem("suggessObj")||sessionStorage.getItem("suggessObj")==="undefined"){
                this.suggessObj = [];
            }else{
                this.suggessObj = JSON.parse(sessionStorage.getItem("suggessObj"));
            }
            // this.suggessObj = sessionStorage.getItem("suggessObj")!=="undefined"?JSON.parse(sessionStorage.getItem("suggessObj")):[];
            this.subData.ip = this.ip;
            //修改前Log
            this.logInfo('beforeLog');
            //不同类型模块判断
            if (this.$route.query.type == "sw") {
                if(this.$route.query.sign == "swsw"){
                    Object.assign(this.subData, { function: "updateReceive",receiveType: this.$route.query.receiveType });
                    this.url = "updateReceive";
                }else if(this.$route.query.sign == "swcy"){
                    Object.assign(this.subData, { function: "saveOrUpdateCY"});
                    this.url = "saveOrUpdateCY";
                }else if(this.$route.query.sign == "swxd"){
                    Object.assign(this.subData, { function: "updateReceiveXDHJ"});
                    this.url = "updateReceiveXDHJ";
                }else if(this.$route.query.sign == "swxb"){
                    Object.assign(this.subData, { function: "editToReceiveDocHelp"});
                    this.url = "editToReceiveDocHelp";
                }else if(this.$route.query.sign == "swcb"){
                    Object.assign(this.subData, { function: "editToReceiveDocUndertake"});
                    this.url = "editToReceiveDocUndertake";
                }else if(this.$route.query.sign == "swth"){
                    Object.assign(this.subData, { function: "editReceiveDocBack"});
                    this.url = "editReceiveDocBack";
                }
                this.uploadConfig.code = this.$businessCode.swglfj;
                this.tradeLine = this.$businessCode.swgl;
            }else if (this.$route.query.type == "fw") {
                this.uploadConfig.code = this.$businessCode.fawglfj;
                // Object.assign(this.subData, { function: "updateReceive",receiveType: this.$route.query.receiveType });
                // this.url = "updateReceive";
                this.tradeLine = this.$businessCode.fawgl;
                if (this.$route.query.sign == 1) {
                    Object.assign(this.subData, { function: "updateSendOrderById"});
                    this.url = "updateSendOrderById";
                } else if (this.$route.query.sign == 2) {
                    Object.assign(this.subData, { function: "saveOrUpdateSignAdmin"});
                    this.url = "saveOrUpdateSignAdmin";
                } else if (this.$route.query.sign == 3) {
                    Object.assign(this.subData, { function: "updateAgainOrderById"});
                    this.url = "updateAgainOrderById";
                } else if (this.$route.query.sign == 4) {
                    Object.assign(this.subData, { function: "saveOrUpdateAgainSignAdmin"});
                    this.url = "saveOrUpdateAgainSignAdmin";
                } else if (this.$route.query.sign == 5) {
                    Object.assign(this.subData, { function: "updateBackOrderById"});
                    this.url = "updateBackOrderById";
                } else if (this.$route.query.sign == 6) {
                    Object.assign(this.subData, { function: "saveOrUpdateWithdrawOrderInfoAdmin"});
                    this.url = "saveOrUpdateWithdrawOrderInfoAdmin";
                }
            } else if (this.$route.query.type == "qb") {
                this.uploadConfig.code = this.$businessCode.qbglfj;
                // Object.assign(this.subData, { function: "updateReceive",receiveType: this.$route.query.receiveType });
                // this.url = "updateReceive";
                this.tradeLine = this.$businessCode.qbgl;
                if (this.$route.query.sign == 1) {
                    Object.assign(this.subData, { function: "saveOrUpdateQianbao"});
                    this.url = "saveOrUpdateQianbao";
                } else if (this.$route.query.sign == 2) {
                    Object.assign(this.subData, { function: "saveOrUpdateQianbaoHuiqian"});
                    this.url = "saveOrUpdateQianbaoHuiqian";
                } else if (this.$route.query.sign == 3) {
                    Object.assign(this.subData, { function: "doSaveOrUpdateXieban"});
                    this.url = "doSaveOrUpdateXieban";
                } else if (this.$route.query.sign == 4) {
                    Object.assign(this.subData, { function: "saveOrUpdateQianbaoBack"});
                    this.url = "saveOrUpdateQianbaoBack";
                }
            } else if (this.$route.query.type == "db") {
                this.uploadConfig.code = this.$businessCode.zxdbfj;
                this.tradeLine = this.$businessCode.zxdb;
                Object.assign(this.subData, { function: "editSysSupervise", superviseDirect: `${this.$route.query.sign}`});
                this.url = "editSysSupervise";
            }
            //是否有修改发文按钮
            if(this.$route.query.type=='fw'){
                if(this.$route.query.sign==1||this.$route.query.sign==3){
                    this.fileObj.forEach(item=>{
                        if(item.key=='filePath'&&item.value!=""){
                            console.log(item.value)
                            this.hasFaw=true;
                        }
                    })
                }
            }else if(this.$route.query.type=='qb'&&this.$route.query.sign==1){
                this.fileObj.forEach(item=>{
                    if(item.key=='filePath'&&item.value!=""){
                        console.log(item.value)
                        this.hasFaw=true;
                    }
                })
            }
            //是否可以上传附件
            if(this.$route.query.type=='sw'){
                if(this.$route.query.sign=='swcy'||this.$route.query.sign=='swxd'||this.$route.query.sign=='swth'){
                    this.hasUpload=false;
                }
            }
            this.receiveselectlist();
        },
        methods: {
            logInfo(bora){
                this.fileObj.forEach(item => {
                    this.subData[bora][item["key"]] = item["value"];
                });
                this.suggessObj.forEach(item=>{
                    this.subData[bora][item["key"]] = item["value"];
                })
                console.log(this.subData,222)
            },
            addSuggess(key) {
                this.suggessObj[key].value.push({});
            },
            preserve() {
                this.receiveselectlist();
            },
            async handelsave() {
                let successState = false;
                this.suggessObj.forEach(item=>{
                    this.subData[item["key"]] = item["value"];
                })
                this.fileObj.forEach(item => {
                    this.subData[item["key"]] = item["value"];
                });
                //修改后Log
                this.logInfo("afterLog");
                console.log(this.subData);
                console.log(this.url);
                await this.$post
                    .postData(this.url, JSON.stringify(this.subData), this.tradeLine)
                    .then(res => {
                        if (res.success) {
                            this.$message({type: "success",message: "保存成功",});
                            window.opener.location.reload();
                            window.opener.opener.location.reload();
                            successState = true;
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
                window.location.href = "about:blank";
                window.close();
            },
            receiveselectlist() {
                this.uploadConfig.id = this.$route.query.id;
                let data={ function: this.selectUrl, id: this.uploadConfig.id };
                if(this.$route.query.type == "sw"&&this.$route.query.sign == "swcy"){
                    Object.assign(data,{mainDocId:this.$route.query.mainDocId,multiTenancyId:this.$route.query.multiTenancyId})
                }
                this.$post
                    .postData(
                        this.selectUrl,
                        JSON.stringify(data),
                        this.$route.query.type == "sw"&&this.$route.query.sign == "swcy"?this.$businessCode.ggywgn:this.tradeLine
                    )
                    .then(res => {
                        if (res.success) {
                            this.fromdata = Object.assign(this.fromdata, res.data);attchmentFileSignInfo
                            if(this.$route.query.type=='sw'&&this.$route.query.sign=='swxb'){
                                this.fromdata.attchmentFileInfo=res.data.helpFileList;
                            }else if(this.$route.query.type=='sw'&&this.$route.query.sign=='swcb'){
                                this.fromdata.attchmentFileInfo=res.data.undertakeFileList;
                            }else if(this.$route.query.type=='fw'){
                                if(this.$route.query.sign=='2'||this.$route.query.sign=='4'){
                                    this.fromdata.attchmentFileInfo=res.data.attchmentFileSignInfo;
                                }
                            }
                            this.uploadConfig.multiTenancyId = res.data.multiTenancyId;
                        }else{
                            // this.$message({type: "warning",message: res.message,});
                        }
                    });
            },
            // 处理正文
            drafting(state, judge) {
                let that = this;
                let tipLimit = false;
                this.zhengWenState = state;
                console.log(this.fromdata.filePath, this.fromdata.fileName, state );
                if (!this.fromdata.filePath && !this.fromdata.fileName && state != 1) {
                    this.$message({
                        type: "error",
                        offset: 100,
                        showClose: true,
                        message: "请先起草正文",
                        duation: 1500
                    });
                    return;
                }
                if (state == 1) {
                    if (!this.fromdata.type || this.fromdata.type == "") {
                        this.$message({
                            type: "error",
                            offset: 100,
                            showClose: true,
                            message: "请选择发文类型",
                            duation: 500
                        });
                        return;
                    } else if (!this.fromdata.redHead || this.fromdata.redHead == "") {
                        this.$message({
                            type: "error",
                            offset: 100,
                            showClose: true,
                            message: "请选择代字/红头",
                            duation: 500
                        });
                        return;
                    } else if (!this.fromdata.textType || this.fromdata.textType == "") {
                        this.$message({
                            type: "error",
                            offset: 100,
                            showClose: true,
                            message: "请选择文种",
                            duation: 500
                        });
                        return;
                    }
                }
                if (state == 1) {
                    tipLimit = this.judgeDraf(state, judge);
                    if (tipLimit) {
                        return;
                    }
                }
                if (!getFormId(this.$route.query.id, "bankDispachId")) {
                    this.handelsave().then(res => {
                        if (res) {
                            if (state == 1) {
                                this.showDraft = true;
                            } else {
                                let fileInfo = {
                                    filePath: this.fromdata.filePath,
                                    fileName: this.fromdata.fileName
                                };
                                this.doDraft(fileInfo);
                            }
                        }
                    });
                } else {
                    if (state == 1) {
                        this.showDraft = true;
                    } else {
                        this.getFileInfo(that).then(res => {
                            if (res.state) {
                                this.handelsave().then(save => {
                                    if (save) {
                                        if (state != "taoHong") {
                                            this.doDraft(res);
                                        } else {
                                            this.findTemplete(res);
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
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
                        self.$businessCode.fawglfj
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
                                this.fromdata.attchmentFileInfo.splice(n, 1);
                                this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
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
                        this.$businessCode.swglfj
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
                        this.$businessCode.swglfj
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

