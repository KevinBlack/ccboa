import * as types from '../mutation-types'

const shouwen = {
  state: {
    shouwenInfo: {}
  },
  getters: {
    shouwenInfo: state => (state.shouwenInfo.id ? state.shouwenInfo : JSON.parse(sessionStorage.getItem("shouwenInfo"))),
  },
  actions: {
    setshouwenInfo({commit, state}, data) {
      commit(types.SET_SHOUWEN_INFO, data)
    }
  },
  mutations: {
    [types.SET_SHOUWEN_INFO](state, info) {
      sessionStorage.setItem("shouwenInfo", JSON.stringify(info))
      state.shouwenInfo = info
    }
  }
}

export default shouwen;
