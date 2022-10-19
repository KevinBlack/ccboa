<template>
  <div class="special_s">
    <el-dialog
      v-dialogDrag
      :title="dialogTit"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="cancelSetDialog"
      width="50%"
    >
      <uploadMultFiles
        ref="uploadComponent"
        :specialDialog="true"
        @initsearch="searchInitData"
        :uploadConfig="uploadConfig"
      ></uploadMultFiles>
      <div>
        <filesTable
          ref="fileInfoTable"
          size="medium"
          :isIndex="false"
          :isHandle="false"
          :isSingelCheck="true"
          :tableData="tableFileData"
          :tableCols="tableFileCols"
          @handleTemplateRadio="handleTemplateRadio"
          @cellClick="cellClick"
          v-loading="tableLoading"
        ></filesTable>
      </div>
       <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSetDialog">取 消</el-button>
        <el-button type="primary" @click="saveSetDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadMultFiles from "@/components/uploadFile/uploadMultFiles";
import filesTable from "@/components/table/fileTable";
const filesForData = [
  { label: "附件名称", prop: "DOCNAME", align: "left" },
  { label: "操作", prop: "COMMAND", align: "center" , width: '96px',type:'Button', 
  btnList: [{
    label: '选择',
    type: 'primary',
    style: {
      'padding': '4px',
    'width': '32px',
    'margin-right':'2px',
    'margin-left': 0,
    }
  },{
    label: '删除',
    type: 'primary',
    style: {
      'padding': '4px',
    'width': '32px',
    'margin-left': 0,
    }
  }
  ]},
  { label: "发送单位列表", prop: "SENDPEOP", align: "left" }
];
export default {
  components: {
    uploadMultFiles,
    filesTable
  },
  props: {
    treeTradeCode: {
      default: "A08462023",
      type: String
    },
    dialogTit: {
      default: "特殊发送",
      type: String
    },
    dialogState: Boolean,
  },
  data() {
    return {
      fileOfNum:'',
      tableLoading: false,
      dialogVisible: false,
      nowCheckList: [],
      uploadConfig: {
        url:'uploadFiles',
        treeTradeCode: "",
        width: "auto",
        sendObjData:[],
        uploadInfo:[],
        sendObjSpecialFile:[]
      },
      tableFileData: [],
      tableFileCols: filesForData
    };
  },
  mounted() {
    //选择人员 or 删除
    this.tableFileCols[1].btnList[0].handle = this.selectPeopForFile;
    this.tableFileCols[1].btnList[1].handle = this.deletPeopForFile;
  },
  methods: {
    handleTemplateRadio(row,n){
      this.fileOfNum = n;
      this.$emit('clearNowCheck');
    },
    deletPeopForFile(n) {
       this.$confirm("确认删除当前特殊发送附件信息？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.tableFileData.splice(this.fileOfNum,1);
          this.$refs.fileInfoTable.resetRadioInfo();
          this.$refs.uploadComponent.deletSendFile(this.fileOfNum);//删除附件信息
          this.$emit('deletSendInfo',this.fileOfNum);//删除发送信息
          return;
        })
        .catch(() => {
          return;
        });
    },
    selectPeopForFile(n) {
      //n.PEOPFLAG//选择无附件人员
      this.seletNowFiles(this.fileOfNum,n.PEOPFLAG);
    },
    cellClick() {},
    //取消发送
    cancelSetDialog() {
      this.tableFileData.splice(0);
      this.$emit("newSendToggle", false);
    },
    //保存并关闭
    saveSetDialog() {
      let filesErr = false;//附件无发送单位时；
      let nofilesErr = false;//无附件 无发送单位时；
      let erroInfo = ""; //错误提示
      if(!this.tableFileData.length){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: '请先上传附件！',
          duration: 1500
        });
        return;
      }
       this.tableFileData.map((n)=>{
         if(!n.SENDPEOP && !n.PEOPFLAG){
           filesErr = true;
           erroInfo = "还有附件没有选择发送单位！";
         }
         if(!n.SENDPEOP && n.PEOPFLAG){
           nofilesErr = true;
           if(!filesErr){
             erroInfo = "请选择无附件的发送单位！";
           }
         }
       })
      if(filesErr || (this.tableFileData.length==1&&nofilesErr)){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: erroInfo,
          duration: 1500
        });
        return;
      }
      
      this.$emit(
        "newSendToggle",
        'save',
        this.tableFileData,
      );
    },
    searchInitData(file) {//上传成功查询
      let len = this.tableFileData.length;
       if(!len){
        this.tableFileData.push({
          DOCNAME:file.name,
          fileId:file.fileId
        })
        //有附件时增加 无附件选项
        this.$set(this.tableFileData,this.fileOfNum+1,{
          DOCNAME: "无附件",
          PEOPFLAG: 'nofile',
          fileId:'nofile'
        });
      }else{
         this.tableFileData.splice(len-1,0,{
          DOCNAME:file.name,
          fileId:file.fileId
        })
      }
    },
    setSendPeopData(data){//选择附件对应发送人员
      let copyData = {};//data {deptIds:'',deptNames:''}
      let id = [];
      let name = [];
      copyData = deepClone(this.tableFileData[this.fileOfNum]);
      if(data&&data.length){
        data.map((n)=>{
          id.push(n.deptIds);
          name.push(n.deptNames);
        })
      }
      copyData.SENDPEOP = name.join(',');
      copyData.SENDPEOPID = id.join(',');
      this.$set(this.tableFileData,this.fileOfNum,copyData);
    },
    seletNowFiles(num,flag) {
      // 校验
      // this.$emit('backbankmain','sendObj','needBackShow',num)
      this.$emit('handleSendObj',num,flag)
    },
  },
  created() {
    this.uploadConfig.treeTradeCode = this.$businessCode.fawgl;
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfig.id =  this.$route.query.id;
  },
  watch: {
    dialogState(newv, oldv) {
      if (!newv) {
        this.tableFileData.splice(0)
      }
      this.dialogVisible = newv;
      this.fileOfNum = "";
    }
  }
};
</script>
<style  lang="less" scoped>
</style>
