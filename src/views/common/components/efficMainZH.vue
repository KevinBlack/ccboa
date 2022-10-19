<template>
  <div class="leftWrapper wh100">
    <div class="main">
      <el-row class="header" v-show="activeButton!='4'">
        <el-col :span="8" class="overView">
          平均处理天数
          <span class="inner">{{avgDays}}</span>天
        </el-col>
        <el-col :span="8" class="overView">
          同比
          <span class="inner">{{compareRate}}</span>
        </el-col>
        <el-col :span="8" class="overView">
          办结率
          <span class="inner">{{finishRate}}</span>
        </el-col>
      </el-row>
      <el-row class="header" v-show="activeButton=='4'">
        <el-col :span="12" class="overView">
          平均处理天数
          <span class="inner">{{avgDays}}</span>天
        </el-col>
        <el-col :span="12" class="overView">
          同比
          <span class="inner">{{compareRate}}</span>
        </el-col>
      </el-row>
      <el-row style="height:calc(100% - 70px)" v-show="activeButton!='4'">
        <el-col :span="12" class="h100">
          <el-row class="title">
            <el-col :span="16" class="label">办结率TOP5</el-col>
            <el-col :span="8" class="btn">
              <el-button type="plain" size="mini" id="top5TableBtn" @click="finishRateTable">查看全部</el-button>
            </el-col>
          </el-row>
          <el-row style="height:calc(100% - 40px); padding-top:5px;box-sizing:border-box; position:relative">
            <div class="wh100" id="BJLTOP5"></div>
            <div class="top5Table checkAll_wrapper" v-show="showTop5Table">
              <el-table :data="finishRateList" height="100%" :header-cell-style="{background:'#07628e', color:'#fff',border:'1px soild #ccc'}">
                <el-table-column show-overflow-tooltip width="50" type="index" align="center" label="排名"></el-table-column>
                <el-table-column show-overflow-tooltip prop="dept_name" label="部门" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="order_count" label="件数" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="bj_rate" label="办结率" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="getBhDetails(scope.row,'办结率')">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-row>
        </el-col>
        <el-col :span="12" class="h100">
          <el-row class="h100">
            <el-col :span="24" class="h50">
              <el-row class="title">
                <el-col :span="16" class="label">平均处理天数TOP5</el-col>
                <el-col :span="8" class="btn">
                  <el-button type="plain" size="mini" id="avgTableBtn" @click="checkAll_AVG">查看全部</el-button>
                </el-col>
              </el-row>
              <el-row style="height:calc(100% - 35px);position:relative">
                <div class="wh100" id="AVGTOP5"></div>
                <div class="avgTable checkAll_wrapper" v-show="showAVGTable">
                  <el-table :data="avgDataList" height="100%" :header-cell-style="{background:'#07628e', color:'#fff',border:'1px soild #ccc'}">
                    <el-table-column width="50" type="index" align="center" label="排名"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="deptName" label="部门" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="orderCount" label="件数" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="avgDay" label="平均处理天数" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="getBhDetails(scope.row,'平均处理天数')">查看详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-row>
            </el-col>
            <el-col :span="24" class="h50">
              <el-row class="title">
                <el-col :span="16" class="label">平均处理天数BOTTOM5</el-col>
              </el-row>
              <el-row style="height:calc(100% - 35px)">
                <div class="wh100" id="AVGBOTTOM5"></div>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="height:calc(100% - 70px)" v-show="activeButton=='4'">
        <el-col :span="24" class="h50">
          <el-row class="title">
            <el-col :span="16" class="label">平均办理天数TOP5</el-col>
            <el-col :span="8" class="btn">
              <el-button type="plain" size="mini" id="meetTableBtn" @click="checkAll_meet">查看全部</el-button>
            </el-col>
          </el-row>
          <el-row style="height:calc(100% - 40px); padding-top:5px;box-sizing:border-box; position:relative;">
            <div class="wh100" id="MEETAVGTOP5"></div>
            <div class="meetTable checkAll_wrapper" v-show="showMeetTable">
              <el-table :data="meetDataList" height="100%" :header-cell-style="{background:'#07628e', color:'#fff',border:'1px soild #ccc'}">
                <el-table-column width="50" type="index" align="center" label="排名"></el-table-column>
                <el-table-column show-overflow-tooltip prop="deptName" label="部门" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="orderCount" label="件数" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="avgDay" label="平均处理天数" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="getBhDetails(scope.row,'平均处理时间')">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-row>
        </el-col>
        <el-col :span="24" class="h50">
          <el-row class="title">
            <el-col :span="16" class="label">平均处理天数BOTTOM5</el-col>
          </el-row>
          <el-row style="height:calc(100% - 40px); padding-top:5px;box-sizing:border-box;">
            <div class="wh100" id="MEETAVGBOTTOM5"></div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="bottomBtn">
      <el-col :span="6" class="textLft">
        <div :class="{wholeXL:true,active:activeButton=='1'}" @click="bottomBtnChange('1')">
          <div class="wholeBG"></div>
        </div>
      </el-col>
      <el-col :span="6" class="textCenter">
        <div :class="{ownXL:true,active:activeButton=='2'}" @click="bottomBtnChange('2')">
          <div class="ownBG"></div>
        </div>
      </el-col>
      <el-col :span="6" class="textCenter">
        <div :class="{joinXL:true,active:activeButton=='3'}" @click="bottomBtnChange('3')">
          <div class="joinBG"></div>
        </div>
      </el-col>
      <el-col :span="6" class="textRight">
        <div :class="{meetXL:true,active:activeButton=='4'}" @click="bottomBtnChange('4')">
          <div class="meetBG"></div>
        </div>
      </el-col>
    </div>
    <el-dialog class="deepColor bhDetails" :visible.sync="bhDetailsAllShow" :modal-append-to-body="false" width="80%" :title="bhDetailsDialogTitle">
      <bhDetails v-if="bhDetailsAllShow" :processInstId="bhDetailsProcessInstIdRow" :isXieBan="isXieBan" :bhType="bhType" :postType="postType" ref="bhDetails"></bhDetails>
    </el-dialog>
    <img src="../../../assets/images/shuju.png" id="imageDom" style="display:none;">
    <img src="../../../assets/images/shuju3.png" id="imageDom_BJL" style="display:none;">
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import bhDetails from 'views/common/components/bhDetails';
export default {
  data() {
    return {
      postType: "1",
      bhType: '1',
      bhDetailsAllShow: false, //显示查看详情弹窗
      bhDetailsDialogTitle: '部门整体效率——办结率',//查看详情弹窗标题
      bhDetailsProcessInstIdRow: '',//
      isXieBan: false,
      showAVGTable: false,
      showTop5Table: false, // top5查看全部
      showMeetTable: false, // 会议纪要查看全部
      activeButton: "1", //1--部门整体效率；2-独立承办效率；3-协办效率；4-会议纪要效率
      BJLTOP5: "",
      AVGTOP5: "",
      AVGBOTTOM5: "",
      MEETAVGTOP5: "",
      MEETAVGBOTTOM5: "",
      imageDom: "",
      imageDom_BJL: "",
      finishRateList: [], //办结率数据列表
      avgDataList: [], //非会议平均处理天数列表数据
      top5List: [],  //top5数据列表
      AVGList: [],   //AVG数据列表
      meetDataList: [], //会议纪要效率列表
      avgDays: "",     //平均处理天数
      compareRate: "", //同比
      finishRate: "",  //办结率
    };
  },
  components: {
    bhDetails
  },
  computed: {
    ...mapGetters("efficiency", ["baseParams"])
  },
  methods: {
    initData() {
      let vm = this;
      switch (this.activeButton) {
        case "1":
          vm.getWholeData();
          break;
        case "2":
          vm.getOwnData();
          break;
        case "3":
          vm.getJoinData();
          break;
        case "4":
          vm.getMeetDataList();
          vm.getMeetAvg();
          break;
      };
    },
    getBhDetails(row, title) {
      let vm = this;
      this.bhDetailsProcessInstIdRow = row.dept_id;
      this.bhDetailsAllShow = true;
      switch (this.activeButton) {
        case "1":
          vm.bhDetailsDialogTitle = "部门整体效率——" + title;
          vm.isXieBan = false;
          vm.bhType = '1';
          break;
        case "2":
          vm.bhDetailsDialogTitle = "独立承办效率——" + title;
          vm.isXieBan = false;
          vm.bhType = '2';
          break;
        case "3":
          vm.bhDetailsDialogTitle = "协办效率——" + title;
          vm.isXieBan = true;
          vm.bhType = '3';
          break;
        case "4":
          vm.bhDetailsDialogTitle = "会议纪要效率——" + title;
          vm.isXieBan = false;
          vm.bhType = '4';
          break;
      };
      // this.$nextTick(() => {
      //   this.$refs.waterFall.openDialog();
      // });
    },
    bottomBtnChange(val) {
      let vm = this;
      this.activeButton = val;
      this.$nextTick(() => {
        this.initEcharts();
        this.initData();
      })
    },
    initEcharts() {
      if (this.$echarts) {
        if (this.activeButton == "4") {
          this.MEETAVGTOP5 = this.$echarts.init(document.querySelector("#MEETAVGTOP5"));
          this.MEETAVGBOTTOM5 = this.$echarts.init(document.querySelector("#MEETAVGBOTTOM5"));
        } else {
          this.BJLTOP5 = this.$echarts.init(document.querySelector("#BJLTOP5"));
          this.AVGTOP5 = this.$echarts.init(document.querySelector("#AVGTOP5"));
          this.AVGBOTTOM5 = this.$echarts.init(document.querySelector("#AVGBOTTOM5"));
        }
      }
    },
    initJblTop5(data) {
      let vm = this;
      let jblName = [];
      let jblValue = [];
      this.BJLTOP5.clear();
      vm.comLoad(this.BJLTOP5);
      for (var i = 0; i < data.length; i++) {
        jblValue.push(this.numFormater(data[i].bj_rate, "percent"));
        jblName.push(data[i].dept_name);
      }
      // jblValue = jblValue.reverse();
      let objData = array2obj(data, "dept_name");
      let optionData = getData(data);
      function array2obj(array, key) {
        var resObj = {};
        for (var i = 0; i < array.length; i++) {
          resObj[array[i][key]] = array[i];
        }
        return resObj;
      };
      function getData(data) {
        var res = {
          series: [],
          yAxis: []
        };
        for (var i = 0; i < data.length; i++) {
          var dataValue = vm.numFormater(data[i].bj_rate, "percent");
          res.series.push({
            name: "办结率",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [i * 15 + 10 + "%", i * 15 + 15 + "%"],
            center: ["50%", "41%"],
            label: {
              show: false
            },
            itemStyle: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              borderWidth: 5
            },
            data: [
              {
                value: dataValue,
                name: data[i].dept_name
              },
              {
                value: 100 - dataValue,
                name: "",
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                  borderWidth: 0
                },
                tooltip: {
                  show: false
                },
                hoverAnimation: false
              }
            ]
          });
        }
        return res;
      };
      let option = {
        legend: {
          show: true,
          top: "bottom",
          left: 'center',
          data: jblName,
          itemWidth: 15,
          itemHeight: 10,
          width: 50,
          icon: "circle",
          padding: [0, 15],
          formatter: function (name) {
            if (name.length > 5) {
              return vm.numFormater(objData[name].bj_rate, "percent") + "%  " + name.substring(0, 5) + "..."
            } else {
              return vm.numFormater(objData[name].bj_rate, "percent") + "%  " + name
            }
          },
          textStyle: {
            color: "rgba(255,255,255,1)"
          },
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{a}<br>{b}:{c}%"
        },
        color: ["#E92880", "#2F59FC", "#F8A106", "#45BBFE", "#14DFFB"],
        grid: {
          top: "7%",
          bottom: '62%',
          left: "50%",
          containLabel: false
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            inside: true,
            textStyle: {
              color: "#fff",
              fontSize: 10,
            },
            show: true
          },
        }],
        xAxis: [{
          show: false
        }],
        series: optionData.series,
      }
      this.BJLTOP5.setOption(option);
      this.BJLTOP5.hideLoading();
    },
    initAVGTOP5(target, data) {
      var vm = this;
      let bmxlTop5xAxisData = [];
      let bmxlTop5Data = [];
      vm.comLoad(target);
      target.clear();
      for (var i = 0; i < data.length; i++) {
        bmxlTop5xAxisData.push(data[i].deptName);
        bmxlTop5Data.push(vm.numFormater(data[i].avgDay));
      };
      let optionbmxlTop5 = {
        // tooltip: {
        //   show: true,
        //   formatter: function(params) {
        //     if (params.data) return params.deptName + '：' + vm.numFormater(params.avgDay) +"天"
        //   },
        // },
        tooltip: {
          show: true,
          formatter: function (data) {
            if (data) return data.name + '：' + vm.numFormater(data.data) + "天"
          },
        },
        xAxis: {
          data: bmxlTop5xAxisData,
          axisLabel: {
            textStyle: {
              color: '#98FAFC',
              align: 'center',
              fontSize: '11',
            },
            formatter: function (params) {
              if (params.length < 4) {
                return params
              } else if (4 <= params.length && params.length < 8) {
                return params.substring(0, 4) + "\n" + params.substring(4, params.length);
              } else {
                return params.substring(0, 4) + "\n" + params.substring(4, 7) + "...";
              }
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 28,
              color: {
                image: vm.activeButton == "4" ? vm.imageDom_BJL : vm.imageDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: 'repeat-y', // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              }
            },
          },
        },
        yAxis: {
          show: false
        },
        grid: {
          left: 30,
          top: 30,
          right: 40,
          bottom: 32
        },
        series: [
          {
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function (param) {
                  return ['{a|' + param.data + '}{b|天}'];
                },
                rich: {
                  a: {
                    color: '#FFD900',
                    fontSize: '13',
                    fontWeight: 'bold',
                  },
                  b: {
                    color: 'white',
                    fontSize: '11',
                  },
                }
              },
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new vm.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#18F5FF' },
                    { offset: 1, color: '#188df0' }
                  ]
                )
              },
            },
            data: bmxlTop5Data,
          }
        ]
      };
      target.setOption(optionbmxlTop5);
      target.hideLoading();
    },
    initAVGBOTTOM5(target, data) {
      var vm = this;
      let bmxlBottom5xAxisData = [];
      let bmxlBottom5Data = [];
      vm.comLoad(target);
      target.clear();
      for (var i = 0; i < data.length; i++) {
        bmxlBottom5xAxisData.push(data[i].deptName);
        bmxlBottom5Data.push(vm.numFormater(data[i].avgDay));
      };
      let optionbmxlBottom5 = {
        // tooltip: {
        //   show: true,
        //   formatter: function(params) {
        //     if (params.data) return params.deptName + '：' + vm.numFormater(params.avgDay) +"天"
        //   },
        // },
        tooltip: {
          show: true,
          formatter: function (data) {
            if (data) return data.name + '：' + vm.numFormater(data.data) + "天"
          },
        },
        xAxis: {
          data: bmxlBottom5xAxisData,
          axisLabel: {
            textStyle: {
              color: '#98FAFC',
              align: 'center',
              fontSize: '11',
            },
            formatter: function (params) {
              if (params.length < 4) {
                return params
              } else if (4 <= params.length && params.length < 8) {
                return params.substring(0, 4) + "\n" + params.substring(4, params.length);
              } else {
                return params.substring(0, 4) + "\n" + params.substring(4, 7) + "...";
              }
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 28,
              color: {
                image: vm.activeButton == "4" ? vm.imageDom_BJL : vm.imageDom,  // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: 'repeat-y', // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              }
            },
          },
        },
        yAxis: {
          show: false
        },
        grid: {
          left: 30,
          top: 30,
          right: 40,
          bottom: 32
        },
        series: [
          {
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function (param) {
                  return ['{a|' + param.data + '}{b|天}'];
                },
                rich: {
                  a: {
                    color: '#FFD900',
                    fontSize: '13',
                    fontWeight: 'bold',
                  },
                  b: {
                    color: 'white',
                    fontSize: '11',
                  },
                }
              },
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new vm.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#DC0F78' },
                    { offset: 1, color: '#0997F2' }
                  ]
                )
              },
            },
            data: bmxlBottom5Data,
          }
        ]
      };
      target.setOption(optionbmxlBottom5);
      target.hideLoading();
    },
    //会议纪要查看全部
    checkAll_meet() {
      //会议纪要效率查看全部
      this.showMeetTable = !this.showMeetTable;
      this.showTop5Table = this.showAVGTable = false;
      let vm = this;
      document.onclick = function (e) {
        let dom = $("#meetTableBtn");
        let wrapper = $(".meetTable");
        if (!dom.is(e.target) && dom.has(e.target).length === 0 && wrapper.has(e.target).length === 0) {
          vm.showMeetTable = false;
        }
      }
    },
    //办结率查看全部
    finishRateTable() {
      //top5查看全部
      this.showTop5Table = !this.showTop5Table;
      this.showAVGTable = this.showMeetTable = false;
      let vm = this;
      document.onclick = function (e) {
        let dom = $("#top5TableBtn");
        let wrapper = $(".top5Table");
        if (!dom.is(e.target) && dom.has(e.target).length === 0 && wrapper.has(e.target).length === 0) {
          vm.showTop5Table = false;
        }
      }
    },
    //平均处理天数查看全部
    checkAll_AVG() {
      //AVG查看全部
      this.showAVGTable = !this.showAVGTable;
      this.showTop5Table = this.showMeetTable = false;
      let vm = this;
      document.onclick = function (e) {
        let dom = $("#avgTableBtn");
        let wrapper = $(".avgTable");
        if (!dom.is(e.target) && dom.has(e.target).length === 0 && wrapper.has(e.target).length === 0) {
          vm.showAVGTable = false;
        }
      }
    },
    comLoad(eId) {
      eId.showLoading({
        text: "",
        color: "#4cbbff",
        textColor: "#4cbbff",
        maskColor: "rgba(0, 0, 0, 0.4)"
      });
    },
    //数字格式处理
    numFormater(num, type) {
      if (!!num || num === 0) {
        if (String(num).indexOf("%") > 0) {
          if (type === "percent") {
            num = num || "0.00%";
            num = num.substring(0, num.length - 1);
            num = Number(num);
          } else {
            num = (+num).toFixed(1);
            if (num.indexOf(".0") > 0) {
              num = Math.floor(num);
            }
          }
        }
        return num;
      } else {
        return "-";
      }
    },
    //加载echart背景图片
    initImageDom() {
      this.imageDom = document.querySelector("#imageDom");
      this.imageDom_BJL = document.querySelector("#imageDom_BJL");
    },
    echartsResize() {
      let vm = this;
      window.onresize = function () {
        if (vm.activeButton != "4") {
          vm.BJLTOP5.resize();
          vm.AVGTOP5.resize();
          vm.AVGBOTTOM5.resize();
        } else {
          vm.MEETAVGTOP5.resize();
          vm.MEETAVGBOTTOM5.resize();
        }
      }
    },
    //部门整体效率效能看板
    getWholeData() {
      let params = Object.assign({}, this.baseParams);
      params.function = "receiveDeptRate";
      this.$post.postData("receiveDeptRate", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if (res.success) {
          this.avgDays = res.data.avgWorkTime;
          this.compareRate = res.data.tb + "%";
          this.finishRate = res.data.totalBjRate + "%";
          this.finishRateList = [];
          let newFinishRateList = [];
          res.data.deptBjRate.map(item => {
            let obj = {};
            obj.dept_name = item.dept_name;
            obj.order_count = item.order_count + '件';
            obj.bj_rate = item.bj_rate + '%';
            obj.dept_id = item.dept_id;
            let newObj = {
              dept_name: item.dept_name,
              order_count: item.order_count,
              bj_rate: item.bj_rate,
            }
            this.finishRateList.push(obj);
            newFinishRateList.push(obj);
          })
          this.avgDataList = [];
          let newAvgDataList = [];
          res.data.deptAvgWorkTime.map(item => {
            let obj = {};
            obj.deptName = item.dept_name;
            obj.orderCount = item.order_count + '件';
            obj.avgDay = item.total_cost + '天';
            obj.dept_id = item.dept_id;
            this.avgDataList.push(obj);
            let newObj = {
              deptName: item.dept_name,
              orderCount: item.order_count,
              avgDay: item.total_cost,
            }
            newAvgDataList.push(newObj)
          })
          let finishRateTop5 = this.getTop5(newFinishRateList);
          let avgTop5 = this.getTop5(newAvgDataList);
          let avgBottom5 = this.getBottom5(newAvgDataList);
          this.initJblTop5(finishRateTop5);
          this.initAVGTOP5(this.AVGTOP5, avgTop5);
          this.initAVGBOTTOM5(this.AVGBOTTOM5, avgBottom5);
        }
      })
    },
    //独立承办效率效能看板
    getOwnData() {
      let params = Object.assign({}, this.baseParams);
      params.function = "receiveUntakeRate";
      this.$post.postData("receiveUntakeRate", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if (res.success) {
          this.avgDays = res.data.avgWorkTime;
          this.compareRate = res.data.tb + "%";
          this.finishRate = res.data.totalBjRate + "%";
          this.finishRateList = [];
          let newFinishRateList = [];
          res.data.deptBjRate.map(item => {
            let obj = {};
            obj.dept_name = item.dept_name;
            obj.order_count = item.order_count + '件';
            obj.bj_rate = item.bj_rate + '%';
            obj.dept_id = item.dept_id;
            let newObj = {
              dept_name: item.dept_name,
              order_count: item.order_count,
              bj_rate: item.bj_rate,
            }
            this.finishRateList.push(obj);
            newFinishRateList.push(newObj);
          })
          this.avgDataList = [];
          let newAvgDataList = [];
          res.data.deptAvgWorkTime.map(item => {
            let obj = {};
            obj.deptName = item.dept_name;
            obj.orderCount = item.order_count + '件';
            obj.avgDay = item.total_cost + '天';
            obj.dept_id = item.dept_id;
            this.avgDataList.push(obj);
            let newObj = {
              deptName: item.dept_name,
              orderCount: item.order_count,
              avgDay: item.total_cost,
            }
            newAvgDataList.push(newObj)
          })
          let finishRateTop5 = this.getTop5(newFinishRateList);
          let avgTop5 = this.getTop5(newAvgDataList);
          let avgBottom5 = this.getBottom5(newAvgDataList);
          this.initJblTop5(finishRateTop5);
          this.initAVGTOP5(this.AVGTOP5, avgTop5);
          this.initAVGBOTTOM5(this.AVGBOTTOM5, avgBottom5);
        }
      })
    },
    //协办效率效能看板
    getJoinData() {
      let params = Object.assign({}, this.baseParams);
      params.function = "receiveHelpRate";
      this.$post.postData("receiveHelpRate", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if (res.success) {
          this.avgDays = res.data.avgWorkTime;
          this.compareRate = res.data.tb + "%";
          this.finishRate = res.data.totalBjRate + "%";
          this.finishRateList = [];
          let newFinishRateList = [];
          res.data.deptBjRate.map(item => {
            let obj = {};
            obj.dept_name = item.dept_name;
            obj.order_count = item.order_count + '件';
            obj.bj_rate = item.bj_rate + '%';
            obj.dept_id = item.dept_id;
            let newObj = {
              dept_name: item.dept_name,
              order_count: item.order_count,
              bj_rate: item.bj_rate,
            }
            this.finishRateList.push(obj);
            newFinishRateList.push(newObj);
          })
          this.avgDataList = [];
          let newAvgDataList = [];
          res.data.deptAvgWorkTime.map(item => {
            let obj = {};
            obj.deptName = item.dept_name;
            obj.orderCount = item.order_count + '件';
            obj.avgDay = item.total_cost + '天';
            obj.dept_id = item.dept_id;
            this.avgDataList.push(obj);
            let newObj = {
              deptName: item.dept_name,
              orderCount: item.order_count,
              avgDay: item.total_cost,
            }
            newAvgDataList.push(newObj)
          })
          let finishRateTop5 = this.getTop5(newFinishRateList);
          let avgTop5 = this.getTop5(newAvgDataList);
          let avgBottom5 = this.getBottom5(newAvgDataList);
          this.initJblTop5(finishRateTop5);
          this.initAVGTOP5(this.AVGTOP5, avgTop5);
          this.initAVGBOTTOM5(this.AVGBOTTOM5, avgBottom5);
        }
      })
    },
    //会议纪要天数&&同比
    getMeetAvg() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencyMeetingSummaryAvg";
      this.$post.postData("efflciencyMeetingSummaryAvg", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if (res.success) {
          this.avgDays = res.data.avg;
          this.compareRate = res.data.yoy;
        }
      })
    },
    //会议纪要效率查询
    getMeetDataList() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencyMeetingSummaryGroup";
      this.$post.postData("efflciencyMeetingSummaryGroup", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if (res.success) {
          this.meetDataList = res.data || [];
          this.meetDataList = [];
          let newmeetDataList = [];
          res.data.map(item => {
            let obj = {};
            obj.deptName = item.deptName;
            obj.orderCount = item.orderCount + '件';
            obj.avgDay = item.avgDay + '天';
            obj.dept_id = item.deptId;
            let newObj = {
              deptName: item.deptName,
              orderCount: item.orderCount,
              avgDay: item.avgDay,
            }
            this.meetDataList.push(obj);
            newmeetDataList.push(newObj);
          })

          let top5 = this.getTop5(newmeetDataList);
          let bottom5 = this.getBottom5(newmeetDataList);
          this.initAVGTOP5(this.MEETAVGTOP5, top5);
          this.initAVGBOTTOM5(this.MEETAVGBOTTOM5, bottom5);
        }
      })
    },
    //获取数据top5
    getTop5(list) {
      let top5 = list.slice(0, 5);
      return top5;
    },
    //获取数据bottom5
    getBottom5(list) {
      let bottom5 = list.slice(-5).reverse();
      return bottom5;
    },
  },
  watch: {
    baseParams: {
      handler(val) {
        this.initData();
      },
      deep: true
    },
  },
  mounted() {
    this.initImageDom();
    this.initEcharts();
    this.echartsResize();
    this.initData();
  }
};
</script>
<style lang="less" scoped>
@yellow: #feec01;
@white: #fff;
.leftWrapper {
  .main {
    height: calc(100% - 110px);
    .header {
      height: 70px;
      background-color: #03417e;
      .overView {
        margin: 5px 0;
        text-align: center;
        font-size: 16px;
        color: @white;
        height: 60px;
        overflow: hidden;
        line-height: 70px;
        border-left: 1px dashed #dee2e6;
        .inner {
          font-size: 30px;
          color: @yellow;
        }
        &:first-of-type {
          border-left: none;
        }
      }
    }
    .title {
      height: 35px;
      padding-top: 10px;
      color: @white;
      .label {
        font-weight: bold;
        font-size: 20px;
      }
    }
    .btn {
      text-align: right;
      padding-right: 20px;
      .el-button {
        height: 26px;
        vertical-align: middle;
        background-color: transparent;
        color: #31bbfd;
        font-weight: 700;
        border: 1px solid #31bbfd;
        .el-button--mini {
          padding: 7px;
        }
      }
      .el-button:hover {
        background-color: rgba(45, 140, 219, 0.6);
      }
    }
  }
  .bottomBtn {
    height: 100px;
    margin-bottom: 10px;
    .el-col > div {
      background-position: center;
      background-size: 85% 85%;
      display: inline-block;
      width: 130px;
      height: 100px;
      cursor: pointer;
      position: relative;
      &.active {
        background-position: center;
        background-size: 85% 85%;
      }
      & > div {
        height: 60px;
        width: 100%;
        position: absolute;
        left: -2px;
        background-position: center;
        background-size: 85% 85%;
      }
    }
    .textLft {
      text-align: left;
    }
    .textRight {
      text-align: right;
    }
    .textCenter {
      text-align: center;
    }
    .wholeXL {
      background: url(../../../assets/images/bigButton/1-1_06.png) no-repeat;
      &.active {
        background: url(../../../assets/images/bigButton/2-1_06.png) no-repeat;
      }
      .wholeBG {
        background: url(../../../assets/images/bigButton/1_03.png) no-repeat;
        background-position: center;
        background-size: 90% 85%;
        left: 1px;
        top: 85px;
      }
    }
    .ownXL {
      background: url(../../../assets/images/bigButton/1-2_09.png) no-repeat;
      &.active {
        background: url(../../../assets/images/bigButton/2-2_09.png) no-repeat;
      }
      .ownBG {
        background: url(../../../assets/images/bigButton/2_11.png) no-repeat;
        background-position: center;
        background-size: 86% 85%;
        top: 87px;
        left: -2px;
      }
    }
    .joinXL {
      background: url(../../../assets/images/bigButton/1-3_11.png) no-repeat;
      &.active {
        background: url(../../../assets/images/bigButton/2-3_11.png) no-repeat;
      }
      .joinBG {
        background: url(../../../assets/images/bigButton/2_11.png) no-repeat;
        background-position: center;
        background-size: 88% 85%;
        top: 87px;
        left: -2px;
      }
    }
    .meetXL {
      background: url(../../../assets/images/bigButton/1-5_03.png) no-repeat;
      &.active {
        background: url(../../../assets/images/bigButton/2-4_03.png) no-repeat;
      }
      .meetBG {
        background: url(../../../assets/images/bigButton/3_03.png) no-repeat;
        background-position: center;
        background-size: 90% 85%;
        left: 2px;
        top: 85px;
      }
    }
  }
}
.wh100 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.h100 {
  height: 100%;
}
.h50 {
  height: 50%;
}
.h20 {
  height: 20%;
}
.linearBgc {
  background: linear-gradient(
    to bottom,
    rgba(20, 222, 252, 0.5),
    rgba(20, 222, 252, 0.1)
  );
}
.checkAll_wrapper {
  position: absolute;
  top: 5px;
  right: 0;
  background-color: #093c71;
  z-index: 100;
  .el-button--mini {
    padding: 5px;
  }
}
.meetTable {
  width: 50%;
  height: 160%;
}
.top5Table {
  width: 100%;
  height: 85%;
}
.avgTable {
  // width: 330px;
  width: 100%;
  height: 160%;
}
/deep/ .bhDetails .el-dialog__body {
  background-color: #03417e;
}
/deep/.el-table {
  background-color: transparent;
  .el-table__header {
    border: 1px solid #2590c2;
  }
  th,
  tr {
    background-color: transparent;
    color: @white;
    padding: 5px 0;
    & > .cell {
      font-weight: bold;
    }
  }
  .el-table__body-wrapper {
    background-color: rgba(255, 255, 255, 0.1);
  }
  tr:hover td {
    background-color: transparent !important;
  }
  td {
    padding: 3px 0;
  }
  td,
  th.is-leaf {
    border-bottom: 0;
  }
  &::before {
    height: 0;
  }
}
</style>