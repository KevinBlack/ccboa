import http from "../http/http";

export default {
  methods: {
    //操作指南
    handBook(moudleID) {//moudleID为传入的模块ID
      console.log("-----moudleID", moudleID)
      let that = this
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: moudleID
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            console.log(res);
            let file=res.data;
            let bank_doDownloadFile = {function: "doDownloadFile"}
            bank_doDownloadFile.fileName = file.fileName;
            bank_doDownloadFile.filePath = file.filePath;

            this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
              .then(res => {
                if (res && res.success) {
                  that.shiwudoDraft(res)
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "下载失败",
                    duration: 500
                  });
                }
              })
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

    downFile(file,title,useCallbackName) {
      console.log('下载log',file,title)
      let bank_doDownloadFile = {function: "doDownloadFile"}
      bank_doDownloadFile.fileName =!!title? file.fileName+title:file.fileName;      
      bank_doDownloadFile.filePath = file.filePath;
      let reFileName=!!title? title+file.fileName:file.fileName;
      this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
        .then(res => {
          if (res && res.success) {
            downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              res.filePath +
              "&fileName=" +
              res.fileName, !!useCallbackName?res.fileName:reFileName);
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "下载失败",
              duration: 500
            });
          }
        })
    },
    /**
     * 在线预览
     * @param file
     * @param canChange
     */
    viewFile(file,canChange, name) {
      let fileType = ['.doc', '.docx', '.wps', '.xls', '.xlsx', '.ppt','DOC','DOCX','XLS','XLSX'];//金格打开
      let fileType2 = ['.pdf', 'jpg', 'jpge', 'png'];//浏览器打开
      let openPlugin = false;
      let openPlugin2 = false;
      let bank_doDownloadFile = {function: "doDownloadFile"}
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
        .then(res => {
          if (res && res.success) {
            //'.doc', '.docx', '.wps', '.xls', '.xlsx', '.ppt'使用金格控件打开
            fileType.map((item) => {
              if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                openPlugin = true;
              }
            })
            if (openPlugin) {
              this.shiwudoDraft(res,canChange,file.fileName,name)
            } else {
              //'.pdf','jpg','jpge','png'使用浏览器打开
              fileType2.map(item => {
                if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                  openPlugin2 = true
                }
              })
              if (openPlugin2) {
              const newWindow = window.open((http.getEnvState()
                  ? location.origin
                  : "http://128.32.96.143:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName +
                  "&openFile=true", "_blank")
                  newWindow.onload = () =>{
                  newWindow.document.title = file.fileName
                }
              } else {
                console.log("下载附件")
                downLoadFileReName((http.getEnvState() ? location.origin : "http://128.32.96.143:8080") + "/ecpweb/getLocalFile.action?relativePath=" + res.filePath + "&fileName=" + res.fileName, file.fileName);
              }
            }
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "后端获取文件失败",
              duration: 500
            });
          }
        })
    },
    /*
    @param canChange 是否可以修改
    */
    shiwudoDraft(fileInfo,canChange,name,name1) {
      let snum = fileInfo.fileName.lastIndexOf('.')
      let changeFile = fileInfo.fileName.substring(0, snum + 1)
      let changeType = fileInfo.fileName.substring(snum + 1).toLowerCase()
      fileInfo.fileName = changeFile + changeType;
      let Path= getMachineType() ? (!!canChange ? "/openAndSave_WordHk" : "/openAndSave_WordTs") : "openAndSave_Wps_Tansun";
      console.log("name",name)
      let saveNameAndNumberName = ""
      if(name){
         saveNameAndNumberName = name1 ? name1 : name.substring(0, name.lastIndexOf('.'))
      }
      let data = this.$router.resolve({
        //"/openAndSave_WordHk"仅打开不可修改
        path: Path,
        query: {
          state: 'viewFile',
          id: "21313",
          zhengWenState: 0,//为0不可修改
          JYcode: this.$businessCode.fawglfj,
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '',
          tmpFileName: fileInfo ? fileInfo.fileNameTh : '',
          tmpFilePath: fileInfo ? fileInfo.filePathTh : '',
          isHasRedHead: fileInfo && fileInfo.fileNameTh ? true : false,
          pageFlag: 'fawen',
          showBtns: false,
          saveNameAndNumber: saveNameAndNumberName
        }
      });
      this.$forceUpdate();
      var one = data.href.split('?')[0]
      var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
      window.open(newPath, "_blank");
    },
  },
}
