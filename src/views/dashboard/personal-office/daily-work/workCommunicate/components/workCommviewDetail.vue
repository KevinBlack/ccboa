<!--
 * @Author: wy
 * @Date: 2020-07-17 15:50:38
 * @LastEditTime: 2021-02-26 18:11:31
 * @LastEditors: Please set LastEditors
 * @Description: 详情页
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\components\workCommviewDetail.vue
--> 
<template>
  <div class="workCommviewDetail">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button v-show="isReply" type="primary" @click="reply()">回复</el-button>
      <el-button v-show="isEdit" type="primary" @click="edit()">编辑</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">工作交流单</div>
      <div>
        <el-row :gutter="5" v-for="(item,index) in orgIndex" :key="index">
          <el-col :span="8">
            <div class="grid-content bg-purple normalFont itemLabel">{{item.label}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item.prop]}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="8">
            <div id="left" class="grid-content bg-purple normalFont itemLabel">回复信息</div>
          </el-col>
          <el-col  :span="16">
            <div id="right" class="grid-content bg-purple-light normalFont">
              <div v-for="(item,index) in messageArr" :key="index" >
                  <div class="message">{{item.messageHf}}</div>
                  <div class="messageName">{{item.msgDeptName}}     &nbsp;&nbsp;&nbsp;&nbsp;     {{item.msgUserName}}</div>
                  <div class="messageDate">{{item.messageDate}}</div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-form label-width="0px" style="margin-top: 15px;">
          <el-form-item>
            <el-col :span="23">
              <upload-file-ts
                :uploadConfig="uploadConfig"
                @fileList="fileList"
                v-if="!isSave"
              ></upload-file-ts>
              <div class="tree_w" v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                <el-scrollbar>
                  <div
                    v-for="(item,index) in  formData.attchmentFileInfo"
                    :key="item.id"
                    class="comp_list"
                  >
                    <template>
                      <div class="command_file">
                        <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name">{{item.createTime}}</span>
                        <div class="btns">
                          <el-button
                            type="primary"
                            size="mini"
                            @click.native="upRow(index)"
                            v-if="formData.attchmentFileInfo.length>1&&!isSave"
                            :disabled="index==0"
                            round
                          >上移</el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click.native="downRow(index)"
                            v-if="formData.attchmentFileInfo.length>1&&!isSave"
                            :disabled="index==formData.attchmentFileInfo.length-1"
                            round
                          >下移</el-button>
                          <el-button
                            type="warning"
                            size="mini"
                            v-if="!isSave"
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
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="回复内容"
      :visible.sync="replyDialogVisible"
      width="80%"
      :close-on-click-modal="false"
    >
      <el-input type="textarea" :rows="5" v-model="messageHf"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="replyDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="replyDialogSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
  import uploadFileTs from "components/uploadFile/uploadFileTs"
export default {
  name: 'workCommviewDetail',
  components: {
    uploadFileTs
  },
  props: {},
  data () {
    return {
      isReply:true,
      isEdit: true,
      isSave:true,
      kongge: "     ",
      uploadConfig: {
        formId: "workForm",
        filesHas: [],
        isSpecial: 0,
        id: ''
      },
      formData: {},
      orgIndexData: {},
      orgIndex: [
        {
          label: '主题',
          prop: 'title'
        },
        {
          label: '内容',
          prop: 'content'
        },
        {
          label: '发布人',
          prop: 'draftUserName'
        },
        {
          label: '接收人',
          prop: 'receivePersonName'
        },
        // {
        //   label: '回复信息',
        //   prop: 'messageHf',
        //   type: 'textarea',
        //   config: { rows: 4 }
        // }
      ],
      messageArr:[],
      //回复弹窗
      id: "",
      messageHf: "",
      replyDialogVisible: false
    }
  },
  computed: {},
  methods: {
    loading(){
      const row = this.$route.query.row
      console.log(this.$route.query.row,'000');
      this.id = row.id
      if (row.replyType === '0') {
        this.isReply = false
      }
      if (row.editType === '0') {
        this.isEdit = false
      }
      if (row.isSave === '1') {
        this.$api.dailyWork.viewWorkDetail(
            {id:row.id}
        ).then(res => {
            this.orgIndexData = res.data
            // this.orgIndexData.title = res.data.title
            // this.orgIndexData.content = res.data.content
            this.orgIndexData.draftUserName = res.data.draftUserName
            
            this.messageArr = res.data.userMessages
            this.reHeight()
            this.getFileList()
            let receiveArr = []
            res.data.addressPeople.map(item=>{
              receiveArr.push(item.receivePersonName)
            })
            this.$set(this.orgIndexData, 'receivePersonName', receiveArr.join(","))
        })
      }else if(row.isSave === '0'){
        this.$api.dailyWork.viewWorkDetail0(
            {id:row.id}
        ).then(res => {
            this.orgIndexData = res.data
            this.orgIndexData.draftUserName = res.data.draftUserName
            
            this.messageArr = res.data.userMessages
            this.reHeight()
            this.getFileList()
            let receiveArr = []
            res.data.addressPeople.map(item=>{
              receiveArr.push(item.receivePersonName)
            })
            this.$set(this.orgIndexData, 'receivePersonName', receiveArr.join(","))
        })
      }
    },
    //关闭
    close () {
      this.$router.push(
        {
          path: '/dashboard/personalOffice/dailyWork/workCommunicate'
        }
      )
    },
    //回复
    reply () {
      this.replyDialogVisible = true
      this.messageHf = ""
    },
    // 回复确定
    replyDialogSure(){
      this.$api.dailyWork.replyWorkSure(
          {id: this.id, messageHf: this.messageHf}
      ).then(res => {
        console.log(res,'res');
          if(res.code=="SUCCESS"){
              this.$message({
                  message: '回复成功',
                  type: 'success'
              });
              this.replyDialogVisible = false
              this.loading()
          }
      })
    },
    //编辑
    edit () {
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/vDWorkCommForm',
        query: {
          initData:this.orgIndexData,row:this.$route.query.row
        }
      })
    },
    reHeight(){
        setTimeout(() => {
          $("#left").css("height",$("#right").height())
        }, 100);
    },
    //附件上传
    fileList(files) {
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
          this.uploadConfig.filesHas = files
          this.formData.attachId = this.formData.attachs.join(',')
          this.$forceUpdate();
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
        this.formData.attchmentFileInfo = res.data;
        this.$forceUpdate();
        this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
      });
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      let sort1 = this.formData.attchmentFileInfo[n].sort;
      let sort2 = this.formData.attchmentFileInfo[n - 1].sort;
      if (sort1 == sort2) {
        sort1 = Number(n) + 1;
        sort2 = n;
      }
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n - 1].id,
          sort: sort1
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: sort2
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n - 1
      ];
      this.formData.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    downRow(n) {
      let midObj;
      let attachSort = [];
      let sort1 = this.formData.attchmentFileInfo[n].sort;
      let sort2 = this.formData.attchmentFileInfo[n + 1].sort;
      if (sort1 == sort2) {
        sort1 = Number(n) + 1;
        sort2 = Number(n) + 2;
      }
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n + 1].id,
          sort: sort1
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: sort2
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n + 1
      ];
      this.formData.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },              //起草保存文件
    createFile(){
        if (this.uploadConfig.filesHas.length>0) {
          this.$api.setSysConfig.saveFile(
              {
                  id: this.id,
                  fileId:this.formData.attachId,
                  fileType:'0'
              }).then(res => {

          })
        }
      },
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$api.setSysConfig.deleFile(
           {  id: id}
          )
          .then(res => {
            if (res) {
              if (res && res.code=="SUCCESS") {
                this.$message({
                  type: "success",
                  showClose: true,
                  message: "删除成功"
                });
                this.formData.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
               this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败"
                });
              }
            }
          });
      });
    },
    downFile(file) {
      // debugger
      let bank_doDownloadFile = { function: "doDownloadFile" };
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
              downLoadFileReName(
                (this.$post.getEnvState() ? location.origin : "") +
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
                duration: 500
              });
            }
          }
        });
    }
  },
  activated () {
  },
  mounted () {
  },
  created () {
    this.loading()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.workCommviewDetail {
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 35px;
      font-size: 30px;
      line-height: 55px;
      color: #3b85f0;
      font-weight: 600;
      text-align: center;
    }
    .el-row {
      margin-bottom: 3px;
      .el-row:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #d8e8f4;
    }
    .bg-purple {
      background: #e5f0fc;
    }
    .bg-purple-light {
      background: #e5f0fc;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .itemLabel {
      color: #3b85f0;
    }
    .titleFont {
      font-size: 17px;
      text-align: center;
      line-height: 43px;
      font-weight: 600;
    }
    .normalFont {
      padding-left: 34px;
      font-size: 14px;
      text-align: left;
      line-height: 36px;
    }
    .messageName{
      text-align: right;
      margin-right: 20px;
      line-height: 28px;
    }
    .messageDate{
      text-align: right;
      margin-right: 20px;
      line-height: 28px;
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
}

</style>