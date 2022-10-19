<template>
  <div class="zfTwo">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>报名通知</span>
      </div>
      <div class="right">
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          v-show="buttonList[index].show"
          :key="index"
          size="mini"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">中国建设银行行长办公会议报名通知</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{this.formData.currentNode}}</span>
          </p>
          <p>
            当前处理人：
            <span>{{this.formData.currentUser}}</span>
          </p>
        </div>
      </div>
      <el-form ref="elForm" :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="拟稿人" prop="draftUser">
              <el-input v-model="formData.draftUser" :disabled="readFields.draftUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="formData.tel" :disabled="readFields.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿日期" prop="draftDate">
              <el-input v-model="formData.draftDate" :disabled="readFields.draftDate"></el-input>
              <!-- <el-date-picker
                v-model="formData.draftDate"
                type="datetime"
                placeholder="选择日期时间"
                default-time="09:00:00"
                :style="{width:'100%'}"
              ></el-date-picker>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议名称" prop="tzName">
              <el-input v-model="formData.tzName" :disabled="readFields.tzName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议时间" prop="hyTime">
              <!-- <el-date-picker
                  v-model="formData.hyTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="09:00:00"
                  :style="{width:'100%'}"
              ></el-date-picker>-->
              <el-input v-model="formData.hyTime" :style="{width:'100%'}" :disabled="readFields.hyTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议地点" prop="hyAdress">
              <el-input v-model="formData.hyAdress" :style="{width:'100%'}" :disabled="readFields.hyAdress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议候场地点" prop="hyHcdd">
              <el-input v-model="formData.hyHcdd" :style="{width:'100%'}" :disabled="readFields.hyHcdd"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="主持人">
          <el-input v-model="formData.zcName" :disabled="readFields.zcName"></el-input>
        </el-form-item>
        <el-form-item label="报名信息">
          <el-table :data="tableData" border style="width: 100%" ref="bMtable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="ytOrderNum" label="议题序号" width="100"></el-table-column>
            <el-table-column prop="lxDeptName" label="列席部门" width="100"></el-table-column>
            <el-table-column prop="ytName" label="议题名称" width="100"></el-table-column>
            <el-table-column prop="hyCl" label="会议材料" width="100"></el-table-column>
            <el-table-column prop="chName" label="参会人员姓名" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.chName"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="isPersonInCharge" label="是否为部门主要负责人" width="110">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.isPersonInCharge" size="mini">
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="2">否</el-radio-button>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column prop="leaveReason" label="部门主要负责人请假缘由" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.leaveReason"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="chCellPhone" label="参会人员手机号码">
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.chCellPhone"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "registerDetail",

  components: {},
  props: {},
  data() {
    return {
      isBm: "0",
      tableData: [
        //   {
        // people:'11',
        // duty:'22',
        //   number:'一',
        //   name:'议题一',
        //   report:'张三',
        //   material:'',
        //   test:'',
        //   depart:'123',
        //   think:'此议题暂无审核意见',
        // }
      ],
      people: "",
      // duty:'',
      radio: "1",
      draftForm: {},
      firstData: {},
      option1: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      formData: {
        // currentNode: "起草",
        // draftDate: formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss"),
        // currentUser: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).humanName : "",
        // currentUserId: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).humanId : "",
        // currentNowName: this.$route.query.deptDetail ? (JSON.parse(this.$route.query.deptDetail).shortFirstUnitName + " " + JSON.parse(this.$route.query.deptDetail).humanName) : "",
        // draftUser: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).humanName : "",
        // draftUserId: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).humanId : "",
        // tel: this.$route.query.deptDetail ? (JSON.parse(this.$route.query.deptDetail).telMobile ? (JSON.parse(this.$route.query.deptDetail).telMobile.split(',')[0] ? JSON.parse(this.$route.query.deptDetail).telMobile.split(',')[0] : '') : '') : "",
        // departName: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName : "",
        // departId: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).firstUnitId : "",
        // type: ''
      },
      // buttonList: ['关闭', '保存',  '完成并发送','此议题暂不上会', '查看流程','操作指南'],
      buttonList: [
        { name: "关闭", type:'guanbi', show: false },
        { name: "保存",type:'baocun', show: false },
        { name: "完成并发送", type:'wanchengbingfasong',show: false },
        { name: "反馈报名信息",type:'fankuibaomingxinxi', show: false },
        { name: "查看流程",type:'chakanliucheng', show: false },
        { name: "操作指南",type:'caozuozhinan', show: false },
      ],
       readFields: {
        draftUser: false,
        currentUser: false,
        draftDate: false,
        tzName: false,
        tel: false,
        hyTime: false,
        hyAdress: false,
        hyHcdd:false,
        zcName:false,
      },//不可编辑控制域
      requiredFields: {
        currentUser: '',
        tzName:'',
        tel: '',
        draftDate: '',
      },//必填控制域
      buttonClick(params) {
        switch (params) {
          case "关闭":
            this.close_btn();
            break;
          case "保存":
            this.save_btn();
            break;
          case "完成并发送":
            this.back_btn();
            break;
          case "反馈报名信息":
            this.back_btn();
            break;
          case "查看流程":
            this.back_btn();
            break;
        }
      },
      firstCfg: [],
      formData: {},
      id: "",
      rowData: {},
      rules: {
        // tel: [{ required: true, message: '请输入手机号', trigger: 'blur'}],
        // ytMc: [{ required: true, message: '请输入议题名称', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  methods: {
    // 关闭
    close_btn() {
      this.$confirm("确认关闭？").then(() => {
        this.$router.back();
      });
    },
    // 保存
    save_btn() {
      this.saveData();
      // console.log(this.$refs.bMtable.selection);
      // let rowdata = this.$refs.bMtable.selection
      // //  this.$refs["elForm"].validate((valid) => {
      // // if (valid) {
      // // this.formData.hyTime = this.formData.hyTime.getTime()
      // this.$api.secreatary.meeting
      //   .updateBm(
      //     rowdata
      //     // this.formData
      //     // id: this.id,
      //     // tzId: this.tzId,
      //   )
      //   // .then((res) => {
      //   //   this.$message.success("保存成功");
      //   // });
      // // }
      // // }
      // // );
    },
    saveData() {
      // console.log(this.$refs.bMtable.selection);
      let rowdata = this.$refs.bMtable.selection[0];
      this.$api.secreatary.meeting.updateBm(rowdata).then(() => {
        // console.log(res)
      });
    },
    // 反馈
    back_btn() {
      this.$api.secreatary.meeting
        .retrunBm({
          id: this.id,
        })
        .then((res) => {
          this.$message.success("反馈成功");
        });
    },
    // // 关闭
    // close_btn() {
    //   this.$confirm('是否保存并退出当前页面?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   })
    //     .then(() => {
    //       this.save_btn() // 调用保存方法
    //     })
    //     .catch(() => {
    //       this.$intent.closeWindow(this)
    //     })
    // },
    // 加载详情
    loadData() {
      this.$api.secreatary.meeting
        .getBmDetail({ id: this.id })
        .then((res) => {
          console.log("res.data-----------------------------", res.data);
          //  res.data&&res.data.map((item) => {
          //   // item.qcTime=formatData(item.qcTime,'YYYY-MM-DD')
          //   item.draftDate = formatData(item.draftDate, "YYYY-MM-DD");
          //   item.hyTime = formatData(item.hyTime, "YYYY-MM-DD");
          // });
          this.formData = res.data;
          this.tzId = res.data.tzId;
        })
        .then(() => {
          this.getBmTable();
        });
    },
    getBmTable() {
      this.$api.secreatary.meeting
        .getBmTable({
          tzId: this.tzId,
        })
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
  activated() {},
  mounted() {
    //     console.log(this.$refs.bMtable.selection);
    //      setInterval(()=>{
    //   this.saveData()
    // },10000)
  },
  updated() {},
  created() {
    // console.log(res);
    let rowData = JSON.parse(this.$route.query.rowData);
    this.id = rowData.id;
    this.loadData();
    //  this.$api.pubInfo.ngDepart(
    //  {parentUnitId:dataDepart}
    // ).then(
    //   res=>{
    //     console.log('-----------------------------')
    //     console.log(res.data)
    //   }
    // )
    // let getData = this.$route.query.data
    // this.rowData = JSON.parse(getData)
    // this.id=this.rowData.depInfoPubId
    //         if (this.id) {
    //             this.loadData()
    //         } else{
    //           // this.save()
    //         }
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.box {
  display: flex;
  border: 1px solid #dcdfe6;
  padding-bottom: 10px;
  border-radius: 4px;
  .right {
    padding: 10px 10px 0 0;
    flex: 1;
  }
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
