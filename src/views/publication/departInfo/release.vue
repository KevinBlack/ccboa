<template>
  <div class="check">
    <el-form ref="formData" :model="formData" label-width="100px">
      <el-row style="margin-bottom: 10px">
        <el-col :span="6">
          <el-form-item label="查询类型:" prop="drafDepNm">
            <el-select v-model="formData.department" style="width:80%" @change="Looktype" placeholder="请选择...">
              <el-option v-for="(item,index) in queryList" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="当前部门:" prop="curDeptId">
            <el-select placeholder="请选择" v-model="searchDataInfo" @change="selectChange" clearable>
              <el-option v-for="item in options" :key="item.value" :label="item.firstUnitName" :value="item.firstUnitId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="formData.department=='类型'">
          <el-form-item label="简报类型:" prop="infoTypeNo">
            <el-select v-model="formData.infoTypeNo" placeholder="请选择" @change="infoTypeNoChange()">
              <el-option v-for="(item, index) in infoTypeNmList" :key="index" :label="item.infoTypeNm" :value="item.infoTypeNo"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="formData.department=='部门'">
          <el-form-item label="拟稿部门:" prop="drafDepId">
            <el-select v-model="formData.drafDepId" style="width: 80%" @change="drafDepIdChange()">
              <el-option v-for="item in drafDepNmList" :key="item.currUnitId" :label="item.drafDepNm" :value="item.drafDepId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="formData.department=='时间'">
          <el-form-item label="发布开始日期">
            <el-date-picker
              v-model="formData.puDateList"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              style="width: 100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-button type="primary" style="margin-left:20px;" @click="loadData()">搜索</el-button>
      </el-row>
    </el-form>
    <m-table 
      @refresh="loadData()"
      @cellClick="cellClick"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :searchData="formData"
    >
    </m-table>
      <el-dialog
      v-dialogDrag
      :visible.sync="cellDialog"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      title="发布信息"
    >
      <el-form v-model="ggData" label-width="130px">
        <el-row>
          <el-col>
            <el-form-item label="标题:">
              <el-row>
                <el-col :span="20">
                  <el-button type="text" @click="drafting(0)" class="opendraft" style="text-align:left;padding-top:0px;line-height:25px;word-break: break-all;white-space: pre-line;">{{ ggData.title }}</el-button>
                </el-col>
                <el-col :span="4" style="text-align:right;">
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="collection()">收藏</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="编号:">{{ ggData.jbNo }}</el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="附件:">
              <el-scrollbar>
                <div
                  v-for="(item,index) in attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_file">
                      <span
                        class="name down"
                        :title="item.fileName"
                        @click="viewFile(item)"
                      >{{index+1}}. {{item.fileName}}</span>
                      <div class="btns">
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downFile(item)"
                          round
                        >下载</el-button>
                      </div>
                    </div>
                  </template>
                </div>
              </el-scrollbar>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import selectOrgOrDept from 'components/select/selectOrgOrDept'
import Dialog from "@/views/dispatch/departDialog.vue";
import exportTableQueryScript from "@/minixs/exportTableQueryScript";
import viewDraft from "@/minixs/viewDraft";
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
export default {
  name: 'departInforelease',
  components: {
    mTable,
    Dialog
  },
  mixins: [viewDraft,exportTableQueryScript,openOrDownLoadFile],
  props: {},
  data() {
    return {
      bank_dispach:{
        id:''
      },
      ggData: {
        title: '',
        jbNo: '',
        adjunct: ''
      },
      attchmentFileInfo:[],
        //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      cellDialog: false,
      options: [],//当前部门下拉数据（一级部门）
      orgOrDept: 0,
      orgOrDeptId: JSON.parse(localStorage.getItem('userInfo')).unitId,
      addDis: false,
      searchDataInfo: '',
      drafDepNmList: [], //拟稿部门下拉数据
      infoTypeNmList: [], //简报下拉数据
      departmentList: [], //当前部门下拉数据
      departmentListA: [], //当前部门下拉数据
      system: false, //进行判断是否是系统管理员
      queryList: [{ name: '时间' }, { name: '部门' }, { name: '类型' }],
      formData: {
        department: '时间',
        puDateList: [],
      },
      searchData: {},
      tableData: [],
      tableCols: [
        { label: '发布时间', prop: 'pubTime' },
        { label: '简报编号', prop: 'briefingNo' },
        { label: '标题', prop: 'title' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      value: '',
    }
  },
  computed: {},
  methods: {
    drafting(){
      let that = this
        this.getFileInfo(that).then((res)=>{
          if(res.state){
            this.doDraft(res)
          }
        })
    },
     async getFileInfo(self,thInfo) {
      var successInfo = {state:false};
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.ggData.title;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.ggData.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fawglfj
        )
        .then(res => {
          if (res && res.success) {
            if(thInfo){
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            }else{
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          }else{
             self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端获取失败",
              duration: 500
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取失败",
            duration: 500
          });
         successInfo.state = false
        });
        return successInfo
    },
     doDraft(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          id:this.bank_dispach.id,
          zhengWenState:0,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          saveSpecialFileName:this.ggData.documentNo + this.ggData.title,
          pageFlag:'fawen'
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
      // 收藏
    collection() {
      exportTableQueryScript.collect(this, this.ggData.depInfoPubId, 'depInfoPubId', 'A08462976')
    },
    selectChange(e){
      this.formData.curDeptId = e
    },
    Looktype(val) {
      switch (val) {
        case '时间':
          this.formData.drafDepId = ''
          this.formData.infoTypeNo = ''
          break
        case '部门':
          this.formData.puDateList = []
          this.formData.puStartDate = ''
          this.formData.puEndDate = ''
          this.formData.infoTypeNo = ''
          break
        case '类型':
          this.formData.puDateList = []
          this.formData.puStartDate = ''
          this.formData.puEndDate = ''
          this.formData.drafDepId = ''
          break
      }
    },
    // 选择机构
    selectOrg(org) {
      this.searchDataInfo = org.unitName
      this.formData.curDeptId = org.id
      // this.loadData()
    },
    //当前部门
    drafDepNmchange() {
      this.$forceUpdate()
    },
    //简报类型
    infoTypeNoChange() {
      this.$forceUpdate()
    },
    //拟稿部门
    drafDepIdChange() {
      this.$forceUpdate()
    },
    loadData() {
      if (this.formData.puDateList && this.formData.puDateList.length > 0) {
        this.formData.puStartDate = this.formData.puDateList[0]
        this.formData.puEndDate = this.formData.puDateList[1]
      }
      this.$api.pubInfo
        .deptInfoRelease(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.data.total
          this.tableData = res.data.data
        })
    },
    cellClick(row) {
      this.bank_dispach.id = row.id;
      this.formData.fileName = row.fileName || '';
      this.formData.filePath = row.filePath || '';
       this.$api.pubInfo
        .getinfoMessage({
          id:row.pubId,
        })
        .then(res=>{
          this.ggData = res.data
          let bank_doDownloadFile = { function: 'doDownloadFile' }
           const pathArrays = this.ggData.pubMainFilePath.split(',')
           bank_doDownloadFile.fileName = pathArrays[0]
           bank_doDownloadFile.filePath = pathArrays[1]
           this.ggData.fileName = pathArrays[0] || ''
           this.ggData.filePath = pathArrays[1] || ''
           this.attchmentFileInfo = res.data.attchmentFileInfo||[];
          if(this.attchmentFileInfo == ''){      
             this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
             .then(res => {
             if (res) {
              res.ifView = 1
              let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
              let data = this.$router.resolve({
               path: Path,
               query: {
                state: 'viewFile',
                id: row.pubId,
                tanSun: '3',
                zhengWenState: 0,
                JYcode: 'A0846C002',
                relativePath: res ? res.filePath : '',
                fileName: res ? res.fileName : '测试.doc',
                tmpFilePath: res ? res.filePath : '',
                tmpFileName: res ? res.fileName : '测试.doc',
                multiTenancyId: '000076767qwq0',
                showBtns: true,
                saveNameAndNumber: row.briefingNo + row.title
              },
            })
            this.$forceUpdate()
            var one = data.href.split('?')[0]
            var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
            window.open(newPath, "_blank");
          } else {
            this.$message({
              type: 'error',
              offset: 100,
              showClose: true,
              message: '下载失败',
              duation: 2000,
            })
          }
        })
          }else{
            this.cellDialog = true
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "后端返回失败",
            duration: 500
          });
        })  
      //  this.$post.('getSendOrderNoticeById', JSON.stringify(readType), this.$businessCode.fawgl).then((res) => {
      //   if(res&&res.success){
      //     this.ggData = res.data
      //     this.attchmentFileInfo = res.data.attchmentFileInfo||[];
      //   }else{
      //       this.$message({
      //         type: "error",
      //         offset: 400,
      //         showClose: true,
      //         message: "后端返回失败",
      //         duration: 1000
      //       });
      //     }
      //   })
      //   .catch(erro => {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "后端返回失败",
      //       duration: 500
      //     });
      //   });


     
    },
    //改变执行顺序
    changeSort() {
      //获取简报数据
      this.$api.pubInfo
        .getinfoTypeNmList({
          sendOrgIds: this.formData.sendOrgIds,
          senDeptIds: this.formData.senDeptIds,
          sendHumanCodes: this.formData.sendHumanCodes,
          type: 'myOrg',
        })
        .then((res) => {
          this.infoTypeNmList = res.data.data
        })
      //获取拟稿部门数据
      this.$api.pubInfo
        .getdrafDepNmList({
          sendOrgIds: this.formData.sendOrgIds,
          senDeptIds: this.formData.senDeptIds,
          sendHumanCodes: this.formData.sendHumanCodes,
          type: 'myOrg',
        })
        .then((res) => {
          this.drafDepNmList = res.data.data
        })
    },
  },
  created() {
    //根据当前登录人进行机构部门筛选
    let unitInfoArrays = JSON.parse(localStorage.getItem('unitInfo'))
    let userInfoData = JSON.parse(localStorage.getItem('userInfo'))
    let userId = []
    let obj = {}
    this.formData.sendOrgIds = userInfoData.unitId
    this.formData.sendHumanCodes = userInfoData.humanCode
    this.searchDataInfo = userInfoData.firstUnitName
    this.formData.curDeptId = userInfoData.firstUnitId
    this.formData.type = '2'
    for (const i in unitInfoArrays) {
      if (unitInfoArrays[i].unitId === userInfoData.unitId) {
        this.options.push(unitInfoArrays[i])
        let str = unitInfoArrays[i].unitCodes
          while(str.indexOf('/') != '-1'){
            str = str.replace('/',',')
          }
          userId.push(str)
      }
    }
    this.options = this.options.reduce(function(item,next) {
      obj[next.firstUnitId] ? '' : obj[next.firstUnitId] = true && item.push(next)
      return item
    },[])
    this.formData.senDeptIds = userId.join(',')
    this.changeSort()
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.check {
  min-height: calc(100vh - 180px);
}
.el-cs /deep/ .el-scrollbar {
  height: calc(100% - 30px) !important;
}
.command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;
    }
/deep/.command_file .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }
 
.command_file .down {
      cursor: pointer;
      position: initial;
    }
.command_file .down:hover {
      color: #3b85ef;
    }
.command_file  .btns {
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
      text-align: right;
    }
</style>




