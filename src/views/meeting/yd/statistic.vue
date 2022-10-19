<!--
 * @Author: your name
 * @Date: 2020-07-31 15:54:16
 * @LastEditTime: 2020-08-11 14:39:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\statistic.vue
-->
/**
* create by zz on 2020/7/31 16:00
* 类注释：
* 备注：
*/
<template>
  <div class="statistic">
    <div class="process_content">
      <el-form ref="formData" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="统计日期">
              <el-date-picker
                v-model="formData.orderDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                style="width:100%"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="统计类型">
              <el-radio-group v-model="formData.type">
                <el-radio
                  v-for="item in statisticTypeList"
                  :label="item.code"
                  :key="item.code"
                >{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right;">
            <el-button type="primary" @click="search('btn')">搜索</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <m-table
        @handleCurrentChange="search"
        @handleSizeChange="search"
        size="medium"
        :isIndex="true"
        :isHandle="false"
        :searchData="formData"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/mTable";
export default {
  name: "statistic",
  components: {
    mTable
  },
  data() {
    return {
      formData: {
        orderDate: [],
        type: "0"
      },
      statisticTypeList: [
        { code: "0", value: "会议室名称" },
        { code: "1", value: "会议类型" },
        { code: "2", value: "部门" }
      ],
      tableData: [],
      tableCols: [
        { label: "会议室名称", prop: "parm", align: "center" },
        { label: "取消预订数", prop: "cancleNm", align: "center" },
        { label: "成功预订数", prop: "succNm", align: "center" },
        { label: "小计", prop: "sums", align: "center" }
      ],
      pagination: {
        page: 1,
        total: 0,
        limit: 20
      },
      searchFun: {
        function: "orderTj",
        page: 1,
        total: 0,
        limit: 20
      }
    };
  },
  computed: {},
  methods: {
    reset() {
      this.formData = {
        orderDate: [],
        type: "0"
      };
    },
    search(type) {
      let parseList = JSON.parse(JSON.stringify(this.formData));
      if(type=='btn'){
        this.pagination={
          page: 1,
          total: 0,
          limit: 20
          }
      }
      var obj = Object.assign(this.searchFun, parseList,this.pagination);
      if(this.formData.type=='0'){
        this.tableCols[0].label='会议室名称'
      }else if(this.formData.type=='1'){
        this.tableCols[0].label='会议类型'
      }else{
        this.tableCols[0].label='部门'
      };
      sessionStorage.setItem('page_sw',JSON.stringify(obj));
      this.$post
        .postData("orderTj", JSON.stringify(obj), this.$businessCode.hysyd)
        .then(res => {
          if (res && res.success) {
            this.tableData = res.data.data;
            this.pagination.total = res.data.totalCount;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "网络错误",
            duration: 2000
          });
        });
    }
  },
  activated() {},
  mounted() {},
  created() {
    if(sessionStorage.getItem('page_sw')){
      this.formData = Object.assign(this.formData,JSON.parse(sessionStorage.getItem('page_sw')));
      this.pagination={
        page: this.formData.page, //第几页
        total: this.formData.total, //共有条数
        limit: this.formData.limit, //每页条数
      };
      this.search();
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.statistic {
  background: white;
  margin: 0 auto;
}
</style>

