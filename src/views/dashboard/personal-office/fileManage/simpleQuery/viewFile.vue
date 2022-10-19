<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="viewHanderdata">查看处理单</el-button>
    </div>
    <div class="formdata">
      <p class="base-title">文件著录表单</p>
      <div class="orgInfoTableBody">
        <el-row v-for="(item,index) in orgIndex" :key="index">
          <el-row :gutter="5" v-if="item.length==1">
            <el-col :span="6">
              <div class="grid-content bg-purple normalFont">{{item[0].label}}</div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item[0].prop]}}</div>
            </el-col>
          </el-row>
          <el-row v-else :gutter="5">
            <el-col :span="6">
              <div class="grid-content bg-purple normalFont">{{item[0].label}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item[0].prop]}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple normalFont">{{item[1].label}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item[1].prop]}}</div>
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
  name: 'viewFile',
  components: {
    FdForm
  },
  data () {
    return {
      orgIndexData: {
        department10: "大范甘迪规范"
      },
      orgIndex: [

        [{
          label: '文件标题',
          prop: 'department10',
        }],

        [{
          label: '附件标题',
          prop: 'department10',
        }],
        [{
          label: '文件类型',
          prop: 'department10',
        },
        {
          label: '文件代字',
          prop: 'department10',
        }
        ],
        [
          {
            label: '文件年度',
            prop: 'department10',
          },
          {
            label: '文件代号',
            prop: 'department10',
          },
        ],
        [
          {
            label: '文件页数',
            prop: 'department10',
          },
          {
            label: '文件日期',
            prop: 'department10',
          },
        ],
        [
          {
            label: '归档部门',
            prop: 'department10',
          },
          {
            label: '责任者',
            prop: 'department10',
          },
        ],
        [
          {
            label: '秘密类型',
            prop: 'department10',
          },
          {
            label: '密级',
            prop: 'department10',
          },
        ],
        [
          {
            label: '解密期限',
            prop: 'department10',
          },
          {
            label: '文件载体',
            prop: 'department10',
          },
        ],
        [{
          label: '附属材料',
          prop: 'department10',
        }],
        [
          {
            label: '保管期限',
            prop: 'department10',
          },
          {
            label: '归档年度',
            prop: 'department10',
          },
        ],
        [
          {
            label: '目录号',
            prop: 'department10',
          },
          {
            label: '案卷号',
            prop: 'department10',
          },
        ],
        [
          {
            label: '归档号',
            prop: 'department10',
          },
          {
            label: '全宗号',
            prop: 'department10',
          },
        ],
        [
          {
            label: '文号',
            prop: 'department10',
          },
          {
            label: '利用范围',
            prop: 'department10',
          },
        ],
        [{
          label: '主送',
          prop: 'department10',
        }],
        [{
          label: '抄送',
          prop: 'department10',
        }],
        [{
          label: '行内发送',
          prop: 'department10',
        }],
        [{
          label: '行外发送',
          prop: 'department10',
        }],
      ],

    }
  },
  methods: {
    closedata () {
      this.$router.push('/dashboard/personalOffice/fileManagement')
    },
    viewHanderdata () {
      this.$router.push('/dashboard/personalOffice/fileManagement/viewHander')
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
    color: #5d5d5d;
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
}
</style>