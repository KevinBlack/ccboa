
 <template>
  <div class="fileHandleDetail">
    <div>
      <!-- <i class="el-icon-arrow-left">文件处理单</i> -->
      <div class="headerClick">
        <template>
          <el-button
            class="bank_grid_comtent_active"
            v-for="(item,index) in buttonList"
            v-show="buttonList[index].show"
            @click="buttonClick(item.name)"
            :key="index"
            size="mini"
            plain
          >{{item.name}}</el-button>
        </template>
      </div>
    </div>
    <div class="shiwuTitle">{{dataForm.draftOrgan}}文件处理单</div>
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
            <el-form-item label="来文单位" prop="fromDept">
              <el-input v-model="dataForm.fromDept" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文号" prop="fileCode">
              <el-input v-model="dataForm.fileCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文件标题" prop="title">
          <el-input v-model="dataForm.title" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="办理部门" prop="hqDept">
          <template v-if="disabled">
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
          :tableType="'2'"
          formID="LD"
          suggestionType="0"
        ></admin-conp>

        <!--     收文部门拟办意见     -->
        <admin-conp
          lableTitle="收文部门拟办意见"
          prop="receiveIdea"
          :formadatalist="dataForm.receiveIdeaList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'2'"
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
          :tableType="'2'"
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
          :tableType="'2'"
          formID="BM"
          suggestionType="5"
        ></admin-conp>
        <!--     备注区域     -->
        <admin-conp
          lableTitle="备注"
          prop="leaderIdea"
          :formadatalist="dataForm.remarkList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'2'"
          formID="BZ"
          suggestionType="4"
        ></admin-conp>
        <!-- <admin-conp
          lableTitle="办理单备注"
          prop="leaderIdea"
          :formadatalist="dataForm.remarkDealList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          tableType="2"
          formID="BL"
          suggestionType="6"
        ></admin-conp>-->
        <el-form-item label="附件" prop="attachid">
          <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
          <upfileList :canmoveOrdown="!disabled" label :fileList="dataForm.attchmentFileInfo"></upfileList>
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
    <checkFlowDialog :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></checkFlowDialog>
    <!-- <select-person
            :treeData="treeData"
            :loadingTree="true"
            :seletOptionsData="seletOptionsData"
            :offenUse="offenUse"
            :dialogType="dialogType"
            :dialogTypeNow="dialogTypeNow"
            dialogTit="选择共享用户"
            :checkIds="checkIds"
            :fromdata="dataForm"
            :checkData="checkData"
            :singelCheckF="singelCheckF"
            :dialogState="dialogState"
            @showCompDialog="showCompDialog"
    />-->
    <select-person
      v-model="dialogState"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    />
  </div>
</template>

  <script  type="text/ecmascript-6">
import adminConp from "views/bianhan/components/suggisitionAreaConp";
import checkFlowDialog from "@/components/viewFlow/shiwuFlow";
import selectPerson from "components/viewFlow/dispatchTree";
import upfileList from "./components/showUploadFile"; //附件展示
import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/fileHandle.js";
import minixs from "@/minixs/index";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "fileHandleDetail",
  components: {
    uploadFileTs,
    selectPerson,
    checkFlowDialog,
    adminConp,
    upfileList
  },
  mixins: [minixs, viewDraft],

  data() {
    return {
      numyear: this.$route.query.numyear ? this.$route.query.numyear : "",
      isMaintain: false,
      isSelf: false,
      isBuild: false,
      isEnd: false,
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
      stuType: "",
      disabled: false,
      id: "",
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
        draftOrganFullName: "",
        currentNode: "",
        currentNodeId: "",
        currentUser: "",
        documentNo: "",
        isFile: "",
        isChouQu: "",
        createDate: "",
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
        { name: "收藏", type: "sc", show: true },
        { name: "操作指南", type: "operatorGuide", show: true },
        { name: "维护", type: "maintain", show: !this.$route.query.numyear?true:false },
        { name: "流程调度", type: "flowDispatch", show:!this.$route.query.numyear?true:false }
      ]
    };
  },
  mounted() {},
  computed: {},
  created() {
    this.dataForm.draftOrgan = JSON.parse(
      localStorage.getItem("userInfo")
    ).unitName;
    this.disabled = true;
    this.actionType = this.$route.query.identify;
    const guidangIndex = this.buttonList.findIndex(
      item => item.type === "guidang"
    );
    if (this.actionType === "2") {
      const flowDispatchIndex = this.buttonList.findIndex(
        item => item.type === "flowDispatch"
      );
      this.buttonList[flowDispatchIndex].show = false;
      this.buttonList[guidangIndex].show = true;
    } else if (this.actionType === "1") {
      this.buttonList[guidangIndex].show = false;
    }
    this.id = this.$route.query.id;
    this.uploadConfig.id = this.id;
    this.getDetailIfo();
  },
  methods: {
    delItem(val) {
      if (val.id) {
        apis
          .adminFileDealDel({ id: val.id })
          .then(res => {
            if ((res.code = "SUCCESS")) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getDetailIfo();
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

      console.log(val);
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
      //定义默认校验规则
      const DEFAULT_VERIFICATION_RULE = {
        rule: [{ required: true, message: "不能为空", trigger: "change" }]
      };
      //赋值
      let {
        rule: fromDept,
        rule: fileCode,
        rule: hqDept,
        rule: documentNo,
        rule: createDate,
        rule: title,
        rule: attachid,
        rule: deptIdea,
        rule: leaderIdea,
        rule: receiveIdea,
        rule: processIdea,
        rule: remark
      } = DEFAULT_VERIFICATION_RULE;
      this.rules = {
        fromDept,
        fileCode,
        hqDept,
        documentNo,
        createDate,
        title,
        attachid, //附件ID
        deptIdea,
        leaderIdea,
        receiveIdea,
        processIdea,
        remark
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
          apis.binLog({ id: this.id, numYear: this.numyear }).then(res => {
            this.$message({
              type: "success",
              message: res.msg
            });
          });
          break;
        case "区块链归档":
          apis.newBinLog({ id: this.id, numYear: this.numyear }).then(res => {
            this.$message({
              type: "success",
              message: "归档成功"
            });
          });
          break;
        case "操作指南":
          this.readMe();
          break;
        case "流程调度":
          this.send("流程调度");
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
          this.stuType = "2";
          this.getHandleDeps();
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
              apis
                .collecTion({ id: this.dataForm.id, numYear: this.numyear })
                .then(res => {
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
        default:
          break;
      }
    },
    //获取办理部门和日期
    getHandleDeps() {
      apis
        .getHandleDeps({ numYear: this.numyear })
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
      const that = this;
      const data = {
        id: that.id
      };
      apis.fileDetail({ ...data, numYear: this.numyear }).then(res => {
        if (res.code === "SUCCESS") {
          // console.log(res.data);
          that.$nextTick(() => {
            res.entity.remarkList = res.remark;
            // res.entity.remarkDealList = res.remarkDeal;
            res.entity.receiveIdeaList = res.receiveIdea;
            res.entity.processIdeaList = res.processIdea;
            res.entity.deptIdeaList = res.deptIdea;
            res.entity.leaderIdeaList = res.leaderIdea;
            that.dataForm = res.entity;

            const qukuailianguidang = this.buttonList.findIndex(
              item => item.type === "qukuailianguidang"
            );
            if (
              that.dataForm.currentNode === "办结" &&
              res.isNewMsgzFilePlace == true
            ) {
              this.buttonList[qukuailianguidang].show = true;
            } else {
              this.buttonList[qukuailianguidang].show = false;
            }

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
                console.log(dealItem, "dealItem");
                if (dealItem && dealItem.archDate) {
                  item.colorStyle = false;
                } else {
                  item.colorStyle = true;
                }
                return item;
              });
            }
            this.hqDeptData = hqDeptData;
          });
        }
        this.getFileList();
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
    //获取附件列表

    getFileList() {
      const data = {
        id: this.id,
        numYear: this.numyear
      };
      this.$api.setSysConfig.getTextemList(data).then(res => {
        //      console.log("44",res);
        //  this.$Set(this.dataForm, "attchmentFileInfo", res.data);
        this.dataForm.attchmentFileInfo = res.data;
        this.uploadConfig.filesHas = this.dataForm.attchmentFileInfo;
        this.$forceUpdate();
      });
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
    //打印处理单
    onPrint() {
      const routerData = this.$router.resolve({
        path: "/printdetail",
        query: {
          id: this.id,
          type: 1,
          title: "文件处理单",
          numYear: this.numyear
        }
      });
      window.open(routerData.href, "_blank");
    },
    //关闭按钮
    onClose() {
      if (this.stuType == "2") {
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
    },
    //保存按钮
    save(val) {
      let _this = this;
      _this.dataForm.opinionList = [
        ..._this.dataForm.leaderIdeaList,
        ..._this.dataForm.receiveIdeaList,
        ..._this.dataForm.processIdeaList,
        ..._this.dataForm.deptIdeaList,
        ..._this.dataForm.remarkList
        // ..._this.dataForm.remarkDealList
      ];
      //   _this.$set(_this.dataForm, "opinionList", opinionList);
      this.$refs["dataForm"].validate(valid => {
        apis
          .adminFileHandleSave({ ..._this.dataForm, id: this.id })
          .then(res => {
            if (res.code === "SUCCESS") {
              _this.$message({
                type: "success",
                message: "保存成功！"
              });
              // 在直接修改数组中的元素时，获取改元素的下表，防止元素增减造成修改错元素
              const saveIndex = this.buttonList.findIndex(
                item => item.type === "save"
              );
              this.buttonList[saveIndex].show = false;
              this.disabled = true;
            }
          })
          .catch(err => {
            _this.isSaved = false;
            _this.$message({
              type: "error",
              message: err.msg
            });
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
              let itemId = item.id.split("#")[0];
              id_name.push(itemId + "_" + item.name);
              chooseDataName.push(item.name);
              chooseDataId.push(itemId);
            } else if (item.id.indexOf("#") == -1) {
              id_name.push(item.id + "_" + item.name);
              chooseDataName.push(item.name);
              chooseDataId.push(item.id);
            }
          });
        console.log("------选人----", chooseDataName);
        this.dataForm.currentUser = chooseDataName.join(",");
        this.dataForm.currentUserId = chooseDataId.join(",");
        this.dataForm.currentNodeId = params.id;
        this.dataForm.currentNode = params.name;
        apis
          .sendFile(this.dataForm)
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
              message: err
            });
          });
      }
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
      if (val === "完成并发送") {
        //选环节
        apis
          .getPersonInfoAndPersonTree({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.seletOptionsData = res.data.list;
            if (res.data.result.message == "Loading") {
              _this.loadingTree = true;
            } else {
              _this.loadingTree = false;
            }
            _this.dialogState = true;
          })
          .catch(err => {
            console.log(err);
          });
        _this.dataForm.handleButton = val;
      } else if (val === "流程调度") {
        apis
          .flowDispatchNote({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.seletOptionsData = res.data;
            _this.dialogState = true;
          })
          .catch(err => {
            console.log(err);
          });
        _this.dataForm.handleButton = "完成并发送";
      } else {
        _this.dataForm.handleButton = val;
        apis
          .sendFile(this.dataForm)
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
              message: err
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
            message: err
          });
        });
    },
    //收回
    tackBack() {
      apis
        .tackBack({ id: this.dataForm.id, numYear: this.numyear })
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
            message: err
          });
        });
    },
    //发送至办理部门
    toHandleDep() {
      apis
        .docHandlinAdd({ id: this.dataForm.id, numYear: this.numyear })
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
            message: err
          });
        });
    },
    //查看办理状态
    checkState() {
      apis
        .checkState({ id: this.dataForm.id, numYear: this.numyear })
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
            message: err
          });
        });
    },

    //查看流程
    checkFlow() {
      const _this = this;
      apis
        .checkFlow({ id: this.dataForm.id, numYear: this.numyear })
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
            message: err
          });
        });
    },

    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      console.log("-----flagFile--->", flagFile);
      var successInfo = { state: false };
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = flagFile.fileName;
      bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
          console.log("-----res", res);
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请重新上传",
              duration: 1500
            });
            successInfo.state = false;
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件获取失败，请联系管理员",
            duration: 1500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    //操作指南
    readMe() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "BHGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.dataForm.id,
                    zhengWenState: 0,
                    JYcode: "A08462002",
                    multiTenancyId: "000000iiii",
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false
                  }
                });
                window.open(data.href, "_blank");
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件不存在",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    },
    //流程调度
    flowDispatch() {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          apis
            .flowDispatch({
              id: _this.dataForm.id
            })
            .then(res => {
              _this.seletOptionsData = res.data;
              _this.dialogState = true;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          _this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    //下载
    onLoad() {
      exportTable.getPdf("xiazai", [], "loadPdf");
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

