<template>
  <div>
    <el-dialog :visible = "outerVisible" append-to-body fullscreen @open="typeChange()" @close="outerVisible=false" destroy-on-close lock-scroll>
        <span slot="title" class="dialog-header">
          <el-row v-if="isAddType">
              <el-button type="success" plain @click="addEditSave">保存</el-button>
          </el-row>
          <el-row v-else>
            <el-button type="success" plain  @click="editTrue">编辑</el-button>
            <el-button type="success" plain  v-if="edit" @click="editFalse">保存</el-button>
            <el-button type="success" plain v-if="edit">转换成模板</el-button>
            <el-button type="success" plain v-if="edit">从模板更新流程</el-button>
          </el-row>
        </span>


        <el-header  class="dia-header">
          流程定义
        </el-header>
              <el-container>
                <el-main>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" style="font-size:18px">
                          <span>流程基本信息</span>
                        </div>
                        <div class="text item">
                        <el-form
                            label-width="100px"
                          >
                          <el-row>
                            <el-col :span="20" prop="groupId" v-if="edit||isAddType">
                                <el-form-item label="流程适用机构">
                                  
                                  <el-input v-model="groupId" readonly="readonly"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="24" v-else>
                                <el-form-item label="流程适用机构">
                                  <el-input v-model="groupId"  disabled="disabled"></el-input>
                                </el-form-item>
                              </el-col>
                              
                              <el-col :span="2"  v-if="edit||isAddType">
                                <el-button type="primary" style="float:right">选择</el-button>
                              </el-col>
                              <el-col :span="2"  v-if="edit||isAddType">
                                <el-button type="danger"  >删除</el-button>
                              </el-col>
                            </el-row>
                            <el-row>
                             <el-col :span="12">
                              <el-form-item label="业务名称">
                                <el-input v-model="afltBsnInf"  disabled="disabled" v-if="!isAddType"></el-input>
                                <el-select
                                  v-model="afltBsnInf"
                                  placeholder="请选择"
                                  style="width:100%"
                                   v-if="isAddType"
                                >
                                </el-select>
                              </el-form-item>
                            </el-col> 
                              <el-col :span="12">
                              <el-form-item label="业务分类">
                                <el-input v-model="tplBsnId"  disabled="disabled" v-if="!isAddType"></el-input>
                                <el-select
                                  v-model="tplBsnId"
                                  placeholder="请选择"
                                  style="width:100%"
                                   v-if="isAddType"
                                >
                                
                                </el-select>
                              </el-form-item>
                            </el-col> 
                             
                            </el-row> 
                           
                           <el-row>
                             <el-col>
                                
                                <el-form-item label="流程名称" v-if="edit||isAddType">
                                  <el-input v-model="tplName"></el-input>
                                </el-form-item>
                                <el-form-item label="流程名称" v-else>
                                  <el-input v-model="tplName"  disabled="disabled"  ></el-input>
                                </el-form-item>
                              </el-col>
                           </el-row>
                            <el-row>
                             <el-col>
                                <el-form-item label="所有环节">
                                  <el-input v-model="nodeAttr" :disabled="!isAddType">
                                         <template slot="append">(以逗号,分隔)</template>
                                  </el-input>
                                </el-form-item>
                              </el-col>
                           </el-row>  
                        </el-form>
                        </div>
                      </el-card>

              <el-card class="box-card" style="margin-top:20px;font-size:18px;"  v-if="!isAddType">
                        <div slot="header" class="clearfix">
                          <span >环节设置</span>
                          <el-button type="primary" style="float:right;padding-bottom:8px;" v-if="edit" @click="addNewNode">新增</el-button>
                        </div>
                            <m-table
                              height="20px"
                              size = 'medium'
                              :isIndex='true'
                              :isBorder='true'
                              :isPagination='false'
                              :isHandle = 'true'
                              :tableCols='tableCols'
                              :tableData='tableData1'
                              @selectAll = 'selectAll1'
                              @select='select'
                              @cellClick = 'cellClick1'
                            >
                            </m-table>
                      </el-card>
                </el-main>
              </el-container>
              <!--内部弹窗-->
              <el-dialog title="环节定义" :visible.sync = "innerVisible" append-to-body fullscreen>
                  <span slot="title" class="dialog-header">
                      <el-button type="success" plain  @click="editDetailsOpen">编辑</el-button>
                  </span>
                   <el-header class="dia-header">
                      环节定义
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
                                <el-divider direction="vertical"></el-divider>
                                {{tacheForm.name}}
                              </el-form-item>
                           </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                           <el-col>
                              <el-form-item label="缺省处理人" prop="name1">
                               <el-divider direction="vertical"></el-divider> 
                               {{tacheForm.name1}}
                              </el-form-item>
                           </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <table class="el-table table-look"  style="margin-bottom:1vh;">
                            <tr>
                              <td rowspan="8"  style="text-align: right;width:130px;color:#1773d2;font-size: 16px;">处理人选择范围</td>
                              <td rowspan="4" style="width:130px">部门</td>
                              <td style="width:130px">指定部门类别</td>
                              <td class="tleft"><el-divider direction="vertical"></el-divider></td>
                            </tr>
                            <tr>
                              <td>指定部门名称</td><td class="tleft"><el-divider direction="vertical"></el-divider></td>
                            </tr>
                            <tr>
                              <td>指定部门域</td><td class="tleft"><el-divider direction="vertical"></el-divider></td>
                            </tr>
                            <tr>
                              <td>指定部门域职位</td><td class="tleft"><el-divider direction="vertical"></el-divider></td>
                            </tr>
                            <tr>
                              <td rowspan="2" style="width:130px">人员</td>
                              <td style="width:130px">指定人员</td>
                              <td class="tleft"><el-divider direction="vertical"></el-divider></td>
                            </tr>
                            <tr>
                              <td>指定人员域</td><td class="tleft"><el-divider direction="vertical"></el-divider></td>
                            </tr>
                            <tr>
                              <td style="width:130px">岗位</td>
                              <td style="width:130px">指定岗位</td>
                              <td class="tleft"><el-divider direction="vertical"></el-divider></td>
                            </tr>
                            <tr>
                              <td style="width:130px">逻辑关联</td>
                              <td class="tleft"><el-divider direction="vertical"></el-divider></td>
                            </tr>
                          </table>
                          
                          <el-row>
                            <el-col>
                              <el-form-item label="可见操作按钮">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="可编辑的意见域">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="带约束条件的可编辑意见域">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="必填的意见域">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="不可编辑的控制域">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="必填的控制域">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="环节特性">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="带约束条件的环节特性">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="后续环节">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}tergwrgrwtyujhejtytykyukg4e6t4353qtvretvsertgvsfygbdtyun jhk,lurerrwesrfjthyktgrhjkrerhjynuredrtghyewqwfegrthyjyhfehjnmtgrfedsfhjnm,dfdbghnjm
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="带约束条件的后续环节">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-divider></el-divider>
                          <el-row>
                            <el-col>
                              <el-form-item label="子流程">
                               <el-divider direction="vertical"></el-divider> 
                                {{tacheForm.name1}}
                              </el-form-item>
                            </el-col>
                          </el-row>
                      </el-form>
                    </el-card>
              </el-dialog>
            </el-dialog>
            <editDetails ref="editDetails" v-if="editDetailsShow"></editDetails>

  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import editDetails from "./components/editDetails"
  export default{
    props:{
      //id:{type:Number,default:""},
      // 表格数据
      type:{type:String,default:""},
    },
    components: {
        mTable,
        editDetails
      },
    data(){
      return{
        wfFcnId:"01",//流程功能代码：01主流程02子流程
        isAddType:"",
        edit:false,//是否编辑
        //此处为from字段
        tplName: "1", 
        tplUser: "1", 
        nodeAttr: "1,2", 
        tplBsnId: "1",
        afltBsnInf: "1",
        groupId:"1",
        //新增保存需传数据
        addEditSaveData: {
          tplId: "001",//流程ID
          tplName:this.tplName,//流程名称
          tplUser:"001",//流程创建者id
          nodeAttr:this.nodeAttr,//流程活动节点名称（节点用‘，’分割）
          wfFcnId:this.wfFcnId,
          tplBsnId:this.tplBsnId,//业务分类
          afltBsnInf:this.afltBsnInf,//业务名称
          groupId:this.groupId,//所属机构
        },
        editDetailsShow:false,
        tableCols:[
            {"label":"环节名称","prop":'title',align:'center'},
            {"label":'环节id',"prop":'title1',align:'center'},
            { label: '操作 ', type: 'Button', align: 'center',
                  btnList: [
                    {
                      label: '查看',
                      size: 'medium',
                      type: 'text',
                      circle: true,
                      handle: row => {
                        this.handleEdit(row)
                      }
                    }
                  ]
                },
          ],
        tableData1:[
            {id:"1",title:'title',title1:'title1',date:'center',type:"button",formatter:'查看'},
            {id:'2',title:'title1',title1:'title2',date:'center'},
            {id:'3',title:'title2',title1:'title3',date:'center'},
            {id:'3',title:'title2',title1:'title3',date:'center'},
          ],
        
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
        innerVisible:false,
        
      }
    },
    created(){
      //解构
      //this.ruleForm = Object.assign({},JSON.pares(data))
    },
    mounted(){
     
    },
    methods:{
      typeChange(){
        if(this.type == "addLink"){
          this.isAddType=true;
        }else{
          this.isAddType=false;
        }
      },
      //新增时保存
      addEditSave(){
        this.$post
        .postData("saveTemplateDB",JSON.stringify(this.addEditSaveData))
        .then(res => {
          this.isAddType=false;
        });
      },
      //编辑状态下新增
      addNewNode(){
        this.editDetailsShow = true;
        this.$nextTick(()=>{
          this.$refs.editDetails.openEditDialog();
        })
      },
      editDetailsOpen(){
        this.editDetailsShow = true;
        this.$nextTick(()=>{
          this.$refs.editDetails.openEditDialog();
        })
      },
      handleEditUp(row){},
      handleEditDown(row){},
      selectAll1(rows) {
      //console.log('select', rows)
      },
      // 表格勾选
      cellClick1(row, column, cell, event){
          //console.log(row, column, cell, event)
          //this.innerVisible = true;
        },
      handleClick(){

      },
      // 表格勾选
      select(rows, row) {
        //console.log('select', rows, row);
      },
      openDialog (){
        this.outerVisible = true;
      },
      //查看
      handleEdit(rows){
        this.innerVisible = true;
      },
      //删除
      deleteRow(){

      },
      editTrue(){
        console.log(this.tableCols[2].btnList)
        this.edit = true;
        this.tableCols[2].btnList = [
                  {
                    label: '查看',
                    size: 'small',
                    type: 'text',
                    circle: true,
                    handle: row => {
                      this.handleEdit(row)
                    }
                  },{
                    label: '删除',
                    size: 'small',
                    type: 'text',
                    type: 'danger',
                    handle: row => {
                      this.deleteRow(row)
                    }
                  },
                  {
                    label: '上移',
                    size: 'small',
                    type: 'primary',
                    handle: row => {
                      this.handleEditUp(row)
                    }
                  },
                  {
                    label: '下移',
                    size: 'small',
                    type: 'primary',
                    handle: row => {
                      this.handleEditDown(row)
                    }
                  }
                ];
      },
      editFalse(){
        this.edit = false;
        this.tableCols[2].btnList = [
                  {
                    label: '查看',
                    size: 'small',
                    type: 'text',
                    circle: true,
                    handle: row => {
                      this.handleEdit(row)
                    }
                  }
                ];
      },
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
    
  }
}


</style>
