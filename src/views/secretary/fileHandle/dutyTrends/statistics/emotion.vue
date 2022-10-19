<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">值班动态统计</div>
    </div>
    <div class="cformdata">
      <el-form ref="refForm" :rules="rules" :model="formData" label-width="160px">
        <el-col :span="8">
          <el-form-item label="统计日期" prop="data">
            <el-date-picker v-model="formData.data" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="{width:'60%'}"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投稿栏目" prop="submitColumn">
            <el-select v-model="formData.submitColumn" placeholder="请选择" @change="changeSubmitColumn">
              <el-option v-for="item in submitColumnData" :key="item.value" :label="item.columnCategory" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报送机关" prop="submitColumn">
            <el-input v-model="formData.submitUnit"></el-input>
            <el-button @click="selectOrg">选择机构</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div>
      <div>错情统计数</div>
      <m-table @refresh="loadData" @cellClick="cellClick" @select="select" size="medium" :isIndex="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true"></m-table>
    </div>
    <!-- 选择树 -->
    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList">
    </org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'

export default {
  name: 'contribute',
  components: {},
  data() {
    return {
      title: '选择机构',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '0',
      formCfg: [],
      searchData: {}, // 搜索区数据
      tableData: [], // 表格数据
      // 表头
      tableCols: [
        { label: '机构名称', prop: 'activityCategory' },
        { label: '报送数量', prop: 'activityCategory' },
        { label: '错情数量', prop: 'activityCategory' },
        { label: '错情率', prop: 'activityCategory' },
      ],
      // 分页数据
      pagination: { pageSize: 10, pageNum: 1, total: 10 },
      submitColumnData: [], // 投稿栏目数据源
      formData: {}, // 表单值
      rules: {},
    }
  },
  methods: {
    // 开始统计
    submit() {
      this.loadData() // 调用表格数据方法
    },
    // 重置
    reset() {
      this.formData = {} // 清空表单的值
    },
    // 获取表格数据
    loadData() {},
    // 换行点击事件
    cellClick() {},
    // 勾选行事件
    select() {},
    // 获取投稿栏目数据源
    getSubmitColumn() {
      this.$api.duty.getSubmitColumnData({ columnType: '1' }).then((res) => {
        this.submitColumnData = res.columnCategoryList
      })
    },
    // 选择机构
    selectOrg() {},
    getOrgList() {},
    handleCurrentChange(val) {
      this.pagination.pageNum = val
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;
  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
.btn_list {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 45%;
}
.duty_tid {
  margin-left: 20%;
  font-size: 14px;
  span {
    color: red;
    cursor: pointer;
  }
}
.phone_tid {
  margin-left: 40px;
  font-size: 14px;
}
</style>
