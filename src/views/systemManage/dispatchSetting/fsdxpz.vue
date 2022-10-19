<template>
  <div class="dispatchparameterspage dispatchcswhlshwh">
    <el-row>
      <el-col :span="12" style="margin-bottom: 10px;">
        <el-button type="primary" size="small" @click="handleAddData">新增发送对象</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;margin-bottom: 10px;">
        <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
      </el-col>
      <el-col :span="24" style="margin-bottom: 10px;">
        <el-select style="width: 200px;" size="small" v-model="optionDepartInitial">
          <el-option
            v-for="item in optionDepart"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
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

    <el-dialog :visible.sync="dialogVisible" v-dialogDrag :modal-append-to-body="false" :before-close="handleCancel" title="发文参数配置">
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
          <el-form-item label="类别名称" prop="typeName">
            <el-input v-model="ruleForm.typeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="单项结尾字符" prop="singleEnd">
            <el-input v-model="ruleForm.singleEnd"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="多项结尾字符" prop="manyEnd">
            <el-input v-model="ruleForm.manyEnd"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="多项间隔字符" prop="manySpace">
            <el-input v-model="ruleForm.manySpace"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="内容" prop="content">
            <el-input v-model="ruleForm.content"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import scrollIntoForm from '@/util/scrollValid'

const tableCols = [
  { label: "类别名称", prop: "typeName", align: "center" },
  { label: "内容", prop: "content", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
];

export default {
  name: 'Fsdxpz',
  components: {
    mTable
  },
  data () {
    return {
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 10 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      referForm: {
        function: 'getPriDeliveryByPage'
      },
      unitForm: {
        function: 'getOrgInfo'
      },
      ruleForm: {
        function: 'addOrUpdatePriDelivery',
        unitName: '',
        unitId: '',
        organizationName: '',
        organizationId: '',
        typeName: '',
        singleEnd: '',
        manyEnd: '',
        manySpace: '',
        sort: '',
        content: '',
        id: ''
      },
      rules: {
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        typeName: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      optionDepart: [
        {
          label: '中国建设银行',
          value: '0'
        }
      ],
      optionDepartInitial: '',
      deleteIds: '',
      checkedArr: []
    }
  },
  methods: {
    handleLoadData () {
      this.$post.postData('getPriDeliveryByPage', JSON.stringify(this.referForm), this.$businessCode.fawgl).then((res) => {
        this.tableData = res.data.rows
        this.pagination.total = res.data.total;
      })
      this.$post.postData('getOrgInfo', JSON.stringify(this.unitForm), this.$businessCode.fawgl).then((res) => {
        this.ruleForm.unitName = res.data.unitName
        this.ruleForm.organizationName = res.data.unitName
        this.ruleForm.organizationId = res.data.unitId
      })
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = val;
      this.pagination.limit = val;
      this.pagination.page = 1
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      this.$post.postData('getPriDeliveryById', JSON.stringify({ function: 'getPriDeliveryById', id: row.id }), this.$businessCode.fawgl).then((res) => {
        console.log(res.data)
        this.ruleForm = Object.assign({}, res.data, { function: 'addOrUpdatePriDelivery' })
        this.dialogVisible = true
      })
    },
    // handleShowTitle (index, row) {
    //   this.$post.postData('getPriDeliveryById', JSON.stringify({ function: 'getPriDeliveryById', id: row.id }), this.$businessCode.fawgl).then((res) => {
    //     this.ruleForm = Object.assign({}, res.data, { function: 'addOrUpdatePriDelivery' })
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
            this.$post.postData('deleteTcPriDeliverDicEntityList', JSON.stringify({ function: 'deleteTcPriDeliverDicEntityList', id: this.deleteIds }), this.$businessCode.fawgl).then((res) => {
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
    },
    handleSave () {
      if (!scrollIntoForm) {
        return
      }
      if(this.ruleForm.typeName==""||this.ruleForm.content=="") {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "必填字段不能为空!",
          duration: 500
        });
        return;
      }
      this.ruleForm.function = 'addOrUpdatePriDelivery'
      this.$post.postData('addOrUpdatePriDelivery', JSON.stringify(this.ruleForm), this.$businessCode.fawgl).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.ruleForm = {
          function: 'addOrUpdatePriDelivery',
          unitName: '',
          unitId: '',
          organizationName: '',
          organizationId: '',
          typeName: '',
          singleEnd: '',
          manyEnd: '',
          manySpace: '',
          sort: '',
          content: '',
          id: ''
        }
        this.dialogVisible = false
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
    this.optionDepartInitial = this.optionDepart[0].label
    this.handleLoadData()
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
