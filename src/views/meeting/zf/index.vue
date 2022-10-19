<template>
  <div>
    <el-tabs v-model="sonselect" @tab-click="handleClick">
      <el-tab-pane label="全部">
        <search-form :formData="formData" @reset="reset" class="mt20"
          :openshow="openshow"
          :hasShow="hasShow"
         @submit="submit" :formCfg="formCfg">
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
              <el-input v-model="title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿日期">
              <el-date-picker v-model="value" type="daterange" range-separator="-" style="width:100%"
                :default-time="['00:00:00','23:59:59']" start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
          </el-col>
        </search-form>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          待办
          <el-badge :value="needTodoNum" class="item" type="primary"></el-badge>
        </span>
        <el-col class="mt20end">
          <!-- <el-button type="primary" @click="createHy">起草</el-button> -->
          <el-button type="primary" @click="addData1">起草</el-button>
          <!-- <span style="color:red;margin-left:20px;">系统试运行期间，新系统只支持本行内业务流转，跨行业务请到原OA3.6中办理。</span> -->
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="已办"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
    </el-tabs>
    <m-table @refresh="loadData" @cellClick="cellClick" size="medium" :isHandle="false" :searchData="formData"
      :tableData="tableData" :tableCols="tableCols" :default-sort="{prop:'draftDate',order:'desc'}"
      :pagination="pagination" :tableRowClassNames="tableRowClassName"></m-table>
    <el-dialog title="请选择类型及拟稿部门" :visible.sync="dialogFormVisible">
      <el-form style="margin:0 10%" :data="formData1">
        <el-form-item label="会议类型" prop="type">
          <el-radio v-model="formData1.type" label="CN012">系统会议通知</el-radio>
          <el-radio v-model="formData1.type" label="CN013">本部会议通知</el-radio>
          <el-radio v-model="formData1.type" label="CN095">部门会议通知</el-radio>
          <el-radio v-model="formData1.type" label="CN015">培训通知</el-radio>
        </el-form-item>
        <el-form-item label="主办部门" v-if="this.deptList.length>1">
          <el-select v-model="selectDept" style="width:50%" @change="change(selectDept)">
            <el-option v-for="item in deptList" :key="item.currUnitId" :label="item.chatNum" :value="item.humanId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemClick('cancel')">取 消</el-button>
        <el-button type="primary" @click="itemClick('sure')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import mTable from "components/table/tTable";
  import searchForm from "components/form/searchForm";
  import {
    mapActions
  } from "vuex";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  export default {
    name: "circulatetable",
    components: {
      mTable,
      searchForm,
    },
    mixins: [bianhanPublic],
    data() {
      return {
        hasShow: false, //查询条件不展示收起按钮
        openshow: true,
        yearList: [],
        id: "", //直接起草''，会议室预定插入初始数据为表单id
        needTodoNum: 0,
        result: [],
        tableData: [],
        tableCols: [{
            label: "拟稿日期",
            prop: "draftDate",
            formatter(row) {
              return row.draftDate.split(" ")[0];
            },
            width: 200,
          },
          {
            label: "名称",
            prop: "title",
            minwidth: 338
          },
          {
            label: "类型",
            prop: "type",
            formatter(row) {
              return row.type == "培训会议通知" ? "培训通知" : row.type;
            },
            width: 200,
          },
          {
            label: "当前处理人",
            prop: "currentUser",
            width: 200
          },
          {
            label: "拟稿人",
            prop: "authorCn",
            width: 200
          },
        ],
        tableCols1: [{
            label: "拟稿日期",
            prop: "draftDate",
            formatter(row) {
              return row.draftDate.split(" ")[0];
            },
            width: 200,
          },
          {
            label: "名称",
            prop: "title",
            minwidth: 338
          },
          {
            label: "类型",
            prop: "type",
            formatter(row) {
              return row.type == "培训会议通知" ? "培训通知" : row.type;
            },
            width: 200,
          },
          {
            label: "当前处理人",
            prop: "currentUser",
            width: 200
          },
          {
            label: "拟稿人",
            prop: "authorCn",
            width: 200
          },
        ],
        tableCols2: [{
            label: "拟稿日期",
            prop: "draftDate",
            formatter(row) {
              return row.draftDate.split(" ")[0];
            },
            width: 260,
          },
          {
            label: "名称",
            prop: "title",
            minwidth: 338
          },
          {
            label: "类型",
            prop: "type",
            formatter(row) {
              return row.type == "培训会议通知" ? "培训通知" : row.type;
            },
            width: 260,
          },
          {
            label: "拟稿人",
            prop: "authorCn",
            width: 260
          },
        ],
        formCfg: [{
            type: "radios",
            prop: "zt",
            label: "会议状态",
            span: 8,
            options: {
              2: "已办",
              3: "办结"
            },
          },
          [
            {
              type: "button-primary",
              prop: "$submit",
              value: "开始查询"
            },
            {
              type: "button",
              prop: "$reset",
              value: "重置"
            },
            {
              type: "formitem",
              style: {
                "text-align": "center",
                "margin-left": "-120px",
              },
            },
          ],
        ],
        pagination: {
          pageNum: 1,
          // total: 20,
          pageSize: 20,
        },
        sonselect: "1",
        newArr: [],
        formData: {
          title: "",
          numYear:'',
          numYearLabel:'近两年',
          draftBeginDate: "",
          draftEndDate: "",
          sort: "desc",
          sortKey: "draftDate",
        },
        value: [],
        title: "",
        // 起草
        selectDept: "",
        detail: "",
        deptList: [],
        formData1: {},
        dialogFormVisible: false,
      };
    },
    methods: {
      ...mapActions(["setTodoItem"]),
      tableRowClassName(row) {
        if (
          row.isReadflag == "0" &&
          (this.sonselect == "1" || row.typeFlag == "0")
        ) {
          return "warning-row";
        }
      },
      selectYear(val) {
      this.formData.numYear = val.value;
      this.formData.numYearLabel=val.label;
    },
      change(p) {
        let select = {};
        this.deptList.forEach((item) => {
          if (item.humanId == p) {
            select = item;
          }
        });
        this.formData1.deptDetail = JSON.stringify(select);
        console.log(9090909, this.formData1);
        this.$forceUpdate();
      },
      itemClick(params) {
        switch (params) {
          case "sure":
            if (this.formData1.type) {
              // if (!this.id) {
              this.$intent.goNewPage(this, {
                path: "/meeting/zf/zfTwo",
                query: this.formData1,
              });
              // } else {
              //   this.formData1.flags = 1;
              //   this.formData1.id = this.id;
              //   this.$intent.goNewPage(this, {
              //     path: "/meeting/zf/zfTwo",
              //     query: this.formData1,
              //   });
              // }
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: "请选择会议类型",
                type: "warning",
              });
            }
            break;
          case "cancel":
            this.dialogFormVisible = false;
            break;
        }
      },
      reset() {
        this.formData = {numYear:'',numYearLabel:'近两年'};
        this.formData.title='';
        this.title='';
        this.value=[];
        this.formData.draftBeginDate='';
        this.formData.draftEndDate='';
      },
      submit(params) {
        this.formData = params;
        this.formData.title = this.title;
        if (this.value.length > 0) {
          this.formData.draftBeginDate = formatData(
            this.value[0].getTime(),
            "YYYY-MM-DD HH:mm:ss"
          );
          this.formData.draftEndDate = formatData(
            this.value[1].getTime(),
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        this.formData.typeFlag = "0";
        this.loadData();
      },
      loadData(type) {
        this.formData.typeFlag = this.sonselect;
        if (!type) {
          this.pagination.pageNum = 1;
        }
        this.$api.meeting
          .zfTable(this.formData, {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          })
          .then((res) => {
            this.tableData = res.list;
            this.pagination.total = res.total;
            if (this.sonselect == "1") {
              this.needTodoNum = res.total;
            }
          });
      },
      cellClick(val) {
        if (this.sonselect == 0) {
          if (val.typeFlag == "0") {
            //1已办      0  代办     2办结
            // if (val.type) {
            // this.$intent.goNewPage(this, {
            //   path: "/meeting/zf/zfTwo",
            //   query: { id: val.id },
            // });
            this.hasOpened(val.id, {
              'name': "zfTwo",
              'query': {
                'id': val.id,
                 numyear:this.formData.numYear ,
              }
            })
            // } else {
            //   this.id = val.id;
            //   this.addData1();
            // }
          } else {
            this.$intent.goNewPage(this, {
              path: "/meeting/zf/zfDoneDetail",
              query: {
                id: val.id,
                type: val.typeFlag,
                 numyear:this.formData.numYear ,
              },
            });
          }
        } else if (this.sonselect == 1) {
          console.log('this.sonselect', this.sonselect)
          // if (val.type) {
          // this.$intent.goNewPage(this, {
          //   path: "/meeting/zf/zfTwo",
          //   query: { id: val.id },
          // });
          this.hasOpened(val.id, {
            'name': "zfTwo",
            'query': {
              'id': val.id,
               numyear:this.formData.numYear ,
            }
          })
          // } else {
          //   this.id = val.id;
          //   this.addData1();
          // }
        } else {
          this.$intent.goNewPage(this, {
            path: "/meeting/zf/zfDoneDetail",
            query: {
              id: val.id,
              type: this.sonselect,
               numyear:this.formData.numYear ,
            },
          });
        }
      },
      handleClick() {
        console.log(9909090, this.sonselect);
        if (this.sonselect == "3") {
          this.tableCols = this.tableCols2;
        } else {
          this.tableCols = this.tableCols1;
        }
      
        this.formData = {};
        if(this.sonselect==='0'){
            this.reset();
        }
        (this.pagination = {
          pageNum: 1,
          pageSize: 20,
        }),
        this.loadData();
      },
      // createHy() {
      //   this.id = "";
      //   this.addData1();
      // },
      addData1() {
        this.formData1 = {};
        this.$api.meeting.getDeptList({}).then((res) => {
          this.deptList = res.result;
          if (this.deptList.length == 1) {
            this.selectDept = JSON.stringify(this.deptList[0]);
            this.formData1.deptDetail = JSON.stringify(this.deptList[0]);
          } else {
            this.selectDept = this.deptList[0].humanId;
            let select1 = {};
            this.deptList.forEach((item) => {
              if (item.humanId == this.selectDept) {
                select1 = item;
              }
            });
            this.formData1.deptDetail = JSON.stringify(select1);
          }
        });
        this.dialogFormVisible = true;
      },
      getNumYearList(){
        this.getNumYearListCommon().then((res)=>{
        this.yearList=res;
         })
      }
    },
    created() {
      this.loadData();
      this.getNumYearList();
    },
  };

</script>
<style scoped lang="less">
  .mt20end {
    margin: 20px 0;
  }

  .mt20 {
    padding: 20px 0 0 0;
    position: relative;
    border: 1px solid #f0f0f0;
  }

</style>
