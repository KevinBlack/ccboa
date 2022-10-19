<template>
  <div>
    <el-row>
      <el-col>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm transition_wrap" :class="{mtdown:down}">
          <el-row>
            <el-row> 
            <el-col :span="8">
              <el-form-item label="提问日期" prop="draftRangeTime">
                <el-date-picker
                  @change="draftRangeTimeChange()"
                  v-model="draftRangeTime"
                  style="width:100%"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!-- </el-row>
            <el-row> -->
            <el-col :span="8">
              <el-form-item label="标题" prop="documentTitle">
                <el-input v-model="ruleForm.documentTitle"></el-input>
              </el-form-item>
            </el-col>
            <!-- </el-row>
            <el-row> -->
            <el-col :span="8">
              <el-form-item label="发文字号" prop="receiveWenhao">
                <el-input v-model="ruleForm.receiveWenhao"></el-input>
              </el-form-item>
            </el-col>
           </el-row>
            <el-row>
              <el-col :span="8">
                <div class="dispatchcswhlshwh">
                
                  <!-- <el-form-item label="行名" prop="queryUnitName">
                        <select-org-or-dept @select="selectOrg"  style="width: 420px;">
                    <el-input
                      type="text"
                      readonly="readonly"
                      placeholder="请选择"
                      v-model="unitName"
                      suffix-icon="el-icon-arrow-down" />
                  </select-org-or-dept>
                      </el-form-item> -->
                </div>
      </el-col>
     
              <el-col :span = "7">
                <el-form-item :label="newName" prop="undertakeDeptId">
                  <el-input v-model="draftDepartmentName" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span = "1">
                <el-button type="primary" @click="selectDepartment">选择</el-button>
              </el-col>
            </el-row>
            <el-row> 
              <el-form-item label="类型" prop="formType">
                <el-radio-group v-model="ruleForm.formType" @change="zxType">
                  <el-radio label="1">我的问题</el-radio>
                  <el-radio label="2" :disabled="ruleForm.sendType=='2'">我的答复</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-col :span="24">
              <el-col class="arrowup" style="text-align: center;">
                <el-button type="primary" @click="submitForm" style="margin:0 10px">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <!-- <el-button type="info" size="small" @click="arrow()"> <i class="el-icon-arrow-down el-icon--left"></i> 展开</el-button> -->
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col style="margin: 20px 0;">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :state="bank_select.state"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          v-loading="tableLoading"
          :default-sort="sortDate"
          @cellClick="openTuanDui"
          >
        </m-table>
      </el-col>
    </el-row>
    <treeCofig
      :treeData="treeData"
      :canTab="false"
      :hasRadio="false"
      dialogTit="选择部门"
      :singelCheckF="true"
      :dialogState="dialogState"
      :offenUse="false"
      @showCompDialog="showCompDialog"
      :bankOptions="bankOptions"
    ></treeCofig>
    <!-- 我的回答 -->
     <el-dialog title="我的回答" :visible.sync="addNoticeVisiblexq" append-to-body>
      <el-form ref="teamNotice" :model="addNoticeformnWT" class="team-notice">
        <el-form-item label="" prop="noticeContent">
          <el-form-item >
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px">{{"行      名:"+questionOrgName}} </h2>
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px">{{"提 问 人:"+tiwenren}} </h2>
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px">{{"时      间:"+shijian}} </h2>
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px">{{"文      号:"+receiveWenhaoy}} </h2>
                <h3 style="text-align:center;background: #ccc; font-size: 16px;">问与答</h3>
                <el-card  v-if="Kongzhi"  class="box-card" style="background:rgba(242, 242, 242, 1)">
                    <!-- <div v-for="o in 4" :key="o" class="text item">
                      {{'列表内容 ' + o }} 
                    </div> -->
                   <div v-for="(item,index) in ListWDWT" :key="index" class="text item">
                     <span style="color: #f00;" v-if="item.question.renyuanType==1">

                      {{'【问】' +item.question.questionUserName+"向拟稿人 ("+item.question.answerUserName+") 提问："}}

                     </span>
                     <span style="color: #f00;" v-if="item.question.renyuanType==2">

                      {{'【问】' +item.question.questionUserName+"向发送人 ("+item.question.answerUserName+") 提问："}}

                     </span>
                    <span style="color: #000;">
                    {{item.question.questionContent}}   
                    </span>
                    <span>{{"("+item.question.createTime+")"}} </span>
                    <el-button v-if="(item.answer==undefined && item.question.questionOrder ==questionOrderCS)&&showHDWTY" @click="wenDaTC">回答</el-button>
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
                      <el-button @click="huiDa">回答</el-button>
                      <!-- <el-button @click="cancelNotice">关闭</el-button> -->
        </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- huida -->
     <!-- 我的问题 -->
     <el-dialog title="我的问题" :visible.sync="addNoticeVisiblexqHD" append-to-body>
      <el-form ref="teamNotice" :model="addNoticeformn" class="team-notice">
        <el-form-item prop="noticeContent">
          <el-form-item >
            <h2 style="background:rgba(242, 242, 242, 1);font-weight: 700;padding-top:10px; padding-left: 20px;">{{"文 号:"+receiveWenhaoyWT}} </h2>
                <h3 style="text-align:center;background: #ccc; font-size: 16px;">问与答</h3>
                <el-card class="box-card" style="background:rgba(242, 242, 242, 1)"   v-if="Kongzhi">
                   
                   <div v-for="(item,index) in ListWDWT" :key="index" class="text item">
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
                <el-form-item label="问     题" prop="noticeContent" v-if="glyType">
          <el-input  type="textarea" v-model="wenTiWT" autocomplete="off"></el-input>
        </el-form-item>
        <el-col :span="24" style="text-align: center;" v-if="glyType">
                      <el-button @click="wenDaTW">提问</el-button>
                      <el-button @click="cancelNotice">关闭</el-button>
        </el-col>
        </el-form-item>
        
      </el-form>
      
      
    </el-dialog>
  </div>
</template>
<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";
import treeCofig from '@/components/tree/tree-fawen';
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  name: "DispatchFile",
  components: {
    mTable,
    optionalfield,
    treeCofig,
    selectOrgOrDept
  },
  data() {
    return {
      showHDWTY:"",
      glyType:"",
      newName:"主办部门",
      newMame:"来文单位",
      isCodeName:"",
      unitId:"",
      unitName: "",
      draftUserId:"",
      renyuanType:"",
      shijian:"",
      tiwenren:"",
      questionOrgName:"",
      ListWDWT:"",
      wenTiWT:"",
      receiveIdWT:"",
      receiveWenhaoWT:"",
      questionUserIdWT:"",
      questionUserNameWT:"",
      answerUserNameWT:"",
      answerUserIdWT:"",
      documentTitleWT:"",
      sendOrgNameWT:"",
      receiveWenhaoyWT:"",
      sendOrgName:"",
      receiveWenhaoy:"",
      questionContent:"",
      answerUserId:"",
      answerUserName:"",
      questionUserName:"",
      questionUserId:"",
      receiveWenhao:"",
      wenTi:"",
      Kongzhi:"",
      show:"",
      questionOrderCS:"",
      questionOrder:"",
      id:"",
      addNoticeformn: {
        noticeHeadName: '',
        noticeContent: '',
        teamName: '',
      },
      addNoticeformnWT: {
        noticeHeadName: '',
        noticeContent: '',
        teamName: '',
      },
      addNoticeVisiblexq:false,
      addNoticeVisiblexqHD:false,
      questionId:"",
      department_params: {
        function: "unitTreeByFirst",
        flag: false,
        "unitCode":this.unitId
      },
      dialogState:false,
      treeData:[],
      tableData: [],
      draftDepartmentName:"",
      bankOptions:[],
      bank_select: {
        function: "qryQuestionPageByCond",
        state: 1,
        page: 1,
        limit: 10,
        total: 0,
      },
      bank_selectW: {
        function: "qryQuestionPageByCond",
        state: 1,
        page: 1,
        limit: 10,
        total: 0,
      },
      bank_selectD: {
        function: "qryAnswerPageByCond",
        state: 1,
        page: 1,
        limit: 10,
        total: 0,
      },
      down:false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      draftRangeTime:[],
      sendRangeTime:[],
      ruleForm: {
        renyuanType:"",
        queryUnit:'',//行名（id）
        undertakeDeptId:'',//承办部门
        startTime:'',
        endTime:'',
        receiveWenhao:'',//文号
        documentTitle:'',//标题
        formType: "1",
        isCodeName:''
      },
      tableLoading:false,
      sortDate:[{ prot: 'date', order: 'descnding'}],
      tableData: [],
      tableCols: [
        { label: "提问日期", prop: "createTime", align: "center" },
        { label: "发文字号", prop: "receiveWenhao", align: "center" },
        { label: "标题", prop: "documentTitle", align: "center",width:"280px"},
        { label:"来文单位", prop: "sendOrgName", align: "center" },
        { label: "是否回答", prop: "answerFlag", align: "center" }
      ],
      pagination: {
        pagNum: 1,
        total: 0,
        limit:10,
      },
    };
  },
  methods: {
    zxType(value){
      if(this.ruleForm.formType=="1"){
        this.newName="主办部门"
        this.tableCols[3].label="来文单位"
      }else if(this.ruleForm.formType=="2"){
        this.newName="承办部门"
         this.tableCols[3].label="提问行"
      }
    },
    // 选择机构
    selectOrg(org) {
      this.draftDepartmentName="";
      this.ruleForm.undertakeDeptId="";
     this.unitName = org.unitName;
      this.unitId = org.id;
      this.queryUnitName=org.unitName;
      this.ruleForm.deptId=org.id;
      this.ruleForm.queryUnit=org.unitName;
      console.log(org.id,this.unitName,this.unitId);
    },
    //回答
    huiDa(data, status, type, params, dtype){
   

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
      console.log(shform)
      this.$post
        .postData("saveAnswer", JSON.stringify(shform), this.$businessCode.swgl)
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
              this.wendaList(this.id)
             
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
    wenDaTC(){
      console.log(this.isCodeName,"this.isCodeName",this.Kongzhi,"this.Kongzhi",this.showHDWTY)
      this.show=!this.show;
       
    },
    //问与答
    wenDaTW(data, status, type, params, dtype){
      if(this.wenTiWT==""){
        alert("问题不能为空!")
      }else{
        let shform = {
            function: "saveQuestion",
            receiveId:  this.receiveIdWT,
            receiveWenhao:this.receiveWenhaoWT,//收文字号
            questionUserId: this.questionUserIdWT,//当前处理人ID
            questionUserName: this.questionUserNameWT,//当前处理人 
            answerUserName:this.answerUserNameWT,
            answerUserId:this.answerUserIdWT,//回答人user_id
            questionContent:this.wenTiWT,//问题内容
            documentTitle:this.documentTitleWT,//标题
            sendOrgName:this.sendOrgNameWT,//来文单位  
            renyuanType:this.renyuanType,
            draftUserId:this.draftUserId
        };
      console.log("1111",shform)
      this.$post
        .postData("saveQuestion", JSON.stringify(shform), this.$businessCode.swgl)
        .then(res => {
         console.log(res,"0999999")
          if (res && res.success) {
            this.wenTiWT='';
            this.wenTi="";
          this.$alert('问题已提交给：'+this.answerUserNameWT, '提示', {
          confirmButtonText: '确定',
          callback: action => {
             
          }
        });
       this.wendaListHDY(this.receiveIdWT,this.id)
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
      }
      
        //wenDa END
    },
    //主办部门选择按钮
    selectDepartment() {

      this.treeData = [];
      this.showCompDialog();
      this.unitId=this.ruleForm.deptId
      this.department_params.unitCode=this.ruleForm.deptId;
      console.log(this.department_params.unitCode)
      this.$post.postData(
        "unitTreeByFirst",
        JSON.stringify(this.department_params),
        this.$businessCode.swgl
      ).then(res => {
        this.treeData = (res && res.data) || [];
      });
    },
    wendaListHDY(receiveIdy,id) {
       this.isCodeName="";
     // console.log(receiveId,"----------------USID")
      let code=JSON.parse(localStorage.getItem("tcHumanRole"));
          for(var i=0;i<code.length;i++){
            if(code[i].dicId=="382" || code[i].dicId=="383"){
                  this.isCodeName='1';
            }
          }
         

      this.$post
        .postData(
          "selectByReceiveIdAndUserId",
          JSON.stringify({
            function: "selectByReceiveIdAndUserId",
            receiveId: receiveIdy,
            userId:JSON.parse(localStorage.getItem("userInfo")).humanId,
            question:"question",
            id:id,
            isCodeName:this.isCodeName
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          
           if(res.data.length==0){
             this.Kongzhi=false;//如果有值问答显示 每值不显示
           }else{
             this.Kongzhi=true;//如果有值问答显示 每值不显示
           }
           
          if(this.isCodeName=='1'){
              let nameZ=JSON.parse(localStorage.getItem("userInfo")).humanId;
              if(nameZ==res.data[0].question.questionUserId||nameZ==res.data[0].question.answerUserId){
                
                this.glyType=true;
                console.log("aaaa",this.Kongzhi)
              }else{
                
                this.glyType=false;
              }
          }else{
                
            this.glyType=false;
           
          }
            console.log("aaaa",this.Kongzhi)
          //更新状态用。暂时不用任何操作
          this.receiveWenhaoyWT=res.data[0].question.receiveWenhao
          this.draftUserId=res.data[0].question.draftUserId;
          this.ListWDWT=res.data;
           
          // 
          this.renyuanType=res.data[0].question.renyuanType
          this.ruleForm.renyuanType=res.data[0].question.renyuanType
          this.id=res.data[0].question.id;
          this.receiveIdWT=res.data[0].question.receiveId;
          this.receiveWenhaoWT=res.data[0].question.receiveWenhao;
          this.questionUserIdWT=res.data[0].question.questionUserId;
          this.questionUserNameWT=res.data[0].question.questionUserName;
          this.answerUserNameWT=res.data[0].question.answerUserName;
          this.answerUserIdWT=res.data[0].question.answerUserId;
          this.documentTitleWT=res.data[0].question.documentTitle;
          this.sendOrgNameWT=res.data[0].question.sendOrgName;
        
          
            console.log("aaaa",this.Kongzhi)


        });
    },
    // handleEdit(scope.$index, scope.row)
    wendaList(ids,questionOrdere) {
       this.isCodeName="";
      let code=JSON.parse(localStorage.getItem("tcHumanRole"));
      for(var i=0;i<code.length;i++){
        if(code[i].dicId=="382" || code[i].dicId=="383"){
              this.isCodeName='1';
        }

      }
      this.$post
        .postData(
          "qryById", 
          JSON.stringify({
            function: "qryById",
            id: ids,
            qryAnswer:"qryAnswer",
            isCodeName:this.isCodeName
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          this.shijian="";
          this.questionOrgName="";
          this.tiwenren="";
          this.receiveWenhaoy="";
          if(res.data.length==0){
                this.Kongzhi=false;//如果有值问答显示 每值不显示
          }else{
            console.log("this.isCodeName==1",this.isCodeName)
            if(this.isCodeName=='1'){
              let nameZ=JSON.parse(localStorage.getItem("userInfo")).humanName;
              if(nameZ==res.data[0].question.questionUserName||nameZ==res.data[0].question.answerUserName){
                this.showHDWTY=true;  
                console.log("this.showHDWTY==true",this.showHDWTY)
              }else{
                this.showHDWTY=false;
              }
          }else{
           this.showHDWTY=false;
          }
            this.Kongzhi=true;//如果有值问答显示 每值不显示
     //更新状态用。暂时不用任何操作
          this.draftUserId=res.data[0].question.draftUserId;
          this.questionOrderCS=res.questionOrder;
          this.questionOrder=res.data[res.data.length-1].question.questionOrder;
          this.id=res.data[res.data.length-1].question.id;
          this.receiveWenhaoy=res.data[0].question.receiveWenhao;
          this.shijian=res.data[0].question.createTime;
          this.tiwenren=res.data[0].question.questionUserName;
          this.questionOrgName=res.data[0].question.questionOrgName;
         this.ListWDWT=res.data;
         console.log("qqqqqqaaa",this.ListWDWT)
          this.receiveId=res.data[0].question.receiveId;
          this.receiveWenhao=res.data[0].question.receiveWenhao;
          this.questionUserId=res.data[0].question.questionUserId;
          this.questionUserName=res.data[0].question.questionUserName;
          this.answerUserName=res.data[0].question.answerUserName;
          this.answerUserId=res.data[0].question.answerUserId;
          this.documentTitle=res.data[0].question.documentTitle;
          this.sendOrgName=res.data[0].question.sendOrgName;
          this.show=false;
          }
     
console.log("this.showHDWTY==true2",this.showHDWTY)
        });
    },
    //弹窗
    openTuanDui(index,row){
      console.log("aaaa",this.ruleForm.formType)
       if(this.ruleForm.formType=="1"){
              this.receiveWenhaoyWT="";
              this.addNoticeVisiblexqHD=true;
              this.id=index.id;
              this.questionOrder=index.questionOrder
              this.wendaListHDY(index.receiveId,index.id);
        }else if(this.ruleForm.formType=="2"){
            this.questionId=index.id;
             this.addNoticeVisiblexq=true;
             this.wendaList(index.id,index.questionOrder);
        }
      
    },
    //弹窗确认按钮
    showCompDialog(data, status, type, params) {
      let that = this;
      let id = "";
      let departmentName = "";
      if (status) {
        if (data.length) {
          id = data[0].id;
          departmentName = data[0].name;
        } else {
          id = "";
          departmentName = "";
        }
        that.draftDepartmentName = departmentName;
        this.ruleForm.undertakeDeptId  = id;
        this.$forceUpdate();
      }
      this.dialogState = !this.dialogState;
    },
    handleCurrentChange(val) {
     if(this.ruleForm.formType=="1"){
          console.log(this.bank_select)
          this.bank_selectW.page = this.pagination.page = val;
           this.bank_select=this.bank_selectW.page;
          this.tableData = [];
          this.getTableList();
      }else if(this.ruleForm.formType=="2"){
        this.bank_selectD.page = this.pagination.page = val;
       this.bank_select=this.bank_selectD.page;
        this.tableData = [];
        this.getTableList();
        }
      
    },
    handleSizeChange(val) {
      if(this.ruleForm.formType=="1"){
          console.log(this.bank_select)
          this.bank_selectW.limit = this.pagination.limit = val;
        this.bank_select.limit = this.bank_selectW.limit
      this.pagination.page = this.bank_select.page = 1;
      this.tableData = [];
      this.getTableList();
      }else if(this.ruleForm.formType=="2"){
         this.bank_selectD.limit = this.pagination.limit = val;
        this.bank_select.limit = this.bank_selectD.limit
      this.pagination.page = this.bank_select.page = 1;
      this.tableData = [];
      this.getTableList();
        }
      
    },
    /**
     * 发文列表查询
    */
    getTableList(){
       this.ruleForm.isCodeName="";
      let code=JSON.parse(localStorage.getItem("tcHumanRole"));
for(var i=0;i<code.length;i++){
  if(code[i].dicId=="382" || code[i].dicId=="383"){
        this.ruleForm.isCodeName='1';
        console.log("1")
  }
}
console.log(this.ruleForm,"this.ruleForm")
        this.bank_selectW.unitName = this.unitName;
        this.bank_selectW.unitId = this.unitId;
        if(this.ruleForm.formType=="1"){
         // console.log(this.bank_select)
          this.tableData="";
          this.bank_selectW = Object.assign(this.bank_selectW,this.ruleForm);
          this.bank_selectW.st = localStorage.getItem('st');
          this.$post.postData("qryQuestionPageByCond", JSON.stringify(this.bank_selectW), this.$businessCode.swgl).then(res => {
            this.tableData = res.data&&res.data.rows||[];
            this.pagination.total = res.data.total;
            this.bank_selectW.total = res.data&&res.data.total||0;
              for(var i=0;i<this.tableData.length;i++){
               if(this.tableData[i].answerFlag=="1"){
                    this.tableData[i].answerFlag='是'
               }else if(this.tableData[i].answerFlag=="0"){
                 this.tableData[i].answerFlag='否'
               }
             }



          })
        }else if(this.ruleForm.formType=="2"){
          //console.log(this.bank_selectD)
           this.tableData="";
           this.bank_selectD = Object.assign(this.bank_selectD,this.ruleForm);
      this.bank_selectD.st = localStorage.getItem('st');
           this.$post.postData("qryAnswerPageByCond", JSON.stringify(this.bank_selectD), this.$businessCode.swgl).then(res => {
            this.tableData = res.data&&res.data.rows||[];
            this.pagination.total = res.data.total;
            this.bank_selectD.total = res.data&&res.data.total||0;
            for(var i=0;i<this.tableData.length;i++){
               if(this.tableData[i].answerFlag=="1"){
                    this.tableData[i].answerFlag='是'
               }else if(this.tableData[i].answerFlag=="0"){
                 this.tableData[i].answerFlag='否'
               }
             }
          })
        }
    },
    //搜索条件展开/折叠
    arrow(){
      this.down = !this.down;
    },
    draftRangeTimeChange(times){
      if(!this.draftRangeTime||this.draftRangeTime=="null"||this.draftRangeTime=="undefined"){
        this.ruleForm.startTime = "";
        this.ruleForm.endTime = "";
        return false;
      }
      this.ruleForm.startTime = this.draftRangeTime[0]; 
      this.ruleForm.endTime = this.draftRangeTime[1];
    },
   
    handleOpenPage (path, id, readType) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          readFlag:readType
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm() {
      this.getTableList();
    },
    resetForm() {
 

      this.ruleForm.deptId="";
      this.ruleForm.queryUnit="";
      this.unitName="";
      this.unitId="";
      this.draftRangeTime="";
      this.sendRangeTime="";
      this.ruleForm.startTime = this.ruleForm.endTime= "";
      //this.ruleForm.sendTimeStart = this.ruleForm.sendTimeEnd= "";
      this.draftDepartmentName = "";
      this.ruleForm.undertakeDeptId = "";
      this.$refs.ruleForm.resetFields();
      this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
    })
    .then((res) => {
      this.draftDepartmentName="全部";
      this.ruleForm.queryUnit = res.data[0].unitName||'';
      this.ruleForm.unitId = res.data[0].unitCode||'';
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.initData();
    })
    },
    cancelNotice() {
      this.receiveWenhaoyWT="";
    this.addNoticeformnWT={};
      this.addNoticeformn = {};
      this.addNoticeVisiblexqHD = false;
      this.addNoticeVisiblexq = false;
      this.ListWDWT=[];
    }

  },
  
  created() {
    this.bankOptions = JSON.parse(localStorage.getItem("unitInfo"))||[];
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
    })
    .then((res) => {
      this.draftDepartmentName="全部";
      this.ruleForm.queryUnit = res.data[0].unitName||'';
      this.ruleForm.unitId = res.data[0].unitCode||'';
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.initData();
    })
  }
}
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin-right: 10px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
}
.btn-writeEnDspc:hover {
    background: #66b1ff;
    border-color: #66b1ff;
}
.mtdown{
  padding:20px 20px 80px 0;
}
.center{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  display: block;
}
.down{
  position: absolute;
  bottom:-76px;
  font-size:12px;
  text-align:center;
}
</style>
