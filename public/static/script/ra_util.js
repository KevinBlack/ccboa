/** 
 * @desc YGQD交易上收为远程集中授权公共js
 * 		 需要集中授权的交易页面自主引入该JS，引用顺序在公共jsloader后
 * @author xiefc
 * 
 */
var RA_UTIL = 	RA_UTIL || {
	ra_loading:null,
	reauth_tmp_id : "REAUTH_TMP_DATA_VALUE",
	/** 基于PJF.util.json2str修改用于sentEvent的json2str方法 */
	handler_json2str : function (o){
		if(!o)
			return '';
		var arr = [];
		var fmt = function(s) {
			if (typeof s == 'object' && s != null) {
				return RA_UTIL.handler_json2str(s);
			}
			return /^(string|number)$/.test(typeof s) ? '"' + s + '"' : s;
		}
		if(o.constructor === Array ){
			for ( var i in o) {
				if(typeof o[i] == "string"){
					o[i]=o[i].replace(new RegExp("\\\\", 'gm'),"\\\\");
					o[i]=o[i].replace(new RegExp("\'", "gm"), "\\'");
					o[i]=o[i].replace(new RegExp("\"", "gm"), "\\\"");
					o[i]=o[i].replace(new RegExp("\n", 'gm'),"\\n");
					o[i]=o[i].replace(new RegExp("\r", 'gm'),"\\r");

				}
				
				arr.push(fmt(o[i]));
			}
			return "[" + arr.join(',') + "]";
		}
		else{
			for ( var i in o) {
				if(typeof o[i] == "string"){
					o[i]=o[i].replace(new RegExp("\\\\", 'gm'),"\\\\");
					o[i]=o[i].replace(new RegExp("\'", "gm"), "\\'");
					o[i]=o[i].replace(new RegExp("\"", "gm"), "\\\"");
					o[i]=o[i].replace(new RegExp("\n", 'gm'),"\\n");
					o[i]=o[i].replace(new RegExp("\r", 'gm'),"\\r");
				}
				arr.push('"' + i + '":' + fmt(o[i]));
			}
			return "{" + arr.join(',') + "}";
		} 
	},
	/** 初始化loading遮罩层 */
	initLoading:function (){
		RA_UTIL.ra_loading = new PJF.ui.loading({ 
			maskBody: true,
			text: "授权进行中..."
		});
		try{
			console.log("初始化initLoading完成======================");
		}catch(e){
			
		}
	},
	/** 销毁loading遮罩层 */
	destroyLoading:function(){
		if(RA_UTIL.ra_loading){
			RA_UTIL.ra_loading.destroy();
			RA_UTIL.ra_loading = null;
		}
		try{
			console.log("销毁遮罩层destroyLoading完成======================");
		}catch(e){
			
		}
	},
	/**
	 * 将交易数据 传进来进行添加处理，包括需要添加的字段，以及判断是否存在授权拒绝后再次提交的情况
	 * @param data 原始交易数据
	 * @param params 需要新加的数据
	 */
	dealSubmitData:function(data,params){
		if(params && typeof params == "object"){
			for(var k in params){
				data[k] = params[k];
			}
		}else{
			alert("参数：params不正确，请应用检查！");
			return;
		}
		try{
			if(PJF.html.getDom(RA_UTIL.reauth_tmp_id) ){
				var tmp = eval("("+PJF.html.getDom(RA_UTIL.reauth_tmp_id).value+")");
				if(tmp && typeof tmp =="object"){
					for(var t in tmp){
						data[t]=tmp[t];
					}
				}
			}
		}catch (e){
			alert("RA_UTIL填充拒绝后再次提交要素失败！");
		}
		
		return data;
	},
	
	/** 授权申请发起后续处理 
	 * @param transJson原交易数据
	 * @param reTransFunc交易重发回调
	 * @param 二次授权后端通过授权数据
	 */
	resultHandler:function(transJson,reTransFunc,srvAutData){
		//首先判断下后续处理函数是否正确，该参数为必填项
		if(!(reTransFunc && typeof reTransFunc == "function")){
			new PJF.ui.messageBox({
				style : 'warning',
				title : '提示',
				content : '请传入远程授权成功后交易提交函数！'
			});
			return;
		}
		//事件订阅，处理授权成功P2S发回的事件消息
		PJF.communication.client.registerEvent('ECP_AUT');
		//事件订阅，处理授权采集页面返回的事件消息
		PJF.communication.client.registerEvent('P2AUTH_SCANPAGE_HANDLER');
		
		//监听事件处理函数
		PJF.communication.handleEvent=function(data){ 
			var jsonData = eval("(" + data + ")");
			if(jsonData.AUTH_SEQ_NO != RA_UTIL.authSeqNo){
				return;
			}
			var autMsgHandleType = jsonData.autMsgHandleType;
			var autMsgAuthFlag = jsonData.autMsgAuthFlag;
			if(autMsgHandleType == "ECP_AUT" && autMsgAuthFlag == "1"){
				//该部分逻辑处理一次授权成功
				//如果走到这里，表明交易提交被拦截，并已经授权通过
				//由P2S控制，以此路劲返回的消息只可能是授权通过及 jsonData.APP_RES_RSLT的值肯定为2
				
				transJson["_inte_trl_auth"] = "1"; //柜外清通过标志，如果一次授权都通过了，表明柜外清已经在初次提交交易的时候通过了
				transJson["AUTH_AUDIT_TAG"] = "1"; //交易数据中新加这个字段，则通过P2S拦截器，这个步骤很关键，不然会循环在P2S授权拦截步骤
				reTransFunc(transJson, jsonData);
				
			}else if(autMsgHandleType == "ECP_AUT" && autMsgAuthFlag == "2"){
				//进入该部分表示二次授权成功返回
				//2.1期间不考虑！！！！！
				transJson["_inte_trl_auth"] = "1"; //柜外清通过标志，如果一次授权都通过了，表明柜外清已经在初次提交交易的时候通过了
//				将能够通过P2S授权拦截的transJson["AUTH_AUDIT_TAG"] = "1";  及后端记账系统授权拦截的信息携带后提交交易
				transJson["AUTH_AUDIT_TAG"] = "1";
//				transJson 中加入srvAutData数据
				if(srvAutData && typeof srvAutData == "object"){
					for(var k in srvAutData){
						transJson[k] = srvAutData[k];
					}
				}else {
					alert("参数'srvAutData'应该为json对象！");
				}
				
				reTransFunc(transJson, jsonData);
				
			}else if(autMsgHandleType == "P2AUTH_SCANPAGE_HANDLER"){
				//该部分逻辑处理授权采集页面发送的其他情况，如撤销，取消，交易异常等
				var result = jsonData.APP_RES_RSLT; //授权采集页面根据该字段确定返回情况
				
				if(result == "6"){ // 授权拒绝
					//提示并解锁
					RA_UTIL.destroyLoading();
					new PJF.ui.messageBox({
						style : 'warning',
						title : '提示',
						content : '远程授权拒绝，拒绝原因：'+jsonData.APP_RES_INFO1,
						fn:function(){
							
						}
					});
					//记录相关数据，便于后续再次提交授权的时候使用
					if(PJF.html.getDom(RA_UTIL.reauth_tmp_id) == undefined){
						var winDiv = document.createElement('input');
						document.body.appendChild(winDiv);   
						winDiv.setAttribute('id',RA_UTIL.reauth_tmp_id);
						winDiv.setAttribute('type',"hidden");
					}
					var reauth_tmp = {};
					reauth_tmp["AUTH_TLR_NO"]=jsonData.APP_RES_TELLERNO;
					reauth_tmp["AUTH_TLR_ID"]=jsonData.APP_RES_TELLERID;
					reauth_tmp["REFUSE_REASON"]=jsonData.APP_RES_INFO1;
					//设置值
					PJF.html.getDom(RA_UTIL.reauth_tmp_id).value=PJF.util.json2str(reauth_tmp);
					
					return;
				}else if(result == "4" || result == "b"){ //授权撤销，授权取消
					//只做解锁操作
					RA_UTIL.destroyLoading();
				}else if(result=="a" || result == "c"){
					RA_UTIL.destroyLoading(); //首先将ra_util提供的锁屏解锁
					if(PJF.html.getDom(PJF.loadResource.PJF_LOAD_RESOURCES_DOM_ID) == undefined){
						var winDiv = document.createElement('div');
						document.body.appendChild(winDiv);   
						winDiv.setAttribute('id',PJF.loadResource.PJF_LOAD_RESOURCES_DOM_ID);
					}   	   
					//新建window，打开本终端授权P2S返回的本地授权弹出页
					new PJF.ui.window({
						dom : PJF.loadResource.PJF_LOAD_RESOURCES_DOM_ID,
						id : PJF.loadResource.PJF_LOAD_RESOURCES_ID,
						title : '本终端授权',
						width : 640,
						height : 320,
						url : CONTEXT_PATH + jsonData._TO_SAME_URL,
						cache : false
					});
					
				}else {
					new PJF.ui.messageBox({
						style : 'warning',
						title : '提示',
						content : '未知返回，请检查，result='+result
					});
				}
//					6	授权拒绝
//					4	授权撤销
//					7	异常退票   异常退票为重复交易情况发生，暂时不考虑该情况
//					a   转本终端授权
//					b   授权取消
//					c   系统异常转本终端授权
//				授权撤销4，授权取消b两种情况仅作页面解锁处理
//				授权拒绝6，需要展示授权拒绝理由并解锁
//				！！！！！！！！！a和c需要将交易进行本终端授权处理
			}
			
		};
	},
	/** 反馈授权采集页面交易结果 */
	tellAuthTransRst:function(params, afterSucc){
		var reply = {};//根据接口填充
   	 	reply["APP_MSG_TYPE"] = "R";
       	reply["AUTH_SEQ_NO"] = params.AUTH_SEQ_NO;
       	reply["APP_HOST_SQNO"] = params.APP_HOST_SQNO;//交易流水号
       	reply["APP_HOST_STAT"] = params.APP_HOST_STAT;//交易成功，0成功，1失败，2异常
       	reply["APP_REQ_SYS"] = "03";
       	//以上数据假设交易成功，实际情况根据P8/P6返回情况决定
   	 	PJF.communication.client.sendEvent("P2AUTH_APPTRANS_HANDLER",RA_UTIL.handler_json2str(reply));
   	 	//交易屏幕解锁，完成该交易后续操作，如提示等
		RA_UTIL.destroyLoading();
		if(afterSucc && typeof afterSucc == "function"){
			afterSucc();
		}else {
			new PJF.ui.messageBox({
				style : 'warning',
				title : '提示',
				content : '缺少交易成功后续回调函数！'
			});
		}
	},
	/**  反馈授权采集页面进行二次授权提交 */
	tellAuthSecondRA:function(params){
		var reply = {};//根据接口填充
		reply["APP_MSG_TYPE"] = "B"; 
		reply["AUTH_FLAG"] = "2";
		reply["AUTH_SEQ_NO"] = params.AUTH_SEQ_NO; //授权流水号
		reply["AUTH_TLR_NO"] = params.APP_RES_TELLERNO; //后台授权12位dcc号
		reply["AUTH_TLR_ID"] = params.APP_RES_PRENTELID; //后台授权8位员工号
		reply["SND_AUTH_RSN"] = params.REAUTH_REASON; 
		//只需要进行通知，不做其他处理
		PJF.communication.client.sendEvent("P2AUTH_APPTRANS_HANDLER",RA_UTIL.handler_json2str(reply));
	}
}