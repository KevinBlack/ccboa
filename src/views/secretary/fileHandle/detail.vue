
 <template>
    <div >
       <el-header>
        <i class="el-icon-arrow-left"></i>
          <span class="title" >会议主办单</span>
          <div class="btn">
               <el-button size="mini" class="btnstyle" @click="onClose()" >关闭</el-button> 
               <el-button size="mini" class="btnstyle" @click="save">保存</el-button> 
               <el-button size="mini" class="btnstyle" @click="send">完成并发送</el-button> 
               <el-button size="mini" class="btnstyle" @click="buildNo">生成编号</el-button> 
               <el-button size="mini" class="btnstyle" @click="toHandleDep">发送办理部门</el-button>
               <el-button size="mini" class="btnstyle" @click="toEnd">办结</el-button>
               <el-button size="mini" class="btnstyle" @click="checkState">查看办理状态</el-button>
               <el-button size="mini" class="btnstyle" @click="checkFlow">查看流程</el-button> 
               <el-button size="mini" class="btnstyle" @click="onPrint()" >打印处理单</el-button> 
               <el-button size="mini" class="btnstyle" @click="readMe">操作指南</el-button>
               <el-button size="mini" class="btnstyle" @click="maintenan">维护</el-button> 
               <el-button size="mini" class="btnstyle" @click="flowDispatch">流程调度</el-button> 
          </div>
       </el-header>
       <div class="maintitle">
           {{dataForm.draftOrganFullName}}文件处理单
       </div>
       <div class="container" id="loadPdf">
            <div class="c-header">
                <span>当前环节:</span><span style="color:#f9aa21 ;margin-left: 5px;">{{dataForm.currentNode}}</span>
                <span style="margin-left: 30px;">当前处理人:</span><span style="color:#f9aa21 ;margin-left: 5px;">{{dataForm.currentUser}}</span>
            </div>
            <el-form label-position="right" id="aaa"  class="formData" label-width="80px" style="margin-top: 30px;"  :rules="rules" ref="dataForm" >
               <el-row>
                   <el-col :span="12">
                       <el-form-item label="编号" prop="documentNo">
                         <el-input :disabled="true" v-model="dataForm.documentNo" ></el-input>
                      </el-form-item>
                   </el-col>  
                   <el-col :span="12">
                       <el-form-item label="日程" prop="createDate">
                         <el-input :disabled="true" v-model="dataForm.createDate" ></el-input>
                      </el-form-item>
                   </el-col>  
               </el-row>
               <el-row >
                    <el-col :span="12">
                        <el-form-item label="来文单位">
                        <el-input :disabled="true" v-model="dataForm.fromDept"></el-input>
                    </el-form-item>
                    </el-col>  
                    <el-col :span="12">
                        <el-form-item label="文号" prop="fileCode">
                        <el-input :disabled="true" v-model="dataForm.fileCode"></el-input>
                    </el-form-item>
                    </el-col>  
                </el-row>
                <el-form-item label="文件标题" prop="title">
                    <el-input v-model="dataForm.title" ></el-input>
                </el-form-item>
                <el-form-item label="办理部门" prop="hqDept">
                    <el-input v-model="dataForm.hqDept"></el-input>
                </el-form-item>
                <el-form-item label="领导批示">
                    <el-input v-model="dataForm.leaderIdea"></el-input>
                </el-form-item>
                <div>
                    <span class="form-word">
                         收文部门拟办意见
                    </span>
                    <el-form-item>
                        <el-input  type="textarea" v-model="dataForm.receiveIdea" style="width: 678px;margin-bottom: 10px;"></el-input> 
                    </el-form-item>    
                </div>
                <el-form-item label="过程意见">
                    <el-input type="textarea" v-model="dataForm.processIdea"></el-input>
                </el-form-item>
                <el-form-item label="部门办理情况">
                    <el-input type="textarea" v-model="dataForm.callContent"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="dataForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="附件">
                    <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
                </el-form-item>
            </el-form>
            <div style="margin-left: 80px;">
                <el-button size="mini"  type="primary">引入</el-button>
                <el-button size="mini" type="primary">删除</el-button>
                <el-button size="mini" type="primary">排序</el-button>
                <el-button size="mini" type="primary" @click="onLoad()">下载</el-button>
            </div>
       </div>
    </div>
  </template>
  
  <script >
    import uploadFileTs from "components/uploadFile/uploadFileTs";
    import exportTable from "../../../minixs/exportTable"
    import apis from '@/httpTansun/api/secreatary/fileHandle.js'
    export default {
        components:{
            uploadFileTs
        },
        mounted(){
            this.dataForm=this.$route.query.data
            this.identify=this.$route.query.identify
            console.log(this.identify)
        },
        data(){
            return{
                id: '',
                fileArr:[],
                identify:0,
                dataForm:{
                    draftOrganFullName: '',
                    currentNode: '',
                    currentUser: '',
                    documentNo: '',
                    createDate: '',
                    fromDept: '',
                    fileCode: '',
                    title: '',
                    hqDept: '',
                    leaderIdea: '',
                    receiveIdea: '',
                    processIdea: '',
                    callContent: '',
                    remark: '',
                    attachId: ''
                },
                uploadConfig: {
                    formId: "bianhan",
                    filesHas: [],
                    isSpecial: 0,
                },
                rules:{
                    documentNo:[{required:true,message:'请输入编号',trigger:'blur'}],
                    createDate:[{required:true,message:'请输入办理部门',trigger:'blur'}],
                    title:[{required:true,message:'请输入文件标题',trigger:'blur'}],
                    hqDept:[{required:true,message:'请输入办理部门',trigger:'blur'}],
                    fileCode:[{required:true,message:'请输入文号',trigger:'blur'}]
                }
            }
        },
        created() {
            const rowData = this.$route.query.data
            const type = this.$route.query.identify
            if (type===2) {
                this.id = rowData.id
                this.getDetailIfo()
            }
        },
        methods:{
            //获取文件处理单详情
            getDetailIfo(){
                const data = {
                    id: this.id
                }
                apis.fileDetail(data).
                then(res => {
                    if (res.code==='success') {
                        console.log(res.data)
                        this.dataForm = res.data
                    }
                })
            },
            fileList(files) {
                console.log("11" + files);
                if (
                  this.formdata.attchmentFileInfo &&
                  this.formdata.attchmentFileInfo.length
                ) {
                  this.formdata.attchmentFileInfo.push(...files);
                } else {
                  this.formdata.attchmentFileInfo = files;
                }
                let fileid = [];
                files.forEach((item) => {
                  fileid.push(item.id);
                });
                this.formdata.attach = fileid.join(",");
                console.log(this.formdata.attach);
                this.$forceUpdate();
            },
            onPrint(){
                const routerData= this.$router.resolve({
                    path:'/printdetail',
                })
                window.open(routerData.href,"_blank")
            },
            //关闭按钮
            onClose(){
                this.$confirm('是否保存并退出当前页面?','提示',{
                    confirmButtonText:'确定',
                    cencelButtonText:'取消',
                }).then(()=>{
                    this.$router.go(-1)
                }).catch(()=>{

                })
            },
            //保存按钮
            save(){
                api.saveFile(this.formdata).
                then(res => {
                    if (res.code==='success') {
                        this.formdata.id = res.data.id
                        this.$message({
                            type: 'success',
                            text: res.msg
                        })
                    }
                }).catch(err => {
                    this.$message({
                            type: 'error',
                            text: err
                        })
                })
            },

            //完成并发送按钮
            send(){
                api.saveFile(this.formdata).
                then(res => {
                    if (res.code==='success') {
                        this.$message({
                            type: 'success',
                            text: res.msg
                        })
                    }
                }).catch(err => {
                    this.$message({
                            type: 'error',
                            text: err
                        })
                })
            },
            onLoad(){
                exportTable.getPdf('xiazai',[],'loadPdf')
            }
        }
    }
  </script>
  
  <style scoped lang="less" rel="stylesheet/less">
  .el-header{
      background-color: rgb(96, 186, 221);
      line-height: 60px;
  }
  .title{
      color: #ffffff;
  }
  .btn{
      float:right;
  }
  .btnstyle{
      color:rgb(14, 117, 214) ;
  }
  .btnstyle:hover{
      background-color: rgb(14, 117, 214);
      color: cornsilk;
  }
  .maintitle{
      font-size: 30px;
      color:rgb(14, 117, 214) ;
      text-align: center;
      margin-top: 30px;
      font-weight: bold;
  }
  .container{
      width: 800px;
     padding-bottom: 20px;
      margin: 30px auto;
      border: 1px solid rgb(218, 215, 215);
      padding: 20px 20px;
  }
  .c-header{
      background-color: #fef7e7;
      border:1px solid  #f9aa21;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
  }
  .el-table .cell{
      white-space:pre-line;
  }
.el-form-item ::v-deep {
    margin-bottom: 12px;
}
.form-word{
    width: 80px;
    float: left;
    line-height: 20px;
    font-size: 14px;
    color:  #606266;
    text-align: center;
}
  </style>
  