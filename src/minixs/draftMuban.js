/**
 * 
 */
export default {
  data() {
    return {
      fileInfoOfMuBan: {
        fileName: '',
        filePath: ''
      },
      fileIdOfMuBan: '',//模板文件id
    }
  },
  methods: {
    queryOfMuBan() {
      this.$api.setSysConfig.sysText({}).then((res) => {
        if (res) {
          this.fileIdOfMuBan = res.data && res.data[0].id
          this.getListOfMuBan();
        }
      })
    },
    getListOfMuBan() {
      this.$api.setSysConfig.getTextemList(
        {
          id: this.fileIdOfMuBan,
        }).then((res) => {
          if (res) {
            var downFileInfo = {
              function: "doDownloadFile",
              fileName: "",
              filePath: ""
            };
            downFileInfo.fileName = res.data&&res.data[0].fileName;
            downFileInfo.filePath = res.data&&res.data[0].filePath;
            this.$post
              .postData(
                "doDownloadFile",
                JSON.stringify(downFileInfo),
                this.$businessCode.fawglfj
              )
              .then(res => {
                if (res && res.success) {
                  this.fileInfoOfMuBan.filePath = res.filePath;
                  this.fileInfoOfMuBan.fileName = res.fileName;
                } 
              });
          } 
        })
    },
    
  }
}