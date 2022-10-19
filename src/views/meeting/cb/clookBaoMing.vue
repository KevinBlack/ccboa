<!--
 * @Author: your name
 * @Date: 2020-10-11 14:43:58
 * @LastEditTime: 2021-07-29 12:43:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\cb\clookBaoMing.vue
--> 
<template>
  <div class="clookBaoMing">
    <div class="headerClick">
      <div class="right">
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item) in buttonList"
          @click="buttonClick(item)"
          :key="item"
          plain
        >{{item}}</el-button>
      </div>
    </div>
    <div class="tableBox">
      <!-- <m-table
        @refresh="loadData()"
        @cellClick="cellClick"
        size="medium"
        :isHandle="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :isPagination="false"
      ></m-table>-->
      <m-table
        @refresh="loadData"
        size="medium"
        :isHandle="false"
        :sortable="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :isSelection="false"
        :isIndex="false"
        :isPagination="false"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import exportTable from "../../../minixs/exportTable";
export default {
  name: "clookBaoMing",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
       numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      // 反馈信息
      tempArr: [],
      returnCnArr: [],
      returnEnArr: [],
      isNecessArr: [],
      attendObj: {},
      attendArr: [],
      tableData: [],
      tableCols: [],
      returnHtmlData: "",
      id: this.$route.query.id,
      flag: this.$route.query.flag,
      buttonList: ["关闭", "打印", "导出Excel"],
      curbankId: this.$route.query.curbankId ? this.$route.query.curbankId : "",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    cellClick() {},
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.$intent.closeWindow(this);
          break;
        case "打印":
          this.$intent.goNewPage(this, {
            path: "/meetBmTablePrint",
            query: { id: this.id ,numYear:this.numyear},
          });
          break;
        case "导出Excel":
          if (this.tableData.length == 0) {
            return;
          }
          exportTable.exportExcel("报名表信息");
          break;
      }
    },
    loadData() {
      this.tempArr = [];
      this.returnCnArr = [];
      this.returnEnArr = [];
      this.isNecessArr = [];
      if (this.flag == "cb") {
        this.$api.meeting
          .cblookBmb({
            id: this.id,
            unitId: this.curbankId,
            curUnitId: JSON.parse(localStorage.getItem("userInfo")).currUnitId,
            numYear:this.numyear
          })
          .then((res) => {
            if (res.tableName && res.tableName.length > 0) {
              this.tempArr = res.tableName.split("&");
              this.returnCnArr = this.tempArr[0].split(",");
              this.returnEnArr = this.tempArr[1].split(",");
              this.isNecessArr = this.tempArr[2].split(",");
              this.attendArr = [];
              this.returnCnArr.forEach((item, index) => {
                this.attendObj = {};
                this.attendObj.label = item;
                this.attendObj.prop = this.returnEnArr[index];
                this.tableCols.push(this.attendObj);
              });
            }
            if (res.dataList && res.dataList.length > 0) {
              let str = res.dataList;
              let infoArr = str.substring(0, str.length - 1).split("#");
              infoArr.forEach((item, index) => {
                if (item && item != "null") {
                  this.tableData.push(...JSON.parse(item));
                }
              });
            }
          });
      } else {
        this.$api.meeting.zflookBmb({ id: this.id,numYear:this.numyear }).then((res) => {
          if (res.tableName && res.tableName.length > 0) {
            this.tempArr = res.tableName.split("&");
            this.returnCnArr = this.tempArr[0].split(",");
            this.returnEnArr = this.tempArr[1].split(",");
            this.isNecessArr = this.tempArr[2].split(",");
            this.attendArr = [];
            this.returnCnArr.forEach((item, index) => {
              this.attendObj = {};
              this.attendObj.label = item;
              this.attendObj.prop = this.returnEnArr[index];
              this.tableCols.push(this.attendObj);
            });
          }
          if (res.dataList && res.dataList.length > 0) {
            let str = res.dataList;
            let infoArr = str.substring(0, str.length - 1).split("#");
            infoArr.forEach((item, index) => {
              if (item && item != "null") {
                this.tableData.push(...JSON.parse(item));
              }
            });
          }
        });
      }
    },
    // change() {
    //   this.returnCnArr = this.tempArr[0].split(",");
    //   this.returnEnArr = this.tempArr[1].split(",");
    //   this.isNecessArr = this.tempArr[2].split(",");
    //   this.attendArr = [];
    //   this.returnCnArr.forEach((item, index) => {
    //     this.attendObj = {};
    //     this.attendObj.label = item;
    //     this.attendObj.prop = this.returnEnArr[index];
    //     this.tableCols.push(this.attendObj);
    //   });
    //   console.log(23, this.returnHtmlData);
    //   let newArr = [];
    //   newArr = this.tableCols.concat();
    //   if (this.returnHtmlData && this.returnHtmlData.length > 0) {
    //     let arr1 = [];
    //     let obj2 = {};
    //     arr1 = this.returnHtmlData.split("&");
    //     // console.log(121, arr1)
    //     arr1.forEach((item, index) => {
    //       let arr2 = [];
    //       let obj1 = {};
    //       if (this.flag == "cb") {
    //         arr2 = item.substr(0, item.length - 1).split(",");
    //       } else {
    //         arr2 = item.split(",");
    //       }
    //       console.log(999, thsi.flag, arr2);

    //       arr2.forEach((item1, index1) => {
    //         // console.log(7878, index1)
    //         obj1[newArr[index1].prop] = item1;
    //       });
    //       // console.log(999, obj1)
    //       this.tableData.push(obj1);
    //     });
    //     console.log(121, this.tableData);
    //   }
    // },
  },
  activated() {},
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
// .bank_grid_comtent_active {
//   border: 1px solid #fff;
//   background: #0563c8;
//   color: #fff;
// }
.clookBaoMing {
  background: white;
  margin: 0 auto;
  .headerClick {
    background: #409eff;
    color: white;
    height: 70px;
    line-height: 70px;
    padding: 10px 0;
    // padding:10px 5%;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }
  .tableBox {
    // padding:10px 5%;
    margin-top: 70px;
  }
}
</style>
