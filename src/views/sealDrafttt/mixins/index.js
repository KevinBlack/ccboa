/*
 * @Author: wy
 * @Date: 2020-11-12 14:20:18
 * @LastEditTime: 2022-01-07 10:36:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\sealManage\mixins\index.js
 */
export default {
  data() {
    return {
      sealLoading: false,
      selNum: 0,
      successNum: 0, //上传进度
      failNum: 0, //上传失败的数量
      // 用印状态
      state: '',
      // 维护驱动
      ccbSrvc: '',
      // 用印驱动
      ccbCtrl: '',
      // 文件操作对象
      fso: '',
      // 唯一标识
      //JobID
      randomStr1: '',
      //带批次的JobID
      randomStr: '',
      // 用印中loading
      loading: null,
      // 城开接口返回数据
      sealInfoList: []
      /**
       * 页面数据
       */
    }
  },
  mounted() {},
  methods: {
    /**
     * @description: 随机生成一个34位的字母、数字、符号组合字符串
     * @param {type}
     * @return:
     */
    getRandomStr() {
      let str = ''

      function charFun() {
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
    /**
     * @description: 用印驱动初始化
     * @param {type}
     * @return:
     */
    ccbCtrlInit(machineId) {
      return new Promise((resolve, reject) => {
        let response;
        this.$sealHttp('ccbSrvc', {
          action: 'SealAllDevice'
        }).then(res => {
          // console.log(this.useSealIng)
          // this.useSealIng = true
          let AllMachineID = res.responsetext
          if (AllMachineID === "") {
            this.$message({
              type: 'warnin请连接印控g',
              message: '未能获取连接本机的用印设备'
            })
            // this.useSealIng = false
            return·
          }
          console.log('machineId', machineId);
          let meachineOption = AllMachineID.split('#')
          console.log(meachineOption)
          console.log('meachineOption.indexOf(machineId)', meachineOption.indexOf(machineId));
          if (meachineOption.indexOf(machineId) == -1) {
            this.$message({
              type: 'warning',
              message: '请连接印章相应设备进行用印！'
            })
            // this.useSealIng = false
            return
          }
          this.$api.sealManage.useSealDevice.registerDetail({
              machineId
            })
            .then(res => {
              // 默认密码
              let Password = '123456'
              let MachineID = machineId
              // console.log("🚀 ~ file: index.js ~ line 96 ~ ccbCtrlInit ~ machineId", machineId)
              let FileReg = res.data.machineRegNum
              // console.log("🚀 ~ file: index.js ~ line 98 ~ ccbCtrlInit ~ fileReg", fileReg)
              //注册码(暂时写死（金鹰29）)
              // let FileReg = '1D00000057B2E4553DEEE89B57B2E4553DEEE89B'
              // let FileReg = ''
              // 所选机器ID
              //银之杰
              // let MachineID = 'SG361101812006'
              //汇金
              // let MachineID = '18110593'
              //金鹰
              // let MachineID = '29'
              this.$sealHttp('ccbCtrl', {
                action: 'PrepareSeal',
                Password,
                FileReg,
                MachineID
              }).then(sealRes => {
                if (sealRes.responsestatus != 0) {
                  this.$message({
                    type: 'warning',
                    message: '印控机初始化失败'
                  })
                  // this.useSealIng = false
                } else {
                  response = '1'
                  resolve(response)
                }
              })
            })
        }).catch((err) => {
          // this.useSealIng = false
        });
      })
    },
    /**
     * @description: 获取印章RFID标签
     * @param {type}
     * @return:
     */
    getRFID(sealPosition = 0) {
      // 银之杰RFID
      // YZJG00202952_1#YZJG00202947_2#YZJG00202948_3#YZJG00202949_4#YZJG00202944_5#YZJG00202945
      // 金鹰29RFID
      // 210488ACF10488_1#488BA7A0488C1_2#88BA350488BA81_3#34416AC0004_4
      return new Promise((resolve, reject) => {
        this.$sealHttp('ccbCtrl', {
          action: 'SealplaceInfo'
        }).then(sealRes => {
          let allRFID = sealRes.responsetext
          console.log('allRFID', allRFID);
          if (sealPosition === 0) return allRFID
          let allRFIDArr = allRFID.split('#')
          let RFIDArr1 = ''
          console.log(allRFIDArr)
          let allLength = allRFIDArr.length
          console.log(allLength, '获取长度')
          console.log(allRFIDArr, '获取数组删除前')
          if (allRFIDArr[allLength - 1] == '') {
            allRFIDArr.pop()
          }
          console.log(allRFIDArr, '获取数组删除后')
          allRFIDArr.map(item => {
            console.log(item.split('_')[1])
            if (item.split('_')[1] == sealPosition) {
              RFIDArr1 = item.split('_')[0]
            }
            return RFIDArr1
          })
          resolve(RFIDArr1)
        })
      })
    },
    async getLastImageIndex(){
      let successSealInfo = await this.$sealHttp('ccbCtrl', {
        action: 'SealGetLastSealInfo'
      })
      console.log(successSealInfo, '获取到的上次用印信息')
      console.log(this.tableSealStateData, '获取用印信息详情列表')
      let sealGetImageListRes = await this.$sealHttp('ccbCtrl', {
        action: 'SealGetImageList',
        Path: Imgpath
      })
      console.log(sealGetImageListRes, '获取到的上次用印图片信息')
    },
    async failUimg(imgOrg) {
      await this.$api.sealManage.uploadImg(imgOrg)
     .then(res => {
       console.log(res)
     })
    },
    /**
     * @description: 保存用印信息(读取图片并计数) 
     * @param {type}
     * @return:
     */
    async saveSealInfo(Imgpath) {
      console.log('saveSealInfo,saveSealInfosaveSealInfo', Imgpath);
      let successSealInfo = await this.$sealHttp('ccbCtrl', {
        action: 'SealGetLastSealInfo'
      })
      let responsetextList = successSealInfo.responsetext.split(',')
      let resJobID = responsetextList[0].split('_')[0]
      console.log('this.tableSealStateData', this.tableSealStateData);
      let invalidSealInfo = await this.$sealHttp('ccbCtrl', {
        action: 'SealGetTrashSealInfo',
        JobID: responsetextList[0]
      })
      let realJobID = this.tableSealStateData[0].id.split('_')[0]
      if (resJobID === realJobID) {
        let num = ''
        let yzName = ''
        this.tableSealStateData.map(item => {
          if (item.id === responsetextList[0]) {
            this.$set(item, 'successCount', item.successCount + parseInt(responsetextList[2])) // 已用印数
            this.$set(item, 'cancelCount', item.cancelCount + parseInt(invalidSealInfo.responsestatus)) //作废数
            num = item.assentName
            yzName = item.sealName
          }
        })
        console.log('this.tableSealStateData', this.tableSealStateData);
        let saveMethods = this.markOrderType === 'introduction' ? 'updateIntroduction' : this.markOrderType === 'document' ? 'updateDocument' : 'ruleSave'
        if (this.markOrderType === 'department') {
          saveMethods = 'updateDepartment'
        }
        this.$api.sealManage[saveMethods]({
          // rtfAssetList: this.form.rtfAssetList,
          yyType: this.tableSealStateData,
          id: this.$route.query.id
        }).then(async res => {
          //  获取图片名称列表接口
          let sealGetImageListRes = await this.$sealHttp('ccbCtrl', {
            action: 'SealGetImageList',
            Path: Imgpath
          })
          let imgCountList = sealGetImageListRes.responsetext
          console.log('imgCountList', imgCountList);
          let ImgpathCount = parseInt(imgCountList)
          console.log('ImgpathCount', ImgpathCount);
          let ImgpathCountStr = String(ImgpathCount)
          let imgList = imgCountList.slice(ImgpathCountStr.length + 1)
          let arr_imgList = this.trimSpace(imgList.split(';'))

          let _this = this
          async function recurImgName(j, tLength) {
            _this.sealLoading = true
            _this.loading = _this.$loading({
              text: '上传图片中',
            });
            console.log('开始上传，请求“SealGetImageInfo”接口-->', arr_imgList[j], '第' + j + '次请求')
            await _this.$sealHttp('ccbCtrl', {
              action: 'SealGetImageInfo',
              Path: Imgpath,
              FileName: arr_imgList[j]
            }).then(async sealImgNameList => {
              let codeTatus = sealImgNameList.responsestatus
              let codeText = sealImgNameList.responsetext
              if (codeTatus == '0' && codeText) {
                let codeArr = codeText.split(';')
                console.log('获取codeArr', codeArr)
                let imgBaseArr = codeArr[0].split('.jpg')
                let imgName = `${imgBaseArr[0]}.jpg`
                let imgOrg = {
                  orderId: _this.$route.query.id,
                  fileName: imgName,
                  fileId: _this.randomStr,
                  base64Str: imgBaseArr[1]
                }
                console.log('开始上传，请求“uploadImg2”接口-->', imgOrg.fileName, '第' + j + '次请求')
                 await _this.$api.sealManage.uploadImg2(imgOrg)
                .then(async res => {
                  if (_this.successNum + 1 < _this.selNum) {
                    _this.successNum = j + 1
                  }
                  console.log('上传成功返回信息-->', res)
                  if (++j < tLength) {
                    recurImgName(j, tLength)
                  }
                  if (j == tLength) {
                    _this.loading.close()
                    _this.sealLoading = false
                    console.log('----用印完成----')
                    let successSealInfo = await _this.$sealHttp('ccbCtrl', {
                      action: 'SealGetLastSealInfo'
                    })
                    let responsetextList = successSealInfo.responsetext.split(',')
                    console.log(responsetextList, '获取数据')
                    return true
                  }
                })
                .catch(async erro => {
                  if (_this.successNum + 1  < _this.selNum) {
                    _this.successNum = j + 1
                  }
                  _this.failNum ++
                  console.log('上传失败返回信息-->', erro)
                  _this.loading.close()
                  // 3855接口上传失败后继续用3851上传
                  // _this.failUimg(imgOrg)
                  if (++j < tLength) {
                    recurImgName(j, tLength)
                  }
                  if (j == tLength) {
                    _this.loading.close()
                    _this.sealLoading = false
                    return true
                  }
                });
              } else {
                _this.$message({
                  type: 'error',
                  message: '获取用印图片异常，请联系管理员'
                })
              }
            })
          }
          recurImgName(0, arr_imgList.length)
          console.log(this.state, '获取盖章状态')
          if (this.state == 4) {
            this.useSealMeth();
            // self.cycleGetState(Path)
          }
        })
      }
    },

    /**
     * @description: 数组处理
     */
    arrySplit(arr_sp) {
      let array = [];
      let array_last = [];
      let array_last_yu = [];
      console.log(arr_sp.length);
      // if (arr_sp.length % 2 != 0 && arr_sp.length > 4) {
      //   array_last.push(arr_sp[arr_sp.length - 1]);
      //   arr_sp.pop();
      //   const arr_sp_length = arr_sp.length / 4;
      //   for (let index = 0; index < arr_sp_length; index++) {
      //     array.push(
      //       arr_sp[index * 4] +
      //       ";" +
      //       arr_sp[index * 4 + 1] +
      //       ";" +
      //       arr_sp[index * 4 + 2] +
      //       ";" +
      //       arr_sp[index * 4 + 3]
      //     );
      //   }
      //   console.log(array.concat(array_last));
      //   return array.concat(array_last)
      // } else
      if (arr_sp.length > 2) {
        const arr_sp_length = Math.floor(arr_sp.length / 2);
        const arr_sp_yu = arr_sp.length % 2
        array_last_yu = arr_sp.slice(arr_sp.length - arr_sp_yu, arr_sp.length)
        arr_sp.splice(arr_sp.length - arr_sp_yu, arr_sp_yu);
        console.log(array_last_yu,'获取余数')
        console.log(arr_sp,'获取202')
        for (let index = 0; index < arr_sp_length; index++) {
            array.push(
              arr_sp[index * 2] +
              ";" +
              arr_sp[index * 2 + 1]
            );
        }
        return array.concat(array_last_yu)
      } else if (arr_sp.length <= 2) {
        array = arr_sp
        return array
      }
    },
    /**
     * @description: 清除数组中的空值
     */
    trimSpace(array) {
      let r = array.filter((s) => {
        return s && s.trim()
      })
      return r
    },
    /**
     * @description: 循环检查用印状态
     * @param {type}
     * @return:
     */
    cycleGetState(Path) {
      console.log('cycleGetState-------------------');
      let self = this
      let state
      this.$sealHttp('ccbCtrl', {
        action: 'SealGetState'
      }).then(sealRes => {
        state = sealRes.responsestatus
        this.state = state
        console.log('state', state);
        // 检查用印状态结束后跳出循环 0接口可用 1用印中，2强制中断，3作废，4用印结束 ，5异常中断
        if (state == 1 || state == 3) {
          setTimeout(function () {
            self.cycleGetState(Path)
          }, 5000)
        } else {
          if (state == 2) {
            // TODO: 强制中断后进行下一步用印可能出现问题
            this.$confirm('用印强制退出，是否进行其他印章的用印？', "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否",
            }).then(() => {
              this.sealInfoDialog = true
              this.nextBatch()
              this.loading.close()
            }).catch(() => {
              this.loading.close()
            })
          }
          if (state == 4) {
            this.saveSealInfo(Path)
          } else { //记录出错状态，从出错位置重新盖章。是否进行其他印章类别的盖章。
            //记录出错位置
            this.saveSealInfo(Path)
          }
        }
      })
    },
    /**
     * @description: 用印
     * @param {type}
     * @return:
     */
    beginSeal(sealInfo = {}) {
      console.log('111111111111111beginSealbeginSealbeginSeal-------------------');
      console.log('sealInfo', sealInfo);
      this.$api.sealManage.getsealPerson({
        id: sealInfo.sealID
      }).then(async getsealPersonRes => {
          console.log(getsealPersonRes)
          // let humanId = JSON.parse(localStorage.getItem("userInfo")).humanId;
          let array = []
          let unitInfoHumanId = JSON.parse(localStorage.getItem("unitInfo"))
          unitInfoHumanId.map(item => {
            array.push(item.humanId)
          })
          console.log(array)

          let sealPersonC1id = Number(getsealPersonRes.list[0].sealPersonC1id)
          let sealPersonC2id = Number(getsealPersonRes.list[0].sealPersonC2id)
          if (array.indexOf(sealPersonC1id) !== -1 || array.indexOf(sealPersonC2id) !== -1) {
            this.randomStr = sealInfo.id
            await this.ccbCtrlInit(sealInfo.machineId)
            this.$sealHttp('ccbCtrl', {
              action: 'SealGetState'
            }).then(async sealRes => {
              let state = sealRes.responsestatus
              console.log('state', state);
              if (state == 0 || state == 4 || state == 2) {
                // 印章的章号
                let SealPos = sealInfo.sealPots
                // 盖章总数（正常用印数量）
                let SealNum = parseInt(sealInfo.sealBatchSum)
                // 偏移量
                let Offset = parseInt(sealInfo.successCount) + 1
                // 用印方式
                let Mode = 1
                // 图片存放路径
                let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                let baseFolderName = `${sealInfo.numIndex}_${new Date().getTime()}`
                let Path= getMachineType() ? `C:/ccboa/sealImg/${userInfo.humanCode}/${this.randomStr1}/${baseFolderName}` : `./home/ccb/sealImg/${userInfo.humanCode}/${this.randomStr1}/${baseFolderName}/`;
                
                // 文档编号（唯一标识）
                let JobID = this.randomStr
                console.log('JobID', JobID);
                // 是否可作废盖章页
                let flag = 1
                // 印章RFID标签
                let RFID = await this.getRFID(SealPos)
                console.log('RFID', RFID, SealPos);
                if (sealInfo.sealRFID !== RFID) {
                  this.$message({
                    type: 'error',
                    message: 'RFID错误，请联系管理员核实印章相关信息'
                  })
                  // this.useSealIng = false
                  return
                }
                // 二维码校验信息
                let QRInfo = ''
                this.$sealHttp('ccbCtrl', {
                  action: 'BeginSealControl',
                  SealPos,
                  SealNum,
                  Offset,
                  Mode,
                  Path,
                  JobID,
                  flag,
                  RFID,
                  QRInfo
                }).then(beginSealRes => {
                  if (beginSealRes.responsestatus == 0) {
                    this.loading = this.$loading({
                      // lock: true,
                      text: '用印中',
                    });
                    this.$sealHttp('ccbCtrl', {
                      action: 'SealShowWindow'
                    }).then(sealShowWindowRes => {
                      let resStatus = sealShowWindowRes.responsestatus
                      if (parseInt(resStatus) === 0) {
                        this.$sealHttp('ccbCtrl', {
                          action: 'SealGetState'
                        }).then(sealRes => {
                          state = sealRes.responsestatus
                          if (state == 1) {
                            this.cycleGetState(Path)
                          } else {
                            this.$message({
                              type: 'warning',
                              message: `用印打开窗口状态异常${state}`
                            })
                            // this.useSealIng = false
                          }
                        })
                      }
                    }).catch(er => {
                      // this.useSealIng = false
                    })
                  } else {
                    this.$message({
                      type: 'warning',
                      message: beginSealRes.responsetext
                    })
                    // this.useSealIng = false
                  }
                })
              }
            })
          } else {
            this.$message({
              type: 'warning',
              message: '请核实印章保管人！'
            })
            // this.useSealIng = false
          }
        }

      )





      // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // 调城开接口，验证印章保管人是否吻合
      /**
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
            this.sealInfoList = JSON.parse(JSON.stringify(res.LIST1))
            let sealInfoObj = this.sealInfoList.find(item => sealInfo.sealID === item.Stmp_ECD)
            // TODO 待登录信息完善后补充当前登录人ID
            if ('TODO    ' !== (sealInfoObj.Stmp_Main_Kep_Psn_ID || sealInfoObj.Stmp_Minr_Kep_Psn_ID)) {
              this.$message({
                type: 'warning',
                message: '请核实印章保管人！'
              })
              throw new Error('印章保管人错误')
            }

          } else {
            this.$message({
              type: 'error',
              message: '印章信息获取失败'
            })
          }
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '印章信息获取失败'
          })
          console.log('印章列表数据查询报错：', err);
        });
         */
      // TODO  城开返回真实数据后将下面代码放到res.List1中


    },
    /**
     * @description: 盖章状态查看图片&录像
     * @param {type}
     * @return:
     */
    SealStateDetail(row) {
      console.log('row', row);
      if (parseInt(row.successCount) === 0 && parseInt(row.cancelCount) === 0) {
        this.$message({
          type: 'warning',
          message: '暂无相关用印信息'
        })
        // this.useSealIng = false
        return
      } else {
        this.$refs.sealImgDetail.show(row)
      }
    },
    /**
     * @description: 写流转日志
     * @param {type}
     * @return:
     */
    fundeBug(msg) {
      // if (this.deBugflag == "1") {
      //   if (this.logFile == undefined) {
      var s = getToday()
      let logFile = this.fso.CreateTextFile("c:\\" + s + ".txt", true);
      // }
      logFile.WriteLine(msg)
    },
  },
}
