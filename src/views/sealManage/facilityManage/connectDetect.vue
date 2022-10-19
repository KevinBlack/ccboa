<template>
  <div class="content">
    <!--    <div class="btn-list">-->
    <!--      <el-button type="primary" @click="closedata">关闭</el-button>-->
    <!--      <el-button type="primary" @click="editordata">编辑</el-button>-->
    <!--    </div>-->
    <div class="ser-confiog">
      <p class="content_title">用印机连接检测</p>
      <p class="connect_tid">
        1.检测前确认用印机已开启。2.确认用印串口线及相机拍照线已连接用印机及pc机。
      </p>
      <div class="orgInfoTableBody" style="lineheight: 40px">
        <el-row :gutter="5" class="table_title">
          <el-col :span="6">操作名称</el-col>
          <el-col :span="4">操作</el-col>
          <el-col :span="5">说明</el-col>
        </el-row>

        <el-row :gutter="5" style="margin-top: 20px; text-align: center">
          <el-col :span="6">连接检测（请先点第一步）</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="connectCheck">检测</el-button>
          </el-col>
          <el-col :span="5">
            <div ref="connect">{{ connExplain.connect }}</div>
          </el-col>
        </el-row>

        <el-row :gutter="5" style="margin-top: 20px; text-align: center">
          <el-col :span="6">蜂鸣器测试</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="buzzerCheck">测试</el-button>
          </el-col>
          <el-col :span="5">
            <div ref="buzzer">{{ connExplain.buzzer }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="5" style="margin-top: 20px; text-align: center">
          <el-col :span="6">进纸托盘开关测试</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="trayCheck">开关</el-button>
          </el-col>
          <el-col :span="5">
            <div ref="tray">{{ connExplain.tray }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="5" style="margin-top: 20px; text-align: center">
          <el-col :span="6">内置摄像头拍照测试</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="innerCameraCheck">测试</el-button>
          </el-col>
          <el-col :span="5">
            <div ref="innerCamera">{{ connExplain.innerCamera }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="5" style="margin-top: 20px; text-align: center">
          <el-col :span="6">前置摄像头录像测试</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="frontCameraCheck">测试</el-button>
          </el-col>
          <el-col :span="5">
            <div ref="frontCamera">{{ connExplain.frontCamera }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="5" style="margin-top: 20px; text-align: center">
          <el-col :span="6">安全门录像测试</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="safeDoorCheck">测试</el-button>
          </el-col>
          <el-col :span="5">
            <div ref="safeDoor">{{ connExplain.safeDoor }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 
      连接检测--用印设备选择弹窗
    -->
    <el-dialog title="用印设备选择" :visible.sync="selMeachineDialog">
      <el-form :model="selMeachineForm" label-width="160px">
        <el-form-item label="可选设备">
          <el-radio-group v-model="selMeachineForm.meachine">
            <el-radio
              v-for="item in meachineOption"
              :key="item"
              :label="item"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="selMeachineDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSelMeachine">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "serverdeal",
  data () {
    return {
      connExplain: {
        connect: '',
        buzzer: '',
        tray: '',
        innerCamera: '',
        frontCamera: '',
        safeDoor: ''
      },
      // 版本（新版本：1，老版本：0）
      version: '1',
      /**
       * 用印设备选择弹窗
       */
      selMeachineDialog: false,
      selMeachineForm: {
        meachine: ''
      },
      meachineOption: [],
      // 判断是否连接检测成功
      isConnectCheck: 1,
      // 机器注册码
      FileReg: ''
    }
  },
  mounted () {
    this.$sealHttp('ccbctrl', { action: 'SealGetVersion' }).then(res => {
      console.log('res', res);
    })

    /**
     *
     */
    // this.$refs.connect.className = 'successExplain'
    // if (this.ccbCtrl.SealGetVersion) {
    //   // 新版本
    //   this.version = '1'
    // } else {
    //   // 老版本
    //   this.version = '0'
    // }
    // console.log('version', this.version);
  },
  methods: {
    /**
     * @description: 维护驱动初始化
     * @param {type} 
     * @return:
     */
    ccbSrvcInit (initSession) {
      return new Promise((resolve) => {
        
        let Path= getMachineType() ? 'C:/ccboa/useSealManage/photo' : "./data/ccboa/useSealManage/photo/";
        // 文档编号（随机生成）
        let JobID = this.getRandomStr()
        // 默认密码
        let Password = '123456'
        //注册码(暂时写死（金鹰29）)
        // let FileReg = '1D00000057B2E4553DEEE89B57B2E4553DEEE89B'
        let FileReg = this.FileReg 
        // 所选机器ID
        let MachineID = this.selMeachineForm.meachine
        this.$sealHttp('ccbSrvc', { action: 'SealService', Init: '1', Path, JobID, Password, FileReg, MachineID }).then(res => {
          resolve(1)
          if (initSession === 'connect') {
            this.isConnectCheck = res.responsestatus
            return
          }
          // this.handelResult(initSession, res.responsestatus, '初始化成功', '初始化失败')
        })
      })
    },

    /**
     * @description: 统一处理接口返回参数
     * @param checkSession(检测部分)、result(结果)、successTip(成功提示)、failTip(失败提示)、successCode(成功码)
     * @return: 
     */
    handelResult (checkSession, result, successTip = '通过', failTip = '未通过', successCode = 0) {
      console.log('successCode', successCode);
      console.log('result', result);
      if (result == successCode) {
        this.connExplain[checkSession] = successTip
        this.$refs[checkSession].className = 'successExplain'
      } else {
        this.connExplain[checkSession] = failTip
        this.$refs[checkSession].className = 'dangerExplain'
      }
    },

    /**
     * @description: 判断是否进行连接检测
     * @param 
     * @return: 
     */
    isSuccessConnect () {
      if (this.isConnectCheck != 0) {
        this.$message({
          type: 'info',
          message: '请先进行连接检测'
        })
        return 0
      } else {
        return 1
      }
    },

    /**
     * @description: 随机生成一个34位的字母、数字、符号组合字符串
     * @param {type} 
     * @return: 
     */
    getRandomStr () {
      let str = ''
      function charFun () {
        // 97-122  a-z
        // 65-90 A-Z
        // 30-39 0-9
        // 35-38 #$%*
        let n = Math.floor(Math.random() * 62)
        // if (35 < n < 38) {
        //   return String.fromCharCode(n)
        // }
        if (n < 10) {
          return n
        } else if (n < 36) {
          // A-Z
          return String.fromCharCode(n + 55)
        } else {
          // a-z
          return String.fromCharCode(n + 61)
        }
      }
      while (str.length < 34) {
        str += charFun()
      }
      return str
    },

    //老版本连接测试
    /**
        oldVersion () {
          //alert("老设备");
          var flag = false;
          var State = this.ccbSrvc.SealGetState()	 //检测驱动接口是否可以使用	
    
          if (State == 0) {
            State = this.ccbSrvc.SealGetMachineID()
            if (State < 0) {
              flag = true
            }
          } else {
            flag = true
          }
          if (flag) {
            //alert("用印机异常，请检查用印机是否开启，以及连接用印机设备的驱动是否正确安装。")
            I$("ljcs1").innerText = " 用印机异常，请检查用印机是否开启，以及连接用印机设备的驱动是否正确安装。"
            I$("ljcs1").style.color = "red"
    
          } else {
            //alert("用印机成功连接，可正常使用！")
            try {
              //var dorSta = this.ccbSrvc.SealDetect();
              initMark(1);
              //alert("用印机成功连接，可正常使用！");
              var regTxt = f$("RegTxt")[0].value;
              var tt = this.ccbSrvc.SealService(1, "D:\\OrientDoc", "100", "123456", regTxt);
              if (tt == 0) {
                I$("ljcs1").innerText = "用印机成功连接，可正常使用！";
                I$("ljcs1").style.color = "blue";
              } else {
                I$("ljcs1").innerText = "初始化失败！";
                I$("ljcs1").style.color = "red";
    
              }
            }
            catch (e) {
              //alert("请检查印章机驱动版本不正确！");
              I$("ljcs1").innerText = " 用印机注册信息未添加，请在参数维护中添加用印机信息！";
              I$("ljcs1").style.color = "red";
              return false;
            }
          }
        }, */
    //新版本连接测试
    newVersion () {
      this.$sealHttp('ccbSrvc', { action: 'SealAllDevice' }).then(res => {
        let AllMachineID = res.responsetext
        if (AllMachineID === "") {
          this.$message({
            type: 'warning',
            message: '未能获取连接本机的用印设备'
          })
          return
        }
        console.log('AllMachineID', AllMachineID);
        this.meachineOption = AllMachineID.split('#')
        this.$nextTick(() => {
          this.selMeachineDialog = true
        })
      })
    },
    /**
     * 连接检测
     */
    connectCheck () {
      if (this.version === '1') {
        this.newVersion()
      } else {
        // this.oldVersion()
      }
    },
    //确定连接所选设备
    sureSelMeachine () {
      console.log('this.selMeachineForm.meachine', this.selMeachineForm.meachine);
      if (this.selMeachineForm.meachine === '') {
        this.$message({
          type: 'warning',
          message: '请选择检测设备！'
        })
        return
      }
      this.$api.sealManage.useSealDevice
        .registerDetail({ machineId: this.selMeachineForm.meachine })
        .then((res) => {
          this.FileReg = res.data.machineRegNum
          this.ccbSrvcInit('connect').then(connectRes => {
            this.handelResult('connect', this.isConnectCheck, '设备连接成功', '设备检测失败')
            this.selMeachineDialog = false
          })
        });
    },
    /**
     * 蜂鸣器测试
     */
    buzzerCheck () {
      if (this.isSuccessConnect() === 0) return
      this.ccbSrvcInit('buzzer').then(res => {
        this.$sealHttp('ccbSrvc', { action: 'SealBuzzer' }).then(res => {
          let result = res.responsestatus
          this.handelResult('buzzer', result)
        }).catch(error => {
          this.connExplain['buzzer'] = '未通过'
          this.$refs['buzzer'].className = 'dangerExplain'
        })
      })
    },
    /**
     * 进纸托盘开关测试
     */
    trayCheck () {
      if (this.isSuccessConnect() === 0) return
      this.ccbSrvcInit('tray').then(res => {
        this.$sealHttp('ccbSrvc', { action: 'SealOpenDoor' }).then(res => {
          if (res.responsestatus === 0 || 1) {
            this.connExplain['tray'] = '通过'
            this.$refs['tray'].className = 'successExplain'
          } else {
            this.connExplain['tray'] = '未通过'
            this.$refs['tray'].className = 'dangerExplain'
          }
        }).catch(err => {
          this.connExplain['tray'] = '未通过'
          this.$refs['tray'].className = 'dangerExplain'
        })
      })

    },
    /**
     * 内置摄像头拍照测试
     */
    async innerCameraCheck () {
      if (this.isSuccessConnect() === 0) return
      let Password = '123456'
      //注册码(暂时写死（金鹰29）)
      let FileReg = this.FileReg
      // 所选机器ID
      let MachineID = this.selMeachineForm.meachine
      let ctrlInit = await this.$sealHttp('ccbCtrl', { action: 'PrepareSeal', Password, FileReg, MachineID })
      if (ctrlInit.responsestatus == 0) {
        let Path= getMachineType() ? 'C:/ccboa/innerCamera' : "./data/ccboa/innerCamera/";
        let JobID = this.getRandomStr()
        this.$sealHttp('ccbCtrl', { action: 'SealBuiltInPhoto', Path, JobID }).then(res => {
          if (res.responsestatus == 0) {
            this.connExplain['innerCamera'] = '通过'
            this.$refs['innerCamera'].className = 'successExplain'
          } else {
            this.connExplain['innerCamera'] = '未通过'
            this.$refs['innerCamera'].className = 'dangerExplain'
          }
        })
      } else {
        this.connExplain['frontCamera'] = '未通过'
        this.$refs['frontCamera'].className = 'dangerExplain'
      }
    },
    /**
     * 前置摄像头录像测试
     */
    frontCameraCheck () {
      if (this.isSuccessConnect() === 0) return
      /**
       * 用印驱动初始化
       */
      // 默认密码
      let Password = '123456'
      //注册码(暂时写死（金鹰29）)
      let FileReg = this.FileReg
      // 所选机器ID
      let MachineID = this.selMeachineForm.meachine
      this.$sealHttp('ccbCtrl', { action: 'PrepareSeal', Password, FileReg, MachineID }).then(res => {
        if (res.responsestatus == 0) {
          // 初始化成功
          let JobID = this.getRandomStr()
          // 视频接口
          this.$sealHttp('ccbCtrl', { action: 'ImportantVideo', Type: 'top', Switch: 1, JobID }).then(res => {
            if (res.responsestatus == 0) {
              this.connExplain['frontCamera'] = '前置摄像头录像打开成功'
              this.$refs['frontCamera'].className = 'successExplain'
              const h = this.$createElement
              this.frontCameraNotify = this.$notify.info({
                title: '关闭录像',
                duration: 0,
                showClose: false,
                message: h('p', null,
                  [
                    h('p', { style: { fontSize: '16px', lineHeight: '30px', marginTop: '10px' } }, '前置摄像头录像已成功打开,点击"确定"关闭录像'),
                    h('p', { style: { fontSize: '14px', color: '#f56c6c' } }, '注：请勿直接关闭录像弹窗       '),
                    h('el-button',
                      {
                        style: {
                          float: 'right',
                          marginTop: '12px'
                        },
                        attrs: {
                          type: 'primary'
                        },
                        on: {
                          click: this.closeFrontCamera
                        }
                      }, '确定')]
                )
              });
            } else {
              this.connExplain['frontCamera'] = '前置摄像头录像打开失败'
              this.$refs['frontCamera'].className = 'dangerExplain'
            }
          })
        } else {
          this.connExplain['frontCamera'] = '未通过'
          this.$refs['frontCamera'].className = 'dangerExplain'
        }
      })
    },
    // 关闭前置摄像头录像
    closeFrontCamera () {
      let JobID = this.getRandomStr()
      this.$sealHttp('ccbCtrl', { action: 'ImportantVideo', Type: 'top', Switch: 0, JobID }).then(res => {
        if (res.responsestatus == 0) {
          this.connExplain['frontCamera'] = '通过'
          this.$refs['frontCamera'].className = 'successExplain'
        } else {
          this.connExplain['frontCamera'] = '前置摄像头录像关闭失败'
          this.$refs['frontCamera'].className = 'dangerExplain'
        }
      })
      this.frontCameraNotify.close()
    },
    /**
     * 安全门录像测试
     */
    safeDoorCheck () {
      if (this.isSuccessConnect() === 0) return
      /**
       * 用印驱动初始化
       */
      // 默认密码
      let Password = '123456'
      //注册码(暂时写死（金鹰29）)
      // let FileReg = '1D00000057B2E4553DEEE89B57B2E4553DEEE89B'
      let FileReg = this.FileReg
      // 所选机器ID
      let MachineID = this.selMeachineForm.meachine
      this.$sealHttp('ccbCtrl', { action: 'PrepareSeal', Password, FileReg, MachineID }).then(res => {
        if (res.responsestatus == 0) {
          // 初始化成功
          let JobID = this.getRandomStr()
          // 视频接口
          this.$sealHttp('ccbCtrl', { action: 'ImportantVideo', Type: 'left', Switch: 1, JobID }).then(res => {
            if (res.responsestatus == 0) {
              this.connExplain['safeDoor'] = '安全门录像打开成功'
              this.$refs['safeDoor'].className = 'successExplain'
              const h = this.$createElement
              this.safeDoorNotify = this.$notify.info({
                title: '关闭录像',
                duration: 0,
                showClose: false,
                message: h('p', null,
                  [
                    h('p', { style: { fontSize: '16px', lineHeight: '30px', marginTop: '10px' } }, '安全门录像已成功打开,点击"确定"关闭录像'),
                    h('p', { style: { fontSize: '14px', color: '#f56c6c' } }, '注：请勿直接关闭录像弹窗       '),
                    h('el-button',
                      {
                        style: {
                          float: 'right',
                          marginTop: '12px'
                        },
                        attrs: {
                          type: 'primary'
                        },
                        on: {
                          click: this.closeSafeDoor
                        }
                      }, '确定')]
                )
              });
            } else {
              this.connExplain['safeDoor'] = '安全门录像打开失败'
              this.$refs['safeDoor'].className = 'dangerExplain'
            }
          })
        } else {
          this.connExplain['safeDoor'] = '未通过'
          this.$refs['safeDoor'].className = 'dangerExplain'
        }
      })
    },
    // 关闭安全门录像
    closeSafeDoor () {
      let JobID = this.getRandomStr()
      this.$sealHttp('ccbCtrl', { action: 'ImportantVideo', Type: 'left', Switch: 0, JobID }).then(res => {
        if (res.responsestatus == 0) {
          this.connExplain['safeDoor'] = '通过'
          this.$refs['safeDoor'].className = 'successExplain'
        } else {
          this.connExplain['safeDoor'] = '安全门录像关闭失败'
          this.$refs['safeDoor'].className = 'dangerExplain'
        }
      })
      this.safeDoorNotify.close()
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less">
.el-notification {
  width: 425px !important;
}
.content {
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
  .btn-list {
    margin: 16px 0px;
  }
  .ser-config-title {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #d8e8f4;
    font-weight: 800;
  }
  .dangerExplain {
    color: #f56c6c;
  }
  .successExplain {
    color: #67c23a;
  }
}
.connect_tid {
  color: #f56c6c;
  font-size: 14px;
  margin: 0 20px;
  margin-bottom: 20px;
}
.table_title {
  color: cornflowerblue;
  text-align: center;
}
.content_title {
  width: 100%;
  text-align: center;
  font-size: 30px;
  line-height: 75px;
  font-weight: bolder;
  color: #409eff;
  margin-bottom: 20px;
}
</style>
