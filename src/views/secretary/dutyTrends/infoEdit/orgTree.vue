/**
* create by zx on 2020/9/8 09:41
* 类注释：机构部门树
* 备注：
*/
<!--<org-tree v-model="showOrgTree"
          :title="title"
          :isSingle="isSingle"
          :orgOrDept="orgOrDept"
          :orgOrDeptId="orgOrDeptId"
          @orgList="getOrgList"></org-tree>-->
<template>
  <div class="orgTree">
    <el-dialog
      :title="title"
      v-dialogDrag
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      v-loading="loading"
    >
      <el-row>
        <el-col :span="12">
          <div class="title">
            <span>{{title}}</span>
          </div>
          <div class="tree_w box_shadow">
            <el-scrollbar>
              <el-checkbox
                v-model="checkAll"
                v-if="!isSingle"
                @change="checkAllChange"
                style="margin-bottom: 10px"
              >全选</el-checkbox>
              <el-tree
                ref="elTree"
                :props="props"
                show-checkbox
                :check-on-click-node="true"
                :default-checked-keys="defaultCheckedKeys"
                :expand-on-click-node="false"
                @check="checkTree"
                node-key="id"
                :data="treeData"
              ></el-tree>
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
                    <span class="name">{{item.unitName||item.name}}</span>
                    <div class="one_btn">
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
      <el-row v-if="outBank" style="margin-top: 20px">
        <el-col :span="12">
          <div class="title">
            <span>{{title}}</span>
          </div>
          <div class="tree_w box_shadow">
            <el-scrollbar>
              <el-tree
                ref="elTree1"
                :props="props1"
                :data="treeData"
                show-checkbox
                 :default-checked-keys="defaultCheckedKeys"
                :default-expand-all="true"
                :check-on-click-node="false"
                :check-strictly="false"
                :expand-on-click-node="false"
                @check="checkTree1"
                node-key="id"
              ></el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            <span>已选项</span>
            <el-button
              type="primary"
              @click.native="resetCheck1"
              style="float:right"
              size="mini"
              :disabled="nowCheckList1.length==0"
              round
            >清空</el-button>
          </div>
          <div class="box_shadow tree_w">
            <el-scrollbar>
              <div v-for="(item,index) in nowCheckList1" :key="index">
                <template>
                  <div class="command_wrap">
                    <span class="name">{{item.unitName||item.name}}</span>
                    <div class="one_btn">
                      <el-button
                        type="warning"
                        size="mini"
                        @click.native="deleteRow1(index)"
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
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "orgTree",
  components: {},
  props: {
    title: { type: String, default: "标题" },
    value: {
      type: Boolean,
      default() {
        return false;
      }
    },
    //单选
    isSingle: {
      type: Boolean,
      default() {
        return true;
      }
    },
    //是否展示群组
    outBank: {
      type: Boolean,
      default() {
        return false;
      }
    },
    //是否查询全部
    isSearchAll: {
      type: Boolean,
      default() {
        return false;
      }
    },
    //机构或者部门 机构为1，部门为0
    orgOrDept: {
      type: Number,
      default: 1
    },
    //部门或者机构id
    orgOrDeptId: {
      type: String,
      default: JSON.parse(localStorage.getItem("userInfo")).unitId
    },
    //type为all时，拉取一级部门与机构 ,""拉取只拉去部门或者机构
    type: {
      type: String,
      default: ""
    },
    //条件查询机构级别    up:上级   low:下级  peer:同级 ''其他
    queryType: {
      type: String,
      default: ""
    },
    selectDept: {
      type: Array || Object,
      default() {
        return [];
      }
    },
    //需要返回一级部门(dept1)
    opType: {
      type: String,
      default: ""
    },
    //分级维护---查询时查询自己所在机构为 1；默认只查所管理机构
    seletSelf: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      treeData: [],
      defaultCheckedKeys:[],//机构树默认选择
      checkAll: false,
      loading: false,
      props: {
        children: "children",
        label: "name",
        isLeaf: "leaf"
      },
      props1: {
        children: "children",
        label: "unitName",
        isLeaf: "leaf"
      },
      dialogVisible: false,
      nowCheckList: [],
      nowCheckList1: [],
      searchType: "",
      treeDateStore: [], //存储首次懒加载数据
      loadTree: []
    };
  },
  watch: {
    dialogVisible(val) {
      this.$emit("input", val);
      if (val == true) {
        this.getTreeData();
      }
    },
    value(val) {
      this.dialogVisible = val;
      if (val && this.outBank) {
        this.loadData();
      }
      if (!val) {
        this.searchType = "";
      }
    },
    selectDept(val) {
      if (val instanceof Array) {
        val.forEach(item => {
          item.unitName = item.name
        })
        this.nowCheckList = val;
      } else {
        val = [val]
        val.forEach(item => {
          item.unitName = item.name
        })
        this.nowCheckList = [val];
      }
    }
  },
  computed: {},
  methods: {
    getLoadTree() {
      this.treeData = []
      this.$api.duty
        .getPublishLimitData({
          unitClass: 1,
          unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId
        })
        .then(res => {
          res.data.forEach(item => {
            var index = 5
            switch (item.name) {
              case '一级分行':
                index = 0
                break;
              case '建行大学':
                index = 1
                break;
              case '境内子公司':
                index = 2
                break;
              case '总行各部门':
                index = 3
                break;
              case '所辖行':
                index = 0
                break;
              case '行各部门':
                index = 1
                break;
              default:
                break;
            }
            if(index != 5){
              if(item.children){
                item.children.forEach(i=>{
                  i.pid=item.id;
                })
              }
              this.treeData[index] = item
            }
          })
          console.log('treedata', this.treeData)
        });
    },
    checkAllChange(val) {
      if (val) {
        let ids = [];
        let self = this;
        this.checkAll=true;//全选按钮置为已选
        this.treeData.forEach(item => {
          ids.push(item.id);
        });
        var _this = this
        this.$nextTick(()=>{
          _this.$refs.elTree.setCheckedKeys(ids);
          _this.nowCheckList = _this.$refs.elTree.getCheckedNodes();
          _this.nowCheckList=_this.nowCheckList.filter(item=>{
               if(item.pid){
                 return item;
               }
            })
        })
        
      } else {
        this.checkAll=false;//全选按钮置为未选
        this.$refs.elTree.setCheckedKeys([]);
        this.nowCheckList = [];
      }
    },
    upRow(n) {
      let midObj;
      midObj = this.nowCheckList[n];
      if (this.nowCheckList[n - 1].disabled) {
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
    getTreeData() {
    //  this.treeData = []
      this.$api.duty
        .getPublishLimitList({
          orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
          orgCode: JSON.parse(localStorage.getItem("userInfo")).unitId
          //JSON.parse(localStorage.getItem("userInfo")).humanName
          // unitClass: this.orgOrDept,
          // searchType: this.searchType,
          // unitCode: node.data ? node.data.id : this.orgOrDeptId,
          // type: this.type,
          // queryType: this.queryType,
          // opType: this.opType,
          // seletSelf: node.data ? node.data.seletSelf : this.seletSelf,
        })
        .then(res => {
          console.log(res, "打印发布范围");
          this.loading = false;
          var dataArr;
          res.list.forEach((item, index) => {
            if (
              item.draftOrganId ==
              JSON.parse(localStorage.getItem("userInfo")).unitId
            ) {
              dataArr = JSON.parse(item.sendObject);
            }
          });
          console.log(dataArr);
          let data = []
          this.defaultCheckedKeys = dataArr.map(item =>{
            if(!!item.pid){
                data.push({unitName: item.name,id: item.id})
               return item.id;
            }
          });
          console.log('选择树'+data);
          this.searchType = res.searchType;
          this.nowCheckList = data;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    checkTree(now, check, hascheck) {
      now.unitName = now.name
      if (this.isSingle) {
        this.$refs.elTree.setCheckedKeys([now.id]);
        this.nowCheckList = this.$refs.elTree.getCheckedNodes();
        this.nowCheckList=this.nowCheckList.filter(item=>{
          if(!item.pid){
            return item;
          }
        })
      } else {
        let arr = [];
        let tempArr = [];
        arr = this.$refs.elTree.getCheckedNodes();
        if (!isEmptyObject(this.selectDept)) {
          if (this.selectDept instanceof Array) {
            arr.push(...this.selectDept);
          } else {
            arr.push(this.selectDept);
          }
        }
        this.nowCheckList = arr.filter(item => {
          item.unitName = item.name
          if (!tempArr.includes(item.id)&&!!item.pid) {
            tempArr.push(item.id);
            return item;
          }
        });
      }
      this.checkAll = this.nowCheckList.length == this.treeData.length
      console.log("this.nowCheckList", this.nowCheckList);
    },
    checkTree1(now, check, hascheck) {
      if (this.isSingle) {
        this.$refs.elTree1.setCheckedKeys([now.id]);
      }
      this.nowCheckList1 = this.$refs.elTree1.getCheckedNodes();
      for (let i = this.nowCheckList1.length; i > 0; i--) {
        if (this.nowCheckList1[i - 1].p||!!this.nowCheckList.pid) {
          this.nowCheckList1.splice(i - 1, 1);
        }
      }
    },
    deleteRow(index) {
      this.$refs.elTree.setChecked(this.nowCheckList[index], false);
      this.nowCheckList.splice(index, 1);
    },
    deleteRow1(index) {
      this.$refs.elTree1.setChecked(this.nowCheckList1[index], false);
      this.nowCheckList1.splice(index, 1);
    },
    resetCheck() {
      this.$refs.elTree.setCheckedKeys([]);
      this.nowCheckList = [];
      this.checkAll = false
    },
    resetCheck1() {
      this.$refs.elTree1.setCheckedKeys([]);
      this.nowCheckList1 = [];
    },

    sure() {
      if (this.outBank) {
        this.nowCheckList.push(...this.nowCheckList1);
      }
      if (this.isSingle) this.$emit("orgList", this.nowCheckList[0]);
      else this.$emit("orgList", this.nowCheckList);
      this.resetCheck();
      if (this.outBank) this.resetCheck1();
      this.dialogVisible = false;
    },
    loadData() {
      this.$api.dailyWork.getVierList({ groupClass: "他行群组" }).then(res => {
        console.log("*************他行群组", res.data);
        this.treeData = [];
        let data1 = [];
        let groupClass = res.data.groupClass;
        res.data.forEach(item => {
          let items = {};
          items.unitName = item.groupName;
          items.id = item.groupName;
          items.p = true;
          let childs = [];
          item.members.forEach(child => {
            childs.push({
              unitName: child.groupMembersCn,
              id: child.groupMembersId,
              groupClass: "他行群组"
            });
          });
          items.children = childs;
          data1.push(items);
        });
        this.treeData.push({
          unitName: "他行群组",
          id: "00000000",
          p: true,
          children: data1
        });
        this.$api.dailyWork.getVierList({ groupClass: "部门" }).then(res => {
          let data2 = [];
          res.data.forEach(item => {
            let items = {};
            items.unitName = item.groupName;
            items.id = item.groupName;
            items.p = true;
            let childs = [];
            item.members.forEach(child => {
              childs.push({
                unitName: child.groupMembersCn,
                id: child.groupMembersId,
                groupClass: "部门"
              });
            });
            items.children = childs;
            data2.push(items);
          });
          this.treeData.push({
            unitName: "部门群组",
            id: "0101010",
            p: true,
            children: data2
          });
        });
      });
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.getLoadTree();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.title {
  font-size: 16px;
  color: #303133;
  margin-bottom: 10px;
  overflow: hidden;
  height: 28px;
}

.el-scrollbar {
  height: 100%;
}

.tree_w {
  max-width: 440px;
  height: 400px;
  padding-left: 20px;
}

.box_shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 280px;

  .one_btn {
    width: 240px;
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
    width: 280px;
    overflow: hidden;
  }
}
</style>
