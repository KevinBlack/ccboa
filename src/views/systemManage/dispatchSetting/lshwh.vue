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
          <el-col :span="4" style="padding-left: 10px;margin-bottom: 10px;">
            <el-button type="primary" size="small" @click="handleLoadData('1')">查询</el-button>
          </el-col>
          <el-col :span="6" style="text-align: center;margin-bottom: 10px;">
            <!-- <el-select v-model="valueYear" placeholder="全部" @change="getTablesData">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            <el-form-item>
              <div class="block">
                <el-date-picker
                  v-model="year"
                  type="year"
                  placeholder="选择年"
                  @change="initData('1')"
                ></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right;margin-bottom: 10px;">
            <el-button type="primary" size="small" style="margin-right: 10px;" @click="handleAddData">新增流水号</el-button>
            <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
          </el-col>
        </el-form>
      </el-row>
      <m-table
          size="medium"
          :isSelection="true"
          :isIndex="false"
          :isPagination="true"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @handleSelectionChange="handleSelectionChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          :page-sizes="[10,15,20,25,30]"
        ></m-table>

      <el-dialog :visible.sync="dialogVisible" v-dialogDrag :before-close="handleCancel" :modal-append-to-body="false" title="流水号维护">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :rules="rules"
          label-width="140px"
          class="demo_ruleForm"
        >
        <div class="bank_dispach_annotation">
          <p class="bank_dispach_annotation_current">参数间以英文半角“;”进行分隔</p>
        </div>
        <el-row>
          <el-col>
            <el-form-item label="机构名称" prop="orgNam">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="发文种类" prop="sendType">
              <el-select
                v-model="ruleForm.sendType"
                placeholder="请选择"
                style="width:100%"
                @change="selectType"
              >
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="sendTypeitem in SsendType"
                  :key="sendTypeitem.label"
                  :label="sendTypeitem.label"
                  :value="sendTypeitem.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="文件代字" prop="redHead">
              <el-select
                v-model="ruleForm.redHead"
                placeholder="请选择"
                style="width:100%"
              >
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="redHeaditem in SredHead"
                  :key="redHeaditem.redHead"
                  :label="redHeaditem.redHead"
                  :value="redHeaditem.redHead"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="年度" prop="year">
              <el-input v-model="ruleForm.year"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="起始文号" prop="startNum">
              <el-input v-model.trim="ruleForm.startNum" oninput="value=value.replace(/[^\d\*\ ]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="当前最大文号" prop="currentMaxNum">
              <el-input v-model.trim="ruleForm.currentMaxNum" oninput="value=value.replace(/[^\d\*\ ]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="空缺文号" prop="reservedNum">
              <el-input v-model.trim="ruleForm.reservedNum" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序">
              <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import scrollIntoForm from '@/util/scrollValid';
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFJWH from "@/minixs/dispatchFJWH";

const tableCols = [
  { label: "发文种类", prop: "sendType", align: "center" },
  { label: "文件代字", prop: "redHead", align: "center" },
  { label: "年度", prop: "year", align: "center" },
  { label: "起始文号", prop: "startNum", align: "center" },
  { label: "当前最大文号", prop: "currentMaxNum", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
]

export default {
  name: "lshwh",
  components: {
    mTable,
    // searchForm,
    selectOrgOrDept
  },
  mixins: [dispatchFJWH],
  data() {
    return {
      isGly:false,
      year:new Date(),
      valueYear: '',
      dispatchjgflpz: {
        function: "selectProduceNumberByPage",
        type: "CN000"
      },
      unitForm: {
        function: 'getOrgInfo'
      },
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      // 下拉框列表
      bank_dispachfile: {
        function: "getSendOrderDicByParam",
        unitId: ""
        // unitId: "2ec81dcb-9ed5-443a-a7e7-314ae0537478"
      },
      // 行发文参数
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        unitId: "root",
        sendType: "行发文"
      },
      tableCols: tableCols,
      dialogVisible: false,
      tableData: [],
      deleteIds:'',
      checkedArr: [],
      SsendType: [],
      SredHead: [],
      ruleForm: {
        function: "",
        id: "",
        orgName: '',
        orgId:"",
        sendType: '',
        redHead: "",
        reservedNum: "",
        year: "",
        startNum: "",
        reservedNum: "",
        sort: '',
        currentMaxNum: "",
        type: "CN000",
        unitName: "",
        unitId: ""
      },
      rules: {
        sendType: [
          {
            required: true,
            trigger: "blur",
            message: "请选择发文种类"
          }
        ],
        redHead: [
          {
            required: true,
            trigger: "blur",
            message: "请选择代字"
          }
        ],
        year: [
          {
            required: true,
            trigger: "blur",
            message: "请填写年份"
          }
        ],
        currentMaxNum: [
          {
            required: true,
            trigger: "blur",
            message: "请填写最大文号"
          }
        ]
      }
    };
  },
  methods: {
    // getTablesData(val){
    //   if(val=="0") {
    //     this.dispatchjgflpz = {
    //       function: "selectProduceNumberByPage",
    //       type: "CN000",
    //       year: '0'
    //     }
    //   } else {
    //     this.dispatchjgflpz = {
    //       function: "selectProduceNumberByPage",
    //       type: "CN000",
    //       year: this.valueYear
    //     }
    //   }
    //   this.handleLoadData("2")
    // },
    initData(val) {
      let that = this;
      let day = new Date();
      that.ruleForm.year = that.year && that.year.getFullYear() || ""
      sessionStorage.setItem('FWLIST',JSON.stringify(that.pagination));
      // if(val=="1"||val=="2") {
      //   that.pagination.page = 1;
      // }
      that.$post
        .postData("selectProduceNumberByPage", JSON.stringify(Object.assign({},this.ruleForm, this.dispatchjgflpz, this.pagination)), this.$businessCode.fawgl)
        .then(res => {

          that.tableData = res.data.rows;
          that.pagination.total = res.data.total;
          // if (this.ruleForm.sendType === "行发文") {
          //   this.selectType("行发文");
          // }
        })
      // this.$post.postData('getOrgInfo', JSON.stringify(this.unitForm), this.$businessCode.fawgl).then((res) => {
      //   // this.ruleForm.orgNam = res.data&&res.data.unitName
      //   // this.ruleForm.unitName = res.data&&res.data.unitName
      //   // this.ruleForm.unitId = res.data&&res.data.unitId
      //   this.ruleForm.year = res.data&&res.data.year ? res.data.year : day.getFullYear()
      // })
    },
    // 初始化列表及分页
    handleLoadData(val) {
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId;
      this.bank_redheader.unitId = this.unitId;
      if(val=="1") {
        this.getSendOrderDicByParam().then(successState => {
          this.initData(val);
        })
      } else {
        this.initData(val);
      }
    },
    // 文种
    async getSendOrderDicByParam() {
      var successState = false;
      this.ruleForm.function = "getSendOrderDicByParam"
      await this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.ruleForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.SsendType = JSON.parse(res.data.sendType);
          successState = true;
        });
      return successState;
    },
    // 代字
    selectType(value) {
      if(!value) {
        this.bank_redheader.sendType = this.ruleForm.sendType = "";
      } else {
        this.bank_redheader.sendType = this.ruleForm.sendType = value;
        this.ruleForm.redHead = "";
        this.getTcDocTypeDicByParam();
      }
    },
    getTcDocTypeDicByParam() {
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res.success) {
            this.SredHead = res.data;
            // this.ruleForm.redHead = this.SredHead[0].label;
          } else {
            this.SredHead = []
          }
        });
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
            this.$post.postData('doDeleteListProduceNumberById', JSON.stringify({ function: 'doDeleteListProduceNumberById', id: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
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
      let that = this;
      this.$post
        .postData(
          "selectProduceNumberById",
          JSON.stringify({ function: "selectProduceNumberById", id: row.id, type: "CN000", unitId: this.unitId }),
          this.$businessCode.fawgl
        )
        .then(res => {
          that.ruleForm.sendType = res.data.sendType
          that.ruleForm.id = row.id
          that.ruleForm.orgName = res.data.orgName
          that.ruleForm.redHead = res.data.redHead
          that.ruleForm.year = res.data.year
          that.ruleForm.startNum = res.data.startNum
          that.ruleForm.reservedNum = res.data.reservedNum
          that.ruleForm.currentMaxNum = res.data.currentMaxNum
          that.ruleForm.sort = res.data.sort
          that.dialogVisible = true
          that.ruleForm.unitName = that.unitName;
          that.ruleForm.unitId = that.ruleForm.orgId = that.unitId;
        });
    },
    handleSave() {
      let that = this;
      if (!scrollIntoForm) {
        return;
      }
      if (this.ruleForm.sendType==="") {
        that.$message({
          type: "error",
          message: "请选择发文种类!"
        });
        return;
      }
      if (this.ruleForm.redHead==="") {
        that.$message({
          type: "error",
          message: "请选择代字!"
        });
        return;
      }
      if (this.ruleForm.year==="") {
        that.$message({
          type: "error",
          message: "请填写年份!"
        });
        return;
      }
      if (this.ruleForm.currentMaxNum==="") {
        that.$message({
          type: "error",
          message: "请填写最大文号!"
        });
        return;
      }
      that.ruleForm.function = 'doSaveOrUpdateProduceNumberById'
      that.$post
        .postData("doSaveOrUpdateProduceNumberById", JSON.stringify(that.ruleForm), that.$businessCode.fawgl)
        .then(res => {
          if(res.success) {
            that.$message({
              type: "success",
              message: "保存成功!"
            });
            that.ruleForm =  {
              function: "",
              id: "",
              orgName: '',
              orgId:"",
              sendType: '',
              redHead: "",
              reservedNum: "",
              year: "",
              startNum: "",
              reservedNum: "",
              sort: '',
              currentMaxNum: "",
              type: "CN000",
              unitName: "",
              unitId: ""
            }
            that.ruleForm.orgName = that.ruleForm.unitName = that.unitName
            that.ruleForm.orgId = that.ruleForm.unitId = that.unitId
            that.dialogVisible = false;
            that.handleLoadData();
          } else {
            that.$message({
              type: "error",
              message: res.message
            });
          }
        });
    },
    handleCancel () {
      this.dialogVisible = false;
      this.ruleForm =  {
        function: "",
        id: "",
        orgName: '',
        orgId:"",
        sendType: '',
        redHead: "",
        reservedNum: "",
        year: "",
        startNum: "",
        reservedNum: "",
        sort: '',
        currentMaxNum: "",
        type: "CN000",
        unitName: "",
        unitId: ""
      }
    },
    handleAddData() {
      this.ruleForm =  {
        function: "",
        id: "",
        orgName: '',
        orgId:"",
        sendType: '',
        redHead: "",
        reservedNum: "",
        year: "",
        startNum: "",
        reservedNum: "",
        sort: '',
        currentMaxNum: "",
        type: "CN000",
        unitName: "",
        unitId: ""
      }
      this.dialogVisible = true;
      this.ruleForm.orgName = this.ruleForm.unitName = this.unitName
      this.ruleForm.orgId = this.ruleForm.unitId = this.unitId
    }
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.valueYear = '2021'
    // this.dispatchjgflpz.year = '2021'

    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf: "1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify({function: "getSendOrderDicByParam", unitName: this.unitName, unitId: this.unitId}),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.SsendType = JSON.parse(res.data.sendType);
        });
      this.handleLoadData();
    })
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
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
</style>