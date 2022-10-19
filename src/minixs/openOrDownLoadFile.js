/**
 * create by zx on 2020/9/21 10:07
 * 类注释：文档在线预览
 * 备注：
 */
import http from "../http/http";

export default {
  methods: {
    /**
     * 在线预览
     * @param file
     */
    viewFile(file) {
      let fileType = ['.doc', '.docx', '.wps', '.xls', '.xlsx', '.ppt'];
      let openPlugin = false;
      let bank_doDownloadFile = {function: "doDownloadFile"}
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A08462002")
        .then(res => {
          if (res) {
            if (res && res.success) {
              fileType.map((item) => {
                if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                  openPlugin = true;
                }
              })
              if (openPlugin) {
                this.doDraft(res)
              } else {
                downLoadFileReName((http.getEnvState() ? location.origin : "http://128.32.96.143:8080") + "/ecpweb/getLocalFile.action?relativePath=" + res.filePath + "&fileName=" + res.fileName, file.fileName);
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
          }
        });
    },
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          id:"21313",
          zhengWenState: 0,
          JYcode: this.$businessCode.fawglfj,
          // multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '',
          tmpFileName: fileInfo ? fileInfo.fileNameTh : '',
          tmpFilePath: fileInfo ? fileInfo.filePathTh : '',
          isHasRedHead: fileInfo && fileInfo.fileNameTh ? true : false,
          pageFlag: 'fawen',
          showBtns: false,
          // processInstId: this.fromdata.processInstId,
          // stepsNowName: this.fromdata.currentNode
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
  },
}
