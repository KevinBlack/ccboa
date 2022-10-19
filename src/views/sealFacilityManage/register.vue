<template>
  <div class="useSealRegister">
    <div>
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
      <el-button type="primary" v-show="$route.query.id ? true : false" @click="buttonClick('收藏')">收藏</el-button>
      <el-button type="primary" @click="buttonClick('删除此文')"
        >删除此文</el-button
      >
    </div>
    <p class="depart_title">{{ bankName }}用印机设备登记单</p>
    <div class="content">
      <el-form ref="forms" :rules="rules" :model="formData" label-width="95px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备名称" prop="title">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备型号" prop="deviceType">
              <el-input v-model="formData.deviceType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <!-- prop="deviceNumber" -->
            <el-form-item label="设备编号">
              <el-input v-model="formData.deviceNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备类型" prop="machineType">
              <el-radio-group v-model="formData.machineType">
                <el-radio label="stocked" value="stocked">有存储</el-radio>
                <el-radio label="unstocked" value="unstocked">无存储</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="服务器地址" prop="machineServerIp">
              <el-input v-model="formData.machineServerIp"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="机器编号" prop="machineId">
              <el-input
                v-model="formData.machineId"
                :disabled="false"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="getId">获取机器编号</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="机器注册码">
              <el-input v-model="formData.machineRegNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="使用机构" prop="useJg">
              <el-input v-model="formData.useJg" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="toShow">选择机构</el-button>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-form-item label="上级行机构">
            <el-input v-model="formData.useJg1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="印章数量">
            <el-input-number
              v-model="formData.sealNum"
              :min="0"
              :max="6"
              label
              :disabled="true"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="8" v-for="(item, index) in formData.sealName" :key="item.index">
            <el-form-item :label="'印章名称' + (index + 1)">
              <el-input v-model="formData.sealName[index].sealName" :disabled="true"></el-input>
            </el-form-item> </el-col
        ></el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备状态">
              <el-radio-group v-model="formData.deviceStatus">
                <el-radio label="启用"></el-radio>
                <el-radio label="禁用"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="启用日期">
              <el-date-picker
                v-model="formData.useDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item> </el-col
        ></el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    <!-- 
      获取机器编号弹窗
    -->
    <el-dialog title="用印设备选择" :visible.sync="selMeachineDialog">
      <el-form :model="selMeachineForm" label-width="160px">
        <el-form-item label="可选设备">
          <el-radio-group v-model="selMeachineForm.meachine">
            <el-radio
              v-for="item in meachineOption"
              :key="item"
              :label="item"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="selMeachineDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSelMeachine">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import rules from "@/components/plug/utils/rule.js";
import orgTree from "components/tree/orgTree";
import exportTableQueryScript from '@/minixs/exportTableQueryScript'
export default {
  name: "register",
  components: {
    orgTree
  },
  mixins: [exportTableQueryScript],
  data () {
    return {
      // 维护驱动
      ccbSrvc: "",
      bankName: "",
      id: "",
      type: "",
      title: "选择机构",
      showOrgTree: false,
      isSingle: true,
      orgOrDept: 1,
      orgOrDeptId: "0",
      isEdit: Boolean,
      serverconfig: {
        labelWidth: "160px",
      },
      formData: {
        // numberYin: 0,
        sealNum: 0,
        title: "",
        useJg1: "",
        name: "",
        // resourceType
        machineId: "",
        nameYin: [],
        deviceType: '',
        deviceNumber: '',
        machineType: '',
        machineServerIp: '',
        deviceStatus: '',
        machineRegNum: '',
        useJg: '',
        useDate: '',
        remark: '',
        sealName: []
      },
      // 获取机器编号弹窗
      selMeachineDialog: false,
      meachineOption: [],
      selMeachineForm: {
        meachine: "",
      },
      rules: {
        title: [{ required: true, message: "请填写设备名称", trigger: "blur" }],
        deviceType: [
          { required: true, message: "请填写设备型号", trigger: "blur" },
        ],
        deviceNumber: [
          { required: true, message: "请填写设备编号", trigger: "blur" },
        ],
        machineType: [
          { required: true, message: "请选择设备类型", trigger: "blur" },
        ],
        // 机器编号
        machineServerIp: [
          { required: true, message: "请填写服务器地址", trigger: "blur" },
        ],
        machineId: [
          { required: true, message: "请填写机器编号", trigger: "blur" },
        ],
        useJg: [{ required: true, message: "请选择机构", trigger: "blur" }],
      },
    };
  },
  computed: {
    // sealName () {
    //   this.formData.sealName.map((item, index) => {
    //     if (index > (this.formData.sealNum - 1)) {
    //       this.$set(this.formData.sealName, index, '')
    //     }
    //   })
    //   let nameArr = new Array(this.formData.sealNum)
    //   return nameArr
    // }
  },
  methods: {
    // 获取机器编号
    getId () {
      this.$sealHttp('ccbSrvc', { action: 'SealAllDevice' }).then(res => {
        let AllMachineID = res.responsetext
        if (AllMachineID && AllMachineID !== "") {
          this.meachineOption = AllMachineID.split("#");
          this.$nextTick(() => {
            this.selMeachineDialog = true;
          });
        } else {
          this.$message({
            type: "warning",
            message: "未能获取连接本机的用印设备",
          });
        }
      })
    },
    toShow () {
      this.showOrgTree = true;
    },
    async getOrgList (org) {
      console.log(org, "22222222");
      this.$set(this.formData, "useJg", org.unitName);
      this.$set(this.formData, "jigouId", org.id);
      console.log(this.formData);
      const res = await this.$api.adminConfig.getUpperBank({
        type: "highUnitName",
        jigouId: org.id,
      });
      console.log(res, "getUpperBank", this.formData);
      if (res.data == null) {
        this.$set(this.formData, "useJg1", "无上级行机构");
      } else {
        this.$set(this.formData, "useJg1", res.data.useJg1);
      }

      console.log(this.formData, "有没有上级行机构啊");
    },
    loadData () {
      this.$api.adminConfig
        .viewColumnConfig(this.userID, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: 10,
        })
        .then((res) => {
          this.pagination.total = res.total;
          this.tableData = res.data.list;

          let bankOptions = [];
          let b = 0;
          res.data.bank.map(function (value, index) {
            bankOptions.push(value.bankName);
          });
        });
    },
    // 下载
    downFile(file) {
        let bank_doDownloadFile = {function: "doDownloadFile"}
        bank_doDownloadFile.fileName = file.fileName;
        bank_doDownloadFile.filePath = file.filePath;
        this.$post
            .postData(
                "doDownloadFile",
                JSON.stringify(bank_doDownloadFile),
                this.$businessCode.fawglfj
            )
            .then(res => {
                if (res) {
                    if (res && res.success) {
                        downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                            res.filePath +
                            "&fileName=" +
                            res.fileName, file.fileName);
                    } else {
                        this.$message({
                            type: "error",
                            showClose: true,
                            offset: 400,
                            message: "下载失败",
                            duration: 500
                        });
                    }
                }
            });
    },
    //确定连接所选设备
    sureSelMeachine () {
      this.formData.machineId = this.selMeachineForm.meachine;
      this.selMeachineDialog = false;
    },
    buttonClick (value) {
      switch (value) {
        case '收藏':
          let paramer = {
            id: this.$route.query.id,
            markOrderType: '10'
          }
          exportTableQueryScript.yzCollect(this, paramer)
          break;
        case '删除此文':
          this.$confirm('是否确认删除此文？', '提示', {
          confirmButtonText: "是",
          cancelButtonText: "否",
            type: 'warning'
          }).then(() => {
            this.$api.sealManage.useSealDevice
              .delRegister({ id: this.id })
              .then((res) => {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
              });
            this.$router.back()
          })
          break;

        default:
          break;
      }
    },
    savedata () {
      console.log('formData.sealName', this.formData.sealName);
      this.$refs.forms.validate((valid) => {
        if (valid) {
          let name = Array.from(new Set(this.formData.sealName))
          this.formData.sealName = name.join(',')
          this.formData.allSealName = name.join(',')
          if (this.$route.query.id) {
            this.$api.sealManage.useSealDevice
              .updateRegisterDetail(this.formData)
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "更新成功",
                });
                console.log(res);
                this.$router.push("/sealManage/facilityManage/facilityList");
              })
          } else {
            this.$api.sealManage.useSealDevice
              .addRegister(this.formData)
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "保存成功",
                });
                this.$router.push("/sealManage/facilityManage/facilityList");
              });
          }
        } else {
          this.$message({
            message: "请完善表单",
            type: "warning",
          });
        }
      })
    },
    closedata () {
      this.$confirm("是否退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/sealManage/facilityManage/facilityList");
        })
        .catch(() => { });
    },
  },
  mounted () { },

  created () {
    this.currDepId = JSON.parse(localStorage.getItem("userInfo")).currUnitId;
    this.organFullName = JSON.parse(localStorage.getItem("userInfo")).unitName;
    this.firstDepName = JSON.parse(
      localStorage.getItem("userInfo")
    ).shortFirstUnitName;
    this.$api.setting.organization
      .getDepDetail({ unitCode: this.currDepId })
      .then((res) => {
        if (res.data.unitAndConfig.isSpecialHead == "0") {
          this.bankName = this.organFullName;
        } else {
          this.bankName = this.firstDepName;
        }
      });

    // 准备保存的参数
    console.log("0000000", this.$route.query);
    if (this.$route.query.id == null) {
      this.$set(this.formData, "type", this.type);
    } else {
      this.id = this.$route.query.id;
      this.$api.sealManage.useSealDevice
        .registerDetail({ id: this.id })
        .then((res) => {
          this.formData = Object.assign(this.formData, res.data);
          this.$set(this.formData, "id", this.id);
          this.$api.sealManage.useSealDevice
            .serveiceNumber({ orgId: this.currDepId, deviceNobak: this.formData.machineId })
            .then((res) => {
              this.formData.sealName = res.list
              this.formData.sealNum = res.list.length
            })
        });
    }
  },
};
</script>
<style lang="less">
.el-col-13 {
  margin-right: 24px;
}
.useSealRegister {
  .depart_title {
    border-bottom: 2px solid red;
    margin-bottom: 40px;
    font-size: 30px;
    line-height: 75px;
    color: red;
    font-weight: 600;
    text-align: center;
  }
  .content {
    margin-top: 20px;
    padding: 0 25px;
  }
}
/deep/ .tree-div {
  z-index: 99;
}
</style>
