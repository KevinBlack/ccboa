/**
 * create by lyl on 2020/12/18 16:13
 * 类注释：秘书工作-管理员权限-电话记录单详情
 * 备注：
 */
 <template>
  <div class="adminDetail">
    <div>
      <!-- <i class="el-icon-arrow-left">电话记录单</i> -->
      <!-- <span class="title"></span> -->
      <!-- <div class="btn">
        <template>
          <el-button
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.name)"
            :key="index"
            v-show="buttonList[index].show"
            size="mini"
            plain
          >{{item.name}}</el-button>
        </template>
      </div>-->
      <div class="headerClick">
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div class="shiwuTitle">{{dataForm.draftOrgan}}电话记录单</div>
    <div class="container" id="loadPdf">
      <div class="c-header">
        <span style="margin-left: 16px;">当前环节:</span>
        <span style="color: #f60; color: red !important;">{{dataForm.currentNode}}</span>
        <span style="margin-left: 30px;">当前处理人:</span>
        <span style="color: #f60; color: red !important;">{{dataForm.currentUser}}</span>
      </div>
      <el-form
        label-position="right"
        id="aaa"
        class="dataForm"
        label-width="80px"
        style="margin-top: 30px;"
        :rules="rules"
        ref="dataForm"
        :model="dataForm"
      >
        <el-row v-if="actionType == '2' ">
          <el-col :span="12">
            <el-form-item label="是否归档" prop="isFile">
              <el-radio-group v-model="dataForm.isFile" :disabled="disabled">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否抽取" prop="isChouQu">
              <el-radio-group v-model="dataForm.isChouQu" :disabled="disabled">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="documentNo">
              <el-input v-model="dataForm.documentNo" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="createDate">
              <el-input v-model="dataForm.createDate" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-input v-model="dataForm.startTime" :disabled="readFields.sTime || disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-input v-model="dataForm.endTime" :disabled="readFields.eTime || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="通话单位" prop="title">
              <el-input v-model="dataForm.title" :disabled="readFields.Title || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="来电人员" prop="callPle">
              <el-input v-model="dataForm.callPle" :disabled="readFields.callPeople || disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来电人员电话" label-width="120px" prop="callTel">
              <el-input v-model="dataForm.callTel" :disabled="readFields.callTel || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="记录人员" prop="creator">
              <el-input v-model="dataForm.creator" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="记录人员电话" label-width="120px" prop="tel">
              <el-input v-model="dataForm.tel" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="通话内容" prop="callContent">
          <el-input v-model="dataForm.callContent" :disabled="readFields.callContent || disabled"></el-input>
        </el-form-item>
        <el-form-item label="办理部门" prop="hqDept">
          <template v-if="readFields.hqDept || disabled">
            <div style="border:1px solid #E4E7ED;background:rgba(224, 224, 224, 0.34);">
              <span
                v-for="(item, index) in hqDeptData"
                :key="index"
                :class="{actColor: item.colorStyle}"
              >{{item.hqDept}}{{hqDeptData[index + 1] ? '，' : ''}}</span>
            </div>
          </template>
          <template v-else>
            <el-select
              v-model="hqDeptData"
              placeholder="请选择"
              style="width:100%"
              :disabled="true"
              value-key="hqDeptId"
              multiple
              @change="selectChange"
            >
              <el-option
                v-for="item in hqDepts"
                :key="item.hqDeptId"
                :label="item.hqDept"
                :value="item"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <!--     领导批示     -->
        <admin-conp
          lableTitle="领导批示"
          prop="leaderIdea"
          :formadatalist="dataForm.leaderIdeaList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'3'"
          formID="LD"
          suggestionType="0"
        ></admin-conp>
        <!--     处理意见     -->
        <admin-conp
          lableTitle="处理意见"
          prop="proIdea"
          :formadatalist="dataForm.receiveIdeaList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'3'"
          formID="SW"
          suggestionType="1"
        ></admin-conp>
        <!--     过程意见     -->
        <admin-conp
          lableTitle="过程意见"
          prop="processIdea"
          :formadatalist="dataForm.processIdeaList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'3'"
          formID="GC"
          suggestionType="2"
        ></admin-conp>
        <!--     部门办理情况     -->
        <admin-conp
          lableTitle="部门办理情况"
          prop="deptIdea"
          :formadatalist="dataForm.deptIdeaList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'3'"
          formID="BM"
          suggestionType="5"
        ></admin-conp>
        <!--     备注区域     -->
        <admin-conp
          lableTitle="备注"
          prop="remark"
          :formadatalist="dataForm.remarkList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'3'"
          formID="BZ"
          suggestionType="4"
        ></admin-conp>
        <!-- <admin-conp
          lableTitle="办理单备注"
          prop="remarkDeal"
          :formadatalist="dataForm.remarkDealList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'3'"
          formID="BL"
          suggestionType="6"
        ></admin-conp>-->
        <el-form-item label="附件" prop="attachid">
          <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>

          <!-- <el-row v-if="dataForm.attchmentFileInfo&&dataForm.attchmentFileInfo.length">
            <el-form-item>
              <el-col :span="24">
                <div
                  class="tree_w"
                  v-if="dataForm.attchmentFileInfo&&dataForm.attchmentFileInfo.length"
                >
                  <el-scrollbar>
                    <div
                      v-for="(item,index) in  dataForm.attchmentFileInfo"
                      :key="item.id"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_file">
                          <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="upRow(index,QS)"
                              v-if="dataForm.attchmentFileInfo.length>1"
                              :disabled="index==0"
                              round
                            >上移</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(index,QS)"
                              v-if="dataForm.attchmentFileInfo.length>1"
                              :disabled="index==dataForm.attchmentFileInfo.length-1"
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
            </el-form-item>
          </el-row>-->

          <upfileList :canmoveOrdown="!disabled" label :fileList="dataForm.attchmentFileInfo"></upfileList>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="办理状态" :visible.sync="handleStateDialog" center>
      <el-table :data="stateData">
        <el-table-column prop="TMS" label="发送时间" width="200"></el-table-column>
        <el-table-column prop="UNITNM" label="部门" width="200"></el-table-column>
        <el-table-column prop="STATUS" label="办理状态"></el-table-column>
        <el-table-column prop="AVYEXCTRNM" label="处理人" width="200"></el-table-column>
        <el-table-column prop="ENDTM" label="结束时间"></el-table-column>
      </el-table>
    </el-dialog>
    <select-person
      v-model="dialogState"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    />
    <checkFlowDialog :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></checkFlowDialog>
  </div>
</template>

  <script >
import adminConp from "views/bianhan/components/suggisitionAreaConp";
import checkFlowDialog from "@/components/viewFlow/shiwuFlow";
import selectPerson from "components/viewFlow/dispatchTree";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import upfileList from "../components/showUploadFile"; //附件展示
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/phonenote.js";
import minixs from "@/minixs/index";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "adminDetail",
  components: {
    uploadFileTs,
    selectPerson,
    checkFlowDialog,
    adminConp,
    upfileList
  },
  mixins: [minixs,viewDraft],

  data() {
    return {
      numYear: '', // 编号年份 默认 空字符
      isDispatch: false,
      handleStateDialog: false,
      showFlowChart: false,
      isSaved: false,
      loadingTree: false,
      hqDepts: {},
      hqDeptData: [],
      stateData: [
        {
          TMS: "2020-10-20",
          UNITNM: "",
          STATUS: "",
          AVYEXCTRNM: "",
          ENDTM: ""
        }
      ],
      tableData: [],
      actionType: "1",
      disabled: false,
      id: "",
      statusType: "",
      fileArr: [],
      identify: 0,
      rules: {},
      //人员数相关配置
      canTab: false,
      dialogVisible: false,
      treeData: [{ name: "中国建设银行", id: "007" }],
      seletOptionsData: [],
      offenUse: true,
      dialogType: "dosend",
      dialogTypeNow: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false, //显示隐藏
      dataForm: {
        currentNode: "",
        currentNodeId: "",
        currentUser: "",
        documentNo: "",
        isFile: "",
        isChouQu: "",
        createDate: "",
        startTime: "",
        endTime: "",
        callPle: "",
        callTel: "",
        creator: "",
        tel: "",
        fromDept: "",
        fileCode: "",
        title: "",
        hqDept: "",
        leaderIdea: "",
        receiveIdea: "",
        processIdea: "",
        callContent: "",
        remark: "",
        attachId: "",
        isReadFlag: "",
        remarkList: [],
        receiveIdeaList: [],
        processIdeaList: [],
        leaderIdeaList: [],
        deptIdeaList: []
      },
      uploadConfig: {
        id: "",
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      //流程环节信息
      flowLinkInfo: {},
      buttonList: [
        { name: "关闭", type: "close", show: true },
        { name: "保存", type: "save", show: false },
        { name: "查看办理状态", type: "checkHandleState", show: true },
        { name: "归档", type: "guidang", show: true },
        { name: "区块链归档", type: "qukuailianguidang", show: true },
        { name: "查看流程", type: "checkFlow", show: true },
        { name: "打印处理单", type: "printHandleNote", show: true },
        { name: "收藏", type: "sc", show: false },
        { name: "操作指南", type: "operatorGuide", show: true },
        { name: "维护", type: "maintain", show: true },
        { name: "流程调度", type: "flowDispatch", show: true }
      ],
      //不可编辑控制域
      readFields: {
        sTime: false, //开始时间
        eTime: false, //结束时间
        Title: false, //通话单位
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false, //日程
        callPeople: false, //来电人员
        callTel: false, //来电人员电话
        Creator: false, //记录人员
        Tel: false, //记录人员电话
        callContent: false //通话内容
      },
      //必填控制域
      requiredFields: {
        sTime: false, //开始时间
        eTime: false, //结束时间
        Title: false, //通话单位
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false, //日程
        callPeople: false, //来电人员
        callTel: false, //来电人员电话
        Creator: false, //记录人员
        Tel: false, //记录人员电话
        callContent: false //通话内容
      },
      //可编辑意见域
      editedIdeaFields: {
        LDidea_1: true, //领导批示
        Proidea_1: true, //处理意见
        Gcyjidea_1: true, //过程意见
        zzyj: true, //部门办理情况
        Remark_1: true //备注
      },
      //必填意见域
      requiredIdeaFields: {
        LDidea_1: false, //领导批示
        Proidea_1: false, //处理意见
        Gcyjidea_1: false, //过程意见
        zzyj: false, //部门办理情况
        Remark_1: false //备注
      }
    };
  },
  mounted() {},
  computed: {},
  created() {
    const query = this.$route.query
    this.numYear = query.numYear || ''
    this.actionType = this.$route.query.identify;
    console.log(this.actionType, "this.actionType");

    // sessionStorage.setItem("todoItem", JSON.stringify(todoItem));
    if (this.actionType === "5") {
      this.getHandleDeps();
      this.getControlArea();
    } else {
      if (this.actionType === "2") {
        const flowDispatchIndex = this.buttonList.findIndex(item => item.type === "flowDispatch");
        const maintainIndex = this.buttonList.findIndex(item => item.type === 'maintain')
        if (query.numYear) {
          this.buttonList[maintainIndex].show = false
        }
        this.buttonList[flowDispatchIndex].show = false; //{ name: "流程调度", type: "flowDispatch", show: true }, { name: "收藏", type: "sc", show: false },
        this.buttonList[3].show = true;
      }
      if (this.actionType === "1") {
        this.buttonList[3].show = false;
      }
      const scIndex = this.buttonList.findIndex(item => item.type === "sc");
      this.buttonList[scIndex].show = true;
      this.id = this.$route.query.id;
      if (this.id) {
        this.uploadConfig.id = this.id;
      }
      this.getDetailIfo();
    }
  },
  methods: {
    delItem(val) {
      if (val.id) {
        apis
          .adminPhoneNoteDel({ id: val.id })
          .then(res => {
            if ((res.code = "SUCCESS")) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getDetailIfo()
            }
          })
          .catch(err => {
            this.$message({
              type: "success",
              message: err.msg
            });
          });
      } else {
        val.arrayList.pop(1);
      }
    },
    //设置部门名称
    selectChange() {
      const hqDept = this.dataForm.hqDept;
      this.dataForm.hqDeptId = hqDept.hqDeptId;
      this.dataForm.hqDept = hqDept.hqDept;

      console.log("----设置部门名称------->", this.dataForm.hqDept);
    },
    //初始化校验规则
    initRules() {
      this.rules = {
        startTime: [
          {
            required: this.requiredFields.sTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: this.requiredFields.eTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        hqDept: [
          {
            required: this.requiredFields.hqDept,
            message: "不能为空",
            trigger: "change"
          }
        ],
        documentNo: [
          {
            required: this.requiredFields.Findex,
            message: "不能为空",
            trigger: "change"
          }
        ],
        createDate: [
          {
            required: this.requiredFields.createDate,
            message: "不能为空",
            trigger: "change"
          }
        ],
        title: [
          {
            required: this.requiredFields.Title,
            message: "不能为空",
            trigger: "change"
          }
        ],
        callPle: [
          {
            required: this.requiredFields.callPeople,
            message: "不能为空",
            trigger: "change"
          }
        ],
        callTel: [
          {
            required: this.requiredFields.callTel,
            message: "不能为空",
            trigger: "change"
          }
        ],
        creator: [
          {
            required: this.requiredFields.Creator,
            message: "不能为空",
            trigger: "change"
          }
        ],
        tel: [
          {
            required: this.requiredFields.Tel,
            message: "不能为空",
            trigger: "change"
          }
        ],
        attachid: [
          {
            required: this.requiredFields.attachid,
            message: "不能为空",
            trigger: "change"
          }
        ], //附件ID

        deptIdea: [
          {
            required: this.requiredIdeaFields.zzyj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        leaderIdea: [
          {
            required: this.requiredIdeaFields.LDidea_1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        proIdea: [
          {
            required: this.requiredIdeaFields.Proidea_1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        processIdea: [
          {
            required: this.requiredIdeaFields.Gcyjidea_1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: this.requiredIdeaFields.Remark_1,
            message: "不能为空",
            trigger: "change"
          }
        ]
      };
    },
    //按钮控制
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.onClose();
          break;
        case "保存":
          this.save();
          break;
        case "完成并发送":
          this.send("完成并发送");
          break;
        case "办结":
          this.send("办结");
          break;
        case "查看流程":
          this.checkFlow();
          break;
        case "生成编号":
          this.buildNo();
          break;
        case "查看办理状态":
          this.checkState();
          break;
        case "打印处理单":
          this.onPrint();
          break;
        case "归档":
          apis.binLog({ id: this.id, numYear: this.numYear }).then(res => {
            this.$message({
              type: "success",
              message: res.msg
            });
          });
          break;
        case "区块链归档":
          apis.newBinLog({ id: this.id, numYear: this.numYear }).then(res => {
            this.$message({
              type: "success",
              message: "归档成功"
            });
          });
          break;
        case "操作指南":
          this.handBook("MSGZ");
          break;
        case "流程调度":
          this.send("流程调度");
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              apis.collecTion({ id: this.id, numYear: this.numYear }).then(res => {
                this.downFile(res);
              });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
          break;
        case "发送办理部门":
          this.toHandleDep();
          break;
        case "维护":
          const saveIndex = this.buttonList.findIndex(
            item => item.type === "save"
          );
          this.buttonList[saveIndex].show = true;
          this.disabled = false;
          this.statusType = "2";
          this.getHandleDeps();
          break;

        default:
          break;
      }
    },
    // 附件上传下载排序
    upRow(n, huanjie) {
      let midObj;
      let attachSort = [];
      switch (huanjie) {
        case "QS":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfo[n - 1].id,
              sort: this.dataForm.attchmentFileInfo[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfo[n].id,
              sort: this.dataForm.attchmentFileInfo[n - 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfo[n];
          this.dataForm.attchmentFileInfo[n] = this.dataForm.attchmentFileInfo[
            n - 1
          ];
          this.dataForm.attchmentFileInfo[n - 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
        case "PZ":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfoPZ[n - 1].id,
              sort: this.dataForm.attchmentFileInfoPZ[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfoPZ[n].id,
              sort: this.dataForm.attchmentFileInfoPZ[n - 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfoPZ[n];
          this.dataForm.attchmentFileInfoPZ[
            n
          ] = this.dataForm.attchmentFileInfoPZ[n - 1];
          this.dataForm.attchmentFileInfoPZ[n - 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
        case "SP":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfoSP[n - 1].id,
              sort: this.dataForm.attchmentFileInfoSP[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfoSP[n].id,
              sort: this.dataForm.attchmentFileInfoSP[n - 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfoSP[n];
          this.dataForm.attchmentFileInfoSP[
            n
          ] = this.dataForm.attchmentFileInfoSP[n - 1];
          this.dataForm.attchmentFileInfoSP[n - 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
      }
    },

    downRow(n, huanjie) {
      let midObj;
      let attachSort = [];
      console.log(n, "huanjie", huanjie);
      switch (huanjie) {
        case "QS":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfo[n + 1].id,
              sort: this.dataForm.attchmentFileInfo[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfo[n].id,
              sort: this.dataForm.attchmentFileInfo[n + 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfo[n];
          this.dataForm.attchmentFileInfo[n] = this.dataForm.attchmentFileInfo[
            n + 1
          ];
          this.dataForm.attchmentFileInfo[n + 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
        case "PZ":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfoPZ[n + 1].id,
              sort: this.dataForm.attchmentFileInfoPZ[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfoPZ[n].id,
              sort: this.dataForm.attchmentFileInfoPZ[n + 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfoPZ[n];
          this.dataForm.attchmentFileInfoPZ[
            n
          ] = this.dataForm.attchmentFileInfoPZ[n + 1];
          this.dataForm.attchmentFileInfoPZ[n + 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
        case "SP":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfoSP[n + 1].id,
              sort: this.dataForm.attchmentFileInfoSP[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfoSP[n].id,
              sort: this.dataForm.attchmentFileInfoSP[n + 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfoSP[n];
          this.dataForm.attchmentFileInfoSP[
            n
          ] = this.dataForm.attchmentFileInfoSP[n + 1];
          this.dataForm.attchmentFileInfoSP[n + 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
      }
    },
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$post
          .postData(
            "deleteFileById",
            JSON.stringify({ id: id, function: "deleteFileById" }),
            this.$businessCode.fawglfj
          )
          .then(res => {
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  message: "删除成功"
                });
                this.dataForm.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.dataForm.attchmentFileInfo;
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
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
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
    //获取办理部门和日期
    getHandleDeps() {
      apis
        .getHandleDeps()
        .then(res => {
          console.log("----获取办理部门和日期---", res);
          if (res.code === "SUCCESS") {
            this.hqDepts = res.data.hqDept;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //获取文件处理单详情

    getDetailIfo() {
      const data = {
        id: this.id,
        numYear: this.numYear
      };
      apis.phoneDetail(data).then(res => {
        if (res.code === "SUCCESS") {
          console.log(res.data);
          this.$nextTick(() => {
            const data = res.entity;
            res.entity.remarkList = res.remark;
            res.entity.receiveIdeaList = res.receiveIdea;
            res.entity.processIdeaList = res.processIdea;
            res.entity.deptIdeaList = res.deptIdea;
            res.entity.leaderIdeaList = res.leaderIdea;
            let id = res.entity.hqDept.split(",");
            let name = res.entity.hqDeptId.split(",");
            let hqDeptData = [];
            hqDeptData = id.map((item, index) => {
              return { hqDept: item, hqDeptId: name[index] };
            });

            if (res.dealOrderList && res.dealOrderList.length > 0) {
              hqDeptData = hqDeptData.map(item => {
                const dealItem = res.dealOrderList.find(
                  deal => deal.remark2 === item.hqDeptId
                );
                if (dealItem && dealItem.archDate) {
                  item.colorStyle = false;
                } else {
                  item.colorStyle = true;
                }
                return item;
              });
            }
            this.hqDeptData = hqDeptData;

            this.dataForm = res.entity;
            //区块链归档按钮权限
           const qukuailianguidang = this.buttonList.findIndex(item => item.type === "qukuailianguidang");
            if(this.dataForm.currentNode==='办结'&&res.isNewMsgzFilePlace==true){
               this.buttonList[qukuailianguidang].show = true;
            }else{
               this.buttonList[qukuailianguidang].show = false;
            }

            if (this.actionType === "0") {
              this.getControlArea();
              this.getHandleDeps();
              this.disabled = false;
            } else {
              this.disabled = true;
            }
            this.getFileList();
          });
        }
      });
    },
    fileList(files) {
      console.log("11" + files);
      if (
        this.dataForm.attchmentFileInfo &&
        this.dataForm.attchmentFileInfo.length
      ) {
        this.dataForm.attchmentFileInfo.push(...files);
      } else {
        this.dataForm.attchmentFileInfo = files;
      }
      let fileid = [];
      files.forEach(item => {
        fileid.push(item.id);
      });
      this.dataForm.attach = fileid.join(",");
      console.log(this.dataForm.attach);
      this.$forceUpdate();
    },
    getFileList() {
      const data = {
        id: this.id,
        numYear: this.numYear
      };
      this.$api.setSysConfig.getTextemList(data).then(res => {
        console.log("44", res);
        // this.$Set(this.dataForm, "attchmentFileInfo", res.data);
        this.dataForm.attchmentFileInfo = res.data;
        this.uploadConfig.filesHas = this.dataForm.attchmentFileInfo;
        this.$forceUpdate();
      });
    },
    //打印处理单
    onPrint() {
      const routerData = this.$router.resolve({
        path: "/phoneHandlePrintDetail",
        query: {
          id: this.id,
          type: "1",
          addNewSug: this.isSaved,
          title: "电话处理单",
          numYear: this.numYear
        }
      });
      window.open(routerData.href, "_blank");
    },
    //关闭按钮
    onClose() {
      if (this.statusType == "2") {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.save();
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$intent.closeWindow(this);
      }
      // this.$confirm("是否保存并退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cencelButtonText: "取消"
      // })
      //   .then(() => {
      //     this.$router.go(-1);
      //   })
      //   .catch(() => {
      //     this.$router.go(-1);
      //   });
    },
    //保存按钮
    save(val) {
      this.dataForm.id = this.id;
      this.dataForm.opinionList = [
        ...this.dataForm.leaderIdeaList,
        ...this.dataForm.receiveIdeaList,
        ...this.dataForm.processIdeaList,
        ...this.dataForm.deptIdeaList,
        ...this.dataForm.remarkList
      ];
      console.log(this.dataForm.opinionList);

      // this.$set(this.dataForm, "opinionList", opinionList);
      apis
        .adminPhoneNoteSave({ ...this.dataForm })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: "保存成功！"
            });
            // 在直接修改数组中的元素时，获取改元素的下表，防止元素增减造成修改错元素
            const saveIndex = this.buttonList.findIndex(
              item => item.type === "save"
            );
            this.buttonList[saveIndex].show = false;
            this.disabled = true;

            this.getDetailIfo();
            if (val) {
              this.selectOrgAndPerson(val);
            }
          }
        })
        .catch(err => {
          this.isSaved = false;
          this.$message({
            type: "error",
            message: err.msg
          });
        });
    },
    //选人成功-完成并发送/
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      console.log(
        "data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      if (status) {
        let chooseDataName = [];
        let chooseDataId = [];
        let id_name = [];
        data &&
          data.map(item => {
            item.id = "" + item.id;
            console.log("item.id", item.id);
            if (item.id.indexOf("#") > -1) {
              // let itemId = item.id.split('#')[0]
              // id_name.push(itemId + '_' + item.name)
              chooseDataName.push(item.name);
              chooseDataId.push(item.id);
            } else if (item.id.indexOf("#") == -1) {
              // id_name.push(item.id + '_' + item.name)
              chooseDataName.push(item.name);
              let itemId = item.id + "#" + item.deptId;
              chooseDataId.push(itemId);
            }
          });
        console.log("------选人----", chooseDataName);
        this.dataForm.currentUser = chooseDataName.join(",");
        this.dataForm.currentUserId = chooseDataId.join(",");
        this.dataForm.currentNodeId = params.id;
        this.dataForm.currentNode = params.name;

        // 流程调度 时 handleButton 参数也传为 完成并发送
        apis
          .phoneDoneAndSend({ ...this.dataForm, handleButton: "完成并发送" })
          .then(res => {
            if (res.code === "SUCCESS") {
              this.$intent.closeWindow(this);
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: err.msg
            });
          });
        // 此处没有完成并发送， 取消 对 isDispatch 字段的判断
        // if (!this.isDispatch) {

        // } else {
        //   apis
        //     .flowDispatchNote(this.dataForm)
        //     .then(res => {
        //       this.seletOptionsData = res.data;
        //     })
        //     .catch(err => {
        //       this.$message({
        //         type: "success",
        //         message: err.message
        //       });
        //     });
        // }
      }
    },
    //获取控制域信息
    getControlArea() {
      const that = this;
      const id = that.actionType !== "4" ? that.dataForm.id : "";
      apis
        .getControlArea({
          id: id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            that.flowLinkInfo = res.Fields;
            that.setConfig();
            that.initRules();
          }
        });
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.flowLinkInfo.requiredFields
      );
      this.readFields = this.setReadFields(
        this.readFields,
        this.flowLinkInfo.readFields
      ); //不可编辑控制域
      this.buttonList = this.showButton(
        this.buttonList,
        this.flowLinkInfo.visibleButtons,
        this.flowLinkInfo.visibleButtonsBycondition
      ); //按钮
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.flowLinkInfo.editedIdeaFields,
        this.flowLinkInfo.editedIdeaFieldsBycondition
      ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.flowLinkInfo.requiredIdeaFields
      ); //可编辑意见域
      console.log("----rules----", this.rules);
    },
    //完成并发送按钮
    send(val) {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (!_this.dataForm.id) {
            _this.save(val);
          } else {
            _this.selectOrgAndPerson(val);
          }
        } else {
          _this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    //选择机构人员-完成并发送
    selectOrgAndPerson(val) {
      const _this = this;
      if (val === "流程调度") {
        apis
          .flowDispatchNote({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.seletOptionsData = res.data;
            // let PCSAVYIDs = [];
            // _this.seletOptionsData = res.list.filter(item => {
            //   if (!PCSAVYIDs.includes(item.PCSAVYID)) {
            //     PCSAVYIDs.push(item.PCSAVYID);
            //     return item;
            //   }
            // });
            // _this.seletOptionsData = _this.shoNextNode(
            //   _this.seletOptionsData,
            //   _this.huanJieMessage.acyNodeNextBount
            // );
            _this.loadingTree = true;
            _this.dialogState = true;
          })
          .catch(err => {
            _this.$message({
              type: "success",
              message: err.message
            });
          });
        _this.dataForm.handleButton = val;
        if (val === "流程调度") {
          _this.isDispatch = true;
        }
      } else {
        _this.dataForm.handleButton = val;
        apis
          .phoneDoneAndSend(this.dataForm)
          .then(res => {
            if (res.code === "SUCCESS") {
              _this.$router.go(-1);
              _this.$message({
                type: "success",
                message: "办结完成"
              });
            }
          })
          .catch(err => {
            _this.$message({
              type: "error",
              message: err.message
            });
          });
      }
    },
    //生成编号
    buildNo() {
      apis
        .buildNo(this.dataForm)
        .then(res => {
          console.log("---生成编号---", res);
          if (res.code === "SUCCESS") {
            this.dataForm.documentNo = res.docementNo;
            this.$message({
              type: "success",
              message: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //收回
    tackBack() {
      apis
        .tackBack({ id: this.dataForm.id })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.$intent.closeWindow(this)
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //发送至办理部门
    toHandleDep() {
      apis
        .sendToHandleDep({ id: this.dataForm.id })
        .then(res => {
          console.log("发送至办理部门---", res);
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.$intent.closeWindow(this)
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //获取办理部门和日期
    getHandleDeps() {
      apis
        .getHandleDeps()
        .then(res => {
          console.log("----获取办理部门和日期---", res);
          if (res.code === "SUCCESS") {
            if (this.actionType === "4") {
              this.dataForm.createDate = res.date;
              this.dataForm.creator = res.creator;
              this.dataForm.tel = res.tel;
            }
            this.hqDepts = res.hqDept;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //查看办理状态
    checkState() {
      apis
        .checkState({ id: this.dataForm.id, numYear: this.numYear })
        .then(res => {
          console.log("查看办理状态", res);
          if (res.code === "SUCCESS") {
            this.stateData = res.data;
            this.handleStateDialog = true;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },

    //查看流程
    checkFlow() {
      const _this = this;
      apis
        .checkFlow({ id: this.dataForm.id, numYear: this.numYear })
        .then(res => {
          if (res.code === "SUCCESS") {
            console.log("查看流程", res);
            _this.showFlowChart = true;
            _this.tableData = res.data;
            _this.$nextTick(() => {
              _this.$refs.dialogLine.openDialog();
            });
          }
        })
        .catch(err => {
          _this.$message({
            type: "error",
            message: err.message
          });
        });
    },

    //维护
    maintain() {
      apis
        .editOrMatainanFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              message: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //下载
    onLoad() {
      exportTable.getPdf("xiazai", [], "loadPdf");
    }
  }
};
</script>

  <style scoped lang="less" rel="stylesheet/less">
.fileHandleDetail {
  background-color: #ffffff !important;
}
.el-header {
  background-color: rgb(64, 158, 255);
  line-height: 60px;
}
.title {
  color: #ffffff;
}
.btn {
  float: right;
}
.btnstyle {
  color: rgb(14, 117, 214);
}
.btnstyle:hover {
  background-color: rgb(14, 117, 214);
  color: cornsilk;
}
.shiwuTitle {
  width: 100%;
  min-height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.container {
  width: 80%;
  min-height: 920px;
  padding: 20px 16px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
.c-header {
  width: 95%;
  margin-left: 5%;
  height: 40px !important;
  margin-bottom: 20px;
  line-height: 40px;
  // border: 1px solid #f9aa21;
  border: 1px solid #f60;
  background: #fef7e7;
}
.el-table .cell {
  white-space: pre-line;
}
.el-form-item ::v-deep {
  margin-bottom: 12px;
}
.form-word {
  width: 80px;
  float: left;
  line-height: 20px;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
.d_flex {
  position: relative;
}
.adviceInfo {
  position: absolute;
  bottom: 5%;
  right: 10px;
}
.actColor {
  color: red;
}
</style>
