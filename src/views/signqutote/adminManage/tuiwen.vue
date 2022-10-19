<template>
  <!-- 签报退文列表 -->
    <el-row v-cloak>
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="8">
            <el-form-item label="文号年份" prop="choseYear">
              <el-select
                v-model="bank_getToQianbaoBackEntityByPage.choseYear"
                @change="selectYear"
                placeholder="近两年"
                style="width: 100%;"
              >
                <el-option value label="近两年"></el-option>
                <el-option
                  v-for="yearItem in yearList"
                  :key="yearItem"
                  :label="yearItem"
                  :value="yearItem"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
              <el-form-item label="退文日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange()"
                    v-model="ruleForm.endTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:300px"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标题" prop="title">
                <el-input v-model="bank_getToQianbaoBackEntityByPage.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签报字号" prop="documentNo">
                <el-input v-model="bank_getToQianbaoBackEntityByPage.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="流程状态">
                <el-select v-model="bank_getToQianbaoBackEntityByPage.curNodeCode">
                  <el-option value="-1" label="流转中"></el-option>
                  <el-option value="800" label="已办结"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
            <el-form-item label="机构名称" prop="unitName">
              <div class="dispatchcswhlshwh">
                <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                  <el-input
                    type="text"
                    readonly="readonly"
                    placeholder="请选择"
                    v-model="unitName"
                    suffix-icon="el-icon-arrow-down"
                    width="100%"
                  />
                </select-org-or-dept>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: center;">
            <el-button type="primary" @click="initData('str')">搜索</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
            <el-button type="danger" style="float:right;" @click="sureDelete">删除</el-button>
          </el-col>
          </el-row>
        </el-form>
      </el-col>
      <!-- <el-col :span="24" style="text-align: right;margin-top: 8px;">
        <el-button type="primary" size="small" @click="sureDelete">批量删除</el-button>
      </el-col> -->
      <el-col style="margin: 8px 0;">
        <m-table
          size="medium"
          :isSelection="true"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @handleSelectionChange="handleSelectionChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :isIndexPage="true"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    <el-dialog v-dialogDrag title="删除确认" :visible.sync="deleteFlag" width="60%">
      <p class="xuanzTh">是否确认删除?</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleBatchDelete">确 认</el-button>
        <el-button @click="deleteFlag = false">取 消</el-button>
      </span>
    </el-dialog>
    </el-row>
</template>

<script>
import mTable from "components/table/mTable.vue";
// import optionalfield from "components/optionalfield/optionalfield.vue";
import dateFormate from "@/util/filters.js";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const otherData = [
  { label: "退文日期", prop: "backTime", align: "center" },
  { label: "签报字号", prop: "documentNo", align: "center" ,width:"250"},
  { label: "标题", prop: "title", align: "center" ,width:"280"},
  { label: "退回环节", prop: "backNodeName", align: "center" },
  { label: "退回接收人", prop: "beBackUser", align: "center"  ,width:"90"},
  { label: "操作人", prop: "currentUser", align: "center" },
  { label: "退回原因", prop: "backExplain", align: "center" },
  { label: "退文类型", prop: "backType", align: "center" }
];
const year = new Date().getFullYear();
export default {
  name: "DispatchFile",
  components: {
    mTable,
    searchForm,
    selectOrgOrDept
    // optionalfield
  },
  data() {
    return {
      isGly:false,
      deleteFlag:false,
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份

      bank_getToQianbaoBackEntityByPage: {
        function: "findAllQianbaoBackList",
        state: 0, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20, //每页条数
        createTime: '',
        endTime: '',
        documentNo:  "〔"+year+"〕",
        title: '',
        choseYear: ""
        // curNodeCode: ''
      },
      yearList: [],
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
        documentNo:  "", //发文字号
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
    handleSelectionChange(val) {
      this.checkedArr = val;
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push({
          'orderType': val[i].backType,
          'id': val[i].id,
        })
      }
      this.deleteIds = idsArr;
      console.log( this.deleteIds ,idsArr)
    },
    sureDelete(){
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择一条数据进行删除！"
        });
        return;
      }
      this.deleteFlag = true;
    },
    // 批量删除
    handleBatchDelete() {
      
      this.$post
        .postData(
          "doSysDeleteTable",
          JSON.stringify({
            function: "doSysDeleteTable",
            deleteArr: this.deleteIds,
            unitId: this.unitId
          }),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 1000
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "删除失败",
              duration: 1000
            });
          }
          this.initData();
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "删除失败",
            duration: 1000
          });
        });
        this.deleteFlag = false;
    },
    // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      console.log(org, this.unitName , this.unitId);
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.draforgnmPeople = manger.filter(item => {
        return (
          item.codeType === "manager_type" && item.dicCode === "sys_manager"
        );
      });
      if (this.draforgnmPeople.length !== 0) {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = true;
        this.identity = false;
      }
      console.log(this.unitName,this.unitId)
    },

    timeChange() {
      if (this.ruleForm.endTime) {
        this.bank_getToQianbaoBackEntityByPage.createTime = dateFormate.date(Date.parse(this.ruleForm.endTime[0]))
        this.bank_getToQianbaoBackEntityByPage.endTime = dateFormate.date(Date.parse(this.ruleForm.endTime[1]))
      }else {
        this.bank_getToQianbaoBackEntityByPage.createTime = ''
        this.bank_getToQianbaoBackEntityByPage.endTime = ''
      }
    },
    // 页面初始化加载数据
    initData(str) {
      this.$router.push({
        query: {
          choseYear: this.bank_getToQianbaoBackEntityByPage.choseYear
        }
      })
      sessionStorage.setItem('QBLIST',JSON.stringify(this.bank_getToQianbaoBackEntityByPage));
      if (str) {
        this.bank_getToQianbaoBackEntityByPage.state = 0; //全部0 待办1  已办2  办结3
        this.bank_getToQianbaoBackEntityByPage.page = 1; //当前页数
        // this.bank_getToQianbaoBackEntityByPage.limit = 10; //每页条数
        this.pagination.page = 1;
      }
      this.bank_getToQianbaoBackEntityByPage.unitName = this.unitName
      this.bank_getToQianbaoBackEntityByPage.unitId = this.unitId
      this.$post
        .postData(
          "findAllQianbaoBackList",
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
      // if (row.backType == "跨行退文") {
      //   const routeData = this.$router.resolve({
      //     path: "/tuiwenkhDispatchCopy",
      //     query: {
      //       id: row.id,
      //       orderType:row.backType
      //     }
      //   });
      //   window.open(routeData.href, "_blank");
      // }
      // if (row.backType == "本行退文") {
      //   const routeData = this.$router.resolve({
      //     path: "/tuiwenfeikhDispatchCopy",
      //     query: {
      //       id: row.id,
      //       orderType:row.backType
      //     }
      //   });
      //   window.open(routeData.href, "_blank");
      // }
      // if (row.backType == "跨行退文") {
      //   const routeData = this.$router.resolve({
      //     path: "/tuiwenkhDispatchCopy",
      //     query: {
      //       id: row.id,
      //       khState:"2"   //审批行
      //     }
      //   });
      //   window.open(routeData.href, "_blank");
      // }
      if (row.backType == "跨行退文") { 
        if(row.multiTenancyId == "CN014"){
            const routeData = this.$router.resolve({
              path: "/tuiwenkhDispatchCopy",
              query: {
                id: row.id,
                khState:"2",  //审批行
                unitId: this.unitId,
                choseYear: this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
        }
        if(row.multiTenancyId == "CN009"){
            const routeData = this.$router.resolve({
              path: "/tuiwenkhDispatchCopy",
              query: {
                id: row.id,
                khState:"1",   //请示行
                unitId: this.unitId,
                choseYear: this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
        }
      }
      if (row.backType == "本行退文") {
        if(row.multiTenancyId == "CN002"){
            const routeData = this.$router.resolve({
              path: "/tuiwenfeikhDispatchCopy",
              query: {
                id: row.id,
                unitId: this.unitId,
                choseYear: this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
        }
        if(row.multiTenancyId == "CN009"){
            const routeData = this.$router.resolve({
              path: "/tuiwenkhDispatchCopy",
              query: {
                id: row.id,
                khState:"1",  //请示行
                unitId: this.unitId,
                choseYear: this.$route.query.choseYear
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
    // submitForm() {
    //   this.bank_getToQianbaoBackEntityByPage.title = this.ruleForm.title
    //   this.bank_getToQianbaoBackEntityByPage.documentNo = this.ruleForm.documentNo
    //   this.initData();
    // },
    resetForm(formName) {
      // this.ruleForm.documentNo = '';
      // this.ruleForm.title = '';
      this.ruleForm = {
        documentNo:  "", //发文字号
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
      }
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.ruleForm.endTime = '';
      this.bank_getToQianbaoBackEntityByPage.title = ''
      this.bank_getToQianbaoBackEntityByPage.documentNo =  "〔"+year+"〕"
      this.bank_getToQianbaoBackEntityByPage.createTime = ''
      this.bank_getToQianbaoBackEntityByPage.endTime = ''
      this.bank_getToQianbaoBackEntityByPage.choseYear = ''
      // this.bank_getToQianbaoBackEntityByPage.curNodeCode = ''
      // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
      // this.initData();
      this.$api.setting.organization
      .getTree({
        unitClass:1,
        unitCode: "1",
      })
      .then((res) => {
        this.unitName = res.data[0].unitName||'';
        this.unitId = res.data[0].unitCode||'';
        // this.initData();
      })
      this.defaultYear()
      this.tableData = [];
    },
    selectYear(val) {
      this.bank_getToQianbaoBackEntityByPage.choseYear = val;
    if (val=="") {
        this.defaultYear();
      } else {
        this.bank_getToQianbaoBackEntityByPage.documentNo = '〔'+ val +'〕'
      }
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.bank_getToQianbaoBackEntityByPage.documentNo = '〔'+ openTimeYear +'〕'
      // this.$router.push({
      //   query: {
      //     choseYear: ''
      //   }
      // })
    }
  },
  created() {
    this.$router.push({
        query: {
          choseYear: ''
        }
      })
    if(sessionStorage.getItem('QBLIST')){
      this.bank_getToQianbaoBackEntityByPage = Object.assign(this.bank_getToQianbaoBackEntityByPage,JSON.parse(sessionStorage.getItem('QBLIST')))
    }
    this.pagination = {
      page: this.bank_getToQianbaoBackEntityByPage.page, //第几页
      total: this.bank_getToQianbaoBackEntityByPage.totalCount, //共有条数
      limit: this.bank_getToQianbaoBackEntityByPage.limit, //每页条数
    }
    this.isGly = isGlyId();
    // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
    // this.initData();
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({
          function: "selTableYear"
        }),
        this.$businessCode.qbgl
      )
      .then(res => {
        if (res && res.success) {
          this.yearList = res.data;
        }})
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf:"1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.initData();
    })
  }
};
</script>

<style lang="less" scoped>
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
  padding: 10px 20px 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.arrowup {
  padding-left: 20px;
  margin-bottom: 20px;
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
/deep/ .dispatchcswhlshwh{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}

/deep/ .el-row {
    box-sizing: border-box;
    display: flex;
    flex-flow: wrap;
}
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
.is10{
  margin: 20px 0 !important;
}
.mt20 {
    margin-top: 10px;
}
/deep/ .bank_dispach_content>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px !important;
}
</style>
