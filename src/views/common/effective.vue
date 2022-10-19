<template>
	<div class="wrapper w100 h100" :style="{'height':clientNowHeight}">
		<el-scrollbar style="width:100%;height:100%">
			<div class="container w100 h100">
				<el-row class="h10">
					<el-col :span="24">
						<div class="header h100">
							<img src="../../assets/images/logo_03.png" alt="建设银行LOGO" class="centerLogo">
							<h1 class="headerTitle">{{baseParams.year+headerTitle}}</h1>
						</div>
					</el-col>
				</el-row>
				<el-row class="main h90">
					<el-col :span="6" style="max-width:25%;">
						<div class="leftCont w100 h100">
							<el-row class="bothSide">
								<span class="titLine"></span>
								<span class="sectionTitle">{{leftTitle}}</span>
								<el-tooltip placement="bottom-start" :visible-arrow="false" popper-class="tooltipWrapper">
									<div slot="content" class="helperWrapper" v-html="leftTitleHelper"></div>
									<span class="help el-icon-question"></span>
								</el-tooltip>
							</el-row>
							<el-row class="sideCont">
								<efficLeft @checkAll="checkAll"></efficLeft>
							</el-row>
						</div>
					</el-col>
					<el-col :span="12" style="max-width:50%;">
						<div class="middleCont h100 w100">
							<el-row class="h90">
								<div class="inputGroup">
									<el-row class="h100">
										<el-col :span="6" :class="{deptNamesWrap:dyncMain!='efficFirst'}">
											<input type="text"  v-show="dyncMain!='efficFirst'" @click="selectDepartment" readonly class="deptNames w100" placeholder="选择部门" v-model="departmentName" autocomplete="off"> 
										</el-col>
										<el-col :span="8" class="fixedDateWrapper">
											<el-button icon="el-icon-date" type="plain" class="fixedDate" @click="dateToggle">
												<span>{{baseParams.year+"年"}}</span>
												<span v-show="baseParams.timeType=='quarter'&&baseParams.quarter">{{"第"+baseParams.quarter+"季度"}}</span>
												<span v-show="baseParams.timeType=='month'&&baseParams.month">{{baseParams.month+"月"}}</span>
											</el-button>
											<div class="dateDrop" v-show="dateDropShow">
												<el-row>
													<el-col :span="6">筛选</el-col>
													<el-col :span="18">
														<el-radio-group v-model="params.timeType" @change="changeType(params.timeType)">
															<el-radio label="year">年</el-radio>
															<el-radio label="quarter">季度</el-radio>
															<el-radio label="month">月</el-radio>
														</el-radio-group>
													</el-col>
												</el-row>
												<el-row>
													<el-col :span="6">年度</el-col>
													<el-col :span="18">
														<el-select v-model="params.year" size="small">
															<el-option v-for="item in yearOptions" 
																:key="item.value" 
																:value="item.value"
																:label="item.value" ></el-option>
														</el-select>
													</el-col>
												</el-row>
												<el-row v-if="params.timeType=='quarter'">
													<el-col :span="6">季度</el-col>
													<el-col :span="18">
														<el-select v-model="params.quarter" size="small">
															<el-option v-for="item in quarterOptions" 
																:key="item.value" 
																:value="item.value"
																:label="item.label" ></el-option>
														</el-select>
													</el-col>
												</el-row>
												<el-row v-if="params.timeType=='month'">
													<el-col :span="6">月份</el-col>
													<el-col :span="18">
														<el-select v-model="params.month" size="small">
															<el-option v-for="item in monthOptions" 
																:key="item.value" 
																:value="item.value"
																:label="item.label" ></el-option>
														</el-select>
													</el-col>
												</el-row>
												<el-row>
													<el-col :span="12">
														<el-button size="mini" @click="dateConfirm">确定</el-button>
													</el-col>
													<el-col :span="8" v-if='false'>
														<el-button size="mini" @click="dateSaveDefault">保存默认</el-button>
													</el-col>
													<el-col :span="12">
														<el-button size="mini" @click="dateCancel">取消</el-button>
													</el-col>
												</el-row>
											</div>
										</el-col>
									</el-row>
								</div>
								<div class="middleInner">
									<el-row class="bothSide">
										<span class="titLine"></span>
										<span class="sectionTitle">{{middleTitle}}</span>
										<el-tooltip placement="bottom-start" :visible-arrow="false" popper-class="tooltipWrapper">
											<div slot="content" class="helperWrapper" v-html="middleTitleHelper"></div>
											<span class="help el-icon-question"></span>
										</el-tooltip>
									</el-row>
									<el-row class="innerCont">
										<div :is="dyncMain" @checkAll="checkAll"></div>
									</el-row>
								</div>
							</el-row>
							<el-row class="h10 btnGroup">
								<el-col :span="8">
									<el-button type="plain" :class="{active:params.activeName=='headOffice'}" @click="orgChange('headOffice')">本行</el-button>
								</el-col>
								<el-col :span="8">
									<el-button v-if="YJHSHOW" type="plain" :class="{active:params.activeName=='subBank'}" @click="orgChange('subBank')">{{xjhTEXT}}</el-button>
								</el-col>
								<el-col :span="8">
									<el-button  type="plain" :class="{active:params.activeName=='mineDept'}" @click="orgChange('mineDept')">本部门</el-button>
								</el-col>
							</el-row>
						</div>
					</el-col>
					<el-col :span="6" style="max-width:25%;">
						<div class="rightCont w100 h100">
							<el-row class="bothSide">
								<span class="titLine"></span>
								<span class="sectionTitle">{{rightTitle}}</span>
								<el-tooltip placement="bottom-end" :visible-arrow="false" popper-class="tooltipWrapper">
									<div slot="content" class="helperWrapper" v-html="rightTitleHelper"></div>
									<span class="help el-icon-question"></span>
								</el-tooltip>
							</el-row>
							<el-row class="sideCont">
								<efficRight @checkAll="checkAll"></efficRight>
							</el-row>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-scrollbar>
		<el-dialog
			class="deepColor"
			:visible.sync="checkAllShow"
      :modal-append-to-body="false"
      width="80%"
      :title="checkAllDialogTitle"	
		>
			<div v-if="checkAllShow" :is="dyncTable"></div>
		</el-dialog>
		<el-dialog
      width="400"
			title="选择单位或部门"
			:modal-append-to-body="false"
			:before-close="deptMineClose"
			:visible.sync="showDeptMineDialog">
				<div class="deptMineDialog">
					<el-radio-group v-model="deptMineId">
						<el-radio v-for="item in deptTreeMine" :key="item.id" :label="item.id">{{item.name}}</el-radio>
					</el-radio-group>
				</div>
				<div slot="footer">
					<el-button type="plain" size="small" @click="deptMineClose">取消</el-button>
					<el-button type="primary" size="small" @click="deptMineConfirm">确定</el-button>
				</div>
		</el-dialog>
		<treeCofig
      :treeData="treeData"
      :canTab="false"
      :hasRadio="false"
      dialogTit="选择部门"
      :singelCheckF="false"
      :checkIds="checkIds"
      :checkData="checkData"
      dialogType="hui"
      :dialogState="dialogState"
      :offenUse="false"
      @showCompDialog="showCompDialog"
			:handleLoadFlag="false"
    ></treeCofig>
	</div>
</template>
<script>
import efficLeft from "./components/efficLeft"
import efficRight from "./components/efficRight"
import efficMainZH from "./components/efficMainZH"
import efficFirst from "./components/efficFirst"
import efficMine from "./components/efficMine"
import FWAll from "./components/FWAll"
import HQAll from "./components/HQAll"
import delayAll from "./components/delayAll"
import wtEfficAll from "./components/wtEfficAll"
import finEfficAll from "./components/finEfficAll"
import retryAll from "./components/retryAll"
import backAll from "./components/backAll"
import {mapGetters,mapActions} from "vuex";
import treeCofig from '@/components/tree/tree-fawen';
export default {
	data(){
		return{
			clientNowHeight:'',
			leftTitleHelper:"",
			middleTitleHelper:"",
			rightTitleHelper:"",
			departmentName:'',
			dialogState:false,
			showDeptMineDialog:false,
			treeData:[],
			deptTreeData:[],
			deptTreeMine:[],
			deptMineId:"",
			checkIds:[],
			checkData:[],
			params:{
				activeName:"headOffice",
				timeType:"year",
				deptIds:"", 	
				year:"", 
				quarter:"",  
				month:"",   
			},
			dyncMain:"efficMainZH", //efficMainZH-总行； efficMine--本部；efficFirst--一级行；
			dyncTable:"", //动态组件
			checkAllDialogTitle:"", //全部类表标题
			checkAllShow:false, //查看全部事件
			dateDropShow:false, //时间空间显示控制
			headerTitle:"办公效率地图", //头部标题
			leftTitle:"专项督办", 	//左侧标题
			rightTitle:"办文质量",  //右侧标题
			middleTitle:"办事效率", //主体标题
			quarterOptions:[  //季节下拉选项
				{label:"第一季度",value:"1"},
				{label:"第二季度",value:"2"},
				{label:"第三季度",value:"3"},
				{label:"第四季度",value:"4"},
			],
			monthOptions:[], //月份下拉选项
			yearOptions:[], //年份下拉选项（近三年）
			YJHSHOW:false,//地图是否显示
			xjhTEXT:'',
			lwxlTEXT:'',
		}
	},
	watch:{
		"baseParams":{
			handler(val){
				this.params = JSON.parse(JSON.stringify(val))
			},
			deep:true
		}
	},
	computed:{
		...mapGetters('efficiency',["baseParams","explainText"])
	},
	methods:{
		...mapActions("efficiency",["setBaseParams"]),
		dateToggle(){
			this.dateDropShow = !this.dateDropShow;
			let vm = this;
			document.onclick = function(e){
				let dom = $(".fixedDate");
				let wrapper = $(".dateDrop");
				if(!dom.is(e.target)&&dom.has(e.target).length === 0&&wrapper.has(e.target).length === 0){
					vm.dateDropShow = false;
				}
			}
		},
		dateCancel(){
			this.dateDropShow = false;
		},
		changeType(type){
			if(type=='year'){
				this.params.year = new Date().getFullYear();
			}else if(type=='quarter'){
				this.params.quarter = '1';
			}else if(type=='month'){
				this.params.month  = parseInt(new Date().getMonth())+1;
			}
		},
		dateConfirm(){
			if(this.params.timeType=='year'){
				this.params.quarter = this.params.month = "";
			}else if(this.params.timeType=='quarter'){
				this.params.month = "";
			}else if(this.params.timeType=='month'){
				this.params.quarter = "";
			}
			if(localStorage.getItem('bl')=='feedBackL'){
				localStorage.setItem('bl','avgDays')
				localStorage.setItem('blt','1')
			}
			this.setBaseParams(this.params);
			this.dateCancel();
		},
		selectDepartment(){
			if(this.params.activeName=="headOffice"){
				this.dialogState = true;
				if(this.deptTreeData.length==0){
					this.getTreeData();
				}
			}else{
				this.showDeptMineDialog = true;
			}
			
		},
		dateSaveDefault(){
			//保存为默认:TODO
			this.setBaseParams(this.params);
			this.dateCancel();
		},
		initData(){
			this.leftTitleHelper = this.explainText.zxdb;
			this.middleTitleHelper = this.explainText.bsxl;
			this.rightTitleHelper = this.explainText.bwzl;
			//middleTitleHelper
		},
		setMonthOptions(){
			this.monthOptions=[];
			for(let i=1;i<=12;i++){
				let obj = {
					label:i,
					value:i
				};
				this.monthOptions.push(obj);
			}
		},
		setYearOptions(){
			this.yearOptions=[];
			let currentYear = new Date().getFullYear();
			for(let i=currentYear;i>currentYear-3;i--){
				let obj = {
					label:i,
					value:i
				};
				this.yearOptions.push(obj);
			}
		},
		orgChange(type){
			let vm = this;
			this.params.activeName = type;
			switch(type){
				case "headOffice":
					vm.rightTitle = "办文质量"
					vm.headerTitle = "办公效率"
					vm.leftTitle = "专项督办"
					vm.middleTitle = "办事效率"
					vm.dyncMain = "efficMainZH"
					vm.treeData =vm.deptTreeData;
					vm.leftTitleHelper = vm.explainText.zxdb;
					vm.checkIds=[];
					vm.checkData = [];
					this.middleTitleHelper = this.explainText.bsxl;
					break;
				case "subBank":
					this.rightTitleHelper = this.explainText.bwxl;
					vm.leftTitle = "专项督办"
					vm.headerTitle = "办公效率地图"
					vm.middleTitle = this.lwxlTEXT
					vm.rightTitle = "办文效率"
					vm.dyncMain = "efficFirst"
					this.middleTitleHelper = this.xjhTEXT == '一级分行' ? this.explainText.yjfhblxl : this.explainText.xjfhblxl;
					vm.leftTitleHelper = vm.explainText.yjzxdbtitlt;
					break;
				case "mineDept":
					vm.leftTitle = "办文效率"
					vm.rightTitle = "办文质量"
					vm.middleTitle = "办事效率"
					vm.headerTitle = "测试（一级部门）办公效率"
					vm.dyncMain = "efficMine"
					vm.leftTitleHelper = vm.explainText.bwxl;
					this.middleTitleHelper = this.explainText.bsxl;
					vm.getDeptTreeMine();
					break;
			}
			
			vm.baseParamsUpdate();
		},
		checkAll(params){
			let classes = params.classes
			switch(classes){
				case "FWAll":
					this.checkAllDialogTitle = "办文效率——发文";
					this.dyncTable = "FWAll";
					break;
				case "HQAll":
					this.checkAllDialogTitle = "办文效率——会签";
					this.dyncTable = "HQAll";
					break;
				case "delayAll":
					this.checkAllDialogTitle = "待办稍后处理";
					this.dyncTable = "delayAll";
					break;
				case "wtEfficAll":
					this.checkAllDialogTitle = "整体部门效率——未办结";
					this.dyncTable = "wtEfficAll";
					break;
				case "finEfficAll":
					this.checkAllDialogTitle = "整体部门效率——已办结";
					this.dyncTable = "finEfficAll";
					break;
				case "retryAll":
					this.checkAllDialogTitle = "办文质量——重发";
					this.dyncTable = "retryAll";
					break;
				case "backAll":
					this.checkAllDialogTitle = "办文质量——退回";
					this.dyncTable = "backAll";
					break;
			};
			this.checkAllShow = true;
		},
		getTreeData(){
			let params = {
				function: "selUnitTreeByHQ",
				flag: true,
				showMyDept:"",
			}
			this.$post.postData(
        "selUnitTreeByHQ",
        JSON.stringify(params),
        this.$businessCode.xnkb
      ).then(res => {
				this.deptTreeData = (res && res.data) || [];
				if(this.baseParams.activeName!="mineDept"){
					this.treeData = this.deptTreeData;
				}
      });
		},
		getDeptTreeMine(){ //获取本部门选择列表
			let list = JSON.parse(localStorage.getItem("unitInfo"));
			let unitIdMine = JSON.parse(localStorage.getItem("userInfo")).unitId;
			this.deptTreeMine=[];
			this.checkData=[];
			this.checkIds=[];
			list.map(item=>{
				if(item.unitId == unitIdMine&&item.firstUnitId == item.firstUnitId){
					let obj = {}
					obj.id = item.firstUnitId;
					obj.name = item.firstUnitName;//currUnitName
					this.deptTreeMine.push(obj);
				}
			})
			if(this.deptTreeMine.length == 0){
				let obj = {}
				obj.id = JSON.parse(localStorage.getItem("userInfo")).firstUnitId;
				obj.name = JSON.parse(localStorage.getItem("userInfo")).firstUnitName;
				this.deptTreeMine.push(obj)
			}
			this.deptMineId =this.deptTreeMine[0]&&this.deptTreeMine[0].id;
			let checkedName =this.deptTreeMine[0];
			this.headerTitle =`${this.deptTreeMine[0].name}办公效率`;
			this.checkData.push(checkedName);
			this.checkIds.push(this.deptMineId);
		},
		deptMineClose(){//本部门弹窗关闭事件
			this.showDeptMineDialog = false;
			this.deptMineId = this.checkIds[0];
		},
		deptMineConfirm(){
			this.checkIds = [];
			this.checkIds.push(this.deptMineId);
			this.checkData = [];
			this.deptTreeMine.map(item=>{
				if(item.id == this.deptMineId){
					this.checkData.push(item);
				}
			})
			this.showDeptMineDialog = false;
			this.headerTitle =`${this.checkData[0].name}办公效率`;
			this.baseParamsUpdate();
		},
		//弹窗确认按钮
    showCompDialog(data, status, type, params) {
			if(status){
				let vm = this;
				let departmentName = "";
				vm.checkIds = [];
				vm.checkData = data;
				if (status) {
					if (data.length) {
						data.map(item => {
							vm.checkIds.push(item.id);
						});
					}
					this.baseParamsUpdate();
				}
			}
      this.dialogState = false;
		},
		baseParamsUpdate(){
			let names = [];
			this.checkData.map(item=>{
				names.push(item.name||item.text);
			})
			this.departmentName = names.join(";");
			this.params.deptIds = this.checkIds.join(",");
			this.setBaseParams(this.params);
		},
		refreshInitData(){
			this.params.year = new Date().getFullYear();
			let isHqf = JSON.parse(localStorage.getItem('tcHumanRole'));
			for (let index = 0; index < isHqf.length; index++) {
				if(isHqf[index].dicId == 337||isHqf[index].dicId == 303||isHqf[index].dicId == 382||isHqf[index].dicId == 383){
					this.YJHSHOW = true
				}
			}
			this.orgChange('headOffice');
			this.initData();
			this.setMonthOptions();
			this.setYearOptions();
		}
	},
	created(){
		this.clientNowHeight = document.body.clientHeight+'px';
		window.addEventListener('beforeunload',this.refreshInitData(),true)
		this.params.year = new Date().getFullYear();
		// this.baseParams.year = new Date().getFullYear();
		// this.params.month = this.baseParams.month = parseInt(new Date().getMonth())+1;
		// this.params.quarter = this.baseParams.quarter = '1';xjhTEXT总行来文办理效率
		let isHqf = JSON.parse(localStorage.getItem('tcHumanRole'));
		for (let index = 0; index < isHqf.length; index++) {
			if(isHqf[index].dicId == 337){
				this.YJHSHOW = true
			}
		}
		let yjText = JSON.parse(localStorage.getItem("userInfo")).areaCode;
		this.xjhTEXT = yjText == '000010000'?'一级分行':'下级行'
		this.lwxlTEXT = yjText == '000010000'?'总行来文办理效率':'来文办理效率'
		this.initData();
		this.setMonthOptions();
		this.setYearOptions();
	},
  destroyed() {
    window.removeEventListener("beforeunload", this.beforLoad(), true);
  },
	components:{
		efficLeft,
		efficRight,
		efficMainZH,
		efficFirst,
		efficMine,
		FWAll,
		HQAll,
		delayAll,
		retryAll,
		backAll,
		wtEfficAll,
		finEfficAll,
		treeCofig
	}
}
</script>
<style lang="less" scoped>
	@yellow:#FEEC01;
	@white:#fff;
	.wrapper{
	 	overflow-x: hidden !important;
		margin: 0;
		padding: 0;
		overflow: hidden;
		/deep/ .guding{
			::-webkit-scrollbar {
				width: 10px;
				height: 10px;
				color: white !important;
				background-color: #ebeef5 !important;
				scrollbar-face-color: #ebeef5 !important;
			}
			/deep/ ::-webkit-scrollbar-track {
				background-color: transparent;
			}
			/deep/ ::-webkit-scrollbar-thumb {
				background-color: white;
			}
			/deep/ ::-webkit-scrollbar-corner {
				background-color: #ebeef5;
			}
		}
		/deep/ ::-webkit-scrollbar {
			display: flex;
			width: 5px;
			height: 5px;
			color: rgb(0, 207, 253);
			background-color: #093c71;
			scrollbar-face-color: rgb(0, 207, 253);
			}
		/deep/ ::-webkit-scrollbar-track {
			background-color: transparent;
		}
		/deep/ ::-webkit-scrollbar-thumb {
			background-color: rgb(0, 207, 253);
		}
		/deep/ ::-webkit-scrollbar-corner {
			background-color: #093c71;
		}
		.container{
			// min-width: 1500px;
			min-height: 875px;
			background: url(../../assets/images/background.png) no-repeat;
			background-position: center;
			background-size: 100% 100%;
			box-sizing: border-box;
			.header{
				box-sizing: border-box;
				text-align: center;
				cursor: pointer;
				.centerLogo{
					display: inline-block;
					vertical-align: middle;
				}
				.headerTitle{
					display: inline-block;
					color: @white;
					font-weight: 600;
					font-size: 40px;
					vertical-align: middle;
				}
			}
			.main{
				.el-col{
					height: 100%;
				}
				.leftCont{
					background: url(../../assets/images/left_03.png);
					background-size: 100% 100%;
					padding: 9% 7% 0 7%;
					box-sizing: border-box;
				}
				.middleCont{
					padding: 0 6%;
					.inputGroup{
						height: 40px;
						padding: 0 20px;
						.el-col{
							padding-right: 15px;
							text-align: center;
							position: relative;
						}
						.fixedDateWrapper:after,
						.deptNamesWrap:after {
							content: "";
							display: block;
							height: 0;
							width: 0;
							border: 0.3em solid transparent;
							border-top: 0.3em solid #fff;
							position: absolute;
							top: 50%;
						}
						.deptNames,
						.fixedDate{
							opacity: 1;
							border: 0px none;
							box-sizing: border-box;
							background-clip: padding-box;
							background-color: rgb(6, 70, 141);
							box-shadow: inset 0 0 15px #08caff;
							font-size: 14px;
							font-weight: 400;
							line-height: 1.5;
							padding: 11px 25px 11px 13px;
							border-radius: 5px 5px 5px 5px;
							height: unset;
							color: @white;
							cursor: pointer;
						}
						.deptNames::-webkit-input-placeholder{
							color:@white;
						}
						.fixedDateWrapper{
							text-align: right;
							position: relative;
							padding-left: 15px;
							.fixedDate{
								padding-right: 40px;
							}
							.dateDrop{
								position: absolute;
								width: 350px;
								min-height: 50px;
								padding: 10px;
								top: 45px;
								left: 50%;
								color: @white;
								background-color: rgb(9, 56, 110);
								font-size: 20px;
								border-radius: 5px;
								transform: translateX(-58px);
								z-index: 100;
								/deep/.el-radio__label{
									font-size: 20px;
									color: @white;
								}
								.el-col{
									padding-bottom: 10px;
								}
								.el-button{
									opacity: 1;
									border: 0px none;
									box-sizing: border-box;
									background-clip: padding-box;
									background-color: rgb(6, 70, 141);
									box-shadow: inset 0 0 15px #08caff;
									border-radius: 5px 5px 5px 5px;
									color: @white;
									cursor: pointer;
								}
							}
						}
						.deptNamesWrap:after{
							right: 30px;
						}
						.fixedDateWrapper:after{
							right:0;
							transform: translateX(-30px);
						}
					}
					.middleInner{
						padding: 0 10px 0 20px;
						height: calc(100% - 40px);
					}
					.btnGroup{
						padding-top: 20px;
						box-sizing: border-box;
						.el-col{
							text-align: center;
							.el-button{
								padding:0 50px;
								color: #08caff;
								line-height: 38px;
								background-color: transparent;
								border:0;
							}
							.active{
								box-shadow: inset 0 0 15px #08caff;
								background-color: rgb(5, 16, 80);
							}
						}
					}
				}
				.rightCont{
					background: url(../../assets/images/right_05.png);
					background-size: 100% 100%;
					padding: 9% 7% 0 8%;
					box-sizing: border-box;
				}
				.bothSide{
					padding-top:20px;
					box-sizing: border-box;
					height: 60px;
					.titLine{
						margin-left: 5px;
						height: 30px;
						display: inline-block;
						background-color: @yellow;
						width: 4px;
						margin-right: 10px;
						vertical-align: middle;
					}
					.sectionTitle{
						color: @white;
						font-size: 20px;
						line-height: 35px;
						font-weight: 900;
						vertical-align: middle;
						margin-right: 5px;
					}
					.help{
						color: @white;
						font-size: 22px;
						vertical-align: middle;
					}
				}
				.sideCont{
					height: calc(100% - 100px);
				}
				.innerCont{
					height: calc(100% - 60px);
				}
			}
		}
	}
	.w100{
		width:100%;
	}
	.h100{
		height: 100%;
	}
	.h90{
		height:90%;
	}
	.h10{
		height: 10%;
	}
	/deep/ .el-scrollbar__view{
		height: 100% !important;
	}
	// /deep/ .el-scrollbar__wrap{
	// 	overflow: visible;
	// }
	.deepColor{
		/deep/.el-dialog,
		/deep/.el-dialog__body{
			background-color: #03417E;
		}
	}
	/deep/.el-dialog__header{
		background-color: #03417E;
		text-align: center;
		.el-dialog__title{
			font-size: 28px;
			font-weight: normal;
		}
	}
	.deptMineDialog{
		min-height:480px;
		margin: 20px 20px 0;
		box-sizing: border-box;
		border: 1px solid #e4e4e4;
		padding: 10px;
		.el-radio{
			display: block;
			margin: 15px;
		}
	}
	.el-icon-question{
		cursor: pointer;
	}
	.helperWrapper{
		font-size: 14px;
		line-height: 25px;
		padding: 30px;
		background: transparent;
	}
	/deep/.el-table th>.cell {
    color: white;
	}

	/deep/.el-dialog__body {
		padding-top: 1px !important;
	}
	

</style>