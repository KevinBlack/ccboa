<template>
  <!-- 这是印章管理》印章刻制新建/修改页 -->
  <div class="drafting" ref="drafting">
    <!-- <sealMarkMgrDocument :isType="isType"></sealMarkMgrDocument> -->
    <el-container direction="vertical">
      <!-- header:页头，功能区 -->
      <el-header>
        <div class="common-header">
          <div class="headerClicks grid_comtent">
            <el-button
              v-for="(item, index) in bjButtonList"
              :key="index"
              @click="headerBtnClick(item)"
              plain
              size="mini"
              v-show="item.show && (pageType == 'see' || pageType == 'haveto' )"
            >{{item.name}}</el-button>
            <el-button
              v-for="(item, index) in buttonList"
              :key="index"
              @click="headerBtnClick(item)"
              plain
              size="mini"
              v-show="item.show && pageType != 'see' && pageType != 'haveto'"
            >{{item.name}}</el-button>
          </div>
        </div>
      </el-header>
      <!-- main:页面主体，内容区 -->
      <el-main>
        <div class="title" ref="mainTitle" style="color:red">{{title}}印章刻制审批单</div>
        <el-form
          :model="form"
          :rules="rules"
          ref="elForm"
          label-width="120px"
          class="drafting-mainform"
        >
          <el-row class="box" :span="24">
            <el-col :span="3" style="width: auto;margin-right: 20px;">
              <el-form-item label="当前环节:" label-width="90px">
                <span style="color:#f60">{{form.currentNode}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: auto;margin-right: 20px;">
              <el-form-item label="当前处理人:" label-width="90px">
                <span style="color:#f60">{{currentUserNames}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: auto;margin-right: 20px;">
              <el-form-item label="是否跨行:" label-width="90px">
                <span style="color:#f60">
                  <el-radio-group v-model="form.isKh" :disabled="true">
                    <el-radio :label="'0'">非跨行</el-radio>
                    <el-radio :label="'1'">跨行</el-radio>
                  </el-radio-group>
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="印章类别" prop="yzType" ref="yzType">
                <el-radio-group v-model="form.yzType" :disabled="readFields.yzlb">
                  <el-radio
                    v-for="(item, key) in sealTypes"
                    :key="key"
                    :label="item.lable"
                  >{{item.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请单位" prop="yzDeptId" ref="yzDeptId">
                <el-select v-model="form.yzDeptId" :disabled="readFields.sqdw" v-if="isLoginUser&&form.pcsAvyId != 'old'">
                  <el-option
                    v-for="(item,index) in deptList"
                    :key="index"
                    :label="item.firstUnitName"
                    :value="item.firstUnitId"
                  ></el-option>
                </el-select>
                <el-select v-model="form.yzDept" :disabled="readFields.sqdw" v-else-if="form.pcsAvyId&& form.pcsAvyId=='old'">
                  <el-option
                    v-for="(item,index) in deptList"
                    :key="index"
                    :label="item.firstUnitName"
                    :value="item.firstUnitName"
                  ></el-option>
                </el-select>
                <el-select v-model="form.yzDeptId" :disabled="readFields.sqdw" v-else>
                  <el-option :label="form.yzDept" :value="form.yzDeptId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="申请日期" prop="cdate" ref="cdate">
                <el-date-picker
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择日期"
                  :disabled="readFields.sqrq"
                  v-model="form.cdate"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请人" prop="creator" ref="creator">
                <label slot="label">申请人</label>
                <el-input placeholder="申请人名称" v-model="form.creator" :disabled="readFields.sqr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系电话" prop="tel" ref="tel">
                <el-input v-model="form.tel" :disabled="readFields.lxdh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="编号" prop="documentNo" ref="documentNo">
                <el-input v-model="form.documentNo" :disabled="readFields.bh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="申请理由（刻制依据）" prop="reason" ref="reason">
                <el-input
                  type="textarea"
                  v-model="form.reason"
                  :disabled="readFields.sqly"
                  :rows="3"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="刻制印章名称" prop="yzNewname" ref="yzNewname">
                <el-input v-model="form.yzNewname" :disabled="readFields.kzyzmc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="旧章名称" prop="yzOldname" ref="yzOldname">
                <el-input v-model="form.yzOldname" :disabled="readFields.jzmc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="申请单位主要负责人签批" prop="qpYj" ref="qpYj">
              <el-row v-if="!editedIdeaFields.sqdwzyfzrqp||!(list.qpYj&&list.qpYj.length!=0)">
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    :autosize="{minRow:5,maxRow:15}"
                    maxlength="500"
                    show-word-limit
                    v-model="form.qpYj"
                    :disabled="editedIdeaFields.sqdwzyfzrqp"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.sqdwzyfzrqp">
                  <i class="icon-font el-icon-edit select-chang" @click="showWriteList('qpYj')"></i>
                </el-col>
              </el-row>
              <div style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100" style="margin: 5px 0;">
                    <el-col
                      :span="22"
                      class="content-container"
                      v-for="item in list.qpYj"
                      :key="item.id"
                    >
                      <div
                        class="delBox"
                        v-show="item.ifDel&&pageType == 'modify'"
                        @click="deleteCurIdea(item.id)"
                      >
                        <i data-v-648654e0 class="icon-font el-icon-delete"></i>
                      </div>
                      <div class="br">{{item.content}}</div>
                      <div class="adviceInfo">
                        <!-- <span v-if="form.isKh=='1'">{{item.unitName}}/</span>
                        {{item.departmentName}}-->
                        <span>{{item.qm}}</span>
                        <br />
                        <span>{{item.dateTime}}</span>
                      </div>
                      <!-- <i
                      class="el-icon-delete"
                      @click="deleteCurIdea(item.id)"
                      style="font-size:20px;margin-left:10px;cursor:pointer"
                      v-if="item.dateTime==lastOptionTime&&item.userId==localUserId"
                      ></i>-->
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="有权签字人审批" prop="yqQzrSp" ref="yqQzrSp">
              <div style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100" style="margin: 5px 0;">
                    <el-col
                      :span="22"
                      class="content-container"
                      v-for="item in list.yqQzrSp"
                      :key="item.id"
                    >
                      <div
                        class="delBox"
                        v-show="item.ifDel&&pageType == 'modify'"
                        @click="deleteCurIdea(item.id)"
                      >
                        <i data-v-648654e0 class="icon-font el-icon-delete"></i>
                      </div>
                      <div class="br">{{item.content}}</div>
                      <div class="adviceInfo">
                        <!-- <span v-if="form.isKh=='1'">{{item.unitName}}/</span>
                        {{item.departmentName}}-->
                        <span class="pad_lr10">{{item.qm}}</span>
                        <br />
                        <span>{{item.dateTime}}</span>
                      </div>
                    </el-col>
                    <!-- <i
                      class="el-icon-delete"
                      @click="deleteCurIdea(item.id)"
                      style="font-size:20px;margin-left:10px;cursor:pointer"
                      v-if="item.dateTime==lastOptionTime&&item.userId==localUserId"
                    ></i>-->
                  </el-row>
                </div>
              </div>
              <el-row v-if="!editedIdeaFields.yqqzrsp||!(list.yqQzrSp&&list.yqQzrSp.length!=0)">
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    :autosize="{minRow:5,maxRow:15}"
                    maxlength="500"
                    show-word-limit
                    v-model="form.yqQzrSp"
                    :disabled="editedIdeaFields.yqqzrsp"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.yqqzrsp">
                  <i class="icon-font el-icon-edit select-chang" @click="showWriteList('yqQzrSp')"></i>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="归口管理部门审核" prop="shYj" ref="shYj">
              <div style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100" style="margin: 5px 0;">
                    <el-col
                      :span="22"
                      class="content-container"
                      v-for="item in list.shYj"
                      :key="item.id"
                    >
                      <div
                        class="delBox"
                        v-show="item.ifDel&&pageType == 'modify'"
                        @click="deleteCurIdea(item.id)"
                      >
                        <i data-v-648654e0 class="icon-font el-icon-delete"></i>
                      </div>
                      <div class="br">{{item.content}}</div>
                      <div class="adviceInfo">
                        <!-- <span v-if="form.isKh=='1'">{{item.unitName}}/</span>
                        {{item.departmentName}}-->
                        <span>{{item.qm}}</span>
                        <br />
                        <span>{{item.dateTime}}</span>
                      </div>
                    </el-col>
                    <!-- <i
                      class="el-icon-delete"
                      @click="deleteCurIdea(item.id)"
                      style="font-size:20px;margin-left:10px;cursor:pointer"
                      v-if="item.dateTime==lastOptionTime&&item.userId==localUserId"
                    ></i>-->
                  </el-row>
                </div>
              </div>
              <el-row v-if="!editedIdeaFields.gkglbmsh||!(list.shYj&&list.shYj.length!=0)">
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    :autosize="{minRow:5,maxRow:15}"
                    maxlength="500"
                    show-word-limit
                    v-model="form.shYj"
                    :disabled="editedIdeaFields.gkglbmsh"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.gkglbmsh">
                  <i class="icon-font el-icon-edit select-chang" @click="showWriteList('shYj')"></i>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="办公室审核" prop="offShYj" ref="offShYj">
              <div style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100" style="margin: 5px 0;">
                    <el-col
                      :span="22"
                      class="content-container"
                      v-for="item in list.offShYj"
                      :key="item.id"
                    >
                      <div
                        class="delBox"
                        v-show="item.ifDel&&pageType == 'modify'"
                        @click="deleteCurIdea(item.id)"
                      >
                        <i data-v-648654e0 class="icon-font el-icon-delete"></i>
                      </div>
                      <div class="br">{{item.content}}</div>
                      <div class="adviceInfo">
                        <!-- <span v-if="form.isKh=='1'">{{item.unitName}}/</span>
                        {{item.departmentName}}-->
                        <span>{{item.qm}}</span>
                        <br />
                        <span>{{item.dateTime}}</span>
                      </div>
                    </el-col>
                    <!-- <i
                      class="el-icon-delete"
                      @click="deleteCurIdea(item.id)"
                      style="font-size:20px;margin-left:10px;cursor:pointer"
                      v-if="item.dateTime==lastOptionTime&&item.userId==localUserId"
                    ></i>-->
                  </el-row>
                </div>
              </div>
              <el-row v-if="!editedIdeaFields.bgssh||!(list.offShYj&&list.offShYj.length!=0)">
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    :autosize="{minRow:5,maxRow:15}"
                    maxlength="500"
                    show-word-limit
                    v-model="form.offShYj"
                    :disabled="editedIdeaFields.bgssh"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.bgssh">
                  <i class="icon-font el-icon-edit select-chang" @click="showWriteList('offShYj')"></i>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="刻制单位" prop="carvDept" ref="carvDept">
                <el-input v-model="form.carvDept" :disabled="readFields.kzdw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="批准刻制单位（公安部门）" prop="conCarvDept" ref="conCarvDept">
                <el-input v-model="form.conCarvDept" :disabled="readFields.pzkzdw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="刻制情况" prop="carvStatus" ref="carvStatus">
                <el-input v-model="form.carvStatus" :disabled="readFields.kzqk"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="刻制日期" prop="carvDate" ref="carvDate">
                <el-date-picker
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择日期"
                  v-model="form.carvDate"
                  :disabled="readFields.kzrq"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否启用" prop="isStartUsing" ref="isStartUsing">
                <el-radio-group
                  change="isEnabledChange"
                  v-model="form.isStartUsing"
                  :disabled="readFields.sfqy"
                >
                  <el-radio label="是">是</el-radio>
                  <el-radio label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="启用日期" prop="usingDate" ref="usingDate">
                <el-date-picker
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择日期"
                  v-model="form.usingDate"
                  :disabled="readFields.qyrq"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="印章交接方式" prop="joinMethod" ref="joinMethod">
                <el-radio-group v-model="form.joinMethod" :disabled="readFields.yzjjfs">
                  <el-radio label="自取">自取</el-radio>
                  <el-radio label="邮寄">邮寄</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="取印时间" prop="getSealDate" ref="getSealDate">
                <el-date-picker
                  style="width: 100%;"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择取印时间"
                  v-model="form.getSealDate"
                  :disabled="readFields.qysj"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="取印人" prop="getSealPerson" ref="getSealPerson">
                <el-input v-model="form.getSealPerson" :disabled="readFields.qyr"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="交印时间" prop="handedSealDate" ref="handedSealDate">
                <el-date-picker
                  style="width: 100%;"
                  type="datetime"
                  placeholder="请选择交印时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="form.handedSealDate"
                  :disabled="readFields.jysj"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="交印人" prop="handedSealPerson" ref="handedSealPerson">
                <el-input v-model="form.handedSealPerson" :disabled="readFields.jyr"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="备注" prop="remark" ref="remark">
              <el-row v-if="!editedIdeaFields.bz||!(list.remark&&list.remark.length!=0)">
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    :autosize="{minRow:5,maxRow:15}"
                    maxlength="500"
                    show-word-limit
                    v-model="form.remark"
                    :disabled="editedIdeaFields.bz"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.bz">
                  <i class="icon-font el-icon-edit select-chang" @click="showWriteList('remark')"></i>
                </el-col>
              </el-row>
              <div style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100" style="margin: 5px 0;">
                    <el-col
                      :span="22"
                      class="content-container"
                      v-for="item in list.remark"
                      :key="item.id"
                    >
                      <div class="br">{{item.content}}</div>
                      <div class="adviceInfo">
                        <!-- <span v-if="form.isKh=='1'">{{item.unitName}}/</span>
                        {{item.departmentName}}-->
                        <span>{{item.qm}}</span>
                        <br />
                        <span>{{item.dateTime}}</span>
                      </div>
                      <!-- <i
                      class="el-icon-delete"
                      @click="deleteCurIdea(item.id)"
                      style="font-size:20px;margin-left:10px;cursor:pointer"
                      v-if="item.dateTime==lastOptionTime&&item.userId==localUserId"
                      ></i>-->
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="印模" prop="sealImgUrl">
                <div class="file-list">
                  <el-scrollbar>
                    <div v-for="(item,index) in filesList" :key="item.id">
                      <template>
                        <div class="file-item">
                          <span>{{index+1}}.</span>
                          <span class="text-default" @click="viewFile(item)">{{item.fileName}}</span>
                          <span class="text-default">{{item.createrName}}</span>
                          <span class="text-default">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              class="margin-default"
                              type="warning"
                              size="mini"
                              v-if="pageType == 'modify' || pageType == 'new'"
                              round
                              @click.native="deleteRow(item.id)"
                            >删除</el-button>
                            <el-button
                              class="margin-default"
                              type="primary"
                              size="mini"
                              round
                              @click.native="downFile(item)"
                            >下载</el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>

      <!-- 完成并发送选人组件 -->
      <select-person
        :treeData="treeData"
        :canTab="canTab"
        :loadingTree="loadingTree"
        :hasRadio="hasRadio"
        :checkOrg="checkOrg"
        :offenUse="offenUse"
        :dialogType="dialogType"
        :seletOptionsData="seletOptionsData"
        :dialogTypeNow="dialogTypeNow"
        :dialogTit="dialogTit"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        :fromdata="form"
        :treeTradeCode="treeTradeCode"
        @showCompDialog="showCompDialog"
      ></select-person>

      <!--常用批语-->
      <appendWriteList
        v-dialogDrag
        :offenDevices="offenDevices"
        ref="writelist"
        v-if="appendWriteDialog"
        @childsaveselect="writelistvalue"
        @addCommonUse="addCommonUse"
        @deleId="deleteMassage"
      ></appendWriteList>

      <!-- 发上级行 -->
      <supbank-tree
        v-model="showOrgTree"
        v-dialogDrag
        :title="dialogTitle"
        :isSingle="isSingle"
        :isSearchAll="true"
        :orgOrDept="orgOrDept"
        :seletOptionsData="seletOptionsData"
        @orgList="getOrgList"
      ></supbank-tree>

      <!-- 上传印模 -->
      <el-dialog title="引入印模" v-dialogDrag width="40%" :visible.sync="isShowFile">
        <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
      </el-dialog>

      <!-- 查看流程 -->
      <shiwu-flow :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></shiwu-flow>

      <!-- 生成编号 -->
      <bian-hao
        :fileNo="fileNo"
        @isok="isok"
        :isShow="bianshow"
        @isclose="isclose"
        :kongQuelist="kongQuelist"
      ></bian-hao>
    </el-container>
    <!-- 退回修改弹窗 -->
    <el-dialog title="退回" :visible.sync="Ths" width="30%" :before-close="handleClose">
      <el-form ref="Thdata" :model="Thdatas" label-width="80px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="退回原因">
              <el-input v-model="Thdatas.thyxs" type="textarea" :rows="5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" style="text-align: center">
            <el-button type="primary" @click="thqds">退回</el-button>
            <el-button @click="ThQxs">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 退回修改弹窗 -->
    <el-dialog title="退回修改" :visible.sync="Th" width="30%" :before-close="handleClose">
      <el-form ref="Thdata" :model="Thdata" label-width="80px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="退回修改原因">
              <el-input v-model="Thdata.thyx" type="textarea" :rows="5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" style="text-align: center">
            <el-button type="primary" @click="thqd">退回</el-button>
            <el-button @click="ThQx">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
// 设置页面元素显隐、置灰、校验等功能，
import pageSetMixins from "@/minixs/index";
// 添加message-one和message-some组件需要用到的方法
import messageMixins from "@/minixs/messageMixins.js";

// 导入选人组件（完成并发送时使用）
import selectPerson from "@/components/tree/treeTansun";

import uploadFileTs from "components/uploadFile/uploadFileTs"; //上传组件

// 导入部门机构选择组件
import selectOrgOrDept from "components/select/selectOrgOrDept";

// 导入留言输入显示组件
import MessageOne from "@/components/optionalfield/message-one.vue";
import MessageSome from "@/components/optionalfield/message-some.vue";
// 常用批语
import appendWriteList from "components/viewFlow/perWrit";

// 查看流程组件
import shiwuFlow from "@/components/viewFlow/shiwuFlow";

//上级行树组件
import supbankTree from "components/tree/superiorBank.vue";

import openOrDownLoadFile from "@/minixs/shiwuLineWord"; //在线预览

import bianHao from "@/components/createDocumentNo/bianHao"; //生成编号

import exportTable from "../../../minixs/exportTable";

import sealMarkMgrDocument from "../../printing/sealMarkMgrDocument.vue";

import viewDraft from "@/minixs/viewDraft";

import minixs from "@/minixs/index";

import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "drafting",
  components: {
    "select-org-or-dept": selectOrgOrDept,
    "message-some": MessageSome,
    "select-person": selectPerson,
    "upload-file-ts": uploadFileTs,
    "shiwu-flow": shiwuFlow,
    appendWriteList: appendWriteList,
    "supbank-tree": supbankTree,
    "bian-hao": bianHao,
    sealMarkMgrDocument
  },
  mixins: [pageSetMixins, messageMixins, openOrDownLoadFile,minixs,draftMuban,viewDraft,dispatchIndex,isNowUser],
  data() {
    return {
      // 当前处理人
      currentUserNames: JSON.parse(localStorage.userInfo).humanName,
      Thdata: {
        //退回修改原因
        thyx: ""
      },
      Thdatas: {
        //退回原因
        thyxs: ""
      },
      Th: false,
      Ths: false,
      isType: false,
      title: "",
      doneProgressList: [], // 已完成的流程
      rules: {}, // 校验规则
      readFields: {
        yzlb: false, // 印章类别
        sqdw: false, // 申请单位
        sqrq: false, // 申请日期
        sqr: false, // 申请人
        lxdh: false, // 联系电话
        bh: false, // 编号
        sqly: false, // 申请理由（刻制依据）
        kzyzmc: false, // 刻制印章名称
        jzmc: false, // 旧章名称
        kzdw: false, // 刻制单位
        pzkzdw: false, // 批准刻制单位（公安部门）
        kzqk: false, // 刻制情况
        kzrq: false, // 刻制日期
        sfqy: false, // 是否启用
        qyrq: false, // 启用日期
        yzjjfs: false, // 印章交接方式
        qysj: false, // 取印时间
        qyr: false, // 取印人
        jysj: false, // 交印时间
        jyr: false, // 交印人
        ym: false // 印模
      }, // 不可编辑的控制域（即只读）。设置元素的disabled属性。设置了的为true
      requiredFields: {
        yzlb: false, // 印章类别
        sqdw: false, // 申请单位
        sqrq: false, // 申请日期
        sqr: false, // 申请人
        lxdh: false, // 联系电话
        bh: false, // 编号
        sqly: false, // 申请理由（刻制依据）
        kzyzmc: false, // 刻制印章名称
        jzmc: false, // 旧章名称
        kzdw: false, // 刻制单位
        pzkzdw: false, // 批准刻制单位（公安部门）
        kzqk: false, // 刻制情况
        kzrq: false, // 刻制日期
        sfqy: false, // 是否启用
        qyrq: false, // 启用日期
        yzjjfs: false, // 印章交接方式
        qysj: false, // 取印时间
        qyr: false, // 取印人
        jysj: false, // 交印时间
        jyr: false, // 交印人
        ym: false // 印模
      }, // 必填的控制域。在rules中配置。设置了的为true
      editedIdeaFields: {
        sqdwzyfzrqp: true, // 申请单位主要负责人签批
        yqqzrsp: true, //有权签字人审批
        gkglbmsh: true, // 归口管理部门审核
        bgssh: true, // 办公室审核
        bz: true // 备注
      }, // 可编辑意见域。设置元素的disabled属性，设置了的为false。我最后又取反了一次，让其与语义相同。(同readFields相反，我也很恼火)
      requiredIdeaFields: {
        sqdwzyfzrqp: false, // 申请单位主要负责人签批
        yqqzrsp: false, //有权签字人审批
        gkglbmsh: false, // 归口管理部门审核
        bgssh: false, // 办公室审核
        bz: false // 备注
      }, // 必填意见域。在rules中配置。设置了的为true
      buttonList: [
        { name: "关闭", show: true, initShow: true, type: "gb" },
        { name: "保存", show: false, initShow: false, type: "bc" },
        { name: "完成并发送", show: false, initShow: false, type: "wcbfs" },
        { name: "生成编号", show: false, initShow: false, type: "scbh" },
        { name: "发上级行", show: false, initShow: false, type: "fsjh" },
        { name: "返回请示行", show: false, initShow: false, type: "fhqsh" },
        { name: "删除", show: false, initShow: false, type: "shanchu" },
        { name: "办结", show: false, initShow: false, type: "bj" },
        { name: "引入印模", show: false, initShow: false, type: "yrym" },
        { name: "归档打印", show: false, initShow: false, type: "gddy" },
        { name: "查看流程", show: false, initShow: false, type: "cklc" },
        { name: "打印处理单", show: false, initShow: false, type: "dycld" },
        { name: "收藏", show: false, initShow: false, type: "sc" },
        { name: "操作指南", show: false, initShow: false, type: "czzn" },
        { name: "维护", show: false, initShow: false, type: "wh" },
        { name: "流程调度", show: false, initShow: false, type: "lcdd" },
        // { name: "退回", show: false, initShow: false, type: "th" },
        { name: "退回修改", show: false, initShow: false, type: "thxg" }
        // { name: "收回", show: false, initShow: true, type: "sh" }
      ], // 功能按钮.设置了的为true. initShow:是页面配置的按钮初始状态
      bjButtonList: [
        { name: "关闭", show: true, initShow: true, type: "bjgb" },
        { name: "收回", show: false, initShow: true, type: "shouhui" },
        { name: "查看流程", show: true, initShow: true, type: "cklc" },
        { name: "打印处理单", show: true, initShow: true, type: "dycld" },
        { name: "收藏", show: true, initShow: true, type: "sc" }
      ],
      sealTypes: [], // 所有的印章类别，初始化页面时从“印章刻制类别”配制项获取
      // 表格
      form: {
        currentUserId: "", // 当前环节应当的操作人ID
        currentUser: "", // 当前环节应当的操作人Nm
        currentNodeId: "", // 当前环节ID
        currentNode: "起草", //当前环节
        isKh: "0", //是否跨行 0-否 1-是
        yzType: "", // 印章类别
        yzDept: "", // 申请单位
        yzDeptId: "", //申请单位Id
        draftOrgan: "", //拟稿机构
        draftOrganId: "", //拟稿机构Id
        cdate: "", // 申请日期
        creator: "", //申请人
        documentNo: "", // 编号
        reason: "", // 申请理由（刻制依据）
        yzNewname: "", // 刻制印章名称
        yzOldname: "", // 旧章名称
        qpYj: "", //申请单位主要负责人签批
        yqqzrsp: "", //有权签字人审批
        shYj: "", //归口管理部门审核
        offShYj: "", //办公室审核
        carvDept: "", // 刻制单位
        conCarvDept: "", // 批准刻制单位（公安部门）
        carvStatus: "", // 刻制情况
        carvDate: "", // 刻制日期
        isStartUsing: "", // 是否启用
        usingDate: "", // 启用日期
        joinMethod: "", // 印章交接方式
        getSealDate: "", // 取印时间
        getSealPerson: "", // 取印人
        handedSealDate: "", // 交印时间
        handedSealPerson: "", // 交印人
        remark: "", //备注
        tel: "" //联系电话
      },
      list: {
        qpYj: [], //申请单位主要负责人签批
        yqqzrsp: [], //有权签字人审批
        shYj: [], //归口管理部门审核
        offShYj: [], //办公室审核
        remark: [] //备注
      },
      /* 完成并发送相关参数 */
      singelCheckF: true, // 单选，多选标志。true-单选 false-多选
      dialogTypeNow: "next",
      dialogType: "dosend",
      offenUse: true,
      loadingTree: true, // 是懒加载还是非懒加载
      canTab: false,
      hasRadio: false, // 是否单选
      checkOrg: false,
      seletOptionsData: [], // 环节
      treeData: [], // 部门（人员树）
      dialogTit: "选择人员",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      treeTradeCode: "", // 发文交易线，如果不设置就为默认的2023的交易线，设置了值就用设置的交易线
      /* 常用标语 */
      clickTypes: "", // 常用批语类型
      offenDevices: [], // 常用标语
      appendWriteDialog: false, // 常用批语
      id: "",
      saveStatus: "",
      huanJieMessage: {},
      showOrgTree: false,
      dialogTitle: "发上级行",
      isSingle: true,
      orgOrDept: 1,
      orgOrDeptId: "0",
      uploadConfig: {
        filesHas: [],
        id: "",
        fileType: true,
        isSpecial: 0
      },
      isShowFile: false,
      filesList: [],
      documentNoStatus: false,
      showFlowChart: false,
      tableData: [],
      bianshow: false,
      kongQuelist: [], //空缺文号
      fileNo: "", //当前文号
      isLoginUser: true,
      pageType: "",
      localUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前人员ID
      lastOptionTime: "0",
      deptList: []
    };
  },
  methods: {
    // 退回修改确定
    thqd() {
      let Jb = JSON.parse(localStorage.getItem("userInfo"));

      this.form.thIdea = this.Thdata.thyx;
      this.Th = false;
      let param = {
        thIdea: this.form.thIdea,
        id: this.$route.query.id,
        backType: "0",
        unitId: Jb.unitId
      };
      this.$api.sealManage.markMgr.returnMark(param).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.Thdata.thyx = "";
          this.$router.go(-1);
        }
      });
    },
    // 退回修改取消
    ThQx() {
      this.Thdata.thyx = "";
      this.Th = false;
    },
    // 退回确定
    thqds() {
      this.form.thIdea = this.Thdatas.thyxs;
      let Jb = JSON.parse(localStorage.getItem("userInfo"));
      this.Ths = false;
      let param = {
        thIdea: this.form.thIdea,
        id: this.$route.query.id,
        backType: "1",
        unitId: Jb.unitId
      };
      this.$api.sealManage.markMgr.returnMark(param).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.Thdatas.thyxs = "";
          this.$router.go(-1);
        }
      });
    },
    // 退回取消
    ThQxs() {
      this.Thdatas.thyxs = "";
      this.Ths = false;
    },
    // 收回
    takeBack() {
      this.$api.sealManage.markMgr
        .takeBackfun({ id: this.$route.query.id || this.id })
        .then(res => {
          console.log(res);
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.$intent.closeWindow(this);
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCurIdea(id) {
      this.$api.sealManage
        .delItemKz({
          id: id
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getMarkDetail();
        });
    },

    //环节权限（字段，按钮）
    getHuanJie() {
      var param = {
        id: this.id
      };
      this.$api.sealManage.markMgr
        .getMarkRole(param)
        .then(res => {
          console.log(res, "sss");
          this.huanJieMessage = res.data;

          if (this.pageType == "modify" || this.pageType == "new") {
            console.log("ppp");
            //判断入口
            this.requiredFields = this.setRequiredFields(
              this.requiredFields,
              this.huanJieMessage.requiredFields
            );
            this.readFields = this.setReadFields(
              this.readFields,
              this.huanJieMessage.readFields
            ); //不可编辑控制域
            this.editedIdeaFields = this.setEditedIdeaFields(
              this.editedIdeaFields,
              this.huanJieMessage.editedIdeaFields,
              this.huanJieMessage.editedIdeaFieldsBycondition
            ); //可编辑意见域
            this.requiredIdeaFields = this.setRequiredIdeaFields(
              this.requiredIdeaFields,
              this.huanJieMessage.requiredIdeaFields
            ); //可编辑意见域
            if (this.requiredFields["qyr"]) {
              this.form.getSealPerson = this.form.creator;
            }
            this.buttonList = this.showButton(
              this.buttonList,
              this.huanJieMessage.visibleButtons,
              this.huanJieMessage.visibleButtonsBycondition
            ); //按钮
            // this.buttonList.forEach((item, index) => {
            //   if (this.form.isKh === "0") {
            //     item.type == "fsjh" ? (item.show = false) : item.show;
            //     this.$set(this.buttonList, index, item);
            //   }
            // });
          } else {
            for (var key in this.readFields) {
              this.readFields[key] = true;
            }
          }
          this.initRule();
        })
        .catch(er => {});
    },

    //按钮公共调用
    headerBtnClick(item) {
      switch (item.type) {
        case "th":
          this.Ths = true;
          // let param = {
          //   id: this.$route.query.id,
          //   backType: "1"
          // };
          // this.$api.sealManage.markMgr.returnMark(param).then(res => {
          //   console.log('退回借口')
          // });
          break;
        case "thxg":
          this.Th = true;
          // let param1 = {
          //   id: this.$route.query.id,
          //   backType: "0"
          // };
          // this.$api.sealManage.markMgr.returnMark(param1).then(res => {
          //   console.log('退回修改借口')
          // });
          break;
        case "gb": //关闭
          this.$confirm("是否保存并退出当前页面?", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            distinguishCancelAndClose: true,
            type: "warning",
            callback: action => {
              if (action === "confirm") {
                if (this.id != null && this.id != "") {
                  this.updateData(false);
                } else {
                  this.saveData();
                }
                if (this.id != null && this.id != "") {
                  this.$intent.closeWindow(this);
                }
                this.$intent.closeWindow(this);
              } else if (action === "cancel") {
                this.$intent.closeWindow(this);
              } else if (action === "close") {
              }
            }
          });
          break;
        case "bc": //保存
          if (this.id != null && this.id != "") {
            this.updateData(true);
          } else {
            this.saveData();
          }
          break;
        case "wcbfs": //完成并发送
          if (!this.documentNoStatus && this.requiredFields.bh) {
            this.$message({
              type: "error",
              offset: "200",
              message: "请先,生成编号"
            });
            return;
          }
          this.$refs["elForm"].validate(valid => {
            if (valid) {
              if (this.form.currentNode != "起草") {
                this.$api.sealManage.markMgr
                  .getMarkProcess({ id: this.$route.query.id })
                  .then(res => {
                    console.log("flag", res);
                    if (res.data.backFlag1) {
                      this.$confirm("是否返回给"+this.form.supUser, "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                      })
                        .then(() => {
                          console.log(this.form);
                          this.form.currentUser = this.form.supUser;
                          this.form.currentUserId = this.form.supUserId.toString();
                          this.form.currentNodeId = this.form.supNodeId;
                          this.form.currentNode = this.form.supNode;
                          this.form.clLx = "完成并发送";
                          this.$api.sealManage.markMgr
                            .doSendMark(this.form)
                            .then(res => {
                              console.log(res);
                              if (res.code === "SUCCESS") {
                                // this.$intent.closeWindow(this);
                                this.$intent.closeWindow(this);
                              }
                            });
                        })
                        .catch(() => {
                          this.send();
                        });
                    } else {
                      console.log("else");
                      this.send();
                    }
                  });
              } else {
                this.send();
              }
            } else {
              this.$message({
                type: "warning",
                message: "请填写必填项后保存"
              });
            }
          });

          break;
        case "scbh": //生成编号
          this.getSealNum(true);
          break;
        case "fsjh": //发上级行
          this.sendSuperior();
          break;
        case "fhqsh": //返回请示行
          this.returnSuperior();
          break;
        case "bj": //办结
          this.end();
          break;
        case "yrym": //引入印模
          this.uploadYM();
          break;
        case "gddy": //归档打印
          this.print();
          break;
        case "cklc": //查看流程
          this.getProcess();
          break;
        case "bjgb": //办结关闭
          this.$intent.closeWindow(this);
          break;
        case "dycld": //打印处理单
          this.$intent.goNewPage(this, {
            path: "/sealMarkMgrDocument",
            query: { id: this.id, isType: true }
          });
          break;
        case "czzn": //操作指南
          this.handBook("YZGL");
          break;
        case "shouhui":
          this.$api.sealManage.markMgr
            .shouhui({ id: this.$route.query.id })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "收回成功"
                });
                // this.$router.push('/sealManage/markMgr/index')
                this.$intent.closeWindow(this);
              }
            });
          break;
        case "sc": //收藏
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
                  markOrderType: "5",
                  id: this.$route.query.id || this.id
                })
                .then(res => {
                  console.log(res, "收藏");
                  // downLoadFileReName()
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
          // var that = this;
          // exportTable.getPdf(
          //   that.title + "印章刻制审批单",
          //   that.filesList,
          //   "printHtml",
          //   that.$businessCode.fawglfj,
          //   that.title + "印章刻制审批单",
          //   that
          // );
          break;
        default:
          break;
      }
    },

    //获取印章类别
    getMarkType() {
      var data = {
        unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        departId: JSON.parse(localStorage.getItem("userInfo")).currUnitId,
        sysConfig: "8"
      };
      this.$api.sealManage.markMgr
        .getMarkType(data)
        .then(res => {
          console.log("getMarkType", res);
          this.sealTypes = res.yzType;
        })
        .catch(err => {});
    },

    //获取详情
    getMarkDetail() {
      // DAIBAN 1  YIBAN 0
      var data = {
        id: this.id,
        isreadflag: "1",
        saveStatus: this.saveStatus,
        clLx: ""
      };
      if (this.$route.query.type == "modify") {
        data.clLx = "0";
      } else if (this.$route.query.type == "haveto") {
        data.clLx = "1";
      }
      if (this.$route.query.type == "modify") {
        data.isreadflag = "1";
      } else if (this.$route.query.type == "haveto") {
        data.isreadflag = "0";
      }
      this.$api.sealManage.markMgr
        .getMarkDetail(data)
        .then(res => {
          console.log("印章刻制审批详情", res);

          this.bjButtonList.forEach(item => {
            if (item.type == "shouhui" && this.$route.query.type == "haveto") {
              if (res.data.ifShouHui && res.data.ifShouHui == "1") {
                item.show = true;
              } else {
                item.show = false;
              }
            }
          });
          console.log(this.bjButtonList);
          this.form = res.data.view;
          this.form.AuthorFirstDept = res.data.view.yzDept;
          this.form.AuthorFirstDeptID = res.data.view.yzDeptId;
          // this.form.curFirstDeptID = res.data.view.draftDepartmentId; //当前处理人部门Id
          // this.form.curFirstDept = res.data.view.draftDepartment; //当前处理人部门
          this.title = res.data.view.draftOrgan;
          if (res.data.view.beAuthUserName) {
            this.currentUserNames =
              res.data.view.beAuthUserName +
              "（由" +
              res.data.view.currentUser +
              "授权）";
          } else {
            this.currentUserNames = res.data.view.currentUser;
          }
          this.list = res.data.opinion;
          this.isLoginUser =
            this.form.creator ==
            JSON.parse(localStorage.getItem("userInfo")).humanName
              ? true
              : false;
          this.documentNoStatus =
            this.form.documentNo.split("〕")[1].length > 1;

          console.log(this.documentNoStatus, "ppopopopo");
          // for (var key in this.list) {
          //   console.log(key);
          //   this.list[key].filter(item => {
          //     console.log(item, "s");
          //     this.lastOptionTime =
          //       this.lastOptionTime > item.dateTime
          //         ? this.lastOptionTime
          //         : item.dateTime;
          //   });
          // }
          this.getFileList();
        })
        .catch(err => {
          console.log(err);
        });
    },

    //保存
    saveData() {
      console.log(this.form);
      this.$refs["elForm"].validate((valid, object) => {
        if (valid) {
          this.$api.sealManage.markMgr
            .addMark(this.form)
            .then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.id = res.data;
              sessionStorage.setItem("kezhiId", res.data); //记录保存id
              this.getMarkDetail();
            })
            .catch(err => {});
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
    updateData(type) {
      console.log('this.form',this.form)
      this.$refs["elForm"].validate((valid, object) => {
        if (type) {
          if (valid) {
            this.$api.sealManage.markMgr
              .updateMark(this.form)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.getMarkDetail();
              })
              .catch(err => {});
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
        } else {
          this.$api.sealManage.markMgr
            .updateMark(this.form)
            .then(res => {
              this.getMarkDetail();
            })
            .catch(err => {});
        }
      });
    },

    //必填项初始化
    initRule() {
      this.rules = {
        yzType: [
          {
            required: this.requiredFields.yzlb,
            message: "不能为空",
            trigger: "change"
          }
        ],
        yzDeptId: [
          {
            required: this.requiredFields.sqdw,
            message: "不能为空",
            trigger: "change"
          }
        ],
        cdate: [
          {
            required: this.requiredFields.sqrq,
            message: "不能为空",
            trigger: "change"
          }
        ],
        creator: [
          {
            required: this.requiredFields.sqr,
            message: "不能为空",
            trigger: "change"
          }
        ],
        tel: [
          {
            required: this.requiredFields.lxdh,
            message: "不能为空",
            trigger: "change"
          }
        ],
        documentNo: [
          {
            required: this.requiredFields.bh,
            message: "不能为空",
            trigger: "change"
          }
        ],
        reason: [
          {
            required: this.requiredFields.sqly,
            message: "不能为空",
            trigger: "change"
          }
        ],
        yzNewname: [
          {
            required: this.requiredFields.kzyzmc,
            message: "不能为空",
            trigger: "change"
          }
        ],
        yzOldname: [
          {
            required: this.requiredFields.jzmc,
            message: "不能为空",
            trigger: "change"
          }
        ],
        qpYj: [
          {
            required: this.requiredIdeaFields.sqdwzyfzrqp,
            message: "不能为空",
            trigger: "change"
          }
        ],
        yqQzrSp: [
          {
            required: this.requiredIdeaFields.yqqzrsp,
            message: "不能为空",
            trigger: "change"
          }
        ],
        shYj: [
          {
            required: this.requiredIdeaFields.gkglbmsh,
            message: "不能为空",
            trigger: "change"
          }
        ],
        offShYj: [
          {
            required: this.requiredIdeaFields.bgssh,
            message: "不能为空",
            trigger: "change"
          }
        ],
        carvDept: [
          {
            required: this.requiredFields.kzrq,
            message: "不能为空",
            trigger: "change"
          }
        ],
        conCarvDept: [
          {
            required: this.requiredFields.pzkzdw,
            message: "不能为空",
            trigger: "change"
          }
        ],
        carvStatus: [
          {
            required: this.requiredFields.kzqk,
            message: "不能为空",
            trigger: "change"
          }
        ],
        carvDate: [
          {
            required: this.requiredFields.kzrq,
            message: "不能为空",
            trigger: "change"
          }
        ],
        isStartUsing: [
          {
            required: this.requiredFields.sfqy,
            message: "不能为空",
            trigger: "change"
          }
        ],
        usingDate: [
          {
            required: this.requiredFields.qyrq,
            message: "不能为空",
            trigger: "change"
          }
        ],
        joinMethod: [
          {
            required: this.requiredFields.yzjjfs,
            message: "不能为空",
            trigger: "change"
          }
        ],
        getSealDate: [
          {
            required: this.requiredFields.qysj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        getSealPerson: [
          {
            required: this.requiredFields.qyr,
            message: "不能为空",
            trigger: "change"
          }
        ],
        handedSealDate: [
          {
            required: this.requiredFields.jysj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        handedSealPerson: [
          {
            required: this.requiredFields.jyr,
            message: "不能为空",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: this.requiredIdeaFields.bz,
            message: "不能为空",
            trigger: "change"
          }
        ]
      };
    },

    //完成并发送
    async send() {
      this.id == null || this.id == ""
        ? await this.$api.sealManage.markMgr
            .addMark(this.form)
            .then(res => {
              this.id = res.data;
              sessionStorage.setItem("kezhiId", res.data); //记录保存id
              this.getMarkDetail();
            })
            .catch(err => {})
        : "";
      this.$refs["elForm"].validate((valid, object) => {
        if (valid) {
          this.dialogState = true;
          var data = {
            id: this.id
          };
          this.$api.sealManage.markMgr
            .getMarkProcess(data)
            .then(res => {
              this.seletOptionsData = this.shoNextNode(
                res.data.list,
                this.huanJieMessage.acyNodeNextBount
              );
              //带约束条件判断环节
              //过滤重复环节
              let PCSAVYIDs = [];
              this.seletOptionsData = res.data.list.filter(item => {
                if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                  PCSAVYIDs.push(item.PCSAVYID);
                  return item;
                }
              });
            })
            .catch(err => {});
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
    showCompDialog(data, status, type, params, dtype) {
      console.log("提交", data, status, type, params, dtype);
      this.dialogState = false;
      if (status) {
        this.form.currentUser = data[0].name;
        this.form.currentUserId = data[0].idStr.toString();
        this.form.currentNodeId = params.id;
        this.form.currentNode = params.name;
        this.form.clLx = "完成并发送";
        this.$api.sealManage.markMgr
          .doSendMark(this.form)
          .then(res => {
            console.log(res);
            if (res.code === "SUCCESS") {
              this.$intent.closeWindow(this); 
            }
          })
          .catch(err => {});
      }
    },

    //生成编号
    getSealNum(type, v) {
      var data = {
        markOrderType: "5",
        statusType: type
      };
      if (type) {
        if (this.documentNoStatus) {
          this.$message({
            type: "warning",
            message: "已生成编号"
          });
          return;
        }
        data.id = this.id;
      } else {
        data.draftDepartmentId = this.form.yzDeptId;
      }
      if (v) {
        data.fileNo = v;
      }
      this.$api.sealManage
        .getSealNum(data)
        .then(res => {
          console.log("getSealNum", res);
          if (res.codeList) {
            this.bianshow = true;
            this.kongQuelist = res.codeList;
            this.fileNo = res.fileNo;
          } else {
            this.form.documentNo = res.data;
            this.documentNoStatus =
              this.form.documentNo.split("〕")[1].length > 1;
          }
          if (this.id != null && this.id != "") {
            this.updateData(false);
          }
          if (v) {
            this.bianshow = false;
          }
        })
        .catch(err => {});
    },
    isok(v) {
      this.getSealNum(true, v);
    },
    isclose() {
      this.bianshow = false;
    },

    //获取常用批语
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
    //写入批语
    writelistvalue(message) {
      switch (this.clickTypes) {
        case "qpYj":
          this.$set(this.form, "qpYj", message);
          break;
        case "yqQzrSp":
          this.$set(this.form, "yqQzrSp", message);
          break;
        case "shYj":
          this.$set(this.form, "shYj", message);
          break;
        case "offShYj":
          this.$set(this.form, "offShYj", message);
          break;
        case "remark":
          this.$set(this.form, "remark", message);
          break;
      }
    },
    //新增批语
    addCommonUse(data) {
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
    //删除批语
    deleteMassage(data) {
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

    //办结
    end() {
      this.form.clLx = "办结";
      this.$api.sealManage.markMgr
        .doSendMark(this.form)
        .then(res => {
          console.log(res);
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: "办结成功"
            });
            this.$intent.closeWindow(this);
          }
        })
        .catch(err => {});
    },

    //发上级行
    sendSuperior() {
      this.showOrgTree = true;
    },
    getOrgList(org) {
      console.log("org", org);
      if (org && org.deparObj.comDeputyCh) {
        this.form.currentUser = org.deparObj.comDeputyCh;
        this.form.currentUserId = org.deparObj.comDeputyId;
        this.form.currentNode = org.currentNode;
        this.form.currentNodeId = org.PCSAVYID;
        this.form.unitId = org.deparObj.unitCode;
        this.$api.sealManage.markMgr
          .sendSuperior(this.form)
          .then(res => {
            console.log(res);
            if (res.code === "SUCCESS") {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.$intent.closeWindow(this);
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    //返回请示行
    returnSuperior() {
      this.$confirm("是否确定返回请示行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs["elForm"].validate((valid, object) => {
            if (valid) {
              this.$api.sealManage.markMgr
                .returnSuperior(this.form)
                .then(res => {
                  if (res.code === "SUCCESS") {
                    this.$message({
                      type: "success",
                      message: res.msg
                    });
                    this.$intent.closeWindow(this);
                  } else {
                    this.$message({
                      type: "warning",
                      message: res.msg
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              this.$message({
                type: "warning",
                message: "请填写必填项"
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    //归档打印
    print() {},

    //引入印模
    uploadYM() {
      this.isShowFile = true;
    },

    //获取印模列表
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.id
        })
        .then(res => {
          console.log(res);
          this.filesList = res.data;
          console.log(this.filesList, "this.filesList");

          this.$nextTick(() => {
            this.$set(this.uploadConfig, "filesHas", res.data);
          });
          this.getHuanJie();
        })
        .catch(err => {});
    },

    //上传印模
    fileList(files) {
      this.isShowFile = false;
      this.getFileList();
    },

    //删除印模
    deleteRow(id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$api.setSysConfig
          .deleFile({
            id: id
          })
          .then(res => {
            if (res && res.code == "SUCCESS") {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getFileList();
            }
          });
      });
    },
    selectTable_alls() {},

    //查看流程
    getProcess() {
      this.$api.pubInfo
        .Lookcx({
          curProcessInstId: this.form.workflowId,
          subProcessInstId:
            this.form.workflowId == this.form.supWorkflowId
              ? ""
              : this.form.supWorkflowId
        })
        .then(res => {
          console.log(res);
          this.showFlowChart = true;
          this.tableData = res.data;
          this.$nextTick(() => {
            this.$refs.dialogLine.openDialog();
          });
        })
        .catch(err => {});
    },

    getDeptList() {
      this.$api.sealManage.markMgr
        .deptList()
        .then(res => {
          console.log(res);
          this.deptList = res.data;
        })
        .catch(err => {});
    }
  },
  created: function() {
    this.title = JSON.parse(localStorage.unitInfo)[0].unitName;
  },
  mounted() {
    console.log("122222222222222");
    let kezhiId = sessionStorage.getItem("kezhiId"); //记录保存id
    if (kezhiId) {
      this.id = kezhiId;
      this.getMarkDetail();
    }
    console.log(this.$route.query);
    this.deptList = this.$route.query.regionList
      ? JSON.parse(this.$route.query.regionList)
      : [];
    if (!this.$route.query.regionList) {
      this.getDeptList();
    }
    this.saveStatus = this.$route.query.saveStatus;
    this.pageType = this.$route.query.type;
    this.getMarkType();
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.uploadConfig.id = this.id;
      this.getMarkDetail();
    } else {
      var date = new Date();
      var year = date.getFullYear(),
        month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1,
        day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      this.form.cdate = year + "-" + month + "-" + day; //申请日期
      this.form.yzDept = this.$route.query.regionNm; //申请单位
      this.form.yzDeptId = this.$route.query.regionId; //申请单位Id
      // this.form.AuthorFirstDept = this.$route.query.currUnitName; //申请单位Id
      // this.form.AuthorFirstDeptID = this.$route.query.currUnitId; //申请单位Id
      this.form.creator = JSON.parse(
        localStorage.getItem("userInfo")
      ).humanName; //申请人
      this.form.isStartUsing = "否"; //是否启用
      this.form.joinMethod = "自取"; //印章交接方式
      this.form.isKh = this.$route.query.IntrBnk_IndCd; //是否跨行
      this.deptList.forEach(item => {
        if (item.firstUnitId == this.form.yzDeptId) {
          console.log("112121212", item);
          this.form.currentUser = item.humanName; //当前处理人
          this.form.currentUserId = item.humanId; //当前处理人Id
          // this.form.curFirstDeptID = item.firstUnitId; //当前处理人部门Id
          // this.form.curFirstDept = item.firstUnitName; //当前处理人部门
          this.form.tel = item.telMobile; //联系电话
          this.form.draftOrganId = item.unitId; //拟稿机构Id
          this.form.draftOrgan = item.unitName; //拟稿机构
        }
      });
      this.getSealNum(false);
      this.getHuanJie();
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.delBox {
  width: 20px;
  height: 20px;
  text-align: right;
  position: absolute;
  right: -30px;
  top: -6px;
  font-size: 20px;
  cursor: pointer;
}
.adviceInfo {
  line-height: 20px;
  font-size: 14px;
}
.br {
  font-size: 14px;
  line-height: 24px;
  word-wrap: break-word;
  word-break: break-all;
}
.red {
  color: "#E00";
}
.textCenter {
  text-align: center;
}
.drafting {
  background: #fff;
  min-height: 100vh;
  position: relative;
}

// .el-header {
//     width: 100%;
//     background-color: #409eff;
//     color: #333;
//     line-height: 60px;
//     z-index: 2;
// .slider-contaner {
//     width: 100%;
//     height: 60px;
//     overflow: hidden;
//     position: relative;
// }
// .slider {
//     width: 1200px;
//     height: 60px;
// }
// }
.common-header {
  width: 100%;
  display: flex;
  background: #409eff;
  justify-content: space-between;
  align-items: center;
  .back {
    line-height: 60px;
    height: 60px;
    margin-left: 2%;
    color: #eee;
  }
}

.el-main {
  width: 100%;
  .box {
    width: 100%;
    border: 1px solid #f60;
    background: #fef7e7;
    box-sizing: border-box;
    height: 40px;
    margin: 0 0 20px 0;
  }
  .processOffset {
    margin-top: 10px;
    margin-right: 50px;
  }
  /deep/ .el-badge__content {
    height: 22px;
  }
  .title {
    width: 100%;
    min-height: 90px;
    line-height: 90px;
    text-align: center;
    // font-size: 35px;
    // color: #409eff;
    font-size: 44px;
    color: #096dd9;
    font-weight: 500;
  }
  .drafting-mainform {
    width: 92%;
    border: 1px solid #dcdfe6;
    padding: 2% 2%;
    margin: auto;
  }
  .wrap {
    position: relative;
  }
  .wrap::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(100, 100, 1000, 0.2);
    z-index: 1;
  }
  .card-minPadding {
    /deep/ .el-card__body {
      padding: 0 10px;
    }
  }
  .not-show {
    display: none;
  }
  .img-init {
    display: inline-block;
    min-width: 100px;
    min-height: 100px;
    max-width: 400px;
    max-height: 400px;
    border: 1px solid #c5c5c5;
  }
  .my-label {
    width: 100px;
    line-height: 32px;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
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
    border: 1px solid #999;
    border-radius: 2px;
  }
}
.content-container {
  background-color: rgba(228, 231, 237, 0.32);
  border-radius: 4px;
  padding: 4px 6px 0 6px;
  word-break: break-all;
  position: relative;
}
.content-container:hover {
  // border: 1px solid #8996af;
}
.pad_lr10 {
  margin: 0 0 0 16px;
  padding: 0 0 0 10px;
}
.creat_time {
  position: relative;
  top: -10px;
}
.headerClicks {
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: #409eff;
  display: flex;
  .el-button {
    margin: 10px 0 0 10px;
  }
}
.file-list {
  height: 200px;
  padding: 1px 20px;
  overflow: scroll;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .file-item {
    display: flex;
    margin-bottom: 16px;
    .text-default {
      white-space: nowrap;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }
    .btns {
      .margin-default {
        margin-right: 15px;
      }
    }
  }
}
</style>
