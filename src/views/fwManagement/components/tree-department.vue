<template>
  <div class="treeWrap">
    <el-dialog
      :title="treedialogTit"
      :visible.sync="subdialogVisible"
      @close="cancelSetDialog"
      append-to-body
      width="70%"
    >
      <el-row>
        <el-col :span="12">
          <div class="title">选择处理部门</div>
          <el-scrollbar style="width:96%;height:500px">
           <el-tree
            ref="comptree"
            node-key="id"
            show-checkbox
            :check-on-click-node="true"
            :check-strictly="true"
            :data="treeData"
            @check-change="nodeClick"
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
              @click.native="resetCheck('1')"
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
                  <el-button
                    type="primary"
                    size="mini"
                    @click.native="upRow(index)"
                    :disabled="(index==0)||item.disabled"
                    round
                  >上移</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click.native="downRow(index)"
                    :disabled="(index==nowCheckList.length-1)||item.disabled"
                    round
                  >下移</el-button>
                  <el-button type="warning" size="mini" :disabled="item.disabled" @click.native="deleteRow(index)" round>删除</el-button>
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
    "treedialogTit",
    "treesingelCheckF",
    "nowCheckIds",
    "nowCheckList",
    "isAdd",
    "unitCodes"
  ],
  data() {
    return {
      unitTreeByFirst_parmas:{
        function:'unitTreeByFirst',
        unitCode:'',
        flag:true
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
      defaultProps: {
        children: 'children',
        label: "name",
      },
      initCheckList: [],
      initCheckIds: []
    };
  },
  mounted() {
    this.initCheckList = this.nowCheckList;
    this.initCheckIds = this.nowCheckIds;
    this.unitTreeByFirst_parmas.unitCodes =  this.unitCodes; 
    this.getTreeData()
  },
  methods: {
    getTreeData(){
      this.$post.postData("unitTreeByFirst",JSON.stringify(this.unitTreeByFirst_parmas),this.$businessCode.fwgl1)
        .then(res => {
          let data = res.data;
          this.treeData = data;
          console.log(data)
          data[0].disabled = true
          // data[0].TYPE = 'orgDept'
          this.$refs.comptree.setCheckedKeys(this.nowCheckIds || []); //选中

          // 判断不可勾选
          if (this.isAdd) {
            data[0].children.forEach((item, n) => {
              this.nowCheckIds.forEach((node, m) => {
                if( item.id == node ){
                  item.disabled = true;
                }
              })
            })
          }
          
        })
        .catch(err => {
          // console.log(err);
        });
    },
    nodeClick(data, node) {
      console.log(data)
      this.$nextTick(() => {
      if (this.treesingelCheckF) {
          this.$refs.comptree.setCheckedKeys([data.id]); 
        }
      if (data.children) {
        this.$refs.comptree.setChecked(data, false);
      }
        this.nowCheckList = this.$refs.comptree.getCheckedNodes();
        // console.log( this.nowCheckList)
      });
    },
    resetCheck(val) {
      if (val=="1") {
        let Ids = [];//不可操作id
        this.nowCheckList = this.nowCheckList.filter((item)=>{
          if(item.disabled){
            Ids.push(item.id);
          }
          return item.disabled;
        })
        this.$refs.comptree.setCheckedKeys(Ids);
      } else {      
        this.nowCheckList = [];
        this.$refs.comptree.setCheckedKeys([]);
      }
    },
    deleteRow(n) {
      this.$refs.comptree.setChecked(this.nowCheckList[n], false);
      this.nowCheckList.splice(n, 1);
    },
    cancelSetDialog() {
      this.nowCheckList = this.initCheckList;
      // this.nowCheckIds = this.initCheckIds;
      this.$emit("treeshowCompDialog", this.nowCheckList, false);
      this.resetCheck()
      // this.subdialogVisible = false;
    },
    saveSetDialog() {
      this.$emit("treeshowCompDialog", this.nowCheckList, false);
      this.resetCheck()
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
    unitCodes(){
      
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
// /deep/ .el-tree-node__content>.el-tree-node__expand-icon{
//   display: none;
// }
</style>