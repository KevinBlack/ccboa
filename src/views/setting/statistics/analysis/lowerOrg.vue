<!--
 * @Author: wy
 * @Date: 2020-07-09 14:33:28
 * @LastEditTime: 2020-07-09 16:10:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\statistics\analysis\organization.vue
-->
<template>
  <div class="lowerOrg">
    <div class="inquireTable">
      <div class="inquireTitle">公文统计分析（按下级机构统计）</div>
      <div style="height:35px">
        <el-radio-group v-model="resource" :style="{float:'right'}">
          <el-radio label="HTML"></el-radio>
          <el-radio label="EXCEL"></el-radio>
        </el-radio-group>
      </div>
      <div class="inquireTableBody">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="发文日期" prop="data">
            <el-date-picker
              v-model="form.data"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              :style="{width:'60%'}"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">开始统计</el-button>
            <el-button @click="reset()">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'lowerOrg',
  components: {
  },
  props: {},
  data () {
    return {
      resource: 'HTML',
      form: {
        date: ''
      },
      // 日期选择
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    reset () {
      console.log(1234567)

      this.$refs.form.resetFields()
    }
  },
  activated () {
  },
  mounted () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.lowerOrg {
  .inquireTable {
    padding: 0px 70px;
    .inquireTitle {
      margin-bottom: 10px;
      font-size: 30px;
      line-height: 75px;
      color: #3b85ef;
      font-weight: 600;
      text-align: center;
    }
    .inquireTableBody {
      border: 1px solid #d8d8d8;
      padding: 20px 30px;
    }
  }
}
</style>
