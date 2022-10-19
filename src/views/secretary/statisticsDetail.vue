<!--
 * @Author: zj
 * @Date: 2020-10-11 14:43:43
 * @LastEditTime: 2020-12-22 10:07:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\publication\parameter\manage\departmentManage.vue
--> 

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
      <el-button type="primary" style="margin-left:20px;" @click="$router.go(-1)">关闭</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('保存')">保存</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">常用及部门发送配置</div>
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
import mTable from '@/components/table/tTable'

import selectOrgOrDept from 'components/select/selectOrgOrDept'

import uploadFileTs from 'components/uploadFile/uploadFileTs'
export default {
  name: 'zfTwo',
  components: {},
  props: {},
  data() {
    return {
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

      currentUser: JSON.parse(localStorage.getItem('userInfo')).humanName,
      currentUserId: JSON.parse(localStorage.getItem('userInfo')).humanId,
    }
  },
  computed: {},
  methods: {
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
      this.$refs['ruleForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$api.paraMeter.pinshenyjide(this.formData).then((res) => {
            this.$router.back()
          })
        }
      })
    },
    // 加载详情
    loadData() {},
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
          this.$intent.closeWindow(this)
        })
    },
  },
  activated() {},
  mounted() {},
  updated() {},
  created() {
    console.log(this.$route.query.queryItem)
    if (this.$route.query.queryItem === 'cellClick') {
      let obj = {}
      obj.opinionId = this.$route.query.row1
      this.$api.paraMeter.ReviewIdeaListData(obj).then((res) => {
        console.log(res.data, '获取res')
        this.formData = res.data
      })
    }
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
