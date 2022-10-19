/**
 * create  on 2020-9-28
 * 类注释：签报套红信息
 * 备注：
 */
import * as types from '../mutation-types'

const chengkan = {
  state: {
    chengkanInfo: {}
  },
  getters: {
    chengkanInfo: state => (state.chengkanInfo.id ? state.chengkanInfo : JSON.parse(sessionStorage.getItem("chengkanInfo"))),
  },
  actions: {
    setChengkanInfo({commit, state}, data) {
      // let item = Object.assign(data, state.fawenInfo);
      commit(types.SET_CHENGKAN_INFO, data)  //?SET_FAWEN_INFO是否要配置
    }
  },
  mutations: {
    [types.SET_CHENGKAN_INFO](state, info) {
      sessionStorage.setItem("chengkanInfo", JSON.stringify(info))
      state.chengkanInfo = info
    },
  }
}

export default chengkan;
