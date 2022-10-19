<template>
  <!-- 签报退文列表 -->
  <el-tabs v-cloak>
    <!--@tab-click="handleTabsClick" v-model="activeName"-->
    <!-- <el-tab-pane label="全部" name="tabs-all">
      <optionalfield></optionalfield>
    </el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>-->
    <el-row>
      <!-- <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="拟稿日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange(events)"
                    v-model="ruleForm.endTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    style="width:300px"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发文字号" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down">
            <el-row>
              <el-col :span="6">
                <el-form-item label="拟稿日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange(events)"
                      v-model="ruleForm.endTime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="主办部门" prop="hostDepartment">
                  <el-input v-model="ruleForm.hostDepartment" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="primary">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="公文状态">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="流转"></el-radio>
                  <el-radio label="办结"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="发文形式">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="电子"></el-radio>
                  <el-radio label="实物"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="发文类型">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="行发文"></el-radio>
                  <el-radio label="部门发文"></el-radio>
                  <el-radio label="党务发文"></el-radio>
                  <el-radio label="会议纪要"></el-radio>
                  <el-radio label="工作简报"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <el-col class="down" v-if="down">
            <el-button type="info" size="small" @click="arrow()">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col>
        </el-form>
      </el-col> -->
      <!-- <el-col v-if="isEnd" class="mt20end">
        <router-link
          tag="a"
          target="_blank"
          :to="{name:'bankDispach'}"
          class="btn-writeEnDspc"
        >起草电子发文</router-link>
        <router-link
          tag="a"
          target="_blank"
          :to="{name:'bankEntityDispatch'}"
          class="btn-writeEnDspc"
        >起草实物发文</router-link>
      </el-col>-->
      <el-col>
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";
// import optionalfield from "components/optionalfield/optionalfield.vue";

const otherData = [
  { label: "退文日期", prop: "backTime", align: "center" ,width:"180"},
  { label: "签报字号", prop: "documentNo", align: "left" ,width:"210"},
  { label: "标题", prop: "title", align: "left" },
  { label: "退回环节", prop: "backNodeName", align: "center"  ,width:"120" },
  { label: "被退回人", prop: "beBackUser", align: "center"  ,width:"80"},
  { label: "退回人", prop: "currentUser", align: "center"  ,width:"80" },
  { label: "退回原因", prop: "backExplain", align: "left"  ,width:"150"},
  { label: "退文类型", prop: "backType", align: "center" ,width:"80" }
];

export default {
  name: "DispatchFile",
  components: {
    mTable,
    // optionalfield
  },
  data() {
    return {
      bank_getToQianbaoBackEntityByPage: {
        function: "getToQianbaoBackEntityByPage",
        state: 1, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20, //每页条数
      },
      down: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      ruleForm: {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: ""
      },
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      }
    };
  },
  methods: {
    // 页面初始化加载数据
    initData(tabindex) {
      sessionStorage.setItem('QBLIST',JSON.stringify(this.bank_getToQianbaoBackEntityByPage));
      this.$post
        .postData(
          "getToQianbaoBackEntityByPage",
          JSON.stringify(this.bank_getToQianbaoBackEntityByPage),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange(events) {
      console.log(this.ruleForm.endTime);
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_getToQianbaoBackEntityByPage.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.bank_getToQianbaoBackEntityByPage.limit = val;
      this.pagination.limit = val;
      this.pagination.page = this.bank_getToQianbaoBackEntityByPage.page = 1;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      console.log(row.backType);
      if (row.backType == "跨行退文") { 
        if(row.multiTenancyId == "CN014"){
            const routeData = this.$router.resolve({
              path: "/tuiwenkhDispatch",
              query: {
                id: row.id,
                khState:"2"   //审批行
              }
            });
            window.open(routeData.href, "_blank");
        }
        if(row.multiTenancyId == "CN009"){
            const routeData = this.$router.resolve({
              path: "/tuiwenkhDispatch",
              query: {
                id: row.id,
                khState:"1"   //请示行
              }
            });
            window.open(routeData.href, "_blank");
        }
        // const routeData = this.$router.resolve({
        //   path: "/tuiwenkhDispatch",
        //   query: {
        //     id: row.id,
        //     khState:"2"   //审批行
        //   }
        // });
        // window.open(routeData.href, "_blank");
      }
      if (row.backType == "本行退文") {
        if(row.multiTenancyId == "CN002"){
            const routeData = this.$router.resolve({
              path: "/tuiwenfeikhDispatch",
              query: {
                id: row.id
              }
            });
            window.open(routeData.href, "_blank");
        }
        if(row.multiTenancyId == "CN009"){
            const routeData = this.$router.resolve({
              path: "/tuiwenkhDispatch",
              query: {
                id: row.id,
                khState:"1"   //请示行
              }
            });
            window.open(routeData.href, "_blank");
        }
        
      }

      // if (!row.backType) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "跳转页面失败",
      //     duration: 1000
      //   });
      //   return;
      // }
    },
    submitForm(formName) {},
    resetForm(formName) {}
  },
  created() {
    if(sessionStorage.getItem('QBLIST')){
      this.bank_getToQianbaoBackEntityByPage = Object.assign(this.bank_getToQianbaoBackEntityByPage,JSON.parse(sessionStorage.getItem('QBLIST')))
    }
    this.pagination = {
      page: this.bank_getToQianbaoBackEntityByPage.page, //第几页
      total: this.bank_getToQianbaoBackEntityByPage.totalCount, //共有条数
      limit: this.bank_getToQianbaoBackEntityByPage.limit, //每页条数
    }
    this.initData();
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
.is10{
  margin: 20px 0 !important;
}
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 10px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}

/deep/.el-table .cell{
  padding: 0px 3px 0 3px !important;
}
</style>
