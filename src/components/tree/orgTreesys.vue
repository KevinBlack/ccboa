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
              <el-tree
                ref="elTree"
                :props="props"
                show-checkbox
                :check-on-click-node="true"
                :check-strictly="true"
                :expand-on-click-node="false"
                @check="checkTree"
                node-key="id"
                :load="loadNode"
                lazy
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
                    <span class="name">{{item.unitName}}</span>
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
                    <span class="name">{{item.unitName}}</span>
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

<script type="text/ecmascript-6">
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
    seletSelf: {
      type: Number,
      default: 1
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
      default: 0
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
    }
  },
  data() {
    return {
      loading: false,
      props: {
        children: "children",
        label: "unitName",
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
      treeData: []
    };
  },
  watch: {
    dialogVisible(val) {
      this.$emit("input", val);
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
        this.nowCheckList = val;
      } else {
        this.nowCheckList = [val];
      }
    }
  },
  computed: {},
  methods: {
    loadNode(node, resolve) {
      this.loading = true;
      if (this.isSearchAll) {
        this.$api.setting.organization
          .getAllOrgOrDept({
            type: this.orgOrDept,
            unitCode: node.data ? node.data.id : this.orgOrDeptId
          })
          .then(res => {
            this.loading = false;
            let data = [];
            res.data.map(item => {
              data.push({
                unitName: item.unitName,
                id: item.unitCode,
                leaf: item.lastUnit,
                deptType: item.deptType,
                isSyn: item.isSyn
              });
            });

            return resolve(data);
          })
          .catch(err => {
            this.loading = false;
          });
      } else {
        this.$api.setting.organization
          .getTree({
            unitClass: this.orgOrDept,
            searchType: this.searchType,
            unitCode: node.data ? node.data.id : this.orgOrDeptId,
            seletSelf: node.data ? node.data.seletSelf : this.seletSelf,

            type: this.type,
            queryType: this.queryType,
            opType: this.opType
          })
          .then(res => {
            this.loading = false;
            let data = [];
            res.data.map(item => {
              data.push({
                unitName: item.unitName,
                id: item.unitCode,
                leaf: item.lastUnit,
                deptType: item.deptType,
                isSyn: item.isSyn
              });
            });
            this.searchType = res.searchType;
            this.$refs.elTree.setCheckedNodes(this.nowCheckList);
            return resolve(data);
          })
          .catch(err => {
            this.loading = false;
          });
      }
    },
    checkTree(now, check, hascheck) {
      if (this.isSingle) {
        this.$refs.elTree.setCheckedKeys([now.id]);
        this.nowCheckList = this.$refs.elTree.getCheckedNodes();
      } else {
        this.nowCheckList = this.$refs.elTree.getCheckedNodes();
        if (!isEmptyObject(this.selectDept)) {
          if (this.selectDept instanceof Array) {
            this.nowCheckList.push(...this.selectDept);
          } else {
            this.nowCheckList.push(this.selectDept);
          }
        }
      }
      console.log("this.nowCheckList", this.nowCheckList);
    },
    checkTree1(now, check, hascheck) {
      if (this.isSingle) {
        this.$refs.elTree1.setCheckedKeys([now.id]);
      }
      this.nowCheckList1 = this.$refs.elTree1.getCheckedNodes();
      for (let i = this.nowCheckList1.length; i > 0; i--) {
        if (this.nowCheckList1[i - 1].p) {
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
      this.$emit("clearList", this.nowCheckList);

      this.$refs.elTree.setCheckedKeys([]);
      this.nowCheckList = [];
    },
    resetCheck1() {
      this.$emit("clearList", this.nowCheckList1);
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
  created() {}
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
  min-width: 300px;

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
