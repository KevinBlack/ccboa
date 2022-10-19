const actions = {
  getMenuList(store,params) {
    return this.$post.postData('system/menu/getallmenu',params).then(payload => store.commit('SET_USER_INFO', payload))
  }
}

export default actions
