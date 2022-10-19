<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>发文处理单 -->
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="open">关闭</el-button>
          <el-button plain @click="preserve">保存</el-button>
          <el-button plain @click="CompleteSending">完成并发送</el-button>
          <el-button plain @click="drafting">起草正文</el-button>
          <el-button plain @click="delectArticle">删除此文</el-button>
          <el-button plain @click="collect">收藏</el-button>
          <el-button plain @click="dialogShow">查看流程</el-button>
          <el-button plain @click="processSheet">打印处理单</el-button>
          <el-button plain @click="instructions">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog  :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>


    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行电子发文处理单</h3>
    </header>

    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >文件要素</a>
        <a
          href="javascript:void(0);"
          :class="active == '#fsdx' ? 'active' : ''"
          @click="toTarget('#fsdx')"
        >发送对象</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >签批意见</a>
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
        <a
          href="javascript:void(0);"
          :class="active == '#hqyj' ? 'active' : ''"
          @click="toTarget('#hqyj')"
        >会签意见</a>
      </div>
      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">
              当前环节：
              <span>拟稿</span>
            </p>
            <p class="bank_dispach_annotation_current" style="width:88%;">
              当前处理人：
              <span>拟稿</span>
            </p>
            <p class="bank_article_illustrates">办文说明</p>
          </div>
          <!-- 文件要素 -->
          <h6 id="wjys" class="bank_dispach_file_tit">文件要素</h6>
          <el-form ref="ruleForm" label-width="120px" class="demo_ruleForm">
            <el-row>
              <el-col :span="8">
                <el-form-item label="发文类型">
                  <el-input v-model="fromdata.type" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="代字/红头">
                  <el-input v-model="fromdata.redHead" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发文字号">
                  <el-input v-model="fromdata.documentNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="紧急程度" :span="8">
                <el-input v-model="fromdata.emergencyLevel" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务分类" :span="8">
                <el-input v-model="fromdata.businessType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="文种" :span="8">
                <el-input v-model="fromdata.textType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="文种" :span="8">
                <el-input v-model="fromdata.secretType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="秘密期限类型" :span="8">
                <el-input v-model="fromdata.secretLimitType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="8">
                  <el-form-item label="秘密标志" :span="8">
                <el-input v-model="fromdata.secretFlagType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="知悉范围">
                  <el-input v-model="fromdata.knowScore"  :disabled="true" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="定密依据" >
                  <el-input
                    v-model="fromdata.secretGists"  :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主办部门">
                  <el-input v-model="fromdata.hostDepartment"   :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="联合发文单位">
                  <el-input v-model="fromdata.unionDepartment"    :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟稿人"  >
                  <el-input v-model="fromdata.draftUser" :disabled="true" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话" >
                  <el-input v-model="fromdata.phone" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟稿日期">
                  <el-input v-model="fromdata.draftTime"  :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="发文依据">
                  <el-input v-model="fromdata.sendBasis"  :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            <el-col>
                <el-form-item label="备    注">
                  <el-input  :disabled="true"  v-model="fromdata.comments" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="直发文件">
                  <el-radio v-model="fromdata.isDirect" label="是">是</el-radio>
                  <el-radio v-model="fromdata.isDirect" label="否">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="直发范围">
                  <el-input  :disabled="true"  v-model="fromdata.SdirectRange" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="直发文种类">
                  <el-input  :disabled="true"  v-model="fromdata.SdirectType" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="档案利用范围">
                  <el-radio v-model="fromdata.userRange" label="是">是</el-radio>
                  <el-radio v-model="fromdata.userRange" label="否">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="规章/规范性文件">
                  <el-radio v-model="fromdata.isStandardFile" label="是">是</el-radio>
                  <el-radio v-model="fromdata.isStandardFile" label="否">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保管期限">
                  <el-input  :disabled="true"  v-model="fromdata.SkeepLimit" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="成文日期">
                  <el-input  :disabled="true"  v-model="fromdata.completeTime" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="发文日期">
                  <el-input  :disabled="true"  v-model="fromdata.sendTime" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="正文标题">
                  <el-input :disabled="true"   v-model="fromdata.title" placeholder="关于工作计划的报告"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="附件标题">
                  <el-input :disabled="true"   v-model="fromdata.attachTitle" placeholder="关于工作计划的报告"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 发送对象 -->
          <h6 id="fsdx" class="bank_dispach_file_tit">发送对象</h6>
          <el-form ref="ruleForm" label-width="120px" class="demo_ruleForm">
            <el-row>
              <el-col>
                <el-form-item label="会签部门">
                  <el-input  :disabled="true"  v-model="fromdata.signDepartment" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="行外会签">
                  <el-input  :disabled="true" v-model="fromdata.outsideSign"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="主    送">
                  <el-input  :disabled="true" v-model="fromdata.main"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="抄    送">
                  <el-input  :disabled="true" v-model="fromdata.copy"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="本行发送">
                  <el-input  :disabled="true" v-model="fromdata.inline"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 签批意见 -->
          <h6 id="qpyj" class="bank_dispach_file_tit">签批意见</h6>
          <el-form ref="ruleForm" label-width="120px" class="demo_ruleForm">
            <el-row>
              <el-col>
                <el-form-item label="签发意见">
                  <el-input :disabled="true" v-model="fromdata.opinionSend"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="核稿意见">
                  <el-input :disabled="true" v-model="fromdata.opinionDraf"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="会签意见">
                  <el-input :disabled="true" v-model="fromdata.opinionSign"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="审核意见">
                  <el-input :disabled="true" v-model="fromdata.opinionCheck"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="备    注">
                  <el-input :disabled="true" type="textarea" v-model="fromdata.comments" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 附件 -->
          <h6 id="scfj" class="bank_dispach_file_tit">附件</h6>
          <el-form ref="ruleForm" label-width="120px" class="demo_ruleForm">
            <el-row>
              <loadAccessory></loadAccessory>
              <el-col></el-col>
              
              <el-col :span="8">
                  <el-form-item label="是否半电子">
                    <el-radio v-model="fromdata.isSeparate" label="是">是</el-radio>
                    <el-radio v-model="fromdata.isSeparate" label="否">否</el-radio>
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>
           <!-- 会签意见 -->
          <h6 id="hqyj" class="bank_dispach_file_tit">会签意见</h6>
          <el-form ref="ruleForm" label-width="120px" class="demo_ruleForm">
            <!-- <el-row>
              <el-col>
                <el-form-item label="最终意见">
                  <el-input type="textarea" v-model="fromdata.processOpinion" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="过程意见">
                  <el-input type="textarea" v-model="fromdata.finalOpinion" placeholder="填写备注可输入500字"></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
          </el-form>
          <!-- 附件 -->
          <el-form ref="ruleForm" label-width="120px" class="demo_ruleForm">
            <el-row>
              <loadAccessory></loadAccessory>
              <el-col></el-col>
              <el-col :span="8">
                  <el-form-item label="是否半电子">
                    <el-radio v-model="fromdata.isSeparate" label="是">是</el-radio>
                    <el-radio v-model="fromdata.isSeparate" label="否">否</el-radio>
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadAccessory from "../../components/LoadAccessory/LoadAccessory";
import timeDialog from "../../components/timedialog/timedialog"

export default {
  name: "App",
  components: {
    loadAccessory,
    timeDialog
  },
  data() {
    return {
      active: "#wjys",
      tableData:[
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
            { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
            { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
            { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },
           { date: "处理环节", fileId: "date", title: "center",tache:"1" },

      ],
      timeShow:false,
      id:"",
      //input框内容
      bank_dispach: {
        function: "selectSignById",
        id: "1"
      },
      //提交
      // bank_addToSendOrder: {
      //   function: "saveOrUpdateSign",
      //   id:"1",
      //   processOpinion:this.fromdata.processOpinion,
      //   finalOpinion:this.fromdata.finalOpinion
      // },
      dialogVisible:false,
      fromdata: [
        {
          function: "",
          attachTitle: "",
          businessType: "",
          canNotShouHuiIds: "",
          comments: "",
          commentsList: "",
          copy: "",
          copyIds: "",
          currentDate: "",
          currentNode: "",
          currentNodeId: "",
          currentTime: "",
          currentUser: "",
          documentNo: "",
          draftDepartment: "",
          draftDepartmentId: "",
          draftOrgan: "",
          draftOrganId: "",
          draftTime: "",
          draftUser: "",
          draftUserId: "",
          emergencyLevel: "",
          exceedWordReason: "",
          haveRead: "",
          hostDepartment: "",
          inline: "",
          inlineIds: "",
          isArtificial: "",
          isBack: "",
          isCanDelete: "",
          isClear: "",
          isDirect: "",
          isHasDocumentNo: "",
          isHasRedHead: "",
          isRepeat: "",
          isSeparate: "",
          isSign: false,
          isSignOver: "",
          isStandardFile: "",
          isWithdraw: "",
          keepLimit: "",
          knowScore: "",
          lawDepartment: "",
          main: "",
          mainIds: "",
          meetingEndTime: "",
          opinionCheck: "",
          opinionCheckList: "",
          opinionDrafList: "",
          opinionSendList: "",
          opinionSignList: "",
          outsideSign: "",
          phone: "",
          realCopy: "",
          realInline: "",
          realMain: "",
          reasonLimit: "",
          reasonList: "",
          redHead: "",
          secretFlag: "",
          secretFlagContent: "",
          secretFlagType: "",
          secretGists: "",
          secretLimitType: "",
          secretTimeType: "",
          secretType: "",
          sendBasis: "",
          sendTime: "",
          sendUnitName: "",
          sequenceSign: "",
          shenpiConfigId: "",
          shenpiTitle: "",
          signDepartment: "",
          signDepartments: "",
          signSequence: "",
          tel: "",
          textType: "",
          title: "",
          type: "",
          unionDepartment: "",
          updateTime: "",
          userRange: "",
          workSecretFlag: "",
          workflowId: "",
          eleSendSecretType:"",
          processOpinion:"2",
          finalOpinion:"1",
        }
      ],
      SisDirect:'',
      SsendType: [],
      SredHead: "",
      SemergencyLevel: "",
      SbusinessType: "",
      StextType: "",
      SsecretType: "",
      SsecretTimeType: "",
      SsecretFlagType: "",
      SsecretFlagContent: "",
      SdirectRange: "",
      SdirectType: "",
      SsignDepartment: "",
      Smain: "",
      Scopy: "",
      Sinline: "",
      SkeepLimit: "",
      imageUrl: "",
      fileList: []
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_fsdx1 = document.querySelector("#fsdx").offsetTop - 60;
    this.distance_fsdx = document.querySelector("#fsdx").offsetTop - 110;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.distance_hqyj = document.querySelector("#hqyj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
    // console.log(this.distance_fsdx1)
    // console.log(this.distance_fsdx1 - 90)
    // console.log(this.distance_fsdx1 - 110)
  },
  created() {
    //获取id
    //this.id = this.$router.query.id;
    
    //this.toEdit();
  },
  methods: {
    dialogShow(){
      console.log(this.fromdata[0])
      console.log(this.fromdata[0].attachTitle)
      console.log(this.fromdata[0].processOpinion)
      console.log(this.fromdata[0].finalOpinion)
      console.log(this.fromdata)
      this.timeShow = true;
      this.$nextTick(()=>{
        this.$refs.dialogLine.openDialog();
      })
    },
    //初始值 //input框内容
    toEdit() {
      this.$post
        .postData(
          "selectSignById",
          JSON.stringify(this.bank_dispach)
        )
        .then(res => {
          console.log(res.data)
          this.fromdata = res.data;
        })
        .catch(err => {
          console.log(err)
        })
    },
    jsonparse(obj) {
      return JSON.parse(obj);
    },
    selectType(value){
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam()
    },
    //下拉框 红头/代字内容
    getTcDocTypeDicByParam() {
      this.$post
        .postData("getTcDocTypeDicByParam", JSON.stringify(this.bank_redheader))
        .then(res => {
          this.SredHead = res.data;
        });
    },
    
    // 代字/红头  下拉 发文字号获取值
     selectredhead(redHeadITEM) {
      this.fromdata.documentNo = redHeadITEM;
    },
    // 保存
    preserve() {
      console.log(this.bank_addToSendOrder)
      // this.$post
      //   .postData("saveOrUpdateSign", JSON.stringify(this.bank_addToSendOrder))
      //   .then(res => {
      //     console.log(res)
      //   });
    },
    toTarget(target) {
      this.active = target;
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      // console.log(scrolled);

      if (scrolled < this.distance_fsdx) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_fsdx &&
        scrolled < this.distance_qpyj
      ) {
        this.active = "#fsdx";
      } else if (
        scrolled >= this.distance_qpyj &&
        scrolled < this.distance_scfj
      ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },

    // 关闭
    open() {
      this.$confirm("是否退出该页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //完成并发送
    CompleteSending() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 起草正文
    drafting() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 删除此文
    delectArticle() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 收藏
    collect() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 查看流程
    flowScheme() {
      this.dialogVisible = true
    },
    // 打印处理单
    processSheet() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 操作指南
    instructions() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    }
  },
  
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
  height: 90px;
  line-height: 90px;
}
.bank_dispach_tit {
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
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
    width: 180px;
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

.bank_dispach_content {
  width: 100%;
  height: auto;
  .bank_dispach_side_nav {
    width: 45px;
    height: auto;
    position: fixed;
    bottom: 8px;
    left: 10%;
    margin-left: -43px;
    text-align: center;
    a {
      width: 45px;
      height: 70px;
      border: 2px solid #3b85ef;
      font-size: 16px;
      margin: 15px 0;
      color: #3b85ef;
      background: #fff;
      border-radius: 10px 0 0 10px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active {
      background: #3b85ef;
      color: #fff;
    }
  }

  .bank_dispach_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 100px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: #ff6600;
          }
        }
        .bank_article_illustrates {
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #fff;
          color: #ff6600;
          position: absolute;
          top: 4px;
          right: 10px;
        }
      }
    }
    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 10px;
    }

    el-form-item {
      margin: 10px 0;
    }
  }

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
</style>
