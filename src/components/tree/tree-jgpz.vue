<template>
  <div class="treeWrap">
    <!-- 设置close-on-click-modal后设置close方法应该是不起作用的 -->
    <!--懒加载和非懒加载切换示使用-->
    <el-dialog
      v-dialogDrag
      :title="dialogTit"
      v-if="dialogVisible && !canTab && dialogTit!='会签'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="cancelSetDialog"
      width="50%"
    >
      <el-row>
        <el-col :span="12">
          <div class="title">
            <span>{{titleWords}}</span>
            <div class="rightwrap" v-if="dialogType=='dosend'">
              <el-checkbox  @change="getOffenUserInfo" v-model="offenUseConfig.set">常用发送对象</el-checkbox>
              <span class="setfont" @click="getOffenUserById">设置</span>
            </div>
          </div>
          <div class="tree_w box_shadow ceshiceshi">
            <el-scrollbar v-if="loadingState">
              <el-tree
                v-show="loadingTreeCopy"
                ref="comptreeLoad"
                :load="loadNode"
                show-checkbox
                :check-on-click-node="false"
                :check-strictly="true"
                node-key="id"
                @check-change="handleCheckChange"
                @check="checkTree"
                lazy
                :props="defaultProps"
              >
                <!-- <span :title="node.label" :class="['custom-tree-node',{'userflag':data.TYPE == 'user'}]" slot-scope="{ node,data }">
                  <i
                    :class="data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'"
                  >{{node.label}}</i>
                </span> -->
              </el-tree>

              <el-tree
                v-show="!loadingTreeCopy"
                ref="comptree"
                :data="treeDataCopy"
                show-checkbox
                :check-on-click-node="true"
                :check-strictly="true"
                node-key="id"
                :default-expand-all="true"
                @check="checkTree"
                :props="dialogType=='dosend'&&!offenUserFlag?senddefaultProps:defaultProps"
              >
                <span :title="node.label" class="custom-tree-node" slot-scope="{ node,data }">
                  <i
                    :class="data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'"
                  >{{node.label}}</i>
                </span>
              </el-tree>
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
          <div class="box_shadow tree_w">
            <el-scrollbar>
              <div v-for="(item,index) in nowCheckList" :key="index">
                <template>
                  <div class="command_wrap">
                    <span :title="item.name" class="name">{{item.name}}</span>
                    <div class="one_btn">
                      <el-button
                        type="warning"
                        size="mini"
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
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
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
    loadingTreeCopy: Boolean,
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
  },
  data() {
    return {
      nodeCheckState: false,
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
      tabTreeFlag:true,
      offenUserFlag:false,//常用联系人标示
      treeDataCopy:[],
      treeResolve:'',
      bank_subSelectByUserId:{//查询常用联系人
        function:'selectByUserId'
      }
    };
  },
  mounted() {
  },
  methods: {
    //懒加载数据
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.node_has = node;
        this.resolve_has = resolve;
        let obj = {
          id: this.orgId,
          pcsAvyId:this.selectInfo.id
        };
        this.handleLoadTree(obj, resolve);
      }
      if (node.level > 0) {
        let obj = {
          id: node.data.id
        };
        this.handleLoadTree(obj, resolve, "isChild");
      }
    },
    // 组织树操作
    handleLoadTree(obj, resolve, isChild) {
      let that = this;
      if(!that.handleLoadFlag){
        return false;
      }
      let funName = that.loadingTreeCopy?"selUnitTreeByUnitPcode":"selectUserByUnitTree"
      // that.treeForm.function = "selectUserByUnitTree"
      that.treeForm.function = funName
      that.treeForm.unitCode = (obj && obj.id) || "";
      that.$post
      .postData(
        // "selectUserByUnitTree",
        funName,
        JSON.stringify(that.treeForm),
        that.treeTradeCode
      )
      .then(res => {
        let checkNowIds = [];//选中的id
        if(res.data&&res.data[0].children){
          res.data[0].children.map((node)=>{
            // if(node.TYPE == "user"){
            if(!node.children){
              node.isLeaf = true;
            } else {
              node.isLeaf = false;
            }

            // if( node.TYPE != "user" && !that.searchByContact ){
            //   node.disabled = true;
            // }
          })
        }
        if(that.loadingTreeCopy){
          that.$nextTick(()=>{
            that.checkIds.map((checkItem)=>{
              res.data.map((treeItem)=>{
                if(treeItem.id == checkItem){
                  checkNowIds.push(checkItem);
                }
              })
              that.$refs['comptreeLoad'].setCheckedKeys(checkNowIds);
            })
            that.checkIds.map((checkItem)=>{
              res.data[0].children.map((treeItem)=>{
                if(treeItem.id == checkItem){
                  checkNowIds.push(checkItem);
                }
              })
              that.$refs['comptreeLoad'].setCheckedKeys(checkNowIds);
            })
          })
        }
        isChild?resolve(res.data[0].children?res.data[0].children:res.data[0]):resolve(res.data);
      });
    },
    getTreeName(){
      let treeName = '';
      treeName = this.loadingTreeCopy?"comptreeLoad":"comptree";
      return treeName;
    },
    handleCheckChange(data, checked, indeterminate) {
      this.nodeCheckState = checked;
    },
    //树形勾选
    checkTree(now, check, hascheck) {
      let that = this;
      if (this.loadingTreeCopy) {
        let oldNowCheckList = that.nowCheckList;
        if (this.nodeCheckState) {
          that.nowCheckList = [].concat(oldNowCheckList,now);
          that.nowCheckList = Array.from(new Set(that.nowCheckList));
        } else {
          that.nowCheckList.splice(that.nowCheckList.findIndex(item => item.id === now.id),1);
        }
      } else {
        let nowNode = now;
        that.$nextTick(() => {
          let sendHuis = [];
          let newHuis = [];
          that.nowCheckList = that.$refs[that.getTreeName()].getCheckedNodes();

          that.nowCheckList.map((node)=>{
            if(node.unitShort){
              node.name = node.unitShort;
            }
            if(node.disabled){
              sendHuis.push(node);
            }else{
              newHuis.push(node);
            }
          });
          that.nowCheckList = [].concat(sendHuis,newHuis);
        });
      }
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
        case "hidden":
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
        // case "dosend":
        //   this.$refs[this.getTreeName()].setCheckedKeys(this.checkIds || []); //选中
        //   break;
        default:
          this.checkedCities = this.checkIds || [];
          break;
      }
      this.nowCheckList = this.checkData.filter((item)=>{
        if(!item.hideType&&this.dialogTypeNow!="zengfa"){
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
    concatData(data){
      data.map((node)=>{
        let childs = [].concat(node.children);
        let hasChild = childs.length;
        node.id = node.unitCode;
        if(node.jsonUser&&node.jsonUser.length){
          node.jsonUser.map((item)=>{
            item.id = item.unitCode;
          })
           node.children = [].concat(node.jsonUser,node.children);
        }
        if(hasChild){
          this.concatData(childs);
        }else{
          node.jsonUser.map((item)=>{
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
      // if(this.checkData.length && this.checkData[0].disabled||(this.checkData[0]&&!this.checkData[0].hideType)){
      //   if(newv[0]&&newv[0].children){
      //       newv[0].children.map((item)=>{
      //       this.checkIds.map((node,n)=>{
      //         if(node == item.id&&this.dialogTypeNow=="zengfa"||(node == item.id&&this.checkData[n]&&this.checkData[n].hideType)){
      //           item.disabled = true;
      //         }
      //       })
      //     })
      //   }
      // }
      // if(this.dialogType=='dosend'&&!this.loadingTreeCopy&&newv&&newv[0]&&newv[0].unitCode){
      //     newv = this.concatData(newv);
      // }
      if(newv.length||(newv.children&&newv.children.length)){
        this.treeDataCopy = newv;
        this.setNewValue = false;
        this.backDialogData("hui");
        return;
      }
    }
  },
  created(){
    // this.loadingTreeCopy = this.loadingTree;
    window.onresize =()=> {
      this.setLabelwidth = Math.ceil((document.documentElement.clientWidth*0.6)/3-60)+'px';
    };
    setTimeout(()=>{
      this.loadingState = true;
    })
  },
  watch: {
    dialogState(newv, oldv) {
      if (newv) {
        this.copyCheckList = this.checkIds;
        this.nowCheckList = [];
        this.checkedCities = [];
        this.getCompData();
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
        // this.loadingTreeCopy = this.loadingTree;
        if(newv.length&&!this.loadingTreeCopy){
          this.transformData(newv,this.setNewValue);
          // if(this.loadingTreeCopy){
          //   this.$refs.comptreeLoad.root.childNodes = newv;
          // }
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
  margin-bottom: 10px;
  overflow: hidden;
  height: 28px;
}
.tree_w {
  max-width: 440px;
  height: 400px;
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
/*/deep/ .el-tree-node__content .el-checkbox{*/
/*  display: none;*/
/*}*/
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
    height: 42px;
    line-height: 42px;
  }
  .select_obj{
    word-break: break-all;
    white-space: nowrap;
    height: 42px;
    line-height: 42px;
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
  padding: 20px 0;
}
.el-select-dropdown{
  .el-select-dropdown__wrap{
    max-height: auto;
  }
  .el-scrollbar__bar.is-vertical{
    display: none;
  }
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
    height: 42px;
    line-height: 42px;
  }
  .btns {
    width: 300px;
    height: 42px;
    line-height: 42px;
    white-space: nowrap;
    text-align: left;
  }
  .name {
    white-space: nowrap;
    height: 42px;
    line-height: 42px;
    display: inline-block;
    text-overflow: ellipsis;
    min-width: 200px;
    overflow: hidden;
  }
}
</style>
