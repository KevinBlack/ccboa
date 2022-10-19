<template>
  <div class="qcDetail" id="shiwuzhifa">
    <div class="headerClick">
      <!--        <el-button plain size="mini" class="bank_grid_comtent_active" @click="closeData()">关闭</el-button>-->
      <el-button
        class="bank_grid_comtent_active"
        v-for="(item,index) in buttonList"
        @click="buttonClick(item.name)"
        :key="index"
        v-show="buttonList[index].show"
        size="mini"
        plain
      >{{item.name}}</el-button>
    </div>
    <div class>
      <!-- <div class="shiwuTitle">{{formData.applyProjectName}}审批处理单</div> -->
      <div class="shiwuTitle">主办下级行请示事项办理情况</div>
    </div>
    <div id="wjys" class="height_90"></div>
    <h6 class="bank_dispach_file_tit">当前处理人:{{}}</h6>
    <el-form :rules="rules" :model="formData" label-width="120px">
      <!-- <el-form-item></el-form-item> -->
      <h4 h4 class="bank_dispach_file_tit">表单要素</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否办结">
            <el-radio-group v-model="formData.spbankIsUse" :disabled="isWeiHu">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否纳入统计">
            <el-radio-group v-model="formData.spbankIsUse" :disabled="isWeiHu">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="收文时间">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文号">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="来文单位">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急程度">
            <el-select style="width:100%" v-model="formData.draftDepartment" :disabled="isWeiHu">
              <el-option v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="主题词">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
	   <el-row>
            <el-col :span="8">
              <el-form-item label="部门名称" prop="unitNm">
                <el-input v-model="formData.unitNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-button class="btn" :span="2" @click="Browse(1)">选择</el-button>
			 <el-col :span="8">
              <el-form-item label="统计等同名称" prop="unionUnitNm">
                <el-input v-model="formData.unionUnitNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-button class="btn" :span="2" @click="Browse(2)">选择</el-button>
          </el-row>

          
		  <el-row>
        <el-col :span="8">
          <el-form-item label="督办时间">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
		<el-col :span="8">
          <el-form-item label="办理期限">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
	  <el-row>
	     <el-col :span="8">
          <el-form-item label="督办时间">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
		<el-col :span="8">
          <el-form-item label="办理期限">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
	  <el-row>
		  <el-col :span="8">
			  <el-form-item label="办理状态">
				   <el-select style="width:100%" v-model="formData.draftDepartment" :disabled="isWeiHu">
              <el-option v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
            </el-select>
			  </el-form-item>
			 
		  </el-col>
		   <el-col :span="8">
          <el-form-item label="办理时间">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
	  </el-row>
	   <el-row>
	     <el-col :span="8">
          <el-form-item label="发送协办时间">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
		<el-col :span="8">
          <el-form-item label="结束协办时间">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

	  <div>
		  <div>协办</div>
		  <el-table :data="hYData"
            border
            ref="multipleTable"
            style="width: 100%"
          >
           
            <el-table-column prop="orderNum" label="协办部门" align="center" width="70">             
            </el-table-column>
            <el-table-column prop="ytMc" label="协办开始时间" align="center" width="100">          
            </el-table-column>
            <el-table-column prop="strZhbr" label="协办结束时间" align="center" width="120">
				        </el-table-column>

		  </el-table>

	  </div>
	     <el-row>
        <el-col :span="24">
          <el-form-item label="办公室批办意见">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="承办部门办理情况">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
	    <el-row>
        <el-col :span="24">
          <el-form-item label="办结情况">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
	     <el-row>
	     <el-col :span="8">
          <el-form-item label="催办信息">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
		<el-col :span="8">
          <el-form-item label="催办次数">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
	     <el-row>
	     <el-col :span="8">
          <el-form-item label="首次催办信息">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
		<el-col :span="8">
          <el-form-item label="末次催办时间">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
	   <div>
		  <div>流程记录</div>
		  <el-table :data="hYData"
            border
            ref="multipleTable"
            style="width: 100%"
          >
           <el-table-column type="selection" width="55">序号</el-table-column>
            <el-table-column prop="orderNum" label="处理环节" align="center" width="70">             
            </el-table-column>
            <el-table-column prop="ytMc" label="操作时间" align="center" width="100">          
            </el-table-column>
            <el-table-column prop="strZhbr" label="处理人" align="center" width="120">
			</el-table-column>
			 <el-table-column prop="strZhbr" label="处理记录" align="center" width="120">
			</el-table-column>

		  </el-table>

	  </div>
	  <div>统计信息</div>
	   <el-row>
		  <el-col :span="6">
			  <el-form-item label="发送协办时间_最早">
				   <el-select style="width:100%" v-model="formData.draftDepartment" :disabled="isWeiHu">
              <el-option v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
            </el-select>
			  </el-form-item>
			 
		  </el-col>
		   <el-col :span="10">
          <el-form-item label="协办次数">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
	  </el-row>
	  <el-row>
		  <el-col :span="6">
			  <el-form-item label="发送协办时间_统计">
				   <el-select style="width:100%" v-model="formData.draftDepartment" :disabled="isWeiHu">
              <el-option v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
            </el-select>
			  </el-form-item>
			 
		  </el-col>
		   <el-col :span="6">
          <el-form-item label="结束协办时间_统计">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
		 <el-col :span="6">
          <el-form-item label="协办反馈用时">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
	  </el-row>
	   <el-row>
		  <el-col :span="6">
			  <el-form-item label="督办时间_统计">
				   <el-select style="width:100%" v-model="formData.draftDepartment" :disabled="isWeiHu">
              <el-option v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
            </el-select>
			  </el-form-item>
			 
		  </el-col>
		   <el-col :span="6">
          <el-form-item label="办结时间_统计">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
		 <el-col :span="6">
          <el-form-item label="处理工作日">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
	  </el-row>
	  <el-row>
		  <el-col :span="6">
			  <el-form-item label="承办部门_类型">
				   <el-select style="width:100%" v-model="formData.draftDepartment" :disabled="isWeiHu">
              <el-option v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
            </el-select>
			  </el-form-item>
			 
		  </el-col>
		   <el-col :span="6">
          <el-form-item label="主办部门处理用时">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
		 <el-col :span="6">
          <el-form-item label="主办部门处理用时占比">
            <el-input v-model="formData.createTime" :disabled="isWeiHu"></el-input>
          </el-form-item>
        </el-col>
	  </el-row>
	   <div>
		  <div>协办部门_类型</div>
		  <el-table :data="hYData"
            border
            ref="multipleTable"
            style="width: 100%"
          >
          
            <el-table-column prop="orderNum" label="协办部门" align="center" width="70">             
            </el-table-column>
            <el-table-column prop="ytMc" label="协办开始时间" align="center" width="100">          
            </el-table-column>
            <el-table-column prop="strZhbr" label="协办结束时间" align="center" width="120">
			</el-table-column>
			 <el-table-column prop="strZhbr" label="协办部门处理用时" align="center" width="120">
			</el-table-column>
			<el-table-column prop="strZhbr" label="协办部门处理用时占比" align="center" width="120">
			</el-table-column>

		  </el-table>

	  </div>




     

 
    

    </el-form>

    <org-tree v-model="showOrgTree" title="选择部门" :selectDept="selectDept" @orgList="getOrgList"></org-tree>
    <org-tree
      v-model="showOrgTree1"
      title="选择统计部门"
      :selectDept="selectDept1"
      @orgList="getOrgList1"
      :isSingle="false"
    ></org-tree>

    <!-- </div> -->
    <!--    <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart>-->

    <!--    选择人员树-->
    <!-- <select-person
      :treeData="treeData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :fromdata="formData"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />-->
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from "components/tree/orgTree"; //部门选择组件
import selectPerson from "components/tree/tree-fawen";
import flowChart from "components/dialog/flowChart";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import openOrDownLoadFile from "@/minixs/openOrDownLoadFile";
import exportTable from "@/minixs/exportTable";
import uploadFileTs from "components/uploadFile/uploadFileTs";

export default {
  name: "qcDetail",
  components: {
    selectPerson,
    flowChart,
    shiwuFlow,
    uploadFileTs,
    orgTree
  },
  mixins: [openOrDownLoadFile],
  data() {
    return {
		showOrgTree:false,
		showOrgTree1:false,
		hYData:[],
      selectDept: [],
      selectDept1: [],
      isdialogYR: false,
      YRrules: {
        YRbusinName: [
          { required: true, message: "请选择依据文件类型", trigger: "blur" }
        ],
        YRwenhao: [{ required: true, message: "请输入文号", trigger: "blur" }]
      },
      YRformData: {},
      choobusiness: [
        { name: "发文", idType: "1" },
        { name: "收文", idType: "2" },
        { name: "签报", idType: "3" },
        { name: "便函", idType: "4" }
      ],
      uploadConfig: {
        formId: "shiwuForm",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      isWeiHu: true,
      isGC: false,
      isZG: false,
      YRcurrentBtn: "",
      YRcheck: [],
      YRDeal: {},
      isdialogYRDeal: false,
      flowChartList: [],
      showFlowChart: false,
      titleData: {},
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      seletOptionsData: [],
      flowChartList: [],
      showFlowChart: false,
      delCode: [],
      deleteapplyCode: "",
      resData: {},
      isdialog: false,
      listCode: "",
      btnType: "1",
      offenUse: true,
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: false, // 单选true 多选为false
      dialogTypeNow: "next",
      treeData: [{ name: "中国建设银行", id: "007" }],
      rowData: {},
      fromType: "",
      checkType: [],
      select: "",
      radio: "",
      rules: {},
      formData: {
        markList: [],
        applyOpinionList: [],
        cyOpinionList: [],
        blqkOpinionList: [],
        checkOpinionList: []
      },
      khType: "",
      buttonList: [
        { name: "关闭", show: true },
        { name: "保存", show: false },
        { name: "修改申请", show: false },
        { name: "查看流程", show: true },
        { name: "流程调度", show: true },
        { name: "维护", show: true },
        { name: "打印处理单", show: true },
        { name: "收藏", show: true }
      ],
      id: ""
    };
  },
  computed: {},
  methods: {
    //选择部门
    Browse(val) {
      switch (val) {
        case 1:
          this.showOrgTree = true;
          break;
        case 2:
          this.showOrgTree1 = true;
      }
    },
    getOrgList(org) {
      console.log(org, "部门选择返回数据");
      this.$set(this.formData, "unitNm", org.unitName);
      this.$set(this.formData, "unitId", org.id);
    },
    getOrgList1(org) {
      console.log(org, "部门tongji选择返回数据");
      let arr = [];
      let arr1 = [];
      org.map(item => {
        if (Object.keys(item)) {
          arr.push(item.unitName);
          arr1.push(item.id);
        }
        console.log(arr.join(","));
        console.log(arr1.join(","));
      });
      this.$set(this.formData, "unionUnitNm", arr.join(","));
      this.$set(this.formData, "unionUnitId", arr1.join(","));
    },
    YRhandleClose() {
      this.isdialogYR = false;
    },
    deleMark(n, dataId) {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (dataId) {
            this.$api.checkLz.adminDeleMark({ id: dataId }).then(res => {
              if (res.code == "SUCCESS") {
                this.formData.mark = "";
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.queryDeal();
              }
            });
          } else {
            this.$nextTick(() => {
              this.formData.markList.splice(n, 1);
            });
          }
        })
        .catch(() => {});
    },
    deleSugg(sugg, n, dataId) {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (dataId) {
            this.$api.checkLz.adminDeleSugg({ id: dataId }).then(res => {
              if (res.code == "SUCCESS") {
                this.formData.mark = "";
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.queryDeal();
              }
            });
          } else {
            switch (sugg) {
              case (sugg = "applyOpinionList"):
                this.formData.applyOpinionList.splice(n, 1);
                break;
              case (sugg = "cyOpinionList"):
                this.formData.cyOpinionList.splice(n, 1);
                break;
              case (sugg = "blqkOpinionList"):
                this.formData.blqkOpinionList.splice(n, 1);
                break;
              case (sugg = "checkOpinionList"):
                this.formData.checkOpinionList.splice(n, 1);
                break;
            }
          }
        })
        .catch(() => {});
    },
    addSucc(range) {
      let AdepartmentName = JSON.parse(localStorage.getItem("userInfo"))
        .firstUnitName;
      let AcreateUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AuserName = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD");
      switch (range) {
        case (range = "checkOpinionList"):
          this.formData.checkOpinionList.push({
            content: "",
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "1"
          });
          break;
        case (range = "applyOpinionList"):
          this.formData.applyOpinionList.push({
            content: "",
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "2"
          });
          break;
        case (range = "blqkOpinionList"):
          this.formData.blqkOpinionList.push({
            content: "",
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "4"
          });
          break;
        case (range = "cyOpinionList"):
          this.formData.cyOpinionList.push({
            content: "",
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "3"
          });
          break;
        case (range = "markList"):
          this.formData.markList.push({
            content: "",
            departmentName: AdepartmentName,
            userName: AuserName,
            createTime: AcreateTime
          });
          break;
      }
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
      if (scrolled < this.distance_wjys + 100) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_wjys - 100 &&
        scrolled < this.distance_qpyj + 100
      ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.$intent.closeWindow(this);
          break;

        case "查看流程":
          this.$api.checkLz
            .flowDeal({
              workFlowId: this.formData.workFlowId,
              id: this.formData.id
            })
            .then(res => {
              this.showFlowChart = true;
              this.tableData = res.list;
              this.$nextTick(() => {
                this.$refs.dialogLine.openDialog();
              });
            });
          break;
        case "打印处理单":
          this.printForm();
          break;
        case "收藏":
          let that = this;
          let shiwutitle =
            (this.formData.unitName || this.formData.curbank) +
            this.formData.applyProjectName +
            "审批处理单";
          let draftInfo = this.formData.xksqFilePath
            ? [].concat(
                {
                  fileName: this.formData.xksqFileName,
                  filePath: this.formData.xksqFilePath
                },
                this.formData.attchmentFileInfo
              )
            : this.formData.attchmentFileInfo; //收藏时下载正文
          exportTable.getPdf(
            shiwutitle,
            draftInfo,
            "shiwuzhifa",
            this.$businessCode.fawglfj,
            shiwutitle,
            that
          );
          break;
        case "流程调度":
          this.flowAlter();
          break;
        case "维护":
          this.isWeiHu = false;
          this.buttonList[1].show = true;
          this.buttonList[2].show = true;
          break;
        case "保存":
          this.saveData();
          break;
        case "修改申请":
          this.viewApply();
          break;
      }
    },
    //申请跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_WordTs",
        query: {
          state: this.shiwuState,
          tanSun: "1",
          id: this.id ? this.id : "1",
          isKh: this.formData.isKh.toString(),
          zhengWenState: fileInfo.ifView,
          JYcode: "A08462002",
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          multiTenancyId: "000076767qwq0",
          cleanDraftFlag: true,
          showBtns: fileInfo.ifView == 0 ? false : true,
          serverUrl: "128.192.221.164"
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    //查看申请
    viewApply() {
      // this.ifView = '0'
      this.shiwuState = "viewFile";
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = this.formData.xksqFileName;
      bank_doDownloadFile.filePath = this.formData.xksqFilePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              res.ifView = 1;
              this.doDraft(res);
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    },
    saveData() {
      this.formData.id = this.id;
      this.formData.opinionList = [
        ...this.formData.checkOpinionList,
        ...this.formData.applyOpinionList,
        ...this.formData.blqkOpinionList,
        ...this.formData.cyOpinionList
      ];
      this.$api.checkLz.adminLzSave(this.formData).then(res => {
        if (res.code == "SUCCESS") {
          this.formData.mark = "";
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.queryDeal();
        }
      });
    },
    //流程调度
    flowAlter() {
      this.$api.checkLz
        .flowControl({
          id: this.id
        })
        .then(res => {
          this.dialogState = true;
          this.treeData.push(res.data);
          this.seletOptionsData = res.list;
        });
    },
    //申请跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_WordTs",
        query: {
          state: this.shiwuState,
          tanSun: "1",
          id: this.id ? this.id : "1",
          isKh: this.formData.isKh.toString(),
          zhengWenState: fileInfo.ifView,
          JYcode: "A08462002",
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          multiTenancyId: "000076767qwq0",
          cleanDraftFlag: true,
          showBtns: fileInfo.ifView == 0 ? false : true,
          serverUrl: "128.192.221.164"
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    //填写申请
    writeApply() {
      this.ifView = 1;
      this.shiwuState = "viewFile";
      let bank_doDownloadFile = { function: "doDownloadFile" };
      this.formData.handleButton = "保存";
      if (this.formData.xksqFileName) {
        //处理申请
        bank_doDownloadFile.fileName = this.formData.xksqFileName;
        bank_doDownloadFile.filePath = this.formData.xksqFilePath;
        this.formData.id = this.id;
        this.$api.checkLz.checkLzAlter({ ...this.formData }).then(res => {
          this.$post
            .postData(
              "doDownloadFile",
              JSON.stringify(bank_doDownloadFile),
              this.$businessCode.fawglfj
            )
            .then(res => {
              if (res) {
                if (res && res.success) {
                  res.ifView = 1;

                  this.doDraft(res);
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "下载失败",
                    duration: 500
                  });
                }
              }
            });
        });
      } else {
        this.$message({
          type: "warning",
          message: "暂无文档"
        });
      }
    },
    //催办
    CBqueal() {},
    //打印处理单
    printForm() {
      let rowData = {};
      rowData.title =
        (this.formData.unitName || this.formData.curbank) +
        this.formData.applyProjectName +
        "审批处理单";
      rowData.id = this.id;
      rowData.idKh = this.formData.isKh;
      let copyRow = JSON.stringify(rowData);
      if (this.formData.isKh == 0) {
        this.$intent.goNewPage(this, {
          path: "/shiwuBenhang",
          query: { data: copyRow }
        });
      } else if (this.formData.isKh == 1) {
        this.$intent.goNewPage(this, {
          path: "/shiwuBenhangkh",
          query: { data: copyRow }
        });
      }
    },
    circulRe() {
      this.$api.checkLz
        .CYretrieve({
          id: this.id
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: "收回成功",
              type: "success"
            });
            this.$intent.closeWindow(this);
          }
        });
    },

    //请求详情
    queryDeal() {
      this.$api.checkLz
        .checkLzDeal({
          id: this.id,
          isKh: this.khType
        })
        .then(res => {
          //引入依据
          this.YRcheck = res.leadInfoList;
          this.formData = res.data;
          this.$nextTick(() => {
            this.$set(this.formData, "applyOpinionList", res.applyOpinionList);
            this.$set(this.formData, "sytyOpinionList", res.sytyOpinionList);
            this.$set(this.formData, "cyOpinionList", res.cyOpinionList);
            this.$set(this.formData, "blqkOpinionList", res.blqkOpinionList);
            this.$set(this.formData, "checkOpinionList", res.checkOpinionList);
            this.$set(this.formData, "markList", res.markList);
          });
          this.formData.manageSystemName = res.manageSystemName;
          this.formData.manageSystemPath = res.manageSystemPath;
          this.formData.xksqFileName = res.data.xksqFileName;
          this.formData.xksqFilePath = res.data.xksqFilePath;
          if (this.formData.isKh) {
            this.formData.isKh = parseInt(this.formData.isKh);
          }
          if (this.formData.finishTime) {
            this.buttonList[4].show = false;
          } else {
            this.buttonList[4].show = true;
          }
          this.getFileList();
        });
    },
    handleClose() {
      this.isdialog = false;
    },
    //收回
    lzRegin() {
      this.$api.checkLz
        .LZretrieve({
          id: this.id,
          avyId: this.rowData.avyId
        })
        .then(res => {
          // this.queryDeal()
          this.$message({
            type: "success",
            message: "收回成功"
          });
          this.$intent.closeWindow(this);
        });
    },
    YRhandleCloseDeal() {
      this.isdialogYRDeal = false;
    },
    //引入查看详情
    impoerDeal() {
      console.log("YRcurrentBtn", this.YRcurrentBtn);
      if (this.YRcurrentBtn && this.YRcurrentBtn.length > 1) {
        this.$message({
          type: "warning",
          message: "请只选择一条数据查看详情"
        });
      } else if (this.YRcurrentBtn && this.YRcurrentBtn.length == 0) {
        this.$message({
          type: "warning",
          message: "请只选择要查看的文号数据"
        });
      } else {
        this.YRJump();
      }
    },
    //引入删除
    importDle(item) {
      console.log("YRcurrentBtn", item);
      if (item && item.id) {
        console.log("111YRcurrentBtn", item);
        this.$api.checkLz
          .accordDelete({
            id: item.dataId,
            dataId: this.id
          })
          .then(res => {
            this.queryDeal();
          });
      } else {
        console.log("2222YRcurrentBtn", item);
        let currentIndex = 0;
        for (let i = 0; i < this.YRcheck.length; i++) {
          if (this.YRcheck[i].dataId == item.dataId) {
            currentIndex = i;
          }
        }
        this.YRcheck.splice(currentIndex, 1);
      }
    },
    //引入跳转依据
    YRJump() {
      let that = this;
      let currentCheck = {};
      this.YRcheck &&
        this.YRcheck.map(item => {
          if (item.orderNo == that.YRcurrentBtn) {
            currentCheck = item;
          }
        });
      switch (currentCheck.dataType) {
        case "4":
          console.log("跳转便函", currentCheck);
          this.$intent.goNewPage(this, {
            name: "yrBianhan",
            query: { type: this.sonselect, id: currentCheck.id }
          });
          break;
        case "2":
          console.log("跳转发文", currentCheck);
          this.$api.setSysConfig
            .getTextemList({
              id: currentCheck.dataId
            })
            .then(res => {
              this.$nextTick(() => {
                this.$set(currentCheck, "file", res.data);
              });
            });
          this.isdialogYRDeal = true;
          this.YRDeal = currentCheck;
          break;
        case "1":
          console.log("跳转收文", currentCheck);
          this.$api.setSysConfig
            .getTextemList({
              id: currentCheck.dataId
            })
            .then(res => {
              this.$nextTick(() => {
                this.$set(currentCheck, "file", res.data);
              });
            });
          this.isdialogYRDeal = true;
          this.YRDeal = currentCheck;
          break;
        case "3":
          console.log("跳转签报", currentCheck);
          this.$api.setSysConfig
            .getTextemList({
              id: currentCheck.dataId
            })
            .then(res => {
              this.$nextTick(() => {
                this.$set(currentCheck, "file", res.data);
              });
            });
          this.isdialogYRDeal = true;
          this.YRDeal = currentCheck;
          // this.$intent.goNewPage(this, {name: 'yrQianbao', query: {}})
          break;
      }
    },
    //附件上传
    //附件块
    fileList(files) {
      if (
        this.formData.attchmentFileInfo &&
        this.formData.attchmentFileInfo.length
      ) {
        this.formData.attchmentFileInfo.push(...files);
      } else {
        this.formData.attchmentFileInfo = files;
      }
      if (!this.formData.attachs) {
        this.formData.attachs = [];
      }
      files.forEach(item => {
        this.formData.attachs.push(item.id);
      });
      this.uploadConfig.filesHas = files;
      this.formData.attachid = this.formData.attachs.join(",");
      this.$forceUpdate();
    },
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.id
        })
        .then(res => {
          this.$nextTick(() => {
            this.$set(this.formData, "attchmentFileInfo", res.data);
          });
        });
    },
    // 附件上传下载排序
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$api.setSysConfig
          .deleFile({
            id: id
          })
          .then(res => {
            if (res && res.code == "SUCCESS") {
              this.formData.attchmentFileInfo.splice(n, 1);
              this.$forceUpdate();
              this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
              this.$message({
                type: "success",
                message: "删除成功"
              });
            }
          });
      });
    },
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
              // location.href =
              //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              //     res.filePath +
              //     "&fileName=" +
              //     res.fileName;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    },
    //    查看审批说明
    viewApproval() {
      if (this.formData.manageSystemName) {
        this.ifView = 0;
        this.shiwuState = "viewFile";
        let bank_doDownloadFile = { function: "doDownloadFile" };
        bank_doDownloadFile.fileName = this.formData.manageSystemName;
        bank_doDownloadFile.filePath = this.formData.manageSystemPath;
        this.$post
          .postData(
            "doDownloadFile",
            JSON.stringify(bank_doDownloadFile),
            this.$businessCode.fawglfj
          )
          .then(res => {
            if (res) {
              if (res && res.success) {
                res.ifView = 0;
                this.doDraft(res);
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "下载失败",
                  duration: 500
                });
              }
            }
          });
      } else {
        this.$message({
          type: "warning",
          message: "暂无审批说明文档"
        });
      }
    },

    //选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      console.log(
        "data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      if (status) {
        let chooseDataName = [];
        let chooseDataId = [];
        let id_name = [];
        data &&
          data.map(item => {
            item.id = "" + item.id;
            console.log("item.id", item.id);
            if (item.id.indexOf("#") > -1) {
              let itemId = item.id.split("#")[0];
              id_name.push(itemId + "_" + item.name);
              chooseDataName.push(item.name);
              chooseDataId.push(itemId);
            } else if (item.id.indexOf("#") == -1) {
              id_name.push(item.id + "_" + item.name);
              chooseDataName.push(item.name);
              chooseDataId.push(item.id);
            }
          });
        this.formData.currentUser = chooseDataName.join(",");
        this.formData.currentUserId = chooseDataId.join(",");
        if (this.btnType != "2") {
          this.formData.currentNode = params.name;
          this.formData.khType = this.khType;
          this.formData.id = this.id;
        }
        if (this.btnType == "1") {
          this.formData.currentUser = chooseDataName.join(",");
          this.formData.currentUserId = chooseDataId.join(",");
          this.$api.checkLz
            .checkLzAlter({
              ...this.formData,
              handleButton: "完成并发送",
              currentNodeId: params.id,
              currentNode: params.name
            })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.$intent.closeWindow(this);
              }
            })
            .catch(err => {
              this.queryDeal();
            });
        } else if (this.btnType == "2") {
          // this.formData.unreadPerson=params.name
          this.formData.curUserIds = id_name.join(",");
          console.log("传阅");
          this.$api.checkLz
            .checkCYCreate({
              ...this.formData,
              currentCode: "制发"
            })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.queryDeal();
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: "warning"
                });
              }
            });
        } else {
          return;
        }
      }
    }
  },
  activated() {},
  created() {
    if (this.$route.query && this.$route.query.type) {
      this.id = this.$route.query.id;
      this.queryDeal();
    }
    this.formData.applyOpinionList = [{ content: "1111" }];
  },
  mounted() {
//     this.$set(
//       this.formData,
//       "approveTime",
//       formatData(new Date().getTime(), "YYYY-MM-DD")
//     );
//     // 一次性计算赋值，减少滚动计算节点位置次数
//     this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
//     this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
//     this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
//     this.$nextTick(() => {
//       document
//         .querySelector("#bank_dispach_content")
//         .addEventListener("scroll", this.onScroll);
//     });
//     window.addEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
}

.qcDetail {
  background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-left: 20px;
      float: right;
    }
  }

  .qcHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }

  .process_content {
    width: 90%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 56px;
      margin-bottom: 20px;
      line-height: 56px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;

          span {
            color: #f9aa21;
          }
        }
      }
    }

    .bottom-span {
      span {
        display: block;
        margin-left: 10%;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
    }
  }
}

.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
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
}

.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.height_90 {
  height: 250px;
  margin-top: -250px;
}

.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.pad_lr10 {
  margin: 0 16px;
}

//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;

    .one_btn {
      width: 80px;
      height: 42px;
      line-height: 42px;
    }

    .btns {
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
    }

    .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }

    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
</style>
