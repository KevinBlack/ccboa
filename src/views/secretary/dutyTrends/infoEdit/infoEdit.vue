<!--
 * @Author:zj
 * @Date: 2020-06-19 15:58:18
 * @LastEditTime: 2021-01-08 18:18:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\system-manage\index.vue
-->
<template>
  <div class="organizationView">
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="按日期查看" name="tabs-lookByDate"></el-tab-pane>
      <el-tab-pane label="按部门/分行查看" name="tabs-lookByDeptAndBankBranch"></el-tab-pane>
      <el-tab-pane label="按栏目查看" name="tabs-lookByColumns"></el-tab-pane>
    </el-tabs>

    <!-- @description: 按照日期查看  -->
    <el-form>
      <el-row style="margin-bottom: 10px;width:100%" :gutter="5" v-if="activeName=='tabs-lookByDate'">
        <el-col :span="6">
          <el-form-item label="日期">
            <el-date-picker v-model="formData.dateStr" style="margin-let:20px" @change="change"
              value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="状态">
            <el-select v-model="formData.submitStatus" placeholder="请选择" @change="change">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="joinEdit">加入编辑稿件</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- @description: 按照部门/分行查看  -->

    <el-row style="margin-bottom:10px;" :gutter="20" v-if="activeName=='tabs-lookByDeptAndBankBranch'">
      <el-col :span="5">
        <select-org-or-dept　:orgOrDeptId="'0'" @select="selectOrg">
          <el-input type="text" readonly="readonly" placeholder="请选择机构" v-model="searchData1.orgName"
            suffix-icon="el-icon-arrow-down" />
        </select-org-or-dept>
      </el-col>
      <el-col :span="5">
        <select-org-or-dept @select="selectDept" :orgOrDept="0" :orgOrDeptId="searchData1.unitCode">
          <el-input readonly type="text" placeholder="请选择部门" v-model="searchData1.unitSearchName"
            suffix-icon="el-icon-arrow-down" />
        </select-org-or-dept>
      </el-col>

      <el-form>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="formData.submitStatus" placeholder="全部" @change="change">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <!-- @description: <el-button type="primary" @click="toFind()">查询</el-button>  -->
          <el-button type="primary" @click="joinEdit">加入编辑稿件</el-button>
        </el-col>
      </el-form>
    </el-row>

    <!-- @description: 按照栏目查看  -->
    <el-form>
      <el-row style="margin-bottom: 10px" :gutter="5" v-if="activeName=='tabs-lookByColumns'">
        <el-col :span="6">
          <el-form-item label="日期">
            <el-date-picker @change="change" v-model="formData.dateStr" style="margin-let:20px"
              value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="栏目类别">
            <el-select v-model="formData.submitColumn" placeholder="请选择" @change="change">
              <el-option v-for="item in columnCategoryItems" :key="item.index" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="joinEdit">加入编辑稿件</el-button>
        </el-col>
      </el-row>
    </el-form>

    <div class="list">
      <m-table ref="infoEditDataTable" @refresh="loadData" :isIndex="true" :isSelection="true" :isHandle="false"
        :searchData="searchData" :tableData="tableData" :tableCols="tableCols" @cellClick="cellClick"
        @select="selectRow" :pagination="pagination"></m-table>
    </div>
  </div>
</template>

<script>
  import mTable from "components/table/tTable";
  import selectOrgOrDept from "components/select/selectOrgOrDept";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  export default {
    /** @description: 系统一规范 */
    name: "orgManageView",
    components: {
      mTable,
      selectOrgOrDept,
    },
    mixins: [bianhanPublic],
    props: {},
    data() {
      const {
        activeName
      } = this.$route.query || {}
      const {
        formData
      } = this.$route.params || {}
      return {
        pagination: {
          pageNum: 1,
          pageSize: 20,
          total: 0,
        },
        /** @description: 来自路由参数 的 条件参数 */
        formDataFromParams: formData,
        selectId: [],
        activeName: activeName || "tabs-lookByDate",
        options1: [{
            value: "0",
            label: "全部",
          },
          {
            value: "1",
            label: "已加入编辑稿件",
          },
          {
            value: "2",
            label: "已编辑",
          },
          {
            value: "3",
            label: "未编辑",
          },
        ],

        columnCategoryItems: [],
        searchData: {},
        searchData1: {},
        tableData: [],
        tableCols: [{
            label: "拟稿日期",
            prop: "createDate"
          },
          {
            label: "报送内容",
            prop: "content"
          },
          {
            label: "来稿时间",
            prop: "submitDate"
          },
          {
            label: "报送单位",
            prop: "submitUnit"
          },
          {
            label: "状态",
            prop: "submitStatus"
          },
        ],
        formData: {},
      };
    },
    filters: {},
    computed: {},
    created() {
      this.searchData1 = {
        orgName: this.currentUserInfo.shortUnitName,
        unitCode: this.currentUserInfo.unitId,
        orgCode: this.currentUserInfo.unitId,

        unitClass: 1,
      }
      this.formData = {
        flag: 1,
        flagType: 1,
        /** @description: 按部门查看 */
        organId: this.currentUserInfo.unitId,
        organName: this.currentUserInfo.unitName,
        /** @description: submitStatus: 0, */
        deptId: "",
        deptName: "",
        dateStr: this.getCurrentDateTime(),
        submitStatus: "0",
        ...(this.formDataFromParams || this.formData)
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      change() {
        this.toFind();
      },
      selectRow(row) {
        this.selectId = row;
      },
      joinEdit() {
        if (this.selectId.length === 0) {
          this.$message({
            message: "请选择数据",
            type: "warning",
          });
        } else {
          let ids = [];
          this.selectId.map((item) => {
            ids.push(item.id);
          });

          this.$api.duty
            .joinEdit({
              ids: this.getStrFromListAndSeparator(ids),
              route: "1"
            })
            .then((res) => {
              this.$message({
                message: "操作成功！",
                type: "success",
              });
              /** @description: 刷新页面，取消勾选 */
              this.loadData();
            });
        }
      },
      /** @description: 选择部门 */
      selectDept(dept) {
        /** @description: this.searchData.unitSearchName = dept.unitName; */
        this.$set(this.searchData1, "unitSearchName", dept.unitName);
        this.formData.deptId = dept.id;
        this.formData.deptName = dept.unitName;
        this.searchData1.flagType = 2;

        this.toFind();
      },
      toFind() {
        this.loadData();
      },
      handleTabsClick(tab) {
        this.tableData = [];

        if (tab.index == 0) {
          this.formData.flag = 1;
          this.formData.submitStatus = "0";
          this.loadData();
        } else if (tab.index == 1) {
          this.formData.flag = 2;
          this.formData.dateStr = "";
          this.formData.submitStatus = "0";
          this.loadData();
        } else if (tab.index == 2) {
          this.getCheckbox();
          this.formData.flag = 3;
          this.formData.dateStr = "";
          this.formData.submitColumn = "";
          this.loadData();
        }
      },
      /** @description: 选择机构 */
      selectOrg(org) {
        console.log("org", org);
        this.searchData1.orgName = org.unitName;
        this.searchData1.organId = org.id;
        this.searchData1.unitCode = org.id;
        this.formData.deptId = "";
        this.formData.deptName = "";
        this.searchData1.unitSearchName = "";
        this.searchData1.flagType = 1;
        this.toFind();
      },
      loadData(isRefresh, pagination) {
        this.commonLoadListData(this.$refs.infoEditDataTable, pagination, {
          ...(this.formData || {}),
          ...(this.searchData1 || {}),
          ...(this.searchData || {}),
        }, null, this.$api.duty.getInfoEditList, res => {
          this.tableData = res.list;
          this.pagination.total = res.total;
        })
      },
      getCheckbox() {
        this.$api.duty.getSubmitColumnData({
          columnType: "1",
          type: "1"
        }).then((res) => {
          this.columnCategoryItems = res && res.columnCategoryList && res.columnCategoryList.map(item => {
            return {
              key: item.id,
              value: item.id,
              label: item.columnCategory
            }
          })
        })
      },
      cellClick(row) {
        /** @description: const memberNo = row.memberNo; */
        // this.$intent.goNewPage(this, {
        //   name: "mamuscriptInfoEditDetail",
        //   query: {          
        //     /** @description: 来源路由名 据此中详情页中导航回来*/
        //     sourceRouteName: 'dutyTrendsIternativeManuscript',
        //     activeName: this.activeName,
        //     detail1: JSON.stringify(row),
        //   },
        //   params: {
        //     formData: {
        //       ...(this.formData || {})
        //     },
        //   }
        // });
        this.hasOpened(row.id, {
          'name': "mamuscriptInfoEditDetail",
          'query': {
            'id': row.id,
            'sourceRouteName': 'dutyTrendsIternativeManuscript',
            'activeName': this.activeName,
            'detail1': JSON.stringify(row),
          },
          params: {
            formData: {
              ...(this.formData || {})
            },
          }
        })
      },
    },
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  /deep/ .el-form-item__content {
    display: inline-block;
    width: 60%;
  }

  /deep/ .el-form-item {
    margin-left: 20px;
  }

  /*.list {
    margin: 25px 0px 50px;
    float: right;
    width: 80%;
  }

  .leftTree {
    float: left;
    width: 20%;
    margin-top: 25px;
  }*/

</style>
