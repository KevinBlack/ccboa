
<template>
  <div>
    <el-header>
      <div class="headerClick">
        <el-button
          class="btnstyle"
          style="background: #0563c8!important;
           color: #fff!important;"
          @click="onClose()"
        >关闭</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="item.show"
          plain
        >{{item.name}}</el-button>
      </div>
    </el-header>
    <div class="maintitle">{{dataForm.curBank}}党委成员离京报告表</div>
    <div class="container" id="loadPdf">
      <div class="content-header">
        <p>
          当前环节：
          <span style="color: #f60; color: red !important;">{{dataForm.currentNode}}</span>
        </p>
        <p>
          当前处理人：
          <span style="color: #f60; color: red !important;">{{dataForm.curUserName}}</span>
        </p>
      </div>
      <el-form
        label-position="right"
        :model="dataForm"
        class="formData"
        label-width="80px"
        style="margin-top: 30px;"
        :validate-on-rule-change="false"
        :rules="rules"
        ref="dataForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="报告人" prop="name">
              <el-input v-model="dataForm.name" disabled type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="前往地点" prop="address">
              <el-input v-model="dataForm.address" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-form-item label="离京时间" prop="ljTime">
                  <el-date-picker
                    v-model="dataForm.ljTime"
                    disabled
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="ljTimeDetail" label-width="0">
                  <el-select v-model="dataForm.ljTimeDetail" disabled>
                    <el-option label="上午" value="上午"></el-option>
                    <el-option label="下午" value="下午"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-form-item label="返京时间" prop="fjTime">
                  <el-date-picker
                    v-model="dataForm.fjTime"
                    style="width: 100%;"
                    disabled
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="fjTimeDetail" label-width="0">
                  <el-select v-model="dataForm.fjTimeDetail" disabled>
                    <el-option label="上午" value="上午"></el-option>
                    <el-option label="下午" value="下午"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-form-item label="批示意见" prop="comments">
            <template v-if="options && options.length">
              <div class="detailComments" v-for="(item, index) in options" :key="index">
                <el-input type="textarea" resize="none" disabled v-model="item.content"></el-input>
                <p class="finishedInfo" v-if="dataForm.currentNode !== '起草'">
                  <span>{{item.deptName}}</span>
                  <span>{{item.createUser}}</span>
                  <br />
                  <span class="time">{{item.createTime}}</span>
                </p>
              </div>
            </template>
            <div v-else>
              <el-input type="textarea" disabled v-model="dataForm.comments"></el-input>
            </div>
          </el-form-item>
        </el-row>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="批示意见" prop="comments">
              <el-row v-if="options.length==0">
                <el-input type="textarea" v-model="dataForm.comments" resize="none" disabled></el-input>
              </el-row>
              <div class="d_flex" v-if="options.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item, index) in options"
                    :key="index"
                    style="background: #e0e0e057; padding: 5px 10px"
                  >
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="出差事由" prop="outReason">
          <el-input type="textarea" v-model="dataForm.outReason" disabled></el-input>
        </el-form-item>
        <el-form-item label="总行部门陪同人员" prop="ptPersion">
          <el-input
            type="textarea"
            placeholder="总行部门负责人，原则上不超过三人"
            v-model="dataForm.ptPersion"
            disabled
          ></el-input>
        </el-form-item>
        <!-- <el-row>
          <el-form-item label="备注" prop="remark">
            <template v-if="remarks && remarks.length">
              <div class="detailComments" v-for="(item, index) in remarks" :key="index">
                <el-input type="textarea" resize="none" disabled v-model="item.content"></el-input>
                <p class="finishedInfo" v-if="dataForm.currentNode !== '起草'">
                  <span>{{item.deptName}}</span>
                  <span>{{item.createUser}}</span>
                  <br />
                  <span class="time">{{item.createTime}}</span>
                </p>
              </div>
            </template>
            <div v-else>
              <el-input type="textarea" v-model="dataForm.remark" disabled></el-input>
            </div>
          </el-form-item>
        </el-row>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-row v-if="remarks.length==0">
                <el-input type="textarea" v-model="dataForm.remark" resize="none" disabled></el-input>
              </el-row>
              <div class="d_flex" v-if="remarks.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item, index) in remarks"
                    :key="index"
                    style="background: #e0e0e057; padding: 5px 10px"
                  >
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="person">
        <p>
          <span>填报人:</span>
          <span>{{dataForm.authorCn}}</span>
        </p>
        <p>
          <span>填报时间：</span>
          <span>{{dataForm.draftTime}}</span>
        </p>
      </div>
    </div>
    <!--查看流程-->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
  </div>
</template>

<script >
import minixs from "@/minixs/index";
import exportTable from "@/minixs/exportTable";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
export default {
  mixins: [minixs],
  components: {
    shiwuFlow
  },
  data() {
    return {
      flowChartList: [],
      showFlowChart: false,
      options: [], // 批示意见
      remarks: [], // 备注
      buttonList: [
        // { name: '保存', type: 'baocun', show: false },
        // { name: "完成并发送", type: "wanchengfasong", show: false },
        // { name: "删除此文", type: "shanchuciwen", show: false },
        // { name: "收回", type: "shouhui", show: false },
        // { name: "办结", type: "banjie", show: false },
        { name: "查看流程", type: "ckliucheng", show: true },
        { name: "打印处理单", type: "dayinchulidan", show: true },
        { name: "收藏", type: "shoucang", show: true },
        { name: "操作指南", type: "caozuozhinan", show: true }

        // { name: "维护", type: "weihu", show: false },
      ],
      fileArr: [],
      identify: 0,
      dataForm: {
        draftTime: "",
        authorCn: "",
        name: "",
        address: "",
        ljTime: "",
        ljTimeDetail: "",
        fjTime: "",
        fjTimeDetail: "",
        comments: "",
        outReason: "",
        ptPersion: "",
        remark: ""
      },
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      rules: {},
      type: null
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    // 流程
    async getProcessDetailList() {
      let response = await this.$api.secreatary.partyMemLeavRep
        .getProcessDetail({
          id: this.$route.query.id
        })
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.flowChartList = response.data;
      } else {
        this.$message.error(response.msg);
      }
    },
    buttonClick(params) {
      switch (params) {
        case "保存":
          this.dataForm.id ? this.editSaveReport() : this.saveReport();
          break;
        case "完成并发送":
          this.showNext();
          break;
        case "删除此文":
          this.deleteReport();
          break;
        case "办结":
          this.overFinished();
          break;
        case "查看流程":
          console.log("查看流程");
          this.getProcessDetailList().then(() => {
            this.showFlowChart = true;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
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
              this.$api.secreatary.partyMemLeavRep
                .shoucang({ id: this.dataForm.id })
                .then(res => {
                  console.log(res, "获取收藏返回值");
                  this.downFile(res);
                  // this.$message({
                  //   type: "success",
                  //   offset: "200",
                  //   message: "收藏完成"
                  // });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
          break;
        case "打印处理单":
          console.log("打印处理单");
          this.openNewWindow("/partyMemLeavRep", { id: this.dataForm.id });
          break;
        case "操作指南":
          console.log("操作指南");
          this.caozuozhinan();
          break;
      }
    },
    // 下载
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      // bank_doDownloadFile.filePath = '/home/ap'+file.filePath;
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
    // 办结
    async overFinished() {
      this.dataForm.handleButton = "办结";
      let response = await this.$api.secreatary.partyMemLeavRep
        .submitToSend(this.dataForm)
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.$message({
          type: "success",
          message: "成功"
        });
      } else {
        this.$message.error(response.msg);
      }
    },
    //操作指南
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "MSGZ"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_WordTs",
                  query: {
                    state: "viewFile",
                    id: this.dataForm.id,
                    zhengWenState: 0,
                    JYcode: "A08462002",
                    multiTenancyId: "000000iiii",
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false
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
    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      console.log("-----flagFile--->", flagFile);
      var successInfo = { state: false };
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = flagFile.fileName;
      bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
          console.log("-----res", res);
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请重新上传",
              duration: 1500
            });
            successInfo.state = false;
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件获取失败，请联系管理员",
            duration: 1500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    showNext() {
      // 新增时候先保存后在展示下一环节
      if (!this.dataForm.id) {
        this.saveReport().then(res => {
          if (res) {
            this.getNodes();
          }
        });
      } else {
        // 其他情况直接展示下一环节
        if (this.huanJieMessage.acyNodeNextBount) {
          if (!this.dataForm.comments) {
            return this.$message.error("请填写批示意见");
          } else {
            this.getNodes();
            // this.editSaveReport().then((res) => {
            //   if (res) {
            //     this.getNodes()
            //   }
            // })
          }
        } else {
          this.getNodes();
          // this.editSaveReport().then((res) => {
          //   if (res) {
          //     this.getNodes()
          //   }
          // })
        }
      }
    },
    // 获取节点及人员数
    getNodes() {
      const that = this;
      this.$api.secreatary.partyMemLeavRep
        .getNodeAndUsers({
          id: that.dataForm.id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            that.treeData = res.data.result.data;
            that.seletOptionsData = res.data.list;
            // that.seletOptionsData = that.shoNextNode(
            //   that.seletOptionsData,
            //   that.huanJieMessage.acyNodeNextBount
            // );
            that.dialogState = true;
            // if (that.huanJieMessage.acyNodeNextBount) {
            //   return that.seletOptionsData = that.shoNextNode(
            //     that.seletOptionsData,
            //     that.huanJieMessage.acyNodeNextBount
            //   );
            // }
          }
        });
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      if (!status) {
        return;
      }
      switch (dtype) {
        case "next":
          // 保存并发送
          this.sendReport(data[0], params);
          break;
        case "cy":
          // this.cyCheckData = [];
          // var yyPleArray =!!this.formdata.yyIds? this.formdata.yyIds.split(" "):this.formdata.yyIds;
          // var wyPleArray =!!this.formdata.wyIds?this.formdata.wyIds.split(" "):this.formdata.wyIds;
          // this.cyCheckData = data;
          // var storData = [];
          // let count = 0;
          // for (let i = 0; i < data.length; i++) {
          //   if (!!yyPleArray&&
          //     yyPleArray.includes(data[i].idStr.toString()) ||
          //     !!wyPleArray&&wyPleArray.includes(data[i].idStr.toString())
          //   )  {
          //     count++;
          //   } else {
          //     storData.push(data[i]);
          //   }
          // }
          // if (count > 0) {
          //   this.$message({
          //     type: "info",
          //     message: "已经发送过传阅的人无法再次发送"
          //   });
          // }
          // this.cy(storData);
          break;
        case "main":
          // let name = [];
          // console.log('主送参数'+data);
          // data.forEach(item => {
          //
          //   if(!!item&&typeof item==='string'){
          //     name.push(item);
          //   }else if(item!=undefined){
          //     name.push(item.text);
          //   }
          //
          // });
          // this.zhuCheckData = [];
          // this.zhuCheckData = data;
          // this.$set(this.formdata, "main", name.join(","));
          break;
        case "copy":
          // let name1 = [];
          // data.forEach(item => {
          //   if(!!item&&typeof item==='string'){
          //     name1.push(item);
          //   }else if(item!=undefined){
          //     name.push(item.text);
          //   }
          // });
          // this.chaoCheckData = [];
          // this.chaoCheckData = data;
          // this.$set(this.formdata, "copy", name1.join(","));
          break;
        default:
          break;
      }
    },
    onClose() {
      this.$intent.closeWindow(this);
      // const that = this
      // this.$confirm('是否保存并退出当前页面?','提示',{
      //   confirmButtonText:'确定',
      //   cencelButtonText:'取消',
      // }).then(()=>{
      //   if (that.dataForm.id) {
      //     that.editSaveReport().then(() => {
      //
      //     })
      //   }else {
      //     that.saveReport().then((res) => {
      //       window.location.href = "about:blank";
      //       window.opener.location.reload()
      //       window.close();
      //     })
      //   }
      // }).catch(()=>{
      //   window.location.href = "about:blank";
      //   window.opener.location.reload()
      //   window.close();
      // })
    },
    async editSaveReport() {
      let response = await this.$api.secreatary.partyMemLeavRep
        .editSaveMemLeavRep(this.dataForm)
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        return true;
      } else {
        this.$message.error(response.msg);
      }
    },
    // 保存
    saveReport() {
      return new Promise((resolve, reject) => {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            this.submitFn().then(res => {
              if (res) {
                resolve(true);
              }
            });
          }
        });
      });
    },
    async submitFn() {
      const that = this;
      let response = await this.$api.secreatary.partyMemLeavRep
        .saveMemLeavRep(this.dataForm)
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        that.$message({
          type: "success",
          message: "保存成功"
        });
        that.dataForm = Object.assign({}, response.data);
        return true;
      } else {
        that.$message.error(response.msg);
      }
    },
    // 保存之后在保存并发送
    sendReport(person, params) {
      this.dataForm.currentNode = params.name;
      this.dataForm.currentNodeId = params.id;
      this.dataForm.curUserAccount = person.idStr.toString();
      this.dataForm.curUserName = person.name;
      this.dataForm.handleButton = "完成并发送";
      this.$api.secreatary.partyMemLeavRep
        .submitToSend(this.dataForm)
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: "保存成功，并发送"
            });
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    // 删除
    deleteReport() {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cencelButtonText: "取消"
      })
        .then(() => {
          this.$api.secreatary.partyMemLeavRep
            .delMemLeavRep({
              id: this.$route.query.id
            })
            .then(res => {
              if (res.code === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "已删除"
                });
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(() => {
              console.log("error");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    onLoad() {
      exportTable.getPdf("xiazai", [], "loadPdf");
    },
    // 获取详情
    getDetail() {
      this.$api.secreatary.partyMemLeavRep
        .getMemLeavRepDetail({
          id: this.$route.query.id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$nextTick(() => {
              this.dataForm = res.data;
              this.options = res.exeList;
              this.remarks = res.remList;
              this.dataForm.draftTime = res.data.draftTime;
              // this.dataForm.draftTime = formatData(
              //   new Date(res.data.draftTime).getTime(),
              //   "YYYY-MM-DD"
              // );
            });
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    openNewWindow(path, query) {
      if (query) {
        let { href } = this.$router.resolve({
          path: path, //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
          query: query //{id:'1111'}  // 这里写的是页面参数
        });
        window.open(href, "_blank");
      } else {
        let { href } = this.$router.resolve({
          path: path //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
        });
        window.open(href, "_blank");
      }
    }
  }
};
</script>
<style lang="less">
.detailComments {
  position: relative;
  height: 150px;
  /*margin-bottom: 10px;*/
  .el-textarea {
    height: 100%;
    padding-bottom: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    &:hover {
      border: 1px solid #8996af !important;
    }
    .el-textarea__inner {
      height: 100%;
      border: none !important;
      &:hover {
        border: none !important;
      }
    }
  }
  .finishedInfo {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    text-align: right;
    color: #606266;
    background: #e4e7ed52;
    span {
      padding-right: 10px;
    }
    .time {
      margin-top: 5px;
    }
  }
}
</style>
<style scoped lang="less" rel="stylesheet/less">
.container {
  .content-header {
    display: flex;
    font-size: 14px;
    padding: 10px;
    // border: 1px solid #f9aa21;
    border: 1px solid #f60;
    background: #fef7e7;
    box-sizing: border-box;
    p {
      padding-right: 20px;
    }
  }
}
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #e4e7ed;
  padding: 10px;
  margin-top: 16px;
}
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.el-col ::v-deep {
  border: 1px solid transparent;
}
.el-header {
  background-color: #409eff;
  line-height: 60px;
}
.title {
  color: #ffffff;
}
.btn {
  float: right;
}
// .btnstyle {
//   color: rgb(14, 117, 214);
// }
// .btnstyle:hover {
//   background-color: rgb(14, 117, 214);
//   color: cornsilk;
// }
.maintitle {
  font-size: 30px;
  color: rgb(14, 117, 214);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
}
.container {
  width: 1000px;
  padding-bottom: 20px;
  margin: 30px auto;
  border: 1px solid rgb(218, 215, 215);
  padding: 20px 20px;
  position: relative;
}
.c-header {
  background-color: #fef7e7;
  border: 1px solid #f9aa21;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.el-table .cell {
  white-space: pre-line;
}
.el-form-item ::v-deep {
  margin-bottom: 12px;
}
.form-word {
  width: 80px;
  float: left;
  line-height: 20px;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
.person {
  text-align: right;
  color: #606266;
  p {
    line-height: 1.5;
    font-size: 14px;
  }
}
.adviceInfo {
  font-size: 100%;
}
</style>
