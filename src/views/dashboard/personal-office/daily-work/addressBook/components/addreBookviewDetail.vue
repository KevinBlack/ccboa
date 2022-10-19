<!--
 * @Author: wy
 * @Date: 2020-07-21 11:28:33
 * @LastEditTime: 2020-07-21 11:41:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\addressBook\components\addreBookviewDetail.vue
-->
<template>
  <div class="addreBookviewDetail">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button type="primary" @click="edit()">编辑</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">个人通讯录登记</div>
      <div>
        <el-row :gutter="5" v-for="(item,index) in orgIndex" :key="index">
          <el-col :span="8">
            <div class="grid-content bg-purple normalFont itemLabel">{{item.label}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item.prop]}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'addreBookviewDetail',
    components: {},
    props: {},
    data() {
      return {
        orgIndexData:{},
        orgIndex: [
          {
            label: '姓名',
            prop: 'txlTname'
          },
          {
            label: '办公电话',
            prop: 'txlTbgdh'
          },
          {
            label: '宅电',
            prop: 'txlTzd'
          },
          {
            label: '手机号码',
            prop: 'txlTdh'
          },
          {
            label: '单位',
            prop: 'txlTdwdz'
          },
          {
            label: '通讯地址',
            prop: 'txlTzz'
          },
          {
            label: '邮政编码',
            prop: 'txzTyb'
          },
          {
            label: '传真号',
            prop: 'yxlTcz'
          },
          {
            label: 'E-MAIL地址',
            prop: 'txlTem'
          }
        ]
      }
    },
    computed: {},
    methods: {
      //关闭
      close() {
        this.$router.back()
      },
      //编辑
      edit() {
        this.$router.push({
          path: '/dashboard/personalOffice/dailyWork/addressBook/addreBookview', query: {type: 'edit', addressBook: JSON.stringify(this.orgIndexData)}
        })
      }
    },
    created() {
      this.orgIndexData=JSON.parse(this.$route.query.orgIndexData)
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .addreBookviewDetail {
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
