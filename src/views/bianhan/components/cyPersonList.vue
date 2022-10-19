/**
* create by zx on 2020/9/28 14:30
* 类注释：传阅收回列表
* 备注：
*/
<template>
  <div class="cyPersonList">
    <el-dialog
      :title="title"
      v-if="dialogVisible"
      :visible.sync="dialogVisible">
      <el-col :span="12">
        <div class="title">
          <span>{{title}}</span>
        </div>
        <div class="tree_w box_shadow">
          <el-scrollbar>
            <el-checkbox v-model="checkAll" v-if="!isSingle" @change="checkAllChange" style="margin-bottom: 10px">全选
            </el-checkbox>
            <el-tree
              ref="elTree"
              :props="props"
              :data="data"
              show-checkbox
              :check-on-click-node="false"
              :check-strictly="true"
              :expand-on-click-node="false"
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
          >清空
          </el-button>
        </div>
        <div class="box_shadow tree_w">
          <el-scrollbar>
            <div v-for="(item,index) in nowCheckList" :key="index">
              <template>
                <div class="command_wrap">
                  <span class="name">{{item.name}}</span>
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
        name: "cyPersonList",
        components: {},
        props: {
            title: {type: String, default: "标题"},
            value: {
                type: Boolean,
                default() {
                    return false
                }
            },
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            isSingle: {
                type: Boolean,
                default() {
                    return true;
                }
            },
        },
        watch: {
            dialogVisible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.dialogVisible = val
            },
        },
        data() {
            return {
                checkAll: false,
                props: {
                    children: "children",
                    label: "name",
                },
                dialogVisible: false,
                nowCheckList: [],
            }
        },
        computed: {},
        methods: {
            checkAllChange(val) {
                if (val) {
                    let ids = [];
                    this.data.forEach(item => {
                        ids.push(item.id)
                    })
                    this.$refs.elTree.setCheckedKeys(ids);
                    this.nowCheckList = this.$refs.elTree.getCheckedNodes();
                } else {
                    this.$refs.elTree.setCheckedKeys([]);
                    this.nowCheckList = [];
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
                if (this.nowCheckList.length == 0) {
                    this.$message({type: "error", message: "您还没选择"})
                    return
                }
                if (this.isSingle)
                    this.$emit("personList", this.nowCheckList[0])
                else
                    this.$emit("personList", this.nowCheckList)
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
