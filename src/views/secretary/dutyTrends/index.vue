<template>
  <div class="index">
    <el-tabs v-model="actionTabsName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="tabs_all"></el-tab-pane>
      <el-tab-pane label="待办" name="tabs_todo"></el-tab-pane>
      <el-tab-pane label="已办" name="tabs_doing"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs_end"></el-tab-pane>
      <el-col class="mt20end">
        <el-button v-show="actionTabsName === 'tabs_todo'" type="primary" @click="addData">拟稿</el-button>
      </el-col>
    </el-tabs>
    <div v-show="actionTabsName !== 'tabs_end'">
      <m-table ref="infoSendDataListTable" @refresh="loadData" @cellClick="cellClick"
        :tableRowClassNames="tableRowClassName" size="medium" :searchData="searchData" :isIndex="true" :isHandle="false"
        :tableData="tableData" :tableCols="tableCols" :isSelection="true" :pagination="pagination"></m-table>
    </div>
    <div v-show="actionTabsName === 'tabs_end'">
      <m-table ref="infoSendDataListTable" @refresh="loadData" @cellClick="cellClick" size="medium"
        :searchData="searchData" :isIndex="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols1"
        :isSelection="true" :pagination="pagination"></m-table>
    </div>
    <el-dialog title="请选择拟稿部门" :visible.sync="dialogFormVisible">
      <el-form ref="submitDeptForm" style="margin:0 10%" :model="formData">
        <el-form-item label="投稿部门" :rules="{ required: true, message: '请选择拟稿部门', trigger: 'blur' }" prop="submitDept">
          <el-select v-model="formData.submitDept" placeholder="请选择" style="width:50%">
            <el-option v-for="item in submitDeptData" :key="item.value" :label="item.unitNames" :value="item.unitNames">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import mTable from "components/table/tTable";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  export default {
    name: "index",
    components: {
      mTable,
    },
    mixins: [bianhanPublic],
    data() {
      const {
        activeName
      } = this.$route.query || {}
      return {
        pagination: {
          pageNum: 1,
          pageSize: 20,
          total: 0,
        },
        formData: {
          submitDept: ""
        },
        submitDeptData: [],
        dialogFormVisible: false,
        /** @description: 表格数据 */
        tableData: [],
        searchData: {},
        /** @description: 表头 */
        tableCols: [{
            label: "拟稿日期",
            prop: "createDate"
          },
          {
            label: "投稿栏目",
            prop: "submitColumn"
          },
          {
            label: "投稿单位",
            prop: "submitUnit"
          },

          {
            label: "当前环节",
            prop: "currentNode"
          },
          {
            label: "当前处理人",
            prop: "currentUser"
          },
        ],
        tableCols1: [{
            label: "报送时间",
            prop: "createDate"
          },
          {
            label: "投稿栏目",
            prop: "submitColumn"
          },
          {
            label: "投稿单位",
            prop: "submitUnit"
          },

        ],
        /** @description: 默认待办 */
        actionTabsName: activeName || "tabs_todo",
      };
    },
    computed: {
      /** @description: tabs类型 */
      tabsType() {
        /** @description: 0 全部 1 待办 2 已办 3 办结 */
        switch (
          this.actionTabsName /** @description: 待办时显示拟稿按钮 其余不显示 */
        ) {
          case "tabs_all":
            return '0'
          case "tabs_todo":
            return '1'
          case "tabs_doing":
            return '2'
          case "tabs_end":
            return '3'
        }
      }
    },
    watch: {},
    mounted() {
      this.loadData()
      this.getSubmitDept()
    },
    methods: {
      tableRowClassName(row) {
        if (
          (row.isRead == "0" || row.isRead == '') &&
          this.actionTabsName === 'tabs_todo'
        ) {
          return "warning-row";
        } else {
          return "";
        }
      },
      // 取消
      cancel() {
        this.dialogFormVisible = false
      },
      // 确定
      handleSure() {
        this.submitDeptData.forEach(element => {
          console.log(element, "element")
          if (element.unitNames == this.formData.submitDept && element.firstUnitName) {
            this.formData.submitDept = element.firstUnitName
            this.formData.submitDeptId = element.firstUnitId
            console.log(this.formData.submitDept, "this.formData.submitDept")
          }
        });

        this.$refs.submitDeptForm.validate((valid) => {
          if (valid) {
            this.$intent.goNewPage(this, {
              name: 'dutyTrendsSendHandle',
              query: {
                /** @description: 来源路由名 据此中详情页中导航回来*/
                sourceRouteName: 'dutyTrendInfoSend',
                submitDept: this.formData.submitDept,
                submitDeptId: this.formData.submitDeptId,
                activeName: this.actionTabsName,
                type: "add"
              },
            });
          }
        })

      },
      /** @description: 获取投稿部门数据源 */
      getSubmitDept() {
        this.$api.duty.getSubmitDeptData().then((res) => {
          const submitDeptData = res && res.departList || [{}];
          this.submitDeptData = submitDeptData
          console.log("获取投稿部门", res.departList, submitDeptData);
        });
      },
      /** @description: tab切换 点击处理 */
      handleTabsClick(tab) {
        if (this.actionTabsName.name == "tabs_end") {
          this.tableCols = deepClone(this.tableCols1);
        }
        this.loadData()
      },
      /** @description: 拟稿 */
      addData() {
        this.dialogFormVisible = true
      },
      /** @description: 获取表格数据 */
      loadData(isRefresh, pagination) {
        this.commonLoadListData(this.$refs.infoSendDataListTable, pagination, {
          filterState: this.tabsType,
          ...(this.searchData || {})
        }, null, this.$api.duty.informationTransList, res => {

          res.list.forEach(element => {
            console.log(element, "element")
            element.createDate.split(" ")
            element.createDate = element.createDate.split(" ")[0]
          });

          this.tableData = res.list;
          this.pagination.total = res.total;

        })
      },
      /** @description: 换行点击事件 */
      cellClick(row) {
        if (this.actionTabsName === "tabs_todo") {
          console.log("代办");
          // this.$intent.goNewPage(this, {
          //   name: "dutyTrendsSendHandle",
          //   query: {   
          //     /** @description: 来源路由名 据此中详情页中导航回来*/
          //     sourceRouteName: "dutyTrendInfoSend",
          //     activeName: this.actionTabsName,
          //     id: row.id,
          //     flag: row.flag,
          //     type: "detail",
          //     tabsType: this.tabsType
          //   },
          // });
          this.hasOpened(row.id, {
            'name': "dutyTrendsSendHandle",
            'query': {
              sourceRouteName: "dutyTrendInfoSend",
              activeName: this.actionTabsName,
              id: row.id,
              flag: row.flag,
              type: "detail",
              tabsType: this.tabsType
            }
          })
        } else if (
          this.actionTabsName === "tabs_doing" ||
          this.actionTabsName === "tabs_end"
        ) {
          console.log("已办办结");
          this.$intent.goNewPage(this, {
            path: "/sendHandleDone",
            query: {
              /** @description: 来源路由名 据此中详情页中导航回来*/
              sourceRouteName: "dutyTrendInfoSend",
              activeName: this.actionTabsName,
              data: JSON.stringify(row),
              type: "detail",
              tabsType: this.tabsType,
              showFlg: "fei"
            },
          });
        } else if (this.actionTabsName === "tabs_all") {
          /** @description: 全部 代办 */
          if (row.currentUserStatus === "1") {
            this.$intent.goNewPage(this, {
              name: "dutyTrendsSendHandle",
              query: {
                /** @description: 来源路由名 据此中详情页中导航回来*/
                sourceRouteName: "dutyTrendInfoSend",
                activeName: this.actionTabsName,
                id: row.id,
                type: "detail",
                tabsType: this.tabsType
              },
            });
          } else if (["2", "3"].includes(row.currentUserStatus)) {
            /** @description: 全部 已办办结 */
            this.$intent.goNewPage(this, {
              path: "/sendHandleDone",
              query: {
                /** @description: 来源路由名 据此中详情页中导航回来*/
                sourceRouteName: "dutyTrendInfoSend",
                activeName: this.actionTabsName,
                data: JSON.stringify(row),
                type: "detail",
                tabsType: this.tabsType
              },
            });
          }
        }
      },
    },
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  .mt20end {
    margin: 20px 0;
  }

  .mt20 {
    padding: 20px 0 0 0;
    position: relative;
    border: 1px solid #f0f0f0;
  }

</style>
