<!-- @description: 公共日期范围 组件 -->
<template>
  <el-date-picker
    v-model="dateRange"
    type="daterange"
    align="right"
    unlink-panels
    value-format="yyyy-MM-dd"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :style="{width:'60%'}"
    @change="handleDateRangeChange"
  ></el-date-picker>
</template>

<script>
  export default {
    name: 'CommonDateRange',
    props: {
      /** @description: 开始日期 */
      startDate: {
        type: String,
        default: ''
      },
      /** @description: 结束日期 */
      endDate: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        /** @description: 用户选择结果 */
        dateRange: []
      }
    },
    computed: {      
    },
    watch: {
    },
    methods: {
      /** @description: 日期范围 变化 处理 */
      handleDateRangeChange(dateRange) {
        console.log('handleDateRangeChange(dateRange515', dateRange)
        const [ startDate, endDate ] = dateRange || []
        if(!startDate){
           this.$emit('update:startDate',startDate)
        }else{
           this.$emit('update:startDate',startDate+' 00:00:00')
        }

        if(!endDate){
           this.$emit('update:endDate', endDate)
        }else{
           this.$emit('update:endDate', endDate+' 23:59:59')

        }
        // this.$emit('update:startDate',startDate+startDate1)
        // this.$emit('update:endDate', endDate+endDate1)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
