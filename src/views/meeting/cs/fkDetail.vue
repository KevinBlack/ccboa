<!--
 * @Author: your name
 * @Date: 2020-08-03 14:12:57
 * @LastEditTime: 2021-07-06 09:55:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\cs\fkDetail.vue
--> 
/**
* create by zz on 2020/8/3 14:00
* 类注释：
* 备注：参数维护/反馈配置/详情
*/
<template>
  <div class="fkDetail">
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
      <el-form v-if="!isEdit" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称">
              <el-input v-model="scUnit" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-input v-model="selecttype.typename" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <m-table
          @refresh="loadData()"
          @cellClick="cellClick"
          size="medium"
          :tableData="tableData"
          :tableCols="tableCols"
          :isSelection="false"
          :isIndex="true"
          :isPagination="false"
        ></m-table>
      </el-form>
      <!-- 编辑状态 -->
      <el-form v-else :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称">
              <el-input v-model="scUnit" disabled></el-input>
              <!-- 接口16052 -->
              <!-- <el-select style="width:100%" v-model="scUnit" disabled>
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
              <el-select style="width:100%" v-model="selecttype.typename" disabled>
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
          @refresh="loadData()"
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
export default {
  name: "fkDetail",
  components: {
    mTable,
  },
  data() {
    return {
      isEdit: Boolean,
      buttonList: ["关闭", "编辑"],
      buttonList2: ["添加", "更新", "删除", "上移", "下移"],
      rules: {},
      formData1: {
        scUnit: "",
        fileType: "",
        returnCn: "",
        returnEn: "",
        isNecess: "",
      },
      scUnit: "",
      scUnitId: "",
      // selectfloor: [
      //   {
      //     floorname: '总行',
      //     floorid: '1'
      //   },
      // ],
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
      tableData: [],
      tableCols: [
        { label: "反馈中文名", prop: "returnCn" },
        { label: "反馈英文名", prop: "returnEn" },
        { label: "是否必填", prop: "isNecess" },
      ],
      arr: [],
      obj: {},
      pagination1: {
        pageNum: 1,
        total: 10,
        pageSize: 10,
      },
      id: this.$route.query.id,
      rowIndex: "",
      arr1: [],
      userId: "",
      rowArr: [],
      flag: true,
      flag1: true,
      upArr1: [],
      upArr2: [],
      upArr3: [],
      downArr1: [],
      downArr2: [],
      downArr3: [],
    };
  },
  computed: {},
  methods: {
    buttonClick(params) {
      switch (params) {
        case "编辑":
          this.isEdit = !this.isEdit;
          this.buttonList = ["关闭", "保存"];
          break;
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
    loadData() {
      this.$api.meeting
        .settingDetail({
          id: this.id,
        })
        .then((res1) => {
          console.log(888, res1);
          this.userId = res1.meetHyglFeedbackConfigDo.updateUserId;
          this.scUnit = res1.meetHyglFeedbackConfigDo.scUnit;
          this.scUnitId = res1.meetHyglFeedbackConfigDo.scUnitId;
          this.selecttype.typename =
            res1.meetHyglFeedbackConfigDo.fileType == "培训会议通知"
              ? "培训通知"
              : res1.meetHyglFeedbackConfigDo.fileType;
          let str1 = res1.meetHyglFeedbackConfigDo.returnCn;
          let str2 = res1.meetHyglFeedbackConfigDo.returnEn;
          let str3 = res1.meetHyglFeedbackConfigDo.isNecess;
          let newArr1 = str1.substr(0, str1.length - 1).split(",");
          let newArr2 = str2.substr(0, str2.length - 1).split(",");
          let newArr3 = str3.substr(0, str3.length - 1).split(",");
          newArr1.forEach((item, index) => {
            this.tableData.push({
              returnCn: newArr1[index],
              returnEn: newArr2[index],
              isNecess: newArr3[index],
            });
          });
        });
    },
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
    select(rows) {
      // let row = rows[0]
      // this.ch = row.returnCn
      // this.en = row.returnEn
      // this.value = row.isNecess
      // this.rowIndex = row.index
      this.rowArr = rows;
      // console.log(this.rowIndex)
    },
    // 保存
    save1() {
      this.isEdit = !this.isEdit;
      this.buttonList = ["关闭", "编辑"];
      this.arr1 = [];
      this.tableData.forEach((item) => {
        this.str = [];
        this.str.push(item.returnCn);
        this.str.push(item.returnEn);
        this.str.push(item.isNecess);
        this.arr1.push(this.str.join(","));
      });
      let listStr = this.arr1.join("%");
      this.$api.meeting
        .infoUpdate({
          id: this.id,
          scUnit: this.scUnit,
          scUnitId: this.scUnitId,
          fileType:
            this.selecttype.typename == "培训通知"
              ? "培训会议通知"
              : this.selecttype.typename,
          list: listStr,
          updateUserId: this.userId,
        })
        .then((res) => {});
      // if (this.scUnit && this.selecttype.typename) {
      //   this.$api.meeting.meetingTable({}, {
      //     PAGE_JUMP: 1,
      //     REC_IN_PAGE: 10
      //   })
      //     .then(res1 => {
      //       let listArr = res1.list
      //       listArr.forEach(item => {
      //         if (item.id == this.id) {
      //           return
      //         }
      //         if (item.scUnit == this.selectfloor.floorname && item.fileType == this.selecttype.typename) {
      //           this.$message({
      //             message: '该机构下的该会议类型已存在',
      //             type: 'warning'
      //           });
      //         } else {
      //           this.$api.meeting.infoUpdate({
      //             id: this.id,
      //             scUnit: this.selectfloor.floorname,
      //             fileType: this.selecttype.typename,
      //             list: listStr,
      //             updateUserId: this.userId
      //           })
      //             .then(res => {

      //             })
      //         }
      //       })
      //     })
      // }
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
    updateRow() {
      // if ((this.rowIndex == '0' || this.rowIndex) && this.rowArr.length == 1) {
      //   console.log('hhh')
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

        // }
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
    // delRow () {
    //   this.rowArr.forEach(it => {
    //     this.newTableData = []
    //     this.tableData.forEach(item => {
    //       this.ch = ''
    //       this.en = ''
    //       this.isNecess = ''
    //       if (item.index == it.index) {
    //         return
    //       }
    //       this.newTableData.push(item)
    //     })
    //     this.tableData = this.newTableData

    //   })
    //   this.rowArr = []
    // },

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
  },
  activated() {},
  mounted() {},
  created() {
    this.isEdit = false;
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.fkDetail {
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
    padding: 8px 70px;
    margin-top: 70px;
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
