/**
* create by zx on 2021/2/20 16:34
* 类注释：
* 备注：秘书
*/
<template>
  <div class="MishuActivity">
    <el-radio-group v-model="monthOrWeek" @change="change">
      <el-radio-button label="月"></el-radio-button>
      <el-radio-button label="周"></el-radio-button>
    </el-radio-group>
    <div style="display:flex;justify-content: flex-end;align-items: center;font-size: 12px">
      <span style="color: red;padding-right: 5px">*</span>
      <span>蓝色背景表示当天已安排日程(点击进入详情)</span>
    </div>
    <el-calendar v-if="monthOrWeek=='月'" v-model="day">

      <template slot="dateCell" slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">{{ data.day.split('-').slice(2).join('-') }}
          {{ data.isSelected ? '✔️' : ''}}</p>
        <div v-for="(dayWork, index) in calendarData" :key="index">
          <div v-if="dayWork.startDate === data.day">
            <el-tooltip class="item" effect="light" placement="top">
              <span class="everyDay" @click="toDetail(data)">
                {{ data.day.split('-').slice(2).join('-') }}
                <span :class="data.isSelected ? 'is-selected' : ''">{{ data.isSelected ? '✔️' : ''}}</span>
              </span>
              <div slot="content">
                <div v-for="(item,i) in dayWork.content" :key="i" style="padding-bottom: 5px">
                  <p style="padding: 2px 0;">时间：{{ item.startTime }}</p>
                  <p style="padding: 2px 0;">地点：{{item.activeAddress}}</p>
                </div>
              </div>
            </el-tooltip>
          </div>
          <div v-else>

          </div>
        </div>
      </template>
    </el-calendar>
    <div v-else>
      <div style="display: flex">
        <div style="flex:1"></div>
        <el-button v-for="(item,index) in buttonList" type="primary" @click="buttonClick(item)" :key="index" size="mini"
          style="margin-top: 20px">{{item}}</el-button>
      </div>

      <el-table :data="tableData" border style="width: 100%" id="table" @cell-click="btn">
        <el-table-column type="index" width="100" label="时间">
          <template slot-scope="scope">
            <span v-if="(scope.$index+8)<12">{{scope.$index+8}}AM</span>
            <span v-if="(scope.$index+8)>=12">{{scope.$index+8}}PM</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="item.weekName + '['+ item.weekDate +']'"
          v-for="(item,index) in weekDayList" :key="index" :prop="item.weekDate"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import exportTable from "@/minixs/exportTable";
export default {
  name: "MishuActivity",
  components: {},
  props: {},
  data () {
    return {
      day: new Date(),
      calendarData: [],
      buttonList: ["上一周", "本周", "下一周", "打印", "活动安排"],
      dayHourText: [
        "8AM",
        "9AM",
        "10AM",
        "11AM",
        "12AM",
        "1PM",
        "2PM",
        "3PM",
        "4PM",
        "5PM",
        "6PM",
        "7PM"
      ],
      weekDayText: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      tableData: [],
      monthOrWeek: "月",
      currentIndex: 0,
      weekDayList: []
    };
  },
  computed: {
    // brightDate() {
    //   let ary = [];
    //   for (let i in this.calendarData) {
    //     ary.push(this.calendarData[i].startDate);
    //   }
    //   return ary;
    // }
  },
  methods: {
    change (val) {
      this.calendarData = []

      console.log(this.weekDayList, "00000");
      if (val == "周") {
        this.loadData("weekDay", formatData(new Date().getTime(), "YYYY-MM-DD"));
      } else {
        this.loadData("month", formatData(new Date().getTime(), "YYYY-MM-DD"));
      }
    },
    handleDelete (a, b) {
      console.log(a, b);
    },
    // 获取周数据
    loadData (type, data) {
      this.$api.secreatary.activety
        .mishudata({
          type: type,
          dataTime: data
        })
        .then(res => {
          console.log(res, "yue");
          if (this.monthOrWeek == "月") {
            this.calendarData = this.changeData(res.data.list);
            console.log(this.calendarData, "$$$");
          } else if (this.monthOrWeek == "周") {
            this.weekDayList = res.data.list.title;
            this.tableData = res.data.list.content;
            console.log(res.data.list.content);
          }
        });
    },
    // 将相同日期的数组合并
    changeData (arr) {
      console.log(arr, '222')
      let newArr = arr.reduce((init, item) => {
        let { startDate } = item;
        let index = init.findIndex(v => v.startDate === startDate);
        if (index > -1) {
          init[index].content.push(item);
          return init;
        } else {
          init.push({ startDate: startDate, content: [item] });
          return init;
        }
      }, []);
      return newArr;
    },
    toDetail (i) {
      this.$intent.goNewPage(this, {
        path: "/secretary/leaderActivity/secretaryWorkArrange/milist",
        query: { day: i.day }
      });
    },
    content () {
      let content = "";
      this.calendarData.map((index, item) => {
        console.log(item);
        content;
      });

      return content;
    },
    getWeekDay (type) {
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
      console.log(this.weekDayList, "sss11");
      // 判断是月数据还是周数据
      if (this.monthOrWeek == "月") {
        this.loadData("month", formatData(new Date().getTime(), "YYYY-MM-DD"));
      } else {
        this.loadData("weekDay", this.weekDayList[0].day);

      }
    },
    getTime (n) {
      let now = new Date();
      let day = now.getDay(); //返回星期几的某一天;
      n = day == 0 ? n + 6 : n + (day - 1);
      now.setDate(now.getDate() - n);
      let year = now.getFullYear();
      let date = now.getDate();
      let month = now.getMonth() + 1;
      let daytext =
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (date < 10 ? "0" + date : date);
      return { day: daytext, weekText: this.weekDayText[now.getDay()] };
    },
    buttonClick (params) {
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
          exportTable.exportExcel("本周领导成员活动安排");
          break;
          case "活动安排":
          this.$intent.goNewPage(this, {
            path: "/secretary/leaderActivity/secretaryWorkArrange",
            query: {type:1}
          });
          break;
      }
    },
    btn (row, column, cell, event) {
      console.log("----------------------", row);
      console.log("----------------------", column);
      console.log("----------------------", cell);
      console.log("----------------------", event);
    }
  },
  activated () { },
  mounted () { },
  created () {
    this.getWeekDay();
    // console.log(this.content())

    // this.changeData(this.calendarData)
    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(1)"
      );
      prevBtn.addEventListener("click", e => {
        const curDay = formatData(new Date(this.day).getTime(), "YYYY-MM-DD");
        console.log(curDay, "前一个月");
        this.loadData("month", curDay);
      });
      //点击下一个月
      let nextBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(3)"
      );
      nextBtn.addEventListener("click", () => {
        const curDay = formatData(new Date(this.day).getTime(), "YYYY-MM-DD");
        this.loadData("month", curDay);

        console.log(curDay, "下一个月");
      });

      //点击今天
      let todayBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(2)"
      );
      todayBtn.addEventListener("click", () => {
        const curDay = formatData(new Date().getTime(), "YYYY-MM-DD");
        console.log(curDay, "今天");
        this.loadData("month", curDay);
      });
    });
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.is-selected {
  color: #f40;
}
.everyDay {
  display: inline-block;
  width: 120px;
  height: 70px;
  background-color: #409eff;
  color: #fff;
  // /* border-radius: 50%; */
  text-align: center;
  line-height: 70px;
  position: absolute;
  top: 8px;
}
.MishuActivity {
  margin: 20px 10%;
  .el-calendar-day {
    position: relative !important;
  }
  .header {
    font-size: 12px;
    margin-top: 20px;
    display: flex;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;

    .week-item-null {
      width: 100px;

      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
    }

    .week-item {
      flex: 1;
      border-right: 1px solid #eee;
    }
  }

  .message {
    line-height: 30px;

    .row {
      display: flex;

      .col-null {
        width: 100px;
        text-align: center;
        border-left: 1px solid #eee;
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;
      }

      .col {
        flex: 1;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
