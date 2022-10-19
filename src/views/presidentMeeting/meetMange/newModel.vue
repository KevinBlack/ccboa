<template>
  <div class="qcDetail">
    <div class="headerClick">
      <div class="right">
         <el-button type="primary" plain  size="mini" @click="closeBtn">关闭</el-button>
         <el-button type="primary" plain  size="mini" @click="backBtn">退回</el-button>
      </div>
    </div>
    <div class="qcHeader">
      <div class="title-text">中国建设银行行长办公会议议题报送单 </div>
      <el-form :rules="rules" :model="formData" label-width="120px" ref="elForm">
          <el-row>         
            <el-col :span="12">
              <el-form-item label="主汇报部门" prop="deptName">
                <el-input v-model="formData.deptName"></el-input>
                 
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人" prop="curuserChinaName">
                 <el-input  v-model="formData.curuserChinaName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row>         
            <el-col :span="12">
              <el-form-item label="手机号" prop="tel">
                <el-input v-model="formData.tel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上报时间" prop="sbSj" >
                 <el-input  v-model="formData.sbSj"></el-input>              
              </el-form-item>
            </el-col>
          </el-row>         
          <el-row>
            <el-col :span="24">
              <el-form-item label="议题名称"  prop="ytMc">
                 <el-input  autosize v-model="formData.ytMc"></el-input> 
              </el-form-item>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="24">
              <el-form-item label="上会依据"  prop="attach">                
                 <el-input type="textarea" autosize v-model="formData.attach"></el-input> 
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注"  prop="remark">
                <el-input type="textarea"  v-model="formData.remark" :disabled="false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
    </el-form>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: "topicDetail",
        components: {
          
        },
        data() {
            return {
              id:'',
                formData:{},
                input:'',
                value1:'',
                rules:{},              
      }       
        },
        computed: {},
        methods: {
          closeBtn(){
            this.$router.go(-1)
          },
           getDetail(){ 
            this.$api.secreatary.meeting.topDetailQuery({
              id: this.id
            }).then(res=>{
                 console.log(res)
                  this.formData=res.data
            })
          },
           backBtn(){
               this.$api.secreatary.meeting.topicBack({
              id:this.id
            }).then(res=>{
              this.$router.back()
                  // this.formData=res.data
            })
           }
            
        },
        activated() {
        },
        created() {         
            this.id=JSON.parse(this.$route.query.rowData).id                
                this.getDetail()
            },
        mounted() {
            
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-button--primary.is-plain.is-disabled{
    color: #409eff;
    // color: #3b85ef;
    
    background-color: #fff;
    border-color: #d9ecff;
}
  .qcDetail {
    background: white;
    margin: 0 auto;
    height: 100vh;
    .headerClick {
      background: #409eff;
      color: white;
      height: 50px;
      line-height: 50px;

      .right {
        margin-right: 130px;
        float: right;
      }
    }

    .qcHeader {
      padding: 8px 70px;

      .title-text {
        margin-bottom: 15px;
        font-size: 30px;
        line-height: 75px;
        color: #409eff;
        font-weight: 600;
        text-align: center;
      }
    }

  }

     
        
    
</style>
