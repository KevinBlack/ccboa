<template>
  <div>
      <el-button type="primary" @click="downData">下载</el-button>
      <el-button type="danger" @click="del">删除</el-button>
      <m-table
        @select="selectRow"
        @refresh="loadData()"
        @cellClick="cellClick"
        :isSelection="true"
        :searchData="searchData"
        size="medium"
        :sortable="true"
        :isPagination="true"
        :isHandle="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
      ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
export default {
  name: "dutyTable",
  components: {
    mTable,
  },
  data() {
    return {  
      searchData: {
        sort: "desc",
        sortKey: "uploadTime",
      },
      tableData: [],
      listData: [],
      tableCols: [
        { label: "上传时间", prop: "uploadTime" },
        { label: "单位", prop: "unitName" },
        { label: "文件", prop: "attName" },
        { label: "状态", prop: "sendState" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      sonselect: 0,
    };
  },
  methods: {
    //点击列表条详情
    cellClick(row) {
      this.$api.duty.dutyDataQuery({ id: row.id }).then((res) => {
        console.log("hahhahahh",res)
        this.$router.push({
        path: "/secretary/dutyRoster/dutyFormworkDetail",
        query: {
          isAdd: JSON.stringify(true),
          detail: JSON.stringify(res.data),
        },
      });
      })
    },
    // 删除
    del() {
      let arr = [];
      this.listData.map((item) => {
        arr.push(item.id);
      });
      if (this.listData.length>=1) {
        this.$api.duty.OnDutydelBook({ id: arr.join(",") }).then((res) => {
          this.loadData();
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
          });
      }else {
        this.$message({
          type: 'warning',
          message: '请选择数据'
        })
      }
    },
    // 下载
    downData() {
      if (this.listData.length === 0) {
        this.$message({
          type: "warning",
          message: "请先选择数据",
        });
      } else if (this.listData.length > 1) {
        this.$message({
          type: "warning",
          message: "一次只能下载一个文件",
        });
      } else {
        let box = {};
        box.fileName = this.listData[0].attName;
        box.filePath = this.listData[0].attPath;

        this.downFile(box);
      }
    },
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then((res) => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState() ? location.origin : "") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
              // location.href =
              //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              //     res.filePath +
              //     "&fileName=" +
              //     res.fileName;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500,
              });
            }
          }
        });
    },
    selectRow(rows) {
      this.listData = rows;
    },
    loadData() {
      this.$api.duty
        .OnDutyList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          res.data.map((item) => {
            if (item.sendState === "1") {
              item.sendState = "草稿";
            } else if (item.sendState === "2") {
              item.sendState = "已报送";
            }
          });
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },

  },
  created() {
    this.loadData();
  },
};
</script>
<style scoped lang="less">

</style>