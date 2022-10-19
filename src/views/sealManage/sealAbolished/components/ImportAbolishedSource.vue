/**
 * 引入废止依据
 */
<template>
    <div class="importAbolishedSource">
        <el-dialog 
            title="发文查询"  :visible.sync="showDialog" :show-close="false" width="90%"  class="bigDialog"
        >
        <el-form ref="importAbolishedSourceForm" :model="formData" label-width="90px">
            <base-search-form ref="baseSearchForm" @reset="reset" @submit="querySubmit">
            <el-col slot="oneLine" :span="18">
                <el-form-item label="拟稿日期" prop="draftRangeTime">
                <el-date-picker
                    v-model="formData.draftRangeTime"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
                </el-form-item>
            </el-col>
            <div slot="more">
                <el-form-item label="发文日期" prop="sendRangeTime">
                <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="formData.sendRangeTime"
                    type="daterange"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
                </el-form-item>
                <el-row>
                <el-col :span="12">
                    <el-form-item label="标题" prop="title">
                    <el-input v-model="formData.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发文字号" prop="documentNo">
                    <el-input v-model="formData.documentNo"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                    <el-form-item label="制发行" prop="draftOrganId">
                    <el-select
                        v-model="formData.draftOrganId"
                        style="width: 100%"
                        clearable
                    >
                        <el-option
                            v-for="item in bankOptions"
                            :key="item.unitId"
                            :value="item.unitId"
                            :label="item.unitName"
                        ></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="主办部门" prop="draftDepartmentId">
                    <div style="display: flex">
                        <el-input  v-model="formData.draftDepartmentName"  readonly></el-input>
                        <el-button  type="primary"  style="marginleft: 3px"  @click="selMainDep">选择</el-button>
                    </div>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="8">
                    <el-form-item label="表单类型" prop="formType">
                    <el-radio-group v-model="formData.formType">
                        <el-radio label="1">非会签</el-radio>
                        <el-radio label="2" :disabled="formData.sendType == '2'"
                        >会签单</el-radio
                        >
                    </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="公文状态" prop="orderState">
                    <el-radio-group v-model="formData.orderState" disabled>
                        <el-radio label="0">全部</el-radio>
                        <el-radio label="1">流转</el-radio>
                        <el-radio label="2">办结</el-radio>
                    </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="发文形式" prop="sendType">
                    <el-radio-group v-model="formData.sendType">
                        <el-radio label="0">全部</el-radio>
                        <el-radio label="1">电子</el-radio>
                        <el-radio label="2" :disabled="formData.formType == '2'"
                        >实物</el-radio
                        >
                    </el-radio-group>
                    </el-form-item>
                </el-col>
                </el-row>

                <el-form-item label="发文类型" prop="orderType">
                <el-radio-group v-model="formData.orderType">
                    <el-radio label>全部</el-radio>
                    <el-radio label="行发文">行发文</el-radio>
                    <el-radio label="部门发文">部门发文</el-radio>
                    <el-radio label="党务发文">党务发文</el-radio>
                    <el-radio label="会议纪要">会议纪要</el-radio>
                    <el-radio label="工作简报">工作简报</el-radio>
                </el-radio-group>
                </el-form-item>
            </div>
            </base-search-form>
        </el-form>

        <m-table
            ref="documentTab"
            @refresh="loadData()"
            :isSelection="true"
            :isIndex="true"
            :isHandle="false"
            :searchData="formData"
            :tableData="docTableData"
            :tableCols="tableCols"
            :pagination="pagination"
            :sortable="false"
        />
        <div slot="footer">
            <el-button @click="cancelImpor">取消</el-button>
            <el-button type="primary" @click="sureImpor">确定</el-button>
        </div>
        </el-dialog>
        <!-- 选择主办部门弹窗 -->
        <treeCofig
            :treeData="mainDeptTreeData"
            :canTab="false"
            :hasRadio="false"
            dialogTit="选择主办部门"
            :singelCheckF="true"
            :dialogState="mainDeptDialogState"
            :offenUse="false"
            @showCompDialog="mainDeptShowCompDialog"
        ></treeCofig>
    </div>
</template>

<script>
import baseSearchForm from '@/components/form/baseSearchForm'
import mTable from 'components/table/tTable'
import treeCofig from '@/components/tree/tree-fawen';

export default {
    name: 'ImportAbolishedSource',
    components: {
        'base-search-form': baseSearchForm,
        'm-table': mTable,
        'treeCofig': treeCofig,
    },
    props: {
        showDialog: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            bankOptions: JSON.parse(localStorage.getItem("unitInfo")) || [],
            formData: {},
            tableData: [],
            pagination: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            tableCols: [
                {label: '拟稿日期', prop: 'createTime'},
                {label: '发文字号', prop: 'documentNo'},
                {label: '标题', prop: 'title'},
                {label: '拟稿部门', prop: 'draftDepartment'},
                {label: '当前处理人', prop: 'currentUser'},
            ],
            docTableData: [],
            // 选择主办部门弹窗
            mainDeptTreeData: [],
            mainDeptDialogState: false,
        }
    },
    computed: {},
    methods: {
        loadData () {
            let params = {
                function: "searchSendOrder",
                page: this.pagination.pageNum,
                totalCount: 0,
                state: 1,
                limit: 10
            };
            Object.assign(params, this.formData);
            this.$post.postData("searchSendOrder", JSON.stringify(params), 'A08462001')
                .then(res => {
                    console.log('res', res);
                    if (res && res.success) {
                        this.pagination.total = res.data && res.data.total;
                        this.docTableData = res.data && res.data.rows;
                    }
                })
        },
        // 选择主办部门
        selMainDep () {
            this.$post.postData( 
                "selUnitTreeByHQ",
                JSON.stringify( {function: "selUnitTreeByHQ", flag: false} ),
                this.$businessCode.ggywgn
            ).then(res => {
                console.log('selMainDep:', res);
                this.mainDeptTreeData = (res && res.data) || [];
                this.mainDeptDialogState = true
            });
        },
        mainDeptShowCompDialog(data, status, type, params){
            let id = "";
            let departmentName = "";
            if (status) {
                if (data.length) {
                    id = data[0].id;
                    departmentName = data[0].name;
                } else {
                    id = "";
                    departmentName = "";
                }
                this.formData.draftDepartmentName = departmentName;
                this.formData.draftDepartmentId = id;
                this.$forceUpdate();
            }
            this.mainDeptDialogState = !this.mainDeptDialogState;
        },
        // 开始搜索
        querySubmit(){
            console.log('开始搜索');
             if (this.formData.draftRangeTime.length > 0) {
                this.formData.draftTimeStart = this.formData.draftRangeTime[0];
                this.formData.draftTimeEnd = this.formData.draftRangeTime[1];
            }
            if (this.formData.sendRangeTime.length > 0) {
                this.formData.sendTimeStart = this.formData.sendRangeTime[0];
                this.formData.sendTimeEnd = this.formData.sendRangeTime[1];
            }
            this.loadData()
        },
        // 重置
        reset(){
            this.$refs.importAbolishedSourceForm.resetFields()
            this.formData.draftDepartmentName = ''
            this.formData.draftTimeStart = this.formData.draftTimeEnd = "";
            this.formData.sendTimeStart = this.formData.sendTimeEnd = "";
        },
        // 取消
        cancelImpor(){
            this.$emit('cancelImpor');
        },
        // 确定
        sureImpor() {
            let selection = this.$refs.documentTab.$refs.cesTable.selection
            selection.map(item => {
                this.$set(item, 'sealDetail', '');
                this.$set(item, 'useSealCount', 0);
            });
            if (this.tableData.length === 0) {
                this.tableData = selection;
            } else {
                this.tableData.push(...selection);
            }
            this.$refs.importAbolishedSourceForm.resetFields();
            this.$emit('sureImpor', this.tableData);
        },
    },
    created () {

    },
    mounted () {}
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.down {
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>