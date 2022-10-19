/*
 * @Author: your name
 * @Date: 2020-10-12 17:40:19
 * @LastEditTime: 2020-11-21 19:17:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\httpTansun\api\secreatary\index.js
 */
import Http from "../../http"

import duty from "./duty";
import leaderActivity from "./leaderActivity";
import linkMan from "./linkMan";
import meetings from "./meetings";
import dutyWork from "./dutyWork";
import partyMemLeavRep from './partyMemLeavRep'
import activety from './activety'
export default {
  duty,
  leaderActivity,
  linkMan,
  meetings,
  partyMemLeavRep,
  dutyWork,
  activety,
  /**
   * 获取领导活动类型配置 A08471523
   */
  leaderFormSelect(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471523')
  },
  /**
   *新增领导资料信息  A08471510
   */
  addLeaderMessage(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471510')
  },
}
