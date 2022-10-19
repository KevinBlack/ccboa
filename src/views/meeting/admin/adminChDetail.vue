<!--
 * @Author: your name
 * @Date: 2020-09-08 17:52:52
 * @LastEditTime: 2021-09-09 16:12:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\cb\cbDetial.vue
--> 
<template>
  <div class="chDetial" id="meetzhifa">
    <div class="headerClick">
      <div class="right">
        <!-- <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button> -->
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div class="formHeader">
      <!-- <div
        class="title-text"
        v-if="formData.curbankId=='111111111'"
      >{{formData.curbank}}{{formData.draftDepartment}}{{formData.type}}(参会单)</div>-->
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
                <!-- <span>{{formData.creator}}</span> -->
                <span>{{formData.undertakeCurrentlinks}}</span>
              </p>
              <p v-if="!formData.finishTime">
                当前处理人：
                <span>{{formData.currentNowName}}</span>
              </p>
            </div>
          </div>
          <h6 class="bank_dispach_file_tit">文件要素</h6>
          <div id="wjys" class="height_90"></div>
          <el-form :rules="rules" :model="formData" ref="ruleForm" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训名称" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.title" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="会议名称" v-else>
                  <el-input v-model="formData.title" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主办部门">
                  <el-input v-model="formData.maindept" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿人">
                  <el-input v-model="formData.authorCn" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <el-input v-model="formData.tel" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿日期">
                  <el-input v-model="formData.draftDate" :disabled="true"></el-input>
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
            <el-row v-if="formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="主持人">
                  <el-input v-model="formData.host" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.formData.type=='本部会议通知'||this.formData.type=='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="联合单位">
                  <el-input v-model="formData.unitdept" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="出席">
                  <el-input v-model="formData.attend" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="列席">
                  <el-input v-model="formData.attendance" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type=='本部会议通知'">
              <el-col :span="24">
                <el-form-item label="摘要">
                  <el-input v-model="formData.summary" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-form-item align="right" style="margin-right:5.5%">
                <el-button disabled>增加</el-button>
              </el-form-item>
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
                      <!-- <div class="con-right" v-if="isShow">
                    <el-button @click="hyBtnClick('编辑',item)">编辑</el-button>
                    <el-button @click="hyBtnClick('删除',item)">删除</el-button>
                  </div>
                  <div class="con-right" v-if="!isShow">
                    <el-button @click="hyBtnClick('增发',item)">增发</el-button>
                      </div>-->
                    </div>
                  </div>
                </el-form-item>
              </el-row>
            </el-row>
            <!-- <el-row v-if="formData.type=='系统会议通知'"> -->
            <el-row v-if="formData.type!='本部会议通知'&&formData.type!='部门会议通知'">
              <el-col :span="24">
                <el-form-item label="委托承办单位">
                  <el-row>
                    <el-col :span="20">
                      <el-input v-model="formData.entrustUnit" :disabled="true"></el-input>
                    </el-col>
                    <!-- <el-col :span="2">
                  <el-button type="primary" style="float:right" disabled>选择</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" style="float:right" disabled>删除</el-button>
                    </el-col>-->
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
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-form-item label="签发意见" prop="signIdea">
              <!-- <el-button
            type="primary"
            size="mini"
            @click="addSucc('signIdeaList')"
            :disabled="isWeiHu"
              >新增意见</el-button>-->
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
                          :disabled="true"
                          type="textarea"
                          v-model="item.opinion"
                          class="d_f1"
                        ></el-input>
                      </el-col>
                      <!-- <el-col :span="2" style="margin-left:12px">
                    <el-button
                      type="danger"
                      @click="deleSugg('examineIdeaList',index,item.id)"
                      :disabled="isWeiHu"
                    >删除</el-button>
                      </el-col>-->
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
            </el-form-item>
            <el-form-item label="办理意见" prop="pbIdea">
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
            <el-row v-if="!(examineIdeaList && examineIdeaList.length!=0)">
              <el-col :span="23">
                <el-input type="textarea" :rows="3" v-model="formData.pbIdea" :disabled="true"></el-input>
              </el-col>
            </el-row>
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
            <el-form-item label="传阅意见" prop="cyyj">
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
                      <el-col :span="2" style="margin-left:12px">
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
            <el-row v-if="!(cyIdeaList && cyIdeaList.length!=0)">
              <el-col :span="23">
                <el-input type="textarea" :rows="3" v-model="formData.cyIdea" :disabled="true"></el-input>
              </el-col>
            </el-row>
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
            <el-form-item label="反馈信息">
              <el-radio-group v-model="formData.isFeedback">
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
                ></m-table>
              </el-col>
            </el-row>
            <el-form-item align="center" v-if="formData.isFeedback=='0'">
              <el-button
                style="margin:0 10px"
                @click="buttonClick('选择参会人')"
                :disabled="isWeiHu"
              >选择参会人</el-button>
              <el-button
                :disabled="isWeiHu"
                style="margin:0 10px"
                @click="buttonClick('新增系统外参会人')"
              >新增系统外参会人</el-button>
              <!-- <el-button @click="buttonClick('提交报名表')">提交报名表</el-button> -->
            </el-form-item>
            <!-- <el-checkbox-group v-if="radio=='1'" v-model="checkList">
            <el-checkbox label="行名" disabled></el-checkbox>
            <el-checkbox label="部门" disabled></el-checkbox>
            <el-checkbox label="姓名" disabled></el-checkbox>
            <el-checkbox label="性别"></el-checkbox>
            <el-checkbox label="民族"></el-checkbox>
            <el-checkbox label="职务"></el-checkbox>
            <el-checkbox label="邮箱"></el-checkbox>
            <el-checkbox label="手机" disabled></el-checkbox>
            <el-checkbox label="固定电话"></el-checkbox>
            <el-checkbox label="身份证号"></el-checkbox>
            <el-checkbox label="到达时间"></el-checkbox>
            <el-checkbox label="接站信息"></el-checkbox>
            </el-checkbox-group>-->
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
            <!-- <el-form-item label="参会单附件" v-if="formData.type!='本部会议通知'">
          <el-col :span="23">
            <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList" :disabled="isWeiHu"></upload-file-ts>
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
                      <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                      <span class="name">{{item.createrName}}</span>
                      <span class="name">{{item.createTime}}</span>
                      <div class="btns">
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="upRow(index)"
                          v-if="formData.attchmentFileInfo.length>1"
                          :disabled="index==0"
                          round
                        >上移</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downRow(index)"
                          v-if="formData.attchmentFileInfo.length>1"
                          :disabled="index==formData.attchmentFileInfo.length-1"
                          round
                        >下移</el-button>
                        <el-button
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
            </el-form-item>-->
          </el-form>
        </div>
      </div>
    </div>
    <select-person
      :canTab="false"
      :loadingTree="true"
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
    <select-persons
      v-model="dialogState1"
      :seletOptionsData="seletOptionsData1"
      :orgOrDeptId="selsecOrgOrDeptId"
      @showCompDialog="showCompDialog1"
    />
    <!-- <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart> -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
    <!-- 常用批语 -->
    <!-- <write-list-ts v-model="appendWriteDialog" @childsaveselect="writelistvalue"></write-list-ts> -->
    <!-- 传阅收回选人 -->
    <!-- <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>-->
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
// import editor from '@/components/editor/editor.vue';
import selectPerson from "components/tree/treeTansun";
import selectPersons from "components/viewFlow/dispatchTree";
// import flowChart from "components/dialog/flowChart";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import { mapGetters, mapActions } from "vuex";
import minixs from "../../../minixs/index";
import mTable from "@/components/table/tTable";
// import cyPersonList from "../../bianhan/components/cyPersonList";//传阅
import UE from "components/editor/ue.vue";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "../../../minixs/exportTable";
// import writeListTs from "../../../components/appendWriteList/writeListTs";
import beanList from "../../../util/beanList";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import treePerson from "components/tree/sysTreePerson";

export default {
  name: "chDetial",
  components: {
    // writeListTs,
    selectPerson,
    selectPersons,
    shiwuFlow,
    // cyPersonList,
    mTable,
    UE,
    uploadFileTs,
    treePerson,
  },
  props: {},
  mixins: [minixs, openOrDownLoadFile],
  data() {
    return {
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      showOrgPer: false,
      isSingles: false,
      isNeedChild: "yes",
      unitClass: 0,
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDept: [],
      tempType: "",
      selsecOrgOrDeptId: "", //流程调度机构
      isWeiHu: true,
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
      listArr: [],
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
      buttonList: [
        { name: "关闭", show: true },//0
        { name: "保存", show: false },//1
        { name: "查看流程", show: true },
        { name: "打印处理单", show: true },
        { name: "收藏", show: true },
        { name: "维护", show: true },//4-5
        { name: "流程调度", show: true },//3-6

      ],
      type: "",
      showFlowChart: false,
      flowChartList: [], //流程列表

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
      personIdArr: [],
      personNameArr: [],
      dialogState1: false, //显示隐藏
      seletOptionsData1: [],
    };
  },
  computed: {
    // ...mapGetters([
    //   'todoItem'
    // ])
  },
  mounted() {
    // this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
    // this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    // this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    // this.$nextTick(() => {
    //   document.querySelector("#bank_dispach_content").addEventListener("scroll", this.onScroll);
    // });
    // window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    // ...mapActions([
    //   'setTodoItem'
    // ]),
    getFileList() {
      //制发单附件
      this.$api.setSysConfig
        .getTextemList({ id: this.formData.mainId,numYear:this.numyear })
        .then((res) => {
          this.formData.attchmentFileInfo = [];
          this.formData.attchmentFileInfo = res.data;
          // this.formData.attchmentFileInfoZhi = res.data;
          this.$set(this.formData, "attchmentFileInfoZhi", res.data);
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
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close();
          break;
        case "保存":
          this.isWeiHu = true;
          this.buttonList[1].show = false;
          this.buttonList[5].show = true;
          // this.tableCols.forEach((item) => {
          //   item.formatter = function (row) {
          //     if (this.isWeiHu) {
          //       return true;
          //     } else {
          //       return false;
          //     }
          //   };
          // });
          this.save();
          break;
        case "维护":
          this.isWeiHu = false;
          this.buttonList[1].show = true;
          this.buttonList[5].show = false;
          let that = this;
          // this.tableCols.forEach((item) => {
          //   item.formatter = function (row) {
          //     if (that.isWeiHu) {
          //       return true;
          //     } else {
          //       return false;
          //     }
          //   };
          // });
          break;
        case "流程调度":
          this.toNext();
          break;
        // case "流程调度":
        //   this.flowAlter()
        //   break
        // case '传阅':
        //   this.singelCheckF = false;
        //   this.offenUse = false;
        //   this.dialogTypeNow = 'cy';
        //   this.chuanYue();
        //   break;
        // case '操作指南':
        //   this.$message({
        //     message: '暂无文档',
        //     type: 'warning'
        //   });
        //   break;
        case "收藏":
          //   let deptTableHead = "";
          //  deptTableHead =
          //     this.formData.draftOrgan +
          //     this.formData.draftDepartment +
          //     this.tempType +
          //     "（参会单）";
          //   exportTable.getPdf(
          //     deptTableHead,
          //     this.formData.attchmentFileInfo,
          //     "meetzhifa",
          //     "A08462002",
          //     "biaoti",
          //     this
          //   );
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
                .cbCollect({ id: this.formData.id,numYear:this.numyear })
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
        // case '传阅收回':
        //   this.$api.meeting.noCyList({ mainId: this.id }).then(res => {
        //     if (res.data.length == 0) {
        //       this.$message({ type: "success", message: "暂无未阅人员" })
        //     } else {
        //       res.data.forEach(item => {
        //         item.name = item.curUserCn
        //       })
        //       this.cyData = res.data;
        //       this.showCyPerson = true;
        //     }
        //   })
        //   break;
        case "查看流程":
          this.$api.meeting.cbgetProcess({ id: this.id,numYear:this.numyear }).then((res) => {
            this.showFlowChart = true;
            this.flowChartList = res.list;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
          break;
        case "选择参会人":
          // this.singelCheckF = false;
          // this.dialogTypeNow = "attend";
          // this.offenUse = false;
          // this.loadingTree = true;
          // this.toAttend();
          this.showOrgPer = true;
          break;
        // case "提交报名表":
        //   if (this.tableData.length > 0) {
        //     this.toOrSubmit = 'sub'
        //     this.save()
        //     this.$intent.closeWindow(this)
        //   } else {
        //     this.$message({
        //       message: '请选择参会人',
        //       type: 'warning'
        //     });
        //   }
        // break;
        case "打印处理单":
          this.$intent.go(this, {
            path: "/meetingChPrint",
            query: { id: this.id,numYear:this.numyear },
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
    close() {
      this.$confirm("关闭前是否保存页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
      })
        .then(() => {
          if (this.id) {
            this.$api.meeting.cbUpdateData({ ...this.formData, admin: "admin"}).then((res) => {
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
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      switch (dtype) {
        case "next":
          this.next(data[0], params);
          break;
          // case "cy":
          //   this.cy(data)
          //   break
          // case "attend":
          //   this.attend(data);
          break;
        default:
          break;
      }
    },
    //选人成功后
    showCompDialog1(data, status, type, params, dtype) {
      this.dialogState1 = false;

      this.next(data[0], params);
    },
    toNext() {
      this.$api.meeting
        .diaodu({
          id: this.id,
          // multiID: this.todoItem.multiID,
          // pcsAvyId: this.todoItem.pcsAvyId,
          // tplNo: this.todoItem.tplNo
        })
        .then((res) => {
          // this.seletOptionsData = res.list
          // this.treeData = res.result;
          // this.treeData = res.result.data;
          // this.treeData.push(res.data)
          this.seletOptionsData1 = res.list;
          this.dialogState1 = true;
          // this.$nextTick(() => {
          //   this.seletOptionsData = res.list
          // });
        });
      // this.$refs['ruleForm'].validate(valid => {
      //   if (valid) {
      //     this.$api.meeting.cbgetPerson({
      //       id: this.id,
      //       // multiID: this.todoItem.multiID,
      //       // pcsAvyId: this.todoItem.pcsAvyId,
      //       // tplNo: this.todoItem.tplNo
      //     }).then(res => {
      //       this.seletOptionsData = res.list
      //       // this.treeData = res.result;
      //       this.treeData = res.result.data;
      //       this.dialogState = true;
      //     })
      //   }
      // })
    },
    //完成并发送
    next(person, params) {
      this.formData.typeFlag = "1";
      this.formData.admin = "admin";
      this.formData.isUp = person.id.split("#")[1];
      this.formData.undertakeHandlePersonIds = person.idStr;
      this.formData.undertakeHandlePerson = person.name;
      this.formData.nextAvyId = params.id;
      this.formData.undertakeCurrentlinks = params.name;
      console.log(99999, "this.formData", this.formData);
      this.attendInfo();
      this.$api.meeting.cbUpdateData(this.formData).then((res) => {
        this.$message({
          message: "发送成功",
          type: "success",
        });
        this.$intent.closeWindow(this);
      });
    },
    // toAttend() {
    //   this.$api.meeting
    //     .cbgetPerson({
    //       id: this.id,
    //     })
    //     .then((res) => {
    //       this.seletOptionsData = res.list;
    //       this.treeData = res.result.data;
    //       this.dialogState = true;
    //     });
    // },
    //选择参会人
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
    // attend(person, params) {
    //   // console.log('canhuiren', person)
    //   this.personIdArr = [];
    //   this.personNameArr = [];
    //   person.forEach((item) => {
    //     this.personIdArr.push(item.idStr);
    //     this.personNameArr.push(item.name);
    //   });
    //   let newArr = [];
    //   newArr = this.tableCols;
    //   console.log(8888, this.tableCols);
    //   this.personIdArr.forEach((item, index) => {
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
    //         let phoneArr = result.telMobile.split(",");
    //         if (phoneArr.length > 0) {
    //           obj1.phone = phoneArr[0];
    //         } else {
    //           obj1.phone = result.telMobile;
    //         }
    //       } else {
    //         obj1.phone = "";
    //       }
    //       this.tableData.push(obj1);
    //     });
    //   });
    // },
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
              // case sugg='signIdeaList':
              //     this.signIdeaList.splice(n,1)
              //     break;
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
        case (range = "examineIdeaList"):
          this.examineIdeaList.push({
            opinion: "",
            deptName: AdepartmentName,
            userName: AcreateUser,
            DATE: AcreateTime,
            type: "6",
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
    // 更新表单数据
    save() {
      this.formData.admin = "admin";
      // returnUserId   参会人id  字符串
      // returnHtmlData   表格中参会人信息  字符串
      this.attendInfo();
      this.formData.opinionList = [...this.examineIdeaList, ...this.cyIdeaList];
      if (this.formData.type == "本部会议通知") {
        this.formData.contentList = this.listArr;
      }
      this.$api.meeting.adminCbUpdate(this.formData).then((res) => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        }
        this.loadData();
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
    // chuanYue () {
    //   this.$api.meeting.getCyPerson({}).then(res => {
    //     this.treeData = res.result.data;
    //     this.dialogState = true;
    //   })
    // },
    //发传阅
    // cy (person) {
    //   let ids = [], names = [];
    //   person.forEach(item => {
    //     ids.push(item.idStr)
    //     names.push(item.name)
    //   })
    //   this.formData.currentUserId = ids.join(',')
    //   this.formData.currentUser = names.join(',')
    //   this.formData.currentNode = "承办";
    //   this.$api.meeting.sendChuanYue(this.formData).then(res => {
    //     this.loadData()
    //     this.$message({
    //       message: '传阅成功',
    //       type: 'success'
    //     });
    //   })
    // },
    // 传阅收回
    // cyPersonList (data) {
    //   let ids = [];
    //   data.map(item => {
    //     ids.push(item.id)
    //   })
    //   this.$api.meeting.cheHuiCy({ ids: ids.join(",") }).then(res => {
    //     this.loadData()
    //     this.$message({
    //       message: '传阅收回成功',
    //       type: 'success'
    //     });
    //   })
    // },
    getFileList1(id, index) {
      this.$api.setSysConfig.getTextemList({ id: id ,numYear:this.numyear}).then((res) => {
        this.listArr[index].attchmentFileInfo = res.data;
      });
    },
    // 会议内容列表查询
    hyConList1() {
      this.$api.meeting.hyConList({ id: this.formData.mainId }).then((res) => {
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
          this.formData.draftDate = res1.meetCbOrderDo.draftDate.split(" ")[0];

          if (this.formData.type == "培训会议通知") {
            this.tempType = "培训通知";
          } else {
            this.tempType = this.formData.type;
          }
          this.selsecOrgOrDeptId = this.formData.undertakeOrganId; //流程调度机构
          if (this.formData.finishTime) {
            this.buttonList[6].show = false;
            this.buttonList[5].show = true;
          } else {
            this.buttonList[6].show = true;
            this.buttonList[5].show = true;
          }
          this.signIdeaList = res1.sendList; //签发意见
          this.examineIdeaList = res1.pbIdeaList; //办理意见
          this.cyIdeaList = res1.cyList; //传阅意见
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
            let that = this;
            this.returnCnArr.forEach((item, index) => {
              that.attendObj = {};
              that.attendObj.label = item;
              that.attendObj.prop = that.returnEnArr[index];
              // if (item == "姓名" || item == "行名" || item == "部门") {
              that.attendObj.type = "Input";
              that.attendObj.formatter = function (row) {
                console.log("------>", row, that.isWeiHu);
                if (that.isWeiHu) {
                  return true;
                } else {
                  return false;
                }
              };
              that.tableCols.push(this.attendObj);
            });
            // let obj = {
            //   "label": '操作', type: 'Button', align: 'center',
            //   btnList: [
            //     {
            //       label: '删除',
            //       size: 'medium',
            //       type: 'default',
            //       handle: row => {
            //         this.handleEdit(row)
            //       }
            //     }
            //   ]
            // }
            let obj = {};
            obj = {
              label: "操作",
              type: "Button",
              align: "center",

              btnList: [
                {
                  label: "删除",
                  size: "medium",
                  type: "default",
                  handle: (row) => {
                    that.handleEdit(row);
                  },
                  isDisabled: (row) => {
                    if (that.isWeiHu) {
                      return true;
                    } else {
                      return false;
                    }
                  },
                },
              ],
            };
            this.tableCols.push(obj);
            console.log("jjjjjj", this.tableCols);
            // this.tableData = JSON.parse(this.formData.returnHtmlData)
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
            this.getFileList();
            setTimeout(() => {
              this.$refs.ue.setUEContent(this.formData.wordBody);
              this.$refs.ue.setDsabled();
            }, 1000);
          }
        });
    },
  },
  activated() {},
  created() {
    this.id = this.$route.query.id;
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
.chDetial {
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
