/**
 * create by cx
 * 类注释：
 * 备注：正文 pdf查看
 */
export default {
  mounted() {
      let beginTime = 0; //开始时间
      let differTime = 0; //时间差
      window.clearIdINFO = this;
      window.onunload = () => {
        differTime = new Date().getTime() - beginTime;
        if (differTime <= 5) {
          //关闭页面
          this.handleSetLoacl();
        }
      };
      window.onbeforeunload = () => {
        beginTime = new Date().getTime();
        localStorage.setItem(window.clearIdINFO.$route.query.id||window.clearIdINFO.fromdata.id, window.clearIdINFO.$route.query.id||window.clearIdINFO.fromdata.id);
        window.clearIdINFO.handleSetLoacl();
        setTimeout(()=>{
          getFormId(null,null,this.$route.query.id||(window.clearIdINFO.fromdata&&window.clearIdINFO.fromdata.id));
        },900)
      };
      setTimeout(()=>{
        getFormId(null,null,this.$route.query.id||(window.clearIdINFO.fromdata&&window.clearIdINFO.fromdata.id));
      },900)
  },
  methods: {
      //title 文件标题 documentCode 文件字号 fileName文件名称(一串随机数字) 附件预览走此方法
      viewDraftFile(fileName,filePath,fwcode,title,documentCode){
          let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx"];
          let openFileType = [".pdf",".jpg",".jpeg",".png"];
          let openPlugin = false;
          let openPage = false;
          let bank_doDownloadFile = {
              function: "doDownloadFile",
              fileName: fileName,
              filePath: filePath
            }
          //增加文件名处理 去除文件名格式 
          let filesNameArray =  fileName.split(".")||[];
          let saveName = "";//不带格式的名称
          if(filesNameArray.length>1){
            filesNameArray = filesNameArray.filter((n,i)=>{
              return i<filesNameArray.length-1;
            })
          }
          saveName = filesNameArray.join(".");
          if(title){
            let str = "";
            if(documentCode){
              str =documentCode + title
            }else{
              str = title
            }
            saveName = str;
          }
          this.$post
            .postData(
              "doDownloadFile",
              JSON.stringify(bank_doDownloadFile),
              fwcode
            )
            .then(res => {
              if (res) {
                if (res && res.success) {
                  fileType.map(item => {
                    if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                      openPlugin = true;
                    }
                  });
                  if (openPlugin) {
                    this.zhengWenState = 0;
                    this.doDraft(res,saveName);
                  } else {
                    //pdf jpg 浏览器打开
                    openFileType.map(item => {
                      if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                        openPage = true;
                      }
                    });
                    if (openPage) {
                      window.open((this.$post.getEnvState()
                        ? location.origin
                        : "http://localhost:8080") +
                        "/ecpweb/getLocalFile.action?relativePath=" +
                        res.filePath +
                        "&fileName=" +
                        res.fileName +
                        "&openFile=true","_blank")
                    }else{
                      downLoadFileReName(
                      (this.$post.getEnvState()
                        ? location.origin
                        : "http://localhost:8080") +
                        "/ecpweb/getLocalFile.action?relativePath=" +
                        res.filePath +
                        "&fileName=" +
                        res.fileName +
                        "&openFile=true",
                        fileName)
                    }

                  }
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "后端获取文件失败",
                    duration: 1500
                  });
                }
              }
            });
      },
      handleSetLoacl() {
        let that = this;
        let transId = that.$route.query.id||(that.fromdata && that.fromdata.id)||(that.formData && that.formData.id);//表单id
        let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
        if (routeId.length>0&&routeId.includes(transId)&&transId) {
          routeId.splice(routeId.findIndex(item => item==transId), 1);
          localStorage.setItem('routeIdList', JSON.stringify(routeId));
        }
      }
  }
}
