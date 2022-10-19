<!--
 * @Author: your name
 * @Date: 2020-11-14 14:08:27
 * @LastEditTime: 2021-10-08 18:32:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\views\publication\editJournal\browsing\index.vue
--> 
<template>
  <!-- 来搞浏览 -->
  <div class="check">
    <div class="searchContent" style="margin: 15px 0;display:flex">
      <el-select v-model="pubNmListSelect" @change="selectChange" clearable>
        <el-option v-for="item in options" :key="item.value" :label="item" :value="item"></el-option>
      </el-select>
      <div v-if="BtnList">
        <el-button type="primary" @click="goDetail">采编组刊</el-button>
        <el-button type="danger" @click="delList">删除</el-button>
        <el-button type="primary" @click="getRefresh">刷新</el-button>
      </div>
    </div>
    <m-table :tableRowClassNames="tableRowClassName" @refresh="loadData" @cellClick="cellClick" @select="selectRow" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true" :searchData="searchForm"></m-table>
    <el-dialog title="刊物" :visible.sync="showFlowChart" v-if="showFlowChart">
      <el-form ref="RefForm" :model="formData" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="拟投稿刊物" prop="pubNm">
              <el-select v-model="pubNmList" placeholder="请选择" @change="pubNmchange($event)">
                <el-option v-for="item in options" :key="item.value" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拟投稿栏目" prop="pubColumnNm">
              <el-select v-model="formData.pubColumnNm" placeholder="请选择" @click.native="pubColumnNmchange">
                <el-option v-for="item in options2" :key="item.value" :label="item.value" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="buttonContent" slot="footer">
        <div>
          <el-button type="primary" @click="goEditGroup">确定</el-button>
          <el-button type="primary" @click="noSure">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法

export default {
  name: 'editRentindex',
  components: {
    mTable,
  },
  mixins: [bianhanPublic],
  data() {
    return {
      curUserCode: JSON.parse(localStorage.getItem('userInfo')).humanCode,
      options: [], //下拉数据
      options1: [],
      options2: [],
      BtnList: true,
      pubEditUidList: '', //储存所有的编辑人员
      pubTopEditUidList: '', //储存所有高级编辑人员
      showFlowChart: false, //弹窗
      SumpubNmList: [], //初始页面数据
      pubNmList: '', //点击采编组刊的刊物
      pubNmListSelect: '', //下拉选择框的刊物
      pubColumnNmList: [], //拟稿栏目
      tableData: [],
      searchForm: {
        journalTypeId: '', //刊物名称
        createOrgId: ''
      },
      listData: [], //批量勾选的数据
      formData: {
        pubNm: '',
        pubColumnNm: '',
        id: '',
      },
      rules: {
        pubNm: [{ required: true, message: '不能为空', trigger: 'change' }],
        pubColumnNm: [{ required: true, message: '不能为空', trigger: 'change' }],
      },
      tableCols: [
        { label: '编辑时间', prop: 'editTime' },
        { label: '总期号', prop: 'totalIssue' },
        { label: '期号', prop: 'issue' },
        { label: '当前环节', prop: 'curNodeName' },
        { label: '标题', prop: 'title' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0, //共有条数
      },
    }
  },
  created() {
    this.loadData()
    this.getnigaoList()
  },
  methods: {
    tableRowClassName(row) {
      console.log(row.isRead)
      if (row.isRead !== '1' && row.curUserId == this.curUserCode && row.curNodeName !== '处理完毕【办结】') {
        console.log(222)
        return 'warning-row'
      }
    },
    //采编刊物
    goDetail() {
      this.showFlowChart = true
    },
    //刷新
    getRefresh() {
      this.loadData()
    },
    //确定按钮
    goEditGroup() {
      this.$refs['RefForm'].validate((valid) => {
        if (valid) {
          this.showFlowChart = false
          let objList = JSON.stringify(this.formData)
          this.$intent.goNewPage(this, {path: '/publication/editJournal/editJournal/editRent/editingGroup', query: {
            EditGroupList: objList,
          }
          })
        }
      })
    },
    //取消
    noSure() {
      this.showFlowChart = false
    },
    //删除按钮
    delList() {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
      })
        .then((res) => {
          if (this.listData.length == 1) {
            let delData = this.listData[0]
            if (delData.mainContext) {
              delData.mainContext = JSON.parse(delData.mainContext)
            }
            if (delData.gaojianId) {
              delData.gaojianId = JSON.parse(delData.gaojianId)
            }
            if (delData.curNodeName == '刊物采编') {
              this.$api.pubStatistics.JointPublicationListDel(delData).then((res) => {
                this.loadData()
                this.$message({
                  type: 'success',
                  message: '删除成功！',
                })
              })
            } else {
              this.$message({
                type: 'error',
                message: '只有刊物采编可删除',
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: '请选择一条数据',
            })
          }
        })
        .catch(() => {})
    },
    //复选框
    selectRow(rows) {
      this.listData = rows
    },
    // 下拉框的值改变时
    selectChange(val) {
      let list = val
      let obj = {}
      obj = this.options1.find((item) => {
        return item.pubNm === list
      })
      this.$api.pubStatistics
        .JointPublicationList(
          { journalTypeId: obj.pubMgId, createOrgId: JSON.parse(localStorage.getItem('userInfo')).unitId},
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    //拟稿刊物类型下拉触发
    pubNmchange(val) {
      var list = val.replace('(上级行)', '')
      let obj = {}
      obj = this.options1.find((item) => {
        return item.pubNm === list
      })

      // let stepJudge = JSON.parse(localStorage.getItem('userInfo')).humanCode
      // let pubPeople = obj.pubEditUnm + obj.pubTopEditUnm
      // if (pubPeople.indexOf(stepJudge) > -1) {
      // }

      this.formData.pubNm = list
      this.pubNmList = val
      this.formData.pubMgId = obj.pubMgId
      this.options2 = obj.pubColumnNm.split(',')
      // 重新选择刊物时置空投稿栏目
      this.formData.pubColumnNm = ''

      this.formData.id = obj.pubMgId
      // this.pubColumnNmList = []
      // let str = []
      // str = this.SumpubNmList.filter((item, index) => {
      //   return item.pubMgId == val
      // })
      // str.forEach((item) => {
      //   this.formData.pubNm = item.pubNm
      //   this.pubColumnNmList = item.pubColumnNm.split(',')
      // })
      // this.formData.pubColumnNm = ''
    },
    //栏目触发
    pubColumnNmchange() {
      if (!this.formData.pubNm) {
        this.$message({
          type: 'warning',
          message: '请先选择刊物类型',
        })
      }
    },
    // 当前行
    cellClick(row) {
      /* if(row.mainContext){
        row.mainContext=JSON.parse(row.mainContext)
      }
       if(row.gaojianId){
        row.gaojianId=JSON.parse(row.gaojianId)
      }  */
      //let obj=JSON.stringify(row)
        this.hasOpened(row.pdnId,{
            'path':'/publication/editJournal/editJournal/editRent/editingGroup',
            'query': { pdnId: row.pdnId,id:row.pdnId}
          })
     // this.$intent.goNewPage(this, {path:'/publication/editJournal/editJournal/editRent/editingGroup', query:{pdnId: row.pdnId,}})
    },
    loadData() {
    this.searchForm.createOrgId = JSON.parse(localStorage.getItem('userInfo')).unitId
      this.$api.pubStatistics
        .JointPublicationList(this.searchForm, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    //合刊刊物类型
    getnigaoList() {
      // 查询框接口
      this.$api.pubStatistics
        .checkSearchParams({
          searchType: 'Mine',
          remark1: JSON.parse(localStorage.getItem('userInfo')).humanCode,
        })
        .then((res) => {
          /**
           * @Author: libo
           * @Date: 2021-01-26 11:17
           * @LastEditTime: 2021-01-26 11:15:20
           */
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

          this.options1 = res.data
          // ======
          this.SumpubNmList = res.data
          let pubEditUidData = []
          let pubTopEditUidData = []
          res.data.forEach((item) => {
            pubEditUidData.push(item.pubEditUid)
            pubTopEditUidData.push(item.pubTopEditUid)
          })
          this.pubEditUidList = pubEditUidData.join(',') //储存所有的编辑人员
          this.pubTopEditUidList = pubTopEditUidData.join(',') //储存所有高级编辑人员
          this.getauto()
        })
    },
    //是否可见上面按钮
    getauto() {
      let stepJudge = JSON.parse(localStorage.getItem('userInfo')).humanCode
      /* let unitInfoList=[]//储存当前登录人所有部门信息
      unitInfoList=JSON.parse(localStorage.getItem("unitInfo"));
      let AllunitInfo=[]//当前登录人机构同一机构下部门
      AllunitInfo=unitInfoList.filter(item=>{
        return item.unitId=stepJudge
      })
      AllunitInfo.forEach(item=>{
        
         
      }) */
      if (
        this.pubEditUidList.indexOf(stepJudge) > -1 ||
        this.pubTopEditUidList.indexOf(stepJudge) > -1
      ) {
        this.BtnList = true
      }
      //判断是否是管理员
      let humanRoleList = JSON.parse(localStorage.getItem('tcHumanRole'))
      humanRoleList.map((node) => {
        if (node.dicId == 382) {
          this.BtnList = true
        }
      })
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.dialogContent {
  width: 60%;
  position: relative;
  margin: 0 auto 30px;
  box-sizing: border-box;
  margin-top: -180px;
}
.seleContent {
  display: flex;
  justify-content: space-around;
}
.buttonContent {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.searchContent {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>



