<template>
  <div class="check">
    <div style="margin: 15px 0">      
     <el-tabs v-model="activeName" @tab-click="handleTabsClick">
            <el-tab-pane label="未反馈" name="tabs-look">         
            </el-tab-pane>     
            <el-tab-pane label="已反馈" name="tabs-sleep">
                  <el-date-picker
                  style="float:right"
                    v-model="value"
                    type="year"
                    @change='changeYear'
                    placeholder="2020">       
                    </el-date-picker>
            </el-tab-pane> 
              <el-button type="primary" style="margin-left:20px;float:left" @click="exportData" >导出</el-button>                      
        </el-tabs>    
    </div>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="chooseYt"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection='true'
      :searchData="searchData"
    ></m-table>
  </div>
</template>
<script type="text/ecmascript-6">
    import mTable from '@/components/table/tTable'
    import exportTable from "../../../../minixs/exportTable";
    export default {
        name: "adNotice",
        components: {
            mTable
        },
        props: {},
        data() {
            return { 
                status:'0' ,             
                addArry:[],
                 activeName: "tabs-look",
                searchData:{},
                tableData: [
                    {title:'st',ytMc:'ming',sendPersonName:'ren',sendTime:'1234'}
                ],
                tableCols: [                 
                    {label: '会议名称', prop: 'title'},
                    {label: '议题名称', prop: 'ytMc'},           
                    {label: '发送人', prop: 'sendPersonName'},
                    {label: '发送时间', prop: 'sendTime'},                   
                ],
                 tableCols0: [
                     {label: '会议名称', prop: 'title'},
                    {label: '议题名称', prop: 'ytMc'},           
                    {label: '发送人', prop: 'sendPersonName'},
                    {label: '发送时间', prop: 'sendTime'},   
                ],
                tableCols1: [
                    {label: '会议名称', prop: 'title'},
                    {label: '议题名称', prop: 'ytMc'},           
                    {label: '发送人', prop: 'sendPersonName'},
                    {label: '反馈时间', prop: 'responseTime'},  
                ],
            pagination: {
                    pageNum: 1,
                    pageSize: 10
                },
                options: [],
                value: "",
                deleteArry:''
            }
        },
        computed: {},
        methods: {
            changeYear(){},
             exportData(){
                exportTable.exportExcel("会议预通知单");
            },
                handleTabsClick(tab) {
            if (tab.index == 0) {
            this.tableCols = deepClone(this.tableCols0);
            this.status = '0'
            this.pagination.pageNum=1
            this.loadData()
            } else if (tab.index == 1) {
            this.tableCols = deepClone(this.tableCols1);
            this.status = '1'
            this.pagination.pageNum=1
            this.loadData()
            } 
            },
             chooseYt(row){
                let dataArry = [] 
                row.map(function (value, index) {
                dataArry.push(value.id)
                })
                this.addArry = dataArry.join(',')
            },  
             select(row) {},
            loadData() {
            this.$api.secreatary.meeting.getAdList(
                    { status:this.status,
                        // ytIds:addArry,
                        
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,
                    }

                ).then(res => {
                    this.pagination.total = res.total
                    res.data.map(item=>{
                        item.sendTime=formatData(item.sendTime,'YYYY-MM-DD')
                        item.responseTime=formatData(item.responseTime,'YYYY-MM-DD')
                    })
                    this.tableData = res.data
                  
                })
            },
            cellClick(row) {
                this.$router.push({
                    path:'/secretary/presidentMeeting/adNotice/adDetail',
                    query:{rowData:JSON.stringify(row)}
                })
            },
            create_btn(){}           
        },     
        activated() {
        },
        mounted() {
        },
        created() {
            this.loadData(this.status)
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>


