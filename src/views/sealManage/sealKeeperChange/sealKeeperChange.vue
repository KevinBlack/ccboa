<template>
    <div class="sealKeeperChangeForm">
        <div class="headerClick">
            <div class="right">
                <el-button
                class="bank_grid_comtent_active"
                v-for="(item,index) in buttonList"
                v-show="item.show"
                @click="headerBtnClick(item.name)"
                :key="index"
                plain
                >{{item.name}}</el-button>
            </div>
        </div> 
        <div class="formHeader" style="margin-top: 50px;">
            <div class="title-text">{{unitName}}印章保管交接处理单</div>
        </div>
        <div class="process_content" id="bank_dispach_content">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="drafting-mainform">
                <el-row class="box" :span="24">
                    <el-col :span="12">
                        <el-form-item label="当前环节:" label-width="90px">
                            <span style="color: red">{{currentNode}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="当前处理人:" label-width="100px">
                        <span style="color: red">{{ currentPerson }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>                   
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
                        <el-form-item label="交接类型" prop="Stmp_HndOv_TpCd">
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
                        <el-form-item label="移交人" prop="StmpMain_HndOv_Psn_Nm">
                            <el-input v-model="form.StmpMain_HndOv_Psn_Nm" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="拟稿日期" prop="Stmp_Main_HndOv_Tm">
                            <el-input v-model="form.Stmp_Main_HndOv_Tm" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="接收人" prop="Stmp_Main_Rcv_Psn_ID">                      
                            <el-select v-model="form.Stmp_Main_Rcv_Psn_ID" placeholder="请选择" style="width:100%" @change="getRcvPsnNm" :disabled="readFields.jsr">
                                <el-option v-for="(item,index) in receiveMans"
                                    :key="item.index" :label="item.name" :value="item.userId">
                                </el-option>
                            </el-select>
                            
                        <!--<el-input v-model="form.Stmp_Main_Rcv_Psn_ID" :disabled="formStatus.qichao"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="交出时间" prop = "Stmp_Main_Rcv_Tm">
                            <el-input v-model="form.Stmp_Main_Rcv_Tm" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="交出原因" prop="Stmp_HndOv_Rsn" >
                    <el-input v-model="form.Stmp_HndOv_Rsn" :disabled="readFields.jcyy"></el-input>
                </el-form-item>
                <el-form-item label="审批意见" prop="Stmp_HndOv_Dsc">
                    <el-input v-model="form.Stmp_HndOv_Dsc" :disabled="!editedIdeaFields.spyj"></el-input>        
                </el-form-item>
                <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.Rmrk_Inf_Dsc" :rows="2" :disabled="!editedIdeaFields.remark"></el-input>
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
                :treeTradeCode="treeTradeCode"
                @showCompDialog="showCompDialog">
            </select-person>
        </div>
    </div>
</template>

<script>
    // 设置页面元素显隐、置灰、校验等功能，
    import pageSetMixins from "@/minixs/index";
    // 添加message-one和message-some组件需要用到的方法
    import messageMixins from "@/minixs/messageMixins.js";
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
        mixins: [pageSetMixins, messageMixins],
        data: function data(){
            return {
                buttonList: [
                    {name:'关闭',       show:true,  type:'close'}, 
                    {name:'保存',       show:true,  type:'save'},
                    {name:'生成编号',   show:false, type:'scbh'},
                    {name:'同意接收',   show:false, type:'recv'},
                    {name:'完成并发送', show:false, type:'saveAndSend'},
                    {name:'查看流程',   show:false, type:'flowLook'}],
                allSeals:[],//全部印章 
                 //单位名称
                unitName : JSON.parse(localStorage.unitInfo)[0].unitName,
                receiveMans:[],
                currentNode:'',//当前环节
                currentPerson:'',//当前处理人
                Parm_Next_Lnk_Inst_Dsc: [],        // 下一节点的所有流程
                Parm_Next_Lnk_Inst_Nm: [],         // 下一节点的所有机构
                // 完成并发送相关参数
                singelCheckF: true,     // 单选，多选标志。true-单选 false-多选
                dialogTypeNow: "next",
                dialogType: "dosend",
                offenUse: true,
                loadingTree: true,
                canTab: false,
                // loadingTree: true,      // 是懒加载还是非懒加载
                hasRadio: false,        // 是否单选
                checkOrg: false,
                seletOptionsData: [],   // 环节
                treeData: [],           // 部门（人员树）
                dialogTit: "选择人员",
                checkIds: [], //选中id列表
                checkData: [], //选中数据
                dialogState: false,//显示隐藏
                formdata: {},
                treeTradeCode: '',  // 发文交易线，如果不设置就为默认的2023的交易线，设置了值就用设置的交易线
                //表单数据
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
                    Stmp_Rcv_Chk_InsID:        '',         //接收人机构编号
                    Stmp_Rcv_Chk_Inst_Nm:      '',          //接收人机构名称
                    StmpMainRcvPsnCrdt_No:      '',            //OA交出人部门(12位)
                    StmpMinrRcvPsnCrdt_No:      '',             //OA接收人部门(12位)
                    Stmp_Main_Agnt_Psn_Nm:      '',            //OA保管交接交出人编号
                    Stmp_Minr_Agnt_Psn_Nm:      '',             //OA保管交接接收人编号
                    Stmp_Main_Rcv_Tm:          '',          // 交出时间
                    Stmp_HndOv_Rsn:            '',          // 交出原因
                    Stmp_Aply_ApvOpn_Cd:       '',          //审批意见ID
                    Stmp_HndOv_Dsc:            '',          // 审批意见
                    Rmrk_Inf_Dsc:              '',          // 备注
                    Next_Pcsg_Stff_ID:          '',
                    WrkOrdrNextPcsg_InsID:      '',
                    WrkOrdrNextPcsgPsn_ID:       '',         //工单下一处理人编号
                    WrkOrdrNextPcsgPsn_Nm:       '',         //工单下一处理人名称
                    Node_ID:                     '',         //节点编号
                    Node_Nm:                     '',         //节点名称
                    Unit_Dept_EmpID:            '',         //OA系统humanId
                    Token_Inf_ID:               '',          //OA系统ccbtoken
                    Cur_Pcs_Dsc:            ''        // OA工作流程描述字符串
                },
                readFields:{
                    yzmc:   false,                  //印章名称
                    bh:     false,                   //编号
                    jjlx:   false,                  //交接类型
                    lxdh:   false,                  //联系电话
                    yjr:    false,                   //移交人
                    ngrq:   false,                   //拟搞日期
                    jsr:    false,                  //接收人
                    jcsj:   false,                   //交出时间
                    jcyy:   false,                  //交出原因
                    spyj:   false,                   //审批意见
                    remark: false                   //备注
                },// 不可编辑的控制域（即只读）。设置元素的disabled属性。设置了的为true
                requiredFields:{
                    yzmc:   false,                  //印章名称
                    bh:     false,                   //编号
                    jjlx:   false,                  //交接类型
                    lxdh:   false,                  //联系电话
                    yjr:    false,                   //移交人
                    ngrq:   false,                   //拟搞日期
                    jsr:    false,                  //接收人
                    jcsj:   false,                   //交出时间
                    jcyy:   false                  //交出原因
                },// 必填的控制域。在rules中配置。设置了的为true
                editedIdeaFields: {
                    spyj:   true,                   //审批意见
                    remark: true                   //备注
                },  // 可编辑意见域。设置元素的disabled属性，设置了的为false。我最后又取反了一次，让其与语义相同。(同readFields相反，我也很恼火)
                requiredIdeaFields: {
                    spyj:   false,                   //审批意见
                    remark: false                   //备注
                },  // 必填意见域。在rules中配置。设置了的为true
                stepMessage: {
                    /* 按钮 */
                    visibleButtons: [],                 // 可见操作按钮
                    visibleButtonsBycondition: {},      // 带约束条件的可见操作按钮
                    /* 控制域 */
                    requiredFields: [],                 // 必填控制域
                    readFields: [],                     // 不可编辑控制域
                    /* 意见域 */ 
                    editedIdeaFields: [],               // 可编辑意见域
                    editedIdeaFieldsBycondition: {},    // 带约束条件的可编辑意见域
                    requiredIdeaFields: [],             // 必填意见域
                    /* 后续环节（没有后续环节字段） */
                    acyNodeNextBount: {},               // 带约束条件的后续环节
                    /* 环节特质（没有用） */
                    nodeSpecialAttribute: {},           // 环节特征
                    nodeSpecialAttBycondition: {},      // 带约束条件的环节特征
                },  // 某环节的页面配置原始数据
                finalDocStatus: 'see',  // 最终的页面状态 new-新建 modify-编辑 see-查看 managerModify-管理员编辑
                docStatusMaps: {
                    'new':      '新建',
                    'modify':   '编辑',
                    'see':      '查看'
                },  // 文档状态-名字对应列表
                Cur_Pcs_Dsc: '',        // OA工作流程描述字符串
                aplyId:'',//保管交接申请业务编号
                curPcs: {
                    multiTenancyID: 'CN0036', // 多实体标识ID
                    pcsInst: '',        // 流程实例ID
                    tplNo: '',          // 流程模板ID 
                    pcsActID: '',       // 当前活动ID
                    pcsNodeID: '',      // 当前环节ID
                    pcsNodeNm: '',      // 当前环节名称
                    humanID: '',        // 当前处理人OA编号
                    humanName: '',      // 当前处理人姓名
                },  // OA工作流程描述对象
                rules:{}
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
            //将登录人员的12位机构号转为9位并存储到localStorage里
            this.$sealUtil.setUnitSyncCodeToLocalStorage(this);
           // this.treeTradeCode = this.$businessCode.fawgl;      // 发文交易线
            this.treeTradeCode = this.$businessCode.swgl;           // C003交易线
            this.docStatus = this.$route.query.type || 'see';   // 文档状态 new-新建 modify-编辑 see-查看
            this.finalDocStatus = this.docStatus;               // 文档的最终状态             
            //查询印章保管人清单
            this.$api.sealManage.personLogin.getList({type:"3"})
                .then(res =>{
                    console.log('印章保管人数据：', res);
                    for(var j=0;j<res.data.length;j++){
                        if(res.data[j].huManCode){
                            this.receiveMans.push({name:res.data[j].draftUser,userId:res.data[j].huManCode,oaUserId:res.data[j].draftUserId,partId:res.data[j].draftDepartmentId,orgId:res.data[j].draftOrganId,orgName:res.data[j].draftOrgan});
                        }                        
                    }
                })
                .catch((err) => {
                    console.log('印章保管人查询报错：', err);
                });
            if(this.$route.query.Stmp_HndOv_Bsn_ID){//非起草
                this.aplyId = this.$route.query.Stmp_HndOv_Bsn_ID;   //业务编号
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
                        this.Cur_Pcs_Dsc = res.Stmp_HndOv_Record_Grp[0].Cur_Pcs_Dsc;                             // OA工作流程描述字符串
                        this.form.Cur_Pcs_Dsc = res.Stmp_HndOv_Record_Grp[0].Cur_Pcs_Dsc;                        // OA工作流程描述字符串
                        this.setCurPcs(this.Cur_Pcs_Dsc);
                        //取得印章列表
                        let jsonData = {
                            Mnplt_TpCd : '01',
                            StmpMain_HndOv_Psn_ID : this.form.StmpMain_HndOv_Psn_ID,
                            _pagination:{
                                    PAGE_JUMP:1,
                                    REC_IN_PAGE:100
                                }
                        };
                        this.$api.sealManage.sealKeeperChange.querySealList(jsonData).then(res =>{
                            console.log('印章列表数据：', res, this);
                            for(var j=0;j<res.LIST1.length;j++){
                                this.allSeals.push({label:res.LIST1[j].Stmp_Dspl_Inst_Nm,value:res.LIST1[j].Stmp_ECD});
                            }
                        }).catch((err) => {
                            console.log('印章列表数据查询报错：', err);
                        });
                        this.form.Stmp_ECD=res.Stmp_HndOv_Record_Grp[0].Stmp_ECD;          // 印章编号
                        console.log("当前状态",res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_StCd);
                        if(res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_StCd=="20"){//起草待审批
                            this.currentNode = "起草";
                            this.currentPerson = JSON.parse(localStorage.userInfo).humanName;
                        }else if(res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_StCd=="21"){//审核待移交
                            console.log("审批开始");
                            this.currentNode = "审批";
                            this.currentPerson = JSON.parse(localStorage.userInfo).humanName;
                        }else if(res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_StCd=="22"){//审核待移交
                            console.log("移交开始");
                            this.currentNode = "移交";
                            this.currentPerson = JSON.parse(localStorage.userInfo).humanName;
                        }else if(res.Stmp_HndOv_Record_Grp[0].Stmp_HndOv_StCd=="23"){//移交待接收
                            console.log("接收开始");
                            this.currentNode = "接收";   
                            this.currentPerson = JSON.parse(localStorage.userInfo).humanName;     
                        }
                        setTimeout(() => {
                            this.initProcessRules();
                        }, 200);
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
                this.form.StmpMain_HndOv_Psn_ID = JSON.parse(localStorage.userInfo).syncHumanCode;
                this.form.StmpMain_HndOv_Psn_Nm = JSON.parse(localStorage.userInfo).humanName;
                //移交人OA编号
                this.form.Stmp_Main_Agnt_Psn_Nm = JSON.parse(localStorage.userInfo).humanId+"";
                //移交人OA部门编号(12位)
                this.form.StmpMainRcvPsnCrdt_No = JSON.parse(localStorage.userInfo).currUnitId;
                
                //取得印章列表
                let jsonData = {
                    Mnplt_TpCd : '01',
                    StmpMain_HndOv_Psn_ID : JSON.parse(localStorage.userInfo).syncHumanCode,
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
                this.initProcessRules();
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
                    if(this.receiveMans[i].userId == RcvPsnID){
                        this.form.Stmp_Main_Rcv_Psn_Nm = this.receiveMans[i].name;//接收人名称
                        this.form.StmpMinrRcvPsnCrdt_No = this.receiveMans[i].partId;//接收人OA部门编号
                        this.form.Stmp_Minr_Agnt_Psn_Nm = this.receiveMans[i].oaUserId;//接收人OA编号
                        this.form.Stmp_Rcv_Chk_Inst_Nm = this.receiveMans[i].orgName;//接收机构名称
                        let orgId = this.receiveMans[i].orgId;
                        let that = this;
                        this.$sealUtil.getMappingUnitSync(this,orgId,function(data,res){
                            console.log("转换前机构ID:"+orgId+",转换后的机构ID:"+data);
                            if(data){
                                that.form.Stmp_Rcv_Chk_InsID = data;//接收机构
                            }else{
                                that.$sealUtil.showMsg(this, 'message', 'warning', '机构转换失败', '接收机构转换失败');
                            }
                            
                        });
                    }
                }
            }, 
            //取得编号
            getAplyID(){
                let jsonData={
                    markOrderType:"8",
                    draftOrganId:JSON.parse(localStorage.userInfo)._unitSyncCode  //9位机构ID
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
                            HUMANCODE: JSON.parse(localStorage.userInfo).syncHumanCode, // 处理人的编号
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
                console.log("下一个节点信息："+this.Parm_Next_Lnk_Inst_Dsc+",部门初始信息："+this.Parm_Next_Lnk_Inst_Nm);
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

                this.form.WrkOrdrNextPcsg_InsID = data[0].deptId;    // 下一个环节人所在机构的ID（印章申请审批指定机构ID）
                //this.form.StmpAplyAprvDstInsNm = data[0].deptName;  // 下一个环节人所在机构的名字（印章申请审批指定机构名称）
                this.form.WrkOrdrNextPcsgPsn_ID = data[0].idStr+"";            // 下一个环节人的id
                this.form.WrkOrdrNextPcsgPsn_Nm = data[0].name;           // 下一个环节人的名字
                this.form.Node_ID = params.id;             // 下一个环节的id
                this.form.Node_Nm = params.name;           // 下一个环节的名字
                let isMappingSuccess = false;
                let that = this;
                // 将选择的下一环节所在部门的Id转换为机构Id(同步) ,下一环节人的humanId转换成8位人员编号
                this.$sealUtil.getMappingUnitSync(this, {unitCode: data[0].deptId+'', huManId: data[0].idStr+''}, (orgId, res) => {
                    console.log('转换“完成并发送后”选择的一下环节的部门和人员编号，', orgId, res);
                    // 转换成功。data[0].deptId 下一个环节人所在机构的ID; data[0].idStr 下一个环节人的id
                    if (orgId) {
                        isMappingSuccess = true;
                        //this.form.StmpAplyAprvDstInsID = res.data.unitSyncCode; // 下一个环节人所在机构的ID（印章申请审批指定机构ID）
                        //this.form.StmpAplyAprvDstInsNm = res.data.unitSyncName; // 下一个环节人所在机构的名字（印章申请审批指定机构名称）                
                        that.form.Next_Pcsg_Stff_ID = res.data.humanSyncCode;  // 下一个环节人的id(转换后的，8位)
                        
                    // 转换失败，不能提交
                    } else {
                        that.$sealUtil.showMsg(this, 'message', 'warning', '机构人员转换失败', '下一环节的部门和人员编号转换失败！');
                    }
                }); // 同步
                if (isMappingSuccess === false) { return; }
                let jsonData={};
                jsonData.Next_Pcsg_Stff_ID = this.form.Next_Pcsg_Stff_ID;    // 下一个环节人的id(转换后的，8位)
                jsonData.Stmp_HndOv_Bsn_ID=this.form.Stmp_HndOv_Bsn_ID;         // 印章交接业务编号
                jsonData.WrkOrdrNextPcsgPsn_ID=this.form.WrkOrdrNextPcsgPsn_ID;   // 审批人
                jsonData.WrkOrdrNextPcsgPsn_Nm=this.form.WrkOrdrNextPcsgPsn_Nm;   // 审批人名称
                jsonData.WrkOrdrNextPcsg_InsID  = this.form.WrkOrdrNextPcsg_InsID;//OA审批人部门编号 
                jsonData.Token_Inf_ID = localStorage.st_token;
                console.log("保存的参数列表："+jsonData);
                this.$api.sealManage.sealKeeperChange.sealKeeperChangeUdp(jsonData).then(res =>{
                    console.log('sealKeeperChangeUdp返回的数据：', res, this);                   
                    this.$message({
                        type: "success",
                        showClose: true,
                        offset: 400,
                        message: '印章保管交接起草流转成功！',
                        duration: 2000
                    });
                }).catch((err) => {
                    console.log('印章保管交接数据存档报错：', err);
                    this.$message({
                        type: "error",
                        showClose: true,
                        offset: 400,
                        message: '印章保管交接起草流转失败！\n'+err,
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
                                this.$message({
                                    type: "success",
                                    showClose: true,
                                    offset: 400,
                                    message: '起草印章保管交接成功！',
                                    duration: 2000
                                });
                            })
                            .catch((err) => {
                                console.log('印章保管交接数据存档报错：', err);
                                this.$message({
                                    type: "error",
                                    showClose: true,
                                    offset: 400,
                                    message: '起草印章保管交接失败！<br/>'+err.BK_DESC,
                                    duration: 2000
                                });
                            });
                        }else{
                            this.saveUdpData().then(res =>{
                                console.log('UdpSealKeeperChange返回的数据：', res, this);                             
                                this.$message({
                                    type: "success",
                                    showClose: true,
                                    offset: 400,
                                    message: '印章保管交接变更成功！',
                                    duration: 2000
                                });
                            })
                            .catch((err) => {
                                console.log('印章保管交接数据存档报错：', err);
                                this.$message({
                                    type: "error",
                                    showClose: true,
                                    offset: 400,
                                    message: '印章保管交接变更失败！<br/>'+err.BK_DESC,
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
                                this.$message({
                                    type: "error",
                                    showClose: true,
                                    offset: 400,
                                    message: '起草印章保管交接失败！<br/>'+err.BK_DESC,
                                    duration: 2000
                                });
                            });
                        }else{
                            if(this.currentNode == "起草"){
                                this.showSelectPerson();
                            }else if(this.currentNode == "审批"){
                                //this.form.WrkOrdrNextPcsgPsn_ID=this.form.StmpMain_HndOv_Psn_ID; // 工单下一处理人编号
                                //this.form.WrkOrdrNextPcsgPsn_Nm=this.form.StmpMain_HndOv_Psn_Nm; // 工单下一处理人名称
                                this.saveUdpData().then(res =>{
                                    console.log('UdpSealKeeperChange返回的数据：', res, this);
                                    this.$message({
                                        type: "success",
                                        showClose: true,
                                        offset: 400,
                                        message: '印章保管交接变更成功！',
                                        duration: 2000
                                    });
                                }).catch((err) => {
                                    console.log('印章保管交接数据存档报错：', err);
                                    this.$message({
                                        type: "error",
                                        showClose: true,
                                        offset: 400,
                                        message: '印章保管交接变更失败！<br/>'+err.BK_DESC,
                                        duration: 2000
                                    });
                                });
                            }else if(this.currentNode == "移交"){
                                //this.form.WrkOrdrNextPcsgPsn_ID=this.form.Stmp_Main_Rcv_Psn_ID; // 工单下一处理人编号
                                //this.form.WrkOrdrNextPcsgPsn_Nm=this.form.Stmp_Main_Rcv_Psn_Nm; // 工单下一处理人名称
                                this.saveUdpData().then(res =>{
                                    console.log('UdpSealKeeperChange返回的数据：', res, this);
                                    this.$message({
                                        type: "success",
                                        showClose: true,
                                        offset: 400,
                                        message: '印章保管交接变更成功！',
                                        duration: 2000
                                    });
                                }).catch((err) => {
                                    console.log('印章保管交接数据存档报错：', err);
                                    this.$message({
                                        type: "error",
                                        showClose: true,
                                        offset: 400,
                                        message: '印章保管交接变更失败！<br/>'+err.BK_DESC,
                                        duration: 2000
                                    });
                                });
                            }else if(this.currentNode == "接收"){
                                let jsonData = {};
                                //this.form.WrkOrdrNextPcsgPsn_ID=""; // 工单下一处理人编号
                                //this.form.WrkOrdrNextPcsgPsn_Nm=""; // 工单下一处理人名称
                                this.saveUdpData().then(res =>{
                                    console.log('UdpSealKeeperChange返回的数据：', res, this);
                                    this.$message({
                                        type: "success",
                                        showClose: true,
                                        offset: 400,
                                        message: '印章保管交接变更成功！',
                                        duration: 2000
                                    });
                                }).catch((err) => {
                                    console.log('印章保管交接数据存档报错：', err);
                                    this.$message({
                                        type: "error",
                                        showClose: true,
                                        offset: 400,
                                        message: '印章保管交接变更失败！<br/>'+err.BK_DESC,
                                        duration: 2000
                                    });
                                });    
                            }
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
                /*
                this.$refs['form'].validate((valid)=>{
                    if(!valid){
                        this.$message({type:"error",message:"请检查数据是否填写完整！"});
                    }
                });
                */
                let jsonData={};
                jsonData.Mnplt_TpCd = '01';
                jsonData.Stmp_HndOv_Bsn_ID =this.form.Stmp_HndOv_Bsn_ID;         //业务编号
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
                jsonData.StmpMainRcvPsnCrdt_No = this.form.StmpMainRcvPsnCrdt_No;//OA交出机构编号（12位部门号）
                jsonData.StmpMinrRcvPsnCrdt_No = this.form.StmpMinrRcvPsnCrdt_No;//OA接收机构编号（12位部门号）
                jsonData.Stmp_Main_Agnt_Psn_Nm = this.form.Stmp_Main_Agnt_Psn_Nm;//OA保管交接交出人编号
                jsonData.Stmp_Minr_Agnt_Psn_Nm = this.form.Stmp_Minr_Agnt_Psn_Nm;//OA保管交接接收人编号
                jsonData.Unit_Dept_EmpID = (JSON.parse(localStorage.userInfo).humanId).toString();
                jsonData.Token_Inf_ID = localStorage.st_token;
                console.log("保存的参数列表："+jsonData);
                let that = this;
                //发送交易
                return this.$api.sealManage.sealKeeperChange.sealKeeperChangeAdd(jsonData);
            },
            saveUdpData:function(){
                //表单form验证
                /*
                this.$refs['form'].validate((valid)=>{
                    if(!valid){
                        this.$message({type:"error",message:"请检查数据是否填写完整！"});
                    }
                });
                */
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
                jsonData.Unit_Dept_EmpID = JSON.parse(localStorage.userInfo).humanId+'';
                jsonData.Token_Inf_ID = localStorage.st_token;
                 console.log("保存的参数列表1："+jsonData);
                let that = this;
                //发送交易
                return this.$api.sealManage.sealKeeperChange.sealKeeperChangeUdp(jsonData);
            },
            initProcessRules(){
                this.getLink().then((resArr) => {
                    console.log('获取到配置信息成功：', resArr);
                    console.log('页面模式:', this.finalDocStatus);
                    let [res, stepPageConfig, managerPageConfig, seePageConfig] = resArr;
                    this.stepMessage = res.data;
                    this.stepPageConfig = stepPageConfig;
                    this.managerPageConfig = managerPageConfig;
                    this.seePageConfig = seePageConfig;
                    this.loadPageConfigByDocStatus(this.finalDocStatus);    // 根据页面状态加载页面配置
                    setTimeout(() => {
                        console.log('清除页面初始化时的校验提示信息');
                        if (this.$refs['elForm']) {
                            this.$refs['elForm'].clearValidate();   // 清除校验提示信息
                        }
                    }, 100);
                }, (err) => {
                    console.log('获取页面配置信息失败:', err);
                    var _msg = '获取页面配置信息失败，只能查看！' + this.$sealUtil.getErrorStrInfo(err);
                    this.$sealUtil.showMsg(this, 'notify', 'error', 'APPWFE001报错', _msg);
                    this.finalDocStatus = 'see';
                    this.seePageConfig = this.getSeePageConfig( this.getPageConfig() );
                    this.loadPageConfig(this.seePageConfig);
                });
            },
            // OA工作流程描述对象设置
            setCurPcs(curPcsDsc){
                console.log('setCurPcs开始:',curPcsDsc);
                if (curPcsDsc) {
                    let arr = curPcsDsc.split(',');
                    this.curPcs = {
                        multiTenancyID: arr[0],     // 多实体标识ID
                        pcsInst:        arr[1],     // 流程实例ID
                        tplNo:          arr[2],     // 流程模板ID 
                        pcsActID:       arr[3],     // 当前活动ID
                        pcsNodeID:      arr[4],     // 当前环节ID
                        pcsNodeNm:      arr[5],     // 当前环节名称
                        humanID:        arr[6],     // 当前处理人OA编号
                        humanName:      arr[7],     // 当前处理人姓名
                    };  // OA工作流程描述对象
                }
            },
            // 获取当前环节的查看模式页面配置
            getSeePageConfig(stepPageConfig){
                let config = this.$sealUtil.deepClone(stepPageConfig);
                // 只显示关闭
                config.buttonList = config.buttonList.map(item => {
                    item.show = false;
                    if (item.name === '关闭') { item.show = true; }
                    // if (isManage) {
                    //     if (item.name === '维护') { item.show = true; }
                    //     if (item.name === '查看流程') { item.show = true; }
                    //     if (item.name === '流程调度') { item.show = true; }
                    // }
                    return item;
                });
                // 所有栏位置灰
                this.setObjSelfValues(config.readFields, true);
                this.setObjSelfValues(config.editedIdeaFields, false);
                return config;
            },
            // 获取环节配置信息 params：请求参数
            getLink(params) {
                if (!params) {
                    console.log("申请业务编号aplyId:",this.aplyId,this.curPcs);
                    let _aplyId = this.aplyId;                      // 保管交接申请业务编号
                    let _curPcs = this.curPcs;                      // OA工作流程描述对象
                    if (_aplyId) {  // 审批
                        params = {
                            humanId:        _curPcs.humanID,        // 人员编号
                            multiTenancyId: _curPcs.multiTenancyID, // 多实体标识ID eg:'CN0031'
                            pcsAvyId:       _curPcs.pcsNodeID,      // 当前节点id
                            pcsTpId:        _curPcs.tplNo,          // 流程模板id
                        };
                    } else {    // 起草(新建)
                        params= {
                            humanId:        '',                                             // 人员编号
                            multiTenancyId:  'CN0036',   // 多实体标识ID
                            pcsAvyId:       '',                                             // 当前节点id
                            pcsTpId:        '',                                             // 流程模板id
                        };
                    }
                }
                let promise = this.$api.sealManage.sealCommon.getLink_oneConfig(params).then(res => {
                    /* 初步处理返回的页面配置数据 */
                    console.log("接口获取环节配置信息", res, params);
                    // 成功
                    if (res && res.code.toLowerCase() === "success") {
                        let stepMessage = res.data;
                        // 获取当前环节的页面配置
                        let stepPageConfig = this.getStepPageConfig(stepMessage);
                        // 获取管理员在当前环节的页面配置
                        let managerPageConfig = this.getManagerPageConfig(stepPageConfig);
                        // 获取当前环节查看模式的页面配置
                        let seePageConfig = this.getSeePageConfig(stepPageConfig);
                        // 返回非promise的值会自动被包装为Promise对象，与Promise.resolve([...])相同
                        // Promise的resolve和reject只有一个参数，所以这儿只能把处理的值包含在一起
                        return [res, stepPageConfig, managerPageConfig, seePageConfig];

                    // 失败
                    } else {
                        return Promise.reject(res);
                    }
                });
                return promise;
            },
            // 根据页面状态加载页面配置
            loadPageConfigByDocStatus(finalDocStatus){
                // 新建-new
                if (finalDocStatus === 'new') {
                    this.loadPageConfig(this.stepPageConfig);
                // 编辑-modify
                } else if (finalDocStatus === 'modify') {
                    this.loadPageConfig(this.stepPageConfig);
                // 管理员编辑-managerModify
                } else if (finalDocStatus === 'managerModify') {
                    this.loadPageConfig(this.managerPageConfig);
                // 查看-see
                } else if (finalDocStatus === 'see') {
                    this.loadPageConfig(this.seePageConfig);
                // 其他
                } else {
                    this.loadPageConfig(this.seePageConfig);
                }
            },
            // 加载页面配置信息 TODO:也许不需要深复制
            loadPageConfig(config){
                console.log('要加载的配置文件:',config);
                // 规则
                this.rules = this.$sealUtil.deepClone(config.rules);
                // 按钮
                this.buttonList = this.$sealUtil.deepClone(config.buttonList);
                // 控制域
                this.readFields = this.$sealUtil.deepClone(config.readFields);
                this.requiredFields = this.$sealUtil.deepClone(config.requiredFields);
                // 意见域
                this.editedIdeaFields = this.$sealUtil.deepClone(config.editedIdeaFields);
                this.requiredIdeaFields = this.$sealUtil.deepClone(config.requiredIdeaFields);
                // 强制渲染
                this.$forceUpdate();
            },
            // 获取管理员的配置信息：所有栏位可输入，所有按钮可见，校验规则为当前环节的校验规则
            getManagerPageConfig(stepPageConfig){
                let config = this.$sealUtil.deepClone(stepPageConfig);
                // 所有按钮可见
                config.buttonList = config.buttonList.map(item => {
                    item.show = true;
                    return item;
                });
                // 所有栏位可输入
                this.setObjSelfValues(config.readFields, false);
                this.setObjSelfValues(config.editedIdeaFields, true);
                return config;
            },
            // 保存现在页面的配置信息
            getPageConfig(){
                let config = {};
                config.rules = this.$sealUtil.deepClone(this.rules);
                config.buttonList = this.$sealUtil.deepClone(this.buttonList);
                // 控制域
                config.readFields = this.$sealUtil.deepClone(this.readFields);
                config.requiredFields = this.$sealUtil.deepClone(this.requiredFields);
                // 意见域
                config.editedIdeaFields = this.$sealUtil.deepClone(this.editedIdeaFields);
                config.requiredIdeaFields = this.$sealUtil.deepClone(this.requiredIdeaFields);
                return config;
            },
            // 获取某一环节的页面配置信息
            getStepPageConfig(huanJieMessage){
                let config = {};
                // 按钮
                config.buttonList = this.showButton(
                    this.buttonList,
                    huanJieMessage.visibleButtons,
                    huanJieMessage.visibleButtonsBycondition
                );  
                // 必填控制域
                config.requiredFields = this.setRequiredFields(
                    this.requiredFields,
                    huanJieMessage.requiredFields
                );  
                // 不可编辑控制域。配置了的会设置为true,与语义相同
                config.readFields = this.setReadFields(
                    this.readFields,
                    huanJieMessage.readFields
                ); 
                // 可编辑意见域。配置了的会设置为false,为了与语意相同，这儿反转了一下boolean值
                let editedIdeaFields = this.setEditedIdeaFields(
                    this.editedIdeaFields,
                    huanJieMessage.editedIdeaFields,
                    huanJieMessage.editedIdeaFieldsBycondition
                );  
                config.editedIdeaFields = this.reverseObjSelfValues(editedIdeaFields);  // 反向
                // 必填意见域
                config.requiredIdeaFields = this.setRequiredIdeaFields(
                    this.requiredIdeaFields,
                    huanJieMessage.requiredIdeaFields
                );
                // rules规则(该方法是自己页面写的)
                config.rules = this.setRuleConfig(
                    config.requiredFields, 
                    config.requiredIdeaFields
                );
                return config;        
            },
            // 设置对象自身属性上的所有值为指定值
            setObjSelfValues(obj, value){
                for (const key in obj) {
                    if ( obj.hasOwnProperty(key) ) {
                        obj[key] = value;
                    }
                }
            },
            // 将配置对象自身属性上的值反向，true变为false，false变为true
            reverseObjSelfValues(obj){
                if (typeof obj === 'object') {
                    for (const key in obj) {
                        if ( obj.hasOwnProperty(key) && typeof obj[key] === 'boolean') {
                            // this.$set(obj, key, !obj[key]);
                            obj[key] = !obj[key];
                        }
                    }
                }
                return obj;
            },
            // 设置form表格的rules设置
            setRuleConfig(requiredFields, requiredIdeaFields){
                let rules = {                 
                    Stmp_ECD: [
                        {required: requiredFields.yzmc, message: '请选择印章', trigger: 'change'},
                    ],  // 印章
                     Apl_Aply_ID: [
                        {required: requiredFields.bh, message: '请点击“生成编号”按钮生成编号', trigger: 'blur'},
                    ],  // 编号
                    Stmp_HndOv_TpCd: [
                        {required: requiredFields.jjlx, message: '请选择交接类型', trigger: 'change'}
                    ],  //交接类型
                    Stmp_Main_HndOv_Tm: [
                        // 如果加上type:'date'，则必须为日期对象，否则会报错
                        {required: requiredFields.ngrq, message: '拟稿日期不可为空', trigger: 'change'}
                    ],  // 拟稿日期
                    StmpMain_HndOv_Psn_Nm: [
                        {required: requiredFields.yjr, message: '必须要有移交人', trigger: 'blur'}
                        // { validator: check_stmpAplyPsn, trigger: 'blur' }
                    ],   // 移交人(名字)

                    Stmp_Main_Rcv_Psn_ID: [
                        {required: requiredFields.jsr, message: '请选择接收人', trigger: 'change'}
                    ],  //接收人
                    Stmp_Aply_Psn_Ctc_Tel: [
                        {required: requiredFields.lxdh, pattern: /^[0-9-]+$/, trigger: ['blur', 'change'], message: '请输入（申请人）联系电话（只能为数字和短横线-）'}
                    ],  // 联系电话
                   
                    Stmp_HndOv_Rsn: [
                        {required: requiredFields.jcyy, message: '请输入交出原因', trigger: 'blur'}
                    ],  // 交出原因
                    Stmp_HndOv_Dsc: [
                        {required: requiredFields.spyj, message: '请输入审批意见', trigger: 'blur'}
                    ],  // 审批意见
                };
                return rules;
            },
            watch: {
                'form.isEnabled': function(val){
                    console.log('watch:',val, this);
                },
                // OA工作流程描述字符串
                // 格式为: multiTenancyID多实体标识ID, pcsInst流程实例ID, tplNo流程模板ID, pcsActID当前活动ID,
                // pcsNodeID当前环节ID, pcsNodeNm当前环节名称, humanID当前处理人OA编号, humanName当前处理人姓名
                Cur_Pcs_Dsc: function(newVal, oldVal){
                    console.log('watch->Cur_Pcs_Dsc 1:', newVal, '2:', this.Cur_Pcs_Dsc);
                    if (newVal) {
                        let arr = newVal.split(',');
                        this.curPcs = {
                            multiTenancyID: arr[0],     // 多实体标识ID
                            pcsInst:        arr[1],     // 流程实例ID
                            tplNo:          arr[2],     // 流程模板ID 
                            pcsActID:       arr[3],     // 当前活动ID
                            pcsNodeID:      arr[4],     // 当前环节ID
                            pcsNodeNm:      arr[5],     // 当前环节名称
                            humanID:        arr[6],     // 当前处理人OA编号
                            humanName:      arr[7],     // 当前处理人姓名
                        };  // OA工作流程描述对象
                    }
                }
            }
        }
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