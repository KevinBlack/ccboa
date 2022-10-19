<!--
 * @Author: your name
 * @Date: 2020-09-08 17:52:52
 * @LastEditTime: 2021-10-15 19:32:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\cb\cbDetial.vue
--> 
<template>
  <div v-show="isShowDocument" class="chDetial">
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
            <td style="width:20%;text-align:center;vertical-align:middle">会议名称</td>
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
          <tr v-if="formData.type!='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">内容</td>
            <td style="text-align:left" colspan="4">
              <UE :config="config" id="UE" ref="ue"></UE>
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
            <td style="width:20%;text-align:center;vertical-align:middle">办理意见</td>
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
      <br />
      <table
        v-if="tableData&&tableData.length>0"
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 32px;">
            <td
              v-for="item in tableCols"
              :key="item.prop"
              style=" text-align:center;vertical-align:middle"
            >{{item.label}}</td>
          </tr>
          <tr style="height: 64px;" v-for="item in tableData" :key="item">
            <td
              style="text-align:center;vertical-align:middle"
              v-for="(item1,index) in tableCols"
              :key="index"
            >{{item[item1.prop]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="headerClick">
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button>
        <!-- <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          plain
        >{{item.name}}</el-button>-->
        <template v-if="isAuthorizeOthers">
          <el-button
            class="bank_grid_comtent_active"
            v-for="(item,index) in buttonListAuthorizeOthers"
            @click="buttonClick(item.name)"
            :key="index"
            v-show="buttonListAuthorizeOthers[index].show"
            plain
          >{{item.name}}</el-button>
        </template>
        <template v-else>
          <el-button
            class="bank_grid_comtent_active"
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.name)"
            :key="index"
            v-show="buttonList[index].show"
            plain
          >{{item.name}}</el-button>
        </template>
        
      </div>
    </div>
    <div class="formHeader">
      <div class="shiwuTitle">{{formData.draftOrgan}}{{formData.draftDepartment}}{{tempType}}（参会单）</div>
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
                <span>{{formData.undertakeCurrentlinks}}</span>
              </p>
              <p>
                当前处理人：
                <span>{{isAuthorizeOthers && formData.beAuthUserName ? formData.beAuthUserName + '(由'+ formData.currentNowName +'授权)' : formData.currentNowName}}</span>
              </p>
            </div>
          </div>
          <h6 class="bank_dispach_file_tit">文件要素</h6>
          <div id="wjys" class="height_90"></div>
          <el-form :rules="rules" :model="formData" ref="ruleForm" label-width="120px">
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
              <el-col :span="12">
                <el-form-item label="主办部门">
                  <el-input v-model="formData.maindept" disabled></el-input>
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
              <el-col :span="24">
                <el-form-item label="摘要">
                  <el-input v-model="formData.summary" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-form-item align="right" style="margin-right:5.5%">
                <el-button disabled>增加</el-button>
              </el-form-item>
              <el-row>
                <el-form-item label="会议内容">
                  <div class="box1" v-if="listArr&&listArr.length>0">
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
                    </div>
                  </div>
                </el-form-item>
              </el-row>
            </el-row>
            <el-row v-if="formData.type!='本部会议通知'&&formData.type!='部门会议通知'">
              <el-col :span="24">
                <el-form-item label="委托承办单位">
                  <el-row>
                    <el-col :span="24">
                      <el-input v-model="formData.entrustUnit" disabled></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  class="editor_box"
              style="position:relative;z-index:1"
              v-if="formData.type!='本部会议通知'">
              <el-col :span=24>
                <el-form-item label="内容">
                  <el-row>
                    <el-col :span="24">
                      <UE :config="config" id="UE_2" ref="ue"></UE>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <div
              class="editor_box"
              style="position:relative;z-index:1"
              v-if="formData.type!='本部会议通知'"
            >
              <label>内容</label>
            </div> -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-form-item label="签发意见" prop="signIdea">
              <template>
                <el-row v-if="!(signIdeaList && signIdeaList.length!=0)" style="margin-bottom:5px;">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :rows="3"
                      v-model="formData.signIdea"
                      :disabled="true"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-col v-show="signIdeaList.length > 0 ? true : false" :span="23" class="ideaBorder">
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
            <el-form-item label="办理意见" prop="pbIdea">
              <template>
                <el-row
                  v-if="!editedIdeaFields.pbyj|| !(examineIdeaList && examineIdeaList.length!=0)"
                  style="margin-bottom:5px;"
                >
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formData.pbIdea"
                      :disabled="editedIdeaFields.pbyj || isAuthorizeOthers"
                    ></el-input>
                  </el-col>
                  <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.pbyj && !isAuthorizeOthers">
                    <i class="icon-font el-icon-edit select-chang" @click="showWriteList('chuli')"></i>
                  </el-col>
                </el-row>
                <el-col v-show="examineIdeaList.length > 0 ? true : false" :span="23" class="ideaBorder">
                  <div v-for="item in examineIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col :span="23" class="content-container">
                          <div>{{item.opinion}}</div>
                          <div class="adviceInfo">
                            <span class="pad_lr10">{{item.deptName}}</span>
                            <span>{{item.userName}}</span>
                            <p class="creat_time">{{item.date}}</p>
                          </div>
                        </el-col>
                        <el-col :span="1" style="text-align: right">
                          <i
                            class="el-icon-delete"
                            @click="deleteCurIdea(item.id)"
                            style="font-size:20px;margin-left:10px;cursor:pointer"
                            v-if="item.date==lastOptionTime&&item.userId==localUserId && !isAuthorizeOthers"
                          ></i>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="传阅意见" prop="cyyj">
              <template>
                <el-row v-if="!(cyIdeaList && cyIdeaList.length!=0)" style="margin-bottom:5px;">
                  <el-col :span="23">
                    <el-input type="textarea" :rows="3" v-model="formData.cyIdea" :disabled="true"></el-input>
                  </el-col>
                </el-row>
                <el-col v-show="cyIdeaList.length > 0 ? true : false" :span="23" class="ideaBorder">
                  <div v-for="item in cyIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col :span="23" class="content-container">
                          <div>{{item.opinion}}</div>
                          <div class="adviceInfo">
                            <span class="pad_lr10">{{item.deptName}}</span>
                            <span>{{item.userName}}</span>
                            <p class="creat_time">{{item.date}}</p>
                          </div>
                        </el-col>
                        <el-col :span="1" style="text-align: right">
                          <i
                            class="el-icon-delete"
                            @click="deleteCurIdea(item.id)"
                            style="font-size:20px;margin-left:10px;cursor:pointer"
                            v-if="item.date==lastOptionTime&&item.userId==localUserId"
                          ></i>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="反馈信息">
              <el-radio-group v-model="formData.isFeedback" @change="change">
                <el-radio v-model="formData.isFeedback" :label="'0'" disabled>是</el-radio>
                <el-radio v-model="formData.isFeedback" :label="'1'" disabled>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row style="padding-left:7%;margin:5px 0 20px" v-if="formData.isFeedback=='0'">
              <el-col :span="23">
                <m-table
                  size="medium"
                  :isHandle="false"
                  :sortable="false"
                  :tableData="tableData"
                  :tableCols="tableCols"
                  :isSelection="false"
                  :isIndex="false"
                  :isPagination="false"
                  ref="table1"
                ></m-table>
              </el-col>
            </el-row>
            <el-form-item align="center" v-if="formData.isFeedback=='0' && !isAuthorizeOthers">
              <el-button style="margin:0 10px" @click="buttonClick('选择参会人')">选择参会人</el-button>
              <el-button style="margin:0 10px" @click="buttonClick('新增系统外参会人')">新增系统外参会人</el-button>
              <el-button @click="buttonClick('提交报名表')">提交报名表</el-button>
            </el-form-item>
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
            <el-form-item label="制发单附件" v-if="formData.type!='本部会议通知'">
              <el-col :span="23">
                <div
                  class="tree_w"
                  v-if="formData.attchmentFileInfoZhi&&formData.attchmentFileInfoZhi.length"
                >
                  <el-scrollbar>
                    <div
                      v-for="(item,index) in  formData.attchmentFileInfoZhi"
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
      :fromdata="formData"
      @showCompDialog="showCompDialog"
    ></select-person>
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
    <!--    常用批语-->
    <appendWriteList
      :offenDevices="offenDevices"
      ref="writelist"
      v-if="appendWriteDialog"
      @childsaveselect="writelistvalue"
      @addCommonUse="addCommonUse"
      @deleId="deleteMassage"
    ></appendWriteList>
    <!-- 传阅收回选人 -->
    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
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
    <!-- 选择参会人 -->
    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingles"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
      :selectDept="selectDept"
      :isNeedChild="isNeedChild"
    ></tree-person>
  </div>
</template>

<script type="text/ecmascript-6">
import selectPerson from "components/tree/treeTansun";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import { mapGetters, mapActions } from "vuex";
import minixs from "../../../minixs/index";
import mTable from "@/components/table/tTable";
import cyPersonList from "../../bianhan/components/cyPersonList";
import UE from "components/editor/ue.vue";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "../../../minixs/exportTable";
import appendWriteList from "components/viewFlow/perWrit";
import beanList from "../../../util/beanList";
import treeCofigForCy from "@/components/tree/tree-cyTansun";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import treePerson from "components/tree/sysTreePerson";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "chDetial",
  components: {
    appendWriteList,
    selectPerson,
    shiwuFlow,
    cyPersonList,
    mTable,
    UE,
    treePerson,
    uploadFileTs,
    treeCofigForCy,
  },
  props: {},
  mixins: [minixs, openOrDownLoadFile,viewDraft],
  data() {
    return {
       numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      isShowDocument: false,
      isAuthorizeOthers: false, // 是否授权其他人
      showOrgPer: false,
      isSingles: false,
      isNeedChild: "yes",
      unitClass: 0,
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDept: [],
      tempType: "",
      lastOptionTime: "0", //最新一条意见时间
      localUserId: "", //当前人员ID
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
      //消息提醒
      userId: "", //用户ID（humanId)
      productCode: "huiY", //项目编号（对应字典（提醒项目分类））
      urgentType: "", //紧急程度（部分功能有）
      infoType: "", //类型（模块名称中文（例如 收文，发文））
      infoTitle: "", //业务标题
      infoUser: "", //当前操作人名称
      offenDevices: [], //常用批语展示数据
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth",
      },
      tableData: [],
      toOrSubmit: "baocun", //区分是发送至参会人（to）还是提交报名表（sub）  保存（baocn）
      // 反馈信息
      tempArr: [],
      returnCnArr: [],
      returnEnArr: [],
      isNecessArr: [],
      tableCols: [],
      attendObj: {},
      attendArr: [],
      // 传阅收回选人
      cyData: [],
      showCyPerson: false,
      cyArr: [],
      cyObj: {},
      currentUser: JSON.parse(localStorage.getItem("userInfo")).humanName,
      currentUserId: JSON.parse(localStorage.getItem("userInfo")).humanId,
      signIdeaList: [], //签发意见
      examineIdeaList: [], //办理意见
      cyIdeaList: [], //传阅意见
      id: this.$route.query.id,
      select: "",
      radio: "",
      checkList: ["行名", "部门", "姓名", "手机"],
      rules: {},
      formData: {},
      huanJieMessage: {},
      readFields: {
        authorCn: false,
        draftDate: false,
        title: false,
        tel: false,
        unitdept: false,
        hyTime: false,
        hyAdress: false,
        host: false,
        attend: false,
        attendance: false,
        summary: false,
        entrustUnit: false,
        wordBody: false,
        isFeedback: false,
      }, //不可编辑控制域
      editedIdeaFields: {
        cyyj: true,
        shyj: true,
        qfyj: true,
        pbyj: true,
      }, //可编辑意见域
      requiredIdeaFields: {
        cyyj: false,
        shyj: false,
        qfyj: false,
        pbyj: false,
      }, //必填意见域
      requiredFields: {
        creator: "",
        feedBack: "",
        tel: "",
        draftDate: "",
        title: "",
        mainDept: "",
        wordBody: "",
      }, //必填控制域
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wanchengfasong", show: false },
        { name: "传阅", type: "cy", show: false },
        { name: "传阅收回", type: "cysh", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "查看流程", type: "cklc", show: false },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "cazuozhinan", show: false },
        // { name: '维护', type: 'weihu', show: false },
      ],
      buttonListAuthorizeOthers: [
        { name: "查看流程", type: "cklc", show: true },
        { name: "打印处理单", type: "dycld", show: true },
        { name: "收藏", type: "shoucang", show: true },
        { name: "操作指南", type: "cazuozhinan", show: true },
      ],
      type: "",
      showFlowChart: false,
      flowChartList: [], //流程列表

      treeData: [], //人员树
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      loadingTree: true,
      seletOptionsData: [],
      offenUse: true,
      personIdArr: [],
      personNameArr: [],
      listArr: [],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    getFileList() {
      //制发单附件
      this.$api.setSysConfig
        .getTextemList({ id: this.formData.mainId ,numYear:this.numyear})
        .then((res) => {
          this.$nextTick(() => {
            this.formData.attchmentFileInfo = [];
            this.formData.attchmentFileInfo = res.data;
            this.$set(this.formData, "attchmentFileInfoZhi", res.data);
          });
          console.log(
            "************************ch",
            this.formData.attchmentFileInfoZhi
          );
        });
    },
    //常用批语
    showWriteList(type) {
      this.$api.meeting.perWritingSe({}).then((res) => {
        this.offenDevices = res.data;
      });
      this.clickTypes = type;
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    deleteMassage(data) {
      console.log("data", data);
      this.$api.meeting
        .perWritingDe({
          id: data,
        })
        .then((res) => {
          if (res.code == "SUCCESS") {
            this.$api.meeting.perWritingSe({}).then((res) => {
              this.offenDevices = res.data;
            });
          }
        });
    },
    //新增批语
    addCommonUse(data) {
      console.log("data", data);
      this.$api.meeting
        .perWritingCr({
          hyDnr: data,
        })
        .then((res) => {
          if (res.code == "SUCCESS") {
            this.$api.meeting.perWritingSe({}).then((res) => {
              this.offenDevices = res.data;
            });
          }
        });
    },
    //常用批语
    writelistvalue(data) {
      switch (this.clickTypes) {
        case "chuli":
          this.formData.pbIdea = this.formData.pbIdea
            ? this.formData.pbIdea + data
            : data;
          this.$set(
            this.formData,
            "pbIdea",
            this.formData.pbIdea.length > 500
              ? this.formData.pbIdea.substring(0, 500)
              : this.formData.pbIdea
          );
          break;
      }
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
    getHuanJie() {
      // typeFlag区分制发与承办  0制发,1承办
      this.$api.meeting
        .getHuanJie({ id: this.id, typeFlag: "1", model: this.formData.type })
        .then((res) => {
          this.huanJieMessage = res.Fields;
          this.requiredFields = this.setRequiredFields(
            this.requiredFields,
            this.huanJieMessage.requiredFields
          ); //可编辑控制域
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
          ); //可编辑意见
          this.rules = {
            // isFeedback: [{ required: true, message: '不能为空', trigger: 'change' }],
            // title: [{ required: this.requiredFields.title, message: '不能为空', trigger: 'blur' }],
            // maindept: [{ required: this.requiredFields.maindept, message: '不能为空', trigger: 'change' }],
            // wordBody: [{ required: this.requiredFields.wordBody, message: '不能为空', trigger: 'blur' }],
            // signIdea: [{ required: this.requiredIdeaFields.qfyj, message: '不能为空', trigger: 'blur' }],
            pbIdea: [
              {
                required: this.requiredIdeaFields.pbyj,
                message: "不能为空",
                trigger: "blur",
              },
            ],
            phone: [{ required: true, message: "不能为空", trigger: "blur" }],
          };
        });
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close();
          break;
        case "保存":
          this.save();
          break;
        case "完成并发送":
          this.formData.backType = 0;
          if (this.formData.backFlag1 && !!this.formData.oldUserName) {
            this.$confirm(
              "是否返回" + this.formData.oldUserName + "?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                this.formData.backType = 1;
              })
              .finally(() => {
                if (this.formData.backType == 1) {
                  this.backToOldUser();
                } else {
                  this.toNext();
                }
              });
          } else {
            this.toNext();
          }
          break;
        case "传阅":
          this.getTreeDataForCy("cy");
          break;
        case "操作指南":
          this.handBook("HYGL");
          break;
        case "收藏":
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
                .cbCollect({ id: this.formData.id ,numYear:this.numyear})
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
        case "传阅收回":
          this.$api.meeting.noCyList({ mainId: this.id }).then((res) => {
            if (res.data.length == 0) {
              this.$message({ type: "success", message: "暂无未阅人员" });
            } else {
              res.data.forEach((item) => {
                item.name = item.curUserCn;
              });
              this.cyData = res.data;
              this.showCyPerson = true;
            }
          });
          break;
        case "查看流程":
          this.$api.meeting.cbgetProcess({ id: this.id ,numYear:this.numyear}).then((res) => {
            this.showFlowChart = true;
            this.flowChartList = res.list;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
          break;
        // case "查看报名表":
        //   this.$intent.goNewPage(this, {
        //     path: "/meeting/clookBaoMing",
        //     query: { id: this.id, flag: 'cb' },
        //   });
        //   // this.$api.meeting.cblookBmb({ id: this.id }).then(res => {
        //   //   // this.showFlowChart = true;
        //   //   // this.flowChartList = res.list
        //   // })
        //   break;
        case "选择参会人":
          // this.singelCheckF = false;
          // this.dialogTypeNow = "attend";
          // this.offenUse = false;
          // this.loadingTree = true;
          // this.treeData = [];
          // this.toAttend();
          this.showOrgPer = true;
          break;
        // case "发送至参会人":
        //   this.toOrSubmit = 'to'
        //   if (this.tableData.length < 1) {
        //     this.$message({
        //       message: '请添加参会人',
        //       type: 'success'
        //     });
        //     return
        //   }
        //   // this.singelCheckF = false;
        //   // this.dialogTypeNow = 'attend';
        //   // this.offenUse = false;
        //   // this.loadingTree = true
        //   // this.toAttend();
        //   break;
        case "办结":
          this.$confirm("确定要办结吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.formData.typeFlag = "1";
            // this.formData.isUp = this.formData.undertakeDepartmentId;
            this.formData.currentNode = "办结";
            this.$api.meeting.cbUpdateData(this.formData).then((res) => {
              this.$message({
                message: "办结成功",
                type: "success",
              });
              this.$intent.closeWindow(this);
            });
          });
          break;
        case "提交报名表":
          let isFlag = false;
          if (this.tableData.length > 0) {
            this.tableData.forEach((item) => {
              if (this.checkPhone(isFlag, item.phone)) {
                isFlag = true;
              }
            });
            console.log(7777, isFlag);
            if (!isFlag) {
              this.toOrSubmit = "sub";
              this.save();
              // this.$intent.closeWindow(this);
            } else {
              this.$message({
                message: "联系电话不可以输入字母、汉字和空格",
                type: "warning",
              });
            }
          } else {
            this.$message({
              message: "请选择参会人",
              type: "warning",
            });
          }
          break;
        case "打印处理单":
          this.attendInfo();
          this.formData.typeFlag = "0";
          this.$api.meeting.cbUpdateData(this.formData).then((res) => {
            this.$intent.goNewPage(this, {
              path: "/meetingChPrint",
              query: { id: this.id ,numYear:this.numyear},
            });
          });

          break;
        case "新增系统外参会人":
          let newArr = [];
          newArr = this.tableCols;
          let obj1 = {};
          newArr.forEach((item1, index1) => {
            obj1[item1.prop] = "";
          });
          this.tableData.push(obj1);
          break;
      }
    },
    checkPhone(isFlag, value, callback) {
      let isTel = true,
        isPhone = true,
        isEmpty = true;
      const reg = /[A-Za-z]/g; //字母
      const reg1 = /[\u4e00-\u9fa5]/g; //汉字
      const reg2 = /\s/g; //空格
      console.log(
        value.search(reg) != -1,
        value.search(reg1) != -1,
        value.search(reg2) != -1
      );
      if (value.search(reg) != -1) {
        isTel = false;
      }
      if (value.search(reg1) != -1) {
        isPhone = false;
      }
      if (reg2.test(value)) {
        isEmpty = false;
      }
      if (!isTel || !isPhone || !isEmpty) {
        return (isFlag = true);
      }
    },
    close() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: (action) => {
          if (action === "confirm") {
            //点是
            this.toOrSubmit == "baocun";
            this.save();
            this.$intent.closeWindow(this);
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        },
      });
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      // console.log("-------->", data, status, type, params, dtype)
      this.dialogState = false;
      switch (dtype) {
        case "next":
          this.next(data[0], params);
          break;
        case "cy":
          this.cy(data);
          break;
        case "attend":
          this.attend(data);
          break;
        default:
          break;
      }
    },
    messageWarn(userId) {
      this.$api.meeting
        .infoRemind({
          pcUrl: "meeting/chDetial?id=" + this.formData.id,
          instId: this.formData.id,
          userId: userId, //用户ID（humanId)
          productCode: this.productCode, //项目编号（对应字典（提醒项目分类））
          urgentType: this.urgentType, //紧急程度（部分功能有）
          infoType: this.infoType, //类型（模块名称中文（例如 收文，发文））
          infoTitle: this.infoTitle, //业务标题
          infoUser: JSON.parse(localStorage.getItem("userInfo")).humanName, //当前操作人名称
        })
        .then((res) => {})
        .catch((err) => {});
    },
    backToOldUser() {
      // this.formData.isUp = this.formData.undertakeDepartmentId;
      this.formData.typeFlag = "1"; //1 清空大表单意见   0 不清空
      this.formData.nextAvyId = this.formData.supNodeCode;
      this.$api.meeting
        .cbUpdateData(this.formData)
        .then((res) => {
          this.$message({
            message: "发送成功",
            type: "success",
          });
          this.$intent.closeWindow(this);

          this.messageWarn(this.formData.oldUserId);
        })
        .catch((err) => {
          this.loadData();
        });
    },
    toNext() {
      this.singelCheckF = true;
      this.dialogTypeNow = "next";
      this.offenUse = true;
      // this.dialogType = "dosend"
      this.loadingTree = true;
      this.canTab = false;
      this.checkData = []; //清空选中数据，避免和传阅选中数据混合
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$api.meeting
            .cbgetPerson({
              id: this.id,
              // multiID: this.todoItem.multiID,
              // pcsAvyId: this.todoItem.pcsAvyId,
              // tplNo: this.todoItem.tplNo
            })
            .then((res) => {
              // this.seletOptionsData = res.list
              // this.treeData = res.result;
              // this.treeData = res.result.data;
              if (res.result.message == "Loading") {
                this.loadingTree = true;
              } else {
                this.loadingTree = false;
              }
              let PCSAVYIDs = [];
              this.seletOptionsData = res.list.filter((item) => {
                if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                  PCSAVYIDs.push(item.PCSAVYID);
                  return item;
                }
              });
              this.seletOptionsData = this.shoNextNode(
                this.seletOptionsData,
                this.huanJieMessage.acyNodeNextBount
              );

              this.dialogState = true;
            });
        } else {
          this.$message({
            message: "请填写必填项",
            type: "warning",
          });
        }
      });
    },
    //完成并发送
    next(person, params) {
      this.formData.typeFlag = "1";
      // 消息提醒
      this.userId = String(person.idStr); //用户ID（humanId)
      // this.formData.isUp = this.formData.undertakeDepartmentId;
      this.formData.undertakeHandlePersonIds = person.idStr;
      this.formData.undertakeHandlePerson = person.name;
      // this.setFormWorkFlowData();
      this.formData.nextAvyId = params.id;
      this.formData.undertakeCurrentlinks = params.name;
      this.attendInfo();
      let isFlag = false;
      if (this.tableData.length > 0) {
        this.tableData.forEach((item) => {
          if (this.checkPhone(isFlag, item.phone)) {
            isFlag = true;
          }
        });
        console.log(7777, isFlag);
        if (!isFlag) {
          this.$api.meeting.cbUpdateData(this.formData).then((res) => {
            this.$message({
              message: "发送成功",
              type: "success",
            });
            this.$intent.closeWindow(this);
            //消息提醒
            this.messageWarn(String(person.idStr));
          });
        } else {
          this.$message({
            message: "联系电话不可以输入字母、汉字和空格",
            type: "warning",
          });
        }
      } else {
        this.$api.meeting.cbUpdateData(this.formData).then((res) => {
          this.$message({
            message: "发送成功",
            type: "success",
          });
          this.$intent.closeWindow(this);
          //消息提醒
          this.messageWarn(String(person.idStr));
        });
      }
    },
    // toAttend() {
    //   this.$api.meeting
    //     .cbgetPerson({
    //       id: this.id,
    //     })
    //     .then((res) => {
    //       this.dialogState = true;
    //       this.$nextTick(() => {
    //         this.seletOptionsData = res.list;
    //       });
    //     });
    // },
    getperList(perList) {
      this.personIdArr = [];
      this.personNameArr = [];
      perList &&
        perList.map((item) => {
          this.personIdArr.push(item.deptHumanId);
          this.personNameArr.push(item.perName);
        });
      let newArr = [];
      newArr = this.tableCols;
      this.personIdArr.forEach((item, index) => {
        this.$api.meeting.info({ humanId: Number(item) }).then((res) => {
          let result = res.data;
          let obj1 = {};
          newArr.forEach((item1, index1) => {
            obj1[item1.prop] = "";
          });
          obj1.name = this.personNameArr[index];
          obj1.id = item;
          obj1.bankName = result.humanOrgName;
          obj1.deptname = result.highDeptName;
          obj1.humanCode = result.humanCode;
          obj1.humenId = result.humanId.toString();
          if (result.telMobile) {
            let telStr = result.telMobile;
            let newTelStr = telStr.replace(/undefined/g, "");
            // a,         ,     ,a        a,a
            if (newTelStr.length == 1) {
              obj1.phone = "";
            } else {
              if (newTelStr.startsWith(",")) {
                obj1.phone = newTelStr.slice(1);
              } else if (newTelStr.endsWith(",")) {
                obj1.phone = newTelStr.substring(0, newTelStr.length - 1);
              } else {
                obj1.phone = newTelStr;
              }
            }
          } else {
            obj1.phone = "";
          }
          this.tableData.push(obj1);
        });
      });
    },
    //选择参会人
    // attend(person, params) {
    //   console.log("canhuiren", person);
    //   this.personIdArr = [];
    //   this.personNameArr = [];
    //   person.forEach((item) => {
    //     this.personIdArr.push(item.idStr);
    //     this.personNameArr.push(item.name);
    //   });
    //   let newArr = [];
    //   newArr = this.tableCols;
    //   console.log(8989, this.tableCols);
    //   // newArr.pop()
    //   this.personIdArr.forEach((item, index) => {
    //     // console.log(this.personIdArr, "this.personIdArr");
    //     this.$api.meeting.info({ humanId: Number(item) }).then((res) => {
    //       let result = res.data;
    //       let obj1 = {};
    //       newArr.forEach((item1, index1) => {
    //         obj1[item1.prop] = "";
    //       });
    //       obj1.name = this.personNameArr[index];
    //       obj1.id = item;
    //       obj1.bankName = result.humanOrgName;
    //       obj1.deptname = result.humanDeptName;
    //       obj1.humanCode = result.humanCode;
    //       obj1.humenId = result.humanId.toString();
    //       if (result.telMobile) {
    //         let telStr = result.telMobile;
    //         let newTelStr = telStr.replace(/undefined/g, "");
    //         // a,         ,     ,a        a,a
    //         if (newTelStr.length == 1) {
    //           obj1.phone = "";
    //         } else {
    //           if (newTelStr.startsWith(",")) {
    //             obj1.phone = newTelStr.slice(1);
    //           } else if (newTelStr.endsWith(",")) {
    //             obj1.phone = newTelStr.substring(0, newTelStr.length - 1);
    //           } else {
    //             obj1.phone = newTelStr;
    //           }
    //         }
    //       } else {
    //         obj1.phone = "";
    //       }
    //       this.tableData.push(obj1);
    //     });
    //   });
    // },
    // 更新表单数据
    save() {
      this.attendInfo();
      this.formData.typeFlag = "0";
      if (this.toOrSubmit == "sub") {
        //提交报名表
        this.formData.currentNode = "办结";
        this.formData.typeFlag = "1";
        // this.formData.isUp = this.formData.undertakeDepartmentId;
      }
      let that = this;
      console.log(that.formData);
      this.$api.meeting.cbUpdateData(this.formData).then((res) => {
        if (this.toOrSubmit == "baocun") {
          that.loadData();
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "提交报名表成功",
            type: "success",
          });
          this.$intent.closeWindow(this);
        }
      });
    },
    //将表格中参会人信息放到formData里
    attendInfo() {
      if (this.tableData.length > 0) {
        let idArr = [];
        let idArr1 = [];
        this.tableData.forEach((item, index) => {
          if (item.humanCode) {
            idArr.push(item.humanCode); //改为存人的humanCode
          }
          if (item.humenId) {
            idArr1.push(item.humenId); //人的humanId
          }
        });
        this.formData.returnHtmlData = this.tableData;
        this.formData.returnUserId = idArr.join(",");
        this.formData.finalOpinion = idArr1.join(",");
        console.log(565656, this.formData.finalOpinion, this.tableData);
      } else {
        this.formData.returnHtmlData = "";
        this.formData.returnUserId = "";
        this.formData.finalOpinion = "";
      }
    },
    // 删除该行参会人信息
    handleEdit(row) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (i == row.index) {
          this.tableData.splice(i, 1);
          break;
        }
      }
    },
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
          let arr = [];
          let temArr = [];
          arr = this.formData.cyToEn ? this.formData.cyToEn.split(",") : [];
          arr.map((item) => {
            temArr.push(item.split("#")[0]);
          });
          console.log("fancian=========arr", arr);
          this.checkIds = temArr ? temArr : [];
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
        // let codes = [];
        let oldIds1 = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        oldIds1 = this.formData.cyToEn.split(",");
        oldIds1.map((item) => {
          if (item) {
            oldIds.push(item.split("#")[0]);
          }
        });
        if (data.length) {
          data.map((item) => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
            try {
              if (item.idStr.indexOf("#") != -1) {
                if (!oldIds.includes(item.idStr.split("#")[0])) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              } else {
                if (!oldIds.includes(item.idStr.toString())) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              }
            } catch (e) {
              if (item.id.indexOf("#") != -1) {
                if (!oldIds.includes(item.id.split("#")[0])) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              } else {
                if (!oldIds.includes(item.id)) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              }
            }
          });
          this.formData.humenCode = "";
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
      this.formData.currentNode = "参会";
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
      let id1 = [];
      id1 = id.split(",");
      id1.map((item) => {
        ids.push(item.split("#")[0]);
      });
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
    //     ids.push(item.idStr)
    //     names.push(item.name)
    //     codes.push(item.code)
    //   })
    //   this.formData.currentUserId = ids.join(',')
    //   this.formData.currentUser = names.join(',')
    //   this.formData.humenCode = codes.join(',')
    //   this.formData.currentNode = "参会";
    //   this.$api.meeting.sendChuanYue(this.formData).then(res => {
    //     this.loadData()
    //     this.$message({
    //       message: '传阅成功',
    //       type: 'success'
    //     });
    //   })
    // },
    // 传阅收回
    cyPersonList(data) {
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
    getFileList1(id, index) {
      this.$api.setSysConfig.getTextemList({ id: id,numYear:this.numyear }).then((res) => {
        this.listArr[index].attchmentFileInfo = res.data;
      });
    },
    // 会议内容列表查询
    hyConList1() {
      // 参会本部会议查询内容是多传一个字段ch，其他不需要,用来控制议题查看权限
      this.$api.meeting
        .hyConList({
          id: this.formData.mainId,
          ch: this.formData.undertakeDepartmentId,
        })
        .then((res) => {
          this.listArr = res.list;
          this.formData.attchmentFileInfo = [];
          this.listArr &&
            this.listArr.map((item) => {
              this.$api.setSysConfig
                .getTextemList({ id: item.id, fileType: "10001" ,numYear:this.numyear})
                .then((res) => {
                  this.$set(item, "attachList", res.data);
                  this.formData.attchmentFileInfo.push(...item.attachList);
                });
            });
        });
    },
    change() {},
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
    //删除当前登录人最近一条意见
    deleteCurIdea(dataId) {
      this.$api.meeting.hyIdeaDel({ id: dataId }).then((res) => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.loadData();
        }
      });
    },
    loadData() {
      this.$api.meeting
        .cbDetial1({
          id: this.id,
          numYear:this.numyear
        })
        .then((res1) => {
          this.tableData = [];
          this.tableCols = [];
          this.formData = res1.meetCbOrderDo;
          
          const userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || '';
          // 判断当前登录人是否为 授权人或者被授权人， 否的话直接 赋值为 false
          // FIXME: 在 2022，0121版本中 集中转授权不上，之后需要上线直接将判断中的 false 去掉
          if (false && this.formData.beAuthHumanCode && (userInfo.humanCode == this.formData.beAuthHumanCode || userInfo.humanId == this.formData.currentUserId)) {
            // 判断是否转授权给其他人
            this.isAuthorizeOthers = (Boolean(this.formData.beAuthHumanCode) || this.formData.beAuthHumanCode === 0) && this.formData.beAuthHumanCode !== userInfo.humanCode ;
          } else {
            this.isAuthorizeOthers = false;
          }
          this.isRouteFrom(this.formData.beAuthUserName || '')
          

          this.localUserId = this.formData.undertakeHandlePersonIds;
          this.formData.draftDate = res1.meetCbOrderDo.draftDate.split(" ")[0];
          this.formData.isUp = res1.isUpUnitId;
          this.$set(this.formData, "backFlag1", res1.backFlag1);
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
          //消息提醒
          (this.productCode = "huiY"), //项目编号（对应字典（提醒项目分类））
            (this.urgentType = ""), //紧急程度（部分功能有）
            (this.infoType = this.tempType), //类型（模块名称中文（例如 收文，发文））
            (this.infoTitle = this.formData.title), //业务标题
            (this.infoUser = JSON.parse(
              localStorage.getItem("userInfo")
            ).humanName); //当前操作人名称
          this.signIdeaList = res1.sendList; //签发意见
          this.examineIdeaList = res1.pbIdeaList; //办理意见
          this.cyIdeaList = res1.cyList; //传阅意见
          //筛选所有可删除意见最后一条意见添加时间
          try {
            res1.pbIdeaList.filter((item) => {
              this.lastOptionTime =
                this.lastOptionTime > item.date
                  ? this.lastOptionTime
                  : item.date;
            });
          } catch (e) {}
          //筛选所有可删除意见最后一条意见添加时间
          try {
            res1.cyList.filter((item) => {
              this.lastOptionTime =
                this.lastOptionTime > item.date
                  ? this.lastOptionTime
                  : item.date;
            });
          } catch (e) {}
          if (this.formData.isFeedback == "0") {
            this.tempArr = [];
            this.returnCnArr = [];
            this.returnEnArr = [];
            this.isNecessArr = [];
            this.tempArr = this.formData.returnHtml.split("&");
            this.returnCnArr = this.tempArr[0].split(",");
            this.returnEnArr = this.tempArr[1].split(",");
            this.isNecessArr = this.tempArr[2].split(",");
            this.attendArr = [];
            this.returnCnArr.forEach((item, index) => {
              this.attendObj = {};
              this.attendObj.label = item;
              this.attendObj.prop = this.returnEnArr[index];
              this.attendObj.type = "Input";

              if (item == "姓名" || item == "行名" || item == "部门") {
                this.attendObj.formatter = function (row) {
                  if (row.humenId && row.humanCode) {
                    return true;
                  }
                };
              }
              this.tableCols.push(this.attendObj);
            });

            let obj = {
              label: "操作",
              type: "Button",
              align: "center",
              btnList: [
                {
                  label: "删除",
                  size: "medium",
                  type: "default",
                  handle: (row) => {
                    this.handleEdit(row);
                  },
                },
              ],
            };
            this.tableCols.push(obj);
            console.log("jjjl", this.tableCols);
            if (
              this.formData.returnHtmlData &&
              this.formData.returnHtmlData.length > 0
            ) {
              this.tableData = JSON.parse(this.formData.returnHtmlData);
            } else {
              this.tableData = [];
            }
          }
          if (this.formData.type == "本部会议通知") {
            this.hyConList1();
          }
          if (this.formData.type != "本部会议通知") {
            setTimeout(() => {
              this.$refs.ue.setUEContent(this.formData.wordBody);
              this.$refs.ue.setDsabled();
            }, 1000);
            this.getFileList();
          }
          this.getHuanJie();
        });
    },
    // 判断是否为 首页进入并且为授权人
    isRouteFrom (authorizedPersonName) {
      const query = this.$route.query;
      if (query.routeFrom === "home" && this.isAuthorizeOthers) {
        this.$confirm(`此文正在由 ${authorizedPersonName} 处理`, {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          distinguishCancelAndClose: true,
          customClass: "but_model",
          type: "warning"
        }).then(response => {
          this.isShowDocument = true;
        }).catch(action => {
          if (action === "cancel") {
            this.$intent.closeWindow(this)
          } else {
            this.isShowDocument = true;
          }
        })
      } else {
        this.isShowDocument = true
      }
    },
  },
  activated() {},
  created() {
    // 判断是否为首页进入
    // FIXME: 在 2022，0121版本中 集中转授权不上，之后需要上线直接将判断中的 false 去掉
    if (false && this.$route.query.routeFrom === "home") {
      this.isShowDocument = false;
    } else {
      this.isShowDocument = true;
    }
    console.log(898980, this.id);
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.chDetial {
  // background: white;
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
// .pad_lr10 {
//   margin: 0 0 0 16px;
//   padding: 0 0 0 10px;
// }
// .creat_time {
//   position: relative;
//   top: -10px;
// }
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
  width: 100%;
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
.printTableList {
  width: 94%;
  margin: 0 auto;

  tr {
    height: 32px;
    td {
      word-break: break-all;
      width: 12%;
      // text-align: center;
      // vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
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
