<template>
  <!-- 签报电子处理单  （跨行审批行）-->
  <div id="signquteWaitSph" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>签报处理单 -->
        </p>

        <div class="grid_comtent">
          <!-- <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="preserve('save')">保存</el-button>
          <el-button size="small" plain @click="concludematter">办结</el-button> 综合   签批意见  判断协办是否办结

          <el-button size="small" plain @click="completeSending">完成并发送</el-button>
          <el-button size="small" plain v-if="showHQ" @click="handleSendHQPtmt">发协办部门</el-button>
          <el-button size="small" plain @click="backPingShi">返回请示行</el-button>    综合  办理情况和签批意见 判断协办是否办结
          <el-button size="small" plain @click="sendTackBtn">收回</el-button>     
          <el-button size="small" plain @click="signBack">退回修改</el-button>    点了就无 判断协办是否办结
          <el-button size="small" plain @click="handleHuiqianState">查看协办状态</el-button>
          <el-button size="small" plain @click="drafting('0')">查看正文</el-button>
          <el-button size="small" plain @click="delectArticle">删除此文</el-button>       无
          <el-button size="small" plain @click="collect">收藏</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>-->

          <!-- <el-button size="small" plain @click="bankmain('cy', 1)">增发发送传阅人</el-button>
          <el-button size="small" plain @click="bankmain('cy')">发送传阅人</el-button>-->
          <!-- 表单控制 -->
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            @click="closeHandler = true"
            v-show="readonlyQbcy"
          >关闭</el-button>
           <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose1" v-show="!readonlyQbcy">关闭</el-button>
          <el-button
            size="small"
            v-for="(item,index) in buttonList"
            :disabled="createDocNo"
            @click="buttonClick(item.type)"
            :key="index"
            v-show="buttonList[index].show"
            plain
          >{{item.name}}</el-button>
        </div>
      </el-col>
    </el-row>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <cyIsSend ref="dialogLineCY" v-if="cyIsSendShow"></cyIsSend>
    <el-dialog v-dialogDrag title="定密依据" :visible.sync="secretBaslsDialogVisible">
      <el-col>
        <el-radio-group v-model="secretBaslsYJ" class="dingMiStyle">
          <el-radio
            v-for="(item,index) in secretBaslsList"
            :key="index"
            :label="index"
            :value="item.label"
          >
            <div class="secretStyle" v-for="(items,indexs) in item.label" :key="indexs">
              <span>{{items}}</span>
              <input v-if="indexs<item.label.length-1" class="secretInput" :id="index+''+indexs" />
            </div>
          </el-radio>
        </el-radio-group>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" @click="secretBaslsDialogVisible = false">取 消</el-button>
        <el-button size="big" type="primary" @click="savesecretBasls">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 全选备注1 -->
    <el-dialog v-dialogDrag title="操作" :visible.sync="shdialog1" width="50%">
      <el-card>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedsh" @change="handleCheckedCitiesChange">
          <el-checkbox
            v-for="(item,index) in shData"
            :label="item"
            :key="index"
          >{{item.currentUser}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog1 = false">取 消</el-button>
        <el-button type="primary" @click="shQuedingCY">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-dialogDrag title="返回上一处理人" width="30%" :visible.sync="handeldoBacksyclr">
      <span>是否确定返回上一处理人</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handeldoBacksyclr = false">取消</el-button>
        <el-button type="primary" @click="doBacksyclrHandle">确定</el-button>
      </span>
    </el-dialog>

    <!-- 意见弹窗提示 -->
    <!-- fromdata.curNodeName =='部门领导签批' ? '拟稿部门意见': -->
    <el-dialog v-dialogDrag title="批示意见" width="30%" :visible.sync="nigaobumenFlag">
      <span>未填写批示意见，是否继续</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nigaobumenSureHandle(false)">否</el-button>
        <el-button type="primary" @click="nigaobumenSureHandle(true)">是</el-button>
      </span>
    </el-dialog>

    <!-- 起草正文 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="showDraft"
      :modal-append-to-body="false"
      width="600px"
      height="600px"
      title="起草正文"
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
        <el-button type="primary" @click="doDraft(null,null,'1')">确定</el-button>
      </div>
    </el-dialog>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <el-dialog v-dialogDrag title="收回" width="30%" :visible.sync="sendTackVisible">
      <span>是否确定收回</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendTackVisible = false">取消</el-button>
        <el-button type="primary" @click="sendTackHandle">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag title="查看协办状态" :visible.sync="ckhqzt">
      <el-table border :data="tableData1" class="scroll" height="400">
        <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
        <el-table-column
          v-for="item in tableCols1"
          :key="item.id"
          :prop="item.prop"
          :formatter="item.formatter"
          :label="item.label"
          align="center"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" type="primary" @click="ckhqzt = false">取 消</el-button>
      </span>
    </el-dialog>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{directTitle}}电子签报承办单</h3>
    </header>
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
          :class="active == '#cyxx' ? 'active' : ''"
          @click="toTarget('#cyxx')"
        >传阅信息</a>
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <!-- <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current" >
              <span>请抓紧办理，办结后及时退回请示行</span>
            </p>
          </div>-->
          <div class="bank_dispach_annotation bank_dispach_annotation_bottom">
            <p class="bank_dispach_annotation_current" style="width:15%;">
              当前环节：
              <span>{{fromdata.curNodeName}}</span>
            </p>
            <p class="bank_dispach_annotation_current">
              当前处理人：
              <span>{{fromdata.currentUser}}</span>
            </p>
          </div>
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" placeholder="请输入正文标题" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="呈送" prop="submittedName" ref="submittedName">
                    <el-input v-model="fromdata.submittedName" placeholder="请输入呈送" disabled></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="16">
                  <el-form-item label="办理期限" prop="submittedName" ref="submittedName">
                    <el-input v-model="fromdata.submittedName" placeholder="请输入呈送" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="办理进度" prop="submittedName" ref="submittedName">
                    <el-input v-model="fromdata.submittedName" placeholder="请输入呈送" disabled></el-input>
                  </el-form-item>
                </el-col>-->
                <el-col :span="8">
                  <el-form-item label="处理类型" prop="handleTypeName" ref="handleTypeName">
                    <el-input v-model="fromdata.handleTypeName" placeholder="请输入处理类型" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item
                    label="紧急程度"
                    :span="8"
                    prop="emergencyLevelName"
                    ref="emergencyLevelName"
                  >
                    <el-select
                      v-model="fromdata.emergencyLevelName"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="emergencyLevelitem in SemergencyLevel"
                        :key="emergencyLevelitem.label"
                        :label="emergencyLevelitem.label"
                        :value="emergencyLevelitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="签报类型" prop="qianBaoTypeName" ref="qianBaoTypeName">
                    <el-select
                      v-model="fromdata.qianBaoTypeName"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="sendTypeitem in SqianbaoType"
                        :key="sendTypeitem.label"
                        :label="sendTypeitem.label"
                        :value="sendTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="签报字号" prop="qianbaoCode" ref="qianbaoCode">
                    <el-select
                      v-model="fromdata.qianbaoCode"
                      placeholder="请选择"
                      style="width:50%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="sendTypeitem in SqbZihaoList"
                        :key="sendTypeitem.label"
                        :label="sendTypeitem.label"
                        :value="sendTypeitem.label"
                      ></el-option>
                    </el-select>
                    <el-input
                      style="width:50%"
                      v-model="fromdata.documentNo"
                      prop="documentNo"
                      ref="documentNo"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿日期" prop="draftTime" ref="draftTime">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="fromdata.draftTime"
                      style="width: 100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="拟稿单位" prop="draftDepartmentName" ref="draftDepartmentName">
                    <el-input v-model="fromdata.draftDepartmentName" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系人" prop="draftUserName" ref="draftUserName">
                    <el-input v-model="fromdata.draftUserName" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系电话" prop="phone" ref="phone">
                    <el-input
                      type="phone"
                      v-model="fromdata.phone"
                      disabled
                      @input.native="phoneChange"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!-- mimi -->
                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                    <el-select
                      @change="secretTypechange"
                      v-model="fromdata.secretType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretTypeitem in SsecretType"
                        :key="secretTypeitem.label"
                        :label="secretTypeitem.label"
                        :value="secretTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 工作秘密 -->
                <el-col :span="8" v-if="secretTypeFlag && !flag && workSecurityFlag">
                  <el-form-item label="秘密标志" :span="8" prop="workSecretFlag" ref="workSecretFlag">
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.workSecretFlag"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="workSecurityitem in SworkSecurity"
                        :key="workSecurityitem.label"
                        :label="workSecurityitem.label"
                        :value="workSecurityitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 内部信息 -->
                <el-col :span="8" v-show="secretTypeFlag && !flag && !workSecurityFlag">
                  <el-form-item label="秘密标志" :span="8" prop="secretFlag" ref="secretFlag">
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.secretFlag"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagitem in secretOptionsFlag"
                        :key="secretFlagitem.label"
                        :label="secretFlagitem.label"
                        :value="secretFlagitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item
                    label="秘密期限类型"
                    :span="8"
                    v-if="flag"
                    prop="secretLimitType"
                    ref="secretLimitType"
                  >
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.secretLimitType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretLimitTypeitem in SSsecretLimitType"
                        :key="secretLimitTypeitem.label"
                        :label="secretLimitTypeitem.label"
                        :value="secretLimitTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 选择保密期限 -->
                <el-col
                  :span="8"
                  v-if="flag && securityFlag"
                  style="display:flex;align-items:center;"
                >
                  <el-form-item
                    label="密级和保密期限"
                    :span="8"
                    prop="security"
                    ref="security"
                    style="width: 60%;"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                  <!-- <i class="el-icon-star-on pad_10" v-show="nationSecurFlag"></i> -->
                  <el-form-item
                    label
                    prop="secretLimitName"
                    ref="secretLimitName"
                    label-width="0px"
                    style="width: 20%;"
                  >
                    <el-input
                      @input="workSecurityTabTime('secretLimitName')"
                      v-model="fromdata.secretLimitName"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label
                    prop="secretTimeType"
                    ref="secretTimeType"
                    label-width="0px"
                    style="width: 20%;"
                  >
                    <el-select
                      name="secretTimeType"
                      v-model="fromdata.secretTimeType"
                      @change="workSecurityTabTime"
                      placeholder="请选择"
                      prop="secretTimeType"
                      ref="secretTimeType"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretTimeTypeitem in SsecretTimeType"
                        :key="secretTimeTypeitem.label"
                        :label="secretTimeTypeitem.label"
                        :value="secretTimeTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 选择解密时间 -->
                <el-col
                  :span="8"
                  v-if="flag && businessSecretFlag"
                  style="display:flex;align-items:center;"
                >
                  <el-form-item label="密级和保密期限" :span="8" prop="security" ref="security">
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                  <!-- <i class="el-icon-star-on pad_10" v-if="nationSecurFlag"></i> -->
                  <el-form-item label prop="secretLimit" ref="secretLimit" label-width="0px">
                    <el-date-picker
                      type="date"
                      @blur="workSecurityTabTime"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="fromdata.secretLimit"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- 选择解密条件 -->
                <el-col
                  :span="8"
                  v-if="flag && securitytiaojFlag"
                  style="display:flex;align-items:center;"
                >
                  <el-form-item label="密级和保密期限" :span="8" prop="security" ref="security">
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                  <!-- <i class="el-icon-star-on pad_10" v-if="nationSecurFlag"></i> -->
                  <el-form-item label prop="secretTimeType" ref="secretTimeType" label-width="0px">
                    <el-select
                      name="secretTimeType"
                      @change="workSecurityTabTime"
                      v-model="fromdata.secretTimeType"
                      placeholder="请选择"
                      prop="secretTimeType"
                      ref="secretTimeType"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretLimititem in SsecretLimit"
                        :key="secretLimititem.label"
                        :label="secretLimititem.label"
                        :value="secretLimititem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col v-show="fromdata.secretType">
                  <el-form-item label="知悉范围" prop="knowScore" ref="knowScore">
                    <el-input
                      type="textarea"
                      v-model="fromdata.knowScore"
                      maxlength="500"
                      resize="none"
                      autosize
                      placeholder="填写知悉范围可输入500字"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="fromdata.secretType">
                  <el-form-item label="定密依据" prop="secretGists" ref="secretGists">
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        v-model="fromdata.secretGists"
                        placeholder="填写定密依据可输入500字"
                        maxlength="500"
                        resize="none"
                        autosize
                        style="flex:1"
                        @blur="inputChange1"
                        @input="inputChange"
                        disabled
                      ></el-input>
                      <button
                        @click="secretGistsbox"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        disabled
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>

                <!-- <el-col>
                  <el-form-item label="签报依据" prop="sendBasis" ref="sendBasis">
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.sendBasis"
                        placeholder="请输入签报依据"
                        maxlength="500"
                        disabled
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>-->
                <el-col>
                  <el-form-item label="签报依据" prop="sendBasis" ref="sendBasis">
                    <el-col>
                      <el-button size="small" plain @click="handleImport" disabled>引入</el-button>
                    </el-col>
                  </el-form-item>
                  <el-form-item label v-if="showImportData">
                    <div class="border_yiju">
                      <el-row v-for="(item) in fromdata.sendBasis" :key="item.documentCode">
                        <el-col :span="20" class="btn_openImport">
                          <el-button
                            type="text"
                            @click="handleCheckImport(item)"
                            :class="(item.id=='')?'colorBlack':'colorLink'"
                          >{{item.documentCode}}</el-button>
                        </el-col>
                        <el-col :span="4" class="btn_delImport">
                          <el-button type="text" @click="handleDeleteImport(item)" disabled>删除</el-button>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15">
                  <el-form-item label="协办部门" prop="signDepartmentName" ref="signDepartmentName">
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        @input="inputChange"
                        v-model="fromdata.signDepartmentName"
                        readonly
                        placeholder="请选择协办部门"
                        style="flex:1;color: #F00;"
                        class="hqbm"
                      ></el-input>
                      <button
                        @click="bankmain('hui')"
                        v-if="!sendXbSuccess"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        :disabled="readFields.signDepartmentName || !readonlyQbcy"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                      <button
                        @click="bankmain('hui', '1')"
                        v-if="sendXbSuccess"
                        type="button"
                        class="el-button el-button--default dimi_btn1"
                        :disabled="readFields.signDepartmentName || !readonlyQbcy"
                      >增发</button>
                      <button
                        @click="takeBackSign('shouhui')"
                        v-if="sendXbSuccess"
                        type="button"
                        class="el-button el-button--default dimi_btn1"
                        :disabled="readFields.signDepartmentName || !readonlyQbcy"
                      >收回</button>
                      <button
                        @click="takeBackSign('cuiban')"
                        v-if="sendXbSuccess"
                        type="button"
                        class="el-button el-button--default dimi_btn1"
                        :disabled="readFields.signDepartmentName || !readonlyQbcy"
                      >催办</button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="8">
                  <el-form-item
                    label-width="0"
                    prop="finishSignDepartmentName"
                    ref="finishSignDepartmentName"
                  >
                    <el-input
                      v-model="fromdata.finishSignDepartmentName"
                      placeholder="已完成的协办部门"
                      type="textarea"
                      resize="none"
                      autosize
                      style="width: 100%;"
                      class="hqbm1"
                      @input="inputChange"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="附件名称" prop="attachTitle" ref="attachTitle">
                    <el-input
                      maxlength="500"
                      autosize
                      resize="none"
                      type="textarea"
                      v-model="fromdata.attachTitle"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col>
                  <el-form-item label="传阅人" prop="circulatePersonNames" ref="circulatePersonNames">
                    <div style="display:flex;">
                      <el-input
                        type="textarea"
                        v-model="fromdata.circulatePersonNames"
                        placeholder="请输入传阅人"
                        maxlength="500"
                        resize="none"
                        autosize
                        disabled
                      ></el-input>
                      <button
                        class="el-button el-button--default dimi_btn"
                        type="button"
                        @click="takeBackSignCY('shouhui','cy')"
                        v-if="fromdata.isHasCY == 1"
                        :disabled="readFields.circulatePersonNames"
                      >收回</button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-row class="pr45">
              <el-col>
                <el-form-item label="签批意见" prop="agreementOpinion" ref="agreementOpinion">
                  <!-- <div v-for="item in fromdata.agreementOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.agreementOpinion"
                      :disabled="editedIdeaFields.agreementOpinion"
                      v-if="!editedIdeaFields.agreementOpinion  || (editedIdeaFields.agreementOpinion && !(fromdata.agreementOpinionList && fromdata.agreementOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=1,fromdata.agreementOpinion&&fromdata.agreementOpinion.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.agreementOpinion"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText
                    :opinionText="fromdata.agreementOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="办理情况" prop="handleSituation" ref="handleSituation">
                  <!-- <div v-for="item in fromdata.handleSituationList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.handleSituation"
                      :disabled="editedIdeaFields.handleSituation"
                      v-if="!editedIdeaFields.handleSituation  || (editedIdeaFields.handleSituation && !(fromdata.handleSituationList && fromdata.handleSituationList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=2,fromdata.handleSituation&&fromdata.handleSituation.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.handleSituation"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText
                    :opinionText="fromdata.handleSituationList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="协办意见" prop="helpOpinion" ref="helpOpinion">
                  <!-- <div v-for="item in fromdata.helpOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.helpOpinion"
                      :disabled="editedIdeaFields.helpOpinion"
                      v-if="!editedIdeaFields.helpOpinion  || (editedIdeaFields.helpOpinion && !(fromdata.helpOpinionList && fromdata.helpOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=3,fromdata.helpOpinion&&fromdata.helpOpinion.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.helpOpinion"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText
                    :opinionText="fromdata.helpOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="请示单位意见" prop="consultOpinion" ref="consultOpinion">
                  <!-- <div v-for="item in fromdata.consultOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.consultOpinion"
                      :disabled="editedIdeaFields.consultOpinion"
                      v-if="!editedIdeaFields.consultOpinion  || (editedIdeaFields.consultOpinion && !(fromdata.consultOpinionList && fromdata.consultOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=4,fromdata.consultOpinion&&fromdata.consultOpinion.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.consultOpinion"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText
                    :opinionText="fromdata.consultOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="请示单位附件">
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    style="flex:1"
                    disabled
                    v-if="!(fromdata.consultAttachment&&fromdata.consultAttachment.length)"
                  ></el-input>

                  <div>
                    <el-row>
                      <el-col>
                        <div
                          class="file_list_box tree_zhuban"
                          v-if="fromdata.consultAttachment&&fromdata.consultAttachment.length"
                          style="height:auto;"
                        >
                          <el-scrollbar style="padding: 0px 15px 0 0;">
                            <div
                              v-for="(items,index) in fromdata.consultAttachment"
                              :key="items.id"
                              class="comp_list"
                            >
                              <template>
                                <div class="command_file">
                                  <span class="order">{{index+1}}.</span>
                                  <span
                                    class="down"
                                    :title="items.fileName"
                                    @click="viewDraftFile(items.fileName,items.filePath ,$businessCode.qbglfj)"
                                  >{{items.fileName}}</span>
                                  <span
                                    class="name"
                                    :title="items.createrName"
                                  >{{items.createrName}}</span>
                                  <span class="time">{{items.createTime}}</span>
                                  <div class="btns">
                                    <el-button
                                      type="primary"
                                      size="mini"
                                      @click.native="downFile(items)"
                                      round
                                    >下载</el-button>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </el-scrollbar>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="传阅意见" prop="circulation" ref="circulation">
                  <!-- <div v-for="(item) in fromdata.circulationList" :key="item.id">
                    <div  class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.circulation"
                      :disabled="editedIdeaFields.circulation"
                      v-if="!editedIdeaFields.circulation  || (editedIdeaFields.circulation && !(fromdata.circulationList && fromdata.circulationList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=5,fromdata.circulation&&fromdata.circulation.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.circulation"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText
                    :opinionText="fromdata.circulationList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="备    注" prop="remark" ref="remark">
                  <!-- <div v-for="(item) in fromdata.remarkList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <el-input
                    type="textarea"
                    maxlength="500"
                    resize="none"
                    autosize
                    v-model="fromdata.remark"
                    :disabled="editedIdeaFields.remark"
                    v-if="!editedIdeaFields.remark  || (editedIdeaFields.remark && !(fromdata.remarkList && fromdata.remarkList.length))"
                  ></el-input>
                  <opinionText
                    :opinionText="fromdata.remarkList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :isRemarks="true"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否将附件反馈给请示单位" label-width="200">
                  <el-radio v-model="fromdata.isReturnAttachment" label="1">是</el-radio>
                  <el-radio v-model="fromdata.isReturnAttachment" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 传阅信息 -->
            <template>
              <h6 class="bank_dispach_file_tit">传阅信息</h6>
              <div id="cyxx" class="height_90"></div>
              <el-row>
                <el-col>
                  <el-form-item label="传阅人员">
                    <el-col class="m10 pr45">
                      <el-form-item
                        label-width="80px"
                        label="未阅"
                        prop="readCirculatePerson"
                        ref="readCirculatePerson"
                      >
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          v-model="fromdata.readCirculatePerson"
                          :disabled="true"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="m10 pr45">
                      <el-form-item
                        label-width="80px"
                        label="已阅"
                        prop="endCirculatePerson"
                        ref="endCirculatePerson"
                      >
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          v-model="fromdata.endCirculatePerson"
                          :disabled="true"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>

            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <uploadFiles
                  ref="uploadComponent"
                  @preserve="preserve"
                  :uploadConfig="uploadConfig"
                ></uploadFiles>
                <el-col>
                  <div
                    class="file_list_box"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar style="padding: 0px 15px 0 0;">
                      <div
                        v-for="(item,index) in fromdata.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <span
                              class="down"
                              :title="item.fileName"
                              @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.qbglfj)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(item,'up')"
                                v-if="fromdata.attchmentFileInfo.length>1"
                                :disabled="index==0 || uploadConfig.subTempAddF"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(item,'down')"
                                v-if="fromdata.attchmentFileInfo.length>1"
                                :disabled="index==fromdata.attchmentFileInfo.length-1 || uploadConfig.subTempAddF"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id) "
                                :disabled="item.disabled || uploadConfig.subTempAddF"
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
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <el-dialog v-dialogDrag :title="dialogTuiWenTit" :visible.sync="tuiWendialog" width="50%">
      <p class="tui_wen_list">退回原因</p>
      <el-input
        type="textarea"
        resize="none"
        autosize
        v-model="tuiwenyuanyin"
        maxlength="500"
        placeholder="请输入退回原因"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tuiWendialog = false">取 消</el-button>
        <el-button type="primary" @click="sureTuiWen">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-dialogDrag :title="dialoghuiqianTit" :visible.sync="shdialog" width="50%">
      <el-card class="dialog_regain">
        <!-- <h6>选择要收回的协办部门</h6> -->
        <el-checkbox-group v-model="checkedsh" @change="checkouthuiqian">
          <el-checkbox
            v-for="(item,index) in shData"
            :label="item.deptName"
            :key="index"
            :disabled="(item.processState == '已处理' || item.processState == '处理中') && dialoghuiqianTit != '选择需要催办的协办部门'"
          >
            {{item.deptName}}
            <span>({{item.processState}})</span>
          </el-checkbox>
          <!-- <el-checkbox
            v-for="(item,index) in shData"
            :label="item.processInstId"
            :key="index"
            :disabled="item.processState != '未处理'"
          >{{item.deptName}}（{{item.processState}}）</el-checkbox>-->
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog = false">取 消</el-button>
        <el-button type="primary" @click="shQueding(typeofHQBM)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-dialogDrag :title="dialogBackPsTit" :visible.sync="BackPsdialog" width="30%">
      <span>请确认所有相关部门已完成签批!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="BackPsdialog = false">取 消</el-button>
        <el-button type="primary" @click="doAllSureHandle">确 定</el-button>
      </span>
    </el-dialog>

    <treeCofig
      ref="treeComponent"
      :defaultUser="defaultUser"
      :treeData="treeData"
      :canTab="canTab"
      :fixNoLoadingTree="fixNoLoadingTree"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :setradio="setradio"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :dialogTypeNow="dialogTypeNow"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      :fromdata="fromdata"
      :checkOrg="checkOrg"
      @showCompDialog="showCompDialog"
      :sequenceFlag="sequenceFlag"
      :treeTradeCode="treeTradeCode"
      :useNewDialog="useNewDialog"
      :isShowFhqbm="isShowFhqbm"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      :offenDevices="offenDevices"
      @deleteCommonUse="deleteCommonUse"
      @addCommonUse="addCommonUse"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <!-- <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls> -->

    <!--签报依据-->
    <el-dialog v-dialogDrag title="增加签报依据" class="dialogImport" :visible.sync="showImport">
      <el-row>
        <el-form label-width="130px">
          <el-form-item label="依据文件类型">
            <el-col>
              <el-select v-model="bankImport" style="width: 75%">
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="item in bankImportList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="文件字号">
            <el-col :span="18">
              <el-input v-model="documentCode" style="width: 100%;"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showImport = false">取消</el-button>
        <el-button type="primary" @click="handleImportSure">确定</el-button>
      </span>
    </el-dialog>
    <!--查看依据文件-->
    <el-dialog v-dialogDrag title="查看依据文件" :visible.sync="showImportList">
      <table style="width: 100%;">
        <tr>
          <td class="ckyjbt">文号 :</td>
          <td>{{bank_import.documentCode}}</td>
        </tr>
        <tr>
          <td class="ckyjbt">标题 :</td>
          <td>
            <el-button type="text" @click="viewFile(bank_import, '1')">{{bank_import.title}}</el-button>
          </td>
        </tr>
        <tr>
          <td class="ckyjbt">附件 :</td>
          <td>
            <el-row v-for="(item) in bank_import.attachList" :key="item.id">
              <el-col :span="18">
                <el-button type="text" @click="viewFile(item)">{{item.sort+'. '+item.fileName}}</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="text" @click="downFile(item)">下载</el-button>
              </el-col>
            </el-row>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showImportList = false">关 闭</el-button>
      </span>
    </el-dialog>

    <treeCofigForCy
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :checkIds="checkIds"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      :scircularizeLevel="scircularizeLevel"
      :fromdata="fromdata"
      @showCompDialog="showCompDialogForCy"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForCy>

    <!--传阅常用联系人修改 12.21-->
    <el-dialog v-dialogDrag title="操作" :visible.sync="shdialog2" width="50%">
      <el-card>
        <el-checkbox-group v-model="checkedsh" @change="getNewName">
          <el-checkbox
            v-for="(item,index) in shData"
            :label="item.id"
            :key="index"
          >{{item.currentUser}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog2 = false">取 消</el-button>
        <el-button type="primary" @click="shQuedingCY">确 定</el-button>
      </span>
    </el-dialog>

    <!--关闭-->
    <el-dialog v-dialogDrag title="关闭" :visible.sync="showCloseDialog">
      <el-row>
        <el-col
          style="text-aling:center;font-size:16px;line-height:60px;text-indent:2em;"
        >是否保存并退出当前页面?</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose('2')">否</el-button>
        <el-button type="primary" @click="handleClose('1')">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
// import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import minixs from "@/minixs/index";
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable"; // 收藏
import treeCofigForCy from "@/components/tree/tree-cy";
import opinionText from "@/components/opinionText/index";
import closeMessage from '@/components/closeMessage/index';
import viewDraft from "@/minixs/viewDraft";
import signquoteIndex from "@/minixs/signquoteIndex";
import isNowUser from "@/minixs/isNowUser";
import cyIsSend from "@/components/dialog/cyIsSend";
export default {
  name: "signquteWaitSph",
  components: {
    uploadFiles,
    timeDialog,
    treeCofig,
    // secretBasls,
    appendWriteList,
    cyIsSend,
    treeCofigForCy,
    opinionText,
    closeMessage
  },
  mixins: [minixs,viewDraft,signquoteIndex,isNowUser],
  data() {
    return {
      readonlyQbcy:true,
      cbxbShow: false, //222
      cyIsSendShow: false, //222
      closeHandler:false,
      showCloseDialog: false,
      nowUserId: "", //当前用户id
      useNewDialog:false,
      defaultUser:{},//完成并发送默认值
      createDocNo:false,//禁用多次操作
      directTitle: "中国建设银行",
      offenDevices: [], //常用批示意见

      scircularizeLevel:'1',//传阅常用联系人修改 12.21
      //常用批示意见
      bank_selectCommonUseList: {
        function: "selectCommonUseList",
        id: "",
        userId: "",
        userName: "",
        content: "",
        sort: "",
        createtime: ""
      },
      nowUserId: '', //当前用户id
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },
      sequenceFlag: false, //会签/协办是否按顺序发送部门置灰
      //全选备注2
      checkAll: false,
      isIndeterminate: true, //全选备注3

      //是否返回上一处理人
      handeldoBacksyclr: false,
      returnBeforeHuman: {
        function: "returnBeforeHuman",
        tplbsnid: "KHQB_SP"
      },

      // qianbaostate: "",
      //控制03
      huanJieMessage: {},
      //只读
      readFields: {
        title: false,
        submittedName: false,
        handleTypeName: false,
        emergencyLevelName: false,
        qianBaoTypeName: false,
        qianbaoCode: false,
        documentNo: false,
        draftTime: false,
        draftDepartmentName: false,
        draftUserName: false,
        phone: false,
        secretType: false,
        workSecretFlag: false,
        secretFlag: false,
        secretLimitType: false,
        security: false,
        secretLimitName: false,
        secretTimeType: false,
        secretLimit: false,
        sendBasis: false,
        signDepartmentName: false,
        finishSignDepartmentName: false,
        attachTitle: false,
        circulatePersonNames: false
      },
      requiredFields: {
        title: false,
        submittedName: false,
        handleTypeName: false,
        emergencyLevelName: false,
        qianBaoTypeName: false,
        qianbaoCode: false,
        documentNo: false,
        draftTime: false,
        draftDepartmentName: false,
        draftUserName: false,
        phone: false,
        secretType: false,
        workSecretFlag: false,
        secretFlag: false,
        secretLimitType: false,
        security: false,
        secretLimitName: false,
        secretTimeType: false,
        secretLimit: false,
        sendBasis: false,
        signDepartmentName: false,
        finishSignDepartmentName: false,
        attachTitle: false,
        circulatePersonNames: false
      }, //必填控制域
      editedIdeaFields: {
        agreementOpinion: true,
        handleSituation: true,
        helpOpinion: true,
        consultOpinion: true,
        circulation: true,
        remark: true
      }, //可编辑意见域
      requiredIdeaFields: {
        agreementOpinion: false,
        handleSituation: false,
        helpOpinion: false,
        consultOpinion: false,
        circulation: false,
        remark: false
      }, //必填意见域
      // 【关闭】【保存】【完成并发送】【返回上一处理人】【查看正文】【退回修改】【返回请示行】
      // 【传阅】【发协办部门】【查看协办状态】【查看退文单】【办结】【查看流程】【打印处理单】【收藏】【操作指南】
      buttonList: [
        { name: "保存", type: "btn_bc", show: false }, //一直都有
        { name: "完成并发送", type: "btn_wcbfs", show: false }, //一直都有
        { name: "返回上一处理人", type: "btn_fhsyclr", show: false }, //行领导批示
        { name: "查看正文", type: "btn_ckzw", show: false }, //一直都有        起草正文与查看正文不能同时出现
        { name: "退回修改", type: "btn_thxg", show: false }, //综合
        { name: "返回请示单位", type: "btn_fqsh", show: false }, //综合
        { name: "传阅", type: "btn_cy", show: false },
        { name: "发送协办部门", type: "btn_fxbbm", show: false }, //综合    协办有值
        // { name: "收回", type: "btn_sh", show: false },
        { name: "查看协办状态", type: "btn_ckxbzt", show: false }, //发协办后有
        { name: "查看退文单", type: "btn_cktwd", show: false },
        { name: "办结", type: "btn_banjie", show: false }, //综合环节有          批示意见无值的话进行校验 出提示
        // { name: "删除此文", type: "btn_sccw", show: false }, // 无
        { name: "查看流程", type: "btn_cklc", show: false }, //一直都有
        { name: "打印处理单", type: "btn_dycld", show: false }, //一直都有
        { name: "收藏", type: "btn_sc", show: false }, //一直都有
        { name: "操作指南", type: "btn_czzn", show: false } //一直都有
      ],

      //正文
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      //上下移动附件
      bank_upDownFile: {
        function: "changeAttachSort",
        fileId: "",
        sortType: ""
      },

      //查看协办状态
      getSubProcessInfoFuc: {
        function: "getSubProcessInfo",
        processInstId: "",
        tplbsnid: "KHQB_XB"
      },
      //查看协办状态
      ckhqzt: false,
      tableCols1: [
        {
          label: "发送时间",
          prop: "TMS",
          align: "center",
          formatter(row) {
            return (row.TMS = dateFormate.date(Date.parse(new Date(row.TMS))));
          }
        },
        { label: "部门", prop: "UNITNM", align: "center" },
        { label: "处理人", prop: "AVYEXCTRNM", align: "center" },
        { label: "状态", prop: "NODENAME", align: "center" },
        { label: "结束时间", prop: "ENDTM", align: "center" }
      ],
      tableData1: [],
      //收回
      sendTackVisible: false,
      sendTackFuc: {
        function: "doWithdrawTask",
        serviceInstans: "KHQB_SP"
        // QB_DZQB  电子签报,QB_SWQB  实物签报 ,QB_KHQBQS 跨行签报请示,KHQB_SP  跨行签报审批 ,QB_HQ  会签 ,KHQB_XB 协办
      },
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        subTempAddF: false, //是否可以上传附件 true是不能上传   false是可以上传
        noattachTitleCheck:true
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },

      //全部、待办、已办、办结
      signState: true,
      dialogBackPsTit: "返回请示单位",
      BackPsdialog: false,
      //提交最终意见
      doFinishShenpi: {
        function: "doFinishShenpi",
        id: ""
      },
      tuiwenyuanyin: "",
      dialogTuiWenTit: "退回",
      tuiWendialog: false,
      deleteToQianbaoEntityById: {
        function: "deleteToQianbaoEntityById",
        id: ""
      },
      doKHBackDownOrder: {
        function: "doKHBackDownOrder",
        backExplain: ""
      },
      //办结
      banjiedispatch: {
        function: "doFinishShenpi",
        multiTenancyID: "", // parm.getString("multiTenancyId");
        tplNo: "", // parm.getString("tplNo");
        pcsAvyId: "", // parm.getString("pcsAvyId");
        processInstId: "", // parm.getString("processInstId");
        moduleType: "qb_etc", // parm.getString("moduleType");
        curNodeCode: "",
        serviceInstans: "KHQB_SP"
      },
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: "",
        multiTenancyId:""
      },
      CnmultiTenancyId:"",
      //xiaoM  协办部门
      bank_mmainXiao: {
        function: "selUnitTreeByHQV2",
        flag: true,
        unitCodes:""
      },
      //秘密期限类型
      flag: false,
      // 秘密标志
      secretTypeFlag: false,
      // 工作秘密
      workSecurityFlag: false,
      // 密级和保密期限  保密期限  显示隐藏
      securityFlag: false,
      // 密级和保密期限  解密时间  显示隐藏
      businessSecretFlag: false,
      // 密级和保密期限  解密条件  显示隐藏
      securitytiaojFlag: false,
      // 定密依弹窗
      secretDialog: true,
      //确定完成并发送
      bank_toQianbaoKhShenpiSend: {
        function: "toQianbaoKhShenpiSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "", //人员id
        sequenceSign: "" // 是否按顺序发送
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      loadingTree: false,
      fixNoLoadingTree: false,
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "getQianbaoKhShenpiPoById",
        id: ""
        // id: "1"
      },
      //下拉框列表
      bank_dispachfile: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: "行发文"
      },
      //提交
      saveOrUpdateQianbaoKhShenpiPo: {
        function: "saveOrUpdateQianbaoKhShenpiPo",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "", //部门人员名字
        sequenceSign: ""
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      fromdata: {
        // function: "getQianbaoKhShenpiPoById",
        title: "",
        submittedName: "",
        handleType: "0",
        handleTypeName: "",
        emergencyLevelName: "",
        qianBaoTypeName: "",
        qianbaoCode: "",
        documentNo: "",
        draftTime: "",
        draftDepartmentName: "",
        draftUserName: "",
        sendBasis: "",
        signDepartmentName: "",
        finishSignDepartmentName:"",
        attachTitle: "",
        approvalOpinion: "",
        checkOpinion: "",
        signOpinion: "",
        draftDepartmentOpinion: "",
        remark: "",
        sizeFact: "",
        secretFlag: "",
        workSecretFlag: "",
        secretType: "",
        secretLimitType: "",
        security: "",
        secretLimitName: "",
        secretTimeType: "",
        secretLimit: "",
        currentUser: "",
        curNodeName: "",
        secretGists: "",
        knowScore: "",
        handleSituation: "",
        processInstId: "", //流程实例标识
        pTplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        attachSort: [],
        attchmentFileInfo: [],
        consultAttachment: [],
        circulatePersonNames: "", //传阅人
        isReturnAttachment: "1",
        sequenceSign: "0", //是否按顺序 默认不按顺序0
        secretBasls: [], //选中定密依据
        agreementOpinion:"",
        helpOpinion:"",
        consultOpinion:"",
        circulation:"",
        isReturnBefore:0,
      },
      //定密依据
      secretBaslsYJ: "",
      secretBaslsList: [],
      secretBaslsInput: "",
      secretBaslsInput1: "",
      secretBaslsInput2: "", //定密依据输入内容
      //定密依据
      selectSecretType: {
        function: "selectSecretType",
        secretType: ""
      },
      secretBaslsDialogVisible: false, // 定密依据弹窗
      SemergencyLevel: [],
      SqbZihaoList: [],
      SqianbaoType: [],
      SsecretType: [],
      SsecretFlag: [],
      SbusinessSecret: [],
      SworkSecurity: [],
      secretOptionsFlag: [],
      SsecretTimeType: [
        {
          label: "年"
        },
        {
          label: "月"
        },
        {
          label: "日"
        }
      ],
       //mimi
      rules: {
        secretGists: [
          {
            required: false,
            trigger: "blur",
            message: "请输入定密依据"
          }
        ],
        secretLimitType: [
          {
            required: false,
            trigger: "blur",
            message: "请输入秘密期限类型"
          }
        ],
        secretFlag: [
          {
            required: false,
            trigger: "blur",
            message: "请输入秘密标志"
          }
        ],
        workSecretFlag: [
          {
            required: false,
            trigger: "blur",
            message: "请输入秘密标志"
          }
        ],
        security: [
          {
            required: false,
            trigger: "blur",
            message: "请输入密级和保密期限"
          }
        ],
        secretLimitName: [
          {
            required: false,
            trigger: ['change','blur'],
            message: "请输入密级和保密期限"
          }
        ],
        secretTimeType: [
          {
            required: false,
            trigger: "blur",
            message: "请输入密级和保密期限"
          }
        ],
        secretLimit: [
          {
            required: false,
            trigger: "blur",
            message: "请输入密级和保密期限"
          }
        ]
      },
      copyRules: {
        // qianBaoTypeName: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择签报类型"
        //   }
        // ],
        // submittedName: [
        //   {
        //     required: true,
        //     trigger: ["blur"],
        //     message: "请输入呈送"
        //   }
        // ],
        // qianbaoCode: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择签报字号"
        //   }
        // ],
        // handleTypeName: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择处理类型"
        //   }
        // ],
        // draftDepartmentName: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择拟稿部门"
        //   }
        // ],
        // draftUserName: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择联系人"
        //   }
        // ],
        // secretType: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择秘密类型"
        //   }
        // ],
        // workSecretFlag: [
        //   { required: false, trigger: "change", message: "请选择秘密标志" }
        // ],
        // secretFlag: [
        //   { required: false, trigger: "change", message: "请选择秘密标志" }
        // ],
        // secretLimitType: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择秘密期限类型"
        //   }
        // ],
        // security: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择密级和保密期限"
        //   }
        // ],
        // phone: [{ required: true, trigger: "blur", message: "请输入联系电话" }],
        // title: [{ required: true, trigger: "blur", message: "请输入正文标题" }]
      },
      SsecretLimit:[],//秘密
      SSsecretLimitType: [],
      imageUrl: "",
      fileList: [],
      tableData: [],
      timeShow: false, //查看流程
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      benCheckData: [], //本行选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      dialogTypeNow: "",
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      checkOrg: false, //传阅多选
      // showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      setradio: "0", //默认为 是 按照顺序
      isShowFhqbm:true,//控制会签弹窗点击确定后，出现发协办部门按钮
      dialogVisible: false, // 定密依据
      baoWenZiDuan: "A08461305",
      fwTranHuiId: "A08461303",
      appendWriteDialog: true,
      clickTypes: 1,
      //发协办部门
      sendUpHang: {
        function: "sendUpHang",
        deptIds: "",
        deptNames: "",
        sendUnitOrDept: "dept", //发上级行: KHQB_SP   协办KHQB_XB   会签KHQB_XB
        serviceInstans: "KHQB_XB",
        avyds: "发送协办部门"
      },
      // 协办部门增发,
      sendXbSuccess: false,
      addSendType: "",
      showHQ: false,
      shdialog: false, // 收回弹窗
      shData: [], // 收回数据
      checkedsh: [], // 收回列表
      checkeddq: [], // 读取的值
      // ggqbgl: this.$businessCode.qbglfj, // 收回交易线
      typeofHQBM: "",
      dialoghuiqianTit: "收回",

      //已读未读
      readFlag: "",
      isProcessInstId: "",
      isMultiTenancyId: "",
      isSignFinish: false, //判断是否能够继续完成并发送
      qicaozw: false,
      chulizw: false,
      chakanzw: false,
      hechengzw: false,
      qinggaoFlag: false,
      tuihaoFlag: false, //退号按钮的显示隐藏
      shengchengFlag: false,
      signStateFlag: false, //会签状态
      isSendUpHang: false,
      fhqingshiFlag: false, //返回请示行
      thxgFlag: true, //退回修改
      banjie: false, // 办结按钮

      //拟稿部门意见
      nigaobumenFlag: false,
      // 签报依据
      showImport: false,
      showImportData: false,
      showImportList: false,
      bankImport: "",
      bankImportList: [
        {
          label: "发文",
          value: "CN000"
        },
        {
          label: "收文",
          value: "CN001"
        },
        {
          label: "签报",
          value: "CN002"
        },
        {
          label: "便函",
          value: "4"
        }
      ],
      documentCode: "〔〕号",
      importDataArr: [],
      bank_import: {},

      //传阅
      doUpdateSuredialog: false,
      shdialog1: false, //收回弹窗
      shdialog2:false, //传阅常用联系人
      treeTradeCode: "", //完成并发送  树  拆

      //传阅
      dialogTypeForCy:'',
      dialogTypeNowForCy:'',
      dialogTitForCy:'',
      loadingTreeForCy:'',
      singelCheckFForCy:'',
      dialogStateForCy:false,
      seletOptionsDataForCy:[],
      treeTradeCode:"",
      cyper:'',
      cyid:'',

      //返回请示行二次确认框
      handeldoAllSure:false,
      cktwdFlag:false,
      beforeBackTableId:""
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

         //传阅人员
    showCompDialogForCy(data, status, type, params, dtype){
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        
        let newIds = [];
        let oldIds = [];
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
          this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
              names.push(item.name || item.text);
              ids.push(item.id);
              that.checkIds.push(item.id);
          });
           if (this.addSendType == '1') {
            oldIds = this.fromdata.circulatePersonIds.split(";")
            oldNames = this.fromdata.circulatePersonNames.split(";")
            // newIds = ids.filter((item)=>{
            //   return oldIds.indexOf(item)==-1;
            // })
            // newNames = names.filter((item)=>{
            //   return oldNames.indexOf(item)==-1;
            // })
            ids.filter((item,i)=>{
              if(oldIds.indexOf(item)==-1){
                newNames.push(names[i])
                newIds.push(ids[i])
              }
            })
          }

          names = names.join(";");
          this.transIds = ids = ids.join(";");
          newIds = newIds.join(";");
          newNames = newNames.join(";");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        switch (dtype) {
          case "cy":
            this.fromdata.circulatePersonNames = names;
            this.fromdata.circulatePersonIds = ids;
            this.cyCheckData = this.checkData;
            break;
          case "zengfa":
            this.fromdata.circulatePersonNames = names;
            this.fromdata.circulatePersonIds = ids;
            this.cyCheckData = this.checkData;
            break;
        }
        if (this.addSendType == '1') {
            this.sendCy(newIds, newNames);
        }
        if(this.addSendType != '1' && dtype == "cy"){
          this.sendCy();
        }
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
     //请求传阅部门树数据
    getTreeDataForCy(n,m) {
      if(this.fromdata.secretType!=''&&this.fromdata.secretType != "请选择"){
        this.cyIsSendShow=true
        // 222
        this.$nextTick(() => {
          this.$refs.dialogLineCY.openDialog();
        });
        return
      }
      if(n=="cy"){
        this.isCY=true
        this.dialogTypeForCy = "dosend";
      }
      let name = "";
      this.addSendType = m;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      if(n=='cy'&&m=='1'){
        this.dialogTypeNowForCy='zengfa'
      }
      switch (n) {
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      this.showCompDialogForCy();
      if(m==1){
        this.dialogTypeNowForCy = "zengfa";
      }
      // this.$post
      // .postData(
      //   "selectUserByUnitTreeCY",
      //   JSON.stringify({
      //       function: "selectUserByUnitTreeCY",
      //       unitCode: "",
      //       flag: true
      //     }),
      //   this.$businessCode.ggqbgl
      // )
      // .then(res => {
      //   if (res.message == "Loading") {
      //     this.loadingTreeForCy = true;
      //   } else {
      //     this.loadingTreeForCy = false;
      //   }
      //   that.treeData = (res && res.data) || [];
      //   that.treeData[0].disabled = true;
      // });
      this.$post
      .postData(
        "selectUserByCirculate",//传阅常用联系人修改 12.21
        JSON.stringify({
            function: "selectUserByCirculate",//传阅常用联系人修改 12.21
            level: this.scircularizeLevel,//传阅常用联系人修改 12.21
            flag: true
          }),
        this.$businessCode.ggqbgl
      )
      .then(res => {
        if (res.message == "Loading") {
          this.loadingTreeForCy = true;
        } else {
          this.loadingTreeForCy = false;
        }
        that.treeData = (res && res.data) || [];
        that.treeData[0].disabled = true;
      });
    },
    //回显传阅人员
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
            this.checkIds = this.fromdata.circulatePersonIds
            ? this.fromdata.circulatePersonIds.split(";")
            : [];
            if (this.cyCheckData.length) {
              newA = [].concat(this.cyCheckData);
              newA.map(item => {
                //选中的不可操作
                item.disabled = true;
              });
            }
            this.checkData = this.cyCheckData;
            
            break;
        case "zengfa":
            this.checkIds = this.fromdata.circulatePersonIds
            ? this.fromdata.circulatePersonIds.split(";")
            : [];
            if (this.cyCheckData.length) {
              newA = [].concat(this.cyCheckData);
              newA.map(item => {
                //选中的不可操作
                item.disabled = true;
              });
            }
            this.checkData = this.cyCheckData;
            break;
      }
    },

    
    //电话操作
    phoneChange() {
      this.fromdata.phone = this.fromdata.phone.replace(/[^\-\,\d\*\ ]/g, "");
      this.$forceUpdate();
    },

    // 附件名称保存
    // attachTitleHandel() {
    //   if (this.fromdata.attachTitle) {
    //     this.preserve(null,true);
    //   }
    // },

    //返回上一处理人  弹窗
    handelBacksyclrBtn() {
      this.handeldoBacksyclr = true;
    },
    //返回上一处理人
    doBacksyclrHandle() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.handleSituationList;
      var obj = Object.assign(this.returnBeforeHuman, parseList);
      obj.function = "returnBeforeHuman";
      this.$post
        .postData(
          "returnBeforeHuman",
          JSON.stringify(this.returnBeforeHuman),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$refs.treeComponent.saveSetDialog();//返回上一处理人微信消息提醒
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                // window.opener.location.reload();
                // this.handleSetLoacl();
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                  this.handleSetLoacl();
                }
                window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 2000
          });
        });

      this.handeldoBacksyclr = false;
    },

    buttonClick(params) {
      switch (params) {
        //保存
        case "btn_bc":
          this.preserve("save");
          break;
        // 办结
        case "btn_banjie":
          this.concludematter();
          break;
        // 完成并发送
        case "btn_wcbfs":
          // this.judgeSend();
          // this.completeSending()
          this.completeSendingIsTrue();
          break;
        // 发协办部门
        case "btn_fxbbm":
          this.handleSendHQPtmt();
          break;
        // 返回请示行
        case "btn_fqsh":
          this.backPingShi();
          break;
        //返回上一处理人
        case "btn_fhsyclr":
          this.handelBacksyclrBtn();
          break;
        // 查看协办状态
        case "btn_ckxbzt":
          this.handleHuiqianState();
          break;
        // 收回
        case "btn_sh":
          this.sendTackBtn();
          break;
        // 退回修改
        case "btn_thxg":
          this.signBack();
          break;
        //传阅
        // case "btn_cy":
        //   if (this.fromdata.isHasCY == 1) {
        //     this.bankmain("cy", 1);
        //   } else {
        //     this.bankmain("cy");
        //   }
        //   break;
        
        // 查看退文单
        case "btn_cktwd":
        this.lookTack();
        break;

        case "btn_cy":
          if (this.fromdata.isHasCY == 1) {
            this.getTreeDataForCy("cy", 1);
          } else {
            this.getTreeDataForCy("cy");
          }
          break;

        //查看正文
        case "btn_ckzw":
          this.drafting("0");
          break;
        // 删除此文
        case "btn_sccw":
          this.delectArticle();
          break;
        // 收藏
        case "btn_sc":
          // this.shoucang();
          this.collect("qianbao_shenpi",this.fromdata.id,this.fromdata.multiTenancyId);
          break;
        // 查看流程
        case "btn_cklc":
          this.flowScheme();
          break;
        // 打印处理单
        case "btn_dycld":
          this.processSheet();
          break;
        // 操作指南
        case "btn_czzn":
          this.instructions();
          break;
      }
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ); //必填控制
      if(this.$route.query.readonlyQbcy == "qbcy"){//文件查阅
           this.readFields ={
            title: true,
            submittedName: true,
            handleTypeName: true,
            emergencyLevelName: true,
            qianBaoTypeName: true,
            qianbaoCode: true,
            documentNo: true,
            draftTime: true,
            draftDepartmentName: true,
            draftUserName: true,
            phone: true,
            secretType: true,
            workSecretFlag: true,
            secretFlag: true,
            secretLimitType: true,
            security: true,
            secretLimitName: true,
            secretTimeType: true,
            secretLimit: true,
            sendBasis: true,
            signDepartmentName: true,
            finishSignDepartmentName: true,
            attachTitle: true,
            circulatePersonNames: true
          }
          this.editedIdeaFields =  {
            agreementOpinion: true,
            handleSituation: true,
            helpOpinion: true,
            consultOpinion: true,
            circulation: true,
            remark: true
          }
          this.buttonList= [
            { name: "查看正文", type: "btn_ckzw", show: true }, //一直都有        起草正文与查看正文不能同时出现
            { name: "查看流程", type: "btn_cklc", show: true }, //一直都有
            { name: "打印处理单", type: "btn_dycld", show: true }, //一直都有
            { name: "收藏", type: "btn_sc", show: true }, //一直都有
          ];
          this.uploadConfig.subTempAddF = true;
      }else{
        this.readFields = this.setReadFields(
          this.readFields,
          this.huanJieMessage.readFields
        ); //不可编辑控制域
        this.editedIdeaFields = this.setEditedIdeaFields(
          this.editedIdeaFields,
          this.huanJieMessage.editedIdeaFields,
          this.huanJieMessage.editedIdeaFieldsBycondition
        ); //可编辑意见域
        this.buttonList = this.showButton(
          this.buttonList,
          this.huanJieMessage.visibleButtons,
          this.huanJieMessage.visibleButtonsBycondition
        ); //按钮
      }
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //可编辑意见域
      // if (JSON.parse(localStorage.getItem('userInfo')).humanName === this.formdata.draftUser && this.$route.query.id) {//当前处理人为拟稿人 删除按钮
      //     this.buttonList[this.buttonList.length - 1].show = true
      // }
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          title: [
            {
              required: this.requiredFields.title,
              trigger: "change",
              message: "请输入正文标题"
            }
          ],
          submittedName: [
            {
              required: this.requiredFields.submittedName,
              trigger: "change",
              message: "请输入呈送"
            }
          ],
          handleTypeName: [
            {
              required: this.requiredFields.handleTypeName,
              trigger: "change",
              message: "请选择处理类型"
            }
          ],
          emergencyLevelName: [
            {
              required: this.requiredFields.emergencyLevelName,
              trigger: "change",
              message: "请选择紧急程度"
            }
          ],
          qianBaoTypeName: [
            {
              required: this.requiredFields.qianBaoTypeName,
              trigger: "change",
              message: "请输入签报类型"
            }
          ],
          qianbaoCode: [
            {
              required: this.requiredFields.qianbaoCode,
              trigger: "change",
              message: "请选择签报字号"
            }
          ],
          draftTime: [
            {
              required: this.requiredFields.draftTime,
              trigger: "change",
              message: "请输入拟稿日期"
            }
          ],
          draftDepartmentName: [
            {
              required: this.requiredFields.draftDepartmentName,
              trigger: "change",
              message: "请输入拟稿单位"
            }
          ],
          draftUserName: [
            {
              required: this.requiredFields.draftUserName,
              trigger: "change",
              message: "请输入联系人"
            }
          ],
          phone: [
            {
              required: this.requiredFields.phone,
              trigger: "change",
              message: "请输入联系电话"
            }
          ],
          secretType: [
            {
              required: this.requiredFields.secretType,
              trigger: "change",
              message: "请选择秘密类型"
            }
          ],
          workSecretFlag: [
            {
              required: this.requiredFields.workSecretFlag,
              trigger: "change",
              message: "请选择秘密标志"
            }
          ],
          secretFlag: [
            {
              required: this.requiredFields.secretFlag,
              trigger: "change",
              message: "请选择秘密标志"
            }
          ],
          secretLimitType: [
            {
              required: this.requiredFields.secretLimitType,
              trigger: "change",
              message: "请选择秘密期限类型"
            }
          ],
          security: [
            {
              required: this.requiredFields.security,
              trigger: "blur",
              message: "请选择密级和保密期限"
            }
          ],
          secretLimitName: [
            {
              required: this.requiredFields.secretLimitName,
              trigger:  ['change','blur'],
              message: "请选择"
            }
          ],
          secretTimeType: [
            {
              required: this.requiredFields.secretTimeType,
              trigger: "blur",
              message: "请选择"
            }
          ],
          secretLimit: [
            {
              required: this.requiredFields.secretLimit,
              trigger: "change",
              message: "请选择"
            }
          ],
          sendBasis: [
            {
              required: this.requiredFields.sendBasis,
              trigger: "change",
              message: "请输入签报依据"
            }
          ],
          signDepartmentName: [
            {
              required: this.requiredFields.signDepartmentName,
              trigger: "change",
              message: "请选择协办部门"
            }
          ],
          finishSignDepartmentName: [
            {
              required: this.requiredFields.finishSignDepartmentName,
              trigger: "change",
              message: "请输入已完成的协办部门"
            }
          ],
          attachTitle: [
            {
              required: this.requiredFields.attachTitle,
              trigger: "change",
              message: "请输入附件名称"
            }
          ],
          circulatePersonNames: [
            {
              required: this.requiredFields.circulatePersonNames,
              trigger: "change",
              message: "请选择传阅人员"
            }
          ],
          agreementOpinion: [
            {
              required: this.requiredIdeaFields.agreementOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          handleSituation: [
            {
              required: this.requiredIdeaFields.handleSituation,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          helpOpinion: [
            {
              required: this.requiredIdeaFields.helpOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          consultOpinion: [
            {
              required: this.requiredIdeaFields.consultOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          circulation: [
            {
              required: this.requiredIdeaFields.circulation,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          remark: [
            {
              required: this.requiredIdeaFields.remark,
              message: "不能为空",
              trigger: "blur"
            }
          ],
           secretGists: [
            {
              required: this.requiredIdeaFields.secretGists,
              message: "不能为空",
              trigger: "blur"
            }
          ]
        };

        //mimi
        if (this.fromdata.secretType) {
          this.rules.secretGists[0].required = true;
          this.$forceUpdate();
        } else {
          this.rules.secretGists[0].required = false;
          this.$refs.fromdata.clearValidate();
          this.$forceUpdate();
        }
        this.rules.workSecretFlag[0].required = false;
        this.rules.secretLimitType[0].required = false;
        this.rules.secretFlag[0].required = false;
        if (this.fromdata.secretType == "商业秘密") {
          this.rules.secretLimitType[0].required = true;
        } else if (this.fromdata.secretType == "内部信息") {
          this.rules.secretFlag[0].required = true;
        } else if (this.fromdata.secretType == "工作秘密") {
          this.rules.workSecretFlag[0].required = true;
        }else{
          this.rules.workSecretFlag[0].required = false;
        this.rules.secretLimitType[0].required = false;
        this.rules.secretFlag[0].required = false;
        }


        this.rules.security[0].required = false;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = false;
        this.rules.secretLimit[0].required = false;
        if (this.fromdata.secretLimitType == "保密期限") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = true;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
      } else if (this.fromdata.secretLimitType == "解密时间") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = false;
        // 选择解密时间
        this.rules.secretLimit[0].required = true;
      } else if (this.fromdata.secretLimitType == "解密条件") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
      } else{
        this.rules.security[0].required = false;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = false;
        this.rules.secretLimit[0].required = false;
      }

      });
      this.$forceUpdate();
    },

    //查看会签状态
    handleHuiqianState() {
      this.ckhqzt = true;
      this.getSubProcessInfoFuc.processInstId = this.fromdata.processInstId;
      this.$post
        .postData(
          "getSubProcessInfo",
          JSON.stringify(this.getSubProcessInfoFuc),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.tableData1 = res.data;
        });
    },
    //收回
    sendTackBtn() {
      this.sendTackVisible = true;
    },
    //收回弹窗确定操作
    sendTackHandle() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.handleSituationList;
      delete parseList.agreementOpinionList;
      delete parseList.consultOpinionList;
      delete parseList.helpOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.consultAttachment;
      var obj = Object.assign(this.sendTackFuc, parseList);
      obj.function = "doWithdrawTask";
      this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                this.handleSetLoacl();window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "收回失败",
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "收回失败",
            duration: 2000
          });
        });
      this.sendTackVisible = false;
    },
    //返回请示行弹窗弹出
    // backQingShi() {
    //   console.log(this.fromdata.agreementOpinionList , this.fromdata.handleSituationList,!this.fromdata.agreementOpinionList ||
    //     !this.fromdata.handleSituationList)

    //   // this.BackPsdialog = true;
    // },
    //返回请示行
    backPingShi() {

//       点击【返回请示行】按钮，校验“签批意见”是否为空，如果为空，点击按钮时，弹出提示“请填写签批意见！”；
// 如果不为空弹出提示“请确认所有相关部门已完成签批！”点击【确定】，关掉页面，将公文返回给请示行，点击【取消】回到表单页面。
      if (!this.isSignFinish || this.fromdata.signDepartmentName) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请完成该协办部门！",
          duration: 2000
        });
        return;
      }else if (
        !(
          this.fromdata.agreementOpinionList && this.fromdata.agreementOpinionList.length ||
            this.fromdata.agreementOpinion
        )
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请填写签批意见！",
          duration: 2000
        });
        return;
      }else{
        this.BackPsdialog = true;
      }
    },

    doAllSureHandle(){
      this.doFinishShenpi.serviceInstans = "KHQB_SP";
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.handleSituationList;
      delete parseList.agreementOpinionList;
      delete parseList.consultOpinionList;
      delete parseList.helpOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.consultAttachment;
      var obj = Object.assign(this.doFinishShenpi, parseList);
      obj.function = "doFinishShenpi";
      this.$post
        .postData(
          "doFinishShenpi",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "操作成功",
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                this.handleSetLoacl();window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "操作失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "操作失败",
            duration: 2000
          });
        });
      this.BackPsdialog = false;
    },
    //查看退文单
    lookTack(){
      const routeData = this.$router.resolve({
        path: "/tuiwenkhDispatch",
        query: {
          id: this.beforeBackTableId,
          khState:"2"   //审批行
        }
      });
      window.open(routeData.href, "_blank");
    },
    //退回
    signBack() {
      this.tuiWendialog = true;
    },
    //退文
    sureTuiWen() {
      if (!this.tuiwenyuanyin || !this.tuiwenyuanyin.trim()) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入退文原因",
          duration: 2000
        });
      } else {
        this.doKHBackDownOrder.backExplain = this.tuiwenyuanyin;
        let parseList = JSON.parse(JSON.stringify(this.fromdata));
        delete parseList.handleSituationList;
        delete parseList.agreementOpinionList;
        delete parseList.consultOpinionList;
        delete parseList.helpOpinionList;
        delete parseList.circulationList;
        delete parseList.remarkList;
        delete parseList.consultAttachment;
        var obj = Object.assign(this.doKHBackDownOrder, parseList);
      obj.function = "doKHBackDownOrder";
        this.$post
          .postData(
            "doKHBackDownOrder",
            JSON.stringify(obj),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "退回成功",
                duration: 1000,
                onClose: () => {
                  window.location.href = "about:blank";
                  if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
                  this.handleSetLoacl();window.close();
                }
              });
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: "退回失败",
                duration: 2000
              });
            }

            this.tuiWendialog = false;
          })
          .catch(err => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "退回失败",
              duration: 2000
            });
          });
        this.tuiWendialog = false;
      }
    },
    //办结
    concludematter() {
      if (!(this.fromdata.agreementOpinionList&&this.fromdata.agreementOpinionList.length)) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入签批意见",
          duration: 2000
        });
        return;
      }
      if (!this.isSignFinish) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请完成该协办部门",
          duration: 2000
        });
        return;
      }
      // this.preserve();                                                                                                                                                                          

      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.handleSituationList;
      delete parseList.agreementOpinionList;
      delete parseList.consultOpinionList;
      delete parseList.helpOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.consultAttachment;
      var obj = Object.assign(this.banjiedispatch, parseList);
      obj.function = "doFinishShenpi";
      this.$post
        .postData(
          "doFinishShenpi",
          JSON.stringify(obj),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "办结成功",
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
                this.handleSetLoacl();window.close();
              }
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "办结失败",
            duration: 2000
          });
        });
    },
    
    //协办部门弹框
    bankmain(n, state) {
      let name = "";
      this.checkOrg = false;
      this.useNewDialog = false;
      this.sequenceFlag = false; //会签/协办是否按顺序发送部门置灰
      if (n == "cy") {
        if (state != 1) {
          this.cyCheckData = [];
        }
        //传阅步骤   ISCY不需要
        this.isCY = true;
        this.dialogType = "dosend";
      } else {
        this.isCY = false;
        this.dialogType = "hui";
      }
      switch (n) {
        case "zhusong":
          name = "主送";
          break;
        case "chao":
          name = "抄送";
          break;
        case "hui":
          this.useNewDialog = true;
          name = "协办";
          break;
        case "ben":
          name = "本行发送";
          break;
        case "dosend":
          name = "完成并发送";
          break;
        case "gonggao":
          this.dialogTypeNow = "gonggao";
          name = "公告至";
        case "cy":
          this.checkOrg = true;
          name = "选择传阅人";
          break;
      }
      this.dialogTit = name;
      this.canTab = true;
      // this.dialogTit = "选择协办部门";
      this.treeData = [];
      this.dialogType = n;
      this.loadingTree = false;
      this.fixNoLoadingTree = true;
      if (n === "hui") {
        this.hasRadio = false;
        this.canTab = false;
        this.singelCheckF = false;
        this.dialogTypeNow = "hui";
      } else if (n === "cy") {
        this.canTab = false;
        this.singelCheckF = false;
      }
      this.addSendType = state;
      if (this.addSendType == 1) {
        this.dialogTypeNow = "zengfa";
        this.sequenceFlag = true;
      }
      this.showCompDialog();
      if (n === "hui") {
        // this.bank_mmainXiao.unitCodes = this.fromdata.deptId;
        this.$post
          .postData(
            "selUnitTreeByHQV2",
            JSON.stringify(this.bank_mmainXiao),
            this.$businessCode.ggqbgl
          )
          .then(res => {
            if (res.message == "Loading") {
                this.loadingTree = true;
              } else {
                this.loadingTree = false;
              }
            this.treeData = (res && res.data) || [];
          });
        // this.$post
        //   .postData(
        //     "selUnitTreeByHQ",
        //     JSON.stringify(this.bank_mmainXiao),
        //     this.$businessCode.ggqbgl
        //   )
        //   .then(res => {
        //     this.treeData = (res && res.data) || [];
        //   });
      } else if (n == "cy") {
        this.$post
      .postData(
        "selectUserByCirculate",//传阅常用联系人修改 12.21
        JSON.stringify({
            function: "selectUserByCirculate",//传阅常用联系人修改 12.21
            level: this.scircularizeLevel,//传阅常用联系人修改 12.21
            flag: true
          }),
        this.$businessCode.ggqbgl
      )
      .then(res => {
        if (res.message == "Loading") {
          this.loadingTreeForCy = true;
        } else {
          this.loadingTreeForCy = false;
        }
        that.treeData = (res && res.data) || [];
        that.treeData[0].disabled = true;
      });
        // this.$post
        //   .postData(
        //     "selectUserByUnitTreeCY",
        //     JSON.stringify({
        //       function: "selectUserByUnitTreeCY",
        //       unitCode: "",
        //       flag: true
        //     }),
        //     this.$businessCode.ggqbgl
        //   )
        //   .then(res => {
        //     this.loadingTree = false;
        //     this.treeData = (res && res.data) || [];
        //   });
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype, radio, isShowFhqbm) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });

          if (this.addSendType == "1") {
            // oldIds = this.fromdata.signDepartmentId.split(";");
            // oldNames = this.fromdata.signDepartmentName.split(";");

            if (type == "cy") {
              oldIds = this.fromdata.circulatePersonIds.split(";");
              oldNames = this.fromdata.circulatePersonNames.split(";");
            } else {
              oldIds = this.fromdata.signDepartmentId.split(";");
              oldNames = this.fromdata.signDepartmentName.split(";");
            }

            newIds = ids.filter(item => {
              return oldIds.indexOf(item) == -1;
            });
            newNames = names.filter(item => {
              return oldNames.indexOf(item) == -1;
            });
          }

          names = names.join(";");
          ids = ids.join(";");

          newIds = newIds.join(";");
          newNames = newNames.join(";");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }

        switch (type) {
          case "hui":
            this.fromdata.signDepartmentName = names;
            this.fromdata.signDepartmentId = ids;
            this.huiCheckData = ids.length ? this.checkData : [];
            this.sendUpHang.deptIds = ids;
            this.sendUpHang.deptNames = names;
            this.sendUpHang.sequenceSign = radio;
            this.saveOrUpdateQianbaoKhShenpiPo.sequenceSign = radio;
            this.saveOrUpdateQianbaoKhShenpiPo.sequenceSign = this.setradio = this.fromdata.sequenceSign = radio;
            if (!ids.length) {
              this.checkIds = [];
            }
            if (dtype != "zengfa") {
              this.preserve();
              // this.showHQ =true;
            }
            break;

          case "xie":
            this.fromdata.assistDeptName = names;
            this.fromdata.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
          case "cy":
            this.fromdata.circulatePersonNames = names;
            this.fromdata.circulatePersonIds = ids;
            this.cyCheckData = this.checkData;
            break;
        }

        //传阅步骤
        if (
          (this.addSendType != "1" && type == "cy") ||
          (dtype == "zengfa" && type == "cy")
        ) {
          if (dtype == "zengfa") {
            this.sendCy(newIds, newNames);
          } else {
            this.sendCy();
          }
        }

        //判断是否增发
        if (this.addSendType === "1" && type == "hui") {
          this.handleSendHQPtmt(newIds, newNames);
        }

        //下一环节处理人信息
        if (dtype === "toQianbaoKhShenpiSend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogState = !this.dialogState;
      if (
        !this.dialogState &&
        dtype == "toQianbaoKhShenpiSend" &&
        this.dialogTypeBack
      ) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
      //综合环节、还有必须的生成文号、主表单会签部门的输入框还不能为空 同时成立才能显示发送协办部门按钮  不是增发
      if(isShowFhqbm &&  (this.fromdata.curNodeName =="综合处理" || this.fromdata.curNodeName == "登记" ) && this.fromdata.signDepartmentName && !this.sendXbSuccess){
        for (var i = 1; i <= this.buttonList.length ;i++) {
          if (this.buttonList[i].name == '发送协办部门') {
            this.buttonList[i].show = true;
            break;
          }
        }
      }else if(isShowFhqbm &&  (this.fromdata.curNodeName =="综合处理" || this.fromdata.curNodeName == "登记" )  && !this.fromdata.signDepartmentName && !this.sendXbSuccess){
        for (var i = 1; i <= this.buttonList.length ;i++) {
          if (this.buttonList[i].name == '发送协办部门') {
            this.buttonList[i].show = false;
            break;
          }
        }
      }
    },

    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(";");
      names = name.split(";");
      ids.map((item, n) => {
        if (item) {
          obj.push({
            id: item,
            name: names[n]
          });
        }
      });
      return obj;
    },

    //定密依据弹窗数值
    // secretGistsbox() {
    //   this.secretBaslsDialogVisible = true;
    //   this.selectSecretType.secretType = this.fromdata.secretType;
    //   this.$post
    //     .postData(
    //       "selectSecretType",
    //       JSON.stringify(this.selectSecretType),
    //       this.$businessCode.qbgl
    //     )
    //     .then(res => {
    //       this.secretBaslsList = res.data || [];
    //       this.secretBaslsList = this.secretBaslsList.map((item, n) => {
    //         var obj = {
    //           label: item.label.split("(xx)")
    //         };
    //         obj.label.map((node, m) => {
    //           obj.subkey = n + "" + m;
    //         });
    //         obj.subval = "";
    //         return obj;
    //       });
    //       this.$forceUpdate();
    //     });
    // },
    // //定密依据输入框值获取  并且确定
    // savesecretBasls() {
    //   var str = "";
    //   var pstr = true;

    //   //填值
    //   if (this.secretBaslsYJ !== "") {
    //     this.secretBaslsList.map((item, n) => {
    //       if (n == this.secretBaslsYJ) {
    //         console.log(item.label);
    //         item.label.map((node, m) => {
    //           if (m < item.label.length - 1) {
    //             str += node + $("#" + n + m).val();
    //             if (!$("#" + n + m).val()) {
    //               pstr = false;
    //               return;
    //             }
    //             console.log(str);
    //           } else {
    //             str += node;
    //           }
    //         });
    //       }
    //     });
    //   }

    //   if (!pstr && this.secretBaslsYJ !== "") {
    //     this.$message({
    //       type: "error",
    //       offset: 400,
    //       showClose: true,
    //       message: "请选择或输入该选项的定密依据内容",
    //       duration: 2000
    //     });
    //     return;
    //   }
    //   this.secretBaslsDialogVisible = false;
    //   this.fromdata.secretGists = str;
    //   this.preserve();
    // },
    //定密依据input框值获取
    inputChange1() {
      this.preserve(null,true);
      this.$forceUpdate();
    },

    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "zhusong":
          this.checkIds = this.fromdata.mainIds
            ? this.fromdata.mainIds.split(";")
            : [];
          this.checkData = this.zhuCheckData;
          break;
        case "chao":
          this.checkIds = this.fromdata.copyIds
            ? this.fromdata.copyIds.split(";")
            : [];
          this.checkData = this.chaoCheckData;
          break;
        case "hui":
          this.dialogTypeNow = "zengfa";
          this.checkIds = this.fromdata.signDepartmentId
            ? this.fromdata.signDepartmentId.split(";")
            : [];
          this.checkData = this.huiCheckData;
          // if (this.addSendType == 1) {
          //   this.checkData.map(item => {
          //     //选中的不可操作
          //     item.disabled = true;
          //   });
          // }

          break;
        case "zengfa":
          // this.checkIds = this.fromdata.signDepartmentId
          //   ? this.fromdata.signDepartmentId.split(";")
          //   : [];
          // this.checkData = this.huiCheckData;
          // if (this.addSendType == 1) {
          //   this.checkData.map(item => {
          //     //选中的不可操作
          //     item.disabled = true;
          //   });
          // }

          //区分会签增发 和 传阅增发
          if (this.dialogType == "cy") {
            //传阅
            this.checkIds = this.fromdata.circulatePersonIds
              ? this.fromdata.circulatePersonIds.split(";")
              : [];
            if (this.cyCheckData.length && this.addSendType == 1) {
              this.cyCheckData.map(item => {
                //选中的不可操作
                item.disabled = true;
              });
            }
            this.checkData = this.cyCheckData;
          } else {
            this.checkIds = this.fromdata.signDepartmentId
              ? this.fromdata.signDepartmentId.split(";")
              : [];
            this.checkData = this.huiCheckData;
            if (this.addSendType == 1) {
              this.checkData.map(item => {
                //选中的不可操作
                item.disabled = true;
              });
            }
          }
          break;
        case "ben":
          this.checkIds = this.fromdata.inlineIds
            ? this.fromdata.inlineIds.split(";")
            : [];
          this.checkData = this.benCheckData;
          break;
        case "toQianbaoKhShenpiSend":
          this.checkData = [];
          this.checkIds = [];
          break;

        case "cy":
          //传阅
          this.checkIds = this.fromdata.circulatePersonIds
            ? this.fromdata.circulatePersonIds.split(";")
            : [];
          if (this.cyCheckData.length && this.addSendType == 1) {
            this.cyCheckData.map(item => {
              //选中的不可操作
              item.disabled = true;
            });
          }
          this.checkData = this.cyCheckData;
          break;
      }
    },

    //选择人员后 确定完成并发送
    saveSending() {
      // this.bank_toQianbaoKhShenpiSend.id = this.bank_dispach.id
      //   ? this.bank_dispach.id
      //   : sessionStorage.getItem("skhSphSignpageid") || "";
      this.bank_dispach.id = this.bank_toQianbaoKhShenpiSend.id = getFormId(
        this.$route.query.id,
        "skhSphSignpageid"
      );
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.handleSituationList;
      delete parseList.agreementOpinionList;
      delete parseList.consultOpinionList;
      delete parseList.helpOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.consultAttachment;
      let params = Object.assign(this.bank_toQianbaoKhShenpiSend, parseList);
      params.function = 'toQianbaoKhShenpiSend'
      this.$post
        .postData(
          "toQianbaoKhShenpiSend",
          JSON.stringify(params),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                // window.opener.location.reload();
                // this.handleSetLoacl();
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                  this.handleSetLoacl();
                }
                window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败，请联系管理员",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 2000
          });
        });
    },

    nigaobumenSureHandle(flag, type) {
      if (flag) {
        this.completeSending();
      }
      if (!type) {
        this.nigaobumenFlag = false;
      }
    },
    judgeSend() {
      //       跨行审批行：
      // 1、部门领导审批环节的签批意见：没有填写意见字段，点击完成并发送按钮给出提示：未填写批示意见，是否继续。       结果为：在提示框中点击"是"后可以继续流转，点击'否"退出
      // 2、行领导签批环节的签批意见：没有填写意见字段，点击完成并发送按钮给出提示：未填写批示意见，是否继续。       结果为：在提示框中点击"是"后可以继续流转，点击'否"退出
      // 3、部门领导审批环节的签批意见：每次流转到该环节后点击完成并发送按钮后，都要给出该提示；
      // 4、行领导签批环节的签批意见：每次流转到该环节后点击完成并发送按钮后，都要给出该提示；
      if (
        this.fromdata.curNodeName == "部门领导签批" &&
        !this.fromdata.agreementOpinion
      ) {
        this.nigaobumenFlag = true;
      } else if (
        this.fromdata.curNodeName == "行领导签批" &&
        !this.fromdata.agreementOpinion
      ) {
        this.nigaobumenFlag = true;
      } else {
        this.nigaobumenFlag = false;
      }
      this.nigaobumenSureHandle(!this.nigaobumenFlag, true);
    },

    //点击 完成并发送 弹窗弹出
    completeSendingIsTrue(){
      this.$post
            .postData(
              "isReturnState",
              JSON.stringify({
                  function: "isReturnState",
                  processInstId:this.fromdata.processInstId
                }),
              this.$businessCode.ggqbgl
            )
            .then(res => {
              if (res&&res.success) {
                // isReturnState     "0"无 或 "1"有
                if(res.data.isReturnState == "1"){
                  this.$confirm("是否返回给：上一处理人?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  })
                  .then(() => {
                    this.doBacksyclrHandle();
                  }).catch(() => {
                    this.completeSending();
                  });
                }else{
                  this.completeSending();
                }
                
              } else {
                this.$message({
                  type: "error",
                  offset: 400,
                  showClose: true,
                  message: res.message,
                  duration: 2000
                });
              }
            })
          .catch(err => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
          });
      // let isTrue = JSON.parse(localStorage.getItem("tcHumanRole")).filter((item)=>{
      //   return item.codeType == 'human_speAuth'
      // })
      // if(isTrue.length > 0 && this.fromdata.isReturnBefore == 1){
      //    this.$confirm("是否返回给：上一处理人?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      // this.$post
      //   .postData(
      //     "isReturnState",
      //     JSON.stringify({
      //         function: "isReturnState",
      //         processInstId:this.fromdata.processInstId
      //       }),
      //     this.$businessCode.ggqbgl
      //   )
      //   .then(res => {
      //     if (res&&res.success) {
      //       // isReturnState     "0"无 或 "1"有
      //       if(res.data.isReturnState == "1"){
      //         this.$confirm("是否返回给：上一处理人?", "提示", {
      //           confirmButtonText: "确定",
      //           cancelButtonText: "取消",
      //           type: "warning"
      //         })
      //   .then(() => {
      //     this.doBacksyclrHandle();
      //   }).catch(() => {
      //     this.completeSending();
      //   });
      // }else{
      //   this.completeSending();
      // }
      // } else {
      //         this.$message({
      //           type: "error",
      //           offset: 400,
      //           showClose: true,
      //           message: res.message,
      //           duration: 2000
      //         });
      //       }
      //     })
      //   .catch(err => {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: res.message,
      //       duration: 2000
      //     });
      //   });
      // }
    },
    //点击 完成并发送 弹窗弹出
    async completeSending() {
      this.nigaobumenFlag = false;

      let judge = true;
      judge = this.saveCheck();
      if (!judge) {
        return;
      }

      // if (this.isSignFinish == "0") {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "还有未办结的协办部门",
      //     duration: 2000
      //   });
      //   return;
      // }
      // this.preserve();
      this.useNewDialog = false;
      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "toQianbaoKhShenpiSend";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.preserve().then(resSave => {
        if (resSave) {
          this.$post
            .postData(
              "getNextNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.$businessCode.qbgl
            )
            .then(res => {
              this.seletOptionsData = res.data || [];
              // this.bank_send.tplNo = res.data && res.data[0].PCSAVYID;
              // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
              // this.bank_send.curTplNo = res.data && res.data[0].PTPLNO;
              // this.bank_send.curMultiTenancyId =
              //   res.data && res.data[0].MULTITENANCYID;
              let parms = Object.assign(this.bank_send, this.fromdata);
              parms.pcsAvyId = this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
              parms.tplNo = this.bank_send.tplNo =
                res.data && res.data[0].PCSAVYID;
              parms.curTplNo = this.bank_send.curTplNo =
                res.data && res.data[0].PTPLNO;
              parms.curMultiTenancyId = this.bank_send.curMultiTenancyId =
                res.data && res.data[0].MULTITENANCYID;
              this.$post
                .postData(
                  "selWfNode",
                  JSON.stringify(parms),
                  this.$businessCode.qbgl
                )
                .then(res => {
                  
                  if(res&&res.success){
                    this.treeData = res.data;
                    if (res.message == "Loading") {
                      this.loadingTree = true;
                    } else {
                      this.loadingTree = false;
                    }
                    this.treeData = res.data&&res.data.data||[];
                    this.defaultUser =  res.data&&res.data.defaultUser||{};
                  }else{
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message:res.message,
                      duration: 2000
                    });
                  }
                })
                .catch(erro => {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message:res.message,
                    duration: 2000
                  });
                });
            });
        }
      });
    },

    //表单校验滚动
     scrollIntoForm() {
      let that = this;
      let result = true;
      that.$refs.fromdata.validate((valid, object) => {
        if (!valid) {
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
          result = false;
        }
      });
      return result;
    },
    //mimi
    workSecurityTabTime(value) {
      if (value == "secretLimitName") {
        var limt = this.fromdata.secretTimeType == "年" ? 99  : this.fromdata.secretTimeType == "月" ? 11 : this.fromdata.secretTimeType == "日" ? 29 : "";
        if (limt == "") {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请重新填写",
            duration: 2000
          });
          this.fromdata.secretLimitName = "";
          return;
        }
        if (this.fromdata.secretLimitName > limt) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "填写范围1-" + limt + "，请重新填写",
            duration: 2000
          });
          this.fromdata.secretLimitName = "";
          return;
        }
        if(this.fromdata.secretLimitName == 0){
          this.fromdata.secretLimitName = ''
        }
      }
      // this.preserve(null,true)
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    workSecurityTab(value, type) {
      this.$forceUpdate();
      if (value == "保密期限") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = true;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
        this.securityFlag = true;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = false;
      } else if (value == "解密时间") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = false;
        // 选择解密时间
        this.rules.secretLimit[0].required = true;
        this.securityFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = true;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = false;
      } else if (value == "解密条件") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
        this.securityFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = true;
      } else {
        this.securityFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = false;
      }
      if (!type) {
        this.fromdata.security = "";
        this.fromdata.secretLimitName = "";
        this.fromdata.secretTimeType = "";
        this.fromdata.secretLimit = "";
      }

      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    secretTypechange(value, type) {
      //type 回显处理
      if (value == "商业秘密") {
        this.rules.secretLimitType[0].required = true;
        this.rules.secretFlag[0].required = false;
        this.rules.workSecretFlag[0].required = false;
        this.flag = true;
        this.secretTypeFlag = false;
        this.SSsecretLimitType = [
          {
            label: "保密期限",
            value: 1
          },
          {
            label: "解密时间",
            value: 2
          },
          {
            label: "解密条件",
            value: 3
          }
        ];
      } else if (value == "内部信息") {
        this.rules.secretFlag[0].required = true;
        this.rules.secretLimitType[0].required = false;
        this.rules.workSecretFlag[0].required = false;
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = false;
        this.secretOptionsFlag = [].concat(this.SsecretFlag);
      } else if (value == "工作秘密") {
        this.rules.workSecretFlag[0].required = true;
        this.rules.secretLimitType[0].required = false;
        this.rules.secretFlag[0].required = false;
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = true;
        this.secretOptionsFlag = [].concat(this.SworkSecurity);
      } else {
        this.rules.workSecretFlag[0].required = false;
        this.rules.secretLimitType[0].required = false;
        this.rules.secretFlag[0].required = false;
        this.flag = false;
        this.secretTypeFlag = false;
        this.workSecurityFlag = false;
      }
      if (!type) {
        this.fromdata.workSecretFlag = "";
        this.fromdata.secretFlag = "";
        this.fromdata.secretLimitType = "";
        this.fromdata.security = "";
        this.fromdata.secretTimeType = '';//置空年月日、时间
        this.fromdata.secretLimitName = '';
      }
      if (this.fromdata.secretType) {
        this.rules.secretGists[0].required = true;
      } else {
        this.fromdata.secretGists = "";
        this.fromdata.knowScore = "";
        this.rules.secretGists[0].required = false;
        this.$refs.fromdata.clearValidate();
      }
      this.$forceUpdate();


      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    //保存时校验
    saveCheck() {
      let regT = /^[0-9]*$/;
      let tips = "您有未输入字段!";
      let res = this.scrollIntoForm();
      //mimi
      return res;

      // if (this.fromdata.secretType == "商业秘密") {
      //   switch (this.fromdata.secretLimitType) {
      //     case "保密期限":
      //       if (
      //         !this.fromdata.security ||
      //         !this.fromdata.secretLimitName ||
      //         !this.fromdata.secretTimeType
      //       ) {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: tips,
      //           duration: 1000
      //         });
      //         return;
      //       }
      //       break;
      //     case "解密时间":
      //       if (!this.fromdata.security || !this.fromdata.secretLimit) {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: tips,
      //           duration: 1000
      //         });
      //         return;
      //       }
      //       break;
      //     case "解密条件":
      //       if (!this.fromdata.security || !this.fromdata.secretTimeType) {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: tips,
      //           duration: 1000
      //         });
      //         return;
      //       }
      //       break;
      //     default:
      //       this.$message({
      //         type: "error",
      //         showClose: true,
      //         offset: 400,
      //         message: tips,
      //         duration: 1000
      //       });
      //       return;
      //   }
      // } else if (
      //   this.fromdata.secretType == "内部信息" &&
      //   !this.fromdata.secretFlag
      // ) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: tips,
      //     duration: 1000
      //   });
      //   return;
      // } else if (
      //   this.fromdata.secretType == "工作秘密" &&
      //   !this.fromdata.workSecretFlag
      // ) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: tips,
      //     duration: 1000
      //   });
      //   return;
      // }
      // return true;

      // if (
      //   !this.fromdata.title ||
      //   !this.fromdata.submittedName ||
      //   !this.fromdata.handleTypeName ||
      //   !this.fromdata.qianBaoTypeName ||
      //   !this.fromdata.qianbaoCode ||
      //   !this.fromdata.draftDepartmentName ||
      //   !this.fromdata.draftUserName ||
      //   // !this.fromdata.phone ||
      //   !this.fromdata.secretType
      // ) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: tips,
      //     duration: 1000
      //   });
      //   return false;
      // } else {
      //   return true;
      // }
    },
    // 下拉列表
    getTcQbsignParamDicInfo() {
      this.$post
        .postData(
          "getTcQbsignParamDicInfo",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.SsecretType =
            res.data && res.data.secretType && JSON.parse(res.data.secretType);
          this.SsecretFlag = this.secretOptionsFlag =
            res.data && res.data.secretFlag && JSON.parse(res.data.secretFlag);
          this.SbusinessSecret =
            res.data &&
            res.data.businessSecret &&
            JSON.parse(res.data.businessSecret);
          this.SemergencyLevel =
            res.data &&
            res.data.emergencyLevel &&
            JSON.parse(res.data.emergencyLevel);
          this.SqianbaoType =
            res.data &&
            res.data.qianbaoType &&
            JSON.parse(res.data.qianbaoType);
          this.SworkSecurity =
            res.data &&
            res.data.workSecurity &&
            JSON.parse(res.data.workSecurity);
          this.SqbZihaoList =
            res.data &&
            res.data.qbZihaoList &&
            JSON.parse(res.data.qbZihaoList);
          this.SsecretLimit =
            res.data &&
            res.data.secretLimit &&
            JSON.parse(res.data.secretLimit);

          // this.rules = this.copyRules;
          this.$nextTick(() => {
            this.$refs.fromdata.clearValidate();
          });
        });
    },

    //发送传阅人
    async sendCy(newIds, newNames) {
      this.preserve().then(flag => {
        if (flag == true) {
          let obj = {
            function: "sendCirculate",
            circulatePersonIds: this.fromdata.circulatePersonIds,
            circulatePersonNames: this.fromdata.circulatePersonNames,
            multiTenancyId: this.fromdata.multiTenancyId,
            id: this.fromdata.id
          };
          //增发
          if (newNames) {
            obj.circulatePersonIds = newIds;
            obj.circulatePersonNames = newNames;
          } else {
            obj.circulatePersonIds = this.fromdata.circulatePersonIds;
            obj.circulatePersonNames = this.fromdata.circulatePersonNames;
          }
          if (
            (this.addSendType == "1" && newNames) ||
            this.addSendType != "1"
          ) {
            this.$post
              .postData(
                "sendCirculate",
                JSON.stringify(obj),
                this.$businessCode.ggqbgl
              )
              .then(res => {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "发送传阅人成功",
                    duration: 1000
                  });
                  // this.getQianbaoKhShenpiPoById();
                  // this.$forceUpdate();
                  window.location.reload();
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "发送传阅人失败",
                    duration: 2000
                  });
                }
              })
              .catch(e => {
                console.log(e);
              });
          }
        }
      });
    },
    //收回传阅人
    takeBackCy() {
      this.$post
        .postData(
          "takeBackCirculate",
          JSON.stringify({
            function: "takeBackCirculate",
            multiTenancyId: this.fromdata.multiTenancyId,
            id: this.fromdata.id
          }),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata.circulatePersonIds = res.data.circulatePersonIds;
            this.fromdata.circulatePersonNames = res.data.circulatePersonNames;
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 1000
            });
            this.getQianbaoKhShenpiPoById();
            this.$forceUpdate();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "收回失败",
              duration: 2000
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    //可被收回传阅单的列表
    takeBackSignCY() {
      this.checkedsh = [];
      this.shdialog1 = true;
      let parms = {
        function: "selectallowBackCirculate",
        id: this.fromdata.id,
        multiTenancyId: this.fromdata.multiTenancyId
      };
      this.$post
        .postData(
          "selectallowBackCirculate",
          JSON.stringify(parms),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            this.shData = res.data;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
          }
        });
    },
    shQuedingCY() {
      // let checkboxdata = this.checkedsh.join(";");
      // let parms = {
      //   function: "takeBackCirculate",
      //   id: this.fromdata.id,
      //   ids: checkboxdata,
      //   multiTenancyId: this.fromdata.multiTenancyId
      // };
      if (this.checkedsh.length < 1) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择要收回人员",
          duration: 500
        });
        return;
      }
      //全选备注5
      let checkboxdata = [];
      for (let i = 0; i < this.checkedsh.length; i++) {
        checkboxdata.push(this.checkedsh[i].id);
      }
      checkboxdata = checkboxdata.join(";");
      let parms = {
        function: "takeBackCirculate",
        id: this.fromdata.id,
        ids: checkboxdata,
        multiTenancyId: this.fromdata.multiTenancyId
      };

      this.$post
        .postData(
          "takeBackCirculate",
          JSON.stringify(parms),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            this.shdialog1 = false;
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 1000
            });
            this.getQianbaoKhShenpiPoById();
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    },
    //全选备注4
    handleCheckAllChange(val) {
      this.checkedsh = val ? this.shData : [];
      this.isIndeterminate = false;
      this.$forceUpdate();
    },
    //全选备注4  传阅人员选择多选
    handleCheckedCitiesChange(value) {
      let a = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.shData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.shData.length;
      this.checkNames = [];
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < this.shData.length; j++) {
          if (this.shData[j].processInstId == a[i].processInstId) {
            this.checkNames.push(this.shData[j].deptName);
          }
        }
      }
      this.checkNames = this.checkNames.join(";");
    },

    getNewName(value) {
      let a = value;
      this.checkNames = [];
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < this.shData.length; j++) {
          if (this.shData[j].processInstId == a[i]) {
            this.checkNames.push(this.shData[j].deptName);
          }
        }
      }
      this.checkNames = this.checkNames.join(";");
    },

    //初始值 //input框内容
    getQianbaoKhShenpiPoById(oneTip,loadingFlag) {
      // if (!sessionStorage.getItem("skhSphSignpageid")) {
      //   this.bank_dispach.id = this.$route.query.id;
      // } else {
      //   this.bank_dispach.id = sessionStorage.getItem("skhSphSignpageid") || "";
      // }
      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "skhSphSignpageid"
      );
      this.bank_dispach.moduleType = this.$route.query.moduleType;
      this.$post
        .postData(
          "getQianbaoKhShenpiPoById",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.qbgl,null,loadingFlag
        )
        .then(res => {
          this.getIsNowUser(res,'fcy','db');
           this.fromdata = Object.assign(this.fromdata,res.data);
           this.nowUserId = this.fromdata.currentUserId;
          //获取签报处理单主标题
          this.directTitle = res.data && res.data.orgName;

          if(res.data.level == '1'){//传阅常用联系人修改 12.21
            this.scircularizeLevel = '2';//传阅常用联系人修改 12.21
          }else{
            this.scircularizeLevel = '1';//传阅常用联系人修改 12.21
          }

          // this.fromdata.isReturnAttachment = res.data && res.data.isReturnAttachment === 0 || "1";
          if(res.data && res.data.isReturnAttachment === 0){
            this.fromdata.isReturnAttachment = "0";
          }else{
            this.fromdata.isReturnAttachment = "1";
          }

          // if (this.fromdata.isReturnAttachment && this.fromdata.isReturnAttachment == 1) {
          //   this.fromdata.isReturnAttachment = "1";
          // } else {
          //   this.fromdata.isReturnAttachment = "0";
          // }

          // 签报依据
          if (
            res.data.sendBasis &&
            JSON.parse(res.data.sendBasis).length != 0
          ) {
            this.showImportData = true;
          }
          this.fromdata.sendBasis = this.importDataArr =
            (res.data &&
              res.data.sendBasis &&
              JSON.parse(res.data.sendBasis)) ||
            [];

          this.CnmultiTenancyId = res.data && res.data.multiTenancyId || "";

          //退回
          //  this.doKHBackDownOrder.processInstId = res.data.processInstId;
          //  this.doKHBackDownOrder.parentProcessInstId = res.data.parentProcessInstId;
          //  this.doKHBackDownOrder.multiTenancyId = res.data.multiTenancyId;

          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          this.bank_selectConfig.curTplNo = res.data.tplNo;
          this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;

          this.sendUpHang.processInstId = res.data.processInstId;
          this.sendUpHang.id = this.bank_dispach.id;
          this.sendUpHang.multiTenancyId = res.data.multiTenancyId;
          this.sendUpHang.pcsAvyId = res.data.pcsAvyId;
          this.sendUpHang.tplNo = res.data.tplNo;
          this.sendUpHang.curNodeCode = res.data.curNodeCode;
          this.sendUpHang.sequenceSign = this.bank_toQianbaoKhShenpiSend.sequenceSign = this.setradio =
            (res.data.sequenceSign && res.data.sequenceSign.toString()) || "0";

           //mimi
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true);
          }

          if (res.data.secretLimitType) {
            this.workSecurityTab(res.data.secretLimitType, true);
          }

          if (!this.fromdata.documentNo) {
            var date = new Date();
            var str = date.getFullYear();
            this.fromdata.documentNo = "〔" + str + "〕 号";
          } else {
            this.fromdata.documentNo = res.data.documentNo;
          }
          if (res.data.mainIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }

          //传阅回显
          if (res.data.circulatePersonNames) {
            this.cyCheckData = this.concatTreeData(
              res.data.circulatePersonIds,
              res.data.circulatePersonNames
            );
          }else{
             this.cyCheckData = [];
          }

          if (!(res.data && res.data.phone)) {
            let tcHumanRole = JSON.parse(localStorage.getItem("userInfo"));
            this.fromdata.phone = tcHumanRole.telMobile || "";
          }

          if (this.readFlag != "" && this.readFlag != 1) {
            this.$post
              .postData(
                "doUpdateReadRecord",
                JSON.stringify({
                  function: "doUpdateReadRecord",
                  pcsAvyId: res.data.pcsAvyId,
                  processInstId: res.data.processInstId,
                  multiTenancyId: res.data.multiTenancyId
                }),
                this.$businessCode.ggqbgl,null,loadingFlag
              )
              .then(res => {
                window.opener.location.reload();
                //更新状态用。暂时不用任何操作
              });
          }

          this.isSignFinish =
            res.data.fieldStatusMap && res.data.fieldStatusMap.isSignFinish;
          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.fromdata.attachSort = [];
          //附件名称校验
          this.uploadConfig.attachTitle =
            this.fromdata.attachTitle &&
            this.fromdata.attachTitle.replace(/[\n,\s]/g, "");

          this.sendUpHang.deptIds = res.data.signDepartmentId;
          this.sendUpHang.deptNames = res.data.signDepartmentName;

          if (res.data.signDepartmentId) {
            this.huiCheckData = this.concatTreeData(
              res.data.signDepartmentId,
              res.data.signDepartmentName
            );
            if (
              this.fromdata.signState === "0" &&
              this.fromdata.signDepartmentName
            ) {
              this.showHQ = true;
            } else {
              this.showHQ = false;
            }
            if (this.fromdata.signState === "0") {
              this.sendXbSuccess = false;
            } else {
              this.sendXbSuccess = true;
            }
          } else {
            this.huiCheckData = [];
            this.showHQ = false;
            this.sendXbSuccess = false;
          }
          if (res.data.copyIds) {
            this.chaoCheckData = this.concatTreeData(
              res.data.copyIds,
              res.data.copy
            );
          }
          if (res.data.inlineIds) {
            this.benCheckData = this.concatTreeData(
              res.data.inlineIds,
              res.data.inline
            );
          }

          // 办结    综合   签批意见  判断协办是否办结   √
          // 发协办部门  综合
          // 返回请示行  综合  办理情况和签批意见 判断协办是否办结
          // 退回修改    点了就无 判断协办是否办结

          //表单控制请求参数
          this.isProcessInstId = res.data.processInstId;
          this.isMultiTenancyId = res.data.multiTenancyId;

          //判断是否能够继续完成并发送
          this.isSignFinish =
            res.data.fieldStatusMap && res.data.fieldStatusMap.isSignFinish;

          //查看协办状态             返回请示行
          if (this.isSignFinish == "0") {
            //判断是否已经发了 signState
            //判断发过去的是否已经办结  isSignFinish
            this.signStateFlag = true; // 协办状态
            this.fhqingshiFlag = false;
            this.banjie = false;
            this.thxgFlag = false;
          } else {
            this.signStateFlag = false;
            // this.fhqingshiFlag = true;
            // this.thxgFlag = true;
            // this.banjie = true;

            //判断是批件返回请示行按钮显示 判断是阅件办结按钮显示
            if (this.fromdata.handleTypeName == "批件") {
              this.fhqingshiFlag = true;
              this.banjie = false;
              this.thxgFlag = true;
            } else {
              this.fhqingshiFlag = false;
              this.banjie = true;
              this.thxgFlag = false;
            }
          }

          if (this.isSendUpHang == "1") {
            if ((this.fromdata.consultOpinionList&&this.fromdata.consultOpinionList.length)) {
              this.fashangjihang = false;
            } else {
              this.fashangjihang = true;
            }
          } else {
            this.fashangjihang = true;
          }
          
          this.beforeBackTableId = res.data&&res.data.beforeBackTableId ||''
          if(res.data&&res.data.beforeBackTableId){
            this.cktwdFlag = true;
          }
          

          this.biaoDKz(loadingFlag);
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 2000
          });
        });
    },
    

    //表单控制
    biaoDKz(loadingFlag) {
      if (this.isProcessInstId) {
        this.$post
          .postData(
            "getNextUserTaskNode",
            JSON.stringify({
              function: "getNextUserTaskNode",
              processInstId: this.isProcessInstId
            }),
            this.$businessCode.ggqbgl,null,loadingFlag
          )
          .then(res => {
            this.huanJieMessage = res.data.extAttributes;
            this.setConfig();
            this.setFormConfig();
            setTimeout(() => {
              this.$refs.fromdata.clearValidate();
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$post
          .postData(
            "getpcsTplStartNode",
            JSON.stringify({
              function: "getpcsTplStartNode",
              multiTenancyId: this.isMultiTenancyId
            }),
            this.$businessCode.ggqbgl,null,loadingFlag
          )
          .then(res => {
            this.huanJieMessage = res.data;
            this.setConfig();
            this.setFormConfig();
            setTimeout(() => {
              this.$refs.fromdata.clearValidate();
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    // 保存
    async preserve(type,loadingFlag) {
      let successState = false;
      // this.bank_dispach.id = this.$route.query.id
      //   ? this.$route.query.id
      //   : sessionStorage.getItem("skhSphSignpageid") || "";
      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "skhSphSignpageid"
      );

      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.handleSituationList;
      delete parseList.agreementOpinionList;
      delete parseList.consultOpinionList;
      delete parseList.helpOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.consultAttachment;
      var obj = Object.assign(this.saveOrUpdateQianbaoKhShenpiPo, parseList);
      obj.function = "saveOrUpdateQianbaoKhShenpiPo";
      await this.$post
        .postData(
          "saveOrUpdateQianbaoKhShenpiPo",
          JSON.stringify(obj),
          this.$businessCode.qbgl,null,loadingFlag
        )
        .then(res => {
          if (res && res.success) {
            // this.saveOrUpdateQianbaoKhShenpiPo.id = this.bank_dispach.id =
            //   res.data.id;
            // this.bank_toQianbaoKhShenpiSend.id = res.data.id;
            // sessionStorage.setItem("skhSphSignpageid", res.data.id);
            this.saveOrUpdateQianbaoKhShenpiPo.id = this.bank_dispach.id = this.bank_toQianbaoKhShenpiSend.id = getFormId(
              this.$route.query.id,
              "skhSphSignpageid",
              res.data.id
            );

            if (type && type != "uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 2000
              });
            }
            //退回
            // this.doKHBackDownOrder.processInstId = res.data.processInstId;
            // this.doKHBackDownOrder.parentProcessInstId = res.data.parentProcessInstId;
            // this.doKHBackDownOrder.multiTenancyId = res.data.multiTenancyId;
            //8月版本代码注释
            window.opener&&window.opener.location.reload();
            this.bank_selectConfig.curNodeId = res.data.curNodeCode;
            this.bank_selectConfig.curTplNo = res.data.tplNo;
            this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;
            this.bank_selectConfig.tplNo = res.data.tplNo;

            this.sendUpHang.processInstId = res.data.processInstId;
            this.sendUpHang.id = this.bank_dispach.id;
            this.sendUpHang.multiTenancyId = res.data.multiTenancyId;
            this.sendUpHang.pcsAvyId = res.data.pcsAvyId;
            this.sendUpHang.tplNo = res.data.tplNo;
            this.sendUpHang.curNodeCode = res.data.curNodeCode;
            this.sendUpHang.sequenceSign = res.data.sequenceSign;
            
            //附件
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              //上传文件太小，以至于初始化接口还没反应过来，又调一遍保存参数没有复制完成，所以加一个延时
              setTimeout(() => {
                this.$refs.uploadComponent.uploadFileNow();
              }, 3000);
            }
            this.getQianbaoKhShenpiPoById(null,loadingFlag);
            successState = true;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "保存失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "保存失败",
          //   duration: 2000
          // });
          console.log(erro)
        });
      return successState;
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.attchmentFileInfo[n - 1].id,
          sort: this.fromdata.attchmentFileInfo[n].sort
        },
        {
          id: this.fromdata.attchmentFileInfo[n].id,
          sort: this.fromdata.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
        n - 1
      ];
      this.fromdata.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(item, type) {
      this.bank_upDownFile.fileId = item.id;
      this.bank_upDownFile.sortType = type;
      this.$post
        .postData(
          "changeAttachSort",
          JSON.stringify(this.bank_upDownFile),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              this.getQianbaoKhShenpiPoById();
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "改变顺序失败,请联系管理员",
                duration: 1500
              });
            }
          }
        });
    },
    // downRow(n) {
    //   let midObj;
    //   this.fromdata.attachSort.push(
    //     {
    //       id: this.fromdata.attchmentFileInfo[n + 1].id,
    //       sort: this.fromdata.attchmentFileInfo[n].sort
    //     },
    //     {
    //       id: this.fromdata.attchmentFileInfo[n].id,
    //       sort: this.fromdata.attchmentFileInfo[n + 1].sort
    //     }
    //   );
    //   midObj = this.fromdata.attchmentFileInfo[n];
    //   this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
    //     n + 1
    //   ];
    //   this.fromdata.attchmentFileInfo[n + 1] = midObj;
    //   this.$forceUpdate();
    // },


    deleteRow(n, id) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.bank_deleteFileById.id = id;
        this.$post
          .postData(
            "deleteFileById",
            JSON.stringify(this.bank_deleteFileById),
            this.$businessCode.qbglfj
          )
          .then(res => {
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "删除成功",
                  duration: 1000
                });
                this.fromdata.attchmentFileInfo.splice(n, 1);
                this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "删除失败",
                  duration: 2000
                });
              }
            }
          });
      });
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.qbglfj
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
                duration: 2000
              });
            }
          }
        });
    },

    // 预览
    viewFile(file, tache) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      if (!file.filePath&&tache=="1") {
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
          this.$businessCode.qbglfj
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
                duration: 2000
              });
            }
          }
        });
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

      // if (scrolled < this.distance_qpyj) {
      //   this.active = "#wjys";
      // } else if (
      //   scrolled >= this.distance_qpyj - 200 &&
      //   scrolled < this.distance_scfj
      // ) {
      //   this.active = "#qpyj";
      // } else {
      //   this.active = "#scfj";
      // }
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
    // 返回上级页面
    goBack() {
      window.history.go(-1);
    },
    // 关闭
    
    async btnCloseHandler(val){
      if(val == 1){
        this.handleSetLoacl();window.close();
      }else if(val == 2){
        await this.preserve();
        window.location.href = "about:blank";
        window.opener.location.reload();this.handleSetLoacl();window.close();
      }else{
        this.closeHandler = false
      }
    },
    // handelclose() {
    //   this.$confirm("是否保存并退出当前页面?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.preserve();
    //       window.location.href = "about:blank";
    //       this.handleSetLoacl();window.close();
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         offset: 100,
    //         showClose: true,
    //         message: "已取消关闭",
    //         duation: 2000
    //       });
    //     });
    // },

     // 关闭
    handleClose(val) {
      if(val=='1') {
        this.preserve().then(save => {
          if(save) {
            window.location.href = "about:blank";
            this.handleSetLoacl();window.close();
          }
        });
      } else if(val=='2') {
        window.location.href = "about:blank";
        this.handleSetLoacl();window.close();
      } else {
        this.showCloseDialog = false;
      }
    },
    handelclose() {
      this.showCloseDialog = true;
    },
    handelclose1() {
      window.location.href = "about:blank";
      window.close();
    },

    //请求文件路径
    async getFileInfo(self) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.qbglfj
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
              message: "获取文件失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取失败",
            duration: 2000
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    // 起草正文
    drafting(state) {
      let that = this;
      this.zhengWenState = state;
      if (!this.fromdata.filePath && !this.fromdata.fileName && state != 1) {
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先起草正文",
          duation: 1000
        });
        return;
      }
      if (!getFormId(this.$route.query.id, "skhSphSignpageid")) {
        this.preserve().then(res => {
          if (res) {
            if (state == 1) {
              this.showDraft = true;
            } else {
              let fileInfo = {
                filePath: this.fromdata.filePath,
                fileName: this.fromdata.fileName
              };
              this.doDraft(fileInfo);
            }
          }
        });
      } else {
        if (state == 1) {
           this.preserve().then(save => {
            if (save) {
              this.showDraft = true;
            }
          })
        } else {
          this.getFileInfo(that).then(resF => {
            if (resF.state) {
              this.preserve().then(res => {
                if (res) {
                  if (state != "taoHong") {
                    this.doDraft(resF);
                  } else {
                    this.findTemplete(resF);
                  }
                }
              });
            }
          });
        }
      }
    },
    //正文跳转
    doDraft(fileInfo,saveName,isQC) {
      let str = "";
      if(!saveName){
        if(this.fromdata.documentNo){
          str = this.fromdata.qianbaoCode + this.fromdata.documentNo + this.fromdata.title
        }else{
          str = this.fromdata.title
        }
      }else{
        str = saveName;
      }
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
          id: getFormId(this.$route.query.id, "skhSphSignpageid"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.qbglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          flowTranId: this.$businessCode.qbgl, //流程交易线    chai
          processInstId:this.fromdata.processInstId, 
          saveSpecialFileName:str,
          isQC:isQC,
          noNeedColsepage:this.zhengWenState == 0 ? 1 : 0,
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },

    // 删除此文
    delectArticle() {
      // if (!sessionStorage.getItem("skhSphSignpageid")) {
      //   this.bank_dispach.id = this.$route.query.id;
      // } else {
      //   this.bank_dispach.id = sessionStorage.getItem("skhSphSignpageid") || "";
      // }
      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "skhSphSignpageid"
      );

      // this.bank_dispach.id = sessionStorage.getItem("skhSphSignpageid") || "";
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      this.deleteToQianbaoEntityById.id = deletesendorderid;
      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.deleteToQianbaoEntityById.id) {
            window.location.href = "about:blank";
            window.opener.location.reload();
            this.handleSetLoacl();window.close();
          } else {
            this.$post
              .postData(
                "deleteToQianbaoEntityById",
                JSON.stringify(this.deleteToQianbaoEntityById),
                this.$businessCode.qbgl
              )
              .then(res => {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 1000,
                    onClose: () => {
                      window.location.href = "about:blank";
                      window.opener.location.reload();
                      this.handleSetLoacl();window.close();
                    }
                  });
                } else {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "删除失败",
                    duration: 2000
                  });
                }
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消关闭",
            duation: 2000
          });
        });
    },

    // 收藏
    shoucang() {
      let that = this;
      let shiwutitle = this.fromdata.qianbaoCode + this.fromdata.documentNo; //字号
      let draftInfo = this.fromdata.filePath
        ? [].concat(
            {
              fileName: this.fromdata.fileName,
              filePath: this.fromdata.filePath
            },
            this.fromdata.attchmentFileInfo
          )
        : this.fromdata.attchmentFileInfo; //收藏时下载正文
      if(this.fromdata.consultAttachment && this.fromdata.consultAttachment.length){
          this.fromdata.consultAttachment.map(items => {
            draftInfo.push(items);
          });
        } 
      // draftInfo.map(item => {
      //   if(item.fileVolume == "CN014") {
      //     item.fileName = "审批行" + item.fileName
      //   } else if(item.fileVolume == "CN009"){
      //     item.fileName = "请示行" + item.fileName
      //   }
      // });
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "signquteWaitSph",
        this.$businessCode.qbglfj,
        this.fromdata.title, //标题
        that
      );
    },
    // 操作指南
    instructions() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "QBGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.fromdata.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: this.fromdata.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false,
                    flowTranId: this.$businessCode.qbgl, //流程交易线     chai
                    noNeedColsepage:1,
                  }
                });
                window.open(data.href, "_blank");
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件不存在",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    },
    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = flagFile.fileName;
      self.bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fwbzfj
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

    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      this.bank_cklc.multiTenancyId = this.CnmultiTenancyId;
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res) {
            this.tableData = res.data;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          }
        });
    },
    // 打印处理单
    processSheet() {
      this.preserve().then(save => {
        if(save) {
          const routeData = this.$router.resolve({
              path: "/qbdzCldkhSphPrint",
              query: {
                id: this.bank_dispach.id,
                choseYear:this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
        }
      })
      // this.bank_dispach.id = getFormId(
      //   this.$route.query.id,
      //   "skhSphSignpageid"
      // );

      // let parseList = JSON.parse(JSON.stringify(this.fromdata));
      // delete parseList.handleSituationList;
      // delete parseList.agreementOpinionList;
      // delete parseList.consultOpinionList;
      // delete parseList.helpOpinionList;
      // delete parseList.circulationList;
      // delete parseList.remarkList;
      // delete parseList.consultAttachment;
      // var obj = Object.assign(this.saveOrUpdateQianbaoKhShenpiPo, parseList);
      // this.$post
      //   .postData(
      //     "saveOrUpdateQianbaoKhShenpiPo",
      //     JSON.stringify(obj),
      //     this.$businessCode.qbgl,null,loadingFlag
      //   )
      //   .then(res => {
      //     if (res && res.success) {
      //       const routeData = this.$router.resolve({
      //         path: "/qbdzCldkhSphPrint",
      //         query: {
      //           id: this.bank_dispach.id
      //         }
      //       });
      //       window.open(routeData.href, "_blank");
      //     } else {
      //       this.$message({
      //         type: "error",
      //         offset: 400,
      //         showClose: true,
      //         message: "保存失败",
      //         duration: 2000
      //       });
      //     }
      //   })
      //   .catch(erro => {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "保存失败",
      //       duration: 2000
      //     });
      //   });

      
    },

    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 签批意见
          this.fromdata.agreementOpinion = this.fromdata.agreementOpinion
            ? this.fromdata.agreementOpinion + data
            : data;
            if(this.fromdata.agreementOpinion && this.fromdata.agreementOpinion.length>=500){
              this.fromdata.agreementOpinion = this.fromdata.agreementOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 2) {
          // 办理情况
          this.fromdata.handleSituation = this.fromdata.handleSituation
            ? this.fromdata.handleSituation + data
            : data;
            if(this.fromdata.handleSituation && this.fromdata.handleSituation.length>=500){
              this.fromdata.handleSituation = this.fromdata.handleSituation.substr(0,500)
            }
        } else if (this.clickTypes == 3) {
          // 协办意见
          this.fromdata.helpOpinion = this.fromdata.helpOpinion
            ? this.fromdata.helpOpinion + data
            : data;
            if(this.fromdata.helpOpinion && this.fromdata.helpOpinion.length>=500){
              this.fromdata.helpOpinion = this.fromdata.helpOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 4) {
          // 请示单位意见
          this.fromdata.consultOpinion = this.fromdata.consultOpinion
            ? this.fromdata.consultOpinion + data
            : data;
            if(this.fromdata.consultOpinion && this.fromdata.consultOpinion.length>=500){
              this.fromdata.consultOpinion = this.fromdata.consultOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 5) {
          // 传阅意见
          this.fromdata.circulation = this.fromdata.circulation
            ? this.fromdata.circulation + data
            : data;
            if(this.fromdata.circulation && this.fromdata.circulation.length>=500){
              this.fromdata.circulation = this.fromdata.circulation.substr(0,500)
            }
        } else if (this.clickTypes == 6) {
          // 备    注
          this.fromdata.remark = this.fromdata.remark
            ? this.fromdata.remark + data
            : data;
            if(this.fromdata.remark && this.fromdata.remark.length>=500){
              this.fromdata.remark = this.fromdata.remark.substr(0,500)
            }
        }
        this.$forceUpdate();
      }
    },
    changeDage(e) {
      this.$forceUpdate();
    },
    //常用批语弹窗弹出
    writelistbox(arr,num) {
      if(num>=500){
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "当前字数超出500字",
            duration: 2000
          });
          return;
      }
      this.appendWriteDialog = true;
      this.getCommonUse(0);
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    // 获取常用批示意见
    getCommonUse() {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.bank_selectCommonUseList.function = "selectCommonUseList";
      this.$post
        .postData(
          "selectCommonUseList",
          JSON.stringify(this.bank_selectCommonUseList),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            this.offenDevices = res.data;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1500
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: erro.message,
            duration: 1500
          });
        });
    },
    // 新增常用批示意见
    addCommonUse(flag, id, content) {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.bank_selectCommonUseList.id = id;
      this.bank_selectCommonUseList.content = content;
      this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.bank_selectCommonUseList.function = "doSaveCommonUse";
      this.$post
        .postData(
          "doSaveCommonUse",
          JSON.stringify(this.bank_selectCommonUseList),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            this.getCommonUse();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1500
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: erro.message,
            duration: 1500
          });
        });
    },
    // 删除常用批示意见
    deleteCommonUse(flag, id, content) {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.bank_selectCommonUseList.id = id;
      this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.bank_selectCommonUseList.function = "doDeleteCommonUseList";
      this.$post
        .postData(
          "doDeleteCommonUseList",
          JSON.stringify(this.bank_selectCommonUseList),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            this.getCommonUse();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1500
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: res.message,
            duration: 1500
          });
        });
    },

    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "deleteOpinionById",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            // this.getQianbaoKhShenpiPoById();
            window.location.reload();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "删除失败",
            duration: 2000
          });
        });
    },

    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },
    // 协办部门
    handleSendHQPtmt(newIds, newNames) {
      // this.bank_dispach.id = this.$route.query.id
      //   ? this.$route.query.id
      //   : sessionStorage.getItem("skhSphSignpageid") || "";
      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "skhSphSignpageid"
      );
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.handleSituationList;
      delete parseList.agreementOpinionList;
      delete parseList.consultOpinionList;
      delete parseList.helpOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.consultAttachment;
      // this.sendUpHang.avyds = "发送协办部门:" + this.sendUpHang.deptNames;
      if (newNames) {
        this.sendUpHang.avyds = "发送协办部门:" + newNames;
      } else {
        this.sendUpHang.avyds = "发送协办部门:" + this.sendUpHang.deptNames;
      }
      var obj = Object.assign(this.sendUpHang, parseList);
      obj.serviceInstans = "KHQB_XB";
      obj.function = "sendUpHang";
      obj.sendUnitOrDept = "dept";
      if (!this.sendUpHang.deptIds) {
        obj.deptIds = "";
        obj.deptNames = "";
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择协办部门",
          duration: 2000
        });
        return;
      }
      if (newNames) {
        obj.deptIds = newIds;
        obj.deptNames = newNames;
      } else {
        obj.deptIds = this.fromdata.signDepartmentId;
        obj.deptNames = this.fromdata.signDepartmentName;
      }
      if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
        this.createDocNo = true;
        this.$post
          .postData("sendUpHang", JSON.stringify(obj), this.$businessCode.qbgl)
          .then(res => {
            this.createDocNo = false;
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送协办部门成功",
                duration: 1000
              });
              this.preserve();
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message,
                duration: 2000
              });
              this.getQianbaoKhShenpiPoById();
              return;
            }
          })
          .catch(erro => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
            this.createDocNo = false;
            this.getQianbaoKhShenpiPoById();
          });
      }
    },
    //收回t催办
    takeBackSign(type) {
      this.shdialog = true;
      this.typeofHQBM = type;
      this.checkedsh = [];
      if (type == "shouhui") {
        this.dialoghuiqianTit = "选择需要收回的协办部门";
      } else {
        this.dialoghuiqianTit = "选择需要催办的协办部门";
      }
      const parms = {
        function: "getSubWfInfoKH",
        processInstId: this.fromdata.processInstId,
        multiTenancyId: this.fromdata.multiTenancyId,
        sendUnitOrDept: "dept",
        serviceInstans: "KHQB_XB"
      };
      this.$post
        .postData(
          "getSubWfInfoKH",
          JSON.stringify(parms),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.shData = [];
            this.shData = res.data;
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    },
    //收回确定按钮
    shQueding() {
      let checkboxdata = this.checkedsh.join(";");
      let dqdata = this.checkeddq.join(";");

      if (this.typeofHQBM === "shouhui") {
        if (!checkboxdata && !dqdata) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择需要收回的协办部门",
            duration: 2000
          });
          this.shdialog = false;
          return;
        }
        let shform = {
          function: "takeBackSignHelpKH",
          pcsAvyId: this.fromdata.pcsAvyId,
          multiTenancyId: this.fromdata.multiTenancyId,
          takeBackDeptNames: checkboxdata,
          subProcessInstId: dqdata,
          id: this.bank_dispach.id,
          sendUnitOrDept: "dept",
          serviceInstans: "KHQB_XB"
        };
        this.$post
          .postData(
            "takeBackSignHelpKH",
            JSON.stringify(shform),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 1000
              });
              window.location.reload();
              // this.getQianbaoKhShenpiPoById();
              // this.$forceUpdate();
              this.shdialog = false;
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message,
                duration: 2000
              });
            }
          })
          .catch(erro => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "收回失败",
              duration: 2000
            });
            this.getQianbaoKhShenpiPoById();
            this.$forceUpdate();
            this.shdialog = false;
          });
      } else if (this.typeofHQBM == "cuiban") {
        if (!checkboxdata && !dqdata) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择需要催办的协办部门",
            duration: 2000
          });
          this.shdialog = false;
          return;
        }
        let parms = {
          function: "urgeHandleKH",
          subProcessInstId: dqdata,
          sendUnitOrDept: "dept",
          serviceInstans: "KHQB_XB",
          multiTenancyId: this.fromdata.multiTenancyId,
          pcsAvyId: this.fromdata.pcsAvyId,
          tplbsnid: "KHQB_XB"
        };
        this.$post
          .postData(
            "urgeHandleKH",
            JSON.stringify(parms),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "催办成功",
                duration: 1000
              });
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message,
                duration: 2000
              });
              return;
            }
            this.getQianbaoKhShenpiPoById();
            this.$forceUpdate();
            this.shdialog = false;
          });
      }
    },
    checkouthuiqian(item) {
      this.checkeddq = [];
      let transItem = this.shData.filter(item => {
        let num = this.checkedsh.indexOf(item.deptName) > -1;
        if (num) {
          this.checkeddq.push(item.processInstId);
        }
        return num;
      });
    },
    // 签报依据
    // handleImport() {
    //   this.bankImport = "";
    //   this.documentCode = "〔〕号";
    //   this.showImport = true;
    // },
    // handleImportSure() {
    //   let that = this;
    //   let transJudge = false
    //   if(this.bankImport == "") {
    //     this.$message({
    //       type: "error",
    //       showClose: true,
    //       offset: 400,
    //       message: "文件类型不能为空！",
    //       duration: 500
    //     });
    //     return;
    //   }
    //   if(this.documentCode == "") {
    //     this.$message({
    //       type: "error",
    //       showClose: true,
    //       offset: 400,
    //       message: "文号不能为空！",
    //       duration: 500
    //     });
    //     return;
    //   }
    //   if(that.importDataArr.length>0) {
    //     that.importDataArr.forEach(item => {
    //       if(item.documentCode == this.documentCode) {
    //         transJudge = true
    //       } 
    //     });
    //   }
    //   if (transJudge) {
    //     this.$message({
    //       type: "error",
    //         showClose: true,
    //         offset: 400,
    //         message: "已存在本文件字号依据，不可重复添加！",
    //         duration: 500
    //       });
    //     return;
    //   }
    //   if (this.bankImport != "") {
    //     let transJYX = "";
    //     switch (this.bankImport) {
    //       case "CN000": //发文
    //         this.$businessCode.ggfawgl = "A08462001";
    //         break;
    //       case "CN001": //收文
    //         this.$businessCode.ggfawgl = "A08462003";
    //         break;
    //       case "CN002": //签报
    //         this.$businessCode.ggfawgl = "A08462005";
    //         break;
    //     }

    //     if (this.bankImport == "4") {
    //       this.$api.checkLz
    //         .importBas({
    //           documentNo: this.documentCode,
    //           currentUserOldId: JSON.parse(localStorage.getItem("userInfo"))
    //             .humanId
    //         })
    //         .then(res => {
    //           if (!res.result.id) {
    //             this.$message({
    //               type: "warning",
    //               message: "没有找到相应文档"
    //             });
    //           } else {
    //             let transObj = {
    //             id: res.result.id,
    //             title: res.result.title
    //           }
    //           that.importDataArr.push(transObj)
    //           that.fromdata.sendBasis = that.importDataArr
    //           that.showImport = false
    //           that.showImportData = true
    //           that.preserve()
    //           }
    //         });
    //     } else {
    //       let that = this
    //       let obj = {
    //         function: "importBasis",
    //         multiTenancyId: this.bankImport,
    //         documentCode: this.documentCode
    //       };

    //       that.$post
    //         .postData(
    //           "importBasis",
    //           JSON.stringify(obj),
    //           that.$businessCode.ggfawgl
    //         )
    //         .then(res => {
    //           if (res && res.data && res.success) {
    //             that.bank_import = res.data;
    //           that.importDataArr.push(res.data);
    //           that.fromdata.sendBasis = that.importDataArr.filter(item => item.documentCode);
    //           that.showImport = false;
    //           that.showImportData = true;
    //           that.preserve();
    //           } else {
    //             let transObj = {
    //             documentCode: this.documentCode,
    //             id: "",
    //             title: ""
    //           }
    //           this.importDataArr.push(transObj);
    //           this.showImport = false;
    //           that.preserve();
    //           }
    //         });
    //     }
    //   } 
    // },
    // handleCheckImport(data) {
    //   if (data.id == ''||!data.id) {
    //     this.$message({
    //       type: "error",
    //       showClose: true,
    //       offset: 400,
    //       message: "该文件不存在于库中！",
    //       duration: 500
    //     });
    //     return;
    //   } else {
         
      
    //     if(data.bankImport == '4') {
    //       this.handleOpenPage("/proceHas", data.id, '2');
    //       return;
    //     }
    //     if (data.orderType && data.orderType !== "") {
    //       if (data.orderType == "非跨行") {
    //         this.handleOpenPage("/signquoteOverFkhDispatch", data.id);
    //       } else if (data.orderType == "跨行请示") {
    //         this.handleOpenPage("/signquoteOverKhQshDispatch", data.id);
    //       } else if (data.orderType == "跨行审批") {
    //         this.handleOpenPage("/signquoteOverKhSphDispatch", data.id);
    //       } else if (data.orderType == "实物") {
    //         this.handleOpenPage("/signquoteOverEntityDispatch", data.id);
    //       }
    //     } else {
    //      this.showImportList = true;   
    //       this.bank_import = data;
    //     }
    //   }
    // },
    // handleOpenPage(path, id, readType) {
    //   const routeData = this.$router.resolve({
    //     path: path,
    //     query: {
    //       id: id,
    //       readFlag: readType
    //     }
    //   });
    //   window.open(routeData.href, "_blank");
    // },
    // handleDeleteImport(data) {
    //   this.fromdata.sendBasis.forEach((item, index) => {
    //     if (item.documentCode == data.documentCode) {
    //       this.fromdata.sendBasis.splice(index, 1);
    //     }
    //   });
    //   if (this.fromdata.sendBasis.length == 0) {
    //     this.showImportData = false;
    //   }
    //   this.preserve();
    //   // this.$forceUpdate();
    // }
  },
  created() {
    //初始化加载数据
    // this.bank_dispach.id = this.uploadConfig.id = this.$route.query.id
    //   ? this.$route.query.id
    //   : "";
    // this.bank_toQianbaoKhShenpiSend.id = this.bank_dispach.id;
    this.bank_dispach.id = this.uploadConfig.id = this.bank_toQianbaoKhShenpiSend.id = getFormId(
      this.$route.query.id,
      "skhSphSignpageid"
    );
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.readonlyQbcy = this.$route.query.readonlyQbcy ? false : true;
    // this.qianbaostate = this.$route.query.signState
    //   ? this.$route.query.signState
    //   : "";
    //初始化修改交易线 (传后台)
    this.uploadConfig.code = this.$businessCode.qbglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
    this.getQianbaoKhShenpiPoById();
    // this.getTcQbsignParamDicInfo();
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
.el-scrollbar {
  height: 100%;
}

//退文
.tui_wen_list {
  padding: 10px;
  font-size: 16px;
}
.nav {
  width: 100%;
  height: 110px;
}
.pad_10 {
  padding: 0 5px;
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
    visibility: hidden;
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
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
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
      // .bank_dispach_annotation_bottom{
      //   margin:0;
      //   border-top: 0;
      // }
    }
    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 10px;
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
// .dimi_btn {
//   background: #f5f7fa;
//   height: 40px;
//   margin-left: 20px;
//   padding: 10px 20px;
//   float: right;
// }

/deep/ .hqbm .el-textarea__inner {
  color: #f00 !important;
  min-height: 40px !important;
}
/deep/ .hqbm1 .el-textarea__inner {
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
.opinionCheck_w {
  width: 100%;
  height: 84px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
  .opinionCheck {
    text-align: left;
    margin-left: 20px;
  }
  .opinionCheckpeo {
    text-align: right;
    margin-right: 20px;
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
.disable_w {
  width: 100%;
}
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 130px;
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
.el-scrollbar {
  height: 100%;
}

//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 130px;
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
.tree_zhuban {
  margin: 0;
}
/deep/ .dialogImport {
  .el-dialog {
    width: 30% !important;
  }
}

.fu_jian_style {
  font-size: 14px;
  color: #606266;
  margin: 20px 0 0 130px;
}

.pr45 {
  padding-right: 45px;
}
/deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100% !important;
}
</style>
