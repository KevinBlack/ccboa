<template>
  <div class="command_word">
    <div v-if="officeConfig.EditType!=0">
      <el-button size="mini" v-if="true" round type="primary" @click="closeNowPage">关闭</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="isModifyFlag">文档是否已经修改</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="multiPartWord">MultiPart方式打开文档</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="openInUrl">URL地址打开文档</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="openInServlet">服务端Servlet打开文档</el-button>
      <el-button size="mini" v-if="officeConfig.btns.SaveDocument" round type="primary" @click="SaveDocument(true)">保存</el-button>
      <el-button size="mini" v-if="officeConfig.btns.WebOpenLocal" round type="primary" @click="WebOpenLocal">打开本地文档</el-button>
      <el-button size="mini" v-if="officeConfig.btns.WebSaveLocal" round type="primary" @click="WebSaveLocal">保存文档到本地</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="SendMessage">前后台交互信息</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="WebUseTemplate">套红</el-button>
      <el-button size="mini" v-if="officeConfig.btns.WebOpenPrint" round type="primary" @click="WebOpenPrint">打印</el-button>
      <el-button size="mini" v-if="officeConfig.btns.WebSetRevision" round type="primary" @click="WebSetRevision">{{showWebSetRevision?'显示':'隐藏'}}修改痕迹</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="WebGetRevisions">获取痕迹</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="ClearRevisions">清除痕迹</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="WebGetDocumentCont">获取文档内容</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="getDocumentXiuDing">文档是否修订模式</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="CreateFile">新增文档</el-button>
      <el-button size="mini" v-if="false" round type="primary" @click="WebSetProtect">{{canUse?'禁用':'解锁'}}文档</el-button>
      <el-tag type="info" v-show="false" id="StatusBar"></el-tag>
    </div>
    <div v-if="officeConfig.EditType==0">
      <el-button size="mini" v-if="true" round type="primary" @click="closeNowPage">关闭</el-button>
      <el-button size="mini" round type="primary" @click="WebSaveLocal">保存正文到本地</el-button>
      <el-button size="mini" v-if="officeConfig.btns.WebOpenPrint" round type="primary" @click="WebOpenPrint">打印</el-button>
    </div>
    <el-container>
      <div ref="OfficeDiv" style="width: 100%;padding-top:20px">
        <object v-if="browser=='chrome'" ref="WebOffice" id="WebOffice" width="100%" :height="editH" style="z-index: 1" clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025" type="application/kg-plugin" OnReady="OnReady" OnCommand="OnCommand" OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate" OnSending="OnSending" OnSendEnd="OnSendEnd" OnRecvStart="OnRecvStart" OnRecving="OnRecving" OnRecvEnd="OnRecvEnd" OnFullSizeBefore="OnFullSizeBefore" OnFullSizeAfter="OnFullSizeAfter" Copyright="中国建设银行股份有限公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAF8BAABgAQAALAAAAB4k3dx0Hmw5myrgT1Xb/pfKmTL20/c6N7uzNMWlLClHl6LGNj5cCyZKYTobflsb13b8r9t4yn/fn9tAZ0SEArsOSb/rRVYfUXVR/8d8xIQ9rtRF59Lc2g9QUKS6mGQN4+PnYDBXK0wE2imdnvk1/RMIwGxrWiMYcusso3/SbDse2OjNeK1Iv04fYk0zq1Clx9+s2jwx+CLur3WU1p+u2Refz51A5nekmqCfU/6fKweYSjnad0nUODSxQUuOTr4Z3W+E6f04L3NHozIzM6Zu9QB0Lx0PQL2tGGfZKxt/oi0Oz1TLXys5ejCeA/wJEnp9BdaXfpSsQ7K4onzGQ/w9p/Ewpq3pLHM7CYc3Wk5WWsI8vw+ftQlazM/hO0nXLKPRKDwzGZRemZB4ZjBkaFGLNsGxfXp1GskfiCi5MvKviF1YPRmcQ0sLS4WggRAEMxOWGbiGF/1cu8x0+B+tg2uwZ5uADzk4EfVYDDUuECQmezHR"></object>
        <object v-if="browser=='firefox'" ref="WebOffice" id="WebOffice" width="100%" :height="editH" clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025" type="application/kg-activex" OnReady="OnReady" OnCommand="OnCommand" OnOLECommand="OnOLECommand" OnExecuteScripted="OnExecuteScripted" OnQuit="OnQuit" OnSendStart="OnSendStart" OnSending="OnSending" OnSendEnd="OnSendEnd" OnRecvStart="OnRecvStart" OnRecving="OnRecving" OnRecvEnd="OnRecvEnd" OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate" OnFullSizeBefore="OnFullSizeBefore" OnFullSizeAfter="OnFullSizeAfter" Copyright="中国建设银行股份有限公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAF8BAABgAQAALAAAAB4k3dx0Hmw5myrgT1Xb/pfKmTL20/c6N7uzNMWlLClHl6LGNj5cCyZKYTobflsb13b8r9t4yn/fn9tAZ0SEArsOSb/rRVYfUXVR/8d8xIQ9rtRF59Lc2g9QUKS6mGQN4+PnYDBXK0wE2imdnvk1/RMIwGxrWiMYcusso3/SbDse2OjNeK1Iv04fYk0zq1Clx9+s2jwx+CLur3WU1p+u2Refz51A5nekmqCfU/6fKweYSjnad0nUODSxQUuOTr4Z3W+E6f04L3NHozIzM6Zu9QB0Lx0PQL2tGGfZKxt/oi0Oz1TLXys5ejCeA/wJEnp9BdaXfpSsQ7K4onzGQ/w9p/Ewpq3pLHM7CYc3Wk5WWsI8vw+ftQlazM/hO0nXLKPRKDwzGZRemZB4ZjBkaFGLNsGxfXp1GskfiCi5MvKviF1YPRmcQ0sLS4WggRAEMxOWGbiGF/1cu8x0+B+tg2uwZ5uADzk4EfVYDDUuECQmezHR"></object>
        <object v-if='windowFlag && windowType == "Win32"' ref="WebOffice" id="WebOffice" width="100%" :height="editH" CLASSID="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025" codebase="../../iWebOffice2015.cab#version=0,0,0,0">
          <param name="Copyright" value="中国建设银行股份有限公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAF8BAABgAQAALAAAAB4k3dx0Hmw5myrgT1Xb/pfKmTL20/c6N7uzNMWlLClHl6LGNj5cCyZKYTobflsb13b8r9t4yn/fn9tAZ0SEArsOSb/rRVYfUXVR/8d8xIQ9rtRF59Lc2g9QUKS6mGQN4+PnYDBXK0wE2imdnvk1/RMIwGxrWiMYcusso3/SbDse2OjNeK1Iv04fYk0zq1Clx9+s2jwx+CLur3WU1p+u2Refz51A5nekmqCfU/6fKweYSjnad0nUODSxQUuOTr4Z3W+E6f04L3NHozIzM6Zu9QB0Lx0PQL2tGGfZKxt/oi0Oz1TLXys5ejCeA/wJEnp9BdaXfpSsQ7K4onzGQ/w9p/Ewpq3pLHM7CYc3Wk5WWsI8vw+ftQlazM/hO0nXLKPRKDwzGZRemZB4ZjBkaFGLNsGxfXp1GskfiCi5MvKviF1YPRmcQ0sLS4WggRAEMxOWGbiGF/1cu8x0+B+tg2uwZ5uADzk4EfVYDDUuECQmezHR">
        </object>
        <object v-if='windowFlag && windowType == "Win64"' ref="WebOffice" id="WebOffice" width="100%" :height="editH" CLASSID="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D024" codebase="../../iWebOffice2015.cab#version=0,0,0,0">
          <param name="Copyright" value="中国建设银行股份有限公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAF8BAABgAQAALAAAAB4k3dx0Hmw5myrgT1Xb/pfKmTL20/c6N7uzNMWlLClHl6LGNj5cCyZKYTobflsb13b8r9t4yn/fn9tAZ0SEArsOSb/rRVYfUXVR/8d8xIQ9rtRF59Lc2g9QUKS6mGQN4+PnYDBXK0wE2imdnvk1/RMIwGxrWiMYcusso3/SbDse2OjNeK1Iv04fYk0zq1Clx9+s2jwx+CLur3WU1p+u2Refz51A5nekmqCfU/6fKweYSjnad0nUODSxQUuOTr4Z3W+E6f04L3NHozIzM6Zu9QB0Lx0PQL2tGGfZKxt/oi0Oz1TLXys5ejCeA/wJEnp9BdaXfpSsQ7K4onzGQ/w9p/Ewpq3pLHM7CYc3Wk5WWsI8vw+ftQlazM/hO0nXLKPRKDwzGZRemZB4ZjBkaFGLNsGxfXp1GskfiCi5MvKviF1YPRmcQ0sLS4WggRAEMxOWGbiGF/1cu8x0+B+tg2uwZ5uADzk4EfVYDDUuECQmezHR">
        </object>
      </div>
    </el-container>
  </div>
</template>
<script>
// iwebOffice
import Browser from '../../common/js/iWebCheck.js'
import { Loading } from 'element-ui'
import taohong from '@/minixs/taohong.js'
import { mapGetters } from 'vuex'
export default {
  name: 'OFFICEWORD',
  props: {
    officeConfig: {
      taoHongFlag: { default: false, type: Boolean }, //标示套红
      cleanDraftFlag: { default: false, type: Boolean }, //标示清稿
      pageFlag: { default: '', type: String }, //标示签报或者发文页面 用于套红
      saveServlet: { default: 'doHandleMainWord', type: String }, //上传接口名
      serverUrl: { default: '', type: String }, //后端ip
      formId: { default: '', type: String }, //表单id
      fwTranId: { default: '', type: String }, // 交易线id
      relativePath: { default: '', type: String }, //相对文件路径
      templateUrl: { default: '', type: String }, //套红文件路径
      fileName: { default: '', type: String }, //文件名称
      fileNameTh: { default: '', type: String }, //套红文件名称
      filePathTh: { default: '', type: String }, //套红文件路径
      multiTenancyId: { default: '', type: String }, //页面标示
      servletName: { default: '', type: String }, //服务端名称
      EditType: { default: '', type: String }, //可编辑与否
      isDinggao: { default: '', type: String }, //从成刊进还是定稿进
      depart: { default: '', type: String }, //从部门信息由模板打开
      isSynthesisFormat: { default: '', type: String} , //是否合成格式
      btns: {
        isModifyFlag: true, //是否修改
        multiPartWord: true, //multiPart打开
        openInUrl: true, //url打开
        openInServlet: true, //servlet打开
        SaveDocument: true, //保存文档到服务器
        WebOpenLocal: true, //url打开
        WebSaveLocal: true, //保存本地文档
        // WebUseTemplate:true,//套红
        WebOpenPrint: true, //打印
        WebSetRevision: true, //显示痕迹
        ClearRevisions: true, //清除痕迹
        WebGetDocumentCont: true, //获取文档内容
        CreateFile: true, //新建文档
      },
      showBtns: { default: true, type: Boolean },
      tanSun: { default: '', type: String },
    },
  },
  mixins: [taohong],
  computed: {
    ...mapGetters(['dinggaoInfo', 'departQc']),
  },
  data() {
    return {
      stepsLength: 1,
      saveInteval: '', //60s定时请求
      WebOfficeObj: '',
      editH: '',
      screenHeight: window.innerHeight,
      copyright: '',
      browser: Browser.browser,
      version: Browser.version,
      windowFlag:
        window.ActiveXObject != undefined ||
        window.ActiveXObject != null ||
        'ActiveXObject' in window,
      windowType: window.navigator.platform,
      showWebSetRevision: false, //显示、隐藏修改痕迹
      canUse: true, //解锁 锁定
      serverUrl: '',
    }
  },
  mounted() {
    let fileType = this.$route.query.state
    let that = this
    // let loadingState = Loading.service({
    //   fullscreen:true,
    //   lock:true,
    //   text:'加载中...'
    // })
    console.log('this.officeConfig.EditType', this.officeConfig.EditType)
    if (this.officeConfig.EditType == '0' || this.officeConfig.EditType == 0) {
      // return
    } else {
      this.saveInteval = setInterval(() => {
        //判断是否修改
        if (this.isModifyFlag() && this.WebGetDocumentCont() && this.officeConfig.EditType != 0) {
          if (this.WebGetDocumentCont().length < 10) {
            this.WebOfficeObj.Alert('正文文档内容至少10个字符')
            return
          }
          this.SaveDocument(false) //不关闭页面
          this.isModifyFlag(true) //清除修改状态
        }
      }, 60000)
    }

    window.onresize = () => {
      this.screenHeight = window.innerHeight
      // this.$refs.WebOffice.style.height = this.editH;
      this.$refs.WebOffice.style.height = '300px'
    }
    this.WebOfficeObj = new this.WebOffice.WebOffice2015(this.officeConfig)
    this.WebOfficeObj.setObj(document.getElementById('WebOffice'))
    this.editH = window.innerHeight - 68
    // if (!this.windowFlag) {
    //   if (this.browser == 'firefox') {
    //     if (this.version < '52') {
    //       var fireFoxType = navigator.mimeTypes['application/kg-activex']
    //       if (fireFoxType == undefined) {
    //         this.$refs.WebOffice.width = '1px'
    //         var str =
    //           '<div width="100%" height="100%" style="text-align:center; color: red;font-size:30px;" >该插件不受支持</br>点击跳转解决方案</div>'
    //         var t = this.$refs.OfficeDiv
    //         t.innerHTML = t.innerText + str
    //       }
    //     } else {
    //       this.$refs.WebOffice.width = '1px'
    //       var str =
    //         '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >该插件不受支持</br>请更换52版本以下的FireFox浏览器</div>'
    //       var t = this.$refs.OfficeDiv
    //       t.innerHTML = t.innerText + str
    //     }
    //   } else if (this.browser == 'chrome') {
    //     var kgchromeType = navigator.mimeTypes['application/kg-plugin'] //高级版
    //     var chromeType = navigator.mimeTypes['application/kg-activex'] //标准版
    //     var oldChromeType = navigator.mimeTypes['application/iWebPlugin'] //早期淘汰版本
    //     if (this.$refs.WebOffice.type == 'application/kg-plugin') {
    //       if (kgchromeType == undefined) {
    //         this.$refs.WebOffice.width = '1px'
    //         var str =
    //           '<div width="100%" height="100%" style="text-align:center; color: red;font-size:30px;" >该插件不受支持</br>引用的是高级版控件</br></div>'
    //         var t = this.$refs.OfficeDiv
    //         t.innerHTML = t.innerText + str
    //         //window.open("Faq002.html");
    //       }
    //     } else {
    //       if (this.version > '45') {
    //         if (chromeType == undefined || oldChromeType == undefined) {
    //           this.$refs.WebOffice.width = '1px'
    //           var str =
    //             '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >该插件不受支持</br>引用的是标准版控件</br></div>'
    //           var t = this.$refs.OfficeDiv
    //           t.innerHTML = t.innerText + str
    //         }
    //       } else {
    //         this.$refs.WebOffice.width = '1px'
    //         var str =
    //           '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >标准版插件不受支持</br>请更换45版本以下的Chrome浏览器</br>如果需要使用高版本Chrome浏览器,需集成高级版插件</div>'
    //         var t = this.$refs.OfficeDiv
    //         t.innerHTML = t.innerText + str
    //       }
    //     }
    //   }
    // }
    // setTimeout(()=>{
    //     // that.WebOffice.OnUnLoad.call(that.WebOfficeObj);
    //     that.WebOffice.Load.call(that.WebOfficeObj,that.officeConfig);
    //     if(fileType == "localFile"){
    //         that.WebOpenLocal();
    //     }else if(fileType == "newFile"){
    //         that.CreateFile();
    //     }else{
    //         that.openInUrl();
    //         if(that.officeConfig.fileNameTh){
    //             //套红
    //             that.WebUseTemplate();
    //             if(that.officeConfig.pageFlag == "fawen"){
    //                 this.fawenTemplate();
    //             }else{
    //                 this.signquoteTemplate();
    //             }
    //         }
    //     }
    //     that.WebOfficeObj.setEditType(that.officeConfig.EditType);
    //     if(that.officeConfig.cleanDraftFlag||that.officeConfig.isClear){
    //         that.ClearRevisions();
    //         that.SaveDocument(true);
    //     }
    //     // loadingState.close();
    // })
    judgeInstall() //校验是否已安装插件
    // this.WebOffice.OnUnLoad.call(this.WebOfficeObj)
    // this.WebOffice.Load.call(this.WebOfficeObj, this.officeConfig)
    this.openInUrl()

    // if(this.officeConfig.EditType==0){
    //     this.WebOffice.setXiuDingState.call(this.WebOfficeObj,false);
    // }else{
    //     //校验是否本地打开 修订文档
    //     if(this.WebOffice.getDocumentXiuDing.call(this.WebOfficeObj)>0){
    //         this.WebOffice.setXiuDingState.call(this.WebOfficeObj,true);
    //     }else{
    //         this.WebOffice.setXiuDingState.call(this.WebOfficeObj,this.stepsLength==1?false:true);
    //     }
    //
    // }
    this.WebOfficeObj.setEditType(this.officeConfig.EditType)
    // console.log(this.officeConfig, '获取isdinggao')
    
    if (this.officeConfig.isDinggao == 2) {
      let combinePeriodicalData = this.dinggaoInfo.draftInfo //合刊文件数据
      // for (let index = 0; index < combinePeriodicalData.length; index++) {
      //   let vName = 'draftInfo' + String(index) //书签名字
      //   // console.log(aa.replace(/\\/g,"\\"))
      //   console.log(combinePeriodicalData[index].filePathBd,'获取文件地址')
      //   // this.WebOfficeObj.WebGetFile.call(this.WebOfficeObj, 'H://ccboa.doc', combinePeriodicalData[index].filePath)
      //   // this.WebOfficeObj.VBAInsertFile.call(this.WebOfficeObj, vName, combinePeriodicalData[index].filePathBd.replace(/\\/g,"\\")) //循环加载 正文 并插入模板
      // }
      // console.log(combinePeriodicalData, typeof combinePeriodicalData, '合刊文件数据object')
      let promiseList = []
      this.fileInfo = []
      for (let index = 0; index < combinePeriodicalData.length; index++) {
        promiseList.push(
          new Promise((resolve, reject) => {
            const element = combinePeriodicalData[index]
            this.$post
              .postData(
                'doDownloadFile',
                JSON.stringify({
                  function: 'doDownloadFile',
                  fileName: element.fileName,
                  filePath: element.filePath,
                }),
                this.$businessCode.fawglfj
              )
              .then((res) => {
                resolve(res)
              })
          })
        )
      }
      Promise.all(promiseList)
        .then((rspList) => {
          var index2 = 0
          rspList.map((val) => {
            this.fileInfo.push(val)
            index2++;
            let vName = 'draftInfo' + String(index2) //书签名字
            console.log(vName,'获取vName')
            this.WebOfficeObj.WebGetFile1.call(this.WebOfficeObj, val.filePath, val.fileName, vName)
          })
        })
        .then(() => {
        })
        //插入其他信息
        let obj = ['id', 'time', 'send', 'nper']
        let newObj = this.filterObj(this.dinggaoInfo, obj)
        console.log(newObj,'插入的其他信息')
        Object.keys(newObj).map((key) => {
          newObj[key] = this.timesConcat(newObj[key], key)
          this.WebOfficeObj.WebSetBookmarks.call(this.WebOfficeObj, key, newObj[key])
        })
        var index3 = 0
        console.log(this.dinggaoInfo,'获取dinggaoInfo')
        for (let menuIndex = 0; menuIndex < this.dinggaoInfo.menu.length; menuIndex++) {
          index3++
          let vNameMenu = 'Menu' + index3
          console.log(vNameMenu, '获取书签值')
          console.log(this.dinggaoInfo.menu[menuIndex-1], '获取书签值')
          this.WebOfficeObj.WebSetBookmarks.call(this.WebOfficeObj, vNameMenu, this.dinggaoInfo.menu[menuIndex])
        }
        // console.log('异步请求完成', this.fileInfo,vName)
        // console.log('异步请求完成', element, vName)
        // this.WebOfficeObj.WebUseTemplateMore.call(this.WebOfficeObj, this.fileInfo, vName) //循环加载 正文 并插入模板
    } else if (this.officeConfig.depart == 2) {
      this.departTemplate()
    } else if (this.officeConfig.isDinggao == 3) {
      this.chengkanTemplate()
    }
    else {
      this.WebUseTemplate() //文件套红方法
      this.chengkanTemplate() //文件插值方法， 入口在taohong.js
    }
  },
  methods: {
    pageTabShow(flag) {
      if (flag) {
        this.$refs.OfficeDiv.style.position = 'relative'
        this.$refs.OfficeDiv.style.right = '0px'
      } else {
        this.$refs.OfficeDiv.style.position = 'absolute'
        this.$refs.OfficeDiv.style.right = '-20000px'
      }
    },
    // 筛选对象的方法
    filterObj(obj, arr) {
      if (typeof obj !== 'object' || !Array.isArray(arr)) {
        throw new Error('参数格式不正确')
      }
      const result = {}
      Object.keys(obj)
        .filter((key) => arr.includes(key))
        .forEach((key) => {
          result[key] = obj[key]
        })
      return result
    },
    // 处理时间的方法
    timesConcat(item, name) {
      if (name.indexOf('日期') > -1) {
        let times = (item && item.split('-')) || ''
        if (times.length) {
          item =
            times[0] + '年' + times[1].replace(/^0/, '') + '月' + times[2].replace(/^0/, '') + '日'
        }
      }
      return item
    },
    closeNowPage() {
      if (this.officeConfig.EditType == '0' || this.officeConfig.EditType == 0) {
        // window.opener.location.reload()
        window.close()
      } else {
        this.$confirm('是否保存当前文档?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
        })
          .then(() => {
            this.SaveDocument(true)
            this.pageTabShow(true)
            window.opener.location.reload()
            window.close()
          })
          .catch(() => {
            this.pageTabShow(true)
            // window.opener.location.reload()
            window.close()
          })
      }
      this.pageTabShow(false)
    },
    WebSetProtect() {
      let n = 0
      this.canUse = !this.canUse
      n = this.canUse ? 2 : 0
      this.WebOfficeObj.setEditType(n)
    },
    isModifyFlag(flag) {
      return this.WebOffice.isModify.call(this.WebOfficeObj, flag)
    },
    multiPartWord() {
      this.WebOffice.OnUnLoad.call(this.WebOfficeObj)
      this.WebOffice.Load.call(this.WebOfficeObj)
    },
    openInUrl() {
      this.WebOffice.OnUnLoad.call(this.WebOfficeObj)
      this.WebOffice.LoadURL.call(this.WebOfficeObj)
    },
    openInServlet() {
      this.WebOffice.OnUnLoad.call(this.WebOfficeObj)
      this.WebOffice.LoadServlet.call(this.WebOfficeObj)
    },
    SaveDocument(flag) {
      if (this.officeConfig.EditType == '0' || this.officeConfig.EditType == 0) {
        return
      } else {
        if (!this.WebGetDocumentCont()) {
          this.WebOfficeObj.Alert.call(this.WebOfficeObj, '当前文档内容为空')
          return
        }
        if (this.WebGetDocumentCont().length < 10) {
          this.WebOfficeObj.Alert('正文文档内容至少10个字符')
          return
        }
        this.WebOffice.SaveDocument(this.WebOfficeObj, flag)
        window.opener.location.reload()

        // this.WebOffice.SaveDocument(this.WebOfficeObj,false);
        // if(flag&&this.WebOfficeObj.Status.indexOf("失败")==-1){
        //     window.location.href = "about:blank";
        //     window.opener.location.reload();
        //     window.close();
        // }
      }
    },
    WebOpenLocal() {
      this.WebOfficeObj.WebOpenLocal.call(this.WebOfficeObj)
    },
    WebSaveLocal() {
      console.log('保存文档到本地')
      this.SaveDocument(true)
      console.log(this.WebOfficeObj,'是否可以请求websavelocal')
      this.WebOfficeObj.WebSaveLocal.call(this.WebOfficeObj)
    },
    SendMessage() {
      this.WebOffice.SendMessage.call(this.WebOfficeObj)
    },
    WebUseTemplate(flag) {
      this.WebOfficeObj.WebUseTemplate1.call(this.WebOfficeObj, flag) //这里区分签报与发文
    },
    WebOpenPrint() {
      this.WebOfficeObj.WebOpenPrint.call(this.WebOfficeObj)
    },
    WebSetRevision() {
      if (
        this.stepsLength > 1 ||
        (this.WebOffice.getDocumentXiuDing.call(this.WebOfficeObj) > 0 &&
          this.fileType == 'localFile')
      ) {
        this.WebOfficeObj.WebShow.call(this.WebOfficeObj, this.showWebSetRevision)
      }
      this.showWebSetRevision = !this.showWebSetRevision
    },
    WebGetRevisions() {
      this.WebOfficeObj.WebGetRevisions.call(this.WebOfficeObj)
    },
    ClearRevisions() {
      this.WebOfficeObj.ClearRevisions.call(this.WebOfficeObj)
    },
    WebGetDocumentCont() {
      return this.WebOfficeObj.WebGetDocumentCont.call(this.WebOfficeObj)
    },
    CreateFile() {
      this.WebOfficeObj.CreateFile.call(this.WebOfficeObj)
    },
    closePage() {
      if (this.isModifyFlag() && this.WebGetDocumentCont()) {
        this.$confirm('当前文档已修改，是否保存并退出当前页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.SaveDocument()
            window.location.href = 'about:blank'
            window.close()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              offset: 100,
              showClose: true,
              message: '已取消关闭',
              duation: 600,
            })
          })
      }
    },
  },
  watch: {
    screenHeight() {
      this.editH = window.innerHeight - 68
      this.$refs.WebOffice.style.height = this.editH
    },
  },
  created() {},
  beforeDestroy() {
    this.closePage()
  },
}
</script>
<style lang="less" scoped>
.command_word {
  width: 100%;
  overflow: hidden;
  padding: 20px;
  text-align: right;
}
</style>
