<template>
  <div class="mainProcessControl">
    <div :style="{ marginBottom: '12px' }">
      <el-row>
        <el-col :span="5">
          <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly
              placeholder="请选择机构"
              v-model="searchData.orgName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
        <el-col :span="5">
          <el-select
            :style="{ width: '100%', marginLeft: '10px' }"
            v-model="searchData.multiTenancyId"
            placeholder="请选择业务分类"
          >
            <el-option
              v-for="(item, index) in searchClassiOpt"
              :key="index"
              :label="item.appCat"
              :value="item.appCatShortName"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div :style="{ marginBottom: '6px' }">
      <el-button @click="sendTemp" type="primary" v-if="mainProcessTemp">模板发送</el-button>
      <el-button @click="newProcess" type="primary" v-if="mainProcessTemp">新建流程</el-button>
      <el-button @click="add" type="primary" v-if="addButton">新增</el-button>
      <el-button @click="delItem" type="danger">删除</el-button>
    </div>
    <m-table
      @cellClick="cellClick"
      @refresh="loadData()"
      @select="select"
      size="medium"
      :sortable="false"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
    <!-- 新建流程 -->
    <el-dialog title="选择流程模板" :visible.sync="flowTempVisable">
      <el-form
        v-model="flowTempForm"
        :rules="flowTempFormRules"
        label-position="right"
        label-width="110px"
      >
        <el-form-item label="模板机构级别" prop="templateOrgGrade">
          <select-org-or-dept @select="tempOrgChange" :style="{ width: '100%' }">
            <el-input
              type="text"
              readonly
              v-model="flowTempForm.templateOrgGrade"
              :style="{ width: '100%' }"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-form-item>
        <el-form-item label="模板业务分类" prop="pTplNo">
          <el-select
            v-model="flowTempForm.pTplNo"
            :style="{ width: '100%' }"
            @change="tempClassifyChange"
          >
            <el-option
              v-for="item in searchClassiOpt"
              :key="item.appCatShortName"
              :label="item.appCat"
              :value="item.appCatShortName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称" prop="pcTplNo">
          <el-select v-model="flowTempForm.pcTplNo" :style="{ width: '100%' }">
            <el-option
              v-for="item in tempName"
              :key="item.pTplNo"
              :label="item.pTplNm"
              :value="item.pTplNo"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流程适用机构" class="flexSetting" prop="txnIttChnlCgyCode">
          <el-input v-model="flowTempForm.txnIttChnlCgyCode" readonly></el-input>
          <el-button type="primary" :style="{ marginLeft: '10px' }" @click="selOrg(1)">选择</el-button>
          <el-button @click="delOrg">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="flowTempVisable = false">取消</el-button>
        <el-button type="primary" @click="sureFlowTemp">确定</el-button>
      </div>
    </el-dialog>
    <org-tree
      v-model="showOrgTree"
      title="请选择机构"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    <!-- 模板发送 -->
    <el-dialog title="模板跨行发送" :visible.sync="sendTempVisible">
      <el-form
        ref="sendTempForm"
        :model="sendTempForm"
        :rules="sendTempFormRules"
        label-width="110px"
      >
        <el-form-item label="选择模板名称" class="flexSetting" prop="tplNoListName">
          <el-input readonly v-model="sendTempForm.tplNoListName"></el-input>
          <el-button type="primary" :style="{ marginLeft: '10px' }" @click="selTempName">选择</el-button>
        </el-form-item>
        <el-form-item label="发送机构" class="flexSetting" prop="txnIttChnlCgyCodeArrName">
          <el-input readonly v-model="sendTempForm.txnIttChnlCgyCodeArrName"></el-input>
          <el-button type="primary" :style="{ marginLeft: '10px' }" @click="selOrg(0)">选择</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="sendTempVisible = false">取消</el-button>
        <el-button type="primary" @click="sureSendTemp">确定</el-button>
      </div>
    </el-dialog>
    <!-- 选择模板名称 -->
    <el-dialog title="选择模板名称" :visible.sync="tempNameVisible">
      <el-form :model="tempNameForm" label-width="100px">
        <el-form-item label="模板机构级别">
          <select-org-or-dept @select="tempOrgGradeChange">
            <el-input
              type="text"
              readonly
              v-model="tempNameForm.tempOrgGrade"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="tempNameSelectedData"
          :titles="['待选择模板', '已选择模板']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }"
          @change="handleChange"
          :data="tempNameData"
          :props="{
            key: 'pTplNm',
            label: 'pTplNm',
            value: 'pTplNo',
          }"
        >
          <span slot-scope="{ option }">{{ option.pTplNm }}</span>
        </el-transfer>
      </div>
      <div slot="footer">
        <el-button @click="tempNameVisible = false">取消</el-button>
        <el-button type="primary" @click="sureTempName">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import orgTree from "components/tree/orgTree";
export default {
  name: "mainProcessControl",
  components: {
    mTable,
    orgTree,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      //主、子流程参数
      wfFcnId: "",
      //是否是主流程模板
      mainProcessTemp: false,
      // 是否有新增按钮
      addButton: false,
      searchData: {
        groupId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        multiTenancyId: "",
      },
      //机构下拉框
      searchOrgOptions: [],
      //业务分类下拉框
      searchClassiOpt: [],
      tableData: [],
      tableCols: [
        { label: "流程名称", prop: "pTplNm" },
        { label: "起始环节", prop: "startNodeNm" },
        { label: "所有环节", prop: "allNodeNm" },
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
      //删除传的参数
      selectedRow: [],
      /**
       * 从模板更新流程弹框
       */
      flowTempVisable: false,
      flowTempForm: {
        templateOrgGrade: "",
        pTplNo: "",
        pcTplNo: "",
        txnIttChnlCgyCode: "",
      },
      //选择机构弹出框
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      tempName: [],
      flowTempFormRules: {
        templateOrgGrade: {
          required: true,
          message: "请选择模板机构级别",
          trigger: "input",
        },
        pTplNo: {
          required: true,
          message: "请选择模板业务分类",
          trigger: "input",
        },
        pcTplNo: {
          required: true,
          message: "请选择模板名称",
          trigger: "input",
        },
        txnIttChnlCgyCode: {
          required: true,
          message: "请选择流程适用机构",
          trigger: "input",
        },
      },
      /**
       * 模板发送
       */
      sendTempVisible: false,
      sendTempForm: {
        tplNOList: [],
        txnIttChnlCgyCodeArr: [],
        tplNoListName: "",
        txnIttChnlCgyCodeArrName: "",
      },
      sendTempFormRules: {
        tplNoListName: { required: true, message: "请选择模板名称" },
        txnIttChnlCgyCodeArrName: { required: true, message: "请选择发送机构" },
      },
      //选择模板名称
      tempNameVisible: false,
      //模板机构级别
      tempNameForm: { tempOrgGrade: "" },
      //待选数据
      tempNameData: [],
      //已选数据
      tempNameSelectedData: [],
      //主子流程与流程模板传参变化
      tplVldStcd: "07",
    };
  },
  computed: {},
  watch: {
    $route: {
      handler(route) {
        console.log("watch-$route", 33333333333, route);
        if (route.fullPath === "/setting/processControl/mainProcessControl") {
          this.tplVldStcd = "07";
          this.wfFcnId = "01";
          this.addButton = true;
        } else if (
          route.fullPath === "/setting/processControl/childProcessControl"
        ) {
          this.tplVldStcd = "07";
          this.wfFcnId = "02";
          this.addButton = true;
        } else if (
          route.fullPath ===
          "/setting/processControll/processTemp/mainProcessTemp"
        ) {
          this.tplVldStcd = "01";
          this.wfFcnId = "01";
          this.mainProcessTemp = true;
          this.addButton = false;
        } else if (
          route.fullPath ===
          "/setting/processControll/processTemp/childProcessTemp"
        ) {
          this.tplVldStcd = "01";
          this.wfFcnId = "02";
          this.mainProcessTemp = false;
          this.addButton = false;
        }
      },
      immediate: true,
    },
    "searchData.orgName": {
      handler(val) {
        console.log("watch-searchData.orgName", 1111111111);
        this.$api.setting.workFlow
          .getBusiness({
            groupId: this.searchData.groupId,
            tplVldStcd: this.tplVldStcd,
          })
          .then((res) => {
            this.searchClassiOpt = res.data;
            this.$set(
              this.searchData,
              "multiTenancyId",
              this.searchClassiOpt[0].appCatShortName
            );
          });
      },
      immediate: true,
    },
    "searchData.multiTenancyId"(val) {
      console.log("watch-searchData.multiTenancyId", 2222222);
      if (this.searchData.multiTenancyId) {
        this.loadData();
      }
    },
  },
  methods: {
    /**
     * 流程模板(主流程)
     */

    /**
     * 模板发送
     */

    sendTemp() {
      this.sendTempVisible = true;
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    //选择模板名称
    selTempName() {
      this.tempNameVisible = true;
    },
    tempOrgGradeChange(org) {
      this.$set(this.tempNameForm, "tempOrgGrade", org.unitName);
      this.$set(this.tempNameForm, "tempOrgGradeId", org.id);
      let params = {
        tplVldStcd: "01",
        wfFcnId: "01",
        groupId: this.tempNameForm.tempOrgGradeId,
      };
      this.$api.setting.workFlow.getTipList(params).then((res) => {
        this.tempNameData = res.data;
      });
    },
    //模板名称确定
    sureTempName() {
      this.sendTempForm.tplNoListName = JSON.parse(
        JSON.stringify(this.tempNameSelectedData)
      ).join(",");
      this.sendTempForm.tplNOList = [];
      this.tempNameSelectedData.map((item) => {
        let a = this.tempNameData.find((val) => val.pTplNm === item);
        this.sendTempForm.tplNOList.push(a.pTplNo);
      });
      this.tempNameVisible = false;
    },
    sureSendTemp() {
      if (
        this.sendTempForm.tplNoListName === "" ||
        this.sendTempForm.txnIttChnlCgyCodeArrName === ""
      ) {
        this.$message({
          type: "warning",
          message: "请选择必选项",
        });
      } else {
        this.sendTempForm.type = "4";
        this.$api.setting.workFlow
          .updateTemplate({ ...this.sendTempForm })
          .then((res) => {
            this.$message({
              type: "success",
              message: "模板发送成功！",
            });
            this.sendTempVisible = false;
          });
      }
    },

    /**
     * 新建流程
     */

    newProcess() {
      this.flowTempVisable = true;
    },

    //加载模板名称
    loadTempName() {
      let params = {
        tplVldStcd: "01",
        wfFcnId: "01",
        multiTenancyId: this.flowTempForm.pTplNo,
        groupId: this.flowTempForm.txnIttChnlCgyCode1,
      };
      this.$api.setting.workFlow.getTipList(params).then((res) => {
        this.tempName = res.data;
      });
    },
    //模板机构级别select事件
    tempOrgChange(org) {
      this.$set(this.flowTempForm, "txnIttChnlCgyCode1", org.id);
      this.$set(this.flowTempForm, "templateOrgGrade", org.unitName);
      if (this.flowTempForm.pTplNo) {
        this.loadTempName();
      }
    },
    //模板业务分类change事件
    tempClassifyChange() {
      if (this.flowTempForm.txnIttChnlCgyCode1) {
        this.loadTempName();
      }
    },
    //选择机构弹出框
    selOrg(stype) {
      this.showOrgTree = true;
      this.sendTempForm.stype = stype;
      if (stype === 0) {
        this.isSingle = false;
      } else {
        this.isSingle = true;
      }
    },
    delOrg() {
      this.$set(this.flowTempForm, "txnIttChnlCgyCode", "");
      this.$set(this.flowTempForm, "id", "");
    },
    getOrgList(org) {
      console.log("org", org);
      if (this.sendTempForm.stype === 0) {
        let nameArr = [];
        org.map((item) => {
          nameArr.push(item.unitName);
          this.sendTempForm.txnIttChnlCgyCodeArr.push(item.id);
        });
        this.sendTempForm.txnIttChnlCgyCodeArrName = nameArr.join(",");
      } else {
        this.$set(this.flowTempForm, "txnIttChnlCgyCode", org.unitName);
        this.flowTempForm.id = org.id;
      }
    },
    sureFlowTemp() {
      if (
        this.flowTempForm.templateOrgGrade === "" ||
        this.flowTempForm.pTplNo === "" ||
        this.flowTempForm.pcTplNo === "" ||
        this.flowTempForm.txnIttChnlCgyCode === ""
      ) {
        this.$message({
          type: "warning",
          message: "请选择必选项",
        });
      } else {
        let params = {
          txnIttChnlCgyCode: this.flowTempForm.id,
          pcTplNo: this.flowTempForm.pcTplNo,
          type: "3",
          multiTenancyId: this.flowTempForm.pTplNo,
        };
        this.$api.setting.workFlow.updateTemplate({ ...params }).then((res) => {
          this.$message({
            type: "success",
            message: "已成功新建流程！",
          });
          this.flowTempVisable = false;
        });
      }
    },
    //请求机构下拉框
    // getOrganization () {
    //   let st = localStorage.getItem('st')
    //   this.$api.setting.workFlow.getOrganization({ st, openCur: true }).then(res => {
    //     this.searchOrgOptions = JSON.parse(JSON.stringify(res.data))
    //     this.$set(this.searchData, 'groupId', this.searchOrgOptions[0].id)
    //     this.$api.setting.workFlow.getBusiness({
    //       groupId: this.searchData.groupId,
    //       tplVldStcd: this.tplVldStcd
    //     }).then(res => {
    //       this.searchClassiOpt = res.data
    //       this.$set(this.searchData, 'multiTenancyId', this.searchClassiOpt[0].appCatShortName)
    //     })
    //   })
    // },
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.groupId = org.id;
      this.searchData.multiTenancyId = "";
      // this.$api.setting.workFlow
      //   .getBusiness({
      //     groupId: this.searchData.groupId,
      //     tplVldStcd: this.tplVldStcd,
      //   })
      //   .then((res) => {
      //     this.searchClassiOpt = res.data;
      //   });
    },
    //选择不同机构加载不同业务分类
    // orgChange () {
    //   this.$set(this.searchData, 'multiTenancyId', '')
    //   this.$api.setting.workFlow.getBusiness({
    //     groupId: this.searchData.groupId,
    //     tplVldStcd: this.tplVldStcd
    //   }).then(res => {
    //     this.searchClassiOpt = res.data
    //   })
    // },
    loadData() {
      let params = {
        tplVldStcd: this.tplVldStcd,
        wfFcnId: this.wfFcnId,
      };
      this.$api.setting.workFlow
        .getTipList(Object.assign(params, this.searchData), {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.total;
          this.tableData = JSON.parse(JSON.stringify(res.data));
        });
    },
    add() {
      this.$intent.go(this, {
        path: "/setting/processControl/addOrEditProcess",
        query: { type: "0" },
      });
    },
    //删除
    delItem() {
      if (Object.keys(this.selectedRow).length === 0) {
        this.$message({
          type: "warning",
          message: "请选择至少一条数据",
        });
        return;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$api.setting.workFlow
            .delTipList({
              tplIds: this.selectedRow,
              multiTenancyId: this.searchData.multiTenancyId,
              groupId: this.searchData.groupId,
            })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功！",
              });
              this.loadData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    cellClick(row) {
      let tplBsnId = row.tplBsnId;
      let pTplNo = row.pTplNo;
      let multiTenancyId = row.multiTenancyId;
      let isMainPross =
        this.$route.fullPath === "/setting/processControl/mainProcessControl"
          ? "1"
          : "0";
      let isChild =
        this.$route.fullPath ===
        ("/setting/processControl/childProcessControl" ||
          "/setting/processControll/processTemp/childProcessTemp")
          ? "1"
          : "0";
      this.$intent.go(this, {
        path: "/setting/processControl/addOrEditProcess",
        query: {
          pTplNo,
          multiTenancyId,
          tplBsnId,
          type: "1",
          isMainPross,
          isChild,
          groupId: row.groupId,
        },
      });
    },
    select(row) {
      this.selectedRow = [];
      row.map((item) => {
        this.selectedRow.push(item.pTplNo);
      });
    },
  },
  activated() {},
  mounted() {},
  created() {
    //加载机构下拉框
    // this.getOrganization();
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.mainProcessControl {
  min-height: 90vh;
  .flexSetting .el-form-item__content {
    display: flex;
  }
  .el-transfer {
    width: 100%;
  }
  .el-transfer .el-transfer-panel {
    width: 37% !important;
  }
}
</style>
