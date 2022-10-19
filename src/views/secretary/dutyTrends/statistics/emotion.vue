<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">值班动态统计</div>
    </div>
    <div class="cformdata">
      <el-form ref="refForm" :model="formData" label-width="70px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="统计日期" prop="data">
              <el-date-picker
                v-model="searchData.data"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="报送机构" class="org-default">
              <select-org-or-dept :orgOrDeptId="'0'" :defaultData="orgName" @select="selectOrg">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择机构"
                  v-model="orgName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="导出类型">
              <el-radio-group v-model="radioType">
                <el-radio label="excel">EXCEL</el-radio>
                <el-radio label="html">HTML</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <div style="width:100%;text-align:center">
              <el-button type="primary" @click="submitForm">开始统计</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <m-table
      @refresh="loadData"
      size="medium"
      :isIndex="true"
      :isHandle="false"
      :isPagination="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :isSelection="true"
    ></m-table>

    <tip-dialog ref="orgTreeDialog" title="选择报送机构" @onOk="handleOrgTreeDialogOnOk">
      <el-tree
        ref="elTree"
        v-model="formData.sendObject"
        :data="publishLimitData"
        :show-checkbox="true"
        node-key="id"
        :props="defaultProps"
        @check="handleTreeCheckClick"
      ></el-tree>
    </tip-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept1";
import exportTable from "../../../../minixs/exportTable";

export default {
  name: "contribute",
  components: { mTable, selectOrgOrDept },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      radioType: "html",
      orgName: '全部',
      searchData: {
      }, /** @description: 搜索区数据 */
      tableData: [], /** @description: 表格数据 */
      publishLimitData: [],
      /** @description: 表头 */
      tableCols: [
        { label: "机构名称", prop: "unitName" },
        // { label: "部门名称", prop: "submitDept" },
        { label: "报送数量", prop: "bssum" },
        { label: "错情数量", prop: "cqsum" },
        { label: "错情率", prop: "cql" }
      ],      
      /** @description: 当前选中机构s */
      currentSelectedOrgs: [],
      submitColumnData: [], /** @description: 投稿栏目数据源 */
      formData: {} /** @description: 表单值 */
    };
  },
  computed: {
  },
  methods: {
    getList() {
      this.$api.duty
        .getPublishLimitData({
          unitCode: this.currentUserInfo.unitId
        })
        .then(res => {
          res.data.pop();
          let obj = {
            children: [],
            id: "999",
            label: "本行部门",
            name: "本行部门"
          };
          res.data.map(item => {
            this.publishLimitData.push({
              label: item.label,
              id: item.id,
              children: item.children
            });
          });
          this.publishLimitData.unshift(obj);
        });
    },
    /** @description: 处理树节点点击事件 */    
    handleTreeCheckClick(row, selectData) {
      this.currentSelectedOrgs = selectData.checkedNodes.map(item => item.label)
      console.log(row, selectData);
    },
    /** @description: 树弹窗确定按钮点击处理 */    
    handleOrgTreeDialogOnOk() {
      this.$set(this.searchData, "orgName", this.currentSelectedOrgs.join(','));
      this.$refs.orgTreeDialog.doClose()
    },
    /** @description: 选择报送机构按钮点击处理 */    
    chooseOrg() {   
      this.$refs.orgTreeDialog && this.$refs.orgTreeDialog.show()
    },
    /** @description: 开始统计 */
    submitForm() {
      if (!this.searchData.data) {
        this.$message.warning("请先选择统计日期");
        return
      } 
      if (!this.searchData.orgName) {
        this.$message.warning("请先选择报送机构");
        return
      } 
      /** @description: 判断html、excel */        
      if (this.radioType === "excel") {
        this.exportData();
      } else if (this.radioType === "html") {
        this.loadData(); /** @description: 调用表格数据方法 */
      }
    },
    /** @description: 重置 */
    resetForm() {
      this.searchData = {
      }; /** @description: 清空表单的值 */
      this.orgName = '全部'
    },
    /** @description: 获取表格数据 */
    loadData() {
      console.log(this.searchData);
      this.$api.duty.cuoList({...this.searchData}).then(res => {
        console.log('res', res, )
        this.tableData = res &&　res.orderList.filter(item=>{
              if(item.submitUnit==='总行'){
                item.unitName=item.submitDept;
              }else{
                item.unitName=item.submitUnit;
              }
              return item;
        });
      });
    },
    /** @description: 获取投稿栏目数据源 */
    getSubmitColumn() {
      this.$api.duty.getSubmitColumnData({ columnType: "1" }).then(res => {
        this.submitColumnData = res.columnCategoryList;
      });
    },
    /** @description: 导出 */    
    exportData() {
      exportTable.exportExcel("错情统计表");
    },
    selectOrg(org) {
      if(org.type == 2){
        this.orgName = org.unitName
      }
      this.searchData.orgName = org.unitName;
      this.$set(this.searchData, "orgName", org.unitName);
      this.$set(this.searchData, "orgCode", org.id);
      /** @description: this.searchData.orgCode = org.id; */
      /** @description: this.searchData.unitCode = org.id; */
      /** @description: this.searchData.unitSearchName = ""; */
      this.searchData.flagType = 1;
    },
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  margin-bottom: 8px;
  padding: 8px 70px;
  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
.btn_list {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 45%;
}
.duty_tid {
  margin-left: 20%;
  font-size: 14px;
  span {
    color: red;
    cursor: pointer;
  }
}
.phone_tid {
  margin-left: 40px;
  font-size: 14px;
}
/deep/ .el-table__header {
  width: auto !important;
}
/deep/ .el-table__body {
  width: auto !important;
}
.mrg-b-20 {
  float: right;
  margin-right: 20px;
}

.wrap {
  position: relative;
  width: 44%;
  height: 500px;
  z-index: 2024;
  left: 25%;
  top: -417px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /** @description: z-index: 2024; */

  background-color: white;
  /** @description: width: 50%; */
  /** @description: border-radius: 5px; */
  /** @description: height: 500px; */
  /** @description: overflow: auto; */
  /** @description: top: 150px; */
  /** @description: left: 25%; */
  /** @description: position: relative; */
}
.tableList {
  padding: 10px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: auto;
  height: 400px;
  margin-bottom: 20px;
  .top {
    margin-bottom: 20px;
  }
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2013;
}
.org-default {
  width: 440px;
}

.selectOrgOrDept {
  width: 376px !important;
}
</style>
