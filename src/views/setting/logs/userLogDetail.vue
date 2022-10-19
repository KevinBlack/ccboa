/**
* create by zyt on 2022-7-18 13:40
* 类注释：
* 备注：
*/
<template>
  <div class="selectCollectLogs">
    <div class="formHeader">
      <div class="title-text">注销用户日志</div>
    </div>
    <!-- <el-descriptions
        size="medium"
        label-class-name="description"
        :contentStyle="{ 'text-align': 'center' }"
        :labelStyle="{ 'text-align': 'center' }"
        :column="3"
        border
      >
        <el-descriptions-item label="机构名称">{{
          fromData.unitName
        }}</el-descriptions-item>
        <el-descriptions-item label="部门名称">{{
          fromData.organName
        }}</el-descriptions-item>
        <el-descriptions-item label="部门ID">{{
          fromData.organId
        }}</el-descriptions-item>
        <el-descriptions-item label="注销用户">{{
          fromData.humanName
        }}</el-descriptions-item>
        <el-descriptions-item label="操作人">{{
          fromData.operator
        }}</el-descriptions-item>
        <el-descriptions-item label="注销时间">{{
          fromData.cancelTime
        }}</el-descriptions-item>
        <el-descriptions-item label="客户端IP">{{
          fromData.clientIp
        }}</el-descriptions-item>
        <el-descriptions-item label="日志内容">{{
          fromData.content
        }}</el-descriptions-item>
      </el-descriptions> -->
    <div class="table">
      <table
        align="center"
        width="100%"
        style="text-align: center"
      >
        <thead></thead>
        <tbody>
          <tr hight="50px">
            <td class="tdstyle">机构名称</td>
            <td class="tdstyle">{{ fromData.unitName }}</td>
            <td class="tdstyle">部门名称</td>
            <td class="tdstyle">{{ fromData.organName }}</td>
            <td class="tdstyle">部门ID</td>
            <td class="tdstyle">{{ fromData.organId }}</td>
          </tr>
          <tr hight="50px">
            <td class="tdstyle">注销用户</td>
            <td class="tdstyle">{{ fromData.humanName }}</td>
            <td class="tdstyle">操作人</td>
            <td class="tdstyle">{{ fromData.operator }}</td>
            <td class="tdstyle">注销时间</td>
            <td class="tdstyle">{{ fromData.cancelTime }}</td>
          </tr>
          <tr hight="50px">
            <td class="tdstyle">客户端IP</td>
            <td class="tdstyle">{{ fromData.clientIp }}</td>
            <td class="tdstyle">日志内容</td>
            <td colspan="3">{{ fromData.content }}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "userLogDetail",
  components: {},
  props: {},
  data() {
    return {
      fromData: {},
    };
  },
  computed: {},
  methods: {},
  activated() {},
  mounted() {},
  created() {
    this.fromData = JSON.parse(this.$route.query.rowData);
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.selectCollectLogs {
  .formHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
}
.arrowup {
  margin-top: 10px;
}
.description {
  padding: 40px;
}
/deep/.el-descriptions .is-bordered {
  margin-top: 70px;
}
.table {
  margin-top: 60px;
  padding: 0 50px;
  box-sizing: border-box;
  color: #000;
  font-weight: 400;
  font-family: Microsoft Yahei, SimSun, Arial, Helvetica, sans-serif;
  font-size: 16px;
  border: none !important;
}
// table {
//   border-collapse: separate !important;
// }
.tdstyle {
  width: 16.6%;
}
.table tr td{
  height: 50px;
  line-height: 50px;
  border: 1px solid #e4e7ed !important;
}
// /deep/.el-descriptions .is-bordered .el-descriptions-item__cell {
//   font-family: Microsoft Yahei, SimSun, Arial, Helvetica, sans-serif;
//   border: 2px solid #e4e7ed;
//   font-size: 16px;
//   color: #000;
//   font-weight: 400;
// }
/deep/.el-descriptions__body {
  margin: 0 50px;
}
/deep/ .el-descriptions .is-bordered .el-descriptions-item__cell {
  max-width: 180px;
}
// .button{
//   margin-right: 50px;
// }
</style>
