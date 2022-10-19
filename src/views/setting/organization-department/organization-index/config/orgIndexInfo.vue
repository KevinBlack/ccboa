<template>
  <div class="orgIndexView">
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
  name: 'orgIndexInfo',
  components: {
  },
  props: {},
  data () {
    return {
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
    // 编辑
    handelIndexInfo () {
      this.$router.push('/setting/orgDepartment/orgIndex/orgIndexConfig')
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
  .rightTab {
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
