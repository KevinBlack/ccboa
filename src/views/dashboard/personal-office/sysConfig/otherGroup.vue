<!--
 * @Author: your name
 * @Date: 2020-08-13 14:59:50
 * @LastEditTime: 2021-04-08 14:29:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\dashboard\personal-office\sysConfig\otherGroup.vue
--> 
<template>
  <div class="content">
    <p class="use_object_title">常用发送对象登记</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata('1')">保存</el-button>
      <el-button type="primary" @click="saveANew">保存并新建</el-button>
    </div>
    <div class="formdata">
      <fd-form
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        :config="serverconfig"
        @event="btnevent"
      ></fd-form>
    </div>
    <div class="tableList" v-if="tableValue">
      <div class="top">
        <el-button type="primary" @click="groupRow">确定</el-button>
        <el-button type="primary" @click="cancelRow">取消</el-button>
      </div>
      <m-table
        class="ces-table"
        :sortable="false"
        :isSingle="false"
        size="medium"
        :isSelection="true"
        @select="selectRow"
        :searchData="searchData"
        :tableData="tableData"
        :tableCols="tableCols"
        :isPagination="false"
      ></m-table>
    </div>
    <div class="modal" v-if="modal"></div>
  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "components/table/tTable";

export default {
  name: "otherGroup",
  components: {
    FdForm,
    mTable
  },
  data() {
    return {
      modal: false,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,

      tableArray: [],
      tableData: [],
      tableValue: false,
      groupUnitNames: [],
      groupUnitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      tableCols: [
        { label: "群组编号", prop: "groupNo", width: 100 },
        { label: "群组级别", prop: "groupLevel" },
        { label: "群组名", prop: "groupName" },
        { label: "群组成员", prop: "groupMembersName" }
      ],
      formData: {
        groupUnitName: "",
        Settype: "他行群组"
      },
      searchData: {},
      formCfg: [
        {
          type: "select",
          prop: "Settype",
          label: "设置类型",

          style: { width: "96%" }
        },

        [
          {
            type: "input",
            disabled: true,
            rule: "must",
            prop: "groupUnitName",
            style: { width: "82%" }
          },
          {
            type: "button-primary",
            prop: "$selected",
            value: "选择",
            style: { "margin-left": "20px" }
          },
          { type: "formitem", label: "群组名" }
        ]
      ],
      serverconfig: {
        labelWidth: "140px"
      },
      pagination: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    cancelRow() {
      this.tableValue = false;
      this.modal = false;
      // this.$set(this.formData, "groupUnitName", "");
    },
    groupRow() {
      let groupUnitNames = [];
      this.tableArray.forEach(item => {
        groupUnitNames.push(item.groupName);
        this.$set(this.formData, "groupUnitName", groupUnitNames.join(","));
      });

      this.tableValue = false;

      this.modal = false;
    },
    selectRow(row) {
      this.tableArray = row;
      // let groupUnitNames = [];
      // row.forEach((item) => {
      //   groupUnitNames.push(item.groupName);
      //   this.$set(this.formData, "groupUnitName", groupUnitNames.join(","));
      // });
    },
    closedata() {
      // this.$router.go(-1);
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.savedata("2");
            // this.$intent.closeWindow(this);
          } else if (action === "cancel") {
            //点否
            // this.$intent.closeWindow(this);
            this.$router.go(-1);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
    },
    savedata(id) {
      if (id === "1") {
        // 点击保存
        console.log(this.tableArray);
        if (this.tableArray.length === 0) {
          this.$message({
            type: "warning",
            message: "请选择群组名"
          });
        } else {
          let arr = [];

          this.tableArray.forEach(item => {
            let obj = {};
            obj.groupLevel = item.groupLevel;
            obj.groupMembersIds = item.groupMembersId;
            obj.groupMembersCns = item.groupMembersName;
            obj.sysGroupsId = item.id;
            obj.groupName = item.groupName;
            obj.groupNo = item.groupNo;
            obj.groupType = item.groupType;
            obj.UnitCode = item.groupUnitId;
            obj.groupUnitName = item.groupUnitName;
            arr.push(obj);
          });

          this.$api.dailyWork
            .createOtherGroup({ groups: arr, unitCode: this.unitCode })
            .then(res => {
              this.$message({
                type: "success",
                message: "保存成功！"
              });
            });
          // this.closedata()
        }
      } else if (id === "2") {
        // 点击保存并新建
        console.log(this.tableArray);
        if (this.tableArray.length === 0) {
          this.$message({
            type: "warning",
            message: "请选择群组名"
          });
        } else {
          let arr = [];

          this.tableArray.forEach(item => {
            let obj = {};
            obj.groupLevel = item.groupLevel;
            obj.groupMembersIds = item.groupMembersId;
            obj.groupMembersCns = item.groupMembersName;
            obj.sysGroupsId = item.id;
            obj.groupName = item.groupName;
            obj.groupNo = item.groupNo;
            obj.groupType = item.groupType;
            obj.UnitCode = item.groupUnitId;
            obj.groupUnitName = item.groupUnitName;
            arr.push(obj);
          });

          this.$api.dailyWork
            .createOtherGroup({ groups: arr, unitCode: this.unitCode })
            .then(res => {
              this.$router.push({
                path: "/dashboard/personalOffice/sysConfig/vierPerList",
                query: {
                  activeName: "tabs-sleep"
                }
              });
              this.$message({
                type: "success",
                message: "保存成功！"
              });
            });
        }
      }
    },
    saveANew() {
      this.savedata("2");

      this.formData = {};
      this.$set(this.formData, "formitem", "");
      this.$set(this.formData, "groupUnitName", "");
    },
    getdep() {
      this.$api.dailyWork
        .creatOtherGroup(
          { groupUnitId: this.groupUnitId }
          // {
          //   PAGE_JUMP: this.pagination.pageNum,
          //   REC_IN_PAGE: this.pagination.pageSize,
          // }
        )
        .then(res => {
          this.tableData = res.data;
          // this.pagination.total = res.total;
        });
    },
    btnevent(params) {
      switch (params.value) {
        case "选择":
          this.getdep();
          this.tableValue = true;
          this.modal = true;
      }
    }
  },
  created() {
    // this.$api.dailyWork.getVierList({ groupClass: "他行群组" }).then((res) => {
    //   let arr = [];
    //   res.data.forEach((item) => {
    //     arr.push(item.groupName);
    //   });
    //   this.$set(this.formData, "groupUnitName", arr.join(","));
    // });
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.tableList {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  z-index: 2024;
  padding: 20px;
  position: absolute;
  width: 75%;
  height: 500px;
  border-radius: 5px;
  max-height: 650px;
  overflow: auto;
  top: 150px;
  left: 20%;
  background-color: #efefef;
  margin-bottom: 20px;
}

/deep/ .el-table--fit {
  max-height: 650px;
  overflow: auto;
  margin-top: 20px;
}
.content {
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  .formdata {
    margin-top: 24px;
  }
}

.use_object_title {
  width: 100%;
  text-align: center;
  color: #3b85f0;
  font-size: 28px;
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
.ces-table {
  max-height: 650px;
}
.ces-table /deep/ .el-table__body-wrapper {
  overflow-y: auto;
  max-height: 650px;
}
.ces-table /deep/ .el-table__body-wrapper::-webkit-scrollbar {
  display: block;
  width: 6px;
  height: 6px;
}
.ces-table /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  // position: relative;
  // display: block;
  // width: 0;
  // height: 0;
  // cursor: pointer;
  // border-radius: inherit;
  background-color: rgba(144, 147, 153);
  // transition: background-color .3s;
}
// .ces-table /deep/ .el-table__body-wrapper::-webkit-scrollbar{
//   height: 6px !important;
//   max-height: 650px;
// }
</style>
