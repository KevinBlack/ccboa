<template>
  <!-- 这是印章管理》印章刻制首页 -->
  <div class="markDraft">
    <!-- 操作按钮 -->
    <template>
      <el-tabs v-model="activeTabName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="alls">
          <!-- <el-form :inline="true" :model="formItem" class="demo-form-inline" label-width='100px'>
                        <el-row>
                            <el-form-item label='编号'>
                                <el-input v-model='formItem.documentNo'></el-input>
                            </el-form-item>
                            <el-form-item label='申请单位'>
                                <el-select v-model="formItem.draftDepartmentId">
                                    <el-option v-for='(item,index) in deptList' :key='index'
                                        :label="item.unitNames" :value='unitCodes'
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label='刻制印章名称'>
                                <el-input v-model='formItem.yzNewname'></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label='申请日期'>
                                <el-date-picker type='daterange' v-model='dateData.createDate' range-separator='至'
                                    start-placeholder='开始日期' end-placeholder='结束日期'></el-date-picker>
                            </el-form-item>
                            <el-form-item label='刻制日期'>
                                <el-date-picker type='daterange' v-model='dateData.carvDate' range-separator='至'
                                    start-placeholder='开始日期' end-placeholder='结束日期'></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    v-for="(item, index) in allsBtnsList" 
                                    :key="index" @click="clickBtns(item)" v-show="item.show" type="primary">
                                    {{item.name}}
                                </el-button>
                            </el-form-item>
                        </el-row>
          </el-form>-->
          <t-table
            size="medium"
            @refresh="loadTableData('alls')"
            @cellClick="cellClick_alls"
            @select="selectTable_alls"
            :tableCols="flowTableCols"
            :pagination="pagination_alls"
            :isSelection="true"
            :tableData="tableData_alls"
          ></t-table>
        </el-tab-pane>
        <el-tab-pane label="待办" name="flow_doing">
          <el-form :inline="true" class="demo-form-inline" v-if="buttonType">
            <el-form-item>
              <el-button
                v-for="(item, index) in flowDoingBtnsList"
                :key="index"
                @click="clickBtns(item)"
                v-show="item.show"
                type="primary"
              >{{item.name}}</el-button>
            </el-form-item>
          </el-form>
          <t-table
            size="medium"
            @refresh="loadTableData('flow_doing')"
            @cellClick="cellClick_flow_doing"
            @select="selectTable_flow_doing"
            :tableCols="flowTableCols"
            :pagination="pagination_flow_doing"
            :isSelection="true"
            :tableData="tableData_flow_doing"
            :tableRowClassNames="tableRowClassName"
          ></t-table>
        </el-tab-pane>
        <el-tab-pane label="已办" name="flow_done">
          <t-table
            size="medium"
            @refresh="loadTableData('flow_done')"
            @cellClick="cellClick_flow_done"
            @select="selectTable_flow_done"
            :tableCols="flowTableCols"
            :pagination="pagination_flow_done"
            :isSelection="true"
            :tableData="tableData_flow_done"
          ></t-table>
        </el-tab-pane>
        <el-tab-pane label="办结" name="done">
          <t-table
            size="medium"
            @refresh="loadTableData('done')"
            @cellClick="cellClick_done"
            @select="selectTable_done"
            :tableCols="doneTableCols"
            :pagination="pagination_done"
            :isSelection="true"
            :tableData="tableData_done"
          ></t-table>
        </el-tab-pane>
      </el-tabs>
    </template>
    <!-- 选择拟稿机构弹框 -->
    <el-dialog title="选择拟稿部门" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="部门" :label-width="formLabelWidth">
          <label slot="label">
            <span class="red">*</span>部门
          </label>
          <el-select
            v-model="form.regionNm"
            value-key="unitCodes"
            @change="selectDept"
            style="width: 100%;"
          >
            <el-option
              v-for="(item,index) in deptList"
              :key="index"
              :label="item.unitNames"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否跨行" :label-width="formLabelWidth" v-if="isShow">
          <label slot="label">
            <span class="red">*</span>是否跨行
          </label>
          <el-radio-group v-model="form.IntrBnk_IndCd">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'0'">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toMarkDraft">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// 导入通用表格
import tTable from "@/components/table/tTable";
// 导入部门机构选择组件
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "markDraft",
  components: {
    tTable
  },
  
  data() {
    return {
      queryParams: {
        id: ""
      },
      departParams: {},
      activeTabName: "", // 选择的tab
      // table表
      // 全部表
      tableData_alls: [], // 全部表的数据.对象数组
      // 待办表
      tableData_flow_doing: [], // 待办表的数据.对象数组
      // 已办表
      tableData_flow_done: [], // 已办表的数据
      // 办结表
      tableData_done: [], // 办结表的数据
      // TODO:以后有接口文档后修改填充数据的字段prop里的值
      flowTableCols: [
        { label: "申请时间", prop: "cdate" },
        { label: "编号", prop: "documentNo" },
        { label: "申请单位", prop: "yzDept" },
        { label: "刻制印章名称", prop: "yzNewname" },
        { label: "刻制日期", prop: "carvDate" },
        { label: "当前环节", prop: "currentNode" },
        { label: "操作人", prop: "currentUser" }
      ],
      doneTableCols: [
        { label: "申请时间", prop: "cdate" },
        { label: "编号", prop: "documentNo" },
        { label: "申请单位", prop: "yzDept" },
        { label: "刻制印章名称", prop: "yzNewname" },
        { label: "刻制日期", prop: "carvDate" }
      ],
      pagination_alls: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      pagination_flow_doing: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      pagination_flow_done: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      pagination_done: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      allsBtnsList: [
        { name: "搜索", type: "search", show: true },
        { name: "重置", type: "reset", show: true }
      ],
      flowDoingBtnsList: [{ name: "起草", type: "qicao", show: true }],
      // 弹框相关参数
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        IntrBnk_IndCd: "", // 是否跨行 '0'-否 '1'-是
        regionId: "", // 申请单位(部门)编号
        regionNm: "" // 申请单位(部门)名称
      },
      deptList: [],
      isShow: false,
      formItem: {
        documentNo: "",
        draftDepartmentId: "",
        yzNewname: "",
        createStartDate: "",
        createEndDate: "",
        carvStartDate: "",
        carvEndDate: ""
      },
      dateData: {
        createDate: [],
        carvDate: []
      }
    };
  },
  computed: {},
  watch: {
    "dateData.createDate": function(newVal) {
      this.formItem.createStartDate = newVal[0];
      this.formItem.createEndDate = newVal[1];
    },
    "dateData.carvDate": function(newVal) {
      this.formItem.carvStartDate = newVal[0];
      this.formItem.carvEndDate = newVal[1];
    }
  },
  methods: {
    /* 拟稿机构弹框 */
    // 拟稿机构弹框——申请单位选择
    selectDept(val) {
      console.log(val);
      this.departParams = val;
      var data = this.form.regionNm;
      this.form.regionId = data.firstUnitId; // 申请单位(机构)编号
      this.form.regionNm = data.firstUnitName; // 申请单位(机构)名称
    },
    // 拟稿机构弹框——确认
    toMarkDraft() {
      let IntrBnk_IndCd = this.form.IntrBnk_IndCd, // 跨行标志 '0'-行内 '1'-跨行
        regionId = this.form.regionId, // 申请单位(机构)编号
        regionNm = this.form.regionNm; // 申请单位(机构)名称
      if (regionId === "") {
        this.$message({ message: "请先选择申请单位！", type: "warning" });
        return;
      }
      if (this.isShow && IntrBnk_IndCd === "") {
        this.$message({ message: "请先选择是否跨行！", type: "warning" });
        return;
      }
      let _extraQuery = {
        IntrBnk_IndCd: IntrBnk_IndCd == "" ? "0" : IntrBnk_IndCd.toString(), // 跨行标志 '0'-行内 '1'-跨行
        regionId: regionId, // 申请单位(部门)编号
        regionNm: regionNm, // 申请单位(部门)名称
        regionList: JSON.stringify(this.deptList)
      };
      this.toSealDraftPage("new", null, _extraQuery); // 跳转到刻制页面
      // 隐藏“选择拟稿机构弹框”
      this.dialogFormVisible = false;
    },

    handleClick(tab, event) {
      console.log("tabs标签页切换:", tab, event);
      let name = tab.name; // 选择的标签页名字。alls-全部 flow_doing-待办 flow_done-已办 done-完结
      this.activeTabName = name;
      this.doQuery(name);
    },
    // 查询
    doQuery(status) {
      // 全部
      if (status === "alls") {
        this.getAllsTableData()
          .then(res => {
            res.data.forEach(item => {
              if (item.beAuthUserName) {
                item.currentUser =
                  item.beAuthUserName + "（由" + item.currentUser + "授权）";
              }
            });
            this.tableData_alls = res.data;
            this.pagination_alls.total = res.total; // 总数量
          })
          .catch(err => {
            this.$message({
              message: "查询全部流转、完结数据失败！",
              type: "error"
            });
          });
        // 待办流转
      } else if (status === "flow_doing") {
        this.getDoingFlowTableData()
          .then(res => {
            res.data.forEach(item => {
              if (item.beAuthUserName) {
                item.currentUser =
                  item.beAuthUserName + "（由" + item.currentUser + "授权）";
              }
            });
            this.tableData_flow_doing = res.data;
            this.pagination_flow_doing.total = res.total; // 总数量
          })
          .catch(err => {
            this.$message({
              message: "查询待办流转数据失败！",
              type: "error"
            });
          });

        // 已办流转
      } else if (status === "flow_done") {
        this.getDoneFlowTableData()
          .then(res => {
            res.data.forEach(item => {
              if (item.beAuthUserName) {
                item.currentUser =
                  item.beAuthUserName + "（由" + item.currentUser + "授权）";
              }
            });
            this.tableData_flow_done = res.data;
            this.pagination_flow_done.total = res.total; // 总数量
          })
          .catch(err => {
            // 使用箭头符号函数，这儿this是vue实例对象；如果使用function(){},则this为undefined. todo:why
            this.$message({
              message: "查询已办流转数据失败！",
              type: "error"
            });
          });

        // 办结
      } else if (status === "done") {
        this.getDoneTableData()
          .then(res => {
            res.data.forEach(item => {
              if (item.beAuthUserName) {
                item.currentUser =
                  item.beAuthUserName + "（由" + item.currentUser + "授权）";
              }
            });
            this.tableData_done = res.data;
            this.pagination_done.total = res.total; // 总数量
          })
          .catch(err => {
            this.$message({
              message: "查询完结数据失败！",
              type: "error"
            });
          });
      }
    },

    /**
     * 跳转到刻制文档页面。可修改，可查看
     * @param {String} type 文档类型。有 new, modify, haveto, see三种
     * @param {Array} [selects] 可选，勾选的记录。对象数组
     * @param {Object} [extraQuery] 可选，额外的query参数对象，其可枚举的属性会复制到跳转query对象里
     */
    toSealDraftPage(type = "see", selects, extraQuery) {
      let query = {};
      this.queryParams.type = type;
      if (type === "new") {
        this.queryParams.departParams = this.departParams;
      }
      if (type !== "new") {
        if (!selects || selects.length === 0) {
          this.$message({ message: "请先勾选一条记录！", type: "warning" });
          return;
        }
        if (selects.length > 1) {
          this.$message({ message: "只能勾选一条记录！", type: "warning" });
          return;
        }
        this.queryParams.id = selects[0].id; // 印章刻制申请业务编号
        this.queryParams.saveStatus = selects[0].saveStatus;
        this.queryParams.regionList = JSON.stringify(this.deptList);
      }
      // 如果有额外的query参数对象，将其可枚举的属性复制到query对象里
      if (typeof extraQuery === "object") {
        Object.assign(this.queryParams, extraQuery);
      }
      // 跳转到刻制文档页面。 query相当于带查询参数?a=jk&b=2
      // this.$intent.goNewPage(this, {
      //   path: "/sealManage/markMgr/drafting",
      //   query: this.queryParams
      // });

      // 不允许多次打开同一个页面
      if(type !== "new") {
        this.handleOpenPage("/sealManage/markMgr/drafting", selects[0].id);
      }else {
        this.handleOpenPage("/sealManage/markMgr/drafting");
      }
    },
    // 点击按钮
    clickBtns(btnInfo) {
      console.log("点击的待办完结按钮的信息：", btnInfo);
      let name = btnInfo.type;
      if (name === "search") {
        this.doQuery("alls");
      } else if (name === "qicao") {
        this.dialogFormVisible = true; // 显示“选择拟稿机构弹框”
      } else if (name === "reset") {
        for (var key in this.formItem) {
          this.formItem[key] = "";
        }
        this.doQuery("alls");
      }
    },

    // 获取所有的流转和完结数据（点击全部标签页里的查询按钮）
    getAllsTableData() {
      this.formItem.clLx = "3";
      return this.$api.sealManage.markMgr.markList(this.formItem, {
        PAGE_JUMP: this.pagination_alls.pageNum,
        REC_IN_PAGE: this.pagination_alls.pageSize
      });
    },

    // 获取待办流转的数据（点击待办页流转里的查询按钮）
    getDoingFlowTableData() {
      var params = {
        clLx: "0"
      };
      return this.$api.sealManage.markMgr.markList(params, {
        PAGE_JUMP: this.pagination_flow_doing.pageNum,
        REC_IN_PAGE: this.pagination_flow_doing.pageSize
      });
    },

    // 获取已办流转的数据（点击已办流转里的查询按钮）
    getDoneFlowTableData() {
      var params = {
        clLx: "1"
      };
      return this.$api.sealManage.markMgr.markList(params, {
        PAGE_JUMP: this.pagination_flow_done.pageNum,
        REC_IN_PAGE: this.pagination_flow_done.pageSize
      });
    },

    // 获取办结的数据（点击办结里的查询按钮）
    getDoneTableData(selectYear) {
      var params = {
        clLx: "2"
      };
      return this.$api.sealManage.markMgr.markList(params, {
        PAGE_JUMP: this.pagination_done.pageNum,
        REC_IN_PAGE: this.pagination_done.pageSize
      });
    },

    // table表的方法.
    // 排序，换页时执行的方法
    loadTableData(val) {
      this.doQuery(val);
    },
    handleOpenPage(path, id, readType, flag) {
      
      let routeId =
        (localStorage.getItem("routeIdList") &&
          JSON.parse(localStorage.getItem("routeIdList"))) ||
        [];
        console.log('routeId',routeId)
      if (routeId.includes(id)) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已经打开了该页面!",
          duration: 1500
        });
        return;
      } 
      const routeData = this.$router.resolve({
        path: path,
        query: this.queryParams
      });
      window.open(routeData.href, "_blank");
      
    },
    // 点击table表的记录
    cellClick_alls(row) {
      console.log("点击全部的记录:", row);
      let _flag = row.finishTime
        ? "see"
        : row.listType == "2"
        ? "haveto"
        : "modify"; // 当前环节'A99'-办结
      this.toSealDraftPage(_flag, [row]);
    },
    cellClick_flow_doing(row) {
      console.log("点击待办的记录:", row);
      this.toSealDraftPage("modify", [row]);
    },
    cellClick_flow_done(row) {
      console.log("点击已办的记录:", row);
      this.toSealDraftPage("haveto", [row]);
    },
    cellClick_done(row) {
      console.log("点击办结的记录:", row);
      this.toSealDraftPage("see", [row]);
    },
    getDeptList() {
      this.$api.sealManage.markMgr
        .deptList()
        .then(res => {
          console.log(res);
          this.deptList = res.data;
        })
        .catch(err => {});
    },
    getUserMarkRole() {
      this.$api.sealManage.markMgr
        .getUserMarkRole()
        .then(res => {
          console.log("权限", res);
          this.buttonType = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    tableRowClassName(row) {
      if (row.isreadflag == "0") {
        return "warning-row";
      }
    }
  },
  // 生命周期created:组件实例创建完成，属性已绑定，但DOM还没生出。此时能取到data数据
  created: function() {
    // 选择流转待办页，并查询待办流转的记录
    this.activeTabName = "flow_doing";
    this.doQuery("flow_doing");
  },
  mounted: function() {
    this.isShow =
      JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000"
        ? false
        : true;
    this.getDeptList();
    this.getUserMarkRole();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.markDraft {
  min-height: 100vh;
}
</style>
