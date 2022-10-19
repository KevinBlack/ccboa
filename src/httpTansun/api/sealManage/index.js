// /*
//  * @Author: your name
//  * @Date: 2020-12-02 17:08:05
//  * @LastEditTime: 2020-12-02 17:21:53
//  * @LastEditors: your name
//  * @Description: In User Settings Edit
//  * @FilePath: \OA\src\httpTansun\api\sealManage\index.js
//  */ 
// // /*
// //  * @Author: wy
// //  * @Date: 2020-09-04 17:33:45
// //  * @LastEditTime: 2020-11-17 16:15:15
// //  * @LastEditors: Please set LastEditors
// //  * @Description: In User Settings Edit
// //  * @FilePath: \ccbOA\src\httpTansun\api\sealManage\index.js
// //  */

// // 看见有人注释了这个页面，也许需要移动到外层的index中吧。除了useSeal,argumentPre.我帮忙移动了,
// // 如果看到，请根据自己的需求进行修改。原来的我看没有删，放开注释也能用。
// // 移动后，页面中原来的调用this.$api.sealManage.xxx.xxx需要去掉其中的sealManage。
// // 移动（非注释）by jiangke 2020/12/18 10:35 

import useSeal from "./useSeal"
import argumentPre from "./argumentPre"
import sealCommon from "./sealCommon"
import markMgr from "./markMgr"
import sealAbolished from "./sealAbolished"
import sealDestroy from "./sealDestroy"
import personLogin from "./personLogin"
import sealRegister from "./sealRegister"
import sealKeeperChange from "./sealKeeperChange"
import useSealDevice from "./useSealDevice"
import useSealMaintain from "./useSealMaintain"
import sealRegisterForm from "./sealRegisterForm"
import sealStatistical from "./sealStatistical"

export default {
  ...useSeal,
  ...argumentPre,
  sealCommon,
  markMgr,
  sealAbolished,
  sealDestroy,
  personLogin,
  sealRegister,
  sealKeeperChange,
  useSealDevice,
  useSealMaintain,
  sealRegisterForm,
  sealStatistical,
}
