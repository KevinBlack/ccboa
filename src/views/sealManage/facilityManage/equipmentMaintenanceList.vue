<template>
  <div class="equipment">
    <div class="draft">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="待办" name="todo">
          <el-col class="mt20end">
            <el-button type="primary" @click="draft">起草用印机设备维护审批</el-button>
            <!-- <span
              style="color:red;margin-left: 14px;font-size: 14px;"
            >系统试运行期间，新系统只支持本行内业务流转，跨行业务请到原OA3.6中办理</span> -->
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已办" name="havetodo"></el-tab-pane>
        <el-tab-pane label="办结" name="end"></el-tab-pane>
      </el-tabs>
      <m-table
        @refresh="loadData()"
        @cellClick="cellClick"
        size="medium"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection="true"
        :tableRowClassNames="tableRowClassName"
      ></m-table>
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
    </div>
  </div>
</template>
<script>
import mTable from '@/components/table/tTable'
export default {
  data () {
    return {
      value: '',
      draftOrganOption: [],
      dialogVisible: false,
      clickId: '',
      listQuerry: {
        sort: '',
        sortKey: '',
        clLx: '待办'
      },
      activeTab: 'todo',
      tableData: [

      ],
      tableCols: [
        { label: '印章设备名称', prop: 'deviceName' },
        { label: '设备型号', prop: 'deviceType' },
        { label: '机构名称', prop: 'draftOrgan' },
        { label: '维护类型', prop: 'maintainType' },
        { label: '申请人', prop: 'sqPerson' },
        { label: '环节', prop: 'currentNode' },
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
  },
  methods: {
    tableRowClassName(row) {
      if (row.isreadflag == '0') {
        return 'warning-row'
      }
    },
    departSure () {
      let depName = this.draftOrganOption.filter(item => {
        return item.id == this.value
      })
      this.$intent.goNewPage(this, {
        path: '/sealManage/facilityManage/approval',
        query: { depId: this.value, depName: depName[0].name }
      })
    },

    draft () {
      this.$api.sealManage.useSealMaintain.getDepBeforeDraft({})
        .then(res => {
          if (res.data.length == 1) {
            console.log(res.data, '111')
            this.$intent.goNewPage(this, {
              path: '/sealManage/facilityManage/approval',
              query: { depId: res.data[0].currUnitId, depName: res.data[0].unitNames }
            })
          } else {
            this.draftOrganOption = res.data.map(item => {
              return { name: item.unitNames, id: item.currUnitId }
            })
            this.dialogVisible = true
            this.$forceUpdate()
          }
        })

    },
    del () {

    },
    loadData () {
      this.$api.sealManage.useSealMaintain.listUseSealMaintain(this.listQuerry,
        {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then(res => {
          if(this.listQuerry.clLx == '办结' || this.listQuerry.clLx == '已办'){
            res.data.map((item) => {
              item.isreadflag = '1'
            })
          }
          this.tableData = res.data
          this.pagination.total = res.total
        })
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
        query: {id:id,type: this.listQuerry.clLx}
      });
      window.open(routeData.href, "_blank");
      
    },
    cellClick (row) {
      this.clickId = row.id
      // this.$intent.goNewPage(this, {
      //   path: "/sealManage/facilityManage/approval",
      //   query: { id: this.clickId, type: this.listQuerry.clLx}
      // });
      // 不允许打开同一页面
      this.handleOpenPage("/sealManage/facilityManage/approval", row.id);
    },
    handleClick (tab, event) {
      switch (tab.label) {
        case '全部':
          this.listQuerry.clLx = '全部';
          break;
        case '待办':
          this.listQuerry.clLx = '待办';
          break;
        case '已办':
          this.listQuerry.clLx = '已办';
          break;
        case '办结':
          this.listQuerry.clLx = '办结';
          break;
        default:
          this.listQuerry.clLx = '';
          break;
      }
      this.loadData()
    }
  },
  created () {
    this.loadData()
  }

}
</script>
<style  scoped lang="less" rel="stylesheet/less">
.mt20end {
  margin: 20px 0;
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
}
</style>
