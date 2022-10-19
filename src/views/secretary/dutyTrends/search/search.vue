<!--
 * @Author: your name
 * @Date: 2021-08-25 10:45:24
 * @LastEditTime: 2021-09-10 21:41:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0917fenku\src\views\secretary\dutyTrends\search\search.vue
--> 
/**
* 类注释：
* 备注：秘书工作－值班动态－查询
*/
<template>
  <div class="search">
    <!--    导出查询数据   必须放于最上边(以防与下边的table的id冲突)-->
    <export-excel
      v-show="false"
      :tableData="excelTableData"
      :tableCols="tableCols"
      :excelTitle="excelTitle"
      :startExport="startExport"
    ></export-excel>
    <el-form ref="searchForm" :model="formData" label-width="100px" class="demo-ruleForm mt20">
      <el-row style="margin-bottom: 10px">
        <el-col :span="12">
          <el-form-item label="类型:">
            <el-radio-group v-model="formData.flagType" @change="flagTypeChange">
              <el-radio label="1">稿件</el-radio>
              <el-radio label="2">发布</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="formData.flagType=='1'?'来稿时间':'发布日期'">
            <el-date-picker
              v-model="value1"
              type="daterange"
              style="width:100%"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="expireTimeOption"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px" v-if="formData.flagType=='1'">
        <el-col :span="12">
          <el-form-item label="稿件状态">
            <el-checkbox-group v-model="flagState">
              <el-checkbox v-for="item in flagStateBoxs" :key="item.value" :label="item.label"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报送单位">
            <el-input v-model="formData.submitUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="栏目名称">
            <el-col :span="2">
              <el-checkbox v-model="checked" @change="isAll">全部</el-checkbox>
            </el-col>
            <el-col :span="22">
              <el-checkbox-group v-model="colNm">
                <el-checkbox v-for="item in colNmBoxs" :key="item.id" :label="item.columnCategory"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="24">
          <el-form-item label="关键字">
            <el-input v-model="formData.keyWord"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align: center;margin-bottom: 10px;" :span="24">
          <el-button type="primary" @click="submit">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-col>
        <el-col :span="24" style="text-align:right;margin-bottom: 10px;">
          <el-button type="primary" align="right" @click="exportTables">导 出</el-button>
          <el-button
            type="primary"
            align="right"
            v-if="formData.flagType=='2'"
            @click="collection"
          >批量收藏</el-button>
        </el-col>
      </el-row>
    </el-form>
    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      size="medium"
      :isIndex="true"
      :sortable="false"
      @select="selectRow"
      :isSelection="true"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :pageSizeList="[20, 30, 50, 100, 200, 500]"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import exportTable from "@/minixs/exportTable";
import exportExcel from "components/viewFlow/exportDataExcel1";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  name: "dutyTrendsSearch",
  components: {
    mTable,
    exportExcel,
  },
  props: {},
  mixins: [bianhanPublic],
  data() {
    return {
      excelTableData: [],
      tipData: "", //导出数据时间段
      startExport: false, //判断是否开始导出数据
      excelTitle: "值班动态查询",
      // 当日日期之后的日期禁选
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() > Date.now();
        },
      },
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      value1: [],
      flagState: [],
      colNm: [],
      formData: {
        flagType: "1",
        draftBeginDate: "",
        draftEndDate: "",
        flagState: "",
        submitUnit: "",
        colNm: "",
        keyWord: "",
      },
      flagStateBoxs: [
        {
          value: 1,
          label: "备选稿件",
        },
        {
          value: 4,
          label: "成刊稿件",
        },
        {
          value: 5,
          label: "错情稿件",
        },
      ],
      humanId: JSON.parse(localStorage.getItem("userInfo")).humanId,
      colNmBoxs: [],
      checked: false,
      selectIds: [],
      tableData: [],
      tableCols: [
        { label: "来稿时间", prop: "createDate" },
        {
          label: "投稿刊物",
          prop: "submitPublication",
        },
        { label: "投稿栏目", prop: "submitColumn" },
        { label: "投稿单位", prop: "submitUnit" },
        {
          label: "投稿部门",
          prop: "submitDept",
        },
        {
          label: "稿件状态",
          prop: "gjStatus",
        },
        {
          label: "发布日期",
          prop: "publishDate",
          formatter(row) {
            return row.publishDate ? row.publishDate.split(" ")[0] : "";
          },
        },
      ],
      tableCols1: [
        { label: "来稿时间", prop: "createDate" },
        {
          label: "投稿刊物",
          prop: "submitPublication",
        },
        { label: "投稿栏目", prop: "submitColumn" },
        { label: "投稿单位", prop: "submitUnit" },
        {
          label: "投稿部门",
          prop: "submitDept",
        },
        {
          label: "稿件状态",
          prop: "gjStatus",
        },
        {
          label: "发布日期",
          prop: "publishDate",
          formatter(row) {
            return row.publishDate ? row.publishDate.split(" ")[0] : "";
          },
        },
      ],
      tableCols2: [
        { label: "标题", prop: "title" },
        {
          label: "发布日期",
          prop: "publishDate",
          formatter(row) {
            return row.publishDate ? row.publishDate.split(" ")[0] : "";
          },
        },
      ],
      // formCfg: [],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    reset() {
      this.flagState = [];
      this.colNm = [];
      let type = this.formData.flagType;
      this.formData = {
        flagType: type,
        draftBeginDate: "",
        draftEndDate: "",
        flagState: "",
        submitUnit: "",
        colNm: "",
        keyWord: "",
      };
      this.checked = false;
      this.value1 = [];
      this.tableData = [];
    },
    collection() {
      if (this.selectIds.length == 0) {
        this.$message({
          message: "请勾选数据",
          type: "warning",
        });
        return;
      }
      this.$api.duty.dutyTrendsSearchCollect({ ids:this.selectIds }).then((res) => {
         this.downFile(res);
      });
    },
    downFile(file,title) {
      console.log('下载log',file,title)
      let bank_doDownloadFile = {function: "doDownloadFile"}
      bank_doDownloadFile.fileName =!!title? file.fileName+title:file.fileName;      
      bank_doDownloadFile.filePath = file.filePath;
      let reFileName=!!title? title+file.fileName:file.fileName;
      this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
        .then(res => {
          if (res && res.success) {
            downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              res.filePath +
              "&fileName=" +
              res.fileName, reFileName);
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "下载失败",
              duration: 500
            });
          }
        })
    },
    selectRow(rows) {
      this.selectIds = [];
      rows.map((item) => {
        this.selectIds.push(item.id);
      });
    },
    isAll() {
      if (this.checked == true) {
        this.colNm = [];
        this.colNmBoxs.forEach((item) => {
          this.colNm.push(item.columnCategory);
        });
      } else {
        this.colNm = [];
      }
    },
    submit() {
      let that = this;
      that.pagination = {
        pageNum: 1,
        pageSize: 20,
      };
      if (that.value1.length > 0) {
        that.formData.draftBeginDate = formatData(
          that.value1[0].getTime(),
          "YYYY-MM-DD HH:mm:ss"
        );
        that.formData.draftEndDate =
          formatData(that.value1[1].getTime(), "YYYY-MM-DD") + " 23:59:59";
      }
      let flagStateArr = [];
      // let colNmArr = [];
      let flagStateStr = "";
      let colNmStr = "";
      if (that.formData.flagType == "1") {
        console.log(that.flagStateBoxs);
        that.flagStateBoxs.filter(function (n) {
          if (that.flagState.indexOf(n.label) != -1) {
            flagStateArr.push(n.value);
          }
        });
        flagStateArr.forEach((item) => {
          if (item == 1) {
            item = "1','2','3";
          } else if (item == 4) {
            item = "4','6";
          }
          flagStateStr += "'" + item + "'" + ",";
        });
        that.formData.flagState = flagStateStr
          ? flagStateStr.slice(0, flagStateStr.length - 1)
          : "";
        this.colNm.forEach((item) => {
          colNmStr += "'" + item + "'" + ",";
        });
        that.formData.colNm = colNmStr
          ? colNmStr.slice(0, colNmStr.length - 1)
          : "";
        // that.colNmBoxs.filter(function (n) {
        //   if (that.colNm.indexOf(n.label) != -1) {
        //     colNmArr.push(n.value);
        //   }
        // });
      } else {
        delete that.formData.flagState;
        delete that.formData.submitUnit;
        delete that.formData.colNm;
        that.formData.humanId = that.humanId;
      }
      console.log(that.formData);
      this.loadData();
    },
    loadData(type) {
      if (!type) {
        this.pagination.pageNum = 1;
      }
      this.$api.duty
        .dutyTrendsSearch(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          console.log(9999, res);
          this.tableData = res.selectAllManuscriptList;
          this.pagination.total = res.total;
          // this.result = res.list
        });
    },
    exportTables() {
      this.excelTableData = this.tableData;
      if (this.excelTableData.length == 0) {
        return;
      }
      this.excelTableData.map((item) => {
        if (item.publishDate) {
          item.publishDate = item.publishDate.split(" ")[0];
        }
      });
      console.log(this.excelTableData);
      this.excelTitle =
        "值班动态查询" + formatData(new Date().getTime(), "YYYYMMDD");
      this.$nextTick(() => {
        this.startExport = true;
      });
      setTimeout(() => {
        this.startExport = false;
      }, 2000);
    },
    cellClick(row) {
      if (this.formData.flagType == "1") {
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/dutyTrends/search/searchDtail",
        //   query: { id: row.id, gjStatus: row.gjStatus },
        // });
        this.hasOpened(row.id, {
          'path': "/secretary/dutyTrends/search/searchDtail",
          'query': {
            'id': row.id,
            'gjStatus': row.gjStatus
          }
        })
      } else {
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/dutyTrends/search/searchDtail1",
        //   query: { id: row.id },
        // });
        this.hasOpened(row.id, {
          'path': "/secretary/dutyTrends/search/searchDtail1",
          'query': {
            'id': row.id,
          }
        })
      }
    },
    flagTypeChange() {
      if (this.formData.flagType == "1") {
        this.tableCols = this.tableCols1;
        this.flagState = [];
        this.colNm = [];
      } else {
        this.tableCols = this.tableCols2;
        this.checked = false;
      }
      this.tableData = [];
    },
  },
  // watch: {
  //   formData: {
  //     handler(newVal, oldVal) {
  //       if (newVal.flagType == "1") {
  //         this.tableCols = this.tableCols1;
  //         this.flagState = [];
  //         this.colNm = [];
  //       } else {
  //         this.tableCols = this.tableCols2;
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  activated() {},
  mounted() {},
  created() {
    this.$api.duty.getSubmitColumnData({ type: "1" }).then((res) => {
      console.log(9999, res);
      this.colNmBoxs = res.columnCategoryList;
    });
  },
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
.mt20 {
  padding: 20px 5px 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
  margin-bottom: 20px;
}
.mtdown {
  padding: 20px 0 80px 0;
}
</style>