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
        <el-col :span="6" style="margin-left: 20px;">
          <el-button type="primary" size="small" @click="handleLoadData('1')">查询</el-button>
        </el-col>
        <el-col :span="9" style="text-align: right;margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleAddData">新增配置</el-button>
          <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>
        <!-- <el-col :span="24" style="margin-bottom: 10px;">
          <el-select style="width: 200px;" size="small" v-model="optionDepartInitial">
            <el-option
              v-for="item in optionDepart"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col> -->
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <m-table
          size="medium"
          :isSelection="true"
          :isIndex="false"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @handleSelectionChange="handleSelectionChange"
          @selectAll="handleSelectionChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :page-sizes="[10,15,20,25,30]"
        ></m-table>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" v-dialogDrag :modal-append-to-body="false" title="主送、抄送、本行发送类别" :before-close="handleCancel">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo_ruleForm"
      >
        <el-col>
          <el-form-item label="机构名称" prop="organizationName">
            <el-input v-model="ruleForm.organizationName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="类型" prop="sendType">
            <el-radio v-model="ruleForm.sendType" label="hld" class="alternative">行领导</el-radio>
            <el-radio v-model="ruleForm.sendType" label="ggry" class="alternative">高管人员</el-radio>
            <el-radio v-model="ruleForm.sendType" label="other" class="alternative">其他</el-radio>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="本行各部门" prop="isEveryDept">
            <el-radio v-model="ruleForm.isEveryDept" label="1" class="alternative">是</el-radio>
            <el-radio v-model="ruleForm.isEveryDept" label="0" class="alternative">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="类别" prop="categoryName">
            <el-input v-model="ruleForm.categoryName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="选项分隔符" prop="categoryShortname">
            <el-input v-model="ruleForm.categoryShortname"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
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
  { label: "排序", prop: "sort", align: "center" },
  { label: "类型", prop: "sendType", align: "center", 
    formatter(row) {
      switch (row.sendType) {
        case "hld":
          return "行领导"
          break;
        case "ggry":
          return "高管人员"
          break;
        case "other":
          return "其他"
          break;
        default:
          break;
      }
    }  
  },
  { label: "类别", prop: "categoryName", align: "center" }
]

export default {
  name: 'Zcslpz',
  components: {
    mTable,
    // searchForm,
    selectOrgOrDept
  },
  mixins: [dispatchFJWH],
  data () {
    return {
      isGly:false,
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      tableData: [],
      //xiaoM  主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: false
      },
      dialogVisible: false,
      ruleForm: {
        function: 'addOrUpdateSendObjTypeConfig',
        unitName: '',
        unitId: '',
        updateTime: '', // 修改人id
	      updateUserId: '', // 机构名称
	      organizationName: '',
        organizationId: '', //机构id
        sendType: '', // 类型（领导|hld 高管人员|ggry 其他|other）
        isEveryDept: '', // 本行各部门（是|1 否|0）
        categoryName: '', // 类别
        categoryShortname: '', // 选项分隔符
        sort: '',
        createUserId: '',
        createTime: ''
      },
      rules: {},
      optionDepart: [],
      optionDepartInitial: '',
      deleteIds: '',
      checkedArr: [],
    }
  },
  methods: {
    handleLoadData(val) {
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId;
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if(val=="1") {
        this.pagination.page = 1;
      }
      console.log("****", this.ruleForm);
      this.ruleForm.function = 'getSendObjTypeConfigByPage'
      this.$post.postData('getSendObjTypeConfigByPage', JSON.stringify(Object.assign({},this.ruleForm, this.pagination)), this.$businessCode.fawgl).then((res) => {
        this.tableData = res.data.rows
        this.pagination.total = res.data.total;
      })
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData()
    },

    handleSizeChange(val) {
      this.pagination.limit = val
      this.pagination.page = 1
      this.tableData = []
      this.handleLoadData()
    },
    cellClick(row, column, cell, event) {
      this.$post.postData('getSendObjTypeConfigById', JSON.stringify({ function: 'getSendObjTypeConfigById', id: row.id, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
        this.ruleForm = Object.assign({}, res.data)
        this.ruleForm.function = 'addOrUpdateSendObjTypeConfig'
        this.ruleForm.unitName = this.ruleForm.organizationName = this.unitName;
        this.ruleForm.unitId = this.ruleForm.organizationId = this.unitId;
        
        this.dialogVisible = true
      })
    },
    handleSelectionChange (val) {
      this.checkedArr = val
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
          message: "请选择要删除的字段！"
        });
        return;
      } else {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post.postData('deleteSendObjTypeConfigBEntityList', JSON.stringify({ function: 'deleteSendObjTypeConfigBEntityList', id: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
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
      this.dialogVisible = true;
      this.ruleForm = {
        function: 'addOrUpdateSendObjTypeConfig',
        unitName: '',
        unitId: '',
        updateTime: '', // 修改人id
	      updateUserId: '', // 机构名称
	      organizationName: '',
        organizationId: '', //机构id
        sendType: '', // 类型（领导|hld 高管人员|ggry 其他|other）
        isEveryDept: '', // 本行各部门（是|1 否|0）
        categoryName: '', // 类别
        categoryShortname: '', // 选项分隔符
        sort: '',
        createUserId: '',
        createTime: ''
      };
      this.checkData = []
      this.checkIds = []
      this.zhuCheckData = []
      this.ruleForm.organizationName = this.ruleForm.unitName = this.unitName
      this.ruleForm.organizationId = this.ruleForm.unitId = this.unitId
    },
    handleSave () {
      if (!scrollIntoForm) {
        return
      }
      if(this.ruleForm.typeName==""||this.ruleForm.content=="") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "必填字段不能为空!",
          duration: 1000
        });
        return;
      }
      this.ruleForm.function = 'addOrUpdateSendObjTypeConfig'
      console.log(this.ruleForm)
      this.$post.postData('addOrUpdateSendObjTypeConfig', JSON.stringify(this.ruleForm), this.$businessCode.fawgl).then((res) => {
        if(res.success) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
        this.dialogVisible = false
        this.ruleForm = {
          function: '',
          unitName: '',
          unitId: '',
          updateTime: '', // 修改人id
          updateUserId: '', // 机构名称
          organizationName: '',
          organizationId: '', //机构id
          sendType: '', // 类型（领导|hld 高管人员|ggry 其他|other）
          isEveryDept: '', // 本行各部门（是|1 否|0）
          categoryName: '', // 类别
          categoryShortname: '', // 选项分隔符
          sort: '',
          createUserId: '',
          createTime: ''
        };
        this.handleLoadData()
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error.message
        })
      })
    },
    handleCancel () {
      this.dialogVisible = false
      this.ruleForm = {
        function: '',
        unitName: '',
        unitId: '',
        updateTime: '', // 修改人id
	      updateUserId: '', // 机构名称
	      organizationName: '',
        organizationId: '', //机构id
        sendType: '', // 类型（领导|hld 高管人员|ggry 其他|other）
        isEveryDept: '', // 本行各部门（是|1 否|0）
        categoryName: '', // 类别
        categoryShortname: '', // 选项分隔符
        sort: '',
        createUserId: '',
        createTime: ''
      };
    }
  },
  created () {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
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
      this.handleLoadData("1");
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
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
