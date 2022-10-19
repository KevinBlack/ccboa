/**
* create by lxx on 2021/2/1 09:41
* 类注释：行领导树
* 备注：
*/

<template>
  <div class="leaderTree">
    <el-dialog
      :title="title"
      v-dialogDrag
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      v-loading="loading"
      @close="closeDialog"
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
                :data="leaderTree"
                :props="props"
                show-checkbox
                :check-on-click-node="false"
                :check-strictly="false"
                :expand-on-click-node="false"
                :default-checked-keys="checkIds"
                default-expand-all
                @check="checkTree"
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
      <div slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="sureBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "leaderTree",
  components: {},
  props: {
    title: { type: String, default: "标题" },
    dialogType: { type: String, default: "" },
    dialogVisible: {
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
    checkData: {
      type: Array,
      default() {
        return [];
      }
    },
    checkIds: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data() {
    return {
      loading: false,
      props: {
        children: "children",
        label: "name",
        isLeaf: "leaf"
      },
      leaderTree:[],
      nowCheckList: [],
    };
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.resetCheck();
      }else{
        this.loadData();
      }
    },
  },
  computed: {},
  methods: {
    closeDialog(){
      this.dialogVisible=false;
      this.$emit("closed",this.dialogVisible);
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
    checkTree(now, check, hascheck) {
      if (this.isSingle) {
        this.$refs.elTree.setCheckedKeys([now.id]);
        this.nowCheckList = this.$refs.elTree.getCheckedNodes();
      } else {
        this.nowCheckList = this.$refs.elTree.getCheckedNodes();
        if(this.nowCheckList && this.nowCheckList.length>0){
          this.nowCheckList =this.nowCheckList.filter(function(item){
          return item.TYPE=='user'
        })
        }
        // if (!isEmptyObject(this.nowCheckList)) {
        //   if (this.nowCheckList instanceof Array) {
        //     this.nowCheckList.push(...now.unitShort);
        //   } else {
        //     this.nowCheckList.push(this.nowCheckList);
        //   }
        // }
      }
    },

    deleteRow(index) {
      this.$refs.elTree.setChecked(this.nowCheckList[index], false);
      this.nowCheckList.splice(index, 1);
    },
    resetCheck() {
      this.$refs.elTree.setCheckedKeys([]);
      this.nowCheckList = [];
      this.checkIds= [];
    },
    concatData(data){
      data.map((node)=>{
        let childs = [].concat(node.children);
        let hasChild = childs.length;
        node.id = node.unitCode;
         node.name = node.unitShort;
        if(node.jsonUser&&node.jsonUser.length){
          node.jsonUser.map((item)=>{
            item.id = item.unitCode;
             item.name = item.unitShort;
          })
           node.children = [].concat(node.jsonUser,node.children);
        }
        if(hasChild){
          this.concatData(childs);
        }else{
          node.jsonUser.map((item)=>{
            item.id = item.unitCode;
            item.name = item.unitShort;
          })
          node.children = node.jsonUser;
        }

      });
      return data;
    },
    loadData() {
      this.loading=true;
      this.$post
        .postData(
          "getPeople",
          JSON.stringify({
            function: "getPeople",
            unitId: JSON.parse(localStorage.getItem("userInfo")).unitId
          }),
          this.$businessCode.hysyd
        )
        .then(res => {
          this.loading=false;
          this.leaderTree = this.concatData(res.data||[]);
          this.nowCheckList=this.checkData;
        })
        .catch(err => {
          this.loading=false;
          this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "网络错误",
              duration: 2000
            });
        });
    },
    sureBtn(){
      if (this.isSingle) {
        this.$emit("visible",this.nowCheckList[0],true,this.dialogType);
      } else {
        this.$emit("visible",this.nowCheckList,true,this.dialogType);
      }
    },
  },
  activated() {},
  mounted() {
  },
  created() {

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
