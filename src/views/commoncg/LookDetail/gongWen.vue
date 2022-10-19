<!--
 * @Author: ylp
 * @Date: 2021-08-2 15:28:52
 * @LastEditTime: 2021-07-01 01:45:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\sealManage\useSeal\draft\document\document.vue
--> 
<template>
  <div class="document" id="document">
    <!-- 公文中收藏的表单布局  勿动start -->

    <!-- 公文中收藏的表单布局  勿动end -->

    <div class="headerClick">
      <!-- <el-button @click="buttonClick('用印')">用印(暂供开发使用)</el-button> -->
      <!-- <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button> -->
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('关闭')"
        v-if="this.$route.query.type!='2'"
      >关闭</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('关闭1')"
        v-if="this.$route.query.type=='2'"
      >关闭</el-button>
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('保存')">保存</el-button>
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('查看流程')">查看流程</el-button>
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('打印处理单')">打印处理单</el-button>
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('收藏')">收藏</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('维护')"
        v-if="this.$route.query.type!='2'"
      >维护</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('生成模板')"
        v-if="this.$route.query.type=='2'"
      >生成模板</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('流程调度')"
        v-show="!Isweihu"
      >流程调度</el-button>
      <el-button
        plain
        class="bank_grid_comtent_active"
        @click="buttonClick('归档')"
        v-if="this.$route.query.type=='2'&&form.onFileFlag=='1'&&form.extractFlag=='1'"
      >归档</el-button>
      <el-button
        @click="buttonClick('区块链归档')"
        class="bank_grid_comtent_active"
        v-if="this.$route.query.type=='2'&&form.isNewFilePlace"
       >区块链归档</el-button>
    </div>
    <div class="shiwuTitle">{{ form.deptTableHeader ? form.deptTableHeader : deptTableHead}}</div>
    <el-form
      ref="registerForm"
      class="designForm"
      :model="form"
      label-width="110px"
      :rules="regSealFormRule"
    >
      <div class="box">
        <el-form-item label="当前环节:">
          <span style="color: red">{{ $route.query.id ? form.currentNode : "起草" }}</span>
        </el-form-item>
        <el-form-item label="当前处理人:">
          <span style="color: red">{{ form.currentUser ? form.currentUser : form.draftUser }}</span>
        </el-form-item>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否归档" v-if="this.$route.query.type=='2'">
            <el-radio-group v-model="form.onFileFlag">
              <el-radio :label="'0'">是</el-radio>
              <el-radio :label="'1'">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否抽取" v-if="this.$route.query.type=='2'">
            <el-radio-group v-model="form.extractFlag">
              <el-radio :label="'0'">是</el-radio>
              <el-radio :label="'1'">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人" prop="draftUser" ref="draftUser">
            <el-input v-model="form.draftUser" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请单位" prop="departFirstDepartment" ref="departFirstDepartmentId">
            <el-input v-model="form.departFirstDepartment" :disabled="Isweihu"></el-input>
            <!-- <el-select
              v-model="form.departFirstDepartment"
              style="width: 100%"
              placeholder="请选择申请单位"
              :disabled="Isweihu"
              @change="departFirstDepartmentChange"
            >
              <el-option
                v-for="(item, index) in draftOrganOption"
                :key="index"
                :label="item.firstUnitName"
                :value="item.firstUnitName"
              ></el-option>
            </el-select>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请时间" prop="draftDate" ref="draftDate">
            <el-input v-model="form.draftDate" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编号" prop="documentNo">
            <el-input v-model="form.documentNo" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="用印类型" prop="markType">
            <el-radio-group v-model="form.markType">
              <el-radio v-for="item in markTypeOptions" :key="item" :label="item"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>-->
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="用印公文">
            <el-row></el-row>
            <el-row>
              <el-col style="text-align: right; margin-bottom: 5px">
                <el-button type="primary" @click="importDoc" :disabled="Isweihu">引入</el-button>
                <el-button type="danger" @click="delImportDoc" :disabled="Isweihu">删除</el-button>
              </el-col>
            </el-row>
            <el-table
              ref="sealDocument"
              border
              size="medium"
              :data="tableData"
              :style="{ width: '99.6%' }"
              :header-row-style="{ textAlign: 'center' }"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50px" label="选择" align="center"></el-table-column>
              <el-table-column type="index" width="60px" label="序号" align="center"></el-table-column>
              <el-table-column label="公文名称" prop="title" align="center"></el-table-column>
              <el-table-column label="公文编号" prop="documentNo" align="center"></el-table-column>
              <el-table-column align="center">
                <template slot="header">
                  <p>印章名称及每份个数</p>
                  <el-button
                    v-if="tableData.length !== 0"
                    type="primary"
                    size="mini"
                    @click="selUseSeal('all')"
                    :disabled="Isweihu"
                  >批量填写</el-button>
                </template>
                <template slot-scope="scope">
                  <span
                    :style="{ cursor: 'pointer' }"
                    @click="selUseSeal(scope.row.id)"
                  >{{ scope.row.sealDetail }}</span>
                  <el-button
                    v-if="scope.row.sealDetail === ''"
                    type="primary"
                    size="small"
                    :disabled="Isweihu"
                    @click="selUseSeal(scope.row.id)"
                  >用印选择</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template slot="header">
                  <p>用印份数</p>
                  <el-button
                    v-if="tableData.length !== 0"
                    type="primary"
                    size="mini"
                    :disabled="Isweihu"
                    @click="batchSealCount"
                  >批量填写</el-button>
                </template>
                <template slot-scope="scope">
                  <el-input-number
                    size="small"
                    :min="0"
                    v-model="scope.row.useSealCount"
                    :disabled="Isweihu"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="用印总数" prop="useSealSum" align="center">
                <span slot-scope="scope">{{ getSealSum(scope.row) }}</span>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="lookFaWenDeatail(scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div
              style="
                border: 1px solid #dcdfe6;
                border-top: 0;
                display: flex;
                width: 99.6%;
                text-align: center;
              "
            >
              <p
                style="
                  width: 51px;
                  border-right: 1px solid #dcdfe6;
                  color: #606266;
                "
              >汇总</p>
              <p :style="{ color: '#606266', padding: '0 10px' }">{{ sumary }}</p>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="标题" prop="title" ref="title">
            <el-input v-model="form.title" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用印原因" prop="yyReason" ref="yyReason">
            <el-input v-model="form.yyReason" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="发往单位" prop="sendDept" ref="sendDept">
            <el-input v-model="form.sendDept" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用印时间" prop="useTime">
            <el-input v-model="form.useTime" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用印方式" prop="fldYyfs">
            <el-input v-model="fldYyfs" :disabled="Isweihu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="tableSealStateData.length > 0">
        <el-col>
          <el-form-item label="盖章状态">
            <m-table
              ref="SealStateTable"
              :isHandle="false"
              :tableData="tableSealStateData"
              :tableCols="tableSealStateCols"
              :isPagination="false"
              :isHeaderStyle="{}"
              :isBorder="true"
              :sortable="false"
              style="width: 100%"
            ></m-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <detail-list
            :isWeiHu="Isweihu"
            listtype="send"
            lableTitle="印章保管人意见"
            :formadatalist="form.yzBgrYjs"
            @delefunc="delefunc"
          ></detail-list>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <detail-list
            :isWeiHu="Isweihu"
            listtype="send"
            lableTitle="备注"
            :formadatalist="form.remarks"
            @delefunc="delefunc"
          ></detail-list>
        </el-col>
      </el-row>
      <el-row
        v-if="
          configInfo.isErweima === '1' &&
          configInfo.ewmMarkFlow &&
          configInfo.ewmMarkFlow.includes('公文')
        "
      >
        <el-col :span="24" style="text-align: center; margin-bottom: 20px">
          <span>二维码信息采集表</span>
        </el-col>
        <el-col :span="24">
          <el-form-item label="日期" prop="ewmRq" ref="ewmRq">
            <el-input v-model="form.ewmRq" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="主体" prop="ewmZt" ref="ewmZt">
            <el-input
              v-model="form.ewmZt"
              :maxlength="configInfo.ewmZtzs"
              show-word-limit
              placeholder="指签约对象等文本出具的受众,可缩写、简写。"
              :disabled="Isweihu"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事项">
            <el-input
              v-model="form.ewmSx"
              :maxlength="configInfo.ewmSxzs"
              show-word-limit
              placeholder="指该文本是什么，如贷款合同等。"
              :disabled="Isweihu"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--流程调度树-->
    <select-person
      v-model="dialogState"
      :orgOrDeptId="selsecOrgOrDeptId"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></select-person>
    <!-- 
      引入用印公文查询弹窗
    -->
    <el-dialog
      title="发文查询"
      :visible.sync="importDialog"
      :before-close="cancelImportDialog"
      width="80%"
      class="bigDialog"
    >
      <el-form ref="importSearchForm" :model="formData" label-width="90px">
        <baseSearchForm ref="baseSearchForm" @reset="reset" @submit="submit">
          <el-col slot="oneLine" :span="18">
            <el-form-item label="拟稿日期" prop="draftRangeTime">
              <el-date-picker
                v-model="formData.draftRangeTime"
                value-format="yyyy-MM-dd"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <div slot="more">
            <el-form-item label="发文日期" prop="sendRangeTime">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="formData.sendRangeTime"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="formData.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发文字号" prop="documentNo">
                  <el-input v-model="formData.documentNo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="12">
                <el-form-item label="制发行" prop="draftOrganId">
                  <el-input v-model="formData.draftOrganId"></el-input>
                </el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-form-item label="主办部门" prop="draftDepartmentId">
                  <div style="display: flex">
                    <el-input v-model="formData.draftDepartmentName" readonly></el-input>
                    <el-button type="primary" style="marginleft: 3px" @click="selMainDep">选择</el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="表单类型" prop="formType">
                  <el-radio-group v-model="formData.formType">
                    <el-radio label="1">非会签</el-radio>
                    <el-radio label="2" :disabled="formData.sendType == '2'">会签单</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公文状态" prop="orderState">
                  <el-radio-group v-model="formData.orderState" disabled>
                    <el-radio label="0">全部</el-radio>
                    <el-radio label="1">流转</el-radio>
                    <el-radio label="2">办结</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发文形式" prop="sendType">
                  <el-radio-group v-model="formData.sendType">
                    <el-radio label="0">全部</el-radio>
                    <el-radio label="1">电子</el-radio>
                    <el-radio label="2" :disabled="formData.formType == '2'">实物</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="发文类型" prop="orderType">
              <el-radio-group v-model="formData.orderType">
                <el-radio label>全部</el-radio>
                <el-radio label="行发文">行发文</el-radio>
                <el-radio label="部门发文">部门发文</el-radio>
                <el-radio label="党务发文">党务发文</el-radio>
                <el-radio label="会议纪要">会议纪要</el-radio>
                <el-radio label="工作简报">工作简报</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </baseSearchForm>
      </el-form>
      <m-table
        ref="documentTab"
        @refresh="loadData()"
        :isSelection="true"
        :isIndex="true"
        :isHandle="false"
        :searchData="formData"
        :tableData="docTableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :sortable="false"
      />
      <div slot="footer">
        <el-button @click="cancelImportDialog()">取消</el-button>
        <el-button type="primary" @click="sureImpor">确定</el-button>
      </div>
    </el-dialog>
    <!-- 选择主办部门弹窗 -->
    <treeCofig
      :treeData="mainDeptTreeData"
      :canTab="false"
      :hasRadio="false"
      dialogTit="选择主办部门"
      :singelCheckF="true"
      :dialogState="mainDeptDialogState"
      :offenUse="false"
      @showCompDialog="mainDeptShowCompDialog"
    ></treeCofig>
    <!-- 
      用印选择弹窗
    -->
    <el-dialog title="用印选择" :visible.sync="selUseSealDialog">
      <el-table ref="selUseSealTab" border size="medium" :data="selUseSealTableData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="使用机构" prop="sealOrg"></el-table-column>
        <el-table-column label="印章名称" prop="sealName"></el-table-column>
        <el-table-column label="存放位置" prop="sealPosition"></el-table-column>
        <el-table-column label="本材料用印个数">
          <template slot-scope="scope">
            <el-input-number :min="0" v-model="scope.row.sealNum"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="selUseSealDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSelUseSeal">确定</el-button>
      </div>
    </el-dialog>
    <!-- 
      用印份数批量操作弹窗
    -->
    <el-dialog title="批量填写用印份数" :visible.sync="sealCountDialog">
      <el-form>
        <el-form-item label="用印份数" label-width="230px">
          <el-input-number :min="0" v-model="batchCount"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="sealCountDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSelSealCount">确定</el-button>
      </div>
    </el-dialog>
    <!-- 
      用印方式弹窗
    -->
    <el-dialog title="选择用印方式" :visible.sync="useSealModeDialog">
      <el-form
        ref="useSealModeDia"
        :model="useSealModeForm"
        label-width="100px"
        :rules="useSealModeRules"
      >
        <el-form-item label="用印方式" prop="useSealMode">
          <el-radio-group v-model="useSealModeForm.useSealMode">
            <el-radio :label="0">按材料用印</el-radio>
            <el-radio :label="1">按印章用印</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="useSealWaytip">
          <el-form-item label="说明：" style="color: #f56c6c">
            例：材料A 有 10 份，每份盖行章1个，党委章2个，材料B 有 20
            份，每份盖行章2个，党委章1个。
            <p>
              1、按材料用印：以材料名称为基础，按相同序号的材料，使用同一种印章。如有多个印章，先盖完一种印章，再进行另一种印章。
              盖章次序为先盖材料A 行章 10*1 = 10份，材料A 党委章 10*2 =
              20个。再到材料B 行章 20*2=40份，材料B 党委章 20*1 =20份
            </p>
            <p>
              2、按印章用印：以印章名称为基础，按相同的印章，盖章完成后，再进行另一种印章用印。
              盖章次序为（材料A的行章10*1 + 材料B行章20*2） = 50
              个行章，（材料A的党委章10*2 + 材料B党委章20*1）= 40个党委章。
            </p>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer">
        <el-button @click="useSealModeDialog = false">取消</el-button>
        <el-button type="primary" @click="sureUseSealMode">确定</el-button>
      </div>
    </el-dialog>
    <!-- 
      用印信息弹窗
    -->
    <el-dialog title="本批次用印信息" :visible.sync="sealInfoDialog">
      <el-form :model="sealInfoForm" label-width="100px">
        <el-form-item label="用印材料">
          <el-input disabled v-model="sealInfoForm.title"></el-input>
        </el-form-item>
      </el-form>
      <m-table
        ref="sealInfoTab"
        :tableData="sealInfoTabData"
        :tableCols="sealInfoTabCols"
        :sortable="false"
        :isPagination="false"
      />
      <div slot="footer">
        <el-button @click="sealInfoDialog = false">退出用印</el-button>
        <el-button type="primary" @click="nextBatch">下一批</el-button>
        <el-button type="primary" @click="sureUseSeal">确定</el-button>
      </div>
    </el-dialog>
    <!-- 
      发送上级行弹窗
    -->
    <el-dialog
      title="请选择上级行单位"
      :visible.sync="heigherOrgDialog"
      :before-close="cancelHeigherOrgDialog"
    >
      <el-form label-width="100px" :model="heigherOrgForm">
        <el-form-item label="上级行部门">
          <div style="display: flex">
            <el-input readonly v-model="heigherOrgForm.unitName"></el-input>
            <el-button type="primary" style="marginleft: 2px" @click="showOrgTree = true">选择</el-button>
          </div>
        </el-form-item>
        <!-- 临时注释 -->
        <!-- <el-form-item label="行外单位">
          <m-table ref="heigherOrgTab" :isSelection="true" :isIndex="true" :isHandle="false"
            :tableData="heigherOrgTableData" :tableCols="heigherOrgTableCols" :sortable="false" :isPagination="false"
            :isSingle="true" />
          <p style="color: #f78989">* 上级行部门、行外单位只可选择一项</p>
        </el-form-item>-->
      </el-form>
      <div slot="footer">
        <el-button @click="cancelHeigherOrgDialog()">取消</el-button>
        <el-button type="primary" @click="sureSendHeigherOrg">确定</el-button>
      </div>
    </el-dialog>
    <!-- 
      选择上级行部门弹窗
    -->
    <org-tree
      v-model="showOrgTree"
      title="请选择机构"
      :isSingle="true"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    <!-- 部门 -->
    <org-tree-bm
      v-model="showOrgTreeOne"
      title="请选择部门"
      :isSingle="false"
      :orgOrDept="0"
      @orgList="getOrgListOne"
      :selectDept="selectDeptOne"
    ></org-tree-bm>
    <!-- 
      查看流程弹窗
    -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <!-- 二维码弹窗 -->
    <el-dialog title="二维码" :visible.sync="erweima" class="dialogImport">
      <div class="ewm">
        <div class="qrcode" ref="qrCodeUrl"></div>
      </div>
      <span style="text-align: center; display: block; margin-top: 20px">
        <el-button @click="printThis">打印</el-button>
        <el-button type="primary" @click="erweima = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 常用批语 -->
    <!-- <write-list-ts v-model="appendWriteDialog" @childsaveselect="writelistvalue"></write-list-ts>
    -->
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
    <!-- 
      生成模板弹窗
    -->
    <el-dialog title="生成模板" :visible.sync="templateopen" class="normalFormDia">
      <el-form :model="tempForm" label-width="100px" class="normalForm">
        <el-form-item label="请填写模板名称">
          <el-input v-model="tempForm.modelName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <!-- <el-button @click="templateDialog = false">取消</el-button> -->
        <el-button type="primary" @click="modelbtn">确定</el-button>
      </div>
    </el-dialog>
    <!-- 用印查看图片&视频 -->
    <seal-img-detail ref="sealImgDetail"></seal-img-detail>
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
            <el-input v-model="YRDeal.documentCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="标题" style="width:80%;margin-top:16px;">
            <el-button type="text" @click="viewFile(YRDeal, '1')">{{YRDeal.title}}</el-button>
          </el-form-item>
          <!--     附件     -->
          <el-row>
            <el-form-item label="附件">
              <el-col :span="24">
                <div class="tree_w" v-if="YRDeal.file&&YRDeal.file.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  YRDeal.file" :key="index" class="comp_list">
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
        <!-- <el-button type="primary" @click="YRBacksure">确定</el-button> -->
        <el-button @click="YRhandleCloseDeal">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import selectPerson from "components/tree/treeTansun";
import yiyi from "@/views/sealManage/mixins/yiyj.js";
import mTable from "components/table/tTable";
import baseSearchForm from "components/form/baseSearchForm";
import mixins from "@/minixs/index";
import orgTree from "components/tree/orgTree";
import orgTreeBm from "components/tree/shiwuOrgTree";
import useSealMixins from "@/views/sealDrafttt/mixins/index";
import docMixins from "../mixins/docMixins";
import exportTable from "@/minixs/exportTable";
import openOrDownLoadFile from "@/minixs/openOrDownLoadFile";
import QRCode from "qrcodejs2";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import writeListTs from "components/appendWriteList/writeListTs";
import treeCofig from "@/components/tree/tree-fawen";
import sealImgDetail from "views/sealDrafttt/components/sealImgDetail";
import appendWriteList from "components/viewFlow/perWrit";
import viewDraft from "@/minixs/viewDraft";
import shiwuLineWord from "@/minixs/shiwuLineWord";
import detailList from "../components/detailList";
import selectPerson from "components/viewFlow/dispatchTree"; //流程调度树

export default {
  name: "Gw",
  components: {
    selectPerson,
    mTable,
    baseSearchForm,
    orgTree,
    shiwuFlow,
    // writeListTs,
    orgTreeBm,
    treeCofig,
    sealImgDetail,
    appendWriteList,
    detailList
  },
  mixins: [
    mixins,
    useSealMixins,
    openOrDownLoadFile,
    docMixins,
    shiwuLineWord,
    yiyi,
    viewDraft
  ],
  data() {
    return {
      numYears: this.$route.query.numYear ? this.$route.query.numYear : "",
      isdialogYRDeal: false,
      YRDeal: {
        YRCode: "",
        YRTitle: ""
      },
      watchCk: "guanLiCk",
      // 生成模板字段
      tempForm: {
        templTitle: ""
      },
      templateopen: false, //生成模板控制
      selsecOrgOrDeptId: "",
      Isweihu: true,
      currentNodeIdMarkType: "",
      unitSyncCode: "",
      deptTableHead:
        JSON.parse(localStorage.getItem("userInfo")).unitName +
        "公文用印登记单",
      departMentId: "",
      offenDevices: [], //常用标语
      loading: false,
      // 标记类型（用印）
      markOrderType: "document",
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      registeHeader:
        JSON.parse(localStorage.getItem("userInfo")).unitName +
        "公文用印登记单",
      // 生成编号标记
      documentNoNum: 0,
      documentNoNum1: "0",
      // 表单是否可编辑（维护）
      inputDisable: true,
      // 判断是否保存过
      isSave: false,
      yzscUnit: "",
      isShow: false,
      form: {
        // 查看流程所传参数
        workflowId: "",
        draftDate: "",
        draftUser: "", // 申请人或者经办人
        draftUserId: "",
        yzBgrYj: "",
        yyReason: "发文归档",
        sendDept: "档案部门",
        title: "",
        remark: "",
        /**
         * 二维码信息采集表
         */
        ewmRq: "", // 日期
        ewmZt: "", // 主体
        ewmSx: "", // 事项
        departFirstDepartmentId: "", // 申请单位【拟稿一级部门id】
        departFirstDepartment: "", // 申请单位名称  【拟稿一级部门】
        draftDepartmentId: "", // 拟稿部门id
        draftDepartment: "", //拟稿部门名称
        currentUserId: "", // 当前处理人id
        currentUser: "", // 当前处理人名称
        draftOrganId: "", // 拟稿机构id
        draftOrgan: "", // 拟稿机构简称
        currentDepartmentId: "", // 当前处理人一级部门id
        departName: "", // 当前处理人部门
        departId: "", // 当前处理人部门id
        deptTableHeader: "" //表头
      },
      // 申请单位 下拉框option
      draftOrganOption: [],
      // 配置信息
      configInfo: {},
      //用印类型
      markTypeOptions: [],
      regSealFormRule: {},
      tableData: [],
      // 用印公文表格的多选
      multipleSelection: [],
      sendId: "",
      /**
       * 常用批语
       */
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型
      /**
       * 树状选择弹框
       */
      treeData: [], //树弹框数据
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,
      /**
       * 引入用印公文查询弹窗
       */
      // bankOptions: JSON.parse(localStorage.getItem("unitInfo")) || [],
      // 判断是否办结
      isImpDocDis: false,
      importDialog: false,
      docTableData: [
        // {
        //   id: '0',
        //   createTime: '2020-12-30',
        //   documentNo: '123',
        //   title: 'yizi',
        //   draftDepartment: '安徽',
        //   currentUser: 'yizi'
        // },
        // {
        //   id: '1',
        //   createTime: '2020-12-31',
        //   documentNo: '1231',
        //   title: 'yizi1',
        //   draftDepartment: '安徽1',
        //   currentUser: 'yizi1'
        // },
        // {
        //   id: '2',
        //   createTime: '2020-12-302',
        //   documentNo: '1232',
        //   title: 'yizi2',
        //   draftDepartment: '安徽2',
        //   currentUser: 'yizi2'
        // },
      ],
      id: "",
      tableCols: [
        { label: "拟稿日期", prop: "createTime" },
        { label: "发文字号", prop: "documentNo" },
        { label: "标题", prop: "title" },
        { label: "拟稿部门", prop: "draftDepartment" },
        { label: "当前处理人", prop: "currentUser" }
      ],
      // 引入公文的表单信息
      formData: {
        draftRangeTime: [],
        sendRangeTime: [],
        draftTimeStart: "",
        draftTimeEnd: "",
        sendTimeStart: "",
        sendTimeEnd: "",
        title: "",
        documentNo: "〔2021〕",
        draftDepartmentId: "",
        draftDepartmentName: "",
        // draftOrganId: "",
        orderState: "2",
        orderType: "",
        sendType: "0",
        formType: "1"
      },
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      /**
       * 用印选择弹窗
       */
      selUseSealDialog: false,
      selUseSealTableData: [],
      // 用印方式
      fldYyfsObj: {},
      fldYyfsValue: "",
      /**
       * 批量操作用印份数弹窗
       */
      sealCountDialog: false,
      batchCount: 0,
      selUseSealID: "",
      /**
       * 发送上级行弹窗
       */
      heigherOrgDialog: false,
      heigherOrgForm: {
        unitName: "",
        unitId: ""
      },
      showOrgTree: false,
      showOrgTreeOne: false,
      selectDeptOne: [],
      //机构或者部门 机构为1，部门为0
      orgOrDept: 0,
      orgOrDeptId: "", //获取部门或机构id
      heigherOrgTableData: [
        { a: "1", b: "2", c: "3", id: "0" },
        { a: "2", b: "1", c: "3", id: "1" },
        { a: "3", b: "2", c: "3", id: "2" }
      ],
      heigherOrgTableCols: [
        { label: "OA机构简称", prop: "a" },
        { label: "登录名", prop: "b" },
        { label: "机构综合代表中文名", prop: "c" }
      ],
      /**
       * 查看流程弹窗
       */
      flowChartList: [],
      // 二维码弹窗
      erweima: false,
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      num1Str: "",
      // 选择主办部门弹窗
      mainDeptTreeData: [],
      mainDeptDialogState: false,
      // 退回修改弹窗
      rebackDia: false,
      rebackReason: "",
      // 标记流程调度/完成并发送
      isLinkChange: false,
      /**
       * 环节信息
       */
      huanJieMessage: {},
      //不可编辑控制域
      readFields: {
        draftUser: false, //申请人
        departFirstDepartmentId: false, // 申请单位id
        draftDate: false, //申请时间
        documentNo: false, //编号
        title: false, //标题
        yyReason: false, //用印原因
        sendDept: false, //发往单位
        useTime: false, //用印时间
        fldYyfs: false, //用印方式
        ewmRq: false, // 日期
        ewmZt: false, // 主体
        ewmSx: false // 事项
      },
      //必填控制域
      requiredFields: {
        draftUser: "",
        departFirstDepartmentId: "",
        markType: "",
        title: "",
        yyReason: "",
        sendDept: "",
        markNum: "",
        useTime: "",
        fldYyfs: ""
      },
      //可编辑意见域
      editedIdeaFields: {
        yzBgrYj: true, //印章保管人意见
        remark: true //备注
      },
      //必填意见域
      requiredIdeaFields: {
        yzBgrYj: false,
        remark: false //备注
      },
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wcbfs", show: false },
        { name: "发送上级行", type: "fssjh", show: false },
        { name: "生成编号", type: "scbh", show: false },
        { name: "生成模板", type: "scmb", show: false },
        { name: "用印", type: "yongyin", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "删除此文", type: "shanchuciwen", show: false },
        { name: "收回", type: "shouhui", show: false },
        { name: "退回修改", type: "thxg", show: false },
        { name: "退回", type: "tuihui", show: false },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "查看流程", type: "cklc", show: false },
        { name: "维护", type: "weihu", show: false },
        { name: "操作指南", type: "czzn", show: false },
        { name: "流程调度", type: "lcdd", show: false },
        { name: "归档打印", type: "gddy", show: false },
        { name: "扫描二维码", type: "smewm", show: false }
      ]
    };
  },
  watch: {
    "form.departFirstDepartmentId": {
      handler(val) {
        if (val) {
          // this.getUseSealTypeFun();
          // this.getSealNumFun();
        }
      },
      immediate: true
    }
  },
  computed: {
    sumar() {
      let sumaryObj = {};
      this.tableData.map(item => {
        if (item.sealDetail && item.useSealCount) {
          let sealDetailArr = item.sealDetail.split(",");
          sealDetailArr.map(itemSealD => {
            let arr = itemSealD.split(" ");
            if (sumaryObj[arr[0]]) {
              sumaryObj[arr[0]] =
                parseInt(sumaryObj[arr[0]]) +
                parseInt(arr[1]) * item.useSealCount;
            } else {
              sumaryObj[arr[0]] = parseInt(arr[1]) * item.useSealCount;
            }
          });
        }
      });
      let sumar = JSON.stringify(sumaryObj);
      return sumar;
    },
    sumary() {
      let sumar = this.sumar;
      sumar = sumar.substring(1, sumar.length - 1);
      sumar = sumar.replace(/\"/g, "");
      return sumar;
    },
    fldYyfs() {
      if (this.$route.query.id) {
        return this.fldYyfsValue;
      } else {
        // 机器盖章
        let fldYyfsMechine = [];
        // 手工盖章
        let fldYyfsHander = [];
        let sumaryObj = this.sumary ? JSON.parse(this.sumar) : {};
        for (const key in sumaryObj) {
          this.fldYyfsObj[key] === "用印机"
            ? fldYyfsMechine.push(key)
            : fldYyfsHander.push(key);
        }
        let fldYyfs = "";
        if (fldYyfsMechine.length > 0 && fldYyfsHander.length > 0) {
          fldYyfs = `机器盖章：${fldYyfsMechine.join(
            ","
          )};手工盖章：${fldYyfsHander.join(",")}`;
        }
        if (fldYyfsMechine.length > 0 && fldYyfsHander.length === 0) {
          fldYyfs = `机器盖章：${fldYyfsMechine.join(",")}`;
        }
        if (fldYyfsMechine.length === 0 && fldYyfsHander.length > 0) {
          fldYyfs = `手工盖章：${fldYyfsHander.join(",")}`;
        }
        return fldYyfs;
      }
    }
  },
  created() {
    console.log(this.numYears);
    this.notOpenPage();
    /** 获取当前部门信息 */
    this.form.draftOrganId = JSON.parse(
      localStorage.getItem("userInfo")
    ).unitId; // 获取拟稿机构id
    this.form.draftOrgan = JSON.parse(
      localStorage.getItem("userInfo")
    ).unitName;
    // let departmentInfo = JSON.parse(localStorage.getItem("unitInfo"));
    // console.log(departmentInfo, "----------获取当前部门信息-----------");
    this.id = this.$route.query.id;
    // this.draftOrganOption = departmentInfo;
    if (this.$route.query.draftOrgan) {
      this.draftOrganOption = JSON.parse(this.$route.query.draftOrganOption);
      this.form.departFirstDepartmentId = this.$route.query.draftOrgan; // 获取带进来的申请单位code
      this.draftOrganOption &&
        this.draftOrganOption.map(item => {
          if (this.form.departFirstDepartmentId == item.firstUnitId) {
            console.log(item, "需要的目标");
            this.form.currentDepartmentId = item.firstUnitId; // 获取当前处理人一级部门id
            this.form.departFirstDepartmentId = item.firstUnitId;
            this.form.departFirstDepartment = item.firstUnitName;
            this.form.draftDepartmentId = item.currUnitId; // 获取拟稿部门id
            this.form.draftDepartment = item.currUnitName; // 获取拟稿部门名称
            /**
             * draftUserId、draftUser、currentUserId、currentUser 这些字段目前都取humanId 或者humanName的值
             */
            this.form.draftUserId = item.humanId; // 经办人id
            this.form.draftUser = item.humanName; // 经办人【申请人】
            this.form.currentUserId = item.humanId; // 获取当前处理人id
            this.form.currentUser = item.humanName; // 当前处理人名称
            // this.form.draftOrganId = item.unitId; // 获取拟稿机构id
            this.form.draftOrgan = item.unitName; // 获取拟稿机构名称
            // this.formData.draftOrganId = item.unitName;
          }
        });

      // this.getOrgInfo();
    }
    if (this.$route.query.id) {
      this.isShow = true;
      this.getDetailDocument();
    } else {
      this.currentNodeIdMarkType = this.$route.query.currentNodeId;
      this.isShow = false;
      this.getSealNumFun();
      this.getLink();
    }
    // this.yzlist();

    this.getUseSealTypeFun();
  },
  mounted() {
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
  },
  methods: {
    YRhandleCloseDeal() {
      this.isdialogYRDeal = false;
    },
    // 查看发文详情
    lookFaWenDeatail(row) {
      let that = this;
      let obj = {
        function: "importBasis",
        multiTenancyId: "CN000",
        documentCode: row.documentNo
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
            this.YRJump({ ...res.data, dataType: "2" });
          }
        });
    },
    beforeunloadHandler(e) {
      this.$intent.clonsWindowCk(this.$route.query.id || this.sendId);
    },
    //禁止打开相同页面
    notOpenPage() {
      var openFlagCk = localStorage.getItem("openFlagCk");
      if (openFlagCk) {
        var openFlagArr = JSON.parse(openFlagCk);
        openFlagArr.push(this.$route.query.id || this.sendId);
        openFlagArr = this.$intent.arrUniq(openFlagArr);
        localStorage.setItem("openFlagCk", JSON.stringify(openFlagArr));
      } else {
        var openFlagCk = [];
        openFlagCk.push(this.$route.query.id || this.sendId);
        localStorage.setItem("openFlagCk", JSON.stringify(openFlagCk));
      }
    },
    // 生成模板确定
    modelbtn() {
      this.$api.sealManage
        .BanMban({
          markOrderType: "1",
          id: this.sendId || this.$route.query.id,
          modelName: this.tempForm.modelName,
          numYear: this.numYears
        })
        .then(res => {
          console.log(res);
          this.$message({
            type: "success",
            message: "生成模板成功！"
          });
          this.templateopen = false;
        })
        .catch(res => {
          console.log(res);
        });
    },
    //删除意见
    delefunc(item) {
      this.$api.sealManage.delItem(item).then(res => {
        console.log(res);
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getDetailDocument();
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
    /**
     * 初始化加载数据
     */
    InitializeData() {},
    /**
     * 获取用印类型
     */
    getUseSealTypeFun() {
      // 获取用印类型
      const departArrays = JSON.parse(localStorage.getItem("unitInfo"));
      for (const i in departArrays) {
        if (departArrays[i].firstUnitId === this.form.departFirstDepartmentId) {
          this.departMentId = departArrays[i].unitCodes;
        }
      }
      const arrays = this.departMentId.split("/");
      this.$api.sealManage.getUseSealType({ departId: arrays[0] }).then(res => {
        this.configInfo = res.data;
        this.yzscUnit = res.data.scUnit2;
        console.log(this.yzscUnit, "this.yzscUnit");
        // this.form.deptTableHead = res.deptTableHead + "公文用印登记单";
        // console.log(this.form.deptTableHeader, "this.form.deptTableHeader");
        // this.form.deptTableHeader = this.deptTableHead;
        // 如果没有id  则设置默认为第一个
        if (this.$route.query.id === undefined) {
          // 获取申请时间
          this.form.draftDate = res.newDateYY;
          // 获取二维码信息采集表日期
          this.form.ewmRq = res.newDate;
        }
      });
    },
    /**
     * 获取编号
     */
    getSealNumFun() {
      const departArrays = JSON.parse(localStorage.getItem("unitInfo"));
      for (const i in departArrays) {
        if (departArrays[i].firstUnitId === this.form.departFirstDepartmentId) {
          this.departMentId = departArrays[i].unitCodes;
        }
      }
      const arrays =
        this.departMentId != ""
          ? this.departMentId.split("/")
          : this.form.draftDepartmentId;
      this.$api.sealManage
        .getSealNum({
          markOrderType: "1",
          // unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
          statusType: false,
          draftDepartmentId:
            typeof arrays != "string" ? arrays[arrays.length - 1] : arrays
        })
        .then(res => {
          console.log(
            res,
            "---------------------------------获取编号----------------------------"
          );
          this.$set(this.form, "documentNo", res.data);
        });
      // 临时注释掉
      // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // this.form.draftUser = userInfo.humanName
      // this.form.draftUserId = userInfo.humanId
      // this.form.sdept = this.$route.query.draftOrganName
    },
    /**
     * 根据id 获取详情页
     */
    getDetailDocument() {
      return new Promise((resolve, reject) => {
        this.$api.sealManage
          .detailDocument({
            id: this.id,
            draftOrganId: this.$route.query.draftOrganId,
            numYear: this.numYears
          })
          .then(res => {
            console.log(
              res.data,
              "---------------------根据id获取详情页------------------------"
            );
            if (res.data && res.data.deptTableHeader) {
              this.deptTableHead = res.data.deptTableHeader;
              this.registeHeader = res.data.deptTableHeader;
            }
            let As = res.data.documentNo.split("〕")[1];
            console.log("true", As);
            if (As === "号") {
              this.documentNoNum1 = "0";
            } else {
              this.documentNoNum1 = "1";
            }
            this.form = JSON.parse(JSON.stringify(res.data));
            // this.selsecOrgOrDeptId = this.form.draftOrganId;
            resolve(res.data);
            this.num1Str = res.data.num1Str; //查看详情新增id
            if (res.data.yyType) {
              this.randomStr1 = res.data.markMainForm;
              this.tableSealStateData = JSON.parse(res.data.yyType);
            }
            this.tableData = JSON.parse(
              JSON.stringify(JSON.parse(res.data.rtfAssetList))
            );
            console.log(this.tableData, "表格数据");
            this.fldYyfsValue = res.data.fldYyfs;

            //拟稿人部门
            this.form.departFirstDepartment = res.data.departFirstDepartment;
            this.form.departFirstDepartmentId =
              res.data.departFirstDepartmentId;
            //当前处理人部门 当前处理人的第一部门
            this.form.departName = res.data.departName;
            this.form.departId = res.data.departId;
            // //拟稿人
            this.form.draftUser = res.data.draftUser;
            this.form.draftUserId = res.data.draftUserId;
            this.form.draftOrganId = res.data.draftOrganId;
            this.form.deptTableHeader = res.data.deptTableHeader;
            console.log(this.form.deptTableHeader, "this.form.deptTableHeader");
            this.currentNodeIdMarkType = res.data.sendUpUnitLabel;
            // this.getLink();
          });
      });
    },
    /**
     * 申请单位change 事件
     */
    departFirstDepartmentChange() {
      // console.log(val, "chnage事件");
      // let _this = this;
      // _this.getOrgInfo();
      // this.form.draftOrganId = JSON.parse(
      //   localStorage.getItem("userInfo")
      // ).unitId; // 获取拟稿机构id
      // this.form.draftOrgan = JSON.parse(
      //   localStorage.getItem("userInfo")
      // ).unitName;
      this.draftOrganOption &&
        this.draftOrganOption.map(item => {
          if (this.form.departFirstDepartment == item.firstUnitName) {
            console.log(item, "需要的目标");
            this.form.currentDepartmentId = item.firstUnitId; // 获取当前处理人一级部门id
            this.form.departFirstDepartmentId = item.firstUnitId;
            this.form.departFirstDepartment = item.firstUnitName;
            this.form.draftDepartmentId = item.currUnitId; // 获取拟稿部门id
            this.form.draftDepartment = item.currUnitName; // 获取拟稿部门名称
            /**
             * draftUserId、draftUser、currentUserId、currentUser 这些字段目前都取humanId 或者humanName的值
             */
            this.form.draftUserId = item.humanId; // 经办人id
            this.form.draftUser = item.humanName; // 经办人【申请人】
            this.form.currentUserId = item.humanId; // 获取当前处理人id
            this.form.currentUser = item.humanName; // 当前处理人名称
            // this.form.draftOrganId = item.unitId; // 获取拟稿机构id
            this.form.draftOrgan = item.unitName; // 获取拟稿机构名称
            // this.formData.draftOrganId = item.unitName;
          }
        });
    },
    /**
     * 设置必填项
     */
    setRuleConfig() {
      this.regSealFormRule = {
        draftUser: [
          {
            required: this.requiredFields.draftUser,
            message: "申请人不能为空",
            trigger: "blur"
          }
        ],
        departFirstDepartmentId: [
          {
            required: this.requiredFields.departFirstDepartmentId,
            message: "申请单位不能为空",
            trigger: "change"
          }
        ],
        draftDate: [
          {
            required: this.requiredFields.draftDate,
            message: "申请时间不能为空",
            trigger: "blur"
          }
        ],
        markType: [
          {
            required: this.requiredFields.markType,
            message: "用印类型不能为空",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: this.requiredFields.title,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        yyReason: [
          {
            required: this.requiredFields.yyReason,
            message: "用印原因不能为空",
            trigger: "blur"
          }
        ],
        sendDept: [
          {
            required: this.requiredFields.sendDept,
            message: "发放单位不能为空",
            trigger: "blur"
          }
        ],
        markNum: [
          {
            required: this.requiredFields.markNum,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        useTime: [
          {
            required: this.requiredFields.useTime,
            message: "用印时间不能为空",
            trigger: "blur"
          }
        ],
        fldYyfs: [
          {
            required: this.requiredFields.fldYyfs,
            message: "用印方式不能为空",
            trigger: "blur"
          }
        ],
        yzBgrYj: [
          {
            required: this.requiredIdeaFields.yzBgrYj,
            message: "印章保管人意见不能为空",
            trigger: "change"
          }
        ],
        ewmZt: [
          {
            required: this.requiredFields.ewmZt,
            message: "主体不能为空",
            trigger: "blur"
          }
        ],
        ewmSx: [
          {
            required: this.requiredFields.ewmSx,
            message: "事项不能为空",
            trigger: "blur"
          }
        ]
      };
    },
    //常用批语
    // showWriteList (type) {
    //   this.clickTypes = type;
    //   this.appendWriteDialog = true;
    // },
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
    //常用批语
    writelistvalue(data) {
      switch (this.clickTypes) {
        case "yzBgrYj":
          this.$set(
            this.form,
            "yzBgrYj",
            this.form.yzBgrYj ? this.form.yzBgrYj + data : data
          );
          break;
      }
    },

    //获取环节
    getLink() {
      let params = {
        markOrderType: "1",
        id: this.sendId || (this.$route.query.id ? this.$route.query.id : ""),
        multiIdType: this.currentNodeIdMarkType // 判断是本行公文用印还是集中式公文用印  0=》本行  1=》集中式
      };
      this.$api.sealManage.getLink(params).then(res => {
        console.log(res, "获取环节");
        this.huanJieMessage = res.Fields;
        // 设置必填的控制域
        this.requiredFields = this.setRequiredFields(
          this.requiredFields,
          this.huanJieMessage.requiredFields
        );
        //设置不可编辑控制域
        this.readFields = this.setReadFields(
          this.readFields,
          this.huanJieMessage.readFields
        );
        this.buttonList = this.showButton(
          this.buttonList,
          this.huanJieMessage.visibleButtons,
          this.huanJieMessage.visibleButtonsBycondition
        ); //带约束条件可操作按钮
        //设置可编辑意见域
        this.editedIdeaFields = this.setEditedIdeaFields(
          this.editedIdeaFields,
          this.huanJieMessage.editedIdeaFields,
          this.huanJieMessage.editedIdeaFieldsBycondition
        );
        //设置必填的意见域
        this.requiredIdeaFields = this.setRequiredIdeaFields(
          this.requiredIdeaFields,
          this.huanJieMessage.requiredIdeaFields
        );
        this.setRuleConfig();
      });
    },
    //完成并发送选人弹出框
    showCompDialog(data, status, type, params, dtype) {
      console.log("-------->", data, status, type, "params", params, dtype);
      if (status) {
        if (data.length === 0) {
          this.$message({
            type: "warning",
            message: "请选择下一节点处理人"
          });
          return;
        }
        let param = {
          markOrderType: "1",
          id: this.sendId || this.$route.query.id || "",
          nextUserId: String(data[0].id),
          nextUserName: data[0].name,
          nextAvyId: params.id,
          nextAvyName: params.name,
          unitId: data[0].deptId,
          wcfs: true,
          isAdmin: "1"
        };
        this.$api.sealManage.sureHander({ ...param }).then(res => {
          this.dialogState = false;
          this.$message({
            type: "success",
            message: "已成功发送至下一节点"
          });
          /** 调消息提醒*/
          // this.MessageReminder();
          if (this.isLinkChange) {
            this.dialogState = false;
          } else {
            this.$intent.closeWindow(this);
          }
        });
      } else {
        this.dialogState = false;
      }
    },
    // 打印二维码
    printThis() {
      document.execCommand("print");
    },
    //关闭
    close() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.save();
          this.$intent.closeWindow(this);
        })
        .catch(action => {
          console.log(action);
          if (action == "close") {
          } else {
            this.$intent.closeWindow(this);
          }
        });
    },
    //保存
    save() {
      let flag = false;
      if (this.tableData.length === 0) {
        this.$message({
          type: "warning",
          message: "请引入用印公文"
        });
        return;
      }
      this.tableData.map(item => {
        if (item.sealDetail === "" || parseInt(item.useSealCount) === 0) {
          this.$message({
            type: "warning",
            message: "请完善用印公文相关信息"
          });
          flag = true;
          // throw new Error('未完善用印公文相关信息')
        }
      });
      this.$refs.registerForm.validate((valid, object) => {
        if (valid) {
          if (this.isImpDocDis) {
            this.$message({
              type: "warning",
              message: "该审批单已办结！"
            });
            return;
          }
          if (flag) return;
          this.sendId || this.$route.query.id
            ? this.updateData()
            : this.addData(); // 有id 则更新否则新增
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项后保存！"
          });
          // 滚动到必填项位置
          for (let i in object) {
            let dom = this.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
        }
      });
    },
    /**
     * 新增数据
     */
    addData() {
      let num1 = 0;
      for (const i in this.tableData) {
        num1 += this.tableData[i].num;
      }
      // if (this.isSave) {
      //   this.$message({
      //     type: 'warning',
      //     message: '该审批单已保存'
      //   })
      //   return
      // }
      let params = {};
      if (this.$route.query.currentNodeId) {
        const departArrays = JSON.parse(localStorage.getItem("unitInfo"));
        for (const i in departArrays) {
          if (
            departArrays[i].firstUnitId === this.form.departFirstDepartmentId
          ) {
            this.departMentId = departArrays[i].unitCodes;
          }
        }
        const arrays = this.departMentId.split("/");
        params = {
          multiIdType: this.$route.query.currentNodeId,
          draftOrgan: this.form.draftOrgan,
          draftOrganId: this.form.draftOrganId,
          fldYyfs: this.fldYyfs,
          rtfAssetList: this.tableData,
          currentNode: "起草",
          markNum: num1,
          yyCount: num1,
          yyType: this.tableSealStateData,
          departId: arrays[arrays.length - 1],
          deptTableHeader: this.deptTableHead
        };
      }
      this.$api.sealManage
        .addDocument(Object.assign(this.form, params))
        .then(res => {
          if (res.code === "SUCCESS") {
            this.sendId = res.Id;
            this.id = res.Id;
            this.getDetailDocument();
            // this.isSave = true
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getLink();
          }
        });
    },
    /**
     * 更新数据
     */
    updateData() {
      let num1 = 0;
      for (const i in this.tableData) {
        num1 += this.tableData[i].num;
      }
      this.$api.sealManage
        .updateDocument({
          ...this.form,
          id: this.sendId || this.$route.query.id,
          fldYyfs: this.fldYyfs,
          rtfAssetList: this.tableData,
          markNum: num1,
          yyCount: num1,
          yyType: this.tableSealStateData,
          deptTableHeader: this.deptTableHead,
          isAdmin: "1"
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.Isweihu = true;
          }
          this.getDetailDocument();
        });
    },
    updateData1() {
      let num1 = 0;
      for (const i in this.tableData) {
        num1 += this.tableData[i].num;
      }
      this.$api.sealManage
        .updateDocument({
          ...this.form,
          id: this.sendId || this.$route.query.id,
          fldYyfs: this.fldYyfs,
          rtfAssetList: this.tableData,
          markNum: num1,
          yyCount: num1,
          yyType: this.tableSealStateData,
          deptTableHeader: this.deptTableHead,
          isAdmin: "1"
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.Isweihu = true;
          }
          this.getDetailDocument();
        });
    },

    /**
     * 操作按钮事件
     */
    buttonClick(item) {
      switch (item) {
        case "区块链归档":
          this.$api.sealManage
            .blockChainGw({
              markOrderType: "1",
              id: this.$route.query.id || this.sendId,
              numYear:this.numYears
            })
            .then(res => {
              this.$message({
                type: "success",
                offset: "200",
                message: "区块链归档完成"
              });
            });

          break;
        case "归档":
          this.$api.sealManage
            .guiDang({
              markOrderType: "1",
              id: this.$route.query.id || this.sendId,
              numYear: this.numYears
            })
            .then(res => {
              this.$message({
                type: "success",
                offset: "200",
                message: "归档完成"
              });
            });
          break;
        case "关闭":
          this.close();
          break;
        case "关闭1":
          this.$intent.closeWindow(this);
          break;
        case "保存":
          this.save();
          break;
        case "删除此文":
          this.delThisArticle();
          break;
        case "流程调度":
          // this.dialogState = true;
          this.updateData1();
          this.processScheduling();

          break;
        case "生成模板":
          this.templateopen = true;
          break;

        case "查看流程":
          this.viewProcess();
          break;

        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/sealDocument",
            query: {
              id: this.sendId || this.$route.query.id,
              registeHeader: this.registeHeader,
              flag: "cld",
              numYear: this.numYears
            }
          });
          break;
        case "归档打印":
          this.$intent.goNewPage(this, {
            path: "/sealDocument",
            query: {
              id: this.sendId || this.$route.query.id,
              registeHeader: this.registeHeader
            }
          });
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              this.$api.sealManage
                .shoucang({
                  markOrderType: "1",
                  id: this.$route.query.id || this.sendId,
                  numYear: this.numYears
                })
                .then(res => {
                  console.log(res, "收藏");
                  let obj = {};
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName;
                  this.downFile(obj);
                  this.$message({
                    type: "success",
                    offset: "200",
                    message: "收藏完成"
                  });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });

          break;
        case "操作指南":
          this.handBook("YZGL");
          break;
        case "维护":
          this.Isweihu = !this.Isweihu;
          break;
      }
    },
    /**
     * 删除此文
     */
    delThisArticle() {
      this.$confirm("是否删除并关闭页面？")
        .then(() => {
          this.$api.sealManage
            .delDocument({ id: this.sendId || this.$route.query.id })
            .then(res => {
              if (res.code === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
                // this.$router.push("/sealManage/useSeal");
                this.$intent.closeWindow(this);
              }
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 附件下载
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
    /**
     * 流程调度
     */
    processScheduling() {
      this.$api.sealManage
        .flowControl({
          markOrderType: "1",
          id: this.sendId || this.$route.query.id
        })
        .then(res => {
          console.log(res, "环节数据");
          this.selsecOrgOrDeptId = res.currentOrgId;
          this.dialogState = true;
          let PCSAVYIDs = [];
          this.seletOptionsData = res.list.filter(item => {
            if (!PCSAVYIDs.includes(item.PCSAVYID)) {
              PCSAVYIDs.push(item.PCSAVYID);
              return item;
            }
          });
        });
    },
    /**
     * 完成并发送
     */
    completeAndSend() {
      let flag = false;
      if (this.tableData.length === 0) {
        this.$message({
          type: "warning",
          message: "请引入用印公文"
        });
        return;
      }
      this.tableData.map(item => {
        if (item.sealDetail === "" || parseInt(item.useSealCount) === 0) {
          this.$message({
            type: "warning",
            message: "请完善用印公文相关信息"
          });
          flag = true;
          // throw new Error('未完善用印公文相关信息')
        }
      });
      this.$refs.registerForm.validate((valid, object) => {
        if (valid) {
          if (this.isImpDocDis) {
            this.$message({
              type: "warning",
              message: "该审批单已办结！"
            });
            return;
          }
          if (flag) return;
          this.sendDocument();
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项后保存！"
          });
          // 滚动到必填项位置
          for (let i in object) {
            let dom = this.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
        }
      });
    },
    /**
     * 发送上级行
     */
    sendToParentBank() {
      let flag = false;
      if (this.tableData.length === 0) {
        this.$message({
          type: "warning",
          message: "请引入用印公文"
        });
        return;
      }
      this.tableData.map(item => {
        if (item.sealDetail === "" || parseInt(item.useSealCount) === 0) {
          this.$message({
            type: "warning",
            message: "请完善用印公文相关信息"
          });
          flag = true;
          // throw new Error('未完善用印公文相关信息')
        }
      });
      this.$refs.registerForm.validate((valid, object) => {
        if (valid) {
          if (flag) return;
          this.sendBankDocument();
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项后保存！"
          });
          // 滚动到必填项位置
          for (let i in object) {
            let dom = this.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
        }
      });
    },
    /**
     * 获取部门信息【完成并发送时调用】
     */
    sendDocument() {
      const departArrays = JSON.parse(localStorage.getItem("unitInfo"));
      for (const i in departArrays) {
        if (departArrays[i].firstUnitId === this.form.departFirstDepartmentId) {
          this.departMentId = departArrays[i].unitCodes;
        }
      }
      const arrays = this.departMentId.split("/");
      let params = {
        markOrderType: "1", // 判断是不是公文用印
        id: this.sendId || this.$route.query.id || "",
        multiIdType: this.$route.query.currentNodeId,
        // draftOrgan: this.$route.query.draftOrgan,
        fldYyfs: this.fldYyfs,
        rtfAssetList: this.tableData,
        yyType: this.tableSealStateData,
        departId: arrays[arrays.length - 1],
        deptTableHeader: this.deptTableHead
        // ...this.form,
      };
      this.$api.sealManage
        .sendDocument(Object.assign(this.form, params))
        .then(res => {
          console.log(res, "<<<<----完成并发送成功---->>>>");
          // this.treeData = res.result.data
          this.sendId = res.id;
          this.dialogState = true;
          this.isLinkChange = false;
          this.$nextTick(() => {
            this.seletOptionsData = res.list;
          });
        });
    },
    /**
     * 获取发送文档信息【发送上级行时调用】
     */
    sendBankDocument() {
      let sendHeigherparams = {
        markOrderType: "1",
        id: this.sendId || this.$route.query.id || "",
        multiIdType: this.$route.query.currentNodeId,
        // draftOrgan: this.$route.query.draftOrgan,
        fldYyfs: this.fldYyfs,
        rtfAssetList: this.tableData,
        SJH: "1",
        // ...this.form,
        yyType: this.tableSealStateData
      };
      console.log(
        this.form,
        sendHeigherparams,
        "-------------------发送上级行时的参数--------------"
      );
      this.$api.sealManage
        .sendDocument(Object.assign(this.form, sendHeigherparams))
        .then(res => {
          console.log(
            res,
            "---------------- 发送上级行--------------------------"
          );
          this.orgOrDeptId = res.unitId; // 获取部门或机构id
          this.sendId = res.id;
          this.$nextTick(() => {
            this.heigherOrgDialog = true;
            // this.heigherOrgForm.PCSAVYID = res.list[0].PCSAVYID;
            // this.heigherOrgForm.AVYNODENM = res.list[0].AVYNODENM;
            this.heigherOrgForm.PCSAVYID =
              res.list && res.list.length > 0 ? res.list[0].PCSAVYID : "";
            this.heigherOrgForm.AVYNODENM =
              res.list && res.list.length > 0 ? res.list[0].AVYNODENM : "";
          });
        });
    },
    /**
     * 查看流程
     */
    viewProcess() {
      if (this.form.workflowId === "") {
        this.flowChartList = [
          {
            EXCNM: this.userInfo.humanName,
            HUMANCODE: this.userInfo.humanCode,
            NODE: "起草"
          }
        ];
        this.$refs.dialogLine.openDialog();
        return;
      }
      this.$api.pubInfo
        .Lookcx({
          curProcessInstId: this.form.workflowId,
          subProcessInstId: this.num1Str,
          numYear: this.numYears
        })
        .then(res => {
          this.flowChartList = res.data;
          this.$refs.dialogLine.openDialog();
        });
    },
    backDarft() {
      this.$router.push("/sealManage/useSeal/draft");
    },
    /**
     * 引入用印公文
     */
    importDoc() {
      this.importDialog = true;
      this.loadData();
    },
    reset() {
      this.$refs.importSearchForm.resetFields();
      this.formData.draftDepartmentName = "";
      this.formData.draftTimeStart = this.formData.draftTimeEnd = "";
      this.formData.sendTimeStart = this.formData.sendTimeEnd = "";
      this.$nextTick(() => {
        this.loadData();
      });
    },
    /**
     * 引入公文中的开始搜索
     */
    submit() {
      if (this.formData.draftRangeTime.length > 0) {
        this.formData.draftTimeStart = this.formData.draftRangeTime[0];
        this.formData.draftTimeEnd = this.formData.draftRangeTime[1];
      }
      if (this.formData.sendRangeTime.length > 0) {
        this.formData.sendTimeStart = this.formData.sendRangeTime[0];
        this.formData.sendTimeEnd = this.formData.sendRangeTime[1];
      }
      this.loadData();
    },
    // 选择主办部门
    selMainDep() {
      this.showOrgTreeOne = true;
    },
    mainDeptShowCompDialog(data, status, type, params) {
      let id = "";
      let departmentName = "";
      if (status) {
        if (data.length) {
          id = data[0].id;
          departmentName = data[0].name;
        } else {
          id = "";
          departmentName = "";
        }
        this.formData.draftDepartmentName = departmentName;
        this.formData.draftDepartmentId = id;
        this.$forceUpdate();
      }
      this.mainDeptDialogState = !this.mainDeptDialogState;
    },
    /**
     * 加载表格数据
     */
    loadData() {
      let params = {
        function: "searchSendOrder",
        page: this.pagination.pageNum,
        totalCount: 0,
        state: 1,
        limit: 10
      };
      Object.assign(params, this.formData);
      // console.log(params, '引用公文查询条件')
      this.$post
        .postData("searchSendOrder", JSON.stringify(params), "A0846C001")
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.pagination.total = res.data && res.data.total;
            this.docTableData = res.data && res.data.rows;
          }
        });
    },
    /**
     * 表格的全选全不选
     */
    handleSelectionChange(val) {
      console.log(val, "----------选中的----------");
      this.multipleSelection = val;
    },
    /**
     * 取消引用公文弹框
     */
    cancelImportDialog() {
      this.$refs.importSearchForm.resetFields();
      this.$refs.documentTab.$refs.cesTable.selection.length = 0; // 清空表格里面选中的数据
      this.importDialog = false;
    },
    /**
     * 引入公文弹框确认
     */
    sureImpor() {
      let flag = false;
      let selection = this.$refs.documentTab.$refs.cesTable.selection;
      // 点击确认按钮时 判断选中的发文id 是否和用印公文表格中的数据id 是否一样 如果一样则不可以再次引入；
      this.tableData.map((obj, index) => {
        selection.map((sub, subIndex) => {
          if (obj.id === sub.id) {
            this.$message({
              type: "warning",
              message: "数据不能重复引入!"
            });
            flag = true;
          }
        });
      });
      if (flag) return;
      selection.map(item => {
        this.$set(item, "sealDetail", "");
        this.$set(item, "useSealCount", 0);
      });
      this.tableData.push(...selection);
      // 临时注释
      // if (this.tableData.length === 0) {
      //   this.tableData = selection;
      // } else {
      //   console.log(...selection, '...selection')
      //   this.tableData.push(...selection)
      // }
      console.log(selection, "最终需要的选中的数据");
      this.importDialog = false;
      this.$refs.importSearchForm.resetFields();
    },
    /**
     * 删除用印公文
     */
    delImportDoc() {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length < 1) {
        this.$message({
          type: "warning",
          message: "请至少选择一条要删除的文档"
        });
      } else {
        this.$confirm("确定删除所选数据?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.multipleSelection.map(item => {
              this.tableData.map((tableDataItem, tableDataIndex) => {
                console.log(tableDataItem.id, item.id);
                if (tableDataItem.id === item.id) {
                  this.tableData.splice(tableDataIndex, 1);
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                }
              });
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    /**
     * 用印选择
     */
    selUseSeal(ID) {
      this.yzlist();
      // this.ordIdten();
      console.log("ID", ID);
      this.selUseSealID = ID;
      this.selUseSealTableData.map(item => {
        this.$set(item, "sealNum", 0);
      });
      if (ID !== "all") {
        let modifySealObj = this.tableData.find(item => {
          return item.id === ID;
        });
        let modifySeal = modifySealObj.sealDetail;
        if (modifySeal && modifySeal !== "") {
          let modifySealArr = modifySeal.split(",");
          modifySealArr.map(item => {
            let sealDetailArr = item.split(" ");
            let sealDet = this.selUseSealTableData.find(tableItem => {
              return tableItem.sealName === sealDetailArr[0];
            });
            this.$set(sealDet, "sealNum", parseInt(sealDetailArr[1]));
          });
        }
      }
      this.selUseSealDialog = true;
    },
    // 用印选择弹窗加载表格数据
    selUseSealLoadData() {},
    // 用印选择弹窗------确定
    sureSelUseSeal() {
      // 已选择的用印
      let useSealArr = [];
      this.selUseSealTableData.map(item => {
        if (parseInt(item.sealNum) > 0) {
          useSealArr.push(item);
        }
      });
      // 印章名称及每份个数
      let sealDetailArr = [];
      useSealArr.map(item => {
        sealDetailArr.push(`${item.sealName} ${item.sealNum}`);
        this.fldYyfsObj[item.sealName] = item.sealPosition;
      });
      let sealDetail = sealDetailArr.join(",");
      // 判断是否为批量操作
      if (this.selUseSealID === "all") {
        this.tableData.map(item => {
          this.$set(item, "sealDetail", sealDetail);
          this.$set(item, "useSealArr", JSON.parse(JSON.stringify(useSealArr)));
        });
      } else {
        let tableDataitem = this.tableData.find(item => {
          return item.id === this.selUseSealID;
        });
        this.$set(tableDataitem, "sealDetail", sealDetail);
        this.$set(
          tableDataitem,
          "useSealArr",
          JSON.parse(JSON.stringify(useSealArr))
        );
      }
      this.selUseSealDialog = false;
    },
    /**
     * 用印份数批量操作
     */
    // 批量操作
    batchSealCount() {
      this.sealCountDialog = true;
    },
    sureSelSealCount() {
      console.log(this.batchCount);
      this.tableData.map(item => {
        item.useSealCount = this.batchCount;
      });
      this.sealCountDialog = false;
    },
    //十位机构号获取
    // ordIdten() {
    //   let tenId = JSON.parse(localStorage.getItem("userInfo"));
    //   console.log(tenId, "10101010101001010");
    //   this.$api.sealManage
    //     .OrgtenId({
    //       unitCode: tenId.unitId
    //     })
    //     .then(res => {
    //       console.log(res.data.unitSyncCode, "#####");
    //       if (res.code == "SUCCESS") {
    //         this.unitSyncCode = res.data.unitSyncCode;
    //         this.yzlist();
    //       }
    //     });
    // },
    //用印选择弹出框
    yzlist() {
      // let jsonData = {
      //   Mnplt_TpCd: "03",

      //   Stmp_Blng_InsID: this.unitSyncCode,
      //   _pagination: {
      //     PAGE_JUMP: this.pagination.pageNum,
      //     REC_IN_PAGE: this.pagination.pageSize
      //   }
      // };
      let list = "";
      if (this.currentNodeIdMarkType === "1") {
        list = "2";
      }
      this.$api.sealManage
        .getsealList({
          useJgId: this.form.draftOrganId,
          YzGet: list,
          yzType: this.yzscUnit
        })
        .then(res => {
          let Newarr = res.list;
          let Newarr1 = [];
          Newarr.map((item, index) => {
            let obj = {
              sealID: item.id, //印章编码（唯一标识）
              sealRFID: item.rpidFlag, //RFID
              sealType: item.yzType, //印章类别
              sealDeviceName: item.deviceNameBak, //印章设备名称
              sealPots: item.storeMark, //印章在用印机中的位置
              sealOrg: item.userJg,
              sealName: item.yzJiancheng,
              sealPosition: item.isLocate == "1" ? "用印机" : "保险柜", //存放位置isLocate
              machineId: item.deviceNoBak,
              sealNum: 0
            };
            Newarr1.push(obj);
          });
          this.selUseSealTableData = Newarr1;
          console.log(
            "印章列表数据：",
            res,
            this.selUseSealTableData,
            "取出自己想要的数据添加到新数组操作"
          );
        })
        .catch(err => {
          console.log("报错：", err);
        });
    },
    // 用印公文合计
    getSealSum(row) {
      if (row.sealDetail && row.useSealCount) {
        let countArr = row.sealDetail.split(",");
        let count = 0;
        countArr.map(item => {
          count = count + parseInt(item.split(" ")[1]);
        });
        let sum = parseInt(row.useSealCount) * count;
        row.sum = sum;
        this.tableData[0].sumary = this.sumary;
        return sum;
      } else {
        return 0;
      }
    },
    /**
     * 发送上级行弹框取消事件
     */
    cancelHeigherOrgDialog() {
      this.heigherOrgForm.unitName = "";
      this.heigherOrgDialog = false;
    },
    /**
     * 发送上级行弹窗
     */
    getOrgList(org) {
      console.log(org, "发送上级行弹窗");
      if (org) {
        console.log("org", org);
        this.heigherOrgForm.unitName = org.unitName;
        this.heigherOrgForm.unitId = org.id;
      } else {
        this.heigherOrgForm.unitName = "";
        this.heigherOrgForm.unitId = "";
      }
    },
    //部门
    getOrgListOne(org) {
      this.selectDeptOne = org;
      let names = [];
      let nameId = [];
      org.forEach(item => {
        names.push(item.unitName);
        nameId.push(item.id);
      });
      this.formData.draftDepartmentName = names.join(",");
    },
    /**
     * 发送上级行确认
     */
    sureSendHeigherOrg() {
      // 临时注释
      // let selection = this.$refs.heigherOrgTab.$refs.cesTable.selection
      // if (this.heigherOrgForm.unitName && selection.length === 1) {
      //   this.$message({
      //     type: 'info',
      //     message: '上级行部门、行外单位只可选择一项'
      //   })
      //   return
      // }
      // if (this.heigherOrgForm.unitName === '' && selection.length === 0) {
      //   this.$message({
      //     type: 'info',
      //     message: '请选择上级行部门或行外单位'
      //   })
      //   return
      // }
      console.log(this.heigherOrgForm, "我的");
      if (this.heigherOrgForm.unitName === "") {
        this.$message({
          type: "warning",
          message: "请选择上级行部门！"
        });
        return;
      }
      let param = {
        markOrderType: "1",
        id: this.sendId || this.$route.query.id,
        unitId: this.heigherOrgForm.unitId, // || selection[0].id,
        nextAvyName: this.heigherOrgForm.AVYNODENM,
        nextAvyId: this.heigherOrgForm.PCSAVYID
      };
      this.$api.sealManage
        .sureHander(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "成功发送上级行"
          });
          // this.MessageReminder();
          this.heigherOrgDialog = false;
          this.$intent.closeWindow(this);
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**------------------------------------------------------ 公共方法 ---------------------------------------------------- */
    /**
     * 获取部门一些信息【公共】
     */
    getOrgInfo() {
      console.log(
        "起草文件",
        JSON.parse(localStorage.getItem("userInfo")).unitId
      );
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
}
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.document {
  min-height: 100vh;
  background: #fff;
  .ewm {
    width: 150px;
    margin: 0 auto;
  }
  .dialogImport > .el-dialog {
    width: 20% !important;
  }
  .designForm {
    border: 1px solid #ccc;
    width: 92%;
    padding: 2% 2%;
    margin: auto;
    .el-row {
      margin-bottom: 10px;
    }
  }
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
  .bigDialog > .el-dialog {
    width: 80% !important;
  }
  .useSealWaytip .el-form-item__label {
    color: #f56c6c !important;
  }
  //----------------------------  收藏表单的样式 start------------------------------
  .tablePrint {
    width: 900px;
    margin: 0 auto;
    background-color: white;
    z-index: -999;
    position: fixed;
    .printTableList {
      width: 94%;
      margin: 0 auto;
      tr {
        height: 40px;
        td {
          width: 12%;
          border: 1px solid #000;
        }
      }
    }
    .docTable {
      .el-table--border,
      .el-table--group {
        border: none;
      }
      .el-table {
        // color: #000;
        td {
          // border-bottom: none;
        }
      }
      .el-table--border td {
        border-right: none;
      }
      .el-table--border th {
        border-right: 1px solid #000 !important;
      }
      .el-table th.is-leaf {
        border-bottom: 0.5px solid #000 !important;
      }
    }
    .el-table--border,
    .el-table--group {
      border: none;
    }
    .el-table {
      color: #000;
      td {
        border-bottom: none;
      }
    }
    .el-table--border td {
      border-right: none;
      border-left: none;
    }
    .el-table--border th {
      border-right: 1px solid #000 !important;
    }
    .el-table th.is-leaf {
      // border-bottom: 1px solid #000 !important;
    }
    .el-table thead,
    .el-table__empty-text {
      color: #000;
    }
    .opinion-container {
      overflow: hidden;
    }
    .opinion-container .content {
      float: left;
      margin-left: 8px;
      margin-top: 10px;
      width: 100%;
    }
    .opinion-container .link {
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
    .title-h1 {
      font-family: 宋体;
      font-size: 35px;
      text-align: center;
      line-height: 100px;
    }
    td {
      // border: 1px solid #000;
    }
    .tcont {
      padding-bottom: 5px;
      border-bottom: 1px solid #dac6c5;
    }
    .tcont:last-child {
      border-bottom: none;
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
      // border: solid 1px #000;
      border-left: none;
      border-right: none;
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
  }
  //----------------------------  收藏表单的样式 end------------------------------

  .delBox {
    margin-top: 7px;
    width: 100%;
    background: rgba(224, 224, 224, 0.34);
    height: 32px;
    .buttonItem {
      float: right;
    }
  }
}
</style>