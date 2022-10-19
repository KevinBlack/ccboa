<template>
  <div class="scheduleDetail">
    <el-button type="primary" @click="goBack" style="margin-bottom: 10px">返回上一页</el-button>
    <el-row :gutter="10" v-if="dayWorks.length>0">
      <el-col :span="12" v-for="(item, index) in dayWorks" :key="index" class="content">
        <el-card class="box-card">
          <div>
            <p>时间：{{item.startTime}} - {{item.endTime}}</p>
            <p>地点：{{item.activeAddress}}</p>
            <p>名称：{{item.title}}</p>
          </div>
          <div style="padding-top: 20px">
            <el-button type="primary" @click="toEdit(item.id)">编辑</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="dayWorks.length=='0'" style="text-align: center;">
        <el-col>{{time}} 暂无活动安排</el-col>
    </el-row>
  </div>
</template>

<script>
import bianhanPublic from "@/minixs/bianhan"; //引入用于调用hasOpened
export default {
  name: "scheduleDetail",
  mixins: [bianhanPublic],
  data() {
    return {
        time:this.$route.query.day,
      dayWorks: []
      // showLoading: false
    };
  },
  methods: {
    goBack() {
        // this.$router.push('/secretary/leaderActivity/partCommitteeActivity')
        this.$intent.closeWindow(this);
    },
    loadData() {
      // this.showLoading = true
      this.$api.secreatary.activety
        .Partylist({
          dataTime: this.$route.query.day,
          userId:this.$route.query.userId?this.$route.query.userId:''
        })
        .then(res => {
          console.log(res);
          // this.showLoading = false
          if (res.code === "SUCCESS") {
            this.dayWorks = res.data.list;
          } else {
            // this.showLoading = false
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          // this.showLoading = false
          console.log("error");
        });
    },
    toEdit(id) {
      this.hasOpened(id,{
            'path': "/secretary/leaderActivity/Newactivity",
            'query': { id: id}
          })
      // this.$intent.goNewPage(this, {
      //   path: "/secretary/leaderActivity/Newactivity",
      //   query: { id: id }
      // });
    }
  },
  created() {
    this.loadData();
  },
  mounted(){
    
  }
};
</script>

<style scoped lang="less">
.content {
  margin-bottom: 10px;
  .box-card {
    p {
      padding: 8px 0;
      font-size: 14px;
    }
  }
}
</style>
