<template>
  <div class="receive_dispatch">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>

        <div class="grid_comtent">
          <el-button
            size="small"
            plain
            @click="viewDraftFile(fromdata.fileName,fromdata.filePath,$businessCode.swglfj,fromdata.title,fromdata.documentCode)"
            v-if="fromdata.filePath"
          >查看正文
          </el-button>
          <el-button plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行电子收文退文单</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form
            ref="fromdata"
            label-width="130px"
            :model="fromdata"
            :rules="rules"
            class="demo_ruleForm"
            :readonly="true"
          >
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="正文标题">
                    <el-input placeholder="正文标题" v-model="fromdata.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <el-input placeholder="附件标题" v-model="fromdata.attachmentTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文日期">
                    <el-input placeholder="收文日期" v-model="fromdata.receiveTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急程度">
                    <el-input v-model="fromdata.emergencyName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文字号">
                    <el-input v-model="fromdata.documentCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文字数" :span="8">
                    <el-input v-model="fromdata.secretType" readonly="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="来文单位">
                    <el-input
                      v-model="fromdata.sendOrgName"
                      placeholder="请选择来文单位"
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期">
                    <el-input
                      v-model="fromdata.completeTime"
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="承办部门">
                    <el-input
                      v-model="fromdata.undertakeDeptName"
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="协办部门">
                    <el-input
                      v-model="fromdata.helpDeptName"
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期">
                    <el-input
                      v-model="fromdata.completeTime"
                      placeholder="请选择来文单位"
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文种" :span="8">
                    <el-input v-model="fromdata.documentClassName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务分类" :span="8">
                    <el-input v-model="fromdata.documentClassName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记人">
                    <el-input disabled v-model="fromdata.recorder"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="秘密类型">
                    <el-input disabled v-model="fromdata.secretType"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="密级和保密期限">
                    <el-input disabled v-model="fromdata.secretFlagType"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">退文信息</h6>
            <div id="qpyj" class="height_90"></div>
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
                  <el-input type="textarea" resize="none" maxlength='500'
                            autosize v-model="fromdata.reason"></el-input>
                  <opinionText
                    :opinionText="fromdata.remarksList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import viewDraft from "@/minixs/viewDraft";
import opinionText from "@/components/opinionText/index";

const tableCol = [
  {label: "选择条目", prop: "mark", align: "center"},
  {label: "自动鉴定期限", prop: "limitDate", align: "center"}
];
export default {
  name: "ReceiveDispatch",
  components: {
    timeDialog,
    opinionText
  },
  data() {
    return {
      fromdata: {
        createTime: "",
        backOrgId: "",
        sendOrderId: "",
        reason: "",
        recOrgId: "",
        backOrgName: "",
        recOrgName: "",
        backUserId: "",
        receiveDocId: "",
        backUserName: "",
        backTime: "",
        receiveTime: "",
        emergencyLevel: "",
        recorder: "",
        documentNo: "",
        secretFlagContent: "",
        secretLimitType: "",
        secretTimeType: "",
        secretType: "",
        secretFlagType: "",
        sendOrgName: "",
        // sendOrgName:"",
        completeTime: "",
        title: "",
        attachTitle: "",
        topic: "",
        documentClassName: "",
        undertakeDeptName: "",
        helpDeptName: "",
        processInstId: "", //流程实例标识
        pTplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
      },
      selectContents: {
        business_secret_flag_type: "", //商业秘籍
        country_secret_flag_type: "", //国家密级
        direct_send_type: "", //直发文种类
        emergency_level: "", //紧急程度
        receive_type: "",
        secret_time_type: "", //保密期限类型
        secret_type: "" //秘密类型
      },
      rules: {
        undertakeDeptName: [
          {trigger: "change", required: true, message: "请选择承办部门"}
        ]
      },
      isDirectFlag: false,
      tabMiJi: true, //秘密级别切换
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      singelCheckF: true, // 单选true 多选为false
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
      keep_limit: ""
    };
  },
  mixins: [viewDraft],
  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_cyxx = document.querySelector("#cyxx").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function () {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    tuiwen() {
      this.shouhuidialog = true;
      this.$post
        .postData(
          "getBackResonList",
          JSON.stringify({function: getBackResonList}),
          this.$businessCode.swgl
        )
        .then(res => {
          res.data = this.twData;
        });
    },
    tuiwenqueding() {
      this.checkedtw = this.checkedtw.push(this.twyy).join(";")
      this.$post
        .postData(
          "getBackResonList",
          JSON.stringify({
            funtion: "doBackSendOrder",
            processInstId: this.fromdata.processInstId,
            reason: this.checkedtw
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          this.shouhuidialog = false;
          this.checkedtw = [];
        });
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(",");
      names = name.split(",");
      ids.map((item, n) => {
        obj.push({
          id: item,
          name: names[n]
        });
      });
      return obj;
    },
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
    //定密依据接收子组件传值
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          this.concatAttrData("pishiOpinion", data);
        } else if (this.clickTypes == 2) {
          this.concatAttrData("officeOpinion", data);
        } else if (this.clickTypes == 3) {
          this.concatAttrData("undertakeOrgOpinion", data);
        }
        this.$forceUpdate();
      }
    },
    //定密依据弹窗弹出
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
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
    selectMiHandler(val) {
      this.fromdata.security = val;
      this.$forceUpdate();
    },
    directchange(val) {
      if (this.fromdata.isDirect == 1) {
        this.fromdata.isDirect = 1;
      } else if (this.fromdata.isDirect == 0) {
        this.fromdata.isDirect = 0;
        this.fromdata.directRange = "";
        this.fromdata.directType = "";
      }
      if (this.fromdata.isDirect == "否") {
        this.isDirectFlag = false
      } else if (this.fromdata.isDirect == "是") {
        this.isDirectFlag = true
      }
    },
    qixianjd() {
      this.dialogVisible = true;
      this.$post
        .postData(
          "selectQXHDBPage",
          JSON.stringify(this.referForm),
          this.$businessCode.swgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.referForm.page = res.data.page;
          this.pagination.total = res.data.total;
        });
    },
    receiveselectlist() {
      this.receiveselect.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWid") || "";
      this.$post
        .postData(
          "selectById",
          JSON.stringify(this.receiveselect),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.data) {
            console.log(res.data);
            this.fromdata = res.data;
            this.curUser = res.data.curUser;
            this.curNodeName = res.data.curNodeName;
            this.bank_doSend.id = res.data.id;
            this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
            this.bank_selectConfig.tplNo = res.data.pTplNo;
            if (res.data.undertakeDeptId) {
              this.chenCheckData = this.concatTreeData(
                res.data.undertakeDeptId,
                res.data.undertakeDeptName,
                "dosend"
              );
            }
            if (res.data.assistDeptId) {
              this.xieCheckData = this.concatTreeData(
                res.data.assistDeptId,
                res.data.assistDeptName
              );
            }
            this.directchange(res.data.isDirect)
            //临时意见处理
            this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
            this.cuteData("remarks", "remarksList", "remarksId");
            this.cuteData(
              "handleTerminateOpinion",
              "handleTerminateOpinionList",
              "handleTerminateOpinionId"
            );
            this.cuteData(
              "officeOpinion",
              "officeOpinionList",
              "officeOpinionId"
            );
          }
        });
    },
    preserve(type) {
      let params = Object.assign(this.saveOrUpdateSW, this.fromdata);
      this.saveOrUpdateSW.id =
        this.receiveselect.id || sessionStorage.getItem("pageSWid") || "";
      this.$post
        .postData("saveOrUpdate", JSON.stringify(params), this.$businessCode.swgl)
        .then(res => {
          console.log("保存", res.data);
          if (res && res.success) {
            sessionStorage.setItem("pageSWid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            this.receiveselectlist();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 1000
          });
        });
    },
    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageXOffset
      );

      if (scrolled < this.distance_qpyj) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_qpyj &&
        scrolled < this.distance_cyxx - 180
      ) {
        this.active = "#qpyj";
      } else if (
        scrolled >= this.distance_cyxx - 200 &&
        scrolled < this.distance_scfj
      ) {
        this.active = "#cyxx";
      } else {
        this.active = "#scfj";
      }
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
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      this.$refs.fromdata.validate((valid, object) => {
        if (valid) {
          return true;
        } else {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
          return true;
        }
      });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeDeptName") {
          this.fromdata.undertakeDeptId = "";
          this.chenCheckData = [];
        }
        if (name === "assistDeptName") {
          this.fromdata.assistDeptId = "";
          this.xieCheckData = [];
        }
      }
    },
    //请求部门树数据
    getTreeData(n) {
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = false;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      switch (n) {
        case "chen":
          name = "承办部门";
          clearName = "undertakeDeptName";
          !this.fromdata.receiveVersion || this.fromdata.receiveVersion === 1 ? this.singelCheckF = true : '';
          break;
        case "xie":
          name = "协办部门";
          clearName = "assistDeptName";
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "selUnitTreeByHQ",
          JSON.stringify(this.bank_mainXiao),
          this.$businessCode.swglgg
        )
        .then(res => {
          console.log(JSON.stringify(res.data));
          that.treeData = (res && res.data) || [];
        });
    },
    //点击 完成并发送 弹窗弹出
    completeSending() {
      let judge = true;
      this.preserve();

      judge = this.saveCheck();
      if (!judge) {
        return;
      }
      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.dialogTypeNow = "doAndsend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.$businessCode.swgl
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(this.bank_send),
              this.$businessCode.swglgg
            )
            .then(res => {
              console.log("树" + res.data);
              this.treeData = res.data;
            })
            .catch(e => {
              console.log(e);
            });
        });
    },
    //完成并发送时校验
    saveCheck() {
      let tips = "您有未输入字段!";
      this.scrollIntoForm();
      if (!this.fromdata.undertakeDeptName || !this.fromdata.undertakeDeptId) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return false;
      } else {
        return true;
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(",");
          ids = ids.join(",");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (dtype) {
          case "chen":
            this.fromdata.undertakeDeptName = names;
            this.fromdata.undertakeDeptId = ids;
            this.chenCheckData = this.checkData;
            break;
          case "xie":
            this.fromdata.assistDeptName = names;
            this.fromdata.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
        }
        //下一环节处理人信息
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      this.bank_doSend.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWid") || "";
      let params = Object.assign(this.bank_doSend, this.fromdata);
      this.$post
        .postData("finishAndSendEtc", JSON.stringify(params), this.$businessCode.swglgg)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 500,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              }
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1000
          });
        });
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "chen":
          this.checkIds = this.fromdata.undertakeDeptId
            ? this.fromdata.undertakeDeptId.split(",")
            : [];
          this.checkData = this.chenCheckData;
          break;
        case "xie":
          this.checkIds = this.fromdata.assistDeptId
            ? this.fromdata.assistDeptId.split(",")
            : [];
          this.checkData = this.xieCheckData;
          break;
        case "xie":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "SWGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.fromdata.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: this.fromdata.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false,
                    flowTranId: this.$businessCode.swgl,
                  }
                });
                window.open(data.href, "_blank");
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件不存在",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "deleteOpinionById",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.receiveselectlist();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1000
            });
          }
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
    },
  },
  watch: {},
  created() {
    let that = this;
    this.receiveselect.id = this.$route.query.id ? this.$route.query.id : "";
    this.receiveselectlist();
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
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
  height: 90px;
  line-height: 90px;
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
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3b85ef;
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
</style>
