
import * as types from '../mutation-types'

const msgzqj = {
  state: {
    hyqjinfo: {}
  },
  getters: {
    hyqjinfo: state => (state.hyqjinfo.id ? state.hyqjinfo : JSON.parse(sessionStorage.getItem("hyqjinfo"))),
  },
  actions: {
    setMsgzQjinfo({ commit, state }, data) {
      // let item = Object.assign(data, state.fawenInfo);
      commit(types.SET_MSGZQJ_INFO, data)  //?SET_MSGZQJ_INFO是否要配置
    }
  },
  mutations: {
    [types.SET_MSGZQJ_INFO](state, info) {
      sessionStorage.setItem("hyqjinfo", JSON.stringify(info))
      state.hyqjinfo = info
    },
  }
}

export default msgzqj;