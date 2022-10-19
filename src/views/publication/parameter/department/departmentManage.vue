<!--
 * @Author: zj
 * @Date: 2020-10-11 14:43:43
 * @LastEditTime: 2021-03-16 14:17:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\publication\parameter\manage\departmentManage.vue
-->

<template>
  <div class="departmentMange">
    <el-row style="margin-bottom: 10px">
      <el-col :span="6">
        <select-org-or-dept class="el-cs" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @select="selectOrg" :disabled="addDis">
          <el-input :disabled="addDis" type="text" readonly="readonly" v-model="searchDataInfo" suffix-icon="el-icon-arrow-down" />
        </select-org-or-dept>
      </el-col>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('关闭')">关闭</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('保存并关闭')">保存并关闭</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('保存')">保存</el-button>
    </el-row>
    <div class="formHeader">
      <div class="title-text">部门类别配置</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>
      <div class="formdata">
        <div id="wjys" class="height_90"></div>
        <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="部门名称" prop="unitNm">
                <el-input v-model="formData.unitNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-button class="btn" :span="2" @click="Browse(1)">选择</el-button>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="统计等同名称" prop="unionUnitNm">
                <el-input v-model="formData.unionUnitNm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-button class="btn" :span="2" @click="Browse(2)">选择</el-button>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="说明">
                <p style="color: #606266;">1、部门名称：作为主部门。<br />2、统计等同名称中的部门统计数据将合并到主部门。</p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <org-tree v-model="showOrgTree" title="选择部门" :orgOrDept="orgOrDeptBm" :orgOrDeptId="orgOrDeptIdBm" :selectDept="selectDept" @orgList="getOrgList"></org-tree>
    <org-tree v-model="showOrgTree1" title="选择统计部门" :orgOrDept="orgOrDeptBm" :orgOrDeptId="orgOrDeptIdBm" :selectDept="selectDept1" @orgList="getOrgList1"></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from 'components/tree/orgTree'
import selectOrgOrDept from 'components/select/selectOrgOrDept'
export default {
  name: 'departmentManage',
  components: {
    orgTree,
    selectOrgOrDept,
  },
  data() {
    return {
            orgOrDept:1,
      orgOrDeptId:'1',
      orgOrDeptBm:0,
      orgOrDeptIdBm:'',
      searchDataInfo: '',
      searchDataInfoId: '',
      selectDept: [],
      selectDept1: [],
      formData: {
        serialNumber: '', //序号
        unitId: '', //部门id
        unitNm: '', //部门名称
        unitBvNm: '', //部门简称
        unionUnitId: '', //统计合并部门
        unionUnitNm: '', // 统计合并部门名称
        parentUnit: '', //所属机构id
        isUse: '', //是否启用：1 启用 0 禁用
        scType: '',
        parentUnit: '', //登陆人的部门id
      },
      rules: {
        unitNm: [
          {
            required: true,
            message: '部门不能为空',
            trigger: 'change',
          },
        ],
        unionUnitNm: [
          {
            required: true,
            message: '统计等同名称不能为空',
            trigger: 'change',
          },
        ],
      },
      addDis: false, //是否可以选择机构
      showOrgTree: false,
      showOrgTree1: false,
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 加载详情
    loadData() {
      this.addDrafOrgNm()
      if (this.$route.query.scComDepId) {
        this.$api.paraMeter
          .TjhbBjxq({ scComDepId: this.$route.query.scComDepId, parentUnit: this.searchDataInfoId })
          .then((res) => {
            if (res.code == 'SUCCESS') {
              this.formData = res.data
            }
          })
      }
      this.searchDataInfo = this.$route.query.creatOrgNm
      this.formData.parentUnit = this.$route.query.creatOrgId
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem('tcHumanRole'))
      this.draforgnmPeople = manger.filter((item) => {
        return item.codeType === 'manager_type' && (item.dicCode === 'sys_manager' || item.dicCode === 'busi_manager' )
      })
      if (this.draforgnmPeople.length !== 0) {
        this.addDis = false
      } else {
        this.addDis = true
      }
      this.searchDataInfo = JSON.parse(localStorage.getItem('userInfo')).unitName
      this.orgOrDeptIdBm = this.formData.parentUnit = JSON.parse(localStorage.getItem('userInfo')).unitId
    },
    // 按钮
    buttonClick(params) {
      switch (params) {
        case '关闭':
          this.close()
          break
        case '保存':
          this.save()
          break
        case '保存并关闭':
          this.saveClose()
          break
      }
    },
    saveClose() {
      this.save()
      this.$router.push({ path: '/publication/parameter/department/index' })
    },
    // 保存
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let list = JSON.parse(localStorage.getItem('unitInfo'))
          this.$api.paraMeter.TjhbBj(this.formData).then((res) => {
            if (res.code == 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '保存成功!',
              })
            }
          })
        }
      })
    },
    // 关闭
    close() {
      this.$router.back()
    },
    // 选择机构
    selectOrg(org) {
      this.searchDataInfo = org.unitName
      this.formData.parentUnit = org.id
      if (this.$route.query.scComDepId) {
        this.$api.paraMeter
          .TjhbBjxq({
            scComDepId: this.$route.query.scComDepId,
            parentUnit: this.formData.parentUnit,
          })
          .then((res) => {
            if (res.code == 'SUCCESS') {
              this.formData = res.data
              console.log(res)
            }
          })
      } else {
      }
    },
    //选择部门
    Browse(val) {
      switch (val) {
        case 1:
          this.showOrgTree = true
          break
        case 2:
          this.showOrgTree1 = true
      }
    },
    getOrgList(org) {
      this.$set(this.formData, 'unitNm', org.unitName)
      this.$set(this.formData, 'unitId', org.id)
    },
    getOrgList1(org) {
      let arr = []
      let arr1 = []
      org.map((item) => {
        if (Object.keys(item)) {
          arr.push(item.unitName)
          arr1.push(item.id)
        }
      })
      this.$set(this.formData, 'unionUnitNm', arr.join(','))
      this.$set(this.formData, 'unionUnitId', arr1.join(','))
    },
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
.departmentMange {
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
.departmentMange {
  min-height: calc(100vh - 180px);
}
.el-cs /deep/ .el-scrollbar {
  height: calc(100% - 30px) !important;
}
</style>
