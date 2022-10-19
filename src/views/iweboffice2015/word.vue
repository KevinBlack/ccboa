<template>
  <div>
    <wordOffice :officeConfig="officeConfig"></wordOffice>
  </div>
</template>
<script>
    import wordOffice from '@/components/office/word'
    import { mapGetters } from "vuex";
    export default {
        components:{
            wordOffice,
        },
        computed: {
          ...mapGetters(["fawenInfo", "signquoteInfo","shouwenInfo"]),
           nameForSave() {
              let name = '';
              let transCode = this.$route.query.JYcode;
              let newName = this.$route.query.saveSpecialFileName;
              /**
               * 正文标题字段  saveSpecialFileName
               */
              if(newName){
                return newName;
              }
              if(transCode == this.$businessCode.fawglfj){
                if(this.fawenInfo){
                  if(this.fawenInfo['文号']){
                    name += this.fawenInfo['文号'];
                  }
                  name += this.fawenInfo['标题'];
                }
              }else if(this.$route.query.JYcode == this.$businessCode.qbglfj){
                if(this.signquoteInfo){
                  if(this.signquoteInfo['文号']){
                   name += this.signquoteInfo['文号'];
                 }
                 name += this.signquoteInfo['标题'];
                }
              }
              return name;
            },
        },
        data() {
            return {
                sysFlag:'',          //系统标示
                officeConfig:{
                    saveName:'',     //保存时名称
                    saveCleanFile:'',//修改带痕
                    stepsNowName:'',//当前处理环节
                    processInstId:'',//流程参数
                    cleanDraftFlag:'',
                    isHasRedHead:'',//发文是否套红操作
                    taoHongFlag:'',//是否套红操作
                    pageFlag:'',//页面标示 签报或者发文页面 用于套红
                    saveServlet:"doHandleMainWord",//上传接口名
                    serverUrl:"",//后端ip
                    formId:'',//表单id
                    flowTranId:'',//流程交易线id
                    fwTranId:'',// 交易线id
                    relativePath:'',//相对文件路径
                    fileName:'',//文件名称
                    servletName:'',//
                    filePathTh:'',//套红文件路径
                    fileNameTh:'',//套红文件模板
                    EditType:"",//“0”：不可编辑；“1”：可以编辑，无痕迹；“2”：可以编辑，有痕迹，无修订。
                    ShowMenu:0,	// 设置是否显示整个菜单 "1": 显示菜单 "0": 不显示菜单
                    ShowToolBar:0,//// 0 : 自定义工具栏=false, Office工具栏=true;// 1 : 自定义工具栏=true,  Office工具栏=true;
                        // 2 : 自定义工具栏=false, Office工具栏=false;
                        // 3 : 自定义工具栏=true,  Office工具栏=false;
                    btns:{
                        isModifyFlag:true,//是否修改
                        multiPartWord:true,//multiPart打开
                        openInUrl:true,//url打开
                        openInServlet:true,//servlet打开
                        SaveDocument:true,//保存文档到服务器
                        WebOpenLocal:true,//url打开
                        WebSaveLocal:true,//url打开
                        WebUseTemplate:true,//套红
                        WebOpenPrint:true,//打印
                        WebSetRevision:true,//显示痕迹
                        ClearRevisions:true,//清除痕迹
                        WebGetDocumentCont:true,//获取文档内容
                        CreateFile:true,//新建文档
                    },
                    showBtns:true,
                    formState:'',//处理单标示 办结 已办
                    tanSun:{default:'',type:String},
                    isnewPage:{default:false,type:Boolean},//是否是新的请假单页面
                    unitId:{default:'',type:String},
                    uniondept:{default:'',type:String},//联合发文部门
                    isZengFa:{default:false,type:Boolean},
                    isQC:{default:'0',type:String},
                }
            }
        },
        created() {
          this.officeConfig.formState = this.$route.query.formState;
          this.officeConfig.stepsNowName = this.$route.query.stepsNowName;
          this.officeConfig.formId = this.$route.query.id;
          this.officeConfig.processInstId = this.$route.query.processInstId;
          this.officeConfig.EditType = this.$route.query.zhengWenState;
          this.officeConfig.flowTranId =  this.$route.query.flowTranId;
          this.officeConfig.fwTranId = this.$route.query.JYcode;
          this.officeConfig.multiTenancyId =  this.$route.query.multiTenancyId;
          this.officeConfig.relativePath =  this.$route.query.relativePath;//相对文件路径
          this.officeConfig.fileName =  this.$route.query.fileName;//文件名称
          this.officeConfig.filePathTh = this.$route.query.tmpFilePath;//套红文件路径
          this.officeConfig.fileNameTh = this.$route.query.tmpFileName;//套红文件名称
          this.officeConfig.pageFlag = this.$route.query.pageFlag;//页面标示 签报或者发文页面 用于套红
          this.officeConfig.cleanDraftFlag =  this.$route.query.cleanDraftFlag;
          this.officeConfig.showBtns = this.$route.query.showBtns===undefined||this.$route.query.showBtns!='false'?true:false;
          this.officeConfig.taoHongFlag = this.$route.query.taoHongFlag?this.$route.query.taoHongFlag:false;
          this.officeConfig.isHasRedHead = this.$route.query.isHasRedHead?this.$route.query.isHasRedHead:false;//发文套红 标示
          this.officeConfig.tanSun=this.$route.query.tanSun;
          this.officeConfig.saveCleanFile=this.$route.query.saveCleanFile;//修改带痕迹正文
          this.officeConfig.saveName = this.nameForSave;//保存时文件名
          this.officeConfig.isnewPage = !!this.$route.query.isnewPage?this.$route.query.isnewPage:false;//保存时文件名
          this.officeConfig.unitId = this.$route.query.unitId;
          this.officeConfig.isZengFa = this.$route.query.isZengFa;
          this.officeConfig.isQC = this.$route.query.isQC===undefined||this.$route.query.showBtns!='1'?false:true;
          this.officeConfig.maindept = this.$route.query.maindept;
          this.officeConfig.uniondept = this.$route.query.uniondept;
        }
    }
</script>
