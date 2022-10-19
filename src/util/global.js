/**
 * create by zx on 2018/11/12 13:26
 * 类注释：全局公用方法
 * 备注：
 */

/**
 * 判断对象是否为空
 */
isEmptyObject = e => {
  let t
  for (t in e)
    return !1;
  return !0
};

/**
 * 去除字符串空格
 * @param str 要处理的字符串
 * @param type 1：所有空格 2：前后空格 3：前空格 4：后空格
 */
strTrim = (str, type) => {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
  }
}

checkIsHasSpecialStr = (str) => {
  let myReg = /[~!@#$%^&*()/,.?+=\[\]{}]/
  if (myReg.test(str)) {
    return true
  }
  return false

}

/**
 * 获取UUID
 * @returns {string}
 */
getUID = () => { // 获取唯一值
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

goUrl = url => {
  // 正则为url添加http标识
  const regex = /(https?:\/\/)?(\w+\.?)+(\/[a-zA-Z0-9\?%=_\-\+\/]+)?/gi
  window.location.href = url.replace(regex, function (match, capture) {
    if (capture) {
      return match
    } else {
      return 'http://' + match
    }
  })
}

/**
 * 深拷贝
 * @param target
 * @returns {*}
 */
deepClone = target => {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}

/**
 * 格式化时间
 * @param time
 * @param format
 */
formatData = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  let dateFormat = require('date-fns/format')
  return dateFormat(new Date(parseInt(time)), format)
}

formatBData = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  let dateFormat = require('date-fns/format')
  return dateFormat(time, format)
}
/**
 * 获取机器标示 false为国产机和其他
**/
getMachineType = ()=>{
  let type = navigator.platform;
  if(type == 'Win32'|| type == 'Win64'){
    return true;
  }else{
    return false
  }
}

/**
 * 获取今天
 * @param format
 */
getToday = (format = 'YYYY-MM-DD') => {
  return formatData(new Date().getTime(), format)
}

/**
 * 获取当前页id
 * @param routeId, nowPageId(需要唯一属性), saveId(保存返回id)
 */
getFormId = (routeId, nowPageId, saveId) => {
  if (saveId) {
    if(nowPageId){
      sessionStorage.setItem(nowPageId, saveId);
    }
    //需要关闭正文相关操作页面
    if(!routeId){
      let routeOpenId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
      if(!routeOpenId.includes(saveId)){
        routeOpenId.push(saveId);
        localStorage.setItem('routeIdList', JSON.stringify(routeOpenId));
      }
    }
  }
  return routeId ? routeId : (saveId ? saveId : sessionStorage.getItem(nowPageId) || '');
}

/**
 * 获取本地ip
 * @param onNewIP
 */
getUserIP = (onNewIP) => {
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
      iceServers: []
    }),
    noop = function () {
    },
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }

  //create a bogus data channel
  pc.createDataChannel("");
  // create offer and set local description
  pc.createOffer().then(function (sdp) {
    sdp.sdp.split('\n').forEach(function (line) {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });
    pc.setLocalDescription(sdp, noop, noop);
  }).catch(function (reason) {
    // An error occurred, so handle the failure to connect
  });
  //sten for candidate events
  pc.onicecandidate = function (ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}

/**
 * 下载文件
 * @param url 文件路径
 * @param filename  文件名称
 */
downLoadFileReName = (url, filename) => {
  const xhr = new XMLHttpRequest();
  //增加进度条
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    if (xhr.status === 200) {
      var blob = xhr.response
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement('a');
        const body = document.querySelector('body');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.style.display = 'none';
        body.appendChild(link);
        link.click();
        setTimeout(()=>{
          body.removeChild(link);
        })
        window.URL.revokeObjectURL(link.href);
      }
    }
  };
  xhr.addEventListener("progress",function(event){
    if(filename=="初始化程序.zip"){
      if(event.lengthComputable){
        var percentComplete = event.loaded/event.total*100;
        $("#downFileTSXX").attr("disabled",true);
        $("#downFileTSXX").removeClass("el-button--primary").addClass("el-button--info");
        $("#downFileTSXX").find("span").html("下载中"+percentComplete.toFixed(2) + "%");
        if(percentComplete == 100){
          $("#downFileTSXX").attr("disabled",false);
          $("#downFileTSXX").removeClass("el-button--info").addClass("el-button--primary");
          $("#downFileTSXX").find("span").html("下载");
        }
      }else{
        $("#downFileTSXX").attr("disabled",false);
        $("#downFileTSXX").removeClass("el-button--info").addClass("el-button--primary");
        $("#downFileTSXX").find("span").html("下载");
      }
    }
  })
  xhr.send();
}

saveFile = (content, filename) => {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(new Blob([content], {type: ("text/plain") + ";charset=" + ('utf-8')}), filename);
  } else {
    const link = document.createElement('a');
    const body = document.querySelector('body');
    link.href = window.URL.createObjectURL(new Blob([content], {type: ("text/plain") + ";charset=" + ('utf-8')}));
    link.download = filename;
    link.style.display = 'none';
    body.appendChild(link);
    link.click();
    body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }
}
//匹配对象 中元素
matchObjNode = (name, val, data) => {
  let node = {};
  data = data || [];
  data.map((item) => {
    if (item[name] == val) {
      node = item;
    }
  })
  return node;
}
//判断是否是管理员
isGlyId=()=>{
  let isHqf = JSON.parse(localStorage.getItem('tcHumanRole'));
  let isGly = true;
  // for (let index = 0; index < isHqf.length; index++) {
  //   if(isHqf[index].dicId == 382||isHqf[index].dicId == 383){
  //     return isGly = true
  //   }else{
  //     isGly = true
  //   }
  // }
  return isGly
}
//判断state
witchState = (active)=>{
  if(active == 'tabs-all')return 0
  if(active == 'tabs-wait')return 1
  if(active == 'tabs-done')return 2
  if(active == 'tabs-end')return 3
}
//检验金格插件安装
judgeInstall =()=> {
  //判断IE和谷歌是否加载控件
  if (
    window.ActiveXObject != undefined ||
    window.ActiveXObject != null ||
    "ActiveXObject" in window
  ) {
    try {
      var weboffice = new ActiveXObject("Kinggrid.iWebOffice"); //创建iWebOffice对象
      console.log("控件已经安装");
      return true;
    } catch (e) {
       //创建对象异常则说明控件没有安装
      var windows = window.confirm("未安装Office或者注册表有损坏"
            + "\r\r单击“确定”下载，单击“取消”关闭。");
        this.Status = "未安装Office或者注册表有损坏";
        if (windows != 1) {
          window.close();
          return false;
        }else{
          downLoadFileReName('/ecpweb/page/ccboa/static/jinge/iWebOffice2015.cab',"iWebOffice2015.cab")
        }
        return false;
    }
  } else {
    console.log("进入",1);

    if (document.getElementById("WebOffice").Version != undefined) {
      console.log('控件已经安装');
      return true;
    } else {
     var windows = window.confirm("未安装Office或者注册表有损坏"
            + "\r\r单击“确定”下载，单击“取消”关闭。");
        this.Status = "未安装Office或者注册表有损坏";
        if (windows != 1) {
          window.close();
          return false;
        }else{
          downLoadFileReName('/ecpweb/page/ccboa/static/jinge/iWebOffice2015.cab',"iWebOffice2015.cab")
        }
      return false;
    }
  }
}

/**
 * 编号年份
 * @param list 返回编号年份数组
 */

getNumYear = (list)=>{
  let newList = []
  if(list) {
    newList.push('近两年')
    list.forEach((item,index)=>{
      if(index != 0 && index !=1) {
        newList.push(item)
      }
    })
  }
  return newList
}

/**
 * 编号年份(方法2)
 * @param {Array<string | number>} list = []
 */
getNumYear_2 = (list = []) => {
  if (Array.isArray(list)) {
    const year = new Date().getFullYear()
    const filterArray = [year, year.toString(), year - 1, (year - 1).toString()]
    const newList = list.filter(item => !filterArray.includes(item)).map(item => ({label: item, value: item}))
    return newList
  } else {
    return list
  }
}





