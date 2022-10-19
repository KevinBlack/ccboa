<template>
    <!-- 这是印章管理》管理员查看》（管理员）印章废止审批 -->
    <div class="adminAbolishedDraft">
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
                            plain  size="small"
                            v-for="(item, index) in buttonList"
                            v-show="item.show" :key="index"
                            @click="headerBtnClick(item)"
                        >{{item.name}}</el-button>
                    </div>
                </div>
            </el-header>
            <!-- <el-header ref="elheader" :style="headerStyles">
                <el-row> 
                    <template v-if="isShowSliderMoveBtns">
                        <el-col :span="1" class="textCenter">
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
                <process-long 
                    v-show="processes.length > 0"
                    :processes="processes" :active="nowProcessActive" :openChangeProcess="openChangeProcess"
                    @step-click="stepClick" @step-mouseover="stepMouseover" @step-mouseout="stepMouseout">
                    <div v-show="showProcessBtns" style="margin-top: 12px;">
                        <el-badge :value="isProcessModify ? 'modify' : ''" class="processOffset">
                            <el-button @click="saveProcessChange">保存</el-button>
                        </el-badge>
                        <el-badge class="processOffset">
                            <el-button @click="cancelProcessChange">取消</el-button>
                        </el-badge>
                    </div>
                </process-long>
                <div class="title" :style="mainTitleStyle" ref="mainTitle">{{title}}</div>
                <el-form ref="elForm" :model="form" :rules="rules" label-width="100px" class="abolished-mainform">
                    <el-row class="box" :span="24">
                        <el-col :span="8">
                            <el-form-item label="当前环节:" label-width="90px">
                            <span style="color:#f9aa21">{{currentNodeStatus_computed}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="当前处理人:" label-width="90px">
                            <span style="color:#f9aa21">{{storage.userInfo.currUnitName + ' ' + storage.userInfo.humanName}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
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
                        <el-col :xs="12" :sm="16">
                            <el-form-item label="编号" prop="Apl_Aply_ID">
                                <el-input 
                                    v-model="form.Apl_Aply_ID" :readonly="true" :disabled="readFields.bh"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="8">
                            <el-form-item label="申请日期" prop="Stmp_Aply_Crt_Tm">
                                <el-date-picker 
                                    type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" 
                                    v-model="form.Stmp_Aply_Crt_Tm" style="width: 100%;"
                                    :disabled="readFields.sqrq"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" :class="{wrap: hasWrap('sqdw')}">
                            <el-form-item label="申请单位" prop="Stmp_Aply_Psn_Blng_InsNm">
                                <select-org-or-dept @select="selectDept">
                                    <el-input
                                        type="text"  readonly="readonly"  placeholder="请选择申请单位"
                                        v-model="form.Stmp_Aply_Psn_Blng_InsNm" suffix-icon="el-icon-arrow-down"
                                        :disabled="readFields.sqdw"
                                    ></el-input>
                                </select-org-or-dept>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :class="{wrap: hasWrap('sqr')}">
                            <el-form-item label="申请人" prop="Stmp_Aply_Psn_Nm">
                                <el-input 
                                    type="text"  readonly="readonly"  placeholder="请选择申请人的名字"
                                    suffix-icon="el-icon-arrow-down" 
                                    :disabled="readFields.sqr"
                                    v-model="form.Stmp_Aply_Psn_Nm"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :class="{wrap: hasWrap('lxdh')}">
                            <el-form-item label="联系电话" prop="Stmp_Aply_Psn_Ctc_Tel">
                                <el-input 
                                    v-model="form.Stmp_Aply_Psn_Ctc_Tel" placeholder="请输入联系电话" 
                                    :disabled="readFields.lxdh"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('fzyzmc')}">
                            <el-form-item label="废止印章名称"  prop="Stmp_ECD_origin">
                                <tree-abolishseal 
                                    v-model="form.Stmp_ECD_origin" :disabled="readFields.fzyzmc"
                                ></tree-abolishseal>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('fzyy')}">
                            <el-form-item label="废止原因" prop="Stmp_Aply_Rsn">
                                <el-autocomplete
                                    style="width:100%"
                                    v-model="form.Stmp_Aply_Rsn"
                                    :trigger-on-focus="true"
                                    :select-when-unmatched="true"
                                    :fetch-suggestions="querySearch_fzyy"
                                    placeholder="请选择或输入废止原因"
                                    @select="handleSelect_fzyy"
                                    :disabled="readFields.fzyy"
                                ></el-autocomplete>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('fzyj')}">
                            <el-form-item label="废止依据" prop="Txn_Atch_Nm">
                                <el-input v-model="form.Txn_Atch_Nm" :disabled="readFields.fzyj"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('fzrq')}">
                            <el-form-item label="废止日期" prop="Repl_Dt">
                                <el-date-picker 
                                    type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" 
                                    v-model="form.Repl_Dt" style="width: 100%;"
                                    :disabled="readFields.fzrq"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('sqdwzyfzryj')}">
                            <el-form-item label="申请单位主要负责人意见" prop="leadAuthorIdeas" required>
                                <message-some
                                    v-model="form.leadAuthorIdeas"
                                    :disabled="!editedIdeaFields.sqdwzyfzryj"
                                ></message-some>
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.leadAuthorIdeas" :key="index">
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
                                            :disabled="!editedIdeaFields.sqdwzyfzryj"
                                            message_placeholder="请输入鉴定意见"
                                            @result="handlerResult_leadAuthorIdeas"
                                        ></message-one>
                                    </div>
                                </el-card> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                   <el-row>
                        <el-col :span="12" :class="{wrap: hasWrap('jyr')}">
                            <el-form-item label="交印人" prop="handOverMan">
                                <el-input v-model="form.handOverMan" :disabled="readFields.jyr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :class="{wrap: hasWrap('jysj')}">
                            <el-form-item label="交印时间" prop="handOverDate">
                                <el-date-picker 
                                    type="date"  placeholder="请选择日期"  style="width: 100%;"
                                    v-model="form.handOverDate"  :disabled="readFields.jysj"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12" :class="{wrap: hasWrap('bgr')}">
                            <el-form-item label="保管人" prop="saveSealMan">
                                <el-input v-model="form.saveSealMan" :disabled="readFields.bgr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :class="{wrap: hasWrap('jssj')}">
                            <el-form-item label="接收时间" prop="receiveDate">
                                <el-date-picker 
                                    type="date"  placeholder="请选择日期"  style="width: 100%;"
                                    v-model="form.receiveDate"  :disabled="readFields.jssj"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('cfdd')}">
                            <el-form-item label="存放地点"  prop="Gds_Strg_Plc_Nm">
                                <el-input v-model="form.Gds_Strg_Plc_Nm"  :disabled="readFields.cfdd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12" :class="{wrap: hasWrap('fcqx')}">
                            <el-form-item label="封存期限" prop="Ach_Ddln">
                                 <el-input placeholder="请输入封存期限" v-model="form.Ach_Ddln" :disabled="readFields.fcqx">
                                    <template slot="append">年</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                         <el-col :span="24" :class="{wrap: hasWrap('bz')}">
                             <el-form-item label="备注" prop="remarks">
                                <message-some
                                    v-model="form.remarks"
                                    :disabled="!editedIdeaFields.bz"
                                ></message-some>
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.remarks" :key="index">
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
                                            message_placeholder="请输入备注信息"
                                            @result="handlerResult_remarks"
                                            :disabled="!editedIdeaFields.bz"
                                        ></message-one>
                                    </div>
                                </el-card> -->
                             </el-form-item>
                         </el-col>
                     </el-row>
                </el-form>
            </el-main>
        </el-container>
        <!-- 查看流程组件 -->
        <shiwu-flow :tableData="doneProgressList" ref="dialogLine"></shiwu-flow>
        <!-- 选人弹窗 -->
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
                @showCompDialog="showCompDialog"
            ></select-person>
        </div>
        
        <!-- 导入废止依据弹窗 -->
        <import-abolished-source
            :showDialog="showDialog"
            @sureImpor="sureImpor"
            @cancelImpor="cancelImpor"
        ></import-abolished-source>
        <!-- <message-some v-model="seeTest" :disabled="true"></message-some> -->
    </div>
</template>

<script>
/*** 印章管理》管理员查看》（管理员）印章废止审批 ***/

// 设置页面元素显隐、置灰、校验等功能，
import pageSetMixins from "@/minixs/index";

// 导入图片查看组件
import WinImg from "@/views/sealManage/sealAbolished/components/win-img.vue"

// 导入销毁印章选择组件
import treeSelect from '@/views/sealManage/sealAbolished/components/tree-select.vue'

import treeAbolishseal from '@/views/sealManage/sealAbolished/components/tree-abolishseal.vue'

 // 导入选人组件（完成并发送时使用）
import selectPerson from '@/components/tree/tree-fawen'

// 导入部门机构选择组件
import selectOrgOrDept from "@/components/select/selectOrgOrDept";

// 导入流程显示组件
import processLong from '@/views/sealManage/sealAbolished/components/process-long.vue'


// 引入废止依据
import ImportAbolishedSource from '@/views/sealManage/sealAbolished/components/ImportAbolishedSource'

// 导入留言输入显示组件
import MessageOne from '@/components/optionalfield/message-one.vue'
import MessageSome from '@/components/optionalfield/message-some.vue'

// 查看流程组件
import shiwuFlow from "@/components/viewFlow/shiwuFlow";

// 导入模拟公共数据
import mockDatas from '@/views/sealManage/sealAbolished/common/mockDatas'

// 导入模拟方法（临时）
import jkMockAPI from '@/views/sealManage/sealAbolished/common/jkMockAPI'

export default {
    name: 'abolishedDraft',
    components: {
        'process-long' : processLong,
        'message-one': MessageOne,
        'message-some': MessageSome,
        'tree-select': treeSelect,
        'select-person': selectPerson,
        'select-org-or-dept': selectOrgOrDept,
        'tree-abolishseal': treeAbolishseal,
        'import-abolished-source': ImportAbolishedSource,
        'shiwu-flow': shiwuFlow,
        'win-img': WinImg
    },
    mixins: [pageSetMixins],
    data(){
        return {
            // seeTest1: [],
            // seeConfig: {
            //     '1': {
            //         _disabled: false,
            //         _message_modify: 'enable',
            //         _org_modify: 'enable',
            //         _user_modify: 'readonly',
            //         _time_modify: 'disable',
            //     }
            // },
            // seeTest: [
            //     {
            //         _isEmpty: true,   // 是否是生成的message-one空对象
            //         _message: '',
            //         _org: '部门',
            //         _user: '用户1',
            //         _time: new Date(),
            //         _message_modify: 'enable',
            //         _org_modify: 'hidden',
            //         _user_modify: 'hidden',
            //         _time_modify: 'hidden',
            //     },
            //     {
            //         _message: localStorage.userInfo,
            //         _org: '部门',
            //         _user: '小红',
            //         _time: new Date(),
            //         _message_modify: 'enable',
            //         _org_modify: 'enable',
            //         _user_modify: 'readonly',
            //         _time_modify: 'disable',
            //     }
            // ],
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
            doneProgressList: [],   // 已完成的流程
            aplyId: '',             // 印章废止申请业务编号,唯一确定一条记录
            currentNodeNm: '',      // 当前环节的名字
            finalDocStatus: 'see',  // 最终的页面状态 new-新建 modify-编辑 managerModify-管理员编辑 see-查看
            docStatus: '',          // 文档类型 new-新建 modify-修改 see-查看
            docStatusMaps: {        // 文档状态-名字对应列表
                'new':      '新建',
                'modify':   '编辑',
                'see':      '查看'
            },
            storage: {},            // 当前操作员的信息
            details: null,          // 记录的详细信息
            mockDatas: null,        // 模拟数据
            isManage: false,        // 是否是系统管理员
            /* form校验规则，元素显隐，置灰 */
            managerPageConfig: {},  // 页面管理员配置
            seePageConfig: {},      // 页面查看配置
            stepPageConfig: {},     // 页面环节配置
            rules: {},              // 校验规则
            /* 页面显示控制 */
            activeFields: {
                mgxxfh: true,
                bh:     true,
                sqrq:   true,
                sqdw:   true,
                sqr:    true,
                lxdh:   true,
                fzyzmc: true,
                fzyy:   true,
                fzyj:   true,
                fzrq:   true,
                sqdwzyfzryj: true,
                jyr:    true,
                jysj:   true,
                bgr:    true,
                jssj:   true,
                cfdd:   true,
                fcqx:   true,
                bz:     true
            },  // 活动的的区域（非活动的区域会遮罩）
            readFields: {
                mgxxfh:     false,      // 敏感信息防护
                bh:         false,      // 编号
                sqrq:       false,      // 申请日期
                sqdw:       false,      // 申请单位
                sqr:        false,      // 申请人
                lxdh:       false,      // 联系电话
                fzyzmc:     false,      // 废止印章名称
                fzyy:       false,      // 废止原因
                fzyj:       false,      // 废止依据
                fzrq:       false,      // 废止日期
                jyr:        false,      // 交印人
                jysj:       false,      // 交印时间
                bgr:        false,      // 保管人
                jssj:       false,      // 接收时间
                cfdd:       false,      // 存放地点
                fcqx:       false,      // 封存期限
            },  // 不可编辑的控制域（即只读）。设置元素的disabled属性。设置了的为true
            requiredFields: {
                mgxxfh:     false,      // 敏感信息防护
                bh:         false,      // 编号
                sqrq:       false,      // 申请日期
                sqdw:       false,      // 申请单位
                sqr:        false,      // 申请人
                lxdh:       false,      // 联系电话
                fzyzmc:     false,      // 废止印章名称
                fzyy:       false,      // 废止原因
                fzyj:       false,      // 废止依据
                fzrq:       false,      // 废止日期
                jyr:        false,      // 交印人
                jysj:       false,      // 交印时间
                bgr:        false,      // 保管人
                jssj:       false,      // 接收时间
                cfdd:       false,      // 存放地点
                fcqx:       false,      // 封存期限
            },  // 必填的控制域。在rules中配置。设置了的为true
            editedIdeaFields: {
                sqdwzyfzryj:    true,   // 申请单位主要负责人意见
                bz:             true,   // 备注
            },  // 可编辑意见域。设置元素的disabled属性，设置了的为false。我最后又取反了一次，让其与语义相同。(同readFields相反，我也很恼火)
            requiredIdeaFields: {
                sqdwzyfzryj:    false,   // 申请单位主要负责人意见
                bz:             false,   // 备注
            },  // 必填意见域。在rules中配置。设置了的为true
            buttonList: [
                {name: '关闭',       show: true,    type: 'gb'},
                {name: '保存',       show: false,   type: 'bc'},
                {name: '完成并发送', show: false,   type: 'wcbfs'},
                {name: '办结',       show: false,   type: 'bj'},
                {name: '删除',       show: false,   type: 'shanchu'},
                {name: '生成编号',   show: false,   type: 'scbh' },
                {name: '引入废止依据',   show: false,  type: 'yrfzyj' },
                {name: '归档打印',   show: false,   type: 'gddy' },
                {name: '引入印模',   show: false,   type: 'yrym' },
                {name: '维护',       show: false,  type: 'wh'},
                {name: '查看流程',   show: false,   type: 'cklc'},
                {name: '流程调度',   show: false,  type: 'lcdd' },
                {name: '操作指南',   show: false,  type: 'czzn' },
                {name: '收藏',       show: false,  type: 'sc' },
            ],  // 功能按钮
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
            // headerStyles: {},
            // sliderMarginLeft: 0,        // 功能按钮区的偏移量
            // sliderWidth: 820,           // 功能按钮的宽度
            // sliderContanerWidth: 820,   // 功能按钮包含区域的宽度
            // isShowSliderMoveBtns: true, // 是否显示功能按钮区左右滑动按钮

            // $$ 流程
            line: 'aloneProcess',       // 流程线。aloneProcess, innerProcess, outerProcess
            canChangeProcess: true,     // 是否能修改流程
            processes: [],              // 所有的流程
            showProcessBtns: false,     // 是否显示流程的功能按钮
            savedProcessActive: 2,      // 保存的流程阶段，从0开始
            nowProcessActive: 2,        // 现在所在的流程阶段。从0开始
            tempProcessActive: 2,       // 意向要保存的流程阶段。从0开始
            
            // $$ 表格
            mainTitleFontSize: 35,      // mainTitle的字体大小
            title: '',                  // 文档的标题
            allReasons: [               // 所有的废止原因
                {label:'机构更名', value:'机构更名'},
                {label:'机构撤销', value:'机构撤销'},
                {label:'印章损坏', value:'印章损坏'},
                {label:'印章丢失', value:'印章丢失'},
                {label:'领导变更', value:'领导变更'}
            ], 
            form: {
                Stmp_Aply_StCd:             '',         // 当前的环节（状态代码）
                isOuter:                    '否',       // 是否跨行
                ideaFieldsData:             {},         // 意见域的所有数据. key为标示字段，val是数据（对象数组）
                Pcs_Lnk_Inf_Dsc:            [],         //（流程调度的）所有环节
                Parm_Next_Lnk_Inst_Dsc:     [],         // 完成并发送下一节点的环节
                Parm_Next_Lnk_Inst_Nm:      [],         // 完成并发送下一节点的部门
                Snstv_Inf_IndCd_Origin:     [],         // 敏感信息防护原始数据.数组
                Snstv_Inf_IndCd:            '',         // 敏感信息防护.字符串
                Apl_Aply_ID:                '',         // 编号
                Stmp_Aply_Crt_Tm:           '',         // 申请日期
                Stmp_Aply_Psn_Blng_InsID:   '',         // 印章所属机构编号(申请单位编号)
                Stmp_Aply_Psn_Blng_InsNm:   '',         // 印章所属机构名称（申请单位名称）
                Stmp_Aply_Psn_ID:           '',         // 印章申请人编号
                Stmp_Aply_Psn_Nm:           '',         // 印章申请人名称 TODO:添加选人组件，选择申请人
                Stmp_Aply_Psn_Ctc_Tel:     '',          // 联系电话
                Stmp_ECD_origin:            [],         // 废止印章原始数据。对象数组
                Stmp_ECD:                   '',         // 废止印章(印章编码)
                Stmp_Dspl_Inst_Nm:          '',         // 废止印章（印章显示机构名称）
                Stmp_Aply_Rsn:              '',         // 废止原因
                Txn_Atch_Nm:                '',         // 废止依据
                Repl_Dt:                    '',         // 废止日期
                Gds_Strg_Plc_Nm:            '',         // 存放地点
                Ach_Ddln:                   '',         // 封存期限（单位年）
                handOverMan_Origin:         [],         // 交印人和交印时间（原始数据）
                handOverMan:                '',         // 交印人
                handOverDate:               '',         // 交印时间
                saveSealMan_Origin:         [],         // 保管人和接收时间（原始数据）
                saveSealMan:                '',         // 保管人
                receiveDate:                '',         // 接收时间
                leadAuthorIdeas:            [],         // 申请单位主要负责人意见
                remarks:                    '',         // 备注
                Cur_Pcs_Dsc:                '',         // 实体信息
            },
            
            ideaFieldFlags: {   // 意见域分类标示字段
                'A00': 'Stmp_Aprv_TpCd',    // 起草
                'A01': 'Stmp_Aprv_TpCd',    // 申请单位主要负责人审批
                'A10': 'Stmp_Aprv_TpCd',    // 交印人确认
                'A11': 'Stmp_Aprv_TpCd',    // 保管人处理
                'A14': 'Stmp_Aprv_TpCd',    // 上级行保管人处理
            },
            // 选人组件相关参数
            singelCheckF: true,     // true-单选, false:多选
            dialogTypeNow: "next",
            dialogType: "dosend",
            offenUse: true,
            loadingTree: true,
            treeData: [],           // 人员树
            canTab: false,
            loadingTree: true,
            hasRadio: false,        // 是否单选
            checkOrg: false,
            seletOptionsData: [],   // 环节
            dialogTit: "选择人员",
            checkIds: [], //选中id列表
            checkData: [], //选中数据
            dialogState: false,//显示隐藏
            formdata: {},
            /* 引入废止依据组件 */
            showDialog: false,
            /* 流程调度 */
            isFlowControl: false,   // 是否是流程调度
            // /* 印模图片展示 */
            // isShowSealImg: false,   // 是否展示印模图片
            // sealImgUrl: '',         // 印模图片地址
        }
    },
    computed: {
        // 当前环节的状态
        currentNodeStatus_computed: function(){
            let n = this.currentNodeNm;         // 当前环节的名字
            let t = this.docStatusNm_computed;  // 文档状态的名字
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
        //         if (val) {
        //             if (val.charAt(0) === '1' ) { arr.push('限制打印'); }
        //             if (val.charAt(1) === '1' ) { arr.push('限制下载'); }
        //             if (val.charAt(2) === '1' ) { arr.push('限制复印'); }
        //         }
        //         return arr;
        //     },
        //     set: function(arr){
        //         let protect1 = arr.indexOf('限制打印') >= 0 ? '1' : '0',
        //             protect2 = arr.indexOf('限制下载') >= 0 ? '1' : '0',
        //             protect3 = arr.indexOf('限制复印') >= 0 ? '1' : '0';
        //         this.form.Snstv_Inf_IndCd = protect1 + protect2 + protect3;
        //     }
        // },
        // // 交印人
        // handOverMan_computed: function(){
        //     console.log('handOverMan_computed:', this.form.handOverMan_Origin);
        //     let newVal = this.form.handOverMan_Origin;
        //     let str = '';
        //     if ( Array.isArray(newVal) ) {
        //         // 当前的人添加到后边
        //         for (let len = newVal.length, i = len - 1; i >= 0; i--) {
        //             let userId = newVal[i].Stmp_Aply_Aprv_Psn_ID,
        //                 userNm = newVal[i].Stmp_Aply_Aprv_Psn_Nm;
        //             let user = (userId && userNm) ? userNm + '(' + userId + ')' : (userNm || userId || '');
        //             if (user) { str += user + ','; }
        //         }
        //         // 去掉末尾多余的逗号
        //         if (str.charAt(str.length - 1) === ',') {
        //             str = str.slice(0, -1);
        //         }
        //     }
        //     return str;
        // },
        // // 交印时间
        // handOverDate_computed: function(){
        //     console.log('handOverDate_computed:', this.form.handOverMan_Origin);
        //     let newVal = this.form.handOverMan_Origin;
        //     let time;
        //     if ( Array.isArray(newVal) ) {
        //         // 最新的排在第一的位置
        //         if (newVal[0]) {
        //             time = newVal[0].Stmp_Aply_Aprv_Tm;
        //         }
        //     }
        //     return time;
        // },
        // // 保管人
        // saveSealMan_computed: function(){
        //     let user = '';
        //     if ( Array.isArray(this.form.saveSealMan_Origin) ) {
        //         if ( this.form.saveSealMan_Origin[0] ) {
        //             let userId = this.form.saveSealMan_Origin[0].Stmp_Aply_Aprv_Psn_ID,
        //                 userNm = this.form.saveSealMan_Origin[0].Stmp_Aply_Aprv_Psn_Nm;
        //             user = (userId && userNm) ? userNm + '(' + userId + ')' : (userNm || userId || '');
        //         }
        //     }
        //     return user;
        // },
        // // 接收时间
        // receiveDate_computed: function(){
        //     let time;
        //     if (Array.isArray(this.form.saveSealMan_Origin)) {
        //         if ( this.form.saveSealMan_Origin[0] ) {
        //             time = this.form.saveSealMan_Origin[0].Stmp_Aply_Aprv_Tm;
        //         }
        //     }
        //     return time;
        // },
        // 所在流程，从1开始。和savedProcessActive的从0开始不同
        step: {
            // 计算属性默认只有 getter,但有时候也需要setter
            get: function(){
                return this.savedProcessActive + 1;
            },
            set: function(newVal){
                this.saveProcessChange = newVal - 1;
            }
        },

        // // 功能按钮区的偏移
        // mySliderOffset: function(){
        //     return {
        //         'margin-left': this.sliderMarginLeft + 'px'
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
            return this.isManage && this.showProcessBtns;
        },
        // 流程图是否修改
        isProcessModify: function(){
            return this.nowProcessActive !== this.savedProcessActive;
        },
        // 是否有遮罩层 // 计算属性传参需要使用闭包的形式
        hasWrap: function(){
            return function(name){
                return !this.activeFields[name];
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
        // // 按钮列表
        // buttonList: function(newVal, oldVal){
        //     let minWidth = 400,     // 按钮区域的最小宽度
        //         showButtonLen = 0,  // 显示的按钮数
        //         buttonWidth = 90;   // 每个按钮的宽度
        //     for (let i = 0, len = newVal.lenth; i < len; i++) {
        //         if (newVal[i].show) { showButtonLen++; }
        //     }
        //     this.sliderWidth = (buttonWidth * showButtonLen) < minWidth ? minWidth : buttonWidth * showButtonLen;
        // },
        // OA工作流程描述字符串
        // 格式为: multiTenancyID多实体标识ID, pcsInst流程实例ID, tplNo流程模板ID, pcsActID当前活动ID,
        // pcsNodeID当前环节ID, pcsNodeNm当前环节名称, humanID当前处理人OA编号, humanName当前处理人姓名
        Cur_Pcs_Dsc: function(newVal, oldVal){
            console.log('watch->Cur_Pcs_Dsc', newVal);
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
        },
        // 当前环节
        'form.Stmp_Aply_StCd': function(newVal, oldVal){
            if (newVal) {
                this.currentNodeNm = this.$sealUtil.allNodes[newVal] || newVal;
            }
        },
        // 废止印章名称
        'form.Stmp_ECD_origin': function(newVal, oldVal){
            console.log('watch:form.Stmp_ECD_origin', newVal, oldVal);
            this.form.Stmp_ECD = newVal[0] ? newVal[0].Stmp_ECD : '';   // 印章编码
            this.form.Stmp_Dspl_Inst_Nm = newVal[0] ? newVal[0].Stmp_Dspl_Inst_Nm : ''; // 印章显示机构名称
        },
        'form.Stmp_ECD': function(newVal, oldVal){
            console.log('watch:form.Stmp_ECD', newVal, oldVal);
            this.$set(this.form.Stmp_ECD_origin, '0', {});
            this.$set(this.form.Stmp_ECD_origin[0], 'Stmp_ECD', newVal);
            this.$set(this.form.Stmp_ECD_origin[0], 'Stmp_Dspl_Inst_Nm', this.form.Stmp_Dspl_Inst_Nm);
        },
        'form.Stmp_Dspl_Inst_Nm': function(newVal, oldVal){
            this.$set(this.form.Stmp_ECD_origin, '0', {});
            this.$set(this.form.Stmp_ECD_origin[0], 'Stmp_ECD', this.form.Stmp_ECD);
            this.$set(this.form.Stmp_ECD_origin[0], 'Stmp_Dspl_Inst_Nm', newVal);
        },
        // 交印人和交印时间
        'form.handOverMan_Origin': function(newVal, oldVal){
            console.log('watch -> form.saveSealMan_Origin', newVal, oldVal);
            let users = '', time = '';
            if ( Array.isArray(newVal) ) {
                // 最新的排在第一的位置
                if (newVal[0]) {
                    time = newVal[0].Stmp_Aply_Aprv_Tm;
                }

                // 当前的人添加到后边
                for (let len = newVal.length, i = len - 1; i >= 0; i--) {
                    let userId = newVal[i].Stmp_Aply_Aprv_Psn_ID,
                        userNm = newVal[i].Stmp_Aply_Aprv_Psn_Nm;
                    let user = (userId && userNm) ? userNm + '(' + userId + ')' : (userNm || userId || '');
                    if (user) { users += user + ','; }
                }
                // 去掉末尾多余的逗号
                if (users.charAt(users.length - 1) === ',') {
                    users = users.slice(0, -1);
                }
            }
            this.form.handOverMan = users;
            this.form.handOverDate = time;
        },
        // 保管人和接收时间
        'form.saveSealMan_Origin': function(newVal, oldVal){
            console.log('watch -> form.saveSealMan_Origin', newVal, oldVal);
            let user = '', time = '';
            if ( Array.isArray(newVal) ) {
                if ( newVal[0] ) {
                    let userId = this.form.saveSealMan_Origin[0].Stmp_Aply_Aprv_Psn_ID,
                        userNm = newVal[0].Stmp_Aply_Aprv_Psn_Nm;
                    user = (userId && userNm) ? userNm + '(' + userId + ')' : (userNm || userId || '');
                    time = newVal[0].Stmp_Aply_Aprv_Tm;
                }
            }
            this.form.saveSealMan = user;    // 保管人
            this.form.receiveDate = time;    // 接收时间
        },
    },
    methods: {
        // // 查看印模图片
        // showSealImg(){
        //     if (this.form.Stmp_ECD) {
        //         this.isShowSealImg = true;
        //         this.$sealUtil.getFileFromP9(this.form.Stmp_ECD, (err, data) => {
        //             console.log('从P9获取到的印模图片数据：', err, data);
        //             if (!err) {
        //                 let uuid = this.$sealUtil.generateGUID();
        //                 this.sealImgUrl = "/ecpweb/getLocalFile.action?relativePath=" + data[0] + "&fileName=" + 
        //                         encodeURIComponent(data[1]) + "&openFile=true&ATCH_BTCH_NO=" + uuid;
        //             };
        //         });
        //     } else {
        //         this.$message({message: '还没有废止的印章！', type: 'warning', showClose: true});
        //     }
        // },
        /* 引入废止依据 */
        // 确认
        sureImpor(data){
            console.log('sureImpor:', data);
        },
        // 取消
        cancelImpor(){
            this.showDialog = false;
        },
        /**
         * 额外的校验.
         * @param {Function} callback：校验回调函数。有一个校验结果参数。校验通过为null,校验不通过为error对象
         */
        moreValidate: function(callback){
            callback.call(this, null);
        },
        // 查询筛选后的废止原因
        querySearch_fzyy(queryString, cb) {
            let results = this.allReasons;
            if (queryString) {
                let lowerCaseQueryString = queryString.toLowerCase();
                results = this.allReasons.filter( item => {
                    return (item.value.toLowerCase().indexOf(lowerCaseQueryString) > -1);
                });
            }
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        // 选择废止原因或按确认按钮触发的回调，这儿暂时没有用
        handleSelect_fzyy(item){
            // console.log(item);
        },
        // 获取编号
        getAplyId(){
            console.log('获取编号:', this.form.Stmp_Aply_StCd);
            let statusType = this.form.Stmp_Aply_StCd === 'A00' ? false : true;
            let params = {
                fileNo: undefined,      // 当有漏号时，选择流水号。可不传
                statusType: statusType, // true 需要生成编号;false 起草时，显示空的编号
                markOrderType: "5",     // 类型 4-刻制审批 5-废止审批 6-销毁审批
            };
            this.$api.sealManage.getSealNum(params).then(res => {
                console.log("生成的编号成功:", res);
                this.form.Apl_Aply_ID = res.data;
            })
            .catch(err => {
                console.log('生成编号错误：', err);
                this.$message({message:'生成编号错误', type:"error"});
            });
        },
        // 获取联系电话
        getTelMobile(){
            const userInfo = this.storage.userInfo || JSON.parse(localStorage.userInfo);
            console.log('getTelMobile:', userInfo);
            let telMobile = '';
            if (typeof userInfo === 'object' && typeof userInfo.telMobile === 'string') {
                telMobile = userInfo.telMobile.split(',')[0];
            }
            return telMobile;
        },
        // 选择申请单位
        selectDept (dept) {
            console.log('申请单位选择返回的部门值：', dept);
            this.form.Stmp_Aply_Psn_Blng_InsNm = dept.unitName;    // 申请单位(部门)名称
            this.form.Stmp_Aply_Psn_Blng_InsID   = dept.id;          // 申请单位(部门)编号
        },
        // 将obj1中的内容复制到obj中
        copyTo(obj, obj1){
            for (let key in obj1) {
                if ( obj1.hasOwnProperty(key) ) {
                    obj[key] = obj1[key];
                }
            }
        },
       
        /* 接口 */
        // 新增一条废止申请 op:额外的参数对象
        addSealAbolisedApply(op){
            let params = {
                Stmp_ECD:               this.form.Stmp_ECD,                 // 印章编码(选择的废止印章)
                Snstv_Inf_IndCd:        this.form.Snstv_Inf_IndCd, 		    // 敏感信息保护
                Unit_Dept_EmpID:        this.storage.userInfo.humanId + '', // 员工ID
                Token_Inf_ID:           localStorage.st,                    // ccbtoken
                Apl_Aply_ID:            this.form.pl_Aply_ID,               // 编号
                Stmp_Aply_Rsn:          this.form.Stmp_Aply_Rsn,            // 申请理由
                Stmp_Aply_Psn_Ctc_Tel:  this.form.Stmp_Aply_Psn_Ctc_Tel,    // (申请人)联系电话
                Txn_Atch_Nm:            this.form.Txn_Atch_Nm,              // 废止依据
                Repl_Dt:                this.$sealUtil.formatDate(this.form.Repl_Dt, 'yyyy-MM-dd'), // 废止日期
            };
            this.copyTo(params, op);
            return this.$api.sealManage.sealAbolished.addSealAbolisedApply(params);
        },
        // 印章废止申请审批
        approveSealAbolishedApply(op){
            let params = {
                Stmp_Repl_Aply_Bsn_ID:  this.form.Stmp_Repl_Aply_Bsn_ID,        // 印章废止申请业务编号
                Unit_Dept_EmpID:        this.storage.userInfo.humanId + '',     // 员工ID
                Token_Inf_ID:           localStorage.st,                        // ccbtoken
                Stmp_Aply_ApvOpn_Cd:    this.form.Stmp_Aply_ApvOpn_Cd,          // 审批意见代码
                Stmp_Aply_ApvOpn_Dsc:   this.form.Stmp_Aply_ApvOpn_Dsc,         // 审批意见描述
                Stmp_Aply_Psn_Ctc_Tel:  this.form.Stmp_Aply_Psn_Ctc_Tel,        // 申请人联系电话
                StmpAplyAprvDstInsID:   this.form.StmpAplyAprvDstInsID + '',    // 下一个环节人所在机构的ID
                StmpAplyAprvDstInsNm:   this.form.StmpAplyAprvDstInsNm,         // 下一个环节人所在机构的名字
                WrkOrdrNextPcsgPsn_ID:  this.form.WrkOrdrNextPcsgPsn_ID + '',   // 下一处理人编号
                WrkOrdrNextPcsgPsn_Nm:  this.form.WrkOrdrNextPcsgPsn_Nm,        // 下一处理人名称
                Node_ID:                this.form.Node_ID + '',                 // 下一流程节点编号
                Node_Nm:                this.form.Node_Nm,                      // 下一流程节点名称
                Gds_Strg_Plc_Nm:        this.form.Gds_Strg_Plc_Nm,              // 存放地点
                Ach_Ddln:               this.form.Ach_Ddln,                     // 封存期限(单位年)
                Apl_Aply_ID:            this.form.Apl_Aply_ID,                  // 编号
            };
            this.copyTo(params, op);
            return this.$api.sealManage.sealAbolished.approveSealAbolishedApply(params);
        },
        // 查询某条印章废止申请的的详细信息. id:印章销毁申请业务编号,可以唯一确认一条记录
        getSealAbolishedApplyDetails(id){
            let params = {
                Unit_Dept_EmpID:        this.storage.userInfo.humanId + '',     // 员工ID
                Token_Inf_ID:           localStorage.st,                        // ccbtoken
                Stmp_Repl_Aply_Bsn_ID:  id || this.form.Stmp_Repl_Aply_Bsn_ID,  // 印章废止申请业务编号
            };
            return this.$api.sealManage.sealAbolished.getSealAbolishedApplyDetails(params);
        },

        /* 意见域 */
        // 档案部门鉴定意见
        handlerResult_leadAuthorIdeas(index, message, org, user, time){
            let item = this.form.leadAuthorIdeas[index];
            item._message = message;
            item._org = org;
            item._user = user;
            item._time = time;
        },
        // 备注
        handlerResult_remarks(index, message, org, user, time){
            let item = this.form.remarks[index];
            item._message = message;
            item._org = org;
            item._user = user;
            item._time = time;
        },
        // 标记该环节要使用的意见域对象，提交时只传标记了的意见域信息 TODO:等知道用哪个字段标示环节时在补全这个
        addMarkToUsedIdeaFieldsData(){
            let stcd = this.form.Stmp_Aply_StCd; // 当前所处的环节
            // // 环节 A01: '申请单位主要负责人审批'
            // if (stcd === 'A01') {
            //     this.form.applyDepartApprover_Origin[0]._mark = true;
            // }
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
                return nb - na;     // 降序
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
         * @param {Array|*} list 要挑选的数据，期望为对象数组。 eg: [{},...]
         * @param {Object} flags 意见域分类对象。key为分类标示字符串。val为存储分类标示字符串的字段。
         *               eg:{A0:"Stmp_Aprv_TpCd", ...}
         * @param {Function} pinpointFunc 可选，标示是否是指定分类的函数。返回true|false;
         * @return {Object} 分类后的对象。 对象key值为分类标示字符串，val值是包含的对象数组。没挑选到则val是[]
         */
        pickIdeaFields(list, flags, pinpointFunc){
            let obj = {};
            if ( !Array.isArray(list) ) { list = []; }
            for (let key in flags) {
                if ( flags.hasOwnProperty(key) ) {
                    let val = flags[key];   // 对象中存储标示字符串的字段
                    // 挑选指定的分类数据
                    let tempArr = list.filter(function(item, index, array){
                        return typeof pinpointFunc === 'function' ? pinpointFunc(item, key, val) : item[val] === key;
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
                _isEmpty: true,   // 是否是生成的message-one空对象
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
         * 生成Message-one需要的数据.
         * @param {Array | *} list 要处理的某类数据。对象数组
         * @param {Function} myfunc 可选，自己传入的用于生成某个messageOne对象的函数
         * @return {Array} 处理后的能作为message-one组件的数组。该数组至少包含一个对象。
         * 注意：这个会覆盖原来的_message,_user,_time,_org等字段哦
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
            return arr;
        },

        // $$ 公共方法

        // $$ 功能按钮区
        // // 左滑动功能按钮区
        // sliderToLeft(){
        //     // 获取sliderContaner元素的宽度(可见内容的宽度，不包括滚动条和边框)，整形，单位像素
        //     this.sliderContanerWidth = this.$refs.sliderContaner.offsetWidth;
        //     let marginLeft = this.sliderMarginLeft + this.sliderContanerWidth;
        //     this.sliderMarginLeft = marginLeft >= 0 ? 0 : marginLeft;
        // },
        // // 右滑动功能按钮区
        // sliderToRight(){
        //     this.sliderContanerWidth = this.$refs.sliderContaner.offsetWidth;
        //     let maxMarginLeft = [-(this.sliderWidth - this.sliderContanerWidth), 0];    // 最大的偏移
        //     let marginLeft = this.sliderMarginLeft - this.sliderContanerWidth ;
        //     this.sliderMarginLeft = marginLeft <= maxMarginLeft[0] ? maxMarginLeft[0] : marginLeft;
        // },
        // // 重置功能按钮区初始状态：显隐左右滑动按钮，功能按钮区偏移变化
        // resizeSlider(event){
        //     // console.log('resizeSlider:', this, this.$refs);
        //     this.sliderContanerWidth = this.$refs.sliderContaner.offsetWidth;
        //     // 如果sliderContaner的宽度大于所有按钮占用的宽度，隐藏两边的滑动按钮
        //     if (this.sliderContanerWidth >= this.sliderWidth) {
        //         this.sliderMarginLeft = 0;
        //         this.isShowSliderMoveBtns = false;
        //     } else {
        //         this.isShowSliderMoveBtns = true;
        //     }
        // },

        // 打开/关闭操作流程调度功能
        openOrCloseHandleProcess(){
            // 如果不能修改流程，则提示
            if (this.isManage === false) {
                this.$message({
                    message: '只有系统管理员、业务管理员可以修改流程！',
                    type: 'warning',
                    showClose: true,
                });
                return; 
            }
            this.showProcessBtns = !this.showProcessBtns;
        },
        // 显示选人组件
        showSelectPerson() {
            this.dialogTypeNow = 'next';
            this.dialogType = "dosend";
            this.offenUse = true;
            this.seletOptionsData = this.form.Parm_Next_Lnk_Inst_Dsc;   // 环节信息(下一节点)
            this.treeData = this.form.Parm_Next_Lnk_Inst_Nm;            // 部门初始数据（选择部门）
            this.singelCheckF = true;       // 单选，多选标志
            this.loadingTree = true;        // true:是懒加载
            this.dialogState = true;        // 显示选人弹窗
        },
        // 选人完成后回调函数
        showCompDialog (data, status, type, params, dtype) {
            // 点击取消按钮： 只有data信息， 其余都为undefined； 点击确认按钮： 所有数据都有
            // data: 数组。选择人的信息（所在部门，人员）； status: 是否是点击确认按钮返回的
            // params：下一个环节信息， 格式：{id: "N02020111719300" name: "申请单位主要负责人审批"}
            console.log('选人成功后：', data, status, type, params, dtype);        
            this.dialogState = false;   // 隐藏选人弹窗
            // 点击的取消按钮，返回
            if (!status) { return; }

            this.form.StmpAplyAprvDstInsID = data[0].deptId;    // 下一个环节人所在机构的ID（印章申请审批指定机构ID）
            this.form.StmpAplyAprvDstInsNm = data[0].deptName;  // 下一个环节人所在机构的名字（印章申请审批指定机构名称）
            this.form.WrkOrdrNextPcsgPsn_ID = data[0].idStr;    // 下一个环节人的id
            this.form.WrkOrdrNextPcsgPsn_Nm = data[0].name;     // 下一个环节人的名字
            this.form.Node_ID = params.id;                      // 下一个环节的id
            this.form.Node_Nm = params.name;                    // 下一个环节的名字

            /* 审批结果（印章申请审批意见代码）01-同意 04-修改（流程调度） 05-审批完成（办结） */
            if (this.isFlowControl) {   // 流程调度
                this.isFlowControl = false;
                this.form.Stmp_Aply_ApvOpn_Cd = '04';
            } else {                    // 完成并发送
                this.form.Stmp_Aply_ApvOpn_Cd = '01';
            }

            /* 审批意见（印章申请审批意见描述）*/
            let ideaField = {};
            if ( this.editedIdeaFields['sqdwzyfzryj'] ) {   // 申请单位主要负责人意见
                ideaField = this.form.leadAuthorIdeas[0];
            } else if ( this.editedIdeaFields['bz'] ) {     // 备注
                ideaField = this.form.remarks[0];
            }
            this.form.Stmp_Aply_ApvOpn_Dsc = ideaField._message;

            // 点击的成功按钮：提交该环节信息
            this.approveSealAbolishedApply().then(res => {
                console.log('审批成功：', res);
                // this.$router.push('/sealManage/sealAbolished/index');
                let msg = '审批成功!跟踪号:' + this.$sealUtil.getTraceId(res);
                let options = {confirmButtonText: '确定', type: 'success', showClose: false};
                this.$alert(msg, options).then(() => {
                    this.$intent.closeWindow(this);
                });
            })
            .catch(err => {
                console.log('审批失败：', err);
                let msg = '废止审批失败！' + this.$sealUtil.getErrorStrInfo(err);
                this.$message( {message: msg, type: 'error'} );
            });
        },
        // 跳转到打印页面 TODO:添加条件
        toPrintPage(){
            let newPage = this.$router.resolve( {path: "/sealAbolishedDocument", query: {id: this.aplyId}} );
            window.open(newPage.href, '_blank');
            // this.$intent.goNewPage(this, {path: "/sealAbolishedDocument", query: {id: this.aplyId} });
        },
        // 执行功能按钮对应的方法
        headerBtnClick(btnInfo){
            switch (btnInfo.name) {
                case '关闭':
                    // this.$router.push('/sealManage/sealAbolished/index');
                    this.$intent.closeWindow(this)
                    break;
                case '保存':
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
                    this.getAplyId();
                    break;
                case '引入废止依据':
                    this.showDialog = true;
                    break;
                case '归档打印':
                    this.toPrintPage();
                    break;
                case '收藏':
                    break;
                case '查看流程': 
                    this.toSeeDoneProcess();
                    break;
                case '流程调度':
                    this.flowControl();
                    break;
                case '操作指南':
                    break;
                default:
                    console.log('你点击了按钮:' +btnName);
            }
        },
        // 完成并发送
        saveAndToNext(){
            // 校验form表
            this.$refs['elForm'].validate((valid) => {
                // 校验通过
                if (valid) {
                    // 额外的校验
                    this.moreValidate((err) => {
                        if (err) {
                            this.$message( {type: 'error', message: err.message} );
                            return;
                        }
                        // 处于新建阶段（起草阶段走审批）
                        if (this.form.Stmp_Aply_StCd === 'A00' && !this.aplyId) {
                            this.addSealAbolisedApply().then(res => {
                                this.aplyId = res.Stmp_Repl_Aply_Bsn_ID;                                    // 印章废止申请业务编号
                                this.form.Stmp_Repl_Aply_Bsn_ID = res.Stmp_Repl_Aply_Bsn_ID;                // 印章废止申请业务编号
                                this.form.Parm_Next_Lnk_Inst_Dsc = JSON.parse(res.Parm_Next_Lnk_Inst_Dsc);  // 下一节点的环节.对象数组
                                this.form.Parm_Next_Lnk_Inst_Nm = JSON.parse(res.Parm_Next_Lnk_Inst_Nm);    // 下一节点的根部门.对象数组
                                this.showSelectPerson();
                            })
                            .catch(err => {
                                console.log('新增印章销毁申请记录报错啦：', err);
                                this.$message({
                                    message: '新增印章销毁申请记录失败！',
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
        // 删除(当前记录)
        delete(){
            this.$message({message:'还未实现！', type:'info'});
        },
        // 办结
        finish(){
            // 审批结果（印章申请审批意见代码）01-同意 04-修改（流程调度） 05-审批完成（办结）
            this.form.Stmp_Aply_ApvOpn_Cd = '05';   
            this.approveSealAbolishedApply().then(res => {
                console.log('办结成功：', res);
                let msg = '办结成功!跟踪号:' + this.$sealUtil.getTraceId(res);
                let options = {confirmButtonText: '确定', type: 'success', showClose: false};
                this.$alert(msg, options).then(() => {
                    this.$intent.closeWindow(this);
                });
            })
            .catch(err => {
                console.log('办结失败：', err);
                let msg = '办结失败！' + this.$sealUtil.getErrorStrInfo(err);
                this.$message( {message: msg, type: 'error'} );
            });
        },
        // 流程调度
        flowControl(){
            if (this.aplyId) {
                // 所有的环节
                this.seletOptionsData = this.form.Pcs_Lnk_Inf_Dsc;
                // 部门初始数据（选择部门）
                this.treeData = this.form.Parm_Next_Lnk_Inst_Nm;
                // 显示选人弹窗
                this.dialogState = true;
                // 设置流程调度标示
                this.isFlowControl = true;
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
            // 审批阶段 pcsInst-流程实例ID
            let params = {curProcessInstId: this.curPcs.pcsInst};
            this.$api.sealManage.sealCommon.getLink_done(params)
                .then(res => {
                    console.log('toSeeDoneProcess返回的数据:', res);
                    this.doneProgressList = res.data;
                    this.$nextTick(() => {
                        this.$refs.dialogLine.openDialog();
                    });
                });
        },
        // 获取环节配置信息 params：请求参数
        getLink(params) {
            if (!params) {
                if (this.aplyId) {  // 审批
                    params = {
                        humanId:        this.curPcs.humanID,        // 人员编号
                        multiTenancyId: this.curPcs.multiTenancyID, // 多实体标识ID eg:'CN0033'
                        pcsAvyId:       this.curPcs.pcsNodeID,      // 当前节点id
                        pcsTpId:        this.curPcs.tplNo,          // 流程模板id
                    };
                } else {    // 起草(新建)
                    params= {
                        humanId:        '',         // 人员编号
                        multiTenancyId: 'CN0033',   // 多实体标识ID.废止是CN0033
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
                Apl_Aply_ID: [
                    {required: requiredFields.bh, message: '请点击“生成编号”按钮生成编号', trigger: 'blur'}
                ],  // 编号
                Stmp_Aply_Crt_Tm: [
                    // 如果加上type:'date'，则必须为日期对象，否则会报错
                    {required: requiredFields.sqrq, message: '请选择申请日期', trigger: 'change'}
                ],  // 申请日期
                Stmp_Aply_Psn_Blng_InsNm: [
                    {required: requiredFields.sqdw, message: '请选择申请单位', trigger: 'change'}
                ],  // 申请单位
                Stmp_Aply_Psn_Nm: [
                    { required: requiredFields.sqr, message: '必须有申请人', trigger: 'blur' }
                ],   // 申请人
                Stmp_Aply_Psn_Ctc_Tel: [
                    {required: requiredFields.lxdh, message: '请输入（申请人）联系电话', trigger: 'blur'}
                ],  // 联系电话
                Stmp_ECD_origin: [
                    {required: requiredFields.fzyzmc, message: '需要废止印章名称', trigger: 'change'}
                ],  // 废止印章名称
                Stmp_Aply_Rsn: [
                    {required: requiredFields.fzyy, message: '需要废止原因', trigger: 'change'}
                ],  // 废止原因
                Txn_Atch_Nm: [
                    {required: requiredFields.fzyj, message: '需要废止依据', trigger: 'blur'}
                ],  // 废止依据
                Repl_Dt: [
                    {required: requiredFields.fzrq, message: '需要废止日期', trigger: 'change'}
                ],  // 废止日期
                leadAuthorIdeas: [
                    {required: requiredIdeaFields.sqdwzyfzryj, message: '需要申请单位主要负责人意见', trigger: 'blur'}
                ],  // 申请单位主要负责人意见
                handOverMan: [
                    {required: requiredFields.jyr, message: '需要有交印人', trigger: 'blur'}
                ],  // 交印人
                handOverDate: [
                    {required: requiredFields.jysj, message: '需要有交印时间', trigger: 'change'}
                ],  // 交印时间
                saveSealMan: [
                    {required: requiredFields.bgr, message: '需要有保管人', trigger: 'blur'}
                ],  // 保管人
                receiveDate: [
                    {required: requiredFields.jssj, message: '需要有接收时间', trigger: 'change'}
                ],  // 接收时间
                Gds_Strg_Plc_Nm: [
                    { required: requiredFields.cfdd, message: '请输入存放地点', trigger: 'blur' }
                ],   // 存放地点
                Ach_Ddln: [
                    {required: requiredFields.fcqx, message: '请输入封存期限', trigger: 'blur'}
                ],  // 封存期限
                remarks: [
                    {required: requiredIdeaFields.bz, message: '请输入备注', trigger: 'blur'},
                ],  // 备注
            };
            return rules;
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
        // 获取当前环节的查看模式页面配置
        getSeePageConfig(stepPageConfig, isManage){
            let config = this.$sealUtil.deepClone(stepPageConfig);
            // 只显示关闭
            config.buttonList = config.buttonList.map(item => {
                item.show = false;
                if (item.name === '关闭') { item.show = true; }
                if (isManage) {
                    if (item.name === '维护') { item.show = true; }
                    if (item.name === '查看流程') { item.show = true; }
                    if (item.name === '流程调度') { item.show = true; }
                }
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
                        obj[key] = !obj[key];
                    }
                }
            }
            return obj;
        },
        // $$ 流程图
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
        saveProcessChange: function(){
            let step = this.nowProcessActive;   // 当前要保存的流程
            this.$message({message:'当前功能还在期待中', type:"info"});
        },
        // 流程取消按钮
        cancelProcessChange: function(){
            this.nowProcessActive = this.savedProcessActive;
            this.tempProcessActive = this.savedProcessActive;
        },
        // $$ form表
        // // 重置表格标题
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

        // 初始化指定流程
        initProcessShow(key){
            console.log('initProcessShow：', key);
             // 行内印章废止申请流程
            let innerProcess = [
                {step: 1, key: '', title: '起草',                  desc: '', initFn: 'initProcessStep1'},
                {step: 2, key: '', title: '申请单位主要负责人审批',  desc: '', initFn: 'initProcessStep2'},
                {step: 3, key: '', title: '申请单位综合处理',       desc: '', initFn: 'initProcessStep3'},
                {step: 4, key: '', title: '办公室综合处理',         desc: '', initFn: 'initProcessStep4'},
                {step: 5, key: '', title: '印章保管人处理',         desc: '', initFn: 'initProcessStep5'},
                {step: 6, key: '', title: '交印人确认',             desc: '', initFn: 'initProcessStep6'},
                {step: 7, key: '', title: '保管人处理',             desc: '', initFn: 'initProcessStep7'},
            ];
            // 跨行印章废止申请流程
            let outerProcess = [
                {step: 1, key: '', title: '起草',                   'desc': '', initFn: 'initProcessStep1' },
                {step: 2, key: '', title: '申请单位主要负责人审批',  'desc': '', initFn: 'initProcessStep2'},
                {step: 3, key: '', title: '申请单位综合处理',        'desc': '', initFn: 'initProcessStep3'},
                {step: 4, key: '', title: '上级行办公室综合处理',    'desc': '', initFn: 'initProcessStep4'},
                {step: 5, key: '', title: '上级行印章保管人处理',    'desc': '', initFn: 'initProcessStep5'},
                {step: 6, key: '', title: '交印人确认',              'desc': '', initFn: 'initProcessStep6'},
                {step: 7, key: '', title: '上级行保管人处理',        'desc': '', initFn: 'initProcessStep7'},
            ];
            let processes = innerProcess;
            let step = 1;
            for (let i=0, len=processes.length; i<len; i++) {
                if (processes[i].key === key) {
                    step = processes[i].step;
                    break;
                }
            }
            // 流程组件中从0开始
            this.processes = processes;     // 所有的流程;
            this.savedProcessActive = step - 1;
            this.nowProcessActive = step - 1;
            this.tempProcessActive = step - 1;
        },

        // 初始化页面元素的显隐和校验规则
        initProcessRules(){
            this.getLink().then((resArr) => {
                console.log('获取到配置信息成功：', resArr, ' 最终页面模式:', this.finalDocStatus);
                let [res, stepPageConfig, managerPageConfig, seePageConfig] = resArr;
                this.stepMessage = res.data;
                this.stepPageConfig = stepPageConfig;
                this.managerPageConfig = managerPageConfig;
                this.seePageConfig = seePageConfig;
                // 新建-new
                if (this.finalDocStatus === 'new') {
                    this.loadPageConfig(this.stepPageConfig);
                // 编辑-modify
                } else if (this.finalDocStatus === 'modify') {
                    this.loadPageConfig(this.stepPageConfig);
                // 查看-see
                } else if (this.finalDocStatus === 'see') {
                    this.loadPageConfig(this.seePageConfig);
                // 管理员编辑-managerModify
                } else if (this.finalDocStatus === 'managerModify') {
                    this.loadPageConfig(this.managerPageConfig);
                // 其他
                } else {
                    this.loadPageConfig(this.seePageConfig);
                }
                setTimeout(() => {
                    console.log('清除页面初始化时的校验提示信息', this.$refs);
                    this.$refs['elForm'].clearValidate();   // 清除校验提示信息
                }, 100);
            }, (err) => {
                console.log('获取页面配置信息失败:', err);
                this.$message({message: '获取页面配置信息失败，只能查看！', info:'warning'});
                this.seePageConfig = this.getSeePageConfig( this.getPageConfig() );
                this.loadPageConfig(this.seePageConfig);
            });
            // // 查看文档模式
            // if ('see' === this.docStatus) {
            //     this.initProcessStep_See();
            //     return;
            // }
            // // 其余文档模式，显示规则根据环节而不同
            // let stcd = this.form.Stmp_Aply_StCd;    // 当前所处的环节
            // switch (stcd) {
            //     /* 公共印章废止申请流程 */
            //     case 'A00': // 1.起草
            //         this.initProcessStep_A00(); 
            //         break;
            //     case 'A01': // 申请单位主要负责人审批
            //         this.initProcessStep_A01();
            //         break;
            //     case 'A02': // 申请单位综合处理
            //         this.initProcessStep_A02();
            //         break;

            //     /* 行内印章废止申请流程 */
            //     case 'A05': // 办公室综合处理
            //         this.initProcessStep_A05();
            //         break;
            //     case 'A21': // 印章保管人处理
            //         this.initProcessStep_A21();
            //         break;
            //     case 'A10': // 交印人确认
            //         this.initProcessStep_A10();
            //         break;
            //     case 'A11': // 保管人处理
            //         this.initProcessStep_A11();
            //         break;

            //     /* 跨行印章废止申请流程 */
            //     case 'A12': // 上级行办公室综合处理
            //         this.initProcessStep_A12();
            //         break;
            //     case 'A13': // 上级行印章保管人处理
            //         this.initProcessStep_A13();
            //         break;
            //     case 'A14': // 上级行保管人处理
            //         this.initProcessStep_A14();
            //         break;
            //     case 'A99': // 办结
            //         this.initProcessStep_A99();
            //         break;
            //     default:
            //         console.log('不知道所处环节，无法初始化。');
            // }
        },
         // 系统管理员初始化
        initProcessStep_Manage(){
            console.log('初始化环节-系统管理员操作');
            // 可用按钮
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: true,  type:'' },
                {name: '引入废止依据',   show: true,  type:'' },
                {name: '归档打印',  show: true, type: ''}, 
                {name: '收藏',       show: true,  type:'' },
                {name: '流程调度',   show: true,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.buttonList = buttonList;
        },
        initProcessStep_See(){
            console.log('初始化环节See-查看');
            // this.activeFields = {};
            this.editFields = {};
            this.buttonList = [
                {name: '关闭',          show: true,  type:''},
                {name: '保存',          show: false,  type:''},
                {name: '完成并发送',     show: false,   type:''},
                {name: '办结',          show: false,  type:''},
                {name: '生成编号',      show: false,  type:'' },
                {name: '引入废止依据',  show: false,  type:'' },
                {name: '归档打印',      show: false, type: ''}, 
                {name: '收藏',          show: false,  type:''},
                {name: '流程调度',      show: false,  type:''},
                {name: '操作指南',      show: false,  type:''}
            ];
        },
        initProcessStep_A00(){
            console.log('初始化环节A00-起草');
            // 活动区域（非活动区域会被遮罩）
            let activeFields = {
                mgxxfh: true,   // 敏感信息防护
                sqrq:   true,   // 申请日期
                sqdw:   true,   // 申请单位
                sqr:    true,   // 申请人
                lxdh:   true,   // 联系电话
                fzyzmc: true,   // 废止印章名称
                fzyy:   true,   // 废止原因
                fzyj:   true,   // 废止依据
                fzrq:   true,   // 废止日期
                bz:     true,   // 备注
                sqdwzyfzryj: true,
            };
            this.editFields = {
                mgxxfh: true,   // 敏感信息防护
                sqrq:   true,   // 申请日期
                sqdw:   true,   // 申请单位
                lxdh:   true,   // 联系电话
                fzyzmc: true,   // 废止印章名称
                fzyy:   true,   // 废止原因
                fzyj:   true,   // 废止依据
                fzrq:   true,   // 废止日期
                bz:     true,   // 备注
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: true,  type:'' },
                {name: '引入废止依据',   show: true,  type:'' },
                {name: '归档打印',  show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            let rules = {
                Stmp_Aply_Crt_Tm: [         // 申请日期
                    {required: true, message: '请选择申请日期', trigger: 'change'}
                ],
                Stmp_Aply_Psn_Blng_InsNm: [ // 申请单位
                    {required: true, message: '请选择申请单位', trigger: 'change'},
                ],  
                Stmp_Aply_Psn_Nm: [         // 申请人
                    {required: true, message: '请选择或输入申请人', trigger: 'blur'}
                ],
                Stmp_Aply_Psn_Ctc_Tel: [    // 联系电话
                    {required: true, message: '请输入联系电话', trigger: 'blur'}
                ],
                Stmp_Aply_Rsn: [            // 废止原因
                    {required: true, message: '请选择或输入废止原因', trigger: 'blur'}
                ],
                Repl_Dt: [                  // 废止日期
                    {required: true, message: '请选择废止日期', trigger: 'change'}
                ]
            };
            // TODO:废止依据
            this.activeFields = activeFields;
            this.buttonList = buttonList;
            this.rules = rules;
        },
        initProcessStep_A01(){
            console.log('初始化环节A01-申请单位主要负责人审批');
            let activeFields = {
                sqdwzyfzryj: true,  // 申请单位主要负责人意见
                bz: true,           // '备注'
            };
            this.editFields = {
                sqdwzyfzryj: true,  // 申请单位主要负责人意见
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: false,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;

            // 额外的校验方法
            this.moreValidate = function(callback){
                if (this.form.Stmp_Aply_StCd === 'A01' && this.form.leadAuthorIdeas[0]._message === '') {
                    callback.call(this, new Error('请输入申请单位主要负责人意见！'));
                } else {
                    callback.call(this, null);
                }
            };
        },
        initProcessStep_A02(){
            console.log('初始化环节A02-申请单位综合处理');
            let activeFields = {
                bz:     true,   // '备注'
            };
            this.editFields = {};
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: false,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        initProcessStep_A05(){
            console.log('初始化环节A05-办公室综合处理');
            let activeFields = {
                bz:     true,   // '备注'
            };
            this.editFields = {};
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: false,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            let rules = { };
            this.activeFields = activeFields;
            this.buttonList = buttonList;
            this.rules = rules;
        },
        initProcessStep_A21(){
            console.log('初始化环节A21-印章保管人处理');
            let activeFields = {
                cfdd:   true,   // 存放地点
                fcqx:   true,   // 封存期限
                bz:     true,   // '备注'
            };
            this.editFields = {
                cfdd:   true,
                fcqx:   true,
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: false,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            let rules = {
                 Gds_Strg_Plc_Nm: [
                    {required: true, message: '请输入存放地点', trigger: 'blur'}
                ],  // 存放地点
                Ach_Ddln: [
                    {required: true, message: '请输入封存期限', trigger: 'blur'}
                ],  // 封存期限
            };
            this.activeFields = activeFields;
            this.buttonList = buttonList;
            this.rules = rules;
        },
        initProcessStep_A10(){
            console.log('初始化环节A10-交印人确认');
            let activeFields = {
                jyr:    true,   // 交印人
                jysj:   true,   // 交印时间
                bz:     true,   // 备注
            };
            this.editFields = {
                jyr:    true,
                jysj:   true
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: false,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        initProcessStep_A11(){
            console.log('初始化环节A11-保管人处理');
            let activeFields = {
                bgr:    true,   // 保管人
                bh:     true,   // 编号
                jssj:   true,   // 接收时间
                bz:     true,   // 备注
            };
            this.editFields = {
                bgr:    true,
                bh:     true,
                jssj:   true,
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: false,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: true,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            let rules = {
                Apl_Aply_ID: [      // 编号
                    {required: true, message: '编号必填', trigger: 'change'}
                ]
            };
            this.activeFields = activeFields;
            this.buttonList = buttonList;
            this.rules = rules;

            // 生成编号
            if (!this.form.Apl_Aply_ID) {
                this.getAplyId();
            }
        },
        initProcessStep_A12(){
            console.log('初始化环节A12-上级行办公室综合处理');
            let activeFields = {
                bz:     true,   // 备注
            };
            this.editFields = {};
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: false,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        initProcessStep_A13(){
            console.log('初始化环节A13-上级行印章保管人处理');
            let activeFields = {
                cfdd:   true,   // 存放地点
                fcqx:   true,   // 封存期限
                bz:     true,   // 备注
            };
            this.editFields = {
                cfdd:   true,
                fcqx:   true,
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: false,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            let rules = {
                 Gds_Strg_Plc_Nm: [
                    {required: true, message: '请输入存放地点', trigger: 'blur'}
                ],  // 存放地点
                Ach_Ddln: [
                    {required: true, message: '请输入封存期限', trigger: 'blur'}
                ],  // 封存期限
            };
            this.activeFields = activeFields;
            this.buttonList = buttonList;
            this.rules = rules;
        },
        initProcessStep_A14(){
            console.log('初始化环节A14-上级行保管人处理');
            let activeFields = {
                bgr:    true,   // 保管人
                bh:     true,   // 编号
                jssj:   true,   // 接收时间
                bz:     true,   // 备注
            };
            this.editFields = {
                bgr:    true,
                bh:     true,
                jssj:   true,
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: false,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生成编号',   show: true,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            let rules = {
                Apl_Aply_ID: [      // 编号
                    {required: true, message: '编号必填', trigger: 'change'}
                ]
            };
            this.activeFields = activeFields;
            this.buttonList = buttonList;
            this.rules = rules;
            
            // 生成编号
            if (!this.form.Apl_Aply_ID) {
                this.getAplyId();
            }
        },
        initProcessStep_A99(){
            console.log('初始化环节A99-办结');
            let activeFields = {};
            this.editFields = {};
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: false,  type:''},
                {name: '完成并发送', show: false,   type:''},
                {name: '办结',       show: false,  type:''},
                {name: '生成编号',   show: false,  type:'' },
                {name: '引入废止依据',   show: false,  type:'' },
                {name: '归档打印',   show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        // // $$ 全局事件绑定函数
        // // resize事件触发的函数
        // resizeWorks(event){
        //     // console.log('resize事件触发函数：', this, this.$refs);
        //     this.resizeSlider();
        //     this.resizeMainTitle();
        // },
        // // scroll事件触发的函数
        // scrollWorks(event){
        //     // console.log('scroll事件触发函数：', this, this.$refs);
        //     // 滚动时按钮区header固定到顶部不随着滚动
        //     let headerDom = this.$refs.elheader.$el;    // 按钮区元素
        //     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  // 滚动的距离
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
                    // 排序（降序）。根据Stmp_Aprv_Bsn_ID字段
                    let sortPicks = this.sortIdeaFields(picks[key], 'Stmp_Aprv_Bsn_ID');
                    // 加工成意见域数据
                    results[key] = this.createMessageOneData(sortPicks);
                }
            }
            cb(results);
        },
    },
    created() {
        console.log('abolishedDraft页面生命周期created:', this.$route);
        let that = this;
        this.mockDatas = mockDatas;
        // 存储当前操作人的信息
        this.storage.userInfo = JSON.parse(localStorage.userInfo);          // 用户信息
        this.storage.tcHumanRole = JSON.parse(localStorage.tcHumanRole);    // 用户角色信息

        // 是否是系统管理员
        this.isManage = false;
    
        this.aplyId = this.$route.query.id || '';           // 印章废止申请业务编号.除了新建，每条记录都会有这个
        this.docStatus = this.$route.query.type || 'see';   // 文档类型 new-新建 modify-修改 see-查看
        this.finalDocStatus = this.docStatus;               // 文档的最终状态
        this.title = '中国建设银行印章废止审批单';            // 文档的标题

        // 审批
        if (this.aplyId) {
            let params = {
                Unit_Dept_EmpID:        this.storage.userInfo.humanId + '',     // 员工ID
                Token_Inf_ID:           localStorage.st,                        // ccbtoken
                Stmp_Repl_Aply_Bsn_ID:  this.aplyId,                            // 印章废止申请业务编号
            };
            let options = {warningLevel: 1, warningTitle: '查询印章废止申请详细信息失败！'};
            this.$api.sealManage.sealAbolished.getSealAbolishedApplyDetails(params, options).then(res => {
                console.log('查询废止详情成功：', res);
                this.details = res;
                this.title = '中国建设银行印章废止审批单';                            // 文档的标题
                this.Cur_Pcs_Dsc                   = res.Cur_Pcs_Dsc;               // OA工作流程描述字符串

                this.form.Cur_Pcs_Dsc              = res.Cur_Pcs_Dsc;               // OA工作流程描述字符串
                this.form.Stmp_Repl_Aply_Bsn_ID    = res.Stmp_Repl_Aply_Bsn_ID;     // 印章废止申请业务编号
                this.form.Stmp_ECD                 = res.Stmp_ECD;                  // 印章编码
                this.form.Stmp_Dspl_Inst_Nm        = res.Stmp_Dspl_Inst_Nm;         // 印章名称
                this.form.Stmp_Aply_Crt_Tm         = res.Stmp_Aply_Crt_Tm;          // 申请日期
                this.form.Snstv_Inf_IndCd          = res.Snstv_Inf_IndCd;           // 敏感信息标志代码。三位字符串
                this.form.Apl_Aply_ID              = res.Apl_Aply_ID;               // 编号
                this.Stmp_Aply_StCd                = res.Stmp_Aply_StCd;            // 当前环节
                this.form.Stmp_Aply_StCd           = res.Stmp_Aply_StCd;            // 当前环节
                this.form.Stmp_Aply_Psn_ID         = res.Stmp_Aply_Psn_ID;          // 印章申请人编号
                this.form.Stmp_Aply_Psn_Nm         = res.Stmp_Aply_Psn_Nm;          // 印章申请人名称
                this.form.Stmp_Aply_Rsn            = res.Stmp_Aply_Rsn;             // 废止原因
                this.form.Repl_Dt                  = res.Repl_Dt;                   // 废止日期
                this.form.Gds_Strg_Plc_Nm          = res.Gds_Strg_Plc_Nm;           // 存放地点
                this.form.Ach_Ddln                 = res.Ach_Ddln;                  // 封存期限,单位年
                this.form.Stmp_Aply_Psn_Blng_InsID = res.Stmp_Aply_Psn_Blng_InsID;  // 申请单位编号
                this.form.Stmp_Aply_Psn_Blng_InsNm = res.Stmp_Aply_Psn_Blng_InsNm;  // 申请单位名称
                this.form.Stmp_Aply_Psn_Ctc_Tel    = res.Stmp_Aply_Psn_Ctc_Tel;     // (申请人)联系电话
                this.form.Txn_Atch_Nm              = res.Txn_Atch_Nm;               // 废止依据
                // （流程调度的）所有环节，操作员是系统管理员时才有值
                this.form.Pcs_Lnk_Inf_Dsc = res.Pcs_Lnk_Inf_Dsc ? JSON.parse(res.Pcs_Lnk_Inf_Dsc) : [];
                // 完成并发送下一节点的环节
                this.form.Parm_Next_Lnk_Inst_Dsc = res.Parm_Next_Lnk_Inst_Dsc ? JSON.parse(res.Parm_Next_Lnk_Inst_Dsc) : [];
                // 完成并发送下一节点的部门
                this.form.Parm_Next_Lnk_Inst_Nm = res.Parm_Next_Lnk_Inst_Nm ? JSON.parse(res.Parm_Next_Lnk_Inst_Nm) : [];
                
                 /* 分拣，排序，加工生成意见域的初始数据（越新的数据越排在数组的前边） */
                this.handlerIdeaFields(res.LIST1, this.ideaFieldFlags, (ideaFieldsData) => {
                    console.log('加工后的意见域结果:', ideaFieldsData);
                    this.ideaFieldsData = ideaFieldsData;
                    this.form.remarks = this.ideaFieldsData['A00'];             // 备注
                    this.form.leadAuthorIdeas = this.ideaFieldsData['A01'];     // 申请单位主要负责人意见
                    this.form.handOverMan_Origin = this.ideaFieldsData['A10'];  // 交印人和交印时间原始数据
                    // 保管人和接收时间原始数据
                    if ( !this.ideaFieldsData['A11'][0]._isEmpty ) {
                        this.form.saveSealMan_Origin = this.ideaFieldsData['A11'];
                    } else if ( !this.ideaFieldsData['A14'][0]._isEmpty ) {
                        this.form.saveSealMan_Origin = this.ideaFieldsData['A14'];
                    } else {
                        this.form.saveSealMan_Origin = [];
                    }
                }); 
                // // 生成意见域的初始数据
                // let picks = this.pickIdeaFields(res.LIST1, this.ideaFieldFlags);
                // console.log('意见域的数据', this.ideaFieldFlags, picks);
                // for (let key in picks) {
                //     if ( picks.hasOwnProperty(key) ) {
                //         this.form.ideaFieldsData[key] = this.createMessageOneData( picks[key] );
                //     }
                // }
                // console.log('生成的意见域初始数据：', this.form.ideaFieldsData);
                // this.form.leadAuthorIdeas = this.form.ideaFieldsData['A01'];    // 申请单位主要负责人意见
                // this.form.handOverMan_Origin = this.form.ideaFieldsData['A10'];        // 交印人
                // this.form.remarks = this.createMessageOneData();                // 备注
                // // 保管人
                // if ( !this.form.ideaFieldsData['A11'][0]._isEmpty ) {
                //     this.form.saveSealMan_Origin = this.form.ideaFieldsData['A11'];
                // } else if ( !this.form.ideaFieldsData['A14'][0]._isEmpty ) {
                //     this.form.saveSealMan_Origin = this.form.ideaFieldsData['A14'];
                // } else {
                //     this.form.saveSealMan_Origin = [];
                // }
                
                // 根据环节初始化页面元素的显隐、校验规则、置灰
                setTimeout(() => {
                    this.initProcessRules();
                }, 200);
                // 显示流程信息
                // this.initProcessShow(this.form.Stmp_Aply_StCd);

            });
            // .catch(err => {
            //     console.log('查询印章销毁申请详细信息失败:', err);
            //     let msg = err.BK_DESC + ' 跟踪号:[' + err._COMMON.P2S_EVT_TRACE_ID + ']';
            //     this.$message({
            //         message: '查询印章刻制记录详细信息失败！' + msg,
            //         type: 'error',
            //         showClose: true
            //     });
            // });

        // 新建
        } else {
            this.form.Stmp_Aply_StCd = 'A00';    // 当前所处的环节 A00-起草
            this.form.Stmp_Aply_Crt_Tm = this.$sealUtil.getNow();   // 自动生成申请日期
            if (this.storage.userInfo) {
                this.form.Stmp_Aply_Psn_Blng_InsID = this.storage.userInfo.currUnitId;      // 申请单位编号
                this.form.Stmp_Aply_Psn_Blng_InsNm = this.storage.userInfo.currUnitName;    // 申请单位名称
                this.form.Stmp_Aply_Psn_Ctc_Tel = this.getTelMobile();              // 联系电话
                this.form.Stmp_Aply_Psn_ID = this.storage.userInfo.humanId;         // 申请人编号
                this.form.Stmp_Aply_Psn_Nm = this.storage.userInfo.humanName;       // 申请人名字
            }
            this.form.leadAuthorIdeas = this.createMessageOneData();  // 申请单位主要负责人意见
            this.form.remarks = this.createMessageOneData();            // 备注
            // 根据环节初始化数据，页面元素的显隐、校验规则、置灰
            this.initProcessRules();
            // 显示流程信息
            // this.initProcessShow(this.form.Stmp_Aply_StCd);
        }

    },
    mounted(){
        console.log('生命周期 mouted --abolishedDragt');
        window.jk = this;
        console.log('路由:', this.$route);
        const that = this;
        // setTimeout(() => {
        //     console.log('this与that', this, this === that);
        //     this.$nextTick(() => {
        //         console.log('$nextTick', this, this === that);
        //         this.resizeWorks();
        //         window.addEventListener('resize', this.resizeWorks);
        //         window.addEventListener('scroll', this.scrollWorks);
        //     });
        // }, 0);
        // // 清除页面初始化时的校验提示信息，只能异步延时才生效
        // setTimeout(()=>{
        //     console.log('清除页面初始化时的校验提示信息');
        //     this.$refs['elForm'].clearValidate();   // 清除校验提示信息。
        // }, 100);
    },
    // 使用this.$router.go(-1)和this.$router.push(url)跳转页面后，销毁刚才的页面时会执行这个方法
    beforeDestroy(){
        // 解绑绑定的全局事件。
        console.log('生命周期 beforeDestroy --abolishedDragt');
        // window.removeEventListener('resize', this.resizeWorks);
        // window.removeEventListener('scroll', this.scrollWorks);
    },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    .adminAbolishedDraft {
        min-height: 100vh;
        position: relative;
    }
    .red {
        color: '#E00';
    }
    .textCenter {
        text-align: center;
    }

    /* header */
    // .el-header {
    //     width: 100%;
    //     background-color: #409eff;
    //     color: #333;
    //     line-height: 60px;
    //     z-index: 2;
    //     .slider-contaner {
    //         width: 100%;
    //         height: 60px;
    //         overflow: hidden;
    //         position: relative;
    //     }
    //     .slider {
    //         width: 1400px;
    //         height: 60px;
    //     }
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

    /* main */
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
        .abolished-mainform {
            width: 94%;
            border:  1px solid #dcdfe6;
            padding: 1% 1%;
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
    }
</style>