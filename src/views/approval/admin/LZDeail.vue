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
      <div
        class="shiwuTitle"
      >{{ this.formData.unitName || this.formData.curbank}}{{formData.applyProjectName}}审批处理单</div>
    </div>

    <div class="process_content">
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
            href="javascript:void(0);"
            :class="active == '#scfj' ? 'active' : ''"
            @click="toTarget('#scfj')"
          >附件</a>
        </div>
        <div class="cur_box">
          <div class="cur_sess">
            <p>
              当前环节：
              <span>{{this.formData.currentNode}}</span>
            </p>
            <p v-if="this.formData.currentNode!=='办结'">
              当前处理人：
              <span>{{this.formData.currentUser}}</span>
            </p>
            <p>
              是否跨行：
              <span>
                <el-radio-group v-model="formData.isKh" :disabled="true">
                  <el-radio :label="0">非跨行</el-radio>
                  <el-radio :label="1">跨行</el-radio>
                </el-radio-group>
              </span>
            </p>
            <el-button
              type="primary"
              @click="viewApproval"
              style="float: right;margin-right:40px;margin-top:8px;"
            >查看审批说明</el-button>
          </div>
        </div>
        <div id="wjys" class="height_90"></div>
        <h6 class="bank_dispach_file_tit">文件要素</h6>

        <el-form :rules="rules" :model="formData" label-width="120px">
          <el-row v-if="this.formData.currentNode==='办结'">
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
            <el-col :span="12">
              <el-form-item label="申请项目">
                <el-input v-model="formData.applyProjectName" :disabled="isWeiHu"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主管部门">
                <el-input v-model="formData.mainDepart" :disabled="isWeiHu"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="审批编号" prop="approveNo">
                <!--未生成编号approveNo前显示初始化编号virtualApproveNo-->
                <el-input
                  v-show="formData.approveNo||(formData.applyNo&&formData.isKh==1&&formData.approveNo)"
                  v-model="formData.approveNo"
                  :disabled="isWeiHu"
                ></el-input>
                <el-input
                  v-show="(!formData.approveNo&&formData.isKh!=1)||(formData.isKh==1&&!formData.approveNo)"
                  v-model="formData.virtualApproveNo"
                  :disabled="isWeiHu"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请编号" prop="applyNo" v-if="formData.isKh">
                <el-input v-show="formData.applyNo" v-model="formData.applyNo" :disabled="isWeiHu"></el-input>
                <el-input
                  v-show="!formData.applyNo"
                  v-model="formData.virtualApplyNo"
                  :disabled="isWeiHu"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期" prop>
                <el-input v-model="formData.applyTime" :disabled="isWeiHu"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请部门">
                <el-row>
                  <el-col :span="24">
                    <el-select
                      style="width:100%"
                      v-model="formData.draftDepartment"
                      :disabled="isWeiHu"
                    >
                      <el-option v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="formData.contactName" :disabled="isWeiHu"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="formData.contactTel" :disabled="isWeiHu"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input v-model="formData.title" :disabled="isWeiHu"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="依据">
              <el-button type="primary" @click="importBtn" size="mini" v-if="!isWeiHu">引入</el-button>

              <div v-for="(item,index) in YRcheck" :key="index">
                <span @click="YRJump(item)" style="display:inline-block;width:40%;">{{item.orderNo}}</span>
                <el-button @click="YRJump(item)" size="mini" type="primary">查看详情</el-button>
                <el-button @click="importDle(item)" size="mini" type="danger" v-if="!isWeiHu">删除</el-button>
              </div>
            </el-form-item>
          </el-row>
          <!--          <el-row>-->
          <!--            <el-form-item label="引入依据">-->
          <!--              &lt;!&ndash;              <el-button type="primary" :disabled="true">引入</el-button>&ndash;&gt;-->
          <!--              <el-button type="primary" @click="impoerDeal">查看详情</el-button>-->
          <!--              &lt;!&ndash;              <el-button type="danger" :disabled="true">删除</el-button>&ndash;&gt;-->
          <!--              <el-checkbox-group v-model="YRcurrentBtn">-->
          <!--                <el-checkbox v-for="(item,index) in YRcheck" :label="item.orderNo" :key="index">-->
          <!--                </el-checkbox>-->
          <!--              </el-checkbox-group>-->
          <!--            </el-form-item>-->
          <!--          </el-row>-->
          <el-form-item label="事由提要">
            <el-input
              type="textarea"
              :autosize="{minRow:5,maxRow:15}"
              v-model="formData.reason"
              :disabled="isWeiHu"
            ></el-input>
          </el-form-item>
          <h6 class="bank_dispach_file_tit">签批意见</h6>
          <div id="qpyj" class="height_90"></div>
          <!--          审批意见-->
          <el-form-item label="审批意见">
            <el-button
              type="primary"
              size="mini"
              @click="addSucc('checkOpinionList')"
              :disabled="isWeiHu"
            >新增意见</el-button>
            <div class="suggStyle">
              <div
                v-bind:class="['d_flex',{'border_line':index!=(formData.checkOpinionList.length-1)}]"
                v-for="(item,index) in formData.checkOpinionList"
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
                        v-model="item.content"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left:12px">
                      <el-button
                        type="danger"
                        @click="deleSugg('checkOpinionList',index,item.id)"
                        :disabled="isWeiHu"
                      >删除</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style="margin-top:12px">
                  <el-col :span="2">
                    <span>用户部门</span>
                  </el-col>
                  <el-col :span="5" style="display: flex;white-space: nowrap;">
                    <span>{{item.unitName?item.unitName+'/':''}}</span>
                    <el-input v-model="item.departmentName" :disabled="isWeiHu"></el-input>
                  </el-col>
                  <div style="margin-left:12px">
                    <el-col :span="2">
                      <span>用户名</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.createUser" :disabled="isWeiHu"></el-input>
                    </el-col>
                  </div>
                  <el-col :span="2">
                    <span>提交时间</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.createTime" :disabled="isWeiHu"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
          <!--      申请单位意见区域    -->
          <el-form-item label="申请单位意见">
            <el-button type="primary" @click="addSucc('applyOpinionList')" :disabled="isWeiHu">新增意见</el-button>
            <div class="suggStyle">
              <div
                v-bind:class="['d_flex',{'border_line':index!=(formData.applyOpinionList.length-1)}]"
                v-for="(item,index) in formData.applyOpinionList"
                :key="index"
                style="margin-bottom:26px"
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
                        v-model="item.content"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left:12px">
                      <el-button
                        type="danger"
                        @click="deleSugg('applyOpinionList',index,item.id)"
                        :disabled="isWeiHu"
                      >删除</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style="margin-top:12px">
                  <el-col :span="2">
                    <span>用户部门</span>
                  </el-col>
                  <el-col :span="5" style="display: flex;white-space: nowrap;">
                    <span>{{item.unitName?item.unitName+'/':''}}</span>
                    <el-input v-model="item.departmentName" :disabled="isWeiHu"></el-input>
                  </el-col>
                  <div style="margin-left:12px">
                    <el-col :span="2">
                      <span>用户名</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.createUser" :disabled="isWeiHu"></el-input>
                    </el-col>
                  </div>
                  <el-col :span="2">
                    <span>提交时间</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.createTime" :disabled="isWeiHu"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="办理情况">
            <el-button type="primary" @click="addSucc('blqkOpinionList')" :disabled="isWeiHu">新增意见</el-button>
            <div class="suggStyle">
              <div
                v-bind:class="['d_flex',{'border_line':index!=(formData.blqkOpinionList.length-1)}]"
                v-for="(item,index) in formData.blqkOpinionList"
                :key="index"
                style="margin-bottom:26px"
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
                        v-model="item.content"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left:12px">
                      <el-button
                        type="danger"
                        @click="deleSugg('blqkOpinionList',index,item.id)"
                        :disabled="isWeiHu"
                      >删除</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style="margin-top:12px">
                  <el-col :span="2">
                    <span>用户部门</span>
                  </el-col>
                  <el-col :span="5" style="display: flex;white-space: nowrap;">
                    <span>{{item.unitName?item.unitName+'/':''}}</span>
                    <el-input v-model="item.departmentName" :disabled="isWeiHu"></el-input>
                  </el-col>
                  <div style="margin-left:12px">
                    <el-col :span="2">
                      <span>用户名</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.createUser" :disabled="isWeiHu"></el-input>
                    </el-col>
                  </div>
                  <el-col :span="2">
                    <span>提交时间</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.createTime" :disabled="isWeiHu"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
          <!--     传阅意见     -->
          <!--          <el-form-item label="传阅意见">-->
          <!--            <el-button type="primary" @click="addSucc('cyOpinionList')" :disabled="isWeiHu">新增意见</el-button>-->
          <!--            <div class="suggStyle">-->
          <!--              <div v-bind:class="['d_flex',{'border_line':index!=(formData.cyOpinionList.length-1)}]" v-for="(item,index) in formData.cyOpinionList" :key="index" style="margin-bottom:26px">-->
          <!--                <el-row class="d_b100">-->
          <!--                  <el-col :span="24">-->
          <!--                    <el-col :span="2"><span>内容</span></el-col>-->
          <!--                    <el-col :span="19">-->
          <!--                      <el-input-->
          <!--                        :disabled="isWeiHu"-->
          <!--                        type="textarea"-->
          <!--                        v-model="item.content"-->
          <!--                        class="d_f1"-->
          <!--                      ></el-input>-->
          <!--                    </el-col>-->
          <!--                    <el-col :span="2" style="margin-left:12px">-->
          <!--                      <el-button type="danger" @click="deleSugg('cyOpinionList',index,item.id)" :disabled="isWeiHu">删除</el-button>-->
          <!--                    </el-col>-->
          <!--                  </el-col>-->
          <!--                </el-row>-->
          <!--                <el-row style="margin-top:12px">-->
          <!--                  <el-col :span="2"><span>用户部门</span></el-col>-->
          <!--                  <el-col :span="5">-->
          <!--                    <el-input v-model="item.departmentName" :disabled="isWeiHu"></el-input>-->
          <!--                  </el-col>-->
          <!--                  <div style="margin-left:12px">-->
          <!--                    <el-col :span="2"><span>用户名</span></el-col>-->
          <!--                    <el-col :span="5">-->
          <!--                      <el-input v-model="item.createUser" :disabled="isWeiHu"></el-input>-->
          <!--                    </el-col>-->
          <!--                  </div>-->
          <!--                  <el-col :span="2"><span>提交时间</span></el-col>-->
          <!--                  <el-col :span="5">-->
          <!--                    <el-input v-model="item.createTime" :disabled="isWeiHu"></el-input>-->
          <!--                  </el-col>-->
          <!--                </el-row>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </el-form-item>-->
          <!--     备注区域     -->
          <el-form-item label="备注">
            <el-button type="primary" @click="addSucc('markList')" :disabled="isWeiHu">新增意见</el-button>
            <div class="suggStyle">
              <div
                v-bind:class="['d_flex',{'border_line':index!=(formData.markList.length-1)}]"
                v-for="(item,index) in formData.markList"
                :key="index"
                style="margin-bottom:26px"
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
                        v-model="item.content"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left:12px">
                      <el-button
                        type="danger"
                        @click="deleMark(index,item.id)"
                        :disabled="isWeiHu"
                      >删除</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style="margin-top:12px">
                  <el-col :span="2">
                    <span>用户部门</span>
                  </el-col>
                  <el-col :span="5" style="display: flex;white-space: nowrap;">
                    <span>{{item.unitName?item.unitName+'/':''}}</span>
                    <el-input v-model="item.departmentName" :disabled="isWeiHu"></el-input>
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
                    <el-input v-model="item.createTime" :disabled="isWeiHu"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="传阅人员" style="margin-top:20px">
                <el-row>
                  <el-col>
                    <el-form-item label="未阅">
                      <el-input v-model="formData.unreadPerson" :disabled="isWeiHu"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="已阅">
                      <el-input v-model="formData.readPerson" :disabled="isWeiHu"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <h6 class="bank_dispach_file_tit">附件</h6>
          <div id="scfj" class="height_90"></div>

          <!--     附件     -->
          <!--    非跨行时：附件在 审批编号未生成时且当前环节为【填写审批单】才可上传修改    -->
          <el-row style="margin-left:100px" v-if="(formData.isKh==0)&&!isWeiHu">
            <el-col :span="22">
              <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
            </el-col>
          </el-row>
          <!--     跨行时附件域分     -->
          <el-row style="margin-left:100px" v-if="(formData.isKh==1)&&!isWeiHu">
            <el-col :span="22">
              <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
            </el-col>
          </el-row>

          <!--          非跨行附件-->
          <div v-if="formData.isKh=='0'">
            <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
              <el-form-item>
                <el-col :span="22">
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
                              @click="viewFile(item)"
                              :title="item.fileName"
                            >{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="upRow(index,QS)"
                                v-if="(formData.attchmentFileInfo.length>1)&&!isWeiHu"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index,QS)"
                                v-if="(formData.attchmentFileInfo.length>1)&&!isWeiHu"
                                :disabled="index==formData.attchmentFileInfo.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id,QS)"
                                v-if="!isWeiHu"
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
            </el-row>
          </div>
          <div v-else>
            <!--          请示单位附件-->
            <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
              <el-form-item style="marginLeft:-20px">
                <el-col>请示单位附件</el-col>
                <el-col :span="22">
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
                              @click="viewFile(item)"
                              :title="item.fileName"
                            >{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="upRow(index,QS)"
                                v-if="formData.attchmentFileInfo.length>1&&!isWeiHu"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index,QS)"
                                v-if="formData.attchmentFileInfo.length>1&&!isWeiHu"
                                :disabled="index==formData.attchmentFileInfo.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id,QS)"
                                :disabled="item.disabled"
                                v-if="isFileShow"
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
            </el-row>
            <!--          批转单位附件-->
            <el-row v-if="formData.attchmentFileInfoPZ&&formData.attchmentFileInfoPZ.length">
              <el-form-item style="marginLeft:-20px">
                <el-col>批转单位附件</el-col>
                <el-col :span="22">
                  <!--                <upload-file-ts :uploadConfig="uploadConfigPZ" @fileList="fileList"></upload-file-ts>-->
                  <div
                    class="tree_w"
                    v-if="formData.attchmentFileInfoPZ&&formData.attchmentFileInfoPZ.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in  formData.attchmentFileInfoPZ"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="numName">{{index+1}}.</span>
                            <span
                              class="name down"
                              @click="viewFile(item)"
                              :title="item.fileName"
                            >{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="upRow(index,PZ)"
                                v-if="formData.attchmentFileInfoPZ.length>1&&!isWeiHu"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index,PZ)"
                                v-if="formData.attchmentFileInfoPZ.length>1&&!isWeiHu"
                                :disabled="index==formData.attchmentFileInfoPZ.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id,PZ)"
                                :disabled="item.disabled"
                                v-if="!isWeiHu"
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
            </el-row>
            <!--          审批单位附件-->
            <el-row v-if="formData.attchmentFileInfoSP&&formData.attchmentFileInfoSP.length">
              <el-form-item style="marginLeft:-20px">
                <el-col>审批单位附件</el-col>
                <el-col :span="22">
                  <!--                <upload-file-ts :uploadConfig="uploadConfigSP" @fileList="fileList"></upload-file-ts>-->
                  <div
                    class="tree_w"
                    v-if="formData.attchmentFileInfoSP&&formData.attchmentFileInfoSP.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in  formData.attchmentFileInfoSP"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="numName">{{index+1}}.</span>
                            <span
                              class="name down"
                              @click="viewFile(item)"
                              :title="item.fileName"
                            >{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="upRow(index,SP)"
                                v-if="formData.attchmentFileInfoSP.length>1&&!isWeiHu"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index,SP)"
                                v-if="formData.attchmentFileInfoSP.length>1&&!isWeiHu"
                                :disabled="index==formData.attchmentFileInfoSP.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id,SP)"
                                v-if="!isWeiHu"
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
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
    <!--    <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart>-->
    <shiwuFlow :tableData="tableData" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
    <!--引入详情-->
    <el-dialog
      title="查看依据文件"
      :visible.sync="isdialogYRDeal"
      width="80%"
      height="300px"
      :before-close="YRhandleCloseDeal"
    >
      <div style="margin-top:4px">
        <el-form :model="YRDeal" label-width="160px">
          <el-form-item label="文号" style="width:80%;margin-top:16px;">
            <el-input v-model="YRDeal.orderNo" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="标题" style="width:80%;margin-top:16px;">
            <el-button type="text" @click="viewFile(YRDeal, '1')">{{YRDeal.title}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="YRhandleCloseDeal">取消</el-button>
      </span>
    </el-dialog>
    <!--    引入-->
    <el-dialog
      v-dialogDrag
      title="引入"
      :visible.sync="isdialogYR"
      width="40%"
      height="200px"
      :before-close="YRhandleClose"
    >
      <div style="margin-top:4px">
        <el-form ref="YRelForm" :rules="YRrules" :model="YRformData" label-width="160px">
          <el-form-item label="依据文件类型" prop="YRbusinName">
            <el-select v-model="YRformData.YRbusinName" style="width:73%">
              <el-option
                v-for="item in choobusiness"
                :key="item.idType"
                :label="item.name"
                :value="item.idType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件字号" prop="YRwenhao" style="width:80%;margin-top:16px;">
            <el-input v-model="YRformData.YRwenhao" @change="wenhaoChange"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="YRBacksure">确定</el-button>
        <el-button @click="YRhandleClose">取消</el-button>
      </span>
    </el-dialog>
    <!--    选择人员树-->
    <!--    <select-person-->
    <!--      :treeData="treeData"-->
    <!--      :loadingTree="true"-->
    <!--      :seletOptionsData="seletOptionsData"-->
    <!--      :offenUse="offenUse"-->
    <!--      :dialogType="dialogType"-->
    <!--      :dialogTypeNow="dialogTypeNow"-->
    <!--      dialogTit="选择共享用户"-->
    <!--      :checkIds="checkIds"-->
    <!--      :fromdata="formData"-->
    <!--      :checkData="checkData"-->
    <!--      :singelCheckF="singelCheckF"-->
    <!--      :dialogState="dialogState"-->
    <!--      @showCompDialog="showCompDialog"-->
    <!--    />-->
    <select-person
      v-model="dialogState"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :orgOrDeptId="currentUnitId"
    />
  </div>
</template>

<script type="text/ecmascript-6">
// import selectPerson from 'components/viewFlow/adminTreePer'
import selectPerson from "components/viewFlow/dispatchTree";
import flowChart from "components/dialog/flowChart";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import shiwucommon from "../minixs/shiwucommon"; //事物审批公共方法
import viewDraft from "@/minixs/viewDraft";
import exportTable from "../../../minixs/exportTable";
import uploadFileTs from "components/uploadFile/uploadFileTs";

export default {
  name: "qcDetail",
  components: {
    selectPerson,
    flowChart,
    shiwuFlow,
    uploadFileTs
  },
  mixins: [openOrDownLoadFile, shiwucommon, viewDraft],
  data() {
    return {
      extractFlag: 0,
      onFileFlag: 0,
      currentUnitId: "", //当前处理人机构
      blankMoundleName: "", //空白模板
      blankMoundlePath: "",
      isFileShow: false, //附件域显示
      isFileShowPZ: false, //附件域显示
      isFileShowSP: false, //附件域显示
      SP: "SP",
      QS: "QS",
      SP: "SP",
      id: "", //业务ID
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
        title:"",
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
        { name: "重新填写申请", show: true },
        { name: "处理申请", show: false },
        { name: "查看申请", show: true },
        { name: "重新流转", show: false },
        { name: "查看流程", show: true },
        { name: "打印处理单", show: true },
        { name: "收藏", show: true },
        { name: "维护", show: true },
        { name: "流程调度", show: true },
        { name: "归档", show: false },
        { name: "区块链归档", show: false }
      ],
      numyear: this.$route.query.numyear ? this.$route.query.numyear : ""
    };
  },
  computed: {},
  methods: {
    //办结单重新流转
    afreshFlow() {
      this.$confirm(
        "系统将删除办结库及待归档库中的办结文件,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          console.log("重新流转");
          this.$api.checkLz
            .afreFlow({ id: this.id, adminType: "admin" })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.queryDeal();
              }
            });
        })
        .catch(() => {});
    },
    YRhandleClose() {
      this.isdialogYR = false;
    },
    importBtn() {
      this.isdialogYR = true;
    },
    wenhaoChange() {},
    //引入依据确定
    YRBacksure() {
      this.formData.dataType = this.YRformData.YRbusinName;
      this.formData.documentNo = this.YRformData.YRwenhao;
      this.formData.currentUserOldId = this.humanId;
      let that = this;
      this.YRcheck &&
        this.YRcheck.map(item => {
          if (item.orderNo == that.YRformData.YRwenhao) {
            this.$message({
              type: "warning",
              message: "此文号已经被引入"
            });
            that.YRformData.YRwenhao = "";
          }
        });
      this.$refs["YRelForm"].validate(valid => {
        if (valid) {
          if (this.formData.dataType == "4") {
            this.$api.checkLz
              .importBas({
                documentNo: this.YRformData.YRwenhao,
                currentUserOldId: this.humanId,
                numYear: this.numyear
              })
              .then(res => {
                if (!res.result.id) {
                  this.$message({
                    type: "warning",
                    message: "没有找到相应文档"
                  });
                } else {
                  this.YRcheck.push({
                    orderNo: this.YRformData.YRwenhao,
                    dataType: "4",
                    dataId: res.result.id,
                    title: res.result.title,
                    filePath: res.data.filePath,
                    fileName: res.data.fileName
                  });
                  this.isdialogYR = false;
                }
              });
          } else if (this.formData.dataType == "1") {
            console.log("发文");
            let that = this;
            let obj = {
              function: "importBasis",
              multiTenancyId: "CN000",
              documentCode: this.YRformData.YRwenhao
            };
            this.$post
              .postData("importBasis", JSON.stringify(obj), "A0846C001")
              .then(res => {
                console.log("res", res);
                if (!res.data) {
                  this.$message({
                    type: "warning",
                    message: "没有找到相应文档"
                  });
                } else {
                  if (res.data.fileName && res.data.filePath) {
                    res.data.attachList.push({
                      fileName: res.data.fileName,
                      filePath: res.data.filePath
                    });
                  }
                  this.YRcheck.push({
                    orderNo: this.YRformData.YRwenhao,
                    dataType: "1",
                    dataId: res.data.id,
                    title: res.data.title,
                    file: res.data.attachList,
                    filePath: res.data.filePath,
                    fileName: res.data.fileName
                  });
                  this.isdialogYR = false;
                }
              });
          } else if (this.formData.dataType == "2") {
            console.log("收文");
            let that = this;
            let obj = {
              function: "importBasis",
              multiTenancyId: "CN001",
              documentCode: this.YRformData.YRwenhao
            };
            this.$post
              .postData("importBasis", JSON.stringify(obj), "A0846C003")
              .then(res => {
                console.log("res", res);
                if (!res.data) {
                  this.$message({
                    type: "warning",
                    message: "没有找到相应文档"
                  });
                } else {
                  this.YRcheck.push({
                    orderNo: this.YRformData.YRwenhao,
                    dataType: "2",
                    dataId: res.data.id,
                    title: res.data.title,
                    file: res.data.attachList,
                    filePath: res.data.filePath,
                    fileName: res.data.fileName
                  });
                  console.log("this.YRcheck", this.YRcheck);
                  this.isdialogYR = false;
                }
              });
          } else if (this.formData.dataType == "3") {
            console.log("签报");
            let that = this;
            let obj = {
              function: "importBasis",
              multiTenancyId: "CN002",
              documentCode: this.YRformData.YRwenhao
            };
            this.$post
              .postData("importBasis", JSON.stringify(obj), "A0846C005")
              .then(res => {
                console.log("res", res);
                if (!res.data) {
                  this.$message({
                    type: "warning",
                    message: "没有找到相应文档"
                  });
                } else {
                  this.YRcheck.push({
                    orderNo: this.YRformData.YRwenhao,
                    dataType: "3",
                    dataId: res.data.id,
                    title: res.data.title,
                    file: res.data.attachList,
                    filePath: res.data.filePath,
                    fileName: res.data.fileName,
                    zrType: res.data.orderType,
                    draftDepartmentId: res.data.draftDepartmentId
                  });
                  this.isdialogYR = false;
                }
              });
          }
        }
      });
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
      let AdepartmentName =
        JSON.parse(localStorage.getItem("userInfo")).shortUnitName +
        "/" +
        JSON.parse(localStorage.getItem("userInfo")).shortFirstUnitName;
      let AcreateUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AuserName = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD HH:MM:SS");
      switch (range) {
        case (range = "checkOpinionList"):
          this.formData.checkOpinionList.push({
            content: "",
            departmentId: this.formData.depId,
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "1"
          });
          break;
        case (range = "applyOpinionList"):
          this.formData.applyOpinionList.push({
            content: "",
            departmentId: this.formData.depId,
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "2"
          });
          break;
        case (range = "blqkOpinionList"):
          this.formData.blqkOpinionList.push({
            content: "",
            departmentId: this.formData.depId,
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "4"
          });
          break;
        case (range = "cyOpinionList"):
          this.formData.cyOpinionList.push({
            content: "",
            departmentId: this.formData.depId,
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "3"
          });
          break;
        case (range = "markList"):
          this.formData.markList.push({
            content: "",
            departmentId: this.formData.depId,
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
          this.$api.pubInfo
            .Lookcx({
              curProcessInstId: this.formData.workFlowId,
              subProcessInstId: this.formData.workFlowIds,
              numYear: this.numyear
            })
            .then(res => {
              console.log(res);
              this.showFlowChart = true;
              this.tableData = res.data;
              this.$nextTick(() => {
                this.$refs.dialogLine.openDialog();
              });
            });
          break;
        case "打印处理单":
          this.printForm();
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(() => {
            this.$api.checkLz
              .handleCollection({
                id: this.id,
                dataType: 1,
                docType: 1,
                numYear: this.numyear
              })
              .then(res => {
                this.downFile(res);
              });
          });
          // let that = this
          // let shiwutitle = (this.formData.unitName || this.formData.curbank) + this.formData.applyProjectName + '审批处理单'
          // let draftInfo = this.formData.xksqFilePath ? [].concat({
          //         fileName: this.formData.xksqFileName,
          //         filePath: this.formData.xksqFilePath
          //     },
          //     this.formData.attchmentFileInfo) : this.formData.attchmentFileInfo;//收藏时下载正文
          // exportTable.getPdf(shiwutitle, draftInfo, "shiwuzhifa", this.$businessCode.fawglfj, shiwutitle, that)
          break;
        case "流程调度":
          this.flowAlter();
          break;
        case "维护":
          this.isWeiHu = false;
          this.buttonList[1].show = true;
          this.buttonList[2].show = true;
          if (this.isWeiHu) {
            this.buttonList[4].show = true;
            this.buttonList[3].show = false;
          } else {
            this.buttonList[4].show = false;
            this.buttonList[3].show = true;
          }
          if (this.formData.currentNode === "办结") {
            this.buttonList[5].show = true;
            if (!this.onFileFlag) {
              this.buttonList[11].show = true;
            }
          }
          break;
        case "归档":
          //当前处理人机构为申请行机构方可执行归档操作
          if (
            this.formData.curbankId ==
            JSON.parse(localStorage.getItem("userInfo")).unitId
          ) {
            this.finishFile();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "当前登录人与处理人不一致，无法进行归档操作",
              duration: 500
            });
          }

          break;
        case "保存":
          this.saveData();
          break;
        case "查看申请":
          this.viewApply();
          break;
        case "处理申请":
          if(!this.formData.title) {
            this.formData.title = ""
          }
          this.writeApply();
          break;
        case "重新填写申请":
          this.saveData();
          let bank_doDownloadFile = { function: "doDownloadFile" };
          console.log("reTextMoudleName", this.formData.reTextMoudleName);
          console.log("reTextMoudlePath", this.formData.reTextMoudlePath);
          bank_doDownloadFile.fileName = this.formData.reTextMoudleName;
          bank_doDownloadFile.filePath = this.formData.reTextMoudlePath;
          console.log(
            "-------bank_doDownloadFile------->",
            bank_doDownloadFile
          );
          this.$post
            .postData(
              "doDownloadFile",
              JSON.stringify(bank_doDownloadFile),
              "A0846C071"
            )
            .then(res => {
              if (res && res.success) {
                res.ifView = 1;
                this.doDraft(res); //使用金格控件打开申请
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "下载失败",
                  duration: 500
                });
              }
            });
          break;
        case "重新流转":
          this.afreshFlow();
          break;
        case "区块链归档":
          this.blockChain();
          break;
      }
    },
    // 区块链归档
    blockChain() {
      if (this.onFileFlag == "1" || this.onFileFlag == 1) {
        this.$message.warning({
          message: "表单已设置为自动归档方式，不能使用区块链归档",
          typs: "warning"
        });
      } else {
        this.$api.checkLz
          .blockChain({
            id: this.id
          })
          .then(res => {
            this.$message({
              type: "success",
              offset: "200",
              message: "归档完成"
            });
          });
      }
    },
    finishFile() {
      let _self = this;
      this.$api.checkLz
        .handlefile({ id: this.id, numYear: this.numyear })
        .then(res => {
          _self.queryDeal();
        })
        .catch(res => {});
    },
    //申请跳转
    doDraft(fileInfo) {
      var userinfoUnitId = JSON.parse(localStorage.getItem("userInfo")).unitId
      var unitidFlag
      var saveDataSums
      if(userinfoUnitId != this.formData.ejhAttachid) {
        unitidFlag = true
        if(this.formData.applyNo) {
          saveDataSums= this.formData.applyNo
        } else {
          saveDataSums= this.formData.virtualApplyNo
        }
      } else {
        unitidFlag = false
        if(this.formData.approveNo) {
         saveDataSums= this.formData.approveNo
        }else {
          saveDataSums= this.formData.virtualApproveNo
        }
      }
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
          serverUrl: "128.192.221.164",
          saveNameAndNumber:
            (saveDataSums?saveDataSums
              : "") + this.formData.title
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    //处理申请
    writeApply() {
      this.ifView = 1;
      this.shiwuState = "viewFile";
      this.formData.handleButton = "保存";
      if (this.formData.xksqFileName) {
        //处理申请；先判断是否已经填写过申请（是则处理申请，否则填写申请）
        this.formData.id = this.id;
        let bank_doDownloadFile = { function: "doDownloadFile" };
        bank_doDownloadFile.fileName = this.formData.xksqFileName;
        bank_doDownloadFile.filePath = this.formData.xksqFilePath;
        this.$api.checkLz
          .checkLzAlter(
            //跳转金格之前先保存表单数据
            { ...this.formData, adminType: "admin" }
          )
          .then(res => {
            //表单数据保存成功后，通过文件名与文件地址找到服务器相应的文件名并用金格控件打开
            this.$post
              .postData(
                "doDownloadFile",
                JSON.stringify(bank_doDownloadFile),
                "A0846C071"
              )
              .then(res => {
                if (res && res.success) {
                  res.ifView = 1;
                  this.doDraft(res); //使用金格控件打开申请
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "下载失败",
                    duration: 500
                  });
                }
              });
          });
      } else if (this.formData.textMoudleName || this.formData.textMoudlePath) {
        //首次填写模板
        if (this.id) {
          this.formData.id = this.id;
          let bank_doDownloadFile = { function: "doDownloadFile" };
          bank_doDownloadFile.fileName = this.formData.textMoudleName;
          bank_doDownloadFile.filePath = this.formData.textMoudlePath;
          this.$api.checkLz
            .checkLzAlter({ ...this.formData, adminType: "admin" })
            .then(res => {
              let shiwu = { id: this.id, isKh: this.formData.isKh.toString() };
              let shuwuJSON = JSON.stringify(shiwu);
              this.$post
                .postData(
                  "doDownloadFile",
                  JSON.stringify(bank_doDownloadFile),
                  "A0846C071"
                )
                .then(res => {
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
                });
            });
        } else {
          let bank_doDownloadFile = { function: "doDownloadFile" };
          bank_doDownloadFile.fileName = this.formData.textMoudleName;
          bank_doDownloadFile.filePath = this.formData.textMoudlePath;
          this.$api.checkLz
            .checkLzCreate({ ...this.formData, handleButton: "保存" })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.id = res.id;
                this.queryDeal();
                this.createFile();
                let shiwu = {
                  id: this.id,
                  isKh: this.formData.isKh.toString()
                };
                let shuwuJSON = JSON.stringify(shiwu);
                sessionStorage.setItem("shiwuId", shuwuJSON);
                this.$post
                  .postData(
                    "doDownloadFile",
                    JSON.stringify(bank_doDownloadFile),
                    "A0846C071"
                  )
                  .then(res => {
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
                  });
              }
            });
        }
      } else {
        this.$message({
          type: "warning",
          message: "暂无文档"
        });
      }
    },
    //查看申请
    viewApply() {
      if (!this.formData.xksqFileName && !this.formData.xksqFilePath) {
        this.$message({
          type: "warning",
          message: "此文档没有申请文档"
        });
        return;
      }
      let that = this;
      let file = {
        fileName: this.formData.xksqFileName,
        filePath: this.formData.xksqFilePath
      };
      var userinfoUnitId = JSON.parse(localStorage.getItem("userInfo")).unitId
      var unitidFlag
      var saveDataSums
      if(userinfoUnitId != this.formData.ejhAttachid) {
        unitidFlag = true
        if(this.formData.applyNo) {
          saveDataSums= this.formData.applyNo
        } else {
          saveDataSums= this.formData.virtualApplyNo
        }
      } else {
        unitidFlag = false
        if(this.formData.approveNo) {
         saveDataSums= this.formData.approveNo
        }else {
          saveDataSums= this.formData.virtualApproveNo
        }
      }
      this.viewFile(
        file,
        true,
        (saveDataSums) + this.formData.title
      );
    },
    saveData() {
      if(!this.YRcheck) {
        this.YRcheck = []
      }
      this.formData.id = this.id;
      this.formData.infoList = this.YRcheck;
      if(!this.formData.checkOpinionList) {
        this.formData.checkOpinionList = []
      }
      if(!this.formData.applyOpinionList) {
        this.formData.applyOpinionList = []
      }
      if(!this.formData.blqkOpinionList) {
        this.formData.blqkOpinionList = []
      }
      if(!this.formData.cyOpinionList) {
        this.formData.cyOpinionList = []
      }
      this.formData.opinionList = [
        ...this.formData.checkOpinionList,
        ...this.formData.applyOpinionList,
        ...this.formData.blqkOpinionList,
        ...this.formData.cyOpinionList
      ];
      this.$api.checkLz
        .adminLzSave({ ...this.formData, adminType: "admin" })
        .then(res => {
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
          id: this.id,
          adminType: "admin"
        })
        .then(res => {
          this.dialogState = true;
          this.treeData.push(res.data);
          this.seletOptionsData = res.list;
        });
    },
    //打印处理单
    printForm() {
      let rowData = { numYear: this.numyear };
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
          id: this.id,
          adminType: "admin"
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
          isKh: this.khType,
          curbankId: this.$route.query.curbankId,
          adminType: "admin",
          numYear: this.numyear
        })
        .then(res => {
          this.currentUnitId = res.currentUnitId;
          //引入依据
          this.YRcheck = res.leadInfoList;
          this.formData = res.data;
          this.formData.workFlowIds = res.workFlowIds;

          //是否归档，是否抽取字段重新赋值
          if (this.formData.onFileFlag == "1") {
            this.onFileFlag = 1;
            this.extractFlag = 1;
          } else {
            this.onFileFlag = 0;
            this.extractFlag = 0;
          }

          if (this.formData.currentNode == "办结" && res.isNewSwspFilePlace) {
            this.buttonList[12].show = true;
          } else {
            this.buttonList[12].show = false;
          }
          this.$nextTick(() => {
            //新增意见部门及ID
            this.formData.depName = res.departName;
            this.formData.depId = res.departId;
            this.$set(this.formData, "applyOpinionList", res.applyOpinionList);
            this.$set(this.formData, "sytyOpinionList", res.sytyOpinionList);
            this.$set(this.formData, "cyOpinionList", res.cyOpinionList);
            this.$set(this.formData, "blqkOpinionList", res.blqkOpinionList);
            this.$set(this.formData, "checkOpinionList", res.checkOpinionList);
            this.$set(this.formData, "markList", res.markList);
          });
          this.formData.reTextMoudleName = res.textMoudleName;
          this.formData.reTextMoudlePath = res.textMoudlePath;
          this.formData.manageSystemName = res.manageSystemName;
          this.formData.manageSystemPath = res.manageSystemPath;
          //正文模板
          if (res.data.xksqFileName) {
            console.log("保存申请项目");
            this.formData.xksqFileName = res.data.xksqFileName;
            this.formData.xksqFilePath = res.data.xksqFilePath;
          } else {
            console.log("不保存申请项目");
            this.formData.textMoudleName = res.textMoudleName;
            this.formData.textMoudlePath = res.textMoudlePath;
            this.formData.textMoudleId = res.textMoudleId;
          }
          if (this.formData.isKh) {
            this.formData.isKh = parseInt(this.formData.isKh);
          }
          if (this.formData.finishTime) {
            this.buttonList[10].show = false;
          } else {
            this.buttonList[10].show = true;
          }
          this.uploadConfig.id = res.data.id;
          if (this.formData.isKh == "0") {
            console.log("isKh", this.formData.isKh);
            this.uploadConfig.isSpecial = 0;
          } else if (this.formData.isKh == "1") {
            if (
              this.formData.currentNode == "填写审批单" ||
              res.user.unitId == res.data.curbankId
            ) {
              this.uploadConfig.isSpecial = 1001;
              this.isFileShow = true;
              this.isFileShowPZ = false;
              this.isFileShowSP = false;
            } else if (
              res.user.unitId == res.applyUpUnitId &&
              res.user.unitId != res.manageBankId
            ) {
              this.uploadConfig.isSpecial = 1002;
              this.isFileShow = false;
              this.isFileShowPZ = true;
              this.isFileShowSP = false;
            } else if (res.user.unitId == res.manageBankId) {
              this.uploadConfig.isSpecial = 1003;
              this.isFileShow = false;
              this.isFileShowPZ = false;
              this.isFileShowSP = true;
            }
          }

          this.getFileList();
          setTimeout(() => {
            this.checkLzDealChai()
          }, 0);
        });
    },
    // 拆分详情新街口
    checkLzDealChai() {
      this.$api.checkLz
        .checkLzDealChai({ id: this.id, isKh: this.khType,numYear:this.numyear })
        .then(res=>{
          console.log('拆分接口',res)
          this.formData = {...this.formData,...res}
        })
    },
    handleClose() {
      this.isdialog = false;
    },
    //收回
    lzRegin() {
      this.$api.checkLz
        .LZretrieve({
          id: this.id,
          avyId: this.rowData.avyId,
          adminType: "admin"
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
    //引入删除
    importDle(item) {
      if (item && item.id) {
        this.$api.checkLz
          .accordDelete({
            id: item.id,
            dataId: this.id
          })
          .then(res => {
            this.queryDeal();
          });
      } else {
        let currentIndex = 0;
        for (let i = 0; i < this.YRcheck.length; i++) {
          if (this.YRcheck[i].dataId == item.dataId) {
            currentIndex = i;
          }
        }
        this.YRcheck.splice(currentIndex, 1);
      }
    },
    //附件上传
    //附件块
    fileList(files) {
      let that = this;
      console.log("-----files----->", files, this.formData.isKh);
      if (this.formData.isKh == "0") {
        if (
          this.formData.attchmentFileInfo &&
          this.formData.attchmentFileInfo.length > 0
        ) {
          this.formData.attchmentFileInfo.push(...files);
        } else {
          this.$set(this.formData, "attchmentFileInfo", files);
          console.log("----111111", this.formData.attchmentFileInfo);
          this.$forceUpdate();
        }
      } else {
        if (this.isFileShow) {
          if (
            this.formData.attchmentFileInfo &&
            this.formData.attchmentFileInfo.length
          ) {
            this.formData.attchmentFileInfo.push(...files);
          } else {
            this.$set(this.formData, "attchmentFileInfo", files);
          }
        } else if (this.isFileShowPZ) {
          if (
            this.formData.attchmentFileInfoPZ &&
            this.formData.attchmentFileInfoPZ.length
          ) {
            this.formData.attchmentFileInfoPZ.push(...files);
          } else {
            this.formData.attchmentFileInfoPZ = files;
          }
        } else if (this.isFileShowSP) {
          if (
            this.formData.attchmentFileInfoSP &&
            this.formData.attchmentFileInfoSP.length
          ) {
            this.formData.attchmentFileInfoSP.push(...files);
          } else {
            this.formData.attchmentFileInfoSP = files;
          }
        } else {
          this.isFileShow = true;
          this.isFileShowPZ = false;
          this.isFileShowSP = false;
          if (
            this.formData.attchmentFileInfo &&
            this.formData.attchmentFileInfo.length
          ) {
            this.formData.attchmentFileInfo.push(...files);
          } else {
            this.formData.attchmentFileInfo = files;
          }
        }
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
      let that = this;
      if (!this.formData.isKh) {
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            numYear: this.numyear
            // fileType:'1001'
          })
          .then(res => {
            that.$nextTick(() => {
              that.$set(that.formData, "attchmentFileInfo", res.data);
              that.$set(that.uploadConfig, "filesHas", res.data);
            });
          });
      } else {
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            fileType: "1001",
            numYear: this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfo", res.data);
              this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            fileType: "1002",
            numYear: this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfoPZ", res.data);
              this.uploadConfig.filesHas = this.formData.attchmentFileInfoPZ;
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            fileType: "1003",
            numYear: this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfoSP", res.data);
              this.uploadConfig.filesHas = this.formData.attchmentFileInfoSP;
            });
          });
      }
    },
    // 附件上传下载排序
    // 附件上传下载排序
    upRow(n, huanjie) {
      let midObj;
      let attachSort = [];
      switch (huanjie) {
        case "QS":
          attachSort.push(
            {
              id: this.formData.attchmentFileInfo[n - 1].id,
              sort: this.formData.attchmentFileInfo[n].sort
            },
            {
              id: this.formData.attchmentFileInfo[n].id,
              sort: this.formData.attchmentFileInfo[n - 1].sort
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
            .then(res => {
              if (this.id) {
                this.getFileList();
              }
            });
          break;
        case "PZ":
          attachSort.push(
            {
              id: this.formData.attchmentFileInfoPZ[n - 1].id,
              sort: this.formData.attchmentFileInfoPZ[n].sort
            },
            {
              id: this.formData.attchmentFileInfoPZ[n].id,
              sort: this.formData.attchmentFileInfoPZ[n - 1].sort
            }
          );
          midObj = this.formData.attchmentFileInfoPZ[n];
          this.formData.attchmentFileInfoPZ[
            n
          ] = this.formData.attchmentFileInfoPZ[n - 1];
          this.formData.attchmentFileInfoPZ[n - 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {
              if (this.id) {
                this.getFileList();
              }
            });
          break;
        case "SP":
          attachSort.push(
            {
              id: this.formData.attchmentFileInfoSP[n - 1].id,
              sort: this.formData.attchmentFileInfoSP[n].sort
            },
            {
              id: this.formData.attchmentFileInfoSP[n].id,
              sort: this.formData.attchmentFileInfoSP[n - 1].sort
            }
          );
          midObj = this.formData.attchmentFileInfoSP[n];
          this.formData.attchmentFileInfoSP[
            n
          ] = this.formData.attchmentFileInfoSP[n - 1];
          this.formData.attchmentFileInfoSP[n - 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {
              if (this.id) {
                this.getFileList();
              }
            });
          break;
      }
    },
    downRow(n, huanjie) {
      let midObj;
      let attachSort = [];
      console.log(n, "huanjie", huanjie);
      switch (huanjie) {
        case "QS":
          attachSort.push(
            {
              id: this.formData.attchmentFileInfo[n + 1].id,
              sort: this.formData.attchmentFileInfo[n].sort
            },
            {
              id: this.formData.attchmentFileInfo[n].id,
              sort: this.formData.attchmentFileInfo[n + 1].sort
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
            .then(res => {
              if (this.id) {
                this.getFileList();
              }
            });
          break;
        case "PZ":
          attachSort.push(
            {
              id: this.formData.attchmentFileInfoPZ[n + 1].id,
              sort: this.formData.attchmentFileInfoPZ[n].sort
            },
            {
              id: this.formData.attchmentFileInfoPZ[n].id,
              sort: this.formData.attchmentFileInfoPZ[n + 1].sort
            }
          );
          midObj = this.formData.attchmentFileInfoPZ[n];
          this.formData.attchmentFileInfoPZ[
            n
          ] = this.formData.attchmentFileInfoPZ[n + 1];
          this.formData.attchmentFileInfoPZ[n + 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {
              if (this.id) {
                this.getFileList();
              }
            });
          break;
        case "SP":
          attachSort.push(
            {
              id: this.formData.attchmentFileInfoSP[n + 1].id,
              sort: this.formData.attchmentFileInfoSP[n].sort
            },
            {
              id: this.formData.attchmentFileInfoSP[n].id,
              sort: this.formData.attchmentFileInfoSP[n + 1].sort
            }
          );
          midObj = this.formData.attchmentFileInfoSP[n];
          this.formData.attchmentFileInfoSP[
            n
          ] = this.formData.attchmentFileInfoSP[n + 1];
          this.formData.attchmentFileInfoSP[n + 1] = midObj;
          this.$forceUpdate();
          this.$api.setSysConfig
            .sortFile({ attachSort: PJF.util.json2str(attachSort) })
            .then(res => {
              if (this.id) {
                this.getFileList();
              }
            });
          break;
      }
    },
    deleteRow(n, id, huanjie) {
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
              switch (huanjie) {
                case "QS":
                  this.formData.attchmentFileInfo.splice(n, 1);
                  this.$forceUpdate();
                  this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
                  break;
                case "PZ":
                  this.formData.attchmentFileInfoPZ.splice(n, 1);
                  this.$forceUpdate();
                  this.uploadConfig.filesHas = this.formData.attchmentFileInfoPZ;
                  break;
                case "SP":
                  this.formData.attchmentFileInfoSP.splice(n, 1);
                  this.$forceUpdate();
                  this.uploadConfig.filesHas = this.formData.attchmentFileInfoSP;
                  break;
              }
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
      let that = this;
      if (this.formData.manageSystemName) {
        let file = {
          fileName: this.formData.manageSystemName,
          filePath: this.formData.manageSystemPath
        };
        this.viewFile(file, true);
      } else {
        this.$message({
          type: "warning",
          message: "暂无审批说明文档"
        });
      }
    },
    //消息提醒
    messageWarn(userId) {
      this.$api.meeting
        .infoRemind({
          userId: userId, //完成并发送选择的人员用户ID（humanID)
          productCode: "shiWSP", //项目编号（对应字典（提醒项目分类））
          urgentType: "", //紧急程度（部分功能有）
          infoType: "事务审批", //类型（模块名称中文（例如 收文，发文））
          infoTitle: this.approvalTitle, //业务标题
          infoUser: this.formData.currentUser //当前操作人名称
        })
        .then(res => {})
        .catch(err => {});
    },
    //选人成功
    // showCompDialog(data, status, type, params, dtype){
    //     console.log('data', data, 'status', status, 'type', type, 'params', params, 'dtype', dtype);
    // },
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
              currentNode: params.name,
              adminType: "admin"
            })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.$intent.closeWindow(this);
                this.messageWarn(data[0].idStr);
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
              currentCode: "制发",
              adminType: "admin"
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
    this.$set(
      this.formData,
      "approveTime",
      formatData(new Date().getTime(), "YYYY-MM-DD")
    );
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(() => {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
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
  // background: white;
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
      border: 1px solid #f60;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;

          span {
            color: #f60;
          }
        }
      }
      el-button span {
        color: #fff !important;
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
</style>
<style lang="less" rel="stylesheet/less">
.el-message-box__btns .el-button:last-child {
  transform: translateX(-68px) !important;
}
</style>