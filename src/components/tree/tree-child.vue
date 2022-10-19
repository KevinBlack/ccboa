<template>
  <div class="treeWrap">
    <el-dialog
      v-dialogDrag
      :title="subdialogTit"
      v-if="subdialogState"
      :visible.sync="subdialogState"
      @close="cancelSetDialog"
      width="50%"
    >
      <el-row>
        <el-col :span="12">
          <div class="title">
            <span>选择处理人</span>
          </div>
          <div class="tree_w box_shadow">
            <el-scrollbar>
              <el-tree
                show-checkbox
                ref="comptreeLoad"
                :check-on-click-node="true"
                :check-strictly="true"
                @check="checkTree"
                node-key="id"
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
  props: [
    "subdialogTit",
    "subdialogState",
    "subsingelCheckF",
    "subcheckIds",
    "subcanTab",
    "subtreeData",
    "suboffenUse",
    "subCheckdata",
    "subLoadingTree"
  ],
  data() {
    return {
      bank_redheader: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag:true
      },
      subdialogVisible: false,
      checkedCities: [],
      nowCheckList: [],
      loadingTreeCopy:false,
      tabTreeFlag:true,
      treeDataCopy:[],
      treeResolve:'',
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf:'isLeaf'
      },
      senddefaultProps: {
        children: "children",
        label: "unitShort",
        isLeaf:'leaf'
      },
      dialogTypeNow:'',
      dialogType:'',
      selectInfo: {
        name: "",
        id: ""
      },
      bank_subdoSaveorUpdateByContact:{//保存常用联系人
        function:'doSaveorUpdateByContact',
        contacts:[]
        // contacts:[{name:'',id:''}]
      }
    };
  },
  mounted() {
   
  },
  methods: {
    cancelSetDialog() {
      this.$emit("subshowCompDialog", this.copyCheckList);
    },
    saveSetDialog() {
      if(this.nowCheckList&&this.nowCheckList.length){
         this.bank_subdoSaveorUpdateByContact.contacts = this.nowCheckList;
       this.$post
        .postData("doSaveorUpdateByContact", JSON.stringify(this.bank_subdoSaveorUpdateByContact), this.$businessCode.ggywgn)
        .then(res => {
          if (res && res.success) {
            this.$emit("subshowCompDialog", this.nowCheckList, true);
          }else{
             this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端保存失败",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存常用联系人失败",
            duration: 1000
          });
        });
      }else{
        this.$emit("subshowCompDialog", this.nowCheckList, true);
      }
    },
    getCompData() {
      // 请求数据
      this.nowCheckList = [];
      this.copyCheckList = [];
      this.nowCheckList = this.subtreeData||[];
      this.$nextTick(() => {
        //this.$refs.comptree.setCheckedKeys(this.checkIds); 选中
      });
    },
    deleteTabRow(n,flag) {
      let id = this.nowCheckList[n].id;
      if(!flag){
        this.nowCheckList.splice(n, 1);
      }
      //根据当前切换栏操作相应元素
      this.checkedCities = this.checkedCities.filter(item => {
        return item.id != id;
      });
      this.sendList.forEach((item, m) => {
        item.data.forEach(list => {
          list.id === id ? (this.sendList[m].isIndeterminate = false) : "";
        });
      });
    },
    handleCheckAllChange(val, n) {
      let nowLists = [];
      nowLists = this.sendList[this.panelNum].data; //当前操作列表
      this.checkedCities = val ? this.sendList[n].data : [];
      this.sendList[n].isIndeterminate = val;

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
          this.nowCheckList.push(this.checkedCities[i]);
        }
      }
    },
    handleCheckedCitiesChange(value, n) {
      let checkedCount = 0;
      value.forEach(item => {
        this.sendList[n].data.forEach(node => {
          if (item.id === node.id) {
            checkedCount++;
          }
        });
      });
      this.sendList[n].isIndeterminate =
        checkedCount === this.sendList[n].data.length;
      value.length > 0
        ? (this.nowCheckList = [].concat(value))
        : this.nowCheckList.filter(item => item.id != value.id);
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
         if(this.subCheckdata.length && this.subCheckdata[0].disabled||(this.subCheckdata[0]&&!this.subCheckdata[0].hideType)){
          if(newv[0]&&newv[0].children){
              newv[0].children.map((item)=>{
              this.checkIds.map((node,n)=>{
                if(node == item.id&&this.dialogTypeNow=="zengfa"||(node == item.id&&this.subCheckdata[n]&&this.subCheckdata[n].hideType)){
                  item.disabled = true;
                }
              })
            })
          }
        }
        if(this.dialogType=='dosend'&&!this.loadingTreeCopy&&newv[0].unitCode){
           newv = this.concatData(newv);
        }
        if(newv.length){
          this.treeDataCopy = newv;
          this.setNewValue = false;
          return;
        }
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
        this.handleLoadTree(obj, resolve);
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
    handleLoadTree(obj, resolve) {
        this.bank_redheader.unitCode = (obj && obj.id) || "";
          this.$post
          .postData(
            "selectUserByUnitTree",
            JSON.stringify(this.bank_redheader),
            this.$businessCode.ggywgn
          )
          .then(res => {
            let checkNowIds = [];//选中的id
            if(res.data&&res.data.length){
              res.data.map((node)=>{
                if(node.TYPE == "user"){
                  node.isLeaf = true;
                }
              })
              this.$nextTick(()=>{
                this.subcheckIds.map((checkItem)=>{
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
    },
    getTreeName(){
      let treeName = '';
        treeName = "comptreeLoad"
      return treeName;
    },
    //树形勾选
    checkTree(now, check, hascheck) {
      let nowNode = now;

      if (
        ((nowNode.content && nowNode.content.length) ||
        (nowNode.children && nowNode.children.length)||nowNode.TYPE!="user")&&nowNode.TYPE!='rootUser'
      ) {
        this.$refs[this.getTreeName()].setChecked(nowNode, false);
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
      this.nowCheckList = this.subCheckdata;
      switch (type) {
        case "zhusong":
          this.checkedCities = this.subcheckIds || [];
          break;
        case "chao":
          this.checkedCities = this.subcheckIds || [];
          break;
        case "hui":
          this.subCheckdata.map((item)=>{
            if(item.disabled&&item.hideType){
              deleId.push(item.id);
            }
          })
          this.nowCheckIds = this.subcheckIds.filter((item)=>{
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
          this.subCheckdata.map((item)=>{
            if(item.disabled&&item.hideType){
              deleId.push(item.id);
            }
          })
          this.nowCheckIds = this.subcheckIds.filter((item)=>{
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
        case "ben":
          that.checkedCities = that.subcheckIds || [];
          break;
        case "dosend":
          this.$refs[this.getTreeName()].setCheckedKeys(this.checkIds || []); //选中
          break;
        case "gonggao":
          this.$refs[this.getTreeName()].setCheckedKeys(this.checkIds || []); //选中
          break;
        default:
          this.checkedCities = this.subcheckIds || [];
          break;
      }
      this.nowCheckList = this.subCheckdata.filter((item)=>{
        if(!item.hideType&&this.dialogTypeNow!="zengfa"){
          item.disabled = false;
        }
        return !item.hideType;//为true 时 不显示
      })
    },

  },
  created(){
    this.loadingTreeCopy = this.loadingTree;
    setTimeout(()=>{
      this.loadingState = true;
    })
  },
  watch: {
    subdialogState(newv, oldv) {
      if (newv) {
        this.copyCheckList = this.checkIds;
        this.nowCheckList = [];
        this.checkedCities = [];
        this.getCompData();
      }
    },
    loadingTree:{
      handler(newv) {
        this.loadingTreeCopy = newv;
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
        this.loadingTreeCopy = this.subLoadingTree;
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