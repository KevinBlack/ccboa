<template>
  <div class="command_word">
    <div v-if="officeConfig.EditType!=0&&officeConfig.formState!='finish'">
      <!-- <div v-if="officeConfig.showBtns&&officeConfig.cleanDraftFlag!='true'"> -->
      <el-button size="mini" v-if="true" round type="primary" @click="closeNowPage">关闭</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="isModifyFlag">文档是否已经修改</el-button>
      <el-button
        size="mini"
        v-if="false"
        round
        type="primary"
        @click="multiPartWord"
      >MultiPart方式打开文档</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="openInUrl">URL地址打开文档</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="openInServlet">服务端Servlet打开文档</el-button>
      <el-button
        size="mini"
        v-if="officeConfig.btns.SaveDocument"
        round
        type="primary"
        @click="SaveDocument(true)"
      >保存</el-button>
      <el-button
        size="mini"
        v-if="officeConfig.stepsNowName=='拟稿'"
        round
        type="primary"
        @click="WebOpenLocal(true)"
      >打开本地文档</el-button>
      <el-button
        size="mini"
        v-if="officeConfig.btns.WebSaveLocal"
        round
        type="primary"
        @click="WebSaveLocal"
      >保存正文到本地</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="SendMessage">前后台交互信息</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="WebUseTemplate">套红</el-button>
      <el-button
        size="mini"
        round
        type="primary"
        @click="WebOpenPrint"
      >打印</el-button>
      <el-button
        size="mini"
        v-if="officeConfig.btns.WebSetRevision"
        round
        type="primary"
        @click="WebSetRevision"
      >{{showWebSetRevision?'显示':'隐藏'}}修改痕迹</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="WebGetRevisions">获取痕迹</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="ClearRevisions">清除痕迹</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="WebGetDocumentCont">获取文档内容</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="CreateFile">新增文档</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="getDocumentXiuDing">文档是否修订模式</el-button>
      <el-button
        size="mini"
        v-if="false"
        round
        type="primary"
        @click="WebSetProtect"
      >{{canUse?'禁用':'解锁'}}文档</el-button>
      <el-tag type="info" v-show="false" id="StatusBar"></el-tag>
    </div>
    <div v-if="officeConfig.EditType==0 && !officeConfig.fanwenHide">
      <el-button size="mini" v-if="true" round type="primary" @click="closeNowPage">关闭</el-button>
      <el-button
        size="mini"
        round
        type="primary"
        @click="WebSaveLocal"
      >保存正文到本地</el-button>
      <el-button
        size="mini"
        round
        type="primary"
        @click="WebOpenPrint"
      >打印</el-button>
    </div>
    <el-container v-show="tipState">
      <div  id="cssOffice" ref="cssOffice" style="width:100%;overflow:hidden;margin-top:20px" :height="editH">
					<!--这里office插件-->
          <object
            name='webwps'
            ref="WebWpsOffice"
            id='webwps_id'
            type='application/x-wps'
            width='100%'
				    :height="editH"
            v-if="nowDocType" wpsshieldbutton="false"
            >
            <param name='quality' value='high' />
            <param name='Enabled' value='1' />
            <param name='allowFullScreen' value='true' />
            <param name='bgcolor' value='#ffffff' />
            <param name='wmode' value='opaque' />
          </object>
          <!--et 文件excel-->
          <object
           v-if="!nowDocType"
            name='webwps'
            ref="WebWpsOffice"
            id='webwps_id'
            type="application/x-et" wpsshieldbutton="false" width="100%" :height="editH">
            <param name="quality" value="high" />
            <param name="bgcolor" value="#ffffff" />
            <param name="Enabled" value="1" />
            <param name="allowFullScreen" value="true" />
          </object>
      </div>
    </el-container>
  </div>
</template>
<script>
import { Loading } from "element-ui";
import Browser from "../../common/js/iWebCheck.js";
import taohong from "@/minixs/taohong.js";
import { mapGetters } from 'vuex'
export default {
  name: "OFFICEWPS",
  props: {
    officeConfig: {
      nowDocType: true,
      saveName: { default: "", type: String }, //保存文件名
      stepsNowName: { default: "", type: String }, //当前环节
      processInstId: { default: "", type: String }, //流程参数
      taoHongFlag: { default: false, type: Boolean }, //标示套红
      cleanDraftFlag: { default: false, type: Boolean }, //标示清稿
      pageFlag: { default: "", type: String }, //标示签报或者发文页面 用于套红
      saveServlet: { default: "doHandleMainWord", type: String }, //上传接口名
      serverUrl: { default: "", type: String }, //后端ip
      formId: { default: "", type: String }, //表单id
      fwTranId: { default: "", type: String }, // 交易线id
      flowTranId: { default: "", type: String }, // 流程环节交易线id
      relativePath: { default: "", type: String }, //相对文件路径
      templateUrl: { default: "", type: String }, //套红文件路径
      fileName: { default: "", type: String }, //文件名称
      fileNameTh: { default: "", type: String }, //套红文件名称
      filePathTh: { default: "", type: String }, //套红文件路径
      multiTenancyId: { default: "", type: String }, //页面标示
      servletName: { default: "", type: String }, //服务端名称
      EditType: { default: "", type: String }, //可编辑与否
      isDinggao: { default: '', type: String }, //从成刊进还是定稿进
      depart: { default: '', type: String }, //从部门信息由模板打开
      isSynthesisFormat: { default: '', type: String} , //是否合成格式
      jbNoStr: { default: "", type: String }, //清稿前储存的路径
      btns: {
        isModifyFlag: true, //是否修改
        multiPartWord: true, //multiPart打开
        openInUrl: true, //url打开
        openInServlet: true, //servlet打开
        SaveDocument: true, //保存文档到服务器
        WebOpenLocal: true, //url打开
        WebSaveLocal: true, //保存本地文档
        WebUseTemplate: true, //套红
        WebOpenPrint: true, //打印
        WebSetRevision: true, //显示痕迹
        ClearRevisions: true, //清除痕迹
        WebGetDocumentCont: true, //获取文档内容
        CreateFile: true //新建文档
      },
      showBtns: { default: true, type: Boolean },
      formState: { default: "", type: String }, //处理单标示 办结 已办
      tanSun:{default:'',type:String},
      saveCleanFile:{default:'',type:String},//修改带痕迹正文
      isPrint:{default:true,type:String},//是否打印
      isKh:{default:'0',type:String},//是否跨行
      isnewPage:{default:false,type:Boolean}//是否是新的请假单页面
    }
  },
  mixins: [taohong],
  computed: {
    ...mapGetters(['dinggaoInfo', 'departQc', "departJsx"]),
  },
  data() {
    return {
      nowDocType:true,//默认打开doc,docx , （excel ppt 为et)
      showPrintView:true,
      fileType: "",
      stepsLength: 1,
      tipState: true, //关闭提示
      saveInteval: "", //60s定时请求
      WebOfficeObj: "",
      editH: "",
      editW: "",
      screenHeight: document.body.clientHeight,
      wrapWd: document.body.clientWidth,
      copyright: "",
      browser: Browser.browser,
      version: Browser.version,
      windowFlag:
        window.ActiveXObject != undefined ||
        window.ActiveXObject != null ||
        "ActiveXObject" in window,
      windowType: window.navigator.platform,
      showWebSetRevision: false, //显示、隐藏修改痕迹
      canUse: true, //解锁 锁定
      isTaoHong: false, //是否已套红
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      serverUrl: '',
    };
  },
  mounted() {
    let that = this;
    let beginTime = 0; //开始时间
    let differTime = 0; //时间差

    window.onunload = () => {
      differTime = new Date().getTime() - beginTime;
      if (differTime <= 5) {
        //关闭页面
        this.changePageState();
      }
    };
    window.onbeforeunload = () => {
      beginTime = new Date().getTime();
    };
    this.saveInteval = setInterval(() => {
      if (
        that.officeConfig.EditType == 0 ||
        that.officeConfig.cleanDraftFlag == "true" ||
        that.officeConfig.isClear == "true"
      ) {
        return;
      }
      if (this.nowDocType === true) { //表格or文档
        //判断是否修改
        if (
          !that.WebOfficeObj.obj.ActiveDocument.Saved &&
          that.WebGetDocumentCont() &&
          that.officeConfig.EditType != 0
        ) {
          if (that.WebGetDocumentCont().length < 10) {
            that.WebOfficeObj.Alert("正文文档内容至少10个字符");
            return;
          }
          that.SaveDocument(false); //不提示消息

          that.WebOfficeObj.obj.ActiveDocument.Saved = true; //清除修改状态
        }
      } else {
        if (
          !that.WebOfficeObj.obj.Workbooks.Saved &&
          that.WebGetTableCont() &&
          that.officeConfig.EditType != 0
        ) {
          that.SaveDocument(false); //不提示消息
          that.WebOfficeObj.obj.Workbooks.Saved = true; //清除修改状态
        }
      }
    }, 600000);
    window.onresize = () => {
      this.screenHeight = document.body.clientHeight;
      this.wrapWd =  document.body.clientWidth;
      // this.$refs.WebWpsOffice.style.height = this.editH;
      this.$refs.WebWpsOffice.style.height = "300px";
    };
        that.WebOfficeObj = new that.WebOffice.CssOffice(that.officeConfig);
        this.WebOfficeObj.init("cssOffice", "100%", window.innerHeight-68);
        that.editH = document.body.clientHeight - 68;
        // if (!that.windowFlag) {
        //   if (that.browser == "firefox") {
        //     if (that.version < "52") {
        //       var fireFoxType = navigator.mimeTypes["application/kg-activex"];
        //       if (fireFoxType == undefined) {
        //         that.$refs.WebWpsOffice.width = "1px";
        //         var str =
        //           '<div width="100%" height="100%" style="text-align:center; color: red;font-size:30px;" >该插件不受支持</br>点击跳转解决方案</div>';
        //         var t = that.$refs.cssOffice;
        //         t.innerHTML = t.innerText + str;
        //       }
        //     } else {
        //       that.$refs.WebWpsOffice.width = "1px";
        //       var str =
        //         '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >该插件不受支持</br>请更换52版本以下的FireFox浏览器</div>';
        //       var t = that.$refs.cssOffice;
        //       t.innerHTML = t.innerText + str;
        //     }
        //   } else if (that.browser == "chrome") {
        //     var kgchromeType = navigator.mimeTypes["application/kg-plugin"]; //高级版
        //     var chromeType = navigator.mimeTypes["application/kg-activex"]; //标准版
        //     var oldChromeType = navigator.mimeTypes["application/iWebPlugin"]; //早期淘汰版本
        //     if (that.$refs.WebWpsOffice.type == "application/kg-plugin") {
        //       if (kgchromeType == undefined) {
        //         that.$refs.WebWpsOffice.width = "1px";
        //         var str =
        //           '<div width="100%" height="100%" style="text-align:center; color: red;font-size:30px;" >该插件不受支持</br>引用的是高级版控件</br></div>';
        //         var t = that.$refs.cssOffice;
        //         t.innerHTML = t.innerText + str;
        //         //window.open("Faq002.html");
        //       }
        //     } else {
        //       if (that.version > "45") {
        //         if (chromeType == undefined || oldChromeType == undefined) {
        //           that.$refs.WebWpsOffice.width = "1px";
        //           var str =
        //             '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >该插件不受支持</br>引用的是标准版控件</br></div>';
        //           var t = that.$refs.cssOffice;
        //           t.innerHTML = t.innerText + str;
        //         }
        //       } else {
        //         that.$refs.WebWpsOffice.width = "1px";
        //         var str =
        //           '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >标准版插件不受支持</br>请更换45版本以下的Chrome浏览器</br>如果需要使用高版本Chrome浏览器,需集成高级版插件</div>';
        //         var t = that.$refs.cssOffice;
        //         t.innerHTML = t.innerText + str;
        //       }
        //     }
        //   }
        // }
  },
  methods: {
    pageTabShow(flag) {
      if (flag) {
        this.$refs.cssOffice.style.position = "relative";
        this.$refs.cssOffice.style.right = "0px";
      } else {
        this.$refs.cssOffice.style.position = "absolute";
        this.$refs.cssOffice.style.right = "-20000px";
      }
    },
    closeNowPage() {
      if (this.officeConfig.EditType == 0) {
        window.close();
        return;
      }
      if (
        (this.WebOfficeObj.obj.Workbooks && !this.WebOfficeObj.obj.Workbooks.Saved) ||
        (this.WebOfficeObj.obj.ActiveDocument && !this.WebOfficeObj.obj.ActiveDocument.Saved) ||
        this.fileType == "localFile" ||
        (this.officeConfig.taoHongFlag == "true" &&
          !this.WebOfficeObj.obj.ActiveDocument.Saved)
      ) {
        //已修改未保存 //校验本地打开
        this.$confirm("是否保存修改退出当前页面?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.SaveDocument(false, true);
          })
          .catch(() => {
            this.pageTabShow(true);
          });
      } else {
        this.changePageState();
        window.close();
      }
      this.pageTabShow(false);
      //空文档校验
      if (!this.WebGetDocumentCont()) {
        this.$confirm("该文档为空白，是否关闭？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.changePageState();
            window.close();
          })
          .catch(() => {
            this.pageTabShow(true);
          });
        return;
      }
    },
    WebSetProtect() {
      let n = 0;
      this.canUse = !this.canUse;
      n = this.canUse ? 2 : 0;
      this.WebOfficeObj.setEditType(n);
    },
    isModifyFlag(flag) {
      return this.WebOffice.isModify.call(this.WebOfficeObj, flag);
    },
    multiPartWord() {
      this.WebOffice.OnUnLoad.call(this.WebOfficeObj);
      this.WebOffice.Load.call(this.WebOfficeObj);
    },
    openInUrl(f) {
      this.WebOffice.LoadURL.call(this.WebOfficeObj,f);//f 为打开模板标识
    },
    openInServlet() {
      this.WebOffice.OnUnLoad.call(this.WebOfficeObj);
      this.WebOffice.LoadServlet.call(this.WebOfficeObj);
    },
    SaveDocument(flag, type) {
      console.log('nowDocType', this.nowDocType)
      if(this.nowDocType){
        if (!this.WebGetDocumentCont()) {
          this.WebOfficeObj.Alert("当前文档内容为空");
          this.pageTabShow(true);
          return;
        }
        if (this.WebGetDocumentCont().length < 10) {
          this.WebOfficeObj.Alert("正文文档内容至少10个字符");
          this.pageTabShow(true);
          return;
        }
      }else{
        if (!this.WebGetTableCont()) {
          this.WebOfficeObj.Alert("当前文档内容为空");
          this.pageTabShow(true);
          return;
        }
      }
      this.officeConfig.nowDocType = this.nowDocType
      this.WebOffice.SaveDocument(this.WebOfficeObj, flag, type);//flag是true
      if (type) {
        this.changePageState();
        window.close();
      }
      if (this.WebOfficeObj.Status.indexOf("失败") == -1) {
        window.opener && window.opener.location.reload();
        localStorage.setItem("notifyState", this.$route.query.page)
      }
      console.log(this.WebOfficeObj,"配置值");

    },
    WebOpenLocal(type) {
      if (type) {
        this.pageTabShow(false);
        this.$confirm("此操作会覆盖之前已编辑保存的正文", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.WebOfficeObj.selectLocalFile.call(this.WebOfficeObj);
            this.pageTabShow(true);
          })
          .catch(() => {
            this.pageTabShow(true);
          });
      } else {
        this.WebOfficeObj.selectLocalFile.call(this.WebOfficeObj);
      }
    },
    WebSaveLocal() {
      this.WebOfficeObj.WebSaveLocal.call(this.WebOfficeObj);
    },
    SendMessage() {
      this.WebOffice.SendMessage.call(this.WebOfficeObj);
    },
    WebUseTemplate(flag) {
      this.WebOfficeObj.WebUseTemplate.call(this.WebOfficeObj, flag); //这里区分签报与发文
    },
    WebOpenPrint() {
      this.WebOfficeObj.PrintPreview.call(this.WebOfficeObj);
      this.showPrintView = false;
    },
    exitPrintView() {
      this.WebOfficeObj.PrintPreviewExit();
      this.showPrintView = true;
    },
    WebSetRevision() {
      if (
        this.officeConfig.saveCleanFile == 'true' ||this.stepsLength > 1 ||
        (this.WebOffice.getDocumentXiuDing.call(this.WebOfficeObj) > 0 &&
          this.fileType == "localFile") ||
        this.officeConfig.formState == "finish"
      ) {
        this.WebOfficeObj.WebShow(this.showWebSetRevision);
      }
      this.showWebSetRevision = !this.showWebSetRevision;
    },
    WebGetRevisions() {
      this.WebOfficeObj.WebGetRevisions.call(this.WebOfficeObj);
    },
    ClearRevisions() {
      this.WebOfficeObj.ClearRevisions.call(this.WebOfficeObj);
    },
    WebGetDocumentCont() {
      return this.WebOfficeObj.WebGetDocumentCont(this.WebOfficeObj);
    },
    WebGetTableCont() {
      return this.WebOfficeObj.WebGetTableCont.call(this.WebOfficeObj);
    },
    CreateFile() {
      if(this.officeConfig.relativePath){
        this.openInUrl();//带有格式的正文模板
      }else{
        this.WebOfficeObj.CreateFile.call(this.WebOfficeObj);
      }
    },
    changePageState() {
      let pageType = "";
      switch (this.officeConfig.pageFlag) {
        case "fawen":
          pageType = "bankDispachpage";
          break;
        case "sfkhSignpagePage":
          pageType = "sfkhSignpagePage";
          break;
        case "skhQshSignpagePage":
          pageType = "skhQshSignpagePage";
          break;
        case "sentitySignpageidPage":
          pageType = "sentitySignpageidPage";
          break;
      }
      localStorage.setItem(pageType, "");
    },
    //获取流程环节
    getSteps() {
      this.bank_cklc.processInstId = this.officeConfig.processInstId;
      console.log(this.officeConfig.flowTranId, "流程的配置");

      if (this.officeConfig.flowTranId) {
        this.$post
          .postData(
            "getHistoryActInfo",
            JSON.stringify(this.bank_cklc),
            this.officeConfig.flowTranId
          )
          .then(res => {
            if (res) {
              this.stepsLength = (res.data && res.data.length) || 1; //流程长度
              this.initObj();
              // loadingState.close();
            }
          });
      } else {
        this.initObj();
      }
    },
    initObj() {
      setTimeout(() => {
        this.WebOffice.Load.call(this.WebOfficeObj, this.officeConfig);
        if (this.fileType == "localFile") {
          this.WebOpenLocal();
        } else if (this.fileType == "newFile") {
          this.CreateFile();
          // if (this.officeConfig.fileNameTh && !this.isTaoHong) {
          //   //套红
          //   this.WebUseTemplate();
          //   this.signquoteTemplate();
          //   this.WebOffice.setXiuDingState.call(this.WebOfficeObj, false); //取消修订模式
          //   this.isTaoHong = true;
          // }
        } else {
          if (this.officeConfig.fileNameTh && !this.isTaoHong) {
            //套红
            console.log("开始套红");
            this.openInUrl('moban');
            this.WebOfficeObj.ShowDocumentFieldTarget(false)

            if (this.officeConfig.depart == 2) {
              this.departTemplate();
            } else if (this.officeConfig.depart == 'schyd') {
              this.msgzTemplate();
            } else if (this.officeConfig.depart == 'scqjd') {
              this.msgzQjTemplate();
            } else if (this.officeConfig.depart == 'sclxd') {
              this.msgzLxTemplate();
            } else if (this.officeConfig.isDinggao == 3) {
              this.chengkanTemplate();
            } else if (this.officeConfig.tanSun == "scjsx") {
              this.jsxTemplate();
              for (let p = 0; p < this.departJsx.id.length; p++) {
                this.WebOfficeObj.WebSetBookmarks(
                  "Id",
                  this.departJsx.id[p]
                );
              }
              for (let j = 0; j < this.departJsx.menus.length; j++) {
                this.WebOfficeObj.WebSetBookmarks(
                  "Menus",
                  this.departJsx.menus[j]
                );
              }
            }
            // this.WebUseTemplate();
            // if (this.officeConfig.pageFlag == "fawen") {
            //   this.fawenTemplate();
            // } else {
            //   this.signquoteTemplate();
            // }


            this.isTaoHong = true;
            this.WebOffice.setXiuDingState.call(this.WebOfficeObj, false); //取消修订模式
            this.SaveDocument(false);
          }else{
            this.openInUrl();
          }
        }
        // this.WebOfficeObj.VBAShowRevisions(false)

        if (this.officeConfig.EditType == 0) {
          this.WebOffice.setXiuDingState.call(this.WebOfficeObj, false);
        } else {
          //校验是否本地打开 修订文档
          if (this.WebOffice.getDocumentXiuDing.call(this.WebOfficeObj) > 0) {
            this.WebOffice.setXiuDingState.call(this.WebOfficeObj, true);
          } else {
            this.WebOffice.setXiuDingState.call(
              this.WebOfficeObj,
              this.stepsLength == 1 && this.officeConfig.saveCleanFile != 'true' ? false : true
            );
          }
        }
        // this.WebOffice.setDocState.call(this.WebOfficeObj);//解决痕迹问题
        this.WebOfficeObj.WebShow(false);

        if (this.officeConfig.EditType == 0) {
          this.WebOfficeObj.setEditType(
            this.officeConfig.EditType == "taoHong"
              ? 2
              : this.officeConfig.EditType
          );
        }

        this.WebOffice.setUserName.call(this.WebOfficeObj, this.names);

        if (
          this.officeConfig.cleanDraftFlag == "true" ||
          this.officeConfig.isClear == "true"
        ) {
          this.ClearRevisions();//清稿
          this.WebOffice.setXiuDingState.call(this.WebOfficeObj, true); //恢复修订模式
          this.SaveDocument(true);
        }
      },3000);
    },
  },
  watch: {
    screenHeight() {
      this.editH = document.body.clientHeight - 68;
      this.$refs.WebWpsOffice.style.height = this.editH;
    },
    wrapWd(){
      this.editW = document.body.clientWidth - 40;
      this.$refs.WebWpsOffice.style.width = this.editW;
    }
  },
  created() {
    var etInit = ['.et','.xlsx','.xls'];
    for(var i=0;i<etInit.length;i++){
      if(this.officeConfig.fileName&&this.officeConfig.fileName.indexOf(etInit[i])!=-1){
        this.nowDocType = false;
      }
      // else{
      //   this.nowDocType = false
      // }
    }
    this.fileType = this.$route.query.state;
    this.getSteps();
    this.names =
      (localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")) &&
        JSON.parse(localStorage.getItem("userInfo")).humanName) ||
      "";
  },
  beforeDestroy() {}
};
</script>
<style lang="less" scoped>
.command_word {
  width: 100%;
  overflow: hidden;
  padding: 20px;
  text-align: right;
}
</style>
