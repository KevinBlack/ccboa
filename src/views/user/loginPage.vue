<template>
  <div class="content" :style="{'height':viewH}">
    <img src="../../assets/images/bglogo.png" class="bgLogo" >
    <!-- <el-button size="mini" round type="primary" @click="getLoginPage">员工渠道跳转</el-button>
    <el-button size="mini" round type="primary" @click="getLoginPageYth">一体化跳转</el-button> -->
  </div>
</template>

<script>
  import http from '@/http/http.js'
  import Des from '@/assets/js/des'
  import { skipPath } from '@/util/ssoPath.js'
  export default {
    name: "loginPage",
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
        ggywgnfj: 'A08462011',
        // 机构
        orgList: [],
        // 人员
        proxyUserInfo: [],
        userInfo: "",
        haveAgent: false,
        haveOrg: false,
        changeOrgInfo: {
          function: "checkswitchCurrentUser",
          humanId: "",
          proxy_HumanId: "",
          isProxier: "",
          proxy_HumanCode: "",
          flag: "1"
        },
        changeAgentInfo: {
          function: "checkswitchCurrentUser",
          humanId: "",
          proxy_HumanId: "",
          isProxier: "",
          proxy_HumanCode: "",
          flag: "0"
        },
      }
    },
    methods: {
      login(typeOld){
        let row = {
          ID: typeOld.ID,
          DATA_TYPE: typeOld.DATA_TYPE
        }
        console.log("跳转参数---->", row)
        let skipPathObj = skipPath(row)
        let todoPath=skipPathObj.completeRouter
        // let routeData = this.$router.resolve(todoPath)
        // console.log(todoPath, skipPathObj, routeData)
        if (typeOld.entrance == '2') {
          todoPath = skipPathObj.doneDetailRouter//办结
        } else if (typeOld.entrance == '3') {
          todoPath=skipPathObj.completeRouter
        } else if (typeOld.entrance == '4') {
          todoPath = skipPathObj.unreadDetailRouter
        } else if (typeOld.entrance == '5') {
          todoPath = skipPathObj.readDetailRouter
        } else {
          todoPath=skipPathObj.todoDetailRouter
        }
        this.$router.push(todoPath)
        // this.$router.push();
        // window.open(routeData.href, '_blank')
      },
      // 切换机构
      handleChangeOrg(typeOld) {
        let urlParams = {}; //跳转参数
        let urlPath = location.hash;
        let urlRout = "";
        let queryInfo = {
          path: "",
          query: {}
        }; //跳转配置
        this.changeOrgInfo.proxy_HumanId = typeOld.humanId;
        this.changeOrgInfo.proxy_HumanCode = typeOld.humanCode;
        this.changeOrgInfo.isProxier = 1;
        this.changeOrgInfo.humanId = this.userInfo.humanId;
        this.$post
          .postData(
            "checkswitchCurrentUser",
            JSON.stringify(this.changeOrgInfo),
            this.$businessCode.xtdl
          )
          .then(res => {
            if (res && res.success) {
              if(res.status == 1) {
                this.$confirm(res.message, "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                .then(() => {
                  this.$post
                  .postData(
                    "checkswitchCurrentUser",
                    JSON.stringify(Object.assign(this.changeOrgInfo, {status: 1})),
                    this.$businessCode.xtdl
                  )
                  .then(res => {
                    if (res && res.success) {
                      this.handleDeleteItem();
                      localStorage.setItem("routerList", JSON.stringify(res.tcRightTree));
                      localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
                      localStorage.setItem("unitInfo", JSON.stringify(res.unitInfo));
                      localStorage.setItem(
                        "tcHumanRole",
                        JSON.stringify(res.tcHumanRole)
                      );
                      localStorage.setItem("proxyUser", JSON.stringify(res.proxyUser));
                      this.userInfo =
                        (localStorage.getItem("userInfo") &&
                          JSON.parse(localStorage.getItem("userInfo"))) ||
                        "";
                      localStorage.setItem("stayPages", "ufo");
                      sessionStorage.setItem("stayPages", "ufo");
                      this.handleAdjust();
                      if (typeOld.proxy_HumanId !== 'null') {
                        // 登陆成功后切换代理
                        let val = {
                          humanId: typeOld.proxy_HumanId,
                          humanCode: typeOld.proxy_HumanCode,
                        }
                        this.handleChangeAgent(typeOld)
                      } else {
                        // 直接跳转
                        this.login(typeOld)
                      }
                    }
                  })
                })
                .catch(() => {
                  return;
                });
              } else {
                this.handleDeleteItem();
                localStorage.setItem("routerList", JSON.stringify(res.tcRightTree));
                localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
                localStorage.setItem("unitInfo", JSON.stringify(res.unitInfo));
                localStorage.setItem(
                  "tcHumanRole",
                  JSON.stringify(res.tcHumanRole)
                );
                localStorage.setItem("proxyUser", JSON.stringify(res.proxyUser));
                this.userInfo =
                  (localStorage.getItem("userInfo") &&
                    JSON.parse(localStorage.getItem("userInfo"))) ||
                  "";
                localStorage.setItem("stayPages", "ufo");
                sessionStorage.setItem("stayPages", "ufo");
                this.handleAdjust();
                if (typeOld.proxy_HumanId !== 'null') {
                  // 登陆成功后切换代理
                  let val = {
                    humanId: typeOld.proxy_HumanId,
                    humanCode: typeOld.proxy_HumanCode,
                  }
                  this.handleChangeAgent(typeOld)
                } else {
                  // 直接跳转
                  this.login(typeOld)
                }
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 500,
              });
              return;
            }
          });
        this.$forceUpdate();
      },
      // 切换代理
      handleChangeAgent(typeOld) {
        let urlParams = {}; //跳转参数
        let urlPath = location.hash;
        let urlRout = "";
        let queryInfo = {
          path: "",
          query: {}
        }; //跳转配置
        console.log('获取切换代理的传参---->', this.changeAgentInfo)
        // isProxier:1
        this.changeAgentInfo.proxy_HumanId = typeOld.proxy_HumanId;
        this.changeAgentInfo.proxy_HumanCode = typeOld.proxy_HumanCode;
        this.changeAgentInfo.isProxier = 2;
        this.changeAgentInfo.humanId = this.userInfo.humanId;
        this.$post
          .postData(
            "checkswitchCurrentUser",
            JSON.stringify(this.changeAgentInfo),
            this.$businessCode.xtdl
          )
          .then(res => {
            if (res && res.success) {
              if(res.status == 1) {
                this.$confirm(res.message, "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                .then(() => {
                  this.$post
                    .postData(
                      "checkswitchCurrentUser",
                      JSON.stringify(Object.assign(this.changeAgentInfo, {status: 1})),
                      this.$businessCode.xtdl
                    )
                    .then(res => {
                      if (res && res.success) {
                        this.handleDeleteItem();
                        if(localStorage.getItem("textList")){
                          localStorage.removeItem("routerList");
                        }
                        localStorage.setItem("routerList", JSON.stringify(res.tcRightTree));
                        localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
                        localStorage.setItem("unitInfo", JSON.stringify(res.unitInfo));
                        localStorage.setItem(
                          "tcHumanRole",
                          JSON.stringify(res.tcHumanRole)
                        );
                        localStorage.setItem("proxyUser", JSON.stringify(res.proxyUser));
                        localStorage.setItem("stayPages", "ufo");
                        sessionStorage.clear();
                        sessionStorage.setItem("stayPages", "ufo");
                        this.handleAdjust();
                        urlPath.split("?").map((url, n) => {
                          let urlJson = url.split("=");
                          if (n > 0) {
                            queryInfo.query[urlJson[0]] = urlJson[1];
                          } else {
                            queryInfo.query["staycopy"] = localStorage.getItem("st");
                          }
                        });
                        urlParams["staycopy"] = localStorage.getItem("st");
                        localStorage.setItem("st", "");
                        urlRout = urlPath.split("?")[0].split("#")[1];
                        queryInfo.path = urlRout;
                        this.$router.replace(queryInfo);
                        setTimeout(() => {
                          // 切换代理后跳转详情
                          this.login(typeOld)
                        }, 1000);
                      }
                    })
                })
                .catch(() => {
                  return;
                });
              } else {
                this.handleDeleteItem();
                localStorage.setItem("routerList", JSON.stringify(res.tcRightTree));
                localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
                localStorage.setItem("unitInfo", JSON.stringify(res.unitInfo));
                localStorage.setItem(
                  "tcHumanRole",
                  JSON.stringify(res.tcHumanRole)
                );
                localStorage.setItem("proxyUser", JSON.stringify(res.proxyUser));
                localStorage.setItem("stayPages", "ufo");
                sessionStorage.setItem("stayPages", "ufo");
                this.handleAdjust();
                // urlPath.split("?").map((url, n) => {
                //   let urlJson = url.split("=");
                //   if (n > 0) {
                //     queryInfo.query[urlJson[0]] = urlJson[1];
                //   } else {
                //     queryInfo.query["staycopy"] = localStorage.getItem("st");
                //   }
                // });
                // urlParams["staycopy"] = localStorage.getItem("st");
                // localStorage.setItem("st", "");
                // urlRout = urlPath.split("?")[0].split("#")[1];
                // queryInfo.path = urlRout;
                // this.$router.replace(queryInfo);
                // alert('开始跳转页面---切换代理[res.status!==1]')
                setTimeout(() => {
                  this.login(typeOld)
                }, 1000);
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 500,
              });
              return;
            }
          });
      },
      // 删除信息
      handleDeleteItem() {
        localStorage.removeItem("routerList");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("unitInfo");
        localStorage.removeItem("tcHumanRole");
        localStorage.removeItem("proxyUser");
      },
      // 机构/代理调整
      handleAdjust() {
        this.userInfo =
          (localStorage.getItem("userInfo") &&
            JSON.parse(localStorage.getItem("userInfo"))) ||
          "";
        this.proxyUserInfo =
          (localStorage.getItem("proxyUser") &&
            JSON.parse(localStorage.getItem("proxyUser"))) ||
          [];
        let aa = [];
        aa =
          (localStorage.getItem("unitInfo") &&
            JSON.parse(localStorage.getItem("unitInfo"))) ||
          [];
        let bb = this.userInfo.unitId;
        console.log(aa, bb);
        // for (let i = 0; i < aa.length; i++) {
        //   if(bb.unitId != aa[i].unitId) {
        //     this.orgList.push(aa[i])
        //   }
        // }
        let cc = aa.filter((item, index, aa) => {
          console.log(item.unitId);
          return item.unitId != bb;
        });
        console.log(cc);
        if (this.orgList.length != 0) {
          this.orgList.forEach(element => {
            if (element.currUnitName === this.userInfo.currUnitName) {
              this.orgList.splice(this.orgList.indexOf(element), 1);
            }
          });
        }
        let transObj = {};
        cc.map((item, index) => {
          if (!transObj[item.unitId]) {
            this.orgList.push(item);
            transObj[item.unitId] = true;
          }
        });
        console.log(this.orgList);
        this.haveOrg = this.orgList.length > 0 ? true : false;
        this.haveAgent = this.proxyUserInfo.length >= 1 ? true : false;
      },
      async getLoginPageYth(){
        const query = this.$route.query;
        const st = 'st' in query ? query.st : '';
        this.loginForm.ip=localStorage.getItem("ip")||'127.0.0.1';
        localStorage.setItem("ip",this.loginForm.ip);
        localStorage.setItem("st",st);
        let res = null;
        if ('ticket' in query) {
          const ticket = query.ticket;
          let transForm = {
            function: 'xiaominPCLogin',
            ticket: ticket
          }
          res = await this.$post.postData('xiaominPCLogin', JSON.stringify(transForm), 'A0846C055')
        } else {
          let transForm = {
            function: 'getUassInfoBySt',
            st: st,
            ip: this.loginForm.ip
          };
          res = await this.$post.postData('getUassInfoBySt', JSON.stringify(transForm), 'A0846C055')
        }
        console.log("'ticket' in query", 'ticket' in query)
        console.log(res)
        if (res.success) {
          localStorage.setItem('st', res.st)
          localStorage.setItem('st_token', res.st_token)
          localStorage.setItem('routerList', JSON.stringify(res.tcRightTree))
          localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
          localStorage.setItem('unitInfo', JSON.stringify(res.unitInfo))
          localStorage.setItem('tcHumanRole', JSON.stringify(res.tcHumanRole))
          localStorage.setItem('ticket', res.ticket);
          localStorage.setItem('LoginName', this.loginForm.LoginName)
          let typeOld = this.$route.query  // 单点登录返回路由参数
            this.userInfo =
              (localStorage.getItem("userInfo") &&
                JSON.parse(localStorage.getItem("userInfo"))) ||
              "";
              console.log(this.userInfo)
            // 判断当前humanId是否和路由传入的humanId相同
            if (typeOld.humanId == this.userInfo.humanId || typeOld.humanId == "" || typeOld.humanId == 'null') {
              // humanId相同且是综合用户，切换代理
              if (typeOld.proxy_HumanId !== 'null') {
                // 登陆成功后切换代理
                let val = {
                  humanId: typeOld.proxy_HumanId,
                  humanCode: typeOld.proxy_HumanCode,
                }
                this.handleChangeAgent(typeOld)
              } else {
                // 直接跳转
                this.login(typeOld)
              }
            } else {
              this.handleChangeOrg(typeOld)
            }
        } else {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: res.message,
            duration: 1500,
          });
        }

      },
      getLoginPage(){
        this.loginForm.ip=localStorage.getItem("ip")||'127.0.0.1';
        localStorage.setItem("ip",this.loginForm.ip);
        localStorage.setItem("st",this.$route.query.ST);
        let transForm = {
          function: 'getUassInfoBySt',
          st: this.$route.query.ST,
          ip: this.loginForm.ip
        };
        this.$post.postData('getUassInfoBySt', JSON.stringify(transForm), 'A0846C055').then((res) => {
              console.log(res,'获取接口返回值')
              if (res.success) {
                  localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                  localStorage.setItem('unitInfo', JSON.stringify(res.unitInfo))
                  localStorage.setItem('tcHumanRole', JSON.stringify(res.tcHumanRole))
                  // this.nextPage();
            // let typeOld = this.$route.query.type.replace('&','?')
            let typeOld = this.$route.query.type.replace('$','?').replace(/#/g,'&')
            console.log(typeOld)
            this.$intent.goNewPage(this, {
              path: "/" + typeOld,
              // query: {
              //   id: this.$route.query.id
              // }
            });
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
      st_timestamp(token){
        //token添加时间戳；
        let time = new Date().getTime() + 1500;
        localStorage.setItem("st_timestamp",token+""+time);
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
          console.log(transForm,'登录的信息transForm---------')
          this.$post.postData('checkUassLogin', JSON.stringify(transForm), this.$businessCode.xtdl).then((res) => {
          console.log(res,'checkUassLogin接口返回值---------')
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
                    console.log(res,'checkUassLogin接口返回值---------(status:1)')
                    if (res.success) {
                      localStorage.setItem('st', res.st)
                      localStorage.setItem('st_token', res.st_token)
                      localStorage.setItem('routerList', JSON.stringify(res.tcRightTree))
                      localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                      localStorage.setItem('unitInfo', JSON.stringify(res.unitInfo))
                      localStorage.setItem('tcHumanRole', JSON.stringify(res.tcHumanRole))
                      this.st_timestamp(res.st);
                      if (res.proxyUser.length >= 1) {
                        localStorage.setItem('proxyUser', JSON.stringify(res.proxyUser))
                      }
                      if (this.$route.query.redirect) {
                        console.log(this.$route.query.redirect)
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
                console.log(this.$route.query.token,'获取token')
                localStorage.setItem('st', res.st)
                localStorage.setItem('st_token', this.$route.query.token)
                localStorage.setItem('routerList', JSON.stringify(res.tcRightTree))
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                localStorage.setItem('unitInfo', JSON.stringify(res.unitInfo))
                localStorage.setItem('tcHumanRole', JSON.stringify(res.tcHumanRole))
                this.st_timestamp(res.st);
                if (res.proxyUser.length >= 1) {
                  localStorage.setItem('proxyUser', JSON.stringify(res.proxyUser))
                }
                if (this.$route.query.redirect) {
                        console.log(this.$route.query.redirect)
                  this.$router.push(this.$route.query.redirect)
                } else {
                  // this.$router.push('/index')
                  console.log(this.$route.query.path)
                  this.$router.push(this.$route.query.path)
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
      },
    },
    created () {
      this.viewH = document.body.clientHeight+'px';
      console.log(this.$route.query,'获取路由参数st、path')
      localStorage.clear();
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
        this.getLoginPageYth()
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .content {
    height: 100%;
    width: 100%;
    background: url("../../assets/images/bg.jpg") 0 no-repeat;
    background-size: auto;
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
