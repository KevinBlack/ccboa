/**
* create by zx on 2020/8/6 14:57
* 类注释：
* 备注：
*/
<template>
  <div class="vierPerList">
    <div class="infotable">
      <m-table
        :isPagination="false"
        :sortable="false"
        :isSingle="true"
        @refresh="loadData()"
        @cellClick="cellClick"
        size="medium"
        :isSelection="true"
        :tableHandles="tableHandles"
        :isIndex="true"
        @select="select"
        :isHandle="true"
        :searchData="searchData"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
      ></m-table>
    </div>
    <div class="btn-aside">
      <div class="bottom">
        <el-button type="primary" plain @click="btnUpMove">上移</el-button>
        <el-button type="primary" plain @click="btnDownMove">下移</el-button>
        <el-button type="primary" plain @click="btnTop">置顶</el-button>
        <el-button type="primary" plain @click="btnBottom">置底</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";

export default {
  name: "vierPerList",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      selectRows: [],
      searchData: {},
      tableData: [],
      oldData: [],
      tableCols: [
        // { label: "排序", prop: "index" },
        { label: "群组名", prop: "groupName" },
        { label: "群组成员", prop: "groupMembersCns" },
      ],
      selectRowData: {},
      pagination: {
        pageNum: 1,
        total: 10,
      },
      tableHandles: [
        {
          label: "删除",
          type: "danger",
          handle: () => {
            this.deleteSelect();
          },
        },
        {
          label: "保存",
          type: "primary",
          handle: () => {
            this.save();
          },
        },
      ],
    };
  },
  computed: {},
  methods: {
    select(row) {
      this.selectRowData = row;
    },
    btnUpMove() {
      this.makeUpMove(this.selectRowData, this.tableData);
    },
    btnDownMove() {
      this.makeDownMove(this.selectRowData, this.tableData);
    },
    btnTop() {
      this.makeTop(this.selectRowData, this.tableData);
    },
    btnBottom() {
      this.makeBottom(this.selectRowData, this.tableData);
    },
    makeTop(selectArea, DataName) {
      const index = selectArea.index;
      if (index == 0) {
        this.$message({
          type: "warning",
          message: "第一条数据不可以上移！",
        });
        return;
      }
      DataName.unshift(DataName[index]);
      DataName.splice(index + 1, 1);
      // DataName[index] = DataName.splice(0, 1, DataName[index])[0];
      this.$message({
        title: "成功",
        message: "置顶成功",
        type: "success",
      });
    },
    makeBottom(selectArea, DataName) {
      const index = selectArea.index;
      if (index == DataName.length - 1) {
        this.$message({
          type: "warning",
          message: "最后一条数据不可以置底！",
        });
        return;
      }
      DataName.push(DataName[index]);
      DataName.splice(index, 1);
      // DataName[index] = DataName.splice(DataName.length - 1, 1, DataName[index])[0];
      this.$message({
        title: "成功",
        message: "下移成功",
        type: "success",
      });
    },
    makeUpMove(selectArea, DataName) {
      const index = selectArea.index;

      if (index == 0) {
        this.$message({
          type: "warning",
          message: "第一条数据不可以上移！",
        });
        return;
      }
      DataName[index] = DataName.splice(index - 1, 1, DataName[index])[0];
      //   console.log(DataName.splice(index - 1, 1, DataName[index])[0])
      this.$message({
        title: "成功",
        message: "上移成功",
        type: "success",
      });
    },
    makeDownMove(selectArea, DataName) {
      const index = selectArea.index;
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
    },

    loadData() {
      this.$api.dailyWork.getVierList().then((res) => {
        this.tableData = res.data;
      });
     
    },
    //删除
    deleteSelect() {
      console.log(this.selectRowData);
      //   if (this.selectRows.length === 0) {
      //     return;
      //   }
      let ids = [];
      ids.push(this.selectRowData.id);

      this.selectRows.forEach((item) => {
        ids.push(item.id);
      });
      this.$api.dailyWork.deleteVierPer({ ids: ids }).then((res) => {
        this.loadData();
      });
    },

    save() {
      console.log(this.oldData);
      console.log(this.tableData);
      let obj = {
        oldData: this.oldData,
        tableData: this.tableData,
      };
      this.$api.dailyWork.saveSort(obj).then((res) => {
        this.$message({
          type: "success",
          message: "保存成功！",
        });
      });
    },
    cellClick(row) {
      this.$router.push({
        path: "/dashboard/personalOffice/sysConfig/createGroup",
        query: {
          detail: JSON.stringify(row),
          isAdd: JSON.stringify(false),
        },
      });
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.vierPerList {
  width: 100%;
  height: 100%;
  min-height: 80vh;
  display: flex;
  .infotable {
    width: 92%;
  }
  .btn-aside {
    position: fixed;
    top: 260px;
    left: 92%;
    display: flex;
    flex-direction: column;
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
</style>
