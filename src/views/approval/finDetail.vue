<template>
  <div class="qcDetail" id="shiwuzhifa">
    <!--    本行导出单-->
    <div id="printHtmlBH" class="tablePrint" v-if="!formData.isKh">
      <el-row>
        <h1 style class="title-h1">中国建设银行事务审批单</h1>
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
            >{{formdata.applyProjectName}}</td>
            <td style="text-align:center;vertical-align:middle">主管部门</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.mainDepart}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">审批编号</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.approveNo}}</td>

            <td style="text-align:center;vertical-align:middle">申请日期</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formdata.approveTime}}</td>
          </tr>
          <!--        <tr style="height: 800px;">-->
          <!--          <td style="text-align:center" colspan="5"></td>-->
          <!--        </tr>-->
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">联系人</td>
            <td
              style="width:40%;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.contactName}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">联系电话</td>
            <td style="width:30%;text-align:center;vertical-align:middle">{{formdata.contactTel}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">申请部门</td>
            <td
              colspan="4"
              style="text-align:center;vertical-align:middle"
            >{{formdata.draftDepartment}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">标题</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">{{formdata.title}}</td>
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
            <td colspan="4">{{formdata.reason}}</td>
          </tr>
          <!--       审批意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">审批意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formdata.checkOpinionList" :key="item.id">
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
              <div class="qianF" v-for="item in formdata.applyOpinionList" :key="item.id">
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
              <div class="qianF" v-for="item in formdata.blqkOpinionList" :key="item.id">
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
              <div class="chuanYue" v-for="item in formdata.cyOpinionList" :key="item.id">
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
              <div class="beiZh" v-for="item in formdata.markList" :key="item.id">
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
            <td style="width:80%;text-align:center;vertical-align:middle">{{formdata.readPerson}}</td>
          </tr>

          <tr>
            <td style="width:10%;text-align:center;vertical-align:middle">已阅</td>
            <td style="width:80%;text-align:center;vertical-align:middle">{{formdata.unreadPerson}}</td>
          </tr>

          <br />
        </tbody>
      </table>
    </div>
    <!--    跨行导出单-->
    <div id="printHtmlKH" class="tablePrint" v-if="formData.isKh">
      <el-row>
        <h1 style class="title-h1">中国建设银行跨行事务审批单</h1>
        <el-button class="printButton" @click="printThis()" type="info" plain>打印</el-button>
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
            >{{formdata.applyProjectName}}</td>
            <td style="text-align:center;vertical-align:middle">主管部门</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.mainDepart}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">审批编号</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.approveNo}}</td>

            <td style="text-align:center;vertical-align:middle">接收日期</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formdata.approveTime}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">申请编号</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.applyNo}}</td>

            <td style="text-align:center;vertical-align:middle">申请日期</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formdata.applyTime}}</td>
          </tr>
          <!--        <tr style="height: 800px;">-->
          <!--          <td style="text-align:center" colspan="5"></td>-->
          <!--        </tr>-->
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">联系人</td>
            <td
              style="width:40%;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.contactName}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">联系电话</td>
            <td style="width:30%;text-align:center;vertical-align:middle">{{formdata.contactTel}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">申请部门</td>
            <td
              colspan="4"
              style="text-align:center;vertical-align:middle"
            >{{formdata.draftDepartment}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">标题</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">{{formdata.title}}</td>
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
            <td colspan="4">{{formdata.reason}}</td>
          </tr>
          <!--       审批意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">审批意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formdata.checkOpinionList" :key="item.id">
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
              <div class="qianF" v-for="item in formdata.applyOpinionList" :key="item.id">
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
              <div class="qianF" v-for="item in formdata.blqkOpinionList" :key="item.id">
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
              <div class="chuanYue" v-for="item in formdata.cyOpinionList" :key="item.id">
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
              <div class="beiZh" v-for="item in formdata.markList" :key="item.id">
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
            <td style="width:80%;text-align:center;vertical-align:middle">{{formdata.readPerson}}</td>
          </tr>

          <tr>
            <td style="width:10%;text-align:center;vertical-align:middle">已阅</td>
            <td style="width:80%;text-align:center;vertical-align:middle">{{formdata.unreadPerson}}</td>
          </tr>

          <br />
        </tbody>
      </table>
    </div>

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
      <!--        <el-button-->
      <!--          v-for="(item,index) in buttonList"-->
      <!--          @click="buttonClick(item)"-->
      <!--          :key="index"-->
      <!--          size="mini"-->
      <!--          plain-->
      <!--        >{{item}}-->
      <!--        </el-button>-->
    </div>
    <div class>
      <div
        class="shiwuTitle"
      >{{formData.unitName||formData.curbank}}{{formData.applyProjectName}}审批处理单</div>
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
            <p v-if="formData.currentNode!=='办结'">
              当前处理人：
              <span>{{currentUser}}</span>
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
              style="float: right;margin-right:40px;margin-top:8px;color:#fff!important"
            >查看审批说明</el-button>
          </div>
        </div>
        <div id="wjys" class="height_90"></div>
        <h6 class="bank_dispach_file_tit">文件要素</h6>

        <el-form :rules="rules" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请项目">
                <el-input v-model="formData.applyProjectName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主管部门">
                <el-input v-model="formData.mainDepart" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="审批编号">
                <el-input v-model="formData.approveNo" :disabled="true"></el-input>
                <!--                <el-button type="primary" style="margin-left:20px;" @click="generateNum">生成编号</el-button>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请编号" prop="applyNo" v-if="formData.isKh">
                <el-input v-model="formData.applyNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期" prop="applyTime">
                <el-input v-model="formData.applyTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="formData.approveTime">
              <el-form-item label="接收日期" prop="approveTime">
                <el-input v-model="formData.approveTime" :disabled="true"></el-input>
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
                      :disabled="true"
                    >
                      <el-option v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="formData.contactName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="formData.contactTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input v-model="formData.title" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="引入依据">
              <div v-for="(item,index) in YRcheck" :key="index">
                <span @click="YRJump(item)" style="display:inline-block;width:40%;">{{item.orderNo}}</span>
                <el-button @click="YRJump(item)" size="mini" type="primary">查看详情</el-button>
              </div>
            </el-form-item>
          </el-row>
          <el-form-item label="事由提要">
            <el-input
              type="textarea"
              :autosize="{minRow:5,maxRow:15}"
              v-model="formData.reason"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <h6 class="bank_dispach_file_tit">签批意见</h6>
          <div id="qpyj" class="height_90"></div>
          <!--          审批意见-->
          <el-form-item label="审批意见">
            <!--            <el-radio-group v-model="formData.status" :disabled="editedIdeaFields.spyj">-->
            <!--              <el-radio-->
            <!--                v-for="item in radioData"-->
            <!--                :key="item"-->
            <!--                :label="item"-->
            <!--                :value="item"></el-radio>-->
            <!--            </el-radio-group>-->
            <div
              v-for="item in formData.checkOpinionList"
              :key="item.id"
		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.examineIdea"
              :disabled="true"
              v-if="!(this.formData.checkOpinionList&&this.formData.checkOpinionList.length>0)"
            ></el-input>
          </el-form-item>
          <!--      申请单位意见区域    -->
          <el-form-item label="申请单位意见">
            <div
              v-for="item in formData.applyOpinionList"
              :key="item.id"
		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              v-if="!(this.formData.applyOpinionList&&this.formData.applyOpinionList.length>0)"
              type="textarea"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.exaunitIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="办理情况">
            <div v-for="item in formData.blqkOpinionList" :key="item.id" class='opinion-wrapper'>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              v-if="!(this.formData.blqkOpinionList&&this.formData.blqkOpinionList.length>0)"
              type="textarea"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.blIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!--     传阅意见     -->
          <el-form-item label="传阅意见">
            <div v-for="item in formData.cyOpinionList" :key="item.id" class='opinion-wrapper'>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              v-if="!(this.formData.cyOpinionList&&this.formData.cyOpinionList.length>0)"
              type="textarea"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.cyIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!--     备注区域     -->
          <el-form-item label="备注">
            <div v-for="item in formData.markList" :key="item.id" class='opinion-wrapper'>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      <span v-if="formData.isKh=='1'">{{item.unitName}}/</span>
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              v-if="!(this.formData.markList&&this.formData.markList.length>0)"
              type="textarea"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.mark"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="传阅人员" style="margin-top:20px">
                <el-row>
                  <el-col>
                    <el-form-item label="未阅">
                      <el-input v-model="formData.unreadPerson" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="已阅">
                      <el-input v-model="formData.readPerson" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <h6 class="bank_dispach_file_tit">附件</h6>
          <div id="scfj" class="height_90"></div>
          <!--          非跨行附件-->
          <div v-if="!formData.isKh">
            <el-row>
              <el-form-item>
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
                              @click="viewFile(item)"
                              :title="item.fileName"
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
    <shiwuFlow :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></shiwuFlow>
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
          </el-form-item>
          <!--     附件     -->
          <el-row>
            <el-form-item label="附件">
              <el-col :span="23">
                <div class="tree_w" v-if="YRDeal.file&&YRDeal.file.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  YRDeal.file" :key="item.id" class="comp_list">
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
        <el-button @click="YRhandleCloseDeal">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import selectPerson from "components/tree/tree-fawen";
import flowChart from "components/dialog/flowChart";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import openOrDownLoadFile from "../../minixs/shiwuLineWord";
import shiwucommon from "../approval/minixs/shiwucommon";//事物审批公共方法
import exportTable from "../../minixs/exportTable";
export default {
  name: "qcDetail",
  components: {
    selectPerson,
    flowChart,
    shiwuFlow
  },
  mixins: [openOrDownLoadFile,shiwucommon],
  data() {
    return {
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      currentUser:'',
      isFileShow: false, //附件域显示
      isFileShowPZ: false, //附件域显示
      isFileShowSP: false, //附件域显示
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
      dialogType: "next",
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
        title:""
      },
      khType: "",
      buttonList: [
        { name: "关闭", show: true },
        { name: "催办", show: false },
        { name: "收回", show: false },
        { name: "查看申请", show: true },
        { name: "查看流程", show: true },
        { name: "打印处理单", show: true },
        { name: "收藏", show: true },
        { name: "操作指南", show: true }
      ],
      id: "",
      formdata: {}
    };
  },
  computed: {},
  methods: {
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
                window.location.href = "about:blank";
      this.$intent.closeWindow(this);
         // this.$router.push("/approval/checkLz");
          break;
        case "完成并发送":
          // this.finAndSend()
          break;
        case "办结":
          this.finUpData();
          break;
        // case "传阅":
        //     this.CyMessage()
        //     break
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
        case "退回上一处理人":
          this.backPrevious();
          break;
        case "生成编号":
          this.generateNum();
          break;
        case "删除此文":
          this.delete_btn();
          break;
        case "打印处理单":
          this.printForm();
          break;
        case "催办":
          this.CBqueal();
          break;
        case "查看申请":
          this.viewApply();
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
          ).then(()=>{
             this.$api.checkLz
            .handleCollection({ id: this.id, dataType: 1,docType:1,numyear:this.numyear })
            .then(res => {
              this.downFile(res);
            })
          });
          // let titleId=''
          // if(this.formData.isKh==0){
          //     titleId='printHtmlBH'
          // }else if(this.formData.isKh==1){
          //     titleId='printHtmlKH'
          // }
          // let that = this
          // let shiwutitle = (this.formData.unitName || this.formData.curbank) + this.formData.applyProjectName + '审批处理单'
          // let draftInfo = this.formData.xksqFilePath?[].concat({fileName:this.formData.xksqFileName,
          //         filePath:this.formData.xksqFilePath},
          //     this.formData.attchmentFileInfo):this.formData.attchmentFileInfo;//收藏时下载正文
          // exportTable.getPdf( shiwutitle,draftInfo,titleId,this.$businessCode.fawglfj,shiwutitle,that)
          break;
        case "操作指南":
          this.handBook("SWSP");
          break;
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
        false,
        (saveDataSums) + this.formData.title
      );
    },
    //催办
    CBqueal() {
      console.log("催办");
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
          query: { data: copyRow,numyear:this.numyear }
        });
      } else if (this.formData.isKh == 1) {
        this.$intent.goNewPage(this, {
          path: "/shiwuBenhangkh",
          query: { data: copyRow,numyear:this.numyear }
        });
      }
    },
    circulRe() {
      this.$api.checkLz
        .CYretrieve({
          id: this.id
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
          numYear:this.numyear
        })
        .then(res => {
          //引入依据
          this.YRcheck = res.leadInfoList;
          this.formData = res.data;
          this.formData.workFlowIds = res.workFlowIds;
          this.formData.markList = res.markList;
          this.formData.checkOpinionList = res.checkOpinionList;
          this.formData.applyOpinionList = res.applyOpinionList;
          this.formData.sytyOpinionList = res.sytyOpinionList;
          this.formData.cyOpinionList = res.cyOpinionList;
          this.formData.blqkOpinionList = res.blqkOpinionList;
          this.formData.checkEndOpinionList = res.checkEndOpinionList;
          this.formData.applyEndOpinionList = res.applyEndOpinionList;
          this.formData.manageSystemName = res.manageSystemName;
          this.formData.manageSystemPath = res.manageSystemPath;
          this.formData.xksqFileName = res.data.xksqFileName;
          this.formData.xksqFilePath = res.data.xksqFilePath;
          if (this.formData.isKh) {
            this.formData.isKh = parseInt(this.formData.isKh);
          }
          // this.radioData=res.approveResult.split(' ')
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
          if (this.formData.finishTime) {
            this.buttonList[1].show = false;
          } else {
            this.buttonList[1].show = true;
          }
          if (res.backFlag && !this.formData.finishTime) {
            this.buttonList[2].show = true;
          } else {
            this.buttonList[2].show = false;
          }

          //已经转授权，被授权人页面处理
          if(this.formData.beAuthUserName&&this.formData.beAuthCode&&JSON.parse(localStorage.getItem('userInfo')).humanCode==this.formData.beAuthCode){
             this.currentUser=`${this.formData.beAuthUserName}(此文件由${this.formData.currentUser}授权)`
            //授权人页面处理
          }else if(this.formData.beAuthUserName&&this.formData.beAuthCode&&JSON.parse(localStorage.getItem('userInfo')).humanCode!=this.formData.beAuthCode){
             this.currentUser=`${this.formData.beAuthUserName}(此文件由${this.formData.currentUser}授权)`
          }else{
            this.currentUser=res.data.currentUser;
          }
          console.log(this.currentUser,this.formatData,'this.currentUser,this.formatData')
          //授权人无收回权限
        // if(this.formData.beAuthUserName&&this.formData.beAuthCode&&JSON.parse(localStorage.getItem('userInfo')).humanCode!=this.formData.beAuthCode){
        //   this.buttonList[2].show = false;
        // }

          this.getFileList();
        });
    },
    handleClose() {
      this.isdialog = false;
    },
    //收回
    lzRegin() {
      this.$api.checkLz
        .LZretrieve({
          id: this.id,
          avyId: this.rowData.avyId
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
    //附件上传
    //附件块
    getFileList() {
      console.log("this.formData.isKh", this.formData.isKh);
      if (!this.formData.isKh) {
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            numYear:this.numyear
            // fileType:'1001'
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfo", res.data);
            });
          });
      } else {
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            fileType: "1001",
            numYear:this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfo", res.data);
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            fileType: "1002",
            numYear:this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfoPZ", res.data);
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            fileType: "1003",
            numYear:this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfoSP", res.data);
            });
          });
      }
    },
    //    查看审批说明
    viewApproval() {
      let that = this;
      if (this.formData.manageSystemName) {
        let file = {
          fileName: this.formData.manageSystemName,
          filePath: this.formData.manageSystemPath
        };
        this.viewFile(file);
      } else {
        this.$message({
          type: "warning",
          message: "暂无审批说明文档"
        });
      }
    }
  },
  activated() {},
  created() {
    if (this.$route.query.type) {
      this.fromType = this.$route.query.type;
      // this.rowData = JSON.parse(this.$route.query.data)
      this.id = this.$route.query.id;
      this.khType = this.$route.query.isKh;
      if (this.rowData.type === 1) {
        this.buttonList[1].show = true;
        this.buttonList[2].show = true;
        // this.buttonList[5].show=false
        //   this.buttonList[6].show=false
      } else if (this.rowData.type === 2) {
        this.buttonList[1].show = false;
        this.buttonList[2].show = false;
        // this.buttonList[5].show=true
        // this.buttonList[6].show=true
      } else {
      }
      this.queryDeal();
    }
    if (this.$route.query.dataForm) {
      this.titleData = this.$route.query.dataForm;
      // this.$set(this.formData, 'approveDepart', this.titleData)
      this.formData.draftDepartment = this.titleData.draftDepartment;
      this.formData.applyProjectName = this.titleData.applyProjectName;
      this.formData.isKh = this.titleData.isKh;
      this.titleData.pmOrgan
        ? (this.formData.pmOrgan = this.titleData.pmOrgan)
        : (this.formData.pmOrgan = "");
    }
  },
  mounted() {
    this.$api.checkLz
      .checkLzDeal({ id: this.id, isKh: this.formData.isKh,numYear:this.numyear })
      .then(res => {
        this.formdata = res.data;
        this.formdata.markList = res.markList;
        this.formdata.checkOpinionList = res.checkOpinionList;
        this.formdata.applyOpinionList = res.applyOpinionList;
        this.formdata.sytyOpinionList = res.sytyOpinionList;
        this.formdata.cyOpinionList = res.cyOpinionList;
        this.formdata.blqkOpinionList = res.blqkOpinionList;
        this.YRcheck = res.leadInfoList;
      });
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
.qcDetail {
   background: #f0f5fa;
  margin: 0 auto;

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
  width: 100%;
  right: 20px;
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
//.content-container:hover {
  //border: 1px solid #8996af;
//}
.opinion-wrapper{
    border:1px solid #e4e7ed;
    border-top: 0;
    border-bottom: 0;
}
.opinion-wrapper:first-child{
  border:1px solid #e4e7ed;
  border-bottom: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.opinion-wrapper:last-child{
    border-bottom-left-radius: 4px;
   border-bottom-right-radius: 4px;
    border:1px solid #e4e7ed;
    border-top: 0;
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

.guoCh {
  overflow: hidden;
}
.guoCh .guoCh1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.guoCh .guoCh2 {
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
</style>
<style lang="less" rel="stylesheet/less">
.el-message-box__btns .el-button:last-child{
  transform: translateX(-68px)!important;
}
</style>
