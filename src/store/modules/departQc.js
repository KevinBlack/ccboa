/*
 * @Author: your name
 * @Date: 2021-02-04 17:51:27
 * @LastEditTime: 2021-06-09 15:48:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA4\src\store\modules\departQc.js
 */
import * as types from '../mutation-types'

const depart = {
  state: {
    departQc: {},
    departJsx: {}
  },
  getters: {
    departQc: state => (state.departQc.id ? state.departQc : JSON.parse(sessionStorage.getItem("departQc"))),
    departJsx: state => (state.departJsx.id ? state.departJsx : JSON.parse(sessionStorage.getItem("departJsx"))),
  },
  actions: {
    setDepartQc({ commit, state }, data) {
      // let item = Object.assign(data, state.fawenInfo);
      commit(types.SET_DEPART_QC, data)  //?SET_FAWEN_INFO是否要配置
    },
    setDepartJsx({ commit, state }, data) {
      // let item = Object.assign(data, state.fawenInfo);
      commit(types.SET_DEPART_JSX, data)  //?SET_FAWEN_INFO是否要配置
    },
  },
  mutations: {
    [types.SET_DEPART_QC](state, info) {
      sessionStorage.setItem("departQc", JSON.stringify(info))
      state.departQc = info
    },
    [types.SET_DEPART_JSX](state, info) {
      sessionStorage.setItem("departJsx", JSON.stringify(info))
      state.departJsx = info
    },
  }
}

export default depart;