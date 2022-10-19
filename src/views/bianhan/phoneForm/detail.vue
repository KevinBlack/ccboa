/**
* create by lyl on 2020/12/18 16:13
* 类注释：秘书工作--电话记录单详情
* 备注：
*/
<template>
  <div class="fileHandleDetail">
    <!-- header START-->
    <span class="title"></span>
    <div class="headerClick" v-if="disabled">
      <el-button
        class="bank_grid_comtent_active"
        v-for="(item,index) in buttonListDone"
        v-show="buttonListDone[index].show"
        @click="buttonClick(item.name)"
        :key="index"
        plain
      >{{item.name}}</el-button>
    </div>
    <div class="headerClick" v-if="!disabled">
      <el-button
        class="bank_grid_comtent_active"
        v-for="(item,index) in buttonList"
        @click="buttonClick(item.name)"
        :key="index"
        v-show="buttonList[index].show"
        plain
      >{{item.name}}</el-button>
    </div>
    <!-- header END -->
    <!--    选择人员树-->
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :fromdata="dataObj"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <div class="shiwuTitle">{{dataForm.draftOrgan}}电话记录单</div>
    <div class="container" id="loadPdf">
      <div class="c-header">
        <span style="margin-left: 16px;">当前环节:</span>
        <span style="color: #f60; color: red !important;">{{dataForm.currentNode}}</span>
        <!-- ({{dataForm.curDeptName}})当前处理人部门 -->
        <span style="margin-left: 30px;">当前处理人:</span>
        <span style="color: #f60; color: red !important;">{{dataForm.currentUser}}</span>
      </div>
      <el-form
        label-position="right"
        id="aaa"
        class="dataForm"
        label-width="80px"
        style="margin-top: 30px;"
        :rules="rules"
        ref="dataForm"
        :model="dataForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="documentNo">
              <el-input v-model="dataForm.documentNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="createDate">
              <el-input v-model="dataForm.createDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-input v-model="dataForm.startTime" :disabled="readFields.sTime || disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-input v-model="dataForm.endTime" :disabled="readFields.eTime || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="通话单位" prop="title">
              <el-input v-model="dataForm.title" :disabled="readFields.Title || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="来电人员" prop="callPle">
              <el-input v-model="dataForm.callPle" :disabled="readFields.callPeople || disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来电人员电话" label-width="120px" prop="callTel">
              <el-input v-model="dataForm.callTel" :disabled="readFields.callTel || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="记录人员" prop="creator">
              <el-input v-model="dataForm.creator" :disabled="readFields.Creator || disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="记录人员电话" label-width="120px" prop="tel">
              <el-input v-model="dataForm.tel" :disabled="readFields.Tel || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="通话内容" prop="callContent">
          <el-input
            type="textarea"
            v-model="dataForm.callContent"
            :disabled="readFields.callContent || disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="办理部门" prop="hqDept">
          <template v-if="this.dataForm.isSend==1">
            <div style="border:1px solid #E4E7ED;background:rgba(224, 224, 224, 0.34);">
              <span
                v-for="(item, index) in hqDeptData"
                :key="index"
                :class="{actColor: item.colorStyle}"
              >{{item.hqDept}}{{hqDeptData[index + 1] ? '，' : ''}}</span>
            </div>
          </template>
          <template v-else>
            <el-select
              v-model="hqDeptData"
              placeholder="请选择"
              style="width:100%"
              :disabled="readFields.hqDept || disabled ||(this.dataForm.isSend==1)"
              value-key="hqDeptId"
              multiple
              @change="selectChange"
            >
              <el-option
                v-for="item in hqDepts"
                :key="item.hqDeptId"
                :label="item.hqDept"
                :value="item"
              ></el-option>
            </el-select>
          </template>
          <el-button
            v-for="(item,index) in buttonRound"
            @click="buttonRoundClick(item.name)"
            :key="index"
            type="primary"
            v-show="buttonRound[index].show"
            size="mini"
            round
          >{{item.name}}</el-button>
          <!-- <el-button v-show="this.zfshShow" type="primary" size="mini" @click.native="increase()"
            round>增发</el-button>
          <el-button v-show="this.zfshShow" type="primary" size="mini" @click.native="bake()"
          round>收回</el-button>-->
        </el-form-item>
        <org-tree
          v-model="showOrgTree1"
          title="选择部门"
          :outBank="false"
          :isSingle="false"
          :orgOrDept="0"
          @orgList="getOrgList1"
        ></org-tree>
        <!-- 传阅收回选人 -->
        <cy-person-list
          v-model="showCyPerson"
          title="选择人员"
          :isSingle="false"
          :data="cyData"
          @personList="cyPersonList"
        ></cy-person-list>
        <!-- <el-dialog title="增加办理部门" :visible.sync="dialogFormVisible">
          <el-form v-model="names" ref="names">
            <el-form-item prop="deptName" style="width:100%">
              <el-select v-model="hqDeptData" placeholder="请选择" style="width:100%" value-key="hqDeptId" multiple
                @change="selectChange">
                <el-option v-for="item in hqDepts" :key="item.hqDeptId" :label="item.hqDept" :value="item"
                  :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="sure">确定</el-button>
          </div>
        </el-dialog>-->
        <!-- <el-dialog title="收回办理部门" :visible.sync="dialogFormVisibleSH">
          <el-form v-model="shouhui" ref="shouhui">
            <el-form-item label="办理部门" prop="hqDept">
              <el-select v-model="hqDeptData" placeholder="请选择" style="width:100%" value-key="hqDeptId" multiple
                @change="selectShouhui">
                <el-option v-for="item in hqDepts" :key="item.hqDeptId" :label="item.hqDept" :value="item"
                  :disabled="true"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="sure1">确定</el-button>
          </div>
        </el-dialog>-->
        <!--     领导批示     -->
        <!-- <el-form-item label="领导批示" prop="leaderIdea">
          <template v-if="dataForm.leaderIdeaList.length!=0">
            <el-row
              v-for="item in dataForm.leaderIdeaList"
              :key="item.id"
              style="margin-bottom: 3px"
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>

          <el-row
            v-if="dataForm.leaderIdeaList && dataForm.leaderIdeaList.length==0 || !editedIdeaFields.LDidea_1"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.leaderIdea"
                :disabled="editedIdeaFields.LDidea_1 || disabled"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="领导批示" prop="leaderIdea">
              <el-row
                v-if="dataForm.leaderIdeaList && dataForm.leaderIdeaList.length==0 || !editedIdeaFields.LDidea_1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.leaderIdea"
                    resize="none"
                    :disabled="editedIdeaFields.LDidea_1"
                  ></el-input>
                </el-col>
                <el-col v-if="!(editedIdeaFields.LDidea_1)" :span="1" style="text-align: right;">
                  <i
                    class="icon-font el-icon-edit select-chang"
                    @click="showWriteList('leaderIdea')"
                  ></i>
                </el-col>
              </el-row>
              <div
                class="d_flex"
                v-if="dataForm.leaderIdeaList && dataForm.leaderIdeaList.length!=0"
              >
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.leaderIdeaList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--     处理意见     -->
        <!-- <el-form-item label="处理意见" prop="proIdea">
          <template v-if="dataForm.receiveIdeaList.length!=0">
            <el-row
              v-for="item in dataForm.receiveIdeaList"
              :key="item.id"
              style="margin-bottom: 3px"
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
          <el-row
            v-if="(dataForm.receiveIdeaList && dataForm.receiveIdeaList.length==0)|| !editedIdeaFields.Proidea_1"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.proIdea"
                :disabled="editedIdeaFields.Proidea_1 || disabled"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="处理意见" prop="proIdea">
              <el-row
                v-if="((dataForm.receiveIdeaList && dataForm.receiveIdeaList.length==0) || !editedIdeaFields.Proidea_1) && this.dataForm.isSend!=1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.proIdea"
                    resize="none"
                    :disabled="editedIdeaFields.Proidea_1"
                  ></el-input>
                </el-col>
                <el-col v-if="!(editedIdeaFields.Proidea_1)" :span="1" style="text-align: right;">
                  <i class="icon-font el-icon-edit select-chang" @click="showWriteList('proIdea')"></i>
                </el-col>
              </el-row>
              <div
                class="d_flex"
                v-if="dataForm.receiveIdeaList && dataForm.receiveIdeaList.length!=0"
              >
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.receiveIdeaList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--     过程意见     -->
        <!-- <el-form-item label="过程意见" prop="processIdea">
          <el-row
            v-if="dataForm.processIdeaList && dataForm.processIdeaList.length==0 || !editedIdeaFields.Gcyjidea_1"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.processIdea"
                :disabled="editedIdeaFields.Gcyjidea_1 || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.processIdeaList.length!=0">
            <el-row
              v-for="item in dataForm.processIdeaList"
              :key="item.id"
              style="margin-bottom: 3px"
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:10px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
        </el-form-item>-->
        <el-row v-if="isShowProcessComments">
          <el-col :span="24">
            <el-form-item label="过程意见" prop="processIdea">
              <el-row
                v-if="(dataForm.processIdeaList && dataForm.processIdeaList.length==0 || !editedIdeaFields.Gcyjidea_1) && this.dataForm.isSend!=1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.processIdea"
                    resize="none"
                    :disabled="editedIdeaFields.Gcyjidea_1 || this.dataForm.isSend==1"
                  ></el-input>
                </el-col>
                <el-col
                  v-if="!(editedIdeaFields.Gcyjidea_1 || this.dataForm.isSend==1)"
                  :span="1"
                  style="text-align: right;"
                >
                  <i
                    class="icon-font el-icon-edit select-chang"
                    @click="showWriteList('processIdea')"
                  ></i>
                </el-col>
              </el-row>
              <div
                class="d_flex"
                v-if="dataForm.processIdeaList && dataForm.processIdeaList.length!=0"
              >
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.processIdeaList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--     部门办理情况     -->
        <!-- <el-form-item label="部门办理情况" prop="deptIdea">
          <el-row
            v-if="(dataForm.deptIdeaList && dataForm.deptIdeaList.length==0) || !editedIdeaFields.zzyj"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.deptIdea"
                :disabled="editedIdeaFields.zzyj || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.deptIdeaList.length!=0">
            <el-row v-for="item in dataForm.deptIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="部门办理情况" prop="deptIdea">
              <el-row
                v-if="(dataForm.deptIdeaList && dataForm.deptIdeaList.length==0) || !editedIdeaFields.zzyj"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.deptIdea"
                    resize="none"
                    :disabled="editedIdeaFields.zzyj"
                  ></el-input>
                </el-col>
                <el-col v-if="!editedIdeaFields.zzyj" :span="1" style="text-align: right;">
                  <i class="icon-font el-icon-edit select-chang" @click="showWriteList('deptIdea')"></i>
                </el-col>
              </el-row>
              <div class="d_flex" v-if="dataForm.deptIdeaList && dataForm.deptIdeaList.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.deptIdeaList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--     备注区域     -->
        <!-- <el-form-item label="备注" prop="remark">
          <el-row
            v-if="(dataForm.remarkList && dataForm.remarkList.length==0) ||!editedIdeaFields.Remark_1"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.remark"
                :disabled="editedIdeaFields.Remark_1 || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.remarkDealList&&dataForm.remarkDealList.length!=0">
            <el-row
              v-for="item in dataForm.remarkDealList"
              :key="item.id"
              style="margin-bottom: 3px"
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
          <template v-if="dataForm.remarkList.length!=0">
            <el-row v-for="item in dataForm.remarkList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-row
                v-if="((dataForm.remarkList && dataForm.remarkList.length==0) ||!editedIdeaFields.Remark_1) && this.dataForm.isSend!=1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.remark"
                    resize="none"
                    :disabled="editedIdeaFields.Remark_1"
                  ></el-input>
                </el-col>
              </el-row>
              <div class="d_flex" v-if="dataForm.remarkList && dataForm.remarkList.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.remarkList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件 " prop="attachid">
          <el-row>
            <el-col :span="24">
              <upload-file-ts
                :uploadConfig="uploadConfig"
                :fileId="fileId"
                @fileList="fileList"
                v-if="isShow"
              ></upload-file-ts>
              <upfileList :canmoveOrdown="isShow" label :fileList="dataForm.attchmentFileInfo"></upfileList>
            </el-col>
          </el-row>
          <!-- <el-row v-if="dataForm.attchmentFileInfo&&dataForm.attchmentFileInfo.length">
            <el-form-item>
              <el-col>
                <div
                  class="tree_w"
                  v-if="dataForm.attchmentFileInfo&&dataForm.attchmentFileInfo.length"
                >
                  <el-scrollbar>
                    <div
                      v-for="(item,index) in  dataForm.attchmentFileInfo"
                      :key="item.id"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_file">
                          <span class="name" @click="viewFile(item)">{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              v-show = "isShow"
                              @click.native="upRow(index,QS)"
                              v-if="dataForm.attchmentFileInfo.length>1"
                              :disabled="index==0"
                              round
                            >上移</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              v-show = "isShow"
                              @click.native="downRow(index,QS)"
                              v-if="dataForm.attchmentFileInfo.length>1"
                              :disabled="index==dataForm.attchmentFileInfo.length-1"
                              round
                            >下移</el-button>
                            <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index,item.id)"
                              :disabled="item.disabled"
                              v-show = "isShow"
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
          </el-row>-->
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="办理状态" :visible.sync="handleStateDialog" center>
      <el-table :data="stateData">
        <el-table-column prop="TMS" label="发送时间" width="150"></el-table-column>
        <el-table-column prop="UNITNM" label="部门" width="150"></el-table-column>
        <el-table-column prop="STATUS" label="办理状态"></el-table-column>
        <el-table-column prop="AVYEXCTRNM" label="处理人" width="150"></el-table-column>
        <el-table-column prop="ENDTM" label="结束时间"></el-table-column>
      </el-table>
    </el-dialog>
    <checkFlowDialog :tableData="showFlowData" ref="dialogLine" v-dialogDrag></checkFlowDialog>

    <!--    常用批语-->
    <appendWriteList
      :offenDevices="offenDevices"
      ref="writelist"
      v-if="appendWriteDialog"
      @childsaveselect="writelistvalue"
      @addCommonUse="addCommonUse"
      @deleId="deleteMassage"
    ></appendWriteList>
  </div>
</template>

<script>
import appendWriteList from "components/viewFlow/perWrit";
import checkFlowDialog from "@/components/viewFlow/shiwuFlow";
import selectPerson from "components/tree/treeTansun";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/phonenote.js";
import minixs from "@/minixs/index";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import upfileList from "../components/showUploadFile"; //附件展示
import orgTree from "components/tree/orgTree";
import cyPersonList from "../components/cyPersonList";
import commonCall from "../minixs/commonCall.js";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "phoneDetail",
  components: {
    uploadFileTs,
    selectPerson,
    checkFlowDialog,
    upfileList,
    orgTree,
    cyPersonList,
    appendWriteList
  },
  mixins: [minixs, commonCall,viewDraft],

  data() {
    return {
      numYear: '',
      isShowProcessComments: false, // 是否展示过程意见
      cyData: [],
      showCyPerson: false,
      showOrgTree1: false,
      isShow: false,
      dialogFormVisible: false,
      fileId: "",
      currentUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前处理人id
      lastOptionTime: 0, //最新意见时间
      handleStateDialog: false,
      showFlowChart: false,
      isSaved: false,
      dataObj: {},
      loadingTree: false,
      hqDepts: [],
      currentUser: "",
      curDeptName: "",
      humanId: "",
      isTackBack: false,
      addNewSug: false,
      names: {
        hqDeptData: ""
      },
      shouhui: {
        hqDeptData: ""
      },
      stateData: [
        {
          TMS: "2020-10-20",
          UNITNM: "",
          STATUS: "",
          AVYEXCTRNM: "",
          ENDTM: ""
        }
      ],
      showFlowData: [],
      actionType: "1",
      disabled: false,
      id: "",
      fileArr: [],
      identify: 0,
      rules: {},
      //人员数相关配置
      canTab: false,
      dialogVisible: false,
      dialogFormVisibleSH: false,
      treeData: [{ name: "中国建设银行", id: "007" }],
      seletOptionsData: [],
      offenUse: true,
      dialogType: "dosend",
      dialogTypeNow: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false, //显示隐藏
      dataForm: {
        currentNode: "",
        currentNodeId: "",
        currentUser: "",
        documentNo: "",
        createDate: "",
        startTime: "",
        endTime: "",
        callPle: "",
        callTel: "",
        creator: "",
        tel: "",
        fromDept: "",
        fileCode: "",
        title: "",
        hqDept: "",
        hqDeptId: "",
        leaderIdea: "",
        receiveIdea: "",
        processIdea: "",
        callContent: "",
        remark: "",
        attachId: "",
        isReadFlag: "",
        remarkList: [],
        receiveIdeaList: [],
        processIdeaList: [],
        leaderIdeaList: [],
        deptIdeaList: []
      },
      oldhqDeptData: "",
      list: [],
      oldId: "",
      oldName: "",
      listName: "",
      hqDeptData: [],
      backFlag1: "",
      uploadConfig: {
        formId: "phoneHandleForm",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      //流程环节信息
      flowLinkInfo: {},
      buttonListDone: [
        { name: "关闭", type: "close", show: true },
        { name: "收回", type: "tackBack", show: false },
        { name: "查看办理状态", type: "checkHandleState", show: true },
        { name: "查看流程", type: "checkFlow", show: true },
        { name: "打印处理单", type: "printHandleNote", show: true },
        { name: "收藏", type: "sc", show: true },
        // {name: '流程调度'},
        { name: "操作指南", type: "operatorGuide", show: true }
      ],
      buttonRound: [
        { name: "增发", type: "addDepartment", show: false },
        { name: "收回", type: "backDepartment", show: false }
      ],
      buttonList: [
        { name: "关闭", type: "close", show: false },
        { name: "保存", type: "save", show: true },
        { name: "完成并发送", type: "btn_wangchengsendtd", show: false },
        { name: "删除此文", type: "deletefile", show: false },
        { name: "发送办理部门", type: "btn_sendhq", show: false },
        { name: "查看办理状态", type: "checkHandleState", show: false },
        { name: "生成编号", type: "gemeratenum", show: false },
        { name: "收回", type: "tackBack", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "查看流程", type: "checkFlow", show: false },
        { name: "打印处理单", type: "printHandleNote", show: false },
        { name: "收藏", type: "sc", show: false },
        { name: "操作指南", type: "operatorGuide", show: false },
        { name: "维护", type: "maintain", show: false },
        { name: "流程调度", type: "flowDispatch", show: false }
      ],
      //不可编辑控制域
      readFields: {
        sTime: false, //开始时间
        eTime: false, //结束时间
        Title: false, //通话单位
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false, //日程
        callPeople: false, //来电人员
        callTel: false, //来电人员电话
        Creator: false, //记录人员
        Tel: false, //记录人员电话
        callContent: false //通话内容
      },
      //必填控制域
      requiredFields: {
        sTime: false, //开始时间
        eTime: false, //结束时间
        Title: false, //通话单位
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false, //日程
        callPeople: false, //来电人员
        callTel: false, //来电人员电话
        Creator: false, //记录人员
        Tel: false, //记录人员电话
        callContent: false //通话内容
      },
      //可编辑意见域
      editedIdeaFields: {
        LDidea_1: true, //领导批示
        Proidea_1: true, //处理意见
        Gcyjidea_1: true, //过程意见
        zzyj: true, //部门办理情况
        Remark_1: true //备注
      },
      //必填意见域
      requiredIdeaFields: {
        LDidea_1: false, //领导批示
        Proidea_1: false, //处理意见
        Gcyjidea_1: false, //过程意见
        zzyj: false, //部门办理情况
        Remark_1: false //备注
      }
    };
  },
  mounted() {},
  computed: {},
  created() {
    const query = this.$route.query || {}
    this.numYear = query.numYear || ''
    if (this.$route.query.params) {
      this.$set(this.dataForm, "curUserDeptId", this.$route.query.params);
    }
    this.actionType = this.$route.query.identify;

    const draftOrgan = JSON.parse(localStorage.getItem("userInfo")).unitName;
    this.curDeptName = JSON.parse(
      localStorage.getItem("userInfo")
    ).shortCurrUnitName;
    this.currentUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
    this.humanId = JSON.parse(localStorage.getItem("userInfo")).humanId;
    //起草环节从缓存中取值，否则取接口中返回值
    if (this.actionType === "4") {
      this.isShowProcessComments = true;
      this.dataForm.currentNode = "申请人拟稿";
      this.dataForm.currentUser = this.currentUser;
      this.dataForm.curDeptName = this.curDeptName;
      this.dataForm.draftOrgan = draftOrgan;
      this.getHandleDeps();
      this.getControlArea();
    }
    else {
      this.dataForm.id = this.$route.query.id;
      this.uploadConfig.id = this.$route.query.id;
      this.getDetailIfo();
      // this.getFileList();
    }
    if (
      (this.actionType === "0" || this.actionType === "4") &&
      (this.dataForm.currentNode == "起草" ||
        this.dataForm.currentNode == "申请人拟稿")
    ) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    console.log(this.isShow, "creata");
  },
  methods: {
    cyPersonList(data) {
      data.map(item1 => {
        this.dataForm.hqDeptId = this.dataForm.hqDeptId
          .split(",")
          .filter(item => {
            console.log(item, item1.hqDeptId, item != item1.hqDeptId);
            return item != item1.hqDeptId;
          })
          .join(",");
      });
      data.map(item1 => {
        this.dataForm.hqDept = this.dataForm.hqDept
          .split(",")
          .filter(item => {
            console.log(item, item1.hqDept, item != item1.hqDept);
            return item != item1.hqDept;
          })
          .join(",");
      });
      this.list = data.map(item => item.hqDeptId).join(",");
      this.sure1();
    },
    getOrgList1(data) {
      let ids = [],
        names = [];
      data.forEach(item => {
        // ids.push(item.id.split("/")[0]);
        ids.push(item.id);
        names.push(item.unitName);
      });
      if (ids.length != 0) {
        this.dataForm.hqDeptId = this.dataForm.hqDeptId + "," + ids.join(",");
        this.dataForm.hqDept = this.dataForm.hqDept + "," + names.join(",");
        this.sure(ids.join(","), names.join(","));
      }
    },
    selectShouhui(val) {
      console.log("11111");
      console.log(this.hqDeptData, "shu");
      console.log(this.oldhqDeptData, "old");

      let hqDept = this.hqDeptData;
      let names = [];
      let nameId = [];
      for (let i = 0; i < hqDept.length; i++) {
        nameId.push(hqDept[i].hqDeptId);
        names.push(hqDept[i].hqDept);
      }
      let newArr = [];
      let newArrName = [];
      newArr = this.oldhqDeptData.split(",");
      newArrName = this.oldhqDeptDataName.split(",");

      if (newArr.length != nameId.length) {
        this.list = newArr.filter(item => {
          return nameId.indexOf(item) === -1;
        });
      }

      if (newArr.length != nameId.length) {
        this.dataForm.hqDeptId = newArr.filter(item => {
          return nameId.indexOf(item) !== -1;
        });
      }

      if (newArrName.length != names.length) {
        this.dataForm.hqDept = newArrName.filter(item => {
          return names.indexOf(item) !== -1;
        });
      }

      this.list = this.list.join(",");

      this.dataForm.hqDept = this.dataForm.hqDept.join(",");
      this.dataForm.hqDeptId = this.dataForm.hqDeptId.join(",");
      console.log(this.list, "shanchu");
      console.log(this.listName, "shanchu Name");
    },
    // increase() {
    //   //apis.getUserPersondh({}).then(res => {
    //   //let hqDept = this.hqDeptData;
    //   // let names = [];
    //   //let nameId = [];
    //   //for (let i = 0; i < hqDept.length; i++) {
    //   //nameId.push(hqDept[i].hqDeptId);
    //   //names.push(hqDept[i].hqDept);
    //   // }
    //   //this.dataForm.hqDeptId = nameId.join(",");
    //   //this.dataForm.hqDept = names.join(",");

    //   // });
    //   this.dialogFormVisible = true;
    //   this.oldName = this.dataForm.hqDept;
    //   this.oldId = this.dataForm.hqDeptId;
    // },

    sure(id, name) {
      console.log("dianji");
      console.log(this.dataForm);

      apis
        .increase({
          ...this.dataForm,
          newDeptIds: id,
          newDeptNames: name
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            var that = this;
            this.$alert(
              res.msg.split("##")[0] + "<br/>" + res.msg.split("##")[1],
              {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                type: "warning"
              }
            ).finally(() => {
              that.$router.go(0);
            });
          }
        })
        .catch(res => {
          this.$alert(
            res.msg.split("##")[0] + "<br/>" + res.msg.split("##")[1],
            {
              confirmButtonText: "确定",
              dangerouslyUseHTMLString: true,
              type: "warning"
            }
          );
        });
      this.dialogFormVisible = false;
    },
    sure1() {
      console.log("dianji");
      apis
        .bake({ ...this.dataForm, deleteDeptIds: this.list })
        .then(res => {
          if (res.code === "SUCCESS") {
            var that = this;
            this.$alert(
              res.msg.split("##")[0] + "<br/>" + res.msg.split("##")[1],
              {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                type: "warning"
              }
            ).finally(() => {
              that.$router.go(0);
            });
          }
        })
        .catch(res => {
          this.$alert(
            res.msg.split("##")[0] + "<br/>" + res.msg.split("##")[1],
            {
              confirmButtonText: "确定",
              dangerouslyUseHTMLString: true,
              type: "warning"
            }
          );
        });
      this.dialogFormVisibleSH = false;
    },
    // bake() {
    //   //this.shouhuil=document.getElementById('banli').value;

    //   this.dialogFormVisibleSH = true;
    // },
    //办理状态格式化
    formatter(row, column, cellValue, index) {
      for (let item in row) {
        // if (item === "STATUS") {
        //   switch (row[item]) {
        //     case "04":
        //       row[item] = "待领取";
        //       break;
        //     case "11":
        //       row[item] = "创建";
        //       break;
        //     case "10":
        //       row[item] = "运行";
        //       break;
        //     case "09":
        //       row[item] = "挂起";
        //       break;
        //     case "12":
        //       row[item] = "完成";
        //       break;
        //     case "13":
        //       row[item] = "终止";
        //       break;
        //     case "14":
        //       row[item] = "被删除";
        //       break;
        //     default:
        //       break;
        //   }
        return row.DealOrder.currentNode;
        // }
      }
    },
    //设置部门名称
    selectChange() {
      let hqDept = this.hqDeptData;
      let names = [];
      let nameId = [];
      for (let i = 0; i < hqDept.length; i++) {
        nameId.push(hqDept[i].hqDeptId);
        names.push(hqDept[i].hqDept);
      }
      this.dataForm.hqDeptId = nameId.join(",");
      this.dataForm.hqDept = names.join(",");
    },
    //校验手机号
    checkPhone(rule, value, callback) {
      let isTel = true,
        isPhone = true;
      const reg = /[\u4e00-\u9fa5]/; //中文
      // const reg1 = /^(\d{3,4}-)?\d{7,8}$/; //座机：区号-号码
      if (reg.test(value)) {
        isTel = false;
      }
      // if (!reg1.test(value)) {
      //   isPhone = false;
      // }

      if (!isTel) {
        return callback(new Error("请输入正确的手机号或座机号"));
      } else {
        callback();
      }
    },
    //初始化校验规则
    initRules() {
      this.rules = {
        startTime: [
          {
            required: this.requiredFields.sTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: this.requiredFields.eTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        hqDept: [
          {
            required: this.requiredFields.hqDept,
            message: "不能为空",
            trigger: "change"
          }
        ],
        documentNo: [
          {
            required: this.requiredFields.Findex,
            message: "不能为空",
            trigger: "change"
          }
        ],
        createDate: [
          {
            required: this.requiredFields.createDate,
            message: "不能为空",
            trigger: "change"
          }
        ],
        title: [
          {
            required: this.requiredFields.Title,
            message: "不能为空",
            trigger: "change"
          }
        ],
        callPle: [
          {
            required: this.requiredFields.callPeople,
            message: "不能为空",
            trigger: "change"
          }
        ],
        callTel: [
          {
            required: this.requiredFields.callTel,
            message: "不能为空",
            trigger: "change"
          },
          {
            message: "输入正确手机号",
            validator: this.checkPhone,
            trigger: "blur"
          }
        ],
        creator: [
          {
            required: this.requiredFields.Creator,
            message: "不能为空",
            trigger: "change"
          }
        ],
        tel: [
          {
            required: this.requiredFields.Tel,
            message: "不能为空",
            trigger: "change"
          }
        ],
        attachid: [
          {
            required: this.requiredFields.attachid,
            message: "不能为空",
            trigger: "change"
          }
        ], //附件ID

        deptIdea: [
          {
            required: this.requiredIdeaFields.zzyj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        leaderIdea: [
          {
            required: this.requiredIdeaFields.LDidea_1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        proIdea: [
          {
            required: this.requiredIdeaFields.Proidea_1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        processIdea: [
          {
            required: this.requiredIdeaFields.Gcyjidea_1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: this.requiredIdeaFields.Remark_1,
            message: "不能为空",
            trigger: "change"
          }
        ]
      };
    },
    buttonRoundClick(params) {
      switch (params) {
        case "增发":
          this.showOrgTree1 = true;
          // this.increase();
          break;
        case "收回":
          this.cyData = this.hqDeptData.map(item => {
            return {
              ...item,
              id: item.hqDeptId,
              name: item.hqDept
            };
          });
          this.showCyPerson = true;
          // this.bake();
          break;
        default:
          break;
      }
    },
    //按钮控制
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.onClose();
          break;
        case "保存":
          this.save();
          break;
        case "完成并发送":
          this.dataForm.handleButton = undefined;
          this.save()
            .then(res => {
              if (
                this.requiredFields.Findex == true &&
                this.dataForm.documentNo == ""
              ) {
                this.$message({
                  type: "warning",
                  message: "请先生成编号"
                });
              } else {
                if (
                  this.backFlag1 &&
                  !!this.dataForm.oldUserCode &&
                  (this.dataForm.currentNode != "起草" ||
                    this.dataForm.currentNode != "申请人拟稿")
                ) {
                  this.$confirm(
                    "是否返回" + this.dataForm.oldUserName + "?",
                    "提示",
                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      customClass: "but_model",
                      type: "warning"
                    }
                  )
                    .then(() => {
                      this.dataForm.handleButton = "完成并发送";
                      this.backPerson();
                    })
                    .catch(() => {
                      this.send("完成并发送");
                    });
                } else {
                  this.send("完成并发送");
                }
              }
            })
            .catch(error => {
              this.$message.warning(error.msg);
            });

          break;
        case "办结":
          this.toEnd("办结");
          break;
        case "查看流程":
          if (this.dataForm.id) {
            this.checkFlow();
          } else {
            this.$message({
              message: "请保存之后操作",
              type: "warning"
            });
          }
          break;
        case "生成编号":
          this.buildNo();
          break;
        case "删除此文":
          this.deletefile();
          break;
        case "查看办理状态":
          if (this.dataForm.id) {
            this.checkState();
          } else {
            this.$message({
              message: "请保存之后操作",
              type: "warning"
            });
          }
          break;
        case "打印处理单":
          if (this.dataForm.id) {
            this.onPrint();
          } else {
            this.$message({
              message: "请保存之后操作",
              type: "warning"
            });
          }
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
              apis.collecTion({ id: this.dataForm.id, numYear: this.numYear }).then(res => {
                console.log(res);
                this.downFile(res);
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
          this.handBook("MSGZ");
          break;
        case "流程调度":
          this.send("流程调度");
          break;
        case "发送办理部门":
          this.toHandleDep();
          break;
        case "维护":
          this.maintain();
          break;
        case "收回":
          this.tackBack();
          break;
        default:
          break;
      }
    },
    //删除意见域
    deleteItem(val) {
      apis
        .adminPhoneNoteDel({ id: val.id })
        .then(res => {
          if ((res.code = "SUCCESS")) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getDetailIfo();
          }
        })
        .catch(err => {
          this.$message({
            type: "success",
            message: err.msg
          });
        });
    },
    //返回上一处理人
    backPerson() {
      apis
        .backPersondhcld({
          ...this.dataForm
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.$intent.closeWindow(this);
          } else {
            this.$intent.closeWindow(this);
          }
        });
    },
    //获取附件列表

    getFileList() {
      const data = {
        id: this.dataForm.id,
        numYear: this.numYear
      };
      this.$api.setSysConfig.getTextemList(data).then(res => {
        //      console.log("44",res);
        // this.$Set(this.dataForm, "attchmentFileInfo", res.data);
        this.dataForm.attchmentFileInfo = res.data;
        this.uploadConfig.filesHas = this.dataForm.attchmentFileInfo;
        this.$forceUpdate();
      });
    },
    //获取文件处理单详情

    getDetailIfo() {
      this.actionType = this.$route.query.identify
      const data = {
        id: this.dataForm.id,
        btnType: this.actionType,
        numYear: this.numYear
      };
      apis
        .phoneDetail(data)
        .then(res => {
          if (res.code === "SUCCESS") {
            console.log(res.data);
            this.$nextTick(() => {
              const data = res.entity;
              // res.entity.remarkList = res.remark;
              if (res.remark && res.remark.length > 0) {
                res.entity.remarkList = res.remark.filter(item => {
                  this.lastOptionTime =
                    this.lastOptionTime > item.createTime
                      ? this.lastOptionTime
                      : item.createTime;
                  return item;
                });
              } else {
                res.entity.remarkList = res.remark;
              }
              // res.entity.remarkDealList = res.remarkDeal;
              if (res.remarkDeal && res.remarkDeal.length > 0) {
                res.entity.remarkDealList = res.remarkDeal.filter(item => {
                  this.lastOptionTime =
                    this.lastOptionTime > item.createTime
                      ? this.lastOptionTime
                      : item.createTime;
                  return item;
                });
              } else {
                res.entity.remarkDealList = res.remarkDeal;
              }
              // res.entity.receiveIdeaList = res.receiveIdea;
              if (res.receiveIdea && res.receiveIdea.length > 0) {
                res.entity.receiveIdeaList = res.receiveIdea.filter(item => {
                  this.lastOptionTime =
                    this.lastOptionTime > item.createTime
                      ? this.lastOptionTime
                      : item.createTime;
                  return item;
                });
              } else {
                res.entity.receiveIdeaList = res.receiveIdea;
              }
              // res.entity.processIdeaList = res.processIdea;
              if (res.processIdea && res.processIdea.length > 0) {
                res.entity.processIdeaList = res.processIdea.filter(item => {
                  this.lastOptionTime =
                    this.lastOptionTime > item.createTime
                      ? this.lastOptionTime
                      : item.createTime;
                  return item;
                });
              } else {
                res.entity.processIdeaList = res.processIdea;
              }
              // res.entity.deptIdeaList = res.deptIdea;
              if (res.deptIdea && res.deptIdea.length > 0) {
                res.entity.deptIdeaList = res.deptIdea.filter(item => {
                  this.lastOptionTime =
                    this.lastOptionTime > item.createTime
                      ? this.lastOptionTime
                      : item.createTime;
                  return item;
                });
              } else {
                res.entity.deptIdeaList = res.deptIdea;
              }
              // res.entity.leaderIdeaList = res.leaderIdea;
              if (res.leaderIdea && res.leaderIdea.length > 0) {
                res.entity.leaderIdeaList = res.leaderIdea.filter(item => {
                  this.lastOptionTime =
                    this.lastOptionTime > item.createTime
                      ? this.lastOptionTime
                      : item.createTime;
                  return item;
                });
              } else {
                res.entity.leaderIdeaList = res.leaderIdea;
              }
              this.backFlag1 = res.backFlag1;
              this.dataForm = res.entity;
              this.dataObj = res.entity;
              this.fileId = res.entity.id;
              this.uploadConfig.id = res.entity.id;
              console.log("chuli wenjinallllllllkkkkkkkkkkkkkkkk");
              // let id = res.entity.hqDept.split(",");
              // let name = res.entity.hqDeptId.split(",");
              let id = [];
              let name = [];
              if (res.entity.hqDept) {
                id = res.entity.hqDept.split(",");
              }
              if (res.entity.hqDeptId) {
                name = res.entity.hqDeptId.split(",");
              }
              let hqDeptData = [];
              hqDeptData = id.map((item, index) => {
                return { hqDept: item, hqDeptId: name[index] };
              });
              if (res.dealOrderList && res.dealOrderList.length > 0) {
                hqDeptData = hqDeptData.map(item => {
                  const dealItem = res.dealOrderList.find(
                    deal => deal.remark2 === item.hqDeptId
                  );
                  console.log(dealItem, "dealItem");
                  if (dealItem && dealItem.archDate) {
                    item.colorStyle = false;
                  } else {
                    item.colorStyle = true;
                  }
                  return item;
                });
              }
              this.hqDeptData = hqDeptData;
              if (
                (this.actionType === "0" || this.actionType === "4") &&
                (this.dataForm.currentNode == "起草" ||
                  this.dataForm.currentNode == "申请人拟稿")
              ) {
                this.isShow = true;
              } else {
                this.isShow = false;
              }
              this.oldhqDeptData = res.entity.hqDeptId;
              this.oldhqDeptDataName = res.entity.hqDept;
              //判断是否新增了意见并已经保存过
              this.getHandleDeps();
              if (
                this.dataForm.leaderIdea ||
                this.dataForm.deptIdea ||
                this.dataForm.processIdea ||
                this.dataForm.receiveIdea ||
                this.dataForm.remark
              ) {
                this.addNewSug = true;
              }
              if (this.actionType === "0" || this.isSaved) {
                this.getControlArea();

                this.disabled = false;
              } else {
                this.disabled = true;
              }

              // 判断 在已办时 是否显示 收回 按钮
              const userInfo = localStorage.getItem("userInfo")
                ? JSON.parse(localStorage.getItem("userInfo"))
                : {};
              if (
                this.actionType === "1" &&
                data.isReadFlag === "0" &&
                userInfo.humanCode == this.dataForm.oldUserCode
              ) {
                console.log("ceshi");
                let tackBackIndex = undefined;
                const tackBack = this.buttonListDone.find((item, index) => {
                  const bool = item.type === "tackBack";
                  if (bool) {
                    tackBackIndex = index;
                  }
                  return bool;
                });
                tackBack.show = true;
                this.$set(this.buttonListDone, tackBackIndex, tackBack);
              }

              // 判断是否暂时过程意见
                this.isShowProcessComments = ([
                  "N02020110514901",
                  "N02020110514907",
                  "N02020110514902",
                  "N02020110514903"
                ].includes(this.dataForm.currentNodeId) && this.actionType == "0") ||
                (["N02020110514901",
                  "N02020110514907",
                  "N02020110514902",
                  "N02020110514903","N02020110514904"].includes(this.dataForm.currentNodeId) && this.actionType == "1" && this.dataForm.supNodeCode != "N02020110514906");


              this.getFileList();
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.msg
          });
        });
    },
    fileList(files) {
      if (
        this.dataForm.attchmentFileInfo &&
        this.dataForm.attchmentFileInfo.length
      ) {
        this.dataForm.attchmentFileInfo.push(...files);
        // this.getFileList();
      } else {
        this.dataForm.attchmentFileInfo = files;
      }
      this.uploadConfig.filesHas = this.dataForm.attchmentFileInfo;
      if (!this.dataForm.attachs) {
        this.dataForm.attachs = [];
      }
      files.forEach(item => {
        this.dataForm.attachs.push(item.id);
      });
      this.dataForm.attach = this.dataForm.attachs.join(",");
      this.dataForm.attachid = this.dataForm.attachs.join(",");
      this.$forceUpdate();
    },
    //打印处理单
    onPrint() {
      const routerData = this.$router.resolve({
        path: "/phoneHandlePrintDetail",
        query: {
          id: this.dataForm.id,
          type: "1",
          addNewSug: this.isSaved || this.addNewSug,
          title: "电话记录单",
          numYear: this.numYear
        }
      });
      window.open(routerData.href, "_blank");
    },
    //关闭按钮
    onClose() {
      if (this.actionType === "0" || this.actionType === "4") {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              if (this.id || this.dataForm.id) {
                apis.edit(this.dataForm).then(res => {
                  if (res.code == "SUCCESS") {
                    this.isSaved = true;
                    this.$message({
                      type: "success",
                      message: "更新成功！"
                    });
                  }
                });
              } else {
                this.$refs["dataForm"].validate(valid => {
                  if (valid) {
                    apis.addNew(this.dataForm).then(res => {
                      if (res.code == "SUCCESS") {
                        this.isSaved = true;
                        this.dataForm.id = res.data;
                        this.id = res.data;
                        this.fileId = res.data;
                        this.uploadConfig.id = res.data;
                        this.$message({
                          type: "success",
                          message: "保存成功！"
                        });
                      }
                    });
                  }
                });
              }
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$intent.closeWindow(this);
      }
    },
    //保存按钮
    save(val) {
      let _this = this;
      //如果已经保存过，走更新接口(: (value?: any) => void,
      return new Promise((resolve, reject) => {
        _this.$refs["dataForm"].validate(valid => {
          if (valid) {
            if (_this.dataForm.id) {
              apis
                .edit(_this.dataForm)
                .then(res => {
                  if (res.code == "SUCCESS") {
                    _this.isSaved = true;
                    _this.$message({
                      type: "success",
                      message: "更新成功！"
                    });
                    _this.getDetailIfo();
                    if (val) {
                      _this.selectOrgAndPerson(val);
                    } else {
                      _this.$forceUpdate();
                    }
                  }
                  resolve(res);
                })
                .catch(err => {
                  _this.isSaved = false;
                  _this.$message({
                    type: "error",
                    message: err.msg
                  });
                });
            } else {
              apis
                .addNew(_this.dataForm)
                .then(res => {
                  if (res.code == "SUCCESS") {
                    _this.isSaved = true;
                    _this.dataForm.id = res.data;
                    _this.id = res.data;
                    _this.fileId = res.data;
                    _this.uploadConfig.id = res.data;
                    _this.$intent.replace(_this, {
                      path: "/bianhan/phoneForm/detail",
                      query: { identify: "0", id: _this.id }
                    });
                    apis.phoneDetail({ id: res.data, numYear: this.numYear }).then(res => {
                      _this.$forceUpdate();
                      _this.dataObj = res.entity;
                      // _this.dataForm = res.entity;
                      _this.dataForm = { ..._this.dataForm, ...res.entity };
                      console.log("_this.dataObj", _this.dataObj);
                    });
                    // _this.getDetailIfo();
                    _this.$message({
                      type: "success",
                      message: "保存成功！"
                    });
                    if (
                      _this.dataForm.attachid &&
                      _this.dataForm.attachid.length > 0
                    ) {
                      _this.createFile();
                    }
                    _this.getControlArea();
                    if (val) {
                      _this.selectOrgAndPerson(val);
                    } else {
                      _this.$forceUpdate();
                    }
                    resolve(res);
                  }
                })
                .catch(err => {
                  _this.isSaved = false;
                  _this.$message({
                    type: "error",
                    message: err.msg
                  });
                });
            }
          }
        });
      });
    },
    //办结
    toEnd(val) {
      if (
        this.dataForm.processIdea ||
        (this.dataForm.processIdeaList &&
          this.dataForm.processIdeaList.length > 0)
      ) {
        if (
          this.requiredFields.Findex == true &&
          this.dataForm.documentNo == ""
        ) {
          this.$message({
            type: "warning",
            message: "请先生成编号"
          });
        } else {
          this.$confirm("是否办结").then(() => {
            this.selectOrgAndPerson(val);
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "过程意见未填写"
        });
      }
    },
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.dataForm.id,
          fileId: this.dataForm.attachid,
          fileType: "0"
        })
        .then(res => {});
    },
    //选人成功-完成并发送/
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
        data &&
          data.map(item => {
            item.id = "" + item.id;
            console.log("item.id", item.id);
            if (item.id.indexOf("#") > -1) {
              // let itemId = item.id.split('#')[0]
              // id_name.push(itemId + '_' + item.name)
              chooseDataName.push(item.name);
              chooseDataId.push(item.id);
            } else if (item.id.indexOf("#") == -1) {
              // id_name.push(item.id + '_' + item.name)
              chooseDataName.push(item.name);
              let itemId = item.id + "#" + item.deptId;
              chooseDataId.push(itemId);
            }
          });
        // console.log("------选人----", chooseDataName)
        this.dataForm.currentUser = chooseDataName.join(",");
        this.dataForm.currentUserId = chooseDataId.join(",");
        this.dataForm.currentNodeId = params.id;
        this.dataForm.currentNode = params.name;
        apis
          .phoneDoneAndSend({ ...this.dataForm, handleButton: "完成并发送" })
          .then(res => {
            if (res.code === "SUCCESS") {
              this.$intent.closeWindow(this);
              this.$message({
                type: "success",
                message: res.msg
              });
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: err.msg
            });
          });
      }
    },
    //获取控制域信息
    getControlArea() {
      const that = this;
      // const id = that.actionType !== "4" ? that.dataForm.id : "";
      apis
        .getControlArea({
          id: that.dataForm.id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            console.log("------------------------------");
            console.log("res.Fields", res.Fields);
            that.flowLinkInfo = res.Fields;
            that.setConfig();
            that.initRules();
          }
        });
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.flowLinkInfo.requiredFields
      );
      this.readFields = this.setReadFields(
        this.readFields,
        this.flowLinkInfo.readFields
      ); //不可编辑控制域
      this.buttonList = this.showButton(
        this.buttonList,
        this.flowLinkInfo.visibleButtons,
        this.flowLinkInfo.visibleButtonsBycondition
      ); //按钮
      this.buttonRound = this.showButton(
        this.buttonRound,
        this.flowLinkInfo.visibleButtons,
        this.flowLinkInfo.visibleButtonsBycondition
      ); //按钮
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.flowLinkInfo.editedIdeaFields,
        this.flowLinkInfo.editedIdeaFieldsBycondition
      ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.flowLinkInfo.requiredIdeaFields
      ); //可编辑意见域
      // console.log("----rules----", this.buttonList);
    },

    //完成并发送按钮
    send(val) {
      const _this = this;
      _this.$refs["dataForm"].validate((valid, aa) => {
        if (valid) {
          if (!_this.dataForm.id) {
            // _this.save(val);
            apis
              .addNew(_this.dataForm)
              .then(res => {
                if (res.code === "SUCCESS") {
                  _this.isSaved = true;
                  _this.dataForm.id = res.data;
                  _this.id = res.data;
                  _this.fileId = res.data;
                  _this.uploadConfig.id = res.data;
                  apis.phoneDetail({ id: _this.id, numYear: this.numYear }).then(res => {
                    _this.$forceUpdate();
                    _this.dataObj = res.entity;
                    // _this.dataForm = res.entity;
                    _this.dataForm = { ..._this.dataForm, ...res.entity };
                    console.log("_this.dataObj", _this.dataObj);
                    apis
                      .getControlArea({
                        id: _this.dataForm.id
                      })
                      .then(res => {
                        if (res.code === "SUCCESS") {
                          console.log("------------------------------");
                          console.log("res.Fields", res.Fields);
                          _this.flowLinkInfo = res.Fields;
                          _this.setConfig();
                          _this.initRules();
                          apis
                            .getPersonTree({
                              ..._this.dataObj
                            })
                            .then(res => {
                              _this.loadingTree = true;
                              _this.dialogState = true;
                              _this.seletOptionsData = res.data.list;
                              // _this.seletOptionsData = _this.shoNextNode(
                              //   _this.seletOptionsData,
                              //   _this.huanJieMessage.acyNodeNextBount
                              // );
                            });
                          _this.dataForm.handleButton = val;
                        }
                      });
                  });
                  _this.$message({
                    type: "success",
                    message: "保存成功！"
                  });
                  if (
                    _this.dataForm.attachid &&
                    _this.dataForm.attachid.length > 0
                  ) {
                    _this.createFile();
                  }
                }
              })
              .catch(err => {
                _this.isSaved = false;
                _this.$message({
                  type: "error",
                  message: err.msg
                });
              });
          } else {
            apis.phoneDetail({ id: _this.dataForm.id,btnType: this.actionType, numYear: this.numYear }).then(res => {
              _this.$forceUpdate();
              _this.dataObj = res.entity;
              // _this.dataForm = res.entity;
              _this.dataForm = { ..._this.dataForm, ...res.entity };
              _this.selectOrgAndPerson(val);
            });

          }
        } else {
          console.log("aa", aa);
          _this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    //选择机构人员-完成并发送
    selectOrgAndPerson(val) {
      const _this = this;
      if (val === "完成并发送") {
        _this.dataForm.handleButton = val;
        apis
          .getPersonTree({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.loadingTree = true;
            _this.dialogState = true;
            _this.seletOptionsData = res.data.list;
            // console.log(res.data.result.data, _this.treeData)
            // this.$forceUpdate();
            // let PCSAVYIDs = [];
            // _this.seletOptionsData = res.list.filter(item => {
            //   if (!PCSAVYIDs.includes(item.PCSAVYID)) {
            //     PCSAVYIDs.push(item.PCSAVYID);
            //     return item;
            //   }
            // });
            // _this.seletOptionsData = _this.shoNextNode(
            //   _this.seletOptionsData,
            //   _this.huanJieMessage.acyNodeNextBount
            // );
          });
        // .catch(err => {
        //   _this.$message({
        //     type: "error",
        //     message: err.msg
        //   });
        // });
      } else if (val === "流程调度") {
        apis
          .flowDispatch({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.seletOptionsData = res.data;
            _this.dialogState = true;
          });
        // .catch(err => {
        //   _this.$message({
        //     type: "error",
        //     message: err.msg
        //   });
        // });
        _this.dataForm.handleButton = "完成并发送";
      } else {
        _this.dataForm.handleButton = val;
        apis.phoneDoneAndSend(this.dataForm).then(res => {
          if (res.code === "SUCCESS") {
            _this.$intent.closeWindow(this);
            _this.$message({
              type: "success",
              message: "办结完成"
            });
          }
        });
        // .catch(err => {
        //   _this.$message({
        //     type: "error",
        //     message: err.msg
        //   });
        // });
      }
    },
    deletefile() {
      apis
        .deletefile(this.dataForm)
        .then(res => {
          console.log("---删除此文---", res);
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.$intent.closeWindow(this);
          } else {
            this.$message({
              type: "warning",
              message: res.data
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.msg
          });
        });
    },
    //生成编号
    buildNo() {
      apis
        .buildNo(this.dataForm)
        .then(res => {
          console.log("---生成编号---", res);
          if (res.code === "SUCCESS") {
            this.$set(this.dataForm, "documentNo", res.data);
            this.$message({
              type: "success",
              message: res.msg
            });
            apis.edit(this.dataForm).then(res => {
              this.getDetailIfo();
            });
          } else {
            this.$message({
              type: "warning",
              message: res.data
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.msg
          });
        });
    },
    //收回
    tackBack() {
      this.$confirm("是否收回", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          apis.tackBack({ id: this.dataForm.id }).then(res => {
            if (res.code === "SUCCESS") {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.$intent.closeWindow(this);
            }
          });
        })
        .catch(res => {
          this.$message({
            type: "warning",
            message: res.msg
          });
        });
      // apis
      //   .tackBack({ id: this.dataForm.id })
      //   .then(res => {
      //     if (res.code === "SUCCESS") {
      //       this.$alert(res.msg, {
      //         confirmButtonText: "确定",
      //         dangerouslyUseHTMLString: true,
      //         type: "warning"
      //       }).finally(() => {
      //         this.$intent.closeWindow(this);
      //       });
      //     }
      //   })
      //   .catch(res => {
      //     this.$alert(res.msg, {
      //       confirmButtonText: "确定",
      //       dangerouslyUseHTMLString: true,
      //       type: "warning"
      //     });
      //   });
    },
    //发送至办理部门
    toHandleDep() {
      apis
        .sendToHandleDep(this.dataForm)
        .then(res => {
          console.log("发送至办理部门---", res);
          if (res.code === "SUCCESS") {
            this.$alert(
              res.msg.split("##")[0] + "<br/>" + res.msg.split("##")[1],
              {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                type: "warning"
              }
            ).finally(() => {
              this.$intent.closeWindow(this);
            });
          }
        })
        .catch(err => {
          this.$alert(
            res.msg.split("##")[0] + "<br/>" + res.msg.split("##")[1],
            {
              confirmButtonText: "确定",
              dangerouslyUseHTMLString: true,
              type: "warning"
            }
          );
        });
    },
    //获取办理部门和日期
    getHandleDeps() {
      apis.getHandleDeps().then(res => {
        console.log("----获取办理部门和日期---", res);
        if (res.code === "SUCCESS") {
          if (this.actionType === "4") {
            this.dataForm.createDate = res.date;
            this.dataForm.creator = res.creator;
            this.dataForm.tel = res.tel;
          }
          this.hqDepts = res.hqDept;
        }
      });
      // .catch(err => {
      //   this.$message({
      //     type: "error",
      //     message: err.msg
      //   });
      // });
    },
    //查看办理状态
    checkState() {
      apis
        .checkState({ id: this.dataForm.id, numYear: this.numYear })
        .then(res => {
          console.log("查看办理状态", res);
          if (res.code === "SUCCESS") {
            this.stateData = res.data;
            this.handleStateDialog = true;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.msg
          });
        });
    },

    //查看流程
    checkFlow() {
      const _this = this;
      apis
        .checkFlow({ id: this.dataForm.id, numYear: this.numYear })
        .then(res => {
          if (res.code === "SUCCESS") {
            console.log("查看流程", res);
            // _this.showFlowChart = true;
            _this.showFlowData = res.data;
            console.log(_this.showFlowData);
            _this.$forceUpdate();
            _this.$nextTick(() => {
              _this.$refs.dialogLine.openDialog();
            });
          }
        })
        .catch(err => {
          _this.$message({
            type: "error",
            message: err.msg
          });
        });
    },

    //维护
    maintain() {
      apis
        .editOrMatainanFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              message: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.msg
          });
        });
    },
    //流程调度
    flowDispatch() {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          apis
            .flowDispatchNote({
              id: _this.dataForm.id
            })
            .then(res => {
              _this.seletOptionsData = res.data;
              _this.dialogState = true;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          _this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    //下载
    onLoad() {
      exportTable.getPdf("xiazai", [], "loadPdf");
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.dataForm.attchmentFileInfo[n - 1].id,
          sort: this.dataForm.attchmentFileInfo[n].sort
        },
        {
          id: this.dataForm.attchmentFileInfo[n].id,
          sort: this.dataForm.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.dataForm.attchmentFileInfo[n];
      this.dataForm.attchmentFileInfo[n] = this.dataForm.attchmentFileInfo[
        n - 1
      ];
      this.dataForm.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },

    downRow(n) {
      let midObj;
      let attachSort = [];
      console.log(n, "huanjie", huanjie);
      attachSort.push(
        {
          id: this.dataForm.attchmentFileInfo[n + 1].id,
          sort: this.dataForm.attchmentFileInfo[n].sort
        },
        {
          id: this.dataForm.attchmentFileInfo[n].id,
          sort: this.dataForm.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.dataForm.attchmentFileInfo[n];
      this.dataForm.attchmentFileInfo[n] = this.dataForm.attchmentFileInfo[
        n + 1
      ];
      this.dataForm.attchmentFileInfo[n + 1] = midObj;
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
                this.dataForm.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.dataForm.attchmentFileInfo;
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
    // 常用批语数据写入
    writelistvalue(data) {
      console.log("常用批语数据写入", this.clickTypes, data);
      if (this.clickTypes && data) {
        const newValue = (this.dataForm[this.clickTypes] || "") + data;
        this.$set(
          this.dataForm,
          this.clickTypes,
          newValue && newValue.length > 500
            ? newValue.substring(0, 500)
            : newValue
        );
      }
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
// 在reset.css 文件中有人设置了，位移60px，在此将其重置为0，不修改 reset.css 文件
.but_model {
  .el-message-box__btns {
    .el-button {
      transform: translateX(0px) !important;
    }
  }
}
</style>

<style scoped lang="less" rel="stylesheet/less">
.fileHandleDetail {
  background-color: #ffffff !important;
}

.el-header {
  background-color: rgb(64, 158, 255);
  line-height: 60px;
}

.title {
  color: #ffffff;
}

.btn {
  float: right;
}

.btnstyle {
  color: rgb(14, 117, 214);
}

.btnstyle:hover {
  background-color: rgb(14, 117, 214);
  color: cornsilk;
}

.shiwuTitle {
  width: 100%;
  min-height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}

.container {
  width: 92%;
  min-height: 920px;
  padding: 20px 16px;
  margin: 0 auto;
  border: 1px solid #ccc;
}

.c-header {
  width: 95%;
  margin-left: 5%;
  height: 40px !important;
  margin-bottom: 20px;
  line-height: 40px;
  // border: 1px solid #f9aa21;
  border: 1px solid #f60;
  background: #fef7e7;
}

.el-table .cell {
  white-space: pre-line;
}

.el-form-item ::v-deep {
  margin-bottom: 12px;
}

.form-word {
  width: 80px;
  float: left;
  line-height: 20px;
  font-size: 14px;
  color: #606266;
  text-align: center;
}

.pad_lr10 {
  padding: 0 10px;
}

// .d_flex {
//   // position: relative;
//       border: 1px solid #ccc;
//     padding-left: 10px;
// }
.d_b10001 {
  border: 1px solid #ccc;
  padding-left: 15px;
  background-color: #e4e7ed52 !important;
}

.advice {
  word-wrap: break-word;
}

.adviceInfo {
  // position: absolute;
  bottom: 0;
  right: 10px;
}

/* 附件上传之后的模板 */
.comp_list {
  padding: 10px;

  .name {
    padding-left: 30px;
  }
}

.command_file {
  width: 100%;
  padding-bottom: 10px;
}
.actColor {
  color: red;
}
</style>