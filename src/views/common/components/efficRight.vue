<template>
  <div class="wh100 righttWrapper">
    <!-- 总行相关 -->
    <div class="wh100" v-show="baseParams.activeName=='headOffice'">
      <el-row class="h16 linearBgc">
        <el-row class="header">
          <el-col :span="12" class="title">办文重发</el-col>
          <el-col :span="12" class="btn" style="position:relative;">
            <el-button class="fixtedBtn" id="fixtedBtn" type="plain" size="mini" @click="checkAll_BWZL">查看全部</el-button>
          </el-col>
        </el-row>
        <el-row style="height:calc(100% - 30px);position:relative;">
          <el-row class="50%">
            <el-col :span="12" class="label">重发文次数</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{againCount}}</span>件
            </el-col>
          </el-row>
          <el-row class="50%">
            <el-col :span="12" class="label">平均重发率</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{againAvg}}</span>
            </el-col>
          </el-row>
          <div class="zxdbTable" v-show="qualityTableShow">
            <div class="rankTitle">
              <div style="width: 10%;">排名</div>
              <div style="width: 30%;">部门</div>
              <div style="width: 15%;">退文件数</div>
              <div style="width: 15%;">退文率</div>
              <div style="width: 15%;">重发件数</div>
              <div style="width: 15%;">重发率</div>
            </div>
            <ul class="width100 showAllZxdbUl" tabindex="5">
              <li class="width100" style="display: flex;" v-for="(item,index) in tableDataRetry" :key="index">
                <div style="width: 10%;">{{index+1}}</div>
                <div :title="item.deptName" style="width: 30%;">{{item.deptName}}</div>
                <div :title="item.backCount" style="width: 15%;">{{item.backCount}}件</div>
                <div :title="item.backPercent" style="width: 15%;">{{item.backPercent}}</div>
                <div :title="item.againCount" style="width: 15%;">{{item.againCount}}件</div>
                <div :title="item.againPercent" style="width: 15%;">{{item.againPercent}}</div>
              </li>
            </ul>
          </div>
        </el-row>
      </el-row>
      <el-row class="h44 linearBgc">
        <el-row class="header">
          <el-col :span="12" class="title">办文退回</el-col>
        </el-row>
        <div style="height:80px">
          <el-row class="50%">
            <el-col :span="12" class="label">退回次数</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{backCount}}</span>次
            </el-col>
          </el-row>
          <el-row class="50%">
            <el-col :span="12" class="label">平均退回率</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{backAvg}}</span>
            </el-col>
          </el-row>
        </div>
        <el-row style="height:calc(100% - 110px);padding:0 20px;">
          <el-col :span="24">
            <el-tabs v-model="TORB" @tab-click="tabsClickTORB" style="height:30px">
              <el-tab-pane label="TOP5" name="top5"></el-tab-pane>
              <el-tab-pane label="BOTTOM5" name="bottom5"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col style="height:calc(100% - 30px)">
            <div class="wh100" id="backChart"></div>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="11" class="bothSide">
          <span class="titLine"></span>
          <span class="sectionTitle">办文效率</span>
          <el-tooltip placement="bottom-end" :visible-arrow="false" popper-class="tooltipWrapper">
            <div slot="content" class="helperWrapper" v-html="explainText.bwxl"></div>
            <span class="help el-icon-question"></span>
          </el-tooltip>
        </el-col>
        <el-col :span="13" class="btn ft-12">
          <el-tabs v-model="BWEfficType" @tab-click="tabsClick_BWEffic" style="height:30px">
            <el-tab-pane label="发文处理时间" name="FWTime"></el-tab-pane>
            <el-tab-pane label="会签处理时间" name="HQTime"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row class="h40 linearBgc" style="padding:0 20px;">
        <el-row class="overView" style="height:42px">
          <el-col :span="12" class="label">
            平均
            <span class="content">{{avgDays}}</span> 天
          </el-col>
          <el-col :span="12" class="label" style="padding-left:10px;">
            同比
            <span class="content">{{compareRate}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-tabs v-model="BWXLTORB" @tab-click="tabsBWXLTORB" style="height:30px">
              <el-tab-pane label="TOP5" name="top5"></el-tab-pane>
              <el-tab-pane label="BOTTOM5" name="bottom5"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="6" class="btn">
            <el-button type="plain" size="mini" id="efficBtn" @click="checkAll_BWXL">查看全部</el-button>
          </el-col>
        </el-row>
        <el-row style="height:calc(100% - 70px)">
          <div class="wh100" id="BWXLChart"></div>
          <!-- <div class="efficTable" v-show="efficTableShow">
            <el-table
              :data="efficTableList"
              height="170px"
            >
              <el-table-column show-overflow-tooltip type="index" align="center" label="排名" width="50px"></el-table-column>
              <el-table-column show-overflow-tooltip prop="deptName" label="部门" align="center" width="100px"></el-table-column>
              <el-table-column show-overflow-tooltip prop="orderCount" label="件数" align="center" width="50px"></el-table-column>
              <el-table-column show-overflow-tooltip prop="avgDay" label="平均处理时长" align="center" width="150px"></el-table-column>
            </el-table>
          </div>-->
          <div class="zxdbTable" v-show="efficTableShow" style="min-height:130px;">
            <div class="rankTitle">
              <div style="width: 10%;">排名</div>
              <div style="width: 30%;">部门</div>
              <div style="width: 15%;">件数</div>
              <div style="width: 25%;">平均处理时长</div>
              <div style="width: 20%;">操作</div>
            </div>
            <ul class="width100 showAllZxdbUl" tabindex="5" style="height: 50%;">
              <li class="width100" style="display: flex;" v-for="(item,index) in efficTableList" :key="index">
                <div style="width: 10%;">{{index+1}}</div>
                <div :title="item.deptName" style="width: 30%;">{{item.deptName}}</div>
                <div :title="item.orderCount" style="width: 15%;">{{item.orderCount}}件</div>
                <div :title="item.avgDay" style="width: 25%;">{{item.avgDay}}天</div>
                <div style="width: 20%;">
                  <el-button size="mini" type="primary" @click="getBhDetails(item)" v-preventClick>查看详情</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-row>
      </el-row>
    </div>
    <!-- 一级行相关 -->
    <div class="wh100" v-show="baseParams.activeName=='subBank'">
      <el-row class="h16 linearBgc">
        <el-row class="header">
          <el-col :span="12" class="title">发文效率</el-col>
        </el-row>
        <el-row style="height:calc(100% - 30px);position:relative;">
          <el-row class="50%">
            <el-col :span="12" class="label">同比 ↓</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{subRightBwcf.yoy}}</span>
            </el-col>
          </el-row>
          <el-row class="50%">
            <el-col :span="12" class="label">平均处理</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{subRightBwcf.avg}}</span>天
            </el-col>
          </el-row>
        </el-row>
      </el-row>
      <el-row class="h50 linearBgc">
        <el-row class="header">
          <el-col :span="12" class="title">会签效率</el-col>
        </el-row>
        <div>
          <el-row class="50%">
            <el-col :span="12" class="label">同比 ↓</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{subRightFwth.yoy}}</span>
            </el-col>
          </el-row>
          <el-row class="50%">
            <el-col :span="12" class="label">平均处理</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{subRightFwth.avg}}</span>天
            </el-col>
          </el-row>
        </div>
        <el-row class="header">
          <el-col style="display:flex">
            <div class="title YJtitle" :class="{Activeyj:isFwCheck==true}" @click="yjHsjcl('fw')">发文处理时间</div>
            <div class="title YJtitle" :class="{Activeyj:isFwCheck==false}" @click="yjHsjcl('hq')">会签处理时间</div>
          </el-col>
          <el-col :span="24" style="height: 178px;">
            <div class="zxdbTableNoTable">
              <div class="rankTitle" v-if="isFwCheck == true">
                <div style="width: 15%;">排名</div>
                <div style="width: 55%;">分行</div>
                <div style="width: 35%;">发文时长</div>
              </div>
              <ul class="width100 showAllZxdbUl" tabindex="5" v-if="isFwCheck == true">
                <li class="width100" style="display: flex;" v-for="(item,index) in tableDataRetry1" :key="index">
                  <div style="width: 15%;">{{index+1}}</div>
                  <div :title="item.org_name" style="width: 55%;">{{item.org_name}}</div>
                  <div :title="item.sendAvg" style="width: 35%;">{{item.sendAvg}}天</div>
                </li>
              </ul>
              <div class="rankTitle" v-if="isFwCheck != true">
                <div style="width: 15%;">排名</div>
                <div style="width: 55%;">分行</div>
                <div style="width: 35%;">会签时长</div>
              </div>
              <ul class="width100 showAllZxdbUl" tabindex="5" v-if="isFwCheck != true">
                <li class="width100" style="display: flex;" v-for="(item,index) in tableDataRetry2" :key="index">
                  <div style="width: 15%;">{{index+1}}</div>
                  <div :title="item.org_name" style="width: 55%;">{{item.org_name}}</div>
                  <div :title="item.signAvg" style="width: 35%;">{{item.signAvg}}天</div>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="11" class="bothSide">
          <span class="titLine"></span>
          <span class="sectionTitle">热点</span>
          <el-tooltip placement="bottom-end" :visible-arrow="false" popper-class="tooltipWrapper">
            <div slot="content" class="helperWrapper">按发文业务分类判别，按文件数排序，根据颜色及字体大小区别展示排名</div>
            <span class="help el-icon-question"></span>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row class="h40 linearBgc" style="height: calc(34% - 50px);">
        <div id="bwxlHot" class="clear" style="min-height: 100px;height: 85% ;overflow:scroll">
          <div v-for="(item,index) in bwxlHot" :key="index" v-cloak class="hotItem" :style="{color: item.color,border: item.border,fontSize: item.size,lineHeight: item.lineH,height:item.lineH +'!imporatnt'}">{{item.name}}</div>
        </div>
      </el-row>
    </div>
    <img src="../../../assets/images/shuju.png" id="imageDom" style="display:none;" />
    <!-- 本部门相关 -->
    <div class="wh100" v-show="baseParams.activeName=='mineDept'">
      <el-row class="h50 linearBgc">
        <el-row class="header">
          <el-col :span="12" class="title">办文重发</el-col>
          <el-col :span="12" class="btn">
            <el-button type="plain" size="mini" @click="checkAll_RETRY">查看全部</el-button>
          </el-col>
        </el-row>
        <el-col :span="24" style="height:80px">
          <el-row class="h50">
            <el-col :span="12" class="label h50">重复文次数</el-col>
            <el-col :span="12" class="label h50">
              <span class="content">{{againCount}}</span>次
            </el-col>
          </el-row>
          <el-row class="h50">
            <el-col :span="12" class="label h50">平均重发率</el-col>
            <el-col :span="12" class="label h50">
              <span class="content">{{againAvg}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" class="tableCont" style="height:calc(100% - 110px)">
          <el-table :data="tableDataRetry" height="100%" :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}">
            <el-table-column show-overflow-tooltip class="breakIndex" width="50" type="index" align="center" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="documentNo" label="发文字号" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="sendTime" label="重发日期" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="h50 linearBgc">
        <el-row class="header">
          <el-col :span="12" class="title">办文退回</el-col>
          <el-col :span="12" class="btn">
            <el-button type="plain" size="mini" @click="checkAll_BACK">查看全部</el-button>
          </el-col>
        </el-row>
        <el-col :span="24" style="height:80px">
          <el-row class="h50">
            <el-col :span="12" class="label h50">退回次数</el-col>
            <el-col :span="12" class="label h50">
              <span class="content">{{backCount}}</span>次
            </el-col>
          </el-row>
          <el-row class="h50">
            <el-col :span="12" class="label h50">退回率</el-col>
            <el-col :span="12" class="label h50">
              <span class="content">{{backAvg}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" class="tableCont" style="height:calc(100% - 110px)">
          <el-table :data="tableDataBack" height="100%" :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}">
            <el-table-column show-overflow-tooltip class="breakIndex" width="50" type="index" align="center" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="documentNo" label="发文字号" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="backDept" label="退文部门" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-dialog class="deepColor bhDetails" :visible.sync="bhDetailsAllShow" :modal-append-to-body="false" width="80%" :title="bhDetailsDialogTitle">
      <bhDetails v-if="bhDetailsAllShow" :processInstId="bhDetailsProcessInstIdRow" :bhType="bhType" :postType="postType" ref="bhDetails"></bhDetails>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import bhDetails from 'views/common/components/bhDetails';
export default {
  data() {
    return {
      bhType: "4",
      postType: "",
      bhDetailsAllShow: false, //显示查看详情弹窗
      bhDetailsDialogTitle: '部门整体效率——办结率',//查看详情弹窗标题
      bhDetailsProcessInstIdRow: '',
      bwxlHot: [],
      efficTableShow: false, //总行办文效率table弹窗
      qualityTableShow: false, //总行办文质量table弹窗
      againAvg: "", // 重发率
      againCount: "", //重发次数
      backCount: "", // 退回次数
      backAvg: "", //退回率
      TORB: "top5",
      BWXLTORB: "top5",
      BWEfficType: "FWTime",
      tableDataRetry: [],
      tableDataRetry1: [],
      tableDataRetry2: [],
      tableDataBack: [],
      BWZLCHARTS: "",
      BWXLCHARTS: "",
      imageDom: "",
      avgDays: "", // 办文效率平均天
      compareRate: "", //办文效率同比
      efficTableList: [], //办文效率列表数据
      postObj: {
        //列表请求数据
        total: 0,
        page: 1, //当前页数
        limit: 10 //每页条数
      },
      subRightBwcf: {
        yoy: "",
        avg: ""
      },
      subRightFwth: {
        yoy: "",
        avg: ""
      },
      isFwCheck: true,
      handleHotUpdate: true
    };
  },
  components: {
    bhDetails
  },
  computed: {
    ...mapGetters("efficiency", ["baseParams", "explainText"])
  },
  // updated: function(){
  // 	//this.cutHotItme()
  // 	if(this.handleHotUpdate){
  // 		this.cutHotItme()
  // 	}

  // },
  methods: {
    hotLoadStyle(data) {
      let this_ = this;
      let hotArr = data;
      let hotArrAll = [];
      let weight = [];
      let fontSize = []; //文字大小
      let colorArr = []; //颜色数组
      /*let rgbArr = ["rgb(255,168,19)","rgb(69,207,183)","rgb(70,154,201)","rgb(255,255,255)"];*/
      let sizeArr = [19, 18, 17, 16, 15, 14, 13];
      let rgbArr = [
        "rgb(200,87,18)",
        "rgb(244,208,0)",
        "rgb(101,147,74)",
        "rgb(137,190,178)",
        "rgb(70,154,201)",
        "rgb(211,164,255)",
        "rgb(255,255,255)",
        "rgb(200,87,18)",
        "rgb(244,208,0)",
        "rgb(101,147,74)"
      ];
      hotArr &&
        hotArr.map((item, index) => {
          weight.push(Number(item.value));
        });
      weight.sort((a, b) => {
        return a < b;
      });
      weight.map((item, index, arr) => {
        if (index == 0) {
          fontSize.push(20);
          colorArr.push("rgb(197,99,122)");
        } else if (index > 0 && arr[index] == arr[index - 1]) {
          fontSize.push(fontSize[index - 1]);
          colorArr.push(colorArr[index - 1]);
        } else {
          fontSize.push(sizeArr[0]);
          sizeArr.shift();
          sizeArr.push(13);
          colorArr.push(rgbArr[0]);
          rgbArr.shift();
          rgbArr.push("rgb(255,255,255)");
        }
      });
      fontSize.sort((a, b) => {
        return a < b;
      });

      hotArr &&
        hotArr.map((item, index) => {
          let items = {};
          let rgbNum = [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(",");
          //let randomNum = Math.round(Math.random() * 2);
          let size = 10 + Math.round(Math.random() * 12);
          items.name = item.name;
          items.color = colorArr[index]; //'rgb(' + rgbNum + ')';
          items.border = "2px solid " + colorArr[index]; //'rgb(' + rgbNum + ')';
          items.size = fontSize[index] + "px";
          items.lineH = parseInt(fontSize[index] + 10) + "px";
          items.height = parseInt(fontSize[index] + 14) + 2 + "px";
          // else{
          // 	var nowSize = this_.cacheSize[index];
          // 	var nowColor = this_.cacheColor[index];
          // 	items.name = item.name;
          // 	items.color = nowColor;//'rgb(' + rgbNum + ')';
          // 	items.border = "0.01px solid "+nowColor;//'rgb(' + rgbNum + ')';
          // 	items.size = nowSize/100+"rem";
          // 	items.lineH = parseInt(nowSize+10)/100+"rem";
          // 	items.height = (parseInt(nowSize+10)+2)/100+"rem";
          // }
          hotArrAll.push(items);
        });
      this.bwxlHot = hotArrAll;
      //this_.$data?Vue.set(this_.$data,'bwxlHot',hotArrAll):""
    },
    //热点
    initBwxlHot() {
      var hotArr = this.bwxlHot;
      var hotArrAll = [];
      this.bwxlHot.map((item, index) => {
        var items = {};
        var rgbNum = [
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160)
        ].join(",");
        var rgbArr = [
          "rgb(255,168,19)",
          "rgb(69,207,183)",
          "rgb(70,154,201)",
          "rgb(197,99,122)"
        ];
        var randomNum = Math.round(Math.random() * 3);
        var size = 10 + Math.round(Math.random() * 12);

        items.name = item.name;
        items.color = rgbArr[randomNum]; //'rgb(' + rgbNum + ')';
        items.border = "1px solid " + rgbArr[randomNum]; //'rgb(' + rgbNum + ')';
        items.size = size + "px";
        items.lineH = size + 10 + "px";
        hotArrAll.push(items);
      });
    },
    // cutHotItme(){
    // 	this.$data?Vue.set(this.$data,'handleHotUpdate',false):""
    // 	if($(".hotItem").length>0){
    // 		var itemArr = Array.from($(".hotItem"))
    // 		itemArr.map((item,index)=>{
    // 			$(item).css("display","block")
    // 			var tops = item.offsetTop - $("#bwxlHot")[0].offsetTop;
    // 			if(tops+$(item).height()+6>$("#bwxlHot").height()){
    // 				$(item).css("display","none")
    // 			}else{
    // 				$(item).css("display","block")
    // 			}
    // 		})
    // 	}
    // },
    cellStyle(column) {
      if (column.column.label == "分行") {
        return "padding-left:8% !important";
      }
    },
    initData() {
      if (this.baseParams.activeName == "headOffice") {
        this.getEfficeRate_FW();
        this.getEfficeList_FW();
        this.getReQualityRate();
        this.getBackQualityRate();
        this.getBackQualityList();
        this.getReQualityList();
      } else if (this.baseParams.activeName == "subBank") {
        this.getBwcfData();
        this.getBwthData();
        this.getfwList();
        this.gethqList();
        this.getHotList();
      } else {
        //本部门相关请求
        this.getReQualityRate();
        this.getBackQualityRate();
        this.doBackQualityList();
        this.doReQualityList();
      }
    },
    getHotList() {
      //热词获取
      // let data = [{"name":"不忘初心，牢记使命","sort":"12"},{"name":"测试916","sort":"11"},{"name":"123","sort":"10"},{"name":"时代先驱","sort":"9"},{"name":"董事会","sort":"8"},{"name":"不忘初心，牢记使命","sort":"12"},{"name":"测试916","sort":"11"},{"name":"123","sort":"10"},{"name":"时代先驱","sort":"9"},{"name":"董事会","sort":"8"}]
      // this.hotLoadStyle(data)
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencyhotspot";
      this.$post
        .postData(
          "efflciencyhotspot",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            //this.bwxlHot = res.data
            this.hotLoadStyle(res.data);
          }
        });
    },
    getBwcfData() {
      //发文平均同比
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySuperSendAvg";
      this.$post
        .postData(
          "efflciencySuperSendAvg",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.subRightBwcf = res.data;
          }
        });
    },
    getBwthData() {
      //发文退回同比
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySuperSignAvg";
      this.$post
        .postData(
          "efflciencySuperSignAvg",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.subRightFwth = res.data;
          }
        });
    },
    getfwList() {
      //发文处理时间列表
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySuperSendGroup";
      this.$post
        .postData(
          "efflciencySuperSendGroup",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.tableDataRetry1 = res.data;
          }
        });
    },
    gethqList() {
      //会签处理时间列表
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySuperSignGroup";
      this.$post
        .postData(
          "efflciencySuperSignGroup",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.tableDataRetry2 = res.data;
          }
        });
    },
    //办文效率发文--平均天&&同比
    getEfficeRate_FW() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySendOrderAvg";
      this.$post
        .postData(
          "efflciencySendOrderAvg",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.avgDays = res.data.avg;
            this.compareRate = res.data.yoy;
          }
        });
    },
    //办文效率发文--数据请求
    getEfficeList_FW() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySendOrderGroup";
      this.$post
        .postData(
          "efflciencySendOrderGroup",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.efficTableList = res.data || [];
            let top5 = this.getTop5(this.efficTableList);
            this.initBWXLcharts(top5);
          }
        });
    },
    //办文效率会签--平均天&&同比
    getEfficeRate_HQ() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySignOrderAvg";
      this.$post
        .postData(
          "efflciencySignOrderAvg",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.avgDays = res.data.avg;
            this.compareRate = res.data.yoy;
          }
        });
    },
    //办文效率发文--数据请求
    getEfficeList_HQ() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySignOrderGroup";
      this.$post
        .postData(
          "efflciencySignOrderGroup",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.efficTableList = res.data || [];
            let top5 = this.getTop5(this.efficTableList);
            this.initBWXLcharts(top5);
          }
        });
    },
    //办文质量重发文-重发率
    getReQualityRate() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencyAgainAvg";
      this.$post
        .postData(
          "efflciencyAgainAvg",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.againAvg = res.data.againAvg;
            this.againCount = res.data.againCount;
          }
        });
    },
    //办文质量重发文-数据请求
    getReQualityList() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencyBackAndAgainGroup";
      this.$post
        .postData(
          "efflciencyBackAndAgainGroup",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.tableDataRetry = res.data || [];
          }
        });
    },
    //办文质量重发文-列表
    doReQualityList() {
      let params = Object.assign(this.postObj, this.baseParams);
      params.function = "efflciencyAgainOrderDetails";
      this.$post
        .postData(
          "efflciencyAgainOrderDetails",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.tableDataRetry = res.data.rows || [];
          }
        });
    },
    //办文质量退文-退回率
    getBackQualityRate() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencyBackOrderAvg";
      this.$post
        .postData(
          "efflciencyBackOrderAvg",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.backAvg = res.data.backAvg;
            this.backCount = res.data.backCount;
          }
        });
    },

    //办文质量重退文-数据请求
    getBackQualityList() {
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencyBackOrderGroup";
      this.$post
        .postData(
          "efflciencyBackOrderGroup",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.tableDataBack = res.data || [];
            let top5 = this.getTop5(this.tableDataBack);
            this.initBWZLcharts(top5);
          }
        });
    },
    //办文质量重退文-列表
    doBackQualityList() {
      let params = Object.assign(this.postObj, this.baseParams);
      params.function = "efflciencyBackOrderDetails";
      this.$post
        .postData(
          "efflciencyBackOrderDetails",
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.tableDataBack = res.data.rows || [];
          }
        });
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
    checkAll_BWZL() {
      this.qualityTableShow = !this.qualityTableShow;
      this.efficTableShow = false;
      let vm = this;
      document.onclick = function (e) {
        let dom = $("#fixtedBtn");
        let wrapper = $(".qualityTable");
        if (
          !dom.is(e.target) &&
          dom.has(e.target).length === 0 &&
          wrapper.has(e.target).length === 0
        ) {
          vm.qualityTableShow = false;
        }
      };
    },
    checkAll_BWXL() {
      this.efficTableShow = !this.efficTableShow;
      this.qualityTableShow = false;
      let vm = this;
      document.onclick = function (e) {
        let dom = $("#efficBtn");
        let wrapper = $(".efficTable");
        if (
          !dom.is(e.target) &&
          dom.has(e.target).length === 0 &&
          wrapper.has(e.target).length === 0
        ) {
          vm.efficTableShow = false;
        }
      };
    },
    getBhDetails(item) {
      this.bhDetailsProcessInstIdRow = item.deptId;
      if (this.BWEfficType === "FWTime") {
        this.bhDetailsDialogTitle = "办文效率——发文处理时间";
        this.postType = '2';
      } else if (this.BWEfficType === "HQTime") {
        this.bhDetailsDialogTitle = "办文效率——会签处理时间";
        this.postType = '3';
      }
      this.bhDetailsAllShow = true;
    },
    tabsClickTORB(tab) {
      //办文退回柱状图tab切换事件：TODO
      let vm = this;
      let data = [];
      switch (tab.name) {
        case "top5":
          data = vm.getTop5(vm.tableDataBack);
          break;
        case "bottom5":
          data = vm.getBottom5(vm.tableDataBack);
          break;
      }
      this.initBWZLcharts(data);
    },
    tabsBWXLTORB(tab) {
      let vm = this;
      switch (tab.name) {
        case "top5":
          let top5 = vm.getTop5(vm.efficTableList);
          vm.initBWXLcharts(top5);
          break;
        case "bottom5":
          let bottom5 = vm.getBottom5(vm.efficTableList);
          vm.initBWXLcharts(bottom5);
          break;
      }
    },
    tabsClick_BWEffic(tab) {
      this.BWXLTORB = "top5";
      let vm = this;
      switch (tab.name) {
        case "FWTime":
          vm.getEfficeRate_FW();
          vm.getEfficeList_FW();
          break;
        case "HQTime":
          vm.getEfficeRate_HQ();
          vm.getEfficeList_HQ();
          break;
      }
    },
    yjHsjcl(type) {
      this.tableDataRetry1 = [];
      this.tableDataRetry2 = [];
      this.isFwCheck = type == "fw";
      switch (type) {
        case "fw":
          this.getfwList();
          break;
        case "hq":
          this.gethqList();
          break;
      }
    },
    checkAll_RETRY() {
      //办文重发查看全部
      let params = {
        classes: "retryAll"
      };
      this.$emit("checkAll", params);
    },
    checkAll_BACK() {
      //办文退回查看全部
      let params = {
        classes: "backAll"
      };
      this.$emit("checkAll", params);
    },
    initEcharts() {
      if (!this.$echarts) return;
      this.BWZLCHARTS = this.$echarts.init(
        document.querySelector("#backChart")
      );
      this.BWXLCHARTS = this.$echarts.init(
        document.querySelector("#BWXLChart")
      );
    },
    initImageDom() {
      this.imageDom = document.querySelector("#imageDom");
    },
    initBWZLcharts(data) {
      //办文质量echarts图表
      let vm = this;
      let bwzlTop5AxisData = [];
      let bwzlTop5Data = [];
      vm.comLoad(vm.BWZLCHARTS);
      vm.BWZLCHARTS.clear();
      data.map(item => {
        bwzlTop5AxisData.push(item.deptName);
        bwzlTop5Data.push(vm.numFormater(item.backPercent, "percent"));
      });
      let optionBWZLTop5 = {
        tooltip: {
          show: true,
          formatter: function (params) {
            if (params.data)
              return (
                params.name + "：" + vm.numFormater(params.data, "percent")
              );
          }
        },
        xAxis: {
          data: bwzlTop5AxisData,
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#98FAFC",
              align: "center",
              fontSize: "11"
            },
            formatter: function (params) {
              if (params.length < 4) {
                return params;
              } else if (4 <= params.length && params.length < 8) {
                return (
                  params.substring(0, 4) +
                  "\n" +
                  params.substring(4, params.length)
                );
              } else {
                return (
                  params.substring(0, 4) + "\n" + params.substring(4, 7) + "..."
                );
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
                image: vm.imageDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: "repeat-y" // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              }
            }
          }
        },
        yAxis: {
          show: false
        },
        grid: {
          top: 20,
          bottom: 48
        },
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function (param) {
                  return ["{a|" + param.data + "}{b|%}"];
                },
                rich: {
                  a: {
                    color: "#FFD900",
                    fontSize: "13",
                    fontWeight: "bold"
                  },
                  b: {
                    color: "white",
                    fontSize: "11"
                  }
                }
              }
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#18F5FF" },
                  { offset: 1, color: "#188df0" }
                ])
              }
            },
            data: bwzlTop5Data
          }
        ]
      };
      vm.BWZLCHARTS.setOption(optionBWZLTop5);
      vm.BWZLCHARTS.hideLoading();
    },
    initBWXLcharts(data) {
      //办文效率echarts图表
      let vm = this;
      let bwxlTop5AxisData = [];
      let bwxlTop5Data = [];
      vm.comLoad(vm.BWXLCHARTS);
      vm.BWXLCHARTS.clear();
      data.map(item => {
        bwxlTop5AxisData.push(item.deptName);
        bwxlTop5Data.push(vm.numFormater(item.avgDay));
      });
      let optionBWXLTop5 = {
        tooltip: {
          show: true,
          formatter: function (params) {
            if (params.data)
              return params.name + "：" + vm.numFormater(params.data) + "天";
          }
        },
        xAxis: {
          data: bwxlTop5AxisData,
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#98FAFC",
              align: "center",
              fontSize: "11"
            },
            formatter: function (params) {
              if (params.length < 4) {
                return params;
              } else if (4 <= params.length && params.length < 8) {
                return (
                  params.substring(0, 4) +
                  "\n" +
                  params.substring(4, params.length)
                );
              } else {
                return (
                  params.substring(0, 4) + "\n" + params.substring(4, 7) + "..."
                );
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
                image: vm.imageDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: "repeat-y" // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              }
            }
          }
        },
        yAxis: {
          show: false
        },
        grid: {
          top: 20,
          bottom: 48
        },
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function (param) {
                  return ["{a|" + param.data + "}{b|天}"];
                },
                rich: {
                  a: {
                    color: "#FFD900",
                    fontSize: "13",
                    fontWeight: "bold"
                  },
                  b: {
                    color: "white",
                    fontSize: "11"
                  }
                }
              }
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#18F5FF" },
                  { offset: 1, color: "#188df0" }
                ])
              }
            },
            data: bwxlTop5Data
          }
        ]
      };
      vm.BWXLCHARTS.setOption(optionBWXLTop5);
      vm.BWXLCHARTS.hideLoading();
    },
    comLoad(eId) {
      eId.showLoading({
        text: "",
        color: "#4cbbff",
        textColor: "#4cbbff",
        maskColor: "rgba(0, 0, 0, 0.4)"
      });
    },
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
    echartsResize() {
      let vm = this;
      window.onresize = function () {
        vm.BWZLCHARTS.resize();
        vm.BWXLCHARTS.resize();
      };
    }
  },
  watch: {
    baseParams: {
      handler(val) {
        this.initData();
      },
      deep: true
    }
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
@qing: #01bcd3;
.righttWrapper {
  .Activeyj {
    background-color: @qing !important;
  }
  .label {
    height: 100%;
    text-align: right;
    color: @white;
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    padding-right: 30px;
  }
  .content {
    color: @yellow;
    text-align: right;
    font-size: 22px;
    font-weight: 700;
    margin-right: 10px;
    vertical-align: middle;
  }
  .header {
    height: 30px;
    box-sizing: border-box;
    background: #01bcd3;
    .fixtedBtn {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
    .title {
      padding-left: 20px;
      font-size: 16px;
      color: @white;
      line-height: 30px;
      font-weight: 700;
    }
    .YJtitle {
      cursor: pointer;
      text-align: center;
      padding-top: 0;
      background-color: #062762;
      flex: 1;
    }
    /deep/.el-tabs__item {
      height: 32px;
      line-height: 32px;
    }
    /deep/.el-tabs__active-bar {
      bottom: 0;
    }
  }
  .overView {
    height: 30px;
    box-sizing: border-box;
    .label {
      line-height: 30px;
      padding-right: 0;
      padding-left: 30px;
      text-align: left;
    }
    .content {
      margin: 0 0 0 5px;
      text-align: left;
    }
  }
  .tableCont {
    padding: 0 20px;
    /deep/.el-table {
      background-color: transparent;
      thead {
        width: 100%;
      }
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
  }
  .btn {
    text-align: right;
    padding-right: 10px;
    padding-top: 2px;
    .el-button {
      height: 26px;
      vertical-align: middle;
      background-color: transparent;
      color: @white;
      font-weight: 700;
    }
    .el-button:hover {
      background-color: rgba(45, 140, 219, 0.6);
    }
  }
  .bothSide {
    box-sizing: border-box;
    height: 40px;
    .titLine {
      height: 30px;
      display: inline-block;
      background-color: @yellow;
      width: 4px;
      margin-right: 10px;
      vertical-align: middle;
    }
    .sectionTitle {
      color: @white;
      font-size: 20px;
      line-height: 35px;
      font-weight: 900;
      margin-right: 5px;
      vertical-align: middle;
    }
    .help {
      color: @white;
      font-size: 22px;
      vertical-align: middle;
    }
  }
  #BWXLChart {
    margin-top: 10px;
  }
}
.ft-12 {
  font-size: 12px;
}
.wh100 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.h50 {
  height: 50%;
}
.h18 {
  height: 18%;
}
.h44 {
  height: 44%;
}
.h40 {
  height: calc(40% - 50px);
}
.linearBgc {
  background: linear-gradient(
    to bottom,
    rgba(20, 222, 252, 0.5),
    rgba(20, 222, 252, 0.1)
  );
}
.echartTitle {
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  color: @white;
  box-sizing: border-box;
}
/deep/.el-tabs__nav-wrap:after {
  height: 0;
}
/deep/.el-tabs__item {
  font-size: 15px;
  font-weight: 700;
  color: #ccc;
  padding: 0 10px;
}
/deep/.el-tabs__item.is-active {
  color: @white;
}
/deep/.el-tabs__active-bar {
  bottom: 5px;
  background-color: cyan;
}
.efficTable,
.qualityTable {
  position: absolute;
  top: 5px;
  right: 20px;
  width: 435px;
  height: 260%;
  background-color: #093c71;
  z-index: 100;
}
.efficTable {
  width: 336px;
  height: 100%;
}
.el-icon-question {
  cursor: pointer;
}
.helperWrapper {
  font-size: 14px;
  line-height: 25px;
  padding: 30px;
  background: transparent;
}
/deep/ .breakIndex > .cell {
  word-break: inherit !important;
}
.zxdbTableNoTable {
  height: 100%;
  background-color: #093c71;
  color: #fff;
  background: #093c71;
  text-align: center;
  line-height: 28px;
  .rankTitle {
    display: flex;
    width: 100%;
    background: #07628e;
    line-height: 2rem;
    font-size: 13px;
    color: #fff;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  ul > li > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .showAllZxdbUl {
    font-size: 13px;
    overflow: scroll;
    min-height: 150px;
    height: 80%;
  }
}
.zxdbTable {
  height: 200px;
  position: absolute;
  top: 5px;
  min-width: 110%;
  left: -20px;
  background-color: #093c71;
  z-index: 100;
  border: 1px solid #0089fb;
  color: #fff;
  background: #093c71;
  text-align: center;
  line-height: 28px;
  .rankTitle {
    display: flex;
    width: 100%;
    background: #07628e;
    line-height: 2rem;
    font-size: 13px;
    color: #fff;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  ul > li > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .showAllZxdbUl {
    font-size: 13px;
    overflow: scroll;
    height: 73%;
  }
  .el-button--mini {
    padding: 5px;
  }
}
#bwxlHot {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 0px 12px 0 13px;
  background: rgba(2, 114, 154, 0.5);
  min-height: 100px;
  height: 85%;
  overflow: hidden;
}
#bwxlHot .hotItem {
  font-weight: 900;
  margin: 5px 8px 10px 0;
  padding: 0 10px;
  border-top-left-radius: 20% 50%;
  border-top-right-radius: 20% 50%;
  border-bottom-left-radius: 20% 50%;
  border-bottom-right-radius: 20% 50%;
}
/deep/ .bhDetails .el-dialog__body {
  background-color: #03417e;
}
</style>