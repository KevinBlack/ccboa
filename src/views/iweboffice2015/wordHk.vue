<!--
 * @Author: your name
 * @Date: 2021-05-21 16:40:21
 * @LastEditTime: 2021-07-16 19:28:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboaweb-dev-20210528fenku\src\views\iweboffice2015\wordHk.vue
--> 
<template>
  <div>
    <wordOffice :officeConfig="officeConfig"></wordOffice>
  </div>
</template>
<script>
import wordOffice from "@/components/office/wordHk";

export default {
  components: {
    wordOffice
  },
  data() {
    return {
      officeConfig: {
        remarkIn: "", //值班动态备注
        qfIdeaIn: "", //审核意见
        jbNoStr: "", //清稿前保存的路径
        saveCleanFile: "", //修改带痕
        stepsNowName: "", //当前处理环节
        processInstId: "", //流程参数
        cleanDraftFlag: "",
        isHasRedHead: "", //发文是否套红操作
        taoHongFlag: "", //是否套红操作
        pageFlag: "", //页面标示 签报或者发文页面 用于套红
        saveServlet: "doHandleMainWord", //上传接口名
        serverUrl: "", //后端ip
        formId: "", //表单id
        flowTranId: "", //流程交易线id
        fwTranId: "", // 交易线id
        relativePath: "", //相对文件路径
        fileName: "", //文件名称
        servletName: "", //
        filePathTh: "", //套红文件路径
        fileNameTh: "", //套红文件模板
        EditType: "", //“0”：不可编辑；“1”：可以编辑，无痕迹；“2”：可以编辑，有痕迹，无修订。
        ShowMenu: 0, // 设置是否显示整个菜单 "1": 显示菜单 "0": 不显示菜单
        ShowToolBar: 0, //// 0 : 自定义工具栏=false, Office工具栏=true;// 1 : 自定义工具栏=true,  Office工具栏=true;
        saveName: "",
        isClean: "",
        isDinggao: "", //是否定稿
        // 2 : 自定义工具栏=false, Office工具栏=false;
        // 3 : 自定义工具栏=true,  Office工具栏=false;
        btns: {
          isModifyFlag: true, //是否修改
          multiPartWord: true, //multiPart打开
          openInUrl: true, //url打开
          openInServlet: true, //servlet打开
          SaveDocument: true, //保存文档到服务器
          WebOpenLocal: true, //url打开
          WebSaveLocal: true, //url打开
          WebUseTemplate: true, //套红
          WebOpenPrint: true, //打印
          WebSetRevision: true, //显示痕迹
          ClearRevisions: true, //清除痕迹
          WebGetDocumentCont: true, //获取文档内容
          CreateFile: true, //新建文档
          btnShow: "1"
        },
        showBtns: true,
        formState: "", //处理单标示 办结 已办
        tanSun: { default: "", type: String },
        isnewPage: { default: false, type: Boolean } //是否是新的请假单页面
      }
    };
  },
  created() {
    if (this.$route.query.btnShow) {
      this.officeConfig.btns.btnShow = this.$route.query.btnShow;
    }
    this.officeConfig.remarkIn = this.$route.query.remarkIn;
    this.officeConfig.qfIdeaIn = this.$route.query.qfIdeaIn;
    this.officeConfig.formState = this.$route.query.formState;
    this.officeConfig.stepsNowName = this.$route.query.stepsNowName;
    this.officeConfig.formId = this.$route.query.id;
    this.officeConfig.processInstId = this.$route.query.processInstId;
    this.officeConfig.EditType = this.$route.query.zhengWenState;
    this.officeConfig.flowTranId = this.$route.query.flowTranId;
    this.officeConfig.fwTranId = this.$route.query.JYcode;
    this.officeConfig.multiTenancyId = this.$route.query.multiTenancyId;
    this.officeConfig.relativePath = this.$route.query.relativePath; //相对文件路径
    this.officeConfig.fileName = this.$route.query.fileName; //文件名称
    this.officeConfig.filePathTh = this.$route.query.tmpFilePath; //套红文件路径
    this.officeConfig.fileNameTh = this.$route.query.tmpFileName; //套红文件名称
    this.officeConfig.pageFlag = this.$route.query.pageFlag; //页面标示 签报或者发文页面 用于套红
    this.officeConfig.cleanDraftFlag = this.$route.query.cleanDraftFlag;
    this.officeConfig.showBtns =
      this.$route.query.showBtns === undefined ||
      this.$route.query.showBtns != "false"
        ? true
        : false;
    this.officeConfig.taoHongFlag = this.$route.query.taoHongFlag
      ? this.$route.query.taoHongFlag
      : false;
    this.officeConfig.isHasRedHead = this.$route.query.isHasRedHead
      ? this.$route.query.isHasRedHead
      : false; //发文套红 标示
    this.officeConfig.tanSun = this.$route.query.tanSun;
    this.officeConfig.saveCleanFile = this.$route.query.saveCleanFile; //修改带痕迹正文
    this.officeConfig.jbNoStr = this.$route.query.jbNoStr;
    this.officeConfig.isDinggao = this.$route.query.isDinggao;
    this.officeConfig.depart = this.$route.query.depart;
    this.officeConfig.isSynthesisFormat = this.$route.query.isSynthesisFormat;
    this.officeConfig.gaojianId = this.$route.query.gaojianId;
    this.officeConfig.mainContext = this.$route.query.mainContext;
    this.officeConfig.backupTitle = this.$route.query.backupTitle;
    this.officeConfig.id = this.$route.query.id;
    this.officeConfig.saveName = this.$route.query.saveNameAndNumber;
    this.officeConfig.isClean = this.$route.query.isClean;
    this.officeConfig.isnewPage = !!this.$route.query.isnewPage
      ? this.$route.query.isnewPage
      : false; //保存时文件名
  }
};
</script>
