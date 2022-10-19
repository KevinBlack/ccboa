<template>
  <div class="newPersonal">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button type="primary" @click="saveOrgInfo()" v-if="!isSave">保存</el-button>
      <el-button v-show="isShow" type="primary" @click="editorData()" v-else>编辑</el-button>
      <el-button type="primary" @click="saveAndNewPro()" v-if="!isSave">保存并新建</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">工作日志</div>
      <div>
        <div class="orgInfoTableBody">
          <m-form
            ref="mForm"
            :formRules="indexformRules"
            :formCfg="indexformCfg"
            :formData="indexformData"
            :showButton="false"
            :isInline="false"
            :isAllDisabled="edirorDisabled"
            labelWidth="260px"
          ></m-form>
        </div>
      </div>
    </div>
    <!-- <select-person
      :treeData="treeData"
      :loadingTree="true"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :seletOptionsData="seletOptionsData"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />-->
    <!-- 选择参会人 -->
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
      unitClass: 0,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      humanType: 3,
      isSingles: false,
      showOrgPer: false,
      selectDept: [],
      isNeedChild: "yes",
      id: "",
      isSave: true,
      isShow: true,
      edirorDisabled: true,
      uniCode: "",
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
          width: "50%",
          type: "textarea",
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
      indexformData: {},
      indexformRules: {
        rzRtitle: [{ required: true, trigger: "blur", message: "请输入摘要" }]
      }
    };
  },
  computed: {},
  methods: {
    //关闭
    close() {
      // this.$router.push({
      //   path: "/dashboard/personalOffice/dailyWork/workLog",
      //   query: {
      //     activeName: "viewPersonal"
      //   }
      // });
      if (!this.isSave) {
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
              this.$router.back();
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$router.back();
      }
    },
    //保存
    saveOrgInfo() {
      this.$refs.mForm.validate().then(res => {
        if (res) {
          this.$api.dailyWork.alterPersonalLog(this.indexformData).then(res => {
            if (res.code == "SUCCESS") {
              this.$router.back();
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              // this.$router.push({
              //     name: 'workLog',
              //     query: {activeName: 'viewPersonal'}
              // })
            }
          });
        }
      });
    },
    //保存并新建
    saveAndNewPro() {
      this.$refs.mForm.validate().then(res => {
        if (res) {
          this.$api.dailyWork.alterPersonalLog(this.indexformData).then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.$router.push({
                name: "workLog",
                query: { activeName: "newPersonal" }
              });
            }
          });
        }
      });
    },
    editorData() {
      this.isSave = false;
      this.isShow = false;
      this.edirorDisabled = false;
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

        rzRqx.forEach((item, index) => {
          let obj = {};
          obj.deptHumanId = rzRqx[index];
          obj.perName = item;
          obj.disabled = true;
          tempArr.push(obj);
        });
        this.selectDept = tempArr;
      }
      this.showOrgPer = true;
    },
    // selectShareMan() {
    //   this.$api.dailyWork
    //     .shareUser({
    //       st: localStorage.getItem("st"),
    //       unitCode: this.uniCode
    //     })
    //     .then(res => {
    //       console.log(res,'3333333333333333');
    //     });
    //     this.showOrgPer = true;
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
        this.$set(this.indexformData, "rzRqx", chooseData.join(","));
        console.log(this.indexformData, "this.indexformData");
        let arrId = [];
        data.map(item => {
          let itemId = this.getCaption(item.id);
          arrId.push(itemId);
        });
        this.$set(this.indexformData, "rzRqxId", arrId.join(","));
        console.log(this.indexformData, "this.indexformData");
      }
    },
    getCaption(obj) {
      var index = obj.lastIndexOf("#");
      obj = obj.substring(0, index);
      return obj;
    }
  },
  activated() {},
  mounted() {
    // this.$api.dailyWork.newPersonalLog({}).then(res => {
    //     this.$set(this.indexformData, 'rzRauthor', res.data.rzRauthor)
    // })
  },
  created() {
    if (this.$route.query.data.id) {
      if (this.$route.query.isShow == "0") {
        this.isShow = false;
        console.log(this.isShow, "999");
      }
      this.indexformData = this.$route.query.data;
      this.uniCode = this.$route.query.data.uniCode;
      console.log("22222222", this.$route.query.data);
    } else {
    }
  }
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
