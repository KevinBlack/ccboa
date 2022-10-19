var id = getUrlParam("id");
var fileId = "";
var cssOffice = new CssOffice();
cssOffice.init("cssOffice", "100%", "100%");
$.ajax({
	url:"/sendOrder/sendOrder/getFileId",
	data:{id:id},
	type: "GET",
	async:false,
	success:function(ret){
		if(ret.msg == 'success'){
            fileId = ret.body.fileId;
		}
	}
});
function onCssOfficeLoadEnd(obj) {
	if(typeof obj !== "undefined" && typeof obj === "object"){
		cssOffice = obj;
	}
	cssOffice.setToolbarAllVisible(true);
	if(fileId != 'undefined' && fileId != ''){
        cssOffice.openFile(serverpath + '/common/file/download?fileId=' + fileId, false);
        qinggao();
	}else{
		layer.msg('未获取正文ID',{time:2000,icon:1});
	}
}

$("#close").click(function(){
	window.close();
});

function qinggao(){
	$.ajax({
		url:"/sendOrder/sendOrder/cleanFile",
		data :{id:id},
		type: "GET",
		success:function(res){
			if (res.code == "0") {
				cssOffice.acceptRevision();
				saveFile('false');
				window.opener.cleanFile();
			}
		}
	});
}

function saveFile(isdel){
	if(id == 'undefined' || id == '' || id == null){
		layer.msg('未获取发文ID',{time:2000,icon:2});
		return;
	}
	
	var ftype = ".docx";
	if(officeType == 2){
		ftype = ".wps";
	}
	var text = cssOffice.getText();
	if(text!=null){
        sizeFact = text.length;
	}
	var url=location.protocol+"//"+location.host+"/servlet/office/save?type=fawen&isdel="+isdel+"&sizeFact="+sizeFact;
	cssOffice.saveURL(url,id + ftype);
}

function onunload(){
	saveFile('false');
}
