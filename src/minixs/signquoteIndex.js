import exportTable from "@/minixs/exportTable";
// 点收藏的时候传的参数1.id  2.multiTenancyId 3.flag
// 电子签报主表单flag 传qianbao_sz   实物传qianbao_sw  
// 会签传qianbao_huiqian  协办传qianbao_xieban    审批行传 qianbao_shenpi
// 请示行传   qianbao_qingshi 
export default {
    data () {
      return { 
        isNewGd:false,
      }
    },
    methods: {
      // 收藏
      collect(val,id,multiTenancyId, unitId) {
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
              multiTenancyId:multiTenancyId,
              flag: val,
              unitId
            }),
            this.$businessCode.qbgl
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
      },
      collectDown(val,id,multiTenancyId, unitId) {
        this.$post
          .postData(
            "collectionForHtml",
            JSON.stringify({
              function: "collectionForHtml",
              id: id,
              multiTenancyId:multiTenancyId,
              flag: val,
              unitId
            }),
            this.$businessCode.qbgl
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
      },
      //区块链归档 按钮控制 非跨行、请示行、实物
      isNewGdBtn(){
        this.$post
          .postData("getIsOpen", JSON.stringify({ function: "getIsOpen", id: "isOpenQiao" }),this.$businessCode.qbgl)
          .then(res => {
            if(res.success && res.data){
              this.isNewGd = res.data.value == 0 ? false : true ;
            }
          }).catch(err => {
            console.log(err);
          });
      }
    }
  }