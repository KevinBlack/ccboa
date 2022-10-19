<template>
  <div class="command_word">
    <div v-if="officeConfig.EditType!=0&&officeConfig.formState!='finish'&&officeConfig.pageFlag!='sentitySignpageidPage'">
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
        round
        type="primary"
        @click="WebPrintView"
      >打印预览</el-button>
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
      <el-button
        size="mini"
        round
        type="primary"
        @click="WebPrintView"
      >打印预览</el-button>
      <el-button
        size="mini"
        v-if="(officeConfig.formState=='finish'||officeConfig.formState=='complete')&&officeConfig.pageFlag!='sentitySignpageidPage'"
        round
        type="primary"
        @click="WebSetRevision"
      >{{showWebSetRevision?'显示':'隐藏'}}修改痕迹</el-button>
    </div>
    <div v-if="officeConfig.pageFlag=='sentitySignpageidPage'">
      <el-button size="mini" round type="primary" @click="closeNowPage">关闭</el-button>
      <el-button
        size="mini"  
        round
        type="primary"
        @click="WebSaveLocal"
      >保存正文到本地</el-button>
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
          OnOLECommand="OnOLECommand"
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
          OnOLECommand="OnOLECommand"
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
          OnOLECommand="OnOLECommand"
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
import taohong from "@/minixs/taohong.js";
import proxyEvent from "@/util/proxyEvent.js"
export default {
  name: "OFFICEWORD",
  props: {
    officeConfig: {
      saveName: { default: "", type: String }, //保存文件名
      isHasRedHead: { default: false, type: Boolean }, //保存文件名
      stepsNowName: { default: "", type: String }, //当前环节
      processInstId: { default: "", type: String }, //流程参数
      taoHongFlag: { default: false, type: Boolean }, //标示套红
      cleanDraftFlag: { default: false, type: Boolean }, //标示清稿
      pageFlag: { default: "", type: String }, //标示签报或者发文页面 用于套红(签报实物按钮控制)
      saveServlet: { default: "doHandleMainWord", type: String }, //上传接口名
      serverUrl: { default: "", type: String }, //后端ip
      formId: { default: "jksdi2w323df", type: String }, //表单id
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
      isnewPage:{default:false,type:Boolean},//是否是新的请假单页面
      unitId:{default:'',type:String},
      uniondept:{default:'',type:String},//联合发文部门
      isZengFa:{default:false,type:Boolean},
      isQC:{default:'0',type:String},//是否起草环节
    }
  },
  mixins: [taohong],
  data() {
    return {
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
      showWebSetRevision: true, //显示、隐藏修改痕迹
      canUse: true, //解锁 锁定
      isTaoHong: this.isHasRedHead, //是否已套红
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      }
    };
  },
  async beforeMount(){
    if(this.officeConfig.pageFlag=='fawen'||
    this.officeConfig.pageFlag=='sfkhSignpagePage'||
    this.officeConfig.pageFlag=='sentitySignpageidPage'||
    this.officeConfig.pageFlag=='skhQshSignpagePage' ||
    this.officeConfig.pageFlag=='signquote'){
      await this.$post
      .postData(
        "selectNewFilePath4RenovateMainWord",
        JSON.stringify({
            function: "selectNewFilePath4RenovateMainWord",
            fileName: this.officeConfig.fileName,
            filePath: this.officeConfig.relativePath,
            id:this.officeConfig.formId
          }),
        this.officeConfig.flowTranId
      )
      .then(res => {
        if (res && res.success) {
          this.officeConfig.relativePath=res.filePath
          this.officeConfig.fileName=res.fileName
          let query = this.$router.history.current.query;
          let path = this.$router.history.current.path;
          let newPath = JSON.parse(JSON.stringify(query))
          newPath.fileName = res.fileName;
          newPath.relativePath = res.filePath;
          this.$router.push({path,query:newPath})
        }
      })
    }
  },
  async mounted() {
    // await window.addEventListener('hashchange',function(){
    //    window.location.reload();
    // })
    //this.stopF5Refresh()
    
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
      this.wrapWd =  document.body.clientWidth;
      // this.$refs.WebOffice.style.height = this.editH;
      this.$refs.WebOffice.style.height = "300px";
    };
    this.WebOfficeObj = new this.WebOffice.WebOffice2015(this.officeConfig);
    console.log(this.WebOfficeObj, "初始化金额");
    let  installFlag = judgeInstall();
      if(!installFlag){
        return;
      }
    this.WebOfficeObj.setObj(document.getElementById("WebOffice"));
    this.editH = document.body.clientHeight - 68;
    
  },
  methods: {
    stopF5Refresh(){
      document.onkeydown=function(e){
        var evt = window.event||e
        var code = evt.keyCode||evt.which
        if(code==116){
          if(evt.preventDefault){
            evt.preventDefault()
          }else{
            evt.keyCode = 0
            evt.returnValue = false
          }
        }
      }
    },
    // getUnLoad(){
    //   document.getElementById('WebOffice').FuncExtModule.WebClose();
    //   this.WebOfficeObj.WebClose()
    //   try {
    //     var ret = this.WebOfficeObj.WebClose();
    //     //alert(ret);
    //     if (ret) {
    //         console.log(this.WebOfficeObj.Status);
    //     } else {
    //         console.log("关闭文档...");
    //     }
    //   } catch (e) {
    //       //alert(e.description);
    //   }
    // },
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
      if (this.officeConfig.EditType == 0||this.officeConfig.multiTenancyId == 'CN010') {//签报实物直接关闭
        //this.getUnLoad();
        window.close();
        return;
      }
      if (
        this.WebOfficeObj.obj.IsModify(1) ||
        this.fileType == "localFile" ||
        (this.officeConfig.taoHongFlag == "true" &&
          this.WebOfficeObj.obj.IsModify(1))
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
        //this.getUnLoad();
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
            //this.getUnLoad();
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
    async SaveDocument(flag, type) {
      if(this.officeConfig.unitId == undefined&&this.officeConfig.pageFlag=='fawen'&&this.officeConfig.isZengFa==undefined){
       let falgIsTrue = true;
        await this.$post
        .postData(
          "checkProcessInst4CurUser",
          JSON.stringify({
            function:"checkProcessInst4CurUser",
            id:this.officeConfig.formId,
          }),
          this.officeConfig.flowTranId
        )
        .then(res => {
          if (res) {
            falgIsTrue = res.isOpen
          }
        });
        if(falgIsTrue == false){
          return
        }
      }
      
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
      if (type) {
        this.changePageState();
        //this.getUnLoad();
        window.close();
      }
      if (this.WebOfficeObj.Status.indexOf("失败") == -1) {
        sessionStorage.setItem(this.$route.query.id,this.$route.query.id);//刷新不关闭
        window.opener && window.opener.location.reload();
        // proxyEvent.$emit("reloadNowPage");
        localStorage.setItem("notifyState", this.$route.query.page)        
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
      this.WebOfficeObj.WebSaveLocal.call(this.WebOfficeObj);
    },
    SendMessage() {
      this.WebOffice.SendMessage.call(this.WebOfficeObj);
    },
    WebUseTemplate(flag) {
      this.WebOfficeObj.WebUseTemplate.call(this.WebOfficeObj, flag); //这里区分签报与发文
    },
    WebOpenPrint() {
       this.WebOfficeObj.WebOpenPrint();
    },
    WebPrintView(){
       this.WebOfficeObj.PrintPreview.call(this.WebOfficeObj);
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
          if (this.officeConfig.fileNameTh && !this.isTaoHong) {
            //套红
            this.WebUseTemplate();
            this.signquoteTemplate();
            this.WebOffice.setXiuDingState.call(this.WebOfficeObj, false); //取消修订模式
            this.isTaoHong = true;
          }
          if(this.isQC == '1'){
            this.WebOffice.setXiuDingState.call(this.WebOfficeObj, false);
          }
        } else {
          this.openInUrl();
          if (this.officeConfig.fileNameTh && !this.isTaoHong) {
            //套红
            console.log("开始套红");

            this.WebUseTemplate();
            if (this.officeConfig.pageFlag == "fawen") {
              // 联合发文单位书签插入begin
              this.WebOfficeObj.WebSetBookmarks.call(this.WebOfficeObj, "联合发文联合发文单位", this.officeConfig.uniondept)
              this.WebOfficeObj.WebSetBookmarks.call(this.WebOfficeObj, "联合发文单位署名", this.officeConfig.uniondept)
              console.log("我是"+JSON.stringify(this.WebOfficeObj.WebSetBookmarks))
              // 联合发文单位书签插入end
              this.fawenTemplate();
            } else {
              this.signquoteTemplate();
            }
            this.isTaoHong = true;
            this.WebOffice.setXiuDingState.call(this.WebOfficeObj, false); //取消修订模式
            this.SaveDocument();
           
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
        this.WebOfficeObj.WebShow.call(
          this.WebOfficeObj,
          false
        );

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
        if(this.isQC == '1'){
          this.WebOffice.setXiuDingState.call(this.WebOfficeObj, false);
        }
        this.WebOfficeObj.obj.IsModify(0);
        localStorage.setItem("closeFanWenpages","");//套用时关闭标示
      });
    },
    //打印预览
    printPreview(){
      this.WebOfficeObj.obj.PrintPreview();
    },
    //退出打印预览
    PrintPreviewExit(){
      this.WebOfficeObj.obj.PrintPreviewExit();
    },
  },
  watch: {
    screenHeight() {
      this.editH = document.body.clientHeight - 68;
      this.$refs.WebOffice.style.height = this.editH;
    },
    wrapWd(){
      this.editW = document.body.clientWidth - 40;
      this.$refs.WebOffice.style.width = this.editW;
    },
  },
  created() {
    this.fileType = this.$route.query.state;
    this.isQC = this.$route.query.isQC||'';
    this.officeConfig.unitId = this.$route.query.unitId;
    this.officeConfig.uniondept = this.$route.query.uniondept;
    console.log(this.officeConfig+"20020218")
    this.getSteps();
    this.names =
      (localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")) &&
        JSON.parse(localStorage.getItem("userInfo")).humanName) ||
      "";
    // window.onbeforeunload = (()=>{
    //   this.getUnLoad();
    // })
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
