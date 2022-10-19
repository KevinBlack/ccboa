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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="报送单位" width="150">
        </el-table-column>
        <el-table-column prop="date" label="报送部门" width="150">
        </el-table-column>
        <el-table-column label="部门工作">
          <el-table-column prop="province" label="来稿量" width="120">
          </el-table-column>
          <el-table-column prop="city" label="采用量" width="120">
          </el-table-column>
          <el-table-column label="分行工作">
            <el-table-column prop="province" label="来稿量" width="120">
            </el-table-column>
            <el-table-column prop="city" label="采用量" width="120">
            </el-table-column>
          </el-table-column>
          <el-table-column label="合计">
            <el-table-column prop="province" label="来稿量" width="120">
            </el-table-column>
            <el-table-column prop="city" label="采用量" width="120">
            </el-table-column>
          </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="ces-pagination" v-if="isPagination">
      <div style="flex: 1;line-height: 30px"></div>
      <el-pagination background :layout="layout" @current-change="handleCurrentChange" :page-size="pagination.pageSize" @size-change="handleSizeChange" :current-page.sync="pagination.pageNum" :page-sizes="pageSizeList" :total="pagination.total"></el-pagination>
    </div>
    <!-- 选择树 -->
    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList">
    </org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
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
      tableCols: [],
      // 分页数据
      pagination: { type: Object, default: () => ({ pageSize: 10, pageNum: 1, total: 0 }) },
      searchData: { type: Object, default: () => ({ sort: '', sortKey: '' }) },
      pageSizeList: { type: Array, default: () => [10, 15, 20, 25, 30, 50, 100, 500] },
      layout: { type: String, default: 'total,sizes,prev, pager, next,jumper' },
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
