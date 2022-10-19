<template>
  <div>
    <el-dialog
      title="退回原因"
      :visible.sync="dialogVisible">
      <div style="height:300px;">
        <el-table border :data="tableData" class="scroll"  height="299">
          <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
          <el-table-column v-for="item in tableCols"
                           :key="item.id"
                           :prop="item.prop"
                           :formatter="item.formatter"
                           :label="item.label"
                           :width="item.width"
                           align="center"
                           :render-header="item.require?renderHeader:null"
          ></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" type="primary" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default{
        props: {
            // 表格数据
            tableData: {type: Array, default: () => []},
            activities: {type: Array, default: () => []},
        },
        data() {
            return {
                tableCols:[
                    { label: "处理人", prop: "createUser", align: "center" },
                    { label: "操作时间", prop: "createTime", align: "center"},
                    { label: "退回原因", prop: "content", align: "center" },
                ],
                activeName: 'first',
                dialogVisible: true,
            }
        },
        methods: {
            handleClick(){
            },
            openDialog (){
                this.dialogVisible = true;
            }
        },
        created() {
            this.tableData&&this.tableData.map(item=>{
                item.TMS=formatBData(item.TMS)
            })
        }
    }
</script>

<style  lang="less" rel="stylesheet/less" scoped>

  .dialog-line{
    padding: 10px;
  }
  .scrollline{
    height:400px;
    overflow: hidden;
    overflow-y: visible;
  }
  .el-step.is-vertical{
    display: grid !important;
  }
  .step-self {
    width: 100%;
    margin-top: -30px !important;
    margin-left: 20px !important;
    margin-bottom: 20px !important;
    h3 {
      font-size: 16px;
      color: #409EFF;
      margin-bottom: 10px;
    }
    color: #000;
  }
  /deep/ .el-step__main{
    .el-step__description{
      padding-right: 10%;
    }
  }

  // .el-step__description {
  //   padding-right: 0 !important;
  // }
  .steps_w{
    height: 400px;
  }
</style>
