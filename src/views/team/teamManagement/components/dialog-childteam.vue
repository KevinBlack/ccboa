<template>
  <el-dialog v-dialogDrag :title="childTeamTitle" :visible.sync="childTeamVisible" @close="cancelSetDialog">
    <el-form
      :model="dialogForm"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
      class="addTeamFrom"
    >
      <el-form-item label="上级团队名称" :label-width="formLabelWidth">
        <el-input v-model="dialogForm.parentName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="子团队名称" :label-width="formLabelWidth" prop="teamName">
        <el-input v-model="dialogForm.teamName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="团队职责" :label-width="formLabelWidth" prop="duties">
        <el-input v-model="dialogForm.duties" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="团队负责人" :label-width="formLabelWidth" prop="principal">
        <el-input v-model="dialogForm.principal" autocomplete="off" :disabled="true"></el-input>
        <el-button type="primary" size="mini" @click="choosePerson(1)" style="margin-left:10px">选择</el-button>
      </el-form-item>
      <el-form-item label="团队管理员" :label-width="formLabelWidth" prop="manageName">
        <el-input v-model="dialogForm.manageName" autocomplete="off" :disabled="true"></el-input>
        <el-button type="primary" size="mini" @click="choosePerson(2)" style="margin-left:10px">选择</el-button>
      </el-form-item>
    </el-form>
    <TreeUser
      :subdialogTit="subdialogTit"
      :suboffenUse="suboffenUse"
      :subcheckIds="subcheckIds"
      :subcanTab="subcanTab"
      :subsingelCheckF="subsingelCheckF"
      :subtreeData="sendList"
      @subshowCompDialog="subshowCompDialog"
      v-if="showTreeUser"
    ></TreeUser>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSetDialog">取 消</el-button>
      <el-button type="primary" @click="submitCildTeam('ruleForm')" v-if="isDelete=='0'" >保存</el-button>
      <el-button
        type="primary"
        @click="closeTeam"
        v-if="childTeamTitle=='维护子团队' && isDelete=='0'"
      >关闭团队</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TreeUser from "./tree-user";
export default {
  props: {
    childTeamTitle: {
      type: String,
      default: ""
    },
    checkId: {
      type: String,
      default: ""
    },
    checkName: {
      type: String,
      default: ""
    },
    childType: {
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
      getDetailById_parmas: {
        function: "getDetailById",
        id: ""
      },
      save_parmas: {
        function: "save",
        TeamEntityPo: ""
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
        teamName: [{ required: true, message: "不能为空!", trigger: "blur" },{ message: "字数超过最大限制",min: 1, max: 16, trigger: "blur" }],
        duties: [{ required: true, message: "不能为空!", trigger: "blur" },{ message: "字数超过最大限制",min: 1, max: 200, trigger: "blur" }],
        principal: [{ required: true, message: "不能为空!"}],
        manageName: [{ required: true, message: "不能为空!"}]
      },
      formLabelWidth: "140px",
      childTeamVisible: true,
      showTreeUser: false,
      dialogForm: {
        parentName:'',
        teamName:'',
        duties:'',
        principal:'',
        manageName:''
      },
      parentIdChild: "",
      parentNameChild: "",
      sendList: [
        {
          name: "部门",
          id: "bum",
          tree: "treeList",
          data: [
            {
              id: 1,
              name: "一级 1"
            },
            {
              id: 5,
              name: "一级 2"
            },
            {
              id: 8,
              name: "一级 3"
            }
          ]
        },
        {
          name: "行领导",
          id: "hld",
          tree: "treeList",
          data: [
            {
              id: 11,
              name: "领导"
            },
            {
              id: 12,
              name: "管理"
            },
            {
              id: 16,
              name: "团体"
            }
          ]
        },
        {
          name: "行组织",
          id: "hzz",
          tree: "treeList",
          data: [
            {
              id: 110,
              name: "案件"
            },
            {
              id: 120,
              name: "事件"
            },
            {
              id: 160,
              name: "活动"
            }
          ]
        }
      ],
      innerAddTeam: false,
      suboffenUse: true, //是否可设置常用
      subcanTab: false, //是否可切换
      subsingelCheckF: true, // 单选true 多选为false
      subdialogTit: "人员选择", // 弹框标题
      subcheckIds: [],
      subdialogState: false,
      subType: Number
    };
  },
  components: {
    TreeUser
  },
  created() {
    console.log(this.checkId);
    this.getDetailById_parmas.id = this.checkId;
    if (this.childType == "add") {
      this.dialogForm = {
        parentName:'',
        teamName:'',
        duties:'',
        principal:'',
        manageName:''
      };
      this.dialogForm.parentName = this.checkName;
    } else if (this.childType == "edit") {
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
    cancelSetDialog() {
      this.dialogForm = {};
      this.$emit("childTeamDialog");
    },
    submitCildTeam(ruleForm) {
      console.log(this.dialogForm)
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.childType == "add") {
            this.dialogForm.id = "";
            this.dialogForm.parentId = this.checkId;
          } else if (this.childType == "edit") {
            this.dialogForm.id = this.checkId;
            delete this.dialogForm.parentId;
          }
          // this.dialogForm.id = "";
          this.dialogForm.deptIds = 0;
          this.dialogForm.postIds = 0;
          // this.dialogForm.parentId = this.checkId;
          this.dialogForm.parentName = this.checkName;
          this.dialogForm.status = 0;
          this.save_parmas.TeamEntityPo = JSON.stringify(this.dialogForm);
          console.log(this.dialogForm);
          this.$post
            .postData("save", JSON.stringify(this.save_parmas), this.$businessCode.tdgl)
            .then(res => {
              console.log(res);
              if (res.success) {
                this.$emit("childTeamDialog", true);
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.dialogForm = {};
              }else{
                this.$message({
                  message: res.message,
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.$message({
                showClose: true,
                message: err,
                type: "warning"
              });
              this.$emit("childTeamDialog");
              this.dialogForm = {};
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
        let chargeArr = [];
        let chargeArrId = [];
        data.forEach(item => {
          chargeArr.push(item.name);
          chargeArrId.push(item.id);
        });
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
    }
  }
};
</script>

<style scoped>
.addTeamFrom .el-input {
  width: 80%;
}
</style>