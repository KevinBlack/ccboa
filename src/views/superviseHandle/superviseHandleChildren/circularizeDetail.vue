<template>
	<div id="circularizeDetail" class="bank_dispach">
		<el-row>
			<el-col class="bank_dispack_side">
				<p class="bank_dispach_back">
					<i class="el-icon-arrow-left"></i>发文处理单
				</p>
				<div class="grid_comtent">
					<el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
					<el-button size="small" plain @click="preserve('save')" v-if="state == 0">保存</el-button>
					<!-- <el-button plain @click="drafting">起草正文</el-button>
					<el-button plain @click="delectArticle">删除此文</el-button> -->
					<el-button size="small" plain @click="getTreeDataForCy('cy',1)" v-if="fromdata.circulatePersonNames !=''&&state!=2">发传阅</el-button>
					<el-button size="small" plain @click="getTreeDataForCy('cy')" v-if="fromdata.circulatePersonNames ==''&&state!=2">发传阅</el-button>
					<el-button size="small" plain @click="yiyue" v-if="state == 0">已阅</el-button>
					<el-button size="small" plain @click="yiyue('1')" v-if="fromdata.disabledAndNoneFkButton==false">反馈传阅意见</el-button>
					<el-button size="small" plain @click="processSheet('/dbcycld')">打印处理单</el-button>
					<el-button size="small" plain @click="collect">收藏</el-button>
					<el-button size="small" plain @click="caozuozhinan">操作指南</el-button>
				</div>
			</el-col>
		</el-row>
		<timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
		<closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
		<div class="nav"></div>
		<header class="bank_dispach_header">
			<h3 class="bank_dispach_tit">{{fromdata.title}}</h3>
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
					:class="active == '#scfj' ? 'active' : ''"
					@click="toTarget('#scfj')"
				>反馈意见</a>
				 <a
					href="javascript:void(0);"
					:class="active == '#qpyj' ? 'active' : ''"
					@click="toTarget('#qpyj')"
				>附件</a>
			</div>

			<div class="bank_dispach_file">
				<div class="bank_dispach_file_part">
					<!-- 当前环节注释 -->
					<div class="bank_dispach_annotation">
						<p class="bank_dispach_annotation_current">
							当前处理人：
							<span>{{fromdata.curUser}}</span>
						</p>
						<p class="bank_article_illustrates bank_dispach_annotation_current"><span>专项督查办事项，请按时处理、及时反馈。</span></p>
					</div>
					<el-form
						ref="fromdata"
						:rules="rules"
						:model="fromdata"
						label-width="130px"
						class="demo_ruleForm"
					>
						<!-- 文件要素 -->
						<h6 class="bank_dispach_file_tit">文件要素</h6>
						<div id="wjys" class="height_90"></div>
						<div>
							<el-row>
								<el-col :span="8">
									<el-form-item label="立项依据" prop="projectBase" ref="projectBase">
										<el-input v-model="fromdata.projectBase" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="紧急程度" :span="8" props="pressingLevel" ref="pressingLevel">
										<el-input v-model="fromdata.pressingLevel" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8" >
									<el-form-item label="编号" prop="pTplNo" ref="pTplNo">
										 <el-input v-model="fromdata.doucumentNum" plain  disabled type="info">{{fromdata.doucumentNum}}</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="登记日期" prop="registDate" ref="registDate">
										<el-input v-model="fromdata.registDate" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="结项日期" prop="finishDate" ref="finishDate">
										<el-input v-model="fromdata.finishDate" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
                  <el-form-item label="截止日期" prop="expireDate" ref="expireDate">
                      <el-input v-model="fromdata.expectFinishTime" disabled ></el-input>
                  </el-form-item>
                </el-col>
								<el-col :span="8">
									<el-form-item label="督办部门" prop="superviseDeptName" ref="superviseDeptName">
										<el-input v-model="fromdata.superviseDeptName" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="联系人" prop="contact" ref="contact">
										<el-input v-model="fromdata.contact" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="联系电话" prop="contactPhone" ref="contactPhone">
										<el-input v-model="fromdata.contactPhone" disabled></el-input>
									</el-form-item>
								</el-col> 
								<el-col>
									<el-form-item label="督办依据" prop="superviseBasis" ref="superviseBasis">
										<el-input v-model="fromdata.superviseBasis" disabled>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col>
									<el-form-item label="事由提要" prop="summary" ref="summary">
										<el-input v-model="fromdata.summary" 
										type="textarea"
                    resize="none"
                    autosize
										disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col>
									<el-form-item label="详细描述" prop="detailDescription" ref="detailDescription">
										<el-input
											type="textarea"
											resize="none"
											autosize
											v-model="fromdata.detailDescription"
											disabled
										></el-input>
									</el-form-item>
								</el-col>
								<el-col>
									<el-form-item label="承办单位" prop="undertakeOrgName" ref="undertakeOrgName">
										<el-input
											v-model="fromdata.undertakeOrgName"
											disabled
											placeholder="请选择承办单位"
										>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="协办单位" prop="assistDeptName" ref="assistDeptName">
										<el-input
											v-model="fromdata.assistDeptName"
											disabled
											class="redcolor"
											placeholder="请选择协办单位"
											style="width: 100%;"
										>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label width="0">
										<el-input
											v-model="fromdata.assistFinishDeptName"
											placeholder
											style="width: 100%;"
											disabled
										></el-input>
									</el-form-item>
								</el-col>
								<el-col>
									<el-form-item label="传阅人员" prop="circulatePersonNames" ref="circulatePersonNames">
										<el-input
											v-model="fromdata.circulatePersonNames"
											:title="fromdata.circulatePersonNames"
											disabled
											style="width: 100%;"
										>
										 <el-button slot="append" @click="takeBackSignCY()" >收回</el-button>
										</el-input>
									</el-form-item>
								</el-col>
								</el-row>
										<div id="scfj" class="height_90"></div>
								<!-- 附件 -->
						<h6 class="bank_dispach_file_tit">反馈意见</h6>
						<div id="scfj" class="height_90"></div>
						<el-row class="pr45">
								<el-col>
									<el-form-item label="立项审批意见">
										<el-input type="textarea"
										resize="none"
										autosize 
										v-model="fromdata.deptOpinion" 
										disabled
										v-if="!(fromdata.opinionSuperviseDeptList && fromdata.opinionSuperviseDeptList.length)"
										></el-input>
										<opinionText 
											:opinionText="fromdata.opinionSuperviseDeptList" 
											:sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
											@deletService="deletService"
											:canDelet="false"
											:curNodeCode="fromdata.curNodeCode"
											></opinionText>
									</el-form-item>
								</el-col>
								
								<el-col>
									<el-form-item label="承办意见">
										
										<el-input type="textarea"
											resize="none"
											autosize
											disabled
											v-if="!(fromdata.opinionSuperviseUndertakeList && fromdata.opinionSuperviseUndertakeList.length)"
											></el-input>
											<opinionText 
											:opinionText="fromdata.opinionSuperviseUndertakeList" 
											:sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
											@deletService="deletService"
											:canDelet="false"
											:curNodeCode="fromdata.curNodeCode"
											></opinionText>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="协办单位办理情况">
										
										<el-input type="textarea"
										resize="none"
										autosize
										disabled
										v-if="!(fromdata.opinionAssistFinishList && fromdata.opinionAssistFinishList.length)"
										></el-input>
										<opinionText 
											:opinionText="fromdata.opinionAssistFinishList" 
											:sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
											@deletService="deletService"
											:canDelet="false"
											:curNodeCode="fromdata.curNodeCode"
											></opinionText>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item
										label="结项审批"
										prop="superviseFinishOpinion"
										ref="superviseFinishOpinion"
									>
										
										<el-input type="textarea"
											resize="none"
											autosize
											v-model="fromdata.superviseFinishOpinion" disabled
											v-if="!(fromdata.opinionSuperviseFinishList && fromdata.opinionSuperviseFinishList.length)"
											></el-input>
											<opinionText 
											:opinionText="fromdata.opinionSuperviseFinishList" 
											:sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
											@deletService="deletService"
											:canDelet="false"
											:curNodeCode="fromdata.curNodeCode"
											></opinionText>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="办结情况">
										<el-input type="textarea"
											resize="none"
											autosize
											disabled
											v-model="fromdata.setUpInfo"
											v-if="!(fromdata.opinionSuperviseSetupList && fromdata.opinionSuperviseSetupList.length)"
											></el-input>
											<opinionText 
											:opinionText="fromdata.opinionSuperviseSetupList" 
											:sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
											@deletService="deletService"
											:canDelet="false"
											:curNodeCode="fromdata.curNodeCode"
											></opinionText>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="催查记录" prop="record" ref="record">
										<el-input v-model="fromdata.record" resize="none"
															autosize type="textarea" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Object">
									<el-form-item label="一次传阅意见">
										<el-input
											type="textarea"
											resize="none"
											v-if="Object.keys(fromdata.firstOpinions).length == 0"
											autosize
											disabled
										></el-input>
										<opinionText 
											:opinionText="fromdata.firstOpinions" 
											:sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
											:isLength="fromdata.firstOpinions.opinions&&fromdata.firstOpinions.opinions!=''"
											:isObj="true"
											@deletService="deletService"
											:canDelet="false"
											:curNodeCode="fromdata.curNodeCode"
										></opinionText>
									</el-form-item>
								</el-col> 
								<el-col v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Array">
									<el-form-item label="一次传阅意见">
										<el-input
											type="textarea"
											resize="none"
											v-if="fromdata.firstOpinions.length == 0"
											autosize
											disabled
										></el-input>
                    					<opinionText 
											:opinionText="fromdata.firstOpinions" 
											:sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      						:isArr="true"
											@deletService="deletService"
											:canDelet="false"
											:curNodeCode="fromdata.curNodeCode"
                   					 	></opinionText>
									</el-form-item>
								</el-col>
							<el-col v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Array">
								<el-form-item label="二次传阅意见">
									<!-- <div v-for="item in fromdata.secondOpinions" :key="item.id">
										<div class="d_flex"  v-if="item.opinions&&item.opinions!=''">
											<el-row class="d_b100">
												<el-col
													:class="['pos_r']"
												>
													<el-input
														type="textarea"
														resize="none"
														autosize
														:value="item.opinions"
														disabled
														rows="3"
														class="d_f1"
													></el-input>
													<div class="adviceInfo" style="line-height: 15px">
                            {{item.opinionDeptName}}
                            <span class="pad_lr10">{{item.curUser}}</span>
                            <br>
                            {{item.opinionCreateTime}}
                          </div>
												</el-col>
											</el-row>
										</div>
									</div> -->
									<el-input type="textarea" resize="none"
										autosize 
										v-if="fromdata.secondOpinions.length == 0" 
										disabled></el-input>
                    <opinionText 
											:opinionText="fromdata.secondOpinions" 
											:sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :isArr="true"
											@deletService="deletService"
											:canDelet="false"
											:curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
									</el-form-item>
								</el-col>
								<el-col v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Object">
									<el-form-item label="二次传阅意见">
										<!-- <div class="d_flex"  v-if="fromdata.secondOpinions.opinions&&fromdata.secondOpinions.opinions!=''">
											<el-row class="d_b100">
												<el-col
													:class="['pos_r']"
												>
													<el-input
														type="textarea"
														resize="none"
														autosize
														:value="fromdata.secondOpinions.opinions"
														disabled
														rows="3"
														class="d_f1"
													></el-input>
													
                          <div class="adviceInfo" style="line-height: 15px">
															{{fromdata.secondOpinions.opinionDeptName}}
															<span class="pad_lr10">{{fromdata.secondOpinions.curUser}}</span>
                              <br>
															{{fromdata.secondOpinions.opinionCreateTime}}
														</div>
												</el-col>
											</el-row>
										</div> -->
									<el-input type="textarea" resize="none"
										autosize 
										v-if="Object.keys(fromdata.secondOpinions).length == 0"
										disabled></el-input>
                    <opinionText 
                      :opinionText="fromdata.secondOpinions" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :isObj="true"
                      :isLength="fromdata.secondOpinions.opinions&&fromdata.secondOpinions.opinions!=''"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
										></opinionText>
									</el-form-item>
								</el-col>
								<el-col>
									<el-form-item label="传阅说明">
										
										<el-input
										type="textarea"
										resize="none"
										autosize
										v-if="fromdata.circulateExplainList==''||!fromdata.circulateExplainList"
										disabled
										></el-input>
										<opinionText 
											:opinionText="fromdata.circulateExplainList" 
											:sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      						:isCYexplain="true"
											@deletService="deletService"
											:curNodeCode="fromdata.curNodeCode"
											:canDelet="false"
										></opinionText>
									</el-form-item>
									</el-col>
								 <el-col>
									<el-form-item label="传阅人员"> 
										<el-row>
											<el-col class="m10">
												<el-form-item label="一次传阅人" prop="firstCirculateHumans" ref="firstCirculateHumans">
													<el-input type="textarea"
														resize="none"
														autosize v-model="fromdata.firstCirculateHumans" disabled></el-input>
												</el-form-item>
											</el-col>
											<el-col class="m10">
												<el-form-item label="二次传阅人(未阅)">
													<el-input type="textarea"
														resize="none"
														autosize v-model="fromdata.wBJSecondCirculate" disabled></el-input>
												</el-form-item>
											</el-col>
											<el-col class="m10">
												<el-form-item label="二次传阅人(已阅)" prop="yBJSecondCirculate" ref="yBJSecondCirculate">
													<el-input type="textarea"
														resize="none"
														autosize v-model="fromdata.yBJSecondCirculate" disabled></el-input>
												</el-form-item>
											</el-col>
										</el-row>
									</el-form-item>
								</el-col>
								<el-col v-if="fromdata.disabledAndNoneFkButton == false">
									<el-form-item label="传阅意见" prop="opinions" ref="opinions">
										<el-input type="textarea" 
										v-model="fromdata.opinions" 
										resize="none" 
										maxlength='500'
										autosize>
										</el-input>
									</el-form-item>
								</el-col>
								</el-row>
								<el-row>
								<!-- 附件 -->
						<h6 class="bank_dispach_file_tit">附件</h6>
							<el-col class="pr45">
								<div class="file_list_box" v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
									<el-scrollbar>
										<div v-for="(item,index) in fromdata.attchmentFileInfo" :key="item.id" class="comp_list">  
											<template>
												<div class="command_file">
													<span class="order">{{index+1}}.</span>
													<!-- 预览 -->
													<span
														class="down"
														:title="item.fileName"
														@click="viewFile(item)"
													>{{item.fileName}}</span>
													<span class="name" :title="item.createrName">{{item.createrName}}</span>
													<span class="time">{{item.createTime}}</span>
													<div class="btns">
														<el-button
																type="primary"
																size="mini"
																@click.native="downFile(item)"
																round
															>下载</el-button>
													</div>
												</div>
											</template>
										</div>
									</el-scrollbar>
								</div>            
							</el-col>
							<el-col class="pr45">
								<el-form-item label="承办附件" v-if="fromdata.underTakeAttchmentFileInfo&&fromdata.underTakeAttchmentFileInfo.length">
									<div class="file_list_box" style="margin-left:0;" v-if="fromdata.underTakeAttchmentFileInfo&&fromdata.underTakeAttchmentFileInfo.length">
										<el-scrollbar>
											<div v-for="(item,index) in fromdata.underTakeAttchmentFileInfo" :key="item.id" class="comp_list">  
												<template>
													<div class="command_file">
														<span class="order">{{index+1}}.</span>
                            <!-- 预览 -->
                            <span
                              class="down"
                              :title="item.fileName"
                              @click="viewFile(item)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
														<div class="btns">
															<el-button
															type="primary"
															size="mini"
															@click.native="downFile(item)"
															round
														>下载</el-button>
														</div>
													</div>
												</template>
											</div>
										</el-scrollbar>
									</div>   
								</el-form-item>
							</el-col>
							<el-col v-for="(item,n) in fkfj" :key="n" class="pr45">
								<el-form-item :label="item" :key="item">
									<el-scrollbar>
										<div v-for="(item1,index) in fkfjList[n]" :key="item1.id" class="comp_list">
											<template>
												<div class="command_file">
													<span class="order">{{index+1}}.</span>
													<span class="down" :title="item1.fileName" @click="viewFile(item1)">{{item1.fileName}}</span>
													<span class="name">{{item1.createrName}}</span>
													<span class="time">{{item1.createTime}}</span>
													<div class="btns">
														<el-button 
																type="primary"
																size="mini"
																@click.native="downFile(item1)"
																round
															>下载</el-button>
													</div>
												</div>
											</template>
										</div>
									</el-scrollbar>
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
			:loadingTree="loadingTree"
			:singelCheckF="singelCheckF"
			:dialogState="dialogState"
			:offenUse="offenUse"
			:seletOptionsData="seletOptionsData"
			@showCompDialog="showCompDialog"
			:treeTradeCode="treeTradeCode"
		></treeCofig>
		<treeCofigForCy
			:treeData="treeData"
			:isCyPage="true"
			:dialogType="dialogTypeForCy"
			:dialogTypeNow="dialogTypeNowForCy"
			:dialogTit="dialogTitForCy"
			:checkIds="checkIds"
			:orgId="orgId"
			:curUserId="curUserId"
			:checkData="checkData"
			:loadingTree="loadingTreeForCy"
			:singelCheckF="singelCheckFForCy"
			:dialogState="dialogStateForCy"
			:seletOptionsData="seletOptionsDataForCy"
			:scircularizeLevel="scircularizeLevel"
			@showCompDialog="showCompDialogForCy"
			:treeTradeCode="treeTradeCode"
			:fromdata="fromdata"
		></treeCofigForCy>
		<!--传阅常用联系人修改 12.21-->
		<el-dialog
			title="操作"
			:visible.sync="shdialog1"
			width="50%"
			>
			<el-card>
				<el-checkbox-group v-model="checkedsh" @change="getNewName">
					<el-checkbox v-for="(item,index) in shData" :label="item.id" :key="index" >{{item.curUser}}</el-checkbox>
				</el-checkbox-group>
			</el-card>
			<span slot="footer" class="dialog-footer">
				<el-button @click="shdialog1 = false">取 消</el-button>
				<el-button type="primary" @click="shQuedingCY">确 定</el-button>
			</span>
		</el-dialog>
		<appendWriteList
			ref="writelist"
			v-if="appendWriteDialog"
			:clickType="clickTypes"
			@childsaveselect="writelistvalue"
		></appendWriteList>
		<secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls>
	</div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import treeCofigForCy from "@/components/tree/tree-cy";
import exportTable from "@/minixs/exportTable";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import opinionText from "@/components/opinionText/index";
import closeMessage from 'components/closeMessage/index';
import viewDraft from "@/minixs/viewDraft";
import isNowUser from "@/minixs/isNowUser";

export default {
	name: "App",
	components: {
		uploadFiles,
		timeDialog,
		treeCofig,
		secretBasls,
		appendWriteList,
		treeCofigForCy,
		opinionText,
		closeMessage
	},
	data() {
		return {
			closeHandler:false,
			orgId:"",
			curUserId:'',//二次传阅添加参数
			scircularizeLevel:'1',//传阅常用联系人修改 12.21
			dialogTypeForCy:'',
			dialogTypeNowForCy:'',
			dialogTitForCy:'',
			loadingTreeForCy:'',
			singelCheckFForCy:'',
			dialogStateForCy:false,
			seletOptionsDataForCy:[],
			treeTradeCode:"",
			cyper:'',
			cyid:'',
			checkedsh:[],//收回列表
			shdialog1:false,
			shData:[],
			bank_DeleteSendOrder: {
				function: "doDeleteSendOrder",
				id: ""
			},
			state:"",
			fkfj:[],//反馈附件
			fkfjList:[],//反馈附件
			uploadConfig:{
				id:'',
				url:'uploadFiles',
				code:'',
				filesHas:[],
				noattachTitleCheck:true
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
			//确定完成并发送
			bank_doSend: {
				function: "doSend",
				nextNodeId: "", //下一环节id
				nextNodeName: "", //下一环节名称
				nextUserName: "", //人员名称
				nextUserId: "" //人员id
			},
			//完成并发送 弹窗
			bank_send: {
				function: "selWfNode",
				pcsAvyId: "252329e6-a7aa-45fb-839d-c20c8595e930",
				curTplNo: "testOA7ID",
				curMultiTenancyId: "CN000"
			},
			firstData:{},
			//弹窗下拉框
			bank_selectConfig: {
				function: "getNextNodeInfo",
				curNodeId: "001",
				curTplNo: "testOA3ID",
				curMultiTenancyId: "CN000"
			},
			//input框内容
			bank_dispach: {
				function: "selectById",
				id: "",
				mainDocId: '',
				multiTenancyId: '',
				circulateId:"",
				// id: "1"
			},
			//下拉框列表
			bank_dispachfile: {
				function: "getSendOrderDicByParam",
				organizationId: ""
				// organizationId: "2ec81dcb-9ed5-443a-a7e7-314ae0537478"
			},
			bank_redheader: {
				function: "getTcDocTypeDicByParam",
				organizationId: "root",
				sendType: "行发文"
			},
			//提交
			bank_addToSendOrder: {
				function: "doSaveOrUpdateCY",
				id: "",
				nextNodeName: "", //下一环节的名字
				nextUserName: "" //部门人员名字
			},
			//删除 单条意见
			bank_deletToSendOrder: {
				function: "doDeletesendOrderOpinion",
				id: ""
			},
			//主送、抄送
			bank_main: {
				function: "getTcPriDeliveryDic",
				organizationId: "root"
			},
			active: "#wjys",
			scrollIntoViewOptions: {
				block: "start",
				behavior: "smooth"
			},
			openType:"",
			readFlag:"",
			openTypeFunction:"",
			cyCheckData:[],
			undertakeDeptData:[],
			assistDeptData:[],
			cbdwList:[],//督办依据添加
			 //下载文件
			bank_doDownloadFile:{
				function: "doDownloadFile",
				fileName: "",
				filePath:""
			},
			fromdata: {
				disabledAndNoneFkButton:false,
				attchmentFileInfo:[],
				opinionSuperviseDeptList:[],
				opinionSuperviseBaseList:[],
				opinionSuperviseUndertakeList:[],
				opinionAssistFinishList:[],
				opinionSuperviseFinishList:[],
				opinionSuperviseSetupList:[],
				secondOpinions:[],
				underTakeAttchmentFileInfo:[],
				circulateExplainList:[],
				circulateExplain:'',
				attachTitle: "",
				businessType: "",
				canNotShouHuiIds: "",
				comments: "",
				copy: "",
				undertakeDeptName:"",
				undertakeDeptId:"",
				assistDeptName:"",
				assistDeptId:"",
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
				yBJSecondCirculate: "",
				wBJSecondCirculate:'',
				firstCirculateHumans:'',
				haveRead: "",
				draftOrgan: "",
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
				opinions:"",
				shenpiConfigId: "",
				shenpiTitle: "",
				signDepartment: "",
				signDepartmentIds: "",
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
				eleSendSecretType: ""
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
				type: [
					{
						required: true,
						trigger: "change",
						message: "请选择立项依据"
					}
				],
				emergencyLevel: [
					{
						required: true,
						trigger: "change",
						message: "请选择紧急程度"
					}
				],
				businessType: [
					{
						required: true,
						trigger: "change",
						message: "请选择业务分类"
					}
				],
				textType: [
					{ required: true, trigger: "change", message: "请选择文种" }
				],
				secretType: [
					{ required: true, trigger: "change", message: "秘密类型" }
				],
				draftOrgan: [
					{ required: true, trigger: "blur", message: "请输入主办部门" }
				],
				userRange: [
					{ required: true, trigger: "change", message: "请选择档案利用范围" }
				],
				isStandardFile: [
					{
						required: true,
						trigger: "change",
						message: "请选择规章/规范性文件"
					}
				],
				keepLimit: [
					{
						required: true,
						trigger: "change",
						message: "请输入保管期限"
					}
				],
				phone: [{ required: true, trigger: "blur", message: "请输入联系电话" }],
				isDirect: [
					{ required: true, trigger: "change", message: "请选择直发文件" }
				],
				title: [{ required: true, trigger: "blur", message: "请输入正文标题" }],
				main: [{ required: true, trigger: "change", message: "请选择主送" }],
				name: [
					{ required: true, message: "请输入标题名称", trigger: "blur" },
					{ min: 3, max: 5, message: "3-5个字", trigger: "blur" }
				],
				secretLimitType: [
					{
						required: true,
						trigger: "change",
						message: "请选择秘密期限类型"
					}
				],
				workSecretFlag: [
					{
						required: true,
						trigger: "change",
						message: "请选择秘密标志"
					}
				],
				secretFlagType: [
					{
						required: true,
						trigger: "change",
						message: "请选择秘密标志"
					}
				]
			},
			firstOp:"",
			imageUrl: "",
			fileList: [],
			tableData: [],
			loadingTree:false,
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
			baoWenZiDuan: "A08461302",
			appendWriteDialog: true,
			clickTypes: 1,
			showCy:true,
			showCye:true,
			showCyeType:"1",
			nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId,
			nowUserNam: JSON.parse(localStorage.getItem("userInfo")).humanName,
			clickSaveAndSend: false, //点击完成并发送标示
			//正文
			showDraft: false,
			draftFlag: "viewFile", //正文类型 默认空白文档
			zhengWenState: "",
			draftInfo: {
				fileName: "",
				filePath: ""
			},
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
	mixins: [viewDraft,isNowUser],
	methods: {
		//传阅人员
		showCompDialogForCy(data, status, type, params, dtype, infoCy){
			let that = this;
			if (status) {
				//确定保存时
				let names = [];
				let ids = [];
				
				let newIds = [];
				let oldIds = [];
				let oldNames = [];
				let newNames = [];
				that.checkIds = [];
					this.checkData = [].concat(data);
				if (data.length) {
					data.map(item => {
							names.push(item.name || item.text);
							ids.push(item.id);
							that.checkIds.push(item.id);
					});
					 if (this.addSendType == '1') {
						oldIds = this.fromdata.circulatePersonIds.split(";")
						oldNames = this.fromdata.circulatePersonNames.split(";")
						ids.filter((item,i)=>{
							if(oldIds.indexOf(item)==-1){
								newNames.push(names[i])
								newIds.push(ids[i])
							}
							})
					}

					names = names.join(";");
					this.transIds = ids = ids.join(";");
					newIds = newIds.join(";");
					newNames = newNames.join(";");
				} else {
					names = "";
					ids = "";
					newIds = "";
					newNames = "";
					that.checkIds = [];
				}
				switch (dtype) {
					case "cy":
						this.fromdata.circulatePersonNames = names;
						this.fromdata.circulatePersonIds = ids;
						this.cyCheckData = this.checkData;
						break;
					case "zengfa":
						this.fromdata.circulatePersonNames = names;
						this.fromdata.circulatePersonIds = ids;
						this.cyCheckData = this.checkData;
						break;
				}
				this.fromdata.circulateExplain = infoCy;
				if (this.addSendType == '1') {
						this.sendCy(newIds, newNames);
				}
				if(this.addSendType != '1' && dtype == "cy"){
					this.sendCy();
				}
				if (type === "dosend") {
					this.fromdata.nextNodeId = params.id; //下以环节id
					this.fromdata.nextNodeName = params.name; //下一环节名称
					this.fromdata.nextUserName = names;
					this.fromdata.nextUserId = ids;
				}
			}

			this.dialogStateForCy = !this.dialogStateForCy;
			//打开弹窗 回显
			if (this.dialogStateForCy) {
				this.backDialogDataForCy(this.dialogTypeNowForCy);
			}
		},
		 //请求传阅部门树数据
		getTreeDataForCy(n,m) {
			if(n=="cy"){
				this.isCY=true
				this.dialogTypeForCy = "dosend";
			}
			let name = "";
			this.addSendType = m;
			let that = this;
			let clearName = "";
			this.canTab = false;
			this.singelCheckFForCy = false;
			this.treeData = [];
			//手动清空时处理
			this.dialogTypeNowForCy = n;
			if(n=='cy'&&m=='1'){
				this.dialogTypeNowForCy='zengfa'
			}
			switch (n) {
				case "cy":
					name = "选择传阅人";
					clearName = "circulatePersonNames";
					break;
			}
			this.dialogTitForCy = name;
			this.showCompDialogForCy();
			if(m==1){
				this.dialogTypeNowForCy = "zengfa";
			}
			console.log(this.fromdata.deptId)
			this.$post
			.postData(
				"selectUserByCirculate",//传阅常用联系人修改 12.21
				JSON.stringify({
						function: "selectUserByCirculate",//传阅常用联系人修改 12.21
						level: this.scircularizeLevel,//传阅常用联系人修改 12.21
						flag: true,
						unitCode:this.fromdata.deptId
					}),
				this.$businessCode.zxdbgg
			)
			.then(res => {
				if (res.message == "Loading") {
					this.loadingTreeForCy = true;
				} else {
					this.loadingTreeForCy = false;
				}
				that.treeData = (res && res.data) || [];
				that.treeData[0].disabled = true;
			});
		},
		//回显传阅人员
		backDialogDataForCy(type) {
			let newA = [];
			switch (type) {
				case "cy":
						this.checkIds = this.fromdata.circulatePersonIds
						? this.fromdata.circulatePersonIds.split(";")
						: [];
						if (this.cyCheckData.length) {
							newA = [].concat(this.cyCheckData);
							newA.map(item => {
								//选中的不可操作
								item.disabled = true;
							});
						}
						this.checkData = this.cyCheckData;
						
						break;
				case "zengfa":
						this.checkIds = this.fromdata.circulatePersonIds
						? this.fromdata.circulatePersonIds.split(";")
						: [];
						if (this.cyCheckData.length) {
							newA = [].concat(this.cyCheckData);
							newA.map(item => {
								//选中的不可操作
								item.disabled = true;
								console.log(item)
							});
						}
						this.checkData = this.cyCheckData;
						break;
			}
		},
		//请求部门树数据
		getTreeData(n,m) {
			if(n=="cy"){
				this.isCY=true
				this.dialogType = "dosend";
			}else{
				this.isCY = false
				this.dialogType = "hui";
			}
			this.dialogTypeZF = n;
			let name = "";
			this.addSendType = m;
			let that = this;
			let clearName = "";
			this.canTab = false;
			this.singelCheckF = false;
			this.treeData = [];
			//手动清空时处理
			this.dialogTypeNow = n;
			if(n=='cy'&&m=='1'){
				this.dialogTypeNow='zengfa'
			}
			switch (n) {
				case "fasong":
					name = "发送对象";
					clearName = "assistDeptName";
					break;
				case "cy":
					name = "选择传阅人";
					clearName = "circulatePersonNames";
					break;
			}
			this.dialogTit = name;
			this.showCompDialog();
			if(m==1){
				this.dialogTypeNow = "zengfa";
			}
			this.$post
			.postData(
				"selectUserByUnitTreeCY",
				JSON.stringify({
						function: "selectUserByUnitTreeCY",
						unitCode: "",
						flag: true
					}),
				this.$businessCode.zxdbgg
			)
			.then(res => {
				if (res.message == "Loading") {
					this.loadingTree = true;
				} else {
					this.loadingTree = false;
				}
				that.treeData = (res && res.data) || [];
			});
		 
		},
		//清空处理
		clearCheckData(name) {
		},
		//点击引入
		appendMassage(val){
			this.cbdwList.push(val)
			this.fromdata.hostDepartment = "";
		},
		//引入删除
		deleteMassage(index){
			this.cbdwList.splice(index,1);
			//this.$forceUpdate()
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
			ids = id.split(";");
			names = name.split(";");
			ids.map((item, n) => {
				obj.push({
					id: item,
					name: names[n]
				});
			});
			return obj;
		},
		secretTypechange(value) {
			if (value == "商业秘密") {
				this.flag = true;
				this.secretflag = true;
				this.secretTypeflag = false;
			} else if (value == "工作秘密") {
				this.flag = false;
				this.secretflag = true;
				this.secretTypeflag = true;
				this.secretLimitType = "";
			} else if (value == "内部信息") {
				this.flag = false;
				this.secretflag = true;
				this.secretTypeflag = true;
				this.secretLimitType = "";
			} else {
				this.flag = false;
				this.secretflag = false;
				this.secretTypeflag = false;
			}
		},
		//处理回显秘密类型
		secretTypeBackvalue(value) {
			if (value == "商业秘密") {
				this.flag = true;
				this.secretflag = true;
				this.secretTypeflag = false;
			} else if (value == "工作秘密") {
				this.flag = false;
				this.secretflag = true;
				this.secretTypeflag = true;
			} else if (value == "内部信息") {
				this.flag = false;
				this.secretflag = true;
				this.secretTypeflag = true;
			}
		},
		//定密依据接收子组件传值
		savesecretBaslsvalue(data) {
			this.fromdata.secretGists = data;
			this.$forceUpdate();
		},
		//定密依据弹窗弹出
		secretGistsbox() {
			this.secretDialog = true;
			this.$nextTick(() => {
				this.$refs.arr.openDialog();
			});
		},
		//弹窗回显数据
		backDialogData(type) {
			let newA = [];
			switch (type) {
				case "cy":
						this.checkIds = this.fromdata.circulatePersonIds
						? this.fromdata.circulatePersonIds.split(";")
						: [];
						if (this.cyCheckData.length) {
							newA = [].concat(this.cyCheckData);
							newA.map(item => {
								//选中的不可操作
								item.disabled = true;
							});
						}
						this.checkData = this.cyCheckData;
						
						break;
				case "zengfa":
						this.checkIds = this.fromdata.circulatePersonIds
						? this.fromdata.circulatePersonIds.split(";")
						: [];
						if (this.cyCheckData.length) {
							newA = [].concat(this.cyCheckData);
							newA.map(item => {
								//选中的不可操作
								item.disabled = true;
								console.log(item)
							});
						}
						this.checkData = this.cyCheckData;
						break;
				case "fasong":
						this.checkIds = this.fromdata.sendSubId
						? this.fromdata.sendSubId.split(";")
						: [];
						this.checkData = this.fasongCheckData;
						break;
				case "dosend":
					this.checkIds = [];
					this.checkData = [];
					break;
			}
			},
		//完成并发送弹窗
		showCompDialog(data, status, type, params, dtype) {
			let that = this;
			if (status) {
				//确定保存时
				let names = [];
				let ids = [];
				
				let newIds = [];
				let oldIds = 0
				let oldNames = [];
				let newNames = [];
				that.checkIds = [];
					this.checkData = [].concat(data);
				if (data.length) {
					data.map(item => {
							names.push(item.name || item.text);
							ids.push(item.id);
							that.checkIds.push(item.id);
					});
					 if (this.addSendType == '1') {
						oldIds = this.fromdata.circulatePersonIds.split(";")
						oldNames = this.fromdata.circulatePersonNames.split(";")
						newIds = ids.filter((item)=>{
							return oldIds.indexOf(item)==-1;
						})
						newNames = names.filter((item)=>{
							return oldNames.indexOf(item)==-1;
						})
					}

					names = names.join(";");
					this.transIds = ids = ids.join(";");
					newIds = newIds.join(";");
					newNames = newNames.join(";");
				} else {
					names = "";
					ids = "";
					newIds = "";
					newNames = "";
					that.checkIds = [];
				}
				switch (dtype) {
					case "cy":
						this.fromdata.circulatePersonNames = names;
						this.fromdata.circulatePersonIds = ids;
						this.cyCheckData = this.checkData;
						break;
					case "zengfa":
						this.fromdata.circulatePersonNames = names;
						this.fromdata.circulatePersonIds = ids;
						this.cyCheckData = this.checkData;
						break;
				}
				if (this.addSendType == '1') {
						this.sendCy(newIds, newNames);
				}
				if(this.addSendType != '1' && dtype == "cy"){
					this.sendCy();
				}
				if (type === "dosend") {
					this.fromdata.nextNodeId = params.id; //下以环节id
					this.fromdata.nextNodeName = params.name; //下一环节名称
					this.fromdata.nextUserName = names;
					this.fromdata.nextUserId = ids;
				}
			}

			this.dialogState = !this.dialogState;
			if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
				//关闭弹窗 并确认完成发送
				this.saveSending();
			}
			//关闭弹窗 并确认完成发送
			if (this.dialogState) {
				this.backDialogData(this.dialogTypeNow);
			}
		},
		//选择人员后 确定完成并发送
		saveSending() {
			let params = Object.assign(this.bank_doSend, this.fromdata);
			this.$post
				.postData("doSend", JSON.stringify(params), this.$businessCode.zxdbgg)
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
								this.handleSetLoacl();
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
		//主送
		bankmain(n) {
			let name = "";
			switch (n) {
				case "zhusong":
					name = "主送";
					break;
				case "chao":
					name = "抄送";
					break;
				case "hui":
					name = "会签";
					break;
				case "ben":
					name = "本行发送";
					break;
				case "dosend":
					name = "完成并发送";
					break;
			}
			this.dialogTit = name;
			this.canTab = true;
			this.treeData = [];
			this.dialogType = n;
			if (n === "hui") {
				this.hasRadio = true;
				this.canTab = false;
				this.singelCheckF = false;
			}
			this.showCompDialog();
			this.$post
				.postData(
					"getTcPriDeliveryDic",
					JSON.stringify(this.bank_main),
					this.$businessCode.zxdbgg
				)
				.then(res => {
					this.treeData = (res && res.data) || [];
					if (this.treeData.length) {
						this.treeData.forEach(item => {
							item.content = JSON.parse(item.content);
							if (n === "hui") {
								item.text = item.typeName;
							}
						});
					}
				});
		},
		// 下拉列表
		getSendOrderDicByParam() {
			this.$post
				.postData(
					"getSendOrderDicByParam",
					JSON.stringify(this.bank_dispachfile),
					this.$businessCode.zxdbgg
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
			this.bank_dispach.id = this.$route.query.id;
			//this.bank_dispach.id = this.$route.query.mainDocId;
			let that = this;
			if(this.openType == 'cb'){
				//this.openTypeFunction = 'selUndertakeById'
				this.openTypeFunction = 'selectCirculateById'
			}
			if(this.openType == 'dx'){
				this.openTypeFunction = 'selectCirculateById'
			}
			this.bank_dispach.function = this.openTypeFunction;
			this.$post
				.postData(
					this.openTypeFunction,
					JSON.stringify(this.bank_dispach),
					this.$businessCode.zxdb
				)
				.then(res => {
          this.getIsNowUser(res,'cy')
					that.fromdata = res.data;
					if(res.data.level){//传阅常用联系人修改 12.21
						that.scircularizeLevel = '2';//传阅常用联系人修改 12.21
						this.orgId = this.fromdata.deptId;
						this.curUserId = this.fromdata.curUserId;//二次传阅添加参数
					}else{
						that.scircularizeLevel = '1';//传阅常用联系人修改 12.21
						this.orgId = '';
						this.curUserId = '';
					}
					if (this.fromdata.type === "行发文") {
						this.selectType("行发文");
					}
					this.secretTypeBackvalue(res.data.secretType || "商业秘密");
					console.log(res.data.firstOpinions)
					console.log(res.data.secondOpinions)
					if(res.data.firstOpinions){
							for(let i =0;i<res.data.firstOpinions.length;i++){
								if(res.data.firstOpinions[i].opinions&&res.data.firstOpinions[i].opinions!=''){
									this.showCy = false;
								}
							}
						}
						if(typeof(res.data.secondOpinions) == 'string'){
							this.showCyeType = 1;
						}
						if(res.data.secondOpinions){
							for(let i =0;i<res.data.secondOpinions.length;i++){
								if(res.data.secondOpinions[i].opinions&&res.data.secondOpinions[i].opinions!=''){
									this.showCye = false;
								}
							}
						}
					//处理会签 、主送、抄送、本行发送
					if (res.data.mainIds) {
						this.zhuCheckData = this.concatTreeData(
							res.data.mainIds,
							res.data.main
						);
					}
					if (res.data.signDepartmentIds) {
						this.huiCheckData = this.concatTreeData(
							res.data.signDepartmentIds,
							res.data.signDepartment
						);
					}
					if (res.data.copyIds) {
						this.chaoCheckData = this.concatTreeData(
							res.data.copyIds,
							res.data.copy
						);
					}
					if (res.data.inlineIds) {
						this.benCheckData = this.concatTreeData(
							res.data.inlineIds,
							res.data.inline
						);
					}
					if (res.data.circulatePersonNames) {
							this.cyCheckData = this.concatTreeData(
								res.data.circulatePersonIds,
								res.data.circulatePersonNames
							);
						}else{
							this.cyCheckData=[];
						}
					if(this.readFlag != 1){
						this.$post
							.postData(
								"doUpdateReadRecordCy",
								JSON.stringify({
									function:"doUpdateReadRecordCy",
									id:this.$route.query.id
									// pcsAvyId:res.data.pcsAvyId,
									// processInstId:res.data.processInstId,
									// multiTenancyId:res.data.multiTenancyId
									}),
								this.$businessCode.zxdb
							).then(res => {
								//更新状态用。暂时不用任何操作
								if(res&&res.success){
									window.opener.location.reload();
								}
							})
						}
				})
		},
		//下拉框 红头/代字内容
		getTcDocTypeDicByParam() {
			this.$post
				.postData(
					"getTcDocTypeDicByParam",
					JSON.stringify(this.bank_redheader),
					this.$businessCode.zxdbgg
				)
				.then(res => {
					if (res.data) {
						this.SredHead = res.data;
					}
				});
		},

		// 代字/红头  下拉 发文字号获取值
		selectredhead(redHeadITEM) {
			this.fromdata.documentNo = redHeadITEM;
		},
		// 保存
		preserve(type) {
			this.bank_dispach.id = sessionStorage.getItem("pageid") || "";

			var obj = Object.assign(this.bank_addToSendOrder, this.fromdata);
			obj.id = this.$route.query.id;
			this.$post
				.postData("doSaveOrUpdateCY", JSON.stringify(obj), this.$businessCode.zxdb)
				.then(res => {
					if (res && res.success) {
						if (type!='2') {
							this.$message({
								type: "success",
								showClose: true,
								offset: 400,
								message: "保存成功",
								duration: 1000
							});
						}
						this.toEdit();
					}
				})
		},
		getNewName(value){
			let a = value;
			this.checkNames = [];
			for(let i=0;i<a.length;i++){
				for(let j = 0; j <this.shData.length;j++){
						if(this.shData[j].processInstId == a[i]){
							this.checkNames.push(this.shData[j].deptName)
						}
				}
			}
			this.checkNames = this.checkNames.join(';')
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
      if(this.state == 2){
				this.handleSetLoacl();
        window.close();
      }else{
        this.closeHandler = true;
      }
		},
		async btnCloseHandler(val){
      if(val == 1){
				this.handleSetLoacl();
        window.close();
      }else if(val == 2){
        await this.preserve();
        window.location.href = "about:blank";
				window.opener.location.reload();
				this.handleSetLoacl();
				window.close();
      }else{
        this.closeHandler = false
      }
    },
		// 删除此文
		delectArticle() {
			this.bank_dispach.id = localStorage.getItem("pageid") || "";
			let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
			this.bank_DeleteSendOrder.id = deletesendorderid;

			this.$confirm("是否删除并退出当前页面?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					if (!this.bank_dispach.id) {
						window.location.href = "about:blank";
						window.opener.location.reload();
						this.handleSetLoacl();
						window.close();
					} else {
						this.$post
							.postData(
								"doDeleteSendOrder",
								JSON.stringify(this.bank_DeleteSendOrder),
								this.$businessCode.zxdbgg
							)
							.then(res => {
								this.$message({
									type: "success",
									offset: 400,
									showClose: true,
									message: "删除成功!"
								});
								window.location.href = "about:blank";
								window.opener.location.reload();
								this.handleSetLoacl();
								window.close();
							});
					}
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
		// 收藏
		collect() {
			this.$confirm("您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
			let obj={
        function:'dbCollection',
        id: this.bank_dispach.circulateId,//数据id
				flag:'zxdbcy',   //DXDB
				processInstId:this.fromdata.processInstId,
        documentCode: this.fromdata.doucumentNum,  //文号
        curNodeCode: this.fromdata.curNodeCode,   //当前环节编号
        documentTitle:this.fromdata.title  //正文标题
      };
      this.$post
        .postData(
          "dbCollection",
          JSON.stringify(obj),
          this.$businessCode.zxdb
        )
        .then(res => {
          if (res.data && res.data.downloadUrl) {
            let file={
              function: "doDownloadFile",
              filePath:res.data.downloadUrl,
              fileName:res.data.fileName
            }
            this.$post
              .postData("doDownloadFile", JSON.stringify(file), this.$businessCode.nowjts)
              .then(res1 => {
                if (res1) {
                  if (res1 && res1.success) {
                    downLoadFileReName(
                      (this.$post.getEnvState()
                        ? location.origin
                        : "http://localhost:8080") +
                      "/ecpweb/getLocalFile.action?relativePath=" +
                      res1.filePath +
                      "&fileName=" +
                      res1.fileName,
                      res.data.fileName);
                  } else {
                    this.$message({
                      type: "error",
                      showClose: true,
                      offset: 400,
                      message: "下载失败",
                      duration: 500,
                    });
                  }
                }
              });
          }
        });
		 })
		},
		//查看流程
		flowScheme() {
			this.timeShow = true;
			this.bank_cklc.processInstId = this.fromdata.processInstId;
			this.$post
				.postData(
					"getHistory",
					JSON.stringify(this.bank_cklc),
					this.$businessCode.zxdbgg
				)
				.then(res => {
					if (res) {
						this.tableData = res.data;
						this.$nextTick(() => {
							this.$refs.dialogLine.openDialog();
						});
					}
				});
		},
		// 打印处理单
		processSheet(path,id) {
			const routeData = this.$router.resolve({
				path: path,
				query: {
						id:this.fromdata.id,
						mainDocId:this.bank_dispach.mainDocId,
						multiTenancyId:this.bank_dispach.multiTenancyId,
						openType:this.openType,
						circulateId:this.bank_dispach.circulateId
				}
			});
			window.open(routeData.href, "_blank");
		},
		downFile(file) {
			this.bank_doDownloadFile.fileName = file.fileName;
			this.bank_doDownloadFile.filePath = file.filePath;
			this.$post
				.postData(
					"doDownloadFile",
					JSON.stringify(this.bank_doDownloadFile),
					this.$businessCode.swglfj
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
						} else {
							this.$message({
								type: "error",
								showClose: true,
								offset: 400,
								message: "下载失败",
								duration: 1500
							});
						}
					}
				});
		},
		// 起草正文
		drafting(state) {
			let that = this;
			this.zhengWenState = state;
			if (!this.fromdata.filePath && !this.fromdata.fileName && state != 1) {
				this.$message({
					type: "info",
					offset: 100,
					showClose: true,
					message: "请先上传正文",
					duation: 500
				});
				return;
			}
			if (!this.fromdata.id) {
				this.preserve().then(res => {
					if (res) {
						if (state == 1) {
							this.showDraft = true;
						} else {
							let fileInfo = {
								filePath: this.fromdata.filePath,
								fileName: this.fromdata.fileName
							};
							this.doDraft(fileInfo);
						}
					}
				});
			} else {
				if (state == 1) {
					this.showDraft = true;
				} else {
					this.getFileInfo(that).then(res => {
						if (res.state) {
							//this.doDraft(res);
							let data = this.$router.resolve({
								path: "/openAndSave_Word",
								query: {
									state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
									id: this.fromdata.id,
									zhengWenState: this.zhengWenState,
									JYcode: this.$businessCode.swglfj,
									multiTenancyId: this.fromdata.multiTenancyId,
									relativePath: res ? res.filePath : "",
									fileName: res ? res.fileName : "",
									showBtns: false,
									flowTranId:this.$businessCode.zxdb
								}
							});
							this.showDraft = false;
							this.$forceUpdate();
							window.open(data.href, "_blank");
						}
					});
				}
			}
		},
		//请求文件路径
		async getFileInfo(self, flagFile) {
			var successInfo = { state: false };
			var handbook = flagFile?self.$businessCode.zxdbfj:self.$businessCode.zxdbfj;
			self.bank_doDownloadFile.fileName = flagFile
				? flagFile.fileName
				: self.fromdata.fileName;
			self.bank_doDownloadFile.filePath = flagFile
				? flagFile.filePath
				: self.fromdata.filePath;
			await self.$post
				.postData(
					"doDownloadFile",
					JSON.stringify(self.bank_doDownloadFile),
					handbook 
				)
				.then(res => {
					if (res && res.success) {
						successInfo.filePath = res.filePath;
						successInfo.fileName = res.fileName;
						successInfo.state = true;
					}else{
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
		// 操作指南
		caozuozhinan() {
			this.$post
				.postData(
					"getAttchment",
					JSON.stringify({
						function: "getAttchment",
						moduleCode: "ZXDB"
					}),
					this.$businessCode.fwbz
				)
				.then(res => {
					if (res && res.success) {
						this.getFileInfo(this,res.data).then(resF => {
							if (resF.state) {
								let data = this.$router.resolve({
									path: "/openAndSave_Word",
									query: {
										state: "viewFile",
										id: this.fromdata.id,
										zhengWenState: 0,
										JYcode: this.$businessCode.fwbzfj,
										multiTenancyId: this.fromdata.multiTenancyId,
										relativePath: resF ? resF.filePath : "",
										fileName: resF ? resF.fileName : "", 
										showBtns: false,
										flowTranId:this.$businessCode.zxdbgg
									}
								});
								window.open(data.href, "_blank");
							}
						});
					} else {
						this.$message({
							type: "error",
							offset: 400,
							showClose: true,
							message: "文件不存在",
							duration: 1500
						});
					}
				})
				.catch(() => {
					this.$message({
						type: "error",
						offset: 400,
						showClose: true,
						message: "文件不存在",
						duration: 1500
					});
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
		//发送传阅人
		sendCy(newIds, newNames){
			this.preserve('2');
			let obj = {
					function:"sendCirculate",
					circulatePersonIds:this.fromdata.circulatePersonIds,
					circulatePersonNames:this.fromdata.circulatePersonNames,
					multiTenancyId:this.fromdata.multiTenancyId,
					id:this.$route.query.id,
					isCirculate:"1",
					circulateExplain:this.fromdata.circulateExplain
				}
			 //增发
			 //sessionStorage.setItem("cyper",this.fromdata.circulatePersonNames);
			 //sessionStorage.setItem("cyid",this.fromdata.circulatePersonIds);
			if (newNames) {
				obj.circulatePersonIds = newIds;
				obj.circulatePersonNames = newNames;
			}else{
				obj.circulatePersonIds = this.fromdata.circulatePersonIds;
				obj.circulatePersonNames = this.fromdata.circulatePersonNames;
			}
			if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
					this.$post
			.postData("sendCirculate", JSON.stringify(obj), this.$businessCode.zxdbgg)
			.then(res => {
				if (res && res.success) {
						this.$message({
							type: "success",
							showClose: true,
							offset: 400,
							message: "发送传阅人成功",
							duration: 500,
						});
						//window.location.reload();
					}else{
						this.$message({
							type: "error",
							showClose: true,
							offset: 400,
							message: "发送传阅人失败",
							duration: 500,
						});
					}
			})
			.catch(e => {
				console.log(e);
			});
			}
		},
		//删除意见(固化意见)
		deletService(id) {
			
		},
		yiyue(n){
			// if(!this.fromdata.opinions){
			//   this.$message({
			//     type: "error",
			//     showClose: true,
			//     offset: 400,
			//     message: "请输入传阅意见",
			//     duration: 500,
			//   });
			//   return
			// }
			let copyFrom = {
		      function:"areadlyRead",
			}
			if(n=='1'){
        if(!this.fromdata.opinions){
          this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请输入传阅意见",
              duration: 500,
            })
            return
        }
        copyFrom = Object.assign(copyFrom,{feedBack:''})
			}
			
			copyFrom = Object.assign(copyFrom,this.fromdata)
			copyFrom.id = this.$route.query.id
			this.$post
			.postData("areadlyRead", JSON.stringify(copyFrom), this.$businessCode.zxdbgg)
			.then(res => {
				if (res && res.success) {
						this.$message({
							type: "success",
							showClose: true,
							offset: 400,
							message: "操作成功",
							duration: 500,
						});
						setTimeout(()=>{
							window.location.href = "about:blank";
							window.opener.location.reload();
							this.handleSetLoacl();
							window.close();
						},1000)
					}else{
						this.$message({
							type: "error",
							showClose: true,
							offset: 400,
							message: "操作失败",
							duration: 500,
						});
					}
				
			})
			.catch(e => {
				console.log(e);
			});
		},
		//请求文件路径
		async getFileInfo(self, flagFile) {
			var successInfo = { state: false };
			var handbook = flagFile?self.$businessCode.fwbzfj:self.$businessCode.swglfj;
			self.bank_doDownloadFile.fileName = flagFile
				? flagFile.fileName
				: self.fromdata.fileName;
			self.bank_doDownloadFile.filePath = flagFile
				? flagFile.filePath
				: self.fromdata.filePath;
			await self.$post
				.postData(
					"doDownloadFile",
					JSON.stringify(self.bank_doDownloadFile),
					handbook 
				)
				.then(res => {
					if (res && res.success) {
						successInfo.filePath = res.filePath;
						successInfo.fileName = res.fileName;
						successInfo.state = true;
					}else{
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
		//正文跳转
		doDraft(fileInfo,saveName) {
			let str = "";
      if(!saveName){
        str = this.fromdata.title
      }else{
        str = saveName;
      }
			let data = this.$router.resolve({
				path: "/openAndSave_Word",
				query: {
					state: "viewFile",
					id: this.fromdata.id,
					zhengWenState: this.zhengWenState,
					JYcode: this.$businessCode.swglfj,
					multiTenancyId: this.fromdata.multiTenancyId,
					relativePath: fileInfo ? fileInfo.filePath : "",
					fileName: fileInfo ? fileInfo.fileName : "",
					showBtns: false,
					flowTranId:this.$businessCode.zxdbgg,
					saveSpecialFileName:str
				}
			});
			this.showDraft = false;
			this.$forceUpdate();

			window.open(data.href, "_blank");
		},
		viewFile(file) {
			let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
			let openPlugin = false;
			let that = this;
			this.bank_doDownloadFile.fileName = file.fileName;
			this.bank_doDownloadFile.filePath = file.filePath;
			this.$post
				.postData(
					"doDownloadFile",
					JSON.stringify(this.bank_doDownloadFile),
					this.$businessCode.swglfj
				)
				.then(res => {
					if (res) {
						if (res && res.success) {
							fileType.map(item => {
								if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
									openPlugin = true;
								}
							});
							if (openPlugin) {
								this.zhengWenState = 0;
								this.doDraft(res);
							} else {
								window.open(
									(this.$post.getEnvState()
										? location.origin
										: "http://localhost:8080") +
										"/ecpweb/getLocalFile.action?relativePath=" +
										res.filePath +
										"&fileName=" +
										res.fileName +
										"&openFile=true",
									"_blank"
								);
							}
						} else {
							this.$message({
								type: "error",
								showClose: true,
								offset: 400,
								message: "后端获取文件失败",
								duration: 1500
							});
						}
					}
				});
		},
		//可被收回传阅单的列表
		takeBackSignCY(){
			this.checkedsh=[];
			this.shdialog1 = true;
			let parms = {
				function:"selectallowBackCirculate",
				id:this.$route.query.id,
				multiTenancyId:this.fromdata.multiTenancyId,
				//multiTenancyId:this.$route.query.multiTenancyId
			};
			this.$post
				.postData(
					"selectallowBackCirculate",
					JSON.stringify(parms),
					this.$businessCode.zxdbgg
				).then(res=>{
					if(res&&res.success){
						this.shData = res.data;
						}else{
							this.$message({
								message:res.message,
								type:'error'
							})
						}
				})
		},
		shQuedingCY(){
			if(this.checkedsh.length == 0){
				this.$message({
					type: "error",
					showClose: true,
					offset: 400,
					message: "未选择数据",
					duration: 1000
				});
			}else{
				let checkboxdata=this.checkedsh.join(";");
			let parms = {
				function:"takeBackCirculate",
				id:this.$route.query.id,
				ids:checkboxdata,
				multiTenancyId:this.fromdata.multiTenancyId,
				isCirculate:''
			};
			this.$post
				.postData(
					"takeBackCirculate",
					JSON.stringify(parms),
					this.$businessCode.zxdbgg
				).then(res=>{
					if(res&&res.success){
						this.shdialog1 = false;
						this.$message({
							type: "success",
							showClose: true,
							offset: 400,
							message: "收回成功",
							duration: 1000
						});
						this.toEdit();
						}else{
							this.$message({
								message:res.message,
								type:'error'
							})
						}
				})
			}
			
		},
	},
	created() {
		//初始化加载数据
		this.bank_dispach.id = this.$route.query.mainDocId ? this.$route.query.mainDocId : "";
		this.bank_dispach.circulateId = this.$route.query.id ? this.$route.query.id : "";
		this.state = this.$route.query.state ? this.$route.query.state : "";
		this.bank_doSend.id = this.bank_dispach.id;
		this.uploadConfig.flowTranId = this.treeTradeCode = this.zxdbgg;  //完成并发送 树 流程交易线   chai
		this.bank_dispach.mainDocId = this.$route.query.mainDocId ? this.$route.query.mainDocId : "";
		this.bank_dispach.multiTenancyId = this.$route.query.multiTenancyId ? this.$route.query.multiTenancyId : "";
		this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
		this.openType = this.$route.query.openType ? this.$route.query.openType:"";
		this.treeTradeCode = this.$businessCode.zxdbgg;  //人员树交易线
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
				border: 1px solid red;
				display: flex;
				font-size: 12px;
				margin: 40px 0 0;
				position: relative;
				.bank_dispach_annotation_current {
					padding: 0 30px 0 10px;
					span {
						color: red;
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
.m10 {
	margin: 5px 0;
}
.redcolor {
	/deep/.el-input__inner{
		color: red !important;
	}
}
.command_wrap {
	display: flex;
	justify-content: space-between;
	min-width: 300px;
	font-size:14px;
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
	.down{
		cursor: pointer;
	}
	.down:hover{
	 color: #3b85ef
	}
}
.adviceInfo{
	font-size: 14px !important;
	line-height: 20px;
}
.timeFont{
	font-size: 13px;
}
.pad_lr10{
	padding: 0;
}
</style>
