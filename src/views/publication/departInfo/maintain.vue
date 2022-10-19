<template>
  <div class="zfTwo">
    <div class="handleButton">
      <el-button v-if="!isEdit" type="primary" @click="save_btn">保存</el-button>
      <el-button v-else type="primary" style="margin-left:20px;" @click="edit_btn">编辑</el-button>
      <el-button type="primary" @click="$router.go(-1)">关闭</el-button>

    </div>
    <div class="formHeader">
      <div class="title-text">信息种类维护</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>
      <el-form ref="ruleForm" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="序号">
              <el-input v-model="formData.tpyeNo" style="width:500px" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="机构名称">
              <!-- <el-select v-model="formData.parentUnitNm" placeholder="请选择活动区域" style="width:500px" :disabled="isEdit">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select> -->
              <select-org-or-dept @select="selectOrg" :orgOrDept="orgOrDeptJg" :orgOrDeptId="orgOrDeptIdJg">
                <el-input type="text" readonly="readonly" :disabled="isEdit" placeholder="请选择" v-model="formData.parentUnitNm" suffix-icon="el-icon-arrow-down" />
              </select-org-or-dept>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="主办部门" prop="unitNm">
              <!-- <el-select v-model="formData.unitNm" placeholder="请选择活动区域" style="width:500px" :disabled="isEdit">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select> -->
              <select-org-or-dept @select="selectOrg" :orgOrDept="orgOrDeptBm" :orgOrDeptId="orgOrDeptIdBm">
                <el-input type="text" readonly="readonly" :disabled="isEdit" placeholder="请选择" v-model="formData.parentUnitNm" suffix-icon="el-icon-arrow-down" />
              </select-org-or-dept>
            </el-form-item>
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
              <span class="tex">模板标签对应关系格式为“书签名称表单域名城”多个标签请用半角分号隔开；</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="合成格式替换书签" prop="hcggShuQian">
              <el-input v-model="formData.hcggShuQian" :disabled="isEdit"></el-input>
              <span class="tex">模板标签对应关系格式为“书签名称表单域名城”多个标签请用半角分号隔开；</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="模板" prop="tplNm">
              <el-input v-model="formData.tplNm" :disabled="isEdit"></el-input>
              <span>请下载此基础模板修改信息种类作为模板上传！</span>
              <a href="#">基础模板</a>
            </el-form-item>
          </el-col>
          <el-button class="btn" :span="2" style="margin-left:20px" :disabled="isEdit">浏览</el-button>
        </el-row>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formData.remark" :disabled="isEdit"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from 'components/select/selectOrgOrDept'

export default {
  name: 'departInfomaintain',
  components: {
    selectOrgOrDept,
  },

  data() {
    return {
      isEdit: false,
      formData: {},
      orgOrDeptJg: 1,
      orgOrDeptIdJg: '1',
      orgOrDeptBm: 0,
      orgOrDeptIdBm: '',
    }
  },
  computed: {},
  methods: {
    selectOrg(org) {
      this.searchData.orgName = org.unitName
      this.orgOrDeptIdBm = this.searchData.unitCode = org.id
      this.pagination = {
        pageNum: 1,
        pageSize: 20,
      }
      this.loadData()
    },
    // buttonClick(params) {
    //   switch (params) {
    //     case "关闭":
    //       this.close();
    //       break;
    //     case "保存":
    //       this.save();
    //       break;
    //   }
    // },
    change() {},
    // 保存
    save_btn() {
      this.$api.pubInfo.editInfo(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            message: '保存成功',
            type: 'success',
          })
        }
      })
      this.$router.back()
    },
    edit_btn() {
      this.isEdit = !this.isEdit
      // this.setFormConfig()
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
  activated() {},
  mounted() {},
  updated() {},
  created() {
    let type = this.$route.query.rowData.type
    let rowData = this.$route.query.rowData
    console.log('rowData', rowData)
    switch (type) {
      case 0:
        this.isEdit = false
        break
      case 1:
        this.isEdit = !this.isEdit
        this.formData = rowData
        // console.log(this.formData+'123')
        break
    }
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.tex {
  color: #bbbaba;
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
  padding-right: 0px;
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
