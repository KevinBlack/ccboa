/**
* create by zx on 2020/8/4 10:32
* 类注释：
* 备注：
*/
<template>
  <div class="addOrEditProcess">
    <div class="box-card">
      <el-row v-if="isAdd == '0'">
        <!-- 新增保存 -->
        <el-button type="primary" @click="$router.back()">返回</el-button>
        <el-button type="primary" @click="saveProcessInfo()">保存</el-button>
      </el-row>
      <el-row v-else>
        <el-button type="primary" @click="$router.back()">返回</el-button>
        <el-button type="primary" @click="editInfo()" v-if="!edit"
          >编辑</el-button
        >
        <!-- 编辑保存 -->
        <el-button type="primary" v-if="edit" @click="editSave()"
          >保存</el-button
        >
        <el-button
          type="primary"
          v-if="edit && $route.query.isMainPross === '1'"
          @click="changeTOTemp"
          >转换成模板</el-button
        >
        <el-button
          type="primary"
          v-if="edit && $route.query.isMainPross === '1'"
          @click="updateProcess"
          >从模板更新流程</el-button
        >
      </el-row>
      <div class="linkFormHeader">
        <div class="title-text">流程定义</div>
      </div>
    </div>

    <el-card class="box-card">
      <div slot="header" class="clearfix" style="font-size: 18px">
        <span>流程基本信息</span>
      </div>
      <div class="text item">
        <el-form
          ref="inputForm"
          :model="formData"
          label-width="130px"
          :rules="formRules"
        >
          <el-row>
            <el-col :span="24" prop="groupId" v-if="edit || isAdd == '0'">
              <el-form-item label="流程适用机构" prop="groupId">
                <select-org-or-dept @select="selectOrg">
                  <el-input
                    type="text"
                    readonly
                    placeholder="请选择机构"
                    v-model="formData.orgName"
                    suffix-icon="el-icon-arrow-down"
                  />
                </select-org-or-dept>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-else>
              <el-form-item label="流程适用机构">
                <select-org-or-dept @select="selectOrg" :disabled="true">
                  <el-input
                    type="text"
                    readonly
                    placeholder="请选择机构"
                    v-model="formData.orgName"
                    suffix-icon="el-icon-arrow-down"
                    disabled
                  />
                </select-org-or-dept>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="业务分类" prop="tplBsnId">
                <el-select
                  v-model="formData.tplBsnId"
                  placeholder="请选择"
                  style="width: 100%"
                  :disabled="$route.query.type === '1'"
                  @change="classifyChange()"
                >
                  <el-option
                    v-for="(item, index) in typeList"
                    :key="index"
                    :label="item.appCat"
                    :value="item.appCatShortName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务名称" prop="multiTenancyId">
                <el-select
                  v-model="formData.multiTenancyId"
                  placeholder="请先选择业务分类"
                  style="width: 100%"
                  :disabled="$route.query.type === '1'"
                  @input="$forceUpdate()"
                >
                  <el-option
                    v-for="(item, index) in nameList"
                    :key="index"
                    :label="item.hAppName"
                    :value="item.hAppId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item
                label="流程名称"
                v-if="edit || isAdd == '0'"
                prop="pTplNm"
              >
                <el-input
                  type="textarea"
                  v-model="formData.pTplNm"
                  maxlength="200"
                  show-word-limit
                  resize="none"
                ></el-input>
              </el-form-item>
              <el-form-item label="流程名称" v-else>
                <el-input
                  type="textarea"
                  v-model="formData.pTplNm"
                  disabled="disabled"
                  maxlength="200"
                  show-word-limit
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="流程级别" prop="wfFcnId">
                <el-radio-group
                  v-model="formData.wfFcnId"
                  :disabled="$route.query.type === '1'"
                >
                  <el-radio label="01">主流程</el-radio>
                  <el-radio label="02">子流程</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item
                label="是否锁定主流程"
                prop="wfFcnId"
                v-if="$route.query.isMainPross === '0'"
              >
                <el-radio-group
                  v-model="formData.isLock"
                  :disabled="!edit && !isAdd == '0'"
                >
                  <el-radio label="01">是</el-radio>
                  <el-radio label="02">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="所有环节" prop="allNodeNm">
                <el-input
                  type="textarea"
                  v-model="formData.allNodeNm"
                  :disabled="$route.query.type === '1'"
                  maxlength="200"
                  show-word-limit
                  resize="none"
                >
                  <!-- <template slot="append">(以逗号,分隔)</template> -->
                </el-input>
                <p
                  :style="{
                    color: '#F56C6C',
                    fontSize: '12px',
                    lineHeight: '20px',
                    marginTop: '2px',
                  }"
                >
                  * 用","分隔
                </p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>

    <el-card
      class="box-card"
      style="margin-top: 20px; font-size: 18px"
      v-if="isAdd == '1'"
    >
      <div slot="header" class="clearfix">
        <span>环节设置</span>
      </div>
      <!-- v-if="edit" -->
      <el-button type="primary" @click="toAdd" :style="{ marginBottom: '5px' }"
        >新增</el-button
      >
      <el-button
        type="primary"
        @click="handleEdit"
        :style="{ marginBottom: '5px' }"
        >查看详情</el-button
      >
      <el-button
        type="primary"
        @click="reorder"
        :style="{ marginBottom: '5px' }"
        >调整环节顺序</el-button
      >
      <el-button type="danger" @click="delLink" :style="{ marginBottom: '5px' }"
        >删除</el-button
      >
      <m-table
        @select="select"
        size="medium"
        :isSelection="true"
        :isIndex="true"
        :isBorder="true"
        :isPagination="false"
        :isHandle="true"
        :tableCols="tableCols"
        :tableData="tableData"
      ></m-table>
    </el-card>
    <!-- 调整环节顺序弹框 -->
    <el-dialog title="调整环节顺序" :visible.sync="reOrderDialogVisable">
      <el-button type="primary" @click="rowTop()">置顶</el-button>
      <el-button type="primary" @click="rowUp()">上移</el-button>
      <el-button type="primary" @click="rowDown()">下移</el-button>
      <el-button type="primary" @click="rowBottom()">置底</el-button>
      <m-table
        ref="reOrderTable"
        size="medium"
        :isSelection="true"
        :isIndex="true"
        :isBorder="true"
        :isPagination="false"
        :isHandle="true"
        :tableCols="tableCols"
        :tableData="reorderTableData"
      ></m-table>
      <div slot="footer">
        <el-button @click="reOrderDialogVisable = false">取消</el-button>
        <el-button type="primary" @click="reOrderSure()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 转换成模板弹框
    <el-dialog title="转换成模板" :visible.sync="exchangeTempVisable">
      <el-form v-model="exchangeTempForm" label-position="right" label-width="100px">
        <el-form-item label="机构级别">
          <el-select v-model="exchangeTempForm.txnIttChnlCgyCode" :style="{width:'100%'}">
            <el-option v-for="item in orgOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称">
          <el-input :model="exchangeTempForm.inp"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="exchangeTempVisable=false">取消</el-button>
        <el-button type="primary" @click="sureExchangeTemp">确定</el-button>
      </div>
    </el-dialog>-->
    <!-- 从模板更新流程弹框 -->
    <el-dialog title="选择流程模板" :visible.sync="flowTempVisable">
      <el-form
        v-model="flowTempForm"
        :rules="flowTempFormRules"
        label-position="right"
        label-width="110px"
      >
        <el-form-item label="模板机构级别" prop="tempOrg">
          <select-org-or-dept @select="tempOrgChange">
            <el-input
              type="text"
              readonly
              placeholder="请选择模板机构级别"
              v-model="flowTempForm.tempOrg"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-form-item>
        <el-form-item label="模板业务分类" prop="pTplNo">
          <el-select
            v-model="flowTempForm.pTplNo"
            :style="{ width: '100%' }"
            @change="tempClassifyChange"
          >
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.appCat"
              :value="item.appCatShortName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称" prop="pcTplNo">
          <el-select v-model="flowTempForm.pcTplNo" :style="{ width: '100%' }">
            <el-option
              v-for="item in tempName"
              :key="item.pTplNo"
              :label="item.pTplNm"
              :value="item.pTplNo"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="流程适用机构"
          class="flexSetting"
          prop="txnIttChnlCgyCode"
        >
          <el-input v-model="flowTempForm.txnIttChnlCgyCode"></el-input>
          <el-button
            type="primary"
            :style="{ marginLeft: '10px' }"
            @click="selOrg"
            >选择</el-button
          >
          <el-button @click="delOrg">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="flowTempVisable = false">取消</el-button>
        <el-button type="primary" @click="sureFlowTemp">确定</el-button>
      </div>
    </el-dialog>
    <org-tree
      v-model="showOrgTree"
      title="选择"
      :isSingle="true"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import orgTree from "components/tree/orgTree";
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  name: "addOrEditProcess",
  components: {
    mTable,
    orgTree,
    selectOrgOrDept
  },
  props: {},
  data () {
    return {
      groupId:'',
      isAdd: this.$route.query.type,
      edit: false,
      designSetId: "",
      formData: {
        groupId: '',
        orgName: ''
      },
      //表单校验
      formRules: {
        groupId: [
          { required: true, message: '请选择流程适用机构', trigger: 'input' }
        ],
        tplBsnId: [
          { required: true, message: '请选择业务分类', trigger: 'input' }
        ],
        multiTenancyId: [
          { required: true, message: '请选择业务名称', trigger: 'input' }
        ],
        pTplNm: [
          { required: true, message: '请输入流程名称', trigger: 'blur' }
        ],
        wfFcnId: [
          { required: true, message: '请选择流程级别', trigger: 'input' }
        ],
        allNodeNm: [
          { required: true, message: '请输入所有环节', trigger: 'blur' }
        ]
      },
      tableCols: [
        { "label": "环节名称", "prop": 'avyNodeNm', align: 'center' },
        { "label": '环节id', "prop": 'pcsAvyId', align: 'center' }
      ],
      tableData: [],
      //选中行数据
      selectedRow: [],
      //流程适用机构
      // orgOption: [],
      //业务分类
      typeList: [],
      //业务名称
      nameList: [],
      //返回的multiTenancyId值
      linkSetMulti: '',
      //调整环节顺序弹框
      reOrderDialogVisable: false,
      reorderTableData: [],
      //转换成模板弹框
      exchangeTempVisable: false,
      exchangeTempForm: {},
      exchangeOptions: [
        { label: '模板', value: '0' }
      ],
      /**
       * 从模板更新流程弹框
       */
      tempName: [],
      flowTempVisable: false,
      flowTempForm: {
        txnIttChnlCgyCode1: '',
        tempOrg: ''
      },
      flowTempFormRules: {
        tempOrg: { required: true, message: '请选择模板机构级别', trigger: 'input' },
        pTplNo: { required: true, message: '请选择模板业务分类', trigger: 'input' },
        pcTplNo: { required: true, message: '请选择模板名称', trigger: 'input' },
        txnIttChnlCgyCode: { required: true, message: '请选择流程适用机构', trigger: 'input' }
      },
      //选择机构弹出框
      showOrgTree: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
    }
  },
  computed: {},
  methods: {
    // 选择流程适用机构
    selectOrg (org) {
      this.formData.groupId = org.id
      this.formData.orgName = org.unitName
    },
    // 转换成模板
    changeTOTemp () {
      // this.exchangeTempVisable = true
      let params = {
        txnIttChnlCgyCode: this.formData.groupId,
        pcTplNo: this.$route.query.pTplNo,
        type: '0'
      }
      this.$api.setting.workFlow.updateTemplate({ ...params }).then(res => {
        this.$message({
          type: 'success',
          message: '已成功转换为模板！'
        })
      })
    },
    // sureExchangeTemp () { },
    // 从模板更新流程
    updateProcess () {
      this.flowTempVisable = true
    },
    //加载模板名称
    loadTempName () {
      let params = {
        tplVldStcd: '01',
        wfFcnId: '01',
        multiTenancyId: this.flowTempForm.pTplNo,
        groupId: this.flowTempForm.txnIttChnlCgyCode1
      }
      this.$api.setting.workFlow.getTipList(params).then(res => {
        this.tempName = res.data
      })
    },
    //模板机构级别select事件
    tempOrgChange (org) {
      this.flowTempForm.txnIttChnlCgyCode1 = org.id
      this.flowTempForm.tempOrg = org.unitName
      if (this.flowTempForm.pTplNo) {
        this.loadTempName()
      }
    },
    //模板业务分类change事件
    tempClassifyChange () {
      if (this.flowTempForm.txnIttChnlCgyCode1) {
        this.loadTempName()
      }
    },
    //选择机构弹出框
    selOrg () {
      this.showOrgTree = true
    },
    delOrg () {
      this.flowTempForm.txnIttChnlCgyCode = ''
      this.flowTempForm.id = ''
    },
    getOrgList (org) {
      this.$set(this.flowTempForm, 'txnIttChnlCgyCode', org.unitName)
      this.flowTempForm.id = org.id
    },
    sureFlowTemp () {
      if (this.flowTempForm.tempOrg === '' ||
        this.flowTempForm.pTplNo === '' ||
        this.flowTempForm.pcTplNo === '' ||
        this.flowTempForm.txnIttChnlCgyCode === '') {
        this.$message({
          type: 'warning',
          message: '请选择必选项'
        })
      } else {
        this.$confirm('是否确定更新流程？', '提示', {
          type: 'warning'
        }).then(() => {
          let params = {
            txnIttChnlCgyCode: this.flowTempForm.id,
            pcTplNo: this.flowTempForm.pcTplNo,
            oldTplNo: this.$route.query.pTplNo,
            type: '2',
            multiTenancyId: this.$route.query.multiTenancyId
          }
          this.$api.setting.workFlow.updateTemplate({ ...params }).then(res => {
            this.$message({
              type: 'success',
              message: '已成功从模板更新流程！'
            })
            this.flowTempVisable = false
          })
        })
      }
    },
    //编辑
    editInfo () {
      this.edit = true
      this.$api.setting.workFlow.getBusinessClassify({flag:"1"}).then(res => {
        this.typeList = JSON.parse(JSON.stringify(res.data))
      })
    },
    loadData () {
      let groupId = this.$route.query.groupId
      let tplId = this.$route.query.pTplNo
      let tplBsnId = this.$route.query.tplBsnId
      let multiTenancyId = this.$route.query.multiTenancyId
      this.$api.setting.workFlow.getFlowDefine({ tplId, multiTenancyId, groupId }).then(res => {
        this.$forceUpdate()
        this.linkSetMulti = res.data.multiTenancyId
        this.formData = JSON.parse(JSON.stringify(res.data))
        this.$set(this.formData, 'orgName', res.orgName)
        this.tableData = JSON.parse(JSON.stringify(res.data.templateAvyNodeDoList))
        this.$api.setting.workFlow.getBusinessInfo({ appId: tplBsnId, appCatShortName: multiTenancyId }).then(res => {
          res.data && (this.formData.tplBsnId = res.data.appCat)
          res.data && (this.formData.multiTenancyId = res.data.appName)
          this.designSetId = res.data.designSetId
        })
      })
    },
    //选择一项业务分类，加载对应业务名称
    classifyChange () {
      this.formData.multiTenancyId = ''
      this.$api.setting.workFlow.getBusinessInfo({ appCatShortName: this.formData.tplBsnId }).then(res => {
        this.nameList = JSON.parse(JSON.stringify(res.data.hAppList))
      })
    },
    //新增流程定义保存
    saveProcessInfo () {
      this.$refs.inputForm.validate(valid => {
        if (valid) {
          let paramsObj = {
            tplId: `${this.formData.multiTenancyId}_${this.formData.tplBsnId}`,
            groupId: this.formData.groupId,
            tplBsnId: this.formData.multiTenancyId,
            multiTenancyId: this.formData.tplBsnId,
            tplName: this.formData.pTplNm,
            nodeAttr: this.formData.allNodeNm,
            wfFcnId: this.formData.wfFcnId
          }
          this.$api.setting.workFlow.addFlowDefine(paramsObj).then(res => {
            if (res.code === 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '保存成功！'
              })
              this.$router.push({
                path: '/setting/processControl/mainProcessControl'
              })
            } else if (res.msg) {
              this.$message({
                type: 'info',
                message: `${res.msg}`
              })
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请输入必填项'
          })
        }
      })
    },
    //编辑保存流程定义
    editSave () {
      this.$api.setting.workFlow.editFlowDefine({
        tplId: this.$route.query.pTplNo,
        tplName: this.formData.pTplNm,
        wfFcnId: this.formData.wfFcnId,
        groupId: this.formData.groupId,
        isLock: this.formData.isLock,
        multiTenancyId: this.$route.query.multiTenancyId
      }).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    },

    /**
     * 环节设置
     */
    //新增
    toAdd () {
      console.log('gggggggg', this.formData);
      this.$intent.go(this, {
        path: '/setting/processControl/linkSetting',
        query: {
          type: 'add',
          designSetId: this.designSetId,
          tplId: this.formData.pTplNo,
          multiTenancyId: this.linkSetMulti,
          groupId: this.formData.groupId,
          isChild: this.$route.query.isChild
        }
      })
    },
    select (row) {
      this.selectedRow = row
    },
    //查看
    handleEdit () {
      if (this.selectedRow.length === 1) {
        console.log('this.selectedRow', this.selectedRow);
        let row = JSON.parse(JSON.stringify(this.selectedRow))[0]
        console.log('this.row222', row);
        this.$intent.go(this,
          {
            path: '/setting/processControl/linkSetting',
            query: {
              designSetId: this.designSetId,
              tplId: row.pTplNo,
              tplNo: row.pTplNo,
              pcsAvyId: row.pcsAvyId,
              multiTenancyId: row.multiTenancyId,
              groupId: this.formData.groupId,
              isChild: this.$route.query.isChild,
              tplVldStcd:this.formData.tplVldStcd
            }
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条数据进行查看详情'
        })
      }
    },
    //环节删除 
    delLink () {
      if (this.selectedRow.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择至少一条数据'
        })
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        let avyIdList = []
        this.selectedRow.map(item => {
          avyIdList.push(item.pcsAvyId)
        })
        this.$api.setting.workFlow.delLinkList({
          pTplNo: this.selectedRow[0].pTplNo,
          avyIdList: avyIdList,
          multiTenancyId: this.selectedRow[0].multiTenancyId,
          groupId:this.$route.query.groupId
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.loadData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    },
    /** 
     * 调整顺序
     */
    reorder () {
      console.log(this.tableData);
      this.reorderTableData = JSON.parse(JSON.stringify(this.tableData))
      this.reOrderDialogVisable = true
    },
    //置顶
    rowTop () {
      const selections = this.$refs.reOrderTable.$refs.cesTable.selection
      if (selections.length === 1) {
        const index = selections[0].index
        if (index !== 0) {
          this.reorderTableData.unshift(this.reorderTableData.splice(index, 1)[0])
        } else {
          this.$message({
            message: '该条数据已是第一条！',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    //上移
    rowUp () {
      const selections = this.$refs.reOrderTable.$refs.cesTable.selection
      if (selections.length === 1) {
        const index = selections[0].index
        if (index !== 0) {
          this.reorderTableData[index] = this.reorderTableData.splice(index - 1, 1, this.reorderTableData[index])[0]
        } else {
          this.reorderTableData.push(this.reorderTableData.shift())
        }
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    //下移
    rowDown () {
      const selections = this.$refs.reOrderTable.$refs.cesTable.selection
      if (selections.length === 1) {
        const index = selections[0].index
        if (index === this.reorderTableData.length - 1) {
          this.reorderTableData.unshift(this.reorderTableData.pop())
        } else {
          this.reorderTableData[index] = this.reorderTableData.splice(index + 1, 1, this.reorderTableData[index])[0]
        }
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    //置底
    rowBottom () {
      const selections = this.$refs.reOrderTable.$refs.cesTable.selection
      if (selections.length === 1) {
        const index = selections[0].index
        if (index === this.reorderTableData.length - 1) {
          this.$message({
            message: '该数据已是最后一条！',
            type: 'warning'
          })
        } else {
          this.reorderTableData.push(this.reorderTableData.splice(index, 1)[0])
        }
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    //弹框确定
    reOrderSure () {
      console.log('asdfghjkl', this.reorderTableData);
      let paramList = JSON.parse(JSON.stringify(this.reorderTableData))
      paramList.map(item => {
        item.avyNodeSort = item.sort
      })
      this.$api.setting.workFlow.reorderLink({ paramList,groupId:this.$route.query.groupId }).then(res => {
        this.$message({
          type: 'success',
          message: '环节顺序调整成功'
        })
        this.loadData()
        this.reOrderDialogVisable = false
      })
    }
  },
  mounted () {
    let st = localStorage.getItem('st')
    // this.$api.setting.workFlow.getOrganization({ st }).then(res => {
    //   this.orgOption = res.data
    // })
    //查看
    if (this.$route.query.isMainPross) {
      this.loadData()
    } else {
      //新增
      this.editInfo()
    }
  },
  activated () {
  },
  created () {

  }
}
</script>

<style lang="less" rel="stylesheet/less">
.addOrEditProcess {
  .linkFormHeader {
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }

  .box-card {
    margin: 0 10%;
  }
  .flexSetting .el-form-item__content {
    display: flex;
  }
}
</style>
