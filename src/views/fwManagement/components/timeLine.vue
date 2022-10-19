<template>
  <div class="line_warp">
    <el-dialog title="查看流程" :visible.sync="subdialogVisible" @close="cancelSetDialog" width="70%">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="图形模式" name="line">
          <el-timeline :reverse= 'true' class="timeline">
    <el-timeline-item
      v-for="(activity, index) in lineData"
      :key="index"
      :icon="activity.icon"
      :size="activity.size"
       :color="activity.color"
      :timestamp="activity.completeTime"
      placement='top'>
      <el-card>
        <h4>{{activity.nodeName}}</h4>
        <p>{{activity.operatorName}}</p>
        <p>{{activity.operation}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
        </el-tab-pane>
        <el-tab-pane label="列表模式" name="table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width:80%;margin:0 auto"
            class="scroll"
            height="400"
          >
            <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
            <el-table-column prop="nodeName" label="处理环节"></el-table-column>
            <el-table-column prop="operatorName" label="处理人"></el-table-column>
            <el-table-column prop="completeTime" label="操作时间"></el-table-column>
            <el-table-column prop="operation" label="处理记录"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSetDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:['processInstId','historyTradeCode'],
  data() {
    return {
      activeName: "line",
      subdialogVisible: true,
      getHistoryActInfo_params:{
        function:"getHistoryActInfo",
        processInstId:''
      },
      AddgetHistoryActInfo_params:{
        function:"getHistoryActInfo",
      },
      tableData: [],
      lineData: []
    };
  },
//   el-icon-s-flag  el-icon-circle-check
  created(){
    this.getHistoryActInfoData().then(()=>{
      if(this.lineData.length>0){
        this.lineData.forEach((item,index) => {
        item.icon = 'el-icon-check'
        item.size = 'large'
        item.color = '#409EFF'
      })
      let len = this.lineData.length
    //   this.lineData[len-1].icon = 'el-icon-s-flag'
      this.lineData[len-1].color = '#666666'
      }  
    })
  },
  methods: {
    handleClick() {},
    getHistoryActInfoData(){
      return new Promise((reslove,reject) => {
        let params;
        if(this.processInstId!=undefined && this.processInstId!=''){
          this.getHistoryActInfo_params.processInstId = this.processInstId
           params = this.getHistoryActInfo_params
        }else{
           params = this.AddgetHistoryActInfo_params
        } 
       this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(params),
          this.historyTradeCode
        )
        .then(res => {
          console.log(res)
          this.lineData = res.data
          this.tableData = res.data
          reslove(this)
        })
        .catch(err => {
          console.log(err);
        });
      })
    },
    cancelSetDialog(){
      this.$emit('subTimeLine')
    }
  }
};
</script>

<style lang='less' scoped>
.timeline{
  min-height: 400px;
}
.line_warp .el-card .el-card__body h4 {
  margin-bottom: 10px;
  color: #333333;
  font-size: 18px;
}
.line_warp .el-card .el-card__body p {
  margin-bottom: 10px;
  color: #333333;
  font-size: 14px;
  color: #666;
}
.line_warp .el-timeline{
    width: 60%;
    margin: 0 auto;
}
/deep/.el-timeline-item__node--large{
        left: -4px;
    width: 20px;
    height: 20px;
}
/deep/.el-timeline-item__icon{
    font-size: 16px;
}
</style>