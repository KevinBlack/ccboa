<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="editordata">编辑</el-button>
    </div>
    <div class="ser-confiog">
      <p class="ser-config-title">应用数据库配置</p>
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
      <div></div>
      <p class="ser-config-title">分库设置</p>
      <div class="orgInfoTableBody">
        <el-row :gutter="5" v-for="(item,index) in baseorgIndex" :key="index">
          <el-col :span="6">
            <div class="grid-content bg-purple normalFont">
              {{item.label}}
              <span style="color:red" v-if="item.isImpot||false">*</span>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light normalFont">{{baseorgIndexData[item.props]}}</div>
          </el-col>
        </el-row>
      </div>
      <div></div>
      <p class="ser-config-title">数据库控件预警设置</p>
      <div class="orgInfoTableBody">
        <el-row :gutter="5" v-for="(item,index) in earlyBaseorgIndex" :key="index">
          <el-col :span="6">
            <div class="grid-content bg-purple normalFont">
              {{item.label}}
              <span style="color:red" v-if="item.isImpot||false">*</span>
            </div>
          </el-col>
          <el-col :span="18">
            <div
              class="grid-content bg-purple-light normalFont"
            >{{earlyBaseorgIndexData[item.props]}}</div>
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
      baseorgIndexData: {},
      earlyBaseorgIndexData: {},
      orgIndex: [
        {
          label: '数据库名称',
          prop: 'memberName',
          // isImpot: true
        }, {
          label: '模块分类',
          prop: 'uass',
        }, {
          label: '模块名称',
          prop: 'department',
        },
        {
          label: '模块关键字',
          prop: 'memberName',
        }, {
          label: '功能名称',
          prop: 'roleName'
        }, {
          label: '功能关键字',
          prop: 'uass'
        }, {
          label: '主服务器',
          prop: 'department'
        },
        {
          label: '后台程序访问数据方式',
          prop: 'memberName'
        }, {
          label: '数据库路径',
          prop: 'roleName'
        }, {
          label: '是否分库',
          prop: 'roleName'
        }
      ],
      baseorgIndex: [
        {
          label: '启用分库',
          prop: 'uass',
        },
        {
          label: '分库方式',
          prop: 'uass',
        },
        {
          label: '分库年份',
          prop: 'uass',
        },
        {
          label: '分库月份',
          prop: 'uass',
        },
        {
          label: '分库大小',
          prop: 'uass',
        },
        {
          label: '分库大小序号',
          prop: 'uass',
        },
      ],
      earlyBaseorgIndex: [
        {
          label: '数据库空间',
          prop: 'uass',
        },
        {
          label: '数据库文档数目',
          prop: 'uass',
        }
      ]
    }
  },
  methods: {
    closedata () {
      console.log("关闭")
      this.$router.push('/setting//sysConfig/database')
    },
    editordata () {
      console.log("编辑")
      this.$router.push('/setting/sysConfig/database/databaseEditor')
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
    margin-bottom: 20px;
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