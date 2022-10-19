<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-button type="danger" style="margin-left:20px;" @click="remove">删除</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="writeManuscript">撰写稿件</el-button>
    </div>
    <m-table @refresh="loadData" @select="select" :isSelection="true" @cellClick="detailsSkip" :isIndex="true" :isHandle="false" :searchData="searchData" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :tableRowClassNames="tableRowClassName"></m-table>
    <!-- @select="select" 
      :isSelection="true"  -->
    <!-- <m-table
      @refresh="loadData"
      @cellClick="jumpdeal"
      :isIndex="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :tableRowClassNames="tableRowClassName"
    ></m-table> -->
    <el-dialog class="popupCase" :visible.sync="showChosDept" :modal-append-to-body="false" :close-on-click-modal="false" title="选择部门">
      <el-form>
        <el-form-item>
          <el-col :span="24">
            <el-select @change="chooseDepartment" v-model="searchDataInfo" placeholder="选择部门" style="width:100%">
              <el-option v-for="item in options" :key="item.currUnitId" :label="item.unitNames" :value="item.currUnitId"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showChosDept = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import Vue from 'vue'
import dateFormate from '@/util/filters.js'

export default {
  name: 'check',
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      test: true,
      curUserCode: JSON.parse(localStorage.getItem('userInfo')).humanCode,
      optionsLength: Number,
      currUnitId: '',
      currUnitCode: '',
      showChosDept: false, //部门选择dialog
      options: [], //部门下拉label
      searchData: {},
      tableData: [],
      tableCols: [
        {
          label: '编辑日期',
          prop: 'editTime',
          formatter(row) {
            return row.editTime == '' || row.editTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.editTime)))
          },
        },
        { label: '管理机构', prop: 'manageOrgNm' },
        { label: '投稿刊物', prop: 'pubNm' },
        { label: '标题', prop: 'title' },
        {
          label: '状态',
          prop: 'pubStaut',
          formatter(row) {
            if (row.pubStaut == '已投稿' && row.cyStaut !== '未采用') {
              return row.cyStaut
            } else {
              return row.pubStaut
            }
          },
        },
        { label: '当前处理人', prop: 'curUsernm' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      value1: '',
      deleteArry: [], //删除数据id 集合
      deldata: {},
      searchDataInfo: '',
      searchDataInfoPath: '',
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    tableRowClassName(row) {
      if (row.haveRead !== '1' && row.curUserid == this.curUserCode) {
        return 'warning-row'
      }
    },
    //列表初始化删除
    remove() {
      let that = this
      that.deldata.map(function (value, index) {
        if (value.pubStaut != '撰稿') {
          Vue.prototype.$message.error('只能删除状态为撰稿的数据')
          return
        } else {
          that.$api.paraMeter.ManuscriptListdel({ gIdArr: that.deleteArry }).then((res) => {
            if (res.code == 'SUCCESS') {
              that.$message({
                message: '删除成功',
                type: 'success',
              })
            }
            that.options = []
            that.loadData()
          })
        }
      })
    },
    // 选择部门
    chooseDepartment(e) {
      let obj = {}
      obj = this.options.find((item) => {
        return item.currUnitId === e
      })
      this.searchDataInfoPath = obj.shortFirstUnitName
      this.currUnitCode = obj.firstUnitId
      this.currUnitId = obj.currUnitId
    },
    //撰写稿件
    writeManuscript() {
      this.options = []
      const unitInfoArrays = JSON.parse(localStorage.getItem('unitInfo'))
      const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
      for (const i in unitInfoArrays) {
        if (unitInfoArrays[i].unitId === userInfoData.unitId) {
          this.options.push(unitInfoArrays[i])
        }
      }
      this.optionsLength = this.options.length
      if (this.optionsLength == 1) {
        console.log(this.options[0], '获取部门信息')
        this.searchDataInfoPath = this.options[0].firstUnitName
        this.currUnitCode = this.options[0].firstUnitId
        this.currUnitId = this.options[0].currUnitId
      }
      this.searchDataInfo = this.options[0].firstUnitName
        this.searchDataInfoPath = this.options[0].firstUnitName
        this.currUnitCode = this.options[0].firstUnitId
        this.currUnitId = this.options[0].currUnitId
      console.log(this.optionsLength)
      if (this.optionsLength == 1) {
        this.$intent.goNewPage(this, {
          path: '/publication/tgMangement/wriScript/repairScript',
          query: {
            shortFirstUnitName: this.searchDataInfoPath,
            currUnitCode: this.currUnitCode,
            currUnitId: this.currUnitId,
            closeCondition: 'new'
          },
        })
      } else {
        this.showChosDept = true
      }
    },
    //确定
    confirm() {
      if (this.searchDataInfo == '') {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请选择部门',
          duation: 100,
        })
      } else {
        this.$intent.goNewPage(this, {
          path: '/publication/tgMangement/wriScript/repairScript',
          query: {
            shortFirstUnitName: this.searchDataInfoPath,
            currUnitCode: this.currUnitCode,
            currUnitId: this.currUnitId,
            closeCondition: 'new'
          },
        })
        this.showChosDept  =false
      }
    },
    //列表初始化
    loadData() {
      this.options = []
      this.$api.paraMeter
        .ManuscriptList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
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
        query: {id:id,rowData:id, closeCondition: 'details'}
      });
      window.open(routeData.href, "_blank");
      
    },
    //详情跳转
    detailsSkip(row) {
      // this.$intent.goNewPage(this, {
      //   path: '/publication/tgMangement/wriScript/repairScript',
      //   query: { rowData: row.gId ,closeCondition: 'details'},
      // })
      this.handleOpenPage('/publication/tgMangement/wriScript/repairScript', row.gId)
    },
    select(row) {
      this.deldata = row
      let dataArry = []
      row.map(function (value, index) {
        dataArry.push(value.gId)
      })
      this.deleteArry = dataArry
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.popupCase {
  width: 60%;
  z-index: 2002;
  position: fixed;
  left: calc(50% - 30%);
}
</style>


