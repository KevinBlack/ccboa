/**
* create by zx on 2020/7/29 14:16
* 类注释：制发填写详细信息
* 备注：
*/
<template>
  <div class="zfTwo">
    <!-- <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>信息刊物</span>
      </div>
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button>
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('保存')">保存</el-button>
      </div>
    </div> -->
    <div style="margin: 15px 0">
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('关闭')">关闭</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('保存')">保存</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">模板管理</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="标题" prop="title">
              <el-input v-model="formData.tplNm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="部门信息附件" prop="title">
              <el-input v-model="formData.tplTopNm" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-button class="btn" :span="2" @click="Browse(1)">浏览</el-button>
          <div v-for="(item,index) in tplTopArry" :key="index" class="comp_list">
            <el-button class="btn" :span="2" @click="deleteRowSys(1,index,item.id)">删除</el-button>
            <el-button class="btn" :span="2" @click="downFile(item)">下载</el-button>
          </div>
        </el-row>
        <el-dialog title="上传" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'

import { mapGetters, mapActions } from 'vuex'
import uploadFileTs from 'components/uploadFile/uploadFileTs'
import openOrDownLoadFile from '@/minixs/shiwuLineWord'
export default {
  name: 'zfTwo',
  components: {
    uploadFileTs,
  },
  props: {},
  mixins: [openOrDownLoadFile],
  data() {
    return {
      uploadConfig: {
        formId: '',
        hiddenJson: '',
        filesHas: [],
        isSpecial: '',
      },
      id: '',
      tplTopNmUploadConfig: {
        formId: 'tplTopNm',
        hiddenJson: 'hiddentplTopNm',
        filesHas: [],
        isSpecial: '800051',
      },
      dialogVisible: false,
      unitCode: JSON.parse(localStorage.getItem('userInfo')).unitId,
      // 委托承办单位
      tplTopArry: [], //合稿模板（头）
      tplEndArry: [], //合稿模板（尾
      tplColumnStyleArray: [], //合稿栏目样式模板
      tplColumnTitleArray: [], //合稿标题模板
      tplMainColumnArray: [], //合稿主目录模板
      tplColumnCatalogueArray: [], //合稿目录模板
      tplAuthorshipArray: [], //合稿模版
      formData: {
        tplTopNm: '', //合稿模板（头）
        tplTopPath: '', //合稿模板（头）地址
        tplEndNm: '', //合稿模板（尾
        tplEndPath: '', //合稿模板（尾）地址
        tplColumnStyleNm: '', //合稿栏目样式模板
        tplColumnStylePath: '', //合稿栏目样式模板地址
        tplColumnTitleNm: '', //合稿标题模板
        tplColumnTitlePath: '', //合稿标题模板地址
        tplMainColumnNm: '', //合稿主目录模板
        tplMainColumnPath: '', //合稿主目录模板地址
        tplColumnCatalogueNm: '', //合稿目录模板
        tplColumnCataloguePath: '', //合稿目录模板地址
        tplAuthorshipNm: '', //合稿模板
        tplAuthorshipPath: '', //合稿模板path
      },
      //不可编辑控制域
      readFields: {
        tplAuthorshipNm: false, //合稿模板
        tplAuthorshipPath: false, //合稿模板path
        tplColumnCatalogueNm: false, //合稿目录模板
        tplColumnCataloguePath: false, //合稿目录模板path
        tplColumnStyleNm: false, //合稿栏目样式模板
        tplColumnStylePath: false, //合稿栏目样式模板path
        tplColumnTitleNm: false, //合稿标题模板
        tplColumnTitlePath: false, //合稿标题模板path
        tplEndNm: false, //合稿模板（尾
        tplEndPath: false, //合稿模板（尾）path
        tplId: false,
        tplMainColumnNm: false, //合稿主目录模板
        tplMainColumnPath: false, //合稿主目录模板path
        tplNm: false, //测试模板
        tplTopNm: false, //合稿模板（头）
        tplTopPath: false, //合稿模板（头）地址
      },
      //必填控制域
      requiredFields: {
        tplAuthorshipNm: '', //合稿模板
        tplAuthorshipPath: '', //合稿模板path
        tplColumnCatalogueNm: '', //合稿目录模板
        tplColumnCataloguePath: '', //合稿目录模板path
        tplColumnStyleNm: '', //合稿栏目样式模板
        tplColumnStylePath: '', //合稿栏目样式模板path
        tplColumnTitleNm: '', //合稿标题模板
        tplColumnTitlePath: '', //合稿标题模板path
        tplEndNm: '', //合稿模板（尾
        tplEndPath: '', //合稿模板（尾）path
        tplId: '',
        tplMainColumnNm: '', //合稿主目录模板
        tplMainColumnPath: '', //合稿主目录模板path
        tplNm: '', //测试模板
        tplTopNm: '', //合稿模板（头）
        tplTopPath: '', //合稿模板（头）地址
      },
      radio1: '',
      rules: {},
      currentUser: JSON.parse(localStorage.getItem('userInfo')).humanName,
      currentUserId: JSON.parse(localStorage.getItem('userInfo')).humanId,
      typeindex: '',
    }
  },
  computed: {},
  methods: {
    deleteRowSys(m, n, id) {
      console.log(m, n, id, this.typeindex, '获取id')
      if (id) {
        this.$confirm('是否确定删除此文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$api.setSysConfig
              .deleFile({
                id: id,
              })
              .then((res) => {
                if (res && res.code == 'SUCCESS') {
                  switch (m) {
                    case 1:
                      this.tplTopArry && this.tplTopArry.splice(n, 1)
                      this.$forceUpdate()
                      this.tplTopNmUploadConfig.filesHas = this.tplTopArry
                      this.formData.tplTopNm = ''
                      break
                    default:
                      break
                  }
                  this.$api.paraMeter.paraMeterAdd(this.formData).then((res) => {
                    if (this.id) {
                      this.publicationCreateFile()
                    } else {
                      this.id = this.res.data.tplId
                      this.publicationCreateFile()
                    }
                  })
                  this.$message({
                    type: 'success',
                    message: '删除成功',
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败',
                  })
                }
              })
          })
          .catch(() => {})
      } else {
        this.$message({
          type: 'warning',
          message: '请先上传附件',
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    fileList(files) {
      switch (this.typeindex) {
        case 1:
          this.tplTopArry = []
          this.formData.tplTopNm = files[0].fileName
          this.formData.tplTopPath = files[0].filePath
          this.formData.tplTopPathId = files[0].id
          this.tplTopArry.push({
            fileName: files[0].fileName,
            filePath: files[0].filePath,
            id: files[0].id,
          })
          this.tplTopNmUploadConfig.filesHas = this.tplTopArry
          console.log(
            'this.tplTopNmUploadConfig.filesHas--文件信息----->',
            this.tplTopNmUploadConfig.filesHas
          )
          this.dialogVisible = false
          break
      }
    },
    Browse(index) {
      this.typeindex = index
      switch (index) {
        case 1:
            this.dialogVisible = true
            this.uploadConfig = this.tplTopNmUploadConfig
          break
        default:
          break
      }
    },
    buttonClick(params) {
      switch (params) {
        case '关闭':
          this.close()
          break
        case '保存':
          this.save()
          this.$router.back()
          break
        case '完成并发送':
          this.singelCheckF = true
          this.dialogTypeNow = 'next'
          this.offenUse = true
          this.loadingTree = true
          this.toNext()
          break
        // case '删除':
        case '删除此文':
          this.$confirm('是否删除此文?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.del()
          })

          break
        case '收回':
          this.$api.meeting.zfBack({ id: this.id }).then((res) => {
            this.$message({
              message: '收回完成',
              type: 'success',
            })
          })
          break
        case '承办参会单收回':
          this.$api.meeting
            .cbChBack({
              id: this.id,
              // avyId: this.todoItem.avyId,
              avyId: this.formData.avyId,
              // isCanOrCb: this.formData.isCanOrCb //0 参会   1承办
            })
            .then((res) => {
              this.$message({
                message: '收回完成',
                type: 'success',
              })
            })
          break
        case '传阅收回':
          this.cyArr = []
          this.cyObj = {}

          if (this.formData.wyPle.length == 0) {
            this.$message({ type: 'warning', message: '暂无未阅人员' })
          } else {
            let nameArr = this.formData.wyPle.split(',')
            let idArr = this.formData.cyToEn.split(',')
            for (let i = 0; i < nameArr.length; i++) {
              this.cyObj = {}
              this.cyObj = {
                name: nameArr[i],
                id: idArr[i],
              }
              this.cyArr.push(this.cyObj)
            }
            this.cyData = this.cyArr
            this.showCyPerson = true
          }
          break
        case '增发':
          // this.offenUse = false;
          // this.singelCheckF = false;
          // this.dialogTypeNow = 'ch';
          // this.sendCanHui();
          this.text = '增发'
          this.showOrgTree1 = true
          break
        case '承办催办':
          this.$api.meeting.cuiban({ id: this.id, typeFlag: '1' }).then((res) => {
            this.$message({
              message: '催办成功',
              type: 'success',
            })
          })
          break
        case '发办理单位':
          // console.log(76876)
          // this.offenUse = false;
          // this.singelCheckF = false;
          // this.dialogTypeNow = 'ch';
          // this.loadingTree = true
          // this.dialogState = true;
          // 发承办
          // if (this.formData.entrustUnit) {
          // TPLBSNID: 'HY_XTHYTZCB',//区分流程   HY_XTHYTZCB  承办      参会 HY_XTHYTZCH
          //         isCanOrCb: '1' //0 参会   1承办
          // }
          this.text = '发办理单位'
          this.showOrgTree1 = true
          // this.sendCanHui();
          break
        case '传阅':
          // if (this.id && this.formData.signIdea) {
          this.singelCheckF = false
          this.offenUse = false
          this.loadingTree = true
          this.dialogTypeNow = 'cy'
          this.dialogState = true
          this.chuanYue()
          // }
          break
        case '办结':
          this.formData.currentNode = '办结'
          this.$api.meeting.zfUpdateData(this.formData).then((res) => {
            this.$message({
              message: '办结完成',
              type: 'success',
            })
          })
          break
        case '查看报名表':
          if (this.id && this.formData.feedback == '0') {
            //zflookBmb
            this.$api.meeting.zflookBmb({ id: this.id }).then((res) => {
              console.log(520, res)
            })
          }
          break
        case '查看流程':
          console.log(9999, this.id)
          this.$api.meeting.getProcess({ id: this.id }).then((res) => {
            this.showFlowChart = true
            this.flowChartList = res.list
          })
          break
        // case "发办理单位":
        case '打印处理单':
          break
        case '操作指南':
          break
      }
    },

    // 保存
    save() {
      this.$api.paraMeter.paraMeterAdd(this.formData).then((res) => {
        if (this.id) {
          this.publicationCreateFile()
        } else {
          this.id = this.res.data.tplId
          this.publicationCreateFile()
        }
        this.$message({
          type: 'success',
          message: '保存成功!',
        })
      })
    },
    publicationCreateFile() {
      console.log('上传刊物附件--------->表单ID', this.id)
      let arr = {
        fileIds: '',
        fileTypes: '',
      }
      if (this.formData.tplTopPathId) {
        arr.fileIds = this.formData.tplTopPathId
        arr.fileTypes = '800041'
        this.createFile(arr)
        console.log('获取上传文件的fileTypes', '800041')
      }
      if (this.formData.tplEndPathId) {
        arr.fileIds = this.formData.tplEndPathId
        arr.fileTypes = '800042'
        this.createFile(arr)
        console.log('获取上传文件的fileTypes', '800042')
      }
      if (this.formData.tplColumnStylePathId) {
        arr.fileIds = this.formData.tplColumnStylePathId
        arr.fileTypes = '800043'
        this.createFile(arr)
        console.log('获取上传文件的fileTypes', '800043')
      }
      if (this.formData.tplColumnTitlePathId) {
        arr.fileIds = this.formData.tplColumnTitlePathId
        arr.fileTypes = '800044'
        this.createFile(arr)
        console.log('获取上传文件的fileTypes', '800044')
      }
      if (this.formData.tplMainColumnPathId) {
        arr.fileIds = this.formData.tplMainColumnPathId
        arr.fileTypes = '800045'
        this.createFile(arr)
        console.log('获取上传文件的fileTypes', '800045')
      }
      if (this.formData.tplColumnCataloguePathId) {
        arr.fileIds = this.formData.tplColumnCataloguePathId
        arr.fileTypes = '800046'
        this.createFile(arr)
        console.log('获取上传文件的fileTypes', '800046')
      }
      if (this.formData.tplAuthorshipPathId) {
        arr.fileIds = this.formData.tplAuthorshipPathId
        arr.fileTypes = '800047'
        this.createFile(arr)
        console.log('获取上传文件的fileTypes', '800047')
      }
    },
    createFile(arr) {
      console.log(arr, '获取需啊保存的文件数据')
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: arr.fileIds,
          fileType: arr.fileTypes,
        })
        .then((res) => {
          console.log(res, '获取res')
        })
    },
    // 加载详情
    loadData(id) {
      this.id = id
      this.$api.paraMeter.paraMeterDetal({ tplId: id }).then((res) => {
        console.log(res.data)
        this.formData = res.data //详情赋值
        this.getFileTopWordNm()
      })
    },
    // 删除
    del() {},

    // 关闭
    close() {
      this.$confirm('是否保存并退出当前页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$router.back()
        })
        .catch(() => {
          this.$router.back()
        })
    },
    //详情反显附件
    getFileTopWordNm() {
      console.log('获取刊物附件--------->表单ID', this.id)
      this.$api.setSysConfig.getTextemList({ id: this.id, fileType: '800051' }).then((res) => {
        this.$nextTick(() => {
          this.$set(this, 'tplTopArry', res.data)
        })
      })
    },
  },
  activated() {},
  mounted() {},
  updated() {},
  created() {
    if (this.$route.query.tplId) {
      // 调用详情方法
      this.loadData(this.$route.query.tplId)
    }
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.comp_list {
  display: inline;
}
.uploader-btn {
  display: inline-block;
  position: relative;
  padding: 4px 8px;
  font-size: 100%;
  line-height: 1.4;
  color: #666;
  border: 1px solid #666;
  cursor: pointer;
  border-radius: 2px;
  background: none;
  outline: none;
}
.btn {
  margin-left: 10px;
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.zfTwo {
  background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 50px 70px;

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
    // min-height: 920px;
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
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;

          span {
            color: #f9aa21;
          }
        }
      }
    }

    .editor_box {
      height: 500px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 120px;
        color: #606266;
        font-size: 14px;
      }
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
.clear-fix:after {
  clear: both;
  content: '';
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.con-left {
  float: left;
  width: 80%;
  border-right: 1px solid #ccc;
  .con-left-p1 {
    width: 12%;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    border: 1px solid #ccc;
    border-left: 0;
    border-top: 0;
  }
  .con-left-p2 {
    width: 88%;
    height: 30px;
    line-height: 30px;
    float: left;
    border-bottom: 1px solid #ccc;
  }
  .bottom-none {
    border-bottom: 0;
  }
}
.con-right {
  float: left;
  width: 20%;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.adviceInfo {
  position: absolute;
  width: 95%;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.pad_lr10 {
  padding: 0 10px;
}
.chuanyue1 {
  border-bottom: 1px solid #ccc;
}
.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  height: 50px;
  line-height: 50px;
  float: left;
  border-right: 1px solid #ccc;
  text-align: center;
}
.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
.par {
  position: relative;
  .par-child {
    position: absolute;
    top: 30px;
  }
}
/deep/.radio-form .el-radio {
  margin: 10px;
}
</style>
