<!--
 * @Author: wy
 * @Date: 2020-06-28 10:27:58
 * @LastEditTime: 2020-08-29 17:08:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\system-manage\organization-department\organization-index\index.vue
-->
<template>
  <div class="orgIndexView">
    <div class="leftTree" v-if="isShowTree">
      <el-tree :props="props" :load="loadNode" lazy show-checkbox></el-tree>
    </div>
    <div class="rightTab">
      <div class="handleButton">
        <el-button type="primary" @click="handelIndexInfo()">编辑</el-button>
        <el-button type="primary" @click="delIndexInfo()">删除</el-button>
        <el-button type="primary" @click="reorder()">调整下级结构顺序</el-button>
      </div>
      <div class="orgInfoTable">
        <div class="orgInfoTitle">机构信息表</div>
        <div class="orgInfoTableBody">
          <el-row :gutter="5" v-for="(item,index) in orgIndex" :key="index">
            <el-col :span="12">
              <div class="grid-content bg-purple normalFont">
                {{item.label}}
                <span style="color:red" v-if="item.isImpot||false">*</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item.props]}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'orgIndexView',
  components: {
  },
  props: {},
  data () {
    return {
      // 是否显示左侧树
      isShowTree: true,
      // 左侧树
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      },
      // 机构索引信息
      orgIndexData: {},
      orgIndex: [
        {
          label: '机构序号',
          prop: 'memberName',
          isImpot: true
        }, {
          label: '机构全称',
          prop: 'uass',
          isImpot: true
        }, {
          label: '机构简称',
          prop: 'department',
          isImpot: true
        },
        {
          label: '机构ID',
          prop: 'memberName',
          isImpot: true
        }, {
          label: '机构编码',
          prop: 'roleName'
        }, {
          label: '机构类别',
          prop: 'uass'
        }, {
          label: '上级机构（组织树）',
          prop: 'department'
        },
        {
          label: '上级机构（行政层次）',
          prop: 'memberName'
        }, {
          label: '机构管理员',
          prop: 'roleName'
        }
      ]
    }
  },
  computed: {},
  methods: {
    // 左侧树懒加载
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ label: '中国建设银行' }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const data = [{
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

        resolve(data)
      }, 500)
    },
    // 编辑
    handelIndexInfo () {
      this.$router.push('/setting/orgDepartment/orgIndex/editOrgIndex')
    },
    // 删除
    delIndexInfo () { },
    // 调整下级结构顺序
    reorder () {
      this.$router.push('/setting/orgDepartment/orgIndex/reorderOrg')
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
.orgIndexView {
  // display: flex;
  .leftTree {
    width: 28%;
    float: left;
  }
  .leftTree > div {
    background: #f0f0f0;
    height: 560px;
  }
  .rightTab {
    padding-left: 15px;
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
        .el-row {
          margin-bottom: 3px;
          .el-row:last-child {
            margin-bottom: 0;
          }
        }
        .el-col {
          border-radius: 4px;
        }
        .bg-purple-dark {
          background: #d8e8f4;
        }
        .bg-purple {
          background: #e5f0fc;
        }
        .bg-purple-light {
          background: #e5f0fc;
        }
        .grid-content {
          border-radius: 4px;
          min-height: 36px;
        }
        .row-bg {
          padding: 10px 0;
          background-color: #f9fafc;
        }
        .titleFont {
          font-size: 17px;
          text-align: center;
          line-height: 43px;
          font-weight: 600;
        }
        .normalFont {
          padding-left: 34px;
          font-size: 14px;
          text-align: left;
          line-height: 36px;
        }
      }
    }
  }
}
</style>
