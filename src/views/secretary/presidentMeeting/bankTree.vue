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
          >清空
          </el-button>
        </div>
        <div class="box_shadow tree_w">
          <el-scrollbar>
            <div v-for="(item,index) in nowCheckList" :key="index">
              <template>
                <div class="command_wrap">
                  <span class="name">{{item.unitName}}</span>
                  <div class="one_btn">
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
            title: {type: String, default: "标题"},
            value: {
                type: Boolean,
                default() {
                    return false
                }
            },
            isSingle: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            //是否查询全部
            isSearchAll: {
                type: Boolean,
                default() {
                    return false
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
            queryType:{
                type:String,
                default:""
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
                dialogVisible: false,
                nowCheckList: [],
            }
        },
        watch: {
            dialogVisible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.dialogVisible = val
            },
        },
        computed: {},
        methods: {
            loadNode(node, resolve) {
                this.loading = true
                if (this.isSearchAll) {
                    this.$api.setting.organization.getAllOrgOrDept({
                        type: this.orgOrDept,
                        unitCode: node.data ? node.data.id : this.orgOrDeptId,
                    }).then((res) => {
                        this.loading = false
                        let data = []
                        res.data.map(item => {
                            data.push({unitName: item.unitName, id: item.unitCode, leaf: item.lastUnit})
                        })
                        return resolve(data);
                    }).catch(err => {
                        this.loading = false
                    });
                    // 换的是这里的接口
                } else {
                    this.$api.setting.organization.getTree({
                        unitClass: this.orgOrDept,
                        unitCode: node.data ? node.data.id : this.orgOrDeptId,
                        type: this.type,
                        queryType:this.queryType
                    }).then((res) => {
                        this.loading = false
                        let data = []
                        res.data.map(item => {
                            data.push({unitName: item.unitName, id: item.unitCode, leaf: item.lastUnit})
                        })
                        return resolve(data);
                    }).catch(err => {
                        this.loading = false
                    });
                }

            },
            checkTree(now, check, hascheck) {
                if (this.isSingle) {
                    this.$refs.elTree.setCheckedKeys([now.id]);
                }
                this.nowCheckList = this.$refs.elTree.getCheckedNodes();
            },
            deleteRow(index) {
                this.$refs.elTree.setChecked(this.nowCheckList[index], false);
                this.nowCheckList.splice(index, 1);
            },
            resetCheck() {
                this.$refs.elTree.setCheckedKeys([]);
                this.nowCheckList = [];
            },
            sure() {
                if (this.isSingle)
                    this.$emit("orgList", this.nowCheckList[0])
                else
                    this.$emit("orgList", this.nowCheckList)
                this.resetCheck()
                this.dialogVisible = false
            },
        },
        activated() {
        },
        mounted() {
        },
        created() {
        }
    }
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
