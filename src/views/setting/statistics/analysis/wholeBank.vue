<!--
 * @Author: wy
 * @Date: 2020-07-08 16:07:44
 * @LastEditTime: 2020-07-10 14:11:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\statistics\analysis\index.vue
-->
<template>
  <div class="wholeBank">
    <div class="inquireTable">
      <div class="inquireTitle">公文统计分析（按全行统计）</div>
      <div style="height:35px">
        <el-radio-group v-model="resource" :style="{float:'right'}">
          <el-radio label="HTML"></el-radio>
          <el-radio label="EXCEL"></el-radio>
        </el-radio-group>
      </div>
      <div class="inquireTableBody">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="统计日期1" prop="data">
            <el-date-picker
              v-model="form.data"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              :style="{width:'100%'}"
              @input="$forceUpdate()"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="统计日期2" prop="data1">
            <el-date-picker
              v-model="form.data1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              :style="{width:'100%'}"
              @input="$forceUpdate()"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="统计日期3" prop="data2">
            <el-date-picker
              v-model="form.data2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              :style="{width:'100%'}"
              @input="$forceUpdate()"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="统计日期4" prop="data3">
            <el-date-picker
              v-model="form.data3"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              :style="{width:'100%'}"
              @input="$forceUpdate()"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="统计表类型" prop="name">
            <el-input v-model="form.name"></el-input>
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
  name: 'wholeBank',
  components: {
  },
  props: {},
  data () {
    return {
      resource: 'HTML',
      form: {
        name: '',
        date: '',
        date1: '',
        date2: '',
        date3: ''
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
  updated () {
    console.log('updated11111111111111111');

  },
  computed: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    reset () {
      this.$refs.form.resetFields()
      this.$forceUpdate()
    }
  },
  activated () {
  },
  mounted () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.wholeBank {
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
