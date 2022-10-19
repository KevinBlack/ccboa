<!--
 * @Author: wy
 * @Date: 2020-07-17 10:37:44
 * @LastEditTime: 2021-02-26 18:08:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\components\newProj.vue
--> 
<template>
  <div class="newProj">
    <div>
      <el-button type="primary" @click="sure()">确定</el-button>
    </div>
    <div class="selectDep">
      <h4 class="title">选择拟稿部门</h4>
      <el-select v-model="firstUnitId" placeholder="请选择部门"  @change="selectOrg(firstUnitId)" :style="{width:'80%',paddingLeft:'40px'}">
        <el-option
          v-for="item in options"
          :key="item.currUnitId"
          :label="item.firstUnitName"
          :value="item.firstUnitId"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>

export default {
  name: 'newProj',
  components: {
  },
  props: {},
  data () {
    return {
      //选择拟稿部门
      options: [],
      firstUnitId: '',
      firstUnitName: ''
    }
  },
  computed: {},
  methods: {
    //当前部门获取
    selectOrg(org) {
      this.options.forEach(item => {
        if (item.firstUnitId == org) {
          this.firstUnitName = item.firstUnitName
        }
      });
      this.firstUnitId = org
    },
    sure () {
      if (this.firstUnitId) {
        this.$router.push(
          {
            name:'workCommForm',query:{deptId:this.firstUnitId,deptName:this.firstUnitName}
          }
        )
      }else{
        this.$alert('请选择拟稿部门')
      }
    },
    loading(){   
      this.$api.dailyWork.getWorkDepart({}).then(res => {
        this.options = res.data
        if (this.options.length == 1) {
          this.firstUnitId = this.options[0].firstUnitId
          this.firstUnitName = this.options[0].firstUnitName
          if (this.$route.query.nojump) {
            
          }else{
            setTimeout(() => {
              this.$router.push(
                {
                  name:'workCommForm',query:{deptId:this.options[0].firstUnitId,deptName:this.options[0].firstUnitName}
                }
              )
            }, 500);
          }
        }
      })
    }
  },
  activated () {
  },
  mounted () {
    this.loading()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.newProj {
  .selectDep {
    padding: 40px 30px 30px 100px;
    .title {
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 50px;
      color: #3b85f0;
    }
  }
}
</style>

