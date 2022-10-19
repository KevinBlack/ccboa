/*
 * @Author: your name
 * @Date: 2020-09-29 09:08:42
 * @LastEditTime: 2020-09-29 09:23:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\store\modules\signquote.js
 */ 
/**
 * create  on 2020-9-28
 * 类注释：签报套红信息
 * 备注：
 */
import * as types from '../mutation-types'

const signquote = {
  state: {
    signquoteInfo: {},
  },
  getters: {
    signquoteInfo: state => (state.signquoteInfo.id ? state.signquoteInfo : JSON.parse(sessionStorage.getItem("signquoteInfo"))),
  },
  actions: {
    setSignquoteInfo({commit, state}, data) {
      // let item = Object.assign(data, state.signquoteInfo);
      commit(types.SET_SIGNQUOTE_INFO, data)
    }
  },
  mutations: {
    [types.SET_SIGNQUOTE_INFO](state, info) {
      sessionStorage.setItem("signquoteInfo", JSON.stringify(info))
      state.signquoteInfo = info
    },
  }
}

export default signquote;
