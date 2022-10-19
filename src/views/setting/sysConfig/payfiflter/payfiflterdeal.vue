<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="editordata">编辑</el-button>
    </div>
    <div class="ser-confiog">
      <p class="ser-config-title">类别词与部门对应</p>
      <p class="pay-tid">说明：以下部门在用户签署意见时，落款处不显示部门名称</p>
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
          label: '机构名称',
          prop: 'memberName',
          // isImpot: true
        }, {
          label: '对应部门',
          prop: 'department',
        },
      ],
    }
  },
  methods: {
    closedata () {
      console.log("关闭")
      this.$router.push('/setting/sysConfig/payfiflter')
    },
    editordata () {
      console.log("编辑")
      this.$router.push('/setting/sysConfig/payfiflter/editor')
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
  .pay-tid {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #e5f0fc;
    font-weight: 800;
    margin: 4px 0px;
    font-size: 14px;
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