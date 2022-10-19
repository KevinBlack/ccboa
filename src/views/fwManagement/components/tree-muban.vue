<template>
  <div class="treeWrap">
    <el-dialog
      :title="dialogTit"
      v-if="!loadingTree&&singelCheckF && dialogVisible && !canTab"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="cancelSetDialog"
      width="50%"
    >
      <div v-if="offenUse">
        <div class="title">下一处理环节</div>
        <el-select
          @change="getTreeInfo"
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
      <el-row v-loading="loading">
        <el-col :span="12">
          <div class="title">
            <span>选择部门</span>
            <div class="rightwrap" v-if="false">
              <el-checkbox v-model="offenUseConfig.set">常用发送对象</el-checkbox>
              <span class="setfont" @click="subshowCompDialog">设置</span>
            </div>
          </div>
          <div class="tree_w box_shadow">
            <el-scrollbar>
              <el-tree
                :data="comTreeData"
                show-checkbox
                ref="comptree"
                :check-on-click-node="true"
                :check-strictly="true"
                @check="checkTree"
                node-key="id"
                :default-expand-all="true"
                :props="defaultProps"
              >
              <span class="custom-tree-node" slot-scope="{ node,data }">
                <i :class="data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'">{{node.label}}</i>
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
                    <span class="name">{{item.name}}</span>
                    <div class="one_btn">
<el-button type="warning" size="mini" @click.native="deleteRow(index)" round>删除</el-button>
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

    <treeChild
      :subdialogTit="subdialogTit"
      :suboffenUse="suboffenUse"
      :subcheckIds="subcheckIds"
      :subcanTab="subcanTab"
      :subsingelCheckF="subsingelCheckF"
      :subdialogState="subdialogState"
      @subshowCompDialog="subshowCompDialog"
    ></treeChild>
  </div>
</template>

<script>
import treeChild from "../../../components/tree/tree-child";
export default {
  components: {
    treeChild
  },
  props: {
    "dialogTit":String,
    "dialogState":Boolean,
    "singelCheckF":Boolean,
    "checkIds":{
      default:[],
      type:Array
    },
    "selWfNode_parmas":{
      default:{},
      type:Object
    },
    "checkData":{
      default:[],
      type:Array
    },
    "canTab":{
      default:false,
      type:Boolean
    },
    "treeData":{
      default:[],
      type:Array
    },
    "seletOptionsData":{
      default:[],
      type:Array
    },
    "hasRadio":{
      default:false,
      type:Boolean
    },
    "offenUse":{
      default:false,
      type:Boolean
    },
    "dialogType":{
      default:'hui',
      type:String
    },
    "dialogTypeNow":String,
    "loadingTree":{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
      loading: true, //等待加载
      suboffenUse: true, //是否可设置常用
      subcanTab: false, //是否可切换
      subsingelCheckF: true, // 单选true 多选为false
      subdialogTit: "sdf", // 弹框标题
      subdialogState: false,
      subcheckIds: [],
      setradio: "1",
      selectInfo: {
        name: "",
        id: ""
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
      defaultProps: {
        children: "children",
        label: "unitShort"
      },
      defaultHuiProps: {
        children: "content",
        label: "text"
      },
      //请求树结构
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "001",
        curTplNo: "testOA3ID",
        curMultiTenancyId: "CN000"
      },
      comTreeData:[],
      nextNodeName:''
    };
  },
  mounted() {},
  methods: {
    subshowCompDialog(data, type) {
      //嵌套弹层 
      if (this.subdialogState && type) {
        this.subcheckIds = data[0] ? [].concat(data[0].id) : [];
      }
      this.subdialogState = !this.subdialogState;
    },
    //树形勾选
    checkTree(now, check, hascheck) {
      console.log(now)
      let nowNode = now;
      if (
        (nowNode.content && nowNode.content.length) ||
        (nowNode.children && nowNode.children.length)
      ) {
        this.$refs.comptree.setChecked(nowNode, false);
        return;
      }
      this.$nextTick(() => {
        if (this.singelCheckF) {
          this.$refs.comptree.setCheckedKeys([nowNode.id]);
        }
        this.nowCheckList = this.$refs.comptree.getCheckedNodes();
      });
    },
    resetCheck() {
      if (this.canTab) {
        this.nowCheckList.forEach((item, m) => {
          this.deleteTabRow(m, true);
        });
      } else {
        this.$refs.comptree.setCheckedKeys([]);
      }
      this.nowCheckList = [];
    },
    getTreeInfo() {
      this.loading = true
      let obj = {};
      obj = this.seletOptionsData.find(item => {
        return item.PCSAVYID === this.offenUseConfig.nextNodeId;
      });
      this.selectInfo.name = obj.AVYNODENM;
      this.bank_send.pcsAvyId = this.selectInfo.id = obj.PCSAVYID;
      this.nowCheckList = [];
       this.checkedCities = [];
        this.$refs.comptree.setCheckedKeys([]);
      this.$post
        .postData("selWfNode", JSON.stringify(this.bank_send), this.$businessCode.ggywgn)
        .then(res => {
          console.log(res.data)
          this.loading = false
          this.comTreeData =res&&res.data||[];
          this.$forceUpdate();
        });
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
      this.$emit("showCompDialog", this.copyCheckList);
    },
    saveSetDialog() {
      this.$emit(
        "showCompDialog",
        this.nowCheckList[0],
        true,
        this.selectInfo
      );
    },
    getCompData() {
      // 请求数据
   this.comTreeData = this.treeData
   this.bank_send.curTplNo=this.selWfNode_parmas.curTplNo
   this.bank_send.curMultiTenancyId=this.selWfNode_parmas.curMultiTenancyId
      this.$nextTick(() => {
        // this.offenUseConfig.nextNodeId = this.seletOptionsData.length>0?this.seletOptionsData[0].PCSAVYID:'';
        this.backDialogData(this.dialogType);
      });
    },
    //数据回显勾选
    backDialogData(type) {
      let that = this;
      this.nowCheckList = this.checkData;
      switch (type) {
        case "zhusong":
          this.checkedCities = this.checkIds || [];
          break;
        case "chao":
          this.checkedCities = this.checkIds || [];
          break;
        case "hui":
          this.$refs.comptree.setCheckedKeys(this.checkIds || []); //选中
          break;
        case "ben":
          that.checkedCities = that.checkIds || [];
          break;
        case "dosend":
          this.$refs.comptree.setCheckedKeys(this.checkIds || []); //选中
          break;
      }
    },
    //tabtree
    tabPanel(val) {
      this.panelNum = val.index;
      // this.checkedCities = this.comTreeData[this.panelNum].data.filter(item=>{
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
      this.comTreeData.forEach((item, m) => {
        item.content.forEach(list => {
          list.id === id ? (this.comTreeData[m].isIndeterminate = false) : "";
        });
      });
    },
    //三列布局全选、取消全选勾选
    handleCheckAllChange(val, n) {
      let nowLists = [];
      nowLists = this.comTreeData[this.panelNum].content; //当前操作列表
      val ? this.comTreeData[n].content.forEach(item=>{
        this.checkedCities.push(item.id);
      }) : this.checkedCities = [];
      this.comTreeData[n].isIndeterminate = val;
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
    handleCheckedCitiesChange(value, n) {
      console.log("选中项", value);
      let checkedCount = 0;
      let newCheckLists = [];
      value.forEach(item => {
        this.comTreeData[n].content.forEach(node => {
          if (item === node.id) {
            newCheckLists.push({ id: node.id, text: node.text });
            checkedCount++;
          }
        });
      });
      //清除当前tab 已勾选项
      this.nowCheckList = this.nowCheckList.filter(item => {
        let hasF = true;
        this.comTreeData[n].content.forEach(node => {
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
      this.comTreeData[n].isIndeterminate =
        checkedCount === this.comTreeData[n].content.length; //全选设置
      //对当前tab 勾选项进行合并
      value.length > 0
        ? (this.nowCheckList = [].concat(this.nowCheckList, newCheckLists))
        : this.nowCheckList.filter(item => item.id != value.id);
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 8000);
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
    treeData: {
      handler(newv) {
        console.log(newv)
        newv.length>0 ? (this.loading = false) : (this.loading = true);
      },
      deep: true
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
/deep/ .el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}
.el-scrollbar {
  height: 100%;
}
.comp_wrap {
  height: 400px;
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
/deep/ .el-tabs__nav-scroll {
  height: 400px;
  overflow-y: scroll;
}

/deep/ .el-checkbox-group .el-checkbox {
  margin-bottom: 20px;
  display: block;
}
.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 400px;
  .one_btn{
    width: 80px;
    height: 42px;
    line-height: 42px;
  }
  .btns {
    width: 300px;
    height: 42px;
    line-height: 42px;
    white-space: nowrap;
  }
  .name {
    white-space: nowrap;
    height: 42px;
    line-height: 42px;
    display: inline-block;
    text-overflow: ellipsis;
    width: 280px;
    overflow: hidden;
  }
}
</style>
