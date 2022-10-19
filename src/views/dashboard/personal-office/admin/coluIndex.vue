<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-select v-model="formData.draftOrganid" placeholder="请选择总行" style="margin-right:20px">
        <el-option
          v-for="item in BankList"
          :key="item.id"
          :label="item.draftOrganid"
          :value="item.draftId"
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
      <el-button type="primary" @click="createData" style="margin:16px">新增</el-button>
      <el-button type="danger" @click="deleteData" style="margin:16px">删除</el-button>-->
      <el-tab-pane label="专栏" name="coluFir">
        <el-select v-model="formData.draftOrganid" placeholder="请选择总行" style="margin-right:20px">
          <el-option
            v-for="item in BankList"
            :key="item.id"
            :label="item.draftOrganid"
            :value="item.draftId"
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
        <el-button type="primary" @click="createData" style="margin:16px">新增</el-button>
        <el-button type="danger" @click="deleteData" style="margin:16px">删除</el-button>
        <m-table
          @refresh="loadDataFir()"
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
      <el-tab-pane label="栏目" name="coluSec">
        <el-select v-model="formData.draftOrganid" placeholder="请选择总行" style="margin-right:20px">
          <el-option
            v-for="item in BankList"
            :key="item.id"
            :label="item.draftOrganid"
            :value="item.draftId"
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

        <!-- <el-button type="primary" @click="check" style="margin:16px">查询</el-button>
        <el-button type="primary" @click="reset" style="margin:16px">重置</el-button>-->
        <el-button type="primary" @click="createData" style="margin:16px">新增</el-button>
        <el-button type="danger" @click="deleteData" style="margin:16px">删除</el-button>
        <m-table
          @refresh="loadDataSec()"
          @select="select"
          @cellClick="jumpdeal"
          size="medium"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableDataSec"
          :tableCols="tableColsSec"
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
      zlTitle: "", //标题
      zlWh: "", //文号
      BankList: [],
      ZLList: [],
      isShow: true,
      formData: {
        zlWh: "",
        zlTitle: ''
      },
      activeName: "coluFir",
      keys: "0",
      searchData: {},
      deleteArry: "",
      tableDataFir: [],
      tableDataSec: [],
      tableColsFir: [
        { label: "专栏标题", prop: "zlTitle" },
        { label: "文号", prop: "zlWh" },
        { label: "发布日期", prop: "publicDate" }
      ],
      tableColsSec: [{ label: "专栏栏目", prop: "zl" }],
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
    // 查询
    check() {
      console.log(this.formData, "chuan");
      if (this.activeName == "coluFir") {
        this.loadDataFir();
      } else if (this.activeName == "coluSec") {
        this.loadDataSec();
      } else {
        return;
      }
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
          name: "newcreateColumn",
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
          this.tableDataFir = res.data.listTwo || res.data;
          this.pagination.total = res.total;
          if (res.data.listOne) {
            this.BankList = JSON.parse(JSON.stringify(res.data.listOne));
            console.log(this.BankList);

            this.formData.draftOrganid = this.BankList.unitShort;
            this.formData.draftId = this.BankList.unitCode;
          }
          if (res.data.listtwo) {
            //第一次进入页面 列表请求
            // this.ZLList = res.data.listtwo;
            // this.formData.zlSslm = res.data.listtwo[0].zlSslm;
            this.$set(this.formData, "zlSslm", res.data.listtwo[0].zlSslm);
            // console.log(this.ZLList, "第一次进入页面 列表请求");
            console.log(
              this.formData.zlSslm,
              "this.formData.zlSslm 第一次进入页面 列表请求"
            );
            //从首页专栏入口进来 ， 要将返回的 draftOrganid draftOrganid zlSslm传参请求，才可以查到具体专栏的列表
            if (this.$route.query.zlSslm) {
              //从首页进来的
              // this.formData.zlSslm = this.$route.query.zlSslm;
              this.$set(this.formData, "zlSslm", this.$route.query.zlSslm);
              console.log(
                this.formData.zlSslm,
                "this.formData.zlSslm 从首页进来的"
              );
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
                  this.tableDataFir = res.data.listTwo || res.data;
                  this.pagination.total = res.total;
                  if (res.data.listOne) {
                    this.BankList = JSON.parse(
                      JSON.stringify(res.data.listOne)
                    );
                    console.log(this.BankList);

                    this.formData.draftOrganid = this.BankList.unitShort;
                    this.formData.draftId = this.BankList.unitCode;
                  }
                });
            }
          }
        });
    },
    loadDataSec() {
      this.$api.adminConfig
        .viewColumnConfig(
          {
            searchData: this.searchData,
            ...this.formData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.tableDataSec = res.data.list;
          // this.BankList=res.data.bank
          this.pagination.total = res.total;
        });
    },
    jumpdeal(val) {
      this.perLink = val;
      if (this.activeName == "coluFir") {
        // let homeEnter = this.$route.query.zlSslm?true:false
        this.$router.push({
          name: "createColumn",
          query: {
            rowData: JSON.stringify(val),
            isShow: this.isShow
            // homeEnter:homeEnter
          }
        });
      } else if (this.activeName == "coluSec") {
        this.$router.push({
          name: "columnConfig",
          query: {
            rowData: JSON.stringify(val)
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
        // this.$api.adminConfig.deleteColumn(
        //     {
        //         id:this.deleteArry
        //     }
        // ).then(res => {
        //     if(res.code=='SUCCESS'){
        //         this.loadDataFir()
        //     }
        // })
      } else if (this.activeName == "coluSec") {
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
                .deleteColumnConfig({ id: this.deleteArry })
                .then(res => {
                  if (res.code == "SUCCESS") {
                    this.$message({
                      type: "success",
                      message: "删除成功"
                    });
                    this.deleteArry = "";
                    this.loadDataSec();
                  }
                });
            })
            .catch(() => {});
        }
        // this.$api.adminConfig.deleteColumnConfig(
        //     {
        //         id:this.deleteArry
        //     }
        // ).then(res => {
        //     if(res.code=='SUCCESS'){
        //         this.loadDataSec()
        //     }
        // })
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
        case "coluSec":
          this.activeName = "coluSec";
          this.loadDataSec();
          break;
      }
      this.tabLabel = this.activeName;
    }
  },
  created() {
    this.$api.adminConfig.createColumn({}).then(res => {
      this.ZLList = JSON.parse(JSON.stringify(res.data));
      this.formData.zlSslm = res.data[0].zlSslm;
      console.log(this.ZLList);
    });
    this.activeName = this.$route.query.activeName
      ? this.$route.query.activeName
      : "coluFir";
    let a = this.$route.query.zlSslm ? this.$route.query.zlSslm : "";
    this.$set(this.formData, "zlSslm", a);
    this.zlWh = "〔" + new Date().getFullYear() + "〕";
    this.$set(this.formData, "zlWh", this.zlWh);
    console.log(this.zlWh, "this.zlWh");
    setTimeout(() => {

      this.loadDataFir();
    }, 0);

    //this.loadDataSec()
  }
};
</script>
  <style scoped lang="less">
</style>
