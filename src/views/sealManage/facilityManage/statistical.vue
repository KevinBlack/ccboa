<template>
    <div class="statisical">
        <div class="draft">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="搜索展开" name="1">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="行名">
                            <el-select v-model="form.name" :style="{width: '100%'}">
                                <el-option label="区域一" value="shanghai"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="维护完成时间">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.completeDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="导出类型">
                            <el-radio-group v-model="form.type">
                                <el-radio label="HTML"></el-radio>
                                <el-radio label="Excel"></el-radio>
                              </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' @click='query'>开始统计</el-button>
                            <el-button @click='reset'>重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
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
    data(){
        return {
            form: {
                name: '',
                completeDate: '',
                endDate: '',
                type: ''
            },
            tableData: [
                {
                    name: '1',
                    name1: '1',
                    time: '1',
                    num: '1'
                }
            ],
            tableCols: [
                { label: '机构名称', prop: 'name' },
                { label: '印章名称', prop: 'name1' },
                { label: '手工用印时长', prop: 'time' },
                { label: '用印次数', prop: 'num' }
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
    methods: {
        loadData(){
        },
        cellClick(row){

        },
        
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less"></style>