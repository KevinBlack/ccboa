<template>
  <div class="leftWrapper">
    <div class="wh100" v-show="activeName=='headOffice'">
      <el-row class="h50"></el-row>
      <el-row class="h50"></el-row>
    </div>
    <div class="wh100" v-show="activeName=='mineDept'">
      <el-row class="h33"></el-row>
      <el-row class="h33"></el-row>
      <el-row class="h33"></el-row>
    </div>
  </div>
</template>
<script>
  import {mapGetters,mapActions} from "vuex";
  export default {
    data(){
      return {
        
      }
    },
    computed:{
      ...mapGetters("efficiency",["activeName","baseParams"]),
    },
    methods:{
      initData(){
        //数据请求:TODO
      },
    },
    watch:{
      "baseParams":{
        handler(val){
          this.initData();
        },
        deep:true,
      },
      activeName(val){
        this.initData();
      }
    }
  }
</script>
<style lang="less" scoped>
  .leftWrapper{
    
  }
  .wh100{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  
  .h50{
    height: 50%;
  }
  .h33{
    height: 33%;
  }
  .linearBgc{
    background: linear-gradient(to bottom,rgba(20, 222, 252,0.5),rgba(20, 222, 252,0.1));
  }

</style>