<template>
  <div>
    <el-container style=" border: 1px solid #eee">
      <el-aside width="280px" height="500px" style="border-right:1px solid #eee">
        <el-button
          type="primary"
          style="display:block;margin:10px auto;"
          icon="el-icon-circle-plus-outline"
          @click="addwork"
        >新增工作记录</el-button>

        <el-tree
          style="margin-top:20px"
          :data="data"
          ref="comptree"
          node-key="teamid"
          :props="defaultProps"
          :default-expanded-keys="[1]"
          @node-click="checkNode"
        ></el-tree>
      </el-aside>
      <el-container>
        <el-header
          style="text-align: right; font-size: 12px;display:flex;justify-content: space-between;"
        >
          <div>
            <el-button
              type="primary"
              icon="el-icon-document"
              v-show="showbtn"
              @click="preserve('save')"
              :disabled="isDisabled"
              v-preventClick
            >保存</el-button>
            <el-button
              type="primary"
              icon="el-icon-share"
              v-show="isShow"
              @click="share"
              :disabled="isDisabled"
              v-preventClick
            >共享</el-button>
            <!-- <el-button type="primary" icon="el-icon-delete" v-show="showbtn">删除</el-button> -->
            <el-button
              type="primary"
              icon="el-icon-delete"
              v-show="shareShow"
              @click="cleanDel"
              v-preventClick
            >彻底删除</el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              v-show="shareShow"
              @click="recovery"
              v-preventClick
            >恢复</el-button>
          </div>
          <div class="search">
            <el-form :model="searchParams" label-width="100px" class="demo-ruleForm mt20">
              <el-form-item label="页面">
                <el-input v-model="searchParams.title"></el-input>
              </el-form-item>
              <el-form-item label="创建人" v-show="showinput">
                <el-input v-model="createName"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="searchList">搜索</el-button>
          </div>
        </el-header>
        <el-main style="display:flex">
          <div class="left">
            <div class="top" v-if="parentName=='我创建的'? false:true">
              <div class="top-a">
                <span>创建人:</span>
                <span>{{taskCreateName}}</span>
              </div>
              <div class="top-a">
                <span>创建时间:</span>
                <span>{{taskCreateTime}}</span>
              </div>
            </div>
            <el-form :model="saveParams" style="width:95%;margin:0 auto;padding:0px" ref="ruleFrom">
              <el-form-item label="标题" prop="title">
                <el-input v-model="saveParams.title" :disabled="toDisabled" style="width:80%"></el-input>
              </el-form-item>
              <el-form-item label="内容" prop="content">
               <UE :config="config" id="ue1" ref="ue" :disabled="toDisabled"></UE>

                <!-- <el-input v-model="saveParams.content" :disabled="toDisabled" style="width:80%"></el-input> -->
              </el-form-item>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="附件">
                    <el-row>
                      <!-- <loadAccessory></loadAccessory> -->
                      <uploadFiles
                        ref="uploadComponent"
                        @preserve="preserve"
                        @search="initForSearch"
                        :uploadConfig="uploadConfig"
                        :isPreserve="isPreserve"
                        v-if="!toDisabled"
                      ></uploadFiles>
                      <el-col>
                        <div class="tree_w" v-if="uploadFileList&&uploadFileList.length">
                          <el-scrollbar>
                            <div
                              v-for="(item,index) in  uploadFileList"
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
                                      @click.native="upRow(index)"
                                      v-if="uploadFileList.length>1"
                                      :disabled="index==0"
                                      round
                                    >上移</el-button>
                                    <el-button
                                      type="primary"
                                      size="mini"
                                      @click.native="downRow(index)"
                                      v-if="uploadFileList.length>1"
                                      :disabled="index==uploadFileList.length-1"
                                      round
                                    >下移</el-button>
                                    <el-button
                                      type="warning"
                                      size="mini"
                                      @click.native="deleteRow(index,item.id)"
                                      :disabled="readOnlys"
                                      v-if="!readOnlys"
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
                                  <span
                                    class="name down"
                                    @click="downFile(item1)"
                                  >{{item1.fileName}}</span>
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
              <!-- <el-form-item label="消息交流" v-if="delShow">
                <el-card class="box-card">
                  <div v-for="item in msglist" :key="item.id" class="text item">
                    <span>{{item.content}}</span>
                    <div>
                      <span class="spanname">{{item.createname}}</span>
                      <span>{{item.updateTime}}</span>
                    </div>
                  </div>
                </el-card>
                <el-input v-model="releaseParams.content" style="width:93%;" class="msginput"></el-input>
              </el-form-item>
              <el-button type="primary" @click="release" v-if="delShow" class="releasebtn">发布</el-button> -->
            </el-form>
          </div>
          <div class="right">
            <el-button
              v-show="shownewbtn"
              type="primary"
              style="display:block;margin:10px auto 0;"
              icon="el-icon-circle-plus-outline"
              :disabled="isnewDisabled"
              @click="newCreate"
            >新建页面</el-button>
            <ul>
              <li
                class="list"
                v-for="(item,index) in workList"
                :key="item.id"
                @click="taskdetail(index,item.id)"
              >
                <el-tooltip class="item" style="width: 70%" effect="dark" :content="item.title" placement="right">
                  <span class="titlename" :class="{'active':isActive==index}">{{item.title}}</span>
                </el-tooltip>
                <el-button
                  v-if="item.id ? showDel : !showDel"
                  icon="el-icon-delete"
                  @click="delwork(item.id)"
                ></el-button>
              </li>
            </ul>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 弹窗 -->
    <taskDialog
      ref="dialog"
      :title="btntitle"
      :tasklist="teamtasklist"
      v-if="dialogShow"
      @dialogClose="dialogClose"
    ></taskDialog>
    <!-- 共享弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="isdialog"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="shareParams" label-width="80px">
        <el-form-item label="共享内容" prop="taskWorkRecordids">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedRecord" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in TaskWorkRecord" :label="item" :key="item.id">{{item.title}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="共享范围" prop="shareRangeids">
          <el-checkbox :indeterminate="isCheckall" v-model="checkAllto" @change="CheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkeduser" @change="handleChange">
            <el-checkbox v-for="item in teamUser" :label="item" :key="item.userId">{{item.userName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="共享权限" prop="readOnlys">
          <el-radio-group v-model="saveShareParams.readOnlys">
            <el-radio :label="0">只读</el-radio>
            <el-radio :label="1">可编辑</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelShare">取 消</el-button>
        <el-button type="primary" @click="saveShare">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import viewDraft from "@/minixs/viewDraft";
import taskDialog from "./component/dialog.vue";
import uploadFiles from "../../../components/uploadFile/uploadFileFw";
// import UE from "@/components/editor/ue.vue";
import UE from '@/components/editor/ue.vue';

export default {
  components: {
    taskDialog,
    uploadFiles,
    UE
  },
  data() {
    return {
      readOnlys: false,
      uploadFileList: [],
      isPreserve: false,
      /**111 */
      fkfj: [], //反馈附件
      fkfjList: [], //反馈附件
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        width: "auto",
        isSpecial: 4,
        formId: "formFile",
        callFunction:true
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
      isActive: 0,
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350,
        // toolbars:[['fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'italic', 'underline', 'fontborder', 'strikethrough']]
      },
      ue1: "ue1", // 不同编辑器必须不同的id
      btntitle: "新增工作记录",
      teamtasklist: [],//团队列表
      dialogShow: false,
      search: "",
      paramas: {
        function: "getTeamList"
      },
      getshareParams: {
        function: "getTeamShareList"
      },
      work: {
        function: "TaskWordRecord_getList",
        teamid: ""
      },
      workshare: {
        function: "getWorkShareList",
        teamid: ""
      },
      saveParams: {
        function: "saveWorkRecord",
        id: "",
        teamid: "",
        teamname: "",
        title: "",
        content: "",
        fileids: "",
        filesSort: ""
      },
      detailParams: {
        function: "TaskWordRecord_getDetails",
        taskWorkRecordid: ""
      },
      shareParams: {
        function: "share",
        teamid: "",
        teamname: "",
        shareRangeids: "",
        taskWorkRecordids: "",
        readOnlys: 0
      },
      saveShareParams: {
        function: "saveShare",
        readOnlys: 0,
        teamid: "",
        teamname: "",
        shareRangeids: "",
        taskWorkRecordids: ""
      },
      searchParams: {
        function: "findListAll",
        title: "",
        state: "",
        teamid: ""
      },
      delParams: {
        function: "delete",
        delids: ""
      },
      releaseParams: {
        function: "TaskWordRecord_saveMessage",
        statue: 4,
        taskid: "",
        content: ""
      },
      getMsg: {
        function: "TaskWordRecord_handleDetailList",
        taskWorkRecordid: ""
      },
      checkNode_params: {
        function: "findTeamIsDelete",
        teamId: ""
      },
      delListParams: {
        function: "getTeamList",
        isdelete: 1
      },
      deepDel: {
        function: "thoroughDelete",
        delids: ""
      },
      recoverParams: {
        function: "deleteRecovery",
        delids: ""
      },
      data: [
        {
          teamid: 1,
          teamname: "我创建的",
          typeFather: "user",
          children: []
        },
        {
          teamid: 2,
          teamname: "团队共享",
          typeFather: "user",
          children: []
        },
        {
          teamid: 3,
          teamname: "回收站",
          typeFather: "user",
          children: []
        }
      ],
      defaultProps: {
        children: "children",
        label: "teamname"
      },
      workList: [],
      formData: {
        msg: ""
      },
      fileList: [],
      title: "无标题页",
      createName: "",
      isShow: false,//共享按钮
      showbtn: false,//保存按钮
      showinput: false,//搜索页面栏的显示
      shareShow: false,//彻底删除,恢复按钮
      disabled: false,
      shownewbtn: false,//新建页面按钮
      showDel: false,//右侧页面列表的删除图标
      teamid: "",
      teamname: "",
      isdialog: false,//共享弹窗
      dialogTitle: "",
      checkAll: false,//共享内容全选
      checkAllto: false,//共享范围全选
      isIndeterminate: false,//共享内容选中状态
      isCheckall: false,//共享范围选中状态
      checkedRecord: [],//共享内容数组
      TaskWorkRecord: [],//共享内容数组
      checkeduser: [],//共享范围
      teamUser: [],//共享范围
      radio: "",//共享权限
      parentName: "我创建的",
      taskid: "",//工作记录id
      msglist: [],//消息数组
      isDelete: "",//团队是否关闭
      titleId: undefined,
      isDisabled: false,//保存共享按钮是否禁用
      isnewDisabled: false,//新建页面按钮是否禁用
      toDisabled: true,//表单组件是否禁用
      taskCreateName: "",//创建人
      taskCreateTime: "",//创建时间
      nodeIsDelete: "",//页面是否删除
      delShow: true//消息发布是否显示
    };
  },
  mixins: [viewDraft],
  created() {
    this.getTeamList();
    this.getDelList();
    this.getShareList();
    this.showbtn = true;
    this.isDisabled = true;
    this.isnewDisabled = true;
    this.uploadConfig.code = this.$businessCode.rwglfj;
this.uploadConfig.newcode =  this.$businessCode.rwglfj;
  },
  methods: {
    dialogClose() {
      this.dialogShow = false;
    },

    //选择共享内容
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedRecord = val ? this.TaskWorkRecord : [];
      console.log(this.checkedRecord);
      this.isIndeterminate = false;
      var list = this.checkedRecord.map(el => {
        return el.id;
      });
      this.saveShareParams.taskWorkRecordids = list.join(",");
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      var list1 = value.map(el => {
        return el.id;
      });
      this.saveShareParams.taskWorkRecordids = list1.join(",");
      var checkedCount = value.length;
      this.checkAll = checkedCount === this.TaskWorkRecord.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.TaskWorkRecord.length;
    },
    // 选择共享范围
    CheckAllChange(val) {
      console.log(val);
      this.checkeduser = val ? this.teamUser : [];
      this.isCheckall = false;
      var list2 = this.checkeduser.map(el => {
        return el.userId;
      });
      this.saveShareParams.shareRangeids = list2.join(",");
    },
    handleChange(value) {
      console.log(value);
      var list3 = value.map(el => {
        return el.userId;
      });
      this.saveShareParams.shareRangeids = list3.join(",");
      var checkedCount1 = value.length;
      this.checkAllto = checkedCount1 === this.teamUser.length;
      this.isCheckall =
        checkedCount1 > 0 && checkedCount1 < this.teamUser.length;
    },
    //共享
    share() {
      this.isdialog = true;
      this.dialogTitle = this.teamname;
      this.shareParams.teamid = this.teamid;
      // console.log()
      this.$post
        .postData(
          "share",
          JSON.stringify(this.shareParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.TaskWorkRecord = res.data.TaskWorkRecord.filter(el => el.title);
          console.log(this.TaskWorkRecord);
          this.teamUser = res.data.teamUser;
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveShare() {
      this.saveShareParams.teamid = this.teamid;
      this.saveShareParams.teamname = this.teamname;
      console.log(this.saveShareParams);
      if (this.saveShareParams.taskWorkRecordids == "") {
        this.$message({
          message: "请选择共享内容!",
          type: "warning"
        });
        return;
      }
      if (this.saveShareParams.shareRangeids == "") {
        this.$message({
          message: "请选择共享范围!",
          type: "warning"
        });
        return;
      }
      this.$post
        .postData(
          "saveShare",
          JSON.stringify(this.saveShareParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: "共享成功!",
              type: "success",
              duration: 2000
            });
            this.isdialog = false;
            this.getShareList();
            this.$refs["form"].resetFields();
            this.isIndeterminate = false;
            this.isCheckall = false;
            this.checkedRecord = [];
            this.checkeduser = [];
            this.checkAll = false;
            this.checkAllto = false;
            this.saveShareParams.teamid = "";
            this.saveShareParams.teamname = "";
            this.saveShareParams.shareRangeids = "";
            this.saveShareParams.taskWorkRecordids = "";
          } else {
            this.$message.error("共享失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelShare() {
      console.log(this.saveShareParams);
      this.isIndeterminate = false;
      this.isCheckall = false;
      this.checkedRecord = [];
      this.checkeduser = [];
      this.checkAll = false;
      this.checkAllto = false;
      this.isdialog = false;
      this.saveShareParams.teamid = "";
      this.saveShareParams.teamname = "";
      this.saveShareParams.shareRangeids = "";
      this.saveShareParams.taskWorkRecordids = "";
    },
    // 搜索
    searchList() {
      if (this.parentName == "我创建的") {
        this.searchParams.state = 1;
      } else if (this.parentName == "团队共享") {
        this.searchParams.state = 2;
        this.$set(this.searchParams, "createName", this.createName);
      } else {
        this.searchParams.state = 3;
        this.$set(this.searchParams, "createName", this.createName);
      }
      this.searchParams.teamid = this.teamid;
      console.log(this.searchParams);
      this.$post
        .postData(
          "findListAll",
          JSON.stringify(this.searchParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          // console.log(res);
          this.workList = res.data;
          if (this.workList.length > 0) {
            this.taskdetail(0, this.workList[0].id);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //我创建的团队列表
    getTeamList() {
      this.$post
        .postData(
          "getTeamList",
          JSON.stringify(this.paramas),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.teamtasklist = res.data || [];

          console.log(this.teamtasklist);
          this.data[0].children = res.data || [];
          // console.log(this.data[0].children[0]);
          this.shownewbtn = true;
          this.showDel = true;
          if (this.data[0].children.length > 0) {
            this.$nextTick(() => {
              this.$refs.comptree.setCurrentKey(
                this.data[0].children[0].teamid
              );
            });
            this.teamid = this.data[0].children[0].teamid;
            this.teamname = this.data[0].children[0].teamname;
            this.getTaskWordRecord(this.data[0].children[0].teamid);
          } else {
            this.toDisabled = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDelList() {
      this.$post
        .postData(
          "getTeamList",
          JSON.stringify(this.delListParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.data[2].children = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getShareList() {
      this.$post
        .postData(
          "getTeamShareList",
          JSON.stringify(this.getshareParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.data[1].children = res.data;
          // this.$nextTick(() => {
          //   this.$refs.comptree.setCurrentKey(this.data[1].children[0].teamid);
          // });
          // this.workshare.teamid = this.data[1].children[0].teamid
          this.getTaskWorkShare(this.data[1].children[0].teamid);
        })
        .catch(err => {
          console.log(err);
        });
    },
    defaultCheck(data) {
      conso;
    },
    // 侧边栏团队切换
    checkNode(data, node) {
      console.log(data);
      if (data.typeFather == "user") {
        this.isDisabled = true;
        this.toDisabled = true;
        this.isnewDisabled = true;
        this.$refs["ruleFrom"].resetFields();
        this.$refs.ue.setUEContent('');
        this.workList = [];
        this.uploadFileList = [];
        this.$message.closeAll();
        this.$message({
          message: "请先选择团队!",
          type: "warning"
        });
        return;
      }
      this.$refs["ruleFrom"].resetFields();
      this.$refs.ue.setUEContent('');
      this.msglist = [];
      this.isDisabled = true;
      this.toDisabled = true;
      // console.log(data);
      this.teamid = data.teamid;
      this.teamname = data.teamname;
      this.parentName = node.parent.data.teamname;
      if (this.parentName == "我创建的") {
        this.shownewbtn = true;
        this.showbtn = true;
        this.showinput = false;
        this.shareShow = false;
        this.showDel = true;
        this.delShow = true;
      }
      if (this.parentName == "回收站") {
        this.showbtn = false;
        this.shownewbtn = false;
        // this.isShow = false;
        this.showinput = true;
        this.shareShow = true;
        this.showDel = false;
        this.delShow = false;
      }
      if (this.parentName == "团队共享") {
        this.showbtn = false;
        this.shownewbtn = false;
        this.isShow = false;
        this.showinput = true;
        this.shareShow = false;
        this.showDel = false;
        this.delShow = true;
        this.getTaskWorkShare(this.teamid);
      } else {
        this.work.teamid = this.teamid;
        this.checkNode_params.teamId = this.teamid;
        this.isDelete = data.isDelete;
        if (this.isDelete == "1") {
          this.$set(this.work, "isdelete", 1);
        } else {
          this.work = {
            function: "TaskWordRecord_getList",
            teamid: data.teamid
          };
        }
        console.log(this.work);
        this.getTaskWordRecord(this.teamid);
      }
    },
    getTaskWorkShare(id) {
      this.workshare.teamid = id;
      this.$post
        .postData(
          "getWorkShareList",
          JSON.stringify(this.workshare),
          this.$businessCode.rwgl
        )
        .then(res => {
          this.workList = res.data;
          // if (this.isActive == 0) {
          //   this.taskdetail(0, this.workList[0].id);
          // }else{
          //   this.taskdetail(this.isActive, this.workList[this.isActive].id);
          // }
          this.taskdetail(0, this.workList[0].id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新建页面
    newCreate() {
      // this.saveParams={};
      this.$refs["ruleFrom"].resetFields();
      this.$refs.ue.setUEContent('');

      console.log(this.saveParams);
      this.workList.unshift({
        id: "",
        title: this.title
      });
      this.uploadFileList = [];
      console.log(this.workList);
      this.isActive = 0;
      this.isnewDisabled = true;
      this.toDisabled = false;
      this.isDisabled = false;
      this.taskdetail(0, "");
    },
    //新增工作记录
    addwork() {
      this.dialogShow = true;
      // this.$refs.dialog.openDialog();
    },
    //填写标题,获取标题
    taskdetail(index, id) {
      let that = this;
      // this.msglist = [];
      this.$refs.ue.setUEContent('');

      this.isActive = index;
      if (!this.workList[0].id) {
        this.isnewDisabled = true;
        this.isDisabled = false;
        this.toDisabled = false;
      } else {
        this.isnewDisabled = false;
      }
      if (id !== "") {
        this.toDisabled = false;
        if (this.parentName == "我创建的") {
          if (this.nodeIsDelete == "1") {
            this.showDel = false;
            this.toDisabled = true;
            this.isDisabled = true;
            this.isnewDisabled = true;
          } else {
            this.showDel = true;
            this.toDisabled = false;
            this.isDisabled = false;
            this.isnewDisabled = false;
          }
        } else {
          this.showDel = false;
        }
        this.taskid = id;
        this.detailParams.taskWorkRecordid = id;
        if (this.isDelete == "1") {
          this.$set(this.detailParams, "isdelete", 1);
        }
        if (this.parentName == "团队共享") {
          this.$set(this.detailParams, "isdelete", 2);
        }
        if (this.parentName == "我创建的") {
          delete this.detailParams.isdelete;
        }
        //页面详情
        this.$post
          .postData(
            "TaskWordRecord_getDetails",
            JSON.stringify(this.detailParams),
            this.$businessCode.rwgl
          )
          .then(res => {
            console.log(res);
            this.saveParams =Object.assign(this.saveParams, res.data.taskWorkRecord);
            this.readOnlys = (res.data.taskWorkRecord.readOnlys=="0")?true:false;
            console.log("我是"+res.data.taskWorkRecord.readOnlys+(res.data.taskWorkRecord.readOnlys=="0")+this.readOnlys);
            // this.saveParams = res.data.taskWorkRecord
            console.log(this.saveParams);
            this.taskCreateName = res.data.taskWorkRecord.createName;
            this.taskCreateTime = res.data.taskWorkRecord.createTime;
            this.uploadConfig.id = res.data.taskWorkRecord.id;
            this.$nextTick(()=>{
              this.$refs.ue.setUEContent(this.saveParams.content)
            })

            if (this.uploadConfig.id !== "") {
              this.isPreserve = true;
            }
            //已上传的文件
            this.uploadConfig.filesHas = res.data.file_list;
            this.uploadFileList = res.data.file_list;
            if(this.formData.TaskSaveVO){
              this.formData.TaskSaveVO.attachSort = [];
            }
            this.getMessage();
            if (this.parentName == "我创建的") {
              if (this.nodeIsDelete == "1") {
                this.showDel = false;
                this.toDisabled = true;
                this.isDisabled = true;
              } else {
                this.showDel = true;
              }
              this.disabled = false;
            } else if (this.parentName == "团队共享") {
              if (this.saveParams.readOnlys == "0") {
                this.toDisabled = true;
                this.showbtn = false;
              } else {
                this.toDisabled = false;
                this.showbtn = true;
                this.isDisabled = false;
              }
            } else {
              this.toDisabled = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.saveParams = {
          function: "saveWorkRecord",
          teamid: this.teamid,
          teamname: this.teamname,
          title: "",
          content: this.content,
          fileids: "",
          filesSort: ""
        };
        this.$refs.ue.setUEContent('');
        console.log(this.saveParams);
      }
      // console.log(id);
    },
    //右侧页面列表
    getTaskWordRecord(id) {
      this.work.teamid = id;
      this.checkNode_params.teamId = id;
      this.$post
        .postData(
          "findTeamIsDelete",
          JSON.stringify(this.checkNode_params),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          if (res.data.isDelete == "1") {
            this.toDisabled = true;
            this.isDisabled = true;
            this.showDel = false;
            this.isnewDisabled = true;
          } else {
            this.isnewDisabled = false;
          }
          this.nodeIsDelete = res.data.isDelete;
          if (res.success) {
            this.$post
              .postData(
                "TaskWordRecord_getList",
                JSON.stringify(this.work),
                this.$businessCode.rwgl
              )
              .then(res => {
                console.log(res);
                this.workList = res.data;
                let firstId = this.workList[0].id;
                // if (this.isActive == 0) {
                //   this.taskdetail(0, firstId);
                // }else{
                //   console.log(2222222222)
                //   console.log(this.isActive)
                //   this.taskdetail(this.isActive, this.workList[0].id);
                // }
                // console.log(this.isActive)
                this.taskdetail(0, this.workList[0].id);
                if (this.parentName == "我创建的") {
                  if (this.workList.length > 0) {
                    this.isShow = true;
                    this.toDisabled = false;
                  } else {
                    this.toDisabled = true;
                  }
                } else {
                  if (this.workList.length > 0) {
                    this.isShow = false;
                  }
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    },
    preserveUpload(type) {
      if (type === "uploadfile") {
        /**111 */
        if (!this.taskid && this.uploadConfig.id !== "") {
          this.$refs.uploadComponent.uploadFileNow();
          this.getMessage();
          return;
        } else {
          this.$message.error("请先保存!");
          return;
        }
      }
    },
    getUEContent() {
        return this.$refs.ue.getUEContent(); // 调用子组件方法
      },
    //保存
    preserve(type) {
      if (this.saveParams.title == "" && type == 'save') {
        this.$message.error("请填写标题!!!");
      } else {
        this.saveParams.teamid = this.teamid;
        this.saveParams.content = this.getUEContent();
        console.log(this.saveParams)
        this.saveParams.teamname = this.teamname;
        console.log(this.saveParams);
        this.$post
          .postData(
            "saveWorkRecord",
            JSON.stringify(this.saveParams),
            this.$businessCode.rwgl
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              if( type == 'save' ){
                this.$message({
                  message: "保存成功!",
                  type: "success",
                  duration: 2000
                });
              }
              this.getTaskWordRecord(res.data.taskWorkRecord.teamid);
              this.titleId = res.data.taskWorkRecord.id;
              this.uploadConfig.id = res.data.taskWorkRecord.id;
              if (this.uploadConfig.id !== "") {
                this.isPreserve = true;
              }

              if (type === "uploadfile") {
                this.uploadConfig.id = res.data.taskWorkRecord.id;
                this.saveParams.id = res.data.taskWorkRecord.id;
                this.$refs.uploadComponent.uploadFileNow();
              }

              this.isDisabled = false;
            } else {
              this.$message.error("保存失败!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //上传成功查询
    initForSearch(){
      this.taskdetail(this.isActive, this.taskid);
    },
    // 删除页面
    delwork(id) {
      console.log(id);
      this.delParams.delids = id;
      this.$confirm("是否确定删除此页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post
            .postData(
              "delete",
              JSON.stringify(this.delParams),
              this.$businessCode.rwgl
            )
            .then(res => {
              console.log(res);
              if (res.success) {
                this.$message({
                  message: "删除成功!",
                  type: "success",
                  duration: 2000
                });
                location.reload();
                // this.checkNode()
              } else {
                this.$message.error("删除失败!");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //发布
    release() {
      console.log(this.taskid);
      if (!this.taskid) {
        this.$message({
          message: "请先保存!",
          type: "warning"
        });
      } else {
        this.releaseParams.taskid = this.taskid;
        if (this.releaseParams.content == "") {
          this.$message({
            message: "请先填写消息内容!",
            type: "warning"
          });
          return;
        }
        this.$post
          .postData(
            "TaskWordRecord_saveMessage",
            JSON.stringify(this.releaseParams),
            this.$businessCode.rwgl
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.$message({
                message: "发布成功!",
                type: "success",
                duration: 2000
              });
              this.getMessage();
              this.releaseParams.content = "";
            } else {
              this.$message.error("发布失败!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getMessage() {
      this.getMsg.taskWorkRecordid = this.taskid;
      console.log(this.getMsg.taskWorkRecordid);
      this.$post
        .postData(
          "TaskWordRecord_handleDetailList",
          JSON.stringify(this.getMsg),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.msglist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //恢复
    recovery() {
      this.recoverParams.delids = this.taskid;
      // console.log(this.recoverParams)
      this.$post
        .postData(
          "deleteRecovery",
          JSON.stringify(this.recoverParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: "恢复成功!",
              type: "success",
              duration: 2000
            });
            location.reload();
          } else {
            this.$message.error("恢复失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //彻底删除
    cleanDel() {
      this.deepDel.delids = this.taskid;
      console.log(this.deepDel);
      this.$confirm("是否确定删除此页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post
            .postData(
              "thoroughDelete",
              JSON.stringify(this.deepDel),
              this.$businessCode.rwgl
            )
            .then(res => {
              console.log(res);
              if (res.success) {
                this.$message({
                  message: "删除成功!",
                  type: "success",
                  duration: 2000
                });
                location.reload();
              } else {
                this.$message.error("删除失败!");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClose() {
      this.isdialog = false;
    },
    upRow(n) {
      let midObj;
      this.formData.TaskSaveVO.attachSort.push(
        {
          id: this.uploadFileList[n - 1].id,
          sort: this.uploadFileList[n].sort
        },
        {
          id: this.uploadFileList[n].id,
          sort: this.uploadFileList[n - 1].sort
        }
      );
      midObj = this.uploadFileList[n];
      this.uploadFileList[n] = this.uploadFileList[n - 1];
      this.uploadFileList[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.formData.TaskSaveVO.attachSort.push(
        {
          id: this.uploadFileList[n + 1].id,
          sort: this.uploadFileList[n].sort
        },
        {
          id: this.uploadFileList[n].id,
          sort: this.uploadFileList[n + 1].sort
        }
      );
      midObj = this.uploadFileList[n];
      this.uploadFileList[n] = this.uploadFileList[n + 1];
      this.uploadFileList[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
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
              this.uploadFileList.splice(n, 1);
              this.uploadConfig.filesHas = this.uploadFileList;
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
    //
  }
};
</script>

<style lang="less" scoped>
.el-header {
  line-height: 60px;
}
/deep/.el-aside {
  height: 500px;
  border-bottom: 1px solid #eee;
}
.search {
  display: flex;

  /deep/.el-button {
    height: 40px;
    margin-top: 10px;
    margin-left: 5px;
  }
}
/deep/.el-main {
  overflow: none;
}
.left {
  width: 1050px;
  // height: 600px;
  border: 1px solid #eee;
  position: relative;
  padding-bottom: 50px;
  font-size: 14px;
  color: #606266;
  .top {
    display: flex;
    margin: 20px;
    .top-a {
      margin-right: 20px;
    }
  }
}
.right {
  width: 250px;
  height: 600px;
  border: 1px solid #eee;
  margin-left: 20px;
}
ul {
  margin-top: 10px;
}
.list {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  /deep/.el-button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
    margin-right: 10px;
  }
  span {
    width: 100px;
    height: 100%;
    border: 1px solid #3e3e3e;
    border-radius: 10px;
    margin-left: 10px;
    text-align: center;
    background: transparent;
  }
  .item.active {
    background: #82b4eb;
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
  margin-top: 10px;
  overflow-y: scroll;
}
/deep/.mt20 {
  margin-top: 10px;
  display: flex;
}
/deep/.msginput {
  margin-left: 65px;
  height: 100px;
  margin-top: 10px;
  .el-input__inner {
    height: 100%;
  }
}
.text {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .spanname {
    margin-right: 10px;
  }
}
/deep/.releasebtn {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.titlename {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/.el-tree-node__children .el-tree-node.is-current {
  color: blue;
}
/deep/.el-tree-node.is-expanded {
  color: #606266;
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
