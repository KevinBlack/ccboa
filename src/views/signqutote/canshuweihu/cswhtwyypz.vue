<template>
  <!-- 参数维护退文原因配置 -->
  <div>
    <div class="dispatchcswhtwyypz">
      <el-row>
        <el-col :span="12" style="margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleAddData">新建</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>
      </el-row>
      <m-table
        size="medium"
        :isSelection="true"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @handleSelectionChange="handleSelectionChange"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        @cellClick="cellClick"
        v-loading="tableLoading"
        :page-sizes="[10,15,20,25,30]"
      ></m-table>

      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" title="退文原因配置">
        <div class="bank_dispach_annotation">
          <p class="bank_dispach_annotation_current">参数间以英文半角“;”进行分隔</p>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="210px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="机构名称" prop="orgName" ref="orgName">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="退文原因" prop="backReason" ref="backReason">
              <el-input v-model="ruleForm.backReason"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" >取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";

const tableCols = [
  { label: "退文原因", prop: "backReason", align: "center" }
];

export default {
  name: "Qxjdbpz",
  components: {
    mTable
  },
  data() {
    return {
      dispatchcswhcspz: {
        function: "getTcQbbackReasonDicByPage",
        page: 1,
        limit: 10
      },
      pagination: {
        pageNum: 1, //第几页
        total: 10, //共有条数
        pageSize: 10 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      tableData: [],
      deleteIds: "",
      checkedArr: [],
      unitForm: {
        function: "getOrgInfo"
      },
      ruleForm: {
        function: "addTcDeptTypeDic",
        orgName: "",
        backReason: ""
      },
      //强制性要求
       rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        backReason: [
          { required: true, message: "请输入退文原因", trigger: "blur" }
        ]
       },
      baowenzd: "A08461305"
    };
  },
  methods: {
    // 初始化列表及分页
    handleLoadData() {
      this.$post
        .postData(
          "getTcQbbackReasonDicByPage",
          JSON.stringify(this.dispatchcswhcspz),
          this.baowenzd
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.dispatchcswhcspz.page = res.data.page;
          this.pagination.total = res.data.total;
        });
      this.$post
        .postData("getOrgInfo", JSON.stringify(this.unitForm), this.baowenzd)
        .then(res => {
          this.ruleForm.orgName = res.data.unitName;
          this.ruleForm.orgId = res.data.unitId;
        });
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.dispatchcswhcspz.page = val;
      this.pagination.pageNum = val;
      this.tableData = [];
      this.handleLoadData();
    },
    //每页条数
    handleSizeChange(val) {
      this.dispatchcswhcspz.limit = val;
      this.pagination.pageSize = val;
      this.tableData = [];
      this.handleLoadData();
    },
    //点击每行数据弹窗弹出
    cellClick(row, column, cell, event) {
      this.$post
        .postData(
          "getTcQbbackReasonDicById",
          JSON.stringify({ function: "getTcQbbackReasonDicById", id: row.id }),
          this.baowenzd
        )
        .then(res => {
          this.ruleForm = Object.assign({}, res.data, {
            function: "saveOrUpdateTcQbbackReasonDic"
          });
          this.dialogVisible = true;
        });
    },

    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "saveOrUpdateTcQbbackReasonDic"
      });
    },

    handleSelectionChange(val) {
      this.checkedArr = val;
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id);
      }
      this.deleteIds = idsArr.join(",");
    },
    // 批量删除
    handleBatchDelete() {
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择要删除的字段！"
        });
        return;
      }
      this.$post
        .postData(
          "deleteTcQbbackReasonDicEntityListById",
          JSON.stringify({
            function: "deleteTcQbbackReasonDicEntityListById",
            id: this.deleteIds
          }),
          this.baowenzd
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handleLoadData();
        });
    },
    handleSelect() {},
    handleAddData() {
      this.ruleForm.backReason = "";
      this.dialogVisible = true;
    },
    // 点击保存
    handleSave() {
       if(!this.scrollIntoForm()){
        //表单校验不通过
        return;
      };
      this.ruleForm.function = "saveOrUpdateTcQbbackReasonDic";
      this.$post
        .postData(
          "saveOrUpdateTcQbbackReasonDic",
          JSON.stringify(this.ruleForm),
          this.baowenzd
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.dialogVisible = false;
          this.handleLoadData();
        });
    },
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      let flag = true;
      this.$refs.ruleForm.validate((valid, object) => {
        if (!valid) {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            flag = false;
            break;
          }
          
        }
      });
      return flag;
    },
    //保存时校验
    saveCheck() {
      if(!this.scrollIntoForm()){
        //表单校验不通过
        return;
      };
      if (
        !this.ruleForm.orgName ||
        !this.ruleForm.backReason 
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return false;
      }
    },
  },
  created() {
    this.handleLoadData();
  }
};
</script>

<style  lang="less" rel="stylesheet/less" scoped>
.bank_dispach_annotation {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fef7e7;
  border: 1px solid #ff6600;
  display: flex;
  font-size: 12px;
  margin: 40px 0;
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
</style>