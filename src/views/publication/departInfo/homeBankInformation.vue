<template>
  <div>
     <div>
    <div >
      <el-select v-model="pubNmListSelect" @change="selectChange" clearable>
        <el-option v-for="item in options" :key="item.value" :label="item" :value="item"></el-option>
      </el-select>
        <!-- <el-button type="danger" @click="delList" style="margin-left:70%">删除</el-button> -->
        <el-button type="primary" @click="getRefresh" style="margin-left:70%">刷新</el-button>
    </div>
    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :searchData="formData"
    ></m-table>
    <el-form  ref="formDataA" :model="formDataA" label-width="120px" style="margin-top:15px">
    <el-row style="margin-bottom: 10px">
      <el-col :span="7" v-if="!system">
        <el-form-item label="当前部门:" prop="curDeptIdview">
        <el-select v-model="formDataA.curDeptIdview" style="width:80%" placeholder="请选择..." @change="drafDepNmchange($event)">
          <el-option
            v-for="item in departmentList"
            :key="item.currUnitId"
            :label="item.currUnitName"
            :value="item.currUnitId"
          ></el-option>
        </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7" v-if="system">
        <el-form-item label="当前部门:" prop="curDeptIdview">
        <el-select v-model="formDataA.curDeptIdview" style="width:80%" placeholder="请选择..." @change="drafDepNmchange($event)">
          <el-option
            v-for="item in departmentListA"
            :key="item.unitCode"
            :label="item.unitName"
            :value="item.unitCode"
          ></el-option>
        </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7" >
        <el-form-item label="行名:" prop="drafOrgId">
        <el-select v-model="formDataA.drafOrgId" style="width:80%" placeholder="请选择..." @change="drafOrgIdChange">
          <el-option
            v-for="item in drafDepIdList"
            :key="item.drafOrgId"
            :label="item.drafOrgName"
            :value="item.drafOrgId"
          ></el-option>
        </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7" >
        <el-form-item label="简报类型:" prop="infoTypeNo">
        <el-select v-model="formDataA.infoTypeNo" placeholder="请选择">
          <el-option v-for="(item, index) in infoTypeNmList" :key="index" :label="item.infoTypeNm" :value="item.infoTypeNo"></el-option>
        </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form> 
    <m-table
      @refresh="loadDataA"
      @cellClick="cellClickA"
      size="medium"
      :tableData="tableDataA"
      :tableCols="tableColsA"
      :pagination="paginationA"
      :isSelection="true"
      :searchData="formDataA"
    ></m-table>
  </div>
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
                <!-- <el-col :span="4" style="text-align:right;">
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="collection()">收藏</el-button>
                </el-col> -->
              </el-row>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="编号:">{{ ggData.briefingNo }}</el-form-item>
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
<script>
import mTable from '@/components/table/tTable';
import exportTableQueryScript from "@/minixs/exportTableQueryScript";
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
export default {
  name: 'departInfohomeBankInformation',
  components: {
    mTable,
  },
   mixins: [exportTableQueryScript,openOrDownLoadFile],
  data() {
    return {
        //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      attchmentFileInfo:[],
      bank_dispach:{
        id:''
      },
      cellDialog: false,
      ggData: {
        title: '',
        briefingNo: '',
        adjunct: ''
      },
      //上面表格数据
      options:[],//下拉框数据
      options1:[],
      pubNmListSelect:[], 
      formData:{},
      tableData: [],
      searchData:{},
      tableCols: [
        { label: "标题", prop: "title" },
        { label: "成文日期", prop: "pubTime" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total:0
      },
      //下面表格数据
      formDataA:{},
      searchDataA:{},
      tableDataA: [],
      tableColsA: [
        { label: "发布日期", prop: "pubTime" },
        { label: "简报编号", prop: "briefingNo" },
        { label: "标题", prop: "title" }
      ],
      paginationA: {
        pageNum: 1,
        pageSize: 20,
        total:0
      },
      system:false,
      infoTypeNmList:[],//简报下拉数据
      departmentList:[],//当前部门下拉数据
      departmentListA:[],//当前部门下拉数据
      drafDepIdList:[],
    }
  },
  methods: {
      // 收藏
    collection() {
      exportTableQueryScript.collect(this, this.ggData.depInfoPubId, 'depInfoPubId', 'A08462976')
    },
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
          saveSpecialFileName:this.ggData.briefingNo + this.ggData.title,
          pageFlag:'fawen'
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    //删除
    delList(){},
    //刷新
    getRefresh(){
      this.loadData()
    },
    cellClick(row){
      let bank_doDownloadFile = {function: "doDownloadFile"}
      bank_doDownloadFile.fileName =  row.mainFileName,
      bank_doDownloadFile.filePath = row.mainFilePath,
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
                  tanSun: '22',
                  zhengWenState: 0,
                  JYcode: 'A0846C002',
                  relativePath: res ? res.filePath : '',
                  fileName: res ? res.fileName : '',
                  tmpFilePath: res ? res.filePath : '',
                  tmpFileName: res ? res.fileName : '',
                  multiTenancyId: '000076767qwq0',
                  showBtns: true,
                  isDinggao: 2,
                  saveNameAndNumber: row.title
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
      },
       cellClickA(row){
          this.bank_dispach.id = row.id
          this.ggData = row
          this.ggData.depInfoPubId = row.pubId
          let bank_doDownloadFile = {function: "doDownloadFile"}
          const pathArrays = this.ggData.mainFilePath.split(',')
          bank_doDownloadFile.fileName =  pathArrays[0]
          bank_doDownloadFile.filePath = pathArrays[1]
          this.ggData.fileName = pathArrays[0] || ''
          this.ggData.filePath = pathArrays[1] || ''
          this.attchmentFileInfo = row.attchmentFileInfo||[];
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
    },
    loadData(){
      this.$api.pubInfo
        .deptUpInfoData(this.formData,
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.data.total;
          this.tableData = res.data.data;
        });
    },
    selectChange(e) {
      this.pubNmList = e
      var list = e.replace('(上级行)', '')
      let obj = {}
      obj = this.options1.find((item) => {
        return item.pubNm === list
      })
      this.objChangePubColumnNm = obj
      if(obj){
        this.formData.infoTypeNo = obj.pubMgId
      }else{
        this.formData.infoTypeNo=""
      }
      this.loadData()
    },
    //获取上表格的下拉数据
    getpubNmListSelect() {
      this.$api.paraMeter.PublicationManagementlist({ searchType: 'MyAndParent' }).then((res) => {
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
      })
    },

    //当前部门
    drafDepNmchange(val){
      let currentId = JSON.parse(localStorage.getItem('userInfo')).unitId
      //当前机构和部门
      this.formDataA.curDeptIds=val+','+currentId
      this.$forceUpdate()
      this.loadDataA();
    },
    //行名下拉事件
    drafOrgIdChange(){this.$forceUpdate();this.loadDataA();},
    //简报类型
    infoTypeNoChange(){this.$forceUpdate();this.loadDataA();},
    loadDataA(){
      this.$api.pubInfo
        .deptInfoData(this.formDataA,
          {
            PAGE_JUMP: this.paginationA.pageNum,
            REC_IN_PAGE: this.paginationA.pageSize
          }
        )
        .then(res => {
          this.paginationA.total = res.data.total;
          this.tableDataA = res.data.data;
        });
    },
  },
  created() {
    ////获取上表格的下拉数据
    this.getpubNmListSelect()
    //根据当前登录人进行机构部门筛选
    let unitInfoArrays = JSON.parse(localStorage.getItem('unitInfo'))
    let userInfoData = JSON.parse(localStorage.getItem('userInfo'))
    //上表格使用以下参数请求分页表格
    this.formData.sendOrgIds=userInfoData.unitId
    this.formData.sendHumanCodes=userInfoData.humanCode
    this.formData.type='myOrgMagazine'
    //下表格使用以下参数请求分页表格
    this.formDataA.sendOrgIds=userInfoData.unitId
    this.formDataA.sendHumanCodes=userInfoData.humanCode
    this.formDataA.type='parentOrgDepInfo'
    //后续增加管理员权限时候使用
    /*let RoleData = JSON.parse(localStorage.getItem('tcHumanRole'))
     RoleData.map((node) => {
        if (node.dicId == 382) {
          this.system = true
        }
      });
    if(this.system){
       this.$api.pubInfo.deptInfoadmin({
        unitClass:0,
        unitCode:userInfoData.unitId
      })
      .then((res) => {
         this.departmentListA=res.data
         this.formDataA.curDeptId=res.data[0].unitCode
         let ids=[]
        this.departmentListA.forEach(item=>{
            ids.push(item.currUnitId)
          })
        //请求把同一机构下部门机构发送
        this.formData.senDeptIds=ids.join(',')
      }) 
    
    }else if(this.system==false){}*/
    for (let i in unitInfoArrays) {
        if (unitInfoArrays[i].unitId === userInfoData.unitId) {
          this.departmentList.push(unitInfoArrays[i])
        }
      }
    this.formDataA.curDeptIdview=this.departmentList[0].currUnitId
    //当前机构和部门
    this.formDataA.curDeptIds=this.departmentList[0].currUnitId+','+userInfoData.unitId
    let ids=[]
    this.departmentList.forEach(item=>{
          let str = item.unitCodes
          while(str.indexOf('/') != '-1'){
            str = str.replace('/',',')
          }
          ids.push(str)
      })
    //请求把当前机构   部门机构发送
    this.formData.senDeptIds=ids.join(',')
    this.formDataA.senDeptIds=ids.join(',')
    //获取简报数据
    this.$api.pubInfo.getinfoTypeNmList({
      sendOrgIds: this.formDataA.sendOrgIds,
      senDeptIds:this.formDataA.senDeptIds ,
      sendHumanCodes:this.formDataA.sendHumanCodes,
      type:'infoTypeOfParentDepInfo'
    })
    .then((res) => {
      this.infoTypeNmList=res.data.data
    })
    //行名
    this.$api.pubInfo.getdrafOrgId({
      sendOrgIds: this.formDataA.sendOrgIds,
      senDeptIds:this.formDataA.senDeptIds ,
      sendHumanCodes:this.formDataA.sendHumanCodes,
      type:'drafOrgOfParentDepInfo'
    })
    .then((res) => {
      this.drafDepIdList=res.data.data
    })
    
    //页面上面表格
    this.loadData()
    //页面下半部分表格
    this.loadDataA()
  },
}
</script>
<style scoped lang="less" rel="stylesheet/less">
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