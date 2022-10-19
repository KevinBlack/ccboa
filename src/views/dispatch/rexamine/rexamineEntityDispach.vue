<template>
  <div id="rexamineEntityDispach" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>

        <div class="grid_comtent">
          <!-- <el-button plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain @click="preserve('save')">保存</el-button>
          <el-button plain @click="completeSending">完成并发送</el-button>
          <el-button plain @click="drafting">处理正文</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <el-button plain @click="processSheet">打印处理单</el-button>
          <el-button plain @click="instructions">操作指南</el-button> -->
          <!-- 控制01 -->
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" v-for="(item,index) in buttonList" @click="buttonClick(item.type)" :key="index"
            v-show="buttonList[index].show" plain>{{item.name}}
          </el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{ draftOrganTitle }}</h3>
    </header>
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
          :class="active == '#fsdx' ? 'active' : ''"
          @click="toTarget('#fsdx')"
        >重发原因</a>
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

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <!-- 当前环节注释 -->
            <div class="bank_dispach_annotation">
              <p class="bank_dispach_annotation_current">
                当前环节：
                <span>{{fromdata.currentNode}}</span>
              </p>
              <p class="bank_dispach_annotation_current">
                当前处理人：
                <span>{{fromdata.currentUser}}</span>
              </p>
              <!-- <el-button size="small" class="bank_article_illustrates" @click="handleExplain">办文说明</el-button> -->
              <!-- <p class="bank_article_illustrates">
                <el-form-item label="是否在线审批" prop="onlineSp" ref="onlineSp">
                  <el-radio
                    v-model="fromdata.onlineSp"
                    :disabled="readFields.onlineSp"
                    @input="inputChange"
                    label="是"
                  >是</el-radio>
                  <el-radio
                    v-model="fromdata.onlineSp"
                    :disabled="readFields.onlineSp"
                    @input="inputChange"
                    label="否"
                  >否</el-radio>
                </el-form-item>
              </p> -->
            </div>
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit mrg-b-20">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" disabled>
                      <template slot="append"><a href="#" @click="handleShowNewTitle">修改标题</a></template>
                    </el-input>
                  </el-form-item>
                  <el-form-item v-if="showNweTitle" label="修改后标题" prop="newTitle">
                    <el-input v-model="fromdata.newTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="附件标题" prop="attachTitle">
                    <el-input v-model="fromdata.attachTitle" disabled>
                      <template slot="append"><a href="#" @click="handleShowNweAttachTitle">修改附件标题</a></template>
                    </el-input>
                  </el-form-item>
                  <el-form-item v-if="showNweAttachTitle" label="修改后标题" prop="newAttachTitle">
                    <el-input v-model="fromdata.newAttachTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发文字号" prop="documentNo" ref="documentNo">
                    <el-input v-model="fromdata.documentNo" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文件形式" prop="fileFlag" ref="fileFlag">
                    <el-input v-model="fromdata.fileFlag" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="原签发人" prop="oldQfr" ref="oldQfr">
                    <el-input v-model="fromdata.oldQfr" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主办部门" prop="hostDepartment" ref="hostDepartment">
                    <el-input v-model="fromdata.hostDepartment" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人" prop="newDraftUser" ref="newDraftUser">
                    <el-input v-model="fromdata.newDraftUser" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话" prop="phone" ref="phone">
                    <el-input v-model="fromdata.phone" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期" prop="completeTime" ref="completeTime">
                    <el-input v-model="fromdata.completeTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请日期" prop="applyDate" ref="applyDate">
                    <el-input v-model="fromdata.applyDate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="重发日期" prop="newSendDate" ref="newSendDate">
                    <el-input v-model="fromdata.newSendDate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                    <el-radio v-model="fromdata.isDirect" label="是">是</el-radio>
                    <el-radio v-model="fromdata.isDirect" label="否">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="直发范围" :span="8" v-if="fromdata.isDirect==='否' ? false :true">
                    <el-select v-model="fromdata.directRange" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="directRangeitem in SdirectRange"
                        :key="directRangeitem.label"
                        :label="directRangeitem.label"
                        :value="directRangeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="直发文种类" :span="8" v-if="fromdata.isDirect==='否' ? false :true">
                    <el-select v-model="fromdata.directType" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="directTypeitem in SdirectType"
                        :key="directTypeitem.label"
                        :label="directTypeitem.label"
                        :value="directTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="会签部门" prop="signDepartment" ref="signDepartment">
                    <el-input v-model="fromdata.signDepartment"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 发送对象 -->
            <h6 class="bank_dispach_file_tit mrg-b-20">重发原因</h6>
            <div id="fsdx" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-row>
                    <el-col :span="15">
                      <el-form-item label="重发会签">
                        <div style="display:flex">
                          <el-input
                            type="textarea" resize="none" autosize
                            @input="inputChange"
                            v-model="fromdata.newSignDepartment"
                            :disabled="readFields.newSignDepartment"
                            placeholder="请选择会签部门"
                            style="flex:1;color: #F00;"
                            class="hqbm"
                          ></el-input>
                          <button
                            @click="bankmain('hui')"
                            v-if="!sendXbSuccess"
                            type="button"
                            class="el-button el-button--default dimi_btn"
                          >
                            <i class="el-icon-plus"></i>
                          </button>
                          <button
                            @click="bankmain('hui', '1')"
                            v-if="sendXbSuccess"
                            type="button"
                            class="el-button el-button--default dimi_btn1"
                          >
                            增发
                          </button>
                          <button
                            @click="takeBackSign('shouhui')"
                            v-if="sendXbSuccess"
                            type="button"
                            class="el-button el-button--default dimi_btn1"
                          >
                            收回
                          </button>
                          <button
                            @click="takeBackSign('cuiban')"
                            v-if="sendXbSuccess"
                            type="button"
                            class="el-button el-button--default dimi_btn1"
                          >
                            催办
                          </button>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="8">
                      <el-input
                        v-model="fromdata.finishSignDepartmentName"
                        disabled
                        placeholder="已完成的会签部门"
                        type="textarea" resize="none" autosize
                        style="width: 100%;"
                        class="hqbm1"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-form-item label="重发原因" prop="newReason" ref="newReason">
                    <el-input v-model="fromdata.newReason" type="textarea" resize="none" autosize rows="3" class="d_f1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="修改内容" prop="newContext" ref="newContext">
                    <el-input v-model="fromdata.newContext" type="textarea" resize="none" autosize rows="3" class="d_f1"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit mrg-b-20">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="签发意见">
                    <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea" resize="none" autosize
                              :value="item.content"
                              disabled
                              rows="3"
                              class="d_f1"
                            ></el-input>
                            <div class="adviceInfo">
                              {{item.departmentName}}
                              <span class="pad_lr10">{{item.userName}}</span>
                              {{item.createTime}}
                            </div>
                          </el-col>
                          <el-col
                            :span="2"
                            v-if="item.createTime ==fromdata.sendOpinionMaxTime&&item.userId==nowUserId"
                          >
                            <button
                              type="button"
                              class="el-button el-button--default dimi_btn"
                              @click="deletService(item.id)"
                            >
                              <i class="el-icon-delete"></i>
                            </button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @blur="inputChange1"
                        v-model="fromdata.opinionSend"
                        v-if="!editedIdeaFields.opinionSend || !(fromdata.opinionSendList && fromdata.opinionSendList.length!==0)"
                        :disabled="editedIdeaFields.opinionSend"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=4,fromdata.opinionSend&&fromdata.opinionSend.length)"
                        v-if="!editedIdeaFields.opinionSend && (!(fromdata.opinionSendList && fromdata.opinionSendList.length!==0))"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="办公室负责人意见">
                    <div v-for="(item) in fromdata.repeatOfficeList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea" resize="none" autosize
                              :value="item.content"
                              :disabled="true"
                              rows="3"
                              class="d_f1"
                            ></el-input>
                            <div class="adviceInfo">
                              {{item.departmentName}}
                              <span class="pad_lr10">{{item.userName}}</span>
                              {{item.createTime}}
                            </div>
                          </el-col>
                          <el-col
                            :span="2"
                            v-if="item.createTime ==fromdata.sendOpinionMaxTime&&item.userId==nowUserId"
                          >
                            <button
                              type="button"
                              class="el-button el-button--default dimi_btn"
                              @click="deletService(item.id)"
                            >
                              <i class="el-icon-delete"></i>
                            </button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @blur="inputChange1"
                        v-model="fromdata.repeatOffice"
                        v-if="!editedIdeaFields.repeatOffice || !(fromdata.repeatOfficeList && fromdata.repeatOfficeList.length!==0)"
                        :disabled="editedIdeaFields.repeatOffice"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=2,fromdata.repeatOffice&&fromdata.repeatOffice.length)"
                        v-if="!editedIdeaFields.repeatOffice || (!(fromdata.repeatOfficeList && fromdata.repeatOfficeList.length!==0))"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                    <!-- <el-input type="textarea" resize="none" autosize v-model="fromdata.repeatOffice" disabled></el-input> -->
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="申请部门意见">
                    <div v-for="(item) in fromdata.repeatApplyDeptList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea" resize="none" autosize
                              :value="item.content"
                              :disabled="true"
                              rows="3"
                              class="d_f1"
                            ></el-input>
                            <div class="adviceInfo">
                              {{item.departmentName}}
                              <span class="pad_lr10">{{item.userName}}</span>
                              {{item.createTime}}
                            </div>
                          </el-col>
                          <el-col
                            :span="2"
                            v-if="item.createTime ==fromdata.sendOpinionMaxTime&&item.userId==nowUserId"
                          >
                            <button
                              type="button"
                              class="el-button el-button--default dimi_btn"
                              @click="deletService(item.id)"
                            >
                              <i class="el-icon-delete"></i>
                            </button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @blur="inputChange1"
                        v-model="fromdata.repeatApplyDept"
                        v-if="!editedIdeaFields.repeatApplyDept || !(fromdata.repeatApplyDeptList && fromdata.repeatApplyDeptList.length!==0)"
                        :disabled="editedIdeaFields.repeatApplyDept"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=1,fromdata.repeatApplyDept&&fromdata.repeatApplyDept.length)"
                        v-if="!editedIdeaFields.repeatApplyDept && (!(fromdata.repeatApplyDeptList && fromdata.repeatApplyDeptList.length!==0))"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                    <!-- <el-input type="textarea" resize="none" autosize v-model="fromdata.repeatApplyDept">
                      <el-button slot="append" icon="el-icon-edit" @click="handleDptmMsg"></el-button>
                    </el-input> -->
                  </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="备注" prop="comments" ref="comments">
                      <template>
                        <div v-for="(item) in fromdata.commentsList" :key="item.id">
                          <div v-if="item.status" class="d_flex">
                            <el-row class="d_b100">
                              <el-col
                                :span="22"
                                :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
                              >
                                <el-input
                                  type="textarea" resize="none" autosize
                                  :value="item.content"
                                  disabled
                                  rows="3"
                                  class="d_f1"
                                ></el-input>
                                <div class="adviceInfo">
                                  {{item.departmentName}}
                                  <span class="pad_lr10">{{item.userName}}</span>
                                  {{item.createTime}}
                                </div>
                              </el-col>
                              <el-col
                                :span="2"
                                v-if="item.createTime ==fromdata.sendOpinionMaxTime&&item.userId==nowUserId"
                              >
                                <button
                                  type="button"
                                  class="el-button el-button--default dimi_btn"
                                  @click="deletService(item.id)"
                                >
                                  <i class="el-icon-delete"></i>
                                </button>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                        <el-input
                          type="textarea" resize="none" autosize
                          v-model="fromdata.comments"
                          @blur="inputChange1"
                          v-if="!editedIdeaFields.comments||fromdata.commentsId||!(fromdata.commentsList && fromdata.commentsList.length!=0)"
                          :disabled="editedIdeaFields.comments"
                        ></el-input>
                      </template>
                    </el-form-item>
                  </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 办文说明 -->
    <el-dialog
      :visible.sync="showExplain"
      v-dialogDrag
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="办文说明"
    >
      <el-form>
        <el-form-item>
          <el-input type="textarea" resize="none" autosize rows="20" v-model="bwsmFromdata.explain"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExplain = false">取 消</el-button>
        <el-button type="primary" @click="preserve">保存</el-button>
      </div>
    </el-dialog>

    <!-- 重新发送弹窗 -->
    <el-dialog
      title="选择重发类型"
      v-dialogDrag
      :visible.sync="dialog_resand"
      width="50%"
    >
      <el-card class="dialog_regain">
        <el-radio-group v-model="checkedcf">
          <el-row>
            <el-col style="margin-bottom: 10px;"><el-radio :label="0">上级行退文</el-radio></el-col>
            <el-col style="margin-bottom: 10px;"><el-radio :label="1">本行收回</el-radio></el-col>
            <el-col style="margin-bottom: 10px;"><el-radio :label="2">增发</el-radio></el-col>
            <el-col style="margin-bottom: 10px;"><el-radio :label="3">其它(注:当前选项中才可以追加以此文件为准的前缀)</el-radio></el-col>
          </el-row>
        </el-radio-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_resand = false">取 消</el-button>
        <el-button type="primary" @click="handleResand()">确 定</el-button>
      </span>
    </el-dialog>

    <treeCofig
      :treeData="treeData"
      :defaultUser="defaultUser"
      :loadingTree="loadingTree"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import scrollIntoForm from '@/util/scrollValid';
import minixs from "@/minixs/index";
import exportTable from "@/minixs/exportTable";

export default {
  name: "RexamineBankEntityDispach",
  mixins: [minixs],
  components: {
    timeDialog,
    treeCofig,
    appendWriteList
  },
  data() {
    return {
      defaultUser:{},//完成并发送默认值
      treeTradeCode:'',//人员树交易线
      //表单控制参数
      huanJieMessage: {},
      scwh: true,
      th: false,
      fhqbm: true,
      ckhqzt: false,
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "完成并发送", type: "btn_wcbfs", show: false },
        { name: "重新发送", type: "btn_cxfs", show: false },
        // { name: "特殊发送", type: "btn_tsfs", show: false },
        // { name: "发会签部门", type: "btn_fhqbm", show: this.fhqbm },
        // { name: "修改正文", type: "btn_clzw", show: false },
        // { name: "清稿", type: "btn_qinggao", show: this.qinggao },
        { name: "查看会签状态", type: "btn_ckzlc", show: this.ckhqzt },
        { name: "删除此重发审批单", type: "btn_scspd", show: false },
        { name: "办结", type: "btn_banjie", show: false },
        { name: "查看流程", type: "btn_cklc", show: false },
        { name: "收藏", type: "btn_sc", show: false },
        { name: "打印处理单", type: "btn_dycld", show: false },
        { name: "操作指南", type: "btn_czzn", show: false }
      ],
      //不可编辑控制域
      readFields: {
        title: false,
        fileFlag: false,
        oldQfr: false,
        hostDepartment: false,
        phone: false,
        isDirect: false,
        newReason: false,
        newContext: false,
      },
      //必填控制域
      requiredFields: {
        title: false,
        fileFlag: false,
        oldQfr: false,
        hostDepartment: false,
        phone: false,
        isDirect: false,
        newReason: false,
        newContext: false,
      },
      //可编辑意见域
      editedIdeaFields: {
        opinionSend: true,
        repeatOffice: true,
        opinionSign: true,
        repeatApplyDept: true,
        comments: true
      },
      //必填意见域
      requiredIdeaFields: {
        opinionSend: false,
        repeatOffice: false,
        opinionSign: false,
        repeatApplyDept: false,
        comments: false
      },

      // 上传
      uploadConfig:{
        id:'',
        url:'uploadFiles',
        code:''
      },
      //删除附件
      bank_deleteFileById:{
        function:'deleteFileById',
        id:''
      },
      loadingTree: false,
      draftOrganTitle: '',
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      // 修改标题
      showNweTitle: false,
      showNweAttachTitle: false,
      //秘密期限类型
      flag: true,
      // 申请部门意见弹框
      showDptmMsg: false,
      // 秘密标志
      secretflag: true,
      secretTypeflag: false,
      //确定完成并发送
      bank_doSend: {
        function: "doSendAgainOrder",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "252329e6-a7aa-45fb-839d-c20c8595e930",
        curTplNo: "testOA7ID",
        curMultiTenancyId: "CN000"
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "001",
        curTplNo: "testOA3ID",
        curMultiTenancyId: "CN000"
      },
      //input框内容
      bank_dispach: {
        function: "toEditAgainOrder",
        id: ""
        // id: "1"
      },
      //下拉框列表
      bank_dispachfile: {
        function: "getSendOrderDicByParam",
        organizationId: ""
        // organizationId: "2ec81dcb-9ed5-443a-a7e7-314ae0537478"
      },
      // bank_redheader: {
      //   function: "getTcDocTypeDicByParam",
      //   organizationId: "root",
      //   sendType: "行发文"
      // },
      //提交
      bank_addToSendOrder: {
        function: "saveAgainOrder",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "" //部门人员名字
      },
      //主送、抄送
      bank_main: {
        function: "getTcPriDeliveryDic",
        organizationId: "root"
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      fromdata: {
        function: "",
        title: "",
        newTitle: "",
        attachTitle: "",
        attachSort:[],
        attchmentFileInfo:[],
        newAttachTitle: "",
        documentNo: "",
        fileFlag: "电子",
        oldQfr: "",
        hostDepartment: "",
        newDraftUser: "",
        phone: "",
        completeTime: "",
        applyDate: "",
        newSendDate: "",
        isDirect: "",
        directRange: "",
        directType: "",
        signDepartment: "",
        newSignDepartment: "",
        newReason: "",
        newContext: "",
        opinionSendId: "",
        repeatOffice: "",
        repeatOfficeList: "",
        opinionSend: "",
        opinionSendList: "",
        repeatApplyDept: "",
        repeatApplyDeptList: "",
        comments: "",
        commentsList: "",
        isSeparate: "",
        isArtificial: "",
        currentNode: '',
        currentUser: ''
      },
      SsendType: [],
      SredHead: [],
      SemergencyLevel: [],
      SbusinessType: [],
      StextType: [],
      SsecretType: [],
      SsecretTimeType: [],
      SsecretFlagType: [],
      SsecretFlagContent: [],
      SdirectRange: [],
      SdirectType: [],
      SsignDepartment: [],
      Smain: [],
      Scopy: [],
      Sinline: [],
      SkeepLimit: [],
      SworkSecretFlag: [],
      imageUrl: "",
      fileList: [],
      tableData: [],

      timeShow: false, //查看流程
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      benCheckData: [], //本行选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      appendWriteDialog: true,
      clickTypes: 1,
      idss: [],
      names: [],
      obj: [],

      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //套红文件
      bank_findTemplete: {
        function: "findTemplete",
        sendType:'',
        redHead:''
      },
      //清稿/恢复操作
      bank_doRecoverFile: {
        function: "doRecoverFile",
        id:''
      },
      // 办文说明
      bwsmFromdata: {
        explain: ""
      },
      sendXbSuccess: false,

      // 重新发送
      showBtn_reSend: false,
      dialog_resand: false,
      checkedcf: 0, // 重发选择

      // nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前用户id
      nowUserId: '', //当前用户id
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "doDeletesendOrderOpinion",
        id: ""
      },
      isDirectFlag: false
    }
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_fsdx = document.querySelector("#fsdx").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    //数据截取
    cuteData(data, name, type) {
      if (this.fromdata[name]) {
        this.fromdata[name].forEach(item => {
          if (!item.status) {
            this.fromdata[data] = item.content;
            this.fromdata[type] = item.id;
          }
        });
      }
    },
    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },
    inputChange1(e) {
      this.preserve(null,true);
      this.$forceUpdate();
    },
    // 申请部门意见
    handleDptmMsg () {
      this.showDptmMsg = true
    },
    // 新标题
    handleShowNewTitle () {
      this.showNweTitle = !this.showNweTitle
    },
    handleShowNweAttachTitle () {
      this.showNweAttachTitle = !this.showNweAttachTitle
    },
    //数据转换
    concatTreeData(id, name) {
      // let ids = [];
      // let names = [];
      // let obj = [];
      this.idss = id.split(",");
      this.names = name.split(",");
      this.idss.map((item, n) => {
        this.obj.push({
          id: item,
          text: this.names[n]
        });
      });
      return this.obj;
    },
    secretTypechange(value) {
      if (value == "商业秘密") {
        this.flag = true;
        this.secretflag = true;
        this.secretTypeflag = false;
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
        this.secretLimitType = "";
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
        this.secretLimitType = "";
      } else {
        this.flag = false;
        this.secretflag = false;
        this.secretTypeflag = false;
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "zhusong":
          // this.checkIds = this.fromdata.mainIds
          //   ? this.fromdata.mainIds.split(",")
          //   : [];
          // this.checkData = this.zhuCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
        case "chao":
          // this.checkIds = this.fromdata.copyIds
          //   ? this.fromdata.copyIds.split(",")
          //   : [];
          // this.checkData = this.chaoCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
        case "hui":
          this.checkIds = this.fromdata.signDepartmentIds
            ? this.fromdata.signDepartmentIds.split(",")
            : [];
          this.checkData = this.huiCheckData;
          break;
        case "ben":
          // this.checkIds = this.fromdata.inlineIds
          //   ? this.fromdata.inlineIds.split(",")
          //   : [];
          // this.checkData = this.benCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params) {
      let judge = true;
      let that = this;
      if (this.dialogType === "dosend") {
        judge = scrollIntoForm.call(this);
        let regT = /^[0-9]*$/;
        let tips = "电话号码输入有误!";
        if (!regT.test(this.fromdata.phone)) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: tips,
            duration: 1000
          });
          return;
        }
      }
      if (!judge) {
        return;
      }
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(",");
          ids = ids.join(",");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (type) {
          case "zhusong":
            this.fromdata.main = this.fromdata.main?this.fromdata.main+','+names:names;
            this.fromdata.mainIds = ids;
            this.zhuCheckData = this.checkData;
            break;
          case "chao":
            this.fromdata.copy = this.fromdata.copy?this.fromdata.copy+','+names:names;
            this.fromdata.copyIds = ids;
            this.chaoCheckData = this.checkData;
            break;
          case "hui":
            this.fromdata.newSignDepartment = names;
            this.fromdata.newHostDepartmentId = ids;
            this.huiCheckData = this.checkData;
            break;
          case "ben":
            this.fromdata.inline = this.fromdata.inline?this.fromdata.inline+','+names:names;
            this.fromdata.inlineIds = ids;
            this.benCheckData = this.checkData;
            break;
          case "dosend":
            this.bank_doSend.nextUserName = names;
            this.bank_doSend.nextUserId = ids;
            this.bank_doSend.nextNodeId = params.id;
            this.bank_doSend.nextNodeName = params.name;
            break;
        }
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend") {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      if (this.dialogState) {
        this.backDialogData(this.dialogType);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      let params = Object.assign(this.fromdata, this.bank_doSend);
      this.$post
        .postData("doSendAgainOrder", JSON.stringify(params), this.$businessCode.fawgl)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 500,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              }
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1000
          });
        });
    },
    //点击 完成并发送 弹窗弹出
    async completeSending() {
      let that = this;
      // if (!that.saveCheck()) {
      //   return;
      // }
      that.preserve().then(resP => {
        if (resP) {
          that.dialogTit = "完成并发送";
          that.offenUse = true;
          that.canTab = false;
          that.treeData = [];
          that.dialogType = "dosend";
          that.singelCheckF = true; // 单选true 多选为false
          that.hasRadio = false;
          that.showCompDialog();
          that.$post
            .postData(
              "getNextNodeInfo",
              JSON.stringify(that.bank_selectConfig),
              that.fawglCode
            )
            .then(res => {
              that.seletOptionsData = res.data || [];

              //带约束条件判断环节
              that.seletOptionsData = that.shoNextNode(
                that.seletOptionsData,
                that.needHGWC1
              );
              let parms = Object.assign(that.fromdata, that.bank_send);
              parms.pcsAvyId = that.bank_send.pcsAvyId = res.data[0].PCSAVYID;
              that.$post
                .postData(
                  "selWfNode",
                  JSON.stringify(parms),
                  that.fawglCode
                )
                .then(res => {
                  if (res.message == "Loading") {
                    that.loadingTree = true;
                  } else {
                    that.loadingTree = false;
                  }
                  that.treeData = res.data&&res.data.data||[];
                  that.defaultUser = res.data&&res.data.defaultUser||{};
                })
                .catch(e => {});
            });
        }
      });
    },
    //主送
    bankmain(n) {
      let name = "";
      switch (n) {
        case "zhusong":
          name = "主送";
          break;
        case "chao":
          name = "抄送";
          break;
        case "hui":
          name = "会签";
          break;
        case "ben":
          name = "本行发送";
          break;
        case "dosend":
          name = "完成并发送";
          break;
      }
      this.dialogTit = name;
      this.canTab = true;
      this.treeData = [];
      this.dialogType = n;
      if (n === "hui") {
        this.hasRadio = true;
        this.canTab = false;
        this.singelCheckF = false;
      }
      this.showCompDialog();
      this.$post
        .postData(
          "getTcPriDeliveryDic",
          JSON.stringify(this.bank_main),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.treeData = (res && res.data) || [];
          if (this.treeData.length) {
            this.treeData.forEach(item => {
              item.content = JSON.parse(item.content);
              if (n === "hui") {
                item.text = item.typeName;
              }
            });
          }
        });
    },
    // 下拉列表
    getSendOrderDicByParam() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.SsendType = JSON.parse(res.data.sendType);
          this.SemergencyLevel = JSON.parse(res.data.emergencyLevel);
          this.SbusinessType = JSON.parse(res.data.businessType);
          this.StextType = JSON.parse(res.data.textType);
          this.SsecretType = JSON.parse(res.data.eleSendSecretType);
          this.SsecretTimeType = JSON.parse(res.data.eleSendSecretLimit);
          this.SsecretFlagType = JSON.parse(res.data.secretFlag);
          this.SdirectRange = JSON.parse(res.data.directSendRange);
          this.SdirectType = JSON.parse(res.data.directSendType);
          this.SkeepLimit = JSON.parse(res.data.eleSendSecretLimit);
          this.SworkSecretFlag = JSON.parse(res.data.workSecretFlag);
          if (res.data.mainIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }
          if (res.data.signDepartmentIds) {
            this.huiCheckData = this.concatTreeData(
              res.data.signDepartmentIds,
              res.data.signDepartment
            );
          }
          if (res.data.copyIds) {
            this.chaoCheckData = this.concatTreeData(
              res.data.copyIds,
              res.data.copy
            );
          }
          if (res.data.inlineIds) {
            this.benCheckData = this.concatTreeData(
              res.data.inlineIds,
              res.data.inline
            );
          }
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      // this.getTcDocTypeDicByParam();
    },

    // 按钮控制
    buttonClick(params) {
      switch (params) {
        case "btn_bc":
          this.preserve("save");
          break;
        case "btn_wcbfs":
          this.completeSending();
          break;
        case "btn_cxfs":
          this.handleShowResend();
          break;
        // case "btn_tsfs":
        //   this.handleSend(2);
        //   break;
        // case "btn_fhqbm":
        //   this.handleSendHQPtmt();
        //   break;
        case "btn_scspd":
          this.handleDeleteDoc();
          break;
        case "btn_banjie":
          this.handleDoFinish();
          break;
        case "btn_cklc":
          this.flowScheme();
          break;
        case "btn_sc":
          this.collect();
          break;
        case "btn_dycld":
          this.processSheet();
          break;
        case "btn_czzn":
          this.instructions();
          break;
        case "btn_ckzlc":
          this.handleCheckFLow();
          break;
      }
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ); //必填控制
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); //不可编辑控制域
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ); //按钮
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.huanJieMessage.editedIdeaFields,
        this.huanJieMessage.editedIdeaFieldsBycondition
      ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //不可编辑意见域
      // if (JSON.parse(localStorage.getItem('userInfo')).humanName === this.formdata.draftUser && this.$route.query.id) {//当前处理人为拟稿人 删除按钮
      //     this.buttonList[this.buttonList.length - 1].show = true
      // }
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          title: [
            {
              required: this.requiredFields.title,
              trigger: ["blur", "change"],
              message: "正文标题不能为空!"
            }
          ],
          fileFlag: [
            {
              required: this.requiredFields.fileFlag,
              trigger: ["blur", "change"],
              message: "文件形式不能为空!"
            }
          ],
          oldQfr: [
            {
              required: this.requiredFields.oldQfr,
              trigger: ["blur", "change"],
              message: "原签发人不能为空!"
            }
          ],
          hostDepartment: [
            {
              required: this.requiredFields.hostDepartment,
              trigger: ["blur", "change"],
              message: "主办部门不能为空!"
            }
          ],
          phone: [
            {
              required: this.requiredFields.phone,
              trigger: ["blur", "change"],
              message: "电话不能为空!"
            }
          ],
          isDirect: [
            {
              required: this.requiredFields.isDirect,
              trigger: ["blur", "change"],
              message: "直发文件不能为空!"
            }
          ],
          newReason: [
            { required: this.requiredFields.newReason, trigger: ["blur", "change"], message: "重发原因不能为空!" }
          ],
          newContext: [
            { required: this.requiredFields.newContext, trigger: ["blur", "change"], message: "修改内容不能为空!" }
          ] 
        }
      });
      this.$forceUpdate();
    },
    //初始值 //input框内容
    toEditAgainOrder(oneTip,loadingFlag) {
      // this.bank_dispach.id = localStorage.getItem('pageid') || '';
      let that = this;

      this.$post.postData("toEditAgainOrder", JSON.stringify(this.bank_dispach), this.$businessCode.fawgl,null,loadingFlag).then(res => {
        console.log('初始值',res);
        if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
          that.draftOrganTitle = res.data && res.data.draftDepartment + "实物重发审批待办处理单";
        } else {
          that.draftOrganTitle = res.data && res.data.draftOrgan + "实物重发审批待办处理单";
        }
        that.fromdata = Object.assign(that.fromdata, res.data); 

        that.nowUserId = res.data.currentUserId || ''

        if(!res.data.onlineSp) {
          that.fromdata.onlineSp = "是"
        } else {
          that.fromdata.onlineSp = res.data.onlineSp
        }

        // 直发范围控制
        if (this.fromdata.isDirect == "否") {
          this.isDirectFlag = false;
        } else if (this.fromdata.isDirect == "是") {
          this.isDirectFlag = true;
        }
        
        if (that.fromdata.currentNodeId === '010') { this.showBtn_reSend = true }
        if (that.fromdata.signState === "0") {
          that.sendXbSuccess = true;
          that.fhqbm = false;
          that.ckhqzt = true;
        } else {
          that.sendXbSuccess = false;
          that.ckhqzt = false;
          that.fhqbm = true;
        }

        that.fromdata.fileFlag = '实物'
        if (that.fromdata.newTitle && that.fromdata.showNweTitle !== '') {
          this.showNweTitle = true
        } else {
          this.showNweTitle = false
        }
        if (that.fromdata.newAttachTitle && that.fromdata.showNweAttachTitle !== '') {
          this.showNweAttachTitle = true
        } else {
          this.showNweAttachTitle = false
        }

        that.fromdata.opinionSendList =
          res.data &&
          res.data.opinionSendList &&
          JSON.parse(res.data.opinionSendList);
        that.fromdata.repeatOfficeList =
          res.data &&
          res.data.repeatOfficeList &&
          JSON.parse(res.data.repeatOfficeList);
        that.fromdata.repeatApplyDeptList =
          res.data &&
          res.data.repeatApplyDeptList &&
          JSON.parse(res.data.repeatApplyDeptList);
        that.fromdata.commentsList =
          res.data &&
          res.data.commentsList &&
          JSON.parse(res.data.commentsList);

        //临时意见处理
        that.cuteData("opinionSend", "opinionSendList", "opinionSendId");
        that.cuteData("repeatOffice", "repeatOfficeList", "repeatOfficeId");
        that.cuteData("repeatApplyDept", "repeatApplyDeptList", "repeatApplyDeptId");
        that.cuteData("comments", "commentsList", "commentsId");

        this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
        this.fromdata.attachSort = [];

        // 控制
        if(res.data.processInstId){
          this.$post
          .postData("getNextUserTaskNode", 
          JSON.stringify({function:"getNextUserTaskNode",processInstId:res.data.processInstId}), 
          this.$businessCode.ggfawgl
          )
          .then(res => {
              this.huanJieMessage = res.data.extAttributes;
              this.setConfig()
              this.setFormConfig()
              setTimeout(() => {
                this.$refs.fromdata.clearValidate();
              })
            }).catch((err)=>{
              console.log(err)
            })
        }else{
          this.$post
          .postData("getpcsTplStartNode", 
          JSON.stringify({function:"getpcsTplStartNode",multiTenancyId:res.data.multiTenancyId}), 
          this.$businessCode.ggfawgl
          )
          .then(res => {
              console.log(res.data)
              this.huanJieMessage = res.data;
              this.setConfig()
              this.setFormConfig()
              setTimeout(() => {
                this.$refs.fromdata.clearValidate();
              })
            }).catch((err)=>{
              console.log(err)
            })
        }

      }).catch(erro=>{
          this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请求失败",
          duration: 1000
        });
      });
    },
    // 保存
    async preserve(type,loadingFlag) {
      this.bank_addToSendOrder.id = this.$route.query.id
        ? this.$route.query.id
        : sessionStorage.getItem("signpageid") || "";
      let params = Object.assign(this.fromdata, this.bank_addToSendOrder, this.bwsmFromdata)
      var successState = false;
      // this.$post.postData("saveAgainOrder", JSON.stringify(this.obj), this.$businessCode.fawgl).then(res => {
      await this.$post.postData("saveAgainOrder", JSON.stringify(params), this.$businessCode.fawglfj,null,loadingFlag).then(res => {
        if (res && res.success) {
          this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id
          this.bank_doSend.id = res.data.id
          localStorage.setItem('pageid',res.data.id)

          if (type&&type!='uploadfile') {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "保存成功",
              duration: 1000
            });
            if (this.showNweTitle) this.showNweTitle = true
            if (this.showNweAttachTitle) this.showNweAttachTitle = true
            if(type==="uploadfile"){
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();  
            }
            this.toEditAgainOrder(null,loadingFlag)
            successState = true;
          }
        }
      })
      .catch(erro => {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "保存失败",
          duration: 1000
        });
        successState = false;
      });
      return successState;
    },
    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) { // 申请部门意见
          this.fromdata.repeatApplyDept = this.fromdata.repeatApplyDept
            ? this.fromdata.repeatApplyDept + data
            : data;
            if(this.fromdata.repeatApplyDept && this.fromdata.repeatApplyDept.length>=500){
              this.fromdata.repeatApplyDept = this.fromdata.repeatApplyDept.substr(0,500)
            }
        } else if (this.clickTypes == 2) { // 办公室负责人意见
          this.fromdata.repeatOffice = this.fromdata.repeatOffice
            ? this.fromdata.repeatOffice + data
            : data;
            if(this.fromdata.repeatOffice && this.fromdata.repeatOffice.length>=500){
              this.fromdata.repeatOffice = this.fromdata.repeatOffice.substr(0,500)
            }
        } else if (this.clickTypes == 3) { // 会签意见
          this.fromdata.opinionSign = this.fromdata.opinionSign
            ? this.fromdata.opinionSign + data
            : data;
            if(this.fromdata.opinionSign && this.fromdata.opinionSign.length>=500){
              this.fromdata.opinionSign = this.fromdata.opinionSign.substr(0,500)
            }
        } else if (this.clickTypes == 4) { // 签发意见
          this.fromdata.opinionSend = this.fromdata.opinionSend
            ? this.fromdata.opinionSend + data
            : data;
            if(this.fromdata.opinionSend && this.fromdata.opinionSend.length>=500){
              this.fromdata.opinionSend = this.fromdata.opinionSend.substr(0,500)
            }
        }
        this.$forceUpdate();
      }
    },

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

      if (scrolled < this.distance_fsdx) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_fsdx &&
        scrolled < this.distance_qpyj - 180
      ) {
        this.active = "#fsdx";
      } else if (
        scrolled >= this.distance_qpyj - 200 &&
        scrolled < this.distance_scfj
      ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },
    // 返回上级页面
    goBack() {
      window.history.go(-1);
    },
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.preserve();
          window.location.href = "about:blank";
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消关闭",
            duation: 1000
          });
        });
    },
    // 收藏
    collect() {
      let that = this;
      let shiwutitle = this.fromdata.documentNo;//字号
      let draftInfo = this.fromdata.filePath?[].concat({fileName:this.fromdata.fileName,filePath:this.fromdata.filePath},this.fromdata.attchmentFileInfo):this.fromdata.attchmentFileInfo;//收藏时下载正文
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "rexamineEntityDispach",
        this.$businessCode.fawglfj,
        this.fromdata.title,//标题
        that
      );
    },
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId
      this.$post.postData("getHistoryActInfo", JSON.stringify(this.bank_cklc), this.$businessCode.ggfawgl).then(res => {
        if (res) {
          this.tableData = res.data
          this.$nextTick(() => {
            this.$refs.dialogLine.openDialog();
          });
        }
      });
    },
    // 打印处理单
    processSheet() {
      this.preserve().then(save => {
        if(save) {
          const routeData = this.$router.resolve({
            path: "/swcfwcld",
            query: {
              id: this.bank_dispach.id
            }
          });
          window.open(routeData.href, "_blank");
        }
      })
    },
    // 操作指南
    instructions() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "FWGL"
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.getInstFileInfo(this,res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.fromdata.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
                    multiTenancyId: this.fromdata.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "", 
                    showBtns: false,
                    flowTranId:this.$businessCode.fawgl,//流程交易线    chai
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
          self.$businessCode.fawglfj 
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          }else{
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
    // 办文说明
    handleExplain() {
      this.showExplain = true;
    },
    handleSave() {},
    writelistbox(arr,num) {
      if(num>=500){
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "当前字数超出500字",
            duration: 2000
          });
          return;
      }
      this.appendWriteDialog = true;
      this.getCommonUse(0);
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //删除意见(固化意见)
    deletService(type) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "doDeletesendOrderOpinion",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.toEdit();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1000
          });
        });
    },

    // 查看会签流程
    handleCheckFLow() {
      this.$post
        .postData(
          "getSubProcessInfo",
          JSON.stringify({
            function: "getSubProcessInfo",
            processInstId: this.fromdata.processInstId,
            tplbsnid: "S_CFW"
          }),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          this.tableData1 = res.data;
        });
      this.cbxbchakan = true;
    },
    // 办结
    handleDoFinish () {
      let doFinish_form = Object.assign(
        this.fromdata,
        {
          function: 'doFinish',
          tplNo: this.fromdata.pTplNo
        }
      )
      this.$post.postData('doFinish', JSON.stringify(doFinish_form), this.$businessCode.ggfawgl).then((res) => {
        this.$message({
          type: "success",
          offset: 400,
          showClose: true,
          message: "办结成功",
          duration: 1000,
          onClose: () => {
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          }
        });
      }).catch(erro => {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "办结失败",
          duration: 1000
        });
      });
    },
    // 删除此文
    handleDeleteDoc() {
      this.$post.postData("deleteAgainOrderById ", JSON.stringify({
        function: "deleteAgainOrderById",
        id: this.bank_dispach.id
      }), this.$businessCode.fawgl).then(res => {
        if (res && res.success) {
          this.$message({
            type: "success",
            showClose: true,
            offset: 400,
            message: "删除成功",
            duration: 500
          });
          window.location.href = "about:blank";
          window.opener.location.reload();
          window.close();
        }
      }).catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "删除失败",
            duration: 1000
          });
        });
    },
    // 重新发送
    handleShowResend () {
      this.dialog_resand = true
    },
    handleResand () {
      this.$router.push({
        path: '/rexamineBankEntityDispach',
        query: {
          id: this.fromdata.sendOrderId,
          againSendType: this.checkedcf,
          againId: this.$route.query.id
        }
      })
      console.log(this.fromdata.sendOrderId,this.checkedcf,this.fromdata.id)
      this.dialog_resand = false
    },
  },
  created() {
    //初始化加载数据
    this.bank_dispach.id = this.uploadConfig.id = this.$route.query.id? this.$route.query.id: "";
    this.bank_doSend.id = this.bank_dispach.id;
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.ggfawgl;  //完成并发送 树   流程交易线   chai
    this.toEditAgainOrder();
    this.getSendOrderDicByParam();
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
}
.bank_dispach_tit {
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.bank_dispack_side {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
    visibility: hidden;
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

  .bank_dispach_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 40px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: #f00;
          }
        }
        .bank_article_illustrates {
          position: absolute;
          top: 3px;
          right: 10px;
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

    el-form-item {
      margin: 10px 0;
    }
  }

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
/deep/ .hqbm .el-textarea__inner {
  color: #f00 !important;
  min-height: 40px !important;
  background-color: #fff !important;
}
/deep/ .hqbm1 .el-textarea__inner {
  min-height: 40px !important;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.opinionCheck_w {
  width: 100%;
  height: 84px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
  .opinionCheck {
    text-align: left;
    margin-left: 20px;
  }
  .opinionCheckpeo {
    text-align: right;
    margin-right: 20px;
  }
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
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #c0c4cc;
}
.disable_w{
  width: 100%;
}
.tree_w {
  height: 200px;
  padding:20px;
  overflow:scroll;
  margin:20px 0 0 130px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size:14px;
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
    .down{
      cursor: pointer;
    }
    .down:hover{
    color: #3b85ef
    }
  }
}
</style>
