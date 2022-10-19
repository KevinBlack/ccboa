<!--
 * @Author: wy
 * @Date: 2020-07-30 14:42:43
 * @LastEditTime: 2020-07-31 10:25:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\secretary\superviseEffic\signOff\sOffStatistics\sOffStatisticsIndex.vue
--> 
<template>
  <div class="sOffStatisticsIndex">
    <div class="handleButton">
      <el-button type="primary">开始统计</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">各部门对会签行签报的办理情况</div>
      <div class="orgInfoTableBody">
        <el-form ref="form" :model="form" label-width="300px">
          <el-form-item label="报表类型">
            <el-radio-group v-model="form.type">
              <el-radio label="0">固定期限</el-radio>
              <el-radio label="1">自由报表</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计跨度">
            <el-radio-group v-model="form.type1">
              <el-radio label="0">月度</el-radio>
              <el-radio label="1">季度</el-radio>
              <el-radio label="2">半年</el-radio>
              <el-radio label="3">年度</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计时期">
            <el-select v-model="form.value0" placeholder="请选择年份">
              <el-option
                v-for="item in options.options0"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="form.value1" placeholder="请选择季度" :style="{marginLeft:'5px'}">
              <el-option
                v-for="item in options.options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="签报类型">
            <el-radio-group v-model="form.type6">
              <el-radio label="0">全部</el-radio>
              <el-radio label="1">请示</el-radio>
              <el-radio label="2">报告</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计类型">
            <el-radio-group v-model="form.type2">
              <el-radio label="0">按拟稿部门</el-radio>
              <el-radio label="1">按会签部门</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计相比">
            <el-checkbox-group v-model="form.sta">
              <el-checkbox label="0">与上年同期相比</el-checkbox>
              <el-checkbox label="1">与上年全年相比</el-checkbox>
              <el-checkbox label="2">与上个半年相比</el-checkbox>
              <el-checkbox label="3">与上季度相比</el-checkbox>
              <el-checkbox label="4">与上月相比</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="相比数据">
            <el-radio-group v-model="form.type7">
              <el-radio label="0">已存报表</el-radio>
              <el-radio label="1">当前数据</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计跟踪">
            <el-checkbox-group v-model="form.sta1">
              <el-checkbox label="0">是</el-checkbox>
              <el-checkbox label="1">精确跟踪</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sOffStatisticsIndex',
  data () {
    return {
      form: {
        sta: [],
        sta1: []
      },
      options: {
        options0: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        options1: [{
          value: '选项1',
          label: '黄金'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      }
    }
  }

}
</script>
<style lang="less">
.sOffStatisticsIndex {
  min-height: 100vh;
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }

    .orgInfoTableBody {
      margin-left: 3%;
      .tips {
        padding-left: 160px;
        margin-top: -10px;
        margin-bottom: 12px;
        font-size: 12px;
        color: #ff0502;
      }
    }
  }
}
</style>