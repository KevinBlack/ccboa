<!--
 * @Author: your name
 * @Date: 2020-08-24 09:57:27
 * @LastEditTime: 2021-07-05 21:17:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\cs\fkAdd.vue
--> 
<template>
  <div class="fkAdd">
    <div class="headerClick">
      <div class="right">
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item)"
          :key="index"
          size="mini"
          plain
        >{{item}}</el-button>
      </div>
    </div>
    <div class="fkHeader">
      <div class="title-text">反馈信息配置</div>
    </div>
    <!-- 未编辑状态 -->
    <div class="process_content">
      <!-- <el-form v-if="!isEdit" :rules="rules" :model="formData1" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称">
              <el-input v-model="selectfloor.floorname" placeholder="请选择" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-input v-model="selecttype.typename" disabled placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <m-table
          @refresh="loadData()"
          @cellClick="cellClick"
          size="medium"
          :tableData="tableData"
          :tableCols="tableCols"
          :isSelection="true"
          :isIndex="true"
          :isPagination="false"
        ></m-table>
      </el-form>-->
      <!-- 编辑状态 -->
      <!-- <el-form v-else :model="formData2" label-width="120px"> -->
      <el-form :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称">
              <!-- select主办部门 -->
              <select-org-or-dept @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'1'">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择"
                  v-model="formData.scUnit"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
              <!-- <el-select style="width:100%" v-model="selectfloor.floorname">
                <el-option
                  v-for="item in selectfloor"
                  :key="item.floorname"
                  :label="item.floorname"
                  :value="item.floorname"
                ></el-option>
              </el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-select style="width:100%" v-model="selecttype.typename">
                <!-- <el-option
                  v-for="item in selecttype"
                  :key="item.typeid"
                  :label="item.typename"
                  :value="item.typeid"
                ></el-option>-->
                <el-option
                  v-for="item in selecttype"
                  :key="item.typename"
                  :label="item.typename"
                  :value="item.typename"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="中文名">
              <el-input v-model="ch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="英文名">
              <el-input v-model="en"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否必填">
              <el-select style="width:100%" v-model="value">
                <!-- <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>-->
                <el-option
                  v-for="item in options"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <m-table
          ref="orgTable"
          @cellClick="cellClick"
          @select="select"
          size="medium"
          :tableData="tableData"
          :tableCols="tableCols"
          :isSelection="true"
          :isIndex="true"
          :isPagination="false"
        ></m-table>
        <el-button
          v-for="(item,index) in buttonList2"
          @click="buttonClick2(item)"
          :key="index"
          size="mini"
          plain
        >{{item}}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  name: "fkAdd",
  components: {
    mTable,
    selectOrgOrDept,
  },
  data() {
    return {
      // 选机构
      showTree: false,
      isEdit: Boolean,
      buttonList: ["关闭", "保存"],
      buttonList2: ["添加", "更新", "删除", "上移", "下移"],
      rules: {},
      formData: {},
      selectfloor: [
        {
          floorname: "总行",
          floorid: "1",
        },
      ],
      selecttype: [
        {
          typename: "系统会议通知",
          typeid: "1",
        },
        {
          typename: "本部会议通知",
          typeid: "2",
        },
        {
          typename: "部门会议通知",
          typeid: "3",
        },
        {
          typename: "培训通知",
          typeid: "4",
        },
      ],
      options: [
        {
          label: "是",
          value: "y",
        },
        {
          label: "否",
          value: "n",
        },
      ],
      value: "",
      ch: "",
      en: "",
      formData2: {},
      tableData: [
        {
          returnCn: "行名",
          returnEn: "bankName",
          isNecess: "是",
        },
        {
          returnCn: "部门",
          returnEn: "deptname",
          isNecess: "是",
        },
        {
          returnCn: "姓名",
          returnEn: "name",
          isNecess: "是",
        },
        {
          returnCn: "手机",
          returnEn: "phone",
          isNecess: "是",
        },
        {
          returnCn: "性别",
          returnEn: "xingbie",
          isNecess: "否",
        },
        {
          returnCn: "民族",
          returnEn: "minzu",
          isNecess: "否",
        },
        {
          returnCn: "职务",
          returnEn: "zhiwu",
          isNecess: "否",
        },
        {
          returnCn: "邮箱",
          returnEn: "email",
          isNecess: "否",
        },
        {
          returnCn: "固话",
          returnEn: "tell",
          isNecess: "否",
        },
        {
          returnCn: "接站时间",
          returnEn: "jiezhan",
          isNecess: "否",
        },
        {
          returnCn: "到达时间",
          returnEn: "jiezhan",
          isNecess: "否",
        },
        {
          returnCn: "备注",
          returnEn: "beizhu",
          isNecess: "否",
        },
      ],
      newTableData: [],
      tableCols: [
        { label: "反馈中文名", prop: "returnCn" },
        { label: "反馈英文名", prop: "returnEn" },
        { label: "是否必填", prop: "isNecess" },
      ],
      arr: [],
      obj: {},
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 10,
      },
      rowIndex: "",
      str: [],
      arr1: [],
      rowArr: [],
      flag: true,
      flag1: true,
      flaglist: true,
      // upArr1: [],
      // upArr2: [],
      // upArr3: [],
      // downArr1: [],
      // downArr2: [],
      // downArr3: [],
    };
  },
  computed: {},
  methods: {
    // 选机构
    selectOrg(org) {
      console.log(org);
      this.$set(this.formData, "scUnit", org.unitName);
      this.formData.scUnitId = org.id;
      // console.log('主办部门：', this.formData)
    },
    buttonClick(params) {
      switch (params) {
        // case "编辑":
        //   this.isEdit = !this.isEdit;
        //   this.buttonList = ["关闭", "保存"];
        //   break;
        case "保存":
          this.save1();
          break;
        case "关闭":
          // this.$intent.closeWindow(this)
          this.$router.push("/meeting/cs/fk");
          break;
      }
    },
    buttonClick2(params) {
      switch (params) {
        case "添加":
          this.addRow();
          break;
        case "更新":
          this.updateRow();
          break;
        case "删除":
          if (this.rowArr && this.rowArr.length) {
            this.delRow();
          }
          break;
        case "上移":
          this.btnUpMove();
          break;
        case "下移":
          this.btnDownMove();
          break;
      }
    },
    select(rows) {
      // let row = rows[0]
      // this.ch = row.returnCn
      // this.en = row.returnEn
      // this.value = row.isNecess
      // this.rowIndex = row.index
      this.rowArr = rows;
      // console.log(22222,rows)
      // console.log(this.rowIndex)
    },
    // 保存
    save1() {
      // 若同一机构同一类型已存在也不可添加，还未限制此条件
      // this.isEdit = !this.isEdit;
      // this.buttonList = ["关闭", "编辑"];
      this.arr1 = [];
      this.tableData.forEach((item) => {
        this.str = [];
        this.str.push(item.returnCn);
        this.str.push(item.returnEn);
        this.str.push(item.isNecess);
        this.arr1.push(this.str.join(","));
      });
      let listStr = this.arr1.join("%");
      if (this.formData.scUnit && this.selecttype.typename) {
        this.$api.meeting
          .createAddData({
            scUnit: this.formData.scUnit,
            scUnitId: this.formData.scUnitId,
            fileType:
              this.selecttype.typename == "培训通知"
                ? "培训会议通知"
                : this.selecttype.typename,
            list: listStr,
          })
          .then((res) => {
            this.$router.push("/meeting/cs/fk");
          });
      } else {
        if (!this.formData.scUnit) {
          this.$message({
            message: "机构名称不能为空",
            type: "warning",
          });
        } else {
          if (!this.selecttype.typename) {
            this.$message({
              message: "类型不能为空",
              type: "warning",
            });
          }
        }
      }
    },
    // 添加
    addRow() {
      if (this.ch && this.en && this.value) {
        try {
          this.tableData.forEach((item) => {
            if (this.ch == item.returnCn) {
              this.flag1 = false;
              throw new Error("中文名已存在");
            } else {
              this.flag1 = true;
              if (this.en == item.returnEn) {
                this.flag1 = false;
                throw new Error("英文名已存在");
              } else {
                this.flag1 = true;
              }
            }
          });
        } catch (e) {
          this.$message({
            message: e.message,
            type: "warning",
          });
          return;
        }
        if (this.flag1) {
          this.tableData.push({
            returnCn: this.ch,
            returnEn: this.en,
            isNecess: this.value,
          });
          this.ch = "";
          this.en = "";
          this.value = "";
        }
      }
    },
    // 更新
    updateRow() {
      if (this.ch && this.en && this.value && this.rowIndex) {
        try {
          this.tableData.forEach((item) => {
            if (item.index == this.rowIndex) return;
            if (this.ch == item.returnCn) {
              this.flag = false;
              throw new Error("中文名已存在");
            } else {
              this.flag = true;
              if (this.en == item.returnEn) {
                this.flag = false;
                throw new Error("英文名已存在");
              } else {
                this.flag = true;
              }
            }
          });
        } catch (e) {
          this.$message({
            message: e.message,
            type: "warning",
          });
          return;
        }
        if (this.flag) {
          this.tableData.forEach((item) => {
            if (item.index == this.rowIndex) {
              item.returnCn = this.ch;
              item.returnEn = this.en;
              item.isNecess = this.value;
              this.ch = "";
              this.en = "";
              this.value = "";
            }
          });
        }
      }
    },
    // 删除
    delRow() {
      try {
        this.rowArr.forEach((item) => {
          if (
            item.returnCn == "行名" ||
            item.returnCn == "部门" ||
            item.returnCn == "姓名" ||
            item.returnCn == "手机"
          ) {
            this.flag = false;
            throw new Error("不能删除" + item.returnCn + "，请去掉选项");
          } else {
            this.flag = true;
          }
        });
      } catch (e) {
        this.rowArr = [];
        this.$message({
          message: e.message,
          type: "warning",
        });
        return;
      }
      if (this.flag) {
        this.rowArr.forEach((it) => {
          this.newTableData = [];
          this.tableData.forEach((item) => {
            this.ch = "";
            this.en = "";
            this.isNecess = "";
            if (item.index == it.index) {
              return;
            }
            this.newTableData.push(item);
          });
          this.tableData = this.newTableData;
        });
        this.rowArr = [];
      }
    },
    // 上移
    btnUpMove() {
      this.makeUpMove(this.rowArr, this.tableData);
    },
    makeUpMove(selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据",
          });
          return;
        }
        const index = selectArea[0].index;
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
          message: "你没有选中数据",
        });
        return;
      }
    },
    // 下移
    btnDownMove() {
      this.makeDownMove(this.rowArr, this.tableData);
    },
    makeDownMove(selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据",
          });
          return;
        }
        const index = selectArea[0].index;
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
          message: "你没有选中数据",
        });
        return;
      }
    },
    // loadData () {
    //   this.$api.meeting.jigou()
    //     .then(res => {
    //       // this.result = res.list
    //       // this.pagination.total = res.total
    //       // this.tableData = this.result
    //     })
    // },
    cellClick(row, column, cell, event) {
      if (row.returnCn == "行名") {
        this.$message({
          type: "warning",
          message: "行名不可修改",
        });
      } else if (row.returnCn == "部门") {
        this.$message({
          type: "warning",
          message: "部门不可修改",
        });
      } else if (row.returnCn == "姓名") {
        this.$message({
          type: "warning",
          message: "姓名不可修改",
        });
      } else if (row.returnCn == "手机") {
        this.$message({
          type: "warning",
          message: "手机不可修改",
        });
      } else {
        this.ch = row.returnCn;
        this.en = row.returnEn;
        this.value = row.isNecess;
        this.rowIndex = row.index;
      }
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.isEdit = false;
    // this.loadData()
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.fkAdd {
  background: white;
  margin: 0 auto;
  padding-bottom: 20px;
  .headerClick {
    background: #409eff;
    color: white;
    height: 70px;
    line-height: 70px;

    .right {
      margin-left: 20px;
      float: left;
    }
  }
  .fkHeader {
    margin-top: 70px;
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
  .process_content {
    width: 80%;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
}
</style>