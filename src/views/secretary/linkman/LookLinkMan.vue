<!--
 * @Author: wy
 * @Date: 2020-10-13 10:17:27
 * @LastEditTime: 2020-10-15 15:00:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\secretary\linkman\LookLinkMan.vue
--> 
<template>
  <div class="LookLinkMan">
    <div :style="{margin:'6px 0'}">
      <el-button type="primary" @click="addPage">起草</el-button>
      <el-button type="danger" @click="delLinkMan">删除</el-button>
    </div>
    <el-dialog title="选择拟稿部门" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="部门" prop="selectDept" style="margin-left:35%;margin-top:15px">
          <el-select v-model="selectDept" placeholder="请选择" @change="change(selectDept)">
            <el-option
              v-for="item in deptList"
              :key="item.firstUnitId"
              :label="item.unitNames"
              :value="item.humanId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="canselBtn">取消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
    <m-table
      ref="linkManTab"
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="selectRow"
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isHandle="false"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>
<script>
import mTable from "@/components/table/tTable";
export default {
  name: "LookLinkMan",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      selectDept: "", //部门
      deptList: [], //部门的信息
      //表格排序
      searchData: {
        sort: "",
        sortKey: ""
      },
      draftOrganId: "",
      listData: [],
      tableData: [],
      tableCols: [
        { label: "报送日期", prop: "sendTime" },
        { label: "报送单位", prop: "sendUnit" },
        { label: "联系人姓名", prop: "contactPersonName", width: 150 },
        { label: "联系人职务", prop: "contactPersonJob", width: 150 },
        { label: "联系人手机", prop: "contactPersonPhone" },
        { label: "联系人办公电话", prop: "contactPersonTel" },
        { label: "联系人邮箱", prop: "contactPersonMail" },
        { label: "状态", prop: "openFlag", width: 100 }
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      }
    };
  },
  computed: {},
  methods: {
    loadData() {
      this.$api.secreatary.linkMan
        .getLinkManList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.tableData = res.data;
          this.pagination.total = res.total;
          res.data.map(item => {
            if (item.openFlag === "1") {
              item.openFlag = "未提交";
            } else if (item.openFlag === "2") {
              item.openFlag = "已提交";
            }
          });
        });
    },
    //表格事件
    cellClick(row) {
      this.$router.push({
        path: "/secretary/linkman/linkForm",
        query: {
          id: row.id
        }
      });
    },
    //拟稿部门确定
    handleSave() {
      if (this.deptList.length == 0) {
        return this.$message.error("请选择部门");
      } else {
        this.$router.push({
          path: "/secretary/linkman/linkForm",
          query: { deptDetail: this.deptDetail, type: "LookLinkMan" }
        });
      }
    },
    //获取拟稿部门
    addPage() {
      this.$api.secreatary.linkMan.departMentLinkMan({}).then(res => {
        this.deptList = res.result;
        this.selectDept = this.deptList[0].humanId;
        let select1 = {};
        this.deptList.forEach(item => {
          if (item.humanId == this.selectDept) {
            select1 = item;
          }
        });
        this.deptDetail = JSON.stringify(select1);
      });
      this.dialogFormVisible = true;
    },
    change(p) {
      let select = {};
      this.deptList.forEach(item => {
        if (item.humanId == p) {
          select = item;
        }
      });
      this.deptDetail = JSON.stringify(select);
      this.$forceUpdate();
    },
    //取消
    canselBtn() {
      this.dialogFormVisible = false;
    },
    //删除
    delLinkMan() {
      // let arr = [];
      // this.listData.map(item => {
      //   arr.push(item.id);
      // });
      // if (this.listData.length >= 1) {
      //   this.$api.secreatary.linkMan
      //     .delLinkMan({ id: arr.join(",") })
      //     .then(res => {
      //       this.loadData();
      //       this.$message({
      //         type: "success",
      //         message: "删除成功！"
      //       });
      //     });
      // } else {
      //   this.$message({
      //     type: "warning",
      //     message: "请选择数据"
      //   });
      // }
      console.log(this.draftOrganId, "this.draftOrganId");

      
      if (this.draftOrganId == "U010000") {
        //是否总行，总行可以删除 选中的所有数据
        
        if (this.listData.length >= 1) {

          let strList = this.listData.map(item => item.id).filter(item => item);
          this.$api.secreatary.linkMan
            .delLinkMan({ id: strList.join(",") })
            .then(res => {
              this.loadData();
              this.$message({
                type: "success",
                message: "删除成功！"
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: "请选择数据"
          });
        }
      } else {
        let arrList = this.listData.filter(item => {
          return item.id && item.openFlag == "未提交";
        });
        if (this.listData.length >= 1) {
          if (arrList.length >= 1) {
            let strList = [];
            arrList.forEach(item => {
              strList.push(item.id);
            });
            this.$api.secreatary.linkMan
              .delLinkMan({ id: strList.join(",") })
              .then(res => {
                this.loadData();
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
              });
          } else {
            this.$message({
              type: "warning",
              message: "只能删除未提交的数据"
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请选择数据"
          });
        }
      }
      // let arrList = this.listData.filter(item => {
      //   return item.id && item.openFlag == "未提交";
      // });
      // if (this.listData.length >= 1) {
      //   if (arrList.length >= 1) {
      //     let strList = [];
      //     arrList.forEach(item => {
      //       strList.push(item.id);
      //     });
      //     this.$api.secreatary.linkMan
      //       .delLinkMan({ id: strList.join(",") })
      //       .then(res => {
      //         this.loadData();
      //         this.$message({
      //           type: "success",
      //           message: "删除成功！"
      //         });
      //       });
      //   } else {
      //     this.$message({
      //       type: "warning",
      //       message: "只能删除未提交的数据"
      //     });
      //   }
      // } else {
      //   this.$message({
      //     type: "warning",
      //     message: "请选择数据"
      //   });
      // }
    },
    //复选框
    selectRow(rows) {
      this.listData = rows;
    }
  },
  mounted() {
    this.loadData();
  },
  created() {
    this.draftOrganId = JSON.parse(localStorage.getItem("userInfo")).unitId;
  }
};
</script>
<style scoped lang='less' rel='stylesheet/less'>
.LookLinkMan {
  min-height: 100vh;
}
</style>
