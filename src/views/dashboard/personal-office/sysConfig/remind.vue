<template>
  <div class="process_order">
    <P class="favorites_title">提醒设置</P>
    <div class="orgInfoTableBody">
      <el-row :gutter="5">
        <el-col :span="6">
          <div class="grid-content bg-purple normalFont">提醒项目</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light normalFont">紧急程度</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light normalFont">提醒方式</div>
        </el-col>
      </el-row>
      <div >
        <el-row :gutter="5" v-for="(item,index) in messageArr" :key="index" @click.native="rowClick(item)">
          <el-col :span="6">
              <div class="grid-content bg-purple normalFont" style="height: 41px;">{{item.productName}}</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple normalFont" style="height: 41px;">
              <el-checkbox-group  v-model="item.newCheckedCities" @change="handleCheckedCitiesChange" :disabled="displayShow">
                <el-checkbox v-for="(city,i) in item.urgentTypeList" :label="city" :key="i">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple normalFont" >
              <el-checkbox-group  v-model="item.newCheckedCities2" @change="handleCheckedCitiesChange2" :disabled="displayShow">
                <el-checkbox v-for="(city,i) in relist" :label="city" :key="i">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </div>
      
      <!-- 按钮 -->
      <el-row style="margin-top:16px" v-if="!displayShow">
        <el-button type="primary" @click="savadata">保存</el-button>
      </el-row>
      <el-row style="margin-top:16px" v-if="displayShow">
        <el-button type="primary" @click="editordata">编辑</el-button>
      </el-row>
    </div>
  </div>
</template>

<script >
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: 'remind',
  components: {
    FdForm
  },
  data () {
    return {
      organId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      organ: JSON.parse(localStorage.getItem("userInfo")).unitName,
      humanCode: JSON.parse(localStorage.getItem("userInfo")).humanCode,
      userName: JSON.parse(localStorage.getItem("userInfo")).humanName,
      messageArr: [],
      relist: ['邮件','微信'],
      formData:[],
      displayShow: true,
    }
  },
  created () {
  },
  mounted () {
    this.loading()
  },
  methods: {
    loading(){
      this.$api.dailyWork.viewRemindPer(
          {userId:this.humanCode,organId:this.organId}
      ).then(res => {
          if(res.code=="SUCCESS"){
            res.info.map(item => {
              if (item.urgentType|| item.warnType) {
                item.newCheckedCities = this.getStringList(item.urgentType)
                item.newCheckedCities2 = this.getStringList(item.warnType)
              }else{
                this.$set(item,'newCheckedCities',[])  
                this.$set(item,'newCheckedCities2',[]) 
              }
            })
            this.messageArr = res.info
            this.formData = this.messageArr
          }
      })
    },
    // 紧急程度
    handleCheckedCitiesChange(val){
      console.log(val);
      this.rowClick()
    },
    // 提醒方式
    handleCheckedCitiesChange2(val){
      console.log(val);
      this.rowClick()
    },
    rowClick(row){
      console.log(row,'row');
      this.formData.forEach(ele => {
        ele.urgentType = this.getArrList(ele.newCheckedCities)
        ele.warnType = this.getArrList(ele.newCheckedCities2)
        ele.organId = this.organId
        ele.organ = this.organ
        ele.userId = this.humanCode
        ele.userName = this.userName
      });
    },
    savadata () {
      this.displayShow = true
      this.$api.dailyWork.saveRemindPer(
          this.formData
      ).then(res => {
          if(res.code=="SUCCESS"){
            this.$message({
                message: '保存成功',
                type: 'success'
            });
            this.loading()
          }
      })
    },
    editordata () {
      this.displayShow = false
    },
    getArrList(aaa){
      // var aaa = ['1','2','3']
      var bbb = aaa.map(item=>{
      	if((this.is_repeat_str (item) || item=="" || item==null) && item.length != 1){
      		item = ""
      		return item
      	}else{
      		return '#'+item+'#'
      	}
      })
      var ccc =bbb.join() 
      var s = ccc.replace(/,/g,'')
      return s
    },
    getStringList(s){
      // var s ="#紧急##急速##一般#"
      var a = s.replace(/##/g,',')
      var b = a.replace(/#/g,'')
      var c = b.split(',');
      return c
    },
    //判断同一个字符的情况
    is_repeat_str (str) {
		    return str === str.slice(0, 1).repeat(str.length);
		}
  }


}
</script>
<style scoped lang="less">
.form_tid {
  color: #e13b3d; 
  margin-left: 200px;
}
.btn_box,
.btn_box2 {
  width: 100%;
  margin: 50px 40%;
}
.favorites_title {
  width: 100%;
  text-align: center;
  color: #e13b3d;
  font-size: 28px;
  margin-bottom: 24px;
}
.orgInfoTableBody {
  text-align: center !important;
  .el-row {
    margin-bottom: 3px;
    .el-row:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #d8e8f4;
  }
  .bg-purple {
    background: #e5f0fc;
  }
  .bg-purple-light {
    background: #e5f0fc;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .titleFont {
    font-size: 17px;
    text-align: center;
    line-height: 43px;
    font-weight: 600;
  }
  .normalFont {
    // padding-left: 34px;
    font-size: 14px;
    text-align: cneter;
    line-height: 36px;
  }
}
</style>
