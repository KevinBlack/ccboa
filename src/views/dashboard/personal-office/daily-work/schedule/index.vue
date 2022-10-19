<!--
 * @Author: wy
 * @Date: 2020-07-20 17:22:38
 * @LastEditTime: 2020-07-21 10:52:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\schedule\index.vue
 type	对应查询范围
month	本月
preMonth	上一月
nextMonth	下一年

-->
<template>
  <div class="schedule">
    <div>
      <el-button type="primary" @click="toList">按条目显示</el-button>
      <el-button type="primary" @click="newProj()">新建</el-button>
    </div>
    <div>
      <div style="display:flex;justify-content: flex-end;align-items: center;font-size: 12px">
        <span style="color: red;padding-right: 5px">*</span>
        <span>表示当天已安排日程</span>
      </div>
      <el-calendar v-model="day" id="calendar">
        <template slot="dateCell" slot-scope="{date, data}">
          <div style="position: relative">
            <p style="text-align: center;height: 100%;">{{ data.day.split('-')[2] }}</p>
            <div v-for="(dayWork, index) in dayWorks" :key="index" style="position: absolute;width: 100%;left: 6px; top: 0;z-index:1;">
              <div v-if="dayWork.hyDsj === data.day">
                <el-tooltip  placement="right" effect="light">
                  <p style="text-align: center;height: 100%;" @click="toDetail(data)">
                    <span>{{ data.day.split('-')[2] }}</span>
                    <span style="color: red; padding-left: 5px">*</span>
                  </p>
                  <div slot="content">
                    <div v-for="(item,i) in dayWork.content" :key="i" style="padding-bottom: 5px" >
                      <p style="padding: 2px 0;">时间：{{ item.hyDsd }}</p>
                      <p style="padding: 2px 0;">地点：{{item.hyDdd}}</p>
                      <p style="padding: 2px 0;">主题：{{item.hyDzt }}</p>
                      <p style="padding: 2px 0;">参加人员:{{item.hyDry }}</p>
                    </div>
                  </div>
                </el-tooltip>
              </div>
              <div v-else></div>
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'schedule',
    components: {},
    data() {
      return {
        range: [formatData(new Date().getTime(), "YYYY-MM") + "01", formatData(new Date().getTime(), "YYYY-MM") + '30'],
        day: '',
        dayWorks: [],
        dayWorks1: [
          { date: '2020-12-01',hyDsd: '10:00', hyDzt: '开会', hyDdd: '123', hyDry: '1,2,3,4,5,6'},
          { date: '2020-12-01',hyDsd: '12:00', hyDzt: '开会', hyDdd: '123', hyDry: '1,2,3,4,5,6'}
        ],
        dayList: [],
      }
    },
    watch: {
      // day(val) {
      //   this.dayWork = {};
      //   this.setToday(formatData(val.getTime(), "YYYY-MM-DD"));
      // },
    },
    methods: {
      newProj() {
        this.$router.push({path: '/dashboard/personalOffice/dailyWork/schedule/newSchedule'})
      },
      toList() {
        this.$router.push('/dashboard/personalOffice/dailyWork/scheduleList')
      },
      toDetail(data) {
        this.$router.push({path: '/dashboard/personalOffice/dailyWork/schedule/scheduleDetail', query: {day: data.day}})
      },
      weekView(type) {
        switch (type) {
          case "week":
            this.range = [this.getTime(0), this.getTime(-6)]
            break
          case "twoWeek":
            this.range = [this.getTime(0), this.getTime(-13)]
            break
          case "month":
            this.day = new Date();
            this.range = [formatData(new Date().getTime(), "YYYY-MM") + "-01", formatData(new Date().getTime(), "YYYY-MM") + '-28']
            break
        }
      },

      getTime(n) {
        let now = new Date();
        let day = now.getDay(); //返回星期几的某一天;
        n = day == 0 ? n + 6 : n + (day - 1);
        now.setDate(now.getDate() - n);
        let year = now.getFullYear();
        let date = now.getDate();
        let month = now.getMonth() + 1;
        let daytext = year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (date < 10 ? ("0" + date) : date)
        return daytext
      },
      setToday(day) {
        for (let i = 0; i < this.dayList.length; i++) {
          if (day == this.dayList[i].hyDsj) {
            this.dayWork = this.dayList[i]
            break
          }
        }
        console.log(this.dayWork)
      },
      // 将相同日期的数组合并
      changeData(arr) {
        let newArr = arr.reduce((init,item)=>{
          let {hyDsj} = item
          let index = init.findIndex(v=>v.hyDsj===hyDsj)
          if(index>-1){
            init[index].content.push(item)
            return init
          } else {
            init.push({hyDsj:hyDsj,content:[item]})
            return init
          }
        },[])
        return newArr
      },
      async loadData(type, curDate) {
        let res = await this.$api.dailyWork.newSchedule({
          draftUserId: "1",
          type: type,
          curDate: curDate //formatData(new Date(this.day).getTime())
        })
        this.dayList = res.data
        this.dayWorks = this.changeData(res.data)
        console.log(this.dayWorks)
      },
      async dealMyDate(v) {
        // console.log(v)
        this.$nextTick(() => {
          console.log(this.dayWorks)
          let len = this.dayWorks.length
          let res = []
          // debugger
          for(let i=0; i<len; i++){
            if(this.dayWorks[i].date == v) {
              res = this.dayWorks[i].content
              break
            }
          }
          return res
        })

      }
    },
    created() {
      this.$nextTick(() => {
        // 点击前一个月
        let prevBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(1)"
        );
        prevBtn.addEventListener("click", e => {
          const curDay = formatData(new Date(this.day).getTime(), 'YYYY-MM-DD')
          this.loadData('month', curDay);
        });
        //点击下一个月
        let nextBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(3)"
        );
        nextBtn.addEventListener("click", () => {
          const curDay = formatData(new Date(this.day).getTime(), 'YYYY-MM-DD')
          console.log(curDay)
          this.loadData('month', curDay);
        });

        //点击今天
        let todayBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(2)"
        );
        todayBtn.addEventListener("click", () => {
          this.loadData('month', formatData(new Date().getTime(), 'YYYY-MM-DD'));
          // this.$notify.info({
          //   title: "今天",
          //   message: "今天：" + formatData(new Date(this.day).getTime(), 'YYYY-MM-DD'),
          //   position: "top-left"
          // });
        });
      });
      this.loadData('month', formatData(new Date().getTime(), 'YYYY-MM-DD'));
    },
    mounted() {
      // this.changeData()
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  /*.el-calendar__button-group {*/
  /*display: none;*/
  /*}*/

  /*.prev, .next {*/
  /*visibility: hidden;*/
  /*}*/

  .schedule {
    .el-calendar {
      .el-calendar-table .el-calendar-day {
        padding: 0;
        height: 50px;
        line-height: 50px;
      }
    }
  }
  .content{
    .contentItem{
      border-bottom: 1px solid #ccc;
      &:last-child{
        border: none;
      }
      p{
        padding: 4px 0;
      }
    }
  }
</style>
