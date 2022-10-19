/*
 * CssOffic的wps实现
 */
var officeType = 2;
var result = {};
var office;
import apiIndex from '@/httpTansun/api/index.js'

//全局禁用ctrl+p打印功能,只能通过页面按钮打印
document.onkeydown = function (event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e.keyCode == 80 && e.ctrlKey) {
    return false;
  }

};
//=======================依赖的第三方库=======================
(function () {
  // var needJs = ["/ecpweb/page/ccboa/static/wps/lib/formdata.js", "/ecpweb/page/ccboa/static/wps/lib/qrcode.min.js", "/ecpweb/page/ccboa/static/wps/common/enum.js", "/ecpweb/page/ccboa/static/wps/common/common.js", "/ecpweb/page/ccboa/static/wps/common/func_tabcontrol.js"];
  // for (var i = 0; i < needJs.length; i++) {
  //   var newScript = document.createElement("script");
  //   newScript.src = needJs[i];
  //   document.body.appendChild(newScript);
  // }
}())
//
function CssOffice(wpsConfig) {
  this.SingleFileName = '';
  this.randomNumb = '';
  this.mSavePath = '';
  this.divId = '';
  this.obj = '';
  this.fileInput = '';
  this.wpsConfig = wpsConfig;
  this.downUrl = location.origin + "/ecpweb/getLocalFile.action?relativePath=" + this.wpsConfig.relativePath + "&fileName=" + this.wpsConfig.fileName; //正文路径
  this.tempUrl = location.origin + "/ecpweb/getLocalFile.action?relativePath=" + this.wpsConfig.filePathTh + "&fileName=" + this.wpsConfig.fileNameTh; //模板路径
  this.UserName = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo")).humanName || ''; // 操作文档用户名
  this.RecordID = "";
  this.Template = "";
  this.FileName = "sample.wps";
  this.FileType = '.wps';
  this.DataBase = "";
  this.Subject = '';
  this.Author = '';
  this.HTMLPath = '';
  this.Status = ""; // Status：状态信息
  /**
   * 文件格式
   */
  this.GetFileType = () => {
    var filename = this.wpsConfig.fileName || this.wpsConfig.fileNameTh;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var postf = filename.substring(index1, index2); //后缀名
    this.FileType = postf;
  }
  /*
   * 初始化
   */
  this.init = function (tag, width, height) {
    var objWps;
    var app;
    var that = this;
    if (this.wpsConfig.relativePath) {
      this.GetSingleFileName(this.wpsConfig.taoHongFlag ? this.tempUrl : this.downUrl);
    }
    var Interval_control = setInterval(() => {
      console.log("isLoad");
      objWps = document.getElementById("webwps_id");
      app = objWps.Application;
      if (app && app.IsLoad()) {
        console.log(that, "that成功");
        clearInterval(Interval_control);
        that.obj = app;
        that.objWps = objWps
        office = that
        //设置全局屏蔽ctrl+p(只能通过前台按钮打印)
        app.DisabledHotKeys = "(ctrl+p)";
      }
    })
  };
  /*
   * 新建文档
   */
  this.CreateFile = function () {
    var Interval_control = setInterval(() => {
      if (this.obj) {
        clearInterval(Interval_control);
        this.obj.createDocument("doc");
        // this.obj.Workbooks.Add()
      }
    })
  };
  /*
   * 文件名
   */
  this.GetSingleFileName = (downloadLink) => {
    var filename = downloadLink;
    var index1 = filename.lastIndexOf("/");
    var index2 = filename.length;
    var postf = filename.substring(index1 + 1, index2); //后缀名
    //新增时
    this.SingleFileName = this.wpsConfig.fileName ? postf : Math.round(Math.random() * 1000000) + 'sample.docx';
  }
  /*
   * 打开本地文件
   */
  this.selectLocalFile = function () {
    this.obj.openDocument();
  };
  /*
   * 设置显示模式在批注和最终模式之间切换
   */
  this.showPatten = function (sta) {
    let showT = sta ? 1 : 0;
    this.obj.ActiveWindow.ActivePane.View.put_ShowRevisionsAndComments(showT);
    objWps.setScreenFocus();
  };
  /*
   *
   */
  this.Alert = (value) => {
    window.alert(value);
  }
  /*
   * 保存到本地
   */
  this.WebSaveLocal = function () {
    console.log(this.wpsConfig.saveName + this.FileType, '文件名称格式');
    this.obj.saveAs();
  };
  /*
   * 设置菜单栏是否显示
   */
  this.setToolbarAllVisible = function (enable) {
    //this.obj.setToolbarAllVisible(enable);
    this.obj.setToolbarAllVisible(true);
  };

  /*
   * 正文内容
   */
  this.WebGetDocumentSize = function () {
    return this.obj.getText();
  };
  /**
   * 打印预览
   */
  this.PrintPreview = function () {
    //设置为普通打印模式
    var aa = this.obj.Options.put_PrintHiddenText(true);
    var bb = this.obj.Options.put_PrintDrawingObjects(true);
    this.obj.Documents.GetDocument().PrintPreview();
  };

  /**
   * 套打预览
   */
  this.printSetPreview = function () {
    //设置为套打模式
    var aa = this.obj.Options.put_PrintHiddenTextMode(0);
    var bb = this.obj.Options.put_PrintDrawingObjects(false);
    this.obj.Documents.GetDocument().PrintPreview();
  };
  /**
   * 插入正文
   */
  this.WebUseTemplate = () => {
    this.obj.insertDocument("正文", this.downUrl);
  };
  /**
   * 设置公文域内容
   */
  this.WebSetBookmarks = function (id, value) {
    this.obj.setDocumentMultiField(id, value, true);
  };

  /**
   * 设置书签内容
   */
  this.WebSetBookmarksTansun = function (id, value) {
    this.obj.replaceBookMarksText(id, value);
  };

  /**
   * 读取公文域内容
   */
  this.getDocumentField = function (id) {
    return this.obj.getDocumentFieldValue(id);
  };
  /**
   * 插入公文域内容
   */
  this.insertDocument = function (name, url) {
    return this.obj.insertDocument(name, url);
  };
  /**
   * 隐藏公文域边框
   */
  this.ShowDocumentFieldTarget = function (enable) {
    this.obj.put_ShowDocumentFieldTarget(enable);
  };
  /**
   * 接收修订
   */
  this.acceptRevision = function () {
    return this.obj.ActiveDocument.AcceptAllRevisions();
  };
  /**
   * 插入图片
   */
  this.insertPicture = function (path) {
    return this.obj.insertPicture(path);
    //return this.obj.ActiveDocument.Shapes.AddPicture(path);
  };

  /**
   * 将图片设置四周环绕
   */
  this.inlineShapes = function () {
    return this.obj.Selection.ShapeRange.WrapFormat.put_Type(0);
  };

  /**
   * 将图片悬浮于文字下方
   */
  this.wdWrapSquared = function () {
    return this.obj.Selection.ShapeRange.WrapFormat.put_Type(5);
  };

  /**
   * 获取正文字数
   */
  this.WebGetDocumentCont = function () {
    console.log('新打印', this)
    console.log('office', office)
    return this.obj.getText().replace(/[\n,\s]/g, "");
  };
  /**
   * 获取表格内容
   */
  this.WebGetTableCont = function () {
    var XList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var text = ''
    for (let i = 0; i < XList.length; i++) {
      for (let j = 1; j < 50; j++) {
        if (this.obj.ActiveSheet.get_Range(XList[i] + j).get_Value()) {
          return text += this.obj.ActiveSheet.get_Range(XList[i] + j).get_Value()
        }
      }
    }
  }

  /*
   * 屏蔽右键按钮
   */
  this.enableRightButton = function () {
    this.obj.enableRevisionAcceptCommand(false);
    this.obj.enableRevisionRejectCommand(false);
  };
  /**
   * 清稿
   */
  this.ClearRevisions = function () {
    console.log(this.obj)
    // this.obj.acceptRevision();
    return this.obj.ActiveDocument.AcceptAllRevisions();
  }

  this.ArrayList = function () {
    this.ObjArr = {}; // 列表
    this.Count = 0; // 数量
    this.Add = function (key, value) // 添加
    {
      this.ObjArr[key] = value;
      this.Count++;
      return true;
    }

    this.Get = function (key) {
      return this.ObjArr[key];
    }

    this.Clear = function () // 清空
    {
      this.ObjArr = {};
      this.Count = 0;
    }

    // 按json格式输出
    this.toString = function () {
      var newArray = new Array(); // 存储json字符串
      var i = 0;
      for (var i in this.ObjArr) {
        newArray.push("'" + i + "':'" + this.ObjArr[i] + "'");
      }
      return "{" + newArray + "}";
    }
  }

  this.ht = new this.ArrayList();

  /**
   * 套红
   */
  /* 关闭文档 */
  this.Close = () => {
    if (this.obj.Close() != 0) {
      return false;
    }
    return true;
  }
  /* 关闭文档 */
  this.WebClose = function() {
    if (this.Close()) {
      return true;
    }
    return false;
  }
  /**
   * 痕迹显示设置
   */
  this.WebShow = (n) => {
    //0以带标记的原始修订，在文档中显示  1以原始修订，在文档中显示 2 以最终修订，在文档中显示
    this.obj.showRevision(n ? 0 : 2);
  }
  /**
   * 只兼容 不作处理
   */
  this.setEditType = () => {

  }
}


//wps隐藏部分菜单项和功能按钮
function hideWpsBtnAndMenu(appObj) {
  // 获得菜单控制栏按钮域；
  var commandBars = appObj.get_CommandBars();
  var controls1 = commandBars.get_Item("file").get_Controls();
  var controls2 = commandBars.get_Item("standard").get_Controls();

  // 隐藏新建按钮；
  var nameNew = "新建(&N)...";
  var nameLocalNew = "本机上的模板(&M)...";
  var control1 = controls1.get_Item(nameNew);
  control1.put_Visible(false);
  var control2 = controls1.get_Item(nameLocalNew);
  control2.put_Visible(false);
  var control3 = controls2.get_Item(nameNew);
  control3.put_Visible(false);

  // 隐藏打开按钮；
  var nameOpen = "打开(&O)..."; //"&Open...";
  controls1.get_Item(nameOpen).put_Visible(false);
  controls2.get_Item(nameOpen).put_Visible(false);

  // 隐藏保存按钮；
  var nameSave = "保存(&S)"; //"&Save";//保存(&S)
  var nameSaveAs = "另存为(&A)..."; //"&Save &As...";
  var nameSaveWeb = "另存为网页(&G)..."; //"&Save as Web Pa&ge...";
  var nameSaveAll = "保存所有文档(&E)"; //"&Sav&e All";
  controls1.get_Item(nameSaveAs).put_Visible(false);
  controls1.get_Item(nameSaveWeb).put_Visible(false);
  controls1.get_Item(nameSaveAll).put_Visible(false);
  controls1.get_Item(nameSave).put_Visible(false);
  controls2.get_Item(nameSave).put_Visible(false);

  // 隐藏输出为PDF按钮，以后的标准都为OFD格式
  var namePDF = "输出为PDF格式(&F)..."; //"&Export to PD&F...";//输出为PDF格式(&F)...;
  controls1.get_Item(namePDF).put_Visible(false);
  controls2.get_Item(namePDF).put_Visible(false);

  // 隐藏输出为OFD按钮
  var nameOFD = "输出为OFD格式(&G)...";
  controls1.get_Item(nameOFD).put_Visible(false);
  var o2 = controls2.get_Item(nameOFD);
  if (!!o2) {
    o2.put_Visible(false);
  }

  // 隐藏打印按钮
  var namePrint = "打印(&P)...";
  var namePrint2 = "打印(&P)";
  controls1.get_Item(namePrint).put_Visible(false);
  var p2 = controls2.get_Item(namePrint2);
  if (!!p2) {
    p2.put_Visible(false);
  }

  // 隐藏打印预览按钮
  var namePrintView = "打印预览(&V)"; //"Print Pre&view";
  controls1.get_Item(namePrintView).put_Visible(false);
  controls2.get_Item(namePrintView).put_Visible(false);
  commandBars.get_Item("Print Preview").put_Visible(false);

}

/**
 * wps隐藏另存为按钮和输出OFD按钮
 * @param appObj
 * @returns
 */
function hideWpsSaveAsAndOfdBtn(appObj) {
  // 获得菜单控制栏按钮域；
  var commandBars = appObj.get_CommandBars();
  var controls1 = commandBars.get_Item("file").get_Controls();

  var nameSaveAs = "另存为(&A)..."; //"&Save &As...";
  controls1.get_Item(nameSaveAs).put_Visible(false);

  // 隐藏输出为OFD按钮
  var nameOFD = "输出为OFD格式(&G)...";
  controls1.get_Item(nameOFD).put_Visible(false);
}

function SaveDocument(iwebwps, flag, type) {
  var docArry = decodeURIComponent(iwebwps.wpsConfig.fileName).split("/");
  var docName = docArry[docArry.length - 1];
  var docType = docName.split('.')[docName.split('.').length - 1] || 'doc';
  docType = docType == 'undefined' ? 'doc' : (docType ? 'doc' : 'doc');
  iwebwps.SingleFileName = "sample." + docType;
  /**
   * 保存参数处理
   */
  OnBtnSaveToServer(flag, type);
}

function getDocumentXiuDing() {
  return this.obj.ActiveDocument && this.obj.ActiveDocument.Revisions && this.obj.ActiveDocument.Revisions.Count || 1;
}

function setXiuDingState(enable) {
  /* 设置是否为修订模式*/
  //开启或者停止修订,true:开启 ,false:停止
  this.obj.enableRevision(enable);
}

function setUserName(userName) {
  this.obj.setUserName(userName);
}

function OnUnLoad() {
  this.WebClose();
}

function Load() {
  console.log("...开始加载");
}

function LoadURL(f) {
  /*打开文件*/
  // url = "http://wpsyun.dev.jh/minio/wpsfile/004340624665297e6307b254b4b5092f10bf886c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=LTAIf5lqDRk6W4Mf%2F20191011%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20191011T022413Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=1c5fed477c4aa814f7097ca46577481fafd80a9f2f4b509516da04bf451aa73d&response-content-disposition=attachment%3Bfilename%2A%3Dutf-8%27%27123.txt";
  //初始化时文件统一设置成可编辑模式，如果是只读文件在添加水印时有处理
  //url = url + "&access_token="+localStorage.getItem("access_token_kingsoft")+"&volumeId=52&cloudFileId=10052";
  let url = f ? this.tempUrl : this.downUrl; //f 标识套红时打开模板
  if (this.wpsConfig.EditType == 0) {
    this.wpsConfig.EditType == "taoHong" ?
      2 :
      this.wpsConfig.EditType
  }
  office.GetFileType();
  let result = this.obj.openDocumentRemote(url, this.wpsConfig.EditType == 0 ? true : false);
  console.log(result);

}

function isModify() {
  /*是否修改*/
  return this.obj.ActiveDocument.Saved;
}
/**
 *
 * 上传保存文件到服务器，这里区别于金格
 */
//保存到OA后台服务器
function OnBtnSaveToServer(flag, type) {
  console.log('flag', flag)
  var ServerUrl = location.origin + location.pathname + 'ecpJson.action';
  // var ServerUrl = 'http://128.171.127.32:8081/ecpweb/page/ccbob/' + 'ecpJson.action';

  // var ServerUrl = 'http://128.171.127.32:8081/ecpweb/page/ccbob/'+'ecpJson.action'
  var fileSize = office.wpsConfig.nowDocType ? office.obj.getFileSize() : 33;
  var words = office.wpsConfig.nowDocType ? office.obj.getText().replace(/[\n,\s]/g, "").length : office.WebGetTableCont().length;
  if (office.wpsConfig.relativePath) {
    office.GetFileType();
  }
  var condition = {
    requestBody: JSON.stringify({
      "function": "doHandleMainWord",
      "id": office.wpsConfig.formId || 'jksdi2w323df', //操作指南无id,
      "st": localStorage.getItem("st"),
      "multiTenancyId": office.wpsConfig.multiTenancyId,
      "cleanDraftFlag": office.wpsConfig.cleanDraftFlag,
      "taoHongFlag": office.wpsConfig.taoHongFlag,
      "isHasRedHead": office.wpsConfig.isHasRedHead,
      "unitId": office.wpsConfig.unitId,
      // "unitId": this.officeConfig.unitId,
      // "maindept": this.$route.query.maindept,
      "sizeFact": words,
      "length": fileSize,
      "uploadFieldName": '测试保存文件.doc', //目前后端接收不到
    }),
    "OPER_CODE": "123123",
    BRANCH_ID: localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo")).areaCode || '123456789', // 分库机构号
  }
  console.log('保存文件名', office.wpsConfig.saveName + office.FileType);

  var data = {
    fileName: office.wpsConfig.saveName + office.FileType,
    uploadFieldName: office.wpsConfig.saveName + office.FileType,
    isGetBodyResult: true,
    isNoTmpFile: true,
    customFromData: {
      _fw_service_id: "simpleTransaction",
      transaction_id: office.wpsConfig.fwTranId,
      savePath: window.uploadSetFileConfig.savePath,
      transFlag: "p8_rp",
      remotePath: window.uploadSetFileConfig.remotePath,
      function: "doHandleMainWord",
      adapterId: "ecpJson",
      jsonData: PJF.util.json2str(condition),
    },
    isGetResponseHead: false,
  }
  var result = office.obj.SaveDocumentToServer(ServerUrl, JSON.stringify(data));
  var parseRes = result && JSON.parse(result);
  var parseResData = parseRes.responseBody && JSON.parse(parseRes.responseBody) && JSON.parse(parseRes.responseBody).Data_Cntnt && JSON.parse(JSON.parse(parseRes.responseBody).Data_Cntnt);
  console.log('2022', condition);
  console.log('成功返回', parseRes);
  console.log('解析成功返回', parseResData);

  if (parseResData && parseResData.success) {
    if (flag === true) {
      alert('保存成功')
    }
    dataProcessTansun(parseResData)
    if (office.wpsConfig.nowDocType) {
      office.obj.ActiveDocument.Saved = true; //保存成功 doc
    } else {
      office.obj.Workbooks.Saved = true; //xls
    }
  } else {
    office.Status = "保存文档到服务器失败";
    alert('保存文档到服务器失败')
  }
}

function dataProcessTansun(data) {
  if (office.wpsConfig.tanSun == '1') {
    console.log('新的222')
    if (!office.wpsConfig.isnewPage) {
      apiIndex.checkLz.checkLzAlter({
        isKh: office.wpsConfig.isKh,
        'adminType': 'admin',
        id: office.wpsConfig.formId,
        xksqFileName: data.fileName,
        xksqFilePath: data.filePath,
        handleButton: '保存'
      }).then(res => {
        console.log('tansun=1', res)
      }).catch(err => {
        console.log('tansun=1', err)
      })
    } else {
      apiIndex.checkLz.checkLzAlterV({
        isKh: office.wpsConfig.isKh,
        'adminType': 'admin',
        id: office.wpsConfig.formId,
        xksqFileName: data.fileName,
        xksqFilePath: data.filePath,
        handleButton: '保存'
      }).then(res => {
        console.log('tansun=1', res)
      }).catch(err => {
        console.log('tansun=1', err)
      })
    }

  } else if (office.wpsConfig.tanSun == '2') {
    var WebText = office.obj.getText() && office.obj.getText().replace(/[\n,\s]/g, ""); //获取word文档内容
    apiIndex.paraMeter.ManuscriptSaveZw({
      content: WebText,
      gId: office.wpsConfig.formId,
      pathName: data.fileName,
      pubMainFilePath: data.filePath,
    }).then(res => {
      console.log('res:', res)
    }).catch(err => {
      console.log('tansun=2', err)
    })
  } else if (office.wpsConfig.tanSun === '3') {
    apiIndex.pubInfo.updataBulletin({
      content: WebText,
      depInfoPubId: office.wpsConfig.formId,
      pubMainFilePath: data.fileName + ',' + data.filePath,
      jbNoStr: office.wpsConfig.jbNoStr,
      isClean: office.wpsConfig.isClean
    }).then(res => {
      localStorage.setItem('bumenxinxi', JSON.stringify(res.data))
      console.log('_+_+_+_+_+_+_+_+_+__________', JSON.stringify(res.data))
    }).catch(err => {
      console.log('tansun=3', err)
    })
  } else if (office.wpsConfig.tanSun === 'pubManuscript') {
    apiIndex.pubStatistics.JointPublicationText({
      backupTitle: office.wpsConfig.backupTitle,
      gaojianId: JSON.parse(office.wpsConfig.gaojianId),
      mainContext: JSON.parse(office.wpsConfig.mainContext),
      mainFileName: data.fileName,
      mainFilePath: data.filePath,
      pdnId: office.wpsConfig.id
    }).then(res => {
      console.log('res:', res)
    }).catch(err => {
      console.log('tansun=pubManuscript', err)
    })
  } else if (office.wpsConfig.tanSun === 'clzw') {
    apiIndex.pubStatistics.JointPublicationText({
      backupTitle: office.wpsConfig.backupTitle,
      gaojianId: JSON.parse(office.wpsConfig.gaojianId),
      mainContext: JSON.parse(office.wpsConfig.mainContext),
      mainFileName: data.fileName,
      mainFilePath: data.filePath,
      pdnId: office.wpsConfig.id
    }).then(res => {
      console.log('res:', res)
    }).catch(err => {
      console.log('tansun=clzw', err)
    })
  } else if (office.wpsConfig.depart == '2') {
    let coff = JSON.parse(office.wpsConfig.isSynthesisFormat)
    coff.depInfoPubId = office.wpsConfig.id
    coff.pubMainFilePath = data.fileName + ',' + data.filePath
    apiIndex.pubInfo.getJbDetail(coff).then(res => { //
      console.log(res)
    }).catch(err => {
      console.log('depart=2', err)
    })
  } else if (office.wpsConfig.tanSun == '4') {
    var WebText = office.obj.getText() && office.obj.getText().replace(/[\n,\s]/g, ""); //获取word文档内容
    dutyTrendsAsAPublicationSave({
      id: office.wpsConfig.formId,
      ckId: office.wpsConfig.formId,
      fileName: data.fileName,
      filePath: data.filePath,
      qfIdeaIn: office.wpsConfig.qfIdeaIn,
      remarkIn: office.wpsConfig.remarkIn
    })
  } else if (office.wpsConfig.tanSun == 'scjsx') {
    let file = data.fileName + ',' + data.filePath
    let datas = {
      id: office.wpsConfig.id,
      demoNoteId: file
    }
    apiIndex.sealManage.updateIntroduction(datas).then(res => {
      console.log(res)
    }).catch(err => {
      console.log('tansun=scjsx', err)
    })
  }
}

function dutyTrendsAsAPublicationSave(data) {
  apiIndex.duty.saveChengKan(data).then(res => {
    office.wpsConfig.dutyTrendsAsAPublicationSavedData = data || {}
    console.log('saveChengKan>res:', res, office.wpsConfig.formId)
  })
}

function dutyConferDetailSave(data) {
  apiIndex.meetings.saveMain(data).then(res => {
    office.wpsConfig.dutyConferDetailSave = data || {}
    console.log('dutyConferDetailSave>res:', res, office.wpsConfig.formId)
  })
}


export default {
  CssOffice,
  hideWpsBtnAndMenu,
  hideWpsSaveAsAndOfdBtn,
  Load,
  LoadURL,
  isModify,
  OnUnLoad,
  SaveDocument,
  setUserName,
  setXiuDingState,
  getDocumentXiuDing,
  OnBtnSaveToServer,
}
