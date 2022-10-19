<!--
 * @Author: your name
 * @Date: 2020-08-07 15:29:20
 * @LastEditTime: 2020-08-08 10:36:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\approval\checkLz.vue
-->
<template>
  <div class="checkLz">
    <el-tabs>
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="待办"></el-tab-pane>
      <el-tab-pane label="已办"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
      <el-col class="mt20end">
        <router-link
          tag="a"
          target="_blank"
          :to="{name:'approvalDetail'}"
          class="btn-writeEnDspc"
        >起草
        </router-link>
        <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
        <fd-form
          ref="fd"
          style="margin:16px 0"
          :data="formData"
          :columns="formCfg"
          @event="itemClick"
        ></fd-form>
      </el-col>
    </el-tabs>
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
    import FdForm from 'vue-elementui-freedomen/components/form'
    export default {
        name: "checkLz",
        components: {
            mTable,
            FdForm
        },
        props: {},
        data() {
            return {
                searchData:{},
                tableData: [
                    {
                        ApplyTime:'1',
                        approveNo:'1',
                        applyNo:'1',
                        draftDepartment:'1',
                        title:'1',
                        currentNode:'1',
                        currentUser:'1',

                    }
                ],
                tableCols: [
                    {label: '申请时间', prop: 'ApplyTime'},
                    {label: '审批编号', prop: 'approveNo'},
                    {label: '申请编号', prop: 'applyNo'},
                    {label: '申请单位', prop: 'draftDepartment'},
                    {label: '标题', prop: 'title'},
                    {label: '当前环节', prop: 'currentNode'},
                    {label: '操作人', prop: 'currentUser'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10
                },
                options: [],
                value1: "",
                deleteArry:'',
                formData:{
                    khType:'0'
                },
                formCfg:[
                    {type:'radios',prop:'khType',label:'是否跨行',options:{0:"非跨行",1:"跨行(本级行)",2:'跨行（下级行上报）'}}
                ]
            }
        },
        computed: {},
        methods: {
            loadData() {
                this.$api.checkLz.checkLzAllTable(
                    {...this.formData,...this.searchData},
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: 10
                    }
                ).then(res => {
                    this.pagination.total = res.total
                    this.tableData = res.data
                })
            },
            select(row) {
                let dataArry = []
                row.map(function (value, index) {
                    dataArry.push(value.id)
                })
                this.deleteArry = dataArry.join(",")
            },
            cellClick(row) {
                let rowData = JSON.stringify(row)
                this.$intent.goNewPage(this, {name: 'approvalDetail', query: {data: rowData, type: 'checkLz'}})
            },
            delete_btn(){
                this.$api.checkLz.checkLzDelete(
                    {id:this.deleteArry}
                ).then(res => {
                    if(res.code=="SUCCESS"){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }

                    this.loadData()
                })
            },
            itemClick(params){
                if(params.prop=='khType'){
                    this.loadData()
                }
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
  .btn-writeEnDspc {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin-right: 10px;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

  .btn-writeEnDspc:hover {
    background: #66b1ff;
    border-color: #66b1ff;
  }

  .mt20end {
    margin: 20px 0;
  }
</style>


