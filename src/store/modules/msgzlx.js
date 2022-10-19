
import * as types from '../mutation-types'

const msgzlx = {
  state: {
    msgzlxinfo: {}
  },
  getters: {
msgzlxinfo: state => (state.msgzlxinfo.id ? state.msgzlxinfo : JSON.parse(sessionStorage.getItem("msgzlxinfo"))),
  },
  actions: {
    setMsgzLxinfo({ commit, state }, data) {
      // let item = Object.assign(data, state.fawenInfo);
      commit(types.SET_MSGZLX_INFO, data)  //?SET_MSGZQJ_INFO是否要配置
    }
  },
  mutations: {
    [types.SET_MSGZLX_INFO](state, info) {
      sessionStorage.setItem("msgzlxinfo", JSON.stringify(info))
      state.msgzlxinfo = info
    },
  }
}

export default msgzlx;