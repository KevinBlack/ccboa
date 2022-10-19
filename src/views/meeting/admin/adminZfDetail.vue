/**
* create by zx on 2020/7/29 14:16
* 类注释：制发填写详细信息
* 备注：
*/
<template>
  <div class="adminZfDetail" id="meetzhifa">
    <div class="headerClick">
      <div class="right">
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-if="child=='true'&&joinmeetDept&&joinmeetDept.length>0"
          @click="buttonClick('查看报名表')"
          plain
        >查看报名表</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-if="formData.finishTime"
          @click="buttonClick('归档')"
          plain
        >归档</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-if="formData.finishTime && isNewFilePlace"
          @click="buttonClick('区块链归档')"
          plain
        >区块链归档</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="shiwuTitle">{{formData.draftOrgan}}{{formData.draftDepartment}}{{tempType}}</div>
    </div>
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
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >签批意见</a>
        <a
          v-if="formData.type!='本部会议通知'"
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
      </div>
      <div class="bank_dispach_file">
        <div class="process_content">
          <div class="cur_box">
            <div class="cur_sess">
              <p>
                当前环节：
                <span>{{formData.currentNode}}</span>
              </p>
              <p v-if="!formData.finishTime">
                当前处理人：
                <span>{{formData.currentNowName}}</span>
              </p>
            </div>
          </div>
          <h6 class="bank_dispach_file_tit">文件要素</h6>
          <div id="wjys" class="height_90"></div>
          <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="120px">
            <el-row v-if="formData.finishTime">
              <el-col :span="12">
                <el-form-item label="是否归档">
                  <el-radio-group v-model="onFileFlag" :disabled="true">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否抽取">
                  <el-radio-group v-model="extractFlag" :disabled="true">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训名称" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.title" :disabled="isWeiHu"></el-input>
                </el-form-item>
                <el-form-item label="会议名称" v-else>
                  <el-input v-model="formData.title" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主办部门" prop="maindept" class="par">
                  <el-input type="text" v-model="formData.maindept" :disabled="isWeiHu" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿人" prop="authorCn">
                  <el-input v-model="formData.authorCn" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="tel">
                  <el-input v-model="formData.tel" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿日期" prop="draftDate">
                  <el-input v-model="formData.draftDate" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训时间" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyTime" :disabled="isWeiHu"></el-input>
                </el-form-item>
                <el-form-item label="会议时间" v-else>
                  <el-input v-model="formData.hyTime" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训地点" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyAdress" :disabled="isWeiHu"></el-input>
                </el-form-item>
                <el-form-item label="会议地点" v-else>
                  <el-input v-model="formData.hyAdress" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row v-if="this.formData.type=='部门会议通知'|| this.formData.type=='培训会议通知'">
          <el-col :span="24">
            <el-form-item label="委托承办处室">
              <el-input></el-input>
            </el-form-item>
          </el-col>
            </el-row>-->
            <el-row v-if="this.formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="主持人">
                  <el-input v-model="formData.host" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'||this.formData.type=='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="联合单位">
                  <el-input v-model="formData.unitdept" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="2">
            <el-button
              @click="showOrgTree=true"
              type="primary"
              style="float:right"
              :disabled="isWeiHu"
            >选择</el-button>
              </el-col>-->
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="出席">
                  <el-input v-model="formData.attend" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="列席">
                  <el-input v-model="formData.attendance" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="摘要">
                    <el-input v-model="formData.summary" :disabled="isWeiHu"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item align="right" style="margin-right:5.5%">
                  <el-button @click="hyAdd" disabled>增加</el-button>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="会议内容" prop="wordBody">
                  <div class="box1" v-if="listArr.length>0">
                    <div
                      class="con-box clear-fix"
                      v-for="item in listArr"
                      :key="item.id"
                      style="border:1px solid #ccc;margin-bottom:1px"
                    >
                      <div class="con-left">
                        <div class="clear-fix">
                          <div class="con-left-p1">会议议题</div>
                          <div class="con-left-p2">{{item.topic}}</div>
                        </div>
                        <div class="clear-fix">
                          <div class="con-left-p1">参会部门</div>
                          <div class="con-left-p2">{{item.joinDept}}}</div>
                        </div>
                        <div class="clear-fix">
                          <div
                            style="height:100px;line-height:100px"
                            class="con-left-p1 bottom-none"
                          >会议材料</div>
                          <div
                            style="height:100px;line-height:100px;"
                            class="con-left-p2 bottom-none"
                          >
                            <el-col :span="23">
                              <div
                                class="tree_w tree_w1"
                                v-if="item.attachList&&item.attachList.length"
                              >
                                <el-scrollbar>
                                  <div
                                    v-for="(item1,index1) in  item.attachList"
                                    :key="item1.id"
                                    class="comp_list"
                                  >
                                    <template>
                                      <div class="command_file">
                                        <span class="numName">{{index1+1}}.</span>
                                        <span
                                          class="name down"
                                          @click="viewFile(item1,null,item1.fileName)"
                                        >{{item1.fileName}}</span>
                                        <span class="name">{{item1.createrName}}</span>
                                        <span class="name">{{item1.createTime}}</span>
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
                              </div>
                            </el-col>
                          </div>
                        </div>
                      </div>
                      <div class="con-right" v-if="isShow">
                        <el-button @click="hyBtnClick('编辑',item)" :disabled="isWeiHu">编辑</el-button>
                        <el-button @click="hyBtnClick('删除',item)" :disabled="isWeiHu">删除</el-button>
                      </div>
                      <!-- <div class="con-right" v-if="!isShow">
                    <el-button @click="hyBtnClick('增发',item)">增发</el-button>
                      </div>-->
                    </div>
                  </div>
                </el-form-item>
              </el-row>
            </el-row>
            <!-- <el-row v-if="this.formData.type=='系统会议通知'"> -->
            <el-row v-if="formData.type!='本部会议通知'&&formData.type!='部门会议通知'">
              <el-col :span="24">
                <el-form-item label="委托承办单位">
                  <el-row>
                    <el-col :span="20">
                      <el-input v-model="formData.entrustUnit" :disabled="isWeiHu"></el-input>
                    </el-col>
                    <!-- <el-col :span="2">
                  <el-button
                    type="primary"
                    style="float:right"
                    @click="getEntrustUnit"
                    :disabled="isWeiHu"
                  >选择</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button
                    type="primary"
                    style="float:right"
                    :disabled="isWeiHu"
                    @click="nochengban"
                  >删除</el-button>
                    </el-col>-->
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row v-if="this.formData.type!='本部会议通知'">
          <el-col :span="24">
            <el-form-item label="内容" prop="wordBody">
              <div class="editor_box" style="position:relative;z-index:1">
                <UE :config="config" id="UE" ref="ue"></UE>
              </div>
            </el-form-item>
          </el-col>
            </el-row>-->
            <div
              class="editor_box"
              style="position:relative;z-index:1"
              v-if="formData.type!='本部会议通知'"
            >
              <label>内容</label>
              <UE :config="config" id="UE" ref="ue"></UE>
            </div>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-form-item label="签发意见" prop="signIdea">
              <el-button
                type="primary"
                size="mini"
                @click="addSucc('signIdeaList')"
                :disabled="isWeiHu"
              >新增意见</el-button>
              <div class="suggStyle">
                <div
                  v-bind:class="['d_flex',{'border_line':index!=(signIdeaList.length-1)}]"
                  v-for="(item,index) in signIdeaList"
                  :key="index"
                >
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-col :span="2">
                        <span>内容</span>
                      </el-col>
                      <el-col :span="19">
                        <el-input
                          :disabled="isWeiHu"
                          type="textarea"
                          v-model="item.opinion"
                          class="d_f1"
                        ></el-input>
                      </el-col>
                      <el-col :span="2" style="margin-left:12px">
                        <el-button
                          type="danger"
                          @click="deleSugg('signIdeaList',index,item.id)"
                          :disabled="isWeiHu"
                        >删除</el-button>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:12px">
                    <el-col :span="2">
                      <span>用户部门</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.deptName" :disabled="isWeiHu"></el-input>
                    </el-col>
                    <div style="margin-left:12px">
                      <el-col :span="2">
                        <span>用户名</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.userName" :disabled="isWeiHu"></el-input>
                      </el-col>
                    </div>
                    <el-col :span="2">
                      <span>提交时间</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.date" :disabled="isWeiHu"></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- <template>
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.signIdea"
              :disabled="true"
              v-if="!(signIdeaList && signIdeaList.length!=0)"
            ></el-input>
            <div v-for="item in signIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{minRow:3,maxRow:15}"
                      class="d_f1"
                      :disabled="true"
                      :value="item.opinion"
                    ></el-input>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.date}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
              </template>-->
            </el-form-item>
            <el-form-item label="审核意见" prop="examineIdea">
              <el-button
                type="primary"
                size="mini"
                @click="addSucc('examineIdeaList')"
                :disabled="isWeiHu"
              >新增意见</el-button>
              <div class="suggStyle">
                <div
                  v-bind:class="['d_flex',{'border_line':index!=(examineIdeaList.length-1)}]"
                  v-for="(item,index) in examineIdeaList"
                  :key="index"
                >
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-col :span="2">
                        <span>内容</span>
                      </el-col>
                      <el-col :span="19">
                        <el-input
                          :disabled="isWeiHu"
                          type="textarea"
                          v-model="item.opinion"
                          class="d_f1"
                        ></el-input>
                      </el-col>
                      <el-col :span="2" style="margin-left:12px">
                        <el-button
                          type="danger"
                          @click="deleSugg('examineIdeaList',index,item.id)"
                          :disabled="isWeiHu"
                        >删除</el-button>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:12px">
                    <el-col :span="2">
                      <span>用户部门</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.deptName" :disabled="isWeiHu"></el-input>
                    </el-col>
                    <div style="margin-left:12px">
                      <el-col :span="2">
                        <span>用户名</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.userName" :disabled="isWeiHu"></el-input>
                      </el-col>
                    </div>
                    <el-col :span="2">
                      <span>提交时间</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.date" :disabled="isWeiHu"></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- <template>
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.examineIdea"
              :disabled="true"
              v-if="!(examineIdeaList && examineIdeaList.length!=0)"
            ></el-input>
            <div v-for="item in examineIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :disabled="true"
                      :autosize="{minRow:3,maxRow:15}"
                      class="d_f1"
                      :value="item.opinion"
                    ></el-input>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.date}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
              </template>-->
            </el-form-item>
            <!-- 2021/12/16 修改 传阅意见在 维护时 不能编辑、新增、删除 -->
            <el-form-item label="传阅意见" prop="cyIdea">
              <!-- <el-button
                type="primary"
                size="mini"
                @click="addSucc('cyIdeaList')"
                :disabled="isWeiHu"
              >新增意见</el-button> -->
              <div class="suggStyle">
                <div
                  v-bind:class="['d_flex',{'border_line':index!=(cyIdeaList.length-1)}]"
                  v-for="(item,index) in cyIdeaList"
                  :key="index"
                >
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-col :span="2">
                        <span>内容</span>
                      </el-col>
                      <el-col :span="19">
                        <el-input
                          :disabled="true"
                          type="textarea"
                          v-model="item.opinion"
                          class="d_f1"
                        ></el-input>
                      </el-col>
                      <el-col :span="2" style="margin-left:12px;">
                        <!-- <el-button
                          type="danger"
                          @click="deleSugg('cyIdeaList',index,item.id)"
                          :disabled="isWeiHu"
                        >删除</el-button> -->
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:12px">
                    <el-col :span="2">
                      <span>用户部门</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.deptName" :disabled="true"></el-input>
                    </el-col>
                    <div style="margin-left:12px">
                      <el-col :span="2">
                        <span>用户名</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.userName" :disabled="true"></el-input>
                      </el-col>
                    </div>
                    <el-col :span="2">
                      <span>提交时间</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.date" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- <template>
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.cyIdea"
              :disabled="true"
              v-if="!(cyIdeaList && cyIdeaList.length!=0)"
            ></el-input>

            <div v-for="item in cyIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :disabled="true"
                      :autosize="{minRow:3,maxRow:15}"
                      class="d_f1"
                      :value="item.opinion"
                    ></el-input>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.date}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
              </template>-->
            </el-form-item>
            <el-form-item label="反馈信息" prop="isFeedback">
              <el-radio-group v-model="formData.isFeedback" @change="change" :disabled="true">
                <el-radio v-model="formData.isFeedback" :label="'0'">是</el-radio>
                <el-radio v-model="formData.isFeedback" :label="'1'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col :span="23">
                <el-form-item label="传阅人员">
                  <el-row>
                    <el-form-item label="未阅">
                      <p
                        :disabled="isWeiHu"
                        style="border:1px solid #ccc;min-height:30px"
                      >{{formData.wyPle}}</p>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="已阅">
                      <p
                        :disabled="isWeiHu"
                        style="border:1px solid #ccc;min-height:30px"
                      >{{formData.yyPle}}</p>
                    </el-form-item>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
          <el-col :span="23">
            <el-form-item label="传阅人员">
              <div class="con-box" style="border:1px solid #ccc;margin-bottom:1px">
                <div class="clear-fix chuanyue1">
                  <p class="chuanyue-p1">未阅</p>
                  <el-input
                    class="chuanyue-p2"
                    :disabled="isWeiHu"
                    v-model="formData.wyPle"
                    style="border:0;outline:medium"
                  ></el-input>
                </div>
                <div class="clear-fix chuanyue">
                  <p class="chuanyue-p1">已阅</p>
                  <el-input class="chuanyue-p2" :disabled="isWeiHu" v-model="formData.yyPle"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-col>
            </el-row>-->
            <el-form-item label="承办单位" v-if="child=='true'&&entrustUnit&&entrustUnit.length>0">
              <!-- <el-input v-model="entrustUnit" disabled></el-input> -->
              <div>{{entrustUnit}}</div>
            </el-form-item>
            <el-form-item label="参会单位" v-if="child=='true'&&joinmeetDept&&joinmeetDept.length>0">
              <!-- <el-input v-model="joinmeetDept" disabled></el-input> -->
              <div>{{joinmeetDept}}</div>
            </el-form-item>
            <h6 class="bank_dispach_file_tit" v-if="formData.type!='本部会议通知'">附件</h6>
            <div id="scfj" class="height_90" v-if="formData.type!='本部会议通知'"></div>
            <el-form-item v-if="this.formData.type!='本部会议通知'">
              <el-col :span="23">
                <upload-file-ts
                  :uploadConfig="uploadConfig"
                  @fileList="fileList"
                  :fileId="fileId"
                  :disabled="isWeiHu"
                ></upload-file-ts>
                <div
                  class="tree_w"
                  v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length"
                >
                  <el-scrollbar>
                    <div
                      v-for="(item,index) in  formData.attchmentFileInfo"
                      :key="item.id"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_file">
                          <span class="numName">{{index+1}}.</span>
                          <span
                            class="name down"
                            @click="viewFile(item,null,item.fileName)"
                          >{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="upRow(index)"
                              v-if="formData.attchmentFileInfo.length>1"
                              :disabled="index==0||isWeiHu"
                              round
                            >上移</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(index)"
                              v-if="formData.attchmentFileInfo.length>1"
                              :disabled="index==formData.attchmentFileInfo.length-1||isWeiHu"
                              round
                            >下移</el-button>
                            <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index,item.id)"
                              :disabled="item.disabled||isWeiHu"
                              round
                            >删除</el-button>
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
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 委托承办单位 -->
    <el-dialog
      title="选择委托承办单位"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-form class="radio-form">
        <el-form-item label="一级机构">
          <template>
            <el-radio-group v-model="radio1" @change="radioClick">
              <el-radio
                v-for="item in jigou"
                :key="item.unitCode"
                :label="item.unitCode"
              >{{item.unitName}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="一级部门">
          <template>
            <el-radio-group v-model="radio1" @change="radioClick">
              <el-radio
                v-for="item in bumen"
                :key="item.unitCode"
                :label="item.unitCode"
              >{{item.unitName}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nochengban">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--本部会议内容新增-->
    <el-dialog :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="form">
        <el-form-item label="会议议题" :label-width="formLabelWidth">
          <el-input v-model="form.topic" placeholder="请输入会议议题！"></el-input>
        </el-form-item>
        <el-form-item label="参会部门" :label-width="formLabelWidth">
          <!-- 本部选择参会部门 -->
          <el-col :span="22">
            <!-- <el-form-item label="联合单位"> -->
            <el-input v-model="form.joinDept" placeholder="请选择参会部门" :disabled="isWeiHu"></el-input>
            <!-- </el-form-item> -->
          </el-col>
          <!-- <el-col :span="2">
            <el-button @click="showOrgTree2=true" type="primary" style="float:right">选择</el-button>
          </el-col>-->
          <!-- <el-input v-model="form.joinDept" placeholder="请选择参会部门"></el-input> -->
        </el-form-item>
        <el-form-item label="会议材料" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.file"></el-input>
          <el-button>引入</el-button>-->
          <el-col :span="23">
            <upload-file-ts :uploadConfig="uploadConfig1" @fileList="fileList1" :fileId="fileId1"></upload-file-ts>
            <div class="tree_w" v-if="form.attachList&&form.attachList.length">
              <el-scrollbar>
                <div v-for="(item,index) in  form.attachList" :key="item.id" class="comp_list">
                  <template>
                    <div class="command_file">
                      <span class="name down" @click="downFile1(item)">{{item.fileName}}</span>
                      <span class="name">{{item.createrName}}</span>
                      <span class="name">{{item.createTime}}</span>
                      <div class="btns">
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="upRow1(index)"
                          v-if="form.attachList.length>1"
                          :disabled="index==0"
                          round
                        >上移</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downRow1(index)"
                          v-if="form.attachList.length>1"
                          :disabled="index==form.attachList.length-1"
                          round
                        >下移</el-button>
                        <el-button
                          type="warning"
                          size="mini"
                          @click.native="deleteRow1(index,item.id)"
                          :disabled="item.disabled"
                          round
                        >删除</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downFile1(item)"
                          round
                        >下载</el-button>
                      </div>
                    </div>
                  </template>
                </div>
              </el-scrollbar>
            </div>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="hyCon">确 定</el-button> -->
        <el-button type="primary" @click="hyConWay">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 会议内容更新 -->
    <!-- <el-dialog :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="会议议题" :label-width="formLabelWidth">
          <el-input v-model="form1.topic" placeholder="请输入会议议题！"></el-input>
        </el-form-item>
        <el-form-item label="参会部门" :label-width="formLabelWidth">
          <el-input v-model="form1.joinDept" placeholder="请选择参会部门"></el-input>
        </el-form-item>
        <el-form-item label="会议材料" :label-width="formLabelWidth">
          <el-input v-model="form1.file"></el-input>
          <el-button>引入</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="hyConUpdate">确 定</el-button>
      </div>
    </el-dialog>-->
    <!-- 反馈信息 -->
    <el-dialog title="反馈信息" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose1">
      <span>反馈信息</span>
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="item in returnCnArr"
          :key="item"
          :label="item"
          :disabled="item=='行名'|| item=='部门'|| item=='姓名'||item=='手机'"
        ></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fkback">取 消</el-button>
        <el-button type="primary" @click="fankui">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 联合单位 -->
    <org-tree
      v-model="showOrgTree"
      title="请选择联合单位"
      :isSingle="false"
      :orgOrDept="0"
      @orgList="getOrgList"
      :selectDept="selectDept1"
    ></org-tree>
    <!-- 本部会议选择参会部门-->
    <org-tree
      v-model="showOrgTree2"
      title="请选择参会部门"
      :isSingle="false"
      :orgOrDept="0"
      @orgList="getOrgList2"
      :selectDept="selectDept"
    ></org-tree>
    <!-- 非本部会议获取参会部门 -->
    <org-tree
      v-model="showOrgTree1"
      title="选择部门"
      :outBank="true"
      :isSingle="false"
      :orgOrDept="0"
      @orgList="getOrgList1"
    ></org-tree>
    <!-- 完成并发送，传阅获取人员 -->
    <!-- <select-person
      :loadingTree="true"
      :offenUse="offenUse"
      :treeData="treeData"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择人员"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :fromdata="formData"
      @showCompDialog="showCompDialog"
    ></select-person>-->
    <select-person
      v-model="dialogState"
      :seletOptionsData="seletOptionsData"
      :orgOrDeptId="selsecOrgOrDeptId"
      @showCompDialog="showCompDialog"
    />
    <!-- <appendWriteList ref="writelist" v-if="appendWriteDialog" @childsaveselect="writelistvalue"></appendWriteList> -->
    <!-- 常用批语 -->
    <write-list-ts v-model="appendWriteDialog" @childsaveselect="writelistvalue"></write-list-ts>
    <!-- <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart> -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
    <!-- 传阅收回选人 -->
    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
  </div>
</template>

<script type="text/ecmascript-6">
import selectPerson from "components/viewFlow/dispatchTree";
import writeListTs from "../../../components/appendWriteList/writeListTs";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import mTable from "@/components/table/tTable";
import orgTree from "components/tree/orgTree";
import minixs from "../../../minixs/index";
import { mapGetters, mapActions } from "vuex";
import cyPersonList from "../../bianhan/components/cyPersonList";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import UE from "components/editor/ue.vue";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import exportTable from "../../../minixs/exportTable";
import beanList from "../../../util/beanList";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "adminZfDetail",
  components: {
    writeListTs,
    // editor
    orgTree,
    // selectOrgOrDept,
    selectPerson,
    shiwuFlow,
    // appendWriteList,
    cyPersonList,
    uploadFileTs,
    UE,
  },
  mixins: [minixs, openOrDownLoadFile,viewDraft],
  props: {},
  data() {
    return {
      isNewFilePlace:'',
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      extractFlag: 0,
      onFileFlag: 0,
      tempType: "",
      fileId: "",
      fileId1: "",
      isWeiHu: true,
      selsecOrgOrDeptId: "", //流程调度机构
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      // 承办部门
      entrustUnit: "",
      // 参会部门
      joinmeetDept: "",
      // 附件
      uploadConfig: {
        formId: "meet",
        filesHas: [],
        isSpecial: 0,
        id: "",
      },
      // 本部会议内容附件
      uploadConfig1: {
        formId: "bbMeet",
        filesHas: [],
        isSpecial: 10001,
      },
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      // 委托承办单位
      dialogVisible: false,
      jigou: [],
      bumen: [],
      // 反馈信息
      dialogVisible1: false,
      rules: {},
      cyArr: [],
      cyObj: {},
      // select主办部门
      showTree: false,
      // 本部会议选择参会部门
      showOrgTree2: false,
      // 本部会议内容增加false  ；   编辑true
      isAddOrEdit: false,
      // 联合单位
      showOrgTree: false,
      unitDeptArr: [],
      signIdeaList: [], //签发意见
      examineIdeaList: [], //处理意见
      cyIdeaList: [], //传阅意见
      listArr: [],
      isShow: true,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {},
      form1: {},
      formLabelWidth: "120px",
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth",
      },
      flag: false,
      id: "",
      leixing: "",
      showFlowChart: false,
      flowChartList: [], //流程列表
      select: "",
      radio: "",
      // checkList: ["行名", "部门", "姓名", "手机"],
      checkList: ["行名", "部门", "姓名", "手机"],
      formData: {},
      radio1: "",
      buttonList: [
        { name: "关闭", show: true },//0
        { name: "保存", show: false },//1
        { name: "查看流程", show: true },//2
        { name: "打印处理单", show: true },//5-3
        { name: "收藏", show: true },//6-4
        { name: "维护", show: false },//4 -5     
        { name: "流程调度", show: true },//3-6
      ],
      currentUser: JSON.parse(localStorage.getItem("userInfo")).humanName,
      // 本部会议内容选参会部门保留原始数据
      selectDept: [],
      // 联合单位保留原始数据
      selectDept1: [],
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型
      // 传阅收回选人
      cyData: [],
      showCyPerson: false,
      // 选择参会部门
      showOrgTree1: false,
      // 选择人员
      treeData: [], //人员树
      // dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      dialogType: "dosend",
      seletOptionsData: [],
      offenUse: true,
      loadingTree: true,
      checkOrg: false,
      // 发办理单位  增发
      text: "发办理单位",
      returnCnArr: [],
      returnEnArr: [],
      isNecessArr: [],
      arr1: [],
      arr2: [],
      arr3: [],
      tempArr: [],
      child: "false",
    };
  },
  computed: {
    // ...mapGetters([
    //   'todoItem'
    // ])
  },
  methods: {
    // ...mapActions([
    //   'setTodoItem'
    // ]),
    // isZonghe () {
    //   return userInfo.isZongHe()
    // },
    // 主办部门
    selectOrg(org) {
      this.$set(this.formData, "maindept", org.unitName);
      this.formData.maindeptId = org.id;
    },
    //本部会议参会部门
    getOrgList2(org) {
      this.selectDept = org;
      let ids = [],
        names = [];
      org.forEach((item) => {
        ids.push(item.id);
        names.push(item.unitName);
      });
      this.form.joinDept = names.join(",");
      this.form.joinDeptId = ids.join(",");
    },
    // 委托承办单位
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.nochengban();
        })
        .catch((_) => {});
    },
    nochengban() {
      //取消
      this.dialogVisible = false;
      this.radio1 = "";
      this.formData.entrustUnit = "";
      this.formData.undertakeDepartmentId = "";
    },
    // chengban () {//确定
    //   // this.dialogVisible = false
    //   // this.formData.entrustUnit = ''
    //   // this.formData.undertakeDepartmentId = this.radio1
    //   // console.log('chenbban', this.formData)
    // },
    radioClick(unitCode) {
      let arr = [...this.bumen, ...this.jigou],
        unitName;
      arr.map((item) => {
        if (item.unitCode == unitCode) {
          unitName = item.unitName;
        }
      });
      this.$set(this.formData, "entrustUnit", unitName);
      this.formData.undertakeDepartmentId = unitCode;
    },
    // 反馈信息
    handleClose1(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    fankui() {
      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.tempArr = [];
      this.checkList.forEach((item) => {
        let index = this.returnCnArr.findIndex((item1) => item1 == item);
        if (index || index == 0) {
          this.arr1.push(item);
          this.arr2.push(this.returnEnArr[index]);
          this.arr3.push(this.isNecessArr[index]);
        }
      });
      this.tempArr.push(this.arr1.join(","));
      this.tempArr.push(this.arr2.join(","));
      this.tempArr.push(this.arr3.join(","));
      this.formData.returnHtml = this.tempArr.join("&");
      this.dialogVisible1 = false;
    },
    fkback() {
      this.dialogVisible1 = false;
      this.formData.isFeedback = "";
    },

    getEntrustUnit() {
      this.$api.setting.organization
        .getTree({
          unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
          unitClass: 1,
        })
        .then((res) => {
          this.jigou = res.data;
          this.$api.setting.organization
            .getTree({
              unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
              unitClass: 0,
            })
            .then((res) => {
              this.bumen = res.data;
              this.dialogVisible = true;
              // console.log(55555555, res)
              // this.loading = false
              // let data = []
              // res.data.map(item => {
              //   data.push({ unitName: item.unitName, id: item.unitCode, leaf: item.lastUnit })
              // })
              // return resolve(data);
            });

          // console.log(55555555, res)
          // this.loading = false
          // let data = []
          // res.data.map(item => {
          //   data.push({ unitName: item.unitName, id: item.unitCode, leaf: item.lastUnit })
          // })
          // return resolve(data);
        });
    },
    deleSugg(sugg, n, dataId) {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (dataId) {
            this.$api.meeting.hyIdeaDel({ id: dataId }).then((res) => {
              if (res.code == "SUCCESS") {
                this.formData.mark = "";
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
                this.loadData();
              }
            });
          } else {
            switch (sugg) {
              case (sugg = "signIdeaList"):
                this.signIdeaList.splice(n, 1);
                break;
              case (sugg = "examineIdeaList"):
                this.examineIdeaList.splice(n, 1);
                break;
              case (sugg = "cyIdeaList"):
                this.cyIdeaList.splice(n, 1);
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
        case (range = "signIdeaList"):
          this.signIdeaList.push({
            opinion: "",
            deptName: AdepartmentName,
            userName: AcreateUser,
            DATE: AcreateTime,
            type: "0",
          });
          break;
        case (range = "examineIdeaList"):
          this.examineIdeaList.push({
            opinion: "",
            deptName: AdepartmentName,
            userName: AcreateUser,
            DATE: AcreateTime,
            type: "1",
          });
          break;
        case (range = "cyIdeaList"):
          this.cyIdeaList.push({
            opinion: "",
            deptName: AdepartmentName,
            userName: AcreateUser,
            date: AcreateTime,
            type: "2",
          });
          break;
      }
    },
    // 联合单位
    getOrgList(org) {
      this.selectDept1 = org;
      // this.$set(this.applyformData, 'mbankName', org.unitName)
      // this.$set(this.applyformData, 'mbankId', org.id)
      this.unitDeptArr = [];
      org.forEach((item) => {
        this.unitDeptArr.push(item.unitName);
      });
      let str = this.unitDeptArr.join(";");
      // console.log(3333, str)
      this.formData.unitdept = str;
    },
    // onScroll () {
    //   const scrolled = Math.floor(
    //     document.body.scrollTop ||
    //     document.documentElement.scrollTop ||
    //     window.pageXOffset
    //   );
    //   if (scrolled < this.distance_qpyj - 650) {
    //     this.active = "#wjys";
    //   } else if (scrolled > this.distance_qpyj - 650 && scrolled < this.distance_scfj - 400) {
    //     this.active = "#qpyj";
    //   } else if (scrolled > this.distance_scfj - 400) {
    //     this.active = "#scfj";
    //   }
    // },
    toTarget(target) {
      this.active = target;
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    handleEdit(row) {
      console.log("edit", row);
    },
    handleDel(row) {
      console.log("del", row);
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          // this.$intent.closeWindow(this);
          this.close()
          break;
        case "保存":
          this.isWeiHu = true;
          this.buttonList[1].show = false;
          this.buttonList[5].show = true;
          this.save();
          break;
        case "维护":
          this.isWeiHu = false;
          this.buttonList[1].show = true;
          this.buttonList[5].show = false;
          if (this.formData.type != "本部会议通知") {
            this.$refs.ue.setEable();
          }
          //   this.buttonList[2] = true
          break;
        case "流程调度":
          this.toNext();
          break;
        case "查看报名表":
          this.$intent.goNewPage(this, {
            path: "/meeting/clookBaoMing",
            query: { id: this.id, flag: "zf",numYear:this.numyear },
          });
          break;
        case "归档":
          if (
            this.formData.curbankId ==
            JSON.parse(localStorage.getItem("userInfo")).unitId
          ) {
            this.fileResponse();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "当前登录人与处理人不一致，无法进行归档操作",
              duration: 500,
            });
          }

          break;
        case "区块链归档":
          if (
            this.formData.curbankId ==
            JSON.parse(localStorage.getItem("userInfo")).unitId
          ) {
            this.newfileResponse();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "当前登录人与处理人不一致，无法进行归档操作",
              duration: 500,
            });
          }
          break;
        case "查看流程":
          this.$api.meeting.getProcess({ id: this.id,numYear:this.numyear }).then((res) => {
            this.showFlowChart = true;
            this.flowChartList = res.list;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
          break;
        case "收藏":
          // this.formData.wordBody =
          //   (process.env.NODE_ENV == "production" && this.formData.type != '本部会议通知')
          //     ? this.$refs.ue.getUEContent()
          //     : "";
          // let deptTableHead = "";
          // deptTableHead =
          //   this.formData.draftOrgan +
          //   this.formData.draftDepartment +
          //   this.tempType;
          // exportTable.getPdf(
          //   deptTableHead,
          //   this.formData.attchmentFileInfo,
          //   "meetzhifa",
          //   "A08462002",
          //   "biaoti",
          //   this
          // );
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              this.$api.meeting
                .zfCollect({ id: this.formData.id,numYear:this.numyear })
                .then((res) => {
                  let obj = {};
                  let arr = [];
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName;
                  this.downFile(obj);
                });
            })
            .catch(() => {});
          break;
        case "打印处理单":
          this.$intent.go(this, {
            path: "/meetingPrint",
            query: { id: this.id,numYear:this.numyear },
          });
          break;
      }
    },

    // 关闭按钮， 提示信息
    close () {
      this.$confirm("关闭前是否保存页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
      })
        .then(() => {
          if (this.id) {
            this.$api.meeting.zfUpdateData({ ...this.formData, admin: "admin" }).then((res) => {
              this.$intent.closeWindow(this);
            });
          }
        })
        .catch(action => {
          if (action === 'cancel') {
            this.$intent.closeWindow(this);
          }
        });
    },
    // 归档
    fileResponse() {
      let that = this;
      that.$api.meeting
        .fileResponse({ id: this.id,numYear:this.numyear})
        .then((res) => {
          that.loadData();
        })
        .catch((res) => {});
    },
    //区块链归档
    newfileResponse() {
      let that = this;
      that.$api.meeting
        .newfileResponse({ id: this.id,numYear:this.numyear})
        .then((res) => {
          that.loadData();
        })
        .catch((res) => {});
    },
    toEnd() {
      this.formData.currentNode = "办结";
      this.$api.meeting.zfUpdateData(this.formData).then((res) => {
        this.$message({
          message: "办结完成",
          type: "success",
        });
        this.$intent.closeWindow(this);
      });
    },
    change() {
      if (this.formData.isFeedback == "0") {
        //zflookBmb
        this.returnCnArr = [];
        this.returnEnArr = [];
        this.isNecessArr = [];
        this.$api.meeting
          .settingDetail({
            scUnitId: this.unitCode,
            fileType: this.formData.type,
          })
          .then((res) => {
            const resObj = res.meetHyglFeedbackConfigDo;
            const Cnstr = resObj.returnCn;
            const Enstr = resObj.returnEn;
            const str = resObj.isNecess;
            this.returnCnArr = Cnstr.substr(0, Cnstr.length - 1).split(",");
            this.returnEnArr = Enstr.substr(0, Enstr.length - 1).split(",");
            this.isNecessArr = str.substr(0, str.length - 1).split(",");
          });
        this.dialogVisible1 = true;
      } else {
        this.formData.returnHtml = "";
        this.checkList = ["行名", "部门", "姓名", "手机"];
      }
    },
    // 保存
    save() {
      this.formData.wordBody =
        process.env.NODE_ENV == "production" &&
        this.formData.type != "本部会议通知"
          ? this.$refs.ue.getUEContent()
          : "";
      this.formData.admin = "admin";
      // this.formData.typeFlag = '0'//0 大表单意见字段不清空
      this.formData.opinionList = [
        ...this.signIdeaList,
        ...this.examineIdeaList,
        ...this.cyIdeaList,
      ];
      if (this.formData.type == "本部会议通知") {
        this.formData.contentList = this.listArr;
      }
      this.$api.meeting.adminZfUpdate(this.formData).then((res) => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          if (this.formData.type != "本部会议通知") {
            this.$refs.ue.setDsabled();
          }
        }
        this.loadData();
      });
    },
    // 加载详情
    loadData() {
      this.$api.meeting
        .zfDetail1({
          id: this.id,
          numYear:this.numyear
        })
        .then((res1) => {
          this.formData = res1.meetSendOrderDo;
          this.isNewFilePlace = res1.isNewFilePlace
          this.formData.draftDate = res1.meetSendOrderDo.draftDate.split(
            " "
          )[0];

          if (this.formData.type == "培训会议通知") {
            this.tempType = "培训通知";
          } else {
            this.tempType = this.formData.type;
          }
          this.selsecOrgOrDeptId = this.formData.curbankId;
          this.id = res1.meetSendOrderDo.id;
          this.fileId = res1.meetSendOrderDo.id;
          this.leixing = res1.meetSendOrderDo.type;
          if (this.formData.finishTime) {
            this.buttonList[6].show = false;
            this.buttonList[5].show = true;
          } else {
            this.buttonList[6].show = true;
            this.buttonList[5].show = true;
          }
          // const telArr = res1.meetSendOrderDo.tel.split(',')
          // if (telArr.length == 2) {
          //   this.formData.tel = telArr[1]
          // } else {
          //   this.formData.tel = telArr[0]
          // }
          //是否归档，是否抽取字段重新赋值
          if (
            this.formData.onFileFlag &&
            this.formData.onFileFlag != "NULL" &&
            this.formData.onFileFlag != ""
          ) {
            this.onFileFlag = 1;
            this.extractFlag = 1;
          } else {
            this.onFileFlag = 0;
            this.extractFlag = 0;
          }
          this.joinmeetDept = "";
          this.entrustUnit = "";
          let entrustUnitArr = [],
            joinmeetDeptArr = [];
          if (res1.cbList && res1.cbList.length > 0) {
            this.child = "true";
            res1.cbList.forEach((item) => {
              if (item.isCanOrCb == "0") {
                joinmeetDeptArr.push(item.joinmeetDept);
              } else {
                entrustUnitArr.push(item.entrustUnit);
              }
            });
            this.joinmeetDept = joinmeetDeptArr.join(",");
            this.entrustUnit = entrustUnitArr.join(",");
          }
          this.signIdeaList = res1.sendList; //签发意见
          this.examineIdeaList = res1.checkList; //处理意见
          this.cyIdeaList = res1.cyList; //传阅意见
          if (this.formData.type == "本部会议通知") {
            this.hyConList1();
          }
          if (this.formData.type != "本部会议通知") {
            this.getFileList();
            setTimeout(() => {
              this.$refs.ue.setUEContent(this.formData.wordBody);
              this.$refs.ue.setDsabled();
            }, 1000);
          }
        });
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id,numYear:this.numyear }).then((res) => {
        // this.formData.attchmentFileInfo = res.data;
        this.$set(this.formData, "attchmentFileInfo", res.data);

        console.log("附件", this.formData.attchmentFileInfo);
        this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
      });
    },
    getFileList1(id, index) {
      this.$api.setSysConfig.getTextemList({ id: id ,numYear:this.numyear}).then((res) => {
        this.listArr[index].attchmentFileInfo = res.data;
        this.formData.attchmentFileInfo.push(res.data);
      });
    },
    // 删除
    del() {
      this.$api.meeting.zfDelData({ id: this.id }).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.$intent.closeWindow(this);
        // this.$router.push('/meeting/zf');
      });
    },
    // 完成并发送
    toNext() {
      this.formData.wordBody =
        process.env.NODE_ENV == "production" &&
        this.formData.type != "本部会议通知"
          ? this.$refs.ue.getUEContent()
          : "";
      this.$api.meeting
        .diaodu({
          id: this.id,
        })
        .then((res) => {
          this.seletOptionsData = res.list;
          this.dialogState = true;
        });
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      if (!status) {
        return;
      }

      this.next(data[0], params);
    },
    //完成并发送
    next(person, params) {
      this.formData.typeFlag = "0"; //1 清空大表单意见   0 不清空
      this.formData.isUp = person.id.split("#")[1];
      this.formData.currentUserId = person.idStr;
      this.formData.currentUser = person.name;
      this.formData.admin = "admin";
      this.formData.nextAvyId = params.id;
      this.formData.currentNode = params.name;
      console.log(99999, "this.formData", this.formData);
      this.$api.meeting.zfUpdateData(this.formData).then((res) => {
        this.$message({
          message: "发送成功",
          type: "success",
        });
        this.$intent.closeWindow(this);
      });
    },
    // 发参会
    getOrgList1(data) {
      console.log(99999, data);
      if (this.text == "发办理单位") {
        let ids = [],
          names = [];
        data.forEach((item) => {
          ids.push(item.id);
          names.push(item.unitName);
        });
        this.$api.meeting
          .sendCB({
            id: this.id,
            undertakeDepartmentId: ids.join(","),
            undertakeDepartment: names.join(","),
            TPLBSNID: "HY_XTHYTZCH", //区分流程   HY_XTHYTZCB  承办      参会 HY_XTHYTZCH
            isCanOrCb: "0", //0 参会   1承办
          })
          .then((res) => {
            // console.log('facanhui')
            // this.loadData()
            // this.$message({
            //   message: '发送参会成功',
            //   type: 'success'
            // });
            if (res.errorName) {
              if (res.sussName) {
                this.$alert(
                  "参会发送失败单位:" +
                    res.errorName +
                    "\n" +
                    "参会发送成功单位：" +
                    res.sussName,
                  {
                    confirmButtonText: "确定",
                    type: "warning",
                  }
                ).then(() => {
                  this.loadData();
                });
              } else {
                this.$alert("参会发送失败单位:" + res.errorName, {
                  confirmButtonText: "确定",
                  type: "warning",
                }).then(() => {
                  this.loadData();
                });
              }
            } else {
              this.$alert("参会已发送至" + res.sussName, {
                confirmButtonText: "确定",
                type: "warning",
              }).then(() => {
                this.loadData();
              });
            }

            if (this.formData.entrustUnit) {
              this.$api.meeting
                .sendCB({
                  id: this.id,
                  // undertakeDepartmentId: ids.join(","),
                  // undertakeDepartment: names.join(","),
                  TPLBSNID: "HY_XTHYTZCB", //区分流程   HY_XTHYTZCB  承办      参会 HY_XTHYTZCH
                  isCanOrCb: "1", //0 参会   1承办
                })
                .then((res) => {
                  if (res.errorName) {
                    if (res.sussName) {
                      this.$alert(
                        "承办发送失败单位:" +
                          res.errorName +
                          "\n" +
                          "承办发送成功单位：" +
                          res.sussName,
                        {
                          confirmButtonText: "确定",
                          type: "warning",
                        }
                      ).then(() => {
                        this.loadData();
                      });
                    } else {
                      this.$alert("承办发送失败单位:" + res.errorName, {
                        confirmButtonText: "确定",
                        type: "warning",
                      }).then(() => {
                        this.loadData();
                      });
                    }
                  } else {
                    this.$alert("承办已发送至" + res.sussName, {
                      confirmButtonText: "确定",
                      type: "warning",
                    }).then(() => {
                      this.loadData();
                    });
                  }
                });
            }
            // this.$intent.closeWindow(this);
          });
      } else if (this.text == "增发") {
        let idArr1 = [];
        let nameArr1 = [];
        console.log(5555, data);
        data.forEach((item, index) => {
          idArr1.push(item.id);
          nameArr1.push(item.unitName);
        });
        this.$api.meeting
          .sendCB({
            id: this.id,
            undertakeDepartmentId: idArr1.join(","),
            undertakeDepartment: nameArr1.join(","),
            TPLBSNID: "HY_XTHYTZCH", //区分流程   HY_XTHYTZCB  承办      参会 HY_XTHYTZCH
            isCanOrCb: "0", //0 参会   1承办
          })
          .then((res) => {
            // this.loadData()
            // this.$message({
            //   message: '发送参会成功',
            //   type: 'success'
            // });
            if (res.errorName) {
              if (res.sussName) {
                this.$alert(
                  "参会发送失败单位:" +
                    res.errorName +
                    "\n" +
                    "参会发送成功单位：" +
                    res.sussName,
                  {
                    confirmButtonText: "确定",
                    type: "warning",
                  }
                ).then(() => {
                  this.loadData();
                });
              } else {
                this.$alert("参会发送失败单位:" + res.errorName, {
                  confirmButtonText: "确定",
                  type: "warning",
                }).then(() => {
                  this.loadData();
                });
              }
            } else {
              this.$alert("参会已发送至" + res.sussName, {
                confirmButtonText: "确定",
                type: "warning",
              }).then(() => {
                this.loadData();
              });
            }
            // this.$intent.closeWindow(this);
          });
      }
    },
    //获取传阅人员列表
    chuanYue() {
      this.$api.meeting.getCyPerson({}).then((res) => {
        this.treeData = res.result.data;
        this.dialogState = true;
      });
    },
    //发传阅
    cy(person) {
      let ids = [],
        names = [];
      person.forEach((item) => {
        ids.push(item.idStr);
        names.push(item.name);
      });
      this.formData.currentUserId = ids.join(",");
      this.formData.currentUser = names.join(",");
      this.formData.currentNode = "制发";
      this.$api.meeting.sendChuanYue(this.formData).then((res) => {
        this.loadData();
        this.$message({
          message: "传阅成功",
          type: "success",
        });
      });
    },
    //传阅收回、承办收回
    cyPersonList(data) {
      let ids = [];
      data.map((item) => {
        ids.push(item.id);
      });
      if (this.dialogTypeNow == "cb") {
        // this.$api.meeting.cbChBack({
        //   id: this.id,
        //   avyId: this.formData.avyId,
        // }).then(res => {
        //   this.$message({
        //     message: '收回完成',
        //     type: 'success'
        //   });
        // })
        this.$api.meeting
          .cbChBack({ ids: ids.join(","), draftTime: this.formdata.draftTime })
          .then((res) => {
            this.$message({
              message: "承办收回完成",
              type: "success",
            });
          });
      } else {
        this.$api.meeting.cheHuiCy({ ids: ids.join(",") }).then((res) => {
          this.loadData();
          this.$message({
            message: "传阅收回成功",
            type: "success",
          });
        });
      }
    },
    hyAdd() {
      this.form = {};
      this.selectDept = [];
      this.dialogFormVisible = true;
      this.isAddOrEdit = false;
    },
    hyConWay() {
      if (this.isAddOrEdit == false) {
        //新增
        this.hyCon();
      } else {
        //编辑修改
        this.hyConUpdate();
      }
    },
    // 添加会议内容
    hyCon() {
      if (this.form.topic && this.form.joinDept) {
        if (this.id) {
          this.form.orderId = this.id;
          this.$api.meeting.hyConSave(this.form).then((res3) => {
            this.fileId1 = res.result.id;
            this.form.attachList &&
              this.form.attachList.map((item) => {
                attachId.push(item.id);
              });
            this.$api.setSysConfig
              .saveFile({
                id: res.result.id,
                fileId: attachId.join(","),
                fileType: "10001",
              })
              .then((res) => {});
            this.hyConList1();
          });
          // this.dialogFormVisible = false
        } else {
          // if (this.formData.title && this.formData.isFeedback) {
          this.formData.typeFlag = "0"; //0 大表单意见字段不清空
          this.$api.meeting.zfAddData(this.formData).then((res3) => {
            this.id = res3.result.id;
            this.form.orderId = this.id;
            this.$api.meeting.hyConSave(this.form).then((res2) => {
              // this.hyConList1()
            });
            this.$intent.replace(this, {
              name: "adminZfDetail",
              query: { leixing: this.formData.type, id: this.id,numYear:this.numyear },
            });
            // this.setTodoItem(res3.result)
            this.loadData();
          });
          // } else {
          //   this.$message({
          //     message: '会议内容添加失败，请先填写表单中的必填项',
          //     type: 'warning'
          //   });
          // }
        }
        this.dialogFormVisible = false;
      } else {
        this.$message({
          message: "会议议题或参会部门不能为空",
          type: "warning",
        });
      }
    },
    // 会议内容列表查询
    hyConList1() {
      this.$api.meeting.hyConList({ id: this.id }).then((res) => {
        this.listArr = res.list;
        this.formData.attchmentFileInfo = [];
        this.listArr &&
          this.listArr.map((item) => {
            this.$api.setSysConfig
              .getTextemList({ id: item.id, fileType: "10001",numYear:this.numyear })
              .then((res1) => {
                this.$set(item, "attachList", res1.data);
                this.formData.attchmentFileInfo.push(...item.attachList);
              });
          });
        // this.listArr.forEach((item, index) => {
        //   .
        //   this.formData.attchmentFileInfo.push(...item.attachList);
        // });
      });
    },
    // 会议内容更新
    hyConUpdate() {
      this.$api.meeting.hyConUpdate(this.form).then((res) => {
        // this.$api.meeting.hyConUpdate(this.form1).then(res => {
        this.hyConList1();
      });
      this.dialogFormVisible = false;
      // this.dialogFormVisible1 = false
    },
    hyBtnClick(str, item) {
      switch (str) {
        case "编辑":
          // this.form1 = item
          // this.dialogFormVisible1 = true
          this.form = item;
          this.fileId1 = this.form.id;
          let idArr = [];
          let nameArr = [];
          this.selectDept = [];
          nameArr = this.form.joinDept.split(",");
          idArr = this.form.joinDeptId.split(",");
          // this.form.
          idArr.forEach((item, index) => {
            let obj1 = {};
            obj1.id = item;
            obj1.unitName = nameArr[index];
            // ids.push(item.id)
            // names.push(item.unitName)
            this.selectDept.push(obj1);
          });
          // this.form.joinDept = names.join(',')
          // this.form.joinDeptId = ids.join(',')
          //     console.log(888999, this.form)
          this.dialogFormVisible = true;
          this.isAddOrEdit = true;
          //获取会议内容附件
          this.$api.setSysConfig
            .getTextemList({
              id: item.id,
              fileType: "10001",
              numYear:this.numyear
            })
            .then((res) => {
              this.$nextTick(() => {
                this.$set(this.form, "attachList", res.data);
                this.uploadConfig1.filesHas = this.form.attachList;
              });
            });
          break;
        case "删除":
          this.$api.meeting
            .hyConDel({ orderId: this.id, id: item.id })
            .then((res) => {
              this.hyConList1();
              tihs.selectDept = [];
            });
          break;
        // case '增发':

        //   break;
      }
    },
    //常用批语
    showWriteList(type) {
      this.clickTypes = type;
      this.appendWriteDialog = true;
      // this.$nextTick(() => {
      //   this.$refs.writelist.openDialog();
      // });
    },
    //常用批语
    writelistvalue(data) {
      switch (this.clickTypes) {
        case "qianfa":
          this.$set(
            this.formData,
            "signIdea",
            this.formData.signIdea ? this.formData.signIdea + data : data
          );
          break;
        case "chuli":
          console.log(data, this.clickTypes);
          this.$set(
            this.formData,
            "examineIdea",
            this.formData.examineIdea ? this.formData.examineIdea + data : data
          );
          break;
      }
    },
    getHuanJie() {
      // 区分制发   与    承办
      this.$api.meeting
        .getHuanJie({ id: this.id, typeFlag: "0", model: this.formData.model })
        .then((res) => {
          this.huanJieMessage = res.Fields;
          // console.log(99999, this.huanJieMessage)
          this.setConfig();
          // this.setFormConfig()
        });
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ); //必填控制域
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); //不可编辑控制域
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ); //按钮
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.huanJieMessage.editedIdeaFields,
        this.huanJieMessage.editedIdeaFieldsBycondition
      ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //必填意见域
      // console.log(454545, this.editedIdeaFields, typeof (this.editedIdeaFields.qfyj))
      this.rules = {
        isFeedback: [
          { required: true, message: "不能为空", trigger: "change" },
        ],
        title: [
          {
            required: this.requiredFields.title,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        // tel: [{ required: this.requiredFields.tel, message: '不能为空', trigger: 'blur' }],
        // draftDate: [{ required: this.requiredFields.draftDate, message: '不能为空', trigger: 'blur' }],
        // maindept: [{ required: this.requiredFields.maindept, message: '不能为空', trigger: 'change' }],
        // wordBody: [{ required: this.requiredFields.wordBody, message: '不能为空', trigger: 'blur' }],
        signIdea: [
          {
            required: this.requiredIdeaFields.qfyj,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        cyIdea: [
          {
            required: this.requiredIdeaFields.cyyj,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        // tel1: [{ required: this.requiredFields.tel, message: '不能为空', trigger: 'blur' }],
        // creator1: [{ required: this.requiredFields.creator, message: '不能为空', trigger: 'blur' }],
        // draftDate1: [{ required: this.requiredFields.draftDate, message: '不能为空', trigger: 'blur' }],
        // maindept1: [{ required: this.requiredFields.maindept, message: '不能为空', trigger: 'blur' }],
        // wordBody1: [{ required: this.requiredFields.wordBody, message: '不能为空', trigger: 'blur' }]
      };
      if (
        process.env.NODE_ENV == "production" &&
        this.readFields.wordBody &&
        this.formData.type != "本部会议通知"
      ) {
        setTimeout(() => {
          this.$refs.ue.setDsabled();
        }, 1000);
      }
    },
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
      files.forEach((item) => {
        this.formData.attachs.push(item.id);
      });
      this.formData.attachid = this.formData.attachs.join(",");
      this.$forceUpdate();
    },
    fileList1(files) {
      if (this.form.attachList && this.form.attachList.length) {
        this.form.attachList.push(...files);
      } else {
        this.form.attachList = files;
      }
      if (!this.form.attachs) {
        this.form.attachs = [];
      }
      files.forEach((item) => {
        this.form.attachs.push(item.id);
      });
      this.form.attach = this.form.attachs.join(",");
      this.$forceUpdate();
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n - 1].id,
          sort: this.formData.attchmentFileInfo[n].sort,
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n - 1].sort,
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n - 1
      ];
      this.formData.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then((res) => {});
    },
    downRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n + 1].id,
          sort: this.formData.attchmentFileInfo[n].sort,
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n + 1].sort,
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n + 1
      ];
      this.formData.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then((res) => {});
    },
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        this.$api.setSysConfig
          .deleFile({
            id: id,
          })
          .then((res) => {
            if (res && res.code == "SUCCESS") {
              this.formData.attchmentFileInfo.splice(n, 1);
              this.$forceUpdate();
              this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
              this.$message({
                type: "success",
                message: "删除成功",
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
          "A0846C071"
        )
        .then((res) => {
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
                duration: 500,
              });
            }
          }
        });
    },
    // 本部会议内容附件上传下载排序
    upRow1(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.form.attachList[n - 1].id,
          sort: this.form.attachList[n].sort,
        },
        {
          id: this.form.attachList[n].id,
          sort: this.form.attachList[n - 1].sort,
        }
      );
      midObj = this.form.attachList[n];
      this.form.attachList[n] = this.form.attachList[n - 1];
      this.form.attachList[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then((res) => {});
    },
    downRow1(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.form.attachList[n + 1].id,
          sort: this.form.attachList[n].sort,
        },
        {
          id: this.form.attachList[n].id,
          sort: this.form.attachList[n + 1].sort,
        }
      );
      midObj = this.form.attachList[n];
      this.form.attachList[n] = this.form.attachList[n + 1];
      this.form.attachList[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then((res) => {});
    },
    deleteRow1(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        this.$api.setSysConfig
          .deleFile({
            id: id,
          })
          .then((res) => {
            if (res && res.code == "SUCCESS") {
              this.form.attachList.splice(n, 1);
              this.uploadConfig1.filesHas = this.form.attachList;
              this.$forceUpdate();
              this.$message({
                type: "success",
                message: "删除成功",
              });
            }
          });
      });
    },
    downFile1(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          "A0846C071"
        )
        .then((res) => {
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
                duration: 500,
              });
            }
          }
        });
    },
  },
  activated() {},
  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    // this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
    // this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    // this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    // this.$nextTick(() => {
    //   document.querySelector("#bank_dispach_content").addEventListener("scroll", this.onScroll);
    // });
    // window.addEventListener("scroll", this.onScroll, true);
  },
  updated() {},
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      // this.leixing = this.$route.query.leixing
      // this.formData
      this.loadData();
      // this.hyIdeaList1()
      // if (this.leixing == '本部会议通知') {
      //   this.hyConList1()
      // }
    } else {
      // this.formData.currentNode='起草'
      const type = this.$route.query.type;
      let tt = this.$route.query.deptDetail
        ? JSON.parse(this.$route.query.deptDetail).currUnitName +
          " " +
          JSON.parse(this.$route.query.deptDetail).humanName
        : "";
      // const maindept = this.$route.query.maindept
      // const maindeptId = this.$route.query.maindeptId
      // this.formData.maindept = maindept
      // this.formData.maindeptId = maindeptId
      // this.formData.draftDepartment = maindept
      // this.formData.draftDepartmentId = maindeptId

      switch (type) {
        case "CN012":
          this.formData.type = "系统会议通知";
          this.formData.model = "CN012";
          break;
        case "CN013":
          this.formData.type = "本部会议通知";
          this.formData.model = "CN013";
          break;
        case "CN095":
          this.formData.type = "部门会议通知";
          this.formData.model = "CN095";
          break;
        case "CN015":
          this.formData.type = "培训会议通知";
          this.formData.model = "CN015";
          break;
      }
      // this.getHuanJie();
    }
    // if (this.id) {
    //   this.hyIdeaList1()
    // }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
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
.adminZfDetail {
  // background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
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
  .bank_dispach_content {
    width: 100%;
    height: auto;
  }
  .process_content {
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f60;
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

    .editor_box {
      height: 500px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 120px;
        color: #606266;
        font-size: 14px;
      }
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
.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.con-left {
  float: left;
  width: 80%;
  border-right: 1px solid #ccc;
  .clear-fix{
    border-bottom: 1px solid #ccc;
  }
  .clear-fix:last-of-type{
    border:none;
  }
  .con-left-p1 {
    width: 12%;
    min-height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    border: 0;
  }

  .con-left-p2 {
    width: 88%;
    min-height: 30px;
    line-height: 30px;
    float: left;
    border-left: 1px solid #ccc;
  }
  .bottom-none {
    border-bottom: 0;
  }
}
.con-right {
  float: left;
  width: 20%;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.adviceInfo {
  position: absolute;
  width: 95%;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.pad_lr10 {
  padding: 0 10px;
}
.chuanyue1 {
  border-bottom: 1px solid #ccc;
}
.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  height: 50px;
  line-height: 50px;
  float: left;
  border-right: 1px solid #ccc;
  text-align: center;
}
.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
.par {
  position: relative;
  .par-child {
    position: absolute;
    top: 30px;
  }
}
/deep/.radio-form .el-radio {
  margin: 10px;
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
    .numName {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 20px;
    }
    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
.tree_w1 {
  height: 100px;
  padding: 0;
  // overflow: scroll;
  margin: 0;
}
</style>
