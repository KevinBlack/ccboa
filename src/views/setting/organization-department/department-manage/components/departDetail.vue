<!--
 * @Author: wy
 * @Date: 2020-07-01 16:21:39
 * @LastEditTime: 2020-08-20 16:42:19
 * @LastEditors: Please set LastEditors
 * @Description:查看部门详情
 * @FilePath: \ccboa\src\views\setting\organization-department\department-manage\components\depManageViewDetail.vue
-->
<template>
  <div class="departDetail">
    <div class="rightTab">
      <div class="handleButton">
        <el-button type="primary" @click="handelIndexInfo()">保存</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
      <div class="orgInfoTable">
        <div class="orgInfoTitle">部门信息表</div>
        <div class="orgInfoTableBody">
          <el-row :gutter="5" v-for="(item,index) in depDetail" :key="index">
            <el-col :span="8">
              <div class="grid-content bg-purple normalFont">
                {{item.label}}
                <span style="color:red" v-if="item.isImpot||false">*</span>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple-light normalFont">{{depDetailData[item.props]}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'departDetail',
  components: {
  },
  props: {},
  data () {
    return {
      // 机构索引信息
      depDetailData: {},
      depDetail: [
        {
          label: '部门序号',
          prop: 'orderBy',
          isImpot: true
        },
        {
          label: '部门名称',
          prop: 'unitName',
          isImpot: true
        },
        {
          label: '部门简称',
          prop: 'unitShort',
          isImpot: true
        },
        {
          label: '部门层次（级别）',
          prop: 'unitLevel',
          isImpot: true
        },
        {
          label: '直属上级组织',
          prop: 'unitPname',
          isImpot: true
        },
        {
          label: '部门代字',
          prop: 'unitHeader',
          isImpot: true
        },
        {
          label: '部门类别',
          prop: 'unitTypeName',
          isImpot: true
        }, {
          label: '是否为内设部门',
          prop: 'ifInner'
        }, {
          label: '部门成员',
          prop: 'userNames'
        }, {
          label: '部门正职',
          prop: 'deptHeadName'
        },
        {
          label: '部门副职',
          prop: 'deptDeputyName'
        }, {
          label: '部门综合代表',
          prop: 'deptMultipleName'
        }
      ]
    }
  },
  computed: {},
  methods: {
    // 编辑
    handelIndexInfo () {
      this.$router.push({
        name: 'depManageConfig'
      })
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
.departDetail {
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
