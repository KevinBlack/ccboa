<template>
  <!--固定 非懒加载-->
  <el-dialog
    v-dialogDrag
    :title="dialogTit"
    v-if="dialogVisible"
    :visible.sync="dialogVisible"
    @close="cancelSetDialog"
  >
    <el-row class="guding">
      <el-col :span="12">
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
</template>

<script>
export default {
  components: {},
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
      default: "zhifa",
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
    }
  },
  data() {
    return {
      defaultHeight:document.body.clientHeight*0.4+'px',
      openIdsForNoLoading:[],//非懒加载只展开第一级
      setNewValue:true,//赋值 处理多次加载
      subcheckIds: [],//常用联系id
      subCheckdata:[],//常用联系人全部数据
      selectInfo: {
        name: "",
        id: ""
      },
      treeForm: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: this.subOrgFlag
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
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf:'isLeaf'
      },
      //请求树结构
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      tabTreeFlag:true,
      offenUserFlag:false,//常用联系人标示
      treeDataCopy:[],
      treeResolve:'',
      bank_subSelectByUserId:{//查询常用联系人
        function:'selectByUserId'
      },
    };
  },
  mounted() {
  },
  methods: {
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
      let byIds;
      byIds = new Set(this.nowCheckList.map(d => d.id));
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
        this.nowCheckList = this.$refs[this.getTreeName()].getCheckedNodes();
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
    saveSetDialog() {
      if(this.nowCheckList.length){
        this.nowCheckList.filter((node)=>{
          node.id = node.id && node.id.toString().split("/")[0];//区分常用发送人相同人 不同群组
          node.name = node.name && node.name.split("/")[0];//区分常用发送人相同人 不同部门
        })
      }
      this.$emit(
        "showCompDialog",
        this.nowCheckList,
        true,
        this.dialogType,
        this.selectInfo,
        this.dialogTypeNow,
        this.setradio
      );

    },
    getCompData() {
      // 请求数据
      this.$nextTick(() => {
        this.backDialogData(this.dialogType);
      });
    },
    //数据回显勾选
    backDialogData(type) {
      this.nowCheckList = this.checkData;
      switch (type) {
        case "zhifa":
          this.checkedCities = this.checkIds || [];
          this.$refs[this.getTreeName()].setCheckedKeys(this.checkIds || []); //选中
          break;
        default:
          this.checkedCities = this.checkIds || [];
          break;
      }
      this.nowCheckList = this.checkData.filter((item)=>{
        if(!item.hideType){
          item.disabled = false;
        }
        return !item.hideType;//为true 时 不显示
      })
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
    transformData(newv,canDo){
      if(!canDo){
        return;
      }
      if(this.checkData.length && this.checkData[0].disabled||(this.checkData[0]&&!this.checkData[0].hideType)){
        if(newv[0]&&newv[0].children){
          newv[0].children.map((item)=>{
            this.checkIds.map((node,n)=>{
              if(node == item.id&&this.checkData[n]&&this.checkData[n].hideType){
                item.disabled = true;
              }
            })
          })
        }
      }
      if(newv.length||(newv.children&&newv.children.length)){
        this.treeDataCopy = newv;
        this.setNewValue = false;
        this.openIdsForNoLoading = [newv&&newv[0]&&newv[0].id];
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
        this.nowCheckList = [nev];
        this.nowCheckList.filter((node)=>{
          node.id = node.unitCode;
          node.name = node.unitShort;
          node.idStr = node.idStr;
        });
        this.checkData = this.nowCheckList;
        this.$refs[this.getTreeName()].setCheckedKeys([this.defaultUser.unitCode] || []); //选中
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
