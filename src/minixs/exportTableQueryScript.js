/**
 * create by zx on 2020/9/21 10:07
 * 类注释：表格导出 dpf导出
 * 备注：
 */
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import dateFormate from '@/util/filters.js'
import http from "../http/http";
import httpTansun from "@/httpTansun/http.js"
export default {    
    //每日动态稿件收藏
    ManuCollection(data, jId){
      return httpTansun.postNeedLoading('A08462031', data, jId)
    },
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
            console.log(e, wbout)
          }
        }
        return wbout
      }


    },
    /**
     * 导出到execl
     * @param name  导出文件名字
     * @param sheetsName  导出文件sheet页的名字
     * @param sheetsNameId  导出文件sheet页的ID
     * @param tableData  导出表格的数据
     * @param hasstyle 是否导出表格样式
     * @returns {*}
     */
    exportExcelSheet(name, sheetsName, sheetsNameId, tableData) {
      let arr11 = []
      sheetsNameId.forEach((item1) => {
        let exportPubnmData = tableData.filter((item) => {
          return item.drafOrgId === item1
        })
        arr11.push(exportPubnmData)
      })

      let xlsxA = {}
      sheetsName.map(function (e, i) {
        xlsxA[e] = arr11[i]
      })

      let xlsxB = {}
      sheetsName.map(function (e, i) {
        xlsxB[e] = ['drafOrgNm', 'title', 'cyStaut', 'tougaoTime', 'drafTime', 'pubTime']
      })


      let xlsxName = []
      let xlsxList = {}
      const wb = XLSX.utils.book_new()
      for (let key in xlsxA) {
        xlsxName.push(key)
        let columnHeader = xlsxB[key] // 此处是每个sheet的表头
        let temp = transferData(xlsxA[key], columnHeader, key)
        xlsxList[key] = XLSX.utils.aoa_to_sheet(temp)
        xlsxList[key]["!cols"] = [{ wch: 25 }, { wch: 60 }, { wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 20 }]
      }

      wb['SheetNames'] = xlsxName
      wb['Sheets'] = xlsxList

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

      function transferData(data, columnHeader, key) {
        var xlsxC = {}
        sheetsName.map(function (e, i) {
          xlsxC[e] = ['来稿单位', '标题', '采用情况', '收稿日期', '编辑日期', '发布日期']
        })

        let content = []
        content.push(xlsxC[key])
        data.forEach((item, index) => {
          let arr = []
          columnHeader.map((column) => {
            let list = dateFormate.date(Date.parse(new Date(item.tougaoTime)))
            item.tougaoTime = list
            arr.push(item[column])
          })
          content.push(arr)
        })
        return content
      }
    },
    /**
     * 信息刊物收藏
     * @param id  表单id
     * @param dataType  key值
     * @param hValue  接口编号2
     */
    collect(self, id, dataType, hValue){
      let jsonObj = {}
      function create(prop, val) {
        if(typeof val === "undefined") {
          delete jsonObj[prop]
        } else {
          jsonObj[prop] = val
        }
      }
      create(dataType, id)
      self.$confirm('您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(self, id, dataType, hValue)
        this.ManuCollection(jsonObj, hValue).then(res => {
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
    },
    /**
     * 印章设备相关收藏
     * @param id  表单id
     * @param dataType  key值
     */
    yzCollect(self, paramer) {
      self.$confirm('您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        self.$api.sealManage.shoucang(paramer).then(res => {
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
    },
    methods: {
      /**
       * 查看正文
       * @param bank_doDownloadFile  下载文件所需参数
       * @param id  业务id
       * @returns {*}
       */
      doDraftLook(id, bank_doDownloadFile, num) {
        console.log(id, bank_doDownloadFile)
        this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
        .then(res => {
          let path = getMachineType() ? "/openAndSave_WordHk" : "openAndSave_Wps_Tansun";
          let data = this.$router.resolve({
            path: path,
            query: {
              state: 'viewFile',
              zhengWenState: '0',
              id: id,
              relativePath: res ? res.filePath : '',
              fileName: res ? res.fileName : '',
              saveNameAndNumber: num
            },
          })
          this.$forceUpdate()
          var one = data.href.split('?')[0]
          var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
          window.open(newPath, '_blank')
        })
      }
    },
}
