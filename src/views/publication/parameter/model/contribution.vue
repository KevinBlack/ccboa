d/**
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
    </div> -->
    <!-- <div class="right">
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button>
      <el-button plain class="bank_grid_comtent_active" @click="buttonClick('保存')">保存</el-button>
    </div> -->
    <el-row style="margin-bottom: 10px">
      <el-col :span="6">
        <select-org-or-dept class="el-cs"  :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId"  @select="selectOrg" :disabled="addDis">
          <el-input :disabled="addDis" type="text" readonly="readonly" v-model="searchDataInfo" suffix-icon="el-icon-arrow-down" />
        </select-org-or-dept>
      </el-col>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('关闭')">关闭</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('保存')">保存</el-button>
    </el-row>
    <div class="formHeader">
      <div class="title-text">直接投稿权限</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>
      <el-form ref="formData" :model="formData" label-width="160px">
        <el-form-item label="直接投稿职位:">
          <el-checkbox-group v-model="formData.directRoleId">
            <el-checkbox :label="item.dicId" v-for="(item,index) in obj" :key="index" name="type">{{item.codeName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import selectOrgOrDept from 'components/select/selectOrgOrDept'
import { mapGetters, mapActions } from 'vuex'

import uploadFileTs from 'components/uploadFile/uploadFileTs'
export default {
  name: 'zfTwo',
  components: {
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      orgOrDept: 1,
      orgOrDeptId: '1',
      addDis: false,
      identity: Boolean,
      searchData: {},
      draforgnmPeople: [],
      searchDataInfo: '',
      unitCode: JSON.parse(localStorage.getItem('userInfo')).unitId,
      // 委托承办单位
      obj: [], //jie
      formData: {
        directId: '',
        directRoleId: [],
        directRoleNm: '',
      },
      radio1: '',
      rules: {},
      searchDataInfoId: '',
    }
  },
  computed: {},
  methods: {
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem('tcHumanRole'))
      this.draforgnmPeople = manger.filter((item) => {
        return item.codeType === 'manager_type' && (item.dicCode === 'sys_manager' || item.dicCode === 'busi_manager' )
      })
        this.searchDataInfo = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
        this.formData.creatOrgId = this.searchDataInfoId = JSON.parse(localStorage.getItem('userInfo')).unitId
      if (this.draforgnmPeople.length !== 0) {
        this.addDis = false
        this.identity = true
      } else {
        this.addDis = true
        this.identity = false
      }
    },
    // 选择机构
    selectOrg(org) {
      // this.formData={
      //   directId '',
      //   directRoleId: [],
      //   directRoleNm: '',
      // }
      this.formData.directId = ''
      this.formData.directRoleId = []
      this.formData.directRoleNm = ''
      this.searchDataInfo = org.unitName
      this.searchData.parentUnit = org.id
      console.log(org.id)
      // this.loadData()
      this.formData.creatOrgId = org.id

      this.$api.paraMeter.ContributeDirectlyxz(this.formData).then((res) => {
        if (res.data.directRoleId) {
          this.formData.directId = res.data.directId
          this.formData.directRoleId = res.data.directRoleId
        } else {
          this.formData.directRoleId = []
        }
        // this.formData.directRoleId = res.data.directRoleId
      })

      this.$api.setting.person.getPersonInfo({ codeType: 'role_type' }).then((res) => {
        this.obj = res.data
        let obj = {}
        res.data.forEach((item) => {
          obj[item.dicId] = item.codeName
        })
        this.checkboxs = obj
      })
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
    },
    buttonClick(params) {
      switch (params) {
        case '关闭':
          this.close()
          break
        case '保存':
          this.save()
          break
      }
    },
    // 保存
    save() {
      this.$api.paraMeter.ContributeDirectlylist(this.formData).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功!',
        })
        // this.$router.back()
      })
    },
    // 获取
    save1() {
      this.formData.creatOrgId = this.searchDataInfoId
      this.$api.paraMeter.ContributeDirectlyxz(this.formData).then((res) => {
        // if (res.data) {
        //   this.formData.directRoleId = res.data.directRoleId
        // } else {
        //   this.formData.directRoleId = []
        // }
        console.log(res.data.directRoleId)
        if (res.data.directRoleId) {
          this.formData = res.data
          this.formData.directRoleId = res.data.directRoleId
          // debugger
        } else {
          this.formData.directRoleId = []
        }
        // this.formData.directRoleId = res.data.directRoleId
      })
    },
    // 加载详情
    loadData() {
      this.$api.setting.person.getPersonInfo({ codeType: 'role_type' }).then((res) => {
        this.obj = res.data
        let obj = {}
        res.data.forEach((item) => {
          obj[item.dicId] = item.codeName
        })
        this.checkboxs = obj
      })

      this.addDrafOrgNm()
    },
    // 删除
    del() {},

    // 关闭
    close() {
      // this.$confirm('是否保存并退出当前页面?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // })
      //   .then(() => {
      this.$router.back()
      //   })
      //   .catch(() => {
      //     this.$intent.closeWindow(this)
      //   })
    },
  },
  activated() {},
  mounted() {},
  updated() {},
  created() {
    this.loadData()
    this.save1()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
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
.zfTwo {
  min-height: calc(100vh - 180px);
}
.el-cs /deep/ .el-scrollbar {
  height: calc(100% - 30px) !important;
}
</style>
