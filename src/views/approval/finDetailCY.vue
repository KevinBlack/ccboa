<template>
  <div class="qcDetail" id="shiwuzhifa">
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
            <el-input v-model="YRDeal.orderNo" :disabled="true"></el-input>
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
                    <div v-for="(item,index) in  YRDeal.file" :key="item.id" class="comp_list">
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
        <!--        <el-button type="primary" @click="YRBacksure">确定</el-button>-->
        <el-button @click="YRhandleCloseDeal">取消</el-button>
      </span>
    </el-dialog>
    <!--    选择人员树-->
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :seletOptionsData="[]"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <!--  传阅收回  -->
    <el-dialog
      title="选择传阅收回人员"
      :visible.sync="isdialogCY"
      width="40%"
      height="200px"
      :before-close="handleClose"
    >
      <div style="margin-top:26px">
        <el-checkbox-group v-model="CYBackPer">
          <el-checkbox
            style="margin-right:16px;"
            v-for="item in perCode"
            :key="item.id"
            :label="item.curUserId+'_'+item.curUserCn+','+item.id"
          >{{item.curUserCn}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="CYBacksure">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </el-dialog>
    <div class="headerClick">
      <el-button plain size="mini" class="bank_grid_comtent_active" @click="closeData()">关闭</el-button>
      <el-button
        class="bank_grid_comtent_active"
        v-for="(item,index) in buttonList"
        @click="buttonClick(item.name)"
        :key="index"
        size="mini"
        v-show="buttonList[index].show"
        plain
      >{{item.name}}</el-button>
    </div>
    <div class>
      <div
        class="shiwuTitle"
      >{{formData.unitName||formData.curbank}}{{formData.applyProjectName}}审批传阅处理单</div>
    </div>
    <div class="process_content">
      <div class="bank_dispach_content" id="bank_dispach_content">
        <!-- 侧边栏导航 -->
        <div class="bank_dispach_side_nav">
          <a
            href="javascript:void(0);"
            :class="active == '#wjys' ? 'active' : ''"
            @click="toTarget('#wjys')"
          >文件要素</a>
          <a
            href="javascript:void(0);"
            :class="active == '#qpyj' ? 'active' : ''"
            @click="toTarget('#qpyj')"
          >签批意见</a>
          <a
            href="javascript:void(0);"
            :class="active == '#scfj' ? 'active' : ''"
            @click="toTarget('#scfj')"
          >附件</a>
        </div>
        <div class="cur_box">
          <div class="cur_sess">
            <!--            <p>-->
            <!--              当前环节：-->
            <!--              <span>{{this.formData.currentNode}}</span>-->
            <!--            </p>-->
            <p>
              当前处理人：
              <span>{{this.formData.curUserCn}}</span>
            </p>
            <p>
              是否跨行：
              <span>
                <el-radio-group v-model="formData.isKh" :disabled="true">
                  <el-radio label="0">非跨行</el-radio>
                  <el-radio label="1">跨行</el-radio>
                </el-radio-group>
              </span>
            </p>
            <el-button
              @click="viewApproval"
              type="primary"
              style="float: right;margin-right:40px;margin-top:8px;color:#fff!important"
            >查看审批说明</el-button>
          </div>
        </div>

        <div id="wjys" class="height_90"></div>
        <h6 class="bank_dispach_file_tit">文件要素</h6>
        <el-form :rules="rules" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请项目">
                <el-input v-model="formData.applyProjectName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主管部门">
                <el-input v-model="formData.mainDepart" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="审批编号">
                <el-input v-model="formData.approveNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="isapplyNo">
              <el-form-item label="申请编号">
                <el-input v-model="formData.applyNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期" prop="applyTime">
                <el-input v-model="formData.applyTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="formData.approveTime">
              <el-form-item label="接收日期" prop="approveTime">
                <el-input v-model="formData.approveTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请部门">
                <el-input v-model="formData.draftDepartment" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="formData.contactName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="formData.contactTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input v-model="formData.title" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="引入依据">
              <div v-for="(item,index) in YRcheck" :key="index">
                <span @click="YRJump(item)" style="display:inline-block;width:40%;">{{item.orderNo}}</span>
                <el-button @click="YRJump(item)" size="mini" type="primary">查看详情</el-button>
              </div>
            </el-form-item>
          </el-row>

          <el-form-item label="事由提要">
            <el-input
              type="textarea"
              :autosize="{minRow:6,maxRow:15}"
              v-model="formData.reason"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <h6 class="bank_dispach_file_tit">签批意见</h6>
          <div id="qpyj" class="height_90"></div>

          <!--          审批意见-->
          <el-form-item label="审批意见">
            <div
              v-for="item in formData.checkOpinionList"
              :key="item.id"
		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.checkOpinionList&&this.formData.checkOpinionList.length>0)"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.examineIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <!--申请单位意见-->
          <el-form-item label="申请单位意见">
            <div
              v-for="item in formData.applyOpinionList"
              :key="item.id"
		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.applyOpinionList&&this.formData.applyOpinionList.length>0)"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.exaunitIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!--          <el-form-item label="办理情况">-->
          <!--            <el-input type="textarea" :rows="3" v-model="formData.blIdea" :disabled="true"></el-input>-->
          <!--          </el-form-item>-->
          <!--          办理情况-->
          <el-form-item label="办理情况" prop="blIdea">
            <div v-for="item in formData.blqkOpinionList" :key="item.id" class='opinion-wrapper'>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.blqkOpinionList&&this.formData.blqkOpinionList.length>0)"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.blIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <!--          <el-form-item label="一次传阅意见">-->
          <!--            <el-input type="textarea" :rows="3" v-model="formData.firsrCyidea"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="一次传阅意见">
            <div
              v-for="item in formData.cyFirstOpinionList"
              :key="item.id"
		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.cyFirstOpinionList&&this.formData.cyFirstOpinionList.length>0)"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.firsrCyidea"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="二次传阅意见">
            <div
              v-for="item in formData.cySecondOpinionList"
              :key="item.id"
		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.cySecondOpinionList&&this.formData.cySecondOpinionList.length>0)"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.secondCyidea"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!--          传阅说明-->
          <el-form-item label="传阅说明">
            <div v-for="item in formData.cyExplainList" :key="item.id" class='opinion-wrapper'>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departName }}
                      <span class="pad_lr10">{{item.curUserCn}}</span>
                      {{item.updateTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.cyExplainList&&this.formData.cyExplainList.length>0)"
              :autosize="{minRow:5,maxRow:15}"
              :disabled="true"
              v-model="formData.cyExplain"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <div v-for="item in formData.markList" :key="item.id" class='opinion-wrapper'>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.markList&&this.formData.markList.length>0)"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.mark"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-col :span="24">
            <el-form-item label="一次传阅人员" style="margin-top:20px">
              <el-row>
                <el-form-item>
                  <el-input v-model="formData.firstCyPerson" :disabled="true"></el-input>
                </el-form-item>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="二次传阅人员" style="margin-top:20px">
              <el-row>
                <el-col>
                  <el-form-item label="未阅">
                    <el-input v-model="formData.secondUnreadPersion" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="已阅">
                    <el-input v-model="formData.secondReadPersion" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <h6 class="bank_dispach_file_tit">附件</h6>
          <div id="scfj" class="height_90"></div>
          <el-row>
            <!--          非跨行附件-->
            <div v-if="!!formData.isKh">
              <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                <el-form-item>
                  <el-col :span="20">
                    <div
                      class="tree_w"
                      v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  formData.attchmentFileInfo"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span
                                class="name down"
                                @click="viewFile(item)"
                                :title="item.fileName"
                              >{{item.fileName}}</span>
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
            </div>
            <div v-else>
              <!--          请示单位附件-->
              <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                <el-form-item style="marginLeft:-20px">
                  <el-col>请示单位附件</el-col>
                  <el-col :span="20">
                    <div
                      class="tree_w"
                      v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  formData.attchmentFileInfo"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span
                                class="name down"
                                @click="viewFile(item)"
                                :title="item.fileName"
                              >{{item.fileName}}</span>
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
              <!--          批转单位附件-->
              <el-row v-if="formData.attchmentFileInfoPZ&&formData.attchmentFileInfoPZ.length">
                <el-form-item style="marginLeft:-20px">
                  <el-col>批转单位附件</el-col>
                  <el-col :span="20">
                    <!--                <upload-file-ts :uploadConfig="uploadConfigPZ" @fileList="fileList"></upload-file-ts>-->
                    <div
                      class="tree_w"
                      v-if="formData.attchmentFileInfoPZ&&formData.attchmentFileInfoPZ.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  formData.attchmentFileInfoPZ"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span
                                class="name down"
                                @click="viewFile(item)"
                                :title="item.fileName"
                              >{{item.fileName}}</span>
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
              <!--          审批单位附件-->
              <el-row v-if="formData.attchmentFileInfoSP&&formData.attchmentFileInfoSP.length">
                <el-form-item style="marginLeft:-20px">
                  <el-col>审批单位附件</el-col>
                  <el-col :span="20">
                    <!--                <upload-file-ts :uploadConfig="uploadConfigSP" @fileList="fileList"></upload-file-ts>-->
                    <div
                      class="tree_w"
                      v-if="formData.attchmentFileInfoSP&&formData.attchmentFileInfoSP.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  formData.attchmentFileInfoSP"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span
                                class="name down"
                                @click="viewFile(item)"
                                :title="item.fileName"
                              >{{item.fileName}}</span>
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
            </div>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selectPerson from "components/tree/tree-fawen";
import openOrDownLoadFile from "../../minixs/shiwuLineWord";
import exportTable from "../../minixs/exportTable";
import shiwucommon from "../approval/minixs/shiwucommon";//事物审批公共方法
export default {
  name: "qcDetail",
  components: {
    selectPerson
  },
  mixins: [openOrDownLoadFile,shiwucommon],
  data() {
    return {
      YRcheck: [],
      SP: "SP",
      QS: "QS",
      SP: "SP",
      isdialogYRDeal: false,
      isapplyNo: false,
      firCYidea: true,
      secCYidea: true,
      isShow: false,
      rowData: {},
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },

      perCode: [],
      CYBackPer: [],
      isdialogCY: false,
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: false, // 单选true 多选为false
      dialogTypeNow: "next",
      treeData: [{ name: "中国建设银行", id: "007" }],
      fromType: "",
      checkType: [],
      select: "",
      radio: "",
      rules: {},
      formData: {title:""},
      khType: "",
      buttonList: [
        // {name: '保存',show: true},
        // {name: '传阅',show: true},
        // {name: '传阅收回',show: false},
        // {name: '已阅',show: true},
        { name: "查看申请", show: true },
        { name: "收藏", show: true },
        { name: "操作指南", show: true }
      ],
      id: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      zfId: "",
      YRDeal: {}
    };
  },
  computed: {},
  methods: {
    YRhandleCloseDeal() {
      this.isdialogYRDeal = false;
    },
    handleClose() {
      this.isdialogCY = false;
    },
    buttonClick(params) {
      switch (params) {
        case "保存":
          this.saveData();
          break;
        case "传阅":
          this.finAndSend();
          break;
        case "已阅":
          this.finRead();
          break;
        case "传阅收回":
          this.circulRe();
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(()=>{
             this.$api.checkLz
            .handleCollection({ id: this.id, dataType: 0,docType:1 ,numYear:this.numyear})
            .then(res => {
              this.downFile(res);
            })
          });
          // let that = this
          // let shiwutitle = (this.formData.unitName || this.formData.curbank) + this.formData.applyProjectName + '审批处理单'
          // let draftInfo = this.formData.xksqFilePath?[].concat({fileName:this.formData.xksqFileName,
          //         filePath:this.formData.xksqFilePath},
          //     this.formData.attchmentFileInfo):this.formData.attchmentFileInfo;//收藏时下载正文
          // exportTable.getPdf( shiwutitle,draftInfo,"shiwuzhifa",this.$businessCode.fawglfj,shiwutitle,that)
          break;
        case "查看申请":
          this.viewApply();
          break;
        case "操作指南":
          this.handBook("SWSP");
          break;
      }
    },
    closeData() {
      this.$intent.closeWindow(this);
    },
    //查看申请
    viewApply() {
      if (!this.formData.xksqFileName && !this.formData.xksqFilePath) {
        this.$message({
          type: "warning",
          message: "此文档没有申请文档"
        });
        return;
      }
      let that = this;
      let file = {
        fileName: this.formData.xksqFileName,
        filePath: this.formData.xksqFilePath
      };
      var userinfoUnitId = JSON.parse(localStorage.getItem("userInfo")).unitId
      var unitidFlag
      var saveDataSums
      if(userinfoUnitId != this.formData.ejhAttachid) {
        unitidFlag = true
        if(this.formData.applyNo) {
          saveDataSums= this.formData.applyNo
        } else {
          saveDataSums= this.formData.virtualApplyNo
        }
      } else {
        unitidFlag = false
        if(this.formData.approveNo) {
         saveDataSums= this.formData.approveNo
        }else {
          saveDataSums= this.formData.virtualApproveNo
        }
      }
      this.viewFile(
        file,
        false,
        (saveDataSums) + this.formData.title
      );
    },
    //    查看审批说明
    viewApproval() {
      let that = this;
      if (this.formData.manageSystemName) {
        let file = {
          fileName: this.formData.manageSystemName,
          filePath: this.formData.manageSystemPath
        };
        this.viewFile(file);
      } else {
        this.$message({
          type: "warning",
          message: "暂无审批说明文档"
        });
      }
    },
    saveData() {
      if (this.id) {
        this.$api.checkLz.checkCYAlter(this.formData).then(res => {
          this.queryDeal();
          if (res.code == "SUCCESS") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        });
      } else {
        this.formData.khType = this.khType;
        this.formData.id = this.id;
        this.$api.checkLz.checkCYCreate(this.formData).then(res => {
          this.queryDeal();
          if (res.code == "SUCCESS") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        });
      }
    },
    //已阅
    finRead() {
      this.$api.checkLz
        .checkCYAlter({
          ...this.formData,
          isReadflag: "1"
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.queryDeal();
        });
    },
    //请求详情
    queryDeal() {
      this.$api.checkLz
        .checkCYDeal({
          id: this.id,
          parentId: this.rowData.parentId,
          numYear:this.numyear
        })
        .then(res => {
          this.zfId = res.zfId;
          this.formData = res.data;
          this.formData.applyTime = res.applyTime;
          this.formData.cyFirstOpinionList = res.cyFirstOpinionList;
          this.formData.cySecondOpinionList = res.cySecondOpinionList;
          this.formData.markList = res.markList;
          this.formData.applyOpinionList = res.applyOpinionList;
          this.formData.checkOpinionList = res.checkOpinionList;
          this.formData.blqkOpinionList = res.blqkOpinionList;
          this.YRcheck = res.leadFileList;
          // if (this.formData.isKh == '0') {
          //     this.isapplyNo=false
          //     this.formData.isKh = '否'
          // } else {
          //     this.isapplyNo=true
          //     this.formData.isKh = '是'
          // }
          if (
            this.formData.secondReadPersion ||
            this.formData.secondUnreadPersion
          ) {
            this.buttonList[2].show = true;
          } else {
            this.buttonList[2].show = false;
          }
          if (this.formData.cyCount == "1") {
            this.firCYidea = false;
            this.secCYidea = true;
          } else if (this.formData.cyCount == "2") {
            this.firCYidea = true;
            this.secCYidea = false;
          }
          this.formData.xksqFileName = res.xksqFileName;
          this.formData.xksqFilePath = res.xksqFilePath;

          this.getFileList();
        });
    },
    //传阅请求树
    finAndSend() {
      this.dialogState = true;
      this.$api.checkLz
        .CYqueryPerTree({
          ccbToken: localStorage.getItem("st")
        })
        .then(res => {});
    },
    //选人成功操作
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
        let dataForm = {};
        data &&
          data.map(item => {
            id_name.push(item.id + "_" + item.name);
            chooseDataName.push(item.name);
            chooseDataId.push(item.id);
          });
        dataForm.currentCode = "传阅";
        dataForm.curUserIds = id_name.join(",");
        // dataForm.curUserNames=chooseDataId.join(",")
        this.$api.checkLz
          .checkCYCreate({
            ...this.formData,
            ...dataForm
          })
          .then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.queryDeal();
            }
          });
      }
    },
    //传阅收回选择人员
    circulRe() {
      this.$api.checkLz
        .regainCircul({
          id: this.id,
          dataType: "传阅"
        })
        .then(res => {
          this.isdialogCY = true;
          this.perCode = res.list;
        });
    },
    //传阅收回
    CYBacksure() {
      let idArr = [];
      let nameArr = [];
      let residueName = [];
      let perID = [];
      let perCodeList = JSON.parse(JSON.stringify(this.perCode));
      this.CYBackPer &&
        this.CYBackPer.map(item => {
          idArr.push(item.split(",")[1]);
          nameArr.push(item.split(",")[0]);
        });
      nameArr &&
        nameArr.map(item => {
          perID.push(item.split("_")[0]);
        });
      perID &&
        perID.map(itemID => {
          for (let i = perCodeList.length - 1; i >= 0; i--) {
            if (itemID === perCodeList[i].curUserId) {
              perCodeList.splice(i, 1);
            } else {
              // perCodeList.splice(i, 1)
            }
          }
        });
      perCodeList &&
        perCodeList.map(item => {
          residueName.push(item.curUserId + "_" + item.curUserCn);
        });
      this.$api.checkLz
        .CYretrieve({
          mainId: this.id,
          checkId_names: nameArr.join(","),
          unCheckId_names: residueName.join(","),
          dataType: "传阅",
          ids: idArr.join(",")
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: "收回成功",
              type: "success"
            });
            this.isdialogCY = false;
            this.queryDeal();
          }
        });
    },
    //侧边滚动
    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      if (scrolled < this.distance_wjys) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_wjys - 200 &&
        scrolled < this.distance_qpyj
      ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },
    //附件列表
    getFileList() {
      if (this.formData.isKh == "0") {
        this.$api.setSysConfig
          .getTextemList({
            id: this.zfId,
            numYear:this.numyear
            // fileType:'1001'
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfo", res.data);
              // this.uploadConfig.filesHas = this.formData.attchmentFileInfo
            });
          });
      } else {
        this.$api.setSysConfig
          .getTextemList({
            id: this.zfId,
            fileType: "1001",
            numYear:this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfo", res.data);
              // this.uploadConfig.filesHas = this.formData.attchmentFileInfo
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.zfId,
            fileType: "1002",
            numYear:this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfoPZ", res.data);
              // this.uploadConfig.filesHas = this.formData.attchmentFileInfoPZ
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.zfId,
            fileType: "1003",
            numYear:this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfoSP", res.data);
              // this.uploadConfig.filesHas = this.formData.attchmentFileInfoSP
            });
          });
      }
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
  },
  activated() {},
  mounted() {},
  //多加了一个判断条件，有id也可以this.$route.query.id。author：yangnajuan 2020-121-23 为了解决禅道编号6019的bug
  created() {
    if (this.$route.query.type || this.$route.query.id) {
      this.fromType = this.$route.query.type;
      // this.rowData = JSON.parse(this.$route.query.data)`
      this.id = this.$route.query.id;
      this.queryDeal();
    }
  },
  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(() => {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.qcDetail {
  // background: white;
  margin: 0 auto;

  .qcHeader {
    padding: 8px 50px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }

  .process_content {
    width: 90%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 56px;
      margin-bottom: 20px;
      line-height: 56px;
      border: 1px solid #f60;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;

          span {
            color: #f60;
          }
        }
      }
      el-button span {
        color: #fff !important;
      }
    }

    .bottom-span {
      margin-top: 20px;

      span {
        margin-top: 20px;
        display: block;
        margin-left: 10%;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
    }
  }
}

.bank_dispach_content {
  width: 100%;
  height: auto;

  .bank_dispach_side_nav {
    width: 45px;
    height: auto;
    position: fixed;
    bottom: 8px;
    left: 10%;
    margin-left: -43px;
    text-align: center;

    a {
      width: 45px;
      height: 70px;
      border: 2px solid #3b85ef;
      font-size: 16px;
      margin: 15px 0;
      color: #3b85ef;
      background: #fff;
      border-radius: 10px 0 0 10px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .active {
      background: #3b85ef;
      color: #fff;
    }
  }
}

/*.bank_grid_comtent_active {*/
/*  border: 1px solid #fff;*/
/*  background: #0563c8;*/
/*  color: #fff;*/
/*}*/

.bank_dispach_file_tit {
  width: 100%;
  /*height: 50px;*/
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.height_90 {
  height: 200px;
  margin-top: -180px;
}

.adviceInfo {
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.content-container {
  background-color: rgba(228, 231, 237, 0.32);
  border-radius: 4px;
  padding: 4px 6px 0 6px;
  word-break: break-all;
}
//.content-container:hover {
 // border: 1px solid #8996af;
//}
.opinion-wrapper{
    border:1px solid #e4e7ed;
    border-top: 0;
    border-bottom: 0;
}
.opinion-wrapper:first-child{
  border:1px solid #e4e7ed;
  border-bottom: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.opinion-wrapper:last-child{
    border-bottom-left-radius: 4px;
   border-bottom-right-radius: 4px;
    border:1px solid #e4e7ed;
    border-top: 0;
}
.pad_lr10 {
  margin: 0 16px;
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
    .numName {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 20px;
    }
    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
</style>
<style lang="less" rel="stylesheet/less">
.el-message-box__btns .el-button:last-child{
  transform: translateX(-68px)!important;
}
</style>