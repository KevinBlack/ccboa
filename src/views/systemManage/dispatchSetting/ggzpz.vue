<template>
  <!-- 公告至配置 -->
  <div>
    <div class="affiche">
      <el-row>
        <el-col :span="12" style="margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleAddData">新增公告至配置</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>
        <el-col :span="24" style="margin-bottom: 10px;">
          <el-select style="width: 200px;" size="small" v-model="optionDepartInitial">
            <el-option
              v-for="item in optionDepart"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-col>
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
        :page-sizes="[10,15,20,25,30]"
      ></m-table>

      <el-dialog :visible.sync="dialogVisible" v-dialogDrag :modal-append-to-body="false" v-if="dialogVisible" :before-close="handleCancel" title="公告至对象">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="机构名称" prop="organizationName" ref="organizationName">
              <el-input  v-model="ruleForm.organizationName" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="类别名称" prop="typeName" ref="typeName">
              <el-input v-model="ruleForm.typeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序"  prop="sort" ref="sort">
              <el-input  v-model="ruleForm.sort"></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="公告至对象" prop="content" ref="content">
              <el-input   v-model="ruleForm.content">
                <el-button slot="append" icon="el-icon-plus" @click="loaddingT('hui')"></el-button>
                <!-- <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button> -->
              </el-input>
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
      :loadingTree="loadingTree"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      ></treeCofig>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import scrollIntoForm from "@/util/scrollValid";
import treeCofig from "components/tree/tree-fawen";

const tableCols = [
  { label: "类别名称", prop: "typeName", align: "center" },
  { label: "公告至对象", prop: "content", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
];

export default {
  name: "Ggzpz",
  components: {
    mTable,
    treeCofig
  },
  data() {
    return {
      loadingTree:true,
      dispatchaffiche: {
        function: "getTcSendNoticeConfigDic"
      },
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 10 //每页条数
      },
      dialogVisibleTree: false,
      treeData: [],
      defaultProps: {
        children: [],
        label: "name",
        isLeaf: "leaf"
      },
      treeForm: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: true
      },
      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      deleteIds: "",
      checkedArr: [],
      optionDepartInitial: "",
      optionDepart: [
        {
          label: "中国建设银行",
          value: "0"
        }
      ],
      unitForm: {
        function: "getOrgInfo"
      },
      ruleForm: {
        function: "addTcSendNoticeConfigDic",
        unitName: "",
        unitId: "",
        content: "",
        contentIds: "",
        createTime: "",
        exclusiveInformation: "",
        id: "",
        maxRows: "",
        organizationName: "",
        organizationId: "",
        sort: "",
        start: "",
        typeName: "",
        updateTime: ""
      },
      //强制性要求
      rules: {
        content: [
          { required: true, message: "请选择公告至对象", trigger: "blur"}
        ],
        typeName: [
          { required: true, message: "请输入类别名称", trigger: "blur"}
        ]
      },
      haveData: true,
      //xiaoM  主抄送false
      bank_mainXiao: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: false
      },
      tableForm: {
        function: "selUserRole",
        unitCode: "111111111"
      },
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      zhuCheckData: [], //主抄送选中数据
      singelCheckF: false, // 单选true 多选为false
      dialogState: false,
      // treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      dialogTypeNow:"",//当前弹窗的标示
      hasRadio: false, //是否有单选,
      nowCheckList:[],
      node_has:[],
      resolve_has:[]
    };
  },
  methods: {
    //表单校验滚动
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
    // 初始化列表及分页
    handleLoadData() {
      this.$post
        .postData(
          "getTcSendNoticeConfigDic",
          JSON.stringify(Object.assign(this.dispatchaffiche, this.pagination)),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res)
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        });
      this.$post
        .postData(
          "getOrgInfo",
          JSON.stringify(this.unitForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.ruleForm.unitName = res.data && res.data.unitName;
          this.ruleForm.organizationName = res.data && res.data.unitName;
          this.ruleForm.organizationId = res.data && res.data.unitId;
        });
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.tableData = [];
      this.handleLoadData();
    },
    //每页条数
    handleSizeChange(val) {
      this.pagination.limit = val;
      this.pagination.page = 1
      this.tableData = [];
      this.handleLoadData();
    },
    cellClick(row, column, cell, event) {
      this.$post
        .postData(
          "getTcSendNoticeConfigDicById",
          JSON.stringify({
            function: "getTcSendNoticeConfigDicById",
            id: row.id
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.ruleForm = Object.assign({}, res.data, {
            function: "addTcSendNoticeConfigDic"
          });
          if (res.data.contentIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.contentIds,
              res.data.content,
              "dosend"
            );
          }
          this.dialogVisible = true;
        });
    },
    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "addTcSendNoticeConfigDic"
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
    handleBatchDelete() {
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
            this.$post
            .postData(
              "deleteTcSendNoticeConfigDic",
              JSON.stringify({
                function: "deleteTcSendNoticeConfigDic",
                id: this.deleteIds
              }),
              this.$businessCode.fawgl
            )
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.handleLoadData();
            });
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
    handleSelect() {},
    handleAddData() {
      this.dialogVisible = true;
      this.$post
        .postData(
          "getOrgInfo",
          JSON.stringify(this.unitForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          
          this.$nextTick(()=>{
           this.$refs['ruleForm'].clearValidate();
           Object.assign(this.ruleForm,this.$options.data().ruleForm);
           this.ruleForm.organizationName = res.data.unitName;
           this.ruleForm.organizationId = res.data.unitId;
          })
          
        });
      
      
    },
    handleSave() {
      //校验必填
      if (!this.scrollIntoForm()) {
        return;
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
      this.ruleForm.function = "addTcSendNoticeConfigDic";
      console.log(this.ruleForm)
      this.$post
        .postData(
          "addTcSendNoticeConfigDic",
          JSON.stringify(this.ruleForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.handleCancel();
        });
    },
    handleCancel() {
      this.ruleForm = {
        function: "addTcSendNoticeConfigDic",
        unitName: "",
        unitId: "",
        content: "",
        contentIds: "",
        createTime: "",
        exclusiveInformation: "",
        id: "",
        maxRows: "",
        organizationName: "",
        organizationId: "",
        sort: "",
        start: "",
        typeName: "",
        updateTime: ""
      }
      this.dialogVisible = false;
      this.checkData = [];
      this.checkIds = [];
      this.zhuCheckData = [];
      this.handleLoadData();
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params) {
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
          names = names.join(";");
          ids = ids.join(";");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        this.ruleForm.content = names;
        this.ruleForm.contentIds = ids;
        this.zhuCheckData = this.checkData;
        this.$forceUpdate();
      }

      this.dialogState = !this.dialogState;
      if (this.dialogState) {
        this.backDialogData();
      }
    },
    //弹窗回显数据
    backDialogData() {
      this.checkIds = this.ruleForm.contentIds
        ? this.ruleForm.contentIds.split(";")
        : [];
      this.checkData = this.zhuCheckData;
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
    loaddingT(n){
      this.dialogTit = "公告至对象";
      this.dialogType = "huis";
      this.dialogTypeNow = "sendTo";
      this.hasRadio = true;
      this.canTab = false;
      this.singelCheckF = false;
      this.showCompDialog();
    }
  },
  created() {
    this.optionDepartInitial = this.optionDepart[0].label;
    this.handleLoadData();
  }
};
</script>

<style>
.scrollbar-dialog {
  height: 300px;
}
/deep/ .el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}
.el-scrollbar {
  height: 100%;
}
</style>