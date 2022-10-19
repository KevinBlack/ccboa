<!--
 * @Author: your name
 * @Date: 2021-08-26 14:46:06
 * @LastEditTime: 2021-09-08 10:23:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0917fenku\src\views\secretary\dutyTrends\search\searchDtail.vue
--> 
/**
* 类注释：值班动态-查询 稿件详情页
* 备注：
*/
<template>
  <div class="searchDetail">
    <div class="headerClick">
      <div class="right">
        <el-button @click="toClose" class="bank_grid_comtent_active">关闭</el-button>
        <el-button @click="printForm" class="bank_grid_comtent_active">打印处理单</el-button>
        <el-button @click="downloadOperationGuide" class="bank_grid_comtent_active">操作指南</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">{{formData.draftOrgan+"信息报送处理单"}}</div>
    </div>
    <div class="process_content">
      <el-form :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿刊物" prop="submitPublication">
              <el-input v-model="formData.submitPublication" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿栏目" prop="submitColumn">
              <el-input v-model="formData.submitColumn" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿单位" prop="draftOrgan">
              <el-input v-model="formData.draftOrgan" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿部门" prop="submitDept">
              <el-input v-model="formData.submitDept" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿人" prop="submitPerson">
              <el-input v-model="formData.submitPerson" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="formData.tel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿日期" prop="submitDate">
              <el-input v-model="formData.submitDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="稿件状态" prop="gjStatus">
              <el-input v-model="formData.gjStatus" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="活动类别" prop="activeTypeName">
              <el-input v-model="formData.activeTypeName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="内容" prop="content">
              <el-input type="textarea" v-model="formData.content" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-form-item label="审签意见">
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
                          <span>{{item.deptName}}</span>
                          <span class="pad_lr10">{{item.humanName}}</span>
                          <p class="creat_time">{{item.auditTime}}</p>
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
                          <span>{{item.deptName}}</span>
                          <span class="pad_lr10">{{item.humanName}}</span>
                          <p class="creat_time">{{item.remarkTime}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </template>
          </el-form-item>
        </el-row>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
import minixs from "@/minixs/index";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "dutyTrendsSearchDetail",
  components: {},
  mixins: [minixs, openOrDownLoadFile,viewDraft],
  data() {
    return {
      formData: {},
      id: this.$route.query.id,
      auditIdea: [],
      remark: []
    };
  },
  created() {
    this.loadData();
  },
  computed: {},
  mounted() {},
  methods: {
    loadData() {
      this.$api.duty.dutyTrendsSearchDetail({ id: this.id }).then(res => {
        console.log(9999, res);
        this.formData = res.bxgjMainOrderDo;
        this.$set(
          this.formData,
          "submitDate",
          res.bxgjMainOrderDo.submitDate
            ? res.bxgjMainOrderDo.submitDate.split(" ")[0]
            : ""
        );
        this.$set(
          this.formData,
          "gjStatus",
          this.$route.query.gjStatus ? this.$route.query.gjStatus : ""
        );
        // this.auditIdea = JSON.parse(res.bxgjMainOrderDo.auditIdea);
        // this.remark = JSON.parse(res.bxgjMainOrderDo.remark);
      });
    },
    // 操作指南
    downloadOperationGuide() {
      this.handBook("MSGZ");
    },
    toClose() {
      // this.$confirm("是否关闭?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      this.$intent.closeWindow(this);
      // });
    },
    /** @description: 打印处理单 */
    printForm() {
      this.$intent.goNewPage(this, {
        path: "/dutyTrendsSearchPrint",
        query: { id: this.id, gjStatus: this.formData.gjStatus }
      });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
}
.searchDetail {
  background-color: #f0f5fa;
  margin: 0 auto;
  .headerClick {
    display: inline-block !important;
    background: #409eff;
    color: white;
    height: 60px;
    // position: static !important;
    line-height: 60px;
    .left {
      margin-left: 20px;
    }
    .right {
      margin-right: 20px;
      float: right;
    }
  }
  .formHeader {
    padding: 8px 70px;
    margin-top: 60px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }

  .fei_guanli {
    .detailComments {
      position: relative;
      height: 100px;
      .el-textarea {
        height: 100%;
        border-radius: 4px;
        box-sizing: border-box;
        .el-textarea__inner {
          height: 100%;
          border: none !important;
          &:hover {
            border: none !important;
          }
        }
      }
    }
    .finishedInfo {
      position: absolute;
      right: 0;
      bottom: 18px;
      width: 100%;
      text-align: right;
      color: #606266;
      span {
        padding-right: 10px;
      }
      .time {
        margin-top: 5px;
      }
    }
  }

  .process_content {
    width: 80%;
    background-color: #f0f5fa;
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
          float: left;
          span {
            color: #f9aa21;
          }
        }
      }
    }
  }
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
