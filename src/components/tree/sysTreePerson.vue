<template>
  <div class="orgTree">
    <el-dialog
      :title="title"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      v-loading="loading"
    >
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
              :check-on-click-node="false"
              :check-strictly="true"
              :expand-on-click-node="false"
              @check="checkTree"
              node-key="deptHumanId"
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
                  <span class="name">{{item.perName}}</span>
                  <div class="one_btn">
                    <!-- <el-button
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
                    >下移</el-button>-->
                    <el-button type="warning" size="mini" @click.native="deleteRow(index)" round>删除</el-button>
                  </div>
                </div>
              </template>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
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
    humanType: {
      type: Number,
      default: 1,
    },
    unitClass: {
      type: Number,
      default: 2,
    },
    seletSelf: {
      type: Number,
      default: 1,
    },
    unitCode: {
      type: String,
      default: "",
    },
    isNeedChild: {
      type: String,
      default: "yes",
    },

    title: { type: String, default: "选择人员" },
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
    //
    seletSelf: {
      type: Number,
      default() {
        return 0;
      },
    },
    isSingle: {
      type: Boolean,
      default() {
        return true;
      },
    },
    selectDept: {
      type: Array || Object,
      default() {
        return [];
      },
    },
    //是否查询全部
    isSearchAll: {
      type: Boolean,
      default() {
        return false;
      },
    },
    //机构或者部门 机构为1，部门为0
    orgOrDept: {
      type: Number,
      default: 0,
    },
    //部门或者机构id
    orgOrDeptId: {
      type: String,
      default: JSON.parse(localStorage.getItem("userInfo")).unitId,
    },
    //type为all时，拉取一级部门与机构 ,""拉取只拉去部门或者机构
    type: {
      type: String,
      default: "",
    },
    //条件查询机构级别    up:上级   low:下级  peer:同级 ''其他
    queryType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      props: {
        children: "children",
        label: "perName",
        isLeaf: "leaf",
      },
      dialogVisible: false,
      nowCheckList: [],
    };
  },
  watch: {
    selectDept(val) {
      if (val instanceof Array) {
        this.$nextTick(() => {
          this.nowCheckList = val;
          console.log("---------val----->", val);
          // this.$set(this,'nowCheckListval',val)
        });
      } else {
        this.$nextTick(() => {
          this.nowCheckList = [val];
        });
      }
    },
    dialogVisible(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.dialogVisible = val;
    },
  },
  computed: {},
  methods: {
    //上移
    upRow(index) {
      if (index == 0) {
        this.$message({
          type: "warning",
          message: "此项已经是第一项",
        });
      } else {
        let currCode = deepClone(this.nowCheckList[index]);
        this.nowCheckList.splice(index, 1);
        this.nowCheckList.splice(index - 1, 0, currCode);
      }
    },
    downRow(index) {
      let treeCodeLength = this.nowCheckList.length;
      if (index == treeCodeLength - 1) {
        this.$message({
          type: "warning",
          message: "此项已经是最后一项",
        });
      } else {
        let currCode = deepClone(this.nowCheckList[index]);
        this.nowCheckList.splice(index, 1);
        this.nowCheckList.splice(index + 1, 0, currCode);
      }
    },
    loadNode(node, resolve) {
      this.loading = true;
      if (this.isSearchAll) {
      } else {
        this.$api.setting.organization
          .getOrgPerson({
            humanType: this.humanType,
            seletSelf: node.data ? node.data.seletSelf : this.seletSelf,
            unitClass: this.unitClass,
            unitCode: node.data ? node.data.id : this.unitCode,
            validFlag: 1,
            isNeedChild: this.isNeedChild, //
          })
          .then((res) => {
            this.loading = false;
            let data = [];
            res.data.map((item) => {
              if (!item.deptHumanId) {
                item.disabled = true;
              } else {
                item.disabled = false;
              }
              // 返显的数据禁止勾选
              this.selectDept.map((item1) => {
                if (item1.deptHumanId == item.deptHumanId) {
                  item.disabled = true;
                }
              });
              data.push({
                deptHumanAccount: item.deptHumanAccount,
                perName: item.deptHumanName || item.unitName,
                deptHumanCode: item.deptHumanCode,
                deptHumanName: item.deptHumanName,
                unitName: item.unitName,
                id: item.unitCode,
                leaf: item.lastUnit,
                unitClass: item.unitClass,
                deptHumanId: item.deptHumanId,
                telMobile: item.telMobile ? item.telMobile : "",
                disabled: item.disabled,
              });
            });
            return resolve(data);
          })
          .catch((err) => {
            this.loading = false;
          });
      }
    },
    checkTree(now, check, hascheck) {
      console.log(11111111, check, hascheck);
      let nowNode = now;
      if (!nowNode.leaf) {
        nowNode.disable = true;
        console.log("-------nowNode--------->", nowNode);
        return;
      } else {
        nowNode.disable = true;
        console.log("----4444444---nowNode--------->", nowNode, this.isSingle);
        if (this.isSingle) {
          // this.$refs.elTree.setCheckedKeys([now.id]);
          // this.nowCheckList = this.$refs.elTree.getCheckedNodes();

          this.$nextTick(() => {
            this.$refs.elTree.setCheckedKeys([]);
            this.nowCheckList = [];
            this.$refs.elTree.setCheckedKeys([now.deptHumanId]);
            this.nowCheckList.push(nowNode);
          });
        } else {
          this.nowCheckList = this.$refs.elTree.getCheckedNodes();
          if (!isEmptyObject(this.selectDept)) {
            if (this.selectDept instanceof Array) {
              // this.nowCheckList.push(...this.selectDept);
              this.$nextTick(() => {
                this.nowCheckList.push(...this.selectDept);
              });
            } else {
              // this.nowCheckList.push(this.selectDept);
              this.$nextTick(() => {
                this.nowCheckList.push(this.selectDept);
              });
            }
          }
        }
      }
    },
    deleteRow(index) {
      this.$nextTick(() => {
        this.$refs.elTree.setChecked(this.nowCheckList[index], false);
        this.nowCheckList.splice(index, 1);
      });
      // this.$refs.elTree.setChecked(this.nowCheckList[index], false);
      // this.nowCheckList.splice(index, 1);
    },
    resetCheck() {
      this.$refs.elTree.setCheckedKeys([]);
      this.nowCheckList = [];
    },
    sure() {
      this.$emit("orgList", this.nowCheckList);
      this.resetCheck();
      this.dialogVisible = false;
    },
  },
  activated() {},
  mounted() {},
  created() {},
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
/deep/ .el-tree-node {
  .is-leaf + .el-checkbox .el-checkbox__inner {
    display: inline-block !important;
  }
  .el-checkbox .el-checkbox__inner {
    display: none !important;
  }
}
</style>
