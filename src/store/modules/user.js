/**
 * create by zx on 2020-1-5 11:01
 * 类注释：用户信息管理
 * 备注：
 */
import * as types from '../mutations'

const user = {
  state: {
    userInfo: {},
  },
  getters: {
    userInfo: state => state.userInfo,
  },
  actions: {
    setUserInfo({commit, state}) {
      let user = Object.assign({}, state.userInfo);
      commit(types.SET_USER_INFO, user)
    }
  },
  mutations: {
    [types.SET_USER_INFO](state, user) {
      state.userInfo = user
    },
  }
}

export default user;
