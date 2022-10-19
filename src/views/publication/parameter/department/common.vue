<!--
 * @Author: zj
 * @Date: 2020-10-11 14:43:43
 * @LastEditTime: 2021-03-22 13:43:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\publication\parameter\manage\departmentManage.vue
--> 
<template>
  <div class="common">
    <el-row style="margin-bottom: 10px">
      <el-col :span="6">
        <select-org-or-dept class="el-cs" @select="selectOrg" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" :disabled="addDis">
          <el-input :disabled="addDis" type="text" readonly="readonly" v-model="searchDataInfo" suffix-icon="el-icon-arrow-down" />
        </select-org-or-dept>
      </el-col>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('关闭')">关闭</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('保存')">保存</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('金格')" v-show="false">金格eg1</el-button>
    </el-row>
    <div class="formHeader">
      <div class="title-text">常用及部门发送配置</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <el-form ref="ruleForm" :model="formData" label-width="200px" :rules="rules">
        <el-form-item label="常用及部门发送配置" prop="commonIsflag">
          <el-radio-group v-model="formData.commonIsflag">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from 'components/select/selectOrgOrDept'
export default {
  name: 'common',
  components: {
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      orgOrDept:1,
      orgOrDeptId:'1',
      identity: Boolean,
      formData: {
        commonIsflag: '',
      },
      searchData: {},
      searchDataInfo: '',
      searchDataInfoId: '',
      addDis: false, //是否可以选择机构
      rules: {
        commonIsflag: [{ required: true, message: '请选择行别是否发送', trigger: 'change' }],
      },
    }
  },
  computed: {},
  methods: {
    // 选择机构
    selectOrg(org) {
      this.searchDataInfo = org.unitName
      this.searchDataInfoId = org.id
      this.loadData()
    },
    buttonClick(params) {
      switch (params) {
        case '关闭':
          this.close()
          break
        case '保存':
          this.save()
          break
        case '金格':
          this.jinge()
          break
      }
    },
    jinge() {
      console.log('开始-------------------------')
      //刊物定稿
      //1.下载附件
      let bank_doDownloadFile = { function: 'doDownloadFile' }
      bank_doDownloadFile.fileName = '参数配置合稿模板.doc'
      bank_doDownloadFile.filePath = '/home/nas/p8Files/2021/4/15/1110240NA1618484188030184.doc'
      let draftInfo = [
        {
          filePath: "/home/nas/p8Files/2021/4/12/1110240NA1618206670000365.doc",
          fileName: "1110240NA1618206670000365.doc"
        },
        {
          filePath: "/home/nas/p8Files/2021/4/15/1110240NA1618466627054428.doc",
          fileName: "1110240NA1618466627054428.doc"
        },
      ]
      console.log(bank_doDownloadFile,draftInfo,'获取需要数据-------------------------')

      this.$store.dispatch('setDinggaoInfo', {
        id: '192168222', 
        nper: '',
        time: '2021-4-16 17:09:47',
        menu: '这是标题',
        send: '董事长，行长，监事长，高管层，总行各部门负责人，各分行行长,各海外机构、各审计分部、各总审计室负责人，建行大学各专业研修院、各学院负责人，各子公司负责人',
        content: '内容',
        draftInfo: draftInfo
      })
      this.$post
        .postData('doDownloadFile', JSON.stringify(bank_doDownloadFile), this.$businessCode.fawglfj)
        .then((res) => {
          console.log(res,'模板下载结果-------------------------')
          if(res){
            this.doDraft(res)
          }
        })
    },
    doDraft(fileInfo){
      console.log(fileInfo,'跳转金格-------------------------')
      let data = this.$router.resolve({
        path: '/openAndSave_WordHk',
        query: {
          state: 'viewFile',
          id: '192168222',
          tanSun: '2',
          zhengWenState: 2,
          JYcode: 'A08462002',
          multiTenancyId: 'CN025',
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '',
          showBtns: true,
          // cleanDraftFlag: true,
          isDinggao: 2,
          EditType: '1',
        },
      })
      this.$forceUpdate()
      window.open(data.href, '_blank')
    },
    // 关闭
    close() {
      this.$router.back()
    },
    // 保存
    save() {
      this.formData.creatOrgId = this.searchDataInfoId
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$api.paraMeter.Fadepartment(this.formData).then((res) => {
            if (res.code == 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '常用及部门发送配置成功!',
              })
              this.$router.push({
                path: '/publication/parameter/manage/index',
              })
            }
          })
        }
      })
    },
    // 加载详情
    loadData() {
      this.$api.paraMeter.FadepartmentXq({ creatOrgId: this.searchDataInfoId }).then((res) => {
        if (res.code == 'SUCCESS') {
          if (res.data) {
            this.formData = res.data
          } else {
            this.formData = {}
          }
        }
      })
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem('tcHumanRole'))
      this.draforgnmPeople = manger.filter((item) => {
        return (
          item.codeType === 'manager_type' &&
          (item.dicCode === 'sys_manager' || item.dicCode === 'busi_manager')
        )
      })
      this.searchDataInfo = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      this.searchDataInfoId = JSON.parse(localStorage.getItem('userInfo')).unitId
      if (this.draforgnmPeople.length !== 0) {
        this.addDis = false
        this.identity = true
      } else {
        this.addDis = true
        this.identity = false
      }
    },
  },
  created() {
    this.addDrafOrgNm()
    this.$api.paraMeter.FadepartmentXq({ creatOrgId: this.searchDataInfoId }).then((res) => {
      if (res.code == 'SUCCESS') {
        if (res.data) {
          this.formData = res.data
        }
      }
    })
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.btn {
  margin-left: 30px;
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.common {
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
.common {
  min-height: calc(100vh - 180px);
}
.el-cs /deep/ .el-scrollbar {
  height: calc(100% - 30px) !important;
}
</style>
