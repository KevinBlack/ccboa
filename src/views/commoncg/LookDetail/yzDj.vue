
<template>
  <div class="sealRegisterForm">
    <div class="headerClick">
      <div class="right">
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item, index) in headerBtnList"
          @click="headerBtnClick(item)"
          :key="index"
          plain
        >{{ item }}</el-button>
        <el-button
          v-if="!Isweihu"
          @click="headerBtnClick('引入印模')"
          class="bank_grid_comtent_active"
        >引入印模</el-button>
      </div>
    </div>
    <div id="jbxx" class="height_90"></div>
    <div class="shiwuTitle">
      <div class>{{ unitName }}印章登记单</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="{active: active== '#jbxx'}"
          @click="toTarget('#jbxx')"
        >基本信息</a>
        <a
          href="javascript:void(0);"
          :class="{active: active== '#zfqk'}"
          @click="toTarget('#zfqk')"
        >制发情况</a>
        <a
          href="javascript:void(0);"
          :class="active == '#syqk' ? 'active' : ''"
          @click="toTarget('#syqk')"
        >使用情况</a>
        <a
          href="javascript:void(0);"
          :class="active == '#fzqk' ? 'active' : ''"
          @click="toTarget('#fzqk')"
        >废止情况</a>
        <a
          href="javascript:void(0);"
          :class="active == '#xhqk' ? 'active' : ''"
          @click="toTarget('#xhqk')"
        >销毁情况</a>
        <a
          href="javascript:void(0);"
          :class="active == '#yrym' ? 'active' : ''"
          @click="toTarget('#yrym')"
        >引入印模</a>
      </div>
      <h6 class="bank_dispach_file_tit">基本信息</h6>
      <el-form ref="form" :model="form" label-width="120px" class="registerForm-mainform">
        <el-row>
          <el-col :span="12">
            <el-form-item label="印章名称" prop="sealName">
              <el-input v-model="form.sealName" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="印章简称">
              <el-input v-model="form.yzJiancheng" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="印章类别" prop="yzType">
              <el-select
                v-model="form.yzType"
                placeholder="请选择"
                style="width: 100%"
                :disabled="Isweihu"
              >
                <el-option v-for="item in sealTypes" :key="item.index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保管使用部门" prop="sdeptShow">
              <!-- <select-org-or-dept @select="selectKepOrg"> -->
              <el-input
                @focus="selectRcvChkOrg('保管使用部门')"
                type="text"
                :readonly="true"
                :disabled="Isweihu"
                placeholder="请选择保管使用部门"
                v-model="form.sdeptShow"
                suffix-icon="el-icon-arrow-down"
              />
              <!-- </select-org-or-dept> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="制发机构" prop="issJg">
              <!-- <select-org-or-dept @select="selectRcvChkOrg"> -->
              <el-input
                @focus="selectRcvChkOrg('制发机构')"
                type="text"
                :readonly="true"
                :disabled="Isweihu"
                placeholder="请选择制发机构"
                v-model="form.issJg"
                suffix-icon="el-icon-arrow-down"
              />
              <!-- </select-org-or-dept> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用机构" prop="userJg">
              <el-input
                @focus="selectRcvChkOrg('使用机构')"
                type="text"
                :readonly="true"
                :disabled="Isweihu"
                placeholder="请选择使用机构"
                suffix-icon="el-icon-arrow-down"
                v-model="form.userJg"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div id="zfqk" class="height_90"></div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="印章状态" prop="sealStatus">
              <el-radio-group
                v-model="form.sealStatus"
                @change="selectStmpStCd"
                :disabled="Isweihu"
              >
                <el-radio
                  v-for="item in allSealStatus"
                  :key="item.value"
                  :label="item.value"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="序号" prop="markNo">
              <el-input v-model="form.markNo" @change="stmpBsnClIDChg" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h6 class="bank_dispach_file_tit">制发情况</h6>
        <el-form-item label="印章刻制单位（刻章厂）" prop="sealCh">
          <el-input v-model="form.sealCh" :disabled="Isweihu"></el-input>
        </el-form-item>
        <el-form-item label="批准刻制单位（公安部门）" prop="sealGa">
          <el-input v-model="form.sealGa" :disabled="Isweihu"></el-input>
        </el-form-item>
        <el-form-item label="领用人">
          <el-input v-model="form.getSealP" :disabled="Isweihu"></el-input>
          <!--
                    <el-select  v-model="form.Stmp_Engr_Rcv_Psn_ID" placeholder="请选择"  style="width:100%">
                                <el-option v-for="item in RcvPsn"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                    </el-select>
          -->
        </el-form-item>
        <div id="syqk" class="height_90"></div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="启用文号">
              <el-input v-model="form.sendBase" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启用日期" prop="useDate" :disabled="Isweihu">
              <el-date-picker
                type="date"
                placeholder="请选择日期"
                v-model="form.useDate"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <h6 class="bank_dispach_file_tit">使用情况</h6>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否存放到用印机器中">
              <el-radio-group v-model="form.isLocate" @change="bndgTpcdChange" :disabled="Isweihu">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="EqmtMftrNm_isShow">
            <el-form-item label="印章设备名称">
              <!--<el-input   v-model="form.deviceNameBak"></el-input>-->
              <el-select
                :disabled="Isweihu"
                v-model="form.deviceNameBak"
                placeholder="请选择"
                style="width: 100%"
                @change="setMachineInfo"
              >
                <el-option
                  v-for="(item, index) in sealMachines"
                  :key="index"
                  :label="item.title"
                  :value="item.title"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="EqmtMftrNm_isShow">
            <el-form-item label="印章设备型号">
              <el-input v-model="form.deviceSpnoBak" :readonly="true" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="印章设备编号" v-if="EqmtMftrNm_isShow">
              <el-input v-model="form.deviceNoBak2" :readonly="true" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="印章在用印机中的位置" v-if="EqmtMftrNm_isShow">
              <el-radio-group v-model="form.storeMark" @change="getRfid" :disabled="Isweihu">
                <el-radio key="1" label="1">1</el-radio>
                <el-radio key="2" label="2">2</el-radio>
                <el-radio key="3" label="3">3</el-radio>
                <el-radio key="4" label="4">4</el-radio>
                <el-radio key="5" label="5">5</el-radio>
                <el-radio key="6" label="6">6</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="RFID标签" v-if="EqmtMftrNm_isShow" prop="rpidFlag">
              <el-input v-model="form.rpidFlag" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="StorePlcCd_isShow">
            <el-form-item label="印章存放地点">
              <el-input v-model="form.speace" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="印章保管人A1角" prop="sealPersonA1">
              <el-select
                v-model="form.sealPersonA1"
                placeholder="请选择"
                style="width: 100%"
                clearable
                :disabled="Isweihu"
                @change="getA1Nm"
              >
                <el-option
                  v-for="item in sealKeepers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <!--<el-input v-model="form.sealPersonA1id" @change="getA1Nm"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="印章保管人A2角" prop="sealPersonA2">
              <el-select
                v-model="form.sealPersonA2"
                placeholder="请选择"
                clearable
                :disabled="Isweihu"
                style="width: 100%"
                @change="getA2Nm"
              >
                <el-option
                  v-for="item in sealKeepers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <!--<el-input v-model="form.sealPersonA2id" @change="getA2Nm"></el-input>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="印章保管人B1角" prop="sealPersonB1">
              <el-select
                v-model="form.sealPersonB1"
                placeholder="请选择"
                clearable
                :disabled="Isweihu"
                style="width: 100%"
                @change="getB1Nm"
              >
                <el-option
                  v-for="item in sealKeepers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <!--<el-input v-model="form.sealPersonB1id"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="印章保管人B2角" prop="sealPersonB2">
              <el-select
                v-model="form.sealPersonB2"
                placeholder="请选择"
                clearable
                :disabled="Isweihu"
                style="width: 100%"
                @change="getB2Nm"
              >
                <el-option
                  v-for="item in sealKeepers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <!-- <el-input v-model="form.sealPersonB2id"></el-input>-->
            </el-form-item>
          </el-col>
        </el-row>
        <div id="fzqk" class="height_90"></div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际保管人1">
              <el-input v-model="form.sealPersonC1" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际保管人2">
              <el-input v-model="form.sealPersonC2" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h6 class="bank_dispach_file_tit">废止情况</h6>
        <el-row>
          <el-col :span="12">
            <el-form-item label="废止日期">
              <el-date-picker
                :disabled="Isweihu"
                type="date"
                placeholder="请选择日期"
                v-model="form.desDate"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收回人" prop="returnPer">
              <el-input v-model="form.returnPer" :disabled="Isweihu"></el-input>
              <!--
                            <el-select :disabled="this.stmpEnable" v-model="form.Stmp_Rcv_Psn_ID" placeholder="请选择" multiple :multiple-limit="2"

                            style="width:100%">
                                <el-option v-for="item in RcvPsn"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
              -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="废止原因" prop="desCause">
              <el-input v-model="form.desCause" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="交回人" prop="jiaoPer">
              <el-input v-model="form.jiaoPer" :disabled="Isweihu"></el-input>
              <!--
                            <el-select :disabled="this.stmpEnable" v-model="form.Stmp_HandIn_Psn_ID" placeholder="请选择" multiple  style="width:100%">
                                <el-option v-for="(item,index) in HandInPsn"
                                :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
              -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交回日期">
              <el-date-picker
                :disabled="Isweihu"
                type="date"
                placeholder="请选择日期"
                v-model="form.jiaoDate"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div id="xhqk" class="height_90"></div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="保管部门">
              <el-input v-model="form.safeDept" :disabled="Isweihu"></el-input>
              <!--
                            <select-org-or-dept @select="selectAplyAprvDstOrg" :disabled="this.stmpEnable">
                            <el-input
                                type="text"
                                readonly
                                placeholder="请选择保管部门"
                                v-model="form.safeDept"
                                suffix-icon="el-icon-arrow-down"
                            />
                            </select-org-or-dept>
              -->
            </el-form-item>
          </el-col>
        </el-row>
        <h6 class="bank_dispach_file_tit">销毁情况</h6>
        <el-row>
          <el-col :span="24">
            <el-form-item label="销毁日期">
              <el-date-picker
                :disabled="Isweihu"
                type="date"
                placeholder="请选择日期"
                v-model="form.desDate1"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="销毁原因" prop="desCause1">
              <el-input :disabled="Isweihu" v-model="form.desCause1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="销毁人" prop="desPer1">
              <el-input v-model="form.desPer1" :disabled="Isweihu"></el-input>
              <!--
                            <el-select :disabled="this.stmpEnable" v-model="form.Stmp_Destory_Psn_ID" placeholder="请选择" multiple :multiple-limit="2" style="width:100%">
                                <el-option v-for="item in RcvPsn"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
              -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监销人" prop="desPer2">
              <el-input v-model="form.desPer2" :disabled="Isweihu"></el-input>
              <!--
                            <el-select :disabled="this.stmpEnable" v-model="form.Stmp_Chk_Destory_Psn_ID" placeholder="请选择" multiple :multiple-limit="2" style="width:100%">
                                <el-option v-for="item in RcvPsn"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
              -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" :disabled="Isweihu"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div id="yrym" class="height_90"></div>
        <h6 class="bank_dispach_file_tit">修改记录</h6>
        <el-row>
          <el-col :span="22" :push="2">
            <m-table
              @refresh="loadTableData()"
              @cellClick="cellClick"
              size="medium"
              :tableData="tableData"
              :tableCols="allTableCols"
              :pagination="pagination"
              :isPagination="false"
              :isSelection="false"
            ></m-table>
          </el-col>
        </el-row>
        <h6 class="bank_dispach_file_tit">引入印模</h6>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-row v-if="form.attchmentFileInfo && form.attchmentFileInfo.length">
                <el-form-item>
                  <el-col :span="24">
                    <div
                      class="tree_w"
                      v-if="
                        form.attchmentFileInfo && form.attchmentFileInfo.length
                      "
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item, index) in form.attchmentFileInfo"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{ index + 1 }}.</span>
                              <span
                                class="name down"
                                :title="item.fileName"
                                @click="viewFile(item,null,item.fileName)"
                              >
                                {{
                                item.fileName
                                }}
                              </span>
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
                                  :disabled="
                                    index == form.attchmentFileInfo.length - 1
                                  "
                                  round
                                >下移</el-button>
                                <el-button
                                  type="warning"
                                  size="mini"
                                  @click.native="deleteRow(index, item.id)"
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
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-row v-if="pointCodePath && pointCodePath.length">
                <el-form-item>
                  <el-col :span="24">
                    <div
                      style="display: flex"
                      class="one"
                      v-if="
                        pointCodePath && pointCodePath.length
                      "
                    >
                      <div
                        style="width:100px;height:100px;border:1px solid #f40"
                        v-for="item in pointCodePath"
                        :key="item.id"
                        class="two"
                      >
                        <img style="width:100%;height:100%;" :title="item.fileName" :src="item.filePath" />
                      </div>
                    </div>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
    </div>

    <!-- 引入印模弹窗 -->
    <el-dialog
      title="上传印模图片"
      :visible.sync="selOrgTypeDialog"
      :before-close="selOrgTypeDialogClose"
    >
      <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
      <div slot="footer"></div>
    </el-dialog>
    <!-- 制发机构 -->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :seletSelf="seletSelf"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    <!-- 上传组件 -->
    <!-- <upload-file-to-p9
      :startWork="upFileConfig.start"
      :info="upFileConfig.info"
      :whiteList="upFileConfig.whiteList"
      :maxFileSize="upFileConfig.maxFileSize"
      @result="handlerFileP9Val"
    ></upload-file-to-p9>-->
  </div>
</template>
<script>
import orgTree from "components/tree/orgTree";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import sealDeviceMixins from "views/sealManage/mixins/index.js";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";

// 导入通用表格
import mTable from "@/components/table/tTable";
// 导入上传文件到P9组件
// import uploadFileToP9 from "@/components/uploadFile/uploadFileToP9";
import viewDraft from "@/minixs/viewDraft";
import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "sealRegister",
  components: {
    orgTree,
    selectOrgOrDept,
    mTable,
    uploadFileTs
    // "upload-file-to-p9": uploadFileToP9
  },

  mixins: [sealDeviceMixins, openOrDownLoadFile,draftMuban,viewDraft,dispatchIndex,isNowUser],
  data: function data() {
    return {
      Isweihu: true,
      selOrgTypeDialog: false,
      //单位名称
      unitName: JSON.parse(localStorage.userInfo).unitName,
      headerBtnList: ["关闭", "保存", "删除此文", "收藏", "维护"],
      //印章种类
      sealTypes: [],
      attTitleID: [],
      pointCodePath: "", // 印模图片路径
      //印章状态
      allSealStatus: [
        { label: "未启用", value: "A01" },
        { label: "启用", value: "A02" },
        { label: "废止", value: "A03" },
        { label: "销毁", value: "A04" },
        { label: "实物档案", value: "A05" }
      ],
      uploadConfig: {
        formId: "yinzhang",
        filesHas: [],
        isSpecial: 0,
        id: "",
        fileType: true
      },
      //印章状态控制，废止、销毁、归档这三个状态修改时，不可更改印章状态，
      statusDisabled: false,
      //印章保管人
      //sealKeepers:[{label:"张志兴",value:"65928091"},{label:"钱培民",value:"86535539"},{label:"古晓燕",value:"69028930"},{label:"叶成",value:"82687611"},{label:"蒋冬梅",value:"37696703"}],
      sealKeepers: [],
      //修改标记
      update: false,
      //设备列表
      sealMachines: [],
      //所用的RFID
      allRFID: {},
      //印章状态为未启用或启用时，禁止废止与销毁情况输入资料标记
      stmpEnable: false,
      showOrgTree: false,
      title: "",
      seletSelf: 1, //机构树
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      draftOrganId: "",
      active: "#jbxx",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      //修改记录表格数据
      tableData: [],
      //印章设备名称栏位是否显示
      EqmtMftrNm_isShow: true,
      //印章存放地点
      StorePlcCd_isShow: false,
      //表格字段
      allTableCols: [
        { label: "修改人", prop: "name" },
        { label: "修改时间", prop: "time" }
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 10
      },
      //文件上传参数
      // upFileConfig: {
      //   list: [], // 已经上传的文件。对象数组{fileName:xx, fileUrl:xx, p9Id:xx}
      //   start: false, // 启动上传附件组件
      //   info: "", // 上传附件提示信息
      //   maxFileSize: 30 * 1024 * 1024, // 上传文件的最大值，单位为字节，默认为30M
      //   whiteList: [
      //     "zip",
      //     "rar",
      //     "pdf",
      //     "xlxs",
      //     "xls",
      //     "doc",
      //     "docx",
      //     "txt",
      //     "jpg"
      //   ] // 允许上传文件的类型
      // },
      form: {
        // Mnplt_TpCd: "", //操作类型
        Stmp_Inlz_Bsn_ID: "", //印章初始化业务编号
        // Stmp_ECD: "", //印章编码
        sealName: "", // 印章名称
        yzJiancheng: "", // 印章简称
        yzType: "", // 印章类别
        sdeptShowId: "", // 保管使用部门
        sdeptShow: "", // 保管使用部门名称
        issJgId: "", // 制发机构
        issJg: "", // 制发机构名称
        useJgId: "", // 使用机构
        userJg: "", // 使用机构名称
        sealStatus: "", // 印章状态
        markNo: "", // 序号
        sealCh: "", // 刻制单位
        sealGa: "", // 批准刻制单位
        getSealP: "", // 领用人名称
        sendBase: "", // 启用文号
        useDate: "", // 启用日期
        isLocate: "1", // 是否存放到用印机器中,默认值 --是
        deviceNameBak: "", // 印章设备名称
        deviceSpnoBak: "", // 印章设备型号
        deviceNoBak: "", // 印章设备编号
        deviceNoBak2: "", // 印章设备编号
        storeMark: "", //印章在用印机中的位置
        rpidFlag: "", //RFID标签
        speace: "", //印章存放地点
        sealPersonA1id: "", //印章保管人A1角
        sealPersonA1: "", //印章保管人A1角名称
        sealPersonA2id: "", //印章保管人A2角
        sealPersonA2: "", //印章保管人A2角名称
        sealPersonB1id: "", //印章保管人B1角
        sealPersonB1: "", //印章保管人B1角名称
        sealPersonB2id: "", //印章保管人B2角
        sealPersonB2: "", //印章保管人B2角名称
        sealPersonC1id: "", //实际保管人1
        sealPersonC1: "", //实际保管人1名称
        sealPersonC2id: "", //实际保管人2
        sealPersonC2: "", //实际保管人2名称
        // Seal_Pic_P9_File_Rte: "", //P9ID
        //废止情况
        desDate: "", //废止日期
        returnPer: "", //收回人Nm
        desCause: "", //废止原因
        jiaoPer: "", //交回人Nm
        jiaoDate: "", //交回日期
        safeDept: "", //保管部门名称
        //销毁情况
        desDate1: "", //销毁日期
        desCause1: "", //销毁原因
        desPer1: "", //销毁人NM
        desPer2: "", //监销人Nm
        remark: "", //备注
        attchmentFileInfo: "", //附件
        attach: ""
      },
      id: ""
      //   rules: {
      //     sealName: [
      //       { required: true, message: "请输入印章名称", trigger: "blur" }
      //     ],
      //     yzType: [
      //       { required: true, message: "请选择印章类别", trigger: "change" }
      //     ],
      //     rpidFlag: [{ required: true, message: "RFID为空", trigger: "change" }],
      //     sdeptShow: [
      //       {
      //         required: true,
      //         message: "请选择印章保管使用部门",
      //         trigger: "change"
      //       }
      //     ],
      //     // issJg: [
      //     //   { required: true, message: "请选择印章制发机构", trigger: "change" }
      //     // ],
      //     userJg: [
      //       { required: true, message: "请输入使用机构", trigger: "change" }
      //     ],
      //     sealStatus: [
      //       { required: true, message: "请选择印章状态", trigger: "change" }
      //     ],
      //     sealCh: [
      //       { required: true, message: "请输入印章刻制单位", trigger: "blur" }
      //     ],
      //     sealGa: [
      //       { required: true, message: "请输入批准刻制单位", trigger: "blur" }
      //     ],
      //     useDate: [
      //       { required: true, message: "请选择启用日期", trigger: "change" }
      //     ],
      //     markNo: [
      //       { required: true, message: "请输入序号", trigger: "blur" },
      //       { min: 1, max: 3, message: "请输入3位数字", trigger: "blur" }
      //     ]
      //     // sealPersonA1id: [
      //     //   { required: true, message: "请选择印章保管人A1角", trigger: "change" }
      //     // ],
      //     // sealPersonA2id: [
      //     //   { required: true, message: "请选择印章保管人A2角", trigger: "change" }
      //     // ],
      //     // sealPersonB1id: [
      //     //   { required: true, message: "请选择印章保管人B1角", trigger: "change" }
      //     // ],
      //     // sealPersonB2id: [
      //     //   { required: true, message: "请选择印章保管人B2角", trigger: "change" }
      //     // ]
      //   }
    };
  },
  computed: {},
  mounted: function() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_jbxx = document.querySelector("#jbxx").offsetTop;
    this.distance_zfqk = document.querySelector("#zfqk").offsetTop;
    this.distance_syqk = document.querySelector("#syqk").offsetTop;
    this.distance_fzqk = document.querySelector("#fzqk").offsetTop;
    this.distance_xhqk = document.querySelector("#xhqk").offsetTop;
    this.distance_yrym = document.querySelector("#yrym").offsetTop;
    this.$nextTick(() => {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
    //将登录人员的12位机构号转为9位并存储到localStorage里
    this.$sealUtil.setUnitSyncCodeToLocalStorage(this);
    //修改先查询出相关数据
    // console.log("修改参数", this.$route);
  },

  methods: {
    selOrgTypeDialogClose() {
      this.selOrgTypeDialog = false;
    },
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.form.attachid,
          fileType: "0"
        })
        .then(res => {});
    },

    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
        console.log(res, "详情返回附件");
        this.$nextTick(() => {
          this.$set(this.form, "attchmentFileInfo", res.data);
          this.$set(this.uploadConfig, "filesHas", res.data);
        });
        console.log(
          this.form.attchmentFileInfo,
          'this.form, "attchmentFileInfo"'
        );

        var host = window.location.host;
        console.log(host, "host");
        let fileLists = JSON.parse(JSON.stringify(res.data));
        fileLists.map(item => {
          this.as(item);
          console.log(this.as(item), "不行啊");
          console.log(item, "item");
          item.filePath =
            "http://" +
            "10.239.6.96:8080" +
            "/ecpweb/getLocalFile.action?relativePath=" +
            item.filePath +
            "&fileName=" +
            item.fileName;
        });
        this.pointCodePath = fileLists;
        console.log(this.pointCodePath, "pointCodePath", fileLists);
      });
    },
    as(file) {
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
          console.log(res, "附件数据检验1314520");
          file.filePath =
            "http://" +
            "10.239.6.96:8080" +
            "/ecpweb/getLocalFile.action?relativePath=" +
            res.filePath +
            "&fileName=" +
            res.fileName;
          //   let Obj = {'fileName':res.fileName,'filePath':res.filePath}
          //     return Obj
        });
    },
    //模板块
    fileList(files) {
      console.log(files, "附件返回");
      //files浏览本地文件时候能获取到文件名称
      if (this.form.attchmentFileInfo && this.form.attchmentFileInfo.length) {
        this.form.attchmentFileInfo.push(...files);
      } else {
        this.form.attchmentFileInfo = files;
      }

      files.forEach(item => {
        this.attTitleID.push(item.id);
      });
      this.uploadConfig.filesHas = files;
      this.form.attach = this.attTitleID.join(",");
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
    getFormData() {
      this.uploadConfig.id = this.id;
      //印章登记详情
      this.$api.sealManage.sealRegisterForm
        .doSelectByld({ id: this.id })
        .then(res => {
          console.log(res, "印章登记详情");
          if (res.markRegMainOrderDo) {
            console.log(
              res.markRegMainOrderDo.yzType,
              "res.markRegMainOrderDo.yzType"
            );
            this.form = res.markRegMainOrderDo;
            console.log(res.markRegMainOrderDo.rtfAssetList);
            let A = res.markRegMainOrderDo.rtfAssetList
              ? res.markRegMainOrderDo.rtfAssetList.split(",")
              : "";
            let B = { name: A[0], time: A[1] };
            this.tableData.push(B);
            console.log(this.form, "0000000000000000000000000000000000000");
            //设备信息
            this.$api.sealManage
              .getUseSealDeviceInfo()
              .then(res => {
                console.log("设备信息数据：", res, this);
                this.sealMachines = res.data;
                let name = this.form.deviceNameBak;
                this.setMachineInfo(name);
                this.sealMachines.map(item => {
                  console.log(item.title, name, "获取deviceNoBak2");
                  if (item.title == name) {
                    console.log(item.deviceNumber, "获取deviceNoBak2");
                    return (this.form.deviceNoBak2 = item.deviceNumber);
                  }
                });
                console.log(this.form.deviceNoBak2, "获取deviceNoBak2");
              })
              .catch(err => {
                console.log("设备信息查询报错：", err);
              });
            this.form.yzType = res.markRegMainOrderDo.yzType; //印章类别
            this.form.isLocate = res.markRegMainOrderDo.isLocate;
            if (this.form.isLocate == "0") {
              this.EqmtMftrNm_isShow = false;
              this.StorePlcCd_isShow = true;
            }
          }
          this.getFileList();
        })
        .catch(err => {
          console.log("M516印章登记其它信息查询报错：", err);
        });
    },
    //查询印章保管人清单
    getList() {
      let params = {
        type: "1",
        unitId: this.form.useJgId
      };
      console.log("保管人查询参数", params);
      this.$api.sealManage.personLogin
        .getList(params)
        .then(res => {
          console.log("getList返回的数据：", res, this);
          for (var j = 0; j < res.data.length; j++) {
            // if (res.data[j].huManCode) {
            this.sealKeepers.push({
              label: res.data[j].draftUser,
              value: res.data[j].draftUserId
            });
            // }
          }
          console.log(this.sealKeepers, "this.sealKeepers");
        })
        .catch(err => {
          console.log("印章保管人查询报错：", err);
        });
    },

    backSealRegister() {
      this.$router.push({
        path: "/sealManage/sealRegister"
      });
    },
    //制发机构
    selectRcvChkOrg(data) {
      switch (data) {
        case "制发机构":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.seletSelf = 1;
          this.orgOrDeptId = "1";
          this.showOrgTree = true;
          break;
        case "使用机构":
          this.title = "选择使用机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.seletSelf = 1;
          this.orgOrDeptId = "1";
          this.showOrgTree = true;
          break;
        case "保管使用部门":
          this.title = "部门";
          this.isSingle = true;
          this.seletSelf = 0;
          this.orgOrDept = 0;
          this.orgOrDeptId = this.draftOrganId;
          this.showOrgTree = true;
          break;
      }
    },
    getOrgList(org) {
      if (this.orgOrDeptId == "1" && this.title == "选择机构") {
        this.$set(this.form, "issJg", org.unitName);
        this.$set(this.form, "issJgId", org.id);
      } else if (this.orgOrDeptId == "1" && this.title == "选择使用机构") {
        this.$set(this.form, "userJg", org.unitName);
        this.$set(this.form, "useJgId", org.id);
        this.getList();
      } else {
        this.$set(this.form, "sdeptShow", org.unitName);
        this.$set(this.form, "sdeptShowId", org.id);
        console.log("部门选择", org);
        console.log(this.form.sdeptShow, "this.form.sdeptShow");
      }
    },
    //序号
    stmpBsnClIDChg(stmpBsnClID) {
      console.log("序号：", stmpBsnClID);
      let reg = /^[0-9]*$/;
      if (!reg.test(stmpBsnClID)) {
        this.$message({
          type: "error",
          message: "序号输入错误，请输入0-999之间的数字！"
        });
        this.form.markNo = "";
      } else {
        let temp = stmpBsnClID;
        if (temp.length != 3) {
          for (var i = temp.length; i < 3; i++) {
            temp = "0" + temp;
          }
        }
        this.form.markNo = temp;
      }
      if (
        this.form.yzType != "" &&
        this.form.useJgId != "" &&
        this.form.markNo != ""
      ) {
        let stmp_ecd =
          this.form.useJgId +
          "000" +
          this.form.yzType +
          this.form.markNo +
          "001";
      }
    },
    initData() {
      this.$api.sealManage
        .getUseSealType({ unitId: this.draftOrganId })
        .then(res => {
          let arr;
          if (res.data.scFiletype) {
            console.log(res.data.scFiletype, "res.data.scFiletype");
            // this.sealTypes = res.data.scFiletype.split("，");
            this.sealTypes = res.data.scFiletype.replace(/，/g, ",").split(",");
            // scFiletype.replace(/，/g, ',').split(',')
            console.log(this.sealTypes, "arrarrarrarr");
          }
        })
        .catch(e => {});
    },
    //印章类别
    // selectSealType(sealType) {
    //   this.form.yzType = sealType;
    // },
    //根据位置确定RFID
    getRfid(bsnSn) {
      this.setMachineInfo(this.form.deviceNameBak).then(() => {
        console.log("BSN_SN", bsnSn, this.allRFID[bsnSn]);
        if (this.allRFID[bsnSn]) {
          this.form.rpidFlag = this.allRFID[bsnSn];
        } else {
          this.form.rpidFlag = "";
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "该位置为获取到RFID，请重新选择！",
            duration: 2000
          });
        }
      });
    },
    //印章状态
    selectStmpStCd(StmpStcd) {
      if (StmpStcd == "A01" || StmpStcd == "A02") {
        //未启用或启用
        this.stmpEnable = true;
        //销毁可以为空
        this.rules.desPer1 = [
          { required: false, message: "请输入销毁人", trigger: "blur" }
        ];
        this.rules.desPer2 = [
          { required: false, message: "请输入监销人", trigger: "blur" }
        ];
        this.rules.desCause1 = [
          { required: false, message: "请输入销毁原因", trigger: "blur" }
        ];
        //废止可以为空
        // this.rules.returnPer = [
        //   { required: false, message: "请输入收回人", trigger: "change" }
        // ];
        // this.rules.jiaoPer = [
        //   { required: false, message: "请输入交回人", trigger: "change" }
        // ];
        // this.rules.desCause = [
        //   { required: false, message: "请输入废止原因", trigger: "blur" }
        // ];
      } else {
        this.stmpEnable = false;
        if (StmpStcd == "A03") {
          //废止
          console.log("你选择了废止");
          // this.rules.returnPer = [
          //   { required: true, message: "请输入收回人", trigger: "blur" }
          // ];
          // this.rules.jiaoPer = [
          //   { required: true, message: "请输入交回人", trigger: "blur" }
          // ];
          // this.rules.desCause = [
          //   { required: true, message: "请输入废止原因", trigger: "blur" }
          // ];

          //销毁可以为空
          this.rules.desPer1 = [
            { required: false, message: "请输入销毁人", trigger: "blur" }
          ];
          this.rules.desPer2 = [
            { required: false, message: "请输入监销人", trigger: "blur" }
          ];
          this.rules.desCause1 = [
            { required: false, message: "请输入销毁原因", trigger: "blur" }
          ];
          console.log(this.rules);
        } else if (StmpStcd == "A04") {
          //销毁
          console.log("你选择了销毁");
          this.rules.desPer1 = [
            { required: true, message: "请输入销毁人", trigger: "change" }
          ];
          this.rules.desPer2 = [
            { required: true, message: "请输入监销人", trigger: "change" }
          ];
          this.rules.desCause1 = [
            { required: true, message: "请输入销毁原因", trigger: "blur" }
          ];
          //废止可以为空
          // this.rules.returnPer = [
          //   { required: false, message: "请输入收回人", trigger: "change" }
          // ];
          // this.rules.jiaoPer = [
          //   { required: false, message: "请输入交回人", trigger: "change" }
          // ];
          // this.rules.desCause = [
          //   { required: false, message: "请输入废止原因", trigger: "blur" }
          // ];
        }
      }
    },
    //是否存放到用印机机器中
    bndgTpcdChange(bndgTpcd) {
      if (bndgTpcd == "1") {
        this.EqmtMftrNm_isShow = true;
        this.StorePlcCd_isShow = false;
      } else {
        this.EqmtMftrNm_isShow = false;
        this.StorePlcCd_isShow = true;
      }
    },
    //印章保管人A1角名称
    getA1Nm(A1ID) {
      this.form.sealPersonA1id = A1ID;
      console.log("印章保管人A1角名称", A1ID);
      if (!this.checkKeeper()) {
        this.form.sealPersonA1id = "";
        this.form.sealPersonA1 = "";
        return;
      }
      for (var i = 0; i < this.sealKeepers.length; i++) {
        if (this.sealKeepers[i].value == A1ID) {
          this.form.sealPersonA1id = A1ID;
          this.form.sealPersonA1 = this.sealKeepers[i].label;
          console.log(this.form.sealPersonA1, "this.form.sealPersonA1");
        }
        this.form.sealPersonC1id = A1ID;
        this.form.sealPersonC1 = this.form.sealPersonA1;
      }
      //this.form.sealPersonC1id = A1ID;
    },
    //印章保管人A2角名称
    getA2Nm(A2ID) {
      this.form.sealPersonA2id = A2ID;
      if (!this.checkKeeper()) {
        this.form.sealPersonA2id = "";
        this.form.sealPersonA2 = "";
        return;
      }
      for (var i = 0; i < this.sealKeepers.length; i++) {
        if (this.sealKeepers[i].value == A2ID) {
          this.form.sealPersonA2id = A2ID;
          this.form.sealPersonA2 = this.sealKeepers[i].label;
        }
        this.form.sealPersonC2id = A2ID;
        this.form.sealPersonC2 = this.form.sealPersonA2;
      }
      // this.form.sealPersonC2id = A2ID;
    },

    //印章保管人B1角名称
    getB1Nm(B1ID) {
      this.form.sealPersonB1id = B1ID;

      if (!this.checkKeeper()) {
        this.form.sealPersonB1id = "";
        this.form.sealPersonB1 = "";
        return;
      }
      for (var i = 0; i < this.sealKeepers.length; i++) {
        if (this.sealKeepers[i].value == B1ID) {
          this.form.sealPersonB1id = B1ID;
          this.form.sealPersonB1 = this.sealKeepers[i].label;
        }
      }
    },
    //印章保管人B2角名称
    getB2Nm(B2ID) {
      this.form.sealPersonB2id = B2ID;
      if (!this.checkKeeper()) {
        this.form.sealPersonB2id = "";
        this.form.sealPersonB2 = "";
        return;
      }
      for (var i = 0; i < this.sealKeepers.length; i++) {
        if (this.sealKeepers[i].value == B2ID) {
          this.form.sealPersonB2id = B2ID;
          this.form.sealPersonB2 = this.sealKeepers[i].label;
        }
      }
    },
    //根据所选设备名称，返显设备型号，设备编号，RFID
    setMachineInfo(name) {
      console.log(name, "获取name");
      return new Promise((resolve, reject) => {
        for (var i = 0; i < this.sealMachines.length; i++) {
          if (name == this.sealMachines[i].title) {
            this.form.deviceSpnoBak = this.sealMachines[i].deviceType; // 印章设备型号
            this.form.deviceNoBak = this.sealMachines[i].machineId; // 印章设备编号
            this.form.deviceNoBak2 = this.sealMachines[i].deviceNumber; // 印章设备编号
            let fileReg = this.sealMachines[i].machineRegNum;
            // let res =
            //   "210488ACF10488_1#488BA7A0488C1_2#88BA350488BA81_3#34416AC0004_4";
            // console.log("allRFID", res);
            // let RFIDArr = res.split("#");
            // for (var j = 0; j < RFIDArr.length; j++) {
            //   let RFID = RFIDArr[j].split("_");
            //   console.log("RFID_value", RFID, RFIDArr);
            //   this.allRFID[RFID[1] + ""] = RFID[0] + "";
            // }
            // console.log("allRFID_VALUE", this.allRFID); //机器注册码
            let machineId = this.sealMachines[i].machineId; //机器编号
            //取RFID
            this.getDeviceRFID(machineId, fileReg).then(res => {
              console.log("allRFID", res);
              resolve(res);
              let RFIDArr = res.split("#");
              for (var j = 0; j < RFIDArr.length; j++) {
                let RFID = RFIDArr[j].split("_");
                console.log("RFID_value", RFID, RFIDArr);
                this.allRFID[RFID[1] + ""] = RFID[0] + "";
              }
              // console.log("allRFID_VALUE", allRFID);
            });
          }
        }
      });
    },
    //检查印章保管人是否相同
    checkKeeper() {
      let A1 = !this.form.sealPersonA1id ? "A1" : this.form.sealPersonA1id;
      let A2 = !this.form.sealPersonA2id ? "A2" : this.form.sealPersonA2id;
      let B1 = !this.form.sealPersonB1id ? "B1" : this.form.sealPersonB1id;
      let B2 = !this.form.sealPersonB2id ? "B2" : this.form.sealPersonB2id;
      console.log(A1 + "#" + A2 + "#" + B1 + "#" + B2);
      if (
        A1 == A2 ||
        A1 == B1 ||
        A1 == B2 ||
        A2 == B1 ||
        A2 == B2 ||
        B1 == B2
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "印章保管人不可以相同，请重新选择！",
          duration: 2000
        });
        return false;
      } else {
        return true;
      }
    },
    headerBtnClick(btnName) {
      switch (btnName) {
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
                  markOrderType: "8",
                  id: this.$route.query.id || this.sendId
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
        case "引入印模":
          this.selOrgTypeDialog = true;
          break;
        case "维护":
          this.Isweihu = !this.Isweihu;
          break;
        case "删除此文":
          this.$confirm(
            "将彻底删除该文件及其所有关联文件，且无法恢复，是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(() => {
            this.$api.sealManage.sealRegisterForm
              .doDeleteByld({ id: this.id })
              .then(res => {
                console.log("delSealRegister返回的数据：", res);
                if (res) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "印章登记删除成功！",
                    duration: 2000
                  });
                  this.$router.back()
                } else {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: res.msg,
                    duration: 2000
                    });
                }
              })
              // .catch(err => {
              //   console.log("印章登记数据删除报错：", err);
              // });
          });
          break;
        case "关闭":
          // this.$router.push("/sealManage/sealRegister");
          this.$confirm("是否保存并退出当前页面?", "提示", {
            distinguishCancelAndClose: true,
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning"
          })
            .then(() => {
              this.saveData();
              this.$intent.closeWindow(this);
            })
            .catch(action => {
              if (action == "close") {
              } else {
                this.$intent.closeWindow(this);
              }
            });
          break;
        case "保存":
          // console.log("你点击了保存按钮！");
          this.saveData();
          break;
        default:
          console.log("你点击了按钮:" + btnName);
      }
    },
    saveData: function() {
      //表单form验证
      this.$refs["form"].validate((valid, object) => {
        if (valid) {
          if (!this.id) {
            this.$api.sealManage.sealRegisterForm
              .doSave({ ...this.form })
              .then(res => {
                this.id = res.result.id;
                console.log(this.id, "this.id");
                this.createFile();
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "印章登记成功！",
                  duration: 2000
                });
                // this.$intent.closeWindow(this);
              })
              .catch(err => {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "印章登记失败",
                  duration: 2000
                });
              });
          } else {
            this.$api.sealManage.sealRegisterForm
              .doUpdate({ id: this.id, ...this.form })
              .then(res => {
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "印章登记更新成功！",
                  duration: 2000
                });
                this.$intent.closeWindow(this);
              });
            // .catch(err => {
            //   this.$message({
            //     type: "error",
            //     showClose: true,
            //     offset: 400,
            //     message: "印章登记失败！<br/>" + err.BK_DESC,
            //     duration: 2000
            //   });
            // });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填项后保存"
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
    // table表的方法
    loadTableData(val) {
      console.log("loadTableData:", val);
    },
    cellClick(row) {
      console.log("cellClick:", row);
    },
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      if (scrolled < this.distance_jbxx + 60) {
        this.active = "#jbxx";
      } else if (
        scrolled >= this.distance_jbxx + 60 &&
        scrolled < this.distance_zfqk
      ) {
        this.active = "#zfqk";
      } else if (
        scrolled >= this.distance_zfqk + 60 &&
        scrolled < this.distance_syqk
      ) {
        this.active = "#syqk";
      } else if (
        scrolled >= this.distance_syqk + 60 &&
        scrolled < this.distance_fzqk
      ) {
        this.active = "#fzqk";
      } else if (
        scrolled >= this.distance_fzqk + 60 &&
        scrolled < this.distance_xhqk
      ) {
        this.active = "#xhqk";
      } else if (
        scrolled >= this.distance_xhqk + 60 &&
        scrolled < this.distance_yrym
      ) {
        this.active = "#yrym";
      }
    },
    toTarget(target) {
      this.active = target;
      const toElement = document.querySelector(target);

      toElement.scrollIntoView(this.scrollIntoViewOptions);
    }
  },
  watch: {
    "form.isEnabled": function(val) {
      console.log("watch:", val, this);
    }
  },
  created: function() {
    console.log(localStorage.userInfo);
    this.form.draftOrganId = JSON.parse(localStorage.userInfo).unitId;
    if (this.form.userJg == "") {
      this.form.userJg = JSON.parse(localStorage.userInfo).unitName;
      this.form.useJgId = JSON.parse(localStorage.userInfo).unitId;
      console.log(this.form.userJg, this.form.useJgId);
      let params = {
        type: "1",
        unitId: this.form.useJgId
      };
      this.$api.sealManage.personLogin
        .getList({ type: "1", unitId: this.form.useJgId })
        .then(res => {
          for (var j = 0; j < res.data.length; j++) {
            // if (res.data[j].huManCode) {
            this.sealKeepers.push({
              label: res.data[j].draftUser,
              value: res.data[j].draftUserId
            });
            console.log(this.sealKeepers, "this.sealKeepers");
          }
          // }
        });
    }
    this.initData();
    if (this.$route.query.id) {
      // this.id = this.$route.query.id;
      sessionStorage.setItem("id", this.$route.query.id);
      this.id = sessionStorage.getItem("id");
      console.log("-------------------------------this.id", this.id);
      this.update = true;
      // let sealStatus = this.$route.query.sealStatus;
      this.statusDisabled = true;
      this.getFormData();
    }
    this.draftOrganId = JSON.parse(localStorage.getItem("userInfo")).unitId;
    //设备信息
    this.$api.sealManage
      .getUseSealDeviceInfo()
      .then(res => {
        console.log("设备信息数据：", res, this);
        this.sealMachines = res.data;
        let name = this.form.deviceNameBak;
        this.sealMachines.map(item => {
          console.log(item.title, name, "获取deviceNoBak2");
          if (item.title == name) {
            console.log(item.deviceNumber, "获取deviceNoBak2");
            return (this.form.deviceNoBak2 = item.deviceNumber);
          }
        });
        console.log(this.form.deviceNoBak2, "获取deviceNoBak2");
      })
      .catch(err => {
        console.log("设备信息查询报错：", err);
      });
    // (this.form.deviceNoBak2)
    // 初始化所有的印章类别
    // this.queryAllSealTypes()
    //   .then(sealTypes => {
    //     console.log("查询sealTypes成功:", sealTypes, this);
    //     this.sealTypes = sealTypes;
    //   })
    //   .catch(err => {
    //     console.log("查询所有的印章类别失败:", err);
    //     this.sealTypes = [];
    //   });
  }
};
</script>


<style scoped lang="less" rel="stylesheet/less">
.registerForm {
  background: #fff;
  min-height: 100vh;
}

.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.sealRegisterForm {
  background: white;
  min-height: 1000px;
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
    padding: 45px 70px 0px 70px;
    .title-text {
      margin-bottom: 5px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      text-align: center;
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
  .process_content {
    width: 80%;
    min-height: 920px;
    padding: 10px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
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
.bank_dispach_side_nav {
  width: 45px;
  height: auto;
  position: fixed;
  padding: 0px 0px 0px 0px;
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
  .height_90 {
    height: 200px;
    margin-top: -100px;
  }
  .one {
    display: flex;
  }
  .two {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
