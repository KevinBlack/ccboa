<template>
  <div class="treeWrap">
    <el-dialog
      v-dialogDrag
      :title="subdialogTit"
      v-if="subdialogVisible"
      :visible.sync="subdialogVisible"
      @close="cancelSetDialog"
      width="50%"
    >
      <el-row>
        <el-col :span="12">
          <div class="title">选择处理人</div>
          <el-tree
            class="box_shadow comp_wrap"
            :data="subtreeData"
            :show-checkbox='showcheckbox'
            :check-strictly="true"
            :check-on-click-node='true'
            ref="comptree"
            @check="checkTree"
            node-key="id"
            :default-expand-all="true"
            :props="defaultProps"
          >
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <i :class="data.type == 'user'?'el-icon-s-custom':'el-icon-folder-opened'">{{node.label}}</i>
          </span>
          </el-tree>
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
          <div class="box_shadow comp_wrap">
            <div v-for="(item,index) in nowCheckList" :key="index" class="comp_list">
              <template>
                <span>{{item.text}}</span>
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
                    :disabled="index==nowCheckList.length-1"
                    round
                  >下移</el-button>
                  <el-button type="warning" size="mini" @click.native="deleteRow(index)" round>删除</el-button>
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
    'showcheckbox',
    // "checkstrictly
  ],
  data() {
    return {
      bank_redheader: {
        function: "selectUserByUnitTree",
        unitId: 1
      },
      offenUseConfig:{
        options:[
          {
            name:'拟稿',
            id:'draft'
          },
          {
            name:'处审核',
            id:'draft1'
          },
          {
            name:'部门领导审核',
            id:'draft2'
          },
          {
            name:'综合处理',
            id:'draft3'
          },
          {
            name:'部门核稿',
            id:'draft4'
          },
          {
            name:'部门签发',
            id:'draft5'
          }
        ],
        nextNodeId:'',
        set: false
      },
      subdialogVisible: false,
      checkedCities: [],
      panelNum: 0,
      sendList: [
        
      ],
      nowCheckList: [],
      defaultProps: {
        children: "children",
        label: "text"
      }
    };
  },
  mounted() {

  },
  methods: {
    checkTree(now, check, hascheck) {
      let nowNode = now;
      if (nowNode.children) {
        this.$refs.comptree.setChecked(nowNode, false);
      }
      this.$nextTick(() => {
        if (this.subsingelCheckF) {
          this.$refs.comptree.setCheckedKeys([nowNode.id]);
        }
        this.nowCheckList = this.$refs.comptree.getCheckedNodes();
      });
    },
    resetCheck() {
      if(this.subcanTab){
        this.nowCheckList.forEach((item,m)=>{
          this.deleteTabRow(m,true);
        })
      }else{
        this.$refs.comptree.setCheckedKeys([]);
      }
      this.nowCheckList = [];
    },
    upRow(n) {
      let midObj;
      midObj = this.nowCheckList[n];
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
      this.$refs.comptree.setChecked(this.nowCheckList[n], false);
      this.nowCheckList.splice(n, 1);
    },
    cancelSetDialog() {
      this.$emit("subshowCompDialog", this.copyCheckList);
    },
    saveSetDialog() {
      this.$emit("subshowCompDialog", this.nowCheckList, true);
      console.log(this.nowCheckList)
    },
    getCompData() {
      // 请求数据
      this.nowCheckList = [];
      this.copyCheckList = [];
      // this.nowCheckList = this.subtreeData||[];
      this.$nextTick(() => {
        //this.$refs.comptree.setCheckedKeys(this.checkIds); 选中
      });
    },
    //tabtree
    tabPanel(val) {
      this.panelNum = val.index;
      // this.checkedCities = this.sendList[this.panelNum].data.filter(item=>{
      //   return this.nowCheckList.forEach(list=>{
      //     return list.id === item.id;
      //   })
      // })
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
    }
  },
  watch: {
    subdialogState(newv, oldv) {
      if (newv) {
        
        this.getCompData();
      }
      this.subdialogVisible = newv;
    }
  },
  subtreeData: {
     handler(newv) {
       return newv;
     }
  }
};
</script>
<style  lang="less" scoped>
.treeWrap .el-col-12{
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
.selectlist{
  width: 100%;
  padding:20px 0;
}
.rightwrap{
  float: right;
  .setfont{
    font-size: 14px;
    color: #409EFF;
    padding-left: 20px;
    cursor: pointer;
  }
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
/deep/ .el-icon-folder-opened:before{
  color: #E6A23C;
  font-size: 16px;
}
/deep/ .el-icon-s-custom:before{
  color: #409EFF;
}
</style>