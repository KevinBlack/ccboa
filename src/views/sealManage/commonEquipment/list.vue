<template>
    <div class="list">
        <div class="draft">
            <div class="searchSession">
                <el-select v-model="search.bankName">
                    <el-option
                        v-for="item in bankList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        placeholder="请选择"
                    ></el-option>
                </el-select>   
                <el-button type="primary" :style="{marginLeft:'10px'}" @click="insert">新建</el-button>
                <el-button type="primary" :style="{marginLeft:'10px'}" @click="del">删除</el-button>
            </div>
            <m-table
                @refresh="loadData()"
                @cellClick="cellClick"
                size="medium"
                :tableData="tableData"
                :tableCols="tableCols"
                :pagination="pagination"
                :isSelection="true"
            ></m-table>
        </div>
    </div>
</template>
<script>
import mTable from '@/components/table/tTable'
export default {
    data() {
        return {
            search: {
                bankName: ''
            },
            bankList: [],
            tableData: [
                {
                    type: '1',
                    type1: '1',
                    title: '1',
                    day: '1',
                    status: '1',
                }
            ],
            tableCols: [
                { label: '印章审批类别', prop: 'type' },
                { label: '印章刻制类别', prop: 'type1' },
                { label: '用印方式', prop: 'title' },
                { label: '有效天数', prop: 'day' },
                { label: '印章状态', prop: 'status' },
            ],
            pagination: {
                pageNum: 1,
                total: 0,
                pageSize: 10
            },
        }
    },
    components: {
        mTable
    },
    created(){

    },
    methods: {
        insert(){
            this.$router.push({
                path: '/sealManage/commonEquipment/systemConfiguration'
            })
        },
        del(){

        },
        loadData(){

        },
        cellClick(row){

        }
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.searchSession {
    margin-bottom: 10px;
  }
</style>