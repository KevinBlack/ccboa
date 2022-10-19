<template>
  <div class="selfBankInfo">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <search-form
          ref="searchForm"
          :formData="formData"
          @reset="reset"
          class="mt20"
          @submit="submit"
          @event="btnEvent"
          :formCfg="formCfg">
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="查询日期">
              <el-date-picker
                v-model="formData.dataDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="-"
                style="width:100%"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
            </el-form-item>
          </el-col>
        </search-form>
        <m-table
          @refresh="loadData()"
          @cellClick="cellClick"
          @select="select"
          :searchData="searchData"
          size="medium"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :isSelection='true'
        ></m-table>
      </el-tab-pane>
      <el-tab-pane label="待办" name="toDo">
        <el-button type="primary" style="margin-left:20px;" @click="createBtn">新建</el-button>
<!--        <el-button type="danger" style="margin-left:20px;" @click="deleteBtn">删除</el-button>-->
        <div style="width:100%;height:20px;"></div>
        <div>
          <m-table
            @refresh="loadData()"
            @cellClick="cellClick"
            @select="select"
            :searchData="searchData"
            size="medium"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            :isSelection='true'
          ></m-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已办" name="Done">
        <div style="width:100%;height:20px;"></div>
        <div>
          <m-table
            @refresh="loadData()"
            @cellClick="cellClick"
            @select="select"
            :searchData="searchData"
            size="medium"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            :isSelection='true'
          ></m-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已发布" name="finish">
        <div style="width:100%;height:20px;"></div>
        <m-table
          @refresh="loadData()"
          @cellClick="finCellClick"
          @select="finSelect"
          :searchData="searchData"
          size="medium"
          :tableData="tableData"
          :tableCols="finTableCols"
          :pagination="pagination"
          :isSelection='true'
        ></m-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
    import mTable from 'components/table/tTable'
    import searchForm from "@/components/form/searchForm";
    import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
    export default {
        name: 'selfBankInfo',
        components: {
            mTable,
            searchForm
        },
        data() {
            return {
                formData:{

                },
                formCfg:[],
                listType:'0',
                tabName:'',
                activeName: 'toDo',
                deleteArry:'',
                keyword: '',
                tableData: [],
                searchData:{},
                finSearchData:{},
                tableCols: [
                    { label: '拟稿日期', prop: 'createDate' },
                    { label: '标题', prop: 'title' },
                    { label: '拟稿人', prop: 'draftUser' },
                ],
                finTableCols:[
                    { label: '发布日期', prop: 'publicDate' },
                    { label: '标题', prop: 'title' },
                    { label: '拟稿人', prop: 'draftUser' },
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize: 20
                },
            };
        },
         mixins: [bianhanPublic],
        created(){
            this.loadData(this.type)
            this.initData()
        },
        mounted(){
            this.$set(this.$refs.searchForm.fdFormData, 'isFbbz', '0')
        },
        methods: {
            initDate() {
                if (this.formData.dataDate) {
                    this.formData.createStartDate = this.formData.dataDate[0]
                    this.formData.createEndDate = this.formData.dataDate[1]
                }
            },
            initData() {
                this.formCfg=[
                    {type: 'radios', label: '信息状态', prop: 'isFbbz', options: {0: '未发布', 1: '发布'},rule:"must"},
                    [
                        {type: 'button-primary', prop: '$submit', value: '开始查询'},
                        {type: 'button', prop: '$reset', value: '重置'},
                        {type: 'formitem', style: {'text-align': 'center'}}
                    ],
                ]
            },
            loadData(){
                this.initDate()

                this.$api.messPub.MessTable(
                    {
                        ...this.formData,
                        listType:this.listType,
                        ...this.searchData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    }
                ).then(res => {
                    this.pagination.total = res.total
                    this.tableData = res.data
                })
            },


            //新建管理员设置
            createBtn() {
                this.$router.push('/dashboard/personalOffice/publishInfo/selfBankInfoPub')
            },
            //删除数据
            deleteBtn() {
                this.$api.messPub.BankMessDelete(
                    {
                        id:this.deleteArry
                    }
                ).then(res => {
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.loadData(this.type)
                })

            },
            cellClick (row) {
                if(this.activeName=='toDo'){
                    this.hasOpened(row.id,{
                        'name': "selfBankInfoPub",
                        'query': { id:row.id}
                    })
                    // this.$router.push({
                    //     path: '/dashboard/personalOffice/publishInfo/selfBankInfoPub',
                    //     query: {id:row.id}
                    // })
                }else if(this.activeName=='Done'){
                     this.$intent.goNewPage(this, {
                        name: "finselfBankInfoPub",
                        query: { id:row.id }
                    });
                    // this.$router.push({
                    //     path: '/dashboard/personalOffice/publishInfo/finselfBankInfoPub',
                    //     query: {id:row.id}
                    // })
                }else if(this.activeName=='all'){
                    switch (row.listType) {
                        //待办
                        case '0':
                            this.hasOpened(row.id,{
                                'name': "selfBankInfoPub",
                                'query': { id:row.id}
                             })
                            // this.$router.push({
                            //     path: '/dashboard/personalOffice/publishInfo/selfBankInfoPub',
                            //     query: {id:row.id}
                            // })
                            break
                        //已办
                        case '1':
                            this.$intent.goNewPage(this, {
                                name: "finselfBankInfoPub",
                                query: { id:row.id }
                            });                            
                            // this.$router.push({
                            //     path: '/dashboard/personalOffice/publishInfo/finselfBankInfoPub',
                            //     query: {id:row.id}
                            // })
                            break
                        //办结
                        case '2':
                            this.$intent.goNewPage(this, {
                                name: "selfinquireDeal",
                                 query: { id:row.id,isDle:true }
                            }); 
                            // this.$router.push({
                            //     path: '/dashboard/personalOffice/publishInfo/inquireDeal',
                            //     query: {id:row.id,isDle:true}
                            // })
                            break
                    }
                }else {
                    return
                }
            },
            //已发布跳详情
            finCellClick(row){
                            this.$intent.goNewPage(this, {
                                name: "selfinquireDeal",
                                 query: { id:row.id,isDle:true }
                            }); 
            //     this.$router.push({
            //     path: '/dashboard/personalOffice/publishInfo/inquireDeal',
            //     query: {id:row.id,isDle:true}
            // })
        },
            select(row) {
                let dataArry = []
                row.map(function (value, index) {
                    dataArry.push(value.id)
                })
                this.deleteArry = dataArry.join(",")
            },
            finSelect(){

            },
            handleClick(tab, event) {
                this.tabName=tab.name
                if (tab.name === 'toDo') {
                    this.activeName='toDo'
                    this.listType='0'
                    this.loadData(this.listType)
                } else if (tab.name === 'Done') {
                    this.activeName='Done'
                    this.listType='1'
                    this.loadData(this.listType)
                } else if(tab.name === 'all'){
                    this.activeName='all'
                    this.listType='3'
                    this.loadData(this.listType)
                }else if(tab.name === 'finish'){
                    this.activeName='finish'
                    this.listType='2'
                    this.loadData()
                }else{
                    return
                }
            },
            reset() {
                this.formData = {}
                this.$set(this.$refs.searchForm.fdFormData, 'isFbbz', '0')
                this.initData()
            },
            submit(params) {
                this.formData = params
                this.loadData()
            },
            btnEvent(){

            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .selfBankInfo {
    .noneRel {
      min-height: 61vh;
      margin-top: 100px;
      font-size: 28px;
      line-height: 50px;
      font-weight: 600;
      text-align: center;
    }
  }
</style>
