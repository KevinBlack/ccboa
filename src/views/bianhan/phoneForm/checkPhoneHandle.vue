/**
* create by lyl on 2020/12/5 16:13
* 类注释：秘书工作-管理员权限-电话办理单
* 备注：
*/
<template>
  <div class="selectDept">
    <el-tabs v-model="activeName" @tab-click="handelClick">
      <div style="margin-left: 30px;">
        <el-form label-position="right" class="formData" label-width="80px" :model="formData" ref="formData">
          <el-row>
            <el-col :span="8">
              <el-form-item label="编号年份" prop="numYear">
                <el-select v-model="formData.numYear" style="width: 100%;">
                  <el-option
                    v-for="(yearItem, index) in yearList"
                    :key="index"
                    :label="yearItem.label" :value="yearItem.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间" prop="createStartDate">
                <el-date-picker value-format="yyyy-MM-dd" style="width: 80%;" v-model="formData.createStartDate"
                  placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止时间" prop="createEndDate">
                <el-date-picker value-format="yyyy-MM-dd" style="width: 80%;" v-model="formData.createEndDate"
                  placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="通话单位" prop="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="来电人员" prop="callPle">
            <el-input v-model="formData.callPle"></el-input>
          </el-form-item>
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

    <mTable style="margin-top: 30px;" ref="PersonTable" @refresh="loadD" :isSelection="true" @select="selectRow"
      @cellClick="cellClick" :tableData="tableData" :tableCols="tableCols" :pagination="pagination"
      :searchData="searchData" :pageSizeList="[20,30,50,100,200,500]"></mTable>
  </div>
</template>

<script>
  import mTable from "components/table/tTable";
  import exportTable from "@/minixs/exportTable";
  import apis from "@/httpTansun/api/secreatary/phonenote.js";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  export default {
    name: "checkPhoneHandle",
    components: {
      mTable
    },
    mixins:[bianhanPublic],
    data() {
      return {
        yearList: [],
        selectedRowId: "",
        btnType: "1",
        formData: {
          createStartDate: "",
          createEndDate: "",
          callPle: "",
          title: "",
          numYear: ''
        },
        searchNumYear: '', // 列表接口调用时的 formData.numYear 值
        activeName: "0",
        tableCols: [{
            label: "日期",
            prop: "createDate"
          },
          {
            label: "编号",
            prop: "documentNo"
          },
          {
            label: "通话单位",
            prop: "title"
          },
          {
            label: "来电人员",
            prop: "callPle"
          },
          {
            label: "当前环节",
            prop: "currentNode"
          },
          {
            label: "操作人",
            prop: "currentUser"
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
      this.getNumYearList().finally(() => {
        this.loadD();
      })
    },
    methods: {
      getNumYearList() {
        return new Promise((resolve, reject) => {
          this.$api.numYear.getNumYearList().then(res => {
            if (res.code === 'SUCCESS') {
              let yearList = getNumYear_2(res.data)
              this.yearList = [{label: '近两年', value: ''}, ...yearList]
              resolve()
            } else {
              this.yearList = [{label: '近两年', value: ''}]
              reject()
            }
          });
        });
      },
      // 电话记录单删除
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
            apis.conditionDelete(data).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  type: "success",
                  message: res.msg
                })
                this.loadD()
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
        };

        //let createStartDate = this.formData.createStartDate
        //let createEndDate = this.formData.createEndDate
        //this.formData.createStartDate = createStartDate? createStartDate.getFullYear() +"-"+ (createStartDate.getMonth()+1) +"-"+createStartDate.getDate(): ''
        //this.formData.createEndDate = createEndDate ? createEndDate.getFullYear() +"-"+ (createEndDate.getMonth()+1) +"-"+createEndDate.getDate(): ''
        apis
          .adminPhoneHandleList(data, {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          })
          .then(res => {
            if (res.code === "SUCCESS") {
              this.searchNumYear = data.numYear
              this.pagination.total = res.total;
              this.tableData = res.data;
            }
            console.log(res);
          });
      },
      cellClick(row) {
        // this.$intent.goNewPage(this, {
        //   path: "/bianhan/phoneForm/adminHandleDetail",
        //   query: { identify: this.btnType, id: row.id }
        // });
        this.hasOpened(row.id, {
          path: "/bianhan/phoneForm/adminHandleDetail",
          'query': {
            identify: this.btnType,
            id: row.id,
            numYear: this.searchNumYear
          }
        })

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
            this.btnType = "1";
            this.loadD();
            break;
          case "1":
            this.btnType = "2";
            this.loadD();
            break;
          default:
            this.btnType = "1";
            this.loadD();
            break;
        }
        if (tab.index === "1") {
          this.tableCols = [{
              label: "日期",
              prop: "createDate"
            },
            {
              label: "编号",
              prop: "documentNo"
            },
            {
              label: "通话单位",
              prop: "title"
            },
            {
              label: "来电人员",
              prop: "callPle"
            }
          ];
        } else {
          this.tableCols = [{
              label: "日期",
              prop: "createDate"
            },
            {
              label: "编号",
              prop: "documentNo"
            },
            {
              label: "通话单位",
              prop: "title"
            },
            {
              label: "来电人员",
              prop: "callPle"
            },
            {
              label: "当前环节",
              prop: "currentNode"
            },
            {
              label: "操作人",
              prop: "currentUser"
            }
          ];
        }
      },
      onClear() {
        this.formData.numYear = ''
        this.$refs.formData.resetFields();
        console.log(this.$refs.formData);
        console.log(11);
      }
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  .el-input {
    width: 1100px;
  }

  .btn {
    margin-left: 500px;
  }

</style>
