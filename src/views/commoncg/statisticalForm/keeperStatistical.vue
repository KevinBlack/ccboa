
<template>
  <div>
    <el-form :model="form" class="statistical" ref="elForm" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="保管机构" prop="draftOrgan">
            <el-input
              v-model="form.draftOrgan"
              :disabled="true"
              readonly="readonly"
              placeholder="请选择"
            >
              <el-button slot="append" type="primary" size="small" @click="selectOrg">选择</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14" class="txtRight">
          <el-button type="primary" size="small" @click="search">开始统计</el-button>
          <el-button type="primary" size="small" @click="reset">重 置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div style="width:100%;height:36px;"></div>
    <el-row>
      <el-col :span="24" class="mrg-b-20">
        <table>
          <tr class="table-first">
            <td>
              <h3 style="font-weight: bold;">统计说明</h3>
            </td>
            <td class="txtRight">
              <el-button type="primary" size="small" @click="exportData">导 出</el-button>
            </td>
          </tr>
          <tr>
            <td
              colspan="2"
              style="line-height:50px;"
            >1.本统计为按自然月整月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。</td>
          </tr>
          <tr>
            <td
              style="line-height:40px;"
              colspan="2"
            >2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <div style="width: 100%">
      <el-table
        id="table-tj"
        :data="tableData"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"
      >
        <el-table-column prop="orgName"></el-table-column>
        <el-table-column v-for="(item,index) in table" :key="index" :label="item.name">
          <el-table-column :prop="item.key+'_jq'" :label="item.list.jq"></el-table-column>
          <el-table-column :prop="item.key+'_sg'" :label="item.list.sg"></el-table-column>
          <el-table-column :prop="item.key+'_xj'" :label="item.list.xj" width="40"></el-table-column>
        </el-table-column>
        <el-table-column prop="hj" width="150" label="合计"></el-table-column>
      </el-table>
    </div>
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :seletSelf="seletSelf"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>
<script>
import searchForm from "components/form/searchForm";
import mTable from "@/components/table/tTable";
import orgTree from "components/tree/orgTree";
import exportTable from "../../../minixs/exportTable";
export default {
  name: "normalStatistical",
  components: {
    searchForm,
    mTable,
    orgTree
  },
  data() {
    return {
      seletSelf: 1,
      bankName: "",
      tip: "",
      title: "选择机构",
      showOrgTree: false,
      showOrgDepartTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      selectDept: [],
      tempArr: [],
      YzTypeList: [],
      rules: {
        draftTime: [
          { required: true, message: "请选择用印时间", trigger: "blur" }
        ]
      },
      form: {
        draftOrgan: JSON.parse(localStorage.getItem("userInfo")).unitName,
        draftOrganId: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      // 是否展示按用印部门统计下拉框
      isNeedStatisticalDepartment: false,
      // 是否展示按印章类别统计下拉框
      inNeedStatisticalSealType: false,
      // 是否展示按用印性质统计下拉框
      inNeedStatisticalProperty: false,
      // 是否展示按用发往单位类型统计统计下拉框w
      isNeedStatisticalUnitsType: false,
      // 存放印章类型数据
      statisticalSealTypeOption: [],
      // 存放用印性质数据
      statisticalPropertyOption: [],
      // 机构ID
      unitCode: "",
      table: [
        {
          list: "地址",
          list1: "pubList",
          list2: {
            item1: "1",
            item2: "2",
            item3: "3"
          }
        },
        {
          list: "地址2",
          list1: "pubName",
          list2: {
            item1: "1",
            item2: "2",
            item3: "3"
          }
        }
      ],
      list: {
        jq: "机器保管章数",
        sg: "手工保管章数",
        xj: "小计"
      },
      tableData: [
        {
          pubList_item2: "pubList_item2",
          pubList_item3: "pubList_item3",
          pubList_item1: "pubList_item12",
          pubName_item2: "pubList_name2",
          pubName_item3: "pubList_name3",
          pubName_item1: "pubList_name1"
        },
        {
          pubName_item2: "pubList_iname22",
          pubName_item3: "pubList_iname33",
          pubName_item1: "pubList_iname11",
          pubList_item2: "pubList_item22",
          pubList_item3: "pubList_item33",
          pubList_item1: "pubList_item11"
        }
      ],
      tableCols: [
        { label: "行章", prop: "num" },
        { label: "党委章", prop: "yylb" },
        { label: "领导人员名章", prop: "num" },
        { label: "部门内设章", prop: "yylb" }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  mounted() {},
  created() {},
  methods: {
    search() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.loadData();
        }
      });
    },
    selectOrg() {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId = "1";
      this.showOrgTree = true;
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$set(this.form, "draftOrgan", org.unitName);
        this.$set(this.form, "draftOrganId", org.id);
      }
    },
    //导出
    exportData() {
      exportTable.exportExcel("保管方式统计", "#table-tj");
    },
    // 重置按钮
    reset() {
      this.tableData = [];
      this.form.draftOrgan = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitName;
      this.form.draftOrganId = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitId;
    },
    loadData() {
      this.$api.sealManage.sealStatistical
        .statisKeeper({ ...this.form })
        .then(res => {
          res.typeList.map(item => {
            this.$set(item, "list", this.list);
          });
          this.table = res.typeList;
          this.tableData = res.list;
          console.log(this.tableData);
        });
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
.annual_title {
  width: 100%;
  height: 70px;
  margin-top: 20px;
  color: #2b66e3;
  text-align: center;
  font-size: 22px;
}
</style>