<template>
  <div class="treeWrap">
    <el-dialog v-dialogDrag
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
            show-checkbox
            :check-on-click-node="true"
            :check-strictly="true"
            :load="loadNode"
            @check-change="nodeClick"
            lazy
            :props="defaultProps"
          >
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <i :class="data.TYPE == 'user'?'el-icon-s-custom':(data.leaf == 'true'?'el-icon-folder':'el-icon-folder-opened')">{{node.label}}</i>
          </span></el-tree>
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
                <span>{{item.name}}</span>
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
    "subcheckIds",
    "subcanTab",
    "suboffenUse",
    "parentId",
    "treeType"
  ],
  data() {
    return {
      selectUserByUnitTree_parmas:{
        function:'selectUserByUnitTree',
        unitCode:'',
        flag:true
      },
      teamMember_save_parmas:{
        function: "teamMember_save",
        // TeamEntityPo: "",
        ids: '',
        name: '',
        teamId: '',
        renYuan: sessionStorage.getItem('role'),
        getAddOrInvitedAccess: 1
      },
      // defaultProps:{
      //   label:'label',
      //   children:'children'
      // },
      subdialogVisible: true,
      checkedCities: [],
      panelNum: 0,
      sendList: [],
      nowCheckList: [],
      defaultProps: {
        children: [],
        label: "name",
        isLeaf: 'leaf'
      },
      userType:'el-icon-folder-opened'
    };
  },
  created() {
    this.teamMember_save_parmas.teamId = this.parentId
    console.log(this.treeType)
  },
  methods: {
    // data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'
    loadNode(node,reslove){
      if(node.level === 0){
        let obj = {
          id:''
        }
        this.getTreeData(obj,node,reslove)
      }else{
        let obj = {
          id:node.data.id
        }
        if(node.data.TYPE == 'user'){
        return reslove([])
      }
      // else if(node.data.leaf == 'true'){
      //   return reslove([])
      // }
        this.getTreeData(obj,node,reslove)
      }
    },
    getTreeData(obj,node,reslove){
      this.selectUserByUnitTree_parmas.unitCode = obj.id
      this.$post.postData("selectUserByUnitTree",JSON.stringify(this.selectUserByUnitTree_parmas),this.$businessCode.tdgl)
        .then(res => {
          let data = res.data
          // data[0].disabled = true
          // data[0].TYPE = 'orgDept'
          console.log(res.data,2222)
          console.log(node)
            reslove(data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    nodeClick(data, check,childCheck) {
      this.$nextTick(() => {
        console.log(data)
      if (this.subsingelCheckF) {
          console.log(data.id)
          this.$refs.comptree.setCheckedKeys([data.id]); 
        }
        if (!data.TYPE) {
          // console.log('不是叶子节点')
        this.$refs.comptree.setChecked(data, false,false);
      }
        this.nowCheckList = this.$refs.comptree.getCheckedNodes();
        console.log(this.nowCheckList)
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
      this.$refs.comptree.setCheckedKeys([]);
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
      this.$emit("subshowCompDialog");
      this.resetCheck()
    },
    saveSetDialog() {
      let idsArr = [];
      let nameArr = []
      this.nowCheckList.forEach(item => {
        idsArr.push(item.id)
        nameArr.push(item.name)
      })
      this.teamMember_save_parmas.ids = idsArr.join(',')
      this.teamMember_save_parmas.name = nameArr.join(',')
      this.teamMember_save_parmas.getAddOrInvitedAccess = this.treeType
      this.$post
        .postData("teamMember_save", JSON.stringify(this.teamMember_save_parmas), this.$businessCode.tdgl)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
                showClose: true,
                message:res.message || '邀请已发出,待通过',
                type: "success"
              });
              this.$emit("subshowCompDialog", true);
          }else{
              this.$message({
                showClose: true,
                message:res.message,
                type: "warning"
              });
              this.$emit("subshowCompDialog");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
          this.$emit("subshowCompDialog");
        });
      this.resetCheck()
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
    parentId(newv,oldv){
      this.teamMember_save_parmas.teamId = newv
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
/deep/ .el-icon-folder:before{
  color: #E6A23C;
}
/deep/ .el-tree-node__content>.el-tree-node__expand-icon{
  display: none;
}
</style>