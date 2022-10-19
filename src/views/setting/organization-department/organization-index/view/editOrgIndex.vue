<!--
 * @Author: wy
 * @Date: 2020-06-28 10:27:58
 * @LastEditTime: 2020-07-13 16:16:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\system-manage\organization-department\organization-index\index.vue
-->
<template>
  <div class="editOrgIndex">
    <div class="leftTree">
      <el-tree :props="props" :load="loadNode" lazy show-checkbox></el-tree>
    </div>
    <div class="right">
      <div class="handleButton">
        <el-button type="primary" @click="saveIndexInfo()">保存</el-button>
        <el-button type="primary" @click="delOrgIndexInfo()">删除</el-button>
        <el-button type="primary" @click="reorder()">调整下级结构顺序</el-button>
      </div>
      <div class="orgInfoTable">
        <div class="orgInfoTitle">机构信息表</div>
        <div class="orgInfoTableBody">
          <m-form
            :formCfg="formCfg"
            :formRules="formRules"
            :formData="formData"
            :showButton="false"
            :isInline="false"
            labelWidth="170px"
          ></m-form>
        </div>
      </div>
    </div>
    <!-- 选择上级机构（组织树）弹框 -->
    <el-dialog title="上级机构" :visible.sync="dialogSelectOrg" class="dialogSelectOrg" width="80%">
      <tree-transfer
        :title="title"
        :from_data="fromData"
        :to_data="toData"
        :defaultProps="{label:'label'}"
        @addBtn="add"
        @removeBtn="remove"
        filter
        openAll
      ></tree-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogSelectOrg = false">取 消</el-button>
        <el-button @click="sureSelectOrgTree()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from 'components/form/mForm'
// import treeTransfer from 'el-tree-transfer'
export default {
  name: 'editOrgIndex',
  components: {
    mForm,
    // treeTransfer
  },
  props: {},
  data () {
    return {
      // 左侧树
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      },
      // 右侧表单
      formCfg: [
        {
          label: '机构序号',
          prop: 'memberName',
          type: 'input',
          showAdditionSpan: true,
          additionSpan: '例如：0001',
          additionSpanStyle: {
            color: '#F5150B'
          }
        }, {
          label: '机构全称',
          prop: 'uass',
          type: 'input',
          showAdditionSpan: true,
          additionSpan: '例如：中国建设银行',
          additionSpanStyle: {
            color: '#F5150B'
          }
        }, {
          label: '机构简称',
          prop: 'department',
          type: 'input',
          showAdditionSpan: true,
          additionSpan: '例如：江苏省分行',
          additionSpanStyle: {
            color: '#F5150B'
          }
        },
        {
          label: '机构ID',
          prop: 'memberName',
          type: 'input',
          showAdditionSpan: true,
          additionSpan: 'OA系统内机构ID',
          additionSpanStyle: {
            color: '#F5150B'
          }
        }, {
          label: '机构编码',
          prop: 'roleName',
          type: 'input',
          showAdditionSpan: true,
          additionSpan: '例如：OA系统外机构ID',
          additionSpanStyle: {
            color: '#F5150B'
          }
        }, {
          label: '机构类别',
          prop: 'uass',
          type: 'input'
        }, {
          label: '上级机构（组织树）',
          prop: 'department',
          type: 'input',
          showAdditionButton: true,
          additionButtonLabel: '选择',
          additionButtonhandel: () => {
            this.dialogSelectOrg = true
          }
        },
        {
          label: '上级机构（行政层次）',
          prop: 'memberName',
          type: 'input',
          showAdditionButton: true,
          additionButtonLabel: '选择',
          additionButtonhandel: () => {
            console.log('select')
          },
          showAdditionSpan: true,
          additionSpan: '除总行外，其他机构必选',
          additionSpanStyle: {
            color: '#F5150B'
          }
        }, {
          label: '机构管理员',
          prop: 'roleName',
          type: 'input',
          showAdditionSpan: true,
          additionSpan: '例如：js-admin（多个机构管理员之间用英文模式下的;隔开',
          additionSpanStyle: {
            color: '#F5150B'
          }
        }, {
          label: '说明',
          prop: 'uass',
          type: 'textarea',
          width: '300px',
          showAdditionSpan: true,
          additionSpan: '请在非工作时间修改机构索引表信息！',
          additionSpanStyle: {
            color: '#F5150B'
          }
        }
      ],
      formRules: {
        memberName: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      formData: {
        uass: 1
      },
      // 选择上级机构（组织树）弹框
      dialogSelectOrg: false,
      title: ['候选项', '已选项'],
      fromData: [
        {
          id: '1',
          pid: 0,
          label: '总行',
          children: [
            {
              id: '1-1',
              pid: '1',
              label: '北京分行',
              children: []
            },
            {
              id: '1-2',
              pid: '1',
              label: '内蒙古分行',
              children: [
                {
                  id: '1-2-1',
                  pid: '1-2',
                  children: [],
                  label: '乌兰察布市分行'
                },
                {
                  id: '1-2-2',
                  pid: '1-2',
                  children: [],
                  label: '呼和浩特市分行'
                }
              ]
            }
          ]
        }
      ],
      toData: []
    }
  },
  computed: {},
  methods: {
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    // 左侧树懒加载
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ label: '中国建设银行' }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const leftTreeData = [{
          label: '总行',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]

        }, {
          label: '北京分行',
          leaf: true
        }]

        resolve(leftTreeData)
      }, 500)
    },
    // 保存
    saveIndexInfo () {
      this.$router.push('/setting/orgDepartment/orgIndex/orgIndexView')
    },
    // 删除
    delOrgIndexInfo () { },
    // 调整下级结构顺序
    reorder () {
      this.$router.push('/setting/orgDepartment/orgIndex/reorderOrg')
    },
    // 监听穿梭框组件添加
    add (fromData, toData, obj) {
      // 返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    },
    // 监听穿梭框组件移除
    remove (fromData, toData, obj) {
      // 返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    },
    // 选择上级机构（组织树）,确定
    sureSelectOrgTree () {
      console.log('hhhhhhhhhhhhhhhhhhhhhhh', this.toData)
    }
  },
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.editOrgIndex {
  display: flex;
  .leftTree {
    width: 28%;
  }
  .leftTree > div {
    background: #f0f0f0;
    height: 560px;
  }
  .right {
    margin-left: 20px;
    height: 560px;
    overflow: auto;
    .orgInfoTable {
      padding: 0px 20px;
      .orgInfoTitle {
        margin-bottom: 25px;
        font-size: 20px;
        line-height: 45px;
        color: #ff0502;
        font-weight: 600;
        text-align: center;
        border-bottom: 2px solid #ff0502;
      }
      .orgInfoTableBody {
        margin-left: -2%;
      }
    }
  }
}
</style>
