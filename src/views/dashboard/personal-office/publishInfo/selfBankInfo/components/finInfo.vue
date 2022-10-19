<template>
  <div class="selfBankInfoPub">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button type="primary" @click="backData()" v-if="isBack">收回</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">本行信息发布</div>
      <div class="orgInfoTableBody">
        <el-form ref="elForm" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="17">
              <el-form-item label="正文标题">
                <el-input v-model="formData.title" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="17">
              <el-form-item label="拟稿人">
                <el-input v-model="formData.draftUser" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="17">
              <el-form-item label="正文内容">
                <el-input type="textarea" :autosize="{minRows:5,maxRows:15}"
                          placeholder="填写不可多于500字"
                          maxlength="500"
                          show-word-limit
                          v-model="formData.htmlBody"
                          :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="审核意见">
              <el-row v-for="item in formData.opinionCheckList" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="16">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="true"
                        :autosize="{minRows:5,maxRows:15}"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.leaderName}}</span>{{item.createTime}}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="附件">
              <el-col :span="16">
<!--                <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>-->
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
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
    <!--    人员树-->
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :suboffenUse="suboffenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
  </div>
</template>
<script type="text/ecmascript-6">
    import mForm from 'components/form/mForm'
    import selectPerson from 'components/tree/tree-fawen'
    import uploadFileTs from "components/uploadFile/uploadFileTs";
    export default {
        name: 'selfBankInfoPub',
        components: {
            mForm,
            selectPerson,
            uploadFileTs
        },
        data() {
            return {
                uploadConfig: {
                    formId: "pubInfo",
                    filesHas: [],
                },
                suboffenUse: true, //是否可设置常用
                isSave: true,
                id: "",
                isNeedCancel: '',
                formCfg: [
                    {
                        label: '正文标题',
                        prop: 'title',
                        type: 'input',
                        width: '70%'
                    }, {
                        label: '拟稿人',
                        prop: 'draftUser',
                        type: 'input',
                        width: '70%',
                        disabled: true
                    }
                    , {
                        label: '正文内容',
                        prop: 'htmlBody',
                        type: 'textarea',
                        width: '70%'
                    },

                    {
                        label: '审核意见',
                        prop: 'opinionCheck',
                        type: 'textarea',
                        width: '70%'
                    },

                ],
                formData: {},
                dialogType: "next",
                checkIds: [], //选中id列表
                checkData: [], //选中数据
                dialogState: false,//显示隐藏
                singelCheckF: true, // 单选true 多选为false
                dialogTypeNow: "next",
                treeData: [{name: "中国建设银行", id: '007'}],
                isEditBtn:false,
                isBack:false,

            }
        },
        computed: {},
        methods: {
            //收回
            backData(){
                this.$api.messPub.messBack(
                    {id: this.id}
                ).then(res => {
                    if(res.code=='SUCCESS'){
                        this.$message({
                            type:'success',
                            message:'收回成功'
                        })
                        // this.$router.back()
                        this.$intent.closeWindow(this);

                    }
                })
            },
            //关闭
            close() {
                // this.$router.go(-1)
              this.$intent.closeWindow(this);
            },

            //获取拟稿人
            messOption() {
                this.$api.messPub.diaableBankMess(
                    {}
                ).then(res => {
                    this.$set(this.formData, 'draftUser', res.data.draftUser)
                    this.formData.draftUserId=res.data.draftUserId
                })
            },
            //获取详情信息
            queryDeal() {
                this.$api.messPub.BankMessDeal(
                    {id: this.id}
                ).then(res => {
                    this.getFileList()
                    if (
                      res.data.isReadFlag == "0"
                    ) {
                      this.isBack = true;
                    } else{
                      this.isBack = false;
                    }
                    this.formData = res.data
                    this.$nextTick(()=>{
                        this.$set(this.formData,'opinionCheckList',res.opinionCheckList)
                    })
                })
            },
            //完成并发送
            finAndSend() {
                if(this.id){
                    this.$api.messPub.alterBankMess(
                        {
                            ...this.formData
                        }
                    ).then(res => {
                        // this.id=res.id
                        this.choosePer()
                    })
                }else{
                    this.$api.messPub.createBankMess(
                        {
                            ...this.formData
                        }
                    ).then(res => {
                        this.id=res.id
                        this.choosePer()
                    })
                }
            },
            //选择人员树
            choosePer(){
                this.$api.messPub.BankMessTree(
                    {
                        ccbToken: localStorage.getItem('st'),
                        id: this.id
                    }
                ).then(res => {
                    this.dialogState = true
                })
            },
            //选人成功之后操作
            showCompDialog(data, status, type, params, dtype) {
                this.dialogState = false;
                console.log('data', data, 'status', status, 'type', type, 'params', params, 'dtype', dtype);
                if (status) {
                    let chooseDataName = []
                    let chooseDataId = []
                    data && data.map(item => {
                        chooseDataName.push(item.name)
                        chooseDataId.push(item.id)
                    })
                    this.formData.currentUser = chooseDataName.join(",")
                    this.formData.currentUserId = chooseDataId.join(",")
                    this.formData.handleButton='完成并发送'
                    if (this.id) {
                        this.formData.id = this.id
                        this.$api.messPub.alterFinChoosePer(
                            this.formData
                        ).then(res => {
                            if (res.code == "SUCCESS") {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                            }
                            this.isSave = true
                            // this.$router.push('/dashboard/personalOffice/publishInfo/selfBankInfo')
                           this.$intent.closeWindow(this);

                        })
                    } else {
                        this.$api.messPub.finChoosePer(
                            this.formData
                        ).then(res => {
                            if (res.code == "SUCCESS") {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                            }
                            this.isSave = true
                            // this.$router.push('/dashboard/personalOffice/publishInfo/selfBankInfo')
                           this.$intent.closeWindow(this);
                        })
                    }

                }
            },
            edirorInfo() {
                this.isSave = false
            },
            //退回拟稿人
            backInfo() {
                this.$api.messPub.backDraftUser(
                    {
                        id: this.id
                    }
                ).then(res => {
                    this.$message({
                        type: 'successs',
                        message: '退回成功'
                    })
                })
            },
            //发布信息
            releaseInfo() {
                this.formData.handleButton='发布'
                this.$api.messPub.alterFinChoosePer(
                    {
                        ...this.formData
                    }
                ).then(res => {
                    this.$message({
                        type: 'success',
                        message: '发布成功'
                    })
                    // this.$router.back()
                 this.$intent.closeWindow(this);
                })
            },

            //附件上传
            //附件块
            fileList(files) {
                if (this.formData.attchmentFileInfo) {
                    this.formData.attchmentFileInfo.push(files)
                } else {
                    this.formData.attchmentFileInfo = files
                }
                let fileid = []
                files.forEach(item => {
                    fileid.push(item.id)
                })
                this.formData.attachid = fileid.join(',')
                this.$forceUpdate();
            },
            getFileList() {
                this.$api.setSysConfig.getTextemList(
                    {
                        id: this.id,
                        // fileType:'0'
                    }).then(res => {
                    this.$nextTick(()=>{
                        this.$set(this.formData,'attchmentFileInfo',res.data)
                        console.log("0000000000000",this.formData.attchmentFileInfo)
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
        created() {
            this.id = this.$route.query.id
            if (this.id) {
                this.isEditBtn=true
                this.isSave = true
                this.queryDeal()
            } else {
                this.isSave = false
                this.isEditBtn=false
                this.messOption()
            }


        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .adviceInfo {
    position: absolute;
    width: 50%;
    left: 10%;
    bottom: 0;
    text-align: right;
    color: #606266;
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
  .selfBankInfoPub {
    .orgInfoTable {
      padding: 0px 70px;

      .orgInfoTitle {
        margin-bottom: 35px;
        font-size: 30px;
        line-height: 55px;
        color: #f5150b;
        font-weight: 600;
        text-align: center;
      }

      .orgInfoTableBody {
        margin-left: 8%;

        .tips {
          padding-left: 20%;
          font-size: 12px;
          color: #f5150b;
        }

        .changeBtn {
          padding-left: 20%;
          margin-top: 30px;
        }
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
