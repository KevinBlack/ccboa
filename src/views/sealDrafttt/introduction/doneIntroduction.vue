<!--
 * @Author: your name
 * @Date: 2020-08-14 15:29:37
 * @LastEditTime: 2021-06-10 19:21:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\sealManage\useSeal\draft\introduction\doneIntroduction.vue
-->
<template>
  <div class="doneIntroduction" id="doneIntroduction">
    <!-- 介绍信中收藏的表单布局  勿动start -->
   
    <!-- 介绍信中收藏的表单布局  勿动end -->

    <div class="headerClick">
      <el-button
        v-for="(item, index) in buttonList"
        @click="buttonClick(item.name)"
        class="bank_grid_comtent_active"
        :key="index"
        plain
        v-show="item.show"
      >{{ item.name }}</el-button>
    </div>
    <div class="shiwuTitle">{{ this.form.deptTableHeader }}</div>
    <el-form
      ref="registerForm"
      :model="form"
      label-width="170px"
      :rules="regSealFormRule"
      class="designForm"
      :disabled="false"
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
          <span style="color:red;">{{currentUserNames}}</span>
        </el-form-item>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请部门" prop="departFirstDepartmentId" v-show="!hanjie">
            <!-- 起草环节 -->
            <el-select
              v-model="form.departFirstDepartmentId"
              style="width: 100%"
              placeholder="请选择申请部门"
              :disabled="readFields.departFirstDepartmentId"
            >
              <el-option
                v-for="(item, index) in draftOrganOption"
                :key="index"
                :label="item.firstUnitName"
                :value="item.firstUnitId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请部门" prop="departFirstDepartment" v-show="hanjie">
            <el-input v-model="form.departFirstDepartment" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经办人" prop="draftUser">
            <el-input v-model="form.draftUser" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请时间" prop="draftDate">
            <el-input v-model="form.draftDate" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="印章类别" prop="markType">
            <!-- <el-radio-group v-model="form.markType" :disabled="readFields.markType">
              <el-radio v-for="item in markTypeOptions" :key="item" :label="item"></el-radio>
            </el-radio-group>-->
            <el-select
              v-model="form.markType"
              style="width: 100%"
              placeholder="请选择印章类别"
              :disabled="true"
            >
              <el-option
                v-for="(item, index) in markTypeOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经办人电话" prop="tel">
            <el-input v-model="form.tel" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编号" prop="documentNo">
            <el-input v-model="form.documentNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用印/生效时间" prop="useTime">
            <el-input v-model="form.useTime" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效天数" prop="usedDay">
            <el-input v-model="form.usedDay" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用印事由" prop="reason">
            <el-input
              type="textarea"
              v-model="form.reason"
              :rows="5"
              resize="none"
              :disabled="true"
            ></el-input>
            <div class="text-over">
              <span class="text-center">字数限制为500字</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="人员列表">
            <el-row></el-row>
            <el-row>
              <el-col style="text-align: right; margin-bottom: 5px">
                <el-button type="primary" :disabled="true">增加</el-button>
                <el-button type="danger" :disabled="true">删除</el-button>
              </el-col>
            </el-row>
            <el-table
              border
              ref="rtfAssetListTable"
              size="medium"
              :data="rtfAssetList"
              :style="{ width: '99.6%' }"
              :header-row-style="{ textAlign: 'center' }"
              :row-class-name="tableRowClassName"
            >
              <el-table-column type="selection" width="50px" label="选择" align="center"></el-table-column>
              <el-table-column type="index" width="60px" label="序号" align="center"></el-table-column>
              <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" readonly></el-input>
                </template>
              </el-table-column>
              <el-table-column label="身份证号" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.identifyId"
                    @blur="identifyIdBlur(scope.row)"
                    class="is-error"
                    readonly
                  ></el-input>
                  <span :class="scope.row.isNone ? 'validatorMess' : 'isNone'">请输入正确的身份证号</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="发往单位类型" prop="sendType">
            <el-radio-group v-model="form.sendType" :disabled="readFields.sendType">
              <el-radio label="0">系统内</el-radio>
              <el-radio label="1">系统外</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="联系单位" prop="sendDept" :disabled="true">
            <div style="display: flex" v-if="form.sendType === '0'">
              <el-input :disabled="true" v-model="form.sendDeptName" readonly></el-input>
              <el-button type="primary" style="marginleft: 5px" :disabled="true">选择</el-button>
            </div>
            <el-input v-model="form.sendDept" v-else :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="form.sendType === '1'">
        <el-row>
          <el-col>
            <el-form-item label="用印及个数" prop="rtfAssetList1">
              <div style="display: flex">
                <el-input v-model="form.rtfAssetListShow" :disabled="true" readonly></el-input>
                <el-button
                  type="primary"
                  style="marginleft: 5px"
                  :disabled="readFields.rtfAssetListShow"
                >用印选择</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="用印方式" prop="fldYyfs">
              <el-input v-model="form.fldYyfs" :disabled="readFields.fldYyfs"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="23">
          <el-form-item label="有权签字人审批" prop="ldBj">
            <el-radio-group
              v-model="form.ldBj0"
              :disabled="editedIdeaFields.ldBj"
              v-if="
              !editedIdeaFields.ldBj ||
              !(form.ldBjs && form.ldBjs.length != 0)
            "
            >
              <el-radio label="0">同意</el-radio>
              <el-radio label="1">不同意</el-radio>
            </el-radio-group>
            <el-input
              v-if="
              !editedIdeaFields.ldBj ||
              !(form.ldBjs && form.ldBjs.length != 0)
            "
              type="textarea"
              resize="none"
              v-model="form.ldBj"
              :disabled="editedIdeaFields.ldBj"
            ></el-input>
            <div class="d_flex">
              <el-row class="d_b100" style="margin: 5px 0;">
                <el-col
                  :span="24"
                  style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px;"
                  v-for="(item, index) in form.ldBjs"
                  :key="index"
                >
                  <div class="br">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span>{{ item.lk }}</span>
                    <br />
                    <span>{{ item.ct }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.ldBj">
          <i class="icon-font el-icon-edit select-chang"></i>
        </el-col>-->
      </el-row>

      <el-row>
        <el-col :span="23">
          <el-form-item label="部门主要负责人审批" prop="fzBj">
            <el-radio-group
              v-model="form.fzBj0"
              :disabled="editedIdeaFields.fzBj"
              v-if="
              !editedIdeaFields.fzBj ||
              !(form.fzBjs && form.fzBjs.length != 0)
            "
            >
              <el-radio label="0">同意</el-radio>
              <el-radio label="1">不同意</el-radio>
            </el-radio-group>
            <el-input
              v-if="
              !editedIdeaFields.fzBj ||
              !(form.fzBjs && form.fzBjs.length != 0)
            "
              type="textarea"
              resize="none"
              v-model="form.fzBj"
              :disabled="editedIdeaFields.fzBj"
            ></el-input>
            <div class="d_flex">
              <el-row class="d_b100" style="margin: 5px 0;">
                <el-col
                  :span="24"
                  v-for="(item, index) in form.fzBjs"
                  :key="index"
                  style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                >
                  <div class="br">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span>{{ item.lk }}</span>
                    <br />
                    <span>{{ item.ct }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.fzBj">
          <i class="icon-font el-icon-edit select-chang"></i>
        </el-col>-->
      </el-row>
      <!-- <el-row>
        <el-col>
          <el-form-item label="承办部门主要负责人审批" prop="ldIdea">
            <el-input v-model="form.ldIdea" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row v-if="form.sendType === '1'">
        <el-col :span="23">
          <el-form-item label="印章保管人意见" prop="flIdea">
            <el-input
              v-if="
              !editedIdeaFields.flIdea ||
              !(form.flIdeas && form.flIdeas.length != 0)
            "
              type="textarea"
              resize="none"
              v-model="form.flIdea"
              :disabled="editedIdeaFields.flIdea"
            ></el-input>
            <div class="d_flex">
              <el-row class="d_b100" style="margin: 5px 0;">
                <el-col
                  :span="24"
                  v-for="(item, index) in form.flIdeas"
                  :key="index"
                  style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                >
                  <div class="br">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span>{{ item.lk }}</span>
                    <br />
                    <span>{{ item.ct }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.flIdea">
          <i class="icon-font el-icon-edit select-chang"></i>
        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="承办部门处理意见" prop="ldIdea">
            <el-input
              v-if="
              !editedIdeaFields.flIdea ||
              !(form.ldIdeas && form.ldIdeas.length != 0)
            "
              type="textarea"
              resize="none"
              v-model="form.ldIdea"
              :disabled="editedIdeaFields.ldIdea"
            ></el-input>
            <div class="d_flex">
              <el-row class="d_b100" style="margin: 5px 0;">
                <el-col
                  :span="24"
                  v-for="(item, index) in form.ldIdeas"
                  :key="index"
                  style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                >
                  <div class="br">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span>{{ item.lk }}</span>
                    <br />
                    <span>{{ item.ct }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.ldIdea">
          <i class="icon-font el-icon-edit select-chang"></i>
        </el-col>-->
      </el-row>
      <el-row v-if="tableSealStateData.length > 0">
        <el-col>
          <el-form-item label="盖章状态">
            <m-table
              ref="SealStateTable"
              :disabled="false"
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
        <el-col :span="23">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-if="
              !editedIdeaFields.remark ||
              !(form.remarks && form.remarks.length != 0)
            "
              type="textarea"
              resize="none"
              v-model="form.remark"
              :disabled="editedIdeaFields.remark"
            ></el-input>
            <div class="d_flex">
              <el-row class="d_b100" style="margin: 5px 0;">
                <el-col
                  :span="24"
                  v-for="(item, index) in form.remarks"
                  :key="index"
                  style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                >
                  <div class="br">{{ item.nr }}</div>
                  <div class="adviceInfo">
                    <span>{{ item.lk }}</span>
                    <br />
                    <span>{{ item.ct }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="flags">
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
              :disabled="true"
              v-model="form.ewmZt"
              :maxlength="configInfo.ewmZtzs"
              show-word-limit
              placeholder="指签约对象等文本出具的受众,可缩写、简写。"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事项">
            <el-input
              :disabled="true"
              v-model="form.ewmSx"
              :maxlength="configInfo.ewmSxzs"
              show-word-limit
              placeholder="指该文本是什么，如贷款合同等。"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--
      查看流程弹窗
    -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <!-- 退回修改弹窗 -->
    <el-dialog title="退回修改" :visible.sync="rebackDia" width="30%">
      <el-form ref="Thdata" label-width="80px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="退回原因">
              <el-input v-model="rebackReason"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" style="text-align: center">
            <el-button type="primary" @click="sureReback">退回</el-button>
            <el-button @click="rebackDia = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--
      生成模板弹窗
    -->
    <el-dialog title="生成模板" :visible.sync="templateopen" class="normalFormDia">
      <el-form :model="tempForm" label-width="100px" class="normalForm">
        <el-form-item label="模板名称">
          <el-input v-model="tempForm.modelName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <!-- <el-button @click="templateDialog = false">取消</el-button> -->
        <el-button type="primary" @click="modelbtn">确定</el-button>
      </div>
    </el-dialog>
    <!-- 用印查看图片&视频 -->
    <seal-img-detail ref="sealImgDetail"></seal-img-detail>
  </div>
</template>
<script>
import mTable from "components/table/tTable";
import mixins from "@/minixs/index";
import useSealMixins from "../mixins/index";
import openOrDownLoadFile from "@/minixs/openOrDownLoadFile";
import exportTable from "@/minixs/exportTable";
import QRCode from "qrcodejs2";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import sealImgDetail from "views/sealDrafttt/components/sealImgDetail";
import openOrDownLoadFiles from "../../../minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "doneIntroduction",
  components: {
    mTable,
    shiwuFlow,
    sealImgDetail
  },
  mixins: [mixins, useSealMixins, openOrDownLoadFile, openOrDownLoadFiles,viewDraft],
  data() {
    return {
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      currentUserNames:"",
      hanjie: false,
      flags: false,
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      registeHeader:
        JSON.parse(localStorage.getItem("userInfo")).unitName +
        "介绍信用印审批单", //JSON.parse(localStorage.getItem('userInfo')).unitName,
      // 表单是否可编辑（维护）
      inputDisable: true,
      multiIdType: "0",
      // 印章类别容器
      markTypeOptions: [],
      // 配置信息
      configInfo: {},
      num1Str: "",
      form: {
        // 表头数据
        deptTableHeader: "",
        // 查看流程所传参数
        title: "",
        workflowId: "",
        departFirstDepartmentId: "", // 申请部门id
        draftUser: "",
        draftUserId: "",
        sendType: this.$route.query.type, // 发往单位类型 1=》系统内 2=》系统外
        sendDept: "",
        rtfAssetList1: "",
        fldYyfs: "",
        useTime: "",
        flIdea: "",
        ldBj0: "",
        fzBj0: "",
        ldBj: "",
        fzBj: "",
        ldIdea: "",
        reason: "",
        remark: "",
        departFirstDepartment: "" // 申请部门
      },
      // 申请部门 下拉option
      draftOrganOption: [],
      /**
       * 表单校验规则
       */
      regSealFormRule: {},
      // 用印材料信息
      rtfAssetList: [],
      // 机器盖章数组
      fldYyfsMechine: [],
      // 印章名称及每份个数
      sealDetailArr: [],
      //盖章状态
      isShowSealState: false,
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
      // 所有批次用印信息数组
      sealInfoArr: [],
      sendId: "",
      // 判断是否办结
      isImpDocDis: true,
      /**
       * 查看流程的数据容器
       */
      flowChartList: [],
      /**
       * 生成模板弹窗
       */
      templateopen: false,
      tempForm: {
        modelName: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      // 退回修改弹窗
      rebackDia: false,
      // 退回原因
      rebackReason: "",
      //不可编辑控制域
      readFields: {
        departFirstDepartmentId: true, //申请部门id
        draftUser: true, //经办人
        draftDate: true, //申请时间
        markType: true, //印章类别
        tel: true, //经办人电话
        documentNo: true, //编号
        useTime: true, //用印/生效时间
        usedDay: true, //有效天数
        title: true, //标题
        reason: true, //用印事由
        sendType: true, //发往单位类型
        sendDept: true, //联系单位
        rtfAssetListShow: true, //用印及个数
        fldYyfs: true //用印方式
      },
      //可编辑意见域
      editedIdeaFields: {
        //reason: true,//用印事由
        remark: true, //备注
        ldBj: true, //有权签字人审批
        fzBj: true, //部门主要负责人审批
        flIdea: true, //印章保管人意见
        ldIdea: true //承办部门处理意见
      },
      buttonList: [
        { name: "关闭", type: "guanbi", show: true },
        { name: "收回", type: "shouhui", show: false },
        { name: "查看流程", type: "cklc", show: true },
        { name: "打印处理单", type: "dycld", show: true },
        { name: "收藏", type: "shoucang", show: true },
        { name: "操作指南", type: "czzn", show: true },
        { name: "生成模板", type: "scmb", show: false },

      ]
    };
  },
  watch: {},
  created() {
    /** 获取当前部门信息 */
    let departmentInfo = JSON.parse(localStorage.getItem("unitInfo"));
    this.draftOrganOption = departmentInfo;
  },
  mounted() {
    // 根据id 获取详情信息
    if (this.$route.query.id) {
      this.getDetailIntroduction();
    }
    // this.$set(this.form, 'tel', JSON.parse(localStorage.getItem('unitInfo'))[0].telMobile.split(',')[1])
    this.getUseSealTypeFun();
    if (this.$route.query.id || this.form.currentNode == "起草") {
      this.hanjie = true;
    } else {
      this.hanjie = false;
    }
    console.log(this.hanjie, "this.hanjie");
  },
  methods: {
    // 生成模板确定
    modelbtn() {
      this.$api.sealManage
        .BanMban({
          markOrderType: "2",
          id: this.sendId || this.$route.query.id,
          modelName: this.tempForm.modelName
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
    /**
     * 获取印章类型
     */
    getUseSealTypeFun() {
      // 获取用印类型
      this.$api.sealManage.getUseSealType({}).then(res => {
        console.log(res, "获取配置信息");
        this.configInfo = res.data;
        if (
          this.configInfo.isErweima === "1" &&
          this.configInfo.ewmMarkFlow &&
          this.configInfo.ewmMarkFlow.indexOf("介绍信") != -1
        ) {
          this.flags = true;
        }
        // 获取印章类别数据
        this.markTypeOptions = res.data.scUnit2.split(",");
        if (this.$route.query.id === undefined) {
          // 获取有效天数;
          this.form.usedDay = res.data.scSlevel;
          // 获取申请时间
          this.form.draftDate = res.newDateYY;
        }
      });
    },
    /**
     * 根据id 获取介绍信详情信息
     */
    getDetailIntroduction() {
      this.$api.sealManage
        .detailIntroduction({ id: this.$route.query.id,numYear:this.numYears  })
        .then(res => {
          console.log(res, "-----------------获取详情信息---------------");
          this.form = JSON.parse(JSON.stringify(res.data));
          if (res.data.authUserId) {
          this.currentUserNames =
            res.data.authUserName + "（由" + res.data.currentUser + "授权）";
          } else {
            this.currentUserNames = res.data.currentUser
          }
          this.num1Str = res.data.num1Str; //查看详情新增id
          console.log(this.num1Str, "this.num1Str");
          console.log(this.form, "this.for");
          //拟稿人部门
          this.form.departFirstDepartmentId = res.data.departFirstDepartmentId;
          this.form.departFirstDepartment = res.data.departFirstDepartment;
          //当前申请部门
          this.form.draftDepartment = res.data.draftDepartment;
          this.form.draftDepartmentId = res.data.draftDepartmentId;
          // 表头数据
          this.form.deptTableHeader = res.data.deptTableHeader;
          if (res.data.yyType) {
            this.randomStr1 = res.data.markMainForm;
            this.tableSealStateData = JSON.parse(res.data.yyType);
          }
          if (res.data.rtfAssetList1) {
            this.rtfAssetList1 = JSON.parse(res.data.rtfAssetList1);
            this.form.rtfAssetList1 = JSON.parse(res.data.rtfAssetList1);
            this.getSealNamecount(JSON.parse(res.data.rtfAssetList1));
          }
          this.form.ldBjs &&
            this.form.ldBjs.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr;
            });
          this.form.fzBjs &&
            this.form.fzBjs.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr;
            });
          if (this.form.ldBj) {
            let ldBjArr = this.form.ldBj.split("=");
            this.form.ldBj = ldBjArr[1];
            this.form.ldBj0 = ldBjArr[0];
          }

          if (this.form.fzBj) {
            let fzBjArr = this.form.fzBj.split("=");
            this.form.fzBj = fzBjArr[1];
            this.form.fzBj0 = fzBjArr[0];
          }

          if (this.form.finishTime) {
            // 已经办结的 没有收回按钮  有生成模板按钮
            this.buttonList[6].show = true;
          } else {
            // 已办
            this.buttonList[6].show = false;
            if(res.ifShouHui=='1'){
            this.buttonList[1].show = true;
            }
            
          }
          // 获取材料用印表格数据
          this.rtfAssetList = JSON.parse(
            JSON.stringify(JSON.parse(res.data.rtfAssetList))
          );
          // this.form.ldBj = ''
          // this.form.fzBj = ''
          // this.form.ldBj0 = ''
          // this.form.fzBj0 = ''
          // this.form.ldIdea = ''
          // this.form.reason = ''
          // this.form.remark = ''
        });
    },
    getSealNamecount(useSealArr) {
      // 印章名称及每份个数 this.sealDetailArr
      // 机器盖章   this.fldYyfsMechine
      // 手工盖章
      let fldYyfsHander = [];
      useSealArr.map(item => {
        this.sealDetailArr.push(`${item.sealName} ${item.sealNum}`);
        item.sealPosition === "用印机"
          ? this.fldYyfsMechine.push(item.sealName)
          : fldYyfsHander.push(item.sealName);
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
      this.$set(this.form, "rtfAssetListShow", this.sealDetailArr.join(","));
      console.log("this.form.rtfAssetListShow", this.form.rtfAssetListShow);
    },
    // 盖章状态表格数据加载
    loadSealStateData() {},
    identifyIdBlur(row) {
      let reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!reg.test(row.identifyId)) {
        this.$set(row, "isNone", true);
      } else {
        this.$set(row, "isNone", false);
      }
    },
    //关闭
    close() {
      // if (!this.form.currentUserId || (parseInt(this.form.currentUserId) === this.userInfo.humanId)) {
      this.$intent.closeWindow(this);

      // } else {
      //   this.$intent.closeWindow(this);
      // }
    },
    /**
     *  操作指南
     */
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
    // 确定退回修改
    sureReback() {
      this.form.thIdea = this.rebackReason;
      let param = {
        markOrderType: "3",
        thIdea: this.form.thIdea,
        id: this.sendId || this.$route.query.id
      };
      this.$api.sealManage.Tuih({ ...param }).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            type: "success",
            message: "退回成功"
          });
          this.rebackDia = false;
          this.rebackReason = "";
        }
      });
    },
    /**
     * 点击操作按钮
     */
    buttonClick(item) {
      switch (item) {
        case "关闭":
          this.close();
          break;
        case "收回":
          this.takeBack();
          break;
        case "生成模板":
          this.templateopen = true;
          break;
        case "查看流程":
          this.viewProcess();
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
                  markOrderType: "2",
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
          // exportTable.getPdf(this.registeHeader, [], "introduction", "A08462002", "", this)
          // let title = this.registeHeader;
          // let that = this;
          // exportTable.getPdf(
          //   title,
          //   "",
          //   "printHtml",
          //   this.$businessCode.fawglfj,
          //   title,
          //   that
          // );
          break;
        case "操作指南":
          this.handBook("YZGL");
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/sealIntroduction",
            query: {
              id: this.sendId || this.$route.query.id,
              registeHeader: this.registeHeader,
              numYear:this.numYears
            }
          });
          break;
        case "生成介绍信":
          this.scjsx();
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
          markOrderType: this.$route.query.markOrderType // 标记是介绍信用印
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
     * 查看流程
     */
    viewProcess() {
      console.log(this.num1Str, "this.num1str");
      if (this.form.workflowId === "") {
        this.flowChartList = [
          {
            // DSC: this.userInfo.humanName,
            EXCNM: this.userInfo.humanName,
            HUMANCODE: this.userInfo.humanCode,
            NODE: "起草",
            TM: this.form.draftDate
          }
        ];
        this.$nextTick(() => {
          this.$refs.dialogLine.openDialog();
        });
        return;
      }
      this.$api.pubInfo
        .Lookcx({
          curProcessInstId: this.form.workflowId,
          subProcessInstId: this.num1Str,
          numYear: this.numYears
        })
        .then(res => {
          this.flowChartList = res.data;
          this.$nextTick(() => {
            this.$refs.dialogLine.openDialog();
          });
        });
    },
    backDarft() {
      this.$router.push("/sealManage/useSeal/draft");
    },
    /**
     * 用印材料信息
     */
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
.br {
  font-size: 14px;
  line-height: 24px;
  word-wrap: break-word;
  word-break: break-all;
}
.doneIntroduction {
  background: #fff;
  .ewm {
    width: 150px;
    margin: 0 auto;
  }
  .dialogImport > .el-dialog {
    width: 20% !important;
  }
  .validatorMess {
    display: block;
    margin-top: 3px;
    color: #f56c6c;
    font-size: 10px;
    line-height: 12px;
    text-align: left;
  }
  .el-table td {
    vertical-align: baseline !important;
  }
  // padding:20px 0 0 0  .cell td
  .isNone {
    display: none;
  }
  .designForm {
    border: 1px solid #ccc;
    width: 92%;
    padding: 2% 2%;
    margin: auto;
  }
  .box {
    border: 1px solid red;
    background: #fef7e7;
    box-sizing: border-box;
    margin-bottom: 30px;
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
    .qianF {
      overflow: hidden;
      .p1 {
        float: left;
        // margin-left: 8px;
        margin-top: 10px;
        width: 100%;
      }
      .p2 {
        float: right;
        margin-right: 25px;
        margin-bottom: 8px;
        text-align: right;
      }
    }

    .piece {
      overflow: hidden;
    }
    .piece .text1 {
      float: left;
      margin-left: 8px;
      margin-top: 10px;
      width: 100%;
    }
    .piece .text2 {
      float: right;
      margin-right: 25px;
      margin-bottom: 8px;
      text-align: right;
    }

    .beiZh {
      overflow: hidden;
    }
    .beiZh .content {
      float: left;
      margin-left: 8px;
      margin-top: 10px;
      width: 100%;
    }
    .beiZh .name {
      float: right;
      margin-right: 25px;
      margin-bottom: 8px;
      text-align: right;
    }

    .chuanYue {
      overflow: hidden;
    }
    .chuanYue .chuanYue1 {
      float: left;
      margin-left: 8px;
      margin-top: 10px;
      width: 100%;
    }
    .chuanYue .chuanYue2 {
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
      .d_f1 {
        flex: 1;
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
  .text-over {
    position: relative;
    .text-center {
      position: absolute;
      right: 0;
      bottom: 0;
      display: flex;
      font-size: 12px;
      line-height: 30px;
      color: #666;
    }
  }
  .adviceInfo {
    line-height: 20px;
    font-size: 14px;
  }
}
</style>
