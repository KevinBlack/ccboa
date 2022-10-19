	/**
 * P2 Framework JS Library 1.0 Copyright(c) 2013, China Construction Bank.
 * 
 * @Author lingy Create on: 2013-12-24 Last Updated:
 *         说明:国际化资源文件 简体中文
 */

window.resource = {};
resource = {
		/**
		 * calendar组件  lingy  2013-12-24
		 */
		//calendar初始月份
		CALENDAR_DEFAULTS_MONTHS:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		
		//calendar初始星期
		CALENDAR_DEFAULTS_WEEKS:['日','一','二','三','四','五','六'],
		
		//季度
		CALENDAR_DEFAULTS_SEASONS:['第一季度', '第二季度', '第三季度', '第四季度' ],
		
		/**
		 * datebox 组件
		 */
		DATEBOX_DEFAULTS_OKTEXT:'确定',
		DATEBOX_DEFAULTS_CLOSETEXT :'关闭',
		DATEBOX_DEFAULTS_CURRENTTEXT:'今天',

		/**
		 * dateinput组件 lingy  2013-12-24
		 */
		// dateinput组件的验证提示信息 
		DATEINPUT_VALIDATE_INFO : '请输入正确的日期！',
		// dateinput年月默认的验证信息
		DATEINPUT_VALIDATE_MONTH_DEFAULT_INFO : "请输入正确的月份,格式为yyyymm！",
		// dateinput日期时间默认的验证信息
		DATEINPUT_VALIDATE_DATETIME_DEFAULT_INFO : "请输入正确的日期和时间！",
		// 选择的日期和设置的最大日期比较信息
		DATEINPUT_VALIDATE_MAXDATE_INFO : '您选择的日期不能大于最大日期',
		// 选择的日期和设置的最小日期比较信息
		DATEINPUT_VALIDATE_MINDATE_INFO : '您选择的日期不能小于最小日期',
		//dateinput最大最小日期限定
		DATEINPUT_MAXMIN_LIMITEDRANGE_INFO:'id为',
		DATEINPUT_MAXMIN_LIMITEDRANGE_INFO1:'的最小日期须小于或等于最大日期!',
		
		
		
		/**
		 * dateSpan组件
		 */
		// datespan组件验证第一个日期小于等于第二个日期 信息 
		DATESPAN_VALIDATE_INFO_ONE : '第一个日期须小于或等于第二个日期！',
		// datespan组件验证第二个日期须大于或等于第一个日期信息 
		DATESPAN_VALIDATE_INTO_TWO : '第二个日期须大于或等于第一个日期！',
		// datespan组件验证第二个月份要大于第一个月份信息
		DATESAPN_VALIDATE_MONTH_INFO : '第二个月份要大于或等于第一个月份！',
		DATESPAN_TWO_INITDATE_COMPAREINFO:'的第一个初始日期须小于或等于第二个初始日期',
		DATESPAN_FIRSTINITDATE_COMPMAXMINDATE:'的第一个初始日期不能小于最小日期或大于最大日期',
		DATESPAN_SECONDINITDATE_COMPMAXMINDATE:'的第二个初始日期不能小于最小日期或大于最大日期',
		DATESPAN_MANUALVALIDATE_INFO:'请输入一个有效的日期区间',
		DATESPAN_SETVALUE_MAXINMIN_INFO:'你设置的值不能小于最小日期或大于最大日期',
		//datespan组件开始日期和当前日期比较
		DATESPAN_VALIDATE_STARTDATE_INFO:'开始日期必须小于等于今天',
		//datespan组件结束日期和当前日期比较
		DATESPAN_VALIDATE_ENDDATE_INFO:'结束日期必须大于等于今天',
		
		//选择季度比较错误信息 2015-1-5
		DATESPAN_VALIDATE_INTO_TWO_SEASON : '第二个季度须大于或等于第一个季度！',
		
		/**
		 * timespinner组件
		 */
		// timespinner验证的默认信息
		TIMESPINNER_VALIDATE_DEFAULT_INFO : '请输入正确的时间!',
		// timespinnerspan比较验证的默认信息
		TIMESPINNERSPAN_VALIDATE_COMPARE_INTO : '第二个时间须大于或等于第一个时间!',
		TIMESPINNERSPAN_VALIDATE_COMPARE_INTO_NOT_EQUAL:'第二个时间须大于第一个时间!',
		//参数验证提示信息
		TIMESPINNERSPAN_VALIDATEPARM_INFO:'提示：timespinnerSpan组件的dom不能为空！',
		
		/**
		 * timespinner组件 国际化
		 */
		TIMESPINNER_VALIDATEPARM_INFO:'提示：timespinner组件的dom不能为空！',
		
		/**
		 * numberspinner组件
		 */
		// numberspan两个数字比较提示信息
		NUMBERSPINNER_VALIDATE_COMPARE_INTO : '第二个数字要大于第一个数字',
		// numberspinner与最大数字比较验证信息
		NUMBERSPINNER_VALIDATE_MAXNUM_INFO : '该数字不能大于最大值',
		// numberspinner与最小数字比较验证信息
		NUMBERSPINNER_VALIDATE_MINNUM_INFO : '该数字不能小于最小值',
		// numberspinner默认的验证信息
		NUMBERSPINNER_VALIDATE_DEFAULT_INFO : '请输入正确的数字!',
		//numberspinner初始参数dom为空提示
		NUMBERSPINNER_VALIDATEPARM_INFO:'提示：numberSpinner组件的dom不能为空!',
		
		
		/**
		 * messageBox组件
		 */
		//html中ajax请求弹出messageBox的信息
		MESSAGEBOX_AJAX_ERRORTITLE:'错误',
		//html中ajax请求弹出messageBox的content信息
		MESSAGEBOX_AJAX_RESPONSEERR_ERROR:'与后台通信发生错误',
		//AJAX后台数据格式错误
		MESSAGEBOX_AJAX_RESPONSEERR_DATAERR:'后台数据格式错误',
		//AJAX后台服务处理超时
		MESSAGEBOX_AJAX_RESPONSEERR_TIMEOUT:'后端组件超时，请核实交易处理结果后再进行后续操作。',
		//AJAX数据加载失败
		MESSAGEBOX_AJAX_RESPONSEERR_DATAlOADINGERR:'数据加载失败，请确保数据格式为JSON!',
		//AJAX服务超时
		MESSAGEBOX_AJAXTIMEOUT_TITLE:'服务超时',
		//ajax数据错误
		MESSAGEBOX_AJAXDATA_TITLE:'数据错误',
		//buttonText不是数据提示信息
		MESSAGEBOX_BUTTONTEXT_TYPE_NOARRAY:'该组件中buttonText属性不是数组类型',
		//buttonText数据长度超2提示信息
		MESSAGEBOX_BUTTONTEXT_LENGTH:'请确定该组件中buttonText数组的长度，最多为2',
		//beforeclosetab方法   确认关闭
		BEFORECLOSETAB_CONFIRM_INFO:'确认关闭?',
		
		/**
		 * window组件 国际化
		 */
		WINDOW_VALIDATEPARM_INFO:'提示：windows组件的dom不能为空!',
		
		
		/**
		 * panel组件 国际化
		 */
		//panel初始dom为空提示信息
		PANEL_VALIDATEPARM_INFO:'提示：panel组件的dom不能为空!',
		
		/**
		 * subPanel组件 国际化
		 */
		//subPanel初始dom为空提示信息
		SUBPANEL_VALIDATEPARM_INFO:'提示：subPanel组件的dom不能为空!',
		SUBPANEL_DEFAULT_TITLE:'子级标题',
		
		
		
		/**
		 * tab组件 国际化
		 */
		//tab初始dom为空提示信息
		TAB_VALIDATEPARM_INFO:'提示：tab组件的dom不能为空!',
		
		/**
		 * table组件
		 */
		TABLE_SETDATA_ADDLABELISNULL:'错误提示：添加key为',
		TABLE_SETDATA_ADDLABELISNULL1:'的标签不能为空',
		TABLE_INIT_TITLENUMERR:'错误提示：请确定你的标题数！',
		TABLE_LABEL_DATA_LENGTHNOSAME:'提示：label、data长度不一致!"',
		TABLE_LABEL_LENGTH:'label长度:',
		TABLE_DATA_LENGTH:'而data长度为:',
		TABLE_VALIDATEPARM_INFO:'提示：table组件的dom、jsonData或(label、data)均不能不为空!',
		
		/**
		 * orgText组件
		 */
		ORGTEXT_MESSAGERBOX_TITLE:'系统提示信息',
		ORGTEXT_CONFIRMBTN:'确定',
		ORGTEXT_CANCELBTN:'取消',
		ORGTEXT_TEXTBT:'浏览',
		
		/**
		 * orgTree组件
		 */
		ORGTREE_DATAFILTER_NODEIDERR:'机构树节点nodeId有问题!',
		ORGTREE_BEFORECHECK_SELECTNUM:'您最多只能选择',
		ORGTREE_BEFORECHECK_SELECTNUM:'项！',
		ORGTREE_VALIDATEPARAM_INFO:'提示：orgTree的dom属性不能为空且dom属性指定的元素必须存在！',
		ORGTREE_SHOWERROR_ERRCODE:'错误码:',
		ORGTREE_SHOWERROR_ERRDESC:'错误描述:',
		ORGTREE_REQUEST_FAIL:'请求失败',
		ORGTREE_GETPARENTNODES_PARMERR:'参数为空", "getParentNodes参数node 不能为空',
		
		/**
		 * empTree组件
		 */
		EMPTREE_VALIDATEPARAM_INFO:'提示：empTree的dom属性不能为空且dom属性指定的元素必须存在！',
		
		/**
		 * standerdCodeTree组件
		 */
		STANDERDCODETREE_VALIDATEPARAM_INFO:'提示：standerdCodeTree的dom属性不能为空且dom属性指定的元素必须存在！',
		
		
		/**
		 * grid组件
		 */
		// grid 初始缺省提示信息
		GRID_INIT_INFO : "尊敬的用户，请输入查询条件！",
		/* grid 为查询到数据的提示信息*/
		GRID_NODATA_INFO : "尊敬的用户，您查询的信息不存在！",
		// grid 验证信息 
		GRID_VALIDATE_INFO : "提示：grid组件的dom不能为空！",
		
		// 每页显示记录
		GRID_LIST_PER:'每页显示记录',
		GRID_LIST_TOTAL:'共',
		GRID_LIST_TOTAL1:'共',
		GRID_LIST_UNIT:'条',
		GRID_LIST_INDEX:'第',
		// 分页按钮
		GRID_PAGINATION_BTN_FIRST:'首 页',
		GRID_PAGINATION_BTN_PREV:'上一页',
		GRID_PAGINATION_BTN_NEXT:'下一页',
		GRID_PAGINATION_BTN_LAST:'末 页',
		// 跳转
		GRID_LIST_JUMP:'转到',
		GRID_LIST_JUMP_1:'到第', 
		GRID_LIST_JUMP_2:'页 共',
		GRID_LIST_JUMP_2_1:' 页,共 ',
		GRID_LIST_JUMP_3:'页',
		GRID_LIST_JUMP_4:'第',

		GRID_LIST_NUMBER_ERROR:'提示：请输入自然数！',

		// toolbar按钮
		GRID_TOOLBAR_ADD:'新增',
		GRID_TOOLBAR_DEL:'删除',
		GRID_TOOLBAR_EDIT:'编辑',
		GRID_TOOLBAR_KEEP:'保存',

		GRID_RESPONSE_ERROR_CODE:'错误码：',
		GRID_RESPONSE_ERROR_DESC:'错误描述：',
		GRID_RESPONSE_REQUEST_FAIL:'请求失败',
		GRID_RESPONSE_REQUEST_ERROR:'请求异常,错误描述为:',
		GRID_LOADMSG:'正在执行, 请稍等 ...',
		GRID_SELECT_ALL:'全',

		// 全局跟踪号 获取失败
		GRID_TRANS_ID_NOT_FOUND:'未知',
		

		// Button
		DISPATCHERBUTTON_DEFAULT_NAME:'提交',
		SUBMITBUTTON_DEFAULT_NAME:'提交',
		
		// TreeGrid
		TREEGRID_DEFAULT_TITLE:'树形表格',

		// ResponseInfo
		RESPONSEINFO_SUCCESS_OPER_DESC:'您还可以进行以下操作：',
		RESPONSEINFO_FAIL_OPER_DESC:'您还可以通过以下操作进行修复：',
		RESPONSEINFO_CONFIRM_BTN_NAME:'确定',
		RESPONSEINFO_BACK_BTN_NAME:'返回',


		// Device
		DEVICE_ICCARDREADER_TEXTBT:"金融IC卡",
		DEVICE_ICCARDREADER_LABELTEXT:'金融IC卡：',
		DEVICE_ICCARDREADER_ONFAILURE_INFO:'读卡失败！',

		DEVICE_PASSWORD_TEXTBT:'密码',
		DEVICE_PASSWORD_LABELTEXT:'密码：',
		DEVICE_PASSWORD_ONFAILURE_INFO:'密码输入失败！',
		
		DEVICE_PRINTDEV_PRINT_PREVIEW:'打印预览',
		DEVICE_PRINTDEV_PRINT_PAGE_TITLE:'屏打预览',
		DEVICE_PRINTDEV_PRINT_LOCAL:'本地打印',
		DEVICE_PRINTDEV_PRINT:'打印',
		DEVICE_PRINTDEV_PRINT_ERROR:'打印错误！',

		DEVICE_PRINTDEV_HORIZONTAL_PRINT_TIP:'当前打印内容较宽，建议在打印设置中选择横向打印模式！',
		DEVICE_PRINTDEV_PRINT_TIP:'打印提示',


		DEVICE_IDENTITYCARD_TEXTBT:'身份证鉴别仪',
		DEVICE_IDENTITYCARD_LABELTEXT:'身份证鉴别仪：',
		DEVICE_IDENTITYCARD_ONFAILURE_INFO:'读身份证失败！',

		DEVICE_CARDREADER_TEXTBT:'划卡',
		DEVICE_CARDREADER_LABELTEXT:'划卡：',
		DEVICE_CARDREADER_ONFAILURE_INFO:'划卡失败！',

		DEVICE_GRANT_TEXTBT:'授权',
		DEVICE_GRANT_LABELTEXT:'授权组件：',

		DEVICE_MODELPRINT_TEXTBT:'套打',
		DEVICE_MODELPRINT_LABELTEXT:'未设置打印内容！',
		DEVICE_MODELPRINT_PRINT_ERROR:'打印出错！',

		DEVICE_FINGERREADER_TEXTBT:'指纹读取',
		DEVICE_FINGERREADER_LABELTEXT:'指纹读取：',
		DEVICE_FINGERREADER_SUCCESS_INFO:'读取指纹完毕',
		DEVICE_FINGERREADER_ONFAILURE_INFO:'指纹读取失败！',

		DEVICE_FINGERMARK_FINGER_INDEX:'手指序号：',
		DEVICE_FINGERMARK_FINGER_STATUS:'手模状态：',
		DEVICE_FINGERMARK_FINGER_BTN_GATHER:'手指序号：',
		DEVICE_FINGERMARK_L1:'L1左手食指',
		DEVICE_FINGERMARK_L2:'L2左手食指',
		DEVICE_FINGERMARK_STATUS_1:'未采集',
		DEVICE_FINGERMARK_STATUS_2:'已采集',
		DEVICE_FINGERMARK_BTN_ADD:'添加',
		DEVICE_FINGERMARK_BTN_DEL:'删除', 
	 	
	 	DEVICE_BASE_EXCUTE_RESULT:'执行结果',

	 	DEVICE_BANKBOOKREADER_TEXTBT:'划折', 
		DEVICE_BANKBOOKREADER_LABELTEXT:'划折：',
		DEVICE_BANKBOOKREADER_ONFAILURE_INFO:'划折失败！',

		DEVICE_SCAN_TEXTBT:'扫描', 
		DEVICE_SCAN_LABELTEXT:'扫描：',

		DEVICE_CARDWRITER_TEXTBT : '写卡',
		DEVICE_CARDWRITER_VALIDATEPARAM_REQUIRED : 'dom,content,trackNum属性必须输入',
		DEVICE_CARDWRITER_VALIDATEPARAM_CONTENT : 'content应为长度2的数组',

		// cardAndBankBookReader
		DEVICE_CARDANDBANKBOOKTYPE_LABEL_TXT:'卡折类型：',
		DEVICE_CARDANDBANKBOOKREADER_BASIC_NAME:'普通银行卡',
		DEVICE_CARDANDBANKBOOKREADER_IC_NAME:'金融IC卡',
		DEVICE_CARDANDBANKBOOKREADER_BANKBOOK_NAME:'存折',
		// select框信息
		DEVICE_CARDANDBANKBOOKREADER_BASICJJ_NAME:'普通借记卡',
		DEVICE_CARDANDBANKBOOKREADER_BAISCDJ_NAME:'普通贷记卡',
		DEVICE_CARDANDBANKBOOKREADER_ICJJ_NAME:'IC借记卡',
		DEVICE_CARDANDBANKBOOKREADER_ICDJ_NAME:'IC贷记卡',
		
		DEVICE_CARDANDBANKBOOKREADER_NOTIFICATION_PREFIX:'请划',
		DEVICE_CARDANDBANKBOOKREADER_NOTIFICATION_SUFFIX:'.....',

		DEVICE_CARDANDBANKBOOKREADER_BTN_TXT:'划卡/折',
		DEVICE_CARDANDBANKBOOKREADER_LABEL_TXT:'卡/折号：',

		DEVICE_MODELPRINT_NO_CONTENT:'无可套打内容！',
		DEVICE_MODELPRINT_NO_CONF : '该交易未在统一凭证库配置，无需进行凭证打印',
		DEVICE_MODELPRINT_FAILURE:'套打失败！',

		// accountReader相关
		// 下拉框内容
		DEVICE_ACCOUNTREADER_BASIC_NAME:'普通银行卡',
		DEVICE_ACCOUNTREADER_IC_NAME:'金融IC卡',
		DEVICE_ACCOUNTREADER_BANKBOOK_NAME:'存折',
		DEVICE_ACCOUNTREADER_BASICJJ_NAME:'普通借记卡',
		DEVICE_ACCOUNTREADER_BAISCDJ_NAME:'普通贷记卡',
		DEVICE_ACCOUNTREADER_ICJJ_NAME:'IC借记卡',
		DEVICE_ACCOUNTREADER_ICDJ_NAME:'IC贷记卡',
		DEVICE_ACCOUNTREADER_FACE: '人脸识别',
		DEVICE_ACCOUNTREADER_QRCODE: '扫码识别',
		DEVICE_ACCOUNTREADER_NFC: 'NFC识别',
		// 按钮内容
		DEVICE_ACCOUNTREADER_BASIC_BTNNAME: '划卡/折',
    DEVICE_ACCOUNTREADER_IC_BTNNAME: '划卡/折',
    DEVICE_ACCOUNTREADER_BASICJJ_BTNNAME: '划卡/折',
    DEVICE_ACCOUNTREADER_BAISCDJ_BTNNAME: '划卡/折',
    DEVICE_ACCOUNTREADER_ICJJ_BTNNAME: '划卡/折',
    DEVICE_ACCOUNTREADER_ICDJ_BTNNAME: '划卡/折',
    DEVICE_ACCOUNTREADER_BANKBOOK_BTNNAME: '刷折',
    DEVICE_ACCOUNTREADER_FACE_BTNNAME: '人脸识别',
    DEVICE_ACCOUNTREADER_QRCODE_BTNNAME: '扫二维码',
		DEVICE_ACCOUNTREADER_NFC_BTNNAME: '读取NFC',
		// select label
		DEVICE_ACCOUNTREADER_SELECT_LABEL: '介质类型:',
		// input label
		DEVICE_ACCOUNTREADER_INPUT_LABEL: '卡/折号:',
		// 错误信息
		// accountReader相关结束

		// jquery ui grid 相关部分
		
		
		
		/** 
		  * html.js 文件
		  */
		//getAreaData的formId为空信息
		GETAREADATA_ISFORMIDNULL_INFO1:'参数错误!',
		GETAREADATA_ISFORMIDNULL_INFO2:'不能为空!',
		
		//messager的ok和cancel按钮
		MESSAGER_DEFAULTS_OK:'确认(Y)',
		MESSAGER_DEFAULTS_CANCEL:"取消(N)",
		//p2环境中取客户端相关信息
		SENDNSCOMMAND_CATCH:'从客户端读取操作员信息失败,请重启客户端!',
		GETUSERINFO_FAILURE:'无法获取操作员信息',
		GETORGINFO_FAILURE:'无法获取机构信息',
		GETROLEINFO_FAILURE:'无法获取岗位信息',
		GETOTHERINFO_FAILURE:'无法获取其他信息',
		//开发window弹出错误信息
		OPENINNERWINDOW_FAILURE:'弹出窗口出错',
		//上传下载方法相关提示信息
		UPLOAD_MESSAGEBOX_TITLE:'错误',
		UPLOAD_MESSAGEBOX_UPLOADING:'正在上传...',
		UPLOAD_MESSAGEBOX_DATEERR_CONTENT:'解析返回数据出错',
		UPLOAD_MESSAGEBOX_UPLOADERR_CONTENT:'上传文件发生错误',
		UPLOAD_MESSAGEBOX_UPLOAD_TIMEOUT:'上传文件超时',
		DOWNLOAD_MESSAGEBOX_DOWNERR_CONTENT:'该下载文件不存在',
		
		/** 
		  * ajax.js 文件 
		 */
		AJAX_PARAMETERS_ERR:'参数不正确!当前参数为',
		AJAX_NORESPONSEDATA:'提示：无返回数据！',
		GETORGDESC_NOCODES:'没有传入机构号信息!',
		GETSTANDARDCODEDESCBYVALUE_NOCATEGORYIDANDVALUE:'必须输入categoryId和value',
		AJAX_HW_REAUTH:'正在等待复核',


		/** 
		  * client.js 文件
		 */
		PROXY_BSLOGIN_MODEL_ERROR:'您当前处于浏览器登录模式，无法调用外设，请在客户端中使用相应功能',
		GETUSERINFO_ERROR:'无法得到用户信息，请检查js是否执行正确!',
		
		/** 
		  * util.js 文件
		 */
		convertCounty_messageBox_content:'您输入的数据位数小于6',
		convertCounty_messageBox_title:'错误信息',
		
		/**
		 * componentMgr.js
		 */
		REG_EXIST_ID_INFO:'componentMgr已包含id为',
		REG_EXIST_ID_INFO1:'的component',
		
		/**
		 * Fileupload
		 */
		//默认必选提示信息
		DEFAULT_MISSINGMESSAGE:"此选项必填",
		DEFAULT_MISSINGMATCHMESSAGE:"此选项不存在",
		//文件删除列表删除按钮文本
		FILEUPLOAD_DELETE:"删  除",
		//文件上传解析数据错误提示信息
		FILEUPLOAD_DECRYPT_DATA:"解析返回数据出错",
		//文件上传错误提示title
		ERROR_TITLE:"错误提示", 
		//文件上传错误提示信息
		FILEUPLOAD_ERROR:"上传文件失败",
		//上传信息
		FILEUPLOAD_MESSAGE:"上传信息",
		//上传按钮文本
		FILEUPLOAD_BUTOON_NAME:"上传",
		//提示选择要上传的文件
		FILEUPLOAD_CHOOSEFILE_MSG:"请选择要上传的文件",
		//文件类型禁止上传提示信息
		FILEUPLOAD_FORBID_MSG:"对不起,您选择的文件类型禁止上传!",
		//允许上传的文件类型为
		FILEUPLOAD_ALLOW_FILETYPE:"允许上传的文件类型为",
		//浏览按钮文本
		FILEUPLOAD_BROWSE_TEXT:"浏&nbsp;览",
		//上传文件超过限制大小
		FILEUPLOAD_LIMITSIZE_MSG:"对不起,您选择的文件大小超过限定大小",
		/**
		 * select国际化开始
		 */
		//空选项文本
		SELECT_NULLlOPTION_LABEL:"请选择",
	    //select必选提示信息
		SELECT_MISSING_MSG:"该选项必选",
		//select添加默认选项已存在值
		SELECT_EXISTVALUE_MSG:"已存在值为",
		//select添加选项已存在文本
		SELECT_EXISTTEXT_MSG:"已存在文本为",
		//select添加选线信息
		SELECT_ADD_MSG:"的选项",
		//select全选文字
		SELECT_ALL_SELECT:"全选",
		
			
		/**
		 * selectionBox
		 */
		//左侧
		SELECTIONBOX_LEFT_LABLENAME:"左侧",
		SELECTIONBOX_RIGHT_LABLENAME:"右侧",
        SELECTIONBOX_ADD:"添加",
        SELECTIONBOX_DEL:"删除",
        SELECTIONBOX_UP:"上移",
        SELECTIONBOX_DOWN:"下移",
		
		/**
		 * checkbox 和radio
		 * 
		 */
		//getSelectObject错误提示信息
		CHECKBOX_GETOBJECT_ERROR:"checkbox未选中或你输入的类型不存在",
		CHECKBOX_CHECK_MSG1:"selected与defaultValue不能同时存在",
		CHECKBOX_CHECK_MSG2:"values属性不能为空",
		CHECKBOX_ERROR_TITLE:"错误信息",
		CHECKBOX_CHECK_MSG3:"labels属性不能为空",
		CHECKBOX_CHECK_MSG4:"name属性不能为空",
		RADIO_GETOBJECT_ERROR:"radio未选中或你输入的类型不存在",
		
		
		/**
		 *图表数据检查提示信息
		 */
		GRAPHIC_CHECK_MSG:"请输入数据或者数据的请求路径",

		//陈自然添加
		//textfield组件国际化
		TEXTFIELD_CHECK_ERROR:"此项信息不正确！",
		TEXTFIELD_CHECK_MSG1:"必填!",
		TEXTFIELD_HELP_MSG:"请输入帮助信息!",
		TEXTFIELD_CHECK_ERROR2:"所填信息错误!",
		TEXTFIELD_AREA_MSG1:"你已输入",
		TEXTFIELD_AREA_MSG2:"个字符，还可以输入",
		TEXTFIELD_AREA_MSG3:"个字符",
		
		//scrollButton组件国际化
		SCROLLBUTTON_HELP_MSG:"没有输入dom，请输入dom!",
		//imgViewer组件国际化
		IMGVIEWER_CHECK_ERROR1:"没有输入dom，请输入dom!",
		IMGVIEWER_CHECK_ERROR2:"错误！！输入的countLine不是Int类型的数字，请输入Int类型的数字",
		//tree组件
		TREE_MSG1:"确认删除",
		TREE_MSG2:"吗?",
		TREE_MSG3:"请输入要查询节点的id",
		TREE_MSG4:"Error: 未查找到节点,Id =",
		//loading组件
		LOADING_MSG1:"遮罩body时，请设置maskBody为true，否则请设置dom",
		LOADING_MSG2:"请配置dom属性或是maskBody属性",
		//jquery.globalCheck
		GLOBALCHECK_MSG1:"您以下字段所对应的标红区域填写有误:",
		
		
		//areaSelector地区组件
		AREA_PROVINCE:"省",
		AREA_CITY:"市",
		AREA_COUNTY:"县",
		AREA_DETAIL:"详细地址",
		AREA_NULL_LABEL:"请选择",
		/**
		 * 外设组件
		 */
		IDENTITY_INSERT_MSG:"请插入您的身份证,请等待验证.....",
		ICCARD_INSERT_MSG:"请插入您的银行卡",
		ICCARD_READ_FAIL_MSG:"读取银行卡信息失败",
		DEVICE_INFO_MSG:"温馨提示:",
		PASSWORD_INSERT_MSG:"请在金属键盘处输入您的密码,并注意遮挡",
		FINGERREADER_INFO_MSG:"请在指纹仪上输入指纹",

		/*
		* errormessagebox
		*/
		ERR_MSG_BOX_ERR_CODE:'错误代码：',
		ERR_MSG_BOX_TRACE_ID:'全局跟踪号：',
		ERR_MSG_BOX_FROM : ',来源 : ',
		ERR_MSG_BOX_COMPONENT : '组件',
		ERR_MSG_BOX_SCREEN_SHOT:['如需上报电子工单，请点击“','截图反馈','；或者致电员工响应中心，电话4006695533。','如您认为错误提示不够清晰易懂，请点击“'],
		ERR_MSG_BOX_KLM:['如需了解更详细的信息，请点击“','访问知识库'],
		ERR_MSG_DETAIL:'详细信息，请点击',

		/*
		* batchmodelprint
		*/
		BATCH_MODEL_PRINTNM:'打印',
		BATCH_MODEL_WIN_TITLE:'打印',
		BATCH_MODEL_CONFIRM_BTN:'确定',
		BATCH_MODEL_CLOSE_BTN:'关闭',
		BATCH_MODEL_LIST:'凭证列表',
		BATCH_MODEL_LIST_INITMSG:'无待打印凭证！',
		BATCH_MODEL_LIST_NODATAMSG:'无待打印凭证！',
		BATCH_MODEL_LIST_COLUMN:['凭证名称','打印状态','操作'],
		BATCH_MODEL_LIST_STATUS:['等待打印','打印完成','打印失败','取消打印','未知状态'],
		BATCH_MODEL_LIST_OPERATION:['重新打印','重新打印','重新打印','未知操作'],
		BATCH_MODEL_LIST_TIP:['请插入',',进行打印！','无待打印凭证！'],
		//scanViewer
		SCANVIEWER_COL_TWO:"两列展示",
		SCANVIEWER_COL_FOUR:"四列展示",
		SCANVIEWER_COL_SIX:"六列展示",
		SCANVIEWER_COL_EIGHT:"八列展示",
		SCANVIEWER_SELECT_ALL:'全选',
		SCANVIEWER_SELECT_INVERT:'反选',
		SCANVIEWER_ZOOM_IN:'放大',
		SCANVIEWER_ZOOM_OUT:'缩小',
		SCANVIEWER_REPLACE:'替换',
		SCANVIEWER_SETUP:'设置',
		SCANVIEWER_INSERT:'插入',
		SCANVIEWER_REVERSE:'翻转',
		SCANVIEWER_DELETE:'删除',
		SCANVIEWER_SCAN:'扫描',
		SCANVIEWER_ROTATE_RIGHT:'右旋转',
		SCANVIEWER_ROTATE_LEFT:'左旋转',

		//ieprint proxy
		PRINT_PROXY_CLOSE:'关闭',

		//授权拦截相关
		AUTH_WINDOW_TITLE:['授权', '请提示客户确认信息','请提示客户输入密码', '业务审批'],
		AUTH_REVIEW_TITLE:'复核',
		HOME_PAGE :'首頁'
}

