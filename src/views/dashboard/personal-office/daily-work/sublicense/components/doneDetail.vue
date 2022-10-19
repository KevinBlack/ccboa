<!--
 * @Author: your name
 * @Date: 2020-07-16 17:40:49
 * @LastEditTime: 2020-07-17 09:37:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\sublicense\components\doneDetail.vue
--> 
<template>
  <div class="doneDetail">
    <div class="handleButton">
      <el-button type="primary" @click="$router.go(-1)">关闭</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">中国建设银行转授权登记</div>
      <div>
        <el-row :gutter="5" v-for="(item,index) in orgIndex" :key="index">
          <el-col :span="8">
            <div class="grid-content bg-purple normalFont itemLabel">{{item.label}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item.props]}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'doneDetail',
  components: {
  },
  props: {},
  data () {
    return {
      orgIndexData: {},
      orgIndex: [
        {
          label: '授权模块',
          prop: 'memberName'
        },
        {
          label: '登记人',
          prop: 'roleName'
        },
        {
          label: '登记部门',
          prop: 'uass'
        },
        {
          label: '授权人',
          prop: 'department'
        },
        {
          label: '授权部门',
          prop: 'memberName'
        },
        {
          label: '被授权人',
          prop: 'roleName'
        },
        {
          label: '被授权人部门',
          prop: 'uass'
        },
        {
          label: '登记日期',
          prop: 'department'
        },
        {
          label: '转授权开始时间',
          prop: 'department'
        },
        {
          label: '转授权结束时间',
          prop: 'department'
        },
        {
          label: '转授权原因',
          prop: 'department'
        },
        {
          label: '转授权状态',
          prop: 'department'
        },
        {
          label: '备注',
          prop: 'department'
        }
      ],
    }
  },
  computed: {},
  methods: {

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
.doneDetail {
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 35px;
      font-size: 30px;
      line-height: 55px;
      color: #3b85f0;
      font-weight: 600;
      text-align: center;
    }
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
    .itemLabel {
      color: #3b85f0;
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
</style>
