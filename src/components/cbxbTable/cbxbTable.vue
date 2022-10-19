<template>
  <div>
    <el-dialog
      title="查看子流程"
      :visible.sync="cbxbchakan">
    <el-table border :data='tableData1' class="scroll"  height="400">
    <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
    <el-table-column v-for="item in tableCols"
                        :key="item.id"
                        :prop="item.prop"
                        :formatter="item.formatter"
                        :label="item.label"
                        align="center"
                        ></el-table-column>
        </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" type="primary" @click="cbxbchakan = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default{
  props: {
    // 表格数据
    tableData1: {type: Array, default: () => []},
  },
  data() {
    return{
      tableCols:[{ label: "发送时间", prop: "TMS", align: "center" },
          { label: "部门", prop: "UNITNM", align: "center" },
          { label: "处理人", prop: "AVYEXCTRNM", align: "center" },
          { label: "完成时间", prop: "AVYEXCTRTM", align: "center" },
          { label: "状态", prop: "NODENAME", align: "center" },
        //   { label: "状态", prop: "NODENAME", align: "center",formatter(row){
        //       if(row.NODEID == 800){text='完成协办'}else{'正在协办'}
        //   }},
          ],
      cbxbchakan:false,
    }
  },
  methods: {
    handleClick(){
    },
    openDialog (){
      this.cbxbchakan = true;
    },
  },
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
.el-step__description {
  padding-right: 0 !important;
}
</style>
