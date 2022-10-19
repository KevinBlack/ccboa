<!--
 * @Author: wy
 * @Date: 2020-07-17 10:25:58
 * @LastEditTime: 2021-02-26 18:05:50
 * @LastEditors: Please set LastEditors
 * @Description: 工作交流首页
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\index.vue
--> 
<template>
  <div class="workCommunicate">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="新建" name="newProj">
        <v-newProj></v-newProj>
      </el-tab-pane> -->
      <el-tab-pane label="查看" name="view">
        <v-view></v-view>
      </el-tab-pane>
      <el-tab-pane label="查询" name="inquire">
        <v-inquire></v-inquire>
      </el-tab-pane>
    </el-tabs>
    <el-button class="newbutton" type="primary" @click="newProj()">新建</el-button>
    <el-dialog title="请选择拟稿部门" :visible.sync="dialogFormVisible">
      <div class="selectDep">
        <!-- <h4 class="title">选择拟稿部门</h4> -->
        <el-select v-model="unitNames" placeholder="请选择部门"  @change="selectOrg(currUnitId)" :style="{width:'80%',paddingLeft:'40px'}">
          <el-option
            v-for="item in options"
            :key="item.currUnitId"
            :label="item.unitNames"
            :value="item.unitNames"
          ></el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemClick('cancel')">取 消</el-button>
        <el-button type="primary" @click="itemClick('sure')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import vNewProj from './components/newProj'
import vView from './components/view'
import vInquire from './components/inquire'
export default {
  name: 'workCommunicate',
  components: {
    // vNewProj,
    vView,
    vInquire
  },
  data () {
    return {
      activeName: 'view',
      isFir: true,
      isSec: false,
      isThr: false,
      dialogFormVisible:false,
      //选择拟稿部门
      options: [],
      currUnitId: '',
      currUnitName: '',
      unitNames:"",
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
      if (tab.name === 'newProj') {
          this.isFir = true
          this.isSec = false
          this.isThr = false
      } else if (tab.name === 'view') {
          this.isFir = false
          this.isSec = true
          this.isThr = false
      } else if (tab.name === 'inquire') {
          this.isFir = false
          this.isSec = false
          this.isThr = true
      } else {
          return
      }
    },
    //新建
    newProj(){
      this.dialogFormVisible = true
      this.loading()
    },
    //当前部门获取
    selectOrg(org) {
      console.log("121212")
      // this.options.forEach(item => {
      //   if (item.currUnitId == org) {
      //     this.currUnitName = item.currUnitName
      //   }
      // });
      this.currUnitId = org
    },
    itemClick (params) {
      switch (params) {
        case 'sure':
          if (this.currUnitId) {
            this.$router.push({name:'workCommForm',query:{deptId:this.currUnitId,deptName:this.currUnitName}})
            this.dialogFormVisible = false
          } else {
            this.$message({
              message: '请选择拟稿部门',
              type: 'warning'
            });
          }
          break
        case 'cancel':
          this.dialogFormVisible = false
          break
      }
    },
    loading(){   
      this.$api.dailyWork.getWorkDepart({}).then(res => {
        this.options = res.data
        if (this.options) {
          this.currUnitId = this.options[0].currUnitId
          this.currUnitName = this.options[0].currUnitName
          this.unitNames =  this.options[0].unitNames
        }
        if (this.options.length == 1) {
          setTimeout(() => {
            this.$router.push(
              {
                name:'workCommForm',query:{deptId:this.options[0].currUnitId,deptName:this.options[0].currUnitName}
              }
            )
          }, 500);
        }
      })
    }
  },
  mounted () {
    this.activeName = this.$route.query.activeName ? this.$route.query.activeName : 'view'
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.workCommunicate {
  position: relative;
  .newbutton{
    position: absolute;
    right:30px;
    top:2px;
  }
}
</style>