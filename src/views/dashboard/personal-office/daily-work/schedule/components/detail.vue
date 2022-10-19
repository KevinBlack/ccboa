<template>
    <div class="scheduleDetail">
      <el-button type="primary" @click="goBack" style="margin-bottom: 10px">返回上一页</el-button>
      <el-row :gutter="10">
        <el-col :span="12"  v-for="(item, index) in dayWorks" :key="index" class="content">
          <el-card class="box-card">
            <div>
              <p>时间：{{item.hyDsd}}</p>
              <p>地点：{{item.hyDdd}}</p>
              <p>主题：{{item.hyDzt}}</p>
              <p>参加人员:{{item.hyDry}}</p>
            </div>
            <div style="padding-top: 20px">
              <el-button type="primary" @click="toEdit(item)">编辑</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
</template>

<script>
    export default {
        name: "scheduleDetail",
      data() {
          return {
            dayWorks: [],
            // showLoading: false
          }
      },
      methods: {
        goBack() {
          this.$router.push('/dashboard/personalOffice/dailyWork/schedule')
        },
        loadData() {
          // this.showLoading = true
          this.$api.dailyWork.newScheduleList({
            hyDsj: this.$route.query.day
          }).then(res => {
            // this.showLoading = false
            if (res.code === 'SUCCESS') {
              this.dayWorks = res.data
            } else {
              // this.showLoading = false
              this.$message.error(res.message)
            }
          }).catch(() => {
            // this.showLoading = false
            console.log('error')
          })
        },
        toEdit(item) {
          this.$router.push({path: '/dashboard/personalOffice/dailyWork/schedule/newSchedule', query: {type: 'edit', workInfo: JSON.stringify(item)}})
        }
      },
      created() {
        this.loadData()
      }
    }
</script>

<style scoped lang="less">
.content{
  margin-bottom: 10px;
  .box-card{
    p{
      padding: 8px 0;
      font-size: 14px;
    }
  }
}
</style>
