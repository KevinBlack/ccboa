<template>
  <div class="fileHandleDetail">
    <div>
      <!-- <div class="btn">
        <template v-if="disabled">
          <el-button
            v-for="(item,index) in buttonListDone"
            @click="buttonClick(item.name)"
            :key="index"
            size="mini"
            plain
          >{{item.name}}</el-button>
        </template>
        <el-button v-if="isTackBack" @click="tackBack">收回</el-button>

        <template v-if="!disabled">
          <el-button
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.name)"
            :key="index"
            v-show="buttonList[index].show"
            size="mini"
            plain
          >{{item.name}}</el-button>
        </template>
      </div>-->
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
      <!-- <div class="">文件处理单00000000000000</div> -->
    </div>
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
      v-dialogDrag
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <div class="shiwuTitle">{{dataForm.draftOrgan}}文件处理单</div>
    <div class="container" id="loadPdf">
      <div class="c-header">
        <span style="margin-left: 16px;">当前环节:</span>
        <span style="color: #f60; color: red !important;">{{dataForm.currentNode}}</span>
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
              <el-input v-model="dataForm.documentNo" :disabled="readFields.Findex || disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="createDate">
              <el-input v-model="dataForm.createDate" :disabled="readFields.createDate || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="来文单位" prop="fromDept">
              <el-input v-model="dataForm.fromDept" :disabled="readFields.FromDept || disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文号" prop="fileCode">
              <el-input v-model="dataForm.fileCode" :disabled="readFields.FileCode || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文件标题" prop="title">
          <el-input v-model="dataForm.title" :disabled="readFields.Title || disabled"></el-input>
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
                <el-option v-for="item in hqDepts" :key="item.hqDepId" :label="item.hqDept" :value="item"
                  :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="sure">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="收回办理部门" :visible.sync="dialogFormVisibleSH">
          <el-form v-model="shouhui" ref="shouhui">
            <el-form-item label="办理部门" prop="hqDept">
              <el-select v-model="hqDeptData" placeholder="请选择" style="width:100%" value-key="hqDeptId" multiple
                @change="selectShouhui">
                <el-option v-for="item in hqDepts" :key="item.hqDepId" :label="item.hqDept" :value="item"
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
          <el-row
            v-if=" (dataForm.leaderIdeaList &&　dataForm.leaderIdeaList.length==0)  || !editedIdeaFields.LDidea"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.leaderIdea"
                :disabled="editedIdeaFields.LDidea || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.leaderIdeaList && dataForm.leaderIdeaList.length!=0">
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
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="领导批示" prop="leaderIdea">
              <el-row
                v-if=" (dataForm.leaderIdeaList &&　dataForm.leaderIdeaList.length==0)  || !editedIdeaFields.LDidea"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.leaderIdea"
                    resize="none"
                    :disabled="editedIdeaFields.LDidea"
                  ></el-input>
                </el-col>
                <el-col v-if="!editedIdeaFields.LDidea" :span="1" style="text-align: right;">
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
        <!--     收文部门拟办意见     -->
        <!-- <el-form-item label="收文部门拟办意见" prop="receiveIdea">
          <el-row
            v-if="(dataForm.receiveIdeaList && dataForm.receiveIdeaList.length==0) || !editedIdeaFields.Proidea"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.receiveIdea"
                :disabled="editedIdeaFields.Proidea || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.receiveIdeaList && dataForm.receiveIdeaList.length!=0">
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
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="收文部门拟办意见" prop="receiveIdea">
              <el-row
                v-if="(dataForm.receiveIdeaList && dataForm.receiveIdeaList.length==0 || !editedIdeaFields.Proidea) && this.dataForm.isSend!=1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.receiveIdea"
                    resize="none"
                    :disabled="editedIdeaFields.Proidea"
                  ></el-input>
                </el-col>
                <el-col v-if="!editedIdeaFields.Proidea" :span="1" style="text-align: right;">
                  <i
                    class="icon-font el-icon-edit select-chang"
                    @click="showWriteList('receiveIdea')"
                  ></i>
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
            v-if="(dataForm.processIdeaList && dataForm.processIdeaList.length==0) || !editedIdeaFields.Gcyjidea"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.processIdea"
                :disabled="editedIdeaFields.Gcyjidea || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.processIdeaList && dataForm.processIdeaList.length!=0">
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
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
        </el-form-item>-->
        <el-row v-if="isShowProcessComments">
          <el-col :span="24">
            <el-form-item label="过程意见" prop="processIdea">
              <el-row
                v-if="(dataForm.processIdeaList && dataForm.processIdeaList.length==0 || !editedIdeaFields.Gcyjidea) && this.dataForm.isSend!=1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.processIdea"
                    resize="none"
                    :disabled="editedIdeaFields.Gcyjidea"
                  ></el-input>
                </el-col>
                <el-col v-if="!editedIdeaFields.Gcyjidea" :span="1" style="text-align: right;">
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
            v-if=" (dataForm.deptIdeaList && dataForm.deptIdeaList.length==0) || (!editedIdeaFields.HQidea)"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.deptIdea"
                :disabled="editedIdeaFields.HQidea || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.deptIdeaList && dataForm.deptIdeaList.length!=0">
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
                v-if="dataForm.deptIdeaList && dataForm.deptIdeaList.length==0 || !editedIdeaFields.HQidea"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.deptIdea"
                    resize="none"
                    :disabled="editedIdeaFields.HQidea"
                  ></el-input>
                </el-col>
                <el-col v-if="!editedIdeaFields.HQidea" :span="1" style="text-align: right;">
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
            v-if="(dataForm.remarkList&&dataForm.remarkList.length==0)||!editedIdeaFields.Remark"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.remark"
                :disabled="editedIdeaFields.Remark || disabled"
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
          <template v-if="dataForm.remarkList && dataForm.remarkList.length!=0">
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
                v-if="dataForm.remarkList && dataForm.remarkList.length==0 || !editedIdeaFields.Remark"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.remark"
                    resize="none"
                    :disabled="editedIdeaFields.Remark"
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
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件" prop="attachid">
              <el-row>
                <el-col :span="24">
                  <upload-file-ts
                    :uploadConfig="uploadConfig"
                    :fileId="fileId"
                    @fileList="fileList"
                    v-if="isShow"
                  ></upload-file-ts>
                  <upfileList :canmoveOrdown="isShow" label :fileList="dataForm.attchmentFileInfo"></upfileList>
                  <!-- <upfileList
                    :canmoveOrdown="true"
                    label
                    :fileList="dataForm.attchmentFileInfo"
                    v-else
                  ></upfileList>-->
                </el-col>
              </el-row>
              <!-- <el-row v-if="dataForm.attchmentFileInfo&&dataForm.attchmentFileInfo.length">
                <el-form-item>
                  <el-col :span="24">
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
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="upRow(index,QS)"
                                  v-if="dataForm.attchmentFileInfo.length>1"
                                  :disabled="index==0"
                                  v-show = "isShow"
                                  round
                                >上移</el-button>
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="downRow(index,QS)"
                                  v-show = "isShow"
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
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog title="办理状态" :visible.sync="handleStateDialog" center>
      <el-table :data="stateData">
        <el-table-column prop="TMS" label="发送时间" width="200"></el-table-column>
        <el-table-column prop="UNITNM" label="部门" width="200"></el-table-column>
        <el-table-column prop="STATUS" label="办理状态"></el-table-column>
        <el-table-column prop="AVYEXCTRNM" label="处理人" width="200"></el-table-column>
        <el-table-column prop="ENDTM" label="结束时间"></el-table-column>
      </el-table>
    </el-dialog>
    <checkFlowDialog :tableData="tableData" ref="dialogLine" v-dialogDrag></checkFlowDialog>

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
import checkFlowDialog from "@/components/viewFlow/shiwuFlow";
import selectPerson from "components/tree/treeTansun";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "@/minixs/exportTable";
import formatFormFild from "views/bianhan/components/formatFormFiled";
import apis from "@/httpTansun/api/secreatary/fileHandle.js";
import minixs from "@/minixs/index";
import upfileList from "./components/showUploadFile"; //附件展示
import orgTree from "components/tree/orgTree";
import cyPersonList from "./components/cyPersonList";
import appendWriteList from "components/viewFlow/perWrit";
import commonCall from "./minixs/commonCall.js";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "fileHandleDetail",
  components: {
    uploadFileTs,
    selectPerson,
    checkFlowDialog,
    upfileList,
    orgTree,
    cyPersonList,
    appendWriteList
    // formatFormFild
  },
  mixins: [minixs, commonCall,viewDraft],

  data() {
    return {
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      isShowProcessComments: false, // 当前阶段是否展示过程意见
      cyData: [],
      showCyPerson: false,
      showOrgTree1: false,
      dialogFormVisible: false,
      dialogFormVisibleSH: false,
      fileId: "",
      currentUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前处理人id
      lastOptionTime: 0, //最新意见时间
      handleStateDialog: false,
      showFlowChart: false,
      isSaved: false,
      dataObj: {},
      loadingTree: false,
      hqDepts: {},
      currentUser: "",
      curDeptName: "",
      humanId: "",
      isTackBack: false,
      addNewSug: false,
      stateData: [
        {
          TMS: "2020-10-20",
          UNITNM: "",
          STATUS: "",
          AVYEXCTRNM: "",
          ENDTM: ""
        }
      ],
      tableData: [],
      actionType: "1",
      disabled: false,
      isShow: false,
      id: "",
      fileArr: [],
      identify: 0,
      rules: {},
      //人员数相关配置
      canTab: false,
      dialogVisible: false,
      treeData: [{ name: "中国建设银行", id: "007" }],
      seletOptionsData: [],
      offenUse: true,
      dialogType: "dosend",
      dialogTypeNow: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false, //显示隐藏
      names: {
        hqDeptData: ""
      },
      shouhui: {
        hqDeptData: ""
      },
      dataForm: {
        draftOrganFullName: "",
        currentNode: "",
        currentNodeId: "",
        currentUser: "",
        documentNo: "",
        createDate: "",
        fromDept: "",
        fileCode: "",
        title: "",
        hqDept: "",
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
      oldhqDeptDataName: "",
      list: "",
      listName: "",
      hqDeptData: [],
      uploadConfig: {
        formId: "fileHandleForm",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      backFlag1: "",
      //流程环节信息
      flowLinkInfo: {},
      buttonListDone: [
        { name: "关闭", type: "close", show: true },
        { name: "收回", type: "tackBack", show: false },
        { name: "查看办理状态", type: "checkHandleState", show: true },
        { name: "查看流程", type: "checkFlow", show: true },
        { name: "打印处理单", type: "printHandleNote", show: true },
        { name: "收藏", type: "sc", show: true },
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
        FromDept: false, //来文单位
        FileCode: false, //文号
        Title: false, //标题
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false //日程
      },
      //必填控制域
      requiredFields: {
        FromDept: false, //来文单位
        FileCode: false, //文号
        Title: false, //标题
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false //日程
      },
      //可编辑意见域
      editedIdeaFields: {
        LDidea: true, //领导批示
        Proidea: true, //收文部门拟办意见
        Gcyjidea: true, //过程意见
        HQidea: true, //部门办理情况
        Remark: true //备注
      },
      //必填意见域
      requiredIdeaFields: {
        HQidea: false, //部门办理情况
        LDidea: false, //领导批示
        Proidea: false, //收文部门拟办意见
        Gcyjidea: false, //过程意见
        Remark: false //备注
      }
    };
  },
  mounted() {},
  computed: {},
  created() {
    if (this.$route.query.params) {
      this.$set(this.dataForm, "curUserDeptId", this.$route.query.params);
    }
    // this.$set(this.dataForm,"curUserDeptId" , this.$route.query.params.currUnitId)
    const draftOrgan = JSON.parse(localStorage.getItem("userInfo")).unitName;
    this.actionType = this.$route.query.identify;

    this.curDeptName = JSON.parse(
      localStorage.getItem("userInfo")
    ).shortCurrUnitName;
    this.currentUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
    this.humanId = JSON.parse(localStorage.getItem("userInfo")).humanId;
    if (this.actionType === "4") {
      this.isShowProcessComments = true;
      this.dataForm.currentNode = "起草";
      this.dataForm.currentUser = this.currentUser;
      this.dataForm.curDeptName = this.curDeptName;
      this.dataForm.draftOrgan = draftOrgan;
      this.getHandleDeps();
      this.getControlArea();
    } else {
      this.id = this.$route.query.id;
      this.dataForm.id = this.$route.query.id;
      this.uploadConfig.id = this.$route.query.id;
      this.getDetailIfo();
      // this.getFileList();
    }
    if (
      (this.actionType === "0" || this.actionType === "4") &&
      (this.dataForm.currentNode == "起草" ||
        this.dataForm.currentNode == "拟稿")
    ) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    console.log(this.isShow, "this.isShow create");
  },
  methods: {
    cyPersonList(data) {
      //  this.dataForm.hqDeptId = this.dataForm.hqDeptId.split(',').filter(item=>data.some(item1=>item!=item1.hqDeptId)).join(',');
      //   this.dataForm.hqDept = this.dataForm.hqDept.split(',').filter(item=>data.some(item1=>item!=item1.hqDept)).join(',');
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
      console.log(this.list);
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
    // },

    sure(id, name) {
      console.log("dianji");
      apis
        .increase({
          ...this.dataForm,
          newDeptIds: id,
          newDeptNames: name
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            var that = this;
            this.showOrgTree1 = false;
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
          } else {
            var that = this;
            setTimeout(function() {
              that.$router.go(0);
            }, 2000);
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

      // this.dialogFormVisible = false;
    },
    sure1() {
      console.log("dianji");
      apis.bake({ ...this.dataForm, deleteDeptIds: this.list }).then(res => {
        if (res.code === "SUCCESS") {
          var that = this;
          this.showCyPerson = false;
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
        } else {
          var that = this;
          setTimeout(function() {
            that.$router.go(0);
          }, 2000);
        }
      });

      // this.dialogFormVisibleSH = false;
    },
    // bake() {
    //   //this.shouhuil=document.getElementById('banli').value;

    //   this.dialogFormVisibleSH = true;
    // },
    //办理状态格式化
    formatter(row, column, cellValue, index) {
      for (let item in row) {
        // if (item === "STATUS") {
        // switch (row[item]) {
        //   case "04":
        //     row[item] = "待领取";
        //     break;
        //   case "11":
        //     row[item] = "创建";
        //     break;
        //   case "10":
        //     row[item] = "运行";
        //     break;
        //   case "09":
        //     row[item] = "挂起";
        //     break;
        //   case "12":
        //     row[item] = "完成";
        //     break;
        //   case "13":
        //     row[item] = "终止";
        //     break;
        //   case "14":
        //     row[item] = "被删除";
        //     break;
        //   default:
        //     break;
        // }
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
    //初始化校验规则
    initRules() {
      this.rules = {
        fromDept: [
          {
            required: this.requiredFields.FromDept,
            message: "不能为空",
            trigger: "change"
          }
        ],
        fileCode: [
          {
            required: this.requiredFields.FileCode,
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
        attachid: [
          {
            required: this.requiredFields.attachid,
            message: "不能为空",
            trigger: "change"
          }
        ], //附件ID

        deptIdea: [
          {
            required: this.requiredIdeaFields.HQidea,
            message: "不能为空",
            trigger: "change"
          }
        ],
        leaderIdea: [
          {
            required: this.requiredIdeaFields.LDidea,
            message: "不能为空",
            trigger: "change"
          }
        ],
        receiveIdea: [
          {
            required: this.requiredIdeaFields.Proidea,
            message: "不能为空",
            trigger: "change"
          }
        ],
        processIdea: [
          {
            required: this.requiredIdeaFields.Gcyjidea,
            message: "不能为空",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: this.requiredIdeaFields.Remark,
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
          // this.send("完成并发送");
          this.dataForm.handleButton = undefined;
          this.save()
            .then(res => {
              if (
                this.requiredFields.Findex == true &&
                this.requiredFields.Findex == true &&
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
                    this.dataForm.currentNode != "拟稿")
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
          if (
            this.requiredFields.Findex == true &&
            this.dataForm.documentNo == ""
          ) {
            this.$message({
              type: "warning",
              message: "请先生成编号"
            });
          } else {
            this.toEnd("办结");
          }

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
        case "操作指南":
          this.readMe();
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
              apis.collecTion({ id: this.dataForm.id,numYear:this.numyear }).then(res => {
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
        default:
          break;
      }
    },
    //删除意见域
    deleteItem(val) {
      apis
        .adminFileDealDel({ id: val.id })
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
        .backPersonwjcld({
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
        numYear:this.numyear
      };
      this.$api.setSysConfig.getTextemList(data).then(res => {
        //      console.log("44",res);
        //  this.$Set(this.dataForm, "attchmentFileInfo", res.data);
        this.dataForm.attchmentFileInfo = res.data;
        this.uploadConfig.filesHas = this.dataForm.attchmentFileInfo;
        this.$forceUpdate();
      });
    },
    //获取文件处理单详情

    getDetailIfo() {
      this.actionType = this.$route.query.identify
      const data = {
        id: this.id,
        btnType: this.actionType,
        numYear:this.numyear
      };
      apis.fileDetail(data).then(res => {
        if (res.code === "SUCCESS") {
          this.$nextTick(() => {
            const data = res.entity;

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
            this.dataForm = res.entity;
            this.dataObj = res.entity;
            this.backFlag1 = res.backFlag1;
            this.fileId = res.entity.id;
            this.uploadConfig.id = res.entity.id;
            let id = [];
            let name = [];
            if (res.entity.hqDept) {
              id = res.entity.hqDept.split(",");
            }
            if (res.entity.hqDeptId) {
              name = res.entity.hqDeptId.split(",");
            }
            // let id = res.entity.hqDept.split(",");
            // let name = res.entity.hqDeptId.split(",");
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
            console.log(this.hqDeptData, "this.hqDeptData");

            // res.dealOrderList.forEach((item, index) => {
            //   console.log(item,'3333333333333333333333');
            //   this.hqDeptData.push({
            //     hqDept: item.curDeptName,
            //     hqDeptId: item.curUserDeptId
            //   });
            // });
            if (
              (this.actionType === "0" || this.actionType === "4") &&
              (this.dataForm.currentNode == "起草" ||
                this.dataForm.currentNode == "拟稿")
            ) {
              this.isShow = true;
            } else {
              this.isShow = false;
            }

            // id.forEach((item, index) => {
            //   this.hqDeptData.push({ hqDept: item, hqDeptId: name[index] });
            // });
            this.oldhqDeptData = res.entity.hqDeptId;
            this.oldhqDeptDataName = res.entity.hqDept;
            this.getHandleDeps();
            //判断是否新增了意见并已经保存过
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

            // 在 已办 时， 判断显示 收回 按钮
            const userInfo = localStorage.getItem("userInfo")
              ? JSON.parse(localStorage.getItem("userInfo"))
              : {};
            if (
              this.actionType === "1" &&
              data.isReadFlag === "0" &&
              userInfo.humanCode == this.dataForm.oldUserCode
            ) {
              let tackBackIndex = undefined;
              const tackBack = this.buttonListDone.find((item, index) => {
                const bool = item.type === "tackBack";
                if (bool) tackBackIndex = index;
                return bool;
              });
              tackBack.show = true;
              this.$set(this.buttonListDone, tackBackIndex, tackBack);
            }

            // 判断 当前阶段是否展示过程意见
            this.isShowProcessComments = ([
              "N02020110514901",
              "N02020110514907",
              "N02020110514902",
              "N02020110514903"
            ].includes(this.dataForm.currentNodeId) && this.actionType == "0") ||
            ([
              "N02020110514901",
              "N02020110514907",
              "N02020110514902",
              "N02020110514903", "N02020110514904"
            ].includes(this.dataForm.currentNodeId) && this.actionType == "1" && this.dataForm.supNodeCode != "N02020110514906");

            this.getFileList();
          });
        }
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
      if (this.id) {
        this.$intent.goNewPage(this, {
          path: "/printdetail",
          query: {
            id: this.dataForm.id,
            type: 1,
            numYear:this.numyear,
            addNewSug: this.isSaved || this.addNewSug,
            title: "文件处理单"
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "请先保存数据"
        });
      }

      // console.log(this.id,'获取id')
      // const routerData = this.$router.resolve({
      //   path: "/printdetail",
      //   query: {
      //     id: this.dataForm.id,
      //     type: 1,
      //     addNewSug: this.isSaved || this.addNewSug,
      //     title: "文件处理单"
      //   }
      // });
      // window.open(routerData.href, "_blank");
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
                apis.editOrMatainanFile(this.dataForm).then(res => {
                  if (res.code === "SUCCESS") {
                    this.$message({
                      type: "success",
                      message: "数据已更新并保存成功！"
                    });
                  }
                });
              } else {
                this.$refs["dataForm"].validate(valid => {
                  if (valid) {
                    apis.saveFile(this.dataForm).then(res => {
                      if (res.code === "SUCCESS") {
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
        // this.$confirm("是否保存并当前页面?", "提示", {
        //   confirmButtonText: "确定",
        //   cencelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        //     this.save(val);
        //     this.$intent.closeWindow(this);
        //   })
        //   .catch(() => {
        //     this.$intent.closeWindow(this);
        //   });
      } else {
        // this.$confirm("是否退出当前页面?", "提示", {
        //   confirmButtonText: "确定",
        //   cencelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        //     this.$intent.closeWindow(this);
        //   })
        //   .catch(() => {
        this.$intent.closeWindow(this);
        // });
      }
    },
    //保存按钮
    save(val) {
      let _this = this;
      return new Promise((resolve, reject) => {
        //如果已经保存过，走更新接口
        _this.$refs["dataForm"].validate(valid => {
          if (valid) {
            if (_this.dataForm.id) {
              apis
                .editOrMatainanFile(_this.dataForm)
                .then(res => {
                  if (res.code === "SUCCESS") {
                    _this.$message({
                      type: "success",
                      message: "数据已更新并保存成功！"
                    });
                    this.getDetailIfo();
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
                .saveFile(_this.dataForm)
                .then(res => {
                  if (res.code === "SUCCESS") {
                    _this.isSaved = true;
                    _this.dataForm.id = res.data;
                    _this.id = res.data;
                    _this.fileId = res.data;
                    _this.uploadConfig.id = res.data;
                    _this.$intent.replace(_this, {
                      name: "detail",
                      query: { identify: "0", id: _this.id }
                    });
                    apis.fileDetail({ id: _this.id }).then(res => {
                      _this.$forceUpdate();
                      _this.dataObj = res.entity;
                      // _this.dataForm = res.entity;
                      _this.dataForm = { ..._this.dataForm, ...res.entity };
                      console.log("_this.dataObj", _this.dataObj);
                    });
                    // _this.getDetailIfo();
                    // _this.$intent.replace(this, {
                    //   path: _this.$route.path,
                    //   query: { id: _this.id, btnType: "0" }
                    // });
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
                  _this.getControlArea();
                  resolve(res);
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
      // const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (
            this.dataForm.processIdea ||
            (this.dataForm.processIdeaList &&
              this.dataForm.processIdeaList.length > 0)
          ) {
            // if (
            //   this.requiredFields.Findex == true &&
            //   this.dataForm.documentNo == ""
            // ) {
            //   this.$message({
            //     type: "warning",
            //     message: "请先生成编号"
            //   });
            // } else {
            this.$confirm("是否办结").then(() => {
              this.selectOrgAndPerson(val);
            });
            // }
          } else {
            this.$message({
              type: "error",
              message: "过程意见未填写"
            });
          }
        }
      });
      // if (
      //   this.dataForm.processIdea ||
      //   (this.dataForm.processIdeaList &&
      //     this.dataForm.processIdeaList.length > 0)
      // ) {
      //   this.$confirm("是否办结").then(() => {
      //     this.selectOrgAndPerson(val);
      //   });
      // } else {
      //   this.$message({
      //     type: "error",
      //     message: "过程意见未填写"
      //   });
      // }
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
              // id_name.push(itemId + '_' + item.name)
              chooseDataName.push(item.name);
              chooseDataId.push(item.id);
            } else if (item.id.indexOf("#") == -1) {
              let itemId = item.id + "#" + item.deptId;
              // id_name.push(item.id + '_' + item.name)
              chooseDataName.push(item.name);
              chooseDataId.push(itemId);
            }
          });
        // console.log("------选人----", chooseDataName)
        this.dataForm.currentUser = chooseDataName.join(",");
        this.dataForm.currentUserId = chooseDataId.join(",");
        this.dataForm.currentNodeId = params.id;
        this.dataForm.currentNode = params.name;
        apis
          .sendFile({ ...this.dataForm, handleButton: "完成并发送" })
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
      const id = this.id;
      apis
        .getControlArea({
          id: id
        })
        .then(res => {
          this.flowLinkInfo = res.Fields;
          this.setConfig();
          this.initRules();

          console.log("----liuchenghuanjie---", this.flowLinkInfo);
        })
        .catch(() => {
          this.$message({
            message: "获取流程按钮失败",
            type: "error"
          });
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
        this.flowLinkInfo.editedIdeaFields
      ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.flowLinkInfo.requiredIdeaFields
      ); //可编辑意见域
    },
    //完成并发送按钮
    send(val) {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (!_this.dataForm.id) {
            apis
              .saveFile(_this.dataForm)
              .then(res => {
                if (res.code === "SUCCESS") {
                  _this.isSaved = true;
                  _this.dataForm.id = res.data;
                  _this.id = res.data;
                  _this.fileId = res.data;
                  _this.uploadConfig.id = res.data;
                  apis.fileDetail({ id: _this.id }).then(res => {
                    _this.$forceUpdate();
                    _this.dataObj = res.entity;
                    _this.dataForm = { ..._this.dataForm, ...res.entity };
                    console.log("_this.dataObj", _this.dataObj);
                    apis
                      .getControlArea({
                        id: _this.dataForm.id
                      })
                      .then(res => {
                        if (res.code === "SUCCESS") {
                          _this.flowLinkInfo = res.Fields;
                          _this.setConfig();
                          _this.initRules();
                          apis
                            .getPersonInfoAndPersonTree({
                              ..._this.dataObj
                            })
                            .then(res => {
                              _this.loadingTree = true;
                              _this.dialogState = true;
                              _this.seletOptionsData = res.data.list;
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
            apis.fileDetail({ id: _this.dataForm.id,btnType: this.actionType }).then(res => {
              _this.$forceUpdate();
              _this.dataObj = res.entity;
              _this.dataForm = { ..._this.dataForm, ...res.entity };
              _this.selectOrgAndPerson(val);
            });
            
          }
        } else {
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
        apis
          .getPersonInfoAndPersonTree({
            // id: _this.dataForm.id
            ...this.dataForm
          })
          .then(res => {
            _this.loadingTree = true;
            _this.dialogState = true;
            this.$nextTick(() => {
              _this.treeData = res.data.result.data;
              _this.seletOptionsData = res.data.list;
            });
          })
          .catch(err => {
            _this.$message({
              type: "error",
              message: err.msg
            });
          });
        _this.dataForm.handleButton = val;
      } else if (val === "流程调度") {
        apis
          .flowDispatch({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.seletOptionsData = res.data.list;
            _this.dialogState = true;
          })
          .catch(err => {
            _this.$message({
              type: "error",
              message: err.msg
            });
          });
        _this.dataForm.handleButton = "完成并发送";
      } else {
        _this.dataForm.handleButton = val;
        apis
          .sendFile(this.dataForm)
          .then(res => {
            if (res.code === "SUCCESS") {
              _this.$intent.closeWindow(this);
              _this.$message({
                type: "success",
                message: "办结完成"
              });
            }
          })
          .catch(err => {
            _this.$message({
              type: "error",
              message: err.msg
            });
          });
      }
    },
    //删除编号
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
            apis.editOrMatainanFile(this.dataForm).then(res => {
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
          apis.tackBack({ id: this.dataForm.id, numYear:this.numyear}).then(res => {
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
        .docHandlinAdd({...this.dataForm,numYear:this.numyear})
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
      apis
        .getHandleDeps({ numYear:this.numyear})
        .then(res => {
          console.log("----获取办理部门和日期---", res);
          if (res.code === "SUCCESS") {
            if (this.actionType === "4") {
              this.dataForm.createDate = res.data.createDate;
            }

            this.hqDepts = res.data.hqDept;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //查看办理状态
    checkState() {
      apis
        .checkState({ id: this.dataForm.id, numYear:this.numyear })
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
            message: err.message
          });
        });
    },

    //查看流程
    checkFlow() {
      const _this = this;
      apis
        .checkFlow({ id: _this.dataForm.id, numYear:this.numyear})
        .then(res => {
          if (res.code === "SUCCESS") {
            console.log("查看流程", res);
            _this.tableData = res.data;
            this.$forceUpdate();
            _this.$nextTick(() => {
              _this.$refs.dialogLine.openDialog();
            });
          }
        })
        .catch(err => {
          _this.$message({
            type: "error",
            message: err.message
          });
        });
    },

    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      console.log("-----flagFile--->", flagFile);
      var successInfo = { state: false };
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = flagFile.fileName;
      bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
          console.log("-----res", res);
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
    //操作指南
    readMe() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "BHGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.dataForm.id,
                    zhengWenState: 0,
                    JYcode: "A08462002",
                    multiTenancyId: "000000iiii",
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
            message: err.message
          });
        });
    },
    //流程调度
    flowDispatch() {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          apis
            .flowDispatch({
              id: _this.dataForm.id
            })
            .then(res => {
              _this.seletOptionsData = res.data;
              _this.dialogState = true;
            })
            .catch(err => {
              _this.$message({
                type: "error",
                message: err.message
              });
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
    upRow(n, huanjie) {
      let midObj;
      let attachSort = [];
      switch (huanjie) {
        case "QS":
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
          break;
        case "PZ":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfoPZ[n - 1].id,
              sort: this.dataForm.attchmentFileInfoPZ[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfoPZ[n].id,
              sort: this.dataForm.attchmentFileInfoPZ[n - 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfoPZ[n];
          this.dataForm.attchmentFileInfoPZ[
            n
          ] = this.dataForm.attchmentFileInfoPZ[n - 1];
          this.dataForm.attchmentFileInfoPZ[n - 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
        case "SP":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfoSP[n - 1].id,
              sort: this.dataForm.attchmentFileInfoSP[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfoSP[n].id,
              sort: this.dataForm.attchmentFileInfoSP[n - 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfoSP[n];
          this.dataForm.attchmentFileInfoSP[
            n
          ] = this.dataForm.attchmentFileInfoSP[n - 1];
          this.dataForm.attchmentFileInfoSP[n - 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
      }
    },

    downRow(n, huanjie) {
      let midObj;
      let attachSort = [];
      console.log(n, "huanjie", huanjie);
      switch (huanjie) {
        case "QS":
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
          break;
        case "PZ":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfoPZ[n + 1].id,
              sort: this.dataForm.attchmentFileInfoPZ[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfoPZ[n].id,
              sort: this.dataForm.attchmentFileInfoPZ[n + 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfoPZ[n];
          this.dataForm.attchmentFileInfoPZ[
            n
          ] = this.dataForm.attchmentFileInfoPZ[n + 1];
          this.dataForm.attchmentFileInfoPZ[n + 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
        case "SP":
          attachSort.push(
            {
              id: this.dataForm.attchmentFileInfoSP[n + 1].id,
              sort: this.dataForm.attchmentFileInfoSP[n].sort
            },
            {
              id: this.dataForm.attchmentFileInfoSP[n].id,
              sort: this.dataForm.attchmentFileInfoSP[n + 1].sort
            }
          );
          midObj = this.dataForm.attchmentFileInfoSP[n];
          this.dataForm.attchmentFileInfoSP[
            n
          ] = this.dataForm.attchmentFileInfoSP[n + 1];
          this.dataForm.attchmentFileInfoSP[n + 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {});
          break;
      }
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

/* .shiwuTitle{
    width:100%;
     min-height:90px;
     line-height:90px;
     text-align:center;
     color:#096dd9;
     font-size:44px;
     font-weight: 500;
  } */
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
.actColor {
  color: red;
}
</style>