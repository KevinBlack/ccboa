/*
 * @Author: wy
 * @Date: 2020-11-12 14:20:18
 * @LastEditTime: 2021-05-28 17:41:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\sealManage\mixins\index.js
 */
export default {
  methods: {
    /**
     * @description: 获取所连用印机的所有RFID
     * @param {*MachineID:机器编号;*FileReg:机器注册码}
     * @return {*目前用印机存在的RFID(eg:RFID + “_”+位置号# RFID + “_”+位置号)}
     */

    getDeviceRFID (MachineID = '', FileReg = '') {
      return new Promise((resolve, reject) => {
        let MachineIDType = Object.prototype.toString.call(MachineID)
        let FileRegType = Object.prototype.toString.call(FileReg)
        if ((MachineIDType !== '[object String]') || (FileRegType) !== '[object String]') {
          reject('获取RFID失败！(请传入正确的数据类型)')
          return
        }
        // 默认密码
        let Password = '123456'
        // let MachineID = '18110593'
        // let FileReg = ''
        this.$sealHttp('ccbCtrl', { action: 'PrepareSeal', Password, FileReg, MachineID }).then(SealRes => {
          if (SealRes.responsestatus != 0) {
            reject('印控机初始化失败!')
          } else {
            this.$sealHttp('ccbCtrl', { action: 'SealplaceInfo' }).then(sealRess => {
              let allRFID = sealRess.responsetext
              resolve(allRFID)
            }).catch(err => {
              reject('获取RFID失败！')
            })
          }
        })
      })
    }
  }
}
