import Http from "../../http"
export default {
  /**
   * 修改个人信息更新A08461244
   */
  alterPerson(data,pagination){
    return Http.postNeedLoading('A08462049',data,'A08461244',pagination)
  },
  /**
   *   链接设置新增 A08461146
   */
  createLink(data){
    return Http.postNeedLoading("A08462049",data,'A08461146')
  },
  /**
   *   链接设置个人查看 A08461147
   */
  viewLinkPer(data,pagination){
    return Http.postNeedPage("A08462049",data,'A08461147',pagination)
  },
  /**
   *    链接设置删除 A08461148
   */
  deleteLink(data){
    return Http.postNeedLoading("A08462049",data,'A08461148')
  },
  /**
   *  链接设置更新 A08461149
   */
  alterLink(data){
    return Http.postNeedLoading("A08462049",data,'A08461149')
  },
  /**
   * 个人常用批语新增 A08461135
   */
  perComWords(data){
    return Http.postNeedLoading("A08462049",data,'A08461135')
  },
  /**
   * 个人常用批语查询 A08461136
   */
  perComWordsTable(data,pagination) {
    return Http.postNeedPage("A08462049", data, 'A08461136',pagination)
  },
  /**
   *  个人常用批语删除  A08461137
   */
  deletePerComWords(data){
    return Http.postNeedLoading("A08462049",data,'A08461137')
  },
  /**
   *      个人常用批语-更新 A08461138
   */
  alterPerComWords(data){
    return Http.postNeedLoading("A08462049",data,'A08461138')
  },
}
