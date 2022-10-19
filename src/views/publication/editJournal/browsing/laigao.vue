
<template>
  <div class="qcDetail">
    <div class="headerClick">
      <div class="right">

        <el-button v-for="(item,index) in FEIbuttonList" @click="clickBtn(item.name)" :key="index" v-show="item.show" size="mini" plain>{{item.name}}</el-button>

      </div>
    </div>
    <div class="qcHeader">
      <div class="title-text">《{{formData.pubNm}}》稿件处理单</div>
    </div>
    <div class="process_content">
      <div class="bank_dispach_content" id="bank_dispach_content">
        <div class="cur_box">
          <div class="cur_sess">
            <p>
              当前处理人：
              <span>{{formData.curUsernm}}</span>
            </p>
            <p style="float:right">
              稿件状态：
              <span>{{cyStaut}}</span>
            </p>
          </div>
        </div>
        <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="投稿刊物">
                <el-input v-model="formData.pubNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投稿栏目">
                <el-input v-model="formData.colNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="投稿单位">
                <el-input v-model="formData.drafOrgNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投稿部门" prop>
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
              <el-form-item label="标题" prop="title">
                <el-input v-model="formData.title" :disabled="isDisabledTitle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="评分">
                <el-input onkeyup="value=value.replace(/[^\d\*\ ]/g, '')" v-model="formData.grade" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="最新评分">
                <p>{{newGrade}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item>
                <!-- <el-input type="textarea" v-model="formData.gradeList" :disabled="isDisabled"></el-input> -->
                <ul class="infinite-list" style="overflow-y:scroll;max-height: 100px;min-height: 100px;">
                  <li style="color:blue;height:20px;" v-for="(i,index) in count" :key="index" class="infinite-list-item">{{i}}</li>
                </ul>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import wpsOffice from '@/common/js/wps/wpsOffice.js'
import exportTable from '@/minixs/exportTableQueryScript'
export default {
  name: 'laigao',
  components: {},
  mixins: [exportTable],
  data() {
    return {
      num: '',
      ifView: Number,
      isDisabledTitle: true,
      saveCleanFile: false,
      count: [],
      statu: '0',
      cyStaut: '',
      newGrade: '',
      formData: {
        drafOrgNm:""
        },
      tableDataTxt: [
        { id: 1, name: '小明', age: 20 },
        { id: 2, name: '小明', age: 20 },
        { id: 3, name: '小明', age: 20 },
      ],
      rules: {
        title: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入正确的拟投稿栏目',
          },
        ],
      },
      humanId: '',
      isNotEditOrTopEditPerson: true,
      FEIbuttonList: [
        // { name: '关闭', type: 'Saveandclose', show: true },
        // { name: '编辑', type: 'Compile', show: true },
        // { name: '保存', type: 'Save', show: false },
        // { name: '查看正文', type: 'ChaKanzw', show: true },
        // { name: '处理正文', type: 'Chulizw', show: false },
        // { name: '入备选库', type: 'Newzheng', show: true },
        // { name: '转换格式', type: 'Songshenhe', show: false },
        // { name: '打印处理单', type: 'printHandleNote', show: true },


        { name: '关闭', type: 'Saveandclose', show: true },
        { name: '保存', type: 'Save', show: false },
        { name: '查看正文', type: 'ChaKanzw', show: true },
        { name: '处理正文', type: 'Chulizw', show: false },
        { name: '入备选库', type: 'Newzheng', show: true },
        { name: '转换格式', type: 'Songshenhe', show: false },
        { name: '打印处理单', type: 'printHandleNote', show: true },
        { name: '编辑', type: 'Compile', show: true },
      ],
    }
  },
  created() {
    this.loadData()
    console.log(this.$store.dispatch.laigaoStatu)
    // console.log(wpsOffice.CssOffice, '获取数据')
    // console.log('获取数据')
    // wpsOffice.CssOffice((code) => {
    //   console.log(code)
    // wpsOffice.CssOffice.this.getText()
    // })

    // this.formData = this.$route.query.data
  },
  computed: {
    // 是否禁用标题 评分
    isDisabled() {
      return this.isNotEditOrTopEditPerson
    },
  },

  methods: {
    lookBody(){
      let bank_doDownloadFile = { function: 'doDownloadFile' }
      let num = this.num
      bank_doDownloadFile.fileName = this.formData.pathName
      bank_doDownloadFile.filePath = this.formData.pubMainFilePath
      let id = this.formData.gId
      this.doDraftLook(id, bank_doDownloadFile, num)
    },
    // lllll
    load() {
      if (this.count == 10) {
        return
      } else {
        this.count += 2
      }
    },
    //按钮
    clickBtn(params) {
      switch (params) {
        case '编辑':
          this.$intent.replace(this, {
            name: 'laigao',
            query: { data: this.$route.query.data, statu: 1 },
          })
          this.FEIbuttonList[7].show = false
          this.FEIbuttonList[1].show = true
          this.FEIbuttonList[2].show = false
          this.FEIbuttonList[3].show = true
          this.FEIbuttonList[5].show = true
          this.isDisabledTitle = false
          if (this.formData.objectMap.role === '1') {
            this.isNotEditOrTopEditPerson = false
            // 编辑人员
          } else if (this.formData.objectMap.role === '0') {
            this.isNotEditOrTopEditPerson = true
          }
          break
        case '关闭':
          this.handleClose()
          break
        case '保存':
          this.save()
          break
        case '查看正文':
          this.lookBody()
          break
        case '处理正文':
          this.ifView = 1
          this.saveCleanFile = false
          this.workText()
          break
        case '入备选库':
          this.enterAlternativeDatabase()
          break
        case '转换格式':
          this.handleTransFormat()
          break
        case '打印处理单':
          this.handlePrintForm()
          break
      }
    },
    //处理申请
    workText() {
      console.log(this.formData.pathName)
      if (this.formData.pathName) {
        this.shiwuState = 'viewFile'
        let bank_doDownloadFile = { function: 'doDownloadFile' }
        bank_doDownloadFile.fileName =  this.formData.pathName,
        bank_doDownloadFile.filePath =  this.formData.pubMainFilePath,
          this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
            .then(res => {
            if (res) {
              res.ifView = 1
              this.doDraft(res)
            } else {
              debugger
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
          saveCleanFile: this.saveCleanFile,
          id: this.formData.gId,
          tanSun: '2',
          zhengWenState: this.ifView,
          JYcode: 'A0846C002',
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '测试.doc',
          multiTenancyId: '000076767qwq0',
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
    //入备选库
    enterAlternativeDatabase() {
      this.$api.pubStatistics.enterAlternativeDatabase({ gId: this.formData.gId }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            type: 'success',
            message: res.msg,
          })
          this.FEIbuttonList[4].show = false
          //
          this.$intent.closeWindow(this)
          //入备选库成功
        } else {
          //入备选库失败
          this.$message({
            type: 'error',
            message: res.msg,
          })
        }
      })
    },
    //保存
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.formData)
          this.$api.pubStatistics.pubBrowsingListDetailsSave(this.formData).then((res) => {
            if (res.code == 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '保存成功!',
              })
              // this.$intent.replace(this, {
              //   path: '/publication/editJournal/browsing/laigao',
              //   query: { data: res.data.gId },
              // })
              this.loadData()
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请填写表单',
          })
        }
      })
    },
    // 关闭
    handleClose() {
      if (this.formData.cyStaut == '3' ||this.formData.cyStaut == '2') {
        this.$intent.closeWindow(this)
      } else {
        this.$confirm('是否保存并退出当前页面?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          distinguishCancelAndClose: true,
          type: 'warning',
          callback: (action) => {
            if (action === "confirm") {
              //点是
              this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                  console.log(this.formData)
                  this.$api.pubStatistics.pubBrowsingListDetailsSave(this.formData).then((res) => {
                    if (res.code == 'SUCCESS') {
                      this.$message({
                        type: 'success',
                        message: '保存成功!',
                      })
                    }
                  })
                } else {
                  this.$message({
                    type: 'warning',
                    message: '请填写表单',
                  })
                }
              })
              this.$intent.closeWindow(this)
              // this.saveClose()
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        })
      }
    },
    // 保存
    handleSave() {
      this.$intent.closeWindow(this)
    },
    // 处理正文
    handleArticle() {},
    // 备选入库
    handleDataBase() {},

    onClickDownDaily() {
      var title = '文件标题'
      // var str = ''
      // this.tableDataTxt.forEach((item) => {
      //   str += 'ID:' + item.id + '   ' + '名称:' + item.name + '   ' + '年龄:' + item.age + '\r\n'
      // })
      // var allStr = title + '\r\n' + '\r\n' + str
      console.log(this.formData.content)
      var allStr =
        '#开始#' +
        '\r\n' +
        '\r\n' +
        '\r\n' +
        '#标识#' +
        '\r\n' +
        '#日期#' +
        this.formData.drafTime +
        '\r\n' +
        '#单位#' +
        this.formData.drafOrgNm +
        '\r\n' +
        '#主题词#' +
        '\r\n' +
        '#标题#' +
        this.formData.title +
        '\r\n' +
        '#正文#' +
        this.formData.content +
        '\r\n' +
        '\r\n' +
        '\r\n' +
        '#结束#'
      var export_blob = new Blob([allStr])
      var save_link = document.createElement('a')
      save_link.href = window.URL.createObjectURL(export_blob)
      save_link.download = this.formData.title + '.txt'
      this.fakeClick(save_link)
    },
    fakeClick(obj) {
      var ev = document.createEvent('MouseEvents')
      ev.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      obj.dispatchEvent(ev)
    },

    // 转换格式
    handleTransFormat() {
      this.onClickDownDaily()
    },
    // 打印处理单
    handlePrintForm() {
      this.$intent.goNewPage(this, {
        path: '/laigaoPrint',
        query: { data: this.$route.query.data, newGrade: this.newGrade },
      }) // 跳转页面
    },
    loadData() {
      // console.log(this.statu, 'this.statu')
//  this.formData.drafOrgNmTg =  this.formData.drafOrgNm 
      this.$api.pubStatistics
        .pubBrowsingListDetails({ gId: this.$route.query.data })
        .then((res) => {
          this.formData = res.data
          this.num = this.formData.title
          if (this.$route.query.statu == '1') {
            this.FEIbuttonList[7].show = false
            this.FEIbuttonList[1].show = true
            this.FEIbuttonList[2].show = false
            this.FEIbuttonList[3].show = true
            this.FEIbuttonList[5].show = true
            this.isDisabledTitle = false
            if (this.formData.objectMap.role === '1') {
              this.isNotEditOrTopEditPerson = false
              // 编辑人员
            } else if (this.formData.objectMap.role === '0') {
              this.isNotEditOrTopEditPerson = true
            }
          }
          if (this.formData.objectMap.role === '1') {
            // this.isNotEditOrTopEditPerson = false
            if (this.formData.objectMap.gradelist.length !== 0) {
              this.newGrade = this.formData.grade
              this.formData.grade = ''
              let list = []
              this.formData.objectMap.gradelist.map((item) => {
                list.push(item.unm + ':' + item.grade)
              })
              this.count = list
            } else {
              this.formData.grade = ''
              this.newGrade = '1'
              this.count = ['系统:1']
            }
            // 编辑人员
          } else if (this.formData.objectMap.role === '0') {
            // this.isNotEditOrTopEditPerson = true
            if (this.formData.objectMap.gradelist.length !== 0) {
              this.newGrade = this.formData.grade
              this.formData.grade = ''
              let list = []
              this.formData.objectMap.gradelist.map((item) => {
                list.push(item.unm + ':' + item.grade)
              })
              this.count = list
            } else {
              this.formData.grade = ''
              this.newGrade = '1'
              this.count = ['系统:1']
            }
          }

          //判断稿件状态
          if (this.formData.cyStaut == '1') {
            this.cyStaut = '未采用'
          } else if (this.formData.cyStaut == '2') {
            this.isNotEditOrTopEditPerson = true
            this.cyStaut = '采用'
            this.FEIbuttonList[0].show = true
            this.FEIbuttonList[7].show = false
            this.FEIbuttonList[1].show = false
            this.FEIbuttonList[2].show = false
            this.FEIbuttonList[3].show = false
            this.FEIbuttonList[4].show = false
            this.FEIbuttonList[5].show = false
            this.FEIbuttonList[6].show = false
          } else if (this.formData.cyStaut == '3') {
            this.isNotEditOrTopEditPerson = true
            this.cyStaut = '备选'
            this.FEIbuttonList[0].show = true
            this.FEIbuttonList[7].show = false
            this.FEIbuttonList[1].show = false
            this.FEIbuttonList[2].show = false
            this.FEIbuttonList[3].show = false
            this.FEIbuttonList[4].show = false
            this.FEIbuttonList[5].show = false
            this.FEIbuttonList[6].show = false
          }
        })
    },
  },
  mounted() {},
}
/**
 * 1 高级编辑 0 编辑人员
 * 未采用状态可编辑
 * 采用状态不可编辑按钮消失
 */
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-button--primary.is-plain.is-disabled {
  color: #409eff;
  background-color: #fff;
  border-color: #d9ecff;
}
.qcDetail {
  background: white;
  margin: 0 auto;
  padding-top: 50px;
  height: auto;
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
      border: 1px solid #f9aa21;
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

  .bank_dispach_side_nav {
    width: 45px;
    height: auto;
    position: fixed;
    bottom: 8px;
    left: 10%;
    margin-left: -43px;
    text-align: center;

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
}

.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.height_90 {
  height: 200px;
  margin-top: -200px;
}
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  margin: 0 16px;
}
</style>

