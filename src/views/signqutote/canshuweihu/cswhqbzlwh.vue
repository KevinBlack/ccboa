<template>
  <!-- 参数维护签报参数配置 -->
  <div>
    <div class="dispatchcswhqbzlwhpage">
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

      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" title="签报种类配置">
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
            <el-form-item label="文件字头" prop="fileHead" ref="fileHead">
              <el-input v-model="ruleForm.fileHead" ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字号种类" prop="wordNo" ref="wordNo">
              <el-input v-model="ruleForm.wordNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="拟稿部门"  prop="draftDept" ref="draftDept">
              <el-input v-model="ruleForm.draftDept">
                <el-button slot="append" @click="getTreeData('draft')" icon="el-icon-plus"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="模板">
              <el-input v-model="ruleForm.template"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字数限制（字）">
              <el-input v-model="ruleForm.fontLimit" type="number"></el-input>
            </el-form-item>
          </el-col>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" >取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-dialog>
    </div>
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
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from '@/components/tree/tree-fawen';
const tableCols = [
  { label: "文件字头", prop: "fileHead", align: "center" },
  { label: "字号种类", prop: "wordNo", align: "center" },
  { label: "拟稿部门", prop: "draftDept", align: "center" }
];
export default {
  name: "Qxjdbpz",
  components: {
    mTable,
    treeCofig
  },
  data() {
    return {
      dialogTit: '', // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      draftCheckData: [], //拟稿部门选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: '', //弹窗类型
      hasRadio: false ,//是否有单选
      dialogTypeNow:'',//当前弹窗类型
      dispatchcswhcspz: {
        function: "getTcQbsignTypeDicByPage",
        page: 1,
        limit: 10
      },
      //拟稿部门树
      bank_main: {
        function: "selUnitTreeByHQ",
        flag: true,
        showMyDept:true
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
        fileHead: "",
         wordNo: "",
         draftDept: "",
         template: "",
         fontLimit: "",
        
      },
      //强制性要求
       rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        fileHead: [
          { required: true, message: "请输入文件字头", trigger: "blur" }
        ],
      wordNo: [
          { required: true, message: "请输入字号种类", trigger: "blur" }
        ],
      draftDept: [
          { required: true, message: "请输入拟稿部门", trigger: "blur" }
        ]
       },
      baowenzd: "A08461305"
    };
  },
  methods: {
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
          names = '';
          ids = '';
          that.checkIds = [];
        }

        switch (dtype) {
          case 'draft':
            this.ruleForm.draftDept = names;
            this.ruleForm.draftDeptId = ids;
            this.draftCheckData = this.checkData;
            break;
          case 'zhu':
            this.ruleForm.ownDepartment = names;
            this.ruleForm.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
        }
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == 'dosend' && this.dialogTypeBack) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //清空处理
    clearCheckData(name){
      //手动清空时处理
        if(!this.ruleForm[name]){
          this.checkIds = [];
          this.checkData = [];
          if(name === 'draftDept'){
            this.ruleForm.draftDeptId = '';
            this.chenCheckData = [];
          }
          if(name === 'ownDepartment'){
            // this.ruleForm.assistDeptId = '';
            this.xieCheckData = [];
          }
          
        }
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case 'draft':
          this.checkIds = this.ruleForm.draftDeptId
            ? this.ruleForm.draftDeptId.split(';')
            : [];
          this.checkData = this.draftCheckData;
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
    },
     //请求部门树数据
    getTreeData(n) {
      let name = '';
      let that = this;
      this.canTab = false;
      this.singelCheckF = false;
      this.dialogType = 'hui';
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      this.clearCheckData('draftDept');
      this.dialogTit = '拟稿部门';
      this.showCompDialog();
      this.$post
        .postData(
          'selUnitTreeByHQ',
          JSON.stringify(this.bank_main),
          'A08461303'
        )
        .then(res => {
        this.treeData = (res && res.data) || [];
      });
    },
    // 初始化列表及分页
    handleLoadData() {
      this.$post
        .postData(
          "getTcQbsignTypeDicByPage",
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
          "getTcTcQbsignTypeDicById",
          JSON.stringify({ function: "getTcTcQbsignTypeDicById", id: row.id }),
          this.baowenzd
        )
        .then(res => {
          this.ruleForm = Object.assign({}, res.data, {
            function: "saveOrUpdateTcQbsignTypeDic"
          });
          this.dialogVisible = true;
          if (res.data.draftDeptId) {
            this.draftCheckData = this.concatTreeData(
              res.data.draftDeptId,
              res.data.draftDept,
              "draft"
            );
          }else{
            this.draftCheckData = [];
            this.checkIds = [];
          }
        });
    },

    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "saveOrUpdateTcQbsignTypeDic"
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
          "deleteTcQbsignTypeDicEntityListById",
          JSON.stringify({
            function: "deleteTcQbsignTypeDicEntityListById",
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
      this.ruleForm.fileHead = "",
         this.ruleForm.wordNo = "",
         this.ruleForm.draftDept = "",
         this.ruleForm.template = "",
         this.ruleForm.fontLimit = "",
      this.dialogVisible = true;
    },
    // 点击保存
    handleSave() {
       if(!this.scrollIntoForm()){
        //表单校验不通过
        return;
      };
      this.ruleForm.function = "saveOrUpdateTcQbsignTypeDic";
      this.$post
        .postData(
          "saveOrUpdateTcQbsignTypeDic",
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
        !this.ruleForm.fileHead ||
        !this.ruleForm.wordNo ||
         !this.ruleForm.draftDept ||
        !this.ruleForm.orgName
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