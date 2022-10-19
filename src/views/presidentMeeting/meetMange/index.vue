<template>
  <div class="check">
    <div style="margin: 15px 0">     
        <el-button type="primary" style="margin-left:20px;"  @click="new_btn">新增模板</el-button> 
        <el-button type="primary" style="margin-left:20px;"  @click="del_btn">批量删除</el-button>
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> 
    </div>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
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
    export default {
        name: "topicSub",
        components: {
            mTable
        },
        props: {},
        data() {
            return {
                 activeName: "tabs-look",
                 delArray:[],
                searchData:{},
                tableData: [
                    // {mc:'ming',qcTime:'12号',ren:'联系人',tel:'139211'}
                ],
                options: [{
                   
          value: '选项1',
          label: '会议单模板'
        }, {
          value: '选项2',
          label: '议题模板'
        },{
          value: '选项3',
          label: '请假单模板'
        },{
          value: '选项4',
          label: '联系单模板'
        }  
        ],
                
                pagination: {
                    pageNum: 1,
                    pageSize:10                   
                },
              
                value1: "",
                deleteArry:''
            }
        },
        computed: {},
        methods: {                      
             select(row) {},
            loadData() {
                // this.searchData.type = this.type
                this.$api.secreatary.meeting.getTopicList(
                    {ytStatus:this.ytStatus},
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,
                    }

                ).then(res => {
                    this.pagination.total = res.total
                    res.data.map(item=>{
                        item.qcTime=formatData(item.qcTime,'YYYY-MM-DD')
                        item.sbSj=formatData(item.sbSj,'YYYY-MM-DD')
                        item.backTime=formatData(item.backTime,'YYYY-MM-DD')
                    })
                    this.tableData = res.data                
                })
            },
            new_btn(){
               
                this.$router.push({
                    path:'/secretary/presidentMeeting/meetMange/newModel',
                    query: {}
                    // query: {rowData: JSON.stringify(row)}
                })
            },
            del_btn(){
                // this.delArray=
            }
         
                   
        },     
        activated() {
        },
        mounted() {
        },
        created() {
            this.loadData()
           
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>


