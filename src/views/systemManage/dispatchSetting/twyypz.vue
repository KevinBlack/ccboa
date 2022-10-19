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
          <el-button type="primary" size="small" @click="handleAddData">新增退文原因配置</el-button>
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
        <!-- <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          @select-all="handleSelectionChange"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" type="index" width="50" label="序号" align="center"></el-table-column>
          <el-table-column prop="backReason" label="退文原因" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="smart"
                @click="handleShowTitle(scope.$index, scope.row)"
              >{{ scope.row.backReason }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" align="center"></el-table-column>
        </el-table> -->
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

    <el-dialog :visible.sync="dialogVisible" v-dialogDrag :modal-append-to-body="false" :append-to-body="true" :before-close="handleCancel" title="退文原因配置">
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
          <el-form-item label="退文原因" prop="backReason">
            <el-input v-model="ruleForm.backReason"></el-input>
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
import scrollIntoForm from '@/util/scrollValid'
import mTable from "components/table/mTable.vue";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFJWH from "@/minixs/dispatchFJWH";

const tableCols = [
  { label: "退文原因", prop: "backReason", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
]

export default {
  name: 'Twyypz',
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
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      referForm: {
        function: 'selectTcBrdByPage'
      },
      unitForm: {
        function: 'getOrgInfo'
      },
      ruleForm: {
        function: 'saveOrUpdateTcBrd',
        unitName: '',
        unitId: '',
        organizationName: '',
        organizationId: '',
        backReason: '',
        sort: '',
        id: ''
      },
      rules: {
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        backReason: [
          { required: true, message: '请输入退文原因', trigger: 'blur' }
        ]
      },
      optionDepart: [],
      optionDepartInitial: '',
      deleteIds: '',
      checkedArr: []
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
      
      this.$post.postData('selectTcBrdByPage', JSON.stringify(Object.assign({},this.ruleForm, this.referForm, this.pagination)), this.$businessCode.fawgl).then((res) => {
        this.tableData = res.data.rows;
        this.pagination.total = res.data.total;
      })
      // this.$post.postData('getOrgInfo', JSON.stringify(this.unitForm), this.$businessCode.fawgl).then((res) => {
      //   this.ruleForm.unitName = res.data.unitName
      //   this.ruleForm.organizationName = res.data.unitName
      //   this.ruleForm.organizationId = res.data.unitId
      // })
      console.log(this.ruleForm)
    },
    handleCancel () {
      this.dialogVisible = false
      this.ruleForm = {
        function: '',
        unitName: '',
        unitId: '',
        organizationName: '',
        organizationId: '',
        backReason: '',
        sort: '',
        id: ''
      }
      this.ruleForm.organizationName = this.ruleForm.unitName = this.unitName
      this.ruleForm.organizationId = this.ruleForm.unitId = this.unitId
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
      this.$post.postData('selectTcBrdById', JSON.stringify({ function: 'selectTcBrdById', id: row.id, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
        this.ruleForm = Object.assign({}, res.data, { function: 'saveOrUpdateTcBrd' })
        this.ruleForm.unitName = this.ruleForm.organizationName = this.unitName;
        this.ruleForm.unitId = this.ruleForm.organizationId = this.unitId;
        this.dialogVisible = true
      })
    },
    // handleShowTitle (index, row) {
    //   this.$post.postData('selectTcBrdById', JSON.stringify({ function: 'selectTcBrdById', id: row.id }), this.$businessCode.fawgl).then((res) => {
    //     this.ruleForm = Object.assign({}, res.data, { function: 'saveOrUpdateTcBrd' })
    //     console.log(this.ruleForm)
    //     this.dialogVisible = true
    //   })
    // },
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
            this.$post.postData('deleteTcBackReasonDicEntityList', JSON.stringify({ function: 'deleteTcBackReasonDicEntityList', id: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleLoadData("1")
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
        function: 'saveOrUpdateTcBrd',
        unitName: '',
        unitId: '',
        organizationName: '',
        organizationId: '',
        backReason: '',
        sort: '',
        id: ''
      }
      this.ruleForm.organizationName = this.ruleForm.unitName = this.unitName
      this.ruleForm.organizationId = this.ruleForm.unitId = this.unitId
    },
    handleSave () {
      if (!scrollIntoForm) {
        return
      }
      if(this.ruleForm.backReason=="") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "必填字段不能为空!",
          duration: 1000
        });
        return;
      }
      this.ruleForm.function = 'saveOrUpdateTcBrd'
      this.$post.postData('saveOrUpdateTcBrd', JSON.stringify(this.ruleForm), this.$businessCode.fawgl).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.dialogVisible = false
        this.ruleForm = {
          function: '',
          unitName: '',
          unitId: '',
          organizationName: '',
          organizationId: '',
          backReason: '',
          sort: '',
          id: ''
        }
        this.handleLoadData()
      })
    },
    handleDocTypeChange (val) {
      console.log(val)
      this.referForm = Object.assign(this.referForm, { docTypeDicId: val })
      this.handleLoadData()
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
