<template>
  <div class="detail">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left" @click="goBack"></i>
          查看{{data.sampleType}}
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="goOfficePage" v-if="isShow&&moubanFlag&&fromMainPage">套用</el-button>
          <el-button plain class="bank_grid_comtent_active" @click="printView" v-if="isShow && isPrintView&&moubanFlag">打印预览</el-button>
        <el-button plain class="bank_grid_comtent_active" @click="exitPrintView" v-if="isShow && !isPrintView&&moubanFlag">退出预览</el-button>
          <el-button plain class="bank_grid_comtent_active" @click="evaluate" v-if="!isShow">评价</el-button>
          <el-button plain @click="close">关闭</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <div style="width:60%;margin:0 auto">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:20px">
        <el-tab-pane label="模板详情" name="first"></el-tab-pane>
        <el-tab-pane label="评价信息" name="second"></el-tab-pane>
        <div class="header">
          <el-button
            type="text"
            size="normal"
            v-if="viewCollectionId!=''"
            @click="cancelCollect"
          >取消收藏</el-button>
          <el-button type="text" size="normal" v-else @click="addCollect">+加入收藏</el-button>
          <ul>
            <li class="f1">
              作者:
              <span>{{data.author}}</span>
            </li>
            <li class="f1">
              上传部门:
              <span>{{data.deptName}}</span>
            </li>
            <li class="f1" v-if="data.sampleType=='模板'">
              套用次数:
              <span>{{data.paraphraseNum}}</span>
            </li>
            <li class="f1">
              发布日期:
              <span>{{data.fabuTime}}</span>
            </li>
          </ul>
        </div>

        <div class="model">
          <!-- 模板详情 -->
          <div class="detail" style="height:300px" v-if="isShow">
            <div class="content">
              示例类型:
              <span>{{data.sampleType}}</span>
            </div>
            <div class="content">
              业务类型:
              <span>{{data.fileType}}</span>
            </div>
            <div class="content_w" v-if="data.fileType == '发文'">
              <div class="content">
                发文类型:
                <span>{{data.postType}}</span>
              </div>
              <div class="content">
                业务分类:
                <span>{{data.businessType}}</span>
              </div>
              <div class="content">
                代字/红头:
                <span>{{data.redHead}}</span>
              </div>
              <div class="content">
                文种:
                <span>{{data.documentCode}}</span>
              </div>
            </div>
            <div v-if="data.fileType == '呈送件'">
              <div class="content">
                呈送字号:
                <span>{{data.csNumber}}</span>
              </div>
            </div>
            <div v-if="data.fileType == '签报'">
              <div class="content">
                签报字号:
                <span>{{data.qbNumber}}</span>
              </div>
              <div class="content">
                签报类型:
                <span>{{data.qianbaoType}}</span>
              </div>
            </div>
            <div class="content" v-if="data.fileType == '签报' || data.fileType == '呈送件'">
              处理类型:
              <span>{{data.dealType}}</span>
            </div>
            <div class="content">
              示例标题:
              <span>{{data.fileTitle}}</span>
            </div>
            <div class="content">
              关键词:
              <span>{{data.keywords}}</span>
            </div>
          </div>
          <!-- 评价信息 -->
          <div class="comment" v-else>
            <div class="score">
              <span>综合评分:</span>
              <el-rate
                v-model="zhScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </div>
            <el-table :data="tableData" style="width: 95%;margin:0 auto">
              <el-table-column prop="pingjiaPerson" label="评价人" width="250"></el-table-column>
              <el-table-column label="评价信息">
                <el-table-column prop="sumScore" label="总分" width="150">
                  <template slot-scope="scope">
                    <span>{{scope.row.sumScore}}分</span>
                  </template>
                </el-table-column>
                <el-table-column prop="qhdScore" label="契合度" width="170">
                  <template slot-scope="scope">
                    <el-rate v-model="scope.row.qhdScore" disabled text-color="#ff9900"></el-rate>
                  </template>
                </el-table-column>
                <el-table-column prop="kyxScore" label="可用性" width="170">
                  <template slot-scope="scope">
                    <el-rate v-model="scope.row.kyxScore" disabled text-color="#ff9900"></el-rate>
                  </template>
                </el-table-column>
                <el-table-column prop="gfxScore" label="规范性" width="170">
                  <template slot-scope="scope">
                    <el-rate v-model="scope.row.gfxScore" disabled text-color="#ff9900"></el-rate>
                  </template>
                </el-table-column>
                <el-table-column prop="pjContext" label="评价内容"></el-table-column>
              </el-table-column>
            </el-table>
            <el-pagination
              style="width:95%;margin:0 auto;margin-top:10px"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-tabs>
    </div>

    <div style="width:60%;margin:0 auto" v-if="isShow&&moubanFlag">
      <wordOffice ref="webofficeClick" :officeConfig="officeConfig"></wordOffice>
    </div>

    <!-- 评价弹窗 -->
    <el-dialog
      title="模板及范文评价"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="box">
        <span class="text">契合度</span>
        <el-rate v-model="form.qhdScore" show-score score-template="{value}">></el-rate>
      </div>
      <div class="box">
        <span class="text">可用性</span>
        <el-rate v-model="form.kyxScore" show-score score-template="{value}">></el-rate>
      </div>
      <div class="box">
        <span class="text">规范性</span>
        <el-rate v-model="form.gfxScore" show-score score-template="{value}">></el-rate>
      </div>
      <div class="box">
        <span class="text">总分</span>
        <span>{{sumScore}}</span>
      </div>
      <div class="box">
        <span class="text">评价内容</span>
        <el-input type="textarea" v-model="form.pjContext" style="width:80%"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import wordOffice from '@/components/office/word'
export default {
  components:{
            wordOffice
        },
  data() {
    return {
      fromMainPage:false,//来自主表单
      moubanFlag:false,
      doDownloadFileParam: {
        function: "doDownloadFile",
        fileName:'',
        filePath:''
      },
      queryMuban_findById_pamars: {
        function: "queryMuban_findById",
        id: ""
      },
      viewCollection_pamars: {
        function: "viewCollection",
        mubanId: "",
        userId: ""
      },
      cancel_pamars: {
        function: "cancel",
        id: ""
      },
      addCollection_pamars:{
        function: "addCollection",
        mubanCollectionEntity: {
          mubanId:"",
          userId:''
        }
      },
      getMubanPingfen_pamars:{
        function:'getMubanPingfen',
        page:1,
        limit:10,
        mubanId:''
      },
      getAvgScore_pamars:{
        function: "getAvgScore",
        mubanId: "",
      },
      muBanScore_add_pamars:{
        function:"muBanScore_add",
        mubanPingfenEntity:{
          userId:'',
          mubanId:'',
          qhdScore:'', 
          kyxScore:'',
          gfxScore:'',
          sumScore:'',
          pjContext:''
        }
      },
      viewCollectionId: "",
      userId: "",
      mubanid: '',
      collectShow: false,
      dialogVisible: false,
      data: {},
      zhScore:0,
      tableData: [],
      form: {
        sumScore: 0,
        qhdScore: 0,
        kyxScore: 0,
        gfxScore: 0,
        pjContext: ''
      },
      activeName: "first",
      isShow: true,
      isPrintView:true,
      currentPage: 1, //初始页
      pagesize: 5, //每页数据
      total: 0,
      officeConfig:{
        relativePath:'',//相对文件路径
        fileName:'',//文件名称
        EditType:"0",//“0”：不可编辑；“1”：可以编辑，无痕迹；“2”：可以编辑，有痕迹，无修订。
        ShowMenu:0,	// 设置是否显示整个菜单 "1": 显示菜单 "0": 不显示菜单
        ShowToolBar:2,//// 0 : 自定义工具栏=false, Office工具栏=true;// 1 : 自定义工具栏=true,  Office工具栏=true;
            // 2 : 自定义工具栏=false, Office工具栏=false;
            // 3 : 自定义工具栏=true,  Office工具栏=false;
        fanwenHide:true,//不可编辑状态隐藏按钮
      }
    };
  },
  computed: {
    sumScore() {
      let allNum = this.form.qhdScore + this.form.kyxScore + this.form.gfxScore;
      return (allNum / 3).toFixed(1);
    }
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem("userInfo")).humanId;
    this.queryMuban_findById_pamars.id = this.$route.query.id;
    this.viewCollection_pamars.mubanId = this.$route.query.id;
    this.mubanid = this.$route.query.id;
    this.moubanFlag = this.$route.query.fileName?true:false;
    this.fromMainPage = this.$route.query.showT;
    if(this.$route.query.fileName){
      this.officeConfig.relativePath =  this.$route.query.filePath;//相对文件路径
      this.officeConfig.fileName =  this.$route.query.fileName;//文件名称
      this.officeConfig.fwTranId = this.$route.query.code;
      this.officeConfig.formId = this.$route.query.id;
      this.officeConfig.multiTenancyId = this.$route.query.multiTenancyId;
    }
    this.getDetailData();
    this.getviewCollection();
    // this.form.sumScore = sumScore
  },
  methods: {
     //请求文件路径
    async getFileInfo(self) {
      var successInfo = { state: false };
      self.doDownloadFileParam.fileName = self.$route.query.fileName;
      self.doDownloadFileParam.filePath = self.$route.query.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.doDownloadFileParam),
          self.$businessCode.fwglfj
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请重新上传",
              duration: 1500
            });
            successInfo.state = false;
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件获取失败，请联系管理员",
            duration: 1500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    goOfficePage(){
      //从后台请求filePath ,
        this.$post.postData(
          "copyFile",
          JSON.stringify({function: "copyFile",filePath:this.$route.query.filePathNew}),
          this.$businessCode.fwgl1
        ).then(res => {
          this.$post.postData(
            "doDownloadFile",
            JSON.stringify({function: "doDownloadFile",filePath:res.filePath,fileName: res.fileName}),
            this.$businessCode.fwglfj
          ).then(res1 => {
              if(res1 && res1.success){
                  // let lastIndex = res1.filePath.lastIndexOf('/');
                  // res1.filePath = res1.filePath.substring(0,lastIndex);
                  let data;
                  localStorage.setItem("closeFanWenpages",this.$route.query.wenjianId);
                  data = this.$router.resolve({
                    path: "/openAndSave_Word",
                    query: {
                      state: "viewFile",
                      id: this.$route.query.wenjianId,
                      zhengWenState: 1,
                      JYcode: this.$route.query.code,
                      multiTenancyId: this.$route.query.multiTenancyId,
                      // relativePath: this.$route.query.page=="qianbao"?this.$route.query.newFilePath:this.$route.query.filePath,
                      relativePath: res1.filePath,
                      // fileName: this.$route.query.fileName,
                      fileName: res1.fileName,
                      taoHongFlag: false,
                      showBtns: true,
                      processInstId:this.$route.query.processInstId,
                      page: this.$route.query.page,
                      noNeedColsepage:0
                    }
                  });
                  window.open(data.href, "_blank");
                  //套用完关闭范文模板页面
                  // window.opener.opener.location.reload();
                  window.opener.close();
                  // this.handleSetLoacl();
                  window.close();
                }
          }).catch(erro => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请联系管理员",
              duration: 1500
            });
          });
        }).catch(err => {
          console.log(err);
        });

        //用后端接口返回新的filePath
      // let data;
      // localStorage.setItem("closeFanWenpages",this.$route.query.wenjianId);//关闭范文相关页面
      // data = this.$router.resolve({
      //   path: "/openAndSave_Word",
      //   query: {
      //     state: "viewFile",
      //     id: this.$route.query.wenjianId,
      //     zhengWenState: 1,
      //     JYcode: this.$route.query.code,
      //     multiTenancyId: this.$route.query.multiTenancyId,
      //     // relativePath: this.$route.query.page=="qianbao"?this.$route.query.newFilePath:this.$route.query.filePath,
      //     relativePath: this.$route.query.filePath,
      //     fileName: this.$route.query.fileName,
      //     taoHongFlag: false,
      //     showBtns: true,
      //     processInstId:this.$route.query.processInstId,
      //     page: this.$route.query.page,
      //     noNeedColsepage:true
      //   }
      // });
      // window.open(data.href, "_blank");


      //关闭范文页面 tyl
      // window.opener.opener.location.reload()
      // window.opener.close();
      // this.handleSetLoacl();
      // window.close();
    },
    getDetailData() {
      this.$post
        .postData(
          "queryMuban_findById",
          JSON.stringify(this.queryMuban_findById_pamars),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          this.data = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getviewCollection() {
      this.viewCollection_pamars.userId = this.userId;
      this.$post
        .postData(
          "viewCollection",
          JSON.stringify(this.viewCollection_pamars),
          this.$businessCode.fwgl1
        )
        .then(res => {
          if(res.id){
            this.viewCollectionId = res.id;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getEvaluate(){
      this.getMubanPingfen_pamars.limit = this.pagesize
      this.getMubanPingfen_pamars.page = this.currentPage
      this.getMubanPingfen_pamars.mubanId =this.mubanid
      this.$post
        .postData(
          "getMubanPingfen",
          JSON.stringify(this.getMubanPingfen_pamars),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.rows || []
          this.total = res.data.total
          this.tableData.forEach(item => {
            let pingjiaPerson = `${item.userName}(${item.deptName})${item.pingjiaTime}`
            this.$set(item, "pingjiaPerson", pingjiaPerson);
          })
          console.log(this.tableData)
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAvgScoreData(){
      this.getAvgScore_pamars.mubanId = this.mubanid
      this.$post
        .postData(
          "getAvgScore",
          JSON.stringify(this.getAvgScore_pamars),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          this.zhScore = res.avgScore
        })
        .catch(err => {
          console.log(err);
        });
    },
    //返回
    goBack() {
     window.location.href = "about:blank";
      window.opener.location.reload();
      window.close();
    },
    handleClick(tab, event) {
      // console.log(tab.index);
      if (tab.index == "0") {
        // this.modelName = "模板";
        this.isShow = true;
      } else {
        // this.modelName = "范文";
        this.isShow = false;
        this.getEvaluate()
        this.getAvgScoreData()
      }
    },
    //评价
    evaluate() {
      this.dialogVisible = true;
    },
    //关闭页面
    close() {this.goBack()},
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.currentPage=1
      this.getEvaluate()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getEvaluate()
    },
    //取消收藏
    cancelCollect() {
      this.cancel_pamars.id = this.viewCollectionId;
      this.$post
        .postData(
          "cancel",
          JSON.stringify(this.cancel_pamars),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.viewCollectionId=''
            this.$message({
              message: "已取消收藏",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //加入收藏
    addCollect() {
      this.addCollection_pamars.mubanCollectionEntity.mubanId = this.mubanid
      this.addCollection_pamars.mubanCollectionEntity.userId = this.userId
      this.$post
        .postData(
          "addCollection",
          JSON.stringify(this.addCollection_pamars),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.viewCollectionId = res.id
            this.$message({
              message: "收藏成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击确定
    sure() {
      this.form.sumScore = this.sumScore;
      this.muBanScore_add_pamars.mubanPingfenEntity = this.form
      this.muBanScore_add_pamars.mubanPingfenEntity.mubanId =this.mubanid
      this.muBanScore_add_pamars.mubanPingfenEntity.userId =this.userId
      this.$post
        .postData(
          "muBanScore_add",
          JSON.stringify(this.muBanScore_add_pamars),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          if(res.success){
            this.getEvaluate()
            this.getAvgScoreData()
            this.dialogVisible = false;
            this.form =  {
              sumScore: 0,
              qhdScore: 0,
              kyxScore: 0,
              gfxScore: 0,
              pjContext: ''
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //关闭弹窗
    handleClose() {
      this.dialogVisible = false;
      this.form =  {
              sumScore: 0,
              qhdScore: 0,
              kyxScore: 0,
              gfxScore: 0,
              pjContext: ''
            }
    },
    //打印预览
    printView(){
      this.isPrintView=false;
      this.$refs.webofficeClick.printPreview();
    },
    //退出打印预览
    exitPrintView(){
      this.isPrintView=true;
      this.$refs.webofficeClick.PrintPreviewExit();
    },
  }
};
</script>

<style lang='less' scoped>
.bank_dispack_side {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3b85ef;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  .bank_dispach_back {
    width: 200px;
    font-size: 24px;
    color: #fff;
    .el-icon-arrow-left {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #fff;
      color: #3b85ef;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 8px;
    }
  }
  .grid_comtent {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .bank_grid_comtent_active {
      border: 1px solid #fff;
      background: #0563c8;
      color: #fff;
    }
  }
}
.nav {
  width: 100%;
  height: 110px;
}
/deep/.el-tabs--card > .el-tabs__header {
  border: none;
  margin: 0;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
/deep/.el-tabs__content {
  position: relative;
  overflow: initial;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #e4e7ed;
  //   margin-right: 10px;
  background: #fff;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background: #409eff;
  color: #fff;
}
.header {
  position: absolute;
  top: -30px;
  right: 10px;
  display: flex;
  ul {
    overflow: hidden;
    margin-left: 10px;
    font-size: 14px;

    .f1 {
      height: 20px;
      float: left;
      padding: 0 10px;
      line-height: 20px;
      border-left: 1px solid #ccc;
      margin-top: 8px;
    }
    .f1:first-child {
      border: none;
    }
  }
}

.model {
  width: 100%;
  padding-bottom: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  background: #fff;
}

.detail {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-wrap: wrap;
}
.content {
  width: 50%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 100px;
  box-sizing: border-box;
  font-size: 15px;
  margin-top: 20px;
  float: left;
}
.content_w {
  width: 100%;
  height: 80px;
}
.score {
  display: flex;
  padding: 10px 50px 50px;
  font-weight: 700;
  margin-top: 20px;
  span {
    font-size: 16px;
    line-height: 20px;
  }
  /deep/.el-rate {
    margin: 0 15px 0 40px;
  }
}
/deep/.el-table .cell {
  text-align: center;
}
.box {
  padding: 20px;
  display: flex;
  .text {
    line-height: 20px;
    margin-right: 10px;
  }
}
</style>