/**
* create by zx on 2020/7/24 14:24
* 类注释：领导活动安排查询
* 备注：
*/
<template>
  <div class="selectLeaderActivity">
    <div class="formHeader">
      <div class="title-text">领导活动安排查询</div>
    </div>
    <!-- <fd-form style="margin:0 10%" :data="formData" @submit="submit" :columns="formCfg"></fd-form> -->
    <el-form
      :model="form"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-top:20px;"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="活动名称" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="活动地点" prop="activeAddress">
            <el-input v-model="form.activeAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主持行领导">
            <el-input v-model="form.attendBankLeader"></el-input>

            <!-- <el-select v-model="form.attendBankLeader" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.leaderHumanId"
                :label="item.leaderCnName"
                :value="item.leaderHumanId"
              ></el-option>
            </el-select>-->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="活动类型" prop="draftDate">
            <el-select v-model="form.activeType" placeholder="请选择活动区域">
              <el-option
                :label="item.activeType"
                :value="item.activeType"
                v-for="(item,index) in types"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开始日期" prop="startDate">
            <el-date-picker
              v-model="form.startDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束日期" prop="endDate">
            <el-date-picker
              v-model="form.endDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="submit">查询</el-button>
          <el-button @click="rest">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div style="float:right;margin-bottom:20px;">
      <el-button type="primary" @click="Export">导出</el-button>
      <el-button type="danger" @click="dellist">删除</el-button>
    </div>

    <m-table
      id="table"
      @refresh="loadData"
      :isHandle="false"
      :sortable="false"
      :isPagination="true"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      @cellClick="cellClick"
      @select="select"
      :searchData="searchData"
      :pageSizeList="[20, 30, 50, 100, 200, 500]"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "@/components/table/tTable";
import exportTable from "@/minixs/exportTable";
import bianhanPublic from "@/minixs/bianhan"; //引入用于调用hasOpened

export default {
  name: "selectLeaderActivity",
  components: {
    // FdForm,
    mTable
  },
  mixins: [bianhanPublic],
  props: {},
  data() {
    return {
      searchData: {},
      form: {
        title: "", //标题
        startDate: "", //开始日期
        startTime: "", //开始时间
        endTime: "", //结束时间
        activeAddress: "", //活动地址
        activeType: "", //活动类型
        currentLeaderEn: "", //行领导
        attendBankLeader: "" // 主持行领导
      },
      tableCols: [
        { label: "日期时间", prop: "startDate", width: 200 },
        { label: "活动名称", prop: "title" },
        { label: "活动类型", prop: "activeType", width: 200 },
        { label: "地点", prop: "activeAddress", width: 200 },
        { label: "主持行领导", prop: "currentLeaderEn", width: 200 }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      pagination1: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      tableData: [],
      options: [],
      deleteArry: "", //删除集合
      typedata: {
        startDate: "", //开始时间
        endDate: "", //结束时间
        attendBankLeader: "", //行领导
        leaderCheckedValue: ""
      },
      types: []
    };
  },
  computed: {},
  methods: {
    // 获取类型
    typechushi() {
      this.$api.secreatary.activety
        .tongjilist(
          { ...this.typedata },
          {
            PAGE_JUMP: this.pagination1.pageNum,
            REC_IN_PAGE: this.pagination1.pageSize
          }
        )
        .then(res => {
          console.log(res, "leixing");
          this.types = res.data;
        });
    },
    // 点击行方法
    cellClick(row) {
      let path='/secretary/leaderActivity/topTheform';
      // 1 高管  2 党委  3 秘书
      if (row.type === "1") {
        path='/secretary/leaderActivity/topTheform';
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/leaderActivity/topTheform",
        //   query: { id: row.id }
        // });
      } else if (row.type === "2") {
        path='/secretary/leaderActivity/Newactivity';
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/leaderActivity/Newactivity",
        //   query: { id: row.id }
        // });
      } else if (row.type === "3") {
        path="/secretary/leaderActivity/theForm";
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/leaderActivity/theForm",
        //   query: { id: row.id }
        // });
      }
      this.hasOpened(row.id,{
            'path': path,
            'query': {  id: row.id}
          })
      console.log(row, "行数据");
    },
    submit() {
      this.loadData();
    },
    rest() {
      this.form = {
        title: "", //标题
        startDate: "", //开始日期
        startTime: "", //开始时间
        endTime: "", //结束时间
        activeAddress: "", //活动地址
        activeType: "", //活动类型
        attendBankLeader: "", //行领导
        endDate: "" //结束日期
      };
    },
    Export() {
      exportTable.exportExcel("领导活动查询");
    },
    dellist() {
      console.log(this.deleteArry);
      this.$api.secreatary.activety
        .deldata({ id: this.deleteArry })
        .then(res => {
          console.log(res, "yue");
          if (res.code === "SUCCESS") {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
            this.loadData();
          }
        });
    },
    //选中删除数据集合
    select(row) {
      console.log(row);
      // this.deldata = row
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id.trim());
      });
      this.deleteArry = dataArry.join(",");
    },
    // 获取查询表格数据
    loadData() {
      this.$api.secreatary.activety
        .anpaidata(
          { ...this.form, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log(res, "sss");
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.typechushi();
    this.loadData();
    //获取行领导
    this.$api.secreatary.activety.formbank({}).then(res => {
      console.log(res, "yue");
      this.options = res.data.data;
    });
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
</style>
