<template>
  <div class="empty">
    <el-button @click="save" type="primary" style="margin:20px">保存</el-button>
    <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
    <div
      class="tree_w" v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
      <el-scrollbar>
        <div
          v-for="(item) in  formData.attchmentFileInfo"
          :key="item.id"
          class="comp_list">
          <template>
            <div class="command_file">
              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
              <span class="name">{{item.createrName}}</span>
              <span class="name">{{item.createTime}}</span>
              <div class="btns">
                <el-button
                  type="warning"
                  size="mini"
                  @click.native="deleteRow(index,item.id)"
                  :disabled="item.disabled"
                  round
                >删除
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click.native="downFile(item)"
                  round
                >下载
                </el-button>
              </div>
            </div>
          </template>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    import uploadFileTs from "components/uploadFile/shiwucopy";
    import openOrDownLoadFile from "@/minixs/shiwuLineWord"
    export default {
        name: 'empty',
        components: {
            uploadFileTs
        },
        mixins: [openOrDownLoadFile],
        props: {},
        data() {
            return {
                formData:{
                    attchmentFileInfo:[]
                },
                uploadConfig: {
                    formId: "shiwuForm",
                    textFileHas: [],
                    isSpecial: 0,
                    id: ''
                },
                fileId: "",
                id:''
            }
        },
        computed: {},
        methods: {
            queryDeal(){
                this.$api.setSysConfig.sysText({

                }).then(res => {
                    this.id=res.data[0].id
                    this.getList()
                    // this.$nextTick(()=>{
                    //     this.formData.attchmentFileInfo=res.data[0]
                    //     console.log("------->",this.formData.attchmentFileInfo)
                    // })
                })
            },
            save() {
                if(this.id){
                    this.$api.setSysConfig.sysTextUpdate({
                        id:this.id,
                        fileId: this.formData.attachid
                    }).then(res => {
                        if(res.code=='SUCCESS'){
                            this.$message({
                                type:'success',
                                message:'保存成功'
                            })
                        }
                    })
                }else{
                    this.$api.setSysConfig.sysTextCrea({
                        // id:this.id,
                        fileId: this.formData.attachid
                    }).then(res => {
                        if(res.code=='SUCCESS'){
                            this.$message({
                                type:'success',
                                message:'保存成功'
                            })
                        }
                    })
                }
            },
            fileList(files) {
                console.log("-------->files",files)
                this.fileId=files[0].id
                if (this.formData.attchmentFileInfo && this.formData.attchmentFileInfo.length) {
                    this.formData.attchmentFileInfo.push(...files)
                } else {
                    this.formData.attchmentFileInfo = files
                }
                if (!this.formData.attachs) {
                    this.formData.attachs = [];
                }
                files.forEach(item => {
                    this.formData.attachs.push(item.id)
                })
                this.uploadConfig.textFileHas = this.formData.attchmentFileInfo
                this.formData.attachid = this.formData.attachs.join(',')
                this.$forceUpdate();
            },
            getList(){
                this.$api.setSysConfig.getTextemList(
                    {
                        id: this.id,
                    }).then(res => {
                    this.$nextTick(() => {
                        this.$set(this.formData, 'attchmentFileInfo', res.data)
                        this.uploadConfig.textFileHas = this.formData.attchmentFileInfo
                    })
                })
            },
            deleteRow(n,id) {
                this.$confirm("是否删除附件?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(res => {
                    this.$api.setSysConfig.deleFile(
                        {
                            id: id
                        }).then(res => {
                        if(res&&res.code=='SUCCESS'){
                            this.formData.attchmentFileInfo.splice(n, 1);
                            this.uploadConfig.textFileHas = files
                            this.$forceUpdate();
                            // this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
                            this.queryDeal()
                            this.$message({
                                type:"success",
                                message:'删除成功'
                            })
                        }
                    })
                })
            },
            downFile(file) {
                let bank_doDownloadFile = {function: "doDownloadFile"}
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
                                downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                    res.filePath +
                                    "&fileName=" +
                                    res.fileName, file.fileName);
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
            },
        },
        activated() {
        },
        mounted() {
        },
        created() {
            this.queryDeal()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
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
</style>
