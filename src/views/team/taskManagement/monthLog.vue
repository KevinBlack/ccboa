<template>
  <div>
    <!-- 月报 -->
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left" @click="closeHandler = true"></i>
          {{title}}列表
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
          <el-button plain @click="preserve" v-preventClick v-if="formData.edit">保存</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{title}}</h3>
    </header>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <el-form
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:65%;margin:0 auto;border:1px solid #BFBFBF;;padding:30px;margin-bottom:80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属团队" ref="teamname" clearable prop="teamname">
            <el-select
              v-model="formData.teamname"
              placeholder="请选择团队"
              style="width:350px"
              :disabled="!formData.edit"
              @change="getPageInfo"
            >
              <el-option
                v-for="item in selectInfo"
                :key="item.id"
                :label="item.teamName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布日期">
            <el-input disabled v-model="formData.createTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始时间">
            <el-date-picker
              type="date"
              :disabled="!formData.edit"
              placeholder="选择时间"
              v-model="formData.startTime"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间">
            <el-date-picker
              type="date"
              :disabled="!formData.edit"
              placeholder="选择时间"
              value-format="yyyy-MM-dd"
              v-model="formData.endTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="本月工作内容" prop="thisMonthWork">
        <el-input :disabled="!formData.edit" type="textarea" placeholder="请输入内容,最多600个文字" v-model="formData.thisMonthWork"></el-input>
      </el-form-item>
      <el-form-item label="本月工作总结" prop="thisMonthSummary">
        <el-input :disabled="!formData.edit" type="textarea" placeholder="请输入内容,最多600个文字" v-model="formData.thisMonthSummary"></el-input>
      </el-form-item>
      <el-form-item label="下月工作计划" prop="nextMonthWork">
        <el-input :disabled="!formData.edit" type="textarea" placeholder="请输入内容,最多600个文字" v-model="formData.nextMonthWork"></el-input>
      </el-form-item>
      <el-form-item label="需帮助与支持" prop="helpSupport">
        <el-input :disabled="!formData.edit" type="textarea" placeholder="请输入内容,最多600个文字" v-model="formData.helpSupport"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input :disabled="!formData.edit" type="textarea" placeholder="请输入内容,最多600个文字" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="createname">
        <el-row  @click="clickNow(1)">
          <uploadFiles
            ref="uploadImgComponent"
            @getDetail="getDetail"
            @preserve="preserve"
            :isPreserve="isPreserve"
            :uploadConfig="uploadImgConfig"
          ></uploadFiles>
          <el-col>
            <div
              class="tree_w"
              v-if="formData.pictureAttachment&&formData.pictureAttachment.length"
            >
              <el-scrollbar>
                <div
                  v-for="(item,index) in  formData.pictureAttachment"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_wrap">
                      <span class="name down" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.rwglfj)">{{item.fileName}}</span>
                      <span class="name">{{item.createrName}}</span>
                      <span class="name">{{item.createTime}}</span>
                      <div class="btns">
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="upRow(index,1)"
                          v-if="formData.pictureAttachment.length>1"
                          :disabled="index==0"
                          round
                        >上移</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downRow(index,1)"
                          v-if="formData.pictureAttachment.length>1"
                          :disabled="index==formData.pictureAttachment.length-1"
                          round
                        >下移</el-button>
                        <el-button
                          type="warning"
                          size="mini"
                          @click.native="deleteRow(index,item.id,1)"
                          :disabled="item.disabled||!formData.edit"
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
                      <span class="name down" @click="downFile(item1,1)">{{item1.fileName}}</span>
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
      <el-form-item label="附件" prop="createname">
        <el-row  @click="clickNow(2)">
          <uploadFiles
            ref="uploadComponent"
            @getDetail="getDetail"
            @preserve="preserve"
            :isPreserve="isPreserve"
            :uploadConfig="uploadConfig"
          ></uploadFiles>
          <el-col>
            <div class="tree_w" v-if="formData.fileAttachment&&formData.fileAttachment.length">
              <el-scrollbar>
                <div
                  v-for="(item,index) in  formData.fileAttachment"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_wrap">
                      <span class="name down" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.rwglfj)">{{item.fileName}}</span>
                      <span class="name">{{item.createrName}}</span>
                      <span class="name">{{item.createTime}}</span>
                      <div class="btns">
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="upRow(index,2)"
                          v-if="formData.fileAttachment.length>1"
                          :disabled="index==0"
                          round
                        >上移</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downRow(index,2)"
                          v-if="formData.fileAttachment.length>1"
                          :disabled="index==formData.fileAttachment.length-1"
                          round
                        >下移</el-button>
                        <el-button
                          type="warning"
                          size="mini"
                          @click.native="deleteRow(index,item.id,2)"
                          :disabled="item.disabled||!formData.edit"
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
                      <span class="name down" @click="downFile(item1,2)">{{item1.fileName}}</span>
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
      <el-form-item label="发布范围" prop="createname">
        <el-switch
          style="display: block"
          v-model="checkAll"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="全选"
          inactive-text="取消全选"
          @change="handleCheckAll"
        ></el-switch>
      </el-form-item>
      <el-checkbox-group v-model="sharePer" @change="handleCheckedSharePerson">
        <el-checkbox
          v-for="person in persons"
          :disabled="!formData.edit"
          :label="person"
          :key="person"
        >{{person}}</el-checkbox>
      </el-checkbox-group>
    </el-form>
  </div>
</template>

<script>
import uploadFiles from "../../../components/uploadFile/uploadFileFw";
import viewDraft from "@/minixs/viewDraft";
import closeMessage from 'components/closeMessage/index';
export default {
  components: {
    uploadFiles,
    closeMessage
  },
  mixins: [viewDraft],
  data() {
    return {
      closeHandler:false,
      fileTypeNow:1,//1为图片 2为附件
      isPreserve: false,
      fkfj: [], //反馈附件
      fkfjList: [], //反馈附件
      /**111 */
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        width: "auto",
        isSpecial: 4,
        formId: "formFile",
      },
      uploadImgConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        width: "auto",
        isSpecial: 3,
        formId: "formImg",
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
      title: "",
      formData: {
        teamname: "", //团队名称
        createTime: "",
        createUserId: "",
        createUserName: "",
        endTime: "",
        helpSupport: "",
        nextMonthWork: "",
        photoId: "",
        remark: "",
        shareId: "",
        startTime: "",
        thisMonthSummary: "",
        thisMonthWork: "",
        edit: true,
        attachSort: []
      },
      shareId: [],
      fileList: [],
      checkAll: false,
      value: "",
      rules: {
        teamname: [
          { required: true, message: "请选择团队", trigger: "change" }
        ],
        thisMonthWork: [
          { message: "字数超过最大限制", min: 0, max: 600, trigger: "blur" }
        ],
        thisMonthSummary: [
          { message: "字数超过最大限制", min: 0, max: 600, trigger: "blur" }
        ],
        nextMonthWork: [
          { message: "字数超过最大限制", min: 0, max: 600, trigger: "blur" }
        ],
        helpSupport: [
          { message: "字数超过最大限制", min: 0, max: 600, trigger: "blur" }
        ],
        remark: [
          { message: "字数超过最大限制", min: 0, max: 600, trigger: "blur" }
        ]
      },
      //下拉框
      bank_getUser: {
        function: "findByUser"
      },
      bank_monthinfo: {
        function: "taskMonthly_getDetails",
        id: ""
      },
      bank_save: {
        function: "taskMonthly_save",
        teamid: "",
        teamname: ""
      },
      share_parmas: {
        function: "share",
        teamid: ""
      },
      sharePerson: "",
      persons: [],
      initShareArr: [],
      selectInfo: [],
      attachSortImg: [],
      attachSortFile: [],
      sharePer: [],
    };
  },
  created() {
    this.bank_monthinfo.id = this.$route.query.id ? this.$route.query.id : "";
    this.title = sessionStorage.getItem("logTitle");
    this.uploadConfig.code = this.$businessCode.rwglfj;
    this.uploadConfig.newcode =  this.$businessCode.rwglfj;
    this.uploadImgConfig.code = this.$businessCode.rwglfj;
    this.getSelectData();
    if (this.bank_monthinfo.id != "") {
      this.uploadConfig.id = this.bank_monthinfo.id;
      this.uploadImgConfig.id = this.bank_monthinfo.id;
      this.isPreserve = true;
      this.getInitData();
    } else {
      this.getSelectData();
    }
  },
  methods: {
    // 关闭
    async btnCloseHandler(val){
      if(val == 1){
        window.close();
      }else if(val == 2){
        await this.preserve();
        window.location.href = "about:blank";
        window.opener.location.reload();window.close();
      }else{
        this.closeHandler = false
      }
    },
     //正文跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id:this.$route.query.id,
          zhengWenState: 0,
          JYcode: this.$businessCode.rwglfj,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : ""
        }
      });
      window.open(data.href, "_blank");
    },
    clickNow(n){
      this.fileTypeNow = n;
    },
    //滚动聚焦
    scrollIntoForm() {
      let that = this;
      let flag = true;
      this.$refs.ruleForm.validate((valid, object) => {
        if (!valid) {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            flag = false;
            break;
          }
        }
      });
      return flag;
    },
    getDetail() {
      this.getInitData();
    },
    //初始化数据
    getInitData() {
      this.$post
        .postData(
          "taskMonthly_getDetails",
          JSON.stringify(this.bank_monthinfo),
          this.$businessCode.rwgl
        )
        .then(res => {
          if (res && res.success) {
            this.formData = res.data;
            this.formData.attachSort = [];
            this.getSelectData();
            this.$set(this.uploadConfig,"zlwhCheck",!this.formData.edit)
            this.$set(this.uploadImgConfig,"zlwhCheck",!this.formData.edit)
            this.initShareArr = this.formData.shareId.split(",");
            this.sharePer = eval(res.data.shareId);
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
    },
    //切换所属
    getPageInfo(value) {
      // console.log(value)
      let obj = {};
      obj = this.selectInfo.find(item => {
        return item.id === value;
      });
      // console.log(obj)
      this.formData.teamname = obj.teamName;
      this.bank_save.teamname = obj.teamName;
      this.bank_save.teamid = obj.id;
      this.formData.teamid = obj.id;
      if (this.bank_save.teamname != "") {
        this.getShare(this.bank_save.teamid);
      }
    },

    //下拉框数据
    getSelectData() {
      this.$post
        .postData(
          "findByUser",
          JSON.stringify(this.bank_getUser),
          this.$businessCode.tdgl
        )
        .then(res => {
          this.selectInfo = res.data || [];
          this.getShare(this.selectInfo[0].id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getShare(id) {
      let that = this;
      if (this.bank_save.teamid != "") {
        this.share_parmas.teamid = this.bank_save.teamid;
      } else {
        this.share_parmas.teamid = id;
      }
      this.$post
        .postData(
          "share",
          JSON.stringify(this.share_parmas),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          // let showCheckArr = [];
          // this.persons = res.data.teamUser || [];
          // this.initShareArr.forEach(item1 => {
          //   this.persons.forEach(item2 => {
          //     if (item1 == item2.userId) {
          //       showCheckArr.push(item2);
          //     }
          //   });
          // });
          // this.shareId = showCheckArr;
          this.personsList = res.data.teamUser;
          this.personsList.forEach(item => {
            this.persons.push(item.userName)
          });
          this.persons = Array.from(new Set(this.persons))
          that.checkAll = that.sharePer.length === that.personsList.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCheckAll() {
      if (this.checkAll) {
        this.sharePer = this.shareId = this.persons;
      } else {
        this.sharePer = this.shareId = [];
      }
    },
    handleCheckedSharePerson(value) {
      let shareArr = [];
      // this.shareId.forEach(item => {
      //   shareArr.push(item.userId);
      // });
      // this.checkAll = this.shareId.length === this.persons.length;
      // this.formData.shareId = shareArr.join(",");
      this.personsList.forEach(item => {
        this.sharePer.forEach(m => {
          if (m==item.userName) {
            shareArr.push(item.userId);
          }
        });
      });
      this.checkAll = this.sharePer.length === this.personsList.length;
    },
    //返回上一级
    goBack() {
      // this.$router.go(-1);
      window.location.href = "about:blank";
      window.opener.location.reload();
      window.close();
    },
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.goBack();
        })
        .catch(() => {});
    },
    //保存
    preserve(type,fileTypeNow) {
      let startTime = Date.parse(this.formData.startTime.replace(/\-/g, "/"));
      let endTime = Date.parse(this.formData.endTime.replace(/\-/g, "/"));
      if (endTime < startTime) {
        this.$message({
          showClose: true,
          message: "起始日期不能大于结束日期",
          type: "warning"
        });
        return;
      }
      var obj = Object.assign(this.bank_save, this.formData);
       obj.shareId = this.sharePer;
      if (!this.scrollIntoForm()) {
        return;
      }
      console.log(obj);
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$post
            .postData(
              "taskMonthly_save",
              JSON.stringify(obj),
              this.$businessCode.rwgl
            )
            .then(res => {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "保存成功",
                  duration: 2000
                });
                if (res.data.id) {
                  this.isPreserve = true;
                }

                if (type === "uploadfile") {
                  this.uploadConfig.id = res.data.id;
                  this.uploadImgConfig.id = res.data.id;
                  this.bank_monthinfo.id = res.data.id;
                  this.isPreserve = true;
                  if(fileTypeNow == 2){
                    this.$refs.uploadComponent.uploadFileNow();
                  }else{
                     this.$refs.uploadImgComponent.uploadFileNow();
                  }
                }

                this.$router.replace({
                  path: "/monthLog",
                  query: {
                    id: res.data.id
                  }
                });
                this.getInitData();
                // setTimeout(()=>{
                //   this.goBack()
                // },2000)
              }
            })
            .catch(erro => {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: "保存失败",
                duration: 1000
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    upRow(n, type) {
      if (type == 1) {
        let midObj;
        this.attachSortImg.push(
          {
            id: this.formData.pictureAttachment[n - 1].id,
            sort: this.formData.pictureAttachment[n].sort
          },
          {
            id: this.formData.pictureAttachment[n].id,
            sort: this.formData.pictureAttachment[n - 1].sort
          }
        );
        midObj = this.formData.pictureAttachment[n];
        this.formData.pictureAttachment[n] = this.formData.pictureAttachment[
          n - 1
        ];
        this.formData.pictureAttachment[n - 1] = midObj;
        this.$forceUpdate();
      } else {
        let midObj;
        this.attachSortFile.push(
          {
            id: this.formData.fileAttachment[n - 1].id,
            sort: this.formData.fileAttachment[n].sort
          },
          {
            id: this.formData.fileAttachment[n].id,
            sort: this.formData.fileAttachment[n - 1].sort
          }
        );
        midObj = this.formData.fileAttachment[n];
        this.formData.fileAttachment[n] = this.formData.fileAttachment[n - 1];
        this.formData.fileAttachment[n - 1] = midObj;
        this.$forceUpdate();
      }
      this.formData.attachSort = this.attachSortImg.concat(this.attachSortFile);
    },
    downRow(n, type) {
      if (type == 1) {
        let midObj;
        this.attachSortImg.push(
          {
            id: this.formData.pictureAttachment[n + 1].id,
            sort: this.formData.pictureAttachment[n].sort
          },
          {
            id: this.formData.pictureAttachment[n].id,
            sort: this.formData.pictureAttachment[n + 1].sort
          }
        );
        midObj = this.formData.pictureAttachment[n];
        this.formData.pictureAttachment[n] = this.formData.pictureAttachment[
          n + 1
        ];
        this.formData.pictureAttachment[n + 1] = midObj;
        this.$forceUpdate();
      } else {
        let midObj;
        this.attachSortFile.push(
          {
            id: this.formData.fileAttachment[n + 1].id,
            sort: this.formData.fileAttachment[n].sort
          },
          {
            id: this.formData.fileAttachment[n].id,
            sort: this.formData.fileAttachment[n + 1].sort
          }
        );
        midObj = this.formData.fileAttachment[n];
        this.formData.fileAttachment[n] = this.formData.fileAttachment[n + 1];
        this.formData.fileAttachment[n + 1] = midObj;
        this.$forceUpdate();
      }
      this.formData.attachSort = this.attachSortImg.concat(this.attachSortFile);
    },
    deleteRow(n, id, type) {
      this.bank_deleteFileById.id = id;
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.$businessCode.rwglfj
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
              if (type == 1) {
                this.formData.pictureAttachment.splice(n, 1);
                this.uploadConfig.filesHas = this.formData.pictureAttachment;
              } else {
                this.formData.fileAttachment.splice(n, 1);
                this.uploadConfig.filesHas = this.formData.fileAttachment;
              }
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
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.rwglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
             downLoadFileReName(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName +
                    "&openFile=true",
                  res.fileName
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
  }
};
</script>

<style lang="less" scoped>
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
  display: block;
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
/deep/.el-textarea {
  height: 140px;
  .el-textarea__inner {
    height: 100%;
  }
}
.update {
  display: flex;
  /deep/ .el-upload__tip {
    margin-top: 0;
  }
}
/deep/.el-upload-list {
  height: 100px;
  border: 1px solid #eee;
  background: #fff;
  margin-top: 10px;
  overflow-y: scroll;
}
/deep/.el-switch {
  line-height: 28px;
  .el-switch__core {
    margin-top: 8px;
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