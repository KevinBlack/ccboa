<template>
  <div class="orgTree">
    <el-dialog
      :title="title"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      v-loading="loading"
    >
      <div>
        <div class="title">下一处理环节</div>
        <el-select
          @change="getNodeInfo"
          :disabled="seletOptionsData.length==0"
          class="selectlist"
          v-model="nextNodeId"
          placeholder='请选择下一处理环节节点'
        >
          <el-option
            v-for="item in seletOptionsData"
            :key="item.PCSAVYID"
            :label="item.AVYNODENM"
            :value="item.PCSAVYID"
          ></el-option>
        </el-select>
      </div>
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
              node-key="depHumanId"
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
            //环节节点
            seletOptionsData:{
                type:Array,
                default: () => {
                    return [];
                },
            },
            humanType: {
                type: Number,
                default: 3,
            },
            unitClass: {
                type: Number,
                default: 0,
            },
            seletSelf: {
                type: Number,
                default: 1,
            },
            unitCode: {
                type: String,
                default: "",
            },
            title: { type: String, default: "选择人员" },
            value: {
                type: Boolean,
                default() {
                    return false;
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
                nextNodeId:'',//环节节点
                nextNode:{
                    id:'',
                    name:''
                },
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
            //筛选节点
            getNodeInfo(){
                let that=this
                this.seletOptionsData&&this.seletOptionsData.map(item=>{
                    if(this.nextNodeId===item.PCSAVYID){
                        that.nextNode.id=item.PCSAVYID
                        that.nextNode.name=item.AVYNODENM
                        // that.nextNode.id=this.seletOptionsData[0].PCSAVYID
                        // that.nextNode.name=this.seletOptionsData[0].AVYNODENM
                    }
                })

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
                            unitCode: node.data ? node.data.id : this.orgOrDeptId,
                            validFlag: 1,
                        })
                        .then((res) => {
                          console.log('res',res)
                            this.loading = false;
                            let data = [];
                            res.data.map((item, index) => {
                                if (!item.deptHumanId) {
                                    item.disabled = true;
                                }
                                data.push({
                                    deptHumanAccount: item.deptHumanAccount,
                                    perName: item.deptHumanName || item.unitName,
                                    deptHumanCode: item.deptHumanCode,
                                    deptHumanName: item.deptHumanName,
                                    unitName: item.unitName,
                                    id: item.unitCode,
                                    leaf: item.lastUnit,
                                    unitClass: item.unitClass,
                                    depHumanId: item.deptHumanId,
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
                let nowNode = now;
                if (!nowNode.leaf) {
                    nowNode.disable = true;
                    return;
                } else {
                    nowNode.disable = true;
                    if (this.isSingle) {
                        this.$refs.elTree.setCheckedKeys([now.depHumanId]);
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
                }
            },
            deleteRow(index) {
                this.$refs.elTree.setChecked(this.nowCheckList[index], false);
                this.nowCheckList.splice(index, 1);
            },
            resetCheck() {
                this.$emit("clearList", this.nowCheckList);
                this.$refs.elTree.setCheckedKeys([]);
                this.nowCheckList = [];
            },
            sure() {
              if (this.nextNodeId) {
                this.nowCheckList[0].id=this.nowCheckList[0].depHumanId+'#'+this.nowCheckList[0].id
                this.nowCheckList[0].name=this.nowCheckList[0].unitName
                this.nowCheckList[0].idStr=this.nowCheckList[0].depHumanId
                //this.nowCheckList是选择的人员信息，true是状态，this.nextNode是选择的节点信息；其余参数为了占位，达到和完成并发送组件参数一致
                this.$emit("showCompDialog", this.nowCheckList,true,1,this.nextNode,1);
                this.resetCheck();
                this.dialogVisible = false;
              } else {
                this.$message({
                  message: "请选择处理环节节点",
                  type: "warning"
                })
              }
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
      width: 280px;
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
  .selectlist {
    width: 100%;
    padding: 20px 0;
  }
</style>
