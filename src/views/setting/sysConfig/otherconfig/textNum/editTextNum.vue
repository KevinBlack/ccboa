<!--
 * @Author: yx
 * @Date: 2020-08-13 14:15:24
 * @LastEditTime: 2020-10-17 18:07:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\sysConfig\otherconfig\textNum\editTextNum.vue
-->
<template>
  <div class="editTextNum">
    <div class="btn-list">
      <el-button type="primary" @click="close_btn">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <p class="base-title">待办事宜详情</p>
    <el-form style="margin-top: 10px;" label-width="80px" :model="todoform"  :rules="todoformRules" ref="ruleForm">
     <el-form-item  label="机构名称" prop="id">
       <el-input readonly="readonly" v-model="todoform.draftName" width='200px'></el-input>
     </el-form-item>
     <el-form-item label="紧急级别" prop="todoClass">
       <el-input v-model="todoform.todoClass"  ></el-input>
     </el-form-item>
     <el-form-item label="紧急参数" prop="todoParameter">
       <el-input v-model="todoform.todoParameter"></el-input>
     </el-form-item>
   </el-form>
  </div>
</template>
<script>


export default {
  name: 'editTextNum',
  components: {
    
  },
  data () {
    return {

      queryInfo:{

      },
      todoform:{
        draftName:'',
        todoClass:'',
        todoParameter:''
      },
      todoformRules:{

        todoClass:[{required:true,message:'请输入紧急级别',trigger:'blur'}],
        todoParameter:[{required:true,message:'请输入紧急参数',trigger:'blur'}],
      },
      //按钮文字是否为编辑 
    }
      //机构下拉框值
     
  },
  methods: {
    close_btn () {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.savedata();
          this.$router.push({
            path: '/setting/sysConfig/otherconfig/thingsOrder',
            query: {
              
              draftName:this.todoform.draftName,
              id:JSON.parse(this.$route.query.detail).draftId,
            }
          });
        })
        .catch(() => {
        });
    },
    // 编辑&&保存
    savedata () {
      this.queryInfo.id = JSON.parse(this.$route.query.detail).id  
      this.queryInfo.todoClass = this.todoform.todoClass  
      this.queryInfo.todoParameter = this.todoform.todoParameter  
      this.$api.setSysConfig.changeEmergencyLevel(this.queryInfo).then(res => {
        console.log(res)
        this.$message({
            type: "info",
            message: "保存成功",
        });
      })    
    },
    //加载fdForm配置
  },
  created() {
    console.log(this.$route.query, 111111111111111111)
    this.todoform.draftName = JSON.parse(this.$route.query.detail).draftName
    this.todoform.todoClass = JSON.parse(this.$route.query.detail).todoClass
    this.todoform.todoParameter = JSON.parse(this.$route.query.detail).todoParameter
    console.log(this.$route.query, 111111111111111111, this.todoform)
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.editTextNum {
  width: 90%;
  height: 100vh;

  .base-title {
    margin: 30px 0px;
    text-align: center;
    color: #3b85f0;
    font-size: 28px;
    font-weight: bolder;
  }

  .formdata {
    margin-top: 40px;
  }
}
</style>
