<template>
  <!-- 签报电子处理单  (非跨行) -->
  <div id="circularizeWaitFkh" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>签报处理单
        </p>
        <!-- <div class="grid_comtent" v-if="state==2">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="drafting('0')" v-if="fromdata.filePath">查看正文</el-button>
          <el-button size="small" plain @click="shoucang">收藏</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>
        </div> -->
<!-- 【关闭】【维护】【查看正文】【发传阅】【打印处理单】【收藏】【操作指南】 -->
        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="maintenance">维护</el-button>
          <!-- <el-button size="small" plain @click="preserve('save')" v-if="state == 0">保存</el-button> -->
          <el-button size="small" plain @click="drafting('0')" v-if="fromdata.filePath">查看正文</el-button>
          <!-- <el-button
            size="small"
            plain
            @click="getTreeDataForCy('cy',1)"
            v-if="fromdata.circulatePersonNames !=''&&state!=2"
          >发传阅</el-button>
          <el-button
            size="small"
            plain
            @click="getTreeDataForCy('cy')"
            v-if="fromdata.circulatePersonNames ==''&&state!=2"
          >发传阅</el-button> -->
          <!-- <el-button size="small" plain @click="yiyue" v-if="state == 0">已阅</el-button> -->
          <!-- <el-button size="small" plain @click="yiyue('1')" v-if="state==0">反馈传阅意见</el-button> -->
          
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="collect('qianbao_chuanyue',fromdata.id,fromdata.multiTenancyId, unitId)">收藏</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 传阅步骤 -->
    <!-- <el-dialog v-dialogDrag  title="操作" :visible.sync="shdialog1" width="50%">
      <el-card>
        <el-checkbox-group v-model="checkedsh" @change="getNewName">
          <el-checkbox v-for="(item,index) in shData" :label="item.id" :key="index">{{item.currentUser}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog1 = false">取 消</el-button>
        <el-button type="primary" @click="shQuedingCY">确 定</el-button>
      </span>
    </el-dialog>-->

    <el-dialog v-dialogDrag  title="提示" :visible.sync="dialogVisibleShouuhi" width="30%">
      <span>确认是否收回</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleShouuhi = false">取 消</el-button>
        <el-button type="primary" @click="shouhuibutton">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog v-dialogDrag 
      title="操作"
      :visible.sync="shdialog1"
      width="50%"
      >
      <el-card>
        <el-checkbox-group v-model="checkedsh" @change="getNewName">
          <el-checkbox v-for="(item,index) in shData" :label="item.id" :key="index" >{{item.currentUser}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog1 = false">取 消</el-button>
        <el-button type="primary" @click="shQuedingCY">确 定</el-button>
      </span>
    </el-dialog>-->

    <!-- 全选备注1 -->
    <el-dialog v-dialogDrag  title="操作" :visible.sync="shdialog1" width="50%">
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

    <el-dialog v-dialogDrag  title="返回上一处理人" width="30%" :visible.sync="handeldoBacksyclr">
      <span>是否确定返回上一处理人</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handeldoBacksyclr = false">取消</el-button>
        <el-button type="primary" @click="doBacksyclrHandle">确定</el-button>
      </span>
    </el-dialog>

    <!-- 意见弹窗提示 -->

    <el-dialog v-dialogDrag 
      :title="fromdata.curNodeName =='拟稿部门领导审核' || '处审核' ? '拟稿部门意见':'批示意见'"
      width="30%"
      :visible.sync="nigaobumenFlag"
    >
      <span>未填写{{fromdata.curNodeName =='拟稿部门领导审核' || '处审核' ? '拟稿部门意见':'批示意见'}}，是否继续</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nigaobumenSureHandle(false)">否</el-button>
        <el-button type="primary" @click="nigaobumenSureHandle(true)">是</el-button>
      </span>
    </el-dialog>

    <!-- 起草正文字数限制提示 -->
    <!-- <el-dialog v-dialogDrag  title="友情提示" width="20%" :visible.sync="zhengWTS">
      <span>根据建行党委要求，此类文件正文字数不得超过{{fromdata.sizeLimit}}字，请拟稿时注意。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qiCaoNumClose">是</el-button>
      </span>
    </el-dialog>-->

    <!-- 起草正文字数限制提示 -->
    <!-- <el-dialog v-dialogDrag  title="友情提示" width="20%" :visible.sync="chaoChuTiS">
      <span>根据建行党委要求，此类文件正文字数不得超过{{fromdata.sizeLimit}}字，此文件字数超过{{fromdata.sizeFact-fromdata.sizeLimit}}字，请具体说明原因。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chaoChuTiSYuanY">说明原因</el-button>
        <el-button type="primary" @click="chaoChuTiSXiuG">修改</el-button>
      </span>
    </el-dialog>-->

    <!-- 起草正文 -->
    <el-dialog v-dialogDrag 
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
        <el-button type="primary" @click="doDraft">确定</el-button>
      </div>
    </el-dialog>

    <!-- 具体原因少于10个字提示 -->
    <!-- <el-dialog v-dialogDrag  title="友情提示" width="20%" :visible.sync="juTiYY">
      <span>请说明具体原因不能少于10个字</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="juTiYY = false">是</el-button>
      </span>
    </el-dialog>-->

    <!-- 上一处理人说明原因 -->
    <!-- <el-dialog v-dialogDrag  title="友情提示" width="20%" :visible.sync="shangYCLRjtyy">
      <span>根据建行党委要求，此类文件正文字数不得超过{{fromdata.sizeLimit}}字，此文件字数超出{{fromdata.sizeFact-fromdata.sizeLimit}}字，上一处理人已说明具体原因。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shangYCLRjtyy = false">确定</el-button>
      </span>
    </el-dialog>-->

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <el-dialog v-dialogDrag  title="收回" width="30%" :visible.sync="sendTackVisible">
      <span>是否确定收回</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendTackVisible = false">取消</el-button>
        <el-button type="primary" @click="sendTackHandle">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag  title="退号" width="30%" :visible.sync="handeldoBackNoFuc">
      <span>是否确定退号</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handeldoBackNoFuc = false">取消</el-button>
        <el-button type="primary" @click="doBackNoHandle">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag  title="生成文号" width="30%" :visible.sync="SetDocNoVisible">
      <div>
        <el-form v-for="(DocNoDataListitem,n,m) in DocNoDataList" :key="DocNoDataListitem+m">
          <el-form-item :label="n">
            <template
              v-for="DocNoDataListitems in DocNoDataListitem && DocNoDataListitem.split(';')||[]"
            >
              <el-radio
                v-model="setDocNum"
                :label="DocNoDataListitems+'-'+m"
                :key="DocNoDataListitems+n+m"
              >{{DocNoDataListitems}}</el-radio>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SetDocNoVisible = false">取消</el-button>
        <el-button type="primary" @click="SetDocNoHandle">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag  title="查看会签状态" :visible.sync="ckhqzt">
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
      <h3 class="bank_dispach_tit">{{directTitle}}电子签报传阅单</h3>
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
          <div class="bank_dispach_annotation"  v-show="fromdata.isFinish != '1'">
            <!-- <p class="bank_dispach_annotation_current" style="width:15%;">
              当前环节：
              <span>{{fromdata.curNodeName}}</span>
            </p>-->
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
                    <el-input v-model="fromdata.submittedName" placeholder="请输入呈送人" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="处理类型" prop="handleTypeName" ref="handleTypeName">
                    <el-radio v-model="fromdata.handleTypeName" label="0" disabled>批件</el-radio>
                    <el-radio v-model="fromdata.handleTypeName" label="1" disabled>阅件</el-radio>
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
                  <el-form-item label="拟稿部门" prop="draftDepartmentName" ref="draftDepartmentName">
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
                    <el-input v-model="fromdata.phone" disabled @input.native="phoneChange"></el-input>
                  </el-form-item>
                </el-col>

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
                  <el-form-item label="知悉范围">
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
                  <el-form-item label="定密依据">
                    <div>
                      <el-input
                        type="textarea"
                        v-model="fromdata.secretGists"
                        placeholder="填写定密依据可输入500字"
                        maxlength="500"
                        resize="none"
                        autosize
                        disabled
                      ></el-input>
                      <!-- <button
                        @click="secretGistsbox"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        disabled
                      >
                        <i class="el-icon-plus"></i>
                      </button>-->
                    </div>
                  </el-form-item>
                </el-col>
                <!-- <el-col>
                  <el-form-item label="签报依据" prop="sendBasis" ref="sendBasis">
                    <div class="fix_height">
                      <el-input
                        resize="none"
                        autosize
                        type="textarea"
                        v-model="fromdata.sendBasis"
                        placeholder="请输入签报依据"
                        maxlength="500"
                        :disabled="readFields.sendBasis"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>-->

                <el-col disabled>
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
                  <el-form-item label="会签部门" prop="signDepartmentName" ref="signDepartmentName">
                    <!-- <el-input
                      v-model="fromdata.signDepartmentName"
                      placeholder="请选择会签部门"
                      disabled
                      style="width: 100%;"
                      @input="inputChange"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-plus"
                        @click="bankmain('hui')"
                        v-if="!sendXbSuccess"
                        disabled
                      ></el-button>
                      <el-button slot="append" @click="bankmain('hui', '1')" v-if="sendXbSuccess">增发</el-button>
                      <el-button
                        slot="append"
                        @click="takeBackSign('shouhui')"
                        v-if="sendXbSuccess"
                      >收回</el-button>
                      <el-button
                        slot="append"
                        @click="takeBackSign('cuiban')"
                        v-if="sendXbSuccess"
                      >催办</el-button>
                    </el-input>-->

                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        @input="inputChange"
                        v-model="fromdata.signDepartmentName"
                        readonly
                        placeholder="请选择会签部门"
                        style="flex:1;color: #F00;"
                        class="hqbm"
                      ></el-input>
                      <!-- <button
                        @click="bankmain('hui')"
                        v-if="!sendXbSuccess"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        disabled
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                      <button
                        @click="bankmain('hui', '1')"
                        v-if="sendXbSuccess"
                        type="button"
                        class="el-button el-button--default dimi_btn1"
                        disabled
                      >增发</button>
                      <button
                        @click="takeBackSign('shouhui')"
                        v-if="sendXbSuccess"
                        type="button"
                        class="el-button el-button--default dimi_btn1"
                        disabled
                      >收回</button>
                      <button
                        @click="takeBackSign('cuiban')"
                        v-if="sendXbSuccess"
                        type="button"
                        class="el-button el-button--default dimi_btn1"
                        disabled
                      >催办</button> -->
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
                      placeholder="已完成的会签部门"
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
                      autosize
                      resize="none"
                      type="textarea"
                      v-model="fromdata.attachTitle"
                      disabled
                      @blur="attachTitleHandel"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!-- <el-col>
                  <el-form-item label="传阅人" prop="circulatePersonNames" ref="circulatePersonNames">
                    <el-input
                      v-model="fromdata.circulatePersonNames"
                      readonly
                      placeholder
                      style="width: 100%;"
                      :disabled="false"
                    >
                      <el-button slot="append" v-if="fromdata.isHasCY == 1">收回</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>-->

                <el-col>
                  <el-form-item label="传阅人" prop="circulatePersonNames" ref="circulatePersonNames">
                    <div  style='display:flex;'>
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
                      disabled
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
                <el-form-item label="批示意见" prop="approvalOpinion" ref="approvalOpinion">
                  <!-- <div v-for="item in fromdata.approvalOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            resize="none"
                            autosize
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                  </div> -->
                  <el-input
                    type="textarea"
                    maxlength="500"
                    resize="none"
                    autosize
                    v-model="fromdata.approvalOpinion"
                    disabled
                    v-if="!(fromdata.approvalOpinionList && fromdata.approvalOpinionList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.approvalOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="审核意见" prop="checkOpinion" ref="checkOpinion">
                  <!-- <div v-for="item in fromdata.checkOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            resize="none"
                            autosize
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                  </div> -->
                  <el-input
                    type="textarea"
                    maxlength="500"
                    resize="none"
                    autosize
                    v-model="fromdata.checkOpinion"
                    disabled
                    v-if="!(fromdata.checkOpinionList && fromdata.checkOpinionList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.checkOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="会签意见" prop="signOpinion" ref="signOpinion">
                  <!-- <div v-for="item in fromdata.signOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            resize="none"
                            autosize
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                  </div> -->
                  <el-input
                    type="textarea"
                    maxlength="500"
                    resize="none"
                    autosize
                    v-model="fromdata.signOpinion"
                    disabled
                    v-if="!(fromdata.signOpinionList && fromdata.signOpinionList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.signOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item
                  label="拟稿部门意见"
                  prop="draftDepartmentOpinion"
                  ref="draftDepartmentOpinion"
                >
                  <!-- <div v-for="item in fromdata.draftDepartmentOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            resize="none"
                            autosize
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                  </div> -->
                  <el-input
                    type="textarea"
                    maxlength="500"
                    resize="none"
                    autosize
                    v-model="fromdata.draftDepartmentOpinion"
                    disabled
                    v-if="!(fromdata.draftDepartmentOpinionList && fromdata.draftDepartmentOpinionList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.draftDepartmentOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
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
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            resize="none"
                            autosize
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                  </div> -->
                  <el-input
                    type="textarea"
                    maxlength="500"
                    resize="none"
                    autosize
                    v-model="fromdata.handleSituation"
                    disabled
                    v-if="!(fromdata.handleSituationList && fromdata.handleSituationList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.handleSituationList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              
              <el-col :span="8">
                <el-form-item label="正文字数">
                  <el-input v-model="fromdata.sizeFact" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <template>
              <h6 class="bank_dispach_file_tit">传阅信息</h6>
              <div id="cyxx" class="height_90"></div>
              <el-row class="pr45">
                <!-- <el-col v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Object">
                  <el-form-item label="一次传阅意见">
                    <div>
                      <div
                        class="d_flex"
                        v-if="fromdata.firstOpinions.opinions&&fromdata.firstOpinions.opinions!=''"
                      >
                        <el-row class="d_b100">
                          <el-col :class="['pos_r']">
                            <el-input
                              type="textarea"
                              resize="none"
                              autosize
                              :value="fromdata.firstOpinions.opinions"
                              :disabled="true"
                              rows="3"
                              class="d_f1"
                            ></el-input>
                            <div class="adviceInfo"  style="line-height: 15px;">
                                {{fromdata.firstOpinions.opinionDeptName}}
                                <span class="pad_lr10"> {{fromdata.firstOpinions.currentUser}}</span>
                                <br>
                              {{fromdata.firstOpinions.opinionCreateTime}}
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <el-input
                      type="textarea"
                      resize="none"
                      v-if="Object.keys(fromdata.firstOpinions).length == 0"
                      autosize
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Array">
                  <el-form-item label="一次传阅意见">
                    <div v-for="item in fromdata.firstOpinions" :key="item.id">
                      <div class="d_flex" v-if="item.opinions&&item.opinions!=''">
                        <el-row class="d_b100">
                          <el-col :class="['pos_r']">
                            <el-input
                              type="textarea"
                              resize="none"
                              autosize
                              :value="item.opinions"
                              :disabled="true"
                              rows="3"
                              class="d_f1"
                            ></el-input>
                            <div class="adviceInfo"  style="line-height: 15px;">
                                {{item.opinionDeptName}}
                                <span class="pad_lr10"> {{item.currentUser}}</span>
                                <br>
                              {{item.opinionCreateTime}}
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <el-input
                      type="textarea"
                      resize="none"
                      v-if="fromdata.firstOpinions.length == 0"
                      autosize
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="fromdata.firstOpinions == undefined">
                  <el-form-item label="一次传阅意见">
                    <el-input type="textarea" resize="none" autosize disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Array"
                >
                  <el-form-item label="二次传阅意见">
                    <div v-for="item in fromdata.secondOpinions" :key="item.id">
                      <div class="d_flex" v-if="item.opinions&&item.opinions!=''">
                        <el-row class="d_b100">
                          <el-col :class="['pos_r']">
                            <el-input
                              type="textarea"
                              resize="none"
                              autosize
                              :value="item.opinions"
                              :disabled="true"
                              rows="3"
                              class="d_f1"
                            ></el-input>
                            <div class="adviceInfo"  style="line-height: 15px;">
                                {{item.opinionDeptName}}
                                <span class="pad_lr10">{{item.currentUser}}</span>
                                <br>
                              {{item.opinionCreateTime}}
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-if="fromdata.secondOpinions.length == 0"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Object"
                >
                  <el-form-item label="二次传阅意见">
                    <div
                      class="d_flex"
                      v-if="fromdata.secondOpinions.opinions&&fromdata.secondOpinions.opinions!=''"
                    >
                      <el-row class="d_b100">
                        <el-col :class="['pos_r']">
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
                            :value="fromdata.secondOpinions.opinions"
                            :disabled="true"
                            rows="3"
                            class="d_f1"
                          ></el-input>
                          <div class="adviceInfo"  style="line-height: 15px;">
                              {{fromdata.secondOpinions.opinionDeptName}}
                              <span  class="pad_lr10">{{fromdata.secondOpinions.currentUser}}</span>
                              <br>
                            {{fromdata.secondOpinions.opinionCreateTime}}
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                      v-if="Object.keys(fromdata.secondOpinions).length == 0"
                    ></el-input>
                  </el-form-item>
                </el-col> -->
                
                <el-col v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Object">
									<el-form-item label="一次传阅意见">
										<el-input
											type="textarea"
											resize="none"
											v-if="Object.keys(fromdata.firstOpinions).length == 0"
											autosize
											disabled
										></el-input>
										<opinionText 
                      :opinionText="fromdata.firstOpinions" 
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      :isLength="fromdata.firstOpinions.opinions&&fromdata.firstOpinions.opinions!=''"
                      :isObj="true"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
										></opinionText>
									</el-form-item>
								</el-col> 
								<el-col v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Array">
									<el-form-item label="一次传阅意见">
										<el-input
											type="textarea"
											resize="none"
											v-if="fromdata.firstOpinions.length == 0"
											autosize
											disabled
										></el-input>
                    <opinionText 
											:opinionText="fromdata.firstOpinions" 
											:sendOpinionMaxTime="fromdata.opinionMaxTime"
											:nowUserId="nowUserId"
                      :isArr="true"
											@deletService="deletService"
											:canDelet="false"
											:curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
									</el-form-item>
								</el-col>
                <el-col v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Array">
                  <el-form-item label="二次传阅意见">
                    <el-input type="textarea" resize="none"
                      autosize 
                      v-if="fromdata.secondOpinions.length == 0" 
                      disabled>
                    </el-input>
                    <opinionText 
                      :opinionText="fromdata.secondOpinions" 
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      :isArr="true"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Object">
                  <el-form-item label="二次传阅意见">
                  <el-input type="textarea" resize="none"
                    autosize 
                    v-if="Object.keys(fromdata.secondOpinions).length == 0"
                    disabled></el-input>
                    <opinionText 
                      :opinionText="fromdata.secondOpinions" 
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      :isObj="true"
                      :isLength="fromdata.secondOpinions.opinions&&fromdata.secondOpinions.opinions!=''"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    </el-form-item>
                </el-col>
                
                <el-col>
                  <el-form-item label="传阅说明">
                    <!-- <div v-for="(item) in fromdata.circulateExplainList" :key="item.id">
                      <div  class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
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
                        </el-row>
                      </div>
                    </div> -->
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-if="fromdata.circulateExplainList==''||!fromdata.circulateExplainList"
                      disabled
                    ></el-input>
                    <opinionText 
                    :opinionText="fromdata.circulateExplainList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="备    注">
                    <!-- <div v-for="(item) in fromdata.remarkList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
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
                        </el-row>
                      </div>
                    </div> -->
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-if="fromdata.remarkList==''||!fromdata.remarkList"
                      disabled
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

                <el-col>
                  <el-form-item label="传阅人员">
                    <el-row>
                      <el-col class="m10">
                        <el-form-item
                          label="一次传阅人"
                          prop="firstCirculateHumans"
                          ref="firstCirculateHumans"
                        >
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
                            v-model="fromdata.firstCirculateHumans"
                            :disabled="true"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="m10">
                        <el-form-item
                          label="二次传阅人(未阅)"
                          prop="WBJSecondCirculate"
                          ref="WBJSecondCirculate"
                        >
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
                            v-model="fromdata.WBJSecondCirculate"
                            :disabled="true"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="m10">
                        <el-form-item
                          label="二次传阅人(已阅)"
                          prop="YBJSecondCirculate"
                          ref="YBJSecondCirculate"
                        >
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
                            v-model="fromdata.YBJSecondCirculate"
                            :disabled="true"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>

                <el-col >
                  <el-form-item label="传阅意见" prop="opinions" ref="opinions">
                    <el-input
                      type="textarea"
                      v-model="fromdata.opinions"
                      resize="none"
                      maxlength="500"
                      autosize
                      disabled
                    ></el-input>
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
                        v-for="(item, index) in fromdata.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <!-- 预览 -->
                            <span
                              class="down"
                              :title="item.fileName"
                               @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.qbglfj)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
                            <div class="btns">
                              <!-- <el-button
                                type="primary"
                                size="mini"
                                @click.native="upRow(index)"
                                v-if="fromdata.attchmentFileInfo.length>1"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index)"
                                v-if="fromdata.attchmentFileInfo.length>1"
                                :disabled="index==fromdata.attchmentFileInfo.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id)"
                                :disabled="item.disabled"
                                round
                              >删除</el-button>-->
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

    <!-- 退回重报 -->

    <!-- <el-dialog v-dialogDrag  title="修改重报" :visible.sync="xgCbdialog" width="60%" class="xiugaicb">
      <p class="xuanzTh">选择退回环节</p>
      <el-scrollbar>
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="false"
          :isHandle="false"
          :isSingelCheck="true"
          :tableData="tableDataCb"
          :tableCols="tableColsCb"
          @handleTemplateRadio="handleChongBRadio"
          v-loading="tableLoading"
        ></m-table>
      </el-scrollbar>
      <el-dialog v-dialogDrag 
        title="请选择修改重报环节"
        width="30%"
        :visible.sync="doUpdateAgainSenddialog"
        append-to-body
      >
        <span>请选择修改重报环节</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="doUpdateAgainSenddialog = false">取消</el-button>
          <el-button type="primary" @click="doUpdateAgainSenddialog = false">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-dialogDrag  title="确定修改重报环节" width="30%" :visible.sync="doUpdateSuredialog" append-to-body>
        <span>是否退回{{doUpdateAgainSend.nextUserName}}{{doUpdateAgainSend.nextNodeName}}环节重新处置</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="doUpdateSuredialog = false">取消</el-button>
          <el-button type="primary" @click="xiuGchongBdialog">确定</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xgCbdialog = false">取 消</el-button>
        <el-button type="primary" @click="sureXiuGcb">确 定</el-button>
      </span>
    </el-dialog>-->

    <el-dialog v-dialogDrag  :title="dialogTuiWenTit" :visible.sync="tuiWendialog" width="60%">
      <div class="tui_wen_content">
        <div class="tui_wen_left">
          <p class="tui_wen_list">选择退回环节</p>
          <el-scrollbar>
            <m-table
              size="medium"
              :isSelection="false"
              :isIndex="true"
              :isPagination="false"
              :isHandle="false"
              :isSingelCheck="true"
              :tableData="tableData"
              :tableCols="tableCols"
              @handleTemplateRadio="handleTemplateRadio"
              v-loading="tableLoading"
            ></m-table>
          </el-scrollbar>
        </div>
        <div class="tui_wen_right">
          <p class="tui_wen_list">选择退回原因</p>
          <el-checkbox-group v-model="tuiwen">
            <el-checkbox
              v-for="item in tuiwenyy"
              :label="item.label"
              :key="item.label"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
          <p class="tui_wen_list">其他原因</p>
          <el-input
            type="textarea"
            v-model="tuiwenyuanyin"
            maxlength="500"
            resize="none"
            autosize
            placeholder="请输入退回原因"
          ></el-input>
        </div>
      </div>
      <el-dialog v-dialogDrag  title="请选择上级行单位" width="30%" :visible.sync="innertuiWendialog" append-to-body>
        <span>请选择上级行单位</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innertuiWendialog = false">取消</el-button>
          <el-button type="primary" @click="innertuiWendialog = false">确定</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tuiWendialog = false">取 消</el-button>
        <el-button type="primary" @click="sureTuiWen">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-dialogDrag  :title="dialoghuiqianTit" :visible.sync="shdialog" width="50%">
      <el-card class="dialog_regain">
        <!-- <h6>选择要收回的会签部门</h6> -->
        <el-checkbox-group v-model="checkedsh" @change="checkouthuiqian">
          <el-checkbox
            v-for="(item,index) in shData"
            :label="item.deptName"
            :key="index"
            :disabled="item.processState == '已处理' || item.processState == '处理中'"
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
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :fixNoLoadingTree="fixNoLoadingTree"
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
      :orgId="orgId"
    ></treeCofig>

    <treeCofigForCy
      :treeData="treeData"
      :isCyPage="true"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :checkIds="checkIds"
      :orgId="orgId"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      :scircularizeLevel="scircularizeLevel"
      @showCompDialog="showCompDialogForCy"
      :treeTradeCode="treeTradeCode"
      :fromdata="fromdata"
      
    ></treeCofigForCy>

    <!--传阅常用联系人修改 12.21-->
    <el-dialog v-dialogDrag  title="操作" :visible.sync="shdialog2" width="50%">
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

    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls>

    <!--签报依据-->
    <el-dialog v-dialogDrag  title="增加签报依据" class="dialogImport" :visible.sync="showImport">
      <el-row>
        <el-form label-width="130px">
          <el-form-item label="依据文件类型">
            <el-col>
              <el-select v-model="bankImport" style="width: 75%">
                <!-- <el-option value="请选择"></el-option> -->
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
    <el-dialog v-dialogDrag  title="查看依据文件" :visible.sync="showImportList">
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
                <el-button type="text" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.qbglfj)">{{item.sort+'. '+item.fileName}}</el-button>
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
  </div>
</template>
<script>
import uploadFiles from "@/components/uploadFile/uploadFile";
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import mTable from "@/components/table/mTable.vue";
import minixs from "@/minixs/index";
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable"; // 收藏
import opinionText from "@/components/opinionText/index";
import treeCofigForCy from "@/components/tree/tree-cy";
import viewDraft from "@/minixs/viewDraft";
import signquoteIndex from "@/minixs/signquoteIndex";
const finshData = [
  { label: "处理环节", prop: "nextNodeName", align: "center" },
  { label: "处理人名称", prop: "nextUserName", align: "center" },
  { label: "处理时间", prop: "completeTime", align: "center" }
];

const xiugaiCbFinshData = [
  { label: "处理环节", prop: "nextNodeName", align: "center" },
  { label: "处理人名称", prop: "nextUserName", align: "center" }
];
export default {
  name: "circularizeWaitFkh",
  components: {
    uploadFiles,
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    mTable,
    treeCofigForCy,
    opinionText
  },
  mixins: [minixs,viewDraft,signquoteIndex],
  data() {
    return {
      nowUserId: "", //当前用户id
      directTitle: "中国建设银行",
      firstOp: "",
      orgId:"",
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      seletOptionsDataForCy: [],
      treeTradeCode: "",
      cyper: "",
      cyid: "",
      scircularizeLevel: "1", //传阅常用联系人修改 12.21
      sequenceFlag: false, //会签/协办是否按顺序发送部门置灰
      //全选备注2
      checkAll: false,
      isIndeterminate: true, //全选备注3

      //是否返回上一处理人
      handeldoBacksyclr: false,
      returnBeforeHuman: {
        function: "returnBeforeHuman",
        tplbsnid: "DZQB"
      },
      //套红文件
      bank_findTemplete: {
        function: "findTemplete",
        // sendType: "",
        redHead: ""
      },

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
        knowScore: false,
        secretGists: false,
        sendBasis: false,
        signDepartmentName: false,
        finishSignDepartmentName: false,
        attachTitle: false,
        sizeFact: false,
        exceedWordReason: false
        // circulatePersonNames: false
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
        knowScore: false,
        secretGists: false,
        sendBasis: false,
        signDepartmentName: false,
        finishSignDepartmentName: false,
        attachTitle: false,
        sizeFact: false,
        exceedWordReason: false
        // circulatePersonNames: false
      }, //必填控制域
      editedIdeaFields: {
        approvalOpinion: true,
        checkOpinion: true,
        signOpinion: true,
        draftDepartmentOpinion: true,
        remark: true,
        handleSituation: true
      }, //可编辑意见域
      requiredIdeaFields: {
        approvalOpinion: false,
        checkOpinion: false,
        signOpinion: false,
        draftDepartmentOpinion: false,
        remark: false,
        handleSituation: false
      }, //必填意见域
      buttonList: [
        { name: "保存", type: "btn_bc", show: false }, //一直都有
        { name: "办结", type: "btn_banjie", show: false }, //综合环节有          批示意见无值的话进行校验 出提示
        { name: "完成并发送", type: "btn_wcbfs", show: false }, //一直都有
        { name: "发会签部门", type: "btn_fhqbm", show: false }, //综合环节有      会签有值判断
        { name: "返回上一处理人", type: "btn_fhsyclr", show: false }, //行领导批示
        // { name: "收回", type: "btn_sh", show: false },// 在已办有
        { name: "查看会签状态", type: "btn_ckhqzt", show: false },
        { name: "退回修改", type: "btn_thui", show: false }, //   办公室核稿有
        { name: "退回重报", type: "btn_thCBao", show: false }, //signCbao 退回重报 btn_thCBao
        // { name: "发送传阅人", type: "btn_cy", show: false },

        { name: "生成文号", type: "btn_scwh", show: false }, //综合环节       总收发有（跨行）
        { name: "退号", type: "btn_thao", show: false }, //综合环节       总收发有（跨行）
        { name: "合成格式", type: "btn_hcgs", show: false }, //综合环节       总收发有（跨行）
        { name: "起草正文", type: "btn_qczw", show: false }, // 起草环节有
        { name: "处理正文", type: "btn_clzw", show: false }, //一直都有        起草正文与处理正文不能同时出现
        { name: "查看正文", type: "btn_ckzw", show: false }, //一直都有        起草正文与查看正文不能同时出现
        { name: "删除此文", type: "btn_sccw", show: false }, //只在起草的时候有
        { name: "收藏", type: "btn_sc", show: false }, //一直都有
        { name: "查看流程", type: "btn_cklc", show: false }, //一直都有
        { name: "打印处理单", type: "btn_dycld", show: false }, //一直都有
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

      //查看会签状态
      getSubProcessInfoFuc: {
        function: "getSubProcessInfo",
        processInstId: "",
        tplbsnid: "DZQB_HQ"
      },
      //查看会签状态
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
        { label: "完成时间", prop: "AVYEXCTRTM", align: "center" },
        { label: "状态", prop: "NODENAME", align: "center" }
      ],
      tableData1: [],
      // 生成文号/退号/生成上年文号
      doSaveDocumentNumFuc: {
        function: "doSaveDocumentNum",
        redHead: "",
        year: "",
        type: "CN002",
        num: ""
      },

      getNumListForm: {
        function: "getNumList",
        redHead: "",
        type: "CN002",
        year: ""
      },
      docNoYear: "",
      docNoNum: "",
      DocNoDataList: [],
      SetDocNoVisible: false,
      setDocNum: "",

      //退号
      doBackNoFuc: {
        function: "doBackNo",
        redHead: "",
        year: "",
        type: "CN002",
        num: ""
      },
      handeldoBackNoFuc: false,

      //收回
      sendTackVisible: false,
      sendTackFuc: {
        function: "doWithdrawTask"
      },
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        attachTitle: "", //附件标题
        subTempAddF: true //是否可以上传附件 true是不能上传   false是可以上传
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
      //退文原因
      tuiwenyuanyin: "",
      //退文选择原因
      tuiwenyy: [
        {
          label: "文档格式不正确"
        },
        {
          label: "文档内容不清晰"
        }
      ],
      // 退文选择原因checkbox
      tuiwen: [],
      tableLoading: false,
      //退文环节列表
      tableData: [],
      tableCols: finshData,
      //退文
      getBackHistory: {
        function: "getBackHistory",
        processInstId: ""
      },
      //退文确定
      backSureTuiWen: {
        function: "doQianbaoBack",
        multiTenancyId: "",
        tplNo: "",
        pcsAvyId: "",
        processInstId: "",
        curNodeCode: "",
        curUserId: "",
        curUserName: "",
        nextNodeCode: "",
        nextUserId: "",
        nextUserName: ""
      },

      //发会签部门
      createSighWf: {
        function: "createSighWf",
        deptIds: "",
        deptNames: "",
        avyds: "发送会签部门"
      },
      //办结
      banjiedispatch: {
        function: "doFinish",
        // multiTenancyID: "", // parm.getString("multiTenancyId");
        tplNo: "", // parm.getString("tplNo");
        pcsAvyId: "", // parm.getString("pcsAvyId");
        processInstId: "", // parm.getString("processInstId");
        moduleType: "qb_etc", // parm.getString("moduleType");
        curNodeCode: ""
      },
      deleteToQianbaoEntityById: {
        function: "deleteToQianbaoEntityById",
        id: ""
      },
      //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      //xiaoM  会签部门
      bank_mmainXiao: {
        function: "selUnitTreeByHQ",
        flag: true
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
      bank_toQianbaoSend: {
        function: "toQianbaoSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
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
        function: "selectById",
        id: "",
        mainDocId: "",
        multiTenancyId: "",
        isSystem:1
      },
      //下拉框列表
      bank_dispachfile: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      //提交
      doSaveOrUpdateCY: {
        function: "doSaveOrUpdateCY",
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
        // function: "selectById",
        title: "",
        submittedName: "",
        handleTypeName: "0",
        phone: "",
        emergencyLevelName: "",
        qianBaoTypeName: "",
        qianbaoCode: "",
        documentNo: "",
        draftTime: "",
        draftDepartmentName: "",
        draftUserName: "",
        sendBasis: "",
        secretGists: "",
        signDepartmentName: "",
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
        knowScore: "",
        handleSituation: "",
        sizeFact: "",
        processInstId: "", //流程实例标识
        tplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        attachSort: [],
        attchmentFileInfo: [],
        sizeLimit: "", //正文字数超限原因
        circulatePersonNames: "", //传阅人
        opinions: "",
        firstOpinions: "",
        circulateExplain:'',
        circulateExplainList:[]
      },
      SemergencyLevel: [],
      SqbZihaoList: [],
      SqianbaoType: [],
      SsecretType: [],
      SsecretFlag: [],
      SsecretLimit:[],
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
            trigger: ["change", "blur"],
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
      copyRules: {},
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },
      SSsecretLimitType: [],
      imageUrl: "",
      fileList: [],
      tableData: [],
      timeShow: false, //查看流程
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      cyCheckData: [], //传阅选中数据
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
      setradio: "1", //默认为 是 按照顺序
      dialogVisible: false, // 定密依据
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id

      dialogTuiWenTit: "退回",
      tuiWendialog: false,
      innertuiWendialog: false,

      // 会签部门增发,
      sendXbSuccess: false,
      addSendType: "",
      showHQ: false,
      shdialog: false, // 收回弹窗
      shData: [], // 收回数据
      checkedsh: [], // 收回列表
      checkeddq: [], // 读取的值
      // ggqbgl: "A08462023", // 收回交易线
      typeofHQBM: "",
      dialoghuiqianTit: "收回",

      //已读未读
      readFlag: "",

      isProcessInstId: "",
      isMultiTenancyId: "",
      //生成文号标识
      fieldStatusMap: false,
      isSignFinish: false, //判断是否能够继续完成并发送
      qicaozw: false,
      chulizw: false,
      chakanzw: false,
      hechengzw: false,
      tuihaoFlag: false, //退号按钮的显示隐藏
      shengchengFlag: false,
      signStateFlag: false, //会签状态
      banjieFlag: false, // 办结

      //拟稿部门意见
      nigaobumenFlag: false,

      //判断环节
      isHasRedHead: false,
      bgsShenH: false,

      //退文原因   正文起草弹窗
      zhengWTS: false,
      //正文字数超限弹窗提示
      chaoChuTiS: false,
      //具体原因不少于10个字提示
      juTiYY: false,
      //下一处理人进行超限提示
      shangYCLRjtyy: false,

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
        }
      ],
      documentCode: "〔〕号",
      importDataArr: [],
      bank_import: {},

      //修改重报
      xgCbdialog: false,
      doUpdateAgainSenddialog: false,

      // 修改重报原因checkbox
      tuiwen: [],
      tableLoading: false,
      //修改重报列表
      tableDataCb: [],
      tableColsCb: xiugaiCbFinshData,
      //修改重报
      getBackHistory: {
        function: "getBackHistory",
        processInstId: ""
      },
      //修改重报确定
      doUpdateAgainSend: {
        function: "doUpdateAgainSend",
        multiTenancyId: "",
        tplNo: "",
        pcsAvyId: "",
        processInstId: "",
        curNodeCode: "",
        curUserId: "",
        curUserName: "",
        nextNodeCode: "",
        nextUserId: "",
        nextUserName: ""
      },

      // doUpdateSuredialog: false,
      // shdialog1: false, //收回弹窗

      //传阅
      firstData: {}, // 第一次传阅
      isCY: "",
      dialogVisibleShouuhi: false, //收回确定弹窗
      shdialog1: false,
      shdialog2: false,
      shData: [],
      treeTradeCode: "", //完成并发送  树  拆
      unitId: this.$route.query.unitId
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
    async maintenance(){
      let data={
          id: this.$route.query.id,
          orderType: decodeURIComponent(this.$route.query.orderType),
          title: '中国建设银行电子签报传阅单'
        }
        let obj1=await this.$post.postData(
            "queryQianbaoCirculateInfoById",
            JSON.stringify(Object.assign(data,{function :"queryQianbaoCirculateInfoById",multiTenancyId:this.fromdata.multiTenancyId, unitId: this.unitId})),this.$businessCode.qbgl
          ).then(res => {
            return res&&res.data||[];
          })
          .catch(err => {
            console.log(err);
        });
        let obj2=await this.$post.postData(
            "selectQianbaoSysOpinion",
            JSON.stringify(Object.assign(data,{function :"selectQianbaoSysOpinion",tableType:"chuanyue",multiTenancyId:this.fromdata.multiTenancyId, unitId: this.unitId})),this.$businessCode.qbgl
          ).then(res => {
            return res&&res.data||[];
          })
          .catch(err => {
            console.log(err);
        });

        let obj3=await this.$post.postData(
            "selectSysQianbaoFile",
            JSON.stringify(Object.assign(data,{function :"selectSysQianbaoFile",id: this.$route.query.id,tableType:"chuanyue", unitId: this.unitId})),this.$businessCode.qbgl
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });

        // if(obj1&&obj2){
          const routeData = this.$router.resolve({
              path: "/maintainFilesQb",
              query: {
                id: this.$route.query.id,
                type:'qb',
                sign: 5,
                selectUrl: 'selectById',
                title:this.directTitle,
                tableType:"chuanyue",
                orderType:decodeURIComponent(this.$route.query.orderType),
                multiTenancyId:this.fromdata.multiTenancyId, 
                unitId: this.unitId,
                curNodeCode: this.fromdata.curNodeCode, 
                mainPage: false,
                choseYear:this.$route.query.choseYear
                  // tplbsnid:'KHQB_HQ'
              }
            });
          sessionStorage.setItem("fileObj",JSON.stringify(obj1))
          sessionStorage.setItem("suggessObj",JSON.stringify(obj2))
          sessionStorage.setItem("attachObj",JSON.stringify(obj3))
          window.open(routeData.href, "_blank");
        // }
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype, infoCy) {
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
          if (this.addSendType == "1") {
            oldIds = this.fromdata.circulatePersonIds.split(";");
            oldNames = this.fromdata.circulatePersonNames.split(";");
            // newIds = ids.filter(item => {
            //   return oldIds.indexOf(item) == -1;
            // });
            // newNames = names.filter(item => {
            //   return oldNames.indexOf(item) == -1;
            // });
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
        this.fromdata.circulateExplain = infoCy;
        if (this.addSendType == "1") {
          this.sendCy(newIds, newNames);
        }
        if (this.addSendType != "1" && dtype == "cy") {
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
    getTreeDataForCy(n, m) {
      if (n == "cy") {
        this.isCY = true;
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
      if (n == "cy" && m == "1") {
        this.dialogTypeNowForCy = "zengfa";
      }
      switch (n) {
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      this.showCompDialogForCy();
      if (m == 1) {
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
      this.fromdata.curUserId = this.fromdata.currentUserId;
      this.$post
        .postData(
          "selectUserByCirculate", //传阅常用联系人修改 12.21
          JSON.stringify({
            function: "selectUserByCirculate", //传阅常用联系人修改 12.21
            level: this.scircularizeLevel, //传阅常用联系人修改 12.21
            flag: true,
            unitCode:this.fromdata.deptId,
            unitId: this.unitId
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
              console.log(item);
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
    attachTitleHandel() {
      if (this.fromdata.attachTitle) {
        this.preserve();
      }
    },

    //退回重报
    handleCBao() {
      this.xgCbdialog = true;
      //退文列表展示
      this.$post
        .postData(
          "getBackHistory",
          JSON.stringify(this.getBackHistory),
          this.$businessCode.qbgl
        )
        .then(res => {
          console.error(res.data);
          this.tableDataCb = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //退文列表选中
    handleChongBRadio(val) {
      this.doUpdateAgainSend.nextNodeCode = val.nextNodeCode;
      this.doUpdateAgainSend.nextNodeName = val.nextNodeName;
      this.doUpdateAgainSend.nextUserId = val.nextUserId;
      this.doUpdateAgainSend.nextUserName = val.nextUserName;
    },
    //退文点击确定
    sureXiuGcb() {
      if (
        !this.doUpdateAgainSend.nextNodeCode &&
        !this.doUpdateAgainSend.nextNodeName &&
        !this.doUpdateAgainSend.nextUserId &&
        !this.doUpdateAgainSend.nextUserName
      ) {
        this.doUpdateAgainSenddialog = true;
      } else {
        this.doUpdateSuredialog = true;
      }
    },

    xiuGchongBdialog() {
      // this.doUpdateAgainSend.backExplain = this.tuiwenyuanyin;
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      delete parseList.circulationList;
      delete parseList.handleSituationList;
      var obj = Object.assign(this.doUpdateAgainSend, parseList);
      obj.unitId = this.unitId;
      this.$post
        .postData(
          "doUpdateAgainSend",
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
              duration: 1500,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "退回失败",
              duration: 1500
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
            duration: 1500
          });
        });
    },

    //获取超限原因
    // qianbaoNum(value) {
    //   let a = value;
    //   for (let j = 0; j < this.SqbZihaoList.length; j++) {
    //     if (this.SqbZihaoList[j].label == a) {
    //       console.log(this.SqbZihaoList[j].value);
    //       this.fromdata.sizeLimit = this.SqbZihaoList[j].value;
    //     }
    //   }
    // },

    //超出正文字数提示  按钮修改
    // chaoChuTiSXiuG() {
    //   this.chaoChuTiS = false;
    //   this.drafting("2");
    // },

    //超出正文字数提示  按钮说明原因
    // chaoChuTiSYuanY() {
    //   this.chaoChuTiS = false;
    //   this.$refs.exceedWordReason.$el.scrollIntoView({
    //     block: "center",
    //     behavior: "smooth"
    //   });

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
      delete parseList.remarkList;
      delete parseList.circulationList;
      delete parseList.handleSituationList;
      var obj = Object.assign(this.returnBeforeHuman, parseList);
      this.returnBeforeHuman.unitId = this.unitId;
      this.$post
        .postData(
          "returnBeforeHuman",
          JSON.stringify(this.returnBeforeHuman),
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
                window.opener.location.reload();
                window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1000
          });
        });

      this.handeldoBacksyclr = false;
    },

    //套红操作
    async findTemplete(file) {
      let fileInfoTh = {
        state: false,
        templateUrl: "", //套红路径
        fileName: file.fileName,
        filePath: file.filePath
      };
      // this.bank_findTemplete.sendType = this.fromdata.type;
      this.bank_findTemplete.redHead = this.fromdata.qianbaoCode;
      this.bank_findTemplete.id = getFormId(
        this.$route.query.id,
        "sfkhSignpageid"
      );
      this.bank_findTemplete.unitId = this.unitId;
      await this.$post
        .postData(
          "findTemplete",
          JSON.stringify(this.bank_findTemplete),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            if (res.data) {
              fileInfoTh.templateUrl = res.data;
            }
            fileInfoTh.state = true;
            this.getFileInfo(this, fileInfoTh).then(template => {
              if (template.state) {
                this.doDraft(template);
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "请先上传模板",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请先上传模板",
            duration: 1000
          });
        });
    },
    //请求文件路径
    async getFileInfo(self, thInfo) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = thInfo
        ? thInfo.templateUrl.fileName
        : self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo
        ? thInfo.templateUrl.filePath
        : self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.qbglfj
        )
        .then(res => {
          if (res && res.success) {
            if (thInfo) {
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            } else {
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "获取文件失败",
              duration: 1500
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取文件失败",
            duration: 1000
          });
          successInfo.state = false;
        });
      return successInfo;
    },

    //起草正文字数提示
    qiCaoNum() {
      if (!this.fromdata.qianbaoCode) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请先选择签报字号",
          duation: 1500
        });
        return;
      } else {
        this.zhengWTS = true;
      }
    },
    qiCaoNumClose() {
      this.zhengWTS = false;
      this.drafting("1");
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
      if (!getFormId(this.$route.query.id, "sfkhSignpageid")) {
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
          this.showDraft = true;
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
    doDraft(fileInfo,saveName) {
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
          id: getFormId(this.$route.query.id, "sfkhSignpageid"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.qbglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          tmpFileName: fileInfo ? fileInfo.fileNameTh : "",
          tmpFilePath: fileInfo ? fileInfo.filePathTh : "",
          pageFlag: "signquote",
          taoHongFlag: fileInfo && fileInfo.fileNameTh ? true : false,
          showBtns: this.zhengWenState == 0 ? false : true,
          stepsNowName: this.fromdata.curNodeName,
          flowTranId: this.$businessCode.qbgl, //流程交易线    chai
          saveSpecialFileName:str,
          unitId: this.unitId
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },

    //查看会签状态
    handleHuiqianState() {
      this.ckhqzt = true;
      this.getSubProcessInfoFuc.processInstId = this.fromdata.processInstId;
      this.getSubProcessInfoFuc.unitId = this.unitId;
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
          this.judgeSend();
          break;
        // 发会签部门
        case "btn_fhqbm":
          this.handleSendHQPtmt();
          break;
        // 查看会签状态
        case "btn_ckhqzt":
          this.handleHuiqianState();
          break;
        //返回上一处理人
        case "btn_fhsyclr":
          this.handelBacksyclrBtn();
          break;
        //收回
        case "btn_sh":
          this.sendTackBtn();
          break;
        //退回
        case "btn_thui":
          this.signBack();
          break;
        //signCbao 退回重报 btn_thCBao
        case "btn_thCBao":
          this.handleCBao();
          break;
        //生成文号
        case "btn_scwh":
          this.handleSetDocNo();
          break;
        //退号
        case "btn_thao":
          this.handleClearDocNo();
          break;
        //传阅
        case "btn_cy":
          if (this.fromdata.isHasCY == 1) {
            this.bankmain("cy", 1);
          } else {
            this.bankmain("cy");
          }
          break;
        //合成格式   套红
        case "btn_hcgs":
          this.drafting("taoHong");
          break;
        //起草正文
        // case "btn_qczw":
        //   this.drafting("1");
        //   break;

        case "btn_qczw":
          this.qiCaoNum();
          break;
        //处理正文
        case "btn_clzw":
          this.drafting("2");
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
          this.shoucang();
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
      // if (JSON.parse(localStorage.getItem('userInfo')).humanName === this.formdata.draftUser && this.$route.query.id) {//当前处理人为拟稿人 删除按钮
      //     this.buttonList[this.buttonList.length - 1].show = true
      // }
      // this.showNextNodes = this.shoNextNode(
      //   this.seletOptionsData,//整个需要返回的环节
      //   this.showHj//约束条件的环节
      // )//带约束条件的环节
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
          documentNo: [
            {
              required: this.requiredFields.documentNo,
              trigger: "change",
              message: "请输入签报字号"
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
              trigger: "blur",
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
              trigger: ["change", "blur"],
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
          knowScore: [
            {
              required: this.requiredFields.knowScore,
              trigger: "change",
              message: "请输入知悉范围"
            }
          ],
          secretGists: [
            {
              required: this.requiredFields.secretGists,
              trigger: "change",
              message: "请输入定密依据"
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
              message: "请选择会签部门"
            }
          ],
          finishSignDepartmentName: [
            {
              required: this.requiredFields.finishSignDepartmentName,
              trigger: "change",
              message: "请输入已完成的会签部门"
            }
          ],
          attachTitle: [
            {
              required: this.requiredFields.attachTitle,
              trigger: "change",
              message: "请输入附件名称"
            }
          ],
          approvalOpinion: [
            {
              required: this.requiredIdeaFields.approvalOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          checkOpinion: [
            {
              required: this.requiredIdeaFields.checkOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          signOpinion: [
            {
              required: this.requiredIdeaFields.signOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          draftDepartmentOpinion: [
            {
              required: this.requiredIdeaFields.draftDepartmentOpinion,
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
          handleSituation: [
            {
              required: this.requiredIdeaFields.handleSituation,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          sizeFact: [
            {
              required: this.requiredIdeaFields.sizeFact,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          exceedWordReason: [
            {
              required: this.requiredIdeaFields.exceedWordReason,
              message: "请说明具体原因，不能少于10个字",
              trigger: "blur"
            }
          ]
        };

        // if (
        //   this.fromdata.secretType == "国家秘密" ||
        //   this.fromdata.secretType == "商业秘密" ||
        //   this.fromdata.secretType == "工作秘密"
        // ) {
        //   this.rules.secretGists[0].required = true;
        //   this.$forceUpdate();
        // } else {
        //   this.rules.secretGists[0].required = false;
        //   this.$refs.fromdata.clearValidate();
        //   this.$forceUpdate();
        // }
      });

      this.$forceUpdate();
    },

    //生成文号
    SetDocNoHandle() {
      const [stra, strb] = this.setDocNum.split("-");
      this.doSaveDocumentNumFuc.num = stra;
      this.doSaveDocumentNumFuc.redHead = this.getNumListForm.redHead;
      this.doSaveDocumentNumFuc.year = this.getNumListForm.year;
      this.doSaveDocumentNumFuc.unitId = this.unitId;
      this.$post
        .postData(
          "doSaveDocumentNum",
          JSON.stringify(this.doSaveDocumentNumFuc),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.fromdata.documentNo =
            "〔" +
            this.getNumListForm.year +
            "〕" +
            this.doSaveDocumentNumFuc.num +
            "号";
          this.preserve();
          // this.selectById();
        });
      this.SetDocNoVisible = false;
    },
    // 生成文号/退号/生成上年文号
    handleSetDocNo() {
      this.SetDocNoVisible = true;
      var day = new Date();
      var str = day.getFullYear();
      this.getNumListForm.redHead = this.fromdata.qianbaoCode;
      this.getNumListForm.year = str;
      this.getNumListForm.unitId = this.unitId;
      this.$post
        .postData(
          "getNumList",
          JSON.stringify(this.getNumListForm),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.DocNoDataList = res.data;
          this.setDocNum = Object.values(res.data)[0].split(";")[0] + "-0";
          this.$forceUpdate();
        });
    },

    //退号弹窗
    handleClearDocNo() {
      this.handeldoBackNoFuc = true;
    },
    //确定退号
    doBackNoHandle() {
      this.doBackNoFuc.redHead = this.fromdata.qianbaoCode;
      this.doBackNoFuc.year = this.fromdata.documentNo.slice(1, 5);
      this.doBackNoFuc.num = this.fromdata.documentNo.split("〕")[1];
      this.doBackNoFuc.num = this.doBackNoFuc.num.slice(0, -1);
      this.doBackNoFuc.unitId = this.unitId;
      this.$post
        .postData(
          "doBackNo",
          JSON.stringify(this.doBackNoFuc),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "退号成功",
              duration: 1000
            });

            this.fromdata.documentNo =
              "〔" + this.doBackNoFuc.year + "〕" + "号";
            this.preserve();
            // this.selectById();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "退号失败",
              duration: 1000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "退号失败",
            duration: 1000
          });
        });
      this.handeldoBackNoFuc = false;
    },

    //收回
    sendTackBtn() {
      this.sendTackVisible = true;
    },
    //收回弹窗确定操作
    sendTackHandle() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      delete parseList.circulationList;
      delete parseList.handleSituationList;
      var obj = Object.assign(this.sendTackFuc, parseList);
      obj.unitId = this.unitId;
      this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify(obj),
          this.$businessCode.ggqbgl
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
                window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "收回失败",
              duration: 1000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "收回失败",
            duration: 1000
          });
        });
      this.sendTackVisible = false;
    },
    //退文列表展示
    signBack() {
      this.tuiWendialog = true;
      this.getBackHistory.unitId = this.unitId;
      this.$post
        .postData(
          "getBackHistory",
          JSON.stringify(this.getBackHistory),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //退文列表选中
    handleTemplateRadio(val) {
      this.backSureTuiWen.nextNodeCode = val.nextNodeCode;
      this.backSureTuiWen.nextNodeName = val.nextNodeName;
      this.backSureTuiWen.nextUserId = val.nextUserId;
      this.backSureTuiWen.nextUserName = val.nextUserName;
    },
    //退文点击确定
    sureTuiWen() {
      if (
        !this.backSureTuiWen.nextNodeCode &&
        !this.backSureTuiWen.nextNodeName &&
        !this.backSureTuiWen.nextUserId &&
        !this.backSureTuiWen.nextUserName
      ) {
        this.innertuiWendialog = true;
      }
      this.backSureTuiWen.backExplain = this.tuiwenyuanyin;
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      delete parseList.circulationList;
      delete parseList.handleSituationList;
      var obj = Object.assign(this.backSureTuiWen, parseList);
      obj.unitId = this.unitId;
      this.$post
        .postData("doQianbaoBack", JSON.stringify(obj), this.$businessCode.qbgl)
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
                window.opener.location.reload();
                window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "退回失败",
              duration: 1000
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
            duration: 1000
          });
        });
    },

    //办结
    concludematter() {
      if (this.fromdata.qianBaoTypeName !== "部内签报") {
        if (!this.fromdata.approvalOpinionList) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请输入批示意见",
            duration: 1000
          });
          return;
        }
      }

      if (this.isSignFinish == "0") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "还有未办结的会签部门",
          duration: 1000
        });
        return;
      }

      // this.preserve();
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      delete parseList.circulationList;
      delete parseList.handleSituationList;
      var obj = Object.assign(this.banjiedispatch, parseList);
      obj.unitId = this.unitId;
      this.$post
        .postData("doFinish", JSON.stringify(obj), this.$businessCode.ggqbgl)
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
                window.close();
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
            duration: 1000
          });
        });
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.bank_deletToSendOrder.unitId = this.unitId;
      this.$post
        .postData(
          "deleteOpinionById",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            // this.selectById();
            this.selectById();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "删除失败",
            duration: 1000
          });
        });
    },

    //会签部门弹框
    bankmain(n, state) {
      let name = "";
      this.checkOrg = false;
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
          name = "会签";
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
      this.treeData = [];
      this.dialogType = n;
      this.loadingTree = false;
      this.fixNoLoadingTree = true;
      if (n === "hui") {
        this.hasRadio = true;
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
      }
      this.showCompDialog();
      this.bank_mmainXiao.unitId = this.unitId;
      if (n === "hui") {
        this.$post
          .postData(
            "selUnitTreeByHQ",
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
      } else if (n == "cy") {
        this.$post
          .postData(
            "selectUserByUnitTreeCY",
            JSON.stringify({
              function: "selectUserByUnitTreeCY",
              unitCode: "",
              flag: true,
              unitId: this.unitId
            }),
            this.$businessCode.ggqbgl
          )
          .then(res => {
            // this.loadingTree = false;
            if (res.message == "Loading") {
              this.loadingTree = true;
            } else {
              this.loadingTree = false;
            }
            this.treeData = (res && res.data) || [];
          });
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype, radio) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        let userBuMen = JSON.parse(localStorage.getItem("userInfo")).currUnitId;
        that.checkIds = [];
        if (data.length) {
          //判断下一处理环节是否是综合处理     当前环节是否是综合处理  是否生成文号   进行提示请先生成文号
          //           if (params.name == "综合处理" && this.fromdata.curNodeName== "综合处理" && (this.fieldStatusMap != "1")) {
          // // 未合成格式时，判断下一环节选中的人的部门 与 拟稿部门  不一致时点击确定时弹出提示 “未生成文号、合成格式，无法发送其他部门”
          //             if (userBuMen != data[0].unitName) {
          //               //不是同一部门
          //               this.$message({
          //                 type: "error",
          //                 offset: 400,
          //                 showClose: true,
          //                 message: "请先生成文号",
          //                 duration: 1000
          //               });
          //               this.dialogState = false;
          //               return;
          //             }
          //           }
          let buMenName = "";
          buMenName =
            (data[0].unitCode &&
              data[0].unitCode.split("#") &&
              data[0].unitCode.split("#")[1]) ||
            "";
          // console.log(buMenName)
          if (!this.isHasRedHead && userBuMen != buMenName && buMenName) {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "未生成文号、合成格式，无法发送其他部门",
              duration: 1000
            });
            this.dialogState = false;
            return;
          }

          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          // if (this.addSendType === "1") {
          //   oldIds = this.fromdata.signDepartmentId.split(";");
          //   oldNames = this.fromdata.signDepartmentName.split(";");
          //   newIds = ids.filter(item => {
          //     return oldIds.indexOf(item) == -1;
          //   });
          //   newNames = names.filter(item => {
          //     return oldNames.indexOf(item) == -1;
          //   });
          // }

          if (this.addSendType == "1") {
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
            this.createSighWf.deptIds = ids;
            this.createSighWf.deptNames = names;
            this.createSighWf.sequenceSign = radio;
            this.doSaveOrUpdateCY.sequenceSign = radio;

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
        if (this.addSendType == "1" && type == "hui") {
          this.handleSendHQPtmt(newIds, newNames, oldIds, oldNames);
        }

        //下一环节处理人信息
        if (dtype === "toQianbaoSend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogState = !this.dialogState;
      if (
        !this.dialogState &&
        dtype == "toQianbaoSend" &&
        this.dialogTypeBack
      ) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
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
    //定密依据接收子组件传值
    savesecretBaslsvalue(data) {
      this.fromdata.secretGists = data;
      this.$forceUpdate();
    },
    //定密依据弹窗弹出
    // secretGistsbox() {
    //   this.secretDialog = true;
    //   this.$nextTick(() => {
    //     this.$refs.arr.openDialog();
    //   });
    // },
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
          this.checkIds = this.fromdata.signDepartmentId
            ? this.fromdata.signDepartmentId.split(";")
            : [];
          this.checkData = this.huiCheckData;
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
        case "toQianbaoSend":
          this.checkData = [];
          this.checkIds = [];
          break;
        case "cy": //传阅
          // this.checkIds = this.fromdata.circulatePersonIds
          //   ? this.fromdata.circulatePersonIds.split(";")
          //   : [];
          // if (this.cyCheckData.length) {
          //   newA = [].concat(this.cyCheckData);
          //   newA.map(item => {
          //     //选中的不可操作
          //     item.disabled = true;
          //   });
          // }
          // this.checkData = this.cyCheckData;
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
      // this.bank_toQianbaoSend.id = this.bank_dispach.id
      //   ? this.bank_dispach.id
      //   : sessionStorage.getItem("sfkhSignpageid") || "";
      this.bank_toQianbaoSend.id = this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "sfkhSignpageid"
      );
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      delete parseList.circulationList;
      delete parseList.handleSituationList;
      let params = Object.assign(this.bank_toQianbaoSend, parseList);
      params.unitId = this.unitId;
      this.$post
        .postData(
          "toQianbaoSend",
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
                window.opener.location.reload();
                window.close();
              }
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1000
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
      if (
        this.fromdata.sizeFact > this.fromdata.sizeLimit &&
        !this.fromdata.sizeLimit
      ) {
        if (
          (!this.fromdata.exceedWordReason &&
            this.fromdata.curNodeName == "起草") ||
          (!(
            (this.fromdata.exceedWordReasonList &&
              this.fromdata.exceedWordReasonList.length) ||
            this.fromdata.exceedWordReason
          ) &&
            this.fromdata.curNodeName != "起草")
        ) {
          //未填写原因
          this.chaoChuTiS = true;
        } else {
          if (
            this.fromdata.exceedWordReason.length < 10 &&
            this.fromdata.curNodeName == "起草"
          ) {
            this.juTiYY = true;
            return;
          } else {
            this.juTiYY = false;
          }
          this.chaoChuTiS = false;
        }
      } else {
        this.chaoChuTiS = false;
      }

      if (
        this.fromdata.curNodeName == "拟稿部门领导审核" &&
        !this.fromdata.draftDepartmentOpinion
      ) {
        this.nigaobumenFlag = true;
      } else if (
        this.fromdata.curNodeName == "审批部门领导批示" &&
        !this.fromdata.approvalOpinion
      ) {
        this.nigaobumenFlag = true;
      } else if (
        this.fromdata.curNodeName == "行领导批示" &&
        !this.fromdata.approvalOpinion
      ) {
        this.nigaobumenFlag = true;
      } else if (
        this.fromdata.curNodeName == "处审核" &&
        !this.fromdata.draftDepartmentOpinion
      ) {
        this.nigaobumenFlag = true;
      } else {
        this.nigaobumenFlag = false;
      }
      this.nigaobumenSureHandle(
        this.chaoChuTiS ? false : !this.nigaobumenFlag,
        true
      );
    },
    //点击 完成并发送 弹窗弹出
    async completeSending() {
      // 1、拟稿部门领导环节：没有填写意见字段，点击完成并发送按钮给出提示：未填写拟稿部门意见，是否继续。       结果为：在提示框中点击"是"后可以继续流转，点击'否"退出
      // 2、审批部门领导环节：没有填写意见字段，点击完成并发送按钮给出提示：未填写批示意见，是否继续。       结果为：在提示框中点击"是"后可以继续流转，点击'否"退出
      // 3、行领导签批环节：没有填写意见字段，点击完成并发送按钮给出提示：未填写批示意见，是否继续。       结果为：在提示框中点击"是"后可以继续流转，点击'否"退出
      // 4、拟稿部门领导环节：每次流转到该环节后点击完成并发送按钮后，都要给出该提示；
      // 5、审批部门领导环节：每次流转到该环节后点击完成并发送按钮后，都要给出该提示；
      // 6、行领导签批环节：每次流转到该环节后点击完成并发送按钮后，都要给出该提示；
      this.nigaobumenFlag = false;
      if (!this.fromdata.filePath && !this.fromdata.fileName) {
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先起草正文",
          duation: 1000
        });
        return;
      }

      let judge = true;
      judge = this.saveCheck();
      if (!judge) {
        return;
      }

      if (this.isSignFinish == "0") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "还有未办结的会签部门",
          duration: 1000
        });
        return;
      }

      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "toQianbaoSend";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.bank_selectConfig.unitId = this.unitId;
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
              this.seletOptionsData = this.shoNextNode(
                this.seletOptionsData,
                this.showHj
              );
              console.error(this.seletOptionsData);
              let parms = Object.assign(this.bank_send, this.fromdata);
              parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
              parms.curTplNo = this.bank_send.curTplNo =
                res.data && res.data[0].PTPLNO;
              parms.curMultiTenancyId = this.bank_send.curMultiTenancyId =
                res.data && res.data[0].MULTITENANCYID;
              parms.unitId = this.unitId;
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
    //表单校验滚动  mimi
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
        var limt =
          this.fromdata.secretTimeType == "年"
            ? 99
            : this.fromdata.secretTimeType == "月"
            ? 11
            : this.fromdata.secretTimeType == "日"
            ? 29
            : "";
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
      }
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
      }

      console.log(this.rules.secretGists[0]);
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
    },

    // 下拉列表
    getTcQbsignParamDicInfo() {
      this.bank_dispachfile.unitId = this.unitId;
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
            id: this.fromdata.id,
            isCirculate: "1",
            circulateExplain:this.fromdata.circulateExplain
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
            obj.unitId = this.unitId;
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
                  // this.preserve();
                  this.selectById();
                  // this.$forceUpdate();
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "发送传阅人失败",
                    duration: 1000
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
            id: this.fromdata.id,
            unitId: this.unitId
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
            this.selectById();
            this.$forceUpdate();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "收回失败",
              duration: 1500
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
        multiTenancyId: this.fromdata.multiTenancyId,
        unitId: this.unitId
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
            // this.$message({
            //   message: res.message,
            //   type: "error"
            // });
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1500
            });
          }
        });
    },
    shQuedingCY() {
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
        multiTenancyId: this.fromdata.multiTenancyId,
        isCirculate: "",
        unitId: this.unitId
      };
      // let checkboxdata = this.checkedsh.join(";");
      // let parms = {
      //   function: "takeBackCirculate",
      //   id: this.fromdata.id,
      //   ids: checkboxdata,
      //   multiTenancyId: this.fromdata.multiTenancyId,
      //   isCirculate:''
      // };
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
            this.selectById();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "收回失败",
              duration: 1500
            });
          }
        });
    },

    //已阅
    yiyue(n) {
      if (n == "1") {
        if (!this.fromdata.opinions) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "请输入传阅意见",
            duration: 500
          });
          return;
        }
      }
      let copyFrom = {
        function: "areadlyRead",
        unitId: this.unitId
      };
      copyFrom = Object.assign(copyFrom, this.fromdata);
      this.$post
        .postData(
          "areadlyRead",
          JSON.stringify(copyFrom),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "操作成功",
              duration: 500
            });
            setTimeout(() => {
              window.location.href = "about:blank";
              window.opener.location.reload();
              window.close();
            }, 1000);
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "操作失败",
              duration: 500
            });
          }
        })
        .catch(e => {
          console.log(e);
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

    //按钮收回
    shouhuibutton() {
      this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify({
            function: "doWithdrawTask",
            pcsAvyId: this.fromdata.pcsAvyId,
            multiTenancyId: this.fromdata.multiTenancyId,
            processInstId: this.fromdata.processInstId,
            unitId: this.unitId
          }),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 500
            });
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          }
        });
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
    selectById() {
      // if (!sessionStorage.getItem("sfkhSignpageid")) {
      //   this.bank_dispach.id = this.$route.query.id;
      // } else {
      //   this.bank_dispach.id = sessionStorage.getItem("sfkhSignpageid") || "";
      // }
      this.bank_dispach.id = getFormId(this.$route.query.id, "sfkhSignpageid");
      this.bank_dispach.unitId = this.unitId;
      this.$post
        .postData(
          "selectById",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          this.fromdata = res.data;
          this.nowUserId = this.fromdata.currentUserId;
          //获取签报处理单主标题
          // this.directTitle = res.data && res.data.orgName;
          if(res.data && res.data.isSpecialHead && res.data.isSpecialHead == "1"){
            this.directTitle = this.fromdata.draftDepartmentName;
          }else{
            this.directTitle = res.data && res.data.orgName;
          }

          // if(res.data.level == '1'){//传阅常用联系人修改 12.21
          //   this.scircularizeLevel = '2';//传阅常用联系人修改 12.21
          // }else{
          //   this.scircularizeLevel = '1';//传阅常用联系人修改 12.21
          // }

          if (res.data && res.data.level && res.data.level) {
            //传阅常用联系人修改 12.21
            this.scircularizeLevel = "2"; //传阅常用联系人修改 12.21
            this.orgId = this.fromdata.deptId;
          } else {
            this.scircularizeLevel = "1"; //传阅常用联系人修改 12.21
             this.orgId = '';
          }

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

          //一次传阅
          this.firstData = res.data.firstOpinions;

          this.firstOp = this.fromdata.firstOpinions || [];
          //修改重报
          this.doUpdateAgainSend.curUserId = res.data.currentUserId;
          this.doUpdateAgainSend.curUserName = res.data.currentUser;

          // 退文参数赋值
          this.getBackHistory.processInstId = res.data.processInstId;

          //退文确定
          this.backSureTuiWen.multiTenancyId = res.data.multiTenancyId;

          this.backSureTuiWen.tplNo = res.data.tplNo;
          this.backSureTuiWen.pcsAvyId = res.data.pcsAvyId;
          this.backSureTuiWen.processInstId = res.data.processInstId;
          this.backSureTuiWen.curNodeCode = res.data.curNodeCode;
          this.backSureTuiWen.curUserId = res.data.currentUserId;
          this.backSureTuiWen.curUserName = res.data.currentUser;

          this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
          this.banjiedispatch.tplNo = res.data.tplNo;
          this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
          this.banjiedispatch.processInstId = res.data.processInstId;
          this.banjiedispatch.curNodeCode = res.data.curNodeCode;
          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          this.bank_selectConfig.curTplNo = res.data.tplNo;
          this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;

          this.createSighWf.processInstId = res.data.processInstId;
          this.createSighWf.id = this.bank_dispach.id;
          this.createSighWf.multiTenancyId = res.data.multiTenancyId;
          this.createSighWf.pcsAvyId = res.data.pcsAvyId;
          this.createSighWf.tplNo = res.data.tplNo;
          this.createSighWf.curNodeCode = res.data.curNodeCode;
          this.createSighWf.sequenceSign = this.doSaveOrUpdateCY.sequenceSign = this.setradio =
            (res.data.sequenceSign && res.data.sequenceSign.toString()) || "0";
          //
          this.isHasRedHead = res.data && res.data.isHasRedHead;
          // 套红
          if (res.data.id) {
            this.$store.dispatch("setSignquoteInfo", {
              id: res.data.id,
              密级标识: res.data.workSecretFlag || "",
              成文日期: res.data.draftTime || "",
              承办人: res.data.submittedName || "",
              拟稿部门: res.data.draftDepartmentName || "",
              文号: res.data.qianbaoCode + this.fromdata.documentNo || "",
              标题: res.data.title || "",
              秘密类型: res.data.secretLimitType || "",
              紧急程度: res.data.emergencyLevelName || "",
              附件: "", //附件
              附件标题: res.data.attachTitle
                ? "附件：" + res.data.attachTitle
                : "" //附件标题
            });
          }

          //mimi
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true);
          }

          if (res.data.secretLimitType) {
            this.workSecurityTab(res.data.secretLimitType, true);
          }

          if (this.fromdata.handleTypeName == "1") {
            this.fromdata.handleTypeName = "1";
          } else if (this.fromdata.handleTypeName == "0") {
            this.fromdata.handleTypeName = "0";
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

          // if (this.readFlag != "" && this.readFlag != 1) {
          //   this.$post
          //     .postData(
          //       "doUpdateReadRecord",
          //       JSON.stringify({
          //         function: "doUpdateReadRecord",
          //         pcsAvyId: res.data.pcsAvyId,
          //         processInstId: res.data.processInstId,
          //         multiTenancyId: res.data.multiTenancyId
          //       }),
          //       this.$businessCode.ggqbgl
          //     )
          //     .then(res => {
          //       window.opener.location.reload();
          //       //更新状态用。暂时不用任何操作
          //     });
          // }

          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          //附件名称校验
          this.uploadConfig.attachTitle =
            this.fromdata.attachTitle &&
            this.fromdata.attachTitle.replace(/[\n,\s]/g, "");

          this.fromdata.attachSort = [];
          this.createSighWf.deptIds = res.data.signDepartmentId;
          this.createSighWf.deptNames = res.data.signDepartmentName;
          if (res.data.signDepartmentId) {
            this.huiCheckData = this.concatTreeData(
              res.data.signDepartmentId,
              res.data.signDepartmentName
            );
            if (
              this.fromdata.signState === "0" &&
              this.fromdata.curNodeName === "综合处理" &&
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
          //传阅回显
          if (res.data.circulatePersonNames) {
            this.cyCheckData = this.concatTreeData(
              res.data.circulatePersonIds,
              res.data.circulatePersonNames
            );
          } else {
            this.cyCheckData = [];
          }
          if (!(res.data && res.data.phone)) {
            let tcHumanRole = JSON.parse(localStorage.getItem("userInfo"));
            this.fromdata.phone = tcHumanRole.telMobile || "";
          }

          //表单控制
          this.isProcessInstId = res.data.processInstId;
          this.isMultiTenancyId = res.data.multiTenancyId;

          //判断是否能够继续完成并发送
          this.isSignFinish =
            res.data.fieldStatusMap && res.data.fieldStatusMap.isSignFinish;

          // 判断是否生成文号      //合成格式  退号按钮进行隐藏
          this.fieldStatusMap =
            res.data.fieldStatusMap && res.data.fieldStatusMap.isDocumentNo;

          // console.log()

          // 非跨行：
          // 1.综合处理环节，生成文号按钮出现时，退号、合成格式，这两个按钮均不出现；
          // 2.完成生成文号操作后，退号按钮、合成格式按钮、处理正文按钮同时出现；
          // 3.部内签报、部间签报：完成合成格式操作后【处理正文】按钮变为【查看正文】，任何用户不能再修改正文；
          // 4.行签报：完成合成格式操作后还是【处理正文】按钮，/////经“行领导批示”环节后，【处理正文】按钮变为【查看正文】按钮；

          // 查看会签状态有的话，完成并发送隐藏    发完之后显示（（（未加）））
          // 完成并发送前判断是否有正文  （（（未加）））
          if (this.qicaozw == true) {
            this.chakanzw = false;
            this.chulizw = false;
          }
          if (this.chulizw == true) {
            this.chakanzw = false;
            this.qicaozw = false;
          }
          if (this.chakanzw == true) {
            this.chulizw = false;
            this.qicaozw = false;
          }

          //起草正文  处理正文  查看正文  合成格式
          if (!this.fromdata.filePath && !this.fromdata.fileName) {
            //判断起草正文   无起草正文  显示起草正文
            this.qicaozw = true;
            this.chulizw = false;
            this.chakanzw = false;
            this.hechengzw = false;
          }
          if (this.fromdata.filePath && this.fromdata.fileName) {
            //有起草正文  起草正文隐藏
            this.qicaozw = false;
            this.chulizw = true;
            this.chakanzw = false;
            this.hechengzw = false;

            if (this.fromdata.draftDepartmentOpinionList) {
              if (
                res.data.fieldStatusMap &&
                res.data.fieldStatusMap.isDocumentNo == "1" //==1  退号显示    合成格式显示   处理正文显示   生成文号隐藏
                // ==0 生成文号显示     退号隐藏    合成格式隐藏  处理正文隐藏
              ) {
                this.tuihaoFlag = true;
                this.shengchengFlag = false;
                this.hechengzw = true;
                this.chulizw = true;

                if (res.data.isHasRedHead) {
                  this.hechengzw = false;
                  this.chakanzw = true;
                  this.tuihaoFlag = false;
                  this.shengchengFlag = false;
                  //清稿 显示
                } else {
                  this.hechengzw = true;
                  //清稿 隐藏
                }
                if (
                  res.data.isHasRedHead &&
                  (this.fromdata.qianBaoTypeName == "部内签报" ||
                    this.fromdata.qianBaoTypeName == "部间签报")
                ) {
                  this.chulizw = false;
                  this.chakanzw = true;
                }

                if (
                  res.data.isHasRedHead &&
                  this.fromdata.qianBaoTypeName == "行签报"
                ) {
                  this.chulizw = true;
                  this.chakanzw = false;
                }
              } else {
                this.shengchengFlag = true;
                this.tuihaoFlag = false;
                this.hechengzw = false;
                this.chulizw = true;
                this.chakanzw = false;
              }
            } else {
              this.tuihaoFlag = false;
              this.shengchengFlag = false;
              this.hechengzw = false;
            }
          }

          //查看会签状态
          if (this.isSignFinish == "0") {
            //判断是否已经发了 signState
            //判断发过去的是否已经办结  isSignFinish
            this.signStateFlag = true;
            this.banjieFlag = false;
          } else {
            this.signStateFlag = false;
            this.banjieFlag = true;
          }

          //判断是否合成格式（行签报）部门综合合成格式后才可发办公室审核
          if (this.isHasRedHead) {
            this.bgsShenH = true;
          } else {
            this.bgsShenH = false;
          }
          // this.biaoDKz();

          // exceedWordReason  原因

          /**
           * 正文字数限制
           */
          // private Integer sizeLimit;
          /**
           * 实际字数
           */
          // private Integer sizeFact;

          // exceedWordReasonList  原因集合
          // 字数超限list
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
    },

    //表单控制
    // biaoDKz() {
    //   if (this.isProcessInstId) {
    //     this.$post
    //       .postData(
    //         "getNextUserTaskNode",
    //         JSON.stringify({
    //           function: "getNextUserTaskNode",
    //           processInstId: this.isProcessInstId
    //         }),
    //         this.$businessCode.ggqbgl
    //       )
    //       .then(res => {
    //         this.huanJieMessage = res.data.extAttributes;
    //         this.showHj =
    //           (res.data &&
    //             res.data.extAttributes &&
    //             res.data.extAttributes.acyNodeNextBount) ||
    //           {};
    //         this.setConfig();
    //         this.setFormConfig();
    //         setTimeout(() => {
    //           this.$refs.fromdata.clearValidate();
    //         });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   } else {
    //     this.$post
    //       .postData(
    //         "getpcsTplStartNode",
    //         JSON.stringify({
    //           function: "getpcsTplStartNode",
    //           multiTenancyId: this.isMultiTenancyId
    //         }),
    //         this.$businessCode.ggqbgl
    //       )
    //       .then(res => {
    //         this.huanJieMessage = res.data;
    //         this.showHj =
    //           (res.data &&
    //             res.data.extAttributes &&
    //             res.data.acyNodeNextBount) ||
    //           {};
    //         this.setConfig();
    //         this.setFormConfig();
    //         setTimeout(() => {
    //           this.$refs.fromdata.clearValidate();
    //         });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    // },

    // 保存
    async preserve(type) {
      let successState = false;
      // this.bank_dispach.id = this.$route.query.id
      //   ? this.$route.query.id
      //   : sessionStorage.getItem("sfkhSignpageid") || "";
      this.bank_dispach.id = getFormId(this.$route.query.id, "sfkhSignpageid");
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      delete parseList.circulationList;
      delete parseList.handleSituationList;
      var obj = Object.assign(this.doSaveOrUpdateCY, parseList);
      obj.unitId = this.unitId;
      await this.$post
        .postData(
          "doSaveOrUpdateCY",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            // this.doSaveOrUpdateCY.id = this.bank_dispach.id =
            //   res.data.id;
            // this.bank_toQianbaoSend.id = res.data.id;
            // sessionStorage.setItem("sfkhSignpageid", res.data.id);

            // this.doSaveOrUpdateCY.id = this.bank_dispach.id = this.bank_toQianbaoSend.id = getFormId(
            //   this.$route.query.id,
            //   "sfkhSignpageid",
            //   res.data.id
            // );
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            window.opener.location.reload();
            // 退文参数赋值
            // this.getBackHistory.processInstId = res.data.processInstId;

            // //修改重报
            // this.doUpdateAgainSend.curUserId = res.data.currentUserId;
            // this.doUpdateAgainSend.curUserName = res.data.currentUser;

            // this.backSureTuiWen.tplNo = res.data.tplNo;
            // this.backSureTuiWen.pcsAvyId = res.data.pcsAvyId;
            // this.backSureTuiWen.processInstId = res.data.processInstId;
            // this.backSureTuiWen.curNodeCode = res.data.curNodeCode;
            // this.backSureTuiWen.curUserId = res.data.currentUserId;
            // this.backSureTuiWen.curUserName = res.data.currentUser;

            // this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
            // this.banjiedispatch.tplNo = res.data.tplNo;
            // this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
            // this.banjiedispatch.processInstId = res.data.processInstId;
            // this.banjiedispatch.curNodeCode = res.data.curNodeCode;

            // this.bank_selectConfig.curNodeId = res.data.curNodeCode;
            // this.bank_selectConfig.curTplNo = res.data.tplNo;
            // this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;

            // this.createSighWf.processInstId = res.data.processInstId;
            // this.createSighWf.id = this.bank_dispach.id;
            // this.createSighWf.multiTenancyId = res.data.multiTenancyId;
            // this.createSighWf.pcsAvyId = res.data.pcsAvyId;
            // this.createSighWf.tplNo = res.data.tplNo;
            // this.createSighWf.curNodeCode = res.data.curNodeCode;
            // this.createSighWf.sequenceSign = res.data.sequenceSign;
            // //附件
            // if (type === "uploadfile") {
            //   this.uploadConfig.id = res.data.id;
            //   this.$refs.uploadComponent.uploadFileNow();
            // }

            // if (type != "2") {
            //     this.$message({
            //       type: "success",
            //       showClose: true,
            //       offset: 400,
            //       message: "保存成功",
            //       duration: 1000
            //     });
            //   }
            this.selectById();
            successState = true;
          }
        })
        .catch(erro => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "保存失败",
          //   duration: 1000
          // });
          console.log(erro);
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
    downRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.attchmentFileInfo[n + 1].id,
          sort: this.fromdata.attchmentFileInfo[n].sort
        },
        {
          id: this.fromdata.attchmentFileInfo[n].id,
          sort: this.fromdata.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
        n + 1
      ];
      this.fromdata.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.bank_deleteFileById.id = id;
          this.bank_deleteFileById.unitId = this.unitId;
          this.$post
            .postData(
              "deleteFileById",
              JSON.stringify(this.bank_deleteFileById),
              this.$businessCode.qbglfj
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
                    duration: 1000
                  });
                }
              }
            });
        })
        .catch(() => {});
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
                duration: 1000
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
                duration: 1000
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
    handelclose() {
      // this.$confirm("是否保存并退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.preserve();
      //     window.location.href = "about:blank";
      //     window.close();
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       offset: 100,
      //       showClose: true,
      //       message: "已取消关闭",
      //       duation: 1000
      //     });
      //   });
      window.location.href = "about:blank";
          window.close();
    },

    // 删除此文
    delectArticle() {
      // if (!sessionStorage.getItem("sfkhSignpageid")) {
      //   this.bank_dispach.id = this.$route.query.id;
      // } else {
      //   this.bank_dispach.id = sessionStorage.getItem("sfkhSignpageid") || "";
      // }
      //  this.bank_dispach.id =  getFormId(this.$route.query.id, 'sfkhSignpageid',res.data.id);
      this.bank_dispach.id = getFormId(this.$route.query.id, "sfkhSignpageid");
      // this.bank_dispach.id = sessionStorage.getItem("sfkhSignpageid") || "";
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;

      if (this.fieldStatusMap == "1") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已生成文号，无法删除",
          duration: 1000
        });
        return;
      }

      this.deleteToQianbaoEntityById.id = deletesendorderid;
      this.deleteToQianbaoEntityById.unitId = this.unitId;
      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.deleteToQianbaoEntityById.id) {
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
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
                      window.close();
                    }
                  });
                } else {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "删除失败",
                    duration: 1000
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
            duation: 1000
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
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "circularizeWaitFkh",
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
            moduleCode: "QBGL",
            unitId: this.unitId
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
                    flowTranId: this.$businessCode.qbgl //流程交易线     chai
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
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          console.log(res);
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
              path: "/qbdzCyd",
              query: {
                id: this.bank_dispach.id,
                unitId: this.unitId,
                choseYear:this.$route.query.choseYear
              }
            });
          window.open(routeData.href, "_blank");
        }
      })
      // this.bank_dispach.id = getFormId(this.$route.query.id, "sfkhSignpageid");
      // let parseList = JSON.parse(JSON.stringify(this.fromdata));
      // delete parseList.approvalOpinionList;
      // delete parseList.checkOpinionList;
      // delete parseList.draftDepartmentOpinionList;
      // delete parseList.signOpinionList;
      // delete parseList.remarkList;
      // delete parseList.circulationList;
      // delete parseList.handleSituationList;
      // var obj = Object.assign(this.doSaveOrUpdateCY, parseList);
      // this.$post
      //   .postData(
      //     "doSaveOrUpdateCY",
      //     JSON.stringify(obj),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     if (res && res.success) {
      //       const routeData = this.$router.resolve({
      //         path: "/qbdzCyd",
      //         query: {
      //           id: this.bank_dispach.id,
      //           multiTenancyId: this.fromdata.multiTenancyId,
      //           mainDocId: this.bank_dispach.mainDocId
      //         }
      //       });
      //       window.open(routeData.href, "_blank");
      //     }else{
      //       this.$message({
      //         type: "error",
      //         offset: 400,
      //         showClose: true,
      //         message: "保存失败",
      //         duration: 1000
      //       });
      //     }
      //   })
      //   .catch(erro => {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "保存失败",
      //       duration: 1000
      //     });
      //   });

      
    },
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //定密依据接收子组件传值
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          this.fromdata.opinionCheck = this.fromdata.opinionCheck
            ? this.fromdata.opinionCheck + data
            : data;
        } else if (this.clickTypes == 2) {
          this.fromdata.officeOpinion += data;
        } else if (this.clickTypes == 3) {
          this.fromdata.undertakeOrgOpinion += data;
        }
        this.$forceUpdate();
      }
    },

    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },

    // 会签部门
    handleSendHQPtmt(newIds, newNames, oldIds, oldNames) {
      // 判断是否生成文号，进而判断是否点击发会签按钮

      if (this.fieldStatusMap != "1") {
        //==1  生成文号成功   生成文号隐藏  退号显示
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请先生成文号",
          duration: 1000
        });
        return;
      }

      // this.bank_dispach.id = this.$route.query.id
      //   ? this.$route.query.id
      //   : sessionStorage.getItem("sfkhSignpageid") || "";
      this.bank_dispach.id = getFormId(this.$route.query.id, "sfkhSignpageid");

      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      delete parseList.circulationList;
      delete parseList.handleSituationList;
      if (newNames) {
        this.createSighWf.avyds = "发送会签部门:" + newNames;
      } else {
        this.createSighWf.avyds = "发送会签部门:" + this.createSighWf.deptNames;
      }

      var obj = Object.assign(this.createSighWf, parseList);

      if (!this.createSighWf.deptIds) {
        obj.deptIds = "";
        obj.deptNames = "";
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择会签部门",
          duration: 2000
        });
        return;
      }
      // if (newNames) {
      //   obj.deptIds = newIds;
      //   obj.deptNames = newNames;
      // }
      if (newNames) {
        obj.deptIds = newIds;
        obj.deptNames = newNames;
      } else {
        obj.deptIds = this.fromdata.signDepartmentId;
        obj.deptNames = this.fromdata.signDepartmentName;
      }
      obj.unitId = this.unitId;
      if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
        this.$post
          .postData(
            "createSighWf",
            JSON.stringify(obj),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送会签部门成功",
                duration: 2000
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
              this.selectById();
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
            this.selectById();
          });
      }
    },
    //收回t催办
    takeBackSign(type) {
      this.shdialog = true;
      this.typeofHQBM = type;
      this.checkedsh = [];

      if (type == "shouhui") {
        this.dialoghuiqianTit = "选择需要收回的会签部门";
      } else {
        this.dialoghuiqianTit = "选择需要催办的会签部门";
      }

      const parms = {
        function: "getSubWfInfo",
        processInstId: this.fromdata.processInstId,
        multiTenancyId: this.fromdata.multiTenancyId,
        unitId: this.unitId
      };
      this.$post
        .postData(
          "getSubWfInfo",
          JSON.stringify(parms),
          this.$businessCode.ggqbgl
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
      if (!checkboxdata && !dqdata) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择需要收回的会签部门",
          duration: 2000
        });
        this.shdialog = false;
        return;
      }
      if (this.typeofHQBM === "shouhui") {
        let shform = {
          function: "takeBackSignHelp",
          pcsAvyId: this.fromdata.pcsAvyId,
          multiTenancyId: this.fromdata.multiTenancyId,
          takeBackDeptNames: checkboxdata,
          subProcessInstId: dqdata,
          id: this.bank_dispach.id,
          unitId: this.unitId
        };
        this.$post
          .postData(
            "takeBackSignHelp",
            JSON.stringify(shform),
            this.$businessCode.ggqbgl
          )
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 2000
              });
              this.selectById();
              // this.preserve()
              //
              this.$forceUpdate();
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
            this.selectById();
          });
        this.shdialog = false;
      } else if (this.typeofHQBM == "cuiban") {
        if (!checkboxdata && !dqdata) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择需要催办的会签部门",
            duration: 2000
          });
          this.shdialog = false;
          return;
        }
        let parms = {
          function: "urgeHandle",
          subProcessInstId: dqdata,
          multiTenancyId: this.fromdata.multiTenancyId,
          unitId: this.unitId
        };
        this.$post
          .postData(
            "urgeHandle",
            JSON.stringify(parms),
            this.$businessCode.ggqbgl
          )
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "催办成功",
                duration: 2000
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
    //   let transJudge = false;
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

    //             // that.bank_import = res.data;
    //             // that.importDataArr.push(res.data);
    //             // that.fromdata.sendBasis = that.importDataArr;
    //             // that.showImport = false;
    //             // that.showImportData = true;
    //             // that.preserve();
    //           }
    //         });
    //     } else {
    //        let that = this
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
    //             // let transArr = [];
    //             // transArr = that.fromdata.sendBasis
    //             //   ? that.fromdata.sendBasis
    //             //   : [];
    //             // transArr.push(res.data);
    //             // that.importDataArr = transArr;
    //             // that.fromdata.sendBasis = that.importDataArr;
    //           //   that.bank_import = res.data;
    //           // that.importDataArr.push(res.data);
    //           // that.fromdata.sendBasis = that.importDataArr.filter(item => item.documentCode);
    //           //   that.showImport = false;
    //           //   that.showImportData = true;
    //           //   that.$businessCode.ggfawgl = "A08462001";

    //           //   that.preserve();
    //           that.bank_import = res.data;
    //           that.importDataArr.push(res.data);
    //           that.fromdata.sendBasis = that.importDataArr.filter(item => item.documentCode);
    //           that.showImport = false;
    //           that.showImportData = true;
    //           that.preserve();
    //             // that.$forceUpdate()
    //           } else {
    //             // this.$message({
    //             //   type: "error",
    //             //   message: res.message,
    //             //   showClose: true,
    //             //   duration: 1500
    //             // });
    //             // that.showImport = false;
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
    //   this.fromdata.sendBasis.forEach(item => {
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
    this.bank_dispach.id = this.uploadConfig.id = this.bank_toQianbaoSend.id = getFormId(
      this.$route.query.id,
      "sfkhSignpageid"
    );

    //初始化修改交易线 (传后台)
    this.uploadConfig.code = this.$businessCode.qbglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";

    //传阅
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_dispach.mainDocId = this.$route.query.mainDocId
      ? this.$route.query.mainDocId
      : "";
    this.bank_dispach.multiTenancyId = this.$route.query.multiTenancyId
      ? this.$route.query.multiTenancyId
      : "";
    this.state = this.$route.query.state ? this.$route.query.state * 1 : "";

    this.selectById();
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
.tui_wen_content {
  width: 100%;
  height: 500px;
  display: flex;
  .tui_wen_left {
    width: 65%;
    height: 480px;
    padding: 10px 20px;
    .el-scrollbar {
      height: 480px;
      overflow: scroll;
      position: relative;
    }
  }
  .tui_wen_right {
    width: 35%;
    height: 480px;
    padding: 10px 20px;
  }
  .tui_wen_list {
    padding: 20px 10px;
    font-size: 16px;
  }
  /deep/ .el-radio__label {
    display: none;
  }
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

/deep/ .dialogImport {
  .el-dialog {
    width: 30% !important;
  }
}

//正文超限原因
.size_yuanYin {
  /deep/ ::-webkit-input-placeholder {
    color: red !important;
  }
}
/deep/ .blue_size_yuanYin {
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #e4e7ed52 !important;
    color: blue !important;
  }
}
/deep/ .blue_size_yuanYin {
  .adviceInfo {
    position: absolute;
    width: 100%;
    right: 20px;
    bottom: 0;
    text-align: right;
    color: blue;
  }
}
.adviceInfo{
	font-size: 14px !important;
	line-height: 20px;
}
/deep/ .dialogImport {
  .el-dialog {
    width: 30% !important;
  }
}

.xiugaicb {
  .xuanzTh {
    padding: 20px 10px;
    font-size: 16px;
  }
  /deep/ .el-radio__label {
    display: none;
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
/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100% !important;
}
</style>


