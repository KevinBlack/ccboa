<template>
    <div class="sealKeeperChangeForm">
        <div class="headerClick">
            <div class="right">
                <el-button
                class="bank_grid_comtent_active"
                v-for="(item,index) in headerBtnList"
                v-show="item.show"
                @click="headerBtnClick(item.label)"
                :key="index"
                plain
                >{{item.label}}</el-button>
            </div>
        </div> 
        <div class="formHeader">
            <div class="title-text">中国建设银行印章保管交接处理单</div>
        </div>
        <div class="process_content" id="bank_dispach_content">
            <div class="cur_box">
                <div class="cur_sess">
                <p>
                    当前环节：
                    <span>{{currentNode}}</span>
                </p>
                <p>
                    当前处理人：
                    <span>{{currentPerson}}</span>
                </p>
                </div>
            </div>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="drafting-mainform">
            <!--
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="当前环节">
                            <el-input v-model="currentNode" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="当前处理人">
                            <el-input v-model="currentPerson" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>    
                -->                    
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印章名称" prop="Stmp_ECD">
                            <el-select v-model="form.Stmp_ECD" placeholder="请选择" style="width:100%" :disabled="readFields.yzmc">
                                <el-option v-for="item in allSeals"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="编号" prop="Apl_Aply_ID">
                            <el-input v-model="form.Apl_Aply_ID" :disabled="readFields.bh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="交接类型">
                                <el-radio-group v-model="form.Stmp_HndOv_TpCd" :disabled="readFields.jjlx">
                                <el-radio label="51">日常</el-radio>
                                <el-radio label="52">岗位</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="Stmp_Aply_Psn_Ctc_Tel">
                            <el-input v-model="form.Stmp_Aply_Psn_Ctc_Tel" :disabled="readFields.lxdh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="移交人">
                            <el-input v-model="form.StmpMain_HndOv_Psn_Nm" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="拟稿日期">
                            <el-input v-model="form.Stmp_Main_HndOv_Tm" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="接收人">
                        
                            <el-select v-model="form.Stmp_Main_Rcv_Psn_ID" placeholder="请选择" style="width:100%" @change="getRcvPsnNm" :disabled="readFields.jsr">
                                <el-option v-for="item in receiveMans"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            
                        <!--<el-input v-model="form.Stmp_Main_Rcv_Psn_ID" :disabled="formStatus.qichao"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="交出时间">
                            <el-input v-model="form.Stmp_Main_Rcv_Tm" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="交出原因" prop="Stmp_HndOv_Rsn" >
                    <el-input v-model="form.Stmp_HndOv_Rsn" :disabled="readFields.jcyy"></el-input>
                </el-form-item>
                <el-form-item label="审批意见" prop="Stmp_HndOv_Dsc">
                    <el-input v-model="form.Stmp_HndOv_Dsc" :disabled="readFields.spyj"></el-input>        
                </el-form-item>
                <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.Rmrk_Inf_Dsc" :rows="2" :disabled="readFields.remark"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 查看流程组件 -->
            <shiwu-flow :tableData="doneProgressList" ref="dialogLine"></shiwu-flow>
        <!-- 完成并发送选人组件 -->
        <div class="myselectperson">
            <select-person
                :treeData="treeData"
                :canTab="canTab"
                :loadingTree="loadingTree"
                :hasRadio="hasRadio"
                :checkOrg="checkOrg"
                :offenUse="offenUse"
                :dialogType="dialogType"
                :seletOptionsData="seletOptionsData"
                :dialogTypeNow="dialogTypeNow"
                :dialogTit="dialogTit"
                :checkIds="checkIds"
                :checkData="checkData"
                :singelCheckF="singelCheckF"
                :dialogState="dialogState"
                :fromdata="formdata"
                @showCompDialog="showCompDialog">
            </select-person>
        </div>
    </div>
</template>

<script>
    // 导入选人组件（完成并发送时使用）
    import selectPerson from 'components/tree/tree-fawen';
    // 查看流程组件
    import shiwuFlow from "@/components/viewFlow/shiwuFlow";
    export default {
        name: 'sealKeeperChangeForm',
         components: {
            'select-person': selectPerson,
            'shiwu-flow': shiwuFlow,
        },
        data: function data(){
            return {
                headerBtnList: [
                    {label:'关闭',show:true}, 
                    {label:'保存',show:true},
                    {label:'生成编号',show:false},
                    {label:'同意接收',show:false},
                    {label:'完成并发送',show:true},
                    {label:'查看流程',show:true}],
                allSeals:[],//全部印章 
                //receiveMans:[{label:"张志兴",value:"65928091"},{label:"钱培民",value:"86535539"},{label:"古晓燕",value:"69028930"},{label:"叶成",value:"82687611"},{label:"蒋冬梅",value:"37696703"}],//接收人
                receiveMans:[],
                currentNode:'',//当前环节
                currentPerson:'',//当前处理人
                Parm_Next_Lnk_Inst_Dsc: [],        // 下一节点的所有流程
                Parm_Next_Lnk_Inst_Nm: [],         // 下一节点的所有机构
                seletOptionsData: [],   // 环节
                treeData: [],           // 部门（人员树）
                dialogState: false,//显示隐藏
                form: {         
                    Stmp_ECD:                  '',          //印章编号
                    Stmp_HndOv_Bsn_ID:          '',          //印章交接业务编号
                    Apl_Aply_ID:               '',          // 编号
                    Stmp_HndOv_TpCd:           '',          // 交接类型
                    Stmp_Aply_Psn_Ctc_Tel:     '',          // 联系电话
                    StmpMain_HndOv_Psn_ID:     '',          // 移交人
                    StmpMain_HndOv_Psn_Nm:     '',          // 移交人名称
                    Stmp_Main_HndOv_Tm:         '',          // 拟稿日期
                    Stmp_Main_Rcv_Psn_ID:      '',          // 接收人
                    Stmp_Main_Rcv_Psn_Nm:      '',          // 接收人名称
                    Stmp_Rcv_Chk_InsID:        '',         //接收机构编号
                    Stmp_Rcv_Chk_Inst_Nm:      '',         //接收机构名称
                    Stmp_Main_Rcv_Tm:          '',          // 交出时间
                    Stmp_HndOv_Rsn:            '',          // 交出原因
                    Stmp_Aply_ApvOpn_Cd:       '',          //审批意见ID
                    Stmp_HndOv_Dsc:            '',          // 审批意见
                    Rmrk_Inf_Dsc:              '',          // 备注
                    Cur_Pcs_Dsc:                '',         //实例ID
                    WrkOrdrNextPcsgPsn_ID:       '',         //工单下一处理人编号
                    WrkOrdrNextPcsgPsn_Nm:       '',         //工单下一处理人名称
                    Node_ID:                     '',         //节点编号
                    Node_Nm:                     '',         //节点名称
                    Unit_Dept_EmpID:            '',         //OA系统humanId
                    Token_Inf_ID:               ''          //OA系统ccbtoken
                },
                readFields:{
                    yzmc:   false,                  //印章名称
                    bh:     true,                   //编号
                    jjlx:   false,                  //交接类型
                    lxdh:   false,                  //联系电话
                    yjr:    true,                   //移交人
                    ngrq:   true,                   //拟搞日期
                    jsr:    false,                  //接收人
                    jcsj:   true,                   //交出时间
                    jcyy:   false,                  //交出原因
                    spyj:   true,                   //审批意见
                    remark: false                   //备注
                },
                rules:{
                    Stmp_HndOv_Rsn:[{required: true, message: '请输入交出原因', trigger: 'blur' }],
                    Stmp_ECD:[{required: true, message: '请选择印章', trigger: 'change' }]
                }
            }
        },
        computed: {
            // 流动Id
            workflowId(){
                if (this.form.Cur_Pcs_Dsc) {
                    let arr = this.form.Cur_Pcs_Dsc.split(',');
                    return arr[1];
                }
            }
        },
        created: function(){
            //查询印章保管人清单
            this.$api.sealManage.personLogin.getList({type:"3"})
                .then(res =>{
                        console.log('getList返回的数据：', res, this);
                        for(var j=0;j<res.data.length;j++){
                            this.receiveMans.push({label:res.data[j].draftUser,value:res.data[j].huManCode});
                        }

                })
                .catch((err) => {
                    console.log('印章保管人查询报错：', err);
                });
            if(this.$route.query.Stmp_HndOv_Bsn_ID){//非起草
                //查询数据详情
                let jsonData={
                    Stmp_HndOv_Bsn_ID:this.$route.query.Stmp_HndOv_Bsn_ID,
                    Mnplt_TpCd : '01',
                    _pagination:{
                        PAGE_JUMP:1,
                        REC_IN_PAGE:10
                    }
                }
                console.log("请求参数",jsonData);
                this.$api.sealManage.sealKeeperChange.querySealKeeperChange(jsonData)
                    .then(res =>{
                        console.log('querySealRegister返回的数据：', res.Stmp_HndOv_Record_Grp);
                        this.form.Stmp_HndOv_Bsn_ID = res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_Bsn_ID;//印章交接业务编号
                        this.form.Stmp_ECD=res.Stmp_HndOv_Record_Grp[0].Stmp_ECD;          // 印章编号
                        this.form.Apl_Aply_ID=res.Stmp_HndOv_Record_Grp[0].Apl_Aply_ID;       // 编号
                        this.form.Stmp_HndOv_TpCd=res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_TpCd;          // 交接类型
                        this.form.Stmp_Aply_Psn_Ctc_Tel=res.Stmp_HndOv_Record_Grp[0].Stmp_Aply_Psn_Ctc_Tel;          // 联系电话
                        this.form.StmpMain_HndOv_Psn_ID=res.Stmp_HndOv_Record_Grp[0].StmpMain_HndOv_Psn_ID;          // 移交人
                        this.form.StmpMain_HndOv_Psn_Nm=res.Stmp_HndOv_Record_Grp[0].StmpMain_HndOv_Psn_Nm;          // 移交人名称
                        this.form.Stmp_Main_HndOv_Tm=res.Stmp_HndOv_Record_Grp[0].Stmp_Main_HndOv_Tm;          // 拟稿日期
                        this.form.Stmp_Main_Rcv_Psn_ID=res.Stmp_HndOv_Record_Grp[0].Stmp_Main_Rcv_Psn_ID;          // 接收人
                        this.form.Stmp_Main_Rcv_Psn_Nm=res.Stmp_HndOv_Record_Grp[0].Stmp_Main_Rcv_Psn_Nm;          // 接收人名称
                        this.form.Stmp_Rcv_Chk_InsID = res.Stmp_HndOv_Record_Grp[0].Stmp_Rcv_Chk_InsID;            //接收机构编号
                        this.form.Stmp_Rcv_Chk_Inst_Nm = res.Stmp_HndOv_Record_Grp[0].Stmp_Rcv_Chk_Inst_Nm;        //接收机构名称
                        this.form.Stmp_Main_Rcv_Tm=res.Stmp_HndOv_Record_Grp[0].Stmp_Main_Rcv_Tm;          // 交出时间
                        this.form.Stmp_HndOv_Rsn=res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_Rsn;         // 交出原因
                        this.form.Stmp_Aply_ApvOpn_Cd = 'Y';                                            //审批意见ID
                        this.form.Stmp_HndOv_Dsc=res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_Dsc;            // 审批意见
                        this.form.Rmrk_Inf_Dsc=res.Stmp_HndOv_Record_Grp[0].Rmrk_Inf_Dsc;        // 备注
                        console.log("当前状态",res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_StCd);
                        if(res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_StCd=="21"){//起草待审批
                            console.log("审批开始");
                            this.currentNode = "审批";
                            this.currentPerson = JSON.parse(localStorage.userInfo).humanName;
                            //管制审批意见必输
                            this.rules.Stmp_HndOv_Dsc = [{required: true, message: '请输入审批意见', trigger: 'blur' }];
                        }else if(res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_StCd=="22"){//审核待移交
                            console.log("移交开始");
                            this.headerBtnList[2].show=true;
                            this.currentNode = "移交";
                            this.currentPerson = JSON.parse(localStorage.userInfo).humanName;
                            //管制编号必输
                            this.rules.Apl_Aply_ID = [{required: true, message: '请输入编号', trigger: 'blur' }];
                        }else if(res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_StCd=="23"){//移交待接收
                            console.log("接收开始");
                            this.headerBtnList[2].show=false;
                            this.headerBtnList[3].show=true;
                            this.currentNode = "接收";   
                            this.currentPerson = JSON.parse(localStorage.userInfo).humanName;     
                        }
                    })
                    .catch((err) => {
                        console.log('印章保管交接明细查询报错：', err);
                    })
            }else{//起草
            console.log("create start",localStorage.userInfo);
            this.currentNode = "起草";
            this.currentPerson = JSON.parse(localStorage.userInfo).humanName;
            //拟稿日期
            let sysDate = new Date();
            this.form.Stmp_Main_HndOv_Tm = sysDate.getFullYear()+'-'+(sysDate.getMonth()+1)+'-'+sysDate.getDate();
            //移交人
            this.form.StmpMain_HndOv_Psn_ID = JSON.parse(localStorage.userInfo).humanCode;
            this.form.StmpMain_HndOv_Psn_Nm = JSON.parse(localStorage.userInfo).humanName;
            //取得印章列表
            let jsonData = {
                Mnplt_TpCd : '01',
                StmpMain_HndOv_Psn_ID : JSON.parse(localStorage.userInfo).humanCode,
                 _pagination:{
                        PAGE_JUMP:1,
                        REC_IN_PAGE:100
                    }
            };
            this.$api.sealManage.sealKeeperChange.querySealList(jsonData).
                then(res =>{
                        console.log('印章列表数据：', res, this);
                        for(var j=0;j<res.LIST1.length;j++){
                            this.allSeals.push({label:res.LIST1[j].Stmp_Dspl_Inst_Nm,value:res.LIST1[j].Stmp_ECD});
                        }
                    })
                    .catch((err) => {
                        console.log('印章列表数据查询报错：', err);
                    });
            }        
        },
        methods: {
            backIndex(){
                this.$router.push({
                    path: '/sealManage/sealKeeperChange'
                });
            },
            //接收人名称
            getRcvPsnNm(RcvPsnID){
                for(var i=0;i<this.receiveMans.length;i++){
                    if(this.receiveMans[i].value == RcvPsnID){
                        this.form.Stmp_Main_Rcv_Psn_Nm = this.receiveMans[i].label;
                    }
                }
            }, 
            //取得编号
            getAplyID(){
                let jsonData={
                    fileNo:"",
                    statusType:true,
                    markOrderType:"7",
                    draftDepartmentId:JSON.parse(localStorage.userInfo).currUnitId,//部门ID
                    draftOrganId:JSON.parse(localStorage.userInfo).unitId,//机构ID
                    draftUserId:JSON.parse(localStorage.userInfo).humanId
                };
                this.$api.sealManage.sealCommon.getSealNum(jsonData).
                    then(res =>{
                        console.log('生成的编号：', res, this);
                        this.form.Apl_Aply_ID = res.data;

                    })
                    .catch((err) => {
                        console.log('生成编号报错：', err);
                    });
            }, 
            // 查看（已完成的）流程
            toSeeDoneProcess(){
                // 新建阶段
                if (!this.form.Stmp_HndOv_Bsn_ID) {
                    this.doneProgressList = [{
                            DSC: '',                                    // 处理记录
                            EXCNM: JSON.parse(localStorage.userInfo).humanName,     // 处理人的名字
                            HUMANCODE: JSON.parse(localStorage.userInfo).humanCode, // 处理人的编号
                            NODE: "起草（新建）",                        // 环节
                            TM: this.form.Stmp_Main_HndOv_Tm              // 操作/申请时间
                    }];
                    this.$refs.dialogLine.openDialog();
                    return;
                }
                // 审批阶段 TODO:有接口后添加参数和添加接口
                let params = {curProcessInstId: this.workflowId};
                this.$api.sealManage.sealCommon.getLink_done(params)
                    .then(res => {
                        console.log('toSeeDoneProcess返回的数据:', res, params);
                        this.doneProgressList = res.data;
                        this.$nextTick(() => {
                            this.$refs.dialogLine.openDialog();
                        });
                    });
            },
            // 显示选人对话框
            showSelectPerson() {
                console.log('showSelectPerson');
                this.seletOptionsData = this.Parm_Next_Lnk_Inst_Dsc;    // 环节信息(下一节点)
                this.treeData = this.Parm_Next_Lnk_Inst_Nm;             // 部门初始数据（选择部门）
                this.dialogState = true;                                // 显示选人弹窗
            },
            // 选人完成后
            showCompDialog (data, status, type, params, dtype) {
                // 点击取消按钮： 只有data信息， 其余都为undefined
                // 点击确认按钮： 所有数据都有。
                // data: 数组。选择人的信息（所在部门，人员）； status: 是否是点击确认按钮返回的
                // params：下一个环节信息， 格式：{id: "N02020111719300" name: "申请单位主要负责人审批"}
                console.log('选人成功后：', data, status, type, params, dtype);
                // 隐藏选人弹窗
                this.dialogState = false;

                // 点击的取消按钮，返回
                if (!status) {
                    return;
                }

                //this.form.StmpAplyAprvDstInsID = data[0].deptId;    // 下一个环节人所在机构的ID（印章申请审批指定机构ID）
                //this.form.StmpAplyAprvDstInsNm = data[0].deptName;  // 下一个环节人所在机构的名字（印章申请审批指定机构名称）
                this.form.WrkOrdrNextPcsgPsn_ID = data[0].idStr;            // 下一个环节人的id
                this.form.WrkOrdrNextPcsgPsn_Nm = data[0].name;           // 下一个环节人的名字
                this.form.Node_ID = params.id;             // 下一个环节的id
                this.form.Node_Nm = params.name;           // 下一个环节的名字
                this.saveUdpData().then(res =>{
                    console.log('UdpSealKeeperChange返回的数据：', res, this);
                    
                    that.$message({
                        type: "success",
                        showClose: true,
                        offset: 400,
                        message: '印章保管交接变更成功！',
                        duration: 2000
                    });
                    /*
                    this.$router.push({
                        path: '/sealManage/sealKeeperChange/index'
                    }); 
                    */ 
                })
                .catch((err) => {
                    console.log('印章保管交接数据存档报错：', err);
                    that.$message({
                        type: "error",
                        showClose: true,
                        offset: 400,
                        message: '印章保管交接变更失败！\n'+err,
                        duration: 2000
                    });
                });

            },
            headerBtnClick(btnName){
                switch (btnName) {
                    case '关闭':
                        this.$router.push('/sealManage/sealKeeperChange');
                        break;
                    case '保存':
                        let that = this;
                        if(this.currentNode == "起草"){
                            this.saveAddData().then(res =>{
                                console.log('addSealKeeperChange返回的数据：', res, this);
                                this.form.Stmp_HndOv_Bsn_ID = res.Stmp_HndOv_Bsn_ID;
                                this.Parm_Next_Lnk_Inst_Dsc = JSON.parse(res.Parm_Next_Lnk_Inst_Dsc);
                                this.Parm_Next_Lnk_Inst_Nm = JSON.parse(res.Parm_Next_Lnk_Inst_Nm);
                                that.$message({
                                    type: "success",
                                    showClose: true,
                                    offset: 400,
                                    message: '起草印章保管交接成功！',
                                    duration: 2000
                                });
                                /*
                                this.$router.push({
                                    path: '/sealManage/sealKeeperChange/index'
                                }); 
                                */ 
                            })
                            .catch((err) => {
                                console.log('印章保管交接数据存档报错：', err);
                                that.$message({
                                    type: "error",
                                    showClose: true,
                                    offset: 400,
                                    message: '起草印章保管交接失败！\n'+err,
                                    duration: 2000
                                });
                            });
                        }else{
                            this.saveUdpData().then(res =>{
                                console.log('UdpSealKeeperChange返回的数据：', res, this);
                                
                                that.$message({
                                    type: "success",
                                    showClose: true,
                                    offset: 400,
                                    message: '印章保管交接变更成功！',
                                    duration: 2000
                                });
                                /*
                                this.$router.push({
                                    path: '/sealManage/sealKeeperChange/index'
                                }); 
                                */ 
                            })
                            .catch((err) => {
                                console.log('印章保管交接数据存档报错：', err);
                                that.$message({
                                    type: "error",
                                    showClose: true,
                                    offset: 400,
                                    message: '印章保管交接变更失败！\n'+err,
                                    duration: 2000
                                });
                            });
                        }
                        break;
                    case '同意接收':
                        let sysDate = new Date();
                        this.form.Stmp_Main_Rcv_Tm = sysDate.getFullYear()+'-'+(sysDate.getMonth()+1)+'-'+sysDate.getDate();
                        this.form.Stmp_Rcv_Chk_InsID = JSON.parse(localStorage.unitInfo)[0].currUnitId;
                        this.form.Stmp_Rcv_Chk_Inst_Nm = JSON.parse(localStorage.unitInfo)[0].currUnitName;
                        break;
                    case '生成编号':
                        this.getAplyID();                   
                        break;
                    case  '完成并发送':
                        if(this.form.Stmp_HndOv_Bsn_ID == ''){//起草
                            this.saveAddData().then(res =>{
                                console.log('addSealKeeperChange返回的数据：', res, this);
                                this.form.Stmp_HndOv_Bsn_ID = res.Stmp_HndOv_Bsn_ID;
                                this.Parm_Next_Lnk_Inst_Dsc = JSON.parse(res.Parm_Next_Lnk_Inst_Dsc);
                                this.Parm_Next_Lnk_Inst_Nm = JSON.parse(res.Parm_Next_Lnk_Inst_Nm);
                                this.showSelectPerson();
                            })
                            .catch((err) => {
                                console.log('印章保管交接数据存档报错：', err);
                                that.$message({
                                    type: "error",
                                    showClose: true,
                                    offset: 400,
                                    message: '起草印章保管交接失败！\n'+err,
                                    duration: 2000
                                });
                            });
                        }else{
                            this.showSelectPerson();
                        }
                        break;
                    case  '查看流程':
                        this.toSeeDoneProcess();
                        break;   
                    default: 
                        console.log('你点击了按钮:' +btnName);
                }
            },
            saveAddData:function(){
                //表单form验证
                this.$refs['form'].validate((valid)=>{
                    if(!valid){
                        this.$message({type:"error",message:"请检查数据是否填写完整！"});
                    }
                });
                let jsonData={};
                jsonData.Stmp_ECD=this.form.Stmp_ECD;                           // 印章编号
                jsonData.Stmp_HndOv_TpCd=this.form.Stmp_HndOv_TpCd;             // 交接类型
                jsonData.Stmp_Aply_Psn_Ctc_Tel=this.form.Stmp_Aply_Psn_Ctc_Tel; // 联系电话
                jsonData.StmpMain_HndOv_Psn_ID=this.form.StmpMain_HndOv_Psn_ID; // 移交人
                jsonData.StmpMain_HndOv_Psn_Nm=this.form.StmpMain_HndOv_Psn_Nm; // 移交人名称
                jsonData.Stmp_Main_HndOv_Tm=this.form.Stmp_Main_HndOv_Tm;       // 拟稿日期
                jsonData.Stmp_Main_Rcv_Psn_ID=this.form.Stmp_Main_Rcv_Psn_ID;   // 接收人
                jsonData.Stmp_Main_Rcv_Psn_Nm=this.form.Stmp_Main_Rcv_Psn_Nm;   // 接收人名称 
                jsonData.Stmp_Rcv_Chk_InsID = this.form.Stmp_Rcv_Chk_InsID;     //接收机构
                jsonData.Stmp_Rcv_Chk_Inst_Nm = this.form.Stmp_Rcv_Chk_Inst_Nm; //接收机构名称
                jsonData.Stmp_Main_Rcv_Tm=this.form.Stmp_Main_Rcv_Tm;           // 交出时间                       
                jsonData.Stmp_HndOv_Rsn=this.form.Stmp_HndOv_Rsn;               // 交出原因      
                jsonData.Rmrk_Inf_Dsc=this.form.Rmrk_Inf_Dsc;                   // 备注
                jsonData.Unit_Dept_EmpID = JSON.parse(localStorage.userInfo).humanId;
                jsonData.Token_Inf_ID = localStorage.st_token;
                let that = this;
                //发送交易
                return this.$api.sealManage.sealKeeperChange.sealKeeperChangeAdd(jsonData);
                /*
                    .then(res =>{
                        console.log('addSealKeeperChange返回的数据：', res, this);
                        if(type=="01"){
						    that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '起草印章保管交接成功！',
                                duration: 2000
                            });
                        }else if(type=="02"){
                            that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接审批成功！',
                                duration: 2000
                            });
                        }else if(type=="03"){
                            that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接移交成功！',
                                duration: 2000
                            });
                        }else if(type=="04"){
                            that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接接收成功！',
                                duration: 2000
                            });
                        }
                        this.$router.push({
                            path: '/sealManage/sealKeeperChange/index'
                        });  
                    })
                    .catch((err) => {
                        console.log('印章保管交接数据存档报错：', err);
						if(type=="01"){
						    that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '起草印章保管交接失败！\n'+err,
                                duration: 2000,
                            });
                        }else if(type=="02"){
                            that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接审批失败！\n'+err,
                                duration: 2000,
                            });
                        }else if(type=="03"){
                            that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接移交失败！\n'+err,
                                duration: 2000,
                            });
                        }else if(type=="04"){
                            that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接接收失败！\n'+err,
                                duration: 2000,
                            });
                        }
                    })
                    */
            },
            saveUdpData:function(){
                //表单form验证
                this.$refs['form'].validate((valid)=>{
                    if(!valid){
                        this.$message({type:"error",message:"请检查数据是否填写完整！"});
                    }
                });
                let jsonData={};
                jsonData.Stmp_HndOv_Bsn_ID=this.form.Stmp_HndOv_Bsn_ID;         // 印章交接业务编号
                jsonData.Stmp_Aply_ApvOpn_Cd='Y';                               // 审批意见代码
                jsonData.Stmp_HndOv_Dsc=this.form.Stmp_HndOv_Dsc;               // 审批意见描述
                jsonData.Stmp_Main_Rcv_Tm=this.form.Stmp_Main_Rcv_Tm;           // 交出时间 
                jsonData.Apl_Aply_ID=this.form.Apl_Aply_ID;                     //编号 
                jsonData.Rmrk_Inf_Dsc=this.form.Rmrk_Inf_Dsc;                   // 备注
                jsonData.WrkOrdrNextPcsgPsn_ID=this.form.WrkOrdrNextPcsgPsn_ID; // 工单下一处理人编号
                jsonData.WrkOrdrNextPcsgPsn_Nm=this.form.WrkOrdrNextPcsgPsn_Nm; // 工单下一处理人名称
                jsonData.Node_ID=this.form.Node_ID;   // 节点编号
                jsonData.Node_Nm=this.form.Node_Nm;   // 节点名称
                jsonData.Unit_Dept_EmpID = JSON.parse(localStorage.userInfo).humanId;
                jsonData.Token_Inf_ID = localStorage.st_token;
                let that = this;
                //发送交易
                return this.$api.sealManage.sealKeeperChange.sealKeeperChangeUdp(jsonData);
                /*
                    .then(res =>{
                        console.log('addSealKeeperChange返回的数据：', res, this);
                        if(type=="01"){
						    that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '起草印章保管交接成功！',
                                duration: 2000
                            });
                        }else if(type=="02"){
                            that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接审批成功！',
                                duration: 2000
                            });
                        }else if(type=="03"){
                            that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接移交成功！',
                                duration: 2000
                            });
                        }else if(type=="04"){
                            that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接接收成功！',
                                duration: 2000
                            });
                        }
                        this.$router.push({
                            path: '/sealManage/sealKeeperChange/index'
                        });  
                    })
                    .catch((err) => {
                        console.log('印章保管交接数据存档报错：', err);
						if(type=="01"){
						    that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '起草印章保管交接失败！\n'+err,
                                duration: 2000,
                            });
                        }else if(type=="02"){
                            that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接审批失败！\n'+err,
                                duration: 2000,
                            });
                        }else if(type=="03"){
                            that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接移交失败！\n'+err,
                                duration: 2000,
                            });
                        }else if(type=="04"){
                            that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接接收失败！\n'+err,
                                duration: 2000,
                            });
                        }
                    })
                    */
            }
        },
        watch: {
            'form.isEnabled': function(val){
                console.log('watch:',val, this);
            }
        },
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
.read {
    color: '#E00';
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.sealKeeperChangeForm {
  background: white;
  min-height: 1000px;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding:0px 70px 0px 70px;
    height: 75px;
    background: white;
    .title-text {
      margin-bottom: 5px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      text-align: center;
    }
  }

  .process_content {
    width: 80%;
    min-height: 920px;
    padding: 10px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;
          span {
            color: #f9aa21;
          }
        }
      }
    }

    .editor_box {
      height: 500px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 120px;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}
.bank_dispach_file_tit {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #3b85ef;
    font-size: 16px;
    padding: 10px;
}
.bank_dispach_side_nav {
    width: 45px;
    height: auto;
    position: fixed;
    padding: 0px 0px 0px 0px;
    left: 10%;
    margin-left: -43px;
    text-align: center;

    a {
        width: 45px;
        height: 70px;
        border: 2px solid #3b85ef;
        font-size: 16px;
        margin: 15px 0;
        color: #3b85ef;
        background: #fff;
        border-radius: 10px 0 0 10px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a {
        width: 45px;
        height: 70px;

        border: 2px solid #3b85ef;
        font-size: 16px;
        margin: 15px 0;
        color: #3b85ef;
        background: #fff;
        border-radius: 10px 0 0 10px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active {
        background: #3b85ef;
        color: #fff;
    }
}
</style>