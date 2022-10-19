<!--
 * @Author: your name
 * @Date: 2020-10-22 17:39:33
 * @LastEditTime: 2021-06-25 19:42:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\secretary\dutyTrends\cqNotice\formNotice.vue
--> 
<template>
  <div class="zfTwo">
    <div class="headerClick">
      <div class="left" @click="closeWindow">
        <i class="el-icon-arrow-left"></i> 采编稿件
      </div>
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="closeWindow">关闭</el-button>
        <el-button plain class="bank_grid_comtent_active" @click="saveInfor">保存</el-button>
        <el-button plain class="bank_grid_comtent_active" @click="toCheng">成刊</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">{{userInfoOrg+"信息采编单"}}</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>

      <el-form ref="ruleForm" :model="boxData" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题">
              <el-input v-model="boxData.title" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="编辑人">
              <el-input v-model="boxData.editorName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="编辑日期">
              <el-input v-model="boxData.createDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input v-model="boxData.tel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label>
              <el-button type="primary" plain @click="toSee">查看</el-button>
              <el-button type="primary" plain @click="toAdd">增加</el-button>
              <el-button type="primary" plain @click="del">删除</el-button>
              <el-button type="primary" plain @click="joinCuoQ">加入错情通知</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <m-table
                @select="selectRowBox"
                @cellClick="cellClick"
                size="medium"
                :isHandle="false"
                :sortable="false"
                :tableData="tableData"
                :tableCols="tableCols"
                :isSelection="true"
                :isIndex="false"
                :isPagination="false"
                :tableRowClassNames="tableRowClassName"
              ></m-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="modal" v-show="modal" @click="all"></div>
    <div class="addTab" v-show="modal">
      <el-form>
        <el-row style="margin-bottom: 10px" :gutter="20">
          <el-col :span="7">
            <el-form-item label="日期">
              <el-date-picker
                v-model="formData.dateStr"
                style="margin-let:20px"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                @change="change"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="栏目类别">
              <el-select v-model="formData.submitColumn" placeholder="请选择" @change="change">
                <el-option
                  v-for="item in options3"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- @description: <el-button type="primary" @click="toFind">查询</el-button>  -->
            <el-button type="primary" @click="toSure">确定</el-button>
          </el-col>
        </el-row>
      </el-form>

      <div class="list">
        <m-table
          ref="manuscriptDataTable"
          @refresh="loadList"
          @select="selectRow"
          :isIndex="true"
          :isSelection="true"
          :pagination="pagination"
          :searchData="searchData1"
          :tableData="tableData1"
          :tableCols="tableCols1"
        ></m-table>
      </div>
    </div>
    <el-dialog title="请选择拟稿部门" :visible.sync="dialogFormVisible">
      <el-form ref="submitStatusForm" style="margin:0 10%" :model="formData1">
        <el-form-item
          label="投稿部门"
          :rules="{required: true, message: '请选择拟稿部门', trigger: 'blur' }"
          prop="submitDept"
        >
          <el-select v-model="formData1.submitDept" placeholder="请选择" style="width:50%">
            <el-option
              v-for="item in submitDeptData"
              :key="item.value"
              :label="item.unitNames"
              :value="item.unitNames"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "@/components/table/tTable";

export default {
  name: "dealForm",
  components: {
    mTable
  },

  data() {
    return {
      fleG: true,
      arrays1: [],
      string1: [],
      arrays2: [],
      string2: [],
      arrays3: [],
      string3: [],
      arrays4: [],
      string4: [],
      arrays5: [],
      string5: [],
      arrays6: [],
      string6: [],
      arrays7: [],
      string7: [],
      messageData: "",
      dialogFormVisible: false,
      submitDeptData: [],
      // 分页
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      userInfoOrg:
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).unitName,
      arrContotal: "",
      seeArr: [],
      ids: [],
      boxData: {},
      modal: false,
      isEdit: false,

      options3: [],
      formData: {
        dateStr: "",
        // submitStatus: "",
        submitColumn: "",
        // flag: (formData.dateStr ? 1 : "") || (formData.submitStatus ? 3 : "")
        flag: 4
      },
      formData1: {
        submitDept: ""
      },

      tableCols: [
        { label: "栏目名称", prop: "submitColumn" },
        { label: "来稿时间", prop: "createDate" },
        {
          label: "报送单位",
          prop: "showData"
        },
        {
          label: "内容",
          prop: "content",
          type: "Input",

          blur: row => {
            console.log(row.content);
            this.$api.duty
              .upDataBlur({
                id: row.id,
                content: row.content,
                gjStatus: "已加入编辑稿件"
              })
              .then(res => {
                this.loadData();
                this.$message({
                  message: "已更新！",
                  type: "success"
                });
              });
          }
        }
      ],
      tableData: [],
      multipleSelection: [],
      searchData1: {},
      listData: [],
      tableCols1: [
        { label: "拟稿日期", prop: "createDate" },
        { label: "推送内容", prop: "content" },
        { label: "来稿时间", prop: "submitDate" },
        { label: "报送单位", prop: "submitUnit" },
        { label: "状态", prop: "submitStatus" }
      ],
      arrTit: [],
      arrCon: [],
      tableData1: []
      // flag2: this.formData.submitStatus ? 3 : ""
    };
  },
  computed: {},
  methods: {
    // 取消
    cancel() {
      this.dialogFormVisible = false;
    },
    // 确定
    handleSure() {
      this.$refs.submitStatusForm.validate(valid => {
        if (valid) {
          let xxcbBxgjId = [];
          this.tableData.map(item => {
            xxcbBxgjId.push(item.id);
          });
          // this.boxData.id = "";
          this.$set(this.boxData, "id", "");
          this.$router.push({
            name: "chengkanDetail",
            query: {
              /** @description: 来源路由名 据此从详情页中导航回来*/
              sourceRouteName: this.sourceRouteNameFromQuery,
              activeName: "",
              detail: JSON.stringify(this.boxData),
              isType: JSON.stringify("deal"),
              zbDept: this.formData1.submitDept,
              xxcbBxgjId: JSON.stringify(xxcbBxgjId),
              draftDepartment: JSON.stringify(this.boxData.draftDepartment)
            },
            params: this.paramsDataExcludeSpecifiedAttributes()
          });

          /** @description: 修改 */
          // let arrfinal = [];
          // this.arrTit = [];
          // this.arrCon = [];
          // this.tableData.map((item) => {
          //   if (this.arrTit.indexOf(item.submitColumn) === -1) {
          //     this.arrTit.push(item.submitColumn);
          //     this.arrCon[this.arrTit.indexOf(item.submitColumn)] = [];
          //     this.arrCon[this.arrTit.indexOf(item.submitColumn)].push(
          //       "  " + item.content
          //     );
          //   } else {
          //     console.log("item.content", item.content),
          //       this.arrCon[this.arrTit.indexOf(item.submitColumn)].push(
          //         "  " + item.content
          //       );
          //   }
          // });
          // console.log("arrTit", this.arrTit);
          // console.log("arrCon", this.arrCon);

          // for (var i = 0; i < this.arrTit.length; i++) {
          //   this.arrContotal = []
          //   for (var j = 0; j < this.arrCon[i].length; j++) {
          //     this.arrContotal += this.arrCon[i][j] + "\n";
          //   }
          //   this.arrTit[i] + this.arrContotal;
          //   arrfinal.push(this.arrTit[i] + "\n" + this.arrContotal);
          // }
          // console.log(this.arrContotal);

          // arrfinal = arrfinal.join("");
          // console.log(typeof arrfinal);
          // console.log("插入的数据",arrfinal);
          // this.$store.dispatch("setChengkanInfo", {
          //   id: this.boxData.id,
          //   title1: arrfinal,
          // });
          this.arrays1 = [];
          this.string1 = [];
          this.arrays2 = [];
          this.string2 = [];
          this.arrays3 = [];
          this.string3 = [];
          this.arrays4 = [];
          this.string4 = [];
          this.arrays5 = [];
          this.string5 = [];
          this.arrays6 = [];
          this.string6 = [];
          this.arrays7 = [];
          this.string7 = [];
          this.tableData.map(item => {
            if (item.submitColumn === "领导批示") {
              this.string3.push("▲" + item.showData + item.content + "\n");
            }
            if (item.submitColumn === "部门工作") {
              this.string4.push("▲" + item.showData + item.content + "\n");
            }
            if (item.submitColumn === "分行工作") {
              this.string5.push("▲" + item.showData + item.content + "\n");
            }
            if (item.submitColumn === "子公司工作") {
              this.string6.push("▲" + item.showData + item.content + "\n");
            }
            if (item.submitColumn === "值班动态") {
              this.string2.push("▲" + item.showData + item.content + "\n");
            }
          });
          console.log(this.arrays3, "获取arrays3");
          // for (const i in this.tableData) {
          //   switch (this.tableData[i].submitColumn) {
          //     case "党委成员活动":
          //       this.arrays1.push(this.tableData[i]);
          //       for (const index1 in this.arrays1) {
          //         this.string1.push("▲" + this.arrays1[index1].content);
          //       }
          //       break;
          //     case "高管人员活动":
          //       this.arrays2.push(this.tableData[i]);
          //       for (const index2 in this.arrays2) {
          //         this.string2.push("▲" + this.arrays2[index2].content);
          //       }
          //       break;
          //     case "领导批示":
          //       this.arrays3.push(this.tableData[i]);
          //       console.log(this.arrays3)
          //       // for (const index3 in this.arrays3) {
          //       //   this.string3.push("▲" + this.arrays3[index3].content + '\n');
          //       // }
          //       break;
          //     case "部门工作":
          //       this.arrays4.push(this.tableData[i]);
          //       for (const index4 in this.arrays4) {
          //         this.string4.push("▲" + this.arrays4[index4].content + '\n');
          //       }
          //       break;
          //     case "分行工作":
          //       this.arrays5.push(this.tableData[i]);
          //       for (const index5 in this.arrays5) {
          //         this.string5.push("▲" + this.arrays5[index5].content + '\n');
          //       }
          //       break;
          //     case "子公司工作":
          //       this.arrays6.push(this.tableData[i]);
          //       for (const index6 in this.arrays6) {
          //         this.string6.push("▲" + this.arrays6[index6].content + '\n');
          //       }
          //       break;
          //     case "7":
          //       this.arrays7.push(this.tableData[i]);
          //       for (const index7 in this.arrays7) {
          //         this.string7.push("▲" + this.arrays7[index7].content + '\n');
          //       }
          //       break;
          //   }
          // }
          console.log(this.string2, "获取392");
          console.log(this.string3, "获取393");
          console.log(this.string4, "获取394");
          console.log(this.string5, "获取395");
          console.log(this.string6, "获取396");
          let params_ck2 = {
            id: this.boxData.id,
            ldps: ["this.string2' + '\n'", "'this.string2' + '\n'"],
            zbhb: ["▲ this.string3" + "\n"],
            bmgz: ["▲ this.string4" + "\n"],
            fhgz: ["▲ this.string5" + "\n"],
            zgsgz: ["▲ this.string6" + "\n"]
          };
          let params_ck = {
            id: this.boxData.id,
            zbhb: this.string2,
            ldps: this.string3,
            bmgz: this.string4,
            fhgz: this.string5,
            zgsgz: this.string6
          };
          console.log("vuex_setChengkanInfo的数据------->", params_ck);
          this.$store.dispatch("setChengkanInfo", {
            ldps: params_ck.ldps.join(""),
            zbhb: params_ck.zbhb.join(""),
            bmgz: params_ck.bmgz.join(""),
            fhgz: params_ck.fhgz.join(""),
            zgsgz: params_ck.zgsgz.join("")
          });
          // this.$store.dispatch("setChengkanInfo", {
          //   id: this.boxData.id,
          //   dwcy: this.arrays1.length > 0 ? "【党委成员活动】" : "",
          //   dwcy1: this.string1.join("\n"),
          //   ggry: this.arrays2.length > 0 ? "【高管人员活动】" : "",
          //   ggry1: this.string2.join("\n"),
          //   ldps: this.arrays3.length > 0 ? "【领导批示】" : "",
          //   ldps1: this.string3.join("\n"),
          //   bmlm: this.arrays4.length > 0 ? "【部门工作】" : "",
          //   bmlm1: this.string4.join("\n"),
          //   fhlm: this.arrays5.length > 0 ? "【分行工作】" : "",
          //   fhlm1: this.string5.join("\n"),
          //   zgsgz: this.arrays6.length > 0 ? "【子公司工作】" : "",
          //   zgsgz1: this.string6.join("\n")
          // });
        }
      });
    },
    /** @description: 获取投稿部门数据源 */
    getSubmitDept() {
      this.$api.duty.getSubmitDeptData().then(res => {
        const submitDeptData = (res && res.departList) || [{}];
        this.submitDeptData = submitDeptData;
        console.log("获取投稿部门", res.departList, submitDeptData);
      });
    },
    toSee() {
      if (this.seeArr.length === 0) {
        this.$message({
          message: "请选择要查看的数据",
          type: "warning"
        });
      } else if (this.seeArr.length > 1) {
        this.$message({
          message: "只能选择一条数据",
          type: "warning"
        });
      } else {
        this.$router.push({
          name: "mamuscriptInfoEditDetail",
          query: {
            /** @description: 来源路由名 据此从详情页中导航回来*/
            sourceRouteName: "errorInfoDealForm",
            detail1: JSON.stringify(this.seeArr[0]),
            detail: this.dataFromQuery("detail")
          },
          params: {
            paramsData: this.dataToInherit
          }
        });
        this.$api.duty
          .upDataBlur({ id: this.seeArr[0].id, gjStatus: "已加入编辑稿件" })
          .then(res => {});
      }
    },
    closeWindow() {
      // this.$confirm("关闭前是否保存?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$intent.closeWindow(this);
      //   })
      //   .catch(() => {
      //     this.$intent.closeWindow(this);
      //   });
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.saveInfor();
            this.$intent.closeWindow(this);
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
    },
    saveInfor() {
      this.$message({
        message: "已保存！",
        type: "success"
      });
    },
    all() {
      this.modal = false;
    },
    toCheng() {
      this.dialogFormVisible = true;
    },

    joinCuoQ() {
      if (this.ids.length === 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else {
        this.$api.duty
          .addCuoQ({ ids: this.getStrFromListAndSeparator(this.ids) })
          .then(res => {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          });
      }
    },
    cellClick(row) {},
    /** @description: 加入编辑稿件 */
    joinEdit() {
      this.$api.duty
        .joinEdit({ ids: this.getStrFromListAndSeparator(ids), route: "2" })
        .then(res => {});
    },
    /** @description: 颜色 */
    tableRowClassName(row) {
      if (row.gjStatus === "已加入编辑稿件") {
        return "warning-cell";
      } else if (row.gjStatus === "已编辑") {
        return "warning-row";
      } else {
        return "warning-cell";
      }
    },
    selectRow(rows) {
      this.listData = rows;
    },
    selectRowBox(rows) {
      let arr = [];
      let arr1 = [];
      arr = rows;

      arr.map(item => {
        arr1.push(item.id);
      });
      this.ids = arr1;

      this.seeArr = rows;
    },
    toFind() {
      this.loadList();
    },
    loadList(isRefresh, pagination) {
      this.$api.duty
        .getInfoEditList(
          {
            flag: this.formData.flag,
            // submitColumn:this.formData.submitColumn,
            dateStr: this.formData.dateStr,
            submitColumn: this.formData.submitColumn
            // ? this.formData.submitColumn
            // : this.boxData.id
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.tableData1 = res.list;
          this.pagination.total = res.total;
        });
    },
    toSure() {
      if (this.listData.length === 0) {
        this.$message({
          message: "请选择要增加的数据",
          type: "warning"
        });
      } else {
        this.modal = false;

        let add = [];
        let addArrays = [];
        this.listData.map(item => {
          add.push(item.id);
        });

        for (const i in this.listData) {
          for (const index in this.tableData) {
            if (this.listData[i].id === this.tableData[index].id) {
              addArrays.push(this.listData[i].index);
              this.messageData = addArrays.join(",") + "重复增加!";
            }
          }
        }
        this.$api.duty
          .joinEdit({
            ids: this.getStrFromListAndSeparator(add),
            route: "2",
            editId: this.boxData.id
          })
          .then(res => {
            if (addArrays.length > 0) {
              this.$message({
                message: "操作成功" + this.messageData,
                type: "success"
              });
            } else {
              this.$message({
                message: "操作成功！",
                type: "success"
              });
            }
            this.loadData();
          });
      }
    },
    toAdd() {
      this.modal = true;

      this.getCheckbox();
      this.loadList();
    },

    change() {
      this.toFind();
    },

    loadData() {
      let obj = this.dataFromQuery("detail");

      this.boxData = obj;
      console.log("boxData", this.boxData);
      this.$api.duty.getList({ id: obj.id }).then(res => {
        //draftOrganId   unitId   本行报送的稿件显示为部门名称  draftDepartment    draftOrgan submitUnit
        this.fleG =
          JSON.parse(localStorage.getItem("userInfo")).unitId ==
          res.order.draftOrganId
            ? true
            : false;
        this.tableData = res.list;
        console.log("tableData", this.tableData);
      });
    },
    /** @description: 删除 */
    del() {
      if (this.ids.length === 0) {
        this.$message({
          message: "请选择数据！",
          type: "warning"
        });
      } else {
        this.$api.duty
          .getDelete({ ids: this.ids.join(",") + ",", editId: this.boxData.id })
          .then(res => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.loadData();
          });
      }
    },
    /** @description: 点击增加 栏目列表 */
    getCheckbox() {
      this.options3 = [];
      this.$api.duty
        .getSubmitColumnData({ columnType: "1", type: "1" })
        .then(res => {
          res.columnCategoryList.forEach(item => {
            let obj = {};
            obj.value = item.columnCategory;
            obj.label = item.columnCategory;
            obj.key = item.id;
            this.options3.push(obj);
          });
        });
    }
  },
  activated() {},
  mounted() {
    this.getSubmitDept();
  },
  updated() {},
  created() {
    this.searchData1 = {
      orgName: this.currentUserInfo.unitName,
      unitCode: this.currentUserInfo.unitId,
      orgCode: this.currentUserInfo.unitId,
      unitClass: 1
    };
    this.loadData();

    this.formData.dateStr = this.getCurrentDateTime();
    // this.formData.submitStatus = "";
    // this.formData.submitColumn = "";
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/ .el-table__header {
  background: #e5f0fc;
}
/deep/ .warning-cell {
  background: #f2f5fb;
  color: black;
}
/deep/ .warning-row {
  background: #fde9eb;
  color: black;
}
.addTab {
  width: 75%;
  left: 12%;
  position: fixed;
  top: 150px;
  border-radius: 10px;
  z-index: 3014;
  background-color: #efefef;
  padding: 20px;
}
/deep/ .el-table--fit {
  height: 300px;
  overflow: auto;
  /** @description: margin-top: 20px; */
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2013;
}

/** @description: /deep/ .el-table .success-row { */
/** @description: background: #ffc1c1; */
/** @description: } */
/deep/ .el-table th {
  background: #e5f0fc;
}
table {
  border-collapse: collapse;
}
th {
  border: 1px solid white;
}
td {
  background: #e5f0fc;
  padding-left: 10px;
  height: 40px;
  line-height: 40px;
  border: 1px solid white;
}
.t1 {
  width: 23%;
  text-align: center;
}

.headerClick {
  background: #409eff;
  color: white;
  width: 100%;
  height: 70px;
  line-height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  justify-content: space-between;
  align-items: center;

  .left {
    margin-left: 20px;
  }

  .right {
    margin-right: 20px;
    float: right;
  }
}
.tex {
  color: #bbbaba;
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.zfTwo {
  background: white;
  margin: 0 auto;
  padding-bottom: 150px;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;
    margin-top: 40px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
    }
  }

  .process_content {
    max-width: 75%;
    /** @description: min-height: 920px; */
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          display: inline-block;
          span {
            color: #f9aa21;
          }
        }
      }
    }

    .editor_box {
      height: 500px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 120px;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}
.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}
.bank_dispach_side_nav {
  width: 45px;
  height: auto;
  position: fixed;
  bottom: 8px;
  left: 10%;
  margin-left: -43px;
  text-align: center;

  a {
    width: 45px;
    height: 70px;
    border: 2px solid #3b85ef;
    font-size: 16px;
    margin: 15px 0;
    color: #3b85ef;
    background: #fff;
    border-radius: 10px 0 0 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    width: 45px;
    height: 70px;

    border: 2px solid #3b85ef;
    font-size: 16px;
    margin: 15px 0;
    color: #3b85ef;
    background: #fff;
    border-radius: 10px 0 0 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    background: #3b85ef;
    color: #fff;
  }
}
.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.con-left {
  /** @description: float: left; */
  width: 80%;
  border-right: 1px solid #ccc;
  .con-left-p1 {
    width: 12%;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    border: 1px solid #ccc;
    border-left: 0;
    border-top: 0;
  }
  .con-left-p2 {
    width: 88%;
    height: 30px;
    line-height: 30px;
    float: left;
    border-bottom: 1px solid #ccc;
  }
  .bottom-none {
    border-bottom: 0;
  }
}
.con-right {
  float: left;
  width: 20%;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.adviceInfo {
  position: absolute;
  width: 95%;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.pad_lr10 {
  padding: 0 10px;
}
.chuanyue1 {
  border-bottom: 1px solid #ccc;
}
.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  height: 50px;
  line-height: 50px;
  float: left;
  border-right: 1px solid #ccc;
  text-align: center;
}
.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
.par {
  position: relative;
  .par-child {
    position: absolute;
    top: 30px;
  }
}
/deep/.radio-form .el-radio {
  margin: 10px;
}
/deep/.el-input__inner {
  padding: 0;
}
.orgInfoTable {
  padding: 8px 70px;

  .orgInfoTitle {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #ff0502;
    font-weight: 600;
    text-align: center;
    border-bottom: 2px solid #ff0502;
  }
  .el-row {
    margin-bottom: 3px;
    .el-row:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 5px;
  }
  .bg-purple-dark {
    background: #d8e8f4;
  }
  .bg-purple {
    color: #3b85f0;
    background: #e5f0fc;
  }
  .bg-purple-light {
    background: #e5f0fc;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 40px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .titleFont {
    font-size: 17px;
    text-align: center;
    line-height: 43px;
    font-weight: 600;
  }
  /deep/.el-tooltip_popper {
    max-width: 800px;
  }
  .normalFont {
    padding-left: 34px;
    font-size: 14px;
    text-align: left;
    line-height: 36px;
  }
}
</style>
