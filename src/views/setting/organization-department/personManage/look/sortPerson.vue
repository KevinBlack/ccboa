/**
* create by zx on 2020/9/29 14:56
* 类注释：
* 备注：
*/
<template>
  <div class="sortPerson">
    <p class="base-title">人员排序</p>
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
        <select-org-or-dept @select="selectDept" :orgOrDept="0" :orgOrDeptId="humanUnit">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择部门"
            v-model="searchData.deptName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-button type="primary" @click="save" style="margin-bottom: 20px">保存</el-button>
      <el-button type="primary" @click="closeWindow" style="margin-bottom: 20px">关闭</el-button>
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
  name: "sortPerson",
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data () {
    return {
      // humanUnit: JSON.parse(localStorage.getItem("userInfo")).unitId,
      humanUnit: '',
      searchData: {
        // orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        orgName: '',
        // humanUnit: JSON.parse(localStorage.getItem("userInfo")).unitId,
        humanUnit: '',
        sleepDeptName: "",
        validFlag: 1
      },
      tableData: [],
      oldData: [],
      tableCols: [
        // { label: "人员序号", prop: "orderBy" },
        { label: "系统注册号", prop: "account" },
        { label: "中文名", prop: "humanName" },
        { label: "所在部门", prop: "humanDeptName" },
        { label: "所在行名", prop: "humanOrgName" },
        { label: "所在岗位", prop: "humanPostName" },
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
      this.humanUnit = org.id;
      this.searchData.unitCode = org.id;
      this.searchData.deptName = "";
      // this.loadData();
    },
    selectDept (dept) {
      console.log(3333, this.searchData.humanUnit)
      this.searchData.deptName = dept.unitName;
      this.searchData.humanUnit = dept.id;
      this.loadData();
    },
    selectRow (row) {
      this.selectRowData = row;
      console.log(this.selectRowData);
    },
    save () {
      if (this.searchData.deptName) {
        this.newArr = []
        this.oldArr = []
        let oldObj = {}
        let newObj = {}
        this.oldData.map(item => {
          oldObj = {}
          oldObj.humanId = item.humanId
          oldObj.index = item.index
          this.oldArr.push(oldObj)
        })
        this.tableData.map(item => {
          newObj = {}
          newObj.humanId = item.humanId
          newObj.index = item.index
          this.newArr.push(newObj)
        })
        this.$api.setting.organization
          .sortPerson({ old: this.oldArr, new: this.newArr })
          .then((res) => {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.loadData();
            this.selectRowData = {};
          });
      } else {
        this.$message({
          message: "请先选择部门",
          type: "warning",
        });
      }

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
      this.$api.setting.organization
        .getPeopleList(this.searchData)
        .then((res) => {
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
        // console.log(selectArea.index);
        // console.log(typeof(selectArea.index)==true);

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
    // this.humanUnit = JSON.parse(localStorage.getItem("userInfo")).unitId
    // console.log(888,'')
    this.$api.setting.organization.getTree({
          unitClass: 1,
          unitCode: '1',
        }).then((res) => {
          let data = []
          data=res.data
          if(data&&data.length>0){
            this.searchData.orgName=data[0].unitName
            this.humanUnit=data[0].unitCode
            if (this.searchData.humanUnit) {
              this.loadData();
            }
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
