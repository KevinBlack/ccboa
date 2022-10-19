<template>
    <!-- 这是印章管理》管理员查看》印章废止首页 -->
    <div class="adminAbolishedDraftIndex">
        <!-- 查询条件 -->
        <el-form :inline="true" ref="adminIndexForm" :model="adminIndexForm" label-width="90px">
            <el-form-item label="流程状态" prop="status">
                <el-select
                    v-model="adminIndexForm.status"
                    style="width: 100%"
                    clearable
                >
                    <el-option
                        v-for="item in allStatus"
                        :key="item.label"
                        :value="item.value"
                        :label="item.label"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="办结日期" prop="selectedTime_Origin">
                <el-date-picker
                    v-model="adminIndexForm.selectedTime_Origin"  :picker-options="donePickerOptions"
                    type="daterange"  align="right"  unlink-panels
                    range-separator="——"  start-placeholder="开始日期"  end-placeholder="结束日期" 
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button 
                    v-for="(item, index) in btnsList"
                    :key="index"  @click="clickBtns(item.name)" v-show="item.show" type="primary"
                >{{item.name}}</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <t-table
            size="medium"
            @refresh="doQuery('done')"   @cellClick="cellClick"   @select="selectTable" 
            :tableCols="tableCols"  :pagination="pagination"  :isSelection="true"
            :tableData="tableData | filterDoneTable($data)"
        ></t-table>
    </div>
</template>

<script>
/*** 印章管理》管理员查看》印章废止（首页） ***/

// 导入通用表格
import tTable from '@/components/table/tTable'

export default {
    name: 'adminAbolishedDraftIndex',
    components: {
        tTable,
    },
    data(){
        return{
            storage: {},        // 当前操作员的信息
            tableSelects: [],   // 表格的勾选项
            pagination: {
                pageNum: 1,
                total: 0,
                pageSize: 20
            },  // 表格的分页
            tableCols: [
                { label: '业务编号', prop: 'Stmp_Repl_Aply_Bsn_ID' },
                { label: '申请单位', prop: 'Stmp_Kep_Inst_Nm' },
                { label: '申请日期', prop: 'Stmp_Aply_Crt_Tm' },
                { label: '废止日期', prop: 'Repl_Dt'},
                { label: '编号',     prop: 'Apl_Aply_ID' },
                { label: '当前环节', prop: 'Node_Nm'},
                { label: '当前处理人', prop: 'Cur_Pcsg_Psn_Nm' },
            ],  // 表格的项
            tableData: [],  // 表格的数据
            btnsList: [
                {name: '查询', show: true},
                {name: '重置', show: true}
            ],  // 按钮组
            allStatus: [
                {value: 'flow_doing', label: '待办'}, 
                {value: 'flow_done', label: '已办'}, 
                {value: 'done', label: '办结'}
            ],      // 所有的流程状态
            adminIndexForm: {
                status: '',     // 流程状态
                selectedTime_Origin: [],    // 选择的时间
            },
            donePickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
        }
    },
    computed: {

    },
    filters: {
      
    },
    methods: {
        // 点击按钮
        clickBtns(btnName){
            if (btnName === '查询') {
                this.querySubmit();
            } else if (btnName === '重置') {
                this.reset('adminIndexForm');
            }
        },
        // 查询
        querySubmit(){
            console.log('查询', this.adminIndexForm);
            const tpcds = {
                'flow_doing':   '01',
                'flow_done':    '02',
                'done':         '03',
                'all':          '04',
            };  // 所有的流程状态。 flow-doing-待办 flow-done-已办 done-办结 all-未选流程状态
            const tpcd = tpcds[this.adminIndexForm.status || 'all'];  // 操作类型
            let startTime = '', endTime = '';  
            if (this.adminIndexForm.selectedTime_Origin[0] && this.adminIndexForm.selectedTime_Origin[1]) {
                startTime = this.adminIndexForm.selectedTime_Origin[0].getTime();
                endTime   = this.adminIndexForm.selectedTime_Origin[1].getTime();
            }
            /* 查询 */
            const params = {
                Enqr_StDt:  startTime,			// 查询起始日期（申请开始时间）
                QRY_END_DT: endTime,			// 查询结束日期（申请结束时间）
                Unit_Dept_EmpID: this.storage.userInfo.humanId + '',    // 员工ID
                Mnplt_TpCd: tpcd,   			// 操作类型 01-待办, 02-已办 03-办结 04-全部
                _pagination: {                  // 分页
                    PAGE_JUMP: this.pagination.pageNum,
                    REC_IN_PAGE: this.pagination.pageSize
                }
            };
            const options = {warningLevel: 1, warningTitle: '查询印章废止信息列表失败！'};
            this.$api.sealManage.sealAbolished.getSealAbolishedApplyList(params, options).then(res => {
                this.tableData = res.LIST1;
                if (res._COMMON && res._COMMON.COMB && res._COMMON.COMB.TOTAL_REC) {
                    this.pagination.total = res._COMMON.COMB.TOTAL_REC;  // 总数量
                }
            });
        },
        // 重置
        reset(formName){
            console.log('重置', this.adminIndexForm);
            this.$refs[formName].resetFields(); // 将formData里的值置为初始值。注意需要设置prop才行
        },
        // 勾选表格的记录
        selectTable(rows){
            this.tableSelects = rows;
        },
        // 点击表格的记录。 row:点击的记录
        cellClick(row){
            this.toSealDetailPage('see', [row]);
        },
        /**
         * 跳转到废止文档页面。可修改，可查看
         * @param {String} type 文档类型。有 new, modify, see两种
         * @param {Array} selects 勾选的记录。对象数组
         */
        toSealDetailPage(type = 'see', selects){
            let query = {};
            query.type = type;  // 文档类型
            query.id = selects[0].Stmp_Repl_Aply_Bsn_ID;  // 印章废止申请业务编号
            // 跳转到废止文档页面。 query相当于带查询参数?a=jk&b=2
            this.$intent.goNewPage(this, {
                path: '/sealManage/managementDetail/adminAbolishedDraft',
                query: query,
            });
        },
    },
    watch: {

    },
    created: function(){
        console.log('生命周期created：');
        window.jk = this;
        this.storage.userInfo = JSON.parse(localStorage.userInfo);  // 当前登录人信息
    },
    mounted: function() {
        
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">   
    .adminAbolishedDraftIndex {
        min-height: 100vh;
    }
</style>