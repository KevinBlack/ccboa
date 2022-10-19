<template>
    <!-- 这是印章管理》管理员查看》（管理员）印章销毁审批 -->
    <div class="adminSealDestroyDraft">
         <el-container direction="vertical">
            <!-- header:页头，功能区。el-header无法自适应高度-->
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
                            @click="headerBtnClick(item)" plain  size="small"
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
                <el-form ref="elForm" :model="form" :rules="rules" label-width="100px" class="sealDestroy-mainform">
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
                        <el-col :xs="12" :sm="16" :class="{wrap: hasWrap('bh')}">
                            <el-form-item label="编号" prop="Apl_Aply_ID">
                                <el-input v-model="form.Apl_Aply_ID" :disabled="readFields.bh" :readonly="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="8" :class="{wrap: hasWrap('sqrq')}">
                            <el-form-item label="申请日期" prop="Stmp_Aply_Crt_Tm">
                                <el-date-picker 
                                    style="width: 100%;"
                                    type="date"  placeholder="请选择日期" 
                                    :disabled="readFields.sqrq"
                                    v-model="form.Stmp_Aply_Crt_Tm" 
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" :class="{wrap: hasWrap('sqdw')}">
                            <el-form-item label="申请单位" prop="applyRegion_Origin">
                                <!-- <el-input v-model="form.applyRegion_Origin"></el-input> -->
                                <select-org-or-dept @select="selectDept" :disabled="readFields.sqdw">
                                    <el-input
                                        type="text"  readonly="readonly"  placeholder="请选择申请单位"
                                        :disabled="readFields.sqdw"
                                        v-model="form.applyRegion_Origin" suffix-icon="el-icon-arrow-down">
                                    </el-input>
                                </select-org-or-dept>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :class="{wrap: hasWrap('sqr')}">
                            <el-form-item label="申请人" prop="Stmp_Aply_Psn_Nm">
                                <el-input v-model="form.Stmp_Aply_Psn_Nm" :disabled="readFields.sqr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :class="{wrap: hasWrap('lxdh')}">
                            <el-form-item label="联系电话" prop="Stmp_Aply_Psn_Ctc_Tel">
                                <el-input 
                                    v-model="form.Stmp_Aply_Psn_Ctc_Tel" 
                                    :disabled="readFields.lxdh" 
                                    placeholder="请输入联系电话"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('xhyzmc')}">
                            <el-form-item label="销毁印章名称" prop="destroySeals">
                                <tree-destroyseal 
                                    v-model="form.destroySeals" :disabled="readFields.xhyzmc"
                                ></tree-destroyseal>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('xhyy')}">
                            <el-form-item label="销毁原因" prop="destroyReason">
                                <el-input v-model="form.destroyReason" :disabled="readFields.xhyy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('dabmjdyj')}">
                            <el-form-item label="档案部门鉴定意见" prop="appraisalOpinions">
                                <message-some
                                    v-model="form.appraisalOpinions"
                                    :disabled="!editedIdeaFields.dabmjdyj"
                                ></message-some>
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.appraisalOpinions" :key="index">
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
                                            message_placeholder="请输入鉴定意见"
                                            @result="handlerResult_appraisalOpinions"
                                        ></message-one>
                                    </div>
                                </el-card> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('gsqk')}">
                            <el-form-item label="公示情况" prop="publicity">
                                <message-some
                                    v-model="form.publicity"
                                    :disabled="!editedIdeaFields.gsqk"
                                ></message-some>
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.publicity" :key="index">
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
                                            message_placeholder="请输入公示内容"
                                            @result="handlerResult_publicity"
                                        ></message-one>
                                    </div>
                                </el-card> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('bgsldsq')}">
                            <!-- <el-form-item label="办公室领导审签" required> -->
                            <el-form-item label="办公室领导审签" prop="officeApprover">
                                <message-some
                                    v-model="form.officeApprover"
                                    :disabled="!editedIdeaFields.bgsldsq"
                                ></message-some>
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.officeApprover" :key="index">
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
                                            message_placeholder="请输入审签内容"
                                            @result="handlerResult_officeApprover"
                                        ></message-one>
                                    </div>
                                </el-card> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10" :class="{wrap: hasWrap('xhrq')}">
                            <el-form-item label="销毁日期" prop="Stmp_Act_Dstr_Tm">
                                <el-date-picker 
                                    style="width: 100%;"
                                    type="date" placeholder="请选择日期" 
                                    :disabled="readFields.xhrq"
                                    v-model="form.Stmp_Act_Dstr_Tm"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14" :class="{wrap: hasWrap('xhdd')}">
                            <el-form-item label="销毁地点" prop="Clrg_Plc_Nm">
                                <el-input v-model="form.Clrg_Plc_Nm" :disabled="readFields.xhdd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('xhr')}">
                            <el-form-item label="销毁人" prop="xhr">
                                <message-some
                                    v-model="form.xhr"
                                    :disabled="!editedIdeaFields.xhr"
                                ></message-some>
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.xhr" :key="index">
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
                                            message_placeholder="请输入销毁人"
                                            @result="handlerResult_xhr"
                                        ></message-one>
                                    </div>
                                </el-card> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" :class="{wrap: hasWrap('jxr')}">
                            <el-form-item label="监销人" prop="jxr">
                                <message-some
                                    v-model="form.jxr"
                                    :disabled="!editedIdeaFields.jxr"
                                ></message-some>
                                <!-- <el-card shadow="never" class="card-minPadding">
                                    <div v-for="(item, index) in form.jxr" :key="index">
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
                                            message_placeholder="请输入监销人"
                                            @result="handlerResult_jxr"
                                        ></message-one>
                                    </div>
                                </el-card> -->
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
                                <!-- <el-input 
                                    type="textarea" 
                                    :rows="5" 
                                    :disabled="!editedIdeaFields.bz"
                                    v-model="form.remarks" 
                                ></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="附件" prop="fj">
                                <el-card shadow="none">
                                    <div class="uploader-drop">
                                        <el-button @click="addAttachFile" :disabled="readFields.fj">浏览</el-button>
                                        <span class="load_accessory">{{defaultAttachTips_computed}}</span>
                                    </div>
                                    <div class="uploader-list" v-show="upFileConfig.list.length > 0">
                                        <template>
                                            <div>
                                                <p class="uploader-list-msg">
                                                    <span class="upload-list-name">
                                                        {{upFileConfig.list[0] && upFileConfig.list[0].p9Id}}
                                                    </span>
                                                </p>
                                                <div class="uploader-list-btns">
                                                    <el-button
                                                        type="warning"  size="mini"  round
                                                        @click.native="deleteAttachFile"
                                                        :disabled="readFields.fj"
                                                    >删除</el-button>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </el-card>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-main>
            <el-footer></el-footer>
        </el-container>
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
                @showCompDialog="showCompDialog">
            </select-person>
        </div>
    </div>
</template>

<script>
/*** 印章管理》管理员查看》（管理员）印章销毁审批 ***/

// 设置页面元素显隐、置灰、校验等功能，
import pageSetMixins from "@/minixs/index";

// 导入销毁印章选择组件
import treeSelect from '@/views/sealManage/sealDestroy/components/tree-select.vue'
import treeDestroyseal from '@/views/sealManage/sealDestroy/components/tree-destroyseal.vue'

// 导入上传文件到P9组件
import uploadFileToP9 from '@/components/uploadFile/uploadFileToP9'

 // 导入选人组件（完成并发送时使用）
import selectPerson from '@/components/tree/tree-fawen'

// 导入部门机构选择组件
import selectOrgOrDept from "@/components/select/selectOrgOrDept";

// 导入流程显示组件
import processLong from '@/views/sealManage/sealDestroy/components/process-long.vue'

// 导入留言输入显示组件
import MessageOne from '@/components/optionalfield/message-one.vue'
import MessageSome from '@/components/optionalfield/message-some.vue'

// 查看流程组件
import shiwuFlow from "@/components/viewFlow/shiwuFlow";

// 导入模拟公共数据
import mockDatas from '@/views/sealManage/sealDestroy/common/mockDatas'

// 导入模拟方法（临时）
import jkMockAPI from '@/views/sealManage/sealDestroy/common/jkMockAPI'

export default {
    name: 'adminSealDestroyDraft',
    components: {
        'process-long' : processLong,
        'message-one': MessageOne,
        'message-some': MessageSome,
        'tree-select': treeSelect,
        'select-person': selectPerson,
        'select-org-or-dept': selectOrgOrDept,
        'tree-destroyseal': treeDestroyseal,
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
                multiTenancyID: 'CN0035', // 多实体标识ID
                pcsInst: '',        // 流程实例ID
                tplNo: '',          // 流程模板ID 
                pcsActID: '',       // 当前活动ID
                pcsNodeID: '',      // 当前环节ID
                pcsNodeNm: '',      // 当前环节名称
                humanID: '',        // 当前处理人OA编号
                humanName: '',      // 当前处理人姓名
            },  // OA工作流程描述对象
            doneProgressList: [],       // 已完成的流程
            aplyId: '',                 // 印章刻制申请业务编号,唯一确定一条记录
            currentNodeNm: '',          // 当前环节的名字
            storeDocStatus: '',         // 存储的页面状态
            finalDocStatus: 'see',      // 最终的页面状态 new-新建 modify-编辑 managerModify-管理员编辑 see-查看
            docStatus: '',              // 文档类型 new-新建 modify-修改 see-查看
            docStatusMaps: {            // 文档状态-名字对应列表
                'new':      '新建',
                'modify':   '编辑',
                'see':      '查看'
            },
            storage: {},                // 当前操作员的信息
            details: null,              // 记录的详细信息
            mockDatas: null,            // 模拟数据
            activeFields: [],           // 可输入栏位原始数据
            isManage: false,            // 是否是系统管理员
            upFileConfig: {
                list: [],               // 已经上传的文件。对象数组{fileName:xx, fileUrl:xx, p9Id:xx}
                start: false,           // 启动上传附件组件
                info:  '',              // 上传附件提示信息
                maxFileSize: 30 * 1024 * 1024,  // 上传文件的最大值，单位为字节，默认为30M
                whiteList: ['zip', 'rar', 'pdf', 'xlxs', 'xls', 'doc', 'docx', 'txt', 'jpg'],  // 允许上传文件的类型
            },
            /* form校验规则，元素显隐，置灰 */
            managerPageConfig: {},  // 页面管理员配置
            seePageConfig: {},      // 页面查看配置
            stepPageConfig: {},     // 页面环节配置
            rules: {},              // 校验规则
            readFields: {
                mgxxfh:     false,  // 敏感信息防护
                bh:         false,  // 编号
                sqrq:       false,  // 申请日期
                sqdw:       false,  // 申请单位
                sqr:        false,  // 申请人
                lxdh:       false,  // 联系电话
                xhyzmc:     false,  // 销毁印章名称
                xhyy:       false,  // 销毁原因
                xhrq:       false,  // 销毁日期
                xhdd:       false,  // 销毁地点
                fj:         false,  // 附件
            },  // 不可编辑的控制域（即只读）。设置元素的disabled属性。设置了的为true
            requiredFields: {
                mgxxfh:     false,  // 敏感信息防护
                bh:         false,  // 编号
                sqrq:       false,  // 申请日期
                sqdw:       false,  // 申请单位
                sqr:        false,  // 申请人
                lxdh:       false,  // 联系电话
                xhyzmc:     false,  // 销毁印章名称
                xhyy:       false,  // 销毁原因
                xhrq:       false,  // 销毁日期
                xhdd:       false,  // 销毁地点
            },  // 必填的控制域。在rules中配置。设置了的为true
            editedIdeaFields: {
                dabmjdyj:   true,   // 档案部门鉴定意见
                gsqk:       true,   // 公示情况
                bgsldsq:    true,   // 办公室领导审签
                xhr:        true,   // 销毁人
                jxr:        true,   // 监销人
                bz:         true,   // 备注
            },  // 可编辑意见域。设置元素的disabled属性，设置了的为false(同readFields相反，我也很恼火)
            requiredIdeaFields: {
                dabmjdyj:   false,  // 档案部门鉴定意见
                gsqk:       false,  // 公示情况
                bgsldsq:    false,  // 办公室领导审签
                xhr:        false,  // 销毁人
                jxr:        false,  // 监销人
                bz:         false,  // 备注
            },  // 必填意见域。在rules中配置。设置了的为true
            buttonList: [
                {name: '关闭',           show: true,    type: 'gb'},
                {name: '保存',           show: false,   type: 'bc'},
                {name: '完成并发送',     show: false,   type: 'wcbfs'},
                {name: '办结',           show: false,   type: 'bj'},
                {name: '删除',          show: false,    type: 'shanchu'},
                {name: '生成编号',       show: false,   type: 'scbh'},
                {name: '引入印模',       show: false,   type: 'yrym'},
                {name: '引入外部单位销毁',   show: false,   type: 'yrwbdwxh'},
                {name: '归档打印',       show: false,   type: 'gddy'},
                {name: '维护',          show: false,    type: 'wh'},
                {name: '查看流程',       show: false,   type: 'sclc'},
                {name: '流程调度',       show: false,   type: 'lcdd'},
                {name: '操作指南',       show: false,   type: 'czzn'},
                {name: '收藏',           show: false,   type: 'sc'}
            ],  // 功能按钮.设置了的为true
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
            form: {
                Stmp_Aply_StCd:             '',         // 当前环节的编码
                ideaFieldsData:             {},         // 意见域的所有数据. key为标示字段，val是数据（对象数组）
                Pcs_Lnk_Inf_Dsc:            [],         // （流程调度的）所有环节
                Parm_Next_Lnk_Inst_Dsc:     [],         // 完成并发送下一节点的环节
                Parm_Next_Lnk_Inst_Nm:      [],         // 完成并发送下一节点的部门
                Snstv_Inf_IndCd_Origin:     [],         // 敏感信息防护原始数据.数组
                Snstv_Inf_IndCd:            '',         // 敏感信息防护.字符串
                Apl_Aply_ID:                '',         // 编号
                Stmp_Aply_Crt_Tm:           '',         // 申请日期
                Stmp_Aply_Psn_Blng_InsID:   '',         // 印章所属机构编号(申请单位编号)
                Stmp_Aply_Psn_Blng_InsNm:   '',         // 印章所属机构名称（申请单位名称）
                applyRegion_Origin:        '',          // 申请单位
                Stmp_Aply_Psn_Nm:          '',          // 申请人
                Stmp_Aply_Psn_Ctc_Tel:     '',          // 联系电话
                destroySeals:               [],         // 销毁印章(名字)列表
                destroyReason:              '',         // 销毁原因
                appraisalOpinions:          [],         // 档案部门鉴定意见
                publicity:                  [],         // 公示情况
                officeApprover:             [],         // 办公室领导审签
                Stmp_Act_Dstr_Tm:           '',         // 销毁日期
                Clrg_Plc_Nm:                '',         // 销毁地点
                xhr:                        [],         // 销毁人
                jxr:                        [],         // 监销人
                remarks:                    [],         // 备注
                Cur_Pcs_Dsc:                '',         // OA工作流程描述字符串
                StmpAplyAtchP9FileRte:      '',         // 外部单位销毁证明
            },
            
            ideaFieldFlags: {   // 意见域分类标示字段.
                'A00': 'Stmp_Aprv_TpCd',    // 备注
                'A20': 'Stmp_Aprv_TpCd',    // 档案部门鉴定
                'A21': 'Stmp_Aprv_TpCd',    // 公示情况
                'A07': 'Stmp_Aprv_TpCd',    // 办公室领导审批
                'A23': 'Stmp_Aprv_TpCd',    // 印章保管人销毁
                'A24': 'Stmp_Aprv_TpCd',    // 监销人
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
            /* 流程调度 */
            isFlowControl: false,   // 是否是流程调度
        }
    },
    computed: {
        // 默认的附件提示语
        defaultAttachTips_computed(){
            let whiteList = this.upFileConfig.whiteList,        // 白名单
                maxFileSize = this.upFileConfig.maxFileSize;    // 最大文件大小
            let tips = '';
            tips += whiteList ? '目前系统只支持' + whiteList.join('、') + '格式附件上传；' : '请选择文件上传';
            tips += maxFileSize ? '；最大不超过' + this.byteToMb(maxFileSize) + 'M' : '';
            tips += '；只支持一个附件！';
            return tips;
        },
        // 流动Id
        workflowId(){
            if (this.form.Cur_Pcs_Dsc) {
                let arr = this.form.Cur_Pcs_Dsc.split(',');
                return arr[1];
            }
        },
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
        // “按钮名-执行方法名” 对应关系
        btnsFnMap: function(){
            let fnMap = {};
            this.buttonList.forEach((item, index) => {
                fnMap[item.name] = item.fnName;
            });
            return fnMap;
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
                return false;
                // console.log('hasWrap', name);
                // if (this.isManage) { return false; }
                return !this.activeFields[name];
            }
        },
    },
    methods: {
        // 开始添加附件
        addAttachFile(){
            this.upFileConfig.info = this.defaultAttachTips_computed;
            this.upFileConfig.start = true;
        },
        // 将字节的大小转换为Mb。带1位小数
        byteToMb(size){
            return Number( (Number(size) / 1024 / 1024).toFixed(1) );
        },
        // 处理上传文件的返回值
        handlerFileP9Val(result){
            console.log('上传返回值：', result);
            this.upFileConfig.start = false;
            this.form.StmpAplyAtchP9FileRte = result[1];
        },
        // 获取编号
        getAplyId(){
            console.log('获取编号:', this.form.Stmp_Aply_StCd);
            let statusType = this.form.Stmp_Aply_StCd === 'A00' ? false : true;
            let params = {
                fileNo: undefined,      // 当有漏号时，选择流水号。可不传
                statusType: statusType, // true 需要生成编号;false 起草时，显示空的编号
                markOrderType: "6",     // 类型 6.销毁审批
            };
            this.$api.sealManage.getSealNum(params).then(res => {
                console.log("生成的编号成功:", res);
                this.form.Apl_Aply_ID = res.data;
            })
            .catch(err => {
                console.log('生产编号错误：', err);
                this.$message({message:'生产编号错误', type:"error"});
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

        // 获取环节配置信息 params：请求参数
        getLink(params) {
            if (!params) {
                if (this.aplyId) {  // 审批
                    params = {
                        humanId:        this.curPcs.humanID,        // 人员编号
                        multiTenancyId: this.curPcs.multiTenancyID, // 多实体标识ID eg:'CN0035'
                        pcsAvyId:       this.curPcs.pcsNodeID,      // 当前节点id
                        pcsTpId:        this.curPcs.tplNo,          // 流程模板id
                    };
                } else {    // 起草(新建)
                    params= {
                        humanId:        '',         // 人员编号
                        multiTenancyId: 'CN0035',   // 多实体标识ID.销毁是CN0035
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
        // 初始化页面元素的显隐和校验规则
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
                    this.$refs['elForm'].clearValidate();   // 清除校验提示信息
                }, 100);
            }, (err) => {
                console.log('获取页面配置信息失败:', err);
                this.$message({message: '获取页面配置信息失败，只能查看！', info:'warning'});
                this.finalDocStatus = 'see';
                this.seePageConfig = this.getSeePageConfig( this.getPageConfig() );
                this.loadPageConfig(this.seePageConfig);
            });
            // let stcd = this.form.Stmp_Aply_StCd;    // 当前所处的环节
            // switch (stcd) {
            //     case 'A00': // 1.起草
            //         this.initProcessStep1(); 
            //         break;
            //     case 'A20': // 2.档案部门鉴定 
            //         this.initProcessStep2();
            //         break;
            //     case 'A21': // 3.印章保管人处理
            //         this.initProcessStep3();
            //         break;
            //     case 'A07': // 4.办公室领导审批
            //         this.initProcessStep4();
            //         break;
            //     case 'A23': // 5.印章保管人销毁
            //         this.initProcessStep5();
            //         break;
            //     case 'A24': // 6.监销人处理
            //         this.initProcessStep6();
            //         break;
            //     case 'A25': // 7.印章保管人办结
            //         this.initProcessStep7();
            //         break;
            //     case 'A99': // 办结
            //         this.initProcessStep8();
            //         break;
            //     default:
            //         console.log('不知道所处环节，无法初始化。');
            // }
        },
        /* 接口 */
        // 新增一条销毁申请 op:额外的参数对象
        addSealDestroyApply(op){
            let params = {
                Snstv_Inf_IndCd:        this.form.Snstv_Inf_IndCd, 		    // 敏感信息保护
                Unit_Dept_EmpID:        this.storage.userInfo.humanId + '', // 员工ID
                Token_Inf_ID:           localStorage.st,                    // ccbtoken
                Apl_Aply_ID:            this.form.pl_Aply_ID,               // 编号
                Stmp_Aply_Rsn:          this.form.Stmp_Aply_Rsn,            // 申请理由
                Stmp_Aply_Psn_Ctc_Tel:  this.form.Stmp_Aply_Psn_Ctc_Tel,    // (申请人)联系电话
                LIST1:                  this.form.destroySeals,             // 销毁印章列表
            };
            this.copyTo(params, op);
            return this.$api.sealManage.sealDestroy.addSealDestroyApply(params);
        },
        // 印章销毁申请审批
        approveSealDestroyApply(op){
            let params = {
                Stmp_Dstr_Aply_Bsn_ID:  this.form.Stmp_Dstr_Aply_Bsn_ID,        // 印章销毁申请业务编号
                Unit_Dept_EmpID:        this.storage.userInfo.humanId + '',     // 员工ID
                Token_Inf_ID:           localStorage.st,                        // ccbtoken
                Stmp_Aply_ApvOpn_Cd:    this.form.Stmp_Aply_ApvOpn_Cd,          // 审批结果（印章申请审批意见代码） 01-同意 03-退回到起草 04-修改（流程调度时才用） 05-审批完成（办结）
                Stmp_Aply_ApvOpn_Dsc:   this.form.Stmp_Aply_ApvOpn_Dsc,         // 审批意见（印章申请审批意见描述）
                Stmp_Aply_Psn_Ctc_Tel:  this.form.Stmp_Aply_Psn_Ctc_Tel,        // 印章申请人联系电话
                StmpAplyAprvDstInsID:   this.form.StmpAplyAprvDstInsID + '',    // 下一个环节人所在机构的ID
                StmpAplyAprvDstInsNm:   this.form.StmpAplyAprvDstInsNm,         // 下一个环节人所在机构的名字
                WrkOrdrNextPcsgPsn_ID:  this.form.WrkOrdrNextPcsgPsn_ID + '',   // 下一处理人编号
                WrkOrdrNextPcsgPsn_Nm:  this.form.WrkOrdrNextPcsgPsn_Nm,        // 下一处理人名称
                Node_ID:                this.form.Node_ID + '',                 // 下一流程节点编号
                Node_Nm:                this.form.Node_Nm,                      // 下一流程节点名称
                Stmp_Act_Dstr_Tm:       this.form.Stmp_Act_Dstr_Tm,             // 印章实际销毁时间
                Clrg_Plc_Nm:            this.form.Clrg_Plc_Nm,                  // 销毁地点
                Apl_Aply_ID:            this.form.Apl_Aply_ID,                  // 编号
                StmpAplyAtchP9FileRte:  this.form.StmpAplyAtchP9FileRte,        // 附件（外部单位销毁证明）
            };
            this.copyTo(params, op);
            return this.$api.sealManage.sealDestroy.approveSealDestroyApply(params);
        },
        // // 查询某条印章销毁申请的的详细信息. id:印章销毁申请业务编号,可以唯一确认一条记录
        // getSealDestroyApplyDetails(id){
        //     let params = {
        //         Unit_Dept_EmpID:        this.storage.userInfo.humanId + '',     // 员工ID
        //         Token_Inf_ID:           localStorage.st,                        // tokenId
        //         Stmp_Dstr_Aply_Bsn_ID:  id,                                     // 印章销毁申请业务编号
        //     };
        //     return this.$api.sealManage.sealDestroy.getSealDestroyApplyDetails(params);
        // },

        /* 意见域 */
        // 档案部门鉴定意见
        handlerResult_appraisalOpinions(index, message, org, user, time){
            console.log('档案部门鉴定意见：', index, message, org, user, time);
            let item = this.form.appraisalOpinions[index];
            item._message = message;
            item._org = org;
            item._user = user;
            item._time = time;
        },
        // 公示情况
        handlerResult_publicity(index, message, org, user, time){
            let item = this.form.publicity[index];
            item._message = message;
            item._org = org;
            item._user = user;
            item._time = time;
        },
        // 办公室领导审签
        handlerResult_officeApprover(index, message, org, user, time){
            let item = this.form.officeApprover[index];
            item._message = message;
            item._org = org;
            item._user = user;
            item._time = time;
        },
        // 销毁人
        handlerResult_xhr(index, message, org, user, time){
            let item = this.form.xhr[index];
            item._message = message;
            item._org = org;
            item._user = user;
            item._time = time;
        },
        // 监销人
        handlerResult_jxr(index, message, org, user, time){
            let item = this.form.jxr[index];
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
         * 生成Message-one需要的数据。
         * @param {Array | *} list 要处理的某类数据。对象数组。list中有数据，就只处理；list没有数据则会生产一个空对象
         * @return {Array} 处理后的能作为message-one组件的数组。该数组至少包含一个对象。
         * 注意：这个会覆盖原来的_message,_user,_time,_org等字段哦
         */
        createMessageOneData(list, myfunc){
            let arr = [];
            let empty = this.createMessageOneEmptyData();   // 空的message-one对象,或待处理项
            /* list不是数组,则生成一个包含空message-one对象的数组 */
            if ( !Array.isArray(list) ) { return [empty]; }

            /* list是数组，则将数组值转化为message-one组件需要的值。如果有待处理项(02)，则确保待处理项放在数组首位 */
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

                // let todoItem = '';
                // arr = list.map( (item, index, array) => {
                //     let dsc = item.hasOwnProperty('Stmp_Aply_ApvOpn_Dsc') ? item.Stmp_Aply_ApvOpn_Dsc : '',
                //         orgId = item.hasOwnProperty('StmpAplyAprvPsnBInsID') ? item.StmpAplyAprvPsnBInsID : '',
                //         orgNm = item.hasOwnProperty('StmpAplyAprvPBgInstNm') ? item.StmpAplyAprvPBgInstNm : '',
                //         userId = item.hasOwnProperty('Stmp_Aply_Aprv_Psn_ID') ? item.Stmp_Aply_Aprv_Psn_ID : '',
                //         userNm = item.hasOwnProperty('Stmp_Aply_Aprv_Psn_Nm') ? item.Stmp_Aply_Aprv_Psn_Nm : '',
                //         time = item.hasOwnProperty('Stmp_Aply_Aprv_Tm') ? item.Stmp_Aply_Aprv_Tm : '';
                //     item._message = dsc;
                //     item._org = orgNm + '_' + orgId;
                //     item._user = userNm + '_' + userId;
                //     item._time = time;
                //     item._message_modify = 'disable';
                //     item._org_modify = 'disable';
                //     item._user_modify = 'disable';
                //     item._time_modify = 'disable';
                //     // 如果有待处理项，则将empty替换为待处理项（审批任务类型Stmp_Aply_ApvOpn_Cd为02，最多只有一条）
                //     if (item.Stmp_Aply_ApvOpn_Cd === '02') {
                //         item._message_modify = 'enable';
                //         todoItem = item;
                //         return '';
                //     } else {
                //         return item;
                //     }
                // });
                // arr.unshift(todoItem);
                // // 去掉数组中值为空(字符串)的项
                // arr = arr.filter((item) => {
                //     return !!item;  
                // });
            }
            console.log('createMessageOneData返回值:', arr, list);
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
            
            /* 审批结果(印章申请审批意见代码) 01-同意 04-修改（流程调度） 05-审批完成（办结） */
            if (this.isFlowControl) {   // 流程调度
                this.isFlowControl = false;
                this.form.Stmp_Aply_ApvOpn_Cd = '04';
            } else {                    // 完成并发送
                this.form.Stmp_Aply_ApvOpn_Cd = '01';
            }

            /* 审批意见（印章申请审批意见描述）*/
            let ideaField = {};
            if ( this.editedIdeaFields['dabmjdyj'] ) {          // 档案部门鉴定 
                ideaField = this.form.appraisalOpinions[0];
            } else if ( this.editedIdeaFields['gsqk'] ) {       // 公示情况
                ideaField = this.form.publicity[0];
            } else if ( this.editedIdeaFields['bgsldsq'] ) {    // 办公室领导审签
                ideaField = this.form.officeApprover[0];
            } else if ( this.editedIdeaFields['xhr'] ) {        // 销毁人
                // 不用传
            } else if ( this.editedIdeaFields['jxr'] ) {        // 监销人
                // 不用传
            } else if ( this.editedIdeaFields['bz'] ) {         // 备注
                ideaField = this.form.remarks[0];
            }
            this.form.Stmp_Aply_ApvOpn_Dsc = ideaField._message;

            // 点击的成功按钮：提交该环节信息
            this.approveSealDestroyApply().then(res => {
                console.log('审批成功：', res, this);
                // this.$router.push('/sealManage/sealDestroy/index');
                let msg = '审批成功!跟踪号:' + this.$sealUtil.getTraceId(res);
                let options = {confirmButtonText: '确定', type: 'success', showClose: false};
                this.$alert(msg, options).then(() => {
                    this.$intent.closeWindow(this);
                });
            })
            .catch(err => {
                console.log('审批失败：', err);
                this.$message({
                    message: '刻制审批 完成并发送 失败！',
                    type: 'error'
                });
            });
        },
        // 跳转到打印页面 TODO:添加条件
        toPrintPage(){
            let newPage = this.$router.resolve( {path: "/sealDestroyDocument", query: {id: this.aplyId}} );
            window.open(newPage.href, '_blank');
        },
        // 完成并发送
        saveAndToNext(){
            // 校验form表
            this.$refs['elForm'].validate((valid) => {
                // 校验通过
                if (valid) {
                    // 处于新建阶段（起草阶段走审批）
                    if (this.form.Stmp_Aply_StCd === 'A00' && !this.aplyId) {
                        this.addSealDestroyApply().then(res => {
                            this.aplyId = res.Stmp_Dstr_Aply_Bsn_ID;                                    // 印章刻制申请业务编号
                            this.form.Stmp_Dstr_Aply_Bsn_ID = res.Stmp_Dstr_Aply_Bsn_ID;                // 印章销毁申请业务编号
                            this.form.Parm_Next_Lnk_Inst_Dsc = JSON.parse(res.Parm_Next_Lnk_Inst_Dsc);  // 下一节点的环节.对象数组
                            this.form.Parm_Next_Lnk_Inst_Nm = JSON.parse(res.Parm_Next_Lnk_Inst_Nm);    // 下一节点的根部门.对象数组
                            this.showSelectPerson();
                        })
                        .catch(err => {
                            console.log('新增印章销毁申请记录报错啦：', err);
                            let msg = this.$sealUtil.getErrorStrInfo(err);
                            this.$message({
                                message: '新增印章销毁申请记录失败！' + msg,
                                type: 'error'
                            });
                        });
            
                    // 处于审批阶段
                    } else {
                        this.showSelectPerson();
                    }

                // 校验失败
                } else {
                    this.$message( {type: 'error', message: "请填写必填项"} );
                }
            });
        },
        // 完结
        finish(){
            // 起草环节（A00）
            if (this.form.Stmp_Aply_StCd === 'A00') {
                    // 审批结果（印章申请审批意见代码） 01-同意 03-退回到起草 04-修改（流程调度时才用） 05-审批完成（办结）
                this.form.Stmp_Aply_ApvOpn_Cd = '03';
            // 印章保管人办结环节（A25）
            } else if (this.form.Stmp_Aply_StCd == 'A25') {
                // 审批结果（印章申请审批意见代码） 01-同意 03-退回到起草 04-修改（流程调度时才用） 05-审批完成（办结）
                this.form.Stmp_Aply_ApvOpn_Cd = '05';
            }
            this.approveSealDestroyApply().then(res => {
                console.log('办结成功：', res);
                // this.$router.push('/sealManage/sealDestroy/index');
                let msg = '办结成功!跟踪号:' + this.$sealUtil.getTraceId(res);
                let options = {confirmButtonText: '确定', type: 'success', showClose: false};
                this.$alert(msg, options).then(() => {
                    this.$intent.closeWindow(this);
                });
            })
            .catch(err => {
                console.log('办结失败：', err);
                let msg = this.$sealUtil.getErrorStrInfo(err);
                this.$message( { message: '办结失败！' + msg, type: 'error'} );
            });
        },
        // 执行功能按钮对应的方法
        headerBtnClick(btnInfo){
            let btnName = btnInfo.name;
            console.log('你点击了按钮——' + btnName)
            switch (btnName) {
                case '关闭':
                    // this.$router.push('/sealManage/sealDestroy/index');
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
                case '生产编号':
                    this.getAplyId();
                    break;
                case '引入印模':
                    this.addAttachFile();
                    break;
                case '引入外部单位销毁':
                    this.addAttachFile();
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
                    break;
                default:
                    ;
            }
        },
        delete(){
            this.$message({message:'还未实现！', type:'info'});
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
            // 审批阶段 TODO:有接口后添加参数和添加接口
            let params = {curProcessInstId: this.workflowId};
            this.$api.sealManage.sealCommon.getLink_done(params)
                .then(res => {
                    console.log('toSeeDoneProcess返回的数据:', res);
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
                Apl_Aply_ID: [
                    {required: requiredFields.bh, message: '请点击“生成编号”按钮生成编号', trigger: 'blur'}
                ],  // 编号
                Stmp_Aply_Crt_Tm: [
                    // 如果加上type:'date'，则必须为日期对象，否则会报错
                    {required: requiredFields.sqrq, message: '请选择申请日期', trigger: 'change'}
                ],  // 申请日期
                applyRegion_Origin: [
                    {required: requiredFields.sqdw, message: '请选择申请单位', trigger: 'change'}
                ],  // 申请单位
                Stmp_Aply_Psn_Nm: [
                    { required: requiredFields.sqr, message: '必须有申请人', trigger: 'blur' }
                ],   // 申请人
                Stmp_Aply_Psn_Ctc_Tel: [
                    {required: requiredFields.lxdh, message: '请输入（申请人）联系电话', trigger: 'blur'}
                ],  // 联系电话
                destroySeals: [
                    {required: requiredFields.xhyzmc, message: '必填：销毁印章名称', trigger: 'blur'}
                ],  // 销毁印章名称
                destroyReason: [
                    {required: requiredFields.xhyy, message: '必填：销毁原因', trigger: 'blur'}
                ],  // 销毁原因
                appraisalOpinions: [
                    {required: requiredIdeaFields.dabmjdyj, message: '必填：档案部门鉴定意见', trigger: 'blur'}
                ],  // 档案部门鉴定意见
                publicity: [
                    {required: requiredIdeaFields.gsqk, message: '必填：公示情况', trigger: 'blur'}
                ],  // 公示情况
                officeApprover: [
                    {required: requiredIdeaFields.bgsldsq, message: '必填：办公室领导审签', trigger: 'blur'}
                ],  // 办公室领导审签
                Stmp_Act_Dstr_Tm: [
                    {required: requiredFields.xhrq, message: '必填：销毁日期', trigger: 'change'}
                ],  // 销毁日期
                Clrg_Plc_Nm: [
                    {required: requiredFields.xhdd, message: '必填：销毁地点', trigger: 'blur'}
                ],  // 销毁地点
                xhr: [
                    {required: requiredIdeaFields.xhr, message: '必填：销毁人', trigger: 'blur'}
                ],  // 销毁人
                jxr: [
                    {required: requiredIdeaFields.jxr, message: '必填：监销人', trigger: 'blur'}
                ],  // 监销人
                remarks: [
                    {required: requiredIdeaFields.bz, message: '必填：备注', trigger: 'blur'}
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
            let processes = [
                {step: 1, key: 'A00', title: '起草',           desc: '',   initFn: 'initProcessStep1'},
                {step: 2, key: 'A20', title: '档案部门鉴定',    desc: '',   initFn: 'initProcessStep2'},
                {step: 3, key: 'A21', title: '印章保管人处理',  desc: '',   initFn: 'initProcessStep3'},
                {step: 4, key: 'A07', title: '办公室领导审批',  desc: '',   initFn: 'initProcessStep4'},
                {step: 5, key: 'A23', title: '印章保管人销毁',  desc: '',   initFn: 'initProcessStep5'},
                {step: 6, key: 'A24', title: '监销人处理',      desc: '',   initFn: 'initProcessStep6'},
                {step: 7, key: 'A25', title: '印章保管人办结',  desc: '',   initFn: 'initProcessStep7'},
                {step: 8, key: 'A99', title: '办结',           desc: '',   initFn: 'initProcessStep7'},
            ];
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

        // 系统管理员初始化
        initProcessStepManage(){
            console.log('系统管理员初始化');
            // 可用按钮
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生产编号',   show: true,  type:'' },
                {name: '引入印模',   show: true,  type:'' },
                {name: '引入外部单位销毁',  show:true, type:''},
                {name: '归档打印',  show: true, type: ''}, 
                {name: '收藏',       show: true,  type:'' },
                {name: '流程调度',   show: true,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.buttonList = buttonList;
        },

        initProcessStep1(){
            console.log('初始化环节1-起草');
            // 可用输入项和可用按钮
            let activeFields = {
                mgxxfh: true,   // '敏感信息防护'
                bh:     true,   // 编号
                sqrq:   true,   // '申请日期'
                sqdw:   true,   // '申请单位'
                sqr:    true,   // '申请人'
                lxdh:   true,   // '联系电话'
                xhyzmc: true,   // '销毁印章名称'
                xhyy:   true,   // '销毁原因'
                bz:     true,   // '备注'
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生产编号',   show: true,  type:'' },
                {name: '引入印模',   show: true,  type:'' },
                {name: '引入外部单位销毁',  show: false, type:''},
                {name: '归档打印',  show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
            
        },
        initProcessStep2(){
            console.log('初始化环节2-档案部门鉴定');
            let activeFields = {
                // mgxxfh: true,   // '敏感信息防护', 
                dabmjdyj: true, // '档案部门鉴定意见'
                bz: true,       // '备注'
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生产编号',   show: false,  type:'' },
                {name: '引入印模',   show: false,  type:'' },
                {name: '引入外部单位销毁',  show:false, type:''},
                {name: '归档打印',  show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        initProcessStep3(){
            console.log('初始化环节3-印章保管人处理');
            let activeFields = {
                // mgxxfh: true,   // '敏感信息防护', 
                gsqk:   true,   // '公示情况', 
                bz:     true,   // '备注'
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生产编号',   show: false,  type:'' },
                {name: '引入印模',   show: false,  type:'' },
                {name: '引入外部单位销毁',  show:false, type:''},
                {name: '归档打印',  show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        initProcessStep4(){
            console.log('初始化环节4-办公室领导审批');
            let activeFields = {
                // mgxxfh: true,   // '敏感信息防护'
                bgsldsq: true,  // '办公室领导审签'
                bz: true,       // '备注'
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生产编号',   show: false,  type:'' },
                {name: '引入印模',   show: false,  type:'' },
                {name: '引入外部单位销毁',  show:false, type:''},
                {name: '归档打印',  show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        initProcessStep5(){
            console.log('初始化环节5-印章保管人销毁');
            let activeFields = {
                // mgxxfh: true,   //'敏感信息防护'
                bh:     true,   // '编号'
                xhrq:   true,   // '销毁日期' 
                xhdd:   true,   // '销毁地点'
                xhr:    true,   // '销毁人'
                bz:     true,   // '备注'
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生产编号',   show: true,  type:'' },
                {name: '引入印模',   show: false,  type:'' },
                {name: '引入外部单位销毁',  show:false, type:''},
                {name: '归档打印',  show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        initProcessStep6(){
            console.log('初始化环节6-监销人处理');
            let activeFields = {
                // mgxxfh: true,   // '敏感信息防护', 
                jxr:    true,   // '监销人'
                bz:     true,   // '备注'
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: true,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生产编号',   show: false,  type:'' },
                {name: '引入印模',   show: false,  type:'' },
                {name: '引入外部单位销毁',  show:false, type:''},
                {name: '归档打印',  show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        initProcessStep7(){
            console.log('初始化环节7-印章保管人办结');
            let activeFields = {
                // mgxxfh: true,   // '敏感信息防护',
                bz:     true,   // '备注'
            };
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: true,  type:''},
                {name: '完成并发送', show: false,   type:''},
                {name: '办结',       show: true,  type:''},
                {name: '生产编号',   show: false,  type:'' },
                {name: '引入印模',   show: false,  type:'' },
                {name: '引入外部单位销毁',  show:true, type:''},
                {name: '归档打印',  show: false, type: ''}, 
                {name: '收藏',       show: false,  type:'' },
                {name: '流程调度',   show: false,  type:'' },
                {name: '操作指南',   show: true,  type:'' }
            ];
            this.activeFields = activeFields;
            this.buttonList = buttonList;
        },
        initProcessStep8(){
            console.log('初始化环节8-(印章销毁审批)办结');
            let activeFields = {};
            let buttonList = [
                {name: '关闭',       show: true,  type:''},
                {name: '保存',       show: false,  type:''},
                {name: '完成并发送', show: false,   type:''},
                {name: '办结',       show: false,  type:''},
                {name: '生产编号',   show: false,  type:'' },
                {name: '引入印模',   show: false,  type:'' },
                {name: '引入外部单位销毁',  show:false, type:''},
                {name: '归档打印',  show: true, type: ''}, 
                {name: '收藏',       show: true,  type:'' },
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
    },
    watch: {
        // OA工作流程描述字符串。
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
        // 附件
        'form.StmpAplyAtchP9FileRte': function(newVal, oldVal){
            console.log('watch -> form.StmpAplyAtchP9FileRte', newVal, oldVal)
            if (newVal) {
                this.upFileConfig.list = [{p9Id: newVal}];
                // this.$sealUtil.getFileFromP9(newVal, (err, data) => {
                //     console.log('从P9获取到的印模图片数据：', err, data);
                //     if (!err) {
                //         let uuid = this.$sealUtil.generateGUID();
                //         let fileUrl = "/ecpweb/getLocalFile.action?relativePath=" + data[0] + "&fileName=" + 
                //                 encodeURIComponent(data[1]) + "&ATCH_BTCH_NO=" + uuid;        
                //         this.upFileConfig.list = [{
                //             fileName: encodeURIComponent(data[1]),
                //             fileUrl: fileUrl
                //         }];
                //     };
                // });
            } else {
                this.upFileConfig.list = [];
            }
        },
        // 当前环节
        'form.Stmp_Aply_StCd': function(newVal, oldVal){
            console.log('watch:当前环节：',newVal);
            if (newVal) {
                this.currentNodeNm = this.$sealUtil.allNodes[newVal] || newVal;
            }
        },
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
        // 申请单位
        'form.Stmp_Aply_Psn_Blng_InsNm': function(newVal, oldVal){
            this.form.applyRegion_Origin = newVal;
        },
        'form.applyRegion_Origin': function(newVal, oldVal){
            this.form.Stmp_Aply_Psn_Blng_InsNm = newVal;
        },
    },
    created() {
        let that = this;
        this.mockDatas = mockDatas;
        // 存储当前操作人的信息
        this.storage.userInfo = JSON.parse(localStorage.userInfo);          // 用户信息
        this.storage.tcHumanRole = JSON.parse(localStorage.tcHumanRole);    // 用户角色信息
        
        this.isManage = false;                  // 是否是系统管理员
        this.aplyId = this.$route.query.id || '';           // 印章销毁申请业务编号。除了新建，每条记录都有
        this.docStatus = this.$route.query.type || 'see';   // 文档类型 new-新建 modify-修改 see-查看
        this.finalDocStatus = this.docStatus;               // 文档的最终状态
        this.title = '中国建设银行印章销毁审批单';            // 文档的标题
        
        // 审批
        if (this.aplyId) {
            let params = {
                Unit_Dept_EmpID:        this.storage.userInfo.humanId + '',     // 员工ID
                Token_Inf_ID:           localStorage.st,                        // tokenId
                Stmp_Dstr_Aply_Bsn_ID:  this.aplyId,                            // 印章销毁申请业务编号
            };
            let options = {warningLevel: 1, warningTitle: '查询印章刻制记录详细信息失败！'};
            this.$api.sealManage.sealDestroy.getSealDestroyApplyDetails(params, options).then(res => {
                this.details = res;
                this.Cur_Pcs_Dsc                    = res.Cur_Pcs_Dsc;              // OA工作流程描述字符串
                this.form.Cur_Pcs_Dsc               = res.Cur_Pcs_Dsc;              // OA工作流程描述字符串
                this.form.Stmp_Dstr_Aply_Bsn_ID     = res.Stmp_Dstr_Aply_Bsn_ID;    // 印章销毁申请业务编号
                this.form.Snstv_Inf_IndCd           = res.Snstv_Inf_IndCd;          // 敏感信息标志代码
                this.form.destroySeals              = res.Stmp_Grp;                 // 待销毁印章列表
                this.form.Stmp_Aply_StCd            = res.Stmp_Aply_StCd;           // 当前所处的环节
                this.form.Stmp_Act_Dstr_Tm          = res.Stmp_Act_Dstr_Tm;         // 销毁日期（印章实际销毁时间）
                this.form.Clrg_Plc_Nm               = res.Clrg_Plc_Nm;              // 销毁地点
                this.form.Apl_Aply_ID               = res.Apl_Aply_ID;              // 编号
                this.form.Stmp_Aply_Psn_Nm          = res.Stmp_Aply_Psn_Nm;         // 申请人 TODO:响应需要添加申请人编号吗？
                this.form.StmpMain_HndOv_Psn_Nm     = res.StmpMain_HndOv_Psn_Nm;    // 销毁人
                this.form.StmpHndOv_Spvs_Psn_Nm     = res.StmpHndOv_Spvs_Psn_Nm;    // 监销人
                this.form.StmpAplyAtchP9FileRte     = res.StmpAplyAtchP9FileRte;    // 附件（外部单位销毁证明）
                this.form.Stmp_Aply_Crt_Tm          = res.Stmp_Aply_Crt_Tm;         // 自动生成申请日期
                this.form.Stmp_Aply_Psn_Ctc_Tel     = res.Stmp_Aply_Psn_Ctc_Tel;    // （申请人）联系电话
                this.form.Stmp_Aply_Psn_Blng_InsID  = res.Stmp_Aply_Psn_Blng_InsID; // 申请单位编号
                this.form.Stmp_Aply_Psn_Blng_InsNm  = res.Stmp_Aply_Psn_Blng_InsNm; // 申请单位名称
                // （流程调度的）所有环节，操作员是系统管理员时才有值
                this.form.Pcs_Lnk_Inf_Dsc = res.Pcs_Lnk_Inf_Dsc ? JSON.parse(res.Pcs_Lnk_Inf_Dsc) : [];
                // 完成并发送下一节点的环节
                this.form.Parm_Next_Lnk_Inst_Dsc = res.Parm_Next_Lnk_Inst_Dsc ? JSON.parse(res.Parm_Next_Lnk_Inst_Dsc) : [];
                // 完成并发送下一节点的部门
                this.form.Parm_Next_Lnk_Inst_Nm = res.Parm_Next_Lnk_Inst_Nm ? JSON.parse(res.Parm_Next_Lnk_Inst_Nm) : [];
                
                // 生成意见域的初始数据
                let picks = this.pickIdeaFields(res.LIST1, this.ideaFieldFlags);
                for (let key in picks) {
                    if ( picks.hasOwnProperty(key) ) {
                        this.form.ideaFieldsData[key] = this.createMessageOneData( picks[key] );
                    }
                }
                console.log('生成的意见域初始数据：', this.form.ideaFieldsData);
                // A20-档案部门鉴定 A21-公示情况 A07-办公室领导审批 A23-销毁人 A24-监销人
                this.form.remarks = this.form.ideaFieldsData['A00'];
                this.form.appraisalOpinions = this.form.ideaFieldsData['A20'];
                this.form.publicity = this.form.ideaFieldsData['A21'];
                this.form.officeApprover = this.form.ideaFieldsData['A07'];
                this.form.xhr = this.form.ideaFieldsData['A23'];
                this.form.jxr = this.form.ideaFieldsData['A24'];
                this.addMarkToUsedIdeaFieldsData();      // 标记该环节要使用的意见域，审批时只传这一个值

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
            console.log('新建');
            // this.title = this.storage.userInfo.currUnitName + '印章销毁审批单'; // 文档的标题
            // 自动生成申请单位
            this.form.Stmp_Aply_Psn_Blng_InsID = this.storage.userInfo.currUnitId;     // 申请单位编号
            this.form.Stmp_Aply_Psn_Blng_InsNm = this.storage.userInfo.currUnitName;   // 申请单位名称
            this.form.Stmp_Aply_Psn_Nm = this.storage.userInfo.humanId + '-' + this.storage.userInfo.humanName; // 申请人
            this.form.Stmp_Aply_Psn_Ctc_Tel = this.getTelMobile();  // （申请人）联系电话
            this.form.Stmp_Aply_Crt_Tm = this.$sealUtil.getNow();   // 申请日期
            console.log('设置环节：', );
            this.Stmp_Aply_StCd = 'A00';    // 当前所处的环节 A00-起草
            this.form.Stmp_Aply_StCd = 'A00';    // 当前所处的环节 A00-起草
            // 根据环节初始化数据，页面元素的显隐、校验规则、置灰
            this.initProcessRules();
            // 显示流程信息
            // this.initProcessShow(this.form.Stmp_Aply_StCd);  

            // 生成意见域的初始数据
            let picks = this.pickIdeaFields([], this.ideaFieldFlags);
            for (let key in picks) {
                if ( picks.hasOwnProperty(key) ) {
                    this.form.ideaFieldsData[key] = this.createMessageOneData( picks[key] );
                }
            }
            console.log('起草生成的意见域初始数据：', this.form.ideaFieldsData);
            // A20-档案部门鉴定 A21-公示情况 A07-办公室领导审批 A23-销毁人 A24-监销人
            this.form.remarks = this.form.ideaFieldsData['A00'];
            this.form.appraisalOpinions = this.form.ideaFieldsData['A20'];
            this.form.publicity = this.form.ideaFieldsData['A21'];
            this.form.officeApprover = this.form.ideaFieldsData['A07'];
            this.form.xhr = this.createMessageOneData();    // 销毁人
            this.form.jxr = this.createMessageOneData();    // 监销人
            this.addMarkToUsedIdeaFieldsData();      // 标记该环节要使用的意见域，审批时只传这一个值
            console.log('空白的监销人', this.form.jxr);
        }
    },
    mounted(){
        console.log('生命周期 mouted --adminSealDestroyDraft');
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
    },
    // 使用this.$router.go(-1)和this.$router.push(url)跳转页面后，销毁刚才的页面时会执行这个方法
    beforeDestroy(){
        // 解绑绑定的全局事件。
        console.log('生命周期 beforeDestroy --adminSealDestroyDraft');
        // window.removeEventListener('resize', this.resizeWorks);
        // window.removeEventListener('scroll', this.scrollWorks);
    },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    .adminSealDestroyDraft {
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
        .sealDestroy-mainform {
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
    .uploader-drop {
        position: relative;
        padding: 10px;
        overflow: hidden;
        border: 1px dashed #ccc;
        background-color: #f5f5f5;
        font-size: 12px;
    }
    .uploader-list {
        margin-top: 10px;
        .uploader-list-msg {
            display: inline-block;
        }
        .uploader-list-btns {
            display: inline-block;
            margin-left: 100px;
        }
    }
</style>