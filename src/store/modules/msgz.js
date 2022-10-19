
import * as types from '../mutation-types'

const msgz = {
  state: {
    msgzinfo: {}
  },
  getters: {
    msgzinfo: state => (state.msgzinfo.id ? state.msgzinfo : JSON.parse(sessionStorage.getItem("msgzinfo"))),
  },
  actions: {
    setMsgzinfo({ commit, state }, data) {
      // let item = Object.assign(data, state.fawenInfo);
      commit(types.SET_MSGZ_INFO, data)  //?SET_MSGZ_INFO是否要配置
    }
  },
  mutations: {
    [types.SET_MSGZ_INFO](state, info) {
      sessionStorage.setItem("msgzinfo", JSON.stringify(info))
      state.msgzinfo = info
    },
  }
}

export default msgz;