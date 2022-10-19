/**
* create by zx on 2020/7/23 14:45
* 类注释：
* 备注：
*/
<template>
  <div class="topManagerActivity">
    <div class="formHeader">
      <div class="title-text">本周高管成员活动安排</div>
    </div>
    <div class="message">
      <div style="display: flex">
        <div style="flex:1"></div>
        <el-button
          v-for="(item,index) in buttonList"
          type="primary"
          @click="buttonClick(item)"
          :key="index"
          size="mini"
        >{{item}}</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top:20px;"
        id="table"
        @row-click="openDetails"
      >
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small">{{scope.row.weekName}}</el-button>
            <el-button type="text" size="small">{{scope.row.weekDate}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="内容">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.content" :key="index">
              <span>时间：{{item.startTime}} - {{item.endTime}}</span><span v-html="'&emsp;&emsp;'"></span>
              <span>地点：{{item.activeAddress}}</span><span v-html="'&emsp;&emsp;'"></span>
              <span>名称：{{item.title}}</span><span v-html="'&emsp;&emsp;'"></span>
              <span>出席人员：{{item.currentLeaderCn1}}</span>
              <br>
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column   label="操作">
          <template slot-scope="scope">
            <button @click="btn(scope.row,scope.$index)">编辑</button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
import exportTable from "@/minixs/exportTable";
export default {
  name: "topManagerActivity",
  components: {},
  props: {},
  data() {
    return {
      unitName: JSON.parse(localStorage.getItem("userInfo")).unitName,
      //列表中循环数据 后台获取
      tableData: [],
      currentIndex: 0,
      weekDayList: [],
      buttonList: [
        "上一周",
        "下一周",
        "本周",
        "打印",
        "全部日程",
        "我的日程",
        "新建活动"
      ],
      weekList: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ]
    };
  },
  computed: {},
  methods: {
    // 获取周数据
    loadData(type) {
      console.log(this.weekDayList[0]);
      console.log(this.weekDayList[6]);
      this.$api.secreatary.activety
        .gaoguanlist({
          type: type,
          dataTime: this.weekDayList[0]
        })
        .then(res => {
          console.log(res, "高管周数据");
          res.data.list.forEach(item=>{
            // 处理后台返回值中带#的字段
            item.content.forEach(item1=>{
              if(item1.currentLeaderCn) {
                console.log(item1,'1243')
                item1.currentLeaderCn1 = item1.currentLeaderCn.split('#')
                let r = item1.currentLeaderCn1.filter(data=>{
                  return data && data.trim()
                })
                item1.currentLeaderCn1 = r.join(',')
              }
              if(!item1.currentLeaderCn) {
                item1.currentLeaderCn1 = item1.currentLeaderEn.split('#')
                let r = item1.currentLeaderCn1.filter(data=>{
                  return data && data.trim()
                })
                item1.currentLeaderCn1 = r.join(',')
              }
            })

          })
          this.tableData = res.data.list;
          if (!res.data.list) {
            console.log(res.msg);
            this.$message({
              showClose: true,
              type: "warning",
              message: res.msg
            });
          }
          console.log("------>", this.weekDataList);
        });
    },
    //周数据跳转详情
    openDetails(row, event, column) {
      console.log(row);
      this.$intent.goNewPage(this, {
        path: "/secretary/leaderActivity/topManagerActivity/list",
        query: { day: row.weekDate }
      });
    },
    buttonClick(params) {
      switch (params) {
        case "上一周":
          this.getWeekDay("up");
          break;
        case "下一周":
          this.getWeekDay("next");
          break;
        case "本周":
          this.getWeekDay();
          break;
        case "打印":
          //导出
          exportTable.exportExcel("本周高管成员活动安排");
          break;
        case "全部日程":
          this.$intent.goNewPage(this, {
            path: "/secretary/leaderActivity/Galldata",
            query: { stausType: 0 }
          });
          break;
        case "我的日程":
          this.$intent.go(this, {
            path: "/secretary/leaderActivity/topmyActivity",
            query: { stausType: 0 }
          });
          break;
        case "新建活动":
          this.$intent.goNewPage(this, {
            path: "/secretary/leaderActivity/topTheform",
            query: { stausType: 0 }
          });
          break;
      }
    },
    getWeekDay(type) {
      if (type == "up") {
        this.currentIndex = this.currentIndex + 7;
      } else if (type == "next") {
        this.currentIndex = this.currentIndex - 7;
      } else {
        this.currentIndex = 0;
      }
      this.weekDayList = [];
      for (let i = this.currentIndex; i > this.currentIndex - 7; i--) {
        let data = this.getTime(i);
        this.weekDayList.push(data);
      }
      this.loadData("week");
    },
    getTime(n) {
      let now = new Date();
      let day = now.getDay(); //返回星期几的某一天;
      console.log(day + "1111111111");
      n = day == 0 ? n + 6 : n + (day - 1);
      now.setDate(now.getDate() - n);
      let year = now.getFullYear();
      let date = now.getDate();
      let month = now.getMonth() + 1;
      return (
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (date < 10 ? "0" + date : date)
      );
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.weekDay = this.getWeekDay();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
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

.message {
  margin: 10px 10%;

  .tables {
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;

    .line {
      display: flex;
      border-top: 1px solid #eee;
      line-height: 40px;

      .left {
        width: 150px;
        text-align: center;
        border-right: 1px solid #eee;
      }

      .right {
        margin-left: 20px;
        flex: 1;
      }
    }

    .line-item {
      line-height: 25px;
      font-size: 13px;
    }
  }
}
</style>
