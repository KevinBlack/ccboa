/**
 * P2 Framework JS Library 1.0
 * Copyright(c) 2012, China Construction Bank.
 * @Author zhouyuhang
 * Create on: 2012-10-25
 * Last Updated:
 * 将涉及资源访问的常量单独使用命名空间PJF.loadResources by shenye 2014.04.04
 *
 * 说明:PJF框架的配置信息以及PJF函数中需要回调的固定函数，主要是出错后的处理函数
 *
 */
/*
 * The configuration of PJF,each application can modify these params
 */
window.PJF = window.PJF || {};
//PJF需要使用的常量
PJF.constants = {
	//在线浏览文档地址	
	VIEW_DOC_URL: 'http://128.192.80.252/op/view.aspx?src=',
	//在线浏览文档代理地址	
	VIEW_PROXY_URL: 'http://localhost:8808/download.php?fs=',
	//是否将js错误弹出显示
	SHOW_JS_ERROR: false,
	//ajax请求超时时间,单位是毫秒
	AJAX_TIMEOUT: 30000,
	//默认的ajax请求方式
	AJAX_METHOD: 'post',
	//默认为非debug模式
	IS_DEBUG: false,
	//默认的ajax数据格式
	AJAX_DATA_TYPE: 'json',
	//默认后端请求Action
	DEFAULT_ACTION: 'ecpJsonDispatch.action',
	//交易成功代码
	BK_CODE_SUCCESS: '00',
	//开启键盘定制
	KEYBOARD_ENABLE: false,
	//以防万一可以关闭全键盘
	KEYBOARD_ENABLE_BKDOOR: false,
	//分行打印ip
	PRINT_IP: 'http://128.160.96.149:7002',
	// 是否浏览器登陆标志,默认为false,在浏览器登陆的情况下会会由登陆页面置为true
	IS_BSLOGIN_MODEL: false,

	// 是否开启浏览器右键 默认true 表示开启，如需关闭设置该值为false
	IS_ENABLE_RIGHT_CLICK: true,

	// 是否开启高性能模式 默认为false 不开启，
	// 如果设置为true则表示关闭所有额外操作 该属性值优先级低于grid属性
	// 包括：列宽自适应、数据加载时排序操作等。
	HIGH_PERFORMANCE: false,

	// grid 初始缺省提示信息 yh 2013.2.19
	GRID_INIT_INFO: resource.GRID_INIT_INFO,
	/* grid 为查询到数据的提示信息 famingyuan 2013/07/31 */
	GRID_NODATA_INFO: resource.GRID_NODATA_INFO,
	/*grid默认宽度 允许覆盖*/
	GRID_DEFAULT_WIDTH: 850,
	/* grid 1024屏幕宽度及以下 宽度为770 */
	GRID_DEFAULT_WIDTH_1024: 770,
	// grid 验证信息 yh 2013.2.19
	GRID_VALIDATE_INFO: resource.GRID_VALIDATE_INFO,

	// dateinput组件的验证提示信息 linguoyong 2013.2.19
	DATEINPUT_VALIDATE_INFO: resource.DATEINPUT_VALIDATE_INFO,
	// dateinput年月默认的验证信息 linguoyong 2013.5.6
	DATEINPUT_VALIDATE_MONTH_DEFAULT_INFO: resource.DATEINPUT_VALIDATE_MONTH_DEFAULT_INFO,
	// dateinput日期时间默认的验证信息 linguoyong 2013.5.14
	DATEINPUT_VALIDATE_DATETIME_DEFAULT_INFO: resource.DATEINPUT_VALIDATE_DATETIME_DEFAULT_INFO,
	// datespan组件验证第一个日期小于等于第二个日期 信息 lingy 2013.2.20
	DATESPAN_VALIDATE_INFO_ONE: resource.DATESPAN_VALIDATE_INFO_ONE,
	// datespan组件验证第二个日期须大于或等于第一个日期信息 lingy 2013.2.20
	DATESPAN_VALIDATE_INTO_TWO: resource.DATESPAN_VALIDATE_INFO_ONE,
	// //datespan组件验证第二个月份要大于第一个月份信息 lingy 2013.5.6
	DATESAPN_VALIDATE_MONTH_INFO: resource.DATESAPN_VALIDATE_MONTH_INFO,
	//datespan组件开始日期和当前日期比较
	DATESAPN_VALIDATE_STARTDATE_INFO: resource.DATESPAN_VALIDATE_STARTDATE_INFO,
	//datespan组件结束日期和当前日期比较
	DATESAPN_VALIDATE_ENDDATE_INFO: resource.DATESPAN_VALIDATE_ENDDATE_INFO,

	//选择季度比较错误信息 2015-1-5
	DATESPAN_VALIDATE_INTO_TWO_SEASON: resource.DATESPAN_VALIDATE_INTO_TWO_SEASON,

	// 选择的日期和设置的最大日期比较信息
	DATEINPUT_VALIDATE_MAXDATE_INFO: resource.DATEINPUT_VALIDATE_MAXDATE_INFO,
	// 选择的日期和设置的最小日期比较信息
	DATEINPUT_VALIDATE_MINDATE_INFO: resource.DATEINPUT_VALIDATE_MINDATE_INFO,
	// timespinner验证的默认信息 lingy 2013.5.10
	TIMESPINNER_VALIDATE_DEFAULT_INFO: resource.TIMESPINNER_VALIDATE_DEFAULT_INFO,
	// timespinnerspan比较验证的默认信息 lingy 2013.5.10
	TIMESPINNERSPAN_VALIDATE_COMPARE_INTO: resource.TIMESPINNERSPAN_VALIDATE_COMPARE_INTO,
	TIMESPINNERSPAN_VALIDATE_COMPARE_INTO_NOT_EQUAL: resource.TIMESPINNERSPAN_VALIDATE_COMPARE_INTO_NOT_EQUAL,
	// numberspan两个数字比较提示信息 lingy 2013.6.17
	NUMBERSPINNER_VALIDATE_COMPARE_INTO: resource.NUMBERSPINNER_VALIDATE_COMPARE_INTO,
	// numberspinner与最大数字比较验证信息
	NUMBERSPINNER_VALIDATE_MAXNUM_INFO: resource.NUMBERSPINNER_VALIDATE_MAXNUM_INFO,
	// numberspinner与最小数字比较验证信息
	NUMBERSPINNER_VALIDATE_MINNUM_INFO: resource.NUMBERSPINNER_VALIDATE_MINNUM_INFO,
	// numberspinner默认的验证信息
	NUMBERSPINNER_VALIDATE_DEFAULT_INFO: resource.NUMBERSPINNER_VALIDATE_DEFAULT_INFO,
	//判定是否label文本长度超过了一行，需要补充样式 linguoyong 2013.2.26
	LABEL_LINE_FLAG: 16,
	//判定是否label文本在1024情况下是否超出了一行 zhangxr 2013.8.12
	LABEL_LINE_SMALL_FLAG: 7,
	/*机构树机构查询类型*/
	//营业机构 
	ORGTREE_TYPE_B: '08',
	//管理机构
	ORGTREE_TYPE_M: '06',
	//SO15服务　查询所有
	ORGTREE_TYPE_A: 'ALL06',
	//直辖市代码
	AREA_BEIJING: 110000,
	AREA_TIANJING: 120000,
	AREA_SHANGHAI: 310000,
	AREA_CHONGQING: 500000,
	//是否自动选择直辖市 add by bhy 2015-04-02
	AREA_AUTOSELECT: false,

	//把form包裹在panel中然后使其收缩 为true时可以创建包裹form的panel并使其收缩 add zhangxr 2013/8/27 
	FORM_PANEL: false,
	//判断textFiled.getValue是否替换换行转义符
	TEXTFIELD_GETVALUE_REPLACE: true,
	//连续发送相同cps交易间隔时间
	TRANS_INTERVAL_TIME: 0,
	//记录上一次发送的cps交易号
	LAST_CPS_TRANS_ID: '',

	// 普通银行卡
	COMMON_BANK_CARD: 0,
	// IC卡
	IC_CARD: 1,

	// 普通借记卡
	COMMON_DEBIT_CARD: 2,
	// 普通贷记卡
	COMMON_CREDIT_CARD: 3,
	// IC 借记卡
	IC_DEBIT_CARD: 4,
	// IC 贷记卡
	IC_CREDIT_CARD: 5,

	// 存折
	BANKBOOK: 6,

	//是否要求textfield组件require情况下进行trim验证,默认false,应用可自行开启
	TEXTFIELD_REQUIRE_TRIM: false,
	//是否console.log输出到js-log.js中
	logDebug: true,

	/************以下为热键键值常量****************/
	KEYBOARD_F1: '112',
	// KEYBOARD_F2:'113',
	KEYBOARD_F3: '114',
	KEYBOARD_F4: '115',
	KEYBOARD_F5: '116',
	KEYBOARD_F6: '117',
	KEYBOARD_F7: '118',
	KEYBOARD_F8: '119',
	KEYBOARD_F9: '120',
	KEYBOARD_F10: '121',
	KEYBOARD_F11: '122',
	KEYBOARD_F12: '123',

	KEYBOARD_ESC: '27', // ESC
	KEYBOARD_PAGE_UP: '33', // 上翻
	KEYBOARD_PAGE_DOWN: '34', // 下翻
	//通行证代码
	IDENTITY_GANG_AO: '1070',
	IDENTITY_TAI_WAN: '1080',
	IDENTITY_FOREIGN: '1121',
	
	/* STM是否采用iframe架构 */
	STM_IFRAME:false,
	DEFAULT_FONTSIZE: 100,
	DEFAULT_WINDOWWIDTH:1280,
	DEFAULT_WINDOWHEIGHT:1024,
	IS_STM_DEVICE:false,
	IS_YTD_DEVICE:false,
	STM_NAME:"STM",
	YTD_NAME:"YTD",
    ICM_NAME:"ICM",
    TCR_NAME:"TCR",
	//目前用于当为YTD时，某些外设命令直接返回默认成功
	DEVICE_SUCC_INFO:{
		status:1,
		info:{
			status:0 //卡槽无卡
		}
	},
	NEED_LOGIN : true, //是否需要登录
	USE_NEWINPUT : true, //是否使用新输入法
	ON_PROD : false,
    YTD_TIMEOUT : true, //是否在预填单上设置超时监听
    YTD_WINDOWS_KEYBOARD : false,
    IS_ID_EJECT : false, //身份审核中是否吐身份证
    IS_IC_READ : true, //首页是否读IC卡
    STM_TIMEOUT : true, //是否在STM首页上设置超时监听
    GROUP : '111111111', //是否分群
    ZONG_HANG : '111111111',
    NO_PAGE_JUMP_LIST_DEVICE:['App_CDB','CDB'],    
    BUTTON_REPEAT_TIME:600,
    IS_DOWNGRADE: true, //YTD是否判断降级交易
    IS_SENDIM: false, //身份审核中是否发送即时消息
    CCBS_TRANSFORM: '36,42,322,31,32,33,331,34,35,351,43,44,442,45,46,52,53,22,11,64,01186,011860003,012001,0120109,11,12,13,14,15,21,212,22,23,37,371,41,5,51,54,61,62,63,64,65,015070006,015310010,015310011,015310013,010114100,010210006,010210010,010210011,010210019,010231000,010860001,111111111', //进行CCBS改造的省一级行机构号
    FHTS_GROUP: 'http://' + location.host + '/bosWeb/ecpJson.action', //分行特色交易往这里发,测试环境就配置为location.host
    termType: 'stm',
    jsLoadingCount: 0,
    NOT_SUPPORT_CHECK: '210A1077,210A1086,44201651,442A0993,442A0079,442A0122,442A0967,44201027,44201023',
    NOT_SUPPORT_RECEIPT: '210A1077,210A1086,44201651,442A0993,442A0079,442A0122,442A0967,44201027,44201023',
    NOT_REG_IP: ['169.254.1.4'],   //注册STM的时候不发送的IP，目前有激光打印机
    PRINT_PAGE_IDS: ['doSignPrint','inforConfirmSelf','doPrint', 'transPrintToHK', 'print', 'liCaiGouMaiChanPinChengGong', 'liCaiShouRangChengGong',
        'myAuthorizeWithDrawPrint', 'liCaiZhuanRangChengGong', 'fundPrint', 'nobleMetalPrint', 'insurancePrint', 'liCaiGouMaiChanPinChengGong_Order', 'print_Order',
        'buyFundChengGong_Order', 'redemptionFundPrint_Order', 'redemptionFundPrint_Order', 'stSuccessTip','exSuccessTip', 'cashToSpotSuccess', 'forexSellSuccess', 'forexBuySuccess',
        'zhqyPrint', 'tradeprint','printData','checkInfo','inforConfirmSelfNoC','inforConfirm'],
    NO_VALIDATE_MOBILE:[],
    //im ip
    IM_URL: 'ws://128.192.152.74:7070/ws/server',
    //im ip
    IM_HTTP_URL: 'http://128.192.152.74:9090',
    //default authinfo for im
    IM_REQ_AUTH: 'u554ck2yixDih1xF',
    DEF_IM_PASSWORD: 'password',//默认im用户密码
    IM_CONNECTING_EVENT: 'IM_CONNECTING_EVENT',//即时通信正在连接事件
    IM_DISCONNECTING_EVENT: 'IM_DISCONNECTING_EVENT',//即时通信正在断开连接事件
    IM_DISCONNECTED_EVENT: 'IM_DISCONNECTED_EVENT',//即时通信已断开连接事件
    IM_CONNECTED_EVENT: 'IM_CONNECTED_EVENT',//即时通信正在连接事件
    IM_CONNECT_FAIL: 'IM_CONNECT_FAIL', //即时通信连接失败事件};
    IM_USE_WEBSOCKET:true,//设置即时通讯采用websocket发送消息
    IS_REMOTECONTROL: false, //是否远程控管
    SM4_MAINKEY_INDEX: '0807',
    SM4_WORKKEY_INDEX: '0809',
    USE_NEW_ELECCERTIFICATE : true,
    PIC_PATH : '/home/ap/ygqd/nas_link/stm/pic/',
    NO_VALIDATE_MOBILE : ['XMDS20001','CPQ20099','XWD20002','XWD20003','XWD20004','XWD20005','XWD20009','XWD30001','XWD30002','ETCS30001','SPB30001','CRD20002','SPB30003','CRD20015','CRD20014','ACC10005', 'SPB20010', 'GDV30015','GDV30007','SPB20008','CRD20010', 'SPB20006', 'CRD20013', 'ZHC20001','SPB20003','CPQ20009','SIG20008','CRD20001','CRD20009','ACPA10001','ACC10002','TRM20001','TRM20005','TRM20006'], //pad上不校验手机的菜单
    NO_MONITOR_PAGE:['templateInfo','changeTel','mobilePhoneNoModify','checkMobileNumLoss','checkMobileNum','openStockTrade','openStoreGold','accMobNum','inputNewPhoNum',
        'setMobNum','mobileNoVerify','mobileNumQuickModifyVerify','openFundTradeDetail','creditCardSmsVerify','commonInsertCash', 'commonTakeCash', 'commonConfirmCash'], //stm不进行超时吞卡的菜单ID
    NO_OVERTIME_CONFISCATE : ['ACC10001','SPB30005'], //超时不操作吞卡的白名单菜单(即不吞卡)
    LHT_URL: 'www.ccb.com:8101', //人脸识别域名
    PRT_INHALE_ID: ['322C0460','322C0573','322C0505','322C0575','322C0507','322C0506','330C1411','330C1273','330C1274',
        '330C1301','330C1290','440C2747','440C2959','440C3367','440C3176','440C2816','442C0051','442C0133','442C0079','442C0053','442C0054','442C0115'], //综合版STM首页进折试点设备
    VOICE_ID: ['442B1021','442B1022','442B1023','442B1025','442B1026','442B1028','442C0001','110A0490','110C0107','110C0786','110C0656','442A0960','442A1249','442C0035','442C0431','442C0428',
        '442C0429','442C0430','442C0432','442C0433','510C1769','510A0121','310C0229','310C0978','440C2183','440C2747'], //语音识别试点机器
	I18N_ORG: ['110713600','120655000','140626408','220450100','230695551','310763600','350610007','351980101','410803608','420116208','520423600','630883637','110363600','110655800','110675000','110700041','110678200','110903600','110375100','110615400','110616100','110705400','110707000','110385100','110613600','110615200','110619000','310723600','310724400','310683600','310803600','310634000','310663600','310833600','310713600','310714200','310823600','310613640','310813600','310363600','310773600','310673600','310763900','370610908','370619041','370616206','351980201','630102513','630383605','442103798'],
    ZD_DOMAIN: 'zd_pl3.nemc.dev.jh',
    I18N_MENUS: {
        'wei': 'TRM10001,TRM20003,SRV10001,ACC10001'
    },
	NO_SELF_SMART: ["homepage", "subMenuPage", "insertIcCard", "inputCardPwd", "idenCheck", "photoTakeForSelf", "faceIdenBino_self", "templateInfo", "soundIndex", "noCardPwd"]
};

PJF.stmEvent = {
	BEFORE_HASH_CHANGE:'STM_BEFORE_HASH_CHANGE', //hash change之前
	STM_MENU_CLICK:'STM_MENU_CLICK', //点击菜单
	STM_MENU_CLICK_CTX:'STM_MENU_CLICK_CTX', //后端检测平台用的，也是点击菜单，但是发的数据是菜单层级的关系
	INIT_ERR_MSG_BOX:'INIT_ERR_MSG_BOX', //错误提示框
	DEVICE_ERR:'DEVICE_ERR',//外设出错的情况
	OVER_60_NO_REACTION:'OVER_60_NO_REACTION', //超过60秒没有操作
	PJF_STM_UNLOCK:'PJF_STM_UNLOCK', //loading destroy
	PJF_STM_LOCK:'PJF_STM_LOCK', //loading init
	PJF_STM_CALL_DEVICE:'PJF_STM_CALL_DEVICE', //调用外设
	PJF_STM_CALL_DEVICE_BACK:'PJF_STM_CALL_DEVICE_BACK', //外设结果返回
	PJF_RELOAD_PADURL:'PJF_RELOAD_PADURL', //重新打开webview的时候，直接跳转
	LINKBTN_CLICK: 'linkBtnClick.stmGuide'
};

//资源访问常量，如授权、柜外清等
PJF.loadResource = {
	//资源访问window组件Id
	PJF_LOAD_RESOURCES_ID: 'PJF_LOAD_RESOURCES_ID',
	//资源访问window dom Id
	PJF_LOAD_RESOURCES_DOM_ID: 'PJF_LOAD_RESOURCES_DOM_ID',
	//资源访问cps请求conf拷贝副本
	PJF_LOAD_RESOURCES_CONF: {},
	//资源访问成功后回调函数
	PJF_LOAD_RESOURCES_CALLBACK: function() {},
	//授权岗位列表(数组,不通过交易触发时,由应用自己定义)
	PJF_LOAD_RESOURCES_POSITIONS: []
}

//STM记录日志标签类型
PJF.logTag = {
    PJF_LOG_INSERT_CARD: '客户插卡',
    PJF_LOG_INPUT: '输入',
    PJF_LOG_SELECT: '选择',
    PJF_LOG_TRANSACTION: '交易',
    PJF_LOG_SYSTEM: '系统',
    PJF_LOG_HARDWARE: '硬件',
    PJF_LOG_OTHER: '其他',
    PJF_LOG_LOGINADMIN: '进入管理员',
    PJF_LOG_LOGOUTADMIN: '退出管理'
};

//PJF配置的默认函数实现
PJF.configuration = {
	// ajax请求失败后的回调函数
	ajaxFailure: function(fn) {
		new PJF.ui.messageBox({
			title: resource.MESSAGEBOX_AJAX_ERRORTITLE,
			content:  resource.MESSAGEBOX_AJAX_RESPONSEERR_ERROR ,
			style:'warning',
			buttonConfs: [{
				appendStyle:'confirm',
				name: '确定',
				style:'main',
				width: 200,
				height: 80,
				onClick: function(){
					fn && fn({BK_DESC:resource.MESSAGEBOX_AJAX_RESPONSEERR_ERROR,_COMMON:{}})
				}
			}]
		});
	},
	ajaxParseError: function(fn) {
		new PJF.ui.messageBox({
			title: resource.MESSAGEBOX_AJAX_ERRORTITLE,
			content:  resource.MESSAGEBOX_AJAX_RESPONSEERR_DATAERR ,
			style:'warning',
			buttonConfs: [{
				appendStyle:'confirm',
				name: '确定',
				style:'main',
				width: 200,
				height: 80,
				onClick: function(){
					fn && fn({BK_DESC:resource.MESSAGEBOX_AJAX_RESPONSEERR_DATAERR,_COMMON:{}})
				}
			}]
		});
	},
	// ajax请求失败后的回调函数
	ajaxTimeOut: function(fn) {
		new PJF.ui.messageBox({
			title: resource.MESSAGEBOX_AJAXTIMEOUT_TITLE,
			content:  resource.MESSAGEBOX_AJAX_RESPONSEERR_TIMEOUT ,
			style:'warning',
			buttonConfs: [{
				appendStyle:'confirm',
				name: '确定',
				style:'main',
				width: 200,
				height: 80,
				onClick: function(){
					fn && fn({BK_DESC: resource.MESSAGEBOX_AJAX_RESPONSEERR_TIMEOUT,_COMMON:{}})
				}
			}]
		});
	},
	gridFailureByJson: function() {
		new PJF.ui.messageBox({
			title: resource.MESSAGEBOX_AJAXDATA_TITLE,
			content:  resource.MESSAGEBOX_AJAX_RESPONSEERR_DATAlOADINGERR ,
			style:'warning',
			buttonConfs: [{
				appendStyle:'confirm',
				name: '确定',
				style:'main',
				width: 200,
				height: 80,
				onClick: fn || function() {}
			}]
		});
	}
}