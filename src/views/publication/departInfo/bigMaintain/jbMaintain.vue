<template>
  <div class="zfTwo">
    <div class="handleButton">
      <el-button v-if="!isEdit" type="primary" @click="save_btn">保存</el-button>
      <el-button v-else type="primary" style="margin-left:20px;" @click="edit_btn">编辑</el-button>
      <el-button type="primary" @click="$router.go(-1)">关闭</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">流水号维护</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>
      <el-form ref="ruleForm" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="序号">
              <el-input v-model="formData.no" style="width:500px" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="机构名称">
              <el-input v-model="formData.unitNm" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:24px">
            <el-button type="primary" @click="selectOrg" :disabled="isEdit">选择</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="刊物名称" prop="inforNm">
              <el-select v-model="formData.inforNm" placeholder="请选择" :disabled="isEdit">
                <el-option v-for="(item,index) in options" :key="index" :label="item.jbNm" :value="item.jbNm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="年度" prop="year">
              <el-input v-model="formData.year" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="起始序号" prop="startNo">
              <el-input v-model="formData.startNo" :disabled="isEdit"></el-input>
              <!-- <span class="tex">模板标签对应关系格式为“书签名称表单域名城”多个标签请用半角分号隔开；</span> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="当前最大序号" prop="curMaxNo">
              <el-input v-model="formData.curMaxNo" :disabled="isEdit"></el-input>
              <!-- <span class="tex">模板标签对应关系格式为“书签名称表单域名城”多个标签请用半角分号隔开；</span> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="空缺文号" prop="kongqueNo">
              <el-input v-model="formData.kongqueNo" :disabled="isEdit"></el-input>
              <!-- <span class="tex">模板标签对应关系格式为“书签名称表单域名城”多个标签请用半角分号隔开；</span> -->
            </el-form-item>
            <el-form-item>
              <p class="tex" style="margin-top: -10px;color:red">例如：1,2,3,4,5</p>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--    选择树-->
    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList"></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from 'components/tree/orgTree'

export default {
  name: 'jbMaintain',
  components: {
    // selectOrgOrDept,
    orgTree,
  },

  data() {
    return {
      options: [],
      isEdit: false,
      formData: {
        no: '', //编号
        unitId: '', //机构编号
        unitNm: '', //机构名称
        inforNm: '', //刊物名称
        inforId: '', //刊物编码
        year: '', //年度
        startNo: '', //起始序号
        curMaxNo: '', //当前最大序号
      },
      searchData: {
        unitId: '', //unitId
        unitNm: '', //部门名称
        parentUnitNm: JSON.parse(localStorage.getItem('userInfo')).unitName, //机构名称
        parentUnitId: JSON.parse(localStorage.getItem('userInfo')).unitId, //机构id
      },
      title: '选择部门',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '1',
    }
  },
  computed: {},
  methods: {
    loadData1() {
      this.$api.pubInfo.getInfoList(this.searchData).then((res) => {
        this.options = res.data
      })
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == '1') {
        // this.formData.unitId = org.id;
        this.$set(this.formData, 'unitNm', org.unitName)
        this.$set(this.formData, 'unitId', org.id)
      }
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
      this.isSingle = false
      this.orgOrDept = 0
      this.orgOrDeptId = this.formData.unitCode
      this.showOrgTree = true
    },
    // 保存
    save_btn() {
      let num_kh = this.formData.kongqueNo.charAt(this.formData.kongqueNo.length - 1)
      if(!isNaN(num_kh)){
        this.formData.kongqueNo = '[' + this.formData.kongqueNo + ']'
        this.$api.pubInfo.editJb(this.formData).then((res) => {
          if (res.code == 'SUCCESS') {
            this.$message({
              message: '保存成功',
              type: 'success',
            })
            this.$router.back()
          }
        })
      } else {
        this.$message({
          type: "warning",
          message: "空缺号填写错误，请修改！"
        })
      }
    },
    edit_btn() {
      this.isEdit = !this.isEdit
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
    this.loadData1()
    let type = this.$route.query.rowData.type
    let rowData = this.$route.query.rowData
    switch (type) {
      case 0:
        this.isEdit = false
        break
      case 1:
        this.isEdit = true
        // rowData.kongqueNo.map((item) => {
        //   item.kongqueNo.slice(1, -1)
        // })
        this.formData = rowData
        console.log(rowData, '获取rowData')
        this.formData.kongqueNo = this.formData.kongqueNo.slice(1, -1)
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
