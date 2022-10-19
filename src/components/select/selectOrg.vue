<!--
 * @Author: zj
 * @Date: 2020-11-18 16:40:32
 * @LastEditTime: 2020-11-19 17:21:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\components\select\selectOrg.vue
--> 

<template>
  <div class="selectOrgOrDept">
    <div @click.prevent.stop="showDialogTree" style="width: 100%" id="orgOrDeptInput">
      <slot></slot>
    </div>
    <div v-if="showTree" class="tree-div" id="tree-div">
      <el-button size="mini" type="primary" style="margin: 0 0 5px 0" @click="sure">确定</el-button>
      <el-scrollbar>
        <el-tree
          ref="elTree"
          :props="props"
          :show-checkbox="true"
          check-on-click-node
          :check-strictly="true"
          @check="checkTree"
          node-key="id"
          :load="loadNode"
          lazy
        ></el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {
    isSingle: {
      type: Boolean,
      default() {
        return true;
      },
    },

    //机构或者部门 机构为1，部门为0
    orgOrDept: {
      type: Number || String,
      default: 0,
    },
    //部门或者机构id
    orgOrDeptId: {
      type: String,
      default: JSON.parse(localStorage.getItem("userInfo")).currUnitId,
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      postList: "336",
      selectTitle: {},
      showTree: false,
      loading: false,
      props: {
        children: "children",
        label: "unitName",
        isLeaf: "leaf",
      },
      dialogVisible: false,
      nowCheckList: [],
    };
  },
  watch: {
    
  },
  computed: {},
  methods: {
    showDialogTree() {
      if (!this.disabled) {
        this.showTree = true;
      }
    },
    sure() {
      let selectItems = this.$refs.elTree.getCheckedNodes();
      let ids = [];
      let names = [];
      let depNames = [];
      selectItems.map((item) => {
        ids.push(item.humanId);
        names.push(item.unitName);
      });
      this.selectTitle = { id: ids.join(","), unitName: names.join(",")};
      this.showTree = false;
      this.$emit("select", this.selectTitle);
    },
    loadNode(node, resolve) {
      console.log(node, '2222222',)
      this.loading = true;
      

      this.$api.sealManage.personLogin
        .getPersonList({
          //   postList: "336",
          postList: '318',
          unitClass: this.orgOrDept,
          unitCode: node.data ? node.data.id : this.orgOrDeptId,
        })
        .then((res) => {
          console.log(res, '1111111', node)
          this.loading = false;
          let data = [];
          res.data.map((item) => {
            data.push({
              unitName: item.deptHumanName || item.unitName,
              id: item.deptHumanId || item.unitCode,
              leaf: !!item.deptHumanId || item.lastUnit,
              humanId: item.deptHumanId 
            });
          });
          
          return resolve(data);
          
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    checkTree(now, check, hascheck) {
      console.log(now, '333333333')
      if (this.isSingle) {
        if(now.humanId == null){
          this.$refs.elTree.setCheckedKeys([]);
        }else{
          this.$refs.elTree.setCheckedKeys([now.id]);
        }
      }
      this.nowCheckList = this.$refs.elTree.getCheckedNodes();
    },
  },
  activated() {},
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("click", (e) => {
        if (e.target.className != "selectOrgOrDept") {
          this.showTree = false;
        }
      });
    });
  },
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.tree-div {
  border: 1px solid #efefef;
  padding: 10px;
  border-radius: 5px;
  top: 45px;
  position: absolute;
  /*width: 25%;*/
  height: 400px;
  z-index: 2;
  background: #fff;
}

.el-scrollbar {
  height: 100%;
  width: 100%;
}
</style>
