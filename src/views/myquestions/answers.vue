<template>
<div>
    <el-table
      ref="multipleTable"
      :data="wenList"
      border
      tooltip-effect="dark"
      class="scroll"
      v-loading="tableLoading" @row-click="openTuanDui"
    >
      <el-table-column type="index" fixed label="序号" align="center"></el-table-column>
      <el-table-column
      label="提问日期">
      <template slot-scope="scope">
   
        <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="字号">
      <template slot-scope="scope">
      
        <span style="margin-left: 10px">{{ scope.row.receiveWenhao }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="标题" width="280px">
      <template width="280px" slot-scope="scope" style="width:180px">
      
        <span style="margin-left: 10px">{{ scope.row.documentTitle }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="提问行">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.sendOrgName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否回答">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.answerFlag==0 ? "否":"是"}}</span>
      </template>
    </el-table-column>
    </el-table>
    <div>
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="table_parmas.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="table_parmas.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
    </div>
   <!-- 我的问题 -->
     <el-dialog title="我的答复" :visible.sync="addNoticeVisiblexq" append-to-body>
      <el-form ref="teamNotice" :model="addNoticeformn" class="team-notice">
        
        <el-form-item label="" prop="noticeContent">
          <el-form-item >
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px">{{"行      名:"+questionOrgName}} </h2>
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px">{{"提 问 人:"+tiwenren}} </h2>
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px">{{"时      间:"+shijian}} </h2>
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px">{{"文      号:"+receiveWenhaoy}} </h2>
                <h3 style="text-align:center;background: #ccc; font-size: 16px;">问与答</h3>
                <el-card class="box-card" style="background:rgba(242, 242, 242, 1)">
                    <!-- <div v-for="o in 4" :key="o" class="text item">
                      {{'列表内容 ' + o }} 
                    </div> -->
                   <div v-for="(item,index) in ListWD" :key="index" class="text item">
                     <span style="color: #f00;">

                      {{'【问】' +item.question.questionUserName+"向拟稿人 ("+item.question.answerUserName+") 提问："}}
                      

                     </span>
                    <span style="color: #000;">
                    {{item.question.questionContent}}   
                    </span>
                    <span>{{"("+item.question.createTime+")"}} </span>
                    <el-button v-if="item.answer==undefined && item.question.questionOrder ==questionOrderCS" @click="wenDaTC">回答</el-button>
                    <br>
                     <span v-if="item.answer">
                      <span style="color: #0000FF;">
                        {{'【答】' +item.answer.answerUserName  }}
                      </span>
                      {{item.answer.answerContent}}
                       <span>{{"("+item.answer.createTime+")"}} </span>
                     </span>
                    </div>
                </el-card>

                </el-form-item>
          <el-form-item label="回     答" prop="noticeContent" v-if="show">
          <el-input style="width:100%" type="textarea" v-model="wenTi" autocomplete="off"></el-input>
        </el-form-item>
        <el-col :span="24" style="text-align: center;"  v-if="show">
                      <el-button @click="wenDa">回答</el-button>
                      <!-- <el-button @click="cancelNotice">关闭</el-button> -->
        </el-col>
        </el-form-item>
        
      </el-form>
      
      
    </el-dialog>
 </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
export default {
  components: {
    mTable
  },
  data() {
    return {
      openType:"",
      openIndex:"",
      questionOrderCS:"",
      questionOrder:"",
      id:"",
      table_parmas: {
        function: "findByTeamId",
        page: 1,
        limit: 10
      },
      show:false,
      shijian:"",
      tiwenren:"",
      questionOrgName:"",
      questionId:"",
      receiveId:"",
      receiveWenhao:"",
      questionUserId:"",
      questionUserName:"",
      answerUserName:"",
      answerUserId:"",
      documentTitle:"",
      sendOrgName:"",
      wenTi:"",
      receiveWenhaoy:"",
      ListWD:[],
      wenList:"",//wen
      addNoticeformn: {
        noticeHeadName: '',
        noticeContent: '',
        teamName: '',
      },
      // bank_countersignature: {
      //   function: "findByQryCondition"
      // },
      getTeamByUserId_parmas: {
        function: "getTeamByUserId"
      },
      getTeamUnderGLY_parmas: {
        function: "getTeamUnderGLY"
      },
      teamNoticForm: {
        publisher: "",
        noticeHeadName: "",
        teamName: ""
      },
      saveNotice_parmas: {
        function: "saveNotice"
      },
      rules: {
        noticeHeadName: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { message: "字数限200字以内", min: 1, max: 200, trigger: "blur" }
        ],
        noticeContent: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { message: "字数限200字以内", min: 1, max: 200, trigger: "blur" }
        ],
        teamName: [{ required: true, message: "请选择团队", trigger: "change" }]
      },
      options: [],
      addNoticeVisiblexq:false,
      formLabelWidth: "80px",
      tableData: [],
      tableLoading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  components: {},
  created() {
    this.openType = this.$route.query.type||'';
    this.initTable();
    this.getTeamByUserId();
    //this.getAddoptions();
  },
  watch: {
    // noticeTeamState(newv, oldv) {
    //   this.teamNoticVisible = newv;
    // }
  },
  methods: {
    wenDaTC(){
       this.show=!this.show;
    },
    // handleEdit(scope.$index, scope.row)
    wendaList(ids,questionOrdere) {
      console.log(ids,"----------------USID",questionOrdere)
      this.$post
        .postData(
          "qryById",
          JSON.stringify({
            function: "qryById",
            id: ids,
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          //更新状态用。暂时不用任何操作
          this.questionOrderCS=res.questionOrder;
          this.questionOrder=res.data[res.data.length-1].question.questionOrder;
          this.receiveWenhaoy=res.data[0].question.receiveWenhao;
          //this.id=res.data[res.data.length-1].question.id;
          this.shijian=res.data[0].question.createTime;
          this.tiwenren=res.data[0].question.questionUserName;
          this.questionOrgName=res.data[0].question.questionOrgName;
          this.ListWD=res.data;
          this.receiveId=res.data[0].question.receiveId;
          this.receiveWenhao=res.data[0].question.receiveWenhao;
          this.questionUserId=res.data[0].question.questionUserId;
          this.questionUserName=res.data[0].question.questionUserName;
          this.answerUserName=res.data[0].question.answerUserName;
          this.answerUserId=res.data[0].question.answerUserId;
          this.documentTitle=res.data[0].question.documentTitle;
          this.sendOrgName=res.data[0].question.sendOrgName;

          this.show=false;

        });
    },
    //问与答
    wenDa(data, status, type, params, dtype){
     
      let shform = {
        function: "saveAnswer",
        questionId:this.questionId,//dangqian ID
        receiveId:  this.receiveId,
        receiveWenhao:this.receiveWenhao,//收文字号
        answerUserName:this.answerUserName,
        answerUserId:this.answerUserId,//回答人user_id
        answerContent:this.wenTi,//问题内容
        documentTitle:this.documentTitle,//标题
        sendOrgName:this.sendOrgName//来文单位  
      };
      if(this.openType == 'index'){
        shform.questionId = this.$route.query.id;
      }
      this.$post
        .postData("saveAnswer", JSON.stringify(shform),this.$businessCode.swgl)
        .then(res => {
          if (res && res.success) {
             console.log(res.success,"009009dsadas")
            this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "请求成功",
                duration: 1500
              });
              this.wenTi="";
              this.wendaList(this.questionId)
              this.getTeamByUserId();
              if(this.openType == 'index'){
                  setTimeout(()=>{
                    window.close();
                  },2000)
              }
              //this.cancelNotice()
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1500
          });
        });

        //wenDa END
    },
    getTeamByUserId() {//问与答List
      this.$post
        .postData(
         "selectAnswerPage",//
          JSON.stringify({
              function: "selectAnswerPage",//
               "page":this.table_parmas.page,"limit":this.table_parmas.limit,"totalCount":0,
            }),
          this.$businessCode.swgl
        )
        .then(res => {
          console.log(res.data,"0000000000000");
          this.wenList=res.data && res.data.rows;
          this.total = res.data.total;
          if(this.openType == 'index'){
            this.addNoticeVisiblexq=true;
            this.wendaList(this.$route.query.id);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // getAddoptions() {
    //   this.$post
    //     .postData(
    //       "getTeamUnderGLY",
    //       JSON.stringify(this.getTeamUnderGLY_parmas),
    //       "A0846C011"
    //     )
    //     .then(res => {
    //       console.log(res.data);
    //       this.addoptions = res.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    initTable() {
      // this.tableLoading = true;
      // this.bank_countersignature.page = this.currentPage;
      // this.bank_countersignature.limit = this.pageSize;
      // this.bank_countersignature.publisher = this.teamNoticForm.publisher;
      // this.bank_countersignature.noticeHeadName = this.teamNoticForm.noticeHeadName;
      // this.bank_countersignature.teamName = this.teamNoticForm.teamName;
      // this.$post
      //   .postData(
      //     "findByQryCondition",
      //     JSON.stringify(this.bank_countersignature),
      //     "A0846C011"
      //   )
      //   .then(res => {
      //     this.tableLoading = false;
      //     console.log(res.data);
      //     if (res && res.success) {
      //       this.tableData = res.data.rows;
      //       this.total = res.data.total;
      //     } else {
      //       this.$message({
      //         type: "error",
      //         showClose: true,
      //         offset: 400,
      //         message: "请求失败",
      //         duration: 2000
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     this.tableLoading = false;
      //     this.$message({
      //       type: "error",
      //       showClose: true,
      //       offset: 400,
      //       message: "请求失败",
      //       duration: 2000
      //     });
      //   });
    },
    cancelDialog() {
      this.$emit("teanNotice");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    openTuanDui(index,row){
      this.questionId=index.id
      console.log(index.id,"------")
      this.addNoticeVisiblexq=true;
      // let uuu=this;
      // uuu=val;
      this.wendaList(index.id,index.questionOrder);//



      // this.addNoticeformn.noticeHeadName =uuu.noticeHeadName;
      // this.addNoticeformn.noticeContent = uuu.noticeContent;
      // this.addNoticeformn.teamName =uuu.teamName;

    },
   handleSizeChange(val) {
      this.table_parmas.limit = val;
      this.table_parmas.page = 1;
      this.getTeamByUserId();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.table_parmas.page = val;
      this.tableData = [];
      this.getTeamByUserId();
    },
    search() {
      console.log(this.teamNoticForm);
      this.initTable();
    },
    cancelNotice() {
      this.addNoticeformn = {};
      this.addNoticeVisiblexq = false;
    }
  }
};
</script>

<style scoped>
.team-notice .el-input,
.el-textarea {
  width: 80%;
}
</style>