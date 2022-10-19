/**
* create by zx on 2020/9/8 17:53
* 类注释：
* 备注：
*/
<template>
  <div class="selectOrgOrDept">
    <div @click.prevent.stop="showDialogTree" style="width: 100%" id="orgOrDeptInput">
      <slot></slot>
    </div>
    <div v-if="showTree" class="tree-div" id="tree-div">
      <el-button size="mini" type="primary" style="margin: 0 0 5px 0" @click="sure">确定</el-button>
      <el-scrollbar>
        <el-tree ref="elTree" :props="props" show-checkbox :check-on-click-node="false" :check-strictly="true" @check="checkTree" node-key="id" :load="loadNode" lazy>
        </el-tree>
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
        return true
      },
    },
    //机构或者部门 机构为1，部门为0
    orgOrDept: {
      type: Number || String,
      default: 1,
    },
    //部门或者机构id
    orgOrDeptId: {
      type: String,
      default: '1',
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      selectTitle: {},
      showTree: false,
      loading: false,
      props: {
        children: 'children',
        label: 'unitName',
        isLeaf: 'leaf',
      },
      dialogVisible: false,
      nowCheckList: [],
    }
  },
  watch: {
    showTree(val) {
      if (val) {
        let showWidth = document.getElementById('orgOrDeptInput').offsetWidth
        setTimeout(() => {
          document.getElementById('tree-div').style.width = showWidth + 'px'
        }, 5)
      }
    },
  },
  computed: {},
  methods: {
    showDialogTree() {
      if (!this.disabled) {
        this.showTree = true
      }
    },
    sure() {
      let selectItems = this.$refs.elTree.getCheckedNodes()
      if(selectItems.length == 0){
        this.$message({
          message: "请选择机构",
          type: "warning",
        });
      }else{
        console.log(selectItems, '11111111')
        let ids = []
        let names = []
        selectItems.map((item) => {
          ids.push(item.id)
          names.push(item.unitName)
        })
        this.selectTitle = { id: ids.join(','), unitName: names.join(',') }
        this.showTree = false
        this.$emit('select', this.selectTitle)

      }

    },
    loadNode(node, resolve) {
      this.loading = true
      this.$api.setting.organization
        .getTree({
          unitClass: this.orgOrDept,
          unitCode: node.data ? node.data.id : this.orgOrDeptId,
        })
        .then((res) => {
          console.log(res.data, '2222222222222222')
          this.loading = false
          let data = []
          res.data.map((item) => {
            data.push({ unitName: item.unitName, id: item.unitCode, leaf: item.lastUnit })
          })
          return resolve(data)
        })
        .catch((err) => {
          this.loading = false
        })
    },
    checkTree(now, check, hascheck) {
      if (this.isSingle) {
        this.$refs.elTree.setCheckedKeys([now.id])
      }
      this.nowCheckList = this.$refs.elTree.getCheckedNodes()
    },
    /** @description: 失焦时，关闭下拉树 */
    clickBlur(e) {
      const self = this
      if(self.$el.querySelector('#tree-div') && !self.$el.querySelector('#tree-div').contains(e.target)) {
        self.showTree = false
      }
    }
  },
  activated() {},
  mounted() {
    document.addEventListener('click', this.clickBlur)
  },
  created() {},
  beforeDestroy() {    
    document.removeEventListener('click', this.clickBlur)
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.tree-div {
  border: 1px solid #efefef; 
  padding: 10px;
  border-radius: 5px;
  top: 45px;
  position: absolute;
  /*width: 25%;*/
  height: 250px;
  /* height: 400px; */
  z-index: 2;
  background: #fff;
}

.el-scrollbar {
  height: 100%;
  width: 100%;
}
</style>
