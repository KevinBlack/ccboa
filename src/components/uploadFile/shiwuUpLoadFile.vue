<template>
  <div class="file_wp">
    <!-- action="http://127.0.0.1:8080/ecpweb/ecpJson.action" -->
    <form
      ref="formFileUpload"
      :id="uploadConfig.formId"
      :action="action"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="uploader uploader-example">
        <div class="uploader-drop">
          <label class="uploader-btn">
            浏&nbsp;览
            <input
              type="file"
              name="upload"
              ref="filesLists0"
              @change="uploadFilesChange"
              multiple="multiple"
              style="visibility: hidden; position: absolute; width: 1px; height: 1px;"
            />
          </label>
          <span class="load_accessory">
            &nbsp;目前系统只支持doc、wps、xls格式附件上传，附件大小合计不超过20M。
          </span>
          <el-button
            :disabled="checkFilesList.length==0||hasSameFile"
            type="primary"
            size="mini"
            @click="uploadFileNow()"
            style="float:right"
          >上传
          </el-button>
        </div>
      </div>
      <template v-for="(item,index) in checkFilesList">
        <template v-if="index==0">
          <!-- 文件路径 !!!-->
          <input type="hidden" :key="item" name="transFlag" value="p8_rp"/>
          <!-- 指定上传到那儿 -->
          <input type="hidden" name="remotePath" :key="'remotePath'+index" value="/log/file/p8Files"/>
        </template>
        <template v-if="index>0">
          <input class="hideInput" :ref="'filesLists'+index" type="file" :key="index" name="upload"/>
          <!-- 文件路径 !!!-->
          <input type="hidden" :key="item" name="transFlag" value="p8_rp"/>
          <!-- 指定上传到那儿 -->
          <input type="hidden" name="remotePath" :key="'remotePath'+index" value="/log/file/p8Files"/>
        </template>
      </template>
      <!-- 固定 -->
      <input type="hidden" name="transaction_id" v-model="code"/>
      <input type="hidden" name="_fw_service_id" value="simpleTransaction"/>
      <input type="hidden" :id="uploadConfig.hiddenJson" name="jsonData"/>
      <input type="hidden" name="savePath" value="/log/file/p2Files"/>
      <input type="hidden" name="docType" value="jgyg_staff"/>
    </form>
    <div style="clear:both"></div>
    <div class="command_wrap">
      <div style="display:flex">
       <!-- <el-checkbox
          :indeterminate="false"
          style="flex:1;"
          v-model="isIndeterminate"
          v-if="nowFilesList.length>0"
          @change="checkAll=>handleCheckAllChange(checkAll)"
        >全选
        </el-checkbox>-->
       <!-- <div>
          <el-button
            v-if="nowFilesList.length>0"
            :disabled="checkFilesList.length==0"
            type="default"
            size="mini"
            @click="deletFiles"
            style="float:right;margin-right:10px"
          >删除
          </el-button>
        </div>-->
      </div>

      <!--<div v-if="nowFilesList.length>0" style="height:160px;overflow:scroll">
        <template>
          <el-scrollbar>
            <el-checkbox-group v-model="checkFilesList" @change="handleCheckedFilesChange">
              <el-checkbox
                v-for="file in nowFilesList"
                :label="file.name"
                :value="file.name"
                :key="file.name"
              >{{file.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
        </template>
      </div>-->
      <div v-if="nowFilesList.length>0">
        <el-row>
          <el-col :span="20"> {{nowFilesList[0].name}}</el-col>
          <el-col :span="4">
            <el-button
              v-if="nowFilesList.length>0"
              :disabled="checkFilesList.length==0"
              type="default"
              size="mini"
              @click="deletFiles"
              style="float:right;margin-right:10px"
            >删除
            </el-button>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
    import {typeUrl} from '../../httpTansun/severCode'

    var loading;
    var suffix = ["xls", "xlsx", "doc", "docx", "ppt", "pptx", "txt", "pdf"];
    var fileUpload = new PJF.ui.fileupload({
        dom: "fileUpload",
        maxFileSize: 1024 * 30,
        whiteList: [".xls", ".xlsx", ".doc", ".docx", ".ppt", ".pptx", ".txt", "pdf"],
        missingMessage: "文件格式不支持上传"
    });

    export default {
        props: {
            uploadConfig: {
                formId: {type: String, default: "formFileUpload"},
                filesHas: {type: Array, default: () => []},
                hiddenJson:{type: String, default: "hiddenText"},
                isSpecial:{type: String, default: "6"}
            }
        },
        data() {
            return {
                action: process.env.NODE_ENV == 'production' ? 'ecpJson.action' : 'http://127.0.0.1:8080/ecpweb/ecpJson.action',
                formFileUpload: {
                    _fw_service_id: "",
                    transaction_id: "",
                    savePath: "",
                    transFlag: "",
                    remotePath: "",
                    docType: "",
                    fileUpload: ""
                },
                code:'A08462002',//交易线
                url:"uploadFiles",
                nowFilesList: [], //当前文件列表
                checkFilesList: [], //选中上传列表
                isIndeterminate: false,//全选
                hasSameFile: false //相同文件
            };
        },
        created() {
            setTimeout(() => {
                this.fileUpload = new PJF.ui.fileupload({
                    dom: "fileUpload",
                    maxFileSize: 1024 * 30,
                    whiteList: [
                        ".xls",
                        ".xlsx",
                        ".doc",
                        ".docx",
                        ".ppt",
                        ".pptx",
                        ".txt",
                        "pdf"
                    ],
                    missingMessage: "文件格式不支持上传"
                });
            }, 10);
        },
        methods: {
            handleCheckAllChange(e) {
                let hasFile = false; //是否已存在
                let hasName = [];
                if (e) {
                    this.nowFilesList.map(item => {
                        this.checkFilesList.push(item.id);
                    });

                    this.uploadConfig.filesHas.map((file) => {
                        this.nowFilesList.map((node) => {
                            if (node.name == file.fileName) {
                                hasFile = true;
                                hasName.push(node.name);
                            }
                        })
                    })
                    if (hasFile) {
                        this.$message({
                            type: "error",
                            showClose: true,
                            offset: 400,
                            message: hasName.join(",") + "文件已存在,请先删除",
                            duration: 1000
                        });
                        this.hasSameFile = true;
                        return;
                    } else {
                        this.hasSameFile = false;
                    }
                } else {
                    this.checkFilesList = [];
                }
                this.isIndeterminate = e;
            },
            handleCheckedFilesChange(e) {
                let checkedCount = e.length;
                let hasFile = false; //是否已存在
                let hasName = [];
                this.uploadConfig.filesHas.map((file) => {
                    e.map((node) => {
                        if (node == file.fileName) {
                            hasFile = true;
                            hasName.push(node);
                        }
                    })
                })
                if (hasFile) {
                    this.$message({
                        type: "error",
                        showClose: true,
                        offset: 400,
                        message: hasName.join(",") + "文件已存在,请先删除",
                        duration: 1000
                    });
                    this.hasSameFile = true;
                } else {
                    this.hasSameFile = false;
                }

                this.isIndeterminate = checkedCount === this.nowFilesList.length;
            },
            // uploadFilesChange(e) {
            //     let files = e.target.files;
            //     if (!files.length) {
            //         return;
            //     }
            //     if( this.nowFilesList.length>0||files.length>1){
            //         this.$message({type:"error",message:"只可上传一个"})
            //         return;
            //     }
            //     this.isIndeterminate = false;
            //     for (var i = 0, item; (item = files[i]); i++) {
            //         this.nowFilesList = this.nowFilesList.filter(node => {
            //             return node.name != item.name;
            //         });
            //         this.nowFilesList.push({
            //             name: item.name,
            //             id: item.name,
            //             size: item.size
            //         });
            //         this.checkFilesList.push(item.id);
            //     }
            // },


            uploadFilesChange(e) {
                let files = e.target.files;
                let nowRules = /[\s,/,/\,",:,;,*,?,<,>,|,%]/;
                let nowFilename = files[0].name.split('.')[0];
                // let nowNames = /\.["doc","docx","ppt","pptx","txt","pdf"]$/;
                let attachTitle = this.uploadConfig.attachTitle || "";
                let titleCheck = false;
                let hasFile = false; //是否已存在
                let fileSizes = 0;   //文件大小
                let hasName = [];
                if (!files.length) {
                    return;
                }
                if( this.nowFilesList.length>0||files.length>1){
                    this.$message({type:"error",message:"只可上传一个"})
                    return;
                }
                if (this.uploadConfig.filesHas) {
                    this.uploadConfig.filesHas.map(file => {
                        for (var i = 0, node; (node = files[i]); i++) {
                            if (node.name == file.fileName) {
                                hasFile = true;
                                fileSizes += file.size;
                                hasName.push(node.name);
                            }
                        }
                    });
                }
                if (hasFile) {
                    this.$message({
                        type: "error",
                        showClose: true,
                        offset: 400,
                        message: hasName.join(",") + "文件已存在,请先删除",
                        duration: 2000
                    });
                    this.hasSameFile = true;
                    return;
                } else {
                    this.hasSameFile = false;
                }
                if (attachTitle.length) {
                    if (attachTitle.indexOf(nowFilename) == -1 || attachTitle.length < nowFilename.length || (attachTitle.length == nowFilename.length && attachTitle != nowFilename)) {
                        titleCheck = true;
                    } else {
                        this.doUpLoad(files, nowRules, fileSizes);
                        return;
                    }
                } else {
                    this.doUpLoad(files, nowRules, fileSizes);
                    return;
                }
                if (titleCheck) {
                    this.$confirm(
                        "引入附件名称与处理单中填写的附件名称不一致，是否继续上传？",
                        "提示",
                        {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }
                    )
                        .then(() => {
                            this.doUpLoad(files, nowRules);
                        })
                        .catch(() => {
                            return;
                        });
                }
            },


            doUpLoad(files, nowRules, fileSizes) {
                this.isIndeterminate = false;
                for (var i = 0, item; (item = files[i]); i++) {
                    fileSizes += Math.ceil(item.size / 1024) + 'kb';
                    if (fileSizes > 20000 * 1024) {
                        this.$message({
                            type: "error",
                            showClose: true,
                            offset: 400,
                            message: "附件总文件大小超过20M,请先删除多余附件",
                            duration: 1500
                        });
                        return;
                    }
                    this.nowFilesList = this.nowFilesList.filter(node => {
                        return node.name != item.name;
                    });
                    this.nowFilesList.push({
                        name: item.name,
                        id: item.name,
                        size: Math.ceil(item.size / 1024) + 'kb',
                        check: false
                    });
                }
                this.$nextTick(() => {
                    this.uploadFileNow();
                })
            },

            deletFiles() {
                this.nowFilesList = this.nowFilesList.filter(item => {
                    let show = true;
                    this.checkFilesList.map((node, n) => {
                        if (item.name === node) {
                            show = false;
                            this.checkFilesList.splice(n);
                        }
                    });
                    return show;
                });
            },
            uploadFileNow() {
                loading = new PJF.ui.loading({
                    maskBody: true,
                    text: "上传中"
                });
                var condition = {
                    requestBody: JSON.stringify({
                        isSpecial:this.uploadConfig.isSpecial,
                        fileFlag: 0,
                        function:this.url,
                        st: localStorage.getItem("st"),
                    }),
                    "OPER_CODE":"123123"
                };
                PJF.html.getDom(this.uploadConfig.hiddenJson).value = PJF.util.json2str(condition);
                console.log("---formFileUpload---->", PJF.html.getDom(this.uploadConfig.formId));
                PJF.html.upload(this.uploadConfig.formId, this.callBackFn);
            },
            callBackFn(data) {
                loading = null
                console.log(data)
                if ((data.BK_CODE = "000000000000" && data.Data_Cntnt)) {
                    if (JSON.parse(data.Data_Cntnt).success) {
                        let datas=[];
                        let fileList=JSON.parse(data.Data_Cntnt).data
                        fileList.forEach(item=>{
                            datas.push(
                                {
                                    fileName:item.file_name,
                                    filePath:item.file_path,
                                    id:item.id,
                                    shuwuformId:this.uploadConfig.formId
                                })
                        })

                        this.$emit("fileList",datas)
                        this.checkFilesList=[];
                        this.nowFilesList = [];
                        this.$message({
                            type: "success",
                            showClose: true,
                            offset: 400,
                            message: "上传成功",
                            duration: 500
                        });
                    } else {
                        this.nowFilesList=[]
                        this.$message({
                            type: "error",
                            showClose: true,
                            offset: 400,
                            message: "上传失败",
                            duration: 500
                        });
                    }
                } else {
                    this.nowFilesList=[]
                    this.$message({
                        type: "error",
                        showClose: true,
                        offset: 400,
                        message: "上传失败",
                        duration: 500
                    });
                }
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .btn_nn {
    cursor: pointer;
    margin-top: 15px;
    border: 1px solid #0f98fe;
    color: white;
    width: 60px;
    line-height: 30px;
    text-align: center;
    background: #0f98fe;
    border-radius: 5px;
  }

  .hideInput {
    width: 0;
    height: 0;
  }

  .tip {
    margin-top: 15px;
    width: 100%;
    line-height: 30px;
  }

  .file_wp {
    margin: 0 0 0 0;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .uploader-example {
      padding: 20px 0;
      font-size: 12px;
    }

    .uploader-drop {
      position: relative;
      padding: 10px;
      overflow: hidden;
      border: 1px dashed #ccc;
      background-color: #f5f5f5;
    }

    .uploader-btn {
      display: inline-block;
      position: relative;
      padding: 4px 8px;
      font-size: 100%;
      line-height: 1.4;
      color: #666;
      border: 1px solid #666;
      cursor: pointer;
      border-radius: 2px;
      background: none;
      outline: none;
    }

    .el-checkbox {
      display: inline-block;
      padding: 10px 0;
      display: block;
      margin-right: 0;
    }

    .command_wrap {
      max-height: 200px;

      .el-scrollbar {
        height: 100%;
      }

      .el-checkbox-group {
        overflow: scroll;
      }
    }
  }
</style>
