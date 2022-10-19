/**
 * create by zx on 2020/9/21 10:07
 * 类注释：表格导出 dpf导出
 * 备注：
 */
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import http from '../http/http'

// import initCanvas from './initCanvasDom'

function initCanvasDom() {
  let dom = document.querySelector('#' + idStr)
        
  // solve textarea line feed widh jspdf
  function insertAfter(new_item, item) {
    item.parentNode.insertBefore(new_item, item.nextSibling)
  }
  let textareas = dom.getElementsByTagName('textarea')
  let _textareas = document.getElementsByClassName('_textarea')
  if(_textareas.length) {
    for(let i = 0; i < textareas.length; i++) {
      textareas[i].style.display = 'none'            
      _textareas[i].style.display = 'block'
    } 
  } else {
    if(textareas.length) {
      for(let i = 0;  i < textareas.length; i++) {
        // textareas[i].value = textareas[i].value.replace(/\n/g, "<br/>")
        textareas[i].style.display = 'none'
        let _textarea = document.createElement('div')
        _textarea.className = '_textarea'
        _textarea.style = `
          resize: none;
          padding: 5px 15px;
          min-height: 80px;
          line-height: 1.5;
          box-sizing: border-box;
          width: 100%;
          font-size: inherit;
          color: #606266;
          background-color: #FFF;
          border: 1px solid #DCDFE6;
          border-radius: 4px;`
        let text = textareas[i].value.replace(/\n/g, ";")
        let textArr = text.split(';')
        let _html = ''
        for(let a = 0; a < textArr.length; a++) {
          _html += `<p style="line-height: 1.5;">${textArr[a]}</p>`
        }
        _textarea.innerHTML = _html
        insertAfter(_textarea, textareas[i])
      }       
    }
  }
  
  // console.log(dom)

  //解决隐藏Dom内容过长，显示问题
  // document.querySelector('.shoucangTable').style.display='table';
  // try{
  //   var shoucangHeight=document.getElementsByClassName('shoucangTable')[0].clientHeight;
  //   document.querySelector('#' + idStr).style.height=shoucangHeight+'px';
  // }catch(e){
  //   var shoucangHeight=0;
  // }

  // solve problem document srcoll make create canvas count height error
  window.scrollTo(0, 0)
}

function reBackDom() {
  let _textareas = document.getElementsByClassName('_textarea')
  for(let i = 0; i < textareas.length; i++) {
    textareas[i].style.display = 'block'            
    _textareas[i].style.display = 'none'
  }  
}

export default {
  /**
   * 导出到execl
   * @param id   table的 id
   * @param name  导出文件名字
   * @param hasstyle 是否导出表格样式
   * @param hastitle 是否设置表头,用于判断是否合并表格
   *                 //目前兼容性不高，写成了固定合并两列表格
   * @returns {*}
   */
  exportExcel(name, id = "#table", hasstyle, hastitle) {
    if (!!hasstyle) {

      var xlsxParam = {
        raw: true
      }; // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(document.querySelector(id), xlsxParam);

      //表格单元格宽度设置
      var colsItems = wb.Sheets.Sheet1;
      let colsWidthArray = [];
      let colsObj = {};
      let key = 0;
      for (key in colsItems) {
        if (!!key.match(/[A-Z]/g)) {
          let len = colsItems[key].v.length;
          //若字符串为时间，则长度取6
          if (!isNaN(Date.parse(colsItems[key].v)) && isNaN(colsItems[key].v)) {
            colsObj[key.match(/[A-Z]/g)[0]] = 7;
          } else {
            //不存在则添加相应键值对         
            if (typeof colsObj[key.match(/[A-Z]/g)[0]] == 'undefined') {
              colsObj[key.match(/[A-Z]/g)[0]] = len;

              //存在相应属性名且长度小于新值，取较大值
            } else if (len > colsObj[key.match(/[A-Z]/g)[0]]) {

              colsObj[key.match(/[A-Z]/g)[0]] = len;
            }
          }

        }
      }
      let i = 0;
      for (i in colsObj) {
        if (colsObj[i] < 6) {
          //设定最小宽度为60
          colsWidthArray.push({ wpx: 60 })
        } else {
          colsWidthArray.push({ wpx: colsObj[i] * 10 })
        }

      }
      console.log(colsWidthArray)
      wb.Sheets["Sheet1"]["!cols"] = colsWidthArray;//表格单元格宽度

      if (!!hastitle) {
        wb.Sheets["Sheet1"]["!merges"] = [{
          //合并单元格 index都从0开始
          s: {//s开始
            c: 0,//开始行
            r: 0//开始列
          },

          e: {//e结束
            c: 1,//结束行
            r: 0//结束列
          }
        }]
      }

      wb.Sheets["Sheet1"]["A1"]["s"] = {
        //表格单元格样式
        font: {
          sz: 14,
          color: {
            grey: '#333333'
          },
          alignment: {
            horizonal: "center",
            vertical: "center",
            wrap_text: true
          }
        }
      }

      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      })


      function s2ab(s) {
        // 字符串转ArrayBuffer
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }

      try {
        FileSaver.saveAs(new Blob([s2ab(wbout)], {
          type: 'application/octet-stream'
        }), name + ".xlsx")
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    } else {
      var xlsxParam = {
        raw: true
      } // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(document.querySelector(id), xlsxParam)

      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })

      try {
        FileSaver.saveAs(new Blob([wbout], {
          type: 'application/octet-stream'
        }), name + ".xlsx")
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    }


  },
    /**
   * 将文件以表格形式导出为pdf,并下载里里面的附件
   * @param title  导出pdf标题
   * @param fileList 附件列表
   * @param idStr 导出id
   * @hiddenDoms array 需要隐藏的dom className
   * @printDom string 需要打印的dom  className
   */
  getPdfbytable(title, fileList, idStr = 'app', backCode = "A08462002", biaoti, self,hiddenDoms,printDom) {
    self.$confirm('您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。', "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        //解决隐藏Dom内容过长，显示问题
        document.querySelector('.shoucangTable').style.display='table';
        try{
        var shoucangHeight=document.getElementsByClassName('shoucangTable')[0].clientHeight;
        document.querySelector('#' + idStr).style.height=shoucangHeight+'px';
        }catch(e){
          var shoucangHeight=0;
        }
        let scrollY=window.pageYOffset>$('.el-scrollbar__wrap').scrollTop()?window.pageYOffset:$('.el-scrollbar__wrap').scrollTop();
        html2Canvas(document.querySelector('#' + idStr), {
          scale: 1,
          logging: false,
          useCORS: true,
          allowTaint: true,
          scrollX: 0,
          scrollY: -scrollY,
          ignoreElements: (element) => {
            /*遍历每个节点*/
            //console.log(element);
            //删除不渲染的节点,
            for (let i=0;i<hiddenDoms.length;i++){
              if (element.className.indexOf(hiddenDoms[i]) != -1) {
              return true;
            }
            }

          }
        }).then(function (canvas) {
          let contentWidth = canvas.width
          let contentHeight =shoucangHeight< canvas.height?canvas.height:shoucangHeight;
          let pageHeight = contentWidth / 592.28 * 841.89//a4
          let leftHeight = contentHeight
          let position = 0
          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', 'a4')
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          PDF.save(title + '.pdf')
          document.querySelector('.shoucangTable').style.display='none';
          document.querySelector('#' + idStr).style.height='auto'
        })
        if (fileList && fileList.length)
          fileList.forEach(item => {
            this.downFile(item, backCode, title, biaoti, self)
          })

      })
      .catch(() => {

      });

  },
  /**
   * 将文件导出为pdf,并下载里里面的附件
   * @param title  导出pdf标题
   * @param fileList 附件列表
   * @param idStr 导出id
   */
  getPdfforBianhan(title, fileList, idStr = 'app', backCode = "A08462002", biaoti, self) {
    self.$confirm('您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。', "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        html2Canvas(document.querySelector('#' + idStr), {
          // height: document.querySelector('#' + idStr).clientHeight,
          // scrollY: 0,
          // scrollX: 0,
          scale: 1,
          logging: false,
          useCORS: true,
          allowTaint: true,
          // canvas:'',
          ignoreElements:(element) => {
            /*遍历每个节点*/
            //console.log(element);
            //删除不渲染的节点,
            if (element.className.indexOf('headerClick') != -1 ||
              element.className.indexOf('bank_dispach_side_nav')!=-1||
              element.className.indexOf('edui-editor-iframeholder')!=-1) {
              return true;
            }
          }
        }).then(function (canvas) {
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          let pageHeight = contentWidth / 592.28 * 841.89
          let leftHeight = contentHeight
          let position = 0
          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', 'a4')
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          PDF.save(title + '.pdf')
        })
        if (fileList && fileList.length)
          fileList.forEach(item => {
            this.downFile(item, backCode, title, biaoti, self)
          })
      })
      .catch(() => {

      });

  },

  /**
   * 将文件导出为pdf,并下载里里面的附件
   * @param title  导出pdf标题
   * @param fileList 附件列表
   * @param idStr 导出id
   */
  getPdf(title, fileList, idStr = 'app', backCode = "A08462002", biaoti, self) {
    self.$confirm('您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。', "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        // initCanvas.initCanvasDom()

        let dom = document.querySelector('#' + idStr)
        
        // solve textarea line feed and overflow widh jspdf
        function insertAfter(new_item, item) {
          item.parentNode.insertBefore(new_item, item.nextSibling)
        }
        let textareas = dom.getElementsByTagName('textarea')
        let _textareas = document.getElementsByClassName('_textarea')
        if(_textareas.length) {
          for(let i = 0; i < textareas.length; i++) {
            textareas[i].style.display = 'none'            
            _textareas[i].style.display = 'block'
          } 
        } else {
          if(textareas.length) {
            for(let i = 0;  i < textareas.length; i++) {
              // textareas[i].value = textareas[i].value.replace(/\n/g, "<br/>")
              textareas[i].style.display = 'none'
              let disabled = textareas[i].getAttribute('disabled')
              let _textarea = document.createElement('div')
              _textarea.className = '_textarea'
              let _style = `
                resize: none;
                padding: 5px 15px;
                min-height: 80px;
                line-height: 1.5;
                box-sizing: border-box;
                width: 100%;
                font-size: inherit;
                color: #606266;
                background-color: #FFF;
                border: 1px solid #DCDFE6;
                border-radius: 4px;`
              _textarea.style = disabled === 'disabled' ? _style + 'background-color: #e4e7ed52;' : _style
              let text = textareas[i].value.replace(/\n/g, ";")
              let textArr = text.split(';')
              let _html = ''
              if(textArr[0] == '') {
                let placeholder = textareas[i].getAttribute('placeholder') || ''
                _html = `<p style="line-height: 1.5;">${placeholder}</p>`
              } else {
                for(let a = 0; a < textArr.length; a++) {
                  _html += `<p style="line-height: 1.5;">${textArr[a]}</p>`
                }
              }
              
              _textarea.innerHTML = _html
              insertAfter(_textarea, textareas[i])
            }       
          }
        }
        
        // solve scroll area with hidden auto height
        let treeW = document.getElementsByClassName('tree_w')
        if(treeW[0]) {
          treeW[0].style.height = 'auto'
        }
        // console.log(dom)

        // solve problem document srcoll make create canvas count height error
        window.scrollTo(0, 0)
        console.log(dom)
        // document.getElementsByTagName('textarea')[0].value.replace(/\n/gm, "<br/>")
        html2Canvas(dom, {
          allowTaint: true
        }).then(function (canvas) {
          // console.log(canvas)
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          let pageHeight = contentWidth / 592.28 * 841.89
          let leftHeight = contentHeight
          let position = 0
          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', 'a4')
          // console.log(leftHeight < pageHeight)
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              console.log(position, imgHeight)
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          PDF.save(title + '.pdf')
          // reBackDom()   
          let _textareas = document.getElementsByClassName('_textarea')
          for(let i = 0; i < textareas.length; i++) {
            textareas[i].style.display = 'block'            
            _textareas[i].style.display = 'none'
          }
          if(treeW[0]) {
            treeW[0].style.height = '200px'
          }
        })
        if (fileList && fileList.length)
          fileList.forEach(item => {
            this.downFile(item, backCode, title, biaoti, self)
          })
      })
      .catch(() => {

      });

  },

  /**
   * 下载文件
   * @param file
   */
  downFile(file, backCode, title, biaoti, self) {
    let bank_doDownloadFile = {
      function: "doDownloadFile"
    };
    let docNum = file.fileName ? file.fileName.split(".").length : 0;
    let docType = docNum ? '.' + file.fileName.split(".")[docNum - 1] : '.doc';
    let zhengWenName = file.id ? file.fileName : title + biaoti + docType; //正文 （文号+标题）
    bank_doDownloadFile.fileName = file.fileName;
    bank_doDownloadFile.filePath = file.filePath;
    http.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), backCode).then(res => {
      if (res && res.success) {
        downLoadFileReName((http.getEnvState() ? location.origin : "") + "/ecpweb/getLocalFile.action?relativePath=" + res.filePath + "&fileName=" + res.fileName, zhengWenName);
      } else {
        self.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "下载失败",
          duration: 500
        });
      }
    });
  },
  /**
   * 查询到处数据
   */
  exportExce1l(name, id = "#table", hasstyle, hastitle) {
    if (!!hasstyle) {

      var xlsxParam = {
        raw: true
      }; // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(document.querySelector(id), xlsxParam)
      wb.Sheets["Sheet1"]["!cols"] = [{//表格单元格宽度
        wpx: 450
      }];

      if (!!hastitle) {
        wb.Sheets["Sheet1"]["!merges"] = [{
          //合并单元格 index都从0开始
          s: {//s开始
            c: 0,//开始行
            r: 0//开始列
          },

          e: {//e结束
            c: 1,//结束行
            r: 0//结束列
          }
        }]
      }

      wb.Sheets["Sheet1"]["A1"]["s"] = {
        //表格单元格样式
        font: {
          sz: 14,
          color: {
            grey: '#333333'
          },
          alignment: {
            horizonal: "center",
            vertical: "center",
            wrap_text: true
          }
        }
      }
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      })
      function s2ab(s) {
        // 字符串转ArrayBuffer
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }

      try {
        FileSaver.saveAs(new Blob([s2ab(wbout)], {
          type: 'application/octet-stream'
        }), name + ".xlsx")
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    } else {
      var xlsxParam = {
        raw: true
      } // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(document.querySelector(id), xlsxParam)

      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(new Blob([wbout], {
          type: 'application/octet-stream'
        }), name + ".xlsx")
      } catch (e) {
        if (typeof console !== 'undefined') {
        }
      }
      return wbout
    }
  },
  /**
   * 便函收藏
   * @param id  表单id
   * @param dataType  状态 zf cb cy
   * @param numYear 分库分表字段-编号年份
   */
  collect(self, id, dataType, dataCyType,numYear){
    self.$confirm('您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。', "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      self.$api.bianhan.shouCang({ id: id, dataType: dataType, dataCyType: dataCyType,numYear:numYear}).then(res => {
        let file = res
        let bank_doDownloadFile = {function: "doDownloadFile"}
        bank_doDownloadFile.fileName = file.fileName;
        bank_doDownloadFile.filePath = file.filePath;
        http.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), self.$businessCode.fawglfj).then(res => {
          if (res) {
              if (res && res.success) {
                  downLoadFileReName((http.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                      res.filePath +
                      "&fileName=" +
                      res.fileName, file.fileName);
              } else {
                self.$message({
                      type: "error",
                      showClose: true,
                      offset: 400,
                      message: "下载失败",
                      duration: 500
                  });
              }
          }
        })
      })
    }).catch(() => {
      //取消
    })
  }
}


