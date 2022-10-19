<template>
    <div class="banklist">
        <div class="draft">
            <el-tabs v-model="activeTab" @tab-click="handleClick">
                <el-tab-pane label="用印设备登记" name="registration">
                    <div class="searchSession">
                        <el-select v-model="search.markingEquipment">
                            <el-option
                                v-for="item in markingEquipmentList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                placeholder="查看本级行用印记设备"
                            ></el-option>
                        </el-select>
                        <el-date-picker
                            v-model="search.enableDate"
                            type="date"
                            :style="{marginLeft:'10px'}"
                            placeholder="按启用日期">
                        </el-date-picker>
                        <el-button type="primary" :style="{marginLeft:'10px'}" icon="el-icon-search" @click="search">查询</el-button>
                        <el-button type="primary" :style="{marginLeft:'10px'}" @click="queryDrive">用印机设驱动检测</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="用印机设备维护审批" name="approval"></el-tab-pane>
            </el-tabs>
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
  
<script >
import mTable from '@/components/table/tTable'
export default {
    data(){
        return {
            activeTab: 'registration',
            search: {
                markingEquipment: '',
                enableDate: ''
            },
            markingEquipmentList: [],
            tableData: [
                {
                    draftDate: '1',
                    documentNo: '1',
                    title: '1',
                    draftUser: '1',
                    status: '1',
                }
            ],
            tableCols: [
                { label: '启用日期', prop: 'draftDate' },
                { label: '设备名称', prop: 'documentNo' },
                { label: '设备型号', prop: 'title' },
                { label: '使用机构', prop: 'draftUser' },
                { label: '设备状态', prop: 'status' },
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
        search(){

        },
        queryDrive(){

        },
        loadData(){

        },
        cellClick(row){

        },
        handleClick(tab, event){
            this.loadData()
        }
    }
}
</script>
  
<style scoped lang="less" rel="stylesheet/less">
 .draft {
  min-height: 100vh;
  .selectDep {
    padding: 40px 30px 30px 100px;
    .orgInfoTitle {
      margin-bottom: 30px;
      font-size: 30px;
      line-height: 75px;
      color: #3b85f0;
      font-weight: 600;
      text-align: center;
    }
  }
  .searchSession {
    margin-bottom: 10px;
  }
}
</style>