<!--
 * @Author: wat
 * @Date: 2020-08-24 16:17:52
 * @LastEditTime: 2021-01-23 10:02:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\sealManage\useSeal\draft\document\doneDocument.vue
-->
<template>
  <div class="doneDocument" id="doneDocument">
    <!-- 公文中收藏的表单布局  勿动start -->
    
    <!-- 公文中收藏的表单布局  勿动end -->

    <div class="headerClick">
      <el-button
        v-for="(item, index) in buttonList"
        @click="buttonClick(item.name)"
        class="bank_grid_comtent_active"
        :key="index"
        v-show="item.show"
        plain
      >{{ item.name }}</el-button>
    </div>
    <div class="shiwuTitle">{{ registeHeader }}</div>
    <el-form
      ref="registerForm"
      class="designForm"
      :model="form"
      label-width="110px"
      :rules="regSealFormRule"
      :disabled="false"
    >
      <div class="box">
        <el-form-item label="当前环节:">
          <span style="color: red;">{{$route.query.id ? form.currentNode : "起草"}}</span>
        </el-form-item>
        <el-form-item label="当前处理人:">
          <span style="color: red;">{{currentUserNames}}</span>
        </el-form-item>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人" prop="draftUser">
            <el-input v-model="form.draftUser" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请单位" prop="departFirstDepartmentId">
            <el-input v-model="form.departFirstDepartment" :disabled="true"></el-input>
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
          <el-form-item label="编号" prop="documentNo">
            <el-input v-model="form.documentNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="用印类型" prop="markType">
            <el-radio-group v-model="form.markType">
              <el-radio v-for="item in markTypeOptions" :key="item" :label="item"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>-->
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="用印公文">
            <el-row></el-row>
            <el-row>
              <el-col style="text-align: right; margin-bottom: 5px">
                <el-button type="primary" :disabled="true">引入</el-button>
                <el-button type="danger" :disabled="true">删除</el-button>
              </el-col>
            </el-row>
            <el-table
              ref="sealDocument"
              border
              size="medium"
              :data="tableData"
              :style="{ width: '99.6%' }"
              :header-row-style="{ textAlign: 'center' }"
            >
              <el-table-column type="selection" width="50px" label="选择" align="center"></el-table-column>
              <el-table-column type="index" width="60px" label="序号" align="center"></el-table-column>
              <el-table-column label="公文名称" prop="title" align="center"></el-table-column>
              <el-table-column label="公文编号" prop="documentNo" align="center"></el-table-column>
              <el-table-column align="center">
                <template slot="header">
                  <p>印章名称及每份个数</p>
                  <el-button
                    v-if="tableData.length !== 0"
                    type="primary"
                    size="mini"
                    :disabled="true"
                  >批量填写</el-button>
                </template>
                <template slot-scope="scope">
                  <span :style="{ cursor: 'pointer' }">
                    {{
                    scope.row.sealDetail
                    }}
                  </span>
                  <el-button
                    v-if="scope.row.sealDetail === ''"
                    type="primary"
                    size="small"
                    :disabled="true"
                  >用印选择</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template slot="header">
                  <p>用印份数</p>
                  <el-button
                    v-if="tableData.length !== 0"
                    type="primary"
                    size="mini"
                    :disabled="true"
                  >批量填写</el-button>
                </template>
                <template slot-scope="scope">
                  <el-input-number
                    size="small"
                    :min="0"
                    v-model="scope.row.useSealCount"
                    :disabled="true"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="用印总数" prop="useSealSum" align="center">
                <span slot-scope="scope">{{ getSealSum(scope.row) }}</span>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="lookFaWenDeatail(scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div
              style="
                border: 1px solid #dcdfe6;
                border-top: 0;
                display: flex;
                width: 99.6%;
                text-align: center;
              "
            >
              <p
                style="
                  width: 51px;
                  border-right: 1px solid #dcdfe6;
                  color: #606266;
                "
              >汇总</p>
              <p :style="{ color: '#606266', padding: '0 10px' }">{{ sumary }}</p>
            </div>
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
          <el-form-item label="用印原因" prop="yyReason">
            <el-input v-model="form.yyReason" :disabled="true"></el-input>
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
        <el-col>
          <el-form-item label="用印时间" prop="useTime">
            <el-input v-model="form.useTime" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用印方式" prop="fldYyfs">
            <el-input v-model="fldYyfs" :disabled="true"></el-input>
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
        <el-col :span="24">
          <el-form-item label="印章保管人意见" prop="yzBgrYj">
            <el-input
              v-if="!editedIdeaFields.yzBgrYj || !(form.yzBgrYjs && form.yzBgrYjs.length != 0)"
              type="textarea"
              v-model="form.yzBgrYj"
              resize="none"
              :disabled="editedIdeaFields.yzBgrYj"
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
                    <span>{{ item.lk }}</span>
                    <br>
                    <span>{{item.ct}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.yzBgrYj">
          <i class="icon-font el-icon-edit select-chang"></i>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-if="!editedIdeaFields.remark || !(form.remarks && form.remarks.length != 0)"
              type="textarea"
              v-model="form.remark"
              resize="none"
              :disabled="editedIdeaFields.remark"
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
                    <span>{{ item.lk }}</span>
                    <br>
                    <span>{{item.ct}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="
          configInfo.isErweima === '1' &&
          configInfo.ewmMarkFlow.includes('公文')
        "
      >
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
              placeholder="指签约对象等文本出具的受众,可缩写、简写。"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事项">
            <el-input
              v-model="form.ewmSx"
              :maxlength="configInfo.ewmSxzs"
              show-word-limit
              placeholder="指该文本是什么，如贷款合同等。"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--
      查看流程弹窗
    -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <!-- 用印查看图片&视频 -->
    <seal-img-detail ref="sealImgDetail"></seal-img-detail>

    <!--引入详情-->
    <el-dialog
      v-dialogDrag
      title="查看依据文件"
      :visible.sync="isdialogYRDeal"
      width="80%"
      height="300px"
      :before-close="YRhandleCloseDeal"
    >
      <div style="margin-top:4px">
        <el-form :model="YRDeal" label-width="160px">
          <el-form-item label="文号" style="width:80%;margin-top:16px;">
            <el-input v-model="YRDeal.documentCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="标题" style="width:80%;margin-top:16px;">
            <el-button type="text" @click="viewFile(YRDeal, '1')">{{YRDeal.title}}</el-button>
          </el-form-item>
          <!--     附件     -->
          <el-row>
            <el-form-item label="附件">
              <el-col :span="24">
                <div class="tree_w" v-if="YRDeal.file&&YRDeal.file.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  YRDeal.file" :key="index" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
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
          </el-row>
        </el-form>
      </div>
      <span slot="footer">
        <!-- <el-button type="primary" @click="YRBacksure">确定</el-button> -->
        <el-button @click="YRhandleCloseDeal">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import yiyi from "@/views/sealManage/mixins/yiyj.js";
import mTable from "components/table/tTable";
import mixins from "@/minixs/index";
import useSealMixins from "../mixins/index";
import exportTable from "@/minixs/exportTable";
import openOrDownLoadFile from "@/minixs/openOrDownLoadFile";
import QRCode from "qrcodejs2";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import sealImgDetail from "views/sealDrafttt/components/sealImgDetail";
import shiwuLineWord from "@/minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "doneDocument",
  components: {
    mTable,
    shiwuFlow,
    sealImgDetail
  },
  mixins: [mixins, useSealMixins, openOrDownLoadFile,shiwuLineWord, yiyi,viewDraft],
  data() {
    return {
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      isdialogYRDeal: false,
      YRDeal: {
        YRCode: "",
        YRTitle: ""
      },
      currentUserNames:"",
      id: "",
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      registeHeader:
        JSON.parse(localStorage.getItem("userInfo")).unitName +
        "公文用印登记单",
      // 生成编号标记
      documentNoNum: 0,
      // 表单是否可编辑（维护）
      inputDisable: true,
      form: {
        // 查看流程所传参数
        workflowId: "",
        draftDate: getToday(),
        draftUser: "",
        draftUserId: "",
        yzBgrYj: "",
        yyReason: "发文归档",
        sendDept: "档案部门",
        title: "",
        remark: "",
        /**
         * 二维码信息采集表
         */
        ewmRq: "", // 日期
        ewmZt: "", // 主体
        ewmSx: "", // 事项
        departFirstDepartmentId: "", // 申请单位【拟稿一级部门id】
        departFirstDepartment: "", // 申请单位名称  【拟稿一级部门】
        draftDepartmentId: "", // 拟稿部门id
        draftDepartment: "", //拟稿部门名称
        currentUserId: "", // 当前处理人id
        currentUser: "", // 当前处理人名称
        draftOrganId: "", // 拟稿机构id
        draftOrgan: "", // 拟稿机构简称
        currentDepartmentId: "", // 当前处理人一级部门id
        departName: "", // 当前处理人部门
        departId: "" // 当前处理人部门id
      },
      // 申请单位 下拉框option
      draftOrganOption: [],
      // 配置信息
      configInfo: {},
      //用印类型
      markTypeOptions: [],
      regSealFormRule: {},
      tableData: [],
      sendId: "",
      /**
       * 引入用印公文查询弹窗
       */
      bankOptions: JSON.parse(localStorage.getItem("unitInfo")) || [],
      // 判断是否办结
      num1Str: "",
      isImpDocDis: true,
      tableCols: [
        { label: "拟稿日期", prop: "createTime" },
        { label: "发文字号", prop: "documentNo" },
        { label: "标题", prop: "title" },
        { label: "拟稿部门", prop: "draftDepartment" },
        { label: "当前处理人", prop: "currentUser" }
      ],
      // 用印方式
      fldYyfsObj: {},
      fldYyfsValue: "",
      selUseSealID: "",
      useSealModeRules: {
        useSealMode: {
          required: true,
          message: "请选择用印方式",
          trigger: "change"
        }
      },
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
        // { label: "异常次数", prop: "errorCount" }
      ],
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
      // 标记流程调度/完成并发送
      isLinkChange: false,
      //不可编辑控制域
      readFields: {
        draftUser: false, //申请人
        departFirstDepartmentId: false, //申请单位
        draftDate: false, //申请时间
        documentNo: false, //编号
        title: false, //标题
        yyReason: false, //用印原因
        sendDept: false, //发往单位
        useTime: false, //用印时间
        fldYyfs: false //用印方式
      },
      //必填控制域
      requiredFields: {
        draftUser: "",
        departFirstDepartmentId: "", // 申请单位id
        markType: "",
        title: "",
        yyReason: "",
        sendDept: "",
        markNum: "",
        useTime: "",
        fldYyfs: ""
      },
      //可编辑意见域
      editedIdeaFields: {
        yzBgrYj: true, //印章保管人意见
        remark: true //备注
      },
      //必填意见域
      requiredIdeaFields: {
        yzBgrYj: false,
        remark: false //备注
      },
      // buttonList数组元素位置不可以变动 finishTime存在就是已办结了 否则就是已办
      buttonList: [
        { name: "关闭", type: "guanbi", show: true },
        // { name: "收回", type: "shouhui", show: false },
        { name: "查看流程", type: "cklc", show: true },
        { name: "打印处理单", type: "dycld", show: true },
        { name: "收藏", type: "shoucang", show: true },
        // { name: "催办", type: "cuiban", show: true }
        // { name: '操作指南', type: 'czzn', show: true }
      ]
    };
  },
  watch: {},
  computed: {
    sumar() {
      let sumaryObj = {};
      this.tableData.map(item => {
        if (item.sealDetail && item.useSealCount) {
          let sealDetailArr = item.sealDetail.split(",");
          sealDetailArr.map(itemSealD => {
            let arr = itemSealD.split(" ");
            if (sumaryObj[arr[0]]) {
              sumaryObj[arr[0]] =
                parseInt(sumaryObj[arr[0]]) +
                parseInt(arr[1]) * item.useSealCount;
            } else {
              sumaryObj[arr[0]] = parseInt(arr[1]) * item.useSealCount;
            }
          });
        }
      });
      let sumar = JSON.stringify(sumaryObj);
      return sumar;
    },
    sumary() {
      let sumar = this.sumar;
      sumar = sumar.substring(1, sumar.length - 1);
      sumar = sumar.replace(/\"/g, "");
      return sumar;
    },
    fldYyfs() {
      if (this.$route.query.id) {
        return this.fldYyfsValue;
      } else {
        // 机器盖章
        let fldYyfsMechine = [];
        // 手工盖章
        let fldYyfsHander = [];
        let sumaryObj = this.sumary ? JSON.parse(this.sumar) : {};
        for (const key in sumaryObj) {
          this.fldYyfsObj[key] === "用印机"
            ? fldYyfsMechine.push(key)
            : fldYyfsHander.push(key);
        }
        let fldYyfs = "";
        if (fldYyfsMechine.length > 0 && fldYyfsHander.length > 0) {
          fldYyfs = `机器盖章：${fldYyfsMechine.join(
            ","
          )};手工盖章：${fldYyfsHander.join(",")}`;
        }
        if (fldYyfsMechine.length > 0 && fldYyfsHander.length === 0) {
          fldYyfs = `机器盖章：${fldYyfsMechine.join(",")}`;
        }
        if (fldYyfsMechine.length === 0 && fldYyfsHander.length > 0) {
          fldYyfs = `手工盖章：${fldYyfsHander.join(",")}`;
        }
        return fldYyfs;
      }
    }
  },
  created() {
    /** 获取当前部门信息 */
    let departmentInfo = JSON.parse(localStorage.getItem("unitInfo"));
    this.draftOrganOption = departmentInfo;
    // 根据id 获取详情信息
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getDetailDocument();
    }
  },
  mounted() {
    this.getUseSealTypeFun();
  },
  methods: {
    // 查看发文详情
    YRhandleCloseDeal() {
      this.isdialogYRDeal = false;
    },
    // 查看发文详情
    lookFaWenDeatail (row) {
      let that = this;
      let obj = {
        function: "importBasis",
        multiTenancyId: "CN000",
        documentCode: row.documentNo,
      };
      this.$post
        .postData("importBasis", JSON.stringify(obj), "A0846C001")
        .then(res => {
          console.log("res", res);
          if (!res.data) {
            this.$message({
              type: "warning",
              message: "没有找到相应文档"
            });
          } else {
            if (res.data.fileName && res.data.filePath) {
              res.data.attachList.push({
                fileName: res.data.fileName,
                filePath: res.data.filePath
              });
            }
            this.YRJump({ ...res.data, dataType: "2" })
          }
        });
    },
    /**
     * 获取用印类型
     */
    getUseSealTypeFun() {
      this.$api.sealManage.getUseSealType({}).then(res => {
        this.configInfo = res.data;
        // 获取申请时间draftDate
        // this.form.draftDate = res.newDateYY;
      });
    },
    /**
     * 根绝id进入公文用印详情页
     */
    getDetailDocument() {
      this.$api.sealManage.detailDocument({ id: this.id ,numYear:this.numYears}).then(res => {
        console.log(res, "-----------获取公文详情页-------------");
        if (res.data && res.data.deptTableHeader) {
          this.registeHeader = res.data.deptTableHeader;
        }
        this.form = JSON.parse(JSON.stringify(res.data));
        if (res.data.authUserId) {
          this.currentUserNames =
            res.data.authUserName + "（由" + res.data.currentUser + "授权）";
          } else {
            this.currentUserNames = res.data.currentUser
          }
        this.num1Str = res.data.num1Str; //查看详情新增id
        if (this.form.finishTime === undefined || this.form.finishTime === "") {
          // 已办数据 有收回按妞
          // this.buttonList[1].show = true;
          if (res.ifShouHui == "1") {
            // this.buttonList[1].show = true;
          }
        }
        if (res.data.yyType) {
          this.randomStr1 = res.data.markMainForm;
          this.tableSealStateData = JSON.parse(res.data.yyType);
        }
        this.tableData = JSON.parse(
          JSON.stringify(JSON.parse(res.data.rtfAssetList))
        );
        this.fldYyfsValue = res.data.fldYyfs;
        // this.form.yzBgrYj = ''
        // this.form.remark = '';
        //拟稿人部门
        this.form.departFirstDepartment = res.data.departFirstDepartment;
        this.form.departFirstDepartmentId = res.data.departFirstDepartmentId;

        console.log(this.draftOrganOption, "wat");
        //当前处理人部门 当前处理人的第一部门
        // this.form.departName = res.data.departName;
        // this.form.departId = res.data.departId;
        // //拟稿人
        // this.form.draftUser = res.data.draftUser;
        // this.form.draftUserId = res.data.draftUserId;
      });
    },
    //关闭
    close() {
      // if (!this.form.currentUserId || (parseInt(this.form.currentUserId) === this.userInfo.humanId)) {
      // this.$confirm("是否关闭当前页面?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning"
      // })
      //   .then(() => {
      this.$intent.closeWindow(this);
      // })
      // .catch(() => {});
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
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_WordTs",
                  query: {
                    state: "viewFile",
                    id: this.sendId || this.$route.query.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: "ghdghghth223",
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
              message: "文件不存在1",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在2",
            duration: 1500
          });
        });
    },
    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = flagFile.fileName;
      self.bank_doDownloadFile.filePath = flagFile.filePath;
      await this.$post
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
     * 按钮操作
     */
    buttonClick(item) {
      switch (item) {
        case "关闭":
          this.close();
          break;
        case "收回":
          this.takeBack();
          break;
        case "查看流程":
          this.viewProcess();
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/sealDocument",
            query: {
              id: this.sendId || this.$route.query.id,
              registeHeader: this.registeHeader,
              numYear:this.numYears
            }
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
                  markOrderType: "1",
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
          // exportTable.getPdf(this.registeHeader, [], "document", "A08462002", "", this)
          // let shiwutitle = this.registeHeader;
          // let that = this;
          // exportTable.getPdf(
          //   shiwutitle,
          //   "fujian",
          //   "printHtml",
          //   this.$businessCode.fawglfj,
          //   shiwutitle,
          //   that
          // );
          break;
        case "操作指南":
          this.operaGuide();
          break;
        case "催办":
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
          markOrderType: this.$route.query.markOrderType //'1'
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              type: "success",
              message: "该审批单已成功收回！"
            });
            // this.$router.push("/sealManage/useSeal");
            this.$intent.closeWindow(this);
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
          subProcessInstId: this.num1Str,
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
    // 用印选择弹窗加载表格数据
    selUseSealLoadData() {},
    /**
     * 用印份数批量操作
     */
    // 用印公文合计
    getSealSum(row) {
      if (row.sealDetail && row.useSealCount) {
        let countArr = row.sealDetail.split(",");
        let count = 0;
        countArr.map(item => {
          count = count + parseInt(item.split(" ")[1]);
        });
        let sum = parseInt(row.useSealCount) * count;
        row.sum = sum;
        this.tableData[0].sumary = this.sumary;
        return sum;
      } else {
        return 0;
      }
    }
  },
  beforeDestroy() {
    // CollectGarbage(); // js内存回收
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
.doneDocument {
  min-height: 100vh;
  background: #fff;
  .ewm {
    width: 150px;
    margin: 0 auto;
  }
  .dialogImport > .el-dialog {
    width: 20% !important;
  }
  .designForm {
    border: 1px solid #ccc;
    width: 80%;
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
  .bigDialog > .el-dialog {
    width: 80% !important;
  }
  .useSealWaytip .el-form-item__label {
    color: #f56c6c !important;
  }
  //----------------------------  收藏表单的样式 start------------------------------
  .tablePrint {
    width: 900px;
    margin: 0 auto;
    background-color: white;
    z-index: -999;
    position: fixed;
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
      display: flex;
      padding-bottom: 20px;
      .d_b100 {
        width: 100%;
      }
      .d_f1 {
        flex: 1;
      }
    }
    .pos_r {
      position: relative;
    }
  }
  .adviceInfo {
  line-height: 20px;
  font-size: 14px;
}
  //----------------------------  收藏表单的样式 end------------------------------
}
</style>
