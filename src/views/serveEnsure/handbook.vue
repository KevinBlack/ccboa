<!--用户手册页面   created by wanglong 2020-08-12 -->
<template>
  <div>
    <el-row>
      <el-col :span='6'>
        <span style="font-size: 14px;">功能模块：</span>
        <el-select style="width:calc(100% - 120px)" v-model="searchForm.moduleCode">
          <el-option
            key=""
            label="全部"
            value="">
          </el-option>
          <el-option
            v-for="item in moduleOptions"
            :key="item.moduleKeyWord"
            :label="item.moduleName"
            :value="item.moduleKeyWord">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span='6'>
        <span style="font-size: 14px;">文档名称：</span>
        <el-input  style="width:calc(100% - 120px)" placeholder="请输入内容" v-model="searchForm.fileTitle"></el-input>
      </el-col>
      <el-col :span='6'>
        <el-button type="primary" @click="searchFormFn">搜索</el-button>
      </el-col>
    </el-row>
     
    <el-row style="margin:20px 0 10px;"  >
      <el-button type="primary" @click="uploadHandBook" v-if="buttonShow">上传</el-button>
      <el-button type="primary" @click="batchDele" v-if="buttonShow">删除</el-button>
      <el-button type="primary" @click="edit" v-if="buttonShow">编辑</el-button>
    </el-row>
    <el-row>
      <el-col>
          <m-table
            size="medium"
            :isSelection="true"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            @select="select"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            v-loading="tableLoading"
          ></m-table>
      </el-col>
    </el-row>
    <el-dialog 
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      v-dialogDrag
      width="600px"
      height="600px"
      title="上传用户手册">
      <el-card>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="2">
            <span class="bitian">* </span>
            <label for="">资料名称:</label>
          </el-col>
          <el-col :span="20">
            <el-input  v-model="fromData.handbookVo.fileTitle"></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-bottom: 20px;">
          <el-col :span="2">
            <span class="bitian">* </span>
            <label for="">功能模块:</label>
          </el-col>
          <el-col :span="20">
            <el-select style="width:100%" placeholder="请选择" @change="moduleChange"  v-model="fromData.handbookVo.moduleName">
              <el-option
                v-for="item in options"
                :key="item.moduleKeyWord"
                :label="item.moduleName"
                :value="item.moduleName">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row>
           <el-col :span="2">
            <span class="bitian">* </span>
            <label for="">附件</label>
          </el-col>
          <!-- <el-col :span="20">
            <el-upload
              class="upload-demo"
              action="action"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">上传附件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col> -->

          <uploadFiles
            ref="uploadComponent"
            v-if="fromData.handbookVo.attchmentFileInfo.length==0 && detailsBtn"
            @preserve="preserve"
            @initsearch="sysSave"
            :uploadConfig="uploadConfig"
          ></uploadFiles>
          <!-- <el-col  :span="22">
            <el-scrollbar>
              <div
                v-for="(item,index) in fromData.handbookVo.attchmentFileInfo"
                :key="item.id"
                class="comp_list"
              >
                <template>
                  <div class="command_file">
                    <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                    <div class="btns">
                      <el-button
                        type="warning"
                        size="mini"
                        v-if="detailsBtn"
                        @click.native="deleteRow(index,item.fileId)"
                        :disabled="item.disabled"
                        round
                      >删除</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click.native="downFile(item)"
                        round
                      >下载</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </el-col> -->
          <el-col :span="18">
            <el-scrollbar>
              <div
                v-for="(item,index) in fromData.handbookVo.attchmentFileInfo"
                :key="item.id"
                class="comp_list"
              >
                <template>
                  <div class="command_file">
                    <span class="name down" :title="item.fileName" @click="viewFile(item)">{{item.fileName}}</span>
                    <div class="btns">
                      <el-button
                        type="warning"
                        size="mini"
                        v-if="detailsBtn"
                        @click.native="deleteRow(index,item.fileId)"
                        :disabled="item.disabled"
                        round
                      >删除</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click.native="downFile(item)"
                        round
                      >下载</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </el-col>
      </el-row>
      </el-card>
      <span slot="footer" class="dialog-footer" v-if="detailsBtn">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="preserve('save')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mTable from "components/table/mTable.vue";
// import upLoadFile from "components/uploadFile/uploadFile"
import uploadFiles from "@/components/uploadFile/uploadSingelFile";

export default {
  name: "DispatchFile",
  components: {
    mTable,
    uploadFiles
  },
  data() {
    return { // 上传
      obj:{},
      eqit: 0,
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: '',
        sendObjData: [],
        hasFuCheck: true, //是否有特殊发送附件选择
        sendObjSpecialFile: [], //当前操作的附件与部门序号
        checkChange: false,
        width: 'auto',
        noattachTitleCheck:true,
        newcode:''
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      fileList: [],
      dialogVisible:false,
      detailsBtn: true,
      buttonShow: false,
      options: [],
      moduleOptions: [],
      searchForm: {
        function: "getUserManualList", //待后台提供
        moduleCode:"", //文档名称
        fileTitle:"", //功能模块
        page: 1, //当前页数
        limit: 20 //每页条数
      },
      tableLoading: false,
      tableData: [],
      tableCols: [
        { label: "功能模块", prop: "moduleName", align: "center" },
        { label: "文档名称", prop: "fileTitle", align: "center" },
        // { label: "上传人", prop: "createUserName", align: "center" },
        { label: "上传时间", prop: "createTime", align: "center" },
        { label: '操作', type: 'Button', align: 'center',
          btnList: [
            {
              label: '下载',
              size: 'mini',
              type: 'default',
              icon:"el-icon-caret-bottom",
              handle: row => {
                this.downFile(row.attachments[0])
              }
            },{
              label: '查看',
              size: 'mini',
              type: 'default',
              icon:"el-icon-view",
              handle: row => {
                let fileInfo = {
                  id: row.id,
                  filePath:row.attachments[0].filePath,
                  fileName:row.attachments[0].fileName,
               }
               this.getFileInfo(this, fileInfo).then((res)=>{
                 if(res.state){
                let fileType = ['.doc','.docx','.wps','.xls','.xlsx','ppt'];
                 let openPlugin = false;
                  fileType.map((item)=>{
                    if(res.fileName.toLocaleLowerCase().indexOf(item)>-1){
                      openPlugin = true;
                    }
                  })
                  if(openPlugin){
                    this.doDraft(res)
                  }else{
                    window.open(((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                        row.attachments[0].filePath +
                                        "&fileName=" +
                                        row.attachments[0].fileName)+'&openFile=true','_blank');
                  }
                }
              })
                
              }
            },
          ]
        }
      ],
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      selectItems:[],
       //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      fromData: {
        function: "save",
        handbookVo: {
          id: '',
          attchmentFileInfo: [],
          fileTitle: '',
          moduleCode: '',
          moduleName: ''
        }
      },
    };
  },
  methods: {
    moduleChange(e){
       this.options.forEach(item => {
         if( item.moduleName == e ){
           console.log(item.moduleKeyWord)
           this.fromData.handbookVo.moduleCode = item.moduleKeyWord;
         }
      });
    },
    searchFormFn(){
      this.pagination.page = this.searchForm.page = 1;
      this.tableData = [];
      this.initData();
    },
    cancel(){
        console.log("0000")
      if( this.eqit == 0 && this.fromData.handbookVo.id != "" ){
          console.log("11`1111")
        let id = this.fromData.handbookVo.id;
        this.$post.postData(
          "deleteUserManualEntityListById", 
          JSON.stringify({id,function:"deleteUserManualEntityListById"}),
          this.$businessCode.fwbz
        ).then(res => {
         console.log("2222")
         this.dialogVisible = false;
        })
      }else{
        this.dialogVisible = false;
      }
    },
    preserve(type){
      // this.fromData.function = 'saveNormal'
      if( type == 'save' ){
        if (!this.fromData.handbookVo.fileTitle || this.fromData.handbookVo.fileTitle == "") {
          this.$message({
            type: 'error',
            message: '请输入资料名称!'
          })
          return
        }
  
        if (!this.fromData.handbookVo.moduleName || this.fromData.handbookVo.moduleName == "") {
          this.$message({
            type: 'error',
            message: '请填写功能模块!'
          })
          return
        }

        if (!this.fromData.handbookVo.attchmentFileInfo || this.fromData.handbookVo.attchmentFileInfo.length == 0) {
          this.$message({
            type: 'error',
            message: '请上传附件!'
          })
          return
        }
      }
      
      this.$post
        .postData(
          "save",
          JSON.stringify(this.fromData),
          this.$businessCode.fwbz
        )
        .then(res => {

           if (res && res.success) {
            if (type&&type!='uploadfile') {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.dialogVisible = false;
              this.initData();
              window.location.reload();
            }
            if (type === "uploadfile") {
              this.uploadConfig.id = res.id;
              this.fromData.handbookVo.id = res.id;
              this.$refs.uploadComponent.uploadFileNow();
            }

            if(!type){
               this.details(res.id)
            }
          }else{
            this.$message({
              message: res.message,
              type: "error"
            });
         }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //mock数据
    handleMock () {
      const Mock = require('mockjs')
      const count = 6;
      this.tableData=[];
      this.pagination.total = 12;
      for (let i = 0; i < count; i++) {
        this.tableData.push(Mock.mock({
          id: '@increment',
          moduleType: '@ctitle(1,4) 功能模块',
          docName: '@ctitle(5, 10)',
          uploader: '@cname',
          uploadTime:'@date(yyyy-MM-dd)',
        }))
      }
    },
    //手册下载 ----:TODO (待后台提供接口文档)
    bookDownload(row) {
      console.log("row",row);
      // return
      let doDownloadFile = {function: "doDownloadFile"}
      doDownloadFile.fileName = row.docName;
      doDownloadFile.filePath = row.docPath;
      this.$post.postData(
          "doDownloadFile",
          JSON.stringify(doDownloadFile),
          this.$businessCode.fwbzfjLoad
      ).then(res => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName, file.fileName);
            } else {
              this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "下载失败",
                  duration: 500
              });
            }
          }
      });
    },
    //手册查看----:TODO (查看页面确认)
    bookView(row) {
      console.log(row);
    },
    //手册新增  -----:TODO
    uploadHandBook(){
      this.eqit = 0;
      this.dialogVisible = true;
      this.detailsBtn = true;
      this.fromData.handbookVo.id = '';
      this.fromData.handbookVo.fileTitle = '';
      this.fromData.handbookVo.moduleCode = '';
      this.fromData.handbookVo.moduleName = '';
      this.fromData.handbookVo.attchmentFileInfo = [];
      this.uploadConfig.id = '';
      this.getOptions("2");
    },
    //批量删除 -----:TODO
    batchDele(){
      if(this.selectItems.length<1){
        this.$message.closeAll();
        this.$message({
            type: "warning",
            message: "请至少选择一条数据",
            duration: 2*1000
          });
        return;
      }
      this.$confirm("是否确定删除当前选中数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let id = this.selectItems;
          // return 
          //待后端提供接口
          this.$post.postData(
            "deleteUserManualEntityListById",
            JSON.stringify({id,function:"deleteUserManualEntityListById"}),
            this.$businessCode.fwbz
          ).then(res => {
            if (res && res.success) {
              this.selectItems=[];
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.refreshTable();
            }else{
              this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败",
              });
            }
          });

          

        }).catch(() => { });
      //调用删除接口;
      // this.$post.postData("getSendOrderList", JSON.stringify(this.searchForm), this.$businessCode.fwbz).then(res => {
      //   console.log("列表数据",res);
      //   this.tableData = res.data && res.data.rows||[];
      //   this.pagination.total = res.data&&res.data.total||0;
      // })
    },
    //字典表查询 ---:TODO
    getOptions(e){
      let findModule = {function: "findModule", state:e};
      this.$post.postData(
        "findModule",
        JSON.stringify(findModule),
        this.$businessCode.fwbz
      ).then(res => {
        if(res && res.success){
          this.moduleOptions = res.data;
          this.options = res.data;
        }
      })
    },
    //多选操作
    select(rows){
      let selectItems = [];
      rows.map(function (value, index) {
        selectItems.push(value.id)
      })
      this.selectItems = selectItems.join(',');
    },
    
    cellClick(row, column, cell, event) {
      //单行点击事件--暂不支持；
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData()
    },
    //切换每页条数
    handleSizeChange(val) {
      this.pagination.page = this.searchForm.page = 1
      this.searchForm.limit = val
      this.pagination.limit = val
      this.tableData = []
      this.initData()
    },
    refreshTable(){
      this.pagination.page = this.searchForm.page = 1
      this.initData();
    },
    // 页面初始化加载数据
    initData() {
      // this.handleMock();
      // return 
      //this.$businessCode.fwbz : A0846C019 ---服务保障业务线
      //this.$businessCode.fwbzfj : A08462020 ---服务保障附件业务线
      this.searchForm.fileTitle = this.searchForm.fileTitle.trim();
      this.$post.postData("getUserManualList", JSON.stringify(this.searchForm), this.$businessCode.fwbz).then(res => {
        console.log("列表数据",res);
        this.tableData = res.data && res.data.rows||[];
        this.pagination.total = res.data&&res.data.total||0;
      })
    },
    deleteRow(n, id) {
      let that = this;
      that.bank_deleteFileById.id = id ? id : that.fromData.handbookVo.id;
      console.log(that.fromData.handbookVo)
      that.$post
        .postData(
          "deleteFileById",
          JSON.stringify(that.bank_deleteFileById),
          that.$businessCode.fwbzfj
        )
        .then(res => {
          console.log(res);
            if (res && res.success) {
              that.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 500
              });
              that.fromData.handbookVo.attchmentFileInfo=[];
              that.uploadConfig.filesHas = that.fromData.handbookVo.attchmentFileInfo;
              that.$forceUpdate();
            } else {
              that.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "删除失败",
                duration: 500
              });
            }
        });
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fwbzfjLoad
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                    res.filePath +
                                    "&fileName=" +
                                    res.fileName, file.fileName);
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    },

    //请求文件路径
    async getFileInfo(self,thInfo) {
      var successInfo = {state:false,id:thInfo.id};
      self.bank_doDownloadFile.fileName = thInfo.fileName;
      self.bank_doDownloadFile.filePath = thInfo.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fwbzfjLoad
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          }else{
             self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端获取失败",
              duration: 500
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取失败",
            duration: 500
          });
         successInfo.state = false
        });
        return successInfo
    },

     // 编辑
    edit(){
      this.eqit = 1;
      if(this.selectItems.split(',').length != 1 || !this.selectItems){
        this.$message.closeAll();
        this.$message({
            type: "warning",
            message: "请选择一条数据进行编辑!",
            duration: 2*1000
          });
        return;
      }
      this.details(this.selectItems);
    },
    
    //正文跳转
    doDraft(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          zhengWenState:0,
          id:fileInfo?fileInfo.id:'',
          JYcode:this.$businessCode.fwbzfjLoad,
          flowTranId:this.$businessCode.fwbzfjLoad,
          fileName:fileInfo?fileInfo.fileName:'',
          relativePath:fileInfo?fileInfo.filePath:'',
          pageFlag:'fawen'
        }
      });
      window.open(data.href, "_blank");
    },
  sysSave(){
      //查询后同同步
     this.$post.postData( 
        "findById",
        JSON.stringify({id:this.fromData.handbookVo.id,function:"findById"}),
        this.$businessCode.fwbz
      ).then(res => {
        console.log(res.data,"res.data")
        this.obj={
          "function": "uploadFiles",
          "attachments":res.data.attachments,
          "handbookVo": {
              "createTime":res.data.createTime,
              "createUserCode":res.data.createUserCode,
              "createUserId":res.data.createUserId, 
              "createUserUnit":res.data.createUserUnit,
              "fileTitle":res.data.fileTitle,
              "id":res.data.id,
              "isDelete":res.data.isDelete,
              "maxRows":res.data.maxRows, 
              "moduleCode":res.data.moduleCode,
              "moduleName":res.data.moduleName, 
              "start":res.data.start, 
              "updateTime":res.data.updateTime,
              "updateUserId":res.data.updateUserId 
          }
        }
            // this.sysSave()
        if (res && res.success) {
          console.log(res,"resres")
          this.fromData.handbookVo = res.data;
          this.uploadConfig.id = res.data.id;

          this.fromData.handbookVo.attchmentFileInfo = [];
          if(res.data.attachments[0].filePath&&res.data.attachments[0].fileName){
            this.fromData.handbookVo.attchmentFileInfo.push({filePath:res.data.attachments[0].filePath,fileName:res.data.attachments[0].fileName,fileId:res.data.attachments[0].id});
          }
        }
      })

      
    },
    details(id, btnshow){
      this.dialogVisible = true;
      if( btnshow ){
        this.detailsBtn = false;
      }else{
        this.detailsBtn = true;
      }
      this.$post.postData( 
        "findById",
        JSON.stringify({id,function:"findById"}),
        this.$businessCode.fwbz
      ).then(res => {
        console.log(res.data,"res.data")
        this.obj={
          "function": "uploadFiles",
          "attachments":res.data.attachments,
          "handbookVo": {
              "createTime":res.data.createTime,
              "createUserCode":res.data.createUserCode,
              "createUserId":res.data.createUserId, 
              "createUserUnit":res.data.createUserUnit,
              "fileTitle":res.data.fileTitle,
              "id":res.data.id,
              "isDelete":res.data.isDelete,
              "maxRows":res.data.maxRows, 
              "moduleCode":res.data.moduleCode,
              "moduleName":res.data.moduleName, 
              "start":res.data.start, 
              "updateTime":res.data.updateTime,
              "updateUserId":res.data.updateUserId 
          }
        }
            // this.sysSave()
        if (res && res.success) {
          console.log(res,"resres")
          this.fromData.handbookVo = res.data;
          this.uploadConfig.id = res.data.id;

          this.fromData.handbookVo.attchmentFileInfo = [];
          if(res.data.attachments[0].filePath&&res.data.attachments[0].fileName){
            this.fromData.handbookVo.attchmentFileInfo.push({filePath:res.data.attachments[0].filePath,fileName:res.data.attachments[0].fileName,fileId:res.data.attachments[0].id});
          }
        }
      })
    },

    //获取下拉框数据
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  created() {
    // if (JSON.parse(localStorage.getItem("tcHumanRole"))) {
    //   let humanRole = JSON.parse(localStorage.getItem("tcHumanRole"));
    //   let humanArr = humanRole.filter(
    //     el => el.codeName == "超级管理员"
    //   );
    //   console.log(humanArr);
    //   if (humanArr.length > 0) {
    //     this.buttonShow = true;
    //   } else {
    //     this.buttonShow = false;
    //   }
    // }
    this.uploadConfig.code = this.$businessCode.fwbzfj;
    this.uploadConfig.newcode =  this.$businessCode.fwbz;
    if (JSON.parse(localStorage.getItem('userInfo')).unitId == "U010000") {
     

    this.$post
        .postData(
          "checkRole",
          JSON.stringify({
            function: "checkRole"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if(res){
            this.buttonShow=res.flag;
          }else{
            this.buttonShow=false;
          }
        });


    }



    this.initData();
    this.getOptions("1");
  }
};
</script>
<style lang="less" scoped>
label{
  line-height: 36px;
}
.bitian{
  color: #F56C6C;
  margin-right: 4px;
}
.command_file{
      display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
