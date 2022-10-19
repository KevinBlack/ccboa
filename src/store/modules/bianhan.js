/**
 * create by zx on 2020-8-21 10:01
 * 类注释：便函管理
 * 备注：
 */
import * as types from '../mutation-types'

const bianhan = {
  state: {
    todoItem: {},
  },
  getters: {
    todoItem: state => (state.todoItem.id ? state.todoItem : JSON.parse(sessionStorage.getItem("todoItem"))),
  },
  actions: {
    setTodoItem({commit, state}, data) {
      // let item = Object.assign(data, state.todoItem);
      commit(types.SET_TODO_ITEM, data)
    }
  },
  mutations: {
    [types.SET_TODO_ITEM](state, todoItem) {
      sessionStorage.setItem("todoItem", JSON.stringify(todoItem));
      console.log('签发avyId1');
      console.log(todoItem)
      state.todoItem = todoItem
      try{
      Vue.set(state,'todoItem',todoItem)
      console.log('签发avyId2');
      console.log(todoItem)
      }catch(e){
        console.log('签发avyId位置');
        console.log(e);
      }
     
      console.log('签发avyId3');
      console.log(todoItem)
    },
  }
}

export default bianhan;
