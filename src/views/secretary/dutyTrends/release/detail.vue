<!--
 * @Author: zj
 * @Date: 2020-10-22 17:39:33
 * @LastEditTime: 2020-12-25 17:25:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\secretary\dutyTrends\cqNotice\formNotice.vue
--> 
<template>
  <div class="zfTwo">
    <div class="headerClick">
      <div class="left" @click="closeWindow">
        <i class="el-icon-arrow-left"></i>信息发布
      </div>
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="closeWindow">关闭</el-button>
        <el-button plain class="bank_grid_comtent_active" @click="handleLookupMainBodyClick">查看正文</el-button>
        <el-button
          plain
          class="bank_grid_comtent_active"
          v-show="this.flag"
          @click="handleHasReadClick"
        >已阅</el-button>
        
        <el-button plain class="bank_grid_comtent_active" @click="handleCollectClick">收藏</el-button>
      </div>
    </div>
    <div ref="printArea" id="printArea">
      <div class="formHeader">
        <div class="title-text">{{formData.title}}</div>
      </div>
      <div class="process_content" id="bank_dispach_content">
        <div id="wjys" class="height_90"></div>
        <el-form ref="ruleForm" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="文件标题">
                <el-input v-model="formData.title" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="编辑人">
                <el-input v-model="formData.editorName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="formData.tel" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主办部门">
                <el-input v-model="formData.zbDept" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发布时间">
                <el-input v-model="formData.publishDate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="备注">
            <el-input
              v-if="formData.remark && formData.remark.length == 0"
              type="textarea"
              :disabled="true"
              v-model="formData.remarkIn"
              :autosize="{minRow:5,maxRow:15}"
              class="d_f1"
            ></el-input>
            <!-- 没有数据显示输入框 -->
            <!-- <div style="margin-bottom: 3px" v-show ="this.formData.remark && this.formData.remark.length == '0'">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      :disabled="true"
                      v-model="formData.remarkIn"
                      :autosize="{minRow:5,maxRow:15}"
                      class="d_f1"
                    ></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>-->
            <!-- 有数据显示 -->
            <div v-for="item in formData.remark" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      :value="item.content"
                      :disabled="true"
                      :autosize="{minRow:5,maxRow:15}"
                      class="d_f1"
                    ></el-input>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.humanName}}</span>
                      {{item.remarkTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import commonBtnOperationMixins from "@/views/secretary/dutyTrends/mixins/common-btn-operation-mixins";
import lookBody from "@/minixs/exportTableQueryScript";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "zfTwo",
  components: {},
  mixins: [commonBtnOperationMixins, lookBody,viewDraft],
  data() {
    return {
      flag: true,
      formData: {}
    };
  },
  computed: {},
  methods: {
    /** @description: 已阅 点击处理 */
    handleHasReadClick() {
      if (JSON.parse(this.$route.query.detail).TODO_RECORD_ID) {
        var parms = {
          toDoRecordId: JSON.parse(this.$route.query.detail).TODO_RECORD_ID,
          id: this.formData.id
        };
      } else {
        var parms = {
          id: this.formData.id
        };
      }
      console.log(parms, "parms");
      this.$api.duty.redEd(parms).then(_ => {
        this.$message.success("成功");
        this.flag = false;
      });
    },
    lookBody() {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = this.formData.fileName;
      bank_doDownloadFile.filePath = this.formData.filePath;
      console.log(bank_doDownloadFile, "获取查看正文路径bank_doDownloadFile");
      let id = this.formData.id;
      this.doDraftLook(id, bank_doDownloadFile, this.formData.title);
    },
    /** @description: 查看正文 点击处理 */
    handleLookupMainBodyClick() {
      console.log(this.formData, "查看征文");
      if (this.formData.fileName) {
        this.lookBody();
        // const fileName = this.formData.fileName;
        // const filePath = this.formData.filePath;
        // this.openDocumentWithGoldCellPlugin(this.formData.id, {filePath, fileName}, '0', false, 'dutyTrendsReleaseDetail', this.formData)
      } else {
        this.$message.warning("无正文模板");
      }
    },
    /** @description: 收藏按钮 点击处理 */
    handleCollectClick() {
      // const { documentNumber, title } = this.formData || {};
      // const fileList = this.formData.filePath && [
      //   {
      //     filePath: this.formData.filePath,
      //     fileName: this.formData.fileName
      //   }
      // ];
      // const idToRender = "printArea";
      // this.doEnshrine(documentNumber, fileList, idToRender, title);
      this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(()=>{
             this.$api.duty
            .collection1({ xxcbDocId: this.formData.xxcbDocId})
            .then(res => {
              this.downFile(res);
            })
          });
    },
    /** @description: 发布信息收回 点击按钮 */
    handleReleaseInfoGetBackClick() {
      this.$api.duty
        .releaseInfoGetBack({
          id: this.formData.id
        })
        .then(_ => {
          this.$message.success("收回成功");
        });
    },
    closeWindow() {
      // this.$confirm("是否退出?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      // .then(() => {
      this.$intent.closeWindow(this);
      // this.gotoSourceRoutePage()
      // })
    },
    /** @description: 加载详情 */
    loadData() {
      this.formData = this.formData || {};
      if (!this.processLogicAfterQuitFromGoldCell(this.formData)) {
        this.formData = this.dataFromQuery("detail");
        this.formData.remark = this.convertToListOrObj(this.formData.remark);
        this.formData.qfIdea = this.convertToListOrObj(this.formData.auditIdea);
        console.log(this.formData, "this.formData");
        var Id = this.formData.id || JSON.parse(this.$route.query.detail).ID;
        if (JSON.parse(this.$route.query.detail).TODO_RECORD_ID) {
          var parms = {
            toDoRecordId: JSON.parse(this.$route.query.detail).TODO_RECORD_ID,
            id: Id
          };
        } else {
          var parms = {
            id: Id
          };
        }
        console.log(parms, "parms");
        console.log(JSON.parse(this.$route.query.detail));
        this.$api.duty.getDetail(parms).then(res => {
          console.log(res, "详情信息");
          if(res.order){
          this.formData = res.order;
          this.formData.remark = this.convertToListOrObj(this.formData.remark);
          this.formData.qfIdea = this.convertToListOrObj(
            this.formData.auditIdea
          );
          }
          // let Dates = this.formData.title.substring(0,10)
          // const reg = new RegExp("-","g")
          // let Dates1 = Dates.replace(reg,"")
          // let CHN = this.formData.title.substring(10)
          // this.formData.title = CHN + Dates1
        });
      }
    }
  },
  activated() {},
  mounted() {},
  updated() {},
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.headerClick {
  background: #409eff;
  color: white;
  width: 100%;
  height: 70px;
  line-height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  justify-content: space-between;
  align-items: center;

  .left {
    margin-left: 20px;
  }

  .right {
    margin-right: 20px;
    float: right;
  }
}
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
