<template>
  <div class="save">
    <el-button type="primary" style="margin-left:20px;" @click="close_btn">关闭</el-button>
    <el-button type="danger" style="margin-left:20px;" @click="delete_btn" v-if="isDle">作废</el-button>
    <div class="saveHeader">
      <div class="title-text">{{formData.title}}</div>
    </div>
    <div class="process_content">
      <fd-form
        ref="fd"
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        :config="serverconfig"

      ></fd-form>
      <!--        附件-->
      <div>

        <el-col :span="20" style="margin-left:130px">
          <span >附件</span>
<!--          <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>-->
          <div
            class="tree_w" v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
            <el-scrollbar>
              <div
                v-for="(item,index) in  formData.attchmentFileInfo"
                :key="item.id"
                class="comp_list">
                <template>
                  <div class="command_file">
                    <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                    <span class="name">{{item.createrName}}</span>
                    <span class="name">{{item.createTime}}</span>
                    <div class="btns">
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
        </el-col>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'
    export default {
        name: "save",
        components: {
            FdForm
        },
        props: {},
        data() {
            return {
                isDle:true,
                rowData:{},
                serverconfig: {
                    labelWidth: '160px'
                },
                formData: {},
                formCfg: [],
                id:''
            }
        },
        computed: {},
        methods: {
            queryDeal() {
                this.$api.messPub.BankMessDeal(
                    {id: this.id}
                ).then(res => {
                    this.formData=res.data
                    this.getFileList()
                    this.initData()
                })
            },
            initData() {
                this.formCfg = [
                    // {type:'input',label:'标题',prop:'title',disabled: true,span:20},
                    {type:'input-area',label:'正文',prop:'htmlBody',disabled:true,span:24,config:{rows:8}},

                ]
            },
            //获取附件
            getFileList() {
                this.$api.setSysConfig.getTextemList(
                    {
                        id: this.id,
                    }).then(res => {
                    this.$nextTick(()=>{
                        this.$set(this.formData,'attchmentFileInfo',res.data)
                    })
                })
            },
            //下载文件
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
            close_btn(){
                // this.$router.push('/dashboard/personalOffice/publishInfo/selfBankInfo')
                this.$intent.closeWindow(this);
            },
            delete_btn() {
                this.$confirm("此操作将作废该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$api.messPub.BankMessDelete(
                            {
                                id:this.formData.id
                            }
                        ).then(res => {
                            if(res.code=='SUCCESS'){
                                this.$message({
                                    type:'success',
                                    message:'数据已作废'
                                })
                                // this.$router.back()
                                this.$intent.closeWindow(this);
                            }
                        })
                })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消操作"
                        });
                    });
            },
        },
        created() {
            // console.log("------>",this.$route.query)
            if(this.$route.query&&this.$route.query.isDle){
                this.isDle=true
            }else{
                this.isDle=false
            }
            if(this.$route.query&&this.$route.query.id){
                // this.rowData=this.$route.query.id
                // this.formData.htmlBody=this.rowData.htmlBody
                this.id=this.$route.query.id
                this.queryDeal()
            }

            this.initData()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .save {
    background: white;
    margin: 0 auto;

    .saveHeader {
      padding: 8px 70px;

      .title-text {
        margin-bottom: 15px;
        font-size: 30px;
        font-weight: bolder;
        line-height: 75px;
        color: #ff1515;
        font-weight: 600;
        text-align: center;
      }
    }

    .process_content {
      width: 80%;
      min-height: 920px;
      padding: 20px 16px;
      margin: 0 auto;


      .bottom-span {

        display: block;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }

    }
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
</style>

