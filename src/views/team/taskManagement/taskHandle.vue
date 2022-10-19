<template>
  <div>
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back" @click="closeHandler = true">
          <i class="el-icon-arrow-left"></i>任务办理
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
          <el-button plain @click="preserve" v-show="isShow" v-preventClick>保存</el-button>
          <el-button plain @click="update" v-show="isShow" v-preventClick>提交</el-button>
          <el-button plain @click="deliver" v-show="updateshow" v-preventClick>转交</el-button>
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
      style="width:70%;margin:0 auto;border:1px solid #BFBFBF;;padding:30px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="任务名称" prop="taskname">
            <el-input v-model="formData.TaskSaveVO.taskname" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="派发人" prop="createname">
            <el-input v-model="formData.TaskSaveVO.createname" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="table_scroll">
        <div class="team">
          <span class="teamname">{{formData.TaskSaveVO.teamname}}</span>
          <span>任务分配单</span>
        </div>
        <el-table
          :data="tableData"
          style="width:100%;text-align:center"
          border
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :tree-props="{children: 'list', hasChildren: 'hasChildren'}"
          row-key="id"
          :default-expand-all="true"
        >
          <el-table-column prop="customIndex" label="任务编号" width="80"></el-table-column>
          <el-table-column prop="ordername" label="任务简称" show-overflow-tooltip width="120">
            <template slot-scope="scope" style="display:flex">
              <el-tooltip class="item" effect="dark" content="添加子任务" placement="bottom">
                <el-button
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="addChildTask(scope.row)"
                  :disabled="scope.row.status=='5' ? true:false"
                  v-if="scope.row.pid!==''||scope.row.status=='8'|| scope.row.status=='6'|| scope.row.status=='4'||  !matchNoWuserId(scope.row.personid) && !matchNoWuserId(scope.row.createUserId) || scope.row.status=='3'&&matchNoWuserId(scope.row.personid)  ? false:true"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击进入该任务页面" placement="bottom">
                <el-button
                  type="text"
                  :disabled="scope.row.id==taskdetail.taskOrderId||scope.row.status=='5' ? true:false"
                  @click="toOrder(scope.row)"
                >{{ scope.row.ordername }}</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="createname" label="派发人" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="dialog1 = true">{{ scope.row.createname }}</el-button>
              <el-dialog
                title="派发人"
                :visible.sync="dialog1"
                width="30%"
                :before-close="handleClose"
              >
                <span>{{ scope.row.createname }}</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialog1 = false">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column prop="orderdetail" label="任务详情" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="dialog2 = true">{{ scope.row.orderdetail }}</el-button>
              <el-dialog
                title="任务详情"
                :visible.sync="dialog2"
                width="30%"
                :before-close="handleClose"
              >
                <span>{{ scope.row.orderdetail }}</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialog2 = false">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column prop="startime" label="任务开始时间" width="150"></el-table-column>
          <el-table-column prop="endtime" label="任务截止时间" width="150"></el-table-column>
          <el-table-column prop="person" label="任务责任人" width= "!show ? 120 : auto"></el-table-column>
          <el-table-column prop="progress" label="任务进度" width= "!show ? 120 : auto">
            <template slot-scope="scope">
              <div
                v-if="scope.row.status=='2' && matchNoWuserId(scope.row.personid) ||scope.row.status=='6' && matchNoWuserId(scope.row.personid) || scope.row.status=='7' && scope.row.progress!=='100'&&(matchNoWuserId(scope.row.personid)&&scope.row.personid!==scope.row.createUserId) ? true:false"
              >
                <el-input
                  v-model.number="scope.row.progress"
                  class="inputPro"
                  oninput="if(value>100)value='';if(value<0)value=0;value=value.replace(/[^\d]/g,'')"
                  :min="0"
                  :max="100"
                ></el-input>
                <span>%</span>
              </div>
              <span v-else>
                {{scope.row.progress}}
                <span v-if="!scope.row.progress? false:true">%</span>
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="date" label="任务提交件">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                v-if="(scope.row.status=='2'||scope.row.status=='6')&& scope.row.personid==userInfo.humanId? true:false"
              >上传</el-button>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" v-if="!show">
            <template slot-scope="scope">
              <!--抄送人 not show-->
              <!--<div
                v-if="(scope.row.status=='7'||scope.row.status=='6'||scope.row.status=='2')&& scope.row.copyid==userInfo.humanId?true:false"
              >-->
              <div
                v-if="(scope.row.status=='7'||scope.row.status=='6'||scope.row.status=='2')&& scope.row.createUserId==userInfo.humanId?true:false"
              >
                <el-button @click="callback(scope.row)" type="text" size="small">收回</el-button>
                <el-button type="text" size="small" @click="press(scope.row)">催办</el-button>
              </div>
              <div v-if="scope.row.status=='3'&&!formData.TaskSaveVO.copyId &&scope.row.progress?true:false">
                <el-button @click="agree(scope.row)" type="text" size="small">同意</el-button>
                <el-button type="text" size="small" @click="returnTask(scope.row)">退回</el-button>
              </div>
              <div v-if="scope.row.status=='1'||scope.row.status=='5'?true:false"></div>
            </template>
            <!-- <template slot-scope="scope" v-if="scope.row.status=='3'? true:false"></template> -->
          </el-table-column>
        </el-table>
         </el-col>
      </el-row>
      <!-- <el-row style="margin-top:10px">
        <el-button type="primary">汇总提交件</el-button>
      </el-row> -->
      <el-row style="margin-top:20px">
        <el-col :span="12">
          <el-form-item label="创建时间" prop="layouttime">
            <el-input disabled v-model="formData.TaskSaveVO.layouttime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="notice" label="任务通知方式" prop="resource">
            <el-radio-group v-model="formData.TaskSaveVO.noticetype">
              <el-radio :label="formData.TaskSaveVO.noticetype">应用内</el-radio>
              <el-radio disabled :label="2">短信</el-radio>
              <el-radio disabled :label="3">电话</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="抄送人">
          <el-input v-model="formData.TaskSaveVO.copyname" disabled style="width:40%"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件">
            <el-card class="box-card">
              <el-scrollbar>
                <div v-for="item in uploadFileList" :key="item.id" class="tree_w">
                  <template>
                    <div class="command_wrap">
                      <!-- <span class="name down" @click="downFile(item)">{{item.fileName}}</span> -->
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
                                @click.native="downRow(item,'up')"
                                v-if="fromdata.attchmentFileInfo.length>1"
                                :disabled="index==0  || fromdata.isLock == 1 || uploadConfig.subTempAddF"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(item,'down')"
                                v-if="fromdata.attchmentFileInfo.length>1"
                                :disabled="(index==fromdata.attchmentFileInfo.length-1)  || (fromdata.isLock == 1) || uploadConfig.subTempAddF"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id)"
                                :disabled="item.disabled || fromdata.isLock == 1 || uploadConfig.subTempAddF"
                                round
                              >删除</el-button> -->
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
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="办理情况">
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
      <el-form-item label="消息交流">
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
      </el-form-item>
    </el-form>
    <!-- 退回弹窗 -->
    <el-dialog title="退办信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form
        :model="returnTaskParams"
        :rules="ruler"
        ref="returnTaskParams"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="退回原因" prop="returncause">
          <el-input v-model="returnTaskParams.returncause"></el-input>
        </el-form-item>
        <el-form-item label="具体要求" prop="returndetial">
          <el-input v-model="returnTaskParams.returndetial"></el-input>
        </el-form-item>
        <el-form-item label="任务责任人" prop="personnew">
          <el-select
            v-model="returnTaskParams.personnew"
            placeholder="请选择"
            @change="checkchange"
          >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
              no-data-text="请选择"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitReturn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 转交弹窗 -->
    <el-dialog title="转交信息" :visible.sync="dialogDliver" width="30%" :before-close="handleClose">
      <el-form
        :model="deliverParams"
        :rules="rule"
        ref="deliverParams"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="转交原因" prop="transfercause">
          <el-input v-model="deliverParams.transfercause"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="deliverParams.transferdetial"></el-input>
        </el-form-item>
        <el-form-item label="任务责任人" prop="person">
          <el-select
            v-model="deliverParams.person"
            placeholder="请选择"
            clearable
            @change="checkchange"
          >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
              no-data-text="请选择"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDliver = false">取 消</el-button>
        <el-button type="primary" @click="submitDeliver">确 定</el-button>
      </span>
    </el-dialog>
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

import closeMessage from 'components/closeMessage/index';
export default {
  components: {
    closeMessage
  },
  data() {
    return {
      closeHandler:false,
      showCloseDialog:false,
      uploadFileList: [],
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      isShow: false,//保存,提交按钮
      dialog1: false,
      dialog2: false,
      show: false,//表格操作栏
      btnShow: false,
      dialogVisible: false,
      dialogDliver: false,
      updateshow: false,//转交按钮
      title: "",
      //任务详情
      taskdetail: {
        function: "getTaskDetail",
        taskid: ""
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
      callbackParams: {
        function: "getTaskOrderListOnly",
        id: ""
      },
      //收回
      returnParams: {
        function: "returnTaskOrder",
        status: 5,
        taskorderid: ""
      },
      //催办
      press_params: {
        function: "remind",
        taskOrderId: ""
      },
      //保存
      saveParams: {
        function: "saveTaskOrderList",
        taskOrderJson: [
          {
            progress: "",
            id: "",
            fileids: "",
            filesSort: [],
            delFileIds: "",
            send: 0
          }
        ]
      },
      //退回
      returnTaskParams: {
        function: "returnTaskOrder",
        status: 6,
        taskorderid: "",
        returncause: "",
        requestdetial: "",
        person: "",
        personid: "",
        personidnew: "",
        personnew: ""
      },
      userParams: {
        function: "findBySuperTeamId",
        teamId: ""
      },
      //转交
      deliverParams: {
        function: "returnTransferOrder",
        taskOrderId: "",
        transfercause: "",
        transferdetial: "",
        person: "",
        personid: ""
      },
      //表格数据
      tableData: [],
      //表单保存
      formData: {
        function: "saveTaskSaveOv",
        TaskSaveVO: {
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
              id: Math.floor(Math.random() * 20),
              pid: "",
              sort: "",
              person: "",
              personid: "",
              createname: "",
              ordername: "",
              orderdetail: "",
              startime: "",
              endtime: "",
              progress: ""
            }
          ]
        },
        orderdetail: "",
        delids: ""
      },
      handlelist: [],//办理情况
      newslist: [],//消息
      rules: {
        taskname: [{ required: true, message: "必填项", trigger: "blur" }],
        createname: [{ required: true, message: "必填项", trigger: "blur" }],
        ordername: [{ required: true, message: "必填项", trigger: "blur" }],
        person: [{ required: true, message: "必填项", trigger: "blur" }],
        layouttime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        noticetype: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      rule: {
        transfercause: [
          { required: true, message: "原因不能为空", trigger: "blur" }
        ],
        person: [{ required: true, message: "请选择任务责任人" }]
      },
      ruler: {
        returncause: [
          { required: true, message: "原因不能为空", trigger: "blur" }
        ],
        returndetial: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        personnew: [{ required: true, message: "请选择任务责任人" }]
      },
      currentUsers: [],
      fileList: [],//附件
      userInfo: {},
      userList: [],//任务责任人
      haveRead:"true"
    };
  },
  created() {
    this.haveRead = this.$route.query.haveRead
      ? this.$route.query.haveRead
      : "false";
    console.log(this.haveRead)
    this.getTaskDetail();
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getHandleList();
    this.getNewsList();
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
    //匹配当前人部门id
    matchNoWuserId(id){
      return this.currentUsers.includes(id);
    },
    //任务详情
    getTaskDetail() {
      // this.taskdetail.status = this.$route.query.status;
      if (this.$route.query.taskOrderId) {
        delete this.taskdetail.taskid;
        this.$set(
          this.taskdetail,
          "taskOrderId",
          this.$route.query.taskOrderId
        );
      } else {
        this.taskdetail.taskid = this.$route.query.taskid;
      }
      console.log(this.taskdetail);
      this.$post
        .postData(
          "getTaskDetail",
          JSON.stringify(this.taskdetail),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          Object.assign(this.formData.TaskSaveVO, res.data.task);
          // this.formData.TaskSaveVO = res.data.task;
          this.formData.TaskSaveVO.taskOrderJson = res.data.taskOrder;
          this.title = this.formData.TaskSaveVO.taskname;
          this.uploadFileList = res.data.file_list;
          var taskOrder = res.data.taskOrder;
          this.currentUsers = res.data.currentUsers;
          taskOrder.forEach((el, i) => {
            this.tableData.push(taskOrder[i]);
            // console.log(this.tableData)
            //表格数据处理
            this.tableData.forEach((item, index) => {
              item.list = [];
              // item.progress = '';
              if (!item.progress && this.matchNoWuserId(item.personid)) {
                this.$set(item, "progress", "");
              }
              var subOrder = res.data[item.id];
              // console.log(subOrder)
              subOrder.forEach((e, j) => {
                item.list.push(subOrder[j]);
                item.list.forEach(ele => {
                  ele.customIndex = "";
                });
              });
            });
          });
          console.log(this.tableData);
          this.setIndex(this.tableData);
          // 状态判断
          this.tableData.forEach((el, i) => {
            el.createname = this.formData.TaskSaveVO.createname;
            console.log(this.tableData[i]);
            if (
              ( this.matchNoWuserId(this.tableData[i].personid) &&
                this.tableData[i].status == "2") ||
              (this.matchNoWuserId(this.tableData[i].personid) &&
                this.tableData[i].status == "6")
            ) {
              this.isShow = true;
            }
            if (
              (this.tableData[i].personid == this.tableData[i].createUserId &&
                this.matchNoWuserId(this.tableData[i].personid) &&
                this.tableData[i].status == "2") ||
              (this.tableData[i].personid == this.tableData[i].createUserId &&
                this.matchNoWuserId(this.tableData[i].personid) &&
                el.status == "6")
            ) {
              this.isShow = true;
              this.show = true;
            } else if (
              this.tableData[i].personid == this.tableData[i].createUserId &&
              el.status == "7"
            ) {
              this.show = true;
              this.isShow = false;
            }
            if (
              this.matchNoWuserId(el.personid) &&
              this.tableData[i].personid !== this.tableData[i].createUserId
            ) {
              if (
                (el.status == "7" && el.progress !== "100") ||
                el.status == "6"
              ) {
                this.isShow = true;
                this.show = true;
              } else {
                this.show = true;
                if( el.send == "0" && el.status == "7" ){
                  this.isShow = true;
                }
              }
              if (el.status == "3") {
                // this.isShow = false;
                this.show = true;
              }
              if (el.status == "2") {
                // this.isShow = true;
                this.show = true;
                if (this.$route.query.taskOrderId) {
                  this.updateshow = true;
                }
              }
            } else if (
              !this.matchNoWuserId(el.personid) &&
              !this.matchNoWuserId(el.createUserId) &&
              this.matchNoWuserId(el.copyid)
            ) {
              this.show = true;
            } else {
              if (this.$route.query.status == "4" || el.status == "8") {
                this.show = true;
                this.isShow = false;
              } else {
                // this.show = false;
                // this.isShow = false;
              }
            }
          });

          if(this.haveRead == 'false') {
            // window.location.href = "about:blank";
            window.opener.location.reload();
          }

        })
        .catch(err => {
          console.log(err);
        });
    },
    //表格数据分级1,1.1,1.2
    setIndex(data) {
      let queue = [...data];
      let loop = 0;
      while (queue.length > 0) {
        loop++;
        [...queue].forEach((child, i) => {
          queue.shift();
          if (loop == 1) {
            child.customIndex = i + 1 + "";
            child.currentIndex = i;
            child.path = i;
          }
          if (child.list && child.list.length > 0) {
            child.dataType = 1;
            for (var j = 0; j < child.list.length; j++) {
              child.list[j].currentIndex = j;
              child.list[j].customIndex = child.customIndex + "." + (j + 1);
              child.list[j].path = child.path + ".list." + j;
            }
            queue.push(...child.list);
          } else {
            child.dataType = 2;
          }
        });
      }
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
          console.log(res);
          this.handlelist = res.data;
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
          console.log(res);
          if (res.success) {
            this.$message({
              message: "发送成功!",
              type: "success"
            });
            this.newsParams.content = "";
            this.getNewsList();
          }
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
          console.log(res);
          this.newslist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //收回
    callback(row) {
      // this.callbackParams.id = row.id;
      // this.$post
      //   .postData(
      //     "getTaskOrderListOnly",
      //     JSON.stringify(this.callbackParams),
      //     this.$businessCode.rwgl
      //   )
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      if ( this.matchNoWuserId(row.createUserId)) {
        this.returnParams.taskorderid = row.id;
        // this.returnParams.status = row.status;
        this.$post
          .postData(
            "returnTaskOrder",
            JSON.stringify(this.returnParams),
            this.$businessCode.rwgl
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.$message({
                message: "收回成功!",
                type: "success"
              });

              setTimeout(function(){
                location.reload();
              }, 500);
              
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message.error("您没有审核该条任务的权限!");
      }
    },
    //催办
    press(row) {
      if (this.matchNoWuserId(row.createUserId)) {
        this.press_params.taskOrderId = row.id;
        this.$post
          .postData(
            "remind",
            JSON.stringify(this.press_params),
            this.$businessCode.rwgl
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.$message({
                message: "催办成功!",
                type: "success"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message.error("您没有审核该条任务的权限!");
      }
    },
    //同意
    agree(row) {
      if ( this.matchNoWuserId(row.createUserId)) {
        this.returnParams.taskorderid = row.id;
        this.returnParams.status = 4;
        this.$post
          .postData(
            "returnTaskOrder",
            JSON.stringify(this.returnParams),
            this.$businessCode.rwgl
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.$message({
                message: "处理成功!",
                type: "success"
              });
              setTimeout(function(){
                location.reload();
              }, 500);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message.error("您没有审核该条任务的权限!");
      }
    },
    //退回
    returnTask(row) {
      if ( this.matchNoWuserId(row.createUserId)) {
        this.dialogVisible = true;
        // 获取任务责任人
        this.returnTaskParams.personnew = row.person;
        this.returnTaskParams.personidnew = row.personid;
        // this.userParams.teamId = row.teamid;
        this.getUserList(row.teamid);
        this.returnTaskParams.taskorderid = row.id;
        this.returnTaskParams.person = row.person;
        this.returnTaskParams.personid = row.personid;
      } else {
        this.$message.error("您没有审核该条任务的权限!");
      }
    },
    getUserList(id) {
      // 获取任务责任人
      this.userParams.teamId = id;
      this.userParams.createUserId = this.$route.query.createUserId;
      this.$post
        .postData(
          "findBySuperTeamId",
          JSON.stringify(this.userParams),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          this.userList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkchange(val) {
      console.log(val);
      var list = this.userList.find(el => el.userId == val);
      // console.log(list);
      this.returnTaskParams.personnew = list.userName;
      this.returnTaskParams.personidnew = list.userId;
      this.deliverParams.person = list.userName;
      this.deliverParams.personid = list.userId;
    },
    submitReturn() {
      console.log(this.returnTaskParams);
      this.$refs["returnTaskParams"].validate(valid => {
        if (valid) {
          this.$post
            .postData(
              "returnTaskOrder",
              JSON.stringify(this.returnTaskParams),
              this.$businessCode.rwgl
            )
            .then(res => {
              console.log(res);
              if (res.success) {
                this.$message({
                  message: "退回成功!",
                  type: "success",
                  duration: 2000,
                  onClose: () => {
                    window.location.href = "about:blank";
                    window.opener.location.reload();
                    window.close();
                  }
                });
                this.dialogVisible = false;
                // this.$router.push("/myTask");
                // location.reload();
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
    //点击表格任务名称跳转
    toOrder(row) {
      console.log(row);
      if (row.status == "5") {
        console.log(1111111);
        this.$router.push({
          name: "addTask",
          query: { taskid: row.taskid, taskOrderId: row.id, status: 5 }
        });
      } else {
        this.$router.replace({
          path: "/taskHandle",
          query: {
            taskOrderId: row.id,
            teamId: row.teamid,
            taskid: row.taskid,
            createUserId: row.createUserId
          }
        });
        // const routeData = this.$router.resolve({
        //   name: "taskHandle",
        //   query: { taskOrderId: row.id, teamId: row.teamid, taskid: row.taskid }
        // });
        // window.open(routeData.href, "_self");
        location.reload();
        // this.getTaskDetail();
      }
    },
    //新增子任务
    addChildTask(row) {
      // sessionStorage.setItem("pid", JSON.stringify(id));
      this.$router.push({
        name: "addTask",
        query: { pid: row.id, teamid: row.teamid, personid: row.personid ,flag:'new'}
      });
    },
    // 返回上级页面
    goBack() {
      // this.$router.go(-1);
      window.location.href = "about:blank";
      // window.opener.location.reload();
      window.close();
    },
    // 关闭
     handleClose(val) {
      if(val=='1') {
        this.preserveAsync().then(save => {
          if(save) {
            window.location.href = "about:blank";
            window.close();
          }
        });
      } else if(val=='2') {
        window.location.href = "about:blank";
        window.close();
      } else {
        this.showCloseDialog = false;
      }
    },
    handelclose() {
      this.showCloseDialog = true;
    },
    //同步保存
    async preserveAsync(type) {
      let successState = false;
      let arr = [];
      this.tableData.forEach(el => {
        // console.log(el.progress);
        if (el.progress !== undefined) {
          var obj = {
            id: el.id,
            progress: el.progress,
            fileids: "",
            filesSort: [],
            delFileIds: "",
            send: 0
          };
          arr.push(obj);
        }
      });
      this.saveParams.taskOrderJson = arr;
      if (this.saveParams.taskOrderJson.length > 0) {
        for (var a = 0; a < this.saveParams.taskOrderJson.length; a++) {
          if (this.saveParams.taskOrderJson[a].progress == ""&&this.tableData[a].status!=5&&this.tableData[a].status!=3) {
            this.$message.error("任务进度不能为空!");
            return false;
          }
        }
      } else {
        this.$message.error("任务进度不能为空!");
        return false;
      }
      await this.$post
        .postData(
         "saveTaskOrderList",
          JSON.stringify(this.saveParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          if (res && res.success) {
            window.opener&&window.opener.location.reload();
            successState = true;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "保存失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 2000
          });
        });
      return successState;
    },
    //保存
    preserve() {
      console.log(this.tableData);
      let arr = [];
      this.tableData.forEach(el => {
        // console.log(el.progress);
        if (el.progress !== undefined) {
          var obj = {
            id: el.id,
            progress: el.progress,
            fileids: "",
            filesSort: [],
            delFileIds: "",
            send: 0
          };
          arr.push(obj);
        }
      });
      console.log(this.tableData);
      console.log(arr);
      this.saveParams.taskOrderJson = arr;
      console.log(this.saveParams.taskOrderJson);
      if (this.saveParams.taskOrderJson.length > 0) {
        for (var a = 0; a < this.saveParams.taskOrderJson.length; a++) {
          if (this.saveParams.taskOrderJson[a].progress == ""&&this.tableData[a].status!=5&&this.tableData[a].status!=3) {
            debugger
            this.$message.error("任务进度不能为空!");
            return;
          }
        }
      } else {
        this.$message.error("任务进度不能为空!");
        return;
      }
      console.log(this.saveParams.taskOrderJson);
      this.$post
        .postData(
          "saveTaskOrderList",
          JSON.stringify(this.saveParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: "保存成功!",
              type: "success"
            });
           setTimeout(function(){
                location.reload();
              }, 500);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //提交
    update() {
      let arr1 = [];
      this.tableData.forEach(el => {
        if (el.progress !== undefined) {
          var obj = {
            id: el.id,
            progress: el.progress,
            fileids: "",
            filesSort: [],
            delFileIds: "",
            send: 1,
            status:el.status
          };
          arr1.push(obj);
        }
      });
      console.log(arr1);
      this.saveParams.taskOrderJson = arr1;
      if (this.saveParams.taskOrderJson.length > 0) {
        for (var a = 0; a < this.saveParams.taskOrderJson.length; a++) {
          if (this.saveParams.taskOrderJson[a].progress == ""&&this.tableData[a].status!=5&&this.tableData[a].status!=3) {
            this.$message.error("任务进度不能为空!");
            return;
          }
        }
      } else {
        this.$message.error("任务进度不能为空!");
        return;
      }
      console.log(this.saveParams.taskOrderJson);
      this.$post
        .postData(
          "saveTaskOrderList",
          JSON.stringify(this.saveParams),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: "提交成功!",
              type: "success",
              duration: 2000,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //转交
    deliver() {
      this.dialogDliver = true;
      this.getUserList(this.$route.query.teamId);
    },
    submitDeliver() {
      this.deliverParams.taskOrderId = this.$route.query.taskOrderId;
      console.log(this.deliverParams);
      if (this.deliverParams.person == "") {
        this.$message({
          message: "请选择任务责任人!",
          type: "warning"
        });
        return;
      }
      this.$refs["deliverParams"].validate(valid => {
        if (valid) {
          this.$post
            .postData(
              "returnTransferOrder",
              JSON.stringify(this.deliverParams),
              this.$businessCode.rwgl
            )
            .then(res => {
              console.log(res);
              if (res.success) {
                this.$message({
                  message: "转交成功!",
                  type: "success",
                  duration: 2000,
                  onClose: () => {
                    window.location.href = "about:blank";
                    window.opener.location.reload();
                    window.close();
                  }
                });
                this.dialogDliver = false;
                // this.goBack();
                // location.reload();
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
    handleClose() {
      this.dialogVisible = false;
      this.dialogDliver = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
          pageFlag: "taskHandlePage",
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
                duration: 1000
              });
            }
          }
        });
    },
    //附件下载
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
              downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName, file.fileName);
              // location.href =
              //   "http://localhost:8080/ecpweb/getLocalFile.action?relativePath=" +
              //   res.filePath +
              //   "&fileName=" +
              //   res.fileName;
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
/deep/ .el-table td {
  text-align: center;
}
/deep/ .el-table th {
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
// /deep/ .el-input__inner {
//   border: none;
// }
/deep/.inputPro {
  width: 70px;
  border: none;
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
.table_scroll ::-webkit-scrollbar {
  display: inline-block;
  width: 5px;
  height: 7px;
}
</style>