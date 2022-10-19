<!--
 * @Author: your name
 * @Date: 2020-07-31 15:51:51
 * @LastEditTime: 2020-10-30 10:18:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\print.vue
--> 
/**
* create by zz on 2020/7/31 16:00
* 类注释：
* 备注：
*/
<template>
  <div class="hy">
    <el-row style="margin-bottom: 10px">
      <el-col :span="6">
        <select-org-or-dept
          @select="selectOrg"
          :orgOrDept="1"
          :orgOrDeptId="'0'"
          style="width:100%"
        >
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择"
            v-model="formData.scUnit"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6" style="margin-left: 20px">
        <el-button type="primary" @click="rebuild">新建</el-button>
        <el-button type="primary" @click="del()">删除</el-button>
      </el-col>
    </el-row>

    <!-- <el-select v-model="value1" placeholder="请选择">
      <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label"></el-option>
    </el-select>
    <el-button type="primary" @click="rebuild">新建</el-button>
    <el-button type="primary" @click="del">删除</el-button>-->
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from "components/select/selectOrgOrDept"

import mTable from '@/components/table/tTable'
export default {
  name: "hy",
  components: {
    mTable,
    selectOrgOrDept
  },
  data () {
    return {
      delArr: [],
      formData: {
        scUnitId: JSON.parse(localStorage.getItem('userInfo')).unitId,
        scUnit: JSON.parse(localStorage.getItem('userInfo')).unitName,
      },
      result: [],
      tableData: [
        // {
        //   name: '行名，部门',
        // },
        // {
        //   name: '姓名，手机',
        // },
      ],
      tableCols: [
        { label: "机构名", prop: "scUnit" },
        { label: '座位岗位信息', prop: 'mainSend' },
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 10
      },
      options: [
        {
          label: '总行',
          value: '1'
        }
      ],
      value1: "总行",
      id: ''
    }
  },
  computed: {},
  methods: {
    // 选机构
    selectOrg (org) {
      console.log(org)
      this.$set(this.formData, "scUnit", org.unitName)
      this.formData.scUnitId = org.id
      // console.log('主办部门：', this.formData)
      console.log(999, this.formData)
      this.loadData()
    },
    // 新建
    rebuild () {
      this.$intent.goNewPage(this, {
        path: "/meeting/cs/hyAdd"
      });
      // console.log(this.$routh.path)
    },
    // 表格勾选
    select (rows, row) {
      this.delArr = [];
      rows.forEach(item => {
        this.delArr.push(item.id)
      })
      console.log(this.delArr)
      // console.log(this.delArr)
    },
    // 删除
    del () {
      if (this.delArr && this.delArr.length) {
        this.$api.meeting.setDelete(
          { id: this.delArr.join(',') }
        )
          .then(res => {
            this.loadData();
          })
      } else {
        alert('请先选择数据')
      }
    },
    cellClick (row) {
      console.log(row)
      this.$intent.goNewPage(this, {
        path: "/meeting/cs/hyDetail",
        query: { id: row.id },
      });
    },
    loadData () {
      this.$api.meeting.mSetTable(this.formData, {
        PAGE_JUMP: this.pagination.pageNum,
        REC_IN_PAGE: this.pagination.pageSize
      })
        .then(res => {
          this.result = res.list
          this.pagination.total = res.total
          this.tableData = this.result
        })
    },
  },
  activated () {
  },
  mounted () {
  },
  created () {
    this.loadData()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.hyHeader {
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
</style>
