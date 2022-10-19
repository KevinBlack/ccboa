import Http from "../../../http"
export default {
  /**
   * 管理员设置新建专栏 A08461237
   */
  createColumn(data) {
    return Http.postNeedLoading("A08462049", data, "A08461237")
  },
  /**
   * 管理员设置查看专栏 A08461238
   */
  viewColumn(data, pagination) {
    return Http.postNeedPage("A08462049", data, "A08461238", pagination)
  },
  /**
   *  查询专栏-更新  A08461250
   */
  altercolumn(data) {
    return Http.postNeedLoading("A08462049", data, "A08461250")
  },
  /**
   * 管理员设置栏目设置新增 A08461239
   */
  columnConfig(data) {
    return Http.postNeedLoading("A08462049", data, "A08461239")
  },
   /**
   * 查询上级行机构 A08463601
   */
  getUpperBank(data){
    return Http.postNeedLoading("A08462041",data,'A08463601')
  },
  /**
   * 管理员设置栏目查看 A08461240
   */
  viewColumnConfig(data, pagination) {
    return Http.postNeedPage("A08462049", data, 'A08461240', pagination)
  },
  /**
   *  管理员设置-查看栏目-更新    A08461248
   */
  altercolumnConfig(data) {
    return Http.postNeedLoading("A08462049", data, "A08461248")
  },
  /**
   * 管理员设置专栏查询 A08461241
   */
  searchColumn(data, pagination) {
    return Http.postNeedPage("A08462049", data, "A08461241", pagination)
  },
  /**
   * 弹出窗口设置新增 A08461242
   */
  alterWin(data) {
    return Http.postNeedLoading("A08462049", data, "A08461242")
  },
  /**
   * 弹出窗口设置查询 A08461249
   */
  alterWinSer(data) {
    return Http.postNeedLoading("A08462049", data, "A08461249")
  },
  /**
   * 手工发送短信新增 A08461243
   */
  sendPhone(data) {
    return Http.postNeedLoading("A08462049", data, 'A08461243')
  },
  /**
   *  管理员设置查看专栏-删除 A08461246
   */
  deleteColumn(data) {
    return Http.postNeedLoading("A08462049", data, 'A08461246')
  },
  /**
   * 管理员设置查看栏目-删除    A08461247
   */
  deleteColumnConfig(data) {
    return Http.postNeedLoading("A08462049", data, 'A08461247')
  },
}
