<template>
  <div id="receiveBjYb" class="receive_dispatch">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>

          <el-button size="small" @click="savedata" plain class="bank_grid_comtent_active">保存</el-button>
          <el-button
            size="small"
            @click="handleEdit"
            plain
            class="bank_grid_comtent_active"
            v-if="isSave"
          >编辑</el-button>
          <el-button size="small" plain @click="processSheet('/sponsor')">打印</el-button>
          <!-- <el-button size="small" plain @click="caozuozhinan">操作指南</el-button> -->
        </div>
      </el-col>
    </el-row>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <!-- <h3 class="bank_dispach_tit" v-if="isSupervise == 1">中国建设银行公文督查办单</h3>
      <h3 class="bank_dispach_tit" v-else>中国建设银行实物收文处理单</h3>-->
      <h3 class="bank_dispach_tit">主办下级行请示事项办理情况</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >表单要素</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >统计信息</a>
        <!-- <a
          href="javascript:void(0);"
          :class="active == '#cyxx' ? 'active' : ''"
          @click="toTarget('#cyxx')"
        >传阅信息</a>
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>-->
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form
            ref="formData"
            label-width="130px"
            :model="formData"
            :rules="rules"
            class="demo_ruleForm"
          >
            <!-- :disabled="true" -->
            <!-- 当前环节注释 -->
            <div class="bank_dispach_annotation" :class="{bank_db_height:isSupervise == 1}">
              <el-row>
                <el-col :span="10" style="display:flex">
                  <!-- <p class="bank_dispach_annotation_current">
                    当前环节：
                    <span>{{curNodeName}}</span>
                  </p>-->
                  <p v-if="formData.curNodeCode!=800" class="bank_dispach_annotation_current">
                    当前处理人：
                    <span>{{curUser}}</span>
                  </p>
                </el-col>
              </el-row>
            </div>

            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="是否办结" prop="isEnd">
                  <el-radio-group v-model="formData.isEnd">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="是否纳入统计">
                  <el-radio-group v-model="formData.spbankIsUse">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>-->
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="收文时间">
                  <el-input v-model="formData.receiveTime"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文号">
                  <el-input v-model="formData.documentCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文单位">
                  <el-input v-model="formData.sendOrgName"></el-input>
                  <!-- sendOrgName -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="紧急程度">
                  <el-input v-model="formData.emergencyName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="标题">
                  <el-input v-model="formData.title"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="主题词">
                  <el-input v-model="formData.topic"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="承办部门">
                  <el-row>
                    <el-col :span="10">
                      <el-input v-model="formData.undertakeDeptName"></el-input>
                    </el-col>
                    <el-col :span="2">
                      <el-button
                        type="btn"
                        style="float:right;margin-right: 66px"
                        @click="Browse(1)"
                      >选择</el-button>
                    </el-col>

                    <el-col :span="10">
                      <el-form-item label="归档部门" prop="archiveDeptName">
                        <el-input v-model="formData.archiveDeptName"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="2">
                      <el-button class="btn" style="float:right" @click="Browse(2)">选择</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="督办时间">
                  <el-input v-model="formData.superviseDate"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办理期限">
                  <el-input v-model="formData.limitDate"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="办理状态">
                  <el-input v-model="formData.progress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办结时间">
                  <el-input v-model="formData.undertakeEndTime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="发送协办时间">
                  <el-input v-model="formData.xbStartTime"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束协办时间">
                  <el-input v-model="formData.xbEndTime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div>
              <span style="margin-left: 72px">协办</span>
              <div style="margin-left: 124px">
                <el-row>
                  <el-col>
                    <!-- subProcessList -->
                    <el-table :data="hYData" border ref="multipleTable" style="width:100%">
                      <el-table-column
                        prop="assistDeptName"
                        label="协办部门"
                        align="center"
                        width="585"
                      ></el-table-column>
                      <el-table-column
                        prop="assistStartTime"
                        label="协办开始时间"
                        align="center"
                        width="585"
                      ></el-table-column>
                      <el-table-column
                        prop="assistEndTime"
                        label="协办结束时间"
                        align="center"
                        width="600"
                      ></el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="办公室批办意见" prop="officeOpinion" ref="officeOpinion">
                  <div v-for="item in formData.officeOpinionList" :key="item.id">
                    <div v-if="item.status" class="fix_height">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=formData.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
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
                          v-if="item.createTime ==formData.opinionMaxTime&&item.userId==nowUserId&&item.nodeCode==formData.curNodeCode"
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
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      style="flex:1"
                      resize="none"
                      @input="changeDage($event)"
                      maxlength="500"
                      autosize
                      v-model="formData.officeOpinion"
                      :disabled="editedIdeaFields.officeOpinion"
                      v-if="!editedIdeaFields.officeOpinion  || (editedIdeaFields.officeOpinion && !(formData.officeOpinionList && formData.officeOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=2)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-show="!editedIdeaFields.officeOpinion"
                    >
                      <i class="el-icon-plus"></i>
                    </button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <!-- <el-form-item label="承办部门办理情况">
                  <el-input v-model="formData.undertakeOrgOpinionList" disabled="true"></el-input>
                </el-form-item>-->
                <el-form-item label="协办部门办理情况">
                  <div v-for="item in formData.undertakeOrgOpinionList" :key="item.id">
                    <div v-if="item.status" class="fix_height">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=formData.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
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
                          v-if="item.createTime ==formData.opinionMaxTime&&item.userId==nowUserId&&item.nodeCode==formData.curNodeCode"
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
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    v-if="formData.undertakeOrgOpinionList==''||!formData.undertakeOrgOpinionList"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <!-- <el-col> -->
                <el-form-item label="办结情况">
                  <div v-for="(item) in formData.handleTerminateOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=formData.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
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
                          v-if="item.createTime ==formData.opinionMaxTime&&item.userId==nowUserId&&item.nodeCode==formData.curNodeCode"
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

                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      @input="changeDage($event)"
                      autosize
                      v-model="formData.handleTerminateOpinion"
                      :disabled="editedIdeaFields.handleTerminateOpinion"
                      v-if="!editedIdeaFields.handleTerminateOpinion  || (editedIdeaFields.handleTerminateOpinion && !(formData.handleTerminateOpinionList && formData.handleTerminateOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=3)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-show="!editedIdeaFields.handleTerminateOpinion"
                    >
                      <i class="el-icon-plus"></i>
                    </button>
                  </div>
                </el-form-item>
                <!-- </el-col> -->
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <!-- <el-form-item label="备注">
                  <el-input v-model="formData.remarksList" disabled="true"></el-input>
                </el-form-item>-->

                <el-col>
                  <el-form-item label="备    注">
                    <div v-for="(item) in formData.remarksList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=formData.opinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea"
                              resize="none"
                              autosize
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
                            v-if="item.createTime ==formData.opinionMaxTime&&item.userId==nowUserId&&item.nodeCode==formData.curNodeCode"
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
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      @input="changeDage($event)"
                      autosize
                      v-model="formData.remarks"
                      :disabled="editedIdeaFields.remarks"
                      v-if="!editedIdeaFields.remarks||(editedIdeaFields.remarks && !(formData.remarksList && formData.remarksList.length))"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="催办信息">
                  <el-input v-model="formData.cbRecord"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="催办次数">
                  <el-input v-model="formData.cbCount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="首次催办信息">
                  <el-input v-model="formData.cbFirstTime"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="末次催办时间">
                  <el-input v-model="formData.cbLastTime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div>
              <div style="margin-left: 49px">流程记录</div>
              <div style="margin-left: 124px">
                <el-row>
                  <el-col>
                    <el-table :data="lcData" border ref="multipleTable" style="width: 100%">
                      <el-table-column type="index" width="100" label="序号"></el-table-column>
                      <el-table-column prop="nodeName" label="处理环节" align="center" width="410"></el-table-column>
                      <el-table-column prop="completeTime" label="操作时间" align="center" width="410"></el-table-column>
                      <el-table-column prop="operatorName" label="处理人" align="center" width="410"></el-table-column>
                      <el-table-column prop="operation" label="处理记录" align="center" width="410"></el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </div>
            </div>

            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">统计信息</h6>
            <div id="qpyj" class="height_90"></div>
            <el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="发送协办时间_最早">
                    <el-input v-model="formData.xbStartTime"></el-input>
                    <!-- <el-select style="width:100%">
                      <el-option v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
                    </el-select>-->
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="协办次数">
                    <el-input v-model="formData.xbCount"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="发送协办时间_统计">
                    <el-input v-model="formData.xbStartTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结束协办时间_统计">
                    <el-input v-model="formData.xbEndTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="协办反馈用时">
                    <el-input v-model="formData.xbDisposeDuration"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="督办时间_统计">
                    <el-input v-model="formData. superviseDate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="办结时间_统计">
                    <el-input v-model=" formData.undertakeEndTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="处理工作日">
                    <el-input v-model="formData.disposeDuration"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="承办部门_类型">
                    <el-input v-model="formData.undertakeDeptName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主办部门处理用时">
                    <el-input v-model="formData.undertakeDisposeDuration"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主办部门处理用时占比">
                    <el-input v-model="formData.zbDeptRate"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div>
                <div>协办部门_类型</div>
                <div style="width: 93%;margin-left: 129px">
                  <el-row>
                    <el-col>
                      <el-table :data="hYData" border ref="multipleTable" style="width: 100%">
                        <el-table-column
                          prop="assistDeptName"
                          label="协办部门"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="assistStartTime"
                          label="协办开始时间"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="assistEndTime"
                          label="协办结束时间"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="assistDisposeDuration"
                          label="协办部门处理用时"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="assistTimeRate"
                          label="协办部门处理用时占比"
                          align="center"
                        ></el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <treeCofig
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
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>-->
    <org-tree v-model="showOrgTree" title="选择部门" :selectDept="selectDept" @orgList="getOrgList"></org-tree>
    <org-tree
      v-model="showOrgTree1"
      title="选择统计部门"
      :selectDept="selectDept1"
      @orgList="getOrgList1"
      :isSingle="false"
    ></org-tree>
    <!-- 期限鉴定表 -->
    <el-dialog title="期限鉴定表" :visible.sync="dialogVisible" width="50%">
      <m-table
        size="medium"
        :isSelection="false"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        :highlightcurrentrow="true"
        @handleTableCurrentChange="handleCurrentChange"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :page-sizes="[10,15,20,25,30]"
      ></m-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import appendWriteList from "../../components/appendWriteList/appendWriteList";
import treeCofig from "../../components/tree/tree-fawen";
import mTable from "components/table/mTable.vue";
import timeDialog from "@/components/timedialog/timedialog";
import uploadFiles from "@/components/uploadFile/uploadFile";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft";
import orgTree from "components/tree/orgTree"; //部门选择组件
const tableCol = [
  { label: "选择条目", prop: "mark", align: "center" },
  { label: "自动鉴定期限", prop: "limitDate", align: "center" }
];

export default {
  name: "ReceiveDispatch",
  components: {
    appendWriteList,
    treeCofig,
    mTable,
    timeDialog,
    uploadFiles,
    orgTree
  },
  mixins: [viewDraft],
  data() {
    return {
      actionType: "",
      selectedit: true,
      showOrgTree: false,
      showOrgTree1: false,
      hYData: [],
      selectDept: [],
      selectDept1: [],
      isSave: false,
      dialogVisibleShouuhi: false, //收回确定弹窗
      fkfj: [], //反馈附件
      fkfjList: [], //反馈附件
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: []
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      showduban: true,
      dubanhtml: "督办",
      isSupervise: "",
      shData: [], //收回数据
      checkedsh: [], //收回列表
      fasongCheckData: [], //fasong
      pagination: {
        pagNum: 1,
        total: 10,
        pageSize: 10
      },
      //tree
      dialogVisibleTree: false,
      treeData: [],
      defaultProps: {
        children: [],
        label: "name",
        isLeaf: "leaf"
      },
      treeForm: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: true
      },
      readFlag: "",
      tableLoading: false,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      deleteIds: "",
      tableCols: tableCol,
      curNodeName: "",
      referForm: {
        function: "selectQXHDBPage",
        page: 1,
        limit: 10
      },
      timeShow: false, //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      getJDBDropDownDataSource: {
        function: "selectSuperviseTjById"
      },
      //办结
      banjie_fn: {
        function: "doFinish",
        moduleType: "receive_doc_sw"
      },
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      //实物收文下拉数据源
      getReceiveDropDownDataSource: {
        function: "getReceiveDropDownDataSource"
      },
      //xiaoM 会签 true 主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      //承办部门树
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //确定完成并发送
      bank_doSend: {
        function: "finishAndSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },
      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "001",
        tplNo: "",
        // curMultiTenancyId: "CN000"
        multiTenancyId: ""
      },
      bank_sendXb: {
        function: "createHelpSubWf",
        processInstId: "",
        multiTenancyId: "",
        pcsAvyId: "",
        tplNo: "",
        moduleType: "receive_doc_sw",
        curNodeCode: "",
        deptIds: "",
        deptNames: "",
        id: "",
        avyds: ""
      },
      showCy: true, //传阅都没有意见的显示
      curUser: "",
      curNode: "",
      clickTypes: "",
      appendWriteDialog: true,
      swglCode: this.$businessCode.swgl,
      swglggCode: this.$businessCode.swglgg,
      ggjyCode: this.$businessCode.ggywgn,
      receiveselect: {
        function: "selectSuperviseTjById",
        id: ""
      },
      saveOrUpdateSW: {
        function: "saveOrUpdateSW",
        id: ""
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      lcData: [],
      //直发文件是否
      directFlag: false,
      formData: {
        isEnd: "", // 是否办结
        isStatis: "", // 是否纳入统计
        receiveTime: "", // 收文时间
        documentCode: "", // 收文字号
        sendOrgId: "", // 来文单位
        sendOrgName: "",
        emergencyName: "", // 紧急程度
        title: "", // 标题
        topic: "", // 主题词
        undertakeDeptId: "", // 承办部门ID
        undertakeDeptName: "", // 承办部门名称
        archiveDeptId: "", // 归档部门ID
        archiveDeptName: "", // 归档部门名称
        superviseDate: "", // 督办日期
        limitDate: "", // 办理期限
        progress: "", // 办理进度
        undertakeEndTime: "", // 承办结束时间
        xbStartTime: "", // 协办开始时间
        xbEndTime: "", // 协办结束时间
        cbRecord: "", // 催办记录
        cbCount: "", // 催办次数
        cbFirstTime: "", // 首次催办时间
        cbLastTime: "", // 末次催办时间
        xbCount: "", // 协办次数
        xbDisposeDuration: "", // 协办反馈用时
        disposeDuration: "", // 处理工作日
        undertakeDisposeDuration: "", // 主办部门办理时长
        helpFlag: "", // 协办标志：有协办，无协办
        curUser: "", // 当前处理人
        orgId: "", // 收文单位（不包含部门）
        orgName: "", // 收文单位（不包含部门）
        receiveOrgId: "", // 收文单位ID(包含部门)
        receiveOrgName: "", // 收文单位名称
        zbDeptRate: "", //主办部门用时占比
        undertakeDeptName: "",
        assistDisposeDuration: "", // 协办部门处理用时
        documentTitle: "主办下级行请示事项办理情况",
        undertakeOrgOpinionList: "",
        officeOpinionList: ""
        // secretFlagType: "",
        // secretLimitType: "",
        // assistDeptName: "",
        // attachSort: [],
        // attchmentFileInfo: [],
        // receiveVersion: "",
        // curNodeCode: "",
        // isHasCB: "", //1-有未办结的承办，显示增发收回催办，0-无未办结的承办 隐藏增发收回催办
        // isHasXB: "",
        // limitDate: "", //办理期限
        // progress: "", //办理进度
        // daysInAdvance: "", // 提前提醒天数
        // superviserName: "", //督办人
        // superviseDate: "", //督办日期
        // direct_send_range: "", //直发范围
        // keepLimitName: "", //保管期限
        // secret_flag_type: "", //秘密标志类型
        // undertakeDeptName: "",
        // processInstId: "", //流程实例标识
        // tplNo: "", //模板编号
        // multiTenancyId: "", //多实体标识
        // pcsAvyId: "", //流程活动标示
        // pishiOpinion: "", //批示意见
        // isDirect: "0", // 是否直发
        // forwordRequirements: "",
        // isForword: "0", //转发文件
        // title: "",
        // sendSubId: "", //发送对象id
        // sendSubName: "", //发送对象名称
        // attachmentTitle: "",
        // receiveTime: "",
        // emergencyName: "",
        // documentCode: "",
        // secretType: "",
        // security: "",
        // secretLimitName: "",
        // sendOrgName: "",
        // completeTime: "",
        // receiveType: "",
        // userName: "",
        // isForword: "",
        // isDirect: "",
        // directRange: "",
        // directType: "",
        // keepLimitName: ""
      },
      selectContents: {
        businessSecretFlagType: "", //商业秘籍
        countrySecretFlagType: "", //国家密级
        directSendType: "", //直发文种类
        emergencyLevel: "", //紧急程度
        receiveType: "",
        secretTimeType: "", //保密期限类型
        secretType: "" //秘密类型
      },
      transIds: "",
      rules: {},
      copyRules: {
        undertakeDeptName: [
          { trigger: "change", required: true, message: "请选择承办部门" }
        ]
      },
      editedIdeaFields: {
        remarks: true,
        pishiOpinion: true,
        officeOpinion: true,
        undertakeOrgOpinion: true,
        handleTerminateOpinion: true,
        helpOrgOpinion: true
      },
      allowBack: "", //收回按钮的判断
      sendIds: [],
      shdialogType: "", //是收回还是催办
      shdialogTypeUnder: "", //是收回还是催办是否加字段
      tabMiJi: true, //秘密级别切换
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      selectMicontent: [], //密级数据下拉框
      checkedArr: [],
      keep_limit: "",
      idTab: "",
      idState: "",
      idTabs:'',
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_cyxx = document.querySelector("#cyxx").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ); //必填控制
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
      ); //可编辑意见域
      if (this.huanJieMessage.visibleButtons.btn_send) {
        if (this.fromdata.isForword != 1) {
          this.buttonList[1].show = false;
        } else if (this.fromdata.isForword == 1) {
          this.buttonList[1].show = true;
        }
      }
      if (this.huanJieMessage.visibleButtons.btn_banjie) {
        //办结按钮显示
        if (this.fromdata.receiveVersion == 1) {
          this.buttonList[7].show = false;
          if (this.fromdata.isHasXB == 0) {
            //没承办和协办可以办结
            this.buttonList[11].show = true;
          } else {
            //不显示
            this.buttonList[11].show = false;
          }
        } else {
          if (this.fromdata.isHasXB == 0 && this.fromdata.isHasCB == 0) {
            //没承办和协办可以办结
            this.buttonList[11].show = true;
          } else {
            //不显示
            this.buttonList[11].show = false;
          }
        }
      }
    },
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
      this.$set(this.formData, "archiveDeptName", arr.join(","));
      this.$set(this.formData, "archiveDeptId", arr1.join(","));
    },
    // 编辑按钮
    handleEdit() {
      // this.selectedit = false;
      // //   this.isSave = false
      // configsApis.setSecretBaseConfigDetail({ id: this.row.id }).then(res => {
      //   this.saveSecretType = res.data.secretType;
      //   console.log("----this.secretType---", this.saveSecretType);
      // });
       let parm = {
        function: "doUpdate"
      };

      parm = Object.assign(parm,this.formData);
      this.$post
        .postData("doUpdate", JSON.stringify(parm), this.swglCode)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type:'success',
              message:'修改成功'
            })
            this.receiveselectlist();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1500
            });
          }
        });
    },
    savedata() {
      let parm = {
        function: "doUpdate"
      };

     this.formData = Object.assign(parm,this.formData);
      console.log(parm);
      this.$post
        .postData("doUpdate", JSON.stringify(this.formData), this.swglCode)
        .then(res => {
          if (res && res.success) {
           this.$message({
            type: "success",
            message: "保存成功",
          });
            this.receiveselectlist();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1500
            });
          }
        });
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "deleteOpinionById",
          JSON.stringify(this.bank_deletToSendOrder),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.receiveselectlist();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1500
            });
          }
        });
    },
    //发送
    fasongBtn() {
      let idN =
        this.receiveselect.id || sessionStorage.getItem("pageSWid") || "";
      this.$post
        .postData(
          "doSend",
          JSON.stringify({
            function: "doSend",
            deptIds: this.formData.sendSubId,
            id: idN
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: reeor.message,
            duration: 1000
          });
        });
    },
    //点击督办
    shouwenduban() {
      const gobackform = {
        function: "superviseReceive",
        id: this.receiveselect.id
      };
      this.$post
        .postData("superviseReceive", JSON.stringify(gobackform), this.swglCode)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "成功",
              duration: 1000
            });
            this.receiveselectlist();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "失败",
            duration: 1000
          });
        });
    },
    //取消督办
    unshouwenduban() {
      const gobackform = {
        function: "cancelSuperviseReceive",
        id: this.receiveselect.id
      };
      this.$post
        .postData(
          "cancelSuperviseReceive",
          JSON.stringify(gobackform),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "成功",
              duration: 1000
            });
            this.receiveselectlist();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "失败",
            duration: 1000
          });
        });
    },
    getBack() {
      //收回
      const gobackform = {
        function: "doWithdrawTask",
        pcsAvyId: this.bank_sendXb.pcsAvyId
      };
      this.$post
        .postData("doWithdrawTask", JSON.stringify(gobackform), this.swglggCode)
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("pageSWid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 1000
              });
            }
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "收回失败",
            duration: 1000
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
        obj.push({
          id: item,
          name: names[n]
        });
      });
      return obj;
    },
    //拼接数据
    // concatAttrData(name, data) {
    //   this.formData[name] = this.formData[name]
    //     ? this.formData[name] + data
    //     : data;
    // },
    // 数据截取
    cuteData(data, name, type) {
      if (this.formData[name]) {
        this.formData[name].forEach(item => {
          if (!item.status) {
            this.formData[data] = item.content;
            this.formData[type] = item.id;
          }
        });
      }
    },
    //定密依据接收子组件传值
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          this.concatAttrData("pishiOpinion", data);
        } else if (this.clickTypes == 2) {
          this.concatAttrData("officeOpinion", data);
        } else if (this.clickTypes == 3) {
          this.concatAttrData("undertakeOrgOpinion", data);
        }
        this.$forceUpdate();
      }
    },
    //定密依据弹窗弹出
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //切换秘密类型
    selectType(type) {
      if (type.trim() === "商业秘密") {
        this.selectMicontent = [].concat(
          // this.selectContents.country_secret_flag_type
        );
      } else if (type.trim() === "国家秘密") {
        this.selectMicontent = [].concat(
          // this.selectContents.business_secret_flag_type
        );
      }
      this.formData.security = "";
    },
    selectMiHandler(val) {
      this.formData.security = val;
      this.$forceUpdate();
    },

    //发送承办
    sendCb() {
      this.bank_sendXb.deptIds = this.formData.undertakeDeptId;
      this.bank_sendXb.deptNames = this.formData.undertakeDeptName;
      this.bank_sendXb.avyds = "发送承办部门:" + this.bank_sendXb.deptNames;
      let cbParm = Object.assign(this.bank_sendXb, { undertake: true });
      this.$post
        .postData("createHelpSubWf", JSON.stringify(cbParm), this.swglCode)
        .then(res => {
          if (res && res.success) {
            this.$message({
              message: "发送成功",
              type: "success"
            });
            if (type == "1") {
              this.preserve("save");
            }
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    //发送协办
    sendXb(type) {
      if (this.bank_sendXb.undertake) delete this.bank_sendXb.undertake;
      if (type == "1") {
        this.bank_sendXb.deptIds = this.formData.assistDeptId;
        this.bank_sendXb.deptNames = this.formData.assistDeptName;
        this.bank_sendXb.avyds = "发送协办部门:" + this.bank_sendXb.deptNames;
      } else {
        this.bank_sendXb.deptIds = this.transIds;
        this.bank_sendXb.deptNames = this.formData.assistDeptName;
        this.bank_sendXb.avyds = "发送协办部门:" + this.bank_sendXb.deptNames;
      }
      this.$post
        .postData(
          "createHelpSubWf",
          JSON.stringify(this.bank_sendXb),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              message: "发送成功",
              type: "success"
            });
            if (type == "1") {
              this.preserve("save");
            }
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },

    handleCurrentChange(val) {
      // this.checkedArr = []
      // if (val.length>1) {
      //   this.checkedArr = val[0].limitDate;
      //   this.formData.limitDate = this.checkedArr;
      // } else {
      //   this.checkedArr = []
      // }
      this.checkedArr = val.limitDate;
      this.formData.limitDate = this.checkedArr;
      console.log(this.checkedArr);
    },
    handleSave() {
      this.dialogVisible = false;
    },
    // 打印处理单
    processSheet(path, id) {
      if(this.idTab == "2"){
        const routeData = this.$router.resolve({
        path: "/secretary/sponsor",
        query: {
           ids:this.idTab,
          id:this.receiveselect.id
        }
      });
      window.open(routeData.href, "_blank");
      }else if(this.idState){
         const routeData = this.$router.resolve({
        path: "/secretary/sponsor",
        query: {
           ids:this.idState,
          id:this.receiveselect.id
        }
      });
      window.open(routeData.href, "_blank");

      }else if(this.idTabs){
         const routeData = this.$router.resolve({
        path: "/secretary/sponsor",
        query: {
          ids:this.idTabs,
          id:this.receiveselect.id
        }
      });
      window.open(routeData.href, "_blank");


      }

    },
    // handleSelectionChange() {},
    receiveselectlist() {
      // debugger
      this.receiveselect.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWid") || "";
      if (this.idTab == "2") {
        this.$post
          .postData(
            "selectSuperviseTjById",
            JSON.stringify(this.receiveselect),
            this.swglCode
          )
          .then(res => {
            if (res.data) {
              this.formData = res.data;
              this.hYData = res.data.subProcessList;
              this.lcData = res.data.processList;
              this.curUser = res.data.curUser;
              this.curNodeName = res.data.curNodeName;
              this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
              this.bank_selectConfig.tplNo = res.data.tplNo;
              this.bank_sendXb.processInstId = res.data.processInstId;
              this.bank_sendXb.multiTenancyId = res.data.multiTenancyId;
              this.bank_sendXb.pcsAvyId = res.data.pcsAvyId;
              this.bank_sendXb.tplNo = res.data.tplNo;
              this.bank_sendXb.receive_doc_sw = res.data.receive_doc_sw;
              this.bank_sendXb.curNodeCode = res.data.curNodeCode;
              this.bank_sendXb.id = res.data.id;
              this.bank_doSend.id = res.data.id;
              //督办字段
              this.isSupervise = res.data.isSupervise;
              this.limitDate = res.data.limitDate;
              this.progress = res.data.progress;
              this.daysInAdvance = res.data.daysInAdvance;
              this.superviserName = res.data.superviserName;
              this.superviseDate = res.data.superviseDate;
              //已上传的文件
              this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
              this.formData.attachSort = [];
              //getback
              if (res.data.circulateOpinionList) {
                for (let i = 0; i < res.data.circulateOpinionList.length; i++) {
                  if (res.data.circulateOpinionList[i].content != "") {
                    this.showCy = false;
                  }
                }
              }
              //反馈处理
              for (let i in this.formData.feedbackAttachmentMap) {
                let k = 0;
                this.fkfj.push(i);
                this.fkfjList.push(this.formData.feedbackAttachmentMap[i]);
              }
              if (this.formData.isDirect == "1") {
                this.formData.isDirect = "1";
              } else if (this.formData.isDirect == "0") {
                this.formData.isDirect = "0";
              }
              if (this.formData.isForword == "1") {
                this.formData.isForword = "1";
              } else if (this.formData.isForword == "0") {
                this.formData.isForword = "0";
              }
              if (this.formData.isDirect == "1") {
                this.formData.isDirect = "1";
              } else if (this.formData.isDirect == "0") {
                this.formData.isDirect = "0";
              }
              if (this.formData.isForword == "1") {
                this.formData.isForword = "1";
              } else if (this.formData.isForword == "0") {
                this.formData.isForword = "0";
              }

              if (res.data.undertakeDeptId) {
                this.chenCheckData = this.concatTreeData(
                  res.data.undertakeDeptId,
                  res.data.undertakeDeptName,
                  "dosend"
                );
              }
              if (res.data.assistDeptId) {
                this.transIds = res.data.assistDeptId;

                this.xieCheckData = this.concatTreeData(
                  res.data.assistDeptId,
                  res.data.assistDeptName
                );
              }
              //临时意见处理
              this.cuteData(
                "pishiOpinion",
                "pishiOpinionList",
                "pishiOpinionId"
              );
              this.cuteData("remarks", "remarksList", "remarksId");
              this.cuteData(
                "handleTerminateOpinion",
                "handleTerminateOpinionList",
                "handleTerminateOpinionId",
                "helpOrgOpinionList",
                "undertakeOrgOpinionList"
              );
              this.cuteData(
                "officeOpinion",
                "officeOpinionList",
                "officeOpinionId"
              );
              //收回测试
              // this.$post
              //   .postData(
              //     "checkTakeBack",
              //     JSON.stringify({
              //       function: "checkTakeBack",
              //       processInstId: this.formData.processInstId
              //     }),
              //     this.swglggCode
              //   )
              //   .then(res => {
              //     this.allowBack = res.allowBack;
              //   });
            }
          });
      } else if (this.idState) {
        this.receiveselect.id = this.receiveselect.id
          ? this.receiveselect.id
          : sessionStorage.getItem("pageSWid") || "";

        this.$post
          .postData(
            "selectSuperviseTjById",
            JSON.stringify(this.receiveselect),
            this.swglCode
          )
          .then(res => {
            if (res.data) {
              this.formData = res.data;
              this.hYData = res.data.subProcessList;
              this.lcData = res.data.processList;
              this.curUser = res.data.curUser;
              this.curNodeName = res.data.curNodeName;
              this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
              this.bank_selectConfig.tplNo = res.data.tplNo;
              this.bank_sendXb.processInstId = res.data.processInstId;
              this.bank_sendXb.multiTenancyId = res.data.multiTenancyId;
              this.bank_sendXb.pcsAvyId = res.data.pcsAvyId;
              this.bank_sendXb.tplNo = res.data.tplNo;
              this.bank_sendXb.receive_doc_sw = res.data.receive_doc_sw;
              this.bank_sendXb.curNodeCode = res.data.curNodeCode;
              this.bank_sendXb.id = res.data.id;
              this.bank_doSend.id = res.data.id;
              //督办字段
              this.isSupervise = res.data.isSupervise;
              this.limitDate = res.data.limitDate;
              this.progress = res.data.progress;
              this.daysInAdvance = res.data.daysInAdvance;
              this.superviserName = res.data.superviserName;
              this.superviseDate = res.data.superviseDate;
              //已上传的文件
              this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
              this.formData.attachSort = [];
              //getback
              if (res.data.circulateOpinionList) {
                for (let i = 0; i < res.data.circulateOpinionList.length; i++) {
                  if (res.data.circulateOpinionList[i].content != "") {
                    this.showCy = false;
                  }
                }
              }
              //反馈处理
              for (let i in this.formData.feedbackAttachmentMap) {
                let k = 0;
                this.fkfj.push(i);
                this.fkfjList.push(this.formData.feedbackAttachmentMap[i]);
              }
              if (this.formData.isDirect == "1") {
                this.formData.isDirect = "1";
              } else if (this.formData.isDirect == "0") {
                this.formData.isDirect = "0";
              }
              if (this.formData.isForword == "1") {
                this.formData.isForword = "1";
              } else if (this.formData.isForword == "0") {
                this.formData.isForword = "0";
              }
              if (this.formData.isDirect == "1") {
                this.formData.isDirect = "1";
              } else if (this.formData.isDirect == "0") {
                this.formData.isDirect = "0";
              }
              if (this.formData.isForword == "1") {
                this.formData.isForword = "1";
              } else if (this.formData.isForword == "0") {
                this.formData.isForword = "0";
              }

              if (res.data.undertakeDeptId) {
                this.chenCheckData = this.concatTreeData(
                  res.data.undertakeDeptId,
                  res.data.undertakeDeptName,
                  "dosend"
                );
              }
              if (res.data.assistDeptId) {
                this.transIds = res.data.assistDeptId;

                this.xieCheckData = this.concatTreeData(
                  res.data.assistDeptId,
                  res.data.assistDeptName
                );
              }
              //临时意见处理
              this.cuteData(
                "pishiOpinion",
                "pishiOpinionList",
                "pishiOpinionId"
              );
              this.cuteData("remarks", "remarksList", "remarksId");
              this.cuteData(
                "handleTerminateOpinion",
                "handleTerminateOpinionList",
                "handleTerminateOpinionId",
                "helpOrgOpinionList",
                "undertakeOrgOpinionList"
              );
              this.cuteData(
                "officeOpinion",
                "officeOpinionList",
                "officeOpinionId"
              );
              //收回测试
              // this.$post
              //   .postData(
              //     "checkTakeBack",
              //     JSON.stringify({
              //       function: "checkTakeBack",
              //       processInstId: this.formData.processInstId
              //     }),
              //     this.swglggCode
              //   )
              //   .then(res => {
              //     this.allowBack = res.allowBack;
              //   });
            }
          });
      } else if (this.idTabs) {
        this.receiveselect.id = this.receiveselect.id
          ? this.receiveselect.id
          : sessionStorage.getItem("pageSWid") || "";

        this.$post
          .postData(
            "selectSuperviseTjById",
            JSON.stringify(this.receiveselect),
            this.swglCode
          )
          .then(res => {
            if (res.data) {
              this.formData = res.data;
              this.hYData = res.data.subProcessList;
              this.lcData = res.data.processList;
              this.curUser = res.data.curUser;
              this.curNodeName = res.data.curNodeName;
              this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
              this.bank_selectConfig.tplNo = res.data.tplNo;
              this.bank_sendXb.processInstId = res.data.processInstId;
              this.bank_sendXb.multiTenancyId = res.data.multiTenancyId;
              this.bank_sendXb.pcsAvyId = res.data.pcsAvyId;
              this.bank_sendXb.tplNo = res.data.tplNo;
              this.bank_sendXb.receive_doc_sw = res.data.receive_doc_sw;
              this.bank_sendXb.curNodeCode = res.data.curNodeCode;
              this.bank_sendXb.id = res.data.id;
              this.bank_doSend.id = res.data.id;
              //督办字段
              this.isSupervise = res.data.isSupervise;
              this.limitDate = res.data.limitDate;
              this.progress = res.data.progress;
              this.daysInAdvance = res.data.daysInAdvance;
              this.superviserName = res.data.superviserName;
              this.superviseDate = res.data.superviseDate;
              //已上传的文件
              this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
              this.formData.attachSort = [];
              //getback
              if (res.data.circulateOpinionList) {
                for (let i = 0; i < res.data.circulateOpinionList.length; i++) {
                  if (res.data.circulateOpinionList[i].content != "") {
                    this.showCy = false;
                  }
                }
              }
              //反馈处理
              for (let i in this.formData.feedbackAttachmentMap) {
                let k = 0;
                this.fkfj.push(i);
                this.fkfjList.push(this.formData.feedbackAttachmentMap[i]);
              }
              if (this.formData.isDirect == "1") {
                this.formData.isDirect = "1";
              } else if (this.formData.isDirect == "0") {
                this.formData.isDirect = "0";
              }
              if (this.formData.isForword == "1") {
                this.formData.isForword = "1";
              } else if (this.formData.isForword == "0") {
                this.formData.isForword = "0";
              }
              if (this.formData.isDirect == "1") {
                this.formData.isDirect = "1";
              } else if (this.formData.isDirect == "0") {
                this.formData.isDirect = "0";
              }
              if (this.formData.isForword == "1") {
                this.formData.isForword = "1";
              } else if (this.formData.isForword == "0") {
                this.formData.isForword = "0";
              }

              if (res.data.undertakeDeptId) {
                this.chenCheckData = this.concatTreeData(
                  res.data.undertakeDeptId,
                  res.data.undertakeDeptName,
                  "dosend"
                );
              }
              if (res.data.assistDeptId) {
                this.transIds = res.data.assistDeptId;

                this.xieCheckData = this.concatTreeData(
                  res.data.assistDeptId,
                  res.data.assistDeptName
                );
              }
              //临时意见处理
              this.cuteData(
                "pishiOpinion",
                "pishiOpinionList",
                "pishiOpinionId"
              );
              this.cuteData("remarks", "remarksList", "remarksId");
              this.cuteData(
                "handleTerminateOpinion",
                "handleTerminateOpinionList",
                "handleTerminateOpinionId",
                "helpOrgOpinionList",
                "undertakeOrgOpinionList"
              );
              this.cuteData(
                "officeOpinion",
                "officeOpinionList",
                "officeOpinionId"
              );
              //收回测试
              // this.$post
              //   .postData(
              //     "checkTakeBack",
              //     JSON.stringify({
              //       function: "checkTakeBack",
              //       processInstId: this.formData.processInstId
              //     }),
              //     this.swglggCode
              //   )
              //   .then(res => {
              //     this.allowBack = res.allowBack;
              //   });
            }
          });
      }

      this.$post
        .postData(
          "selectSuperviseTjById",
          JSON.stringify(this.getJDBDropDownDataSource),
          this.swglCode
        )
        .then(res => {
          // this.keep_limit = res.data.keep_limit;
          // this.selectContents.receive_type = res.data.receive_type;
        });
    },
    preserve(type) {
      let params = Object.assign(this.saveOrUpdateSW, this.formData);
      this.saveOrUpdateSW.id =
        this.receiveselect.id || sessionStorage.getItem("pageSWid") || "";
      this.$post
        .postData("saveOrUpdateSW", JSON.stringify(params), this.swglCode)
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("pageSWid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                offset: 400,
                duration: 1000
              });
            }
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            } else {
              this.receiveselectlist();
            }
          }
        });
    },
    // isCanGetBack() {
    //   //收回测试
    //   this.$post
    //     .postData(
    //       "checkTakeBack",
    //       JSON.stringify({
    //         function: "checkTakeBack",
    //         processInstId: this.formData.processInstId
    //       }),
    //       this.swglggCode
    //     )
    //     .then(res => {
    //       this.allowBack = res.allowBack;
    //     });
    // },
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
        scrolled >= this.distance_qpyj &&
        scrolled < this.distance_cyxx - 180
      ) {
        this.active = "#qpyj";
      } else if (
        scrolled >= this.distance_cyxx - 200 &&
        scrolled < this.distance_scfj
      ) {
        this.active = "#cyxx";
      } else {
        this.active = "#scfj";
      }
    },

    // 关闭
    handelclose() {
      window.location.href = "about:blank";
      window.close();
    },
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      this.$refs.formData.validate((valid, object) => {
        if (valid) {
          return true;
        } else {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
          return true;
        }
      });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.formData[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeDeptName") {
          this.formData.undertakeDeptId = "";
          this.chenCheckData = [];
        }
        if (name === "assistDeptName") {
          this.formData.assistDeptId = "";
          this.xieCheckData = [];
        }
      }
    },
    //查看流程
    // flowScheme() {
    //   this.timeShow = true;
    //   this.bank_cklc.processInstId = this.formData.processInstId;
    //   this.$post
    //     .postData(
    //       "getHistoryActInfo",
    //       JSON.stringify(this.bank_cklc),
    //       this.swglggCode
    //     )
    //     .then(res => {
    //       console.log(res);
    //       if (res) {
    //         this.tableData = res.data;
    //         this.$nextTick(() => {
    //           this.$refs.dialogLine.openDialog();
    //         });
    //       }
    //     });
    // },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.formData.attachSort.push(
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
    },
    downRow(n) {
      let midObj;
      this.formData.attachSort.push(
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
    },
    deleteRow(n, id) {
      this.bank_deleteFileById.id = id;
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.swglCode
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 500
              });
              this.formData.attchmentFileInfo.splice(n, 1);
              this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "删除失败",
                duration: 500
              });
            }
          }
        });
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
                duration: 500
              });
            }
          }
        });
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
          console.log(res);
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
                duration: 500
              });
            }
          }
        });
    },
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = { state: false };
      var handbook = flagFile
        ? self.$businessCode.fwbzfj
        : self.$businessCode.swglfj;
      self.bank_doDownloadFile.fileName = flagFile
        ? flagFile.fileName
        : self.formData.fileName;
      self.bank_doDownloadFile.filePath = flagFile
        ? flagFile.filePath
        : self.formData.filePath;
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
          } else {
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
    // 起草正文
    drafting(state) {
      let that = this;
      this.zhengWenState = state;
      if (!this.formData.filePath && !this.formData.fileName && state != 1) {
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先上传正文",
          duation: 500
        });
        return;
      }
      if (!this.formData.id) {
        this.preserve().then(res => {
          if (res) {
            if (state == 1) {
              this.showDraft = true;
            } else {
              let fileInfo = {
                filePath: this.formData.filePath,
                fileName: this.formData.fileName
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
                  state: "viewFile",
                  id: this.formData.id,
                  zhengWenState: this.zhengWenState,
                  JYcode: this.$businessCode.swglfj,
                  multiTenancyId: this.formData.multiTenancyId,
                  relativePath: res ? res.filePath : "",
                  fileName: res ? res.fileName : "",
                  showBtns: false,
                  flowTranId: this.$businessCode.swglgg
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
    //正文跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: this.formData.id,
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.swglfj,
          multiTenancyId: this.formData.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          showBtns: false,
          flowTranId: this.$businessCode.swgl //流程交易线     chai
        }
      });
      this.showDraft = false;
      this.$forceUpdate();

      window.open(data.href, "_blank");
    }
  },
  watch: {},
  created() {
    this.actionType = this.$route.query.type;
    let that = this;
    this.uploadConfig.code = this.$businessCode.swglfj;
    this.uploadConfig.flowTranId = this.$businessCode.swgl; //流程交易线   chai
    this.receiveselect.id = this.$route.query.id ? this.$route.query.id : "";
    // debugger
    console.log(this.$route.query.tab);
    this.idTab = this.$route.query.tab;
    this.idState = this.$route.query.state;
    this.idTabs = this.$route.query.tabs;

    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.receiveselectlist();
  },
  mounted() {
    this.$nextTick(() => {
      let a = this.$refs.title;
      console.log(a);
      //this.$set(this.$refs.title.$children[1],this.$refs.title.$children[1].readonly,true)
      this.$forceUpdate();
    });
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
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
.pl65 {
  float: right;
  padding-right: 10px;
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
      .bank_db_height {
        height: auto;
      }
    }
    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 20px 0;
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
/deep/ .hqbm .el-textarea__inner {
  color: red !important;
  height: 40px !important;
  min-height: 40px !important;
}
/deep/ .hqbm1 .el-textarea__inner {
  height: 40px !important;
  min-height: 40px !important;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
}
.linecenter {
  /deep/ .el-form-item__label {
    width: 30px;
    text-align: center;
    padding: 0;
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
/deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #606266;
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
  padding: 0 10px;
}
.disable_w {
  width: 100%;
}
.disable_w {
  width: 100%;
}
.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(102, 30, 30, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-scrollbar {
  height: 100%;
}
.command_wrap {
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
</style>
