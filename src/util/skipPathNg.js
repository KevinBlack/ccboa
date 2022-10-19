/** 
 * @name skipPath 首页待办事宜，列表实现动态跳转到待办页
 * @param {Object} row //列表当前点击行信息
 * @return {Object} 
 * 
*/
export function skipPath(id,DATA_TYPE,DOCUMENT_TYPE,readFlag="1",row={}){
	//待办
	const TODOROUTER = {
		"M_HYZF": {//
			path: "/meeting/chDoneDetial",
			query: {
				id: row.ID,
			}
		},
		"XXFB": {//信息发布
			path: '/secretary/dutyTrends/release/detail',
			query: {
				sourceRouterName: 'dutyTrendsReleaseIndex',
				detail: JSON.stringify(row)
			}
		},
		"HYSYDSP": {//信息报送详情
			path: '/meeting/yd/blueDetail',
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"XXBS_TG": {//信息报送详情
			path: '/sendHandle',
			query: {
				id: row.ID,
				activeName: "tabs_todo",
				sourceRouterName: "dutyTrendInfoSend",
				type: "detail",
				tabsType: "1",
				flag: row.READFLAG
			}
		},
		"XXSP_LZ": {//信息审批详情
			path: '/chengkanDetail',
			query: {
				id: row.ID,
				sourceRouterName: "submitColumnc",
				activeName: "tabs-todo",
				isType: JSON.stringify("chengkan")
			}
		},
		"SEC_DUTYNOTICE": {//行政值班
			path: '/secretary/adminDuty/dutyNotice/dutyNoticeDetail',
			query: {
				id: row.ID,
			}
		},
		"SEC_LXRBS": {
			path: '/secretary/linkman/linkForm',
			query: {
				id: row.ID,
			}
		},
		"SEC_TXLBS": {
			path: '/secretary/adressBook/adressFormworkDetail',
			query: {
				id: row.ID,
				detail: JSON.stringify(row),
				isAdd: true,
			}
		},
		"SEC_ZBBBS": {
			path: '/secretary/dutyRoster/dutyFormworkDetail',
			query: {
				id: row.ID,
				detail: JSON.stringify(row),
				isAdd: true,
			}
		},
		"DWLJBG": {
			path: '/secretary/partyMemLeavRep/detail',
			query: {
				id: row.ID,
				type: 'edit',
			}
		},
		"SWSWBM": {
			path: '/receiveDispatch',
			query: {
				id: row.ID,
				readFlag: row.READFLAG  //readFlag:是否已读
			}
		},
		"SWSWBM_XB": {//
			path: '/receiveSponsorDetail',
			query: {
				id: row.ID,
				readFlag: row.READFLAG  //readFlag:是否已读
			}
		},
		"D_LDHDLR": {//新建活动领导资料代办详情
			path: '/secretary/datumManage/activityManage',
			query: {
				data: row.ID,
				type: "datumManage_index"
			}
		},
		"D_BHXX": { // 个人办公 - 信息发布
			path: '/dashboard/personalOffice/publishInfo/selfBankInfoPub',
			query: {
				id: row.ID
			}
		},
		"TDGG": { //团队公告
			path: "/",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"DZFW": { //发文-电子-待办 
			path: "/bankDispach",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"SWFW": { //发文-实物-待办 
			path: "/bankEntityDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_FWHQ": {//发文-会签-待办
			path: "/countersignend",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_CFW": { //发文-重发审批-电子-待办
			path: "/rexamineDispach",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"S_CFW": {//发文-重发审批-实物-待办
			path: "/rexamineEntityDispach",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_CFWHQ": { //发文-重发会签-待办
			path: "/bankRecountersign",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		'FW_TW': { //发文退文单
			path: "/twBank",
			query: {
				id: row.ID,
			}
		},
		"DZSW": { //收文-电子-待办
			path: "/receiveElectronDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG  //readFlag:是否已读
			}
		},
		"SWSW": { //收文-实物-待办
			path: "/receiveDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"SWSW_XB": { //收文-协办-待办
			path: "/receiveSponsorDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWSWCT_XB": {  //收文-协办-待办
			path: "/receiveSponsorDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"DZSW_XB": {  //收文-协办-待办
			path: "/receiveSponsorDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWSWCT": {  //收文-传统实物收文-待办
			path: "/receiveDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWSW_CB": {  //收文-实物承办-待办
			path: "/shiwucbDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SW_TW': { //收文退文单
			path: "/receiveFileBackDispach",
			query: {
				id: row.ID,
			}
		},
		'SWCY': { //收文传阅单
			path: "/reCircularizeDispatch",
			query: {
				id: row.ID,
				state: "0",
				// readFlag:row.READFLAG,
			}
		},
		"DZQB": { //签报管理-签报-非跨行-待办
			path: "/signquoteWaitFkhDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"KHQBQS": {  //签报管理-签报-跨行请示-待办
			path: "/signquoteWaitKhQshDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"KHQB_SP": {  //签报管理-签报-跨行审批-待办
			path: "/signquoteWaitKhSphDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWQB": {  //签报管理-签报-实物-待办
			path: "/signquoteWaitEntityDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"QBCY": {  //签报管理-签报-传阅
			path: "/circularizeStateWaitQsh",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: "0",
				readFlag: row.READFLAG//0---未阅读；1----已阅
			}
		},
		"KHQB_HQ": {  //签报管理-会签-跨行-待办
			path: "/huiQianKhWaitDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"DZQB_HQ": {  //签报管理-会签-本行-待办
			path: "/huiQianFkhWaitDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"KHQB_XB": { // 签报管理-协办-待办
			path: "/xiebanWaitQbDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"QB_TW": {  //签报管理-非跨行-退文单
			path: "/tuiwenfeikhDispatch",
			query: {
				id: row.ID,
			}
		},
		"QB_KH_TW": {  //签报管理-跨行-退文单
			path: "/tuiwenkhDispatch",
			query: {
				id: row.ID,
			}
		},
		"DXZX_DB": {  //专项督办-单项-待办
			path: "/singleSuperviseHandleAdd",
			query: {
				id: row.ID,
				state: "1",
				readFlag: row.READFLAG
			}
		},
		"PLZXDB": {  //专项督办-批量-待办
			path: "/batchSuperviseAdd",
			query: {
				id: row.ID,
				state: "1",
				readFlag: row.READFLAG
			}
		},
		"DXZXDB_XB": {  //专项督办-协办-待办
			path: "/jointlyDetail",
			query: {
				id: row.ID,
				state: "1",
				readFlag: row.READFLAG
			}
		},
		"DXZXDB_CB": {  //专项督办-承办-待办
			path: "/undertakeDetail",
			query: {
				id: row.ID,
				state: "1",
				readFlag: row.READFLAG,
			}
		},
		"ZXDBFIRST": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "1",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"MF_MF": {  //范文管理-模板及范文-待办
			path: "/detailFw",
			query: {
				id: row.ID,
				state: "1"
			}
		},
		"MF_MF_YJ": {  //范文管理-意见征集-待办
			path: "/opinionDetail",
			query: {
				id: row.ID,
				state: "1"
			}
		},
		"柔性团队-任务管理-待办": {
			path: "/taskHandle",
			query: {
				taskid: row.ID,
			}
		},
		"D_SWSPWH": {  //事务审批-流转-待办(非跨行)
			path: "/approval/detail",
			query: {
				type: 'checkLz',
				id: row.ID,
				isKh: "0"  //isKh:0---非跨行；1---跨行
			}
		},
		"SW_KHSWSPSPH": {  //事务审批-流转-待办 （跨行）
			path: "/approval/detail",
			query: {
				type: "checkLz",
				id: row.ID,
				isKh: "1"  //isKh:0---非跨行；1---跨行
			}
		},
		"SW_KHSWSP": {  //事务审批-流转-待办 （跨行）
			path: "/approval/detail",
			query: {
				type: "checkLz",
				id: row.ID,
				isKh: "1"  //isKh:0---非跨行；1---跨行
			}
		},
		"D_BHZF": {  //便函管理-制发-待办
			path: "/addproceorder",
			query: {
				id: row.ID,
			}
		},
		"D_BHCB": {  //便函管理-承办-待办
			path: "/underdeal",
			query: {
				id: row.ID,
			}
		},
		"个人办公-本行信息-待办": {
			path: "/dashboard/personalOffice/publishInfo/selfBankInfoPub",
			query: {
				id: row.ID,
			}
		},
		"秘书工作-值班动态-待办": {
			path: "/sendHandle",
			query: {
				data: row,
				type: 'detail',
				tabsType: "1"
			}
		},
		"信息刊物-部门信息-待办": {
			path: "/publication/departInfo/depart",
			query: {
				type: 'todo',
				id: row.depInfoPubId,
				jihe: row
			}
		},
		"MARK_052": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_051": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001bj": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001WH": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_053": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"YZ_GWYZDJ": {//用印管理-公文用印
			path: "/sealManage/useSeal/draft/document",
			query: {
				id: row.ID,
				markOrderType: "1"
			}
		},
		"BHYYDJ": {//用印管理-公文用印
			path: "/sealManage/useSeal/draft/document",
			query: {
				id: row.ID,
				markOrderType: "1"
			}
		},
		"YZ_GWYZDJbj": {//用印管理-公文用印
			path: "/sealManage/useSeal/draft/document",
			query: {
				id: row.ID,
				markOrderType: "1"
			}
		},
		'YZ_YYJWH': {//用印管理-用印机设备维护审批
			path: "/sealManage/facilityManage/approval",
			query: {
				id: row.ID,
				type: "待办"
			}
		},
		"MARK_003": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/introduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_003bj": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/introduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_005": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/introduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_004": {//用印管理-部门用印
			path: "/sealManage/useSeal/draft/department",
			query: {
				id: row.ID,
				markOrderType: "4"
			}
		},
		"D_ARCHMARKBMYY": {//用印管理-部门用印
			path: "/sealManage/useSeal/draft/department",
			query: {
				id: row.ID,
				markOrderType: "4"
			}
		},
		"HY_XTHYTZZF": {//会议-制发-待办
			path: "/meeting/zf/zfTwo",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BBHYTZZF": {//会议-制发-待办
			path: "/meeting/zf/zfTwo",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BMHYTZZF": {//会议-制发-待办
			path: "/meeting/zf/zfTwo",
			query: {
				id: row.ID,
			}
		},
		"D_PXTZZF": {//会议-制发-待办
			path: "/meeting/zf/zfTwo",
			query: {
				id: row.ID,
			}
		},
		"HY_XTHYTZCH": {//会议-承办-参会-待办
			path: "/meeting/chDetial",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BBHYTZCH": {//会议-承办-参会-待办
			path: "/meeting/chDetial",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BMHYTZCH": {//会议-承办-参会-待办
			path: "/meeting/chDetial",
			query: {
				id: row.ID,
			}
		},
		"D_PXTZCX": {//会议-承办-参会-待办
			path: "/meeting/chDetial",
			query: {
				id: row.ID,
			}
		},
		"HY_XTHYTZCB": {//会议-承办-承办-待办
			path: "/meeting/cbDetial",
			query: {
				id: row.ID,
			}
		},
		"D_PXTZCXWH": {//会议-承办-承办-待办
			path: "/meeting/cbDetial",
			query: {
				id: row.ID,
			}
		},
		'LSZSQ': { //临时转授权 -- 待办
			path: "/subTempAdd",
			query: {
				type: '0',
				id: row.ID,
				userid: row.AVYEXCTRID
			}
		},
		'CQSQ': { //长期转授权--待办
			path: "/subLongAdd",
			query: {
				id: row.ID
			}
		},
		'BMXX_DJ': { //流转中的数据 -- 待办
			path: "/publication/departInfo/depart",
			query: {
				depInfoPubId: row.ID
			}
		},
		'XXKW_MRDTZK': {
			path: "/publication/editJournal/editJournal/editRent/editingGroup",
			query: {
				pdnId: row.ID
			}
		},
		'XXKW_MRDTTG': {
			path: "/publication/tgMangement/wriScript/repairScript",
			query: {
				rowData: row.ID
			}
		},
		'PAPER_DJ': { // 文件处理登记 - 待办
			path: "/bianhan/detail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'PAPER_HQ': { // 文件处理办理 - 待办
			path: "/bianhan/docHandling/docDetail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'TEL_DJ': { // 电话记录 - 待办
			path: "/bianhan/phoneForm/detail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'TEL_HQ': { // 电话记录办理 - 待办
			path: "/bianhan/phoneForm/handleDetail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'D_LDPS': { // 实物领导批示登记：isAdd - false(详情)  true(新增)
			path: "/registerTable",
			query: {
				isAdd: JSON.stringify(false),
				detail: JSON.stringify(row)
			}
		},
		'SEC_YTBS': { // 秘书工作议题报送
			path: "/secretary/presidentMeeting/topicSub/topicDetailed",
			query: {
				type: '1',
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_YT_ZBSH': { // 秘书工作议题暂不上会
			path: "/secretary/presidentMeeting/topicMange/topicMangeDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_BACK_YT': { // 秘书工作退回预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status == undefined ? '0' : row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_ZJ_BACK_YT': { // 退回议题
			path: "/secretary/presidentMeeting/topicSub/topicDetail",
			query: {
				type: '1',
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_YTZ_YTBS": { // 秘书工作_预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status == undefined ? '0' : row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"HBHY_CB": { // 秘书工作_预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status == undefined ? '0' : row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"HBHY_CH": { // 秘书工作_报名通知
			path: "/secretary/presidentMeeting/registerNotice/registerDetail",
			query: {
				type: row.type,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_YTZ_SH': { // 收回预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_BMTZ_SH': { // 收回报名通知
			path: "/secretary/presidentMeeting/registerNotice/registerDetail",
			query: {
				type: row.type,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_ZSTZ_SH': { // 收回正式通知
			path: "/secretary/presidentMeeting/formalNotice/formalDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_ZSTZ": { // 秘书工作_正式通知
			path: "/secretary/presidentMeeting/formalNotice/formalDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_FK_YTZ": { //预通知反馈通知
			path: "/secretary/presidentMeeting/conferList/conferDetail",
			query: {
				type: 1,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_FK_BMTZ": { //正式通知反馈通知
			path: "/secretary/presidentMeeting/conferList/conferDetail",
			query: {
				type: 1,
				id: row.ID,
				// detail: JSON.stringify(row),
				readFlag: row.READFLAG,
			}
		},
	};
	//已办
	const DONEROUTER = {
		"XXFB": {//信息发布
			path: '/secretary/dutyTrends/release/detail',
			query: {
				sourceRouterName: 'dutyTrendsReleaseIndex',
				detail: JSON.stringify(row)
			}
		},
		'YZ_YYJWH': {//用印管理-用印机设备维护审批
			path: "/sealManage/facilityManage/approval",
			query: {
				id: row.ID,
				type: "已办"
			}
		},
		'FW_TW': { //发文退文单
			path: "/twBank",
			query: {
				id: row.ID,
			}
		},
		'GWWYD': { //公文问与答
			path: "/answers",
			query: {
				id: row.ID,
				type: 'index'
			}
		},
		"HYSYDSP": {//信息报送详情
			path: '/meeting/yd/blueDetail1',
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
				orderStatu: '3',
				//orderStatu:row.PCSAVYNM=="预订成功"?3:(row.PCSAVYNM=="取消预订"||row.PCSAVYNM=="系统自动取消预订"?1:2)
			}
		},
		"XXBS_TG": {//信息报送详情
			path: '/sendHandleDone',
			query: {
				id: row.ID,
				activeName: "tabs_doing",
				sourceRouterName: "dutyTrendsSendHandlDone",
				type: "detail",
				tabsType: "3",
				flag: row.READFLAG,
				showFlag: "fei"
			}
		},
		"XXSP_LZ": {//信息审批详情
			path: '/chengkanDetailDone',
			query: {
				id: row.ID,
				sourceRouterName: "submitColumnc",
				isType: JSON.stringify("chengkan"),
				isflg: "fei",
				activeName:'tabs-doing'
			}
		},
		"SEC_DUTYNOTICE": {//行政值班
			path: '/secretary/adminDuty/dutyNotice/dutyNoticeDetail',
			query: {
				id: row.ID,
			}
		},
		"SEC_LXRBS": {
			path: '/secretary/linkman/linkForm',
			query: {
				id: row.ID,
			}
		},
		"SEC_TXLBS": {
			path: '/secretary/adressBook/adressFormworkDetail',
			query: {
				id: row.ID,
				detail: JSON.stringify(row),
				isAdd: true,
			}
		},
		"SEC_ZBBBS": {
			path: '/secretary/dutyRoster/dutyFormworkDetail',
			query: {
				id: row.ID,
				detail: JSON.stringify(row),
				isAdd: true,
			}
		},
		"DWLJBG": {
			path: '/secretary/partyMemLeavRep/detail',
			query: {
				id: row.ID,
				type: 'edit',
			}
		},
		"D_LDHDLR": {//新建活动领导资料代办详情
			path: '/secretary/datumManage/activityManage',
			query: {
				data: row.ID,
				type: "datumManage_index"
			}
		},
		"D_BHXX": { // 个人办公 - 信息发布
			path: '/dashboard/personalOffice/publishInfo/selfBankInfoPub',
			query: {
				id: row.ID
			}
		},
		"TDGG": { //团队公告
			path: "/",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		// "D_SWSPWH":{  //事务审批-流转-待办(非跨行)
		// 	path:"/approval/detail",
		// 	query: {
		// 		type:'checkLz',
		// 		id: row.ID,
		// 		isKh:"0"  //isKh:0---非跨行；1---跨行
		// 	}
		// },
		// "SW_KHSWSP":{  //事务审批-流转-待办 （跨行）
		// 	path:"/approval/detail",
		// 	query: {
		// 		type:"checkLz",
		// 		id: row.ID,
		// 		isKh:"1"  //isKh:0---非跨行；1---跨行
		// 	}
		// },
		// "D_BHZF":{  //便函管理-制发-待办
		// 	path:"/addproceorder",
		// 	query: {
		// 		id: row.ID,
		// 	}
		// },
		// "D_BHCB":{  //便函管理-承办-待办
		// 	path:"/underdeal",
		// 	query: {
		// 		id: row.ID,
		// 	}
		// },
		"个人办公-本行信息-待办": {
			path: "/dashboard/personalOffice/publishInfo/selfBankInfoPub",
			query: {
				id: row.ID,
			}
		},
		"秘书工作-值班动态-待办": {
			path: "/sendHandle",
			query: {
				data: row,
				type: 'detail',
				tabsType: "1"
			}
		},
		"信息刊物-部门信息-待办": {
			path: "/publication/departInfo/depart",
			query: {
				type: 'todo',
				id: row.depInfoPubId,
				jihe: row
			}
		},
		"MARK_052": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_051": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001bj": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001WH": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_053": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_003": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/doneIntroduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_003bj": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/doneIntroduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_005": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/doneIntroduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_004": {//用印管理-部门用印
			path: "/sealManage/useSeal/draft/doneDepartment",
			query: {
				id: row.ID,
				markOrderType: "4"
			}
		},
		"D_ARCHMARKBMYY": {//用印管理-部门用印
			path: "/sealManage/useSeal/draft/department",
			query: {
				id: row.ID,
				markOrderType: "4"
			}
		},
		// "HY_XTHYTZZF":{//会议-制发-待办
		// 	path:"/meeting/zf/zfTwo",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		// "HYGL_BBHYTZZF":{//会议-制发-待办
		// 	path:"/meeting/zf/zfTwo",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		// "HYGL_BMHYTZZF":{//会议-制发-待办
		// 	path:"/meeting/zf/zfTwo",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		// "D_PXTZZF":{//会议-制发-待办
		// 	path:"/meeting/zf/zfTwo",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		// "HY_XTHYTZCH":{//会议-承办-参会-待办
		// 	path:"/meeting/chDetial",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		// "HYGL_BBHYTZCH":{//会议-承办-参会-待办
		// 	path:"/meeting/chDetial",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		// "HYGL_BMHYTZCH":{//会议-承办-参会-待办
		// 	path:"/meeting/chDetial",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		// "D_PXTZCX":{//会议-承办-参会-待办
		// 	path:"/meeting/chDetial",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		// "HY_XTHYTZCB":{//会议-承办-承办-待办
		// 	path:"/meeting/cbDetial",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		// "D_PXTZCXWH":{//会议-承办-承办-待办
		// 	path:"/meeting/cbDetial",
		// 	query: {
		// 		id:row.ID,
		// 	}
		// },
		'BMXX_DJ': { //流转中的数据 -- 待办
			path: "/publication/departInfo/depart",
			query: {
				depInfoPubId: row.ID
			}
		},
		'XXKW_MRDTZK': {
			path: "/publication/editJournal/editJournal/editRent/editingGroup",
			query: {
				pdnId: row.ID
			}
		},
		'XXKW_MRDTTG': {
			path: "/publication/tgMangement/wriScript/repairScript",
			query: {
				rowData: row.ID
			}
		},
		'PAPER_DJ': { // 文件处理登记 - 待办
			path: "/bianhan/detail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'PAPER_HQ': { // 文件处理办理 - 待办
			path: "/bianhan/docHandling/docDetail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'TEL_DJ': { // 电话记录 - 待办
			path: "/bianhan/phoneForm/detail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'TEL_HQ': { // 电话记录办理 - 待办
			path: "/bianhan/phoneForm/handleDetail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		"ZXDBFIRST": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "1",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"SWSWCT": {  //收文-传统实物收文-待办
			path: "/receiveDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"QBCY": {  //签报管理-签报-传阅
			path: "/circularizeStateWaitQsh",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: "1",
				readFlag: row.READFLAG//0---未阅读；1----已阅
			}
		},
		"SWSWBM": {
			path: '/receiveBjYb',
			query: {
				id: row.ID,
				readFlag: row.READFLAG  //readFlag:是否已读
			}
		},
		"SWSWBM_XB": {//
			path: '/receiveSponsorReadonly',
			query: {
				id: row.ID,
				readFlag: row.READFLAG  //readFlag:是否已读
			}
		},
		//2021.3.24新加 每日动态已办 start
		// "D_LDHDLR": {//新建活动领导资料代办详情
		// 	path: '/secretary/datumManage/DownAndFinish',
		// 	query: {
		// 		data:row.ID
		// 	}
		// },
		'XXKW_MRDTZK': {
			path: "/publication/editJournal/editJournal/editRent/editingGroup",
			query: {
				pdnId: row.ID
			}
		},
		//2021.3.24新加 每日动态已办 end
		// "D_BHXX": { // 个人办公 - 信息发布
		// 	path: '/dashboard/personalOffice/publishInfo/finselfBankInfoPub',
		// 	query: {
		// 		id:row.ID
		// 	}
		// },
		"DZFW": {//发文-电子-已办
			path: "/bankDispachDone",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"SWFW": {//发文-实物-已办
			path: "/bankEntityDispatchDone",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_FWHQ": {//发文-会签-已办
			path: "/countersignendDone",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_CFW": {//发文-重发审批-电子-已办
			path: "/rexamineDone",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"S_CFW": {//发文-重发审批-实物-已办
			path: "/rexamineEntityDone",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_CFWHQ": { //发文-重发会签-已办
			path: "/bankRecountersignDone",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"DZSW": { //收文-电子-已办
			path: "/receiveDzBjYb",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"SWSW": { //收文-实物-已办
			path: "/receiveBjYb",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"SWSW_XB": { //收文-协办-已办
			path: "/receiveSponsorReadonly",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWSWCT_XB": {  //收文-协办-已办
			path: "/receiveSponsorReadonly",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"DZSW_XB": {  //收文-协办-已办
			path: "/receiveSponsorReadonly",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWSWCT": {  //收文-传统实物收文-已办
			path: "/receiveBjYb",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWSW_CB": {  //收文-实物承办-已办
			path: "/shiwucbDetailReadonly",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SW_TW': { //收文退文单 - 已办
			path: "/receiveFileBackDispach",
			query: {
				id: row.ID,
			}
		},
		'SWCY': { //收文传阅单 - 已办
			path: "/reCircularizeDispatch",
			query: {
				id: row.ID,
				state: "1",
				readFlag: row.READFLAG,
			}
		},
		"DZQB": {  //签报管理-签报-非跨行-已办
			path: "/signquoteFinishFkhDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"KHQBQS": {  //签报管理-签报-跨行请示-已办
			path: "/signquoteFinishKhQshDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"KHQB_SP": { // 签报管理-签报-跨行审批-已办 
			path: "/signquoteFinishKhSphDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWQB": {  //签报管理-签报-实物-已办
			path: "/signquoteFinishEntityDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"KHQB_HQ": {  //签报管理-会签-跨行-已办
			path: "/huiqianKhFinishDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"DZQB_HQ": {  //签报管理-会签-本行-已办
			path: "/huiqianFkhFinishDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"KHQB_XB": {  //签报管理-协办-已办
			path: "/xiebanFinishQbDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"DXZX_DB": {  //专项督办-单项-已办
			path: "/singleSuperviseHandleAdd",
			query: {
				id: row.ID,
				state: "2"
			}
		},
		"PLZXDB": {  //专项督办-批量-已办
			path: "/batchSuperviseAdd",
			query: {
				id: row.ID,
				state: "2"
			}
		},
		"DXZXDB_XB": {  //专项督办-协办-已办
			path: "/jointlyDetail",
			query: {
				id: row.ID,
				state: "2"
			}
		},
		"DXZXDB_CB": {  //专项督办-承办-待办
			path: "/undertakeDetail",
			query: {
				id: row.ID,
				state: "2",
				readFlag: row.READFLAG,
			}
		},
		"MF_MF": {  //范文管理-模板及范文-已办
			path: "/detailFw",
			query: {
				id: row.ID,
			}
		},
		"MF_MF_YJ": {  //范文管理-意见征集-已办
			path: "/opinionDetail",
			query: {
				id: row.ID,
			}
		},
		"柔性团队-任务管理-已办": {  //柔性团队-任务管理-已办
			path: "/taskHandle",
			query: {
				taskid: row.ID,
			}
		},
		"D_SWSPWH": {  //事务审批-流转-已办
			path: "/approval/finDetail",
			query: {
				type: "checkLz",
				id: row.ID,
				isKh: "0"   //isKh:0---非跨行；1---跨行
			}
		},
		"SW_KHSWSP": {  //事务审批-流转-已办
			path: "/approval/finDetail",
			query: {
				type: "checkLz",
				id: row.ID,
				isKh: "1"   //isKh:0---非跨行；1---跨行
			}
		},
		"D_BHZF": {  //便函管理-制发-已办
			path: "/proceHas",
			query: {
				id: row.ID,
				type: "1"
			}
		},
		"D_BHCB": {  //便函管理-承办-已办
			path: "/underdealHas",
			query: {
				id: row.ID,
				type: "1"
			}
		},
		"个人办公-模板及范文-已办": {
			path: "/dashboard/personalOffice/publishInfo/finselfBankInfoPub",
			query: {
				id: row.ID,
			}
		},
		"秘书工作-值班动态-已办": {
			path: "/sendHandle",
			query: {
				data: row,
				type: 'detail',
				tabsType: "2"
			}
		},
		"信息刊物-部门信息-已办": {
			path: "/publication/departInfo/departfinish",
			query: {
				type: '01',
				id: row.depInfoPubId,
				jihe: row
			}
		},
		"MARK_052": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_051": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001bj": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001WH": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_053": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common/dis",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"YZ_GWYZDJ": {//用印管理-公文用印
			path: "/sealManage/useSeal/draft/doneDocument",
			query: {
				id: row.ID,
				markOrderType: "1"
			}
		},
		"BHYYDJ": {//用印管理-公文用印
			path: "/sealManage/useSeal/draft/doneDocument",
			query: {
				id: row.ID,
				markOrderType: "1"
			}
		},
		"YZ_GWYZDJbj": {//用印管理-公文用印
			path: "/sealManage/useSeal/draft/doneDocument",
			query: {
				id: row.ID,
				markOrderType: "1"
			}
		},
		"MARK_003": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/doneIntroduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_003bj": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/doneIntroduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_005": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/doneIntroduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_004": {//用印管理-部门用印
			path: "/sealManage/useSeal/draft/doneDepartment",
			query: {
				id: row.ID,
				markOrderType: "4"
			}
		},
		"D_ARCHMARKBMYY": {//用印管理-部门用印
			path: "/sealManage/useSeal/draft/department",
			query: {
				id: row.ID,
				markOrderType: "4"
			}
		},
		"HY_XTHYTZZF": {//会议-制发
			path: "/meeting/zf/zfDoneDetail",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BBHYTZZF": {//会议-制发
			path: "/meeting/zf/zfDoneDetail",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BMHYTZZF": {//会议-制发
			path: "/meeting/zf/zfDoneDetail",
			query: {
				id: row.ID,
			}
		},
		"D_PXTZZF": {//会议-制发
			path: "/meeting/zf/zfDoneDetail",
			query: {
				id: row.ID,
			}
		},
		"HY_XTHYTZCH": {//会议-承办-参会
			path: "/meeting/chDoneDetial",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BBHYTZCH": {//会议-承办-参会
			path: "/meeting/chDoneDetial",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BMHYTZCH": {//会议-承办-参会
			path: "/meeting/chDoneDetial",
			query: {
				id: row.ID,
			}
		},
		"D_PXTZCX": {//会议-承办-参会
			path: "/meeting/chDoneDetial",
			query: {
				id: row.ID,
			}
		},
		"HY_XTHYTZCB": {//会议-承办-承办
			path: "/meeting/cbDoneDetial",
			query: {
				id: row.ID,
			}
		},
		"D_PXTZCXWH": {//会议-承办-承办
			path: "/meeting/cbDoneDetial",
			query: {
				id: row.ID,
			}
		},
		'LSZSQ': { //临时转授权 --已办
			path: "/subTempAdd",
			query: {
				type: 'row.type',
				id: row.ID
			}
		},
		'CQSQ': { //长期转授权 -- 已办
			path: "/subLongDone",
			query: {
				id: row.ID
			}
		},
		'D_LDPS': { // 实物领导批示登记
			path: "/registerTableDone",
			query: {
				buttonType: JSON.stringify(1),
				detail: JSON.stringify(row)
			}
		},
		'SEC_YTBS': { // 秘书工作议题报送
			path: "/secretary/presidentMeeting/topicSub/topicDetailed",
			query: {
				type: '1',
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_YT_ZBSH': { // 秘书工作议题暂不上会
			path: "/secretary/presidentMeeting/topicMange/topicMangeDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_BACK_YT': { // 秘书工作退回预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status == undefined ? '0' : row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_ZJ_BACK_YT': { // 退回议题
			path: "/secretary/presidentMeeting/topicSub/topicDetail",
			query: {
				type: '1',
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_YTZ_YTBS": { // 秘书工作_预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status == undefined ? '0' : row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"HBHY_CB": { // 秘书工作_预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status == undefined ? '0' : row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"HBHY_CH": { // 秘书工作_报名通知 
			path: "/secretary/presidentMeeting/registerNotice/registerDetail",
			query: {
				type: row.type,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_YTZ_SH': { // 收回预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_BMTZ_SH': { // 收回报名通知
			path: "/secretary/presidentMeeting/registerNotice/registerDetail",
			query: {
				type: row.type,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_ZSTZ_SH': { // 收回正式通知
			path: "/secretary/presidentMeeting/formalNotice/formalDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_ZSTZ": { // 秘书工作_正式通知
			path: "/secretary/presidentMeeting/formalNotice/formalDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_FK_YTZ": { //预通知反馈通知
			path: "/secretary/presidentMeeting/conferList/conferDetail",
			query: {
				type: 1,
				id: row.ID,
				// detail: JSON.stringify(row),
				readFlag: row.READFLAG,
			}
		},
		"SEC_FK_BMTZ": { //正式通知反馈通知
			path: "/secretary/presidentMeeting/conferList/conferDetail",
			query: {
				type: 1,
				id: row.ID,
				// detail: JSON.stringify(row),
				readFlag: row.READFLAG,
			}
		},
	};
	//办结
	const COMPLETEROUTER = {
		"M_HYZF": {//
			path: "/meeting/chDoneDetial",
			query: {
				id: row.ID,
			}
		},
		"XXFB": {//信息发布
			path: '/secretary/dutyTrends/release/detail',
			query: {
				sourceRouterName: 'dutyTrendsReleaseIndex',
				detail: JSON.stringify(row)
			}
		},
		'YZ_YYJWH': {//用印管理-用印机设备维护审批
			path: "/sealManage/facilityManage/approval",
			query: {
				id: row.ID,
				type: "待办"
			}
		},
		"HYSYDSP": {//信息报送详情
			path: '/meeting/yd/blueDetail1',
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
				orderStatu: '3',
				//orderStatu:row.PCSAVYNM=="预订成功"?3:(row.PCSAVYNM=="取消预订"||row.PCSAVYNM=="系统自动取消预订"?1:2)
			}
		},
		'GWWYD': { //公文问与答
			path: "/answers",
			query: {
				id: row.ID,
				type: 'index'
			}
		},
		"XXBS_TG": {//信息报送详情
			path: '/sendHandle',
			query: {
				id: row.ID,
				activeName: "tabs_todo",
				sourceRouterName: "dutyTrendInfoSend",
				type: "detail",
				tabsType: "1",
				flag: row.READFLAG
			}
		},
		"XXSP_LZ": {//信息审批详情
			path: '/chengkanDetail',
			query: {
				id: row.ID,
				sourceRouterName: "submitColumnc",
				activeName: "tabs-todo",
				isType: JSON.stringify("chengkan")
			}
		},
		"SEC_DUTYNOTICE": {//行政值班
			path: '/secretary/adminDuty/dutyNotice/dutyNoticeDetail',
			query: {
				id: row.ID,
			}
		},
		"SEC_LXRBS": {
			path: '/secretary/linkman/linkForm',
			query: {
				id: row.ID,
			}
		},
		"SEC_TXLBS": {
			path: '/secretary/adressBook/adressFormworkDetail',
			query: {
				id: row.ID,
				detail: JSON.stringify(row),
				isAdd: true,
			}
		},
		"SEC_ZBBBS": {
			path: '/secretary/dutyRoster/dutyFormworkDetail',
			query: {
				id: row.ID,
				detail: JSON.stringify(row),
				isAdd: true,
			}
		},
		"DWLJBG": {
			path: '/secretary/partyMemLeavRep/detail',
			query: {
				id: row.ID,
				type: 'edit',
			}
		},
		"D_LDHDLR": {//新建活动领导资料代办详情
			path: '/secretary/datumManage/activityManage',
			query: {
				data: row.ID,
				type: "datumManage_index"
			}
		},
		"D_BHXX": { // 个人办公 - 信息发布
			path: '/dashboard/personalOffice/publishInfo/selfBankInfoPub',
			query: {
				id: row.ID
			}
		},
		"TDGG": { //团队公告
			path: "/",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_SWSPWH": {  //事务审批-流转-待办(非跨行)
			path: "/approval/detail",
			query: {
				type: 'checkLz',
				id: row.ID,
				isKh: "0"  //isKh:0---非跨行；1---跨行
			}
		},
		"SW_KHSWSP": {  //事务审批-流转-待办 （跨行）
			path: "/approval/detail",
			query: {
				type: "checkLz",
				id: row.ID,
				isKh: "1"  //isKh:0---非跨行；1---跨行
			}
		},
		"D_BHZF": {  //便函管理-制发-待办
			path: "/addproceorder",
			query: {
				id: row.ID,
			}
		},
		"D_BHCB": {  //便函管理-承办-待办
			path: "/underdeal",
			query: {
				id: row.ID,
			}
		},
		"个人办公-本行信息-待办": {
			path: "/dashboard/personalOffice/publishInfo/selfBankInfoPub",
			query: {
				id: row.ID,
			}
		},
		"秘书工作-值班动态-待办": {
			path: "/sendHandle",
			query: {
				data: row,
				type: 'detail',
				tabsType: "1"
			}
		},
		"信息刊物-部门信息-待办": {
			path: "/publication/departInfo/depart",
			query: {
				type: 'todo',
				id: row.depInfoPubId,
				jihe: row
			}
		},
		"MARK_052": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_051": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001bj": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_001WH": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"MARK_053": {//用印管理-常规用印
			path: "/sealManage/useSeal/draft/common",
			query: {
				id: row.ID,
				markOrderType: "3"
			}
		},
		"YZ_GWYZDJ": {//用印管理-公文用印
			path: "/sealManage/useSeal/draft/document",
			query: {
				id: row.ID,
				markOrderType: "1"
			}
		},
		"BHYYDJ": {//用印管理-公文用印
			path: "/sealManage/useSeal/draft/document",
			query: {
				id: row.ID,
				markOrderType: "1"
			}
		},
		"YZ_GWYZDJbj": {//用印管理-公文用印
			path: "/sealManage/useSeal/draft/document",
			query: {
				id: row.ID,
				markOrderType: "1"
			}
		},
		"MARK_003": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/introduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_003bj": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/introduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_005": {//用印管理-介绍信用印
			path: "/sealManage/useSeal/draft/introduction",
			query: {
				id: row.ID,
				markOrderType: "2"
			}
		},
		"MARK_004": {//用印管理-部门用印
			path: "/sealManage/useSeal/draft/department",
			query: {
				id: row.ID,
				markOrderType: "4"
			}
		},
		"D_ARCHMARKBMYY": {//用印管理-部门用印
			path: "/sealManage/useSeal/draft/department",
			query: {
				id: row.ID,
				markOrderType: "4"
			}
		},
		"HY_XTHYTZZF": {//会议-制发-待办
			path: "/meeting/zf/zfTwo",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BBHYTZZF": {//会议-制发-待办
			path: "/meeting/zf/zfTwo",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BMHYTZZF": {//会议-制发-待办
			path: "/meeting/zf/zfTwo",
			query: {
				id: row.ID,
			}
		},
		"D_PXTZZF": {//会议-制发-待办
			path: "/meeting/zf/zfTwo",
			query: {
				id: row.ID,
			}
		},
		"HY_XTHYTZCH": {//会议-承办-参会-待办
			path: "/meeting/chDetial",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BBHYTZCH": {//会议-承办-参会-待办
			path: "/meeting/chDetial",
			query: {
				id: row.ID,
			}
		},
		"HYGL_BMHYTZCH": {//会议-承办-参会-待办
			path: "/meeting/chDetial",
			query: {
				id: row.ID,
			}
		},
		"D_PXTZCX": {//会议-承办-参会-待办
			path: "/meeting/chDetial",
			query: {
				id: row.ID,
			}
		},
		"HY_XTHYTZCB": {//会议-承办-承办-待办
			path: "/meeting/cbDetial",
			query: {
				id: row.ID,
			}
		},
		"D_PXTZCXWH": {//会议-承办-承办-待办
			path: "/meeting/cbDetial",
			query: {
				id: row.ID,
			}
		},
		'BMXX_DJ': { //流转中的数据 -- 待办
			path: "/publication/departInfo/depart",
			query: {
				depInfoPubId: row.ID
			}
		},
		'XXKW_MRDTZK': {
			path: "/publication/editJournal/editJournal/editRent/editingGroup",
			query: {
				pdnId: row.ID
			}
		},
		'XXKW_MRDTTG': {
			path: "/publication/tgMangement/wriScript/repairScript",
			query: {
				rowData: row.ID
			}
		},
		'PAPER_DJ': { // 文件处理登记 - 待办
			path: "/bianhan/detail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'PAPER_HQ': { // 文件处理办理 - 待办
			path: "/bianhan/docHandling/docDetail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'TEL_DJ': { // 电话记录 - 待办
			path: "/bianhan/phoneForm/detail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		'TEL_HQ': { // 电话记录办理 - 待办
			path: "/bianhan/phoneForm/handleDetail",
			query: {
				identify: 0,
				id: row.ID
			}
		},
		"SWSWBM": {
			path: '/receiveDispatch',
			query: {
				id: row.ID,
				readFlag: row.READFLAG  //readFlag:是否已读
			}
		},
		"SWSWBM_XB": {//
			path: '/receiveSponsorReadonly',
			query: {
				id: row.ID,
				readFlag: row.READFLAG  //readFlag:是否已读
			}
		},
		"ZXDBFIRST": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "1",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"QBCY": {  //签报管理-签报-传阅
			path: "/circularizeStateWaitQsh",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: "1",
				readFlag: row.READFLAG//0---未阅读；1----已阅
			}
		},
		'SWCY': { //收文传阅单
			path: "/reCircularizeDispatch",
			query: {
				id: row.ID,
				state: "1",
				// readFlag:row.READFLAG,
			}
		},
		"SWFW": { //发文-实物-办结
			path: "/bankEntityDispatchFinishRed",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"DZFW": { //发文-电子-办结
			path: "/bankDispachFinishRed",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_FWHQ": { //发文-会签-办结
			path: "/countersignendFinishRed",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"S_CFW": { //发文-重发审批-实物-办结
			path: "/rexamineEntityDone",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_CFW": { //发文-重发审批-电子-办结
			path: "/rexamineDone",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"D_CFWHQ": { //发文-重发会签-办结
			path: "/cbankRecountersignFinishRed",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		//签报
		"DZQB": { //签报-- 非跨行
			path: "/signquoteOverFkhDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"KHQBQS": { //签报-- 跨行请示
			path: "/signquoteOverKhQshDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"KHQB_SP": { //签报-- 跨行审批
			path: "/signquoteOverKhSphDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"SWQB": { //签报-- 实物
			path: "/signquoteOverEntityDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"KHQB_HQ": { //签报- 跨行单会签
			path: "/huiqianKhOverDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"DZQB_HQ": { //签报- 本行单会签
			path: "/huiqianFkhOverDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"KHQB_XB": { //签报- 协办
			path: "/xiebanOverQbDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"DXZX_DB": {  //专项督办-单项-待办
			path: "/singleSuperviseHandleAdd",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"DXZXDB_CB": {  //专项督办-承办-待办
			path: "/undertakeDetail",
			query: {
				id: row.ID,
				state: "2",
				readFlag: row.READFLAG,
			}
		},
		// "DXZXDB_CB":{//专项督办-传阅-待阅
		// 	path: "/circularizeDetail",
		// 	query: {
		// 		id:row.ID,
		// 		state:"1",
		// 		mainDocId: row.MAIN_DOC_ID,
		// 		multiTenancyId: row.MULTI_TENANCY_ID,
		// 		readFlag:row.READFLAG,
		// 		openType:"cb"
		// 	}
		// },
		"PLZXDB_CB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "1",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"DXZXDB_XB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "1",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"PLZXDB_XB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "1",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "cb"
			}
		},
		"DZSW": { //收文-电子-待办
			path: "/receiveDzBjYb",
			query: {
				id: row.ID,
				readFlag: row.READFLAG  //readFlag:是否已读
			}
		},
		"SWSW": { //收文-实物-待办
			path: "/receiveBjYb",
			query: {
				id: row.ID,
				readFlag: row.READFLAG
			}
		},
		"SWSW_XB": { //收文-协办-待办
			path: "/receiveSponsorReadonly",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWSWCT_XB": {  //收文-协办-待办
			path: "/receiveSponsorReadonly",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"DZSW_XB": {  //收文-协办-待办
			path: "/receiveSponsorReadonly",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWSWCT": {  //收文-传统实物收文-待办
			path: "/receiveDispatch",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SWSW_CB": {  //收文-实物承办-待办
			path: "/shiwucbDetailReadonly",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SW_TW': { //收文退文单
			path: "/receiveFileBackDispach",
			query: {
				id: row.ID,
			}
		},
		'D_LDPS': { // 实物领导批示登记
			path: "/registerTableDone",
			query: {
				buttonType: JSON.stringify(2),
				detail: JSON.stringify(row)
			}
		},
		'SEC_YTBS': { // 秘书工作议题保送
			path: "/secretary/presidentMeeting/topicSub/topicDetailed",
			query: {
				type: '1',
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_YT_ZBSH': { // 秘书工作议题暂不上会
			path: "/secretary/presidentMeeting/topicMange/topicMangeDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_BACK_YT': { // 秘书工作退回预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status == undefined ? '0' : row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_YTZ_SH': { // 收回预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_BMTZ_SH': { // 收回报名通知
			path: "/secretary/presidentMeeting/registerNotice/registerDetail",
			query: {
				type: row.type,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_ZSTZ_SH': { // 收回正式通知
			path: "/secretary/presidentMeeting/formalNotice/formalDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		'SEC_ZJ_BACK_YT': { // 退回议题
			path: "/secretary/presidentMeeting/topicSub/topicDetail",
			query: {
				type: '1',
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_YTZ_YTBS": { // 秘书工作_预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status == undefined ? '0' : row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"HBHY_CB": { // 秘书工作_预通知
			path: "/secretary/presidentMeeting/adNotice/adDetail",
			query: {
				status: row.status == undefined ? '0' : row.status,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"HBHY_CH": { // 秘书工作_报名通知
			path: "/secretary/presidentMeeting/registerNotice/registerDetail",
			query: {
				type: row.type,
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_ZSTZ": { // 秘书工作_正式通知
			path: "/secretary/presidentMeeting/formalNotice/formalDetail",
			query: {
				id: row.ID,
				readFlag: row.READFLAG,
			}
		},
		"SEC_FK_YTZ": { //预通知反馈通知
			path: "/secretary/presidentMeeting/conferList/conferDetail",
			query: {
				type: 1,
				id: row.ID,
				// detail: JSON.stringify(row),
				readFlag: row.READFLAG,
			}
		},
		"SEC_FK_BMTZ": { //报名通知反馈通知
			path: "/secretary/presidentMeeting/conferList/conferDetail",
			query: {
				type: 1,
				id: row.ID,
				// detail: JSON.stringify(row),
				readFlag: row.READFLAG,
			}
		},
	};
	//待阅读
	const WAITREADROUTER = {
		"CQ_CY": {
			path: "/formNotice",
			query: {
				activeName:'tabs-tosend',
				detail: JSON.stringify(row),
				tagFlag:'1',
			}
		},
		"ZXDBFIRST": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "1",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"DXZXDB_CB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "1",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "cb"
			}
		},
		"SW_CY": { //收文-传阅-未阅
			path: "/reCircularizeDispatch",
			query: {
				id: row.ID,
				state: "0", //0---未阅读；1----已阅
				readFlag: row.READFLAG//0---未阅读；1----已阅
			}
		},
		"非跨行": { //签报管理-传阅-待阅 - 非跨行
			path: "/circularizeStateWaitFkh",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: "0",
				readFlag: row.READFLAG//0---未阅读；1----已阅
			}
		},
		"跨行请示": { //签报管理-传阅-待阅 - 跨行请示
			path: "/circularizeStateWaitQsh",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: "0",
				readFlag: row.READFLAG//0---未阅读；1----已阅
			}
		},
		"跨行审批": { //签报管理-传阅-待阅 - 跨行审批
			path: "/circularizeStateWaitSph",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: "0",
				readFlag: row.READFLAG//0---未阅读；1----已阅
			}
		},
		"PLZXDB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "0",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"DXZX_DB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "0",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"DXZXDB_CB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "0",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "cb"
			}
		},
		"PLZXDB_CB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "0",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"DXZXDB_XB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "0",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"PLZXDB_XB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "0",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "cb"
			}
		},
		"D_SWSPWH": {  //事务审批
			path: "/approval/detailCY",
			query: {
				id: row.ID,
				isKh: "0",  //isKh:0---非跨行；1---跨行
				type: 'checkCy'
			}
		},
		"SW_KHSWSP": {  //事务审批
			path: "/approval/detailCY",
			query: {
				id: row.ID,
				isKh: "1",  //isKh:0---非跨行；1---跨行
				type: 'checkCy'
			}
		},
		// "事务审批-传阅-未阅":{
		// 	path: "/approval/detailCY",
		// 	query: {
		// 		type:"checkCy",
		// 		data:row  //包括id (小写)
		// 	}
		// },
		"BH_CY": { //便函-传阅-待阅
			path: "/circulate",
			query: {
				type: "0",
				id: row.ID
			}
		},
		"HY_CY": {//会议管理-传阅-待阅
			path: "/meeting/cyDetial",
			query: {
				type: row.type,
				id: row.ID
			}
		},
		'LSZSQ': {
			path: "/subTempAdd",
			query: {
				type: 'row.type',
				id: row.ID
			}
		},
	};
	//已阅读
	const DONEREADROUTER = {
		"CQ_CY": {
			path: "/formNotice",
			query: {
				activeName:'tabs-send',
				detail:JSON.stringify(row),
				tagFlag:'1',
			}
		},
		"SW_CY": {
			path: "/reCircularizeDispatch",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: parseFloat(row.IS_FINISH) + 1 //0---未阅读；1----已阅
			}
		},
		"非跨行": { //签报管理-传阅-已阅 - 非跨行
			path: "/circularizeStateWaitFkh",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: parseFloat(row.IS_FINISH) + 1 //0---未阅读；1----已阅
			}
		},
		"跨行请示": { //签报管理-传阅-已阅 - 跨行请示
			path: "/circularizeStateWaitQsh",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: parseFloat(row.IS_FINISH) + 1 //0---未阅读；1----已阅
			}
		},
		"跨行审批": { //签报管理-传阅-已阅 - 跨行审批
			path: "/circularizeStateWaitSph",
			query: {
				id: row.ID,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				state: parseFloat(row.IS_FINISH) + 1 //0---未阅读；1----已阅
			}
		},
		"PLZXDB": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: parseFloat(row.IS_FINISH) + 1,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				// readFlag:row.READFLAG,
				openType: "dx"
			}
		},
		"DXZX_DB": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: parseFloat(row.IS_FINISH) + 1,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		// "DXZXDB_CB":{//专项督办-传阅-已阅
		// 	path: "/circularizeDetail",
		// 	query: {
		// 		id:row.ID,
		// 		state:"1",
		// 		mainDocId: row.MAIN_DOC_ID,
		// 		multiTenancyId: row.MULTI_TENANCY_ID,
		// 		readFlag:row.READFLAG,
		// 		openType:"cb"
		// 	}
		// },
		"PLZXDB_CB": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: parseFloat(row.IS_FINISH) + 1,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"DXZXDB_XB": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: parseFloat(row.IS_FINISH) + 1,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"PLZXDB_XB": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: parseFloat(row.IS_FINISH) + 1,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"ZXDBFIRST": {//专项督办-传阅-已阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: parseFloat(row.IS_FINISH) + 1,
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "dx"
			}
		},
		"DXZXDB_CB": {//专项督办-传阅-待阅
			path: "/circularizeDetail",
			query: {
				id: row.ID,
				state: "1",
				mainDocId: row.MAIN_DOC_ID,
				multiTenancyId: row.MULTI_TENANCY_ID,
				readFlag: row.READFLAG,
				openType: "cb"
			}
		},
		"D_SWSPWH": {  //事务审批
			path: "/approval/finDetailCY",
			query: {
				id: row.ID,
			}
		},
		"SW_KHSWSP": {  //事务审批
			path: "/approval/finDetailCY",
			query: {
				id: row.ID,
			}
		},
		"BH_CY": { //便函-传阅-已阅
			path: "/circulate",
			query: {
				type: "1",
				id: row.ID
			}
		},
		"HY_CY": {//会议管理-传阅-已阅
			path: "/meeting/cyDetial",
			query: {
				type: row.type,
				id: row.ID
			}
		},
		'LSZSQ': {
			path: "/subTempAdd",
			query: {
				type: 'row.type',
				id: row.ID
			}
		}
	};
	let todoDetailRouter = TODOROUTER[DATA_TYPE] ||{};
	let doneDetailRouter = DONEROUTER[DATA_TYPE] ||{};
	let completeRouter = COMPLETEROUTER[DATA_TYPE] ||{};

	let waitReadRouter = WAITREADROUTER[DOCUMENT_TYPE] ||{};
	let doneReadRouter = DONEREADROUTER[DOCUMENT_TYPE] ||{};
	return {
		todoDetailRouter,
		doneDetailRouter,
		completeRouter,
		waitReadRouter,
		doneReadRouter
	}
}

export function typeNameFormat(row){
	let nameObj = {
		"DZFW":"电子发文",
		"SWFW":"实物发文",
		"D_FWHQ":"电子发文会签",
		"D_CFW":"电子重发文",
		"S_CFW":"实物重发文",
		"D_CFWHQ":"重发文会签",
		'FW_TW':"发文退文",
		"DZSW":"电子收文",
		"SWSW":"实物收文",
		"SWSW_XB":"实物收文协办",
		"SWSWCT_XB":"传统实物收文协办",
		"DZSW_XB":"电子收文协办",
		"SWSWCT":"传统实物收文",
		"SWSW_CB":"实物收文承办",
		'SW_TW':"收文退文",
		"DZQB":"电子签报",
		"KHQBQS":"跨行请示签报",
		"KHQB_SP":"跨行审批签报",
		"SWQB":"实物签报",
		"KHQB_HQ":"签报会签",
		"DZQB_HQ":"电子签报会签",
		"KHQB_XB":"签报协办",
		"QB_TW":"签报退文",
		"QB_KH_TW":"跨行签报退文",
		"DXZX_DB":"单项专项督办",
		"PLZXDB":"批量专项督办",
		"DXZXDB_XB":"专项督办协办",
		"DXZXDB_CB":"专项督办承办",
		"QBCY": "签报传阅",
		"MF_MF":"模板及范文",
		"MF_MF_YJ":"模板及范文意见征集",
		"D_SWSPWH":"行内事务审批",
		"SW_KHSWSP":"跨行事务审批",
		"D_BHZF":"便函制发",
		"D_BHCB":"便函承办",
		"HY_XTHYTZZF":"系统会议通知制发",
		"HYGL_BBHYTZZF":"本部会议通知制发",
		"HYGL_BMHYTZZF":"部门会议通知",
		"D_PXTZZF":"培训会议通知",
		"HY_XTHYTZCB":"系统会议通知承办",
		"D_PXTZCXWH":"培训通知承办",
		"HY_XTHYTZCH":"系统会议通知参会",
		"HYGL_BBHYTZCH":"本部会议通知参会",
		"HYGL_BMHYTZCH":"部门会议通知参会",
		"D_PXTZCX":"培训通知参训",
		"CQSQ":"长期授权",
		"LSZSQ":"临时授权",
		//待持续补充。。。
		"柔性团队-任务管理-待办":{  
			path:"/taskHandle",
			query: {
				taskid: id,
			}
		},
		'TDGG':'团队公告',
		'PAPER_DJ': '文件处理单',
		'PAPER_HQ': '文件办理单',
		'TEL_DJ': '电话记录单',
		'TEL_HQ': '电话办理单',
		'D_LDPS': '实物批示'
	}
	let typeName = DATA_TYPE;
	return typeName;
}
export const allCircle="HY_XTHYTZZF,HYGL_BBHYTZZF,HYGL_BMHYTZZF,D_PXTZZF,HY_XTHYTZCH,HYGL_BBHYTZCH,HYGL_BMHYTZCH,D_PXTZCX,HY_XTHYTZCB,D_PXTZCXWH,DZFW,TDGG,SWFW,D_FWHQ,D_CFW,D_CFWHQ,DZSW,D_BHZF,SW_KHSWSP,D_SWSPWH,D_BHCB,SWSW,SWSW_XB,SWSWCT,SWSWCT_XB,DZSW_XB,SWSW_CB,DZQB,KHQBQS,KHQB_SP,SWQB,KHQB_HQ,DZQB_HQ,KHQB_XB,DXZX_DB,PLZXDB,DXZXDB_XB,DXZXDB_CB,MF_MF,MF_MF_YJ,CQSQ,LSZSQ,MARK_001WH";
//export const allCircle="HY_XTHYTZZF,HYGL_BBHYTZZF,HYGL_BMHYTZZF,D_PXTZZF,HY_XTHYTZCH,HYGL_BBHYTZCH,HYGL_BMHYTZCH,D_PXTZCX,HY_XTHYTZCB,D_PXTZCXWH,DZFW,SWFW,D_FWHQ,D_CFW,D_CFWHQ,DZSW,D_BHZF,SW_KHSWSP,D_SWSPWH,D_BHCB,SWSW,SWSW_XB,SWSWCT,SWSWCT_XB,DZSW_XB,SWSW_CB,DZQB,KHQBQS,KHQB_SP,SWQB,KHQB_HQ,DZQB_HQ,KHQB_XB,DXZX_DB,PLZXDB,DXZXDB_XB,DXZXDB_CB,MF_MF,MF_MF_YJ,CQSQ,LSZSQ,MARK_052,MARK_051,MARK_001bj,MARK_001,D_ARCHMARKBMYY,MARK_001WH,MARK_053,YZ_GWYZDJ,BHYYDJ,YZ_GWYZDJbj,MARK_003,MARK_003bj,MARK_005,MARK_004";
