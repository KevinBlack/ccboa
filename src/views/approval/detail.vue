<template>
  <div class="zfDetail" id="shiwuzhifa" v-show="isShowDocument">
    <!-- 本行导出单-->
    <div id="printHtmlBH" class="tablePrint" v-if="(id||formData.id)&&(!formData.iskh)">
      <el-row>
        <h1 class="title-h1">中国建设银行事务审批单</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">申请项目</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formData.applyProjectName}}</td>
            <td style="text-align:center;vertical-align:middle">主管部门</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formData.mainDepart}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">审批编号</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formData.approveNo}}</td>

            <td style="text-align:center;vertical-align:middle">申请日期</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formData.approveTime}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">联系人</td>
            <td
              style="width:40%;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formData.contactName}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">联系电话</td>
            <td style="width:30%;padding-right:6px;">{{formData.contactTel}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">申请部门</td>
            <td
              colspan="4"
              style="text-align:center;vertical-align:middle"
            >{{formData.draftDepartment}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">标题</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">{{formData.title}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">依据</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">
              <span
                v-for="item in YRcheck"
                :key="item.id"
              >{{item.orderNo}};&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </td>
          </tr>
          <!--        事由提要-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">事由提要</td>
            <td colspan="4">{{formData.reason}}</td>
          </tr>
          <!--       审批意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">审批意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formData.checkOpinionList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        申请单位意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">申请单位意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formData.applyOpinionList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--         办理情况-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">办理情况</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formData.blqkOpinionList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        传阅意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">传阅意见</td>
            <td colspan="4">
              <div class="chuanYue" v-for="item in formData.cyOpinionList" :key="item.id">
                <div class="chuanYue1">{{item.content}}</div>

                <div class="chuanYue2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        备注-->
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="4">
              <div class="beiZh" v-for="item in formData.markList" :key="item.id">
                <div class="content">{{item.content}}</div>
                <div class="name">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        附件-->
          <tr style="height: 32px;">
            <td style="width:20%;vertical-align:middle;text-align:center">附件</td>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
      <br />

      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 40px;">
            <td style="width：20%;text-align:center;vertical-align:middle" rowspan="2">传阅人员</td>
            <td style="width:10%;text-align:center;vertical-align:middle">未阅</td>
            <td style="width:80%;text-align:center;vertical-align:middle">{{formData.readPerson}}</td>
          </tr>

          <tr>
            <td style="width:10%;text-align:center;vertical-align:middle">已阅</td>
            <td style="width:80%;text-align:center;vertical-align:middle">{{formData.unreadPerson}}</td>
          </tr>

          <br />
        </tbody>
      </table>
    </div>
    <!--    跨行导出单-->
    <div id="printHtmlKH" class="tablePrint" v-if="(id||formData.id)&&formData.isKh">
      <el-row>
        <h1 class="title-h1">中国建设银行跨行事务审批单</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">申请项目</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formData.applyProjectName}}</td>
            <td style="text-align:center;vertical-align:middle">主管部门</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formData.mainDepart}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">审批编号</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formData.approveNo||formData.virtualApproveNo}}</td>

            <td style="text-align:center;vertical-align:middle">接收日期</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formData.approveTime}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">申请编号</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formData.applyNo||formData.virtualApplyNo}}</td>

            <td style="text-align:center;vertical-align:middle">申请日期</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formData.applyTime}}</td>
          </tr>
          <!--        <tr style="height: 800px;">-->
          <!--          <td style="text-align:center" colspan="5"></td>-->
          <!--        </tr>-->
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">联系人</td>
            <td
              style="width:40%;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formData.contactName}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">联系电话</td>
            <td style="width:30%;text-align:center;vertical-align:middle">{{formData.contactTel}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">申请部门</td>
            <td
              colspan="4"
              style="text-align:center;vertical-align:middle"
            >{{formData.draftDepartment}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">标题</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">{{formData.title}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">依据</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">
              <span
                v-for="item in YRcheck"
                :key="item.id"
              >{{item.orderNo}};&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </td>
          </tr>
          <!--        事由提要-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">事由提要</td>
            <td colspan="4">{{formData.reason}}</td>
          </tr>
          <!--       审批意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">审批意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formData.checkOpinionList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        申请单位意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">申请单位意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formData.applyOpinionList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--         办理情况-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">办理情况</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formData.blqkOpinionList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        传阅意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">传阅意见</td>
            <td colspan="4">
              <div class="chuanYue" v-for="item in formData.cyOpinionList" :key="item.id">
                <div class="chuanYue1">{{item.content}}</div>

                <div class="chuanYue2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        备注-->
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="4">
              <div class="beiZh" v-for="item in formData.markList" :key="item.id">
                <div class="content">{{item.content}}</div>
                <div class="name">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        附件-->
          <tr style="height: 32px;">
            <td style="width:20%;vertical-align:middle;text-align:center">附件</td>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
      <br />

      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 40px;">
            <td style="width：20%;text-align:center;vertical-align:middle" rowspan="2">传阅人员</td>
            <td style="width:10%;text-align:center;vertical-align:middle">未阅</td>
            <td style="width:80%;text-align:center;vertical-align:middle">{{formData.readPerson}}</td>
          </tr>

          <tr>
            <td style="width:10%;text-align:center;vertical-align:middle">已阅</td>
            <td style="width:80%;text-align:center;vertical-align:middle">{{formData.unreadPerson}}</td>
          </tr>

          <br />
        </tbody>
      </table>
    </div>

    <!--    <button @click="btnClick">fdsfdfsdfs</button>-->
    <!--    部门&&环节选择树-->
    <supbank-tree
      v-model="showOrgTree"
      treeType="sw"
      v-dialogDrag
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      :seletOptionsData="seletOptionsData"
      @orgList="getOrgList"
    ></supbank-tree>
    <!--    填写申请-->
    <el-dialog
      :visible.sync="showDraft"
      :modal-append-to-body="false"
      width="600px"
      height="600px"
      title="填写申请"
    >
      <el-row>
        <el-col :span="24" class="mrg-b-20">
          <el-radio v-model="draftFlag" label="localFile">本地打开</el-radio>
        </el-col>
        <el-col :span="24">
          <el-radio v-model="draftFlag" label="newFile">空白文档</el-radio>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDraft = false">取 消</el-button>
        <el-button type="primary" @click="writeApply">确定</el-button>
      </div>
    </el-dialog>
    <!--    文号编号组成-->
    <el-dialog
      v-dialogDrag
      title="请选择要使用的文号"
      :visible.sync="isdialog"
      class="bianhaoDialog"
      :before-close="handleClose"
    >
      <el-scrollbar style="height:280px;">
        <el-form>
          <el-form-item label="当前文号">
            <el-radio
              @change="currentCode"
              v-model="deleteapplyCode"
              :label="resData.fileNo"
            >{{resData.fileNo}}</el-radio>
            <!-- <el-button type="primary" @click="currentCode">{{resData.fileNo}}</el-button> -->
          </el-form-item>
          <el-form-item label="空缺文号">
            <el-radio-group v-model="deleteapplyCode" v-for="item in delCode" :key="item.index">
              <el-radio :label="item" style="margin-right:16px;" @change="deleCode">{{item}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <span slot="footer">
        <el-button type="primary" @click="delecurrentCode">确定</el-button>
        <el-button @click="closeWH">取消</el-button>
      </span>
    </el-dialog>
    <!--  传阅收回  -->
    <el-dialog
      v-dialogDrag
      title="选择传阅收回人员"
      :visible.sync="isdialogCY"
      width="40%"
      height="200px"
      :before-close="handleClose"
    >
      <div style="margin-top:26px">
        <el-checkbox-group v-model="CYBackPer">
          <el-checkbox
            style="margin-right:16px;"
            v-for="item in perCode"
            :key="item.id"
            :label="item.curUserId+'_'+item.curUserCn+','+item.id"
          >{{item.curUserCn}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="CYBacksure">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </el-dialog>
    <!--    选择人员树-->
    <select-person
      v-dialogDrag
      :treeData="treeData"
      :loadingTree="loadingTree"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择下一处理人员"
      :checkIds="checkIds"
      :fromdata="formData"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
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
    <!--引入详情-->
    <el-dialog
      v-dialogDrag
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
            <!-- <el-button type="text" style="cursor: default;">{{YRDeal.title}}</el-button> -->
          </el-form-item>
          <!--     附件     -->
          <el-row>
            <el-form-item label="附件">
              <el-col :span="24">
                <div class="tree_w" v-if="YRDeal.file&&YRDeal.file.length">
                  <el-scrollbar>
                    <div v-for="item in  YRDeal.file" :key="item.id" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
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
          </el-row>
        </el-form>
      </div>
      <span slot="footer">
        <!--        <el-button type="primary" @click="YRBacksure">确定</el-button>-->
        <el-button @click="YRhandleCloseDeal">取消</el-button>
      </span>
    </el-dialog>
    <!--    退回修改-->
    <el-dialog
      v-dialogDrag
      title="退回修改意见"
      :visible.sync="isdialogBack"
      width="40%"
      height="200px"
      :before-close="BackhandleClose"
    >
      <div style="margin-top:4px">
        <el-form ref="THreason" label-width="160px">
          <el-form-item label="退回原因" style="width:80%;margin-top:16px;">
            <el-input v-model="formData.returnReason"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="BackBacksure">确定</el-button>
        <el-button @click="BackhandleClose">取消</el-button>
      </span>
    </el-dialog>

    <div class="headerClick">
      <el-button plain size="mini" class="bank_grid_comtent_active" @click="closeData()">关闭</el-button>
      <el-button
        :disabled="finSendBtn"
        class="bank_grid_comtent_active"
        v-for="(item,index) in FEIbuttonList"
        @click="buttonClick(item.name)"
        :key="index"
        v-show="FEIbuttonList[index].show"
        size="mini"
        plain
      >{{item.name}}</el-button>
    </div>
    <div class>
      <div class="shiwuTitle">{{approvalTitle}}</div>
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
        <div class="cur_box" style="width:90%;height:56px!important">
          <div class="cur_sess">
            <p>
              当前环节：
              <span>{{this.formData.currentNode}}</span>
            </p>
            <p>
              当前处理人：
              <span>{{currentUser}}</span>
            </p>
            <p>
              是否跨行：
              <span>
                <el-radio-group v-model="formData.isKh" :disabled="true" prop="khbz">
                  <el-radio :label="0">非跨行</el-radio>
                  <el-radio :label="1">跨行</el-radio>
                </el-radio-group>
              </span>
            </p>
            <el-button
              @click="viewApproval"
              type="primary"
              style="float: right;margin-right:40px;margin-top:8px;color:#fff!important"
            >查看审批说明</el-button>
          </div>
        </div>
        <div id="wjys" class="height_90"></div>
        <h6 class="bank_dispach_file_tit">文件要素</h6>

        <el-form ref="elForm" :rules="rules" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="申请项目">
                <el-input v-model="formData.applyProjectName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="主管部门">
                <el-input v-model="formData.mainDepart" :disabled="true"></el-input>
              </el-form-item>
              <!--              <el-form-item label="主管部门" prop="mainDepart" v-else>-->
              <!--                <el-select-->
              <!--                  multiple-->
              <!--                  v-model="formData.mainDepart"-->
              <!--                  style="width:80%"-->
              <!--                  :disabled="readFields.zgbm"-->
              <!--                >-->
              <!--                  <el-option-->
              <!--                    v-for="item in ZGdepar"-->
              <!--                    :key="item"-->
              <!--                    :label="item"-->
              <!--                    :value="item"-->
              <!--                    no-data-text="请选择"-->
              <!--                  ></el-option>-->
              <!--                </el-select>-->
              <!--              </el-form-item>-->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="审批编号" prop="approveNo">
                <!--未生成编号approveNo前显示初始化编号virtualApproveNo-->
                <el-input
                  v-show="formData.approveNo||(formData.applyNo&&formData.isKh==1&&formData.approveNo)"
                  v-model="formData.approveNo"
                  :disabled="true"
                ></el-input>
                <el-input
                  v-show="(!formData.approveNo&&formData.isKh!=1)||(formData.isKh==1&&!formData.approveNo)"
                  v-model="formData.virtualApproveNo"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="申请编号" prop="applyNo" v-if="formData.isKh">
                <el-input v-show="formData.applyNo" v-model="formData.applyNo" :disabled="true"></el-input>
                <el-input
                  v-show="!formData.applyNo"
                  v-model="formData.virtualApplyNo"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="申请日期" prop="applyTime">
                <el-input v-model="formData.applyTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" v-if="formData.approveTime">
              <el-form-item label="接收日期" prop="approveTime">
                <el-input v-model="formData.approveTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请部门" prop="draftDepartment">
                <el-row>
                  <el-col :span="24">
                    <el-select
                      style="width:100%"
                      v-model="formData.draftDepartment"
                      :disabled="readFields.cllx"
                      @change="draftDepartmentChange"
                    >
                      <el-option
                        v-for="item in draftDepartmentList"
                        :key="item.currUnitId"
                        :label="item.firstUnitName"
                        :value="item.firstUnitName"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="联系人" prop="contactName" ref="contactName">
                <el-input v-model="formData.contactName" :disabled="readFields.lxr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="联系电话" prop="contactTel" ref="contactTel">
                <el-input v-model="formData.contactTel" :disabled="readFields.lxdh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item :label="shiwuLabel.title" prop="title" ref="title">
                <el-input v-model="formData.title" :disabled="readFields.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="依据">
              <el-button type="primary" @click="importBtn" :disabled="isImportant" size="mini">引入</el-button>

              <div v-for="item in YRcheck" :key="item.id">
                <span @click="YRJump(item)" style="display:inline-block;width:40%;">{{item.orderNo}}</span>
                <el-button @click="YRJump(item)" size="mini" type="primary">查看详情</el-button>
                <el-button
                  @click="importDle(item)"
                  size="mini"
                  type="danger"
                  :disabled="isImportant"
                >删除</el-button>
              </div>
            </el-form-item>
          </el-row>
          <!--     事由提要 区域     -->
          <el-form-item label="事由提要" prop="reason" ref="reason">
            <el-row>
              <el-col :span="22">
                <el-input
                  type="textarea"
                  :placeholder="reasonPlaceholder"
                  maxlength="500"
                  show-word-limit
                  :autosize="{minRow:5,maxRow:15}"
                  v-model="formData.reason"
                  :disabled="readFields.syty"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <h6 class="bank_dispach_file_tit">签批意见</h6>
          <div id="qpyj" class="height_90"></div>
          <el-form-item label="审批意见" prop="examineIdea" v-if="isGC">
            <el-radio-group
              v-model="formData.status"
              :disabled="editedIdeaFields.spyj"
              v-if="isYijian"
              @change="agreeChange"
            >
              <el-radio v-for="item in radioData" :key="item" :label="item" :value="item"></el-radio>
            </el-radio-group>
            <div v-for="item in formData.checkOpinionList" :key="item.id" class="opinion-wrapper">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="22" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span
                        class="pad_lr10"
                      >{{item.createUser}}</span>
                      <p class="creat_time">{{item.createTime}}</p>
                    </div>
                  </el-col>
                  <i
                    class="el-icon-delete"
                    @click="deleteCurIdea(item.id)"
                    style="font-size:20px;margin-left:10px;cursor:pointer"
                    v-if="item.createTime==lastOptionTime&&item.createUserId==localUserId"
                  ></i>
                </el-row>
              </div>
            </div>
            <el-row
              v-if="!editedIdeaFields.spyj||!(formData.checkOpinionList&&formData.checkOpinionList.length!=0)"
            >
              <el-col :span="22">
                <el-input
                  type="textarea"
                  :autosize="{minRow:5,maxRow:15}"
                  :placeholder="examineIdeaPlaceholder"
                  maxlength="500"
                  show-word-limit
                  v-model="formData.examineIdea"
                  :disabled="editedIdeaFields.spyj"
                ></el-input>
              </el-col>
              <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.spyj">
                <i
                  class="icon-font el-icon-edit select-chang"
                  @click="showWriteList('examineIdea')"
                ></i>
              </el-col>
            </el-row>
          </el-form-item>

          <!--      申请单位意见区域    -->
          <el-form-item label="申请单位意见" prop="exaunitIdea" v-if="isGC">
            <div v-for="item in formData.applyOpinionList" :key="item.id" class="opinion-wrapper">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="22" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span
                        class="pad_lr10"
                      >{{item.createUser}}</span>
                      <p class="creat_time">{{item.createTime}}</p>
                    </div>
                  </el-col>
                  <i
                    class="el-icon-delete"
                    @click="deleteCurIdea(item.id)"
                    style="font-size:20px;margin-left:10px;cursor:pointer"
                    v-if="item.createTime==lastOptionTime&&item.createUserId==localUserId"
                  ></i>
                </el-row>
              </div>
            </div>
            <el-row
              v-if="!editedIdeaFields.ngyj||!(formData.applyOpinionList&&formData.applyOpinionList.length!=0)"
            >
              <el-col :span="22">
                <el-input
                  type="textarea"
                  :autosize="{minRow:5,maxRow:15}"
                  :placeholder="exaunitIdeaPlaceholder"
                  maxlength="500"
                  show-word-limit
                  v-model="formData.exaunitIdea"
                  :disabled="editedIdeaFields.ngyj"
                ></el-input>
              </el-col>
              <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.ngyj">
                <i
                  class="icon-font el-icon-edit select-chang"
                  @click="showWriteList('exaunitIdea')"
                ></i>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="办理情况" prop="blIdea">
            <div v-for="item in formData.blqkOpinionList" :key="item.id" class="opinion-wrapper">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="22" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span
                        class="pad_lr10"
                      >{{item.createUser}}</span>
                      <p class="creat_time">{{item.createTime}}</p>
                    </div>
                  </el-col>
                  <i
                    class="el-icon-delete"
                    @click="deleteCurIdea(item.id)"
                    style="font-size:20px;margin-left:10px;cursor:pointer"
                    v-if="item.createTime==lastOptionTime&&item.createUserId==localUserId"
                  ></i>
                </el-row>
              </div>
            </div>
            <el-row
              v-if="!editedIdeaFields.blqk||!(formData.blqkOpinionList&&formData.blqkOpinionList.length!=0)"
            >
              <el-col :span="22">
                <el-input
                  type="textarea"
                  :autosize="{minRow:5,maxRow:15}"
                  :placeholder="blIdeaPlaceholder"
                  maxlength="500"
                  show-word-limit
                  v-model="formData.blIdea"
                  :disabled="editedIdeaFields.blqk"
                ></el-input>
              </el-col>
              <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.blqk">
                <i class="icon-font el-icon-edit select-chang" @click="showWriteList('blIdea')"></i>
              </el-col>
            </el-row>
          </el-form-item>
          <!--     传阅意见     -->
          <el-form-item label="传阅意见" prop="cyIdea">
            <div v-for="item in formData.cyOpinionList" :key="item.id" class="opinion-wrapper">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="22" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span
                        class="pad_lr10"
                      >{{item.createUser}}</span>
                      <p class="creat_time">{{item.createTime}}</p>
                    </div>
                  </el-col>
                  <i
                    class="el-icon-delete"
                    @click="deleteCurIdea(item.id)"
                    style="font-size:20px;margin-left:10px;cursor:pointer"
                    v-if="item.createTime==lastOptionTime&&item.createUserId==localUserId"
                  ></i>
                </el-row>
              </div>
            </div>
            <el-row
              v-if="!editedIdeaFields.cyyj||!(formData.cyOpinionList&&formData.cyOpinionList.length!=0)"
            >
              <el-col :span="22">
                <el-input
                  type="textarea"
                  :autosize="{minRow:5,maxRow:15}"
                  :placeholder="cyIdeaPlaceholder"
                  maxlength="500"
                  show-word-limit
                  v-model="formData.cyIdea"
                  :disabled="editedIdeaFields.cyyj"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <!--     备注区域     -->
          <el-form-item label="备注" prop="mark">
            <el-row v-for="item in formData.markList" :key="item.id" class="opinion-wrapper">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="22" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span
                        class="pad_lr10"
                      >{{item.userName}}</span>
                      <p class="creat_time">{{item.createTime}}</p>
                      <!--                      <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}监督局</span>{{item.createTime}}-->
                    </div>
                  </el-col>
                  <i
                    class="el-icon-delete"
                    @click="deleteCurMark(item.id)"
                    style="font-size:20px;margin-left:10px;cursor:pointer"
                    v-if="item.createTime==lastMarkTime&&item.userId==localUserId"
                  ></i>
                </el-row>
              </div>
            </el-row>
            <el-row v-if="!readFields.mark||!(formData.markList&&formData.markList.length!=0)">
              <el-col :span="22">
                <el-input
                  type="textarea"
                  :autosize="{minRow:5,maxRow:15}"
                  :placeholder="markPlaceholder"
                  maxlength="500"
                  show-word-limit
                  v-model="formData.mark"
                  :disabled="readFields.mark"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-col :span="23">
            <el-form-item label="传阅人员" style="margin-top:20px">
              <el-row>
                <el-col :span="23">
                  <el-form-item label="未阅">
                    <el-input v-model="formData.unreadPerson" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23">
                  <el-form-item label="已阅">
                    <el-input v-model="formData.readPerson" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <h6 class="bank_dispach_file_tit" style="width:200px!important;display: block">附件</h6>
          <div id="scfj" class="height_90"></div>
          <!--    非跨行时：附件在 审批编号未生成时才可上传修改    -->
          <el-row style="margin-left:100px" v-if="(formData.isKh==0)&&(!formData.approveNo)">
            <el-col :span="22">
              <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
            </el-col>
          </el-row>
          <!--     跨行时附件域分     -->
          <el-row style="margin-left:100px" v-if="formData.isKh==1">
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
                                v-if="(formData.attchmentFileInfo.length>1)&&(!formData.approveNo)&&(formData.currentNode=='填写审批单')"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index,QS)"
                                v-if="(formData.attchmentFileInfo.length>1)&&(!formData.approveNo)&&(formData.currentNode=='填写审批单')"
                                :disabled="index==formData.attchmentFileInfo.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id,QS)"
                                v-if="!formData.approveNo&&(formData.currentNode=='填写审批单')"
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
                                v-if="formData.attchmentFileInfo.length>1&&isFileShow"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index,QS)"
                                v-if="formData.attchmentFileInfo.length>1&&isFileShow"
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
                                v-if="formData.attchmentFileInfoPZ.length>1&&isFileShowPZ"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index,PZ)"
                                v-if="formData.attchmentFileInfoPZ.length>1&&isFileShowPZ"
                                :disabled="index==formData.attchmentFileInfoPZ.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id,PZ)"
                                :disabled="item.disabled"
                                v-if="isFileShowPZ"
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
                                v-if="formData.attchmentFileInfoSP.length>1&&isFileShowSP"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index,SP)"
                                v-if="formData.attchmentFileInfoSP.length>1&&isFileShowSP"
                                :disabled="index==formData.attchmentFileInfoSP.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id,SP)"
                                v-if="isFileShowSP"
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
    <shiwuFlow :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></shiwuFlow>
    <backreason :tableData="reasontableData" ref="RdialogLine" v-if="backReasonChart" v-dialogDrag></backreason>
    <!--    常用批语-->
    <appendWriteList
      v-dialogDrag
      :offenDevices="offenDevices"
      ref="writelist"
      v-if="appendWriteDialog"
      :mesageType="clickTypes"
      @childsaveselect="writelistvalue"
      @addCommonUse="addCommonUse"
      @deleId="deleteMassage"
    ></appendWriteList>
    <!--    传阅-->
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
import shiwuFlow from "@/components/viewFlow/shiwuFlow"; //流程信息组件
import selectPerson from "components/tree/treeTansun"; //选择人员树组件
import minixs from "@/minixs/index"; //控制域
import shiwucommon from "../approval/minixs/shiwucommon"; //事物审批公共方法
import viewDraft from "@/minixs/viewDraft";
import supbankTree from "components/tree/superiorBank1.vue"; //上级行树组件
import uploadFileTs from "components/uploadFile/uploadFileTs"; //上传组件
import appendWriteList from "components/viewFlow/perWrit"; //常用批语
import backreason from "@/components/viewFlow/backReason"; //反馈意见
import openOrDownLoadFile from "../../minixs/shiwuLineWord"; //在线预览
import exportTable from "../../minixs/exportTable"; //导出
import treeCofigForCy from "@/components/tree/tree-cyTansun"; //传阅
import formTextChange from "@/minixs/yongyinText/changgui"; //控制label

export default {
  name: "zfDetail",
  components: {
    selectPerson, //完成并发送选人组件
    supbankTree, //发上级行部门树组件
    uploadFileTs, //上传附件组件
    shiwuFlow, //查看流程组件
    appendWriteList, //自定义意见域组件
    backreason, //退回原因组件
    treeCofigForCy //传阅人员组件
  },
  mixins: [minixs, openOrDownLoadFile, shiwucommon, formTextChange,viewDraft],
  data() {
    return {
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      currentUser:'',
      //请求树结构
      bank_send: {
        function: "selWfNodeTy",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: "",
        wfeUnitId: ""
      },
      loadingTree: true,
      reasonPlaceholder: "",
      examineIdeaPlaceholder: "",
      exaunitIdeaPlaceholder: "",
      blIdeaPlaceholder: "",
      cyIdeaPlaceholder: "",
      markPlaceholder: "",
      applyFlag: false, //判断是否为审计机构
      approvalTitle: "", //表单标题
      lastMarkTime: "0", //最新一条备注时间
      lastOptionTime: "0", //最新一条意见时间
      localUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前人员ID
      finSendBtn: false, //控制完成并发送后按钮是否可操作
      treeTradeCode: this.$businessCode.swglgg, //人员树交易线
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      scircularizeLevel: "1",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      seletOptionsDataForCy: [],
      SP: "SP",
      QS: "QS",
      SP: "SP",
      isImportant: true, //引入按钮状态
      backReasonChart: false,
      reasontableData: [],
      isdialogBack: false, //退回修改
      offenDevices: [],
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型
      YRattchmentFileInfo: [],
      isdialogYRDeal: false, //引入详情
      YRDeal: {
        YRCode: "",
        YRTitle: ""
      },

      YRcurrentBtn: [], //当前点击的引入依据
      YRformData: {
        YRbusinName: "", //引入类型
        YRwenhao: "〔〕号" //引入文号
      },
      YRcheck: [], //引入超链接
      choobusiness: [
        //引入依据的类型
        { name: "发文", idType: "1" },
        { name: "收文", idType: "2" },
        { name: "签报", idType: "3" },
        { name: "便函", idType: "4" }
      ],
      YRrules: {
        //引入依据必填校验
        YRbusinName: [
          { required: true, message: "请选择依据文件类型", trigger: "blur" }
        ],
        YRwenhao: [{ required: true, message: "请输入文号", trigger: "blur" }]
      },
      ZGdepar: [], //主管部门
      isdialogYR: false, //控制引入弹窗的是否展示
      uploadConfig: {
        //上传附件的配置
        formId: "shiwuForm",
        filesHas: [],
        isSpecial: 1001,
        id: ""
      },
      uploadConfigPZ: {
        formId: "shiwuFormPZ",
        filesHas: [],
        isSpecial: 1002,
        id: ""
      },
      uploadConfigSP: {
        formId: "shiwuFormSP",
        filesHas: [],
        isSpecial: 1003,
        id: ""
      },
      title: "发上级行",
      seletOptionsData: [],
      orgOrDept: 1,
      upOrgOrDeptId: "",
      orgOrDeptId: "0",
      // isBankLevel:false,
      showOrgTree: false,
      isSingle: false,
      //填写申请
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",
      isYijian: true,
      radioData: [],
      draftDepartmentList: [],
      perCode: [],
      CYBackPer: [],
      isdialogCY: false,
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
      singelCheckF: true, // 单选true 多选为false
      dialogTypeNow: "next",
      treeData: [{ name: "中国建设银行", id: "007" }],
      rowData: {},
      fromType: "",
      checkType: [],
      select: "",
      radio: "",
      rules: {},
      formData: {
        checkOpinionList:[],
        examineIdea: "",
        status: "",
        mainDepart: "",
        isKh: "",
        applyProjectName: "",
        draftDepartment: "",
        contactName: "",
        contactTel: "",
        title: "",
        reason: "",
        contactTel: "",
        examineIdea: "",
        exaunitIdea: "",
        blIdea: "",
        cyIdea: "",
        mark: "",
        applyEndOpinion: "",
        checkEndOpinion: "",
        departName: "",
        departId: "",
        attchmentFileInfo: []
      },
      khType: "",
      FEIbuttonList: [
        { name: "保存", type: "baocun", show: true },
        { name: "收回", type: "shouhui", show: false },
        { name: "完成并发送", type: "wcbfs", show: false },
        { name: "删除此文", type: "shanchuciwen", show: false },
        { name: "填写申请", type: "tianxiesq", show: false }, //9
        { name: "处理申请", type: "chulisq", show: false }, //10
        { name: "查看申请", type: "chakansq", show: false }, //11
        { name: "退回修改", type: "btn_backAlter", show: false },
        { name: "返回请示行", type: "btn_sendxj", show: false },
        { name: "返回上一处理人", type: "tuihuishangyiclr", show: false },
        { name: "退回原因", type: "tuihuiyy", show: true },
        { name: "催办", type: "cuiban", show: false },
        { name: "修改重报", type: "btn_xgcb", show: false },
        { name: "导出", type: "daochu", show: false },
        { name: "生成编号", type: "scbh", show: false },
        { name: "退号", type: "tuihao", show: false },
        { name: "发上级行", type: "btn_sendsj", show: false },
        { name: "传阅", type: "chuanyue", show: false },
        { name: "传阅收回", type: "chuanyueshouhui", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "查看流程", type: "cklc", show: false },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "caozuozhinan", show: false },
        { name: "维护", type: "weihu", show: false },
        { name: "流程调度", type: "lichengdiaodu", show: false }
      ],
      //不可编辑控制域
      readFields: {
        cllx: false, //申请项目
        khbz: false, //跨行
        cllx: false, //申请项目
        spbh: false, //审批编号
        sqbh: false, //申请编号
        zgbm: false, //主管部门
        lxr: false, //联系人
        lxdh: false, //联系电话
        title: false, //标题
        syty: false, //事由提要

        spyj: false, //审批意见
        cyyj: false, //传阅意见
        ngyj: false, //申请单位意见
        blqk: false, //办理情况
        mark: false, //备注
        applyEndOpinion: false, //申请单位最终意见
        checkEndOpinion: false //审批最终意见
      },
      //必填控制域
      requiredFields: {
        firstDepart: "", //申请项目
        khbz: "", //跨行
        cllx: "", //申请部门
        spbh: "", //审批编号
        sqbh: "", //申请编号
        zgbm: "", //主管部门
        lxr: "", //联系人
        lxdh: "", //联系电话
        title: "", //标题
        syty: "", //事由提要

        spyj: "", //审批意见
        ngyj: "", //申请单位意见
        blqk: "", //办理情况
        cyyj: "", //传阅意见
        mark: "", //备注
        sqdwzzyj: "", //申请单位最终意见
        spzzyj: "" //审批最终意见
      },
      //可编辑意见域
      editedIdeaFields: {
        spyj: true, //审批意见
        ngyj: true, //申请单位意见
        blqk: true, //办理情况
        cyyj: true, //传阅意见
        mark: true, //备注
        sqdwzzyj: true, //申请单位最终意见
        spzzyj: true //审批最终意见
      },
      //必填意见域
      requiredIdeaFields: {
        spyj: false, //审批意见
        ngyj: false, //申请单位意见
        blqk: false, //办理情况
        mark: false, //备注
        sqdwzzyj: false, //申请单位最终意见
        spzzyj: false //审批最终意见
      },
      id: "",
      isKh: "",
      projectShortName: "",
      bankOrgId: "",
      isZG: true,
      isGC: true,
      spFlag: true,
      ifView: 0, //编辑状态
      humanId: "",
      isImport: true,
      YRformId: "",
      YRformTitle: "",
      orderNo: "",
      isZGinput: true,
      applyBtn: false,
      YRwenjian: "",
      shiwuState: "viewFile",
      importArr: [],
      levelBank: false, //发上级行
      isFileShow: false, //附件域显示
      isFileShowPZ: false, //附件域显示
      isFileShowSP: false, //附件域显示
      showOne: false,
      showTwo: false,
      showThree: false,
      formData: {},
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      isShowDocument:false,
      isAuthorizeOthers: false, // 是否转授权给其他人， true 为转授，false 为 未转授权
      documentNoDataStore: "" //编号相关详情信息，用于判断生成审批编号还是申请编号
    };
  },
  computed: {},
  methods: {
    yrviewFile(file, tache) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      if (!file.filePath && tache == "1") {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "依据没有正文！",
          duration: 500
        });
        return;
      }
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fawglfj
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
                downLoadFileReName(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName +
                    "&openFile=true",
                  res.fileName
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
    //多文本框中动态展示提示语
    tidIdea() {
      if (!this.readFields.syty) {
        this.reasonPlaceholder = "填写不可多于500字";
      }
      if (!this.editedIdeaFields.spyj&&this.isYijian) {
         if(this.radioData.length===2){
 this.examineIdeaPlaceholder =
          "审批结论选择‘不同意’时请填写意见;审批结论为空或选择‘同意’时可以不填意见,且填写不可多于500字";
         }else{
 this.examineIdeaPlaceholder =
          "审批结论选择‘部分同意’或‘不同意’时请填写意见;审批结论为空或选择‘同意’时可以不填意见,且填写不可多于500字";
         }
       
      }else{
        this.examineIdeaPlaceholder='';
      }
      if (!this.editedIdeaFields.ngyj) {
        this.exaunitIdeaPlaceholder = "填写不可多于500字";
      }
      if (!this.editedIdeaFields.blqk) {
        this.blIdeaPlaceholder = "填写不可多于500字";
      }
      if (!this.editedIdeaFields.cyyj) {
        this.cyIdeaPlaceholder = "填写不可多于500字";
      }
      if (!this.readFields.mark) {
        this.markPlaceholder = "填写不可多于500字";
      }
    },
    //删除当前登录人最近一条备注
    deleteCurMark(dataId) {
      this.$api.checkLz.adminDeleMark({ id: dataId }).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.queryDeal();
        }
      });
    },
    //删除当前登录人最近一条意见
    deleteCurIdea(dataId) {
      this.$api.checkLz.adminDeleSugg({ id: dataId }).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.queryDeal();
        }
      });
    },
    //筛选申请部门并将所选部门相应的值赋给表单
    draftDepartmentChange() {
      this.draftDepartmentList &&
        this.draftDepartmentList.map(item => {
          if (item.firstUnitName == this.formData.draftDepartment) {
            this.formData.draftDepartmentId = item.firstUnitId;
            this.formData.currentUser = item.humanName;
            this.currentUser=item.humanName;
            this.formData.currentUserId = item.humanId;
            this.formData.draftUserName = item.humanName;
            this.formData.draftUserId = item.humanId;
            this.formData.curbank = item.unitName;
            this.formData.curbankId = item.unitId;
            this.$set(
              this.formData,
              "contactTel",
              item.telMobile.replace(/,/g, " ")
            );
          }
        });
    },
    backPerCY() {
      this.$api.checkLz
        .CYbackPer({
          userId: this.CYBackPer[0].split("_")[0]
        })
        .then(res => {})
        .catch(error => {
          this.CYBackPer = [];
        });
    },
    //退回修改
    BackhandleClose() {
      this.isdialogBack = false;
    },
    //初始化规则
    initRule() {
      this.rules = {
        isKh: [
          {
            required: this.requiredFields.khbz,
            message: "不能为空",
            trigger: "change"
          }
        ],
        applyProjectName: [
          {
            required: this.requiredFields.firstDepart,
            message: "不能为空",
            trigger: "change"
          }
        ],
        mainDepart: [
          {
            required: this.requiredFields.zgbm,
            message: "不能为空",
            trigger: "change"
          }
        ],
        draftDepartment: [
          {
            required: this.requiredFields.cllx,
            message: "不能为空",
            trigger: "change"
          }
        ],
        contactName: [
          {
            required: this.requiredFields.lxr,
            message: "不能为空",
            trigger: "change"
          }
        ],
        contactTel: [
          {
            required: this.requiredFields.lxdh,
            message: "不能为空",
            trigger: "change"
          }
        ],
        title: [
          {
            required: this.requiredFields.title,
            message: "不能为空",
            trigger: "change"
          }
        ],
        reason: [
          {
            required: this.requiredFields.syty,
            message: "不能为空",
            trigger: "change"
          }
        ],

        examineIdea: [
          {
            required: this.requiredIdeaFields.spyj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        exaunitIdea: [
          {
            required: this.requiredIdeaFields.ngyj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        blIdea: [
          {
            required: this.requiredIdeaFields.blqk,
            message: "不能为空",
            trigger: "change"
          }
        ],
        cyIdea: [
          {
            required: this.requiredIdeaFields.cyyj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        mark: [
          {
            required: this.requiredIdeaFields.mark,
            message: "不能为空",
            trigger: "change"
          }
        ],
        applyEndOpinion: [
          {
            required: this.requiredIdeaFields.sqdwzzyj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        checkEndOpinion: [
          {
            required: this.requiredIdeaFields.spzzyj,
            message: "不能为空",
            trigger: "change"
          }
        ]
      };
    },
    //侧边滚动
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
        scrolled < this.distance_qpyj
      ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },
    backToOldUser() {
            if (
        (this.formData.status == "不同意" ||
          this.formData.status == "部分同意") &&
        (this.formData.examineIdea == "" ||
          this.formData.examineIdea == undefined)
      ) {
        this.$message({
          type: "warning",
          message: "请填写审批意见"
        });
        return;
      }
      this.$api.checkLz
        .checkLzAlter({
          ...this.formData,
          handleButton: "完成并发送",
          currentNodeId: this.formData.currentNodeId,
          currentNode: this.formData.currentNode
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            if (
              res.msg.indexOf("当前处理人与登录人不一致，请刷新当前页面") != -1
            ) {
              this.$confirm(res.msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).finally(() => {
                window.location.reload();
              });
            } else {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.finSendBtn = true;
              try {
                this.messageWarn(data[0].idStr);
              } catch (e) {
                this.$intent.closeWindow(this);
              }
            }
          } else {
            this.finSendBtn = false;
            this.$intent.closeWindow(this);
          }
        })
        .catch(err => {
          this.finSendBtn = false;
          this.queryDeal();
        });
    },
    //按钮控制
    buttonClick(params) {
      switch (params) {
        case "保存":
          this.saveData();
          break;
        case "完成并发送":
          this.saveImport(); //引入依据的保存
          this.checkData = []; //清空选中数据，避免和传阅选中数据混合
          this.formData.backType = 0;
          this.formData.backType = 0;
          if (this.formData.backFlag1 && !!this.formData.oldUserName) {
            this.$confirm(
              "是否返回" + this.formData.oldUserName + "?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                this.formData.backType = 1;
                this.formData.backType = 1;
                this.spyjpd();
              })
              .finally(() => {
                if (this.formData.backType == 1) {
                  this.backToOldUser();
                } else {
                  this.finAndSend();
                }
              });
          } else {
            this.finAndSend();
          }
          break;
        case "办结":
          this.$confirm("确定要办结吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.finUpData();
          });

          break;
        case "传阅":
          this.getTreeDataForCy("cy");
          break;
        case "传阅收回":
          this.circulRe();
          break;
        case "查看流程":
          this.$api.pubInfo
            .Lookcx({
              curProcessInstId: this.formData.workFlowId,
              subProcessInstId: this.formData.workFlowIds,
              numyear:this.numyear
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
        case "收回":
          this.lzRegin();
          break;
        case "返回上一处理人":
          this.backPrevious();
          break;
        case "生成编号":
          if (
            this.formData.exaunitIdea ||
            (this.formData.applyOpinionList &&
              this.formData.applyOpinionList.length > 0)
          ) {
            this.$api.checkLz
              .detailForNum({
                id: this.id
                // isKh: this.khType
              })
              .then(res => {
                this.documentNoDataStore = {
                  ...res.relustPo,
                  manageBankId: res.manageBankId
                };
                this.deleteapplyCode = -1;
                console.log("this.deleteapplyCode", this.deleteapplyCode);
                this.generateNum();
              });
          } else {
            this.$message({
              type: "warning",
              message: "请填写申请单位意见"
            });
          }
          break;

        case "退号":
          this.$confirm("您是否要执行退号并解锁操作？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.backNum();
          });

          break;
        case "删除此文":
          this.delete_btn();
          break;
        case "发上级行":
          this.superiorBank();
          break;
        case "返回请示行":
          if (
            this.formData.blIdea ||
            (this.formData.blqkOpinionList &&
              this.formData.blqkOpinionList.length > 0)
          ) {
            this.backAskforBank();
          } else {
            this.$message({
              type: "warning",
              message: "请填写办理情况"
            });
          }
          // this.backAskforBank()
          break;
        case "退回修改":
          this.isdialogBack = true;
          break;
        case "退回原因":
          this.backReason();
          break;
        case "催办":
          this.CBqueal();
          break;
        case "填写申请":
          if(!this.formData.title) {
            this.formData.title = ""
          }
          console.log('tiele',this.formData.title)
          this.writeApply();
          break;
        case "处理申请":
          this.writeApply();
          break;
        case "查看申请":
          this.viewApply();
          break;
        case "打印处理单":
          this.printForm();
          break;
        case "操作指南":
          this.handBook("SWSP");
          break;
        case "修改重报":
          this.FEIbuttonList[5].show = true;
          this.FEIbuttonList[6].show = false;
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
              .handleCollection({ id: this.id, dataType: 1, docType: 1,numyear:this.numyear})
              .then(res => {
                this.downFile(res);
              });
          });
          // let titleId = "";
          // if (null ?? !this.formData.isKh) {
          //   titleId = "printHtmlBH";
          // } else {
          //   titleId = "printHtmlKH";
          // }
          // let that = this;
          // let shiwutitle =
          //   (this.formData.unitName || this.formData.curbank) +
          //   this.formData.applyProjectName +
          //   "审批处理单";
          // let draftInfo = this.formData.xksqFilePath
          //   ? [].concat(
          //       {
          //         fileName: this.formData.xksqFileName,
          //         filePath: this.formData.xksqFilePath
          //       },
          //       this.formData.attchmentFileInfo
          //     )
          //   : this.formData.attchmentFileInfo; //收藏时下载正文
          // exportTable.getPdf(
          //   shiwutitle,
          //   draftInfo,
          //   titleId,
          //   this.$businessCode.fawglfj,
          //   shiwutitle,
          //   that
          // );
          break;
      }
    },
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
          query: { data: copyRow,numyear:this.numyear}
        });
      } else if (this.formData.isKh == 1) {
        this.$intent.goNewPage(this, {
          path: "/shiwuBenhangkh",
          query: { data: copyRow,numyear:this.numyear}
        });
      }
    },
    //申请跳转
    doDraft(fileInfo) {
      console.log(name);
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
      let path = getMachineType()
        ? "/openAndSave_WordTs"
        : "openAndSave_Wps_Tansun";
      let data = this.$router.resolve({
        path: path,
        query: {
          state: this.shiwuState,
          tanSun: "1",
          id: this.id ? this.id : "1",
          isKh: this.formData.isKh.toString(),
          zhengWenState: fileInfo.ifView,
          JYcode: "A0846C002",
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
      var one = data.href.split("?")[0];
      var newPath =
        "#" + data.href.substring(one.lastIndexOf("/"), data.href.length);
      window.open(newPath, "_blank");
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
    //填写申请
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
            { ...this.formData }
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
          this.$api.checkLz.checkLzAlter(this.formData).then(res => {
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
    //分离出保存（审批意见）
    deaapproveIdea() {
      this.formData.id = this.id;
      this.$api.checkLz.checkLzAlter(this.formData).then(res => {
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
    //起草保存文件：将文件ID与业务ID 做绑定
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.formData.attachid,
          fileType: this.formData.isKh == "1" ? "1001" : "0"
        })
        .then(res => {});
    },
    //保存数据
    saveData() {
      this.formData.handleButton = "保存";
      this.saveImport(); //引入依据的保存
      if (localStorage.getItem("shiwuJinge")) {
        let jingeJSON = JSON.parse(localStorage.getItem("shiwuJinge"))
          .Data_Cntnt;
        let jinGeData = JSON.parse(jingeJSON);
        this.formData.xksqFileName = jinGeData.fileName;
        this.formData.xksqFilePath = jinGeData.filePath;
        localStorage.removeItem("shiwuJinge");
      }
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          console.log(
            "事物保存校验",
            "!this.editedIdeaFields.spyj",
            !this.editedIdeaFields.spyj
          );
          if (!this.editedIdeaFields.spyj) {
            if (
              this.formData.status == "不同意" ||
              this.formData.status == "部分同意"
            ) {
              if (this.formData.examineIdea == undefined) {
                this.$message({
                  type: "warning",
                  message: "请填写审批意见"
                });
              } else {
                this.spyjpd();
                this.deaapproveIdea();
              }
            } else {
              this.spyjpd();
              this.deaapproveIdea();
            }
          } else {
            console.log(this.id, "saveData--->this.id");
            if (this.id) {
              this.formData.handleButton = "保存";
              this.formData.id = this.id;
              console.log("保存操作执行1118");
              this.$api.checkLz.checkLzAlter(this.formData).then(res => {
                if (res.code == "SUCCESS") {
                  this.formData.mark = "";
                  if (
                    res.msg.indexOf(
                      "当前处理人与登录人不一致，请刷新当前页面"
                    ) != -1
                  ) {
                    this.$confirm(res.msg, "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning"
                    }).finally(() => {
                      window.location.reload();
                    });
                  } else {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.queryDeal();
                    // this.getHuanJie()
                  }
                }
              });
            } else {
              this.formData.currentNode = "填写审批单";
              this.formData.handleButton = "保存";
              this.$api.checkLz.checkLzCreate(this.formData).then(res => {
                console.log('resssss',res)
                this.id = res.id;
                this.createFile();
                let shiwu = { id: this.id, isKh: this.formData.isKh };
                let shuwuJSON = JSON.stringify(shiwu);
                sessionStorage.setItem("shiwuId", shuwuJSON);
                if (res.code == "SUCCESS") {
                  this.formData.mark = "";
                  if (
                    res.msg &&
                    res.msg.indexOf(
                      "当前处理人与登录人不一致，请刷新当前页面"
                    ) != -1
                  ) {
                    this.$confirm(res.msg, "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning"
                    }).finally(() => {
                      window.location.reload();
                    });
                  } else {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.queryDeal();
                    // this.getHuanJie()
                  }
                }
              });
            }
          }
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填项后保存"
          });
        }
      });
    },
    //判断审批意见
    spyjpd() {
      if (this.formData.status == undefined) {
        this.formData.status = "";
      } else if (this.formData.examineIdea == undefined) {
        this.formData.examineIdea = "";
      }
      if (
        this.formData.status == "不同意" ||
        this.formData.status == "部分同意"
      ) {
        if (this.formData.examineIdea == "") {
          this.formData.examineIdea = "";
        } else {
          let ideaStatus = this.formData.examineIdea.split("|")[0];
          if (ideaStatus.split(" ")[0] != this.formData.status) {
            this.formData.examineIdea =
              this.formData.status + " | " + this.formData.examineIdea;
          } else {
            this.formData.examineIdea = this.formData.examineIdea;
          }
        }
      } else if (this.formData.status === "同意") {
        if (this.formData.examineIdea == "") {
          this.formData.examineIdea = this.formData.status;
        } else {
          let ideaStatus = this.formData.examineIdea.split("|")[0];
          if (ideaStatus.split(" ")[0] != this.formData.status) {
            this.formData.examineIdea =
              this.formData.status + " | " + this.formData.examineIdea;
          } else {
            this.formData.examineIdea = this.formData.examineIdea;
          }
        }
      } else if (this.formData.status == "") {
        if (
          this.formData.examineIdea == undefined ||
          this.formData.examineIdea == ""
        ) {
          this.formData.examineIdea = "";
        } else {
          this.formData.examineIdea = this.formData.examineIdea;
        }
        this.formData.status = "";
      } else if (this.formData.examineIdea && this.formData.status) {
        let ideaStatus = this.formData.examineIdea.split("|")[0];
        if (ideaStatus.split(" ")[0] != this.formData.status) {
          this.formData.examineIdea =
            this.formData.status + " | " + this.formData.examineIdea;
        } else {
          this.formData.examineIdea = this.formData.examineIdea;
        }
      }
    },
    //关闭保存
    closeSaveData() {
      if (this.formData.status == undefined) {
        this.formData.status = "";
      } else if (this.formData.examineIdea == undefined) {
        this.formData.examineIdea = "";
      }
      if (this.formData.status !== "同意") {
      }
      if (this.formData.examineIdea || this.formData.status) {
        this.formData.examineIdea =
          this.formData.status + " | " + this.formData.examineIdea;
      } else {
        this.formData.examineIdea = "";
      }
      this.formData.handleButton = "保存";
      if (this.id) {
        this.formData.id = this.id;
        this.$api.checkLz.checkLzAlter(this.formData).then(res => {
          if (res.code == "SUCCESS") {
            this.id = res.id;
            this.uploadConfig.id = this.id;
            this.uploadConfigPZ.id = this.id;
            this.uploadConfigSP.id = this.id;
            this.formData.mark = "";
            if (
              res.msg.indexOf("当前处理人与登录人不一致，请刷新当前页面") != -1
            ) {
              this.$confirm(res.msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).finally(() => {
                window.location.reload();
              });
            } else {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              sessionStorage.removeItem("shiwuId");
              this.finSendBtn = true;
              this.$intent.closeWindow(this);
            }
          } else {
            this.finSendBtn = false;
          }
        });
      } else {
        this.formData.currentNode = "填写审批单";
        this.$api.checkLz.checkLzCreate(this.formData).then(res => {
          this.id = res.id;
          this.uploadConfig.id = this.id;
          this.uploadConfigPZ.id = this.id;
          this.uploadConfigSP.id = this.id;
          this.createFile();
          if (res.code == "SUCCESS") {
            if (
              res.msg.indexOf("当前处理人与登录人不一致，请刷新当前页面") != -1
            ) {
              this.$confirm(res.msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).finally(() => {
                window.location.reload();
              });
            } else {
              this.formData.mark = "";
              this.$message({
                message: "保存成功",
                type: "success"
              });
              sessionStorage.removeItem("shiwuId");
              this.finSendBtn = true;
              this.$intent.closeWindow(this);
            }
          } else {
            this.finSendBtn = false;
          }
        });
      }
    },
    //删除此文
    delete_btn() {
      this.$confirm("是否确定删除当前表单数据并退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.id) {
            this.$api.checkLz.checkLzDelete({ id: this.id }).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.finSendBtn = true;
                this.$intent.closeWindow(this);
              } else {
                this.finSendBtn = false;
              }
            });
          } else {
            this.$intent.closeWindow(this);
          }
        })
        .catch(() => {});
    },
    //传阅收回选择人员
    circulRe() {
      this.$api.checkLz
        .regainCircul({
          id: this.id,
          dataType: "制发"
        })
        .then(res => {
          this.perCode = res.list;
          if (this.perCode && this.perCode.length > 0) {
            this.isdialogCY = true;
          } else {
            this.$message({
              type: "warning",
              message: "当前登录人没有可收回传阅单"
            });
          }
        });
    },
    //传阅收回
    CYBacksure() {
      let idArr = [];
      let nameArr = [];
      let residueName = [];
      let perID = [];
      let cyName = [];
      let perCodeList = JSON.parse(JSON.stringify(this.perCode));
      if (!this.CYBackPer || this.CYBackPer.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择传阅收回人员"
        });
        return;
      }
      this.CYBackPer &&
        this.CYBackPer.map(item => {
          idArr.push(item.split(",")[1]);
          nameArr.push(item.split(",")[0]);
        });
      nameArr &&
        nameArr.map(item => {
          perID.push(item.split("_")[0]);
          cyName.push(item.split("_")[1]);
        });
      perID &&
        perID.map(itemID => {
          for (let i = perCodeList.length - 1; i >= 0; i--) {
            if (itemID === perCodeList[i].curUserId) {
              perCodeList.splice(i, 1);
            } else {
              // perCodeList.splice(i, 1)
            }
          }
        });
      perCodeList &&
        perCodeList.map(item => {
          residueName.push(item.curUserId + "_" + item.curUserCn);
        });
      this.$api.checkLz
        .CYretrieve({
          mainId: this.id,
          checkId_names: nameArr.join(","),
          unCheckId_names: residueName.join(","),
          dataType: "制发",
          ids: idArr.join(",")
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: "已经收回" + cyName.join(",") + "传阅文档",
              type: "success"
            });
            this.CYBackPer = [];
            this.isdialogCY = false;
            this.queryDeal();
          }
        });
    },
    //完成并发送请求人员树
    finAndSend() {
      this.dialogTypeNow = "next";
      this.dialogType = "dosend";
      if (localStorage.getItem("shiwuJinge")) {
        let jingeJSON = JSON.parse(localStorage.getItem("shiwuJinge"))
          .Data_Cntnt;
        let jinGeData = JSON.parse(jingeJSON);
        this.formData.xksqFileName = jinGeData.fileName;
        this.formData.xksqFilePath = jinGeData.filePath;
        localStorage.removeItem("shiwuJinge");
      }
      let that = this;
      if (this.editedIdeaFields.spyj) {
        this.$refs["elForm"].validate((valid, object) => {
          if (valid) {
            this.btnType = "1";
            this.offenUse = true;
            this.singelCheckF = true;
            if (!this.id) {
              this.formData.typeWCBH = "起草";
              this.$api.checkLz.checkLzCreate(this.formData).then(res => {
                this.id = res.id;
                this.createFile();
                let shiwu = { id: this.id, isKh: this.formData.isKh };
                let shuwuJSON = JSON.stringify(shiwu);
                sessionStorage.setItem("shiwuId", shuwuJSON);
                this.uploadConfig.id = this.id;
                this.uploadConfigPZ.id = this.id;
                this.uploadConfigSP.id = this.id;
                this.queryDeal();
                if (res.code == "SUCCESS") {
                  this.orgTreeSelect();
                }
              });
            } else {
              this.orgTreeSelect();
            }
          } else {
            for (let i in object) {
              let dom = this.$refs[i];
              dom.$el.scrollIntoView({
                block: "center",
                behavior: "smooth"
              });
              break;
            }
            this.$message({
              type: "warning",
              message: "请填写必填项后保存"
            });
          }
        });
      } else {
        if (
          this.formData.status == "不同意" ||
          this.formData.status == "部分同意"
        ) {
          if (
            this.formData.examineIdea == undefined ||
            this.formData.examineIdea == ""
          ) {
            this.$message({
              type: "warning",
              message: "请填写审批意见"
            });
          } else {
            this.spyjpd();
            this.$refs["elForm"].validate(valid => {
              if (valid) {
                this.btnType = "1";
                this.offenUse = true;
                if (!this.id) {
                  this.formData.typeWCBH = "起草";
                  this.$api.checkLz.checkLzCreate(this.formData).then(res => {
                    this.id = res.id;
                    this.createFile();
                    let shiwu = { id: this.id, isKh: this.formData.isKh };
                    let shuwuJSON = JSON.stringify(shiwu);
                    sessionStorage.setItem("shiwuId", shuwuJSON);
                    this.uploadConfig.id = this.id;
                    this.uploadConfigPZ.id = this.id;
                    this.uploadConfigSP.id = this.id;
                    if (res.code == "SUCCESS") {
                      this.orgTreeSelect();
                    }
                  });
                } else this.orgTreeSelect();
              } else {
              }
            });
          }
        } else {
          this.spyjpd();
          this.$refs["elForm"].validate(valid => {
            if (valid) {
              this.btnType = "1";
              this.offenUse = true;
              if (!this.id) {
                this.formData.typeWCBH = "起草";
                this.$api.checkLz.checkLzCreate(this.formData).then(res => {
                  this.id = res.id;
                  let shiwu = { id: this.id, isKh: this.formData.isKh };
                  let shuwuJSON = JSON.stringify(shiwu);
                  sessionStorage.setItem("shiwuId", shuwuJSON);
                  this.uploadConfig.id = this.id;
                  this.uploadConfigPZ.id = this.id;
                  this.uploadConfigSP.id = this.id;
                  if (res.code == "SUCCESS") {
                    this.orgTreeSelect();
                  }
                });
              } else this.orgTreeSelect();
            }
          });
        }
      }
    },
    reloadTree(list) {
      let that = this;
      this.formData.pcsAvyId = list[0].PCSAVYID;
      this.seletOptionsData = list;
      let PCSAVYIDs = [];
      this.seletOptionsData = list.filter(item => {
        if (!PCSAVYIDs.includes(item.PCSAVYID)) {
          PCSAVYIDs.push(item.PCSAVYID);
          return item;
        }
      });
      this.bank_send.function = "selWfNodeTy";
      this.bank_send.pcsAvyId = list[0].PCSAVYID;
      this.bank_send.curTplNo = that.seletOptionsData[0].PTPLNO;
      this.bank_send.curMultiTenancyId =
        that.seletOptionsData[0].MULTITENANCYID;
      this.bank_send.wfeUnitId = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitId;
      this.$set(
        this.formData,
        "wfeUnitId",
        JSON.parse(localStorage.getItem("userInfo")).unitId
      );
      let postData = Object.assign({}, that.formData, this.bank_send);
      that.formData = Object.assign({}, that.formData, this.bank_send);

      that.$post
        .postData("selWfNodeTy", JSON.stringify(postData), "A0846C037")
        .then(res => {
          if (res.message == "Loading") {
            that.loadingTree = true;
          } else {
            that.loadingTree = false;
          }
          that.dialogState = true;
          that.treeData = (res.data && res.data.data) || [];
          that.defaultUser = (res.data && res.data.defaultUser) || {};
          console.log("ysq", that.treeData);
        })
        .catch(e => {});
    },
    filterPsavyNode(list){
              let PCSAVYIDs = [];
              let acyNodeNextBount=this.huanJieMessage.acyNodeNextBount;
              let selectOptionsList=[]
              if(!acyNodeNextBount){
                this.seletOptionsData=list;
              }else{
              for(let prop in list){
                let item=list[prop];
                console.log('this.formData',this.formData)
                let _condition=acyNodeNextBount[item.PCSAVYID]?.condition[0];
                console.log('_condition',_condition)
                let hasPcsavyid=acyNodeNextBount.hasOwnProperty(item.PCSAVYID);
                console.log('hasPcsavyid',hasPcsavyid)
                if (!PCSAVYIDs.includes(item.PCSAVYID)&&hasPcsavyid&&eval(_condition)
                ||!PCSAVYIDs.includes(item.PCSAVYID)&&!hasPcsavyid) {
                  PCSAVYIDs.push(item.PCSAVYID);
                  selectOptionsList.push(item)
                }
              }
              this.seletOptionsData=selectOptionsList;
              }
           console.log('this.seletOptionsData',this.seletOptionsData)
    },
    //分离出选择人员树
    orgTreeSelect() {
      let that = this;
      if ((this.formData.typeWCBH = "起草")) {
        //判断当前环节如果是起草
        if (!this.formData.textMoudleName && !this.formData.textMoudlePath) {
          //若项目没有模板可发送下一环节
          this.$api.checkLz
            .ZFqueryPerTree({
              id: this.id,
              ccbToken: localStorage.getItem("st")
            })
            .then(res => {
              // console.log("----log完成并发送id取值--------");
              // this.reloadTree(res.list);
              this.dialogState = true;
             // this.seletOptionsData = res.list;
                this.$nextTick(() => {
             //this.seletOptionsData = res.list;
               that.filterPsavyNode(res.list);
                });

            })
        } else {
          //若项目有模板必填模板后方可发送下一环节
          // if (this.formData.xksqFileName && this.formData.xksqFilePath) {
          //   this.$api.checkLz
          //     .ZFqueryPerTree({
          //       id: this.id,
          //       ccbToken: localStorage.getItem("st")
          //     })
          //     .then(res => {
          //       // console.log("----log完成并发送id取值--------");
          //       // this.reloadTree(res.list);
          //       this.dialogState = true;
          //       this.$nextTick(() => {
          //    // this.seletOptionsData = res.list;
          //       that.filterPsavyNode(res.list);
          //       });
          //     })
          // } else {
          //   this.$message({
          //     type: "warning",
          //     message: "请先填写申请后再发送至下一环节"
          //   });
          // }
        }
      } else {
        //若当前环节非起草环节不再判断模板是否必填
        this.$api.checkLz
          .ZFqueryPerTree({
            id: this.id,
            ccbToken: localStorage.getItem("st")
          })
          .then(res => {
            // console.log("----log完成并发送id取值--------");
            // this.reloadTree(res.list);
            this.dialogState = true;
             // this.seletOptionsData = res.list;
                this.$nextTick(() => {
             // this.seletOptionsData = res.list;
                that.filterPsavyNode(res.list);
                });
          })
      }
    },
    //办结
    finUpData() {
      this.formData.id = this.id;
      this.$api.checkLz
        .checkLzAlter({
          ...this.formData,
          isKh: this.formData.isKh,
          handleButton: "办结",
          id: this.id
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.finSendBtn = true;
            this.$intent.closeWindow(this);
          } else {
            this.finSendBtn = false;
          }
        });
    },
    //刷新请求
    loadqueryDeal() {
      let shiwudata = JSON.parse(sessionStorage.getItem("shiwuId"));
      if (shiwudata.id) {
        this.id = shiwudata.id;
        this.khType = shiwudata.isKh.toString();
      }
      this.$api.checkLz
        .checkLzDeal({
          id: this.id,
          isKh: this.khType,
          numYear:this.numyear
        })
        .then(res => {
          // this.fiflterDepar()//过滤部门
          this.formData = res.data;
          if (res.data.id) {
            this.isZGinput = true;
          } else {
            this.isZGinput = false;
          }
          // 判断当前登录人是否为 授权人页面， 否的话直接 赋值为 true
          if (this.formData.beAuthUserName&&this.formData.beAuthCode&&JSON.parse(localStorage.getItem('userInfo')).humanCode!=this.formData.beAuthCode) {
            // 判断是否转授权给其他人
            this.isAuthorizeOthers = true;
            this.isRouteFrom(this.formData.beAuthUserName || '')
          } else {
            this.isAuthorizeOthers = false;
             this.isShowDocument = true;
          }
          this.id = res.data.id;
          console.log("this.id", this.id);
          this.iskh = res.data.isKh;
          this.formData.markList = res.markList;
          //审批意见列表
          this.formData.checkOpinionList = res.checkOpinionList;
          this.formData.applyOpinionList = res.applyOpinionList;
          this.formData.sytyOpinionList = res.sytyOpinionList;
          this.formData.cyOpinionList = res.cyOpinionList;
          this.formData.blqkOpinionList = res.blqkOpinionList;
          //退回原因显示
          this.$set(this.formData, "returnReason", "");
          // this.formData.returnReason=''
          if (res.returnFlag) {
            console.log("this.formData.returnFlag", this.formData.returnFlag);
            this.formData.returnFlag = true;
          } else {
            this.formData.returnFlag = false;
          }
          this.formData.modNewFlag = res.modNewFlag;
          //筛选所有可删除意见最后一条意见添加时间
          try {
            res.checkOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.applyOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.sytyOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.cyOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.blqkOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.markList.filter(item => {
              this.lastMarkTime =
                this.lastMarkTime > item.createTime
                  ? this.lastMarkTime
                  : item.createTime;
            });
          } catch (e) {}
          if (null ?? this.formData.isKh) {
            this.formData.isKh = parseInt(this.formData.isKh);
          }
          this.radioData = res.approveResult && res.approveResult.split(" ");
        //   console.log(res.data.examineIdea,res.approveResult,'按钮状态')
        //  if(res.approveResult){
        //     this.formData.status=res.checkOpinionList[0].concat
        //   }
          if (this.radioData == "空") {
            this.isYijian = false;
          }
          if (res.isEndOpinion == "0") {
            this.isZG = false;
          } else if (res.isEndOpinion == "1") {
            this.isZG = true;
          }
          if (res.isViewEndOpinion == "0") {
            this.isGC = false;
          } else if (res.isViewEndOpinion == "1") {
            this.isGC = true;
          }
          console.log("---------res.data.xksqFileName", res.data.xksqFileName);
          console.log("res.data.xksqFileName", res.data.xksqFileName);
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
          //制度文件
          this.formData.manageSystemName = res.manageSystemName;
          this.formData.manageSystemPath = res.manageSystemPath;
          this.formData.manageSystemId = res.manageSystemId;
          this.approvalTitle =
            (this.formData.unitName || this.formData.curbank) +
            this.formData.applyProjectName +
            "审批处理单";
          this.getFileList();
          this.getHuanJie();
          setTimeout(() => {
            this.checkLzDealChai()
          }, 0);
        });
    },
    //请求详情
    queryDeal() {
      this.$api.checkLz
        .checkLzDeal({ id: this.id, isKh: this.khType,numYear:this.numyear })
        .then(res => {
          this.formData = res.data;
          this.$set(this.formData, "backFlag1", res.backFlag1);
          this.formData.markList = res.markList;
          this.formData.checkOpinionList = res.checkOpinionList;
          this.formData.applyOpinionList = res.applyOpinionList;
          this.formData.sytyOpinionList = res.sytyOpinionList;
          this.formData.cyOpinionList = res.cyOpinionList;
          this.formData.blqkOpinionList = res.blqkOpinionList;
          this.YRcheck = res.leadInfoList;
        });
      this.$api.checkLz
        .checkLzDeal({
          id: this.id,
          isKh: this.khType,
          numYear:this.numyear
        })
        .then(res => {
          this.formData = res.data;
           // 判断当前登录人是否为 授权人页面， 否的话直接 赋值为 true
          if (this.formData.beAuthUserName&&this.formData.beAuthCode&&JSON.parse(localStorage.getItem('userInfo')).humanCode!=this.formData.beAuthCode) {
            // 判断是否转授权给其他人
            this.isAuthorizeOthers = true;
            this.isRouteFrom(this.formData.beAuthUserName || '')
          } else {
            this.isAuthorizeOthers = false;
            this.isShowDocument = true;
          }
          this.formData.checkOpinionFlag = res.checkOpinionFlag;
          this.formData.workFlowIds = res.workFlowIds;
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          //拟稿人部门
          this.formData.draftDepartment = res.data.draftDepartment;
          this.formData.draftDepartmentId = res.data.draftDepartmentId;
          //当前处理人部门
          this.formData.departName = res.data.departName;
          this.formData.departId = res.data.departId;
          //拟稿人
          this.formData.draftUserName = res.data.draftUserName;
          this.formData.draftUserId = res.data.draftUserId;

          if (res.data.id) {
            this.isZGinput = true;
          } else {
            this.isZGinput = false;
          }
          this.id = res.data.id;
          this.uploadConfig.id = this.id;
          this.uploadConfigPZ.id = this.id;
          this.uploadConfigSP.id = this.id;
          //传阅收回约束
          this.formData.cyOrders = res.cyOrders;
          //(审批意见)
          this.formData.checkFlag = res.data.checkFlag;
          //当前行是否审批行
          this.formData.currUnitId = res.user.unitId;
          // this.formData.unitId=res.user.unitId
          this.formData.manageBankId = res.manageBankId;
          if (this.formData.currUnitId == this.formData.manageBankId) {
            this.levelBank = false;
          } else {
            this.levelBank = true;
          }
          //退回原因按钮
          this.formData.returnFlag = res.returnFlag;
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
          //制度文件
          this.formData.manageSystemName = res.manageSystemName;
          this.formData.manageSystemPath = res.manageSystemPath;
          this.formData.manageSystemId = res.manageSystemId;
          //退回原因显示
          this.$set(this.formData, "returnReason", "");
          // this.formData.returnReason=''
          if (res.returnFlag) {
            console.log("this.formData.returnFlag", this.formData.returnFlag);
            this.formData.returnFlag = true;
          } else {
            this.formData.returnFlag = false;
          }
          //是否展示發上級行按鈕
          this.formData.sendUpFlag = res.sendUpFlag;
          //发上级行
          this.formData.upFlag = res.upFlag;
          //是否展示修改重報按鈕
          this.formData.modNewFlag = res.modNewFlag;
          this.iskh = res.data.isKh;
          this.formData.markList = res.markList;
          this.formData.checkOpinionList = res.checkOpinionList;
          this.formData.applyOpinionList = res.applyOpinionList;
          this.formData.sytyOpinionList = res.sytyOpinionList;
          this.formData.cyOpinionList = res.cyOpinionList;
          this.formData.blqkOpinionList = res.blqkOpinionList;
          this.formData.checkEndOpinionList = res.checkEndOpinionList;
          this.formData.applyEndOpinionList = res.applyEndOpinionList;
          setTimeout(() => {
            this.checkLzDealChai()
          }, 0);
          //筛选所有可删除意见最后一条意见添加时间
          try {
            res.checkOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.applyOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.sytyOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.cyOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.blqkOpinionList.filter(item => {
              this.lastOptionTime =
                this.lastOptionTime > item.createTime
                  ? this.lastOptionTime
                  : item.createTime;
            });
          } catch (e) {}
          try {
            res.markList.filter(item => {
              this.lastMarkTime =
                this.lastMarkTime > item.createTime
                  ? this.lastMarkTime
                  : item.createTime;
            });
          } catch (e) {}
          if (this.formData.isKh) {
            this.formData.isKh = parseInt(this.formData.isKh);
          }
          this.radioData = res.approveResult && res.approveResult.split(" ");
          // console.log(res.data.examineIdea,res.approveResult,'按钮状态')
          // if(res.approveResult){
          //   this.formData.status=res.data.examineIdea
          // }
          if (this.radioData == "空") {
            this.isYijian = false;
          }
          if (res.isEndOpinion == "0") {
            this.isZG = false;
          } else if (res.isEndOpinion == "1") {
            this.isZG = true;
          }
          if (res.isViewEndOpinion == "0") {
            this.isGC = false;
          } else if (res.isViewEndOpinion == "1") {
            this.isGC = true;
          }
          //引入状态
          if (this.formData.isKh == 0) {
            if (this.formData.approveNo) {
              this.isImportant = true;
            } else {
              this.isImportant = false;
            }
          } else if (this.formData.isKh == 1) {
            if (this.formData.applyNo) {
              this.isImportant = true;
            } else {
              this.isImportant = false;
            }
          }
          //引入依据
          this.YRcheck = res.leadInfoList;
          //判断上传文件环节
          this.formData.backSign = res.backSign;
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
          this.approvalTitle =
            (this.formData.unitName || this.formData.curbank) +
            this.formData.applyProjectName +
            "审批处理单";
          this.getFileList();
          this.getHuanJie();
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
        // 判断是否为 首页进入并且为授权人
    isRouteFrom (authorizedPersonName) {
      const query = this.$route.query;
      console.log(query,query.routeFrom === "home" && this.isAuthorizeOthers,'提示弹窗')
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
    //消息提醒
    messageWarn(userId) {
      this.$api.meeting
        .infoRemind({
          pcUrl: "approval/detail", //待办列表下添加pcUrl[页面路径]，instId[表单id]字段
          instId: this.formData.id,
          userId: userId, //完成并发送选择的人员用户ID（humanID)
          productCode: "shiWSP", //项目编号（对应字典（提醒项目分类））
          urgentType: "", //紧急程度（部分功能有）
          infoType: "事务审批", //类型（模块名称中文（例如 收文，发文））
          infoTitle: this.approvalTitle, //业务标题
          infoUser: this.currentUser //当前操作人名称
        })
        .then(res => {})
        .catch(err => {
          this.$intent.closeWindow(this);
        });
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
            chooseDataName.push(item.name);
            chooseDataId.push(item.id);
          });
        if (this.btnType != "2") {
          this.formData.currentNode = params.name;
          this.formData.khType = this.khType;
          this.formData.id = this.id;
        }
        if (this.btnType == "1") {
          this.formData.currentUser = chooseDataName.join(",");
          this.currentUser=chooseDataName.join(",");
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
                if (
                  res.msg.indexOf("当前处理人与登录人不一致，请刷新当前页面") !=
                  -1
                ) {
                  this.$confirm(res.msg, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).finally(() => {
                    window.location.reload();
                  });
                } else {
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                  this.finSendBtn = true;
                  this.messageWarn(data[0].idStr);
                  this.$intent.closeWindow(this);
                }
              } else {
                this.finSendBtn = false;
              }
            })
            .catch(err => {
              this.finSendBtn = false;
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
    },
    //选择人员树
    selectShareMan() {
      this.dialogState = true;
      this.$api.dailyWork
        .shareUser({
          st: localStorage.getItem("st"),
          unitCode: this.uniCode
        })
        .then(res => {});
    },
    //传阅人员
    CyMessage() {
      this.btnType = "2";
      this.offenUse = false;
      this.dialogState = true;
      this.singelCheckF = false;
      this.$api.checkLz
        .CYqueryPerTree({
          id: this.id,
          ccbToken: localStorage.getItem("st")
        })
        .then(res => {
          this.$nextTick(() => {
            this.treeData = res.result.data;
          });
        });
    },

    //传阅群组
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
          "selectUserByCirculate",
          JSON.stringify({
            function: "selectUserByCirculate",
            level: this.scircularizeLevel,
            flag: true
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.message == "Loading") {
            this.loadingTreeForCy = true;
          } else {
            this.loadingTreeForCy = false;
          }
          this.treeData = (res && res.data) || [];
          this.treeData[0].disabled = true;
        });
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype) {
      console.log("------传阅data----->", data);
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        let id_name = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            id_name.push(item.id + "_" + (item.name || item.text));
          });
          this.cy(id_name);
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
      }
      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
          let checkId = this.formData.unreadPerson
            ? this.formData.unreadPerson.split(",")
            : [];
          // this.checkIds.map
          let checkObject = [];
          checkId &&
            checkId.map(item => {
              checkObject.push({ TYPE: "user", name: item });
            });
          // if (this.cyCheckData.length) {
          //     newA = [].concat(this.cyCheckData);
          //     newA.map(item => {
          //         //选中的不可操作
          //         item.disabled = true;
          //     });
          // }
          // this.checkData = checkObject;
          break;
      }
    },
    cy(id_name) {
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
    },
    //制发收回
    lzRegin() {
      this.$api.checkLz
        .LZretrieve({
          id: this.id,
          avyId: this.rowData.avyId
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.queryDeal();
            this.getHuanJie();
            this.$message({
              type: "success",
              message: "收回成功"
            });
            this.finSendBtn = true;
            this.$intent.closeWindow(this);
          } else {
            this.finSendBtn = false;
          }
        });
    },
    handleClose() {
      this.isdialog = false;
      this.isdialogCY = false;
    },
    //退回原因
    backReason() {
      this.$api.checkLz.reasonBack({ id: this.id }).then(res => {
        if (res.code == "SUCCESS") {
          this.backReasonChart = true;
          this.reasontableData = res.returnReasonList;
          this.$nextTick(() => {
            this.$refs.RdialogLine.openDialog();
          });
        }
      });
    },
    //返回请示行
    backAskforBank() {
      if (this.formData.approveNo) {
        this.$confirm("是否确定返回请示行?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.checkLz
              .checkLzAlter({ ...this.formData, handleButton: "返回请示行" })
              .then(res => {
                if (res.code == "SUCCESS") {
                  if (
                    res.msg.indexOf(
                      "当前处理人与登录人不一致，请刷新当前页面"
                    ) != -1
                  ) {
                    this.$confirm(res.msg, "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning"
                    }).finally(() => {
                      window.location.reload();
                    });
                  } else {
                    this.$message({
                      message: res.msg,
                      type: "success"
                    });
                    this.finSendBtn = true;
                    this.$intent.closeWindow(this);
                  }
                } else {
                  this.finSendBtn = false;
                  this.$message({
                    message: "操作失败",
                    type: "fail"
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.$message({
          type: "warning",
          message: "请先生成审批编号"
        });
      }
    },

    //backAlter退回修改
    BackBacksure() {
      if (!this.formData.returnReason) {
        this.$message({
          type: "warning",
          message: "请填写退回修改意见"
        });
        return;
      } else {
        this.backAlter();
      }
    },
    backAlter() {
      this.$api.checkLz
        .checkLzAlterSec({ ...this.formData, handleButton: "退回修改" })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$api.checkLz
              .checkLzAlter({ ...this.formData, handleButton: "退回修改" })
              .then(res => {
                if (res.code == "SUCCESS") {
                  if (
                    res.msg.indexOf(
                      "当前处理人与登录人不一致，请刷新当前页面"
                    ) != -1
                  ) {
                    this.$confirm(res.msg, "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning"
                    }).finally(() => {
                      window.location.reload();
                    });
                  } else {
                    this.$message({
                      message: res.msg,
                      type: "success"
                    });
                    this.finSendBtn = true;
                    this.$intent.closeWindow(this);
                  }
                } else {
                  this.finSendBtn = false;
                }
              });
          }
        });
    },
    //发上级行
    async asyncSuperBank() {
      await this.$api.checkLz
        .auditOrg({ id: this.formData.id ? this.formData.id : "" })
        .then(res => {
          this.applyFlag = res.flag;
          this.upOrgOrDeptId = res.upOrgOrDeptId;
        });
      if (this.applyFlag) {
        this.bankOrgId = this.formData.pmOrgan.split("_")[1];
        this.showOrgTree = true;
        this.title = "发上级行";
        this.orgOrDept = 0;
        this.orgOrDeptId = this.bankOrgId;
        this.isSingle = true;
      } else {
        this.$api.checkLz
          .sendBankLevel({
            id: this.id
          })
          .then(res => {
            this.showOrgTree = true;
            this.bankOrgId = res.parentUnitId;
            this.title = "发上级行";
            this.orgOrDept = 0;
            this.orgOrDeptId = this.bankOrgId;
            this.isSingle = true;
          });
      }
    },
    superiorBank() {
      if (!this.formData.applyNo) {
        this.$message({
          type: "warning",
          message: "未生成申请编号，无法发送上级行"
        });
      } else {
        this.asyncSuperBank();
      }
    },
    //部门树传lai 参
    getOrgList(org) {
      console.log("org", org);
      if (org && org.deparObj.comDeputyId) {
        this.currentUser=this.formData.currentUser = org.deparObj.comDeputyCh;

        this.formData.currentUserId = org.deparObj.comDeputyId;
        this.formData.currentNodeId = org.PCSAVYID;
        this.formData.handleButton = "发上级行";
        this.formData.currentNode = org.currentNode;
        this.formData.isUp = org.deparObj.unitCode;

        this.formData.approveUnitName = org.deparObj.deptFirstUnitName;
        this.formData.approveUnitId = org.deparObj.deptFirstUnitCode;
        // try{
        // this.formData.approveUnitId = org.deparObj.unitLevel.split('|')[0];
        // }catch(e){
        //   this.formData.approveUnitId = org.deparObj.unitPcode;
        // }
        this.formData.approveDepart = org.deparObj.unitName;
        this.formData.approveDepartId = org.deparObj.unitCode;
        this.$api.checkLz.checkLzAlter(this.formData).then(res => {
          if (res.code == "SUCCESS") {
            if (
              res.msg.indexOf("当前处理人与登录人不一致，请刷新当前页面") != -1
            ) {
              this.$confirm(res.msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).finally(() => {
                window.location.reload();
              });
            } else {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.finSendBtn = true;
              this.$intent.closeWindow(this);
            }
          } else {
            this.finSendBtn = false;
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择上级行"
        });
      }
    },
    //审批意见更改状态
    agreeChange(item) {
      console.log('审批意见更改状态',item)
      this.$set(this.formData, "examineIdea", '');
     // this.$set(this.formData, "examineIdea", item);
      // this.formData.examineIdea==''
    },
    //退回上一处理人
    backPrevious() {
      if (
        (this.formData.status == "不同意" ||
          this.formData.status == "部分同意") &&
        (this.formData.examineIdea == "" ||
          this.formData.examineIdea == undefined)
      ) {
        this.$message({
          type: "warning",
          message: "请填写审批意见"
        });
        return;
      }
      this.spyjpd();
      console.log("formData", this.formData);
      this.$api.checkLz
        .backDealPer({
          ...this.formData
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            if (
              res.msg.indexOf("当前处理人与当前登录人不一致，请刷新当前页面") !=
              -1
            ) {
              this.$confirm(res.msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).finally(() => {
                window.location.reload();
              });
            } else {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.finSendBtn = true;
              this.$intent.closeWindow(this);
            }
          } else {
            this.finSendBtn = false;
          }
        });
    },
    //生成编号
    generateNum() {
      this.$api.checkLz.createNum(this.formData).then(res => {
        if (res.code == "SUCCESS") {
          if (res.code1) {
           return  (this.$message({
              type: "warning",
              message: res.msg
            }),
            this.queryDeal())
          }
          if (
            res.msg.indexOf("当前处理人与登录人不一致，请刷新当前页面") != -1
          ) {
            this.$confirm(res.msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).finally(() => {
              window.location.reload();
            });
            return;
          }
          this.resData = res;
          this.projectShortName = res.projectShortName;
          this.delCode = res.delList;
          if (this.delCode?.length > 0) {
            this.isdialog = true;
          } else {
            this.currentCode(true);
          }
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    //退号
    backNum() {
      this.$api.checkLz
        .backNum({ id: this.formData.id })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: "退号成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "退号失败",
              type: "error"
            });
          }
          this.queryDeal();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //发送编号
    sendNum() {
      this.$api.checkLz
        .createNumCode({
          id: this.formData.id,
          type1: this.formData.type1,
          no: this.formData.no.toString(),
          isKh: this.formData.isKh.toString(),
          approveNo: this.formData.approveNo,
          applyNo: this.formData.applyNo,
          unitHeader: this.resData.unitHeader,
          applyProjectName: this.formData.applyProjectName,
          year: this.resData.year,
          projectShortName: this.projectShortName
        })
        .then(res => {
          if (res.code1) {
            this.$message({
              type: "warning",
              message: res.msg
            });
            this.queryDeal();
            return false;
          } else {
            this.$message({
              message: "生成编号成功",
              type: "success"
            });
            this.saveData();
          }
        });
    },

    //关闭文号
    closeWH() {
      this.isdialog = false;
    },
    //合成当前编号
    currentCode(cansave) {
      this.isdialog = false;
      this.formData.type1 = "1";
      this.formData.no = this.resData.fileNo?this.resData.fileNo.toString():true;
      if (!this.formData.no) {
        this.$message({
          type: "warning",
          message: "请选择使用当前文号或者历史文号"
        });
        return false;
      }

      if (cansave) {
        this.docompositeNo(this.resData.year, this.resData.fileNo);
        this.sendNum();
      } else {
        this.compositeNo(this.resData.year, this.resData.fileNo); //合成编号
      }
    },
    deleCode() {
      this.formData.type1 = "2";
    },
    //使用历史文号
    delecurrentCode() {
      this.isdialog = false;
      this.formData.no = this.deleteapplyCode.toString();
      if (!this.formData.no || this.deleteapplyCode == -1) {
        this.$message({
          type: "warning",
          message: "请选择使用当前文号或者历史文号"
        });
        return false;
      }
      this.compositeNo(this.resData.year, this.formData.no); //合成编号
    },
    docompositeNo(yearNu, num) {
      let userUnitId = JSON.parse(localStorage.getItem("userInfo")).unitId;
      //非跨行生成审批编号
      if (this.formData.isKh == 0) {
        this.listCode =
          this.resData.projectShortName +
          "〔" +
          this.resData.year +
          "〕" +
          "第" +
          num +
          "号";
        this.formData.approveNo = this.listCode;
        //跨行生成审批编号
      } else if (
        this.documentNoDataStore.manageBankId == userUnitId &&
        this.formData.isKh == 1
      ) {
        this.listCode =
          this.resData.projectShortName +
          "〔" +
          this.resData.year +
          "〕" +
          "第" +
          num +
          "号";
        this.formData.approveNo = this.listCode;

        //跨行生成申请编号
      } else if (
        this.documentNoDataStore.curbankId == userUnitId &&
        this.formData.isKh == 1
      ) {
        this.listCode =
          this.resData.unitHeader +
          this.resData.projectShortName +
          "〔" +
          yearNu +
          "〕" +
          "第" +
          num +
          "号";
        this.formData.applyNo = this.listCode;
      }
    },
    //合成编号
    compositeNo(yearNu, num) {
      //判断编号是否已被占用，并作处理
      this.$api.checkLz
        .handleNum({
          id: this.formData.id,
          no: num.toString()
        })
        .then(res => {
          if (res.code1) {
            this.$message({
              type: "warning",
              message: res.msg
            });
            this.queryDeal();
          } else {
            this.docompositeNo(yearNu, num);
            this.sendNum();
          }
        });
    },
    //催办
    CBqueal() {
      this.$api.checkLz
        .pressToDo({
          ...this.formData
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: "催办成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "催办失败",
              type: "success"
            });
          }
        });
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      );
      this.readFieelds = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); //不可编辑控制域
      this.FEIbuttonList = this.showButton(
        this.FEIbuttonList,
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
      this.tidIdea();
    },
    //获取环节权限
    getHuanJie() {
      var isKh12 = ""
      var multiID = ""
      if(this.$route.query.dataForm) {
        isKh12 = JSON.parse(this.$route.query.dataForm)
        multiID = this.formData.isKh == 0 ? isKh12.multiTenancyId1 : isKh12.multiTenancyId2;
      } else {
        multiID = this.$route.query.multiID
      }
      // let multiID = "";
      // if (this.formData.isKh == 0) {
      //   multiID = "CN0071";
      // } else if (this.formData.isKh == 1) {
      //   multiID = "CN0072";
      // } else {
      // }
      this.$api.checkLz
        .queryHJ({
          id: this.id,
          type: "0",
          multiID
        })
        .then(res => {
          this.huanJieMessage = res.Fields;
          this.currentUser=this.formData.currentUser||this.formData.currentUser;
          console.log(this.formData.currentUser||this.formData.currentUser,'this.formData.currentUser||this.formData.currentUser')
          //已经转授权，被授权人页面处理
          if(this.formData.beAuthUserName&&this.formData.beAuthCode&&JSON.parse(localStorage.getItem('userInfo')).humanCode==this.formData.beAuthCode){
             this.currentUser=`${this.formData.beAuthUserName}(此文件由${this.formData.currentUser}授权)`
            //授权人页面处理
          }else if(this.formData.beAuthUserName&&this.formData.beAuthCode&&JSON.parse(localStorage.getItem('userInfo')).humanCode!=this.formData.beAuthCode){
             this.currentUser=`${this.formData.beAuthUserName}(此文件由${this.formData.currentUser}授权)`
             this.huanJieMessage.readFields=[...this.huanJieMessage.readFields,...this.huanJieMessage.editedIdeaFields];
             this.huanJieMessage.editedIdeaFields=[];
             this.huanJieMessage.visibleButtons=[ 
          { name: "打印处理单", show: true },
          { name: "收藏", show: true },
          { name: "操作指南", show: true }];
             this.huanJieMessage.visibleButtonsBycondition=[];
          }
          if (res.Fields.visibleButtons.scbh) {
            this.applyBtn = true;
          } else {
            this.applyBtn = false;
          }
          //未保存不显示打印处理单
          if (!this.id) {
            delete res.Fields.visibleButtons.dycld;
          }
          this.setConfig();
          this.initRule();
        });
    },
    closeData() {
      //授权人页面直接关闭
      if(this.formData.beAuthUserName&&this.formData.beAuthCode&&
      JSON.parse(localStorage.getItem('userInfo')).humanCode!=this.formData.beAuthCode){
         this.$intent.closeWindow(this);
         return false;
      }
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.closeSaveData();
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
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
            numyear:this.numyear
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
            numyear:this.numyear
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
            numyear:this.numyear
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
            numyear:this.numyear
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
    //判断引入文号i重复
    wenhaoChange() {},
    //引入
    importBtn() {
      this.isdialogYR = true;
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
    //引入确定
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
                currentUserOldId: this.humanId
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
                    filePath:
                      !!res.result && !!res.result.filePath
                        ? res.result.filePath
                        : "",
                    fileName:
                      !!res.result && !!res.result.fileName
                        ? res.result.fileName
                        : ""
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
    //引入关闭
    YRhandleClose() {
      this.isdialogYR = false;
    },
    //保存引入依据
    saveImport() {
      let that = this;
      that.importArr = [];
      console.log("this.YRcheck", this.YRcheck);
      this.YRcheck &&
        this.YRcheck.map(item => {
          if (!item.hasOwnProperty("multiTenancyId")) {
            that.importArr.push({
              dataType: item.dataType,
              dataId: item.dataId,
              orderNo: item.orderNo,
              title: item.title,
              fileName: item.fileName,
              filePath: item.filePath,
              zrType: item.zrType,
              draftDepartmentId: item.draftDepartmentId
            });
          }
        });
      console.log("that.importArr2", that.importArr);
      this.formData.infoList = this.importArr;
    },
    YRhandleCloseDeal() {
      this.isdialogYRDeal = false;
    },
    //查看审批说明
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
    //打开常用批语弹窗并请求数据
    showWriteList(type) {
      this.$api.checkLz.perWritingSe({}).then(res => {
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
      this.$api.checkLz
        .perWritingDe({
          id: data
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$api.checkLz.perWritingSe({}).then(res => {
              this.offenDevices = res.data;
            });
          }
        });
    },
    //新增批语
    addCommonUse(data) {
      console.log("data", data);
      this.$api.checkLz
        .perWritingCr({
          hyDnr: data
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$api.checkLz.perWritingSe({}).then(res => {
              this.offenDevices = res.data;
            });
          }
        });
    },
    childsaveselect() {},

    //常用批语组件写入批语
    writelistvalue(message) {
      switch (this.clickTypes) {
        case "blIdea":
          this.$set(this.formData, "blIdea", message);
          break;
        case "exaunitIdea":
          this.$set(this.formData, "exaunitIdea", message);
          break;
        case "examineIdea":
          this.$set(this.formData, "examineIdea", message);
          break;
      }
    },
    //未生成编号前初始化编号
    initNo(shiwudata, unitHeader) {
      console.log("起草数据", shiwudata);
      if (shiwudata.isKh == 0) {
        this.formData.virtualApproveNo =
          shiwudata.projectShortName +
          "〔" +
          new Date().getFullYear() +
          "〕" +
          "第 号";
      } else if (
        shiwudata.isKh == 1 ||
        !this.formData.hasOwnProperty("applyNo")
      ) {
        this.formData.applyNo = !!this.formData.applyNo
          ? this.formData.applyNo
          : "";
        this.formData.virtualApplyNo =
          unitHeader +
          shiwudata.projectShortName +
          "〔" +
          new Date().getFullYear() +
          "〕" +
          "第 号";
      }
    },
    loadDataDraft() {
      let that = this;
      this.$api.checkLz
        .deparAndOrgan({
          isKh: this.isKh
        })
        .then(res => {
          let draft = [];
          let draftCopy = res.departList;

          for (let i = 0; i < draftCopy.length; i++) {
            if (draft.length == 0) {
              draft.push(draftCopy[i]);
              if (this.$route.query.dataForm) {
                that.initNo(
                  JSON.parse(this.$route.query.dataForm),
                  res.unitHeader
                );
              }
            } else {
              let tag = true;
              for (let j = 0; j < draft.length; j++) {
                if (draftCopy[i].firstUnitId == draft[j].firstUnitId) {
                  tag = false;
                  break;
                } else {
                  continue;
                }
              }
              if (tag) {
                draft.push(draftCopy[i]);
                if (this.$route.query.dataForm) {
                  that.initNo(
                    JSON.parse(this.$route.query.dataForm),
                    res.unitHeader
                  );
                }
              }
            }
          }
          this.$nextTick(() => {
            this.draftDepartmentList = draft;
          });
        });
    }
  },
  activated() {},
  created() {
    let shiwudata = JSON.parse(sessionStorage.getItem("shiwuId"));
    if (shiwudata) {
      console.log("---------shiwudata", shiwudata);
      this.id = shiwudata.id;
      this.khType = shiwudata.isKh.toString();
      this.uploadConfig.id = this.id;
      this.uploadConfigPZ.id = this.id;
      this.uploadConfigSP.id = this.id;
      this.loadqueryDeal();
    }
    if (this.$route.query && this.$route.query.type == "checkLz") {
      console.log("详情请求", this.$route.query);
      this.id = this.$route.query.id;
      this.khType = this.$route.query.isKh;
      this.formData.id = this.id;
      // let shiwu = {id: this.id, isKh: this.$route.query.isKh}
      // let shuwuJSON = JSON.stringify(shiwu)
      // sessionStorage.setItem('shiwuId', shuwuJSON)
      this.queryDeal();
    }
    if (this.$route.query.dataForm) {
      let rowData = JSON.parse(this.$route.query.dataForm);
       this.isShowDocument = true;
      console.log("rowData", rowData);
      //正文模板
      this.draftDepartmentList = rowData.draftDepartmentList;
      this.formData.textMoudleName = rowData.textMoudleName;
      this.formData.textMoudlePath = rowData.textMoudlePath;
      this.formData.textMoudleId = rowData.textMoudleId;
      //制度
      this.formData.manageSystemName = rowData.manageSystemName;
      this.formData.manageSystemPath = rowData.manageSystemPath;
      this.formData.manageSystemId = rowData.manageSystemId;
      // this.khType =rowData.isKh
      this.humanId = rowData.humanId;
      // this.ZGdepar=rowData.ChmainDepart.split(",")
      if (rowData.isEndOpinion == "0") {
        this.isZG = false;
      } else if (rowData.isEndOpinion == "1") {
        this.isZG = true;
      }
      if (rowData.isViewEndOpinion == "0") {
        this.isGC = false;
      } else if (rowData.isViewEndOpinion == "1") {
        this.isGC = true;
      }
      // rowData.isEndOpinion='0'?this.isZG=false:this.isZG=true
      // rowData.isViewEndOpinion='0'?this.isGC=false:this.isGC=true
      // console.log(rowData.isEndOpinion,this.isZG,rowData.isViewEndOpinion)
      this.formData = rowData;
      this.titleData = rowData;
      this.formData.unitName = this.titleData.unitName;
      this.formData.draftDepartment = this.titleData.draftDepartment;
      this.formData.applyProjectName = this.titleData.applyProjectName;
      this.formData.isKh = this.titleData.isKh;
      this.titleData.pmOrgan
        ? (this.formData.pmOrgan = this.titleData.pmOrgan)
        : (this.formData.pmOrgan = "");
      //    引入判断
      // this.$set(this.formData,'checkOpinionList',[])
      //   this.$set(this.formData,'examineIdea','')
      if (this.formData.currentNode == "填写审批单") {
        this.isImportant = false;
      } else {
        this.isImportant = true;
      }
      if (this.formData.isKh == "0") {
        console.log("isKh", this.formData.isKh);
        this.uploadConfig.isSpecial = 0;
      } else {
        this.uploadConfig.isSpecial = 1001;
      }
      this.approvalTitle =
        (this.formData.unitName || this.formData.curbank) +
        this.formData.applyProjectName +
        "审批处理单";
      this.getHuanJie();
      this.isZGinput = false;
      this.$set(
        this.formData,
        "contactTel",
        rowData.contactTel.replace(/,/g, " ")
      );
    }
  },
  mounted() {
   // this.handleSetLoacl();
    try{
    //label动态获取
    this.$nextTick(function() {
      this.formTextChange("swgl_sp");
    });
    // this.fileList([{fileName:'11111',filePath:'2222'}])
    // this.$set(
    //   this.formData,
    //   "applyTime",
    //   formatData(new Date().getTime(), "YYYY-MM-DD")
    // );
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
    this.loadDataDraft();   
    }catch(e){
      console.log(e)
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.zfDetail {
  background:#f0f5fa;
  margin: 0 auto;

  .process_content {
    width: 90%;
    min-height: 1300px !important;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    /*background: #3b85ef;*/
    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 56px !important;
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
      el-button {
        color: #fff !important;
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
  width: 100% !important;
  /*height: 50px;*/
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.height_90 {
  height: 200px;
  margin-top: -200px;
}

.adviceInfo {
  width: 100%;
  right: 10%;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.content-container {
  background-color: rgba(228, 231, 237, 0.32);
  border-radius: 4px;
  padding: 4px 6px 0 6px;
  word-break: break-all;
}
// .content-container:hover {
//   border: 1px solid #8996af;
// }
.pad_lr10 {
  margin: 0 0 0 16px;
  padding: 0 0 0 10px;
}
.creat_time {
  position: relative;
  top: -10px;
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
    }
  }
}

.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  /*line-height: 100px;*/
}

td {
  border: solid #000 1px;
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
.opinion-wrapper .content-container {
  border: 1px solid #e4e7ed;
  border-top: 0;
  border-bottom: 0;
}
.opinion-wrapper:first-child .content-container {
  border: 1px solid #e4e7ed;
  border-bottom: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.opinion-wrapper:last-child .content-container{
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #e4e7ed;
  border-top: 0;
}

.d_flex {
  display: flex;
  .d_b100 {
    width: 100%;
  }

  .d_f1 {
    flex: 1;
    border: 1px solid #999;
    border-radius: 2px;
  }
}

.pos_r {
  position: relative;
}

.printButton {
  position: absolute !important;
  top: 1% !important;
  /*left: 3% !important;*/
  right: 1% !important;
}

.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
  z-index: -999;
  position: absolute;
}

/deep/ .bianhaoDialog .el-dialog {
  max-width: 360px;
  .el-dialog__body {
    //  max-height: 160px;
    overflow: auto;
  }
  .el-radio__inner {
    border: 1px solid #666;
  }
  .el-radio-group {
    width: 80%;
    float: right;
    line-height: 20px;
    height: 20px;
    margin-top: 10px;
  }
}
</style>
<style lang="less" rel="stylesheet/less">
.el-message-box__btns .el-button:last-child{
  transform: translateX(-68px)!important;
}
</style>