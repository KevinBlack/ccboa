<!--
 * @Author: your name
 * @Date: 2020-08-26 17:42:52
 * @LastEditTime: 2021-10-15 20:13:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\cy\cyDetial.vue
--> 
<template>
  <div class="cyDetial">
    <div class="headerClick">
      <div class="right">
        <el-button class="bank_grid_comtent_active" @click="buttonClick('关闭')" plain>关闭</el-button>
        <el-button
          class="bank_grid_comtent_active"
          @click="buttonClick('发传阅')"
          v-if="formData.cyCount=='1'"
          plain
        >发传阅</el-button>
        <el-button
          class="bank_grid_comtent_active"
          @click="buttonClick('传阅收回')"
          plain
          v-if="formData.cyCount=='1'&&formData.wyPle&&formData.wyPle.length>0"
        >传阅收回</el-button>
        <el-button
          class="bank_grid_comtent_active"
          @click="buttonClick('已阅')"
          plain
          v-if="formData.isReadflag=='0'"
        >已阅</el-button>

        <!-- 制办单、承办单 未办结时 （isHaveATie为0未办结），通过 isReadflag 为 0 时显示， 并且 finishTime 不能 有值-->
        <el-button
          class="bank_grid_comtent_active"
          @click="buttonClick('填写传阅意见')"
          plain
          v-if="formData.isReadflag == '0' && !formData.finishTime"
        >填写传阅意见</el-button>
        <el-button class="bank_grid_comtent_active" @click="buttonClick('打印处理单')" plain>打印处理单</el-button>
        <el-button class="bank_grid_comtent_active" @click="buttonClick('收藏')" plain>收藏</el-button>
        <el-button class="bank_grid_comtent_active" @click="buttonClick('操作指南')" plain>操作指南</el-button>
        <!-- <el-button class="bank_grid_comtent_active" @click="buttonClick('维护')" plain>维护</el-button> -->
      </div>
    </div>
    <div class="formHeader">
      <!-- <div
        class="title-text"
        v-if="formData.curbankId=='111111111'"
      >{{formData.curbank}}{{formData.draftDepartment}}{{formData.type}}</div>-->
      <div class="shiwuTitle">{{formData.draftOrgan}}{{formData.draftDepartment}}{{tempType}}</div>
    </div>
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
          v-if="formData.type!='本部会议通知'"
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
      </div>
      <div class="bank_dispach_file">
        <div class="process_content">
          <div class="cur_box">
            <div class="cur_sess">
              <p>
                当前处理人：
                <span>{{currentUser}}</span>
              </p>
            </div>
          </div>
          <h6 class="bank_dispach_file_tit">文件要素</h6>
          <div id="wjys" class="height_90"></div>
          <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训名称" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.title" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议名称" v-else>
                  <el-input v-model="formData.title" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主办部门" prop="maindept1" class="par">
                  <el-input v-model="formData.maindept" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿人">
                  <el-input v-model="formData.draftUser" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <el-input v-model="formData.tel" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿日期">
                  <el-input v-model="formData.draftDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训时间" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyTime" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议时间" v-else>
                  <el-input v-model="formData.hyTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训地点" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyAdress" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议地点" v-else>
                  <el-input v-model="formData.hyAdress" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'&&formData.typeCy!='cb'">
              <el-col :span="24">
                <el-form-item label="主持人">
                  <el-input v-model="formData.host" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'&&formData.typeCy!='cb'||formData.type=='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="联合单位">
                  <el-input v-model="formData.unitdept" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'&&formData.typeCy!='cb'">
              <el-col :span="24">
                <el-form-item label="出席">
                  <el-input v-model="formData.attend" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'&&formData.typeCy!='cb'">
              <el-col :span="24">
                <el-form-item label="列席">
                  <el-input v-model="formData.attendance" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'&&formData.typeCy!='cb'">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="摘要">
                    <el-input v-model="formData.summary" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="会议内容">
                  <div class="box1" v-if="listArr.length>0">
                    <div
                      class="con-box clear-fix"
                      v-for="item in listArr"
                      :key="item.id"
                      style="border:1px solid #ccc;margin-bottom:1px"
                    >
                      <div class="con-left">
                        <div class="clear-fix">
                          <div class="con-left-p1">会议议题</div>
                          <div class="con-left-p2">{{item.topic}}</div>
                        </div>
                        <div class="clear-fix">
                          <div class="con-left-p1">参会部门</div>
                          <div class="con-left-p2">{{item.joinDept}}</div>
                        </div>
                        <div class="clear-fix">
                          <div
                            style="height:60px;line-height:60px"
                            class="con-left-p1 bottom-none"
                          >会议材料</div>
                          <div
                            style="height:60px;line-height:60px;overflow:scroll"
                            class="con-left-p2 bottom-none"
                          >
                            <el-col :span="23">
                              <div
                                class="tree_w tree_w1"
                                v-if="item.attachList&&item.attachList.length"
                              >
                                <el-scrollbar>
                                  <div
                                    v-for="(item1,index1) in  item.attachList"
                                    :key="item1.id"
                                    class="comp_list"
                                  >
                                    <template>
                                      <div class="command_file">
                                        <span class="numName">{{index1+1}}.</span>
                                        <span
                                          class="name down"
                                          @click="viewFile(item1,null,item1.fileName)"
                                        >{{item1.fileName}}</span>
                                        <span class="name">{{item1.createrName}}</span>
                                        <span class="name">{{item1.createTime}}</span>
                                        <div class="btns">
                                          <el-button
                                            type="primary"
                                            size="mini"
                                            @click.native="downFile(item1)"
                                            round
                                          >下载</el-button>
                                        </div>
                                      </div>
                                    </template>
                                  </div>
                                </el-scrollbar>
                              </div>
                            </el-col>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="con-right" v-if="isShow">
                    <el-button @click="hyBtnClick('编辑',item)">编辑</el-button>
                    <el-button @click="hyBtnClick('删除',item)">删除</el-button>
                  </div>
                  <div class="con-right" v-if="!isShow">
                    <el-button @click="hyBtnClick('增发',item)">增发</el-button>
                      </div>-->
                    </div>
                  </div>
                </el-form-item>
              </el-row>
            </el-row>
            <el-row v-if="formData.type=='系统会议通知'||formData.type=='培训会议通知'">
              <el-col :span="24">
                <el-form-item label="委托承办单位">
                  <el-row>
                    <el-col :span="20">
                      <el-input v-model="formData.entrustUnit" :disabled="true"></el-input>
                    </el-col>
                    <!-- <el-col :span="2">
                  <el-button type="primary" style="float:right">选择</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" style="float:right">删除</el-button>
                    </el-col>-->
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <div
              class="editor_box"
              style="position:relative;z-index:1"
              v-if="formData.type!='本部会议通知'"
            >
              <label>内容</label>
              <UE :config="config" id="UE" ref="ue"></UE>
            </div>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-form-item label="签发意见">
              <el-input
                type="textarea"
                :rows="3"
                :span="23"
                v-if="!(formData.sendList && formData.sendList.length!=0)"
                :disabled="true"
                style="margin-bottom:5px;"
              ></el-input>
              <el-col v-show="formData.sendList.length > 0 ? true : false" class="ideaBorder">
                <div v-for="item in formData.sendList" :key="item.id">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col class="content-container">
                        <div>{{item.opinion}}</div>
                        <div class="adviceInfo">
                          <span>{{item.deptName}}</span>
                          <span class="pad_lr10">{{item.userName}}</span>
                          <p class="creat_time">{{item.date}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="审核意见" v-if="formData.typeCy=='zf'">
              <el-input
                type="textarea"
                :rows="3"
                :span="23"
                v-if="!(formData.examineIdeaList && formData.examineIdeaList.length!=0)"
                :disabled="true"
                style="margin-bottom:5px;"
              ></el-input>
              <el-col v-show="formData.examineIdeaList.length > 0 ? true : false" class="ideaBorder">
                <div v-for="item in formData.examineIdeaList" :key="item.id">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col class="content-container">
                        <div>{{item.opinion}}</div>
                        <div class="adviceInfo">
                          <span>{{item.deptName}}</span>
                          <span class="pad_lr10">{{item.userName}}</span>
                          <p class="creat_time">{{item.date}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="办理意见" v-if="formData.typeCy=='cb'||formData.typeCy=='ch'">
              <el-input
                type="textarea"
                :rows="3"
                :span="23"
                v-if="!(formData.pbIdeaList && formData.pbIdeaList.length!=0)"
                :disabled="true"
                style="margin-bottom:5px;"
              ></el-input>
              <el-col v-show="formData.pbIdeaList.length > 0 ? true : false" class="ideaBorder">
                <div v-for="item in formData.pbIdeaList" :key="item.id">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col class="content-container">
                        <div>{{item.opinion}}</div>
                        <div class="adviceInfo">
                          <span>{{item.deptName}}</span>
                          <span class="pad_lr10">{{item.userName}}</span>
                          <p class="creat_time">{{item.date}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="一次传阅意见">
              <el-input
                type="textarea"
                :rows="3"
                :span="23"
                v-if="!(formData.cyList && formData.cyList.length!=0)"
                :disabled="true"
                style="margin-bottom:5px;"
              ></el-input>
              <el-col v-show="formData.cyList.length > 0 ? true : false" class="ideaBorder">
                <div v-for="item in formData.cyList" :key="item.id">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col class="content-container">
                        <div>{{item.opinion}}</div>
                        <div class="adviceInfo">
                          <span>{{item.deptName}}</span>
                          <span class="pad_lr10">{{item.userName}}</span>
                          <p class="creat_time">{{item.date}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="二次传阅意见">
              <el-input
                type="textarea"
                :rows="3"
                :span="23"
                v-if="!(formData.twocyList && formData.twocyList.length!=0)"
                :disabled="true"
                style="margin-bottom:5px;"
              ></el-input>
              <el-col v-show="formData.twocyList.length > 0 ? true : false" class="ideaBorder">
                <div v-for="item in formData.twocyList" :key="item.id">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col class="content-container">
                        <div>{{item.opinion}}</div>
                        <div class="adviceInfo">
                          <span>{{item.deptName}}</span>
                          <span class="pad_lr10">{{item.userName}}</span>
                          <p class="creat_time">{{item.date}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="传阅说明">
              <!-- <el-input v-model="formData.cyExplain" :disabled="formData.cyCount=='2'"></el-input> -->
              <el-col v-if="formData.cyExplainList.length > 0" class="ideaBorder">
                <div v-for="item in formData.cyExplainList" :key="item.id">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col class="content-container">
                        <div>{{item.opinion}}</div>
                        <div class="adviceInfo">
                          <span>{{item.deptName}}</span>
                          <span class="pad_lr10">{{item.userName}}</span>
                          <p class="creat_time">{{item.date}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
              <el-col v-else class="ideaBorder setDisabled"></el-col>
            </el-form-item>
            <el-form-item label="反馈信息">
              <el-radio-group v-model="formData.isFeedback">
                <el-radio v-model="formData.isFeedback" :label="'0'" disabled>是</el-radio>
                <el-radio v-model="formData.isFeedback" :label="'1'" disabled>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="一次传阅人员">
              <el-input :disabled="true" v-model="formData.cyry"></el-input>
            </el-form-item>
            <el-form-item label="二次传阅人员">
              <el-row>
                <el-form-item label="未阅">
                  <el-input
                    type="textarea"
                    :autosize="{minRow:1,maxRow:5}"
                    :disabled="true"
                    :value="formData.wyPle"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="已阅">
                  <el-input
                    type="textarea"
                    :autosize="{minRow:1,maxRow:5}"
                    :disabled="true"
                    :value="formData.yyPle"
                  ></el-input>
                </el-form-item>
              </el-row>
              <!-- <el-input :disabled="true" v-model="formData.twocyry"></el-input> -->
            </el-form-item>

            <h6 class="bank_dispach_file_tit" v-if="formData.type!='本部会议通知'">附件</h6>
            <div id="scfj" class="height_90" v-if="formData.type!='本部会议通知'"></div>
            <el-form-item v-if="formData.type!='本部会议通知'">
              <el-col :span="23">
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
                            @click="viewFile(item,null,item.fileName)"
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
          </el-form>
        </div>
      </div>
    </div>
    <select-person
      :canTab="false"
      :loadingTree="true"
      :hasRadio="hasRadio"
      :offenUse="offenUse"
      :treeData="treeData"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择人员"
      :checkIds="checkIds"
      :orgId="orgId"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    ></select-person>
    <!-- 填写传阅意见 -->
    <el-dialog
      title="填写传阅意见"
      :visible.sync="showIdeaDialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="idea1"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showIdeaDialog = false">取 消</el-button>
        <el-button type="primary" @click="ideaIsOk(idea1)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 传阅收回 -->
    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
    <!-- 传阅 -->
    <treeCofigForCy
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :scircularizeLevel="scircularizeLevel"
      :checkIds="checkIds"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      :fromdata="formData"
      :setTreeWHeight="300"
      @showCompDialog="showCompDialogForCy"
      :orgId="orgIdForCy"
      :treeTradeCode="treeTradeCode"
    >
      <template v-slot:secondCirculation>
        <div class="explainBox">
          <div class="explainTitle">传阅说明</div>
          <div class="explainTextarea">
            <el-input type="textarea" :rows="3" v-model="formData.cyExplain"></el-input>
          </div>
        </div>
      </template>
    </treeCofigForCy>
  </div>
</template>

<script type="text/ecmascript-6">
import selectPerson from "components/tree/tree-fawen";
import cyPersonList from "../../bianhan/components/cyPersonList";
import ideaDialog from "../../bianhan/components/ideaDialog";
import UE from "components/editor/ue.vue";
import exportTable from "../../../minixs/exportTable";
import treeCofigForCy from "@/components/tree/tree-cyTansun";
import beanList from "../../../util/beanList";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";

export default {
  name: "cyDetial",
  components: {
    selectPerson,
    // ideaDialog,
    cyPersonList,
    UE,
    treeCofigForCy,
  },
  mixins: [openOrDownLoadFile,viewDraft],
  props: {},
  data() {
    return {
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      tempType: "",
      treeTradeCode: this.$businessCode.swglgg, //人员树交易线
      scircularizeLevel: "2", //传阅常用联系人修改 12.21
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      cyCheckData: [], //选中数据
      isCY: "",
      seletOptionsDataForCy: [],
      orgIdForCy: "",
      orgId: "",
      // config: {
      //   initialFrameWidth: null,
      //   initialFrameHeight: 350,
      //   toolbars: [[
      //     'fullscreen', 'source', '|', 'undo', 'redo', '|',
      //     'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
      //     'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
      //     'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
      //     'directionalityltr', 'directionalityrtl', 'indent', '|',
      //     'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
      //     'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
      //     'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
      //     'horizontal', 'date', 'time', 'spechars', '|',
      //     'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
      //     'preview', 'searchreplace', 'help', 'drafts'
      //   ]]
      // },
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      // 填写传阅意见
      showIdeaDialog: false,
      idea1: "",
      rules: {},
      unitDeptArr: [],
      signIdeaList: [], //签发意见
      // examineIdeaList: [],//处理意见
      // cyIdeaList: [],//传阅意见
      listArr: [],
      // isShow: true,
      // dialogFormVisible: false,
      // dialogFormVisible1: false,
      // form: {},
      // form1: {},
      // formLabelWidth: '120px',
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth",
      },
      id: this.$route.query.id,
      // showFlowChart: false,
      // flowChartList: [],//流程列表
      select: "",
      radio: "",
      checkList: ["行名", "部门", "姓名", "手机"],
      formData: {},
      currentUser:
        JSON.parse(localStorage.getItem("userInfo")).shortCurrUnitName +
        " " +
        JSON.parse(localStorage.getItem("userInfo")).humanName,
      // currentUser: JSON.parse(localStorage.getItem("userInfo")).humanName,
      // currentUserId: JSON.parse(localStorage.getItem('userInfo')).humanId,
      treeData: [], //人员树
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,
      // }
      // 传阅收回选人
      cyData: [],
      showCyPerson: false,
      cyArr: [],
      cyObj: {},
    };
  },
  computed: {},
  methods: {
    // onScroll () {
    //   const scrolled = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset);
    //   if (scrolled < this.distance_qpyj - 650) {
    //     this.active = "#wjys";
    //   } else if (scrolled > this.distance_qpyj - 650 && scrolled < this.distance_scfj - 400) {
    //     this.active = "#qpyj";
    //   } else if (scrolled > this.distance_scfj - 400) {
    //     this.active = "#scfj";
    //   }
    // },
    toTarget(target) {
      this.active = target;
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.$intent.closeWindow(this);
          break;
        case "发传阅":
          this.getTreeDataForCy("cy");
          break;
        case "已阅":
          this.$api.meeting
            .updataCy({ id: this.id, isReadflag: "1" })
            .then((res) => {
              this.$message({
                message: "已阅成功",
                type: "success",
              });
              this.$intent.closeWindow(this);
            });
          break;
        case "填写传阅意见":
          this.showIdeaDialog = true;
          break;
        case "传阅收回":
          this.$api.meeting.noCyList({ mainId: this.id }).then((res) => {
            // console.log(7878787, res)
            if (res.data.length == 0) {
              this.$message({ type: "success", message: "暂无未阅人员" });
            } else {
              res.data.forEach((item) => {
                item.name = item.curUserCn;
              });
              this.cyData = res.data;
              this.showCyPerson = true;
              console.log("this.cyData", this.cyData);
            }
          });
          // this.cyArr = []
          // this.cyObj = {}
          // if (this.formData.wyPle.length == 0) {
          //   this.$message({ type: "success", message: "暂无未阅人员" })
          // } else {
          //   let nameArr = this.formData.wyPle.split(',')
          //   let idArr = this.formData.cyToEn.split(',')
          //   for (let i = 0; i < nameArr.length; i++) {
          //     this.cyObj = {}
          //     this.cyObj = {
          //       name: nameArr[i],
          //       id: idArr[i]
          //     }
          //     this.cyArr.push(this.cyObj)
          //   }
          //   this.cyData = this.cyArr;
          //   this.showCyPerson = true;
          // }
          break;
        case "操作指南":
          this.handBook("HYGL");
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/meetingCyPrint",
            query: { id: this.id,numYear:this.numyear },
          });
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              this.$api.meeting
                .cyCollect({ id: this.formData.id,numYear:this.numyear })
                .then((res) => {
                  let obj = {};
                  let arr = [];
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName;
                  this.downFile(obj);
                });
            })
            .catch(() => {});
          break;
      }
    },
    // caozuozhinan () {
    //   this.$post
    //     .postData(
    //       "getAttchment",
    //       JSON.stringify({
    //         function: "getAttchment",
    //         moduleCode: "HYGL"
    //       }),
    //       this.$businessCode.fwbz
    //     )
    //     .then(res => {
    //       console.log("res", res)
    //       if (res && res.success) {
    //         this.getInstFileInfo(this, res.data).then(resF => {
    //           if (resF.state) {
    //             let data = this.$router.resolve({
    //               path: "/openAndSave_WordTs",
    //               query: {
    //                 state: "viewFile",
    //                 id: this.formData.id,
    //                 zhengWenState: 0,
    //                 JYcode: 'A08462002',
    //                 multiTenancyId: '000000iiii',
    //                 relativePath: resF ? resF.filePath : "",
    //                 fileName: resF ? resF.fileName : "",
    //                 showBtns: false
    //               }
    //             });
    //             window.open(data.href, "_blank");
    //           }
    //         });
    //       } else {
    //         this.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "文件不存在",
    //           duration: 1500
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "文件不存在",
    //         duration: 1500
    //       });
    //     });
    // },
    // //获取操作指南文件路径
    // async getInstFileInfo (self, flagFile) {
    //   console.log("-----flagFile--->", flagFile)
    //   var successInfo = { state: false };
    //   let bank_doDownloadFile = { function: "doDownloadFile" }
    //   bank_doDownloadFile.fileName = flagFile.fileName;
    //   bank_doDownloadFile.filePath = flagFile.filePath;
    //   await self.$post
    //     .postData(
    //       "doDownloadFile",
    //       JSON.stringify(bank_doDownloadFile),
    //       self.$businessCode.fwbzfj
    //     )
    //     .then(res => {
    //       console.log("-----res", res)
    //       if (res && res.success) {
    //         successInfo.filePath = res.filePath;
    //         successInfo.fileName = res.fileName;
    //         successInfo.state = true;
    //       } else {
    //         self.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "文件获取失败，请重新上传",
    //           duration: 1500
    //         });
    //         successInfo.state = false;
    //       }
    //     })
    //     .catch(erro => {
    //       self.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "文件获取失败，请联系管理员",
    //         duration: 1500
    //       });
    //       successInfo.state = false;
    //     });
    //   return successInfo;
    // },
    //获取传阅人员列表
    getTreeDataForCy(n) {
      // if(this.fromdata.secretType!=''&&this.fromdata.secretType != "请选择"){
      //   this.cyIsSendShow=true
      //   return
      // }
      // debugger
      if (n == "cy") {
        this.isCY = true;
        this.dialogTypeForCy = "dosend";
      }
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      switch (n) {
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      this.showCompDialogForCy();
      this.orgIdForCy = this.formData.departId;
      this.treeDataforCy = { unitCode: this.formData.departId, id: "" };
      this.treeDataforCy[0].disabled = true;

      // this.$post
      //   .postData(
      //     "selectUserByCirculate",//传阅常用联系人修改 12.21
      //     JSON.stringify({
      //       function: "selectUserByCirculate",//传阅常用联系人修改 12.21
      //       level: this.scircularizeLevel,//传阅常用联系人修改 12.21
      //       flag: true
      //     }),
      //     this.$businessCode.swgl
      //   )
      //   .then(res => {
      //     if (res.message == "Loading") {
      //       this.loadingTreeForCy = true;
      //     } else {
      //       this.loadingTreeForCy = false;
      //     }
      //     this.treeData = (res && res.data) || [];
      //     this.treeData[0].disabled = true;
      //   });
    },
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
          let arr = [];
          let temArr = [];
          arr = this.formData.wyIds ? this.formData.wyIds.split(",") : [];
          arr.map((item) => {
            temArr.push(item.split("#")[0]);
          });
          console.log("fancian=========arr", arr);
          this.checkIds = temArr ? temArr : [];
          if (this.cyCheckData.length) {
            newA = [].concat(this.cyCheckData);
            newA.map((item) => {
              //选中的不可操作
              item.disabled = true;
            });
          }
          this.checkData = this.cyCheckData;
          break;
      }
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype) {
      console.log(4666, data);
      // debugger
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = [];
        let oldNames = [];
        let newNames = [];
        let oldIds1 = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        oldIds1 = this.formData.wyIds.split(",");
        oldIds1.map((item) => {
          if (item) {
            oldIds.push(item.split("#")[0]);
          }
        });
        if (data.length) {
          data.map((item) => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
            try {
              if (item.idStr.indexOf("#") != -1) {
                if (!oldIds.includes(item.idStr.split("#")[0])) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              } else {
                if (!oldIds.includes(item.idStr.toString())) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              }
            } catch (e) {
              if (item.id.indexOf("#") != -1) {
                if (!oldIds.includes(item.id.split("#")[0])) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              } else {
                if (!oldIds.includes(item.id)) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              }
            }
          });
          this.formData.humenCode = "";
          newNames = newNames.join(",");
          newIds = newIds.join(",");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        switch (dtype) {
          case "cy":
            this.formData.currentUser = newNames;
            this.formData.currentUserId = newIds;
            this.cyCheckData = this.checkData;
            break;
        }
        if (!!this.formData.currentUser) {
          this.cy();
        }
      }

      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
    //发传阅
    cy() {
      this.formData.currentNode = "传阅";
      this.$api.meeting.sendChuanYue(this.formData).then((res) => {
        this.$message({
          message: "传阅成功",
          type: "success",
        });
        this.loadData();
      });
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      let id1 = [];
      id1 = id.split(",");
      id1.map((item) => {
        ids.push(item.split("#")[0]);
      });
      names = name.split(",");
      ids.map((item, n) => {
        if (!!item) {
          obj.push({
            id: item,
            name: names[n],
          });
        }
      });
      return obj;
    },
    // chuanYue () {
    //   this.$api.meeting.getCyPerson({}).then(res => {
    //     this.treeData = res.result.data;
    //     this.dialogState = true;
    //   })
    // },
    showCompDialog(data, status, type, params, dtype) {
      if (!status) {
        this.dialogState = false;
        return;
      }
      if (data.length == 0) {
        this.$message({
          type: "error",
          message: "请选择人员",
        });
        return;
      }
      console.log("-------->", data, status, type, params, dtype);
      this.dialogState = false;
      switch (dtype) {
        case "cy":
          this.cy(data);
          break;
        default:
          break;
      }
    },
    // //发传阅
    // cy (person) {
    //   let ids = [], names = [], codes = [];
    //   person.forEach(item => {
    //     ids.push(item.idStr)
    //     names.push(item.name)
    //     codes.push(item.code)
    //   })
    //   this.formData.currentUserId = ids.join(',')
    //   this.formData.currentUser = names.join(',')
    //   this.formData.humenCode = codes.join(',')
    //   this.formData.currentNode = "传阅";
    //   this.$api.meeting.sendChuanYue(this.formData).then(res => {
    //     this.$message({
    //       message: '传阅成功',
    //       type: 'success'
    //     });
    //     this.loadData()
    //   })
    // },
    // 传阅收回
    cyPersonList(data) {
      let ids = [];
      data.map((item) => {
        ids.push(item.id);
      });
      this.$api.meeting.cheHuiCy({ ids: ids.join(",") }).then((res) => {
        this.loadData();
        this.$message({
          message: "传阅收回成功",
          type: "success",
        });
      });
    },
    getFileList1(id, index) {
      this.$api.setSysConfig.getTextemList({ id: id ,numYear:this.numyear}).then((res) => {
        this.listArr[index].attchmentFileInfo = res.data;
      });
    },
    // 会议内容列表查询
    hyConList1() {
      let ch = "";
      console.log(9999000, this.formData.typeCy);
      if (
        this.formData.type == "本部会议通知" &&
        this.formData.typeCy == "zf"
      ) {
        ch = "";
      }
      if (
        this.formData.type == "本部会议通知" &&
        this.formData.typeCy == "ch"
      ) {
        ch = this.formData.underTakeDepartment;
      }
      this.$api.meeting
        .hyConList({ id: this.formData.mainDocId, ch: ch })
        .then((res) => {
          this.listArr = res.list;
          this.formData.attchmentFileInfo = [];
          this.listArr &&
            this.listArr.map((item) => {
              this.$api.setSysConfig
                .getTextemList({ id: item.id, fileType: "10001",numYear:this.numyear })
                .then((res) => {
                  this.$set(item, "attachList", res.data);
                  this.formData.attchmentFileInfo.push(...item.attachList);
                });
            });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.idea1 = "";
        })
        .catch((_) => {});
    },
    // 填写传阅意见
    ideaIsOk(idea) {
      this.$api.meeting
        .updataCy({
          id: this.id,
          cyIdea: idea,
          // cyExplain: this.formData.cyCount == "1" ? this.formData.cyExplain : "",
          cyCount: this.formData.cyCount,
          isReadflag: "1",
        })
        .then((res) => {
          this.$message({
            message: "填写意见成功",
            type: "success",
          });

          this.$intent.closeWindow(this);
        });
    },
    // hyConUpdate () {
    //   this.$api.meeting.hyConUpdate(this.form1).then(res => {
    //     this.hyConList1()
    //   })
    //   this.dialogFormVisible1 = false
    // },
    loadData() {
      this.$api.meeting
        .circulationDetail1({
          id: this.id,
          numYear:this.numyear
        })
        .then((res) => {
          this.formData = res.data;
          this.formData.draftDate = res.data.draftDate.split(" ")[0];
          if (this.formData.type == "培训会议通知") {
            this.tempType = "培训通知";
          } else {
            this.tempType = this.formData.type;
          }
          // // this.currentUser = res.data.currentUser
          // this.formdata.commentsList = res.commentsList
          this.formData.cyList = res.cyList; //一次传阅
          // this.formData.processList = res.processList  //过程意见
          this.formData.sendList = res.sendList; //签发意见
          this.formData.examineIdeaList = res.checkList; //审核意见
          this.formData.pbIdeaList = res.pbIdeaList; //办理意见
          this.formData.deptId=res.data.departId;
          this.formData.curUserId=JSON.parse(localStorage.getItem('userInfo')).humanId; 
          this.formData.twocyList = res.twocyList; //二次传阅意见
          this.formData.cyry = res.cyry; //一次传阅人员
             
          this.formData.cyExplainList = res.cyExplainList; // 传阅说明

          // this.orgId = res.data.departId;
          // this.formData.twocyry = res.twocyry//二次传阅人员
          if (res.wyPle && res.wyPle.length > 0) {
            this.formData.wyPle = res.wyPle.substr(0, res.wyPle.length - 1); //二次传阅未阅人员
            this.formData.wyIds = res.wyIds.substr(0, res.wyIds.length - 1); //二次传阅已阅人员
          } else {
            this.formData.wyPle = "";
            this.formData.wyIds = "";
          }
          if (res.yyPle && res.yyPle.length > 0) {
            this.formData.yyPle = res.yyPle.substr(0, res.yyPle.length - 1); //二次传阅已阅人员
          }
          console.log(990, this.formData.wyIds);
          //获取传阅未阅已选人员
          if (this.formData.wyIds) {
            this.cyCheckData = this.concatTreeData(
              this.formData.wyIds,
              this.formData.wyPle
            );
          } else {
            this.cyCheckData = [];
          }
          // console.log(66667676, res.wyPle, res.yyPle)
          console.log(66667676, res.wyPle, res.yyPle);

          // this.formData.zzOpinion = res.zzOpinion
          if (
            this.formData.type == "本部会议通知" &&
            this.formData.typeCy != "cb"
          ) {
            this.hyConList1();
          }
          if (this.formData.type != "本部会议通知") {
            this.getFileList();
            setTimeout(() => {
              this.$refs.ue.setUEContent(this.formData.wordBody);
              this.$refs.ue.setDsabled();
            }, 1000);
          }

          // 判断 是否点击办结按钮 (isHaveATie) 的值是否为 '0'(未办结), 其他情况全部为 '1'（办结）
          this.formData.isHaveATie = res.data.isHaveATie == '0' ? '0' : '1';
        });
    },

    getFileList() {
      this.$api.setSysConfig
        .getTextemList({ id: this.formData.mainDocId,numYear:this.numyear })
        .then((res) => {
          //this.formData.attchmentFileInfo = res.data
          this.$nextTick(() => {
            this.formData.attchmentFileInfo = [];
            this.formData.attchmentFileInfo = res.data;
            this.$set(this.formData, "attchmentFileInfo", res.data);
          });
          this.$forceUpdate();
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
          "A0846C071"
        )
        .then((res) => {
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
                duration: 500,
              });
            }
          }
        });
    },
    change(e) {
      console.log(e);
    },
  },
  activated() {},
  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    // this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
    // this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    // if (this.formData.type != '本部会议通知') {
    //   this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    // }
    // this.$nextTick(() => {
    //   document.querySelector("#bank_dispach_content").addEventListener("scroll", this.onScroll);
    // });
    // window.addEventListener("scroll", this.onScroll, true);
  },
  created() {
    this.loadData();
    // if (this.$route.query.type == '本部会议通知') {
    //   this.hyConList1()
    // }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
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

.cyDetial {
  // background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  .bank_dispach_content {
    width: 100%;
    height: auto;
    padding-bottom: 20px;
  }
  .process_content {
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f60;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;
          span {
            color: #f9aa21;
          }
        }
      }
    }

    .editor_box {
      height: 500px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 120px;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}
.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}
.opinionStyle {
  color: #606266;
  word-break: break-all;
}
.content-container {
  background-color: rgba(228, 231, 237, 0.32);
  border-radius: 4px;
  padding: 4px 6px 0 6px;
  word-break: break-all;
}
.content-container:hover {
  // border: 1px solid #8996af;
}
// .adviceInfo {
//   width: 100%;
//   right: 10%;
//   bottom: 0;
//   text-align: right;
//   color: #606266;
// }

// .pad_lr10 {
//   margin: 0 0 0 16px;
//   padding: 0 0 0 10px;
// }
// .creat_time {
//   position: relative;
//   top: -10px;
// }
.adviceInfo {
  font-size: 14px!important;
  line-height: 20px;
  text-align: right;
}
.ideaBorder{
  border: 1px solid #e4e7ed!important;
  &.setDisabled {
    background: rgba(228, 231, 237, .32) !important;
    height: 80px;
  }
}
.chuanyue1 {
  border-bottom: 1px solid #ccc;
}
.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  height: 50px;
  line-height: 50px;
  float: left;
  border-right: 1px solid #ccc;
  text-align: center;
}
.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.con-left {
  float: left;
  width: 100%;
  border-right: 1px solid #ccc;
.clear-fix{
    border-bottom: 1px solid #ccc;
  }
  .clear-fix:last-of-type{
    border:none;
  }
  .con-left-p1 {
    width: 12%;
    min-height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    border: 0;
  }

  .con-left-p2 {
    width: 88%;
    min-height: 30px;
    line-height: 30px;
    float: left;
    border-left: 1px solid #ccc;
  }
  .bottom-none {
    border-bottom: 0;
  }
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
.tree_w1 {
  // height: 200px;
  padding: 0;
  // overflow: scroll;
  margin: 0;
}

.explainBox {
  padding-right: 20px;
  .explainTitle {
    font-size: 16px;
    color: #303133;
    line-height: 40px;
  }
}

</style>
