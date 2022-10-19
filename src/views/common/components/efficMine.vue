<template>
  <div class="leftWrapper wh100">
    <waterFall :closeHandler="closeHandler" ref="waterFall" :processInstId="processInstIdRow"></waterFall>
    <div class="main">
      <el-row class="header">
        <el-col :span="activeButton!='4'?8:12" class="overView">
          平均处理天数
          <span class="inner">{{avgWorkTime}}</span>天
        </el-col>
        <el-col :span="activeButton!='4'?8:12" class="overView">
          同比
          <span v-if='tb>0' class="el-icon-top" style="color:red;"></span>
          <span v-else-if="tb<0" class="el-icon-bottom" style="color:greenyellow;"></span>
          <span class="inner">{{tb}}</span><span v-if="activeButton!='4'">%</span>
        </el-col>
        <el-col :span="8" class="overView" v-if="activeButton!='4'">
          办结率
          <span class="inner">{{totalBjRate}}</span>%
        </el-col>
      </el-row>
      <el-row style="height:calc(100% - 70px)">
        <el-col :span="24" class="h50">
          <el-row class="title">
            <el-col :span="16" class="label">已办结</el-col>
            <el-col :span="8" class="btn">
              <el-button type="plain" size="mini" @click="checkALL_finEffic">查看全部</el-button>
            </el-col>
          </el-row>
          <el-row style="height:calc(100% - 40px); padding-top:5px;">
            <div class="h100">
              <el-table
                :data="tableDataRetryBJ"
                height="100%"
                :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',border:'1px soild #ccc'}"
              >
                <el-table-column width="50" type="index" align="center" label="序号"></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="document_code"
                  label="收文字号"
                  align="center"
                ></el-table-column>
                <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="undertake_dispose_duration"
                  label="处理时间"
                  align="center"
                ></el-table-column>
              </el-table>
            </div>
          </el-row>
        </el-col>
        <el-col :span="24" class="h50">
          <el-row class="title">
            <el-col :span="16" class="label">未办结</el-col>
            <el-col :span="8" class="btn">
              <el-button type="plain" size="mini" @click="checkALL_wtEffic">查看全部</el-button>
            </el-col>
          </el-row>
          <el-row style="height:calc(100% - 40px); padding-top:5px;">
            <div class="h100">
              <el-table
                :data="tableDataRetry"
                height="100%"
                :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',border:'1px soild #ccc'}"
              >
                <el-table-column width="50" type="index" align="center" label="序号"></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="document_code"
                  label="收文字号"
                  align="center"
                ></el-table-column>
                <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="undertake_dispose_duration"
                  label="处理时间"
                  align="center"
                ></el-table-column>
              </el-table>
            </div>
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import waterFall from 'views/common/components/waterFall'
export default {
  components:{
    waterFall
  },
  data() {
    return {
      closeHandler:false,
      processInstIdRow:"",
      activeButton: "1", //1--部门整体效率；2-独立承办效率；3-协办效率；4-会议纪要效率
      postObj: {
        function: "selectSelfDept_all_bj_wbj",
        deptIds: "",
        year: "",
        quarter: "",
        month: "",
        state: 0,
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount: 0
      },
      function: "selectSelfDept_all_bj_wbj",
      tableDataRetry: [],
      tableDataRetryBJ: [],
      avgWorkTime: "",
      tb: "",
      totalBjRate: ""
    };
  },
  computed: {
    ...mapGetters("efficiency", ["baseParams"])
  },
  methods: {
    getWaterFall(row){
      this.processInstIdRow = row.processInstId;
      this.closeHandler = true;
      this.$nextTick(() => {
        this.$refs.waterFall.openDialog();
      });
    },
    ...mapActions("efficiency", ["setEfficeType"]),
    initData() {//数据请求:TODO --整体/独立/协办
      this.postObj.deptIds = this.baseParams.deptIds;
      this.postObj.year = this.baseParams.year;
      this.postObj.month = this.baseParams.month;
      this.postObj.quarter = this.baseParams.quarter;
      this.$post
        .postData(
          this.postObj.function,
          JSON.stringify(this.postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            res.data.bj.data.forEach(element => {
              element.undertake_dispose_duration +='天'
            })||[];
            this.tableDataRetryBJ = res.data.bj.data
            res.data.wbj.data.forEach(element => {
              element.undertake_dispose_duration +='天'
            })||[];
            this.tableDataRetry = res.data.wbj.data
            this.avgWorkTime = res.data.avgWorkTime?res.data.avgWorkTime:'-';
            this.tb = res.data.tb?res.data.tb:'-';
            this.totalBjRate = res.data.totalBjRate?res.data.totalBjRate:'-';
          } else {
            this.tableDataRetryBJ = [];
            this.tableDataRetry = [];
          }
        });
    },
    winitDataHY() {//数据请求:TODO   --会议未办结
      this.postObj.state = "0";
      this.$post
        .postData(
          this.postObj.function,
          JSON.stringify(this.postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            // let list = res.data.rows;
            // let newList = [];
            // list.map((item, i) => {
            //   let obj = {};
            //   obj.document_code = item.documentNo;
            //   obj.undertake_dispose_duration = item.wDay;
            //   obj.title = item.title;
            //   newList.push(obj);
            // });
            // this.tableDataRetry = newList;this.tableDataRetry = res.data.rows;
            res.data.rows.forEach(element => {
              element.undertake_dispose_duration +='天'
            })||[];
            this.tableDataRetry = res.data.rows
          }
        });
    },
    initDataHY() {
      //数据请求:TODO  --会议记录办结
      this.postObj.state = "1";
      this.$post
        .postData(
          this.postObj.function,
          JSON.stringify(this.postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            // let list = res.data.rows;
            // let newList = [];
            // list.map((item, i) => {
            //   let obj = {};
            //   obj.document_code = item.documentNo;
            //   obj.undertake_dispose_duration = item.wDay ? item.wDay : "";
            //   obj.title = item.title;
            //   newList.push(obj);
            // });
            // this.tableDataRetryBJ = newList;this.tableDataRetryBJ = res.data.rows;
            res.data.rows.forEach(element => {
              element.undertake_dispose_duration +='天'
            })||[];
            this.tableDataRetryBJ = res.data.rows
          }
        });
    },
    
    efflciencyMeetingSummaryAvg(){//数据请求:TODO  --会议纪要办结 同比
      this.baseParams.function = "efflciencyMeetingSummaryAvg";
      this.$post
        .postData(
          'efflciencyMeetingSummaryAvg',
          JSON.stringify(this.baseParams),
          this.$businessCode.xnkb
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            console.log("tong",res)
            this.avgWorkTime =res.data.avg;
            this.tb = res.data.yoy;
            // this.totalBjRate = '';
          }
        });
    },
    bottomBtnChange(val) {
      this.activeButton = val;
      this.postObj.deptIds = this.baseParams.deptIds;
      this.postObj.year = this.baseParams.year;
      this.postObj.month = this.baseParams.month;
      this.postObj.quarter = this.baseParams.quarter;
      this.setEfficeType(val);
      switch (val) {
        case "1":
          this.postObj.function = "selectSelfDept_all_bj_wbj";
          this.initData();
          break;
        case "2":
          this.postObj.function = "selectSelfDept_undertake_bj_wbj";
          this.initData();
          break;
        case "3":
          this.postObj.function = "selectSelfDept_help_bj_wbj";
          this.initData();
          break;
        case "4":
          this.postObj.function = "efflciencyMeetingSummaryDetails";
          this.initDataHY();
          this.winitDataHY();
          this.efflciencyMeetingSummaryAvg();
          break;
        default:
          break;
      }
          // this.initData();
    },
    checkALL_finEffic() {
      let params = {
        classes: "finEfficAll"
      };
      this.$emit("checkAll", params);
    },
    checkALL_wtEffic() {
      let params = {
        classes: "wtEfficAll",
      };
      this.$emit("checkAll", params);
    }
  },
  created() {},
  mounted() {
    this.initData();
  },
  watch: {
    baseParams: {
      handler(val) {
        this.initData();
      },
      deep: true
    }
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
        color: #fff;
        border: 1px solid #fff;
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
    // .cell{
    //   font-size: 13px;
    // }
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