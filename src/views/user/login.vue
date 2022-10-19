<template>
  <div class="content" :style="{'height':viewH}">
    <img src="../../assets/images/bglogo.png" class="bgLogo" > 
    <div class="login">
      <img src="../../assets/images/dl_03.png" width="100%" style="margin-bottom: 20px;" />
      <el-form>
        <el-form-item>
          <el-input
            placeholder="用户名"
            suffix-icon="el-icon-user"
            v-model="loginForm.LoginName"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item> 
        <el-form-item>
          <el-input
            placeholder="密 码"
            show-password
            suffix-icon="el-icon-key"
            v-model="loginForm.Voucher"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" style="width: 140px;margin-right: 10px;">登 录</el-button>
          <el-button type="primary" @click="handleReset" style="width: 140px;">重 置</el-button>
        </el-form-item>
        <el-form-item>
					<div class="oa2bkg"  @click="handleLoginOA2" title="点击启动麒麟云桌面；如果没有反应，请先检查是否安装云桌面程序。"> 
					</div>
					<p style="margin-left: 121px;line-height: 15px;">商密OA</p>
				</el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import http from '@/http/http.js'
  import Des from '@/assets/js/des'
  export default {
    name: "login",
    data () {
      return {
        viewH:'',
        loginForm: {
          function: 'checkUassLogin',
          LoginName: '',
          Voucher: '',
        },
        xmlData: '',
        haveProxy: false,
        isProxier: 0,
        poxyId: '',
        ggywgnfj: 'A08462011'
      }
    },
    methods: {
      st_timestamp(token){
        //token添加时间戳；
        let time = new Date().getTime() + 1500;
        localStorage.setItem("st_timestamp",token+""+time);
      },

      handleLoginOA2(){
        var ws = new WebSocket('ws://localhost:4213');
        ws.addEventListener('error',()=>{
           window.location.href = 'kylincloudclient://username=&passwd=&token=&id=&url='
          })
        ws.onopen = (event)=>{
          ws.send=(event)=>{
          }
          ws.onmessage=(event)=>{
          }
          ws.onclose=(event)=>{
            //isWebSocketSuccess = true;
            this.$message({
              type: "error",
              message: "已启动客户端，请勿重复打开客户端",
              duration: 1000
            })
          }
          ws.onerror=()=>{
          }
          ws.close();
        }
      },
      handleLogin () {
          this.loginForm.ip=localStorage.getItem("ip")||'127.0.0.1';
          localStorage.setItem("ip",this.loginForm.ip);
          let transForm = {
            function: 'checkUassLogin',
            LoginName: this.loginForm.LoginName,
            Voucher: '',
            ip:this.loginForm.ip
          };
          let aa = this.loginForm.Voucher;
          transForm.Voucher = this.getDesPwd(aa);
          localStorage.setItem('Voucher', transForm.Voucher)
          this.$post.postData('checkUassLogin', JSON.stringify(transForm), this.$businessCode.xtdl).then((res) => {
            if (res.success) {
              localStorage.setItem('firstLogin', 1)
              console.log('status判断前')
              if(res.status == 1) {
                console.log('status进判断')
                this.$confirm(res.message, "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                .then(() => {
                  this.$post.postData('checkUassLogin', JSON.stringify(Object.assign(transForm, {status: 1})), this.$businessCode.xtdl).then((res) => {
                    if (res.success) {
                      localStorage.setItem('st', res.st)
                      localStorage.setItem('st_token', res.st_token)
                      localStorage.setItem('routerList', JSON.stringify(res.tcRightTree))
                      localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                      localStorage.setItem('unitInfo', JSON.stringify(res.unitInfo))
                      localStorage.setItem('tcHumanRole', JSON.stringify(res.tcHumanRole))
                      localStorage.setItem('ticket', res.ticket);
                      localStorage.setItem('LoginName', this.loginForm.LoginName)
                      this.st_timestamp(res.st);
                      if (res.proxyUser.length >= 1) {
                        localStorage.setItem('proxyUser', JSON.stringify(res.proxyUser))
                      }
                      if (this.$route.query.redirect) {
                        this.$router.push(this.$route.query.redirect)
                      } else {
                        this.$router.push('/index')
                      }
                      document.removeEventListener('keydown', this.enterEvent, false)
                    } else {
                      this.$message({
                        type: "error",
                        showClose: true,
                        offset: 400,
                        message: res.message,
                        duration: 1500,
                      });
                      this.loginForm.Voucher = ''
                    }
                  })
                })
                .catch(() => {
                  return;
                });
              } else {
                localStorage.setItem('st', res.st)
                localStorage.setItem('st_token', res.st_token)
                localStorage.setItem('routerList', JSON.stringify(res.tcRightTree))
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                localStorage.setItem('unitInfo', JSON.stringify(res.unitInfo))
                localStorage.setItem('tcHumanRole', JSON.stringify(res.tcHumanRole))
                localStorage.setItem('ticket', res.ticket);
                localStorage.setItem('LoginName', this.loginForm.LoginName)
                this.st_timestamp(res.st);
                if (res.proxyUser.length >= 1) {
                  localStorage.setItem('proxyUser', JSON.stringify(res.proxyUser))
                }
                if (this.$route.query.redirect) {
                  this.$router.push(this.$route.query.redirect)
                } else {
                  this.$router.push('/index')
                }
                document.removeEventListener('keydown', this.enterEvent, false)
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 1500,
              });
              this.loginForm.Voucher = ''
            }
          }).catch(err => {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: err.message,
              duration: 1500,
            });
          })
      },
      handleReset() {
        this.loginForm = {
          function: 'checkUassLogin',
          LoginName: '',
          Voucher: '',
        }
      },
      getDesPwd: function (pwd) { //加密方法
        let desPwd = '';
        let key1 = "www";
        let key2 = "css";
        let key3 = "com";
        desPwd = Des.strEnc(pwd, key1, key2, key3);
        return desPwd;
      }
    },
    created () {
      // localStorage.clear();
      let transLoginName = localStorage.getItem("LoginName")
      this.loginForm.LoginName = transLoginName===null?"":transLoginName;
      window.uploadSetFileConfig = {};//清空配置路径
      this.viewH = document.body.clientHeight+'px';
      if(!localStorage.getItem("ip")) {
        let localIp='';
        let mockIp = parseInt(Math.random()*1000) + '.' + parseInt(Math.random()*1000) + '.' + parseInt(Math.random()*1000) + '.' + parseInt(Math.random()*1000)
        // getUserIP(ip=>{
        //   if(localIp!='') {
        //     localStorage.setItem("ip",localIp)
        //   } else {
        //     }
        // });
        localStorage.setItem("ip", mockIp)
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .oa2bkg{
    background-image: url(../../assets/images/qilinyun.png) !important;
    background-repeat: no-repeat !important;
    background-size: 90% !important;
    width: 89px;
    height: 83px;
    margin: 20px 0 0 114px;
	}
	.oa2bkg:hover{
		transform: scale(1.1);
		cursor: pointer;
	}
  .content {
    width: 100%;
    background: url("../../assets/images/bg1.jpg") center center no-repeat;
    background-size: cover;
    position: relative;
    .login {
      width: 300px;
      position: absolute;
      top: 20%;
      right: 16%;
    }
    .bgLogo{
      position: absolute;
      right: 5%;
      top: 2.5%;
    }
  }
</style>
