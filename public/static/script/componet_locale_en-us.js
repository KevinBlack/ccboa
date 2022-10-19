/**
 * P2 Framework JS Library 1.0 Copyright(c) 2013, China Construction Bank.
 * 
 * @Author lingy Create on: 2013-12-24 Last Updated:
 *         说明:国际化资源文件 英文
 */

window.resource = {};
resource = {
		/**
		 * calendar组件  lingy  2013-12-24
		 */
		//calendar初始月份
		CALENDAR_DEFAULTS_MONTHS:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
		
		//calendar初始星期
		CALENDAR_DEFAULTS_WEEKS:['Su','Mo','Tu','We','Th','Fr','Sa'],
		
		//季度
		CALENDAR_DEFAULTS_SEASONS:['spring', 'summer', 'autumn', 'winter' ],
		/**
		 * datebox 组件
		 */
		DATEBOX_DEFAULTS_OKTEXT:'Ok',
		DATEBOX_DEFAULTS_CLOSETEXT :'Close',
		DATEBOX_DEFAULTS_CURRENTTEXT:'Today',
		
		/**
		 * dateinput组件 lingy  2013-12-24
		 */
		// dateinput组件的验证提示信息
		DATEINPUT_VALIDATE_INFO : 'Please enter the correct date!',
		// dateinput年月默认的验证信息
		DATEINPUT_VALIDATE_MONTH_DEFAULT_INFO : "Please enter the correct month, the format yyyymm!",
		// dateinput日期时间默认的验证信息
		DATEINPUT_VALIDATE_DATETIME_DEFAULT_INFO : "Enter the correct date and time!",
		// 选择的日期和设置的最大日期比较信息
		DATEINPUT_VALIDATE_MAXDATE_INFO : 'Date of your choice can not be greater than the maximum date',
		// 选择的日期和设置的最小日期比较信息
		DATEINPUT_VALIDATE_MINDATE_INFO : 'Date of your choice can not be less than the minimum date',
		//dateinput最大最小日期限定
		DATEINPUT_MAXMIN_LIMITEDRANGE_INFO:'id is',
		DATEINPUT_MAXMIN_LIMITEDRANGE_INFO1:'minimum date must be less than or equal to the maximum date!',
		
		
		
		/**
		 * dateSpan组件
		 */
		// datespan组件验证第一个日期小于等于第二个日期 信息 
		DATESPAN_VALIDATE_INFO_ONE : 'The first date must be less than or equal to the second date!',
		// datespan组件验证第二个日期须大于或等于第一个日期信息 
		DATESPAN_VALIDATE_INTO_TWO : 'The second date must be greater than or equal to the first date!',
		// //datespan组件验证第二个月份要大于第一个月份信息
		DATESAPN_VALIDATE_MONTH_INFO : 'The second month is greater than or equal to the first month!',
		DATESPAN_TWO_INITDATE_COMPAREINFO:'first initial date must be less than or equal to the second initial date',
		DATESPAN_FIRSTINITDATE_COMPMAXMINDATE:'first initial date can not be less than the minimum or greater than the maximum date',
		DATESPAN_SECONDINITDATE_COMPMAXMINDATE:'second initial date can not be less than the minimum or greater than the maximum date',
		DATESPAN_MANUALVALIDATE_INFO:'Please enter a valid date range',
		DATESPAN_SETVALUE_MAXINMIN_INFO:'You can not set a value less than the minimum or greater than the maximum date',
		//datespan组件开始日期和当前日期比较
		DATESPAN_VALIDATE_STARTDATE_INFO:'The start date must be less than or equal to today',
		//datespan组件结束日期和当前日期比较
		DATESPAN_VALIDATE_ENDDATE_INFO:'The end date must be great than or equal to today',
		
		//选择季度比较错误信息 2015-1-5
		DATESPAN_VALIDATE_INTO_TWO_SEASON : 'The end season must ber larger than the start season！',
		/**
		 * timespinner组件
		 */
		// timespinner验证的默认信息
		TIMESPINNER_VALIDATE_DEFAULT_INFO : 'Enter the correct time!',
		// timespinnerspan比较验证的默认信息
		TIMESPINNERSPAN_VALIDATE_COMPARE_INTO : 'The second time must be greater than or equal to the first time!',
		
		TIMESPINNERSPAN_VALIDATE_COMPARE_INTO_NOT_EQUAL:'The second time must be greater than  the first time!',
		//参数验证提示信息
		TIMESPINNERSPAN_VALIDATEPARM_INFO:'Dom timespinnerSpan components can not be null!',
		
		/**
		 * timespinner组件 国际化
		 */
		TIMESPINNER_VALIDATEPARM_INFO:'Dom timespinner components can not be null!',
		
		/**
		 * numberspinner组件
		 */
		// numberspan两个数字比较提示信息
		NUMBERSPINNER_VALIDATE_COMPARE_INTO : 'The second number is greater than the first number',
		// numberspinner与最大数字比较验证信息
		NUMBERSPINNER_VALIDATE_MAXNUM_INFO : 'This number can not be greater than the maximum',
		// numberspinner与最小数字比较验证信息
		NUMBERSPINNER_VALIDATE_MINNUM_INFO : 'This number can not be less than the minimum',
		// numberspinner默认的验证信息
		NUMBERSPINNER_VALIDATE_DEFAULT_INFO : 'Please enter the correct number!',
		//numberspinner初始参数dom为空提示
		NUMBERSPINNER_VALIDATEPARM_INFO:'Dom numberSpinner components can not be null!',
		
		
		/**
		 * messageBox组件
		 */
		//html中ajax请求弹出messageBox的信息
		MESSAGEBOX_AJAX_ERRORTITLE:'Error',
		//html中ajax请求弹出messageBox的content信息
		MESSAGEBOX_AJAX_RESPONSEERR_ERROR:'Service communication error occurred',
		//AJAX后台数据格式错误
		MESSAGEBOX_AJAX_RESPONSEERR_DATAERR:'Service data format error',
		//AJAX后台服务处理超时
		MESSAGEBOX_AJAX_RESPONSEERR_TIMEOUT:'Service processing timeout',
		//AJAX数据加载失败
		MESSAGEBOX_AJAX_RESPONSEERR_DATAlOADINGERR:'Data loading fails, make sure that the data format is JSON!',
		//AJAX服务超时
		MESSAGEBOX_AJAXTIMEOUT_TITLE:'Service Timeout',
		//ajax数据错误
		MESSAGEBOX_AJAXDATA_TITLE:'Data error',
		//buttonText不是数据提示信息
		MESSAGEBOX_BUTTONTEXT_TYPE_NOARRAY:'The assembly buttonText property is not an array type',
		//buttonText数据长度超2提示信息
		MESSAGEBOX_BUTTONTEXT_LENGTH:'Make sure that the length of the array assembly buttonText maximum of 2',
		//beforeclosetab方法   确认关闭
		BEFORECLOSETAB_CONFIRM_INFO:'Confirm Close?',
		
		/**
		 * window组件 国际化
		 */
		WINDOW_VALIDATEPARM_INFO:'Dom windows components can not be null!',
		
		
		/**
		 * panel组件 国际化
		 */
		//panel初始dom为空提示信息
		PANEL_VALIDATEPARM_INFO:'Dom panel components can not be null!',
		
		/**
		 * subPanel组件 国际化
		 */
		//subPanel初始dom为空提示信息
		SUBPANEL_VALIDATEPARM_INFO:'Dom subPanel components can not be null!',
		SUBPANEL_DEFAULT_TITLE:'Sub title',
		
		
		
		/**
		 * tab组件 国际化
		 */
		//tab初始dom为空提示信息
		TAB_VALIDATEPARM_INFO:'Tip: dom tab component can not be null!',
		
		/**
		 * table组件
		 */
		TABLE_SETDATA_ADDLABELISNULL:'Error: add key to',
		TABLE_SETDATA_ADDLABELISNULL1:'label can not be null',
		TABLE_INIT_TITLENUMERR:'Error: Please make sure your title number!',
		TABLE_LABEL_DATA_LENGTHNOSAME:'Tip: label, data length is inconsistent!',
		TABLE_LABEL_LENGTH:'label length:',
		TABLE_DATA_LENGTH:'data length',
		TABLE_VALIDATEPARM_INFO:'Dom table components, jsonData or (label, data) can not both be null!',
		
		/**
		 * orgText组件
		 */
		ORGTEXT_MESSAGERBOX_TITLE:'System prompts',
		ORGTEXT_CONFIRMBTN:'OK',
		ORGTEXT_CANCELBTN:'Cancel',
		ORGTEXT_TEXTBT:'Browse',
		
		/**
		 * orgTree组件
		 */
		ORGTREE_DATAFILTER_NODEIDERR:'Institutions tree node nodeId problem!',
		ORGTREE_BEFORECHECK_SELECTNUM:'You can only choose',
		ORGTREE_BEFORECHECK_SELECTNUM:'item!',
		ORGTREE_VALIDATEPARAM_INFO:'OrgTree the property can not be null and dom the property specifies the elements must exist!',
		ORGTREE_SHOWERROR_ERRCODE:'Error code:',
		ORGTREE_SHOWERROR_ERRDESC:'Error Description:',
		ORGTREE_REQUEST_FAIL:'Request fails',
		ORGTREE_GETPARENTNODES_PARMERR:'Parameter is null, getParentNodes parameter node can not be null',
		
		/**
		 * empTree组件
		 */
		EMPTREE_VALIDATEPARAM_INFO:'EmpTree the property can not be null and dom the property specifies the elements must exist!',
		
		/**
		 * standerdCodeTree组件
		 */
		STANDERDCODETREE_VALIDATEPARAM_INFO:'StanderdCodeTree the property can not be null and dom the property specifies the elements must exist!',
		
		
		/**
		 * grid组件
		 */
		// grid 初始缺省提示信息
		GRID_INIT_INFO : "Dear user, enter search condition!",
		/* grid 为查询到数据的提示信息*/
		GRID_NODATA_INFO : "Dear user, no results return .!",
		// grid 验证信息 
		GRID_VALIDATE_INFO : "Dom grid components can not be null!",
		
		// 每页显示记录
		GRID_LIST_PER:'record per page',
		GRID_LIST_TOTAL:'of',
		GRID_LIST_TOTAL1:'total',
		GRID_LIST_UNIT:'rec',
		GRID_LIST_INDEX:'page',
		// 分页按钮
		GRID_PAGINATION_BTN_FIRST:'first',
		GRID_PAGINATION_BTN_PREV:'prev',
		GRID_PAGINATION_BTN_NEXT:'next',
		GRID_PAGINATION_BTN_LAST:'last',
		// 跳转
		GRID_LIST_JUMP:'go',
		GRID_LIST_JUMP_1:'page', 
		GRID_LIST_JUMP_2:'page total',
		GRID_LIST_JUMP_2_1:' of ',
		GRID_LIST_JUMP_3:'',
		GRID_LIST_JUMP_4:'the',

		GRID_LIST_NUMBER_ERROR:': must be a integer great than zero .',

		// toolbar按钮
		GRID_TOOLBAR_ADD:'add',
		GRID_TOOLBAR_DEL:'delete',
		GRID_TOOLBAR_EDIT:'edit',
		GRID_TOOLBAR_KEEP:'save',

		GRID_RESPONSE_ERROR_CODE:'error code: ',
		GRID_RESPONSE_ERROR_DESC:'error desc：',
		GRID_RESPONSE_REQUEST_FAIL:'request fail',
		GRID_RESPONSE_REQUEST_ERROR:'exception request ,the error description is :',
		GRID_LOADMSG:'loading ...., please wait',
		GRID_SELECT_ALL:'all',
		

		// 全局跟踪号 获取失败
		GRID_TRANS_ID_NOT_FOUND:'unknown',
		

		// Button
		DISPATCHERBUTTON_DEFAULT_NAME:'submit',
		SUBMITBUTTON_DEFAULT_NAME:'submit',
		
		// TreeGrid
		TREEGRID_DEFAULT_TITLE:'treegrid',

		// ResponseInfo
		RESPONSEINFO_SUCCESS_OPER_DESC:'you can do follow options: ',
		RESPONSEINFO_FAIL_OPER_DESC:'you can fix it will follow options: ',
		RESPONSEINFO_CONFIRM_BTN_NAME:'confirm',
		RESPONSEINFO_BACK_BTN_NAME:'back',


		// Device
		DEVICE_ICCARDREADER_TEXTBT:"IC card",
		DEVICE_ICCARDREADER_LABELTEXT:'IC card: ',
		DEVICE_ICCARDREADER_ONFAILURE_INFO:'read card fail !',

		DEVICE_PASSWORD_TEXTBT:'password',
		DEVICE_PASSWORD_LABELTEXT:'password: ',
		DEVICE_PASSWORD_ONFAILURE_INFO:'enter password fail!',
		
		DEVICE_PRINTDEV_PRINT_PREVIEW:'print preview',
		DEVICE_PRINTDEV_PRINT_PAGE_TITLE: 'print preview',
		DEVICE_PRINTDEV_PRINT_LOCAL:'local print',
		DEVICE_PRINTDEV_PRINT:'print',
		DEVICE_PRINTDEV_PRINT_ERROR:'print error !',


		DEVICE_PRINTDEV_HORIZONTAL_PRINT_TIP:'the width of content for print is wide,please choose horizontal print mode in print setting !',
		DEVICE_PRINTDEV_PRINT_TIP:'print notification',


		DEVICE_IDENTITYCARD_TEXTBT:'ID reader',
		DEVICE_IDENTITYCARD_LABELTEXT:'ID reader: ',
		DEVICE_IDENTITYCARD_ONFAILURE_INFO:'read ID info fail!',

		DEVICE_CARDREADER_TEXTBT:'read card',
		DEVICE_CARDREADER_LABELTEXT:'read card: ',
		DEVICE_CARDREADER_ONFAILURE_INFO:'read card fail !',

		DEVICE_GRANT_TEXTBT:'authorize',
		DEVICE_GRANT_LABELTEXT:'authorize componet :',

		DEVICE_MODELPRINT_TEXTBT:'model print',
		DEVICE_MODELPRINT_LABELTEXT:'please set the content for print !',
		DEVICE_MODELPRINT_PRINT_ERROR:'print error !',

		DEVICE_FINGERREADER_TEXTBT:'finger reader',
		DEVICE_FINGERREADER_LABELTEXT:'finger reader: ',
		DEVICE_FINGERREADER_SUCCESS_INFO:'finger reader successfully!',
		DEVICE_FINGERREADER_ONFAILURE_INFO:'finger reader fail!',

		DEVICE_FINGERMARK_FINGER_INDEX:'手指序号：',
		DEVICE_FINGERMARK_FINGER_STATUS:'手模状态：',
		DEVICE_FINGERMARK_FINGER_BTN_GATHER:'手指序号：',
		DEVICE_FINGERMARK_L1:'L1左手食指',
		DEVICE_FINGERMARK_L2:'L2左手食指',
		DEVICE_FINGERMARK_STATUS_1:'未采集',
		DEVICE_FINGERMARK_STATUS_2:'已采集',
		DEVICE_FINGERMARK_BTN_ADD:'添加',
		DEVICE_FINGERMARK_BTN_DEL:'删除', 
	 	
	 	DEVICE_BASE_EXCUTE_RESULT:'execute result',

	 	DEVICE_BANKBOOKREADER_TEXTBT:'read bankbook', 
		DEVICE_BANKBOOKREADER_LABELTEXT:'read bankbook: ',
		DEVICE_BANKBOOKREADER_ONFAILURE_INFO:'read bankbook fail!',

		DEVICE_SCAN_TEXTBT:'scan', 
		DEVICE_SCAN_LABELTEXT:'scan:: ',

		DEVICE_CARDWRITER_TEXTBT : 'write card',
		DEVICE_CARDWRITER_VALIDATEPARAM_REQUIRED : 'dom,content,trackNum is required!',
		DEVICE_CARDWRITER_VALIDATEPARAM_CONTENT : 'content must be a array with length 2.',

		// cardAndBankBookReader
		DEVICE_CARDANDBANKBOOKTYPE_LABEL_TXT:'card/bankbook type:',
		DEVICE_CARDANDBANKBOOKREADER_BASIC_NAME:'common card',
		DEVICE_CARDANDBANKBOOKREADER_IC_NAME:'IC card',
		DEVICE_CARDANDBANKBOOKREADER_BANKBOOK_NAME:'bankbook',
		// select框信息
		DEVICE_CARDANDBANKBOOKREADER_BASICJJ_NAME:'common debit card',
		DEVICE_CARDANDBANKBOOKREADER_BAISCDJ_NAME:'common credit card',
		DEVICE_CARDANDBANKBOOKREADER_ICJJ_NAME:'IC debit card',
		DEVICE_CARDANDBANKBOOKREADER_ICDJ_NAME:'IC creadit card',

		DEVICE_CARDANDBANKBOOKREADER_NOTIFICATION_PREFIX:'please swipe the ',
		DEVICE_CARDANDBANKBOOKREADER_NOTIFICATION_SUFFIX:'.....',

		DEVICE_CARDANDBANKBOOKREADER_BTN_TXT:'swipe',
		DEVICE_CARDANDBANKBOOKREADER_LABEL_TXT:'card/bankbook No.：',

		DEVICE_MODELPRINT_NO_CONTENT:'no content for print !',
		DEVICE_MODELPRINT_FAILURE:'print fail',
		// accountReader相关
		// 下拉框内容
		DEVICE_ACCOUNTREADER_BASIC_NAME:'common card',
		DEVICE_ACCOUNTREADER_IC_NAME:'IC card',
		DEVICE_ACCOUNTREADER_BANKBOOK_NAME:'bankbook',
		DEVICE_ACCOUNTREADER_BASICJJ_NAME:'common debit card',
		DEVICE_ACCOUNTREADER_BAISCDJ_NAME:'common credit card',
		DEVICE_ACCOUNTREADER_ICJJ_NAME:'IC debit card',
		DEVICE_ACCOUNTREADER_ICDJ_NAME:'IC creadit card',
		DEVICE_ACCOUNTREADER_FACE: 'face recognition',
		DEVICE_ACCOUNTREADER_QRCODE: 'scan qrcode',
		DEVICE_ACCOUNTREADER_NFC: 'NFC',
		// 按钮内容
		DEVICE_ACCOUNTREADER_BASIC_BTNNAME: 'swipe',
    DEVICE_ACCOUNTREADER_IC_BTNNAME: 'swipe',
    DEVICE_ACCOUNTREADER_BASICJJ_BTNNAME: 'swipe',
    DEVICE_ACCOUNTREADER_BAISCDJ_BTNNAME: 'swipe',
    DEVICE_ACCOUNTREADER_ICJJ_BTNNAME: 'swipe',
    DEVICE_ACCOUNTREADER_ICDJ_BTNNAME: 'swipe',
    DEVICE_ACCOUNTREADER_BANKBOOK_BTNNAME: 'swipe',
    DEVICE_ACCOUNTREADER_FACE_BTNNAME: 'face recognition',
    DEVICE_ACCOUNTREADER_QRCODE_BTNNAME: 'scan qrcode',
		DEVICE_ACCOUNTREADER_NFC_BTNNAME: 'read NFC',
		// select label
		DEVICE_ACCOUNTREADER_SELECT_LABEL: 'media type:',
		// input label
		DEVICE_ACCOUNTREADER_INPUT_LABEL: 'card/bankbook No:',
		// 错误信息
		// accountReader相关结束
		// jquery ui grid 相关部分
		
		
		/** 
		  * html.js 文件
		  */
		//getAreaData的formId为空信息
		GETAREADATA_ISFORMIDNULL_INFO1:'Parameter error!',
		GETAREADATA_ISFORMIDNULL_INFO2:'Can not be null!',
		
		//messager的ok和cancel按钮
		MESSAGER_DEFAULTS_OK:'Ok(Y)',
		MESSAGER_DEFAULTS_CANCEL:"Cancel(N)",
		//p2环境中取客户端相关信息
		SENDNSCOMMAND_CATCH:'From the client fails to read the operator information, please restart the client!',
		GETUSERINFO_FAILURE:'Unable to get the operator information',
		GETORGINFO_FAILURE:"Unable to get the organization's information",
		GETROLEINFO_FAILURE:'Unable to get job information',
		GETOTHERINFO_FAILURE:'Unable to get additional information',
		//开发window弹出错误信息
		OPENINNERWINDOW_FAILURE:'open windows Error',
		//上传下载方法相关提示信息
		UPLOAD_MESSAGEBOX_TITLE:'Error',
		UPLOAD_MESSAGEBOX_UPLOADING:'uploading...',
		UPLOAD_MESSAGEBOX_DATEERR_CONTENT:'Parse the returned data error',
		UPLOAD_MESSAGEBOX_UPLOADERR_CONTENT:'Upload file error occurred',
		UPLOAD_MESSAGEBOX_UPLOAD_TIMEOUT:'Upload file timeout',
		DOWNLOAD_MESSAGEBOX_DOWNERR_CONTENT:'The downloaded file does not exist',
		
		/** 
		  * ajax.js 文件 
		 */
		AJAX_PARAMETERS_ERR:'The parameter is incorrect! Current parameter',
		AJAX_NORESPONSEDATA:'No data is returned!',
		GETORGDESC_NOCODES:'Do not send organization message!',
		GETSTANDARDCODEDESCBYVALUE_NOCATEGORYIDANDVALUE:'CategoryId and value must be entered',
		AJAX_HW_REAUTH:'waiting for the review',


		/** 
		  * client.js 文件
		 */
		PROXY_BSLOGIN_MODEL_ERROR:'Your browser is currently in registration mode, you can not call peripherals, please use the corresponding function in the client',
		GETUSERINFO_ERROR:'Can not get user information, please check the js if executed correctly!',
		
		/** 
		  * util.js 文件
		 */
		convertCounty_messageBox_content:'The data you enter is less than 6',
		convertCounty_messageBox_title:'Error Messages',
		
		/**
		 * componentMgr.js
		 */
		REG_EXIST_ID_INFO:'componentMgr already exists id id already exists as',
		REG_EXIST_ID_INFO1:'component',
		/**
		 * Fileupload
		 */
		//默认必选提示信息
		DEFAULT_MISSINGMESSAGE:"this field is required",
		DEFAULT_MISSINGMATCHMESSAGE:"this field is not existed",
		//文件删除列表删除按钮文本
		FILEUPLOAD_DELETE:"delete",
		//文件上传解析数据错误提示信息
		FILEUPLOAD_DECRYPT_DATA:"Parse Data Error",
		//文件上传错误提示title
		ERROR_TITLE:"Error", 
		//文件上传错误提示信息
		FILEUPLOAD_ERROR:"Fileupload failed",
		//上传信息
		FILEUPLOAD_MESSAGE:"Upload Message",
		//上传按钮文本
		FILEUPLOAD_BUTOON_NAME:"upload",
		//提示选择要上传的文件
		FILEUPLOAD_CHOOSEFILE_MSG:"Choose file,please",
		//文件类型禁止上传提示信息
		FILEUPLOAD_FORBID_MSG:"sorry,the file's type you choosed is Forbidden!",
		//允许上传的文件类型为
		FILEUPLOAD_ALLOW_FILETYPE:"the allowed type is",
		//浏览按钮文本
		FILEUPLOAD_BROWSE_TEXT:"browse",
		//上传文件超过限制大小
		FILEUPLOAD_LIMITSIZE_MSG:"sorry, you file's size exceeds the size limit ",
		/**
		 * select国际化开始
		 */
		//空选项文本
		SELECT_NULLlOPTION_LABEL:"Please choose",
	    //select必选提示信息
		SELECT_MISSING_MSG:"this options is required",
		//select添加默认选项已存在值
		SELECT_EXISTVALUE_MSG:"The value is alredy exist(",
		//select添加选项已存在文本
		SELECT_EXISTTEXT_MSG:"the text is already exist(",
		//select添加选线信息
		SELECT_ADD_MSG:")",
		//select全选文字
		SELECT_ALL_SELECT:"all select",
		
			
		/**
		 * selectionBox
		 */
		//左侧
		SELECTIONBOX_LEFT_LABLENAME:"left",
		SELECTIONBOX_RIGHT_LABLENAME:"right",
        SELECTIONBOX_ADD:"add",
        SELECTIONBOX_DEL:"del",
        SELECTIONBOX_UP:"up",
        SELECTIONBOX_DOWN:"down",
		
		
		/**
		 * checkbox 和radio
		 * 
		 */
		//getSelectObject错误提示信息
		CHECKBOX_GETOBJECT_ERROR:"The value is null or The type you input isn't exists",
		CHECKBOX_CHECK_MSG1:"Either selected or defaultValue can be chosen",
		CHECKBOX_CHECK_MSG2:"values cannot be null",
		CHECKBOX_ERROR_TITLE:"Error Message",
		CHECKBOX_CHECK_MSG3:"labels cannot be null",
		CHECKBOX_CHECK_MSG4:"name cannot be null",
		RADIO_GETOBJECT_ERROR:"The value is null or The type you input isn't exists",
		
		
		/**
		 *图表数据检查提示信息
		 */
		GRAPHIC_CHECK_MSG:"Please input data or url",

		//陈自然添加
		//textfield组件国际化
		TEXTFIELD_CHECK_ERROR:"This information is incorrect！",
		TEXTFIELD_CHECK_MSG1:"Required!",
		TEXTFIELD_HELP_MSG:"Please enter a help message!",
		TEXTFIELD_CHECK_ERROR2:"Error message!",
		TEXTFIELD_AREA_MSG1:"You have entered the",
		TEXTFIELD_AREA_MSG2:"Characters, you can also enter",
		TEXTFIELD_AREA_MSG3:"Characters.",
		//scrollButton组件国际化
		SCROLLBUTTON_HELP_MSG:"No input dom, please enter dom!",
		//imgViewer组件国际化
		IMGVIEWER_CHECK_ERROR1:"No input dom, please enter dom!",
		IMGVIEWER_CHECK_ERROR2:"Error！！input countLine isn't Int type",
		//tree组件
		TREE_MSG1:"Confirm to delete",
		TREE_MSG2:"?",
		TREE_MSG3:"Please enter a query node id",
		TREE_MSG4:"Error: no search to the node Id = ",
		//loading组件
		LOADING_MSG1:"Please set maskBody mask body is true, otherwise, please set the dom ",
		LOADING_MSG2:"Please configure the dom or maskBody attribute",
		//jquery.globalCheck
		GLOBALCHECK_MSG1:"You fill in the following fields corresponds to the red area is wrong:",
		
		//areaSelector
		AREA_PROVINCE:"Province",
		AREA_CITY:"city",
		AREA_COUNTY:"county",
		AREA_DETAIL:"detail address",
		AREA_NULL_LABEL:"Please choose",

		/*
		* errormessagebox
		*/
		ERR_MSG_BOX_ERR_CODE:'error code：',
		ERR_MSG_BOX_TRACE_ID:'global trace id：',
		ERR_MSG_BOX_FROM : ',from : ',
		ERR_MSG_BOX_COMPONENT : 'component',
		ERR_MSG_BOX_SCREEN_SHOT:['If you need to report the electronic work order“','capture feedback','','if the error message is not clear，please click“'],
		ERR_MSG_BOX_KLM:['',''],
		ERR_MSG_DETAIL:'detailed information, please click',

		/*
		* batchmodelprint
		*/
		BATCH_MODEL_PRINTNM:'print',
		BATCH_MODEL_WIN_TITLE:'print',
		BATCH_MODEL_CONFIRM_BTN:'ok',
		BATCH_MODEL_CLOSE_BTN:'cancel',
		BATCH_MODEL_LIST:'voucher list',
		BATCH_MODEL_LIST_INITMSG:'no voucher to print！',
		BATCH_MODEL_LIST_NODATAMSG:'no voucher to print！',
		BATCH_MODEL_LIST_COLUMN:['voucher name','print status','operation'],
		BATCH_MODEL_LIST_STATUS:['wait for the print','print complete','print failed','cancel printing','unknown status'],
		BATCH_MODEL_LIST_OPERATION:['reprint','reprint','reprint','unknown operation'],
		BATCH_MODEL_LIST_TIP:['please insert',',to print','no voucher to print！'],
		//scanViewer
		SCANVIEWER_COL_TWO:"two column",
		SCANVIEWER_COL_FOUR:"four column",
		SCANVIEWER_COL_SIX:"six column",
		SCANVIEWER_COL_EIGHT:"eight column",
		SCANVIEWER_SELECT_ALL:'select all',
		SCANVIEWER_SELECT_INVERT:'select invert',
		SCANVIEWER_ZOOM_IN:'zoom in',
		SCANVIEWER_ZOOM_OUT:'zoom_out',
		SCANVIEWER_REPLACE:'replace',
		SCANVIEWER_SETUP:'setup',
		SCANVIEWER_INSERT:'insert',
		SCANVIEWER_REVERSE:'reverse',
		SCANVIEWER_DELETE:'delete',
		SCANVIEWER_SCAN:'scan',
		SCANVIEWER_ROTATE_RIGHT:'R-Rotate',
		SCANVIEWER_ROTATE_LEFT:'L-Rotate',

		//ieprint proxy
		PRINT_PROXY_CLOSE:'close',

		//授权拦截相关
		AUTH_WINDOW_TITLE:['Auth', 'Please remind customer to confirm information','Please remind customer to input password', 'Business approval'],
		AUTH_REVIEW_TITLE:'Review'	,
		HOME_PAGE :'home_page'


}