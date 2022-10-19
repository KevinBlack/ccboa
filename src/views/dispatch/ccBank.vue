<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>退文处理单
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{draftOrganTitle}}</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <div class="bank_dispach_file" style="padding: 50px 50px 20px 20px;">
          <el-form
            ref="fromdata"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="正文标题">
                    <el-input disabled v-model="fromdata.documentTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="规章或规范性文件">
                    <el-radio
                          v-model="fromdata.isNormative"
                          disabled
                          label="是"
                        >是</el-radio>
                        <el-radio
                          v-model="fromdata.isNormative"
                          disabled
                          label="否"
                        >否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="拟稿部门">
                    <el-input disabled v-model="fromdata.cnkiUnitName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="拟稿日期">
                    <el-input disabled v-model="fromdata.cnkiEndTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="拟稿人">
                    <el-input disabled v-model="fromdata.cnkiCreator"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话">
                    <el-input disabled v-model="fromdata.pehoe"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="业务分类">
                    <el-input disabled v-model="fromdata.serviceType"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="文种">
                    <el-input disabled v-model="fromdata.cnkiEndTime"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <h6 class="bank_dispach_file_tit">查重结果
              <span class="small_anno">在<b>近{{fromdata.comYear}}年</b>文件库中，查询到<b>{{fromdata.cnkiResultNumber}}</b>个匹配结果：</span>
            </h6>
            <div>
              <el-row>
                <el-col>
                  <ul class="result_anno">
                    <li v-for="(item, index) in fromdata.cnkiResult" :key="item.id">
                      {{index+1}}.标题: {{item.result[0].file_title}}<br />
                      &nbsp;&nbsp;文号：{{item.result[0].docNum}}<br />
                      &nbsp;&nbsp;相似度：{{item.result[0].segment*100}}%
                    </li>
                  </ul>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="提交人">
                    <el-input disabled v-model="fromdata.cnkiCreator"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="报告时间">
                    <el-input disabled v-model="fromdata.cnkiStartTime"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CcBank",
  data() {
    return {
      // 初始化查询
      ccBank: {
        function: "getCnki",
        id: ""
      },
      draftOrganTitle: '',
      fromdata: {
        function: "",
        documentTitle: "",
        isNormative: "",
        cnkiUnitName: "",
        cnkiEndTime: "",
        cnkiCreator: "",
        pehoe: "",
        serviceType: "",
        cnkiCreator: "",
        cnkiStartTime: "",
        cnkiResult: []
      }
    }
  },
  methods: {
    //初始值 //input框内容
    toEdit() {
      console.log(this.ccBank)
      let that = this;

      this.$post.postData("getCnki", JSON.stringify(this.ccBank), this.$businessCode.fawgl).then(res => {
        console.log(res);
        this.fromdata = res.data;
        if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
          that.draftOrganTitle = res.data && res.data.cnkiUnitName + "电子发文查重结果";
        } else {
          that.draftOrganTitle = res.data && res.data.draftOrgan + "电子发文查重结果";
        }
        if(res.data.isNormative == "false"){
          that.fromdata.isNormative = "否"
        } else {
          that.fromdata.isNormative = "是"
        }
        this.fromdata.cnkiResult = JSON.parse(res.data.cnkiResult)

        // 更新为已读
        // if (that.readFlag != 1) {
        //   that.getReadFlag();
        // }
        // if (res.data.secretType) {
        //   this.secretTypechange(res.data.secretType, true);
        // }
        // if (res.data.secretLimitType) {
        //   this.workSecurityTab(res.data.secretLimitType, true);
        // }
        
      });
    },
    // 设置已读
    getReadFlag() {
      this.$post
        .postData(
          "doUpdateReadRecord",
          JSON.stringify({
            function: "doUpdateReadRecord",
            pcsAvyId: this.fromdata.pcsAvyId,
            processInstId: this.fromdata.processInstId,
            multiTenancyId: this.fromdata.multiTenancyId
          }),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          window.opener.location.reload();
        });
    },
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.location.href = "about:blank";
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消关闭",
            duation: 1500
          });
        });
    },
  },
  created() {
    //初始化加载数据
    this.ccBank.id = this.$route.query.id
      ? this.$route.query.id
      : "";
    this.toEdit();
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
}
.bank_dispach_tit {
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.bank_dispack_side {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
    visibility: hidden;
    width: 180px;
    font-size: 24px;
    color: #fff;
    .el-icon-arrow-left {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #fff;
      color: #3b85ef;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 8px;
    }
  }
  .grid_comtent {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .bank_grid_comtent_active {
      border: 1px solid #fff;
      background: #0563c8;
      color: #fff;
    }
  }
}

.bank_dispach_content {
  width: 100%;
  height: auto;
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
    .active {
      background: #3b85ef;
      color: #fff;
    }
  }

  .bank_dispach_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 40px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: #ff6600;
          }
        }
        .bank_article_illustrates {
          position: absolute;
          top: 3px;
          right: 10px;
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
      .small_anno {
        margin-left: 20px;
        font-size: 12px;
        color: #666666;
        b {
          color: red;
        }
      }
    }
    .result_anno {
      border: 1px solid #ccc;
      width: 91%;
      height: 300px;
      overflow-y: auto;
      margin: 20px 0 20px 130px;
      padding: 10px 10px 10px 20px;
      li {
        line-height: 30px;
        font-size: 14px;
        color: #666666;
      }
    }

    el-form-item {
      margin: 10px 0;
    }
  }

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.opinionCheck_w {
  width: 100%;
  height: 84px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
  .opinionCheck {
    text-align: left;
    margin-left: 20px;
  }
  .opinionCheckpeo {
    text-align: right;
    margin-right: 20px;
  }
}
.d_flex {
  display: flex;
  padding-bottom: 20px;
  .d_b100 {
    width: 100%;
  }
  .d_f1 {
    flex: 1;
  }
}
.pos_r {
  position: relative;
}
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #c0c4cc;
}
</style>
