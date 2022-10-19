<template>
  <!-- 参数维护流水号维护配置 -->
  <div v-cloak>
    <div class="dispatchcswhlshwh">
      <el-form label-width="120px" class="mt20">
        <el-row style="margin-bottom: 5px;">
          <el-col :span="8" style="margin-left: 20px;">
            <el-form-item label="机构名称">
              <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择"
                  v-model="unitName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item>
              <div class="block">
                  <el-date-picker
                    v-model="year"
                    :clearable="false"
                    type="year"
                    placeholder="选择年"
                  ></el-date-picker>
                </div>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-left: 20px;text-align: right;">
            <el-button type="primary" size="small" @click="handleLoadData('str')">查询</el-button>
            <el-button type="primary" size="small" @click="handleAddData">新建</el-button>
            <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
          </el-col>
          <!-- <el-col :span="2" style="text-align: right;margin-bottom: 10px;">
          </el-col>
          <el-col :span="2" style="text-align: right;margin-bottom: 10px;">
          </el-col> -->
        </el-row>
      </el-form>
      <el-col style="margin: 10px 0;">
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
        :default-sort="sortDate"
      ></m-table>
      </el-col>
      <el-dialog
        v-dialogDrag
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        title="流水号配置"
      >
        <div class="bank_dispach_annotation">
          <p class="bank_dispach_annotation_current">参数间以英文半角“;”进行分隔</p>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="机构名称" prop="orgName" ref="orgName">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-form-item label="发文种类" prop="qianbaoType" ref="qianbaoType">
              <el-input v-model="ruleForm.qianbaoType"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col>
            <el-form-item label="文件/代字" prop="redHead" ref="redHead">
              <el-select v-model="ruleForm.redHead" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="redheaditem in redHeadlist"
                  :key="redheaditem.value"
                  :label="redheaditem.value"
                  :value="redheaditem.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="年度" prop="year" ref="year">
              <el-input v-model="ruleForm.year" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="起始文号">
              <el-input
                v-model.trim="ruleForm.startNum"
                oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="当前最大文号" prop="currentMaxNum" ref="currentMaxNum">
              <el-input
                v-model.trim="ruleForm.currentMaxNum"
                oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="空缺文号">
              <el-input
                v-model.trim="ruleForm.reservedNum"
                oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序">
              <el-input v-model="ruleForm.sort" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const tableCols = [
  { label: "文件代字", prop: "redHead", align: "center" },
  { label: "年度", prop: "year", align: "center" },
  { label: "当前最大文号", prop: "currentMaxNum", align: "center" }
];

export default {
  name: "Qxjdbpz",
  components: {
    mTable,
    searchForm,
    selectOrgOrDept
  },
  data() {
    return {
      year:new Date(),
      isGly:false,
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      sortDate: [{ prot: "date", order: "descnding" }],
      dispatchcswhcspz: {
        function: "selectProduceNumberByPage",
        page: 1,
        limit: 20,
        type: "CN002",
        unitId: "",
        year:""
      },
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
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
        function: "",
        orgName: "",
        redHead: "",
        year: "",
        startNum: "",
        currentMaxNum: "",
        reservedNum: "",
        sort: ""
      },
      redHeadlist: [],
      getRedHeadList: {
        function: "getRedHeadList"
      },
      //强制性要求
      rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        redHead: [
          { required: true, message: "请输入文件/代字", trigger: "change" }
        ],
        year: [
          { required: true, message: "请输入年度", trigger: "blur" }
        ],
        currentMaxNum: [
          { required: true, message: "请输入当前最大文号", trigger: "blur" }
        ]
      },      
    };
  },
  methods: {
    // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      this.handleLoadData();
      console.log(org, this.unitName , this.unitId);
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.draforgnmPeople = manger.filter(item => {
        return (
          item.codeType === "manager_type" && item.dicCode === "sys_manager"
        );
      });
      if (this.draforgnmPeople.length !== 0) {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = true;
        this.identity = false;
      }
    },

    // 初始化列表及分页
    handleLoadData(str) {
      this.dispatchcswhcspz.year = this.year && this.year.getFullYear() || ""
      sessionStorage.setItem('QBLIST',JSON.stringify(this.dispatchcswhcspz));
      this.dispatchcswhcspz.unitName = this.unitName
      this.dispatchcswhcspz.unitId = this.unitId
      if(str){
        this.dispatchcswhcspz.page = 1;
        this.pagination.page = 1;

      }
      this.$post
        .postData(
          "selectProduceNumberByPage",
          JSON.stringify(this.dispatchcswhcspz),
          this.$businessCode.qbgl
        )
        .then(res => {
          if(res.success){
            this.tableData = res.data.rows;
            this.dispatchcswhcspz.page = res.data.page;
            this.pagination.total = res.data.total;

            // if(res.data.page>res.data.pages){
            //   this.dispatchcswhcspz.page = res.data.pages;
            //   this.pagination.page = res.data.pages;
            //   this.handleLoadData("1")
            // }
          }else{
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
            message: res.message,
            duration: 1000
          });
        });
      // this.$post
      //   .postData(
      //     "getOrgInfo",
      //     JSON.stringify(this.unitForm),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     this.ruleForm.orgName = res.data.unitName;
      //     this.ruleForm.orgId = res.data.unitId;
      //   });
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.dispatchcswhcspz.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.handleLoadData();
    },
    //每页条数
    handleSizeChange(val) {
      this.dispatchcswhcspz.limit = val;
      this.pagination.limit = val;
      this.dispatchcswhcspz.page = this.pagination.page = 1;
      this.tableData = [];
      this.handleLoadData();
    },
    //点击每行数据弹窗弹出
    cellClick(row, column, cell, event) {
      // this.$post
      //   .postData(
      //     "getOrgInfo",
      //     JSON.stringify(this.unitForm),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     this.ruleForm.orgName = res.data.unitName;
      //     this.ruleForm.orgId = res.data.unitId;
      
      //   });
      this.$post
        .postData(
          "selectProduceNumberById",
          JSON.stringify({ function: "selectProduceNumberById", id: row.id ,unitName:this.unitName,unitId:this.unitId}),
          this.$businessCode.qbgl
        )
        .then(res => {
          // this.$nextTick(() => {
          //   this.$refs.ruleForm.clearValidate();
          // });
          // this.ruleForm = Object.assign({}, res.data, {
          //   function: "doSaveOrUpdateProduceNumber",
          //   type: "CN002"
          // });
          this.ruleForm = res.data
          this.ruleForm['function'] = 'doSaveOrUpdateProduceNumber'
          this.ruleForm['type'] = 'CN002'
            // this.ruleForm.redHead = this.ruleForm.redHead || "";
            // this.ruleForm.year = this.ruleForm.year || 0;
            // this.ruleForm.startNum = this.ruleForm.startNum || 0;
            // this.ruleForm.currentMaxNum = this.ruleForm.currentMaxNum || 0;
            // this.ruleForm.reservedNum = this.ruleForm.reservedNum || 0;
            // this.ruleForm.sort = this.ruleForm.sort || 0;
            console.log(this.ruleForm)
          this.dialogVisible = true;
        });
      this.handlegetRedHeadList();
      // this.handleSave()
    },

    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "doSaveOrUpdateProduceNumber",
        type: "CN002"
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
          message: "请选择一条数据进行删除！"
        });
        return;
      }
      this.$post
        .postData(
          "doDeleteListProduceNumberById",
          JSON.stringify({
            function: "doDeleteListProduceNumberById",
            id: this.deleteIds,
            unitName :this.unitName,
            unitId :this.unitId,
          }),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 1000
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
          this.handleLoadData();
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
    handleSelect() {},
    handleAddData() {
      this.ruleForm={
        orgName : this.unitName,
        orgId : this.unitId,
        redHead : "",
        year : '',
        startNum : '',
        currentMaxNum : '',
        reservedNum : '',
        sort : '',
      }
      // this.ruleForm.orgName = this.unitName
      // this.ruleForm.orgId = this.unitId
      // this.ruleForm.redHead = 0;
      // this.ruleForm.year = 0;
      // this.ruleForm.startNum = 0;
      // this.ruleForm.currentMaxNum = 0;
      // this.ruleForm.reservedNum = 0;
      // this.ruleForm.sort = 0;
      this.dialogVisible = true;
      this.handlegetRedHeadList();
    },
    // 点击保存
    handleSave(type) {
      if (!this.scrollIntoForm()) {
        //表单校验不通过
        return;
      }
      if (this.ruleForm.id && type === "uploadfile") {
        this.cellClick({ id: this.ruleForm.id });
      }
      this.ruleForm.function = "doSaveOrUpdateProduceNumber";
      this.ruleForm.type = "CN002";
      this.ruleForm.unitName = this.ruleForm.orgName;
      this.ruleForm.unitId = this.ruleForm.orgId;
      this.$post
        .postData(
          "doSaveOrUpdateProduceNumber",
          JSON.stringify(this.ruleForm),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            if (type && type != "uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            //附件
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            }
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
          }
          // if (type) {
          //   this.dialogVisible = false;
          //   this.handleLoadData();
          // }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: res.message,
            duration: 1000
          });
          // if (type) {
          //   this.dialogVisible = false;
          //   this.handleLoadData();
          // }
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
      if (!this.scrollIntoForm()) {
        //表单校验不通过
        return;
      }
      if (!this.ruleForm.orgName || !this.ruleForm.redHead || !this.ruleForm.year || !this.ruleForm.currentMaxNum) {
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
    handlegetRedHeadList() {
      //文件/代字  下拉
      this.getRedHeadList.unitId=this.unitId;
      this.getRedHeadList.unitName=this.unitName;
      console.log(this.getRedHeadList)
      this.$post
        .postData(
          "getRedHeadList",
          JSON.stringify(this.getRedHeadList),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.redHeadlist = res.data;
        });
    }
  },
  created() {
    if(sessionStorage.getItem('QBLIST')){
      this.dispatchcswhcspz = Object.assign(this.dispatchcswhcspz,JSON.parse(sessionStorage.getItem('QBLIST')))
    }
    this.pagination = {
      page: this.dispatchcswhcspz.page, //第几页
      total: this.dispatchcswhcspz.totalCount, //共有条数
      limit: this.dispatchcswhcspz.limit, //每页条数
    }
    this.isGly = isGlyId();
    // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf:"1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.handleLoadData();
    })
    
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

/deep/ .el-input__suffix-inner{
  .el-input__icon{
    display: none;
  }
}
.mt20 {
    margin-top: 7px;
}
</style>