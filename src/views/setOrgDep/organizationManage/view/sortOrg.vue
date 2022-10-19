/**
* create by zx on 2020/9/22 19:58
* 类注释：
* 备注：
*/
<template>
  <div class="sortOrg">
    <p class="base-title">机构排序</p>
    <el-button @click="$router.back()" style="margin-bottom: 20px">关闭</el-button>
    <el-button type="primary" @click="save" style="margin-bottom: 20px">保存</el-button>
    <div class="box1">
      <div class="infotable">
        <m-table
          :isPagination="false"
          :sortable="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :isSingle="true"
          :isSelection="true"
          @select="selectRow"
          :isIndex="true"
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
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";

export default {
  name: "sortOrg",
  components: {
    mTable,
  },
  props: {},
  data () {
    return {
      searchData: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        unitClass: 1,
      },
      tableData: [],
      oldData: [],
      tableCols: [
        { label: "编号", prop: "orderBy" },
        { label: "机构简称", prop: "unitShort" },
        { label: "机构编码", prop: "unitCode" },
        { label: "机构全称", prop: "unitName" },
      ],
      selectRowData: {},
    };
  },
  computed: {},
  methods: {
    selectRow (row) {
      this.selectRowData = row;
    },
    save () {
      this.$api.setting.organization
        .sortOrg({ old: this.oldData, new: this.tableData })
        .then((res) => {
          this.loadData();
          this.selectRowData = {}
        });
    },
    btnUpMove () {
      this.makeUpMove(this.selectRowData, this.tableData);
    },
    btnDownMove () {
      this.makeDownMove(this.selectRowData, this.tableData);
    },
    btnTop () {
      this.makeTop(this.selectRowData, this.tableData);
    },
    btnBottom () {
      this.makeBottom(this.selectRowData, this.tableData);
    },
    loadData () {
      this.$api.setting.organization.getOrgList(this.searchData).then((res) => {
        this.tableData = res.data;
        this.tableData.splice(0, 1);
        this.oldData = deepClone(this.tableData);
      });
    },
    makeTop (selectArea, DataName) {
      debugger
      if (selectArea.index !== undefined) {
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
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
    makeBottom (selectArea, DataName) {
      if (selectArea.index !== undefined) {
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
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
    makeUpMove (selectArea, DataName) {
      debugger
      if (selectArea.index !== undefined) {
        const index = selectArea.index;
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
          message: "请选择数据",
        });
      }
    },
    makeDownMove (selectArea, DataName) {
      if (selectArea.index !== undefined) {
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
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
  },
  activated () { },
  mounted () { },
  created () {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
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
    position: fixed;
    top: 260px;
    left: 92%;
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
</style>
