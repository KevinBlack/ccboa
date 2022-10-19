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
        <!-- <el-tree ref="elTree" :props="props" show-checkbox :check-on-click-node="false" :check-strictly="true" @check="checkTree" node-key="id" :load="loadNode" lazy>
        </el-tree> -->
        <el-tree ref="elTree" :props="props" show-checkbox :data="publishLimitData" :check-on-click-node="false" :default-checked-keys="defaultCheckedKeys" node-key="id"  @check="checkTree"
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
        return false
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
    defaultData: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectTitle: {},
      showTree: false,
      loading: false,
      props: {
        children: "children",
        label: "label",
      },
      dialogVisible: false,
      nowCheckList: [],
      publishLimitData: [],
      defaultCheckedKeys: []
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
    }
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
          names.push(item.name)
        })
        this.selectTitle = { id: ids.join(','), unitName: names.join(','), type: 2 }
        this.showTree = false
        this.$emit('select', this.selectTitle)

      }

    },
    loadNode() {
      this.loading = true
      this.$api.duty
        .getPublishLimitData({
          unitClass: this.orgOrDept,
          unitCode: JSON.parse(localStorage.getItem('userInfo')).unitId
        })
        .then((res) => {
          console.log(res, "打印发布范围");
          var publishLimitData = []
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
              publishLimitData[index] = item
            }
          })
          this.publishLimitData = publishLimitData
          var nameList = []
          if(this.defaultData === '全部') {
            this.publishLimitData.forEach(i => {
              this.defaultCheckedKeys.push(i.id)
              nameList.push(i.name)
              if(i.children){
                i.children.forEach(items => {
                  this.defaultCheckedKeys.push(items.id)
                  nameList.push(items.name)
                })
              }
            })
            this.selectTitle = { id: this.defaultCheckedKeys.join(','), unitName: nameList.join(','), type: 1 }
            this.$emit('select', this.selectTitle)
          }
        });
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
  created() {
    this.loadNode()
  },
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
  height: calc(100% - 40px);
  width: 100%;
}

</style>
