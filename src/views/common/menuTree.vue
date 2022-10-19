<template>
  <div class="treeWrap">
    <el-row>
      <el-col :span="12">
        <div class="title">选择常用功能</div>
        <el-tree
          class="box_shadow comp_wrap"
          :data="treeDatas"
          show-checkbox
          :check-strictly="true"
          :check-on-click-node="true"
          default-expand-all
          ref="comptree"
          @check="checkTree"
          node-key="id"
        ></el-tree>
      </el-col>
      <el-col :span="12">
        <div class="title">
          <span>已选项</span>
          <span class="s-tip-t-gtey">（最多可选6个）</span>
          <el-button
            type="primary"
            @click.native="resetCheck"
            style="float:right"
            size="mini"
            :disabled="checkNodes.length==0"
            round
          >清空</el-button>
        </div>
        <div class="box_shadow comp_wrap">
          <div v-for="(item,index) in checkNodes" :key="item.id" class="comp_list">
            <template>
              <span>{{item.label}}</span>
              <div style="float:right">
                <el-button
                  type="primary"
                  size="mini"
                  @click.native="upRow(index)"
                  :disabled="index==0"
                  round
                >上移</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click.native="downRow(index)"
                  :disabled="index==checkNodes.length-1"
                  round
                >下移</el-button>
                <el-button type="warning" size="mini" @click.native="deleteRow(index)" round>删除</el-button>
              </div>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="footerBtn">
      <el-button type="primary" @click="saveSetDialog">确 定</el-button>
      <el-button @click="cancelSetDialog">取 消</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    commonMenus:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      treeDatas: [],
      checkNodes: [],
      checkedIds:[],
    };
  },
  created() {
    this.checkNodes = JSON.parse(JSON.stringify(this.commonMenus));
    this.checkNodes.map(item=>{
      this.checkedIds.push(item.rightId);
    })
    this.initData();
  },
  methods: {
    cancelSetDialog(){
      this.$emit("close",false);
    },
    saveSetDialog(){
      let params = [];
      if(this.checkNodes.length>0){
        this.checkNodes.map(item=>{
          let tmpObj={
            rightId:item.id,
            rightName:item.meta.title,
            rightUrl:item.path
          };
          params.push(tmpObj);
        })
      };
      this.$emit("confirm",params);
    },
    checkTree() {
      this.checkNodes = this.$refs.comptree.getCheckedNodes();
      this.checkedIds = this.$refs.comptree.getCheckedKeys();
      this.initData();
    },
    resetCheck() {
      this.$refs.comptree.setCheckedNodes([], true);
      this.checkNodes = [];
      this.checkedIds=[];
      this.initData();
    },
    upRow(n) {
      let midObj;
      midObj = this.checkNodes[n];
      this.checkNodes[n] = this.checkNodes[n - 1];
      this.checkNodes[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      midObj = this.checkNodes[n];
      this.checkNodes[n] = this.checkNodes[n + 1];
      this.checkNodes[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n) {
      this.$refs.comptree.setChecked(this.checkNodes[n], false);
      this.checkedIds = this.$refs.comptree.getCheckedKeys();
      this.checkNodes.splice(n, 1);
      this.initData();
    },
    /**
     * @param {Array} target 菜单树 
     * @param {Boolean} disabled 当前节点可选状态
     * @return {Array} 处理后的菜单树
    */
    manageTreeDatas(target,disabled) {
      let result;
      if (typeof target === "object") {
        if (Array.isArray(target)) {
          result = []; 
          for (let i in target) {
            result.push(this.manageTreeDatas(target[i],disabled));
          }
        } else if (target === null) {
          result = null;
        } else if (target.constructor === RegExp) {
          result = target;
        } else {
          result = {};
          if(target.name){
            let isChecked = false;
            this.checkedIds.map(item=>{
              if(target.id == item){
                isChecked = true
              }
            })
            result.disabled = target.children.length>0?true:(isChecked?false:disabled);
            result.label = target.meta && target.meta.title
          }
          for (let i in target) {
            result[i] = this.manageTreeDatas(target[i],disabled);
          }
        }
      } else {
        result = target;
      }
      return result;
    },
    
    initData(){
      let disabled = this.checkNodes.length>=6? true:false;
      let orgTreeDatas =  JSON.parse(localStorage.getItem("routerList")) || [];
      this.treeDatas = this.manageTreeDatas(orgTreeDatas,disabled);
      this.$nextTick(()=>{
        if(this.$refs.comptree){
          this.$refs.comptree.setCheckedKeys(this.checkedIds,true);
        }
      })
    }    
  },
  mounted(){
    this.$refs.comptree.setCheckedKeys(this.checkedIds,true);
    this.$nextTick(()=>{
      this.checkNodes = this.$refs.comptree.getCheckedNodes();
    })
  }
};
</script>
<style lang="less" scoped>
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
.comp_wrap {
  height: 500px;
  padding: 14px;
  overflow-y: scroll;
  .comp_list {
    height: 42px;
    line-height: 42px;
  }
}
.pad_20 {
  padding: 20px;
}
.selectlist {
  width: 100%;
  padding: 20px 0;
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
.footerBtn{
  margin-top:10px;
  text-align:right;
  padding-right: 10px;
}
/deep/ .el-tabs__nav-scroll {
  height: 500px;
  overflow-y: scroll;
}
/deep/ .el-tabs--left .el-tabs__nav-wrap.is-left {
  padding-top: 2px;
}
/deep/ .el-checkbox-group .el-checkbox {
  margin-bottom: 20px;
  display: block;
}
</style>