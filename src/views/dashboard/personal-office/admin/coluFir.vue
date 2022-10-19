<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-select v-model="formData.draftOrganid" placeholder="请选择总行" style="margin-right:20px">
        <el-option
          v-for="item in BankList"
          :key="item.unitCode"
          :label="item.unitCode"
          :value="item.unitShort"
          no-data-text="请选择"
        ></el-option>
      </el-select>
      <span style="margin-left:20px"></span>
      <el-select
        v-model="formData.zlSslm"
        placeholder="请选择发文专栏"
        @change="checkchange($event)"
        v-if="this.activeName=='coluFir'"
      >
        <el-option
          v-for="item in ZLList"
          :key="item.id"
          :label="item.zlSslm"
          :value="item.zlSslm"
          no-data-text="请选择"
        ></el-option>
      </el-select>
      <span style="margin-left:20px"></span>

      <el-input placeholder="请输入专栏标题" v-model="formData.zlTitle" style="width: 180px;"></el-input>
      <span style="margin-left:20px"></span>
      <el-input v-model="formData.zlWh" style="width: 180px;"></el-input>

      <el-button type="primary" @click="check" style="margin:16px">查询</el-button>
      <el-button type="primary" @click="reset" style="margin:16px">重置</el-button>
      <el-button type="primary" @click="createData" style="margin:16px" v-show="showFlg">新增</el-button>
      <el-button type="danger" @click="deleteData" style="margin:16px" v-show="showFlg">删除</el-button>

      <el-tab-pane label="专栏" name="coluFir">
        <m-table
          @refresh="loadData()"
          @select="select"
          @cellClick="jumpdeal"
          size="medium"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableDataFir"
          :tableCols="tableColsFir"
          :pagination="pagination"
          :isSelection="true"
          :searchData="searchData"
        ></m-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

  <script >
import mTable from "@/components/table/tTable";

export default {
  name: "linkTable",
  components: {
    mTable
  },
  data() {
    return {
      isShow: false,
      showFlg: false,
      colufirFlg: false,
      BankList: [],
      ZLList: [],
      formData: {},
      activeName: "coluFir",
      keys: "0",
      searchData: {},
      deleteArry: "",
      tableDataFir: [],

      tableColsFir: [
        { label: "专栏标题", prop: "zlTitle" },
        { label: "文号", prop: "zlWh" },
        { label: "发布日期", prop: "publicDate" }
      ],

      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20
      },
      perLink: {}
    };
  },
  methods: {
    reset() {
      // this.formData = {
      //   zlTitle: "",
      //   zlWh: "〔" + new Date().getFullYear() + "〕",
      //   zlSslm: this.$route.query.zlSslm,
      //   draftOrganid: this.BankList[0].draftOrganid,
      //   draftId: this.BankList[0].draftId
      // };
      this.formData.zlTitle = "";
      this.formData.zlWh = "〔" + new Date().getFullYear() + "〕";
    },
    check() {
      this.loadData();
      // console.log(this.formData, "chuan");
      // if (this.activeName == "coluFir") {
      //   this.loadDataFir();
      // } else if (this.activeName == "coluSec") {
      //   this.loadDataSec();
      // } else {
      //   return;
      // }
    },
    checkchange(event) {
      console.log(event, "xZAZA");
      // this.formData.zlSslm = event.target.value
      // if (this.activeName == "coluFir") {
      //   this.loadDataFir();
      // } else {
      //   return;
      // }
    },
    createData() {
      if (this.activeName == "coluFir") {
        this.$router.push({
          name: "createColumn",
          query: {}
        });
      } else if (this.activeName == "coluSec") {
        this.$router.push({
          name: "columnConfig",
          query: {}
        });
      } else {
      }
    },
    loadDataFir() {
      this.$api.adminConfig.createColumn({}).then(res => {
        console.log("rrrrrrr",res)
        // this.tableDataFir = res.data.listthree || res.data;
        // this.pagination.total = res.total;
        // if (res.data.listOne) {
        this.ZLList = JSON.parse(JSON.stringify(res.data));
        console.log(this.ZLList);

        //   this.formData.draftOrganid = this.BankList[0].draftOrganid;
        //   this.formData.draftId = this.BankList[0].draftId;
        // }
      });
      // createColumn
      //this.formData.zlSslm = this.$route.query.zlSslm ? this.$route.query.zlSslm :this.ZLList[0].zlSslm
      // console.log("*************this.formData", this.formData);
      // console.log("*************this.searchData", this.searchData);
      // this.$api.adminConfig
      //   .viewColumn(
      //     {
      //       searchData: this.searchData,
      //       ...this.formData
      //     },
      //     {
      //       PAGE_JUMP: this.pagination.pageNum,
      //       REC_IN_PAGE: this.pagination.pageSize
      //     }
      //   )
      //   .then(res => {
      //     console.log("人事",res.data)
      //     this.tableDataFir = res.data.listthree || res.data;
      //     this.pagination.total = res.total;
      //     if (res.data.listOne) {
      //       this.BankList = JSON.parse(JSON.stringify(res.data.listOne));
      //       this.formData.draftOrganid = this.BankList[0].draftOrganid;
      //       this.formData.draftId = this.BankList[0].draftId;
      //     }
      //     if (res.data.listtwo) {
      //       this.ZLList = res.data.listtwo;
      //       this.$set(this.formData, "zlSslm", res.data.listtwo[0].zlSslm);
      //       console.log("字典1",this.formData)
      //       console.log("**********zlSslm*", this.$route.query.zlSslm);
            // if (this.$route.query.zlSslm) {
            //   this.$set(this.formData, "zlSslm", this.$route.query.zlSslm);
            //   this.$api.adminConfig
            //     .viewColumn(
            //       {
            //         searchData: this.searchData,
            //         ...this.formData
            //       },
            //       {
            //         PAGE_JUMP: this.pagination.pageNum,
            //         REC_IN_PAGE: this.pagination.pageSize
            //       }
            //     )
            //     .then(res => {
            //       this.tableDataFir = res.data.listthree || res.data;
            //       this.pagination.total = res.total;
            //       if (res.data.listOne) {
            //         this.BankList = JSON.parse(
            //           JSON.stringify(res.data.listOne)
            //         );
            //         this.formData.draftOrganid = this.BankList[0].draftOrganid;
            //         this.formData.draftOrganid = this.BankList[0].draftId;
            //       }
            //     });
            // }
        //   }
        // });
    },
    loadData() {
      if(!this.$route.query.zlSslm) {
        this.$api.adminConfig.createColumn({}).then(res => {
          this.ZLList = JSON.parse(JSON.stringify(res.data));
          this.$set(this.formData, "zlSslm", res.data[0].zlSslm);
        });
      }
      console.log('dddddddsssss',this.formData)
      setTimeout(() => {
        this.$api.adminConfig
        .viewColumn(
          {
            searchData: this.searchData,
            zlSslm: this.formData.zlSslm,
            zlWh: this.formData.zlWh,
            zlTitle: this.formData.zlTitle
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log('11222122',res.data)
          this.tableDataFir = res.data.listTwo || res.data;
          this.pagination.total = res.total;
          if (res.data.listOne) {
            this.BankList = JSON.parse(JSON.stringify(res.data.listOne));
            console.log(this.BankList);
            this.formData.draftOrganid = this.BankList.unitShort;
            this.formData.draftId = this.BankList.unitCode;
          }
          // if (res.data.listtwo) {
          //   // this.ZLList = res.data.listtwo;
          //   this.$set(this.formData, "zlSslm", res.data.listtwo[0].zlSslm);
          // }
        });
      }, 0);

    },
    jumpdeal(val) {
      this.perLink = val;
      if (this.activeName == "coluFir") {
        //   let homeEnter = this.$route.query.zlSslm?true:false
        this.$router.push({
          name: "createColumn",
          query: {
            rowData: JSON.stringify(val),
            isShow: this.isShow
            //   homeEnter:homeEnter
          }
        });
      } else {
      }
    },
    deleteData() {
      if (this.activeName == "coluFir") {
        if (!this.deleteArry) {
          this.$message({
            type: "warning",
            message: "请选择数据"
          });
        } else {
          this.$confirm("是否确定删除当前数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.adminConfig
                .deleteColumn({ id: this.deleteArry })
                .then(res => {
                  if (res.code == "SUCCESS") {
                    this.$message({
                      type: "success",
                      message: "删除成功"
                    });
                    this.deleteArry = "";
                    this.loadDataFir();
                  }
                });
            })
            .catch(() => {});
        }
      } else {
        return;
      }
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
    },
    handleClick(tab, event) {
      switch (tab.name) {
        case "coluFir":
          this.activeName = "coluFir";
          this.loadDataFir();
          break;
      }
      this.tabLabel = this.activeName;
    }
  },
  mounted() {
    JSON.parse(localStorage.getItem("tcHumanRole")).forEach(value => {
      if (value.codeName === "系统管理员" || value.codeName === "业务管理员") {
        console.log(value, "进循环了");
        this.showFlg = true;
      }
    });
  },
  watch: {
    // 监听行别
    "$route.query.zlSslm": {
      handler(val) {
        let a = this.$route.query.zlSslm ? this.$route.query.zlSslm : "";
        this.$set(this.formData, "zlSslm", a);
        console.log(this.formData.zlSslm, "更改了");
        // this.loadDataFir();
        this.loadData();
      },
      immediate: true
    }
  },
  created() {
    // if(this.$route.query.zlSslm == "问责公示"){
    //   window.open("http://eip.ccb.com/ccbeip/2c77c2ecbd88431ba54d64b4f9671399/cbe33797e5b54aa8a468de7118c4c1dd/wzxxgsl/index.shtml","_blank")
    //   return
    // }else{
    this.activeName = this.$route.query.activeName
      ? this.$route.query.activeName
      : "coluFir";
    let a = this.$route.query.zlSslm ? this.$route.query.zlSslm : "";
    this.$set(this.formData, "zlSslm", a);

    this.zlWh = "〔" + new Date().getFullYear() + "〕";
    this.$set(this.formData, "zlWh", this.zlWh);
    // this.formData.zlWh = this.zlWh
    console.log(this.zlWh, "this.zlWh");
    // this.loadDataFir();
    this.loadData();
    setTimeout(() => {
      this.loadDataFir();
    }, 0);
    // }

  }
};
</script>
  <style scoped lang="less">
</style>
