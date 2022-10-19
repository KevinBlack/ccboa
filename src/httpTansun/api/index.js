/*
 * @Author: your name
 * @Date: 2020-10-29 09:48:11
 * @LastEditTime: 2020-11-13 10:40:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\httpTansun\api\index.js
 */
import user from './user'
import bianhan from './bianhan'
// 编号年份
import numYear from './numYear'

/**
 * 个人办公
 */

//日常工作
import dailyWork from "./personOffice/dailyWork"
//系统设置
import dailyWork_sysConfig from "./personOffice/sysConfig"
//信息发布
import messPub from "./personOffice/messPub";

/**
 * 系统管理
 */

//主题词库
import themeLexicon from "./setting/themeLexicon"
import adminConfig from "./personOffice/adminConfig";
/**
 * 秘书管理
 */

//unknown
import secreatary from './secreatary/index'
import setting from "./setting";
//党委成员离京报告
import partyMemLeavRep from './secreatary/partyMemLeavRep'
// 会议
import meeting from './meeting'
//领导活动资料管理
import activityInformation from './secreatary/activityInformation'

/**
 * 事务审批
 */
import checkLz from "./approval/checkLz";
import checkLj from "./approval/checkLj";
import argumentPre from "./approval/argumentPre";
/**
 * 秘书工作
 */
import duty from "./secreatary/duty";
import activety from "./secreatary/activety";
import secreat from "./secreatary/meetings";
// 设计词典
import designDictionary from "./setting/designDictionary"


import setSysConfig from './setting/setSysConfig'
/**
 * 用印管理
 */
import sealManage from './sealManage/index'
import pubInfo from './publication/pubInfo'
//
import paraMeter from './publication/paraMeter'
import pubStatistics from './publication/pubStatistics'

export default {

  user,
  bianhan,
  dailyWork,
  dailyWork_sysConfig,
  adminConfig,
  messPub,
  /**
   * 系统管理
   */
  themeLexicon, //主题词库
  /**
   * 秘书管理
   */
  secreatary, //unknown
  secreat,
  partyMemLeavRep, //党委成员离京报告
  setting,
  meeting,
  duty,
  activety, //安排活动
  activityInformation, //领导活动资料管理
  /**
   * 事务审批
   */
  checkLz, //流转
  checkLj, // 离京审批
  argumentPre, //参数维护
  designDictionary,
  setSysConfig,

  /**
   * 用印管理
   */
  sealManage,
  pubInfo,
  paraMeter, //信息刊物、参数管理
  pubStatistics,

  // 编号年份
  numYear
}
