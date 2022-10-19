/**
* create by zx on 2020/9/22 19:58
* 类注释：
* 备注：
*/
<template>
  <div class="sortOrg">
    <p class="base-title">部门排序</p>
    <el-row style="margin-bottom: 10px" :gutter="20">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择机构"
            v-model="searchData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <select-org-or-dept @select="selectDept" :orgOrDept="0" :orgOrDeptId="searchData.orgCode">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择部门"
            v-model="searchData.deptName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-button type="primary" @click="save" style="margin-bottom: 20px">确认</el-button>
      <el-button type="primary" @click="$router.back()">取消</el-button>
      <el-button @click="closeWindow" style="margin-bottom: 20px">关闭</el-button>
    </el-row>

    <div class="box1">
      <div class="infotable">
        <m-table
          :isPagination="false"
          :sortable="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :isSingle="true"
          :isSelection="true"
          @select="selectRow"
          :isIndex="true"
        ></m-table>
      </div>

      <div class="btn-aside">
        <div class="bottom">
          <el-button type="primary" plain @click="btnUpMove">上移</el-button>
          <el-button type="primary" plain @click="btnDownMove">下移</el-button>
          <el-button type="primary" plain @click="btnTop">置顶</el-button>
          <el-button type="primary" plain @click="btnBottom">置底</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "sortDept",
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data () {
    return {
      searchData: {
        unitCode:'',
        // unitClass: 0,
        // orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        // orgCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        orgName:'',
        orgCode:'',
        unitClass: 0,
        validFlag: 1,
        seletSelf: 0
      },
      tableData: [],
      oldData: [],
      tableCols: [
        // { label: "部门序号", prop: "orderBy" },
        { label: "部门名称", prop: "unitName" },
        { label: "部门全层次名", prop: "unitLevelName" },
        { label: "部门全层次ID", prop: "unitLevel" },
      ],
      selectRowData: {},
      oldArr: [],
      newArr: []
    };
  },
  computed: {},
  methods: {
    closeWindow () {
      this.$confirm("是否关闭?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          // this.$intent.closeWindow(this);
          this.$router.go(-1);
        })
        .catch(() => {
          // this.$router.back();
        });
    },
    selectOrg (org) {
      this.searchData.orgName = org.unitName;
      this.searchData.orgCode = org.id;
      this.searchData.unitCode = org.id;
      this.searchData.deptName = "";
      this.loadData();
    },
    selectDept (dept) {
      this.searchData.deptName = dept.unitName;
      this.searchData.unitCode = dept.id;
      this.loadData();
    },
    selectRow (row) {
      this.selectRowData = row;
    },
    save () {
      this.newArr = []
      this.oldArr = []
      let oldObj = {}
      let newObj = {}
      this.oldData.map(item => {
        oldObj = {}
        oldObj.unitCode = item.unitCode
        oldObj.index = item.index
        this.oldArr.push(oldObj)
      })
      this.tableData.map(item => {
        newObj = {}
        newObj.unitCode = item.unitCode
        newObj.index = item.index
        this.newArr.push(newObj)
      })
      this.$api.setting.organization
        .sortOrg({ old: this.oldArr, new: this.newArr })
        .then((res) => {
          if (res.code == "SUCCESS") {
            this.$message({
              type: "success",
              message: "排序成功",
            });
            this.loadData();
            this.selectRowData = {};
          }
        });
    },
    btnUpMove () {
      this.makeUpMove(this.selectRowData, this.tableData);
    },
    btnDownMove () {
      this.makeDownMove(this.selectRowData, this.tableData);
    },
    btnTop () {
      this.makeTop(this.selectRowData, this.tableData);
    },
    btnBottom () {
      this.makeBottom(this.selectRowData, this.tableData);
    },
    loadData () {
      this.$api.setting.organization.getOrgList(this.searchData).then((res) => {
        this.tableData = res.data;
        this.oldData = deepClone(this.tableData);
      });
    },
    makeTop (selectArea, DataName) {
      if (selectArea.index !== undefined) {
        const index = selectArea.index;
        if (index == 0) {
          this.$message({
            type: "warning",
            message: "第一条数据不可以上移！",
          });
          return;
        }
        DataName.unshift(DataName[index]);
        DataName.splice(index + 1, 1);
        // DataName[index] = DataName.splice(0, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "置顶成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
    makeBottom (selectArea, DataName) {
      if (selectArea.index !== undefined) {
        const index = selectArea.index;
        if (index == DataName.length - 1) {
          this.$message({
            type: "warning",
            message: "最后一条数据不可以置底！",
          });
          return;
        }
        DataName.push(DataName[index]);
        DataName.splice(index, 1);
        // DataName[index] = DataName.splice(DataName.length - 1, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "下移成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
    makeUpMove (selectArea, DataName) {
      if (selectArea.index !== undefined) {
        const index = selectArea.index;
        if (index == 0) {
          this.$message({
            type: "warning",
            message: "第一条数据不可以上移！",
          });
          return;
        }
        DataName[index] = DataName.splice(index - 1, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "上移成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
    makeDownMove (selectArea, DataName) {
      if (selectArea.index !== undefined) {
        const index = selectArea.index;
        if (index == DataName.length - 1) {
          this.$message({
            type: "warning",
            message: "最后一条数据不可以下移！",
          });
          return;
        }
        DataName[index] = DataName.splice(index + 1, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "下移成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
  },
  activated () { },
  mounted () { },
  created () {
    this.$api.setting.organization.getTree({
          unitClass: 1,
          unitCode: '1',
        }).then((res) => {
          let data = []
          data=res.data
          if(data&&data.length>0){
            this.searchData.orgName=data[0].unitName
            this.searchData.orgCode=data[0].unitCode
            this.searchData.unitCode=data[0].unitCode
            this.loadData();
          }
        }).catch(err => {
          
        });
    
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.base-title {
  width: 100%;
  margin: 16px 0px;
  text-align: center;
  color: #3b85f0;
  font-size: 28px;
  font-weight: bolder;
}

.btn-list {
  margin-bottom: 20px;
}

.box {
  margin: 0 auto;
}

.box1 {
  width: 100%;
  height: 100%;
  display: flex;

  .infotable {
    width: 92%;
  }

  .btn-aside {
    position: fixed;
    top: 260px;
    left: 92%;
    display: flex;
    flex-direction: column;

    .top {
      height: 116px;
      display: flex;
      justify-content: center;

      .el-button {
        height: 36px;
      }
    }

    .bottom {
      flex: 1;
      //  background: red;
      display: flex;
      flex-direction: column;
      align-items: center;

      .el-button {
        margin: 8px;
      }

      #btnfirst {
        margin-top: 0;
      }
    }
  }
}
</style>
