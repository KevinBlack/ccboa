<template>
  <div>
    <el-dialog title="查看流程" 
      :append-to-body="true" 
      :visible.sync="dialogVisible" 
      :close-on-click-modal="true"
      width="40%" 
      class="waterFall">
        <m-table
            size="medium"
            height="350"
            :isSelection="false"
            :isIndex="true"
            :isPagination="false"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
          ></m-table>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
    import mTable from "components/table/mTable";

    export default {
        name: "waterFall",
        components: {
            mTable
        },
        props: {
            processInstId: {type: String, default: ""},
             // 表格数据
            closeHandler: {type: Boolean, default: false},
        },
        watch:{
          processInstId(val) {
            if(val){
              this.initData();
            }
          },
        },
        data() {
          return {
            dialogVisible: this.closeHandler,
            tableCols: [
                { label: "处理环节", prop: "NODE", align: "center" },
                { label: "处理人", prop: "EXCNM", align: "center" },
                { label: "开始时间", prop: "TMS", align: "center",
                  formatter(row){
                    if(row.TMS){
                      return formatData(row.TMS)
                    }else{
                      return ''
                    }
                  }
                },
                { label: "结束时间", prop: "TM", align: "center",
                  formatter(row){
                    if(row.TM){
                      return formatData(row.TM)
                    }else{
                      return ''
                    }
                  }
                },
                { label: "处理时长（天）", prop: "WTIME", align: "center" },
                // { label: "是否统计", prop: "WTIME", align: "center" },
            ],
            tableData:[]
          }
        },
        methods: {
          openDialog (){
            this.dialogVisible = true;
          },
          initData(){
             this.$post
            .postData(
            "getHistoryActInfo",
            JSON.stringify({function:"getHistoryActInfo",
            processInstId:this.processInstId}),
            this.$businessCode.xnkb
              ).then(res => {
                if (res && res.success) {
                  this.tableData = res.data 
                }
              })
          },
        },
        created() {
          this.initData();
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .waterFall{
    /deep/.el-dialog__header{
      background: #016a93;
    }
    /deep/.el-dialog__body{
      background: #016a93;
    }
    /deep/.el-table{
      background: #016a93;
    }
    /deep/ th{
      background: #016a93 !important;
      border: 1px solid white;
    }
    /deep/ td{
      background: #016a93 !important;
      border: 1px solid white;
    }
    /deep/ .cell{
      color: white;
    } 
  }

</style>
