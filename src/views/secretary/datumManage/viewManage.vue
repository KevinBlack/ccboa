<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="流转" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
      <el-form style="margin-bottom:5px" label-width="120px" :model="formData">
        <el-row>
          <!-- 和查询页面相同的条件 -->

          <search-form ref="searchForm" :formData="formData" :formCfg="formCfg" @reset="reset" @submit="submit"
            @event="btnevent">
            <el-col :span="8">
              <select-org-or-dept @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'0'" style="width:100%;">
                <el-input type="text" readonly="readonly" placeholder="请选择" v-model="formData.draftOrgan"
                  suffix-icon="el-icon-arrow-down" />
              </select-org-or-dept>
            </el-col>

            <el-col :span="8">
              <el-form-item label="日期">
                <el-date-picker v-model="formData.activeDates" type="daterange" value-format="yyyy-MM-dd"
                  range-separator="-" style="width: 100%" start-placeholder="开始日期" end-placeholder="结束日期" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动类型">
                <el-select v-model="formData.activeType" placeholder="请选择">
                  <el-option v-for="item in activeTypeList" :key="item.index" :label="item" :value="item"
                    :disabled="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-input v-model="formData.listType" v-if="false"></el-input>
          </search-form>

          <!-- <el-col :span="8">
            <el-form-item label="日期">
              <el-date-picker
                v-model="formData.activeDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="-"
                style="width: 100%"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动名称">
                <el-input placeholder="请输入活动名称" v-model="formData.title"></el-input>
            </el-form-item>
          </el-col>
          <el-input v-model="formData.isFbbz" v-if="false"></el-input>
          <el-button type="primary" style="margin-left:20px;margin-bottom:16px;" @click="adminSearch">查询</el-button>-->
        </el-row>
      </el-form>

      <el-button type="danger" @click="delLinkMan" style="margin-bottom:5px">删除</el-button>
      <m-table @refresh="loadData" @cellClick="cellClick" @select="selectRow" :isIndex="true" size="medium"
        :searchData="formData" :tableData="tableData" :tableCols="tableCols" :pagination="pagination"
        :isSelection="true" :pageSizeList='[20,30,50,100,200,500]'></m-table>
    </el-tabs>

    <tree-person v-model="showOrgPer" :isSingle="isSingles" :humanType="humanType" :unitCode="unitCode"
      :unitClass="unitClass" @orgList="getperList" :selectDept="selectDept" :isNeedChild="isNeedChild"></tree-person>
  </div>
</template>

<script>
  import searchForm from "components/form/searchForm";
  import selectPerson from "components/tree/treeTansun";
  import mTable from "components/table/tTable";
  import selectOrgOrDept from "components/select/selectOrgOrDept";
  import treePerson from "components/tree/hldTree";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  const finshData = [
    // { label: "日期时间", prop: "activeDate", align: "center" },
    // { label: "活动名称", prop: "title", align: "center" },
    // { label: "活动类型", prop: "activeType", align: "center" },
    // { label: "地点", prop: "activeAddress", align: "center" },
    // { label: "参与人员", prop: "attendMemCn", align: "center" }
    {
      label: "日期时间",
      prop: "activeDate",
      align: "center",
      width: 150
    },
    {
      label: "活动名称",
      prop: "title",
      align: "center"
    },
    {
      label: "活动类型",
      prop: "activeType",
      align: "center",
      width: 100
    },
    {
      label: "地点",
      prop: "activeAddress",
      align: "center",
      width: 150
    },
    {
      label: "参与人员",
      prop: "attendMemCn",
      align: "center",
      width: 150
    }
  ];
  const banjiehData = [
    // { label: "日期时间", prop: "activeDate", align: "center" },
    // { label: "活动名称", prop: "title", align: "center" },
    // { label: "活动类型", prop: "activeType", align: "center" },
    // { label: "地点", prop: "activeAddress", align: "center" },
    // { label: "参与人员", prop: "attendMemCn", align: "center" },
    // { label: "当前环节", prop: "curNodeName", align: "center" },
    // { label: "操作人", prop: "currentUser", align: "center" },
    {
      label: "日期时间",
      prop: "activeDate",
      align: "center",
      width: 150
    },
    {
      label: "活动名称",
      prop: "title",
      align: "center"
    },
    {
      label: "活动类型",
      prop: "activeType",
      align: "center",
      width: 100
    },
    {
      label: "地点",
      prop: "activeAddress",
      align: "center",
      width: 150
    },
    {
      label: "参与人员",
      prop: "attendMemCn",
      align: "center",
      width: 150
    },
    {
      label: "当前环节",
      prop: "curNodeName",
      align: "center",
      width: 100
    },
    {
      label: "操作人",
      prop: "currentUser",
      align: "center",
      width: 100
    }
  ];
  export default {
    name: "viewManage",
    components: {
      mTable,
      searchForm,
      selectPerson,
      selectOrgOrDept,
      treePerson
    },
    mixins: [bianhanPublic],
    data() {
      return {
        showOrgPer: false,
        isSingles: false,
        isNeedChild: "yes",
        unitClass: 0,
        humanType: 3,
        unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        selectDept: [],
        //选择人员树
        needFirdLoad: true,
        treeData: [],
        seletOptionsData: [],
        offenUse: false,
        checkIds: [], //选中id列表
        checkData: [], //选中数据
        singelCheckF: false, // 单选true 多选为false
        dialogState: false, // 默认隐藏选择人员树结构
        dialogType: "next",
        dialogTypeNow: "next",
        activeTypeList: [], //活动类型参数组
        activeName: "tabs-wait",
        listData: [],
        formCfg: [{
            type: "input",
            prop: "title",
            label: "活动名称",
            span: 8
          },
          [{
              type: "input",
              prop: "attendMemCn",
              span: 22,
              style: {
                width: "80%"
              },
              disabled: true
            },
            {
              type: "button-primary",
              prop: "$selectPerson",
              value: "选择",
              disabled: this.isSave,
              style: {
                marginLeft: "16px"
              }
            },
            {
              type: "formitem",
              label: "参与人员"
            }
          ],
          {
            type: "input",
            prop: "attTitle",
            label: "附件名称",
            span: 24
          },
          {
            type: "input",
            prop: "otherKeyWords",
            label: "其他关键字",
            span: 24
          },
          [{
              type: "button-primary",
              prop: "$submit",
              value: "查询"
            },
            {
              type: "button-primary",
              prop: "$reset",
              value: "重置"
            },
            {
              type: "formitem",
              style: {
                "text-align": "center",
                "margin-left": "-120px"
              }
            }
          ]
        ],
        formData: {
          sort: "desc",
          sortKey: "activeDate",
          draftOrganId: JSON.parse(localStorage.getItem("userInfo")).unitId,
          draftOrgan: JSON.parse(localStorage.getItem("userInfo")).unitName,
          title: "",
          activeDates: []
        }, //表单数据
        tableData: [], //分页表格数据
        tableCols: banjiehData, //分页表格表头
        pagination: {
          pageNum: 1, //第几页
          total: 0, //共有条数
          pageSize: 20 //每页条数
        }
      };
    },
    computed: {},
    methods: {
      // 重置
      reset() {
        this.formData = {};
      },
      // 查询
      submit(params) {
        this.formData = params;
        this.loadData();
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
      //活动类型
      activeTypeRequest() {
        this.$api.activityInformation.TypeActivity().then(res => {
          this.activeTypeList = res.data;
        });
      },
      //查询按钮
      adminSearch() {
        this.loadData();
      },
      //机构组件事件
      selectOrg(org) {
        this.formData.draftOrganId = org.id;
        this.formData.draftOrgan = org.unitName;
        this.loadData();
      },
      loadData() {
        if (this.activeName == "tabs-wait") {
          this.formData.isFbbz = "0"; //流转  0:  办结1：
        }
        console.log(this.formData, "shuju");
        if (this.formData.activeDates && this.formData.activeDates.length != 0) {
          this.formData.activeDateStart = this.formData.activeDates[0];
          this.formData.activeDateEnd = this.formData.activeDates[1];
        } else {
          if (this.formData.activeDateStart) {
            delete this.formData.activeDateStart;
            delete this.formData.activeDateEnd;
          }
        }
        // delete this.formData.activeDate
        this.formData.listType = "";
        this.$api.activityInformation
          .ViewListActivity(this.formData, {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          })
          .then(res => {
            this.pagination.total = res.total;
            this.tableData = res.data;
          });
      },
      //tab标签
      handleTabsClick(tab, event) {
        this.pagination = {
          pageNum: 1, //第几页
          total: 0, //共有条数
          pageSize: 20 //每页条数
        };
        this.tableData = [];
        if (tab.index == 0) {
          this.tableCols = banjiehData;
          this.formData.isFbbz = "0";
        } else {
          this.tableCols = finshData;
          this.formData.isFbbz = "1";
        }
        this.loadData();
      },
      cellClick(row) {
        if (this.activeName == "tabs-wait") {
          this.hasOpened(row.id, {
            path: "/secretary/datumManage/viewCirculationDetail",
            'query': {
              'data': row.id,
              type: "viewCirculationDetail"
            }
          })
        } else if (this.activeName == "tabs-end") {
          this.hasOpened(row.id, {
            path: "/secretary/datumManage/viewFinishDetail",
            'query': {
              'data': row.id,
              type: "viewFinishDetail"
            }
          })
        }
      },
      //删除
      delLinkMan() {
        if (this.listData.length >= 1) {
          let strList = [];
          this.listData.forEach(item => {
            strList.push(item.id);
          });
          this.$api.activityInformation
            .deletActivity({
              id: strList.join(",")
            })
            .then(res => {
              this.loadData();
              this.$message({
                type: "success",
                message: "删除成功！"
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: "请选择数据"
          });
        }
      },
      //复选框
      selectRow(rows) {
        this.listData = rows;
      }
    },
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
