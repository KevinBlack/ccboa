
<template>
    <div class="sealRegisterForm">
        <div class="headerClick">
            <div class="right">
                <el-button
                class="bank_grid_comtent_active"
                v-for="(item,index) in headerBtnList"
                @click="headerBtnClick(item)"
                :key="index"
                plain
                >{{item}}</el-button>
            </div>
        </div> 
        <div id="jbxx" class="height_90"></div>
        <div class="formHeader">
            <div class="title-text">{{unitName}}印章登记单</div>
        </div>
        <div class="process_content" id="bank_dispach_content">
            <!-- 侧边栏导航 -->
            <div class="bank_dispach_side_nav">
                <a
                href="javascript:void(0);"
                :class="active == '#jbxx' ? 'active' : ''"
                @click="toTarget('#jbxx')"
                >基本信息</a>
                <a
                href="javascript:void(0);"
                :class="active == '#zfqk' ? 'active' : ''"
                @click="toTarget('#zfqk')"
                >制发情况</a>
                <a
                href="javascript:void(0);"
                :class="active == '#syqk' ? 'active' : ''"
                @click="toTarget('#syqk')"
                >使用情况</a>
                <a
                href="javascript:void(0);"
                :class="active == '#fzqk' ? 'active' : ''"
                @click="toTarget('#fzqk')"
                >废止情况</a>
                <a
                href="javascript:void(0);"
                :class="active == '#xhqk' ? 'active' : ''"
                @click="toTarget('#xhqk')"
                >销毁情况</a>
            </div>
            <h6 class="bank_dispach_file_tit">基本信息</h6>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="registerForm-mainform">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印章名称" prop = "Stmp_Dspl_Inst_Nm">
                            <el-input v-model="form.Stmp_Dspl_Inst_Nm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="印章简称">
                            <el-input v-model="form.Stmp_Nm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印章类别" prop="Stmp_Bsn_Ctlg_ID">
                            <el-select v-model="form.Stmp_Bsn_Ctlg_ID" placeholder="请选择" style="width:100%" @change="selectSealType" :disabled=statusDisabled>
                                <el-option v-for="item in sealTypes"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="保管使用部门" prop="Stmp_Kep_Inst_Nm">
                            <select-org-or-dept @select="selectKepOrg">
                            <el-input
                                type="text"
                                readonly
                                placeholder="请选择保管使用部门"
                                v-model="form.Stmp_Kep_Inst_Nm"
                                suffix-icon="el-icon-arrow-down"
                            />
                            </select-org-or-dept>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="制发机构" prop="Stmp_Engr_Rcv_InsID">
                            <select-org-or-dept @select="selectRcvChkOrg">
                            <el-input
                                type="text"
                                readonly
                                placeholder="请选择制发机构"
                                v-model="form.Stmp_Engr_Rcv_Inst_Nm"
                                suffix-icon="el-icon-arrow-down"
                            />
                            </select-org-or-dept>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="使用机构" prop="Stmp_Blng_Inst_Nm">
                        <!--
                            <select-org-or-dept @select="selectBlngOrg" :disabled="true" >
                            <el-input
                                type="text"
                                readonly
                                placeholder="请选择使用机构"
                                v-model="form.Stmp_Blng_Inst_Nm"
                                suffix-icon="el-icon-arrow-down"
                            />
                            </select-org-or-dept>
                        -->
                            <el-input v-model="form.Stmp_Blng_Inst_Nm" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div id="zfqk" class="height_90"></div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印章状态" prop="Stmp_StCd">
                            <el-radio-group v-model="form.Stmp_StCd" :disabled=statusDisabled @change="selectStmpStCd">
                                <el-radio v-for="item in allSealStatus" :key="item.value" :label="item.value" >{{item.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="序号" prop="Stmp_Bsn_CL_ID">
                            <el-input v-model="form.Stmp_Bsn_CL_ID" :disabled=statusDisabled @change="stmpBsnClIDChg"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h6 class="bank_dispach_file_tit">制发情况</h6>
                <el-form-item label="印章刻制单位（刻章厂）" prop="SCCS">
                    <el-input v-model="form.SCCS"></el-input>
                </el-form-item>
                <el-form-item label="批准刻制单位（公安部门）" prop="Rtfd_Unit_Sum">
                    <el-input v-model="form.Rtfd_Unit_Sum"></el-input>
                </el-form-item>
                <el-form-item label="领用人">
                    <el-input v-model="form.Pcs_Drw_Psn_Nm"></el-input>
                    <!--
                    <el-select  v-model="form.Stmp_Engr_Rcv_Psn_ID" placeholder="请选择"  style="width:100%">
                                <el-option v-for="item in RcvPsn"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                    </el-select>
                    -->
                </el-form-item>
                <div id="syqk" class="height_90"></div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="启用文号">
                            <el-input v-model="form.Rtfd_No"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="启用日期" prop="Stmp_FTm_StrtUs_Tm">
                            <el-date-picker type="date" placeholder="请选择日期" v-model="form.Stmp_FTm_StrtUs_Tm" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h6 class="bank_dispach_file_tit">使用情况</h6>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="是否存放到用印机器中">
                            <el-radio-group v-model="form.Bndg_TpCd" @change="bndgTpcdChange">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" v-if="EqmtMftrNm_isShow">
                        <el-form-item label="印章设备名称">
                            <!--<el-input   v-model="form.Eqmt_Mftr_Nm"></el-input>-->
                            <el-select v-model="form.Eqmt_Mftr_Nm" placeholder="请选择" style="width:100%" @change ="setMachineInfo">
                                <el-option v-for="(item,index) in sealMachines"
                                    :key="index" :label="item.title" :value="item.title">
                                </el-option>
                            </el-select>
                        
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" v-if="EqmtMftrNm_isShow">
                        <el-form-item label="印章设备型号">
                            <el-input v-model="form.Eqmt_Modl_Vno" readonly=true></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="印章设备编号" v-if="EqmtMftrNm_isShow">
                            <el-input v-model="form.Eqmt_ECD" readonly=true></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印章在用印机中的位置" v-if="EqmtMftrNm_isShow">
                            <el-radio-group v-model="form.Bsn_SN" @change="getRfid">
                                <el-radio key="1" label="1">1</el-radio>
                                <el-radio key="2" label="2">2</el-radio>
                                <el-radio key="3" label="3">3</el-radio>
                                <el-radio key="4" label="4">4</el-radio>
                                <el-radio key="5" label="5">5</el-radio>
                                <el-radio key="6" label="6">6</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="RFID标签" v-if="EqmtMftrNm_isShow">
                            <el-input v-model="form.RFID_CardNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" v-if="StorePlcCd_isShow">
                        <el-form-item label="印章存放地点">
                            <el-input v-model="form.Store_Plc_Cd"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印章保管人A1角" prop = "StmpKepPsn_A1_ID">
                            <el-select v-model="form.StmpKepPsn_A1_ID" placeholder="请选择" style="width:100%" @change="getA1Nm">
                                <el-option v-for="item in sealKeepers"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            
                            <!--<el-input v-model="form.StmpKepPsn_A1_ID" @change="getA1Nm"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="印章保管人A2角" prop="StmpKepPsn_A2_ID">
                            <el-select v-model="form.StmpKepPsn_A2_ID" placeholder="请选择" style="width:100%" @change="getA2Nm">
                                <el-option v-for="item in sealKeepers"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        
                        <!--<el-input v-model="form.StmpKepPsn_A2_ID" @change="getA2Nm"></el-input>-->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印章保管人B1角" prop="StmpKepPsn_B1_ID">
                            <el-select v-model="form.StmpKepPsn_B1_ID" placeholder="请选择" style="width:100%" @change="getB1Nm">
                                <el-option v-for="item in sealKeepers"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        
                        <!--<el-input v-model="form.StmpKepPsn_B1_ID"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="印章保管人B2角" prop="StmpKepPsn_B2_ID">
                            <el-select v-model="form.StmpKepPsn_B2_ID" placeholder="请选择" style="width:100%" @change="getB2Nm">
                                <el-option v-for="item in sealKeepers"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        
                        <!-- <el-input v-model="form.StmpKepPsn_B2_ID"></el-input>-->
                        </el-form-item>
                    </el-col>
                </el-row>
                <div id="fzqk" class="height_90"></div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="实际保管人1">
                            <el-input v-model="form.Stmp_Main_Kep_Psn_Nm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实际保管人2">
                            <el-input v-model="form.Stmp_Minr_Kep_Psn_Nm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h6 class="bank_dispach_file_tit">废止情况</h6>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="废止日期">
                            <el-date-picker :disabled="this.stmpEnable" type="date" placeholder="请选择日期" v-model="form.Repl_Dt" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收回人" prop = "Fst_Rcv_Psn_Nm">
                            <el-input v-model="form.Fst_Rcv_Psn_Nm" :disabled="this.stmpEnable"></el-input>
                            <!--
                            <el-select :disabled="this.stmpEnable" v-model="form.Stmp_Rcv_Psn_ID" placeholder="请选择" multiple :multiple-limit="2"
                            
                            style="width:100%">
                                <el-option v-for="item in RcvPsn"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="废止原因" prop="Inval_RDsc">
                            <el-input v-model="form.Inval_RDsc" :disabled="this.stmpEnable"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="交回人" prop="StmpMain_HndOv_Psn_Nm">
                            <el-input v-model="form.StmpMain_HndOv_Psn_Nm" :disabled="this.stmpEnable"></el-input>
                            <!--
                            <el-select :disabled="this.stmpEnable" v-model="form.Stmp_HandIn_Psn_ID" placeholder="请选择" multiple  style="width:100%">
                                <el-option v-for="(item,index) in HandInPsn"
                                :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="交回日期">
                            <el-date-picker :disabled="this.stmpEnable" type="date" placeholder="请选择日期" v-model="form.Stmp_Main_HndOv_Tm" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div id="xhqk" class="height_90"></div>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="保管部门">
                            <el-input v-model="form.Kep_Inst_Nm" :disabled="this.stmpEnable"></el-input>
                            <!--
                            <select-org-or-dept @select="selectAplyAprvDstOrg" :disabled="this.stmpEnable">
                            <el-input
                                type="text"
                                readonly
                                placeholder="请选择保管部门"
                                v-model="form.Kep_Inst_Nm"
                                suffix-icon="el-icon-arrow-down"
                            />
                            </select-org-or-dept>
                            -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <h6 class="bank_dispach_file_tit">销毁情况</h6>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="销毁日期">
                            <el-date-picker :disabled="this.stmpEnable" type="date" placeholder="请选择日期" v-model="form.Stmp_Act_Dstr_Tm" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="销毁原因" prop="Tsk_Abndn_RDsc">
                            <el-input :disabled="this.stmpEnable" v-model="form.Tsk_Abndn_RDsc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="销毁人" prop = "Pcsg_Psn_Nm">
                            <el-input v-model="form.Pcsg_Psn_Nm" :disabled="this.stmpEnable"></el-input>
                            <!--
                            <el-select :disabled="this.stmpEnable" v-model="form.Stmp_Destory_Psn_ID" placeholder="请选择" multiple :multiple-limit="2" style="width:100%">
                                <el-option v-for="item in RcvPsn"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="监销人" prop="EV_Pcsg_Psn_Nm">
                            <el-input v-model="form.EV_Pcsg_Psn_Nm" :disabled="this.stmpEnable"></el-input>
                            <!--
                            <el-select :disabled="this.stmpEnable" v-model="form.Stmp_Chk_Destory_Psn_ID" placeholder="请选择" multiple :multiple-limit="2" style="width:100%">
                                <el-option v-for="item in RcvPsn"
                                    :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="form.Rmrk" :disabled="this.stmpEnable" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h6 class="bank_dispach_file_tit">修改记录</h6>
                <el-row>
                    <el-col :span="22" :push="2">
                        <m-table
                                @refresh="loadTableData()"   @cellClick="cellClick"  size="medium"
                                :tableData="tableData"  :tableCols="allTableCols"  :pagination="pagination"    :isSelection="false">
                        </m-table>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 上传组件 -->
        <upload-file-to-p9
            :startWork="upFileConfig.start"
            :info="upFileConfig.info"
            :whiteList="upFileConfig.whiteList"
            :maxFileSize="upFileConfig.maxFileSize"
            @result="handlerFileP9Val"
        ></upload-file-to-p9>
    </div>
</template>
<script>
    import orgTree from "components/tree/orgTree";
    import selectOrgOrDept from "components/select/selectOrgOrDept";
    import sealDeviceMixins from "../mixins/index.js";
    // 导入通用表格
    import mTable from '@/components/table/tTable'
    // 导入上传文件到P9组件
    import uploadFileToP9 from '@/components/uploadFile/uploadFileToP9'
    export default {
        name: 'sealRegisterForm',
        components: { orgTree,selectOrgOrDept,mTable,'upload-file-to-p9': uploadFileToP9},
        
        mixins:[sealDeviceMixins],
        data: function data(){
            return {
                //单位名称
                unitName : JSON.parse(localStorage.unitInfo)[0].unitName,
                headerBtnList: ['关闭', '保存','引入印模'],
                //印章种类
                sealTypes: [],
                //印章状态
                allSealStatus:[{label:"未启用",value:"A01"},{label:"启用",value:"A02"},{label:"废止",value:"A03"},{label:"销毁",value:"A04"},{label:"实物档案",value:"A05"}],
                //印章状态控制，废止、销毁、归档这三个状态修改时，不可更改印章状态，
                statusDisabled:false,
                //印章保管人
                //sealKeepers:[{label:"张志兴",value:"65928091"},{label:"钱培民",value:"86535539"},{label:"古晓燕",value:"69028930"},{label:"叶成",value:"82687611"},{label:"蒋冬梅",value:"37696703"}],
                sealKeepers:[],
                //修改标记
                update : false,
                //设备列表
                sealMachines:[],
                //所用的RFID
                allRFID:{},
                //印章状态为未启用或启用时，禁止废止与销毁情况输入资料标记
                stmpEnable:false,
                active: "#jbxx",
                scrollIntoViewOptions: {
                    block: "start",
                    behavior: "smooth"
                },
                //修改记录表格数据
                tableData:[],
                //印章设备名称栏位是否显示
                EqmtMftrNm_isShow : true,
                //印章存放地点
                StorePlcCd_isShow : false,
                //表格字段
                allTableCols: [
                    { label: '修改人', prop: 'Stmp_Inlz_Rvw_Psn_Nm' },
                    { label: '修改时间', prop: 'Log_Rcrd_Tms'}
                ],
                pagination: {
                        pageNum: 1,
                        total: 0,
                        pageSize: 10
                },
                //文件上传参数
                upFileConfig: {
                    list: [],               // 已经上传的文件。对象数组{fileName:xx, fileUrl:xx, p9Id:xx}
                    start: false,           // 启动上传附件组件
                    info:  '',              // 上传附件提示信息
                    maxFileSize: 30 * 1024 * 1024,  // 上传文件的最大值，单位为字节，默认为30M
                    whiteList: ['zip', 'rar', 'pdf', 'xlxs', 'xls', 'doc', 'docx', 'txt', 'jpg'],  // 允许上传文件的类型
                },
                form: {  
                    Mnplt_TpCd:             '',          //操作类型
                    Stmp_Inlz_Bsn_ID:       '',          //印章初始化业务编号 
                    Stmp_ECD:               '',          //印章编码    
                    Stmp_Dspl_Inst_Nm:      '',          // 印章名称
                    Stmp_Nm:                '',          // 印章简称
                    Stmp_Bsn_Ctlg_ID:       '',          // 印章类别
                    Stmp_Kep_InsID:         '',          // 保管使用部门
                    Stmp_Kep_Inst_Nm:       '',          // 保管使用部门名称
                    Stmp_Engr_Rcv_InsID:     '',          // 制发机构
                    Stmp_Engr_Rcv_Inst_Nm:   '',          // 制发机构名称
                    Stmp_Blng_InsID:        '',          // 使用机构 
                    Stmp_Blng_Inst_Nm:      '',          // 使用机构名称                       
                    Stmp_StCd:              '',          // 印章状态
                    Stmp_Bsn_CL_ID:         '',          // 序号
                    SCCS:                   '',          // 刻制单位
                    Rtfd_Unit_Sum:          '',          // 批准刻制单位
                    Pcs_Drw_Psn_Nm:         '',          // 领用人名称
                    Rtfd_No:                '',          // 启用文号
                    Stmp_FTm_StrtUs_Tm:     '',          // 启用日期
                    Bndg_TpCd:              '1',          // 是否存放到用印机器中,默认值 --是
                    Eqmt_Mftr_Nm:           '',          // 印章设备名称
                    Eqmt_Modl_Vno:          '',          // 印章设备型号
                    Eqmt_ECD:               '',          // 印章设备编号
                    Bsn_SN:                 '',          //印章在用印机中的位置
                    RFID_CardNo:            '',          //RFID标签
                    Store_Plc_Cd:           '',          //印章存放地点
                    StmpKepPsn_A1_ID:       '',          //印章保管人A1角
                    StmpKepPsn_A1_Nm:       '',          //印章保管人A1角名称
                    StmpKepPsn_A2_ID:       '',          //印章保管人A2角
                    StmpKepPsn_A2_Nm:       '',          //印章保管人A2角名称
                    StmpKepPsn_B1_ID:       '',          //印章保管人B1角
                    StmpKepPsn_B1_Nm:       '',          //印章保管人B1角名称
                    StmpKepPsn_B2_ID:       '',          //印章保管人B2角
                    StmpKepPsn_B2_Nm:       '',          //印章保管人B2角名称
                    Stmp_Main_Kep_Psn_ID:   '',          //实际保管人1
                    Stmp_Main_Kep_Psn_Nm:   '',          //实际保管人1名称
                    Stmp_Minr_Kep_Psn_ID:   '',          //实际保管人2
                    Stmp_Minr_Kep_Psn_Nm:   '',          //实际保管人2名称
                    Seal_Pic_P9_File_Rte:   '',          //P9ID
                    //废止情况
                    Repl_Dt:                '',          //废止日期
                    Fst_Rcv_Psn_Nm:         '',          //收回人Nm
                    Inval_RDsc:             '',          //废止原因
                    StmpMain_HndOv_Psn_Nm:  '',          //交回人Nm
                    Stmp_Main_HndOv_Tm:     '',          //交回日期
                    Kep_Inst_Nm:            '',          //保管部门名称
                    //销毁情况
                    Stmp_Act_Dstr_Tm:       '',          //销毁日期
                    Tsk_Abndn_RDsc:         '',          //销毁原因
                    Pcsg_Psn_Nm:            '',          //销毁人NM
                    EV_Pcsg_Psn_Nm:         '',          //监销人Nm
                    Rmrk:                   '',          //备注
                },
                rules:{
                    Stmp_Dspl_Inst_Nm:[{required: true, message: '请输入印章名称', trigger: 'blur' }],
                    Stmp_Bsn_Ctlg_ID:[{required: true, message: '请选择印章类别', trigger: 'change' }],
                    Stmp_Kep_Inst_Nm:[{required: true, message: '请选择印章保管使用部门', trigger: 'change' }],
                    Stmp_Engr_Rcv_InsID:[{required: true, message: '请选择印章制发机构', trigger: 'change' }],
                    Stmp_Blng_Inst_Nm:[{required: true, message: '请输入使用机构', trigger: 'blur' }],
                    Stmp_StCd:[{required: true, message: '请选择印章状态', trigger: 'change' }],
                    SCCS:[{required: true, message: '请输入印章刻制单位', trigger: 'blur' }],
                    Rtfd_Unit_Sum:[{required: true, message: '请输入批准刻制单位', trigger: 'blur' }],
                    Stmp_FTm_StrtUs_Tm:[{required: true, message: '请选择启用日期', trigger: 'change' }],
                    Stmp_Bsn_CL_ID:[{required: true, message: '请输入序号', trigger: 'blur' },
                                { min: 1, max: 3, message: '请输入3位数字', trigger: 'blur' }],
                    StmpKepPsn_A1_ID:[{required: true, message: '请选择印章保管人A1角', trigger: 'change' }],
                    StmpKepPsn_A2_ID:[{required: true, message: '请选择印章保管人A2角', trigger: 'change' }],
                    StmpKepPsn_B1_ID:[{required: true, message: '请选择印章保管人B1角', trigger: 'change' }],
                    StmpKepPsn_B2_ID:[{required: true, message: '请选择印章保管人B2角', trigger: 'change' }]
                }
            }
        },
        computed: {

        },
        mounted:function(){
            // 一次性计算赋值，减少滚动计算节点位置次数
            this.distance_jbxx = document.querySelector("#jbxx").offsetTop;
            this.distance_zfqk = document.querySelector("#zfqk").offsetTop;
            this.distance_syqk = document.querySelector("#syqk").offsetTop;
            this.distance_fzqk = document.querySelector("#fzqk").offsetTop;
            this.distance_xhqk = document.querySelector("#xhqk").offsetTop;
            this.$nextTick(() => {
            document.querySelector("#bank_dispach_content").addEventListener("scroll", this.onScroll);
            });
            window.addEventListener("scroll", this.onScroll, true);
            //将登录人员的12位机构号转为9位并存储到localStorage里
            this.$sealUtil.setUnitSyncCodeToLocalStorage(this);
            //修改先查询出相关数据
            console.log("修改参数",this.$route);
            if(this.$route.query.Stmp_ECD){
                console.log("这是修改");
                this.update = true;
                this.form.Mnplt_TpCd="02";
                let Stmp_StCd = this.$route.query.Stmp_StCd;
                this.statusDisabled = true;
                /*
                if(Stmp_StCd=='A03' || Stmp_StCd=='A04' || Stmp_StCd=='A05'){
                    this.statusDisabled = true;
                }
                */
                //印章登记其它信息
                let jsonData1={
                    Stmp_ECD:this.$route.query.Stmp_ECD,
                    Stmp_Blng_Lnk_Cd:'13',
                    _pagination:{
                        PAGE_JUMP:1,
                        REC_IN_PAGE:50
                    }
                };
                
                this.$api.sealManage.sealRegister.querySealRegisterDetail(jsonData1)
                    .then(res=>{
                        console.log("M516返回印章登记其它信息",res);
                        if(res.LIST13){
                            let formData = res.LIST13[0];
                            this.form.Stmp_Engr_Rcv_InsID = formData.Stmp_Engr_Rcv_InsID; //制发机构
                            this.form.Stmp_Engr_Rcv_Inst_Nm = formData.Stmp_Engr_Rcv_Inst_Nm;//制发机构名称
                            this.form.Bndg_TpCd=formData.Bndg_TpCd;                        // 是否存放到用印机器中
                            this.form.SCCS=formData.SCCS;                                  // 刻制单位
                            this.form.Rtfd_Unit_Sum=formData.Rtfd_Unit_Sum;                // 批准刻制单位
                            this.form.Pcs_Drw_Psn_Nm=formData.Pcs_Drw_Psn_Nm;              // 领用人名称
                            this.form.Rtfd_No=formData.Rtfd_No;                            // 启用文号
                            this.form.Eqmt_Mftr_Nm=formData.Eqmt_Mftr_Nm;                  // 印章设备名称
                            this.form.Eqmt_Modl_Vno=formData.Eqmt_Modl_Vno;                // 印章设备型号
                            this.form.Eqmt_ECD=formData.Eqmt_ECD;                          // 印章设备编号
                            this.form.Bsn_SN=formData.Bsn_SN;                              //印章在用印机中的位置
                            this.form.Store_Plc_Cd=formData.Store_Plc_Cd;                  //印章存放地点
                            this.form.StmpKepPsn_A1_ID=formData.StmpKepPsn_A1_ID;          //印章保管人A1角
                            this.form.StmpKepPsn_A1_Nm=formData.StmpKepPsn_A1_Nm;          //印章保管人A1角名称
                            this.form.StmpKepPsn_A2_ID=formData.StmpKepPsn_A2_ID;          //印章保管人A2角
                            this.form.StmpKepPsn_A2_Nm=formData.StmpKepPsn_A2_Nm;          //印章保管人A2角名称
                            this.form.StmpKepPsn_B1_ID=formData.StmpKepPsn_B1_ID;          //印章保管人B1角
                            this.form.StmpKepPsn_B1_Nm=formData.StmpKepPsn_B1_Nm;          //印章保管人B1角名称
                            this.form.StmpKepPsn_B2_ID=formData.StmpKepPsn_B2_ID;          //印章保管人B2角
                            this.form.StmpKepPsn_B2_Nm=formData.StmpKepPsn_B2_Nm;          //印章保管人B2角名称

                            //废止情况
                            this.form.Repl_Dt=formData.Repl_Dt;                             //废止日期
                            this.form.Fst_Rcv_Psn_Nm=formData.Fst_Rcv_Psn_Nm;               //收回人Nm
                            this.form.Inval_RDsc=formData.Inval_RDsc;                       //废止原因
                            this.form.StmpMain_HndOv_Psn_Nm=formData.StmpMain_HndOv_Psn_Nm; //交回人Nm
                            this.form.Stmp_Main_HndOv_Tm=formData.Stmp_Main_HndOv_Tm;       //交回日期
                            this.form.Kep_Inst_Nm=formData.Kep_Inst_Nm;                     //保管部门名称
                            //销毁情况
                            this.form.Stmp_Act_Dstr_Tm=formData.Stmp_Act_Dstr_Tm;           //销毁日期
                            this.form.Tsk_Abndn_RDsc=formData.Tsk_Abndn_RDsc;               //销毁原因
                            this.form.Pcsg_Psn_Nm=formData.Pcsg_Psn_Nm;                     //销毁人NM
                            this.form.EV_Pcsg_Psn_Nm=formData.EV_Pcsg_Psn_Nm;               //监销人Nm
                            this.form.Rmrk=formData.Rmrk;                                   //备注
                        }
                    }).catch((err)=>{
                        console.log('M516印章登记其它信息查询报错：', err);
                    });
                //查询印章信息
                let jsonData2={
                    Stmp_ECD:this.$route.query.Stmp_ECD,
                    Stmp_Blng_Lnk_Cd:'10',
                    _pagination:{
                        PAGE_JUMP:1,
                        REC_IN_PAGE:10
                    }
                };
                
                 this.$api.sealManage.sealRegister.querySealRegisterDetail(jsonData2)
                    .then(res =>{
                        console.log('M516返回的印章基本信息：', res);
                        let formData = res;
                        this.form.Stmp_Nm = formData.Stmp_Nm;                           //印章简称
                        this.form.Stmp_ECD = formData.Stmp_ECD;                         //印章编码
                        this.form.Stmp_Dspl_Inst_Nm=formData.Stmp_Dspl_Inst_Nm;         // 印章名称
                        this.form.Stmp_Bsn_Ctlg_ID=formData.Stmp_Bsn_Ctlg_ID;           // 印章类别
                        this.form.Stmp_Kep_InsID=formData.Stmp_Kep_InsID;               // 保管使用部门
                        this.form.Stmp_Kep_Inst_Nm=formData.Stmp_Kep_Inst_Nm;           // 保管使用部门名称                   
                        this.form.Stmp_Blng_InsID=formData.Stmp_Blng_InsID;             // 使用机构 
                        this.form.Stmp_Blng_Inst_Nm=formData.Stmp_Blng_Inst_Nm;         // 使用机构名称                       
                        this.form.Stmp_StCd=formData.Stmp_StCd;                         // 印章状态
                        this.form.Stmp_Bsn_CL_ID=formData.Stmp_Bsn_CL_ID;               // 序号
                        this.form.Stmp_Main_Kep_Psn_ID=formData.Stmp_Main_Kep_Psn_ID;   //实际保管人1
                        this.form.Stmp_Main_Kep_Psn_Nm=formData.Stmp_Main_Kep_Psn_Nm;   //实际保管人1名称
                        this.form.Stmp_Minr_Kep_Psn_ID=formData.Stmp_Minr_Kep_Psn_ID;   //实际保管人2
                        this.form.Stmp_Minr_Kep_Psn_Nm=formData.Stmp_Minr_Kep_Psn_Nm;   //实际保管人2名称
                        this.form.Stmp_FTm_StrtUs_Tm=formData.Stmp_FTm_StrtUs_Tm;       // 启用日期
                        this.form.Bndg_TpCd=formData.Bndg_TpCd;                         // 是否存放到用印机器中
                        this.form.RFID_CardNo=formData.RFID_CardNo;                     //RFID标签
                        this.selectStmpStCd(this.form.Stmp_StCd);
                    })
                    .catch((err) => {
                        console.log('M516印章基本信息查询报错：', err);
                    });
                
                //查询印章修改记录
                let jsonData4={
                    Stmp_ECD:this.$route.query.Stmp_ECD,
                    Stmp_Blng_Lnk_Cd:'09',
                    _pagination:{
                        PAGE_JUMP:1,
                        REC_IN_PAGE:50
                    }
                };
                
                this.$api.sealManage.sealRegister.querySealRegisterDetail(jsonData4)
                    .then(res=>{
                        if(res.LIST9)
                            this.tableData = res.LIST9;
                    }).catch((err)=>{
                        console.log('印章修改记录查询报错：', err);
                    });
            }else{
                //使用机构为当前登录人机构
                let that = this;
                that.$sealUtil.getMappingUnitSync(this,JSON.parse(localStorage.userInfo).unitId,function(data,res){
                    console.log("转换前机构ID:"+JSON.parse(localStorage.userInfo).unitId+",转换后的机构ID:"+data);
                    that.form.Stmp_Blng_InsID = data;//使用机构
                    that.form.Stmp_Kep_InsID = data;//保管使用部门
                });
                that.form.Stmp_Blng_Inst_Nm = JSON.parse(localStorage.userInfo).shortUnitName;
                that.form.Stmp_Kep_Inst_Nm =JSON.parse(localStorage.userInfo).shortUnitName; 
            }
        },
        created: function(){
            //设备信息
            this.$api.sealManage.getUseSealDeviceInfo().
                then(res =>{
                    console.log('设备信息数据：', res, this);  
                    this.sealMachines = res.data;
                })
                .catch((err) => {
                    console.log('设备信息查询报错：', err);
                });

            //查询印章保管人清单
            let params = {
                type:"3",
                unitId:JSON.parse(localStorage.unitInfo)[0].unitId
            }
            console.log("保管人查询参数",params);
            this.$api.sealManage.personLogin.getList(params)
                .then(res =>{
                        console.log('getList返回的数据：', res, this);
                        for(var j=0;j<res.data.length;j++){
                            if(res.data[j].huManCode){
                                this.sealKeepers.push({label:res.data[j].draftUser,value:res.data[j].huManCode});
                            }         
                        }

                })
                .catch((err) => {
                    console.log('印章保管人查询报错：', err);
                });
            // 初始化所有的印章类别
            this.queryAllSealTypes()
                .then((sealTypes) => {
                    console.log('查询sealTypes成功:', sealTypes, this);
                    this.sealTypes = sealTypes;
                })
                .catch((err) => {
                     console.log('查询所有的印章类别失败:', err);
                    this.sealTypes = [];
                });
        },
        methods: {
            backSealRegister(){
                this.$router.push({
                    path: '/sealManage/sealRegister'
                });
            },
            // 选择保管使用部门
            selectKepOrg (org) {
                let  tempOrgID = "";
                this.$sealUtil.getMappingUnitSync(this,org.id,function(data,res){
                    console.log("转换前机构ID:"+org.id+",转换后的机构ID:"+data);
                    tempOrgID = data;
                });
                this.form.Stmp_Kep_InsID = tempOrgID;
                this.form.Stmp_Kep_Inst_Nm = org.unitName;
            },
            //制发机构
            selectRcvChkOrg(org) {
                let  tempOrgID = "";
                this.$sealUtil.getMappingUnitSync(this,org.id,function(data,res){
                    console.log("转换前机构ID:"+org.id+",转换后的机构ID:"+data);
                    tempOrgID = data;
                });
                this.form.Stmp_Engr_Rcv_InsID = tempOrgID;
                this.form.Stmp_Engr_Rcv_Inst_Nm = org.unitName;
            },
            //使用机构
            /*
            selectBlngOrg(org) {
                let  tempOrgID = "";
                 this.$sealUtil.getMappingUnitSync(this,org.id,function(data,res){
                    console.log("转换前机构ID:"+org.id+",转换后的机构ID:"+data);
                    tempOrgID = data;
                });
                this.form.Stmp_Blng_InsID = tempOrgID;
                this.form.Stmp_Blng_Inst_Nm = org.unitName;
                if(this.form.Stmp_Bsn_Ctlg_ID != '' && this.form.Stmp_Blng_InsID !='' && this.form.Stmp_Bsn_CL_ID !=''){
                    let stmp_ecd = this.form.Stmp_Blng_InsID+'000'+this.form.Stmp_Bsn_Ctlg_ID+this.form.Stmp_Bsn_CL_ID+'001';
                    this.getRegisterRecord(stmp_ecd);
                }
            },
            */
            //保管部门
            selectAplyAprvDstOrg(org){
                let  tempOrgID = "";
                 this.$sealUtil.getMappingUnitSync(this,org.id,function(data,res){
                    console.log("转换前机构ID:"+org.id+",转换后的机构ID:"+data);
                    tempOrgID = data;
                });
                 this.form.StmpAplyAprvDstInsID = tempOrgID;
                this.form.Kep_Inst_Nm = org.unitName;
            },
            //序号
            stmpBsnClIDChg(stmpBsnClID){
                console.log("序号：",stmpBsnClID);
                let reg = /^[0-9]*$/; 
                if(!reg.test(stmpBsnClID)){
                    this.$message({type:"error",message:"序号输入错误，请输入0-999之间的数字！"});
                    this.form.Stmp_Bsn_CL_ID = '';
                }else{
                    let temp = stmpBsnClID;
                    if(temp.length !=3){
                        for(var i=temp.length;i<3;i++){
                           temp = '0'+temp; 
                        }
                    }
                    this.form.Stmp_Bsn_CL_ID = temp;
                }   
                console.log("查询登记数据条件2:"+this.form.Stmp_Bsn_Ctlg_ID+"#"+this.form.Stmp_Blng_InsID+"#"+this.form.Stmp_Bsn_CL_ID);            
                if(this.form.Stmp_Bsn_Ctlg_ID != '' && this.form.Stmp_Blng_InsID !='' && this.form.Stmp_Bsn_CL_ID !=''){
                    let stmp_ecd = this.form.Stmp_Blng_InsID+'000'+this.form.Stmp_Bsn_Ctlg_ID+this.form.Stmp_Bsn_CL_ID+'001';
                    this.getRegisterRecord(stmp_ecd);
                }
            },
            //印章类别
            selectSealType(sealType){
                this.form.Stmp_Bsn_Ctlg_ID=sealType;
                console.log("查询登记数据条件1:"+this.form.Stmp_Bsn_Ctlg_ID+"#"+this.form.Stmp_Blng_InsID+"#"+this.form.Stmp_Bsn_CL_ID);
                if(this.form.Stmp_Bsn_Ctlg_ID != '' && this.form.Stmp_Blng_InsID !='' && this.form.Stmp_Bsn_CL_ID !=''){
                    let stmp_ecd = this.form.Stmp_Blng_InsID+'000'+this.form.Stmp_Bsn_Ctlg_ID+this.form.Stmp_Bsn_CL_ID+'001';
                    this.getRegisterRecord(stmp_ecd);
                }
            },
            // 添加印模图片
            addAttachImg(){
                this.upFileConfig.info = '请选择要上传的印模图片！最大只支持小于30M的文件';
                this.upFileConfig.start = true;
            },
            //根据位置确定RFID
            getRfid(bsnSn){
                console.log("BSN_SN",bsnSn,this.allRFID[bsnSn]);
                this.form.RFID_CardNo = this.allRFID[bsnSn];
            },
            // 处理上传文件的返回值
            handlerFileP9Val(result){
                console.log('上传返回值：', result);
                // 上传成功，关闭上传弹窗，存储p9Val
                if (result[0] === '0') {
                    this.upFileConfig.toStart = false;
                    this.form.Seal_Pic_P9_File_Rte = result[1];
                    if (result[1]) {
                        this.$message( {message: '上传成功！', type: 'success'} );
                    }

                // 上传失败,不关闭上传弹窗，提示错误信息;取消上传，关闭上传弹窗
                } else {
                    // this.form.Seal_Pic_P9_File_Rte = result[1];
                    if (result[2]) {    // 上传失败
                        this.upFileConfig.info = this.$sealUtil.getErrorStrInfo(result[2]);
                    } else {            // 取消上传
                        this.upFileConfig.start = false;
                    }
                }
            },
            //新增印章登记时，查询印章是否已有刻制记录
            getRegisterRecord(stmp_ECD){
                let jsonData2={
                    Stmp_ECD:stmp_ECD,
                    Stmp_Blng_Lnk_Cd:'13',
                    _pagination:{
                        PAGE_JUMP:1,
                        REC_IN_PAGE:50
                    }
                };
                
                this.$api.sealManage.sealRegister.querySealRegisterDetail(jsonData2)
                    .then(res=>{
                        console.log("M516返回是否已有刻制记录",res);
                        if(res.LIST13){
                            this.form.Mnplt_TpCd='02';                                          //修改
                            let formData = res.LIST13[0];
                            if(this.form.Bndg_TpCd == '')
                                this.form.Bndg_TpCd=formData.Bndg_TpCd;                        // 是否存放到用印机器中
                            if(this.form.SCCS == '')
                                this.form.SCCS=formData.SCCS;                                  // 刻制单位
                            if(this.form.Rtfd_Unit_Sum == '')                                  
                                this.form.Rtfd_Unit_Sum=formData.Rtfd_Unit_Sum;                // 批准刻制单位
                            if(this.form.Pcs_Drw_Psn_Nm == '')
                                this.form.Pcs_Drw_Psn_Nm=formData.Pcs_Drw_Psn_Nm;              // 领用人名称
                            if(this.form.Rtfd_No=='')
                                this.form.Rtfd_No=formData.Rtfd_No;                            // 启用文号
                            if(this.form.Eqmt_Mftr_Nm == '')
                                this.form.Eqmt_Mftr_Nm=formData.Eqmt_Mftr_Nm;                  // 印章设备名称
                            if(this.form.Eqmt_Modl_Vno == '')
                                this.form.Eqmt_Modl_Vno=formData.Eqmt_Modl_Vno;                // 印章设备型号
                            if(this.form.Eqmt_ECD == '')
                                this.form.Eqmt_ECD=formData.Eqmt_ECD;                          // 印章设备编号
                            if(this.form.Bsn_SN == '')
                                this.form.Bsn_SN=formData.Bsn_SN;                              //印章在用印机中的位置
                            if(this.form.Store_Plc_Cd == '')
                                this.form.Store_Plc_Cd=formData.Store_Plc_Cd;                  //印章存放地点
                            if(this.form.StmpKepPsn_A1_ID == ''){
                                this.form.StmpKepPsn_A1_ID=formData.StmpKepPsn_A1_ID;          //印章保管人A1角
                                this.form.StmpKepPsn_A1_Nm=formData.StmpKepPsn_A1_Nm;          //印章保管人A1角名称
                            }
                            if(this.form.StmpKepPsn_A2_ID == ''){
                                this.form.StmpKepPsn_A2_ID=formData.StmpKepPsn_A2_ID;          //印章保管人A2角
                                this.form.StmpKepPsn_A2_Nm=formData.StmpKepPsn_A2_Nm;          //印章保管人A2角名称
                            }
                            if(this.form.StmpKepPsn_B1_ID == ''){
                                this.form.StmpKepPsn_B1_ID=formData.StmpKepPsn_B1_ID;          //印章保管人B1角
                                this.form.StmpKepPsn_B1_Nm=formData.StmpKepPsn_B1_Nm;          //印章保管人B1角名称
                            }
                            if(this.form.StmpKepPsn_B2_ID == ''){
                                this.form.StmpKepPsn_B2_ID=formData.StmpKepPsn_B2_ID;          //印章保管人B2角
                                this.form.StmpKepPsn_B2_Nm=formData.StmpKepPsn_B2_Nm;          //印章保管人B2角名称
                            }
                            if(this.form.Stmp_Engr_Rcv_InsID == ''){
                                this.form.Stmp_Engr_Rcv_InsID = formData.Stmp_Engr_Rcv_InsID;       //制发机构
                                this.form.Stmp_Engr_Rcv_Inst_Nm = formData.Stmp_Engr_Rcv_Inst_Nm;    //制发机构名称
                            }
                            //废止情况
                            if(this.form.Repl_Dt == '')
                                this.form.Repl_Dt=formData.Repl_Dt;                             //废止日期
                            if(this.form.Fst_Rcv_Psn_Nm)
                                this.form.Fst_Rcv_Psn_Nm=formData.Fst_Rcv_Psn_Nm;               //收回人Nm
                            if(this.form.Inval_RDsc == '')
                                this.form.Inval_RDsc=formData.Inval_RDsc;                       //废止原因
                            if(this.form.StmpMain_HndOv_Psn_Nm =='')
                                this.form.StmpMain_HndOv_Psn_Nm=formData.StmpMain_HndOv_Psn_Nm; //交回人Nm
                            if(this.form.Stmp_Main_HndOv_Tm == '')
                                this.form.Stmp_Main_HndOv_Tm=formData.Stmp_Main_HndOv_Tm;       //交回日期
                            if(this.form.Kep_Inst_Nm == '')
                                this.form.Kep_Inst_Nm=formData.Kep_Inst_Nm;                     //保管部门名称
                            //销毁情况
                            if(this.form.Stmp_Act_Dstr_Tm =='')
                                this.form.Stmp_Act_Dstr_Tm=formData.Stmp_Act_Dstr_Tm;           //销毁日期
                            if(this.form.Tsk_Abndn_RDsc =='')
                                this.form.Tsk_Abndn_RDsc=formData.Tsk_Abndn_RDsc;               //销毁原因
                            if(this.form.Pcsg_Psn_Nm == '')
                                this.form.Pcsg_Psn_Nm=formData.Pcsg_Psn_Nm;                     //销毁人NM
                            if(this.form.EV_Pcsg_Psn_Nm == '')
                                this.form.EV_Pcsg_Psn_Nm=formData.EV_Pcsg_Psn_Nm;               //监销人Nm
                            if(this.form.Rmrk == '')
                                this.form.Rmrk=formData.Rmrk;                                   //备注
                        }else{
                            this.form.Mnplt_TpCd='01';                                          //新增
                        }
                    }).catch((err)=>{
                        console.log('M516查询是否已有刻制记录报错：', err);
                    });
                //查询印章信息
                let jsonData1={
                    Stmp_ECD:this.$route.query.Stmp_ECD,
                    Stmp_Blng_Lnk_Cd:'10',
                    _pagination:{
                        PAGE_JUMP:1,
                        REC_IN_PAGE:10
                    }
                };
                
                 this.$api.sealManage.sealRegister.querySealRegisterDetail(jsonData1)
                    .then(res =>{
                        console.log('M516返回的印章基本信息：', res);
                        let formData = res;
                        if(formData.Stmp_ECD==''){
                            this.form.Mnplt_TpCd='01';                                  //新增
                        }else{
                            this.form.Mnplt_TpCd='02';                                      //修改
                            this.form.Stmp_Nm = formData.Stmp_Nm;                           //印章简称
                            this.form.Stmp_ECD = formData.Stmp_ECD;                         //印章编码
                            this.form.Stmp_Dspl_Inst_Nm=formData.Stmp_Dspl_Inst_Nm;         // 印章名称
                            this.form.Stmp_Bsn_Ctlg_ID=formData.Stmp_Bsn_Ctlg_ID;           // 印章类别
                            this.form.Stmp_Kep_InsID=formData.Stmp_Kep_InsID;               // 保管使用部门
                            this.form.Stmp_Kep_Inst_Nm=formData.Stmp_Kep_Inst_Nm;           // 保管使用部门名称                   
                            this.form.Stmp_Blng_InsID=formData.Stmp_Blng_InsID;             // 使用机构 
                            this.form.Stmp_Blng_Inst_Nm=formData.Stmp_Blng_Inst_Nm;         // 使用机构名称                       
                            this.form.Stmp_StCd=formData.Stmp_StCd;                         // 印章状态
                            this.form.Stmp_Bsn_CL_ID=formData.Stmp_Bsn_CL_ID;               // 序号
                            this.form.Stmp_Main_Kep_Psn_ID=formData.Stmp_Main_Kep_Psn_ID;   //实际保管人1
                            this.form.Stmp_Main_Kep_Psn_Nm=formData.Stmp_Main_Kep_Psn_Nm;   //实际保管人1名称
                            this.form.Stmp_Minr_Kep_Psn_ID=formData.Stmp_Minr_Kep_Psn_ID;   //实际保管人2
                            this.form.Stmp_Minr_Kep_Psn_Nm=formData.Stmp_Minr_Kep_Psn_Nm;   //实际保管人2名称
                            this.form.Stmp_FTm_StrtUs_Tm=formData.Stmp_FTm_StrtUs_Tm;       // 启用日期
                            this.form.Bndg_TpCd=formData.Bndg_TpCd;                         // 是否存放到用印机器中
                            this.form.RFID_CardNo=formData.RFID_CardNo;                     //RFID标签
                        }                                              
                    })
                    .catch((err) => {
                        console.log('M516印章基本信息查询报错：', err);
                    });
            },
            //印章状态
            selectStmpStCd(StmpStcd){
                if(StmpStcd == "A01" || StmpStcd == "A02"){//未启用或启用
                    this.stmpEnable = true;
                    //销毁可以为空
                    this.rules.Pcsg_Psn_Nm = [{required: false, message: '请输入销毁人', trigger: 'blur' }];
                    this.rules.EV_Pcsg_Psn_Nm=[{required: false, message: '请输入监销人', trigger: 'blur' }];
                    this.rules.Tsk_Abndn_RDsc=[{required: false, message: '请输入销毁原因', trigger: 'blur' }];
                    //废止可以为空
                    this.rules.Fst_Rcv_Psn_Nm = [{required: false, message: '请输入收回人', trigger: 'change' }];
                    this.rules.StmpMain_HndOv_Psn_Nm=[{required: false, message: '请输入交回人', trigger: 'change' }];
                    this.rules.Inval_RDsc=[{required: false, message: '请输入废止原因', trigger: 'blur' }];
                }else{
                     this.stmpEnable = false;
                     if(StmpStcd == "A03"){//废止
                        console.log("你选择了废止");
                        this.rules.Fst_Rcv_Psn_Nm = [{required: true, message: '请输入收回人', trigger: 'blur' }];
                        this.rules.StmpMain_HndOv_Psn_Nm=[{required: true, message: '请输入交回人', trigger: 'blur' }];
                        this.rules.Inval_RDsc=[{required: true, message: '请输入废止原因', trigger: 'blur' }];
                        
                        //销毁可以为空
                        this.rules.Pcsg_Psn_Nm = [{required: false, message: '请输入销毁人', trigger: 'blur' }];
                        this.rules.EV_Pcsg_Psn_Nm=[{required: false, message: '请输入监销人', trigger: 'blur' }];
                        this.rules.Tsk_Abndn_RDsc=[{required: false, message: '请输入销毁原因', trigger: 'blur' }];
                        console.log(this.rules);
                        
                     }else if(StmpStcd == "A04"){//销毁
                      console.log("你选择了销毁");
                        this.rules.Pcsg_Psn_Nm = [{required: true, message: '请输入销毁人', trigger: 'change' }];
                        this.rules.EV_Pcsg_Psn_Nm=[{required: true, message: '请输入监销人', trigger: 'change' }];
                        this.rules.Tsk_Abndn_RDsc=[{required: true, message: '请输入销毁原因', trigger: 'blur' }];
                        //废止可以为空
                        this.rules.Fst_Rcv_Psn_Nm = [{required: false, message: '请输入收回人', trigger: 'change' }];
                        this.rules.StmpMain_HndOv_Psn_Nm=[{required: false, message: '请输入交回人', trigger: 'change' }];
                        this.rules.Inval_RDsc=[{required: false, message: '请输入废止原因', trigger: 'blur' }];
                     }
                }
            },
            //是否存放到用印机机器中
            bndgTpcdChange(bndgTpcd){
                if(bndgTpcd == "1"){
                    this.EqmtMftrNm_isShow = true;
                    this.StorePlcCd_isShow = false;
                }else{
                    this.EqmtMftrNm_isShow = false;
                    this.StorePlcCd_isShow = true;
                }
            },
            //印章保管人A1角名称
            getA1Nm(A1ID){
                console.log("印章保管人A1角名称",A1ID);
                if(!this.checkKeeper()){
                    this.form.StmpKepPsn_A1_ID = '';
                    return;
                }
                for(var i=0;i<this.sealKeepers.length;i++){
                    if(this.sealKeepers[i].value == A1ID){
                        this.form.StmpKepPsn_A1_Nm = this.sealKeepers[i].label;
                    }
                    this.form.Stmp_Main_Kep_Psn_ID = A1ID;
                    this.form.Stmp_Main_Kep_Psn_Nm = this.form.StmpKepPsn_A1_Nm;
                }
                //this.form.Stmp_Main_Kep_Psn_ID = A1ID;
            },    
            //印章保管人A2角名称
            getA2Nm(A2ID){
                if(!this.checkKeeper()){
                    this.form.StmpKepPsn_A2_ID = '';
                    return;
                }
                for(var i=0;i<this.sealKeepers.length;i++){
                    if(this.sealKeepers[i].value == A2ID){
                        this.form.StmpKepPsn_A2_Nm = this.sealKeepers[i].label;
                    }
                    this.form.Stmp_Minr_Kep_Psn_ID = A2ID;
                    this.form.Stmp_Minr_Kep_Psn_Nm = this.form.StmpKepPsn_A2_Nm;
                }
                // this.form.Stmp_Minr_Kep_Psn_ID = A2ID;
            },

            //印章保管人B1角名称
            getB1Nm(B1ID){
                if(!this.checkKeeper()){
                    this.form.StmpKepPsn_B1_ID = '';
                    return;
                }
                for(var i=0;i<this.sealKeepers.length;i++){
                    if(this.sealKeepers[i].value == B1ID){
                        this.form.StmpKepPsn_B1_Nm = this.sealKeepers[i].label;
                    }
                }
            },
            //印章保管人B2角名称
            getB2Nm(B2ID){
                if(!this.checkKeeper()){
                    this.form.StmpKepPsn_B2_ID = '';
                    return;
                }
                for(var i=0;i<this.sealKeepers.length;i++){
                    if(this.sealKeepers[i].value == B2ID){
                        this.form.StmpKepPsn_B2_Nm = this.sealKeepers[i].label;
                    }
                }
            },
            //根据所选设备名称，返显设备型号，设备编号，RFID
            setMachineInfo(name){
                for(var i=0;i<this.sealMachines.length;i++){
                    if(name == this.sealMachines[i].title){
                        this.form.Eqmt_Modl_Vno = this.sealMachines[i].deviceType;                 // 印章设备型号
                        this.form.Eqmt_ECD = this.sealMachines[i].deviceNumber;                     // 印章设备编号
                        let fileReg = this.sealMachines[i].machineRegNum;  
                        let res = "210488ACF10488_1#488BA7A0488C1_2#88BA350488BA81_3#34416AC0004_4";
                        console.log('allRFID',res);
                        let RFIDArr = res.split('#');
                        for(var j=0;j<RFIDArr.length;j++){
                            let RFID = RFIDArr[j].split('_');
                            console.log("RFID_value",RFID,RFIDArr);
                            this.allRFID[RFID[1]+""] = RFID[0]+"";
                        }
                        console.log("allRFID_VALUE",this.allRFID);                          //机器注册码
                        /*
                        let machineId =this.sealMachines[i].machineId;                        //机器编号
                        //取RFID
                        this.getDeviceRFID(machineId,fileReg).then(res => {
                            console.log('allRFID',res);
                            let RFIDArr = res.split('#');
                            for(var j=0;j<RFIDArr.length;j++){
                                let RFID = RFIDArr[j].split('_');
                                console.log("RFID_value",RFID,RFIDArr);
                                this.allRFID[RFID[1]+""] = RFID[0]+"";
                            }
                            console.log("allRFID_VALUE",allRFID);
                        }); 
                        */                                          
                    }
                }
            },
            //检查印章保管人是否相同
            checkKeeper(){
                let A1=this.form.StmpKepPsn_A1_ID ==''?'A1':this.form.StmpKepPsn_A1_ID;
                let A2=this.form.StmpKepPsn_A2_ID ==''?'A2':this.form.StmpKepPsn_A2_ID;
                let B1=this.form.StmpKepPsn_B1_ID ==''?'B1':this.form.StmpKepPsn_B1_ID;
                let B2=this.form.StmpKepPsn_B2_ID ==''?'B2':this.form.StmpKepPsn_B2_ID;
                console.log(A1+'#'+A2+'#'+B1+'#'+B2);
                if(A1==A2 || A1==B1 || A1==B2 || A2==B1 || A2==B2 || B1==B2){
                    this.$message({
                        type: "error",
                        showClose: true,
                        offset: 400,
                        message: '印章保管人不可以相同，请重新选择！',
                        duration: 2000
                    });
                    return false;
                }else{
                    return true;
                }
            },
            headerBtnClick(btnName){
                switch (btnName) {
                    case '关闭':
                        this.$router.push('/sealManage/sealRegister');
                        break;
                    case '保存':
                        console.log('你点击了保存按钮！');
                        this.saveData();
                        break;
                    case '引入印模':
                        this.addAttachImg();
                        break;
                    // TODO:其他按钮的功能以后再添加
                    default: 
                        console.log('你点击了按钮:' +btnName);
                }
            },
            // 查询所有的印章类别，从“印章刻制类别”配制项获取 
            // TODO:
            queryAllSealTypes: function(){
                return new Promise(function(resolve, reject){
                        setTimeout(() => {
                            let sealTypes = [
                                {label:"行章",value:"A01"},
                                {label:"党委章",value:"A02"},
                                {label:"领导人员名章",value:"A03"},
                                {label:"部门内设章",value:"A04"},
                                {label:"合同专用章",value:"A05"}
                            ];
                            resolve(sealTypes)
                        }, 200);
                    });
            },
            saveData:function(){
                //表单form验证
                this.$refs['form'].validate((valid)=>{
                    if(!valid){
                        this.$message({type:"error",message:"请检查数据是否填写完整！"});
                    }
                });
                console.log("保存数据开始");
                let jsonData={};
                let that = this;
                jsonData.Mnplt_TpCd=this.form.Mnplt_TpCd;                       //操作类型01新增02修改
                jsonData.Stmp_ECD = this.form.Stmp_ECD;                         //印章编码
                jsonData.Stmp_Dspl_Inst_Nm=this.form.Stmp_Dspl_Inst_Nm;         // 印章名称
                jsonData.Stmp_Nm=this.form.Stmp_Nm;                             // 印章简称
                jsonData.Stmp_Bsn_Ctlg_ID=this.form.Stmp_Bsn_Ctlg_ID;           // 印章类别
                jsonData.Stmp_Kep_InsID=this.form.Stmp_Kep_InsID;               // 保管使用部门
                jsonData.Stmp_Kep_Inst_Nm=this.form.Stmp_Kep_Inst_Nm;           // 保管使用部门名称
                jsonData.Stmp_Engr_Rcv_InsID=this.form.Stmp_Engr_Rcv_InsID;     // 制发机构
                jsonData.Stmp_Engr_Rcv_Inst_Nm=this.form.Stmp_Engr_Rcv_Inst_Nm; // 制发机构名称
                jsonData.Stmp_Blng_InsID=this.form.Stmp_Blng_InsID;             // 使用机构 
                jsonData.Stmp_Blng_Inst_Nm=this.form.Stmp_Blng_Inst_Nm;         // 使用机构名称                       
                jsonData.Stmp_StCd=this.form.Stmp_StCd;                         // 印章状态
                jsonData.Stmp_Bsn_CL_ID=this.form.Stmp_Bsn_CL_ID;               // 序号
                jsonData.Seal_Pic_P9_File_Rte = this.form.Seal_Pic_P9_File_Rte; //P9ID
                //制发情况
                jsonData.SCCS=this.form.SCCS;                                   // 刻制单位
                jsonData.Rtfd_Unit_Sum=this.form.Rtfd_Unit_Sum;                 // 批准刻制单位
                jsonData.Pcs_Drw_Psn_Nm=this.form.Pcs_Drw_Psn_Nm;               // 领用人名称
                jsonData.Rtfd_No=this.form.Rtfd_No;                             // 启用文号
                jsonData.Stmp_FTm_StrtUs_Tm=this.form.Stmp_FTm_StrtUs_Tm;       // 启用日期
                //使用情况
                jsonData.Bndg_TpCd=this.form.Bndg_TpCd;                         // 是否存放到用印机器中
                jsonData.Eqmt_Mftr_Nm=this.form.Eqmt_Mftr_Nm;                   // 印章设备
                jsonData.Eqmt_Modl_Vno=this.form.Eqmt_Modl_Vno;                 // 印章设备型号
                jsonData.Eqmt_ECD=this.form.Eqmt_ECD;                           // 印章设备编号
                jsonData.Bsn_SN=this.form.Bsn_SN;                               //印章在用印机中的位置
                jsonData.RFID_CardNo=this.form.RFID_CardNo;                     //RFID标签
                jsonData.Store_Plc_Cd=this.form.Store_Plc_Cd;                   //印章存放地点
                jsonData.StmpKepPsn_A1_ID=this.form.StmpKepPsn_A1_ID;           //印章保管人A1角
                jsonData.StmpKepPsn_A1_Nm=this.form.StmpKepPsn_A1_Nm;           //印章保管人A1角名称
                jsonData.StmpKepPsn_A2_ID=this.form.StmpKepPsn_A2_ID;           //印章保管人A2角
                jsonData.StmpKepPsn_A2_Nm=this.form.StmpKepPsn_A2_Nm;           //印章保管人A2角名称
                jsonData.StmpKepPsn_B1_ID=this.form.StmpKepPsn_B1_ID;           //印章保管人B1角
                jsonData.StmpKepPsn_B1_Nm=this.form.StmpKepPsn_B1_Nm;           //印章保管人B1角名称
                jsonData.StmpKepPsn_B2_ID=this.form.StmpKepPsn_B2_ID;           //印章保管人B2角
                jsonData.StmpKepPsn_B2_Nm=this.form.StmpKepPsn_B2_Nm;           //印章保管人B2角名称
                jsonData.Stmp_Main_Kep_Psn_ID=this.form.Stmp_Main_Kep_Psn_ID;   //实际保管人1
                jsonData.Stmp_Main_Kep_Psn_Nm=this.form.Stmp_Main_Kep_Psn_Nm;   //实际保管人1名称
                jsonData.Stmp_Minr_Kep_Psn_ID=this.form.Stmp_Minr_Kep_Psn_ID;   //实际保管人2
                jsonData.Stmp_Minr_Kep_Psn_Nm=this.form.Stmp_Minr_Kep_Psn_Nm;   //实际保管人2名称
                //废止情况
                jsonData.Repl_Dt=this.form.Repl_Dt;                             //废止日期
                jsonData.Fst_Rcv_Psn_Nm=this.form.Fst_Rcv_Psn_Nm;               //收回人姓名
                jsonData.Inval_RDsc=this.form.Inval_RDsc;                       //废止原因
                jsonData.StmpMain_HndOv_Psn_Nm=this.form.StmpMain_HndOv_Psn_Nm; //交回人姓名
                jsonData.Stmp_Main_HndOv_Tm=this.form.Stmp_Main_HndOv_Tm;       //交回时间
                jsonData.Kep_Inst_Nm=this.form.Kep_Inst_Nm;                     //保管部门名称
                //销毁情况
                jsonData.Stmp_Act_Dstr_Tm=this.form.Stmp_Act_Dstr_Tm;           //销毁时间
                jsonData.Tsk_Abndn_RDsc=this.form.Tsk_Abndn_RDsc;               //销毁原因
                jsonData.Pcsg_Psn_Nm=this.form.Pcsg_Psn_Nm;                     //销毁人姓名
                jsonData.EV_Pcsg_Psn_Nm=this.form.EV_Pcsg_Psn_Nm;               //监销人姓名
                jsonData.Rmrk=this.form.Rmrk;                                   //备注
                console.log("存档请求参数",jsonData);
                //发送交易
                 this.$api.sealManage.sealRegister.sealRegisterMgr(jsonData)
                    .then(res =>{
                        console.log('sealRegisterMgr返回的数据：', res, this);
						that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '印章登记成功！',
                                duration: 2000
                            });
                        this.$router.push({
                            path: '/sealManage/sealRegister/index'
                        });
                    })
                    .catch((err) => {
                        console.log('印章登记数据存档报错：', err);
						that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '印章登记失败！<br/>'+err.BK_DESC,
                                duration: 2000
                            });
                    })
            },
            // table表的方法
            loadTableData(val){
                console.log('loadTableData:', val);
            },
            cellClick (row) {
                console.log('cellClick:', row);
            },
            onScroll () {
                //console.log(document.body.scrollTop,document.documentElement.scrollTop,window.pageXOffset)
                const scrolled = Math.floor(
                    document.body.scrollTop ||
                    document.documentElement.scrollTop ||
                    window.pageXOffset
                );
                //console.log("scrolled:"+scrolled,"jbxx:"+this.distance_jbxx,"zfqk:"+this.distance_zfqk,"syqk:"+this.distance_syqk,"fzqk:"+this.distance_fzqk,"xhqk:"+this.distance_xhqk);
                if (scrolled < this.distance_jbxx+60) {
                    this.active = "#jbxx";
                } else if (scrolled >= this.distance_jbxx + 60 && scrolled < this.distance_zfqk) {
                    this.active = "#zfqk";
                } else if (scrolled >= this.distance_zfqk + 60 && scrolled < this.distance_syqk){
                    this.active = "#syqk";
                } else if (scrolled >= this.distance_syqk + 60 && scrolled < this.distance_fzqk){
                    this.active = "#fzqk";
                } else if (scrolled >= this.distance_fzqk + 60 && scrolled < this.distance_xhqk){
                    this.active = "#xhqk";
                }
            },
            toTarget (target) {
                const toElement = document.querySelector(target);
                toElement.scrollIntoView(this.scrollIntoViewOptions);
            },
        },
        watch: {
            'form.isEnabled': function(val){
                console.log('watch:',val, this);
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
.registerForm {
  background: #fff;
  min-height: 100vh;
}

.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.sealRegisterForm {
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
    padding:45px 70px 0px 70px;
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
    .active {
        background: #3b85ef;
        color: #fff;
    }
    .height_90 {
        height: 200px;
        margin-top: -100px;
    }
}
</style>
