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
                    <span class="name" :title="item.unitName">{{item.unitName}}</span> 
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
                    <span class="name" :title="item.unitName" style="max-width:76% !important">{{item.unitName}}</span>
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
            seletSelf:{
                type:Number,
                default () {
                    return 0
                }
            }
        },
        data() {
            return {
                checkAll: false,
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
                treeData: [],
                treeDateStore:[]//存储首次懒加载数据
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
            checkAllChange(val) {
                if (val) {
                    let ids = [];
                    let self=this;
                    this.treeDateStore.forEach(item => {
                        ids.push(item.unitCode);
                    });
                    this.$refs.elTree.setCheckedKeys(ids);
                    this.nowCheckList = this.$refs.elTree.getCheckedNodes();
                } else {
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
                            if(node.level==0){
                                this.treeDateStore=res.data;
                            }
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
                            type: this.type,
                            queryType: this.queryType,
                            opType: this.opType,
                            seletSelf: node.data ? node.data.seletSelf : this.seletSelf,
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
                                    isSyn: item.isSyn,
                                    unitClass: item.unitClass //0:部门 1：机构 在信息刊物发布信息使用
                                });
                            });
                            if(node.level==0){
                                this.treeDateStore=res.data;
                            }
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
                  let arr=[]
                  let tempArr=[]
                  arr = this.$refs.elTree.getCheckedNodes();
                  if (!isEmptyObject(this.selectDept)) {
                    if (this.selectDept instanceof Array) {
                      arr.push(...this.selectDept);
                    } else {
                      arr.push(this.selectDept);
                    }
                  }
                  // this.nowCheckList=arr.filter(item=>{
                  //   if(!tempArr.includes(item.id)){
                  //     tempArr.push(item.id);
                  //     return item;
                  //   }
                  // });
                  var arr1 = []
                  arr1.push(now)
                  arr1.forEach((e,index) => {
                    if(this.nowCheckList.indexOf(e) == -1){
                      this.nowCheckList.push(e)
                    }else{
                      this.nowCheckList.splice(this.nowCheckList.indexOf(e), 1)
                    }
                  })
                }
                console.log("this.nowCheckList", this.nowCheckList);
            },
            checkTree1(now, check, hascheck) {
                if (this.isSingle) {
                    this.$refs.elTree1.setCheckedKeys([now.id]);
                }
                var arr = []
                var arr1 = []
                if(now.p){
                  // if(this.nowCheckList1.length > 0){
                  //   arr1 = this.$refs.elTree1.getCheckedNodes();
                  //   arr1.forEach((e,index) => {
                  //     if(this.nowCheckList1.indexOf(e) == -1 && !e.p){
                  //       this.nowCheckList1.push(e)
                  //     }else{
                  //       check.checkedNodes.forEach((el,indexs) => {
                  //         if(el.p){
                  //           check.checkedNodes.splice(check.checkedNodes.indexOf(el), 1)
                  //         }
                  //       })
                  //       if(check.checkedNodes.length < this.nowCheckList1.length){
                  //         this.nowCheckList1.splice(this.nowCheckList1.indexOf(e), 1)
                  //       }
                  //     }
                  //   })
                  // }else{
                    this.nowCheckList1 = this.$refs.elTree1.getCheckedNodes();
                    for (let i = this.nowCheckList1.length; i > 0; i--) {
                      if (this.nowCheckList1[i - 1].p) {
                          this.nowCheckList1.splice(i - 1, 1);
                      }
                    }
                  // }
                }else{
                  arr.push(now)
                  arr.forEach((e,index) => {
                    if(this.nowCheckList1.indexOf(e) == -1 && !e.p){
                      this.nowCheckList1.push(e)
                    }else{
                      this.nowCheckList1.splice(this.nowCheckList1.indexOf(e), 1)
                    }
                  })
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
    min-width: 280px;

    .one_btn {
      // width: 240px;
      height: 42px;
      line-height: 42px;
       margin-right: 10px;
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
