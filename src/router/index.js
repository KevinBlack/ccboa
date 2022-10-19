/*
 * @Author: your name
 * @Date: 2020-08-22 11:19:53
 * @LastEditTime: 2021-05-14 11:27:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import VueGlobalPlugin from '../plugins/VueGlobalPlugin'
import userRouter from './userRouter'
import dispatchRouter from './dispatchRouter'
import receiveRouter from './receiveRouter'
import stmMngRouter from './stmMngRouter'
import personalOfficeRouter from './personalOfficeRouter'
import routerB from './test'
import teamRouter from './teamRouter'
import routerWord from './word'
import store from '../store'
import signquoteRouter from './signquote'
//import superviseHandleRouter from './superviseHandleRouter'
import fanwenRouter from './fanwenRouter'
import approval from './approval'
// import presidentMeeting from './presidentMeeting'
import bianhan from './bianhan'
import serveEnsure from './serveEnsure'
import secretaryWork from './secretaryWork'
import sealManage from './sealManage'
import meeting from './meeting'
import setting from './setting'
import dashboard from './dashboard'
import publication from './publication'
import printing from './printing'

// 系统设置并且列表
const settingList = {"/setting": {id: 15}, "/setting/orgDepartment":{"id":1501},"/setting/orgDepartment/orgManage":{"id":150101},"/setting/orgDepartment/orgManage/orgManageView":{"id":150101},"/setting/orgDepartment/departManage":{"id":150102},"/setting/orgDepartment/personManage":{"id":150103},"/setting/orgDepartment/alterRecord":{"id":150104},"/setting/orgDepartment/teamManage":{"id":150105},"/setting/orgDepartment/belongingWork":{"id":150106},"/setting/processControl":{"id":1502},"/setting/processControl/mainProcessControl":{"id":150201},"/setting/processControl/childProcessControl":{"id":150202},"/setting/processControl/processTemp":{"id":150203},"/setting/processControll/processTemp/mainProcessTemp":{"id":15020301},"/setting/processControll/processTemp/childProcessTemp":{"id":15020302},"/setting/designDictionary":{"id":1503},"/setting/sysConfig/dictionaryPre":{"id":150301},"/setting/designDictionary/businessClassify":{"id":150302},"/setting/designDictionary/designElement":{"id":150303},"/setting/designDictionary/institutionConfig":{"id":150304},"/setting/designDictionary/departmentConfig":{"id":150305},"/setting/designDictionary/moduleConfig/moduleConfigList":{"id":150306},"/setting/themeLexicon":{"id":1504},"/setting/themeLexicon/themeLexiconSet":{"id":150401},"/setting/sysConfig/keyword":{"id":150402},"/setting/inquire":{"id":1505},"/setting/statistics":{"id":1506},"/setting/statistics/analysis":{"id":150601},"/setting/statistics/analysis/wholeBank":{"id":15060101},"/setting/statistics/analysis/lowerOrg":{"id":15060102},"/setting/statistics/clickRate":{"id":150602},"/setting/sysConfig":{"id":1507},"/setting/sysConfig/texttem":{"id":150701},"/setting/menuPermissionConfig":{"id":150702},"/setting/sysConfig/gradprotect":{"id":150703},"/setting/sysConfig/payfiflter":{"id":150704},"/setting/sysConfig/otherconfig":{"id":150705},"/XNKBrcpz":{"id":15070509},"/setting/sysConfig/otherconfig/remindWechat":{"id":15070501},"/setting/sysConfig/otherconfig/holiday":{"id":15070502},"/setting/workingHours":{"id":15070503},"/setting/asetSecretBase":{"id":15070504},"/setting/sysConfig/otherconfig/overdueCom":{"id":15070505},"/setting/sysConfig/otherconfig/reMind":{"id":15070506},"/setting/sysConfig/otherconfig/thingsOrder":{"id":15070507},"/setting/sysConfig/otherconfig/blackList":{"id":15070508},"/setting/sysConfig/mobileMain":{"id":150706},"/setting/sysConfig/bannerMain":{"id":15070601},"/setting/sysConfig/userProtocolMain":{"id":15070602},"/setting/sysConfig/personInforMain":{"id":15070603},"/setting/sysConfig/downqrCodeMain":{"id":15070604},"/setting/sysConfig/feedbackMain":{"id":15070605},"/setting/logs":{"id":1508},"/setting/logs/selectCollectLogs":{"id":150801},"/setting/logs/selectLoginLogs":{"id":150802},"/setting/logs/selectPreserveLogs":{"id":150803},"/setting/logs/settingSafeLogs":{"id":150804},"/setting/mobileOperation/operation":{"id":1509},"/setting/mobileOperation/mobileOperation":{"id":150901},}
const detailMenuId = {};
const settingDetail = []
function setSettingList (obj) {
  let list = undefined;
  if (Array.isArray(obj)) {
    list = obj
  } else {
    list = obj.children
  }
  list.forEach(item => {
    if (Boolean(settingList[item.path]) === false && !settingDetail.includes(item.path)) {
      settingDetail.push(item.path)
      detailMenuId[item.path] = {id: settingList[obj.path] ? settingList[obj.path].id : 'undefined'}
    }
    if (item.children && item.children.length > 0) {
      setSettingList(item);
    }
  })
}
setSettingList(setting);
Object.assign(settingList, detailMenuId)
// console.log(JSON.stringify(settingDetail))
// console.log(settingList)
console.log('------------')


const routers = [
  ...publication,

  ...dispatchRouter,
  ...receiveRouter,
  ...stmMngRouter,
  ...userRouter,
  ...routerB,
  ...signquoteRouter,
  ...teamRouter,
  ...fanwenRouter,
  //...superviseHandleRouter,
  //...personalOfficeRouter,
  ...approval,
  // ...presidentMeeting,
  ...bianhan,
  ...serveEnsure,
  ...bianhan,
  ...secretaryWork,
  ...routerWord,
  ...sealManage,
  ...meeting,
  ...setting,
  ...dashboard,
  ...printing,
]
Vue.use(Router)
Vue.use(VueGlobalPlugin)
// 路由相同跳转报错问题解决
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function push(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
const vueRouter = new Router({
  // mode: 'history',
  // base: '/ecpweb/page/ccboa/',
  routes: routers
})

vueRouter.beforeEach((to, from, next) => {
  let vue=new Vue()
  let path = to.fullPath.split('?')[0];
  let staycopy = to.fullPath.indexOf("staycopy") == -1;
  let stCopy = '';

  let urlParams = {};//跳转参数
  let urlRout = '';
  let urlPath = location.hash;
  let queryInfo = {
    path:'',
    query:{

    }
  };//跳转配置
  urlPath.split("?").map((url,n)=>{
    let urlJson = url.split("=");
    if(n>0){
      if(urlJson[0] != 'staycopy'){
        queryInfo.query[urlJson[0]] =urlJson[1];
      }
    }
  })
  urlRout = urlPath.split("?")[0].split("#")[1];
  queryInfo.path = urlRout;
  if(!staycopy){
    to.fullPath.split("?")[1].split("&").map((node)=>{
      if(node.split("=")[0] == "staycopy"){
        stCopy = node.split("=")[1].indexOf("%") == -1?node.split("=")[1]:node.split("=")[1].split("%")&&node.split("=")[1].split("%")[0]||node.split("=")[1];
      }
    })
  }
  // if(urlRout == '/openNewPage'){
  //   console.log(queryInfo)
  //   next(queryInfo)
  // }
  // console.log("------>",to,from)
  // console.log("------>",path)
  // if (path == "/login") {
  //   next()
  // } else if (localStorage.getItem("st") && localStorage.getItem('routerList').indexOf(path) != -1) {
  //   console.log("可以进入")
  //   next()
  // }else if(!localStorage.getItem("st")){
  //   next({
  //     path: '/login',
  //     query: {
  //       redirect: to.fullPath // 将想跳转的路由path作为参数,登录成功后跳转到该路由
  //     }
  //   })
  // }else {
  //   console.log("无权进入")
  //   next({
  //     path: '/login',
  //   })
  // }

  //路由权限校验
  //menuId，id，type 
  if(to.fullPath.indexOf('approval')>0 && false){
  
    const listPath={
      '/approval':{id:11},
      '/approval/checkLz':{id:1101},
      '/approval/checkCy':{id:1102},
      '/approval/search':{id:1103},
      '/approval/parameter':{id:1104},
      '/approval/statistics':{id:1105},
      '/approval/admin':{id:1106},
      '/approval/parameter/base':{id:110401},
      '/approval/parameter/apply':{id:110402},
      '/approval/parameter/serial':{id:110403},
      '/approval/admin/checkLz':{id:110601},
      '/approval/admin/checkCy':{id:110602},
    }

    const detailePath={
      '/approval/admin':{},
      '/approval/detail':{},
      '/approval/detailv':{},
      '/approval/finDetail':{},
      '/approval/detailCY':{},
      '/approval/finDetailCY':{},
      '/approval/searchDetail':{},
      '/approval/admin/LZDeail':{},
      '/approval/admin/AskDetial':{},
      '/approval/admin/CYDeail':{}
    }

    const sysPath={
      '/approval/parameter/base/checkDetail':{},
      '/approval/parameter/apply/save':{},
      '/approval/parameter/serial/save':{}
    }
    
    // console.log(detailePath,'打印')
    if(!!listPath[to.path]||!!listPath[to.redirectedFrom]){
      // 列表页面访问权限
      vue.$api.checkLz
      .hasListPower(
        {menuId:listPath[to.redirectedFrom]?.id||listPath[to.path].id}
      ).then(res=>{
         //有菜单访问权限，继续执行
      }).catch(res=>{
        //无菜单访问权限，跳转至首页
        next({
          path: '/home',
        })
      })
    }else if(!!detailePath[to.path]){
      // vue.$api.checkLz.hasDetailPower(
      //   {id:to.query.id,
      //     type:to.query.state,
      //     pcsAvyId:to.query.pcsAvyId,
      //   workFlowId:to.query.workFlowId,
      //   multiID:to.query.multiID,
      //   currentUserId:to.query.currentUserId}).then(res=>{
      //     console.log('1111')
      //   }).catch(res=>{
      //     next({
      //       path: '/home',
      //     })
      //   })
    }else if(!!sysPath[to.path]&&to.query.type!='edit'){
      //selType除系统管理模块传0外，其余模块均为1
      let unitCode='';
      switch(to.path){
        case '/approval/parameter/base/checkDetail':
          unitCode=JSON.parse(to.query.data).manageBankId;
          break;
        case '/approval/parameter/apply/save':
          unitCode=JSON.parse(to.query.rowData).manageBankId;
          break;
        case '/approval/parameter/serial/save':
          unitCode=JSON.parse(to.query.data).unitId;
          break;
        default:
          break;
      }
      vue.$api.checkLz.hasSysPower(
        {unitCode:unitCode,
        selType:1}).then(res=>{
          console.log('1111')
        }).catch(res=>{
          next({
            path: '/home',
          })
        })
    }

    // console.log(detailePath[to.fullPath],to,'打印')
  } else if (to.fullPath.indexOf('setting')>0 && false) {// settingHasListPower
    if (Boolean(settingList[to.path])) {
      if (settingList[to.path].id != 'undefined' && vue.$api.checkLz) {
        try {
          vue.$api.checkLz.settingHasListPower({menuId: settingList[to.path].id}).then(res => {
  
          }).catch(error => {
            next({path: '/home'})
          })
        } catch (error) {
        }
        
      }
    }
    if (settingDetail.includes(to.path) && to.query) {
      let unitCode = '';
      console.log('current Router', to)
      switch (to.path) {
        case "/setting/orgDepartment/orgManage/orgManageConfig":
        case "/setting/orgDepartment/departManage/depManageConfig":
        case "/setting/orgDepartment/alterRecord/orgAlterRecord/list/edit":
        case "/setting/orgDepartment/alterRecord/orgAlterations/info":
        case "/setting/orgDepartment/alterRecord/deptAlterations/info":
          if (to.query.detail) {
            unitCode = JSON.parse(to.query.detail).unitCode;break;
          }
          break;
        case "/setting/orgDepartment/personManage/addPerson":
          if (to.query.isAdd === JSON.stringify(true)) {
            unitCode = "";
          } else {
            unitCode = JSON.parse(to.query.searchData1).humanUnitId;break;
          }
          break;
        case "/setting/orgDepartment/teamManage/editTeam":
          if (to.query.detail) {
            unitCode = JSON.parse(to.query.detail).groupUnitId;break;
          }
          break;
        case "/setting/processControl/addOrEditProcess":
          if (to.query.type === "0") {
            unitCode = "";
          } else {
            unitCode = to.query.groupId;break;
          }
          break;
        case "/setting/sysConfig/keyword/keywordeditor":
          if (to.query.rowData) {
            unitCode = to.query.rowData.curbankId;break;
          }
          break;
        case "/setting/sysConfig/gradprotect/createdgrad":
          if (to.query.isAdd === JSON.stringify(true)) {
            unitCode = "";
          } else {
            unitCode = JSON.parse(to.query.detail).managerUnitId;break;
          }
          break;
        case "/setting/orgDepartment/belongingWork/detail":
          if (to.query.detail) {
            unitCode = JSON.parse(to.query.detail).orgCode;break;
          }
          break;
      }

      console.log('unitCode', unitCode)
      
      if (unitCode) {
        vue.$api.checkLz.settingHasSysPower({unitCode: unitCode, selType: 0}).then(res => {

        }).catch(error => {
          next({path: '/home'})
        })
      }
    }
  }

  
   

  if(localStorage.getItem('theNgix')&&localStorage.getItem('theNgix') == '1'){
    if(localStorage.getItem('ngPath')&& localStorage.getItem('ngPath') != urlRout){
      localStorage.clear();
    }
  }
  if(to.meta.needLogin == 'false'&&path == '/openNewPage'&&path == '/loginPage'){
    localStorage.setItem('st',queryInfo.query.st)
    localStorage.setItem('theNgix','1')
    next()
  }else{
    if(path == '/home'){
      localStorage.setItem('isHome','1')
    }else{
      localStorage.setItem('isHome','2')
    }
    let token = localStorage.getItem('st') // 获取token
    if(!staycopy){
      if(localStorage.getItem("st_token")){
        if(token){
          next(queryInfo)
        }else{
          setTimeout(()=>{
            localStorage.setItem("st" ,stCopy);
          },1000)
          next();
        }
      }else{
         
        location.href = '#/login';
        location.reload();
        // next({
        //   path: '/login',
        //   query: {
        //     redirect: to.fullPath // 将想跳转的路由path作为参数,登录成功后跳转到该路由
        //   }
        // })
        
      }
      
    }else{
      if (!token) {
        if (path == "/login") {
          next()
        } else if(path == '/openNewPage'){
          localStorage.setItem('st',queryInfo.query.st)
          localStorage.setItem('theNgix','1')
          next()
        }else if(path == '/loginPage'){
          localStorage.setItem('st',queryInfo.query.st)
          localStorage.setItem('theNgix','1')
          next()
        }else{
            next({
              path: '/login',
              query: {
                redirect: to.fullPath // 将想跳转的路由path作为参数,登录成功后跳转到该路由
              }
            })
        }
    } else {
      if (to.meta.needLogin) { // 判断该路由是否需要登录权限
        let token = localStorage.getItem('st') // 获取token
        if (token) {
          next()
        } else {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath // 将想跳转的路由path作为参数,登录成功后跳转到该路由
            }
          })
        }
      } else {
        if (path == "/login") {
          next({
            path: '/home',
          })
        } else {
          next()
        }
      }
    }
    }
  }
  

  // next();
})

export default vueRouter
