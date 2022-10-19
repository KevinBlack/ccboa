<!--
 * @Author: zj
 * @Date: 2020-10-11 14:43:43
 * @LastEditTime: 2021-03-19 11:20:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\publication\parameter\manage\departmentManage.vue
--> 
<!-- TODO:PUB是否为高级编辑可编辑||是否存在编辑按钮 -->
<template>
  <div class="zfTwo">
    <el-row style="margin-bottom: 10px">
      <el-col :span="6">
        <select-org-or-dept class="el-cs" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @select="selectOrg" :disabled="addDis">
          <el-input :disabled="addDis" type="text" readonly="readonly" v-model="searchDataInfo" suffix-icon="el-icon-arrow-down" />
        </select-org-or-dept>
      </el-col>
      <el-button type="primary" style="margin-left:20px;" @click="$router.go(-1)">关闭</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('保存')">保存</el-button>
    </el-row>
    <div class="formHeader">
      <div class="title-text">评审意见配置</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="120px">
        <el-form-item label="审批意见" prop="opinionContext">
          <el-input v-model="formData.opinionContext"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from 'components/select/selectOrgOrDept'
export default {
  name: 'reviewIdea',
  components: {
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      orgOrDept: 1,
      orgOrDeptId: '1',
      addDis: false,
      searchDataInfo: '',
      unitCode: JSON.parse(localStorage.getItem('userInfo')).unitId,
      // 委托承办单位
      rules: {
        opinionContext: [
          {
            required: true,
            message: '审批意见不能为空',
            trigger: 'blur',
          },
        ],
      },
      formData: {
        opinionContext: '',
      },
      radio1: '',
    }
  },
  created() {
    this.loadData()
    this.addDrafOrgNm()
  },
  methods: {
    // 加载详情
    loadData() {
      if (this.$route.query.queryItem === 'cellClick') {
        this.searchDataInfo = this.$route.query.creatOrgName
        this.formData.creatOrgId = this.$route.query.creatOrgId
        let obj = {}
        obj.opinionId = this.$route.query.row1
        this.$api.paraMeter.ReviewIdeaListData(obj).then((res) => {
          this.formData = res.data
        })
      } else if (this.$route.query.queryItem === 'new') {
        this.searchDataInfo = this.$route.query.creatOrgName
        this.formData.creatOrgId = this.$route.query.creatOrgId
      }
    },
    // 选择机构
    selectOrg(org) {
      this.searchDataInfo = org.unitName
      this.formData.creatOrgId = org.id
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
      this.searchDataInfo = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      this.formData.creatOrgId = JSON.parse(localStorage.getItem('userInfo')).unitId
    },
    // 按钮
    buttonClick(params) {
      switch (params) {
        case '保存':
          this.save()
          break
      }
    },
    // 保存
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$api.paraMeter.pinshenyjide(this.formData).then((res) => {
            this.$router.back()
          })
        }
      })
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
