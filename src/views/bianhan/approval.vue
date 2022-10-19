<template>
  <div class="approval">
    <template v-if="templateShow">
      <div id="printHtml" class="tablePrint">
        <el-row>
          <h1 style class="title-h1">{{ formData.title }}</h1>
        </el-row>
        <table
          cellspacing="0"
          cellpadding="0"
          class="printTableList"
          style="font-family: 宋体; font-size: 19px"
          id="print-table"
        >
          <tbody>
            <tr>
              <td>印章设备名称</td>
              <td id="type" style="width: 20%; padding-left: 10px">{{ formData.deviceName }}</td>
              <td style="width: 16%; text-align: center">设备型号</td>
              <td id="redHead" style="width: 18%; padding-left: 10px">{{ formData.deviceType }}</td>
              <td style="width: 16%; text-align: center">设备编号</td>
              <td id="redHead" style="width: 18%; padding-left: 10px">{{ formData.deviceNumber }}</td>
            </tr>
            <tr>
              <td style="text-align: center">维护类型</td>
              <td
                id="shenpiTitle"
                colspan="5"
                style="padding-left: 10px"
              >{{ formData.maintainType }}</td>
            </tr>
            <tr>
              <td style="text-align: center">取章时长</td>
              <td
                id="shenpiTitle"
                colspan="5"
                style="padding-left: 10px"
              >{{ formData.sealCloseTime }}</td>
            </tr>
            <tr>
              <td style="text-align: center">印章名称</td>
              <td id="shenpiTitle" colspan="5" style="padding-left: 10px">{{ formData.sealName1 }}</td>
            </tr>
            <tr>
              <td>申请人</td>
              <td id="type" style="width: 20%; padding-left: 10px">{{ formData.sqPerson }}</td>
              <td style="width: 16%; text-align: center">申请部门</td>
              <td id="redHead" style="width: 18%; padding-left: 10px">{{ formData.yzDept }}</td>
              <td style="width: 16%; text-align: center">申请时间</td>
              <td id="redHead" style="width: 18%; padding-left: 10px">{{ formData.cdate }}</td>
            </tr>
            <tr>
              <td>编号</td>
              <td id="type" style="width: 20%; padding-left: 10px">{{ formData.documentNo }}</td>
              <td style="width: 16%; text-align: center">维护完成时间</td>
              <td id="shenpiTitle" colspan="5" style="padding-left: 10px">{{ formData.endTime }}</td>
            </tr>
            <tr>
              <td>设备开启时间1</td>
              <td id="type" style="width: 20%; padding-left: 10px">{{ formData.startTime1 }}</td>
              <td style="width: 16%; text-align: center">设备关闭时间1</td>
              <td id="redHead" style="width: 18%; padding-left: 10px">{{ formData.closeTime1 }}</td>
              <td style="width: 16%; text-align: center">处理时长1</td>
              <td id="redHead" style="width: 18%; padding-left: 10px">{{ formData.clTime1 }}</td>
            </tr>
            <tr>
              <td>设备开启时间2</td>
              <td id="type" style="width: 20%; padding-left: 10px">{{ formData.startTime2 }}</td>
              <td style="width: 16%; text-align: center">设备关闭时间2</td>
              <td id="redHead" style="width: 18%; padding-left: 10px">{{ formData.closeTime2 }}</td>
              <td style="width: 16%; text-align: center">处理时长2</td>
              <td id="redHead" style="width: 18%; padding-left: 10px">{{ formData.clTime2 }}</td>
            </tr>
            <tr>
              <td style="text-align: center">维护原因</td>
              <td
                id="shenpiTitle"
                colspan="5"
                style="padding-left: 10px"
              >{{ formData.maintainCause }}</td>
            </tr>
            <tr style="height: 140px">
              <td style="width：20%;text-align:center;vertical-align:middle">申请部门领导审批</td>
              <td colspan="5" style="text-align: center; vertical-align: middle">
                <div class="p1">{{ formData.setSpYjAgree }}</div>
                <div class="qianF" v-for="item in opinion.spYj" :key="item.id">
                  <div class="p1">{{ item.content }}</div>
                  <div class="p2">
                    <span>
                      {{ item && item.qm }}
                      <br />
                      {{ item && item.dateTime }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr style="height: 140px">
              <td style="width：20%;text-align:center;vertical-align:middle">申请单位行领导审批</td>
              <td colspan="5" style="text-align: center; vertical-align: middle">
                <div class="p1">{{ formData.hsp }}</div>
                <div class="qianF" v-for="item in opinion.hsp" :key="item.id">
                  <div class="p1">{{ item.content }}</div>
                  <div class="p2">
                    <span>
                      {{ item && item.qm }}
                      <br />
                      {{ item && item.dateTime }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr style="height: 140px">
              <td style="width：20%;text-align:center;vertical-align:middle">上级行审批</td>
              <td colspan="5" style="text-align: center; vertical-align: middle">
                <div class="p1">{{ formData.shunYj }}</div>
                <div class="qianF" v-for="item in opinion.shunYj" :key="item.id">
                  <div class="p1">{{ item.content }}</div>
                  <div class="p2">
                    <span>
                      {{ item && item.qm }}
                      <br />
                      {{ item && item.dateTime }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr style="height: 140px">
              <td style="width：20%;text-align:center;vertical-align:middle">处理情况</td>
              <td colspan="5" style="text-align: center; vertical-align: middle">
                <div class="p1">{{ formData.clQk }}</div>
                <div class="qianF" v-for="item in opinion.monitorOption" :key="item.id">
                  <div class="p1">{{ item.content }}</div>
                  <div class="p2">
                    <span>
                      {{ item && item.qm }}
                      <br />
                      {{ item && item.dateTime }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr style="height: 140px">
              <td style="width：20%;text-align:center;vertical-align:middle">审请单位监印</td>
              <td colspan="5" style="text-align: center; vertical-align: middle">
                <div class="p1">{{ formData.monitorOption }}</div>
                <div class="qianF" v-for="item in opinion.clQk" :key="item.id">
                  <div class="p1">{{ item.content }}</div>
                  <div class="p2">
                    <span>
                      {{ item && item.qm }}
                      <br />
                      {{ item && item.dateTime }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr style="height: 140px">
              <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
              <td colspan="5" style="text-align: center; vertical-align: middle">
                <div class="p1">{{ formData.remark }}</div>
                <div class="qianF" v-for="item in opinion.remark" :key="item.id">
                  <div class="p1">{{ item.content }}</div>
                  <div class="p2">
                    <span>
                      {{ item && item.qm }}
                      <br />
                      {{ item && item.dateTime }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tablePrint2">
        <div class="bank_dispach_content" id="bank_dispach_content">
          <div class="bank_dispach_side_nav">
            <a
              href="javascript:void(0);"
              :class="{ active: active == '#wjys' ? 'active' : '' }"
              @click="toTarget('#wjys')"
            >文件要素</a>
            <a
              href="javascript:void(0);"
              :class="{ active: active == '#qpyj' ? 'active' : '' }"
              @click="toTarget('#qpyj')"
            >签批意见</a>
          </div>
        </div>
        <el-col :span="24" class="header">
          <div class="headerClick">
            <el-button
              class="bank_grid_comtent_active"
              v-for="(item, index) in buttonList"
              v-show="item.show"
              :key="index"
              @click="headerBtnClick(item.name)"
              plain
              size="small"
            >{{ item.name }}</el-button>
          </div>
        </el-col>
        <p class="shiwuTitle" ref="registeHeader">{{ formData.title }}</p>
        <div class="content">
          <el-form ref="form" :rules="rules" :model="formData" label-width="170px">
            <div class="box">
              <el-form-item label="当前环节:">
                <span style="color: red">
                  {{
                  this.formData.currentNode || "填写审批单"
                  }}
                </span>
              </el-form-item>
              <el-form-item label="当前处理人:" v-if="this.$route.query.type == '办结' ? false : true">
                <span style="color: red">
                  {{
                  formData.currentUser
                  ? formData.currentUser
                  : userInfo.humanName
                  }}
                </span>
              </el-form-item>
            </div>
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="印章设备名称" prop="deviceName">
                  <el-select
                    v-model="value"
                    placeholder="请选择"
                    @change="changeDeviceName"
                    style="width: 100%"
                    :disabled="readFields.deviceName"
                  >
                    <el-option
                      v-for="item in deviceNameOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备型号" prop="deviceType">
                  <el-input v-model="formData.deviceType" :disabled="readFields.deviceType"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="设备编号" prop="deviceNumber">
                  <el-input v-model="formData.deviceNumber" :disabled="readFields.deviceNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="维护类型" prop="maintainType">
                <el-radio-group
                  v-model="formData.maintainType"
                  :disabled="readFields.maintainType"
                  class="opinionRadio"
                  @change="maintainTypeChange"
                >
                  <el-radio v-for="(item, index) in maintainTypes" :key="index" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="印章名称" prop="allSealName">
                  <el-checkbox-group
                    v-if="isCheckBox"
                    v-model="formData.sealName1"
                    :disabled="readFields.allSealName"
                    @change="isSealName"
                  >
                    <el-checkbox
                      v-for="(item, index) in allSealName"
                      :key="index"
                      :label="item.id"
                    >{{ item.sealName }}</el-checkbox>
                  </el-checkbox-group>
                  <el-input
                    v-if="!isCheckBox"
                    v-model="formData.sealName1"
                    :disabled="readFields.allSealName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="isShowTime" :span="10" :style="{ display: 'flex' }">
                <el-form-item prop="sealCloseTime" label="取章时长" :style="{ width: '60%' }">
                  <el-input v-model="formData.sealCloseTime" :disabled="readFields.sealCloseTime"></el-input>
                </el-form-item>
                <span
                  :style="{
                    color: '#606266',
                    marginLeft: '8px',
                    lineHeight: '32px',
                    fontSize: '14px',
                  }"
                >(单位：分钟)</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="编号" prop="serialNumber">
                  <el-input v-model="formData.documentNo" :disabled="readFields.serialNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="维护完成时间" prop="endTime">
                  <el-input v-model="formData.endTime" :disabled="readFields.endTime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请人" prop="sqPerson">
                  <el-input v-model="formData.sqPerson" :disabled="readFields.sqPerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请部门" prop="yzDept">
                  <el-input v-model="formData.yzDept" :disabled="readFields.yzDept"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="申请时间" prop="cdate">
                  <el-input v-model="formData.cdate" :disabled="readFields.yzDept"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="设备开启时间1" prop="startTime1">
                  <el-input v-model="formData.startTime1" :disabled="readFields.startTime1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备关闭时间1" prop="closeTime1">
                  <el-input v-model="formData.closeTime1" :disabled="readFields.closeTime1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="处理时长1" prop="clTime1">
                  <el-input v-model="formData.clTime1" :disabled="readFields.clTime1"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="设备开启时间2" prop="startTime2">
                  <el-input v-model="formData.startTime2" :disabled="readFields.startTime2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备关闭时间2" prop="closeTime2">
                  <el-input v-model="formData.closeTime2" :disabled="readFields.closeTime2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="处理时长2" prop="clTime2">
                  <el-input v-model="formData.clTime2" :disabled="readFields.clTime2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="维护原因" prop="maintainCause">
                  <el-input v-model="formData.maintainCause" :disabled="readFields.maintainCause"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <h6 id="qpyj" class="bank_dispach_file_tit">签批意见</h6>
            <el-row>
              <el-col :span="23">
                <el-form-item label="退回意见" v-show="opinionLengthBackContent >= '1' ? true : false">
                  <div class="opinionTbody">
                    <div
                      class="lineContent"
                      v-for="(item, index) in opinion.backContent"
                      :key="index"
                    >
                      <div>{{item.content}}</div>
                      <div class="adviceInfo">
                        {{ item && item.qm }}
                        <br />
                        {{ item && item.dateTime }}
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label="申请部门领导审批" prop="spYj">
                  <el-row
                    v-show="
                      editedIdeaFields.spYj === true && opinionLength >= 1
                        ? false
                        : true
                    "
                  >
                    <el-radio-group
                      v-model="formData.spYjAgree"
                      @change="
                        (val) => {
                          pubIsShowYj(val, '申请部门领导审批');
                        }
                      "
                      v-show="!editedIdeaFields.spYj"
                      :disabled="editedIdeaFields.spYj"
                      class="el-group"
                    >
                      <el-radio label="0">同意</el-radio>
                      <el-radio label="1">不同意</el-radio>
                    </el-radio-group>
                    <el-input
                      show-word-limit
                      maxlength="500"
                      type="textarea"
                      v-model="formData.spYj"
                      @focus="audFocus('申请部门领导审批')"
                      @blur="audBlur('申请部门领导审批')"
                      :disabled="editedIdeaFields.spYj"
                    ></el-input>
                  </el-row>
                  <div class="opinionTbody" v-show="opinionLength > 0 ? true : false">
                    <div class="lineContent" v-for="(item, index) in opinion.spYj" :key="index">
                      <div>{{item.content}}</div>
                      <div class="adviceInfo">
                        {{ item && item.qm }}
                        <br />
                        {{ item && item.dateTime }}
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="1" class="icon-shunYj">
                <el-button
                  v-show="!editedIdeaFields.spYj"
                  :disabled="editedIdeaFields.spYj"
                  @click="showWriteList('spYj')"
                  class="group-icon"
                >
                  <i class="icon-font el-icon-edit select-chang"></i>
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="申请单位行领导审批" prop="hsp">
                  <el-row
                    v-show="
                      editedIdeaFields.hsp === true && opinionLengthHsp >= 1
                        ? false
                        : true
                    "
                  >
                    <el-radio-group
                      v-model="formData.hspAgree"
                      @change="
                        (val) => {
                          pubIsShowYj(val, '申请单位行领导审批');
                        }
                      "
                      v-show="!editedIdeaFields.hsp"
                      :disabled="editedIdeaFields.hsp"
                      class="el-group"
                    >
                      <el-radio label="0">同意</el-radio>
                      <el-radio label="1">不同意</el-radio>
                    </el-radio-group>
                    <el-input
                      show-word-limit
                      maxlength="500"
                      type="textarea"
                      v-model="formData.hsp"
                      @focus="audFocus('申请单位行领导审批')"
                      @blur="audBlur('申请单位行领导审批')"
                      :disabled="editedIdeaFields.hsp"
                    ></el-input>
                  </el-row>

                  <div class="opinionTbody" v-show="opinionLengthHsp > 0 ? true : false">
                    <div class="lineContent" v-for="(item, index) in opinion.hsp" :key="index">
                      <div>{{item.content}}</div>
                      <div class="adviceInfo">
                        {{ item && item.qm }}
                        <br />
                        {{ item && item.dateTime }}
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="1" class="icon-shunYj">
                <el-button
                  v-show="!editedIdeaFields.hsp"
                  :disabled="editedIdeaFields.hsp"
                  @click="showWriteList('hsp')"
                  class="group-icon"
                >
                  <i class="icon-font el-icon-edit select-chang"></i>
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="上级行审批" prop="shunYj">
                  <el-row
                    v-show="
                      editedIdeaFields.shunYj === true &&
                      opinionLengthShunYj >= 1
                        ? false
                        : true
                    "
                  >
                    <el-radio-group
                      v-model="formData.shunYjAgree"
                      @change="
                        (val) => {
                          pubIsShowYj(val, '上级行管理部门审批');
                        }
                      "
                      v-show="!editedIdeaFields.shunYj"
                      :disabled="editedIdeaFields.shunYj"
                      class="el-group"
                    >
                      <el-radio label="0">同意</el-radio>
                      <el-radio label="1">不同意</el-radio>
                    </el-radio-group>
                    <el-input
                      show-word-limit
                      maxlength="500"
                      type="textarea"
                      @focus="audFocus('上级行管理部门审批')"
                      @blur="audBlur('上级行管理部门审批')"
                      v-model="formData.shunYj"
                      :disabled="editedIdeaFields.shunYj"
                    ></el-input>
                  </el-row>
                  <div class="opinionTbody" v-show="opinionLengthShunYj > 0 ? true : false">
                    <div class="lineContent" v-for="(item, index) in opinion.shunYj" :key="index">
                      <div>{{item.content}}</div>
                      <div class="adviceInfo">
                        {{ item && item.qm }}
                        <br />
                        {{ item && item.dateTime }}
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="1" class="icon-shunYj">
                <el-button
                  v-show="!editedIdeaFields.shunYj"
                  :disabled="editedIdeaFields.shunYj"
                  @click="showWriteList('shunYj')"
                  class="group-icon"
                >
                  <i class="icon-font el-icon-edit select-chang"></i>
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item prop="clQk" label="处理情况">
                  <el-row
                    v-show="
                      editedIdeaFields.clQk === true && opinionLengthClQk >= 1
                        ? false
                        : true
                    "
                  >
                    <el-input
                      show-word-limit
                      maxlength="500"
                      type="textarea"
                      v-model="formData.clQk"
                      :disabled="editedIdeaFields.clQk"
                    ></el-input>
                  </el-row>
                  <div class="opinionTbody" v-show="opinionLengthClQk > 0 ? true : false">
                    <div class="lineContent" v-for="(item, index) in opinion.clQk" :key="index">
                      <div>{{item.content}}</div>
                      <div class="adviceInfo">
                        {{ item && item.qm }}
                        <br />
                        {{ item && item.dateTime }}
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="1" class="icon-clqk">
                <el-button
                  v-show="!editedIdeaFields.clQk"
                  :disabled="editedIdeaFields.clQk"
                  @click="showWriteList('clQk')"
                  class="group-icon"
                >
                  <i class="icon-font el-icon-edit select-chang"></i>
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item prop="monitorOption" label="申请单位监印">
                  <el-row
                    v-show="
                      editedIdeaFields.monitorOption === true &&
                      opinionLengthMonitorOption >= 1
                        ? false
                        : true
                    "
                  >
                    <el-input
                      show-word-limit
                      maxlength="500"
                      type="textarea"
                      v-model="formData.monitorOption"
                      :disabled="editedIdeaFields.monitorOption"
                    ></el-input>
                  </el-row>
                  <div v-show="opinionLengthMonitorOption > 0 ? true : false" class="opinionTbody">
                    <div
                      class="lineContent"
                      v-for="(item, index) in opinion.monitorOption"
                      :key="index"
                    >
                      <div>{{item.content}}</div>
                      <div class="adviceInfo">
                        {{ item && item.qm }}
                        <br />
                        {{ item && item.dateTime }}
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="1" class="icon-clqk">
                <el-button
                  v-show="!editedIdeaFields.monitorOption"
                  :disabled="editedIdeaFields.monitorOption"
                  @click="showWriteList('monitorOption')"
                  class="group-icon"
                >
                  <i class="icon-font el-icon-edit select-chang"></i>
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    show-word-limit
                    maxlength="500"
                    type="textarea"
                    v-model="formData.remark"
                    :disabled="editedIdeaFields.remark"
                  ></el-input>
                  <div class="opinionTbody" v-show="opinionLengthRemark > 0 ? true : false">
                    <div class="lineContent" v-for="(item, index) in opinion.remark" :key="index">
                      <div>{{item.content}}</div>
                      <div class="adviceInfo">
                        {{ item && item.qm }}
                        <br />
                        {{ item && item.dateTime }}
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <!-- 退回修改弹窗 -->
      <el-dialog :title="thTitle" :visible.sync="Ths" width="30%" :before-close="handleClose">
        <el-form ref="Thdata" :model="Thdatas" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="退回原因">
                <el-input v-model="Thdatas.thyxs"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" style="text-align: center">
              <el-button type="primary" @click="thqds">退回</el-button>
              <el-button @click="ThQxs">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <!--    文号编号组成-->
      <el-dialog
        title="文号选择"
        :visible.sync="isdialog"
        width="30% !important"
        height="200px"
        :before-close="handleClose"
      >
        <el-row class="isdialog">
          <el-col :span="4">
            <span>当前文号</span>
          </el-col>
          <el-col :span="20">
            <el-radio-group @change="disoAn" v-model="formQiHao1">
              <el-radio :label="formQiHao"></el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <div>
          <el-row class="isdialog">
            <el-col :span="4">
              <span>空缺文号</span>
            </el-col>
            <el-col
              :span="20"
              class="el-table__body-wrapper"
              style="overflow-y: auto;max-height: 200px;margin-top: 8px;"
            >
              <!-- <el-radio :label="1"></el-radio> -->
              <el-radio-group
                @change="diso"
                style="display:block;line-height:31px;"
                v-model="deleteapplyCode"
                v-for="item in delCode"
                :key="item.index"
              >
                <el-radio :label="item" style="margin-right: 16px">
                  {{
                  item
                  }}
                </el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="delecurrentCode">确定</el-button>
          <el-button @click="closeWH">取消</el-button>
        </span>
      </el-dialog>
      <!--    常用批语-->
      <appendWriteList
        v-dialogDrag
        :offenDevices="offenDevices"
        ref="writelist"
        v-if="appendWriteDialog"
        @childsaveselect="writelistvalue"
        @addCommonUse="addCommonUse"
        @deleId="deleteMassage"
      ></appendWriteList>
      <!-- :orgId="orgId" -->
      <!-- :hasRadio="hasRadio"
      :canTab="false"-->
      <select-person
        :treeData="treeData"
        :loadingTree="true"
        :offenUse="offenUse"
        :dialogType="dialogType"
        :seletOptionsData="seletOptionsData"
        :dialogTypeNow="dialogTypeNow"
        dialogTit="选择人员"
        :fromdata="formData"
        :subOrgFlag="false"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        @showCompDialog="showCompDialog"
      ></select-person>
      <!-- 发送上级行审批 -->
      <org-tree
        v-model="showOrgTree"
        title="请选择上级行"
        @orgList="getOrgList"
        :isSingle="true"
        :queryType="queryType"
        :orgOrDept="orgOrDept"
        :orgOrDeptId="orgOrDeptId"
        :isSearchAll="true"
      ></org-tree>
      <!-- 查看流程 -->
      <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
      <!-- 用印查看视频 -->
      <seal-img-detail ref="sealImgDetail" :onlyVideo="true"></seal-img-detail>
    </template>
    <template v-if="!templateShow">
      <approval-await></approval-await>
    </template>
  </div>
</template>
<script>
import selectPerson from "components/tree/treeTansun";
import approvalAwait from "views/bianhan/approvalAwait";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import minixs from "@/minixs/index";
import supbankTree from "components/tree/superiorBank.vue";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import appendWriteList from "components/viewFlow/perWrit";
import backreason from "@/components/viewFlow/backReason";
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
import exportTable from "@/minixs/exportTable";
import sealImgDetail from "views/sealDrafttt/components/sealImgDetail";
import faciltyMatainMix from "@/views/sealManage/facilityManage/mixins/faciltyMatainMix";
import useSealMixins from "@/views/sealDrafttt/mixins/index";
import orgTree from "components/tree/orgTree1"; //部门选择组件
import shiwuLineWord from "../../minixs/shiwuLineWord";
import exportTableQueryScript from "@/minixs/exportTableQueryScript";

import viewDraft from "@/minixs/viewDraft";
import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";

export default {
  mixins: [
    minixs,
    openOrDownLoadFile,
    faciltyMatainMix,
    useSealMixins,
    shiwuLineWord,
    exportTableQueryScript,
    viewDraft,
    draftMuban,
    dispatchIndex,
    isNowUser
  ],

  components: {
    selectPerson,
    shiwuFlow,
    sealImgDetail,
    orgTree,
    appendWriteList,
    approvalAwait
  },

  created() {
    this.loadingData();
  },

  data() {
    return {
      ifSameUnit: false, // 当前处理人和上一处理人是否为同一机构
      backflag: false, // 当前登陆人是否有直接返回 权限
      las: "",
      fileNo: "",
      deleteapplyCode: "", //单选按钮选中的编号
      delCode: [], //存储所用过文号数组
      isdialog: false,
      formQiHao1: "",
      formQiHao: "",
      thTitle: "", // 退回标题
      Thdatas: {
        //退回原因
        thyxs: ""
      },
      Ths: false, //退回原因控制
      templateShow: Boolean,
      backType: "",
      statusType: "", //编号状态值
      // 常用批语
      offenDevices: [],
      appendWriteDialog: false, //常用批语
      allSealName: [], // 印章名称所有选项
      disposeType: "", //状态
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      isreadflag: "", //是否已读
      opinion: {},
      opinionLength: "",
      opinionLengthHsp: "", //申请单位行领导审批
      opinionLengthShunYj: "",
      opinionLengthRemark: "",
      opinionLengthMonitorOption: "",
      opinionLengthClQk: "",
      opinionLengthBackContent: "",
      topBankApprove: [],
      value: "",
      rules: {},
      attchmentFileInfo: [],
      uploadConfig: {
        formId: "one",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      formData: {
        documentNo: "",
        backContent: "",
        shunYjAgree: "",
        curUserDepId: "",
        drafDepId: "",
        curUserDepId: "",
        spYjAgree: "",
        fzrYj: "",
        hspAgree: "",
        shYjAgree: "",
        shYj: "",
        shunYj: "",
        type: "",
        mathStatistics: "",
        isagree: "",
        deviceName: "",
        deviceType: "",
        deviceNumber: "",
        maintainType: "",
        sealCloseTime: "",
        // allSealName: [],
        sealName1: "", //印章名称
        allSealName1: "",
        selallSealName: [],
        sqPerson: "",
        yzDept: "",
        cdate: "",
        serialNumber: "",
        endTime: "",
        startTime1: "",
        closeTime1: "",
        clTime1: "",
        startTime2: "",
        closeTime2: "",
        clTime2: "",
        maintainCause: "",
        spYj: "",
        fzIdea: "",
        hsp: "",
        upperApproval: "",
        clQk: "",
        monitorOption: "",
        remark: ""
      },
      //印章名称字段是否为多选框
      isCheckBox: false,
      machineId: "",
      allSealNameOption: [],
      maintainTypes: ["安装印章", "手工用印", "故障维修"],
      yesOrNo: {
        yes: "同意",
        no: "不同意"
      },
      showFlowChart: false,
      flowChartList: [],
      sealName2: "", // 印章位置
      id: "",
      orgId: "",
      // 标记流程调度/完成并发送
      isLinkChange: false,
      // 发送上级行审批
      showOrgTree: false,
      orgOrDeptId: "", //控制id
      queryType: "up", //查询级别
      orgOrDept: 0,
      /**
       * 环节信息
       */
      huanJieMessage: {},
      buttonList: [
        { name: "关闭", type: "close", show: false }, //0
        { name: "保存", type: "save", show: false }, //1
        { name: "完成并发送", type: "doneAndSend", show: false }, //2
        { name: "删除此文", type: "btn_sccw", show: false }, //3

        { name: "发送上级行审批", type: "sendToUpperBank", show: false }, //8
        { name: "返回请示行", type: "sendToLowerBank", show: false }, //9
        { name: "收回", type: "shouhui", show: false }, //16
        { name: "退回修改", type: "tuihui", show: false }, //17
        { name: "退回", type: "back", show: false }, //18
        { name: "生成编号", type: "getDocumentNo", show: false }, //6
        { name: "办结", type: "done", show: false }, //7
        { name: "查看流程", type: "checkProcess", show: false }, //10
        { name: "收藏", type: "collect", show: false }, //11
        { name: "打印处理单", type: "printForm", show: false }, //12
        { name: "操作指南", type: "guidline", show: false }, //13
        { name: "维护", type: "maintain", show: false }, //4
        { name: "维护完成", type: "maintainDone", show: false }, //5
        { name: "流程调度", type: "lcdd", show: false }, //14
        { name: "查看视频", type: "cksp", show: false } //15
      ],
      //不可编辑控制域
      readFields: {
        sealCloseTime: false,
        remark: false,
        upperBankApproval: false,
        clQk: false,
        upperMonitorApproval: false,
        spYj: false,
        fzIdea: false,
        startTime1: false,
        closeTime1: false,
        clTime1: false,
        startTime2: false,
        closeTime2: false,
        clTime2: false
      },
      //必填控制域
      requiredFields: {
        deviceNumber: "",
        maintainType: "",
        sqPerson: "",
        yzDept: "",
        maintainCause: "",
        cdate: "",
        deviceType: "",
        deviceName: "",
        allSealName: "",
        serialNumber: "",
        endTime: "",
        sqperson: "",
        startTime1: "",
        closeTime1: "",
        clTime1: "",
        startTime2: "",
        closeTime2: "",
        clTime2: ""
      },
      //可编辑意见域
      editedIdeaFields: {
        remark: true,
        monitorOption: true,
        clQk: true,
        shunYj: true,
        shYj: true,
        hsp: true,
        fzIdea: true,
        spYj: true
      },
      //必填意见域
      requiredIdeaFields: {
        remark: false,
        spYj: false, //申请部门领导审批
        fzIdea: false, //申请部门领导审批
        shYj: false,
        monitorOption: false, //申请单位监印
        clQk: false //处理情况
      },
      deviceNameOptions: [
        // {
        //   label: '金鹰-29',
        //   value: '29'
        // }
      ],
      treeData: [], //人员树
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,

      sqPersonId: "",
      YzDeptId: "",
      bankName: "",
      formCfg: [],
      // 是否显示取章时长字段
      isShowTime: false,
      label: "",
      labelFzIdea: "",
      labelHsp: "",
      labelShyj: "",
      labelShunyj: "",
      // 所选印章ID
      sealId: ""
    };
  },

  methods: {
    //文号确定按钮
    delecurrentCode(row) {
      if (this.deleteapplyCode) {
        this.fileNo = this.deleteapplyCode;
        this.$api.sealManage
          .getSealNum({
            markOrderType: "11",
            statusType: this.statusType,
            id: this.$route.query.id,
            draftOrganId: this.formData.draftOrganId,
            draftDepartmentId: this.formData.draftDepartmentId,
            fileNo: this.fileNo
          })
          .then(res => {
            if (res) {
              this.formData.documentNo = res.data;
              this.savedata();
            }
          })
          .catch(er => {
            this.$message({
              type: "warning",
              message: "生成编号" + this.fileNo + "错误"
            });
          });
        this.isdialog = false;
      } else if (this.formQiHao1) {
        this.fileNo = this.formQiHao1;
        this.$api.sealManage
          .getSealNum({
            markOrderType: "11",
            statusType: this.statusType,
            id: this.$route.query.id,
            draftOrganId: this.formData.draftOrganId,
            draftDepartmentId: this.formData.draftDepartmentId,
            fileNo: this.fileNo
          })
          .then(res => {
            if (res) {
              this.formData.documentNo = res.data;
              this.savedata();
            }
          })
          .catch(er => {
            this.$message({
              type: "warning",
              message: "生成编号" + this.fileNo + "错误"
            });
          });
        this.isdialog = false;
      } else {
        this.$message.warning("请选择编号");
      }
      this.getLink();
    },
    //文号弹窗方法
    handleClose() {
      this.isdialog = false;
      this.isdialogCY = false;
    },
    //文号弹窗取消
    closeWH() {
      this.isdialog = false;
    },
    diso() {
      this.formQiHao1 = "";
    },
    disoAn() {
      this.deleteapplyCode = "";
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then((_) => {
    //       done();
    //     })
    //     .catch((_) => {});
    // },
    thqds() {
      this.formData.backContent = this.Thdatas.thyxs;
      this.returnBack();
      //backContent
    },
    ThQxs() {
      this.Thdatas.thyxs = "";
      this.Ths = false;
    },
    //附件列表回显数据
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.$route.query.id
        })
        .then(res => {
          this.$nextTick(() => {
            // this.$set(this.attchmentFileInfo, "attchmentFileInfo", res.data);
            this.attchmentFileInfo = res.data;
            this.uploadConfig.filesHas = this.attchmentFileInfo;
          });
        });
    },
    deleteMassage(data) {
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
    writelistvalue(message) {
      switch (this.clickTypes) {
        case "spYj":
          if (this.formData.spYj == "同意" || this.formData.spYj == "不同意") {
            this.$set(
              this.formData,
              "spYj",
              this.formData.spYj + "。" + message
            );
          } else {
            this.$set(this.formData, "spYj", this.formData.spYj + message);
          }
          break;
        case "hsp":
          if (this.formData.hsp == "同意" || this.formData.hsp == "不同意") {
            this.$set(this.formData, "hsp", this.formData.hsp + "。" + message);
          } else {
            this.$set(this.formData, "hsp", this.formData.hsp + message);
          }
          break;
        case "shunYj":
          if (
            this.formData.shunYj == "同意" ||
            this.formData.shunYj == "不同意"
          ) {
            this.$set(
              this.formData,
              "shunYj",
              this.formData.shunYj + "。" + message
            );
          } else {
            this.$set(this.formData, "shunYj", this.formData.shunYj + message);
          }
          break;
        case "clQk":
          this.$set(this.formData, "clQk", this.formData.clQk + message);
          break;
        case "monitorOption":
          this.$set(
            this.formData,
            "monitorOption",
            this.formData.monitorOption + message
          );
          break;
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
    isSealName(val) {
      this.formData.sealName1 = val;
    },
    audFocus(type) {
      switch (type) {
        case "申请部门领导审批":
          if (
            this.formData.spYj === "同意" ||
            this.formData.spYj === "不同意"
          ) {
            this.formData.spYj = this.formData.spYj + "。";
          }
          break;
        case "申请部门综合处理":
          if (
            this.formData.fzIdea === "同意" ||
            this.formData.fzIdea === "不同意"
          ) {
            this.formData.fzIdea = this.formData.fzIdea + "。";
          }
          break;
        case "申请单位行领导审批":
          if (this.formData.hsp === "同意" || this.formData.hsp === "不同意") {
            this.formData.hsp = this.formData.hsp + "。";
          }
          break;
        case "上级行管理部门综合处理":
          if (
            this.formData.shYj === "同意" ||
            this.formData.shYj === "不同意"
          ) {
            this.formData.shYj = this.formData.shYj + "。";
          }
          break;
        case "上级行管理部门审批":
          if (
            this.formData.shunYj === "同意" ||
            this.formData.shunYj === "不同意"
          ) {
            this.formData.shunYj = this.formData.shunYj + "。";
          }
          break;
        default:
          break;
      }
    },
    audBlur(type) {
      switch (type) {
        case "申请部门领导审批":
          if (
            this.formData.spYj === "同意。" ||
            this.formData.spYj === "不同意。"
          ) {
            this.formData.spYj = this.label;
          }
          break;
        case "申请部门综合处理":
          if (
            this.formData.fzIdea === "同意。" ||
            this.formData.fzIdea === "不同意。"
          ) {
            this.formData.fzIdea = this.labelFzIdea;
          }
          break;
        case "申请单位行领导审批":
          if (
            this.formData.hsp === "同意。" ||
            this.formData.hsp === "不同意。"
          ) {
            this.formData.hsp = this.labelHsp;
          }
          break;
        case "上级行管理部门综合处理":
          if (
            this.formData.shYj === "同意。" ||
            this.formData.shYj === "不同意。"
          ) {
            this.formData.shYj = this.labelShyj;
          }
          break;
        case "上级行管理部门审批":
          if (
            this.formData.shunYj === "同意。" ||
            this.formData.shunYj === "不同意。"
          ) {
            this.formData.shunYj = this.labelShunyj;
          }
          break;
        default:
          break;
      }
    },
    pubIsShowYj(val, type) {
      switch (type) {
        case "申请部门领导审批":
          if (val === "0") {
            this.label = "同意";
          } else {
            this.label = "不同意";
          }
          if (this.formData.spYj) {
            let array = this.formData.spYj.split("。");
            if (
              (array.length == 1 && this.formData.spYjAgree == "同意") ||
              this.formData.spYjAgree == "不同意"
            ) {
              array.splice(0, 0, this.label);
            } else {
              if (array[0] == "同意" || array[0] == "不同意") {
                array.splice(0, 1, this.label);
              } else {
                array.splice(0, 0, this.label);
              }
            }
            this.formData.spYj = array.join("。");
          } else {
            this.$set(this.formData, "spYj", this.label + "");
          }
          break;
        case "申请部门综合处理":
          if (val === "0") {
            this.labelFzIdea = "同意";
          } else {
            this.labelFzIdea = "不同意";
          }
          if (this.formData.fzIdea) {
            let array = this.formData.fzIdea.split("。");
            if (
              (array.length == 1 && this.formData.fzrYj == "同意") ||
              this.formData.fzrYj == "不同意"
            ) {
              array.splice(0, 0, this.labelFzIdea);
            } else {
              if (array[0] == "同意" || array[0] == "不同意") {
                array.splice(0, 1, this.labelFzIdea);
              } else {
                array.splice(0, 0, this.labelFzIdea);
              }
            }
            this.formData.fzIdea = array.join("。");
          } else {
            this.$set(this.formData, "fzIdea", this.labelFzIdea + "");
          }
          break;
        case "申请单位行领导审批":
          if (val === "0") {
            this.labelHsp = "同意";
          } else {
            this.labelHsp = "不同意";
          }
          if (this.formData.hsp) {
            let array = this.formData.hsp.split("。");
            if (
              (array.length == 1 && this.formData.hspAgree == "同意") ||
              this.formData.hspAgree == "不同意"
            ) {
              array.splice(0, 0, this.labelHsp);
            } else {
              if (array[0] == "同意" || array[0] == "不同意") {
                array.splice(0, 1, this.labelHsp);
              } else {
                array.splice(0, 0, this.labelHsp);
              }
            }
            this.formData.hsp = array.join("。");
          } else {
            this.$set(this.formData, "hsp", this.labelHsp + "");
          }
          break;
        case "上级行管理部门综合处理":
          if (val === "0") {
            this.labelShyj = "同意";
          } else {
            this.labelShyj = "不同意";
          }
          if (this.formData.shYj) {
            let array = this.formData.shYj.split("。");
            if (
              (array.length == 1 && this.formData.shYjAgree == "同意") ||
              this.formData.shYjAgree == "不同意"
            ) {
              array.splice(0, 0, this.labelShyj);
            } else {
              if (array[0] == "同意" || array[0] == "不同意") {
                array.splice(0, 1, this.labelShyj);
              } else {
                array.splice(0, 0, this.labelShyj);
              }
            }
            this.formData.shYj = array.join("。");
          } else {
            this.$set(this.formData, "shYj", this.labelShyj + "");
          }
          break;
        case "上级行管理部门审批":
          if (val === "0") {
            this.labelShunyj = "同意";
          } else {
            this.labelShunyj = "不同意";
          }
          if (this.formData.shunYj) {
            let array = this.formData.shunYj.split("。");
            if (
              (array.length == 1 && this.formData.shunYjAgree == "同意") ||
              this.formData.shunYjAgree == "不同意"
            ) {
              array.splice(0, 0, this.labelShunyj);
            } else {
              if (array[0] == "同意" || array[0] == "不同意") {
                array.splice(0, 1, this.labelShunyj);
              } else {
                array.splice(0, 0, this.labelShunyj);
              }
            }
            this.formData.shunYj = array.join("。");
          } else {
            this.$set(this.formData, "shunYj", this.labelShunyj + "");
          }
          break;
        default:
          break;
      }
    },
    // 移除对象数组的空值
    removeNull(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == null || arr[i] == "" || JSON.stringify(arr[i]) == "{}") {
          arr.splice(i, 1);
          i = i - 1;
        }
      }
      return arr;
    },
    maintainTypeChange(val) {
      if (this.value === "") {
        this.$message({
          message: "请先选择印章设备名称",
          type: "warning"
        });
        this.formData.maintainType = "";
        return true;
      }
      this.$api.sealManage.useSealMaintain
        .selectItems({
          title: this.value,
          type: "option",
          orgId: this.formData.draftOrganId || this.userInfo.unitId
        })
        .then(res => {
          this.formData.machineId = res.data[0].machineId;
          this.$api.sealManage.useSealDevice
            .serveiceNumber({
              orgId: this.formData.draftOrganId || this.userInfo.unitId,
              deviceNobak: this.formData.machineId
            })
            .then(res => {
              let sealName1 = [];
              console.log(res.list, "获取1258");
              res.list.map(item => {
                sealName1.push({
                  sealName: item.yzJiancheng,
                  id: item.storeMark
                });
                if (item.yzJiancheng == this.formData.sealName1 + "") {
                  return (this.sealName2 = item.storeMark);
                }
              });
              this.allSealName = sealName1;
              if (val === "手工用印" || val === "卸载印章") {
                this.isCheckBox = true;
                this.formData.sealName1 = [];
              } else {
                const array = [];
                this.allSealName.map(item => {
                  array.push(item.sealName);
                });
                this.isCheckBox = false;
                this.formData.sealName1 = "";
                this.formData.sealName1 = this.removeNull(array.join(","));
              }
            });
          this.allSealName = this.removeNull(this.allSealName);
        });
    },
    getLink() {
      this.$api.sealManage.useSealMaintain
        .fillFormRight({ id: this.id })
        .then(res => {
          this.huanJieMessage = res.data;
          this.requiredFields = this.setRequiredFields(
            this.requiredFields,
            this.huanJieMessage.requiredFields
          );
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
          this.initRule();
          console.log(this.$route.query.id);
          if (this.$route.query.id) {
            this.buttonList[11].show = true;
          } else {
            this.buttonList[11].show = false;
          }
        });
    },
    initRule() {
      this.rules = {
        cdate: [
          {
            required: this.requiredFields.cdate,
            message: "不能为空",
            trigger: "change"
          }
        ],
        deviceName: [
          {
            required: this.requiredFields.deviceName,
            message: "不能为空",
            trigger: "change"
          }
        ],
        clTime2: [
          {
            required: this.requiredFields.clTime2,
            message: "不能为空",
            trigger: "change"
          }
        ],
        closeTime2: [
          {
            required: this.requiredFields.closeTime2,
            message: "不能为空",
            trigger: "change"
          }
        ],
        startTime2: [
          {
            required: this.requiredFields.startTime2,
            message: "不能为空",
            trigger: "change"
          }
        ],
        clTime1: [
          {
            required: this.requiredFields.clTime1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        closeTime1: [
          {
            required: this.requiredFields.closeTime1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        startTime1: [
          {
            required: this.requiredFields.startTime1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: this.requiredFields.endTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        serialNumber: [
          {
            required: this.requiredFields.serialNumber,
            message: "不能为空",
            trigger: "change"
          }
        ],
        allSealName: [
          {
            required: this.requiredFields.allSealName,
            message: "不能为空",
            trigger: "change"
          }
        ],
        deviceNumber: [
          {
            required: this.requiredFields.deviceNumber,
            message: "不能为空",
            trigger: "change"
          }
        ],
        deviceType: [
          {
            required: this.requiredFields.deviceType,
            message: "不能为空",
            trigger: "change"
          }
        ],
        maintainCause: [
          {
            required: this.requiredFields.maintainCause,
            message: "不能为空",
            trigger: "change"
          }
        ],
        maintainType: [
          {
            required: this.requiredFields.maintainType,
            message: "不能为空",
            trigger: "change"
          }
        ],
        sqPerson: [
          {
            required: this.requiredFields.sqPerson,
            message: "不能为空",
            trigger: "change"
          }
        ],
        shYj: [
          {
            required: this.requiredIdeaFields.shYj,
            message: "上级行管理部门综合处理不能为空",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: this.requiredIdeaFields.remark,
            message: "备注不能为空",
            trigger: "change"
          }
        ],
        clQk: [
          {
            required: this.requiredIdeaFields.clQk,
            message: "处理情况不能为空",
            trigger: "change"
          }
        ],
        yzDept: [
          {
            required: this.requiredFields.yzDept,
            message: "不能为空",
            trigger: "change"
          }
        ],
        spYj: [
          {
            required: this.requiredIdeaFields.spYj,
            message: "申请部门领导审批意见不能为空",
            trigger: "change"
          }
        ],
        monitorOption: [
          {
            required: this.requiredIdeaFields.monitorOption,
            message: "申请单位监印不能为空",
            trigger: "change"
          }
        ],
        fzIdea: [
          {
            required: this.requiredIdeaFields.fzIdea,
            message: "申请部门综合处理不能为空",
            trigger: "change"
          }
        ],
        hsp: [
          {
            required: this.requiredIdeaFields.hsp,
            message: "申请单位行领导审批不能为空",
            trigger: "change"
          }
        ],
        shunYj: [
          {
            required: this.requiredIdeaFields.shunYj,
            message: "上级行管理部门审批不能为空",
            trigger: "change"
          }
        ]
      };
    },
    // 下载
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
    toTarget(target) {
      this.active = target;
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    changeDeviceName(value) {
      this.$set(this.formData, "deviceName", value);
      this.formData.maintainType = "";
      this.isCheckBox = false;
      this.formData.sealName1 = "";
      this.$api.sealManage.useSealMaintain
        .selectItems({
          title: value,
          type: "option",
          orgId: this.formData.draftOrganId || this.userInfo.unitId
        })
        .then(res => {
          if (res.data[0].machineType === "stocked") {
            this.maintainTypes = [
              "安装印章",
              "手工用印",
              "故障维修",
              "卸载印章"
            ];
            this.isShowTime = true;
          } else if (res.data[0].machineType === "unstocked") {
            this.maintainTypes = ["安装印章", "手工用印", "故障维修"];
            this.isShowTime = false;
          }

          this.$api.sealManage.useSealDevice
            .serveiceNumber({
              orgId: this.formData.draftOrganId || this.userInfo.unitId,
              deviceNobak: this.formData.machineId
            })
            .then(res => {
              let sealName1 = [];
              res.list.map(item => {
                sealName1.push(item.yzJiancheng);
              });
              this.allSealName = sealName1;
            });
          this.$set(this.formData, "deviceType", res.data[0].deviceType);
          this.$set(this.formData, "deviceNumber", res.data[0].deviceNumber);
        });
    },
    returnBack() {
      this.$set(this.formData, "supNodeCode", this.formData.currentNode);
      if (
        this.formData.maintainType === "手工用印" ||
        this.formData.maintainType === "卸载印章"
      ) {
        this.formData.sealName1 = this.formData.sealName1.join(",");
      }
      this.$api.sealManage.useSealMaintain
        .returnBack({ id: this.id, ...this.formData, backType: this.backType })
        .then(res => {
          if (this.backType == "退回") {
            this.$message({
              message: "退回成功",
              type: "success"
            });
          } else if (this.backType == "退回修改") {
            this.$message({
              message: "退回修改成功",
              type: "success"
            });
          }
          this.$intent.closeWindow(this);
        });
    },
    sendBack() {
      this.$api.sealManage.useSealMaintain
        .sendBack({ id: this.id })
        .then(res => {
          this.$message({
            message: "收回成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
        });
    },
    processDetail() {
      // A08463615
      console.log(this.formData);
      let id = {
        // curProcessInstId: this.formData.workflowId
        subProcessInstId: this.formData.oldWorkFlowId
      };
      this.$api.sealManage.useSealMaintain.viewLink(id).then(res => {
        this.showFlowChart = true;
        this.flowChartList = res.data;
        this.$nextTick(() => {
          this.$refs.dialogLine.openDialog();
        });
      });
    },
    clickDoneAndSend() {
      let _this = this;
      this.$api.sealManage.useSealMaintain
        .clickDoneAndSend({ id: this.id })
        .then(res => {
          this.$nextTick(() => {
            let PCSAVYIDs = [];
            _this.seletOptionsData = res.data.list.filter(item => {
              if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                PCSAVYIDs.push(item.PCSAVYID);
                return item;
              }
            });

            this.seletOptionsData = this.shoNextNode(
              this.seletOptionsData,
              this.huanJieMessage.acyNodeNextBount
            );
          });
        });
      this.dialogState = true;
    },
    //发送上级行确定
    getOrgList(org) {
      if (
        this.formData.maintainType === "手工用印" ||
        this.formData.maintainType === "卸载印章"
      ) {
        this.formData.sealName1 = this.formData.sealName1.join(",");
      }
      this.$api.sealManage.useSealMaintain
        .sendupSenior({
          id: this.id || this.$route.query.id,
          unitId: org.id,
          ...this.formData
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "成功发送上级行"
          });
          this.$intent.closeWindow(this);
        });
    },
    headerBtnClick(btnName) {
      switch (btnName) {
        case "关闭":
          this.closedata();
          break;
        case "保存":
          this.savedata();
          break;
        case "发送上级行审批":
          this.orgOrDeptId = this.userInfo.unitId;
          this.showOrgTree = true;
          break;
        case "返回请示行":
          // 上级行管理部门审批
          this.$api.sealManage.useSealMaintain
            .sendlowerSenior({
              id: this.id || this.$route.query.id,
              ...this.formData
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "成功返回请示行"
              });
              this.$intent.closeWindow(this);
            });
          break;
        case "删除此文":
          this.$confirm("是否删除并关闭页面？").then(() => {
            if (this.id || this.$route.query.id) {
              this.$api.sealManage.useSealMaintain
                .delSealMaintain({
                  id: this.id || this.$route.query.id
                })
                .then(res => {
                  this.$message({
                    type: "success",
                    message: "删除成功！"
                  });
                  this.$intent.closeWindow(this);
                });
            } else {
              this.$intent.closeWindow(this);
            }
          });
          break;
          break;
        case "查看流程":
          this.processDetail();
          break;
        case "流程调度":
          this.$api.sealManage.useSealMaintain
            .linkChange({ id: this.id })
            .then(res => {
              this.seletOptionsData = res.data; // 下一处理环节赋值
              this.$api.sealManage.useSealMaintain
                .clickDoneAndSend({ id: this.id })
                .then(res => {
                  this.isLinkChange = true;
                });
            });
          this.offenUse = true;
          this.dialogState = true;
          break;
        case "完成并发送":
          if (
            this.ifSameUnit === true &&
            this.backflag &&
            this.formData.currentNode != "填写审批单"
          ) {
            this.$confirm(
              "是否返回给" + this.formData.oldPersonName + "?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(res => {
                this.savedata().then(() => {
                  this.$api.sealManage.useSealMaintain
                    .doneAndSend({
                      id: this.formData.id,
                      backflag: this.backflag
                    })
                    .then(res => {
                      if (res.code == "SUCCESS") {
                        this.$message({
                          message: "操作成功",
                          type: "success"
                        });
                        this.$intent.closeWindow(this);
                      }
                    });
                });
              })
              .catch(() => {
                this.savedata().then(res => {
                  if (!this.formData.currentNode) {
                    this.formData.currentNode = "填写审批单";
                  }
                  this.clickDoneAndSend();
                });
              });
          } else {
            this.savedata().then(res => {
              if (!this.formData.currentNode) {
                this.formData.currentNode = "填写审批单";
              }
              this.clickDoneAndSend();
            });
          }
          break;
        case "生成编号":
          let jbN = this.formData.documentNo;
          let fir = jbN.indexOf("〕");
          let sec = jbN.indexOf("号");
          let las = Number(jbN.substring(fir + 1, sec));
          this.las = las;
          if (las) {
            this.$message({
              type: "warning",
              message: "已有编号不可重复生成"
            });
          } else {
            this.statusType = true;
            this.savedata(false)
              .then(() => {
                return this.$api.sealManage.getSealNum({
                  markOrderType: "11",
                  statusType: this.statusType,
                  id: this.$route.query.id,
                  draftOrganId: this.formData.draftOrganId,
                  draftDepartmentId: this.formData.draftDepartmentId,
                  fileNo: this.fileNo
                });
              })
              .then(res => {
                if (res.codeList) {
                  this.isdialog = true;
                  this.deleteapplyCode = "";
                  this.formQiHao = res.fileNo;
                  this.delCode = res.codeList;
                } else {
                  this.formData.documentNo = res.data;
                }
                this.las = res.data;
                this.savedata();
                this.getLink();
              });
          }
          break;
        case "办结":
          this.disposeType = "办结";
          this.$confirm("是否办结文件？", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning"
          }).then(() => {
            this.$api.sealManage.useSealMaintain
              .doneAndSend({ ...this.formData, clLx: "办结", backflag: false })
              .then(res => {
                this.$message({
                  message: "办结成功",
                  type: "success"
                });
              });
            this.$intent.closeWindow(this);
          });
          break;
        case "收藏":
          let paramer = {
            markOrderType: "11",
            id: this.$route.query.id
          };
          exportTableQueryScript.yzCollect(this, paramer);
          // this.$api.sealManage
          //   .shoucang({ markOrderType: "11", id: this.$route.query.id })
          //   .then(res => {
          //     console.log(res, "获取收藏返回值");
          //     this.downFile(res);
          //   });
          break;
        case "操作指南":
          this.handBook("YZGL");
          break;
        case "打印处理单":
          this.printType = "打印处理单";
          this.print();
          break;
        /**
         * 调取用印机相关接口
         */
        case "维护":
          this.sealMaintain();
          break;
        case "维护完成":
          // 是否
          if (this.formData.endTime) {
            this.$message({
              type: "warning",
              message: "维护已结束"
            });
          } else {
            this.$confirm("是否结束本次维护?", "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }).then(() => {
              this.finishSealMaintain();
            });
          }
          break;
        case "查看视频":
          let idObj = {
            id: this.$router.query.id
          };
          this.$refs.sealImgDetail.show(idObj);
          break;
        case "收回":
          this.sendBack();
          break;
        case "退回修改":
          if (this.formData.supNodeCode === "填写审批单") {
            this.$message({
              type: "warning",
              message: "当前环节不可退回修改"
            });
            return true;
          }
          this.backType = "0";
          this.thTitle = "退回修改";
          this.Ths = true;
          break;
        case "退回":
          this.Ths = true;
          this.backType = "1";
          this.thTitle = "退回";
          break;
      }
    },
    print() {
      if (this.id) {
        this.$intent.goNewPage(this, {
          path: "/sealManage/facilityManage/approval/approvalPrint",
          query: {
            id: this.$route.query.id,
            title: this.formData.title,
            type: this.printType,
            name: this.formData.sealName
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "请先保存数据"
        });
      }
    },
    showCompDialog(data, status, type, params, dtype) {
      if (status) {
        if (this.offenUse == false) {
          this.$set(this.formData, "monitorName", data[0].name);
          this.$set(this.formData, "monitorId", data[0].id.split("#")[0]);
        } else {
          if (this.seletOptionsData.length > 0) {
            this.$set(this.formData, "currentNodeId", params.id);
            this.$set(this.formData, "currentUser", data[0].name);
            this.$set(this.formData, "currentUserId", data[0].id.split("#")[0]);
            this.$set(
              this.formData,
              "MultiID",
              this.seletOptionsData[0].MULTITENANCYID
            );
            this.$set(this.formData, "currentNode", params.name);
            this.$set(this.formData, "tplNo", this.seletOptionsData[0].PTPLNO);
            this.$set(this.formData, "type", 0);
            if (this.disposeType) {
              this.$set(this.formData, "clLx", this.disposeType);
            } else {
              this.$set(this.formData, "clLx", "完成并发送");
            }
            this.$set(this.formData, "isagree", "");
            this.$set(this.formData, "id", this.id);
            if (
              this.formData.maintainType === "手工用印" ||
              this.formData.maintainType === "卸载印章"
            ) {
              this.formData.sealName1 = this.formData.sealName1.join(",");
            }
            this.$api.sealManage.useSealMaintain
              .doneAndSend({ ...this.formData, backflag: false })
              .then(res => {
                if (this.formData.maintainType == "craftSeal") {
                  this.$set(this.formData, "mathStatistics", "1");
                }
                this.$set(
                  this.formData,
                  "type",
                  this.seletOptionsData[0].AVYNODENM
                );
                this.$message({
                  message: "成功发送到下一节点",
                  type: "success"
                });
                if (this.isLinkChange) {
                  this.dialogState = false;
                } else {
                  this.$intent.closeWindow(this);
                }
              });
          }
        }
      } else {
        this.dialogState = false;
      }
    },
    /**
     * @param showLoading 是否显示保存成功loading，默认为true, 不显示为false
     */
    savedata(showLoading = true) {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            let sealName = [];
            console.log(this.formData.maintainType, "获取allSealName");
            if (
              this.formData.maintainType === "手工用印" ||
              this.formData.maintainType === "卸载印章"
            ) {
              this.allSealName.map(item => {
                this.formData.sealName1.map(list => {
                  if (list === item.id) {
                    sealName.push(item.sealName);
                  }
                });
              });
              this.formData.sealName = sealName.join(",");
            } else {
              this.formData.sealName = this.formData.sealName1;
            }
            console.log(this.formData, "获取保存详情");
            if (typeof this.formData.sealName1 === "object") {
              // this.checkbox = true
              this.formData.sealName1 = this.formData.sealName1.join(",");
            }
            if (this.formData.selallSealName.length > 0) {
              this.formData.allSealName = this.formData.selallSealName.join(
                ","
              );
            } else {
              this.formData.allSealName = this.formData.allSealName1;
            }
            if (this.$route.query.id == null) {
              console.log("没有id", this.formData);
              this.$api.sealManage.useSealMaintain
                .drafUseSealMaintain(this.formData)
                .then(res => {
                  this.id = res.data;
                  resolve(res);
                  if (showLoading) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                  }
                  if (
                    this.formData.maintainType === "手工用印" ||
                    this.formData.maintainType === "卸载印章"
                  ) {
                    this.formData.sealName1 = this.formData.sealName1.split(
                      ","
                    );
                    this.sealName2 = this.formData.sealName1.join("#");
                  }
                  this.$intent.replace(this, {
                    path: "/sealManage/facilityManage/approval",
                    query: { id: res.data, type: "待办" }
                  });
                  this.loadingData();
                });
            } else {
              this.$set(this.formData, "id", this.id);
              if (this.editedIdeaFields.spYj == true) {
                this.formData.spYj = "";
              }
              if (this.editedIdeaFields.hsp == true) {
                this.formData.hsp = "";
              }
              if (this.editedIdeaFields.shunYj == true) {
                this.formData.shunYj = "";
              }
              if (this.editedIdeaFields.clQk == true) {
                this.formData.clQk = "";
              }
              if (this.editedIdeaFields.monitorOption == true) {
                this.formData.monitorOption = "";
              }
              if (this.editedIdeaFields.remark == true) {
                this.formData.remark = "";
              }
              console.log("有id", this.formData);
              this.$api.sealManage.useSealMaintain
                .updateUseSealMaintain(this.formData)
                .then(res => {
                  resolve(res);
                  if (showLoading) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                  }
                  if (
                    this.formData.maintainType === "手工用印" ||
                    this.formData.maintainType === "卸载印章"
                  ) {
                    this.formData.sealName1 = this.formData.sealName1.split(
                      ","
                    );
                    this.sealName2 = this.formData.sealName1.join("#");
                  }
                });
            }
          } else {
            this.$message({
              type: "warning",
              message: "请完善表单"
            });
          }
        });
      });
    },
    closedata() {
      if (
        !this.formData.currentUserId ||
        parseInt(this.formData.currentUserId) === this.userInfo.humanId
      ) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              this.savedata().then(() => {
                this.$intent.closeWindow(this);
              });
            } else if (action === "cancel") {
              this.$intent.closeWindow(this);
            } else if (action === "confirm") {
            }
          }
        });
      } else {
        this.$intent.closeWindow(this);
      }
    },
    opinionMt(res) {
      /**
       * 意见
       */
      this.opinion = res;
      this.value = this.formData.deviceName;
      this.opinionLength = this.opinion.spYj.length;
      this.opinionLengthHsp = this.opinion.hsp.length;
      this.opinionLengthShunYj = this.opinion.shunYj.length;
      this.opinionLengthRemark = this.opinion.remark.length;
      this.opinionLengthMonitorOption = this.opinion.monitorOption.length;
      this.opinionLengthClQk = this.opinion.clQk.length;
      this.opinionLengthBackContent = this.opinion.backContent.length;
    },
    haveId(id) {
      this.id = id;
      if (
        this.$route.query.type == "办结" ||
        this.$route.query.type == "已办"
      ) {
        this.templateShow = false;
      } else {
        this.isreadflag = 1;
        this.templateShow = true;
        this.$api.sealManage.useSealMaintain
          .UseSealMaintainDetail({
            id: this.$route.query.id,
            isreadflag: this.isreadflag
          })
          .then(res => {
            console.log("backFlag1", res.data.backflag);
            this.backflag = res.data && res.data.backflag ? true : false;
            this.sealId = res.data.view.sealName1;
            this.formData = Object.assign(this.formData, res.data.view);
            this.ifSameUnit = res.data.hasOwnProperty("ifSameUnit")
              ? res.data.ifSameUnit
              : true;

            this.$api.sealManage.useSealMaintain
              .selectItems({ type: "", orgId: this.formData.draftOrganId })
              .then(res => {
                /** @description: 印章设备名称列表 */
                this.deviceNameOptions = res.data.menu.map(item => {
                  return { value: item.title, label: item.title };
                });
              });
            let jbN = this.formData.documentNo;
            let fir = jbN.indexOf("〕");
            let sec = jbN.indexOf("号");
            let las = Number(jbN.substring(fir + 1, sec));
            this.las = las;
            this.$set(this.formData, "drafDepId", this.formData.yzDeptId);
            this.$set(this.formData, "curUserDepId", res.data.clrDept);
            // this.$set(this.formData, 'supNodeCode', this.formData.currentNode) // 20211223修改，拿出来什么是什么 获取详情的时候不许要给这个字段赋值
            this.opinionMt(res.data.opinion);
            this.value = this.formData.deviceName;
            this.getLink();
            this.$api.sealManage.useSealMaintain
              .selectItems({
                title: this.value,
                type: "option",
                orgId: this.formData.draftOrganId
              })
              .then(res => {
                // 获取该设备的维护类型
                if (res.data[0].machineType === "stocked") {
                  this.maintainTypes = [
                    "安装印章",
                    "手工用印",
                    "故障维修",
                    "卸载印章"
                  ];
                  this.isShowTime = true;
                } else if (res.data[0].machineType === "unstocked") {
                  this.maintainTypes = ["安装印章", "手工用印", "故障维修"];
                  this.isShowTime = false;
                }
                /** @description: 拿到对应的设备型号和设备编号 */
                this.$set(this.formData, "deviceType", res.data[0].deviceType);
                this.$set(
                  this.formData,
                  "deviceNumber",
                  res.data[0].deviceNumber
                );

                this.$api.sealManage.useSealMaintain
                  .selectItems({
                    title: this.value,
                    type: "option",
                    orgId: this.formData.draftOrganId
                  })
                  .then(res => {
                    if (res.data.length !== 0) {
                      this.$set(
                        this.formData,
                        "machineId",
                        res.data[0].machineId
                      );
                      this.$api.sealManage.useSealDevice
                        .serveiceNumber({
                          deviceNobak: this.formData.machineId,
                          orgId: this.formData.draftOrganId
                        })
                        .then(res => {
                          let sealName1 = [];
                          res.list.map(item => {
                            sealName1.push({
                              sealName: item.yzJiancheng,
                              id: item.storeMark
                            });
                          });
                          this.allSealName = sealName1;
                          if (
                            this.formData.maintainType === "手工用印" ||
                            this.formData.maintainType === "卸载印章"
                          ) {
                            this.isCheckBox = true;
                            this.formData.sealName1 = this.removeNull(
                              this.formData.sealName1.split(",")
                            );
                            this.sealName2 = this.removeNull(
                              this.formData.sealName1.join("#")
                            );
                            console.log(this.sealName2);
                          } else {
                            const array = [];
                            this.allSealName.map(item => {
                              array.push(item.sealName);
                            });
                            this.isCheckBox = false;
                            this.formData.sealName1 = this.removeNull(
                              array.join(",")
                            );
                          }
                        });
                    }
                  });
              });
          });
        this.getFileList();
      }
    },
    noId() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo);
      this.$api.sealManage.useSealMaintain
        .selectItems({ type: "", orgId: this.userInfo.unitId })
        .then(res => {
          this.$set(this.formData, "sqPersonId", res.data.personal.sqPersonId);
          this.$set(this.formData, "sqPerson", res.data.personal.sqPerson);
          this.$set(this.formData, "yzDeptId", res.data.personal.yzDeptId);
          this.$set(this.formData, "yzDept", res.data.personal.yzDept);
          this.$set(this.formData, "cdate", res.data.personal.cdate);
          this.deviceNameOptions = res.data.menu.map(item => {
            return { value: item.title, label: item.title };
          });

          if (this.$route.query.depId == null) {
          } else {
            this.$set(this.formData, "yzDept", this.$route.query.depName);
            this.$set(this.formData, "yzDeptId", this.$route.query.depId);
          }
        });
      this.statusType = "0";
      let par = {
        statusType: false,
        markOrderType: "11",
        draftDepartmentId: this.$route.query.depId
      };
      this.$api.sealManage.useSealMaintain.getDocumentNo(par).then(res => {
        this.$set(this.formData, "documentNo", res.data);
      });
      this.$api.sealManage.useSealMaintain
        .getDocumentNoTitle({ statusType: this.statusType })
        .then(res => {
          this.$set(this.formData, "title", res.deptTableHead);
        });
      //印章管理-用印机设备维护（获取控制域)
      this.getLink();
    },
    loadingData() {
      const id = this.$route.query.id;
      if (id) return this.haveId(id);
      else return this.noId();
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.icon-clqk {
  margin-left: 0px;
  position: relative;
  left: 10px;
}
.icon-shunYj {
  margin-left: 0px;
  position: relative;
  left: 10px;
  top: 36px;
}
.el-radio {
  line-height: 32px;
}
.group-icon {
  float: right;
}
.el-group {
  width: 100%;
  line-height: 30px;
}
.select-chang {
  float: right;
}
.adviceInfo {
  font-size: 14px !important;
  line-height: 20px;
  text-align: right;
}
.lineContent {
  line-height: 24px;
  font-size: 14px;
  word-break: break-all;
  white-space: pre-line;
}
.opinionTbody {
  background-color: rgba(228, 231, 237, 0.32) !important;
  color: #000;
  padding: 5px 15px 5px 5px !important;
  border: 1px solid #e4e7ed !important;
  border-radius: 4px !important;
  margin-top: 5px;
}
.bank_dispach_content {
  width: 100%;
  height: auto;

  .bank_dispach_side_nav {
    width: 45px !important;
    height: auto !important;
    position: fixed !important;
    bottom: 8px !important;
    left: 10% !important;
    margin-left: -43px !important;
    text-align: center !important;

    a {
      width: 45px !important;
      height: 70px !important;
      border: 2px solid #3b85ef !important;
      font-size: 16px !important;
      margin: 15px 0 !important;
      color: #3b85ef !important;
      background: #fff !important;
      border-radius: 10px 0 0 10px !important;
      font-weight: 600 !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    .active {
      background: #3b85ef !important;
      color: #fff !important;
    }
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}

.bank_dispach_file_tit {
  width: 100%;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}
.maintainButton {
  margin-left: 20px;
}
.header {
  width: 100%;
  background-color: #409eff;
  color: #333;
  line-height: 60px;
  z-index: 2;
  .slider-contaner {
    width: 100%;
    height: 60px;
    overflow: hidden;
    position: relative;
    background: #409eff;
  }
  .slider {
    float: right;
    margin-right: 20px;
    height: 60px;
  }
}

.default-color {
  color: #ff7929;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix:after {
  overflow: hidden;
  clear: both;
  display: block;
  content: "";
}
.depart_title {
  margin-bottom: 40px;
  font-size: 30px;
  line-height: 75px;
  color: red;
  font-weight: 600;
  text-align: center;
}
.approval {
  .box {
    border: 1px solid red;
    background: #fef7e7;
    box-sizing: border-box;
    margin-bottom: 30px;
    display: flex;
    .el-form-item {
      margin-bottom: 0 !important;
    }
    > div {
      display: inline-block;
    }
  }
  .content {
    border: 1px solid #c3c3c3;
    width: 80%;
    margin: 0 auto;
    padding: 2% 2%;
    .content-title {
      height: 40px;
      background: #fff;
      line-height: 40px;
      border-bottom: 1px solid #c3c3c3;
      padding: 0 10px;
      margin-bottom: 15px;
    }
    .fd_form {
      padding: 0 20px 20px;
      .el-col:nth-of-type(5) {
        .el-input--suffix {
          position: absolute;
          width: inherit;
          top: 0;
          left: 0;
          right: 120px;
        }
        .el-button--primary {
          float: right;
        }
      }
    }
  }
}
.wrap {
  position: relative;
}
.wrap::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
}
.ewm {
  width: 150px;
  margin: 0 auto;
}
.bank_dispach_content {
  width: 100%;
  height: auto;

  .bank_dispach_side_nav {
    width: 45px !important;
    height: auto !important;
    position: fixed !important;
    bottom: 8px !important;
    left: 4% !important;
    margin-left: -43px !important;
    text-align: center !important;

    a {
      width: 45px !important;
      height: 70px !important;
      border: 2px solid #3b85ef !important;
      font-size: 16px !important;
      margin: 15px 0 !important;
      color: #3b85ef !important;
      background: #fff !important;
      border-radius: 10px 0 0 10px !important;
      font-weight: 600 !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    .active {
      background: #3b85ef !important;
      color: #fff !important;
    }
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}
.common {
  background: #fff;
  .normalFormDia {
    .normalForm {
      border: none;
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }

  .common-header {
    width: 100%;
    display: flex;
    background: #409eff;
    justify-content: space-between;
    align-items: center;
    .back {
      line-height: 60px;
      height: 60px;
      margin-left: 2%;
      color: #eee;
    }
    .btn_box {
      display: flex;
      margin-right: 2%;
    }
  }
  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 35px;
    color: #409eff;
    font-weight: 800;
  }
  .el-form {
    border: 1px solid #dcdfe6;
    width: 92%;
    padding: 2% 2%;
    margin: auto;
    .box {
      width: 97%;
      border: 1px solid red;
      background: #fef7e7;
      box-sizing: border-box;
      height: 42px;
      margin: 0 0 30px 2%;
    }
  }
  textarea {
    width: 100%;
    resize: none;
  }
  .text-red {
    color: red;
  }
  .border-bot {
    border-bottom: 1px solid #dcdfe6;
  }
}
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 0 auto;
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

    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}

/deep/input::-webkit-input-placeholder {
  color: red;
}
/deep/input::-moz-input-placeholder {
  color: red;
}
/deep/input::-ms-input-placeholder {
  color: red;
}
/deep/ .dialogImport {
  .el-dialog {
    width: 20% !important;
  }
}
.useSealWaytip .el-form-item__label {
  color: #f56c6c !important;
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

.tablePrint2 {
  background-color: #f0f5fa;
}
.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
  z-index: -999;
  position: fixed;
}
.printTableList {
  width: 94%;
  margin: 0 auto;

  tr {
    height: 32px;
    td {
      width: 12%;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
}
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
  .d_b100 {
    width: 100%;
    white-space: normal;
  }

  .br {
    word-wrap: break-word;
    word-break: break-all;
  }
}
.pos_r {
  position: relative;
}
.printButton {
  position: absolute !important;
  top: 1% !important;
  right: 1% !important;
}
.printButton1 {
  position: absolute !important;
  top: 1% !important;
  left: 10% !important;
  right: 1% !important;
}
.delBox {
  width: 100%;
  height: 32px;
  .buttonItem {
    float: right;
  }
}
.isdialog {
  height: 34px;
  line-height: 34px;
}
</style>
