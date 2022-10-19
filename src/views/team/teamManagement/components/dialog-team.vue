<template>
  <el-dialog v-dialogDrag :title="outerAddTeamTitle" :visible.sync="outerAddTeam" @close="cancelSetDialog">
    <el-form
      :model="dialogForm"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
      class="addTeamFrom"
    >
      <!-- <el-form-item label="机构员工团队名称" :label-width="formLabelWidth">
        <el-input v-model="dialogForm.organName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>-->
      <el-form-item label="团队名称" :label-width="formLabelWidth" prop="teamName">
        <el-input v-model="dialogForm.teamName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="团队职责" :label-width="formLabelWidth" prop="duties">
        <el-input v-model="dialogForm.duties" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="申请原因" :label-width="formLabelWidth" prop="reason">
        <el-input v-model="dialogForm.reason" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="团队负责人" :label-width="formLabelWidth" prop="principal">
        <el-input v-model="dialogForm.principal" autocomplete="off" :disabled="true"></el-input>
        <el-button type="primary" size="mini" @click="choosePerson(1)" style="margin-left:10px">选择</el-button>
      </el-form-item>
      <el-form-item label="团队管理员" :label-width="formLabelWidth" prop="manageName">
        <el-input v-model="dialogForm.manageName" autocomplete="off" :disabled="true"></el-input>
        <el-button type="primary" size="mini" @click="choosePerson(2)" style="margin-left:10px">选择</el-button>
      </el-form-item>
      <el-form-item label="办公位置" :label-width="formLabelWidth" prop="addre">
        <el-input v-model="dialogForm.addre" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="成员上限" :label-width="formLabelWidth" prop="maxSize">
        <el-input
          type="number"
          min="1"
          v-model.number="dialogForm.maxSize"
          autocomplete="off"
          oninput="value=value.replace(/[^\d]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item label="截止日期" :label-width="formLabelWidth" prop="endDate">
        <el-date-picker v-model="dialogForm.endDate" type="date" placeholder="选择日期" :picker-options='pickerOpion'></el-date-picker>
      </el-form-item>
    </el-form>
    <TreeUser
      :subdialogTit="subdialogTit"
      :suboffenUse="suboffenUse"
      :subcheckIds="subcheckIds"
      :subcanTab="subcanTab"
      :subsingelCheckF="subsingelCheckF"
      @subshowCompDialog="subshowCompDialog"
      v-if="showTreeUser"
    ></TreeUser>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSetDialog">取 消</el-button>
      <el-button type="primary" @click="submitOuter('ruleForm')" v-if="isDelete=='0' || type=='add'">保存</el-button>
      <el-button
        type="primary"
        @click="closeTeam"
        v-if="outerAddTeamTitle=='维护团队' && isDelete=='0'"
      >关闭团队</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TreeUser from "./tree-user";
export default {
  props: {
    // dilalogTeamState: {
    //   type: Boolean,
    //   default: false
    // },
    outerAddTeamTitle: {
      type: String,
      default: ""
    },
    checkId: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    isDelete: {
      type: String,
      default: "0"
    },
    teamidStr:{
      type:String,
      default: ""
    }
  },
  data() {
    return {
      pickerOpion:{
        disabledDate(time){
          return time.getTime()<Date.now()-8.64e7
        }
      },
      getDetailById_parmas: {
        function: "getDetailById",
        id: ""
      },
      save_parmas: {
        function: "save",
        TeamEntityPo: "",
        sign:'1'
      },
      deleteById_parmas: {
        function: "deleteById",
        id: ""
      },
      findTeamTask_parmas: {
        function: "findTeamTask",
        teamIds: ''
      },
      rules: {
        teamName: [{ required: true, message: "请输入内容",trigger: "blur" },{message: "字数超过最大限制",min: 1, max: 16, trigger: "blur"}],
        duties: [{ required: true, message: "请输入内容",trigger: "blur" },{message: "字数超过最大限制",min: 1, max: 200, trigger: "blur"}],
        reason: [{ required: true, message: "请输入内容",trigger: "blur" },{message: "字数超过最大限制",min: 1, max: 200, trigger: "blur"}],
        addre:[{min: 0, max: 200,message: "字数超过最大限制",trigger: "blur"}],
        principal: [{ required: true, message: "不能为空!"}],
        manageName: [{ required: true, message: "不能为空!"}],
        maxSize: [
          { required: true, message: "成员人数最少为2", trigger: "blur" }
        ],
        endDate: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      formLabelWidth: "140px",
      sendList: [],
      innerAddTeam: false,
      suboffenUse: true, //是否可设置常用
      subcanTab: false, //是否可切换
      subsingelCheckF: true, // 单选true 多选为false
      subdialogTit: "人员选择", // 弹框标题
      subcheckIds: [],
      outerAddTeam: true,
      showTreeUser: false,
      subType: Number,
      dialogForm: {
        addre:'',
        duties:"",
        endDate:"",
        maxSize:"",
        reason:"",
        teamName:"",
        principal:"",
        manageName:""
      },
      isShow: false
    };
  },
  components: {
    TreeUser
  },
  created() {},
  mounted() {
    console.log(this.checkId)
    console.log(this.teamidStr)
    this.getDetailById_parmas.id = this.checkId;
    if (this.type == "add") {
     this.dialogForm = {
          addre:'',
        duties:"",
        endDate:"",
        maxSize:"",
        reason:"",
        teamName:"",
        principal:"",
        manageName:""
        };
    } else if (this.type == "edit") {
      this.getFormData();
    }
  },
  watch: {
    // dilalogTeamState(newv, oldv) {
    //   this.outerAddTeam = newv;
    // },
    checkId(newv, oldv) {
      this.getDetailById_parmas.id = newv;
      this.getFormData();
    }
  },
  methods: {
    getFormData() {
      this.$post
        .postData(
          "getDetailById",
          JSON.stringify(this.getDetailById_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          let formData = res.data;
          console.log(formData);
          this.dialogForm = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // inpBlur(event) {
    //   this.dialogForm.maxSize =
    //     event.target.value >= 2 ? event.target.value : "";
    // },
    closeTeam() {
       this.$confirm('此操作将关闭团队, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.findTeamTask_parmas.teamIds = this.teamidStr 
           this.$post
        .postData(
          "findTeamTask",
          JSON.stringify(this.findTeamTask_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          // this.dialogForm = {}
          if (res.success) {
            if(res.data.length>0){
               this.$alert('团队中人员有任务，不能关闭!', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
              this.cancelSetDialog()
            })
            }else{
              this.toCloseTeam()
            }
          }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消关闭'
          });          
        });
    },
    toCloseTeam(){
      this.deleteById_parmas.id = this.checkId;
      this.$post
        .postData(
          "deleteById",
          JSON.stringify(this.deleteById_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          // this.dialogForm = {}
          if (res.success) {
            this.$emit("teamshowCompDialog", true);
            this.$message({
              showClose: true,
              message: "关闭成功",
              type: "warning"
            });
            location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    subshowCompDialog(data, type) {
      //嵌套弹层
      if (type) {
        // this.subcheckIds = data[0] ? [].concat(data[0].id) : [];
        let chargeArr = [];
        let chargeArrId = [];
        data.forEach(item => {
          chargeArr.push(item.name);
          chargeArrId.push(item.id);
        });
        console.log(chargeArr);
        if (this.subType == 1) {
          this.dialogForm.principal = chargeArr.join(",");
          this.dialogForm.principalId = chargeArrId.join(",");
        } else {
          this.dialogForm.manageName = chargeArr.join(",");
          this.dialogForm.manageId = chargeArrId.join(",");
        }
      }
      this.showTreeUser = false;
    },
    choosePerson(type) {
      this.subType = type == 1 ? 1 : 2;
      this.showTreeUser = true;
    },
    cancelSetDialog() {
      this.$emit("teamshowCompDialog");
      if (this.type == "add") {
        this.dialogForm = {};
      }
      // this.dialogForm = {}
      // console.log(this.dialogForm)
    },
    submitOuter(formName) {
      if(this.dialogForm.maxSize<2){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "成员上限不小于两人",
          duration: 1000
        });
        return;
      }
      console.log(this.dialogForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogForm.id = this.checkId;
          this.dialogForm.parentId = "";
          this.dialogForm.dealStatus = 1;
          this.dialogForm.applicationStatus = "";
          this.dialogForm.status = 0;
          this.save_parmas.TeamEntityPo = JSON.stringify(this.dialogForm);
          if (this.type == "edit") {
            delete this.save_parmas.sign
          } 
          console.log(this.dialogForm);
          this.$post
            .postData("save", JSON.stringify(this.save_parmas), this.$businessCode.tdgl)
            .then(res => {
              console.log(res);
              if (res.success) {
                this.$message({
                  showClose: true,
                  message: "保存成功",
                  type: "success"
                });
                this.$emit("teamshowCompDialog", true);
                if (this.type == "add") {
                  this.dialogForm = {};
                }
              }else{
                this.$message({
                showClose: true,
                message:res.message,
                type: "warning"
              });
              }
            })
            .catch(err => {
              console.log(err);
              // this.$emit("teamshowCompDialog");
              this.$message({
                showClose: true,
                message: err,
                type: "warning"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.addTeamFrom .el-input {
  width: 80%;
}
</style>