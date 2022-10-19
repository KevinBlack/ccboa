<!--
 * @Author: your name
 * @Date: 2020-10-24 09:51:32
 * @LastEditTime: 2021-01-28 13:53:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\views\publication\pubJournal\byEntry\dailyNews.vue
--> 
<template>
  <div>
    <div class="dailyHeader">
      <el-button plain size="mini" style="float:right" @click="closeBtn('关闭')">关闭</el-button>

      <div class="daily-title">《每日动态》</div>
      <div class="small-title">
        <p>第{{this.formData.issue}}期</p>
        <p>总第{{this.formData.totalIssue}}期</p>
      </div>
      <el-form ref="form" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容" prop="content">
              <el-input v-model="formData.content" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- <m-table size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection='true' :searchData="searchData"></m-table> -->
  </div>
</template>
<script>
// import mTable from '@/components/table/tTable'
export default {
  name: 'dailyNews.vue',
  components: {
    // mTable,
  },
  data() {
    return {
      formData: {},
      // labelPosition: 'right',
      // tableData: [{ biaoti: '20200904', neirong: '测试0904' }],
      // tableCols: [
      //   { label: '标题', prop: 'biaoti' },
      //   { label: '内容', prop: 'neirong' },
      // ],
      // pagination: {
      //   pageNum: 1,
      //   pageSize: 20,
      // },
      // searchData: {},
      // formLabelAlign: {
      //   name: '',
      //   region: '',
      //   type: '',
      // },
    }
  },
  methods: {
    closeBtn() {
      this.$router.back()
    },
  },
  created() {
    this.formData = this.$route.query.rowData
  },
}
</script>
<style scoped lang="less">
.dailyHeader {
  padding: 8px 60px;
  .daily-title {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
  .small-title {
    text-align: center;
    line-height: 1.5;
    font-weight: 600;
  }
}
.adoptMain {
  width: 85%;
  min-height: 280px;
  padding: 30px 25px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
</style>
