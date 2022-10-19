<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>授权处理单
        </p>
        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain @click="preserve('save')">保存</el-button>
          <el-button plain @click="delectArticle">删除登记</el-button>
          <el-button plain @click="breakArticle">中止授权</el-button>

        </div>
      </el-col>
    </el-row>
    
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行临时转授权登记单222222</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >授权登记</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >授权模块</a>
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >授权书</a>
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">
              当前状态：
              <span>{{fromdata.authStatusName}}</span>
            </p>
            <p class="bank_dispach_annotation_current">
              当前处理人：
              <span>{{fromdata.currentUser}}</span>
            </p>
          </div> -->
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
            :disabled="state"
          >
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">授权登记</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                 <el-row>
                  <el-row>
                    <el-col :span="8">
                        <el-form-item label="授权人" prop="authUserName">
                            <el-col :span="20">
                                <el-input
                                v-model="fromdata.authUserName"
                                placeholder="请选择授权人"
                                style="width: 100%;"
                                >
                                <el-button slot="append" @click="getTreeData('shou')" icon="el-icon-plus"></el-button>
                                </el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="授权部门" prop="authDeptName" ref="authDeptName">
                        <el-input v-model="fromdata.authDeptName" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                  </el-row>
                    <el-col :span="8">
                        <el-form-item label="被授权人" prop="beAuthUserName">
                            <el-col span="20">
                            <el-input
                                v-model="fromdata.beAuthUserName"
                                placeholder="请选择被授权人"
                                style="width: 100%;"
                                >
                            <el-button slot="append" @click="getTreeData('bei')" icon="el-icon-plus"></el-button>
                            </el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="被授权部门" prop="beAuthDeptName" ref="beAuthDeptName">
                        <el-input v-model="fromdata.beAuthDeptName" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                
               <el-col :span="8">
                  <el-form-item label="授权开始日期" prop="time" ref="time">
                       <el-date-picker
                        v-model="fromdata.authStartTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        @change="timebijiao1(val)"
                        align="right">
                        </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="授权结束时间" prop="time" ref="time">
                    <el-date-picker
                        v-model="fromdata.authEndTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        @change="timebijiao(val)">
                        </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中止时间" prop="supspensionTime" ref="supspensionTime">
                    <el-input v-model="fromdata.supspensionTime" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
            
                 <el-col :span="24">
                  <el-form-item label="授权原因" prop="authReason" ref="authReason">
                    <el-input  type="input" v-model="fromdata.authReason" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                <el-form-item label="备    注">
                  <div v-for="(item) in fromdata.remarksList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            rows="3"
                            class="d_f1"
                          ></el-input>
                          <div class="adviceInfo">
                            {{item.departmentName}}
                            <span class="pad_lr10">{{item.userName}}</span>
                            {{item.createTime}}
                          </div>
                        </el-col>
                        <el-col
                          :span="2"
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                        >
                          <button
                            type="button"
                            class="el-button el-button--default dimi_btn"
                            @click="deletService(item.id)"
                          >
                            <i class="el-icon-delete"></i>
                          </button>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <el-input type="textarea" v-model="fromdata.remarks"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="登记人" prop="draftUserName" ref="draftUserName">
                    <el-input v-model="fromdata.draftUserName" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记部门" prop="draftDeptName" ref="draftDeptName">
                    <el-input v-model="fromdata.draftDeptName" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记日期" prop="draftTime" ref="draftTime">
                    <el-input v-model="fromdata.draftTime" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 审批意见 -->
            <h6 class="bank_dispach_file_tit">授权模块</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col>
                    <el-form-item label="授权模块" prop="multiTenancyId" ref="multiTenancyId">
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                      <div style="margin: 15px 0;"></div>
                      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="item in modules"
                          :key="item.module_key_word"
                          :label="item.module_name"
                          :value="item.module_key_word"
                          >
                        </el-checkbox>
                        <!-- <el-checkbox>全部</el-checkbox>
                        <el-checkbox>发文管理</el-checkbox>
                        <el-checkbox>收文管理</el-checkbox>
                        <el-checkbox>签报管理</el-checkbox>
                        <el-checkbox>便函管理</el-checkbox>
                        <el-checkbox>呈送件</el-checkbox>
                        <el-checkbox>专项督办</el-checkbox>
                        <el-checkbox>会议培训</el-checkbox>
                        <el-checkbox>事物审批</el-checkbox>
                        <el-checkbox>信息报送</el-checkbox>
                        <el-checkbox>行办会议</el-checkbox>
                        <el-checkbox>行办参会</el-checkbox>
                        <el-checkbox>信息审批</el-checkbox>
                        <el-checkbox>印章管理</el-checkbox>
                        <el-checkbox>会议室预定</el-checkbox>
                        <el-checkbox>文件处理</el-checkbox>
                        <el-checkbox>部门信息</el-checkbox>
                        <el-checkbox>电话记录</el-checkbox>
                        <el-checkbox>值班表通讯录联系人库</el-checkbox> -->
                      </el-checkbox-group>

                    </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit tit1">授权书</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="授权书">
                    <!-- <el-input type="textarea"></el-input> -->
                    <loadAccessory></loadAccessory>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
     <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @node-click="nodeClick"
      @showCompDialog="showCompDialog"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <secretBasls ref="arr" v-if="secretDialog"></secretBasls>
    <!--  @childsavesecretBasls="savesecretBaslsvalue" -->
  </div>
</template>

<script>
import loadAccessory from "../../../components/LoadAccessory/LoadAccessory";
import timeDialog from "../../../components/timedialog/timedialog";
import treeCofig from "../../../components/tree/tree-fawen";
import secretBasls from "../../../components/secretBasls/secretBasls";
import appendWriteList from "../../../components/appendWriteList/appendWriteList";
import dateFormate from "@/util/filters.js";
export default {
  name: "App",
  components: {
    loadAccessory,
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
  },
  data() {
    return {
        readFlag:"",
        modules: [],  // 授权模板
        checkAll: false,
        checkedCities: [],
        cities: [],
        isIndeterminate: true,
        ruleForm:[],
        routeData:[],
        dialogFormVisible:false,
        bank_DeleteSendOrder: {
            function: "doDeleteSendOrder",
            id: ""
        },
      bank_cklc: {
        function: "getHistory",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      //秘密期限类型
      flag: true,
      // 秘密标志
      secretflag: true,
      secretTypeflag: false,
      // 定密依弹窗
      secretDialog: true,
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      undertakeDeptData:[],
      assistDeptData:[],
      cbdwList:[],//督办依据添加
      //input框内容
      bank_dispach: {
        function: "selectByIdCQ",
        id: ""
        // id: "1"
      },
      state:false,//如果大于2不可以编辑
      //确定完成并发送
      bank_doSend: {
        function: "doSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      fromdata: {
       id:"",
       authStatusName:"",
       multiTenancyId:"发文管理,收文管理",
       draftUserId:"",
       draftUserName:"",
       draftDeptId:"",
       draftDeptName:"",
       authUserId:"",
       authUserName:"",
       beAuthUserId:"",
       beAuthUserName:"",
       authDeptId:"",
       authDeptName:"",
       beAuthDeptId:"",
       beAuthDeptName:"",
       draftTime:"",
       authStartTime:"",
       authEndTime:"",
       authReason:"",
       authStatus:"",
       remarks:"",
       supspensionTime:"",
      },
      SsendType: [],
      SredHead: [],
      SemergencyLevel: [],
      SbusinessType: [],
      StextType: [],
      SsecretType: [],
      SsecretTimeType: [],
      SsecretFlagType: [],
      SsecretFlagContent: [],
      SdirectRange: [],
      SdirectType: [],
      SsignDepartment: [],
      Smain: [],
      Scopy: [],
      Sinline: [],
      SkeepLimit: [],
      SworkSecretFlag: [],
      rules: {
       
      authStartTime: [
          {
            required: true,
            trigger: "change",
            message: "请选择收文日期"
          }
        ],
        authEndTime: [
          {
            required: true,
            trigger: "change",
            message: "请选择收文日期"
          }
        ],
      },
      baoWenZiDuan:this.$businessCode.grxxbg,
      imageUrl: "",
      active: "#wjys",
      timeShow: false, //查看流程
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      benCheckData: [], //本行选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      dialogTypeNow: "" ,//当前弹窗类型
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: sessionStorage.getItem("ccboaHumanId"), //当前用户id
      clickSaveAndSend: false //点击完成并发送标示
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
      handleCheckAllChange(val) {
        // this.checkedCities = val ? cityOptions : [];
        // this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
        // let checkedCount = value.length;
        // this.checkAll = checkedCount === this.cities.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
    add(){
      this.dialogFormVisible=true;

    },
    info(){},
    //请求部门树数据
    getTreeData(n) {
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = true;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      switch (n) {
        case "shou":
          name = "授权人";
          clearName = "authUserName";
          
          break;
        case "bei":
          name = "被授权人";
          clearName = "beAuthUserName";
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();

      this.$post
        .postData(
          "selectUserByTree",
          JSON.stringify({function:"selectUserByTree"}),
          this.$businessCode.sqgl
        )
        .then(res => {
          console.log(JSON.stringify(res.data));
          that.treeData = (res && res.data) || [];
          if (that.treeData.length) {
            that.treeData.forEach(item => {
              item.content = JSON.parse(item.content);
              if (that.dialogType === "hui") {
                item.text = item.typeName;
              }
            });
          }
        });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        // if (name === "assistDeptName") {
        //   this.fromdata.assistDeptId = "";
        //   this.chenCheckData = [];
        // }
        // if (name === "assistDeptName") {
        //   this.fromdata.assistDeptId = "";
        //   this.xieCheckData = [];
        // }
      }
    },
    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },
    //数据截取
    cuteData(data, name, type) {
      if (this.fromdata[name]) {
        this.fromdata[name].forEach(item => {
          if (!item.status) {
            this.fromdata[data] = item.content;
            this.fromdata[type] = item.id;
          }
        });
      }
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(",");
      names = name.split(",");
      ids.map((item, n) => {
        obj.push({
          id: item,
          text: names[n]
        });
      });
      return obj;
    },
  
    //处理回显秘密类型
    secretTypeBackvalue(value) {
    },
    timebijiao1(val){
      // this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      if(this.fromdata.authEndTime < this.fromdata.authStartTime){
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "起始时间需大于当前时间",
            duration: 1000
          });
          this.fromdata.authStartTime="";
      }
      this.fromdata.authStartTime = dateFormate.date(Date.parse(this.fromdata.authStartTime),'YYYY-MM-DD HH:mm:ss');

    },
    timebijiao(val){
      if(this.fromdata.authEndTime < this.fromdata.authStartTime){
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "结束时间需大于起始时间",
            duration: 1000
          });
          this.fromdata.authEndTime="";
      }
      this.fromdata.authEndTime = dateFormate.date(Date.parse(this.fromdata.authEndTime),'YYYY-MM-DD HH:mm:ss');

    },
    //弹窗回显数据
    backDialogData(type) {
      let newA = [];
      switch (type) {
        // case "zhusong":
        //   this.checkIds = this.fromdata.mainIds
        //     ? this.fromdata.mainIds.split(",")
        //     : [];
        //   this.checkData = this.zhuCheckData;
        //   break;
        // case "chao":
        //   this.checkIds = this.fromdata.copyIds
        //     ? this.fromdata.copyIds.split(",")
        //     : [];
        //   this.checkData = this.chaoCheckData;
        //   break;
        // case "hui":
        //   this.checkIds = this.fromdata.signDepartmentIds
        //     ? this.fromdata.signDepartmentIds.split(",")
        //     : [];
        //   this.checkData = this.huiCheckData;
        //   break;
        // case "ben":
        //   this.checkIds = this.fromdata.inlineIds
        //     ? this.fromdata.inlineIds.split(",")
        //     : [];
        //   this.checkData = this.benCheckData;
        //   break;
        case "shou":
          this.checkIds = this.fromdata.authUserId
            ? this.fromdata.authUserId.split(",")
            : [];
          // this.checkData = this.chenCheckData;
          // if (this.dialogTypeBack) {
          //   this.checkData = [];
          //   this.checkIds = [];
          // }
          // break;

          this.checkData = this.undertakeDeptData.filter(item => {
            // item.disabled = false;
            item.hideType = false;
            return true;
          });
          //将协办选择人员 设置不可选
          if (this.assistDeptData.length) {
            newA = [].concat(this.assistDeptData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.undertakeDeptData, newA);
          this.checkIds = [].concat(
            this.checkIds,
            this.fromdata.beAuthUserId
              ? this.fromdata.beAuthUserId.split(";")
              : []
          );
          break;


        case "bei":
          this.checkIds = this.fromdata.beAuthUserId
            ? this.fromdata.beAuthUserId.split(",")
            : [];
          // this.checkData = this.xieCheckData;
          // break;


          this.checkData = this.assistDeptData.filter(item => {
            // item.disabled = false;
            item.hideType = false;
            return true;
          });
          //将承办选择人员 设置不可选
          if (this.undertakeDeptData.length) {
            newA = [].concat(this.undertakeDeptData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.assistDeptData, newA);
          this.checkIds = [].concat(
            this.checkIds,
            this.fromdata.authUserId
              ? this.fromdata.authUserId.split(";")
              : []
          );
          break;


        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
    //树节点被选中
    nodeClick(data){
      alert(1)
      console.log(data)
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params,dtype) {
        let buMenName = "";
      let judge = true;
      let that = this;
      if (this.dialogType === "dosend") {
        judge = this.saveCheck();
      }
      if (!judge) {
        return;
      }
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(",");
          ids = ids.join(",");
         console.log("data1111",data)

        debugger
          buMenName =
            data[0].deptId ||
            "";
         console.log("buMenName",buMenName)

        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (dtype) {
          case "zhusong":
            this.fromdata.main = names;
            this.fromdata.mainIds = ids;
            this.zhuCheckData = this.checkData;
            break;
          case "chao":
            this.fromdata.copy = names;
            this.fromdata.copyIds = ids;
            this.chaoCheckData = this.checkData;
            break;
          case "hui":
            this.fromdata.signDepartment = names;
            this.fromdata.signDepartmentIds = ids;
            this.huiCheckData = this.checkData;
            break;
          case "ben":
            this.fromdata.inline = names;
            this.fromdata.inlineIds = ids;
            this.benCheckData = this.checkData;
            break;
          case "dosend":
            this.bank_doSend.nextUserName = names;
            this.bank_doSend.nextUserId = ids;
            this.bank_doSend.nextNodeId = params.id;
            this.bank_doSend.nextNodeName = params.name;
            break;
          case "shou":
            this.fromdata.authUserName = names;
            this.fromdata.authUserId = ids;
            this.undertakeDeptData = this.checkData;
            this.fromdata.authDeptName = buMenName;
            break;
        case "bei":
            this.fromdata.beAuthUserName = names;
            this.fromdata.beAuthUserId = ids;
            this.assistDeptData = this.checkData;
            this.fromdata.authDeptName = buMenName;

            break;
        }
        this.$forceUpdate();
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend") {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      let params = Object.assign(this.bank_doSend, this.fromdata);
      this.$post
        .postData("doSend", JSON.stringify(params), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 500,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              }
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1000
          });
        });
    },
   
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      let result = true;
      this.$refs.fromdata.validate((valid, object) => {
        if (!valid) {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
          result = false;
        }
      });
      return result;
    },
    //保存时校验
    saveCheck() {
      let regT = /^[0-9]*$/;
      if (!this.scrollIntoForm()) {
        return false;
      }
      if (!regT.test(this.fromdata.phone)) {
        tips = "电话号码输入有误";
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return false;
      } else {
        return true;
      }
    },

    // 下拉列表
    getSendOrderDicByParam() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.bank_dispachfile),
          this.baoWenZiDuan
        )
        .then(res => {
          this.SsendType = JSON.parse(res.data.sendType);
          this.SemergencyLevel = JSON.parse(res.data.emergencyLevel);
          this.SbusinessType = JSON.parse(res.data.businessType);
          this.StextType = JSON.parse(res.data.textType);
          this.SsecretType = JSON.parse(res.data.eleSendSecretType);
          this.SsecretTimeType = JSON.parse(res.data.eleSendSecretLimit);
          this.SsecretFlagType = JSON.parse(res.data.secretFlag);
          this.SdirectRange = JSON.parse(res.data.directSendRange);
          this.SdirectType = JSON.parse(res.data.directSendType);
          this.SkeepLimit = JSON.parse(res.data.eleSendSecretLimit);
          this.SworkSecretFlag = JSON.parse(res.data.workSecretFlag);
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    //初始值 //input框内容
    toEdit() {
      // this.bank_dispach.id = this.bank_dispach.id
      //   ? this.bank_dispach.id
      //   : sessionStorage.getItem("subTempid") || "";
      let that = this;
      this.$post
        .postData(
          "selectByIdCQ",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.sqgl
        )
        .then(res => {
          that.fromdata = res.data;
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
    },

    // 代字/红头  下拉 发文字号获取值
    selectredhead(redHeadITEM) {
      this.fromdata.documentNo = redHeadITEM;
    },
    // 保存
    preserve(type) {
        console.log(11111111111111111111,this.fromdata)

      let parms ={function:"saveOrUpdate",id:this.bank_dispach.id}
      var obj = Object.assign(parms, this.fromdata);
      this.$post
        .postData("saveOrUpdate", JSON.stringify(parms), this.$businessCode.sqgl)
        .then(res => {
          if (res && res.success) {
            // this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            sessionStorage.setItem("subTempid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            window.close();
            window.opener.location.reload();
            this.toEdit();

          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 1000
          });
        });
    },

    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
     if (scrolled < this.distance_qpyj) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_qpyj && scrolled <= 1100
      ) {
        this.active = "#qpyj";
      } else if(scrolled < this.distance_scfj) {
        this.active = "#scfj";
      }
    },
    // 返回上级页面
    goBack() {
      window.history.go(-1);
    },
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.preserve();
          window.location.href = "about:blank";
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消关闭",
            duation: 1000
          });
        });
    },

    // 起草正文
    drafting() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },

    delectArticle(){
      //deleteById
      let parms = {function:"deleteById",id:this.fromdata.id};
      this.$post
        .postData("deleteById", JSON.stringify(parms), this.$businessCode.sqgl)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 1000
            });
          window.history.go(-1);
          window.opener.location.reload();
          }else{
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "删除失败",
              duration: 1000
            });
          }

       
        })
        .catch(erro => {
          
        });
     
    },


    // 终止
    breakArticle() {
      let parms = {function:"supspensionAuthorization",id:this.fromdata.id};
      this.$post
        .postData("supspensionAuthorization", JSON.stringify(parms), this.$businessCode.sqgl)
        .then(res => {
          if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "操作成功",
                duration: 1000
              });
              this.fromdata.supspensionTime = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDay()
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "操作失败",
            duration: 1000
          });
        });
    },
    // 收藏
    collect() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },
    
  
    // 操作指南
    instructions() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },
    handleSave() {},
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //定密依据接收子组件传值
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          this.fromdata.opinionCheck = this.fromdata.opinionCheck
            ? this.fromdata.opinionCheck + data
            : data;
        } else if (this.clickTypes == 2) {
          this.fromdata.officeOpinion += data;
        } else if (this.clickTypes == 3) {
          this.fromdata.undertakeOrgOpinion += data;
        }
        this.$forceUpdate();
      }
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "doDeletesendOrderOpinion",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.grxxbg
        )
        .then(res => {
          if (res && res.success) {
          ssage({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1000
            });
            this.$refresh;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1000
          });
        });
    },

    getMukuai(){
      let selectAgent = {function: "selectAgent"};
      this.$post.postData(
        "selectAgent",
        JSON.stringify(selectAgent),
        this.$businessCode.sqgl
      ).then(res => {
        if(res && res.success){
          this.modules = res.data;
        }
      })
    },
  },
  created() {
    this.getMukuai();
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_doSend.id = this.bank_dispach.id;
    this.state = this.$route.query.state > 1? true:false;
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : this.$route.query.READFLAG ? this.$route.query.READFLAG: '';
    this.toEdit();
    //this.getSendOrderDicByParam();
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
    visibility: hidden;
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
    background-color: #fff;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 40px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: #ff6600;
          }
        }
        .bank_article_illustrates {
          position: absolute;
          top: 3px;
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
.tit1{
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}
.btnbox{
    padding: 10px 200px;
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.opinionCheck_w {
  width: 100%;
  height: 84px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
  .opinionCheck {
    text-align: left;
    margin-left: 20px;
  }
  .opinionCheckpeo {
    text-align: right;
    margin-right: 20px;
  }
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
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #c0c4cc;
}
.disable_w {
  width: 100%;
}
</style>
