<!--
 * @Author: wy
 * @Date: 2020-07-20 09:59:18
 * @LastEditTime: 2020-07-21 11:42:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workLog\components\viewPersonalDetail.vue
--> 
<template>
  <div class="viewPersonalDetail">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <!-- <el-button type="primary" @click="edit()">编辑</el-button> -->
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">个人工作日志</div>
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

<script >
export default {
  name: 'viewPersonalDetail',
  components: {
  },
  props: {},
  data () {
    return {
      orgIndexData: {},
      orgIndex: [
        {
          label: '记录人',
          prop: 'memberName'
        },
        {
          label: '日期',
          prop: 'roleName'
        },
        {
          label: '摘要',
          prop: 'uass'
        },
        {
          label: '内容',
          prop: 'department'
        },
        {
          label: '共享用户',
          prop: 'memberName'
        }
      ]
    }
  },
  computed: {},
  methods: {
    //关闭
    close () {
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/workLog',
        query: {
          activeName: 'viewPersonal'
        }
      })
      this.$forceUpdate()
    },
    //编辑
    edit () {
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/workLog'
      })
    }
  },
  activated () {
  },
  mounted () {
    const department1 = this.$route.query.department1
    console.log(123123);
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.viewPersonalDetail {
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 35px;
      font-size: 30px;
      line-height: 55px;
      color: #ff0502;
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
