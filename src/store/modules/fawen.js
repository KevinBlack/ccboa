/**
 * create  on 2020-9-28
 * 类注释：签报套红信息
 * 备注：
 */
import * as types from '../mutation-types'

const fawen = {
  state: {
    fawenInfo: {}
  },
  getters: {
    fawenInfo: state => (state.fawenInfo.id ? state.fawenInfo : JSON.parse(sessionStorage.getItem("fawenInfo"))),
  },
  actions: {
    setFaWenInfo({commit, state}, data) {
      // let item = Object.assign(data, state.fawenInfo);
      commit(types.SET_FAWEN_INFO, data)
    }
  },
  mutations: {
    [types.SET_FAWEN_INFO](state, info) {
      sessionStorage.setItem("fawenInfo", JSON.stringify(info))
      state.fawenInfo = info
    }
  }
}

export default fawen;
