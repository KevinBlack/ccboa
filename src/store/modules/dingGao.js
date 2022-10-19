import * as types from '../mutation-types'

const dinggao = {
  state: {
    dinggaoInfo: {}
  },
  getters: {
    dinggaoInfo: state => (state.dinggaoInfo.id ? state.dinggaoInfo : JSON.parse(sessionStorage.getItem("dinggaoInfo"))),
  },
  actions: {
    setDinggaoInfo({commit, state}, data) {
      // let item = Object.assign(data, state.fawenInfo);
      commit(types.SET_DINGGAO_INFO, data)  //?SET_FAWEN_INFO是否要配置
    }
  },
  mutations: {
    [types.SET_DINGGAO_INFO](state, info) {
      sessionStorage.setItem("dinggaoInfo", JSON.stringify(info))
      state.dinggaoInfo = info
    },
  }
}

export default dinggao;