<template>
    <div>
        <h2 class="system_t"><i class="el-icon-arrow-left"></i>管理员查看</h2>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><router-link to="/systemview/fw">发文</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/systemview/fwhq">发文会签</router-link></el-menu-item>
            <el-menu-item index="3"><router-link to="/systemview/qzhs">强制回收</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/systemview/cfwsp">重发文审批</router-link></el-menu-item>
            <el-menu-item index="5"><router-link to="/systemview/cfhq">重发会签</router-link></el-menu-item>
            <el-menu-item index="6"><router-link to="/systemview/systw">退文</router-link></el-menu-item>
            <el-menu-item index="7"><router-link to="/systemview/fwgg">发文公告</router-link></el-menu-item>
        </el-menu>
        <div class="pad_20 bg_f">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>

export default {
  name: "systemView",
  data() {
    return {
        activeIndex:'1'
    }
  },
  methods: {
   handleSelect(){

   }
  },
  created() {
  },
  watch:{
      $route:{
        handler(newr){
          let path = newr.path;
          switch (path){
            case '/systemview/sysfw':
                this.activeIndex = '1'
                break;
            case '/systemview/fwhq':
                this.activeIndex = '2'
                break;
            case '/systemview/qzhs':
                this.activeIndex = '3'
                break;
            case '/systemview/cfwsp':
                this.activeIndex = '4'
                break;
            case '/systemview/cfhq':
                this.activeIndex = '5'
                break;
            case '/systemview/systw':
                this.activeIndex = '6'
                break;
            case '/systemview/fwgg':
                this.activeIndex = '7'
                break;
            default:
                this.activeIndex = '1'
          }
        },
        immediate:true
      }
  }
}
</script>

<style lang="less" scoped>
    .system_t{
        width: 100%;
        height: 90px;
        display: flex;
        align-items: center;
        background: #3b85ef;
        font-size: 20px;
        padding: 0 10px;
        color:#fff;
    }
    .pad_20{
        padding:0 20px;
    }
    .bg_f{
        background: #fff;
    }
    /deep/ .el-badge__content{
      border:0;
      position: absolute;
      top:-14px;
    }
    
</style>
