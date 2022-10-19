/*
 * @Author: your name
 * @Date: 2020-12-31 10:24:25
 * @LastEditTime: 2021-01-05 13:52:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \30ccboa\src\views\sealDrafttt\mixins\video_js.js
 */
var pdoc = window.dialogArguments;
function getYZZHT () {
    //return pdoc.getElementsByName("YZZHT")[0].value;
    var yzInfo = "";
    if (pdoc.getElementsByName("YZZHT")[0]) {
        yzInfo = pdoc.getElementsByName("YZZHT")[0].value;
    } else {
        if (pdoc.getElementById("showYZ")) {
            yzInfo = pdoc.getElementById("showYZ").innerText;
        }
    }
    if (yzInfo != "") {
        try {
            yzInfo = formatRtf(yzInfo)
        } catch (e) {
        }
    }
    return yzInfo
}
function getTitle () {
    if (pdoc.getElementsByName("title")[0]) {
        return pdoc.getElementsByName("title")[0].value;
    }
    if (pdoc.getElementsByName("titlea")[0]) {
        return pdoc.getElementsByName("titlea")[0].value;
    }
}
function pic () {
    var attachDbPath = C$("attachDbPath").value;
    var attachId = C$("attachId").value;
    var MarkServer = C$("MarkServer").value;
    var attachobj = document.getElementById("attachform")
    //var ServerURl = pdoc.getElementsByName("MarkServerUrl")[0].value;
    var ServerURl = document.getElementsByName("serverDN")[0].value;
    if (ServerURl == "") {
        ServerURl = TS_getServer();
    } else {
        ServerURl = "http://" + ServerURl;
    }
    //attachobj.src = ServerURl+"/"+attachDbPath+"/0/"+attachId+"?opendocument&isYYTP=Y";	
    attachobj.src = ServerURl + "/" + attachDbPath + "/fmGetPic?openform&attachDbPath=" + attachDbPath + "&attachId=" + attachId + "&MarkServer" + MarkServer;

    var tdpic = document.getElementById("tdpic");
    var picobj = document.getElementById("showpic");
    var vidobj = document.getElementById("showvideo");
    var tdsp = document.getElementById("tdsp");
    picobj.style.display = "";
    tdpic.className = "head_form";
    vidobj.style.display = "none"
    tdsp.className = "biao-bg"
}
function sp () {
    var MachineID = document.getElementsByName("MachineID")[0].value;
    if (document.getElementsByName("WebServiceUrl")[0].value == "") {
        alert("未找到设备" & MachineID & "的服务器地址！");
        return false;
    }
    var tdpic = document.getElementById("tdpic");
    var picobj = document.getElementById("showpic");
    var vidobj = document.getElementById("showvideo");
    var tdsp = document.getElementById("tdsp");
    if (vidobj.innerHTML == "") {
        GetVideoUrl_JS();
    }
    picobj.style.display = "none"
    tdpic.className = "biao-bg"
    vidobj.style.display = ""
    tdsp.className = "head_form"
}
function GetVideoUrl_JS () {
    var curid = document.getElementsByName("curid")[0].value;
    var MachineNo = document.getElementsByName("MachineNo")[0].value;
    var MachineID = document.getElementsByName("MachineID")[0].value;
    return RequestWebService(MachineID, curid, "getsealinfo");
}

function NewVideo (obj) {
    var embed = document.createElement("embed");
    embed.style.height = "100%";
    embed.style.width = "300";
    var palyvideo = document.getElementById("palyvideo");
    var showvideo = document.getElementById("showvideo");
    showvideo.style.display = "none";
    embed.src = obj.videourl;
    palyvideo.appendChild(embed);
    var imdel = document.createElement("div");
    imdel.attachEvent("onclick", function () { replay() });
    //imdel.onclick = delimg(attid)
    imdel.innerText = "返回";
    imdel.style.cursor = "hand";
    palyvideo.appendChild(imdel);
}
function replay () {
    var palyvideo = document.getElementById("palyvideo");
    palyvideo.innerHTML = "";
    palyvideo.style.display = "none";
}

function formatRtf (tmpstr) {
    if (tmpstr != "") {
        tmpstr = tmpstr.replace(/\n/gi, "");
        tmpstr = tmpstr.replace(/\r/gi, "");
        tmpstr = tmpstr.replace(/\f/gi, "");
    }
    return tmpstr
}

var loadXML = function (xmlFile) {
    var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE浏览器
        xmlDoc.async = false;
        xmlDoc.loadXML(xmlFile);
    }
    else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) { //火狐浏览器
        //else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
        xmlDoc = document.implementation.createDocument('', '', null);
        xmlDoc.loadXML(xmlFile);
    }
    else { //谷歌浏览器
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", xmlFile, false);
        xmlhttp.send(null);
        if (xmlhttp.readyState == 4) {
            xmlDoc = xmlhttp.responseXML.documentElement;
        }
    }
    return xmlDoc;
}

function RequestWebService (machineid, sealunid, action) {
    var data;
    //SOAP 1.1 请求报文格式，1.2在网上可以找到

    data = '<?xml version="1.0" encoding="utf-8"?>';
    data = data + '<soap:Envelope  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:xsd="http://www.w3.org/2001/XMLSchema"  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    data = data + '<soap:Body>';
    data = data + '<WSMAIN xmlns="http://server.ccb.com/">'; //这里就是发布的方法名和xml文档中的命名空间地址（图中画线部分）
    data = data + '<WSXML >';
    data = data + '<request>'
    data = data + '<item name="action" >' + action + '</item>'
    data = data + '<item name="sealunid" >' + sealunid + '</item>'
    data = data + '<item name="machineid" >' + machineid + '</item>'
    data = data + '</request>'
    data = data + '</WSXML>';
    data = data + '</WSMAIN>';
    data = data + '</soap:Body>';
    data = data + '</soap:Envelope>';
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    var serverUrl = document.getElementsByName("WebServiceUrl")[0].value;
    xmlhttp.Open("POST", serverUrl, false);
    xmlhttp.SetRequestHeader("Content-Type", "text/xml; charset=utf-8"); //SOAP 1.1为text/xml ； 1.2为 application/soap+xml
    xmlhttp.Send(data);
    var returnInfo = xmlhttp.responseText;
    if (returnInfo.indexOf("404") > -1) {
        alert("未找到服务器地址错误404！");
        return false
    }
    var text = xmlhttp.responseText;
    var begin = text.indexOf("<WSMAINReturn>");
    var end = text.lastIndexOf("</WSMAINReturn>");
    text = text.substring(begin + 14, end);
    text = text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#xD;/g, "").replace(/&#xA;/g, "");
    parseResponseData(text);
}

function parseResponseData (xmlFile) {
    var xml = loadXML(xmlFile);

    //提取responsestatus数据
    var FNameNode = xml.selectSingleNode("//response/resxml/item[@name='vidpath']");
    var vidPath = FNameNode.text;
    FNameNode = xml.selectSingleNode("//response/resxml/item[@name='vidname']");
    var vidName = FNameNode.text;
    var videoList = vidName.split("$$");
    var tmpUrl = "";
    for (var i = 0; i < videoList.length; i++) {
        tmpUrl += "<a href=" + vidPath + videoList[i] + " target='_blank'>" + i + "、" + videoList[i] + "</a><br>";
    }
    var vidobj = document.getElementById("showvideo");
    vidobj.innerHTML = tmpUrl;
}


