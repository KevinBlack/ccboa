<template>
  <div class="facilitylist">
    <div class="draft">
      <!-- <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="本级行" name="sameLevel">
          <div class="searchSession">
            <el-button
              type="primary"
              :style="{ marginLeft: '10px' }"
              @click="insert"
              >新建</el-button
            >
            <el-button
              type="primary"
              :style="{ marginLeft: '10px' }"
              @click="del"
              >删除</el-button
            >
          </div>
        </el-tab-pane>

        <el-tab-pane label="下级行" name="lowerLevel"> </el-tab-pane>
      </el-tabs> -->
      <!-- <el-row v-if="showJGTree" style="margin-bottom: 10px" :gutter="20">
        <el-col :span="6">
          <select-org-or-dept
            @select="selectOrg"
            :orgOrDeptId="this.orgOrDeptId"
          >
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择机构"
              v-model="search.orgName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
      </el-row> -->
      <div class="searchSession">
        <el-button
          type="primary"
          :style="{ marginLeft: '10px' }"
          @click="insert"
          >新建</el-button
        >
        <el-button type="primary" :style="{ marginLeft: '10px' }" @click="del"
          >删除</el-button
        >
      </div>
      <el-dialog title="选择拟稿部门" :visible.sync="dialogVisible">
        <el-form ref="deptForm" label-width="150px">
          <el-form-item label="部门" prop="draftOrgan">
            <el-select v-model="value" placeholder="请选择所属部门" :style="{width:'60%'}">
              <el-option
                v-for="(item,index) in draftOrganOption"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="departSure">确 定</el-button>
        </div>
      </el-dialog>
      <m-table
        @refresh="loadData()"
        @select="select"
        @cellClick="cellClick"
        size="medium"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection="true"
      ></m-table>
    </div>
  </div>
</template>
<script>
import selectOrgOrDept from "components/select/selectOrgOrDept";
import mTable from '@/components/table/tTable'
export default {
  data () {
    return {
      value: '',
      draftOrganOption: [],
      dialogVisible: false,
      showJGTree: false,
      orgOrDeptId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      search: {
        orgName: '',
        unitId: ''
      },
      clickId: '',
      selectId: [],
      params: {
        sort: '',
        sortKey: '',
      },
      activeTab: 'sameLevel',
      searchInfo: {
        name: ''
      },
      tableData: [

      ],
      tableCols: [
        { label: '启用日期', prop: 'useDate' ,width:150},
        { label: '设备名称', prop: 'title' },
        { label: '设备型号', prop: 'deviceType' },
        { label: '使用机构', prop: 'useJg' },
        { label: '设备状态', prop: 'deviceStatus' ,width:100},
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20 
      },
    }
  },
  components: {
    mTable,
    // selectOrgOrDept
  },


  methods: {
    departSure () {
      let depName = this.draftOrganOption.filter(item => {
        return item.id == this.value
      })
      console.log(depName, '筛选选部门')
      this.$intent.goNewPage(this, {
        path: '/sealManage/facilityManage/register',
        query: { depId: this.value, depName: depName[0].name }
      })
    },
    selectOrg (org) {
      this.$set(this.search, 'orgName', org.unitName)
      // this.$set(this.search,'unitId', org.id)
      this.$set(this.params, 'nextUnit', org.id)
      this.pagination = { pageNum: 1, pageSize: 10 };
      this.loadData();
      console.log('111111111111111111111111111111111', org)
    },
    select (row) {
      console.log(row);
      this.selectId = row;
    },
    insert () {
      this.$api.sealManage.useSealMaintain.getDepBeforeDraft({}).then(res => {
          console.log(res, '起草前选部门')
          if (res.data.length == 1) {
            this.$router.push({
              path: '/sealManage/facilityManage/register'
            })
          } else {
            this.draftOrganOption = res.data.map(item => {
              return { name: item.unitNames, id: item.currUnitId }
            })
            this.dialogVisible = true
            this.$forceUpdate()

          }
        })
      // this.$router.push({
      //   path: '/sealManage/facilityManage/register'
      // })
    },
    del () {
      if (!this.selectId) {
        this.$message({
          message: "请选择数据",
          type: "warning",
        });
      } else {
        // let id = [];
        // this.selectRows.map((item) => {
        //   id.push(item.id);
        // });
        let idArr = this.selectId.map(item => item.id)
        let id = idArr.join(',')
        this.$api.sealManage.useSealDevice
          .delRegister({ id })
          .then((res) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.loadData();
          });
      }

    },
    loadData () {
      this.$api.sealManage.useSealDevice.getSamelevel(
        this.params,
        {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        }
      ).then((res) => {
        console.log(res, '本级行数据111111')
        this.tableData = res.data
        this.pagination.total = res.total
      });



    },
    cellClick (row) {
      console.log(row, '列表点击的数据')
      this.clickId = row.id
      this.$router.push({
        path: "/sealManage/facilityManage/register",
        query: { id: this.clickId }
      });
    },
    handleClick (tab, event) {
      if (tab.label == "本级行") {
        this.showJGTree = false
        if (this.params.nextUnit) {
          delete this.params.nextUnit
        };
        this.loadData();
      } else if (tab.label == "下级行") {
        this.showJGTree = true
        this.$set(this.search, "orgName", JSON.parse(localStorage.getItem("userInfo")).unitName)
        this.$set(this.params, "nextUnit", JSON.parse(localStorage.getItem("userInfo")).unitId)
        this.loadData();
      }
    },
  },
  created () {
    this.loadData()
  },
}
</script>
<style  scoped lang="less" rel="stylesheet/less">
/deep/ .tree-div {
  z-index: 99;
}
.draft {
  min-height: 100vh;
  .selectDep {
    padding: 40px 30px 30px 100px;
    .orgInfoTitle {
      margin-bottom: 30px;
      font-size: 30px;
      line-height: 75px;
      color: #3b85f0;
      font-weight: 600;
      text-align: center;
    }
  }

  .searchSession {
    margin-bottom: 10px;
  }
  .el-input {
    width: 258px;
    margin-bottom: 10px;
  }
}
</style>