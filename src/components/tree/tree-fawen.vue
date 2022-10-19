<template>
  <div class="treeWrap">
    <!-- 设置close-on-click-modal后设置close方法应该是不起作用的 -->
    <!--懒加载和非懒加载切换示使用-->
    <el-dialog
      v-dialogDrag
      :title="dialogTit"
      v-if="dialogVisible && !canTab && dialogTit!='会签'&& dialogTit!='公告至' && !useNewDialog"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="cancelSetDialog"
      width="40%"
    >
      <div v-if="offenUse">
        <div class="title">下一处理环节</div>
        <el-select
          @change="getOffenUserInfo"
          :disabled="seletOptionsData.length==0"
          class="selectlist"
          v-model="offenUseConfig.nextNodeId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in seletOptionsData"
            :key="item.PCSAVYID"
            :label="item.AVYNODENM"
            :value="item.PCSAVYID"
          ></el-option>
        </el-select>
      </div>
      <el-row class="qiehuan">
        <el-col :span="12">
          <div class="title" v-if="!hasOffenSet">
            <span>{{titleWords}}</span>
            <div class="rightwrap" v-if="dialogType=='dosend'">
              <el-checkbox  @change="getOffenUserInfo" v-model="offenUseConfig.set">常用发送对象</el-checkbox>
            </div>
          </div>
          <div class="tree_w box_shadow" :style="{'height':defaultHeight}">
            <el-scrollbar v-if="loadingState">
              <el-tree
                show-checkbox
                v-show="loadingTreeCopy&&tabTreeFlag&&!offenUserFlag"
                ref="comptreeLoad"
                :check-on-click-node="true"
                :check-strictly="false"
                @check="checkTree"
                node-key="id"
                :default-expanded-keys="openIds"
                :load="loadNode"
                @node-click="handleNodeClick"
                lazy
                :props="defaultProps"
              >
                <span :title="node.label" :class="['custom-tree-node',{'userflag':data.TYPE == 'user'}]" slot-scope="{ node,data }">
                  <i
                    :class="data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'"
                  >{{node.label}}</i>
                </span>
              </el-tree>
              <template v-if="tabTreeFlag&&!offenUserFlag">
              <el-tree
                :data="treeDataCopy"
                v-show="!loadingTreeCopy"
                show-checkbox
                ref="comptree"
                :check-on-click-node="true"
                :check-strictly="false"
                @check="checkTree"
                node-key="id"
                :default-expanded-keys="openIdsForNoLoading"
                :props="dialogType=='dosend'&&!offenUserFlag?senddefaultProps:defaultProps"
              >
                <span :title="node.label" class="custom-tree-node" slot-scope="{ node,data }">
                  <i
                    :class="data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'"
                  >{{node.label}}</i>
                </span>
              </el-tree>
              </template>
              <template>
              <el-tree
                :data="treeDataCopy"
                v-show="offenUserFlag"
                show-checkbox
                ref="comptreeOffenUser"
                :check-on-click-node="true"
                :check-strictly="true"
                @check="checkTree"
                node-key="id"
                :default-expand-all="true"
                :props="defaultProps"
              >
                <span :title="node.label" class="custom-tree-node" slot-scope="{ node,data }">
                  <i
                    :class="data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'"
                  >{{node.label}}</i>
                </span>
              </el-tree>
              </template>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            <span>已选项</span>
            <el-button
              type="primary"
              @click.native="resetCheck"
              style="float:right"
              size="mini"
              :disabled="nowCheckList.length==0"
              round
            >清空</el-button>
          </div>
          <div class="box_shadow tree_w" :style="{'height':defaultHeight}">
            <el-scrollbar>
              <div v-for="(item,index) in nowCheckList" :key="index">
                <template>
                  <div class="command_wrap">
                    <span :title="item.name" class="name">{{item.name}}</span>
                    <div class="one_btn">
                      <el-button
                        type="warning"
                        size="mini"
                        :disabled="item.disabled"
                        @click.native="deleteRow(index)"
                        round
                      >删除</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSetDialog">取 消</el-button>
        <el-button type="primary" @click="saveSetDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!--特殊发送-->
     <el-dialog
      v-dialogDrag
      :title="dialogTit"
      v-if="canTab && dialogVisible&&spicalTree"
      :visible.sync="dialogVisible"
      @close="cancelSetDialog"
      width="50%"
    >
      <el-row>
        <el-col :span="14">
          <div class="title">选择发送对象</div>
          <div class="box_shadow tree_w" :style="{'height':defaultHeight}">
           <el-scrollbar>
          <el-tabs tab-position="left" @tab-click="tabPanel" class="box_shadow">
            <el-tab-pane
              :key="item.id"
              v-for="(item,index) in treeData"
              :label="item.typeName"
              class="comp_wrap"
              ref="treeTab"
            >
              <el-checkbox
                :indeterminate="false"
                v-model="item.isIndeterminate"
                @change="checkAll=>handleCheckAllChangeSp(checkAll,index)"
              >全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChangeSp(checkedCities,index)"
              >
                <el-checkbox
                  v-for="user in item.content"
                  :label="user.id"
                  :value="user.id"
                  :key="user.id"
                >{{user.text}}</el-checkbox>
              </el-checkbox-group>
            </el-tab-pane>
          </el-tabs>
           </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="title">
            <span>已选项</span>
            <el-button
              type="primary"
              @click.native="resetCheck"
              style="float:right"
              size="mini"
              :disabled="nowCheckList.length==0"
              round
            >清空</el-button>
          </div>
          <div class="box_shadow comp_wrap">
            <div v-for="(item,index) in nowCheckList" :key="index" class="comp_list">
              <template>
                <span>{{item.text||item.name}}</span>
                <div style="float:right">
                  <el-button type="warning" size="mini" @click.native="deleteTabRowSp(index)" round>删除</el-button>
                </div>
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSetDialog">取 消</el-button>
        <el-button type="primary" @click="saveSetDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!--固定 非懒加载-->
    <el-dialog
      v-dialogDrag
      :title="dialogTit"
      v-if="!loadingTree&&!singelCheckF&& dialogVisible && !canTab && chenBanOnly&&!iswcbfs"
      :visible.sync="dialogVisible"
      @close="cancelSetDialog"
    >
      <el-row class="guding">
        <el-col :span="12">
          <div v-if="hasRadio">
            <div class="title" v-if="qbFkhRadio">
              <span>按选中部门顺序依次发送:</span>
              <el-radio v-model="setradio" @change="setRadioVal()" :disabled="sequenceFlag" label="1">是</el-radio>
              <el-radio v-model="setradio" @change="setRadioVal()" :disabled="sequenceFlag" label="0">否</el-radio>
            </div>
            <div class="title" v-if="!qbFkhRadio">
              <span>按选中部门顺序依次发送:</span>
              <el-radio v-model="setradio" :disabled="sequenceFlag" label="1">是</el-radio>
              <el-radio v-model="setradio" :disabled="sequenceFlag" label="0">否</el-radio>
            </div>
          </div>
          <div class="title">{{titleWords}}</div>
          <div class="tree_w box_shadow" :style="{'height':defaultHeight}">
            <el-scrollbar>
              <el-tree
                :data="treeDataCopy"
                show-checkbox
                :check-strictly="false"
                ref="comptree"
                :check-on-click-node="true"
                @check="checkTree"
                node-key="id"
                :default-expanded-keys="openIdsForNoLoading"
                :props="defaultProps"
              ></el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title" style="margin-top:20px">
            <span>已选项</span>
            <el-button
              type="primary"
              @click.native="resetCheck"
              style="float:right"
              size="mini"
              :disabled="nowCheckList.length==0"
              round
            >清空</el-button>
          </div>
          <div class="box_shadow tree_w" :style="{'height':defaultHeight}">
            <el-scrollbar>
              <div v-for="(item,index) in nowCheckList" :key="index" class="comp_list">
                <template>
                  <div class="command_wrap">
                    <span class="name" :title="item.name">{{item.name}}</span>
                    <div class="btns">
                      <el-button
                        type="primary"
                        size="mini"
                        @click.native="upRow(index)"
                        :disabled="index==0||item.disabled"
                        round
                      >上移</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click.native="downRow(index)"
                        :disabled="index==nowCheckList.length-1||item.disabled"
                        round
                      >下移</el-button>
                      <el-button
                        type="warning"
                        size="mini"
                        @click.native="deleteRow(index)"
                        :disabled="item.disabled"
                        round
                      >删除</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSetDialog">取 消</el-button>
        <el-button type="primary" @click="saveSetDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!--主送 抄送 本行发送-->
    <el-dialog
      v-dialogDrag
      :title="dialogTit"
      v-if="!loadingTree&&canTab && dialogVisible&&!spicalTree"
      :visible.sync="dialogVisible"
      @close="cancelSetDialog"
      width="50%"
    >
      <el-row>
        <el-col :span="24">
          <div class="title">选择发送对象</div>
          <div class="box_shadow tree_tab">
           <el-scrollbar>
          <el-tabs tab-position="left" @tab-click="tabPanel" class="box_shadow">
            <el-tab-pane
              :key="item.typeName"
              v-for="(item,index) in treeData"
              :label="item.typeName"
              class="comp_wrap"
              ref="treeTab"
            >
              <el-checkbox
                :indeterminate="false"
                v-model="item.isIndeterminate"
                @change="checkAll=>handleCheckAllChange(checkAll,index)"
              >全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChange(checkedCities,index)"
              >
                <el-checkbox
                  v-for="user in item.content"
                  :label="user.text"
                  :value="user.text"
                  :key="user.text"
                  :title="user.text"
                >{{user.text}}</el-checkbox>
              </el-checkbox-group>
            </el-tab-pane>
          </el-tabs>
           </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="10" v-if="false">
          <div class="title">
            <span>已选项</span>
            <el-button
              type="primary"
              @click.native="resetCheck"
              style="float:right"
              size="mini"
              :disabled="nowCheckList.length==0"
              round
            >清空</el-button>
          </div>
          <div class="box_shadow comp_wrap">
            <div v-for="(item,index) in nowCheckList" :key="index" class="comp_list">
              <template>
                <span class="select_obj" :style="{'max-width':setLabelwidth}" :title="item.text||item.name">{{item.text||item.name}}</span>
                <div style="float:right">
                  <el-button type="warning" size="mini" @click.native="deleteTabRow(index)" round>删除</el-button>
                </div>
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSetDialog">取 消</el-button>
        <el-button type="primary" @click="saveSetDialog">确 定</el-button>
      </span>
    </el-dialog>
    <treeChild
      :subdialogTit="subdialogTit"
      :suboffenUse="suboffenUse"
      :subcheckIds="subcheckIds"
      :subcanTab="subcanTab"
      :subsingelCheckF="subsingelCheckF"
      :subdialogState="subdialogState"
      :subLoadingTree="subLoadingTree"
      :subCheckdata="subCheckdata"
      @subshowCompDialog="subshowCompDialog"
    ></treeChild>
  </div>
</template>

<script>
import treeChild from "./tree-child";
export default {
  components: {
    treeChild
  },
  props: {
    hasOffenSet: {
      default: false,
      type: Boolean
    },
    defaultUser:{
      type: Object,
      default: () => {}
    },
    chenBanOnly: {
      default: true,
      type: Boolean
    },
    useNewDialog: {
      default: false,
      type: Boolean
    },
    searchByContact: {
      default: true,
      type: Boolean
    },
    treeTradeCode:{
      default: "A08462023",
      type: String
    },
    setradio:{
      default: "0",
      type: String
    },
    qbFkhRadio:{//签报非跨行是否按钮问题
      default: false,
      type: Boolean
    },
    qbFkhFromId: {
      default: "",
      type: String
    },
    sequenceFlag: {//是否可调整顺序
      default: false,
      type: Boolean
    },
    checkOrg: {//全选设置，值为true时可全选
      default: false,
      type: Boolean
    },
    fromdata: {
      type: Object,
      default: () => {}
    },
    titleWords:{
      default: "选择部门",
      type: String
    },
    dialogTit: String,
    dialogState: Boolean,
    singelCheckF: {
      default: false,
      type: Boolean
    },
    iswcbfs: {
      default: false,
      type: Boolean
    },
    checkIds: {
      default: () => {
        return [];
      },
      type: Array
    },
    checkData: {
      default: () => {
        return [];
      },
      type: Array
    },
    spicalTree: {
      default: false,
      type: Boolean
    },
    canTab: {
      default: false,
      type: Boolean
    },
    isCY: {
      default: false,
      type: Boolean
    },
    treeData: {
      default: () => {
        return [];
      },
      type: Array
    },
    seletOptionsData: {
      default: () => {
        return [];
      },
      type: Array
    },
    hasRadio: {
      default: false,
      type: Boolean
    },
    offenUse: {
      default: false,
      type: Boolean
    },
    dialogType: {
      default: "hui",
      type: String
    },
    dialogTypeNow: {
      default: "",
      type: String
    },
    loadingTree: {
      default: false,
      type: Boolean
    },
    loadTreeSelect:{
      pcsAvyId: {
        default: "",
        type: String
      },
      curTplNo: {
        default: "",
        type: String
      },
      curMultiTenancyId: {
        default: "",
        type: String
      },
    },
    orgId:{
      default: "",//请求当前制定部门 id
      type: String
    },
    handleLoadFlag:{
      default:true,
      type:Boolean
    },
    subOrgFlag:{
        default: true,
        type: Boolean
    },
    fixNoLoadingTree:{
        default: false,//树固定 为非懒加载模式
        type: Boolean
    },
    subAddConfig:{
       default: () => {
        return {};
      },
      type: Object
    },
    isShowFhqbm:{//
      default: false,
      type: Boolean
    },
  },
  data() {
    return {
      defaultHeight:document.body.clientHeight*0.4+'px',
      openIds:[],//懒加载只展开第一级
      openIdsForNoLoading:[],//非懒加载只展开第一级
      loadingState:false,//处理切换加载不同状态
      setLabelwidth:'',//宽度设置
      setNewValue:true,//赋值 处理多次加载
      suboffenUse: true, //是否可设置常用
      subcanTab: false, //是否可切换
      subsingelCheckF: true, // 单选true 多选为false
      subdialogTit: "常用发送对象设置", // 弹框标题
      subdialogState: false,
      subcheckIds: [],//常用联系id
      subCheckdata:[],//常用联系人全部数据
      subLoadingTree:true,//常用联系人加载
      selectInfo: {
        name: "",
        id: ""
      },
      treeForm: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: this.subOrgFlag
      },
      bank_redheader: {
        function: "selectUserByUnitTree",
        unitId: 1
      },
      offenUseConfig: {
        options: [
          {
            name: "拟稿",
            id: "draft"
          },
          {
            name: "处审核",
            id: "draft1"
          },
          {
            name: "部门领导审核",
            id: "draft2"
          },
          {
            name: "综合处理",
            id: "draft3"
          },
          {
            name: "部门核稿",
            id: "draft4"
          },
          {
            name: "部门签发",
            id: "draft5"
          }
        ],
        nextNodeId: "",
        set: false
      },
      dialogVisible: false,
      checkedCities: [],
      panelNum: 0,
      nowCheckList: [],
      senddefaultProps: {
        children: "children",
        label: "unitShort",
        isLeaf:'leaf'
      },
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf:'isLeaf'
      },
      defaultHuiProps: {
        children: "content",
        label: "text"
      },
      //请求树结构
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      loadingTreeCopy:false,
      tabTreeFlag:true,
      offenUserFlag:false,//常用联系人标示
      treeDataCopy:[],
      treeResolve:'',
      bank_subSelectByUserId:{//查询常用联系人
        function:'selectByUserId'
      },
      newPeopInfo:{},
      isManySpace: false,
      isAll: false
    };
  },
  mounted() {
  },
  methods: {
    setRadioVal(){
      localStorage.setItem("setRadioVal"+this.qbFkhFromId,this.setradio) 
    },
    //获取保存的常用联系人
    getConfigUserInfo(flag){
      // this.$post
      //   .postData("selectByUserId", JSON.stringify(this.bank_subSelectByUserId), this.$businessCode.ggywgn)
      //   .then(res => {
      //     if (res && res.success) {
      //       if(flag){
      //         this.getTreeInfo(true,res.data && res.data.contacts||'')
      //       }
      //       this.subCheckdata = res.data && res.data.contacts&&JSON.parse(res.data.contacts)||[];
      //       this.subCheckdata.map((node)=>{
      //         this.subcheckIds.push(node.id);
      //       })

      //     }else{
      //       this.$message({
      //         type: "warning",
      //         offset: 400,
      //         showClose: true,
      //         message: res.message,
      //         duration: 1000
      //       });
      //     }
      //   })
      //   .catch(erro => {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "后端返回常用联系人失败",
      //       duration: 1000
      //     });
      //   });
      this.getTreeInfo(true,true)
    },
    //常用联系人查询
    getOffenUserInfo(){
      if(this.offenUseConfig.set){
        this.getConfigUserInfo(true,true);//请求后端 查询常用人
      }else{
        this.getTreeInfo();
      }
    },
    //回显常用人
    getOffenUserById(){
      this.subdialogState = true;
       this.getConfigUserInfo();
    },
    subshowCompDialog(data, type) {
      //嵌套弹层
      if (this.subdialogState && type) {
        this.subcheckIds = data[0] ? [].concat(data[0].id) : [];
      }
      this.subdialogState = !this.subdialogState;
    },
    //懒加载数据
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.node_has = node;
        this.resolve_has = resolve;
        let obj = {
          id: this.orgId,
          pcsAvyId:this.selectInfo.id
        };
        this.handleLoadTree(obj, resolve,'root');
      }
      if (node.level > 0) {
        let obj = {
          id: node.data.id
        };
        this.handleLoadTree(obj, resolve);
      }
    },
    // 组织树操作
    handleNodeClick(data) {
      this.handleLoadTree(data);
    },
    handleLoadTree(obj, resolve,level) {
      let urlInfo = "selectUserByUnitTree";
      if(!this.handleLoadFlag){
        return false;
      }
      if(this.isCY == true){
        this.treeForm.function = "selectUserByUnitTreeCY"
        this.treeForm.unitCode = (obj && obj.id) || "";
          this.$post
          .postData(
            "selectUserByUnitTreeCY",
            JSON.stringify(this.treeForm),
            this.treeTradeCode
          )
          .then(res => {
            resolve(res.data);
          });
      }else{
        //跟节点与 展开节点接口不同
        if(level == 'root'){
         this.treeForm = Object.assign({},this.treeForm,this.fromdata);
         this.treeForm.function = "selWfNode";
        }else{
         this.treeForm = {
          flag: this.subOrgFlag,
          function:"selectUserByUnitTree",
         };
        }
        this.treeForm.pcsAvyId = this.selectInfo.id;//未设置人员域时 id 无效问题
        if(this.subAddConfig.unitId){
          this.treeForm.function = this.subAddConfig.function;
          this.treeForm.unitId = this.subAddConfig.unitId;
          this.treeForm.roleCode = this.subAddConfig.roleCode;

        }
        this.treeForm.unitCode = (obj && obj.id) || "";
          this.$post
          .postData(
            this.treeForm.function,
            JSON.stringify(this.treeForm),
            this.treeTradeCode
          )
          .then(res => {
            let checkNowIds = [];//选中的id
            if(this.fromdata.isMutil&&this.fromdata.isMutil == 1){
              for(let i = 0;i<res.data.length;i++){
                for(let j = 0;j<this.fromdata.curUserIds.length;j++){
                  if(res.data[i].idStr == this.fromdata.curUserIds[j]){
                    res.data[i].disabled = true;
                  }
                }
              }
            }
            if(res.data&&res.data.length){
              res.data.map((node)=>{
                if(node.TYPE == "user"){
                  node.isLeaf = true;
                }

                if( node.TYPE != "user" && !this.searchByContact ){
                  node.disabled = true;
                }
              })
            }
            if(this.loadingTree && this.searchByContact){
              this.$nextTick(()=>{
                if(obj.level == 0){
                  this.openIds = [res.data&&res.data[0]&&res.data[0].id];
                }
                this.checkIds.map((checkItem)=>{
                  res.data.map((treeItem)=>{
                    if(treeItem.id == checkItem){
                      checkNowIds.push(checkItem);
                    }
                  })
                  this.$refs[this.getTreeName()].setCheckedKeys(checkNowIds);
                })
              })
            }
            resolve(res.data);
          });
      }

    },
    getTreeName(){
      let treeName = '';
      if(this.loadingTreeCopy){
        treeName = "comptreeLoad"
      }else{
        treeName = this.offenUserFlag?'comptreeOffenUser':"comptree";
      }
      return treeName;
    },
        //树形勾选
    checkTree(now, check, hascheck) {
      let nowNode = now;
      let nowCheckNode = [];
      let nowDisabNode = []; //当前禁用项
      let byIds;
      byIds = new Set(this.nowCheckList.map(d => d.id));
      
      // if(!this.searchByContact){//签报查询 勾选问题不作处理
      //   return;
      // }
      if (
        ((nowNode.content && nowNode.content.length) ||
        (nowNode.children && nowNode.children.length)||nowNode.TYPE!="user")&&nowNode.TYPE!='rootUser'&&!this.checkOrg
      ) {
        if(nowNode.TYPE!="user" && this.searchByContact){
          this.$refs[this.getTreeName()].setCheckedKeys([]);
        }else{
          this.$refs[this.getTreeName()].setChecked(nowNode, false);
        }
        return;
      }
      this.$nextTick(() => {
        let sendHuis = [];
        let newHuis = [];
        if (this.singelCheckF) {
          this.$refs[this.getTreeName()].setCheckedKeys([nowNode.id]);
        }
        if(this.dialogTypeNow == "zengfa"){
           this.nowCheckList.map(d => {
            d.TYPE = "user";
            if (d.disabled) {
              nowDisabNode.push(d);
            }
          });
          
          //此处要对已禁用的 作拦截
          nowCheckNode = this.$refs[this.getTreeName()]
            .getCheckedNodes()
            .filter(d => !byIds.has(d.id));
          if (!this.singelCheckF) {
          if (nowCheckNode.length == 0) {
            if (nowNode.TYPE) {
              this.nowCheckList = this.nowCheckList.filter(uncheck => {
                return uncheck.id != nowNode.id;
              });
            } else {
              this.nowCheckList = this.nowCheckList.filter(
                d => !orgChildId.has(d.id.split("/")[0])
              );
              this.nowCheckList = [
                ...this.$refs[this.getTreeName()]
                  .getCheckedNodes()
                  .filter(d => {
                    return !d.disabled;
                  }),
                ...nowDisabNode
              ];
            }
          } else {
            nowCheckNode = nowCheckNode.filter(d => {
              let resBack = true;
              nowDisabNode.map(node => {
                if (node == d.id) {
                  resBack = false;
                }
              });
              return resBack;
            });
          }
        }
        //拼接人员数据
        this.nowCheckList = [...this.nowCheckList, ...nowCheckNode];
        }else{
          let arr = this.$refs[this.getTreeName()].getCheckedNodes();
          let newArr = []
          let obj = {};
          if (this.dialogType=='dosend') {
            for (let i = 0; i < arr.length; i++) {
              if (!obj[arr[i].idStr]) {
                newArr.push(arr[i]);
                obj[arr[i].idStr] = true;
              }
            }
            this.nowCheckList = newArr;
          } else {
            this.nowCheckList = arr 
          }
        }
        this.nowCheckList.map((node)=>{
          //全选处理 TYPE = user
          if(node.TYPE != 'user'){
            return;
          }
          if(node.unitShort){
            node.name = node.unitShort;
          }
          if(node.disabled){
            sendHuis.push(node);
          }else{
            newHuis.push(node);
          }
        });
        this.nowCheckList = [].concat(sendHuis,newHuis);
        
      });
    },
    resetCheck() {
      let ableDelet = true;
      let Ids = [];//不可操作id
      this.nowCheckList = this.nowCheckList.filter((item)=>{
        if(item.disabled){
          ableDelet = false;
          Ids.push(item.id);
        }
        return item.disabled;
      })
      if (this.canTab) {
        this.checkedCities = [];
        this.nowCheckList.forEach((item, m) => {
          this.deleteTabRow(m, true);
        });
      } else {
        //发送会签 不可操作
        if(ableDelet){
          this.$refs[this.getTreeName()].setCheckedKeys([]);
        }else{
          this.$refs[this.getTreeName()].setCheckedKeys(Ids);
        }

      }
    },
    getTreeInfo(flag,fileterParams) {
      let obj = {};
      obj = this.seletOptionsData.find(item => {
        return item.PCSAVYID === this.offenUseConfig.nextNodeId;
      });
      this.tabTreeFlag = false;
      this.setNewValue = false;
      this.offenUserFlag = false;//常用联系人标示
      this.selectInfo.name = obj.AVYNODENM;
      this.bank_send.pcsAvyId = this.selectInfo.id = obj.PCSAVYID;
      this.bank_send.curTplNo = obj.PTPLNO;
      this.bank_send.curMultiTenancyId = obj.MULTITENANCYID;
      let parms = Object.assign(this.bank_send,this.fromdata);
      let dataType = 'array';
      parms.function = "selWfNode";
      parms.pcsAvyId = obj.PCSAVYID;
      if(this.iswcbfs){
        
        if(this.fromdata.isMutil == 1){
          this.singelCheckF = true;
        }else{
          this.$post
          .postData(
          "checkMultiHqXb",
            JSON.stringify({
              function:"checkMultiHqXb",
              multiTenancyId:this.fromdata.multiTenancyId,
              tplNo:this.fromdata.tplNo,
              pcsAvyId:parms.pcsAvyId,
            }),
            this.treeTradeCode
          )
          .then(res => {
            if(res.success&&res.isMulti){
              this.singelCheckF = false; // 单选true 多选为false
            }else{
              this.singelCheckF = true; // 单选true 多选为false
            }
          });
          }
      }
      if(fileterParams){
        parms.setcontacts = fileterParams;
      }else{
        delete parms.setcontacts;
      }
      this.nowCheckList = [];
      this.checkedCities = [];
      this.$post
        .postData(
          "selWfNode",
          JSON.stringify(parms),
          this.treeTradeCode
        )
        .then(res => {
          if(res&&res.success){
            dataType =  Object.prototype.toString.call(res.data) == "[object Array]";
            this.treeDataCopy = [];
            this.setNewValue = true;
            this.tabTreeFlag = true;
            if(this.fromdata.isMutil&&this.fromdata.isMutil == 1){
              for(let i = 0;i<this.nowCheckList.length;i++){
                  for(let j = 0;j<this.fromdata.curUserIds.length;j++){
                    if(this.nowCheckList[i].idStr == this.fromdata.curUserIds[j]){
                      this.nowCheckList[i].disabled = true;
                    }
                  }
                }
           
              
            }
            if(res.message == "Loading"){
              this.loadingTreeCopy= true;
              this.loadNode(this.node_has,this.resolve_has);
              this.$nextTick(()=>{
                this.$refs.comptreeLoad.emptyText = '';
                this.$refs.comptreeLoad.root.childNodes = [];
              })
            }else{
              this.treeDataCopy =dataType? res.data: res.data.data;
              if(!dataType && res.data.defaultUser && res.data.defaultUser.unitCode){
                if(this.fromdata.isMutil){
                  if(this.fromdata.isMutil != 1){
                    this.$nextTick(()=>{
                      this.nowCheckList = [res.data.defaultUser];
                      this.nowCheckList.filter((node)=>{
                        node.id = node.unitCode;
                        node.name = node.unitShort;
                        node.idStr = node.idStr;
                        
                      });
                      this.$refs[this.getTreeName()].setCheckedKeys([res.data.defaultUser.unitCode] || []); //选中
                      // this.checkTree(res.data.defaultUser);
                    })
                  }
                }else{
                  this.$nextTick(()=>{
                  this.nowCheckList = [res.data.defaultUser];
                  this.nowCheckList.filter((node)=>{
                      node.id = node.unitCode;
                      node.name = node.unitShort;
                      node.idStr = node.idStr;
                    });
                    this.$refs[this.getTreeName()].setCheckedKeys([res.data.defaultUser.unitCode] || []); //选中
                    // this.checkTree(res.data.defaultUser);
                  })
                }
              }
              
              this.loadingTreeCopy = false;
              if(fileterParams){
                this.offenUserFlag = true;
                if(this.fromdata.isMutil&&this.fromdata.isMutil == 1){
                  let b =Object.prototype.toString.call(this.fromdata.curUserIds) == "[object Array]"?this.fromdata.curUserIds:this.fromdata.curUserIds.split(',');
                  const deepFind = (arr) =>{
                    for(let i =0;i<arr.length;i++){
                      if(arr[i].children){
                        deepFind(arr[i].children)
                      }else{
                        for(let z = 0;z<arr.length;z++){
                          for(let j = 0;j<b.length;j++){
                            if(arr[z].idStr == b[j]){
                              arr[z].disabled = true;
                            }
                          }
                        }
                      }
                    }
                  }
                  deepFind(res.data)
                }
                this.$refs[this.getTreeName()].setCheckedKeys([]);
              }else{
                this.openIdsForNoLoading = [dataType? res.data&&res.data[0].unitCode: res.data.data&&res.data.data[0].unitCode];
              }

            }
          }else{
            this.tabTreeFlag = true;
            this.offenUserFlag = true;
             this.treeDataCopy = [];
             this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 1000
            });
          }

          // let treeNow = this.$refs.comptree;
          // // treeNow.root.data = res.data;
          // treeNow.root.setData(res.data)
          this.$forceUpdate();
        }).catch(erro =>{
        });
    },
    upRow(n) {
      let midObj;
      midObj = this.nowCheckList[n];
      if(this.nowCheckList[n - 1].disabled){
        return;
      }
      this.nowCheckList[n] = this.nowCheckList[n - 1];
      this.nowCheckList[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      midObj = this.nowCheckList[n];
      this.nowCheckList[n] = this.nowCheckList[n + 1];
      this.nowCheckList[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n) {
      this.$refs[this.getTreeName()].setChecked(this.nowCheckList[n], false);
      this.nowCheckList.splice(n, 1);
    },
    cancelSetDialog() {
      this.$emit("showCompDialog", this.copyCheckList);
    },
    remainNamePeop(n){
      let rightArr = this.newPeopInfo[this.treeData[n].typeName+"/"+this.treeData[n].type+"/"+(this.treeData[n].shortTypeName?this.treeData[n].shortTypeName:"")+"/"+this.treeData[n].manySpace], rightSortArr = [], rightResultArr = [];
          rightSortArr = rightArr.sort((a, b) => a.id - b.id);
          
      if (rightArr&&rightArr.length>0) {
        rightArr.forEach(item => {
          rightResultArr.push(item.name)
        })
        this.newPeopInfo[this.treeData[n].typeName+"/"+this.treeData[n].type+"/"+(this.treeData[n].shortTypeName?this.treeData[n].shortTypeName:"")+"/"+this.treeData[n].manySpace] = Array.from(new Set(rightResultArr));
      }else{
        this.newPeopInfo[this.treeData[n].typeName+"/"+this.treeData[n].type+"/"+(this.treeData[n].shortTypeName?this.treeData[n].shortTypeName:"")+"/"+this.treeData[n].manySpace].splice(i,1)
      }
    },
    saveSetDialog() {
      let orderByType = {};//类型排序
      if(!this.nowCheckList.length&&this.dialogType=='dosend'){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择人员",
          duration: 1000
        });
        return;
      }
      this.nowCheckList.filter((node)=>{
        if(node.treeType) {
          node.id = node.id && node.id.toString().split("/")[0];//区分常用发送人相同人 不同群组
          node.name = node.name && node.name.split("/")[0];//区分常用发送人相同人 不同部门
        }
      })
      if(this.dialogType=='dosend'){
        //消息提醒 收发 签 专用
      let userId,productCode,infoType,falgT =false;
        userId = this.nowCheckList[0].idStr;
        productCode = '';
        infoType = '';
      
        switch (this.treeTradeCode) {
          case this.$businessCode.fawgl:
            productCode = 'faW';
            infoType = '发文';
            falgT = true;
            break;
          case this.$businessCode.swgl:
            productCode = 'shouW';
            infoType = '收文';
            falgT = true;
            break;
          case this.$businessCode.qbgl:
            falgT = true;
            productCode = 'qianB';
             infoType = '签报';
            break;
        }
        if(falgT){
          this.$api.meeting.infoRemind({
              userId: userId,//完成并发送选择的人员用户ID（humanID)
              productCode: productCode,//项目编号（对应字典（提醒项目分类））
              urgentType: this.fromdata.emergencyLevelName||this.fromdata.emergencyName ||this.fromdata.emergencyLevel,//紧急程度（部分功能有）
              infoType: infoType,//类型（模块名称中文（例如 收文，发文））
              infoTitle: this.fromdata.title,//业务标题 表单中this.formdata.title,
              infoUser:this.nowCheckList[0].name//当前操作人名称
          }).then(res => {

          }).catch(err => {
            console.log(err)
          })
        }

      }
      if(this.treeTradeCode==this.$businessCode.fawgl) {
          // 右侧排序
          // let rightArr1 = this.newPeopInfo[that.treeData[n].shortTypeName+"/"+that.treeData[n].type+"/"+that.treeData[n].manySpace], rightSortArr = [];
          // rightSortArr = rightArr1.sort((a, b) => a.id - b.id);
          
          // this.newPeopInfo[that.treeData[n].shortTypeName+"/"+that.treeData[n].type+"/"+that.treeData[n].manySpace] = rightSortArr;
          // console.log(this.newPeopInfo[that.treeData[n].shortTypeName+"/"+that.treeData[n].type+"/"+that.treeData[n].manySpace]);
          // let n = this.panelNum;
          // let rightArr = this.newPeopInfo[this.treeData[n].shortTypeName+"/"+(this.treeData[n].type?this.treeData[n].type:"")+"/"+this.treeData[n].manySpace],
          //     rightResultArr = [];
          // if (rightArr&&rightArr.length>0) {
          //   rightArr.forEach(item => {
          //     rightResultArr.push(item.name)
          //   })
          //   this.newPeopInfo[this.treeData[n].shortTypeName+"/"+(this.treeData[n].type?this.treeData[n].type:"")+"/"+this.treeData[n].manySpace] = Array.from(new Set(rightResultArr));
          // }
          for (var key in this.newPeopInfo) {
            let n = this.newPeopInfo[key][0]&&this.newPeopInfo[key][0].n;
            
            if(n===undefined && !this.newPeopInfo[key].length){
              delete this.newPeopInfo[key]
            }else{
              if(n!==undefined){
                orderByType[key] = n;
                this.remainNamePeop(n);
              }
            }
        }
        
        this.$emit(
          "showCompDialog",
          this.nowCheckList,
          true,
          this.dialogType,
          this.selectInfo,
          this.dialogTypeNow,
          this.setradio,
          this.newPeopInfo,
          orderByType
        );
        this.newPeopInfo = {};
      }else if(this.treeTradeCode==this.$businessCode.qbgl){
        this.$emit(
          "showCompDialog",
          this.nowCheckList,
          true,
          this.dialogType,
          this.selectInfo,
          this.dialogTypeNow,
          this.setradio,
          this.isShowFhqbm
        );
      } else {
        this.$emit(
          "showCompDialog",
          this.nowCheckList,
          true,
          this.dialogType,
          this.selectInfo,
          this.dialogTypeNow,
          this.setradio
        );
      }


    },
    getCompData() {
      // 请求数据
      this.$nextTick(() => {
        // this.offenUseConfig.nextNodeId = this.seletOptionsData.length>0?this.seletOptionsData[0].PCSAVYID:'';
        this.backDialogData(this.dialogType);
      });
    },
    //数据回显勾选
    backDialogData(type) {
      let that = this;
      let deleId = [];
      let nowCheckIds = [];
      this.nowCheckList = this.checkData;
        switch (type) {
        case "zhusong":
          this.checkedCities = this.checkIds || [];
          this.isManySpace = true;
          break;
        case "chao":
          this.checkedCities = this.checkIds || [];
          this.isManySpace = true;
          break;
        case "ben":
          that.checkedCities = that.checkIds || [];
          this.isManySpace = true;
          break;
        case "hui":
          this.checkData.map((item)=>{
            if(item.disabled&&item.hideType){
              deleId.push(item.id);
            }
          })
          this.nowCheckIds = this.checkIds.filter((item)=>{
            let hasId = true;
            deleId.map((node)=>{
              if(node == item){
                hasId = false;
              }
            })
            return hasId;
          })
          this.$refs[this.getTreeName()].setCheckedKeys(this.nowCheckIds || []); //选中
          break;
        case "cy":
          this.checkData.map((item)=>{
            if(item.disabled&&item.hideType){
              deleId.push(item.id);
            }
          })
          this.nowCheckIds = this.checkIds.filter((item)=>{
            let hasId = true;
            deleId.map((node)=>{
              if(node == item){
                hasId = false;
              }
            })
            return hasId;
          })
          this.$refs[this.getTreeName()].setCheckedKeys(this.nowCheckIds || []); //选中
          break;
        case "dosend":
          this.$refs[this.getTreeName()].setCheckedKeys(this.checkIds || []); //选中
          break;
        case "gonggao":
          this.$refs[this.getTreeName()].setCheckedKeys(this.checkIds || []); //选中
          break;
        case "chen":
          this.checkedCities = this.checkIds || [];
          this.$refs[this.getTreeName()].setCheckedKeys(this.checkIds || []); //选中
          break;
        default:
          this.checkedCities = this.checkIds || [];
          this.isManySpace = false;
          break;
      }
      this.nowCheckList = this.checkData.filter((item)=>{
        if(!item.hideType&&this.dialogTypeNow!="zengfa"){
          item.disabled = false;
        }
        return !item.hideType;//为true 时 不显示
      })
    },
    //tabtree
    tabPanel(val) {
      this.panelNum = val.index;
      // this.checkedCities = this.treeData[this.panelNum].data.filter(item=>{
      //   return this.nowCheckList.forEach(list=>{
      //     return list.id === item.id;
      //   })
      // })
    },
    deleteTabRow(n, flag) {
      let id = this.nowCheckList[n].id;
      if (!flag) {
        this.nowCheckList.splice(n, 1);
      }
      //根据当前切换栏操作相应元素
      this.checkedCities = this.checkedCities.filter(item => {
        return item != id;
      });
      this.treeData.forEach((item, m) => {
        item.content.forEach(list => {
          list.id === id ? (this.treeData[m].isIndeterminate = false) : "";
        });
      });
    },
    //三列布局全选、取消全选勾选
    handleCheckAllChange(val, n) {
      let that = this;
      val?that.isAll = true:that.isAll = false;
      let nowLists = [];
      let transArr = [];
      let transKey = "";
      transKey = that.treeData[that.panelNum].typeName+"/"+that.treeData[that.panelNum].type+"/"+(that.treeData[that.panelNum].shortTypeName?that.treeData[that.panelNum].shortTypeName:"")+"/"+that.treeData[that.panelNum].manySpace;
      nowLists = that.treeData[that.panelNum].content; //当前操作列表
      val
        ? that.treeData[n].content.forEach(item => {
            that.checkedCities.push(item.text);
          })
        : (that.checkedCities = []);
      that.treeData[n].isIndeterminate = val;
      //清除当前tab 已勾选项
      that.nowCheckList = that.nowCheckList.filter(item => {
        let hasF = true;
        nowLists.forEach(node => {
          if (node.text === item.text) {
            hasF = false;
          }
        });
        return hasF;
      });
      if (val) {
        for (var i = 0, len = nowLists.length; i < len; i++) {
          let addNode = true;
          that.nowCheckList.forEach((node, m) => {
            if (nowLists[i].text === node.text) {
              addNode = false;
              if (!val) {
                that.nowCheckList.splice(m);
              }
            }
          });

          if (addNode && val) {
            that.nowCheckList.push(nowLists[i]);
          }
        }
        if(!that.newPeopInfo[transKey]){
          that.newPeopInfo[transKey] = [];
        }
        for (let propety in nowLists) {
          transArr.push({name:nowLists[propety].text,n:n});
        }
        // that.newPeopInfo[transKey].push(transArr.join(","));
        that.newPeopInfo[transKey] = transArr;
      } else {
        that.newPeopInfo = {};
      }
    },
    handleCheckedCitiesChange(value, n) {
      let that = this;
      console.log("选中项", value);
      let checkedCount = 0;
      let newCheckLists = [];
      let isHasPep = true;
      let isHasPepText = '';
      value.forEach(item => {
        that.treeData[n].content.forEach((node, index) => {
          if (item === node.text) {
            if(!that.newPeopInfo[that.treeData[n].typeName+"/"+that.treeData[n].type+"/"+(that.treeData[n].shortTypeName?that.treeData[n].shortTypeName:"")+"/"+that.treeData[n].manySpace]){
              that.newPeopInfo[that.treeData[n].typeName+"/"+that.treeData[n].type+"/"+(that.treeData[n].shortTypeName?that.treeData[n].shortTypeName:"")+"/"+that.treeData[n].manySpace] = [];
            }
            that.newPeopInfo[that.treeData[n].typeName+"/"+that.treeData[n].type+"/"+(that.treeData[n].shortTypeName?that.treeData[n].shortTypeName:"")+"/"+that.treeData[n].manySpace].forEach((m, index) => {
              if(m.name==item){
                isHasPep = false;
                isHasPepText = item;
              }
            })
            if(isHasPep||isHasPepText!=node.text){
              that.newPeopInfo[that.treeData[n].typeName+"/"+that.treeData[n].type+"/"+(that.treeData[n].shortTypeName?that.treeData[n].shortTypeName:"")+"/"+that.treeData[n].manySpace].push({id: index, name:node.text,n:n});
            }
            
            // newCheckLists.push({ id: that.dialogType=="sendObj"?node.id : node.text, text: node.text ,shortname:that.treeData[n].shortTypeName,n:n});
            newCheckLists.push({ id: that.dialogType=="sendObj"?node.id : node.text, text: node.text ,n:n});
            checkedCount++;
          }
            newCheckLists.shortname = that.treeData[n].shortTypeName
        });
      });
      //清除当前tab 已勾选项
      this.nowCheckList = this.nowCheckList.filter(item => {
        let hasF = true;
        this.treeData[n].content.forEach(node => {
          if (node.text === item.text) {
            hasF = false;
          }
        });
        return hasF;
      });
      //过滤右侧已勾选项
      newCheckLists = newCheckLists.filter(item => {
        let hasF = true;
        this.nowCheckList.forEach(node => {
          if (node.text === item.text) {
            hasF = false;
          }
        });
        return hasF;
      });
      this.treeData[n].isIndeterminate =
        checkedCount === this.treeData[n].content.length; //全选设置
      //对当前tab 勾选项进行合并
      value.length > 0
        ? (this.nowCheckList = [].concat(this.nowCheckList, newCheckLists))
        : this.nowCheckList.filter(item => item.text != value.text);
        let savePeop = [];
      if(that.newPeopInfo[that.treeData[n].typeName+"/"+that.treeData[n].type+"/"+(that.treeData[n].shortTypeName?that.treeData[n].shortTypeName:"")+"/"+that.treeData[n].manySpace].length>0) {
        this.nowCheckList.forEach(m=>{
          that.newPeopInfo[that.treeData[n].typeName+"/"+that.treeData[n].type+"/"+(that.treeData[n].shortTypeName?that.treeData[n].shortTypeName:"")+"/"+that.treeData[n].manySpace].forEach((t,i)=>{
            if(m.text == t.name){
              savePeop.push(t);
            };
          })
        })
      }
      that.newPeopInfo[that.treeData[n].typeName+"/"+that.treeData[n].type+"/"+(that.treeData[n].shortTypeName?that.treeData[n].shortTypeName:"")+"/"+that.treeData[n].manySpace] = [].concat(savePeop);

    },
    /**
     * 特殊发送 需要iD 回显
     */
    deleteTabRowSp(n, flag) {
      let id = this.nowCheckList[n].id;
      if (!flag) {
        this.nowCheckList.splice(n, 1);
      }
      //根据当前切换栏操作相应元素
      this.checkedCities = this.checkedCities.filter(item => {
        return item != id;
      });
      this.treeData.forEach((item, m) => {
        item.content.forEach(list => {
          list.id === id ? (this.treeData[m].isIndeterminate = false) : "";
        });
      });
    },
    //三列布局全选、取消全选勾选
    handleCheckAllChangeSp(val, n) {
      let nowLists = [];
      nowLists = this.treeData[this.panelNum].content; //当前操作列表
      val
        ? this.treeData[n].content.forEach(item => {
            this.checkedCities.push(item.id);
          })
        : (this.checkedCities = []);
      this.treeData[n].isIndeterminate = val;
      //清除当前tab 已勾选项
      this.nowCheckList = this.nowCheckList.filter(item => {
        let hasF = true;
        nowLists.forEach(node => {
          if (node.id === item.id) {
            hasF = false;
          }
        });
        return hasF;
      });
      if (val) {
        for (var i = 0, len = nowLists.length; i < len; i++) {
          let addNode = true;
          this.nowCheckList.forEach((node, m) => {
            if (nowLists[i].id === node.id) {
              addNode = false;
              if (!val) {
                this.nowCheckList.splice(m);
              }
            }
          });

          if (addNode && val) {
            this.nowCheckList.push(nowLists[i]);
          }
        }
      }
    },
    handleCheckedCitiesChangeSp(value, n) {
      console.log("选中项", value);
      let checkedCount = 0;
      let newCheckLists = [];
      value.forEach(item => {
        this.treeData[n].content.forEach(node => {
          if (item === node.id) {
            newCheckLists.push({ id: node.id, text: node.text });
            checkedCount++;
          }
        });
      });
      //清除当前tab 已勾选项
      this.nowCheckList = this.nowCheckList.filter(item => {
        let hasF = true;
        this.treeData[n].content.forEach(node => {
          if (node.id === item.id) {
            hasF = false;
          }
        });
        return hasF;
      });
      //过滤右侧已勾选项
      newCheckLists = newCheckLists.filter(item => {
        let hasF = true;
        this.nowCheckList.forEach(node => {
          if (node.id === item.id) {
            hasF = false;
          }
        });
        return hasF;
      });
      this.treeData[n].isIndeterminate =
        checkedCount === this.treeData[n].content.length; //全选设置
      //对当前tab 勾选项进行合并
      value.length > 0
        ? (this.nowCheckList = [].concat(this.nowCheckList, newCheckLists))
        : this.nowCheckList.filter(item => item.id != value.id);
    },
    concatData(data){
      data.map((node)=>{
        let childs = [].concat(node.children);
        let hasChild = childs.length;
        node.id = node.unitCode;
        if(this.fromdata.isMutil == 1){
          if(this.fromdata.curUserIds){
            let b = Object.prototype.toString.call(this.fromdata.curUserIds) == "[object Array]"?this.fromdata.curUserIds:this.fromdata.curUserIds.split(',');
            for(let i = 0;i<b.length;i++){
                if(node.idStr == b[i]){
                  node.disabled = true;
              }
            }
          }
        }
        if(node.jsonUser&&node.jsonUser.length){
          node.jsonUser.map((item)=>{
            item.id = item.unitCode;
            if(this.fromdata.isMutil == 1){
          if(this.fromdata.curUserIds){
            let b = Object.prototype.toString.call(this.fromdata.curUserIds) == "[object Array]"?this.fromdata.curUserIds:this.fromdata.curUserIds.split(',');
            for(let i = 0;i<b.length;i++){
                if(item.idStr == b[i]){
                  item.disabled = true;
              }
            }
          }
        }
          })
           node.children = [].concat(node.jsonUser,node.children);
        }
        if(hasChild){
          this.concatData(childs);
        }else{
          node.jsonUser.map((item)=>{
            if(this.fromdata.isMutil == 1){
              if(this.fromdata.curUserIds){
                let b = Object.prototype.toString.call(this.fromdata.curUserIds) == "[object Array]"?this.fromdata.curUserIds:this.fromdata.curUserIds.split(',');
                for(let i = 0;i<b.length;i++){
                    if(item.idStr == b[i]){
                      item.disabled = true;
                  }
                }
              }
            }
            item.id = item.unitCode;
          })
          node.children = node.jsonUser;
        }

      });
      return data;
    },
    transformData(newv,canDo){
      if(!canDo){
        return;
      }
         if(this.checkData.length && this.checkData[0].disabled||(this.checkData[0]&&!this.checkData[0].hideType)){
          if(newv[0]&&newv[0].children){
              newv[0].children.map((item)=>{
              this.checkIds.map((node,n)=>{
                if(node == item.id&&this.dialogTypeNow=="zengfa"||(node == item.id&&this.checkData[n]&&this.checkData[n].hideType)){
                  item.disabled = true;
                }
              })
            })
          }
        }
        if(this.dialogType=='dosend'&&!this.loadingTreeCopy&&newv&&newv[0]&&newv[0].unitCode){
            newv = this.concatData(newv);
        }
        if(newv.length||(newv.children&&newv.children.length)){
          this.treeDataCopy = newv;
          this.setNewValue = false;
          this.openIdsForNoLoading = [newv&&newv[0]&&newv[0].id];
          // if(this.dialogType=='dosend'&&newv&&newv[0].children[0]){
          //   this.openIdsForNoLoading.push(newv[0].children[0].id)
          // }
          return;
        }
    }
  },
  created(){
    this.loadingTreeCopy = this.loadingTree;
    window.onresize =()=> {
      this.setLabelwidth = Math.ceil((document.documentElement.clientWidth*0.6)/3-60)+'px';
    };
    setTimeout(()=>{
      this.loadingState = true;
    })
  },
  watch: {
    defaultUser(nev){
    if(nev&&nev.unitCode){
       if(this.fromdata.isMutil){
         if(this.fromdata.isMutil !=1){
            this.nowCheckList = [nev];
          this.nowCheckList.filter((node)=>{
            node.id = node.unitCode;
            node.name = node.unitShort;
            node.idStr = node.idStr;
          });
          this.checkData = this.nowCheckList;
          this.$refs[this.getTreeName()].setCheckedKeys([this.defaultUser.unitCode] || []); //选中
       
         }
        }else{
           this.nowCheckList = [nev];
            this.nowCheckList.filter((node)=>{
            node.id = node.unitCode;
            node.name = node.unitShort;
            node.idStr = node.idStr;
          });
          this.checkData = this.nowCheckList;
          this.$refs[this.getTreeName()].setCheckedKeys([this.defaultUser.unitCode] || []); //选中
       
        }
      }else{
        this.nowCheckList = [];
        this.checkData = [];
      }
    },
    dialogState(newv, oldv) {
      if (newv) {
        this.copyCheckList = this.checkIds;
        this.nowCheckList = [];
        this.checkedCities = [];
        this.offenUserFlag = false;
        this.offenUseConfig.set = false;
        this.panelNum = 0;
        this.getCompData();
        // this.$nextTick(()=>{
        //   if(this.defaultUser && this.defaultUser.unitCode){
        //     this.nowCheckList = [this.defaultUser];
        //     this.nowCheckList.filter((node)=>{
        //       node.id = node.unitCode||node.id;
        //       node.name = node.unitShort||node.name;
        //     });
        //     this.$refs[this.getTreeName()].setCheckedKeys([this.defaultUser.unitCode] || []); //选中
        //   }
        // })
      }
      this.dialogVisible = newv;
    },
    seletOptionsData: {
      handler(newv) {
        this.offenUseConfig.nextNodeId =
          this.seletOptionsData.length > 0
            ? this.seletOptionsData[0].PCSAVYID
            : "";
        this.selectInfo.id = this.offenUseConfig.nextNodeId;
        this.selectInfo.name =
          this.seletOptionsData.length > 0
            ? this.seletOptionsData[0].AVYNODENM
            : "";
      },
      deep: true
    },
    loadingTree:{
      handler(newv) {
        this.loadingTreeCopy = newv;
        this.backDialogData(this.dialogType);
      }
    },
    treeDataCopy:{
      handler(newv) {
        if(!this.loadingTreeCopy){
          this.transformData(newv,this.setNewValue);
        }
      }
    },
    treeData: {
      handler(newv) {
        this.setNewValue = true;
        this.loadingTreeCopy = this.loadingTree;
        if(newv.length&&!this.loadingTreeCopy){
          this.transformData(newv,this.setNewValue);
          // if(this.loadingTreeCopy){
          //   this.$refs.comptreeLoad.root.childNodes = newv;
          // }
        }else{
          this.treeDataCopy = [];
        }
      }
    }
  }
};
</script>
<style  lang="less" scoped>
.treeWrap .el-col-12 {
  padding-right: 20px;
}
.box_shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.title {
  font-size: 16px;
  color: #303133;
  overflow: hidden;
  height: 20px;
}
.tree_w {
  max-width: 440px;
  padding-left: 20px;
}
.tree_tab{
  height: 400px;
  padding-left: 20px;
}
.tree_canTab{
  max-width: 240px;
  height: 400px;
}
/deep/ .el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}
/deep/ .el-tree-node__content {
  height:20px;
}
/deep/ .custom-tree-node.userflag ~.el-checkbox{
  display: none;
}
.el-scrollbar {
  height: 100%;
}
.el-icon-s-custom:before {
    color: #409EFF;
}
.comp_wrap {
  height: 400px;
  padding: 14px;
  overflow-y: scroll;
  .comp_list {
    height: 30px;
    line-height: 30px;
  }
  .select_obj{
    word-break: break-all;
    white-space: nowrap;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.pad_20 {
  padding: 20px;
}
.selectlist {
  width: 100%;
  padding: 4px 0;
  /deep/ .el-input__inner{
    border:1px solid #000;
  }
  /deep/ .el-select__caret{
    color:#000;
    font-weight: 900;
  }
}
.el-select-dropdown{
  .el-select-dropdown__wrap{
    max-height: auto;
  }
  .el-scrollbar__bar.is-vertical{
    display: none;
  }
}
.el-button--mini, .el-button--mini.is-round {
    padding: 2px 8px;
}

.rightwrap {
  float: right;
  .setfont {
    font-size: 14px;
    color: #409eff;
    padding-left: 20px;
    cursor: pointer;
  }
}
/deep/ .el-tabs__nav-scroll {
  height: 400px;
  overflow-y: scroll;
}
/deep/ .el-tabs__nav.is-left{
  height:100%;
  overflow-y: scroll;
}

/deep/ .el-tabs--left {
  height: 400px;
}

/deep/ .el-checkbox-group .el-checkbox {
  margin-bottom: 20px;
  display: block;
}
.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 280px;
  .one_btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
  }
  .btns {
    width: 300px;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    text-align: left;
  }
  .name {
    white-space: nowrap;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-overflow: ellipsis;
    min-width: 200px;
    overflow: hidden;
  }
}
/deep/ .el-scrollbar__bar.is-vertical {
  width: 10px;
}
</style>
