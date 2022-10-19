<template>
  <div class="home-content">
    <!-- 设置窗口 -->
    <setDialog :setDialogVisible="setDialogVisible" :setDialogWidth="setDialogWidth" :setDialogHeight="setDialogHeight" :setDialogTop="setDialogTop" :setDialogLeft="setDialogLeft" :setDialogTitle="setDialogTitle" :setDialogContent="setDialogContent" :setAttachLabel="setAttachLabel" :setAttachLabelFiles="setAttachLabelFiles" />

    <!-- 电子签报页面跳转弹窗  开始 -->
    <el-dialog v-dialogDrag :visible.sync="QBdialogVisible" :modal-append-to-body="false" width="40%" :title="qicaoState">
      <el-form>
        <el-form-item prop="QBkuahangType" ref="QBkuahangType" v-if="kuahangTypeDialog">
          <el-radio v-model="QBkuahangType" label="0">中国建设银行电子签报处理单(跨行)</el-radio>
          <el-radio v-model="QBkuahangType" label="1">中国建设银行电子签报处理单(非跨行)</el-radio>
        </el-form-item>
        <el-form-item v-if="deptArrFlag">
          <el-select v-model="bank_chosDept.deptName" placeholder="请选择" style="width:100%">
            <el-option v-for="item in deptArr" :key="item.currUnitName" :label="item.currUnitName" :value="item.humanId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="QBdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleQBSave">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="请选择类型及拟稿部门" :visible.sync="dialogFormVisible">
      <el-form style="margin:0 10%" :data="formData1">
        <el-form-item label="会议类型" prop="type">
          <el-radio v-model="formData1.type" label="CN012">系统会议通知</el-radio>
          <el-radio v-model="formData1.type" label="CN013">本部会议通知</el-radio>
          <el-radio v-model="formData1.type" label="CN095">部门会议通知</el-radio>
          <el-radio v-model="formData1.type" label="CN015">培训通知</el-radio>
        </el-form-item>
        <el-form-item label="主办部门" v-if="this.deptList1.length>1">
          <el-select v-model="selectDeptHY" style="width:50%" @change="change(selectDeptHY)">
            <el-option
              v-for="item in deptList1"
              :key="item.currUnitId"
              :label="item.chatNum"
              :value="item.humanId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemClick('cancel')">取 消</el-button>
        <el-button type="primary" @click="itemClick('sure')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog
     v-dialogDrag
     :visible.sync="TSXXDialog"
     :modal-append-to-body="false"
     modal="false"
     width="20%"
     title="联系电话及下载">
      <div v-for="item in TSXXData">
        <span>{{item.phone}}</span>
        <el-divider></el-divider>
      </div>
     </el-dialog> -->
     <!-- updataflag == 1时候的提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleForUpData"
      width="30%"
      >
      <span>{{dialogVisibleForUpDataContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dothenUpData()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 电子签报页面跳转弹窗 结束 -->
    <el-row class="mrg-b-20">
      <el-col :span="8">
        <el-card class="home-con-card">
          <el-row>
            <el-col :span="20">
              <h3 class="card-title">
                <i class="el-icon-tickets"></i>快速起草
              </h3>
            </el-col>
            <!-- <el-col :span="4"><span class="card-set"><a href="#"><i class="el-icon-s-tools"></i>设置</a></span></el-col> -->
          </el-row>
          <el-row>
            <el-col :span="5" class="home-top-line">
              <a @click="handleBankDispach">
                <i class="el-icon-document dis-block"></i>电子发文
              </a>
            </el-col>
            <el-col :span="5" class="home-top-line">
              <a @click="btnTagQB('1')">
                <i class="el-icon-link dis-block"></i>电子签报
              </a>
            </el-col>
            <el-col :span="6" class="home-top-line">
              <a @click="createdMeet" target="_blank">
                <i class="el-icon-data-analysis dis-block"></i>会议/培训通知
              </a>
            </el-col>
            <el-col :span="4" class="home-top-line">
              <a @click="addData" target="_blank">
                <i class="el-icon-edit dis-block"></i>便函
              </a>
            </el-col>
            <el-col :span="4" class="home-top-line">
              <a @click="createApply" target="_blank">
                <i class="el-icon-place dis-block"></i>事务审批
              </a>
            </el-col>
            <!-- <el-col :span="4"<a href="#/meeting/zf/zfOne"  target="_blank"> class="home-top-line"><a @click="draftInfo"><i class="el-icon-chat-line-round dis-block"></i>信息稿件</a></el-col> -->
            <!-- <el-col :span="3" class="home-top-line"><a href="#"><i class="el-icon-lock dis-block"></i>商密</a></el-col> -->
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="home-con-card" style="margin-left: 20px;">
          <el-row>
            <el-col :span="20">
              <h3 class="card-title">
                <i class="el-icon-tickets"></i>我的常用
              </h3>
            </el-col>
            <el-col :span="4">
              <span class="card-set el-icon-s-tools" @click="showMenuDialog">设置</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-for="item in commonMenus" :key="item.rightId" class="home-top-line">
              <a :href="'#'+item.rightUrl">
                <el-button round class="btn_w130" size="mini">
                  <span class="icon-doc"></span>
                  <el-tooltip :content="item.rightName">
                    <span>{{item.rightName}}</span>
                  </el-tooltip>
                </el-button>
              </a>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="home-con-card" style="margin-left: 20px;">
          <el-row>
            <el-col :span="24">
              <h3 class="card-title">
                <i class="el-icon-tickets"></i>效率质量提醒
              </h3>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="home-top-cnto">
              <span @click="goToDo()" style="cursor: pointer;">
                <countTo class="count-to-untr" :startVal="0" :endVal="unDoFlowNum" :duration="duration1"></countTo>
                <span>
                  未处理流程
                  <br />(
                  <b>{{overTodoDays}}</b>天未处理)
                </span>
              </span>
            </el-col>
            <el-col :span="8" class="home-top-cnto">
              <a href="#/tw">
                <countTo class="count-to-back" :startVal="0" :endVal="TWNumber" :duration="duration1"></countTo>
                <span>
                  公文退回
                  <br />
                  ({{currentYear}}年)
                </span>
              </a>
            </el-col>
            <el-col :span="8" class="home-top-cnto">
              <a href="#/rexamine?rexIndex=0">
                <countTo class="count-to-resd" :startVal="0" :endVal="FWNumber" :duration="duration1"></countTo>
                <span>
                  公文重发
                  <br />
                  ({{currentYear}}年)
                </span>
              </a>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mrg-b-20">
      <el-card style="height:320px;">
        <el-row>
          <el-col :span="16">
            <h3 class="card-title">
              <i class="el-icon-tickets"></i>待办事宜
            </h3>
            <span class="redTip" v-show="toDoInfo.unDoAffairs">{{"您有"+toDoInfo.unDoAffairs+"份未处理文件"}}</span>
          </el-col>
          <el-col :span="6" class="text-align-right">
          <i data-v-ef18d922="" style="cursor: pointer;color: #409eff;padding-right:15px;" 
            v-if="orderByTime == '1'" class="el-icon-arrow-down" 
            @click="setNewOrderByTime">按时间降序</i>
            <i data-v-ef18d922="" style="cursor: pointer;color: #409eff;padding-right:15px;" 
              v-if="orderByTime == '0'" class="el-icon-arrow-up" 
              @click="setNewOrderByTime">按时间升序</i>
            <a href="#/todolist?activeName=tabs-ptmtwait" v-show="ptAuthority" class="btn_more">查看部门未办结事项</a>
          </el-col>
          <el-col :span="1" class="text-align-right" style="position: absolute;right: 0;">
            <a href="#/todolist" class="btn_more">更多+</a>
          </el-col>
          <el-col :span="1" class="text-align-right" style="position: absolute;right: 60px;color: #409eff;">
            <i data-v-ef18d922="" style="cursor: pointer;" class="icon-font el-icon-refresh select-chang" @click="getTodoList"></i>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin: 10px 0 0 0;">
            <!-- <el-table style="border: 1px soild #eee;"
              :data="tableDataDBSY"
              @row-click="cellClickTodo"
              :row-class-name="tableRowClassName"
              :header-cell-style="{background: '#eef1f6', color:'#666',border:'1px soild #ccc'}">
              <el-table-column show-overflow-tooltip prop="EMELEVEL" label="缓急" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="TITLE" label="标题" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="DOCUMENTCODE" label="文号" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="TYPE_NAME" label="类型" align="center" :formatter="typeFormat"></el-table-column>
              <el-table-column show-overflow-tooltip prop="TMS_RES" label="时间" :formatter="dateFormat" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="PCSAVYNM" label="当前环节" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="SEND_USER_NAME" label="发送人" align="center"></el-table-column>
            </el-table>-->
            <m-table size="medium" :isHome="true" :isPagination="false" :isHandle="false" state="1" :tableData="tableDataDBSY" :tableCols="tableCols_DBSY" @cellClick="cellClickTodo"></m-table>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row :gutter="20" class="mrg-b-20">
      <el-col :span="12">
        <el-card class="dispatch_w">
          <el-row>
            <el-col :span="21">
              <h3 class="card-title">
                <i class="el-icon-tickets"></i>文件阅览
              </h3>
              <span class="redTip" v-show="toDoInfo.unDoRead">{{"您有"+toDoInfo.unDoRead+"份未阅文件"}}</span>
            </el-col>
            <el-col :span="3" class="text-align-right">
              <a href="#/fileRead" class="btn_more">更多+</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin: 10px 0 0 0;">
              <m-table size="medium" :isPagination="false" :isHandle="false" state="1" :tableData="tableDataWJYL" :tableCols="tableCols_View" @cellClick="cellClickWJYL" :pagination="pagination"></m-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="dispatch_w">
          <el-row>
            <el-col :span="22">
              <h3 class="card-title">
                <i class="el-icon-tickets"></i>发文公告
              </h3>
            </el-col>
            <el-col :span="2" class="text-align-right">
              <a href="#/fwgg" class="btn_more">更多+</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin: 10px 0 0 0;">
              <m-table size="medium" :isSelection="false" :isIndex="false" :isPagination="false" :isHandle="false" :tableData="tableDataFWGG" :tableCols="tableColsFWGG" @cellClick="cellClickFWGG"></m-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mrg-b-20">
      <el-col :span="12">
        <el-card class="dispatch_w">
          <el-row>
            <el-col :span="20">
              <h3 class="card-title">
                <i class="el-icon-tickets"></i>本行信息
              </h3>
            </el-col>
            <el-col :span="4" class="text-align-right">
              <a href="#/publication/departInfo/homeBankInformation" class="btn_more">更多+</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin: 10px 0 0 0;">
              <m-table size="medium" :isSelection="false" :isIndex="false" :isPagination="false" :isHandle="false" :tableData="tableDataBHXX" :tableCols="tableColsBHXX" @cellClick="cellClickBHXX" :pagination="pagination"></m-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="dispatch_w">
          <el-row>
            <el-col :span="20">
              <h3 class="card-title">
                <i class="el-icon-tickets"></i>部门信息
              </h3>
            </el-col>
            <el-col :span="4" class="text-align-right">
              <!-- <a @click="deptInfoMore" class="btn_more">更多+</a> -->
              <a href="#/publication/departInfo/release" class="btn_more">更多+</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin: 10px 0 0 0;">
              <m-table size="medium" :isSelection="false" :isIndex="false" :isPagination="false" :isHandle="false" :tableData="tableDataDEPT" :tableCols="tableColsDEPT" @cellClick="cellClickDEPT" :pagination="pagination"></m-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 发文公告弹窗 -->
    <el-dialog v-dialogDrag :visible.sync="cellDialog" :modal-append-to-body="true" :close-on-click-modal="false" title="发文公告">
      <el-form v-model="ggData" label-width="130px">
        <el-row>
          <el-col>
            <el-form-item label="正文标题:">
              <el-row>
                <el-col :span="20">
                  <el-button type="text" @click="drafting(0)" class="opendraft" style="text-align:left;padding-top:0px;line-height:25px;word-break: break-all;white-space: pre-line;">{{ ggData.title }}</el-button>
                </el-col>
                <el-col :span="4" style="text-align:right;">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="collect('notice', dispatchFwggId)">收藏</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字号:">{{ ggData.documentNo }}</el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="附件:">
              <el-row :key="file.id" v-for="file in attchmentFileInfo" class="opendraft">
                <el-col :span="20">
                  <el-button type="text" @click="viewDraftFile(file.fileName, file.filePath, $businessCode.fawglfj)">{{ file.fileName }}</el-button>
                </el-col>
                <el-col :span="4" style="text-align:right;">
                  <el-button type="primary" size="mini" @click="downFile1(file)">下载</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 本行信息弹窗 -->
     <el-dialog
      v-dialogDrag
      :visible.sync="cellDialog2"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      title="发布信息"
    >
      <el-form v-model="ggData" label-width="130px">
        <el-row>
          <el-col>
            <el-form-item label="标题:">
              <el-row>
                <el-col :span="20">
                  <el-button type="text" @click="drafting()" class="opendraft" style="text-align:left;padding-top:0px;line-height:25px;word-break: break-all;white-space: pre-line;">{{ ggData.title }}</el-button>
                </el-col>
                <!-- <el-col :span="4" style="text-align:right;">
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="collection()">收藏</el-button>
                </el-col> -->
              </el-row>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="编号:">{{ ggData.briefingNo }}</el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="附件:">
              <el-scrollbar>
                <div
                  v-for="(item,index) in attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_file">
                      <span
                        class="name down"
                        :title="item.fileName"
                        @click="viewFile(item)"
                      >{{index+1}}. {{item.fileName}}</span>
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
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 部门信息弹窗 -->
      <el-dialog
      v-dialogDrag
      :visible.sync="cellDialog1"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      title="发布信息"
    >
      <el-form v-model="ggData" label-width="130px">
        <el-row>
          <el-col>
            <el-form-item label="标题:">
              <el-row>
                <el-col :span="20">
                  <el-button type="text" @click="drafting()" class="opendraft" style="text-align:left;padding-top:0px;line-height:25px;word-break: break-all;white-space: pre-line;">{{ ggData.title }}</el-button>
                </el-col>
                <el-col :span="4" style="text-align:right;">
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="collection()">收藏</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="编号:">{{ ggData.jbNo }}</el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="附件:">
              <el-scrollbar>
                <div
                  v-for="(item,index) in attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_file">
                      <span
                        class="name down"
                        :title="item.fileName"
                        @click="viewFile(item)"
                      >{{index+1}}. {{item.fileName}}</span>
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
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 常用功能配置 -->
    <el-dialog v-dialogDrag title="我的常用设置" :visible.sync="commonMenuDialog" :modal-append-to-body="true" :close-on-click-modal="false" :before-close="menuDialogClose">
      <menuTree v-if="commonMenuDialog" :commonMenus="commonMenus" @close="menuDialogClose" @confirm="setCommonMenu"></menuTree>
    </el-dialog>
    <!-- 快速起草--便函 -->
    <select-dept-b-h v-model="dialogVisible" :deptList="deptList" :selectDept="selectDept"></select-dept-b-h>

    <!-- 快速起草-事务审批 -->
    <choo-depar v-if="SWSPCreateDia" @setChooDepar="setChooDepar"></choo-depar>
    <!--选择部门-->
    <el-dialog v-dialogDrag :visible.sync="showChosDept" :modal-append-to-body="false" :close-on-click-modal="false" title="选择部门">
      <el-form>
        <el-form-item>
          <el-select v-model="bank_chosDept.deptName" placeholder="请选择" style="width:100%">
            <el-option v-for="item in deptArr" :key="item.currUnitName" :label="item.currUnitName" :value="item.humanId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showChosDept = false">取 消</el-button>
        <el-button type="primary" @click="handleChosDept()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <TeamNotice  @teanNotice="openTuanDui" v-if="showTeamNotice" :tuanduigg="tuanduigonggao" ></TeamNotice> -->

    <el-dialog v-dialogDrag title="团队公告" :visible.sync="showTeamNotice" append-to-body>
      <el-form ref="teamNotice" :model="addNoticeform" class="team-notice">
        <el-form-item label="公告名称" prop="noticeHeadName">
          <el-input :disabled="true" v-model="addNoticeform.noticeHeadName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属团队" prop="teamName">
          <el-input :disabled="true" v-model="addNoticeform.teamName" autocomplete="off"></el-input>
          <!-- <el-select :disabled="true" v-model="addNoticeform.teamName" placeholder="请选择">
            <el-option
              :value="item.team_name"
            ></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="公告内容" prop="noticeContent">
          <el-input :disabled="true" type="textarea" :rows="3" v-model="addNoticeform.noticeContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelNotice">取 消</el-button>
        <!-- <el-button type="primary" @click="addNotice">保 存</el-button> -->
      </div>
    </el-dialog>

  </div>
</template>

<script>
import mTable from 'components/table/mTable.vue'
import menuTree from './menuTree.vue'
import countTo from 'vue-count-to'
import chooDepar from 'views/approval/chooDepar'
import index from 'views/bianhan/minixs/index'
import viewDraft from '@/minixs/viewDraft'
import dispatchIndex from "@/minixs/dispatchIndex";
import selectDeptBH from 'views/bianhan/components/selectDeptBH'
import setDialog from 'components/dialog/setDialog.vue'
import paraMeter from '@/httpTansun/api/publication/paraMeter.js'
import { skipPath, typeNameFormat, allCircle } from '@/util/skipPath.js'
import { compareSum } from '@/util/count.js'
import exportTableQueryScript from "@/minixs/exportTableQueryScript";
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
export default {
  name: 'Index',
  components: {
    mTable,
    countTo,
    menuTree,
    chooDepar,
    selectDeptBH,
    paraMeter,
    setDialog,
  },
  mixins: [index, viewDraft,dispatchIndex,exportTableQueryScript,openOrDownLoadFile],
  data() {
    return {
      cellDialog2:false,
      formData1: {},
      dialogFormVisible:false,
      dialogVisibleForUpData:false,
      dialogVisibleUpOne:false,
      copyRow:'',
      dialogVisibleForUpDataContent:'',
      deptList1: [],
      selectDeptHY: {},
      dispatchFwggId: "", // 发文公告收藏id
      orderByTime:"1",//时间排序
      qicaoState:"请选择电子签报起草类型",
      addNoticeform: {
        noticeHeadName: '',
        noticeContent: '',
        teamName: '',
      },
      TSXXData:[{phone:'110'},{phone:'120'},{phone:'110'},{phone:'110'},{phone:'110'}],
      TSXXDialog:true,
      showTeamNotice: false, //tuandui
      SWSPCreateDia: false,
      bianhanDeptList: [],
      deptList: [],
      selectDept: {},
      bianhanSelectDept: {},
      dialogVisible: false,
      commonMenus: [],
      commonMenuDialog: false,
      bank_toDoSelect: {
        //待办事宜列表查询
        function: 'toDoSelect',
        // tplbsnids: allCircle,
        state: '0',
        page: 1,
        totalCount: 0,
        limit: 8,
      },
      bank_countersignature: {
        //发文公告列表查询参数
        function: 'getSendOrderNoticeList',
        state: 0, //0：全部； 1:待办；2:已办
        draftOrganId: '',
      },
      toDoInfo: {
        unDoFWNotice: '',
        unDoAffairs: '',
        unDoRead: '',
      },
      teamNoticTitle: '',
      ptAuthority: false,
      tableDataDBSY: [], //待办事宜
      tableDataFWGG: [], //发文公告
      tableDataWJYL: [], //文件预览
      tableDataBHXX: [], //本行信息
      tableDataDEPT: [], //部门信息
      untreatedVal: 133,
      backVal: 22,
      resendVal: 26,
      duration1: 3000,
      duration2: 4000,
      duration3: 5000,
      tableData: [],
      tableCols_DBSY: [
        { label: '紧急程度', prop: 'EMELEVEL', align: 'center',width:'100' },
        {
          label: '时间',
          prop: 'TMS_RES',
          align: 'center',
          width: '160',
          formatter(row) {
            return row.TMS ? row.TMS.slice(0, 16) : ''
          },
        },
        //{ label: '文种', prop: 'EMELEVEL', align: 'center',width:'100' },
        { label: '标题', prop: 'TITLE', align: 'left',minwidth:"50%" },
        { label: '文号', prop: 'DOCUMENTCODE', align: 'left',width:"200"},
        {
          label: '文件类型',
          prop: 'TYPE_NAME',
          align: 'center',
          formatter(row) {
            if(row.DATA_TYPE == 'oa2'){
              return row.TYPE_NAME
            }else{
              return typeNameFormat(row)
            }
          },width:"120px"
        },
        
        { label: '环节', prop: 'PCSAVYNM', align: 'center',width:"120px" },
        {
          label: '发送人 ',
          prop: 'SEND_USER_NAME',
          align: 'center',
          width: '120px',
        },
      ],
      tableCols_View: [
        { label: '标题', prop: 'TITLE', align: 'center',minwidth:'50%'},
        { label: '发送人 ', prop: 'SEND_USER_NAME', align: 'center',width:'100'},
      ],
      tableColsFWGG: [
        { label: '标题', prop: 'title', align: 'center',minwidth:'65%'},
        { label: '发文文号 ', prop: 'documentNo', align: 'center',minwidth:'35%'},
      ],
      tableColsBHXX: [
        { label: '标题', prop: 'title', align: 'center',minwidth:'50%'},
        { label: '发送人 ', prop: 'sendUnm', align: 'center',width:'100'},
      ],
      tableColsDEPT: [
        { label: '标题', prop: 'title', align: 'center',minwidth:'65%'},
        { label: '简报编号 ', prop: 'briefingNo', align: 'center',minwidth:'35%'},
      ],
      pagination: {
        page: 1, //第几页
        total: 6, //共有条数
        limit: 10, //每页条数
      },
      QBdialogVisible: false, //电子签报弹窗显示隐藏
      QBkuahangType: '1',

      TWNumber: 0,
      FWNumber: 0,
      unDoFlowNum: 0,
      currentYear: '',
      overTodoDays: '',
      //签报选择部门
      deptArr: [],
      deptArrFlag: false, //选择部门显示隐藏
      showChosDept: false,
      bank_chosDept: {
        function: '',
        deptName: '',
      },
      curhumanId: '',
      type_fw: '',

      kuahangType: '1',
      kuahangTypeDialog: false, //签报起草跨行非跨行选择显示隐藏

      checkHumanUnitByHumanId: {
        function: 'checkHumanUnitByHumanId',
      },

      //正文
      showDraft: false,
      draftFlag: 'newFile', //正文类型 默认空白文档
      zhengWenState: '',
      // 发文公告
      bank_doDownloadFile: {
        function: 'doDownloadFile',
        fileName: '',
        filePath: '',
      },
      bank_dispach: {
        id: '',
      },
      ggData: {
        title: '',
        documentNo: '',
        adjunct: '',
      },
      attchmentFileInfo: [],
      cellDialog: false,
      cellDialog1: false,
      fromdata: {
        fileName: '',
        filePath: '',
      },
      // 设置窗口
      setDialogVisible: false,
      setDialogWidth: 60,
      setDialogHeight: 50,
      setDialogTop: 25,
      setDialogLeft: 20,
      setDialogTitle: 'aa',
      setDialogContent: 'xx',
      setAttachLabel: '0',
      setAttachLabelFiles: [],
    }
  },
  methods: {
       // 收藏
    collection() {
      exportTableQueryScript.collect(this, this.ggData.depInfoPubId, 'depInfoPubId', 'A08462976')
    },
    //更新数据
    async dothenUpData(){
      this.dialogVisibleForUpData = false;
      await this.notiUpdata(this.copyRow) // 通知状态更新
      await this.getTodoList() // 待办事宜
    },
    // 起草电子
    handleBankDispach(val) {
      this.type_fw = val
      let newHref = ''
      if (this.deptArr.length > 1) {
        this.showChosDept = true
      } else {
        newHref = this.$router.resolve({
          path: '/bankDispach',
        })
        window.open(newHref.href, '_blank')
      }
    },
    // 选择部门 确定
    handleChosDept() {
      if (this.bank_chosDept.deptName == '') {
        this.$message({
          type: 'error',
          showClose: true,
          offset: 400,
          message: '请选择起草部门',
          duration: 1000,
        })
        return
      }
      let newHref = ''
      this.$post
        .postData(
          'switchUserInfo',
          JSON.stringify({
            function: 'switchUserInfo',
            human_Id: this.bank_chosDept.deptName,
          }),
          this.$businessCode.ggfawgl
        )
        .then((res) => {
          this.showChosDept = false
          newHref = this.$router.resolve({
            path: '/bankDispach',
          })
          window.open(newHref.href, '_blank')
        })
    },
    // 事务审批
    createApply() {
      this.SWSPCreateDia = true
      this.$forceUpdate()
    },
    createdMeet(){
      this.formData1 = {};
      this.$api.meeting.getDeptList({}).then((res) => {
        this.deptList1 = res.result;
        if (this.deptList1.length == 1) {
          this.selectDeptHY = JSON.stringify(this.deptList1[0]);
          this.formData1.deptDetail = JSON.stringify(this.deptList1[0]);
        } else {
          this.selectDeptHY = this.deptList1[0].humanId;
          let select1 = {};
          this.deptList1.forEach((item) => {
            if (item.humanId == this.selectDeptHY) {
              select1 = item;
            }
          });
          this.formData1.deptDetail = JSON.stringify(select1);
        }
      });
      this.dialogFormVisible = true;
    },
    itemClick(params) {
      switch (params) {
        case "sure":
          if (this.formData1.type) {
            let newHref = this.$router.resolve({
              path: '/meeting/zf/zfTwo',
              query: this.formData1,
            })
            this.dialogFormVisible = false;
            window.open(newHref.href, '_blank')
          } else {
            this.$message({
              message: "请选择会议类型",
              type: "warning",
            });
          }
          break;
        case "cancel":
          this.dialogFormVisible = false;
          break;
      }
    },
    change(p) {
      let select = {};
      this.deptList1.forEach((item) => {
        if (item.humanId == p) {
          select = item;
        }
      });
      this.formData1.deptDetail = JSON.stringify(select);
      this.$forceUpdate();
    },
    // not use
    draftInfo() {
      this.$router.push({ name: 'choseDepart' })
    },
    setChooDepar(isshow) {
      this.SWSPCreateDia = isshow.isCreateShow
    },
    // not use
    overDaysTodoList() {
      
    },
    // 未处理流程 的 天数
    getOverDays() {
      let params = {
        function: 'toDoConfig',
      }
      this.$post
        .postData('toDoConfig', JSON.stringify(params), this.$businessCode.dbgl)
        .then((res) => {
          this.overTodoDays = res.data.overTodoDays
          let param1 = Object.assign({}, this.bank_toDoSelect)
          param1.overTodoDays = this.overTodoDays
          this.$post
          .postData('toDoSelect', JSON.stringify(param1), this.$businessCode.dbgl)
          .then((res1) => {
            this.unDoFlowNum = res1.data.total
          })
        })
        .catch((err) => {})
    },
    typeFormat(row) {
      return typeNameFormat(row)
    },
    showMenuDialog() {
      this.commonMenuDialog = true
    },
    menuDialogClose() {
      this.commonMenuDialog = false
    },
    // 我的常用设置 确定
    setCommonMenu(menus) {
      let params = {
        menuDatas: menus,
        function: 'savePersonalMenu',
      }
      params.st = localStorage.getItem('st')
      this.$post
        .postData('savePersonalMenu', JSON.stringify(params), this.$businessCode.kjbg)
        .then((res) => {
          if (res.success) {
            this.getCommonMenus()
            this.commonMenuDialog = false
          } else {
            this.$message({
              type: 'error',
              message: '保存失败',
              duration: 1000,
            })
          }
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '保存失败',
            duration: 1000,
          })
        })
    },
    // 我的常用 列表信息
    getCommonMenus() {
      let params = {
        function: 'personalMenu',
        st: '',
      }
      params.st = localStorage.getItem('st')
      this.$post
        .postData('personalMenu', JSON.stringify(params), this.$businessCode.kjbg)
        .then((res) => {
          this.commonMenus = res.data
        })
    },
    getHumanRole() {
      let userRole = JSON.parse(localStorage.getItem('tcHumanRole'))
      userRole.map((item) => {
        if (item.dicCode == 'zongheG' || item.dicCode == 'deptqfG' || item.dicCode == 'dubanG') {
          this.ptAuthority = true
        }
      })
    },
    // not use start
    dateFormat(row, column) {
      let time = row.TMS ? row.TMS.slice(0, 16) : ''
      return time
    },
    tableRowClassName(row) {
      if (
        (row.row.readFlag || row.row.READFLAG) &&
        (row.row.readFlag == 0 || row.row.READFLAG == 0)
      ) {
        return 'warning-row'
      }
      return ''
    },
    // not use end
    // ？？
    handleMock() {
      const Mock = require('mockjs')
      const count = 6
      for (let i = 0; i < count; i++) {
        this.tableData.push(
          Mock.mock({
            id: '@increment',
            type: '公文处理',
            'priority|1-3': 2,
            title: '(@integer(1000,9999))@ctitle(5, 10)',
            date: '@date(yyyy-MM-dd)',
            tache: '发文',
            person: '@cname',
            fileId: '@ctitle(5, 6)【@date(yyyy)】号',
          })
        )
      }
    },

    handleOpenPage(path, id, readType) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          readFlag: readType,
        },
      })
      window.open(routeData.href, '_blank')
    },
    // 起草电子 电子签报
    btnTagQB(val) {
      this.type_fw = val
      let newHref = ''
      if (val == '1') {
        this.qicaoState = '请选择电子签报起草类型'
        this.$post
          .postData(
            'checkHumanUnitByHumanId',
            JSON.stringify(this.checkHumanUnitByHumanId),
            this.$businessCode.qbgl
          )
          .then((res) => {
            if (res && res.success) {
              if (res.data != 'show' && this.deptArr.length <= 1) {
                // 没有跨行非跨行  没有部门选择 就直接跳转页面
                this.QBdialogVisible = false
                this.kuahangTypeDialog = false
                this.handleOpenPage('/signquoteWaitFkhDispatch')
              } else if (res.data == 'show' && this.deptArr.length <= 1) {
                // 有跨行非跨行  没有部门选择 就跨行选择，部门不选择 出弹窗
                this.kuahangTypeDialog = true //跨行非跨行选择
                this.deptArrFlag = false //部门下拉
                this.QBdialogVisible = true //跨行非跨行 部门选择  整个弹窗
              } else if (this.deptArr.length > 1 && res.data != 'show') {
                // 没有跨行非跨行  有部门选择 就跨行不选择，部门选择 出弹窗
                this.qicaoState = '选择部门'
                this.kuahangTypeDialog = false
                this.deptArrFlag = true
                this.QBdialogVisible = true
              } else {
                // 全部弹出
                this.kuahangTypeDialog = true
                this.deptArrFlag = true
                this.QBdialogVisible = true
              }
            } else {
              this.$message({
                type: 'error',
                offset: 400,
                showClose: true,
                message: '新建失败',
                duration: 1000,
              })
            }
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              offset: 400,
              showClose: true,
              message: '新建失败',
              duration: 1000,
            })
          })
      } else {
        // if (this.deptArr.length > 1) {
        //   this.deptArrFlag = true
        //   this.QBdialogVisible = true
        // } else {
         
        // }
         this.handleOpenPage('/signquoteWaitFkhDispatch')
      }
    },

    // 电子签报跳转弹窗 确定
    handleQBSave() {
      if (this.deptArr.length > 1 && this.kuahangTypeDialog) {
        //多机构 跨行非跨行
        if (!(this.QBkuahangType && this.bank_chosDept.deptName)) {
          this.$message({
            type: 'error',
            offset: 400,
            showClose: true,
            message: '请选择起草部门',
            duration: 1000,
          })
          return
        }
      }
      // if (this.type_fw == '2' && this.deptArr.length <= 1) {
      //   this.QBdialogVisible = false
      //   this.handleOpenPage('/signquoteWaitEntityDispatch')
      // } else 
      if (this.type_fw == '1' && this.kuahangTypeDialog && this.deptArr.length <= 1) {
        //点击跳转非跨行页面、跨行请示行页面
        this.qicaoState = '请选择电子签报起草类型'
        if (this.QBkuahangType == '1') {
          this.QBdialogVisible = false
          this.handleOpenPage('/signquoteWaitFkhDispatch')
        } else if (this.QBkuahangType == '0') {
          this.QBdialogVisible = false
          this.handleOpenPage('/signquoteWaitKhQshDispatch')
        } else {
          this.QBdialogVisible = false
          this.$message({
            type: 'error',
            message: '请选择要跳转的页面!',
          })
          return
        }
      } else {
        if (!this.bank_chosDept.deptName) {
          this.$message({
            type: 'error',
            offset: 400,
            showClose: true,
            message: '请选择起草部门',
            duration: 1000,
          })
          return
        }
        this.$post
          .postData(
            'switchUserInfo',
            JSON.stringify({
              function: 'switchUserInfo',
              human_Id: this.bank_chosDept.deptName,
            }),
            this.$businessCode.ggqbgl
          )
          .then((res) => {
            if (res && res.success) {
              if (this.type_fw == '2' && this.deptArr.length > 1) {
                this.QBdialogVisible = false
                this.handleOpenPage('/signquoteWaitEntityDispatch')
              } else if (this.type_fw == '1' && this.kuahangTypeDialog) {
                this.qicaoState = '请选择电子签报起草类型'
                this.QBdialogVisible = false
                //点击跳转非跨行页面、跨行请示行页面
                if (this.QBkuahangType == '1') {
                  this.QBdialogVisible = false
                  this.handleOpenPage('/signquoteWaitFkhDispatch')
                } else if (this.QBkuahangType == '0') {
                  this.QBdialogVisible = false
                  this.handleOpenPage('/signquoteWaitKhQshDispatch')
                } else {
                  this.QBdialogVisible = false
                  this.$message({
                    type: 'error',
                    message: '请选择要跳转的页面!',
                  })
                  return
                }
              } else if (this.type_fw == '1' && !this.kuahangTypeDialog) {
                this.QBdialogVisible = false
                this.handleOpenPage('/signquoteWaitFkhDispatch')
              }
            } else {
              this.QBdialogVisible = false
              this.$message({
                type: 'error',
                message: '跳转页面失败!',
              })
              return
            }
          })
          .catch((err) => {
            this.QBdialogVisible = false
            this.$message({
              type: 'error',
              message: '跳转页面失败!',
            })
            return
          })
      }
    },

    // 待办事宜
    getTodoList() {
      this.bank_toDoSelect.st = localStorage.getItem('st')
      this.$post
        .postData('toDoSelect', JSON.stringify(this.bank_toDoSelect), this.$businessCode.dbgl)
        .then((res) => {
          this.toDoInfo.unDoAffairs = res.data.total
          this.tableDataDBSY = res.data.rows
        })
      // this.tableDataDBSY = [
      //   {
      //     DATA_TYPE: 'QBCY',
      //     ID: "33e2bb12-7ce7-4023-a64f-fb3b0d786e0f",
      //     MAIN_DOC_ID: '4acc4d4c-df5d-4393-a51b-35fea30f264c',
      //     MULTI_TENANCY_ID: 'CN009',
      //     state: 0,
      //     READFLAG: 0,
      //     TITLE: "传阅完成：0301-1005",
      //     DOCUMENTCODE: "建津南签〔2021〕224号",
      //     TMS: "2021-03-01 10:16:26"
      //   }
      // ]
    },
    // 文件阅览列表
    getReadList() {
      let params = {
        function: 'selectWenJianYuLan',
        endTime: '',
        statrTime: '',
        title: '',
        readStatus: '0',
        page: 1,
        totalCount: 0,
        limit: 6,
      }
      this.$post
        .postData('selectWenJianYuLan', JSON.stringify(params), this.$businessCode.yjgl)
        .then((res) => {
          this.toDoInfo.unDoRead = res.data.total
          this.tableDataWJYL = res.data.rows
        })
    },
    getTextList(){
      let params = {
        function: 'unitDifferenceConfig',
        modular: '',
      }
      this.$post
        .postData('unitDifferenceConfig', JSON.stringify(params), this.$businessCode.dbgl)
        .then((res) => {
          if(res.success){
            if(res.data.length!=0){
              localStorage.setItem('textList', JSON.stringify(res.data))
            }
          }
        })
    },
    // 文件阅览点击
    cellClickWJYL(row) {
      let skipPathObj = skipPath(row)
      let todoPath = skipPathObj.waitReadRouter
      let routeData = this.$router.resolve(todoPath)
      window.open(routeData.href, '_blank')
    },

    // 发文公告
    cellClickFWGG(row, column, cell, event) {
      // this.ggData = row
      let readType = {
        function: 'getSendOrderNoticeById',
        id: row.id,
      }
      this.bank_dispach.id = row.fawenId
      this.fromdata.fileName = row.fileName
      this.fromdata.filePath = row.filePath
      this.$post
        .postData('getSendOrderNoticeById', JSON.stringify(readType), this.$businessCode.fawgl)
        .then((res) => {
          if (res && res.success) {
            this.ggData = res.data
            this.attchmentFileInfo = res.data.attchmentFileInfo || []
            this.dispatchFwggId = row.id;
            this.cellDialog = true
          } else {
            this.$message({
              type: 'error',
              offset: 400,
              showClose: true,
              message: '后端返回失败',
              duration: 1000,
            })
          }
        })
        .catch((erro) => {
          this.$message({
            type: 'error',
            offset: 400,
            showClose: true,
            message: '后端返回失败',
            duration: 500,
          })
        })
    },
    // 发文列表
    getFWGGList() {
      this.$post
        .postData(
          'getSendOrderNoticeList',
          JSON.stringify(Object.assign(this.bank_countersignature, { page: 1, limit: 6 })),
          this.$businessCode.fawgl
        )
        .then((res) => {
          this.tableDataFWGG = (res.data && res.data.rows) || []
          this.toDoInfo.unDoFWNotice = res.data && res.data.total
        })
    },

    //部门信息列表查询/test/dispachService
    getDeptInfoList() {
      //后端接口报错暂时关闭
      const userInfoData1 = JSON.parse(localStorage.getItem('unitInfo'))
      const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
      let userId = []
      for (const i in userInfoData1) {
        if (userInfoData1[i].unitId === userInfoData.unitId) {
          let str = userInfoData1[i].unitCodes
          while(str.indexOf('/') != '-1'){
            str = str.replace('/',',')
          }
          userId.push(str)
        }
      }
      this.$api.paraMeter
        .deptInfoList(
          {
            sendOrgIds: userInfoData.unitId,
            senDeptIds: userId.join(','),
            sendHumanCodes: userInfoData.humanCode,
            type: '2',
          },
          {
            PAGE_JUMP: 1,
            REC_IN_PAGE: 6,
          }
        )
        .then((res) => {
          this.pagination.total = res.data.total
          this.tableDataDEPT = res.data.data
        })
    },
    deptInfoMore() {
      // can delete
      this.$router.push('/publication/departInfo/release')
    },
    cellClickDEPT(row) {
      //todo
      if (row.type === '1' || row.type === '2') {
        this.bank_dispach.id = row.id;
        this.$api.pubInfo
        .getinfoMessage({
          id:row.pubId,
        })
        .then(res=>{
          this.ggData = res.data
           let bank_doDownloadFile = { function: 'doDownloadFile' }
           console.log(row)
           const pathArrays = this.ggData.pubMainFilePath.split(',')
           bank_doDownloadFile.fileName = pathArrays[0]
           bank_doDownloadFile.filePath = pathArrays[1]
           this.ggData.fileName = pathArrays[0] || ''
           this.ggData.filePath = pathArrays[1] || ''
           this.attchmentFileInfo = res.data.attchmentFileInfo||[];
           console.log(bank_doDownloadFile)
           if(this.attchmentFileInfo == ''){
            this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
            .then(res => {
             if (res) {
              res.ifView = 1
              let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
              let data = this.$router.resolve({
                path: Path,
                query: {
                  state: 'viewFile',
                  id: row.pubId,
                  tanSun: '3',
                  zhengWenState: 0,
                  JYcode: this.$businessCode.fawglfj,
                  relativePath: res ? res.filePath : '',
                  fileName: res ? res.fileName : '测试.doc',
                  tmpFilePath: res ? res.filePath : '',
                  tmpFileName: res ? res.fileName : '测试.doc',
                  multiTenancyId: '000076767qwq0',
                  showBtns: true,
                  saveNameAndNumber: row.briefingNo + row.title
                },
              })
              this.$forceUpdate()
              var one = data.href.split('?')[0]
              var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
              window.open(newPath, "_blank");
            } else {
              this.$message({
                type: 'error',
                offset: 100,
                showClose: true,
                message: '下载失败',
                duation: 2000,
              })
            }
          })
          }else{
             this.cellDialog1 = true
           }
        })
       
      }
    },

    // 本行信息列表查询
    getBHXXList() {
      //后端接口报错暂时关闭
      const userInfoData1 = JSON.parse(localStorage.getItem('unitInfo'))
      const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
      let userId = []
      for (const i in userInfoData1) {
        if (userInfoData1[i].unitId === userInfoData.unitId) {
          let str = userInfoData1[i].unitCodes
          while(str.indexOf('/') != '-1'){
            str = str.replace('/',',')
          }
          userId.push(str)
        }
      }

      this.$api.paraMeter
        .deptInfoList(
          {
            sendOrgIds: userInfoData.unitId,
            senDeptIds: userId.join(','),
            sendHumanCodes: userInfoData.humanCode,
            type: '123',
          },
          {
            PAGE_JUMP: 1,
            REC_IN_PAGE: 6,
          }
        )
        .then((res) => {
          this.pagination.total = res.data.total
          this.tableDataBHXX = res.data.data
        })
    },
    // 本行信息跳转
    cellClickBHXX(row) {
      // 1组刊；2部门信息
      if (row.type === '1') {
        console.log(row)
        //本行信息跳转事件
        let bank_doDownloadFile = { function: 'doDownloadFile' }
        bank_doDownloadFile.fileName = row.mainFileName
        bank_doDownloadFile.filePath = row.mainFilePath
        this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
          .then(res => {
            if (res) {
              console.log(this,res)
              res.ifView = 1
              let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
              let data = this.$router.resolve({
                path: Path,
                query: {
                  state: 'viewFile',
                  id: row.pubId,
                  tanSun: '22',
                  zhengWenState: 0,
                  JYcode: this.$businessCode.fawglfj,
                  relativePath: res ? res.filePath : '',
                  fileName: res ? res.fileName : '',
                  tmpFilePath: res ? res.filePath : '',
                  tmpFileName: res ? res.fileName : '',
                  multiTenancyId: '000076767qwq0',
                  showBtns: true,
                  isDinggao: 2,
                  saveNameAndNumber: row.title
                },
              })
              this.$forceUpdate()
              var one = data.href.split('?')[0]
              var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
              window.open(newPath, "_blank");
            } else {
              this.$message({
                type: 'error',
                offset: 100,
                showClose: true,
                message: '下载失败',
                duation: 2000,
              })
            }
          })
      } else if (row.type === '2') {
          this.bank_dispach.id = row.id
          this.ggData = row
          this.ggData.depInfoPubId = row.pubId
          this.ggData.documentNo = row.briefingNo
          let bank_doDownloadFile = {function: "doDownloadFile"}
          const pathArrays = this.ggData.mainFilePath.split(',')
          bank_doDownloadFile.fileName =  pathArrays[0]
          bank_doDownloadFile.filePath = pathArrays[1]
          this.ggData.fileName = pathArrays[0] || ''
          this.ggData.filePath = pathArrays[1] || ''
          this.attchmentFileInfo = row.attchmentFileInfo||[];
          if(this.attchmentFileInfo == ''){
           this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
            .then(res => {
            if (res) {
              res.ifView = 1
              let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
              let data = this.$router.resolve({
                path: Path,
                query: {
                  state: 'viewFile',
                  id: row.pubId,
                  tanSun: '3',
                  zhengWenState: 0,
                  JYcode: 'A0846C002',
                  relativePath: res ? res.filePath : '',
                  fileName: res ? res.fileName : '测试.doc',
                  tmpFilePath: res ? res.filePath : '',
                  tmpFileName: res ? res.fileName : '测试.doc',
                  multiTenancyId: '000076767qwq0',
                  showBtns: true,
                  saveNameAndNumber: row.briefingNo + row.title
                },
              })
              this.$forceUpdate()
              var one = data.href.split('?')[0]
              var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
              window.open(newPath, "_blank");
            } else {
              this.$message({
                type: 'error',
                offset: 100,
                showClose: true,
                message: '下载失败',
                duation: 2000,
              })
            }
          })
          }else{
            this.cellDialog2 = true
          }
      }
      if (row.type === '3') {
        let tempPath = {
          path: '/dashboard/personalOffice/publishInfo/inquireDeal',
          query: {
            id: row.pubId,
            isDle: true,
          },
        }
        let routeData = this.$router.resolve(tempPath)
        window.open(routeData.href, '_blank')
      }
    },

    // not use
    handleCloseFWGG() {
      this.getFWGGList()
      this.FWGGdialogVisible = false
    },
    //通知状态更新
    /**
     * @param {Object} row 当前行信息
     */
    async notiUpdata(row) {
      let param = {
        function: 'updateTotodorecordById',
        todoRecordId: row.table_id,
        readFlag: '1',
        todoFlag: '1',
      }
      this.$post
        .postData('updateTotodorecordById', JSON.stringify(param), this.$businessCode.dbgl)
        .then((res) => {})
    },
    // 获取团队信息
    openTuanDui(id) {
      this.showTeamNotice = true
      this.$post
        .postData(
          'selectNoticeById',
          JSON.stringify({ function: 'selectNoticeById', id: id }),
          this.$businessCode.tdgl
        )
        .then((res) => {
          // console.log(res, 'res1111', res.data.noticeHeadName)
          this.addNoticeform.noticeHeadName = res.data.noticeHeadName
          this.addNoticeform.noticeContent = res.data.noticeContent
          this.addNoticeform.teamName = res.data.teamName
        })
    },
    // 待办事宜跳转
    async cellClickTodo(row) {  
        if (row.DATA_TYPE == 'TDGG' || row.dataType == 'TDGG') {
          //dakai tanchuang
          this.showTeamNotice = true
          this.openTuanDui(row.ID)
          return
        }else if (row.DATA_TYPE == 'D_BHZF' 
          || row.DATA_TYPE == 'D_BHCB'
          || row.DATA_TYPE == 'D_SWSPWH'
          || row.DATA_TYPE == 'SW_KHSWSP'
          || row.DATA_TYPE=='SW_KHSWSPSPH'
          || row.DATA_TYPE == 'HY_XTHYTZZF'
          || row.DATA_TYPE == 'HYGL_BBHYTZZF'
          || row.DATA_TYPE == 'HYGL_BMHYTZZF'
          || row.DATA_TYPE == 'D_PXTZZF'
          || row.DATA_TYPE == 'HY_XTHYTZCH'
          || row.DATA_TYPE == 'HYGL_BBHYTZCH'
          || row.DATA_TYPE == 'HYGL_BMHYTZCH'
          || row.DATA_TYPE == 'D_PXTZCX'
          || row.DATA_TYPE == 'HY_XTHYTZCB'
          || row.DATA_TYPE == 'D_PXTZCXWH') {
          let todoPath    
          let skipPathObj = skipPath(row)
          if(row.DATA_TYPE == 'D_SWSPWH'||row.DATA_TYPE == 'SW_KHSWSP'||row.DATA_TYPE=='SW_KHSWSPSPH'){
            if(row.sourceType&&row.sourceType == '1'){
              // let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];//2022-4-8
              //   if(routeId.includes(row.ID)){//2022-4-8
              //     this.$message({
              //       type: "error",
              //       offset: 400,
              //       showClose: true,
              //       message: "已经打开了该页面!",
              //       duration: 1500,
              //     })
              //     return;
              //   }
              todoPath = skipPathObj.otherRouter
            }else if(row.sourceType&&row.sourceType == '2'){
                // let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];//2022-4-8
                // if(routeId.includes(row.ID)){//2022-4-8
                //   this.$message({
                //     type: "error",
                //     offset: 400,
                //     showClose: true,
                //     message: "已经打开了该页面!",
                //     duration: 1500,
                //   })
                //   return;
                // }
              todoPath = skipPathObj.leaveBeijingRouter
            }else{
              // let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];//2022-4-8
              //   if(routeId.includes(row.ID)){//2022-4-8
              //     this.$message({
              //       type: "error",
              //       offset: 400,
              //       showClose: true,
              //       message: "已经打开了该页面!",
              //       duration: 1500,
              //     })
              //     return;
              //   }
              todoPath = skipPathObj.todoDetailRouter
            }
          }else{
            if (row.UPDATE_FLAG == '4') {
              todoPath = skipPathObj.doneDetailRouter
              await this.notiUpdata(row) // 通知状态更新
              await this.getTodoList() // 待办事宜
            }else{
              // let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];//2022-4-8
              //   if(routeId.includes(row.ID)){//2022-4-8
              //     this.$message({
              //       type: "error",
              //       offset: 400,
              //       showClose: true,
              //       message: "已经打开了该页面!",
              //       duration: 1500,
              //     })
              //     return;
              //   }
              todoPath = skipPathObj.todoDetailRouter
            }
          }
          if (row.UPDATE_FLAG == '2') {
            await this.notiUpdata(row) // 通知状态更新
            await this.getTodoList() // 待办事宜
           
          }
         
          let routeData = this.$router.resolve(todoPath)
          window.open(routeData.href, '_blank')
        } else{
          if(row.UPDATE_FLAG == '3'){
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            let userType = userInfo.isProxier;
            let username;
            if(userInfo.oa_account){
              username = userInfo.oa_account
            }else{
              username = ''
            } 
            var ws = new WebSocket('ws://localhost:4213');
            ws.addEventListener('error',()=>{
              this.notiUpdata(row) // 通知状态更新
              this.getTodoList() // 待办事宜 
              if(userType == 1){
                window.location.href = 'kylincloudclient://username='
                +localStorage.getItem('LoginName')+
                '&passwd='+localStorage.getItem('Voucher')+
                '&token='+localStorage.getItem('ticket')+
                '&id='+JSON.parse(row.COMMENTS).appId+
                '&url='+JSON.parse(row.COMMENTS).dataUrl
              }else{
                window.location.href = 'kylincloudclient://username='+username+
                '&passwd=&token=&id=&url='
              }
              
            })
            ws.onopen = (event)=>{
              let OBJ;
              if(userType == 1){
                OBJ = {
                  username:localStorage.getItem('LoginName'),
                  passwd:localStorage.getItem('Voucher'),
                  token:localStorage.getItem('ticket'),
                  id:JSON.parse(row.COMMENTS).appId,
                  url:JSON.parse(row.COMMENTS).dataUrl,
                }
              }else{
                OBJ = {
                  username:username,
                  passwd:'',
                  token:'',
                  id:'',
                  url:'',
                }
              }
              ws.send(JSON.stringify(OBJ))
              ws.onmessage=(event)=>{
              }
              ws.onclose=(event)=>{
                this.notiUpdata(row) // 通知状态更新
                this.getTodoList() // 待办事宜
                //isWebSocketSuccess = true;
                // this.$message({
                //   type: "error",
                //   message: "已启动客户端，请勿重复打开客户端",
                //   duration: 1000
                // })
              }
              ws.onerror=()=>{
              }
              ws.close();
            }
          }else if(row.UPDATE_FLAG == '6'){
              let skipPathObj = skipPath(row)
              let todoPath=skipPathObj.completeRouter
              await this.notiUpdata(row) // 通知状态更新
              await this.getTodoList() // 待办事宜
              let routeData = this.$router.resolve(todoPath)
              window.open(routeData.href, '_blank')
          }else if(row.UPDATE_FLAG == '7'){
              let skipPathObj = skipPath(row)
              await this.notiUpdata(row) // 通知状态更新
              await this.getTodoList() // 待办事宜
          }else{
            if(row.UPDATE_FLAG == '1' ) {
                
                //当前数据仅为通知时更新通知状态；
                // await this.notiUpdata(row) // 通知状态更新
                // await this.getTodoList() // 待办事宜
                if(row.DATA_TYPE == 'LSZSQ' || row.DATA_TYPE == 'LSZSQ'|| row.DATA_TYPE =='SEC_BACK'){ //只有两种状态，启用和未起用
                  let skipPathObj = skipPath(row)
                  let todoPath
                  todoPath = skipPathObj.todoDetailRouter//代办
                  // let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];//2022-4-8
                  // if(routeId.includes(row.ID)){//2022-4-8
                  //   this.$message({
                  //     type: "error",
                  //     offset: 400,
                  //     showClose: true,
                  //     message: "已经打开了该页面!",
                  //     duration: 1500,
                  //   })
                  //   return;
                  // }
                  if(row.DATA_TYPE == 'LSZSQ'){
                    await this.notiUpdata(row) // 通知状态更新
                    await this.getTodoList() // 待办事宜
                  }
                  let routeData = this.$router.resolve(todoPath)
                  window.open(routeData.href, '_blank');
                }else{
                  this.dialogVisibleForUpData = true;
                  this.dialogVisibleForUpDataContent = row.TITLE||'注意：此提示将会在首页消失'
                  this.copyRow = row;
                  return
                }
            }else {
              // debugger
              let skipPathObj = skipPath(row)
              let todoPath    
              // UPDATE_FLAG 2 => 点击跳转消失   1 => 不展示  0 => 点击跳转存在
              // 3 => oa2 4 =》和2一样只是跳已办
              if (row.UPDATE_FLAG == '2') {
                todoPath = skipPathObj.todoDetailRouter
                // let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];//2022-4-8
                // if(routeId.includes(row.ID)){//2022-4-8
                //   this.$message({
                //     type: "error",
                //     offset: 400,
                //     showClose: true,
                //     message: "已经打开了该页面!",
                //     duration: 1500,
                //   })
                //   return;
                // }
                //todoPath = skipPathObj.todoDetailRouter
                await this.notiUpdata(row) // 通知状态更新
                await this.getTodoList() // 待办事宜
              }else if(row.UPDATE_FLAG == '4'){
                todoPath = skipPathObj.doneDetailRouter
                if(row&&row.TODO_RECORD_ID){
                  todoPath.query = Object.assign(todoPath.query,{
                    from:'home'
                  })
                }
                //todoPath = skipPathObj.todoDetailRouter
                await this.notiUpdata(row) // 通知状态更新
                await this.getTodoList() // 待办事宜
              } else {
                if (row.DATA_TYPE == 'D_LDPS') row['id'] = row.ID
                let skipPathObj = skipPath(row)
                todoPath = skipPathObj.todoDetailRouter
                // let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];//2022-4-8
                // if(routeId.includes(row.ID)){//2022-4-8
                //   this.$message({
                //     type: "error",
                //     offset: 400,
                //     showClose: true,
                //     message: "已经打开了该页面!",
                //     duration: 1500,
                //   })
                //   return;
                // }
              }
              let routeData = this.$router.resolve(todoPath)
              window.open(routeData.href, '_blank')
            }
          }
        } 
    },
    // 发文公告弹窗 - 正文标题
    drafting(state) {
      let that = this
      if(state == 0){
        // this.getFileInfo(that).then((res)=>{
        //   if(res.state){
        //     this.doDraft(res,'','2')
        //   }
        // })
        // this.zhengWenState = state
        this.viewDraftFile(this.ggData.fileName, this.ggData.filePath, this.$businessCode.fawglfj,this.ggData.title,this.ggData.documentNo)
      }else{
        this.getFileInfo(that).then((res)=>{
          if(res.state){
            this.doDraft1(res)
          }
        })
      }
    },
    // 部门信息正文跳转
     doDraft1(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          id:this.bank_dispach.id,
          zhengWenState:0,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          saveSpecialFileName:this.ggData.documentNo + this.ggData.title,
          pageFlag:'fawen'
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    //正文跳转
    doDraft(fileInfo,saveName,type) {
      let openPath = getMachineType() ? '/openAndSave_Word' : 'openAndSave_Wps'
      let data = ''
      let fileConfig = fileInfo;
      if(type == 2){
        // data = this.$router.resolve({
        //   path: "/openAndSave_Word",
        //   query: {
        //     state: 'viewFile',
        //     id:this.bank_dispach.id,
        //     zhengWenState:0,
        //     JYcode: this.$businessCode.fawglfj,
        //     flowTranId: this.$businessCode.fawglfj,
        //     relativePath:fileInfo?fileInfo.filePath:'',
        //     fileName:fileInfo?fileInfo.fileName:'',
        //     tmpFileName:fileInfo?fileInfo.fileNameTh:'',
        //     tmpFilePath:fileInfo?fileInfo.filePathTh:'',
        //     isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
        //     saveSpecialFileName:this.ggData.documentNo + this.ggData.title,
        //     pageFlag:'fawen'
        //   }
        // });
        this.viewDraftFile(fileInfo.fileName,fileInfo.filePath,this.$businessCode.fawglfj,this.ggData.title,this.ggData.documentNo)
      }else{
        data = this.$router.resolve({
        path: openPath,
        query: {
          state: 'viewFile',
          id: this.ggData.fawenId,
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileConfig ? fileConfig.filePath : '',
          fileName: fileConfig ? fileConfig.fileName : '',
          tmpFileName: fileConfig ? fileConfig.fileNameTh : '',
          tmpFilePath: fileConfig ? fileConfig.filePathTh : '',
          isHasRedHead: fileConfig && fileConfig.fileNameTh ? true : false,
          taoHongFlag: fileConfig && fileConfig.fileNameTh ? true : false,
          pageFlag: 'fawen',
          showBtns: this.zhengWenState == 0 ? false : true,
          processInstId: this.fromdata.processInstId,
          stepsNowName: this.fromdata.currentNode,
          saveSpecialFileName:saveName,
        },
      })
      }
      
      this.$forceUpdate()
      window.open(data.href, '_blank')
    },
    // 下载文件
    downFile1(file) {
      this.bank_doDownloadFile.fileName = file.fileName
      this.bank_doDownloadFile.filePath = file.filePath
      this.$post
        .postData(
          'doDownloadFile',
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then((res) => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState() ? location.origin : 'http://localhost:8080') +
                  '/ecpweb/getLocalFile.action?relativePath=' +
                  res.filePath +
                  '&fileName=' +
                  res.fileName,
                file.fileName
              )
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                offset: 400,
                message: '下载失败',
                duration: 500,
              })
            }
          }
        })
    },
    // 获取下载file信息
    async getFileInfo(self, thInfo) {
      console.log(self, thInfo)
      var successInfo = { state: false }
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.ggData.title;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.ggData.filePath;
      await self.$post
        .postData(
          'doDownloadFile',
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fawglfj
        )
        .then((res) => {
          if (res && res.success) {
            if (thInfo) {
              successInfo.filePath = thInfo.filePath
              successInfo.fileName = thInfo.fileName
              successInfo.filePathTh = res.filePath
              successInfo.fileNameTh = res.fileName
            } else {
              successInfo.filePath = res.filePath
              successInfo.fileName = res.fileName
            }

            successInfo.state = true
          } else {
            self.$message({
              type: 'error',
              offset: 400,
              showClose: true,
              message: '正文不存在',
              duration: 500,
            })
          }
        })
        .catch((erro) => {
          self.$message({
            type: 'error',
            offset: 400,
            showClose: true,
            message: '获取失败',
            duration: 500,
          })
          successInfo.state = false
        })
      return successInfo
    },
    // 公文退回 - 效率提醒
    getTotalTWCF() {
      let bank_tw = {
        function: 'orderRemind',
      }
      this.$post
        .postData(
          'orderRemind',
          JSON.stringify(bank_tw),
          this.$businessCode.dbgl
        )
        .then((res) => {
          this.TWNumber = res.data.backCount;
          this.FWNumber = res.data.againCount;
        })
    },
    // 公文重发 - 效率提醒
    getTotalCF() {
      // let bank_tw = {
      //   function: 'findAllBackOrder',
      //   backTime: this.currentYear,
      // }
      // this.$post
      //   .postData(
      //     'findAllBackOrder',
      //     JSON.stringify(Object.assign(bank_tw, this.pagination)),
      //     this.$businessCode.fawgl
      //   )
      //   .then((res) => {
      //     this.TWNumber = res.data.total
      //   })
      // let bank_cf = {
      //   function: 'getAgainOrderList',
      //   applyDate: this.currentYear,
      //   state: '0',
      // }
      // this.$post
      //   .postData(
      //     'getAgainOrderList',
      //     JSON.stringify(Object.assign(bank_cf, this.pagination)),
      //     this.$businessCode.fawgl
      //   )
      //   .then((res) => {
      //     this.FWNumber = res.data.total
      //   })
    },
    //获取个人时间排序
    getOrderByTime(){
      this.$post.postData(
          'getHomeOrder',
          JSON.stringify(
            {
              function:"getHomeOrder"
            }
          ),
          this.$businessCode.dbgl
        )
        .then((res) => {
          if(res&&res.success){
            this.orderByTime = res.data;
          }
        })
    },
    //设置时间排序
    setNewOrderByTime(){
      this.orderByTime =this.orderByTime == '0' ? '1':'0';
      this.$post.postData(
          'setHomeOrder',
          JSON.stringify(
            {
              function:"setHomeOrder",
              state:this.orderByTime
            }
          ),
          this.$businessCode.dbgl
        )
        .then((res) => {
          if(res&&res.success){
            this.getTodoList();
          }
        })
    },
    // 公文重发 - 效率提醒
    // getTotalCF() {
    //   // let bank_cf = {
    //   //   function: 'getAgainOrderList',
    //   //   applyDate: this.currentYear,
    //   //   state: '0',
    //   // }
    //   // this.$post
    //   //   .postData(
    //   //     'getAgainOrderList',
    //   //     JSON.stringify(Object.assign(bank_cf, this.pagination)),
    //   //     this.$businessCode.fawgl
    //   //   )
    //   //   .then((res) => {
    //   //     this.FWNumber = res.data.total
    //   //   })
    // },
    // 弹窗配置api
    getDialogInfo() {
      this.$api.meeting.perOfficeDialog({}).then((res) => {
        console.log(res,'22')
        localStorage.setItem('firstLogin', 0)
        if (!res.data.length && !res.data2.length) return
        let d =  res.data2[0] || res.data[0]
        console.log(d,'dddd1111')
        this.setDialogVisible = d.isRun == '1'? true : false
        this.setDialogWidth = Number(d.width)
        this.setDialogHeight = Number(d.height)
        this.setDialogTop = Number(d.tops)
        this.setDialogLeft = Number(d.lefts)
        this.setDialogTitle = d.title
        // this.setDialogContent = d.message
        // or v-html
        this.setDialogContent = d.message.replace(/\n/gm, '<br/>')
        // 窗口不可超出页面
        let [w, h, l, t] = [
          this.setDialogWidth,
          this.setDialogHeight,
          this.setDialogLeft,
          this.setDialogTop,
        ]
        this.setDialogLeft = compareSum([l, w], 100) ? 100 - w : this.setDialogLeft
        this.setDialogTop = compareSum([t, h], 100) ? 100 - h : this.setDialogTop
        // get attachLabel info
        this.setAttachLabel = d.attachLabel
        this.$api.setSysConfig.getTextemList({ id: d.id }).then((res) => {
          this.setAttachLabelFiles = res.data
          this.$forceUpdate()
        })
        // this.setAttachLabel = '1'
        // this.setAttachLabelFiles = [
        //     {fileName:"Test.docxTest.docxTest.docxTest.docx", filePath:"/home/nas/p8Files/2021/1/25/1110240NA1611557631073825.docx", createTime: "2021-01-25 14:53:57"},
        //     {fileName:"DB.txt", filePath:"/home/nas/p8Files/2021/1/25/1110240NA1611557621073784.txt", createTime: "2021-01-25 14:53:48"}
        //   ]
      })
    },
    // 团队公告弹窗关闭
    cancelNotice() {
      this.addNoticeform = {}
      this.showTeamNotice = false
    },
    downFileTSXX(file){
      let bank_doDownloadFile = {
        function: "doDownloadFile",
        fileName: "",
        filePath:""
      };
       this.$post
        .postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), this.$businessCode.swglfj)
        .then(res => {
          if (res) {
              if (res && res.success) {
                location.href =
                (this.$post.getEnvState()?location.origin:"http://localhost:8080")+"/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +
                res.fileName;
              }else{
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
    goToDo(){
      window.location.href = "#/todolist?isWcl=1&overTodoDays="+this.overTodoDays
    },
  },
  created() {
    let userRole = JSON.parse(localStorage.getItem('tcHumanRole'))||[];
    userRole.forEach((i)=>{
      if(i.dicId == '337'){
        setInterval(()=>{
          if(localStorage.getItem("isHome") == '1'){
            window.location.reload();
          }
        },120000)
      }
    })
    // 一人多部门
    let transArr =
      (localStorage.getItem('unitInfo') && JSON.parse(localStorage.getItem('unitInfo'))) || []
    if (transArr.length > 0) {
      transArr.forEach((element) => {
        if (element.firstUnitName != element.currUnitName) {
          element.currUnitName = element.firstUnitName + '/' + element.currUnitName
        }
      })
    }
    let userInfo =
      (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))) || ''
    this.curhumanId = userInfo.humanId
    if (transArr.length > 1) {
      transArr.forEach((element) => {
        if (element.unitId == userInfo.unitId) {
          this.deptArr.push(element)
        }
      })
      let curDept = JSON.parse(localStorage.getItem('userInfo')).humanId
      this.deptArr.forEach((element) => {
        if (element.humanId == curDept) {
          this.bank_chosDept.deptName = element.humanId
        }
      })
    }
    this.bank_countersignature.draftOrganId = userInfo.firstUnitId
    this.currentYear = new Date().getFullYear()
    // this.openTuanDui(11)
    this.getCommonMenus()
    this.getFWGGList()
    this.getTodoList()
    this.getBHXXList()
    this.getDeptInfoList()
    this.getOverDays()
    this.getHumanRole()
    this.handleMock()
    this.getReadList()
    this.getTotalTWCF()
    this.getOrderByTime()
    this.getTextList()
  },
  mounted() {
    let firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin == 1) {
      this.getDialogInfo()
    }
    document.title="首页"
  },
}
</script>

<style lang="less" scoped>
.command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;
    }
/deep/.command_file .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }
 
.command_file .down {
      cursor: pointer;
      position: initial;
    }
.command_file .down:hover {
      color: #3b85ef;
    }
.command_file  .btns {
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
      text-align: right;
    }
.home-content {
  font-size: 12px;
  .activeC {
    color: #409eff;
  }
  .dispatch_w {
    /deep/ .el-card__body {
      height: 260px;
    }
  }
  .card-title {
    display: inline-block;
    color: #409eff;
    font-weight: 900;
    font-size: 14px;
  }
  .redTip {
    display: inline-block;
    padding-left: 30px;
    color: #ff464f;
    font-weight: 500;
    font-size: 14px;
  }
  .text-align-right {
    text-align: right;
  }
  .btn_more {
    font-size: 12px;
    color: #409eff;
  }
  .home-con-card {
    height: 110px;
    overflow: hidden;
    .card-set {
      cursor: pointer;
      display: inline-block;
      width: 100%;
      text-align: right;
      font-size: 12px;
      color: #999;
      // a:hover {
      //   color: #999;
      // }
    }
    .home-top-line {
      text-align: center;
      margin-top: 10px;
      font-size: 12px;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        border: 1px dashed #fff;
      }
      a:hover {
        color: #409eff;
        //border: 1px dashed #409eff;
      }
      i {
        font-size: 30px;
        line-height: 40px;
      }
      .icon-doc {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #409eff;
        border-radius: 10px;
        margin-right: 5px;
        float: left;
      }
      .btn_w130 {
        width: 90%;
        padding: 3px 5%;
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .home-top-cnto {
      text-align: center;
      margin-top: 5px;
      .count-to-untr,
      .count-to-back,
      .count-to-resd {
        display: block;
        font-size: 30px;
        font-weight: bold;
      }
      .count-to-untr {
        color: #409eff;
      }
      .count-to-back {
        color: #ff464f;
      }
      .count-to-resd {
        color: #e7721c;
      }
      span {
        font-size: 10px;
        color: #999;
        b {
          color: red;
        }
      }
    }
  }
  .home-middle-line {
    font-size: 12px;
    cursor: pointer;
    button {
      margin-left: 10px;
    }
    .el-button--mini,
    .el-button--mini.is-round {
      padding: 3px 10px !important;
    }
  }
  .opendraft {
    color: #409eff;
    cursor: pointer;
  }
  /deep/.el-card__body {
    padding-top: 11px !important;
  }
  .home-top-line>a{
    color:#000;
  }
  /deep/ .mrg-b-20{
    margin-bottom:1px !important;
  }
}
/deep/.el-table .warning-row {
  color: red;
}
/deep/.el-table .warning-cell {
  color: blue;
}
/deep/.el-table--medium td, .el-table--medium th {
  padding: 3px 0;
}
</style>
