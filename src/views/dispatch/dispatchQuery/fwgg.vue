<template>
  <div>
    <el-row>
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm transition_wrap"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select
                  v-model="ruleForm.choseYear"
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
            <el-col :span="6">
              <el-form-item label="日期" prop="noticeRangeTime">
                <el-date-picker
                  style="width:100%;"
                  @change="noticeRangeTimeChange()"
                  v-model="noticeRangeTime"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
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
            <!-- <el-col :span="6">
              <el-form-item label="机构名称" prop="">
                <div class="dispatchcswhlshwh">
                  <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                    <el-input
                      type="text"
                      readonly="readonly"
                      placeholder="请选择"
                      v-model="unitName"
                      suffix-icon="el-icon-arrow-down"
                    />
                  </select-org-or-dept>
                </div>
              </el-form-item>
            </el-col> -->
            <el-col :span="24" style="text-align: center;margin-bottom: 10px;">
              <el-col v-if="!down" class="arrowup">
								<el-button type="primary" @click="getTableList('1')" style="margin:0 10px">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <!-- <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button> -->
              </el-col>
            </el-col>
          </el-row>
          <!-- <div v-if="down" class="clearfix">
            <el-row>
              <el-col :span = "8">
                <el-form-item label="制发行" prop="draftOrganId">
                  <el-select v-model="ruleForm.draftOrganId" style="width:100%" :readonly="false" clearable>
                    <el-option v-for="item in bankOptions" :key="item.unitId" :value="item.unitId" :label="item.unitName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="getTableList('1')">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="down">
                <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-up el-icon--left"></i> 收起
                </el-button>
              </el-col>
            </el-row>
          </div> -->
        </el-form>
      </el-col>
      <el-col style="text-align:right;margin-top:10px;"><el-button size="small" @click="exportExc">导 出</el-button></el-col>
      <el-col style="margin: 10px 0;">
        <m-table
          size="medium"
          :isIndex="true"
          :isPagination="true"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @cellClick="cellClick"
          v-loading="tableLoading"
        ></m-table>
      </el-col>
    </el-row>
    <el-dialog
      v-dialogDrag
      :visible.sync="FWGGdialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="发文公告"
    >
      <el-form v-model="rowInfoFWGG" label-width="130px">
        <el-row>
          <el-col>
            <el-form-item label="正文标题:">
              <el-row>
                <el-col :span="20">
                  <el-button type="text" @click="drafting(0)" class="opendraftFWGG">{{ rowInfoFWGG.title }}</el-button>
                </el-col>
                <el-col :span="4" style="text-align:right;">
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="collect('notice', bank_dispach.id)">收藏</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字号:">{{ rowInfoFWGG.documentNo }}</el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="附件:">
              <el-scrollbar>
                <div
                  v-for="(item,index) in attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_file">
                      <span
                        class="name down"
                        :title="item.fileName"
                        @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fawglfj)"
                      >{{index+1}}. {{item.fileName}}</span>
                      <div class="btns">
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downFile(item)"
                          round
                        >下载</el-button>
                      </div>
                    </div>
                  </template>
                </div>
              </el-scrollbar>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";
import treeCofig from "@/components/tree/tree-fawen";
// import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFileQuery from "@/minixs/dispatchFileQuery"
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft";
import dispatchIndex from "@/minixs/dispatchIndex";

export default {
  name: "Fwggcx",
  mixins: [dispatchFileQuery, viewDraft,dispatchIndex],
  components: {
    mTable,
    // optionalfield,
    // treeCofig,
    // selectOrgOrDept
  },
  data() {
    return {
      isGly:false,
      bank_select: {
        function: "searchNoticeOrder"
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit:20
      },
      bank_dispach:{
        id:''
      },
      noticeRangeTime: [],
      ruleForm: {
        noticeTimeStart: "",
        noticeTimeEnd: "",
        title: "",
        documentNo: "",
        draftOrganId: ""
      },
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      fromdata:{
        fileName:'',
        filePath:''
      },
      tableCols: [
        { label: "公告日期", prop: "createTime", align: "center", width: "150px" },
        { label: "发文类型", prop: "type", align: "center", width: "80px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "拟稿部门", prop: "draftDepartment", align: "center", width:"120px" }
      ],
      attchmentFileInfo: [],
			FWGGdialogVisible: false,
			rowInfoFWGG:{},//发文公告点击行信息
    };
  },
  methods: {
    exportExc(){
      exportTable.exportExcel("发文公告查询表",".el-table");
    },
    /**
     * 发文公告列表查询
     */
    getTableList(val) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId
      if(val=="1") {
        this.pagination.page = 1;
      }
			this.bank_select = Object.assign(this.bank_select,this.ruleForm);
      this.bank_select.st = localStorage.getItem('st');
      this.$post
        .postData(
          "searchNoticeOrder",
          JSON.stringify(Object.assign({},this.bank_select, this.pagination)),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableData = (res.data && res.data.rows) || [];
          this.pagination.total = res.data.total;
          this.bank_select.totalCount = (res.data && res.data.total) || 0;
        });
    },
    noticeRangeTimeChange(times) {
      if (!this.noticeRangeTime ||this.noticeRangeTime == "null" ||this.noticeRangeTime == "undefined") {
        this.ruleForm.noticeTimeStart = "";
        this.ruleForm.noticeTimeEnd = "";
        return false;
      }
      this.ruleForm.noticeTimeStart = this.noticeRangeTime[0];
      this.ruleForm.noticeTimeEnd = this.noticeRangeTime[1];
    },
    cellClick(row, column, cell, event) {
      let that = this;
      that.rowInfoFWGG = row;
      that.FWGGdialogVisible = true;
      let readType = {
        function: "getSendOrderNoticeById",
        id: row.id
      };
      that.bank_dispach.id = row.id;
      that.fromdata.fileName = row.fileName;
      that.fromdata.filePath =row.filePath;
      that.$post
        .postData(
          "getSendOrderNoticeById",
          JSON.stringify(readType),
          that.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            that.attchmentFileInfo = res.data.attchmentFileInfo || [];
          } else {
            that.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          that.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "后端返回失败",
            duration: 1000
          });
        });
    },
    handleOpenPage(path, id, readType) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          readFlag: readType,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    resetForm() {
      // this.handleScaleMaintain();
			this.noticeRangeTime = [];
			this.ruleForm = {
        noticeTimeStart: "",
        noticeTimeEnd: "",
        title: "",
        documentNo: "",
        draftOrganId: ""
      };
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
      this.tableData = [];
    },
    cellClickTodo(row) {
      let skipPathObj = skipPath(row);
      let todoPath = skipPathObj.todoDetailRouter;
      let routeData = this.$router.resolve(todoPath);
      window.open(routeData.href, "_blank");
    },
    drafting(state) {
      let that = this;
      if (!this.rowInfoFWGG.id) {
        this.$message({
          type: "error",
          offset: 100,
          showClose: true,
          message: "当前发文公告有误",
          duation: 500
        });
        return;
      } else {
        this.getFileInfoFWGG(that).then(res => {
          if (res.state) {
            this.doDraft(res);
          }
        });
      }
    },
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: this.rowInfoFWGG.id,
          zhengWenState: 0,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          tmpFileName: fileInfo ? fileInfo.fileNameTh : "",
          tmpFilePath: fileInfo ? fileInfo.filePathTh : "",
          isHasRedHead: fileInfo && fileInfo.fileNameTh ? true : false,
          saveSpecialFileName:this.rowInfoFWGG.documentNo + this.rowInfoFWGG.title,
          pageFlag: "fawen",
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    viewFile(file) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              fileType.map(item => {
                if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                  openPlugin = true;
                }
              });
              if (openPlugin) {
                this.zhengWenState = 0;
                this.doDraft(res);
              } else {
                downLoadFileReName(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName +
                    "&openFile=true",
                  res.fileName
                );
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "后端获取文件失败",
                duration: 500
              });
            }
          }
        });
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    },
    async getFileInfoFWGG(self,thInfo) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fawglfj
        )
        .then(res => {
          if (res && res.success) {
            if (thInfo) {
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            } else {
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端获取失败",
              duration: 500
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取失败",
            duration: 500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.ruleForm.documentNo = '〔'+ openTimeYear +'〕'
      
    }
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.defaultYear();
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
.opendraftFWGG{
	color: #409EFF;
	cursor: pointer;
}
/deep/ .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;
    .btns {
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
      text-align: right;
    }
    .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }
    .down {
      cursor: pointer;
    }
    .down:hover {
      color: #3b85ef;
    }
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
</style>
