<template>
  <el-dialog
    :title="teamNoticTitle"
    v-dialogDrag
    width="80% !important"
    :visible.sync="teamNoticVisible"
    @close="cancelDialog"
  >
    <div>
      <!-- <i icon="el-icon-cir cle-plus-outline"></i> -->
      <el-button v-show="flag==1"
        type="primary"
        size="medium"
        style="font-size:17px;margin-bottom: 20px;"
        icon="el-icon-circle-plus"
        @click="addNoticeVisible=true"
      >新增团队公告</el-button>
    </div>
    <el-form :model="teamNoticForm" :inline="true" ref="noticForm" class="noticForm">
      <el-form-item label="公告名称" :label-width="formLabelWidth" prop="noticeHeadName">
        <el-input v-model="teamNoticForm.noticeHeadName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布人" :label-width="formLabelWidth" prop="publisher">
        <el-input v-model="teamNoticForm.publisher" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属团队" prop="teamName">
        <el-select v-model="teamNoticForm.teamName" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.team_id"
            :label="item.team_name"
            :value="item.team_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="search">搜索</el-button>
        <el-button type="primary" size="medium" @click="resetForm('noticForm')">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      class="scroll"
      height="400"
      v-loading="tableLoading" @row-click="openTuanDui"
    >
      <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="noticeHeadName" label="公告名称"></el-table-column>
      <el-table-column prop="teamName" label="团队名称"></el-table-column>
      <el-table-column prop="noticeContent" label="公告内容"></el-table-column>
      <el-table-column prop="publisherName" label="发布人"></el-table-column>
      <el-table-column prop="createTime" label="发布时间"></el-table-column>
      <!-- <el-table-column prop="post" label="状态"></el-table-column> -->
    </el-table>
    <div>
      <el-pagination
        @size-change="handleSizeChange"  
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">取 消</el-button>
    </div>
     <el-dialog title="团队公告" :visible.sync="addNoticeVisiblexq" append-to-body>
      <el-form ref="teamNotice" :model="addNoticeformn" class="team-notice">
        <el-form-item label="公告名称" prop="noticeHeadName">
          <el-input :disabled="true" v-model="addNoticeformn.noticeHeadName" autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item label="所属团队" prop="teamName"> 
          <el-input :disabled="true" v-model="addNoticeformn.teamName" autocomplete="off"></el-input>
          <!-- <el-select :disabled="true" v-model="addNoticeform.teamName" placeholder="请选择">
            
            <el-option 
              :value="item.team_name"
            ></el-option> 
          </el-select>-->
        </el-form-item>
        <el-form-item label="公告内容" prop="noticeContent">
          <el-input :disabled="true" type="textarea" :rows="3" v-model="addNoticeformn.noticeContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelNotice">取 消</el-button>
        <!-- <el-button type="primary" @click="addNotice">保 存</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="新建团队公告" :visible.sync="addNoticeVisible" append-to-body>
      <el-form ref="teamNotice" :rules="rules" :model="addNoticeform" class="team-notice">
        <el-form-item label="公告名称" prop="noticeHeadName">
          <el-input v-model="addNoticeform.noticeHeadName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属团队" prop="teamName">
          <el-select v-model="addNoticeform.teamName" placeholder="请选择">
            <el-option
              v-for="item in addoptions"
              :key="item.team_id"
              :label="item.team_name"
              :value="item.team_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告内容" prop="noticeContent">
          <el-input
            type="textarea"
            :rows="3"
            v-model="addNoticeform.noticeContent"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelNotice">取 消</el-button>
        <el-button type="primary" @click="addNotice">保 存</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // noticeTeamState: {
    //   type: Boolean,
    //   default: false
    // },
    teamNoticTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      flag:"",
      addNoticeformn: {
        noticeHeadName: '',
        noticeContent: '',
        teamName: '',
      },
      bank_countersignature: {
        function: "findByQryCondition"
      },
      getTeamByUserId_parmas: {
        function: "getTeamByUserId"
      },
      getTeamUnderGLY_parmas: {
        function: "getTeamUnderGLY"
      },
      teamNoticForm: {
        publisher: "",
        noticeHeadName: "",
        teamName: ""
      },
      saveNotice_parmas: {
        function: "saveNotice"
      },
      addNoticeform: {
        noticeHeadName: "",
        noticeContent: "",
        teamName: ""
      },
      rules: {
        noticeHeadName: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { message: "字数限200字以内", min: 1, max: 200, trigger: "blur" }
        ],
        noticeContent: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { message: "字数限200字以内", min: 1, max: 200, trigger: "blur" }
        ],
        teamName: [{ required: true, message: "请选择团队", trigger: "change" }]
      },
      options: [],
      addoptions: [],
      teamNoticVisible: true,
      addNoticeVisible: false,
      addNoticeVisiblexq:false,
      formLabelWidth: "80px",
      tableData: [],
      tableLoading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  components: {},
  created() {
     this.flag=localStorage.getItem("glyFlag");
      console.log(this.flag,"00001")
      console.log(JSON.parse(localStorage.getItem("userInfo")),"000009")
    this.initTable();
    this.getTeamByUserId();
    this.getAddoptions();
  },
  watch: {
    // noticeTeamState(newv, oldv) {
    //   this.teamNoticVisible = newv;
    // }
  },
  methods: {
    getTeamByUserId() {
      this.$post
        .postData(
          "getTeamByUserId",
          JSON.stringify(this.getTeamByUserId_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res.data);
          this.options = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAddoptions() {
      this.$post
        .postData(
          "getTeamUnderGLY",
          JSON.stringify(this.getTeamUnderGLY_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res.data);
          this.addoptions = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initTable() {
      this.tableLoading = true;
      this.bank_countersignature.page = this.currentPage;
      this.bank_countersignature.limit = this.pageSize;
      this.bank_countersignature.publisher = this.teamNoticForm.publisher;
      this.bank_countersignature.noticeHeadName = this.teamNoticForm.noticeHeadName;
      this.bank_countersignature.teamName = this.teamNoticForm.teamName;
      this.$post
        .postData(
          "findByQryCondition",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.tdgl
        )
        .then(res => {
          this.tableLoading = false;
          console.log(res.data);
          if (res && res.success) {
            this.tableData = res.data.rows;
            this.total = res.data.total;
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请求失败",
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.tableLoading = false;
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "请求失败",
            duration: 2000
          });
        });
    },
    cancelDialog() {
      this.$emit("teanNotice");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    openTuanDui(val){
      this.addNoticeVisiblexq=true;
      let uuu=this;
      uuu=val;
      this.addNoticeformn.noticeHeadName =uuu.noticeHeadName;
      this.addNoticeformn.noticeContent = uuu.noticeContent;
      this.addNoticeformn.teamName =uuu.teamName;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.tableData = [];
      this.initTable();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = [];
      this.initTable();
    },
    search() {
      console.log(this.teamNoticForm);
      this.initTable();
    },
    addNotice() {
      // teamNotice
      this.$refs["teamNotice"].validate(valid => {
        if (valid) {
          this.saveNotice_parmas.teamName = this.addNoticeform.teamName;
          this.saveNotice_parmas.noticeHeadName = this.addNoticeform.noticeHeadName;
          this.saveNotice_parmas.noticeContent = this.addNoticeform.noticeContent;
          if (this.saveNotice_parmas.teamName == "") {
            this.$message({
              type: "warning",
              message: "请填写所属团队!"
            });
          } else {
            this.$post
              .postData(
                "saveNotice",
                JSON.stringify(this.saveNotice_parmas),
                this.$businessCode.tdgl
              )
              .then(res => {
                console.log(res);
                this.addNoticeVisible = false;
                if (res.success) {
                  this.addNoticeform = {};
                  this.initTable();
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancelNotice() {
     
      //JSON.parse(localStorage.getItem("userInfo")).humanName
      this.addNoticeform = {};
      this.addNoticeformn = {};
      this.addNoticeVisible = false;
      this.addNoticeVisiblexq = false;
    }
  }
};
</script>

<style scoped>

.team-notice .el-input,
.el-textarea {
  width: 80%;
}



</style>