/*
 * @Author: wy
 * @Date: 2020-11-12 15:12:55
 * @LastEditTime: 2020-12-30 17:52:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\sealManage\mixins\oldSeal.js
 */
var markObj = null;


function getfso () {
  if (typeof (fso) != "object") {
    fso = new ActiveXObject("Scripting.FileSystemObject");
  }
  return fso
}

function MarkConfig () {
  this.deBugflag = "1"; //1为调试
  this.logFile;
  this.fso = getfso();
  this.foldername = getfoldername();
  this.CltoSeal = formatRtf(document.getElementsByName("CltoSeal")[0].value);
  this.YZZHT = formatRtf(document.getElementsByName("YZZHT")[0].value);
  this.MarkType = "cl";
  this.strPassword = "123456";
  this.regText = "";
  this.MachineNo = ""; //存储编号
  this.MachineID = ""; //机器编号
  this.MachineType = "";
  this.RFID = "";
  this.hub = "";
  this.curdocid = document.getElementsByName("docunid")[0].value;
  this.AttachNameList = "";
  this.Server_Name = getServerName();
  this.BakPath = "C:\\CCBWEBOA_SealIMG\\SealIMGBak\\" + this.curdocid;
  this.pici = 0;
  this.upfilenum = 0;
  this.formType = document.getElementsByName("FormType")[0].value;
  //合同材料
  this.ContractInfo = getContractInfo();
  this.conunid = "";
  //用印材料信息=================================
  this.initflag = 0; //判断是第一次用印
  this.clname = "";
  this.clsort = "";
  this.sealname = "";
  this.nOffset = 0;
  this.key = ""; //curdocid + 批次
  this.attid = "";
  this.attachDbPath = document.getElementsByName("attachDbPath")[0].value;
  this.No = 0; //当前运行批次
  this.MarkName = ""; //印章名称
  this.nSealNum = 0; //用印数量
  this.nSealPos = ""; //用印位置
  this.sealok = 0; //已用印数量
  this.return1 = [];
  //运行动作=========================================
  this.LastInfoflag = true; //是否获取最后用印状态
  this.getRegTxt = "";
  this.JsonMarkInfo = [];
  this.TotalSealok = 0; //已用印总数（funCountMarkNum合计）
  this.TotalSealNum = 0; //用印总数(funSetAttid合计)
  this.objShell;
  this.fundeBug = function (msg) {
    try {
      if (this.deBugflag == "1") {
        if (this.logFile == undefined) {
          var s = getToday()
          this.logFile = this.fso.CreateTextFile("c:\\" + s + ".txt", true);
        }
        this.logFile.WriteLine(msg)
        //tf.Close();
      }
    } catch (e) { }
  }
  this.funToMarkInfo = function () {
    //选择用印类型
    var MarkType = "";
    var MarkSelectType = C$("MarkSelectType").value;
    if (MarkSelectType == "") {
      MarkType = SelectMarkType();
    } else {
      MarkType = MarkSelectType;
    }
    if (MarkType == "") {
      this.MarkType = "";
      return false;
    }
    if (MarkType == "yz") {
      eval("AllMarkInfo=GetChangeJson_Mark([" + this.CltoSeal + "],'1')"); // 按印章得到转换后的JSON文本
    } else {
      eval("AllMarkInfo=GetChangeJson([" + this.CltoSeal + "])"); // 按材料得到转换后的JSON文本
    }
    this.MarkType = MarkType;
    C$("VerMark").value = "NewVer"; //用印新版本方式
    C$("YZZHT").value = AllMarkInfo; //保存			
    return AllMarkInfo;
  }
  this.funIsHandMark = function () {
    return isHandMark(this);
  }
  this.funinfoMarkInfo = function () {
    var reInfo = this.objShell.SealGetLastSealInfo()
    if (reInfo != "" && reInfo != "NULL") {
      var reInfoArr = reInfo.split(",");
      var reInfo_docid = reInfoArr[0].substring(0, 32);
      var reInfo_no = reInfoArr[0].substring(33, reInfoArr[0].length);
      var sealok = reInfoArr[2];
      if (reInfo_docid == this.curdocid) {
        if (this.JsonMarkInfo[reInfo_no].yzinfo[0].sealok < sealok) {
          this.JsonMarkInfo[reInfo_no].yzinfo[0].sealok = sealok;
          this.funUpMiddleDoc(this.curdocid, reInfo_no, sealok, this.JsonMarkInfo[reInfo_no].attid, "0");
          //UpMiddleDoc(reInfo_docid,reInfo_no,sealok,AllMarkJson[reInfo_no].attid,"1")	
        }
      }
    }
  }
  this.funGetAttName = function (ajaxObj, addflag) {
    try {
      //1.得到ajax的返回结果的XMLDOM对象			
      if (addflag == 1) {
        var BackObj = TS_getXMLDocument(decodeURIComponent(ajaxObj.xmlHttp.responseXML.xml)); //alert(BackObj.xml)
        var AttachName = BackObj.selectSingleNode("root/att").text;
        this.AttachNameList += "," + AttachName;
      }
    } catch (e) {

    }
  }
  this.funRequestHttpSesion = function (start) {
    //保持会话请求
    var iframeobj = document.getElementById("popIframe");
    if (iframeobj) {
      if (start == 1) {
        iframeobj.src = TS_getPath() + "/LongLoginTime?OpenForm"
      } else {
        iframeobj.src = "";
      }

    }
  }
  this.funMain = function () {
    this.fundeBug("funMain")
    var m = this.No;
    if (this.initflag == 0) {
      if (m == 0) {
        //生成所有附件
        this.funSetAttid();
      }
      try {
        //取最后的用印信息
        //this.fundeBug("最后的用印信息funinfoMarkInfo")
        if (this.LastInfoflag) {
          this.PrepareSeal(this.strPassword, this.regText);
          this.funinfoMarkInfo();
          this.LastInfoflag = false;
        }
      } catch (e) { }
      this.initflag = 1
    }

    this.fundeBug("funMain1")
    hideSending();
    var MarkUseState = false; //不可用印
    this.clname = this.JsonMarkInfo[m].clname; // 印章材料名称
    this.clsort = this.JsonMarkInfo[m].clsort; // 材料第几份
    if (this.JsonMarkInfo[m].conunid) {
      this.conunid = this.JsonMarkInfo[m].conunid; // 材料第几份			
    }
    this.sealname = "";
    this.key = this.curdocid + "_" + m + "";
    this.attid = this.JsonMarkInfo[m].attid
    for (var i = 0; i < this.JsonMarkInfo[m].yzinfo.length; i = i + 1) {
      if (this.JsonMarkInfo[m].yzinfo[i].sealnum > this.JsonMarkInfo[m].yzinfo[i].sealok) { // 用印数和已用印数一致就				
        MarkUseState = true; //可以用印
      }
      this.sealname += this.JsonMarkInfo[m].yzinfo[i].sealname + "^" +
        this.JsonMarkInfo[m].yzinfo[i].sealnum + "^" +
        this.JsonMarkInfo[m].yzinfo[i].sealok + ","
      this.MarkName = this.JsonMarkInfo[m].yzinfo[i].sealname;
      this.nSealNum = this.JsonMarkInfo[m].yzinfo[i].sealnum;
      this.sealok = this.JsonMarkInfo[m].yzinfo[i].sealok;
    }
    //
    this.fundeBug("funMain2")
    if (MarkUseState) {
      //用印			
      this.funSealBeginNew();
    } else {
      this.funToNext();
    }
  }
  //使用中间文档修复数据及修改用印数量上传图片
  this.funMiddleDocUpMainDoc = function () {
    this.fundeBug("funMiddleDocUpMainDoc")
    try {
      var MarkStat = C$("MarkStat").value;
      var MarkFlag = C$("MarkFlag").value;
      if (MarkStat != "") {
        var MarkArr = MarkStat.split("; ");
        for (var m = 0; m < MarkArr.length; m++) {
          var indexMarkArr = MarkArr[m].split("|");
          var indexMark = parseInt(indexMarkArr[0]);
          //修复可用印数据将由附件文档完成
          if (this.JsonMarkInfo[indexMark].attid == "") {
            this.JsonMarkInfo[indexMark].attid = indexMarkArr[2]
          }
          //修改新设备
          if (indexMarkArr.length > 3) {
            try {
              if (this.JsonMarkInfo[indexMark].MachineID == "") {
                this.JsonMarkInfo[indexMark].MachineID = indexMarkArr[3]
              }
              if (this.JsonMarkInfo[indexMark].MachineType == "") {
                this.JsonMarkInfo[indexMark].MachineType = indexMarkArr[4]
              }
            } catch (e) { }
          }
        }
      }
      try {
        this.funCopyToBak();
        this.funCountMarkNum();
      } catch (e) { }
      if (MarkFlag == "0") {
        //计算用印数量					
        var CodeNo = parseInt(C$("CodeNo").value);
        this.JsonMarkInfo[CodeNo].yzinfo[0].errnum += 1
      }
      //}
    } catch (e) { }
  }
  //备份用印图片
  this.funMarkJpgBak = function (backfile, filename) {
    //var strFolder= this.BakPath+this.curdocid;		
    try {
      CreateAllFolder(this.BakPath)
      var f;
      //3.4.3 复制用印图片	
      if (this.fso.FileExists(this.BakPath + "\\" + filename) == false) {
        f = this.fso.GetFile(backfile);
        f.Copy(this.BakPath + "\\" + filename);
      }
      /*
      try{			
        if(backfile.indexOf("SealIMGBak")==-1){					
          var fileTMP = this.fso.GetFile(backfile);
          fileTMP.Delete();
        }
      }catch(e){
      }*/
      return true
    } catch (e) {
      return false
    }
  }
  this.funDelFile = function (filepath) {
    try {
      var fileTMP = this.fso.GetFile(filepath);
      fileTMP.Delete();
      return true
    } catch (e) {
      return false
    }
  }
  this.funToNext = function () {
    //alert("funToNext")
    //this.fundeBug("funToNext");
    this.No = this.No + 1;
    if (this.pici > this.No) {
      this.funMain(); //循环用印
    } else {
      //this.fundeBug("funSave");
      this.funSave();
    }
  }
  this.funMoveAllFile = function (souPath, movePath) {
    try {
      CreateAllFolder(movePath)
      //检查用印文件夹
      var f, f1, fc, fk;
      var localfile = "";
      var filename = "";
      for (var s = 0; s < this.pici; s++) {
        var tmpfoldername = this.curdocid + "_" + s
        var tmpfolderspec = this.foldername + "\\" + tmpfoldername
        if (this.fso.FolderExists(tmpfolderspec)) {

          f = this.fso.GetFolder(tmpfolderspec);
          fc = new Enumerator(f.SubFolders);
          for (; !fc.atEnd(); fc.moveNext()) {
            f1 = this.fso.GetFolder(fc.item());
            fk = new Enumerator(f1.files);
            for (; !fk.atEnd(); fk.moveNext()) {
              localfile = this.fso.GetFile(fk.item());
              filename = this.fso.GetFileName(fk.item());
              this.funMarkJpgBak(localfile, filename)
            }
          }
          //删除文件夹				
          this.fundelMarkFolder(tmpfolderspec)
        }
      }
      if (this.fso.FolderExists(souPath)) {
        try {
          this.fso.MoveFile(souPath + "\\*", movePath)
          this.fundelMarkFolder(souPath)
        } catch (e) { }
      }
    } catch (e) {
      return false
    }
  }
  //上传并备份
  this.funCopyToBak = function () {
    this.fundeBug("funCopyToBak")
    var localfile = "";
    var filename = "";
    this.upfilenum = 0;
    var upflag = false;
    this.showDiv();
    for (var s = 0; s < this.pici; s++) {
      var tmpfoldername = this.curdocid + "_" + s
      var tmpfolderspec = this.foldername + "\\" + tmpfoldername
      this.fundeBug("  " + tmpfolderspec)
      upflag = false
      if (this.fso.FolderExists(tmpfolderspec)) {
        var f, f1, fc, fk;
        f = this.fso.GetFolder(tmpfolderspec);
        fc = new Enumerator(f.SubFolders);
        for (; !fc.atEnd(); fc.moveNext()) {
          f1 = this.fso.GetFolder(fc.item());
          fk = new Enumerator(f1.files);
          for (; !fk.atEnd(); fk.moveNext()) {
            localfile = this.fso.GetFile(fk.item()).Path;
            filename = this.fso.GetFileName(fk.item());
            this.funMarkJpgBak(localfile, filename)
            if (this.funUpfile(localfile, filename)) {
              this.funDelFile(localfile)
              upflag = true
            }
          }
        }
      }
      if (upflag) {
        //需要获取附件名称				
        this.funTofujianku(this.JsonMarkInfo[s].attid, s, 1)
      }
    }
    //hideSending()
  }
  //合并附件文档并取得附件名称
  this.funTofujianku = function (attachId, pici, addflag) {
    this.fundeBug("funTofujianku=" + attachId + "=pici=" + pici)
    var docunid = "&docunid=" + document.getElementsByName("docunid")[0].value;
    var zAttachId = "&attachId=" + attachId;
    var pici = "&pici=" + pici
    var dbdbpath = document.forms[0].DataBase.value;
    var destname = '/' + dbdbpath + "/agGetChGYYMsgNew?openagent" + docunid + zAttachId + pici;
    try {
      var obj = this;
      new AjaxClassflag("GET", destname, "", function (ajaxObj) {
        obj.funGetAttName(ajaxObj, addflag);
      }).InitialXMLHttp();
    } catch (e) {
      //alert("yymsg:" + e)
      return;
    }
  }
  this.funUpMiddleDoc = function (docunid, Codeno, sealok, attid, MarkFlag) {
    var dbdbpath = C$("DataBase").value;
    var Num = sealok; //已用印数量	
    //alert("MachineID="+this.MachineID)
    //var nSealPos = MarkObj.nSealPos		
    var agentUrl = '/' + dbdbpath + "/agMarkState?openagent&Codeno=" + Codeno + "&Num=" + Num + "&docunid=" + docunid + "&attid=" + attid + "&MarkFlag=" + MarkFlag + "&MarkType=" + this.MarkType + "&MachineID=" + this.MachineID + "&MachineType=" + this.MachineType + "&timestampt=" + new Date().toString();
    try {
      new AjaxClassflag("GET", agentUrl, "", "").InitialXMLHttp();
    } catch (e) {
      //alert(e);
    }
  }
  this.funUpfile = function (localfile, tmpfilename) {
    try {
      window.status = "上传用印图片： " + tmpfilename
    } catch (e) { }
    var attachId = GetAttachId(this.attachDbPath)
    var mRemoteURL = "http://" + this.Server_Name + "/" + this.attachDbPath + "/0/" + attachId + "/$FILE/" + tmpfilename;
    mRemoteURL = mRemoteURL + "&FileField=FileBody";
    if (EditorUploadFile(localfile, mRemoteURL) == false) {
      return false
    } else {
      this.upfilenum += 1;
      if (document.getElementById("upMarkInfo")) {
        document.getElementById("upMarkInfo").innerText = this.upfilenum;
      }
      return true
    }
  }

  //计算用印数量
  this.funCountMarkNum = function () {
    //计算总数
    this.fundeBug("funCountMarkNum")
    var f, fk, fileList, i, k;
    var marknum = []; //正常数量
    var markzf = []; //作废数量
    var markfilename = []; //本地图片
    for (var k = 0; k < this.pici; k++) {
      marknum[k] = 0;
      markzf[k] = 0;
      markfilename[k] = [];
    }
    //使用本地图片数据校验用印数量
    if (this.fso.FolderExists(this.BakPath)) {
      f = this.fso.GetFolder(this.BakPath);
      fk = new Enumerator(f.files);
      for (; !fk.atEnd(); fk.moveNext()) {
        filename = this.fso.GetFileName(fk.item());
        fileList = filename.split("_");
        i = parseInt(fileList[1]);
        if (filename.indexOf("Invalid") != -1) {
          markzf[i] += 1;
        } else {
          marknum[i] += 1;
        }
        markfilename[i].push(filename);
      }
    }
    for (k = 0; k < this.pici; k++) {
      if (this.JsonMarkInfo[k].yzinfo[0].sealok < marknum[k]) {
        this.JsonMarkInfo[k].yzinfo[0].sealok = marknum[k];
      }
      if (this.JsonMarkInfo[k].yzinfo[0].Invalid < markzf[k]) {
        this.JsonMarkInfo[k].yzinfo[0].Invalid = Math.ceil(markzf[k] / 2);
      }
    }
    //根据服务器获得的附件名称校验用印数量
    for (k = 0; k < this.pici; k++) {
      marknum[k] = 0;
      markzf[k] = 0;
    }
    var AttList = this.AttachNameList.split(",")
    for (k = 0; k < AttList.length; k++) {
      fileList = AttList[k].split("_");
      i = parseInt(fileList[1]);
      if (fileList.length == 6) {
        markzf[i] += 1;
      } else {
        marknum[i] += 1;
      }
    }
    for (k = 0; k < this.pici; k++) {
      if (this.JsonMarkInfo[k].yzinfo[0].sealok < marknum[k]) {
        this.JsonMarkInfo[k].yzinfo[0].sealok = marknum[k];
      }
      if (this.JsonMarkInfo[k].yzinfo[0].Invalid < Math.ceil(markzf[k] / 2)) {
        this.JsonMarkInfo[k].yzinfo[0].Invalid = Math.ceil(markzf[k] / 2);
      }
      this.TotalSealok += this.JsonMarkInfo[k].yzinfo[0].sealok;
    }
    this.AttachNameList = ""; //清空附件记录防止重复记录
  }
  this.funSealBeginNew = function () {
    //用印
    this.fundeBug("funSealBeginNew")
    var JsonStr = getMarkNo(this);
    if (JsonStr == "" || JsonStr == "exit") {
      this.funSave();
      return false;
    } else if (JsonStr == "next") {
      this.funToNext();
      return false;
    }
    eval("json=[" + JsonStr + "]"); // JSON转换为数组
    if (json[0].num != json[0].sealok) {
      this.MarkName = json[0].name;
      this.nSealPos = json[0].coor;
      this.nSealNum = json[0].num;
      this.sealok = json[0].sealok;
      this.regText = json[0].reg;
      this.RFID = json[0].rfid;
      this.MachineType = json[0].type;
      this.return1 = [0, 0, this.nSealNum];
      this.nOffset = parseInt(this.sealok) + 1;
      this.fundeBug("机器编号=" + json[0].machineid);
      this.fundeBug("印章RFID=" + json[0].rfid);
      if (json[0].machineid == "") {
        alert("请检查印章‘" + this.MarkName + "’登记的设备是否正确！");
        this.funSave();
        return false;
      }
      if (this.MachineID != json[0].machineid) {
        this.fundeBug("初始化");
        //alert("初始化")
        this.MachineID = json[0].machineid
        try {
          var PrepareSealflag = "";
          PrepareSealflag = this.PrepareSeal(this.strPassword, this.regText)
          if (PrepareSealflag != "0" && PrepareSealflag != 0) {
            alert("设备初始化失败！");
            this.funSave();
            return false;
          }
        } catch (e) { }
        //多设备查看视频需要
        this.fundeBug("机器号=" + this.MachineID);
      }
      try {
        if (json[0].machineid != "") {
          this.JsonMarkInfo[this.No].MachineID = json[0].machineid
          //this.JsonMarkInfo[this.No].MachineNo = json[0].machineno
          this.JsonMarkInfo[this.No].MachineType = json[0].type
        }
        this.funUpMiddleDoc(this.curdocid, this.No, 0, this.JsonMarkInfo[this.No].attid, "0")
        sealBegin(this);
      } catch (e) {
        alert("err_funSealBeginNew")
      }

    }
    //return sealBeginNew()
  }
  this.funSetAttid = function () {
    //修复文档
    //alert("funSetAttid")
    var flag = true;
    this.funMiddleDocUpMainDoc();
    for (var m = 0; m < this.JsonMarkInfo.length; m = m + 1) {

      this.TotalSealNum += this.JsonMarkInfo[m].yzinfo[0].sealnum;
      if (this.JsonMarkInfo[m].attid == "") {
        //if(this.JsonMarkInfo[m].sealnum alert(parseInt(50/50)+(50%50>0?1:0)))
        var attpc = parseInt(parseInt(this.JsonMarkInfo[m].yzinfo[0].sealnum) / 50) + (parseInt(this.JsonMarkInfo[m].yzinfo[0].sealnum) % 50 > 0 ? 1 : 0)
        var tmpattid = "";
        for (var atti = 0; atti < attpc; atti++) {
          if (tmpattid == "") {
            tmpattid = this.GetAttachId(this.attachDbPath, "1");
          } else {
            tmpattid = tmpattid + "$$" + this.GetAttachId(this.attachDbPath, "1");
          }
          //this.JsonMarkInfo[m].attid = this.GetAttachId(this.attachDbPath,"1");
        }
        this.JsonMarkInfo[m].attid = tmpattid
        //记录中间文档防止丢失
        this.funUpMiddleDoc(this.curdocid, m, 0, this.JsonMarkInfo[m].attid, "0");
      }
    }
  }
  this.GetAttachId = function (attachdbname, nodel) {
    //nodel为印章附件主文档不可删除
    var strmainid = "";
    var filepath = "";
    filepath = TS_getServer() + "/" + C$("DataBase").value;
    //alert("nodel="+nodel)
    var StrViewURL = filepath + "/agAjaxCreateAttachDocument?openagent&nodel=" + nodel + "&wdbname=" + attachdbname;
    var XMLDoc = new ActiveXObject("Microsoft.XMLDOM");
    XMLDoc.async = false;
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("POST", StrViewURL, false);
    xmlhttp.Send();
    XMLDoc.loadXML(xmlhttp.responseXML.xml);
    var MainIdNode = XMLDoc.selectSingleNode("Root/AttachId");
    if (MainIdNode) {
      strmainid = MainIdNode.text;
      return strmainid;
    } else {
      return "";
    }
  }
  this.funSave = function () {
    //保存文档
    //alert("funSave");		
    showSending("用印检查请稍后<span id='upMarkInfo'></span>")
    this.AttachNameList = "";
    this.funCopyToBak();
    try {
      //计算用印数量
      this.funCountMarkNum();
    } catch (e) { }
    document.getElementsByName("YZZHT")[0].value = this.JsonMarkInfo.toJSONString()
    if (this.TotalSealNum <= this.TotalSealok && this.TotalSealNum != 0) {
      if (this.formType == "fmMain3") {
        document.getElementsByName("isYY")[0].value = "Y";
      } else {
        document.getElementsByName("isFZYYTime")[0].value = "Y";
      }
      //this.fundelMarkFolder();
    } else {
      if (this.pici == this.No) {
        this.No = 0;
        this.funMain();
        return false;
        /*
        if (confirm("您的用印未完成，是否强行结束所有用印?\n暂时结束请点‘取消’,‘确定’后将不可以用印。")){
          if(this.formType=="fmMain3"){
            document.getElementsByName("isYY")[0].value = "Y";
          }else{
            document.getElementsByName("isFZYYTime")[0].value = "Y";
          }	
          //this.fundelMarkFolder();
        }*/
      }
    }
    this.funUpMiddleDoc(this.curdocid, "", 0, "", "1") //只修改状态
    this.funRequestHttpSesion(0);
    C$("Action").value = "sealDoc";
    document.all("formsave").click();
  }
  this.fundelMarkFolder = function (delPath) {
    if (this.fso.FolderExists(delPath)) {
      this.fso.DeleteFolder(delPath, false);
    }
  }
  this.showDiv = function () {
    showSending("用印操作处理请稍后<span id='upMarkInfo'></span>")
  }
  this.PrepareSeal = function (strPassword, strFileReg) {
    this.fundeBug("PrepareSeal");
    if (this.MachineType != "1") {
      this.fundeBug("PrepareSeal_old");
      //strFileReg = "6A0D00001CE0A4234CC30F3C1CE0A4234CC30F3C"
      return this.objShell.PrepareSeal(strPassword, strFileReg);
    } else {
      this.fundeBug("PrepareSeal_new")
      //this.fundeBug("印章RFID="+this.RFID);
      //this.fundeBug("strPassword1=" + strPassword)
      this.fundeBug("机器编号=" + this.MachineID)
      return this.objShell.PrepareSeal(strPassword, strFileReg, this.MachineID);
      //this.fundeBug("PrepareSeal_hub_2")
    }
  }
  this.SealGetState = function () {
    return this.objShell.SealGetState();
  }
  //获取机器编号
  this.SealGetMachineID = function () {
    return this.objShell.SealGetMachineID();
  }
  //用印
  this.BeginSealControl = function (nSealPos, nSealNum, nOffset, nMode, strPath, strJobID, nflag, strHubconfig) {

    if (this.MachineType != "1") {
      return this.objShell.BeginSealControl(nSealPos, nSealNum, nOffset, nMode, strPath, strJobID, nflag);
    } else {
      return this.objShell.BeginSealControl(nSealPos, nSealNum, nOffset, nMode, strPath, strJobID, nflag, this.MachineID);
    }
  }
  //异常处理
  this.SealExceptionDeal = function () {
    return this.objShell.SealExceptionDeal();
  }
  //蜂鸣器
  this.SealBuzzer = function () {
    return this.objShell.SealBuzzer();
  }
  //维护
  this.SealService = function (tmpint, strPath) {
    if (this.MachineType != "1") {
      return this.objShell.SealService(tmpint, strPath, this.curdocid, this.strPassword, this.regText);
    } else {
      return this.objShell.SealService(tmpint, strPath, this.curdocid, this.strPassword, this.regText, this.MachineID);
    }
  }
  //存储维护
  this.SealStoreMaintain = function () {
    if (this.MachineType != "1") {
      return false;
    } else {
      return this.objShell.SealStoreMaintain(this.curdocid);
      //return this.objShell.SealStoreMaintain();
    }
  }
  //设备迁移
  this.SealDeviceMigration = function () {
    if (this.MachineType != "1") {
      return false;
    } else {
      //return this.objShell.SealDeviceMigration(this.curdocid);
      return this.objShell.SealDeviceMigration();
    }
  }
  //开安全门锁
  this.SealUnlock = function (closeTime) {
    if (this.MachineType != "1") {
      return this.objShell.SealUnlock(this.strPassword, this.regText);
    } else {
      return this.objShell.SealUnlock(this.strPassword, this.regText, closeTime);
    }
  }
  //关安全门
  this.SealCloseLock = function () {
    //新设备才有该接口
    return this.objShell.SealCloseLock();
  }
  //进纸门 
  this.SealOpenDoor = function () {
    return this.objShell.SealOpenDoor();
  }
  //安全门状态（旧）
  this.SealDetectExit = function () {
    return this.objShell.SealDetectExit();
  }
  this.SealAllDevice = function () {
    return this.objShell.SealAllDevice();
  };
  //录像功能strSwitch为1为开，0为关
  this.ImportantVideo = function (type, strSwitch) {
    return this.objShell.ImportantVideo(type, strSwitch, this.curdocid);
  };
  this.SealBuiltInPhoto = function () {
    var foldername;
    var username;
    if (C$("curuser"))
      username = C$("curuser").value;
    if (C$("openuser"))
      username = C$("openuser").value;
    if (C$("openUser"))
      username = C$("openUser").value;

    username = NameToAbbreviate(username);
    username = username.replace(/\//g, "#");
    foldername = "C:\\CCBWEBOA_SealIMG\\" + username + "\\" + markObj.key;
    return this.objShell.SealBuiltInPhoto(foldername, this.key)
  };
  this.getRegTxt = function () {
    var flag = false;
    var regTxt = "";
    var State = this.SealGetState() //检测驱动接口是否可以使用		
    if (State == 0) {
      State = this.SealGetMachineID()
      if (State < 0) {
        flag = true
      }
    } else {
      flag = true
    }
    if (flag) {
      alert("用印机异常检查用印机是否开启，以及连接用印机设备的驱动是否正确安装。")
    } else {
      url = TS_getPath() + "/agGetRegByMachineID?OpenAgent&machineID=" + State;
      var strReturnTEXT = AJAXRunAgent(url, false);
      var arrReturnTEXT = strReturnTEXT.split("$$Return$$");
      if (arrReturnTEXT[1].toUpperCase() == "FALSE") {
        alert("获取机器注册内容失败，请联系管理员！");
      } else {
        regTxt = arrReturnTEXT[1];
      }
    }
    return regTxt;
  }
  this.returnInfo = "";
}
//手动用印
function isHandMark (obj) {
  if (obj.CltoSeal == "" && obj.YZZHT == "") {
    if (obj.formType == "fmMain3") {
      document.getElementsByName("isYY")[0].value = "Y";
    } else {
      document.getElementsByName("isFZYYTime")[0].value = "Y";
    }
    C$("Action").value = "sealDoc"; //用于记录用印操作日志，by yangang 20160714
    document.all("formsave").click();
    return true;
  } else {
    return false;
  }
}
//用印按钮函数
function startMark () {
  showDiv();
  //markObj.fundeBug("startMark");
  //写入用印标识用于判断生成统计数据，防止上下级行数据重复使用。
  C$("MarkMainForm").value = "1"; //该数据不同步（跨行）

  var unitLevel = C$("UnitLevel").value;
  if (markObj == null) {
    markObj = new MarkConfig();
  }
  if (markObj.funIsHandMark()) {
    //alert("手工用印")
    return false;
  }
  if (C$("MarkDocId")) {
    if (C$("MarkDocId").value == "") {
      C$("MarkDocId").value = markObj.curdocid;
    }
  }
  //markObj.pici = 2
  //markObj.funCopyToBak();
  //markObj.funCountMarkNum();	
  //得到合同信息
  if (markObj.ContractInfo.length > 0) {
    //如果是合同用印需按材料提交用印
    C$("MarkSelectType").value = "cl";
  }

  //得到用印信息的JSON格式
  if (markObj.YZZHT == "") {
    markObj.JsonMarkInfo = eval(markObj.funToMarkInfo())
  } else {
    markObj.JsonMarkInfo = eval(markObj.YZZHT)
  }
  if (markObj.MarkType == "") {
    closeDiv();
    return false;
  }
  if (markObj.objShell == null) {
    markObj.objShell = CreateMarkObj();
  }
  if (markObj.objShell == null) {
    closeDiv();
    return false;
  }

  /*  多设备调整到取章时获取
  var regText = getRegTxt(markObj.objShell)	
  if(regText==""){	
    closeDiv();
    return false;
  }
  var regList = regText.split("|");
  markObj.regText = regList[0];
  markObj.MachineType = regList[1];
  markObj.MachineNo = regList[2];
  */
  CollectGarbage(); // js内存回收
  //如果出现 异常后获取设备
  //agGetMarkInfo 代理写入中间文档数据 
  markObj.regText = document.getElementsByName("midreg")[0].value;
  //markObj.MachineNo = document.getElementsByName("midMachineNo")[0].value;
  markObj.MachineType = document.getElementsByName("midMachineType")[0].value;
  markObj.MachineID = document.getElementsByName("midMachineID")[0].value;
  markObj.RFID = document.getElementsByName("midMachineRfid")[0].value;
  markObj.pici = markObj.JsonMarkInfo.length;
  if (markObj.pici == 0) {
    alert("用印数据有异常，请联系系统管理员！");
    closeDiv();
    return false;
  }
  markObj.funRequestHttpSesion(1);
  //印章机初始化
  //markObj.objShell.PrepareSeal(markObj.strPassword,markObj.regText);
  //检查异常后调用主函数funMain	
  //UsbErrorDisposeNew(markObj);
  //文档锁时间
  replaceLockDocTime()
  if (markObj.MachineID != "") {
    markObj.fundeBug("UsbErrorDisposeNew");
    try {
      markObj.PrepareSeal(markObj.strPassword, markObj.regText);
    } catch (e) {
      alert("初始化异常，请检查设备是否连接！");
      closeDiv();
      return false;
    }
    UsbErrorDisposeNew(markObj);
  } else {
    markObj.No = 0;
    markObj.funMain();
  }
}
//用印函数
function sealBegin (markObj) {
  markObj.fundeBug("用印");
  var foldername;
  var username;
  markObj.fundeBug("sealBegin");
  if (C$("curuser"))
    username = C$("curuser").value;
  if (C$("openuser"))
    username = C$("openuser").value;
  if (C$("openUser"))
    username = C$("openUser").value;

  username = NameToAbbreviate(username);
  username = username.replace(/\//g, "#");
  foldername = "C:\\CCBWEBOA_SealIMG\\" + username + "\\" + markObj.key;
  var State = markObj.SealGetState();
  var returnstr = "";
  var ewmCheck = "";
  if (State == 0 || State == 4 || State == 2) {

    if (markObj.MachineType == "1") {
      markObj.fundeBug("sealBegin1");
      markObj.fundeBug("markObj.nSealPos=" + markObj.nSealPos);
      markObj.fundeBug("markObj.nSealNum=" + markObj.nSealNum);
      markObj.fundeBug("markObj.nOffset=" + markObj.nOffset);
      markObj.fundeBug("markObj.nSealPos=" + markObj.nSealPos);
      markObj.fundeBug("markObj.key=" + markObj.key);
      markObj.fundeBug("markObj.RFID=" + markObj.RFID);
      if (markObj.conunid != "") {
        for (var k = 0; k < markObj.ContractInfo.length; k++) {
          if (markObj.conunid == markObj.ContractInfo[k].id) {
            ewmCheck = markObj.ContractInfo[k].value;
          }
        }
      }
      if (ewmCheck.indexOf("amp;") > -1) {
        ewmCheck = ewmCheck.replace("amp;", "")
      }
      markObj.fundeBug("二维码较验信息=" + ewmCheck);
      //var returnstr = objShell.BeginSealControl(nSealPos,nSealNum,nOffset,1,foldername+"\\"+nSealPos,docunid,1)
      returnstr = markObj.objShell.BeginSealControl(markObj.nSealPos, markObj.nSealNum, markObj.nOffset, 1, foldername + "\\" + markObj.nSealPos, markObj.key, 1, markObj.RFID, ewmCheck)
      //returnstr = markObj.objShell.BeginSealControl(markObj.nSealPos,markObj.nSealNum,markObj.nOffset,1,foldername+"\\"+markObj.nSealPos,markObj.key,1,markObj.RFID)

    } else {
      markObj.fundeBug("sealBegin2");
      returnstr = markObj.objShell.BeginSealControl(markObj.nSealPos, markObj.nSealNum, markObj.nOffset, 1, foldername + "\\" + markObj.nSealPos, markObj.key)
      markObj.fundeBug("sealBegin2_1");
    }
    if (returnstr == 0) {
      var result = markObj.objShell.SealShowWindow();
      if (result == "0" || result == 0) {
        State = markObj.SealGetState()
        if (State == 1) {
          cycleGetState(markObj)
        } else {
          alert("用印打开窗口状态异常=" + State)
        }
      } else {
        markObj.funSave();
      }
    } else {
      if (document.getElementsByName("isFZYYTime")[0]) {
        document.getElementsByName("isFZYYTime")[0].value = "N";
      }
      //异常
      markObj.funSave();
    }
  }
}
//循环检查用印状态
function cycleGetState (markObj) {
  // markObj.fundeBug("cycleGetState" + new Date().toString())
  var State = markObj.SealGetState()
  //3.3  检查用印状态结束后跳出循环 0接口可用 1用印中，2强制中断，3作废，4用印结束 ，5异常中断
  if (State == 1 || State == 3) {
    setTimeout(function () {
      cycleGetState(markObj)
    }, 3000)
  } else {
    if (State == 2) {
      if (confirm("提示：您用印强制退出，是否进行其他印章的用印？") == false) {
        markObj.funSave();
      } else {
        markObj.funToNext();
      }
      return false;
    }
    if (State == 4) { //记录出错状态，从出错位置重新盖章。是否进行其他印章类别的盖章。
      //记录出错位置			
      markObj.funToNext();
      return false;
    } else {
      markObj.JsonMarkInfo[markObj.No].yzinfo[0].errnum += 1
      markObj.funSave();
      return false;
    }
  }
}
//循环获取异常处理状态
function cycleGetUsbErrState (markObj) {
  //alert("cycleGetUsbErrState")
  markObj.fundeBug("cycleGetUsbErrState")
  var State = markObj.SealGetState()
  //3.3  检查用印状态结束后跳出循环 0接口可用 1用印中，2强制中断，3作废，4用印结束 ，5异常中断
  if (State == 1 || State == 3) {
    setTimeout(function () {
      cycleGetUsbErrState(markObj)
    }, 3000)
  } else {
    if (State == 2) {
      if (confirm("提示：您用印强制退出，是否进行其他印章的用印？") == false) {
        markObj.funSave();
      } else {
        markObj.funMain();
      }
      return false;
    }
    if (State == 4) { //记录出错状态，从出错位置重新盖章。是否进行其他印章类别的盖章。
      //记录出错位置		
      markObj.funMain();
      return false;
    } else {
      markObj.funCopyToBak();
      markObj.funCountMarkNum();
      markObj.funMain();
      return false;
    }
  }
}
//异常处理
function UsbErrorDisposeNew (markObj) {
  var DealState = markObj.SealExceptionDeal();
  if (DealState == 1 || DealState == 3) {
    setTimeout(function () {
      cycleGetUsbErrState(markObj)
    }, 3000); //
  } else {
    markObj.No = 0;
    markObj.funMain();
  };
}

function getServerName () {
  var Server_Name = C$("DominoServerName").value;
  var Server_Port = C$("Server_Port").value;
  if (Server_Port != "80") {
    Server_Name = Server_Name + ":" + Server_Port;
  }
  return Server_Name
}

function AjaxClassflag (Model, Url, Parastr, ReturnFunc) {
  this.model = Model;
  this.url = Url;
  this.parastr = Parastr;
  this.doWithResult = ReturnFunc;
  var obj = this;

  //创对象，并返对象
  this.xmlHttp = null;
  try {
    // Firefox, Opera 8.0+, Safari
    this.xmlHttp = new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer
    try {
      this.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }

  //入口函数
  this.InitialXMLHttp = function () {
    this.GetXMLHttpRequest();
  }
  //跟后台数据交互
  //_TransformCgiURL
  this.GetXMLHttpRequest = function () {
    this.xmlHttp.onreadystatechange = this.handleAddStateChange; // 	this.funName;
    if (typeof (this.model) == "undefined") this.model = (typeof (this.parastr) == "undefined" ? "Get" : "Post");
    //this.xmlHttp.open(this.model,this.url,fl);	
    this.xmlHttp.open(this.model, this.url, false);
    this.xmlHttp.send(typeof (this.parastr) == "undefined" || this.parastr == "" ? null : TS_TransformCgi(this.parastr));
  }

  this.handleAddStateChange = function () {
    if (obj.xmlHttp.readyState == 4) {
      if (obj.xmlHttp.status == 200) {
        if (ReturnFunc != "")
          obj.doWithResult(obj);
      }
    }
  }
}

function LoadVideo (strType) {
  //获取有存储的用印机返回设备信息
  var CurBankID = C$("CurBankID").value;
  var MachineID = C$("MachineID").value;
  //alert(MachineID)
  /*
  var MachineNo = C$("MachineNo").value;
  var Path = TS_getPath()+ "/dlgSelectDeviceName?OpenForm&CurBankID=" + CurBankID+"&MachineNo="+MachineNo;
  
  var vRtn = showModalDialog(Path, "","help:no; status:no; scroll:no; dialogWidth:380px; dialogHeight:300px");
  if(vRtn=="no"){
    return false;
  }	*/

  if (markObj == null) {
    markObj = new MarkConfig();
  }
  if (markObj.objShell == null) {
    markObj.objShell = CreateMarkObj();
  }
  if (markObj.objShell == null) {
    return false;
  }
  try {
    var AllMachineID = "";
    if (MachineID == "") {
      AllMachineID = markObj.objShell.SealAllDevice();
    } else {
      AllMachineID = MachineID
    }
  } catch (e) {
    alert("您的设备不支持该功能");
    return false;
  }
  var Path = TS_getPath() + "/dlgSelectDeviceName?OpenForm&CurBankID=" + CurBankID + "&MachineID=" + encodeURIComponent(AllMachineID);
  var vRtn = showModalDialog(Path, "", "help:no; status:no; scroll:no; dialogWidth:380px; dialogHeight:300px");
  if (vRtn == "no") {
    return false;
  }
  var vRtnList = vRtn.split("|");
  markObj.MachineType = vRtnList[0];
  markObj.MachineID = vRtnList[1];
  markObj.regText = vRtnList[2];
  //markObj.hub = vRtnList[3];	
  //alert(markObj.MachineID)
  if (markObj.MachineType != "1") {
    alert("您选择的设备不支持录像功能！");
    return false;
  }
  //showDiv();	

  //if(markObj.objShell==null){
  //closeDiv();
  //return false;
  //}
  //vRth:设备类型|存储编号|注册编码|HUB位置编码|机器码

  try {
    //if(markObj.MachineID != vRtnList[4]){
    //markObj.MachineID = vRtnList[4];
    markObj.PrepareSeal(markObj.strPassword, markObj.regText);

    //}		
  } catch (e) {
    alert("设备初始化异常！");
    closeDiv();
    return false;
  }
  var State = markObj.SealGetState();
  try {
    if (State == 0 || State == 4 || State == 2) {
      //markObj.funRequestHttpSesion(1)
      markObj.ImportantVideo(strType, "1");
      //C$("MarkDocId").value = markObj.curdocid
      alert("确定将结束录像！");
      //markObj.funRequestHttpSesion(0)
      markObj.ImportantVideo(strType, "0");
      if (C$("MachineID")) {
        if (C$("MachineID").value == "") {
          C$("MachineID").value = markObj.MachineID
        }
      }
      if (C$("MarkDocId")) {
        if (C$("MarkDocId").value == "") {
          C$("MarkDocId").value = markObj.curdocid;
          C$("Action").value = "save";
          document.all("formsave").click();
        }
      }
    } else {
      alert("未能进行录像，请检查设备及设备配置！");
    }
  } catch (e) {
    alert("未能进行录像，请检查设备及设备配置！");
  }
  closeDiv();
}

function ShowVideo () {
  //var Server_Name= C$("DominoServerName").value;
  //var Server_Port = C$("Server_Port").value;
  //var ServerUrl = TS_getPath();
  //if(Server_Port!="80"){
  //Server_Name = Server_Name+":"+Server_Port;
  //}
  //去附件库中查看当前附件id文档是否存在
  //得到通过转换的数据库	
  var MachineID = C$("MachineID").value;
  var curdocid = getMarkDocId();
  var attid = "";
  var attachDbPath = document.forms[0].attachDbPath.value;
  var MarkServer = C$("MarkServer").value;
  MachineID = encodeURIComponent(MachineID);
  if (MarkServer != "") {
    Server_Name = MarkServer;
    attachDbPath = C$("MarkattachDbPath").value;
  }
  var wd = screen.availWidth;
  var wh = screen.availHeight;
  var curbankid = C$("MarkBankId").value;
  if (curbankid == "") {
    curbankid = C$("CurBankID").value;
  }
  var tmpForm = "fmGetVideo"
  if (MachineID.substring(0, 2).toUpperCase() == "SG") {
    tmpForm = "fmGetVideo_server"
  }
  //var mRemoteURL = "http://"+Server_Name+"/"+attachDbPath+"/fmModelDialog?openform&Title=查看用印图片&attachId="+attachId;
  var mRemoteURL = TS_getPath() + "/fmGetVideo?openform&curbankid=" + curbankid + "&attachId=" + attid + "&curid=" + curdocid + "&MarkServer=" + MarkServer + "&MachineID=" + MachineID + "&attachDbPath=" + attachDbPath;
  var Str1 = window.showModalDialog(mRemoteURL, document, "dialogWidth=" + wd + ";dialogHeight=" + wh + ";status=0;location=no;help=no;scroll=yes");

}

function getMarkDocId () {
  //获取用印主文档ID
  var MarkDocId = C$("MarkDocId").value;
  if (MarkDocId == "") {
    MarkDocId = C$("docunid").value;
  }
  return MarkDocId;
}

function CreateFile () {
  var fso, tf;
  fso = new ActiveXObject("Scripting.FileSystemObject");
  tf = fso.CreateTextFile("c:\\testfile.txt", true); // 写一行，并且带有新行字符。
  tf.WriteLine("Testing 1, 2, 3."); // 向文件写三个新行字符。  
  tf.WriteBlankLines(3); // 写一行。   tf.Write ("This is a test.");
  tf.Close();
}

function CheckEditorflag () {
  try {
    var wobj = new ActiveXObject("iWebOffice2009.HandWriteCtrl")
    return true;
  } catch (e) { }
  return false;
}

function getContractInfo () {
  var info = C$("uploadMarkInfo").value;
  var ContractArr = [];
  if (info) {
    if (info != "") {
      var infoArr = [];
      info = info.replace(/\n/gi, "");
      info = info.replace(/\r/gi, "");
      info = info.replace(/\f/gi, "");
      var infoArr = info.split("@@");
      for (i = 0; i < infoArr.length; i++) {
        var arr_sub = infoArr[i].split("##");
        ContractArr.push({
          "id": arr_sub[0],
          "value": arr_sub[4]
        });
      }
    }
  }
  return ContractArr;
}
