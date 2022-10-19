import exportTable from "@/minixs/exportTable";
export default {
    data () {
      return { }
    },
    methods: {
      // 收藏
      collect(val,id, unitId) {
        this.$confirm("您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$post
            .postData(
              "collectionForHtml",
              JSON.stringify({
                function: "collectionForHtml",
                id: id,
                flag: val,
                unitId: unitId
              }),
              this.$businessCode.fawgl
            )
            .then(res => {
              if (res.success) {
                this.downFile(res.data)
              } else {
                this.$message({
                  type: "error",
                  offset: 100,
                  showClose: true,
                  message: res.message,
                  duation: 1500
                });
                return;
              }
            })
        }).catch(() => {
          return;
        })
        
        // 老版收藏
        // let that = this;
        // let shiwutitle = this.fromdata.documentNo;//字号
        // let draftInfo = this.fromdata.filePath?[].concat({fileName:this.fromdata.fileName,filePath:this.fromdata.filePath},this.fromdata.attchmentFileInfo):this.fromdata.attchmentFileInfo;//收藏时下载正文
        // exportTable.getPdf(
        //   shiwutitle,
        //   draftInfo,
        //   id,
        //   this.$businessCode.fawglfj,
        //   this.fromdata.title,//标题
        //   that
        // );
      }
    }
  }