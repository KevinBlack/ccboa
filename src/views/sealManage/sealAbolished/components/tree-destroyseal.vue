<template>
    <div class="treeSelect-Wrap">
        <el-input v-model="selectedDestroySealsNm" :readonly="true" @focus="showDialog" :disabled="disabled"></el-input>
        <!-- 设置close-on-click-modal后设置close方法应该是不起作用的 -->
        <el-dialog :title="title" :visible.sync="isShow">
            <div>
                <el-form :model="form" label-width="100px" ref="treeSearchForm">
                        <el-form-item label="印章主要交出人编号">
                                <el-input v-model="form.StmpMain_HndOv_Psn_ID"></el-input>
                        </el-form-item>
                        <el-button 
                            type="primary" :style="{marginLeft:'10px'}"
                            @click="doQuery"
                        >查询</el-button>
                        <!-- <el-col :span="12">
                            <el-form-item label="印章首次启用时间">
                                <el-date-picker 
                                    type="date" placeholder="请选择日期" 
                                    v-model="form.Stmp_FTm_StrtUs_Tm" 
                                    style="width: 100%;" value-format="yyyyMMdd"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col> -->
                    <!-- </el-row> -->
                    <!-- <el-row>
                        <el-col :span="12">
                            <el-form-item label="印章编码">
                                  <el-input v-model="form.Stmp_ECD"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="印章状态">
                                  <el-input v-model="form.Stmp_StCd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                </el-form>
            </div>
            <div>
                <h2>所有待销毁的印章</h2>
                <!-- 待选表格 -->
                <m-table
                    ref="destroyseal_allTable"
                    @refresh="loadTableData()"   @cellClick="cellClick"  size="medium"  @select="selectTableRow"
                    :tableData="tableData"  :tableCols="allTableCols"  :pagination="pagination"    :isSelection="true">
                </m-table>
            </div>
            <div>
                <h2>已选待销毁的印章</h2>
                <!-- 已选表格 -->
                <m-table ref="destroySeal_selectedTable"
                    @cellClick="cellClick"  size="medium"
                    :tableData="tableData_selected"  :tableCols="allTableCols"
                    :pagination="pagination_selected"  :isSelection="false"
                ></m-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelSetDialog">取 消</el-button>
                <el-button type="primary" @click="saveSetDialog">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 导入通用表格
    import mTable from '@/components/table/mTable'

    export default {
        props: {
            disabled:{type: Boolean, default: false},
            value: {type: Array, default: () => []},
        },
        components: {
            mTable
        },
        data(){
            return {
                title: '选择要销毁的印章',
                isShow: false,
                form: {
                    StmpMain_HndOv_Psn_ID:  '', // 印章主要交出人编号
                },
                allTableCols: [
                    {label: '印章编码', prop: 'Stmp_ECD'},
                    {label: '印章显示机构名称', prop: 'Stmp_Dspl_Inst_Nm'},
                    {label: '印章状态', prop: 'Stmp_StCd_DESC'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 0,
                    pageSize: 100
                },
                pagination_selected: {
                    pageNum: 1,
                    total: 0,
                    pageSize: 50
                },
                tableData: [],              // 所有的待销毁的印章
                tableData_selected: [],     // 选择的待销毁的印章
                desc_Stmp_StCd: {           // OA的所有印章状态
                    'A01': '未启用',
                    'A02': '启用',
                    'A03': '废止',
                    'A04': '销毁',
                    'A05': '实物归档'
                },
            }
        },
        computed: {
            selectedDestroySealsNm: function(){
                console.log('computed:', this.value);
                let str = '';
                this.value.forEach((item, index) => {
                    console.log('item:', item);
                    str += item.Stmp_ECD + ',';
                });
                return str;
            },
        },
        watch: {
            value: function(newVal, oldVal){
                console.log('watch value:', newVal, oldVal);
                this.tableData_selected = newVal;
            },
        },
        methods: {
            showDialog(){
                console.log('tree-destroyseal:showDialog', this.value);
                this.isShow = true;
                this.tableData_selected = this.value.map(function(item){
                    return item;
                });
            },
            // 查询
            doQuery(){
                let param = {
                    StmpMain_HndOv_Psn_ID:  this.form.StmpMain_HndOv_Psn_ID,    // 印章主要交出人编号
                    Mnplt_TpCd:             '02',                               // 01-可交接 02-可销毁
                    _pagination:{
                        PAGE_JUMP:this.pagination.pageNum,
                        REC_IN_PAGE:this.pagination.pageSize
                    }
                }
                this.$api.sealManage.sealKeeperChange.querySealList(param)
                    .then(res => {
                        let arr = res.LIST1 || [];
                        this.pagination.total = arr.length;
                        // 印章状态转义。A01 未启用  A02 启用 A03 废止  A04 销毁  A05  实物归档
                        arr = arr.map((item) => {
                            item.Stmp_StCd_DESC = this.desc_Stmp_StCd[item.Stmp_StCd] || item.Stmp_StCd;
                            return item;
                        });
                        this.tableData = arr.slice(0);
                        console.log('表格数据：', this.tableData);
                    })
                    .catch((err) => {
                        console.log('报错：', err);
                        this.$message.error('查询销毁印章信息失败!');
                    })
            },
            // 表格
            loadTableData(){

            },
            cellClick(){

            },
            // 勾选记录(最多50条)
            selectTableRow(rows, row){
                console.log('勾选记录：',rows, row, rows.indexOf(row));
                if (rows.length >= 50) {
                    this.$refs.destroyseal_allTable.toggleRowSelection(row);
                    this.$message({message: '最多选择50条记录进行销毁!', type:"info"});
                    return;
                }
                this.tableData_selected = rows.slice(0);
                this.pagination_selected.total = rows.length;
                console.log('表数据：', this.tableData, this.tableData_selected);
            },

            // 点击取消按钮
            cancelSetDialog(){
                this.isShow = false;
                this.$emit('input', this.value);
            },
            // 点击确认按钮
            saveSetDialog(){
                this.isShow = false;
                this.$emit('input', this.tableData_selected);
            },
            // // 清空选择项
            // clearSelectRows(){
            //     this.nowCheckList = [];
            // },
            // // 删除选择项的某一项
            // deleteSelectRow(index){
            //     this.nowCheckList.splice(index, 1); // 移除指定的项
            // }
        },
        created: function(){
            console.log('tree-select created');
            this.tableData_selected = [];
            this.value.forEach((item, index) => {
                this.$set(this.tableData_selected, index, item);
            });
        },
        mounted: function(){
            console.log('tree-destroyseal mounted');
            window.myjktree = this;
        },
        watch: {
           
        },
        updated: function(){

        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .box-card {
        height: 300px;
    }
    .card-header {
        height: 28px;
    }
    .oneItem {
        height: 40px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>