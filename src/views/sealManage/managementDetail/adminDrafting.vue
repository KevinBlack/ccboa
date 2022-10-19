<template>
    <!-- 这是印章管理》管理员查看》（管理员）印章刻制审批 -->
    <div class="adminDrafting" ref="adminDrafting">
        <el-container direction="vertical">
            <!-- header:页头，功能区 -->
            <el-header>
                <div class="common-header">
                    <!-- <div class="back" @click="backDarft">
                        <i class="el-icon-arrow-left"></i>
                        <span>用印管理</span>
                    </div> -->
                    <div class="headerClick grid_comtent">
                        <el-button 
                            v-for="(item, index) in buttonList"
                            v-show="item.show" :key="index"
                            @click="headerBtnClick(item)"  plain  size="small"
                        >{{item.name}}</el-button>
                    </div>
                </div>
            </el-header>
            <!-- <el-header ref="elheader" :style="headerStyles">
                <el-row> 
                    <template v-if="isShowSliderMoveBtns">
                        <el-col :span="1" class="textCenter">
                            不知道为什么修改css更改颜色不生效，即使使用!important。只能使用内联样式修改颜色才生效
                            <el-button type="text" size="small" @click="sliderToLeft">
                                <i class="el-icon-d-arrow-left" style="color:white; font-size:18px;"></i>
                            </el-button>
                        </el-col>
                    </template>
                    <el-col :span="22">
                        <div class="slider-contaner" ref="sliderContaner">
                            <div class="slider" :style="mySliderOffset">
                                <el-button 
                                    v-for="(item, index) in buttonList"
                                    v-show="item.show" :key="index"
                                    @click="headerBtnClick(item)" plain  size="small"
                                >{{item.name}}</el-button>
                            </div>
                        </div>
                    </el-col>
                    <template v-if="isShowSliderMoveBtns">
                        <el-col :span="1" class="textCenter">
                            <el-button type="text" size="small" @click="sliderToRight">
                                <i class="el-icon-d-arrow-right" style="color:white; font-size:18px;"></i> 
                            </el-button>
                        </el-col>
                    </template>
                </el-row>
          </el-header> -->
           <!-- main:页面主体，内容区 -->
          <el-main>
                 <!-- <process-long 
                     v-show="processes.length > 0"
                     :processes="processes" :active="nowProcessActive" :openChangeProcess="openChangeProcess"
                     @step-click="stepClick" @step-mouseover="stepMouseover" @step-mouseout="stepMouseout">
                     <div v-show="showProcessBtns" style="margin-top: 12px;">
                         <el-badge :value="isProcessModify ? 'modify' : ''" class="processOffset">
                             <el-button @click="handleProcessSaveBtn">保存</el-button>
                         </el-badge>
                         <el-badge class="processOffset">
                             <el-button @click="handleProcessCancelBtn">取消</el-button>
                         </el-badge>
                     </div>
                 </process-long> -->
                <div class="title" :style="mainTitleStyle" ref="mainTitle">{{title}}</div>
                <el-form :model="form"  :rules="rules"  ref="elForm"  label-width="100px" class="drafting-mainform">
                    <el-row class="box" :span="24">
                        <el-col :span="8">
                            <el-form-item label="当前环节:" label-width="90px">
                            <span style="color:#f9aa21">{{currentNodeStatus_computed}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="当前处理人:" label-width="90px">
                            <span style="color:#f9aa21">
                                {{storage.userInfo.currUnitName + ' ' + storage.userInfo.humanName}}
                            </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('mgxxfh')}">
                            <el-form-item label="敏感信息防护" prop="Snstv_Inf_IndCd_Origin">
                                <el-checkbox-group v-model="form.Snstv_Inf_IndCd_Origin" :disabled="readFields.mgxxfh">
                                    <el-checkbox label="限制打印" name="type"></el-checkbox>
                                    <el-checkbox label="限制下载" name="type"></el-checkbox>
                                    <el-checkbox label="限制复印" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('yzlb')}">
                            <el-form-item label="印章类别" prop="Stmp_Bsn_Ctlg_ID">
                                <!-- 自定义表单里的label值，这儿在前边添加了红色的*号表示此项必填  -->
                                <!-- <label slot="label"><span class="red">* </span>印章类别</label> -->
                                <el-radio-group v-model="form.Stmp_Bsn_Ctlg_ID" :disabled="readFields.yzlb">
                                    <el-radio v-for="(value, key) in sealTypes" :key="key" :label="key">{{value}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14" :class="{wrap: hasWrap('sqdw')}">
                            <el-form-item label="申请单位"  prop="Stmp_Blng_Inst_Nm">
                                <select-org-or-dept @select="selectDept" :disabled="readFields.sqdw">
                                    <el-input
                                        type="text"  readonly="readonly"  placeholder="请选择申请单位"
                                        suffix-icon="el-icon-arrow-down"
                                        :disabled="readFields.sqdw"
                                        v-model="form.Stmp_Blng_Inst_Nm" >
                                    </el-input>
                                </select-org-or-dept>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :class="{wrap: hasWrap('sqrq')}">
                            <el-form-item label="申请日期" prop="Stmp_Aply_Crt_Tm">
                                <el-date-picker 
                                    style="width: 100%;"
                                    value-format="yyyy-MM-dd"  type="date"  placeholder="请选择日期"
                                    :disabled="readFields.sqrq"  v-model="form.Stmp_Aply_Crt_Tm"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14" :class="{wrap: hasWrap('sqr')}">
                            <el-form-item label="申请人" prop="stmpAplyPsn">
                                <label slot="label"><span class="red">* </span>申请人</label>
                                <el-input 
                                    placeholder="格式：申请人编号_申请人名称" 
                                    v-model="form.stmpAplyPsn" :disabled="readFields.sqr">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :class="{wrap: hasWrap('lxdh')}">
                            <el-form-item label="联系电话" prop="Stmp_Aply_Psn_Ctc_Tel">
                                <el-input 
                                    v-model="form.Stmp_Aply_Psn_Ctc_Tel" :disabled="readFields.lxdh">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('bh')}">
                            <el-form-item label="编号" prop="Apl_Aply_ID">
                                <el-input 
                                    v-model="form.Apl_Aply_ID" :disabled="readFields.bh">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('sqly')}">
                            <el-form-item label="申请理由（刻制依据）" prop="Stmp_Aply_Rsn">
                                <el-input 
                                    type="textarea"  v-model="form.Stmp_Aply_Rsn"
                                    :disabled="readFields.sqly"  :rows="3">
                                </el-input>
                            </el-form-item>
                         </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('kzyzmc')}">
                            <el-form-item label="刻制印章名称" prop="Stmp_Dspl_Inst_Nm">
                                <el-input 
                                    v-model="form.Stmp_Dspl_Inst_Nm" :disabled="readFields.kzyzmc">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('jzmc')}">
                            <el-form-item label="旧章名称" prop="FmNm">
                                <el-input 
                                    v-model="form.FmNm" :disabled="readFields.jzmc">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('sqdwzyfzrqp')}">
                            <el-form-item label="申请单位主要负责人签批" prop="applyDepartApprover_Origin">
                                <label slot="label"><span class="red">*</span>申请单位主要负责人签批</label>
                                <message-some
                                    v-model="form.applyDepartApprover_Origin"
                                    :disabled="!editedIdeaFields.sqdwzyfzrqp"
                                ></message-some>
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.applyDepartApprover_Origin" :key="index">
                                        <message-one
                                            :message="item._message"
                                            :org="item._org"
                                            :user="item._user"
                                            :time="item._time"
                                            :message_modify="item._message_modify"
                                            :org_modify="item._org_modify"
                                            :user_modify="item._user_modify"
                                            :time_modify="item._time_modify"
                                            :index="index"
                                            message_placeholder="请输入审批意见"
                                            @result="handlerResult_applyDepartApprover_Origin"
                                        ></message-one>
                                    </div>
                                </el-card> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('gkglbmsh')}">
                            <el-form-item label="归口管理部门审核" prop="rightApprover_Origin">
                                <!-- TODO:当“印章类别”为“合同专用章”是，本栏必填项 -->
                                <message-some
                                    v-model="form.rightApprover_Origin"
                                    :disabled="!editedIdeaFields.gkglbmsh"
                                ></message-some>
                                <!-- <el-input 
                                    v-model="form.rightApprover" :disabled="readFields.gkglbmsh">
                                </el-input> -->
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.rightApprover_Origin" :key="index">
                                        <message-one
                                            :message="item._message"
                                            :org="item._org"
                                            :user="item._user"
                                            :time="item._time"
                                            :message_modify="item._message_modify"
                                            :org_modify="item._org_modify"
                                            :user_modify="item._user_modify"
                                            :time_modify="item._time_modify"
                                            :index="index"
                                            message_placeholder="请输入审核意见"
                                            @result="handlerResult_rightApprover_Origin"
                                        ></message-one>
                                    </div>
                                </el-card> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('bgssh')}">
                            <el-form-item label="办公室审核" prop="officeApprover_Origin">
                                <label slot="label"><span class="red">* </span>办公室审核</label>
                                <message-some
                                    v-model="form.officeApprover_Origin"
                                    :disabled="!editedIdeaFields.bgssh"
                                ></message-some>
                                <!-- <el-input 
                                    v-model="form.officeApprover" :disabled="readFields.bgssh">
                                </el-input> -->
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.officeApprover_Origin" :key="index">
                                        <message-one
                                            :message="item._message"
                                            :org="item._org"
                                            :user="item._user"
                                            :time="item._time"
                                            :message_modify="item._message_modify"
                                            :org_modify="item._org_modify"
                                            :user_modify="item._user_modify"
                                            :time_modify="item._time_modify"
                                            :index="index"
                                            message_placeholder="请输入审核意见"
                                            @result="handlerResult_officeApprover_Origin"
                                        ></message-one>
                                    </div>
                                </el-card> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('kzdw')}">
                            <el-form-item label="刻制单位" prop="SCCS">
                                <el-input 
                                    v-model="form.SCCS" :disabled="readFields.kzdw">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('pzkzdw')}">
                            <el-form-item label="批准刻制单位（公安部门）" prop="Rtfd_Unit_Sum">
                                <el-input 
                                    v-model="form.Rtfd_Unit_Sum" :disabled="readFields.pzkzdw">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('kzqk')}">
                            <el-form-item label="刻制情况" prop="Insp_StnCm">
                                <el-input 
                                    v-model="form.Insp_StnCm" :disabled="readFields.kzqk">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('kzrq')}">
                            <el-form-item label="刻制日期" prop="Mk_Dt">
                                <!-- <label slot="label"><span class="red">* </span>刻制日期</label> -->
                                <el-date-picker 
                                    style="width: 100%;"
                                    value-format="yyyy-MM-dd" type="date" placeholder="请选择日期"
                                    v-model="form.Mk_Dt" :disabled="readFields.kzrq"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12" :class="{wrap: hasWrap('sfqy')}">
                            <el-form-item label="是否启用" prop="StrtUsInd" >
                                <el-radio-group 
                                    change="isEnabledChange"
                                    v-model="form.StrtUsInd" :disabled="readFields.sfqy">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :class="{wrap: hasWrap('qyrq')}">
                            <el-form-item label="启用日期" prop="Stmp_FTm_StrtUs_Tm">
                                <el-date-picker 
                                    style="width: 100%;"
                                    value-format="yyyy-MM-dd"  type="date"  placeholder="请选择日期"
                                    v-model="form.Stmp_FTm_StrtUs_Tm"  :disabled="readFields.qyrq"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('yzjjfs')}">
                            <el-form-item label="印章交接方式" prop="AgtMd_Dsc">
                                <el-radio-group v-model="form.AgtMd_Dsc" :disabled="readFields.yzjjfs">
                                    <el-radio label="01">自取</el-radio>
                                    <el-radio label="02">邮寄</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12" :class="{wrap: hasWrap('qysj')}">
                            <el-form-item label="取印时间" prop="Data_Acq_Dt" >
                                <!-- <el-input v-model="form.Data_Acq_Dt" :disabled="readFields.qysj"></el-input> -->
                                <el-date-picker 
                                    style="width: 100%;"
                                    type="datetime"  placeholder="请选择取印时间"
                                    v-model="form.Data_Acq_Dt"  :disabled="readFields.qysj"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :class="{wrap: hasWrap('qyr')}">
                            <el-form-item label="取印人" prop="receiveMan">
                                <el-input v-model="form.receiveMan" :disabled="readFields.qyr"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12" :class="{wrap: hasWrap('jysj')}">
                            <el-form-item label="交印时间" prop="handOverDate">
                                <el-date-picker
                                    style="width: 100%;"
                                    type="datetime"  placeholder="请选择交印时间"
                                    v-model="form.handOverDate"  :disabled="readFields.jysj"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :class="{wrap: hasWrap('jyr')}">
                            <el-form-item label="交印人" prop="handOverMan">
                                <el-input v-model="form.handOverMan" :disabled="readFields.jyr"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('bz')}">
                            <el-form-item label="备注" prop="bz">
                                <message-some
                                    v-model="form.remarks_Origin"
                                    :disabled="!editedIdeaFields.bz"
                                ></message-some>
                                <!-- <el-input 
                                    type="textarea"  v-model="form.remarks_Origin" 
                                    :disabled="!editedIdeaFields.bz"  :rows="5">
                                </el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{'not-show': isNotShowAttach}">
                            <el-form-item label="印模图片">
                                <template v-if="sealImgUrl">
                                    <img :src="sealImgUrl"  oncontextmenu="return false;" alt="印模图片" class="img-init">
                                </template>
                                <template v-else>
                                    <el-input value="无" disabled></el-input>
                                </template>
                                <!-- <el-card shadow="none" :body-style="{ padding: '0px' }">
                                </el-card> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-main>
            <!-- 查看流程组件 -->
            <shiwu-flow :tableData="doneProgressList" ref="dialogLine"></shiwu-flow>
            <!-- 上传组件 -->
            <upload-file-to-p9
                :startWork="upFileConfig.start"
                :info="upFileConfig.info"
                :whiteList="upFileConfig.whiteList"
                :maxFileSize="upFileConfig.maxFileSize"
                @result="handlerFileP9Val"
            ></upload-file-to-p9>
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
        </el-container>
    </div>
</template>
<script>
    /*** 印章管理》管理员查看》（管理员）印章刻制审批 ***/

    // 设置页面元素显隐、置灰、校验等功能，
    import pageSetMixins from "@/minixs/index";

    // 导入选人组件（完成并发送时使用）
    import selectPerson from '@/components/tree/tree-fawen'

    // 导入上传文件到P9组件
    import uploadFileToP9 from '@/components/uploadFile/uploadFileToP9'

    // 导入部门机构选择组件
    import selectOrgOrDept from "@/components/select/selectOrgOrDept";

    // 导入流程显示组件
    import processLong from '@/views/sealManage/markMgr/components/process-long.vue'

    // // 导入留言输入显示组件
    // import messageOne from './components/message-one.vue'
    // 导入留言输入显示组件
    import MessageOne from '@/components/optionalfield/message-one.vue'
    import MessageSome from '@/components/optionalfield/message-some.vue'

    // 查看流程组件
    import shiwuFlow from "@/components/viewFlow/shiwuFlow";

    // 导入模拟方法（临时）
    import jkMockAPI from '@/views/sealManage/markMgr/common/jkMockAPI'

    export default {
        name: 'adminDrafting',
        components: {
            // 'process-long' : processLong,
            'select-org-or-dept': selectOrgOrDept,
            // 'message-one': MessageOne,
            'message-some': MessageSome,
            'select-person': selectPerson,
            'upload-file-to-p9': uploadFileToP9,
            'shiwu-flow': shiwuFlow,
        },
        mixins: [pageSetMixins],
        data(){
            return {
                /* 
                    OA工作流程描述字符串（同一流程，多实体标识，模板，流程实例是不变的，活动ID和节点ID会变）
                    格式: multiTenancyID多实体标识ID, pcsInst流程实例ID, tplNo流程模板ID, pcsActID当前活动ID,
                    pcsNodeID当前环节ID, pcsNodeNm当前环节名称, humanID当前处理人OA编号, humanName当前处理人姓名
                */
                Cur_Pcs_Dsc: '',        // OA工作流程描述字符串
                curPcs: {
                    multiTenancyID: 'CN0031', // 多实体标识ID
                    pcsInst: '',        // 流程实例ID
                    tplNo: '',          // 流程模板ID 
                    pcsActID: '',       // 当前活动ID
                    pcsNodeID: '',      // 当前环节ID
                    pcsNodeNm: '',      // 当前环节名称
                    humanID: '',        // 当前处理人OA编号
                    humanName: '',      // 当前处理人姓名
                },  // OA工作流程描述对象
                isManage: false,        // 操作人是否是系统管理员或业务管理员
                doneProgressList: [],   // 已完成的流程
                currentUserId: '',      // 当前环节应当的操作人ID
                currentUserNm: '',      // 当前环节应当的操作人Nm
                draftUserId: '',        // 当前环节实际的操作人ID
                draftUserNm: '',        // 当前环节实际的操作人Nm
                isNotShowAttach: false, // 是否显示印模
                sealImgUrl: '',         // 印模图片的地址
                /* form校验规则，元素显隐，置灰 */
                managerPageConfig: {},  // 页面管理员配置
                onlySeeConfig: {},      // 页面查看配置
                stepPageConfig: {},     // 页面环节配置
                rules: {},              // 校验规则
                activeFields: {
                    mgxxfh:      false,
                    yzlb:        false,
                    sqdw:        false,
                    sqrq:        false,
                    sqr:         false,
                    lxdh:        false,
                    bh:          false,
                    sqly:        false,
                    kzyzmc:      false,
                    jzmc:        false,
                    sqdwzyfzrqp: false,
                    gkglbmsh:    false,
                    bgssh:       false,
                    kzdw:        false,
                    pzkzdw:      false,
                    kzqk:        false,
                    kzrq:        false,
                    sfqy:        false,
                    qyrq:        false,
                    yzjjfs:      false,
                    qysj:        false,
                    qyr:         false,
                    jysj:        false,
                    jyr:         false,
                    bz:          false
                },  // 活动的的控制域（非活动的控制域会遮罩）TODO:自己写的，以后会删除
                readFields: {
                    mgxxfh:     false,  // 敏感信息防护
                    yzlb:       false,  // 印章类别
                    sqdw:       false,  // 申请单位
                    sqrq:       false,  // 申请日期
                    sqr:        false,  // 申请人
                    lxdh:       false,  // 联系电话
                    bh:         false,  // 编号
                    sqly:       false,  // 申请理由（刻制依据）
                    kzyzmc:     false,  // 刻制印章名称
                    jzmc:       false,  // 旧章名称
                    kzdw:       false,  // 刻制单位
                    pzkzdw:     false,  // 批准刻制单位（公安部门）
                    kzqk:       false,  // 刻制情况
                    kzrq:       false,  // 刻制日期
                    sfqy:       false,  // 是否启用
                    qyrq:       false,  // 启用日期
                    yzjjfs:     false,  // 印章交接方式
                    qysj:       false,  // 取印时间
                    qyr:        false,  // 取印人
                    jysj:       false,  // 交印时间
                    jyr:        false,  // 交印人
                },  // 不可编辑的控制域（即只读）。设置元素的disabled属性。设置了的为true
                requiredFields: {
                    mgxxfh:     false,     // 敏感信息防护
                    yzlb:       false,     // 印章类别
                    sqdw:       false,     // 申请单位
                    sqrq:       false,     // 申请日期
                    sqr:        false,     // 申请人
                    lxdh:       false,     // 联系电话
                    bh:         false,     // 编号
                    sqly:       false,     // 申请理由（刻制依据）
                    kzyzmc:     false,     // 刻制印章名称
                    jzmc:       false,     // 旧章名称
                    kzdw:       false,     // 刻制单位
                    pzkzdw:     false,     // 批准刻制单位（公安部门）
                    kzqk:       false,     // 刻制情况
                    kzrq:       false,     // 刻制日期
                    sfqy:       false,     // 是否启用
                    qyrq:       false,     // 启用日期
                    yzjjfs:     false,     // 印章交接方式
                    qysj:       false,     // 取印时间
                    qyr:        false,     // 取印人
                    jysj:       false,     // 交印时间
                    jyr:        false,     // 交印人
                },  // 必填的控制域。在rules中配置。设置了的为true
                editedIdeaFields: {
                    sqdwzyfzrqp:    true,   // 申请单位主要负责人签批
                    gkglbmsh:       true,   // 归口管理部门审核
                    bgssh:          true,   // 办公室审核
                    bz:             true,   // 备注
                },  // 可编辑意见域。设置元素的disabled属性，设置了的为false。我最后又取反了一次，让其与语义相同。(同readFields相反，我也很恼火)
                requiredIdeaFields: {
                    sqdwzyfzrqp:    false,  // 申请单位主要负责人签批
                    gkglbmsh:       false,  // 归口管理部门审核
                    bgssh:          false,  // 办公室审核
                    bz:             false,  // 备注
                },  // 必填意见域。在rules中配置。设置了的为true
                buttonList: [
                    {name: '关闭',      show: true,     type: 'gb'},
                    {name: '保存',      show: false,    type: 'bc'},
                    {name: '完成并发送', show: false,   type: 'wcbfs'},
                    {name: '办结',      show: false,    type: 'bj'},
                    {name: '删除',      show: false,    type: 'shanchu'},
                    {name: '生成编号',  show: false,    type: 'scbh'},
                    {name: '引入印模',  show: false,    type: 'yrym'},
                    {name: '打印处理单', show: false,   type: 'dycld'},
                    {name: '归档打印',  show: false,    type: 'gddy'},
                    {name: '维护',      show: false,    type: 'wh'},
                    {name: '退出维护',  show: false,    type: 'tcwh'},
                    {name: '查看流程',  show: false,    type: 'cklc'},
                    {name: '流程调度',  show: false,    type: 'lcdd'},
                    {name: '操作指南',  show: false,    type: 'czzn'},
                    {name: '收藏',      show: false,    type: 'sc'},
                ],  // 功能按钮.设置了的为true
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
                upFileConfig: {
                    start: false,   // 启动上传附件组件
                    info:  '',      // 上传附件提示信息
                    maxFileSize: 30 * 1024 * 1024,  // 上传文件的最大值，单位为字节，默认为30M
                    whiteList: ['jpg', 'jpeg', 'bmp', 'png', 'gif'],    // 允许上传文件的类型
                },  // 上传配置数据
                aplyId: '',             // 印章刻制申请业务编号,唯一确定一条记录
                docStatus: '',          // 文档状态 new-新建 modify-编辑 see-查看
                storeDocStatus: '',     // 存储的页面状态
                finalDocStatus: 'see',  // 最终的页面状态 new-新建 modify-编辑 see-查看 managerSee-管理员查看 managerModify-管理员编辑
                docStatusMaps: {
                    'new':              '新建',
                    'modify':           '编辑',
                    'see':              '查看',
                    'managerSee':       '管理员查看',
                    'managerModify':    '管理员修改'
                },  // 文档状态-名字对应列表
                currentNodeNm: '',      // 当前环节的名字
                storage: {},            // 当前操作员的信息
                require_process: [],    // 可填的项
                requre_processBtns: [], // 可点击的按钮
                Stmp_Aply_StCd: '',     // 当前所处环节的名称
                // // 功能按钮
                // headerStyles: {},
                // sliderMarginLeft: 0,        // 功能按钮区slider的偏移
                // sliderWidth: 820,           // 功能按钮的宽度
                // sliderContanerWidth: 820,   // 功能按钮包含区域的宽带
                // isShowSliderMoveBtns: true, // 是否显示滑动按钮
                
                sealTypes: [],              // 所有的印章类别，初始化页面时从“印章刻制类别”配制项获取
                applyRegions: [],           // 通过弹出窗口，选择单位，单选，窗口中的单位由本机构中所有一级部门的名称和直属下级行的机构简称组成
                mainTitleFontSize: 35,      // mainTitle的字体大小
                processes: [],              // 所有的流程
                Parm_Next_Lnk_Inst_Dsc: [], // 下一节点的所有流程
                Parm_Next_Lnk_Inst_Nm: [],  // 下一节点的所有机构
                nowProcessLine: '',         // 当前所处的流程
                canChangeProcess: true,     // 是否能修改流程
                showProcessBtns: false,     // 是否显示流程的功能按钮
                savedProcessActive: 2,      // 保存的流程阶段，从0开始
                nowProcessActive: 2,        // 现在所在的流程阶段。从0开始
                tempProcessActive: 2,       // 意向要保存的流程阶段。从0开始
                title: '',                  // 文档的标题
                // 意见域分类标示字段. A01-申请单位主要负责人签批 A02-归口管理部门审核 A03-办公室审核
                ideaFieldFlags: {
                    'A00': 'Stmp_Aprv_TpCd',  // 起草
                    'A01': 'Stmp_Aprv_TpCd',  // 申请单位主要负责人审批
                    'A02': 'Stmp_Aprv_TpCd',  // 申请单位综合处理
                    'A03': 'Stmp_Aprv_TpCd',  // 归口管理部门综合处理
                    'A04': 'Stmp_Aprv_TpCd',  // 归口管理部门领导审批
                    'A05': 'Stmp_Aprv_TpCd',  // 办公室综合处理
                    'A06': 'Stmp_Aprv_TpCd',  // 办公室经办人审核
                    // 'A07': 'Stmp_Aprv_TpCd',  // 办公室领导审批
                    'A21': 'Stmp_Aprv_TpCd',  // 印章保管人处理
                    'A08': 'Stmp_Aprv_TpCd',  // 取印人确认
                    'A09': 'Stmp_Aprv_TpCd',  // 交印人处理
                    'A99': 'Stmp_Aprv_TpCd',  // 完结
                },
                ideaFieldsData: {},          // 意见域的所有数据
                // 表格
                form: {
                    // 页面中不显示的数据
                    Stmp_Engr_Aply_Bsn_ID:  '',         // 印章刻制申请业务编号
                    Next_Human_ID:          '',         // 下一个环节人的id
                    Next_Human_Name:        '',         // 下一个环节人的名字
                    Stmp_Aply_StCd:         '',         // 当前环节的编码
                    StmpAplyAtchP9FileRte:  '',         // 印模/附件
                    // 页面中显示的数据
                    Snstv_Inf_IndCd_Origin: [],          // 敏感信息防护原始数据.数组
                    Snstv_Inf_IndCd:        '',          // 敏感信息防护,字符串
                    Stmp_Bsn_Ctlg_ID:       '',          // 印章类别
                    Stmp_Blng_InsID:        '',          // 申请单位编号
                    Stmp_Blng_Inst_Nm:      '',          // 申请单位名称
                    Stmp_Aply_Crt_Tm:       '',          // 申请日期
                    stmpAplyPsn:            '',         // 申请人
                    Stmp_Aply_Psn_ID:       '',         // 印章申请人编号
                    Stmp_Aply_Psn_Nm:       '',         // 印章申请人名称
                    Stmp_Aply_Psn_Ctc_Tel:  '',          // （申请人）联系电话
                    Apl_Aply_ID:            '',          // 编号
                    Stmp_Aply_Rsn:          '',          // 申请理由（刻制依据）
                    Stmp_Dspl_Inst_Nm:      '',          // 刻制印章名称
                    FmNm:                   '',          // 旧章名称
                    applyDepartApprover_Origin: [],     // 申请单位主要负责人签批
                    rightApprover_Origin:   [],         // 归口管理部门审核
                    officeApprover_Origin:  [],         // 办公室审核
                    SCCS:                   '',         // 刻制单位
                    Rtfd_Unit_Sum:          '',         // 批准刻制单位（公安部门）
                    Insp_StnCm:             '',         // 刻制情况
                    Mk_Dt:                  '',         // 刻制日期
                    StrtUsInd:              '',         // 是否启用
                    Stmp_FTm_StrtUs_Tm:     '',         // 启用日期
                    AgtMd_Dsc:              '',         // 印章交接方式
                    Data_Acq_Dt:            '',         // 取印时间
                    receiveMan:             '',         // 取印人
                    receiveMan_Origin:      [],         // 取印人（原始数据）
                    handOverDate:           '',         // 交印时间
                    handOverMan:            '',         // 交印人
                    handOverMan_Origin:     [],         // 交印人/交印时间（原始数据）
                    remarks_Origin:         [],         // 备注
                    Cur_Pcs_Dsc:            '',         // OA工作流程描述字符串
                },
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
                /* 流程调度 */
                isFlowControl: false,   // 是否是流程调度
            }
        },
        computed: {
            // 当前环节的状态
            currentNodeStatus_computed: function(){
                let n = this.currentNodeNm;         // 当前环节的名字
                let t = this.docStatusNm_computed;    // 文档状态的名字
                return n && t ? n + '(' + t + ')' : (n || '');
            },
            // 文档状态名字
            docStatusNm_computed: function(){
                return this.docStatusMaps[this.docStatus] || '';
            },
            // // 敏感信息防护。数组。格式：['限制打印', '限制复制']
            // Snstv_Inf_IndCd_Computed: {
            //     get: function(){
            //         let arr = [];
            //         // 敏感信息防护，三位字符串，从左至右，每一位分别表示“打印、下载、复制”是否限制。0-不限制 1-限制
            //         let val = this.form.Snstv_Inf_IndCd;
            //         console.log('get:1', val, typeof val);
            //         if (val) {
            //             if (val.charAt(0) === '1' ) { arr.push('限制打印'); }
            //             if (val.charAt(1) === '1' ) { arr.push('限制下载'); }
            //             if (val.charAt(2) === '1' ) { arr.push('限制复印'); }
            //         }
            //         return arr;
            //     },
            //     set: function(arr){
            //         console.log('set:1', arr);
            //         let protect1 = arr.indexOf('限制打印') >= 0 ? '1' : '0',
			// 		    protect2 = arr.indexOf('限制下载') >= 0 ? '1' : '0',
            //             protect3 = arr.indexOf('限制复印') >= 0 ? '1' : '0';
            //         this.form.Snstv_Inf_IndCd = protect1 + protect2 + protect3;
            //     }
            // },
            // // 印章交接方式AgtMd_Dsc 01：自取 02：邮寄
            // AgtMd_Dsc_Computed: {
            //     get: function(){
            //         let temp = this.form.AgtMd_Dsc;
            //         return temp === '01' ? '自取' : (temp === '02' ? '邮寄' : '');
            //     },
            //     set: function(newVal){
            //         this.form.AgtMd_Dsc = newVal === '自取' ? '01' : (newVal === '邮寄' ? '02' : '');
            //     }
            // },

            // 文档标题的样式
            mainTitleStyle: function(){
                return {
                    fontSize: this.mainTitleFontSize + 'px'
                }
            },
            // 是否打开流程图修改功能
            openChangeProcess: function(){
                return this.canChangeProcess && this.showProcessBtns;
            },
            // 流程图是否修改
            isProcessModify: function(){
                return this.nowProcessActive !== this.savedProcessActive;
            },
            // // 功能按钮所在滑块的偏移量
            // mySliderOffset: function(){
            //     return {
            //         'margin-left': this.sliderMarginLeft + 'px'
            //     }
            // },
            // // 取印人
            // receiveMan: function(){
            //     let newVal = this.form.receiveMan_Origin;
            //     console.log('computed:form.receiveMan_Origin:', newVal);
            //     let str = '';
            //     if ( Array.isArray(newVal) ) {
            //         let len = newVal.length;
            //         if (len === 1) {
            //             str = newVal[0].Stmp_Aply_Aprv_Psn_Nm || '';  // 用户名
            //         } else {
            //             for (let i = len - 1; i >= 0; i--) {
            //                 if (newVal[i].Stmp_Aply_Aprv_Psn_Nm) {
            //                     str += newVal[i].Stmp_Aply_Aprv_Psn_Nm + ',';
            //                 }
            //             }
            //             if (str.charAt(str.length - 1) === ',') {
            //                 str = str.slice(0, -1);
            //             }
            //         }
            //     }
            //     return str;
            // },
            // // 交印人
            // handOverMan: function(){
            //     let newVal = this.form.handOverMan_Origin;
            //     console.log('computed:form.handOverMan_Origin:', newVal);
            //     let str = '';
            //     if ( Array.isArray(newVal) ) {
            //         let len = newVal.length;
            //         if (len === 1) {
            //             str = newVal[0].Stmp_Aply_Aprv_Psn_Nm || '';  // 用户名
            //         } else {
            //             for (let i = len - 1; i >= 0; i--) {
            //                 if (newVal[i].Stmp_Aply_Aprv_Psn_Nm) {
            //                     str += newVal[i].Stmp_Aply_Aprv_Psn_Nm + ',';
            //                 }
            //             }
            //             if (str.charAt(str.length - 1) === ',') {
            //                 str = str.slice(0, -1);
            //             }
            //         }
            //     }
            //     return str;
            // },
            // // 交印时间
            // handOverDate: function(){
            //     let newVal = this.form.handOverMan_Origin;
            //     console.log('computed:form.handOverMan_Origin:', newVal);
            //     let time = '';
            //     if ( Array.isArray(newVal) ) {
            //         if (newVal.length >= 1) {
            //             time = newVal[0].Stmp_Aply_Aprv_Tm || '';   // 最新的记录肯定是第一个，因为排序了的
            //         }
            //     }
            //     return time;
            // },
            // // 因为隐藏左边的导航栏时，其尺寸也会变化；如果只在window.resize更新其值会有不一致的问题，导致滑动问题，所以放入计算属性
            // // 因为该计算属性值里没有引用data里的变化值，所以会一直是固定值，所以不能放这儿
            // sliderContanerWidth: function(){
            //     var sliderDom = this.$refs.sliderContaner;
            //     return sliderDom.offsetWidth;   // 获取元素对象的宽度(可见内容的宽度，不包括滚动条和边框)，整形，单位像素。
            // }

            // 是否有遮罩层 // 计算属性传参需要使用闭包的形式
            hasWrap: function(){
                return function(name){
                    return false;
                    // return !this.activeFields[name];
                }
            },
        },
        watch: {
            // 敏感信息防护，数组。eg：['限制打印', '限制复制']
            'form.Snstv_Inf_IndCd_Origin': function(newArr, oldVal){
                console.log('watch->form.Snstv_Inf_IndCd_Origin:', newArr, oldVal);
                let protect1 = '0', protect2 = '0', protect3 = '0';
                if (newArr) {
                    protect1 = newArr.indexOf('限制打印') >= 0 ? '1' : '0',
                    protect2 = newArr.indexOf('限制下载') >= 0 ? '1' : '0',
                    protect3 = newArr.indexOf('限制复印') >= 0 ? '1' : '0';
                }
                this.form.Snstv_Inf_IndCd = protect1 + protect2 + protect3;
            },
            // 敏感信息防护,三位字符串。从左至右，每一位分别表示“打印、下载、复制”是否限制。0-不限制 1-限制
            'form.Snstv_Inf_IndCd': function(newStr, oldVal){
                let arr = [];
                if (newStr) {
                    if (newStr.charAt(0) === '1' ) { arr.push('限制打印'); }
                    if (newStr.charAt(1) === '1' ) { arr.push('限制下载'); }
                    if (newStr.charAt(2) === '1' ) { arr.push('限制复印'); }
                }
                this.form.Snstv_Inf_IndCd_Origin = arr;
            },
            // OA工作流程描述字符串
            // 格式为: multiTenancyID多实体标识ID, pcsInst流程实例ID, tplNo流程模板ID, pcsActID当前活动ID,
            // pcsNodeID当前环节ID, pcsNodeNm当前环节名称, humanID当前处理人OA编号, humanName当前处理人姓名
            Cur_Pcs_Dsc: function(newVal, oldVal){
                if (newVal) {
                    this.curPcs = this.handlerCurPcsDsc(newVal);
                }
            },
            // 当前环节
            'form.Stmp_Aply_StCd': function(newVal, oldVal){
                console.log('watch:当前环节：',newVal);
                if (newVal) {
                    this.currentNodeNm = this.$sealUtil.allNodes[newVal] || newVal;
                }
            },
            // // header的功能按钮区域
            // 'sliderContanerWidth': function(newVal, oldVal){
            //     // 如果sliderContaner的宽度大于所有按钮占用的宽度，隐藏两边的滑动按钮
            //     if (newVal >= this.sliderWidth) {
            //         this.sliderMarginLeft = 0;
            //         this.isShowSliderMoveBtns = false;
            //     } else {
            //         this.isShowSliderMoveBtns = true;
            //     }
            // },
            // 印模图片
            'form.StmpAplyAtchP9FileRte': function(newVal, oldVal){
                console.log('watch -> form.StmpAplyAtchP9FileRte:', newVal, oldVal);
                let that = this;
                if (newVal) {
                    this.$sealUtil.getFileFromP9(newVal, (err, data) => {
                        console.log('从P9获取到的印模图片数据：', err, data);
                        if (!err) {
                            let uuid = this.$sealUtil.generateGUID();
                            this.sealImgUrl = "/ecpweb/getLocalFile.action?relativePath=" + data[0] + "&fileName=" + 
                                    encodeURIComponent(data[1]) + "&openFile=true&ATCH_BTCH_NO=" + uuid;
                        };
                    });
                } else {
                    this.sealImgUrl = '';
                }
            },
            // 申请人。格式：申请人编号_申请人名字
            'form.stmpAplyPsn': function(newVal, oldVal){
                if (newVal) {
                    let arr = newVal.split('_');
                    this.form.Stmp_Aply_Psn_ID = arr[0] || '';
					this.form.Stmp_Aply_Psn_Nm = arr[1] || '';
                } else {
                    this.form.Stmp_Aply_Psn_ID = '';
					this.form.Stmp_Aply_Psn_Nm = '';
                }
            },
            // 申请人编号
            'form.Stmp_Aply_Psn_ID': function(newVal, oldVal){
                if (newVal && this.form.Stmp_Aply_Psn_Nm) {
                    this.form.stmpAplyPsn = newVal + '_' + this.form.Stmp_Aply_Psn_Nm;
                }
            },
            // 申请人名字
            'form.Stmp_Aply_Psn_Nm': function(newVal, oldVal){
                if (this.form.Stmp_Aply_Psn_ID && newVal) {
                    this.form.stmpAplyPsn = this.form.Stmp_Aply_Psn_ID + '_' + newVal;
                }
            },
            // 取印人
            'form.receiveMan_Origin': function(newArr, oldVal){
                console.log('watch -> form.receiveMan_Origin:', newArr, oldVal);
                let str = '';
                if ( Array.isArray(newArr) ) {
                    let len = newArr.length;
                    if (len === 1) {
                        str = newArr[0].Stmp_Aply_Aprv_Psn_Nm || '';  // 用户名
                    } else {
                        for (let i = len - 1; i >= 0; i--) {
                            if (newArr[i].Stmp_Aply_Aprv_Psn_Nm) {
                                str += newArr[i].Stmp_Aply_Aprv_Psn_Nm + ',';
                            }
                        }
                        if (str.charAt(str.length - 1) === ',') {
                            str = str.slice(0, -1);
                        }
                    }
                }
                this.form.receiveMan = str;
            },
            // 交印时间，交印人
            'form.handOverMan_Origin': function(newArr, oldVal){
                console.log('watch -> form.handOverMan_Origin:', newArr, oldVal);
                let time = '',  // 交印时间
                    mans = '';  // 交印人
                if ( Array.isArray(newArr) ) {
                    let len = newArr.length;
                    if (len >= 1) {
                        time = newArr[0].Stmp_Aply_Aprv_Tm || '';   // 最新的记录肯定是第一个，因为排序了的
                        if (len === 1) {
                            mans = newArr[0].Stmp_Aply_Aprv_Psn_Nm || '';
                        } else {
                            for (let i = len - 1; i >= 0; i--) {
                                if (newArr[i].Stmp_Aply_Aprv_Psn_Nm) {
                                    mans += newArr[i].Stmp_Aply_Aprv_Psn_Nm + ',';
                                }
                            }
                            if (mans.charAt(mans.length - 1) === ',') {
                                mans = mans.slice(0, -1);
                            }
                        }
                    }
                }
                this.form.handOverDate = time;
                this.form.handOverMan = mans;
            },
            // // 按钮列表
            // buttonList: function(newVal, oldVal){
            //     let minWidth = 400,     // 按钮区域的最小宽度
            //         showButtonLen = 0,  // 显示的按钮数
            //         buttonWidth = 70;   // 每个按钮的宽度
            //     for (let i = 0, len = newVal.lenth; i < len; i++) {
            //         if (newVal[i].show) { showButtonLen++; }
            //     }
            //     this.sliderWidth = (buttonWidth * showButtonLen) < minWidth ? minWidth : buttonWidth * showButtonLen;
            // }
        },
        methods: {
            /**
             * 分解OA工作流程描述字符串
             * @param {String} str OA工作流程描述字符串。 字符串格式为: 
             *      multiTenancyID多实体标识ID, pcsInst流程实例ID, tplNo流程模板ID, pcsActID当前活动ID,
             *      pcsNodeID当前环节ID, pcsNodeNm当前环节名称, humanID当前处理人OA编号, humanName当前处理人姓名
             * @returns {Object} 处理后的对象
             */
            handlerCurPcsDsc: function(str){
                let curPcs = {
                    multiTenancyID: '',     // 多实体标识ID
                    pcsInst:        '',     // 流程实例ID
                    tplNo:          '',     // 流程模板ID 
                    pcsActID:       '',     // 当前活动ID
                    pcsNodeID:      '',     // 当前环节ID
                    pcsNodeNm:      '',     // 当前环节名称
                    humanID:        '',     // 当前处理人OA编号
                    humanName:      '',     // 当前处理人姓名
                };      // OA工作流程描述对象
                if (str) {
                    let arr = str.split(',');
                    curPcs = {
                        multiTenancyID: arr[0],     // 多实体标识ID
                        pcsInst:        arr[1],     // 流程实例ID
                        tplNo:          arr[2],     // 流程模板ID 
                        pcsActID:       arr[3],     // 当前活动ID
                        pcsNodeID:      arr[4],     // 当前环节ID
                        pcsNodeNm:      arr[5],     // 当前环节名称
                        humanID:        arr[6],     // 当前处理人OA编号
                        humanName:      arr[7],     // 当前处理人姓名
                    };  
                }
                return curPcs;
            },
            // 获取P9的图片
            getImg(p9Id, cb){
                let that = this;
                if (!p9Id) { return; }
                this.$sealUtil.getFileFromP9(p9Id, function(err, data){
                    console.log('获取图片:', err, data);
                    if (err) {
                        this.$message( {message: this.$sealUtil.getErrorStrInfo(err), type: 'error'} );
                        return; 
                    }
                    let uuid = this.$sealUtil.generateGUID();
                    let imgUrl = "/ecpweb/getLocalFile.action?relativePath=" + data[0] + "&fileName=" + 
                                encodeURIComponent(data[1]) + "&openFile=true&ATCH_BTCH_NO=" + uuid;
                    cb(imgUrl);
                });
            },
            // 额外的校验
            moreValidate(callback){
                callback.call(this, null);
            },
            // // 文件上传前检查。fileDom文件对象
            // checkUpFile(fileDom){
            //     let whiteList = ['jpg', 'jpeg', 'bmp', 'png', 'gif'],
            //         maxFileSize = 20 * 1024 * 1024,     // 最大允许上传的文件大小（字节），这儿为20M
            //         fileName = fileDom.value,           // 文件的绝对路径，没选择文件为''
            //         fileSize = fileDom.files[0] ? fileDom.files[0].size : 0;    // 文件的字节大小。未做兼容，不会出问题吧。碎碎念
            //     let fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();  // 文件扩展名
            //     console.log('上传文件信息：', fileName, fileSize, fileExtension);
            //     console.dir(fileDom);
            //     // 检查
            //     if (fileName === '') { return true; }
            //     if ( whiteList.indexOf(fileExtension) < 0 ) {
            //         this.upFileConfig.info = '提示：只允许上传图片，请选择正确的文件格式！';
            //         return false;
            //     }
            //     if (fileSize > maxFileSize) {
            //         this.upFileConfig.info = '提示：最大只支持上传小于20M的文件！'
            //         return false;
            //     }
            //     return true;
            // },
            // 处理上传文件的返回值
            handlerFileP9Val(result){
                console.log('上传返回值：', result);
                // 上传成功，关闭上传弹窗，存储p9Val
                if (result[0] === '0') {
                    this.upFileConfig.toStart = false;
                    this.form.StmpAplyAtchP9FileRte = result[1];
                    if (result[1]) {
                        this.$message( {message: '上传成功！', type: 'success'} );
                    }

                // 上传失败,不关闭上传弹窗，提示错误信息;取消上传，关闭上传弹窗
                } else {
                    // this.form.StmpAplyAtchP9FileRte = result[1];
                    if (result[2]) {    // 上传失败
                        this.upFileConfig.info = this.$sealUtil.getErrorStrInfo(result[2]);
                    } else {            // 取消上传
                        this.upFileConfig.start = false;
                    }
                }
            },
            // 申请单位主要负责人签批 回调
            handlerResult_applyDepartApprover_Origin(index, message, org, user, time){
                console.log('handlerResult_applyDepartApprover_Origin', index, message, org, user, time);
                let item = this.form.applyDepartApprover_Origin[index];
                item._message = message;
                item._org = org;
                item._user = user;
                item._time = time;
            },
            // 归口管理部门审核 回调
            handlerResult_rightApprover_Origin(index, message, org, user, time){
                console.log('handlerResult_rightApprover_Origin：', index, message, org, user, time);
                let item = this.form.rightApprover_Origin[index];
                item._message = message;
                item._org = org;
                item._user = user;
                item._time = time;
            },
            // 办公室审核 回调
            handlerResult_officeApprover_Origin(index, message, org, user, time){
                console.log('handlerResult_officeApprover_Origin：', index, message, org, user, time);
                let item = this.form.officeApprover_Origin[index];
                item._message = message;
                item._org = org;
                item._user = user;
                item._time = time;
            },
            // 标记该环节要使用的意见域对象，提交时只传标记了的意见域信息
            addMarkToUsedIdeaFieldsData(){
                let stcd = this.form.Stmp_Aply_StCd; // 当前所处的环节
                // 环节 A01: '申请单位主要负责人审批'
                if (stcd === 'A01') {
                    this.form.applyDepartApprover_Origin[0]._mark = true;
                // 环节 A03: '归口管理部门综合处理',
                } else if (stcd === 'A04'){
                    this.form.rightApprover_Origin[0]._mark = true;
                // 环节 A06: '办公室经办人审批', A07: '办公室领导审批'
                } else if (stcd === 'A06' || stcd === 'A07') {
                    this.form.officeApprover_Origin[0]._mark = true;
                }
            },
            // 获取该环节使用了的意见域对象，提交时只传标记了的意见域信息
            getMarkedUsedIdeaFieldsData(){
                let arrs = this.compoundIdeaFields(
                        this.form.applyDepartApprover_Origin,
                        this.form.rightApprover_Origin, 
                        this.form.officeApprover_Origin
                    );
                let result = arrs.filter(function(item, index, array){
                    if (item._mark) { return true; }
                });
                console.log('获取的意见域：', result);
                return result;
            },
            /**
             * 给对象数组排序，越新的数据(key的value值越大)越排到数组的前边.
             * @param {Array|*} fields 需要排序的对象数组，其余类型的值直接返回
             * @param {String} key 根据对象指定key值的大小来排序
             * @returns {Array|*} 排序后的对象数组
             */
            sortIdeaFields: function(fields, key){
                if ( !Array.isArray(fields) ) { return fields; }
                if (fields.length === 0) { return fields; }
                let sortFields = fields.sort(function(a, b){
                    let na = Number(a[key]);
                    let nb = Number(b[key]);
                    return nb - na;
                });
                return sortFields;
            },
            /**
             * 多个不同的意见域合成意见域数组
             * @param {Function|Array|Object} myfunc 函数时，是处理message-one对象的函数；数组或对象时，同参数args
             * @param {Array|Object} ...args 要合并的任意多个意见域对象或意见域对象数组
             * @returns {Array} 合并后的意见域对象数组
             */
            compoundIdeaFields(myfunc, ...args){
                // 如果第一个参数不是函数，则为意见域对象或意见域对象数组
                if (typeof myfunc !== 'function') {
                    args.unshift(myfunc);
                }
                let arr = [];
                if (args.length === 0) { return []; }
                for (let i = 0, leni = args.length; i < leni; i++) {
                    arr = arr.concat(args[i]);
                }
                for (let lenj = arr.length, j = lenj - 1; j >= 0; j--) {
                    if (typeof myfunc === 'function') {
                        myfunc(arr[j]);
                    } else {
                        // 如果某项有留言信息则留下，否则剔除掉
                        console.log('j:', j);
                        if (arr[j]._message) {
                            arr[j].Stmp_Aply_Aprv_Tm = arr[j]._time;
                            arr[j].Stmp_Aply_ApvOpn_Dsc = arr[j]._message;
                            arr[j].Stmp_Aply_Aprv_Psn_ID = arr[j]._user.split('_')[1];
                            arr[j].Stmp_Aply_Aprv_Psn_Nm = arr[j]._user.split('_')[0];
                            arr[j].StmpAplyAprvPsnBInsID = arr[j]._org.split('_')[1];
                            arr[j].StmpAplyAprvPBgInstNm = arr[j]._org.split('_')[0];
                        } else {
                            arr.splice(j, 1);
                        }
                    }
                }
                console.log('合并后的意见域', arr, args);
                return arr;
            },
            /**
             * 挑拣出不同的意见域
             * @param {Array | *} list 要挑选的列表数据. eg: [{},...]
             * @param {Object} flags 意见域分类对象。key为分类标示字符串。val为存储分类标示字符串的字段。
             *               eg:{A0:"Stmp_Aprv_TpCd", ...}
             * @param {Function} pinpointFunc 可选，标示是否是指定分类的函数。返回true|false;
             * @return {Object} 分类后的对象。 对象key值为分类标示字符串，val值是包含的对象数组
             */
            pickIdeaFields(list, flags, pinpointFunc){
                let obj = {};
                if ( !Array.isArray(list) ) { list = []; }
                for (let key in flags) {
                    if ( flags.hasOwnProperty(key) ) {
                        let val = flags[key];   // 对象中存储标示字符串的字段
                        // 挑选指定的分类数据
                        let tempArr = list.filter(function(item, index, array){
                            if (typeof pinpointFunc === 'function') {
                                return pinpointFunc(item, key, val);
                            } else {
                                return item[val] === key;
                            }
                        });
                        obj[key] = tempArr;
                    }
                }
                console.log('pickIdeaFields返回的值', obj);
                return obj;
            },
            // 生成Message-one空对象数据
            createMessageOneEmptyData(){
                const userInfo = JSON.parse(localStorage.userInfo);
                let temp = {
                    _message: '',
                    _org: userInfo.currUnitName + '_' + userInfo.currUnitId,
                    _user: userInfo.humanName + '_' + userInfo.humanCode,
                    _time: new Date(),
                    _message_modify: 'enable',
                    _org_modify: 'hidden',
                    _user_modify: 'hidden',
                    _time_modify: 'hidden',
                };
                return temp;
            },
            /**
             * 生成Message-one需要的数据
             * @param {Array | *} list 要处理的某类数据。对象数组
             * @return {Array} 处理后的能作为message-one组件的数组。该数组至少包含一个对象。
             */
            createMessageOneData(list){
                let arr = [];
                let empty = this.createMessageOneEmptyData();   // 空的message-one对象
                /* list不是数组,则生成一个包含空message-one对象的数组 */
                if ( !Array.isArray(list) ) { return [empty]; }

                /* list是数组，则将数组值转化为message-one组件需要的值。如果有待处理项(02)，则将待处理项放在数组首位 */
                if (list.length === 0) { return [empty]; }
                if (list.length > 0) {
                    arr = list.reduce((prev, cur, index) => {
                        if (typeof cur !== 'object') { return prev; }
                        let dsc = cur.hasOwnProperty('Stmp_Aply_ApvOpn_Dsc') ? cur.Stmp_Aply_ApvOpn_Dsc : '',
                            orgId = cur.hasOwnProperty('StmpAplyAprvPsnBInsID') ? cur.StmpAplyAprvPsnBInsID : '',
                            orgNm = cur.hasOwnProperty('StmpAplyAprvPBgInstNm') ? cur.StmpAplyAprvPBgInstNm : '',
                            userId = cur.hasOwnProperty('Stmp_Aply_Aprv_Psn_ID') ? cur.Stmp_Aply_Aprv_Psn_ID : '',
                            userNm = cur.hasOwnProperty('Stmp_Aply_Aprv_Psn_Nm') ? cur.Stmp_Aply_Aprv_Psn_Nm : '',
                            time = cur.hasOwnProperty('Stmp_Aply_Aprv_Tm') ? cur.Stmp_Aply_Aprv_Tm : '';
                        cur._message = dsc;
                        cur._org = (orgId && orgNm) ? orgNm + '_' + orgId : (orgId || orgNm);
                        cur._user = (userId && userNm) ? userNm + '_' + userId : (userId || userNm);
                        cur._time = time;
                        cur._message_modify = 'disable';
                        cur._org_modify = 'disable';
                        cur._user_modify = 'disable';
                        cur._time_modify = 'disable';
                        // 如果是待处理项(审批任务类型Stmp_Aply_ApvOpn_Cd为02，最多只有一条)，则放在首位，否则放在末尾
                        if (cur.Stmp_Aply_ApvOpn_Cd === '02') {
                            cur._message_modify = 'enable';
                            prev.unshift(cur);
                        } else {
                            prev.push(cur);
                        }
                        return prev;
                    }, []);
                }
                console.log('createMessageOneData返回值:', arr, list);
                return arr;
            },

            // A00 起草
            initProcessStep_A00(){
                console.log('初始化页面环节A00 起草');
                // 活动区域
                this.activeFields = {
                    'mgxxfh': true,     // 敏感信息防护
                    'yzlb': true,       // 印章类别
                    'sqdw': true,       // 申请单位
                    'sqrq': true,       // 申请日期
                    'sqr': true,        // 申请人
                    'lxdh': true,       // 联系电话
                    'sqly': true,       // 申请理由
                    'kzyzmc': true,     // 刻制印章名称
                    'jzmc': true,       // 旧章名称
                };

                // 只读区域 TODO:应该全写出来，其余为false.如上
                this.readFields.sqr = true;     // 申请人
                this.readFields.sqrq = true;    // 申请日期

                // 功能按钮
                this.buttonList = [
                    {name: '关闭', type:'guanbi', show: true},
                    {name: '保存', type:'', show: true},
                    {name: '完成并发送', type:'', show: true},
                    {name: '办结', type:'', show: true},
                    {name: '生成编号', type:'', show: false},
                    {name: '引入印模', type:'', show: false},
                    {name: '打印处理单', type:'', show: false},
                    {name: '归档打印', type:'', show: false},
                    {name: '收藏', type:'', show: false},
                    {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    {name: '操作指南', type:'', show: true}
                ];
                // 校验规则
                let check_stmpAplyPsn = (rule, value, cb) => {
                    if (!value) { return cb(new Error('请输入申请人')); }
                    let arr = value.split('_');
                    if (!arr[0] || !arr[1]) { return cb(new Error('请输入完整申请人信息')); }
                    return cb();
                };
                this.rules = {
                    Stmp_Bsn_Ctlg_ID: [
                        {required: true, message: '请选择印章类别', trigger: 'change'},
                    ],  // 印章类别
                    Stmp_Blng_Inst_Nm: [
                        {required: true, message: '请选择申请单位', trigger: 'change'}
                    ],  // 申请单位
                    Stmp_Aply_Psn_Ctc_Tel: [
                        {required: true, message: '请输入（申请人）联系电话', trigger: 'blur'}
                    ],  // 联系电话
                    Stmp_Aply_Crt_Tm: [
                        // 如果加上type:'date'，则必须为日期对象，否则会报错
                        {required: true, message: '请选择申请日期', trigger: 'change'}
                    ],  // 申请日期
                    stmpAplyPsn: [
                        { validator: check_stmpAplyPsn, trigger: 'blur' }
                    ],   // 申请人
                    Stmp_Aply_Rsn: [
                        {required: true, message: '请输入申请理由', trigger: 'blur'}
                    ],  // 申请理由（刻制依据）
                    Stmp_Dspl_Inst_Nm: [
                        {required: true, message: '请输入刻制印章名称', trigger: 'blur'}
                    ],  // 刻制印章名称
                }
            },
            // A01 申请单位主要负责人审批
            initProcessStep_A01(){
                console.log('初始化页面环节A01 申请单位主要负责人审批');
                this.activeFields = {
                    'sqdwzyfzrqp': true,    // 申请单位主要负责人签批
                    'bz': true,             // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = {
                    Stmp_Aply_Psn_Ctc_Tel: [
                        {required: true, message: '请输入（申请人）联系电话', trigger: 'blur'}
                    ],
                    Stmp_Aply_Crt_Tm: [
                        {required: true, message: '请选择申请日期', trigger: 'change'}
                    ],
                }
            },
            // A02 申请单位综合处理
            initProcessStep_A02(){
                console.log('初始化页面环节A02 申请单位综合处理');
                this.activeFields = {
                    bz: true,   // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = {};
            },
            // A03 归口管理部门综合处理
            initProcessStep_A03(){
                console.log('初始化页面环节A03 归口管理部门综合处理');
                this.activeFields = {
                    bz: true,   // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = {};
            },
            // A04 归口管理部门领导审批
            initProcessStep_A04(){
                console.log('初始化页面环节A04 归口管理部门领导审批');
                this.activeFields = {
                    gkglbmsh: true,     // 归口管理部门审核
                    bz:       true,     // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = {
                    // rightApprover: [
                    //     {required: true, message: '请选择申请日期', trigger: 'blur'}
                    // ],
                };
            },
            // A05 办公室综合处理
            initProcessStep_A05(){
                console.log('初始化页面环节A05 办公室综合处理');
                this.activeFields = {
                    bz: true,     // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = { };
            },
            // A06 办公室经办人审核
            initProcessStep_A06(){
                console.log('初始化页面环节A06 办公室经办人审核');
                this.activeFields = {
                    bgssh: true,    // 办公室审核
                    bz:    true,    // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = { };
            },
            // A07 办公室领导审批
            initProcessStep_A07(){
                console.log('初始化页面环节A07 办公室领导审批');
                this.activeFields = {
                    bgssh: true,    // 办公室审核
                    bz:    true,    // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = { };
            },
            // A21 印章保管人处理 
            initProcessStep_A21(){
                console.log('初始化页面环节A21 印章保管人处理');
                this.activeFields = {
                    bh:     true,   // 编号
                    kzdw:   true,   // 刻制单位
                    pzkzdw: true,   // 批准刻制单位
                    kzqk:   true,   // 刻制情况
                    kzrq:   true,   // 刻制日期
                    sfqy:   true,   // 是否启用
                    qyrq:   true,   // 启用日期
                    bz:     true,   // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: true,   type:''},
                    {name: '引入印模',   show: true,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];

                this.rules = {
                    Apl_Aply_ID: [
                        {required: true, message: '请点击“生成编号”按钮生成编号', trigger: 'blur'},
                    ],  // 编号
                    SCCS: [
                        {required: true, message: '请输入刻制单位', trigger: 'blur'}
                    ],  // 刻制单位
                    Rtfd_Unit_Sum: [
                        {required: true, message: '请输入批准刻制单位（公安部门）', trigger: 'blur'}
                    ],  // 批准刻制单位（公安部门）
                    Insp_StnCm: [
                        {required: true, message: '请输入刻制情况', trigger: 'blur'}
                    ],  // 刻制情况
                    Mk_Dt: [
                        {required: true, message: '请选择刻制日期', trigger: 'change'}
                    ],  // 刻制日期
                    StrtUsInd: [
                        { required: true, message: '请选择是否启用', trigger: 'change' }
                    ],   // 是否启用
                    Stmp_FTm_StrtUs_Tm: [
                        {required: true, message: '请选择启用日期', trigger: 'change'}
                    ],  // 启用日期
                };
                // 额外的校验方法
                this.moreValidate = function(callback){
                    // 环节A21——印章保管人处理，需要引入印模
                    if (this.form.Stmp_Aply_StCd === 'A21' && !this.form.StmpAplyAtchP9FileRte) {
                        callback.call(this, new Error('请点击“引入印模”按钮引入印模！'));
                    } else {
                        callback.call(this, null);
                    }
                };
                // 如果没有编号，生成编号
                if (!this.form.Apl_Aply_ID) {
                    this.headerBtnClick( {name: '生成编号', show: true, type:''} );
                }
            },
            // A08 取印人确认
            initProcessStep_A08(){
                console.log('初始化页面环节A08 取印人确认');
                this.activeFields = {
                    yzjjfs: true,   // 印章交接方式
                    qysj:   true,   // 取印时间
                    qyr:    true,   // 取印人
                    bz:     true,   // 备注
                };
                 // 只读区域 TODO:应该全写出来，其余为false.如上
                // this.readFields.qysj = true;    // 取印时间
                this.readFields.qyr = true;     // 取印人
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: true,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = {
                    AgtMd_Dsc: [
                        {required: true, message: '请选择印章交接方式', trigger: 'change'},
                    ],  // 印章交接方式
                };
                /* 填充该环节的初始值 */
                // 如果还没有填写“印章交接方式”，默认自取
                if (!this.form.AgtMd_Dsc) {
                    this.form.AgtMd_Dsc = '01'; // 自取
                }
                // // 填充取印人的编号和名字
                // if (this.form.receiveMan_Origin) {
                //     this.$set(this.form.receiveMan_Origin[0], 'Stmp_Aply_Aprv_Psn_ID', this.storage.userInfo.humanCode + '');
                //     this.$set(this.form.receiveMan_Origin[0], 'Stmp_Aply_Aprv_Psn_Nm', this.storage.userInfo.humanName);
                // }
                // 取印时间
                if (!this.form.Data_Acq_Dt) {
                    this.form.Data_Acq_Dt = new Date();
                }
            },
            // A09 交印人处理
            initProcessStep_A09(){
                console.log('初始化页面环节A09 交印人处理');
                this.activeFields = {
                    jysj:   true,   // 交印时间
                    jyr:    true,   // 交印人
                    bz:     true,   // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: false,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = { };
                /* 填充该环节的初始值 */
                // 交印时间
                if (!this.form.handOverDate) {
                    this.form.handOverDate = new Date();
                }
            },
            // A12 上级行办公室综合处理
            initProcessStep_A12(){
                console.log('初始化页面环节A12 上级行办公室综合处理');
                this.activeFields = { };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = { };
            },
            // A13 上级行印章保管人处理
            initProcessStep_A13(){
                console.log('初始化页面环节A13 上级行印章保管人处理');
                this.activeFields = {
                    bh:     true,   // 编号
                    kzdw:   true,   // 刻制单位
                    pzkzdw: true,   // 批准刻制单位
                    kzqk:   true,   // 刻制情况
                    kzrq:   true,   // 刻制日期
                    sfqy:   true,   // 是否启用
                    qyrq:   true,   // 启用日期
                    bz:     true,   // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: true,   type:''},
                    {name: '引入印模',   show: true,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];

                this.rules = {
                    Apl_Aply_ID: [
                        {required: true, message: '请点击“生成编号”按钮生成编号', trigger: 'blur'},
                    ],  // 编号
                    SCCS: [
                        {required: true, message: '请输入刻制单位', trigger: 'blur'}
                    ],  // 刻制单位
                    Rtfd_Unit_Sum: [
                        {required: true, message: '请输入批准刻制单位（公安部门）', trigger: 'blur'}
                    ],  // 批准刻制单位（公安部门）
                    Insp_StnCm: [
                        {required: true, message: '请输入刻制情况', trigger: 'blur'}
                    ],  // 刻制情况
                    Mk_Dt: [
                        {required: true, message: '请选择刻制日期', trigger: 'change'}
                    ],  // 刻制日期
                    StrtUsInd: [
                        { required: true, message: '请选择是否启用', trigger: 'change' }
                    ],   // 是否启用
                    Stmp_FTm_StrtUs_Tm: [
                        {required: true, message: '请选择启用日期', trigger: 'change'}
                    ],  // 启用日期
                };
                // 额外的校验方法
                this.moreValidate = function(callback){
                    // 环节A13——上级行印章保管人处理，需要引入印模
                    if (this.form.Stmp_Aply_StCd === 'A13' && !this.form.StmpAplyAtchP9FileRte) {
                        callback.call(this, new Error('请点击“引入印模”按钮引入印模！'));
                    } else {
                        callback.call(this, null);
                    }
                };
                // 如果没有编号，生成编号
                if (!this.form.Apl_Aply_ID) {
                    this.headerBtnClick( {name: '生成编号', show: true, type:''} );
                }
            },
            initProcessStep_A16(){
                console.log('初始化页面环节A16:上级行办公室经办人审核');
                this.activeFields = {
                    bgssh:  true,   // 办公室审核
                    bz:     true,   // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = { };
                // 额外的校验方法
                this.moreValidate = function(callback){
                    if (this.form.Stmp_Aply_StCd === 'A17' && !this.form.officeApprover_Origin[0]._message) {
                        callback.call(this, new Error('请在办公室审批栏位填写审批意见！'));
                    } else {
                        callback.call(this, null);
                    }
                };
            },
            initProcessStep_A17(){
                console.log('初始化页面环节A17:上级行办公室领导审批');
                this.activeFields = {
                    bgssh:  true,   // 办公室审核
                    bz:     true,   // 备注
                };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: true,   type:''},
                    {name: '办结',       show: true,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = { };
                // 额外的校验方法
                this.moreValidate = function(callback){
                    if (this.form.Stmp_Aply_StCd === 'A17' && !this.form.officeApprover_Origin[0]._message) {
                        callback.call(this, new Error('请在办公室审批栏位填写审批意见！'));
                    } else {
                        callback.call(this, null);
                    }
                };
            },
            // A99 办结
            initProcessStep_A99(){
                console.log('初始化页面环节A99 办结');
                 this.activeFields = { };
                this.buttonList = [
                    {name: '关闭',       show: true,   type:''},
                    {name: '保存',       show: false,  type:''},
                    {name: '完成并发送',  show: false,   type:''},
                    {name: '办结',       show: false,   type:''},
                    {name: '生成编号',   show: false,   type:''},
                    {name: '引入印模',   show: false,   type:''},
                    {name: '打印处理单', show: false,   type:''},
                    {name: '归档打印',   show: false,   type:''},
                    {name: '收藏',       show: false,   type:''},
                     {name: '维护',      show: true,    type: 'wh'},
                    {name: '查看流程',  show: true,    type: 'cklc'},
                    {name: '流程调度',  show: true,    type: 'lcdd'},
                    // {name: '流程调度',   show: false,   type:''},
                    {name: '操作指南',   show: true,    type:''}, 
                ];
                this.rules = { };
            },
            // 获取环节配置信息 params：请求参数
            getLink(params) {
                if (!params) {
                    if (this.aplyId) {  // 审批
                        params = {
                            humanId:        this.curPcs.humanID,        // 人员编号
                            multiTenancyId: this.curPcs.multiTenancyID, // 多实体标识ID eg:'CN0031'
                            pcsAvyId:       this.curPcs.pcsNodeID,      // 当前节点id
                            pcsTpId:        this.curPcs.tplNo,          // 流程模板id
                        };
                    } else {    // 起草(新建)
                        params= {
                            humanId:        '',         // 人员编号
                            multiTenancyId: 'CN0031',   // 多实体标识ID.刻制是CN0031
                            pcsAvyId:       '',         // 当前节点id
                            pcsTpId:        '',         // 流程模板id
                        };
                    }
                }
                let promise = this.$api.sealManage.sealCommon.getLink_oneConfig(params).then(res => {
                    /* 初步处理返回的页面配置数据 */
                    console.log("接口获取环节配置信息", res);
                    // 成功
                    if (res && res.code.toLowerCase() === "success") {
                        let stepMessage = res.data;
                        // 获取当前环节的页面配置
                        let stepPageConfig = this.getStepPageConfig(stepMessage);
                        // 获取管理员在当前环节的页面配置
                        let managerPageConfig = this.getManageModifyConfig(stepPageConfig);
                        // 获取当前环节查看模式的页面配置
                        let onlySeeConfig = this.getOnlySeeConfig(stepPageConfig);
                        // 返回非promise的值会自动被包装为Promise对象，与Promise.resolve([...])相同
                        // Promise的resolve和reject只有一个参数，所以这儿只能把处理的值包含在一起
                        return [res, stepPageConfig, managerPageConfig, onlySeeConfig];

                    // 失败
                    } else {
                        return Promise.reject(res);
                    }
                });
                return promise;
            },
            // 获取管理员的页面配置信息
            getManageLink(){
                return new Promise((resolve, reject) => {
                    let onlySeeConfig = {},         // 只查看模式配置
                        manageModifyConfig = {},    // 管理员修改模式配置
                        manageSeeConfig = {};       // 管理员查看模式配置
                    manageSeeConfig.buttonList = [
                        {name: '关闭',      show: true,     type: 'gb'},
                        {name: '保存',      show: false,    type: 'bc'},
                        {name: '完成并发送', show: false,   type: 'wcbfs'},
                        {name: '办结',      show: false,    type: 'bj'},
                        {name: '删除',      show: true,    type: 'shanchu'},
                        {name: '生成编号',  show: false,    type: 'scbh'},
                        {name: '引入印模',  show: false,    type: 'yrym'},
                        {name: '打印处理单', show: true,   type: 'dycld'},
                        {name: '归档打印',  show: false,    type: 'gddy'},
                        {name: '维护',      show: true,    type: 'wh'},
                        {name: '退出维护',  show: false,    type: 'tcwh'},
                        {name: '查看流程',  show: true,    type: 'cklc'},
                        {name: '流程调度',  show: true,    type: 'lcdd'},
                        {name: '操作指南',  show: false,    type: 'czzn'},
                        {name: '收藏',      show: false,    type: 'sc'},
                    ];
                    manageSeeConfig.readFields = {
                        mgxxfh:     true,  // 敏感信息防护
                        yzlb:       true,  // 印章类别
                        sqdw:       true,  // 申请单位
                        sqrq:       true,  // 申请日期
                        sqr:        true,  // 申请人
                        lxdh:       true,  // 联系电话
                        bh:         true,  // 编号
                        sqly:       true,  // 申请理由（刻制依据）
                        kzyzmc:     true,  // 刻制印章名称
                        jzmc:       true,  // 旧章名称
                        kzdw:       true,  // 刻制单位
                        pzkzdw:     true,  // 批准刻制单位（公安部门）
                        kzqk:       true,  // 刻制情况
                        kzrq:       true,  // 刻制日期
                        sfqy:       true,  // 是否启用
                        qyrq:       true,  // 启用日期
                        yzjjfs:     true,  // 印章交接方式
                        qysj:       true,  // 取印时间
                        qyr:        true,  // 取印人
                        jysj:       true,  // 交印时间
                        jyr:        true,  // 交印人
                    };  // 不可编辑的控制域（即只读）。设置元素的disabled属性。设置了的为true
                    manageSeeConfig.requiredFields = {
                        mgxxfh:     false,     // 敏感信息防护
                        yzlb:       false,     // 印章类别
                        sqdw:       false,     // 申请单位
                        sqrq:       false,     // 申请日期
                        sqr:        false,     // 申请人
                        lxdh:       false,     // 联系电话
                        bh:         false,     // 编号
                        sqly:       false,     // 申请理由（刻制依据）
                        kzyzmc:     false,     // 刻制印章名称
                        jzmc:       false,     // 旧章名称
                        kzdw:       false,     // 刻制单位
                        pzkzdw:     false,     // 批准刻制单位（公安部门）
                        kzqk:       false,     // 刻制情况
                        kzrq:       false,     // 刻制日期
                        sfqy:       false,     // 是否启用
                        qyrq:       false,     // 启用日期
                        yzjjfs:     false,     // 印章交接方式
                        qysj:       false,     // 取印时间
                        qyr:        false,     // 取印人
                        jysj:       false,     // 交印时间
                        jyr:        false,     // 交印人
                    };  // 必填的控制域。在rules中配置。设置了的为true
                    manageSeeConfig.editedIdeaFields = {
                        sqdwzyfzrqp:    false,   // 申请单位主要负责人签批
                        gkglbmsh:       false,   // 归口管理部门审核
                        bgssh:          false,   // 办公室审核
                        bz:             false,   // 备注
                    };  // 可编辑意见域。设置元素的disabled属性，设置了的为false。我最后又取反了一次，让其与语义相同
                    manageSeeConfig.requiredIdeaFields = {
                        sqdwzyfzrqp:    false,  // 申请单位主要负责人签批
                        gkglbmsh:       false,  // 归口管理部门审核
                        bgssh:          false,  // 办公室审核
                        bz:             false,  // 备注
                    };  // 必填意见域。在rules中配置。设置了的为true
                    manageSeeConfig.rules = {};  // rules规则(不限制管理员)
                    manageModifyConfig = this.getManageModifyConfig(manageSeeConfig);
                    onlySeeConfig = this.getOnlySeeConfig(manageSeeConfig);
                    setTimeout(() => {
                        resolve( {manageSeeConfig, manageModifyConfig, onlySeeConfig} );
                    }, 50);
                });
            },
            // 根据页面状态加载页面配置
            loadPageConfigByDocStatus(finalDocStatus){
                console.log('页面状态模式：', finalDocStatus);
                // 管理员查看-managerSee
                if (finalDocStatus === 'managerSee') {
                    this.loadPageConfig(this.manageSeeConfig);
                // 管理员编辑-managerModify
                } else if (finalDocStatus === 'managerModify') {
                    this.loadPageConfig(this.manageModifyConfig);
                // 其他
                } else {
                    this.loadPageConfig(this.onlySeeConfig);
                }
            },
            // 初始化页面显影规则
            initProcessRules(){
                this.getManageLink().then((configs) => {
                    console.log('获取到配置信息成功：', configs);
                    this.manageSeeConfig = configs.manageSeeConfig;
                    this.manageModifyConfig = configs.manageModifyConfig;
                    this.onlySeeConfig = configs.onlySeeConfig;
                    this.loadPageConfigByDocStatus(this.finalDocStatus);    // 根据页面状态加载页面配置
                    setTimeout(() => {
                        console.log('清除页面初始化时的校验提示信息');
                        if (this.$refs['elForm']) {
                            this.$refs['elForm'].clearValidate();   // 清除校验提示信息
                        }
                    }, 100);
                });
            },
            // 将obj1中的内容复制到obj中
            copyTo(obj, obj1){
                for (let key in obj1) {
                    if ( obj1.hasOwnProperty(key) ) {
                        obj[key] = obj1[key];
                    }
                }
            },
            // 获取联系电话
            getTelMobile(){
                const userInfo = this.storage.userInfo || JSON.parse(localStorage.userInfo);
                let telMobile = '';
                if (typeof userInfo === 'object' && typeof userInfo.telMobile === 'string') {
                    telMobile = userInfo.telMobile.split(',')[0];
                }
                return telMobile;
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

                /* 1.点击取消按钮,结束 */
                if (!status) { return; }

                /* 2.点击确认按钮，提交数据进行审批 */
                this.form.StmpAplyAprvDstInsID = data[0].deptId;    // 下一个环节人所在机构的ID（印章申请审批指定机构ID）
                this.form.StmpAplyAprvDstInsNm = data[0].deptName;  // 下一个环节人所在机构的名字（印章申请审批指定机构名称）
                this.form.Next_Human_ID = data[0].idStr;            // 下一个环节人的id
                this.form.Next_Human_Name = data[0].name;           // 下一个环节人的名字
                this.form.Next_Pcs_Node_ID = params.id;             // 下一个环节的id
                this.form.Next_Pcs_Node_Nm = params.name;           // 下一个环节的名字

                /* 审批结果(印章申请审批意见代码) 01-同意 03-退回到起草 04-修改（流程调度） 05-审批完成（办结） */
                if (this.isFlowControl) {   // 流程调度
                    this.isFlowControl = false;
                    this.form.Stmp_Aply_ApvOpn_Cd = '04';
                } else {                    // 完成并发送
                    let toStep0 = typeof this.form.Node_Nm === 'string' && this.form.Node_Nm.indexOf('起草') >= 0;
                    this.form.Stmp_Aply_ApvOpn_Cd = toStep0 ? '03' : '01';
                }

                /* 审批意见（印章申请审批意见描述） */
                let ideaField = {};
                if ( this.editedIdeaFields['sqdwzyfzrqp'] ){        // 申请单位主要负责人签批
                    ideaField = this.form.applyDepartApprover_Origin[0];
                } else if (this.editedIdeaFields['gkglbmsh'] ) {    // 归口管理部门审核
                    ideaField = this.form.rightApprover_Origin[0];
                } else if ( this.editedIdeaFields['bgssh'] ) {      // 办公室审核
                    ideaField = this.form.officeApprover_Origin[0];
                } else if ( this.editedIdeaFields['bz'] ) {         // 备注
                    ideaField = this.form.remarks_Origin[0];
                }
                console.log('提交的意见域：', ideaField);
                this.form.Stmp_Aply_ApvOpn_Dsc = ideaField._message;

                /* 审批 */
                this.approveMarkMgr( {Mnplt_TpCd: '02'} ).then(res => {
                    console.log('审批成功：', res);
                    // this.$router.push('/sealManage/markMgr');
                    let msg = '审批成功!跟踪号:' + this.$sealUtil.getTraceId(res);
                    let options = {confirmButtonText: '确定', type: 'success', showClose: false};
                    this.$alert(msg, options).then(() => {
                        this.$intent.closeWindow(this);
                    });
                })
                .catch(err => {
                    console.log('审批失败：', err);
                    let msg = this.$sealUtil.getErrorStrInfo(err);
                    this.$message({
                        message: '刻制审批 完成并发送 失败！' + msg,
                        type: 'error'
                    });
                });
            },

            selectOrg(org){ // 还未用
                // unitName, id
                console.log('机构选择组件返回的值：', org);
            },
            selectDept (dept) {
                console.log('机构选择组件返回的部门值：', dept);
                this.form.Stmp_Blng_Inst_Nm = dept.unitName;    // 申请单位(部门)名称
                this.form.Stmp_Blng_InsID   = dept.id;          // 申请单位(部门)编号
            },
            // sliderToLeft(){
            //     // 获取sliderContaner元素的宽度(可见内容的宽度，不包括滚动条和边框)，整形，单位像素
            //     this.sliderContanerWidth = this.$refs.sliderContaner.offsetWidth;
            //     let marginLeft = this.sliderMarginLeft + this.sliderContanerWidth;
            //     this.sliderMarginLeft = marginLeft >= 0 ? 0 : marginLeft;
            // },
            // sliderToRight(){
            //     this.sliderContanerWidth = this.$refs.sliderContaner.offsetWidth;
            //     let maxMarginLeft = [-(this.sliderWidth - this.sliderContanerWidth), 0];    // 最大的偏移
            //     let marginLeft = this.sliderMarginLeft - this.sliderContanerWidth ;
            //     this.sliderMarginLeft = marginLeft <= maxMarginLeft[0] ? maxMarginLeft[0] : marginLeft;
            // },
            // // 当页面尺寸变化时触发的函数。（header滑动按钮的显隐）
            // resizeSlider(event){
            //     // console.log('resizeSlider:', this.$refs);
            //     this.sliderContanerWidth = this.$refs.sliderContaner.offsetWidth;
            //     // 如果sliderContaner的宽度大于所有按钮占用的宽度，隐藏两边的滑动按钮
            //     if (this.sliderContanerWidth >= this.sliderWidth) {
            //         this.sliderMarginLeft = 0;
            //         this.isShowSliderMoveBtns = false;
            //     } else {
            //         this.isShowSliderMoveBtns = true;
            //     }
            // },
            // resizeMainTitle(){
            //     // console.log('resizeMainTitle:',this.$refs);
            //     let mainTitleWidth = this.$refs.mainTitle.offsetWidth;  // 标题的宽度
            //     if (mainTitleWidth <= 400) { 
            //         this.mainTitleFontSize = 16; 
            //     } else if (mainTitleWidth <= 600) {
            //         this.mainTitleFontSize = 20;
            //     } else if (mainTitleWidth <= 800) {
            //         this.mainTitleFontSize = 28;
            //     } else {
            //         this.mainTitleFontSize = 35;
            //     }
            //     // console.log('标题的宽度:', mainTitleWidth, this.mainTitleFontSize);
            // },
            // 点击流程图某节点。 step:触发事件的节点，processes:所有的节点数据
            stepClick(step, processes){
                if (this.openChangeProcess === true) {
                    this.nowProcessActive = step - 1;
                    this.tempProcessActive = step - 1;
                }
            },
            // 移入流程图某节点
            stepMouseover(step, processes){
                if (this.openChangeProcess === true) {
                    this.nowProcessActive = step - 1;
                }
            },
            // 移出流程图某节点
            stepMouseout(step, processes){
                if (this.openChangeProcess === true) {
                    this.nowProcessActive = this.tempProcessActive;
                }
            },
            // 流程保存按钮
            handleProcessSaveBtn: function(){
                let step = this.nowProcessActive;   // 当前要保存的流程
                let that = this;
                jkMockAPI.doAsync('updateProcessChange', true, step)
                    .then(function(step){
                        console.log('修改流程成功', step);
                        that.savedProcessActive = step;
                        that.tempProcessActive = step;
                        that.initProcessStep(that.savedProcessActive + 1, that.nowProcessLine);
                        that.$message({
                            message: '修改流程成功！',
                            type: 'success',
                            showClose: true,
                        });
                    })
                    .catch(function(err){
                        console.log('修改流程失败');
                        that.$message({
                            message: '修改流程失败！',
                            type: 'error',
                            showClose: true,
                        });
                    });
            },
            // 流程取消按钮
            handleProcessCancelBtn: function(){
                this.nowProcessActive = this.savedProcessActive;
                this.tempProcessActive = this.savedProcessActive;
            },
            // 起草保存, op:额外的参数对象
            addNewMarkMgr(op){
                let params = {
                    Snstv_Inf_IndCd:        this.form.Snstv_Inf_IndCd, 		// 敏感信息保护
                    Stmp_Bsn_Ctlg_ID:       this.form.Stmp_Bsn_Ctlg_ID,     // 印章类别
                    Stmp_Blng_InsID:        this.form.Stmp_Blng_InsID,      // 申请单位(印章所属机构编号)
                    Stmp_Blng_Inst_Nm:      this.form.Stmp_Blng_Inst_Nm,    // 申请单位(印章所属机构名称)
                    Stmp_Aply_Crt_Tm:       this.$sealUtil.formatDate(this.form.Stmp_Aply_Crt_Tm, 'yyyy-MM-dd') , // 申请日期
                    Stmp_Aply_Rsn:          this.form.Stmp_Aply_Rsn,        // 申请理由
                    Stmp_Aply_Psn_ID:       this.form.Stmp_Aply_Psn_ID + '',// 印章申请人编号
                    Stmp_Aply_Psn_Nm:       this.form.Stmp_Aply_Psn_Nm,     // 印章申请人名称
                    Stmp_Aply_Psn_Ctc_Tel:  this.form.Stmp_Aply_Psn_Ctc_Tel,// (申请人)联系电话
                    Apl_Aply_ID:            this.form.Apl_Aply_ID + '',     // 编号
                    Stmp_Dspl_Inst_Nm:      this.form.Stmp_Dspl_Inst_Nm,    // 刻制印章名称
                    FmNm:                   this.form.FmNm,                 // 旧章名称
                    Mnplt_TpCd:             '01',                           // 操作类型代码 01-单笔新增
                    Token_Inf_ID:           localStorage.st,                // tokenId
                    Unit_Dept_EmpID:        this.storage.userInfo.humanId + ''  // 员工Id
                };
                this.copyTo(params, op);
                return this.$api.sealManage.markMgr.addMarkMgr(params);
            },
			// 印章刻制审批
			approveMarkMgr(op){
                let params = {
                    Stmp_Aply_Crt_Tm:       this.$sealUtil.formatDate(this.form.Stmp_Aply_Crt_Tm, 'yyyy-MM-dd'),  // 申请日期
					Stmp_Engr_Aply_Bsn_ID:	this.form.Stmp_Engr_Aply_Bsn_ID,// 印章刻制申请业务编号
					Stmp_Aprv_Bsn_ID:		'',		// 印章申请审批业务编号
					Stmp_Aply_ApvOpn_Cd:	this.form.Stmp_Aply_ApvOpn_Cd,  // 印章申请审批意见代码
					Stmp_Aply_ApvOpn_Dsc:	this.form.Stmp_Aply_ApvOpn_Dsc,	// 印章申请审批意见描述
					Stmp_Aply_Psn_Ctc_Tel:	this.form.Stmp_Aply_Psn_Ctc_Tel,// 联系电话
					SCCS:                   this.form.SCCS,                 // 刻制单位（刻章厂）
					Rtfd_Unit_Sum:          this.form.Rtfd_Unit_Sum,        // 批准刻制单位（公安部门）
					Insp_StnCm:		        this.form.Insp_StnCm,		    // 刻制情况
					Mk_Dt:			        this.$sealUtil.formatDate(this.form.Mk_Dt, 'yyyy-MM-dd'),   // 刻制日期
					StrtUsInd:		        this.form.StrtUsInd,		    // 是否启用
					Stmp_FTm_StrtUs_Tm:	    this.$sealUtil.formatDate(this.form.Stmp_FTm_StrtUs_Tm, 'yyyy-MM-dd'),  // 启用日期
					AgtMd_Dsc:	            this.form.AgtMd_Dsc,			// 印章交接方式
                    Data_Acq_Dt:	        this.$sealUtil.formatDate(this.form.Data_Acq_Dt, 'yyyy-MM-dd hh:mm:ss'),    // 取印时间
                    StmpAplyAprvDstInsID:   this.form.StmpAplyAprvDstInsID + '',    // 下一个环节人所在机构的ID（印章申请审批指定机构ID）
                    StmpAplyAprvDstInsNm:   this.form.StmpAplyAprvDstInsNm,         // 下一个环节人所在机构的名字（印章申请审批指定机构名称）
                    Next_Human_ID:          this.form.Next_Human_ID + '',           // 下一个环节人的id
                    Next_Human_Name:        this.form.Next_Human_Name,              // 下一个环节人的名字
                    Next_Pcs_Node_ID:       this.form.Next_Pcs_Node_ID + '',        // 下一个环节的id
                    Next_Pcs_Node_Nm:       this.form.Next_Pcs_Node_Nm,             // 下一个环节的名字
                    Token_Inf_ID:           localStorage.st,                        // tokenId
                    Unit_Dept_EmpID:        this.storage.userInfo.humanId + '',     // 员工Id
                    StmpAplyAtchP9FileRte:  this.form.StmpAplyAtchP9FileRte,        // 印模/附件
                };
                // // 添加意见域
                // let markedIdeaFields = this.getMarkedUsedIdeaFieldsData();
                // if (markedIdeaFields && markedIdeaFields.length > 0) {
                //     params.Stmp_Aply_ApvOpn_Dsc = markedIdeaFields[0].Stmp_Aply_ApvOpn_Dsc; // 印章申请审批意见描述
                //     params.StmpAplyAprvDstInsID = markedIdeaFields[0].StmpAplyAprvDstInsID; // 印章申请审批指定机构号
                //     params.StmpAplyAprvDstInsNm = markedIdeaFields[0].StmpAplyAprvDstInsNm; // 印章申请审批指定机构名称
                //     params.Stmp_Aply_Aprv_Psn_ID = markedIdeaFields[0].Stmp_Aply_Aprv_Psn_ID;   // 印章申请审批人编号
                //     params.Stmp_Aply_Aprv_Psn_Nm = markedIdeaFields[0].Stmp_Aply_Aprv_Psn_Nm;   // 印章申请审批人姓名
                //     params.Stmp_Aprv_TpCd = markedIdeaFields[0].Stmp_Aprv_TpCd;             // 印章申请审批任务类型
                // }

                this.copyTo(params, op);    // op的数据添加到params中
                return this.$api.sealManage.markMgr.approveMarkMgr(params);
            },
            // // 查询印章刻制某条记录的详细信息. id:印章刻制申请业务编号,可以唯一确认一条记录
            // getMarkMgrDetails(id){
            //     let params = {
            //         Token_Inf_ID:           localStorage.st,    // tokenId
            //         Stmp_Engr_Aply_Bsn_ID:  id,                 // 印章刻制申请业务编号
            //         Mnplt_TpCd:             '01',               // 操作类型 01-查询 02-导出
            //     };              
            //     return this.$api.sealManage.markMgr.getMarkMgrDetails(params);
            // },
            // 跳转到打印页 TODO:条件
            toPrintPage(){
                let newPage = this.$router.resolve( {path: "/sealMarkMgrDocument", query: {id: this.aplyId}} );
                window.open(newPage.href, '_blank');
            },
            // 关闭页面
            closePage(){
                // this.$router.push('/sealManage/markMgr');
                // this.$router.go(-1);
                if (this.finalDocStatus === 'see') {
                    this.$intent.closeWindow(this);
                    return;
                }
                let options = {
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    type: "warning",
                    // 区分取消与关闭：触发取消和关闭（点击关闭按钮或遮罩层、按下 ESC 键）时，
                    // Promise 的 reject 回调两种行为的参数分别为 'cancel' 和 'close'
                    distinguishCancelAndClose: true
                };
                this.$confirm("是否保存刚才修改的表单数据?", "提示", options).then(() => {
                    console.log('点击了按钮——是');
                    this.saveData();
                    this.$intent.closeWindow(this);
                })
                .catch((action) => {
                    console.log('点击了按钮——否');
                    if (action === 'cancel') {
                        this.$intent.closeWindow(this); 
                    }
                });
            },
            // 保存数据
            saveData(){
                // 起草（新建）环节
                if (!this.aplyId) {
                    this.addNewMarkMgr()
                        .then(res => {
                            console.log('起草（新建）保存成功：', res);
                            this.$message({
                                message: '起草（新建）保存成功！',
                                type: 'success'
                            });
                        })
                        .catch(err => {
                            console.log('起草（新建）保存失败：', err);
                            let msg = this.$sealUtil.getErrorStrInfo(err);
                            this.$message({
                                message: '起草（新建）保存失败！' + msg,
                                type: 'error'
                            });
                        });
                
                // 审批环节
                } else {
                    this.approveMarkMgr( {Mnplt_TpCd: '01'} )
                        .then(res => {
                            console.log('保存成功：', res);
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                        })
                        .catch(err => {
                            console.log('保存失败：', err);
                            let msg = this.$sealUtil.getErrorStrInfo(err);
                            this.$message({
                                message: '保存失败！' + msg,
                                type: 'error'
                            });
                        });
                }
            },
            // 完成并发送
            saveAndToNext(){
                // 校验form表
                this.$refs['elForm'].validate((valid) => {
                    console.log('校验form表：', valid);
                    // 校验通过
                    if (valid) {
                        // 额外的校验
                        this.moreValidate((err) => {
                            if (err) {
                                this.$message( {type: 'error', message: err.message} );
                                return;
                            }
                            // 处于起草(新建)阶段
                            if (this.form.Stmp_Aply_StCd === 'A00' && !this.aplyId) {
                                this.addNewMarkMgr({Mnplt_TpCd: '02'}).then(res => {
                                    this.aplyId = res.Stmp_Engr_Aply_Bsn_ID;                                // 印章刻制申请业务编号
                                    this.form.Stmp_Engr_Aply_Bsn_ID = res.Stmp_Engr_Aply_Bsn_ID;            // 印章刻制申请业务编号
                                    this.Parm_Next_Lnk_Inst_Dsc = JSON.parse(res.Parm_Next_Lnk_Inst_Dsc);   // 完成并发送下一节点的环节.对象数组
                                    this.Parm_Next_Lnk_Inst_Nm = JSON.parse(res.Parm_Next_Lnk_Inst_Nm);     // 完成并发送下一节点的根部门.对象数组
                                    this.showSelectPerson();
                                })
                                .catch(err => {
                                    console.log('新增刻制记录报错啦：', err);
                                    let msg = this.$sealUtil.getErrorStrInfo(err);
                                    this.$message({
                                        message: '新增刻制记录失败！' + msg,
                                        type: 'error'
                                    });
                                });
                                
                            // 处于审批阶段
                            } else {
                                this.showSelectPerson();
                            }
                        });

                    // 校验失败
                    } else {
                        this.$message( {type: 'error', message: "请填写必填项"} );
                    }
                });
            },
            // 办结
            finish(){
                this.form.Stmp_Aply_ApvOpn_Cd = '05';   // 印章申请审批意见代码 01-同意 05-审批完成
                this.approveMarkMgr({Mnplt_TpCd: '99'}).then(res => {
                    console.log('办结成功：', res);
                    // this.$router.push('/sealManage/markMgr');
                    let msg = '办结成功!跟踪号:' + this.$sealUtil.getTraceId(res);
                    let options = {confirmButtonText: '确定', type: 'success', showClose: false};
                    this.$alert(msg, options).then(() => {
                        this.$intent.closeWindow(this);
                    });
                })
                .catch(err => {
                    console.log('办结失败：', err);
                    let msg = this.$sealUtil.getErrorStrInfo(err);
                    this.$message({
                        message: '办结失败！' + msg,
                        type: 'error'
                    });
                });
            },
            // 生成编号
            makeDocNum(){
                let statusType = this.form.Stmp_Aply_StCd === 'A00' ? false : true;
                let params = {
                    fileNo: undefined,      // 当有漏号时，选择流水号。可不传
                    statusType: statusType, // true 需要生成编号;false 起草时，显示空的编号
                    markOrderType: "4",     // 类型 4-刻制审批 5-废止审批 6-销毁审批
                };
                this.$api.sealManage.getSealNum(params).then(res => {
                    console.log("生成的编号成功:", res);
                    this.form.Apl_Aply_ID = res.data;
                })
                .catch(err => {
                    console.log('生成编号错误：', err);
                    let msg = this.$sealUtil.getErrorStrInfo(err);
                    this.$message( {message:'生成编号错误。' + msg, type:"error"} );
                });
            },
            // 单击功能按钮
            headerBtnClick(btnInfo){
                let btnName = btnInfo.name;
                console.log('你点击了按钮——' + btnName);
                switch (btnName) {
                    case '关闭':
                        this.closePage();
                        break;
                    case '保存':
                        this.saveData();
                        break;
					case '完成并发送':
                        this.saveAndToNext();
						break;
					case '办结':
                        this.finish();
                        break;
                    case '删除':
                        this.delete();
                        break;
                    case '生成编号':
                        this.makeDocNum();
                        break;
                    case '引入印模':
                        this.addAttachImg();
                        break;
                    case '打印处理单':
                        this.toPrintPage();
                        break;
                    case '归档打印':
                        this.toPrintPage();
                        break;
                    case '收藏':
                        break;
                    case '维护':
                        this.storeDocStatus = this.finalDocStatus;
                        this.finalDocStatus = 'managerModify';
                        this.loadPageConfigByDocStatus(this.finalDocStatus);    // 加载管理员的页面配置
                        break;
                    case '退出维护':
                        this.finalDocStatus = this.storeDocStatus;
                        this.loadPageConfigByDocStatus(this.finalDocStatus);    // 加载上次的页面配置
                        break;
                    case '查看流程': 
                        this.toSeeDoneProcess();
                        break;
                    case '流程调度':
                        this.flowControl();
                        break;
                    case '操作指南':
                        this.$message({
                                message: '功能正在开发中，请等待！',
                                type: 'info',
                                showClose: true,
                            });
                        break;
                    default:
                        console.log('你点击了按钮:' +btnName);
                }
            },
            // 添加印模图片
            addAttachImg(){
                this.upFileConfig.info = '请选择要上传的印模图片！最大只支持小于30M的文件';
                this.upFileConfig.start = true;
            },
            // 删除
            delete(){
                this.$message({message:'还未实现！', type:'info'});
            },
            // 流程调度
            flowControl(){
                if (!this.isManage) {
                    this.$message({message: '只有管理员才能进行流程调度！', type: 'warning', showClose: true});
                    return;
                }
                if (this.aplyId) {
                    let params = {
                        Token_Inf_ID:           localStorage.st,    // tokenId
                        Stmp_Engr_Aply_Bsn_ID:  this.aplyId,        // 印章刻制申请业务编号
                        Mnplt_TpCd:             '03',               // 操作类型 01-查询 02-导出 03-查询详情
                    };
                    this.$api.sealManage.markMgr.getMarkMgrDetails(params).then(res => {
                        console.log('查询所有的环节:', res);
                        // 所有的环节
                        this.seletOptionsData = res.Parm_Next_Lnk_Inst_Dsc ? JSON.parse(res.Parm_Next_Lnk_Inst_Dsc) : [];
                        // 部门初始数据（选择部门）
                        this.treeData = res.Parm_Next_Lnk_Inst_Nm ? JSON.parse(res.Parm_Next_Lnk_Inst_Nm) : [];
                        // 显示选人弹窗
                        this.dialogState = true;
                        // 设置流程调度标示
                        this.isFlowControl = true;
                    });
                }
            },
            // 查看（已完成的）流程
            toSeeDoneProcess(){
                // 新建阶段
                if (!this.aplyId) {
                    this.doneProgressList = [{
                            DSC: '',                                    // 处理记录
                            EXCNM: this.storage.userInfo.humanName,     // 处理人的名字
                            HUMANCODE: this.storage.userInfo.humanCode, // 处理人的编号
                            NODE: "起草（新建）",                        // 环节
                            TM: this.form.Stmp_Aply_Crt_Tm              // 操作/申请时间
                    }];
                    this.$refs.dialogLine.openDialog();
                    return;
                }
                // 审批阶段。pcsInst-流程实例ID
                let params = {curProcessInstId: this.curPcs.pcsInst};
                this.$api.sealManage.sealCommon.getLink_done(params)
                    .then(res => {
                        console.log('toSeeDoneProcess返回的数据:', res, params);
                        this.doneProgressList = res.data;
                        this.$nextTick(() => {
                            this.$refs.dialogLine.openDialog();
                        });
                    });
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
                // // 如果是管理员，显示“流程调度”和“维护”按钮  TODO:以后应该要删除下边代码，直接就配置了
                // if (this.isManage) {
                //     config.buttonList = config.buttonList(item => {
                //         if (item.name ==='流程调度') { item.show = true; }
                //         if (item.name ==='维护') { item.show = true; }
                //         return item;
                //     });
                // }
                return config;        
            },
            // 设置form表格的rules设置
            setRuleConfig(requiredFields, requiredIdeaFields){
                let rules = {
                    Snstv_Inf_IndCd_Origin: [
                        {required: requiredFields.mgxxfh, message: '敏感信息防护', trigger: 'change'}
                    ],  // 敏感信息防护
                    Stmp_Bsn_Ctlg_ID: [
                        {required: requiredFields.yzlb, message: '请选择印章类别', trigger: 'change'},
                    ],  // 印章类别
                    Stmp_Blng_Inst_Nm: [
                        {required: requiredFields.sqdw, message: '请选择申请单位', trigger: 'change'}
                    ],  // 申请单位
                    Stmp_Aply_Crt_Tm: [
                        // 如果加上type:'date'，则必须为日期对象，否则会报错
                        {required: requiredFields.sqrq, message: '请选择申请日期', trigger: 'change'}
                    ],  // 申请日期
                    stmpAplyPsn: [
                        { required: requiredFields.sqr, message: '必须有申请人', trigger: 'blur' }
                        // { validator: check_stmpAplyPsn, trigger: 'blur' }
                    ],   // 申请人
                    Stmp_Aply_Psn_Ctc_Tel: [
                        {required: requiredFields.lxdh, message: '请输入（申请人）联系电话', trigger: 'blur'}
                    ],  // 联系电话
                    Apl_Aply_ID: [
                        {required: requiredFields.bh, message: '请点击“生成编号”按钮生成编号', trigger: 'blur'},
                    ],  // 编号
                    Stmp_Aply_Rsn: [
                        {required: requiredFields.sqly, message: '请输入申请理由', trigger: 'blur'}
                    ],  // 申请理由（刻制依据）
                    Stmp_Dspl_Inst_Nm: [
                        {required: requiredFields.kzyzmc, message: '请输入刻制印章名称', trigger: 'blur'}
                    ],  // 刻制印章名称
                    FmNm: [
                        {required: requiredFields.jzmc, message: '请输入旧章名称', trigger: 'blur'}
                    ],  // 旧章名称
                    applyDepartApprover_Origin: [
                        {required: requiredIdeaFields.sqdwzyfzrqp, message: '申请单位主要负责人签批必填', trigger: 'blur'}
                    ],  // 申请单位主要负责人签批
                    rightApprover_Origin: [
                        {required: requiredIdeaFields.gkglbmsh, message: '归口管理部门审核必填', trigger: 'blur'}
                    ],  // 归口管理部门审核
                    officeApprover_Origin: [
                        {required: requiredIdeaFields.bgssh, message: '办公室审核必填', trigger: 'blur'}
                    ],  // 办公室审核
                    SCCS: [
                        {required: requiredFields.kzdw, message: '请输入刻制单位', trigger: 'blur'}
                    ],  // 刻制单位
                    Rtfd_Unit_Sum: [
                        {required: requiredFields.pzkzdw, message: '请输入批准刻制单位（公安部门）', trigger: 'blur'}
                    ],  // 批准刻制单位（公安部门）
                    Insp_StnCm: [
                        {required: requiredFields.kzqk, message: '请输入刻制情况', trigger: 'blur'}
                    ],  // 刻制情况
                    Mk_Dt: [
                        {required: requiredFields.kzrq, message: '请选择刻制日期', trigger: 'change'}
                    ],  // 刻制日期
                    StrtUsInd: [
                        { required: requiredFields.sfqy, message: '请选择是否启用', trigger: 'change' }
                    ],   // 是否启用
                    Stmp_FTm_StrtUs_Tm: [
                        {required: requiredFields.qyrq, message: '请选择启用日期', trigger: 'change'}
                    ],  // 启用日期
                    AgtMd_Dsc: [
                        {required: requiredFields.yzjjfs, message: '请选择印章交接方式', trigger: 'change'},
                    ],  // 印章交接方式
                    Data_Acq_Dt: [
                        {required: requiredFields.qysj, message: '取印时间必填', trigger: 'change'},
                    ],  // 取印时间
                    qyr: [
                        {required: requiredFields.qyr, message: '取印人必填', trigger: 'blur'},
                    ],  // 取印人
                    jysj: [
                        {required: requiredFields.jysj, message: '交印时间必填', trigger: 'change'},
                    ],  // 交印时间
                    jyr: [
                        {required: requiredFields.jyr, message: '交印人必填', trigger: 'blur'},
                    ],  // 交印人
                    bz: [
                        {required: requiredIdeaFields.bz, message: '备注必填', trigger: 'blur'},
                    ],  // 备注
                };
                return rules;
            },
            // 获取管理员的配置信息：所有栏位可输入，显示退出维护和保存按钮，隐藏维护按钮
            getManageModifyConfig(stepPageConfig){
                let config = this.$sealUtil.deepClone(stepPageConfig);
                config.buttonList = config.buttonList.map(item => {
                    if (item.name === '退出维护') { item.show = true; }
                    if (item.name === '维护') { item.show = false; }
                    if (item.name === '保存') { item.show = true; }
                    return item;
                });
                // 所有栏位可输入
                this.setObjSelfValues(config.readFields, false);
                this.setObjSelfValues(config.editedIdeaFields, true);
                return config;
            },
            // 获取只查看模式页面配置（全部栏位置灰，只显示关闭按钮）
            getOnlySeeConfig(stepPageConfig){
                let config = this.$sealUtil.deepClone(stepPageConfig);
                // 只显示关闭
                config.buttonList = config.buttonList.map(item => {
                    item.show = false;
                    if (item.name === '关闭') { item.show = true; }
                    return item;
                });
                // 所有栏位置灰
                this.setObjSelfValues(config.readFields, true);
                this.setObjSelfValues(config.editedIdeaFields, false);
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
            // 初始化指定流程 line:所处流程线。'inner':行内流程 outer:行外流程
            initProcessStep(step, line){
                console.log('initProcessStep', step, line);
                step = (typeof step === 'string' || typeof step === 'number') ? step + '' : '1';
                line = (typeof line === 'string' || typeof line === 'number') ? line + '' : 'innerProcess';
                let processes = {
                    innerProcess: {  // 行内流程
                        '1': 'initProcessStep1',        // 1.起草
                        '2': 'initProcessStep2',        // 2.申请单位主要负责人审批
                        '3': 'initProcessStep3',        // 3.申请单位综合处理
                        '4': 'initInnerProcessStep4',   // 4.归口管理部门综合处理
                        '5': 'initInnerProcessStep5',   // 5.归口管理部门领导审批
                        '6': 'initInnerProcessStep6',   // 6.办公室综合处理
                        '7': 'initInnerProcessStep7',   // 7.办公室经办人审核
                        '8': 'initInnerProcessStep8',   // 8.办公室领导审批
                        '9': 'initInnerProcessStep9',   // 9.印章保管人处理
                        '10': 'initInnerProcessStep10', // 10.取印人确认
                        '11': 'initInnerProcessStep11', // 11.交印人确认
                    },
                    outerProcess: {
                        '1': 'initProcessStep1',        // 1.起草
                        '2': 'initProcessStep2',        // 2.申请单位主要负责人审批
                        '3': 'initProcessStep3',        // 3.申请单位综合处理
                        '4': 'initOuterProcessStep4',   // 4.上级行办公室综合处理
                        '5': 'initOuterProcessStep5',   // 5.上级行办公室经办人审核
                        '6': 'initOuterProcessStep6',   // 6.上级行办公室领导审批
                        '7': 'initOuterProcessStep7',   // 7.上级行印章保管人处理
                        '8': 'initOuterProcessStep8',   // 8.取印人确认
                        '9': 'initOuterProcessStep9',   // 9.上级行交印人处理
                    }
                };
                // 执行指定的初始化函数
                this[ processes[line][step] ]();
            },

            // 行内印章刻制初始化流程5——归口管理部门领导审批
  

            // 跨行印章刻制初始化流程4——上级行办公室综合处理
            initOuterProcessStep4(){
                let requiredInput = ['上级行办公室经办人审核'];
                this.require_process = requiredInput;
            },

            // 跨行印章刻制初始化流程5——上级行办公室经办人审核
            initOuterProcessStep5(){
                let requiredInput = ['办公室审核'];
                this.require_process = requiredInput;
            },
            
            // 跨行印章刻制初始化流程6——上级行办公室领导审批
            initOuterProcessStep6(){
                let requiredInput = ['办公室审核'];
                this.require_process = requiredInput;
            },

            // 跨行印章刻制初始化流程7——上级行印章保管人处理
            initOuterProcessStep7(){
                let requiredInput = ['刻制单位', '批准刻制单位', '刻制情况', '是否启用', '启用时间'];
                let requiredBtns = ['生成编号'];
                this.require_process = requiredInput;
                this.requre_processBtns = requiredBtns;
            },

            // 跨行印章刻制初始化流程8——取印人确认
            initOuterProcessStep8(){
                let requiredInput = ['取印人', '取印时间', '印章交接方式'];
                this.require_process = requiredInput;
            },

            // 跨行印章刻制初始化流程9——上级行交印人处理
            initOuterProcessStep9(){
                let requiredInput = ['印章交接方式', '交印时间', '交印人'];
                let requiredBtns = ['办结'];
                this.require_process = requiredInput;
                this.requre_processBtns = requiredBtns;
            },
            // // resize事件触发的函数
            // resizeWorks(event){
            //     // console.log('resize事件触发函数：', this.$refs);
            //     this.resizeSlider();
            //     this.resizeMainTitle();
            // },
            // // scroll事件触发的函数
            // scrollWorks(event){
            //     // console.log('scroll事件触发函数：', this, this.$refs);
            //     // 滚动时按钮区header固定到顶部不随着滚动
            //     let headerDom = this.$refs.elheader.$el;    // 按钮区header
            //     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  // 滚动的距离
            //     // console.log('元素：',headerDom, scrollTop);
            //     if (scrollTop > 0) {
            //         this.headerStyles = {
            //             position: 'absolute',
            //             top: (scrollTop - 65) + 'px'
            //         }
            //     } else {
            //         this.headerStyles = {
            //             position: 'static',
            //             top: '0'
            //         }
            //     }
            // },
            /**
             * 处理意见域的数据。分类，排序，加工生成意见域的初始数据（越新的数据越排在数组的前边）
             * @param list  {Array}     要处理的意见域原始数据
             * @param flags {Object}    分类的类型及标志。eg： {'A00': 'Stmp_Aprv_TpCd', 'A01': 'Stmp_Aprv_TpCd'}
             * @param cb    {Function}  回调函数。参数是分类处理后的对象
             */
            handlerIdeaFields(list, flags, cb){
                let results = {};
                let picks = this.pickIdeaFields(list, flags);    // 分拣
                for (let key in picks) {
                    if ( picks.hasOwnProperty(key) ) {
                        // 排序。根据Stmp_Aprv_Bsn_ID字段
                        let sortPicks = this.sortIdeaFields(picks[key], 'Stmp_Aprv_Bsn_ID');
                        // 加工成意见域数据
                        results[key] = this.createMessageOneData(sortPicks);
                    }
                }
                cb(results);
            },
        },

        created: function(){
            console.log('1drafting页面生命周期created', this.$route);           
            /* 初始化常用量 */
            var that = this;
            // this.docStatus = this.$route.query.type || 'see';   // 文档状态 new-新建 modify-编辑 see-查看
            this.finalDocStatus = 'managerSee';                 // 文档的最终状态
            this.title = '中国建设银行印章刻制审批单';            // 文档的标题
            this.storage.userInfo = JSON.parse(localStorage.userInfo);          // 用户信息
            this.storage.tcHumanRole = JSON.parse(localStorage.tcHumanRole);    // 用户角色信息
            this.draftUserId = this.storage.userInfo.humanId + '';              // 当前环节实际的操作人ID
            this.draftUserNm = this.storage.userInfo.humanName;                 // 当前环节实际的操作人Nm
            this.sealTypes = {
                'A01': '行章', 'A02': '党委章', 'A03': '领导人员名章', 'A04': '部门内设章', 'A05': '合同专用章'
            };  // 初始化所有的印章类别
            this.aplyId = this.$route.query.id || '';   // 印章刻制申请业务编号
            this.isManage = this.$sealUtil.hasRole(['系统管理员', '业务管理员']);   // 是否是系统管理员或业务管理员

            /* 不满足条件，则跳转到管理员刻制首页 */
            if (!this.aplyId || !this.isManage){
                console.log('不满足条件，跳转到管理员刻制首页');
                this.$router.replace('/sealManage/managementDetail/adminDraftingIndex');
                return;
            }

            /* 查询该条记录的详细信息 */
            let params = {
                Token_Inf_ID:           localStorage.st,    // tokenId
                Stmp_Engr_Aply_Bsn_ID:  this.aplyId,        // 印章刻制申请业务编号
                Mnplt_TpCd:             '01',               // 操作类型 01-查询 02-导出
            };
            this.$api.sealManage.markMgr.getMarkMgrDetails(params).then(res => {
                console.log('getMarkMgrDetails回调:', res);
                if (res.LIST1.length > 0) {
                    this.currentUserId = res.LIST1[0].Stmp_Aply_Aprv_Psn_ID;    // 当前环节应当的操作人Id
                    this.currentUserNm = res.LIST1[0].Stmp_Aply_Aprv_Psn_Nm;    // 当前环节应当的操作人Nm
                }
                this.Stmp_Aply_StCd = res.Stmp_Aply_StCd;                       // 当前所处的环节
                this.Cur_Pcs_Dsc = res.Cur_Pcs_Dsc;                             // OA工作流程描述字符串
                this.form.Cur_Pcs_Dsc = res.Cur_Pcs_Dsc;                        // OA工作流程描述字符串
                this.form.Stmp_Aply_StCd = res.Stmp_Aply_StCd;                  // 当前所处的环节
                this.form.Stmp_Engr_Aply_Bsn_ID = res.Stmp_Engr_Aply_Bsn_ID;    // 印章刻制申请业务编号
                this.form.Snstv_Inf_IndCd = res.Snstv_Inf_IndCd;                // 敏感信息保护
                this.form.Stmp_Bsn_Ctlg_ID = res.Stmp_Bsn_Ctlg_ID;              // 印章类别
                this.form.Stmp_Blng_InsID = res.Stmp_Blng_InsID;                // 印章所属机构编号(申请单位编号)
                this.form.Stmp_Blng_Inst_Nm = res.Stmp_Blng_Inst_Nm;            // 印章所属机构名称（申请单位名称）
                this.form.Stmp_Aply_Crt_Tm = res.Stmp_Aply_Crt_Tm;              // 申请日期
                this.form.Stmp_Aply_Rsn = res.Stmp_Aply_Rsn;                    // 申请理由
                this.form.Stmp_Aply_Psn_ID = res.Stmp_Aply_Psn_ID + '';         // 印章申请人编号
                this.form.Stmp_Aply_Psn_Nm = res.Stmp_Aply_Psn_Nm;              // 印章申请人名称
                this.form.Stmp_Aply_Psn_Ctc_Tel = res.Stmp_Aply_Psn_Ctc_Tel;    // （申请人）联系电话
                this.form.Apl_Aply_ID = res.Apl_Aply_ID;                        // 编号
                this.form.Stmp_Dspl_Inst_Nm = res.Stmp_Dspl_Inst_Nm;            // 刻制印章名称
                this.form.FmNm = res.FmNm;                                      // 旧章名称
                this.form.SCCS = res.SCCS;                                      // 刻制单位（刻章厂）
                this.form.Rtfd_Unit_Sum = res.Rtfd_Unit_Sum;                    // 批准刻制单位（公安部门）
                this.form.Insp_StnCm = res.Insp_StnCm;                          // 刻制情况
                this.form.Mk_Dt = res.Mk_Dt;                                    // 刻制日期
                this.form.StrtUsInd = res.StrtUsInd;                            // 是否启用
                this.form.Stmp_FTm_StrtUs_Tm = res.Stmp_FTm_StrtUs_Tm;          // 启用日期
                this.form.AgtMd_Dsc = res.AgtMd_Dsc;                            // 印章交接方式 01：自取02：邮寄
                this.form.Data_Acq_Dt = res.Data_Acq_Dt;                        // 取印日期
                if (res.Parm_Next_Lnk_Inst_Dsc) {
                    this.Parm_Next_Lnk_Inst_Dsc = JSON.parse(res.Parm_Next_Lnk_Inst_Dsc);  // 完成并发送下一节点的环节
                }
                if (res.Parm_Next_Lnk_Inst_Nm) {
                    this.Parm_Next_Lnk_Inst_Nm = JSON.parse(res.Parm_Next_Lnk_Inst_Nm);    // 完成并发送下一节点的部门
                }
                
                /* 分拣，排序，加工生成意见域的初始数据（越新的数据越排在数组的前边） */
                this.handlerIdeaFields(res.LIST1, this.ideaFieldFlags, (ideaFieldsData) => {
                    console.log('加工后的意见域结果:', ideaFieldsData);
                    this.ideaFieldsData = ideaFieldsData;
                    this.form.remarks_Origin = this.ideaFieldsData['A00'];              // 备注
                    this.form.applyDepartApprover_Origin = this.ideaFieldsData['A01'];  // 申请单位主要负责人签批
                    this.form.rightApprover_Origin = this.ideaFieldsData['A04'];        // 归口管理部门审核
                    this.form.officeApprover_Origin = this.ideaFieldsData['A06'];       // 办公室审核
                    this.form.receiveMan_Origin = this.ideaFieldsData['A08'];           // 取印人
                    this.form.handOverMan_Origin = this.ideaFieldsData['A09'];          // 交印人
                }); 
            
                // 根据环节初始化页面元素的显隐、校验规则、置灰
                setTimeout(() => {
                    this.initProcessRules();
                }, 200);
            }, (err) => {
                console.log('查询记录详情失败：', err);
                let msg = '查询记录详情失败，只能查看！' + this.$sealUtil.getErrorStrInfo(err);
                this.$message({message: msg, type: 'error', duration: 6000});
                this.finalDocStatus = 'see';
                this.initProcessRules();
            })
        },
        mounted: function(){
            window.jk = this;   // 测试
            console.log('drafting页面生命周期mouted：', this.$route, this.$refs);
            // 清除页面初始化时的校验提示信息，只能异步延时才生效
            setTimeout(()=>{
                console.log('清除页面初始化时的校验提示信息', this.$refs);
                if (this.$refs['elForm']) {
                    this.$refs['elForm'].clearValidate();   // 清除校验提示信息
                }
            }, 100);
        },
        // 使用this.$router.go(-1)和this.$router.push(url)跳转页面后，销毁刚才的页面时会执行这个方法
        beforeDestroy: function(){
            // console.log('生命周期：beforeDestroy --drafting');
            // window.removeEventListener('resize', this.resizeWorks);
            // window.removeEventListener('scroll', this.scrollWorks);
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
.red {
    color: '#E00';
}
.textCenter{
    text-align: center;
}
.adminDrafting {
  background: #fff;
  min-height: 100vh;
  position: relative;
}

// .el-header {
//     width: 100%;
//     background-color: #409eff;
//     color: #333;
//     line-height: 60px;
//     z-index: 2;
    // .slider-contaner {
    //     width: 100%;
    //     height: 60px;
    //     overflow: hidden;
    //     position: relative;
    // }
    // .slider {
    //     width: 1200px;
    //     height: 60px;
    // }
// }
.common-header {
    width: 100%;
    display: flex;
    background: #409eff;
    justify-content: space-between;
    align-items: center;
    .back {
        line-height: 60px;
        height: 60px;
        margin-left: 2%;
        color: #eee;
    }
}

.el-main {
    width: 100%;
    .box {
        width: 100%;
        border: 1px solid #f9aa21;
        background: #fef7e7;
        box-sizing: border-box;
        height: 40px;
        margin: 0 0 20px 0;
    }
    .processOffset {
        margin-top: 10px;
        margin-right: 50px;
    }
    /deep/ .el-badge__content {
        height: 22px;
    }
    .title {
        width: 100%;
        // height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 35px;
        color: #409eff;
        font-weight: 800;
    }
    .drafting-mainform {
        width: 92%;
        border:  1px solid #dcdfe6;
        padding: 2% 2%;
        margin: auto;
    }
    .wrap {
        position: relative;
    }
    .wrap::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: rgba(100, 100, 1000, .2);
        z-index: 1;
    }
    .card-minPadding {
        /deep/ .el-card__body {
            padding: 0 10px;
        }
    }
    .not-show {
        display: none;
    }
    .img-init {
        display: inline-block;
        min-width: 100px;
        min-height: 100px;
        max-width: 400px;
        max-height: 400px;
        border: 1px solid #c5c5c5
    }
    .my-label {
        width: 100px;
        line-height: 32px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
    }
}
</style>
