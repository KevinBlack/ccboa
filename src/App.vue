<!--
 * @Author: your name
 * @Date: 2020-10-12 09:05:07
 * @LastEditTime: 2020-10-28 16:52:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\App.vue
--> 
<template>
    <router-view/>
</template>
<script>
export default {
  // async beforeMount(){
  //   if(this.$post.getEnvState()){
  //     await this.isNeedToLogin();
  //   }
  // },
  mounted(){
    
  },
  created () {
    if(window.opener && location.hash.indexOf("#/login") != -1){
      localStorage.setItem("fromOtherOrg","true");
    }
    if(!window.uploadSetFileConfig&&localStorage.getItem("st")){
      this.loadConfig();
    }
    if(location.href.indexOf("#/login") == -1&&!(localStorage.getItem('textList'))){
      if(!(localStorage.getItem('ticket')))return
      let params = {
        function: 'unitDifferenceConfig',
        modular: '',
      }
      this.$post
      .postData('unitDifferenceConfig', JSON.stringify(params), this.$businessCode.dbgl)
      .then((res) => {
        if(res.success){
          if(res.data.length!=0){
            localStorage.setItem('textList', JSON.stringify(res.data))
          }
        } 
      })
    }
    this.reloginController();
    this.getBrowserIp();
  },
  methods: {
    isNeedToLogin(){
      if(location.hash.indexOf("#/login") == -1){
        let params = {
          function: 'checkUassLoginStatus',
        }
        this.$post
        .postData('checkUassLoginStatus', JSON.stringify(params), this.$businessCode.xtdl)
        .then((res) => {
          if(res.success == false){
            let routeData = this.$router.resolve({ //
              path: "/login",
            })
            window.location.href=routeData.href
          } 
        }).catch(err => {
            let routeData = this.$router.resolve({ //
              path: "/login",
            })
            window.location.href=routeData.href
        });
      }
      
    },
    loadConfig() {
      var newScript = document.createElement("script");
      newScript.src =  "/ecpweb/page/ccboa/static/uploadConfig/upload.js"
      document.body.appendChild(newScript);
    },
    getBrowserIp () {
      let localIp = '';
      let mockIp = parseInt(Math.random() * 1000) + '.' + parseInt(Math.random() * 1000) + '.' + parseInt(Math.random() * 1000) + '.' + parseInt(Math.random() * 1000)
      // getUserIP(ip=>{
      //     localIp=ip
      //     if(localIp!='') {
      //       localStorage.setItem("ip",localIp)
      //     } else {
      //       }
      // });
      if (!localStorage.getItem("ip")) {
        localStorage.setItem("ip", mockIp)
      }
    },
    reloginController () {
      //用户退出登录时关闭相关子页面；
      let vm = this;
      let changeFlag = localStorage.getItem('stayPages');//切换身份信息
      var closeDraftPage;
      setInterval(() => {
        let token = localStorage.getItem("st");
        if (!token) {
          if (window.opener && location.hash.indexOf("#/login") == -1&&!document.getElementById("IndexFlag")) {
            //清空切换身份标识
            window.close();
          } else {
            if (location.hash.indexOf("#/login") == -1 && location.hash.indexOf("staycopy") == -1) {
              setTimeout(() => {
                if (!token) {
                  window.location.reload();
                }
              }, 1000)
            }
          }
        } else {
          let timestamp = new Date().getTime() + 1500;
          localStorage.setItem("st_timestamp", token + "" + timestamp);
           if(!window.uploadSetFileConfig||(window.uploadSetFileConfig&&!window.uploadSetFileConfig.remotePath)){
            vm.loadConfig();
          }
          
          //关闭正文相关操作页面
          let idStr = location.href.split("id=")&&location.href.split("id=")[1]&&location.href.split("id=")[1].split("&")[0];
          let closeRoutsFlag = (location.href.indexOf("openAndSave_Word")>-1||location.href.indexOf("openAndSave_Wps")>-1)&&location.href.indexOf("zhengWenState=0")==-1&&location.href.indexOf("tanSun")==-1&&location.href.indexOf("noNeedColsepage=0")==-1;
          if(closeRoutsFlag && !(localStorage.getItem("routeIdList") && JSON.parse(localStorage.getItem("routeIdList")).includes(idStr))){//完成并发送 流转时 起草 修改正文页关闭
            if(localStorage.getItem(idStr)){
              if(!closeDraftPage){
                closeDraftPage = setTimeout(()=>{
                  idStr = location.href.split("id=")&&location.href.split("id=")[1]&&location.href.split("id=")[1].split("&")[0];
                  closeRoutsFlag = (location.href.indexOf("openAndSave_Word")>-1||location.href.indexOf("openAndSave_Wps")>-1)&&location.href.indexOf("zhengWenState=0")==-1&&location.href.indexOf("tanSun")==-1&&location.href.indexOf("noNeedColsepage=0")==-1;//zhengWenState：是0不可编辑，不是0可以编辑；noNeedColsepage ：是0不关闭，是1关闭
                  clearTimeout(closeDraftPage);
                  if(closeRoutsFlag && !(localStorage.getItem("routeIdList") && JSON.parse(localStorage.getItem("routeIdList")).includes(idStr))){
                   window.close();
                  }
                },4000);
              }
            }
          };
          //关闭范文套用相关页面
          let closeRoutsFanWenFlag = (location.href.indexOf("/fwSearch")>-1 && location.href.indexOf("wenjianId="+localStorage.getItem("closeFanWenpages"))>-1);
          let closeFanWenTao = (location.href.indexOf("/collectDetail")>-1 && location.href.indexOf("wenjianId="+localStorage.getItem("closeFanWenpages"))>-1&& location.href.indexOf("showT")>-1 && location.href.indexOf("wenjianId="+localStorage.getItem("closeFanWenpages"))>-1);
          if(closeRoutsFanWenFlag&&closeFanWenTao){
            window.close();
          }
        }
      }, 1000);
    }
  }
}
</script>
<style lang="less">
#app {
  height: 100%;
}
.el-popper[x-placement^="bottom"] {
  z-index: 9999 !important ;
}
// 领导活动安排
.topmyActivity,
.MishuActivity,
.myActivity {
  .el-calendar-day {
    position: relative !important;
  }
}
</style>
