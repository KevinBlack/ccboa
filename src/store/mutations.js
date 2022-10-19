/*
 * @Author: your name
 * @Date: 2021-02-24 18:23:23
 * @LastEditTime: 2021-06-09 15:48:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0226\src\store\mutations.js
 */

// 切换用户信息
export const mutations = {
  // CHANGE_USER_INFO = "CHANGE_USER_INFO"
  SET_USER_INFO(state, res) {
    if (res && res.length === 0) state.isNoMenu = true
    state.userInfo = res
  },
  SET_FAWEN_INFO(state, res) {
    state.fawen.fawenInfo = res;
  },
  SET_CHENGKAN_INFO(state, res) {
    state.chengkan.chengkanInfo = res;
  },
  SET_SIGNQUOTE_INFO(state, res) {
    state.signquote.signquoteInfo = res;
  },
  SET_DINGGAO_INFO(state, res) {
    state.dinggao.dinggaoInfo = res
  },
  SET_DEPART_QC(state, res) {
    state.depart.departQc = res
  },
  SET_DEPART_JSX(state, res) {
    state.depart.departJsx = res
  },
  SET_MSGZ_INFO(state, res) {
    state.msgz.msgzinfo = res
  },
  SET_MSGZQJ_INFO(state, res) {
    state.msgzhyqj.hyqjinfo = res
  },
  SET_MSGZLX_INFO(state, res) {
    state.msgzlx.msgzlxinfo = res
  }
}

export default mutations
