<template>
  <div class="personnel">
    <el-form :model="formData" label-width="120px">
      <baseSearchForm ref="baseSearchForm" @reset="reset" @submit="submit">
        <el-col slot="oneLine" :span="18">
          <el-row>
            <el-col :span="6">
              <el-form-item label="值班状态:">
                <el-checkbox-group v-model="formData.dutyStatuses">
                  <el-checkbox v-for="item in dutyStatusList" :label="item.dutyStatusId" :key="item.dutyStatusId">{{item.dutyStatusName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="值班类型:">
                <el-checkbox-group v-model="formData.dutyTypes">
                  <el-checkbox v-for="item in dutyTypeList" :label="item.dutyTypeId" :key="item.dutyTypeId">{{item.dutyTypeName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </baseSearchForm>
      <el-col :span="6">
        <el-button type="primary" @click="toAdd">新增</el-button>
        <el-button type="danger" @click="toDelete">删除</el-button>
      </el-col>
    </el-form>
    <m-table
      ref="dutyManTab"
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>
<script>
    import mTable from "components/table/tTable";
    import baseSearchForm from "components/form/baseSearchForm";
    import selectOrgOrDept from "components/select/selectOrgOrDept";

    export default {
        components: {
            mTable,
            baseSearchForm
        },
        props: {},
        data() {
            return {
                dutyManList: [],
                dutyStatusList:[{"dutyStatusId":"0","dutyStatusName":"暂不排班"},
                    {"dutyStatusId":"1","dutyStatusName":"排班"}],
                dutyTypeList:[{"dutyTypeId":"0","dutyTypeName":"工作日值班"},
                    {"dutyTypeId":"1","dutyTypeName":"周末值班"},
                    {"dutyTypeId":"2","dutyTypeName":"节假日值班"},
                    {"dutyTypeId":"3","dutyTypeName":"春节值班"}],
                selectRows: [],
                region: "",
                formData: {
                    dutyStatuses:[],
                    dutyTypes:[],
                    dutyStatus:'',
                    dutyType:'',
                    depId: JSON.parse(localStorage.getItem("userInfo")).unitId
                },
                tableData: [],
                tableCols: [
                    { label: "姓名", prop: "humanName" },
                    { label: "机构", prop: "depName" },
                    { label: "值班状态", prop: "dutyStatusStr" },
                    { label: "电话", prop: "dutyTel" },
                    { label: "备注", prop: "remark" },
                    { label: "创建人", prop: "createHumanName" },
                    { label: "创建时间", prop: "createTime" },
                    { label: "修改人", prop: "updateHumanName" },
                    { label: "修改时间", prop: "updateTime" },
                ],
                pagination: {
                    pageNum: 1,
                    pageSize: 10,
                },
            };
        },
        methods: {
            reset () {
                this.formData = {
                    dutyStatuses:[],
                        dutyTypes:[],
                        dutyStatus:'',
                        dutyType:'',
                        depId: JSON.parse(localStorage.getItem("userInfo")).unitId
                }
                this.loadData()
            },
            submit (params) {
                this.loadData()
            },
            loadData() {

                this.formData.dutyType= this.formData.dutyTypes.join(',')
                this.formData.dutyStatus= this.formData.dutyStatuses.join(',')
                console.log('this.formData', this.formData);

                this.$api.secreatary.dutyWork.listDutyMan(this.formData, {
                    PAGE_JUMP: this.pagination.pageNum,
                    REC_IN_PAGE: this.pagination.pageSize
                }).then(res => {
                    // 时间格式转换
                    res.data.map(item=>{
                        item.createTime = formatData(item.createTime, "YYYY-MM-DD hh:mm:ss");
                    })
                    this.tableData = res.data;
                    this.pagination.total = res.total
                })
            },
            cellClick (row) {
                this.$router.push({
                    path: '/secretary/dutyWork/addPersonnel',
                    query: {
                        detail:JSON.stringify(row)
                    }
                })
            },
            select(rows) {
                this.selectRows = rows;
            },
            toAdd() {
                this.$intent.go(this, {path: "/secretary/dutyWork/addPersonnel"})
            },
            toDelete() {
                console.log("--------->", this.selectRows);
                if (this.selectRows.length == 0) {
                    this.$message({type: "error", message: "请先选择要删除的记录！"})
                    return
                }
                this.$confirm("是否要删除选中的记录?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let idsArr = [];
                    this.selectRows.forEach(item => {
                        idsArr.push(item.id);
                    });
                    this.$api.secreatary.dutyWork.deleteDutyMan({id: idsArr.join(",")}).then(res => {
                        if (res && res.code=='SUCCESS') {
                            this.$message({
                                type: "success",
                                message: res.msg,
                            });
                        }else{
                            this.$message({
                                type: "failed",
                                message: res.msg,
                            });
                        }
                        this.loadData()
                    })
                })

            },
        },
        created() {
            this.loadData();
        },
    };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .cSpace {
    width: 100%;
    height: 20px;
  }
</style>


