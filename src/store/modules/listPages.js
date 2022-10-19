

const paginationSlist = {
  state: {
    paginationSlist: sessionStorage.getItem('pagination')?JSON.parse(sessionStorage.getItem('pagination')):{
        pageNum:1,pageSize:20
    },
  },
  getters: {
  },
  actions: {
    
  },
  mutations: {
    
  }
}

export default paginationSlist;
