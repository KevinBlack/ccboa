/*
 * @Author: your name
 * @Date: 2021-01-09 15:59:58
 * @LastEditTime: 2021-06-10 15:43:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \30ccboa\src\views\sealDrafttt\mixins\maintain.js
 */
//===================================================维护按钮===================================
var dangban = 0;
var objShell = new ActiveXObject("CcbSrvc.Document");
//var maintainTypes = document.getElementsByName("maintainType");;
var whSign = document.getElementsByName("WHsign")[0].value; // 获取维护标记
var regText = document.getElementsByName("MachineRegNum")[0].value;
var MachineType = document.getElementsByName("MachineType")[0].value;   //机器类型（有存储，无存储（第一批旧设备））
var maintainType = getItemText("maintainType");   // 获取选择的维护类型
var MachineID = document.getElementsByName("MachineID")[0].value;
document.getElementsByName("MarkDocId")[0].value = document.getElementsByName("docunid")[0].value;
// 选择初始配章、故障维护时控制维护及维护完成按钮显示
// 维护接口
var strPath = "C:\\CCBWEBOA_SealIMG";
var strJobID = document.getElementsByName("docunid")[0].value;
var strPassword = "123456";
var State = 0;
var SealService;
if (regText == "" && MachineType == "") {
	regText = getRegTxt(objShell);
	if (regText == "") {
		return false;
	}
	var regList = regText.split("|");
	MachineType = regList[1];
	regText = regList[0];
}
//alert(maintainType)
if (maintainType == "安装印章") {
	if (MachineType != 1) {
		objShell.SealService(1, strPath, strJobID, strPassword, regText);
	} else {
		objShell.SealService(1, strPath, strJobID, strPassword, regText, MachineID);
	}
} else {
	if (MachineType != 1) {
		objShell.SealService(0, strPath, strJobID, strPassword, regText);
	} else {
		objShell.SealService(0, strPath, strJobID, strPassword, regText, MachineID);
	}
}
State = objShell.SealGetState();
if (State != 1) {
	return false;
}
if (maintainType == "手工用印" || maintainType == "卸载印章") {
	if (MachineType != 1) {
		alert("请在确定后，10秒内打开机器锁!");
		var SealUnlock = objShell.SealUnlock(strPassword, regText);
		var returnstr = objShell.SealDetectExit();
		if (returnstr == 257) {
			alert("机械锁未打开，请联系管理员")
			return false;
		}
		if (returnstr == 256) {
			var time = window.setInterval(function () {
				displalyTime(time, objShell, strPassword, regText);
			}, 1000);
		}
	} else {
		var closeType = "0"
		if (maintainType == "卸载印章") {
			closeType = "1"
		}
		var closeTime = "0"
		if (C$("SealcloseTime").value != "") {
			closeTime = C$("SealcloseTime").value
		}
		var nSealPos = getSealPos()

		var ServerName = C$("DominoServerName").value;
		var curdocid =
			DBpath = document.all("DataBase").value;
		var obj = function () {
			this.objShell;
			this.window;
		};
		obj.window = window;
		obj.objShell = objShell;
		var WHsign = "1";
		if (C$("startTime1").value != "") {
			WHsign = "2";
		}
		var destname = "http://" + ServerName + "/" + DBpath + "/"
			+ "fmSelectOpenDoor?openform&nSealPos=" + encodeURIComponent(nSealPos) + "&closeTime=" + closeTime + "&closeType=" + closeType + "&WHsign=" + WHsign + "&docid=" + strJobID;
		var Str1 = window.showModalDialog(destname, obj,
			"dialogWidth=300px;dialogHeight=120px;status=0;location=no;help=no;scroll=no");

		if (Str1 == "OK") {
			/*
			document.getElementsByName("WHsign")[0].value = "1";
			C$("Action").value = "maintainDoc";
			document.all("formsave").click();
			*/

			objShell = null
			var bg = document.all("startTime1").value;
			var eb = document.all("closeTime1").value;
			C$("endTime").value = eb;
			var strbg = bg.replace(/-/g, "/");
			var stred = eb.replace(/-/g, "/");
			var datebg = new Date(strbg);
			var dateed = new Date(stred);
			var date3 = dateed.getTime() - datebg.getTime();
			//计算出相差天数
			var days = Math.floor(date3 / (24 * 3600 * 1000))
			//计算出小时数
			var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
			var hours = Math.floor(leave1 / (3600 * 1000))
			//计算相差分钟数
			var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
			var minutes = Math.floor(leave2 / (60 * 1000))
			//计算相差秒数
			var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
			var seconds = Math.round(leave3 / 1000)
			document.getElementsByName("shgTime")[0].value = days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒";
			//
			C$("Action").value = "maitainDocwc";
			aa1();
		} else {
			aa1();
		}
	}

} else if (maintainType == "安装印章") {
	//alert("open初始配章")
	whInit(1, objShell);
} else if (maintainType == "故障维修") {
	//alert("open故障维修")
	whInit(0, objShell);
}
objShell = null;
//===============================================================================================================================

// objShell维护接口对象、dlgwhInit弹出表单里是objShell.SealShowWindow();

function whInit (status, objShell) {
	var Server_Name = document.getElementsByName("Server_Name")[0].value;
	var DataBase = document.getElementsByName("DataBase")[0].value;
	Path = "http://" + Server_Name + "/" + DataBase + "/dlgwhInit?OpenForm&status=" + status;
	var vRtn = showModalDialog(Path, objShell, "help:no; status:no; scroll:no; dialogWidth:800px; dialogHeight:300px");
	if (vRtn == "ok") {
		document.getElementsByName("WHsign")[0].value = "1";
		C$("Action").value = "maintainDoc";
		document.all("formsave").click();
	}
}


//============================取出印章按钮功能
var strPassword = document.getElementsByName("strPassword")[0].value;
var regText = document.getElementsByName("regText")[0].value;
var DoorTime = document.getElementsByName("DoorTime")[0].value;
var docid = document.getElementsByName("docid")[0].value;
var nSealPos = document.getElementsByName("nSealPos")[0].value;
var closeType = document.getElementsByName("closeType")[0].value;
var dbdbpath = obj.window.document.getElementsByName("DataBase")[0].value;
var destname = '/' + dbdbpath + "/agGetWeiHuTime?openagent";
document.getElementById("midtable").style.display = "none"
document.getElementById("tsmsg").style.display = "";

try {
	//var State=objShell.SealUnlock(strPassword,regText,DoorTime);
	if (obj.window.document.getElementsByName("startTime1")[0].value == "") {
		obj.window.document.getElementsByName("startTime1")[0].value = obj.window.getServerTime(destname);
	}
	var State = obj.objShell.SealRemove(DoorTime, nSealPos, docid, closeType);
} catch (e) {
	document.getElementById("midtable").style.display = ""
	document.getElementById("tsmsg").style.display = "none";
}

if (State != "") {
	alert("取出印章完成！")
	obj.window.document.getElementsByName("closeTime1")[0].value = obj.window.getServerTime(destname);
	obj.window.aa("1")
	window.returnValue = "OK";
	closeWindow();
} else {
	document.getElementById("midtable").style.display = ""
	document.getElementById("tsmsg").style.display = "none";
}

//=================================放入印章功能

var strPassword = document.getElementsByName("strPassword")[0].value;
var regText = document.getElementsByName("regText")[0].value;
var DoorTime = document.getElementsByName("DoorTime")[0].value;
var docid = document.getElementsByName("docid")[0].value;
var nSealPos = document.getElementsByName("nSealPos")[0].value;
var dbdbpath = obj.window.document.getElementsByName("DataBase")[0].value;
var destname = '/' + dbdbpath + "/agGetWeiHuTime?openagent";
try {
	//var State=objShell.SealUnlock(strPassword,regText,DoorTime);
	obj.window.document.getElementsByName("startTime1")[0].value = obj.window.getServerTime(destname);
	var State = obj.objShell.SealInto(DoorTime, nSealPos, docid)
} catch (e) {
	return false;
}
if (State != "") {
	//DoorTime = DoorTime * 60 * 1000
	//setTimeout("msg()",DoorTime)
	alert("放入印章完成！");
	obj.window.document.getElementsByName("closeTime1")[0].value = obj.window.getServerTime(destname);
	obj.window.aa("1")
	window.returnValue = "OK";
	closeWindow();
} else {
	//alert("放入有印章异常！");
}
//=====================================关闭安全门

var strPassword = document.getElementsByName("strPassword")[0].value;
var regText = document.getElementsByName("regText")[0].value;
var DoorTime = document.getElementsByName("DoorTime")[0].value;
var docid = document.getElementsByName("docid")[0].value;
var nSealPos = document.getElementsByName("nSealPos")[0].value;
var dbdbpath = obj.window.document.getElementsByName("DataBase")[0].value;
var destname = '/' + dbdbpath + "/agGetWeiHuTime?openagent";
try {
	//var State=objShell.SealUnlock(strPassword,regText,DoorTime);
	if (obj.window.document.getElementsByName("startTime1")[0].value == "") {
		obj.window.document.getElementsByName("startTime1")[0].value = obj.window.getServerTime(destname);
	}
	var State = obj.objShell.SealCloseLock()
} catch (e) {
	return false;
}
if (State == "0" || State == 0) {
	//DoorTime = DoorTime * 60 * 1000
	//setTimeout("msg()",DoorTime)
	alert("完成！");
	obj.window.document.getElementsByName("closeTime1")[0].value = obj.window.getServerTime(destname);
	obj.window.aa("1")
	window.returnValue = "OK";
	closeWindow();
} else {
	//alert("放入有印章异常！");
}




