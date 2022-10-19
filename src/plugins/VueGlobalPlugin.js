/*
 * @Author: your name
 * @Date: 2020-11-14 17:56:51
 * @LastEditTime: 2021-05-18 17:16:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\plugins\VueGlobalPlugin.js
 */
/**
 * create by zx on 2018/11/11 18:40
 * 类注释：方法全局化
 * 备注：
 */
import echarts from "echarts"
//import echarts from "echarts"
import { Loading, Message, MessageBox, Notification } from 'element-ui'
import http from '../http/http'
import api from '../httpTansun/api'
import httptan from '../httpTansun/http'
import businessCode from '../util/businessCode'
import intent from '../util/intent'
import refresh from '../util/refresh'
import sealHttp from '../util/sealHttp'
import sealUtil from '../util/sealUtil'
import userInfo from '../util/userInfo'

let vueGlobalPlugin = {};

function showMessage (Options) {
  Options = Object.assign(Options, { duration: Options.type == 'success' ? 1000 : (Options.typestate == 'tipsForFile' ? 0 : 2000), showClose: true });
  Message.closeAll();
  Message(Options);
}
function showErrorMessage (Options) {
  Message({
    type: "error",
    showClose: true,
    offset: 400,
    message: Options,
    duration: 2000
  });
}
function showWarningMessage (Options) {
  Message({
    type: "warning",
    showClose: true,
    offset: 400,
    message: Options,
    duration: 2000
  });
}
function showSuccessMessage (Options) {
  Message({
    type: "success",
    showClose: true,
    offset: 400,
    message: Options,
    duration: 1000
  });
}
function closeAllMessage (Options) {
  Message.closeAll();
}


vueGlobalPlugin.install = (Vue, options) => {
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = showMessage;
  Vue.prototype.$message.error = showErrorMessage;
  Vue.prototype.$message.warning = showWarningMessage;
  Vue.prototype.$message.success = showSuccessMessage;
  Vue.prototype.$message.closeAll = closeAllMessage;
  Vue.prototype.$post = http;
  Vue.prototype.$businessCode = businessCode;
  Vue.prototype.$refresh = refresh;
  Vue.prototype.$userInfo = userInfo;
  Vue.prototype.$sealUtil = sealUtil;
  Vue.prototype.$echarts = echarts;
  Vue.prototype.$sealHttp = sealHttp;


  Object.defineProperty(Vue.prototype, '$intent', { value: intent });
  Object.defineProperty(Vue.prototype, '$api', { value: api });
  Object.defineProperty(Vue.prototype, '$httptan', { value: httptan });
};

export default vueGlobalPlugin
