/*
 * @Author: your name
 * @Date: 2021-01-08 17:44:13
 * @LastEditTime: 2021-12-14 10:49:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \30ccboa\src\views\sealManage\facilityManage\mixins\faciltyMatainMix.js
 */
export default {
  data () {
    return {
      ccbSrvc: '',
      strJobID: ''
    }
  },
  mounted () {
    this.strJobID = this.getRandomStr()
  },
  methods: {
    /**
     * 维护
     */
    sealMaintain () {
      if (
        (this.formData.endTime) ||
        (this.formData.closeTime1 && this.formData.closeTime2)) {
        this.$message({
          type: 'warning',
          message: '维护已结束！'
        })
        return
      }
      this.$api.sealManage.getUseSealType({ sysConfig: "7" }).then(res => {
        let id = this.$route.query.id
        let params = this.formData.startTime1 === '' ? { id, startTime1: res.newDateYY } : { id, startTime2: res.newDateYY }
        this.$api.sealManage.useSealMaintain
          .updateUseSealMaintain(params).then(updateRes => {
            this.$set(this.formData, params.startTime1 ? 'startTime1' : 'startTime2', res.newDateYY)
            let maintainType = this.formData.maintainType
            if (maintainType === "手工用印" || maintainType === "卸载印章") {
              this.operateSafeDoor()
            } else {
              this.sealMainConfirm()
            }
          })
      })
    },
    // 维护弹窗
    sealMainConfirm () {
      this.$confirm('', '请选择维护进度', {
        type: 'info',
        confirmButtonText: '开始维护',
        cancelButtonText: '维护完成',
        center: true,
        distinguishCancelAndClose: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.beginMaintain()
          } else {
            done()
          }
        }
      }).then(() => {
      }).catch((action) => {
        if (action === 'cancel') {
          console.log("🚀 ~ file: faciltyMatainMix.js ~ line 56 ~ sealMaintain ~ then", '维护完成')
          this.$api.sealManage
            .getUseSealType({ sysConfig: "7" })
            .then(res => {
              let params = this.formData.closeTime1 ?
                { id: this.$route.query.id, endTime: res.newDateYY, closeTime2: res.newDateYY } :
                { id: this.$route.query.id, endTime: res.newDateYY, closeTime1: res.newDateYY }
              this.$api.sealManage.useSealMaintain.updateUseSealMaintain(params)
                .then(updateRes => {
                  this.$set(this.formData, 'endTime', res.newDateYY)
                  if (params.closeTime1) {
                    this.$set(this.formData, 'closeTime1', res.newDateYY)
                    let clTime1 = this.timeFn(this.formData.startTime1, this.formData.closeTime1)
                    this.$set(this.formData, 'clTime1', clTime1)
                  } else {
                    this.$set(this.formData, 'closeTime2', res.newDateYY)
                    let clTime2 = this.timeFn(this.formData.startTime2, this.formData.closeTime2)
                    this.$set(this.formData, 'clTime2', clTime2)
                  }
                })
            });
        } else {
          this.$confirm('确定结束本次维护？', '提示', {
            type: 'warning'
          }).then(() => {
            this.getCloseTime()
          }).catch(() => {
            this.sealMainConfirm()
          })
        }
      })
    },
    // 手工用印、卸载印章维护弹窗
    operateSafeDoor () {
      const h = this.$createElement
      this.$msgbox({
        type: 'info',
        title: '请选择维护进度',
        showCancelButton: false,
        showConfirmButton: false,
        distinguishCancelAndClose: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        center: true,
        message: h('p', null, [
          h('el-button',
            {
              style: { marginTop: '10px' },
              attrs: {
                type: 'primary'
              },
              on: {
                click: () => {
                  this.beginMaintain('enterSeal')
                }
              }
            }, '放入印章'),
          h('el-button',
            {
              style: { marginTop: '10px' },
              attrs: {
                type: 'primary'
              },
              on: {
                click: () => {
                  this.beginMaintain('outterSeal')
                }
              }
            }, '取出印章'),
          h('el-button',
            {
              style: { marginTop: '10px' },
              attrs: {
                type: 'primary'
              },
              on: {
                click: () => {
                  this.beginMaintain('closeSafeDoor')
                }
              }
            }, '关安全门'),
        ]),
      }).catch(() => {
        this.$confirm('是否结束本次维护？', '提示', {
          type: 'warning',
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          callback: (action) => {
            if (action === "confirm") {
              this.getCloseTime()
            } else if (action === "cancel") {
              this.operateSafeDoor()
            //点否
            } else if (action === "close") {
              this.operateSafeDoor()
            }
          }
        })
        // .then(() => {
        //   this.getCloseTime()
        // }).catch(() => {
        //   this.operateSafeDoor()
        // })
      })
    },
    // 维护完成
    finishSealMaintain(){
      console.log("🚀 ~ file: faciltyMatainMix.js ~ line 56 ~ sealMaintain ~ then", '维护完成')
      this.$api.sealManage
        .getUseSealType({ sysConfig: "7" })
        .then(res => {
          console.log(res.newDateYY, '获取时间')
          let params = this.formData.closeTime1 ?
            { id: this.$route.query.id, endTime: res.newDateYY, closeTime2: res.newDateYY } :
            { id: this.$route.query.id, endTime: res.newDateYY, closeTime1: res.newDateYY }
          // this.$api.sealManage.useSealMaintain.updateUseSealMaintain(params)
          //   .then(updateRes => {
              this.$set(this.formData, 'endTime', res.newDateYY)
              // if (params.closeTime1) {
              //   this.$set(this.formData, 'closeTime1', res.newDateYY)
              //   let clTime1 = this.timeFn(this.formData.startTime1, this.formData.closeTime1)
              //   this.$set(this.formData, 'clTime1', clTime1)
              // } else {
              //   this.$set(this.formData, 'closeTime2', res.newDateYY)
              //   let clTime2 = this.timeFn(this.formData.startTime2, this.formData.closeTime2)
              //   this.$set(this.formData, 'clTime2', clTime2)
              // }
            // })
        });
    },
    //开始维护
    beginMaintain (maintainWay = '') {
      console.log("🚀 ~ file: faciltyMatainMix.js ~ line 56 ~ sealMaintain ~ then", '开始维护')
      let title = this.formData.deviceName
      let orgId = this.formData.draftOrganId
      this.$api.sealManage.useSealMaintain.selectItems({ title, type: 'option', orgId})
        .then(async res => {
          let machineType = res.data[0].machineType
          console.log("🚀 ~ file: faciltyMatainMix.js ~ line 68 ~ sealMaintain ~ machineType", machineType)
          let MachineID = res.data[0].machineId
          console.log("🚀 ~ file: faciltyMatainMix.js ~ line 70 ~ sealMaintain ~ MachineID", MachineID)
          let FileReg = res.data[0].machineRegNum
          console.log("🚀 ~ file: faciltyMatainMix.js ~ line 72 ~ sealMaintain ~ FileReg", FileReg)
          let Path= getMachineType() ? 'C:/ccboa/maintain' : "./data/ccboa/maintain/";
          let Password = "123456"

          // 维护类型
          let maintainType = this.formData.maintainType
          console.log("🚀 ~ file: faciltyMatainMix.js ~ line 77 ~ sealMaintain ~ maintainType", maintainType)
          // 注册码（29）
          // let FileReg = "1D00000057B2E4553DEEE89B57B2E4553DEEE89B"
          // let FileReg = ""
          // 银之杰
          // let MachineID = 'SG361101812006'
          // 金鹰
          // let MachineID = '29'
          // 汇金
          // let MachineID = 18110652;

          console.log("🚀 ~ file: faciltyMatainMix.js ~ line 217 ~ beginMaintain ~ this.strJobID", this.strJobID)
          // let sealIdArr = this.sealName2.split(',')
          // let sealPot = []
          // sealIdArr.map(async item => {
          //   let getsealDetailRes = await this.$api.sealManage.getsealDetail({ id: '82d9fb3cf9fc4b62953a34614a7e229d' })
          //   console.log("🚀 ~ file: faciltyMatainMix.js ~ line 192 ~ beginMaintain ~ getsealDetailRes", getsealDetailRes)
          //   sealPot.push(getsealDetailRes.data.storeMark)
          // })
          // let SealPos = sealPot.join('#')
          let SealPos = this.sealName2
          // 维护驱动初始化
          if (maintainType === "安装印章") {
            if (maintainType === '0') {//无存储（旧设备）
              await this.$sealHttp('ccbSrvc', { action: 'SealService', Init: '1', Path, JobID: this.strJobID, Password, FileReg }).then(res => {
                console.log('res', res);
              })
            } else {
              await this.$sealHttp('ccbSrvc', { action: 'SealService', Init: '1', Path, JobID: this.strJobID, Password, FileReg, MachineID }).then(res => {
                console.log('res', res);
              })
            }
          } else {
            if (maintainType === '0') {
              await this.$sealHttp('ccbSrvc', { action: 'SealService', Init: '0', Path, JobID: this.strJobID, Password, FileReg }).then(res => {
                console.log('res', res);
              })
            } else {
              await this.$sealHttp('ccbSrvc', { action: 'SealService', Init: '0', Path, JobID: this.strJobID, Password, FileReg, MachineID }).then(res => {
                console.log('res', res);
              })
            }
          }

          // 根据维护类型不同进行不同维护方式
          if (maintainType === "手工用印" || maintainType === "卸载印章") {
            if (maintainWay === '') {
              // console.log("🚀 ~ file: faciltyMatainMix.js ~ line 220 ~ beginMaintain ~ outterSeal", '开安全门')
              // this.$alert('请在确定后，10秒内打开机器锁!', '提示', {
              //   type: 'info',
              //   confirmButtonText: '确定',
              //   showClose: false
              // }).then(() => {
              //   let lockState
              //   if (machineType === '0') {
              //     lockState = this.ccbSrvc.SealUnlock(strPassword, regText)
              //   } else {
              //     let sealCloseTime = this.formData.sealCloseTime
              //     lockState = this.ccbSrvc.SealUnlock(strPassword, regText, sealCloseTime)
              //   }
              //   console.log("🚀 ~ file: faciltyMatainMix.js ~ line 237 ~ beginMaintain ~ lockState", lockState)
              //   var returnstr = this.ccbSrvc.SealDetectExit();
              //   console.log("🚀 ~ file: faciltyMatainMix.js ~ line 240 ~ beginMaintain ~ returnstr", returnstr)
              //   if (returnstr == 257) {
              //     this.$message({
              //       type: 'error',
              //       message: '机械锁未打开，请联系管理员！'
              //     })
              //     return;
              //   } else {
              //     lockState == 0 ? this.operateSafeDoor() : ''
              //   }
              // }).catch()
              this.operateSafeDoor()
            } else if (maintainWay === 'enterSeal') {
              // TODO 此处也需要获取印章章号信息
              console.log("🚀 ~ file: faciltyMatainMix.js ~ line 220 ~ beginMaintain ~ outterSeal", '放章')
              let closeTime = this.formData.sealCloseTime
              this.$sealHttp('ccbSrvc', { action: 'SealInto', closeTime, SealPos, JobID: this.strJobID }).then(sealIntoRes => {
                let SealInto = sealIntoRes.responsetext
                console.log("🚀 ~ file: faciltyMatainMix.js ~ line 245 ~ beginMaintain ~ SealInto", SealInto)
                //维护完成，生成维护时间
                if (SealInto == 0) {
                  this.$api.sealManage
                    .getUseSealType({ sysConfig: "7" })
                    .then(res => {
                      let params = this.formData.closeTime1 ?
                        { id: this.$route.query.id, endTime: res.newDateYY, closeTime2: res.newDateYY } :
                        { id: this.$route.query.id, endTime: res.newDateYY, closeTime1: res.newDateYY }
                      this.$api.sealManage.useSealMaintain.updateUseSealMaintain(params)
                        .then(updateRes => {
                          this.$set(this.formData, 'endTime', res.newDateYY)
                          if (params.closeTime1) {
                            this.$set(this.formData, 'closeTime1', res.newDateYY)
                            let clTime1 = this.timeFn(this.formData.startTime1, this.formData.closeTime1)
                            this.$set(this.formData, 'clTime1', clTime1)
                          } else {
                            this.$set(this.formData, 'closeTime2', res.newDateYY)
                            let clTime2 = this.timeFn(this.formData.startTime2, this.formData.closeTime2)
                            this.$set(this.formData, 'clTime2', clTime2)
                          }
                          this.$msgbox.close()
                        })
                    });
                } else {
                  this.$message({
                    type: 'error',
                    message: '放入印章失败，请联系管理员！'
                  })
                }
              })

            } else if (maintainWay === 'outterSeal') {
              console.log("🚀 ~ file: faciltyMatainMix.js ~ line 220 ~ beginMaintain ~ outterSeal", '取章')
              // TODO 暂定this.formData.allSealName为 以，隔开的印章名称字符串 
              // this.formData.deviceName  机器名称
              /*
              let allSealNameArr = this.formData.allSealName.split(',')
              let nSealPos = ''
              // 获取印章信息（城开接口）
              let jsonData = {
                Mnplt_TpCd: '03',
                StmpMain_HndOv_Psn_ID: JSON.parse(localStorage.userInfo).humanCode,
                _pagination: {
                  PAGE_JUMP: 1,
                  REC_IN_PAGE: 100
                }
              };
              this.$api.sealManage.sealKeeperChange.querySealList(jsonData).
                then(res => {
                  console.log('印章列表数据：', res);
                  if (res.LIST1) {
                    let sealInfoList = JSON.parse(JSON.stringify(res.LIST1))
                    sealInfoList.map(item => {
                      if (item.Store_Plc_Cd === this.formData.deviceName) {
                        if (allSealNameArr.includes(item.Stmp_Nm)) {
                          nSealPos = nSealPos + item.Bsn_SN + '#'
                        }
                      }
                    })
                    nSealPos = nSealPos.slice(0, -1)
                  }

                })
                .catch((err) => {
                  console.log('印章列表数据查询报错：', err);
                });
                */

              let closeTime = this.formData.sealCloseTime
              // TODO 暂时写死，城开数据返回成功放开
              // RemovecloseType:
              // “1”为卸载印章取出，取出印章后清空印章在设备中的对应信息。
              // “0”为取出印章后，需要放回印章
              let RemovecloseType = maintainType === "卸载印章" ? '1' : '0'
              this.$sealHttp('ccbSrvc', { action: 'SealRemove', closeTime, SealPos, JobID: this.strJobID }).then(res => {
                console.log('res', res);
              })
              // let SealRemove = this.ccbSrvc.SealRemove(sealCloseTime, nSealPos, this.strJobID, RemovecloseType)
              // console.log("🚀 ~ file: faciltyMatainMix.js ~ line 253 ~ beginMaintain ~ SealRemove", SealRemove)
            } else if (maintainWay === 'closeSafeDoor') {
              console.log("🚀 ~ file: faciltyMatainMix.js ~ line 220 ~ beginMaintain ~ outterSeal", '关安全门')
              this.$sealHttp('ccbSrvc', { action: 'SealCloseLock' }).then(sealCloseLockRes => {
                if (sealCloseLockRes.responseText == 0) {
                  this.getCloseTime()
                  this.$msgbox.close()
                } else {
                  this.$message({
                    type: 'error',
                    message: '安全门未正常关闭，请联系管理员！'
                  })
                }
              })
            } else { }
          } else {//故障维修、安装印章
            this.$sealHttp('ccbSrvc', { action: 'SealShowWindow' }).then(res => { })
          }
        })
    },
    // 生成设备关闭时间并保存
    getCloseTime () {
      this.$api.sealManage
        .getUseSealType({ sysConfig: "7" })
        .then(res => {
          let id = this.$route.query.id
          let params = this.formData.startTime2 ? { id, closeTime2: res.newDateYY } : { id, closeTime1: res.newDateYY, endTime: res.newDateYY }
          this.$api.sealManage.useSealMaintain
            .updateUseSealMaintain(params).then(updateRes => {
              this.$set(this.formData, params.closeTime1 ? 'closeTime1' : 'closeTime2', res.newDateYY)
              if (params.closeTime2) {
                this.$set(this.formData, 'endTime', res.newDateYY)
                let clTime2 = this.timeFn(this.formData.startTime2, this.formData.closeTime2)
                this.$set(this.formData, 'clTime2', clTime2)
              } else {
                let clTime1 = this.timeFn(this.formData.startTime1, this.formData.closeTime1)
                this.$set(this.formData, 'clTime1', clTime1)
              }
            })
        });

    },
    // 计算时间差
    timeFn (d1, d2) {//(d2-d1)
      //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
      let dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
      let dateEnd = new Date(d2.replace(/-/g, "/"));//获取当前时间
      let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
      let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
      let leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
      //计算相差分钟数
      let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
      //计算相差秒数
      let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000)
      let diffTime = dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
      let diffTimeIndex = diffTime.match(/[1-9]+(\.[1-9]+)?/).index
      diffTime = diffTime.slice(diffTimeIndex)
      console.log("🚀 ~ file: faciltyMatainMix.js ~ line 189 ~ timeFn ~ diffTime", diffTime)
      return diffTime
    },
  },
}