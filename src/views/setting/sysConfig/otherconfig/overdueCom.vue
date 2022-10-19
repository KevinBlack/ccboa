<template>
  <div class="servereditor">
    <div class="btn-list">
      <el-row :gutter="20">
        <el-col :span="6">
          <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择机构"
              v-model="searchData.orgName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
        <el-button type="primary" @click="savedata">{{editButtonText}}</el-button>
      </el-row>
    </div>
    <div class="content">
      <p class="base-title">超期待办综合提醒参数配置</p>
      <div class="formdata">
        <fd-form
          ref="overdueForm"
          @event="btnevent"
          @submit="savedata"
          style="margin:0 1%"
          :data="applyformData"
          :columns="applyformCfg"
          :config="serverconfig"
        ></fd-form>
        <div class="tips">
          <span class="markTips">*</span>
          <div class="textTips">
            <p>1.按照用户待办文档统计范围计数</p>
            <p>2.自登陆时起，按照提醒时间间隔，将计数信息弹框给当前用户</p>
            <p>3.记录用户点击【稍后处理】次数，超过上限的，将发邮件给用户所在的部门综合</p>
            <p>4.行领导秘书发办公室综合</p>
            <p>5.行领导的发秘书处综合</p>
            <p>6.屏蔽人员为空将发所有人员超期记录信息邮件，否则只发除屏蔽人员之外超期记录信息邮件</p>
          </div>
        </div>
      </div>
    </div>
    <!--
      ** 选人弹框
    -->
    <!-- <select-person
      :canTab="false"
      :loadingTree="true"
      :treeData="treeData"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="'请选择'+dialogTit"
      :checkIds="checkIds"
      :orgId="applyformData.unitCode"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />-->
    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingle"
      :humanType="3"
      :unitCode="applyformData.unitCode"
      :unitClass="0"
      @orgList="getperList"
      :isNeedChild="'yes'"
    ></tree-person>
    <!-- 屏蔽岗位弹出框 -->
    <el-dialog title="请选择屏蔽岗位" :visible.sync="ruleDialog">
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="selectedPost"
          :titles="['待选', '已选']"
          :props="{
            key:'key',
            label:'codeName'
            }"
          :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
          :data="postList"
        >
          <span slot-scope="{ option }">{{ option.codeName }}</span>
        </el-transfer>
      </div>
      <div slot="footer">
        <el-button @click="ruleDialog = false">取消</el-button>
        <el-button type="primary" @click="surePost">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
// import selectPerson from "components/tree/treeTansun";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import treePerson from "components/tree/sysTreePerson";
export default {
  name: "servereditor",
  components: {
    FdForm,
    // selectPerson,
    treePerson,
    selectOrgOrDept,
  },
  data() {
    return {
      editButtonText: "编辑",
      applyformData: {
        roleIds: "",
        roleNames: "",
      },
      overdueDis: false,
      applyformCfg: [],
      serverconfig: {
        labelWidth: "180px",
      },

      searchData: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        unitClass: 0,
      },
      /**
       * 选人弹框
       */
      showOrgPer: false,
      isSingle: false,
      // treeData: [], //树弹框数据
      // dialogTit: "",
      // dialogType: "next",
      // checkIds: [], //选中id列表
      // checkData: [], //选中数据
      // dialogState: false, //显示隐藏
      // singelCheckF: false, // 单选true 多选为false
      // hasRadio: false, //是否單選
      // dialogTypeNow: "next",
      //保存时反显到输入框的prop
      selProps: "",
      selIdProps: "",
      formId: "",
      /**
       * 屏蔽岗位弹出框
       */
      ruleDialog: false,
      // 岗位选项
      postList: [],
      // 已选岗位
      selectedPost: [],
    };
  },
  methods: {
    init() {
      this.applyformCfg = [
        {
          type: "radios",
          prop: "isUse",
          label: "是否启用超时提醒",
          options: { 1: "启用", 0: "禁用" },
          rule: "must",
          disabled: this.overdueDis,
        },

        {
          type: "input",
          prop: "isTime",
          label: "弹出提醒时间间隔",
          rule: "must,intp",
          span: 22,
          disabled: this.overdueDis,
        },
        {
          label: "分钟",
          span: 2,
          style: { marginLeft: "-130px", textAlign: "left" },
        },

        {
          type: "input",
          prop: "daysNotDo",
          label: "待办文档统计超出天数",
          rule: "must,intp",
          span: 22,
          disabled: this.overdueDis,
        },
        {
          label: "天",
          span: 2,
          style: { marginLeft: "-135px", textAlign: "left" },
        },

        {
          type: "input",
          prop: "numsNotDo",
          label: "稍后处理次数上限",
          rule: "must,intp",
          span: 22,
          disabled: this.overdueDis,
        },
        {
          label: "次",
          span: 2,
          style: { marginLeft: "-135px", textAlign: "left" },
        },

        {
          type: "input",
          prop: "officeName",
          label: "办公室综合",
          rule: "must",
          span: 22,
          disabled: true,
        },
        {
          type: "button-primary",
          prop: "selOfficeName",
          value: "选择",
          style: { marginLeft: "-83px" },
          disabled: this.overdueDis,
          span: 2,
        },

        {
          type: "input",
          prop: "secName",
          label: "秘书处综合",
          rule: "must",
          span: 22,
          disabled: true,
        },
        {
          type: "button-primary",
          prop: "selSecName",
          value: "选择",
          style: { marginLeft: "-83px" },
          disabled: this.overdueDis,
          span: 2,
        },

        {
          type: "input",
          prop: "roleNames",
          label: "屏蔽岗位",
          rule: "must",
          span: 22,
          disabled: true,
        },
        {
          type: "button-primary",
          prop: "selruleIds",
          value: "选择",
          style: { marginLeft: "-83px" },
          disabled: this.overdueDis,
          span: 2,
        },

        {
          type: "input",
          prop: "userNames",
          label: "屏蔽人员",
          rule: "must",
          span: 22,
          disabled: true,
        },
        {
          type: "button-primary",
          prop: "selUserNames",
          value: "选择",
          style: { marginLeft: "-83px" },
          disabled: this.overdueDis,
          span: 2,
        },
      ];
    },
    selectOrg(org) {
      (this.applyformData = {}), (this.searchData.orgName = org.unitName);
      this.searchData.unitId = org.id;
      this.loadData();
    },
    closedata() {
      console.log("关闭");
      this.$router.push("/setting/sysConfig/gradprotect");
    },
    savedata(params) {
      if (this.editButtonText === "编辑") {
        this.overdueDis = false;
        this.init();
        this.editButtonText = "保存";
      } else {
        this.$refs.overdueForm.submit().then((data) => {
          this.applyformData.isTime = parseInt(this.applyformData.isTime);
          this.applyformData.daysNotDo = parseInt(this.applyformData.daysNotDo);
          this.applyformData.numsNotDo = parseInt(this.applyformData.numsNotDo);
          this.applyformData.isUse = parseInt(this.applyformData.isUse);
          this.formId === "" ? "" : (this.applyformData.id = this.formId);
          this.$api.setSysConfig
            .updateOverdueCom({ ...this.applyformData })
            .then((res) => {
              this.editButtonText = "编辑";
              this.overdueDis = true;
              this.init();
            });
        });
      }
    },
    btnevent(params) {
      switch (params.prop) {
        case "selOfficeName":
          this.isSingle = true;
          this.showOrgPer = true;
          this.selProps = "officeName";
          this.selIdProps = "officeId";
          break;
        case "selSecName":
          this.isSingle = true;
          this.showOrgPer = true;
          this.selProps = "secName";
          this.selIdProps = "secId";
          break;
        case "selruleIds":
          this.ruleDialog = true;
          let st = localStorage.getItem("st");
          this.$api.setting.workFlow.getPostList({ st }).then((res) => {
            this.postList = JSON.parse(JSON.stringify(res.data));
            this.postList.map((item) => {
              item.key = `${item.codeName}|${item.dicId}`;
            });
          });
          break;
        case "selUserNames":
          this.isSingle = false;
          this.showOrgPer = true;
          this.selProps = "userNames";
          this.selIdProps = "userIds";
          break;
      }
    },
    // showCompDialog(data, status, type, params, dtype) {
    //   console.log("-------->", data, status, type, params, dtype);
    //   console.log("this.selProps", this.selProps);
    //   if (status) {
    //     if (this.selProps === "userNames") {
    //       let selPropsArr = [];
    //       let selIdPropsArr = [];
    //       data.map((item) => {
    //         selPropsArr.push(item.name);
    //         selIdPropsArr.push(item.idStr);
    //       });
    //       this.$set(this.applyformData, this.selProps, selPropsArr.join("|"));
    //       this.$set(
    //         this.applyformData,
    //         this.selIdProps,
    //         selIdPropsArr.join("|")
    //       );
    //     } else {
    //       // data[0].id = parseInt(data[0].id)
    //       this.$set(this.applyformData, this.selProps, data[0].name);
    //       this.$set(this.applyformData, this.selIdProps, data[0].idStr);
    //       console.log(6666, typeof data[0].idStr);
    //     }
    //   }
    //   this.dialogState = false;
    // },
    //  选择人员
    getperList(perList) {
      let selPropsArr = [];
      let selIdPropsArr = [];
      perList &&
        perList.map((item) => {
          selPropsArr.push(item.perName);
          selIdPropsArr.push(item.deptHumanId);
        });
      if (this.selProps === "userNames") {
        this.$set(this.applyformData, this.selProps, selPropsArr.join("|"));
        this.$set(this.applyformData, this.selIdProps, selIdPropsArr.join("|"));
      } else {
        // data[0].id = parseInt(data[0].id)
        this.$set(this.applyformData, this.selProps, selPropsArr[0]);
        this.$set(this.applyformData, this.selIdProps, selIdPropsArr[0]);
        // console.log(6666, typeof data[0].idStr);
      }
    },
    loadData() {
      this.applyformData.unitName = this.searchData.orgName;
      this.applyformData.unitCode = this.searchData.unitId;
      console.log(89898, this.applyformData);
      this.$api.setSysConfig.getOverdueCom(this.applyformData).then((res) => {
        // console.log(23232, res.data[obj])
        let str = "";
        if (res.data.obj) {
          str = JSON.stringify(res.data.obj);
        }
        if (str === "{}" || !res.data.obj) {
          this.editButtonText = "保存";
          this.overdueDis = false;
          this.formId = "";
        } else {
          this.applyformData = res.data.obj;
          this.formId = res.data.obj.id;
          this.editButtonText = "编辑";
          this.overdueDis = true;
        }
        this.init();
      });
      console.log("this.overdueDis", this.overdueDis);
    },
    surePost() {
      console.log(" this.selectedPost", this.selectedPost);
      let ruleIdsArr = [];
      let ruleNamesArr = [];
      this.selectedPost.map((item) => {
        let arr = item.split("|");
        ruleNamesArr.push(arr[0]);
        ruleIdsArr.push(arr[1]);
      });
      this.$set(this.applyformData, "roleIds", ruleIdsArr.join("|"));
      this.$set(this.applyformData, "roleNames", ruleNamesArr.join("|"));
      this.ruleDialog = false;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.servereditor {
  min-height: 90vh;
  .content {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 140px;
    .formdata {
      margin-top: 24px;
    }

    .base-title {
      width: 100%;
      margin: 16px 0px 40px;
      text-align: center;
      color: #3b85f0;
      font-size: 28px;
      font-weight: bolder;
    }

    .btn-box {
      margin-left: 200px;
    }
  }
  .tips {
    margin-left: 180px;
    color: #ff464f;
    font-size: 15px;
    line-height: 20px;
    .markTips {
      float: left;
      margin-right: 10px;
    }
    .textTips {
      float: left;
    }
  }
}
</style>
