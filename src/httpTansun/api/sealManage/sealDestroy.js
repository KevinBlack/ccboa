import Http from "../../http.js"
import smHttp from "./sealManageHttp"
export default {
  //印章销毁列表 type 代办： DB 已办： YB 办结： BJ 全部： ALL
  destroyList(data, pagination) {
    return Http.postNeedPage("A08462041", data, "A08465303", pagination)
  },
  //印章销毁新增
  destroyAdd(data) {
    return Http.postNeedLoading("A08462041", data, "A08465307")
  },
  //印章销毁更新
  destroySave(data) {
    return Http.postNeedLoading("A08462041", data, "A08465306")
  },
  //印章销毁详情
  destroyForm(data) {
    return Http.postNeedLoading("A08462041", data, "A08465304")
  },
  //印章销毁删除
  destroyDel(data) {
    return Http.postNeedLoading("A08462041", data, "A08465305")
  },
  //印章销毁完成并发送
  destroySend(data) {
    return Http.postNeedLoading("A08462041", data, "A08465301")
  },
  //印章销毁完成并发送确定
  destroySendFor(data) {
    return Http.postNeedLoading("A08462041", data, "A08465302")
  },
  //印章销毁控制域
  getdesLink(data) {
    return Http.postNeedLoading("A08462041", data, "A08465308")
  },
  //查询印章废止名称
  seachTitle(data) {
    return Http.postNeedLoading("A08462041", data, "A08465312")
  },
  //印章销毁催办
  cuiBan(data) {
    return Http.postNeedLoading("A08462041", data, "A08465311")
  },
  //印章销毁办结
  destend(data) {
    return Http.postNeedLoading("A08462041", data, "A08465302")
  },

  // A08465309 传id 
  //印章销毁收回
  destBack(data) {
    return Http.postNeedLoading("A08462041", data, "A08465309")
  },

  // *A08465310
  //   传id   、thIdea（退回原因） 、thType（退回类型 1 上一节点 ， 0 起草节点）
  //印章销毁退回
  destbeBack(data) {
    return Http.postNeedLoading("A08462041", data, "A08465310")
  },

  //  *A08465311
  //  传id
  //印章销毁催办
  destCuiBan(data) {
    return Http.postNeedLoading("A08462041", data, "A08465311")
  },
}
