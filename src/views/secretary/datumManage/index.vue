<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部">
        <search-form
          ref="searchForm"
          :formData="formData"
          :formCfg="formCfg"
          @reset="reset"
          @submit="submit"
          @event="btnevent"
          v-if="formHidden"
        >
          <el-col :span="8">
            <el-form-item label="日期">
              <el-date-picker
                v-model="formData.activeDateTime"
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
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          待办
          <el-badge :value="needTodoNum" class="item" type="primary"></el-badge>
        </span>
        <el-col class="mt20end">
          <el-button type="primary" @click="getDepart" style="margin-bottom:5px">起草</el-button>
          <!-- <span style="color:red;margin-left:20px;">系统试运行期间，新系统只支持本行内业务流转，跨行业务请到原OA3.6中办理。</span> -->
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="已办"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
    </el-tabs>
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
      :tableRowClassNames="tableRowClassName"
    ></m-table>
    <el-dialog title="选择拟稿部门" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="部门" prop="selectDept" style="margin-left:35%;margin-top:15px">
          <el-select v-model="selectDept" placeholder="请选择" @change="change(selectDept)">
            <el-option
              v-for="item in deptList"
              :key="item.firstUnitId"
              :label="item.unitNames"
              :value="item.humanId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="canselBtn">取消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import searchForm from "components/form/searchForm";
import mTable from "components/table/tTable";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import { Row } from 'element-ui';
const finshData = [
  { label: "日期时间", prop: "activeDate", align: "center", width: 150 },
  { label: "活动名称", prop: "title", align: "center" },
  { label: "活动类型", prop: "activeType", align: "center", width: 100 },
  { label: "地点", prop: "activeAddress", align: "center", width: 150 },
  { label: "参与人员", prop: "attendMemCn", align: "center", width: 150 },
  { label: "当前环节", prop: "curNodeName", align: "center", width: 100 },
  { label: "操作人", prop: "currentUser", align: "center", width: 100 }
];
const banjiehData = [
  { label: "日期时间", prop: "activeDate", align: "center", width: 150 },
  { label: "活动名称", prop: "title", align: "center" },
  { label: "活动类型", prop: "activeType", align: "center", width: 100 },
  { label: "地点", prop: "activeAddress", align: "center", width: 150 },
  { label: "参与人员", prop: "attendMemCn", align: "center", width: 150 }
];
export default {
  name: "datumManage_index",
  components: {
    searchForm,
    mTable
  },
  mixins: [bianhanPublic],
  data() {
    return {
      activeTypeList: [], //活动类型参数组
      needTodoNum: "",
      selectDept: "", //拟稿部门
      deptList: [], //拟稿部门数据
      deptDetail: {},
      dialogFormVisible: false, //选择拟稿弹窗
      activeName: "1",
      formHidden: false,
      formCfg: [
        { type: "input", prop: "title", label: "活动名称", span: 8 },
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
      tableCols: finshData, //分页表格表头
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
      dialogType: "",
      dialogTypeNow: ""
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
      if (this.activeName == "1") {
        this.formData.listType = "0";
      }
      if (this.formData.activeDateTime) {
        this.formData.activeDateStart = this.formData.activeDateTime[0];
        this.formData.activeDateEnd = this.formData.activeDateTime[1];
      }

      this.$api.activityInformation
        .getActivityList(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
          if (this.activeName == "1") {
            this.needTodoNum = res.total;
          }
        });
    },
    //tab标签
    handleTabsClick(tab, event) {
      this.pagination = {
        pageNum: 1, //第几页
        pageSize: 20 //每页条数
      };
      this.tableData = [];
      if (tab.index == 3) {
        this.formData = {
          sort: "desc",
          sortKey: "activeDate"
        };
        this.formData.listType = "2"; //listTye用来区分 待办"0";已办"1";办结"2";全部 "3"
        this.tableCols = banjiehData;
        this.formHidden = false;
      } else {
        this.tableCols = finshData;
        if (tab.index == 0) {
          this.formData = {
            sort: "desc",
            sortKey: "activeDate"
          };
          this.formData.listType = "3";
          this.formHidden = true;
          this.activeTypeRequest();
        } else if (tab.index == 1) {
          this.formData = {
            sort: "desc",
            sortKey: "activeDate"
          };
          this.formData.listType = "0";
          this.formHidden = false;
        } else if (tab.index == 2) {
          this.formData = {
            sort: "desc",
            sortKey: "activeDate"
          };
          this.formData.listType = "1";
          this.formHidden = false;
        }
      }
      this.loadData();
    },
    //表格事件
    cellClick(row) {
      if (this.activeName == 0) {
        if (row.type == "待办") {
          // this.$intent.goNewPage(this, {
          //   path: "/secretary/datumManage/activityManage",
          //   query: { data: row.id, type: "datumManage_index" }
          // });
          this.hasOpened(row.id, {
                'name': "activityManage",
                'query': {
                  'id': row.id,
                  'type': "datumManage_index"
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
        }
      } else if (this.activeName == 1) {
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/datumManage/activityManage",
        //   query: { data: row.id, type: "datumManage_index" }
        // });
         this.hasOpened(row.id, {
                'name': "activityManage",
                'query': {
                  'id': row.id,
                  'type': "datumManage_index"
                }
              })
      } else if (this.activeName == 2) {
        this.$intent.goNewPage(this, {
          path: "/secretary/datumManage/DownAndFinish",
          query: { data: row.id, type: "已办" }
        });
      } else if (this.activeName == 3) {
        this.$intent.goNewPage(this, {
          path: "/secretary/datumManage/DownAndFinish",
          query: { data: row.id, type: "办结" }
        });
      }
    },
    //选择参与人员按钮
    btnevent(params) {
      switch (params.prop) {
        case "$selectPerson":
          this.dialogState = true;
          break;
      }
    },
    //选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false; // 关闭选择人员树弹窗
      let attendMemCnId = [];
      let attendMemCn = [];
      data &&
        data.map(item => {
          attendMemCnId.push(item.id);
          attendMemCn.push(item.name);
        });
      this.formData.attendMemCn = attendMemCn.join(",");
      this.formData.attendMemCnId = attendMemCnId.join(",");
    },
    tableRowClassName(row) {
      if (row.isReadFlag == "0" && row.type == "待办") {
        return "warning-row";
      }
    },
    //取消
    canselBtn() {
      this.dialogFormVisible = false;
    },
    //拟稿部门确定
    handleSave() {
      if (this.deptList.length == 0) {
        return this.$message.error("请选择部门");
      } else {
        this.$intent.goNewPage(this, {
          path: "/secretary/datumManage/activityManage",
          query: { deptDetail: this.deptDetail, type: "datumManage_index" }
        });
        this.dialogFormVisible = false;
      }
    },
    //获取拟稿部门
    getDepart() {
      this.$api.activityInformation.orgActivity({}).then(res => {
        this.deptList = res.result;
        this.selectDept = this.deptList[0].humanId;
        let select1 = {};
        this.deptList.forEach(item => {
          if (item.humanId == this.selectDept) {
            select1 = item;
          }
        });
        this.deptDetail = JSON.stringify(select1);
      });
      this.dialogFormVisible = true;
    },
    change(p) {
      let select = {};
      this.deptList.forEach(item => {
        if (item.humanId == p) {
          select = item;
        }
      });
      this.deptDetail = JSON.stringify(select);
      this.$forceUpdate();
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
