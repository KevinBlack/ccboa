<template>
<!-- 发文处理单 -->
  <div  class="dispatchParameterize">
    <el-row>
      <el-col class="dispatchParameterize_side">
        <div class="dispatchParameterize_side-flex">
          <p class="dispatchParameterize_back">
            <!-- <i class="el-icon-arrow-left"></i>返回发文处理单 -->
          </p>

          <p class="dispatchParameterize_back-bottom" @click="goBack">
            文件要素配置
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
      <h3 class="dispatchParameterize_tit">发文参数配置</h3>
    </header>
    <div class="dispatchParameterize_content" id="dispatchParameterize_content">
      <div class="dispatchParameterize_file">
        <div class="dispatchParameterize_file_part">
          <!-- 当前配置 -->
          <p class="dispatchParameterize_annotation">
            参数间以英文半角“；”进行分割
          </p>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="130px"
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
              <el-form-item label="发文类型" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="紧急程度">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="业务分类">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="文种">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="电子发文秘密类型" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="电子发文保管期限" prop="name" >
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="商业密级" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="解密条件" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="秘密标志" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="工作秘密标志" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="有主题词">
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
              <el-form-item label="启用二维码">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="直发范围" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="直发文件种类" prop="name">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="会签意见字数限制">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="字数超限原因最少字数限制">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="字数超限原因不能包含关键字">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="无需限制正文字数的标题关键字">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="无需限制正文字数的代字/红头">
                <el-input
                  v-model="ruleForm.attachmenttitle"
                  placeholder="中国建设银行"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="dispatchParameterize_col">
              <el-form-item label="默认正文模板">
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
