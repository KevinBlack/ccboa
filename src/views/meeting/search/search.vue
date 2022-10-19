<!--
 * @Author: your name
 * @Date: 2020-07-30 16:36:10
 * @LastEditTime: 2021-09-07 16:59:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\search\search.vue
-->
/**
* create by zx on 2020/7/29 17:08
* 类注释：
* 备注：
*/
<template>
  <div class="search">
    <el-form ref="searchForm" :model="formData" label-width="100px" class="demo-ruleForm mt20">
      <el-row style="margin-bottom: 10px">
           <el-col :span="8">
                <el-form-item label="办结年份" prop="choseYear">
                  <el-select
                    v-model="formData.numYearLabel"
                    @change="selectYear"
                    placeholder="近两年"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="yearItem in yearList"
                      :key="yearItem.lavel"
                      :label="yearItem.label"
                      :value="yearItem"
                    ></el-option>
                  </el-select>
                </el-form-item>
          </el-col>  
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间">
            <el-date-picker v-model="value1" type="daterange" style="width:100%" range-separator="-"
              start-placeholder="开始日期" :default-time="['00:00:00','23:59:59']" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拟稿人">
            <el-input v-model="formData.authorCn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="机构名称">
            <el-input v-model="formData.draftOrgan" placeholder="请选择机构" :disabled="true" style="width:75%"></el-input>
            <el-button type="primary" size="small" @click="selectOrg" style="float:right">选 择</el-button>
            <!-- <org-tree @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'1'"
              :seletSelf="'1'" :isSingle="isSingle" style="width:100%;">
              <el-input type="text" readonly="readonly" placeholder="请选择机构" v-model="formData.draftOrgan"
                suffix-icon="el-icon-arrow-down" />
            </org-tree> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门">
            <el-input v-model="formData.maindept" placeholder="请选择主办/参会部门" :disabled="true" style="width:75%"></el-input>
            <el-button type="primary" size="small" @click="selectDept" style="float:right">选 择</el-button>
            <!-- <org-tree @select="selectDept" :orgOrDept="0" :orgOrDeptId="formData.draftOrganId"
              :seletSelf="'1'" :isSingle="isSingle" style="width:100%;">
              <el-input type="text" readonly="readonly" placeholder="请选择主办/参会部门" v-model="formData.maindept"
                suffix-icon="el-icon-arrow-down" />
            </org-tree> -->
          </el-form-item>
        </el-col>

      </el-row>
      <el-row style="margin-top:10px">
         <el-col :span="8">
          <el-form-item label="通知类型">
            <el-select v-model="formData.tempType" placeholder="请选择通知类型" style="width:100%">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处理类型">
            <el-select v-model="formData.processType" placeholder="请选择通知类型" style="width:100%">
              <el-option v-for="item in processTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="流转状态">
            <el-select v-model="formData.lzStatus" placeholder="请选择通知类型" style="width:100%">
              <el-option v-for="item in lzStatusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
        </el-col>
      </el-row>
    </el-form>

     <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :seletSelf="seletSelf"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    <!-- <p style="position:relative;height:60px">
      <el-button
        type="primary"
        align="right"
        style="position:absolute;right:5%"
        @click="exportTables"
      >导 出</el-button>
    </p>-->
    <m-table @refresh="loadData" @cellClick="cellClick" size="medium" :isIndex="true" :isHandle="false"
      :searchData="formData" :default-sort="{prop:'draftDate',order:'desc'}" :tableData="tableData"
      :tableCols="tableCols" :pagination="pagination" :pageSizeList='[20, 30, 50, 100, 200, 500]'></m-table>
  </div>
  
</template>

<script type="text/ecmascript-6">
  import mTable from "@/components/table/tTable";
  // import searchForm from "@/components/form/searchForm";
  import exportTable from "../../../minixs/exportTable";
   import orgTree from "components/tree/orgTree";
  //import selectOrgOrDept from "components/select/selectOrgOrDept";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法

  // import selectOrgOrDept from "components/select/selectOrgOrDept"
  // import FdForm from "vue-elementui-freedomen/components/form";
  export default {
    name: "search",
    components: {
      // FdForm,
      // searchForm,
      mTable,
      orgTree,
      //selectOrgOrDept,
    },
    props: {},
    mixins:[bianhanPublic],
    data() {
      return {
        yearList: [],
        unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        value1: [],
        can: true,
        formCfg: [],
        isSava: true,
        title: "选择部门",
        showOrgTree: false,
        isSingle: false,
        seletSelf:1,
        orgOrDept: 1,
        orgOrDeptId: "0",
        formData: {
          title: "",
          authorCn: "",
          draftOrgan: "",
          draftOrganId: "",
          draftBeginDate: "",
          draftEndDate: "",
          processType: 0,
          maindept: "",
          maindeptId: "",
          joinmeetDept: "",
          joinmeetDeptId: "",
          lzStatus: 0,
          tempType: 1,
          sort: "desc",
          sortKey: "draftDate",
          numYear:'',
          numYearLabel:'近两年'
        },
        typeOptions: [{
            value: 1,
            label: "全部",
          },
          {
            value: 2,
            label: "系统会议通知",
          },
          {
            value: 3,
            label: "本部会议通知",
          },
          {
            value: 4,
            label: "部门会议通知",
          },
          {
            value: 5,
            label: "培训通知",
          },
        ],
        processTypeOptions: [{
            value: 0,
            label: "主办",
          },
          {
            value: 1,
            label: "委托承办",
          },
          {
            value: 2,
            label: "参会",
          },
        ],
        lzStatusOptions: [{
            value: 0,
            label: "全部",
          },
          {
            value: 1,
            label: "待办",
          },
          {
            value: 2,
            label: "已办",
          },
          {
            value: 3,
            label: "办结",
          },
        ],
        tableData: [],
        tableCols: [{
            label: "行名",
            prop: "draftOrgan"
          },
          {
            label: "拟稿日期",
            prop: "draftDate",
            formatter(row) {
              return row.draftDate.split(" ")[0];
            },
          },
          {
            label: "主办部门",
            prop: "maindept"
          },
          {
            label: "标题",
            prop: "title"
          },
          {
            label: "通知种类",
            prop: "type",
            formatter(row) {
              return row.type == "培训会议通知" ? "培训通知" : row.type;
            },
          },
          // { label: "制发层级", prop: "sanctions" },
          {
            label: "流转状态",
            prop: "lzStatus"
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
     selectYear(val) {
      this.formData.numYear = val.value;
      this.formData.numYearLabel=val.label;
     },
     getNumYearList(){
        this.getNumYearListCommon().then((res)=>{
        this.yearList=res;
         })
      },
      reset() {
        this.formData = {
          title: "",
          authorCn: "",
          draftOrgan: "",
          draftOrganId: "",
          draftBeginDate: "",
          draftEndDate: "",
          processType: 0,
          maindept: "",
          maindeptId: "",
          joinmeetDept: "",
          joinmeetDeptId: "",
          lzStatus: 0,
          tempType: 1,
          sort: "desc",
          sortKey: "draftDate",
          numYear:'',
          numYearLabel:'近两年'
        };
        this.value1 = [];
      },
       //获取机构树
      getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$set(this.formData, "draftOrgan", org.unitName);
        this.formData.draftOrganId = org.id;
      } else {
         this.$set(this.formData, "maindept", org.unitName);
        this.formData.maindeptId = org.id;
      }
    },
      // btnevent(params) {
      //   switch (params.prop) {
      //     case "$selectOrg":
      //       this.title = "选择机构";
      //       this.isSingle = true;
      //       this.orgOrDept = 1;
      //       this.seletSelf = 1;
      //       this.orgOrDeptId = "1";
            
      //       break;
      //     case "$selectDepar":
      //       if (!this.formData.draftOrganId) {
      //         this.$message({
      //           message: "请先选择机构",
      //           type: "success",
      //         });
      //         return;
      //       }
      //       this.seletSelf = 0;
      //       this.title = "部门";
      //       this.isSingle = true;
      //       this.orgOrDept = 0;
      //       this.orgOrDeptId = this.formData.draftOrganId;
           
      //       break;
      //   }
      // },
      selectOrg(org) {
        this.showOrgTree = true;
        this.$set(this.formData, "draftOrgan", org.unitName);
        this.formData.draftOrganId = org.id;
        this.$set(this.formData, "maindept", "");
        this.formData.maindeptId = "";
        this.formData.joinmeetDept = "";
        this.formData.joinmeetDeptId = "";

          this.title = "选择机构";
            this.isSingle = true;
            this.orgOrDept = 1;
            this.seletSelf = 1;
            this.orgOrDeptId = "1";
      },
      selectDept(org) {
        if (!this.formData.draftOrganId) {
          this.$message({
            message: "请先选择机构",
            type: "success",
          });
          return;
        }
         this.showOrgTree = true;
        this.$set(this.formData, "maindept", org.unitName);
        this.formData.maindeptId = org.id;
        this.formData.joinmeetDept = org.unitName;
        this.formData.joinmeetDeptId = org.id;

            this.seletSelf = 0;
            this.title = "部门";
            this.isSingle = true;
            this.orgOrDept = 0;
            this.orgOrDeptId = this.formData.draftOrganId;
      },
      submit() {
        this.pagination = {
          pageNum: 1,
          pageSize: 20,
        };
        if (this.value1.length > 0) {
          this.formData.draftBeginDate = formatData(
            this.value1[0].getTime(),
            "YYYY-MM-DD HH:mm:ss"
          );
          this.formData.draftEndDate = formatData(
            this.value1[1].getTime(),
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        if (this.formData.tempType) {
          switch (this.formData.tempType) {
            case 1:
              this.formData.type = "";
              break;
            case 2:
              this.formData.type = "系统会议通知";
              break;
            case 3:
              this.formData.type = "本部会议通知";
              break;
            case 4:
              this.formData.type = "部门会议通知";
              break;
            case 5:
              this.formData.type = "培训会议通知";
              break;
          }
        }
        this.loadData();
      },
      loadData(type) {
        if (!type) {
          this.pagination.pageNum = 1;
        }
        this.$api.meeting
          .hySearch(this.formData, {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          })
          .then((res) => {
            this.tableData = res.data;
            this.pagination.total = res.total;
            // this.result = res.list
          });
      },
      exportTables() {
        if (this.tableData.length == 0) {
          return;
        }
        exportTable.exportExcel("查询结果");
      },

      cellClick(row) {
        if (row.processType == "1") {
          //制发
          if (row.lzStatus == "待办") {
            // this.$intent.goNewPage(this, {
            //   path: "/meeting/zf/zfTwo",
            //   query: { id: row.id, leixing: row.type },
            // });
            this.hasOpened(row.id, {
              'name': "zfTwo",
              'query': {
                'id': row.id,
                'leixing': row.type,
                numyear:this.formData.numYear
              }
            })
          } else {
            this.$intent.goNewPage(this, {
              path: "/meeting/zf/zfDoneDetail",
              query: {
                id: row.id,
                type: row.lzStatus,
                leixing: row.type,
                numyear:this.formData.numYear
              },
            });
          }
        } else {
          //承办
          if (row.lzStatus == "待办") {
            if (row.isCanOrCb == "0") {
              // this.$intent.goNewPage(this, {
              //   path: "/meeting/chDetial",
              //   query: { id: row.id, leixing: row.type },
              // });
              this.hasOpened(row.id, {
              'name': "chDetial",
              'query': {
                'id': row.id,
                'leixing': row.type,
                numyear:this.formData.numYear
              }
            })
            } else {
              // this.$intent.goNewPage(this, {
              //   path: "/meeting/cbDetial",
              //   query: {
              //     id: row.id,
              //     leixing: row.type
              //   },
              // });
              this.hasOpened(row.id, {
              'name': "cbDetial",
              'query': {
                'id': row.id,
                'leixing': row.type,
                numyear:this.formData.numYear
              }
            })
            }
          } else {
            if (row.isCanOrCb == "0") {
              this.$intent.goNewPage(this, {
                path: "/meeting/chDoneDetial",
                query: {
                  id: row.id,
                  type1: row.lzStatus,
                  leixing: row.type,
                  numyear:this.formData.numYear
                },
              });
            } else {
              this.$intent.goNewPage(this, {
                path: "/meeting/cbDoneDetial",
                query: {
                  id: row.id,
                  type1: row.lzStatus,
                  leixing: row.type,
                  numyear:this.formData.numYear
                },
              });
            }
          }
        }
      },
    },
    activated() {},
    mounted() {},
    created() {
      this.getNumYearList();
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
