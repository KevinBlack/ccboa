<template>
  <div class="leftWrapper wh100">
    <!-- 总行相关 -->
    <div class="wh100" v-show="baseParams.activeName=='headOffice'">
      <el-row class="h50">
        <el-row class="h50 linearBgc">
          <el-row class="h25">
            <el-col :span="12" class="label">督查办</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDB.totalCount}}</span>件
            </el-col>
          </el-row>
          <el-row class="h25">
            <el-col :span="12" class="label">已反馈</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDB.yfkCount}}</span>件
            </el-col>
          </el-row>
          <el-row class="h25">
            <el-col :span="12" class="label">平均办理天数</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDB.avgWorkTime}}</span>天
            </el-col>
          </el-row>
          <el-row class="h25">
            <el-col :span="12" class="label">反馈率</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDB.fkRate}}</span>%
            </el-col>
          </el-row>
        </el-row>
        <el-row class="h50 linearBgc">
          <el-row class="h25">
            <el-col :span="12" class="label">按时反馈</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDB.asfkCount}}</span>件
            </el-col>
          </el-row>
          <el-row class="h25">
            <el-col :span="12" class="label">超时反馈</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDB.csfkCount}}</span>件
            </el-col>
          </el-row>
          <el-row class="h25">
            <el-col :span="12" class="label">超时在办</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDB.cszbCount}}</span>件
            </el-col>
          </el-row>
          <el-row class="h25">
            <el-col :span="12" class="label">时限内在办</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDB.zbCount}}</span>件
            </el-col>
          </el-row>
        </el-row>
      </el-row>
      <el-row class="h50 linearBgc" style="padding:0 20px;">
        <el-row>
          <el-col :span="16">
            <el-tabs v-model="type" @tab-click="tabsClickZH" style="height:30px">
              <el-tab-pane label="平均办理天数" name="avgDays"></el-tab-pane>
              <el-tab-pane label="反馈率" name="feedBackL"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="8" class="btn" style="padding-top:10px">
            <el-button type="plain" size="mini" id="allZHBtn" @click="allZH">查看全部</el-button>
          </el-col>
        </el-row>
        <div class="wh100" style="height:calc(100% - 40px); padding-top:10px;position:relative;">
          <div class="h50">
            <div class="echartTitle">TOP5</div>
            <div style="height:calc(100% - 25px)" id="TOP5"></div>
          </div>
          <div class="h50">
            <div class="echartTitle">BOTTOM5</div>
            <div style="height:calc(100% - 25px)" id="BOTTOM5"></div>
          </div>
          <div class="zxdbTable" v-show="ZXDBTableShow">
            <div class="rankTitle" v-if="type=='avgDays'">
              <div style="width: 10%;">排名</div>
              <div style="width: 30%;">部门</div>
              <div style="width: 15%;">件数</div>
              <div style="width: 25%;" title="平均办理天数">平均办理天数</div>
              <div style="width: 20%;">操作</div>
            </div>
            <ul class="width100 showAllZxdbUl" tabindex="5" v-if="type=='avgDays'">
              <li class="width100" style="display: flex;" v-for="(item,index) in zxdbDataListAvg" :key="index">
                <div style="width: 15%;">{{index+1}}</div>
                <div :title="item.dept_name" style="width: 40%;">{{item.dept_name}}</div>
                <div :title="item.order_count" style="width: 15%;">{{item.order_count}}件</div>
                <div style="width: 30%;">{{item.total_cost}}天</div>
                <div style="width: 20%;">
                  <el-button size="mini" type="primary" @click="getBhDetails(item)" v-preventClick>查看详情</el-button>
                </div>
              </li>
            </ul>
            <div class="rankTitle" v-if="type!='avgDays'">
              <div style="width: 10%;">排名</div>
              <div style="width: 30%;">部门</div>
              <div style="width: 15%;">件数</div>
              <div style="width: 25%;">反馈率</div>
              <div style="width: 20%;">操作</div>
            </div>
            <ul class="width100 showAllZxdbUl" tabindex="5" v-if="type!='avgDays'">
              <li class="width100" style="display: flex;" v-for="(item,index) in zxdbDataListFkRate" :key="index">
                <div style="width: 10%;">{{index+1}}</div>
                <div style="width: 30%;" :title="item.dept_name">{{item.dept_name}}</div>
                <div style="width: 15%;" :title="item.order_count">{{item.order_count}}件</div>
                <div style="width: 25%;">{{item.bj_rate}}%</div>
                <div style="width: 20%;">
                  <el-button size="mini" type="primary" @click="getBhDetails(item)" v-preventClick>查看详情</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-row>
    </div>
    <!-- 一级分行相关 -->
    <div class="wh100" v-show="baseParams.activeName=='subBank'">
      <el-row class="h50" style="height:40%;">
        <el-col :span="8" class="btn" style="padding-top:10px;right: 0;top: -16%;position: absolute;">
          <el-button type="plain" size="mini" id="allZHBtn" @click="allYJ">查看全部</el-button>
        </el-col>
        <el-row class="h50 linearBgc">
          <el-row class="h25">
            <el-col :span="12" class="label">督查办</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDBYJFH. total_count}}</span>件
            </el-col>
          </el-row>
          <el-row class="h25">
            <el-col :span="12" class="label">已反馈</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDBYJFH.fk_count}}</span>件
            </el-col>
          </el-row>
          <el-row class="h25">
            <el-col :span="12" class="label">平均办理天数</el-col>
            <el-col :span="12" class="label">
              <span class="content">{{ZXDBYJFH.avg_work_time}}</span>天
            </el-col>
          </el-row>
          <div class="zxdbTable" v-show="ZXDBTableShowYj">
            <div class="rankTitle">
              <div style="width: 15%;">排名</div>
              <div style="width: 30%;" title="机构名称">机构名称</div>
              <div style="width: 15%;">件数</div>
              <div style="width: 20%;" title="平均办理天数">平均办理天数</div>
              <div style="width: 20%;">反馈率</div>
            </div>
            <ul class="width100 showAllZxdbUl" tabindex="5">
              <li class="width100" style="display: flex;" v-for="(item,index) in zxdbDataListYJ" :key="index">
                <div style="width: 15%;">{{index+1}}</div>
                <div :title="item.org_name" style="width: 30%;">{{item.org_name}}</div>
                <div :title="item.fk_count" style="width: 15%;">{{item.fk_count}}件</div>
                <div style="width: 20%;">{{item.avg_work_time}}天</div>
                <div style="width: 20%;">{{item.fk_rate}}</div>
                <!---->
              </li>
            </ul>
          </div>
        </el-row>
        <el-row class="h50 linearBgc" style="height:50%;">
          <div style="height:100%" id="YJZZT"></div>
        </el-row>
      </el-row>
      <el-row class="bothSide">
        <span class="titLine"></span>
        <span class="sectionTitle">{{leftTitleBottom}}</span>
        <el-tooltip placement="bottom-start" :visible-arrow="false" popper-class="tooltipWrapper">
          <div slot="content" class="helperWrapper" v-html="`
        一、退文率：办结文退回次数/办结发文总数<br/>
        二、重发率：办结文重发次数/办结发文总数`"></div>
          <span class="help el-icon-question"></span>
        </el-tooltip>
      </el-row>
      <el-row class="h50 linearBgc" style="padding:0 20px;">
        <el-row>
          <el-col :span="24">
            <div style="height:calc(100% - 40px);display:flex">
              <div @click="tabsClickZHYJ('tw')" class="yjBox" :class="{Activeyj:YJActive == true}">
                退文率<br><span class="YjPreColor">{{YJLeftBottom.backYoy}}</span>
              </div>
              <div @click="tabsClickZHYJ('cf')" class="yjBox" :class="{Activeyj:YJActive== false}">
                重发率<br><span class="YjPreColor">{{YJLeftBottom.againYoy}}</span>
              </div>
            </div>

          </el-col>
          <el-col :span="24" class="btn" style="padding-top:10px;text-align:right">
            <el-button type="plain" size="mini" @click="YJzxdbTable = !YJzxdbTable">查看全部</el-button>
          </el-col>
        </el-row>
        <div class="wh100" style="height:calc(100% - 51px); padding-top:10px;position:relative;">
          <div class="h50">
            <div class="echartTitle">TOP5</div>
            <div style="height:calc(100% - 25px)" id="TOP5YJ"></div>
          </div>
          <div class="h50">
            <div class="echartTitle">BOTTOM5</div>
            <div style="height:calc(100% - 25px)" id="BOTTOM5YJ"></div>
          </div>
          <div class="zxdbTable" v-show="YJzxdbTable">
            <div class="rankTitle" v-if="YJActive == true">
              <div style="width: 15%;">排名</div>
              <div style="width: 40%;">机构名称</div>
              <div style="width: 15%;">件数</div>
              <div style="width: 30%;" title="退文率">退文率</div>
            </div>
            <ul class="width100 showAllZxdbUl" tabindex="5" v-if="YJActive == true">
              <li class="width100" style="display: flex;" v-for="(item,index) in zxdbDataListYJtop" :key="index">
                <div style="width: 15%;">{{index+1}}</div>
                <div :title="item.org_name" style="width: 40%;">{{item.org_name}}</div>
                <div :title="item.orderCou" style="width: 15%;">{{item.orderCou}}件</div>
                <div style="width: 30%;">{{item.orderPercent}}</div>
                <!---->
              </li>
            </ul>
            <div class="rankTitle" v-if="YJActive != true">
              <div style="width: 15%;">排名</div>
              <div style="width: 40%;">机构名称</div>
              <div style="width: 15%;">件数</div>
              <div style="width: 30%;">反馈率</div>
            </div>
            <ul class="width100 showAllZxdbUl" tabindex="5" v-if="YJActive != true">
              <li class="width100" style="display: flex;" v-for="(item,index) in zxdbDataListYJbottom" :key="index">
                <div style="width: 15%;">{{index+1}}</div>
                <div :title="item.org_name" style="width: 40%;">{{item.org_name}}</div>
                <div :title="item.orderCou" style="width: 15%;">{{item.orderCou}}件</div>
                <div style="width: 30%;">{{item.orderPercent}}</div>
                <!---->
              </li>
            </ul>
          </div>
        </div>
      </el-row>
    </div>
    <!-- 本部门相关 -->
    <div class="wh100" v-show="baseParams.activeName=='mineDept'">
      <el-row class="h50 linearBgc">
        <el-row class="header">
          <el-col :span="8" class="title">发文处理时间</el-col>
          <el-col :span="8" class="deptTabs">
            <el-tabs v-model="typeFW" @tab-click="tabsClickDEPT_FW" style="height:30px">
              <el-tab-pane label="未办结" name="todoFW"></el-tab-pane>
              <el-tab-pane label="已办结" name="doneFW"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="8" class="btn">
            <el-button type="plain" size="mini" @click="checkAll_FW">查看全部</el-button>
          </el-col>
        </el-row>
        <el-row class="overView">
          <el-col :span="12" class="label">
            平均
            <span class="content">{{avgFw}}</span> 天
          </el-col>
          <el-col :span="12" v-if='yoyFW' class="label" style="padding-left:50px;">
            同比
            <span v-if='yoyFW>0' class="el-icon-top" style="color:red;"></span>
            <span v-else-if="yoyFW<0" class="el-icon-bottom" style="color:greenyellow;"></span>
            <span class="content">{{yoyFW}}</span>
          </el-col>
        </el-row>
        <el-row class="tableCont" style="height:70%;">
          <el-col :span="24" class="h100">
            <el-table :data="tableDataFW" height="100%" :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',border:'1px soild #ccc'}">
              <el-table-column show-overflow-tooltip width="50" type="index" class="breakIndex" align="center" label="序号"></el-table-column>
              <el-table-column show-overflow-tooltip :prop="typeFW=='doneFW'?'sendTime':'draftTime'" :label="typeFW=='doneFW'?'发文日期':'拟稿日期'" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="documentNo" label="发文字号" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip :prop="typeFW=='doneFW'?'wDay':'wDay'" :label="typeFW=='doneFW'?'平均处理时间':'已处理时间'" align="center"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="h50 linearBgc">
        <el-row class="header">
          <el-col :span="8" class="title" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="会签处理时间">会签处理时间</el-col>
          <el-col :span="8" class="deptTabs">
            <el-tabs v-model="typeHQ" @tab-click="tabsClickDEPT_HQ" style="height:30px">
              <el-tab-pane label="未办结" name="todoHQ"></el-tab-pane>
              <el-tab-pane label="已办结" name="doneHQ"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="8" class="btn">
            <el-button type="plain" size="mini" @click="checkAll_HQ">查看全部</el-button>
          </el-col>
        </el-row>
        <el-row class="overView">
          <el-col :span="12" class="label">
            平均
            <span class="content">{{avgHQ}}</span> 天
          </el-col>
          <el-col :span="12" v-if="yoyHQ" class="label" style="padding-left:50px;">
            同比
            <span v-if='yoyHQ>0' class="el-icon-top" style="color:red;"></span>
            <span v-else-if="yoyHQ<0" class="el-icon-bottom" style="color:greenyellow;"></span>
            <span class="content">{{yoyHQ}}</span>
          </el-col>
        </el-row>
        <el-row class="tableCont">
          <el-col :span="24" class="h100">
            <el-table :data="tableDataHQ" height="100%" :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',border:'1px soild #ccc'}">
              <el-table-column show-overflow-tooltip class="breakIndex" width="50" type="index" align="center" label="序号"></el-table-column>
              <el-table-column show-overflow-tooltip :prop="typeHQ=='doneHQ'?'finishTime':'draftTime'" :label="typeHQ=='doneHQ'?'办结日期':'会签日期'" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="documentNo" label="发文字号" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip :prop="typeHQ=='doneHQ'?'wDay':'wDay'" :label="typeHQ=='doneHQ'?'平均处理时间':'已处理时间'" align="center"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="h33 linearBgc" v-if="false">
        <el-row class="header">
          <el-col :span="12" class="title">待办稍后处理</el-col>
          <el-col :span="12" class="btn">
            <el-button type="plain" size="mini" @click="checkAll_Delay">查看全部</el-button>
          </el-col>
        </el-row>
        <el-row class="tableCont" style="height: calc(100% - 88px);">
          <el-table :data="tableDataDelay" height="100%" :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',border:'1px soild #ccc'}">
            <el-table-column class="breakIndex" width="50" type="index" align="center" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="处室" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="点击次数" align="center"></el-table-column>
          </el-table>
        </el-row>
      </el-row>
    </div>
    <el-dialog class=" bhDetails" :visible.sync="bhDetailsAllShow" :modal-append-to-body="false" width="80%" :title="bhDetailsDialogTitle">
      <bhDetails v-if="bhDetailsAllShow" :processInstId="bhDetailsProcessInstIdRow" :bhType="bhType" :postType="postType" ref="bhDetails"></bhDetails>
    </el-dialog>
    <img src="../../../assets/images/shuju.png" id="imageDom" style="display:none;" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import bhDetails from 'views/common/components/bhDetails';
export default {
  data() {
    return {
      bhType: "5",
      postType: "",
      bhDetailsAllShow: false, //显示查看详情弹窗
      bhDetailsDialogTitle: '部门整体效率——办结率',//查看详情弹窗标题
      bhDetailsProcessInstIdRow: '',
      YJzxdbTable: false,
      YJZZT: "",
      type: "avgDays", //avgDays--平均办理天数；feedBackL---反馈率
      typeFW: "doneFW", //todoFW:未办结； doneFW:已办结
      typeHQ: "doneHQ", //todoHQ:未办结； doneHQ:已办结
      avgFw: "",
      avgHQ: "",
      yoyHQ: "",
      yoyFW: "",
      ZXDB: {//专项督办overViews数据
        totalCount: "",//督办件数
        yfkCount: "",	//已反馈件数
        avgWorkTime: "",	//平均办理天数
        fkRate: "",		//反馈率
        asfkCount: "",	//按时反馈
        csfkCount: "",	//超时反馈
        cszbCount: "", //超时在办
        zbCount: "",   //时限内在办
      },
      ZXDBYJFH: {
        total_count: '',//督查办
        fk_count: '',//已反馈
        fk_rate: '',//反馈率
        avg_work_time: '',//平均办理天数
      },
      xjh_undertakeList: {
        xjh_undertakeList: '',//平均办理天数
        sort: '',//平均办理天数
        org_name: '',//平均办理天数
        fk_count: '',//平均办理天数
        avg_work_time: '',//平均办理天数
        fk_rate: '',//平均办理天数
      },
      postObj: {
        function: "efflciencySendOrderDetails",
        deptIds: "",
        year: "",
        // timeType:'',
        quarter: "",
        month: "",
        state: 1,
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount: 0
      },
      tableDataFW: [],
      tableDataHQ: [],
      tableDataDelay: [],
      zxdbDataListAvg: [],
      zxdbDataListYJtop: [],
      zxdbDataListYJbottom: [],
      zxdbDataListFkRate: [],
      zxdbDataListYJ: [],
      ZXDBTOP5: "",
      ZXDBBOTTOM5: "",
      iamgeDom: "",
      ZXDBTableShow: false,
      ZXDBTableShowYj: false,
      leftTitleBottom: "办文质量",
      middleTitleHelper: "",
      YJActive: true,//是否退文率
      YJLeftBottom: {
        backYoy: "",
        againYoy: "",
      },
      BOTTOM5YJ: '',
      TOP5YJ: '',
    };
  },
  components: {
    bhDetails
  },
  computed: {
    ...mapGetters("efficiency", ["baseParams", "explainText"])
  },
  methods: {
    initData() {
      this.middleTitleHelper = this.explainText.bwxl;
      if (this.baseParams.activeName == "headOffice") {
        this.getDataList_ZXDB();
      } else if (this.baseParams.activeName == "subBank") {
        this.getDataList_ZXDBYJ();
        this.getBwzltwList();
        this.getBwzlcfList();
      } else {
        this.postObj.year = this.baseParams.year;
        this.postObj.deptIds = this.baseParams.deptIds;
        this.postObj.quarter = this.baseParams.quarter;
        this.postObj.month = this.baseParams.month;
        this.initFWCLSJ();
        this.initHQCLSJ();
        this.initHQ();
        this.initFW();
      }
    },
    tabsClickZH(tab) {
      localStorage.setItem('bl', tab.name)
      localStorage.setItem('blt', '0')
      let vm = this;
      switch (tab.name) {
        case "avgDays":
          vm.refreshEcharts(vm.zxdbDataListAvg)
          break;
        case "feedBackL":
          vm.refreshEcharts(vm.zxdbDataListFkRate)
          break;
      }
    },
    getBhDetails(item) {
      this.bhDetailsProcessInstIdRow = item.dept_id;
      if (this.type === "avgDays") {
        this.bhDetailsDialogTitle = "专项督办——平均办理天数";
        this.postType = '4';
      } else if (this.type === "feedBackL") {
        this.bhDetailsDialogTitle = "专项督办——反馈率";
        this.postType = '5';
      }
      this.ZXDBTableShow = !this.ZXDBTableShow;
      this.bhDetailsAllShow = true;
    },
    tabsClickZHYJ(tab) {
      this.YJActive = !this.YJActive;
      let vm = this;
      switch (tab) {
        case "tw":
          vm.getBwzltwList();
          break;
        case "cf":
          this.topYJ(this.getTop5(this.zxdbDataListYJbottom));
          this.bottomYJ(this.getBottom5(this.zxdbDataListYJbottom));
          break;
      }
    },
    initFWCLSJ() {//办文效率发文   --列表
      this.postObj.function = "efflciencySendOrderDetails";
      this.$post
        .postData(
          this.postObj.function,
          JSON.stringify(this.postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.tableDataFW = res.data.rows;
            this.tableDataFW.forEach((item) => {
              item.wDay += '天'
            })
          }
        });
    },
    winitFW(fun) {//办文效率发文   未办结平均天
      let postObj = {
        function: "efflciencySendOrderDetailsAvg",
        deptIds: this.baseParams.deptIds,
        year: this.baseParams.year,
        // timeType:'',
        quarter: this.baseParams.quarter,
        month: this.baseParams.month,
        state: '0',
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount: 0
      };
      this.$post
        .postData(
          postObj.function,
          JSON.stringify(postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.avgFw = res.data.avg;
            this.yoyFW = '';

          }
        });
    },
    initFW(fun) {//办文效率发文  办结平均天
      let postObj = {
        function: "efflciencySendOrderAvg",
        deptIds: this.baseParams.deptIds,
        year: this.baseParams.year,
        quarter: this.baseParams.quarter,
        month: this.baseParams.month,
        // state: '0',
        // page: 1, //当前页数
        // limit: 10, //每页条数
        // totalCount: 0
      };
      this.$post
        .postData(
          postObj.function,
          JSON.stringify(postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.avgFw = res.data.avg;
            this.yoyFW = res.data.yoy;
          }
        });
    },
    winitHQ(fun) { //办文效率发文会签 未办结平均天
      let postObj = {
        function: "efflciencySignOrderDetailsAvg",
        deptIds: this.baseParams.deptIds,
        year: this.baseParams.year,
        // timeType:'',
        quarter: this.baseParams.quarter,
        month: this.baseParams.month,
        // state: 0,
        // page: 1, //当前页数
        // limit: 10, //每页条数
        // totalCount: 0
      };
      this.$post
        .postData(
          postObj.function,
          JSON.stringify(postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.avgHQ = res.data.avg;
            this.yoyHQ = '';
          }
          // this.tb=res.data.tb;
          // this.totalBjRate=res.data.totalBjRate;
        });
    },
    initHQ(fun) {//办文效率发文会签 办结平均天
      let postObj = {
        function: "efflciencySignOrderAvg",
        deptIds: this.baseParams.deptIds,
        year: this.baseParams.year,
        quarter: this.baseParams.quarter,
        month: this.baseParams.month,
      };
      this.$post
        .postData(
          postObj.function,
          JSON.stringify(postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.avgHQ = res.data.avg;
            this.yoyHQ = res.data.yoy;
          }
        });
    },
    initHQCLSJ() {//办文效率发文 --列表
      this.postObj.function = "efflciencySignOrderDetails";
      this.$post
        .postData(
          this.postObj.function,
          JSON.stringify(this.postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.tableDataHQ = res.data.rows;
            this.tableDataHQ.forEach((item) => {
              item.wDay += '天'
            })
          }
        });
    },

    tabsClickDEPT_FW(tab) {//本部门-发文处理时间列表查询
      this.postObj.state = tab.index;
      this.tableDataFW = [];
      sessionStorage.setItem('XNKBTABFW', tab.index)
      if (tab.index == 0) {
        this.winitFW();
      } else {
        this.initFW();
      }
      this.initFWCLSJ();
    },
    tabsClickDEPT_HQ(tab) {//本部门-会签处理时间列表查询
      this.postObj.state = tab.index;
      this.tableDataHQ = [];
      sessionStorage.setItem('XNKBTABHQ', tab.index)
      if (tab.index == 0) {
        this.winitHQ();
      } else {
        this.initHQ();
      }
      this.initHQCLSJ();
    },
    allZH() {//总行办文质量查看全部:TODO
      this.ZXDBTableShow = !this.ZXDBTableShow;
      let vm = this;
      document.onclick = function (e) {
        let dom = $("#allZHBtn");
        let wrapper = $(".zxdbTable");
        if (!dom.is(e.target) && dom.has(e.target).length === 0 && wrapper.has(e.target).length === 0) {
          vm.ZXDBTableShow = false;
        }
      }
    },
    allYJ() {
      this.ZXDBTableShowYj = !this.ZXDBTableShowYj;
      // let vm = this;
      // document.onclick = function(e){
      //   let dom = $("#allZHBtn");
      //   let wrapper = $(".zxdbTable");
      //   if(!dom.is(e.target)&&dom.has(e.target).length === 0&&wrapper.has(e.target).length === 0){
      //     vm.ZXDBTableShowYj = false;
      //   }
      // }
    },
    checkAll_FW() {//发文-查看全部
      let params = {
        classes: "FWAll"
      };
      this.$emit("checkAll", params);
    },
    checkAll_HQ() { //会签-查看全部
      let params = {
        classes: "HQAll"
      };
      this.$emit("checkAll", params);
    },
    checkAll_Delay() { //待办-查看全部
      let params = {
        classes: "delayAll"
      };
      this.$emit("checkAll", params);
    },
    initEcharts() { //echarts初始化
      if (this.baseParams.activeName == "headOffice") {
        if (!this.$echarts) return
        this.ZXDBTOP5 = this.$echarts.init(document.querySelector("#TOP5"));
        this.ZXDBBOTTOM5 = this.$echarts.init(document.querySelector("#BOTTOM5"));
      } else if (this.baseParams.activeName == "subBank") {

      }
    },
    initImageDom() { //charts 背景
      this.imageDom = document.querySelector("#imageDom");
    },
    initZXDBTOP5(data) {//top5 echarts
      var vm = this;
      let Top5xAxisData = [];
      let Top5Data = [];
      vm.comLoad(vm.ZXDBTOP5);
      vm.ZXDBTOP5.clear();
      for (var i = 0; i < data.length; i++) {
        Top5xAxisData.push(data[i].dept_name);
        if (vm.type == "avgDays") {
          Top5Data.push(vm.numFormater(data[i].total_cost));
        } else {
          Top5Data.push(vm.numFormater(data[i].bj_rate, "percent"));
        }
      }
      let optionlTop5 = {
        tooltip: {
          show: true,
          formatter: function (params) {
            let mouseHover = "";
            if (vm.type == "avgDays") {
              mouseHover = vm.numFormater(params.data) + "天";
            } else {
              mouseHover = vm.numFormater(params.data, "percent") + "%";
            }
            if (params.data) {
              return (
                params.name +
                "：" +
                mouseHover
              );
            }

          }
        },
        xAxis: {
          data: Top5xAxisData,
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
                image: vm.imageDom, // 支持为 HTMLImageElement, HTMLElement，不支持路径字符串
                repeat: "repeat-y" // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              }
            }
          }
        },
        yAxis: {
          show: false
        },
        grid: {
          top: "20px",
          bottom: "36px"
        },
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function (param) {
                  if (vm.type == "avgDays") {
                    return ["{a|" + param.data + "}{b|天}"];
                  } else {
                    return ["{a|" + param.data + "}{b|%}"];
                  }
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
            data: Top5Data
          }
        ]
      };
      vm.ZXDBTOP5.setOption(optionlTop5);
      vm.ZXDBTOP5.hideLoading();
    },
    initZXDBBOTTOM5(data) { //bottom echarts
      var vm = this;
      let bottom5xAxisData = [];
      let bottom5Data = [];
      vm.comLoad(vm.ZXDBBOTTOM5);
      vm.ZXDBBOTTOM5.clear();
      for (var i = 0; i < data.length; i++) {
        bottom5xAxisData.push(data[i].dept_name);
        if (vm.type == "avgDays") {
          bottom5Data.push(vm.numFormater(data[i].total_cost));
        } else {
          bottom5Data.push(vm.numFormater(data[i].bj_rate, "percent"));
        }
      }
      let optionlBottom5 = {
        tooltip: {
          show: true,
          formatter: function (params) {
            if (params.data)
              return (
                params.name +
                "：" +
                (vm.type == "avgDays"
                  ? vm.numFormater(params.data) + "天"
                  : vm.numFormater(params.data, "percent") + "%")
              );
          }
        },
        xAxis: {
          data: bottom5xAxisData,
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
          top: "20px",
          bottom: "36px"
        },
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function (param) {
                  if (vm.type == "avgDays") {
                    return ["{a|" + param.data + "}{b|天}"];
                  } else {
                    return ["{a|" + param.data + "}{b|%}"];
                  }
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
                  { offset: 0, color: "#DC0F78" },
                  { offset: 1, color: "#0997F2" }
                ])
              }
            },
            data: bottom5Data
          }
        ]
      };
      vm.ZXDBBOTTOM5.setOption(optionlBottom5);
      vm.ZXDBBOTTOM5.hideLoading();
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
    echartsResize() { //echarts 重载
      let vm = this;
      window.onresize = function () {
        vm.ZXDBTOP5.resize();
        vm.ZXDBBOTTOM5.resize();
        vm.YJZZT.resize();
      };
    },
    getDataList_ZXDB() {
      let params = Object.assign({}, this.baseParams);
      params.function = "selectSuperviseDataXNKB"
      this.$post.postData("selectSuperviseDataXNKB", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if (res.success) {
          this.ZXDB.totalCount = res.data.totalCount;
          this.ZXDB.yfkCount = res.data.yfkCount;
          if (res.data.avgWorkTime != '-') {
            this.ZXDB.avgWorkTime = res.data.avgWorkTime.toFixed(2);
          } else {
            this.ZXDB.avgWorkTime = res.data.avgWorkTime
          }

          this.ZXDB.fkRate = res.data.fkRate;
          this.ZXDB.asfkCount = res.data.asfkCount;
          this.ZXDB.csfkCount = res.data.csfkCount;
          this.ZXDB.cszbCount = res.data.cszbCount;
          this.ZXDB.zbCount = res.data.zbCount;
          this.zxdbDataListAvg = res.data.avgWorkTimeList || [];
          this.zxdbDataListFkRate = res.data.fkRateList || [];
          this.refreshEcharts(this.zxdbDataListAvg);
        }
      })
    },
    getDataList_ZXDBYJ() {
      let params = Object.assign({}, this.baseParams);
      params.function = "selectSuperviseUndertakeDataXNKB"
      this.$post.postData("selectSuperviseUndertakeDataXNKB", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if (res.success) {
          this.ZXDBYJFH.total_count = res.data.xjh_supervise.total_count;
          this.ZXDBYJFH.fk_count = res.data.xjh_supervise.fk_count;
          if (res.data.avg_work_time != '-') {
            this.ZXDBYJFH.avg_work_time = res.data.xjh_supervise.avg_work_time
            //this.ZXDBYJFH.avg_work_time = res.data.xjh_supervise.avg_work_time.toFixed(2);
          } else {
            this.ZXDBYJFH.avg_work_time = res.data.xjh_supervise.avg_work_time
          }
          this.zxdbDataListYJ = res.data.xjh_undertakeList || [];
          let newData = res;

          let yjzzData = [];
          this.YJZZT = this.$echarts.init(document.querySelector("#YJZZT"));
          this.YJZZT.clear();
          this.comLoad(this.YJZZT);
          yjzzData = [this.numFormater(parseInt(newData.data.xjh_supervise.fk_rate) * 100),
          this.numFormater((10000 - parseInt(newData.data.xjh_supervise.fk_rate) * 100))];
          setTimeout(() => {
            this.YJZZT.setOption({
              title: {
                show: true,
                text: '反馈率\n' + newData.data.xjh_supervise.fk_rate,
                left: 'center',
                top: 'center',
                textStyle: {
                  fontSize: 16,
                  fontStyle: "normal",
                  color: '#e4393c'
                }
              },
              tooltip: {
                trigger: 'item',
                show: false,
              },
              legend: {
                show: false,
                orient: 'vertical',
                letf: 10,
              },
              series: [{
                name: "办结率",
                hoverAnimation: false, //鼠标移入变大
                type: "pie",
                radius: ['70%', '90%'],
                label: {
                  show: false,
                  position: 'center'
                },
                data: yjzzData,
                color: ['#51cec6', '#ffb703'],
              },
              ]
            });
            this.YJZZT.hideLoading();
          }, 1000);
        }
      })
    },
    getBwzltwList() {//退文列表及退文率
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySuperBack"
      this.$post.postData("efflciencySuperBack", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if (res.success) {
          this.YJLeftBottom.backYoy = res.data.backYoy;
          this.zxdbDataListYJtop = res.data.dataList || [];
          this.topYJ(this.getTop5(this.zxdbDataListYJtop));
          this.bottomYJ(this.getBottom5(this.zxdbDataListYJtop));
        }
      })
    },
    getBwzlcfList() {//重发列表及退文率
      let params = Object.assign({}, this.baseParams);
      params.function = "efflciencySuperAgain"
      this.$post.postData("efflciencySuperAgain", JSON.stringify(params), this.$businessCode.xnkb).then(res => {
        if (res.success) {
          this.YJLeftBottom.againYoy = res.data.againYoy;
          this.zxdbDataListYJbottom = res.data.dataList || [];
        }
      })
    },
    topYJ(data) {
      //YJActive == true退文
      this.TOP5YJ = this.$echarts.init(document.querySelector("#TOP5YJ"));
      let Top5xAxisData = [];
      let Top5Data = [];
      this.comLoad(this.TOP5YJ);
      this.TOP5YJ.clear();
      for (var i = 0; i < data.length; i++) {
        Top5xAxisData.push(data[i].org_name);
        Top5Data.push(this.numFormater(data[i].orderPercent, "percent"));
      }
      let optionlTop5 = {
        tooltip: {
          show: true,
          formatter: function (params) {
            if (params.data) {
              return (
                params.name +
                "：" +
                params.data + '%'
              );
            }

          }
        },
        xAxis: {
          data: Top5xAxisData,
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
                image: this.imageDom, // 支持为 HTMLImageElement, HTMLElement，不支持路径字符串
                repeat: "repeat-y" // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              }
            }
          }
        },
        yAxis: {
          show: false
        },
        grid: {
          top: "20px",
          bottom: "36px"
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
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#18F5FF" },
                  { offset: 1, color: "#188df0" }
                ])
              }
            },
            data: Top5Data
          }
        ]
      };
      this.TOP5YJ.setOption(optionlTop5);
      this.TOP5YJ.hideLoading();
    },
    bottomYJ(data) {
      this.BOTTOM5YJ = this.$echarts.init(document.querySelector("#BOTTOM5YJ"));
      let bottom5xAxisData = [];
      let bottom5Data = [];
      this.comLoad(this.BOTTOM5YJ);
      this.BOTTOM5YJ.clear();
      for (var i = 0; i < data.length; i++) {
        bottom5xAxisData.push(data[i].org_name);
        bottom5Data.push(this.numFormater(data[i].orderPercent, "percent"));
      }
      let optionlBottom5 = {
        tooltip: {
          show: true,
          formatter: function (params) {
            if (params.data)
              return (
                params.name +
                "：" +
                params.data + '%'
              );
          }
        },
        xAxis: {
          data: bottom5xAxisData,
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
                image: this.imageDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: "repeat-y" // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              }
            }
          }
        },
        yAxis: {
          show: false
        },
        grid: {
          top: "20px",
          bottom: "36px"
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
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#DC0F78" },
                  { offset: 1, color: "#0997F2" }
                ])
              }
            },
            data: bottom5Data
          }
        ]
      };
      this.BOTTOM5YJ.setOption(optionlBottom5);
      this.BOTTOM5YJ.hideLoading();
    },
    refreshEcharts(list) {
      let top5 = this.getTop5(list);
      let bottom5 = this.getBottom5(list);
      if (localStorage.getItem('blt') == '1') {
        this.type = "avgDays"
      }
      this.initZXDBTOP5(top5);
      this.initZXDBBOTTOM5(bottom5);
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
        this.initEcharts();
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
  },
};
</script>
<style lang="less" scoped>
@yellow: #feec01;
@white: #fff;
@qing: #01bcd3;
.leftWrapper {
  .Activeyj {
    background-color: @qing;
  }
  .yjBox {
    padding-top: 5px;
    line-height: 26px;
    cursor: pointer;
    flex: 1;
    text-align: center;
    color: @white;
    font-weight: 700;
    font-size: 16px;
    .YjPreColor {
      color: @yellow;
      font-size: 20px;
    }
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
    .title {
      padding-left: 20px;
      font-size: 16px;
      color: @white;
      line-height: 30px;
      font-weight: 700;
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
    height: calc(100% - 70px);
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
          padding: 0;
        }
      }
      tr {
        width: 101%;
        display: table;
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
  /deep/ .bhDetails .el-dialog__body {
    background-color: #03417e;
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
.h33 {
  height: 33%;
}
.h25 {
  height: 25%;
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
.zxdbTable {
  height: 200px;
  position: absolute;
  top: 5px;
  min-width: 110%;
  left: -15px;
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
    min-height: 150px;
    height: 87%;
  }
  .el-button--mini {
    padding: 5px;
  }
}

/deep/ .breakIndex > .cell {
  word-break: inherit !important;
}
.bothSide {
  padding-top: 20px;
  box-sizing: border-box;
  height: 60px;
  .titLine {
    margin-left: 5px;
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
    vertical-align: middle;
    margin-right: 5px;
  }
  .help {
    color: @white;
    font-size: 22px;
    vertical-align: middle;
  }
}
</style>
