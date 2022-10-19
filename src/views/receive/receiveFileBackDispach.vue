<template>
  <div class="receive_dispatch">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
        </p>
        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" size="small" @click="handelclose">关闭</el-button>
          <el-button
            size="small"
            plain
            @click="viewDraftFile(fromdata.fileName,fromdata.filePath,$businessCode.swglfj,fromdata.title,fromdata.documentCode)"
            v-if="fromdata.filePath"
          >查看正文</el-button>
          <el-button plain size="small" @click="processSheet('/twdxjh')">打印处理单</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行电子退文处理单</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <!-- <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >文件要素</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >签批对象</a>
        <a
          href="javascript:void(0);"
          :class="active == '#cyxx' ? 'active' : ''"
          @click="toTarget('#cyxx')"
        >退文信息</a>
      </div> -->

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form
            ref="fromdata"
            label-width="130px"
            :model="fromdata"
            class="demo_ruleForm"
            :disabled="true"
          >
            <!-- 当前环节注释 -->


            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="正文标题">
                    <el-input v-model="fromdata.title" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <!-- <el-input v-model="fromdata.attachTitle" readonly></el-input> -->
                       <el-input
                      type="textarea"
                      autosize
                      resize="none"
                      placeholder="附件标题"
                      v-model="fromdata.attachTitle"
                      style="white-space:pre-line;word-break:break-all"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文日期">
                    <el-input v-model="fromdata.receiveTime" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8" prop="emergencyLevel" ref="emergencyLevel">
                    <el-input v-model="fromdata.emergencyLevel" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文字号" prop="documentCode" ref="documentCode">
                    <el-input v-model="fromdata.documentCode" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文字数" prop="receiveWords" ref="receiveWords">
                    <el-input v-model="fromdata.receiveWords" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务分类" prop="bussinessTypeName" ref="bussinessTypeName">
                    <el-input v-model="fromdata.bussinessTypeName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文种" prop="documentClassName" ref="documentClassName">
                    <el-input v-model="fromdata.documentClassName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <div>
                 <!-- <el-row> -->
                   <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8">
                      <el-input  v-model="fromdata.secretType" readonly></el-input>
                  </el-form-item>
                </el-col>
                <div>

                </div>
                <div v-if="fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子发文'||  fromdata.fromWhere == ''">
                  <el-col :span="8" v-if="fromdata.secretType == '商业秘密'">
                    <el-form-item label="秘密期限类型" :span="8">
                      <el-input  v-model="fromdata.secretLimitType" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="fromdata.secretType != '商业秘密'">
                    <el-form-item label="秘密标志" :span="8">
                      <el-input  v-model="fromdata.secretFlagType" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="fromdata.secretType == '商业秘密'">
                      <el-form-item
                        label="密级和保密期限"
                        :span="8"
                      >
                        <el-input  v-model="fromdata.secretFlagType" readonly style="width:40%" ></el-input>
                        <i class="el-icon-star-off pad_10"></i>
                      <el-input style="width:40%" v-model="fromdata.secretFlagContent" readonly><el-button slot="append">{{fromdata.secretTimeType}}</el-button></el-input>
                      </el-form-item>
                  </el-col>
                </div>



                <div v-if="fromdata.fromWhere == '实物收文'">
                  <el-col :span="8">
                      <el-form-item label="密级和保密期限">
                          <el-input
                            v-model="fromdata.secretFlagType" readonly="readonly"
                          ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" class="linecenter">
                      <el-form-item label="/" label-width="20px">
                          <el-input
                            :value="fromdata.secretLimitType" readonly="readonly"
                          ></el-input>
                      </el-form-item>
                    </el-col>
                </div>
                </div>
                 <!-- </el-row> -->

                <el-col :span="8">
                  <el-form-item label="来文单位">
                    <el-input
                      v-model="fromdata.sendOrgName"
                      placeholder="请选择来文单位"
                      style="width: 100%;"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期">
                    <el-date-picker
                      v-model="fromdata.completeTime"
                      type="date"
                      placeholder="选择日期"
                      disabled
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="文种" :span="8">
                    <el-input  v-model="fromdata.documentClassName"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="8">
                  <el-form-item label="登记人">
                    <el-input disabled v-model="fromdata.recorder"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="承办部门" prop="undertakeDeptName" ref="undertakeDeptName">
                    <el-input
                      v-model="fromdata.undertakeDeptName"
                      placeholder="请选择承办部门"
                      readonly
                      style="width: 100%;"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="协办部门"  prop="assistDeptName" ref="assistDeptName">
                    <el-input
                      v-model="fromdata.assistDeptName"
                      placeholder="请选择协办部门"
                      readonly
                      style="width: 100%;"
                    >
                      </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" width="0">
                    <el-input
                      v-model="fromdata.finishAssistDeptName"
                      placeholder=""
                      style="width: 100%;"
                      readonly
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <!-- 传阅信息 -->
            <template v-show="false">
              <h6 class="bank_dispach_file_tit">退文信息</h6>
              <div id="cyxx" class="height_90"></div>
              <el-row>
                  <el-col :span="8">
                  <el-form-item label="退文人">
                    <el-input disabled v-model="fromdata.backUserName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文时间">
                    <el-input disabled v-model="fromdata.receiveTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="退文时间">
                    <el-input disabled v-model="fromdata.backTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="退文原因">
                    <el-input type="textarea" resize="none" autosize disabled v-model="fromdata.reason"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>

          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "receiveFileBackDispach",
  data() {
    return {
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      dialogVisiblefasong:false,//发送确定弹窗
       //下载文件
      bank_doDownloadFile:{
        function: "doDownloadFile",
        fileName: "",
        filePath:""
      },
      receiveselect: {
        function: "selectBackById",
        id: ''
      },
      curUser: "",
      curNode: "",
      //直发文件是否
      directFlag: false,
      active: "#wjys",
      fromdata: {
        wz:"",
        yefl:"",
        attachSort:[],
        attchmentFileInfo:[],
        feedbackAttachmentMap:"",
        receiveVersion:"",
        curNodeCode:'',
        limitDate:"",//办理期限
        keepLimitName:"",
        progress:"", //办理进度
        daysInAdvance:"",// 提前提醒天数
        superviseUserName:"",//督办人
        superviseDate:"",//督办日期
        direct_send_range: "", //直发范围
        keep_limit: "", //保管期限
        secret_flag_type: "", //秘密标志类型
        undertakeDeptName: "",
        processInstId: "", //流程实例标识
        tplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        pishiOpinion: "", //批示意见
        isDirect: 0, // 是否直发
        forwordRequirements: "",
        isForword: "0", //转发文件
        title: "",
        sendSubId:"",//发送对象id
        sendSubName:"",//发送对象名称
        attachTitle: "",
        receiveTime: "",
        emergencyName: "",
        documentCode: "",
        secretTypeName: "",
        security: "",
        secretLimitName: "",
        sendOrgName: "",
        completeTime: "",
        fromWhere:"",
        receiveType: "",
        userName: "",
        directRange: "",
        directType: "",
        isRead:"",
        isHasXB:"",
        pishiOpinionList:"",
        remarksList:"",
        handleTerminateOpinionList:"",
        helpOrgOpinionList:"",
        undertakeOrgOpinionList:"",
        officeOpinionList:"",
        secretLimitType:"",
        secrerFlagType:"",
        superviserName:"",
        superviseStartTime:"",
        secretFlagContent:"",
        secretFlagType:"",
        secretTimeType:"",
      },
      dzswShi:0,
      shdialogType:"",//是收回还是催办
      shdialogTypeUnder:"",//是收回还是催办是否加字段
      isDirectFlag:false,
      tabMiJi: true, //秘密级别切换
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      singelCheckF: true, // 单选true 多选为false
      loadingTree:false,
      tableLoading: false,
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      selectMicontent: [], //密级数据下拉框
      checkedArr: [],
      keep_limit:"",
      addSendType:'',//增发 承办 协办部门  标示
      //正文
    };
  },
  mixins: [viewDraft],
  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_cyxx = document.querySelector("#cyxx").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    //拼接数据
    concatAttrData(name, data) {
      this.fromdata[name] = this.fromdata[name]
        ? this.fromdata[name] + data
        : data;
    },
    //数据截取
    cuteData(data, name, type) {
      if (this.fromdata[name]) {
        this.fromdata[name].forEach(item => {
          if (!item.status) {
            this.fromdata[data] = item.content;
            this.fromdata[type] = item.id;
          }
        });
      }
    },
    receiveselectlist() {

      this.$post
        .postData(
          "selectBackById",
          JSON.stringify(this.receiveselect),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.data) {
            this.fromdata = res.data;
            if (this.fromdata.isDirect == 1) {
              this.fromdata.isDirect = 1;
              this.dzswShi = 1;
            } else if (this.fromdata.isDirect == 0) {
              this.fromdata.isDirect = 0;
            }
            if (this.fromdata.isForword == "1") {
              this.fromdata.isForword = "1";
            } else if (this.fromdata.isForword == "0") {
              this.fromdata.isForword = "0";
            }


            if (res.data.assistDeptId) {
              this.transIds = res.data.assistDeptId

              this.xieCheckData = this.concatTreeData(
                res.data.assistDeptId,
                res.data.assistDeptName
              );
            }
            this.fromdata.remarksList =
            res.data &&
            res.data.remarksList.length &&
            res.data.remarksList;
            //临时意见处理
            this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
            this.cuteData("remarks", "remarksList", "remarksId");
            this.cuteData(
              "handleTerminateOpinion",
              "handleTerminateOpinionList",
              "handleTerminateOpinionId",
              "undertakeOrgOpinionList",
              "helpOrgOpinionList"
            );
            this.cuteData(
              "officeOpinion",
              "officeOpinionList",
              "officeOpinionId"
            );
          }
        });
    },
    // 关闭
    handelclose() {
      this.$confirm("是否退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          window.location.href = "about:blank";
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
    },

   //切换秘密类型
    selectType(type) {
      if (type.trim() === "商业秘密") {
        this.selectMicontent = [].concat(
          this.selectContents.country_secret_flag_type
        );
      } else if (type.trim() === "国家秘密") {
        this.selectMicontent = [].concat(
          this.selectContents.business_secret_flag_type
        );
      }
      this.fromdata.security = "";
    },
    //请求文件路径
    async getFileInfo(self) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.swglfj
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
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
    //正文跳转
    doDraft(fileInfo,saveName){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          id:this.fromdata.id,
          zhengWenState:0,
          JYcode: this.$businessCode.swglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          showBtns:false,
          flowTranId:this.$businessCode.swgl,    //流程交易线     chai
          processInstId:this.fromdata.processInstId,
          saveSpecialFileName:saveName
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 打印处理单
    processSheet(path,id) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
            id:this.fromdata.id,
            choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },

  },
  watch: {},
  created() {
    let that = this;
    //初始化修改交易线 (传后台)
    this.receiveselect.id = this.$route.query.id ? this.$route.query.id : "";
    this.receiveselectlist();
     this.$post
      .postData(
        "getReceiveDropDownDataSource",
        JSON.stringify({function:"getReceiveDropDownDataSource"}),
        this.$businessCode.swgl
      )
      .then(res => {
        if (res && res.success) {
          that.selectContents = Object.assign(
            {},
            that.selectContents,
            res.data
          );
          this.selectType((this.fromdata.secretTypeName = "商业秘密"));
          //this.rules = Object.assign(this.rules,this.copyRules);
          this.$nextTick(() => {
            this.$refs.fromdata.clearValidate();
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
}

</script><style lang="less" rel="stylesheet/less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
}
.bank_dispach_tit {
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.bank_dispack_side {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
    width: 180px;
    font-size: 24px;
    color: #fff;
    .el-icon-arrow-left {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #fff;
      color: #3b85ef;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 8px;
    }
  }
  .grid_comtent {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .bank_grid_comtent_active {
      border: 1px solid #fff;
      background: #0563c8;
      color: #fff;
    }
  }
}
.pl65 {
  padding-left: 65%;
}
.bank_dispach_content {
  width: 100%;
  height: auto;
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
    .active {
      background: #3b85ef;
      color: #fff;
    }
  }

  .bank_dispach_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        font-size: 12px;
        margin: 40px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: #ff6600;
          }
        }
        .bank_article_illustrates {
          position: absolute;
          top: 3px;
          right: 10px;
        }

      }
       .bank_db_height {
        height: auto;
      }
    }
    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 20px 0;
    }

    el-form-item {
      margin: 10px 0;
    }
  }

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
/deep/ .hqbm .el-textarea__inner {
  color: red !important;
  height: 40px !important;
  min-height: 40px !important;
}
/deep/ .hqbm1 .el-textarea__inner {
  height: 40px !important;
  min-height: 40px !important;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
}
.linecenter {
  /deep/ .el-form-item__label {
    width: 30px;
    text-align: center;
    padding: 0;
  }
}
.d_flex {
  display: flex;
  padding-bottom: 20px;
  .d_b100 {
    width: 100%;
  }
  .d_f1 {
    flex: 1;
  }
}
.pos_r {
  position: relative;
}
/deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #606266;
}
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  padding: 0 10px;
}
.disable_w {
  width: 100%;
}
.tree_w {
  height: 200px;
  padding:20px;
  overflow:scroll;
  margin:10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-scrollbar {
  height: 100%;
}
.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  font-size:14px;
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
  .down{
    cursor: pointer;
  }
  .down:hover{
   color: #3b85ef
  }
}
</style>
