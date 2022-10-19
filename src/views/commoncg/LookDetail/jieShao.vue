<!--
 * @Author: your name
 * @Date: 2020-08-14 15:29:37
 * @LastEditTime: 2021-07-16 18:45:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\sealManage\useSeal\draft\introduction\introduction.vue
--> 
<template>
  <div class="introduction" id="introduction">
    <!-- 介绍信中收藏的表单布局  勿动start -->
    <!-- 介绍信中收藏的表单布局  勿动end -->
    <div class="headerClick">
      <!-- <el-button @click="buttonClick('用印')">用印（暂供开发使用）</el-button> -->
      <!-- <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button> -->
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
        @click="buttonClick('生成模板')"
        v-if="this.$route.query.type=='2'"
      >生成模板</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('维护')"
        v-if="this.$route.query.type!='2'"
      >维护</el-button>
       <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('流程调度')"
        v-show="!Isweihu"
      >流程调度</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('归档')"
        v-if="this.$route.query.type=='2'&&form.onFileFlag=='1'&&form.extractFlag=='1'"
      >归档</el-button>
      <el-button
        @click="buttonClick('区块链归档')"
        class="bank_grid_comtent_active"
        v-if="this.$route.query.type=='2'&&form.isNewFilePlace"
       >区块链归档</el-button>
    </div>
    <!-- deptTableHeader     +"介绍信用印审批单"   起草-->
    <div class="shiwuTitle">{{ form.deptTableHeader?form.deptTableHeader:'介绍信审批单' }}</div>
    <el-form
      ref="registerForm"
      :model="form"
      label-width="170px"
      :rules="regSealFormRule"
      class="designForm"
    >
      <div class="box">
        <el-form-item label="当前环节:">
          <span style="color: red">
            {{
            $route.query.id ? form.currentNode : "起草"
            }}
          </span>
        </el-form-item>
        <el-form-item label="当前处理人:">
          <span style="color: red">
            {{
            form.currentUser ? form.currentUser : form.draftUser
            }}
          </span>
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
          <el-form-item label="申请部门" prop="departFirstDepartmentId" v-show="!hanjie">
            <!-- 起草 -->
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
          <el-form-item label="申请部门" prop="departFirstDepartment" v-show="hanjie">
            <el-input v-model="form.departFirstDepartment" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经办人" prop="draftUser">
            <el-input v-model="form.draftUser" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请时间" prop="draftDate">
            <el-input v-model="form.draftDate" :disabled="Isweihu"></el-input>
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
              :disabled="Isweihu"
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
          <el-form-item label="经办人电话" prop="tel" ref="tel">
            <el-input v-model="form.tel" :disabled="Isweihu" maxlength="11"></el-input>
            <!-- <div class="el-form-item__error" v-show="telFlag">{{telErrorMsg}}</div> @blur="telBlur"-->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编号" prop="documentNo">
            <el-input v-model="form.documentNo" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用印/生效时间" prop="useTime">
            <el-input v-model="form.useTime" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效天数" prop="usedDay">
            <el-input v-model="form.usedDay" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="标题" prop="title" ref="title">
            <el-input v-model="form.title" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用印事由" prop="reason" ref="reason">
            <el-input
              type="textarea"
              v-model="form.reason"
              placeholder="填写不可多于500字"
              maxlength="500"
              show-word-limit
              :rows="5"
              resize="none"
              :disabled="Isweihu"
            ></el-input>
            <!-- <div class="text-over"><span class="text-center">字数限制为500字</span></div> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="人员列表">
            <el-row></el-row>
            <el-row>
              <el-col style="text-align: right; margin-bottom: 5px">
                <el-button type="primary" @click="addUseSealInfo" :disabled="Isweihu">增加</el-button>
                <el-button type="danger" @click="delUseSealInfo" :disabled="Isweihu">删除</el-button>
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
                  <el-input v-model="scope.row.name" :disabled="Isweihu"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="身份证号" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.identifyId"
                    @blur="identifyIdBlur(scope.row)"
                    class="is-error"
                    :disabled="Isweihu"
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
            <el-radio-group v-model="form.sendType" :disabled="Isweihu">
              <el-radio label="0">系统内</el-radio>
              <el-radio label="1">系统外</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="联系单位" prop="sendDept" ref="sendDept">
            <div style="display: flex" v-if="form.sendType === '0'">
              <el-input v-model="form.sendDeptName" readonly></el-input>
              <el-button
                type="primary"
                style="marginleft: 5px"
                @click="selLinkOrg"
                :disabled="Isweihu"
              >选择</el-button>
            </div>
            <el-input v-model="form.sendDept" v-else></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="ne">
        <el-row>
          <el-col>
            <el-form-item label="用印及个数" prop="list">
              <div style="display: flex">
                <el-input v-model="form.rtfAssetListShow" readonly></el-input>
                <el-button
                  type="primary"
                  @click="selUseSeal"
                  style="marginleft: 5px"
                  :disabled="Isweihu"
                >用印选择</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="用印方式" prop="fldYyfs">
              <el-input v-model="form.fldYyfs" :disabled="Isweihu"></el-input>
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
      </div>
      <el-row>
        <el-col :span="24">
          <detail-list
            :isWeiHu="Isweihu"
            listtype="send"
            lableTitle="有权签字人审批"
            :formadatalist="form.ldBjs"
            @delefunc="delefunc"
          ></detail-list>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <detail-list
            :isWeiHu="Isweihu"
            listtype="send"
            lableTitle="部门主要负责人审批"
            :formadatalist="form.fzBjs"
            @delefunc="delefunc"
          ></detail-list>
        </el-col>
      </el-row>
      <div v-show="form.sendType === '1'">
        <el-row>
          <el-col :span="24">
            <detail-list
              :isWeiHu="Isweihu"
              listtype="send"
              lableTitle="印章保管人意见"
              :formadatalist="form.flIdeas"
              @delefunc="delefunc"
            ></detail-list>
          </el-col>
        </el-row>
      </div>

      <el-row>
        <el-col :span="24">
          <detail-list
            :isWeiHu="Isweihu"
            listtype="send"
            lableTitle="承办部门处理意见"
            :formadatalist="form.ldIdeas"
            @delefunc="delefunc"
          ></detail-list>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <detail-list
            :isWeiHu="Isweihu"
            listtype="send"
            lableTitle="备注"
            :formadatalist="form.remarks"
            @delefunc="delefunc"
          ></detail-list>
        </el-col>
      </el-row>

      <el-row v-if="flags">
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
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 
      用印选择弹窗
    -->
    <el-dialog title="用印选择" :visible.sync="selUseSealDialog" width="80%">
      <el-table ref="selUseSealTab" border size="medium" :data="selUseSealTableData">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="使用机构" prop="sealOrg" align="center"></el-table-column>
        <el-table-column label="印章名称" prop="sealName" align="center"></el-table-column>
        <el-table-column label="存放位置" prop="sealPosition" align="center"></el-table-column>
        <el-table-column label="本材料用印个数">
          <template slot-scope="scope">
            <el-input-number :min="0" v-model="scope.row.sealNum"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="selUseSealDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSelUseSeal">确定</el-button>
      </div>
    </el-dialog>
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
      用印信息弹窗
    -->
    <el-dialog title="本批次用印信息" :visible.sync="sealInfoDialog">
      <el-form :model="sealInfoForm" label-width="100px">
        <el-form-item label="用印材料">
          <el-input disabled v-model="sealInfoForm.title"></el-input>
        </el-form-item>
      </el-form>
      <m-table
        ref="sealInfoTab"
        :tableData="sealInfoTabData"
        :tableCols="sealInfoTabCols"
        :sortable="false"
        :isPagination="false"
      />
      <div slot="footer">
        <el-button @click="sealInfoDialog = false">退出用印</el-button>
        <el-button type="primary" @click="nextBatch">下一批</el-button>
        <el-button type="primary" @click="sureUseSeal">确定</el-button>
      </div>
    </el-dialog>

    <!-- 
      选择上级行部门弹窗
    -->
    <org-tree
      v-model="showOrgTree"
      :title="selOrgTitle"
      :isSingle="true"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      :queryType="queryType"
      @orgList="getOrgList"
      :isSearchAll="isSearchAll"
    ></org-tree>
    <!-- 
      选择联系单位弹窗
    -->
    <el-dialog
      title="选择机构类型"
      :visible.sync="selOrgTypeDialog"
      :before-close="selOrgTypeDialogClose"
    >
      <el-form :model="selOrgTypeForm" label-width="150px">
        <el-form-item label="机构类型:">
          <el-radio-group v-model="selOrgTypeForm.orgType">
            <el-radio label="0">本级部门</el-radio>
            <el-radio v-if="this.$route.query.orgLevel!='0'" label="1">上级机构</el-radio>
            <el-radio label="2">同级机构</el-radio>
            <el-radio label="3">下级机构</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="selOrgTypeDialogClose">取消</el-button>
        <el-button type="primary" @click="sureSelOrgType">确定</el-button>
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
    <!-- 常用批语 -->
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
import mTable from "components/table/tTable";
import mixins from "@/minixs/index";
import orgTree from "components/tree/orgTreeyz";
import useSealMixins from "@/views/sealDrafttt/mixins/index";
import openOrDownLoadFile from "@/minixs/openOrDownLoadFile";
import openOrDownLoadFiles from "../../../minixs/shiwuLineWord";
import doDraftLook from "@/minixs/exportTableQueryScript";

import exportTable from "@/minixs/exportTable";
import QRCode from "qrcodejs2";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import writeListTs from "components/appendWriteList/writeListTs";
import sealImgDetail from "views/sealDrafttt/components/sealImgDetail";
import viewDraft from "@/minixs/viewDraft";
import appendWriteList from "components/viewFlow/perWrit";
import detailList from "../components/detailList";
import selectPerson from "components/viewFlow/dispatchTree"; //流程调度树

export default {
  name: "Jsx",
  components: {
    selectPerson,
    orgTree,
    mTable,
    shiwuFlow,
    detailList,
    sealImgDetail,
    appendWriteList
  },
  mixins: [
    mixins,
    doDraftLook,
    useSealMixins,
    openOrDownLoadFile,
    openOrDownLoadFiles,
    viewDraft
  ],
  data() {
    return {
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      watchCk:'guanLiCk',
      Isweihu: true,
      selsecOrgOrDeptId: "", //流程调度传id
      num: "",
      scjsxJg: "false", // 是否打印介绍信
      wScjsx: "true", //true
      isSearchAll: false,
      arr3: [
        "organ",
        "documentNo",
        "departFirstDepartment",
        "firstname",
        "nameNum",
        "reason",
        "useTime",
        "usedDay"
      ],
      pubMait2: {},
      scjsxData: {},
      objKow: {},
      ifView: 2, //生成介绍信相关
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      unitSyncCode: "", //获取用印选择弹出框
      flgsYJ: "", //获取一级部门新增 id
      flgsDQ: "", //获取当前部门新增 id
      flgs: "", //获取部门新增 id
      hanjie: false,
      flags: false,
      offenDevices: [], //常用标语
      // 标记类型（用印）
      markOrderType: "introduction",
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      // registeHeader:
      //   JSON.parse(localStorage.getItem("userInfo")).unitName +
      //   "介绍信用印审批单",
      // 已选择用印详情数组
      rtfAssetList1: [],
      // 生成编号标记
      documentNoNum1: "1",
      // 表单是否可编辑（维护）
      inputDisable: true,
      multiIdType: "0",
      // 印章类别数据
      markTypeOptions: [],
      // 查看流程新增id
      num1Str: "",
      // 配置信息
      configInfo: {},
      ldBj0: "", // 有权签字人审批单选按钮
      fzBj0: "",
      form: {
        // 表头数据
        deptTableHeader: "",
        // 查看流程所传参数
        title: "",
        workflowId: "",
        draftUser: "",
        draftDate: getToday(), // 申请时间
        markType: "", // 印章类别
        draftUserId: "",
        sendType: "",
        sendDept: "",
        sendDeptName: "", // 联系单位【输入框里面的字段】
        rtfAssetListShow: "",
        rtfAssetList1: "",
        fldYyfs: "",
        useTime: "",
        usedDay: "", // 有效天数
        flIdea: "",
        flIdeas: "",
        ldBj: "", // 有权签字人审批
        fzBj: "",
        ldIdea: "",
        reason: "",
        remark: "",
        /**
         * 二维码信息采集表
         */
        ewmRq: "", // 日期
        ewmZt: "", // 主体
        ewmSx: "", // 事项
        yyType: [],
        departFirstDepartmentId: "", // 申请部门id
        departFirstDepartment: "", // 申请单位名称
        draftDepartmentId: "", // 拟稿部门id
        draftDepartment: "", // 拟稿部门名称
        draftUserId: "", // 经办人id
        draftUser: "", // 经办人名称
        departCurrentId: "", //
        currentUserId: "", // 当前处理人id
        currentUser: "", // 当前处理人名称
        draftOrganId: "", // 拟稿机构id
        draftOrgan: "", // 拟稿机构名称
        currentDepartmentId: "", // 当前处理人一级部门id
        departName: "", // 当前处理人部门
        departId: "" // 当前处理人部门id
      },
      // 申请部门 下拉框option
      draftOrganOption: [],
      regSealFormRule: {},
      // 人员列表表格信息
      rtfAssetList: [],
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
       * 常用批语
       */
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型
      /**
       * 树状选择弹框
       */
      treeData: [], //树弹框数据
      dialogType: "dosend", //dosend
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,

      sendId: "",
      /**
       * 生成模板弹窗
       */
      templateopen: false,
      tempForm: {
        templTitle: ""
      },
      /**
       * 发送上级行弹窗
       */
      heigherOrgDialog: false,
      heigherOrgForm: {
        unitName: "",
        unitId: ""
      },
      showOrgTree: false,
      selOrgTitle: "",
      orgOrDept: 0,
      orgOrDeptId: "", // 机构id
      queryType: "", //查询级别
      // 行外单位表格数据
      heigherOrgTableData: [
        { a: "1", b: "2", c: "3", id: "0" },
        { a: "2", b: "1", c: "3", id: "1" },
        { a: "3", b: "2", c: "3", id: "2" }
      ],
      heigherOrgTableCols: [
        { label: "OA机构简称", prop: "a" },
        { label: "登录名", prop: "b" },
        { label: "机构综合代表中文名", prop: "c" }
      ],
      /**
       * 选择联系单位弹窗
       */
      selOrgTypeDialog: false,
      // 判断当前行是否为总行
      isUppestBank: true,
      selOrgTypeForm: {},
      // 判断是否办结
      isImpDocDis: false,
      /**
       * 查看流程弹窗
       */
      flowChartList: [],
      // 二维码弹窗
      erweima: false,

      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      // 退回修改弹窗
      rebackDia: false,
      ThForm: {
        rebackReason: ""
      },
      // 标记是否生成介绍信
      isGetIntro: false,
      // 标记流程调度/完成并发送
      isLinkChange: false,
      //控制电话号码提示消息的开关
      telFlag: false,
      telErrorMsg: "",
      yzscUnit: "",
      /**
       * 环节信息
       */
      huanJieMessage: {},
      //不可编辑控制域
      readFields: {
        departFirstDepartmentId: false, // 申请部门
        draftUser: false, //经办人
        draftDate: false, //申请时间
        markType: false, //印章类别
        tel: false, //经办人电话
        documentNo: false, //编号
        useTime: false, //用印/生效时间
        usedDay: false, //有效天数
        title: false, //标题
        reason: false, //用印事由
        sendType: false, //发往单位类型
        sendDept: false, //联系单位
        rtfAssetListShow: false, //用印及个数
        fldYyfs: false //用印方式
      },
      //必填控制域
      requiredFields: {
        useTime: "",
        usedDay: "",
        tel: "",
        title: "",
        reason: "",
        sendType: "",
        sendDept: "",
        rtfAssetListShow: "",
        ldBj: "",
        flIdea: "",
        fldYyfs: ""
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
      //必填意见域
      requiredIdeaFields: {},
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "发系统内单位", type: "fxtndw", show: false },
        { name: "完成并发送", type: "wcbfs", show: false },
        { name: "退回修改", type: "thxg", show: false },
        { name: "发送上级行", type: "fssjh", show: false },
        { name: "生成编号", type: "scbh", show: false },
        { name: "生成介绍信", type: "scjsx", show: false },
        { name: "打印介绍信", type: "dyjsx", show: false },
        { name: "查看流程", type: "cklc", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "生成模板", type: "scmb", show: false },
        { name: "生成生效时间", type: "scsxsj", show: false },
        { name: "生成用印时间", type: "scyysj", show: false },
        { name: "用印", type: "yongyin", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "删除此文", type: "shanchuciwen", show: false },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "流程调度", type: "lcdd", show: false },
        { name: "维护", type: "weihu", show: false },
        { name: "收回", type: "shouhui", show: false },
        { name: "退回", type: "tuihui", show: false },
        { name: "操作指南", type: "czzn", show: false },
        { name: "扫描二维码", type: "smewm", show: false }
      ],
      ne: false
    };
  },
  watch: {
    isGetIntro: {
      handler(val) {},
      immediate: true
    }
  },
  created() {
    this.notOpenPage()
    /** 获取当前部门信息 */

    // this.orgOrDeptId = departmentInfo.unitId;
    if (this.$route.query.draftOrgan) {
      let departmentInfo = JSON.parse(this.$route.query.draftOrganOption);
      this.draftOrganOption = departmentInfo;

      console.log(departmentInfo, "----------获取当前部门信息-----------");

      this.form.departFirstDepartmentId = this.$route.query.draftOrgan; // 获取带进来的申请单位id
      // this.getOrgInfo();
      this.draftOrganOption.map(item => {
        if (this.form.departFirstDepartmentId == item.firstUnitId) {
          console.log(item, "需要的目标");
          this.form.currentDepartmentId = item.firstUnitId; // 获取当前处理人一级部门id
          this.form.departFirstDepartmentId = item.firstUnitId;
          this.form.departFirstDepartment = item.firstUnitName; // 获取申请单位名称
          this.form.draftDepartmentId = item.currUnitId; // 获取拟稿部门id
          this.form.draftDepartment = item.currUnitName; // 获取拟稿部门名称
          /**
           * draftUserId、draftUser、currentUserId、currentUser 这些字段目前都取humanId 或者humanName的值
           */
          this.form.draftUserId = item.humanId; // 经办人id
          this.form.draftUser = item.humanName; // 经办人
          this.form.currentUserId = item.humanId; // 获取当前处理人id
          this.form.currentUser = item.humanName; // 当前处理人名称
          this.form.draftOrganId = item.unitId; // 获取拟稿机构id
          this.form.draftOrgan = item.unitName; // 获取拟稿机构名称 currUnitId
          this.flgsDQ = item.unitCodes.split("/")[
            item.unitCodes.split("/").length - 1
          ];
          this.flgsYJ = item.unitCodes.split("/")[0];
          const a = item.unitCodes.split("/")[1];
          this.$set(this.form, "departCurrentId", a);
          this.flgs = item.unitCodes.split("/")[1]; //新增
          if (item.unitCodes.indexOf("/") != -1) {
            console.log("11111", item.unitCodes);
            const a = item.unitCodes.split("/")[1];
            this.$set(this.form, "departCurrentId", a);
            this.flgs = item.unitCodes.split("/")[1]; //新增
          } else {
            console.log("22222", item.unitCodes);
            this.$set(this.form, "departCurrentId", item.unitCodes);
            this.flgs = item.unitCodes; //新增
          }
        }
      });
    }
    if (this.$route.query.id) {
      // 根据id 获取详情页
      this.getDetailIntroduction();
      // this.telBlur();
    } else {
      // this.form.deptTableHeader= JSON.parse(localStorage.getItem("userInfo")).unitName +"介绍信用印审批单"
      this.getSealNumFun();
    }
  },
  mounted() {
    window.addEventListener('beforeunload',e=>this.beforeunloadHandler(e))
    let Jb = JSON.parse(localStorage.getItem("userInfo"));

    // JSON.parse(localStorage.getItem("unitInfo"));
    console.log(Jb, "7&&**&*&*&*&*&");

    this.orgOrDeptId = Jb.unitId;
    // debugger   .split(",")[1]
    if (JSON.parse(localStorage.getItem("unitInfo"))[0].telMobile) {
      this.$set(
        this.form,
        "tel",
        JSON.parse(localStorage.getItem("unitInfo"))[0].telMobile
      );
    }
    this.InitializeData();
    if (this.$route.query.id || this.form.currentNode == "起草") {
      this.hanjie = true;
    } else {
      this.hanjie = false;
    }
    console.log(this.hanjie, "this.hanjie");
  },
  methods: {
    beforeunloadHandler(e){
      this.$intent.clonsWindowCk(this.$route.query.id||this.sendId)
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
    //删除意见
    delefunc(item) {
      this.$api.sealManage
        .delItem({
          id: item
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success"
          });
        });
    },
    lookBody() {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      let num = this.num;
      const pathArrays = this.form.demoNoteId.split(",");
      bank_doDownloadFile.fileName = pathArrays[0];
      bank_doDownloadFile.filePath = pathArrays[1];
      let id = this.$route.query.id;
      this.doDraftLook(id, bank_doDownloadFile, num);
    },
    scjsxBtn() {
      let organ = JSON.parse(localStorage.getItem("userInfo")).unitName;
      let documentNo = this.form.documentNo;
      let departFirstDepartment = this.form.departFirstDepartment;
      console.log(this.rtfAssetList[0]);
      let firstname = this.rtfAssetList[0] ? this.rtfAssetList[0].name : "";
      let nameNum = this.rtfAssetList.length;
      let reason = this.form.reason;
      let useTime = this.form.useTime;
      let usedDay = this.form.usedDay;
      console.log("获取机构id", this.form.draftOrganId);
      this.$api.pubInfo
        .collocateTemplate({ organId: this.form.draftOrganId })
        .then(res => {
          console.log(res);
          let arr = [];
          let arr2 = [];
          let arr4 = [];
          this.ifView = 2;
          this.scjsxData = res.data;
          console.log(this.scjsxData);
          this.pubMait2 = this.scjsxData.mouldLable.split("$");
          for (const list in this.pubMait2) {
            const item1 = this.pubMait2[list].split("|");
            arr.push(item1[0]);
            arr2.push(item1[1]);
          }
          this.objKow = {};
          for (let i = 0; i < arr2.length; i++) {
            for (let j = 0; j < this.arr3.length; j++) {
              if (arr2[i] === this.arr3[j]) {
                arr4.push(arr2[i]);
              }
            }
          }
          console.log(arr, arr2, arr4, "获取arr4");
          let arr2Arry = arr4.map(e => eval(e));
          for (var i = 0; i < arr.length; i++) {
            this.objKow[arr[i]] = arr2Arry[i];
          }
          console.log(this.objKow);
          var newData = {
            menus: [],
            id: [],
            objKow: this.objKow
          };
          let menus = [];
          let id = [];
          for (let j = 0; j < this.rtfAssetList.length; j++) {
            menus.push(this.rtfAssetList[j].name + "\n");
            id.push(this.rtfAssetList[j].identifyId + "\n");
          }
          newData.menus.push(menus.join(""));
          newData.id.push(id.join(""));
          console.log(newData);
          let bank_doDownloadFile = {
            function: "doDownloadFile",
            fileName: this.scjsxData.attachNm,
            filePath: this.scjsxData.attachPath
          };
          this.$post
            .postData(
              "doDownloadFile",
              JSON.stringify(bank_doDownloadFile),
              "A0846C071"
            )
            .then(res => {
              if (res) {
                this.$store.dispatch("setDepartJsx", newData);
                this.doDraftQc(res);
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "下载失败",
                  duration: 500
                });
              }
            });
        });
    },
    // 起草正文带模板
    doDraftQc(fileInfo) {
      console.log(fileInfo, "fileInfo--起草正文");
      let data = this.$router.resolve({
        path: "/openAndSave_WordHk",
        query: {
          // isSynthesisFormat: this.synthesisFormat, //是否合成格式
          state: "viewFile",
          id: this.$route.query.id,
          zhengWenState: this.ifView,
          JYcode: "A0846C002",
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "测试.doc",
          tmpFilePath: fileInfo ? fileInfo.filePath : "",
          tmpFileName: fileInfo ? fileInfo.fileName : "测试.doc",
          multiTenancyId: "000076767qwq0",
          showBtns: true,
          tanSun: "scjsx",
          saveCleanFile: false
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 删除意见域
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
          this.getDetailIntroduction();
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
    //十位机构号获取
    ordIdten() {
      let tenId = JSON.parse(localStorage.getItem("userInfo"));
      console.log(tenId, "10101010101001010");
      this.$api.sealManage
        .OrgtenId({
          unitCode: tenId.unitId
        })
        .then(res => {
          console.log(res.data.unitSyncCode, "#####");
          if (res.code == "SUCCESS") {
            this.unitSyncCode = res.data.unitSyncCode;
            // this.yzlist();
          }
        });
    },
    //用印选择弹出框

    yzlist() {
      let numData = this.multiIdType;
      let list = "";
      console.log(numData, "获取1672");
      if (numData === "1") {
        list = "2";
      }
      this.$api.sealManage
        .getsealList({
          useJgId: this.orgOrDeptId,
          YzGet: list,
          yzType: this.yzscUnit
        })
        .then(res => {
          console.log(
            "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
            res
          );
          let Newarr = res.list;
          let Newarr1 = [];
          Newarr.map((item, index) => {
            let obj = {
              sealID: item.id, //印章编码（唯一标识）
              sealRFID: item.rpidFlag, //RFID
              sealType: item.yzType, //印章类别
              sealDeviceName: item.deviceNameBak, //印章设备名称
              sealPots: item.storeMark, //印章在用印机中的位置
              sealOrg: item.userJg,
              sealName: item.yzJiancheng,
              sealPosition: item.isLocate == "1" ? "用印机" : "保险柜", //存放位置isLocate
              machineId: item.deviceNoBak,
              sealNum: 0
            };
            Newarr1.push(obj);
          });
          this.selUseSealTableData = Newarr1;
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
    /**
     * 初始化加载数据
     */
    InitializeData() {
      this.getUseSealTypeFun();
    },
    /**
     * 获取印章类型
     */
    getUseSealTypeFun() {
      console.log(this.$route.query.id, "this.$route.query.id");
      // 获取印章类别
      this.$api.sealManage
        .getUseSealType({
          departId: this.flgsYJ
        })
        .then(res => {
          console.log(res, "-----------------获取印章类别---------------");
          this.configInfo = res.data;
          this.yzscUnit = res.data.scUnit2;
          // this.form.deptTableHeader=res.deptTableHead
          if (!this.$route.query.id) {
            console.log("1212121212121");
            this.$set(
              this.form,
              "deptTableHeader",
              res.deptTableHead + "介绍信用印审批单"
            );
          }
          if (
            this.configInfo.isErweima === "1" &&
            this.configInfo.ewmMarkFlow &&
            this.configInfo.ewmMarkFlow.indexOf("介绍信") != -1
          ) {
            this.flags = true;
          }
          if (this.$route.query.id === undefined) {
            // 获取印章类别
            if (res.data.scUnit2) {
              this.markTypeOptions = res.data.scUnit2.split(",");
            }
            this.form.markType = this.markTypeOptions[0];
            // 获取有效天数;
            this.form.usedDay = res.data.scSlevel;
            // 获取申请时间
            this.form.draftDate = res.newDateYY;
            //获取二维码日期
            this.form.ewmRq = res.newDate;
          }
        })
        .catch(res => {
          console.log(res, "ss获取表头错误回调");
          this.$set(
            this.form,
            "deptTableHeader",
            res.deptTableHead + "介绍信用印审批单"
          );
        });
    },
    /**
     * 获取编号
     */
    getSealNumFun() {
      this.$api.sealManage
        .getSealNum({
          draftDepartmentId: this.flgsDQ,
          markOrderType: "2",
          unitId: this.userInfo.unitId, //JSON.parse(localStorage.getItem('userInfo')).unitId,
          statusType: false
        })
        .then(res => {
          console.log(res, "-------------------获取编号----------------");
          this.$set(this.form, "documentNo", res.data);
        });
      // iseve=》是否跨行0：是 1：否   type =》联系单位类型0：系统内  1：系统外
      this.multiIdType =
        this.$route.query.type === "0"
          ? "0"
          : this.$route.query.iseve === "0"
          ? "1"
          : "2";
      console.log(this.multiIdType, "获取1672");
      // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.form.draftUser = this.userInfo.humanName;
      this.form.draftUserId = this.userInfo.humanId;
    },
    /**
     * 申请单位下拉框 change 事件
     */
    departFirstDepartmentChange(val) {
      console.log(val, "获取部门id");
      let _this = this;
      _this.getOrgInfo();
      _this.getUseSealTypeFun();
    },
    /**
     * 根据id 获取介绍信详情信息
     */
    getDetailIntroduction() {
      this.$api.sealManage
        .detailIntroduction({ id: this.$route.query.id,draftOrganId:this.$route.query.draftOrganId,numYear:this.numYears })
        .then(res => {
          console.log(res, "介绍信详情信息");
          this.form = res.data;
          // this.selsecOrgOrDeptId = res.data.draftOrganId;
          setTimeout(() => {
            if (this.form.sendType == "1") {
              this.ne = true;
            } else {
              this.ne = false;
            }
          });
          this.num = this.form.deptTableHeader;
          if (this.form.demoNoteId) {
            this.scjsxJg = "true"; //true
            this.wScjsx = "false";
          } else {
            this.scjsxJg = "false";
            this.wScjsx = "true"; //true
          }

          let As = res.data.documentNo.split("〕")[1];
          console.log("true", As);

          if (As === "号") {
            this.documentNoNum1 = "1";
          } else {
            this.documentNoNum1 = "2";
          }
          this.num1Str = res.data.num1Str; //查看详情新增id
          this.sendId = res.data.id;

          console.log(this.num1Str, "this.num1Str");
          console.log(this.form, "this.for");
          //拟稿人部门
          this.form.departFirstDepartment = res.data.departFirstDepartment;
          this.form.departFirstDepartmentId = res.data.departFirstDepartmentId;
          //当前处理人部门
          this.form.departName = res.data.departName;
          this.form.departId = res.data.departId;
          //当前申请部门
          this.form.draftDepartment = res.data.draftDepartment;
          this.form.draftDepartmentId = res.data.draftDepartmentId;
          //拟稿人
          this.form.draftUser = res.data.draftUser;
          this.form.draftUserId = res.data.draftUserId;
          // 表头数据
          // this.form.deptTableHeader=res.data.deptTableHeader
          this.$set(this.form, "deptTableHeader", res.data.deptTableHeader);

          if (res.data.yyType) {
            this.randomStr1 = res.data.markMainForm;
            this.tableSealStateData = JSON.parse(res.data.yyType);
          }
          if (res.data.rtfAssetList1) {
            this.rtfAssetList1 = JSON.parse(res.data.rtfAssetList1);
            this.getSealNamecount(JSON.parse(res.data.rtfAssetList1));
          }
          
          if (this.form.ldBjs) {
            this.form.ldBjs.map(item => {
              console.log(item.nr, "item.nr  ");
              item.nr = item.nr.split("=")[1] || item.nr;
              if (item.nr.length > 0) {
                this.$set(this.form, "ldBj", "");
              }
            });
          }
          if (this.form.fzBjs) {
            this.form.fzBjs.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr;
              if (item.nr.length > 0) {
                this.$set(this.form, "fzBj", "");
              }
            });
          }

          if (this.form.ldBj) {
            let ldBjArr = this.form.ldBj.split("=");
            console.log(ldBjArr, "ldBjArr");
            this.ldBj0 = ldBjArr[0]; // 有权签字人审批单选按钮
            this.form.ldBj = ldBjArr[1] || "";
          }
          if (this.form.fzBj) {
            let fzBjArr = this.form.fzBj.split("=");
            this.fzBj0 = fzBjArr[0]; // 部门主要负责人单选按钮
            this.form.fzBj = fzBjArr[1] || "";
          }
    
          this.rtfAssetList = JSON.parse(
            JSON.stringify(JSON.parse(res.data.rtfAssetList))
          );
          console.log(this.rtfAssetList, "人员");

          // if (res.data.remarks.length > 0) {
          //   this.$set(this.form, "remark", "");
          //   // this.form.remark = "";
          // }
          // if (res.data.ldIdeas.length > 0) {
          //   this.$set(this.form, "ldIdea", "");
          // }
          // if (res.data.flIdeas.length > 0) {
          //   this.$set(this.form, "flIdea", "");
          // }
        });
    },
    //用印
    useSealMeachine() {
      if (this.tableSealStateData.length > 0) {
        let isFinishSeal = this.tableSealStateData.every(item => {
          return parseInt(item.successCount) >= parseInt(item.sealBatchSum);
        });
        if (isFinishSeal) {
          this.$message({
            type: "warning",
            message: "已用印完成！"
          });
          return;
        }
        this.sealInfoTabData = [];
        this.sealInfoTabData.push(this.tableSealStateData[0]);
        // this.sealInfoTabData[0].numID = 0;
        this.sealInfoForm.title = this.sealInfoTabData[0].assentName;
        this.$nextTick(() => {
          this.sealInfoDialog = true;
          if (
            parseInt(this.sealInfoTabData[0].successCount) >=
            parseInt(this.sealInfoTabData[0].sealBatchSum)
          ) {
            this.nextBatch();
          }
        });
      } else {
        if (
          this.form.fldYyfs !== "" &&
          this.form.fldYyfs.indexOf("机器盖章") != -1
        ) {
          this.isShowSealState = true;
          console.log("sealDetailArr", this.sealDetailArr);
          console.log("fldYyfsMechine", this.fldYyfsMechine);
          this.sealInfoArr = [];
          this.sealInfoTabData = [];
          this.sealDetailArr.map(item => {
            let sealArr = item.split(" ");
            if (this.fldYyfsMechine.indexOf(sealArr[0]) != -1) {
              console.log("this.form.rtfAssetList1", this.form.rtfAssetList1);
              let sealInfo = this.rtfAssetList1.find(
                ssItem => ssItem.sealName === sealArr[0]
              );
              console.log("sealInfo", sealInfo);
              let everyBatchObj = {
                assentName: this.form.title,
                sealName: sealArr[0],
                sealBatchSum: parseInt(sealArr[1]),
                successCount: 0,
                sealMeachine: sealInfo.sealDeviceName //用印机名称
              };
              Object.assign(everyBatchObj, sealInfo);
              everyBatchObj.sealPosition = sealInfo.sealPots; //印章在用印机中位置
              this.sealInfoArr.push(everyBatchObj);
            }
          });
          console.log("this.sealInfoArr0000", this.sealInfoArr);
          this.randomStr1 = this.getRandomStr();
          this.sealInfoArr.map((item, index) => {
            this.$set(item, "successCount", 0); //正常
            this.$set(item, "cancelCount", 0); //作废
            this.$set(item, "errorCount", 0); //异常
            this.$set(item, "markfilename", []);
            this.$set(item, "numIndex", index);
            this.$set(item, "id", this.randomStr1 + "_" + item.numIndex);
          });
          console.log("this.sealInfoArr1111", this.sealInfoArr);
          this.sealInfoTabData.push(this.sealInfoArr[0]);
          // this.sealInfoTabData[0].numID = 0;
          this.sealInfoForm.title = this.sealInfoTabData[0].assentName;
          this.$nextTick(() => {
            this.sealInfoDialog = true;
          });
        }
      }
    },
    // 下一批
    nextBatch() {
      let data = JSON.parse(
        JSON.stringify(
          this.tableSealStateData.length > 0
            ? this.tableSealStateData
            : this.sealInfoArr
        )
      );
      console.log("data", data);
      let num = parseInt(this.sealInfoTabData[0].numIndex);
      num = num === data.length - 1 ? 0 : num + 1;
      this.sealInfoTabData.splice(0, 1, data[num]);
      // this.sealInfoTabData[0].numID = num;
      console.log("this.sealInfoTabData", this.sealInfoTabData);
      if (
        parseInt(this.sealInfoTabData[0].successCount) >=
        parseInt(this.sealInfoTabData[0].sealBatchSum)
      ) {
        this.nextBatch();
      }
      this.sealInfoForm.title = this.sealInfoTabData[0].assentName;
    },
    // 确定用印
    sureUseSeal() {
      // { label: '印章简称', prop: 'sealName' },
      // { label: '用印数', prop: 'sealBatchSum' },
      // { label: '已用印数', prop: 'successCount' },
      // { label: '印章类别', prop: 'sealType' },
      // { label: '所属印章机', prop: 'sealMeachine' },
      // { label: '用印机中的位置', prop: 'sealPosition' }

      if (this.tableSealStateData.length === 0) {
        // this.tableSealStateData.map((item, index) => {
        //   this.$set(item, 'cancelCount', 0)//作废
        //   this.$set(item, 'errorCount', 0)//异常
        //   this.$set(item, 'markfilename', [])
        //   this.$set(item, 'numIndex', index)
        // })
        this.$api.sealManage
          .updateIntroduction({
            markMainForm: this.randomStr1,
            yyType: this.sealInfoArr,
            id: this.$route.query.id
          })
          .then(res => {
            this.tableSealStateData = JSON.parse(
              JSON.stringify(this.sealInfoArr)
            );
            console.log("this.tableSealStateData", this.tableSealStateData);
            this.form.yyType = JSON.parse(
              JSON.stringify(this.tableSealStateData)
            );
            console.log("res", res);
            this.sealInfoDialog = false;
            this.beginSeal(this.sealInfoTabData[0]);
          });
      } else {
        this.sealInfoDialog = false;
        this.beginSeal(this.sealInfoTabData[0]);
      }
    },
    /**
     * 校验身份证
     */
    identifyIdBlur(row) {
      let reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!reg.test(row.identifyId)) {
        this.$set(row, "isNone", true);
        row.identifyId = "";
      } else {
        this.$set(row, "isNone", false);
      }
    },
    //常用批语
    // showWriteList (type) {
    //   this.clickTypes = type;
    //   this.appendWriteDialog = true;
    // },
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
    //常用批语
    writelistvalue(data) {
      console.log(data, "dd ");
      switch (this.clickTypes) {
        case "ldBj":
          this.$set(
            this.form,
            "ldBj",
            this.form.ldBj ? this.form.ldBj + data : data
          );
          break;
        case "fzBj":
          this.$set(
            this.form,
            "fzBj",
            this.form.fzBj ? this.form.fzBj + data : data
          );
          //this.$set(this.form, 'fzBj',  this.form.fzBj0 == 0 ? "同意" : "不同意" + data)
          break;
        case "flIdea":
          this.$set(
            this.form,
            "flIdea",
            this.form.flIdea ? this.form.flIdea + data : data
          );
          break;
        case "ldIdea":
          this.$set(
            this.form,
            "ldIdea",
            this.form.ldIdea ? this.form.ldIdea + data : data
          );
          break;
      }
    },

    setRuleConfig() {
      this.regSealFormRule = {
        draftUser: [
          {
            required: this.requiredFields.draftUser,
            message: "经办人不能为空",
            trigger: "blur"
          }
        ],
        useTime: [
          {
            required: this.requiredFields.useTime,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        usedDay: [
          {
            required: this.requiredFields.usedDay,
            message: "有效天数不能为空",
            trigger: "blur"
          }
        ],
        markType: [
          {
            required: this.requiredFields.markType,
            message: "印章类别不能为空",
            trigger: "change"
          }
        ],
        tel: [
          {
            required: this.requiredFields.tel,
            message: "经办人电话不能为空",
            trigger: "blur"
          }
          // { required: this.requiredFields.tel, pattern: (/^[1][3,4,5,6,7,8,9][0-9]{9}$/ || /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/), message: '请输入正确的电话号码！', trigger: 'blur' }
          // { required: this.requiredFields.tel, validator: this.telBlur, trigger: 'blur' }
        ],
        title: [
          {
            required: this.requiredFields.title,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        reason: [
          {
            required: this.requiredFields.reason,
            message: "用印事由不能为空",
            trigger: "blur"
          }
        ],
        sendType: [
          {
            required: this.requiredFields.sendType,
            message: "发往单位类型不能为空",
            trigger: "change"
          }
        ],
        sendDept: [
          {
            required: this.requiredFields.sendDept,
            message: "联系单位不能为空",
            trigger: "change"
          }
        ],
        rtfAssetListShow: [
          {
            required: this.requiredFields.rtfAssetListShow,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        fldYyfs: [
          {
            required: this.requiredFields.fldYyfs,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        ldBj: [
          {
            required: this.requiredIdeaFields.ldBj,
            message: "有权签字人审批不能为空",
            trigger: "change"
          }
        ],
        flIdea: [
          {
            required: this.requiredIdeaFields.flIdea,
            message: "印章保管人意见不能为空",
            trigger: "change"
          }
        ],
        ldIdea: [
          {
            required: this.requiredIdeaFields.ldIdea,
            message: "承办部门处理意见不能为空",
            trigger: "blur"
          }
        ],
        fzBj: [
          {
            required: this.requiredIdeaFields.fzBj,
            message: "部门主要负责人审批不能为空",
            trigger: "change"
          }
        ]
        // remark: [{ required: this.requiredIdeaFields.remark, message: '不能为空', trigger: 'blur' }],
      };
    },
    //完成并发送选人弹出框确认
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
          markOrderType: "2",
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
          if (res.code == "SUCCESS") {
            this.$message({
              type: "success",
              message: "已成功发送至下一节点"
            });
          }
          this.dialogState = false;
          // 调用消息提醒接口
          // this.MessageReminder();
          if (this.isLinkChange) {
            this.dialogState = false;
          } else {
            this.$intent.closeWindow(this);
          }
        });
      } else {
        this.dialogState = false;
      }
    },

    // 打印二维码
    printThis() {
      document.execCommand("print");
    },
    //关闭
    close() {
      // if (this.isImpDocDis || (this.form.finishTime && this.form.finishTime !== '')) {
      //   this.$intent.closeWindow(this);
      //   return
      // }
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

          console.log(action)
          if (action == "close") {
          } else {
            this.$intent.closeWindow(this);
          }
        });
      // } else {
      //   this.$intent.closeWindow(this);
      // }
    },
    //保存
    save() {
      let flag = false;

      this.$refs.registerForm.validate((valid, object) => {
        if (valid) {
          if (this.isImpDocDis) {
            this.$message({
              type: "warning",
              message: "该审批单已办结！"
            });
            return;
          }
          if (flag) return;
          this.sendId || this.$route.query.id
            ? this.updateData()
            : this.addData(); // 有id 则更新数据否则新增数据
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
      let ldBj0 = this.ldBj0;
      let fzBj0 = this.fzBj0;
      let formParams = JSON.parse(JSON.stringify(this.form));
      formParams.ldBj && (formParams.ldBj = `${ldBj0}=${formParams.ldBj}`);
      formParams.fzBj && (formParams.fzBj = `${fzBj0}=${formParams.fzBj}`);
      this.$api.sealManage
        .addIntroduction({
          ...formParams,
          rtfAssetList: this.rtfAssetList,
          // draftOrgan: this.$route.query.draftOrgan,
          multiIdType: this.multiIdType,
          currentNode: "起草"
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.sendId = res.Id;
            this.$message({
              type: "success",
              message: res.msg
            });
          }
        });
    },
    updateData1() {
      if (this.rtfAssetList.length <= 0) {
        this.$message({
          type: "warning",
          message: "请输入正确的人员信息"
        });
        let dom = this.$refs.rtfAssetList1;
        console.log(dom);
        dom.$el.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        return;
      }
      for (let i = 0; i < this.rtfAssetList.length; i++) {
        console.log(this.rtfAssetList[i]);
        if (!this.rtfAssetList[i].identifyId) {
          this.$message.error("人员列表" + (i + 1) + "行身份证号不正确");
          let dom = this.$refs.rtfAssetList1;
          console.log(dom);
          dom.$el.scrollIntoView({
            block: "center",
            behavior: "smooth"
          });
          return;
        }
        if (!this.rtfAssetList[i].name) {
          this.$message.error("人员列表" + (i + 1) + "行名称不正确");
          let dom = this.$refs.rtfAssetList1;
          console.log(dom);
          dom.$el.scrollIntoView({
            block: "center",
            behavior: "smooth"
          });
          return;
        }
      }
      console.log(this.form, "1");
      let ldBj0 = this.ldBj0;
      let fzBj0 = this.fzBj0;
      let formParams = JSON.parse(JSON.stringify(this.form));
      formParams.ldBj && (formParams.ldBj = `${ldBj0}=${formParams.ldBj}`);
      formParams.fzBj && (formParams.fzBj = `${fzBj0}=${formParams.fzBj}`);
      if (formParams.rtfAssetList1 && formParams.rtfAssetList1 != "") {
        formParams.rtfAssetList1 = JSON.parse(
          JSON.stringify(formParams.rtfAssetList1)
        );
      }
      console.log(formParams, this.form, "2");
      // formParams.deptTableHeader = this.form.deptTableHeader+"介绍信用印审批单"
      this.$api.sealManage
        .updateIntroduction({
          ...formParams,
          rtfAssetList: this.rtfAssetList,
          // draftOrgan: this.$route.query.draftOrgan,
          id: this.sendId || this.$route.query.id,
          isAdmin: "1"
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.Isweihu = true;
          }
        });
    },
    /**
     * 更新数据
     */
    updateData() {
      if (this.rtfAssetList.length <= 0) {
        this.$message({
          type: "warning",
          message: "请输入正确的人员信息"
        });
        let dom = this.$refs.rtfAssetList1;
        console.log(dom);
        dom.$el.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        return;
      }
      for (let i = 0; i < this.rtfAssetList.length; i++) {
        console.log(this.rtfAssetList[i]);
        if (!this.rtfAssetList[i].identifyId) {
          this.$message.error("人员列表" + (i + 1) + "行身份证号不正确");
          let dom = this.$refs.rtfAssetList1;
          console.log(dom);
          dom.$el.scrollIntoView({
            block: "center",
            behavior: "smooth"
          });
          return;
        }
        if (!this.rtfAssetList[i].name) {
          this.$message.error("人员列表" + (i + 1) + "行名称不正确");
          let dom = this.$refs.rtfAssetList1;
          console.log(dom);
          dom.$el.scrollIntoView({
            block: "center",
            behavior: "smooth"
          });
          return;
        }
      }
      console.log(this.form, "1");
      let ldBj0 = this.ldBj0;
      let fzBj0 = this.fzBj0;
      let formParams = JSON.parse(JSON.stringify(this.form));
      formParams.ldBj && (formParams.ldBj = `${ldBj0}=${formParams.ldBj}`);
      formParams.fzBj && (formParams.fzBj = `${fzBj0}=${formParams.fzBj}`);
      if (formParams.rtfAssetList1 && formParams.rtfAssetList1 != "") {
        formParams.rtfAssetList1 = JSON.parse(
          JSON.stringify(formParams.rtfAssetList1)
        );
      }
      console.log(formParams, this.form, "2");
      // formParams.deptTableHeader = this.form.deptTableHeader+"介绍信用印审批单"
      this.$api.sealManage
        .updateIntroduction({
          ...formParams,
          rtfAssetList: this.rtfAssetList,
          // draftOrgan: this.$route.query.draftOrgan,
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
     * 流程按钮事件
     */
    buttonClick(item) {
      switch (item) {
        case "区块链归档":
          this.$api.sealManage
            .blockChainJsx({
              markOrderType: "2",
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
              markOrderType: "2",
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
          this.updateData1();
          this.toNext();
          break;
        case "查看流程":
          this.viewProcess();
          break;
        case "生成模板":
          this.templateopen = true;
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
            path: "/sealIntroduction",
            query: {
              id: this.sendId || this.$route.query.id,
              registeHeader: this.registeHeader,
              flag:"cld",
              numYear:this.numYears
            }
          });
          break;
        case "维护":
          this.Isweihu = !this.Isweihu;
          break;
      }
    },
    /**
     * 流程调度
     */
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
    },
    toNext() {
      this.$api.sealManage
        .flowControl({
          markOrderType: "2",
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
    // 生成模板确定
    modelbtn() {
      this.$api.sealManage
        .BanMban({
          markOrderType: "2",
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

    /**
     * 查看流程
     */
    viewProcess() {
      console.log(this.num1Str, "this.num1str");
      if (this.form.workflowId === "") {
        this.flowChartList = [
          {
            DSC: this.userInfo.humanName,
            EXCNM: this.userInfo.humanName,
            HUMANCODE: this.userInfo.humanCode,
            NODE: "起草",
            TM: this.form.draftDate
          }
        ];
        this.$refs.dialogLine.openDialog();
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
          this.$refs.dialogLine.openDialog();
        });
    },
    /**
     *  完成并发送
     */
    completeAndSend() {
      let flag = false;
      // if (this.telFlag) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入必填项！'
      //   })
      //   return;
      // }
      this.rtfAssetList.map(rtfAssetListItem => {
        if (
          rtfAssetListItem.name === "" ||
          rtfAssetListItem.identifyId === "" ||
          rtfAssetListItem.isNone
        ) {
          this.$message({
            type: "warning",
            message: "请输入正确的人员信息"
          });
          flag = true;
          //  throw new Error('EndInterate')
        }
      });
      this.$refs["registerForm"].validate((valid, object) => {
        if (valid) {
          if (this.isImpDocDis) {
            this.$message({
              type: "warning",
              message: "该审批单已办结！"
            });
            return;
          }
          if (flag) return;
          this.sendDocument();
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项后保存！"
          });
          //滚动到必填项
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
     * 发送上级行
     */
    sendToParentBank() {
      let flag = false;
      if (this.telFlag) {
        // 校验经办人电话格式
        this.$message({
          type: "warning",
          message: "请输入必填项！"
        });
        return;
      }
      this.rtfAssetList.map(rtfAssetListItem => {
        if (
          rtfAssetListItem.name === "" ||
          rtfAssetListItem.identifyId === "" ||
          rtfAssetListItem.isNone
        ) {
          this.$message({
            type: "warning",
            message: "请输入正确的人员信息"
          });
          flag = true;
          // throw new Error('EndInterate')
        }
      });
      console.log("发送给上级行111");
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          if (flag) return;
          console.log("发送给上级行22");
          this.sendBankDocument();
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项！"
          });
        }
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
    },
    // 新增用印材料信息
    addUseSealInfo() {
      if (this.rtfAssetList.length >= 10) {
        this.$message({
          type: "warning",
          message: "人员列表最多可增加10人！"
        });
        return;
      } else {
        this.rtfAssetList.push({
          name: "",
          identifyId: ""
        });
      }
    },
    // 删除人员列表信息
    delUseSealInfo() {
      let selection = this.$refs.rtfAssetListTable.selection;
      if (selection.length > 0) {
        selection.sort((a, b) => {
          return b["index"] - a["index"];
        });
        selection.map(item => {
          this.rtfAssetList.splice(item.index, 1);
        });
        this.$message({
          type: "success",
          message: "删除成功！"
        });
      } else {
        this.$message({
          type: "info",
          message: "请至少选择一条用印材料信息！"
        });
      }
    },
    /**
     * 选择联系单位
     */
    selLinkOrg() {
      this.selOrgTypeDialog = true;
    },
    /**
     * 选择联系单位的弹框关闭时,清空信息
     */
    selOrgTypeDialogClose() {
      this.selOrgTypeForm.orgType = "";
      this.selOrgTypeDialog = false;
    },
    // 确定选择机构类型
    sureSelOrgType() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let currUnitName = userInfo.currUnitName;
      let currUnitId = userInfo.currUnitId;
      this.orgOrDeptId = userInfo.unitId;
      this.orgOrDept = 0;
      if (this.selOrgTypeForm.orgType === "0") {
        this.queryType = "";
        this.isSearchAll = false;
      }
      if (this.selOrgTypeForm.orgType === "1") {
        this.queryType = "up";
        this.isSearchAll = true;
      }
      if (this.selOrgTypeForm.orgType === "2") {
        this.queryType = "peer";
        this.isSearchAll = false;
      }
      if (this.selOrgTypeForm.orgType === "3") {
        this.queryType = "low";
        this.isSearchAll = false;
      }
      this.selOrgTitle = "请选择联系单位";
      this.selOrgTypeDialog = false;
      this.showOrgTree = true;
    },
    /**
     * 用印选择
     */
    selUseSeal() {
      // this.ordIdten();
      this.yzlist();
      this.selUseSealDialog = true;
    },
    // 用印选择弹框确定
    sureSelUseSeal() {
      // 已选择的用印
      this.$set(this.form, "rtfAssetListShow", "");
      this.sealDetailArr = [];
      let useSealArr = [];
      this.fldYyfsMechine = [];
      this.selUseSealTableData.map(item => {
        if (parseInt(item.sealNum) > 0) {
          useSealArr.push(item);
        }
      });
      this.form.rtfAssetList1 = JSON.parse(JSON.stringify(useSealArr));
      this.getSealNamecount(useSealArr);
      this.selUseSealDialog = false;
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
    /**
     * 发送上级行弹窗
     */
    getOrgList(org) {
      // heigherOrgDialog
      if (org) {
        console.log("org", org);
        console.log("org", this.selOrgTitle);
        if (this.selOrgTitle === "请选择联系单位") {
          this.form.sendDeptName = org.unitName;
          this.form.sendDept = org.id;
          // this.heigherOrgDialog = false;
        } else {
          this.heigherOrgForm.unitName = org.unitName;
          this.heigherOrgForm.unitId = org.id;
        }
        // this.selOrgTitle === "";
      } else {
        this.heigherOrgForm.unitName = "";
        this.heigherOrgForm.unitId = "";
      }

      // if (this.heigherOrgForm.unitName === "") {
      //   this.$message({
      //     type: "info",
      //     message: "请选择上级行部门"
      //   });
      //   return;
      // }
      if (this.selOrgTitle === "请选择上级行部门") {
        let param = {
          markOrderType: "2",
          id: this.sendId || this.$route.query.id,
          unitId: this.heigherOrgForm.unitId
        };
        this.$api.sealManage.sureHander(param).then(res => {
          this.$message({
            type: "success",
            message: "成功发送上级行"
          });
          this.heigherOrgDialog = false;
          this.$intent.closeWindow(this);
        });
      }
    },
    sureSendHeigherOrg() {
      // console.log(this.$refs.heigherOrgTab.$refs.cesTable.selection);
      // let selection = this.$refs.heigherOrgTab.$refs.cesTable.selection;
      // if (this.heigherOrgForm.unitName && selection.length === 1) {
      //   this.$message({
      //     type: "info",
      //     message: "上级行部门、行外单位只可选择一项"
      //   });
      //   return;    && selection.length === 0  || selection[0].id
      // }
      if (this.heigherOrgForm.unitName === "") {
        this.$message({
          type: "info",
          message: "请选择上级行部门"
        });
        return;
      }
      let param = {
        markOrderType: "2",
        id: this.sendId || this.$route.query.id,
        unitId: this.heigherOrgForm.unitId,
        AVYNODENM: this.heigherOrgForm.AVYNODENM,
        PCSAVYID: this.heigherOrgForm.PCSAVYID
      };
      this.$api.sealManage.sureHander(param).then(res => {
        this.$message({
          type: "success",
          message: "成功发送上级行"
        });
        this.heigherOrgDialog = false;
        this.$router.back();
      });
    },
    /**
     * 部门主要负责人审批 change 事件
     */
    changeFzBj0(val) {
      console.log(val);
      if (val === "0") {
        this.$set(this.form, "fzBj", "同意；");
        // this.form.fzBj = "同意；";
      }
      if (val === "1") {
        this.$set(this.form, "fzBj", "不同意；");
        // this.form.fzBj = "不同意；";
      }
    },
    /**
     * 有权签字人审批  change 事件
     */
    changeLdBj0(val) {
      console.log(val);
      if (val === "0") {
        this.$set(this.form, "ldBj", "同意；");
        // this.form.ldBj = "同意；";
      }
      if (val === "1") {
        this.$set(this.form, "ldBj", "不同意；");
        // this.form.ldBj = "不同意；";
      }
    },
    /**
     * 校验经办人电话格式
     */
    telBlur() {
      // this.regSealFormRule.tel = [
      //   { required: true, message: '请输入电话号码!', trigger: 'blur' },
      //   { pattern: (/^[1][3,4,5,6,7,8,9][0-9]{9}$/ || /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/), message: '请输入正确的电话号码！', trigger: 'blur' }
      // ]
      let isPhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      let isTel = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/; // /^0\d{2,3}-?\d{7,8}$/;
      if (this.form.tel !== "") {
        if (!(isPhone.test(this.form.tel) || isTel.test(this.form.tel))) {
          this.telFlag = true;
          this.telErrorMsg = "请输入正确的电话号码！";
        } else {
          this.telFlag = false;
          this.telErrorMsg = "";
        }
      } else {
        this.telFlag = false;
        this.telErrorMsg = "";
      }
    },
    /**---------------------------------------------------------- 公共方法 --------------------------------------------- */
    /**
     * 获取部门一些信息【公共】
     */
    getOrgInfo() {
      this.draftOrganOption.map(item => {
        if (this.form.departFirstDepartment == item.firstUnitName) {
          console.log(item, "需要的目标");
          this.form.currentDepartmentId = item.firstUnitId; // 获取当前处理人一级部门id
          this.form.departFirstDepartmentId = item.firstUnitId;
          this.form.departFirstDepartment = item.firstUnitName; // 获取申请单位名称
          this.form.draftDepartmentId = item.currUnitId; // 获取拟稿部门id
          this.form.draftDepartment = item.currUnitName; // 获取拟稿部门名称
          /**
           * draftUserId、draftUser、currentUserId、currentUser 这些字段目前都取humanId 或者humanName的值
           */
          this.form.draftUserId = item.humanId; // 经办人id
          this.form.draftUser = item.humanName; // 经办人
          this.form.currentUserId = item.humanId; // 获取当前处理人id
          this.form.currentUser = item.humanName; // 当前处理人名称
          this.form.draftOrganId = item.unitId; // 获取拟稿机构id
          this.form.draftOrgan = item.unitName; // 获取拟稿机构名称 currUnitId
          this.flgsDQ = item.unitCodes.split("/")[
            item.unitCodes.split("/").length - 1
          ];
          this.flgsYJ = item.unitCodes.split("/")[0];
          const a = item.unitCodes.split("/")[1];
          this.$set(this.form, "departCurrentId", a);
          this.flgs = item.unitCodes.split("/")[1]; //新增
          if (item.unitCodes.indexOf("/") != -1) {
            console.log("11111", item.unitCodes);
            const a = item.unitCodes.split("/")[1];
            this.$set(this.form, "departCurrentId", a);
            this.flgs = item.unitCodes.split("/")[1]; //新增
          } else {
            console.log("22222", item.unitCodes);
            this.$set(this.form, "departCurrentId", item.unitCodes);
            this.flgs = item.unitCodes; //新增
          }
        }
      });
      // this.getUseSealTypeFun()
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
.br {
  word-wrap: break-word;
  word-break: break-all;
}
.introduction {
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
    display: flex;
    .el-form-item {
      margin-bottom: 0 !important;
    }
    > div {
      display: inline-block;
    }
  }
  /* //----------------------------  收藏表单的样式 start------------------------------ */
  .sealDocument {
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
  /* //----------------------------  收藏表单的样式 end------------------------------ */
  .delBox {
    margin-top: 154px;
    width: 100%;
    background: rgba(224, 224, 224, 0.34);
    height: 32px;
    .buttonItem {
      float: right;
    }
  }

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
  .normalFormDia {
    .normalForm {
      border: none;
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }
}
</style>