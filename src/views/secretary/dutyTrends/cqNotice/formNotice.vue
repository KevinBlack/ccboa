<!--
 * @Author: zj
 * @Date: 2020-10-22 17:39:33
 * @LastEditTime: 2020-12-31 16:48:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\secretary\dutyTrends\cqNotice\formNotice.vue
--> 
<template>
  <div class="zfTwo">
    <div class="headerClick">
      <div class="left" @click="closeWindow">
        <i class="el-icon-arrow-left"></i>错请通知单
      </div>
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="closeWindow">关闭</el-button>
        <el-button
          plain
          class="bank_grid_comtent_active"
          @click="dialogFormVisible = true"
          v-if="this.shuoM=='0'"
        >发错情通知</el-button>
        <el-button plain class="bank_grid_comtent_active" @click="printForm">打印处理单</el-button>
        <el-button plain class="bank_grid_comtent_active"  @click="handBook('MSGZ')">操作指南</el-button>
      </div>
    </div>

    <div ref="printArea">
      <div class="formHeader">
       <div class="title-text">{{formData.submitUnit + "信息报送来稿单"}}</div>
      </div>
      <div class="process_content" id="bank_dispach_content">
        <div id="wjys" class="height_90"></div>
        <el-form ref="ruleForm" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="投稿刊物">
                <el-input v-model="formData.submitPublication" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投稿栏目">
                <el-input v-model="formData.submitColumn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投稿单位">
                <el-input v-model="formData.submitUnit" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="投稿部门">
                <el-input v-model="formData.submitDept" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投稿人">
                <el-input v-model="formData.submitPerson" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号">
                <el-input v-model="formData.tel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="投稿日期">
                <el-input v-model="formData.createDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投稿状态">
                <el-input v-model="formData.gjStatus" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动类别">
                <el-input v-model="formData.activeTypeName" :disabled="true"></el-input>
                <!-- <el-checkbox-group v-model="formData.activityType" :disabled="true">
                <el-checkbox v-for="item in checkDataList" :label="item.id" :key="item.id">{{item.activityCategory}}</el-checkbox>
              </el-checkbox-group> -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="内容">
            <el-input type="textarea" v-model="formData.content" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="错情说明" v-if="this.shuoM==='1'">
            <el-input type="textarea" v-model="formData.cqCondition" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-dialog title="错情说明" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="错情说明" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请填写错情说明"
            v-model="formData.cqCondition"
            :disabled="isEdit"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click=" save_btn()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/** @description: import selectOrgOrDept from "components/select/selectOrgOrDept"; */
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "zfTwo",
  components: {
    /** @description: selectOrgOrDept */
  },
  mixins: [openOrDownLoadFile,viewDraft],
  data() {
    return {
      // 活动类别数据源
      checkDataList: [],
      shuoM: "0",
      otherBankId:[],
      otherBankName:[],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      isEdit: false,
      formData: {},
    };
  },
  computed: {},
  methods: {
    /** @description: 获取活动类别 */
    getCheckboxList() {
      this.$api.duty.checkboxData({ data: {} }).then((res) => {
        this.checkDataList = res && res.list || [];
        this.otherBankId = this.formData.activityType && this.formData.activityType
        this.otherBankName = this.formData.activeTypeName && this.formData.activeTypeName.split(",")
        for(const i in this.otherBankId){
          this.whetherToRepeat = true
          for(const index in this.checkDataList){
            if(this.otherBankId[i] === this.checkDataList[index].id){
              this.whetherToRepeat = false
            }
          }
          if(this.whetherToRepeat){
            this.checkDataList.push({id:this.otherBankId[i],activityCategory:this.otherBankName[i]})
          }
          
        }
        this.$set(this.formData, 'checkDataList', this.checkDataList)
        console.log(res, '打印获取活动类别返回的东西')
      })
    },
    printForm() {
      this.formData.title = "中国建设银行信息报送处理单";
      let copyRow = JSON.stringify(this.formData); /** @description: 当前行数据转换字符串 */
    //  this.$print(this.$refs.printArea)
      this.$intent.goNewPage(this, {
        path: "/secretaryCuo",
        query: { data: copyRow,
        activeName:this.$route.query.activeName},
      }); /** @description: 跳转页面 */
    },
    closeWindow() {
      // this.$confirm("是否退出?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
          // this.gotoPublishedPage(this.previousRouteName)
          this.$intent.closeWindow(this);
        // })
        // .catch(() => {
        // });
    },
    change() {},
    /** @description: 保存 */
    save_btn() {
      this.dialogFormVisible = false;
      this.$api.duty.postCuoQ(this.formData).then((res) => {
        this.$message({
          message: "操作成功！",
          type: "success",
        });
        this.$intent.closeWindow(this);
      });
    },

    /** @description: 加载详情 */
    loadData() {
      this.getCheckboxList()
      this.shuoM = this.$route.query.tagFlag;
      this.formData = this.dataFromQuery('detail')
      const ID = this.formData.id|| JSON.parse(this.$route.query.detail).ID

      this.$api.duty.cqDatial({ id:ID }).then((res) => {
        this.formData = res.order
        console.log(this.formData)
      })

      this.formData.activityType = (typeof this.formData.activeType === "string" ? this.formData.activeType.split(",") :  this.formData.activeType)
      console.log("dadadadad",this.formData.activeType)

      switch (this.formData.gjStatus) {
        case "1":
          this.formData.gjStatus = "已加入编辑稿件";
          break;
        case "2":
          this.formData.gjStatus = "已编辑";
          break;
        case "3":
          this.formData.gjStatus = "未编辑";
          break;
      }
      console.log("shuoM", this.shuoM);
    },
  },
  activated() {},
  mounted() {
  },
  updated() {},
  created() {
    this.loadData();
  },
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
