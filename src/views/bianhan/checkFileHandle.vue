/**
* create by lyl on 2020/12/5 16:13
* 类注释：秘书工作-管理员权限-文件办理单列表
* 备注：
*/
<template>
  <div class="selectDept">
    <el-tabs v-model="activeName" @tab-click="handelClick">
      <div style="margin-left: 30px;">
        <el-form
          label-position="right"
          class="formData"
          label-width="80px"
          :model="formData"
          ref="formData"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="编号年份" prop="numYear">
                <el-select
                  v-model="formData.numYearLabel"
                  @change="selectYear"
                  placeholder="近两年"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="yearItem in yearList"
                    :key="yearItem.lavel"
                    :label="yearItem.label"
                    :value="yearItem"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间" prop="createStartDate">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                  v-model="formData.createStartDate"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止时间" prop="createEndDate">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                  v-model="formData.createEndDate"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="文件标题" prop="title">
                <el-input v-model="formData.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="文号" prop="fileCode">
                <el-input v-model="formData.fileCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="search">开始搜索</el-button>
          <el-button type="primary" @click="onClear">重置</el-button>
          <el-button type="danger" @click="deleteDrop">删除</el-button>
        </div>
      </div>
      <el-tab-pane label="流转"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
    </el-tabs>

    <mTable
      style="margin-top: 30px;"
      ref="PersonTable"
      @refresh="loadD"
      :isSelection="true"
      @select="selectRow"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :searchData="searchData"
      :pagination="pagination"
      :pageSizeList="[20,30,50,100,200,500]"
    ></mTable>
  </div>
</template>

<script>
import mTable from "components/table/tTable";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/fileHandle.js";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  name: "checkFileHandle",
  components: {
    mTable
  },
  mixins: [bianhanPublic],
  data() {
    return {
      selectedRowId: "",
      btnType: "1",
      formData: {
        createStartDate: "",
        createEndDate: "",
        title: "",
        hqDept: "",
        numYear: "",
        numYearLabel: "近两年",
        fileCode:''
      },
      yearList: [],
      activeName: "0",
      tableCols: [
        {
          label: "日期",
          prop: "createDate",
          width: 150
        },
        {
          label: "编号",
          prop: "documentNo",
          width: 100
        },
        {
          label: "文件标题",
          prop: "title"
        },
        {
          label: "文号",
          prop: "fileCode",
          width: 150
        },
        {
          label: "来文单位",
          prop: "fromDept",
          width: 200
        },
        {
          label: "当前环节",
          prop: "currentNode",
          width: 150
        },
        {
          label: "操作人",
          prop: "currentUser",
          width: 100
        }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      tableData: [],
      searchData: {}
    };
  },
  created() {
    //获取编号年份用于分表
    this.getNumYearListCommon().then(res => {
      this.yearList = res;
    });
    this.loadD();
  },
  methods: {
    selectYear(val) {
      this.formData.numYear = val.value;
      this.formData.numYearLabel = val.label;
    },
    // 文件办理单删除
    deleteDrop() {
      // console.log(this.selectedRowId)
      if (this.selectedRowId == "") {
        return this.$message({
          type: "warning",
          message: "请选择要删除的数据"
        });
      }
      this.$confirm("是否删除选中数据?", "删除", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          let data = {
            type: "2",
            id: this.selectedRowId
          };
          apis.fileListDelete(data).then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.loadD();
            }
          });
        })
        .catch(error => {});
    },
    search() {
      this.pagination = {
        pageNum: 1,
        pageSize: 20
      };
      this.loadD();
    },
    loadD() {
      const _this = this;
      if (_this.searchData.sortKey == "createDate") {
        _this.searchData.sortKey = "remark1";
      }
      let data = {
        btnType: this.btnType,
        ..._this.formData,
        ..._this.searchData,
        createStartDate:this.formData.createStartDate?this.formData.createStartDate+' 00:00:00':'',
        createEndDate:this.formData.createEndDate?this.formData.createEndDate+' 23:59:59':''
      };

      //let createStartDate = this.formData.createStartDate
      //let createEndDate = this.formData.createEndDate
      //this.formData.createStartDate = createStartDate? createStartDate.getFullYear() +"-"+ (createStartDate.getMonth()+1) +"-"+createStartDate.getDate(): ''
      //this.formData.createEndDate = createEndDate ? createEndDate.getFullYear() +"-"+ (createEndDate.getMonth()+1) +"-"+createEndDate.getDate(): ''
      apis
        .adminFileHandle(data, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.pagination.total = res.total;
            this.tableData = res.data;
          }
          console.log(res);
        });
    },
    cellClick(row) {
      // this.$intent.goNewPage(this, {
      //   name: "fileAdminHandleDetail",
      //   query: { identify: this.btnType, id: row.id }
      // });
      this.hasOpened(row.id, {
        name: "fileAdminHandleDetail",
        query: {
          identify: this.btnType,
          id: row.id,
          numyear: this.formData.numYear
        }
      });
    },
    //选择选项框
    selectRow(data) {
      console.log("xuanzhonghang-----", data);
      const len = data.length;
      const selectedRowId = [];
      for (let i = 0; i < len; i++) {
        selectedRowId.push(data[i].id);
      }
      this.selectedRowId = selectedRowId.join(",");
      console.log("this.selectedRowId-----", this.selectedRowId);
    },
    onLoad() {},
    handelClick(tab) {
      console.log(tab.index);
      switch (tab.index) {
        case "0":
          this.pagination = {
            pageNum: 1,
            pageSize: 20
          };
          this.btnType = "1";
          this.loadD();
          break;
        case "1":
          this.pagination = {
            pageNum: 1,
            pageSize: 20
          };
          this.btnType = "2";
          this.loadD();
          break;
        default:
          this.pagination = {
            pageNum: 1,
            pageSize: 20
          };
          this.btnType = "1";
          this.loadD();
          break;
      }
      if (tab.index === "1") {
        this.tableCols = [
          {
            label: "日期",
            prop: "createDate",
            width: 150
          },
          {
            label: "编号",
            prop: "documentNo",
            width: 150
          },
          {
            label: "文件标题",
            prop: "title"
          },
          {
            label: "文号",
            prop: "fileCode",
            width: 150
          },
          {
            label: "来文单位",
            prop: "fromDept",
            width: 200
          }
        ];
      } else {
        this.tableCols = [
          {
            label: "日期",
            prop: "createDate",
            width: 150
          },
          {
            label: "编号",
            prop: "documentNo",
            width: 100
          },
          {
            label: "文件标题",
            prop: "title"
          },
          {
            label: "文号",
            prop: "fileCode",
            width: 150
          },
          {
            label: "来文单位",
            prop: "fromDept",
            width: 200
          },
          {
            label: "当前环节",
            prop: "currentNode",
            width: 150
          },
          {
            label: "操作人",
            prop: "currentUser",
            width: 100
          }
        ];
      }
    },
    onClear() {
      this.$refs.formData.resetFields();
      this.formData.numYearLabel='近两年'
      console.log(this.$refs.formData);
      console.log(11);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.btn {
  margin-left: 500px;
}
</style>
