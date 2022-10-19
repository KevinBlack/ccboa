/**
 * create by Robbieen on 2020-11-11
 * 类注释：便函管理
 * 备注：
 */
const efficiency = {
  namespaced:true,
  state: {
    baseParams: {
      activeName:"headOffice", //headOffice:总行；subBank:一级分行；mineDept:本部门
      filterType:"year", //year;quarter;month
      deptIds:"", 	 //部门id，逗号分割的字符串
      year:"2020", //年份
      quarter:"",  //季度
      month:"",    //月份
    },
    efficeType:"1", //部门效率类别
    explainText: {
      bsxl:`
        一、部门整体效率：行外请示收文主办部门办理效率<br/>
        1、办结率：办结件数/承办件数（%）<br/>
        2、平均处理工作日：已办结文件总处理时间/文件总数<br/>
        3、同比：本周期平均处理工作日与上周期平均处理工作日比较<br/>
        二、独立承办效率：行外请示收文承办部门独立办理效率<br/>
        1、办结率：办结件数/承办件数（%）<br/>
        2、平均处理工作日：已办结文件总处理时间/文件总数<br/>
        3、同比：本周期平均处理工作日与上周期平均处理工作日比较<br/>
        三、协办效率：行外请示收文协办部门办理效率（数据从2018年8月开始）<br/>
        1、办结率：办结件数/协办件数（%）<br/>
        2、平均处理工作日：已办结文件总处理时间/文件总数<br/>
        3、同比：本周期平均处理工作日与上周期平均处理工作日比较<br/>
        四、会议纪要效率：会议纪要类型发文平均处理时间（拟稿和会签用时）`,
      zxdb:`
        一、督查办：专项督办文件总数（流转和办结）<br/>
        二、已反馈：已反馈的专项督办总件数<br/>
        三、平均办理天数：从承办部门第一次收到承办处理单到承办部门最终反馈的处理工作日天数<br/>
        四、反馈率：反馈件数/督查办件数<br/>
        五、按时反馈：在时限内反馈的督办承办件数<br/>
        六、超时反馈：超过时限内反馈的督办承办件数<br/>
        七、超时在办：超过时限的未反馈的督查承办件数<br/>
        八、时限内在办：还在时限内的未反馈的督办承办件数`,
      bwzl:`
        一、退文率：办结文退回次数/办结发文总数<br/>
        二、重发率：办结文重发次数/办结发文总数`,
      bwxl:`
        一、发文处理时间：已办结发文平均处理时间（拟稿和会签用时）<br/>
        二、会签处理时间：作为会签部门平均会签处理时间（数据从2018年8月开始）`,
      yjfhblxl:`接收来自来文单位的收文办理效率：从分行总收文用户收到来文单位文件开始，到办结文件截止的处理工作日<br/>
      效率较快：5天以内完成；效率中等：5—10天完成；效率较慢：10天以上完成`,
      xjfhblxl:`接收来自来文单位的收文办理效率：从支行收到分行总发文用户发送的文件开始，到办结文件截止的处理工作日<br/>
      效率较快：5天以内完成；效率中等：5—10天完成；效率较慢：10天以上完成`,
      yjzxdbtitlt:`一、督查办：专项督办文件总数（流转和办结）<br/>
      二、已反馈：已反馈的专项督办总件数<br/>
      三、平均办理天数：从承办部门第一次收到承办处理单到承办部门最终反馈的处理工作日天数<br/>
      四、反馈率：反馈件数/督查办件数`
    },
  },
  getters: {
    baseParams: state =>{
      return state.baseParams;
    },
    efficeType: state =>{
      return state.efficeType;
    },
    explainText:state=>{
      return state.explainText;
    }
  },
  actions: {
    setBaseParams({commit},data){
      commit("SETBASEPARAMS",data)
    },
    setEfficeType({commit},data){
      commit("SETEFFICETYPE",data)
    }
  },
  mutations: {
    "SETBASEPARAMS":(state,data)=>{
      state.baseParams = JSON.parse(JSON.stringify(data));
    },
    "SETEFFICETYPE":(state,data)=>{
      state.efficeType = data;
    }
  }
}

export default efficiency;
