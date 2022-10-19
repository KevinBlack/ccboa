<template>
  <div>
    <el-dialog :visible.sync = "outerVisible" append-to-body fullscreen>
        <span slot="title" class="dialog-header">
            <el-button type="success" plain  @click="saveAdd">保存</el-button>
        </span>
        <el-header style="text-align: center;font-size: 28px;height:40px">
          新增流程
        </el-header>
              <el-container>
                <el-main>
                    <el-card class="box-card">
                        <div class="text item">
                        <el-form
                            :model="ruleForm"
                            ref="ruleForm"
                            label-width="140px"
                          >
                          <el-row>
                            <el-col :span="20">
                                <el-form-item label="流程适用机构" prop="hostDepartment">
                                  <el-input v-model="ruleForm.hostDepartment" readonly="readonly"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="2">
                                <el-button type="primary">选择</el-button>
                              </el-col>
                              <el-col :span="2">
                                <el-button type="danger">删除</el-button>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="2">
                                  <el-form-item label="业务名称">
                                </el-form-item>
                              </el-col>
                              <el-col :span="10">
                              <el-form-item label="业务分类">
                                <el-select
                                  v-model="ruleForm.type"
                                  placeholder="请选择"
                                  style="width:100%"
                                >
                                  <!-- <el-option
                                    v-for="sendTypeitem in sendType"
                                    :key="sendTypeitem.label"
                                    :label="sendTypeitem.label"
                                    :value="sendTypeitem.label"
                                  ></el-option>-->
                                </el-select>
                              </el-form-item>
                            </el-col> 
                             <el-col :span="10">
                              <el-form-item label="业务名称">
                                <el-select
                                  v-model="ruleForm.type"
                                  placeholder="请选择"
                                  style="width:100%"
                                >
                                 <!--  <el-option
                                    v-for="sendTypeitem in sendType"
                                    :key="sendTypeitem.label"
                                    :label="sendTypeitem.label"
                                    :value="sendTypeitem.label"
                                  ></el-option>-->
                                </el-select>
                              </el-form-item>
                            </el-col> 
                            </el-row> 
                           
                           <el-row>
                             <el-col>
                                <el-form-item label="流程名称" prop="date2">
                                  <el-input v-model="ruleForm.tplName"></el-input>
                                </el-form-item>
                              </el-col>
                           </el-row>
                           <!-- <el-row>
                             <el-col>
                                 <el-form-item label="是否锁定主流程">
                                    <el-radio v-model="ruleForm.isDirect" label="是">是</el-radio>
                                    <el-radio v-model="ruleForm.isDirect" label="否">否</el-radio>
                                </el-form-item>
                              </el-col>
                           </el-row>
                           <el-row> -->

                            <!-- <el-col>
                                <el-form-item label="是否反馈附件" prop="region">
                                  <el-radio v-model="ruleForm.resource" label="是">是</el-radio>
                                    <el-radio v-model="ruleForm.resource" label="否">否</el-radio>
                                </el-form-item>
                              </el-col>
                           </el-row> -->
                            <!--<el-row>
                             <el-col>
                                <el-form-item label="流程级别" prop="hostDepartment">
                                  <el-input v-model="ruleForm.hostDepartment" :disabled="true"></el-input>
                                </el-form-item>
                              </el-col>
                           </el-row> 
                            <el-row>
                             <el-col>
                                <el-form-item label="所有环节" prop="hostDepartment">
                                  <el-input v-model="ruleForm.hostDepartment" :disabled="true"></el-input>
                                </el-form-item>
                              </el-col>
                           </el-row>  -->
                        </el-form>
                        </div>
                      </el-card>

              
                </el-main>
              </el-container>
            </el-dialog>
  </div>



</template>

<script>
  export default{
    props:{
      //id:{type:Number,default:""},
      // 表格数据
    },
    data(){
      return{
      ruleForm: {
          tplName:"",//流程名称
        },
        //弹窗
        outerVisible:false,
      }
    },
    methods:{
      openAddDialog (){
        this.outerVisible = true;
      },
      //保存
      saveAdd(){
        this.$post
        .postData("saveTemplateDB")
        .then(res => {
          console.log(res)
        });
      },
    }
  }

</script>

<style  lang="less" rel="stylesheet/less" scoped>
.el-dialog{
    .el-form-item{
      margin-bottom: 8px;
      height: 35px;
  }
}
.box-card{
    width: 70%;
    margin: 0 auto;
    }
</style>
