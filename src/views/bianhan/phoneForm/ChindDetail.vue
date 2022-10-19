
 <template>
    <div class="fileHandleDetail">
       <el-header>
        <i class="el-icon-arrow-left"></i>
          <span class="title" >会议主办单</span>
          <div class="btn">
              <template v-if="disabled">
                <el-button v-for="(item,index) in buttonListDone" @click="buttonClick(item.name)" :key="index" size="mini" plain>{{item.name}}</el-button>
              </template>
            <el-button  v-if="isTackBack" @click="tackBack" >收回</el-button>
            
            <template v-if="!disabled">
                <el-button v-for="(item,index) in buttonList" @click="buttonClick(item.name)" :key="index"
                    v-show="buttonList[index].show" size="mini" plain>{{item.name}}
                </el-button>
            </template>
            
          </div>
       </el-header>
       <!--    选择人员树-->
        <select-person
            :treeData="treeData"
            :loadingTree="true"
            :seletOptionsData="seletOptionsData"
            :offenUse="offenUse"
            :dialogType="dialogType"
            :dialogTypeNow="dialogTypeNow"
            dialogTit="选择共享用户"
            :checkIds="checkIds"
            :fromdata="dataForm"
            :checkData="checkData"
            :singelCheckF="singelCheckF"
            :dialogState="dialogState"
            @showCompDialog="showCompDialog"
        />
       <div class="shiwuTitle">
           {{dataForm.draftOrganFullName}}文件处理单
       </div>
       <div class="container" id="loadPdf">
            <div class="c-header">
                <span style="margin-left: 16px;">当前环节:</span><span style="color:#f9aa21 ;margin-left: 5px;">{{dataForm.currentNode}}</span>
                <span style="margin-left: 30px;">当前处理人:</span><span style="color:#f9aa21 ;margin-left: 5px;">{{dataForm.currentUser}}</span>
            </div>
            <el-form label-position="right" id="aaa"  class="dataForm" label-width="80px" style="margin-top: 30px;"  :rules="rules" ref="dataForm" :model="dataForm">
               <el-row>
                   <el-col :span="12">
                       <el-form-item label="编号" prop="documentNo">
                         <el-input  v-model="dataForm.documentNo" :disabled="readFields.Findex || disabled"></el-input>
                      </el-form-item>
                   </el-col>  
                   <el-col :span="12">
                       <el-form-item label="日程" prop="createDate">
                         <el-input  v-model="dataForm.createDate" :disabled="readFields.createDate || disabled"></el-input>
                      </el-form-item>
                   </el-col>  
               </el-row>
               <el-row >
                    <el-col :span="12">
                        <el-form-item label="来文单位" prop='fromDept'>
                        <el-input  v-model="dataForm.fromDept" :disabled="readFields.FromDept || disabled"></el-input>
                    </el-form-item>
                    </el-col>  
                    <el-col :span="12">
                        <el-form-item label="文号" prop="fileCode">
                            <el-input v-model="dataForm.fileCode" :disabled="readFields.FileCode || disabled"></el-input>
                        </el-form-item>
                    </el-col>  
                </el-row>
                <el-form-item label="文件标题" prop="title">
                    <el-input v-model="dataForm.title" :disabled="readFields.Title || disabled"></el-input>
                </el-form-item>
                <el-form-item label="办理部门" prop="hqDept">
                    <el-select v-model="dataForm.hqDept" placeholder="请选择" :disabled="readFields.hqDept || disabled" value-key="hqDeptId" @change="selectChange">
                        <el-option
                          v-for="item in hqDepts"
                          :key="item.hqDeptId"

                          :label="item.hqDept"
                          :value="item">
                        </el-option>
                      </el-select>
                </el-form-item>
                <!--     领导批示     -->
                <el-form-item label="领导批示" prop="leaderIdea">
                    <template v-if="dataForm.leaderIdeaList.length!=0">
                        <el-row v-for="item in dataForm.leaderIdeaList" :key="item.id" style="margin-bottom: 3px">
                            <div class="d_flex">
                                <el-row class="d_b100">
                                    <el-col :span="24">
                                        <el-input
                                            type="textarea"
                                            :value="item.content"
                                            :disabled="true"
                                            :autosize="{minRow:5,maxRow:15}"
                                            class="d_f1">
                                        </el-input>
                                        <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-row>
                    </template>
                    
                    <el-row v-if="!disabled || dataForm.leaderIdeaList.length==0">
                        <el-col :span="24">
                            <el-input type="textarea" :autosize="{minRow:5,maxRow:15}"
                                    placeholder="填写不可多于500字"
                                    maxlength="500"
                                    show-word-limit
                                    v-model="dataForm.leaderIdea" :disabled="editedIdeaFields.LDidea || disabled"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!--     收文部门拟办意见     -->
                <el-form-item label="收文部门拟办意见" prop="receiveIdea">
                    <template v-if="dataForm.receiveIdeaList.length!=0">
                        <el-row v-for="item in dataForm.receiveIdeaList" :key="item.id" style="margin-bottom: 3px">
                            <div class="d_flex">
                                <el-row class="d_b100">
                                    <el-col :span="24">
                                        <el-input
                                            type="textarea"
                                            :value="item.content"
                                            :disabled="true"
                                            :autosize="{minRow:5,maxRow:15}"
                                            class="d_f1">
                                        </el-input>
                                        <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-row>
                    </template>
                    <el-row v-if="!disabled || dataForm.receiveIdeaList.length==0">
                        <el-col :span="24">
                            <el-input type="textarea" :autosize="{minRow:5,maxRow:15}"
                                    placeholder="填写不可多于500字"
                                    maxlength="500"
                                    show-word-limit
                                    v-model="dataForm.receiveIdea" :disabled="editedIdeaFields.Proidea || disabled"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!--     过程意见     -->
                <el-form-item label="过程意见" prop="processIdea">
                    <template v-if="dataForm.processIdeaList.length!=0">
                        <el-row v-for="item in dataForm.processIdeaList" :key="item.id" style="margin-bottom: 3px">
                            <div class="d_flex">
                                <el-row class="d_b100">
                                    <el-col :span="24">
                                        <el-input
                                            type="textarea"
                                            :value="item.content"
                                            :disabled="true"
                                            :autosize="{minRow:5,maxRow:15}"
                                            class="d_f1">
                                        </el-input>
                                        <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-row>
                    </template>
                    
                    <el-row v-if="!disabled || dataForm.processIdeaList.length==0">
                        <el-col :span="24">
                            <el-input type="textarea" :autosize="{minRow:5,maxRow:15}"
                                    placeholder="填写不可多于500字"
                                    maxlength="500"
                                    show-word-limit
                                    v-model="dataForm.processIdea" :disabled="editedIdeaFields.Gcyjidea || disabled"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!--     部门办理情况     -->
                <el-form-item label="部门办理情况" prop="deptIdea">
                    <template v-if="dataForm.deptIdeaList.length!=0">
                        <el-row v-for="item in dataForm.deptIdeaList" :key="item.id" style="margin-bottom: 3px">
                            <div class="d_flex">
                                <el-row class="d_b100">
                                    <el-col :span="24">
                                        <el-input
                                            type="textarea"
                                            :value="item.content"
                                            :disabled="true"
                                            :autosize="{minRow:5,maxRow:15}"
                                            class="d_f1">
                                        </el-input>
                                        <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-row>
                    </template>
                    
                    <el-row v-if="!disabled || dataForm.deptIdeaList.length==0">
                        <el-col :span="24">
                            <el-input type="textarea" :autosize="{minRow:5,maxRow:15}"
                                    placeholder="填写不可多于500字"
                                    maxlength="500"
                                    show-word-limit
                                    v-model="dataForm.deptIdea" :disabled="editedIdeaFields.HQidea || disabled"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!--     备注区域     -->
                <el-form-item label="备注" prop="remark">
                    <template v-if="dataForm.remarkDealList&&dataForm.remarkDealList.length!=0">
                        <el-row v-for="item in dataForm.remarkDealList" :key="item.id" style="margin-bottom: 3px">
                            <div class="d_flex">
                                <el-row class="d_b100">
                                    <el-col :span="24">
                                        <el-input
                                            type="textarea"
                                            :value="item.content"
                                            :disabled="true"
                                            :autosize="{minRow:5,maxRow:15}"
                                            class="d_f1">
                                        </el-input>
                                        <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-row>
                    </template>
                    <template v-if="dataForm.remarkList.length!=0">
                        <el-row v-for="item in dataForm.remarkList" :key="item.id" style="margin-bottom: 3px">
                            <div class="d_flex">
                                <el-row class="d_b100">
                                    <el-col :span="24">
                                        <el-input
                                            type="textarea"
                                            :value="item.content"
                                            :disabled="true"
                                            :autosize="{minRow:5,maxRow:15}"
                                            class="d_f1">
                                        </el-input>
                                        <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-row>
                    </template>
                    
                    <el-row v-if="!disabled || dataForm.remarkList.length==0">
                        <el-col :span="24">
                            <el-input type="textarea" :autosize="{minRow:5,maxRow:15}"
                                    placeholder="填写不可多于500字"
                                    maxlength="500"
                                    show-word-limit
                                    v-model="dataForm.remark" :disabled="editedIdeaFields.Remark || disabled"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="附件" prop="attachid">
                    <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="办理状态" :visible.sync="handleStateDialog" center>
            <el-table :data="stateData">
                <el-table-column prop="TMS" label="发送时间" width="200"></el-table-column>
                <el-table-column prop="UNITNM" label="部门" width="200"></el-table-column>
                <el-table-column prop="STATUS" label="办理状态"></el-table-column>
                <el-table-column prop="AVYEXCTRNM" label="处理人" width="200"></el-table-column>
                <el-table-column prop="ENDTM" label="结束时间"></el-table-column>
            </el-table>
        </el-dialog>
        <checkFlowDialog :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></checkFlowDialog>
    </div>
  </template>
  
  <script >
    import checkFlowDialog from "@/components/viewFlow/shiwuFlow";
    import selectPerson from 'components/tree/tree-fawen'
    import uploadFileTs from "components/uploadFile/uploadFileTs"
    import exportTable from "@/minixs/exportTable"
    import apis from '@/httpTansun/api/secreatary/fileHandle.js'
    import minixs from "@/minixs/index"
    export default {
        name: 'fileHandleDetail',
        components:{
            uploadFileTs,
            selectPerson,
            checkFlowDialog
        },
        mixins: [minixs],
        
        data(){
            return{
                handleStateDialog: false,
                showFlowChart: false,
                isSaved: false,
                loadingTree: false,
                hqDepts: {},
                stateData: [
                    {
                        TMS: '2020-10-20',
                        UNITNM: '',
                        STATUS: '',
                        AVYEXCTRNM: '',
                        ENDTM: ''
                    }
                ],
                tableData: [],
                actionType: '1',
                disabled: false,
                id: '',
                fileArr:[],
                identify:0,
                rules: {},
                //人员数相关配置
                canTab: false,
                dialogVisible:false,
                treeData: [{name: "中国建设银行", id: '007'}],
                seletOptionsData: [],
                offenUse: true,
                dialogType: "dosend",
                dialogTypeNow: "next",
                checkIds: [], //选中id列表
                checkData: [], //选中数据
                singelCheckF: true, // 单选true 多选为false
                dialogState: false,//显示隐藏
                dataForm:{
                    draftOrganFullName: '',
                    currentNode: '',
                    currentNodeId: '',
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
                    attachId: '',
                    isReadFlag: '',
                    remarkList: [],
                    receiveIdeaList: [],
                    processIdeaList: [],
                    leaderIdeaList: [],
                    deptIdeaList: [],
                },
                uploadConfig: {
                    formId: "bianhan",
                    filesHas: [],
                    isSpecial: 0,
                },
                //流程环节信息
                flowLinkInfo: {},
                buttonListDone: [
                    {name: '关闭'},
                    {name: '查看办理状态'},
                    {name: '查看流程'},
                    {name: '打印处理单'},
                    {name: '维护'},
                    {name: '流程调度'},
                    {name: '操作指南'},
                ],
                buttonList: [
                    {name: '保存', type: 'save', show: true},
                    {name: '关闭', type: 'close', show: false},
                    {name: "完成并发送", type: "btn_wangchengsendtd", show: false},
                    {name: "生成编号", type: "gemeratenum", show: false},
                    {name: '办结', type: 'banjie', show: false},
                    {name: '发送办理部门', type: 'btn_sendhq', show: false},
                    {name: '查看办理状态', type: 'checkHandleState', show: false},
                    {name: '查看流程', type: 'checkFlow', show: false},
                    {name: '打印处理单', type: 'printHandleNote', show: false},
                    {name: '维护', type: 'maintain', show: false},
                    {name: '流程调度', type: 'flowDispatch', show: false},
                    {name: '操作指南', type: 'operatorGuide', show: false},
                    {name: '收回', type: 'tackBack', show: false},
                ],
                //不可编辑控制域
                readFields: {
                    FromDept: false,//来文单位
                    FileCode: false,//文号
                    Title: false,//标题
                    hqDept: false,//办理部门
                    Findex: false,//编号
                    attachid: false,//附件ID
                    createDate: false,//日程
                },
                //必填控制域
                requiredFields: {
                    FromDept: false,//来文单位
                    FileCode: false,//文号
                    Title: false,//标题
                    hqDept: false,//办理部门
                    Findex: false,//编号
                    attachid: false,//附件ID
                    createDate: false,//日程
                },
                //可编辑意见域
                editedIdeaFields: {
                    LDidea: true,//领导批示
                    Proidea: true,//收文部门拟办意见
                    Gcyjidea: true,//过程意见
                    HQidea: true,//部门办理情况
                    Remark: true,//备注
                },
                //必填意见域
                requiredIdeaFields: {
                    HQidea: false,//部门办理情况
                    LDidea: false,//领导批示
                    Proidea: false,//收文部门拟办意见
                    Gcyjidea: false,//过程意见
                    Remark: false//备注
                },
                
                
            }
        },
        mounted(){
        },
        computed: {
            isTackBack: function(){
                if (this.dataForm.isReadFlag==='0' || this.actionType==='1') {
                    return true
                } else {
                    return false
                }
            }
        },
        created() {
            
            this.actionType = this.$route.query.identify
            // sessionStorage.setItem("todoItem", JSON.stringify(todoItem));
            if (this.actionType=== '4') {
                this.getHandleDeps()
                this.getControlArea()
            } else {
                this.id = this.$route.query.id
                this.getDetailIfo()
                
            }
            
            
            
            
        },
        methods:{
            //设置部门名称
            selectChange(){
                const hqDept = this.dataForm.hqDept
                this.dataForm.hqDeptId = hqDept.hqDeptId
                this.dataForm.hqDept = hqDept.hqDept
                
                console.log("----设置部门名称------->",this.dataForm.hqDept);
            },
            //初始化校验规则
            initRules(){
                this.rules={
                    fromDept: [{required: this.requiredFields.FromDept, message: '不能为空', trigger: 'change'}],
                    fileCode: [{required: this.requiredFields.FileCode, message: '不能为空', trigger: 'change'}],
                    hqDept: [{required: this.requiredFields.hqDept, message: '不能为空', trigger: 'change'}],
                    documentNo: [{required: this.requiredFields.Findex, message: '不能为空', trigger: 'change'}],
                    createDate: [{required: this.requiredFields.createDate, message: '不能为空', trigger: 'change'}],
                    title: [{required: this.requiredFields.Title, message: '不能为空', trigger: 'change'}],
                    attachid: [{required: this.requiredFields.attachid, message: '不能为空', trigger: 'change'}],//附件ID

                    deptIdea: [{required: this.requiredIdeaFields.HQidea, message: '不能为空', trigger: 'change'}],
                    leaderIdea: [{required: this.requiredIdeaFields.LDidea, message: '不能为空', trigger: 'change'}],
                    receiveIdea: [{required: this.requiredIdeaFields.Proidea, message: '不能为空', trigger: 'change'}],
                    processIdea: [{required: this.requiredIdeaFields.Gcyjidea, message: '不能为空', trigger: 'change'}],
                    remark: [{required: this.requiredIdeaFields.Remark, message: '不能为空', trigger: 'change'}],
                }
            },
            //按钮控制
            buttonClick(params) {
                switch (params) {
                    case '关闭':
                        this.onClose();
                        break
                    case '保存':
                        this.save();
                        break
                    case '完成并发送':
                        this.send('完成并发送')
                        break
                    case "办结":
                        this.send('办结')
                        break
                    case '查看流程':
                        this.checkFlow()
                        break
                    case '生成编号':
                            this.buildNo()
                        break
                    case '查看办理状态':
                        this.checkState()
                        break
                    case '打印处理单':
                        this.onPrint()
                        break
                    case '操作指南':
                        this.readMe()
                        break
                    case '流程调度':
                        this.send('流程调度')
                        break
                    case '发送办理部门':
                        this.toHandleDep()
                        break
                    case '维护':
                        this.maintain()
                        break
                    case '收回':
                        this.tackBack()
                        break
                        
                    default :break;
                }
            },
            
            //获取文件处理单详情

            getDetailIfo(){
                const data = {
                    id: this.id
                }
                apis.fileDetail(data).
                then(res => {
                    if (res.code==='SUCCESS') {
                        console.log(res.data)
                        this.$nextTick(()=>{
                            const data = res.entity
                            res.entity.remarkList = res.remark
                            res.entity.remarkDealList = res.remarkDeal
                            res.entity.receiveIdeaList = res.receiveIdea
                            res.entity.processIdeaList = res.processIdea
                            res.entity.deptIdeaList = res.deptIdea
                            res.entity.leaderIdeaList = res.leaderIdea
                            this.dataForm = res.entity
                            if (this.actionType=== '0') {
                                this.getControlArea()
                                this.disabled = false
                            } else {
                                this.disabled = true
                            }
                        })
                        
                    }
                })
            },
            fileList(files) {
                console.log("11" + files);
                if (
                  this.dataForm.attchmentFileInfo &&
                  this.dataForm.attchmentFileInfo.length
                ) {
                  this.dataForm.attchmentFileInfo.push(...files);
                } else {
                  this.dataForm.attchmentFileInfo = files;
                }
                let fileid = [];
                files.forEach((item) => {
                  fileid.push(item.id);
                });
                this.dataForm.attach = fileid.join(",");
                console.log(this.dataForm.attach);
                this.$forceUpdate();
            },
            //打印处理单
            onPrint(){
                const routerData= this.$router.resolve({
                    path:'/printdetail',
                    query: {id: this.id}
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
                    this.$router.go(-1)
                })
            },
            //保存按钮
            save(val){
                let _this = this
                //如果已经保存过，走更新接口
                if (_this.dataForm.id) {
                    apis.editOrMatainanFile(_this.dataForm).
                    then(res => {
                        if (res.code==='SUCCESS') {
                            _this.$message({
                                type: 'success',
                                message: '保存成功！'
                            })
                            if (val) {
                                _this.selectOrgAndPerson(val)
                            } else {
                                _this.$router.go(-1)
                            }
                        }
                    }).catch(err => {
                        _this.isSaved=false
                        _this.$message({
                                type: 'error',
                                message: err
                            })
                    })
                } else {
                    apis.saveFile(_this.dataForm).
                    then(res => {
                        if (res.code==='SUCCESS') {
                            _this.dataForm.id = res.data
                            _this.$message({
                                type: 'success',
                                message: '保存成功！'
                            })
                            if (val) {
                                _this.selectOrgAndPerson(val)
                            }else {
                                _this.$router.go(-1)
                            }
                            
                        }
                    }).catch(err => {
                        _this.isSaved=false
                        _this.$message({
                                type: 'error',
                                message: err
                            })
                    })
                }
                
            },
            //选人成功-完成并发送/
            showCompDialog(data, status, type, params, dtype) {
                this.dialogState = false;
                console.log('data', data, 'status', status, 'type', type, 'params', params, 'dtype', dtype);
                if (status) {
                    let chooseDataName = []
                    let chooseDataId = []
                    let id_name = []
                    data && data.map(item => {
                        item.id = '' + item.id
                        console.log("item.id", item.id)
                        if (item.id.indexOf('#') > -1) {
                            let itemId = item.id.split('#')[0]
                            id_name.push(itemId + '_' + item.name)
                            chooseDataName.push(item.name)
                            chooseDataId.push(itemId)
                        } else if (item.id.indexOf('#') == -1) {
                            id_name.push(item.id + '_' + item.name)
                            chooseDataName.push(item.name)
                            chooseDataId.push(item.id)
                        }
                    })
                    console.log("------选人----", chooseDataName)
                    this.dataForm.currentUser = chooseDataName.join(",")
                    this.dataForm.currentUserId = chooseDataId.join(",")
                    this.dataForm.currentNodeId = params.id
                    this.dataForm.currentNode = params.name
                    apis.sendFile(this.dataForm).
                    then(res => {
                        if (res.code==='SUCCESS') {
                            this.$router.go(-1)
                            this.$message({
                                type: 'success',
                                message: res.msg
                            })
                        }
                    }).catch(err => {
                        this.$message({
                                type: 'error',
                                message: err
                            })
                    })
                }
            },
            //获取控制域信息
            getControlArea(){
                const id=this.actionType !=='4' ? this.dataForm.id : ''
                apis.getControlArea({
                    id: id,
                }).then(res => {
                    
                    this.flowLinkInfo = res.Fields
                    this.setConfig()
                    this.initRules()
                    
                    console.log("----liuchenghuanjie---", this.flowLinkInfo)
                })
            },
            //设置控制域
            setConfig() {
                this.requiredFields = this.setRequiredFields(this.requiredFields, this.flowLinkInfo.requiredFields)
                this.readFields = this.setReadFields(this.readFields, this.flowLinkInfo.readFields)//不可编辑控制域
                this.buttonList = this.showButton(this.buttonList, this.flowLinkInfo.visibleButtons, this.flowLinkInfo.visibleButtonsBycondition)//按钮
                this.editedIdeaFields = this.setEditedIdeaFields(this.editedIdeaFields, this.flowLinkInfo.editedIdeaFields, this.flowLinkInfo.editedIdeaFieldsBycondition)//可编辑意见域
                this.requiredIdeaFields = this.setRequiredIdeaFields(this.requiredIdeaFields, this.flowLinkInfo.requiredIdeaFields)//可编辑意见域
                console.log("----rules----",this.rules)
            },
            //完成并发送按钮
            send(val){
                const _this = this
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        if (!_this.dataForm.id) {
                            _this.save(val)
                        } else {
                            _this.selectOrgAndPerson(val)
                        }      
                } else {
                    _this.$message({
                            type: 'error',
                            message: "请填写必填项"
                        })
                    }
                }) 
            },
            //选择机构人员-完成并发送
            selectOrgAndPerson(val){
                const _this = this
                if (val==='完成并发送') {
                    
                    apis.getPersonInfoAndPersonTree({
                        id: _this.dataForm.id,
                    }).then(res => {
                        _this.seletOptionsData = res.data.list
                        if (res.data.result.message == "Loading") {
                            _this.loadingTree = true;
                        } else {
                            _this.loadingTree = false;
                        }
                        _this.dialogState = true;
                    }).catch((err)=>{
                        console.log(err)
                    })
                    _this.dataForm.handleButton=val
                
                }else if (val==='流程调度'){
                    apis.flowDispatch({
                        id: _this.dataForm.id,
                    }).then(res => {
                        _this.seletOptionsData = res.data
                        _this.dialogState = true;
                    }).catch((err)=>{
                        console.log(err)
                    })
                    _this.dataForm.handleButton='完成并发送'
                }else {
                    _this.dataForm.handleButton=val
                    apis.sendFile(this.dataForm).
                    then(res => {
                        if (res.code==='SUCCESS') {
                            _this.$router.go(-1)
                            _this.$message({
                                type: 'success',
                                message: '办结完成'
                            })
                        }
                    }).catch(err => {
                        _this.$message({
                            type: 'error',
                            message: err
                        })
                })
            }
            },
             //生成编号
             buildNo(){
                apis.buildNo(this.dataForm).
                then(res => {
                    console.log("---生成编号---",res)
                    if (res.code==='SUCCESS') {
                        this.dataForm.documentNo = res.docementNo
                        this.$message({
                            type: 'success',
                            message: res.msg
                        })
                    }
                }).catch(err => {
                    this.$message({
                            type: 'error',
                            message: err
                        })
                })
            },
            //收回
            tackBack(){
                apis.tackBack({id: this.dataForm.id}).
                then(res => {
                    if (res.code==='SUCCESS') {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        })
                        this.$router.go(-1)
                    }
                }).catch(err => {
                    this.$message({
                            type: 'error',
                            message: err
                        })
                })
            },
            //发送至办理部门
            toHandleDep(){
                apis.docHandlinAdd({id: this.dataForm.id}).
                then(res => {
                    console.log("发送至办理部门---",res)
                    this.$router.go(-1)
                    if (res.code==='SUCCESS') {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        })
                    }
                }).catch(err => {
                    this.$message({
                            type: 'error',
                            message: err
                        })
                })
            },
            //获取办理部门和日期
            getHandleDeps(){
                apis.getHandleDeps().
                then(res => {
                    console.log("----获取办理部门和日期---",res)
                    if (res.code==="SUCCESS") {
                        this.dataForm.createDate = res.data.createDate
                        this.hqDepts = res.data.hqDept
                    }
                }).catch(err => {
                    this.$message({
                            type: 'error',
                            message: err
                        })
                })
            },
            //查看办理状态
            checkState(){
                apis.checkState({id: this.dataForm.id}).
                then(res => {
                    console.log("查看办理状态",res)
                    if (res.code==='SUCCESS') {
                        this.stateData = res.data
                        this.handleStateDialog = true
                    }
                }).catch(err => {
                    this.$message({
                            type: 'error',
                            message: err
                        })
                })
            },

            //查看流程
            checkFlow(){
                const _this= this
                apis.checkFlow({id: this.dataForm.id}).
                then(res => {
                    
                    if (res.code==='SUCCESS') {
                        console.log("查看流程",res)
                        _this.showFlowChart = true
                        _this.tableData = res.data
                        _this.$nextTick(()=>{
                            _this.$refs.dialogLine.openDialog()
                        })
                    }
                }).catch(err => {
                    _this.$message({
                            type: 'error',
                            message: err
                        })
                })
            },

              //获取操作指南文件路径
              async getInstFileInfo(self, flagFile) {
                console.log("-----flagFile--->",flagFile)
                var successInfo = { state: false };
                let bank_doDownloadFile = {function: "doDownloadFile"}
                bank_doDownloadFile.fileName = flagFile.fileName;
                bank_doDownloadFile.filePath = flagFile.filePath;
                await self.$post
                    .postData(
                        "doDownloadFile",
                        JSON.stringify(bank_doDownloadFile),
                        self.$businessCode.fwbzfj
                    )
                    .then(res => {
                        console.log("-----res",res)
                        if (res && res.success) {
                            successInfo.filePath = res.filePath;
                            successInfo.fileName = res.fileName;
                            successInfo.state = true;
                        }else{
                            self.$message({
                                type: "error",
                                offset: 400,
                                showClose: true,
                                message: "文件获取失败，请重新上传",
                                duration: 1500
                            });
                            successInfo.state = false;
                        }
                    })
                    .catch(erro => {
                        self.$message({
                            type: "error",
                            offset: 400,
                            showClose: true,
                            message: "文件获取失败，请联系管理员",
                            duration: 1500
                        });
                        successInfo.state = false;
                    });
                return successInfo;
            },
        //操作指南
        readMe() {
            this.$post
                .postData(
                    "getAttchment",
                    JSON.stringify({
                        function: "getAttchment",
                        moduleCode: "BHGL"
                    }),
                    this.$businessCode.fwbz
                )
                .then(res => {
                    console.log("res",res)
                    if (res && res.success) {
                        this.getInstFileInfo(this, res.data).then(resF => {
                            if (resF.state) {
                                let data = this.$router.resolve({
                                    path: "/openAndSave_Word",
                                    query: {
                                        state: "viewFile",
                                        id: this.dataForm.id,
                                        zhengWenState: 0,
                                        JYcode: 'A08462002',
                                        multiTenancyId: '000000iiii',
                                        relativePath: resF ? resF.filePath : "",
                                        fileName: resF ? resF.fileName : "",
                                        showBtns: false
                                    }
                                });
                                window.open(data.href, "_blank");
                            }
                        });
                    } else {
                        this.$message({
                            type: "error",
                            offset: 400,
                            showClose: true,
                            message: "文件不存在",
                            duration: 1500
                        });
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "error",
                        offset: 400,
                        showClose: true,
                        message: "文件不存在",
                        duration: 1500
                    });
                });
            },
            //维护
            maintain(){
                apis.editOrMatainanFile(this.dataForm).
                then(res => {
                    if (res.code==='success') {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        })
                    }
                }).catch(err => {
                    this.$message({
                            type: 'error',
                            message: err
                        })
                })
            },
            //流程调度
            flowDispatch(){
                const _this = this
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) { 
                    apis.flowDispatch({
                        id: _this.dataForm.id,
                    }).then(res => {
                        _this.seletOptionsData = res.data
                        _this.dialogState = true;
                    }).catch((err)=>{
                        console.log(err)
                    })   
                } else {
                    _this.$message({
                            type: 'error',
                            message: "请填写必填项"
                        })
                    }
                }) 
            },
            //下载
            onLoad(){
                exportTable.getPdf('xiazai',[],'loadPdf')
            }
        }
    }
  </script>
  
  <style scoped lang="less" rel="stylesheet/less">
  .fileHandleDetail {
    background-color: #ffffff!important;
  }
  .el-header{
      background-color: rgb(64, 158, 255);
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
  .shiwuTitle{
    width:100%;
     min-height:90px;
     line-height:90px;
     text-align:center;
     color:#096dd9;
     font-size:44px;
     font-weight: 500;
  }
  .container{
    width: 80%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
  .c-header{
    width: 95%;
    margin-left: 5%;
    height: 56px!important;
    margin-bottom: 20px;
    line-height: 56px;
    border: 1px solid #f9aa21;
    background: #fef7e7;
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
  