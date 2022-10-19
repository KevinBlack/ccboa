/**
* create by zx on 2020/7/29 14:16
* 类注释：制发已办、办结详细信息
* 备注：
*/
<template>
  <div class="zfDoneDetail">
    <div id="meetzhifa" class="tablePrint">
      <el-row>
        <h1 class="title-h1">{{formData.draftOrgan}}{{formData.draftDepartment}}{{tempType}}</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
      >
        <tbody>
          <tr style="height: 32px;">
            <td
              style="width:20%;text-align:center;vertical-align:middle"
            >{{formData.type=="培训会议通知"?'培训名称':'会议名称'}}</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.title}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle;">主办部门</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle;"
              colspan="2"
            >{{formData.maindept}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">拟稿人</td>
            <td style="width:30%;text-align:left;vertical-align:middle">{{formData.authorCn}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle;">联系电话</td>
            <td style="width:40%;text-align:left;vertical-align:middle" colspan="2">{{formData.tel}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">拟稿日期</td>
            <td style="width:30%;text-align:left;vertical-align:middle">{{formData.draftDate}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type!='系统会议通知'">
            <td
              style="width:20%;text-align:center;vertical-align:middle"
            >{{formData.type=="培训会议通知"?'培训时间':'会议时间'}}</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.hyTime}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type!='系统会议通知'">
            <td
              style="width:20%;text-align:center;vertical-align:middle"
            >{{formData.type=="培训会议通知"?'培训地点':'会议地点'}}</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.hyAdress}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">主持人</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.host}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'||formData.type=='系统会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">联合单位</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.unitdept}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">出席</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.attend}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">列席</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.attendance}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">摘要</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.summary}}</td>
          </tr>
          <!-- 本部会议内容打印 -->
          <tr style="height: 32px;" v-for="item in listArr" :key="item.id">
            <td style="width:20%;text-align:center;vertical-align:middle;">会议议题</td>
            <td style="width:40%;text-align:left;vertical-align:middle" colspan="2">{{item.topic}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">参会部门</td>
            <td style="width:30%;text-align:left;vertical-align:middle">{{item.joinDept}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type!='本部会议通知'&&formData.type!='部门会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">委托承办单位</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.entrustUnit}}</td>
          </tr>
          <tr style v-if="formData.type!='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">内容</td>
            <td style="text-align:left" colspan="4">
              <div v-html="formData.wordBody"></div>
            </td>
          </tr>
          <tr style="min-height: 140px;">
            <td style="width:20%;text-align:center;vertical-align:middle">签发意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in signIdeaList" :key="item.id">
                <div class="p1">{{item.opinion}}</div>
                <div class="p2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div class="date">{{item.date}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr style="min-height: 280px;">
            <td style="width:20%;text-align:center;vertical-align:middle">审核意见</td>
            <td colspan="4">
              <div class="piece" v-for="item in examineIdeaList" :key="item.id">
                <div class="text1">{{item.opinion}}</div>
                <div class="text2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div>{{item.date}}</div>
                </div>
              </div>
            </td>
          </tr>

          <tr style="min-height: 280px;">
            <td style="width:20%;text-align:center;text-align:center;vertical-align:middle">传阅意见</td>
            <td colspan="4">
              <div class="chuanYue" v-for="item in cyIdeaList" :key="item.id">
                <div class="chuanYue1">{{item.opinion}}</div>

                <div class="chuanYue2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div>{{item.date}}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="headerClick">
      <div class="right">
        <el-button
          plain
          class="bank_grid_comtent_active"
          @click="buttonClick('关闭')"
          style="margin-right: 10px"
        >关闭</el-button>
        <span v-if="!formData.finishTime && !isAuthorizeOthers">
           <el-button
            class="bank_grid_comtent_active"
            v-if="formData.isFeedback=='0'&&signIdeaList && signIdeaList.length!=0&&child=='true'"
            plain
            @click="buttonClick('查看报名表')"
          >查看报名表</el-button>
           <el-button
            class="bank_grid_comtent_active"
            plain
            @click="buttonClick('传阅')"
            v-if="signIdeaList.length>0"
          >传阅</el-button>
          <el-button
            class="bank_grid_comtent_active"
            v-if="formData.wyPle"
            @click="buttonClick('传阅收回')"
          >传阅收回</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('查看流程')">查看流程</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('打印处理单')">打印处理单</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('收藏')">收藏</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('操作指南')">操作指南</el-button>

          <!-- 判断是否允许收回，isReadflag 为 0 时允许收回， 为 1 时 不允许收回  -->
          <el-button v-if="isLastHandler && formData.isReadflag == '0'" class="bank_grid_comtent_active" plain @click="buttonClick('收回')">收回</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('催办')">催办</el-button>


          <!-- <el-button plain @click="buttonClick('查看传阅记录')" v-if="signIdeaList.length>0">查看传阅记录</el-button> -->
        </span>
        <span v-else>
          <!-- <el-button plain @click="buttonClick('归档')">归档</el-button> -->
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('查看流程')">查看流程</el-button>
          <el-button
            class="bank_grid_comtent_active"
            v-if="formData.isFeedback=='0'&&signIdeaList && signIdeaList.length!=0&&child=='true'"
            plain
            @click="buttonClick('查看报名表')"
          >查看报名表</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('打印处理单')">打印处理单</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('操作指南')">操作指南</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('收藏')">收藏</el-button>
          <!-- 催办 增加判断，有授权并且未办结时显示 -->
          <el-button v-if="!formData.finishTime && isAuthorizeOthers" class="bank_grid_comtent_active" plain @click="buttonClick('催办')">催办</el-button>
        </span>
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
                <!-- <span>{{formData.creator}}</span> -->
                <span>{{formData.currentNode}}</span>
              </p>
              <p v-if="!formData.finishTime">
                当前处理人：
                <!-- <span>{{formData.creator}}</span> -->
                <span>{{isAuthorizeOthers && formData.beAuthUserName ? formData.beAuthUserName + '(由'+ formData.currentNowName +'授权)' : formData.currentNowName}}</span>
              </p>
            </div>
          </div>
          <h6 class="bank_dispach_file_tit">文件要素</h6>
          <div id="wjys" class="height_90"></div>
          <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训名称" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.title" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议名称" v-else>
                  <el-input v-model="formData.title" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="12">
            <el-form-item label="主办部门">
              <el-input v-model="formData.maindept"></el-input>
            </el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-form-item label="主办部门" prop="maindept" class="par">
                  <!-- select主办部门 -->
                  <!-- <select-org-or-dept @select="selectOrg" :orgOrDept="0"> -->
                  <el-input type="text" readonly="readonly" v-model="formData.maindept" disabled />
                  <!-- </select-org-or-dept> -->
                  <!-- <el-input v-model="formData.maindept"></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿人">
                  <el-input v-model="formData.authorCn" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <el-input v-model="formData.tel" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿日期">
                  <el-input v-model="formData.draftDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训时间" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyTime" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议时间" v-else>
                  <el-input v-model="formData.hyTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训地点" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyAdress" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议地点" v-else>
                  <el-input v-model="formData.hyAdress" disabled></el-input>
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
            <el-row v-if="formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="主持人">
                  <el-input v-model="formData.host" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'||formData.type=='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="联合单位">
                  <el-input v-model="formData.unitdept" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="出席">
                  <el-input v-model="formData.attend" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="列席">
                  <el-input v-model="formData.attendance" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="摘要">
                    <el-input v-model="formData.summary" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item align="right" style="margin-right:5.5%">
                  <el-button @click="hyAdd" disabled>增加</el-button>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="会议内容">
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
                          <div class="con-left-p2">{{item.joinDept}}</div>
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
                      <!-- <div class="con-right">
                    <el-button @click="hyBtnClick(item)">增发</el-button>
                      </div>-->
                    </div>
                  </div>
                </el-form-item>
              </el-row>
            </el-row>
            <el-row v-if="formData.type!='本部会议通知'&&formData.type!='部门会议通知'">
              <el-col :span="24">
                <el-form-item label="委托承办单位">
                  <el-row>
                    <el-col :span="20">
                      <el-input v-model="formData.entrustUnit" disabled></el-input>
                    </el-col>
                    <el-col :span="2">
                      <el-button type="primary" style="float:right" disabled>选择</el-button>
                    </el-col>
                    <el-col :span="2">
                      <el-button type="primary" style="float:right" disabled>删除</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row v-if="formData.type!='本部会议通知'">
          <el-col :span="24">
            <el-form-item label="内容">
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
            <el-form-item label="承办单位" v-if="child=='true'&&entrustUnit&&entrustUnit.length>0">
              <!-- <el-input v-model="entrustUnit" disabled></el-input> -->
              <div>{{entrustUnit}}</div>
            </el-form-item>
            <el-form-item label="参会单位" v-if="child=='true'&&joinmeetDept&&joinmeetDept.length>0">
              <!-- <el-input v-model="joinmeetDept" disabled></el-input> -->
              <div>{{joinmeetDept}}</div>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-form-item label="签发意见" prop="opinionSend">
              <template>
                <el-row v-if="!signIdeaList||signIdeaList.length==0" style="margin-bottom:5px;">
                  <el-col :span="23">
                    <el-input type="textarea" :rows="3" v-model="formData.signIdea" disabled></el-input>
                  </el-col>
                </el-row>
                <el-col :span="23" v-show="signIdeaList.length > 0 ? true : false" class="ideaBorder">
                  <div v-for="item in signIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col class="content-container">
                          <div>{{item.opinion}}</div>
                          <div class="adviceInfo">
                            <span class="pad_lr10">{{item.deptName}}</span>
                            <span>{{item.userName}}</span>
                            <p class="creat_time">{{item.date}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="审核意见" prop="opinionCheck">
              <template>
                <el-row
                  v-if="!examineIdeaList||examineIdeaList.length==0"
                  style="margin-bottom:5px;"
                >
                  <el-col :span="23">
                    <el-input type="textarea" :rows="3" v-model="formData.examineIdea" disabled></el-input>
                  </el-col>
                </el-row>
                <el-col :span="23" v-show="examineIdeaList.length > 0 ? true : false" class="ideaBorder">
                  <div v-for="item in examineIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col class="content-container">
                          <div>{{item.opinion}}</div>
                          <div class="adviceInfo">
                            <span class="pad_lr10">{{item.deptName}}</span>
                            <span>{{item.userName}}</span>
                            <p class="creat_time">{{item.date}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="传阅意见" prop="cyyj">
              <template>
                <el-row style="margin-bottom:5px;">
                  <el-col :span="23">
                    <el-input type="textarea" :rows="3" v-model="formData.cyIdea" :disabled="true"></el-input>
                  </el-col>
                </el-row>
                <el-col :span="23" v-show="cyIdeaList.length > 0 ? true : false" class="ideaBorder">
                  <div v-for="item in cyIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col class="content-container">
                          <div>{{item.opinion}}</div>
                          <div class="adviceInfo">
                            <span class="pad_lr10">{{item.deptName}}</span>
                            <span>{{item.userName}}</span>
                            <p class="creat_time">{{item.date}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="反馈信息">
              <el-row>
                <el-radio-group v-model="formData.isFeedback" @change="change">
                  <el-radio v-model="formData.isFeedback" :label="'0'" disabled>是</el-radio>
                  <el-radio v-model="formData.isFeedback" :label="'1'" disabled>否</el-radio>
                </el-radio-group>
              </el-row>
              <el-row v-if="formData.fkinfo&&formData.fkinfo.length>0">
                <el-col :span="23">
                  <el-input :disabled="true" v-model="formData.fkinfo"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- <el-row v-if="this.formData.type=='系统会议通知'">
          <el-col :span="12">
            <el-form-item label="提醒方式">
              <el-select style="width:100%" v-model="select1.value1" placeholder="请选择">
                <el-option
                  v-for="item in select1"
                  :key="item.value1"
                  :label="item.value1"
                  :value="item.value1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="this.formData.type=='系统会议通知'">
            <el-form-item label="提醒时间">
              <el-select style="width:100%" v-model="select2.value2" placeholder="请选择">
                <el-option
                  v-for="item in select2"
                  :key="item.value2"
                  :label="item.value2"
                  :value="item.value2"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="23">
                <el-form-item label="传阅人员">
                  <el-row>
                    <el-form-item label="未阅">
                      <p
                        :disabled="true"
                        style="border:1px solid #ccc;min-height:30px"
                      >{{formData.wyPle}}</p>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="已阅">
                      <p
                        :disabled="true"
                        style="border:1px solid #ccc;min-height:30px"
                      >{{formData.yyPle}}</p>
                    </el-form-item>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <h6 class="bank_dispach_file_tit" v-if="formData.type!='本部会议通知'">附件</h6>
            <div id="scfj" class="height_90" v-if="formData.type!='本部会议通知'"></div>
            <el-form-item v-if="this.formData.type!='本部会议通知'">
              <el-col :span="23">
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
    <!-- 会议内容更新(增发) -->
    <el-dialog :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="会议议题" :label-width="formLabelWidth">
          <el-input v-model="form1.topic" disabled></el-input>
        </el-form-item>
        <el-form-item label="参会部门" :label-width="formLabelWidth">
          <el-input v-model="form1.joinDept"></el-input>
        </el-form-item>
        <el-form-item label="会议材料" :label-width="formLabelWidth">
          <el-input v-model="form1.file" disabled></el-input>
          <el-button disabled>引入</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="hyConUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart> -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
    <select-person
      :canTab="false"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
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
      @showCompDialog="showCompDialog"
    ></select-person>
    <!-- 传阅 -->
    <treeCofigForCy
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :scircularizeLevel="scircularizeLevel"
      :checkIds="checkIds"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      @showCompDialog="showCompDialogForCy"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForCy>
  </div>
</template>

<script type="text/ecmascript-6">
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import mTable from "@/components/table/tTable";
import { mapGetters, mapActions } from "vuex";
import selectPerson from "components/tree/treeTansun";
import UE from "components/editor/ue.vue";
import exportTable from "../../../minixs/exportTable";
import treeCofigForCy from "@/components/tree/tree-cyTansun";
import beanList from "../../../util/beanList";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
export default {
  name: "zfDoneDetail",
  components: {
    // editor
    shiwuFlow,
    selectPerson,
    UE,
    treeCofigForCy,
    // uploadFileTs
  },
  mixins: [openOrDownLoadFile],
  props: {},
  data() {
    return {
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      isLastHandler: false, // 是否为上一处理人 是 为 true
      tempType: "",
      treeTradeCode: this.$businessCode.swglgg, //人员树交易线
      scircularizeLevel: "1", //传阅常用联系人修改 12.21
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      cyCheckData: [], //选中数据
      isCY: "",
      seletOptionsDataForCy: [],
      // config: {
      //   initialFrameWidth: null,
      //   initialFrameHeight: 350,
      //   toolbars: [[
      //     'fullscreen', 'source', '|', 'undo', 'redo', '|',
      //     'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
      //     'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
      //     'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
      //     'directionalityltr', 'directionalityrtl', 'indent', '|',
      //     'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
      //     'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
      //     'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
      //     'horizontal', 'date', 'time', 'spechars', '|',
      //     'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
      //     'preview', 'searchreplace', 'help', 'drafts'
      //   ]]
      // },
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      // 承办部门
      entrustUnit: "",
      // 参会部门
      joinmeetDept: "",
      // select主办部门
      showTree: false,
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
      checkList: ["行名", "部门", "姓名", "手机"],
      rules: {},
      formData: {
        attchmentFileInfo: [],
        // currentNode: "起草",
        // currentUser: JSON.parse(localStorage.getItem('userInfo')).humanName,
        // draftDate: formatData(new Date().getTime(), "YYYY-MM-DD"),
        // creator: JSON.parse(localStorage.getItem('userInfo')).humanName,
        // draftDepartment: JSON.parse(localStorage.getItem('userInfo')).currUnitName,
        // tel: JSON.parse(localStorage.getItem('userInfo')).telMobile.split(",")[1] ? JSON.parse(localStorage.getItem('userInfo')).telMobile.split(",")[1] : "",
        // // documentNo: "",
        // // isFeedbackMode: "0",
        // type: ''
      },
      child: "false",
      buttonList: [],
      currentUser: JSON.parse(localStorage.getItem("userInfo")).humanName,
      currentUserId: JSON.parse(localStorage.getItem("userInfo")).humanId,
      // select1: [
      //   {
      //     value1: '应用内提醒',
      //     label1: '1',
      //   }
      // ],
      // select2: [
      //   {
      //     value2: '提前一天',
      //     label2: '1',
      //   }
      // ]
      treeData: [], //人员树
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,
      loadingTree: true,
      isAuthorizeOthers: false, // 是否转授权给其他人， true 为转授权不能修改任意内容，false 为 未转授权
    };
  },
  computed: {
    ...mapGetters(["todoItem"]),
  },
  methods: {
    ...mapActions(["setTodoItem"]),
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
    change() {},
    handleEdit(row) {
      console.log("edit", row);
    },
    handleDel(row) {
      console.log("del", row);
    },

    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.$intent.closeWindow(this);
          break;
        case "收回":
          // if (this.signIdeaList.length > 0) {
          //   this.$message({
          //     message: '已有签发意见，不可收回',
          //     type: 'success'
          //   });
          // } else {
          this.$api.meeting
            .zfBack({
              id: this.id,
              avyId: this.formData.avyId,
              oldCurrentNode: this.formData.oldCurrentNode,
            })
            .then((res) => {
              this.$message({
                message: "收回完成",
                type: "success",
              });
              this.$intent.closeWindow(this);
            });
          // }

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
        case "查看报名表":
          //  console.log(88888)
          //  if(this.formData.isFeedback=='0'){
          this.$intent.goNewPage(this, {
            path: "/meeting/clookBaoMing",
            query: { id: this.id, flag: "zf",numYear:this.numyear },
          });
          // }
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/meetingPrint",
            query: { id: this.id,numYear:this.numyear},
          });
          break;
        case "收藏":
          // let deptTableHead = ''
          // deptTableHead = this.formData.draftOrgan + this.formData.draftDepartment + this.formData.type
          // exportTable.getPdf(deptTableHead, this.formData.attchmentFileInfo, "meetzhifa", "A08462002", "biaoti", this)
          // this.formData.wordBody =
          //   process.env.NODE_ENV == "production" &&
          //   this.formData.type != "本部会议通知"
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
                .zfCollect({ id: this.formData.id,numYear:this.numyear})
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
        case "操作指南":
          this.handBook("HYGL");
          break;
        case "催办":
          this.$api.meeting
            .cuiban({ id: this.id, typeFlag: "0" })
            .then((res) => {
              this.$message({
                message: "催办成功",
                type: "success",
              });
            });
          break;
        case "传阅":
          // this.singelCheckF = false;
          // this.offenUse = false;
          // this.loadingTree = true
          // this.dialogTypeNow = 'cy';
          // this.dialogState = true;
          // this.chuanYue();
          this.getTreeDataForCy("cy");
          break;
        case "传阅收回":
          this.cyArr = [];
          this.cyObj = {};
          this.singelCheckF = false;
          this.offenUse = false;
          this.dialogTypeNow = "cysh";
          this.loadingTree = false;
          if (this.formData.wyPle.length == 0) {
            this.$message({ type: "success", message: "暂无未阅人员" });
          } else {
            let nameArr = this.formData.wyPle.split(",");
            let idArr = this.formData.cyToEn.split(",");
            for (let i = 0; i < nameArr.length; i++) {
              this.cyObj = {};
              this.cyObj = {
                name: nameArr[i],
                id: idArr[i],
              };
              this.cyArr.push(this.cyObj);
            }
            this.treeData = this.cyArr;
            this.dialogState = true;
          }

          break;
      }
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      switch (dtype) {
        case "cy":
          this.cy(data);
          break;
        case "cysh":
          this.cysh(data);
          break;
        default:
          break;
      }
    },
    // caozuozhinan () {
    //   this.$post
    //     .postData(
    //       "getAttchment",
    //       JSON.stringify({
    //         function: "getAttchment",
    //         moduleCode: "HYGL"
    //       }),
    //       this.$businessCode.fwbz
    //     )
    //     .then(res => {
    //       console.log("res", res)
    //       if (res && res.success) {
    //         this.getInstFileInfo(this, res.data).then(resF => {
    //           if (resF.state) {
    //             let data = this.$router.resolve({
    //               path: "/openAndSave_WordTs",
    //               query: {
    //                 state: "viewFile",
    //                 id: this.formData.id,
    //                 zhengWenState: 0,
    //                 JYcode: 'A08462002',
    //                 multiTenancyId: '000000iiii',
    //                 relativePath: resF ? resF.filePath : "",
    //                 fileName: resF ? resF.fileName : "",
    //                 showBtns: false
    //               }
    //             });
    //             window.open(data.href, "_blank");
    //           }
    //         });
    //       } else {
    //         this.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "文件不存在",
    //           duration: 1500
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "文件不存在",
    //         duration: 1500
    //       });
    //     });
    // },
    // //获取操作指南文件路径
    // async getInstFileInfo (self, flagFile) {
    //   console.log("-----flagFile--->", flagFile)
    //   var successInfo = { state: false };
    //   let bank_doDownloadFile = { function: "doDownloadFile" }
    //   bank_doDownloadFile.fileName = flagFile.fileName;
    //   bank_doDownloadFile.filePath = flagFile.filePath;
    //   await self.$post
    //     .postData(
    //       "doDownloadFile",
    //       JSON.stringify(bank_doDownloadFile),
    //       self.$businessCode.fwbzfj
    //     )
    //     .then(res => {
    //       console.log("-----res", res)
    //       if (res && res.success) {
    //         successInfo.filePath = res.filePath;
    //         successInfo.fileName = res.fileName;
    //         successInfo.state = true;
    //       } else {
    //         self.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "文件获取失败，请重新上传",
    //           duration: 1500
    //         });
    //         successInfo.state = false;
    //       }
    //     })
    //     .catch(erro => {
    //       self.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "文件获取失败，请联系管理员",
    //         duration: 1500
    //       });
    //       successInfo.state = false;
    //     });
    //   return successInfo;
    // },
    //获取传阅人员列表
    getTreeDataForCy(n) {
      // debugger
      if (n == "cy") {
        this.isCY = true;
        this.dialogTypeForCy = "dosend";
      }
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      switch (n) {
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      this.showCompDialogForCy();

      this.$post
        .postData(
          "selectUserByCirculate", //传阅常用联系人修改 12.21
          JSON.stringify({
            function: "selectUserByCirculate", //传阅常用联系人修改 12.21
            level: this.scircularizeLevel, //传阅常用联系人修改 12.21
            flag: true,
          }),
          this.$businessCode.swgl
        )
        .then((res) => {
          if (res.message == "Loading") {
            this.loadingTreeForCy = true;
          } else {
            this.loadingTreeForCy = false;
          }
          this.treeData = (res && res.data) || [];
          this.treeData[0].disabled = true;
        });
    },
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
          this.checkIds = this.formData.cyToEn
            ? this.formData.cyToEn.split(",")
            : [];
          if (this.cyCheckData.length) {
            newA = [].concat(this.cyCheckData);
            newA.map((item) => {
              //选中的不可操作
              item.disabled = true;
            });
          }
          this.checkData = this.cyCheckData;
          break;
      }
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype) {
      console.log(4666, data);
      // debugger
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = [];
        let oldNames = [];
        let newNames = [];
        let codes = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map((item) => {
            names.push(item.name || item.text);
            if (item.idStr) {
              ids.push(item.idStr);
            }
            that.checkIds.push(item.id);
            if (item.code) {
              codes.push(item.code);
            }
          });
          this.formData.humenCode = codes.join(",");
          console.log(7777777, this.formData.humenCode);
          oldIds = this.formData.cyToEn.split(",");
          oldNames = this.formData.wyPle.split(",");
          // newIds = ids.filter((item) => {
          //   return oldIds.indexOf(item) == -1;
          // })
          newIds = ids;
          newNames = names.filter((item) => {
            return oldNames.indexOf(item) == -1;
          });
          newNames = newNames.join(",");
          newIds = newIds.join(",");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        switch (dtype) {
          case "cy":
            this.formData.currentUser = newNames;
            this.formData.currentUserId = newIds;
            this.cyCheckData = this.checkData;
            break;
        }
        if (!!this.formData.currentUser) {
          this.cy();
        }
      }

      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
    //发传阅
    cy() {
      this.formData.currentNode = "制发";
      this.$api.meeting.sendChuanYue(this.formData).then((res) => {
        this.loadData();
        this.$message({
          message: "传阅成功",
          type: "success",
        });
      });
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(",");
      names = name.split(",");
      ids.map((item, n) => {
        if (!!item) {
          obj.push({
            id: item,
            name: names[n],
          });
        }
      });
      return obj;
    },
    // //获取传阅人员列表
    // chuanYue () {
    //   this.$api.meeting.getCyPerson({}).then(res => {
    //     this.treeData = res.result.data;
    //     this.dialogState = true;
    //   })
    // },
    // //发传阅
    // cy (person) {
    //   let ids = [], names = [], codes = [];
    //   person.forEach(item => {
    //     ids.push(item.id)
    //     names.push(item.name)
    //     codes.push(item.code)
    //   })
    //   this.formData.currentUserId = ids.join(',')
    //   this.formData.currentUser = names.join(',')
    //   this.formData.humenCode = codes.join(',')
    //   this.formData.currentNode = "制发";
    //   this.$api.meeting.sendChuanYue(this.formData).then(res => {
    //     this.loadData()
    //     this.$message({
    //       message: '传阅成功',
    //       type: 'success'
    //     });
    //   })
    // },
    //传阅收回
    cysh(data) {
      let ids = [];
      data.map((item) => {
        ids.push(item.id);
      });
      this.$api.meeting.cheHuiCy({ ids: ids.join(",") }).then((res) => {
        this.loadData();
        this.$message({
          message: "传阅收回成功",
          type: "success",
        });
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
          this.formData.draftDate = res1.meetSendOrderDo.draftDate.split(
            " "
          )[0];

          const userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || '';
          // 判断当前登录人是否为 授权人或者被授权人， 否的话直接 赋值为 false
          // FIXME: 在 2022，0121版本中 集中转授权不上，之后需要上线直接将判断中的 false 去掉
          if (false && this.formData.beAuthHumanCode && (userInfo.humanCode == this.formData.beAuthHumanCode || userInfo.humanId == this.formData.currentUserId)) {
            // 判断是否转授权给其他人
            this.isAuthorizeOthers = (Boolean(this.formData.beAuthHumanCode) || this.formData.beAuthHumanCode === 0) && this.formData.beAuthHumanCode !== userInfo.humanCode ;
          } else {
            this.isAuthorizeOthers = false;
          }

          // 判断是否为上一处理人
          const oldUserCodeArr = this.formData.currentUserOldId ? this.formData.currentUserOldId.split('#').filter(item => item) : [];
          if (oldUserCodeArr && oldUserCodeArr.length > 0) {
            this.isLastHandler = oldUserCodeArr[oldUserCodeArr.length - 1] === userInfo.humanCode;
          }

          // const telArr = res1.meetSendOrderDo.tel.split(',')
          // if (telArr.length == 2) {
          //   this.formData.tel = telArr[1]
          // } else {
          //   this.formData.tel = telArr[0]
          // }
          if (this.formData.type == "培训会议通知") {
            this.tempType = "培训通知";
          } else {
            this.tempType = this.formData.type;
          }
          //获取传阅未阅已选人员
          if (this.formData.cyToEn) {
            this.cyCheckData = this.concatTreeData(
              this.formData.cyToEn,
              this.formData.wyPle
            );
          } else {
            this.cyCheckData = [];
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
          // 将所选的反馈信息返显到页面
          if (
            res1.meetSendOrderDo.returnHtml &&
            res1.meetSendOrderDo.returnHtml.length > 0
          ) {
            let str1 = res1.meetSendOrderDo.returnHtml.split("&")[0];
            this.formData.fkinfo = str1;
          }
          this.signIdeaList = res1.sendList; //签发意见
          this.examineIdeaList = res1.checkList; //处理意见
          this.cyIdeaList = res1.cyList; //传阅意见
          // if (this.formData.isFeedback == '0') {
          //   this.$api.meeting.zflookBmb({})
          //     .then(res => {
          //       console.log(8888)
          //     })
          // }
          // this.getFileList()
          // // 判断是否有子流程
          // this.$api.meeting.isHaveSon({ mainId: this.id }).then(res => {
          //   this.child = res.child
          // });
          if (this.formData.type == "本部会议通知") {
            this.hyConList1();
            // setTimeout(() => {
            //   this.$refs.ue.setUEContent(this.formData.wordBody)
            //   this.$refs.ue.setDsabled()
            // }, 1000)
          }
          if (this.formData.type != "本部会议通知") {
            this.getFileList();
            // this.hyConList1()
            setTimeout(() => {
              this.$refs.ue.setUEContent(this.formData.wordBody);
              this.$refs.ue.setDsabled();
            }, 1000);
          }
        });
    },
    getFileList1(id, index) {
      this.$api.setSysConfig.getTextemList({ id: id,numYear:this.numyear }).then((res) => {
        this.listArr[index].attchmentFileInfo = res.data;
        this.$nextTick(() => {
          this.formData.attchmentFileInfo.push(...res.data);
        });
      });
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
              .then((res) => {
                this.$set(item, "attachList", res.data);
                this.formData.attchmentFileInfo.push(...item.attachList);
              });
          });
      });
    },
    // 会议内容更新
    hyConUpdate() {
      this.$api.meeting.hyConUpdate(this.form1).then((res) => {
        this.hyConList1();
      });
      this.dialogFormVisible1 = false;
    },
    hyAdd() {},
    hyCon() {},
    hyBtnClick(item) {
      // switch (str) {
      // case '增发':
      this.dialogFormVisible1 = true;
      this.form1 = item;
      // break;
      // case '删除':
      //   this.$api.meeting.hyConDel({ orderId: this.id, id: item.id }).then(res => {
      //     this.hyConList1()
      //   })
      //   break;
      // case '增发':
      //   break;

      // }
    },
    // 会议意见列表查询
    // hyIdeaList1 () {
    //   this.signIdeaList = []
    //   this.examineIdeaList = []
    //   this.cyIdeaList = []
    //   this.$api.meeting.hyIdeaList({ orderId: this.id }).then(res => {
    //     // this.listArr = res.list
    //     res.list.forEach(item => {
    //       if (item.TYPE == '0') {
    //         this.signIdeaList.push(item)
    //       } else if (item.TYPE == '1') {
    //         this.examineIdeaList.push(item)
    //       } else {
    //         this.cyIdeaList.push(item)
    //       }
    //     })
    //   })
    // }
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({ id: this.id, fileType: "0",numYear:this.numyear })
        .then((res) => {
          this.$nextTick(() => {
            this.$set(this.formData, "attchmentFileInfo", res.data);
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
              duration: 500,
            });
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
    // if (1) {
    // this.buttonList = [
    //   // { name: "收回", type: "shouhui", show: true },
    //   // { name: "催办", type: "cuiban", show: true },
    //   // { name: "传阅", type: "chuanyue", show: true },
    //   // { name: "传阅收回", type: "cyshouhui", show: true },
    //   // { name: "查看传阅记录", type: "ckcyjl", show: false },
    //   // { name: '查看流程', type: 'ckliucheng', show: true },
    //   // { name: '打印处理单', type: 'dayinchulidan', show: true },
    //   { name: "收回", type: "shouhui", show: true },
    //   { name: "催办", type: "cuiban", show: true },
    //   { name: "查看", type: "chuanyue", show: true },
    //   { name: "传阅收回", type: "cyshouhui", show: true },
    //   { name: "查看传阅记录", type: "ckcyjl", show: false },
    //   { name: '查看流程', type: 'ckliucheng', show: true },
    //   { name: '打印处理单', type: 'dayinchulidan', show: true },
    // ]
    // } else {
    //   this.buttonList = [
    //     { name: '查看流程', type: 'cklc', show: true },
    //     { name: '打印处理单', type: 'dycld', show: true },
    //     { name: '操作指南', type: 'czzn', show: false },
    //     { name: '收藏', type: 'shoucang', show: false },
    //   ]
    // }
    this.id = this.$route.query.id;
    this.leixing = this.$route.query.leixing;
    this.loadData();

    // this.hyIdeaList1()
    // console.log(this.$route.query.type)
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.zfDoneDetail {
  min-height: 1000px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
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
    padding-bottom: 20px;
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
.opinionStyle {
  color: #606266;
  word-break: break-all;
}
.content-container {
  background-color: rgba(228, 231, 237, 0.32);
  border-radius: 4px;
  padding: 4px 6px 0 6px;
  word-break: break-all;
  // font-size: 14px !important;
  // border: 1px solid #e4e7ed!important;
}
.content-container:hover {
  // border: 1px solid #8996af;
}
// .adviceInfo {
//   width: 100%;
//   right: 10%;
//   bottom: 0;
//   text-align: right;
//   color: #606266;
// }
.pad_lr10 {
  // margin: 0 0 0 16px;
  // padding: 0 0 0 10px;
}
.creat_time {
  // position: relative;
  // top: -10px;
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
.tablePrint {
  position: absolute;
  z-index: -999;
}
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}

.piece {
  overflow: hidden;
}
.piece .text1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.piece .text2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.beiZh {
  overflow: hidden;
}
.beiZh .content {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.beiZh .name {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.chuanYue {
  overflow: hidden;
}
.chuanYue .chuanYue1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.chuanYue .chuanYue2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
}
.printTableList {
  width: 94%;
  margin: 0 auto;

  tr {
    height: 32px;
    td {
      width: 12%;
      word-break: break-all;
      // text-align: center;
      // vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  margin-bottom: 20px;
  // line-height: 100px;
}
// .printButton {
//   position: absolute;
//   right: 28%;
//   z-index: 10;
//   top: 6%;
// }
td {
  border: solid #000 1px;
}
.tcont {
  padding-bottom: 5px;
  border-bottom: 1px solid #dac6c5;
}
.tcont:last-child {
  border-bottom: none;
}
.tcont2 {
  text-align: right;
  padding-top: 5px;
  width: 100%;
  height: 30px;
}
.tcont2 > div {
  float: right;
  /* background-color:#F2CACB; */
}
.issueTable {
  height: 100%;
  border-collapse: collapse;
  border: none;
  width: 100%;
}
.issueTable tr:nth-of-type(1) {
  border-top: none;
}
.issueTable tr:last-child {
  border-bottom: none;
}
.issueTable td {
  border: none;
}
.issueTable tr {
  line-height: 25px;
  text-align: center;
  border: solid 1px #000;
  border-left: none;
  border-right: none;
}
.d_flex {
  display: flex;
  // padding-bottom: 20px;
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
  font-size: 14px!important;
  line-height: 20px;
  text-align: right;
}
.ideaBorder{
  border: 1px solid #e4e7ed!important;
}
</style>
