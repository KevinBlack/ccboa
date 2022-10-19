<template>
  <div class="leftWrapper wh100">
      <div class="main" v-if="this.isZH == true">
          <el-row style="height:calc(100% - 30px); padding-top:5px;box-sizing:border-box;">
            <el-col :span="24" style="height:100%">
              <div class="wh100" id="MEETAVGBOTTOM5" style="height:100%;"></div>
            </el-col>
          </el-row>
      </div>
      <div class="bottomBtn" v-if="this.isZH == true">
        <el-row style="height:100%">
          <el-col :span="24" class="tableCont" style="height:100%">
            <el-table
              :data="tableDataRetry"
              height="150%"
              max-height="250"
              :cell-style="cellStyle"
              :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}"
            >
              <el-table-column show-overflow-tooltip class="breakIndex" type="index" align="center" label="排名"></el-table-column>
              <el-table-column show-overflow-tooltip prop="name" label="分行" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="VALUE" label="工作日" align="center"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div class="wh100" v-if="this.isZH == false">
        <el-row style="height:100%">
          <el-col :span="24" class="tableCont" style="height:100%">
            <el-table
              :data="tableDataRetry"
              align="center"
              height="100%"
              :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}"
            >
              <el-table-column class="breakIndex" width="50" type="index" align="left" label="排名"></el-table-column>
              <el-table-column show-overflow-tooltip prop="name" label="分行" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="VALUE" label="工作日" align="center"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
   
    <img src="../../../assets/images/shuju.png" id="imageDom" style="display:none;">
    <img src="../../../assets/images/shuju3.png" id="imageDom_BJL" style="display:none;">
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import 'echarts/map/js/china'; 
export default {
  data() {
    return {
      showAVGTable:false,  
      showTop5Table:false, // top5查看全部
      showMeetTable:false, // 会议纪要查看全部
      activeButton: "1", //1--部门整体效率；2-独立承办效率；3-协办效率；4-会议纪要效率
      BJLTOP5: "",
      AVGTOP5: "",
      AVGBOTTOM5: "",
      MEETAVGTOP5: "",
      MEETAVGBOTTOM5: "",
      imageDom:"",
      imageDom_BJL:"",
      finishRateList:[], //办结率数据列表
      avgDataList:[], //非会议平均处理天数列表数据
      top5List:[],  //top5数据列表
      AVGList:[],   //AVG数据列表
      meetDataList:[], //会议纪要效率列表
      avgDays:"",     //平均处理天数
      compareRate:"", //同比
      finishRate:"",  //办结率
      middleTitleBottom:"全行基层减负",
      middleTitleHelper:"",
      tableDataRetry:[],
      isZH:false,
    };
  },
  computed: {
    ...mapGetters("efficiency", ["baseParams","explainText"])
  },
  methods: {
    includesArea(val){
      let areaName = '';
      if(val.includes('北京')){areaName='北京'}
      if(val.includes('天津')){areaName='天津'}
      if(val.includes('黑龙江')){areaName='黑龙江'}
      if(val.includes('吉林')){areaName='吉林'}
      if(val.includes('辽宁')){areaName='辽宁'}
      if(val.includes('河北')){areaName='河北'}
      if(val.includes('河南')){areaName='河南'}
      if(val.includes('山东')){areaName='山东'}
      if(val.includes('山西')){areaName='山西'}
      if(val.includes('陕西')){areaName='陕西'}
      if(val.includes('内蒙古')){areaName='内蒙古'}
      if(val.includes('宁夏')){areaName='宁夏'}
      if(val.includes('甘肃')){areaName='甘肃'}
      if(val.includes('新疆')){areaName='新疆'}
      if(val.includes('青海')){areaName='青海'}
      if(val.includes('西藏')){areaName='西藏'}
      if(val.includes('湖北')){areaName='湖北'}
      if(val.includes('安徽')){areaName='安徽'}
      if(val.includes('江苏')){areaName='江苏'}
      if(val.includes('上海')){areaName='上海'}
      if(val.includes('浙江')){areaName='浙江'}
      if(val.includes('福建')){areaName='福建'}
      if(val.includes('湖南')){areaName='湖南'}
      if(val.includes('江西')){areaName='江西'}
      if(val.includes('四川')){areaName='四川'}
      if(val.includes('重庆')){areaName='重庆'}
      if(val.includes('贵州')){areaName='贵州'}
      if(val.includes('云南')){areaName='云南'}
      if(val.includes('广东')){areaName='广东'}
      if(val.includes('广西')){areaName='广西'}
      if(val.includes('海南')){areaName='海南'}
      if(val.includes('香港')){areaName='香港'}
      if(val.includes('澳门')){areaName='澳门'}
      if(val.includes('台湾')){areaName='台湾'}
      return areaName
    },
    cellStyle(column){
      if(column.column.label == '分行'){
        return 'padding-left:2% !important'
      }
      if(column.column.label == '工作日'){
        return 'padding-right:1% !important'
      }
      if(column.column.label == '排名'){
        return 'padding-left:3% !important'
      }
    },
    initData() {
      this.middleTitleHelper = this.explainText.bsxl;
    },
    //加载echart背景图片
    initImageDom(){
      this.imageDom = document.querySelector("#imageDom");
      this.imageDom_BJL = document.querySelector("#imageDom_BJL");
    },
    echartsResize(){
      window.onresize=function(){
        this.initDataYJ()
      }
    },
    initDataYJ(){
      this.tableDataRetry = [];
      let params = Object.assign({},this.baseParams);
      params.function = "selectLowerBank"
      this.$post.postData("selectLowerBank", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if(res.success){
          let data = [];
          for (let i = 0; i < res.data.length; i++) {
            let obj={
              name:this.includesArea(res.data[i].name),
              subname:res.data[i].name,
              value:res.data[i].VALUE
            }
            let tableObj = {
              name:res.data[i].name,
              VALUE:res.data[i].VALUE+'天'
            }
            data.push(obj)
            this.tableDataRetry.push(tableObj)
          }
          if(!this.isZH)return
          data.push({
            name:"南海诸岛",
            subname:"南海诸岛",
            value:0
          })
          for(var k = 0; k< data.length;k++){
            if(data[k].value < 0){
              data[k].value = 0;
            }else if(data[k].value > 0 && data[k].value < 0.01){
              data[k].value = 0.01;
            }else{
              data[k].value = Number(data[k].value);
            }
          }
          setTimeout(() => {
            this.MEETAVGBOTTOM5 = this.$echarts.init(document.querySelector("#MEETAVGBOTTOM5"));
            let charOption = {
              tooltip:{
                formatter(params, ticket, callback){
                  let localVlaue;
                  if(params.data){
                    localVlaue = params.data.value
                  }else{
                    localVlaue = 0
                  }
                  let htmlStr = `<div style='font-size=18px;'>${params.name}</div>
                                  <p style='text-align:left;margin-top:-10px;'>平均办公效率：${localVlaue}天
                                  </p>`
                  return htmlStr 
                }
              },
              visualMap: {
                  show : true,  
                  left:20,
                  bottom:20,
                  textStyle:{
                      color:"#fff",
                  },
                  tooltip: {
                      show: true,
                      formatter: function(params) {
                        console.log(params)
                        if (params.data) return params.name + '：' + params.data['value']
                      },
                  },
                  itemSymbol: 'circle',
                  splitList: [
                    {start: 0, end:0, color: '#fff'},
                    {start: 10.001,color: '#ffa35e'},
                    {start: 5.001, end: 10, color: '#73d1ba'},
                    {start: 0.001, end: 5, color: '#86c2ef'}
                    ],
                  formatter: function (value) {
                    if(value == 0){
                      return '暂无数据';
                    }else if(value < 5){
                        return '效率较快(5天以下)';
                      } else if(value >= 5 && value <= 10){
                        return '效率中等(5到10天)';
                      } else if(value >10){
                        return '效率较慢(10天以上)';
                      }
                      
                  }
              },  
              geo:{
                map:'china',
                zoom:1.2,
                label:{
                  show:true,
                },
                itemStyle:{
                  borderColor:'rgba(0,0,0,0.2)',
                  emphasis:{
                    shadowBlur:20,
                    shadowColor:'rgba(0,0,0,0.5)'
                  }
                }
              },
              series:[{name:'',type:'map',geoIndex:0,label:{show:true},data:data}]
            }
            this.MEETAVGBOTTOM5.setOption(charOption)
          }, 1000);
        }
      })
    
    },
    
  },
  watch: {
    baseParams: {
      handler(val) {
        this.initDataYJ();
      },
      deep: true
    },
  },
  mounted() {
    let unitIDisZH = JSON.parse(localStorage.getItem("userInfo")).unitId;
    if(unitIDisZH == 'U010000'){
      this.isZH = true;
    } 
    this.initDataYJ();
  }
};
</script>
<style lang="less" scoped>
@yellow: #feec01;
@white: #fff;
.leftWrapper {
  .main {
    height: calc(100% - 200px);
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
    height: 200px;
    margin-bottom: 10px;
    .el-col > div {
      background-position: center;
      background-size: 85% 85%;
      display: inline-block;
      width: 130px;
      height: 100%;
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
.checkAll_wrapper{
  position: absolute;
  top: 5px;
  right: 0;
  background-color: #093c71;
  z-index:100;
}
.meetTable{
  width: 50%;
  height: 160%;
}
.top5Table{
  width: 100%;
  height: 85%;
}
.avgTable{
  width: 330px;
  // width: 100%;
  height: 160%;
}
/deep/.el-table{
  background-color:transparent;
  .el-table__header{
    border: 1px solid #2590C2;
  }
  th,tr{
    background-color: transparent;
    color: @white;
    padding: 5px 0;
    &>.cell{
      color: @white;
      font-weight: bold;
    }
  }
  .el-table__body-wrapper{
    background-color: rgba(255, 255, 255, 0.1);
  }
  tr:hover td{
    background-color: transparent !important;
  }
  td{
    padding:3px 0 ;
  }
  td, 
  th.is-leaf{
    border-bottom: 0;
  }
  &::before{
    height: 0;
  }
}
.bothSide{
  padding-top:20px;
  box-sizing: border-box;
  height: 60px;
  .titLine{
    margin-left: 5px;
    height: 30px;
    display: inline-block;
    background-color: @yellow;
    width: 4px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .sectionTitle{
    color: @white;
    font-size: 20px;
    line-height: 35px;
    font-weight: 900;
    vertical-align: middle;
    margin-right: 5px;
  }
  .help{
    color: @white;
    font-size: 22px;
    vertical-align: middle;
  }
}
/deep/.el-table {
    width: 100% !important;
    background-color: transparent;
    thead { width: 100%; }
    .el-table__header {
      border: 1px solid #2590c2;
      display: flex;
      width: 100% !important;
    }
    th,
    tr {
      background-color: transparent;
      color: @white;
      font-weight: 700;
      // padding: 5px 0;
      & > .cell {
        font-weight: bold;
      }
    }
    tr {
      width: 101%;
      display: table;
    }
    .el-table__body-wrapper {
      // height: 100% !important;
      background-color: rgba(255, 255, 255, 0.1);
      // .cell{
      //   font-size: 13px;
      // }
    }
    tr:hover td {
      background-color: transparent !important;
    }
    td {
      padding: 5px 0 !important;
    }
    td,
    th.is-leaf {
      border-bottom: 0;
    }
  }
  /deep/.el-table::before {
    height: 0;
  }
</style>