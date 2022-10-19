<template>
  <div>
    <search-form
      ref="searchForm"
      :formData="formData"
      :formCfg="formCfg"
      @reset="reset"
      @submit="submit"
      @event="btnevent"
    >
      <el-col :span="8">
        <el-form-item label="日期">
          <el-date-picker
            v-model="formData.activeDates"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            style="width: 100%"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="活动类型">
          <el-select v-model="formData.activeType" placeholder="请选择">
            <el-option
              v-for="item in activeTypeList"
              :key="item.index"
              :label="item"
              :value="item"
              :disabled="false"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-input v-model="formData.listType" v-if="false"></el-input>
    </search-form>
    <div style="margin: 5px 0 5px 0">
      <el-button type="primary" @click="exportExecl">导出Excel</el-button>
    </div>
    <export-excel
      v-show="false"
      :tableData="excelTableData"
      :tableCols="tableCols"
      :excelTitle="excelTitle"
      :startExport="startExport"
    ></export-excel>
    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      :isIndex="true"
      size="medium"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :pageSizeList="[20, 30, 50, 100, 200, 500]"
    ></m-table>

    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingles"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
      :selectDept="selectDept"
      :isNeedChild="isNeedChild"
    ></tree-person>
  </div>
</template>

<script>
import searchForm from "components/form/searchForm";
import mTable from "components/table/tTable";
import selectPerson from "components/tree/treeTansun";
import exportExcel from "components/viewFlow/exportDataExcel";
import treePerson from "components/tree/hldTree";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  name: "searchManage",
  components: {
    searchForm,
    mTable,
    selectPerson,
    exportExcel,
    treePerson
  },
  mixins: [bianhanPublic],
  data() {
    return {
      //选择人员树
      showOrgPer: false,
      isSingles: false,
      isNeedChild: "yes",
      unitClass: 0,
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDept: [],
      startExport: false, //判断是否开始导出数据
      excelTitle: "领导活动资料",
      excelTableData: [],
      activeTypeList: [], //活动类型参数组
      formCfg: [
        { type: "input", prop: "title", label: "活动名称", span: 8 },
        { type: "input", prop: "activeAddress", label: "活动地点", span: 8 },
        [
          {
            type: "input",
            prop: "attendMemCn",
            span: 22,
            style: { width: "80%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectPerson",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "16px" }
          },
          { type: "formitem", label: "参与人员" }
        ],
        { type: "input", prop: "attTitle", label: "附件名称", span: 24 },
        { type: "input", prop: "otherKeyWords", label: "其他关键字", span: 24 },
        [
          { type: "button-primary", prop: "$submit", value: "查询" },
          { type: "button-primary", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" }
          }
        ]
      ],
      formData: {
        sort: "desc",
        sortKey: "activeDate"
      }, //表单数据
      tableData: [], //分页表格数据
      tableCols: [
        { label: "日期时间", prop: "activeDate", align: "center", width: 150 },
        { label: "活动名称", prop: "title", align: "center" },
        { label: "活动类型", prop: "activeType", align: "center", width: 150 },
        { label: "地点", prop: "activeAddress", align: "center", width: 150 },
        { label: "参与人员", prop: "attendMemCn", align: "center", width: 200 }
      ], //分页表格表头
      pagination: {
        pageNum: 1, //第几页
        total: 0, //共有条数
        pageSize: 20 //每页条数
      },
      //选择人员树
      treeData: [],
      seletOptionsData: [],
      offenUse: false,
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: false, // 单选true 多选为false
      dialogState: false, // 默认隐藏选择人员树结构
      dialogType: "next",
      dialogTypeNow: "next"
    };
  },
  computed: {},
  methods: {
    reset() {
      this.formData = {};
    },
    submit(params) {
      this.formData = params;
      this.loadData();
    },
    loadData() {
      if (this.formData.activeDates) {
        this.formData.activeDateStart = this.formData.activeDates[0];
        this.formData.activeDateEnd = this.formData.activeDates[1];
      }
      this.formData.listType = "";
      this.$api.activityInformation
        .getActivityList(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      if (row.type == "待办") {
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/datumManage/activityManage",
        //   query: { data: row.id, type: "searchManage" }
        // });
        this.hasOpened(row.id, {
                'name': "activityManage",
                'query': {
                  'id': row.id,
                  'type': "searchManage"
                }
              })
      } else if (row.type == "已办") {
        this.$intent.goNewPage(this, {
          path: "/secretary/datumManage/DownAndFinish",
          query: { data: row.id, type: "已办" }
        });
      } else if (row.type == "办结") {
        this.$intent.goNewPage(this, {
          path: "/secretary/datumManage/DownAndFinish",
          query: { data: row.id, type: "办结" }
        });
      } else {
        this.$intent.goNewPage(this, {
          path: "/secretary/datumManage/DownAndFinish",
          query: { data: row.id, type: "办结" }
        });
      }
    },
    //导出
    exportExecl() {
      /* if (this.tableData.length == 0) {
        return;
      }
      exportTable.exportExcel("活动资料安排查询结果"); */
      this.$api.activityInformation
        .getActivityList(this.formData, {
          PAGE_JUMP: "",
          REC_IN_PAGE: ""
        })
        .then(res => {
          this.excelTableData = res.data;
          this.$nextTick(item => {
            this.startExport = true;
          });
          setTimeout(() => {
            this.startExport = false;
          }, 2000);
        });
    },
    btnevent(params) {
      switch (params.prop) {
        case "$selectPerson":
          // this.MemCndialogState = true;
          // 数据返显
          this.selectDept = [];
          let tempArr = [];
          let attendMemCnArr = [];
          let attendMemCnIdArr = [];
          if (
            this.formData.attendMemCnId &&
            this.formData.attendMemCnId.length > 0
          ) {
            attendMemCnIdArr = this.formData.attendMemCnId.split(",");
            attendMemCnArr = this.formData.attendMemCn.split(",");
            attendMemCnIdArr.forEach((item, index) => {
              let obj = {};
              obj.deptHumanId = item;
              obj.perName = attendMemCnArr[index];
              obj.disabled = true;
              tempArr.push(obj);
            });
            this.selectDept = tempArr;
          }
          this.showOrgPer = true;
          break;
      }
    },
    getperList(data) {
      let attendMemCnId = [];
      let attendMemCn = [];
      data &&
        data.map(item => {
          attendMemCnId.push(item.deptHumanId);
          attendMemCn.push(item.perName);
        });
      if (attendMemCnId.length > 0) {
        this.$refs.searchForm.setText("attendMemCn", attendMemCn.join(","));
        this.$refs.searchForm.setText("attendMemCnId", attendMemCnId.join(","));
        // this.formData.attendMemCn = attendMemCn.join(",");
        // this.formData.attendMemCnId = attendMemCnId.join(",");
        return;
      }
      this.formData.attendMemCn = "";
      this.formData.attendMemCnId = "";
    },
    //选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false; // 关闭选择人员树弹窗
      let attendMemCnIdList = [];
      let attendMemCnList = [];
      data &&
        data.map(item => {
          attendMemCnIdList.push(item.id);
          attendMemCnList.push(item.name);
        });
      /* this.formData.attendMemCn = attendMemCnList.join(",");
      this.formData.attendMemCnId = attendMemCnIdList.join(","); */
      this.$refs.searchForm.setText("attendMemCn", attendMemCnList.join(","));
      this.$refs.searchForm.setText(
        "attendMemCnId",
        attendMemCnIdList.join(",")
      );
    },
    //活动类型
    activeTypeRequest() {
      this.$api.activityInformation.TypeActivity().then(res => {
        this.activeTypeList = res.data;
      });
    }
  },
  mounted() {},
  created() {
    this.loadData();
    this.activeTypeRequest();
  }
};
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
  margin-left: 400px;
}
</style>
