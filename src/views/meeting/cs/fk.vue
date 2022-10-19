<!--
 * @Author: your name
 * @Date: 2020-07-31 15:51:18
 * @LastEditTime: 2021-07-13 15:19:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\drafts.vue
--> 
/**
* create by zz on 2020/7/31 16:00
* 类注释：
* 备注：参数维护/反馈配置
*/
<template>
  <div class="fk">
    <!-- <el-select v-model="formData.value1" placeholder="请选择" style="width:200px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>-->
    <el-row style="margin-bottom: 10px">
      <el-col :span="6">
        <select-org-or-dept
          @select="selectOrg"
          :orgOrDept="1"
          :orgOrDeptId="'1'"
          style="width:100%;"
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
        <el-button type="primary" @click="rebuild()">新建</el-button>
        <el-button type="primary" @click="del()">删除</el-button>
      </el-col>
    </el-row>

    <!-- <div class="box" style="paddign-bottom:10px">
      <select-org-or-dept
        @select="selectOrg"
        :orgOrDept="1"
        :orgOrDeptId="'0'"
        style="width:300px;float:left;margin-right:5px"
      >
        <el-input
          type="text"
          readonly="readonly"
          placeholder="请选择"
          v-model="formData.scUnit"
          suffix-icon="el-icon-arrow-down"
        />
      </select-org-or-dept>
      <p style="width:300px;float:left">
        <el-button type="primary" @click="rebuild">新建</el-button>
        <el-button type="primary" @click="del()">删除</el-button>
      </p>
    </div>-->
    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :sortable="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from "components/select/selectOrgOrDept";
import mTable from "@/components/table/tTable";
export default {
  name: "fk",
  components: {
    mTable,
    selectOrgOrDept,
  },
  data() {
    return {
      formData: {
        scUnitId: "",
        scUnit: "",
      },
      result: [],
      tableData: [],
      tableCols: [
        { label: "机构名", prop: "scUnit" },
        {
          label: "反馈信息配置类型",
          prop: "fileType",
          formatter(row) {
            return row.fileType == "培训会议通知" ? "培训通知" : row.fileType;
          },
        },
        { label: "反馈中文名称", prop: "returnCn" },
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 10,
      },
      options: {
        label: "总行",
        value: "1",
      },
      value: "",
      ch: "",
      en: "",
      delArr: [],
    };
  },
  computed: {},
  methods: {
    // 选机构
    selectOrg(org) {
      console.log(org);
      this.$set(this.formData, "scUnit", org.unitName);
      this.formData.scUnitId = org.id;
      // console.log('主办部门：', this.formData)
      console.log(999, this.formData);
      this.loadData();
    },
    // add () {
    //   this.$api.meeting.createAddData({
    //     scUnit: this.selectfloor.floorname,
    //     fileType: this.selecttype.typename,
    //     returnCn: this.ch,
    //     returnEn: this.en,
    //     isNecess: this.value
    //   })
    //     .then(res => {
    //       console.log(res)
    //     })
    //   this.dialogFormVisible = false
    // },
    // 新建
    rebuild() {
      this.$intent.goNewPage(this, {path: "/meeting/cs/fkAdd", query: {}});
      // console.log(this.$routh.path)
    },
    // 删除
    del() {
      if (this.delArr && this.delArr.length) {
        this.$api.meeting
          .settingDelete({ id: this.delArr.join(",") })
          .then((res) => {
            this.loadData();
          });
      } else {
        this.$message({
          message: "请先选择数据",
          type: "success",
        });
      }
    },
    loadData(type) {
      if (!type) {
        this.pagination.pageNum = 1;
      }
      this.$api.meeting
        .meetingTable(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.result = res.list;
          this.pagination.total = res.total;
          this.tableData = this.result;
        });
      // 机构名称select接口
      // this.$api.meeting.jigou({})
      //   .then(res1 => {
      //     console.log(res1)
      //   })
    },
    // 表格勾选
    select(rows) {
      this.delArr = [];
      // console.log(rows)
      rows.forEach((item) => {
        this.delArr.push(item.id);
      });

      // console.log(this.delArr)
    },
    cellClick(row, column, cell, event) {
      this.$intent.goNewPage(this, {
        path: "/meeting/cs/fkDetail",
        query: { id: row.id },
      });
    },
    // tableRowClassName ({ row, rowIndex }) {
    //   // console.log(row)
    //   if (row.fileType == '1') {
    //     return 'warning-row';
    //   } else if (row.fileType == '2') {
    //     return 'success-row';
    //   } else {
    //     // console.log(444444)
    //     return ''
    //   }
    // }
  },
  activated() {},
  mounted() {},
  created() {
    this.$api.setting.organization
      .getTree({
        unitClass: 1,
        unitCode: "1",
      })
      .then((res) => {
        let data = [];
        data = res.data;
        if (data && data.length > 0) {
          this.formData.scUnit = data[0].unitName;
          this.formData.scUnitId = data[0].unitCode;
          this.loadData();
        }
      })
      .catch((err) => {});
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.fk {
  min-height: 90vh;
}
// .fkHeader {
//   padding: 8px 70px;
//   .title-text {
//     margin-bottom: 15px;
//     font-size: 30px;
//     line-height: 75px;
//     color: #409eff;
//     font-weight: 600;
//     text-align: center;
//   }
// }
/deep/.el-table .warning-row {
  color: yellow;
  background: pink;
}

/deep/.el-table .success-row {
  color: red;
  background: blueviolet;
}
</style>
