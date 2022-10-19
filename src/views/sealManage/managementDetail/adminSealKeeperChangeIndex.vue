<template>
    <!-- 这是印章保管人交接 -->
    <div class="sealKeeperChange">
        <!-- 操作按钮 -->
        <template>
            <el-tabs v-model="activeTabName" @tab-click="handleClick">
                <!--<el-tab-pane label="全部" name="all"></el-tab-pane>-->
                <el-tab-pane label="流转" name="flow">
                    <el-form :inline="true" :model="flowFormInline" class="demo-form-inline">
                        <el-form-item label="当前环节">
                            <el-select v-model="flowFormInline.selectedFlowStatus">
                                <el-option 
                                    v-for="item in allFlowStatus" 
                                    :key="item.value"   :label="item.label"   :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                                :style="{marginLeft:'10px'}"  type="primary" icon="el-icon-search"
                                @click="getFlowTableData()">
                                搜索
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button v-for="(item,index) in btnList" :key="index" @click="buttonClick(item.value)" type="primary" :disabled="item.show">
                                {{item.label}}
                            </el-button>
                        </el-form-item>
                    </el-form>

                </el-tab-pane>
                <el-tab-pane label="办结" name="done">
                    <div class="doneMain">
                        <el-select v-model="selectedDoneYear">
                            <el-option 
                                v-for="item in allDoneYears" 
                                :key="item.value"   :label="item.label"   :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary" icon="el-icon-search" :style="{marginLeft:'10px'}" @click="getDoneTableData()">搜索</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </template>
        <!-- 表格 -->
        <m-table 
            @refresh="loadTableData()"   @cellClick="cellClick"  size="medium" @select="selectTableRow" 
            :tableData="tableData"  :tableCols="tableCols"  :pagination="pagination"    :isSelection="true">
        </m-table>
    </div>
</template>

<script>
    // 导入通用表格
    import mTable from '@/components/table/tTable'

    export default {
        name: 'sealKeeperChange',
        components: {
            mTable
        },
        props: {},
        data(){
            return {
                activeTabName: 'flow',
                //表格数据
                tableData: [],
                //表格选中的数据
                selectTableData:[],
                //表格字段
                flowTableCols: [
                    { label: '拟稿日期', prop: 'Stmp_Main_HndOv_Tm' },
                    { label: '印章名称', prop: 'Stmp_ECD' },
                    { label: '编号', prop: 'Apl_Aply_ID' },
                    { label: '移交人', prop: 'StmpMain_HndOv_Psn_Nm' },
                    { label: '接收人', prop: 'Stmp_Main_Rcv_Psn_Nm' },
                    { label: '当前环节', prop: 'Stmp_HndOv_StCd_Desc'},
                    { label: '操作人', prop: 'Operator' },
                ],
                doneTableCols: [
                    { label: '交出时间', prop: 'Stmp_Main_Rcv_Tm' },
                    { label: '印章名称', prop: 'Stmp_ECD' },
                    { label: '编号', prop: 'Apl_Aply_ID' },
                    { label: '移交人', prop: 'StmpMain_HndOv_Psn_Nm' },
                    { label: '接收人', prop: 'Stmp_Main_Rcv_Psn_Nm' },
                ],
                pagination: {
                        pageNum: 1,
                        total: 0,
                        pageSize: 10
                    },
                btnList: [{label:'起草',value:"01",show:false},{label:'审批',value:"02",show:false},{label:'移交',value:"03",show:false},{label:'接收',value:"04",show:false}],
                flowFormInline: {
                    selectedFlowStatus: '',
                },
                allFlowStatus: [{
                        label: '待办',
                        value: '01'
                    }, {
                        label: '已办',
                        value: '02'
                    }],
                // 办结相关参数
                selectedDoneYear: '',
                allDoneYears: []
            };
        },
        computed: {
            // 如果选择流转环节，则显示流转环节的table表和数据；如果选择办结环节，则显示办结的table表和数据
            tableCols: function(){
                if (this.activeTabName === 'flow') {
                    return this.flowTableCols;
                } else if (this.activeTabName === 'done') {
                    return this.doneTableCols;
                } else {
                    return this.flowTableCols;
                }
            }
        },
        watch: {
            activeTab (tabVal) {
                // // 如果选择完结，查询年份
                // if (tabVal === 'done') {
                // }
                this.loadTableData();
            }
        },
        methods: {
            handleClick(tab, event){
                if (tab.name === 'done') {
                    // 获取完结的所有年份
                    this.getDoneYears();
                }
            },
            //表格选中的数据
            selectTableRow(row){              
                this.selectTableData = row;
                console.log("选中的数据",this.selectTableData);
                let userId = JSON.parse(localStorage.userInfo).humanCode;
                if(this.selectTableData[0].Stmp_HndOv_StCd=="21"){//起草待审核
                    this.btnList[2].show=true;//移交
                    this.btnList[3].show=true;//接收
                    this.btnList[1].show=false;//审批
                }else if(this.selectTableData[0].Stmp_HndOv_StCd=="22"){//审批待移交
                    this.btnList[1].show=true;//审批
                    this.btnList[3].show=true;//接收
                    if(userId != this.selectTableData[0].StmpMain_HndOv_Psn_ID){
                        this.btnList[2].show = true;
                    }else{
                        this.btnList[2].show = false;//移交
                    }
                }else if(this.selectTableData[0].Stmp_HndOv_StCd=="23"){//移交待接收
                    this.btnList[1].show=true;//审批
                    this.btnList[2].show=true;//移交
                    if(userId != this.selectTableData[0].Stmp_Main_Rcv_Psn_ID){
                        this.btnList[3].show = true;
                    }else{
                        this.btnList[3].show = false;
                    }
                }
            },
            // 点击按钮
            buttonClick(item){
                if (item === '01') {
                    this.$router.push({
                        path: '/sealManage/sealKeeperChange/sealKeeperChangeForm'
                    });
                }else if(item === '02'){
                    console.log("审核开始");
                    // 判断是否有勾选一条记录
                    if (this.selectTableData.length === 0) {
                        this.$message({
                                message: '请先勾选一条记录再进行修改审批！',
                                type: 'warning',
                                showClose: true,
                            });
                        return;
                    }
                    // 跳转到修改页面 // query相当于带查询参数?a=jk&b=2， params相当于#a=2
                    let selects = this.selectTableData[0];
                    console.log('审批选择的记录', selects);
                     this.$router.push({
                        path: '/sealManage/sealKeeperChange/sealKeeperChangeForm',
                        query:{Stmp_HndOv_Bsn_ID:selects.Stmp_HndOv_Bsn_ID}
                    });
                }else if(item === '03'){
                    console.log("移交开始");
                     // 判断是否有勾选一条记录
                    if (this.selectTableData.length === 0) {
                        this.$message({
                                message: '请先勾选一条记录再进行移交！',
                                type: 'warning',
                                showClose: true,
                            });
                        return;
                    }
                    // 跳转到修改页面 // query相当于带查询参数?a=jk&b=2， params相当于#a=2
                    let selects = this.selectTableData[0];
                    console.log('移交选择的记录', selects);
                     this.$router.push({
                        path: '/sealManage/sealKeeperChange/sealKeeperChangeForm',
                        query:{Stmp_HndOv_Bsn_ID:selects.Stmp_HndOv_Bsn_ID}
                    });
                }else if(item === '04'){
                     console.log("接收开始");
                    // 判断是否有勾选一条记录
                    if (this.selectTableData.length === 0) {
                        this.$message({
                                message: '请先勾选一条记录再进行接收！',
                                type: 'warning',
                                showClose: true,
                            });
                        return;
                    }
                    // 跳转到修改页面 // query相当于带查询参数?a=jk&b=2， params相当于#a=2
                    let selects = this.selectTableData[0];
                    console.log('接收选择的记录', selects);
                     this.$router.push({
                        path: '/sealManage/sealKeeperChange/sealKeeperChangeForm',
                        query:{Stmp_HndOv_Bsn_ID:selects.Stmp_HndOv_Bsn_ID}
                    });
                }
                /*
                else if(item === '05'){
                     console.log("删除开始");
                    // 判断是否有勾选一条记录
                    if (this.selectTableData.length === 0) {
                        this.$message({
                                message: '请先勾选一条记录再进行接收！',
                                type: 'warning',
                                showClose: true,
                            });
                        return;
                    }
                    // 跳转到修改页面 // query相当于带查询参数?a\=jk&b=2， params相当于#a=2
                    let selects = this.selectTableData[0];
                    console.log('删除的记录', selects);
                    let jsonData={};
                    jsonData.Mnplt_TpCd="05";//删除
                    jsonData.Stmp_HndOv_Bsn_ID = this.form.Stmp_HndOv_Bsn_ID; //印章交接业务编号
                    //发送交易
                    let that = this;
                    this.$api.sealManage.sealKeeperChange.sealKeeperChangeMgr(jsonData)
                    .then(res =>{
                        console.log('addSealKeeperChange返回的数据：', res, this);
                        that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接删除成功！',
                                duration: 2000
                            });   
                    })
                    .catch((err) => {
                        console.log('报错：', err);
                        that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接删除失败！\n'+err,
                                duration: 2000
                            });
                    })
                }*/
            },
            // 点击流转里的查询按钮
            getFlowTableData(flowStatus){
                //查询前选将表格数据置空
                this.tableData=[];
                let jsonData={
                    Mnplt_TpCd:this.flowFormInline.selectedFlowStatus,
                    _pagination:{
                        PAGE_JUMP:this.pagination.pageNum,
                        REC_IN_PAGE:this.pagination.pageSize
                    }
                }
                 this.$api.sealManage.sealKeeperChange.querySealKeeperChange(jsonData)
                    .then(res =>{
                        console.log('querySealRegister返回的数据：', res.Stmp_HndOv_Record_Grp);
                        for(var i=0;i<res.Stmp_HndOv_Record_Grp.length;i++){
                            res.Stmp_HndOv_Record_Grp[i].Operator=JSON.parse(localStorage.userInfo).humanName;
                            if(res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "21"){
                                res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc="起草待审核";
                            }else if(res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "22"){
                                res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc="审批待移交";
                            }else if(res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "23"){
                                res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc="移交待接收";
                            }
                            this.tableData.push(res.Stmp_HndOv_Record_Grp[i]);
                        }
                        console.log('表格数据：', this.tableData);
                    })
                    .catch((err) => {
                        console.log('报错：', err);
                    })
            },
            // 点击办结查询按钮
            getDoneTableData(flowStatus){
                //查询前选将表格数据置空
                this.tableData=[];
                let jsonData={
                    Mnplt_TpCd:"04",
                    _pagination:{
                        PAGE_JUMP:this.pagination.pageNum,
                        REC_IN_PAGE:this.pagination.pageSize
                    }
                }
                
                 this.$api.sealManage.sealKeeperChange.querySealKeeperChange(jsonData)
                    .then(res =>{
                        console.log('querySealRegister返回的数据：', res.Stmp_HndOv_Record_Grp);
                        for(var i=0;i<res.Stmp_HndOv_Record_Grp.length;i++){
                            this.tableData.push(res.Stmp_HndOv_Record_Grp[i]);
                        }
                        console.log('表格数据：', this.tableData);
                    })
                    .catch((err) => {
                        console.log('报错：', err);
                    })
            },
            // table表的方法
            loadTableData(val){
                console.log('loadTableData:', val);
            },
            cellClick (row) {
                console.log('cellClick:', row);
            },
            // 查询完结的所有年份,返回promise实例
            queryDoneYears(){
                // TODO: 以后补全查询年份的方法
                return new Promise(function(resolve, reject){
                    setTimeout(() => {
                        let isSuccess = true;
                        let years = [
                                {label: '2009年', value: '2009年'}, {label: '2010年', value: '2010年'}, 
                                {label: '2011年', value: '2011年'}, {label: '2012年', value: '2012年'}
                            ];
                        return isSuccess ? resolve(years) : reject(years);
                    }, 200);
                });
            },
            // 获取完结的所有年份
            getDoneYears(){
                this.queryDoneYears()
                    .then( (years) => {
                        this.allDoneYears = years;
                        this.selectedDoneYear = this.allDoneYears[0].value;
                    })
                    .catch( (err) => {
                        console.log('getDoneYears:catch', err);
                    });
            }
            
        },
        // 生命周期created:组件实例创建完成，属性已绑定，但DOM还没生出。此时能取到data数据
        created: function(){
            console.log('生命周期created：');
            // 查询完结的所有年份
            this.getDoneYears();
        }

    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .markDraft {
        min-height: 100vh;
    }
</style>