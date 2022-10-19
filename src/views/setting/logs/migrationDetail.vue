/**
* create by zyt on 2022-7-18 13:40
* 类注释：
* 备注：
*/
<template>
  <div class="selectCollectLogs">
    <div class="formHeader">
      <div class="title-text">数据迁移日志</div>
    </div>
    <!-- <div>
      <el-descriptions
        size="medium"
        label-class-name="description"
        :contentStyle="{ 'text-align': 'center' }"
        :labelStyle="{ 'text-align': 'center' }"
        :column="3"
        border
      >
        <el-descriptions-item label="机构名称">{{
          fromData.originUnitName
        }}</el-descriptions-item>
        <el-descriptions-item label="部门名称">{{
          fromData.originOrganName
        }}</el-descriptions-item>
        <el-descriptions-item label="部门ID">{{
          fromData.originOrganId
        }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{
          fromData.originHumanName
        }}</el-descriptions-item>
        <el-descriptions-item label="用户ID">{{
          fromData.originHumanId
        }}</el-descriptions-item>
        <el-descriptions-item label="文件类型">{{
          fromData.dataType
        }}</el-descriptions-item>
        <el-descriptions-item label="文件编号">{{
          fromData.documentNo
        }}</el-descriptions-item>
        <el-descriptions-item label="文件ID">{{
          fromData.dataId
        }}</el-descriptions-item>
        <el-descriptions-item label="文件标题">{{
          fromData.dataTitle
        }}</el-descriptions-item>
        <el-descriptions-item label="文件接收人">{{
          fromData.currentHumanName
        }}</el-descriptions-item>
        <el-descriptions-item label="文件接收人ID">{{
          fromData.currentHumanId
        }}</el-descriptions-item>
        <el-descriptions-item label="迁移时间">{{
          fromData.transferTime
        }}</el-descriptions-item>
        <el-descriptions-item label="日志内容">{{
          fromData.content
        }}</el-descriptions-item>
      </el-descriptions>
    </div> -->
    <div class="table">
      <table align="center" width="100%" style="text-align: center">
        <thead></thead>
        <tbody>
          <tr hight="50px">
            <td class="thstyle">机构名称</td>
            <td class="tdstyle">{{ fromData.originUnitName }}</td>
            <td class="thstyle">部门名称</td>
            <td class="tdstyle">{{ fromData.originOrganName }}</td>
            <td class="thstyle">部门ID</td>
            <td class="tdstyle">{{ fromData.originOrganId }}</td>
          </tr>
          <tr hight="50px">
            <td class="thstyle">用户名</td>
            <td class="tdstyle">{{ fromData.originHumanName }}</td>
            <td class="thstyle">用户ID</td>
            <td class="tdstyle">{{ fromData.originHumanId }}</td>
            <td class="thstyle">文件类型</td>
            <td class="tdstyle">{{ fromData.dataType }}</td>
          </tr>
          <tr hight="50px">
            <td class="thstyle">文件编号</td>
            <td class="tdstyle">{{ fromData.documentNo }}</td>
            <td class="thstyle">文件ID</td>
            <td class="tdstyle">{{ fromData.dataId }}</td>
            <td class="thstyle">文件标题</td>
            <td class="tdstyle">{{ fromData.dataTitle }}</td>
          </tr>
          <tr hight="50px">
            <td class="thstyle">文件接收人</td>
            <td class="tdstyle">{{ fromData.currentHumanName }}</td>
            <td class="thstyle">文件接收人ID</td>
            <td class="tdstyle">{{ fromData.currentHumanId }}</td>
            <td class="thstyle">迁移时间</td>
            <td class="tdstyle">{{ fromData.transferTime }}</td>
          </tr>
          <tr hight="50px">
            <td class="thstyle">日志内容</td>
            <td colspan="5">{{ fromData.content }}</td>
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
.thstyle {
  width: 12%;
}
.tdstyle{
  width: 21.3%;
}
.table tr td {
  height: 50px;
  line-height: 50px;
  border: 1px solid #e4e7ed !important;
}
/deep/.el-descriptions .is-bordered .el-descriptions-item__cell {
  font-family: Microsoft Yahei, SimSun, Arial, Helvetica, sans-serif;
  border: 2px solid #e4e7ed;
  font-size: 16px;
  color: #000;
  font-weight: 400;
}
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
