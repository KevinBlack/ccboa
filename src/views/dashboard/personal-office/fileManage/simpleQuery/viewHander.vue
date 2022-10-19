<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="viewHanderdata">查看正文</el-button>
      <el-button type="primary" @click="printdata">打印</el-button>
    </div>
    <div class="formdata">
      <p class="base-title">中国建设银行发文处理单</p>
      <div class="link_box">
        <p>
          当前环节：
          <span>处理完毕</span>
        </p>
        <p>特殊发送：否</p>
      </div>
      <div class="orgInfoTableBody">
        <el-row v-for="(item,index) in orgIndex" :key="index">
          <el-row :gutter="5" v-if="item.length==1">
            <el-col :span="6">
              <div class="grid-content bg-purple normalFont">{{item[0].label}}</div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple-light normalFont"></div>
            </el-col>
          </el-row>
          <el-row v-else :gutter="5">
            <el-col :span="4">
              <div class="grid-content bg-purple normalFont">{{item[0].label}}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light normalFont"></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple normalFont">{{item[1].label}}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light normalFont"></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple normalFont">{{item[2].label}}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light normalFont"></div>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: 'viewHander',
  components: {
    FdForm
  },
  data () {
    return {
      orgIndexData: {},
      orgIndex: [

        [{
          label: '发文类型',
          prop: 'department10',
        }, {
          label: '代字/红头',
          prop: 'department10',
        }, {
          label: '发文字号',
          prop: 'department10',
        }
        ], [{
          label: '紧急程度',
          prop: 'department10',
        }, {
          label: '秘密类型',
          prop: 'department10',
        }, {
          label: '密级及保密日期',
          prop: 'department10',
        }
        ], [{
          label: '主办单位',
          prop: 'department10',
        }, {
          label: '联合发文单位',
          prop: 'department10',
        }, {
          label: '',
          prop: '',
        }
        ], [{
          label: '拟稿人',
          prop: 'department10',
        }, {
          label: '联系电话',
          prop: 'department10',
        }, {
          label: '拟稿日期',
          prop: 'department10',
        }
        ], [
          {
            label: '发文依照',
            prop: 'department10'
          }
        ], [{
          label: '查看文件',
          prop: 'department10',
        }, {
          label: '查发范围',
          prop: 'department10',
        }, {
          label: '查发文种类 ',
          prop: 'department10',
        }
        ], [
          {
            label: '正文标题',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '附件标题',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '主题词',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '会签部门 ',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '主送',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '抄送',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '本行发送',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '签发意见',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '核稿意见',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '会签意见',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '审核意见',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '备注 ',
            prop: 'dsdasdsad'
          }
        ], [
          {
            label: '成文日期',
            prop: 'dsdasdsad'
          }, {
            label: '发文日期',
            prop: 'dsdasdsad'
          }, {
            label: '',
            prop: ''
          }
        ], [
          {
            label: '发文字数',
            prop: 'fddfsdfds'
          }
        ], [
          {
            label: '是否半电子',
            prop: 'dfrdsfs'
          }
        ]



      ],

    }
  },
  methods: {
    closedata () {
      this.$router.push('/dashboard/personalOffice/fileManagement')
    },
    viewHanderdata () {
      this.$router.push('/dashboard/personalOffice/fileManagement/viewFile')
    },
    printdata () {

    }
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  .formdata {
    margin-top: 24px;
  }
  .base-title {
    width: 100%;
    text-align: center;
    margin: 22px;
    color: #e13b3d;
    font-size: 24px;
    font-weight: bolder;
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
  .link_box {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    p:first-child {
      margin-right: 30px;
      span {
        color: #e13b3d;
      }
    }
  }
}
</style>