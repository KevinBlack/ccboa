<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="editordata">编辑</el-button>
    </div>
    <div class="ser-confiog">
      <p class="ser-config-title">服务器配置</p>
      <div class="orgInfoTableBody">
        <el-row :gutter="5" v-for="(item,index) in orgIndex" :key="index">
          <el-col :span="6">
            <div class="grid-content bg-purple normalFont">
              {{item.label}}
              <span style="color:red" v-if="item.isImpot||false">*</span>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item.props]}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "serverdeal",
  data () {
    return {
      orgIndexData: {},

      orgIndex: [
        {
          label: '主web站点',
          prop: 'memberName',
          // isImpot: true
        }, {
          label: 'Domino主服务器',
          prop: 'uass',
        }, {
          label: '备Web站点',
          prop: 'department',
        },
        {
          label: 'Domino备服务器',
          prop: 'memberName',
        }, {
          label: '代理服务器',
          prop: 'roleName'
        }, {
          label: 'VIPWeb站点',
          prop: 'uass'
        }, {
          label: 'VIP主服务器',
          prop: 'department'
        },
        {
          label: 'VIP备服务器',
          prop: 'memberName'
        }, {
          label: 'VIP001Web站点',
          prop: 'roleName'
        }, {
          label: 'VIP001主服务器',
          prop: 'roleName'
        }, {
          label: 'VIP001备服务器',
          prop: 'roleName'
        }, {
          label: '服务器分类',
          prop: 'roleName'
        }, {
          label: '说明',
          prop: 'roleName'
        }
      ]
    }
  },
  methods: {
    closedata () {
      console.log("关闭")
      this.$router.push('/setting/sysConfig/server')
    },
    editordata () {
      console.log("编辑")
      this.$router.push('/setting/sysConfig/server/servereditor')
    }
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  .btn-list {
    margin: 16px 0px;
  }
  .ser-config-title {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #d8e8f4;
    font-weight: 800;
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
</style>