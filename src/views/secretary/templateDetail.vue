<template>
  <div class="zfTwo">
    <div class="handleButton">
      <el-button type="primary" @click="save_btn">保存</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="edit_btn">删除</el-button>
      <el-button type="primary" @click="$router.go(-1)">关闭</el-button>
      <!-- <el-button type="primary" style="margin-left:20px;" @click="buttonClick('关闭')">关闭</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('删除')">删除</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="buttonClick('保存')">保存</el-button>-->
    </div>
    <div class="formHeader">
      <div class="title-text">模板样式配置</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div id="wjys" class="height_90"></div>
      <el-form ref="ruleForm" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="序号" prop="jbNm">
              <el-input v-model="formData.jbNm" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板分类">
              <el-select v-model="fromdata" placeholder="请选择" style="width:100%" disabled>
                <el-option
                  v-for="emergencyLevelitem in SemergencyLevel"
                  :key="emergencyLevelitem.label"
                  :label="emergencyLevelitem.label"
                  :value="emergencyLevelitem.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
     
        <el-row>
          <el-col :span="20">
            <el-form-item label="模板" prop="tplNm">
              <el-input v-model="formData.tplNm" :disabled="isEdit" readonly="readonly"></el-input>
              <!-- <span>请下载此基础模板修改信息种类作为模板上传！</span>
              <a href="#">基础模板</a>-->
            </el-form-item>
          </el-col>
          <el-button
            class="btn"
            :span="2"
            style="margin-left:20px"
            @click="Browse"
            :disabled="isEdit"
          >浏览</el-button>
        </el-row>
    
      </el-form>
    </div>
    <el-dialog title="上传" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
// import selectOrgOrDept from "components/select/selectOrgOrDept";
import orgTree from "components/tree/orgTree";
import uploadFileTs from "components/uploadFile/uploadFileTs";

export default {
  name: "maintain",
  components: {
    // selectOrgOrDept,
    orgTree,
    uploadFileTs
  },

  data() {
    return {
      SemergencyLevel: [],
      uploadConfig: {
        formId: "teleMent",
        filesHas: []
      },
      dialogVisible: false,
      isEdit: false,
      formData: {
        // no: "", //序号
        parentUnitNm: "", //机构名称
        parentUnitId: "", //机构id
        unitNm: "", //部门名称
        unitId: "", //部门id
        jbNm: "", //简报名称
        qcShuQian: "", //起草书签
        hcggShuQian: "", //合成格式书签
        tplNm: "", //模板名称
        tplPath: "", //模板地址
        remark: "" //备注
      },
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0"
    };
  },
  computed: {},
  methods: {
    Browse() {
      this.dialogVisible = true;
    },
    //选择模板赋值
    fileList(files) {
      this.formData.tplNm = files.fileName;
      this.formData.tplPath = files.filePath;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    selectOrg() {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId = "0";
      this.showOrgTree = true;
    },

    selectDepar() {
      if (!this.formData.parentUnitId) {
        this.$message({
          message: "请先选择机构",
          type: "success"
        });
        return;
      }
      this.title = "部门";
      this.isSingle = false;
      this.orgOrDept = 0;
      this.orgOrDeptId = this.formData.unitCode;
      this.showOrgTree = true;
    },
    //获取机构树
    getOrgList(org) {
      // debugger
      if (this.orgOrDeptId == "0") {
        this.formData.parentUnitId = org.id;
        this.$set(this.formData, "parentUnitNm", org.unitName);
        this.$set(this.formData, "parentUnitId", org.id);
      } else {
        let deptId = [];
        let deptName = [];
        console.log(org);
        for (const i in org) {
          deptId.push(org[i].id);
          deptName.push(org[i].unitName);
        }
        this.$set(this.formData, "unitNm", deptName.join(","));
        this.$set(this.formData, "unitIdPPP", deptId.join(","));
        this.$set(this.formData, "unitId", deptId.join(","));
      }
    },
    //  selectOrg (org) {
    //   this.formData.unitNm = org.unitName;
    //   this.formData.unitCode = org.id;
    //   this.pagination = {
    //     pageNum: 1,
    //     pageSize: 10,
    //   };
    //   this.loadData()
    // },
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
      this.$api.pubInfo.editInfo(this.formData).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        }
      });
      this.$router.back();
    },
    edit_btn() {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (dataId) {
          this.$api.checkLz.adminDeleSugg({ id: dataId }).then(res => {
            if (res.code == "SUCCESS") {
              this.formData.mark = "";
              this.$message({
                message: "操作成功",
                type: "success"
              });
              // this.queryDeal()
            }
          });
        }
      });

      this.isEdit = !this.isEdit;

      // this.setFormConfig()
    },
    // 加载详情
    loadData() {},
    // 删除
    del() {},
    // 关闭
    close() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.formData.typeFlag = "0";
          if (this.id) {
            this.$api.meeting.zfUpdateData(this.formData).then(res => {
              this.$intent.closeWindow(this);
            });
          } else {
            this.$refs["ruleForm"].validate(valid => {
              if (valid) {
                this.$api.meeting.zfAddData(this.formData).then(res => {
                  this.$intent.closeWindow(this);
                });
              }
            });
          }
        })
        .catch(() => {
          this.$intent.closeWindow(this);
        });
    }
  },
  activated() {},
  mounted() {},
  updated() {},
  created() {
    let type = this.$route.query.rowData.type;
    let rowData = this.$route.query.rowData;
    console.log("rowData", rowData);
    switch (type) {
      case 0:
        this.isEdit = false;
        break;
      case 1:
        this.isEdit = !this.isEdit;
        this.formData = rowData;
        // console.log(this.formData+'123')
        break;
    }
  }
};
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
      border: 1px solid #f9aa21;
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
  content: "";
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
