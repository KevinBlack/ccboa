<template>
<!-- 公文种类配置 -->
  <div  class="dispatchParameterize">
    <el-row>
      <el-col class="dispatchParameterize_side">
        <div class="dispatchParameterize_side-flex">
          <p class="dispatchParameterize_back" >
            <!-- <i class="el-icon-arrow-left"></i>返回公文种类配置 -->
          </p>

          <p class="dispatchParameterize_back-bottom" @click="goBack">
            公文种类配置
          </p>
        </div>

        <div class="dispatchParameterize_comtent">
          <el-button class="dispatchParameterize_comtent_active" @click="open"
            >关闭</el-button
          >
          <el-button @click="preserve">保存</el-button>
        </div>
      </el-col>
    </el-row>
    <header class="dispatchParameterize_header">
      <h3 class="dispatchParameterize_tit">公文种类配置</h3>
    </header>
    <div class="dispatchParameterize_content" id="dispatchParameterize_content">
      <div class="dispatchParameterize_file">
        <div class="dispatchParameterize_file_part">
          <!-- 当前配置 -->
          <!-- <p class="dispatchParameterize_annotation">
            参数间以英文半角“；”进行分割
          </p> -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo_ruleForm"
          >
            <el-col class="dispatchParameterize_col">
              <el-form-item label="机构名称" prop="name">
                <el-input
                  v-model="ruleForm.feedstitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="发文种类" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="编号方式">
                <el-radio
                  v-model="ruleForm.straightdelivery"
                  label="1"
                  class="alternative"
                  >代字</el-radio
                >
                <el-radio
                  v-model="ruleForm.straightdelivery"
                  label="2"
                  class="alternative"
                  >代字</el-radio
                >
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="文件字头" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="代字/红头" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="发文单位署名">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="字数限制" >
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="需要审核">
                <el-radio
                  v-model="ruleForm.straightdelivery"
                  label="1"
                  class="alternative"
                  >是</el-radio
                >
                <el-radio
                  v-model="ruleForm.straightdelivery"
                  label="2"
                  class="alternative"
                  >否</el-radio
                >
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="需要法律部门会签">
                <el-radio
                  v-model="ruleForm.straightdelivery"
                  label="1"
                  class="alternative"
                  >是</el-radio
                >
                <el-radio
                  v-model="ruleForm.straightdelivery"
                  label="2"
                  class="alternative"
                  >否</el-radio
                >
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="排序">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="主办部门" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="模板标签" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="模板" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="备注" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dispatchParameterize",
  components: {},
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
  mounted() {},
  methods: {
    // 返回上级页面
    goBack() {
      window.history.go(-1);
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
    }
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
.dispatchParameterize_side {
  display: flex;
  height: 100px;
  background: #096dd9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position:fixed;
  left:0;
  right:0;
  z-index:99;
  .dispatchParameterize_side-flex {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .dispatchParameterize_back {
    width: 300px;
    height: 70px;
    line-height: 70px;
    margin: 0 20px;
    color: #fff;
    font-weight: 700;
    .el-icon-arrow-left {
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background: #fff;
      border-radius: 50%;
      color: #096dd9;
      font-size: 20px;
      font-weight: 700;
      margin: 0 10px;
    }
  }
  .dispatchParameterize_back-bottom {
    width: 130px;
    height: 30px;
    border-bottom: 3px solid #fff;
    color: #fff;
    margin-bottom: 2px;
    text-align: center;
        margin-left: -150px;
  }
  .dispatchParameterize_comtent {
    margin-right: 20px;
  }
}
.dispatchParameterize_header {
  width: 100%;
  height: 90px;
  line-height: 90px;
  margin-top:100px;

  .dispatchParameterize_tit {
    width: 100%;
    height: 90px;
    line-height: 90px;
    text-align: center;
    color: #096dd9;
    font-size: 44px;
    font-weight: 500;
  }
}
.dispatchParameterize_content {
  width: 100%;
  height: auto;
  .dispatchParameterize_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    padding-bottom: 100px;
    .dispatchParameterize_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .dispatchParameterize_annotation {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 30px 0;
        padding: 0 10px;
        position: relative;
      }
      .alternative {
        margin: 0 10px;
      }
    }
  }
}
</style>
