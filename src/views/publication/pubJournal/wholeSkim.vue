<!--
 * @Author: your name
 * @Date: 2020-10-24 09:51:32
 * @LastEditTime: 2021-10-09 15:24:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\views\publication\pubJournal\wholeSkim.vue
--> 
<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-select v-model="searchData.value" @change="selectChange" clearable>
        <!-- <el-option v-for="item in options" :key="item.value" :label="item.pubNm" :value="item.pubMgId"> -->
        <el-option v-for="item in options" :key="item.value" :label="item" :value="item"></el-option>

        <!-- </el-option> -->
      </el-select>
    </div>
    <m-table @refresh="loadData" @cellClick="cellClick" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection='true' :searchData="searchData"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import dateFormate from '@/util/filters.js'

export default {
  name: 'wholeSkim',
  components: {
    mTable,
  },
  data() {
    return {
      searchData: {},

      chooseItem: '',
      tableData: [],
      tableCols: [
        {
          label: '发布日期',
          prop: 'pubTime',
          formatter(row) {
            return row.pubTime == '' || row.pubTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.pubTime)))
          },
        },
        {
          label: '编辑日期',
          prop: 'editTime',
          formatter(row) {
            return row.editTime == '' || row.editTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.editTime)))
          },
        },
        { label: '刊物名称', prop: 'title' },
        { label: '期号', prop: 'issue' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
      options1: [],
      //正文
      showDraft: false,
      draftFlag: 'viewFile', //正文类型 默认空白文档
      zhengWenState: '',
      draftInfo: {
        fileName: '',
        filePath: '',
      },
      readFlag: '',
      saveOrUpdateSW: {
        function: 'doStartWfe',
        id: '',
      },
      active: '#wjys',
      scrollIntoViewOptions: {
        block: 'start',
        behavior: 'smooth',
      },
    }
  },
  mounted() {
    this.$api.pubStatistics.checkSearchParams({ searchType: 'MyAndParent' }).then((res) => {
      this.options = res.data

      let arr = []
      let arr1 = []
      let ownerId = JSON.parse(localStorage.getItem('userInfo')).unitId

      this.options.forEach((item) => {
        if (item.pubTyp === '02' && item.creatOrgId !== ownerId) {
          arr.push(item.pubNm + '(上级行)')
        } else {
          arr1.push(item.pubNm)
        }
      })
      let list = [...arr, ...arr1]
      this.options = list
      console.log(this.options)
      this.options1 = res.data
    })
  },

  methods: {
    // 下拉框的值改变时
    selectChange(e) {
      let obj = {}
      obj = this.options1.find((item) => {
        return item.pubNm === e
      })
      this.chooseItem = obj.pubMgId
      console.log(this.chooseItem)
      this.loadData()
    },
    loadData() {
      // console.log(this.searchData)
      let unitInfoArrays = JSON.parse(localStorage.getItem('unitInfo'))
      let userInfoData = JSON.parse(localStorage.getItem('userInfo'))
      let options = []
      for (let i in unitInfoArrays) {
        if (unitInfoArrays[i].unitId === userInfoData.unitId) {
          options.push(unitInfoArrays[i].currUnitId)
        }
      }
      let now = userInfoData.unitId + ',' + options.join(',')
      console.log(now)
      //       * sendOrgIds 本人的机构+所有部门用，隔开
      // * type “1” 固定
      // * infoTypeNo 刊物类型参数，筛选条件 可以为空

      this.$api.pubStatistics
        .getTableList(
          {
            infoTypeNo: this.chooseItem ? this.chooseItem : '',
            sendOrgIds: now,
            type: '1',
            ...this.searchData,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          let data = res.data
          this.tableData = data //不过滤
          // this.tableData = data.filter((item => {
          //   return item.pubTime !== ''
          // })) //过滤
        })
    },
    cellClick(row) {
      this.drafting(row)
    },
    drafting() {
      console.log('跳转到当前刊物文档文件（Word）')
      // this.$router.push({
      //   path: '/publication/pubJournal/byEntry/dailyNews',
      // })
      // let data = this.$router.resolve({
      //   path: '/openAndSave_Word',
      //   query: {
      //     state: this.zhengWenState != 1 ? 'viewFile' : this.draftFlag,
      //     zhengWenState: this.zhengWenState,
      //     JYcode: this.$businessCode.swglfj,
      //     multiTenancyId: this.fromdata.multiTenancyId,
      //     relativePath: res ? res.filePath : '',
      //     fileName: res ? res.fileName : '',
      //     showBtns: false,
      //   },
      // })
      // this.$forceUpdate()
      // window.open(data.href, '_blank')
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>




