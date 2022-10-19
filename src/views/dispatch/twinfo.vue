<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back" >
          <!-- <i class="el-icon-arrow-left"></i>退文单 -->
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="drafting"
            >关闭</el-button
          >
          <el-button plain @click="preserve">保存</el-button>
          <el-button plain @click="flowScheme">查看正文</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <el-button plain @click="processSheet">打印退文单</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行电子发文退文单</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo_ruleForm"
          >
            <el-row>
              <el-col class="bank_dispach_col">
                <el-form-item label="正文标题" prop="name">
                  <el-input
                    v-model="ruleForm.feedstitle"
                    placeholder="关于工作计划的报告"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col class="bank_dispach_col">
                <el-form-item label="附件标题" prop="name">
                  <el-input
                    v-model="ruleForm.attachmenttitle"
                    placeholder="关于工作计划的报告"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col class="bank_dispach_col" :span="8">
                <el-form-item label="发文字号">
                  <el-input v-model="ruleForm.numberdispatch"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="bank_dispach_col" :span="8">
                <el-form-item label="成文日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleForm.draftday"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="bank_dispach_col" :span="8">
                <el-form-item label="发文日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleForm.draftday"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="bank_dispach_col" :span="8">
                <el-form-item label="退文单位">
                  <el-input v-model="ruleForm.publishingunits"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="bank_dispach_col" :span="8">
                <el-form-item label="退文人">
                  <el-input v-model="ruleForm.drafter"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="bank_dispach_col" :span="8">
                <el-form-item label="退文时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleForm.draftday"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="bank_dispach_col">
                <el-form-item label="退文原因">
                  <el-input v-model="ruleForm.pursuant"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="bank_dispach_col">
                <el-form-item label="备    注">
                  <el-input
                    type="textarea"
                    v-model="ruleForm.remark"
                    placeholder="填写备注可输入500字"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadAccessory from "../../components/LoadAccessory/LoadAccessory";
export default {
  name: "App",
  components: {
    loadAccessory
  },
  data() {
    return {
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      ruleForm: {
        feedstitle: "", //正文标题
        attachmenttitle: "", //附件标题
        dispachtype: "", //发文类型
        literally: "", //代字
        numberdispatch: "", //发文字号
        urgencydegree: "", //紧急程度
        differServ: "", //业务分类
        recordtype: "", //文种
        hostdepartment: "", //主办部门
        publishingunits: "", //联合发文单位
        drafter: "", //拟稿人
        phone: "", //联系电话
        draftday: "", //拟稿日期
        pursuant: "", //发文依据
        straighthairfile: "1", //直发文件
        straighthair: "", //直发范围
        directtype: "", //直发文种类
        straightdelivery: "1", //直发交付
        signdepartment: "", // 会签部门
        annualsign: "", // 行外会签
        lordsent: "", // 主送
        copysend: "", // 抄送
        banksent: "", //  本行发送
        opinionsissued: "", // 签发意见
        nucleardraft: "", // 核稿意见
        signon: "", //  会签意见
        auditopinion: "", //  审核意见
        remark: "", //  备注
        attachmentremark: "", //  附件备注
        individuallysend: "1", //  分别发送
        halfelectronic: "1" //  半电子
      },
      //强制性要求
      rules: {
        name: [
          { required: true, message: "请输入标题名称", trigger: "blur" },
          { min: 3, max: 5, message: "3-5个字", trigger: "blur" }
        ]
      },
      imageUrl: "",
      fileList: []
    };
  },
  mounted() {
   
  },
  methods: {
    toTarget(target) {
      console.log(target);
      this.active = target;
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      console.log(scrolled);

      if (scrolled < this.distance_fsdx) {
        this.active = "#wjys";
      } else if (  scrolled >= this.distance_fsdx &&  scrolled < this.distance_qpyj) {
        this.active = "#fsdx";
      } else if (  scrolled >= this.distance_qpyj &&  scrolled < this.distance_scfj ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },

    // 删除
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 保存
    preserve() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
      console.log(
        this.ruleForm.feedstitle,
        this.ruleForm.attachmenttitle,
        this.ruleForm.dispachtype
      );
    },
    //完成并发送
    CompleteSending() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 起草正文
    drafting() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 删除此文
    delectArticle() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 收藏
    collect() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 查看流程
    flowScheme() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 打印处理单
    processSheet() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    },
    // 操作指南
    instructions() {
      this.$message({
        type: "success",
        message: "保存成功!"
      });
    }
  },
  destroyed() {
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
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
.bank_dispach_header{
  width: 100%;
  height: 90px;
  line-height: 90px;
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
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3b85ef;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
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
    .el-button {
      width: 80px;
      height: 30px;
      margin: 0 10px 0 0;
      background: #2712a6;
      color: #fff;
      border-radius: 10px;
      font-size: 14px;
      padding: 0 5px;
      border: 1px solid #0563c8;
      background: #fff;
      color: #3b85ef;
      font-weight: 600;
    }
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
    margin: 0 auto;
    border: 1px solid #ccc;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 40px auto;
      .bank_dispach_annotation {
        width: 100%;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 100px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: #ff6600;
          }
        }
        .bank_article_illustrates {
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #fff;
          color: #ff6600;
          position: absolute;
          top: 4px;
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
    }

    el-form-item {
      margin: 10px 0;
    }
  }
  .bank_dispach_col {
    margin-bottom: 20px;
  }
  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
.bank_dispach_option {
  padding: 0 10px;
}
.alternative {
  margin: 0 10px;
}
</style>
