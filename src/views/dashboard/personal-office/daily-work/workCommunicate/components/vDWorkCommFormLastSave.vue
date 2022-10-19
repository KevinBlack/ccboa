<!--
 * @Author: wy
 * @Date: 2020-07-17 16:58:12
 * @LastEditTime: 2021-02-26 18:10:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\components\1.vue
--> 
<template>
  <div class="vDWorkCommFormLastSave">
    <div class="handleButton">
      <el-button type="primary" @click="$router.go(-1)">关闭</el-button>
      <el-button type="primary" @click="edit()">编辑</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">工作交流单</div>
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
    </div>'
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'vDWorkCommFormLastSave',
  components: {
  },
  props: {},
  data () {
    return {
      orgIndexData: {},
      orgIndex: [
        {
          label: '主题',
          prop: 'memberName'
        },
        {
          label: '内容',
          prop: 'roleName'
        },
        {
          label: '回复信息',
          prop: 'memberName'
        }
      ]
    }
  },
  computed: {},
  methods: {
    //编辑
    edit () {
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/vDWorkCommForm'
      })
    }
  },
  activated () {
  },
  mounted () {
    const department1 = this.$route.query.department1
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.vDWorkCommFormLastSave {
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
