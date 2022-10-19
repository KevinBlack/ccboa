<template>
  <div class="workingHoursDetail">
    <p class="base-title">工作时长配置</p>
    <div class="btn-list">
      <el-button type="primary" @click="close">关闭</el-button>
      <el-button type="primary" @click="saveData" v-if="isShowSave || actionType==='0'">保存</el-button>
      <el-button type="primary" @click="edit" v-if="!isShowSave && actionType==='1'">编辑</el-button>
    </div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="formDdate">
      <el-form-item label="机构名称" prop="unitCode">
        <el-input v-model="formData.unitName" :disabled="isOrgDisabled" @focus="itemClick"></el-input>
      </el-form-item>
      <el-form-item label="上午上班时间" required>
        <el-col :span="11">
          <el-form-item prop="amTimeOn">
            <el-time-select
              v-model="formData.amTimeOn"
              :disabled="isDisabled"
              :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '12:00'
            }"
              placeholder="选择时间"
            ></el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="上午下班时间" prop="amTimeOff" required>
            <el-time-select
              v-model="formData.amTimeOff"
              :disabled="isDisabled"
              :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '12:30'
            }"
              placeholder="选择时间"
            ></el-time-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="下午上班时间" required>
        <el-col :span="11">
          <el-form-item prop="pmTimeOn">
            <el-time-select
              v-model="formData.pmTimeOn"
              :disabled="isDisabled"
              :picker-options="{
              start: '13:00',
              step: '00:15',
              end: '18:00'
            }"
              placeholder="选择时间"
            ></el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="下午下班时间" prop="pmTimeOff" required>
            <el-time-select
              v-model="formData.pmTimeOff"
              :disabled="isDisabled"
              :picker-options="{
              start: '13:00',
              step: '00:15',
              end: '18:00'
            }"
              placeholder="选择时间"
            ></el-time-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- <span v-show="false">{{workTime}}</span> -->
      <el-form-item label="工作时长" prop="workTime">
        <el-input type="input" v-model="workTimes" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="ifActivate">
        <el-radio-group v-model="formData.ifActivate" :disabled="isDisabled">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">不启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <org-tree
        v-model="showOrgTree"
        title="请选择机构"
        :isSingle="isSingle"
        :orgOrDept="orgOrDept"
        :orgOrDeptId="orgOrDeptId"
        @orgList="getOrgList"
      ></org-tree>
    </el-form>
  </div>
</template>

<script>
import selectOrgOrDept from "components/select/selectOrgOrDept";
import orgTree from "components/tree/orgTree";
import configsApis from "@/httpTansun/api/setting/setSysConfig.js";
export default {
  name: "workingHoursDetail",
  components: {
    // FdForm,
    orgTree,
  },
  data() {
    return {
      // workTime: '',
      saveUnicode: "",
      isOrgDisabled: false,
      isDisabled: false,
      //选择机构弹出框
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      actionType: "1",
      isShowSave: false,
      searchData: {
        groupId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        multiTenancyId: "",
      },
      formData: {
        amTimeOff: "12:00",
        amTimeOn: "08:30",
        id: "",
        ifActivate: "",
        index: "",
        pmTimeOff: "18:00",
        pmTimeOn: "13:30",
        unitCode: "",
        workTime: "",
      },
      rules: {
        unitCode: [
          { required: true, message: "请输入机构名称", trigger: "change" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        amTimeOn: [
          { required: true, message: "请选择日期", trigger: "change" },

          // { type: 'date',  message: '请选择日期', trigger: ['blur', 'change'] }
        ],
        amTimeOff: [
          { required: true, message: "请选择日期", trigger: "change" },
          // { type: 'date',  message: '请选择时间', trigger: ['blur', 'change'] }
        ],
        pmTimeOn: [
          { required: true, message: "请选择日期", trigger: "change" },
          // { type: 'date',  message: '请选择日期', trigger: ['blur', 'change'] }
        ],
        pmTimeOff: [
          { required: true, message: "请选择日期", trigger: "change" },
          // { type: 'date',  message: '请选择时间', trigger: ['blur', 'change'] }
        ],
        workTime: [
          { required: true, message: "请输入工作时长", trigger: "change" },
          // { type: 'number',  message: '请输入数值', trigger: ['blur', 'change'] }
        ],
        ifActivate: [
          {
            required: true,
            message: "请选择活动资源",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  computed: {
    workTimes: function () {
      const amTimeOns = this.countDown(this.formData.amTimeOn);
      const amTimeOffs = this.countDown(this.formData.amTimeOff);
      const pmTimeOns = this.countDown(this.formData.pmTimeOn);
      const pmTimeOffs = this.countDown(this.formData.pmTimeOff);
      const countdata =
        parseInt(amTimeOffs) -
        parseInt(amTimeOns) +
        (parseInt(pmTimeOffs) - parseInt(pmTimeOns));
      // this.formData.workTime=this.formatDuring(countdata)
      console.log(
        "amTimeOns",
        amTimeOns,
        "amTimeOffs",
        amTimeOffs,
        "pmTimeOns",
        pmTimeOns,
        "pmTimeOffs",
        pmTimeOffs,
        "countdata",
        countdata
      );
      this.formData.workTime = this.formatDuring(countdata);
      return this.formData.workTime;
    },
  },
  methods: {
    //时分秒转时间戳
    countDown(time) {
      console.log("时间戳", time);
      var s = 0;

      var hour = time.split(":")[0];

      var min = time.split(":")[1];

      s = Number(hour * 3600) + Number(min * 60);

      return s;
    },
    //时间戳转时分秒
    formatDuring(mss) {
      console.log("mss", mss);
      // var hours = parseInt(mss/60/60%24);
      // var minutes = parseInt(mss/60%60);
      // hours = hours;
      // minutes = minutes < 10 ? ('0' + minutes) : minutes;
      // return hours + "." + minutes;
      var hours = mss / 3600;
      return hours;
    },
    //工作时长转换
    toNum() {
      this.formData.workTime = parseInt(this.formData.workTime);
    },
    //编辑按钮
    edit() {
      this.isShowSave = true;
      this.isDisabled = false;
    },
    //获取返回值返显
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$set(this.formData, "unitCode", org.id);
        this.$set(this.formData, "unitName", org.unitName);
      }
    },
    //请求机构下拉框
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.groupId = org.id;
      this.searchData.multiTenancyId = "";
      this.$api.setting.workFlow
        .getBusiness({
          groupId: this.searchData.groupId,
          tplVldStcd: this.tplVldStcd,
        })
        .then((res) => {
          this.searchClassiOpt = res.data;
        });
    },
    //请求机构按钮点击事件-弹出框
    itemClick() {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId = "1";
      this.showOrgTree = true;
    },
    close() {
      if (this.actionType === "1" && this.isShowSave === false) {
        this.$intent.closeWindow(this);
        return;
      }
      this.$confirm("是否保存?")
        .then(() => {
          this.saveData();
        })
        .catch(() => {
          this.$intent.closeWindow(this);
        });
    },
    //工作时长保存结果
    saveData() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          const data = {
            unitCode: this.formData.unitCode,
          };
          if (this.actionType !== "1") {
            this.$delete(this.formData, "id");
            configsApis.workingTimeConfigList(data).then((res) => {
              if (res && res.data.length > 0) {
                this.$message({
                  type: "error",
                  message: "机构下已存在时间配置",
                });
                return;
              } else {
                configsApis.workingTimeConfigSave(this.formData).then((res) => {
                  console.log("----工作时长保存结果---", res);
                  this.isShowSave = false;
                  // this.$router.push({name: 'workingHours', query: {from: 'detail', groupId: this.formData.unitCode, orgName: this.formData.unitName}})
                  this.$intent.closeWindow(this);
                });
              }
            });
          } else {
            configsApis.workingTimeConfigSave(this.formData).then((res) => {
              console.log("----工作时长保存结果---", res);
              this.isShowSave = false;
              // this.$router.push({name: 'workingHours', query: {from: 'detail', groupId: this.formData.unitCode, orgName: this.formData.unitName}})
              this.$intent.closeWindow(this);
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写必填项",
          });
        }
      });
    },
  },
  created() {
    this.actionType = this.$route.query.type;
    if (this.actionType === "1") {
      this.isDisabled = true;
      this.isOrgDisabled = true;
      this.formData = JSON.parse(this.$route.query.row);
      this.isShowSave = false;
      this.workTime = this.formData.workTime;
    } else {
      this.isDisabled = false;
      this.isOrgDisabled = false;
      this.isShowSave = true;
      // this.initFormConfig()
    }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.workingHoursDetail {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  .formDdate {
    margin-top: 24px;
    border: 1px solid #7e8c8d;
    padding: 20px;
  }

  .base-title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    color: #3c86f0;
  }
}
</style>
