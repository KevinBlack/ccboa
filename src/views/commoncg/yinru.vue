<template>
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <h2 style class="title-h1">{{formdata.deptTableHeader}}常规用印审批单</h2>
        <el-button class="printButton" @click="printThis()" type="info" plain v-if="show">打印</el-button>
        <!-- <el-button class="printButton1" @click="backDarft()" type="info" plain>返回</el-button> -->
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody id="tbodys">
          <tr style="height: 32px;" id="0">
            <td style="text-align:center;vertical-align:middle;min-width:150px;">申请时间</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle;min-width:150px;"
            >{{formdata.draftDate}}</td>
            <td style="text-align:center;vertical-align:middle;min-width:100px;">用印时间</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle;min-width:150px;"
            >{{formdata.userTime}}</td>
            <td style="text-align:center;vertical-align:middle;min-width:150px;">用印材料是否密件</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle;width:80px"
            >{{formdata.isFsdDoc==1?'是':'否'}}</td>
          </tr>
          <tr id="1">
            <td style="text-align:center;vertical-align:middle">用印部门</td>
            <td
              colspan="10"
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formdata.departFirstDepartment}}</td>
          </tr>
          <tr id="2">
            <td style="text-align:center;vertical-align:middle">编号</td>
            <td
              colspan="10"
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formdata.documentNo}}</td>
          </tr>
          <tr id="3">
            <td style="text-align:center;vertical-align:middle">经办人</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle;min-width:150px"
            >{{formdata.draftUser}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle;min-width:120px;">联系电话</td>
            <td
              colspan="4"
              style="min-width:200px;text-align:center;vertical-align:middle"
            >{{formdata.tel}}</td>
          </tr>
          <!-- <tr style="height: 32px;"></tr> -->
          <tr style="height: 32px;" id="4">
            <td style="width：20%;text-align:center;vertical-align:middle">发往单位类型</td>
            <td
              colspan="2"
              style="text-align:center;vertical-align:middle"
            >{{formdata.sendType=='0'?'系统内':'系统外'}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">发往单位</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">{{formdata.sendDept}}</td>
          </tr>

          <tr style="height: 32px;" id="5">
            <td style="width：20%;text-align:center;vertical-align:middle">标题</td>
            <td colspan="2" style="text-align:center;vertical-align:middle">{{formdata.title}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">法律审查编号</td>
            <td style="width:40%;text-align:center;vertical-align:middle" colspan="4">
              <span v-for="(item, index) in formdata.allFormInfos" :key="index">
                <span>{{ item.dicCode ? item.dicCode : "" }}</span>
                <!-- <span v-if="listdata.length">、</span> -->
              </span>
            </td>
          </tr>

          <tr style="height: 140px;" id="6">
            <td style="width：20%;text-align:center;vertical-align:middle">用印事由</td>
            <td
              colspan="10"
              style="text-align:center;vertical-align:middle"
              v-if="formdata.reason"
            >{{formdata.reason}}</td>

            <td colspan="10" v-if="reasons">
              <div class="qianF" v-for="(item,index) in reasons" :key="index">
                <div class="p2">
                  <span>{{ item.nr }}</span>
                  <div class="date" style="matgin-top:10px;">{{ item.lk }}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr id="7">
            <td colspan="10" style="width:100%">
              <el-table
                border
                size="medium"
                :data="formdata.rtfAssetList"
                :header-row-style="{textAlign:'center',boder:'1px solid #000'}"
              >
                <el-table-column type="index" width="60px" label="序号" align="center"></el-table-column>
                <el-table-column label="用印材料标题" prop="yytitle" align="center"></el-table-column>
                <el-table-column label="用印性质" prop="yyxz" align="center"></el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <p>份数</p>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row.num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <p>每份材料用印名称及个数</p>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row.zong}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <p>实际用印个数</p>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row.shijinum}}</span>
                  </template>
                </el-table-column>
              </el-table>
              <div style="border-top:1px solid #000;display:flex;text-align:center">
                <p style="width:100px;border-right:1px solid #000;color:#000;lineHeight:32px">合计</p>
                <p :style="{color:'#000',padding:'0 10px',lineHeight:'32px'}">{{texts}}</p>
              </div>
            </td>
          </tr>
          <tr style="height: 32px;" id="8">
            <td style="width：20%;text-align:center;vertical-align:middle">用印方式</td>
            <td colspan="10" style="text-align:center;vertical-align:middle">{{formdata.yyFs}}</td>
          </tr>
          <tr style="height: 32px;" id="9">
            <td style="width：20%;text-align:center;vertical-align:middle">授权依据</td>
            <td
              colspan="10"
              style="text-align:center;vertical-align:middle;padding:5px;"
            >{{formdata.authBasis}}</td>
          </tr>
          <tr style="height: 32px;" id="10">
            <td style="width：20%;text-align:center;vertical-align:middle">法律性文件标准格式勾选依据</td>
            <td
              colspan="10"
              style="text-align:center;vertical-align:middle;padding:5px;"
            >{{formdata.lawAuthBasis}}</td>
          </tr>
          <tr id="7">
            <td colspan="10" style="width:100%">
              <el-table
                border
                size="medium"
                :data="tableSealStateData"
                :header-row-style="{textAlign:'center',boder:'1px solid #000'}"
              >
                <el-table-column type="index" width="200px" label="材料名称" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.assentName}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="印章简称" prop="yytitle" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.sealName}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用印数" prop="yyxz" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.sealBatchSum}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <p>正常</p>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row.successCount}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <p>作废</p>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row.cancelCount}}</span>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <div style="border-top:1px solid #000;display:flex;text-align:center">
                <p style="width:100px;border-right:1px solid #000;color:#000;lineHeight:32px">合计</p>
                <p :style="{color:'#000',padding:'0 10px',lineHeight:'32px'}">{{texts}}</p>
              </div> -->
            </td>
          </tr>
          <!-- <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">发往单位</td>
            <td colspan="10" style="text-align:center;vertical-align:middle">{{formdata.sendDept}}</td>
          </tr>-->

          <tr style="height: 140px;" v-if="upLdBjs.length" id="11">
            <td style="width：20%;text-align:center;vertical-align:middle">上级有权审批人审批</td>
            <td colspan="10" v-if="upLdBjs.length">
              <div class="qianF" v-for="(item,index) in upLdBjs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{formdata.upLdBj}}</td>
          </tr>
          <tr style="height: 140px;" v-if="shjiIdeas.length" id="12">
            <td style="width：20%;text-align:center;vertical-align:middle">上级行业务部门意见</td>
            <td colspan="10" v-if="shjiIdeas.length">
              <div class="qianF" v-for="(item,index) in shjiIdeas" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{formdata.shjiIdea}}</td>
          </tr>
          <tr style="height: 140px;" v-if="jyYj2s.length" id="13">
            <td style="width：20%;text-align:center;vertical-align:middle">上级行监印人审核</td>
            <td colspan="10" v-if="jyYj2s.length">
              <div class="qianF" v-for="(item,index) in jyYj2s" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{formdata.jyYj2}}</td>
          </tr>
          <tr style="height: 140px;" id="14">
            <td style="width：20%;text-align:center;vertical-align:middle">有权审批人意见</td>
            <td colspan="10" v-if="ldBjs.length">
              <div class="qianF" v-for="(item,index) in ldBjs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{formdata.ldBj}}</td>
          </tr>
          <tr style="height: 140px;" id="15">
            <td style="width：20%;text-align:center;vertical-align:middle">监印人审核意见</td>
            <td colspan="10" v-if="jyYjs.length">
              <div class="qianF" v-for="(item,index) in jyYjs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{formdata.jyYj}}</td>
          </tr>

          <tr style="height: 140px;" id="16">
            <td style="width：20%;text-align:center;vertical-align:middle">法律审查意见</td>
            <td colspan="10" v-if="flBjs.length">
              <div class="qianF" v-for="(item,index) in flBjs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date" style="matgin-top:10px;">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{formdata.flBj}}</td>
          </tr>
          <tr style="height: 140px;" id="17">
            <td
              style="width：20%;text-align:center;vertical-align:middle"
              id="fzBj"
            >{{changGuiLabel.fzBj}}</td>
            <td
              colspan="10"
              style="text-align:center;vertical-align:middle"
              v-if="formdata.fzBj"
            >{{formdata.fzBj}}</td>
            <td colspan="10" v-else>
              <div class="beiZh" v-for="(item,index) in fzBjs" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr style="height: 100px;" id="18">
            <td style="width：20%;text-align:center;vertical-align:middle">用印情况</td>
            <!-- <td colspan="10" style="text-align:center;vertical-align:middle">{{formdata.yyBgr}}</td> -->
            <td colspan="10" v-if="yyBgrs.length">
              <div class="qianF" v-for="(item,index) in yyBgrs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{formdata.yyBgr}}</td>
          </tr>
          <tr style="height: 32px" id="19">
            <td style="width：20%;text-align:center;vertical-align:middle">复审情况</td>
            <td colspan="10" v-if="retrialIdeas.length">
              <div class="beiZh" v-for="(item, index) in retrialIdeas" :key="index">
                <div class="name">
                  <span class="Span">{{ item.nr }}</span>
                  <div>{{ item.lk }}</div>
                  <div>{{ item.ct }}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">
              <div class="beiZh">
                <div class="name">
                  <span class="Span">{{formdata.retrialIdea}}</span>
                </div>
              </div>
            </td>
          </tr>
          <tr style="height: 32px;" id="20">
            <td style="width：20%;text-align:center;vertical-align:middle">经办人承诺</td>
            <td colspan="10" v-if="formdata.jbrchns!==undefined&&formdata.jbrchns.length>0">
              <div class="beiZh" v-for="(item,index) in formdata.jbrchns" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              style="text-align:center;vertical-align:middle"
              v-else
            >{{formdata.jbrChn}}</td>
          </tr>
          <tr style="height: 140px;" v-if="thIdeas.length" id="21">
            <td style="width：20%;text-align:center;vertical-align:middle">退回原因</td>
            <td colspan="10" v-if="thIdeas">
              <div class="qianF" v-for="(item,index) in thIdeas" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        申请单位意见-->
          <tr style="height: 32px;" id="22">
            <td style="width：20%;text-align:center;vertical-align:middle">备注</td>

            <td colspan="10" v-if="beizhu.length">
              <div class="beiZh" v-for="(item,index) in beizhu" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">
              <div class="beiZh">
                <div class="name">
                  <span class="Span">{{formdata.remark}}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <div style="text-align:center;margin:20px;">
        <h2>二维码采集区</h2>
      </div>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr>
            <!-- <td style="width：20%;text-align:center;vertical-align:middle">二维码采集信息</td> -->
            <td style="text-align:center;vertical-align:middle">日期</td>
            <td style="text-align:center;vertical-align:middle">{{formdata.ewmRq}}</td>
          </tr>
          <tr>
            <!-- <td style="width：20%;text-align:center;vertical-align:middle">二维码采集信息</td> -->
            <td style="text-align:center;vertical-align:middle">主体</td>
            <td style="text-align:center;vertical-align:middle">{{formdata.ewmZt}}</td>
          </tr>
          <tr>
            <!-- <td style="width：20%;text-align:center;vertical-align:middle">二维码采集信息</td> -->
            <td style="text-align:center;vertical-align:middle">事项</td>
            <td style="text-align:center;vertical-align:middle">{{formdata.ewmSx}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <iframe src frameborder="0" id="iframe" style="display:none;"></iframe> -->
  </div>
</template>


<script>
// import textInternational from "@/minixs/textInternationals"; //控制label
import formTextChange from "@/minixs/yongyinText/changgui"; //控制label
export default {
  data() {
    return {
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      tableSealStateData: [],
      // 印章名称及每份个数
      sealDetailArr: [],
      // 用印公文汇总
      sumary: '',
      tableData: [],
      yzmc:'',
      /**
       * 用印选择弹窗
       */
      selUseSealDialog: false,
      selUseSealTableData: [],
      // 机器盖章数组
      fldYyfsMechine: [],
      // 印章名称及每份个数
      //盖章状态表格
      tableSealStateCols: [
        { label: "材料名称", prop: "assentName" },
        { label: "印章简称", prop: "sealName" },
        { label: "用印数", prop: "sealBatchSum" },
        { label: "正常", prop: "successCount" },
        { label: "作废", prop: "cancelCount" },
        {
          label: "查看详情",
          type: "Button",
          btnList: [
            {
              type: "primary",
              label: "查看",
              size: "small",
              handle: row => {
                this.SealStateDetail(row);
              }
            }
          ]
        }
      ],
      // 用印信息弹窗
      sealInfoDialog: false,
      // 用印材料
      sealInfoForm: {
        title: ""
      },
      sealInfoTabData: [],
      sealInfoTabCols: [
        { label: "印章简称", prop: "sealName" },
        { label: "用印数", prop: "sealBatchSum" },
        { label: "已用印数", prop: "successCount" },
        { label: "印章类别", prop: "sealType" },
        { label: "所属印章机", prop: "sealMeachine" },
        { label: "用印机中的位置", prop: "sealPosition" }
      ],
      // 所有批次用印信息数组
      sealInfoArr: [],
      id: "",
      isKh: "",
      tableTitle: "",
      formdata: {
        allScInfo: "", //审查编号
        multiIdType: this.$route.query.multiIdType,
        draftDate: "", //申请时间
        userTime: "", //用印时间
        isFsdDoc: "1", //用印材料是否密件
        firstUnitId: JSON.parse(localStorage.getItem("userInfo")).firstUnitId,
        yySdept: "", //用印部门
        draftUser: "", //经办人默认当前人
        tel: "", //联系电话
        documentNo: "", //编号
        title: "",
        reason: "", //用印事由
        sendType: "1", //发往单位类型
        sendDept: "", //发往单位
        rtfAssetList: [], //用印材料信息
        hfSc: "", //合法性审查意见的采纳:
        qzSp: "", // 业务事项有权签字人审批:
        isGdfw: "", //是否属于业务档案归档范围:
        sqQz: "", //有权签字人授权确认签字
        sqPerson: "", //授权人
        beSqPerson: "", //被授权人
        sqBookname: "", //授权书名称编号
        yyFs: "", //用印方式
        fzBj: "", //用印单位负责人审核意见
        flBj: "", //法律审查意见
        upLdBj: "", //上级行行领导审批
        jyYj: "", //监印人审核
        yyBgr: "", //监印保管人
        jbrChn: "", //经办人承诺
        // gzzt:'',//盖章状态
        remark: "", //备注
        fldHj: "",
        attach: "",
        attachTitle: ""
      },
      YRcheck: "",
      beizhu: [],
      retrialIdeas: [],
      fzBjs: [],
      texts: "",
      show: true,
      jyYj2s: [],
      reasons: [], //用印事由
      flBjs: [], //法律审查意见
      upLdBjs: [], //上级有权审批人审批
      ldBjs: [], //有权审批人审批
      jyYjs: [], //监印人审核
      yyBgrs: [], //印章保管人
      thIdeas: [], //印章保管人
      shjiIdeas: [], //上级行业务部门数据'
      pageStartNodeHeight: ""
    };
  },
  mixins: [formTextChange],

  methods: {
    // pross(){
    //   let arrs = [];
    // let ids = [];
    // let A = document.getElementById('tbodys');
    // let array = [...A.children]
    
    // array.map(item => {
    //   console.log(item.id)
    //     arrs.push(item.offsetHeight);
    //     ids.push(item.id);
    // });
    // console.log(arrs,'sssqqqqq');
    // console.log(ids,'sssqqqqq');
    
    // let sum = arrs.reduce(function(prev, cur, index, arr) {
    //   console.log(prev, cur, index, arr, "s");
    //   if (prev + cur == 722 ) {
    //   let iframe = document.getElementById("iframe");

    //     console.log('疫情快快过去吧')
    //     // console.log("sss", index);
    //     for (let i = 0; i < ids.length; i++) {
    //        console.log(document.getElementById(ids[i],'22'));
    //        iframe.appendChild(document.getElementById(ids[i]))
    //     }
    // let iframeContent = iframe.contentWindow.document;
    //   console.log(iframeContent,'iframeContent');
    //   iframeContent.close();
    //   iframeContent.write(
    //     '<style media="print">@page {size:auto;margin:0mm;}</style>'
    //   );
    //   iframeContent.write(iframe.innerHTML);
    //   console.log(iframe)
    //   iframe.contentWindow.print();

        
    //   }
    //   return prev + cur;
    // });
    // console.log(sum, "ssaaa");
    // },
    beforePrint() {
      //this.show=false;
    },
    // afterPrint() {
    //   this.show = true;
    // },
    backDarft() {
      this.$intent.closeWindow(this);
    },
    printThis() {
      this.show = false;
      // this.pross()
      setTimeout(() => {
        document.execCommand("print");
      }, 1000);
    },
    getSealNamecount(useSealArr) {
      // 印章名称及每份个数 this.sealDetailArr
      // 机器盖章   this.fldYyfsMechine
      // 手工盖章
      let fldYyfsHander = [];
      useSealArr.map(item => {
        this.sealDetailArr.push(`${item.sealName} ${item.sealNum}`);
        item.sealPosition === "用印机"
          ? this.fldYyfsMechine.push(item.sealName)
          : fldYyfsHander.push(item.sealName);
      });
      let fldYyfs = "";
      if (this.fldYyfsMechine.length > 0 && fldYyfsHander.length > 0) {
        fldYyfs = `机器盖章：${this.fldYyfsMechine.join(
          ","
        )};手工盖章：${fldYyfsHander.join(",")}`;
      }
      if (this.fldYyfsMechine.length > 0 && fldYyfsHander.length === 0) {
        fldYyfs = `机器盖章：${this.fldYyfsMechine.join(",")}`;
      }
      if (this.fldYyfsMechine.length === 0 && fldYyfsHander.length > 0) {
        fldYyfs = `手工盖章：${fldYyfsHander.join(",")}`;
      }
      this.$set(this.form, "fldYyfs", fldYyfs);
      // this.form.rtfAssetListShow = ''
      this.$set(this.form, "rtfAssetListShow", this.sealDetailArr.join(","));
      console.log("this.form.rtfAssetListShow", this.form.rtfAssetListShow);
    },
    loadData() {
      // 详情接口
      if (this.$route.query.id) {
        this.$api.sealManage
          .ruledetel({ id: this.$route.query.id,numYear:this.numYears })
          .then(res => {
            console.log(res, "xiangiqng");
            this.formdata = res.data;
            this.jyYj2s = res.data.jyYj2s;
            this.beizhu = res.data.beizhu; //备注
            this.retrialIdeas = res.data.retrialIdeas; //备注
            this.reasons = res.data.reasons; //用印事由
            this.flBjs = res.data.flBjs; //法律审查意见
            this.upLdBjs = res.data.upLdBjs; //上级有权审批人审批
            this.ldBjs = res.data.ldBjs; //有权审批人审批
            if (res.data.jyYj2s !== undefined && res.data.jyYj2s.length > 0) {
              res.data.jyYj2s.map(item => {
                item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
              });
            }
            if (this.ldBjs !== undefined && this.ldBjs.length > 0) {
              this.ldBjs.map(item => {
                item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
              });
            }
            if (res.data.fzBjs !== undefined && res.data.fzBjs.length > 0) {
              res.data.fzBjs.map(item => {
                item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
              });
            }
            if (res.data.flBjs !== undefined && res.data.flBjs.length > 0) {
              res.data.flBjs.map(item => {
                item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
              });
            }
            if (res.data.upLdBjs !== undefined && res.data.upLdBjs.length > 0) {
              res.data.upLdBjs.map(item => {
                item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
              });
            }
            if (res.data.fzBj) {
              // this.fzBjflag = res.data.fzBj.split("=")[0];
              this.formdata.fzBj = res.data.fzBj.split("=")[1] || res.data.fzBj;
            }

            if (res.data.ldBj) {
              // this.Havesp = res.data.ldBj.split("=")[0];
              this.formdata.ldBj = res.data.ldBj.split("=")[1] || res.data.ldBj;
            }
            if (res.data.jyYj) {
              // this.btnyj = res.data.jyYj.split("=")[0];
              this.formdata.jyYj = res.data.jyYj.split("=")[1] || res.data.jyYj;
            }
            if (res.data.jyYj2) {
              // this.Havesp2 = res.data.jyYj2.split("=")[0];
              this.formdata.jyYj2 =
                res.data.jyYj2.split("=")[1] || res.data.jyYj2;
            }
            if (res.data.yyBgr) {
              // this.Yzbgr = res.data.yyBgr.split("=")[0];
              this.formdata.yyBgr =
                res.data.yyBgr.split("=")[1] || res.data.yyBgr;
            }
            if (res.data.flBj) {
              console.log(res.data.flBj.split("=")[1], "sss");
              // this.flscYj = res.data.yyBgr.split("=")[0];
              this.formdata.flBj = res.data.flBj.split("=")[1] || res.data.flBj;
              console.log(this.formdata.flBj);
            }
            if (res.data.upLdBj) {
              // this.Havesp1 = res.data.upLdBj.split("=")[0];
              console.log(this.Yzbgr, "112");
              this.formdata.upLdBj =
                res.data.upLdBj.split("=")[1] || res.data.upLdBj;
            }
            if (res.data.jyYjs !== undefined && res.data.jyYjs.length > 0) {
              res.data.jyYjs.map(item => {
                item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
              });
            }
            if (res.data.yyBgrs !== undefined && res.data.yyBgrs.length > 0) {
              res.data.yyBgrs.map(item => {
                item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
                // console.log(item.nr.split("=")[1],'item.nr.split("=")[1]')
              });
            }
            if (res.data.yyType) {
              this.randomStr1 = res.data.markMainForm;
              this.tableSealStateData = JSON.parse(res.data.yyType);
            console.log(this.tableSealStateData, '获取yytype')
            }
            if (res.data.rtfAssetList1) {
              let jsonJ = res.data.rtfAssetList1
              this.rtfAssetList1 = JSON.parse(res.data.rtfAssetList1);
              this.form.rtfAssetList1 = JSON.parse(res.data.rtfAssetList1);
              this.getSealNamecount(JSON.parse(res.data.rtfAssetList1));
            }
          
            this.jyYjs = res.data.jyYjs; //监印人审核
            this.yyBgrs = res.data.yyBgrs; //印章保管人
            this.thIdeas = res.data.thIdeas; //印章保管人
            this.fzBjs = res.data.fzBjs; //用印单位负责人审核意见
            this.shjiIdeas = res.data.shjiIdeas; //上级行业务部门数据'
            // this.formdata.draftUser = res.data.currentUser; //详情经办人
            this.workflowId = res.data.workflowId;
            this.texts = res.data.fldHj;

            let id = res.data.sendUpUnitLabel;
            switch (id) {
              case "1":
                this.issave = "否";
                break;
              case "2":
                this.issave = "是";
                break;
              case "3":
                this.issave = "否";
                break;
              case "4":
                this.issave = "是";
                break;
              case "5":
                this.issave = "是";
                break;
              case "6":
                this.issave = "是";
                break;
            }
            this.formdata.rtfAssetList = JSON.parse(res.data.rtfAssetList);
          });
      } else {
        // console.log(JSON.parse(this.$route.query.data))
        // this.formdata = JSON.parse(this.$route.query.data)
        this.$message({
          type: "warning",
          message: "您还没有保存任何数据,确定打印?"
        });
      }
    }
  },
  mounted() {
    //label动态获取
    this.$nextTick(function() {
      this.formTextChange("yzgl_cgyy");
    });
    // let height = this.$refs.one.offsetHeight
    // console.log(height,'ss')

    
    
  },
  created() {
    this.loadData();
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.piece {
  overflow: hidden;
}
.Span {
  text-align: left;
  width: 100%;
  display: block;
  padding: 10px;
}
.piece .text1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.piece .text2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .p2 {
    // float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}
.chuanYue {
  overflow: hidden;
}
.chuanYue .chuanYue1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.chuanYue .chuanYue2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.guoCh {
  overflow: hidden;
}
.guoCh .guoCh1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.guoCh .guoCh2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.beiZh {
  overflow: hidden;
}
.beiZh .content {
  // float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.beiZh .name {
  // float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
}
.printTableList {
  width: 94%;
  margin: 0 auto;

  tr {
    height: 32px;
    td {
      width: 12%;
      // text-align: center;
      // vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
}
// .printButton {
//   position: absolute;
//   right: 28%;
//   z-index: 10;
//   top: 6%;
// }
td {
  border: solid #000 1px;
  word-wrap: break-word;
  word-break: break-all;
}
.tcont {
  padding-bottom: 5px;
  border-bottom: 1px solid #dac6c5;
}
.tcont:last-child {
  border-bottom: none;
}
.tcont2 {
  text-align: right;
  padding-top: 5px;
  width: 100%;
  height: 30px;
}
.tcont2 > div {
  float: right;
}
.issueTable {
  height: 100%;
  border-collapse: collapse;
  border: none;
  width: 100%;
}
.issueTable tr:nth-of-type(1) {
  border-top: none;
}
.issueTable tr:last-child {
  border-bottom: none;
}
.issueTable td {
  border: none;
}
.issueTable tr {
  line-height: 25px;
  text-align: center;
  border: solid 1px #000;
  border-left: none;
  border-right: none;
}
.d_flex {
  display: flex;
  padding-bottom: 20px;
  .d_b100 {
    width: 100%;
  }
  .d_f1 {
    flex: 1;
  }
}
.pos_r {
  position: relative;
}
.printButton {
  position: absolute !important;
  top: 1% !important;
  /*left: 3% !important;*/
  right: 1% !important;
}
.printButton1 {
  position: absolute !important;
  top: 1% !important;
  left: 10% !important;
  right: 1% !important;
}
/deep/.el-table td,
.el-table th .is-leaf {
  border-left: 1px solid #000 !important;
}
/deep/.is-center {
  border-bottom: 1px solid #000 !important;
}
@media print {
  .sa {
    page-break-before: always;
  }
  .tablePrint {
    margin-top: 20px;
  }
}
</style>
