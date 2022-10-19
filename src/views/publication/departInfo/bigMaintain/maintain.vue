<template>
  <div class="maintain">
    <div class="handleButton">
      <el-button v-show="accessoryHide" type="primary" @click="hide_btn">隐藏按钮</el-button>
      <el-button v-if="!isEdit" type="primary" @click="save_btn">保存</el-button>
      <el-button v-else type="primary" style="margin-left: 20px" @click="edit_btn">编辑</el-button>
      <el-button type="primary" @click="$router.go(-1)">关闭</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">信息种类维护</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="140px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="机构名称" prop="parentUnitNm">
              <el-input v-model="formData.parentUnitNm" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 24px">
            <el-button type="primary" @click="selectOrg" :disabled="isEdit">选择</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="主办部门" prop="unitNm">
              <el-input v-model="formData.unitNm" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 24px">
            <el-button type="primary" @click="selectDepar" :disabled="isEdit">选择</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="简报名称" prop="jbNm">
              <el-input v-model="formData.jbNm" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="起草替换书签" prop="qcShuQian">
              <el-input v-model="formData.qcShuQian" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item>
              <p class="tex">模板标签对应关系格式为“书签名称|表单域名称”，多个书签请用半角分号隔开;</p>
              <p class="tex" style="margin-top: -10px;">例如：BookMarkName1|fieldName1;BookMarkName2|fieldName2</p>
            </el-form-item>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="合成格式替换书签" prop="hcggShuQian">
              <el-input v-model="formData.hcggShuQian" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item>
              <p class="tex">模板标签对应关系格式为“书签名称|表单域名称”，多个书签请用半角分号隔开;</p>
              <p class="tex" style="margin-top: -10px;">例如：BookMarkName1|fieldName1;BookMarkName2|fieldName2</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="模板" prop="tplNm">
              <el-input v-model="formData.tplNm" :disabled="isEdit" readonly="readonly"></el-input>
              <div v-show="deleteBtn" v-for="(item,index) in pubTplPath_another" :key="index">
                <span>请下载此基础模板修改信息种类作为模板上传！</span><span style="color:blue" @click="downFile(item)">基础模板</span>
              </div>
            </el-form-item>
          </el-col>
          <el-button class="btn" :span="2" style="margin-left: 15px" @click="Browse" :disabled="isEdit">浏览</el-button>
          <div v-for="(item,index) in pubTplPath" :key="index" style="display:inline-block;margin-left:15px;">
            <el-button class="btn" v-show="!deleteBtn" :span="2" @click="deleteRowSys(index,item.id)" :disabled="isEdit">删除</el-button>
            <el-button class="btn" v-show="!deleteBtn" :span="2" @click="downFile(item)" :disabled="isEdit">下载</el-button>
          </div>

        </el-row>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formData.remark" :disabled="isEdit"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="上传" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传" :visible.sync="dialogVisible_another" width="30%" :before-close="handleClose">
      <upload-file-ts :uploadConfig="uploadConfig_another" @fileList="fileList_another"></upload-file-ts>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_another = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_another = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--    选择树-->
    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList"></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from 'components/tree/orgTree'
import uploadFileTs from 'components/uploadFile/uploadFileTs'

import openOrDownLoadFile from '@/minixs/shiwuLineWord'
export default {
  name: 'maintain',
  components: {
    orgTree,
    uploadFileTs,
  },
  mixins: [openOrDownLoadFile],
  data() {
    return {
      deleteBtn:true,//删除按钮是否显示
      uploadConfig: {
        formId: 'teleMent',
        filesHas: [],
        isSpecial: '8000408',
        sysFileHas: [],
      },
      uploadConfig_another: {
        formId: 'teleMentOne',
        filesHas: [],
        isSpecial: '80004081',
        sysFileHas: [],
      },
      dialogVisible: false,
      dialogVisible_another: false, //临时附件
      isEdit: false,
      id: '',
      accessoryHide: false, //附件上传按钮
      formData: {
        // no: "", //序号
        parentUnitNm: '', //机构名称
        parentUnitId: '', //机构id
        unitNm: '', //部门名称
        unitId: '', //部门id
        jbNm: '', //简报名称
        qcShuQian: '￥￥Creator|Creator', //起草书签
        hcggShuQian: '￥￥fdate|Fdate;￥￥SendObj|SendObj;￥￥Findex|Findex', //合成格式书签
        tplNm: '', //模板名称
        tplPath: '', //模板地址
        remark: '', //备注
      },
      rules: {
        parentUnitNm: [{ required: true, message: '请选择机构名称', trigger: 'change' }],
        unitNm: [{ required: true, message: '请选择主办部门', trigger: 'change' }],
        jbNm: [{ required: true, message: '请填写简报名称', trigger: 'blur' }],
        qcShuQian: [{ required: true, message: '请填写起草替换书签', trigger: 'blur' }],
        hcggShuQian: [{ required: true, message: '请填写合成格式替换书签', trigger: 'blur' }],
        // tplNm: [{ required: true, message: '请选择模板', trigger: 'change' }],
      },
      title: '选择部门',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '1',
      pubTplPath: [],
      pubTplPath_another: [
        {
          fileName: '',
          filePath: '',
        }
      ],
      pubTplPathId: '',
    }
  },
  computed: {},
  methods: {
    hide_btn() {
      this.dialogVisible_another = true
    },
    deleteRowSys(n, id) {
      this.$confirm('是否删除附件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then((res) => {
        this.$api.setSysConfig
          .deleFile({
            id: id,
          })
          .then((res) => {
            if (res && res.code == 'SUCCESS') {
              this.pubTplPath.splice(n, 1)
              this.uploadConfig.filesHas = this.pubTplPath
              this.formData.tplNm = ''
              
              this.isEdit = false
              this.confirmFile()
              this.deleteBtn = true
              this.$message({
                type: 'success',
                message: '删除成功',
              })
            }
          })
      })
    },
    Browse() {
      if (this.pubTplPath.length == 0) {
        this.dialogVisible = true
      } else {
        this.$message({
          type: 'warning',
          message: '请先删除原文件后再上传新文件',
        })
      }
    },
    fileList_another(files) {
      this.pubTplPathId = files[0].id
      let params = {
        depInfoPubId: '-10000',
        pubMainFilePath: files[0].filePath,
        jbNo: files[0].id,
        topTitle: files[0].fileName,
      }
      this.pubTplPath_another.push({
        fileName: files[0].fileName,
        filePath: files[0].filePath,
        id: files[0].id,
      })
      this.uploadConfig_another.sysFileHas = this.pubTplPath_another
      this.$api.pubInfo
        .accessoryStorage(params)
        .then((res) => {
          if(res){
            this.dialogVisible_another = false
          }else{
            this.$message({
              type:'warning',
              message:'上传失败'
            })
          }
          console.log('commit succeed', res)
        })
        .catch((err) => {
          console.log('commit feil', err)
        })
    },
    //选择模板赋值
    fileList(files) {
      this.formData.tplNm = files[0].fileName
      this.formData.tplPath = files[0].filePath
      this.pubTplPathId = files[0].id
      this.pubTplPath = []
      this.pubTplPath.push({
        fileName: files[0].fileName,
        filePath: files[0].filePath,
        id: files[0].id,
      })
      this.uploadConfig.sysFileHas = this.pubTplPath
      this.dialogVisible = false
      this.deleteBtn = false
    },
    // 保存模板数据
    createFile(id) {
      let params = {
        id: id + '',
        fileId: this.pubTplPathId,
        fileType: '8000408',
      }
      let params_another = {
        id: '10800040810327',
        fileId: this.pubTplPathId,
        fileType: '80004081',
      }
      if(this.formData.tplNm){
        this.$api.setSysConfig
          .saveFile(params)
          .then((res) => {
            console.log(res, '获取res')
          })
      }else{
        this.$api.setSysConfig
          .saveFile(params_another)
          .then((res) => {
            console.log(res, '获取res')
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
    selectOrg() {
      this.title = '选择机构'
      this.isSingle = true
      this.orgOrDept = 1
      this.orgOrDeptId = '1'
      this.showOrgTree = true
    },

    selectDepar() {
      if (!this.formData.parentUnitId) {
        this.$message({
          message: '请先选择机构',
          type: 'success',
        })
        return
      }
      this.title = '部门'
      this.isSingle = true
      this.orgOrDept = 0
      this.orgOrDeptId = this.formData.parentUnitId
      this.showOrgTree = true
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == '1') {
        this.formData.parentUnitId = org.id
        this.$set(this.formData, 'parentUnitNm', org.unitName)
        this.$set(this.formData, 'parentUnitId', org.id)
      } else {
        this.$set(this.formData, 'unitNm', org.unitName)
        this.$set(this.formData, 'unitId', org.id)
      }
    },
    // 保存
    save_btn() {
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          if (!this.id) {
            this.$api.pubInfo.editInfo(this.formData).then((res) => {
              console.log(res)
              if (res.code == 'SUCCESS') {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                })
                  this.createFile(res.data.fileId)
                this.$router.push({
                  path: '/publication/departInfo/bigMaintain/csMaintain',
                })
              }
            })
          } else {
            this.$api.pubInfo.updateInfo(this.formData).then((res) => {
              if (res.code == 'SUCCESS') {
                this.$message({
                  message: '更新成功',
                  type: 'success',
                })
                  this.createFile(res.data.fileId)
              }
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请填写表单',
          })
        }
      })
    },
    edit_btn() {
      this.isEdit = !this.isEdit
    },
    getFileTopWordNm() {
      this.$api.setSysConfig
        .getTextemList({ id: this.$route.query.listId + '', fileType: '8000408' })
        .then((res) => {
          this.$nextTick(() => {
            this.pubTplPath = res.data
            this.uploadConfig.filesHas = this.pubTplPath
          })
        })
    },
    //
    confirmFile() {
      this.$api.paraMeter.paraMeterList({ tplNm: 'depInfoBase' }).then((res) => {
        console.log(res.data[0])
        this.pubTplPath_another[0].fileName = res.data[0].tplTopNm
        this.pubTplPath_another[0].filePath = res.data[0].tplTopPath
      })
    },
    // 关闭
    close() {
      this.$confirm('是否保存并退出当前页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.formData.typeFlag = '0'
          if (this.id) {
            this.$api.meeting.zfUpdateData(this.formData).then((res) => {
              this.$intent.closeWindow(this)
            })
          } else {
            this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                this.$api.meeting.zfAddData(this.formData).then((res) => {
                  this.$intent.closeWindow(this)
                })
              }
            })
          }
        })
        .catch(() => {
          this.$intent.closeWindow(this)
        })
    },
  },
  created() {
    this.id = this.$route.query.indexId
    if (this.id) {
      this.isEdit = !this.isEdit
      this.$api.pubInfo.getInfoList({ tpyeNo: this.id }).then((res) => {
        this.formData = res.data[0]
        if (this.formData.tplNm) {
          this.getFileTopWordNm()
          this.deleteBtn = false
        } else {
          this.confirmFile()
          this.deleteBtn = true
        }
      })
    } else {
      console.log('新建信息种类维护时采用默认模板')
      this.isEdit = false
      this.confirmFile()
      this.deleteBtn = true
    }
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.tex {
  color: red;
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.maintain {
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
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
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
      border: 1px solid #f60;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          display: inline-block;
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
