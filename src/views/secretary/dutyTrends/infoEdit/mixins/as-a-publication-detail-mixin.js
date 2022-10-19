/** @description: 成刊详情公共功能混入 */
import commonBtnOperationMixins from "@/views/secretary/dutyTrends/mixins/common-btn-operation-mixins.js"
import lookBody from '@/minixs/exportTableQueryScript'
export default {
  name: 'asAPublicationDetailMixin',
  mixins: [commonBtnOperationMixins, lookBody],
  data() {
    return {
      qingGao: 'false',  //清稿后
      qingGaoAfter: 'true', //清稿前
      saveCleanFile:false,
      ifView: Number,
      shiwuState: 'newFile',
      /** @description: 清稿状态 */
      cleanDraftFlag: false,
      saveChengkan:true,//区别 已经保存了 数据还是从路由带进来的  isType
      rules: {},
      /** @description: 必填控制域 */
      requiredFields: {
        tougaoren: "",
        /** @description: 投稿人 */
        lianxidianhua: "",
        /** @description: 联系电话 */
        zhubanbumen: "",
        /** @description: 主办部门 */
        binajishijian: "",
        /** @description: 编辑时间 */
        QFidea: "",
        /** @description: 审核意见 */
        Remark: "",
        /** @description: 备注 */
      },
      /** @description: 不可编辑控制域 */
      readFields: {
        tougaoren: false,
        /** @description: 投稿人 */
        lianxidianhua: false,
        /** @description: 联系电话 */
        zhubanbumen: false,
        /** @description: 主办部门 */
        binajishijian: false,
        /** @description: 编辑时间 */
        QFidea: false,
        /** @description: 审核意见 */
        Remark: false,
        /** @description: 备注 */
      },
      /** @description: 可编辑意见域 */
      editedIdeaFields: {
        QFidea: true,
        /** @description: 审核意见 */
        Remark: true,
        /** @description: 备注 */
      },
      //必填意见域
      requiredIdeaFields: {
        QFidea: false,
        /** @description: 审核意见 */
        Remark: false,
        /** @description: 备注 */
      },
      modal: false,
      topData: {},
      tableData: [],
      /** @description: 流程数据 */
      showFlowChart: false,
      /** @description: 查看流程弹框默认不显示 */

      dialogState: false,
      /** @description: 显示隐藏 */
      checkData: [],
      /** @description: 选中数据 */
      singelCheckF: true,
      /** @description: 选人单选true 多选为false */
      /** @description: 表单的值 */
      formData: {
        activityType: [],
      },
      treeData: [],
      /** @description: 树数据 */
      seletOptionsData: [],
      /** @description: 下一处理环节下拉数据 */
      offenUse: true,
      checkIds: [],
      /** @description: 选中id列表 */
      dialogType: "dosend",
      dialogTypeNow: "next",
      xxcbBxgjId: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formData1: {
        zbDept: '',
        fileNameAfter: '',
        filePathAfter: '',
      },
      formFa: {}
    }
  },
  computed: {
    /** @description: 获取机构名称 */
    formOrgName() {
      return this.formData1.draftOrganFullName || this.formData1.deptTableHeader || ''
    },
    /** @description: 表单标题 */
    formTitle() {
      return this.formOrgName + '值班动态审批单'
    }
  },
  methods: {
    /** @description: 选择发布范围 确定按钮 点击处理方法 */
    handleOnOrgsSelectOk(orgs) {
      console.log(this.formFa);
      this.formFa.editorName = this.formData1.editorName;
      this.formFa.zbDept = this.formData1.zbDept;
      this.formFa.xxcbDocId = this.formData1.xxcbDocId;
      this.formFa.xxcbBxgjId = this.getStrFromListAndSeparator(this.xxcbBxgjId);
      this.formFa.units = orgs && orgs.map(item => item.id).join(',') || []
      this.formFa.units = this.formFa.units + ',' + JSON.parse(localStorage.getItem('userInfo')).unitId
      this.formFa.title = this.formData1.title;
      this.formFa.tel = this.formData1.tel;
      this.formFa.remarkIn = this.formData1.remarkIn;
      this.formFa.remark = this.formData1.remark;
      this.formFa.auditIdea = this.formData1.qfIdea;
      this.formFa.auditIdeaIn = this.formData1.qfIdeaIn;
      this.formFa.id = this.formData1.id;
      console.log(this.formFa);
      this.$api.duty.faBu(this.formFa).then((res) => {
        if(res.msg.indexOf("/") != -1){
          this.msgArr =  res.msg.split("/")
        }else{
          this.msgData = res.msg
        }
        console.log(this.msgArr,"this.msgArr")
        console.log(this.msgData,"this.msgData")
        this.dialogVisible = true

        // this.$alert(res.msg, '发布结果', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     this.modal = false;
        //     this.$intent.closeWindow(this);
        //     this.gotoPublishedPage(this.sourceRouteNameFromQuery, {}, {}, false)
        //   }
        // })
      });
    },
    backButton(){
      this.dialogVisible = false;
      this.$intent.closeWindow(this);
    },
    toPrinting() {
      this.$print(this.$refs.printArea)
      // this.$intent.goNewPage(this, {
      //   path: "/secretaryZb",
      //   query: { data: JSON.stringify(this.formData1) },
      // }); /** @description: 跳转页面 */
    },
    /** @description: 初始化规则 */
    initRule() {
      this.rules = {
        /** @description: 投稿人 */
        editorName: [{
          required: this.requiredFields.tougaoren,
          message: "不能为空",
          trigger: "blur",
        }, ],
        /** @description: 联系电话 */
        tel: [{
          required: this.requiredFields.lianxidianhua,
          message: "不能为空",
          trigger: "blur",
        }, ],
        /** @description: 主办部门 */
        zbDept: [{
          required: this.requiredFields.zhubanbumen,
          message: "不能为空",
          trigger: "blur",
        }, ],
        /** @description: 编辑时间 */
        createDate: [{
          required: this.requiredFields.binajishijian,
          message: "不能为空",
          trigger: "blur",
        }, ],
        /** @description: 审核意见 */
        qfIdeaIn: [{
          required: this.requiredIdeaFields.QFidea,
          message: "不能为空",
          trigger: "blur",
        }, ],
        /** @description: 备注 */
        remarkIn: [{
          required: this.requiredIdeaFields.Remark,
          message: "不能为空",
          trigger: "blur",
        }, ],
      };
    },
    seeLiu() {
      this.showFlowChart = true;
      this.$api.duty
        .checkFlowData({
          curProcessInstId: this.formData1.workflowId
        })
        .then((res) => {
          this.tableData = res.data;
          this.$nextTick(() => {
            this.$refs.dialogLine.openDialog();
          });
        });
    },
    release() {
      this.modal = true;
    },

    writeApply() {
      this.save_btn()
      if (this.formData1.fileName) {
        this.shiwuState = 'viewFile'
        let bank_doDownloadFile = { function: 'doDownloadFile' }
        bank_doDownloadFile.fileName = this.formData1.fileName
        bank_doDownloadFile.filePath = this.formData1.filePath
          this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
            .then(res => {
            if (res) {
              res.ifView = 1
              this.doDraft(res)
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                offset: 400,
                message: '下载失败',
                duration: 500,
              })
            }
          })
      } else {
        this.$message({
          message: '暂无正文模板',
          type: 'warning',
        })
      }
    },



    // writeApply(isNeedCleanDocument) {
    //   if (this.formData1.fileName) {
    //     const fileName = this.formData1.fileName;
    //     const filePath = this.formData1.filePath;
    //     this.openDocumentWithGoldCellPlugin(this.formData1.id, {
    //       filePath,
    //       fileName
    //     }, '2', !!isNeedCleanDocument, 'chengkanDetail', this.formData1)
    //   } else {
    //     this.$message.warning('无正文模板')
    //   }
    // },

       //申请跳转
       doDraft(fileInfo) {
        let path = getMachineType() ? "/openAndSave_WordHk" : "openAndSave_Wps_Tansun";
        let data = this.$router.resolve({
          path: path,
          query: {
            state: this.shiwuState,
            id: this.formData1.id,
            remarkIn:this.formData1.remarkIn,
            qfIdeaIn:this.formData1.qfIdeaIn,
            tanSun: '4',
            zhengWenState: this.ifView,
            JYcode: 'A0846C002',
            relativePath: fileInfo ? fileInfo.filePath : '',
            fileName: fileInfo ? fileInfo.fileName : '测试.doc',
            multiTenancyId: '000076767qwq0',
            showBtns: true,
            saveCleanFile: this.saveCleanFile,
            cleanDraftFlag: this.cleanDraftFlag,
            serverUrl: '128.192.221.164',
            saveNameAndNumber: this.formData1.title
          },
        })
        this.$forceUpdate()
        var one = data.href.split('?')[0]
        var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
        window.open(newPath, '_blank')
      },
    submit() {

      if (this.formData1.filePath) {
        if (!this.formData1.id) {
          this.formData1.xxcbBxgjId = this.getStrFromListAndSeparator(this.xxcbBxgjId);
          for (const i in this.submitDeptData) {
            if (this.submitDeptData[i].firstUnitName === this.formData1.zbDept) {
              this.formData1.curUserDeptId = this.submitDeptData[i].firstUnitId
            }
          }
         
          this.$api.duty.saveChengKan(this.formData1).then((res) => {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.formData1.id = res.id;
            /** @description: 完成并发送 */
            this.dialogState = true; /** @description: 打开选人弹窗 */

            this.$api.duty
              .finishSubmit({
                route: "00002",
                id: res.id
              })
              .then((res) => {
                this.seletOptionsData = res && res.list || [] /** @description: 下一处理环节赋值 */
              });
          });
        } else {
          this.dialogState = true; /** @description: 打开选人弹窗 */
          this.$api.duty
            .finishSubmit({
              route: "00002",
              id: this.formData1.id
            })
            .then((res) => {
              this.seletOptionsData = res && res.list || [] /** @description: 下一处理环节赋值 */
            });
        }
      } else {
        this.$message({
          message: "请先起草正文",
          type: "warning"
        })
      }
    },
    //  已办收回  
        GetBack(){
          console.log("已办收回")
        },
      /** @description: 处理发布收回 办结 */
      handleGetBack() {
        console.log("shouhio")
        if (typeof (this.formData1.wfeWork) === "string") {
            this.formData1.wfeWork = JSON.parse(this.formData1.wfeWork)
          }
        this.$api.duty
          .asAPublicationGetBack({
            ...this.formData1
          }).then(_ => {
            this.$message.success('收回成功')
            this.gotoPublishedPage(this.previousRouteName)
          })
      },
     /** @description: 保存 */
     save_btn(type) {
      // this.formData1.ckId = this.formData1.id;
      this.formData1.xxcbBxgjId = this.getStrFromListAndSeparator(this.xxcbBxgjId)
      if (typeof (this.formData1.wfeWork) === "string") {
        this.formData1.wfeWork = JSON.parse(this.formData1.wfeWork)
      }
      for (const i in this.submitDeptData) {
        if (this.submitDeptData[i].firstUnitName === this.formData1.zbDept) {
          this.formData1.curUserDeptId = this.submitDeptData[i].firstUnitId
        }
      }

      this.formData1.opinionList=JSON.parse(JSON.stringify(this.formData1.qfIdea));
      this.formData1.remarkList=JSON.parse(JSON.stringify(this.formData1.remark))
      
      this.$api.duty.saveChengKanForManager(this.formData1).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        console.log(this.formData1,"保存成功之后的")
        this.isDisabled = true
        if (!this.formData1.id) {
          this.formData1.id = res.id
          this.ID = res.id
        }

       if(this.dataFromQuery("isType") === "deal"){
          // 保存完跳路由
        this.$router.push({
        name: "chengkanDetail",
          query: {
            /** @description: 来源路由名 据此从详情页中导航回来*/
            sourceRouteName: this.sourceRouteNameFromQuery,
            activeName: "",
            id: this.ID,
            isType: JSON.stringify("chengkan"),
          },
          params: this.paramsDataExcludeSpecifiedAttributes()
        });
       }else{
          location.reload();
       }

      });
      },
    getPath(type) {
      console.log("qicao ")
     this.save_btn()
         /** @description: 起草正文模板地址 */
      this.$api.duty.getPath({}).then((res) => {
        if (res && res.list && res.list[0]) {
          this.saveChengkan=false
          let obj = res.list[0].attchmentFileInfo && JSON.parse(res.list[0].attchmentFileInfo)[0];
          console.log(obj);
          // this.formData1.fileName = obj.fileName;
          // this.formData1.filePath = obj.filePath;
          this.openDocumentWithGoldCellPlugin(this.formData1.id, {
            fileName: obj.fileName,
            filePath: obj.filePath,
          }, '2', false, 'chengkanDetail', this.formData1)
        } else {
          console.log(this.formData1, '获取this.formData1');
          this.$message.warning('请先配置正文模板')
        }

      });
     
    },
 lookBody(){
      let bank_doDownloadFile = { function: 'doDownloadFile' }
      bank_doDownloadFile.fileName = this.formData1.fileName
      bank_doDownloadFile.filePath = this.formData1.filePath
      let id = this.formData1.id
      this.doDraftLook(id, bank_doDownloadFile,this.formData1.title)
    },    
    buttonClick(params) {
      switch (params) {

        case "查看正文":
          this.lookBody()
          break;        case "收回":
          this.GetBack();
          break;
        case "发布收回":
          this.handleGetBack();
          break;
        case "保存":
          this.save_btn();
          break;
        case "发布":
          this.release();
          break;
        case "起草正文":
          this.getPath("0");
          break;
        case "处理正文":
          this.ifView = 1,
          this.saveCleanFile = true
          this.writeApply();
          break;
        case "完成并发送":
          this.$refs["ruleForm"].validate((valid, object)=>{
            if(valid){
              this.submit();
            }else{
              this.$message.warning('请先填写必填项')
            }
          })

          break;
        case "操作指南":
          this.downloadOperationGuide()
          break;
        case "查看流程":
          this.seeLiu();
          break;
        case "收藏":
          // const {
          //   documentNumber, title
          // } = this.formData1 || {}
          // const fileList = this.formData1.filePath && [{
          //   filePath: this.formData1.filePath,
          //   fileName: this.formData1.fileName,
          // }]
          // const idToRender = 'printArea'
          // this.doEnshrine(documentNumber || '', fileList, idToRender, title || this.formTitle)
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(()=>{
             this.$api.duty
            .collection({ id: this.formData1.id})
            .then(res => {
              this.downFile(res);
            })
          });
          break;
        case "清稿":
          this.cleanDraftFlag = true
          console.log(this.formData1)
          this.formData1.fileNameAfter = this.formData1.fileName
          this.formData1.filePathAfter = this.formData1.filePath
          this.formData1.isSynGj = '1'
          this.save_btn()
          this.writeApply(true)
          break;
        case "打印处理单":
          this.toPrinting();
          break;
      }
    },


  }
}
