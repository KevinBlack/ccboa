<template>
    <div class="zfTwo">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>选择议题</span>
      </div>
      <div class="right">
      <el-button @click="$router.back()">关闭</el-button>
      <el-button @click="submit">确定</el-button>
     </div>
    </div>
     <div style="margin: 15px 0">     
        <el-row :span="24">
            <el-col :span="5">
            <el-date-picker
                v-model="value1"
                type="year"
                @change='changeYear'
                placeholder="2020">                
            </el-date-picker>
            </el-col> 
            <el-col :span="5">
            <el-select v-model="value" placeholder="请选择">               
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
            </el-select>
            </el-col>                                      
        </el-row>
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
<script>
 import mTable from '@/components/table/tTable'
export default {
    name:'newYt',
    components:{
       mTable 
    },
    data(){
        return{
            addArry:'',
            ytid:'',
            selectArray:[],
            isSubmit:'0',
            value: '',
            options: [{
            value: '选项1',
            label: '黄金糕'
        }],
            value1:"",
            tableData: [
                    // {bm:'bm',st:'st',mc:'ming',ren:'ren',phone:'1234',sj:'sj'}
                ],
                tableCols: [                  
                    {label: '序号', prop: 'deptName'},
                    {label: '主汇报部门', prop: 'deptName'},
                    {label: '上报时间', prop: 'sbSj'},           
                    {label: '议题名称', prop: 'ytMc'},
                    {label: '联系人', prop: 'curuserChinaName'},
                    {label: '联系电话', prop: 'tel'},
                  
                ],
                 pagination: {
                    pageNum: 1,
                    pageSize: 10
                },
                 searchData:{},
        }
    },
    methods:{
          changeYear(){
               let  year=this.value1.getFullYear().toString()
                this.$api.secreatary.meetings.yearSelect(
                    {curYear:year},
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,
                    }
                ).then(res => {
                    this.pagination.total = res.total    
                      res.data&&res.data.map(item=>{
                        item.sbSj=formatData(item.sbSj,'YYYY-MM-DD')
                    })
                    this.tableData = res.data
                })
             },
             loadDepart(){
                this.$api.secreatary.meetings.weiDepart().then(
                    res=>{
                        console.log(res)
                    }
                )
             },
         loadData() {
                this.$api.secreatary.meetings.getTopicList(
                    {isSubmit:this.isSubmit},
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,
                    }

                ).then(res => {
                    this.pagination.total = res.total
                     res.data&&res.data.map(item=>{                                               
                        item.sbSj=formatData(item.sbSj,'YYYY-MM-DD')
                        // this.selectArray.push(item.deptName)                      
                    })
                    this.tableData = res.data
                    // console.log(this.selectArray)
                  
                })
            },
         submit() {       
             let row={}
             row.type = 3    
             // this.searchData.type = this.type
                this.$api.secreatary.meetings.newYiti(
                    {   id:this.ytid,
                        ytIds: this.addArry,
                    }                  
                ).then(res => { 
                    // this.opinionFldData=res.data
                    // this.tableData=res.data
                    })
                    this.$router.push(
                        {path:'/secretary/presidentMeeting/conferList/conferDetail',
                        query:{rowData:JSON.stringify(row)}
                        }
                      
                    )                                 
            },
            cellClick(row) {},
            select(row) {
                let dataArry = []
                console.log('rrrrrrrrrrrrrrrrrrrrrrr',row)
                row.map(function (value, index) {
                dataArry.push(value.id)
                })
                console.log('-------------111111111111111---------------',dataArry)
                this.addArry = dataArry.join(',')
                console.log('-------------222222222222222---------------',this.addArry)
            },           
    },
    created(){
        this.ytid=JSON.parse(this.$route.query.zbid)
        this.loadData()
        // console.log(this.$route.query.zbid)

    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.zfTwo {
  background: white;
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
  }}
</style>
