<!--
 * @Author: your wangating
 * @Date: 2020-12-23 15:28:06
 * @LastEditTime: 2022-01-25 15:55:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\sealManage\useSeal\department\doneDepartment.vue
--> 
<template>
  <div class="doneDepartment" id="doneDepartment">
    <div class="headerClick">
      <el-button
        v-for="(item, index) in buttonList"
        @click="buttonClick(item.name)"
        class="bank_grid_comtent_active"
        :key="index"
        v-show="item.show"
        plain
      >{{ item.name }}</el-button>
      <!-- <el-button
            @click="buttonClick('催办')"
            class="bank_grid_comtent_active"
      >催办</el-button>-->
    </div>
    <div class="shiwuTitle">{{ form.deptTableHeader }}部门用印审批单</div>
    <el-form
      ref="registerForm"
      :model="form"
      label-width="140px"
      :rules="regSealFormRule"
      class="designForm"
    >
      <div class="box">
        <el-form-item label="当前环节:">
          <span style="color: red;">
            {{
            $route.query.id ? form.currentNode : "起草"
            }}
          </span>
        </el-form-item>
        <el-form-item label="当前处理人:">
          <span style="color: red">{{currentUserNames}}</span>
        </el-form-item>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人" prop="draftUser">
            <el-input v-model="form.draftUser" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="form.tel" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请日期" prop="draftDate">
            <el-input v-model="form.draftDate" style="width: 100%" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用印日期" prop="useTime">
            <el-input v-model="form.useTime" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请单位" prop="departFirstDepartmentId">
            <el-select
              v-model="form.departFirstDepartment"
              style="width: 100%"
              placeholder="请选择所属部门"
              :disabled="true"
            >
              <el-option
                v-for="(item, index) in draftOrganOption"
                :key="index"
                :label="item.firstUnitName"
                :value="item.firstUnitId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编号" prop="documentNo">
            <el-input v-model="form.documentNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="编号" prop="documentNo">
            <el-input v-model="form.documentNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用印事由和用印文件名称" prop="markReson">
            <el-input v-model="form.markReson" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 添加印章机相关信息 -->
      <el-row>
        <el-col>
          <el-form-item label="用印及个数" prop="list">
            <div style="display: flex">
              <el-input v-model="form.rtfAssetListShow" readonly></el-input>
              <el-button
                type="primary"
                style="marginleft: 5px"
                 :disabled="form.currentNode != '起草'"
              >用印选择</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用印方式" prop="fldYyfs" ref="fldYyfs">
            <el-input v-model="form.fldYyfs" :disabled="readFields.fldYyfs" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="tableSealStateData.length > 0">
        <el-col>
          <el-form-item label="盖章状态" readonly>
            <m-table
              ref="SealStateTable"
              :isHandle="false"
              :tableData="tableSealStateData"
              :tableCols="tableSealStateCols"
              :isPagination="false"
              :isHeaderStyle="{}"
              :isBorder="true"
              :sortable="false"
              style="width: 100%"
            ></m-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="发往单位" prop="sendDept">
            <el-input v-model="form.sendDept" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="审批意见" prop="ygBmYj">
            <el-input
              v-model="form.ygBmYj"
              v-if="
                  !editedIdeaFields.ygBmYj || !(form.ygBmYjs && form.ygBmYjs.length != 0)
                "
              type="textarea"
              :rows="5"
              resize="none"
              :disabled="true"
            ></el-input>
            <div class="d_flex">
              <el-row
                class="d_b100"
                
                style="margin: 5px 0;"
              >
                <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px" v-for="(item, index) in form.ygBmYjs"
                :key="index">
                  <div class="br" >{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span>{{ item.lk }}</span>
                    <br>
                    <span>{{item.ct}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.ygBmYj">
          <i class="icon-font el-icon-edit select-chang"></i>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="印章保管人意见" prop="yzBgrYj">
            <el-input
              v-if="
                  !editedIdeaFields.yzBgrYj || !(form.yzBgrYjs && form.yzBgrYjs.length != 0)
                "
              v-model="form.yzBgrYj"
              type="textarea"
              :rows="5"
              resize="none"
              :disabled="true"
            ></el-input>
            <div class="d_flex">
              <el-row
                class="d_b100"
                style="margin: 5px 0;"
              >
                <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px" v-for="(item, index) in form.yzBgrYjs"
                :key="index">
                  <div class="br">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span class="pad_lr10">{{ item.lk }}</span>
                    <br>
                    <span>{{item.ct}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.yzBgrYj">
          <i class="icon-font el-icon-edit select-chang"></i>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="经办人承诺" v-if="form.jbrChns!==undefined&&form.jbrChns.length>0">
            <div class="d_flex">
              <el-row
                class="d_b100"
                
                style="margin: 5px 0;"
              >
                <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px" v-for="(item, index) in form.jbrChns"
                :key="index">
                  <div class="br">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span class="pad_lr10">{{ item.lk }}</span>
                    <br>
                    <span>{{ item.ct }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="经办人承诺" v-else>
            <el-checkbox v-model="checked" :disabled="true">{{form.jbrChn}}</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="thIdeas.length">
          <el-form-item label="退回原因">
            <!-- <el-input type="textarea" v-model="form.thIdea" :disabled="editedIdeaFields.yyBgr"></el-input> -->
            <div class="d_flex">
              <el-row
                class="d_b100"
                
                style="margin: 5px 0;"
              >
                <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px" v-for="(item, index) in thIdeas"
                :key="index">
                  <div class="br">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span class="pad_lr10">{{ item.lk }}</span>
                    <br>
                    <span>{{ item.ct }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-if="
                  !editedIdeaFields.remark || !(form.remarks && form.remarks.length != 0)
                "
              type="textarea"
              v-model="form.remark"
              :rows="5"
              resize="none"
              :disabled="true"
            ></el-input>
            <div class="d_flex">
              <el-row
                class="d_b100"
                
                style="margin: 5px 0;"
              >
                <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px" v-for="(item, index) in form.remarks"
                :key="index">
                  <div class="br">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span class="pad_lr10">{{ item.lk }}</span>
                    <br>
                    <span>{{item.ct}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="configInfo.isErweima === '1' && configInfo.ewmMarkFlow.includes('部门')">
        <el-col :span="24" style="text-align: center; margin-bottom: 20px">
          <span>二维码信息采集表</span>
        </el-col>
        <el-col :span="24">
          <el-form-item label="日期">
            <el-input v-model="form.ewmRq" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="主体">
            <el-input
              v-model="form.ewmZt"
              :maxlength="configInfo.ewmZtzs"
              show-word-limit
              :disabled="true"
              placeholder="指签约对象等文本出具的受众,可缩写、简写。"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事项">
            <el-input
              v-model="form.ewmSx"
              :maxlength="configInfo.ewmSxzs"
              show-word-limit
              :disabled="true"
              placeholder="指该文本是什么，如贷款合同等。"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div id="scfj" class="height_90"></div>
      <el-form-item label="附件" prop="attach" ref="attach">
        <el-col :span="23">
          <upload-file-ts
            :uploadConfig="uploadConfig"
            v-if="form.currentNode == '起草'"
            @fileList="fileList"
            :disabled="form.hasDocumentNo == 'true'"
          ></upload-file-ts>
          <div class="tree_w" v-if="form.attchmentFileInfo && form.attchmentFileInfo.length > 0">
            <el-scrollbar>
              <div v-for="(item, index) in form.attchmentFileInfo" :key="item.id" class="comp_list">
                <template>
                  <div class="command_file">
                    <span class="name down" @click="viewFile(item,null,item.fileName)">{{item.fileName}}</span>
                    <span class="name">{{ item.createrName }}</span>
                    <span class="name">{{ item.createTime }}</span>
                    <div class="btns">
                      <el-button
                        type="primary"
                        size="mini"
                        @click.native="upRow(index)"
                        v-if="form.attchmentFileInfo.length > 1"
                        :disabled="index == 0"
                        round
                      >上移</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click.native="downRow(index)"
                        v-if="form.attchmentFileInfo.length > 1"
                        :disabled="index == form.attchmentFileInfo.length - 1"
                        round
                      >下移</el-button>
                      
                      <el-button type="primary" size="mini" @click.native="downFile(item)" round>下载</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-form-item>
    </el-form>
    <!-- 
      查看流程弹窗
    -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <!-- 
      生成模板弹窗
    -->
    <el-dialog title="生成模板" :visible.sync="templateDialog" :before-close="cancelTemplate">
      <el-form :model="tempForm" label-width="140px">
        <el-form-item label="模板名称">
          <el-input v-model="tempForm.templTitle" placeholder="请输入模板名称" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelTemplate()">取消</el-button>
        <el-button type="primary" @click="confirmBuildTemplate">确定</el-button>
      </div>
    </el-dialog>
    <!-- 用印查看图片&视频 -->
    <seal-img-detail ref="sealImgDetail"></seal-img-detail>
  </div>
</template>
<script>
import mixins from "@/minixs/index";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import openOrDownLoadFile from "@/minixs/openOrDownLoadFile";
import exportTable from "@/minixs/exportTable";
import QRCode from "qrcodejs2";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import openOrDownLoadFiles from "@/minixs/shiwuLineWord";
import mTable from "components/table/tTable";
import useSealMixins from "@/views/sealDrafttt/mixins/index";
import sealImgDetail from "views/sealDrafttt/components/sealImgDetail";
import viewDraft from "@/minixs/viewDraft";
import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "doneDepartment",
  components: {
    uploadFileTs,
    sealImgDetail,
    shiwuFlow,
    mTable
  },
  mixins: [mixins, useSealMixins, openOrDownLoadFile,draftMuban,viewDraft,dispatchIndex,isNowUser],
  data() {
    return {
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      currentUserNames:"",
      thIdeas: [],
      checked: true,
      res: {},
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      // 表单是否可编辑（维护）
      inputDisable: true,
      // 用印名称下拉框 option
      sealNameOption: [],

      // 配置信息
      configInfo: {},
      form: {
        currentNode: "起草", // 当前环节
        // 查看流程所传参数
        workflowId: "",
        tel: "",
        draftDate: '',
        draftUser: "",
        draftUserId: "",
        departFirstDepartmentId: "", // 申请单位id
        useTime: "", // 用印日期
        title: "",
        jbrChn: false,
        markNum: 0, // 用印数量
        remark: "",
        ygBmYj: "",
        yzBgrYj: "",
        /**
         * 二维码采集信息
         */
        ewmRq: "", // 日期
        ewmZt: "", // 主体
        ewmSx: "", // 事项
        /**
         * 印章机
         */
        rtfAssetListShow: "",
        rtfAssetList1: [],
        /**
         * 上传附件
         */
        hasDocumentNo: true,
        attchmentFileInfo: [],
        departFirstDepartmentId: "", // 申请单位id
        departFirstDepartment: "", // 申请单位名称
        draftDepartmentId: "", // 拟稿部门id
        draftDepartment: "", // 拟稿部门名称
        draftUserId: "", // 经办人id
        draftUser: "", // 经办人名称
        currentUserId: "", // 当前处理人id
        currentUser: "", // 当前处理人名称
        draftOrganId: "", // 拟稿机构id
        draftOrgan: "", // 拟稿机构名称
        currentDepartmentId: "", // 当前处理人一级部门id
        departName: "", // 当前处理人部门
        departId: "" // 当前处理人部门id
      },
      /**
       * 用印选择弹窗
       */
      selUseSealDialog: false,
      selUseSealTableData: [],
      // 机器盖章数组
      fldYyfsMechine: [],
      // 印章名称及每份个数
      sealDetailArr: [],
      //盖章状态表格
      tableSealStateData: [],
      tableSealStateCols: [
        { label: "材料名称", prop: "assentName" },
        { label: "印章简称", prop: "sealName" },
        { label: "用印数", prop: "sealBatchSum" },
        { label: "正常", prop: "successCount" },
        { label: "作废", prop: "cancelCount" },
        {
          label: "查看详情",
          type: "Button",
          btnList: [
            {
              type: "primary",
              label: "查看",
              size: "small",
              handle: row => {
                this.SealStateDetail(row);
              }
            }
          ]
        }
      ],
      // 用印信息弹窗
      sealInfoDialog: false,
      // 用印材料
      sealInfoForm: {
        title: ""
      },
      sealInfoTabData: [],
      sealInfoTabCols: [
        { label: "印章简称", prop: "sealName" },
        { label: "用印数", prop: "sealBatchSum" },
        { label: "已用印数", prop: "successCount" },
        { label: "印章类别", prop: "sealType" },
        { label: "所属印章机", prop: "sealMeachine" },
        { label: "用印机中的位置", prop: "sealPosition" }
      ],
      // 所有批次用印信息数组
      sealInfoArr: [],
      /**
       * 申请单位 下拉框option
       */
      draftOrganOption: [],
      /**
       * 规则设置
       */
      regSealFormRule: {},

      sendId: "",
      /**
       * 生成模板弹窗
       */
      templateDialog: false,
      tempForm: {
        templTitle: ""
      },
      /**
       * 上传附件
       */
      uploadConfig: {
        formId: "sealManage",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      /**
       * 查看流程弹窗
       */
      flowChartList: [],
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      /**
       * 环节信息
       */
      huanJieMessage: {},
      //不可编辑控制域
      readFields: {
        draftUser: false, //申请人
        tel: false, //联系电话
        draftDate: false, //申请日期
        departFirstDepartmentId: false, //申请单位
        documentNo: false, //编号
        useTime: false, //用印日期
        title: false, //标题
        markReson: false, //用印事由和用印文件名称
        sendDept: false, //发往单位
        markNum: false, //用印数量
        markName: false, //印章名称
        jbrChn: false //经办人承诺
      },
      //必填控制域
      requiredFields: {
        draftUser: "",
        title: "",
        yyReason: "",
        sendDept: "",
        markNum: "",
        useTime: "",
        remark: ""
      },
      //可编辑意见域
      editedIdeaFields: {
        remark: true, //备注
        ygBmYj: true, //审批意见
        yzBgrYj: true //印章保管人意见
      },
      //必填意见域
      requiredIdeaFields: {
        yzBgrYj: false
      },
      // 按钮数组元素位置不能调换，下面有用到数组下标
      buttonList: [
        { name: "关闭", type: "guanbi", show: true },
        { name: "收回", type: "shouhui", show: false },
        { name: "查看流程", type: "cklc", show: true },
        { name: "打印处理单", type: "dycld", show: true },
        { name: "收藏", type: "shoucang", show: true },
        { name: "生成模板", type: "chmb", show: false },

        // { name: '催办', type: 'cuiban', show: true },
        // { name: '操作指南', type: 'czzn', show: true },
      ],
      yzmc: ""
    };
  },
  watch: {},
  created() {
    /** 获取当前部门信息 */
    // let departmentInfo = JSON.parse(localStorage.getItem("unitInfo"));
    // this.draftOrganOption = departmentInfo;
    // 根据id 获取详情信息
    if (this.$route.query.id) {
      this.id = this.$route.query.id; // 获取地址栏id
      this.getDetailDepartment();
    }
  },
  mounted() {
    this.InitializeData();
  },
  methods: {
    yzlist(A, b) {
      let useJgIds;
      if (A) {
        useJgIds = A;
      }
      this.$api.sealManage
        .getsealList({
          useJgId: useJgIds,
          yzType: "bm"
        })
        .then(res => {
          // this.pagination.total = res.total
          console.log(
            "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
            res
          );
          this.sealNameOption = res.list;
          if (b) {
            this.sealNameOption.map((item, index) => {
              if (item.id == b) {
                this.yzmc = item.yzJiancheng;
              }
            });
          }
          console.log(
            "印章列表数据：",
            res,
            this.selUseSealTableData,
            "取出自己想要的数据添加到新数组操作"
          );
        })
        .catch(err => {
          console.log("报错：", err);
        });
    },
    /**
     * 初始化加载数据
     */
    InitializeData() {
      this.getSealType();
    },
    /**
     * 获取用印类型
     */
    getSealType() {
      this.$api.sealManage.getUseSealType({}).then(res => {
        console.log(res, "获取配置");
        this.configInfo = res.data;
        if (this.$route.query.id === undefined) {
          // 获取申请日期
          this.form.draftDate = res.newDateYY;
        }
      });
    },
    /**
     *  通过id 获取详情页
     */
    getDetailDepartment() {
      this.checked = true;
      this.uploadConfig.id = this.id;
      this.$api.sealManage
        .detailDepartment({ id: this.$route.query.id ,numYear:this.numYears})
        .then(res => {
          console.log(res.data, "------------------详情页-----------------");
          this.form = res.data;
          if (res.data.authUserId) {
          this.currentUserNames =
            res.data.authUserName + "（由" + res.data.currentUser + "授权）";
          } else {
            this.currentUserNames = res.data.currentUser
          }
          this.yzlist(res.data.draftOrganId, res.data.markName);
          console.log(this.buttonList);
          if (this.form.finishTime && this.form.finishTime != ""&&this.form.finishTime!=null&&this.form.finishTime!=undefined) {
            // 办结的需要生成模板按钮
            this.buttonList[2].show = true;
          } else {
            console.log("ppppppppppppp")
            // 已办的需要收回按钮
            if(res.ifShouHui=='1'){
            this.buttonList[1].show = true;
            }
          }
          // this.form.jbrChn = this.form.jbrChn;
          if (res.data.remarks && res.data.remarks.length > 0) {
            // this.form.remark = '';
          }
          this.form.remark = "";
          this.form.ygBmYj = "";
          this.form.yzBgrYj = "";
          this.form.departFirstDepartmentId = res.data.departFirstDepartmentId;
          this.form.departFirstDepartment = res.data.departFirstDepartment;
          this.thIdeas = res.data.thIdeas; //印章保管人
            console.log(res.data.rtfAssetList1)
          if (res.data.yyType) {
            this.randomStr1 = res.data.markMainForm;
            this.tableSealStateData = JSON.parse(res.data.yyType);
          }
          if (res.data.rtfAssetList1) {
            this.getSealNamecount(JSON.parse(res.data.rtfAssetList1));
          }

          // 获取附件id并且调用附件方法
          this.id = res.data.id;
          this.getFileList();
        });
    },
    getSealNamecount(useSealArr) {
      // 印章名称及每份个数 this.sealDetailArr
      // 机器盖章   this.fldYyfsMechine
      // 手工盖章
      let fldYyfsHander = [];
      useSealArr.map(item => {
        if (this.form.markNum !== '0') { //老数据
          this.sealDetailArr.push(`${item.sealName} ${this.form.markNum}`);
          item.sealPosition === "用印机"
            ? this.fldYyfsMechine.push(item.sealName)
            : fldYyfsHander.push(item.sealName);
        } else {
          this.sealDetailArr.push(`${item.sealName} ${item.sealNum}`);
          item.sealPosition === "用印机"
            ? this.fldYyfsMechine.push(item.sealName)
            : fldYyfsHander.push(item.sealName);
        }
      });
      let fldYyfs = "";
      if (this.fldYyfsMechine.length > 0 && fldYyfsHander.length > 0) {
        fldYyfs = `机器盖章：${this.fldYyfsMechine.join(
          ","
        )};手工盖章：${fldYyfsHander.join(",")}`;
      }
      if (this.fldYyfsMechine.length > 0 && fldYyfsHander.length === 0) {
        fldYyfs = `机器盖章：${this.fldYyfsMechine.join(",")}`;
      }
      if (this.fldYyfsMechine.length === 0 && fldYyfsHander.length > 0) {
        fldYyfs = `手工盖章：${fldYyfsHander.join(",")}`;
      }
      this.$set(this.form, "fldYyfs", fldYyfs);
      // this.form.rtfAssetListShow = ''
      this.$set(this.form, "rtfAssetListShow", this.sealDetailArr.join(","));
      console.log("this.form.rtfAssetListShow", this.form.rtfAssetListShow);
    },
    /**
     * 关闭
     */
    close() {
      // if (!this.form.currentUserId || (parseInt(this.form.currentUserId) === this.userInfo.humanId)) {
        this.$intent.closeWindow(this);
      // this.$confirm("是否关闭当前页面?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning"
      // })
      //   .then(() => {
          
      //   })
      //   .catch(() => {});
      // } else {
      //   this.$intent.closeWindow(this);
      // }
    },
    // 操作指南
    operaGuide() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "YZGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              console.log("resF", resF);
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_WordTs",
                  query: {
                    state: "viewFile",
                    id: this.sendId || this.$route.query.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: "0000qqqq",
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
    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = flagFile.fileName;
      self.bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
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
    /**
     * 点击按钮
     */
    buttonClick(item) {
      switch (item) {
        case "催办":
          this.$api.sealManage
            .CuiBan({
              markOrderType: "4",
              id: this.sendId || this.$route.query.id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "催办成功！"
              });
            });
          break;
        case "关闭":
          this.close();
          break;
        case "收回":
          this.takeBack();
          break;
        case "生成模板":
          this.templateDialog = true;
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
              this.$api.sealManage
                .shoucang({
                  markOrderType: "4",
                  id: this.$route.query.id || this.sendId,
                  numYear:this.numYears
                })
                .then(res => {
                  console.log(res,'收藏')
                  let obj = {};
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName
                  this.downFile(obj);
                  // downLoadFileReName()
                  this.$message({
                    type: "success",
                    offset: "200",
                    message: "收藏完成"
                  });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
          // let shiwutitle = this.form.deptTableHeader;
          // let draftInfo = this.form.attchmentFileInfo;
          // let that = this;
          // exportTable.getPdf(
          //   shiwutitle,
          //   draftInfo,
          //   "printHtml",
          //   this.$businessCode.fawglfj,
          //   shiwutitle,
          //   that
          // );
          break;
        case "操作指南":
          this.handBook("YZGL");
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/sealDepartment",
            query: {
              id: this.sendId || this.$route.query.id,
              registeHeader: this.form.deptTableHeader,
              numYear:this.numYears
            }
          });
          break;
        case "查看流程":
          this.viewProcess();
          break;
      }
    },
    /**
     * 收回
     */
    takeBack() {
      this.$api.sealManage
        .shouhui({
          id: this.sendId || this.$route.query.id,
          markOrderType: "4"
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "该审批单已成功收回！"
          });
          // this.$router.push("/sealManage/useSeal");
          this.$intent.closeWindow(this);
        });
    },
    /**
     * 取消模板弹框
     */
    cancelTemplate() {
      this.tempForm.templTitle = "";
      this.templateDialog = false;
    },
    /**
     * 确认生成模板
     */
    confirmBuildTemplate() {
      if (this.tempForm.templTitle === "") {
        this.$message({
          type: "warning",
          message: "请输入模板名称！"
        });
        return;
      }
      this.$api.sealManage
        .BanMban({
          markOrderType: "4",
          id: this.sendId || this.$route.query.id,
          modelName: this.tempForm.templTitle
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: "模板名称生成成功！"
            });
            this.tempForm.templTitle = "";
            this.templateDialog = false;
            this.$router.push("/sealManage/useSeal");
          }
        });
    },
    /**
     * 查看流程
     */
    viewProcess() {
      if (this.form.workflowId === "") {
        this.flowChartList = [
          {
            DSC: this.userInfo.humanName,
            EXCNM: this.userInfo.humanName,
            HUMANCODE: this.userInfo.humanCode,
            NODE: "起草"
          }
        ];
        this.$refs.dialogLine.openDialog();
        return;
      }
      this.$api.pubInfo
        .Lookcx({
          curProcessInstId: this.form.workflowId,
          numYear: this.numYears
        })
        .then(res => {
          this.flowChartList = res.data;
          this.$refs.dialogLine.openDialog();
        });
    },
    backDarft() {
      this.$router.push("/sealManage/useSeal/draft");
    },
    /**
     * 获取上传附件
     */
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id ,numYear:this.numYears}).then(res => {
        console.log(res, "-----------------获取附件-------------");
        if (res.code == "SUCCESS") {
          this.$nextTick(() => {
            this.$set(this.form, "attchmentFileInfo", res.data);
            this.uploadConfig.filesHas = this.form.attchmentFileInfo;
          });
        }
      });
    },
    fileList(files) {
      if (this.form.attchmentFileInfo && this.form.attchmentFileInfo.length) {
        this.form.attchmentFileInfo.push(...files);
      } else {
        this.form.attchmentFileInfo = files;
      }
      this.uploadConfig.filesHas = this.form.attchmentFileInfo;
      if (!this.form.attachs) {
        this.form.attachs = [];
      }
      files.forEach(item => {
        this.form.attachs.push(item.id);
      });
      this.form.attach = this.form.attachs.join(",");
      this.$forceUpdate();
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.form.attchmentFileInfo[n - 1].id,
          sort: this.form.attchmentFileInfo[n].sort
        },
        {
          id: this.form.attchmentFileInfo[n].id,
          sort: this.form.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.form.attchmentFileInfo[n];
      this.form.attchmentFileInfo[n] = this.form.attchmentFileInfo[n - 1];
      this.form.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    downRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.form.attchmentFileInfo[n + 1].id,
          sort: this.form.attchmentFileInfo[n].sort
        },
        {
          id: this.form.attchmentFileInfo[n].id,
          sort: this.form.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.form.attchmentFileInfo[n];
      this.form.attchmentFileInfo[n] = this.form.attchmentFileInfo[n + 1];
      this.form.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
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
                this.form.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.form.attchmentFileInfo;
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
    // 附件下载
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
.br {
    
    font-size: 14px;
    line-height: 24px;
    word-wrap: break-word;
    word-break: break-all;
  }
.doneDepartment {
  min-height: 100vh;
  background: #fff;
  .ewm {
    width: 150px;
    margin: 0 auto;
  }
  .dialogImport > .el-dialog {
    width: 20% !important;
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
  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 35px;
    color: #409eff;
    font-weight: 800;
  }
  .designForm {
    border: 1px solid #ccc;
    width: 92%;
    padding: 2% 2%;
    margin: auto;
    .el-row {
      margin-bottom: 5px;
    }
  }
  .box {
    border: 1px solid red;
    background: #fef7e7;
    box-sizing: border-box;
    margin-bottom: 30px;
    display: flex;
    .el-form-item {
      margin-bottom: 0 !important;
    }
    > div {
      display: inline-block;
    }
  }
  //----------------------------  收藏表单的样式 start------------------------------
  .tablePrint {
    width: 900px;
    margin: 0 auto;
    background-color: white;
    z-index: -999;
    position: fixed;
    .docTable {
      table {
        border-color: #000;
      }
      .el-table--border,
      .el-table--group {
        border: none;
      }
      .el-table {
        color: #000;
        td {
          border-bottom: none;
        }
      }
      .el-table--border td {
        border-right: none;
      }
      .el-table--border th {
        border-right: 1px solid #000 !important;
      }
      .el-table th.is-leaf {
        border-bottom: 1px solid #000 !important;
      }
      .el-table thead,
      .el-table__empty-text {
        color: #000;
      }
    }

    .opinion-container {
      overflow: hidden;
    }
    .opinion-container .content {
      float: left;
      margin-left: 8px;
      margin-top: 10px;
      width: 100%;
    }
    .opinion-container .link {
      float: right;
      margin-right: 25px;
      margin-bottom: 8px;
      text-align: right;
    }
    .printTableList {
      width: 94%;
      margin: 0 auto;

      tr {
        height: 40px;
        td {
          width: 12%;
          // text-align: center;
          // vertical-align: middle;
        }
      }
    }
    .title-h1 {
      font-family: 宋体;
      font-size: 35px;
      text-align: center;
      line-height: 100px;
    }
    // .printButton {
    //   position: absolute;
    //   right: 28%;
    //   z-index: 10;
    //   top: 6%;
    // }
    td {
      border: 1px solid #000;
    }
    .tcont {
      padding-bottom: 5px;
      border-bottom: 1px solid #dac6c5;
    }
    .tcont:last-child {
      border-bottom: none;
    }
    .tcont2 {
      text-align: right;
      padding-top: 5px;
      width: 100%;
      height: 30px;
    }
    .tcont2 > div {
      float: right;
      /* background-color:#F2CACB; */
    }
    .issueTable {
      height: 100%;
      border-collapse: collapse;
      border: none;
      width: 100%;
    }
    .issueTable tr:nth-of-type(1) {
      border-top: none;
    }
    .issueTable tr:last-child {
      border-bottom: none;
    }
    .issueTable td {
      border: none;
    }
    .issueTable tr {
      line-height: 25px;
      text-align: center;
      border: solid 1px #000;
      border-left: none;
      border-right: none;
    }
    .d_flex {
      // display: flex;
      // padding-bottom: 20px;
      .d_b100 {
        width: 100%;
    white-space: normal;
      }
     
    }
    .pos_r {
      position: relative;
    }
    .printButton {
      position: absolute;
      top: 55%;
      right: 3%;
    }
  }
  //----------------------------  收藏表单的样式 end------------------------------
}
.adviceInfo {
  line-height: 20px;
  font-size: 14px;
}
</style>