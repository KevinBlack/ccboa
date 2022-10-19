<template>
  <div class="dispatchparameterspage">
    <el-row>
      <el-form
        label-width="120px"
      >
        <el-col :span="8">
          <el-form-item label="机构名称">
            <div class="dispatchcswhlshwh">
              <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择"
                  v-model="unitName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="padding-left: 20px;">
          <el-button type="primary" size="small" @click="handleLoadData()">查询</el-button>
        </el-col>
        <el-col :span="6" style="text-align: right;margin-bottom: 10px;">
          <el-button type="primary" size="small" v-if="haveData" @click="handleAddData">新增参数配置方案</el-button>
          <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>
      </el-form>
    </el-row>
    <!-- <el-table
      :data="tableData"
      @selection-change="handleSelect"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        type="index"
        width="50"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column prop="organizationName" label="机构名称" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="smart"
            @click="handleShowTitle(scope.$index, scope.row)"
          >{{ scope.row.organizationName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="sendType" label="发文类型" align="center"></el-table-column>
      <el-table-column prop="emergencyLevel" label="紧急程度" align="center"></el-table-column>
      <el-table-column prop="directSendRange" label="直发范围" align="center"></el-table-column>
      <el-table-column prop="signOpinionLimit" label="会签字数限制" align="center"></el-table-column>
      <el-table-column prop="id" label="排序" align="center"></el-table-column>
    </el-table> -->
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="false"
      :isHandle="false"
      @handleSelectionChange="handleSelectionChange"
      :tableData="tableData"
      :tableCols="tableCols"
      @cellClick="cellClick"
      :isPagination="false"
      v-loading="tableLoading"
    ></m-table>

    <el-dialog :visible.sync="dialogVisible" v-dialogDrag :modal-append-to-body="false" :before-close="handleCancel" title="发文参数配置">
     <div style="height:600px">
      <el-scrollbar style="height:100%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo_ruleForm"
      >
        <el-col>
          <el-form-item label="机构名称" prop="organizationName">
            <el-input v-model="ruleForm.organizationName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="发文类型" prop="sendType">
            <el-input v-model="ruleForm.sendType"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="紧急程度" prop="emergencyLevel">
            <el-input v-model="ruleForm.emergencyLevel"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="业务分类" prop="businessType">
            <el-input type="textarea" resize="none" autosize v-model="ruleForm.businessType"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="文种" prop="textType">
            <el-input v-model="ruleForm.textType"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="电子发文秘密类型" prop="eleSendSecretType">
            <el-input v-model="ruleForm.eleSendSecretType"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="电子发文保密期限" prop="secretFlagContent">
            <el-input v-model="ruleForm.secretFlagContent"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col>
          <el-form-item label="电子发文秘密期限类型" prop="eleSecretTimeType">
            <el-input v-model="ruleForm.eleSecretTimeType"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col>
          <el-form-item label="实物发文秘密类型" prop="swSendSecretType">
            <el-input v-model="ruleForm.swSendSecretType"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="实物发文保密期限" prop="swSecretFlagContent">
            <el-input v-model="ruleForm.swSecretFlagContent"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col>
          <el-form-item label="实物发文秘密期限类型" prop="swSecretTimeType">
            <el-input v-model="ruleForm.swSecretTimeType"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col>
          <el-form-item label="国家秘密" prop="countriesSecret">
            <el-input v-model="ruleForm.countriesSecret"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="商业密级" prop="tradeSecret">
            <el-input v-model="ruleForm.tradeSecret"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col>
          <el-form-item label="秘密标志" prop="secretFlag">
            <el-input v-model="ruleForm.secretFlag"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col>
          <el-form-item label="工作秘密标志" prop="workSecretFlag">
            <el-input v-model="ruleForm.workSecretFlag"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有主题词" prop="haveKeyword">
            <el-radio v-model="ruleForm.haveKeyword" label="0" class="alternative">是</el-radio>
            <el-radio v-model="ruleForm.haveKeyword" label="1" class="alternative">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="启用二维码" prop="twoDimensionalCode">
            <el-radio v-model="ruleForm.twoDimensionalCode" label="0" class="alternative">是</el-radio>
            <el-radio v-model="ruleForm.twoDimensionalCode" label="1" class="alternative">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="直发范围" prop="directSendRange">
            <el-input v-model="ruleForm.directSendRange"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="直发文件种类" prop="directSendType">
            <el-input v-model="ruleForm.directSendType"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="档案利用范围" prop="archivesUserRange">
            <el-input v-model="ruleForm.archivesUserRange"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="电子发文保管期限" prop="eleSendSecretLimit">
            <el-input v-model="ruleForm.eleSendSecretLimit"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="实物发文保管期限" prop="swSendSecretLimit">
            <el-input v-model="ruleForm.swSendSecretLimit"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="会签意见字数限制" prop="signOpinionLimit">
            <el-input v-model="ruleForm.signOpinionLimit" oninput="value=value.replace(/[^\d\*\ ]/g,'')"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="字数超限原因最少字数限制" prop="reasionLimit">
            <el-input v-model="ruleForm.reasonLimit" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="字数超限原因不能包含关键字" prop="reasionLimitWord">
            <el-input v-model="ruleForm.reasonLimitWord"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="无需限制正文字数的标题关键字" prop="noLimitTitleWord">
            <el-input v-model="ruleForm.noLimitTitleWord"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="无需限制正文字数的代字/红头" prop="noLimitRedHead">
            <el-input v-model="ruleForm.noLimitRedHead"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col>
          <el-form-item label="默认正文模板"></el-form-item>
        </el-col> -->
      </el-form>
      </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import scrollIntoForm from '@/util/scrollValid'
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFJWH from "@/minixs/dispatchFJWH";

const tableCols = [
  { label: "发文类型", prop: "sendType", align: "center" },
  { label: "紧急程度", prop: "emergencyLevel", align: "center" },
  { label: "直发范围", prop: "directSendRange", align: "center" },
  { label: "会签字数限制", prop: "signOpinionLimit", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
]

export default {
  name: 'Fwcspz',
  components: {
    mTable,
    searchForm,
    selectOrgOrDept
  },
  mixins: [dispatchFJWH],
  data () {
    return {
      isGly:false,
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份

      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      dspcPrmShow: false,
      deleteIds: '',
      tableData: [],
      ruleForm: {
        function: 'addSendOrderDic',
        archivesUserRange: '',
        unitName: '',
        unitId: '',
        organizationName: '',
        organizationId: '',
        sendType: '',
        emergencyLevel: '',
        businessType: '',
        textType: '',
        scDzfwmmlx: '',
        eleSendSecretLimit: '',
        swSendSecretType: '',
        swSendSecretLimit: '',
        swSendSecretType: '',
        swSecretTimeType: '',
        countriesSecret: '',
        eleSecretTimeType: '',
        tradeSecret: '',
        secretFlagContent: '',
        swSecretFlagContent: '',
        secretFlag: '',
        workSecretFlag: '',
        haveKeyword: '',
        twoDimensionalCode: '',
        directSendRange: '',
        directSendType: '',
        signOpinionLimit: '',
        reasonLimit: '',
        reasonLimitWord: '',
        noLimitTitleWord: '',
        noLimitRedHead: '',
        id: ''
      },
      // 强制性要求
      rules: {
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        sendType: [
          { required: true, message: '请输入发文类型', trigger: 'blur' }
        ],
        eleSendSecretType: [
          { required: true, message: '请输入电子发文秘密类型', trigger: 'blur' }
        ],
        eleSendSecretLimit: [
          { required: true, message: '请输入电子发文保管期限', trigger: 'blur' }
        ],
        swSendSecretType: [
          { required: true, message: '请输入实物发文秘密类型', trigger: 'blur' }
        ],
        swSendSecretLimit: [
          { required: true, message: '请输入实物发文保管期限', trigger: 'blur' }
        ],
        tradeSecret: [
          { required: true, message: '请输入商业密级', trigger: 'blur' }
        ],
        secretFlagContent: [
          { required: true, message: '请输入电子发文保密期限', trigger: 'blur' }
        ],
        swSecretFlagContent: [
          { required: true, message: '请输入实物发文保密期限', trigger: 'blur' }
        ],
        // secretFlag: [
        //   { required: true, message: '请输入秘密标志', trigger: 'blur' }
        // ],
        workSecretFlag: [
          { required: true, message: '请输入工作秘密标志', trigger: 'blur' }
        ],
        directSendRange: [
          { required: true, message: '请输入直发范围', trigger: 'blur' }
        ],
        directSendType: [
          { required: true, message: '请输入直发文件种类', trigger: 'blur' }
        ],
        archivesUserRange: [
          { required: true, message: '请输入档案利用范围', trigger: 'blur' }
        ]
      },
      haveData: true
    }
  },
  methods: {
    handleLoadData () {
      this.tableData = []
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId
      this.ruleForm.function = 'getTcSendOrderDicPoByOrId'
      console.log("****", this.ruleForm);
      
      this.$post.postData('getTcSendOrderDicPoByOrId', JSON.stringify(this.ruleForm), this.$businessCode.fawgl).then(res => {
          if (res.success) {
            if (res.data) {
              this.haveData = false
              this.tableData = res.data
            } else {
              this.haveData = true
            }
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
            return;
          }
        })
      // this.$post.postData('getOrgInfo', JSON.stringify({function: 'getOrgInfo'}), this.$businessCode.fawgl).then((res) => {
      //   this.ruleForm.unitName = this.ruleForm.organizationName = res.data.unitName
      //   this.ruleForm.organizationId = res.data.unitId
      // })
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData()
    },
    cellClick(row, column, cell, event) {
      let that = this
      this.$post.postData('getTcSendOrderDicPoById', JSON.stringify({ function: 'getTcSendOrderDicPoById', id: row.id, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
        that.ruleForm = Object.assign({}, res.data, { function: 'addSendOrderDic' })
        that.ruleForm.unitName = that.ruleForm.organizationName = that.unitName;
        that.ruleForm.unitId = that.ruleForm.organizationId = that.unitId;
        that.ruleForm.haveKeyword = res.data.haveKeyword ? res.data.haveKeyword.toString() : that.ruleForm.haveKeyword
        that.ruleForm.twoDimensionalCode = res.data.twoDimensionalCode ? res.data.twoDimensionalCode.toString() : that.ruleForm.twoDimensionalCode
        that.dialogVisible = true
      })
    },
    handleShowTitle (index, row) {
      this.dialogVisible = true
      this.ruleForm = row
      this.ruleForm = Object.assign(this.ruleForm, {
        function: 'addSendOrderDic'
      })
    },
    handleSelectionChange (val) {
      const idsArr = []
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id)
      }
      this.deleteIds = idsArr.join(',')
    },
    handleBatchDelete () {
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择要删除的机构！"
        });
        return;
      } else {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post.postData('deleteSendOrderDic', JSON.stringify({ function: 'deleteSendOrderDic', id: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleLoadData()
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              offset: 100,
              showClose: true,
              message: "已取消删除",
              duation: 1000
            });
          });
      }      
    },
    handleAddData () {
      this.dialogVisible = true
      this.ruleForm = {
        function: 'addSendOrderDic',
        archivesUserRange: '',
        unitName: '',
        unitId: '',
        organizationName: '',
        organizationId: '',
        sendType: '',
        emergencyLevel: '',
        businessType: '',
        textType: '',
        scDzfwmmlx: '',
        eleSendSecretLimit: '',
        swSendSecretType: '',
        swSendSecretLimit: '',
        swSendSecretType: '',
        swSecretTimeType: '',
        countriesSecret: '',
        eleSecretTimeType: '',
        tradeSecret: '',
        secretFlagContent: '',
        secretFlag: '',
        workSecretFlag: '',
        haveKeyword: '',
        twoDimensionalCode: '',
        directSendRange: '',
        directSendType: '',
        signOpinionLimit: '',
        reasonLimit: '',
        reasonLimitWord: '',
        noLimitTitleWord: '',
        noLimitRedHead: '',
        id: ''
      }
      this.ruleForm.organizationName = this.ruleForm.unitName = this.unitName
      this.ruleForm.organizationId = this.ruleForm.unitId = this.unitId
    },
    handleSave () {
      if (!scrollIntoForm) {
        return
      }
      this.ruleForm.function = 'addSendOrderDic'
      this.$post
        .postData('addSendOrderDic', JSON.stringify(this.ruleForm), this.$businessCode.fawgl)
        .then(res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.dialogVisible = false
          this.handleLoadData()
        })
    },
    handleCancel () {
      this.dialogVisible = false
    }
  },
  created () {
    this.isGly = isGlyId();
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf: "1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.handleLoadData();
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
/deep/ .dispatchcswhlshwh{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
</style>
