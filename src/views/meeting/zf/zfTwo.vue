
/**
* create by zx on 2020/7/29 14:16
* 类注释：制发填写详细信息
* 备注：
*/
<template>
  <div v-show="isShowDocument" class="zfTwo">
    <div id="meetzhifa" v-if="formData.id" class="tablePrint">
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
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button>
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
              <p>
                当前处理人：
                <span>{{isAuthorizeOthers && formData.beAuthUserName ? formData.beAuthUserName + '(由'+ formData.currentNowName +'授权)' : formData.currentNowName}}</span>
              </p>
            </div>
          </div>
          <h6 class="bank_dispach_file_tit">文件要素</h6>
          <div id="wjys" class="height_90"></div>
          <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训名称" prop="title" v-if="formData.type=='培训会议通知'">
                  <el-input
                    v-model="formData.title"
                    :disabled="child=='true'?true:readFields.title"
                  ></el-input>
                </el-form-item>
                <el-form-item label="会议名称" prop="title" v-else>
                  <el-input
                    v-model="formData.title"
                    :disabled="child=='true'?true:readFields.title"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主办部门" prop="maindept" class="par">
                  <!-- select主办部门 -->
                  <el-input type="text" readonly="readonly" v-model="formData.maindept" disabled />

                  <!-- <select-org-or-dept
                @select="selectOrg"
                :orgOrDept="0"
                :orgOrDeptId="unitCode"
                :disabled="readFields.maindept"
              >
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择"
                  v-model="formData.maindept"
                  suffix-icon="el-icon-arrow-down"
                  :disabled="readFields.maindept"
                />
                  </select-org-or-dept>-->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿人" prop="authorCn">
                  <el-input
                    v-model="formData.authorCn"
                    :disabled="child=='true'?true:readFields.authorCn"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="tel">
                  <el-input v-model="formData.tel" :disabled="child=='true'?true:readFields.tel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿日期" prop="draftDate">
                  <el-input
                    v-model="formData.draftDate"
                    :disabled="child=='true'?true:readFields.draftDate"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训时间" v-if="formData.type=='培训会议通知'">
                  <el-input
                    v-model="formData.hyTime"
                    :disabled="child=='true'?true:readFields.hyTime"
                  ></el-input>
                </el-form-item>
                <el-form-item label="会议时间" v-else>
                  <el-input
                    v-model="formData.hyTime"
                    :disabled="child=='true'?true:readFields.hyTime"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训地点" v-if="formData.type=='培训会议通知'">
                  <el-input
                    v-model="formData.hyAdress"
                    :disabled="child=='true'?true:readFields.hyAdress"
                  ></el-input>
                </el-form-item>
                <el-form-item label="会议地点" v-else>
                  <el-input
                    v-model="formData.hyAdress"
                    :disabled="child=='true'?true:readFields.hyAdress"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="主持人">
                  <el-input v-model="formData.host" :disabled="child=='true'?true:readFields.host"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'||this.formData.type=='系统会议通知'">
              <el-col :span="22">
                <el-form-item label="联合单位">
                  <el-input v-model="formData.unitdept" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button
                  @click="showOrgTree=true"
                  type="primary"
                  style="float:right"
                  :disabled="child=='true'?true:readFields.unitdept"
                >选择</el-button>
              </el-col>
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="出席">
                  <el-input
                    v-model="formData.attend"
                    :disabled="child=='true'?true:readFields.attend"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="列席">
                  <el-input
                    v-model="formData.attendance"
                    :disabled="child=='true'?true:readFields.attendance"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="摘要">
                    <el-input
                      v-model="formData.summary"
                      :disabled="child=='true'?true:readFields.summary"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item align="right" style="margin-right:5.5%">
                  <el-button
                    @click="hyAdd"
                    :disabled="child=='true'||formData.currentNode!='起草'?true:false"
                  >增加</el-button>
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
                                    v-for="(item1,index1) in item.attachList"
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
                        <el-button
                          @click="hyBtnClick('编辑',item)"
                          :disabled="child=='true'||formData.currentNode!='起草'"
                        >编辑</el-button>
                        <el-button
                          @click="hyBtnClick('删除',item)"
                          :disabled="child=='true'||formData.currentNode!='起草'"
                        >删除</el-button>
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
                    <el-col :span="20">
                      <el-input v-model="formData.entrustUnit" disabled></el-input>
                    </el-col>
                    <el-col :span="2">
                      <el-button
                        type="primary"
                        style="float:right"
                        @click="getEntrustUnit"
                        :disabled="child=='true'?true:readFields.entrustUnit"
                      >选择</el-button>
                    </el-col>
                    <el-col :span="2">
                      <el-button
                        type="primary"
                        style="float:right"
                        :disabled="child=='true'?true:readFields.entrustUnit"
                        @click="dialogVisibleDel=true"
                      >删除</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
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
              <template>
                <el-row
                  v-if="!editedIdeaFields.qfyj|| !(signIdeaList && signIdeaList.length!=0)"
                  style="margin-bottom:5px;"
                >
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formData.signIdea"
                      :disabled="editedIdeaFields.qfyj || isAuthorizeOthers"
                    ></el-input>
                  </el-col>
                  <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.qfyj && !isAuthorizeOthers">
                    <i class="icon-font el-icon-edit select-chang" @click="showWriteList('qianfa')"></i>
                  </el-col>
                </el-row>
                <el-col :span="23" v-show="signIdeaList.length > 0 ? true : false" class="ideaBorder">
                  <div v-for="item in signIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col :span="24" class="content-container">
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
                <el-col :span="1" v-for="item in signIdeaList" :key="item.id">
                  <el-col style="text-align: right">
                    <i
                      class="el-icon-delete"
                      @click="deleteCurIdea(item.id)"
                      style="font-size:20px;margin-left:10px;cursor:pointer"
                      v-if="item.date==lastOptionTime&&item.userId==localUserId && !isAuthorizeOthers"
                    ></i>
                  </el-col>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="审核意见" prop="examineIdea">
              <template>
                <el-row
                  v-if="!editedIdeaFields.shyj|| !(examineIdeaList && examineIdeaList.length!=0)"
                  style="margin-bottom:5px;"
                >
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formData.examineIdea"
                      :disabled="editedIdeaFields.shyj || isAuthorizeOthers"
                    ></el-input>
                  </el-col>
                  <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.shyj && !isAuthorizeOthers">
                    <i class="icon-font el-icon-edit select-chang" @click="showWriteList('chuli')"></i>
                  </el-col>
                </el-row>
                <el-col :span="23" v-show="examineIdeaList.length > 0 ? true : false" class="ideaBorder">
                  <div v-for="item in examineIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col :span="24" class="content-container">
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
                <el-col :span="1" v-for="item in examineIdeaList" :key="item.id">
                  <el-col style="text-align: right">
                    <i
                      class="el-icon-delete"
                      @click="deleteCurIdea(item.id)"
                      style="font-size:20px;margin-left:10px;cursor:pointer"
                      v-if="item.date==lastOptionTime&&item.userId==localUserId && !isAuthorizeOthers"
                    ></i>
                  </el-col>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="传阅意见" prop="cyIdea">
              <template>
                <el-row
                  v-if="!editedIdeaFields.cyyj|| !(cyIdeaList && cyIdeaList.length!=0)"
                  style="margin-bottom:5px;"
                >
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formData.cyIdea"
                      :disabled="editedIdeaFields.cyyj || isAuthorizeOthers"
                    ></el-input>
                  </el-col>
                  <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.cyyj">
                    <i class="icon-font el-icon-edit select-chang"></i>
                  </el-col>
                </el-row>
                <el-col :span="23" v-show="cyIdeaList.length > 0 ? true : false" class="ideaBorder">
                  <div v-for="item in cyIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col :span="24" class="content-container">
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
                <el-col :span="1" v-for="item in cyIdeaList" :key="item.id">
                  <el-col style="text-align: right">
                    <i
                      class="el-icon-delete"
                      @click="deleteCurIdea(item.id)"
                      style="font-size:20px;margin-left:10px;cursor:pointer"
                      v-if="item.date==lastOptionTime&&item.userId==localUserId"
                    ></i>
                  </el-col>
                </el-col>

              </template>
            </el-form-item>
            <el-form-item label="反馈信息" prop="isFeedback">
              <el-row>
                <el-radio-group
                  v-model="formData.isFeedback"
                  @change="change"
                  :disabled="child=='true'?true:readFields.isFeedback"
                >
                  <el-radio v-model="formData.isFeedback" :label="'0'">是</el-radio>
                  <el-radio v-model="formData.isFeedback" :label="'1'">否</el-radio>
                </el-radio-group>
              </el-row>
              <el-row v-if="formData.fkinfo&&formData.fkinfo.length>0">
                <el-col :span="23">
                  <el-input :disabled="true" v-model="formData.fkinfo"></el-input>
                </el-col>
              </el-row>
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
                  :disabled="signIdeaList && signIdeaList.length!=0"
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
                              v-if="formData.attchmentFileInfo.length>1&&!(signIdeaList && signIdeaList.length!=0)"
                              :disabled="index==0"
                              round
                            >上移</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(index)"
                              v-if="formData.attchmentFileInfo.length>1&&!(signIdeaList && signIdeaList.length!=0)"
                              :disabled="index==formData.attchmentFileInfo.length-1"
                              round
                            >下移</el-button>
                            <el-button
                              v-if="!(signIdeaList && signIdeaList.length!=0)"
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index,item.id)"
                              :disabled="item.disabled"
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
    <el-dialog title="添加或编辑议题" :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="form">
        <el-form-item label="会议议题" :label-width="formLabelWidth">
          <el-input v-model="form.topic" placeholder="请输入会议议题！"></el-input>
        </el-form-item>
        <el-form-item label="参会部门" :label-width="formLabelWidth">
          <!-- 本部选择参会部门 -->
          <el-col :span="22">
            <el-input v-model="form.joinDept" placeholder="请选择参会部门" disabled></el-input>
          </el-col>
          <el-col :span="2">
            <el-button @click="showOrgTree2=true" type="primary" style="float:right">选择</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="会议材料" :label-width="formLabelWidth">
          <el-col :span="23">
            <upload-file-ts :uploadConfig="uploadConfig1" @fileList="fileList1" :fileId="fileId1"></upload-file-ts>
            <div class="tree_w" v-if="form.attachList&&form.attachList.length">
              <el-scrollbar>
                <div v-for="(item,index) in form.attachList" :key="item.id" class="comp_list">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="hyConWay">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 反馈信息 -->
    <el-dialog title="反馈信息" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose1">
      <span>反馈信息</span>
      <span>
        <el-checkbox v-model="checked" @change="isAll">全选</el-checkbox>
      </span>
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
    <!-- 删除委托承办单位提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleDel"
      width="30%"
      :before-close="handleCloseDel"
    >
      <span>确定删除委托承办单位？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDel=false">取 消</el-button>
        <el-button type="primary" @click="deleCb">确 定</el-button>
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
      :outBank="outBank"
      :isSingle="false"
      :orgOrDept="0"
      @orgList="getOrgList1"
    ></org-tree>
    <!-- 完成并发送 -->
    <select-person
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :checkOrg="checkOrg"
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
    <!--    常用批语-->
    <appendWriteList
      :offenDevices="offenDevices"
      ref="writelist"
      v-if="appendWriteDialog"
      @childsaveselect="writelistvalue"
      @addCommonUse="addCommonUse"
      @deleId="deleteMassage"
    ></appendWriteList>
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
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
    <!-- 传阅收回选人 -->
    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
    <!-- 部门会议发子流程选人 -->
    <tree-person
      v-model="showOrgPers"
      :isSingle="isSingles"
      :humanType="humanTypes"
      :unitCode="unitCodes"
      :unitClass="unitClass"
      @orgList="getperLists"
      :selectDept="selectDepts"
      :isNeedChild="isNeedChild"
    ></tree-person>
  </div>
</template>

<script type="text/ecmascript-6">
import beanList from "../../../util/beanList";
import selectPerson from "components/tree/treeTansun";
import appendWriteList from "components/viewFlow/perWrit";
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
import treeCofigForCy from "@/components/tree/tree-cyTansun";
import treePerson from "components/tree/sysTreePerson";
import { truncate } from 'fs';
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "zfTwo",
  components: {
    appendWriteList,
    orgTree,
    selectPerson,
    shiwuFlow,
    cyPersonList,
    uploadFileTs,
    UE,
    treeCofigForCy,
    treePerson,
  },
  mixins: [minixs, openOrDownLoadFile,viewDraft],
  props: {},
  data() {
    return {
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      isShowDocument: false,
      tempType: "",
      lastOptionTime: "0", //最新一条意见时间
      localUserId: "", //当前人员ID
      showOrgPers: false,
      isSingles: false,
      humanTypes: 3,
      unitCodes: "",
      unitClass: 0,
      selectDepts: [],
      isNeedChild: "yes",
      fileId: "",
      fileId1: "",
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
      outBank: false,
      // 本部会议内容附件
      uploadConfig1: {
        formId: "bbMeet",
        filesHas: [],
        isSpecial: 10001,
        id: "",
      },
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      // 委托承办单位
      dialogVisible: false,
      jigou: [],
      bumen: [],
      // 反馈信息
      dialogVisible1: false,
      // 删除委托承办单位弹框
      dialogVisibleDel: false,
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
        block: "center",
        behavior: "smooth",
      },
      flag: false,
      id: "",
      // leixing: '',
      showFlowChart: false,
      flowChartList: [], //流程列表
      select: "",
      radio: "",
      checked: false,
      checkList: ["行名", "部门", "姓名", "手机"],
      formData: {
        signIdea: "",
        examineIdea: "",
        currentNode: "起草",
        draftDate: formatData(new Date().getTime(), "YYYY-MM-DD"),
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        currentNowName: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName +
            " " +
            JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        draftUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        draftUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        maindept: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        maindeptId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
          : "",
        authorCn: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        creator: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        draftDepartmentId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
          : "",
        draftOrgan: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitName
          : "",
        curbank: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitName
          : "",
        curbankId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitId
          : "",
        tel: "",
        departName: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        departId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
          : "",
        type: "",
        isUp: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitId
          : "",
      },
      radio1: "",
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wanchengfasong", show: false },
        { name: "删除此文", type: "shanchuciwen", show: false },
        { name: "发办理单位", type: "fabanlidanwei", show: false },
        { name: "发参会人", type: "fach", show: false },
        { name: "发送", type: "fasong", show: false },
        { name: "增发", type: "zengfa", show: false },
        { name: "承办收回", type: "cbshouhui", show: false },
        { name: "承办催办", type: "cbcuiban", show: false },
        { name: "查看报名表", type: "ckbaomingbiao", show: false },
        { name: "传阅", type: "chuanyue", show: false },
        { name: "传阅收回", type: "cyshouhui", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "查看流程", type: "ckliucheng", show: false },
        { name: "打印处理单", type: "dayinchulidan", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "caozuozhinan", show: false },
        { name: "催办", type: "cuiban", show: false }
      ],
      buttonListAuthorizeOthers: [
        { name: "查看流程", type: "ckliucheng", show: true },
        { name: "打印处理单", type: "dayinchulidan", show: true },
        { name: "收藏", type: "shoucang", show: true },
        { name: "操作指南", type: "caozuozhinan", show: true }
      ],
      currentUser: JSON.parse(localStorage.getItem("userInfo")).humanName,
      // 本部会议内容选参会部门保留原始数据
      selectDept: [],
      // 联合单位保留原始数据
      selectDept1: [],
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
      }, //可编辑意见域
      requiredIdeaFields: {
        cyyj: false,
        shyj: false,
        qfyj: false,
      }, //必填意见域
      requiredFields: {
        creator: "",
        authorCn: "",
        isFeedback: "",
        tel: "",
        draftDate: "",
        title: "",
        maindept: "",
        wordBody: "",
        entrustUnit: "",
      }, //必填控制域
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型
      offenDevices: [], //常用批语展示数据
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
      canTab: false,
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
      isFlag: false, //false表示没有未反馈的参会部门或者是没有子流程可以直接办结，true表示还有未反馈的参会部门办结时需要提示
      //消息提醒
      userId: "", //用户ID（humanId)
      productCode: "huiY", //项目编号（对应字典（提醒项目分类））
      urgentType: "", //紧急程度（部分功能有）
      infoType: "", //类型（模块名称中文（例如 收文，发文））
      infoTitle: "", //业务标题
      infoUser: "", //当前操作人名称
      resObj: {},
      fankuiFlag: false,
      isAuthorizeOthers: false, // 是否转授权给其他人， true 为转授权不能修改任意内容，false 为 未转授权
    };
  },
  computed: {},
  methods: {
    // 反馈信息全选
    isAll() {
      if (this.checked == true) {
        this.checkList = [];
        this.checkList = this.returnCnArr;
      } else {
        this.checkList = ["行名", "部门", "姓名", "手机"];
      }
    },
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
          // this.nochengban()
        })
        .catch((_) => {});
    },
    // 删除委托承办单位
    deleCb() {
      this.$set(this.formData, "entrustUnit", "");
      this.formData.undertakeDepartmentId = "";
      this.dialogVisibleDel = false;
    },
    handleCloseDel(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    nochengban() {
      //取消
      this.dialogVisible = false;
      // this.radio1 = ''
      // this.formData.entrustUnit = ''
      // this.formData.undertakeDepartmentId = ''
    },
    // chengban () {//确定
    //   // this.dialogVisible = false
    //   // this.formData.entrustUnit = ''
    //   // this.formData.undertakeDepartmentId = this.radio1
    //   // console.log('chenbban', this.formData)
    // },
    radioClick(unitCode) {
      let arr = [...this.bumen, ...this.jigou],
        unitName,
        isSyn;
      arr.map((item) => {
        if (item.unitCode == unitCode) {
          console.log("*************委托承办单位", item);
          unitName = item.unitName;
          isSyn = item.isSyn;
        }
      });
      this.$set(this.formData, "entrustUnit", unitName);
      this.$set(this.formData, "isSyn", 0);
      this.$nextTick(() => {
        console.log("***********formData", this.formData);
      });
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
      this.$set(this.formData, "fkinfo", this.arr1.join(","));
      // this.formData.fkinfo = this.arr1.join(',')
      this.formData.returnHtml = this.tempArr.join("&");
      this.dialogVisible1 = false;
    },
    fkback() {
      this.dialogVisible1 = false;
      this.formData.isFeedback = "";
      this.formData.fkinfo = "";
      this.formData.returnHtml = "";
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
        });
    },
    // 联合单位
    getOrgList(org) {
      this.selectDept1 = org;
      this.unitDeptArr = [];
      org.forEach((item) => {
        this.unitDeptArr.push(item.unitName);
      });
      let str = this.unitDeptArr.join(";");
      this.formData.unitdept = str;
    },
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
          this.close();
          break;
        case "保存":
          this.save();
          break;
        case "完成并发送":
          this.formData.backType = 0;
          if (this.formData.backFlag1 && !!this.formData.oldUserName && this.formData.currentNode != "起草") {
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
        case "删除此文":
          this.$confirm("是否删除此文?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.del();
          });
          break;
        case "承办收回":
          this.$api.meeting
            .getCbDeptList({
              id: this.id,
              unitId: this.formData.curbankId,
              curUnitId: JSON.parse(localStorage.getItem("userInfo"))
                .currUnitId,
            })
            .then((res) => {
              if (res.list.length == 0) {
                this.$message({ type: "success", message: "暂无可收回的办理" });
              } else {
                res.list.forEach((item) => {
                  if (item.isCanOrCb == "1") {
                    item.name = item.entrustUnit + " (承办)";
                  } else {
                    item.name = item.joinmeetDept + " (参会)";
                  }
                });
                this.cyData = res.list;
                this.dialogTypeNow = "cb";
                this.showCyPerson = true;
              }
            });
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
              this.dialogTypeNow = "cy";
              this.showCyPerson = true;
            }
          });
          break;
        case "增发":
          // this.offenUse = false;
          // this.singelCheckF = false;
          // this.dialogTypeNow = 'ch';
          // this.sendCanHui();
          this.text = "增发";
          if (
            this.formData.type == "系统会议通知" ||
            this.formData.type == "培训会议通知"
          ) {
            this.showOrgTree1 = true;
            this.outBank = true;
          } else if (this.formData.type == "部门会议通知") {
            this.unitCodes = this.formData.draftDepartmentId;
            this.showOrgPers = true;
          }
          break;
        case "承办催办":
          this.$api.meeting.cbCuibanList({ id: this.id }).then((res) => {
            if (res.result.length == 0) {
              this.$message({ type: "success", message: "暂无可催办的办理" });
            } else {
              res.result.forEach((item) => {
                if (item.isCanOrCb == "1") {
                  item.name = item.entrustUnit + " (承办)";
                } else {
                  item.name = item.joinmeetDept + " (参会)";
                }
              });
              this.cyData = res.result;
              this.dialogTypeNow = "cui";
              this.showCyPerson = true;
            }
          });
          break;
        case "发办理单位":
          if (
            this.formData.type != "本部会议通知" &&
            this.formData.type != "部门会议通知"
          ) {
            this.text = "发办理单位";
            this.showOrgTree1 = true;
          }
          this.outBank = true;
          break;
        case "发参会人":
          this.text = "发参会人";
          this.unitCodes = this.formData.draftDepartmentId;
          this.showOrgPers = true;
          break;
        case "传阅":
          this.getTreeDataForCy("cy");
          break;
        case "办结":
          if (this.isFlag) {
            this.$confirm("参会部门未全部反馈，是否办结？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.toEnd();
            });
          } else {
            this.$confirm("确定要办结吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.toEnd();
            });
          }
          break;
        case "查看报名表":
          if (this.formData.isFeedback == "0") {
            this.$intent.goNewPage(this, {
              path: "/meeting/clookBaoMing",
              query: { id: this.id, flag: "zf",numYear:this.numyear },
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
          this.formData.wordBody =
            process.env.NODE_ENV == "production" &&
            this.formData.type != "本部会议通知"
              ? this.$refs.ue.getUEContent()
              : this.formData.wordBody;
          this.formData.typeFlag = "0"; //0 大表单意见字段不清空
          this.$api.meeting.zfUpdateData(this.formData).then((res) => {
            this.$intent.goNewPage(this, {
              path: "/meetingPrint",
              query: { id: this.id,numYear:this.numyear },
            });
          });
          break;
        case "操作指南":
          this.handBook("HYGL");
          break;
        case "发送":
          let idArr = [];
          let nameArr = [];
          this.listArr.forEach((item, index) => {
            let perIdArr = [];
            let perNameArr = [];
            perIdArr = item.joinDeptId.split(",");
            perNameArr = item.joinDept.split(",");
            perIdArr.forEach((item1, index1) => {
              if (!idArr.includes(item1)) {
                idArr.push(item1);
                nameArr.push(perNameArr[index1]);
              }
            });

            // idArr.push(item.joinDeptId);
            // nameArr.push(item.joinDept);
          });
          this.$api.meeting
            .sendCB({
              id: this.id,
              undertakeDepartmentId: idArr.join(","),
              undertakeDepartment: nameArr.join(","),
              TPLBSNID: "HYGL_BBHYTZCH",
              isCanOrCb: "0", //0 参会   1承办
              typeFlag: 0,
            })
            .then((res) => {
              let errorName = "";
              let noWKName = "";
              let sussName = "";
              errorName = res.errorName
                ? "参会发送失败单位:" +
                  res.errorName +
                  "未设置部门综合代表" +
                  "\n"
                : "";
              noWKName = res.noWKName
                ? "参会发送失败单位:" + res.noWKName + "流程不正确"
                : "";
              sussName = res.sussName
                ? "参会发送成功单位：" + res.sussName + "\n"
                : "";
              this.$alert(sussName + errorName + noWKName, {
                confirmButtonText: "确定",
                type: "warning",
              }).then(() => {
                this.loadData();
              });
            });
          break;
      }
    },
    toEnd() {
      this.formData.typeFlag = "1";
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
        if (this.fankuiFlag) {
          const Cnstr = this.resObj.returnCn;
          const Enstr = this.resObj.returnEn;
          const str = this.resObj.isNecess;
          this.returnCnArr = Cnstr.substr(0, Cnstr.length - 1).split(",");
          this.returnEnArr = Enstr.substr(0, Enstr.length - 1).split(",");
          this.isNecessArr = str.substr(0, str.length - 1).split(",");
          this.checkList = ["行名", "部门", "姓名", "手机"];
          this.dialogVisible1 = true;
        } else {
          this.formData.isFeedback = "1";
          this.formData.returnHtml = "";
          this.formData.fkinfo = "";
          this.checkList = [];
          this.$confirm("该会议未设置参数配置，无法选择是", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {});
        }
      } else {
        this.formData.returnHtml = "";
        this.formData.fkinfo = "";
        this.checkList = [];
      }
    },
    // 保存
    save() {
      this.formData.wordBody =
        process.env.NODE_ENV == "production" &&
        this.formData.type != "本部会议通知"
          ? this.$refs.ue.getUEContent()
          : "";
      this.formData.typeFlag = "0"; //0 大表单意见字段不清空
      if (this.id) {
        // this.formData.model=this.$route.query.flags?this.formData.model:''
        this.$api.meeting.zfUpdateData(this.formData).then((res) => {
          // if (this.$route.query.flags) {
          //   this.$intent.replace(this, {
          //     name: "zfTwo",
          //     query: { id: this.id },
          //   });
          // }
          this.loadData();
        });
      } else {
        this.$api.meeting.zfAddData(this.formData).then((res) => {
          this.id = res.result.id;
          this.fileId = res.result.id;
          if (this.formData.attachid && this.formData.attachid.length > 0) {
            this.createFile();
          }
          this.$intent.replace(this, {
            name: "zfTwo",
            query: { id: this.id },
          });
          this.uploadConfig.id = this.id;
          this.loadData();
        });
      }
      this.$message({
        message: "保存成功",
        type: "success",
      });
    },
    // 起草保存文件
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.formData.attachid,
          fileType: "0",
        })
        .then((res) => {});
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
          // FIXME: 在 2022，0121版本中 集中转授权不上，之后版本需要上线，直接将下一行的 false 去掉
          if (false && this.formData.beAuthHumanCode && (userInfo.humanCode == this.formData.beAuthHumanCode || userInfo.humanId == this.formData.currentUserId)) {
            // 判断是否转授权给其他人
            this.isAuthorizeOthers = (Boolean(this.formData.beAuthHumanCode) || this.formData.beAuthHumanCode === 0) && this.formData.beAuthHumanCode !== userInfo.humanCode ;
          } else {
            this.isAuthorizeOthers = false;
          }
          this.isRouteFrom(this.formData.beAuthUserName || '')
          
          // this.formData.model = "";
          this.$set(this.formData, "backFlag1", res1.backFlag1);
          this.id = res1.meetSendOrderDo.id;
          this.fileId = res1.meetSendOrderDo.id;
          if (this.formData.type == "培训会议通知") {
            this.tempType = "培训通知";
          } else {
            this.tempType = this.formData.type;
          }
          this.localUserId = this.formData.currentUserId;

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
          let isFlagArr = []; //[]表示没有未反馈的参会部门，不为[]表示还有未反馈的参会部门
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
              if (item.isCanOrCb == "0" && !item.finishTime) {
                isFlagArr.push(item);
              }
            });
            if (isFlagArr && isFlagArr.length > 0) {
              this.isFlag = true;
            } else {
              this.isFlag = false;
            }
            this.joinmeetDept = joinmeetDeptArr.join(",");
            this.entrustUnit = entrustUnitArr.join(",");
          } else {
            this.child = "false";
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
          //筛选所有可删除意见最后一条意见添加时间
          try {
            res1.sendList.filter((item) => {
              this.lastOptionTime =
                this.lastOptionTime > item.date
                  ? this.lastOptionTime
                  : item.date;
            });
          } catch (e) {}
          try {
            res1.checkList.filter((item) => {
              this.lastOptionTime =
                this.lastOptionTime > item.date
                  ? this.lastOptionTime
                  : item.date;
            });
          } catch (e) {}
          try {
            res1.cyList.filter((item) => {
              this.lastOptionTime =
                this.lastOptionTime > item.date
                  ? this.lastOptionTime
                  : item.date;
            });
          } catch (e) {}
          if (this.formData.type == "本部会议通知") {
            this.hyConList1();
          }
          this.getHuanJie();
          if (this.formData.type != "本部会议通知") {
            this.getFileList();
            setTimeout(() => {
              this.$refs.ue.setUEContent(this.formData.wordBody);
            }, 1000);
          }
          if (
            process.env.NODE_ENV == "production" &&
            this.formData.type != "本部会议通知" &&
            this.signIdeaList &&
            this.signIdeaList.length > 0
          ) {
            setTimeout(() => {
              this.$refs.ue.setDsabled();
            }, 1000);
          }
          this.getFankui();
        });
    },
    // 会议室预定插入未涉及工作流待办数据获取详情
    // loadData1() {
    //   this.$api.meeting
    //     .zfDetail1({
    //       id: this.id,
    //     })
    //     .then((res1) => {
    //       this.formData.title = res1.meetSendOrderDo.title;
    //       this.formData.hyTime = res1.meetSendOrderDo.hyTime;
    //       this.formData.hyAdress = res1.meetSendOrderDo.hyAdress;
    //       this.getFileList();
    //     });
    // },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id,numYear:this.numyear}).then((res) => {
        this.formData.attchmentFileInfo = res.data;
        this.$forceUpdate();
        this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
      });
    },
    getFileList1(id, index) {
      this.$api.setSysConfig.getTextemList({ id: id,numYear:this.numyear }).then((res) => {
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
      });
    },
    messageWarn(userId) {
      this.$api.meeting
        .infoRemind({
          pcUrl: "meeting/zf/zfTwo?id=" + this.formData.id,
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
      this.formData.typeFlag = "1"; //1 清空大表单意见   0 不清空
      this.formData.nextAvyId = this.formData.supNodeCode;
      this.$api.meeting
        .zfUpdateData(this.formData)
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
    // 完成并发送
    toNext() {
      this.singelCheckF = true;
      this.dialogTypeNow = "next";
      this.dialogType = "dosend";
      this.offenUse = true;
      this.loadingTree = true;
      this.canTab = false;
      this.checkData = []; //清空选中数据，避免和传阅选中数据混合
      if (
        this.formData.type != "本部会议通知" &&
        process.env.NODE_ENV == "production" &&
        !this.$refs.ue.getUEContent()
      ) {
        this.$message({
          type: "error",
          message: "正文内容为空，请输入正文内容",
        });
        return;
      }
      if (
        this.formData.type == "本部会议通知" &&
        this.listArr &&
        this.listArr.length == 0
      ) {
        this.$message({ type: "error", message: "请增加会议内容" });
        return;
      }

      this.$refs["ruleForm"].validate((valid) => {
        this.formData.wordBody =
          process.env.NODE_ENV == "production" &&
          this.formData.type != "本部会议通知"
            ? this.$refs.ue.getUEContent()
            : "";
        // if (
        //   this.formData.type == "本部会议通知" &&
        //   this.requiredIdeaFields.qfyj &&
        //   this.formData.signIdea
        // ) {
        //   valid = true;
        // } else {
        //   valid = false;
        // }
        if (valid) {
          if (
            this.formData.type == "本部会议通知" &&
            this.requiredIdeaFields.qfyj &&
            !this.formData.signIdea
          ) {
            this.$message({
              type: "error",
              message: "请填写签发意见",
            });
            return;
          }
          if (this.formData.id) {
            // if (this.$route.query.flags) {
            //   this.formData.typeFlag = "0";
            //   this.$api.meeting
            //     .zfUpdateData(this.formData)
            //     .then((res) => {
            //       this.$api.meeting
            //         .getPerson({
            //           id: this.id,
            //         })
            //         .then((res) => {
            //           console.log(
            //             "this.huanJieMessage.acyNodeNextBount",
            //             this.huanJieMessage.acyNodeNextBount
            //           );

            //           if (res.result.message == "Loading") {
            //             this.loadingTree = true;
            //           } else {
            //             this.loadingTree = false;
            //           }
            //           //带约束条件判断环节
            //           //过滤重复环节
            //           let PCSAVYIDs = [];
            //           this.seletOptionsData = res.list.filter((item) => {
            //             if (!PCSAVYIDs.includes(item.PCSAVYID)) {
            //               PCSAVYIDs.push(item.PCSAVYID);
            //               return item;
            //             }
            //           });
            //           this.seletOptionsData = this.shoNextNode(
            //             this.seletOptionsData,
            //             this.huanJieMessage.acyNodeNextBount
            //           );
            //           this.dialogState = true;
            //         });
            //     })
            //     .catch((err) => {
            //       this.loadData();
            //     });
            // } else {
            this.$api.meeting
              .getPerson({
                id: this.id,
              })
              .then((res) => {
                console.log(
                  "this.huanJieMessage.acyNodeNextBount",
                  this.huanJieMessage.acyNodeNextBount
                );
                if (res.result.message == "Loading") {
                  this.loadingTree = true;
                } else {
                  this.loadingTree = false;
                }
                //带约束条件判断环节
                //过滤重复环节
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
            // }
          } else {
            this.formData.typeFlag = "0"; //0 大表单意见字段不清空
            this.$api.meeting.zfAddData(this.formData).then((res) => {
              this.id = res.result.id;
              this.uploadConfig.id = this.id;
              this.fileId = res.result.id;
              if (this.formData.attachid && this.formData.attachid.length > 0) {
                this.createFile();
              }
              this.loadData();
              this.$api.meeting
                .getPerson({
                  id: this.id,
                })
                .then((res) => {
                  console.log(
                    "this.huanJieMessage.acyNodeNextBount",
                    this.huanJieMessage.acyNodeNextBount
                  );

                  if (res.result.message == "Loading") {
                    this.loadingTree = true;
                  } else {
                    this.loadingTree = false;
                  }
                  //带约束条件判断环节
                  //过滤重复环节
                  //this.seletOptionsData = res.list;
                  let PCSAVYIDs = [];
                  this.seletOptionsData = res.list.filter((item) => {
                    if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                      PCSAVYIDs.push(item.PCSAVYID);
                      return item;
                    }
                  });
                  console.log(
                    "this.huanJieMessage.acyNodeNextBount",
                    this.huanJieMessage.acyNodeNextBount
                  );
                  this.seletOptionsData = this.shoNextNode(
                    this.seletOptionsData,
                    this.huanJieMessage.acyNodeNextBount
                  );
                  this.dialogState = true;
                })
                .catch((err) => {
                  this.$intent.replace(this, {
                    name: "zfTwo",
                    query: { id: this.id },
                  });
                  this.uploadConfig.id = this.id;
                  this.loadData();
                });
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写必填项",
          });
        }
      });
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      console.log("-------->", data, status, type, params, dtype);
      this.dialogState = false;
      if (!status) {
        return;
      }
      switch (dtype) {
        case "next":
          this.next(data[0], params);
          break;
        // case "cy":
        //   this.cy(data)
        //   break
        // case "ch":
        //   this.ch(data)
        //   break
        // case "cysh":
        //   this.cysh(data)
        //   break
        default:
          break;
      }
    },
    //完成并发送
    next(person, params) {
      console.log(787878999, person, params);
      // 消息提醒
      this.formData.model = "";
      this.userId = String(person.idStr); //用户ID（humanId)
      this.formData.isUp = person.id.split("#")[1];
      this.formData.typeFlag = "1"; //1 清空大表单意见   0 不清空
      this.formData.currentUserId = person.idStr;
      this.formData.currentUser = person.name;
      this.formData.nextAvyId = params.id;
      this.formData.currentNode = params.name;
      this.$api.meeting
        .zfUpdateData(this.formData)
        .then((res) => {
          this.$message({
            message: "发送成功",
            type: "success",
          });
          this.$intent.closeWindow(this);
          //消息提醒
          this.messageWarn(String(person.idStr));
        })
        .catch((err) => {
          this.loadData();
        });
    },
    //获取参会人员树
    // sendCanHui () {
    //   this.$api.meeting.getPerson({
    //     id: this.id,
    //     multiID: this.todoItem.multiID,
    //     pcsAvyId: this.todoItem.pcsAvyId,
    //     tplNo: this.todoItem.tplNo
    //   }).then(res => {
    //     // this.seletOptionsData = res.list
    //     this.treeData = res.result.data;
    //     this.dialogState = true;
    //   })
    // },
    // ch (person) {
    //   let ids = [], names = [];
    //   person.forEach(item => {
    //     ids.push(item.id)
    //     names.push(item.name)
    //   })
    //   this.$api.meeting.sendCB({
    //     id: this.id,
    //     // avyId: this.todoItem.avyId,
    //     // multiID: this.todoItem.multiID,
    //     // pcsAvyId: this.todoItem.pcsAvyId,
    //     // tplNo: this.todoItem.tplNo,
    //     undertakeDepartmentId: ids.join(","),
    //     undertakeDepartment: names.join(","),
    //     TPLBSNID: 'HY_XTHYTZCH',//区分流程   HY_XTHYTZCB  承办      参会 HY_XTHYTZCH
    //     isCanOrCb: '0' //0 参会   1承办
    //   }).then(res => {
    //     this.$message({
    //       message: '发送参会成功',
    //       type: 'success'
    //     });
    //   })
    // },
    //  选择人员
    getperLists(perList) {
      let str1 = "";
      str1 = "HY_BMHYTZCH";
      let person = [];
      let names = [];
      perList &&
        perList.map((item) => {
          person.push(item.deptHumanId);
          names.push(item.perName);
        });
      if (person && person.length > 0) {
        this.$api.meeting
          .sendCh({
            id: this.id,
            undertakeHandlePersonIds: person.join(","),
            undertakeHandlePerson: names.join(","),
            TPLBSNID: str1,
            isCanOrCb: "0", //0 参会   1承办
            typeFlag: 0,
          })
          .then((res) => {
            let errorName = "";
            let noWKName = "";
            let sussName = "";
            let str = "";
            errorName = res.errorName
              ? "参会发送失败单位:" +
                res.errorName +
                "未设置部门综合代表" +
                "\n"
              : "";
            noWKName = res.noWKName
              ? "参会发送失败单位:" + res.noWKName + "流程不正确"
              : "";
            sussName = res.sussName
              ? "参会发送成功单位：" + res.sussName + "\n"
              : "";
            str = sussName + errorName + noWKName;
            if (str) {
              this.$alert(str, {
                confirmButtonText: "确定",
                type: "warning",
              }).then(() => {
                this.loadData();
              });
            }
          });
      }
    },
    // 发参会  系统、培训
    getOrgList1(data) {
      if (this.text == "发办理单位") {
        let str1 = "";
        if (this.formData.type == "培训会议通知") {
          str1 = "D_PXTZCX"; //D_PXTZCXWH
        } else if (this.formData.type == "系统会议通知") {
          str1 = "HY_XTHYTZCH";
        }
        let ids = [],
          names = [];
        let oldIds = [],
          oldNames = []; //发往老OA
        data.forEach((item) => {
          // if(item.isSyn==0){
          //   ids.push(item.id.split('/')[0])
          //   names.push(item.unitName)
          // }else if(item.isSyn==1){
          //   oldIds.push(item.id.split('/')[0])
          //   oldNames.push(item.unitName)
          // }
          ids.push(item.id.split("/")[0]);
          names.push(item.unitName);
        });

        if (ids && ids.length > 0) {
          if (this.formData.entrustUnit) {
            let str2 = "";
            if (this.formData.type == "培训会议通知") {
              str2 = "D_PXTZCXWH"; //D_PXTZCXWH
            } else if (this.formData.type == "系统会议通知") {
              str2 = "HY_XTHYTZCB";
            }
            this.$api.meeting
              .sendCB({
                id: this.id,
                TPLBSNID: str2,
                isCanOrCb: "1", //0 参会   1承办
                typeFlag: 0,
              })
              .then((res1) => {
                console.log(99989899898, res1);
                let errorName = "";
                let noWKName = "";
                let sussName = "";
                let sumStr = "";
                errorName = res1.errorName
                  ? "承办发送失败单位:" +
                    res1.errorName +
                    "未设置部门综合代表" +
                    "\n"
                  : "";
                noWKName = res1.noWKName
                  ? "承办发送失败单位:" + res1.noWKName + "流程不正确"
                  : "";
                sussName = res1.sussName
                  ? "承办发送成功单位：" + res1.sussName + "\n"
                  : "";
                sumStr = sussName + errorName + noWKName;
                if (sumStr) {
                  this.$alert(sumStr, {
                    confirmButtonText: "确定",
                    type: "warning",
                  }).then(() => {
                    this.loadData();
                  });
                }
              });
          }
          this.$api.meeting
            .sendCB({
              id: this.id,
              undertakeDepartmentId: ids.join(","),
              undertakeDepartment: names.join(","),
              TPLBSNID: str1,
              isCanOrCb: "0", //0 参会   1承办
              typeFlag: 0,
            })
            .then((res) => {
              let errorName = "";
              let noWKName = "";
              let sussName = "";
              let str1 = "";
              errorName = res.errorName
                ? "参会发送失败单位:" +
                  res.errorName +
                  "未设置部门综合代表" +
                  "\n"
                : "";
              noWKName = res.noWKName
                ? "参会发送失败单位:" + res.noWKName + "流程不正确"
                : "";
              sussName = res.sussName
                ? "参会发送成功单位：" + res.sussName + "\n"
                : "";
              str1 = sussName + errorName + noWKName;
              if (str1) {
                this.$alert(str1, {
                  confirmButtonText: "确定",
                  type: "warning",
                }).then(() => {
                  this.loadData();
                });
              }
            });
        }
        if (oldIds && oldIds.length > 0) {
          this.$api.meeting
            .sendCB({
              id: this.id,
              undertakeDepartmentId: oldIds.join(","),
              undertakeDepartment: oldNames.join(","),
              TPLBSNID: str1,
              isCanOrCb: "0", //0 参会   1承办
              typeFlag: 1,
              addFlag: "1", //参会发办理单位到老OA
            })
            .then((res) => {
              let errorName = "";
              let noWKName = "";
              let sussName = "";
              let oldStr = "";
              errorName = res.errorName
                ? "参会发送失败单位:" +
                  res.errorName +
                  "未设置部门综合代表" +
                  "\n"
                : "";
              noWKName = res.noWKName
                ? "参会发送失败单位:" + res.noWKName + "流程不正确"
                : "";
              sussName = res.sussName
                ? "参会发送成功单位：" + res.sussName + "\n"
                : "";
              oldStr = sussName + errorName + noWKName;
              if (oldStr) {
                this.$alert(oldStr, {
                  confirmButtonText: "确定",
                  type: "warning",
                }).then(() => {
                  this.loadData();
                });
              }
            });
        }
      } else if (this.text == "增发") {
        console.log(888880000, "data", data);
        let str1 = "";
        if (this.formData.type == "培训会议通知") {
          str1 = "D_PXTZCX"; //D_PXTZCXWH
        } else if (this.formData.type == "系统会议通知") {
          str1 = "HY_XTHYTZCH";
        } else if (this.formData.type == "本部会议通知") {
          str1 = "HYGL_BBHYTZCH";
        } else if (this.formData.type == "部门会议通知") {
          str1 = "HY_BMHYTZCH";
        }
        let idArr1 = [];
        let nameArr1 = [];
        let oldIdArr1 = [],
          oldNameArr1 = []; //发往老OAidArr1 nameArr1 oldIdArr1 oldNameArr1
        data.forEach((item) => {
          // if(item.isSyn==0){
          //   idArr1.push(item.id.split('/')[0])
          //   nameArr1.push(item.unitName)
          // }else if(item.isSyn==1){
          //   oldIdArr1.push(item.id.split('/')[0])
          //   oldNameArr1.push(item.unitName)
          // }
          idArr1.push(item.id.split("/")[0]);
          nameArr1.push(item.unitName);
        });
        if (idArr1 && idArr1.length > 0) {
          this.$api.meeting
            .sendCB({
              id: this.id,
              undertakeDepartmentId: idArr1.join(","),
              undertakeDepartment: nameArr1.join(","),
              TPLBSNID: str1,
              isCanOrCb: "0", //0 参会   1承办
              typeFlag: 0,
            })
            .then((res) => {
              let errorName = "";
              let noWKName = "";
              let sussName = "";
              let tempStr = "";
              errorName = res.errorName
                ? "参会发送失败单位:" +
                  res.errorName +
                  "未设置部门综合代表" +
                  "\n"
                : "";
              noWKName = res.noWKName
                ? "参会发送失败单位:" + res.noWKName + "流程不正确"
                : "";
              sussName = res.sussName
                ? "参会发送成功单位：" + res.sussName + "\n"
                : "";
              tempStr = sussName + errorName + noWKName;
              if (tempStr) {
                this.$alert(tempStr, {
                  confirmButtonText: "确定",
                  type: "warning",
                }).then(() => {
                  this.loadData();
                });
              }
            });
        }
        if (oldIdArr1 && oldIdArr1.length > 0) {
          this.$api.meeting
            .sendCB({
              id: this.id,
              undertakeDepartmentId: oldIdArr1.join(","),
              undertakeDepartment: oldNameArr1.join(","),
              TPLBSNID: str1,
              isCanOrCb: "0", //0 参会   1承办
              typeFlag: 1,
              addFlag: "1", //增发到老OA
            })
            .then((res) => {
              let errorName = "";
              let noWKName = "";
              let sussName = "";
              let str = "";
              errorName = res.errorName
                ? "参会发送失败单位:" +
                  res.errorName +
                  "未设置部门综合代表" +
                  "\n"
                : "";
              noWKName = res.noWKName
                ? "参会发送失败单位:" + res.noWKName + "流程不正确"
                : "";
              sussName = res.sussName
                ? "参会发送成功单位：" + res.sussName + "\n"
                : "";
              str = sussName + errorName + noWKName;
              if (str) {
                this.$alert(str, {
                  confirmButtonText: "确定",
                  type: "warning",
                }).then(() => {
                  this.loadData();
                });
              }
            });
        }
      }
    },
    //获取传阅人员列表
    getTreeDataForCy(n) {
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
      let mainIds = this.formData.id; //主表单id
      let ids = [];
      let cbIds = [],
        cbDeptIds = [],
        cbDeptNames = []; //新OA承办收回子流程id、部门id、部门名称
      let oldCbIds = [],
        oldCbDeptIds = [],
        oldCbDeptNames = []; //老OA承办收回子流程id、部门id部门名称
      let cuiIds = [],
        cuiDeptIds = [],
        cuiDeptNames = []; //新OA承办催办子流程id、部门id、部门名称
      let oldCuiIds = [],
        oldCuiDeptIds = [],
        oldCuiDeptNames = []; //老OA承办催办子流程id、部门id部门名称
      // data.map(item => {
      if (this.dialogTypeNow == "cb") {
        data.map((item) => {
          if (item.isSyn == 0) {
            cbIds.push(item.id);
            cbDeptIds.push(item.undertakeDepartmentId);
            if (item.isCanOrCb == "0") {
              cbDeptNames.push(item.joinmeetDept);
            } else {
              cbDeptNames.push(item.entrustUnit);
            }
          } else {
            oldCbIds.push(item.id);
            oldCbDeptIds.push(item.undertakeDepartmentId);
            if (item.isCanOrCb == "0") {
              oldCbDeptNames.push(item.joinmeetDept);
            } else {
              oldCbDeptNames.push(item.entrustUnit);
            }
          }
        });
        if (cbIds && cbIds.length > 0) {
          this.$api.meeting
            .cbChBack({
              id: mainIds,
              ids: cbIds.join(","),
              undertakeDepartmentId: cbDeptIds.join(","),
              undertakeDepartment: cbDeptNames.join(","),
              typeFlag: 0,
              draftDate: this.formData.draftDate,
              avyId: this.formData.pcsAvyId,
            })
            .then((res) => {
              this.$message({
                message: "收回完成",
                type: "success",
              });
              this.loadData();
            });
        }
        if (oldCbIds && oldCbIds.length > 0) {
          let str2s = oldCbDeptNames.join(",");
          // this.$api.meeting.cbChBack({ id: mainIds,ids: oldCbIds.join(","),undertakeDepartmentId:oldCbDeptIds.join(','),undertakeDepartment:oldCbDeptNames.join(','),typeFlag:1, draftDate: this.formData.draftDate }).then(res => {
          this.$message({
            message: "老OA不支持跨行收回：",
            str2s,
            type: "warning",
            // });
            // this.loadData()
          });
        }
      } else if (this.dialogTypeNow == "cui") {
        data.map((item) => {
          if (item.isSyn == 0) {
            cuiIds.push(item.id);
            cuiDeptIds.push(item.undertakeDepartmentId);
            if (item.isCanOrCb == "0") {
              cuiDeptNames.push(item.joinmeetDept);
            } else {
              cuiDeptNames.push(item.entrustUnit);
            }
          } else {
            oldCuiIds.push(item.id);
            oldCuiDeptIds.push(item.undertakeDepartmentId);
            if (item.isCanOrCb == "0") {
              oldCuiDeptNames.push(item.joinmeetDept);
            } else {
              oldCuiDeptNames.push(item.entrustUnit);
            }
          }
        });
        console.log(cuiIds);
        if (cuiIds && cuiIds.length > 0) {
          console.log("cui x", cuiIds);
          this.$api.meeting
            .cuiban({
              mainId: mainIds,
              id: cuiIds.join(","),
              undertakeDepartmentId: cuiDeptIds.join(","),
              undertakeDepartment: cuiDeptNames.join(","),
              typeFlag: "2",
              isSynTypeFlag: "0",
            })
            .then((res) => {
              this.$message({
                message: "催办成功",
                type: "success",
              });
              // this.loadData()
            });
        }
        if (oldCuiIds && oldCuiIds.length > 0) {
          console.log("cui l", oldCuiIds);
          this.$api.meeting
            .cuiban({
              mainId: mainIds,
              id: oldCuiIds.join(","),
              undertakeDepartmentId: oldCuiDeptIds.join(","),
              undertakeDepartment: oldCuiDeptNames.join(","),
              typeFlag: "2",
              isSynTypeFlag: "1",
            })
            .then((res) => {
              this.$message({
                message: "催办成功",
                type: "success",
              });
            });
        }
      } else {
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
      }
    },
    checkPhone(rule, value, callback) {
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
        return callback(new Error("联系电话不可以输入字母、汉字和空格"));
      } else {
        callback();
      }
    },
    // 关闭
    close() {
      // 判断是否授权其他人，如果授权其他人直接关闭
      if (this.isAuthorizeOthers) {
        this.$intent.closeWindow(this);
      } else {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: (action) => {
            if (action === "confirm") {
              //点是
              this.formData.wordBody =
                process.env.NODE_ENV == "production" &&
                this.formData.type != "本部会议通知"
                  ? this.$refs.ue.getUEContent()
                  : "";
              this.formData.typeFlag = "0";
              if (this.id) {
                this.$api.meeting.zfUpdateData(this.formData).then((res) => {
                  this.$intent.closeWindow(this);
                });
              } else {
                this.$api.meeting.zfAddData(this.formData).then((res) => {
                  this.id = res.id;
                  if (
                    this.formData.attachid &&
                    this.formData.attachid.length > 0
                  ) {
                    this.createFile();
                  }
                  this.$intent.closeWindow(this);
                });
              }
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          },
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
        console.log("1111111111111111");
        this.hyCon();
      } else {
        //编辑修改
        console.log("2222222222222");
        this.hyConUpdate();
      }
    },
    // 添加会议内容
    hyCon() {
      let attachId = [];
      if (this.form.topic && this.form.joinDept) {
        if (this.id) {
          this.form.orderId = this.id;
          this.$api.meeting.hyConSave(this.form).then((res) => {
            this.uploadConfig1.id = res.result.id;
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
            // if (this.$route.query.flags) {
            //   this.$api.meeting.zfUpdateData(this.formData).then((res) => {
            //     this.$intent.replace(this, {
            //       name: "zfTwo",
            //       query: { id: this.id },
            //     });
            //     this.loadData();
            //     return;
            //   });
            // }
            this.hyConList1();
          });
        } else {
          this.formData.typeFlag = "0"; //0 大表单意见字段不清空
          this.$api.meeting.zfAddData(this.formData).then((res3) => {
            this.id = res3.result.id;
            this.form.orderId = this.id;
            this.form.attachList &&
              this.form.attachList.map((item) => {
                attachId.push(item.id);
              });
            this.$api.meeting.hyConSave(this.form).then((res) => {
              this.uploadConfig1.id = res.result.id;
              this.fileId1 = res.result.id;
              this.$api.setSysConfig
                .saveFile({
                  id: res.result.id,
                  fileId: attachId.join(","),
                  fileType: "10001",
                })
                .then((res) => {});
              // this.hyConList1()
              this.$intent.replace(this, {
                name: "zfTwo",
                query: { id: this.id },
              });
              this.loadData();
            });
          });
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
              .then((res) => {
                this.$set(item, "attachList", res.data);
                this.formData.attchmentFileInfo.push(...item.attachList);
              });
          });
      });
    },
    // 会议内容更新
    hyConUpdate() {
      this.$api.meeting.hyConUpdate(this.form).then((res) => {
        this.hyConList1();
      });
      this.dialogFormVisible = false;
    },
    hyBtnClick(str, item) {
      this.uploadConfig1.id = item.id;
      console.log(" item", item);
      switch (str) {
        case "编辑":
          this.form = item;
          this.fileId1 = this.form.id;
          let idArr = [];
          let nameArr = [];
          this.selectDept = [];
          nameArr = this.form.joinDept.split(",");
          idArr = this.form.joinDeptId.split(",");
          idArr.forEach((item, index) => {
            let obj1 = {};
            obj1.id = item;
            obj1.unitName = nameArr[index];
            this.selectDept.push(obj1);
          });
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
      }
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
        case "qianfa":
          this.formData.signIdea = this.formData.signIdea
            ? this.formData.signIdea + data
            : data;
          this.$set(
            this.formData,
            "signIdea",
            this.formData.signIdea.length > 500
              ? this.formData.signIdea.substring(0, 500)
              : this.formData.signIdea
          );
          break;
        case "chuli":
          this.formData.examineIdea = this.formData.examineIdea
            ? this.formData.examineIdea + data
            : data;
          console.log(data, this.clickTypes);
          this.$set(
            this.formData,
            "examineIdea",
            this.formData.examineIdea.length > 500
              ? this.formData.examineIdea.substring(0, 500)
              : this.formData.examineIdea
          );
          break;
      }
    },
    // 获取反馈信息配置
    getFankui() {
      this.resObj = {};
      this.$api.meeting
        .settingDetail({
          scUnitId: this.unitCode,
          fileType: this.formData.type,
        })
        .then((res) => {
          if (res.meetHyglFeedbackConfigDo) {
            this.resObj = res.meetHyglFeedbackConfigDo;
            this.fankuiFlag = true;
          } else {
            this.fankuiFlag = false;
          }
        });
    },
    getHuanJie() {
      // 区分制发   与    承办
      // let tempId = "";
      // if (this.$route.query.flags) {
      //   tempId = "";
      // } else {
      //   tempId = this.id ? this.id : "";
      // }
      this.$api.meeting
        .getHuanJie({ id: this.id, typeFlag: "0", model: this.formData.model })
        .then((res) => {
          this.huanJieMessage = res.Fields;
          this.setConfig();
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
        tel: [
          {
            required: this.requiredFields.tel,
            message: "不能为空",
            trigger: "blur",
          },
          {
            message: "联系电话不可以输入字母、汉字和空格",
            validator: this.checkPhone,
            trigger: "blur",
          },
        ],
        authorCn: [
          {
            required: this.requiredFields.authorCn,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        entrustUnit: [
          {
            required: this.requiredFields.entrustUnit,
            message: "不能为空",
            trigger: "blur",
          },
        ],
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
      };
      // if (process.env.NODE_ENV == 'production' && this.formData.type != '本部会议通知'&&&& this.readFields.wordBody) {
      //   setTimeout(() => {
      //     this.$refs.ue.setDsabled()
      //   }, 1000)
      // }
      console.log(99999999999000000000, this.formData.signIdea);
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
      this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
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
      this.uploadConfig1.filesHas = this.formData.attchmentFileInfo;
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
          this.$businessCode.fawglfj
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
    // 判断是否为 首页进入并且为授权人
    isRouteFrom (authorizedPersonName) {
      const query = this.$route.query;

      // 判断是否为授权人
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
  mounted() {},
  updated() {},
  created() {
    

    if (
      this.$route.query.deptDetail &&
      JSON.parse(this.$route.query.deptDetail).telMobile
    ) {
      let telStr = JSON.parse(this.$route.query.deptDetail).telMobile;
      let newTelStr = telStr.replace(/undefined/g, "");
      // a,         ,     ,a        a,a
      if (newTelStr.length == 1) {
        this.formData.tel = "";
      } else {
        if (newTelStr.startsWith(",")) {
          this.formData.tel = newTelStr.slice(1);
        } else if (newTelStr.endsWith(",")) {
          this.formData.tel = newTelStr.substring(0, newTelStr.length - 1);
        } else {
          this.formData.tel = newTelStr;
        }
      }
    } else {
      this.formData.tel = "";
    }
    this.id = this.$route.query.id;
    if (this.id) {
     
      // 判断是否为首页进入
      // FIXME: 在2022，0121版本中不上，之后版本中如果要上，则去掉 false 就行
      if (this.$route.query.routeFrom === "home" && false) {
        this.isShowDocument = false;
      } else {
        this.isShowDocument = true;
      }
      // if (this.$route.query.flags) {
      //   //会议室预定未涉及工作流代办
      //   const type1 = this.$route.query.type;
      //   switch (type1) {
      //     case "CN012":
      //       this.formData.type = "系统会议通知";
      //       this.formData.model = "CN012";
      //       break;
      //     case "CN013":
      //       this.formData.type = "本部会议通知";
      //       this.formData.model = "CN013";
      //       break;
      //     case "CN095":
      //       this.formData.type = "部门会议通知";
      //       this.formData.model = "CN095";
      //       break;
      //     case "CN015":
      //       this.formData.type = "培训会议通知";
      //       this.formData.model = "CN015";
      //       break;
      //   }
      //   if (this.formData.type == "培训会议通知") {
      //     this.tempType = "培训通知";
      //   } else {
      //     this.tempType = this.formData.type;
      //   }
      // this.getFankui();
      //   this.loadData1();
      // } else {
      this.loadData();
      // }
    } else {
      this.isShowDocument = true;
      const type = this.$route.query.type;
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
      if (this.formData.type == "培训会议通知") {
        this.tempType = "培训通知";
      } else {
        this.tempType = this.formData.type;
      }
      this.getHuanJie();
      this.getFankui();
    }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.zfTwo {
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
.bank_dispach_content {
  width: 100%;
  height: auto;
  padding-bottom: 20px;
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
  font-size: 14px !important;
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
    .numName {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 20px;
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
.tree_w1 {
  height: 100px;
  padding: 0;
  // overflow: scroll;
  margin: 0;
}
// 收藏
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
      // text-align: center;
      // vertical-align: middle;
      word-break: break-all;
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
