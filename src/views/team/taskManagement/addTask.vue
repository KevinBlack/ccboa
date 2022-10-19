<template>
  <div>
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back" @click="closeHandler = true">
          <i class="el-icon-arrow-left"></i>
          {{title}}
        </p>
        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
          <el-button plain @click="preserve(1)" v-preventClick>保存</el-button>
          <el-button plain @click="update" v-preventClick>发送</el-button>
          <el-button plain v-show="handleShow" @click="finish" v-preventClick>办结任务</el-button>
          <el-button plain v-show="isShow" @click="del" v-preventClick>删除任务</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{title1}}</h3>
    </header>

    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <el-form
      :model="formData.TaskSaveVO"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:65%;margin:0 auto;border:1px solid #BFBFBF;;padding:30px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="任务名称" prop="taskname">
            <el-input v-model="formData.TaskSaveVO.taskname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="派发人" prop="createname">
            <el-input disabled v-model="formData.TaskSaveVO.createname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="team">
          <span class="teamname">{{formData.TaskSaveVO.teamname}}</span>
          <span>任务分配单</span>
        </div>
        <div class="tableDate">
          <div class="button" style="width:3%;margin-right:10px">
            <p>
              <el-button
                class="el-icon-plus"
                size="mini"
                :disabled="iseditTask"
                @click.prevent="addRow('','btn')"
              ></el-button>
            </p>
            <p>
              <el-button class="el-icon-minus" size="mini" @click.prevent="delRow"></el-button>
            </p>
          </div>
          <div style="width: 95%">
            <el-table
              :data="formData.TaskSaveVO.taskOrderJson"
              style="width:100%;text-align:center"
              border
              stripe
              ref="table"
              tooltip-effect="dark"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              @selection-change="selectRow"
            >
              <el-table-column type="selection" align="center" width="50" ></el-table-column>
              <el-table-column type="index" label="任务编号" width="100"></el-table-column>
              <el-table-column prop="ordername" label="任务简称">
                <template slot="header">
                  <span>任务简称</span>
                  <span class="star">*</span>
                </template>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.ordername"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="orderdetail" label="任务详情">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.orderdetail"
                    @focus="focus(scope.row,scope.$index)"
                  ></el-input>
                  <!-- <el-input
                    v-model="scope.row.orderdetail"
                    :disabled="isfocus"
                    @focus="focus(scope.row,scope.$index)"
                  ></el-input> -->
                  <el-dialog title="任务详情" :visible.sync="dialog1" width="30%" :before-close="close">
                    <el-input
                      type="textarea"
                      placeholder="填写任务详情可输入125字"
                      maxlength="125"
                      v-model="orderdetail"
                    ></el-input>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialog1 = false">取 消</el-button>
                      <el-button type="primary" @click="submit(scope.row)">确 定</el-button>
                    </span>
                  </el-dialog>
                </template>
              </el-table-column>

              <el-table-column  prop="searchTime"  label="任务开始时间-任务截止时间">
                <template slot-scope="scope">
                  <div class="block">
                    <el-date-picker
                      v-model="scope.row.searchTime"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      align="left"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始时间"
                      end-placeholder="截止时间"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="person" label="任务责任人">
                <template slot="header">
                  <span>任务责任人</span>
                  <span class="star">*</span>
                </template>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.person" @focus="checkPerson(scope.row,scope.$index)"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="12">
          <el-form-item label="创建时间" prop="layouttime">
            <el-input v-if="showFormatDate" disabled v-model="formData.TaskSaveVO.layouttime"></el-input>
            <div v-else>{{formData.TaskSaveVO.layouttime | formatDate}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="notice" label="任务通知方式" prop="noticetype">
            <el-radio-group v-model="formData.TaskSaveVO.noticetype">
              <el-radio :label="formData.TaskSaveVO.noticetype">应用内</el-radio>
              <el-radio disabled :label="2">短信</el-radio>
              <el-radio disabled :label="3">电话</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="抄送人">
        <el-input v-model="formData.TaskSaveVO.copyname" style="width:40%"></el-input>
        <el-button
          class="el-icon-arrow-down"
          size="mini"
          style="height:40px;margin-left:10px"
          @click="openDialog(-1)"
        ></el-button>
      </el-form-item>
      <treeChild
        :subtreeData="subtreeData"
        :subdialogTit="subdialogTit"
        :suboffenUse="suboffenUse"
        :subcheckIds="subcheckIds"
        :subcanTab="subcanTab"
        :showcheckbox="showcheckbox"
        :subsingelCheckF="subsingelCheckF"
        :subdialogState="subdialogState"
        @subshowCompDialog="subshowCompDialog"
      ></treeChild>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件">
            <el-row>
              <!-- <loadAccessory></loadAccessory> -->
              <uploadFiles
                ref="uploadComponent"
                @preserve="toPreserve"
                :uploadConfig="uploadConfig"
                :isPreserve="isPreserve"
              ></uploadFiles>
              <el-col>
                <div class="tree_w" v-if="uploadFileList&&uploadFileList.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  uploadFileList" :key="item.id" class="comp_list">
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
              <el-col v-for="(item,n) in fkfj" :key="n">
                <el-form-item :label="item" :key="item">
                  <el-scrollbar>
                    <div v-for="item1 in fkfjList[n]" :key="item1.id" class="tree_w">
                      <template>
                        <div class="command_wrap">
                          <span class="name down" @click="downFile(item1)">{{item1.fileName}}</span>
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
      <el-form-item label="办理情况" v-show="handleShow">
        <el-card class="box-card">
          <div v-for="item in handlelist" :key="item.id" class="text item">
            <span>{{item.content}}</span>
            <div>
              <span class="spanname">{{item.createname}}</span>
              <span>{{item.createTime}}</span>
            </div>
          </div>
        </el-card>
      </el-form-item>
      <!-- <el-form-item label="消息交流" v-show="handleShow">
        <el-card class="box-card">
          <div v-for="item in newslist" :key="item.id" class="text item">
            <span>{{item.content}}</span>
            <div>
              <span class="spanname">{{item.createname}}</span>
              <span>{{item.updateTime}}</span>
            </div>
          </div>
        </el-card>
        <div style="display:flex">
          <el-input
            v-model="newsParams.content"
            style="width:93%;"
            class="msginput"
            placeholder="请输入内容"
          ></el-input>
          <el-button
            type="primary"
            style="height:40px;margin-top:15px;margin-left:5px"
            @click="saveNew"
          >发送</el-button>
        </div>
      </el-form-item>-->
    </el-form>
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
import viewDraft from "@/minixs/viewDraft";
import treeChild from "./component/tree.vue";
import { formatDate } from "@/util/date.js";
import uploadFiles from "@/components/uploadFile/uploadFileFw";
import closeMessage from 'components/closeMessage/index';
import dateFormate from "@/util/filters.js";
export default {
  components: {
    treeChild,
    uploadFiles,
    closeMessage
  },
  props: [],
  data() {
    return {
      searchTime:[],
      closeHandler:false,
      showCloseDialog:false,
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
        formId: "formFile"
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
      pickerOpion: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      // 抄送人弹窗接口
      paramas: {
        function: "getUserTreeTeam",
        teamId: ""
        // deptId: ""
      },
      //任务详情
      taskdetail: {
        function: "getTaskDetail",
        taskid: "",
        status: ""
      },
      deltask: {
        function: "deleteIds",
        taskids: ""
      },
      //办理情况
      handleList: {
        function: "handleDetailList",
        taskid: "",
        status: 1
      },
      //发送消息
      newsParams: {
        function: "saveMessage",
        taskid: "",
        createname: "",
        statue: 2,
        taskorderid: "",
        content: ""
      },
      //消息列表
      newsList: {
        function: "handleDetailList",
        taskid: "",
        status: 2
      },
      //办结
      finishParams: {
        function: "Through",
        taskOrderId: ""
      },
      isfocus: false, //表格任务详情
      handlelist: [], //办理情况列表
      newslist: [], //消息列表
      title: "新增任务",
      title1: "新增任务",
      isShow: false, //删除任务按钮显示隐藏
      dialog1: false,
      orderdetail: "", //任务详情
      suboffenUse: true, //是否可设置常用
      subcanTab: false, //是否可切换
      subsingelCheckF: false, // 单选true 多选为false
      subdialogTit: "选择抄送人员", // 弹框标题
      subdialogState: false,
      showcheckbox: true, //是否显示多选框
      // checkstrictly: true,
      subcheckIds: [],
      subtreeData: [], //选择责任人和抄送人弹窗数据
      dialogVisible: false,
      //表单保存
      formData: {
        function: "saveTaskSaveOv",
        TaskSaveVO: {
          attachSort: [],
          createUserId: "",
          send: 0,
          teamid: "",
          teamname: "", //团队名称
          pid: "",
          oldArrachsSort: "",
          filesSort: [],
          id: "",
          taskname: "", //任务名称
          createname: "", //派发人
          ordername: "",
          orderdetail: "",
          startime: "",
          endtime: "",
          person: "",
          personid: "",
          layouttime: "", //创建时间,
          copyname: "", //抄送人
          copyid: "",
          noticetype: 1,
          delFileIds: "",
          fileids: "",
          taskId: "",
          delids: "",
          taskOrderJson: [
            {
              id: "",
              pid: "",
              sort: "",
              person: "",
              personid: "",
              // createname: "",
              ordername: "",
              orderdetail: "",
              startime: "",
              teamid: "",
              endtime: "",
              searchTime:[],
              // progress: ""
            }
          ]
        },
        orderdetail: "",
        delids: ""
      },
      type: "", //区分选择任务责任人和抄送人
      fileList: [],
      selectList: [], //表格勾选数组
      rules: {
        taskname: [
          {
            required: true,
            message: "请填写任务名称！",
            trigger: "blur"
          },
          { min: 1, max: 20, message: "长度超过最大限制!", trigger: "blur" }
        ],
        createname: [{ required: true, message: "必填项", trigger: "blur" }],
        ordername: [{ required: true, message: "必填项", trigger: "blur" }],
        person: [{ required: true, message: "必填项", trigger: "blur" }],
        layouttime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        noticetype: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      list: [],
      handleShow: false, //消息交流显示
      showFormatDate: false,
      isRepeat: false,
      iseditTask: false, //加号按钮禁用
      // checkPersonId:''
      // personlist:[]
      uploadFileList: [],
      createUserId:"",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
    };
  },
  mixins: [viewDraft],
  created() {
    this.getDetail();
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.uploadConfig.code = this.$businessCode.rwglfj;
    this.uploadConfig.newcode =  this.$businessCode.rwglfj;
    if (this.$route.query.taskid == undefined) {
      this.title = "新增任务";
      this.title1 = "新增任务";
      if (this.$route.query.pid !== undefined) {
        this.title = "新增子任务";
        this.title1 = "新增子任务";
        this.paramas.teamId = this.$route.query.teamid;
      }
    } else {
      this.title = "修改任务";
      this.isPreserve = true;
      
      this.title1 = this.formData.TaskSaveVO.taskname;
      this.getHandleList();
      this.getNewsList();
      this.showFormatDate = true;
      if (this.$route.query.taskOrderId || this.$route.query.status == "5") {
        this.iseditTask = true;
      }
    }

    if (this.$route.query.taskOrderId) {
      this.handleShow = true;
    }
    if (sessionStorage.getItem("teamname")) {
      this.formData.TaskSaveVO.teamname = JSON.parse(
        sessionStorage.getItem("teamname")
      );
    }
    if (sessionStorage.getItem("teamId")) {
      this.paramas.teamId = JSON.parse(sessionStorage.getItem("teamId"));
      this.formData.TaskSaveVO.teamid = JSON.parse(
        sessionStorage.getItem("teamId")
      );
    }
    // if (localStorage.getItem("ccboaUnitId")) {
    //   this.paramas.deptId = JSON.parse(localStorage.getItem("ccboaUnitId"));
    // }
    if(this.$route.query.flag == "new"){
      this.formData.TaskSaveVO.createname = userInfo.humanName;
      this.formData.TaskSaveVO.createUserId = userInfo.humanId;
    }
    
    this.formData.TaskSaveVO.layouttime = new Date().getTime();
    
  },
  filters: {
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    timeChange(searchTime,index) {
      //时间获取
      // scope.row.startime
      // scope.row.endtime
      
      console.log("111",index,searchTime);
      if (searchTime && searchTime[0]) {
        this.formData.TaskSaveVO.taskOrderJson[index].startime = dateFormate.date(
          Date.parse(searchTime[0])
        );
        this.formData.TaskSaveVO.taskOrderJson[index].endtime = dateFormate.date(
          Date.parse(searchTime[1])
        );
      }else{
        this.formData.TaskSaveVO.taskOrderJson[index].startime = ""
        this.formData.TaskSaveVO.taskOrderJson[index].endtime = ""
      }
    },
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
    //任务详情
    getDetail(id) {
      if (this.$route.query.taskid !== undefined) {
        this.taskdetail.taskid = this.$route.query.taskid;
        this.taskdetail.status = this.$route.query.status;
        this.uploadConfig.id = this.$route.query.taskid;
        if (this.$route.query.taskOrderId !== undefined) {
          this.$set(
            this.taskdetail,
            "taskOrderId",
            this.$route.query.taskOrderId
          );
        }
      }
        this.TaskDetail(id);
      // else{
      //   if (this.$route.query.taskOrderId !== undefined) {
      //     delete this.taskdetail.taskid;
      //     this.$set(
      //       this.taskdetail,
      //       "taskOrderId",
      //       this.$route.query.taskOrderId
      //     );
      //   }
      //   this.TaskDetail()
      // }
    },
    TaskDetail(id) {
      this.$post
        .postData(
          "getTaskDetail",
          JSON.stringify(this.taskdetail),
          this.$businessCode.rwgl
        )
        .then(res => {
          var userInfo = JSON.parse(localStorage.getItem("userInfo"));
          console.log(res);
          Object.assign(this.formData.TaskSaveVO, res.data.task);
          console.log(this.formData.TaskSaveVO);

          //已上传的文件
          this.uploadConfig.filesHas = res.data.file_list;
          this.uploadFileList = res.data.file_list;
          this.formData.TaskSaveVO.attachSort = [];
          // this.formData.TaskSaveVO = res.data.task;
          this.formData.TaskSaveVO.taskOrderJson = res.data.taskOrder;

          this.formData.TaskSaveVO.taskOrderJson.map((v,i)=>{
            this.$set(this.formData.TaskSaveVO.taskOrderJson[i],'searchTime',v.startime&&v.endtime?[v.startime,v.endtime]:[])
          })
          this.title1 = this.formData.TaskSaveVO.taskname;
          this.formData.TaskSaveVO.taskOrderJson.forEach(el => {
            if (el.status == 5) {
              this.handleShow = true;
            }
          });
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取抄送人树
    getTreeData() {
      this.$post
        .postData(
          "getUserTreeTeam",
          JSON.stringify(this.paramas),
          this.$businessCode.tdgl
        )
        .then(res => {
          // console.log(res);
          this.subtreeData = res.data;
          // this.subtreeData.push(res.data);
          // console.log(this.subtreeData);
          this.subtreeData[0].disabled = true;

          this.humanDisabled(this.subtreeData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    humanDisabled(subtreeData) {
      let humanCode = JSON.parse(localStorage.getItem("userInfo")).humanCode;
      subtreeData.forEach((node, k) => {
        // node.forEach((item, i) => {
          if (node.humanCode == humanCode) {
            node.disabled = true;
          }
        // });
        if (node.children && node.children.length > 0) {
          this.humanDisabled(node.children);
        }
      });
    },
    //选择抄送人
    openDialog(type) {
      this.subdialogState = true;
      this.showcheckbox = true;
      this.subsingelCheckF = false;
      this.getTreeData();
      this.type = type;
    },
     // 关闭
    //  handleClose(val) {
    //   if(val=='1') {
    //     this.preserveAsync().then(save => {
    //       if(save) {
    //         window.location.href = "about:blank";
    //         window.close();
    //       }
    //     });
    //   } else if(val=='2') {
    //     window.location.href = "about:blank";
    //     window.close();
    //   } else {
    //     this.showCloseDialog = false;
    //   }
    // },
    // handelclose() {
    //   this.showCloseDialog = true;
    // },
    async preserveAsync(){
       let successState = false;
         this.formData.TaskSaveVO.send = 0;
      if (this.$route.query.pid !== undefined) {
        this.formData.TaskSaveVO.pid = this.$route.query.pid;
        this.formData.TaskSaveVO.taskOrderJson.forEach(el => {
          el.pid = this.$route.query.pid;
        });
      }
      if (this.$route.query.taskid !== undefined) {
        this.formData.TaskSaveVO.taskId = this.$route.query.taskid;
      } else {
        let dateTime = formatDate(
          new Date(this.formData.TaskSaveVO.layouttime),
          "yyyy-MM-dd hh:mm"
        );
        this.formData.TaskSaveVO.layouttime = dateTime;
        console.log(dateTime);
      }
      if (this.$route.query.pid !== undefined) {
        this.formData.TaskSaveVO.pid = this.$route.query.pid;
        this.formData.TaskSaveVO.taskOrderJson.forEach(el => {
          el.pid = this.$route.query.pid;
        });
      }
      if (this.$route.query.taskid !== undefined) {
        this.formData.TaskSaveVO.taskId = this.$route.query.taskid;
      } else {
        let dateTime = formatDate(
          new Date(this.formData.TaskSaveVO.layouttime),
          "yyyy-MM-dd hh:mm"
        );
        this.formData.TaskSaveVO.layouttime = dateTime;
        console.log(dateTime);
      }
       if(this.formData.TaskSaveVO.taskname==""){
         this.$message.error("请输入任务名称!");
         return false;
      }else{
        await this.$post
        .postData(
          "saveTaskSaveOv",
          JSON.stringify(this.formData),
          this.$businessCode.rwgl
        )
        .then(res => {
          if (res.success) {
            window.opener&&window.opener.location.reload();
            successState = true;
          } else {
            this.$message.error("保存失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
        return successState;
      }
    },
    // 关闭
    handelclose() {
      this.$confirm("是否退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.location.href = "about:blank";
          window.opener.location.reload();
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
    },
    preserveUpload(type) {
      console.log(type);
      if (type === "uploadfile") {
        /**111 */
        if (this.$route.query.taskid !== undefined) {
          this.$refs.uploadComponent.uploadFileNow();
          return;
        } else {
          this.$message.error("请先保存!");
          return;
        }
      }
      if (!type) {
        this.getDetail();
      }
    },
    //保存
    preserve(type) {
      this.formData.TaskSaveVO.send = 0;
      if (this.$route.query.pid !== undefined) {
        this.formData.TaskSaveVO.pid = this.$route.query.pid;
        this.formData.TaskSaveVO.taskOrderJson.forEach(el => {
          el.pid = this.$route.query.pid;
        });
      }
      if (this.$route.query.taskid !== undefined) {
        this.formData.TaskSaveVO.taskId = this.$route.query.taskid;
      } else {
        let dateTime = formatDate(
          new Date(this.formData.TaskSaveVO.layouttime),
          "yyyy-MM-dd hh:mm"
        );
        this.formData.TaskSaveVO.layouttime = dateTime;
        console.log(dateTime);
      }
      // console.log(this.formData.TaskSaveVO.taskname);
      // 保存时已取消必填校验, 发送时打开
      // if (this.formData.TaskSaveVO.taskname == "") {
      //   this.$message.closeAll();
      //   this.$message.error("请填写任务名称!");
      //   return;
      // }
      // for (var i = 0; i < this.formData.TaskSaveVO.taskOrderJson.length; i++) {
      //   console.log(this.formData.TaskSaveVO.taskOrderJson[i]);
      //   if (this.formData.TaskSaveVO.taskOrderJson[i].ordername == "") {
      //     this.$message.closeAll();
      //     this.$message.error("请填写任务简称!");
      //     return;
      //   }
      //   if (this.formData.TaskSaveVO.taskOrderJson[i].person == "") {
      //     this.$message.closeAll();
      //     this.$message.error("请填写任务责任人!");
      //     return;
      //   }
      //   if (
      //     this.formData.TaskSaveVO.taskOrderJson[i].personid ==
      //     this.$route.query.personid
      //   ) {
      //     this.$message.closeAll();
      //     this.$message.error("子任务任务责任人不能与主任务相同!");
      //     return;
      //   }
      // }

      // for (var i = 0; i < this.formData.TaskSaveVO.taskOrderJson.length; i++) {
      //   if (this.$route.query.taskid == undefined) {
      //     this.formData.TaskSaveVO.taskOrderJson[i].id = "";
      //   }
      //   if (
      //     this.formData?.TaskSaveVO?.taskOrderJson[i]?.ordername ==
      //       this.formData?.TaskSaveVO?.taskOrderJson[i + 1]?.ordername &&
      //     this.formData?.TaskSaveVO?.taskOrderJson[i]?.person ==
      //       this.formData?.TaskSaveVO?.taskOrderJson[i + 1]?.person
      //   ) {
      //     this.isRepeat = true;
      //     this.$confirm("有重复任务是否执行操作, 是否继续?", "提示", {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //       type: "warning"
      //     })
      //       .then(() => {
      this.toPreserve();

      console.log("确定");
      //       })
      //       .catch(() => {
      //         this.$message({
      //           type: "info",
      //           message: "已取消保存"
      //         });
      //         return;
      //       });
      //     break;
      //   } else {
      //     this.isRepeat = false;
      //   }
      // }
      // if (!this.isRepeat) {
      //   this.toPreserve();
      // }
    },
    toPreserve(type) {
      let checkName = true;//校验任务简称
      this.formData.TaskSaveVO.send = 0;
      if (this.$route.query.pid !== undefined) {
        this.formData.TaskSaveVO.pid = this.$route.query.pid;
        this.formData.TaskSaveVO.taskOrderJson.forEach(el => {
          el.pid = this.$route.query.pid;
          if(!el.ordername){
            checkName = false;
          }
        });
      }
      if(!checkName){
         this.$message.error("请输入任务简称!");
        return;
      }
      if (this.$route.query.taskid !== undefined) {
        this.formData.TaskSaveVO.taskId = this.$route.query.taskid;
      } else {
        let dateTime = formatDate(
          new Date(this.formData.TaskSaveVO.layouttime),
          "yyyy-MM-dd hh:mm"
        );
        this.formData.TaskSaveVO.layouttime = dateTime;
        console.log(dateTime);
      }
       if(this.formData.TaskSaveVO.taskname==""){
         this.$message.error("请输入任务名称!");
      }else{
        this.formData.TaskSaveVO.taskOrderJson.map((t,i)=>{
          if(t.searchTime&&t.searchTime.length){
            t.startime = t.searchTime[0];
            t.endtime = t.searchTime[1];
          }
        })
          this.$post
        .postData(
          "saveTaskSaveOv",
          JSON.stringify(this.formData),
          this.$businessCode.rwgl
        )
        .then(res => {
          // console.log(res);
          if (res.success) {
            if (type != "uploadfile") {
              this.$message({
                message: "保存成功!",
                type: "success",
                duration: 2000
                // onClose: () => {
                //   window.location.href = "about:blank";
                //   window.opener.location.reload();
                //   window.close();
                // }
              });
            }
            if (res.data.task.id) {
              this.isPreserve = true;
            }

            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.task.id;
              this.formData.TaskSaveVO.id = res.data.task.id;
              this.$refs.uploadComponent.uploadFileNow();
            }

            let transStatus = this.$route.query.status||""

            this.$router.replace({
              path: "/addTask",
              query: {
                taskid: res.data.task.id,
                status: transStatus
              }
            });
            this.getDetail(res.data.task.id);
            // window.location.reload();
          } else {
            this.$message.error("保存失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
      
      // this.$refs["ruleForm"].validate(valid => {
      //   if (valid) {

      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    //发送
    update() {
      // this.$message.closeAll();
      this.formData.TaskSaveVO.send = 1;
      if (this.$route.query.taskid !== undefined) {
        this.formData.TaskSaveVO.taskId = this.$route.query.taskid;
      } else {
        // console.log(dateTime1);
        let dateTime = formatDate(
          new Date(this.formData.TaskSaveVO.layouttime),
          "yyyy-MM-dd hh:mm"
        );
        this.formData.TaskSaveVO.layouttime = dateTime;
      }
      console.log(this.formData.TaskSaveVO);
      if (this.$route.query.pid !== undefined) {
        this.formData.TaskSaveVO.pid = this.$route.query.pid;
        this.formData.TaskSaveVO.taskOrderJson.forEach(el => {
          el.pid = this.$route.query.pid;
        });
      }
      // console.log(this.formData);
      if (this.formData.TaskSaveVO.taskname == "") {
        this.$message.error("请填写任务名称!");
        return;
      }
      for (var i = 0; i < this.formData.TaskSaveVO.taskOrderJson.length; i++) {
        // console.log(this.formData.TaskSaveVO.taskOrderJson[i]);
        if (this.formData.TaskSaveVO.taskOrderJson[i].ordername == "") {
          this.$message.error("请填写任务简称!");
          return;
        }
        if (this.formData.TaskSaveVO.taskOrderJson[i].person == "") {
          this.$message.error("请填写任务责任人!");
          return;
        }
        if (
          this.formData.TaskSaveVO.taskOrderJson[i].personid ==
          this.$route.query.personid
        ) {
          this.$message.closeAll();
          this.$message.error("子任务任务责任人不能与主任务相同!");
          return;
        }
      }
      for (var i = 0; i < this.formData.TaskSaveVO.taskOrderJson.length; i++) {
        // this.formData.TaskSaveVO.taskOrderJson[i].id = "";
        if (this.$route.query.taskid == undefined) {
          this.formData.TaskSaveVO.taskOrderJson[i].id = "";
        }
        if (
          this.formData?.TaskSaveVO?.taskOrderJson[i]?.ordername ==
            this.formData?.TaskSaveVO?.taskOrderJson[i + 1]?.ordername &&
          this.formData?.TaskSaveVO?.taskOrderJson[i]?.person ==
            this.formData?.TaskSaveVO?.taskOrderJson[i + 1]?.person
        ) {
          this.isRepeat = true;
          this.$confirm("有重复任务是否执行操作, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.toSend();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消发送"
              });
              return;
            });
          break;
        } else {
          this.isRepeat = false;
        }
      }
      if (!this.isRepeat) {
        this.toSend();
      }
    },
    toSend() {
      if(this.formData.TaskSaveVO.taskname==""){
         this.$message.error("请输入任务名称!");
         return false;
      }
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$post
            .postData(
              "saveTaskSaveOv",
              JSON.stringify(this.formData),
              this.$businessCode.rwgl
            )
            .then(res => {
              // console.log(res);
              if (res.success) {
                this.$message({
                  message: "发送成功!",
                  type: "success",
                  duration: 2000,
                  onClose: () => {
                    window.location.href = "about:blank";
                    window.opener.location.reload();
                    window.close();
                  }
                });
              } else {
                this.$message.error("发送失败!");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除任务
    del() {
      if (this.$route.query.taskOrderId !== undefined) {
        delete this.deltask.taskids;
        this.$set(this.deltask, "taskOrderIds", this.$route.query.taskOrderId);
      } else {
        this.deltask.taskids = this.$route.query.taskid;
      }
      this.$confirm("是否删除该任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post
          .postData(
            "deleteIds",
            JSON.stringify(this.deltask),
            this.$businessCode.rwgl
          )
          .then(res => {
            // console.log(res);
            if (res.success) {
              this.$message({
                message: "删除成功!",
                type: "success",
                duration: 2000,
                onClose: () => {
                  window.location.href = "about:blank";
                  window.opener.location.reload();
                  window.close();
                }
              });
            } else {
              this.$message.error("删除失败!");
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },
    //办结任务
    finish() {
      this.finishParams.taskOrderId = this.$route.query.taskOrderId||this.formData.TaskSaveVO.taskOrderJson && this.formData.TaskSaveVO.taskOrderJson[0].id;
      this.$confirm("是否办结该任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post
          .postData(
            "Through",
            JSON.stringify(this.finishParams),
            this.$businessCode.rwgl
          )
          .then(res => {
            // console.log(res);
            if (res.success) {
              this.$message({
                message: "办结成功!",
                type: "success",
                duration: 2000,
                onClose: () => {
                  window.location.href = "about:blank";
                  window.opener.location.reload();
                  window.close();
                }
              });
            } else {
              this.$message.error("办结失败!");
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },
    //办理情况列表
    getHandleList() {
      this.handleList.taskid = this.$route.query.taskid;
      this.$post
        .postData(
          "handleDetailList",
          JSON.stringify(this.handleList),
          this.$businessCode.rwgl
        )
        .then(res => {
          if(res.success){
            this.handlelist = res.data;
            setTimeout(()=>{
              this.createUserId = res && res.data && res.data[0].createUserId || [];
              if(this.$route.query.flag == "new"||JSON.parse(localStorage.getItem('userInfo')).humanId == this.createUserId){
                this.isShow = true;
              }else{
                this.isShow = false;
              }
              console.log(this.isShow)
            },1000)
            
          }
          
          // console.log(res);
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    //发送消息
    saveNew() {
      this.newsParams.taskid = this.$route.query.taskid;
      this.newsParams.createname = JSON.parse(
        localStorage.getItem("userInfo")
      ).humanName;
      this.$post
        .postData(
          "saveMessage",
          JSON.stringify(this.newsParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //消息列表
    getNewsList() {
      this.newsList.taskid = this.$route.query.taskid;
      this.$post
        .postData(
          "handleDetailList",
          JSON.stringify(this.newsList),
          this.$businessCode.rwgl
        )
        .then(res => {
          // console.log(res);
          this.newslist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取表格选中时的数据
    selectRow(val) {
      console.log(val)
      this.selectList = val;
    },
    //增加行
    addRow(data, btn) {
      if (btn && btn == "btn") {
        let addObj = {
              id: "",
              pid: "",
              sort: "",
              person: "",
              personid: "",
              ordername: "",
              orderdetail: "",
              startime: "",
              teamid: "",
              endtime: ""
            };
        var radom = Math.floor(Math.random() * 10);
        addObj.id = radom;
        this.formData.TaskSaveVO.taskOrderJson.push(addObj);
      } else {
        var obj = {
          id: "",
          pid: "",
          sort: "",
          person: "" || data.text,
          personid: "" || data.id,
          teamid: "" || data.deptid,
          // createname: "",
          ordername: "",
          orderdetail: "",
          startime: "",
          endtime: ""
          // progress: ""
        };
        for (var i = 0; i < 6; i++) {
          var radom = Math.floor(Math.random() * 10);
          obj.id += radom;
        }
        obj.personid = data.id;
        this.formData.TaskSaveVO.taskOrderJson.push(obj);
      }
    },
    // 删除选中行
    delRow() {
      if (this.selectList.length == 0) {
        this.$message({
          message: "请至少勾选一条任务!",
          type: "warning"
        });
        return;
      }
      if (
        this.formData.TaskSaveVO.taskOrderJson.length > 1 &&
        this.formData.TaskSaveVO.taskOrderJson.length > this.selectList.length
      ) {
        for (var i = 0; i < this.selectList.length; i++) {
          let val = this.selectList;
          val.forEach((val, index) => {
            this.formData.TaskSaveVO.taskOrderJson.forEach((v, i) => {
              if (val.id === v.id) {
                this.formData.TaskSaveVO.taskOrderJson.splice(i, 1);
              }
            });
          });
        }
        this.$refs.table.clearSelection();
      } else {
        this.$message({
          message: "不能全部删除!",
          type: "warning"
        });
      }
    },
    // 选择抄送人弹窗
    subshowCompDialog(result, flag) {
      this.subdialogState = !this.subdialogState;
      console.log(result);
      if (flag) {
        sessionStorage.setItem("personlist", JSON.stringify(result[0]));
        // this.personlist = result;
        var newlist = result.map(val => {
          // this.formData.copyid = val.id
          return val.text;
        });
        var newlist1 = result.map(val => {
          let index = val.id.lastIndexOf("-");
          val.id = val.id.substring(0, index);
          return val.id;
        });
        console.log(newlist, newlist1);
        if (newlist == [] || newlist1 == []) {
          return;
        } else {
          if (this.type == "-1") {
            this.formData.TaskSaveVO.copyname = newlist.toString();
            this.formData.TaskSaveVO.copyid = newlist1.toString();
          } else {
            // this.formData.TaskSaveVO.taskOrderJson.forEach((ele, index) => {
            //   if (index == this.type) {
            //     ele.person = newlist.toString();
            //   }
            // });
            // if (
            //   JSON.parse(sessionStorage.getItem("personlist")) !== "undefined"
            // ) {
            //   var arr = JSON.parse(sessionStorage.getItem("personlist"));
            // }
            // console.log(arr);

            console.log(result[0].id);
            this.formData.TaskSaveVO.taskOrderJson[this.type].personid =
              result[0].id;
            this.formData.TaskSaveVO.taskOrderJson[this.type].person =
              result[0].text;
            this.formData.TaskSaveVO.taskOrderJson[this.type].teamid =
              result[0].deptid;
            let resultLen = result.length;
            let len = resultLen - 1;
            result.shift();
            console.log(result);
            if (resultLen > 1) {
              for (let i = 0; i < len; i++) {
                console.log("aa");
                this.addRow(result[i]);
              }
            }
          }
        }
      }
    },
    //任务详情
    focus(row, index) {
      this.isfocus = true;
      // console.log(row, index);
      this.dialog1 = true;
      sessionStorage.setItem("rowindex", JSON.stringify(index));
      this.orderdetail = row.orderdetail;
    },
    close() {
      this.dialog1 = false;
      this.isfocus = false;
      // this.orderdetail = ''
    },
    submit(row) {
      // console.log(JSON.parse(sessionStorage.getItem("rowindex")));
      this.formData.TaskSaveVO.taskOrderJson.forEach((ele, index) => {
        if (index == JSON.parse(sessionStorage.getItem("rowindex"))) {
          this.formData.TaskSaveVO.taskOrderJson[
            index
          ].orderdetail = this.orderdetail;
        }
      });
      this.isfocus = false;
      this.dialog1 = false;
      this.orderdetail = "";
    },
    //任务责任人
    checkPerson(row, index) {
      console.log(row, index);
      this.subdialogState = true;
      if (this.$route.query.status == "5") {
        this.showcheckbox = false;
        this.subsingelCheckF = true;
      } else {
        this.showcheckbox = true;
      }

      this.subdialogTit = "任务负责人";
      // this.subsingelCheckF = false;
      this.type = index;
      // this.checkPersonId = row.personid
      this.getTreeData();
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
      this.$confirm("是否确定删除此附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
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
      });
    },
    //正文跳转
    doDraft(fileInfo) {
      let data;
      let fileConfig = fileInfo;
      
      data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: this.$route.query.id,
          zhengWenState: 0,
          JYcode: this.$businessCode.rwglfj,
          relativePath: fileConfig ? fileConfig.filePath : "",
          fileName: fileConfig ? fileConfig.fileName : "",
          tmpFileName: fileConfig ? fileConfig.fileNameTh : "",
          tmpFilePath: fileConfig ? fileConfig.filePathTh : "",
          pageFlag: "addTaskPage",
          taoHongFlag: fileConfig && fileConfig.fileNameTh ? true : false,
          showBtns: false,
          flowTranId: this.$businessCode.rwgl //流程交易线    chai
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
     // 预览
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
          this.$businessCode.rwglfj
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
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "后端获取文件失败",
                duration: 1000
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
.team {
  display: flex;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  font-size: 14px;
  color: #606266;
  .teamname {
    margin-right: 10px;
    // margin-left: 20px;
  }
}
/deep/ .el-form-item__label {
  text-align: center;
}
/deep/ .notice .el-form-item__label {
  width: 110px !important;
}
.update {
  display: flex;
  /deep/ .el-upload__tip {
    margin-top: 0;
  }
}
.tableDate {
  display: flex;
  width: 100%;
  .star {
    color: #f00;
    // margin-left: 5px;
    // font-size: 18px;
  }
}
/deep/ .el-input__inner {
  border: none;
}
/deep/.el-upload-list {
  height: 100px;
  border: 1px solid #eee;
  background: #fff;
  margin-top: 10px;
  overflow-y: scroll;
}
.text {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .spanname {
    margin-right: 10px;
  }
}
/deep/.msginput {
  // margin-left: 65px;
  height: 50px;
  margin-top: 10px;
  .el-input__inner {
    height: 100%;
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