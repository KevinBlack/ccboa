<template>
  <div class="dispatchparameterspage">
    <el-row>
      <el-col :span="12" style="margin-bottom: 10px;">
        <el-button type="primary" size="small" @click="handleAddData">新增字号维护配置</el-button>
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
      @select="handleSelectionChange"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
      v-loading="tableLoading"
      :default-sort="sortDate"
    ></m-table>

    <el-dialog 
    v-dialogDrag
    :visible.sync="dialogVisible" :modal-append-to-body="false" title="流水号配置">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo_ruleForm"
      >
       <div style="height:500px;">
          <el-scrollbar style="height:100%;">
        <el-row>
         
          <el-col>
            <h3 class="titleGroup">流水号配置</h3>
          </el-col>
        <el-col>
            <el-form-item label="机构名称">
                <el-input
                v-model="ruleForm.orgName"
                placeholder="请选择机构名称"
                style="width: 100%;" 
                >
                <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button>
                </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="代字" prop="xdFromDept">
              <el-input v-model="ruleForm.xdFromDept"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="文号生成类型" prop="xdScan" ref="xdScan">
              <el-radio v-model="ruleForm.xdScan" :label="1" class="alternative">自动生成</el-radio>
              <el-radio v-model="ruleForm.xdScan" :label="0" class="alternative">手动生成</el-radio>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="年度" prop="xdType">
              <el-input v-model="ruleForm.xdType"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="起始文号" prop="xdHlevel">
              <el-input v-model="ruleForm.xdHlevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="当前最大文号" prop="xdSlevel">
              <el-input v-model="ruleForm.xdSlevel"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
      </el-scrollbar>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  <treeCofig
        :treeData="treeData"
        :canTab="canTab"
        :hasRadio="hasRadio"
        :dialogType="dialogType"
        :dialogTit="dialogTit"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        :offenUse="offenUse"
        :seletOptionsData="seletOptionsData"
        @showCompDialog="showCompDialog"
        :treeTradeCode="treeTradeCode"
      ></treeCofig>

  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from "components/tree/tree-fawen";
const tableCol = [
  { label: "机构名称", prop: "orgName", align: "center" },
  { label: "字号文种", prop: "xdFromMode", align: "center" },
  { label: "年度", prop: "xdHlevel", align: "center" },
  { label: "起始文号", prop: "xdSlevel", align: "center" },
  { label: "当前最大文号", prop: "xdSlevel", align: "center" },
];

export default {
  name: 'Fwcspz',
  components: { mTable, treeCofig},
  data () {
    return {
      treeTradeCode:"",
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      isStandardFile:"",
      checkIds: [], //列表
      orgType:'',
      checkData: [], //选中数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      benCheckData: [], //本行选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      baoWenZiDuan: "A08461302",
      appendWriteDialog: true,
      dspcPrmShow: false,
      tableData: [],
      tableCols: tableCol,
      deleteIds: '',
      tableLoading: false,
      sortDate: [{ prot: "date", order: "descnding" }],
      pagination: {
        pagNum: 1,
        total: 10,
        pageSize:10
      },
      referForm: {
        function: 'selectXDHJyPage',
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount:0
      },
       //主送、抄送
      bank_main: {
        function: "getTcPriDeliveryDic",
        organizationId: "root"
      },
      ruleForm: {
        orgName:""
      },
      // 强制性要求
      rules: {
       
      },
      haveData: true
    }
  },
  methods: {
    selectType(){},
    bankmain(n) {
      let name = "";
      if(!this.ruleForm.signDepartment){
        this.checkIds = [];
        this.huiCheckData = [];
      }
      switch (n) {
        case "zhusong":
          name = "主送";
          break;
        case "chao":
          name = "抄送";
          break;
        case "hui":
          name = "会签";
          break;
        case "ben":
          name = "本行发送";
          break;
        case "dosend":
          name = "完成并发送";
          break;
        case "other":
          name = "";
          break
      }
      this.dialogTit = name;
      this.canTab = true;
      this.treeData = [];
      this.dialogType = n;
      if (n === "hui") {
        this.hasRadio = false;
        this.canTab = false;
        this.singelCheckF = false;
      }
      this.showCompDialog();
      this.$post
        .postData(
          "getTcPriDeliveryDic",
          JSON.stringify(this.bank_main),
          this.baoWenZiDuan
        )
        .then(res => {
          console.log(JSON.stringify(res.data));
          this.treeData = (res && res.data) || [];
          if (this.treeData.length) {
            this.treeData.forEach(item => {
              item.content = JSON.parse(item.content);
              if (n === "hui") {
                item.text = item.typeName;
              }
            });
          }
        });
    },
    handleLoadData () {
  
      this.$post
        .postData('selectXDHJyPage', JSON.stringify(this.referForm), 'A08461306')
        .then(res => {
          this.tableData = res.data.rows;
          if (this.tableData.length >=1) {
            this.haveData = false
          } else {
            this.haveData = true
          }
          this.pagination.total = res.data.total;
        })
    },
    handleOnSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange(val){
      this.pagination.pageNum = val;
    },
    handleAddData () {
      this.dialogVisible = true
    },
    handleSave () {
      this.ruleForm = Object.assign(this.ruleForm, {
        function: 'saveOrUpdateXDHJ'
      })
      this.$post
        .postData('saveOrUpdateXDHJ', JSON.stringify(this.ruleForm), 'A08461306')
        .then(res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.dialogVisible = false
          for (const key in this.ruleForm) {
            delete this.ruleForm[key]
          }
          this.handleLoadData()
        })
    },
    cellClick(row, column, cell, event) {
      this.dialogVisible = true
      this.ruleForm = row
      this.ruleForm = Object.assign(this.ruleForm, {
        function: 'saveOrUpdateXDHJ'
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
      if (this.deleteIds === "") {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据!'
        })
        return;
      }

      this.$post.postData('deleteXDHJById', JSON.stringify({ function: 'deleteXDHJById', id: this.deleteIds }), 'A08461306').then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handleLoadData()
      })
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params) {
      let judge = true;
      let that = this;
      if (this.dialogType === "dosend") {
        judge = this.saveCheck();
      }
      if (!judge) {
        return;
      }
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
          names = names.join(",");
          ids = ids.join(",");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (type) {
          // case "zhusong":
          //   this.fromdata.main = names;
          //   this.fromdata.mainIds = ids;
          //   this.zhuCheckData = this.checkData;
          //   break;
          // case "chao":
          //   this.fromdata.copy = names;
          //   this.fromdata.copyIds = ids;
          //   this.chaoCheckData = this.checkData;
          //   break;
          case "hui":
            this.ruleForm.orgName = names;
            this.ruleForm.deptId = ids;
            this.huiCheckData = this.checkData;
            break;
          // case "ben":
          //   this.fromdata.inline = names;
          //   this.fromdata.inlineIds = ids;
          //   this.benCheckData = this.checkData;
          //   break;
          // case "dosend":
          //   this.bank_doSend.nextUserName = names;
          //   this.bank_doSend.nextUserId = ids;
          //   this.bank_doSend.nextNodeId = params.id;
          //   this.bank_doSend.nextNodeName = params.name;
          //   break;
        }
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend") {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      if (this.dialogState) {
        this.backDialogData(this.dialogType);
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "zhusong":
          this.checkIds = this.fromdata.mainIds
            ? this.fromdata.mainIds.split(",")
            : [];
          this.checkData = this.zhuCheckData;
          break;
        case "hui":
          this.checkIds = this.ruleForm.deptId
            ? this.ruleForm.deptId.split(",")
            : [];
          this.checkData = this.huiCheckData;
          break;
        case "ben":
          this.checkIds = this.fromdata.inlineIds
            ? this.fromdata.inlineIds.split(",")
            : [];
          this.checkData = this.benCheckData;
          break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
  },
  created () {
    this.treeTradeCode = this.$businessCode.zxdbgg;  //人员树交易线
    this.handleLoadData()
  }
}
</script>

<style lang="less" scoped>
.titleGroup {
  color: #409EFF;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
}
</style>
