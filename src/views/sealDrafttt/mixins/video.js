/*
 * @Author: your name
 * @Date: 2020-12-30 16:49:23
 * @LastEditTime: 2020-12-30 18:07:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \30ccboa\src\views\sealDrafttt\mixins\video.js
 */
var pdoc = window.dialogArguments;
function getYZZHT () {
    return pdoc.getElementsByName("YZZHT")[0].value;
}
function getTitle () {
    return pdoc.getElementsByName("title")[0].value;
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
    //attachobj.src = ServerURl+"/"+attachDbPath+"/"+fmGetPic+"/0/"+attachId+"?opendocument&isYYTP=Y";
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
    var tdpic = document.getElementById("tdpic");
    var picobj = document.getElementById("showpic");
    var vidobj = document.getElementById("showvideo");
    var tdsp = document.getElementById("tdsp");
    if (vidobj.innerHTML == "") {
        vidobj.innerHTML = GetVideoUrl()
        //vidobj.innerText = GetVideoUrl()

    }
    picobj.style.display = "none"
    tdpic.className = "biao-bg"
    vidobj.style.display = ""
    tdsp.className = "head_form"
}

function GetVideoUrl () {
    var curid = document.getElementsByName("curid")[0].value;
    var MachineNo = document.getElementsByName("MachineNo")[0].value;
    var MachineID = document.getElementsByName("MachineID")[0].value;
    // var MachineNo = "CES001";
    var CurBankID = pdoc.getElementsByName("MarkBankId")[0].value;
    var StrViewURL = TS_getPath() + "/agGetMarkVideo?openagent&curid=" + curid + "&MachineNo=" + MachineNo + "&MachineID=" + MachineID + "&CurBankID=" + CurBankID;
    var XMLDoc = new ActiveXObject("Microsoft.XMLDOM");
    XMLDoc.async = false;
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("GET", StrViewURL, false);
    xmlhttp.Send();
    //  alert(xmlhttp.responseXML.xml)
    XMLDoc.loadXML(xmlhttp.responseXML.xml);
    var msg = XMLDoc.selectSingleNode("MsgText");
    if (msg) {
        if (msg.text != "") {
            alert(msg.text);
            return msg.text;
        }
    }
    var MainIdNode = XMLDoc.selectSingleNode("Root");
    //  alert(MainIdNode.text)
    var tmpUrl = ""
    var tmpPath = ""
    if (MainIdNode) {
        if (MainIdNode.text == "false") {
            alert("未能找到" + MachineID + "的服务器地址！");
            return false;
        }

        var videoList = MainIdNode.text.split("$$");
        for (var i = 0; i < videoList.length; i++) {
            if (i == 0) {
                tmpPath = videoList[0]
            } else {

                tmpUrl += "<a href='" + tmpPath + videoList[i] + "' target='_blank'>" + i + "、" + videoList[i] + "</a><br>"
                //tmpUrl += "<a href='"+tmpPath+videoList[i]+"' onclick='NewVideo(this)'>"+i+"、"+videoList[i]+"</a>"
            }
        }
        return tmpUrl;
    }
    else {
        return "";
    }
}
function GetVideoUrl_JS () {
    var curid = document.getElementsByName("curid")[0].value;
    var MachineNo = document.getElementsByName("MachineNo")[0].value;
    var MachineID = document.getElementsByName("MachineID")[0].value;
    // var MachineNo = "CES001";
    var CurBankID = pdoc.getElementsByName("CurBankID")[0].value;
    var StrViewURL = TS_getPath() + "/agGetMarkVideo?openagent&curid=" + curid
        + "&MachineNo=" + MachineNo + "&MachineID=" + MachineID + "&CurBankID=" + CurBankID;
    var XMLDoc = new ActiveXObject("Microsoft.XMLDOM");
    XMLDoc.async = false;
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("GET", StrViewURL, false);
    xmlhttp.Send();
    XMLDoc.loadXML(xmlhttp.responseXML.xml);
    var msg = XMLDoc.selectSingleNode("MsgText");
    if (msg) {
        if (msg.text != "") {
            alert(msg.text);
            return msg.text;
        }
    }
    var MainIdNode = XMLDoc.selectSingleNode("Root");
    //  alert(MainIdNode.text)
    var tmpUrl = ""
    var tmpPath = ""
    if (MainIdNode) {
        if (MainIdNode.text == "false") {
            alert("未能找到" + MachineID + "的服务器地址！");
            return false;
        }

        var videoList = MainIdNode.text.split("$$");
        for (var i = 0; i < videoList.length; i++) {
            if (i == 0) {
                tmpPath = videoList[0]
            } else {

                tmpUrl += "<a href='" + tmpPath + videoList[i] + "' target='_blank'>" + i + "、" + videoList[i] + "</a><br>"
                //tmpUrl += "<a href='"+tmpPath+videoList[i]+"' onclick='NewVideo(this)'>"+i+"、"+videoList[i]+"</a>"
            }
        }
        return tmpUrl;
    }
    else {
        return "";
    }
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


var loadXML = function (xmlFile) {
    var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE浏览器
        xmlDoc.async = false;
        xmlDoc.load(xmlFile);
    }
    else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) { //火狐浏览器
        //else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
        xmlDoc = document.implementation.createDocument('', '', null);
        xmlDoc.load(xmlFile);
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
    var URL = "http://127.0.0.1:8989/SEALWEBSERVICE?WSDL";
    xmlhttp.Open("POST", URL, false);
    xmlhttp.SetRequestHeader("Content-Type", "text/xml; charset=utf-8"); //SOAP 1.1为text/xml ； 1.2为 application/soap+xml
    xmlhttp.Send(data);
    //alert(data);//SOAP请求报文格式  
    parseResponseData(xmlhttp.responseText);

}

function parseResponseData (xmlFile) {
    var xml = loadXML(xmlFile);
    //提取responsestatus数据  
    if (xml.getElementsByTagName('responsestatus') == "100") {
        var vidpath = xml.selectSingleNode("item[@name='vidpath']").text;
        var vidname = xml.selectSingleNode("item[@name='vidpath']").text;
    }
}