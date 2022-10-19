import Http from "../../http.js"

export default {
  // 设计元素新增
  upopinionFldData(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461711')
  },
  //部门变更列表    A08462014
  deparAlterList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08462014', pagination)
  },
  updataOrgOrDept(data){
    return Http.postNeedLoading('A08462053', data, 'A08462016')
  }
}
