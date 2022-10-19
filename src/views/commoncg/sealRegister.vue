<template>
  <!-- 这是印章登记页面 -->
  <div class="sealRegister">
    <!-- 操作按钮 -->
    <template>
      <el-tabs @tab-click="handleClick">
        <el-form :inline="true" :model="queryParams" class="demo-form-inline">
          <el-form-item label="印章状态">
            <el-select v-model="queryParams.sealStatus" @change="selectSealStatus">
              <el-option
                v-for="item in allSealStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用日期">
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              :style="{width:'100%'}"
              v-model="queryParams.useDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              :style="{marginLeft:'10px'}"
              type="primary"
              icon="el-icon-search"
              @click="getTableData()"
            >搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              v-for="item in btnList"
              :key="item"
              @click="buttonClick(item)"
              type="primary"
            >{{item}}</el-button>
          </el-form-item>
        </el-form>
      </el-tabs>
    </template>
    <!-- 表格 -->
    <m-table
      @refresh="loadTableData()"
      @cellClick="cellClick"
      @select="selectTableRow"
      :tableData="tableData"
      :tableCols="allTableCols"
      :pagination="pagination"
      :isSelection="true"
      :searchData="searchData"
    ></m-table>

    <!-- 选择起草部门弹框 -->
    <!--
            <el-dialog title="选择登记部门" :visible.sync="dialogVisible" :before-close="handleClose" v-dialogDrag>
            <el-form ref="deptForm" :model="form" label-width="150px" :rules="deptFormRule">
                <el-form-item label="部门" prop="draftOrgan">
                    <el-select v-model="form.draftOrgan" placeholder="请选择所属部门" :style="{width:'80%'}">
                        <el-option v-for="(item,index) in draftOrganOption" :key="index" :label="item.unitNames"
                        :value="item.unitId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="departSure">确 定</el-button>
            </div>
            </el-dialog>
    -->
  </div>
</template>

<script>
// 导入通用表格
import mTable from "@/components/table/tTable";

export default {
  name: "sealRegister",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      //表格数据
      tableData: [],
      //表格选中的数据
      selectTableData: "",
      searchData: {},
      //印章状态
      allSealStatus: [
        { label: "未启用", value: "A01" },
        { label: "启用", value: "A02" },
        { label: "废止", value: "A03" },
        { label: "销毁", value: "A04" },
        { label: "实物档案", value: "A05" }
      ],
      // TODO:以后有接口文档后修改填充数据的字段prop里的值
      allTableCols: [
        { label: "序号", prop: "markNo", width: 150},
        { label: "启用日期", prop: "useDate", width: 150 },
        { label: "废止日期", prop: "desDate", width: 150 },
        { label: "销毁日期", prop: "desDate1", width: 150 },
        { label: "印章简称", prop: "yzJiancheng" },
        { label: "印章状态", prop: "sealStatus", width: 100 },
        { label: "使用单位", prop: "userJg" },
        { label: "是否存放到用印机器", prop: "isLocate", width: 200 }
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      btnList: ["登记", "删除"],
      queryParams: {
        sealStatus: "",
        useDate: ""
      },
      formLabelWidth: "120px",
      orgLevel: "", //判断行级
      //选择拟稿部门弹框
      dialogVisible: false,
      form: {
        draftOrgan: ""
      },
      // 部门容器
      draftOrganOption: [],
      deptFormRule: {
        draftOrgan: [
          { required: true, message: "请选择部门", trigger: "change" }
        ]
      }
    };
  },
  computed: {},
  watch: {
    activeTab(tabVal) {
      // // 如果选择完结，查询年份
      // if (tabVal === 'done') {
      // }
      this.loadTableData();
    }
  },
  methods: {
    handleClick(tab, event) {},
    //表格选中的数据
    selectTableRow(data) {
      console.log("xuanzhonghang-----", data);
      const len = data.length;
      const selectedRowId = [];
      for (let i = 0; i < len; i++) {
        selectedRowId.push(data[i].id);
      }
      this.selectTableData = selectedRowId.join(",");
      console.log("this.selectedRowId-----", this.selectTableData);
    },
    //印章状态
    selectSealStatus(sealStauts) {
      console.log(sealStauts);
      this.queryParams.sealStatus = sealStauts;
    },
    // 点击按钮
    buttonClick(item) {
      if (item === "登记") {
        this.$intent.goNewPage(this, {
          path: "/sealManage/useSeal/draft/sealRegister",
          query: { status: 0 } //此传参无意义，没有query传参会报错误
        });
        //this.isDocument = "3";
        //this.dialogVisible = true;
        //this.draftOrganOption = JSON.parse(localStorage.unitInfo);
        //console.log("部门数据："+this.draftOrganOption);
      } else if (item === "修改") {
        // 判断是否有勾选一条记录
        // if (this.selectTableData.length === 0) {
        //   this.$message({
        //     message: "请先勾选一条记录再进行修改！",
        //     type: "warning",
        //     showClose: true
        //   });
        //   return;
        // }
        // // 跳转到修改页面 // query相当于带查询参数?a=jk&b=2， params相当于#a=2
        // let selects = this.selectTableData[0];
        // console.log("修改选择的记录", selects);
        // this.$router.push({
        //   path: "/sealManage/sealRegisterForm/sealRegisterForm",
        //   query: { Stmp_ECD: selects.Stmp_ECD, sealStatus: selects.sealStatus }
        // });
      } else if (item === "删除") {
        // 判断是否有勾选一条记录
        if (this.selectTableData == "") {
          this.$message({
            message: "请选择数据",
            type: "warning"
          });
        } else {
          let jsonData = {
            id: this.selectTableData
          };
          this.$api.sealManage.sealRegisterForm
            .doDeleteByld(jsonData)
            .then(res => {
              console.log("delSealRegister返回的数据：", res);
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "印章登记删除成功！",
                duration: 2000
              });
              this.loadTableData();
            })
            .catch(err => {
              console.log("印章登记数据删除报错：", err);
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "印章登记删除失败！\n" + err,
                duration: 2000
              });
            });
        }
        // if (this.selectTableData.length === 0) {
        //   this.$message({
        //     message: "请先勾选一条记录再进行删除！",
        //     type: "warning",
        //     showClose: true
        //   });
        //   return;
        // }
        // let selects = this.selectTableData[0];
        // console.log("修改选择的记录", selects);
        // let jsonData = {
        //   id: selects.id
        // };
        // //发送交易
        // this.$api.sealManage.sealRegisterForm
        //   .doDeleteByld(jsonData)
        //   .then(res => {
        //     console.log("delSealRegister返回的数据：", res);
        //     this.$message({
        //       type: "success",
        //       showClose: true,
        //       offset: 400,
        //       message: "印章登记删除成功！",
        //       duration: 2000
        //     });
        //     this.getTableData();
        //   })
        //   .catch(err => {
        //     console.log("印章登记数据删除报错：", err);
        //     this.$message({
        //       type: "success",
        //       showClose: true,
        //       offset: 400,
        //       message: "印章登记删除失败！\n" + err,
        //       duration: 2000
        //     });
        //   });
      }
    },
    // 点击查询按钮
    getTableData() {
      this.tableData = [];
      console.log("查询参数：", this.queryParams);
      let jsonData = {
        sealStatus: this.queryParams.sealStatus,
        useDate: this.queryParams.useDate
      };
      //发送交易
      this.$api.sealManage.sealRegisterForm
        .doSelectAll(
          {
            sealStatus: this.queryParams.sealStatus,
            useDate: this.queryParams.useDate,
            ...this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log("querySealRegister返回的数据：", res.list);
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.tableData.map(item => {
            item.isLocate =
              item.isLocate === "0" ? "否" : item.isLocate === "1" ? "是" : "";
            item.sealStatus =
              item.sealStatus == "A01"
                ? "未启用"
                : "" || item.sealStatus == "A02"
                ? "启用"
                : "" || item.sealStatus == "A03"
                ? "废止"
                : "" || item.sealStatus == "A04"
                ? "销毁"
                : "" || item.sealStatus == "A05"
                ? "实物档案"
                : "";
            console.log(item.sealStatus, "item.sealStatus");
          });
          console.log("表格数据：", this.tableData);
        })
        .catch(err => {
          console.log("报错：", err);
        });
    },
    // table表的方法
    loadTableData() {
      this.$api.sealManage.sealRegisterForm
        .doSelectAll(
          {
            sealStatus: this.queryParams.sealStatus,
            useDate: this.queryParams.useDate,
            ...this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log(res);
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.tableData.map(item => {
            item.isLocate =
              item.isLocate === "0" ? "否" : item.isLocate === "1" ? "是" : "";
            item.sealStatus =
              item.sealStatus == "A01"
                ? "未启用"
                : "" || item.sealStatus == "A02"
                ? "启用"
                : "" || item.sealStatus == "A03"
                ? "废止"
                : "" || item.sealStatus == "A04"
                ? "销毁"
                : "" || item.sealStatus == "A05"
                ? "实物档案"
                : "";
            console.log(item.sealStatus, "item.sealStatus");
          });
          // for (var i = 0; i < res.LIST1.length; i++) {
          //   this.tableData.push(res.LIST1[i]);
          // }
          // console.log("表格数据：", this.tableData);
        });
      // .catch(err => {
      //   console.log("报错：", err);
      // });
    },
    handleOpenPage(path, id, readType, flag) {
      
      let routeId =
        (localStorage.getItem("routeIdList") &&
          JSON.parse(localStorage.getItem("routeIdList"))) ||
        [];
        console.log('routeId',routeId)
      if (routeId.includes(id)) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已经打开了该页面!",
          duration: 1500
        });
        return;
      } 
      const routeData = this.$router.resolve({
        path: path,
        query: {id:id}
      });
      window.open(routeData.href, "_blank");
      
    },
    cellClick(row) {
      console.log("cellClick:", row);
      // this.$intent.goNewPage(this, {
      //   path: "/sealManage/useSeal/draft/sealRegister",
      //   query: { id: row.id }
      // });
      this.handleOpenPage("/sealManage/useSeal/draft/sealRegister", row.id);
    },
    //选择拟稿部门弹框确定
    departSure() {
      console.log(this.form, "okokokokokoko");
      // return false
      let draftOrganName = "";
      this.draftOrganOption.map(item => {
        if (item.unitId === this.form.draftOrgan) {
          draftOrganName = item.unitNames;
        }
      });
      this.$refs.deptForm.validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          console.log(this.form);
          this.$intent.goNewPage(this, {
            path: "/sealManage/useSeal/draft/sealRegister",
            query: {
              unitid: this.form.draftOrgan
              //orgLevel: this.orgLevel
            }
          });
          this.$refs.deptForm.resetFields();
        }
      });
    },
    // 关闭弹框
    handleClose() {
      this.$refs.deptForm.resetFields();
      this.dialogVisible = false;
    }
  },

  // 生命周期created:组件实例创建完成，属性已绑定，但DOM还没生出。此时能取到data数据
  created() {
    // this.getTableData();
    this.loadTableData();
  },
  mounted() {}
};
</script>
