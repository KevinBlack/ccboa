<template>
  <div style="background: white;margin: 0 auto;" id="formalDetailzhifa">
    <div class="headerClick">
      <!-- <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>会议主办单</span>
      </div>-->
      <!-- <div class="right"> -->
      <el-button
        class="bank_grid_comtent_active"
        v-for="(item,index) in buttonList"
        @click="buttonClick(item.name)"
        v-show="buttonList[index].show"
        :key="index"
        size="mini"
        plain
      >{{item.name}}</el-button>
      <!-- </div> -->
    </div>
    <div style="padding: 8px 70px;">
      <div class="shiwuTitle">中国建设银行行长办公会议正式通知</div>
    </div>
    <div style="width: 80%;padding: 20px 16px;margin: 0 auto;border: 1px solid #ccc;">
      <div
        style="  width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;"
      >
        <div
          style=" padding-right: 50px;
        display: flex;
      justify-content: space-between ;"
        >
          <div></div>
        </div>
      </div>
      <el-form ref="elForm" :model="formData" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="拟稿人" prop="draftUser">
              <el-input v-model="formData.draftUser" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="formData.tel" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿日期" prop="draftDate">
              <el-input v-model="formData.draftDate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议名称" prop="hyName">
              <el-input v-model="formData.hyName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议时间" prop="hyTime">
              <el-input v-model="formData.hyTime" :style="{width:'100%'}" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议地点" prop="hyAdress">
              <el-input v-model="formData.hyAdress" :style="{width:'100%'}" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议候场地点" prop="hyHcdd">
              <el-input v-model="formData.hyHcdd" :style="{width:'100%'}" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="主持人" prop="zcName">
          <el-input v-model="formData.zcName" disabled></el-input>
        </el-form-item>
        <div style="position:relative;">
          <p class="title_two">报名信息</p>
        </div>

        <el-table :data="tableData" border ref="multipleTable" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="ytOrderNum" label="议题序号" align="center" width="80"></el-table-column>
          <el-table-column prop="lxDeptName" label="列席部门" align="center" width="100"></el-table-column>
          <el-table-column prop="ytName" label="议题名称" align="center" width="120"></el-table-column>
          <el-table-column label="会议材料" align="center">
            <template slot-scope="scope">
              <div class="comp_list">
                <div
                  v-for="(item,index) in  scope.row.attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <div>
                    <span class="numName">{{index+1}}.</span>
                    <span
                      class="name down"
                      @click="viewFile(item,null,item.fileName)"
                    >{{item.fileName}}</span>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="chName" label="参会人员姓名" align="center" disabled width="120">
            <!-- <template slot-scope="scope">
                <el-input v-model="scope.row.chName" disabled></el-input>
            </template>-->
          </el-table-column>
          <el-table-column
            prop="isPersonInCharge"
            label="是否为部门主要负责人"
            :formatter="formatIsPersonInCharge"
            align="center"
            width="150"
          >
            <!-- <template slot-scope="scope">
                <el-radio-group v-model="scope.row.isPersonInCharge" size="mini" disabled>
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="2">否</el-radio-button>
                </el-radio-group>
            </template>-->
          </el-table-column>
          <el-table-column
            prop="leaveReason"
            label="部门主要负责人请假缘由"
            align="center"
            disabled
            width="200"
          >
            <!-- <template slot-scope="scope">
                <el-input v-model="scope.row.leaveReason" disabled></el-input>
            </template>-->
          </el-table-column>
          <el-table-column prop="chCellPhone" label="参会人员手机号码" align="center" disabled>
            <!-- <template slot-scope="scope">
                <el-input v-model.number="scope.row.chCellPhone" disabled></el-input>
            </template>-->
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import exportTable from "../../minixs/exportTable";
// import upfileList from "@/views/bianhan/components/showUploadFile"; //附件展示
import openOrDownLoadFile from "../../minixs/shiwuLineWord";
import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "registerDetail",
  components: {
    uploadFileTs
    // upfileList
  },
  mixins: [openOrDownLoadFile],
  props: {},
  data() {
    return {
      id: "",
      isOnly: true,
      showOrgTree: false,
      selectDept: [],
      tzId: "",
      fileIdfier: [],
      fileIdStr: "",
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      uploadConfig: {
        formId: "msgz",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      attchmentFileInfo: [],
      draftForm: {},
      treeData: [], //人员树
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: false, // 单选true 多选为false
      // hasRadio: false, //是否單選
      dialogTypeNow: "dosend",
      seletOptionsData: [],
      offenUse: false,
      // loadingTree: true,
      tableData: [],
      rules: {},
      rowData: {},
      formData: {
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : ""
      },
      buttonList: [
        { name: "关闭", show: true },
        { name: "打印处理单", show: true },
        { name: "收藏", show: true },
        { name: "查看会议单", show: true }
      ]
    };
  },
  computed: {},
  methods: {
    // 数据转换
    formatIsPersonInCharge(row) {
      return row.isPersonInCharge === "1"
        ? "是"
        : row.isPersonInCharge === "2"
        ? "否"
        : "";
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close_btn();
          break;
        case "打印处理单":
          this.print_btn();
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              this.$api.secreatary.meetings
                .collecTion({ id: this.id, tzId: this.tzId })
                .then(res => {
                  console.log(res);
                  this.downFile(res);
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
          break;
        case "查看会议单":
          this.ckMeet();
          break;
      }
    },
    downFileDown(file) {
      console.log(file, "---------------生成会议单");
      let data = this.$router.resolve({
        path: "/openAndSave_WordHk",
        query: {
          tanSun: "schyd",
          state: "viewFile",
          id: this.id ? this.id : "1",
          zhengWenState: 1,
          JYcode: "A0846C002",
          relativePath: file ? file.filePath : "",
          fileName: file ? file.fileName : "测试.doc",
          tmpFilePath: file ? file.filePath : "",
          tmpFileName: file ? file.fileName : "测试.doc",
          cleanDraftFlag: false,
          multiTenancyId: "000076767qwq0",
          showBtns: true,
          depart: "scqjd",
          saveNameAndNumber: this.formData.title,
          EditType: 1,
          btnShow: "1"
        }
      });
      // console.log(fileInfo, "fileInfo");
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    //查看会议单
    ckMeet() {
      this.$api.secreatary.meetings.ckMeet({ tzId: this.tzId }).then(res => {
        // console.log(res.data.fileName);
        // this.downFile(res.data);
        if (res.data.fileName) {
          this.$post
            .postData(
              "doDownloadFile",
              JSON.stringify({
                function: "doDownloadFile",
                fileName: res.data.fileName,
                filePath: res.data.filePath
              }),
              "A0846C071"
            )
            .then(res => {
              if (res && res.success) {
                this.downFileDown(res);
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "下载失败",
                  duration: 500
                });
              }
            });
        } else {
          this.$message({
            type: "warning",
            message: "尚未生成会议单"
          });
        }
      });
    },
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
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
              // location.href =
              //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              //     res.filePath +
              //     "&fileName=" +
              //     res.fileName;
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
    getFileList() {
      this.tableData.forEach((item, index) => {
        this.$api.setSysConfig.getTextemList({ id: item.ytId }).then(res => {
          this.$nextTick(() => {
            this.attchmentFileInfo = res.data;
            this.tableData.forEach((item, index) => {
              if (this.attchmentFileInfo.length > 0) {
                if (item.ytId == this.attchmentFileInfo[0].dataId) {
                  item.attchmentFileInfo = this.attchmentFileInfo;
                }
              }
              this.tableData.splice(index, 1, item);
            });
            this.$forceUpdate();
          });
        });
      });
    },
    // //附件块
    // fileList(files) {
    // if (this.formData.attchmentFileInfo && this.formData.attchmentFileInfo.length) {
    //     this.formData.attchmentFileInfo.push(...files)
    //   } else {
    //     this.formData.attchmentFileInfo = files
    //   }
    //   if (!this.formData.attachs) {
    //     this.formData.attachs = [];
    //   }
    //   files.forEach(item => {
    //     this.formData.attachs.push(item.id)
    //   })
    //   this.formData.attachid = this.formData.attachs.join(',')
    //   this.$forceUpdate();
    // },
    // submitForm() {
    //     this.$refs["rForm"].validate((valid) => {
    //       if (valid) {
    //         alert('submit!');
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   },
    //  关闭
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
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
              // location.href =
              //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              //     res.filePath +
              //     "&fileName=" +
              //     res.fileName;
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
    close_btn() {
      // this.$confirm("确认关闭？").then(() => {
      this.$intent.closeWindow(this);
      // });
    },
    print_btn() {
      this.$intent.goNewPage(this, {
        path: "/formalDetailDy",
        query: { id: this.id }
      });
    },
    // 加载详情
    loadData() {
      this.$api.secreatary.meetings.getZsDetail({ id: this.id }).then(res => {
        console.log("---------------------res.data", res.data);
        // this.tzId = res.data.tzId;
        this.formData = res.data;
        this.formData.hyTime = formatData(
          res.data.hyTime,
          "YYYY-MM-DD HH:mm:ss"
        );
        this.formData.currentNode = "正式通知";
        this.tzId = res.data.tzId;
        this.getBmTable();
      });
    },
    // 请求报名信息表格
    getBmTable() {
      this.$api.secreatary.meetings
        .BmgetBmTable({ tzId: this.tzId })
        .then(res => {
          this.tableData = res.data;
          this.getFileList();
        });
    },
    // 删除
    del() {},

    //设置控制域
    setConfig() {}
  },
  activated() {},
  mounted() {},
  updated() {},
  created() {
    sessionStorage.setItem("id", this.$route.query.id);
    this.id = sessionStorage.getItem("id");
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.box {
  display: flex;
  border: 1px solid #dcdfe6;
  padding-bottom: 10px;
  border-radius: 4px;
  .right {
    padding: 10px 10px 0 0;
    flex: 1;
  }
}
.zfTwo {
  background: white;
  margin: 0 auto;

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
      float: right;
    }
  }
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
}
//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;

    .one_btn {
      width: 80px;
      height: 42px;
      line-height: 42px;
    }

    .btns {
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
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
    .numName {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 20px;
    }
    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
.now {
  font-size: 14px;
  color: #0f100e;
  margin-left: 20px;
  display: inline-block;
  span {
    color: #f9aa21;
  }
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

/deep/.radio-form .el-radio {
  margin: 10px;
}
</style>
