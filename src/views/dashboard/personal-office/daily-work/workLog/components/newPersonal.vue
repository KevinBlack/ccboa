<!--
 * @Author: wy
 * @Date: 2020-07-17 10:44:45
 * @LastEditTime: 2020-08-19 17:05:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workLog\components\newPersonal.vue
-->
<template>
  <div class="newPersonal">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button type="primary" @click="saveOrgInfo()">保存</el-button>
      <el-button type="primary" @click="saveAndNewPro()">保存并新建</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">个人工作日志</div>
      <div>
        <div class="orgInfoTableBody">
          <m-form
            ref="mForm"
            :formCfg="indexformCfg"
            :formRules="indexformRules"
            :formData="indexformData"
            :showButton="false"
            :isInline="false"
            labelWidth="260px"
          ></m-form>
        </div>
      </div>
    </div>
    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingles"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
      :selectDept="selectDept"
      :isNeedChild="isNeedChild"
    ></tree-person>
    <!-- <select-person
      :treeData="treeData"
      :fromdata="indexformData"
      :loadingTree="true"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      v-dialogDrag
      @showCompDialog="showCompDialog"
    />-->
  </div>
</template>

<script >
import mForm from "components/form/mForm";
import treePerson from "components/tree/sysTreePerson";
export default {
  name: "newPersonal",
  components: {
    mForm,
    treePerson
  },
  props: {},
  data() {
    return {
      activeName:"viewPersonal",
      unitClass: 0,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      humanType: 3,
      isSingles: false,
      showOrgPer: false,
      selectDept: [],
      isNeedChild: "yes",
      offenUse: false,
      seletOptionsData: [],
      resData: {},
      // 机构索引信息
      indexformCfg: [
        {
          label: "记录人",
          prop: "rzRauthor",
          type: "input",
          width: "50%",
          disabled: true
        },
        {
          label: "日期",
          prop: "rzRdate",
          type: "date",
          format: "yyyy-MM-dd",
          width: "50%"
        },
        {
          label: "摘要",
          prop: "rzRtitle",
          width: "50%",
          type: "input"
        },
        {
          label: "内容",
          prop: "rzRcontent",
          type: "textarea",
          width: "50%",
          rows: "5"
        },
        {
          label: "共享用户",
          prop: "rzRqx",
          type: "input",
          width: "50%",
          additionButtonLabel: "选择人员",
          showAdditionButton: true,
          additionButtonhandel: this.selectShareMan,
          disabled: true
        },
        {
          label: "",
          prop: "rzRqxId",
          type: "none"
        }
      ],
      indexformRules: {
        rzRtitle: [{ required: true, trigger: "blur", message: "请输入摘要" }]
      },
      indexformData: {},
      //选择共享用户弹框
      treeData: [{ name: "中国建设银行", id: "123" }],
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: false, // 单选true 多选为false
      dialogTypeNow: "dosend"
    };
  },
  computed: {},
  methods: {
    //关闭
    close() {
      // if (this.stuType == "2") {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.saveOrgInfo();
          } else if (action === "cancel") {
            //点否
            this.$emit('activeNameClick',this.activeName)
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
      // } else {
      //   this.$intent.closeWindow(this);
      // }
    },
    //保存
    saveOrgInfo() {
      this.$refs.mForm.validate().then(valid => {
        if (valid) {
          this.$api.dailyWork.newPersonalLog(this.indexformData).then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              // this.$router.back();
              // this.$refs.mForm.resetFields()
              this.$emit('activeNameClick',this.activeName)
              this.indexformData.rzRtitle = ""
              this.indexformData.rzRcontent = ""
              this.indexformData.rzRqx = ""
              // if(this.indexformData.rzRauthor){
              //     this.$router.push({
              //         name: 'workLog',
              //         query: {activeName: 'viewPersonal'}
              //     })
              // }else{
              //     this.$router.push({
              //         name: 'workLog',
              //         query: {activeName: 'viewShare'}
              //     })
              // }
            }
          });
        }
      });
    },
    //保存并新建
    saveAndNewPro() {
      this.$refs.mForm.validate().then(res => {
        if (res) {
          this.$api.dailyWork.newPersonalLog(this.indexformData).then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.indexformData = {};
              this.$api.dailyWork.newPersonalLog({}).then(res => {
                this.$set(this.indexformData, "rzRauthor", res.data.rzRauthor);
                this.resData = res.data;
                this.indexformData.rzRdate = this.getNowDate();
              });
              // this.$router.push({
              //     name: 'workLog',
              //     query: {activeName: 'newPersonal'}
              // })
            }
          });
        }
      });
    },
    //选择人员按钮
    selectShareMan() {
      // this.MemCndialogState = true;
      // 数据返显
      this.selectDept = [];
      let tempArr = [];
      let rzRqx = [];
      let rzRqxId = [];
      if (this.indexformData.rzRqx && this.indexformData.rzRqx.length > 0) {
        rzRqxId = this.indexformData.rzRqxId
          ? this.indexformData.rzRqxId.split(",")
          : [];
        rzRqx = this.indexformData.rzRqx
          ? this.indexformData.rzRqx.split(",")
          : [];

        rzRqxId.forEach((item, index) => {
          let obj = {};
          obj.deptHumanId = item;
          obj.perName = rzRqx[index];
          obj.disabled = true;
          tempArr.push(obj);
        });
        this.selectDept = tempArr;
      }
      this.showOrgPer = true;
    },
    // //选择共享用户
    // selectShareMan () {
    //   this.dialogState = true
    //     this.$api.dailyWork.shareUser(
    //         {
    //             st:this.resData.st,
    //             unitCode:this.resData.unitCode
    //         }
    //     ).then(res => {
    //     })
    // },
    getperList(data) {
      console.log(data, "data");
      // 返现数据
      let rzRqxId = [];
      let rzRqx = [];
      data &&
        data.map(item => {
          rzRqxId.push(item.deptHumanId);
          rzRqx.push(item.perName);
        });
      if (rzRqxId.length > 0) {
        this.$set(this.indexformData, "rzRqx", rzRqx.join(","));
        this.$set(this.indexformData, "rzRqxId", rzRqxId.join(","));
        return;
      }
      console.log(this.indexformData, "this.indexformData");
      this.indexformData.rzRqx = "";
      this.indexformData.rzRqxId = "";
    },
    //选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      console.log(
        "data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      if (status) {
        let chooseData = [];
        data.map(item => {
          chooseData.push(item.name);
        });
        console.log("--------chooseData------>", chooseData);
        this.$set(this.indexformData, "rzRqx", chooseData.join(","));
        // this.indexformData.rzRqx=chooseData
        let arrId = [];
        data.map(item => {
          let itemId = this.getCaption(item.id);
          arrId.push(itemId);
        });
        this.$set(this.indexformData, "rzRqxId", arrId.join(","));
      }
    },
    getCaption(obj) {
      var index = obj.lastIndexOf("#");
      obj = obj.substring(0, index);
      return obj;
    },
    getNowDate() {
      let time = new Date();
      let year = time.getFullYear();
      const month = (time.getMonth() + 1).toString().padStart(2, "0");
      const date = time
        .getDate()
        .toString()
        .padStart(2, "0");
      const hours = time
        .getHours()
        .toString()
        .padStart(2, "0");
      const minute = time
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const second = time
        .getSeconds()
        .toString()
        .padStart(2, "0");
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minute +
        ":" +
        second
      );
    }
  },
  activated() {},
  mounted() {
    this.$api.dailyWork.newPersonalLog({}).then(res => {
      this.$set(this.indexformData, "rzRauthor", res.data.rzRauthor);
      this.resData = res.data;
      this.indexformData.rzRdate = this.getNowDate();
      console.log(this.resData);
    });
  },
  created() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.newPersonal {
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #ff0502;
      font-weight: 600;
      text-align: center;
    }
    .orgInfoTableBody {
      margin-left: 9%;
    }
  }
}
</style>
