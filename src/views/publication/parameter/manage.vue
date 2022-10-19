
<template>
  <div class="manage">
    <div class="manage-button">
      <el-button type="primary" class="el-button" @click="buttonClick('关闭')">关闭</el-button>
      <el-button type="primary" class="el-button" @click="buttonClick('保存')">保存</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">刊物定义</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="140px">
        <el-row>
          <el-col :span="24">
            <div class="manage-organ">
              <el-form-item label="管理机构">
                <el-input class="left" v-model="formData.drafOrgNm"  readonly="readonly"></el-input>
                <el-button class="right" @click="addDrafOrgNmChoose" type="primary" :disabled="addDis" size="medium">添加</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="拟投稿刊物" prop="pubNm">
              <el-input v-model="formData.pubNm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="拟投稿栏目" prop="pubColumnNm">
              <el-input v-model="formData.pubColumnNm"></el-input>
              <span class="explain">各个栏目用半角','隔开</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="编辑人员" prop="pubEditUnm">
              <el-input v-model="formData.pubEditUnm" :disabled="true" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-button class="btn_1" :span="2" @click="Selecteditors('1')">选择人员</el-button>
          
          <tree-person
            v-model="showOrgPer"
            :isSingle="isSingles"
            :humanType="humanType"
            :unitCode="unitCode"
            :unitClass="unitClass"
            @orgList="getperList"
            :selectDept="selectDept"
            :isNeedChild="isNeedChild"
          ></tree-person>
          <!-- <select-person 
            :loadingTree="loadingTree" 
            :hasRadio="hasRadio" 
            :treeData="treeData" 
            :dialogType="dialogType" 
            :seletOptionsData="seletOptionsData" :dialogTypeNow="dialogTypeNow" dialogTit="选择人员" :checkIds="checkIds" :checkData="checkData" :singelCheckF="singelCheckF" :dialogState="dialogState" @showCompDialog="showCompDialog"></select-person> -->
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="高级编辑" prop="pubTopEditUnm">
              <el-input v-model="formData.pubTopEditUnm" :disabled="true" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-button class="btn_1" :span="2" @click="Selecteditors('2')">选择人员</el-button>
          <tree-person
            v-model="showOrgPerGao"
            :isSingle="isSinglesGao"
            :humanType="humanTypeGao"
            :unitCode="unitCodeGao"
            :unitClass="unitClassGao"
            @orgList="getperListGao"
            :selectDept="selectDeptGao"
            :isNeedChild="isNeedChildGao"
          ></tree-person>
          <!-- <select-person :loadingTree="loadingTree1" :hasRadio="hasRadio1" :treeData="treeData1" :dialogType="dialogType1" :seletOptionsData="seletOptionsData1" :dialogTypeNow="dialogTypeNow1" dialogTit="选择人员" :checkIds="checkIds1" :checkData="checkData1" :singelCheckF="singelCheckF1" :dialogState="dialogState1" @showCompDialog="showCompDialog1"></select-person> -->
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="是否适用下级机构" prop="pubTyp">
              <el-radio-group v-model="formData.pubTyp" @change="change">
                <el-radio label="02">是</el-radio>
                <el-radio label="01">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="是否在首页显示" prop="pubIsShow">
              <el-radio-group v-model="formData.pubIsShow">
                <el-radio label="01">是</el-radio>
                <el-radio label="02">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-show="publicationType">
          <el-row>
            <el-col :span="24">
              <el-form-item label="期号" prop="pubIssue">
                <el-input v-model="formData.pubIssue"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="总期号" prop="pubTotalIssue">
                <el-input v-model="formData.pubTotalIssue"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="发送（版记标识）" prop="title">
                <el-table :data="formData.sendUserList">
                  <el-table-column label="全选" width="100px">
                    <template slot-scope="scope">
                      <span class="send-number">{{ scope.row.index }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="显示名称" width="160">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.title"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="人员名称">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="摘发（版记标识）" prop="title">
                <el-table :data="formData.chSendUserList">
                  <el-table-column label="全选" width="100px">
                    <template slot-scope="scope">
                      <span class="send-number">{{ scope.row.index }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="显示名称" width="160">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.title"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="人员名称">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item label="本期编辑人员" prop="pubCurEditUnm">
                <el-input v-model="formData.pubCurEditUnm"></el-input>
              </el-form-item>
            </el-col>
            <el-button class="btn_1" :span="2" @click="Selecteditors('3')">选择人员</el-button>
            <!-- <select-person :loadingTree="loadingTreePceu" :hasRadio="hasRadioPceu" :treeData="treeDataPceu" :dialogType="dialogTypePceu" :seletOptionsData="seletOptionsDataPceu" :dialogTypeNow="dialogTypeNowPceu" dialogTit="选择人员" :checkIds="checkIdsPceu" :checkData="checkDataPceu" :singelCheckF="singelCheckFPceu" :dialogState="dialogStatePceu" @showCompDialog="showCompDialogPceu"></select-person> -->
            <tree-person
              v-model="showOrgPerBen"
              :isSingle="isSinglesBen"
              :humanType="humanTypeBen"
              :unitCode="unitCodeBen"
              :unitClass="unitClassBen"
              @orgList="getperListBen"
              :selectDept="selectDeptBen"
              :isNeedChild="isNeedChildBen"
            ></tree-person>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="pubCurEditUph">
                <el-input v-model="formData.pubCurEditUph"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="统计正文分行配置">
                <el-input v-model="formData.pubUnionFhNm"></el-input>
                <span class="explain">各个分行用半角','隔开</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="常用发送对象" prop="title">
                <el-table :data="formData.mostSendUserList">
                  <el-table-column label="全选" width="100px">
                    <template slot-scope="scope">
                      <span class="send-number">{{ scope.row.index }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="显示名称" width="160">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.title"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="人员名称">
                    <template slot-scope="scope">
                      <el-input :disabled="true" v-model="scope.row.name" class="people-name"></el-input>
                      <el-button size="mini" @click="handleEditObject(scope.$index, scope.row)" class="btn_2" plain>选择人员</el-button>
                      <!-- <select-person :orgId="hwOrgId" :loadingTree="loadingTreeSendObject" :hasRadio="hasRadioSendObject" :treeData="treeDataSendObject" :dialogType="dialogTypeSendObject" :seletOptionsData="seletOptionsDataSendObject" :dialogTypeNow="dialogTypeNowSendObject" dialogTit="选择人员" :checkIds="checkIdsSendObject" :checkData="checkDataSendObject" :singelCheckF="singelCheckFSendObject" :dialogState="dialogStateSendObject" @showCompDialog="showCompDialogSendObject"></select-person> -->
                      <tree-person
                        v-model="showOrgPerChang"
                        :isSingle="isSinglesChang"
                        :humanType="humanTypeChang"
                        :unitCode="unitCodeChang"
                        :unitClass="unitClassChang"
                        @orgList="getperListChang"
                        :selectDept="selectDeptChang"
                        :isNeedChild="isNeedChildChang"
                      ></tree-person>
                    </template>
                  </el-table-column>
                </el-table>
                <span class="explain">各个栏目用半角','隔开</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="行外常用发送对象" prop="title">
                <el-table :data="formData.outMostSendUserList">
                  <el-table-column label="全选" width="100px">
                    <template slot-scope="scope">
                      <span class="send-number">{{ scope.row.index }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="显示名称" width="160">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.title"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="人员名称">
                    <template slot-scope="scope">
                      <el-input :disabled="true" v-model="scope.row.name" class="people-name"></el-input>
                      <el-button size="mini" @click="hwHandleEditObject(scope.$index, scope.row)" class="btn_2" plain>选择人员</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <span  class="explain">各个栏目用半角','隔开</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="发送范围" prop="title">
                <el-table :data="formData.sendRangeUserList">
                  <el-table-column label="全选" width="100px">
                    <template slot-scope="scope">
                      <span class="send-number">{{ scope.row.index }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="显示名称" width="160">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.title"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="人员名称">
                    <template slot-scope="scope">
                      <el-input :disabled="true" v-model="scope.row.name" class="people-name"></el-input>
                      <el-button size="mini" @click="sendScopeEnd(scope.$index, scope.row)" class="btn_2" plain>选择人员</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="合稿模板" prop="title">
                <el-input v-model="formData.tplAuthorshipNm" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-button class="btn send-number" :span="2" @click="Browse(7)">浏览</el-button>
            <div v-for="(item,index) in tplAuthorshipPath" :key="index" class="comp_list">
              <el-button class="btn" :span="2" @click="downFile(item)">下载</el-button>
              <el-button class="btn" :span="2" @click="deleteRowSys(7,index,item.id)">删除</el-button>
            </div>
          </el-row>
          <el-dialog title="上传" :visible.sync="dialogVisibleFile" width="30%" :before-close="handleClose">
            <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileListFile"></upload-file-ts>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleFile = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisibleFile = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-form>
    </div>
    <!-- 选择机构 -->
    <org-tree v-model="showOrgTree" title="选择机构" :isSingle="isSingleJg" :type="orgTypeJg" :orgOrDept="orgOrDeptJg" :orgOrDeptId="orgOrDeptIdJg" :queryType="queryTypeJg" :isSearchAll="isSearchAllJg" :outBank="outBankJg" @orgList="getOrgListFirst"></org-tree>
    <!-- 发送范围弹窗 -->
    <el-dialog title="发送范围" v-if="showOrgTreeScope" :visible.sync="showOrgTreeScope">
      <el-row>
        <el-col :span="12">
          <div class="title">
            <span>发送范围部门</span>
          </div>
          <div class="tree_w box_shadow">
            <el-scrollbar>
              <el-checkbox v-model="checkAllUp" @change="checkAllChangeUp" class="check-all">全选</el-checkbox>
              <el-tree ref="elTreeUp" :props="propelTreeUp" show-checkbox :check-on-click-node="true" :check-strictly="true" :expand-on-click-node="false" @check="checkTreeUp" node-key="id" :load="loadNoTreeUp" lazy></el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            <span>已选项</span>
            <el-button type="primary" @click.native="resetCheckUp" class="empty" size="mini" :disabled="nowCheckList.length==0" round>清空</el-button>
          </div>
          <div class="box_shadow tree_w">
            <el-scrollbar>
              <div v-for="(item,index) in nowCheckList" :key="index">
                <template>
                  <div class="command_wrap">
                    <span class="name">{{item.unitName}}</span>
                    <div class="one_btn">
                      <el-button type="primary" size="mini" @click.native="upRowUp(index)" :disabled="index==0||item.disabled" round>上移</el-button>
                      <el-button type="primary" size="mini" @click.native="downRowUp(index)" :disabled="index==nowCheckList.length-1||item.disabled" round>下移</el-button>
                      <el-button type="warning" size="mini" @click.native="deleteRowUp(index)" round>删除</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
      <el-row class="fanwei-box">
        <el-col :span="12">
          <div class="title">
            <span>发送范围机构</span>
          </div>
          <div class="tree_w box_shadow">
            <el-scrollbar>
              <el-checkbox v-model="checkAllDown" @change="checkAllChangeDown" class="check-all">全选</el-checkbox>
              <el-tree ref="elTreeDownRef" :props="propelTreeDown" show-checkbox :check-on-click-node="true" :check-strictly="true" :expand-on-click-node="false" :default-checked-keys="nowCheckListDownid" @check="checkTreeDown" node-key="unitCode" :data="elTreeDownData"></el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            <span>已选项</span>
            <el-button type="primary" @click.native="resetCheckDown" class="empty" size="mini" :disabled="nowCheckListDown.length==0" round>清空</el-button>
          </div>
          <div class="box_shadow tree_w">
            <el-scrollbar>
              <div v-for="(item,index) in nowCheckListDown" :key="index">
                <template>
                  <div class="command_wrap">
                    <span class="name">{{item.unitName}}</span>
                    <div class="one_btn">
                      <el-button type="primary" size="mini" @click.native="upRowDown(index)" :disabled="index==0||item.disabled" round>上移</el-button>
                      <el-button type="primary" size="mini" @click.native="downRowDown(index)" :disabled="index==nowCheckListDown.length-1||item.disabled" round>下移</el-button>
                      <el-button type="warning" size="mini" @click.native="deleteRowDown(index)" round>删除</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button @click="showOrgTreeScope = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 行外常用发送对象弹窗 -->
    <el-dialog class="el-dialog-hw" :visible.sync="hwDialogStateSendObject" :modal-append-to-body="false" :close-on-click-modal="false" title="选择行外人员">
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="24">
            <div class="hw-box">
              <el-form-item label="机构名称">
                <el-input class="left hw-input" :disabled="true" v-model="organ" readonly="readonly"></el-input>
                <el-button class="right" @click="chooseOrgan" type="primary" size="medium">选择机构</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="hw-box">
              <el-form-item label="人员登陆名">
                <el-input class="left hw-input" :disabled="true" v-model="personnel" readonly="readonly"></el-input>
                <el-button class="right" @click="choosePersonnel" type="primary" size="medium">选择人员</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="list">
              <ul>
                <li v-for="(i,index) in hwCount" :key="index" class="el-li">{{i}}</li>
              </ul>
            </div>
          </el-col>
          <el-col :span="6">
            <el-button class="check-all" @click="addHwCount" type="primary" size="small">添加到列表</el-button>
            <br>
            <el-button @click="removeHwCount" type="primary" size="small">删除列表</el-button>
          </el-col>
          <el-col :span="24">
            <div class="footer">
              <el-button type="primary" @click="hwConfirm">确 定</el-button>
              <el-button @click="hwDialogStateSendObject = false">取 消</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 行外常用发送对象用到的机构、人员树 -->
    <!-- <select-person
      :orgId="hwOrgId"
      :loadingTree="hwLoadingTreeSendObject"
      :hasRadio="hwHasRadioSendObject"
      :treeData="hwTreeDataSendObject"
      :dialogType="hwDialogTypeSendObject"
      :seletOptionsData="hwSeletOptionsDataSendObject"
      :dialogTypeNow="hwDialogTypeNowSendObject"
      dialogTit="选择人员"
      :checkIds="hwCheckIdsSendObject"
      :checkData="hwCheckDataSendObject"
      :singelCheckF="hwSingelCheckFSendObject"
      :dialogState="hwDialogStateSendObjectPerson"
      @showCompDialog="hwShowCompDialogSendObject"
      :offenUse="false"
      :subOrgFlag="true"
    ></select-person> -->


    <tree-person
      v-model="showOrgPerHang"
      :isSingle="isSinglesHang"
      :humanType="humanTypeHang"
      :unitCode="unitCodeHang"
      :unitClass="unitClassHang"
      @orgList="getperListHang"
      :selectDept="selectDeptHang"
      :isNeedChild="isNeedChildHang"
    ></tree-person>
  </div>
</template>

<script type="text/ecmascript-6">
import treePerson from "components/tree/sysTreePerson";
import mTable from '@/components/table/tTable'
import orgTree from 'components/tree/orgTree'
import selectPerson from 'components/tree/treeTansun'
import minixs from '@/minixs/index'
import uploadFileTs from 'components/uploadFile/uploadFileTs'
import openOrDownLoadFile from '@/minixs/shiwuLineWord'
export default {
  name: 'manage',
  components: {
    orgTree,
    uploadFileTs,
    selectPerson,
    treePerson,
  },
  mixins: [minixs, openOrDownLoadFile],
  props: {},
  data() {
    return {
      showOrgPer: false,
      isSingles: false,
      isNeedChild: "yes",
      unitClass: 0,
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDept: [],
      
      showOrgPerGao: false,
      isSinglesGao: false,
      isNeedChildGao: "yes",
      unitClassGao: 0,
      humanTypeGao: 3,
      unitCodeGao: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDeptGao: [],

      showOrgPerBen: false,
      isSinglesBen: false,
      isNeedChildBen: "yes",
      unitClassBen: 0,
      humanTypeBen: 3,
      unitCodeBen: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDeptBen: [],
      
      showOrgPerChang: false,
      isSinglesChang: false,
      isNeedChildChang: "yes",
      unitClassChang: 0,
      humanTypeChang: 3,
      unitCodeChang: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDeptChang: [],

      showOrgPerHang: false,
      isSinglesHang: false,
      isNeedChildHang: "yes",
      unitClassHang: 0,
      humanTypeHang: 3,
      unitCodeHang: '',
      selectDeptHang: [],
      hwCount: [], //选择行外人员的列表
      organ: '', //选择行外人员所在机构
      personnel: '', //选择行外人员
      isSingle: false,
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem('userInfo')).unitId,
      unitClass: 2,
      seletSelf: 1,
      selectDept: [],
      hwDialogStateSendObject: false,
      hwDialogStateSendObjectPerson: false,
      hwOrgOrDept: 3,
      treeDateStore: [],
      treeDateStoreDown: [],
      checkAllUp: false,
      checkAllDown: false,
      elTreeDownData: [],
      nowCheckList: [],
      nowCheckListDown: [],
      nowCheckListDownid: [],
      propelTreeUp: {
        children: 'children',
        label: 'unitName',
        isLeaf: 'leaf',
      },
      propelTreeDown: {
        children: 'children',
        label: 'unitName',
        isLeaf: 'leaf',
      },
      hwType: 'all',
      hwQueryType: 'low',
      orgType: 'all',
      orgOrDeptIdScope: JSON.parse(localStorage.getItem('userInfo')).unitId,
      orgOrDeptFw: 1,
      queryTypeFw: 'low',

      outBankJg: false, //是否展示群组
      isSearchAllJg: false, //是否查询全部
      isSingleJg: true, //单选
      orgTypeJg: '', //为all时，拉取一级部门与机构 ,""拉取只拉去部门或者机构
      orgOrDeptJg: 1, //机构为1，部门为0
      orgOrDeptIdJg: '1',
      queryTypeJg: 'low', //up:上级   low:下级  peer:同级 ''其他

      dialogVisibleFile: false,
      addDis: false,

      FilebuttonList: [
        { name: 'Word模板（头）', fileList: [] },
        { name: 'Word模板（尾）', fileList: [] },
        { name: '合稿栏目样式模板', fileList: [] },
        { name: '合稿标题样式模板', fileList: [] },
        { name: '合稿目录样式模板', fileList: [] },
        { name: '合稿目录', fileList: [] },
      ],
      showOrgTreeScope: false, //选择发送范围的树
      publicationType: true,
      isShowUploadFile: Boolean,
      paramsType: '',
      tableData: [
        {
          date: '1',
          name: '',
          address: '',
        },
      ],
      tableDataDraft: [
        {
          date: '1',
          name: '',
          address: '',
        },
        {
          date: '2',
          name: '',
          address: '',
        },
        {
          date: '3',
          name: '',
          address: '',
        },
        {
          date: '4',
          name: '',
          address: '',
        },
      ],
      uploadConfig: {
        formId: '',
        hiddenJson: '',
        filesHas: [],
        isSpecial: '',
      },
      wdTplAuthorshipNmUploadConfig: {
        formId: 'wdTplAuthorshipNm',
        hiddenJson: 'hiddenwdTplAuthorshipNm',
        wdTplAuthorshipNmFileHas: [],
        isSpecial: '800047',
      },
      dialogVisible: false,
      jigou: [],
      bumen: [],
      dialogVisible1: false,
      rules: {
        pubNm: [{ required: true, message: '请填写拟投稿刊物', trigger: 'blur' }],
        pubColumnNm: [
          {
            required: true,
            trigger: 'blur',
            pattern: /^[^，]+(,[^，]+)*$/,
            message: '请输入正确的拟投稿栏目',
          },
        ],
        pubUnionFhNm: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入正确的分行配置',
          },
        ],
        pubEditUnm: [{ required: true, message: '请选择编辑人员', trigger: 'change' }],
        pubTopEditUnm: [{ required: true, message: '请选择高级编辑', trigger: 'change' }],
        pubTyp: [{ required: true, message: '请选择刊物类型', trigger: 'change' }],
        pubIsShow: [{ required: true, message: '请选择是否在首页', trigger: 'change' }],
      },
      cyArr: [],
      cyObj: {},
      // select主办部门
      showTree: false,
      // 联合单位
      showOrgTree: false,
      unitDeptArr: [],
      signIdeaList: [], //签发意见
      examineIdeaList: [], //处理意见
      cyIdeaList: [], //传阅意见
      listArr: [],
      isShow: true,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {},
      form1: {},
      formLabelWidth: '120px',
      active: '#wjys',
      scrollIntoViewOptions: {
        block: 'start',
        behavior: 'smooth',
      },
      flag: false,
      id: '',
      leixing: '',
      showFlowChart: false,
      flowChartList: [], //流程列表
      select: '',
      radio: '',
      checkList: ['行名', '部门', '姓名', '手机'],
      radio1: '',
      buttonList: [
        { name: '保存', type: 'baocun', show: false },
        { name: '完成并发送', type: 'wanchengfasong', show: false },
        { name: '删除此文', type: 'shanchuciwen', show: false },
        { name: '收回', type: 'shouhui', show: false },
        { name: '承办参会单收回', type: 'shouhui1', show: false },
        { name: '催办', type: 'cuiban', show: false },
        { name: '发送', type: 'fasong', show: false },
        { name: '传阅', type: 'chuanyue', show: false },
        { name: '办结', type: 'banjie', show: false },
        { name: '查看报名表', type: 'ckbaomingbiao', show: false },
        { name: '查看流程', type: 'ckliucheng', show: false },
        { name: '打印处理单', type: 'dayinchulidan', show: false },
        { name: '操作指南', type: 'caozuozhinan', show: false },
        { name: '编辑', type: 'bianji', show: false },
        { name: '退回编辑', type: 'backbianji', show: false },
        { name: '发办理单位', type: 'fabanlidanwei', show: false },
        { name: '增发', type: 'zengfa', show: false },
        { name: '承办收回', type: 'cbshouhui', show: false },
        { name: '承办催办', type: 'cbcuiban', show: false },
        { name: '传阅收回', type: 'cyshouhui', show: false },
        { name: '查看传阅记录', type: 'ckcyjl', show: false },
        { name: '收藏', type: 'shoucang', show: false },
        { name: '维护', type: 'weihu', show: false },
        { name: '提交报名表', type: 'tjbaomingbiao', show: false },
        { name: '接受', type: 'jieshou', show: false },
        { name: '拒绝', type: 'jujue', show: false },
        { name: '已阅', type: 'yiyue', show: false },
        { name: '发送至参会人', type: 'tocanhuiren', show: false },
        { name: '收藏', type: 'shoucang', show: false },
      ],

      currentUser: JSON.parse(localStorage.getItem('userInfo')).humanName,
      currentUserId: JSON.parse(localStorage.getItem('userInfo')).humanId,

      huanJieMessage: {},
      readFields: {
        authorCn: false,
        draftDate: false,
        title: false,
        tel: false,
        unitdept: false,
        hyTime: false,
        hyAdress: false,
        host: false,
        attend: false,
        attendance: false,
        summary: false,
        entrustUnit: false,
        wordBody: false,
        feedback: false,
      }, //不可编辑控制域
      editedIdeaFields: {
        cyyj: true,
        shyj: true,
        qfyj: true,
      }, //可编辑意见域
      requiredIdeaFields: {
        cyyj: false,
        shyj: false,
        qfyj: false,
      }, //必填意见域
      requiredFields: {
        creator: '',
        feedBack: '',
        tel: '',
        draftDate: '',
        title: '',
        mainDept: '',
        wordBody: '',
      }, //必填控制域
      appendWriteDialog: false, //常用批语
      clickTypes: '', //常用批语类型
      // 传阅收回选人
      cyData: [],
      showCyPerson: false,
      // 选择人员
      treeData: [], //人员树
      treeData1: [], //人员树
      dialogType: 'next',
      dialogType1: 'next',
      checkIds: [], //选中id列表
      checkIds1: [], //选中id列表
      checkData: [], //选中数据
      checkData1: [], //选中数据
      dialogState: false, //显示隐藏
      dialogState1: false, //显示隐藏
      singelCheckF: false, // 单选true 多选为false
      singelCheckF1: false, // 单选true 多选为false
      hasRadio: false, //是否單選
      hasRadio1: false, //是否單選
      dialogTypeNow: 'next',
      dialogTypeNow1: 'next',
      seletOptionsData: [],
      seletOptionsData1: [],
      offenUse: false,
      loadingTree: true,
      loadingTree1: true,
      // 选择人员（本期编辑人员）

      loadingTreePceu: true,
      hasRadioPceu: false, //是否單選
      treeDataPceu: [], //人员树
      dialogTypePceu: 'next',
      seletOptionsDataPceu: [],
      dialogTypeNowPceu: 'next',
      checkIdsPceu: [], //选中id列表
      checkDataPceu: [], //选中数据
      singelCheckFPceu: true, // 单选true 多选为false
      dialogStatePceu: false, //显示隐藏
      // ==
      loadingTreeSendObject: true,
      hasRadioSendObject: false,
      dialogTypeSendObject: 'next',
      seletOptionsDataSendObject: [],
      dialogTypeNowSendObject: 'next',
      checkIdsSendObject: [],
      checkDataSendObject: [],
      singelCheckFSendObject: false,
      dialogStateSendObject: false,
      treeDataSendObject: [], //人员树（常用发送对象）
      hwTreeDataSendObject: [], //人员树（行外常用发送对象）
      hwLoadingTreeSendObject: true,
      hwHasRadioSendObject: false,
      hwDialogTypeSendObject: 'next',
      hwSeletOptionsDataSendObject: [],
      hwDialogTypeNowSendObject: 'next',
      hwCheckIdsSendObject: [],
      hwCheckDataSendObject: [],
      hwSingelCheckFSendObject: false,
      hwOrgId:'',
      // hwOrgId: JSON.parse(localStorage.getItem('userInfo')).unitId,
      DialogStateSendScope: false,
      LoadingTreeSendScope: true,
      HasRadioSendScope: false,
      DialogTypeSendScope: 'next',
      SeletOptionsDataSendScope: [],
      DialogTypeNowSendScope: 'next',
      CheckIdsSendScope: [],
      CheckDataSendScope: [],
      SingelCheckFSendScope: false,
      TreeDataSendScope: [], //人员数（常用发送对象）
      sendObjectIndex: '', //常用发送对象的idnex
      // 发办理单位  增发
      text: '发办理单位',
      returnCnArr: [],
      attchmentFileInfo: [],
      formData: {
        remark1: '', //备用字段1
        remark2: '', //备用字段2
        remark3: '', //备用字段3
        remark4: '', //备用字段4
        pubEditUserDeptId: '', //编辑人真实部门id
        pubEditUserHumanId: '', //编辑人humanid
        pubTopEditUserDeptId: '', //高级编辑真实部门id
        pubTopEditUserHumanId: '', //高级编辑humanid

        pubMgId: '', //
        pubNm: '', //刊物名称
        pubNo: '', //刊物编号
        pubColumnId: '', //
        pubColumnNm: '', //
        pubEditUid: '', //
        pubEditUnm: '', //编辑人
        pubTopEditUid: '', //
        pubTopEditUnm: '', //高级编辑人
        pubTyp: '', //
        pubIsShow: '', //
        pubShowNo: '', //
        pubIssue: '', //
        pubTotalIssue: '', //
        pubCurEditUid: '', //
        pubCurEditUnm: '', //
        pubCurEditUph: '', //
        pubUnionFhId: '', //
        pubUnionFhNm: '', //

        topWordNm: '', //
        topWordPath: '', //
        endWordNm: '', //
        endWordPath: '', //
        tplColumnStyleNm: '', //
        tplColumnStylePath: '', //
        tplColumnTitleNm: '', //
        tplColumnTitlePath: '', //
        tplMainColumnNm: '',
        tplMainColumnPath: '',
        tplColumnCatalogueNm: '', //
        tplColumnCataloguePath: '', //
        tplAuthorshipNm: '', //
        tplAuthorshipPath: '', //
        sendUserList: [
          {
            index: '1',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '2',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '3',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '4',
            title: '',
            name: '',
            id: '',
          },
        ], //
        chSendUserList: [
          {
            index: '1',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '2',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '3',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '4',
            title: '',
            name: '',
            id: '',
          },
        ], //
        mostSendUserList: [
          {
            index: '1',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '2',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '3',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '4',
            title: '',
            name: '',
            id: '',
          },
        ], //
        outMostSendUserList: [
          {
            index: '1',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '2',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '3',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '4',
            title: '',
            name: '',
            id: '',
          },
        ],
        sendRangeUserList: [
          {
            index: '1',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '2',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '3',
            title: '',
            name: '',
            id: '',
          },
          {
            index: '4',
            title: '',
            name: '',
            id: '',
          },
        ],
      },
      typeindex: '',
      topWordPath: [],
      endWordPath: [],
      tplColumnStylePath: [],
      tplColumnTitlePath: [],
      tplMainColumnPath: [],
      tplColumnCataloguePath: [],
      tplAuthorshipPath: [],
      details: '01',
    }
  },
  methods: {
    getperList(perList){
      let names = [],
        ids = [],
        deptId = [],
        idStr = []
      perList.forEach((item) => {
        names.push(item.perName)
        ids.push(item.deptHumanCode)
        deptId.push(item.id)
        idStr.push(item.deptHumanId)
      })
      this.formData.pubEditUid = ids.join(',')
      this.formData.pubEditUnm = names.join(',')
      this.formData.pubEditUserDeptId = deptId.join(',')
      this.formData.pubEditUserHumanId = idStr.join(',')
      this.showOrgPer = false
    },
    getperListGao(data){
      let names = [],
        ids = [],
        deptId = [],
        idStr = []
      data.forEach((item) => {
        names.push(item.perName)
        ids.push(item.deptHumanCode)
        deptId.push(item.id)
        idStr.push(item.deptHumanId)
      })
      this.formData.pubTopEditUid = ids.join(',')
      this.formData.pubTopEditUnm = names.join(',')
      this.formData.pubTopEditUserDeptId = deptId.join(',')
      this.formData.pubTopEditUserHumanId = idStr.join(',')
      this.showOrgPerGao = false
    },
    getperListBen(data){
      let names = [],
        ids = []
      data.forEach((item) => {
        names.push(item.perName)
        ids.push(item.deptHumanCode)
      })
      this.formData.pubCurEditUid = ids.join(',')
      this.formData.pubCurEditUnm = names.join(',')
      this.showOrgPerBen = false
    },
    getperListChang(data){
      this.showOrgPerChang = false
      let names = [],
        ids = []
      data.forEach((item) => {
        names.push(item.perName)
        let allList = {
          title: item.perName,
          id: item.deptHumanId + "#" + item.id,  //humanId+"#"+部门id
          cyhumanId: item.deptHumanCode,
          cyhumanName: item.perName,
        }
        ids.push(allList)
      })

      this.formData.mostSendUserList[this.sendObjectIndex].name = names.join(',')
      this.formData.mostSendUserList[this.sendObjectIndex].id = ids
    },
    getperListHang(data){
      this.showOrgPerHang = false
      let names = [],
        ids = []
      data.forEach((item) => {
        names.push(item.perName)
        ids.push(item.deptHumanCode)
      })
      this.personnel = names.join(',')
      this.formData.outMostSendUserList[this.sendObjectIndex].name = names.join(',')
      this.formData.outMostSendUserList[this.sendObjectIndex].id = ids.join(',')
    },
    //选择机构
    chooseOrgan() {
      this.personnel = ''
      this.showOrgTree = true
      this.details = '02'
    },
    //选择人员
    choosePersonnel() {
      if (this.organ) {
        // this.hwDialogStateSendObjectPerson = true
        this.showOrgPerHang = true
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择机构名称',
        })
      }
    },
    //	添加到列表
    addHwCount() {
      console.log(this.personnel)
      let paramer = this.organ + '/' + this.personnel
      this.hwCount.push(paramer)
    },
    removeHwCount() {
      this.hwCount = []
    }, //删除列表
    hwConfirm() {
      // let sNumber = this.sendObjectIndex.toString()
      // console.log(sNumber,this.hwCount.join(','))
      this.formData.outMostSendUserList[this.sendObjectIndex].name = this.hwCount.join(',')
      this.hwDialogStateSendObject = false
    }, //	确定
    addDrafOrgNmChoose() {
      if (!this.addDrafOrgNm()) {
        this.details = '01'
        // this.orgOrDeptId = this.draforgnmPeople[0].managerUnitId
        this.orgOrDeptId = '0'
        this.showOrgTree = true
      }
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem('tcHumanRole'))
      this.draforgnmPeople = manger.filter((item) => {
        return (
          item.codeType === 'manager_type' &&
          (item.dicCode === 'sys_manager' || item.dicCode === 'busi_manager')
        )
      })
      this.formData.drafOrgNm = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      this.formData.creatOrgId = JSON.parse(localStorage.getItem('userInfo')).unitId
      if (this.draforgnmPeople.length !== 0) {
        this.addDis = false
        return this.addDis
      } else {
        this.addDis = true
        return this.addDis
      }
    },
    fileListFile(files) {
      switch (this.typeindex) {
        case 7:
          this.tplAuthorshipPath = []
          this.formData.tplAuthorshipNm = files[0].fileName
          this.formData.tplAuthorshipPath = files[0].filePath
          this.formData.tplAuthorshipPathId = files[0].id
          this.tplAuthorshipPath.push({
            fileName: files[0].fileName,
            filePath: files[0].filePath,
            id: files[0].id,
          })
          this.wdTplAuthorshipNmUploadConfig.wdTplAuthorshipNmFileHas = this.tplAuthorshipPath
          this.dialogVisibleFile = false
          break
      }
    },
    Browse(index) {
      this.typeindex = index
      switch (index) {
        case 7:
          if (this.tplAuthorshipPath.length == 0) {
            this.dialogVisibleFile = true
            this.uploadConfig = this.wdTplAuthorshipNmUploadConfig
          } else {
            this.$message({
              type: 'warning',
              message: '请先删除原文件后再上传新文件',
            })
          }
          break
      }
    },
    // downFile(file) {
    //   let bank_doDownloadFile = { function: 'doDownloadFile' }
    //   bank_doDownloadFile.fileName = file.fileName
    //   bank_doDownloadFile.filePath = file.filePath
    //   this.$post
    //     .postData('doDownloadFile', JSON.stringify(bank_doDownloadFile), this.$businessCode.fawglfj)
    //     .then((res) => {
    //       if (res) {
    //         if (res && res.success) {
    //           downLoadFileReName(
    //             (this.$post.getEnvState() ? location.origin : 'http://localhost:8080') +
    //               '/ecpweb/getLocalFile.action?relativePath=' +
    //               res.filePath +
    //               '&fileName=' +
    //               res.fileName,
    //             file.fileName
    //           )
    //         } else {
    //           this.$message({
    //             type: 'error',
    //             showClose: true,
    //             offset: 400,
    //             message: '下载失败',
    //             duration: 500,
    //           })
    //         }
    //       }
    //     })
    // },
    // 删除
    deleteRowSys(m, n, id) {
      if (id) {
        this.$confirm('是否确定删除此文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$api.setSysConfig
              .deleFile({
                id: id,
              })
              .then((res) => {
                if (res && res.code == 'SUCCESS') {
                  switch (m) {
                    case 7:
                      this.tplAuthorshipPath && this.tplAuthorshipPath.splice(n, 1)
                      this.$forceUpdate()
                      this.wdTplAuthorshipNmUploadConfig.wdTplAuthorshipNmFileHas = this.tplAuthorshipPath
                      this.formData.tplAuthorshipNm = ''
                      break
                  }
                  // this.loadData()
                  this.$message({
                    type: 'success',
                    message: '删除成功',
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败',
                  })
                }
              })
          })
          .catch(() => {})
      } else {
        this.$message({
          type: 'warning',
          message: '请先上传附件',
        })
      }
    },
    change(index) {
      if (index === '01') {
        this.publicationType = true
      } else if (index === '02') {
        this.publicationType = true
      }
    },
    Selecteditors(val) {
      if (val == '1') {
        // this.dialogState = true
        this.showOrgPer = true;
      } else if (val == '2') {
        // this.dialogState1 = true
        this.showOrgPerGao = true;
      } else if (val == '3') {
        this.showOrgPerBen = true
      }
    },
    // 保存刊物
    loadData() {
      // 上传数据处理
      this.$api.paraMeter.PublicationManagementIde(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          console.log('获取id', res.data.pubMgId)
          if (!this.id) {
            this.id = this.$route.query.cli
          }
          if (this.formData.tplAuthorshipPathId) {
            this.$api.setSysConfig
              .saveFile({
                id: res.data.pubMgId,
                fileId: this.formData.tplAuthorshipPathId,
                fileType: '800047',
              })
              .then((res) => {})
          }
          this.$message({
            type: 'success',
            showClose: true,
            message: '保存成功',
            duration: 500,
          })
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: '保存失败',
            duration: 500,
          })
        }
      })
    },
    // 主办部门
    selectOrg(org) {
      this.$set(this.formData, 'maindept', org.unitName)
      this.formData.maindeptId = org.id
    },
    // 关闭弹出上传文件的框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
          this.nochengban()
        })
        .catch((_) => {})
    },
    //取消
    nochengban() {
      this.dialogVisible = false
      this.formData.entrustUnit = ''
      this.formData.undertakeDepartmentId = ''
    },
    // 选择机构按钮方法
    getOrgListFirst(org) {
      if (this.details === '02') {
        this.organ = org.unitName
        this.hwOrgId = org.id
        this.unitCodeHang = org.id
        console.log(this.hwOrgId)
      } else if (this.details === '01') {
        this.formData.drafOrgNm = org.unitName
        this.formData.creatOrgId = org.id
      }
    },
    // 发送范围
    /* getOrgListScope(org) {
      let names = [],
        ids = []
      org.forEach((item) => {
        names.push(item.unitName)
        ids.push(item.id)
      })
      this.formData.sendRangeUserList[this.sendObjectIndex].name = names.join(',')
      this.formData.sendRangeUserList[this.sendObjectIndex].id = ids.join(',')
    }, */
    toTarget(target) {
      const toElement = document.querySelector(target)
      toElement.scrollIntoView(this.scrollIntoViewOptions)
    },
    handleEditObject(row, row1) {
      this.hwOrgId = JSON.parse(localStorage.getItem('userInfo')).unitId
      // this.dialogStateSendObject = true
      this.showOrgPerChang = true
      
      this.sendObjectIndex = row
    },
    hwHandleEditObject(row, row1) {
      this.orgOrDeptIdJg = JSON.parse(localStorage.getItem('userInfo')).unitId
      this.organ = ''
      this.personnel = ''
      this.hwCount = []
      this.hwDialogStateSendObject = true
      this.sendObjectIndex = row
    },
    sendScopeEnd(row, row1) {
      this.nowCheckList = []
      this.showOrgTreeScope = true
      this.sendObjectIndex = row
      this.loadNoTreeDown()
    },
    buttonClick(params) {
      switch (params) {
        case '关闭':
          this.close()
          break
        case '保存':
          this.save()
          break
      }
    },
    // 关闭
    close() {
      this.$router.back()
    },
    // 保存
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loadData()
          this.$router.back()
        } else {
          this.$message({
            type: 'warning',
            message: '请填写表单',
          })
        }
      })
    },

    //本期编辑人员选择人员
    showCompDialogPceu(data, status, type, params, dtype) {
      this.dialogStatePceu = false
      if (type == 'next') {
        let names = [],
          ids = []
        data.forEach((item) => {
          names.push(item.name)
          ids.push(item.id)
        })
        this.formData.pubCurEditUid = ids.join(',')
        this.formData.pubCurEditUnm = names.join(',')
      }
    },
    //行外常用发送对象选择人员
    hwShowCompDialogSendObject(data, status, type, params, dtype) {
      this.hwDialogStateSendObjectPerson = false
      if (type == 'next') {
        let names = [],
          ids = []
        data.forEach((item) => {
          names.push(item.name)
          ids.push(item.id)
        })
        this.personnel = names.join(',')
        this.formData.outMostSendUserList[this.sendObjectIndex].name = names.join(',')
        this.formData.outMostSendUserList[this.sendObjectIndex].id = ids.join(',')
      }
    },
    //常用发送对象选择人员
    showCompDialogSendObject(data, status, type, params, dtype) {
      this.dialogStateSendObject = false
      if (type == 'next') {
        let names = [],
          ids = []
        data.forEach((item) => {
          console.log(item, '222')
          names.push(item.name)
          let allList = {
            title: item.name,
            id: item.id,
            cyhumanId: item.code,
            cyhumanName: item.name,
          }
          ids.push(allList)
        })

        this.formData.mostSendUserList[this.sendObjectIndex].name = names.join(',')
        this.formData.mostSendUserList[this.sendObjectIndex].id = ids
      }
    },
    //编辑人员选择人员
    showCompDialog(data, status, type, params, dtype) {
      if (type == 'next') {
        let names = [],
          ids = [],
          deptId = [],
          idStr = []
        data.forEach((item) => {
          names.push(item.name)
          ids.push(item.code)
          deptId.push(item.deptId)
          idStr.push(item.idStr)
        })
        this.formData.pubEditUid = ids.join(',')
        this.formData.pubEditUnm = names.join(',')
        this.formData.pubEditUserDeptId = deptId.join(',')
        this.formData.pubEditUserHumanId = idStr.join(',')
      }
      this.dialogState = false
    },
    //高级编辑选择人员
    showCompDialog1(data, status, type, params, dtype) {
      this.dialogState1 = false
      if (type == 'next') {
        let names = [],
          ids = [],
          deptId = [],
          idStr = []
        data.forEach((item) => {
          names.push(item.name)
          ids.push(item.code)
          deptId.push(item.deptId)
          idStr.push(item.idStr)
        })
        this.formData.pubTopEditUid = ids.join(',')
        this.formData.pubTopEditUnm = names.join(',')
        this.formData.pubTopEditUserDeptId = deptId.join(',')
        this.formData.pubTopEditUserHumanId = idStr.join(',')
      }
    },
    //详情反显附件
    getFileTplAuthorshipNm() {
      this.$api.setSysConfig.getTextemList({ id: this.id, fileType: '800047' }).then((res) => {
        this.$nextTick(() => {
          this.$set(this, 'tplAuthorshipPath', res.data)
          this.$set(this.wdTplAuthorshipNmUploadConfig, 'wdTplColumnCatalogueNmFileHas', res.data)
        })
      })
    },
    //发送范围懒加载上半部分接口
    loadNoTreeUp(node, resolve) {
      this.loading = true
      this.$api.setting.organization
        .getTree({
          unitClass: 0,
          searchType: this.searchType,
          unitCode: node.data ? node.data.id : JSON.parse(localStorage.getItem('userInfo')).unitId,
          type: '',
          queryType: '',
          opType: '',
        })
        .then((res) => {
          this.loading = false
          let data = []
          res.data.map((item) => {
            data.push({
              unitName: item.unitName,
              id: item.unitCode,
              leaf: item.lastUnit,
              deptType: item.deptType,
              isSyn: item.isSyn,
              unitClass: item.unitClass, //0:部门 1：机构 在信息刊物发布信息使用
            })
          })
          if (node.level == 0) {
            this.treeDateStore = res.data
          }
          this.searchType = res.searchType
          this.$refs.elTreeUp.setCheckedNodes(this.nowCheckList)
          return resolve(data)
        })
        .catch((err) => {
          this.loading = false
        })
    },
    checkAllChangeUp(val) {
      if (val) {
        let ids = []
        let self = this
        this.treeDateStore.forEach((item) => {
          ids.push(item.unitCode)
        })
        this.$refs.elTreeUp.setCheckedKeys(ids)
        this.nowCheckList = this.$refs.elTreeUp.getCheckedNodes()
      } else {
        this.$refs.elTreeUp.setCheckedKeys([])
        this.nowCheckList = []
      }
    },
    checkTreeUp(now, check, hascheck) {
      this.nowCheckList = this.$refs.elTreeUp.getCheckedNodes()
    },
    upRowUp(n) {
      let midObj
      midObj = this.nowCheckList[n]
      if (this.nowCheckList[n - 1].disabled) {
        return
      }
      this.nowCheckList[n] = this.nowCheckList[n - 1]
      this.nowCheckList[n - 1] = midObj
      this.$forceUpdate()
    },
    downRowUp(n) {
      let midObj
      midObj = this.nowCheckList[n]
      this.nowCheckList[n] = this.nowCheckList[n + 1]
      this.nowCheckList[n + 1] = midObj
      this.$forceUpdate()
    },
    deleteRowUp(index) {
      this.$refs.elTreeUp.setChecked(this.nowCheckList[index], false)
      this.nowCheckList.splice(index, 1)
    },
    resetCheckUp() {
      this.$refs.elTreeUp.setCheckedKeys([])
      this.nowCheckList = []
      this.checkAllUp = false
    },

    //发送范围懒加载下半部分接口
    loadNoTreeDown() {
      this.$api.setting.organization
        .getTree({
          unitClass: 1,
          searchType: '',
          unitCode: JSON.parse(localStorage.getItem('userInfo')).unitId,
          type: '',
          queryType: '',
          opType: '',
        })
        .then((res) => {
          let data = []
          res.data.map((item) => {
            data.push({
              unitName: item.unitName,
              id: item.unitCode,
              leaf: item.lastUnit,
              deptType: item.deptType,
              isSyn: item.isSyn,
              unitClass: item.unitClass, //0:部门 1：机构 在信息刊物发布信息使用
            })
          })
          this.elTreeDownData = res.data
          this.treeDateStoreDown = res.data
        })
        .catch((err) => {
          this.loading = false
        })
    },
    checkAllChangeDown(val) {
      let _this = this
      if (val) {
        let ids = []
        _this.treeDateStoreDown.forEach((item) => {
          ids.push(item.unitCode)
        })
        _this.$refs.elTreeDownRef.setCheckedKeys(ids)
        _this.nowCheckListDown = this.$refs.elTreeDownRef.getCheckedNodes()
      } else {
        _this.$refs.elTreeDownRef.setCheckedKeys([])
        _this.nowCheckListDown = []
      }
    },
    checkTreeDown(now, check, hascheck) {
      this.nowCheckListDown.push(now)
      //this.$refs.elTreeDownRef.setCheckedKeys([now.unitCode])
      this.nowCheckListDown = this.$refs.elTreeDownRef.getCheckedNodes()
    },
    upRowDown(n) {
      let midObj
      midObj = this.nowCheckListDown[n]
      if (this.nowCheckListDown[n - 1].disabled) {
        return
      }
      this.nowCheckListDown[n] = this.nowCheckListDown[n - 1]
      this.nowCheckListDown[n - 1] = midObj
      this.$forceUpdate()
    },
    downRowDown(n) {
      let midObj
      midObj = this.nowCheckListDown[n]
      this.nowCheckListDown[n] = this.nowCheckListDown[n + 1]
      this.nowCheckListDown[n + 1] = midObj
      this.$forceUpdate()
    },
    deleteRowDown(index) {
      this.$refs.elTreeDownRef.setChecked(this.nowCheckListDown[index], false)
      this.nowCheckListDown.splice(index, 1)
    },
    resetCheckDown() {
      this.$refs.elTreeDownRef.setCheckedKeys([])
      this.nowCheckListDown = []
      this.checkAllDown = false
    },
    sure() {
      let ids = [],
        names = []
      this.nowCheckList.forEach((item) => {
        let idsdrafList = {
          drafName: item.unitName,
          drafId: item.id,
          title: item.unitName,
          id: item.unitCode,
        }
        ids.push(idsdrafList)
      })
      this.nowCheckListDown.forEach((item) => {
        let idsOrgList = {
          OrgName: item.unitName,
          OrgId: item.unitCode,
          title: item.unitName,
          id: item.unitCode,
        }
        ids.push(idsOrgList)
      })
      ids.forEach((item) => {
        names.push(item.title)
      })
      this.formData.sendRangeUserList[this.sendObjectIndex].name = names.join(',')
      this.formData.sendRangeUserList[this.sendObjectIndex].id = ids
      this.showOrgTreeScope = false
    },
  },
  created() {
    this.addDrafOrgNm()
    if (this.$route.query.cli) {
      this.id = this.$route.query.cli
      this.$api.paraMeter.PublicationListData({ pubMgId: this.$route.query.cli }).then((res) => {
        this.formData = res.data
        // 赋值（以下初始值需要为空）
        this.formData.chSendUser = ''
        this.formData.mostSendUser = ''
        this.formData.outMostSendUser = ''
        this.formData.sendRange = ''
        this.formData.sendUser = ''
        this.getFileTplAuthorshipNm()
      })
    } else {
      let Jb = JSON.parse(localStorage.getItem('userInfo'))
      this.formData.pubCurEditUnm = Jb.humanName
      this.formData.pubCurEditUph = Jb.telMobile ? Jb.telMobile.replace(/,/g, ' ') : ''
    }
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.empty{
  float: right;
}
.check-all{
  margin-bottom: 10px;
}
.fanwei-box{
  margin-top: 20px;
}
.hw-box{
  float: left;
}
.hw-input{
  width:300px;
  margin-right:20px
}
.people-name{
  width:310px;
}
.send-number{
  margin-left: 10px;
}
.btn_1{
   margin-left:20px;
}
.btn_2{
  float: right;
}
.manage-button{
  margin: 25px 0;
  .el-button {
    margin-left:20px;
  }
}
.manage-organ{
  float: left;
  .left{
      width:300px;
      margin-right:20px;
  }
}
.explain{
  color:#bbbaba;
  font-size:14px;
}
.el-dialog-hw {
  width: 70%;
  margin-left: 14%;
  .list {
    height: 400px;
    padding: 20px 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .footer {
    width: 300px;
    margin-top: 10px;
    margin-left: calc(50% - 60px);
  }
  .el-li {
    margin-bottom: 10px;
    width: 100;
    /* display: inline-block; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.name {
  width: 100px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* height: 20px; */
  height: 42px;
  line-height: 42px;
}
.one_btn {
  // display: inline-block;
  float: right;
  // height: 42px;
  line-height: 42px;
}
.comp_list {
  display: inline;
  margin-left: 10px;
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.manage {
  background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;
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

  .process_content {
    width: 80%;
    // min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

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
.clear-fix:after {
  clear: both;
  content: '';
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.con-left {
  float: left;
  width: 80%;
  border-right: 1px solid #ccc;
  .con-left-p1 {
    width: 12%;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    border: 1px solid #ccc;
    border-left: 0;
    border-top: 0;
  }
  .con-left-p2 {
    width: 88%;
    height: 30px;
    line-height: 30px;
    float: left;
    border-bottom: 1px solid #ccc;
  }
  .bottom-none {
    border-bottom: 0;
  }
}
.con-right {
  float: left;
  width: 20%;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.adviceInfo {
  position: absolute;
  width: 95%;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.pad_lr10 {
  padding: 0 10px;
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
.par {
  position: relative;
  .par-child {
    position: absolute;
    top: 30px;
  }
}
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

    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
/deep/.radio-form .el-radio {
  margin: 10px;
}

.el-scrollbar {
  height: 100%;
}

.tree_w {
  max-width: 440px;
  height: 400px;
  padding-left: 20px;
}
</style>
