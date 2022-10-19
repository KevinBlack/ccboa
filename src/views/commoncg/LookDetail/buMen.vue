<!--
 * @Author: your name
 * @Date: 2020-08-14 15:28:06
 * @LastEditTime: 2022-01-25 15:40:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\sealManage\useSeal\department\department.vue
-->
<template>
  <div class="department" id="department">
    <!-- 部门中收藏的表单布局  勿动start -->

    <!-- 部门中收藏的表单布局  勿动end -->

    <div class="headerClick">
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('关闭')"
        v-if="this.$route.query.type!='2'"
      >关闭</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('关闭1')"
        v-if="this.$route.query.type=='2'"
      >关闭</el-button>
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('保存')">保存</el-button>
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('查看流程')">查看流程</el-button>

      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('打印处理单')">打印处理单</el-button>
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('收藏')">收藏</el-button>
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('操作指南')">操作指南</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('维护')"
        v-if="this.$route.query.type!='2'"
      >维护</el-button>

      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('生成模板')"
        v-if="this.$route.query.type=='2'"
      >生成模板</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('流程调度')"
        v-show="!Isweihu"
      >流程调度</el-button>

      <el-button
        @click="buttonClick('归档')"
        class="bank_grid_comtent_active"
        v-if="this.$route.query.type=='2'&&form.onFileFlag=='1'&&form.extractFlag=='1'"
      >归档</el-button>
      <el-button
        @click="buttonClick('区块链归档')"
        class="bank_grid_comtent_active"
        v-if="this.$route.query.type=='2'&&form.isNewFilePlace"
       >区块链归档</el-button>
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
          <span style="color: red;">{{$route.query.id ? form.currentNode : "起草"}}</span>
        </el-form-item>
        <el-form-item label="当前处理人:">
          <span style="color: red;">{{form.currentUser ? form.currentUser : form.draftUser}}</span>
        </el-form-item>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否归档" v-if="this.$route.query.type=='2'">
            <el-radio-group v-model="form.onFileFlag">
              <el-radio :label="'0'">是</el-radio>
              <el-radio :label="'1'">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否抽取" v-if="this.$route.query.type=='2'">
            <el-radio-group v-model="form.extractFlag">
              <el-radio :label="'0'">是</el-radio>
              <el-radio :label="'1'">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人" prop="draftUser">
            <el-input v-model="form.draftUser" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="tel">
            <el-input
              v-model="form.tel"
              :disabled="Isweihu"
              oninput="value=value.replace(/[^\-\,\d\*\ ]/g,'')"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请日期" prop="draftDate">
            <el-input v-model="form.draftDate" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用印日期" prop="useTime" ref="useTime">
            <el-input v-model="form.useTime" :disabled="Isweihu" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请单位" prop="departFirstDepartment" ref="departFirstDepartment">
            <el-select
              v-model="form.departFirstDepartment"
              style="width: 100%"
              placeholder="请选择所属部门"
              :disabled="Isweihu"
              @change="departFirstDepartmentChange"
            >
              <el-option
                v-for="(item, index) in draftOrganOption"
                :key="index"
                :label="item.firstUnitName"
                :value="item.firstUnitName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编号" prop="documentNo">
            <el-input v-model="form.documentNo" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="编号" prop="documentNo">
            <el-input v-model="form.documentNo" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用印日期" prop="useTime">
            <el-input v-model="form.useTime" :disabled="Isweihu" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col>
          <el-form-item label="标题" prop="title" ref="title">
            <el-input v-model="form.title" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用印事由和用印文件名称" prop="markReson" ref="markReson">
            <el-input
              type="textarea"
              v-model="form.markReson"
              :disabled="Isweihu"
              maxlength="200"
              :rows="5"
              show-word-limit
            ></el-input>
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
          <el-form-item label="盖章状态">
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
          <el-form-item label="发往单位" prop="sendDept" ref="sendDept">
            <el-input v-model="form.sendDept" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <detail-list
            :isWeiHu="Isweihu"
            listtype="send"
            lableTitle="审批意见"
            :texTs="form.ygBmYj"
            :formadatalist="form.ygBmYjs"
            @delefunc="delefunc"
          ></detail-list>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <detail-list
            :isWeiHu="Isweihu"
            listtype="send"
            lableTitle="印章保管人意见"
            :texTs="form.yzBgrYj"
            :formadatalist="form.yzBgrYjs"
            @delefunc="delefunc"
          ></detail-list>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="经办人承诺" v-if="form.jbrChns!==undefined&&form.jbrChns.length>0">
            <div class="d_flex">
              <el-row
                class="d_b100"
                v-for="(item, index) in form.jbrChns"
                :key="index"
                style="margin: 5px 0; border: 1px solid #ccc"
              >
                <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px">
                  <div class="br" style="min-height: 80px">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span class="pad_lr10">{{ item.lk }}</span>
                    <div>{{ item.ct }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="经办人承诺" v-else>
            <el-checkbox v-model="checked" :disabled="readFields.jbrChn">{{form.jbrChn}}</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="thIdeas!==undefined &&thIdeas.length>0" :span="23">
          <el-form-item label="退回原因">
            <!-- <el-input type="textarea" v-model="form.thIdea" :disabled="editedIdeaFields.yyBgr"></el-input> -->
            <div class="d_flex">
              <el-row
                class="d_b100"
                v-for="(item, index) in thIdeas"
                :key="index"
                style="margin: 5px 0; border: 1px solid #ccc"
              >
                <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px">
                  <div class="br" style="min-height: 80px">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span class="pad_lr10">{{ item.lk }}</span>
                    <div>{{ item.ct }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <detail-list
            :isWeiHu="Isweihu"
            listtype="send"
            lableTitle="备注"
            :texTs="form.remark"
            :formadatalist="form.remarks"
            @delefunc="delefunc"
          ></detail-list>
        </el-col>
      </el-row>
      <el-row v-if="configInfo.isErweima == '1' && configInfo.ewmMarkFlow">
        <el-col :span="24" style="text-align: center; margin-bottom: 20px">
          <span>二维码信息采集表</span>
        </el-col>
        <el-col :span="24">
          <el-form-item label="日期" prop="ewmRq" ref="ewmRq">
            <el-input v-model="form.ewmRq" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="主体" prop="ewmZt" ref="ewmZt">
            <el-input
              v-model="form.ewmZt"
              :maxlength="configInfo.ewmZtzs"
              show-word-limit
              placeholder="指签约对象等文本出具的受众,可缩写、简写。"
              :disabled="Isweihu"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事项" prop="ewmSx" ref="ewmSx">
            <el-input
              v-model="form.ewmSx"
              :maxlength="configInfo.ewmSxzs"
              show-word-limit
              placeholder="指该文本是什么，如贷款合同等。"
              :disabled="Isweihu"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div id="scfj" class="height_90"></div>
      <el-form-item label="附件" prop="attach" ref="attach">
        <el-col :span="23">
          <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList" :disabled="Isweihu"></upload-file-ts>
          <div class="tree_w" v-if="form.attchmentFileInfo && form.attchmentFileInfo.length">
            <el-scrollbar>
              <div v-for="(item, index) in form.attchmentFileInfo" :key="item.id" class="comp_list">
                <template>
                  <div class="command_file">
                    <span
                      class="name down"
                      @click="viewFile(item,null,item.fileName)"
                      :title="item.fileName"
                    >{{item.fileName}}</span>
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
                      <el-button
                        type="warning"
                        size="mini"
                        @click.native="deleteRow(index, item.id)"
                        :disabled="item.disabled"
                        v-if="deleteType"
                        round
                      >删除</el-button>
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
      生成模板弹窗
    -->
    <el-dialog title="生成模板" :visible.sync="templateopen" class="normalFormDia">
      <el-form :model="tempForm" label-width="100px" class="normalForm">
        <el-form-item label="请填写模板名称">
          <el-input v-model="tempForm.modelName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <!-- <el-button @click="templateDialog = false">取消</el-button> -->
        <el-button type="primary" @click="modelbtn">确定</el-button>
      </div>
    </el-dialog>
    <!--
      查看流程弹窗
    -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <!-- 二维码弹窗 -->
    <el-dialog title="二维码" :visible.sync="erweima" class="dialogImport">
      <div class="ewm">
        <div class="qrcode" ref="qrCodeUrl"></div>
      </div>
      <span style="text-align: center; display: block; margin-top: 20px">
        <el-button @click="printThis">打印</el-button>
        <el-button type="primary" @click="erweima = false">关闭</el-button>
      </span>
    </el-dialog>
    <!--    常用批语-->
    <appendWriteList
      v-dialogDrag
      :offenDevices="offenDevices"
      ref="writelist"
      v-if="appendWriteDialog"
      @childsaveselect="writelistvalue"
      @addCommonUse="addCommonUse"
      @deleId="deleteMassage"
    ></appendWriteList>
    <!-- 常用批语 -->
    <!-- <write-list-ts v-model="appendWriteDialog" @childsaveselect="writelistvalue"></write-list-ts> -->
    <!--流程调度树-->
    <select-person
      v-model="dialogState"
      :orgOrDeptId="selsecOrgOrDeptId"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></select-person>
    <!-- 用印查看图片&视频 -->
    <seal-img-detail ref="sealImgDetail"></seal-img-detail>
  </div>
</template>
<script>
// import selectPerson from "components/tree/treeTansun";
import mixins from "@/minixs/index";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import openOrDownLoadFile from "@/minixs/openOrDownLoadFile";
import sealImgDetail from "views/sealDrafttt/components/sealImgDetail";
import exportTable from "@/minixs/exportTable";
import QRCode from "qrcodejs2";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import writeListTs from "components/appendWriteList/writeListTs";
import appendWriteList from "components/viewFlow/perWrit";
import openOrDownLoadFiles from "@/minixs/shiwuLineWord";
import detailList from "../components/detailList";
import selectPerson from "components/viewFlow/dispatchTree"; //流程调度树
import mTable from "components/table/tTable";
import viewDraft from "@/minixs/viewDraft";
import useSealMixins from "@/views/sealDrafttt/mixins/index";
export default {
  name: "Bm",
  components: {
    selectPerson,
    mTable,
    uploadFileTs,
    shiwuFlow,
    sealImgDetail,
    // writeListTs,
    appendWriteList,
    detailList
  },
  mixins: [mixins, viewDraft,openOrDownLoadFile, openOrDownLoadFiles, useSealMixins],
  data() {
    return {
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      watchCk: "guanLiCk",
      deleteType: this.$route.query.type != "2",
      // 生成模板字段
      tempForm: {
        templTitle: ""
      },
      templateopen: false, //生成模板控制
      selsecOrgOrDeptId: "", //流程调度传id
      Isweihu: true,
      checked: true,
      offenDevices: [], //常用标语
      res: {},
      thIdeas: [],
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      /**
       * 部门组件的信息
       */
      loadingTree: true,
      // 生成编号标记
      documentNoNum: 0,
      // 表单是否可编辑（维护）
      inputDisable: true,
      // 用印名称 下拉框option
      sealNameOption: [],

      // 配置信息
      configInfo: {
        ewmMarkFlow: "",
        isErweima: "",
        ewmZtzs: "",
        ewmSxzs: ""
      },
      form: {
        deptTableHeader: "",
        currentNode: "起草",
        // 查看流程所传参数
        workflowId: "",
        tel: "",
        draftDate: "",
        draftUser: "",
        draftUserId: "",
        useTime: "", // 用印日期
        title: "",
        markReson: "", // 用印事由和用印文件名称
        jbrChn: "", // 默认勾选状态
        markNum: 0,
        remark: "",
        ygBmYj: "",
        yzBgrYj: "",
        /**
         * 印章机
         */
        rtfAssetListShow: "",
        rtfAssetList1: [],
        /**
         * 二维码信息采集
         */
        ewmRq: "", // 日期
        ewmZt: "", // 主体
        ewmSx: "", // 事项
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
      // 申请单位 下拉框option
      draftOrganOption: [],
      regSealFormRule: {},
      /**
       * 常用批语
       */
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型
      /**
       * 树状选择弹框
       */
      wcbfsId: "",
      treeData: [], //树弹框数据
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,
      // 保存成功后接受id 的字段
      sendId: "",
      /**
       * 上传附件
       */
      uploadConfig: {
        formId: "sealManage",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      // 获取附件列表时的id
      id: "",
      temporaryUseTime: "", // 临时的用印日期
      // 判断是否办结
      isImpDocDis: false,
      /**
       * 查看流程弹窗
       */
      flowChartList: [],
      bgDepartmentId: "",
      // 二维码弹窗
      erweima: false,
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      /**
       * 退回及退回修改弹窗信息
       */
      rebackDia: false,
      ThForm: {
        rebackReason: ""
      },
      thType: "", // 退回类型 0=》退回 1=》退回修改
      rebackDialog: {
        title: "退回", // 退回及退回修改弹框标题
        label: "退回原因",
        placeholder: "请输入退回原因"
      },

      // 标记流程调度/完成并发送
      isLinkChange: false,
      /**
       * 环节信息
       */
      huanJieMessage: {},
      //不可编辑控制域
      readFields: {
        draftUser: false, //申请人
        tel: false, //联系电话
        draftDate: false, //申请日期
        departFirstDepartment: false, // 申请单位id
        documentNo: false, //编号
        useTime: false, //用印日期
        title: false, //标题
        markReson: false, //用印事由和用印文件名称
        sendDept: false, //发往单位
        markNum: false, //用印数量
        markName: false, //印章名称
        jbrChn: false, //经办人承诺
        ewmZt: false, // 主体
        ewmSx: false // 事项
      },
      //必填控制域
      requiredFields: {
        draftUser: "",
        departFirstDepartment: "",
        title: "",
        markReson: "", //用印事由和用印文件名称
        sendDept: "",
        markNum: "",
        useTime: "",
        remark: "",
        ewmZt: "", // 主体
        ewmSx: "" // 事项
      },
      //可编辑意见域
      editedIdeaFields: {
        ygBmYj: true, //审批意见
        yzBgrYj: true, //印章保管人意见
        remark: true //备注
      },
      //必填意见域
      requiredIdeaFields: {
        attach: false,
        yzBgrYj: false,
        ygBmYj: false
      },

      documentNoNum1: "1",
      yzmc: ""
    };
  },
  watch: {},
  created() {
    this.notOpenPage();
    // this.selsecOrgOrDeptId = JSON.parse(
    //   localStorage.getItem("userInfo")
    // ).unitId;
    if (!this.$route.query.id) {
      this.yzlist();
    }
    /** 获取当前部门信息 */

    if (this.$route.query.draftOrgan) {
      let arr = JSON.parse(this.$route.query.draftOrganOption);
      console.log(arr);
      let departmentInfo = JSON.parse(this.$route.query.draftOrganOption);
      console.log(departmentInfo, "----------获取当前部门信息-----------");
      this.draftOrganOption = departmentInfo;
      this.form.departFirstDepartmentId = this.$route.query.draftOrgan; // 获取带进来的申请单位id
      this.draftOrganOption.map(item => {
        if (this.form.departFirstDepartmentId == item.firstUnitId) {
          console.log(item, "申请单位需要的item");
          let arr = item.unitCodes.split("/");
          this.wcbfsId = arr[arr.length - 1];
          this.form.currentDepartmentId = item.firstUnitId; // 获取当前处理人一级部门id
          this.form.departFirstDepartment = item.firstUnitName; // 获取申请单位名称
          this.form.draftDepartmentId = item.currUnitId; // 获取拟稿部门id
          this.form.draftDepartment = item.currUnitName; // 获取拟稿部门名称
          this.form.departName = item.firstUnitName;
          this.form.departId = item.firstUnitId;
          this.form.draftUserId = item.humanId; // 经办人id
          this.form.draftUser = item.humanName; // 经办人
          this.form.currentUserId = item.humanId; // 获取当前处理人id
          this.form.currentUser = item.humanName; // 当前处理人名称
          this.form.draftOrganId = item.unitId; // 获取拟稿机构id
          this.form.draftOrgan = item.unitName; // 获取拟稿机构名称
          this.form.tel = item.telMobile;
        }
      });
    }
    if (this.$route.query.id) {
      // 根据id 获取详情页
      this.id = this.$route.query.id;
      this.getDetailDepartment();
    } else {
      this.$nextTick(() => {
        this.getLink();
      });
      this.getSealTypeFun();

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.form.draftUser = userInfo.humanName;
      this.form.draftUserId = userInfo.humanId;
    }
    this.getSealTypeFun1();
  },
  mounted() {
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
  },
  methods: {
    beforeunloadHandler(e) {
      this.$intent.clonsWindowCk(this.$route.query.id || this.sendId);
    },
    //禁止打开相同页面
    notOpenPage() {
      var openFlagCk = localStorage.getItem("openFlagCk");
      if (openFlagCk) {
        var openFlagArr = JSON.parse(openFlagCk);
        openFlagArr.push(this.$route.query.id || this.sendId);
        openFlagArr = this.$intent.arrUniq(openFlagArr);
        localStorage.setItem("openFlagCk", JSON.stringify(openFlagArr));
      } else {
        var openFlagCk = [];
        openFlagCk.push(this.$route.query.id || this.sendId);
        localStorage.setItem("openFlagCk", JSON.stringify(openFlagCk));
      }
    },
    // 生成模板确定
    modelbtn() {
      this.$api.sealManage
        .BanMban({
          markOrderType: "4",
          id: this.sendId || this.$route.query.id,
          modelName: this.tempForm.modelName,
          numYear:this.numYears
        })
        .then(res => {
          console.log(res);
          this.$message({
            type: "success",
            message: "生成模板成功！"
          });
          this.templateopen = false;
        })
        .catch(res => {
          console.log(res);
        });
    },
    //删除意见
    delefunc(item) {
      console.log(item);
      this.$api.sealManage.delItem(item).then(res => {
        console.log(res);
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getDetailDepartment();
      });
    },
    sealNameOptions(val) {
      console.log(val, "ssss");
      this.sealNameOption.map((item, index) => {
        if (item.id == val) {
          this.yzmc = item.yzJiancheng;
          // this.wcbfsId = item.sdeptShowId;
          this.bgDepartmentId = item.sdeptShowId;

          this.getSealNumFun();
        }
      });
    },
    async yzlist(A, b) {
      let departmentInfo = JSON.parse(localStorage.getItem("userInfo"));
      let useJgIds = departmentInfo.unitId;
      if (A) {
        useJgIds = A;
      }
      await this.$api.sealManage
        .getsealList({
          useJgId: useJgIds,
          yzType: "bm",
          // draftOrganId: this.$route.query.draftOrganId
          draftOrganId: A || ""
        })
        .then(res => {
          // this.pagination.total = res.total
          this.sealNameOption = res.list;
          // this.form.markName = this.sealNameOption[0].id;
          // this.bgDepartmentId = this.sealNameOption[0].sdeptShowId;
          if (!A) {
            this.getOrgInfo();
            this.getSealNumFun();
          }
          this.sealNameOption.map((item, index) => {
            if (item.id == b) {
              this.yzmc = item.yzJiancheng;
              this.form.markName = item.id;
              this.bgDepartmentId = item.sdeptShowId; //  TODO
            } else {
              this.yzmc = item.yzJiancheng;
            }
          });

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
    InitializeData() {},
    /**
     * 获取用印类型
     */
    getSealTypeFun() {
      this.$api.sealManage
        .getUseSealType({ departId: this.form.departFirstDepartmentId })
        .then(res => {
          this.form.jbrChn = res.data.scStype;
          console.log(
            res,
            "-------------------获取用印类型---------------------"
          );
          this.form.deptTableHeader = res.deptTableHead;
          this.configInfo.ewmSxzs = res.data.ewmSxzs;
          this.configInfo.isErweima = res.data.isErweima;
          this.configInfo.ewmZtzs = res.data.ewmZtzs;
          this.configInfo.ewmSxzs = res.data.ewmSxzs;
          if (res.data.ewmMarkFlow) {
            let arr = res.data.ewmMarkFlow.split("#");
            arr.map(item => {
              console.log(item);
              if (item == "部门用印审批") {
                this.configInfo.ewmMarkFlow = item;
              }
            });
          }
          //获取印章名称
          if (res.data.markName && res.data.markName !== "") {
            console.log(
              "为什么走这里",
              this.sealNameOption[0],
              this.form.markName
            );
            // this.sealNameOption = res.data.markName.split(",");
            // 如果没有id  则设置默认为第一个
            if (!this.form.draftDate) {
              // 获取申请时间
              this.form.draftDate = res.newDateYY;
              // 获取二维码日期
              this.form.ewmRq = res.newDate;
              // this.$set(this.form, "markName", this.sealNameOption[0]);
            }
          }
        });
    },
    async getSealTypeFun1() {
      await this.$api.sealManage
        .getUseSealType({ departId: this.form.departFirstDepartmentId })
        .then(res => {
          console.log(
            res,
            "-------------------获取用印类型---------------------"
          );

          this.configInfo.ewmSxzs = res.data.ewmSxzs;
          this.configInfo.isErweima = res.data.isErweima;
          this.configInfo.ewmZtzs = res.data.ewmZtzs;
          this.configInfo.ewmSxzs = res.data.ewmSxzs;
          if (res.data.ewmMarkFlow) {
            let arr = res.data.ewmMarkFlow.split("#");
            arr.map(item => {
              console.log(item);
              if (item == "部门用印审批") {
                this.configInfo.ewmMarkFlow = item;
              }
            });
          }
          //获取印章名称
          if (res.data.markName && res.data.markName !== "") {
            if (!this.form.draftDate) {
              // 获取申请时间
              this.form.draftDate = res.newDateYY;
              // 获取二维码日期
              this.form.ewmRq = res.newDate;
            }
          }
        });
    },
    /**
     * 获取编号
     */
    async getSealNumFun() {
      await this.$api.sealManage
        .getSealNum({
          markOrderType: "4",
          unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
          statusType: false,
          draftDepartmentId: this.wcbfsId,
          bgDepartmentId: this.bgDepartmentId
        })
        .then(res => {
          console.log(
            res,
            "-----------------------获取编号-------------------------"
          );
          this.$set(this.form, "documentNo", res.data);
        });
    },
    /**
     * 申请单位下拉框 change 事件
     */
    departFirstDepartmentChange(val) {
      console.log(val, "获取部门id");
      let _this = this;
      _this.getOrgInfo();
    },

    // / 删除意见域
    delItem(del) {
      console.log("shanchu", del);

      this.$api.sealManage
        .delItem({
          id: del.id
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getDetailDepartment();
        });
    },
    getSealNamecount(useSealArr) {
      // 印章名称及每份个数 this.sealDetailArr
      // 机器盖章   this.fldYyfsMechine
      // 手工盖章
      let fldYyfsHander = [];
      useSealArr.map(item => {
        if (this.form.markNum !== "0") {
          //老数据
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
     * 根据id获取详情页
     */
    getDetailDepartment() {
      return new Promise((resolve, reject) => {
        this.checked = true;
        this.uploadConfig.id = this.id;
        this.$api.sealManage
          .detailDepartment({
            id: this.$route.query.id,
            draftOrganId: this.$route.query.draftOrganId,
            numYear: this.numYears
          })
          .then(res => {
            console.log(res, "-------根据id 获取详情---------");
            this.form = res.data;
            // this.selsecOrgOrDeptId = res.data.draftOrganId;
            resolve(res.data);
            let As = res.data.documentNo.split("〕")[1];
            console.log("true", As);
            if (As === "号") {
              this.documentNoNum1 = "1";
            } else {
              this.documentNoNum1 = "2";
            }
            this.yzlist(res.data.draftOrganId, res.data.markName);
            //拟稿人部门
            this.form.departFirstDepartment = res.data.departFirstDepartment;
            this.form.departFirstDepartmentId =
              res.data.departFirstDepartmentId;
            //当前处理人部门
            this.form.departName = res.data.departName;
            this.form.departId = res.data.departId;
            //拟稿人
            this.form.draftUser = res.data.draftUser;
            this.form.draftUserId = res.data.draftUserId;
            this.wcbfsId = res.data.draftDepartmentId;
            // 获取附件id并且调用获取附件方法
            this.id = res.data.id;
            this.thIdeas = res.data.thIdeas; //印章保管人
            if (res.data.yzType) {
              this.randomStr1 = res.data.markMainForm;
              this.tableSealStateData = JSON.parse(res.data.yyType);
            }
            if (res.data.rtfAssetList1) {
              this.getSealNamecount(JSON.parse(res.data.rtfAssetList1));
            }
            // if (res.data.rtfAssetList1) {
            //   let jsonJ = res.data.rtfAssetList1
            //   this.rtfAssetList1 = JSON.parse(res.data.rtfAssetList1);
            //   this.form.rtfAssetList1 = JSON.parse(res.data.rtfAssetList1);
            // }
            this.getFileList();
            // this.getLink();
          });
      });
    },

    showWriteList(type) {
      this.$api.checkLz.perWritingSe({}).then(res => {
        this.offenDevices = res.data;
      });
      this.clickTypes = type;
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    deleteMassage(data) {
      console.log("data", data);
      this.$api.checkLz
        .perWritingDe({
          id: data
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$api.checkLz.perWritingSe({}).then(res => {
              this.offenDevices = res.data;
            });
          }
        });
    },
    //新增批语
    addCommonUse(data) {
      console.log("data", data);
      this.$api.checkLz
        .perWritingCr({
          hyDnr: data
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$api.checkLz.perWritingSe({}).then(res => {
              this.offenDevices = res.data;
            });
          }
        });
    },
    //常用批语
    writelistvalue(data) {
      switch (this.clickTypes) {
        case "ygBmYj":
          this.$set(
            this.form,
            "ygBmYj",
            this.form.ygBmYj ? this.form.ygBmYj + data : data
          );
          break;
        case "yzBgrYj":
          this.$set(
            this.form,
            "yzBgrYj",
            this.form.yzBgrYj ? this.form.yzBgrYj + data : data
          );
          break;
      }
    },
    //获取环节
    // getLink() {
    //   let params = {
    //     markOrderType: "4",
    //     id: this.sendId || this.$route.query.id || "",
    //     multiIdType: "0"
    //   };
    //   this.$api.sealManage.getLink(params).then(res => {
    //     this.huanJieMessage = res.Fields;
    //     // 必填控制域
    //     this.requiredFields = this.setRequiredFields(
    //       this.requiredFields,
    //       this.huanJieMessage.requiredFields
    //     );
    //     //不可编辑控制域
    //     this.readFields = this.setReadFields(
    //       this.readFields,
    //       this.huanJieMessage.readFields
    //     );
    //     this.buttonList = this.showButton(
    //       this.buttonList,
    //       this.huanJieMessage.visibleButtons,
    //       this.huanJieMessage.visibleButtonsBycondition
    //     ); //按钮
    //     //可编辑意见域
    //     this.editedIdeaFields = this.setEditedIdeaFields(
    //       this.editedIdeaFields,
    //       this.huanJieMessage.editedIdeaFields,
    //       this.huanJieMessage.editedIdeaFieldsBycondition
    //     );
    //     //必填意见域
    //     this.requiredIdeaFields = this.setRequiredIdeaFields(
    //       this.requiredIdeaFields,
    //       this.huanJieMessage.requiredIdeaFields
    //     );
    //     this.setRuleConfig();
    //   });
    // },
    setRuleConfig() {
      this.regSealFormRule = {
        attach: [
          {
            required: this.requiredIdeaFields.attach,
            message: "请引入附件"
          }
        ],
        draftUser: [
          {
            required: this.requiredFields.draftUser,
            message: "申请人不能为空",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: this.requiredFields.tel,
            message: "联系电话不能为空",
            trigger: "blur"
          }
        ],
        draftDate: [
          {
            required: this.requiredFields.draftDate,
            message: "申请日期不能为空",
            trigger: "blur"
          }
        ],
        markNum: [
          {
            required: this.requiredFields.markNum,
            message: "用印数量不能为空",
            trigger: "blur"
          }
        ],
        departFirstDepartment: [
          {
            required: this.requiredFields.departFirstDepartment,
            message: "申请单位不能为空",
            trigger: "change"
          }
        ],
        markName: [
          {
            required: this.requiredFields.markName,
            message: "印章名称不能为空",
            trigger: "change"
          }
        ],
        title: [
          {
            required: this.requiredFields.title,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        markReson: [
          {
            required: this.requiredFields.markReson,
            message: "用印事由和用印文件名称不能为空",
            trigger: "blur"
          }
        ],
        sendDept: [
          {
            required: this.requiredFields.sendDept,
            message: "发往单位不能为空",
            trigger: "blur"
          }
        ],
        // useTime: [{ required: this.requiredFields.useTime, message: '用印日期不能为空', trigger: 'blur' }],
        ygBmYj: [
          {
            required: this.requiredIdeaFields.ygBmYj,
            message: "审批意见不能为空",
            trigger: "change"
          }
        ],
        yzBgrYj: [
          {
            required: this.requiredIdeaFields.yzBgrYj,
            message: "印章保管人意见不能为空",
            trigger: "change"
          }
        ],
        jbrChn: [
          {
            required: this.requiredFields.jbrChn,
            message: "经办人承诺不能为空",
            trigger: "blur"
          }
        ],
        ewmZt: [
          {
            required: this.requiredFields.ewmZt,
            message: "主体不能为空",
            trigger: "blur"
          }
        ],
        ewmSx: [
          {
            required: this.requiredFields.ewmSx,
            message: "事项不能为空",
            trigger: "blur"
          }
        ]
      };
    },
    //完成并发送选人弹出框
    showCompDialog(data, status, type, params, dtype) {
      console.log("-------->", data, status, type, "params", params, dtype);
      if (status) {
        if (data.length === 0) {
          this.$message({
            type: "warning",
            message: "请选择下一节点处理人"
          });
          return;
        }
        let param = {
          markOrderType: "4",
          id: this.sendId || this.$route.query.id,
          nextUserId: String(data[0].id),
          nextUserName: data[0].name,
          nextAvyId: params.id,
          nextAvyName: params.name,
          unitId: data[0].deptId,
          wcfs: true,
          isAdmin: "1"
        };
        this.$api.sealManage.sureHander({ ...param }).then(res => {
          console.log(res, "完成并发送确认");
          if (res.code == "SUCCESS") {
            this.$message({
              type: "success",
              message: "已成功发送至下一节点"
            });
            // 调消息提醒接口
            this.$intent.closeWindow(this);
          }
          this.dialogState = false;
        });
      } else {
        this.dialogState = false;
      }
    },
    /**
     * 消息提醒
     */
    // MessageReminder() {
    //   let param = {
    //     userId: this.userInfo.humanId, //用户ID（humanCode）
    //     productCode: "yongyinYSP", //项目编号（对应字典（提醒项目分类））
    //     urgentType: "", //紧急程度（部分功能有） 没有
    //     infoType: "部门用印", //类型（模块名称中文（例如 收文，发文））
    //     infoTitle: this.form.title, //业务标题
    //     infoUser: this.userInfo.humanName, //提交人（起草人）
    //     // draftOrgan=D32960442&draftOrganName=
    //     pcUrl:
    //       "/sealManage/useSeal/draft/department?" +
    //       "draftOrgan=" +
    //       this.$route.query.draftOrgan +
    //       "&draftOrganName=" +
    //       this.$route.query.draftOrganName,
    //     instId: this.sendId || this.$route.query.id
    //   };
    //   this.$api.sealManage.Messageremind({ ...param }).then(res => {
    //     console.log(res, "消息提醒");
    //     // if (res.code == "SUCCESS") {
    //     //   this.$message({
    //     //     type: "success",
    //     //     message: res.msg
    //     //   });
    //     // }
    //     this.dialogState = false;
    //   });
    // },
    // 打印二维码
    printThis() {
      document.execCommand("print");
    },
    //关闭
    close() {
      // if (!this.form.currentUserId || (parseInt(this.form.currentUserId) === this.userInfo.humanId)) {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.save();
          this.$intent.closeWindow(this);
        })
        .catch(action => {
          console.log(action);
          if (action == "close") {
          } else {
            this.$intent.closeWindow(this);
          }
        });
      // } else {
      //   this.$intent.closeWindow(this);
      // }
    },
    /**
     *  点击保存按钮
     */
    save() {
      this.$refs.registerForm.validate((valid, object) => {
        if (valid) {
          if (!this.form.markNum) {
            this.$message({
              type: "warning",
              message: "请选择用印数量大于零"
            });
            return;
          }
          if (this.isImpDocDis) {
            this.$message({
              type: "warning",
              message: "该审批单已办结！"
            });
            return;
          }
          this.sendId || this.$route.query.id
            ? this.updateData()
            : this.addData();
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项后保存！"
          });
          // 滚动到必填项位置
          for (let i in object) {
            let dom = this.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
        }
      });
    },
    /**
     * 新增数据
     */
    addData() {
      let params = {};
      if (this.$route.query.currentNodeId) {
        params = {
          draftOrgan: this.$route.query.draftOrgan,
          currentNode: "起草"
        };
      }
      this.$api.sealManage
        .addDepartment(Object.assign(this.form, params))
        .then(res => {
          if (res.code === "SUCCESS") {
            this.sendId = res.id;
            this.uploadConfig.id = this.sendId;
            this.$message({
              type: "success",
              message: res.msg
            });
            // this.getLink();
          }
        });
    },
    /**
     * 更新数据
     */
    updateData() {
      this.$api.sealManage
        .updateDepartment({
          ...this.form,
          id: this.sendId || this.$route.query.id,
          isAdmin: "1"
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.Isweihu = true;
            this.getDetailDepartment();
          }
        });
    },
    updateData1() {
      this.$api.sealManage
        .updateDepartment({
          ...this.form,
          id: this.sendId || this.$route.query.id,
          isAdmin: "1"
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.Isweihu = true;
            this.getDetailDepartment();
          }
        });
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
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_WordTs",
                  query: {
                    state: "viewFile",
                    id: this.sendId || this.$route.query.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj, //A08462002
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
    // 确定退回 修改
    sureReback() {
      if (this.ThForm.rebackReason === "") {
        this.$message({
          type: "warning",
          message: this.rebackDialog.placeholder
        });
        return;
      }
      this.form.thIdea = this.ThForm.rebackReason;
      let param = {
        markOrderType: "4",
        thIdea: this.form.thIdea,
        id: this.sendId || this.$route.query.id,
        thType: this.thType //退回类型  0 退回， 1退回修改
      };
      this.$api.sealManage.Tuih({ ...param }).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            type: "success",
            message: "退回成功"
          });
          this.rebackDia = false;
          this.ThForm.rebackReason = "";
          this.$intent.closeWindow(this);
        }
      });
    },
    /**
     * 取消退回修改【清空表单】
     */
    cancelReback() {
      this.ThForm.rebackReason = "";
      this.rebackDia = false;
    },
    /**
     * 点击操作按钮
     */
    buttonClick(item) {
      switch (item) {
        case "区块链归档":
          this.$api.sealManage
            .blockChainBm({
              markOrderType: "4",
              id: this.$route.query.id || this.sendId,
              numYear:this.numYears
            })
            .then(res => {
              this.$message({
                type: "success",
                offset: "200",
                message: "区块链归档完成"
              });
            });

          break;
        case "归档":
          this.$api.sealManage
            .guiDang({
              markOrderType: "4",
              id: this.$route.query.id || this.sendId,
              numYear:this.numYears
            })
            .then(res => {
              this.$message({
                type: "success",
                offset: "200",
                message: "归档完成"
              });
            });
          break;
        case "生成模板":
          this.templateopen = true;
          break;
        case "关闭":
          this.close();
          break;
        case "关闭1":
          this.$intent.closeWindow(this);
          break;
        case "保存":
          this.save();
          break;
        case "流程调度":
          // this.dialogState = true;
          this.updateData1();

          this.getDetailDepartment().then(data => {
            console.log(data, "详情请");
            this.toNext();
          });
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
                  console.log(res, "收藏");
                  let obj = {};
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName;
                  this.downFile(obj);
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
              flag: "cld",
              numYear:this.numYears
            }
          });
          break;
        case "查看流程":
          this.viewProcess();
          break;
        case "维护":
          this.Isweihu = !this.Isweihu;
          break;
      }
    },
    /**
     * 流程调度
     */
    toNext() {
      this.$api.sealManage
        .flowControl({
          markOrderType: "4",
          id: this.sendId || this.$route.query.id
        })
        .then(res => {
          console.log(res, "环节数据");
          this.selsecOrgOrDeptId = res.currentOrgId;
          this.dialogState = true;
          let PCSAVYIDs = [];
          this.seletOptionsData = res.list.filter(item => {
            if (!PCSAVYIDs.includes(item.PCSAVYID)) {
              PCSAVYIDs.push(item.PCSAVYID);
              return item;
            }
          });
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

    /**
     * 获取上传附件
     */
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id,numYear:this.numYears }).then(res => {
        console.log(res, "--------------获取附件---------------");
        if (res.code == "SUCCESS") {
          this.$nextTick(() => {
            this.$set(this.form, "attchmentFileInfo", res.data);
            this.uploadConfig.filesHas = this.form.attchmentFileInfo;
          });
        }
      });
    },
    fileList(files) {
      console.log(files, "---------------上传附件------------------");
      if (
        this.form.attchmentFileInfo &&
        this.form.attchmentFileInfo.length > 0
      ) {
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
    // 附件上移
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
        .then(res => {
          console.log(res, "上移");
        });
    },
    /**
     * 附件下移
     */
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
        .then(res => {
          console.log(res, "下移");
        });
    },
    /**
     * 删除附件
     */
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          this.$api.setSysConfig.deleFile({ id: id }).then(res => {
            if (res && res.code == "SUCCESS") {
              this.form.attchmentFileInfo.splice(n, 1);
              this.$forceUpdate();
              this.uploadConfig.filesHas = this.form.attchmentFileInfo;
              this.$message({
                type: "success",
                message: "删除成功"
              });
            } else {
              this.$message({
                type: "error",
                showClose: true,
                message: "删除失败"
              });
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 附件下载
     */
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
    /**---------------------------------------------------------- 公共方法 --------------------------------------------- */
    /**
     * 获取部门一些信息【公共】
     */
    getOrgInfo() {
      this.draftOrganOption.map(item => {
        if (this.form.departFirstDepartment == item.firstUnitName) {
          console.log(item, "申请单位需要的item");
          let arr = item.unitCodes.split("/");
          this.wcbfsId = arr[arr.length - 1];
          this.getSealNumFun();
          this.form.currentDepartmentId = item.firstUnitId; // 获取当前处理人一级部门id
          this.form.departFirstDepartmentId = item.firstUnitId;
          this.form.departFirstDepartment = item.firstUnitName; // 获取申请单位名称
          this.form.draftDepartmentId = item.currUnitId; // 获取拟稿部门id
          this.form.draftDepartment = item.currUnitName; // 获取拟稿部门名称
          this.form.departName = item.firstUnitName;
          this.form.departId = item.firstUnitId;
          this.form.draftUserId = item.humanId; // 经办人id
          this.form.draftUser = item.humanName; // 经办人
          this.form.currentUserId = item.humanId; // 获取当前处理人id
          this.form.currentUser = item.humanName; // 当前处理人名称
          this.form.draftOrganId = item.unitId; // 获取拟稿机构id
          this.form.draftOrgan = item.unitName; // 获取拟稿机构名称
          this.form.tel = item.telMobile;
        }
      });
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
}
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.br {
  word-wrap: break-word;
  word-break: break-all;
}
.department {
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
    width: 94%;
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
  .delBox {
    width: 100%;
    height: 32px;
    .buttonItem {
      float: right;
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
</style>
