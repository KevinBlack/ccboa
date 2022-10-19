<template>
  <div>
    <el-tabs v-model="moduleId" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in tabList"
        :label="item.label"
        :name="item.name"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <fd-form :data="formData" :columns="formCfg" @event="btnevent"></fd-form>
    <div style="width:100%;height:20px;"></div>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import FdForm from "vue-elementui-freedomen/components/form";

export default {
  name: "letterTemplate",
  components: {
    mTable,
    FdForm,
  },
  data() {
    return {
      optionsData: [],
      portType: "ADICS2026",
      loadPortType: "ADICS2026",
      moduleId: "字典维护",
      deleteArry: [],
      tabLabel: "",
      tableData: [],
      tableCols: [
        { label: "类别编码", prop: "dicCode" },
        { label: "类别名称", prop: "codeName" },
        { label: "创建时间", prop: "dicStartTime" },
        { label: "最后修改时间", prop: "dicEndTime" },
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
      tabList: [
        { name: "字典维护", label: "字典维护" },
        { name: "数据维护", label: "数据维护" },
      ],
      searchData: {},
      formCfg: [],
      formData: {},
      optionList: [],
      deleteId: [],
    };
  },
  methods: {
    initData() {
      if (this.moduleId == "字典维护") {
        this.formCfg = [
          [
            {
              type: "input",
              prop: "codeName",
              placeholder: "请输入类别名称",
              style: { marginRight: "20px", width: "20%" },
              span: 4,
            },
            {
              type: "button-primary",
              prop: "createData",
              span: 2,
              value: "新建",
              style: { marginRight: "20px" },
            },
            {
              type: "button-primary",
              prop: "searchData",
              span: 2,
              value: "查询",
              style: { marginRight: "20px" },
            },
            {
              type: "button-primary",
              prop: "deleteData",
              span: 2,
              value: "删除",
              style: { marginRight: "20px" },
            },
          ],
        ];
      } else if (this.moduleId == "数据维护") {
        this.formCfg = [
          [
            {
              type: "select",
              prop: "isCodeName",
              options: this.optionsData.join(","),
              style: { marginRight: "20px" },
            },
            {
              type: "button-primary",
              prop: "createData",
              span: 2,
              value: "新建",
              style: { marginRight: "20px" },
            },
            {
              type: "button-primary",
              prop: "deleteData",
              span: 2,
              value: "删除",
              style: { marginRight: "20px" },
            },
          ],
        ];
      }
    },
    handleClick(tab, event) {
      switch (tab.name) {
        case "字典维护":
          this.formData.isCodeName = "";
          this.formData.isCodeType = "";
          this.portType = "ADICS2026";
          this.loadPortType = "ADICS2026";
          this.loadData();
          this.initData();
          break;
        case "数据维护":
          this.portType = "ADICS2030";
          this.loadPortType = "ADICS2030";
          this.loadData();
          this.initData();
          break;
      }
      this.tabLabel = this.moduleId;
    },
    loadData() {
      if (this.formData.isCodeName) {
        this.optionList &&
          this.optionList.map((item) => {
            if (item.isCodeName == this.formData.isCodeName) {
              this.formData.isCodeType = item.isCodeType;
            }
          });
      }
      this.$api.setSysConfig
        .dictTable(
          this.loadPortType,
          {
            searchData: this.searchData,
            ...this.formData,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total;
          let opArr = [];
          if (this.moduleId == "字典维护") {
            this.tableData = res.data;
          } else if (this.moduleId == "数据维护") {
            this.tableData = res.data.two || res.data;
            if (res.data.one && res.data.one.length > 0) {
              this.optionList = deepClone(res.data.one);
              this.optionList &&
                this.optionList.map((item) => {
                  if (item.iscodeName != "") {
                    opArr.push(item.isCodeName);
                  }
                });
              this.optionsData = deepClone(opArr);
            }
          } else {
            return;
          }
          this.initData();
        });
    },
    cellClick(row) {
      console.log("----row---->", row);
      switch (this.moduleId) {
        case "字典维护":
          this.$router.push({
            name: "dictionaryPre",
            query: { rowData: row },
          });
          break;
        case "数据维护":
          this.$router.push({
            name: "dictionaryDataPre",
            query: { rowData: row },
          });
          break;
      }
    },
    select(row) {
      let dataArry = [];
      let dataArryId = [];
      row.map(function (value, index) {
        dataArry.push(value.dicId);
        dataArryId.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
      this.deleteId = dataArryId.join(",");
    },
    //删除
    deleteData() {
      switch (this.moduleId) {
        case "字典维护":
          this.portType = "ADICS2027";
          this.goDelete();
          break;
        case "数据维护":
          this.portType = "ADICS2031";
          this.goDelete();
          break;
      }
    },
    goDelete() {
      if (this.deleteArry.length > 0) {
        this.$confirm("是否删除选中数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.setSysConfig
              .dictDelete(this.portType, {
                dicId: this.deleteArry,
                id: this.deleteId,
              })
              .then((res) => {
                if (res.code == "SUCCESS") {
                  this.$message({
                    type: "success",
                    message: "删除成功",
                  });
                  this.loadData();
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          type: "warning",
          message: "请选择需要删除的数据",
        });
      }
    },
    btnevent(params) {
      if (params.prop == "searchData") {
        this.loadData();
      } else if (params.prop == "isCodeName") {
        this.loadData();
      } else {
      }
      switch (params.value) {
        case "新建":
          switch (this.moduleId) {
            case "字典维护":
              this.$router.push({
                name: "dictionaryPre",
                query: { titleLabel: "字典维护" },
              });
              break;
            case "数据维护":
              let seleData = {
                isCodeName: this.formData.isCodeName,
                isCodeType: this.formData.isCodeType,
                titleLabel: "数据维护",
              };
              this.$router.push({
                name: "dictionaryDataPre",
                query: { seleData: seleData },
              });
              break;
          }
          break;
        case "删除":
          this.deleteData();
          break;
        case "查询":
          break;
      }
    },
  },
  created() {
    this.loadData();
    this.initData();
  },
};
</script>
<style scoped lang="less">
</style>
