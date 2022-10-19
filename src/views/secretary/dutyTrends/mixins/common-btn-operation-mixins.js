
/** @description: 公共按钮操作混入 */
import exportTable from "@/minixs/exportTable";
import shiwuLineWord from "@/minixs/shiwuLineWord"
export default {
    name: "commonBtnOperationMixins",
    mixins: [shiwuLineWord],
    data() {
    },
    methods: {
      /** @description: 收藏 功能 */
      doEnshrine(documentNumber, fileList, idToRender,title) {
        exportTable.getPdf(documentNumber, fileList, idToRender, this.$businessCode.msgzfj, title, this)
      },
      /** @description: 操作指南 功能 */
      downloadOperationGuide() {
        this.handBook('MSGZ');
      },
      /** @description: 使用金格插件打开文档 */
      openDocumentWithGoldCellPlugin(bizId, fileInfo, operateMode, isNeedCleanDocument, sourceRouteName, formData) {
        const { filePath, fileName } = fileInfo || {}
        console.log(formData, '获取formData')
        // {
        //   remarkIn: this.formData1.remarkIn,
        //   qfIdeaIn: this.formData1.qfIdeaIn
        // }
        console.log('openDocumentWithGoldCellPlugin>filePath, fileName', filePath, fileName)
        let bank_doDownloadFile = {function: "doDownloadFile"}
        bank_doDownloadFile.fileName = fileName;
        bank_doDownloadFile.filePath = filePath;

        this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
          .then(res => {
            if (res && res.success) {
              console.log(res,'openDocumentWithGoldCellPlugin>获取res')
              if (res && res.success) {
                const { filePath, fileName } = res || {}
                console.log('openDocumentWithGoldCellPlugin>filePath, fileName', filePath, fileName)
                // let data = this.$router.resolve({
                let path = getMachineType() ? "/openAndSave_WordHK" : "openAndSave_Wps_Tansun";
                let data = this.$router.resolve({
                  path: path,
                  query: {
                    /** @description: 来源路由名 据此从详情页中导航回来*/
                    sourceRouteName,
                    tanSun: '4',
                    state: "viewFile",
                    /** @description: 业务Id */
                    id: bizId,
                    /** @description: “0”：不可编辑；“1”：可以编辑，无痕迹；“2”：可以编辑，有痕迹，无修订。 */
                    zhengWenState: operateMode || '0',
                    JYcode: "A0846C002",
                    relativePath: filePath,
                    fileName: fileName,
                    qfIdeaIn: formData.qfIdeaIn,
                    remarkIn: formData.remarkIn,
                    tmpFilePath: filePath,
                    tmpFileName: fileName,
                    multiTenancyId: "000076767qwq0",
                    isDinggao:3,
                    cleanDraftFlag: isNeedCleanDocument,
                    saveNameAndNumber: formData.title
                  }, 
                  params: {
                    /** @description: 存放跳转前的表单数据 */
                    formData: this.deepCopy(formData || {})
                  }
                });
                this.$forceUpdate()
                var one = data.href.split('?')[0]
                var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
                window.open(newPath, "_blank");
              } else {
                this.$message({
                  type: 'error',
                  showClose: true,
                  offset: 400,
                  message: '下载失败',
                  duration: 500,
                })
              }
            }
          })
      },
      /** @description: 金格返回后处理逻辑 处理成功 返回true, 否则返回false */
      processLogicAfterQuitFromGoldCell(formData) {

        console.log(formData,"formData")

        console.log(this.dataFromParams('formData'),"this.dataFromParams('formData')")

        const formDataFromGoldCell = this.dataFromParams('formData')
        
        console.log('formDataFromGoldCell515', formDataFromGoldCell)
        const isFromGoldCell = !!formDataFromGoldCell && Object.keys(formDataFromGoldCell).length > 0
        if(isFromGoldCell) {
          Object.assign(formData, formDataFromGoldCell)
          return true
        } else {
          return false
        }
      }
    }
}