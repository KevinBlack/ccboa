<template>
<!-- 机构分类配置 -->
  <div class="dispatchjgflpzpage">
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
            <el-button type="primary" size="small" @click="handleAddData">新增机构分类</el-button>
            <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
          </el-col>
        </el-form>
      </el-row>
      <m-table
          size="medium"
          :isSelection="true"
          :isIndex="false"
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

      <el-dialog :visible.sync="dialogVisible" v-dialogDrag :modal-append-to-body="false" :before-close="handleCancel" title="机构分类配置">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="分类名称" prop="typeName">
              <el-input v-model="ruleForm.typeName"></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="排序">
              <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
              <el-form-item label="本行各部门" prop="isBhDept" ref="isBhDept">
                <el-radio
                  v-model="ruleForm.isBhDept"
                  label="1"
                  class="alternative"
                  @change="setHiddenOrg(true)"
                >是</el-radio>
                <el-radio
                  v-model="ruleForm.isBhDept"
                  label="0"
                  class="alternative"
                  @change="setHiddenOrg(false)"
                >否</el-radio>
              </el-form-item>
            </el-col>
          <el-col v-if="ruleForm.isBhDept==0">
            <el-form-item label="配置内容" prop="deptNames">
              <div style="display:flex">
                <el-input v-model="ruleForm.deptNames"
                  type="textarea"
                  resize="none"
                  autosize :disabled="true">
                </el-input>
                <button
                  v-if="ruleForm.isBhDept==0" 
                  @click="bankmain('hui')"
                  type="button"
                  class="el-button el-button--default dimi_btn"
                >
                  <i class="el-icon-plus"></i>
                </button>
              </div>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item v-if="ruleForm.isBhDept==1" label="隐藏部门">
              <div style="display:flex">
              <el-input
                type="textarea"
                resize="none"
                autosize
                :disabled="true"
                style="flex:1"
                v-model="ruleForm.hideDeptName"
                name="knowScore"
              >
              </el-input>
              <button
                @click="bankmain('hidden')"
                type="button"
                class="el-button el-button--default dimi_btn"
              >
                <i class="el-icon-plus"></i>
              </button>
            </div>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-dialog>
      <treeCofig
        :treeData="treeData"
        :canTab="canTab"
        :hasRadio="hasRadio"
        :dialogType="dialogType"
        :dialogTypeNow="dialogTypeNow"
        :dialogTit="dialogTit"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        :offenUse="offenUse"
        :checkOrg="checkOrg"
        :seletOptionsData="seletOptionsData"
        @showCompDialog="showCompDialog"
        :treeTradeCode="treeTradeCode"
        :loadingTreeCopy="loadingTreeCopy"
        orgId="U010000"
      ></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import scrollIntoForm from '@/util/scrollValid'
import treeCofig from "components/tree/tree-jgpz"
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFJWH from "@/minixs/dispatchFJWH";

const tableCols = [
  { label: "分类名称", prop: "typeName", align: "center" },
  { label: "配置内容", prop: "deptNames", align: "center" },
  { label: "隐藏部门", prop: "hideDeptName", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
]

export default {
  name: "Jgflpz",
  components: {
    mTable,
    treeCofig,
    // searchForm,
    selectOrgOrDept
  },
  mixins: [dispatchFJWH],
  data() {
    return {
      isGly:false,
      treeTradeCode:'',//人员树交易线
      dispatchjgflpz: {
        function: "getTcDeptTypeDic"
      },
      unitForm: {
        function: 'getOrgInfo'
      },
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      dialogTypeNow:'',
      dspcPrmShow: false,
      tableData: [],
      deleteIds:'',
      checkedArr: [],
      ruleForm: {
        function: "addTcDeptTypeDic",
        unitName: '',
        unitId: '',
        organizationId: "",
        organizationName: "",
        typeName: "",
        deptIds: "",
        sort: '',
        deptNames: "",
        isBhDept:0,
        hideDeptName:''
      },
      //强制性要求
      rules: {
        typeName: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ],
        deptNames: [
          { required: true, message: "请输入配置内容", trigger: "blur" }
        ]
      },
      haveData: true,
      //xiaoM  主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByUnitPcode",
        openSup:true,
        openSupDept:false,
        openCurr:true,
        openCurrFistDept:false,
        openEqual:true,
        openEqualDept:false,
        openSub:true,
        openSubDept:false,
        wfeUnitId: 'U100000'
      },
      bank_hidenBumen:{
        function: "unitTreeAll",
        openSup: false,
        openSupDept: false,
        openCurr: true,
        openCurrFistDept: true,
        openEqual: false,
        openEqualDept: false,
        openSub: false,
        openSubDept: false,
        wfeUnitId: ''
      },
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      zhuCheckData: [], //主抄送选中数据
      hiddenCheckData:[],//隐藏部门数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      checkOrg: false,
      loadingTreeCopy: false
    };
  },
  methods: {
    setHiddenOrg(n){//本行 隐藏部门操作
      this.rules.deptNames[0].required = !n;
      this.$forceUpdate();
    },
    // 初始化列表及分页
    handleLoadData(val) {
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId
      this.bank_mainXiao.wfeUnitId = this.bank_hidenBumen.wfeUnitId = this.unitId
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if(val=="1") {
        this.pagination.page = 1;
      }
      console.log("****", this.ruleForm);
      
      this.$post
        .postData("getTcDeptTypeDic", JSON.stringify(Object.assign({},this.ruleForm, this.dispatchjgflpz, this.pagination)), this.$businessCode.fawgl)
        .then(res => {
          this.tableData = res.data.rows;
          this.dispatchjgflpz.page = res.data.page;
          this.pagination.total = res.data.total;
        })
      // this.$post.postData('getOrgInfo', JSON.stringify(this.unitForm), this.$businessCode.fawgl).then((res) => {
      //   this.ruleForm.unitName = res.data&&res.data.unitName
      //   this.ruleForm.typeName = res.data&&res.data.unitName
      //   this.ruleForm.organizationId = res.data&&res.data.unitId
      // })
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
    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "addTcDeptTypeDic"
      });
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
            this.$post.postData('deleteTcDeptTypeDic', JSON.stringify({ function: 'deleteTcDeptTypeDic', id: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
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
    cellClick(row, column, cell, event) {
      this.$post
        .postData(
          "getTcDeptTypeDicById",
          JSON.stringify({ function: "getTcDeptTypeDicById", id: row.id, unitId: this.unitId }),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.bank_mainXiao.wfeUnitId = this.bank_hidenBumen.wfeUnitId = res.data.organizationId
          this.ruleForm = Object.assign({}, res.data, {
            function: "addTcDictionaryLimit"
          });
          this.ruleForm.unitName = this.ruleForm.organizationName = this.unitName;
          this.ruleForm.unitId = this.ruleForm.organizationId = this.unitId;
          if (res.data.deptIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.deptIds,
              res.data.deptNames,
              "dosend"
            );
          }
          if (res.data.hideDeptId) {
            this.hiddenCheckData = this.concatTreeData(
              res.data.hideDeptId,
              res.data.hideDeptName
            );
          }
          this.dialogVisible = true;
          this.ruleForm.isBhDept = res.data.isBhDept ==1?'1':'0';
        });
    },
    handleAddData() {
      this.dialogVisible = true;
      this.ruleForm = {
        function: "addTcDeptTypeDic",
        unitName: '',
        unitId: '',
        organizationId: "",
        typeName: "",
        deptIds: "",
        sort: '',
        deptNames: "",
        isBhDept:0,
        hideDeptName:''
      }
      this.checkData = []
      this.checkIds = []
      this.zhuCheckData = []
      this.ruleForm.isBhDept = '0';
      this.ruleForm.organizationName = this.ruleForm.unitName = this.unitName
      this.ruleForm.organizationId = this.ruleForm.unitId = this.unitId
      this.bank_mainXiao.wfeUnitId = this.bank_hidenBumen.wfeUnitId = this.unitId
    },
     // 表单校验滚动
    scrollIntoForm() {
      let that = this;
      let result = true;
      this.$refs.ruleForm.validate((valid, object) => {
        if (!valid) {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
          result = false;
        }
      });
      return result;
    },
    handleSave() {
      // if (!this.scrollIntoForm()) {
      //   return
      // }
      if (this.ruleForm.typeName=="") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "必填字段不能为空!",
          duration: 1000
        });
        return;
      }
      if(this.ruleForm.isBhDept==0&&this.ruleForm.deptNames=="") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "必填字段不能为空!",
          duration: 1000
        });
        return;
      }
      this.ruleForm.function = 'addTcDeptTypeDic'
      this.$post
        .postData("addTcDeptTypeDic", JSON.stringify(this.ruleForm), this.$businessCode.fawgl)
        .then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.dialogVisible = false
          this.ruleForm = {
            function: "",
            unitName: '',
            unitId: '',
            organizationId: "",
            typeName: "",
            deptIds: "",
            sort: '',
            deptNames: "",
            isBhDept:0,
            hideDeptName:''
          }
          this.handleLoadData();
        });
    },
    handleCancel () {
      this.dialogVisible = false
      this.ruleForm = {
        function: "",
        unitName: '',
        unitId: '',
        organizationId: "",
        typeName: "",
        deptIds: "",
        sort: '',
        deptNames: "",
        isBhDept:0,
        hideDeptName:''
      }
    },
     //主抄送弹框
    bankmain(n) {
      let paramsNow = (n =='hui')?this.bank_mainXiao:this.bank_hidenBumen, 
      funName = (n =='hui')?"selUnitTreeByUnitPcode":"unitTreeAll";;
      this.treeData = [];
      this.dialogTit = '选择部门';
      this.dialogType = 'hui';
      this.dialogTypeNow = n;
      this.hasRadio = false;
      this.canTab = false;
      // paramsNow = (n =='hui')?this.bank_mainXiao:this.bank_hidenBumen;
      if (n=='hui') {
        this.treeData = null;
        this.loadingTreeCopy = true;
      } else {
        this.loadingTreeCopy = false;
      }
      if(n!='hui'){
        this.$post.postData(
          // "unitTreeAll",
          funName,
          JSON.stringify(paramsNow),
          this.$businessCode.ggfawgl
        ).then(res => {
          console.log(JSON.stringify(res.data));
          this.treeData = (res && res.data) || [];
          this.treeData[0].disabled = true
        }); 
      }
      this.showCompDialog();
    },
     //完成并发送弹窗
    showCompDialog(data, status, type, params,dtype) {
      let that = this;
      
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(';');
          ids = ids.join(';');
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }
        switch (dtype){
           case "hui":
            this.ruleForm.deptNames = names;
            this.ruleForm.deptIds = ids;
            this.zhuCheckData = this.checkData;
            break;
          case "hidden":
            this.ruleForm.hideDeptName = names;
            this.ruleForm.hideDeptId = ids;
            this.hiddenCheckData = this.checkData;
            break;
        }
        
        this.$forceUpdate();
      }

      this.dialogState = !this.dialogState;
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //弹窗回显数据
    backDialogData(type) {
       switch (type) {
        case "hui":
          this.checkIds = this.ruleForm.deptIds
            ? this.ruleForm.deptIds.split(';')
            : [];
          this.checkData = this.zhuCheckData;
          break;
        case "hidden":
          this.checkIds = this.ruleForm.hideDeptId
            ? this.ruleForm.hideDeptId.split(';')
            : [];
          this.checkData = this.hiddenCheckData;
          break;
       }
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(";");
      names = name.split(";");
      ids.map((item, n) => {
        obj.push({
          id: item,
          name: names[n]
        });
      });
      return obj;
    }
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.treeTradeCode = this.$businessCode.ggfawgl
    
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
    this.bank_mainXiao.wfeUnitId = this.bank_hidenBumen.wfeUnitId = JSON.parse(localStorage.getItem('userInfo')).unitId
  }
};
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