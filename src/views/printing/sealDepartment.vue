<template>
  <div>
    <div id="printHtml" class="sealDocument">
      <el-row>
        <el-col>
          <el-button @click="printThis()" type="info" plain v-if="show">打印</el-button>
          <!-- <el-button @click="closeThis" type="info" plain>返回</el-button> -->
        </el-col>
      </el-row>
      <el-row>
        <h1 class="title-h1">{{this.form.deptTableHeader}}部门用印审批单</h1>
      </el-row>
      <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;">
        <tbody>
          <tr style="height: 40px;">
            <td style="width:15%;text-align:center;vertical-align:middle;">申请人</td>
            <td style="width:30%;text-align:left;vertical-align:middle;padding:0 5px">{{form.draftUser}}</td>
            <td style="width:15%;text-align:center;vertical-align:middle">联系电话</td>
            <td style="width:40%;text-align:left;vertical-align:middle;padding:0 5px">{{form.tel}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:15%;text-align:center;vertical-align:middle">申请日期</td>
            <td style="width:30%;text-align:left;vertical-align:middle;padding:0 5px">{{form.draftDate}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">用印日期</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.useTime}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">申请单位</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="3">
              {{form.departFirstDepartment}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">编号</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.documentNo}}
            </td>
          </tr>
          <!-- <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">编号</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.documentNo}}
            </td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">用印日期</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.useTime}}</td>
          </tr> -->
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">标题</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.title}}</td>
          </tr>
          <tr style="height: 50px;">
            <td style="width:20%;text-align:center;vertical-align:middle">用印事由和用印文件名称</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.markReson}}
            </td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">用印及个数</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.rtfAssetListShow}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">用印方式</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.fldYyfs}}</td>
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
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">发往单位</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.sendDept}}</td>
          </tr>
          
          <!-- <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">盖章状态</td>
            <td style="width:80%;text-align:left;vertical-align:middle" colspan="4">{{form.yzBgrYj}}</td>
          </tr>-->
          <tr style="height: 80px;">
            <td style="width:20%;text-align:center;vertical-align:middle">审批意见</td>
             <td colspan="10" v-if="form.ygBmYjs">
              <div class="beiZh" v-for="(item,index) in form.ygBmYjs" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{form.ygBmYj}}</td>
          </tr>
          <tr style="height: 80px;">
            <td style="width:20%;text-align:center;vertical-align:middle">印章保管人意见</td>
            <td colspan="10" v-if="form.yzBgrYjs">
              <div class="beiZh" v-for="(item,index) in form.yzBgrYjs" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{form.yzBgrYj}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">经办人承诺</td>
             <td colspan="10" v-if="form.jbrChns!==undefined&&form.jbrChns.length>0">
              <div class="beiZh" v-for="(item,index) in form.jbrChns" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td v-else style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.jbrChn}}</td>
          </tr>
          <tr style="height: 80px;">
            <td style="width:20%;text-align:center;vertical-align:middle">退回原因</td>
             <td colspan="10" v-if="form.thIdeas">
              <div class="beiZh" v-for="(item,index) in form.thIdeas" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr style="height: 80px;">
            <td style="width:20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="10" v-if="form.remarks">
              <div class="beiZh" v-for="(item,index) in form.remarks" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              colspan="10"
              v-else
              style="text-align:center;vertical-align:middle"
            >{{form.remark}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      form: {},
      tableSealStateData: [],
      // 印章名称及每份个数
      sealDetailArr: [],
      // 用印公文汇总
      sumary: '',
      tableData: [],
      yzmc:'',
      show:true,//控制打印按钮
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
    };
  },
  methods: {
    yzlist(useJgIds,b) {
        
      this.$api.sealManage
        .getsealList({
          useJgId: useJgIds
        })
        .then(res => {
          // this.pagination.total = res.total
          console.log(
            "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
            res
          );
          this.sealNameOption = res.list;
           this.sealNameOption.map((item, index) => {
            if (item.id == b) {
              this.yzmc = item.yzJiancheng;
            }
          });
          console.log(
            "印章列表数据：",
            res,
            this.selUseSealTableData,
            "取出自己想要的数据添加到新数组操作"
          );
        })
        .catch(err => {
          console.log("报错：", err);
        });
    },
    printThis () {
      this.show = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 1000);
    },
    closeThis () {
      this.$intent.closeWindow(this)
    },
    getSealNamecount(useSealArr) {
      // 印章名称及每份个数 this.sealDetailArr
      // 机器盖章   this.fldYyfsMechine
      // 手工盖章
      let fldYyfsHander = [];
      useSealArr.map(item => {
        if (this.form.markNum != '0') { //老数据
          this.sealDetailArr.push(`${item.sealName} ${this.form.markNum}`);
          item.sealPosition === "用印机"
            ? this.fldYyfsMechine.push(item.sealName)
            : fldYyfsHander.push(item.sealName);
        } else {
          this.sealDetailArr.push(`${item.sealName} ${item.sealNum}`);
          item.sealPosition === "用印机"
            ? this.fldYyfsMechine.push(item.sealName)
            : fldYyfsHander.push(item.sealName);
        }
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
    loadData () {
      this.$api.sealManage.detailDepartment({ id: this.$route.query.id ,numYear:this.numYears}).then(res => {
        console.log(res,'ss')
        this.form = JSON.parse(JSON.stringify(res.data))
        
        this.yzlist(res.data.draftOrganId,res.data.markName)

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
       
        // if (this.form.jbrChn) {
        //   this.form.jbrChn = '是'
        // } else {
        //   this.form.jbrChn = '否'
        // }
      })
    },
  },
  created () {
    if (this.$route.query.id) {
      this.loadData();
    }
  },
};
</script>
<style lang="less" rel="stylesheet/less">
.sealDocument {
  width: 900px;
  margin: 0 auto;
  background-color: white;
  .docTable {
    table {
      border-color: #000;
    }
    .el-table--border,
    .el-table--group {
      border: none;
    }
    .el-table {
      color: #000;
      td {
        border-bottom: none;
      }
    }
    .el-table--border td {
      border-right: none;
    }
    .el-table--border th {
      border-right: 1px solid #000 !important;
    }
    .el-table th.is-leaf {
      border-bottom: 1px solid #000 !important;
    }
    .el-table thead,
    .el-table__empty-text {
      color: #000;
    }
  }
  .qianF {
    overflow: hidden;
    .p1 {
      float: left;
      // margin-left: 8px;
      margin-top: 10px;
      width: 100%;
    }
    .p2 {
      float: right;
      margin-right: 25px;
      margin-bottom: 8px;
      text-align: right;
    }
  }

  .piece {
    overflow: hidden;
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
  
.Span {
  text-align: left;
  width: 100%;
  display: block;
  padding: 10px;
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
  .printTableList {
    width: 94%;
    margin: 0 auto;

    tr {
      height: 40px;
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
    border: 1px solid #000;
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
    /* background-color:#F2CACB; */
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
    position: absolute;
    top: 55%;
    right: 3%;
  }
}
td {
  word-wrap: break-word;
  word-break: break-all;
}
</style>
