var id = '';
var type = "";
var module = '';
var fId = '';
var fileId = "";
var currNode = '';
var currentUser =  '';
var officeReadonly = '';
var leadinto = '';
var limitWords = '';
var workflowId = '';
var fromYun = '';
var volumeId = '';
var cloudFileId = '';
var formPage = '';
if(formPage) formPage = formPage.split(',');
var cssOffice = new CssOffice();
var ftype = ".docx";
var patten = 0;
var print = false;
var isSaveAs = false;
var isLimt = false;
var isSaved = false;
var saveFile = true;
var saveClick = 0;
var isChangPatten = false;
$(function() {
	// 默认隐藏文本校对按钮
	hideBtn();
	// 校验是否有显示权限
	showBtn();
})

//重新引入 按钮
if(fromYun){
	$("#reImportFile").show();
	$("#reImportFile").click(function(){
		window.opener.$('#fromYunDoc').show();
		window.opener.fromYunDoc(leadinto);
        window.close();
	});
}else{
	$("#reImportFile").hide();
}

//文本校对按钮显示
function showBtn() {
	$datas.use(function(cuser) {
		if (currNode == "draft" && cuser.hasPost("show_compare")) {
			$('#proofreadSetting').show();
			$('#proofreadShowStudy').show();
			$('#proofreadShowResult').show();
			$('#proofreadBtn').show();
		}
	})
}
// 文本校对按钮隐藏
function hideBtn(){
	$('#proofreadSetting').hide();
	$('#proofreadShowStudy').hide();
	$('#proofreadShowResult').hide();
	$('#proofreadBtn').hide();
}
//根据文件ID获取正文ID
if(module && (module == "tuiwen" || module == "compel")){
	fileId = fId;
	if(module == "compel"){
		type = 'ofd';
	}
} else {
	if(formPage && formPage[0] != 'undefined'){
		fileId = formPage[3];
		$.ajax({
			url:"/sendOrder/sendOrder/getFileId",
			data:{id:id},
			type: "GET",
			async:false,
			success:function(ret){
				if(ret.msg == 'success'){
					type = ret.body.fileType;
				}
			}
		});
	}else{
		if(fromYun){
			fileId = '';
		}else{
			$.ajax({
				url:"/sendOrder/sendOrder/getFileId",
				data:{id:id},
				type: "GET",
				async:false,
				success:function(ret){
					if(ret.msg == 'success'){
						fileId = ret.body.fileId;
						type = ret.body.fileType;
					}
				}
			});
		}
		
	}
}

if(typeof(workflowId) != 'undefined' && workflowId != '' && workflowId != null){
	$.ajax({
		url:"/workflow/findWorkflowStatus",
		data:{workflowId:workflowId},
		type: "GET",
		async:false,
		success:function(data){
			if(data.data.parentId==undefined){
				isChangPatten=true;
			}
			
		}
	});
}
//根据流程ID判断是否具有打印权限
$.ajax({
	url:"/common/file/filePrint",
	data:{workflowId:workflowId},
	type: "GET",
	async:false,
	success:function(ret){
		if(ret.code == 'success'){
			print = true;
		}
	}
});
$.ajax({
	url:"/common/file/fileSaveAs",
	data:{workflowId:workflowId},
	type: "GET",
	async:false,
	success:function(ret){
		if(ret.code == 'success'){
			isSaveAs = true;
		}
	}
});
if(officeType == 2){
	ftype = ".wps";
}
if(type == 'ofd'){
	$.ajax({
		url:"/common/file/getAccessToken",
		type: "GET",
		async:false,
		success:function(ret){
			var token = ret.data;
			openOFDFile(serverpath + '/common/file/download?fileId='+fileId+'&access_token='+token, "cssOffice",$("#cssOffice").width(),$("#cssOffice").height(), "showTablet",print);
		}
	});
}else{
	cssOffice.init("cssOffice", "100%", "100%",print);

	if(print){
		$('#print').show();
	}
	if(isSaveAs && currNode == 'send'){
		$('#saveAs').show();
	}
}
function onCssOfficeLoadEnd(obj) {
	if(typeof obj !== "undefined" && typeof obj === "object"){
		cssOffice = obj;
	}
	cssOffice.setToolbarAllVisible(true);
	if(typeof fileId != 'undefined' && fileId != ''){
		if(officeReadonly=="true"){
            cssOffice.openFile(serverpath + '/common/file/download?fileId=' + fileId, true);
		}else{
            $('#save').show();
			cssOffice.openFile(serverpath + '/common/file/download?fileId=' + fileId, false);
		}
	}else{
        $('#save').show();
        if (leadinto == 'true') {
        	cssOffice.selectLocalFile();
        } else {
        	if(fromYun == 'fromYun' ){
        		cssOffice.openFile(serverpath + '/common/file/download?fileId=template_fw_&access_token='+localStorage.getItem("access_token_kingsoft")+'&volumeId='+volumeId+'&cloudFileId='+cloudFileId, false);
       
        	} else {
        		cssOffice.openFile(serverpath + '/common/file/download?fileId=template_fw_', false);
        	}
        	
        }
	}
	if((formPage && formPage[0] != 'undefined') || typeof fileId == 'undefined' || fileId == '' ){
        if(typeof(limitWords) != 'undefined' && limitWords > 0){
        	layer.open({scrollbar:false,
                type: 1,
                title: '友情提示:',
                area: ['480px', '200px'],
                content:'根据建行党委要求，此类文件正文字数不得超过'+limitWords+'字，请拟稿时注意。',
                btn: ['确定'],
                btn1: function (index, layero) {
                	layer.close(index);
                }
            });
        }
	}
	$datas.use(function (workflow) {	
        var history = workflow.history();
        if(history.length > 1){
        	cssOffice.enableRevision(true);
    		cssOffice.setUserName(currentUser);
        }else if(history.length == 1 && officeReadonly == 'false'){
			$('#importLocal').show();
		}
	}, workflowId);
	if(isChangPatten){
		$('#changPatten').show();
	}
	cssOffice.showPatten(patten);
	cssOffice.enableRightButton();
	//设置自动保存
	setInterval(autoSaveFile,1000*60);
}

$("#changPatten").click(function(){
	patten = 1 - patten;
	cssOffice.showPatten(patten);
	if(patten == 1){
		$("#changPatten").html("隐藏修改痕迹");
	}else{
		$("#changPatten").html("显示修改痕迹");
	}
});

$("#importLocal").click(function(){
	cssOffice.selectLocalFile();
});

$("#close").click(function(){
	if(type == 'ofd'){
		saveFile = false;
		window.close();
		return;
	}

	if(officeReadonly=="true"){
		saveFile = false;
		window.close();
		return;
	}
	isSaved = cssOffice.IsSaved();
	if(formPage){
		leadinto = "true";
	}
	
    if(isSaved && !((leadinto == "true" || leadinto == "yun") && saveClick == 0)){
    	saveFile = false;
    	window.close();
		return;
    }else{
    	layer.open({scrollbar:false,
            type: 1,
            title: '正文没有保存，是否确认关闭.',
            area: ['680px', '200px'],
            content:  '',
            btn: ['确定', '取消'],
            btn1: function (index, layero) {
            	saveFile = false;
            	window.close();
            	
            },
            btn2:function (index,layero) {

            }
        });
    }
});

$("#print").click(function(){
	cssOffice.printPreview();
});

$("#saveAs").click(function(){
	cssOffice.saveAs();
});


$("#save").click(function(){                                                         
	if(id == 'undefined' || id == '' || id == null){
		layer.alert('未获取发文ID', {icon: 1});
		return;
	}
	
	var wordSize = cssOffice.wordSize();
    var sizeFact=0;
	if(wordSize != null && wordSize > 0){
        sizeFact = wordSize;
	}
    
    if(sizeFact < 10){
    	layer.open({scrollbar:false,
            type: 1,
            title: '正文字数小于10,是否继续保存.',
            area: ['680px', '200px'],
            content:  '',
            btn: ['确定', '取消'],
            btn1: function (index, layero) {
            	
            	window.opener.reasonHide();
            	var url=location.protocol+"//"+location.host+"/servlet/office/save?type=fawen&sizeFact="+sizeFact;
            	cssOffice.saveURL(url,id + ftype);
            	window.opener.changeDraft();
            	layer.closeAll();
            	saveClick = 1;
            	if(formPage){
            		taoyongSave()
            	}
            	layer.msg('保存成功', {time: 2000,icon:1}, function () {});
            },
            btn2:function (index,layero) {

            }
        });
    }else{
    	
    	if(limitWords > 0 && sizeFact > limitWords){
    			window.opener.reasonShow();
    		
        }else{
        	
        		window.opener.reasonHide();
        
        }
    	
    		
    	window.opener.changeDraft();
    	var url=location.protocol+"//"+location.host+"/servlet/office/save?type=fawen&sizeFact="+sizeFact;
    	cssOffice.saveURL(url,id + ftype);
    	saveClick = 1;
    	if(formPage){
    		taoyongSave()
    	}
    	layer.msg('保存成功', {time: 2000,icon:1}, function () {});
		window.opener.writeFact(sizeFact);
    }
});

function autoSaveFile(){
	if(officeReadonly=="true"){
		return;
	}
	var wordSize = cssOffice.wordSize();
    var sizeFact=0
	if(wordSize != null && wordSize > 0){
        sizeFact = wordSize;
	}
    var url=location.protocol+"//"+location.host+"/servlet/office/save?type=fawen&sizeFact="+sizeFact;
	if(!cssOffice.IsModified() && id){
		cssOffice.saveURL(url,id + ftype);
	}
}

function onunload(){
	
}

function __on_close__(){
	if(officeReadonly=="false" && saveFile){
		var wordSize = cssOffice.wordSize();
	    var sizeFact=0
		if(wordSize != null && wordSize > 0){
	        sizeFact = wordSize;
		}
		var url=location.protocol+"//"+location.host+"/servlet/office/save?type=fawen&sizeFact="+sizeFact;
		cssOffice.saveURL(url,id + ftype);
		window.opener.changeDraft();
        if(limitWords > 0 && sizeFact > limitWords){
        	window.opener.reasonShow();
        	
        }else{
        	window.opener.reasonHide();
        
        }
    }
}

//套用后保存方法
function taoyongSave(){
	$.ajax({
		url:"/queryMuban/list/taoyong",
		methods:"post",
		data:{
			mubanId:formPage[0],
			fileType:formPage[1],
			fileId:formPage[2],
			wenjianId:formPage[3],
		},
		success:function(res){
			
		}
	})
}
