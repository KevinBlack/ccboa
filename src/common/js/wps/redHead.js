var id = getUrlParam("id");
var templateFileId = getUrlParam("templateFileId");
var patten = 0;
var cssOffice = new CssOffice();
cssOffice.init("cssOffice", "100%", "100%");
var reg = new RegExp("[,.; 、，。；]$","gmi");

function onCssOfficeLoadEnd(obj) {
	if(typeof obj !== "undefined" && typeof obj === "object"){
		cssOffice = obj;
	}
	cssOffice.setToolbarAllVisible(true);
	if(templateFileId != 'undefined' && templateFileId != ''){
		$.ajax({
			url: "/sendOrder/sendOrder/toEdit",
            type: "post",
            data: {id: id},
			async:false,
			success:function(res){
				var data = res.body;
				var curDate = new Date();
				var comTime = data.completeTime;
				cssOffice.openFile(serverpath + '/common/file/download?fileId='+templateFileId, false);
				cssOffice.insertDocument("正文", serverpath + '/common/file/download?fileId='+data.bodyRecordId);
				cssOffice.setDocumentField('秘密类型',data.secretType);
				if(data.secretType.indexOf('商') > -1 && data.secretType.indexOf('密') > -1){
					var secretContent = data.secretFlagContent;
					if(secretContent.indexOf("-") > -1){
						secretContent = formatDate(secretContent);
					}else if(data.secretLimitType != '解密条件'){
						secretContent = secretContent+data.secretTimeType;
					}
					cssOffice.setDocumentField('秘密等级',data.secretFlagType+"☆"+secretContent.replace('年年','年').replace('前年','前').replace('开年','开'));
				}else if(data.secretType.indexOf('内部') > -1){
					cssOffice.setDocumentField('秘密等级',data.secretFlag);
				}else{
					cssOffice.setDocumentField('秘密等级','');
				}
				
				cssOffice.setDocumentField('紧急程度',data.emergencyLevel);
				//会议纪要文号特殊处理  显示(第9期) 行长办公会会议纪要显示(2019第9期)
				if(data.type == '会议纪要' || data.type == '工作简报'){
					if(data.redHead == '行长办公会议纪要'){
						cssOffice.setDocumentField('文号',data.documentNo.substring(data.documentNo.indexOf('〔')+1).replace('〕','年'));
					}else{
						cssOffice.setDocumentField('文号',data.documentNo.substring(data.documentNo.indexOf('〕')+1));
					}
				}else{
					cssOffice.setDocumentField('文号',data.documentNo);
				}
				//cssOffice.setDocumentField('文号',data.documentNo.replace('号','').replace('期',''));
				cssOffice.setDocumentField('标题',data.title.replace('（'+data.directRange+'）',''));
				cssOffice.setDocumentField('主送',data.mainIds.replace(reg,''));
				cssOffice.setDocumentField('拟稿部门',data.sendUnitName);
				if(data.attachTitle != ''){
					cssOffice.setDocumentField('附件','附件：');
					cssOffice.setDocumentField('附件标题',data.attachTitle);
				}else{
					cssOffice.setDocumentField('附件','');
					cssOffice.setDocumentField('附件标题','');
				}
				if(typeof(data.directRange) != 'undefined' && data.directRange != ''){
					cssOffice.setDocumentField('直发范围','（'+data.directRange+'）');
				}else{
					cssOffice.setDocumentField('直发范围','');
				}
				if(typeof(comTime) != 'undefined' && comTime != ''){
					cssOffice.setDocumentField('成文日期',formatDate(comTime));
				}
				if(data.copyIds != ''){
					cssOffice.setDocumentField('抄送','抄送：'+data.copyIds.replace(reg,'')+'。');
				}else{
					cssOffice.setDocumentField('抄送','');
				}
				if(data.inlineIds != ''){
					cssOffice.setDocumentField('本行发送','本行发送：'+data.inlineIds.replace(reg,'')+'。');
				}else{
					cssOffice.setDocumentField('本行发送','');
				}
				cssOffice.setDocumentField('主办单位',data.hostDepartment);
				cssOffice.setDocumentField('拟稿人',data.draftUser);
				cssOffice.setDocumentField('发文日期',curDate.getFullYear()+'年'+(curDate.getMonth()+1)+'月'+curDate.getDate()+'日');
				cssOffice.setDocumentField('签发人',data.qfrName);
				cssOffice.setDocumentField('主办部门',data.hostDepartment);
				cssOffice.setDocumentField('联合发文单位',data.unionDepartment);
				$('#changPatten').show();
				cssOffice.showPatten(patten);
			}
		});
	}else{
		layer.msg('未获得模板',{time:2000,icon:2});
	}
}

$("#close").click(function(){
	window.close();
});

$("#save").click(function(){
	saveFile();
	layer.msg('保存成功',{time:2000,icon:1});
});

$("#changPatten").click(function(){
	patten = 1 - patten;
	cssOffice.showPatten(patten);
	if(patten == 1){
		$("#changPatten").html("隐藏修改痕迹");
	}else{
		$("#changPatten").html("显示修改痕迹");
	}
});

$("#print").click(function(){
	cssOffice.printPreview();
});

function saveFile(isdel){
	if(id == 'undefined' || id == '' || id == null){
		layer.msg('未获取发文ID',{time:2000,icon:2});
		return;
	}
	
	var ftype = ".docx";
	if(officeType == 2){
		ftype = ".wps";
	}

	var wordSize = cssOffice.wordSize();
	var zw = cssOffice.getDocumentField('正文');
    var sizeFact=0;
    var redHeadSize = 0;
	if(wordSize != null && wordSize > 0){
        sizeFact = wordSize;
	}
	if(zw!=null){
		redHeadSize = wordSize - zw.length;
	}
	var url=location.protocol+"//"+location.host+"/servlet/office/save?type=fawen&sizeFact="+sizeFact+"&isdel="+isdel+"&redHeadSize="+redHeadSize;
	cssOffice.saveURL(url,id + ftype);
	window.opener.echoBodyRecord();
	window.opener.addRedHead();
}

function onunload(){
	
}

function __on_close__(){
	saveFile();
}

function formatDate(date){
	var arrDate = date.substring(0,10).split('-');
	var year = arrDate[0];
	var month = arrDate[1];
	var day = arrDate[2];
	if(month.indexOf('0') == 0){
		month = month.replace('0','');
	}
	if(day.indexOf('0') == 0){
		day = day.replace('0','');
	}
	
	return year+"年"+month+'月'+day+'日';
}
