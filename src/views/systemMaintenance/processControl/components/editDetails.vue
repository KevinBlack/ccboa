<template>
  <div>
    <el-dialog :visible.sync = "outerVisible" append-to-body fullscreen>
        <span slot="title" class="dialog-header">
                      <el-button type="success" plain  @click="saveEditAdd">保存</el-button>
                  </span>
                   <el-header class="dia-header">
                      环节定义编辑
                    </el-header>
                    <el-card class="box-card dialog-lable">

                      <el-form
                            :model="tacheForm"
                            ref="tacheForm"
                            label-width="140px"
                          >
                          <el-row>
                           <el-col>
                              <el-form-item label="环节名称" prop="name">
                                <el-input v-model="tacheForm.name" clearable></el-input>
                              </el-form-item>
                           </el-col>
                          </el-row>


                          <el-divider></el-divider>
                          <el-row>
                           <el-col>

                              <el-form-item label="缺省处理人" prop="name1">
                                <el-col :span="8">
                                  <el-radio v-model="radioPreason" label="1">指定人员</el-radio>
                                  <el-radio v-model="radioPreason" label="2">指定表单域</el-radio>
                                </el-col>
                                <el-col :span="14" v-if="radioPreason == 1">
                                  <el-input v-model="tacheForm.name" readonly clearable></el-input>
                                </el-col>  
                                <el-col :span="2"  v-if="radioPreason == 1">
                                  <el-button type="primary">选择</el-button>
                                </el-col>
                                <el-col :span="16" v-else>
                                  <el-select v-model="tacheForm.name" placeholder="请选择" style="width:100%">
                                       
                                      </el-select>
                                </el-col>
                              </el-form-item>
                           </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <table class="el-table table-look" style="margin-bottom:1vh;">
                            <tr>
                              <td rowspan="8"  style="text-align: right;width:130px;color:#1773d2;font-size: 16px;">处理人选择范围</td>
                              <td rowspan="4" style="width:130px">部门</td>
                              <td style="width:130px">
                                <el-checkbox-group v-model="checkedBmlb" >
                                  <el-checkbox>指定部门类别</el-checkbox>
                                  </el-checkbox-group>
                              </td>
                              <td class="tleft">
                                <el-radio-group v-model="radioBmlb" style="width:20%" v-if="checkedBmlb">
                                  <el-radio :label="3">行领导</el-radio>
                                  <el-radio :label="6">办公室</el-radio>
                                  <el-radio :label="12">法律部门</el-radio>
                                  <el-radio :label="15">高管</el-radio>
                                  <el-radio :label="18">内控合规部 </el-radio>
                                  <el-radio :label="21">技术部门 </el-radio>
                                </el-radio-group>
                              </td>
                            </tr>
                            <tr>
                              <td style="width:130px">
                                <el-checkbox-group v-model="checkedBmmc" >
                                  <el-checkbox>指定部门名称</el-checkbox>
                                </el-checkbox-group>
                              </td>
                              <td class="tleft">      
                                <el-col :span="20" v-if="checkedBmmc">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>  
                                <el-col :span="2" v-if="checkedBmmc">
                                  <el-button type="primary">选择</el-button>
                                </el-col>
                                <el-col :span="22" v-else="checkedBmmc">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>
                              </td>
                            </tr>
                            <tr>
                              <td style="width:130px">
                                <el-checkbox-group v-model="checkedBmy" >
                                  <el-checkbox>指定部门域</el-checkbox>
                                </el-checkbox-group>
                              </td>
                              <td class="tleft">      
                                <el-col :span="20" v-if="checkedBmy">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>  
                                <el-col :span="2" v-if="checkedBmy">
                                  <el-button type="primary">选择</el-button>
                                </el-col>
                                <el-col :span="22" v-else="checkedBmy">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>
                              </td>
                            </tr>
                            <tr>
                              <td>指定部门域职位</td><td class="tleft">

                                <el-checkbox-group v-model="checkedBmzw" >
                                  <el-checkbox>部门正职</el-checkbox>
                                  <el-checkbox>部门副职</el-checkbox>
                                  <el-checkbox>部门综合代表</el-checkbox>
                                  <el-checkbox>包含下级部门</el-checkbox>
                                </el-checkbox-group>
                              </td>
                            </tr>
                            <tr>
                              <td rowspan="2" style="width:130px">人员</td>
                              <td style="width:130px">
                                <el-checkbox-group v-model="checkedZdry" >
                                  <el-checkbox>指定人员</el-checkbox>
                                </el-checkbox-group>
                              </td>
                              <td class="tleft">      
                                <el-col :span="20" v-if="checkedZdry">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>  
                                <el-col :span="2" v-if="checkedZdry">
                                  <el-button type="primary">选择</el-button>
                                </el-col>
                                <el-col :span="22" v-else="checkedZdry">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>
                              </td>
                            </tr>
                            <tr>
                              <td style="width:130px">
                                <el-checkbox-group v-model="checkedZdryy" >
                                  <el-checkbox>指定人员域</el-checkbox>
                                </el-checkbox-group>
                              </td>
                              <td class="tleft">      
                                <el-col :span="20" v-if="checkedZdryy">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>  
                                <el-col :span="2" v-if="checkedZdryy">
                                  <el-button type="primary">选择</el-button>
                                </el-col>
                                <el-col :span="22" v-else="checkedZdryy">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>
                              </td>
                            </tr>
                            <tr>
                              <td style="width:130px">岗位</td>
                              <td style="width:130px">
                                <el-checkbox-group v-model="checkedZdgw" >
                                  <el-checkbox>指定岗位</el-checkbox>
                                </el-checkbox-group>
                              </td>
                              <td class="tleft">      
                                <el-col :span="20" v-if="checkedZdgw">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>  
                                <el-col :span="2" v-if="checkedZdgw">
                                  <el-button type="primary">选择</el-button>
                                </el-col>
                                <el-col :span="22" v-else="checkedZdgw">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>
                              </td>
                            </tr>
                            <tr>
                              <td style="width:130px">逻辑关联</td>
                              <td class="tleft">
                                <el-row>
                                  <el-col :span="6">
                                      <el-select placeholder="请选择" style="width:100%">
                                        <el-option>部门</el-option>
                                        <el-option>人员</el-option>
                                        <el-option>岗位</el-option>
                                      </el-select>
                                  </el-col>
                                  <el-col :span="6">
                                      <el-select placeholder="请选择" :span="4" style="width:100%">
                                        <el-option>包含（AND）</el-option>
                                        <el-option>并存（OR）</el-option>
                                        <el-option>排除（NOT）</el-option>
                                      </el-select>
                                  </el-col>
                                  <el-col :span="6">
                                      <el-select placeholder="请选择" :span="4" style="width:100%">
                                        <el-option>部门</el-option>
                                        <el-option>人员</el-option>
                                        <el-option>岗位</el-option>
                                      </el-select>
                                  </el-col>
                                  <el-col :span="6">
                                      <el-select placeholder="请选择" :span="4" style="width:100%">
                                        <el-option>包含（AND）</el-option>
                                        <el-option>并存（OR）</el-option>
                                        <el-option>排除（NOT）</el-option>
                                      </el-select>
                                  </el-col>
                                  <el-col :span="6">
                                      <el-select placeholder="请选择" :span="4" style="width:100%">
                                        <el-option>部门</el-option>
                                        <el-option>人员</el-option>
                                        <el-option>岗位</el-option>
                                      </el-select>
                                  </el-col>
                                </el-row>
                              </td>
                            </tr>
                          </table>
                          <el-row>
                              <el-form-item label="可见操作按钮">
                                <el-col :span="22">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>
                                <el-col :span="2">
                                <el-button type="primary">选择</el-button>
                                </el-col>
                              </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                              <el-form-item label="可编辑的意见域">
                               <el-col :span="22">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>
                                <el-col :span="2">
                                <el-button type="primary">选择</el-button>
                                </el-col>
                              </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                              <el-form-item label="带约束条件的可编辑意见域">
                               <el-col :span="22">
                                  <el-input v-model="tacheForm.date2" readonly clearable></el-input>
                                </el-col>
                                <el-col :span="2">
                                <el-button type="primary">选择</el-button>
                                </el-col>
                              </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                              <el-form-item label="必填的意见域">
                               <el-col :span="22">
                                  <el-input v-model="tacheForm.date2" readonly clearable autosize="true" type="textarea"></el-input>
                                </el-col>
                                <el-col :span="2">
                                <el-button type="primary">选择</el-button>
                                </el-col>
                              </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                              <el-form-item label="不可编辑的控制域">
                               <el-col :span="22">
                                  <el-input v-model="tacheForm.date2" readonly clearable autosize="true" type="textarea"></el-input>
                                </el-col>
                                <el-col :span="2">
                                <el-button type="primary">选择</el-button>
                                </el-col>
                              </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                              <el-form-item label="必填的控制域">
                               <el-col :span="22">
                                  <el-input v-model="tacheForm.date2" readonly clearable autosize="true" type="textarea"></el-input>
                                </el-col>
                                <el-col :span="2">
                                <el-button type="primary">选择</el-button>
                                </el-col>
                              </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                              <el-form-item label="环节特性">
                               <el-col :span="22">
                                  <el-input v-model="tacheForm.date2" readonly clearable autosize="true" type="textarea"></el-input>
                                </el-col>
                                <el-col :span="2">
                                <el-button type="primary">选择</el-button>
                                </el-col>
                              </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                              <el-form-item label="带约束条件的环节特性">
                               <el-col :span="22">
                                  <el-input v-model="tacheForm.date2" readonly clearable autosize="true" type="textarea"></el-input>
                                </el-col>
                                <el-col :span="2">
                                <el-button type="primary">选择</el-button>
                                </el-col>
                              </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-form-item label="后续环节">
                              <el-col :span="22">
                                <el-input v-model="tacheForm.date2" readonly clearable autosize="true" type="textarea"></el-input>
                              </el-col>
                              <el-col :span="2">
                              <el-button type="primary">选择</el-button>
                              </el-col>
                            </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-form-item label="带约束条件的后续环节">
                              <el-col :span="22">
                                <el-input v-model="tacheForm.date2" readonly clearable autosize="true" type="textarea"></el-input>
                              </el-col>
                              <el-col :span="2">
                              <el-button type="primary">选择</el-button>
                              </el-col>
                            </el-form-item>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="子流程">

                                <el-select v-model="value" placeholder="请选择">
                                    <el-option>1</el-option>
                                    <el-option>1</el-option>
                                    <el-option>1</el-option>
                                    <el-option>1</el-option>
                                  </el-select>

                              </el-form-item>
                            </el-col>
                          </el-row>
                      </el-form>
                    </el-card>
            </el-dialog>
  </div>



</template>

<script>
  export default{
    props:{
      //id:{type:Number,default:""},
      // 表格数据
      type:{type:Number,default:""},
    },
    data(){
      return{
        radioPreason:'1',
        checkedBmlb:true,
        checkedBmmc:true,
        checkedBmy:true,
        checkedZdry:true,
        checkedZdgw:true,
        checkedZdryy:true,
        checkedBmzw:false,
        radioBmlb:'3',
        tacheForm: {
          name: '上级行业务部门综合处理',
          name1: 'name1',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '指定人员',
          desc: '',
          chcekShow:true
        },
          //弹窗
          outerVisible:false,
        }
    },
    mounted(){
      if(this.type == 1){
        alret(1)
      }else{
        alert(2)
      }
    },
    methods:{
      typeHandle(){},
      openEditDialog (){
        this.outerVisible = true;
      },
      saveEditAdd(){},
    }
  }

</script>

<style  lang="less" rel="stylesheet/less" scoped>
.el-dialog{
  .dialog-lable{
    /deep/ .el-form-item{
      height:auto !important;
    }
    /deep/  .el-form-item__label{
      color:#1773d2;
      font-size: 16px;
    }
    /deep/ .el-divider--horizontal{
      margin: 4px 0;
    }
    /deep/ .el-main{
      padding:0;
    }
    .table-look{
      list-style:none;
      .tleft{
        text-align: left !important;
      }
      tr{
        td{
          text-align: center;
        }
      }
    }
  }
  .dia-header{text-align: center;font-size: 28px;height:40px}
  .box-card{
    width: 70%;
    margin: 0 auto;
    .el-form-item{
      margin-bottom: 8px;
      height: 35px;
    }
    /deep/ .el-card__header{
      font-size: 18px !important;
    }
  }
}


</style>
