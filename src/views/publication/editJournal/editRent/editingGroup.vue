<template>
  <div class="contentGroup">

    <div class="topBtn">
      <el-button @click="addPublick" v-show="overState">增发</el-button>
      <el-button @click="constraintBack" v-show="overState">收回发布</el-button>
      <el-button @click="closeBtnFn">关闭</el-button>
      <el-button v-for="(item,index) in buttonList" :key="index" v-show="item.show" @click="buttonClick(item.name)">{{item.name}}</el-button>
      <!-- <el-button @click="buttonClick('清稿')">清稿</el-button> -->
    </div>
    <div style="height:54px"></div>
    <div class="topTitle">
      <h2>
        <span>《{{formData.journalTypeName}}》({{formData.columnTypeName}})采编</span>
      </h2>
      <div>
        <h3>第{{formData.issue}}期</h3>
        <h3>(总第{{formData.totalIssue}}期)</h3>
      </div>
    </div>
    
    <div class="topNav">
      <p>
        当前环节：
        <span style="color: red;">{{formData.curNodeName}}</span>
      </p>
      <p v-show="formData.curNodeName == '处理完毕【办结】'?false:true">
        当前处理人：
        <span style="color: red;">{{formData.curUserNm}}</span>
      </p>
      <p v-show="formData.curNodeName == '处理完毕【办结】'?false:true">
        编辑时间：
        <el-date-picker format="yyyy-MM-dd" v-model="formData.createTime" value-format="yyyy-MM-dd" style="float:right" />
      </p>
    </div>
    <!-- @refresh="loadData" -->
    <div class="mainContent">
      <div v-if="alternative">
        <div class="topSeach">
          <div class="dataContent">
            <el-date-picker v-model="searchData.dataTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="getTime" :disabled="pageDisabled"></el-date-picker>
          <el-button type="primary" @click="getIntList" style="margin-left:10px" :disabled="pageDisabled">搜索</el-button>
          </div>
          <div>
            <el-button type="primary" @click="getIntList" :disabled="pageDisabled">稿件刷新</el-button>
            <!-- <el-button type="primary">并稿</el-button> -->
            <el-button type="primary" @click="getList" :disabled="pageDisabled">采用</el-button>
            <!-- <el-button type="primary"  :disabled="pageDisabled">联系供稿人</el-button> -->
          </div>
        </div>
        <m-table 
          @refresh="getIntList" 
          @select="selectChange" 
          size="medium" 
          :tableData="tableData" 
          :tableCols="tableCols" 
          :pagination="pagination" 
          :isSelection="true" 
          :searchData="searchData" 
          :disabled="pageDisabled"></m-table>
      </div>

      <div>
        <div>
          <!-- <el-button type="primary">选择栏目</el-button>
                <el-button type="primary">查看并稿</el-button>
                <el-button type="primary">载入稿件</el-button> -->
          <el-button type="primary" @click="alternativeFn" :disabled="pageDisabled">{{alternative ? "收起" : "展开"}}</el-button>
          <!-- <el-button type="primary" class="el-icon-bottom"></el-button> -->
        </div>
        <div class="treeContent">
          <el-button class="titleTree" :disabled="pageDisabled">稿件</el-button>
          <!-- :default-checked-keys="[5]" -->
          <el-tree 
            ref="tree" 
            :data="GaojiantreeData" 
            id="el-tree" 
            node-key="id" 
            default-expand-all 
            :props="defaultProps" 
            :allow-drop="allowDrop" 
            :allow-drag="allowDrag" 
            draggable 
            @node-click="defaultFn" 
            @node-drag-end="handleDragEnd" 
            @node-drop="handleDrop" 
            @node-contextmenu="rightClick" 
            :disabled="pageDisabled"
          ></el-tree>
          <!-- //稿件右键菜单 -->
          <div v-show="ifMenu" class="right-menu" id="rightMenu">
            <!-- <div class="closeX" @click="ifMenu=false">X</div> -->
            <div @click="editManuscript();ifMenu=false;pageDisabledPage=false">编辑稿件</div>
            <div @click="RenameManuscript();ifMenu=false;pageDisabledPage=false">重命名</div>
            <!-- <div @click="uploadManuscript">上传稿件</div> -->
            <div @click="remove();ifMenu=false;pageDisabledPage=false">移除</div>
          </div>
          <!-- 栏目右键菜单 -->
          <div v-show="ifColumnMenu" class="right-menu" id="columnMenu">
            <!-- <div class="closeX" @click="ifColumnMenu=false">X</div> -->
            <div @click="addColumn();ifColumnMenu=false;pageDisabledPage=false">添加栏目</div>
            <div @click="reColumnName();ifColumnMenu=false;pageDisabledPage=false">重命名</div>
            <div @click="remove();ifColumnMenu=false;pageDisabledPage=false">移除</div>
          </div>
          <!-- 合稿右键菜单 -->
          <div v-show="ifMain" class="right-menu" id="mainColumn">
            <!-- <div class="closeX" @click="ifMain=false">X</div> -->
            <div @click="addColumn();ifMain=false;pageDisabledPage=false">添加栏目</div>
            <div @click="publicationFinalized();ifMain=false;pageDisabledPage=false">刊物定稿</div>
            <!-- <div @click="reColumnName">定稿编辑</div> -->
            <!-- <div @click="upDataText(1)">上传定稿</div>
                  <div @click="upDataText(2)">备份</div> -->
            <div @click="addColumn();ifMain=false;pageDisabledPage=false">载入原子稿件</div>
          </div>
        </div>
        <div class="formContent">
          <el-form ref="RefForm" :model="formData" label-width="120px" :rules="rules" :disabled="pageDisabled">
            <el-row v-if="ZHisDia">
              <el-col :span="20">
                <el-form-item label="发送:" prop="sendUser">
                  <el-input v-model="formData.sendUser" type="input" :disabled="readFields.sendUser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="摘发:" prop="chSendUser">
                  <el-input v-model="formData.chSendUser" type="input" :disabled="readFields.chSendUser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="本期编辑人员:" prop="curEditUnm">
                  <el-input v-model="formData.curEditUnm" type="input" :disabled="readFields.curEditUnm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="联系电话:" prop="phone">
                  <el-input v-model="formData.phone" type="input" :disabled="readFields.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="发送范围:" prop="sendRange">
                  <el-input v-model="formData.sendRange" type="input" :disabled="readFields.sendRange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" style="margin-left:5px" @click="sendBtn">发送范围</el-button>
              </el-col>
            </el-row>
             <!-- v-if="this.formData.curNodeName=='审核'" -->
            <el-row  v-if="readFields.auditOpinions == true && auditOpinionsList.length>0 ? false : true">
              <el-col :span="24">
                <el-form-item>
                  <el-radio-group v-model="formData.isAgree" @change="pubIsShow" :disabled="readFields.auditOpinions">
                    <el-radio label="0">同意</el-radio>
                    <el-radio label="1">不同意</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="审核意见" prop="auditOpinions">
                  <!-- <el-input  v-model="formData.auditOpinions" :disabled="readFields.auditOpinions" type="textarea"></el-input> -->
                  <el-input v-show="(readFields.auditOpinions == true && auditOpinionsList.length > 0 )|| this.formData.curNodeName == '处理完毕【办结】'? false : true" v-model="formData.auditOpinions" :disabled="readFields.auditOpinions" type="textarea"></el-input>
                  <div class="opinionTbody"  v-show="auditOpinionsList.length >= 1 ? true : false">
                    <div class="lineContent" v-for="(item, index) in auditOpinionsList" :key="index">
                      <div>{{item.opinionText}}</div>
                      <div class="adviceInfo">
                        {{item.depnm}}
                        <span class="pad_lr10">{{item.unm}}</span>
                        <br>
                        {{time(item.opinionTime)}}
                      </div>
                    </div>
                  </div>
                  <!-- <div v-for="item in auditOpinionsList" :key="item.id" style="margin-bottom: 10px;margin-top: 10px">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col :span="24">
                          <el-input type="textarea" :value="item.opinionText" :disabled="true" :autosize="{minRow:5,maxRow:15}" class="d_f1"></el-input>
                          <div class="adviceInfo">
                            {{item.depnm}}
                            <span class="pad_lr10">{{item.unm}}</span>
                            <br>
                            {{time(item.opinionTime)}}
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="">
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <div @click="pageClose" style="position:relative" v-if="pageDisabled">
      <div class="opcation">
      </div>
    </div>
    <div @click="pageClose" style="position:relative" v-if="pageDisabledPage">
      <div class="opcationPage">
      </div>
    </div>

    <!-- 表单的发送范围弹窗 -->
    <el-dialog :visible.sync="sendVisible" width="60%" title="发送范围">
      <el-row>
        <el-col :span="12">
          <div class="title">
            <span>发送范围:</span>
          </div>
          <div class="tree_w">
            <el-scrollbar>
              <el-tree ref="formDatafsffTree" :data="formDatafsfwData" :props="formDatafsfwprops" show-checkbox :check-on-click-node="true" :check-strictly="true" :expand-on-click-node="false" @check="formDatafsffcheckTree" node-key="id"></el-tree>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
      <el-button type="primary" @click="sendSureBtn">确定</el-button>
    </el-dialog>

    <!-- 想下级行发送  发布刊物弹窗 -->
    <el-dialog :visible.sync="tableVisible" width="60%" :title="tableTitle" v-if='tableVisible'>
      <el-row>
        <el-col :span="12">
          <div class="title">
            <span>发布部门:</span>
          </div>
          <div class="tree_w">
            <el-scrollbar>
              <el-tree 
                ref="departTree" 
                :data="publishLimitData" 
                :props="defaultPropsRelave" 
                show-checkbox 
                :check-on-click-node="true" 
                :check-strictly="false" 
                :expand-on-click-node="false" 
                @check="checkTree" node-key="id"
              >
              </el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span='12' v-if="this.tableTitle=='刊物发布' ">
          <div class="title">
            <span>稿件条目:</span>
          </div>
          <el-table border :data="gaojianListTitle">
            <el-table-column algin="center" type="selection" width="50"></el-table-column>
            <el-table-column algin="center" prop="title" label="稿件标题"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button type="primary" @click="sureBtn">确定</el-button>
      </div>
    </el-dialog>

    <!-- <org-tree v-model="showOrgTree" title="选择部门" :selectDept="selectDept" @orgList="getOrgList" :orgOrDept="0" :isSingle="false"></org-tree> -->

    <!-- 常用及部门发送弹窗 -->
    <el-dialog :visible.sync="dapartVisible" title="选择部门">
      <el-row>
        <el-col :span="12">
          <div class="title">
            <span>常用发送对象:</span>
          </div>
          <div class="tree_w">
            <el-scrollbar>
              <el-tree ref="cyfsTree" :props="cyfsprops" show-checkbox :check-on-click-node="true" :check-strictly="true" :expand-on-click-node="false" @check="cyfscheckTree" node-key="id" :data="cyfsData"></el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            <span>发送范围:</span>
          </div>
          <div class="tree_w">
            <el-scrollbar>
              <div align="right">
                <el-checkbox v-model="checked" @change="checkedAll">全选</el-checkbox>
              </div>
              <el-tree 
                ref="fsfwData"
                default-expand-all
                :data="fsfwData"
                :props="fsfwprops"
                show-checkbox
                :check-on-click-node="true"
                :check-strictly="false"
                :expand-on-click-node="false"
                @check="fsffcheckTree" node-key="id"
              >
              </el-tree>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button type="primary" @click="ccbmAndsend">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="columnVisible" width="60%" :title="columnTitle">
      <el-form label-width="80px">
        <el-form-item :model="colNameData" :label="inputLable">
          <el-input v-model="colNameData"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="columnVisible = false">取 消</el-button>
        <el-button type="primary" @click="rightMenBtn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="备份标题" :visible.sync="dialogVisibleCopyText" width="60%" :before-close="handleClose">
      <el-form>
        <el-form-item label="请输入备份标题">
          <el-input v-model="copyTextItem"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisibleCopyText = false">取 消</el-button>
        <el-button type="primary" @click="confirmCopyText">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="备份稿件" :visible.sync="recoverDialogVisibleCopyText" class="backup" @before-close="recoverDialogVisibleCopyText = false">
      <el-row>
        <el-form>
          <!-- class="pubIsShowList" -->
          <el-form-item >
            <el-radio-group v-model="radio" style="width: 100%;">
              <div style="height:200px;box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);padding: 10px ;padding-left: 20px; ">
                <el-scrollbar style="height:100%">
              <el-col :span="14" style="margin-top:10px" v-for="(lav,index) in pubIsShowList" :key="index">
                <el-radio :disabled="false" :label="lav.backupTitle" @change="pubIsShowBack(pubIsShowList,index)">{{lav.backupTitle}}</el-radio>
              </el-col>
                </el-scrollbar>
              </div>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer">
        <el-button @click="recoverDialogVisibleCopyText = false">取 消</el-button>
        <el-button type="primary" @click="confirmCopyTextPubmm">确 定</el-button>
        <!-- <el-button type="danger" @click="removeCopyTextPubmm">删 除</el-button> -->
      </span>
    </el-dialog>

    <select-person
      v-dialogDrag
      :treeData="treeData"
      :fromdata="formData"
      :loadingTree="loadingTree"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择参与人员"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    
  </div>
</template>
<script>
import mTable from '@/components/table/tTable'
import selectPerson from '@/components/tree/treeTansun'
// import orgTree from 'components/tree/orgTree' //部门选择组件
import minixs from '../../../../minixs/index'
import exportTable from '@/minixs/exportTableQueryScript'
import meger from 'webpack-merge'
import userInfo from '../../../../util/userInfo'
import viewDraft from "@/minixs/viewDraft";
export default {
  name: 'editRenteditingGroup',
  components: {
    mTable,
    selectPerson,
    // orgTree,
  },
  mixins: [minixs, exportTable,viewDraft],
  data() {
    return {
      takeBackv: false,
      verifyData: Boolean,
      num: '',
      overState: false,
      cleanDraftFlag: false,
      tcHumanRoles:'', //是否返回上一人
      isDinggao: 2, //是否需要刊物定稿
      loadingTree:true,
      checked:false,
      newTime:'',//当前时间
      showOrgTree: false,
      selectcyfsList: [], //常用发送勾选的数据
      selectfsffList: [], //发送范围勾选的数据
      searchType: '',
      nowCheckList: [],
      dapartVisible: false,
      // 常用发送按钮弹窗发送部门
      cyfsprops: {
        children: 'children',
        label: 'title',
      },
      // 常用发送按钮弹窗常用发送对象和发送范围:
      fsfwprops: {
        children: 'children',
        label: 'title',
      },
      cyfsData: [
        {
          title: '常用发送对象',
          id: '1',
          disabled: true,
          children: [],
        },
      ],
      fsfwData: [
        {
          title: '发送范围',
          id: '1',
          disabled: true,
          children: [],
        },
      ],
      //表单发送范围勾选的数据
      formDataselectfsffList:[],
      formDatafsfwprops:{
        children: 'children',
        label: 'title',
      },
      formDatafsfwData: [
        {
          title: '发送范围',
          id: '1',
          disabled: true,
          children: [],
        },
      ],
      issue: 'true',
      showBack: {},
      radio: '', //恢复备份列表radio
      dialogVisibleCopyText: false, //备份框显示
      recoverDialogVisibleCopyText: false, //恢复备份
      pubIsShowList: [], //恢复备份列表
      copyTextItem: '', //备份标题
      pageDisabled: false, //不可编辑
      pageDisabledPage: false, //右击遮罩
      kanwuyulanBtn: false, //刊物定稿以后查看正文显示
      draftInfo: [],
      nerStr: '', //稿件id
      nowChecked: [], //储存发布勾选的节点
      TreekanwuIdList: [],
      TreekanwuNameList: [],
      isReturn: false, //收回按钮是否可见
      idea: false, //发布按钮是否可见
      publishLimitData: [], //向下级 发布范围树
      //arrTree: [],// 发布范围树
      // 发布范围树
      defaultPropsRelave: {
        children: 'children',
        label: 'label',
      },
      ISCurrentName: false,
      publicationId: '', //刊物id（用于合刊）
      pubData: '', //刊物数据（用于合刊）
      zwGaojian: [], //合刊的数据
      gmainContext: [],
      auditOpinionsList: [],
      protoRightData: null, //右键当前数据
      ZHisDia: false, //总行显示
      sendVisible: false, //发送范围弹窗
      sendBoundary: [], //发送范围数据
      dataqc: {
        //起草获取权限数据参数
        humanId: '',
        multiTenancyId: 'CN024', //详情获取权限数据参数
        pcsAvyId: '', //当前节点id
        pcsTpId: '', //流程摸板Id
      },
      huanJieMessage: {}, //环境流程
      readFields: {
        sendUser: false, //发送
        chSendUser: false, //摘发
        curEditUnm: false, //本期编辑人员
        phone: false, //联系电话
        sendRange: false, //发送范围
        auditOpinions: false, //	审核意见
      }, //不可编辑控制域
      editedIdeaFields: {
        auditOpinions: true, //	审核意见
      }, //可编辑意见域
      requiredIdeaFields: {
        sendUser: false, //发送
        chSendUser: false, //摘发
        curEditUnm: false, //本期编辑人员
        phone: false, //联系电话
        sendRange: false, //发送范围
        auditOpinions: false, //	审核意见
      }, //必填意见域
      requiredFields: {
        auditOpinions: false,
        creator: '',
        feedBack: '',
        tel: '',
        draftDate: '',
        title: '',
        mainDept: '',
        wordBody: '',
      }, //必填控制域
      BtnIsHidden: false, //收回以及发布三个按钮显示
      gaojianListTitle: [], //稿件标题数据

      selectDept: [], //部门树
      tableTitle: '',
      tableVisible: false,

      selectRows: null, //采用选择
      fileList: null, //上传稿件
      ifMain: false, //合稿右键判断
      columnTitle: null, //新建栏目/重命名弹层标题
      inputLable: null, //重命名新建输入框 label名字
      remOrAddColumn: null,
      getColumn: null, //上个页面参数
      processISOr: false, //是否触发了完成并发送
      showBtnis: false, //是否点击了关闭
      //选择流程人员树
      treeData: [],
      seletOptionsData: [],
      offenUse: false,
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: false, // 单选true 多选为false
      dialogState: false, // 默认隐藏选择人员树结构
      showFlowChart: false,
      flowChartList: [], //流程列表
      dialogType: 'next',
      dialogTypeNow: 'dosend',
      ifView: Number, //正文标志
      checkAll: false, //正文标志
      saveCleanFile: false,
      //
      formData: {
        drafUserHumanCode: '', //拟稿人
        drafUserName: '', //拟稿人部门
        drafDepName: '', //拟稿部门
        drafDepId: '', //拟稿部门id
        auditOpinions: '', //	审核意见
        binggaoId: '', //		并稿稿件Id
        chSendUser: '', //	???
        createOrgId: '', //	创建机构id
        createTime: formatData(new Date().getTime(), 'YYYY-MM-DD'), //创建时间
        curEditUid: '', //	当前编辑用户id
        curEditUnm: '', //		当前编辑用户名称
        curNodeCode: '', //	当前环节id
        curNodeName: '起草', //		当前环节名称
        curPcsAvyId: '', //		当前活动id
        curUserDeptId: '', //		当前用户部门id
        curUserHumanId: '', //		当前用户humanId
        curUserId: '', //	当前操作人id
        curUserNm: JSON.parse(localStorage.getItem('userInfo')).humanName, //		当前操作人名称
        editTime: '', //		修改时间
        gaojianId: [], //	稿件id？
        gaojianIdstring: '',
        histUserId: '', //		历史操作人
        journalTypeId: '', //	刊物类型id
        journalTypeName: '', //		刊物类型名称
        columnTypeName: '', //栏目名称
        mainContext: [], //	正文内容
        mainFileName: '', //	正文附件name
        mainFilePath: '', //		正文附件地址
        multiTenancyId: '', //		流程多实体标志
        pTplNo: '', //		流程模板id
        pdnId: '', //		每日动态id
        phone: '', //	电话号码
        processInstId: '', //	流程实例id
        processStaut: '', //		流程状态--办结
        pubStaut: '', //		发布状态
        pubTime: '', //		发布时间
        sendUser: '', //		发送用户?
        supNodeCode: '', //	上一流程环节id
        supPcsAvyId: '', //		上一流程活动id
        supUserDeptId: '', //	上一用户部门
        supUserHumanId: '', //		上一用户humanId
        supUserId: '', //	上一处理人id
        supUserNm: '', //		上一处理人名称
        title: '', //		标题
        issue: '', //	第xx期
        totalIssue: '', //总第xx期
        deptIdArr: '',
        deptNameArr: '',
        orgIdArr: '', //发送机构或部门ID
        orgNameArr: '', //发送机构或部门名字
        publicType: '', //区分发布类型
        sendUser: '', //发送
        chSendUser: '', //摘发
        curEditUnm: '', //本期编辑人员
        curEditUid: '', //本期编辑人员id
        phone: '', //联系电话
        sendRange: '', //发送范围
        isAgree: '', //是否同意
        content: '', //稿件内容
        humanCodeArr: '', //常用发送范围
        humanNameArr: '', //常用发送范围
      },
      rules: {},
      backupTitle:'',
      colNameData: null,
      searchData: {},
      columnVisible: false,
      tableData: [],
      alternative: true,
      ifMenu: false,
      ifColumnMenu: false,
      contextMenuTarget: null,
      rightData: null, //node.parent.data 右键当前节点的父级数据
      onData: null, //当前右键节点数据
      dataTime: null,
      tableCols: [
        { label: '标题', prop: 'title' },
        { label: '评审意见', prop: 'assessOpinions' },
        { label: '组刊意见', prop: 'zukanOpinions' },
        { label: '最新审评人', prop: 'editUnm' },
        { label: '投稿单位', prop: 'drafOrgNm' },
        { label: '更新时间', prop: 'drafTime' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      buttonList: [
        // { name: '关闭并保存', type: 'guanbibaocun', show: false },
        // { name: '保存', type: 'baocun', show: false },
        // { name: '收回', type: 'chehui', show: false },
        // { name: '退回编辑', type: 'tuihui', show: false },
        // { name: '完成并发送', type: 'songshenhe', show: false },
        // { name: '备份', type: 'beifen', show: false },
        // { name: '恢复备份', type: 'recoverBeifen', show: false },
        // { name: '上传定稿', type: 'shangchuandinggao', show: false },
        // { name: '查看正文', type: 'kanwuyulan', show: false },
        // { name: '处理正文', type: 'chulizhengwen', show: false },
        // { name: '生成期号', type: 'scqh', show: false },
        // { name: '刊物发布', type: 'kanwufabu', show: false },
        // { name: '向下级行发送', type: 'xiajifasong', show: false },
        // { name: '常用及部门发送', type: 'changyongfasong', show: false },
        // { name: '常用及部门发送', type: 'changyongfasong', show: false },
        // { name: '清稿', type: 'qinggao', show: false },
        // { name: '清稿恢复', type: 'qghf', show: false },
        // { name: '同步', type: 'tongbu', show: false },
        // { name: '收藏', type: 'collection', show: false },
        
        { name: '关闭并保存', type: 'guanbibaocun', show: false },
        { name: '保存', type: 'baocun', show: false },
        { name: '完成并发送', type: 'songshenhe', show: false },
        { name: '处理正文', type: 'chulizhengwen', show: false },
        { name: '查看正文', type: 'kanwuyulan', show: false },   //4
        { name: '收回', type: 'chehui', show: false },
        { name: '备份', type: 'beifen', show: false },
        { name: '恢复备份', type: 'recoverBeifen', show: false },   //7
        { name: '上传定稿', type: 'shangchuandinggao', show: false },
        { name: '生成期号', type: 'scqh', show: false },
        { name: '清稿', type: 'qinggao', show: false },
        { name: '清稿恢复', type: 'qghf', show: false },
        { name: '刊物发布', type: 'kanwufabu', show: false },
        { name: '向下级行发送', type: 'xiajifasong', show: false },
        { name: '常用及部门发送', type: 'changyongfasong', show: false },
        { name: '退回编辑', type: 'tuihui', show: false },
        { name: '收藏', type: 'collection', show: false },   //16
        { name: '同步', type: 'tongbu', show: false },
      ],
      GaojiantreeData: [
        {
          label: '合稿',
          key: 'main',
          id: '1',
          children: [],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  watch: {
    ifMain() {
      if (!this.ifMain) {
        this.agreeScroll()
      }
      if (this.ifMain) {
        this.pageDisabledPage = true
        this.noScroll()
      }
    },
    ifColumnMenu() {
      if (!this.ifColumnMenu) {
        this.agreeScroll()
      }
      if (this.ifColumnMenu) {
        this.pageDisabledPage = true
        this.noScroll()
      }
    },
    ifMenu() {
      if (!this.ifMenu) {
        this.agreeScroll()
      }
      if (this.ifMenu) {
        this.pageDisabledPage = true
        this.noScroll()
      }
    },
  },
  methods: {
    verify() {
      this.$refs['RefForm'].validate((valid) => {
        if (valid) {
          this.verifyData = true
        } else {
          this.verifyData = false
          this.$message({
            type: 'error',
            message: '请填写必填项',
          })
        }
      })
    },
    checkedAll(val){
      if(this.checked){
        let rootNode = this.$refs.fsfwData.getNode(this.fsfwData[0].id).parent
        travelNodes(rootNode)
        function travelNodes(tmpRoot) {
          tmpRoot.checked = true;
          if(tmpRoot.childNodes.length === 0){
            return
          }else{
            let tmpChildNoes = tmpRoot.childNodes;
              for(let i = 0; i<tmpChildNoes.length;i++){
                // travelNodes(tmpChildNoes[i])
              }
          }
        }
      this.selectfsffList = this.$refs.fsfwData.getCheckedNodes()

        // this.$refs.fsfwData.setCheckedNodes(this.fsfwData)
      }else{
        let rootNode = this.$refs.fsfwData.getNode(this.fsfwData[0].id).parent
        travelNodes(rootNode)
        function travelNodes(tmpRoot) {
          tmpRoot.checked = false;
          if(tmpRoot.childNodes.length === 0){
            return
          }else{
            let tmpChildNoes = tmpRoot.childNodes;
            for(let i = 0; i<tmpChildNoes.length;i++){
              travelNodes(tmpChildNoes[i])
            }
          }
        }
        // this.$refs.fsfwData.setCheckedNodes([])
      }
    },
    // 点击遮罩隐藏弹窗
    pageClose() {
      this.ifMain = false
      this.ifColumnMenu = false
      this.ifMenu = false
      this.pageDisabledPage = false
    },
    //允许滑动（出现滚动条）
    agreeScroll() {
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', this.mo, false)
    },
    //禁止滑动
    noScroll() {
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', this.mo, false)
    },
    mo(e) {
      e.preventDefault()
    },
    //获取刊物数据
    publicationList() {
      this.$api.paraMeter.PublicationListData({ pubMgId: this.publicationId }).then((res) => {
        this.pubData = res.data
      })
    },
    //审核意见时间转换
    time(e) {
      let date = new Date(e)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = this.change(date.getDate()) + '  '
      let h = this.change(date.getHours()) + ':'
      let m = this.change(date.getMinutes()) + ':'
      let s = this.change(date.getSeconds())
      return Y + M + D + h + m + s
    },
    change(t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    //时间筛选
    getTime(value) {
      this.seachTime = value
    },
    //关闭
    closeBtnFn() {
      // this.$intent.closeWindow(this)

      if (this.formData.curNodeName == '处理完毕【办结】' || this.ISCurrentName == false) {
        this.$intent.closeWindow(this)
        return true
      }
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: (action) => {
          if (action === "confirm") {
            //点是
            this.closeAndSave()
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        },
      });
    }, 
    //增发
    addPublick(){

    },
    //收回发布
    constraintBack(){

    },
    lookBody(){
      let bank_doDownloadFile = { function: 'doDownloadFile' }
      let num = this.num
      bank_doDownloadFile.fileName = this.formData.mainFileName
      bank_doDownloadFile.filePath = this.formData.mainFilePath
      let id = this.formData.pdnId
      this.doDraftLook(id, bank_doDownloadFile, num)
    },
    workText(type) {
      if (this.formData.mainFileName) {
        let bank_doDownloadFile = { function: 'doDownloadFile' }
        bank_doDownloadFile.fileName =  this.formData.mainFileName
        bank_doDownloadFile.filePath =  this.formData.mainFilePath
          this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
            .then(res => {
            if (res) {
              if(type == '查看正文'){
                this.lookBody()
              }else if(type == '处理正文'){
                this.zwGaojian = this.formData.gaojianId
                this.gmainContext = this.formData.mainContext
                this.ifView = 2
                this.saveCleanFile = true
                this.doDraftClzw(res)
              }
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                offset: 400,
                message: '下载失败',
                duration: 500,
              })
            }
          })
      } else {
        this.$message({
          message: '暂无正文',
          type: 'warning',
        })
      }
    },
    // 关闭备份框弹窗
    handleClose() {
      this.dialogVisibleCopyText = false
    },
    // 恢复备份确定按钮
    confirmCopyTextPubmm() {
      this.formData.mainContext = JSON.parse(this.showBack.mainContext)
      this.formData.gaojianId = JSON.parse(this.showBack.gaojianId)
      this.formData.mainFileName = this.showBack.mainFileName
      this.formData.mainFilePath = this.showBack.mainFilePath
      this.GaojiantreeData = this.formData.mainContext
      this.recoverDialogVisibleCopyText = false
    },
    //删除选择按钮
    removeCopyTextPubmm() {
      let arr = this.pubIsShowList
      arr.map((val, i) => {
        if (val === this.showBack) {
          arr.splice(i, 1)
        }
      })
    },
    //备份框的确定事件
    confirmCopyText() {
      if (this.copyTextItem) {
        let backTitle = '[' + this.newTime + ']' + '备份' + ':' + this.copyTextItem
        let params = {
          // 备注名字
          backupTitle: backTitle,
          //保存时间
          editTime: '', //自动生成
          //保存人id
          editUserId: '', //	自动生成
          //保存人名称
          editUserName: '', //	自动生成
          //入选稿件对象字符串
          gaojianId: this.formData.gaojianId, //
          //树形结构字符串
          mainContext: this.formData.mainContext, //
          //正文附件name
          mainFileName: this.formData.mainFileName, //
          //正文附件地址
          mainFilePath: this.formData.mainFilePath, //
          //关联业务id
          pdnId: this.formData.pdnId, //
          //合刊备份 主键id
          pdnbId: '', //	自动生成
        }
        this.$api.pubStatistics.JointPublicationText(params).then((res) => {
          if (res.code == 'SUCCESS') {
            this.copyTextItem = ''
            this.$message({
              message: '备份成功',
              type: 'success',
            })
          } else {
            this.$message({
              message: '备份失败',
              type: 'error',
            })
          }
        })
        this.dialogVisibleCopyText = false
      } else {
        this.$message({
          type: 'warning',
          message: '请先填写备份标题',
        })
      }
    },
    buttonClick(params) {
      switch (params) {
        case '处理正文':
          this.workText('处理正文')
          break
        case '查看正文':
          this.lookBody()
          break
        case '保存':
          this.save()
          break
        case '收回':
          this.getwithdraw()
          break
        case '退回编辑':
          this.verify()
          if (this.verifyData) return this.getReturn()
          break
        case '关闭并保存':
          this.closeAndSave()
          break
        case '生成期号':
          this.getCreatedCOde()
          break
        case '刊物发布':
          this.verify()
          if (this.verifyData) return this.kanwufabu()
          break
        case '向下级行发送':
          this.verify()
          if (this.verifyData) return this.xiangyijifasong()
          break
        case '常用及部门发送':
          this.verify()
          if (this.verifyData) return this.changyongbumenfasong()
          break
        case '清稿恢复':
          this.recoverClearDraft()
          break
        case '完成并发送':
          this.verify()
          if (this.verifyData) {
            if (this.formData.issue > 0 && this.formData.totalIssue > 0) {
              if (this.formData.mainFilePath) {
                  // this.singelCheckF = true
                  // this.dialogTypeNow = 'next'
                  // this.dialogType = 'dosend'
                  // this.offenUse = true
                  // this.loadingTree = true
                  // this.canTab = false
                  // this.processISOr = true
                  // //先进行保存流程是否启动（processInstId）流程启动在进行完成并发送方法getProcess
                  // this.save()
                if(this.tcHumanRoles == 'false' || this.formData.supUserNm == "" || this.formData.supUserNm == null){
                this.singelCheckF = true
                this.dialogTypeNow = 'next'
                this.dialogType = 'dosend'
                this.offenUse = true
                this.loadingTree = true
                this.canTab = false
                this.processISOr = true
                //先进行保存流程是否启动（processInstId）流程启动在进行完成并发送方法getProcess
                this.save()
                }else{
                    this.$confirm(
                      "是否返回" + this.formData.supUserNm + "?",
                      "提示",
                      {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                     }
                    )
                    .then(() => {
                      this.getReturn()
                    })
                    .catch(() => {
                      this.singelCheckF = true
                      this.dialogTypeNow = 'next'
                      this.dialogType = 'dosend'
                      this.offenUse = true
                      this.loadingTree = true
                      this.canTab = false
                      this.processISOr = true
                      //先进行保存流程是否启动（processInstId）流程启动在进行完成并发送方法getProcess
                      this.save()
                    })
                }
              } else {
                this.$message({
                  type: 'error',
                  message: '请先刊物定稿',
                })
              }
            } else {
              this.$message({
                type: 'error',
                message: '请生成期号',
              })
            }
          }
          break
        case '备份':
          let date = new Date().toLocaleString('chinese', { hour12: false })
          let tempArr = []
          tempArr = date.split('/')
          this.newTime = tempArr.join('-')
          if (this.formData.mainFilePath != '') {
            this.copyText(1)
          } else {
            this.$message({
              type: 'error',
              message: '请合稿保存',
            })
          }
          break
        case '恢复备份':
          if (this.formData.pdnId) {
            this.$api.pubStatistics.seachText({ pdnId: this.formData.pdnId }).then((res) => {
              if (res.data.length !== 0) {
                this.pubIsShowList = res.data
                this.recoverDialogVisibleCopyText = true
              } else {
                this.$message({
                  type: 'error',
                  message: '暂无备份数据',
                })
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '请先保存数据',
            })
          }
          break
        case '上传定稿':
          if (this.formData.mainFilePath != '') {
            let date = new Date().toLocaleString('chinese', { hour12: false })
            let tempArr = []
            tempArr = date.split('/')
            this.newTime = tempArr.join('-')
            this.upDataText()
          } else {
            this.$message({
              type: 'error',
              message: '请先刊物定稿',
            })
          }
          break
        case '清稿':
          this.doClearDraft()
          // if (this.formData.isUpload && this.formData.isUpload == '1') {
          // } else {
          //   this.$message({
          //     type: 'error',
          //     message: '请先刊物定稿',
          //   })
          // }
          break
        case '同步':
          this.pree()
          break
        case '收藏':
          this.collection()
          break
      }
    },
    // 下载
    downFile(file) {
        let bank_doDownloadFile = {function: "doDownloadFile"}
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
                        downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                            res.filePath +
                            "&fileName=" +
                            res.fileName, file.fileName);
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
    // 收藏
    collection(){
      exportTable.collect(this, this.$route.query.pdnId, 'pdnId', 'A08462975')
    },
    recoverClearDraft(){
      this.$api.pubStatistics.seachText({ pdnId: this.formData.pdnId }).then((res) => {
        console.log(res,'获取清稿列表')
        this.showBack = res.data[0]
        this.formData.mainContext = JSON.parse(this.showBack.mainContext)
        this.formData.gaojianId = JSON.parse(this.showBack.gaojianId)
        this.formData.mainFileName = this.showBack.mainFileName
        this.formData.mainFilePath = this.showBack.mainFilePath
        this.GaojiantreeData = this.formData.mainContext
        this.save()
      })
    },
    //清稿弹窗
    doClearDraft() {
      // 清稿之前备份
      this.$api.pubStatistics.JointPublicationText(this.formData).then((res) => {
        console.log(res, '是否备份成功')
      })
      this.cleanDraftFlag = true
      this.workText('处理正文')
    },
    pree(){
      this.$api.pubInfo.deptInfoData({ pubId: this.formData.pdnId }).then((res) => {
        let formDataObject = res.data.data[0]
        this.$api.pubInfo
          .updataObject({
            ...formDataObject,
            title:this.formData.title,
            issue:this.formData.issue,
            mainFilePath:this.formData.mainFilePath,
          })
          .then((res) => {
          })
      })
    },
    //关闭并保存
    closeAndSave() {
      this.showBtnis = true
      this.save()
    },
    //保存
    save() {
      this.formData.mainContext = this.$refs.tree.data
      this.formData.title = this.formData.journalTypeName + '第' + this.formData.issue + '期'
      this.$api.pubStatistics.JointPublicationSave(this.formData).then((res) => {
        this.formData = res.data
        this.formData.mainContext = JSON.parse(res.data.mainContext)
        this.formData.gaojianId = JSON.parse(res.data.gaojianId)
        /*  if (res.data.mainContext) {
          this.formData.mainContext = JSON.parse(res.data.mainContext)
        } else {
          this.formData.mainContext = []
        }
        if (res.data.gaojianId) {
          this.formData.gaojianId = JSON.parse(res.data.gaojianId)
        } else {
          this.formData.gaojianId = []
        } */
        if (
          this.formData.processInstId == '' ||
          this.formData.processInstId == undefined ||
          this.formData.processInstId == null
        ) {
          this.getStart()
        }
        if (this.formData.processInstId) {
          if (this.processISOr == true) {
            let clhjList = {}
            clhjList.curTplNo = this.formData.pTplNo
            clhjList.curNodeId = this.formData.curNodeCode
            clhjList.curMultiTenancyId = this.formData.multiTenancyId
            this.$api.pubInfo.clHj(clhjList).then((res) => {
              // this.reloadTree(res.list);
              this.dialogState = true
              this.$nextTick(() => {
                // this.seletOptionsData = res.list
                let PCSAVYIDs=[];
                this.seletOptionsData = res.list.filter(item=>{
                  if(!PCSAVYIDs.includes(item.PCSAVYID)){
                    PCSAVYIDs.push(item.PCSAVYID);
                    return item;
                  }
                })
                this.seletOptionsData = this.shoNextNode(this.seletOptionsData, this.huanJieMessage.acyNodeNextBount)
              })
            })
          }
        }
        this.$message({ type: 'success', message: '保存成功' })
        this.$route.query.pdnId = res.data.pdnId
        console.log(this.$route.query.pdnId)
        this.getHuanJie()
        this.isAggree()
        if (this.showBtnis == true) {
          this.$intent.closeWindow(this)
        }
      })
      return false
    },
    reloadTree(list) {
      let that = this;
      let PCSAVYIDs=[];
      that.seletOptionsData = list.filter(item=>{
        if(!PCSAVYIDs.includes(item.PCSAVYID)){
          PCSAVYIDs.push(item.PCSAVYID);
          return item;
        }
      })
      // that.seletOptionsData = that.shoNextNode(that.seletOptionsData, that.huanJieMessage.acyNodeNextBount)
      that.seletOptionsData = list;
      that.$set(that.formData, "function", "selWfNode");
      that.$set(that.formData, "curTplNo", that.seletOptionsData[0].PTPLNO);
      that.$set(that.formData, "curMultiTenancyId", that.seletOptionsData[0].MULTITENANCYID);
      that.$set(that.formData, "wfeUnitId", that.formData.createOrgId);
      that.$set(that.formData, "pcsAvyId", that.seletOptionsData[0].PCSAVYID);

      that.$post
        .postData("selWfNode", JSON.stringify(that.formData), "A08462007")
        .then(res => {
          if (res.message == "Loading") {
            that.loadingTree = true;
          } else {
            that.loadingTree = false;
          }
          that.dialogState = true;
          that.treeData = (res.data && res.data.data) || [];
          that.defaultUser = (res.data && res.data.defaultUser) || {};
        })
        .catch(e => {});
    },
    //启动流程
    getStart() {
      this.$api.pubStatistics.JointPublicationStart(this.formData).then((res) => {
        this.formData = res.data
        this.formData.mainContext = JSON.parse(res.data.mainContext)
        this.formData.gaojianId = JSON.parse(res.data.gaojianId)
        /* if (res.data.mainContext) {
          this.formData.mainContext = JSON.parse(res.data.mainContext)
        } else {
          this.formData.mainContext = []
        }
        if (res.data.gaojianId) {
          this.formData.gaojianId = JSON.parse(res.data.gaojianId)
        } else {
          this.formData.gaojianId = []
        } */
        top.location = window.location.href.split('?')[0] + '?' + 'pdnId=' + res.data.pdnId
        if (this.processISOr == true) {
          let clhjList = {}
          clhjList.curTplNo = res.data.pTplNo
          clhjList.curNodeId = res.data.curNodeCode
          clhjList.curMultiTenancyId = res.data.multiTenancyId
          this.$api.pubInfo.clHj(clhjList).then((res) => {
            // this.reloadTree(res.list);
            this.dialogState = true
            this.$nextTick(() => {
              // this.seletOptionsData = res.list
              let PCSAVYIDs=[];
              this.seletOptionsData = res.list.filter(item=>{
                if(!PCSAVYIDs.includes(item.PCSAVYID)){
                  PCSAVYIDs.push(item.PCSAVYID);
                  return item;
                }
              })
              this.seletOptionsData = this.shoNextNode(this.seletOptionsData, this.huanJieMessage.acyNodeNextBount)
            })
          })
        }
        //this.$message({ type: 'success', message: res.msg })
      })
    },
    //流程选人选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.processISOr = false
      this.dialogState = false // 关闭选择人员树弹窗
      switch (dtype) {
        case 'next':
          this.next(data[0], params)
          break
      }
    },
    //完成并发送选择人
    next(person, params) {
      let inforUser = person.id.split('#')
      this.formData.nextHumanNm = person.name
      this.formData.nextHumanId = person.idStr
      this.formData.nextDeptId = inforUser[1]
      this.formData.nextPcsNodeID = params.id
      this.formData.nextPcsNodeNm = params.name

      //完成并发送的接口
      this.$api.pubStatistics
        .JointPublicationProcess(this.formData)
        .then((res) => {
          this.$message({
            type: 'success',
            showClose: true,
            message: '完成并发送成功',
          })
          this.messageWarn(person.idStr)
          this.$intent.closeWindow(this)
        })
        .catch((err) => {})
    },
    //微信消息提醒
    messageWarn(userId) {
      this.$api.meeting
        .infoRemind({
          userId: userId, //完成并发送选择的人员用户ID（humanID)
          productCode: 'caiBZK', //项目编号（对应字典（提醒项目分类））
          urgentType: '', //紧急程度（部分功能有）
          infoType: '信息刊物采编组刊', //类型（模块名称中文（例如 收文，发文））
          infoTitle:
            '《' + this.formData.journalTypeName + '》' + this.formData.columnTypeName + '采编', //业务标题
          infoUser: this.formData.curUsernm, //当前操作人名称
          pcUrl: location.hash.replace('#/',''),
          instId: this.$route.query.pdnId
        })
        .then((res) => {})
        .catch((err) => {})
    },
    //收回
    getwithdraw() {
      this.formData.mainContext = this.$refs.tree.data
      this.$api.pubStatistics.JointPublicationwithdraw(this.formData).then((res) => {
        this.$intent.closeWindow(this)
      })
    },
    //退回编辑
    getReturn() {
      this.formData.mainContext = this.$refs.tree.data
      if (this.formData.isAgree ) {
        this.$api.pubStatistics.JointPublicationReturn(this.formData).then((res) => {
          this.$intent.closeWindow(this)
        })
      }
    },
    //是否有审核意见
    isAggree(){
      if(this.auditOpinionsList.length>0 || this.formData.auditOpinions !== ''){
        console.log('显示按钮')
        this.idea = true
      }else{
        this.idea = false
      }
    },
    //获取审核意见
    getOptions() {
      this.$api.pubStatistics.JointPublicationOption({ pubId: this.formData.pdnId }).then((res) => {
        this.auditOpinionsList = res.list
        this.isAggree()
      })
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
    },
    //控制节点拖入位置
    allowDrop(draggingNode, dropNode, type) {
      switch (dropNode.data.key) {
        case 'manuscript':
          return type !== 'inner'
          break
        case 'main':
          return false
          break
        case 'column':
          return type === 'inner' ? true : false
          break
      }
    },
    //控制那个可拖拽节点
    allowDrag(draggingNode) {
      if (!draggingNode.data.key.indexOf('column') || !draggingNode.data.key.indexOf('main')) {
        return false
      } else {
        return true
      }
    },
    //添加稿件
    addManuscript(name) {
      this.ifMenu = false
      let cont = 1
      const newChild = {
        id: cont++,
        key: 'manuscript',
        label: name,
        // children: []
      }
      if (!this.rightData.children) {
        this.$set(this.rightData, 'children', [])
      }
      this.rightData.children.push(newChild)
      // this.treeData = this.$refs.tree.getNode('main').data
    },
    //编辑稿件
    editManuscript() {
      if (this.formData.pdnId) {
        this.ifView = 1
        const children = this.rightData.children || this.rightData
        const index = children.findIndex((d) => d.id === this.onData.id)
        this.nerStr = this.rightData.children[index].rows.gId
        if (this.rightData.children[index].rows.pubMainFilePath) {
          let pubMainFilePathName = this.rightData.children[index].rows.pubMainFilePath.split('/')
          let pathName = pubMainFilePathName[pubMainFilePathName.length - 1]
        let bank_doDownloadFile = { function: 'doDownloadFile' }
        bank_doDownloadFile.fileName = pathName
        bank_doDownloadFile.filePath =  this.rightData.children[index].rows.pubMainFilePath
          this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
            .then(res => {
            if (res) {
                res.ifView = 1
                this.doDraftCkgj(res)
              } else {
                this.$message({
                  type: 'error',
                  showClose: true,
                  offset: 400,
                  message: '下载失败',
                  duration: 500,
                })
              }
            })
        } else {
          this.$message({
            type: 'error',
            message: '该数据没生成正文',
          })
        }
      } else {
        this.$message({
          type: 'error',
          message: '请先保存数据',
        })
      }
      // this.save()
      // let save = this.save()
      // if (save === false) {
      //   // 数据有问题只能获取到列表的第一条数据
      //   if (this.rightData.children[0].rows.pathName) {
      //     let bank_doDownloadFile = { function: 'doDownloadFile' }

      //   } else {

      //     bank_doDownloadFile.fileName = pathName
      //     bank_doDownloadFile.filePath = this.rightData.children[0].rows[0].pubMainFilePath
      //     this.$post
      //       .postData(
      //         'doDownloadFile',
      //         JSON.stringify(bank_doDownloadFile),
      //         this.$businessCode.fawglfj
      //       )
      //       .then((res) => {
      //         if (res) {
      //           if (res) {
      //             res.ifView = 1
      //             this.doDraftCkgj(res)
      //           } else {
      //             this.$message({
      //               type: 'error',
      //               showClose: true,
      //               offset: 400,
      //               message: '下载失败',
      //               duration: 500,
      //             })
      //           }
      //         }
      //       })
      //   }
      // }

      // this.ifMenu = false;
      // let cont = 1;
      // const newChild = {
      //   id: cont++,
      //   key: "manuscript",
      //   label: "testtest"
      //   // children: []
      // };
      // if (!this.rightData.children) {
      //   this.$set(this.rightData, "children", []);
      // }
      // this.rightData.children.push(newChild);
      // this.treeData = this.$refs.tree.getNode('main').data
    },
    // 编辑稿件跳转
    doDraftCkgj(fileInfo) {
      let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
      let data = this.$router.resolve({
        path: Path,
        query: {
          id: this.nerStr,
          tanSun: '2',
          zhengWenState: this.ifView,
          JYcode: 'A0846C002',
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '',
          multiTenancyId: '000076767qwq0',
          showBtns: true,
          saveNameAndNumber: this.num
        },
      })
      this.$forceUpdate()
      var one = data.href.split('?')[0]
      var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
      window.open(newPath, "_blank");
    },
    // //查看正文
    // doDraftLook(fileInfo){
    //   let data = this.$router.resolve({
    //     path: '/openAndSave_WordHk',
    //     query: {
    //       state: 'viewFile',
    //       zhengWenState: '0',
    //       id: this.formData.pdnId,
    //       relativePath: fileInfo ? fileInfo.filePath : '',
    //       fileName: fileInfo ? fileInfo.fileName : '',
    //     },
    //   })
    //   this.$forceUpdate()
    //   window.open(data.href, '_blank')
    // },
    doDraftClzw(fileInfo){
      if (this.cleanDraftFlag === true){
        this.backupTitle = '清稿'
      } else if (this.cleanDraftFlag === false) {
        this.backupTitle = '[' + this.newTime + ']' + '刊物定稿'
      }
      let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
      let data = this.$router.resolve({
        path: Path,
        query: {
          state: 'viewFile',
          id: this.formData.pdnId,
          tanSun: 'clzw',
          zhengWenState: this.ifView,
          JYcode: 'A0846C002',
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '',
          multiTenancyId: '000076767qwq0',
          showBtns: true,
          gaojianId: JSON.stringify(this.zwGaojian) ? JSON.stringify(this.zwGaojian) : '',
          mainContext: JSON.stringify(this.gmainContext) ? JSON.stringify(this.gmainContext) : '',
          backupTitle : this.backupTitle,
          saveCleanFile: this.saveCleanFile,
          cleanDraftFlag: this.cleanDraftFlag,
          saveNameAndNumber: this.num
        },
      })
      this.$forceUpdate()
       var one = data.href.split('?')[0]
      var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
      window.open(newPath, "_blank");
    },
    // 申请跳转
    doDraftPubFinalize(fileInfo) {
      if (this.cleanDraftFlag === true){
        this.backupTitle = '清稿'
      } else if (this.cleanDraftFlag === false) {
        this.backupTitle = '[' + this.newTime + ']' + '刊物定稿'
      }
      let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
      let data = this.$router.resolve({
        path: Path,
        query: {
          state: 'viewFile',
          id: this.formData.pdnId,
          tanSun: 'pubManuscript',
          zhengWenState: this.ifView,
          JYcode: 'A0846C002',
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '',
          tmpFilePath: fileInfo ? fileInfo.filePath : '',
          tmpFileName: fileInfo ? fileInfo.fileName : '',
          multiTenancyId: '000076767qwq0',
          showBtns: true,
          gaojianId: JSON.stringify(this.zwGaojian) ? JSON.stringify(this.zwGaojian) : '',
          mainContext: JSON.stringify(this.gmainContext) ? JSON.stringify(this.gmainContext) : '',
          backupTitle : this.backupTitle,
          saveCleanFile: this.saveCleanFile,
          cleanDraftFlag: this.cleanDraftFlag,
          saveNameAndNumber: this.num
        },
      })
      this.$forceUpdate()
      var one = data.href.split('?')[0]
      var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
      window.open(newPath, "_blank");
    },
    //重命名
    RenameManuscript() {
      this.remOrAddColumn = 'rem'
      this.columnTitle = '重命名'
      this.inputLable = '稿件名称'
      this.ifColumnMenu = false
      this.columnVisible = true
    },
    //上传稿件
    uploadManuscript() {},
    //移除稿件
    // removeManuscript() {
    //    const children = this.rightData.children || this.rightData
    //   const index = children.findIndex((d) => d.id === this.onData.id)
    //   children.splice(index, 1)
    //   this.ifMenu = false
    // },
    // 右键稿件删除
    remove() {
      // const parent = node.parent;
      const children = this.rightData.children || this.rightData
      const index = children.findIndex((d) => d.id === this.onData.id)
      children.splice(index, 1)
      this.formData.gaojianId.forEach((item) => {
        if (item.id == this.onData.id) {
          this.formData.gaojianId.splice(index, 1)
        }
      })
      this.ifMenu = false
      this.ifColumnMenu = false
    },
    // 打开新建栏目菜单
    addColumn() {
      this.columnTitle = '新建栏目'
      this.remOrAddColumn = 'add'
      this.inputLable = '栏目名称'
      this.ifColumnMenu = false
      this.columnVisible = true
    },
    //重命名栏目弹层
    reColumnName() {
      this.remOrAddColumn = 'rem'
      this.columnTitle = '重命名'
      this.inputLable = '栏目名称'
      this.ifColumnMenu = false
      this.columnVisible = true
    },
    // 右键功能弹层
    rightMenBtn() {
      // GaojiantreeData
      if (this.remOrAddColumn === 'add') {
        let cont = 1
        // this.$route.query
        const newChild = {
          id: cont++,
          key: 'column',
          label: this.colNameData,
          children: [],
        }
        this.rightData.children.push(newChild)
        this.columnVisible = false
        this.ifMain = false
      } else {
        this.columnVisible = false
        this.ifMenu = false
        this.protoRightData.label = this.colNameData
      }
    },
    reColumnNameFn() {
    },
    selectChange(rows) {
      //采用选择
      this.selectRows = rows
    },
    getList() {
      //采用稿件
      //if (this.formData.gaojianId.length === 0) {
      // let arr1 = this.formData.gaojianId.length
      // let arr2 = this.selectRows.length
      // if(arr1 + arr2 > 10){
      //   this.$message({
      //     type:'warning',
      //     message:'超出合刊最大限制（10个稿件）'
      //   })
      //   return true
      // }
      this.selectRows.forEach((item) => {
        let gaojianParams = {
          id: item.gId,
          name: item.title,
          content: item.content,
        }
        let params = {
          id: item.gId,
          label: item.title,
          key: 'manuscript',
          rows: item,
        }
        this.formData.gaojianId.push(gaojianParams)
        this.GaojiantreeData[0].children[0].children.push(params)
        let objarr = {}
        this.formData.gaojianId = this.formData.gaojianId.reduce((cur, next) => {
          objarr[next.id] ? '' : (objarr[next.id] = true && cur.push(next))
          return cur
        }, [])
        let obj = {}
        this.GaojiantreeData[0].children[0].children = this.GaojiantreeData[0].children[0].children.reduce(
          (cur, next) => {
            obj[next.id] ? '' : (obj[next.id] = true && cur.push(next))
            return cur
          },
          []
        )
        //}
      })
      /* }  else {
        //let arry = JSON.parse(this.formData.gaojianId)
        this.selectRows.forEach((item) => {
          let gaojianParams = {
            id: item.gId,
            name: item.title,
          }
          let params = {
            id: item.gId,
            label: item.title,
            key: 'manuscript',
            rows: this.selectRows,
          }
          this.formData.gaojianId.push(gaojianParams)
          this.GaojiantreeData[0].children[0].children.push(params)
          let objarr={}
          this.formData.gaojianId=this.formData.gaojianId.reduce((cur,next)=>{
            objarr[next.id]?"":objarr[next.id]=true && cur.push(next);
            return cur
          },[])
          let obj={}
          this.GaojiantreeData[0].children[0].children=this.GaojiantreeData[0].children[0].children.reduce((cur,next)=>{
            obj[next.id]?"":obj[next.id]=true && cur.push(next);
            return cur
          },[])
        }) */
      //this.formData.gaojianId.push(arry)
      //}
      // this.formData.gaojianId = []
    },
    defaultFn() {
      this.ifMenu = false
      this.ifColumnMenu = false
    },
    // 右键显示菜单
    rightClick(e, data, node, comp) {
      this.protoRightData = data
      if (node.data.key === 'main') {
        this.rightData = node.data
      } else if (node.data.key === 'column') {
        this.rightData = node.parent.data
      } else {
        this.rightData = node.parent.data
      }

      this.onData = data

      if (data.key === 'column') {
        this.ifColumnMenu = true
        this.ifMenu = false
        this.ifMain = false
        this.getEle('#columnMenu', e)
      } else if (data.key === 'manuscript') {
        this.ifMenu = true
        this.ifColumnMenu = false
        this.ifMain = false
        this.getEle('#rightMenu', e)
      } else {
        this.ifMain = true
        this.ifColumnMenu = false
        this.ifMenu = false
        this.getEle('#mainColumn', e)
      }

      // "position: fixed; left: " + (e.clientX - 10) + 'px' + "; top: " + (e.clientY - 25) + 'px; z-index: 999; cursor:pointer;'
    },
    getEle(eleName, e) {
      let menu = document.querySelector(eleName)
      menu.style.cssText =
        'position: fixed; left: ' +
        (e.clientX - 10) +
        'px' +
        '; top: ' +
        (e.clientY - 25) +
        'px; z-index: 999; cursor:pointer;'
    },
    //展示备选稿件
    alternativeFn() {
      if (this.alternative) {
        this.alternative = false
      } else {
        this.alternative = true
      }
    },
    //树选择
    checkTree() {
      this.$nextTick(() => {
        this.nowChecked = this.$refs.departTree.getCheckedNodes()
      })
    },
    //确定
    sureBtn() {
      if(this.nowChecked.length>0){
        if (this.tableTitle == '刊物发布') {
            this.formData.publicType = 'kanwufabu'
          } else if (this.tableTitle == '向下级发送') {
            this.formData.publicType = 'xiangxiajifasong'
          }
          let arr =  this.nowChecked.filter(item=>{
            return item.id.split('').length >= '3'
          })
          let kanwuIdList = []
          let kanwuNameList = []
          arr.forEach((item) => {
            kanwuIdList.push(item.id)
            kanwuNameList.push(item.name)
          })
          let strID = kanwuIdList.join(',')
          let strName = kanwuNameList.join(',')
          //向下级发送
          this.formData.orgIdArr = strID + ',' + JSON.parse(localStorage.getItem('userInfo')).unitId
          this.formData.orgNameArr =strName + ',' + JSON.parse(localStorage.getItem('userInfo')).unitName
          this.formData.deptIdArr=''
          this.formData.deptNameArr=''
          this.tableVisible = false
            console.log('请求开始0')
          this.$api.pubStatistics.JointPublicationRelease(this.formData).then((res) => {
            console.log('请求开始')
            this.$message({ type: 'success', message: '操作成功' })
            this.$intent.closeWindow(this)
          }) 
      }else{
        this.$message({ type: 'error', message: '请勾选数据' })
      }
    },
    //刊物发布
    kanwufabu() {
        this.tableVisible = true
        this.tableTitle = '刊物发布'
    },
    //常用部门发送
    changyongbumenfasong() {
        this.dapartVisible = true
    },
    /* getOrgList(org) {
      let parmentnameList = []
      let parmentidList = []
      org.forEach((item) => {
        parmentnameList.push(item.unitName)
        parmentidList.push(item.id)
      })
      this.formData.orgIdArr = parmentidList.join(',')
      this.formData.orgNameArr = parmentnameList.join(',')
      this.formData.publicType = 'changyongbumenfasong'
      this.$api.pubStatistics.JointPublicationRelease(this.formData).then((res) => {
        this.$message({ type: 'success', message: res.msg })
      })
      this.showOrgTree = false
    }, */
    //向下级行发送
    xiangyijifasong() {
        this.tableVisible = true
    },
    //发布或发送部门接口
    ReleaseDepartment() {
      this.$api.pubStatistics
        .JointPublicationdepartment({ createOrgId: this.formData.createOrgId })
        .then((res) => {
          res.data.forEach(item=>{
            let obj = {
              id: item.id,
              label: item.label,
              name: item.name,
              disabled:false,
              children:item.children
            }
            this.publishLimitData.push(obj)
          })
        })
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ) //必填控制域
      this.readFields = this.setReadFields(this.readFields, this.huanJieMessage.readFields) //不可编辑控制域
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ) //按钮
      this.rules = {
        sendUser: [
          {
            required: this.requiredFields.sendUser,
            message: '不能为空',
            trigger: 'change',
          },
        ], //发送
        chSendUser: [
          {
            required: this.requiredFields.chSendUser,
            message: '不能为空',
            trigger: 'change',
          },
        ], //摘发
        curEditUnm: [
          {
            required: this.requiredFields.curEditUnm,
            message: '不能为空',
            trigger: 'change',
          },
        ], //本期编辑人员
        phone: [
          {
            required: this.requiredFields.phone,
            message: '不能为空',
            trigger: 'change',
          },
        ], //联系电话
        sendRange: [
          {
            required: this.requiredFields.sendRange,
            message: '不能为空',
            trigger: 'change',
          },
        ], //发送范围
        auditOpinions: [
          {
            required: this.requiredFields.auditOpinions,
            message: '不能为空',
            trigger: 'change',
          },
        ], //审核意见
      }
      //根据常用及部门配置接口，，常用及部门发送按钮显示隐藏
      this.$api.paraMeter.FadepartmentXq({creatOrgId:JSON.parse(localStorage.getItem('userInfo')).unitId }).then((res) => {
        if(res.data.commonIsflag=="0"){
          this.buttonList[14].show=false
        }
      })
      if (this.formData.curNodeName == '处理完毕【办结】') {
        console.log('这是办结表单')
        // 查看正文、增发、收回发布
        this.buttonList[16].show = true
        this.buttonList[4].show = true
        this.overState = false
      }
    },
    //流程配置按钮
    getHuanJie() {
      this.$api.pubInfo.clHjkzbtn(this.dataqc).then((res) => {
        this.huanJieMessage = res.data
        this.setConfig()
      })
    },
    //获取生成期号
    getCreatedCOde() {
      if (
        (this.formData.issue == '' && this.formData.totalIssue == '') ||
        (this.formData.issue == undefined && this.formData.totalIssue == undefined)
      ) {
        this.$api.pubStatistics
          .checkSearchParams({
            pubMgId: this.formData.journalTypeId,
          })
          .then((res) => {
            if (res.data[0].pubIssue && res.data[0].pubTotalIssue) {
              this.formData.issue = res.data[0].pubIssue
              this.formData.totalIssue = res.data[0].pubTotalIssue
              this.issue = 'false'
              this.getHuanJie()

              //生成期号两个字段拥有值之后又保存
              this.save()
            } else {
              this.$message({
                message: '没有获取到期号，请先配置期号',
                type: 'error',
              })
            }
          })
      } else {
        this.$message({ type: 'error', message: '已有期号' })
      }
    },

    /** 刊物定稿 */
    publicationFinalized() {
      let date = new Date().toLocaleString('chinese', { hour12: false })
      let tempArr = []
      tempArr = date.split('/')
      this.newTime = tempArr.join('-')
      if (this.formData.issue && this.formData.totalIssue) {
        // 刊物定稿前必须保证数据最新（这里调用保存的方法）
        this.ifView = 1
        this.saveCleanFile = true
        this.zwGaojian = this.formData.gaojianId
        this.gmainContext = this.formData.mainContext
        if (this.zwGaojian.length == 0) {
          this.$message({
            message: '请先采用稿件',
            type: 'warning',
          })
          return true
        }
        if (this.pubData.tplAuthorshipNm && this.pubData.tplAuthorshipPath) {
          let bank_doDownloadFile = { function: 'doDownloadFile' }
          bank_doDownloadFile.fileName = this.pubData.tplAuthorshipNm
          bank_doDownloadFile.filePath = this.pubData.tplAuthorshipPath
          let draftInfoOner = []

          var newData = {
            menus: [],
            // contents: [],
            send:
              '董事长，行长，监事长，高管层，总行各部门负责人，各分行行长,各海外机构、各审计分部、各总审计室负责人，建行大学各专业研修院、各学院负责人，各子公司负责人',
          }
          for (let i = 0; i < this.gmainContext[0].children.length; i++) {
            let labelList = this.gmainContext[0].children
            for (let j = 0; j < labelList[i].children.length; j++) {
              newData.menus.push('●' + labelList[i].children[j].rows.title)
              // newData.contents.push(labelList[i].children[j].rows.content)
              let pubMainFilePathName = labelList[i].children[j].rows.pubMainFilePath.split('/')
              let pathName = pubMainFilePathName[pubMainFilePathName.length - 1]
              let obj = {
                filePath: labelList[i].children[j].rows.pubMainFilePath,
                fileName: pathName,
                filePathBd:  labelList[i].children[j].rows.htmlFilePath,
              }
              draftInfoOner.push(obj)
            }
          }
          this.draftInfo = draftInfoOner
          this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
            .then(res => {
            if (res) {
                this.$store.dispatch('setDinggaoInfo', {
                  id: this.formData.pdnId, //当条数据id
                  nper: this.formData.issue ? this.formData.issue : 0,
                  time: this.formData.createTime ? this.formData.createTime : '',
                  menu: newData.menus,
                  send: newData.send,
                  // content: newData.contents.join(''),
                  draftInfo: this.draftInfo,
                })
                this.doDraftPubFinalize(res)
                this.kanwuyulanBtn = true
              }
            })
        } else {
          this.$message({
            message: '该数据没有模板',
            type: 'error',
          })
        }
      } else {
        this.$message({ type: 'error', message: '请先生成期号' })
      }
    },
    pubIsShowBack(indexList, index) {
      // 恢复备份的列表
      this.showBack = indexList[index]
    },
    //意见选择
    pubIsShow(index) {
      let label = ''
      if (index === '0') {
        label = '同意'
      } else {
        label = '不同意'
      }
      if (this.formData.auditOpinions) {
        let array = this.formData.auditOpinions.split(',')
        if (
          (array.length == 1 && this.formData.auditOpinion == '同意') ||
          this.formData.auditOpinion == '不同意'
        ) {
          array.splice(0, 0, label)
        } else {
          if (array[0] == '同意' || array[0] == '不同意') {
            array.splice(0, 1, label)
          } else {
            array.splice(0, 0, label)
          }
        }
        this.formData.auditOpinions = array.join(',')
      } else {
        this.$set(this.formData,'auditOpinions',label+',')
      }
    },
    //根据刊物获取底部表单信息
    getfromList(id) {
      this.$api.pubStatistics.checkSearchParams({ pubMgId: id }).then((res) => {
        //下面两个forEach在常用及发送按钮的使用此数据
        res.data[0].mostSendUserList.forEach((item, val) => {
          if (item.title) {
            let params = {
              children: item.id,
              name: item.name,
              title: item.title,
              disabled: true,
            }
            this.cyfsData[0].children.push(params)
          }
        })
        res.data[0].sendRangeUserList.forEach((item, index) => {
          if (item.title) {
            let params = {
              children: item.id,
              name: item.name,
              title: item.title,
              // disabled: true,
            }
            this.fsfwData[0].children.push(params)
            this.formDatafsfwData[0].children.push(params)
          }
        })
        if (this.$route.query.EditGroupList) {
          let fromList = res.data[0]
          let sendDataList = []
          if (fromList.sendUserList) {
            fromList.sendUserList.forEach((item) => {
              if (item.name) {
                sendDataList.push(item.name)
              }
            })
            this.formData.sendUser = sendDataList.join(',') //发送
          }
          let chSendUserDataList = []
          fromList.chSendUserList.forEach((item) => {
            if (item.name) {
              chSendUserDataList.push(item.name)
            }
          })
          this.formData.chSendUser = chSendUserDataList.join(',') //摘发
          this.formData.curEditUnm = fromList.pubCurEditUnm //本期编辑人员
          this.formData.curEditUid = fromList.pubCurEditUid //本期编辑人员id
          this.formData.phone = fromList.pubCurEditUph //联系电话
        }
      })
    },

    //发送范围按钮
    sendBtn() {
      this.sendVisible = true
    },
    sendSureBtn() {
        let sendNameList = []
        this.formDataselectfsffList.forEach(item=>{
          if(item.drafId){
            sendNameList.push(item.drafName)
          }
          if(item.OrgId){
            sendNameList.push(item.OrgName)
          }
        })
        this.formData.sendRange = sendNameList.join(',')
        this.sendVisible = false
    },
    getautor() {
      //总行显示表单
      let stepJudge = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      if (stepJudge != '总行') {
        this.ZHisDia = true
      }
    },
    //上传定稿
    copyText(type) {
      let backTitle = '[' + this.newTime + ']' + '上传定稿'
      let params = {
        // 备注名字
        backupTitle: backTitle,
        //保存时间
        editTime: '', //自动生成
        //保存人id
        editUserId: '', //	自动生成
        //保存人名称
        editUserName: '', //	自动生成
        //入选稿件对象字符串
        gaojianId: this.formData.gaojianId, //
        //树形结构字符串
        mainContext: this.formData.mainContext, //
        //正文附件name
        mainFileName: this.formData.mainFileName, //
        //正文附件地址
        mainFilePath: this.formData.mainFilePath, //
        //关联业务id
        pdnId: this.formData.pdnId, //
        //合刊备份 主键id
        pdnbId: '', //	自动生成
      }
      if (type == 1) {
        this.dialogVisibleCopyText = true
      } else {
        this.$api.pubStatistics.JointPublicationText(params).then((res) => {
          if (res.code == 'SUCCESS') {
            this.$message({
              message: '上传定稿成功',
              type: 'success',
            })
          } else {
            this.$message({
              message: '上传定稿失败',
              type: 'error',
            })
          }
        })
      }
    },
    //上传定稿
    upDataText() {
      this.formData.isUpload = '1'
      this.$api.pubStatistics.JointPublicationSave(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          this.copyText(2)
          this.formData.isUpload = res.data.isUpload
          this.getHuanJie()
        }
      })
    },
    //稿件列表接口
    getIntList() {
      this.searchData.pubMgId = this.publicationId
      this.searchData.cyStaut = '2or3'
      this.searchData.drafOrgId = ''
      this.searchData.remork2 = JSON.parse(localStorage.getItem('userInfo')).unitId
      if (this.searchData.dataTime == undefined) {
        this.searchData.startBeixuanDate = ''
        this.searchData.endBeixuanDate = ''
      } else {
        this.searchData.startBeixuanDate = this.searchData.dataTime[0]
        this.searchData.endBeixuanDate = this.searchData.dataTime[1]
      }
      this.$api.pubStatistics
        .JointPublicationGetInt(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data
          this.pagination.total = res.total
        })
    },
    //常用及部门发送勾选的数据
    cyfscheckTree(now, check, hascheck) {
      this.selectcyfsList = check.checkedNodes
    },
    //发送范围勾选的数据
    fsffcheckTree(now, check, hascheck) {
      this.selectfsffList = check.checkedNodes
    },
    //表单的发送范围勾选数据
    formDatafsffcheckTree(now, check, hascheck){
      this.formDataselectfsffList = check.checkedNodes
    },
    //常用及部门发送确定按钮
    ccbmAndsend() {
        if(this.selectcyfsList.length>0 || this.selectfsffList.length>0){
        let arr =  this.selectfsffList.filter(item=>{
          return item.drafId !== undefined || item.OrgId !== undefined 
        })
        let deptIdArrList = []
        let deptNameArrList = []
        let orgIdArrList = []
        let orgNameArrList = []
        let humanCodeArrList=[]
        let humanNameArrList=[]
        this.selectcyfsList.forEach(item=>{
          if(item.cyhumanId){
            humanCodeArrList.push(item.cyhumanId)
            humanNameArrList.push(item.cyhumanName)
          }
        })
        arr.forEach(item=>{
          if(item.drafId){
            deptIdArrList.push(item.drafId)
            deptNameArrList.push(item.drafName)
          }
          if (item.OrgId) {
            orgIdArrList.push(item.OrgId)
            orgNameArrList.push(item.OrgName)
          }
        })
        this.formData.depIdArr = deptIdArrList.join(',')//发送部门id
        this.formData.depNameArr = deptNameArrList.join(',')//发送部门名称
        this.formData.orgIdArr = orgIdArrList.join(',')//发送机构id
        this.formData.orgNameArr = orgNameArrList.join(',')//发送机构 名称
        this.formData.humanCodeArr=humanCodeArrList.join(',')//发送个人的humanCode
        this.formData.humanNameArr=humanNameArrList.join(',')//发送个人的name
        this.formData.publicType = 'changyongbumenfasong'

       this.dapartVisible = false 
        this.$api.pubStatistics.JointPublicationRelease(this.formData).then((res) => {
          this.$message({ type: 'success', message: '操作成功' })
          this.$intent.closeWindow(this)
        })
      } else {
        this.$message({ type: 'error', message: '请勾选数据' })
      }
    },
  },
  created() {
    //详情接口
    if (this.$route.query.pdnId) {
      this.$api.pubStatistics
        .JointPublicationList(
          { pdnId: this.$route.query.pdnId, createOrgId: JSON.parse(localStorage.getItem('userInfo')).unitId},
          {
            PAGE_JUMP: 1,
            REC_IN_PAGE: 10,
          }
        )
        .then((res) => {
          this.formData = res.data[0]
          let issue = ''
          if (this.formData.issue) {
            issue = '第' + this.formData.issue + '期'
          } else {
            issue = ''
          }
          this.num = this.formData.title
          console.log(this.num)
          if(res.tcHumanRoles){
            this.tcHumanRoles = res.tcHumanRoles.isDirectBack
          }
          this.BtnIsHidden = true
          this.formData.mainContext = JSON.parse(this.formData.mainContext)
          this.GaojiantreeData = this.formData.mainContext
          this.formData.gaojianId = JSON.parse(this.formData.gaojianId)
          this.publicationId = this.formData.journalTypeId
          this.dataqc.pcsAvyId = this.formData.curNodeCode
          this.dataqc.pcsTpId = this.formData.pTplNo
          //如果有期号就不显示生成期号的按钮
          if (
            (this.formData.issue !== '' && this.formData.issue !== 0) ||
            (this.formData.issue && this.formData.issue !== 0)
          ) {
            this.issue = 'false'
          }
          //流程显示的按钮 当前处理人和登录人是同一个人
          if (
            this.formData.curUserId == JSON.parse(localStorage.getItem('userInfo')).humanCode &&
            this.formData.processStaut !== '02'
          ) {
            this.ISCurrentName = true
          } else if (
            this.formData.curUserId != JSON.parse(localStorage.getItem('userInfo')).humanCode ||
            this.formData.processStaut == '02'
          ) {
            this.ISCurrentName = false
            this.pageDisabled = true
          }

          //是否有流程显示查看正文
          if (this.formData.mainFilePath) {
            this.kanwuyulanBtn = true
          }
          //起草人可见按钮
          if (this.formData.supUserId == JSON.parse(localStorage.getItem('userInfo')).humanCode) {
            this.isReturn = true
          } else if (
            this.formData.supUserId != JSON.parse(localStorage.getItem('userInfo')).humanCode
          ) {
            this.isReturn = false
          }

          if (
            JSON.parse(localStorage.getItem('userInfo')).humanName == this.formData.supUserNm &&
            this.formData.curUserNm !== this.formData.supUserNm &&
            this.formData.processStaut !== '02'&&
            this.formData.isRead == '0'
          ) {
            this.takeBackv = true
          } else {
            this.takeBackv = false
          }
          // takeBackv
          this.getHuanJie()
          this.getOptions()
          this.getfromList(this.publicationId)
          this.publicationList()
          this.getIntList()
          this.ReleaseDepartment()
        })
        if (this.formData.curNodeName == '处理完毕【办结】') {
          console.log('这是办结表单')
          // 查看正文、增发、收回发布
          this.buttonList[4] = true
          this.overState = true
        }
    }
    this.getautor()
    //主列表采编主刊确定以后的路由参数
    if (this.$route.query.EditGroupList) {
      let id = JSON.parse(this.$route.query.EditGroupList).id
      let pubColumnNm = JSON.parse(this.$route.query.EditGroupList).pubColumnNm
      let Jb = JSON.parse(localStorage.getItem('userInfo'))
      this.publicationId = id
      this.formData.journalTypeId = id
      this.formData.journalTypeName = JSON.parse(this.$route.query.EditGroupList).pubNm
      this.formData.columnTypeName = pubColumnNm
      this.dataqc.humanId = Jb.humanId
      this.ISCurrentName = true
      //默认添加树形结构
      let params = {
        id: id,
        label: pubColumnNm,
        key: 'column',
        children: [],
      }
      this.GaojiantreeData[0].children.push(params)
      this.getHuanJie()
      this.getfromList(this.publicationId)
      this.publicationList()
      this.getIntList()
    }
  },
}
</script>
<style lang="less" scoped>
.backup{
  width: 80%;
  margin: 0 auto;
}
.box{
  height: 54px;
}
.font-color{
  color: #f9aa21;
}
.search{
  margin-left: 10px;
}
.pub-time{
  float: right;
}
.pubIsShowList{
    max-height: 200px;
    overflow: auto;
}
.closeX {
  position: absolute;
  top: -5px;
  right: 5px;
  color: #33ccff;
  font-size: 12px;
  z-index: 1000;
}
.mainContent {
  padding: 30px;
  margin: 0 10%;
}
.topBtn {
  width: 100%;
  padding: 15px;
  background: #409eff;
  text-align: right;
  position: fixed;
  z-index: 1001;
  height: 54px;
}
.el-tree-node__content {
  height: none;
}
.right-menu {
  padding: 20px;
  border: 1px solid #f1f1f1;
  background: #fff;
  line-height: 35px;
  z-index: 1003 !important;
}
// .contentGroup {
//   padding:0 30px 30px 30px;
// }
.formContent {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
}
.itemForm {
  display: flex;
  justify-content: space-between;
}
.titleTree {
  position: relative;
  bottom: -1px;
}
.treeContent {
  margin-top: 20px;
}
.el-tree {
  border: 1px solid #f1f1f1;
  padding: 15px;
  line-height: 55px;
}
.topNav {
  display: flex;
  justify-content: space-between;
  border: 1px solid red;
  line-height: 35px;
  margin: 0 11.5%;
  margin-bottom: 20px;
  padding: 0 10px;
  background: rgb(254, 247, 231);
}
.topSeach {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.topTitle {
  margin-bottom: 20px;
  h2 {
    display: flex;
    justify-content: center;
  }
  h2 {
    font-size: 36px;
    color: blue;
    padding: 20px 0;
  }
  div {
    text-align: center;
    font-size: 24;
    h3 {
      margin-bottom: 10px;
    }
  }
}
.pad_lr10 {
  padding-right: 0px;
}
.opcation {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  opacity: 0;
  z-index: 1000;
}
.opcationPage {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1002;
}
.title {
  font-size: 16px;
  color: #303133;
  margin-bottom: 10px;
  overflow: hidden;
  height: 28px;
}
.tree_w {
  max-width: 440px;
  height: 400px;
  padding-left: 20px;
}

.box_shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-scrollbar {
  height: 100%;
}
.adviceInfo {
  font-size: 14px!important;
  line-height: 20px;
  text-align: right;
}
.lineContent {
    line-height: 24px;
    font-size: 14px;
    word-break: break-all;
    white-space: pre-line;
}
.opinionTbody{
  background-color: rgba(228,231,237,.32)!important;
  color: #000;
  padding: 5px 15px 5px 5px!important;
  border: 1px solid #e4e7ed!important;
  border-radius: 4px!important;
  margin-top: 5px;
}
</style>
