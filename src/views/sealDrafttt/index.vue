<template>
  <div class="draft">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="全部" name="all">
        <div class="searchSession">
          <el-select v-model="markOrderType">
            <el-option
              v-for="item in markOrderTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" :style="{marginLeft:'10px'}" @click="search">搜索</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待办" name="toDo">
        <div class="btn-choose">
          <el-button
            v-for="item in buttonList"
            @click="buttonClick(item)"
            :key="item"
            type="primary"
          >{{item}}</el-button>
          <!-- <span class="sysTirp">系统试运行期间，新系统只支持本行内业务流转，跨行业务请到原OA3.6中办理。</span> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="已办" name="finish"></el-tab-pane>
      <el-tab-pane label="办结" name="done"></el-tab-pane>
    </el-tabs>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      size="medium"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :tableRowClassNames="tableRowClassName"
    ></m-table>
    <!-- 选择拟稿部门弹框 -->
    <el-dialog
      title="选择拟稿部门"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      v-dialogDrag
    >
      <el-form ref="deptForm" :model="form" label-width="150px" :rules="deptFormRule">
        <el-form-item label="选择流程" v-if="isDocument==='1'" prop="currentNodeId">
          <el-radio-group v-model="form.currentNodeId" :disabled="this.flowDisable">
            <el-radio label="0">本行公文用印</el-radio>
            <el-radio label="1">集中模式公文用印</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系单位类型" v-if="isDocument==='2'" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="0">系统内</el-radio>
            <el-radio label="1">系统外</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="是否跨行"
          v-if="(flowDisable?false:isDocument==='2'&& form.type==='1')||(isDocument==='3'&& istrue)"
          prop="iseve"
        >
          <el-radio-group v-model="form.iseve">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="流程" prop="liuc" v-if="isDocument==='3'&& form.iseve==='0'">
          <el-select v-model="form.liuc" placeholder="选择流程" :style="{width:'60%'}">
            <el-option v-for="(item,index) in lic" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="draftOrgan">
          <el-select v-model="form.draftOrgan" placeholder="请选择所属部门" :style="{width:'80%'}">
            <el-option
              v-for="(item,index) in draftOrganOption"
              :key="index"
              :label="item.unitNames"
              :value="item.firstUnitId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="departSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "@/components/table/tTable";
export default {
  name: "draft",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      liucyz:'',
      searchData: {},
      orgLevel: "", //判断行级
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      hj: "",
      istrue: false,
      activeTab: "toDo",
      isDocument: "",
      markOrderTypeOptions: [
        {
          value: "3",
          label: "常规用印审批"
        },
        {
          value: "1",
          label: "公文用印登记"
        },
        {
          value: "2",
          label: "介绍信审批"
        },
        {
          value: "4",
          label: "部门用印审批"
        }
      ],
      markOrderType: "1",
      tableData: [],
      buttonList: [
        "起草常规用印审批",
        "起草公文用印登记",
        "起草介绍信审批",
        "起草部门用印审批"
      ],
      tableCols: [
        { label: "申请时间", prop: "draftDate" },
        { label: "编号", prop: "documentNo" },
        { label: "标题", prop: "title" },
        { label: "申请人", prop: "draftUser" }
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 10
      },
      value1: "",
      //选择拟稿部门弹框
      dialogVisible: false,
      form: {
        currentNodeId: "",
        type: "",
        draftOrgan: ""
      },
      // 公文用印选择流程是否禁用
      flowDisable: false,
      // 部门容器
      draftOrganOption: [],
      lic: [
        { type: 1, id: 1, name: "使用上级行印章" },
        { type: 2, id: 2, name: "集中模式用印审批" },
        { type: 3, id: 3, name: "机控模式用印审批" }
      ], //流程下拉数据
      deptFormRule: {
        currentNodeId: [
          { required: true, message: "请选择流程", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择联系单位类型", trigger: "change" }
        ],
        iseve: [
          { required: true, message: "请选择是否跨行", trigger: "change" }
        ],
        draftOrgan: [
          { required: true, message: "请选择部门", trigger: "change" }
        ],
        liuc: [{ required: true, message: "请选择流程", trigger: "change" }]
      }
    };
  },
  computed: {},
  watch: {
    activeTab(val) {
      this.loadData();
    }
  },
  methods: {
    tableRowClassName(row) {
                if (row.readFlag == "0") {
                    return 'warning-row';
                }
            },
    //搜索
    search() {
      this.loadData();
    },
    buttonClick(item) {
      switch (item) {
        case "起草常规用印审批":
          this.isDocument = "3";
          this.dialogVisible = true;
          break;
        case "起草公文用印登记":
          this.isDocument = "1";
          this.dialogVisible = true;
          break;
        case "起草介绍信审批":
          this.isDocument = "2";
          this.dialogVisible = true;
          break;
        case "起草部门用印审批":
          this.isDocument = "4";
          this.dialogVisible = true;
          break;
      }
    },
    //选择拟稿部门弹框确定
    departSure() {
      console.log(this.form, "okokokokokoko");
      // return false
      let draftOrganName = "";
      this.draftOrganOption.map(item => {
        if (item.id === this.form.draftOrgan) {
          draftOrganName = item.name;
        }
      });
      this.$refs.deptForm.validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          if (this.isDocument === "1") {
            this.$intent.goNewPage(this, {
              path: "/sealManage/useSeal/draft/document",
              query: {
                currentNodeId: this.form.currentNodeId,
                draftOrgan: this.form.draftOrgan,
                draftOrganName
              }
            });
          } else if (this.isDocument === "2") {
            this.$intent.goNewPage(this, {
              path: "/sealManage/useSeal/draft/introduction",
              query: {
                iseve: this.form.iseve,
                type: this.form.type,
                draftOrgan: this.form.draftOrgan,
                draftOrganName
              }
            });
          } else if (this.isDocument === "3") {
            console.log(this.form);
            //判断起草常规用印审批
            let multiIdType = "";
            //判断是总行
            if (this.istrue == false) {
              multiIdType = "1";
            }
            //一级分行 跨行为是
            if (this.istrue == true && this.form.iseve == "0") {
              multiIdType = "4";
            }
            //一级分行 跨行为否
            if (this.istrue == true && this.form.iseve == "1") {
              multiIdType = "3";
            }
            //其他级跨行fou
            if (this.hj == "1" && this.form.iseve == "1") {
              multiIdType = "3";
            }
            //其他级跨行是 上级行
            if (
              this.hj == "1" &&
              this.form.iseve == "0" &&
              this.form.liuc == "1"
            ) {
              multiIdType = "4";
            }
            //其他级跨行是 集中
            if (
              this.hj == "1" &&
              this.form.iseve == "0" &&
              this.form.liuc == "2"
            ) {
              multiIdType = "5";
            }
            //其他级跨行是 机控
            if (
              this.hj == "1" &&
              this.form.iseve == "0" &&
              this.form.liuc == "3"
            ) {
              multiIdType = "6";
            }
            // let liucyz = "";
            if (this.form.iseve === "0") {
              console.log('OSOSOSOS')
              this.lic.map(item => {
                if (this.form.liuc == item.id) {
                  this.liucyz = item.name;
                }
              });
            }

            this.$intent.goNewPage(this, {
              path: "/sealManage/useSeal/draft/common",
              query: {
                multiIdType: multiIdType,
                unitid: this.form.draftOrgan,
                orgLevel: this.orgLevel,
                CGYYLC: this.liucyz
              }
            });
          } else if (this.isDocument === "4") {
            this.$intent.goNewPage(this, {
              path: "/sealManage/useSeal/draft/department",
              query: {
                draftOrgan: this.form.draftOrgan,
                draftOrganName
              }
            });
          }
          this.$refs.deptForm.resetFields();
        }
      });
    },
    loadData() {
      this.tableData = [];
      let params = {
        markOrderType: this.activeTab === "all" ? this.markOrderType : "",
        processType:
          this.activeTab === "all"
            ? "3"
            : this.activeTab === "toDo"
            ? "0"
            : this.activeTab === "finish"
            ? "1"
            : this.activeTab === "done"
            ? "2"
            : ""
      };
      this.$api.sealManage
        .getWorkList(
          { ...params, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log(res, "list");
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.draftOrganOption = res.unitList; // 部门信息
          this.form.draftOrgan = res.unitList[0].firstUnitId;

          this.orgLevel = res.unitData.orgLevel; //判断行级
        });
    },
    cellClick(row) {
      console.log(row, this.activeTab, "每一行");
      //markOrderType:1=>公文用印 2=》介绍信用印 3=》常规用印 4=》部门用印
      let path;
      if (
        row.markOrderType === "1" &&
        row.status === "1" &&
        (this.activeTab === "all" || this.activeTab === "toDo")
      ) {
        path = "/sealManage/useSeal/draft/document";
      } else if (
        row.markOrderType === "1" &&
        (this.activeTab === "finish" || this.activeTab === "done")
      ) {
        path = "/sealManage/useSeal/draft/doneDocument";
      } else if (
        row.markOrderType === "1" &&
        (row.status === "2" || row.status === "3") &&
        this.activeTab === "all"
      ) {
        path = "/sealManage/useSeal/draft/doneDocument";
      } else if (
        row.markOrderType === "2" &&
        row.status === "1" &&
        (this.activeTab === "all" || this.activeTab === "toDo")
      ) {
        path = "/sealManage/useSeal/draft/introduction";
      } else if (
        row.markOrderType === "2" &&
        (this.activeTab === "finish" || this.activeTab === "done")
      ) {
        path = "/sealManage/useSeal/draft/doneIntroduction";
      } else if (
        row.markOrderType === "2" &&
        (row.status === "2" || row.status === "3") &&
        this.activeTab === "all"
      ) {
        path = "/sealManage/useSeal/draft/doneIntroduction";
      } else if (row.markOrderType === "3" && this.activeTab === "toDo") {
        path = "/sealManage/useSeal/draft/common";
      } else if (
        row.markOrderType === "4" &&
        row.status === "1" &&
        (this.activeTab === "all" || this.activeTab === "toDo")
      ) {
        // 代办
        path = "/sealManage/useSeal/draft/department";
      } else if (
        row.markOrderType === "4" &&
        (this.activeTab === "finish" || this.activeTab === "done")
      ) {
        // 已办、办结
        path = "/sealManage/useSeal/draft/doneDepartment";
      } else if (
        row.markOrderType === "4" &&
        (row.status === "2" || row.status === "3") &&
        this.activeTab === "all"
      ) {
        // 全部中=》已办 、办结
        path = "/sealManage/useSeal/draft/doneDepartment";
      } else if (
        (this.activeTab === "finish" || this.activeTab === "done") &&
        row.markOrderType === "3"
      ) {
        path = "/sealManage/useSeal/draft/common/dis";
      } else if (
        this.activeTab === "all" &&
        row.status == "1" &&
        row.markOrderType === "3"
      ) {
        path = "/sealManage/useSeal/draft/common";
      } else if (
        row.markOrderType === "3" &&
        this.activeTab === "all" &&
        (row.status == "2" || row.status == "3")
      ) {
        path = "/sealManage/useSeal/draft/common/dis";
      }
      this.$intent.goNewPage(this, {
        path,
        query: {
          id: row.id,
          markOrderType: row.markOrderType,
          ys: this.activeTab,
          orgLevel: this.orgLevel
        }
      });
    },
    // 关闭弹框
    handleClose() {
      this.$refs.deptForm.resetFields();
      this.dialogVisible = false;
    }
  },
  activated() {},
  mounted() {
    // 部门数据
    let Jb = JSON.parse(localStorage.getItem("unitInfo"));
    console.log("当前登录人信息", Jb);
    // 临时注释
    //  this.draftOrganOption = Jb
    //  this.form.draftOrgan = this.draftOrganOption[0].firstUnitId;
    this.$api.sealManage.getorgId({ id: "" }).then(res => {
      console.log(res, "88*******");
      // 判断行级 0 总行 1一级分行 2
      if (res.level == "0") {
        this.istrue = false; //控制是否跨行字段展示
        // 公文总行只允许选本行公文用印
        this.flowDisable = true;
        this.form.currentNodeId = "0";
        this.liucyz = '总行常规用印审批流程'
      } else if (res.level == "1") {
        this.lic = [{ type: 1, id: 1, name: "使用上级行印章" }];
        this.form.liuc = 1;
        this.iseve = false;
        this.istrue = true;
        this.$set(this.form, "iseve", "1"); //默认选中否
        this.liucyz = '分行常规用印审批流程'

      } else {
        this.istrue = true;
        this.hj = "1";
        this.liucyz = '分行常规用印审批流程'
      }
    });
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.draft {
  min-height: 100vh;
  .selectDep {
    padding: 40px 30px 30px 100px;
    .orgInfoTitle {
      margin-bottom: 30px;
      font-size: 30px;
      line-height: 75px;
      color: #3b85f0;
      font-weight: 600;
      text-align: center;
    }
  }
  .btn-choose,
  .searchSession {
    margin-bottom: 10px;
  }
  .sysTirp {
    margin-left: 20px;
    font-size: 12px;
    color: red;
  }
}
</style>