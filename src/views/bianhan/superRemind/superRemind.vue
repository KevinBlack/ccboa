<template>
  <div class="superRemind">
    <P class="superRemind_title">承办反馈时间提醒设置</P>
    <el-button type="primary" @click="close">关闭</el-button>
    <el-button type="primary" @click="saveFom()">保存</el-button>
    <el-divider class="fengex"></el-divider>
    <!-- 表单 -->
    <div class="superRemind_min">
    <el-form :rules="rules" ref="form"  :model="form" label-width="170px">
       <el-form-item label="机构">
            <el-input v-model="shortUnitName" disabled></el-input>
        </el-form-item>
        <el-form-item label="提醒是否启用" prop="reminderType">
            <el-radio-group v-model="form.reminderType">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="提醒对象" prop="reminderMethod">
          <el-checkbox-group v-model="form.reminderMethod">
            <el-checkbox label="1" value="1">当前处理人</el-checkbox>
            <el-checkbox label="2" value="2">当前处理人所在部门综合</el-checkbox>
          </el-checkbox-group>
          
        </el-form-item>
        <el-form-item label="提前提醒天数" prop="lengthOfStay">
          <el-select v-model="form.lengthOfStay" placeholder="请选择时间">
            <el-option label="一天" value="1"></el-option>
            <el-option label="两天" value="2"></el-option>
            <el-option label="三天" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首页待办提醒标题设置" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
    </el-form>
   
  </div>
  <p class="super_wenzi">
    *注释：</p>
    <p class="super_wenzi">提前提醒天数：该天数为相较于反馈截止日期提前提醒的时间天数
  </p>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>是否保存修改的信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >

    export default {
        name: 'superRemind',
        components: {
        },
        props: {},
        data() {
            return {
              routeId: '', //表单ID
              shortUnitName:JSON.parse(localStorage.getItem('userInfo')).shortUnitName,
              rules:{
                reminderType:[{required:true,message:'不能为空',trigger:'change'}],
                reminderMethod:[{required:true,message:'不能为空',trigger:'change'}],
                lengthOfStay:[{required:true,message:'不能为空',trigger:'change'}],
                title:[{required:true,message:'不能为空',trigger:'change'}]
              },
              form:{
                  id:'',
                  humanUnit:this.$route.query.searchDataUnitId,
                  reminderType: 1,
                  reminderMethod:['1'],
                  lengthOfStay:'1',
                  title:'便函即将截止反馈，请尽快办理：便函标题',
              },
              dialogVisible:false
            }
        },
        computed: {},
        methods: {
            //保存
            saveFom(){
                // this.dialogVisible=true;
                this.saveSure()

            },
            saveSure(){
              console.log(this.form, '获取表单数据')
              if (this.routeId) {
                this.form.id = this.$route.query.id
              }
              this.$api.bianhan.backlogAdd(this.form).then((res) => {
                if(res){
                  this.$message({
                    type: 'success',
                    showClose: true,
                    message: res.msg,
                    duration: 500,
                  })
                  this.$router.back()
                }
              })
              // this.dialogVisible=false;
            },
            close(){
              this.$router.back()
            }
        },
        activated() {
        },
        mounted() {
        },
        created() {
          this.shortUnitName = this.$route.query.searchDataUnitName
          this.routeId = this.$route.query.id
          if (this.routeId) {
            let paramer = {
              humanUnit:this.$route.query.searchDataUnitId,
              id: this.routeId
            }
            this.$api.bianhan.backlogParticulars(paramer).then((res) => {
              console.log('查询', res)

              this.form = res.data
              this.form.reminderMethod = JSON.parse(res.data.reminderMethod)
              this.form.reminderType = Number(res.data.reminderType)
            })
          }
        }
    }
</script>

<style >
.superRemind{
  padding: 0 10px;
  height: calc(100vh - 140px);
}
    .superRemind_title {
        width: 100%;
        text-align: center;
        color: #0eb6e9;
        font-size: 36px;
        font-weight: 800;
        margin: 10px 0;
  }

  .superRemind_min{
    margin-left: 15%;
    padding-right: 15%;
  }
  .fengex{
    color: #0eb6e9;
  }
.super_wenzi{
  color: #c40a13;
  font-size: 14px;
  text-align: left;
  padding-top: 20px;
  line-height: 8px;
  margin-left: 16%;
}

</style>
