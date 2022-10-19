<template>
    <el-row  style="margin-top: 20px;">
      <el-col style="margin: 5px 0 0 0 ;text-align: left;">
        <el-button type="primary" @click="isAddFlag = true" v-show="this.tableData.length == 0">新建</el-button>
        <el-button type="primary" @click="handleDelete">删除</el-button>
      </el-col>
      <el-col style="margin: 5px 0;">
        <m-table
          size="medium"
          :isSelection="true"
          :isIndex="false"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :isIndexPage="true"
          @select="tableSelect"
          @cellClick="isAddFlag = true"
          v-loading="tableLoading"
        ></m-table>
      </el-col>
      <!-- 新建 -->
      <el-dialog class="addDialog" title="密文解密预警提醒配置" :visible.sync="isAddFlag">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="机构名称" prop="unitName">
            <el-input v-model="ruleForm.unitName" disabled></el-input>
          </el-form-item>
          <el-form-item label="是否启用解密预警提醒" prop="isEnable" class="isEnable">
            <el-radio-group v-model="ruleForm.isEnable">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">不启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="提醒时间" prop="remindDay">
            每月<el-select v-model="ruleForm.remindDay" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>日
          </el-form-item>
          <el-form-item label="解密时限" prop="decryptLimit">
            系统对解密时间小于<el-input v-model="ruleForm.decryptLimit" class="decryptLimit"></el-input>个月的文件进行解密预警提示
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 认</el-button>
          <el-button @click="isAddFlag = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-row>
</template>

<script>
import mTable from "components/table/mTable.vue";

export default {
  components: {
    mTable,
  },
  data() {
    let checkDecryptLimit = (rule, value, callback) => {
      if (value == "") {
        callback(new Error('请输入解密时限'));
      } else if (value == 0) {
        callback(new Error('请输入1至9999的正整数'));
      } else if (!(/^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[0-9])$/).test(value)) {
        callback(new Error('请输入1至9999的正整数'));
      } else {
        callback();
      }
    };
    return {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      isAddFlag: false,
      tableLoading: false,
      tableData: [],
      tableCols: [
        { label: "是否启用", prop: "isEnable", align: "center" },
        { label: "提醒时间", prop: "remindDay", align: "center" },
        { label: "解密期限", prop: "decryptLimit", align: "center" },
      ],
      ruleForm: {
        function: "doSaveOrUpdateDecrypUnit",
        unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        unitName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        isEnable: '',
        remindDay: '',
        decryptLimit: ''
      },
      rules: {
        unitName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
        ],
        isEnable: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        remindDay: [
          { type: 'date', required: true, message: '请选择解密时限', trigger: 'change' }
        ],
        decryptLimit: [
          { required: true, message: '请填写解密时限', trigger: 'blur' },
          { validator: checkDecryptLimit, trigger: 'blur' }
        ]
      },
      tableSelectList:[], // 选中
    };
  },
  methods: {
    initData() {
      this.$post
      .postData(
        "selectByDecrypUnitId",
        JSON.stringify({ function: "selectByDecrypUnitId" }),
        this.$businessCode.fawgl
      )
      .then(res => {
        this.ruleForm = Object.assign(this.ruleForm, res.data && res.data);
        this.tableData = res.data ? [res.data].map(item => {
          return {
            ...item,
            isEnable: item.isEnable == '1' ? '是' : '否'
          }
        }) : [];
      })
      .catch(err => {
        console.log(err);
      });
    },
    tableSelect(rows, row){
      this.tableSelectList=rows;
    },
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post
            .postData(
              "doSaveOrUpdateDecrypUnit",
              JSON.stringify(this.ruleForm),
              this.$businessCode.fawgl
            )
            .then(res => {
              this.isAddFlag = false;
              this.$message({ type: "success", message: "保存成功" });
              this.initData();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.initData();
    },
    handleDelete() {
      if (this.tableSelectList.length == 0) {
        this.$message({
          type: "error",
          showClose: false,
          offset: 400,
          message: "请勾选删除项",
          duration: 500,
        });
      } else {
        this.$confirm("确定要删除该项数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.$post
          .postData(
            "doDeleteDecrypUnitId",
            JSON.stringify({ function: "doDeleteDecrypUnitId", unitId: this.ruleForm.unitId }),
            this.$businessCode.fawgl
          )
          .then(res => {
            this.initData();
          })
          .catch(err => {
            console.log(err);
          });
        })
      }

    },
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
/deep/.addDialog .el-dialog {
  width: 45% !important;
}
.el-form-item {
  height: 40px;
}
/deep/.isEnable .el-form-item__label {
  line-height: 20px;
}
.decryptLimit {
  width: 100px;
}
</style>
