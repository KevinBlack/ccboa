<template>
  <div class="dispatchparameterspage">
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
          <el-button type="primary" size="small" @click="handleAddData">新增主抄送配置</el-button>
          <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>
        <!-- <el-col :span="24" style="margin-bottom: 10px;">
          <el-select style="width: 200px;" size="small" v-model="optionDepartInitial">
            <el-option
              v-for="item in optionDepart"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col> -->
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <m-table
          size="medium"
          :isSelection="true"
          :isIndex="false"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @handleSelectionChange="handleSelectionChange"
          @selectAll="handleSelectionChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :page-sizes="[10,15,20,25,30]"
        ></m-table>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" v-dialogDrag :modal-append-to-body="false" title="主抄送栏配置" :before-close="handleCancel">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo_ruleForm"
      >
        <el-col>
          <el-form-item label="机构名称" prop="organizationName">
            <el-input v-model="ruleForm.organizationName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="类别名称" prop="typeName">
            <el-select
              v-model="ruleForm.typeName"
              placeholder="请选择"
              style="width:100%"
              @change="selectTypeName"
            >
              <el-option value label="请选择"></el-option>
              <el-option
                v-for="item in typeNameList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="类别简称" prop="shortTypeName">
            <el-input v-model="ruleForm.shortTypeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="专属信息" prop="exclusiveInformation">
            <el-radio v-model="ruleForm.exclusiveInformation" label="行务" class="alternative">行务</el-radio>
            <el-radio v-model="ruleForm.exclusiveInformation" label="党务" class="alternative">党务</el-radio>
            <el-radio v-model="ruleForm.exclusiveInformation" label="无" class="alternative">无</el-radio>
          </el-form-item>
        </el-col>
        <!-- <el-col>
          <el-form-item label="是否有全选" prop="isSelectAll">
            <el-radio v-model="ruleForm.isSelectAll" label="0" class="alternative">是</el-radio>
            <el-radio v-model="ruleForm.isSelectAll" label="1" class="alternative">否</el-radio>
          </el-form-item>
        </el-col> -->
        <!-- <el-col>
          <el-form-item label="单项结尾字符" prop="singleEnd">
            <el-input v-model="ruleForm.singleEnd"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="多项结尾字符" prop="manyEnd">
            <el-input v-model="ruleForm.manyEnd"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="多项间隔字符" prop="manySpace">
            <el-input v-model="ruleForm.manySpace" @input="handleReplace"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="内容" prop="content">
            <!-- <el-input v-model="ruleForm.content">
              <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button>
            </el-input> -->
            <div style="display:flex">
              <el-input
                type="textarea" resize="none" autosize
                style="flex:1"
                v-model="ruleForm.content"
                :disabled="isEveryDeptTRUE"
              ></el-input>
              <!-- <button
                @click="bankmain('dw')"
                type="button"
                class="el-button el-button--default dimi_btn"
              >
                <i class="el-icon-plus"></i>
              </button> -->
            </div>
          </el-form-item>
        </el-col>
        <el-col v-if="isEveryDeptTRUE">
          <el-form-item label="隐藏内容" prop="hideDepartment">
            <!-- <el-input v-model="ruleForm.hideDepartment">
              <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button>
            </el-input> -->
            <div style="display:flex">
              <el-input
                type="textarea" resize="none" autosize
                style="flex:1"
                v-model="ruleForm.hideDepartment"
                :disabled="isEveryDeptTRUE"
              ></el-input>
              <button
                @click="bankmain('dw')"
                type="button"
                class="el-button el-button--default dimi_btn"
              >
                <!-- <i class="el-icon-plus"></i> -->
                选择
              </button>
              <button
                @click="handleClearHideDepartment"
                type="button"
                class="el-button el-button--default dimi_btn"
              >
                清空
              </button>
            </div>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="备注">
            <p>1.内容是通过手工录入,多个内容请用分号隔开，如：北京市;天津市。</p>
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
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="ruleForm"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :useNewDialog="true"
    ></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from "components/tree/tree-fawen";
import scrollIntoForm from '@/util/scrollValid'
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFJWH from "@/minixs/dispatchFJWH";

const tableCols = [
  { label: "类别名称", prop: "typeName", align: "center" },
  { label: "专属信息", prop: "exclusiveInformation", align: "center" },
  { label: "配置内容", prop: "content", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
]

export default {
  name: 'Zcslpz',
  components: {
    mTable,
    treeCofig,
    selectOrgOrDept
  },
  mixins: [dispatchFJWH],
  data () {
    return {
      isGly:false,
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      dspcPrmShow: false,
      tableData: [],
      //xiaoM  主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true,
        unitName:'',
        unitId:'',
        unitCode:'',
      },
      ruleForm: {
        function: 'addOrUpdatePriDelivery',
        unitName: '',
        unitId: '',
        organizationName: '',
        organizationId: '',
        typeName: '',
        singleEnd: '',
        manyEnd: '',
        manySpace: '',
        sort: '',
        content: '',
        id: '',
        isSelectAll: '',
        hideDepartment: '',
        hideDepartmentIds: '',
        exclusiveInformation: '',
        isOurVariousDepartments: '', // 是否本行各部门:0本行各部门;1非本行各部门;
        shortTypeName: '',
        type: ''
      },
      copytypeName: "",
      copyContent: "",
      rules: {
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        typeName: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        // manySpace: [
        //   { required: true, maxlength: 1, max: 1, message: '请输入中文“，”、“、”及英文“,”、“.”、“;”五种符号中的一种', trigger: 'blur' }
        // ]
      },
      optionDepart: [],
      optionDepartInitial: '',
      deleteIds: '',
      checkedArr: [],
      dialogTit: "选择部门", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      zhuCheckData: [], //主抄送选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      paramList: [],
      typeNameList: [],
      isEveryDeptTRUE: false
    }
  },
  methods: {
    // 校验分隔符
    // handleReplace(val) {
    //   let transArr = [",",";",".","、","，"];
    //   if(transArr.includes(val)) {
    //     this.ruleForm.manySpace = val;
    //   } else {
    //     this.ruleForm.manySpace = "";
    //     this.$message({
    //       type: "info",
    //       offset: 100,
    //       showClose: true,
    //       message: "请输入一位符号",
    //       duation: 1000
    //     });
    //   }
    //   return;
    // },
    handleLoadData(val) {
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId;
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if(val=="1") {
        this.pagination.page = 1;
      }
      console.log("****", this.ruleForm);
      this.ruleForm.function = 'getPriDeliveryByPage'
      this.$post.postData('getPriDeliveryByPage', JSON.stringify(Object.assign({},this.ruleForm, this.pagination)), this.$businessCode.fawgl).then((res) => {
        this.tableData = res.data.rows
        this.pagination.total = res.data.total;
      })
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
    cellClick(row, column, cell, event) {
      let that = this;
      that.$post.postData('getPriDeliveryById', JSON.stringify({ function: 'getPriDeliveryById', id: row.id, unitId: this.unitId }), that.$businessCode.fawgl).then((res) => {
        if(res&&res.success) {
          that.ruleForm = Object.assign({}, res.data)
          that.ruleForm.function = 'selectSendObjTypeConfigByParam'
          that.ruleForm.unitName = that.ruleForm.organizationName = that.unitName;
          that.ruleForm.unitId = that.ruleForm.organizationId = that.unitId;
          that.copytypeName = that.ruleForm.typeName;
          that.copyContent = that.ruleForm.content;
          if (res.data.hideDepartmentIds) {
            that.zhuCheckData = that.concatTreeData(
              res.data.hideDepartmentIds,
              res.data.hideDepartment,
              "dosend"
            );
          }
        } else {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "请先进行类别配置!",
          //   duration: 1000
          // });
          // return;
        }
        that.$post.postData('selectSendObjTypeConfigByParam', JSON.stringify(that.ruleForm), that.$businessCode.fawgl).then((res) => {
          if(res&&res.success) {
            that.paramList = res.data;
            // if(res.data[0].isEveryDept) {
            //   that.isEveryDeptTRUE = res.data[0].isEveryDept=='1';
              // that.ruleForm.content = res.data[0].content&&res.data[0].content||"";
              // that.ruleForm.hideDepartment = res.data[0].hideDepartment&&res.data[0].hideDepartment||"";
              // that.ruleForm.shortTypeName = res.data[0].categoryShortname&&res.data[0].categoryShortname||"";
            // }
            res.data.map(item => {
              if(item.categoryName == that.ruleForm.typeName) {
                that.isEveryDeptTRUE = item.isEveryDept=='1';
              }
            })
            that.typeNameList = [];
            res.data.forEach(element => {
              that.typeNameList.push(element.categoryName)
            });
          }
        })
      })
      that.dialogVisible = true;
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
            this.$post.postData('deleteTcPriDeliverDicEntityList', JSON.stringify({ function: 'deleteTcPriDeliverDicEntityList', id: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
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
    handleAddData () {
      let that = this;
      that.ruleForm = {
        function: 'selectSendObjTypeConfigByParam',
        unitName: '',
        unitId: '',
        organizationName: '',
        organizationId: '',
        typeName: '',
        singleEnd: '',
        manyEnd: '',
        manySpace: '',
        sort: '',
        content: '',
        id: '',
        isSelectAll: '',
        hideDepartment: '',
        hideDepartmentIds: '',
        exclusiveInformation: '',
        isOurVariousDepartments: '', // 是否本行各部门:0本行各部门;1非本行各部门;
        shortTypeName: '',
        type: ''
      };
      that.checkData = []
      that.checkIds = []
      that.zhuCheckData = []
      that.ruleForm.organizationName = that.ruleForm.unitName = that.unitName
      that.ruleForm.organizationId = that.ruleForm.unitId = that.unitId
      that.copyContent = "";
      that.copytypeName = "";
      that.$post.postData('selectSendObjTypeConfigByParam', JSON.stringify(that.ruleForm), that.$businessCode.fawgl).then((res) => {
        if(res&&res.success) {
          that.paramList = res.data;
          that.typeNameList = [];
          res.data.forEach(element => {
            that.typeNameList.push(element.categoryName)
          });
        }
        that.dialogVisible = true;
      })
    },
    handleSave () {
      if (!scrollIntoForm) {
        return
      }
      if(this.ruleForm.organizationName==""||this.ruleForm.typeName==""||this.ruleForm.content=="") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "必填字段不能为空!",
          duration: 1000
        });
        return;
      }
      this.ruleForm.function = 'addOrUpdatePriDelivery'
      console.log(this.ruleForm)
      this.$post.postData('addOrUpdatePriDelivery', JSON.stringify(this.ruleForm), this.$businessCode.fawgl).then((res) => {
        if(res.success) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
        this.dialogVisible = false
        this.ruleForm = {
          function: '',
          unitName: '',
          unitId: '',
          organizationName: '',
          organizationId: '',
          typeName: '',
          singleEnd: '',
          manyEnd: '',
          manySpace: '',
          sort: '',
          content: '',
          id: '',
          isSelectAll: '',
          hideDepartment: '',
          hideDepartmentIds: '',
          exclusiveInformation: '',
          isOurVariousDepartments: '', // 是否本行各部门:0本行各部门;1非本行各部门;
          shortTypeName: '',
          type: ''
        };
        this.checkData = []
        this.checkIds = []
        this.zhuCheckData = []
        this.copyContent = "";
        this.copytypeName = "";
        this.isEveryDeptTRUE = false;
        this.handleLoadData("1")
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error.message
        })
      })
    },
    handleCancel () {
      this.dialogVisible = false
      this.ruleForm = {
        function: '',
        unitName: '',
        unitId: '',
        organizationName: '',
        organizationId: '',
        typeName: '',
        singleEnd: '',
        manyEnd: '',
        manySpace: '',
        sort: '',
        content: '',
        id: '',
        isSelectAll: '',
        hideDepartment: '',
        hideDepartmentIds: '',
        exclusiveInformation: '',
        isOurVariousDepartments: '', // 是否本行各部门:0本行各部门;1非本行各部门;
        shortTypeName: '',
        type: ''
      };
      this.checkData = []
      this.checkIds = []
      this.zhuCheckData = []
      this.copyContent = "";
      this.copytypeName = "";
      this.ruleForm.organizationName = this.ruleForm.unitName = this.unitName
      this.ruleForm.organizationId = this.ruleForm.unitId = this.unitId
      this.isEveryDeptTRUE = false;
    },
    handleDocTypeChange (val) {
      console.log(val)
      this.ruleForm = Object.assign(this.ruleForm, { docTypeDicId: val })
      this.handleLoadData()
    },
    //主抄送弹框
    bankmain() {
      this.dialogTit = '选择隐藏部门';
      this.treeData = [];
      this.dialogType = 'hui';
      this.hasRadio = false;
      this.canTab = false;
      this.singelCheckF = false;
      this.bank_mainXiao.unitName = this.unitName;
      this.bank_mainXiao.unitId = this.bank_mainXiao.unitCode = this.unitId;
      this.showCompDialog();
      this.$post.postData(
        "selUnitTreeByHQ",
        JSON.stringify(this.bank_mainXiao),
        this.$businessCode.fawgl
      ).then(res => {
        console.log(JSON.stringify(res.data));
        this.treeData = (res && res.data) || [];
      });
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
          names = names.join(';');
          ids = ids.join(';');
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
          that.checkData = [];
        }

        this.ruleForm.hideDepartment = names;
        this.ruleForm.hideDepartmentIds = ids;
        this.zhuCheckData = this.checkData;
        this.$forceUpdate();
      }
      this.dialogState = !this.dialogState;       
      if (this.dialogState) {
        this.backDialogData();
      } else {
        // 新增隐藏部门逻辑20211209-fu
        this.$post.postData(
          "getContext",
          JSON.stringify({
            function:"getContext",
            hideDepartmentIds: this.checkIds,
            organizationId:this.ruleForm.organizationId,
            unitId:this.ruleForm.unitId
          }),
          this.$businessCode.fawgl
        ).then(res => {
          if (res.success) {
            this.ruleForm.content = res.data;
          }
        });
      }
    },
    //弹窗回显数据
    backDialogData() {
      this.checkIds = this.ruleForm.hideDepartmentIds
        ? this.ruleForm.hideDepartmentIds.split(';')
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
    handleClearHideDepartment() {
      let that = this;
      that.ruleForm.hideDepartment = that.ruleForm.hideDepartmentIds = '';
      that.checkIds = [];
      that.checkData = this.zhuCheckData = [];
      this.backDialogData();
      this.$post.postData(
        "getContext",
        JSON.stringify({
          function:"getContext",
          hideDepartmentIds: this.checkIds,
          organizationId:this.ruleForm.organizationId,
          unitId:this.ruleForm.unitId
        }),
        this.$businessCode.fawgl
      ).then(res => {
        if (res.success) {
          this.ruleForm.content = res.data;
        }
      });
    },
    selectTypeName(val) {
      let that = this;
      that.paramList.map(item => {
        if(item.categoryName == val) {
          that.isEveryDeptTRUE = item.isEveryDept=='1';
          if(item.isEveryDept=='0') {
            that.ruleForm.hideDepartment = that.ruleForm.hideDepartmentIds = '';
            that.ruleForm.content = val==that.copytypeName ? that.copyContent : item.content;
          } else {
            that.isEveryDeptTRUE = item.isEveryDept=='1';
            that.ruleForm.content = item.content&&item.content||"";
          }
          that.ruleForm.type = item.sendType&&item.sendType||"";
          that.ruleForm.categoryShortname = item.categoryShortname&&item.categoryShortname||"";
          that.ruleForm.isOurVariousDepartments = that.ruleForm.isEveryDept = item.isEveryDept;
        }
      })
    }
  },
  created () {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf: "1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.handleLoadData("1");
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
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
</style>
