<template>
  <div class="treeWrap">
    <el-dialog
      :title="subdialogTit"
      :visible.sync="subdialogVisible"
      @close="cancelSetDialog"
      append-to-body
      width="70%"
    >
      <el-row>
        <el-col :span="12">
          <div class="title">选择处理人</div>
          <el-scrollbar style="width:96%;height:500px">
           <el-tree
            ref="comptree"
            node-key="id"
            :check-on-click-node="true"
            :check-strictly="true"
            :data="treeData"
            @node-click="nodeClick"
            :props="defaultProps"
          >
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <i :class="data.type == 'user'?'el-icon-s-custom':'el-icon-folder-opened'">{{node.label}}</i>
          </span>
          </el-tree>
          </el-scrollbar>
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
                  <!-- <el-button
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
                  >下移</el-button> -->
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
    "subsingelCheckF",
    "TransFerTeamId",
    "teampersonId"
  ],
  data() {
    return {
      getUserTreeTeamIsNotClosed_parmas:{
        function:'getUserTreeTeamIsNotClosed',
        teamId:'',
        deptId:'#'
      },
      // defaultProps:{
      //   label:'label',
      //   children:'children'
      // },
      subdialogVisible: true,
      checkedCities: [],
      panelNum: 0,
      sendList: [],
      treeData:[],
      nowCheckList: [],
      defaultProps: {
        children: 'children',
        label: "text",
      }
    };
  },
  mounted() {
    this.getTreeData()
  },
  methods: {
    getTreeData(){
      this.getUserTreeTeamIsNotClosed_parmas.teamId = this.TransFerTeamId 
      this.$post.postData("getUserTreeTeamIsNotClosed",JSON.stringify(this.getUserTreeTeamIsNotClosed_parmas),this.$businessCode.tdgl)
        .then(res => {
           let newtreeData = res.data
          // data[0].disabled = true
          // data[0].TYPE = 'orgDept'
           this.treeData.push(newtreeData)
        })
        .catch(err => {
          // console.log(err);
        });
    },
    nodeClick(data, node) {
      console.log(data)
      this.$nextTick(() => {
      if (this.subsingelCheckF) {
          this.$refs.comptree.setCheckedKeys([data.id]); 
        }
      if (data.children || data.id == this.teampersonId) {
        this.$refs.comptree.setChecked(data, false);
      }
      if (data.id == this.teampersonId) {
        this.$message.closeAll();
        this.$refs.comptree.setChecked(data, false);
        this.$message({
          message: '本人无法转交给本人',
          type: 'warning'
        });
      }
        this.nowCheckList = this.$refs.comptree.getCheckedNodes();
        // console.log( this.nowCheckList)
      });
    },
    resetCheck() {
      this.nowCheckList = [];
      this.$refs.comptree.setCheckedKeys([]);
    },
    deleteRow(n) {
      this.$refs.comptree.setChecked(this.nowCheckList[n], false);
      this.nowCheckList.splice(n, 1);
    },
    cancelSetDialog() {
      this.$emit("subshowCompDialog", this.copyCheckList);
      this.resetCheck()
    },
    saveSetDialog() {
      this.$emit("subshowCompDialog", this.nowCheckList, true);
      this.resetCheck()
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
    // subdialogState(newv, oldv) {
    //   if (newv) {
    //     this.copyCheckList = this.subcheckIds;
    //     this.getCompData();
    //   }
    //   this.subdialogVisible = newv;
    //   console.log(this.subdialogVisible)
    // }
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
// /deep/ .el-tree-node__content>.el-tree-node__expand-icon{
//   display: none;
// }
</style>