 <template>
  <div class="qcDetail">
    <div class="headerClick">
      <div class="right">
        <el-button v-for="(item,index) in buttonList" @click="buttonClick(item)" :key="index" size="mini" plain>{{item.name}}
        </el-button>
      </div>
    </div>
    <div class="qcHeader">
      <div class="title-text">{{"《"+formData.pubNm+"》"+"备选稿件"}}</div>
    </div>
    <div class="process_content">
      <div class="bank_dispach_content" id="bank_dispach_content">
        <div class="cur_box">
          <div class="cur_sess">
            <p>
              当前环节：
              <span>{{formData.curNodeName}}</span>
            </p>
            <p>
              当前处理人：
              <!-- <span>{{drafDepNm}}-{{formData.curUsernm}}</span> -->
              <span>{{formData.curUsernm}}</span>
            </p>
            <p style="float:right">
              稿件状态：
              <span>{{cyStaut}}</span>
            </p>
          </div>
        </div>
        <el-form :model="formData" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="拟投稿刊物">
                <el-input v-model="formData.pubNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拟投稿栏目">
                <el-input v-model="formData.colNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="拟稿人单位">
                <el-input v-model="formData.drafOrgNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拟稿人部门">
                <el-input v-model="formData.drafDepNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="拟稿人">
                <el-input v-model="formData.drafUnm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="formData.phone" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="拟稿日期">
                <el-date-picker style="width:100%" v-model="formData.drafTime" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input v-model="formData.title" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="新标题">
                <el-input v-model="formData.newTitle" :disabled="newTitle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-radio-group v-model="radio">
                  <el-radio :disabled="auditIdeaIn" :label="lav.opinionId" @change="pubIsShow(lav.opinionId,lav.opinionContext)" v-for="(lav,index) in pubIsShowList" :key="index">{{lav.opinionContext}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="评审意见" prop="auditIdeaIn">
                <el-input type="textarea" :rows="4" placeholder="请输入评审意见" v-model="formData.auditIdeaIn" :disabled="auditIdeaIn"></el-input>
                <div class="opinionTbody" style="margin-bottom: 3px" v-if="auditOpinionsList.length > 0 ?true : false">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <div class="lineContent" v-for="item in auditOpinionsList" :key="item.id" >
                          <div>{{item.opinionText}}</div>
                          <!-- <el-input type="textarea" :value="item.opinionText" :disabled="true" :autosize="{minRow:5,maxRow:15}" class="d_f1"></el-input> -->
                          <div class="adviceInfo">
                            <!-- {{item.opinionText}} -->
                            {{item.depnm}}
                            <span class="pad_lr10">{{item.unm}}</span>
                            <br>
                            {{time(item.opinionTime)}}
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="组刊意见" prop="journalIdea">
                <el-input type="textarea" :rows="4" placeholder="请输入组刊意见" v-model="formData.journalIdeaIn" :disabled="journalIdea"></el-input>
                <div class="opinionTbody" style="margin-bottom: 3px" v-if="zukanOpinionsList.length > 0 ?true : false">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <div class="lineContent" v-for="item in zukanOpinionsList" :key="item.id" >
                          <!-- <el-input type="textarea" :value="item.opinionText" :disabled="true" :autosize="{minRow:5,maxRow:15}" class="d_f1"></el-input> -->
                          <div>{{item.opinionText}}</div>
                          <div class="adviceInfo">
                            <!-- {{item.opinionText}} -->
                            {{item.depnm}}
                            <span class="pad_lr10">{{item.unm}}</span>
                            <br>
                            {{time(item.opinionTime)}}
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <el-dialog title="稿件状态" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-select v-model="options[0].pubNm" @change="selectChange" clearable style="width:100%">
        <el-option v-for="item in options" :key="item.value" :label="item.pubNm" :value="item.pubNm">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleOnOk">确 认</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改记录" :visible.sync="upDateDialogVisible" :before-close="updateHandleClose">
      <!-- <m-table @refresh="getUpdateList" size="medium" :isIndex="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true"></m-table> -->
      <m-table @refresh="getUpdateList" size="medium" :isIndex="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true"></m-table>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import exportTable from '@/minixs/exportTableQueryScript'
import dateFormate from '@/util/filters.js'
export default {
  name: 'business1',
  components: { mTable },
  mixins: [exportTable],
  data() {
    return {
      num: '',
      drafDepNm: JSON.parse(localStorage.getItem('userInfo')).firstUnitName,
      auditOpinionsList: [],
      zukanOpinionsList: [],
      ifView: Number,
      chooseItem: '', //下拉框选中的item
      options: [
        {
          value: '0',
          pubNm: '未采用',
        },
      ],
      cyStaut: '',
      id: '',
      radioTitle: '',
      newString: '',
      newStringPubIsShowList: '',
      dialogVisible: false,
      upDateDialogVisible: false,
      saveCleanFile: false,
      tableData: [],
      tableCols: [
        {
          label: '修改时间',
          prop: 'time',
          formatter(row) {
            return row.tms == '' || row.tms == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.tms)), 'YYYY-MM-DD HH:mm:ss')
          },
        },
        { label: '处理人', prop: 'unm' },
      ],
      // 这里的数据是假的
      pubIsShowList: [
        { index: '1', title: '暂未发表评审意见' },
        { index: '2', title: '建议联系分行补充完善' },
        { index: '3', title: '建议暂缓采用' },
        { index: '4', title: '选题不符合标准，建议联系分行按需求另行组稿' },
        { index: '5', title: '建议采用（其他情况）' },
        { index: '6', title: '建议直接采用' },
        { index: '7', title: '稿件内容没有特色，建议不采用' },
        { index: '8', title: '同类内容以前录用过，建议弃用' },
        { index: '9', title: '建议修改后再会商' },
        { index: '10', title: '建议不采用（其他情况）' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      formData: {
        auditIdeaIn: '',
        title: '',
        journalIdeaIn: '',
        auditIdea: [],
        journalIdea: [],
        assessOpinions: '',
      },
      pubStaut: '未采用',
      input: '',
      value: '',
      radio: '',
      textarea: '',
      newTitle: false,
      journalIdea: false,
      auditIdeaIn: false,
      buttonList: [
        { name: '关闭', type: 'close' },
        { name: '保存', type: 'save' },
        { name: '处理正文', type: 'handlezw' },
        { name: '修改记录', type: 'xgjl' },
        { name: '修改状态', type: 'xgzt' },
        { name: '打印处理单', type: 'dycld' },
      ],
    }
  },
  created() {
    this.id = this.$route.query.data
    if (this.id) {
      this.loadData()
    }
  },
  methods: {
    // 下拉框的值改变时
    time(e) {
      let date = new Date(e)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = this.change(date.getDate()) + '  '
      let h = this.change(date.getHours()) + ':'
      let m = this.change(date.getMinutes()) + ':'
      let s = this.change(date.getSeconds())
      return Y + M + D + h + m + s
    },
    change(t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    selectChange(e) {
      this.chooseItem = e
    },
    loadData() {
      console.log(this.formData.auditIdeaIn)
      this.$api.pubStatistics.pubBrowsingListDetails({ gId: this.id }).then((res) => {
        this.formData = res.data
        this.num = this.formData.title
        this.auditOpinionsList = this.formData.objectMap.assessOpinionsList
        this.zukanOpinionsList = this.formData.objectMap.zukanOpinionsList
        this.dispose()
      })

      this.$api.paraMeter
        .pinshenyjlist(
          { creatOrgId: JSON.parse(localStorage.getItem('userInfo')).unitId },
          {
            PAGE_JUMP: 1,
            REC_IN_PAGE: 900,
          }
        )
        .then((res) => {
          console.log(res.data)
          this.pubIsShowList = res.data
        })
    },
    //数据处理
    dispose() {
      //判断稿件状态
      console.log(this.formData)
      if (this.formData.cyStaut == '1') {
        this.cyStaut = '未采用'
      } else if (this.formData.cyStaut == '2') {
        this.isNotEditOrTopEditPerson = true
        this.cyStaut = '采用'
      } else if (this.formData.cyStaut == '3') {
        this.isNotEditOrTopEditPerson = true
        this.cyStaut = '备选'
      }

      // 高级编辑人员
      if (this.formData.objectMap.role === '1') {
        this.newTitle = false
        this.journalIdea = false
        this.auditIdeaIn = false
        // 编辑人员
      } else if (this.formData.objectMap.role === '0') {
        // this.newTitle = true
        this.journalIdea = true
        this.auditIdeaIn = true
      }
    },
    pubIsShow(index, title) {
      this.radioTitle = title
    },
    // 按钮
    buttonClick(params) {
      switch (params.name) {
        case '关闭':
          this.close()
          break
        case '保存':
          this.save()
          break
        case '处理正文':
          this.ifView = 1
          this.saveCleanFile = false
          this.drafting()
          break
        case '修改记录':
          this.upDateDialogVisible = true
          // 调用修改记录接口
          this.getUpdateList()
          break
        case '修改状态':
          this.dialogVisible = true
          break
        case '打印处理单':
          // 调用打印方法
          this.printForm()
          break
      }
    },
    // 关闭
    close() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: (action) => {
          if (action === "confirm") {
            //点是
            this.save();
            this.$intent.closeWindow(this);
            // this.saveClose()
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        },
      });
    },
    // 保存
    save() {
      let auditIdeaIn = this.formData.auditIdeaIn
      console.log(this.auditOpinionsList)
      if (this.radioTitle) {
        if (auditIdeaIn) {
          this.formData.assessOpinions = this.radioTitle + '——' + auditIdeaIn
        } else {
          this.formData.assessOpinions = this.radioTitle
        }
      } else {
        this.formData.assessOpinions = auditIdeaIn
      }
      this.formData.zukanOpinions = this.formData.journalIdeaIn
      this.$api.pubStatistics.deleteAltBusinessSave(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          this.loadData()
          this.radio = ''
          this.$message({
            type: 'success',
            offset: 400,
            showClose: true,
            message: '保存成功',
            duation: 200,
          })
        }
      })
      this.radioTitle = ''
      // this.$intent.replace(this, {
      //   path: '/publication/editJournal/altBusiness/business1',
      //   query: { data: this.$route.query.data },
      // })
    },
    //  投稿状态弹窗确认
    handleOnOk() {
      // let garr = this.id.split(',')
      // console.log(garr)
      let dataArry = []
      dataArry.push(this.id)
      console.log(dataArry)
      this.$api.pubStatistics.upDateAltBusinessStatus({ gIdArr: dataArry }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            message: '修改状态成功',
            type: 'success',
          })
          this.$intent.closeWindow(this)
        }
        this.loadData()
      })
      this.dialogVisible = false
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
    },
    // 获取修改记录
    getUpdateList() {
      this.$api.pubStatistics
        .deleteAltBusinessRecord(
          { gId: this.id },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
          console.log(res)
        })
    },
    // 关闭修改记录弹窗
    updateHandleClose() {
      this.upDateDialogVisible = false
    },
    // 打印处理单
    printForm() {
      // this.formData.title = this.formData.deptTableHeader + '报送处理单'
      // let copyRow = JSON.stringify(this.formData) // 当前行数据转换字符串
      this.$intent.goNewPage(this, {
        path: '/altBusiness',
        query: { data: this.formData.gId, title: this.formData.newTitle },
      })
    },
    // 处理正文
    drafting() {
      if ('pathName' in this.formData) {
        this.shiwuState = 'viewFile'
        let bank_doDownloadFile = { function: 'doDownloadFile' }
        bank_doDownloadFile.fileName =  this.formData.pathName,
        bank_doDownloadFile.filePath =  this.formData.pubMainFilePath,
          this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
            .then(res => {
            if (res) {
              res.ifView = 1
              this.doDraft(res) //使用金格控件打开申请
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                offset: 400,
                message: '下载失败',
                duration: 500,
              })
            }
          })
      } else {
        this.$message({
          message: '暂无正文模板',
          type: 'warning',
        })
      }
    },
    //申请跳转
    doDraft(fileInfo) {
      console.log(fileInfo, '<-------fileInfo获取res')
      let Path= getMachineType() ? "/openAndSave_WordTs" : "openAndSave_Wps_Tansun";
      let data = this.$router.resolve({
        path: Path,
        query: {
          state: this.shiwuState,
          id: this.formData.gId,
          tanSun: '2',
          zhengWenState: this.ifView,
          JYcode: 'A0846C002',
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '测试.doc',
          multiTenancyId: '000076767qwq0',
          cleanDraftFlag: false,
          saveCleanFile: this.saveCleanFile,
          showBtns: true,
          serverUrl: '128.192.221.164',
          saveNameAndNumber: this.num
        },
      })
      this.$forceUpdate()
       var one = data.href.split('?')[0]
      var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
      window.open(newPath, "_blank");
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.opinionTbody{
  background-color: rgba(228,231,237,.32)!important;
  color: #000;
  padding: 5px 15px 5px 5px!important;
  border: 1px solid #e4e7ed!important;
  border-radius: 4px!important;
  margin-top: 5px;
}
.adviceInfo {
  font-size: 14px!important;
  line-height: 20px;
}
.pad_lr10 {
  padding-right: 0px;
}
.el-button--primary.is-plain.is-disabled {
  color: #409eff;
  background-color: #fff;
  border-color: #d9ecff;
}
.qcDetail {
  background: white;
  margin: 0 auto;
  padding-top: 50px;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-right: 130px;
      float: right;
    }
  }

  .qcHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  .process_content {
    width: 80%;
    min-height: 460px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f60;
      background: #fef7e7;
      .cur_sess {
        padding-right: 40px;
        p {
          padding-right: 20px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 20px;
          float: left;
          span {
            color: #f9aa21;
          }
        }
      }
    }
    .bottom-span {
      span {
        display: block;
        margin-left: 10%;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
    }
  }
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.bank_dispach_content {
  width: 100%;
  height: auto;
  a {
    width: 45px;
    height: 70px;
    border: 2px solid #3b85ef;
    font-size: 16px;
    margin: 15px 0;
    color: #3b85ef;
    background: #fff;
    border-radius: 10px 0 0 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    background: #3b85ef;
    color: #fff;
  }
}
.btnClass {
  float: right;
  padding: 10px;
}
.lineContent {
    line-height: 24px;
    font-size: 14px;
    word-break: break-all;
    white-space: pre-line;
}
</style>

