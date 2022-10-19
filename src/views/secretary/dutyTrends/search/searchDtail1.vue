<!--
 * @Author: your name
 * @Date: 2021-08-26 14:46:06
 * @LastEditTime: 2021-09-09 14:45:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0917fenku\src\views\secretary\dutyTrends\search\searchDtail.vue
--> 
/**
* 类注释：值班动态-查询 发布详情页
* 备注：
*/
<template>
  <div class="searchDtail1" id="searchDtail1">
    <div class="headerClick">
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="closeWindow">关闭</el-button>
        <el-button @click="read" v-show="flag" class="bank_grid_comtent_active">已阅</el-button>
        <el-button @click="checkMain" class="bank_grid_comtent_active">查看正文</el-button>
        <el-button @click="collection" class="bank_grid_comtent_active">收藏</el-button>
      </div>
    </div>
    <div ref="printArea" id="printArea">
      <div class="formHeader">
        <div class="title-text">{{formData1.title }}</div>
      </div>
      <div class="process_content">
        <el-form :model="formData1" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="文件标题" prop="editorName">
                <el-input v-model="formData1.title" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="编辑人" prop="editorName">
                <el-input v-model="formData1.editorName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="tel">
                <el-input v-model="formData1.tel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主办部门" prop="zbDept">
                <el-input v-model="formData1.zbDept" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="发布时间" prop="createDate">
                <el-input v-model="formData1.publishDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="审核意见">
              <template>
                <el-row v-if="!auditIdea||auditIdea.length==0" style="margin-bottom:5px;">
                  <el-col>
                    <el-input type="textarea" :rows="3" disabled></el-input>
                  </el-col>
                </el-row>
                <el-col>
                  <div v-for="item in auditIdea" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col class="content-container">
                          <div>{{item.content}}</div>
                          <div class="adviceInfo">
                            <span>{{item.departmentName}}</span>
                            <span class="pad_lr10">{{item.createUser}}</span>
                            <p class="creat_time">{{item.createTime}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="备注">
              <template>
                <el-row v-if="!remark||remark.length==0" style="margin-bottom:5px;">
                  <el-col>
                    <el-input type="textarea" :rows="3" disabled></el-input>
                  </el-col>
                </el-row>
                <el-col>
                  <div v-for="item in remark" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col class="content-container">
                          <div>{{item.content}}</div>
                          <div class="adviceInfo">
                            <span>{{item.departmentName}}</span>
                            <span class="pad_lr10">{{item.createUser}}</span>
                            <p class="creat_time">{{item.createTime}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import lookBody from "@/minixs/exportTableQueryScript";
import minixs from "@/minixs/index";
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "dutyTrendsSearchDetail1",
  components: {},
  mixins: [minixs, lookBody, openOrDownLoadFile,viewDraft],
  data() {
    return {
      id: this.$route.query.id,
      formData1: {},
      flag: true,
      auditIdea: [],
      remark: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    lookBody() {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = this.formData1.fileName;
      bank_doDownloadFile.filePath = this.formData1.filePath;
      console.log(bank_doDownloadFile, "获取查看正文路径bank_doDownloadFile");
      let id = this.formData1.id;
      this.doDraftLook(id, bank_doDownloadFile, this.formData1.title);
    },
    read() {
      this.$api.duty.redEd({ id: this.id }).then((_) => {
        this.flag = false;
      });
    },
    collection() {
      if (this.formData1.filePath) {
        console.log("shoucang");
        let that = this;
        let obj = {};
        that
          .$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
          .then(() => {
            obj.fileName = that.formData1.title;
            obj.filePath = that.formData1.filePath;
            this.downFile(obj);
          })
          .catch(() => {});
      } else {
        this.$message.warning("无正文");
      }
    },
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          "A0846C071"
        )
        .then((res) => {
          if (res && res.success) {
            downLoadFileReName(
              (this.$post.getEnvState()
                ? location.origin
                : "http://localhost:8080") +
                "/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +
                res.fileName,
              file.fileName
            );
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "下载失败",
              duration: 500,
            });
          }
        });
    },
    // 查看正文
    checkMain() {
      if (this.formData1.fileName) {
        this.lookBody();
      } else {
        this.$message.warning("无正文模板");
      }
    },

    closeWindow() {
      this.$intent.closeWindow(this);
    },
    loadData() {
      this.$api.duty.dutyTrendsSearchDetail1({ id: this.id }).then((res) => {
        this.formData1 = res.xxfbMainOrderDo;
        this.auditIdea = JSON.parse(res.xxfbMainOrderDo.auditIdea);
        this.remark = JSON.parse(res.xxfbMainOrderDo.remark);
      });
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.searchDtail1 {
  // background: white;
  margin: 0 auto;
  padding-bottom: 150px;
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
    margin-top: 40px;
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
    /** @description: min-height: 920px; */
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
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
/deep/.radio-form .el-radio {
  margin: 10px;
}
.d_flex {
  display: flex;
  // padding-bottom: 20px;
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
.content-container {
  background-color: rgba(228, 231, 237, 0.32);
  border-radius: 4px;
  padding: 4px 6px 0 6px;
  word-break: break-all;
}
.content-container:hover {
  border: 1px solid #8996af;
}
.adviceInfo {
  width: 100%;
  right: 10%;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  margin: 0 0 0 16px;
  padding: 0 0 0 10px;
}
.creat_time {
  position: relative;
  top: -10px;
}
</style>
