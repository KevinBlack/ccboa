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
      <el-button
        size="mini"
        v-if="officeConfig.btns.WebOpenPrint"
        round
        type="primary"
        @click="WebOpenPrint"
      >打印</el-button>
      <el-button
        size="mini"
        v-if="officeConfig.btns.WebSetRevision && !officeConfig.btns.btnShow"
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
      <el-button size="mini" round type="primary" @click="WebSaveLocal">保存正文到本地</el-button>
      <el-button
        size="mini"
        v-if="officeConfig.btns.WebOpenPrint"
        round
        type="primary"
        @click="WebOpenPrint"
      >打印</el-button>
    </div>
    <el-container v-show="tipState">
      <div ref="OfficeDiv" :style="{'width':wrapWd+'px','padding-top':'20px','z-index':'100'}">
        <object
          v-if="browser=='chrome'"
          ref="WebOffice"
          id="WebOffice"
          width="100%"
          :height="editH"
          style="z-index: 1"
          clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"
          type="application/kg-plugin"
          OnReady="OnReady"
          OnCommand="OnCommand"
          OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate"
          OnSending="OnSending"
          OnSendEnd="OnSendEnd"
          OnRecvStart="OnRecvStart"
          OnRecving="OnRecving"
          OnRecvEnd="OnRecvEnd"
          OnFullSizeBefore="OnFullSizeBefore"
          OnFullSizeAfter="OnFullSizeAfter"
          Copyright="中国建设银行股份有限公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAF8BAABgAQAALAAAAB4k3dx0Hmw5myrgT1Xb/pfKmTL20/c6N7uzNMWlLClHl6LGNj5cCyZKYTobflsb13b8r9t4yn/fn9tAZ0SEArsOSb/rRVYfUXVR/8d8xIQ9rtRF59Lc2g9QUKS6mGQN4+PnYDBXK0wE2imdnvk1/RMIwGxrWiMYcusso3/SbDse2OjNeK1Iv04fYk0zq1Clx9+s2jwx+CLur3WU1p+u2Refz51A5nekmqCfU/6fKweYSjnad0nUODSxQUuOTr4Z3W+E6f04L3NHozIzM6Zu9QB0Lx0PQL2tGGfZKxt/oi0Oz1TLXys5ejCeA/wJEnp9BdaXfpSsQ7K4onzGQ/w9p/Ewpq3pLHM7CYc3Wk5WWsI8vw+ftQlazM/hO0nXLKPRKDwzGZRemZB4ZjBkaFGLNsGxfXp1GskfiCi5MvKviF1YPRmcQ0sLS4WggRAEMxOWGbiGF/1cu8x0+B+tg2uwZ5uADzk4EfVYDDUuECQmezHR"
        ></object>
        <object
          v-if="browser=='firefox'"
          ref="WebOffice"
          id="WebOffice"
          width="100%"
          :height="editH"
          clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"
          type="application/kg-activex"
          OnReady="OnReady"
          OnCommand="OnCommand"
          OnOLECommand="OnOLECommand"
          OnExecuteScripted="OnExecuteScripted"
          OnQuit="OnQuit"
          OnSendStart="OnSendStart"
          OnSending="OnSending"
          OnSendEnd="OnSendEnd"
          OnRecvStart="OnRecvStart"
          OnRecving="OnRecving"
          OnRecvEnd="OnRecvEnd"
          OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate"
          OnFullSizeBefore="OnFullSizeBefore"
          OnFullSizeAfter="OnFullSizeAfter"
          Copyright="中国建设银行股份有限公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAF8BAABgAQAALAAAAB4k3dx0Hmw5myrgT1Xb/pfKmTL20/c6N7uzNMWlLClHl6LGNj5cCyZKYTobflsb13b8r9t4yn/fn9tAZ0SEArsOSb/rRVYfUXVR/8d8xIQ9rtRF59Lc2g9QUKS6mGQN4+PnYDBXK0wE2imdnvk1/RMIwGxrWiMYcusso3/SbDse2OjNeK1Iv04fYk0zq1Clx9+s2jwx+CLur3WU1p+u2Refz51A5nekmqCfU/6fKweYSjnad0nUODSxQUuOTr4Z3W+E6f04L3NHozIzM6Zu9QB0Lx0PQL2tGGfZKxt/oi0Oz1TLXys5ejCeA/wJEnp9BdaXfpSsQ7K4onzGQ/w9p/Ewpq3pLHM7CYc3Wk5WWsI8vw+ftQlazM/hO0nXLKPRKDwzGZRemZB4ZjBkaFGLNsGxfXp1GskfiCi5MvKviF1YPRmcQ0sLS4WggRAEMxOWGbiGF/1cu8x0+B+tg2uwZ5uADzk4EfVYDDUuECQmezHR"
        ></object>
        <object
          v-if="windowFlag && windowType == 'Win32'"
          ref="WebOffice"
          id="WebOffice"
          width="100%"
          :height="editH"
          classid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"
          codebase="../../../public/static/script/jingge/iWebOffice2015.cab#version=0,0,0,0"
        >
          <param
            name="Copyright"
            value="中国建设银行股份有限公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAF8BAABgAQAALAAAAB4k3dx0Hmw5myrgT1Xb/pfKmTL20/c6N7uzNMWlLClHl6LGNj5cCyZKYTobflsb13b8r9t4yn/fn9tAZ0SEArsOSb/rRVYfUXVR/8d8xIQ9rtRF59Lc2g9QUKS6mGQN4+PnYDBXK0wE2imdnvk1/RMIwGxrWiMYcusso3/SbDse2OjNeK1Iv04fYk0zq1Clx9+s2jwx+CLur3WU1p+u2Refz51A5nekmqCfU/6fKweYSjnad0nUODSxQUuOTr4Z3W+E6f04L3NHozIzM6Zu9QB0Lx0PQL2tGGfZKxt/oi0Oz1TLXys5ejCeA/wJEnp9BdaXfpSsQ7K4onzGQ/w9p/Ewpq3pLHM7CYc3Wk5WWsI8vw+ftQlazM/hO0nXLKPRKDwzGZRemZB4ZjBkaFGLNsGxfXp1GskfiCi5MvKviF1YPRmcQ0sLS4WggRAEMxOWGbiGF/1cu8x0+B+tg2uwZ5uADzk4EfVYDDUuECQmezHR"
          />
        </object>
        <object
          v-if="windowFlag && windowType == 'Win64'"
          ref="WebOffice"
          id="WebOffice"
          width="100%"
          :height="editH"
          classid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D024"
          codebase="../../../public/static/script/jingge/iWebOffice2015.cab#version=0,0,0,0"
        >
          <param
            name="Copyright"
            value="中国建设银行股份有限公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAF8BAABgAQAALAAAAB4k3dx0Hmw5myrgT1Xb/pfKmTL20/c6N7uzNMWlLClHl6LGNj5cCyZKYTobflsb13b8r9t4yn/fn9tAZ0SEArsOSb/rRVYfUXVR/8d8xIQ9rtRF59Lc2g9QUKS6mGQN4+PnYDBXK0wE2imdnvk1/RMIwGxrWiMYcusso3/SbDse2OjNeK1Iv04fYk0zq1Clx9+s2jwx+CLur3WU1p+u2Refz51A5nekmqCfU/6fKweYSjnad0nUODSxQUuOTr4Z3W+E6f04L3NHozIzM6Zu9QB0Lx0PQL2tGGfZKxt/oi0Oz1TLXys5ejCeA/wJEnp9BdaXfpSsQ7K4onzGQ/w9p/Ewpq3pLHM7CYc3Wk5WWsI8vw+ftQlazM/hO0nXLKPRKDwzGZRemZB4ZjBkaFGLNsGxfXp1GskfiCi5MvKviF1YPRmcQ0sLS4WggRAEMxOWGbiGF/1cu8x0+B+tg2uwZ5uADzk4EfVYDDUuECQmezHR"
          />
        </object>
      </div>
    </el-container>
  </div>
</template>
<script>
// iwebOffice
import Browser from "../../common/js/iWebCheck.js";
import { Loading } from "element-ui";
import proxyEvent from "@/util/proxyEvent.js";
import { mapGetters } from "vuex";
import taohong from "@/minixs/taohong.js";
export default {
  name: "OFFICEWORD",
  props: {
    officeConfig: {
      stepsNowName: { default: "", type: String }, //当前环节
      processInstId: { default: "", type: String }, //流程参数
      cleanDraftFlag: { default: false, type: Boolean }, //标示清稿
      pageFlag: { default: "", type: String }, //标示签报或者发文页面 用于套红
      saveServlet: { default: "doHandleMainWord", type: String }, //上传接口名
      serverUrl: { default: "", type: String }, //后端ip
      formId: { default: "jksdi2w323df", type: String }, //表单id
      fwTranId: { default: "", type: String }, // 交易线id
      flowTranId: { default: "", type: String }, // 流程环节交易线id
      relativePath: { default: "", type: String }, //相对文件路径
      fileName: { default: "", type: String }, //文件名称
      fileNameTh: { default: "", type: String }, //模板文件名称
      filePathTh: { default: "", type: String }, //模板文件路径
      multiTenancyId: { default: "", type: String }, //页面标示
      servletName: { default: "", type: String }, //服务端名称
      EditType: { default: "", type: String }, //可编辑与否
      isDinggao: { default: "", type: String }, //是否定稿
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
        CreateFile: true, //新建文档
        btnShow:""
      },
      showBtns: { default: true, type: Boolean },
      formState: { default: "", type: String }, //处理单标示 办结 已办
      tanSun: { default: "", type: String },
      saveCleanFile: { default: "", type: String }, //修改带痕迹正文
      isnewPage: { default: false, type: Boolean } //是否是新的请假单页面
    }
  },
  mixins: [taohong],
  computed: {
    ...mapGetters(["dinggaoInfo", "departJsx", "chengkanInfo"])
  },
  data() {
    return {
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
      showWebSetRevision: true, //显示、隐藏修改痕迹
      canUse: true, //解锁 锁定
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      }
    };
  },
  mounted() {
    let that = this;
    // let loadingState = Loading.service({
    //   fullscreen:true,
    //   lock:true,
    //   text:'加载中...'
    // })
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
      //判断是否修改
      if (
        that.WebOfficeObj.obj.IsModify(1) &&
        that.WebGetDocumentCont() &&
        that.officeConfig.EditType != 0
      ) {
        if (that.WebGetDocumentCont().length < 10) {
          that.WebOfficeObj.Alert("正文文档内容至少10个字符");
          return;
        }
        that.SaveDocument(false); //不提示消息
        that.WebOfficeObj.obj.IsModify(0); //清除修改状态
      }
    }, 600000);
    window.onresize = () => {
      this.screenHeight = document.body.clientHeight;
      this.wrapWd = document.body.clientWidth;
      // this.$refs.WebOffice.style.height = this.editH;
      this.$refs.WebOffice.style.height = "300px";
    };
    this.WebOfficeObj = new this.WebOffice.WebOffice2015(this.officeConfig);
    console.log(this.WebOfficeObj, "初始化金额");
    let installFlag = judgeInstall();
    if (!installFlag) {
      return;
    }
    this.WebOfficeObj.setObj(document.getElementById("WebOffice"));
    this.editH = document.body.clientHeight - 68;
    // if (!this.windowFlag) {
    //   if (this.browser == "firefox") {
    //     if (this.version < "52") {
    //       var fireFoxType = navigator.mimeTypes["application/kg-activex"];
    //       if (fireFoxType == undefined) {
    //         this.$refs.WebOffice.width = "1px";
    //         var str =
    //           '<div width="100%" height="100%" style="text-align:center; color: red;font-size:30px;" >该插件不受支持</br>点击跳转解决方案</div>';
    //         var t = this.$refs.OfficeDiv;
    //         t.innerHTML = t.innerText + str;
    //       }
    //     } else {
    //       this.$refs.WebOffice.width = "1px";
    //       var str =
    //         '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >该插件不受支持</br>请更换52版本以下的FireFox浏览器</div>';
    //       var t = this.$refs.OfficeDiv;
    //       t.innerHTML = t.innerText + str;
    //     }
    //   } else if (this.browser == "chrome") {
    //     var kgchromeType = navigator.mimeTypes["application/kg-plugin"]; //高级版
    //     var chromeType = navigator.mimeTypes["application/kg-activex"]; //标准版
    //     var oldChromeType = navigator.mimeTypes["application/iWebPlugin"]; //早期淘汰版本
    //     if (this.$refs.WebOffice.type == "application/kg-plugin") {
    //       if (kgchromeType == undefined) {
    //         this.$refs.WebOffice.width = "1px";
    //         var str =
    //           '<div width="100%" height="100%" style="text-align:center; color: red;font-size:30px;" >该插件不受支持</br>引用的是高级版控件</br></div>';
    //         var t = this.$refs.OfficeDiv;
    //         t.innerHTML = t.innerText + str;
    //         //window.open("Faq002.html");
    //       }
    //     } else {
    //       if (this.version > "45") {
    //         if (chromeType == undefined || oldChromeType == undefined) {
    //           this.$refs.WebOffice.width = "1px";
    //           var str =
    //             '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >该插件不受支持</br>引用的是标准版控件</br></div>';
    //           var t = this.$refs.OfficeDiv;
    //           t.innerHTML = t.innerText + str;
    //         }
    //       } else {
    //         this.$refs.WebOffice.width = "1px";
    //         var str =
    //           '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >标准版插件不受支持</br>请更换45版本以下的Chrome浏览器</br>如果需要使用高版本Chrome浏览器,需集成高级版插件</div>';
    //         var t = this.$refs.OfficeDiv;
    //         t.innerHTML = t.innerText + str;
    //       }
    //     }
    //   }
    // }
  },
  methods: {
    // 筛选对象的方法
    filterObj(obj, arr) {
      if (typeof obj !== "object" || !Array.isArray(arr)) {
        throw new Error("参数格式不正确");
      }
      const result = {};
      Object.keys(obj)
        .filter(key => arr.includes(key))
        .forEach(key => {
          result[key] = obj[key];
        });
      return result;
    },
    // 处理时间的方法
    timesConcat(item, name) {
      if (name.indexOf("日期") > -1) {
        let times = (item && item.split("-")) || "";
        if (times.length) {
          item =
            times[0] +
            "年" +
            times[1].replace(/^0/, "") +
            "月" +
            times[2].replace(/^0/, "") +
            "日";
        }
      }
      return item;
    },
    pageTabShow(flag) {
      if (flag) {
        this.$refs.OfficeDiv.style.position = "relative";
        this.$refs.OfficeDiv.style.right = "0px";
      } else {
        this.$refs.OfficeDiv.style.position = "absolute";
        this.$refs.OfficeDiv.style.right = "-20000px";
      }
    },
    closeNowPage() {
      if (this.officeConfig.EditType == 0) {
        window.close();
        return;
      } else { 
        this.$confirm("是否保存当前文档?", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning"
        })
            .then(() => { 
                this.SaveDocument(true)
                this.pageTabShow(true);
                window.opener.location.reload()
                window.close();
            })
            .catch(() => {
                this.pageTabShow(true);
                // window.opener.location.reload()
                window.close();
            });
      }
      // if (this.WebOfficeObj.obj.IsModify(1) || this.fileType == "localFile") {
      //   //已修改未保存 //校验本地打开
      //   this.$confirm("是否保存修改退出当前页面?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       this.SaveDocument(false, true);
      //     })
      //     .catch(() => {
      //       this.pageTabShow(true);
      //     });
      // } else {
      //   this.changePageState();
      //   window.close();
      // }
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
    openInUrl() {
      this.WebOffice.OnUnLoad.call(this.WebOfficeObj);
      this.WebOffice.LoadURL.call(this.WebOfficeObj);
    },
    openInServlet() {
      this.WebOffice.OnUnLoad.call(this.WebOfficeObj);
      this.WebOffice.LoadServlet.call(this.WebOfficeObj);
    },
    SaveDocument(flag, type) {
      if (!this.WebGetDocumentCont()) {
        this.WebOfficeObj.Alert.call(this.WebOfficeObj, "当前文档内容为空");
        this.pageTabShow(true);
        return;
      }
      if (this.WebGetDocumentCont().length < 10) {
        this.WebOfficeObj.Alert("正文文档内容至少10个字符");
        this.pageTabShow(true);
        return;
      }
      this.WebOffice.SaveDocument(this.WebOfficeObj, flag);
      this.WebOfficeObj.obj.IsModify(0);
      console.log("获取￥￥fdate书签的值");
      this.WebOfficeObj.WebGetBookMarks.call(this.WebOfficeObj, "￥￥fdate");
      console.log(JSON.stringify(this.WebOfficeObj));
      if (type) {
        this.changePageState();
        window.close();
      }
      if (this.WebOfficeObj.Status.indexOf("失败") == -1) {
        window.opener && window.opener.location.reload();
        // proxyEvent.$emit("reloadNowPage");
        localStorage.setItem("notifyState", this.$route.query.page);
      }
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
            this.WebOfficeObj.WebOpenLocal.call(this.WebOfficeObj);
            this.pageTabShow(true);
          })
          .catch(() => {
            this.pageTabShow(true);
          });
      } else {
        this.WebOfficeObj.WebOpenLocal.call(this.WebOfficeObj);
      }
    },
    WebSaveLocal() {
      if (this.officeConfig.EditType == 0) {
        this.WebOfficeObj.WebSaveLocalTs.call(this.WebOfficeObj);
      } else {
        this.SaveDocument(true);
        this.WebOfficeObj.WebSaveLocalTs.call(this.WebOfficeObj);
      }
    },
    SendMessage() {
      this.WebOffice.SendMessage.call(this.WebOfficeObj);
    },
    WebUseTemplate(flag) {
      this.WebOfficeObj.WebUseTemplate.call(this.WebOfficeObj, flag); //这里区分签报与发文
    },
    WebOpenPrint() {
      this.WebOfficeObj.WebOpenPrint.call(this.WebOfficeObj);
    },
    WebSetRevision() {
      if (
        this.officeConfig.saveCleanFile == "true" ||
        this.stepsLength > 1 ||
        (this.WebOffice.getDocumentXiuDing.call(this.WebOfficeObj) > 0 &&
          this.fileType == "localFile") ||
        this.officeConfig.formState == "finish"
      ) {
        this.WebOfficeObj.WebShow.call(
          this.WebOfficeObj,
          this.showWebSetRevision
        );
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
      return this.WebOfficeObj.WebGetDocumentCont.call(this.WebOfficeObj);
    },
    CreateFile() {
      if (this.officeConfig.relativePath) {
        this.openInUrl(); //带有格式的正文模板
      } else {
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
      this.initObj();
    },
    initObj() {
      setTimeout(() => {
        this.WebOffice.Load.call(this.WebOfficeObj, this.officeConfig);
        if (this.fileType == "localFile") {
          this.WebOpenLocal();
        } else if (this.fileType == "newFile") {
          this.CreateFile();
        } else {
          this.openInUrl();
        }
        // this.WebOfficeObj.VBAShowRevisions(false)
        if (this.officeConfig.tanSun === "pubManuscript") {
          let combinePeriodicalData = this.dinggaoInfo.draftInfo; //合刊文件数据
          let promiseList = [];
          this.fileInfo = [];
          for (let index = 0; index < combinePeriodicalData.length; index++) {
            promiseList.push(
              new Promise((resolve, reject) => {
                const element = combinePeriodicalData[index];
                this.$post
                  .postData(
                    "doDownloadFile",
                    JSON.stringify({
                      function: "doDownloadFile",
                      fileName: element.fileName,
                      filePath: element.filePath
                    }),
                    this.$businessCode.fawglfj
                  )
                  .then(res => {
                    resolve(res);
                  });
              })
            );
          }
          Promise.all(promiseList)
            .then(rspList => {
              var index2 = 0;
              rspList.map(val => {
                this.fileInfo.push(val);
                index2++;
                let vName = "draftInfo" + String(index2); //书签名字
                if (index2 > 10) {
                  this.WebOfficeObj.WebGetFile1.call(
                    this.WebOfficeObj,
                    val.filePath,
                    val.fileName,
                    "draftInfo11"
                  );
                } else {
                  this.WebOfficeObj.WebGetFile1.call(
                    this.WebOfficeObj,
                    val.filePath,
                    val.fileName,
                    vName
                  );
                }
              });
            })
            .then(() => {});
          //插入其他信息
          let obj = ["id", "time", "send", "nper"];
          let newObj = this.filterObj(this.dinggaoInfo, obj);
          Object.keys(newObj).map(key => {
            newObj[key] = this.timesConcat(newObj[key], key);
            this.WebOfficeObj.WebSetBookmarks.call(
              this.WebOfficeObj,
              key,
              newObj[key]
            );
          });
          var index3 = 0;
          for (
            let menuIndex = 0;
            menuIndex < this.dinggaoInfo.menu.length;
            menuIndex++
          ) {
            index3++;
            let vNameMenu = "Menu" + index3;
            this.WebOfficeObj.WebSetBookmarks.call(
              this.WebOfficeObj,
              vNameMenu,
              this.dinggaoInfo.menu[menuIndex]
            );
          }
          // if (this.officeConfig.tanSun === 'clzw' || this.officeConfig.tanSun === 'pubManuscript') {
          //   this.WebOfficeObj.WebAreaProtect.call(this.WebOfficeObj, 'tplNm')
          // }
        } else if (this.officeConfig.depart == 2) {
          this.departTemplate();
        } else if (this.officeConfig.depart == "schyd") {
          this.msgzTemplate();
        } else if (this.officeConfig.depart == "scqjd") {
          this.msgzQjTemplate();
        } else if (this.officeConfig.depart == "sclxd") {
          this.msgzLxTemplate();
        } else if (this.officeConfig.isDinggao == 3) {
          this.chengkanTemplate();
        } else if (this.officeConfig.tanSun == "scjsx") {
          this.jsxTemplate();
          for (let p = 0; p < this.departJsx.id.length; p++) {
            this.WebOfficeObj.WebSetBookmarks.call(
              this.WebOfficeObj,
              "Id",
              this.departJsx.id[p]
            );
          }
          for (let j = 0; j < this.departJsx.menus.length; j++) {
            this.WebOfficeObj.WebSetBookmarks.call(
              this.WebOfficeObj,
              "Menus",
              this.departJsx.menus[j]
            );
          }
          //插入其他信息
          // let obj = ['Id', 'Menus']
          // let newObj = this.filterObj(this.departJsx, obj)
          // Object.keys(newObj).map((key) => {
          // })
        }
        this.WebOfficeObj.WebShow.call(this.WebOfficeObj, false);
        // if (this.officeConfig.tansun == 3) {
        //   this.msgzTemplate();
        //   this.msgzQjTemplate();
        //   this.msgzLxTemplate();
        // }
        if (this.officeConfig.EditType == 0) {
          this.WebOffice.setXiuDingState.call(this.WebOfficeObj, false);
          this.WebOfficeObj.setEditType(this.officeConfig.EditType);
        } else {
          //校验是否本地打开 修订文档
          if (this.WebOffice.getDocumentXiuDing.call(this.WebOfficeObj) > 0) {
            this.WebOffice.setXiuDingState.call(this.WebOfficeObj, true);
          } else {
            console.log("没有本地打开 修订文档");
            this.WebOffice.setXiuDingState.call(
              this.WebOfficeObj,
              this.stepsLength == 1 && this.officeConfig.saveCleanFile != "true"
                ? false
                : true
            );
          }
        }
        this.WebOffice.setUserName.call(this.WebOfficeObj, this.names);

        if (
          this.officeConfig.cleanDraftFlag == "true" ||
          this.officeConfig.isClear == "true"
        ) {
          this.ClearRevisions(); //清稿
          this.WebOffice.setXiuDingState.call(this.WebOfficeObj, true); //恢复修订模式
          this.SaveDocument(true);
        }
        this.WebOfficeObj.obj.IsModify(0);
      });
    },
    //打印预览
    printPreview() {
      this.WebOfficeObj.obj.PrintPreview();
    },
    //退出打印预览
    PrintPreviewExit() {
      this.WebOfficeObj.obj.PrintPreviewExit();
    }
  },
  watch: {
    screenHeight() {
      this.editH = document.body.clientHeight - 68;
      this.$refs.WebOffice.style.height = this.editH;
    },
    wrapWd() {
      this.editW = document.body.clientWidth - 40;
      this.$refs.WebOffice.style.width = this.editW;
    }
  },
  created() {
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
