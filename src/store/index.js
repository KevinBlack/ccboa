/*
 * @Author: your name
 * @Date: 2021-02-24 18:23:23
 * @LastEditTime: 2021-03-02 11:42:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \0226\src\store\index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js'
import bianhan from './modules/bianhan'
import efficiency from './modules/efficiency'
import fawen from './modules/fawen'
import chengkan from './modules/chengkan'
import signquote from './modules/signquote'
import shouwen from './modules/shouwen'
import mutations from './mutations.js'
import actions from './actions.js'
import createLogger from 'vuex/dist/logger'
import dinggao from './modules/dingGao'
import depart from './modules/departQc'
import msgz from './modules/msgz'
import msgzhyqj from './modules/msgzhyqj'
import msgzlx from './modules/msgzlx'
import listPages from './modules/listPages'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    bianhan,
    fawen,
    signquote,
    shouwen,
    chengkan,
    efficiency,
    dinggao,
    depart,
    msgz,
    msgzhyqj,
    msgzlx,
    listPages
  },
  state,
  actions,
  mutations,
  plugins: debug ? [createLogger()] : []
})
