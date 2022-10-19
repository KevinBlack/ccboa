<template>
  <div>
    <el-dialog
      title="查看流程"
      :visible.sync="dialogVisible"
      v-dialogDrag>
      <div style="height:500px;">
      <el-tabs v-model="activeName" class="">
        <el-tab-pane label="列表模式" name="second" class="">
          <el-table border :data="tableData" class="scroll"  height="400">
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
        </el-tab-pane>
        <el-tab-pane label="图形模式" name="first" class="">
           <div class="block steps_w">
             <el-scrollbar style="height:100%;">
                <el-steps direction="vertical" description>
                  <el-step v-for="item in tableData" :key="item.nodeName">
                    <template slot="description">
                      <el-row class="step-self">
                        <el-row>
                          <el-col><h3>{{ item.nodeName }}</h3></el-col>
                        </el-row>
                        <el-row style="padding: 20px; background: #F2F6FC;">
                          <el-col :span="12" style="min-height:30px">{{ item.operation }}</el-col>
                          <el-col :span="12" style="text-align: right;">{{ item.operatorName }} {{ item.completeTime }}</el-col>
                        </el-row>
                      </el-row>
                    </template>
                  </el-step>
                </el-steps>
              </el-scrollbar>
              </div>
        </el-tab-pane>
      </el-tabs>
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
        { label: "处理环节", prop: "nodeName", align: "center" },
        { label: "处理人", prop: "operatorName", align: "center" },
        { label: "操作时间", prop: "completeTime", align: "center" },
        { label: "处理记录", prop: "operation", align: "center" },
      ],
      activeName: 'second',
      dialogVisible: true,
    }
  },
  methods: {
    handleClick(){
      
    },
    openDialog (){
      this.dialogVisible = true;
    }
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
