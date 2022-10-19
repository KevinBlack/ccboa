<template>
  <div class="dispatchparameterspage" style="min-height:500px;">
   <el-form label-width="120px" class="mt20">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构名称">
            <select-org-or-dept @select="selectOrg">
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
        <el-button type="primary" size="small" style="margin-left: 50px;" @click="handleLoadData()">查询</el-button>
        <el-button type="primary" size="small" style="float: right;margin-right: 50px;" @click="handleBatchDelete">批量删除</el-button>
        <el-button type="primary" size="small" v-if="haveData" style="float: right;margin-right: 20px;" @click="handleAddData">新增参数配置方案</el-button>
      </el-row>
    </el-form>
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

    <el-dialog :visible.sync="dialogVisible"
    v-dialogDrag
    :modal-append-to-body="false" title="信电函件参数配置"
    @closed="reset('ruleForm')">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo_ruleForm"
      >
       <div style="height:500px;">
          <el-scrollbar style="height:100%;">
        <el-row>

          <el-col>
            <h3 class="titleGroup">文件要素配置</h3>
          </el-col>
          <el-col>
            <el-form-item label="机构名称" prop="orgName" >
                    <el-input v-model="ruleForm.orgName" readonly="readonly"></el-input>
                    <!--<el-select
                      v-model="orgType"
                      placeholder="请选择"
                      style="width:100%"
                      @change="selectType"
                    >
                      <el-option
                        v-for="sendTypeitem in SsendType"
                        :key="sendTypeitem.label"
                        :label="sendTypeitem.label"
                        :value="sendTypeitem.label"
                      ></el-option>
                    </el-select>-->
                  </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="来件渠道" prop="xdFromMode">
              <el-input v-model="ruleForm.xdFromMode"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="收件类型" prop="xdType">
              <el-input v-model="ruleForm.xdType"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="缓急" prop="xdHlevel">
              <el-input v-model="ruleForm.xdHlevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="密级" prop="xdSlevel">
              <el-input v-model="ruleForm.xdSlevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="来件单位" prop="xdFromDept">
              <el-input v-model="ruleForm.xdFromDept"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-form-item label="承办部门" prop="receiverPersonCn">
              <el-input v-model="ruleForm.receiverPersonCn"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col>
            <el-form-item label="是否启用信电函件扫描集成" prop="xdScan" ref="xdScan">
              <el-radio v-model="ruleForm.xdScan" :label="1" class="alternative">是</el-radio>
              <el-radio v-model="ruleForm.xdScan" :label="0" class="alternative">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col>
                  <el-form-item label="备    注">
                    <el-input v-model="ruleForm.remarks" type="textarea" placeholder="填写备注"></el-input>
                    <el-button slot="append" icon="el-icon-plus"></el-button>
                  </el-form-item>
                </el-col>
                <el-col>
            <h3 class="titleGroup">承办部门过滤配置表</h3>
          </el-col>
          <el-col>
            <el-col>
                <el-form-item label="对应部门">
                  <el-input
                    v-model="ruleForm.deptName"
                    placeholder="请选择对应部门"
                    style="width: 100%;"
                  >
                    <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item label="对应部门" style="display:none;">
                  <el-input v-model="ruleForm.deptId"  placeholder="请选择对应部门" style="width: 100%;"></el-input>
                </el-form-item>
              </el-col>
          </el-col>
          <el-col>
            <h3 class="titleGroup">国办部门编码配置</h3>
          </el-col>

          <el-col>
            <el-form-item label="国办部门编码配置">
              <el-input v-model="ruleForm.xdDeptCode" type="textarea" placeholder="填写备注"></el-input>
              <el-button slot="append" icon="el-icon-plus"></el-button>
            </el-form-item>
          </el-col>
          <el-col>
            <h3 class="titleGroup">邮政编码配置</h3>
          </el-col>
          <el-col>
              <el-form-item label="国办部门编码配置">
                <el-input v-model="ruleForm.xdAddressCode" type="textarea" placeholder="填写备注"></el-input>
                <el-button slot="append" icon="el-icon-plus"></el-button>
              </el-form-item>
            </el-col>

        </el-row>
      </el-scrollbar>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSaveQX">取 消</el-button>
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
      ></treeCofig>

  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from "components/tree/tree-fawen";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const tableCol = [
  { label: "机构名称", prop: "orgName", align: "center" },
  { label: "来件渠道", prop: "xdFromMode", align: "center" },
  { label: "收件类型", prop: "xdType", align: "center" },
  { label: "缓急", prop: "xdHlevel", align: "center" },
  { label: "密级", prop: "xdSlevel", align: "center" },
  { label: "承办部门", prop: "deptName", align: "center" }
];

export default {
  name: 'Fwcspz',
  components: { mTable, treeCofig,selectOrgOrDept},
  data () {
    return {
       searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
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
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount:0
      },
      referForm: {
        function: 'selectXDHJyPage',
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount:0,
        unitId: this.unitId,
        manager:'1',
      },
       //主送、抄送
      bank_main: {
        function: "getTcPriDeliveryDic",
        organizationId: "root"
      },
      ruleForm: {
        orgName:"",
        xdFromMode:"",
        xdType:"",
        xdHlevel:"",
        xdSlevel:"",
        xdFromDept:"",
        unitId: this.unitId,
        manager:'1',
      },
      // 强制性要求
      rules: {
        xdFromMode: [
          { required: true, message: '请输入来件渠道', trigger: 'blur' }
        ],
        xdType: [
          { required: true, message: '请输入收件类型', trigger: 'blur' }
        ],
        xdHlevel: [
          { required: true, message: '请输入缓急', trigger: 'blur' }
        ],
        xdSlevel: [
          { required: true, message: '请输入密级', trigger: 'blur' }
        ],
        xdFromDept: [
          { required: true, message: '请输入来件单位', trigger: 'blur' }
        ],
      },
      haveData: true
    }
  },
  methods: {
           // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
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
    selectType(){},
    handleSaveQX(){
      this.dialogVisible = false;
      this.handleLoadData();
    },
    reset(formName){
        this.ruleForm = {
          orgName:"",
          xdFromMode:"",
          xdType:"",
          xdHlevel:"",
          xdSlevel:"",
          xdFromDept:"",
          unitId: "",
        };
        this.$refs[formName].clearValidate();
        this.$refs[formName].resetFields();
    },
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
          name = "承办";
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
          "getForwordOrgDept",
          JSON.stringify({
            function: "unitTreeAll", 
            openSubDept: true,
            unitId: this.unitId,
            manager:'1',
          }),
          this.$businessCode.swglgg
        )
        .then(res => {
          this.treeData = (res && res.data) || [];
        });
      // this.$post
      //   .postData(
      //     "getTcPriDeliveryDic",
      //     JSON.stringify(this.bank_main),
      //     this.$businessCode.swgl
      //   )
      //   .then(res => {
      //     if(res.message == "Loading"){
      //         this.loadingTree = true;
      //       }else{
      //         this.loadingTree = false;
      //       }
      //     this.treeData = (res && res.data) || [];
      //     // if (this.treeData.length) {
      //     //   this.treeData.forEach(item => {
      //     //     item.content = JSON.parse(item.content);
      //     //     if (n === "hui") {
      //     //       item.text = item.typeName;
      //     //     }
      //     //   });
      //     // }
      //   });
    },
    handleLoadData () {
      this.referForm.unitName = this.unitName
      this.referForm.unitId = this.unitId

      this.$post
        .postData('selectXDHJyPage', JSON.stringify(this.referForm), this.$businessCode.swgl)
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
      this.ruleForm.unitId =this.unitId
      this.ruleForm.orgName = this.unitName;
      this.dialogVisible = true
      // this.ruleForm.orgName = JSON.parse(localStorage.getItem('userInfo')).shortUnitName;
    },
    handleSave () {
      if(this.ruleForm.xdFromMode == ""){
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请输入来件渠道",
            duration: 1000
          });
          return
      }
      if(this.ruleForm.xdType == ""){
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请输入收件类型",
            duration: 1000
          });
          return
      }
      if(this.ruleForm.xdHlevel == ""){
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请输入缓急",
            duration: 1000
          });
          return
      }
      if(this.ruleForm.xdSlevel == ""){
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请输入密级",
            duration: 1000
          });
          return
      }
      if(this.ruleForm.xdFromDept == ""){
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请输入来件单位",
            duration: 1000
          });
          return
      }
      this.ruleForm = Object.assign(this.ruleForm, {
        function: 'saveOrUpdateXDHJ'
      })
        this.ruleForm.unitId =this.unitId
        let obj = Object.assign(this.ruleForm,{
          unitId: this.unitId,
          manager:'1',
        })
      this.$post
        .postData('saveOrUpdateXDHJ', JSON.stringify(obj),this.$businessCode.swgl)
        .then(res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.dialogVisible = false
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

      this.$post.postData('deleteXDHJById', JSON.stringify({ function: 'deleteXDHJById', id: this.deleteIds }),this.$businessCode.swgl).then((res) => {
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
            this.ruleForm.deptName = names;
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
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.handleLoadData();
    })

    // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId

    // this.ruleForm.orgName = JSON.parse(localStorage.getItem("userInfo")).unitName
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
.mt20 {
  padding: 20px;
}
</style>
