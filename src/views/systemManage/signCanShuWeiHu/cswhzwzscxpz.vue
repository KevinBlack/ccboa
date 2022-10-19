<template>
  <!-- 参数维护正文字数超限配置 -->
  <div  v-cloak>
    <div class="dispatchcswhlshwh">
      <!-- <el-row style="margin-bottom: 10px;">
        <el-col :span="12" style="margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleAddData">新建</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>
      </el-row> -->
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
          <el-col :span="10" style="margin-left: 20px;">
            <el-button type="primary" size="small" @click="handleLoadData('str')">查询</el-button>
          </el-col>
          <el-col :span="2" style="text-align: right;">
            <el-button type="primary" size="small" @click="handleAddData">新建</el-button>
          </el-col>
          <el-col :span="2" style="text-align: right;">
            <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
          </el-col>
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
      <el-dialog v-dialogDrag  :visible.sync="dialogVisible" :modal-append-to-body="false" title="正文字数限制配置">
        <div class="bank_dispach_annotation">
          <p class="bank_dispach_annotation_current">参数间以英文半角“;”进行分隔</p>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="机构名称" prop="orgName" ref="orgName">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序" prop="sort" ref="sort">
              <el-input v-model="ruleForm.sort" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="标题关键词" prop="keyword" ref="keyword">
              <el-input v-model="ruleForm.keyword"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字数限制" prop="fontLimit" ref="fontLimit">
              <el-input v-model="ruleForm.fontLimit" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
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
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const tableCols = [
  { label: "标题关键词", prop: "keyword", align: "center" },
  { label: "字数限制", prop: "fontLimit", align: "center" }
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
      isGly:false,
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
       sortDate: [{ prot: "date", order: "descnding" }],
      dispatchcswhcspz: {
        function: "getTcQbzishuSettingList",
        page: 1,
        limit: 20
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
        keyword: "",
        fontLimit: ""
      },
      //强制性要求
       rules: {
        keyword: [
          { required: true, message: "请输入标题关键词", trigger: "blur" }
        ],
        fontLimit: [
          { required: true, message: "请输入字数限制", trigger: "blur" }
        ]
       }
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
      console.log(this.unitName,this.unitId)
    },
    // 初始化列表及分页
    handleLoadData() {
      sessionStorage.setItem('QBLIST',JSON.stringify(this.dispatchcswhcspz));
      this.dispatchcswhcspz.unitName = this.unitName
      this.dispatchcswhcspz.unitId = this.unitId
      this.$post
        .postData(
          "getTcQbzishuSettingList",
          JSON.stringify(this.dispatchcswhcspz),
         this.$businessCode.qbgl
        )
        .then(res => {
          this.tableData = res.data && res.data.rows;
          this.dispatchcswhcspz.page = res.data.page;
          this.pagination.total = res.data.total;
        });
      // this.$post
      //   .postData("getOrgInfo", JSON.stringify(this.unitForm),this.$businessCode.qbgl)
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
      this.$post
        .postData(
          "getTcQbzishuSettingById",
          JSON.stringify({ function: "getTcQbzishuSettingById", id: row.id }),
         this.$businessCode.qbgl
        )
        .then(res => {
          this.ruleForm = Object.assign({}, res.data, {
            function: "doSaveTcQbzishuSetting"
          });
          this.dialogVisible = true;
        });
    },

    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "doSaveTcQbzishuSetting"
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
          "doDeleteTcQbzishuSetting",
          JSON.stringify({
            function: "doDeleteTcQbzishuSetting",
            id: this.deleteIds
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
         }else{
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
      this.ruleForm = {
        orgName : this.unitName,
        orgId :this.unitId,
        // orgName:JSON.parse(localStorage.getItem('userInfo')).shortUnitName,
        // orgId : JSON.parse(localStorage.getItem('userInfo')).unitId,
        keyword :"",
        fontLimit :"",
        sort :"",
        id :"",
      }
      this.dialogVisible = true;
    },
    // 点击保存
    handleSave(type) {
       if(!this.scrollIntoForm()){
        //表单校验不通过
        return;
      };
       if(this.ruleForm.id&&type === "uploadfile"){
        this.cellClick({id:this.ruleForm.id});
      }
      this.ruleForm.fontLimit=this.ruleForm.fontLimit&&(this.ruleForm.fontLimit).toString().trim();
      this.ruleForm.keyword=this.ruleForm.keyword&&(this.ruleForm.keyword).toString().trim();
      this.ruleForm.function = "doSaveTcQbzishuSetting";
      this.$post
        .postData(
          "doSaveTcQbzishuSetting",
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
         }else{
           this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: res.message,
            duration: 1000
          });
         }
         if(type){
          this.dialogVisible = false;
          this.handleLoadData();
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
        if(type){
          this.dialogVisible = false;
         }
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
        !this.ruleForm.keyword ||
        !this.ruleForm.fontLimit 
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
    // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
    this.isGly = isGlyId();
    if(sessionStorage.getItem('QBLIST')){
      this.dispatchcswhcspz = Object.assign(this.dispatchcswhcspz,JSON.parse(sessionStorage.getItem('QBLIST')))
      this.pagination = {
        page: this.dispatchcswhcspz.page, //第几页
        total: this.dispatchcswhcspz.totalCount, //共有条数
        limit: this.dispatchcswhcspz.limit, //每页条数
      }
    }
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
    // this.handleLoadData();
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
.mt20 {
    margin-top: 7px;
}
</style>