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
      <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
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
      label="标题"  width="280px">
      <template slot-scope="scope"  width="280px">
      
        <span style="margin-left: 10px">{{ scope.row.documentTitle }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="来文单位">
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
     <el-dialog title="我的问题" :visible.sync="addNoticeVisiblexq" append-to-body>
      <el-form ref="teamNotice" :model="addNoticeformn" class="team-notice">
        
        <el-form-item prop="noticeContent">
          <el-form-item >
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px; padding-left: 20px;">{{"文 号:"+receiveWenhaoy}} </h2>
                <h3 style="text-align:center;background: #ccc; font-size: 16px;">问与答</h3>
                <el-card class="box-card" style="background:rgba(242, 242, 242, 1)">
                    <!-- <div v-for="o in 4" :key="o" class="text item">
                      {{'列表内容 ' + o }} 
                    </div> -->
                   <div v-for="(item,index) in ListWD" :key="index" class="text item">
                     <span style="color: #f00;" v-if="item.question.renyuanType==1">

                      {{'【问】' +item.question.questionUserName+"向拟稿人 ("+item.question.answerUserName+") 提问："}}

                     </span>
                     <span style="color: #f00;" v-if="item.question.renyuanType==2">

                      {{'【问】' +item.question.questionUserName+"向发送人 ("+item.question.answerUserName+") 提问："}}

                     </span>
                    <span style="color: #000;">
                    {{item.question.questionContent}}   
                    </span><br>
                     <span v-if="item.answer">
                      <i style="color: #0000FF;">
                        {{'【答】' +item.answer.answerUserName  }}
                      </i>
                      {{item.answer.answerContent}}
                     </span>
                       <span v-if="item.answer">{{"("+item.answer.createTime+")"}} </span>
                    </div>
                </el-card>

                </el-form-item>
                <el-form-item label="问     题" prop="noticeContent">
          <el-input  type="textarea" v-model="wenTi" autocomplete="off"></el-input>
        </el-form-item>
        <el-col :span="24" style="text-align: center;">
                      <el-button @click="wenDa">提问</el-button>
                      <el-button @click="cancelNotice">关闭</el-button>
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
      quesid:"",
      renyuanType:"",
      receiveIdy:"",
      table_parmas: {
        function: "findByTeamId",
        page: 1,
        limit: 10
      },
      draftUserId:"",
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
      total: 0,

    };
  },
  components: {},
  created() {
    this.initTable();
    this.getTeamByUserId();
    this.getAddoptions();
  },
  watch: {
    // noticeTeamState(newv, oldv) {
    //   this.teamNoticVisible = newv;
    // }
  },
  methods: {
    // handleEdit(scope.$index, scope.row)
    wendaList(receiveIdy,id) {
     // console.log(receiveId,"----------------USID")
      this.$post
        .postData(
          "selectByReceiveIdAndUserId",
          JSON.stringify({
            function: "selectByReceiveIdAndUserId",
            receiveId: receiveIdy,
            id:id,
            userId:JSON.parse(localStorage.getItem("userInfo")).humanId,
            question:"question"
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          //更新状态用。暂时不用任何操作
          this.renyuanType=res.data[0].question.renyuanType
          this.receiveWenhaoy=res.data[0].question.receiveWenhao
          this.draftUserId=res.data[0].question.draftUserId;
          this.ListWD=res.data;
          //
          
          this.quesid=res.data[0].question.id;
          this.receiveId=res.data[0].question.receiveId;
          this.receiveWenhao=res.data[0].question.receiveWenhao;
          this.questionUserId=res.data[0].question.questionUserId;
          this.questionUserName=res.data[0].question.questionUserName;
          this.answerUserName=res.data[0].question.answerUserName;
          this.answerUserId=res.data[0].question.answerUserId;
          this.documentTitle=res.data[0].question.documentTitle;
          this.sendOrgName=res.data[0].question.sendOrgName;



        });
    },
    //问与答
    wenDa(data, status, type, params, dtype){
      if(this.wenTi==""){
        alert("问题不能为空!")
      }else{
        let stringType='';
        if(this.renyuanType == '1'){
          stringType = this.questionUserName+'向拟稿人'+this.answerUserName+'提问'
        }else{
          stringType = this.questionUserName+'向发送人'+this.answerUserName+'提问'
        }
        let shform = {
          function: "saveQuestion",
          receiveId:  this.receiveId,
          receiveWenhao:this.receiveWenhao,//收文字号
          questionUserId: this.questionUserId,//当前处理人ID
          questionUserName: this.questionUserName,//当前处理人 
          answerUserName:this.answerUserName,
          answerUserId:this.answerUserId,//回答人user_id
          questionContent:this.wenTi,//问题内容
          documentTitle:this.documentTitle,//标题
          sendOrgName:this.sendOrgName,//来文单位  
          draftUserId:this.draftUserId,
          renyuanType:this.renyuanType,
          stringType:stringType
        };
        // {{'【问】' +item.question.questionUserName+"向拟稿人 ("+item.question.answerUserName+") 提问："}}
      this.$post
        .postData("saveQuestion", JSON.stringify(shform), this.$businessCode.swgl)
        .then(res => {
         console.log(res,"0999999")
          if (res && res.success) {
            this.wenTi="";
          this.$alert('问题已提交给：'+this.answerUserName, '提示', {
          confirmButtonText: '确定',
          callback: action => {
             this.wendaList(index.receiveId,index.id);
            // this.$message({
            //    type: 'info',
            //  message: `action: ${ action }`
            // });
          }
        });
       
          this.getTeamByUserId();
          this.wendaList(this.receiveId,this.quesid)
          //this.cancelNotice()
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败1",
            duration: 1500
          });
        });
      }
      
        //wenDa END
    },
    getTeamByUserId() { //问与答List
      this.$post
        .postData(
         "selectQuestionPage",//
          JSON.stringify({
              function: "selectQuestionPage",//
              "page":this.table_parmas.page,"limit":this.table_parmas.limit,"totalCount":0,
            }),
         this.$businessCode.swgl
        )
        .then(res => {
          console.log(res.data,"0000000000000");
          this.wenList=res.data && res.data.rows;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAddoptions() {
      this.$post
        .postData(
          "getTeamUnderGLY",
          JSON.stringify(this.getTeamUnderGLY_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res.data);
          this.addoptions = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      console.log(index.questionOrder)
      this.addNoticeVisiblexq=true;
      // let uuu=this;
      // uuu=val;
      this.quesid=index.id;
      this.questionOrder=index.questionOrder
      this.wendaList(index.receiveId,index.id);//



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
      this.table_parmas.page = val;
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