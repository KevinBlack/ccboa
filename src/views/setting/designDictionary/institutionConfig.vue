<!--
 * @Author: nwl
 * @Date: 2020-08-04 17:15:18
 * @LastEditTime: 2020-10-16 14:11:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\otherconfig\designElementSetting.vue
-->
<template>
  <div class="content">
    <p class="base-title">机构配置</p>
    <div class="btn-list">
      <el-button type="primary" @click="editordata">保存</el-button>
    </div>
    <div class="box1">
      <div class="infotable">
        <fd-form :data="formData1" :columns="formCfg1" ref="fdForm"></fd-form>
        <m-table
          @refresh="loadData"
          @select="selectData"
          :searchData="searchData"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :isSelection="true"
          :isIndex="true"
          @cellClick="cellClick"
          indexLabe="序号"
        ></m-table>
      </div>

      <div class="btn-aside">
        <div class="bottom">
          <el-button type="primary" plain @click="btnAdd" :disabled="canAdd">添加</el-button>
          <el-button type="primary" plain @click="btnUpdate">更新</el-button>
          <el-button type="primary" plain @click="btnDel">删除</el-button>
          <el-button type="primary" plain @click="btnUpMove">上移</el-button>
          <el-button type="primary" plain @click="btnDownMove">下移</el-button>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "@/components/table/tTable";

export default {
  name: "designElementSetting",
  components: {
    FdForm,
    mTable,
  },
  data() {
    return {
      canAdd: false,
      selectIndex: "",
      rows: [],
      searchData: {},
      formData1: {},
      formCfg1: [
        {
          type: "input",
          label: "类别text",
          prop: "unitTypeName",
          rule: ["must", "trim"],
          span: 8,
        },
        {
          type: "input",
          label: "类别value",
          prop: "unitLevelName",
          rule: ["must", "trim"],
          span: 8,
        },
        {
          type: "select",
          prop: "orgLevel",
          rule: ["must", "trim"],
          span: 8,
          options: { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5" },
          label: "机构级别",
        },
      ],
      tableCols: [
        { label: "机构类别text", prop: "unitTypeName" },
        { label: "机构类别value", prop: "unitLevelName" },
        { label: "机构级别", prop: "orgLevel" },
      ],
      tableData: [],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$api.designDictionary
        .getOrgList(
          { orgConfig: this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    editordata() {
      this.$api.designDictionary
        .updateOrgList({ orgConfig: this.tableData })
        .then((res) => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.loadData();
        });
    },
    selectData(rows) {
      this.rows = rows;
    },
    cellClick(row) {
      this.canAdd = true;
      this.formData1 = row;
      this.selectIndex = row.index;
    },
    btnAdd() {
      this.$refs.fdForm.submit().then((res) => {
        this.tableData.push(JSON.parse(JSON.stringify(this.formData1))); //新增数据push到表格数组
        this.$refs.fdForm.reset();
        this.formData1 = { unitTypeName: "", unitLevelName: "", orgLevel: "" };
      });
    },
    btnUpdate() {
      this.$refs.fdForm.submit().then((res) => {
        console.log("------->", this.selectIndex);
        if (this.selectIndex != -1) {
          let startIndex = this.selectIndex;
          this.tableData.splice(
            startIndex,
            1,
            JSON.parse(JSON.stringify(this.formData1))
          );
          this.canAdd = false;
          this.$message({
            type: "success",
            message: "更新成功",
          });
          this.$refs.fdForm.reset();
          this.formData1 = {
            unitTypeName: "",
            unitLevelName: "",
            orgLevel: "",
          };
          this.selectIndex = -1;
        } else {
          this.$message({
            type: "warning",
            message: "请单击需要更新的数据",
          });
        }
      });
    },
    btnDel() {
      if (this.rows.length > 0) {
        this.$confirm("是否要删除选中的文档？").then(() => {
          let ids = [];
          this.rows.forEach((item) => {
            item.id && ids.push(item.id);
          });
          if (ids.length > 0) {
            this.$api.designDictionary
              .deleteOrgList({ ids: ids })
              .then((res) => {
                this.loadData();
                this.rows = [];
              });
          } else {
            this.loadData();
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择要删除的数据",
        });
      }
    },
    btnUpMove() {
      this.makeUpMove(this.rows, this.tableData);
    },
    btnDownMove() {
      this.makeDownMove(this.rows, this.tableData);
    },
    makeUpMove(selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据",
          });
          return;
        }
        const index = selectArea[0].index;
        if (index == 0) {
          this.$message({
            type: "warning",
            message: "第一条数据不可以上移！",
          });
          return;
        }
        DataName[index] = DataName.splice(index - 1, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "上移成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "你没有选中数据",
        });
        return;
      }
    },
    makeDownMove(selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据",
          });
          return;
        }
        const index = selectArea[0].index;
        if (index == DataName.length - 1) {
          this.$message({
            type: "warning",
            message: "最后一条数据不可以下移！",
          });
          return;
        }
        DataName[index] = DataName.splice(index + 1, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "下移成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "你没有选中数据",
        });
        return;
      }
    },
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  line-height: 36px;

  .base-title {
    width: 100%;
    margin: 16px 0px;
    text-align: center;
    color: #3b85f0;
    font-size: 28px;
    font-weight: bolder;
  }

  .btn-list {
    margin-bottom: 20px;
  }

  .box {
    margin: 0 auto;
  }

  .box1 {
    width: 100%;
    height: 100%;
    display: flex;

    .infotable {
      width: 92%;
    }

    .btn-aside {
      display: flex;
      flex-direction: column;

      .top {
        height: 116px;
        display: flex;
        justify-content: center;

        .el-button {
          height: 36px;
        }
      }

      .bottom {
        flex: 1;
        //  background: red;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-button {
          margin: 8px;
        }

        #btnfirst {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
