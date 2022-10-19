/**
 * @name skipPath 首页待办事宜，列表实现动态跳转到待办页
 * @param {Object} row //列表当前点击行信息
 * @return {Object}
 *
 */
export function skipPath(row = {}) {
  let rowObj = JSON.parse(JSON.stringify(row));
  //待办
  const TODOROUTER = {
    'GWWYD': { //公文问与答
      path: "/answers",
      query: {
        id: row.ID,
        type: 'index'
      }
    },
    "YZ_YZKZ": {
      path: "/sealManage/markMgr/drafting",
      query: {
        id: row.ID,
        type: "modify"
      }
    },
    "D_ARCHMARK": {
      path: "/sealManage/markMgr/drafting",
      query: {
        id: row.ID,
        type: "modify"
      }
    },
    "M_HYZF": { //
      path: "/meeting/chDoneDetial",
      query: {
        id: row.ID,
      }
    },
    "MARK_jjbj": { //代办
      path: "/sealManage/useSeal/draft/common/sealKeeperChangeForm",
      query: {
        id: row.ID,
        type: "modify"
      }
    },

    "MARK_jj": { //代办
      path: "/sealManage/useSeal/draft/common/sealKeeperChangeForm",
      query: {
        id: row.ID,
        type: "modify"
      }
    },
    "YZ_YZXH": { //销毁代办
      path: "/sealManage/sealDestroy/sealDestroyDraft",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "D_ARCHMARKXH": { //销毁办结
      path: "/sealManage/sealDestroy/sealDestroyDraftDone",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "XXFB": { //信息发布
      path: '/secretary/dutyTrends/release/detail',
      query: {
        sourceRouterName: 'dutyTrendsReleaseIndex',
        detail: JSON.stringify(row)
      }
    },
    "HYSYDSP": { //信息报送详情
      path: '/meeting/yd/blueDetail',
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "XXBS_TG": { //信息报送详情
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
    "XXSP_LZ": { //信息审批详情
      path: '/chengkanDetail',
      query: {
        id: row.ID,
        sourceRouterName: "submitColumnc",
        activeName: "tabs-todo",
        isType: JSON.stringify("chengkan")
      }
    },
    "SEC_DUTYNOTICE": { //行政值班
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
        readFlag: row.READFLAG, //readFlag:是否已读
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSWBM_XB": { //
      path: '/receiveSponsorDetail',
      query: {
        id: row.ID,
        readFlag: row.READFLAG, //readFlag:是否已读
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "D_LDHDLR": { //新建活动领导资料代办详情
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
    "D_FWHQ": { //发文-会签-待办
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
    "S_CFW": { //发文-重发审批-实物-待办
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
        readFlag: row.READFLAG, //readFlag:是否已读
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSW": { //收文-实物-待办
      path: "/receiveDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSW_XB": { //收文-协办-待办
      path: "/receiveSponsorDetail",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSWCT_XB": { //收文-协办-待办
      path: "/receiveSponsorDetail",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "DZSW_XB": { //收文-协办-待办
      path: "/receiveSponsorDetail",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSWCT": { //收文-传统实物收文-待办
      path: "/receiveDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSW_CB": { //收文-实物承办-待办
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
    "KHQBQS": { //签报管理-签报-跨行请示-待办
      path: "/signquoteWaitKhQshDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "KHQB_SP": { //签报管理-签报-跨行审批-待办
      path: "/signquoteWaitKhSphDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "SWQB": { //签报管理-签报-实物-待办
      path: "/signquoteWaitEntityDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "QBCY": { //签报管理-签报-传阅
      path: "/circularizeStateWaitQsh",
      query: {
        id: row.ID,
        mainDocId: row.MAIN_DOC_ID,
        multiTenancyId: row.MULTI_TENANCY_ID,
        state: "0",
        readFlag: row.READFLAG //0---未阅读；1----已阅
      }
    },
    "KHQB_HQ": { //签报管理-会签-跨行-待办
      path: "/huiQianKhWaitDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "DZQB_HQ": { //签报管理-会签-本行-待办
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
    "QB_TW": { //签报管理-非跨行-退文单
      path: "/tuiwenfeikhDispatch",
      query: {
        id: row.ID,
      }
    },
    "QB_KH_TW": { //签报管理-跨行-退文单
      path: "/tuiwenkhDispatch",
      query: {
        id: row.ID,
      }
    },
    "DXZX_DB": { //专项督办-单项-待办
      path: "/singleSuperviseHandleAdd",
      query: {
        id: row.ID,
        state: "1",
        readFlag: row.READFLAG
      }
    },
    "PLZXDB": { //专项督办-批量-待办
      path: "/batchSuperviseAdd",
      query: {
        id: row.ID,
        state: "1",
        readFlag: row.READFLAG
      }
    },
    "DXZXDB_XB": { //专项督办-协办-待办
      path: "/jointlyDetail",
      query: {
        id: row.ID,
        state: "1",
        readFlag: row.READFLAG
      }
    },
    "DXZXDB_CB": { //专项督办-承办-待办
      path: "/undertakeDetail",
      query: {
        id: row.ID,
        state: "1",
        readFlag: row.READFLAG,
      }
    },
    "ZXDBFIRST": { //专项督办-传阅-已阅
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
    "MF_MF": { //范文管理-模板及范文-待办
      path: "/detailFw",
      query: {
        id: row.ID,
        state: "1"
      }
    },
    "MF_MF_YJ": { //范文管理-意见征集-待办
      path: "/opinionDetail",
      query: {
        id: row.ID,
        state: "1",
        readFlag: row.READFLAG
      }
    },
    "柔性团队-任务管理-待办": {
      path: "/taskHandle",
      query: {
        taskid: row.ID,
      }
    },
    "D_SWSPWH": { //事务审批-流转-待办(非跨行)
      path: "/approval/detail",
      query: {
        type: 'checkLz',
        routeFrom: 'home',
        id: row.ID,
        isKh: "0" //isKh:0---非跨行；1---跨行
      }
    },
    "SW_KHSWSPSPH": { //事务审批-流转-待办 （跨行）
      path: "/approval/detail",
      query: {
        type: "checkLz",
        routeFrom: 'home',
        id: row.ID,
        isKh: "1" //isKh:0---非跨行；1---跨行
      }
    },
    "SW_KHSWSP": { //事务审批-流转-待办 （跨行）
      path: "/approval/detail",
      query: {
        type: "checkLz",
        routeFrom: 'home',
        id: row.ID,
        isKh: "1" //isKh:0---非跨行；1---跨行
      }
    },
    "D_BHZF": { //便函管理-制发-待办
      path: "/addproceorder",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "D_BHCB": { //便函管理-承办-待办
      path: "/underdeal",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "ceshi": {
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
    "MARK_052": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_051": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_001bj": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_001": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_001WH": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_053": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "YZ_GWYZDJ": { //用印管理-公文用印
      path: "/sealManage/useSeal/draft/document",
      query: {
        id: row.ID,
        markOrderType: "1",
        routeFrom: 'home'
      }
    },
    "BHYYDJ": { //用印管理-公文用印
      path: "/sealManage/useSeal/draft/document",
      query: {
        id: row.ID,
        markOrderType: "1",
        routeFrom: 'home'
      }
    },
    "YZ_GWYZDJbj": { //用印管理-公文用印
      path: "/sealManage/useSeal/draft/document",
      query: {
        id: row.ID,
        markOrderType: "1",
        routeFrom: 'home'
      }
    },
    'YZ_YYJWH': { //用印管理-用印机设备维护审批
      path: "/sealManage/facilityManage/approval",
      query: {
        id: row.ID,
        type: "待办"
      }
    },
    "MARK_003": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/introduction",
      query: {
        id: row.ID,
        markOrderType: "2",
        routeFrom: 'home'
      }
    },
    "MARK_003bj": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/introduction",
      query: {
        id: row.ID,
        markOrderType: "2",
        routeFrom: 'home'
      }
    },
    "MARK_005": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/introduction",
      query: {
        id: row.ID,
        markOrderType: "2",
        routeFrom: 'home'
      }
    },
    "MARK_004": { //用印管理-部门用印
      path: "/sealManage/useSeal/draft/department",
      query: {
        id: row.ID,
        markOrderType: "4",
        routeFrom: 'home'
      }
    },
    "D_ARCHMARKBMYY": { //用印管理-部门用印
      path: "/sealManage/useSeal/draft/department",
      query: {
        id: row.ID,
        markOrderType: "4",
        routeFrom: 'home'
      }
    },
    "HY_XTHYTZZF": { //会议-制发-待办
      path: "/meeting/zf/zfTwo",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "HYGL_BBHYTZZF": { //会议-制发-待办
      path: "/meeting/zf/zfTwo",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "HYGL_BMHYTZZF": { //会议-制发-待办
      path: "/meeting/zf/zfTwo",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "D_PXTZZF": { //会议-制发-待办
      path: "/meeting/zf/zfTwo",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "HY_XTHYTZCH": { //会议-承办-参会-待办
      path: "/meeting/chDetial",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "HYGL_BBHYTZCH": { //会议-承办-参会-待办
      path: "/meeting/chDetial",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "HYGL_BMHYTZCH": { //会议-承办-参会-待办
      path: "/meeting/chDetial",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "D_PXTZCX": { //会议-承办-参会-待办
      path: "/meeting/chDetial",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "HY_XTHYTZCB": { //会议-承办-承办-待办
      path: "/meeting/cbDetial",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "D_PXTZCXWH": { //会议-承办-承办-待办
      path: "/meeting/cbDetial",
      query: {
        id: row.ID,
        routeFrom: 'home',
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
        topType: 0
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
        topType: 1
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
    "MARK_jj": { //已办
      path: "/sealManage/useSeal/draft/common/sealKeeperChangeForm",
      query: {
        id: row.ID,
        type: "see"
      }
    },
    "YZ_YZXH": { //销毁代办
      path: "/sealManage/sealDestroy/sealDestroyDraftDone",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "D_ARCHMARKXH": { //销毁办结
      path: "/sealManage/sealDestroy/sealDestroyDraftDone",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "YZ_YZKZ": {
      path: "/sealManage/markMgr/drafting",
      query: {
        id: row.ID,
        type: "see"
      }
    },
    "D_ARCHMARK": {
      path: "/sealManage/markMgr/drafting",
      query: {
        id: row.ID,
        type: "see"
      }
    },
    "MARK_jjbj": { //已办
      path: "/sealManage/useSeal/draft/common/sealKeeperChangeForm",
      query: {
        id: row.ID,
        type: "see"
      }
    },
    "M_HYZF": { //
      path: "/meeting/chDoneDetial",
      query: {
        id: row.ID,
      }
    },
    "XXFB": { //信息发布
      path: '/secretary/dutyTrends/release/detail',
      query: {
        sourceRouterName: 'dutyTrendsReleaseIndex',
        detail: JSON.stringify(row)
      }
    },
    'YZ_YYJWH': { //用印管理-用印机设备维护审批
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
    "HYSYDSP": { //信息报送详情
      path: '/meeting/yd/blueDetail1',
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        orderStatu: '3',
        //orderStatu:row.PCSAVYNM=="预订成功"?3:(row.PCSAVYNM=="取消预订"||row.PCSAVYNM=="系统自动取消预订"?1:2)
      }
    },
    "XXBS_TG": { //信息报送详情
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
    "XXSP_LZ": { //信息审批详情
      path: '/chengkanDetailDone',
      query: {
        id: row.ID,
        sourceRouterName: "submitColumnc",
        isType: JSON.stringify("chengkan"),
        isflg: "fei",
        activeName:'tabs-doing'
      }
    },
    "SEC_DUTYNOTICE": { //行政值班
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
      path: '/secretary/partyMemLeavRep/finishedDetail',
      query: {
        id: row.ID,
        type: 'detail',
      }
    },
    "D_LDHDLR": { //新建活动领导资料代办详情
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
    "D_BHZF": { //便函管理-制发-待办
      path: "/addproceorder",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "D_BHCB": { //便函管理-承办-待办
      path: "/underdeal",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "ceshi": {
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
    "MARK_052": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_051": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_001bj": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_001": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_001WH": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_053": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_003": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/doneIntroduction",
      query: {
        id: row.ID,
        markOrderType: "2"
      }
    },
    "MARK_003bj": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/doneIntroduction",
      query: {
        id: row.ID,
        markOrderType: "2"
      }
    },
    "MARK_005": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/doneIntroduction",
      query: {
        id: row.ID,
        markOrderType: "2"
      }
    },
    "MARK_004": { //用印管理-部门用印
      path: "/sealManage/useSeal/draft/doneDepartment",
      query: {
        id: row.ID,
        markOrderType: "4"
      }
    },
    "D_ARCHMARKBMYY": { //用印管理-部门用印
      path: "/sealManage/useSeal/draft/department",
      query: {
        id: row.ID,
        markOrderType: "4",
        routeFrom: 'home'
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
        identify: 1,
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
        identify: 1,
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
    "ZXDBFIRST": { //专项督办-传阅-已阅
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
    "SWSWCT": { //收文-传统实物收文-待办
      path: "/receiveDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "QBCY": { //签报管理-签报-传阅
      path: "/circularizeStateWaitQsh",
      query: {
        id: row.ID,
        mainDocId: row.MAIN_DOC_ID,
        multiTenancyId: row.MULTI_TENANCY_ID,
        state: "1",
        readFlag: row.READFLAG //0---未阅读；1----已阅
      }
    },
    "SWSWBM": {
      path: '/receiveBjYb',
      query: {
        id: row.ID,
        readFlag: row.READFLAG, //readFlag:是否已读
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSWBM_XB": { //
      path: '/receiveSponsorReadonly',
      query: {
        id: row.ID,
        readFlag: row.READFLAG, //readFlag:是否已读
        tableId: row.table_id ? row.table_id : ''
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
    "DZFW": { //发文-电子-已办
      path: "/bankDispachDone",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "SWFW": { //发文-实物-已办
      path: "/bankEntityDispatchDone",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "D_FWHQ": { //发文-会签-已办
      path: "/countersignendDone",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "D_CFW": { //发文-重发审批-电子-已办
      path: "/rexamineDone",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "S_CFW": { //发文-重发审批-实物-已办
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
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSW": { //收文-实物-已办
      path: "/receiveBjYb",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSW_XB": { //收文-协办-已办
      path: "/receiveSponsorReadonly",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSWCT_XB": { //收文-协办-已办
      path: "/receiveSponsorReadonly",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "DZSW_XB": { //收文-协办-已办
      path: "/receiveSponsorReadonly",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSWCT": { //收文-传统实物收文-已办
      path: "/receiveBjYb",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSW_CB": { //收文-实物承办-已办
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
    "DZQB": { //签报管理-签报-非跨行-已办
      path: "/signquoteFinishFkhDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "KHQBQS": { //签报管理-签报-跨行请示-已办
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
    "SWQB": { //签报管理-签报-实物-已办
      path: "/signquoteFinishEntityDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "KHQB_HQ": { //签报管理-会签-跨行-已办
      path: "/huiqianKhFinishDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "DZQB_HQ": { //签报管理-会签-本行-已办
      path: "/huiqianFkhFinishDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "KHQB_XB": { //签报管理-协办-已办
      path: "/xiebanFinishQbDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "DXZX_DB": { //专项督办-单项-已办
      path: "/singleSuperviseHandleBJYB",
      query: {
        id: row.ID,
        state: "2"
      }
    },
    "PLZXDB": { //专项督办-批量-已办
      path: "/batchSuperviseAdd",
      query: {
        id: row.ID,
        state: "2"
      }
    },
    "DXZXDB_XB": { //专项督办-协办-已办
      path: "/jointlyDetail",
      query: {
        id: row.ID,
        state: "2"
      }
    },
    "DXZXDB_CB": { //专项督办-承办-待办
      path: "/undertakeDetail",
      query: {
        id: row.ID,
        state: "2",
        readFlag: row.READFLAG,
      }
    },
    "MF_MF": { //范文管理-模板及范文-已办
      path: "/detailFw",
      query: {
        id: row.ID,
      }
    },
    "MF_MF_YJ": { //范文管理-意见征集-已办
      path: "/opinionDetail",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "柔性团队-任务管理-已办": { //柔性团队-任务管理-已办
      path: "/taskHandle",
      query: {
        taskid: row.ID,
      }
    },
    "D_SWSPWH": { //事务审批-流转-已办
      path: "/approval/finDetail",
      query: {
        type: "checkLz",
        routeFrom: 'home',
        id: row.ID,
        isKh: "0" //isKh:0---非跨行；1---跨行
      }
    },
    "SW_KHSWSP": { //事务审批-流转-已办
      path: "/approval/finDetail",
      query: {
        type: "checkLz",
        routeFrom: 'home',
        id: row.ID,
        isKh: "1" //isKh:0---非跨行；1---跨行
      }
    },
    "D_BHZF": { //便函管理-制发-已办
      path: "/proceHas",
      query: {
        id: row.ID,
        type: "1"
      }
    },
    "D_BHCB": { //便函管理-承办-已办
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
    "MARK_052": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_051": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_001bj": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_001": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_001WH": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "MARK_053": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common/dis",
      query: {
        id: row.ID,
        markOrderType: "3"
      }
    },
    "YZ_GWYZDJ": { //用印管理-公文用印
      path: "/sealManage/useSeal/draft/doneDocument",
      query: {
        id: row.ID,
        markOrderType: "1"
      }
    },
    "BHYYDJ": { //用印管理-公文用印
      path: "/sealManage/useSeal/draft/doneDocument",
      query: {
        id: row.ID,
        markOrderType: "1"
      }
    },
    "YZ_GWYZDJbj": { //用印管理-公文用印
      path: "/sealManage/useSeal/draft/doneDocument",
      query: {
        id: row.ID,
        markOrderType: "1"
      }
    },
    "MARK_003": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/doneIntroduction",
      query: {
        id: row.ID,
        markOrderType: "2"
      }
    },
    "MARK_003bj": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/doneIntroduction",
      query: {
        id: row.ID,
        markOrderType: "2"
      }
    },
    "MARK_005": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/doneIntroduction",
      query: {
        id: row.ID,
        markOrderType: "2"
      }
    },
    "MARK_004": { //用印管理-部门用印
      path: "/sealManage/useSeal/draft/doneDepartment",
      query: {
        id: row.ID,
        markOrderType: "4"
      }
    },
    "D_ARCHMARKBMYY": { //用印管理-部门用印
      path: "/sealManage/useSeal/draft/department",
      query: {
        id: row.ID,
        markOrderType: "4",
        routeFrom: 'home'
      }
    },
    "HY_XTHYTZZF": { //会议-制发
      path: "/meeting/zf/zfDoneDetail",
      query: {
        id: row.ID,
      }
    },
    "HYGL_BBHYTZZF": { //会议-制发
      path: "/meeting/zf/zfDoneDetail",
      query: {
        id: row.ID,
      }
    },
    "HYGL_BMHYTZZF": { //会议-制发
      path: "/meeting/zf/zfDoneDetail",
      query: {
        id: row.ID,
      }
    },
    "D_PXTZZF": { //会议-制发
      path: "/meeting/zf/zfDoneDetail",
      query: {
        id: row.ID,
      }
    },
    "HY_XTHYTZCH": { //会议-承办-参会
      path: "/meeting/chDoneDetial",
      query: {
        id: row.ID,
      }
    },
    "HYGL_BBHYTZCH": { //会议-承办-参会
      path: "/meeting/chDoneDetial",
      query: {
        id: row.ID,
      }
    },
    "HYGL_BMHYTZCH": { //会议-承办-参会
      path: "/meeting/chDoneDetial",
      query: {
        id: row.ID,
      }
    },
    "D_PXTZCX": { //会议-承办-参会
      path: "/meeting/chDoneDetial",
      query: {
        id: row.ID,
      }
    },
    "HY_XTHYTZCB": { //会议-承办-承办
      path: "/meeting/cbDoneDetial",
      query: {
        id: row.ID,
      }
    },
    "D_PXTZCXWH": { //会议-承办-承办
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
        topType: 0
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
        topType: 1
      }
    },
    "SEC_YTZ_YTBS": { // 秘书工作_预通知
      path: "/secretary/presidentMeeting/adNotice/adDetailDone",
      query: {
        status: row.status == undefined ? '1' : row.status,
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "HBHY_CB": { // 秘书工作_预通知
      path: "/secretary/presidentMeeting/adNotice/adDetailDone",
      query: {
        status: row.status == undefined ? '1' : row.status,
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "HBHY_CH": { // 秘书工作_报名通知
      path: "/secretary/presidentMeeting/registerNotice/registerDetailDone",
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
    "MARK_jj": { //已办
      path: "/sealManage/useSeal/draft/common/sealKeeperChangeForm",
      query: {
        id: row.ID,
        type: "see"
      }
    },
    "YZ_YZXH": { //销毁代办
      path: "/sealManage/sealDestroy/sealDestroyDraftDone",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "D_ARCHMARKXH": { //销毁办结
      path: "/sealManage/sealDestroy/sealDestroyDraftDone",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "YZ_YZKZ": {
      path: "/sealManage/markMgr/drafting",
      query: {
        id: row.ID,
        type: "see"
      }
    },
    "D_ARCHMARK": {
      path: "/sealManage/markMgr/drafting",
      query: {
        id: row.ID,
        type: "see"
      }
    },
    "MARK_jjbj": { //已办
      path: "/sealManage/useSeal/draft/common/sealKeeperChangeForm",
      query: {
        id: row.ID,
        type: "see"
      }
    },
    "M_HYZF": { //
      path: "/meeting/chDoneDetial",
      query: {
        id: row.ID,
      }
    },
    "XXFB": { //信息发布
      path: '/secretary/dutyTrends/release/detail',
      query: {
        sourceRouterName: 'dutyTrendsReleaseIndex',
        detail: JSON.stringify(row)
      }
    },
    'YZ_YYJWH': { //用印管理-用印机设备维护审批
      path: "/sealManage/facilityManage/approval",
      query: {
        id: row.ID,
        type: "待办"
      }
    },
    "HYSYDSP": { //信息报送详情
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
    "XXBS_TG": { //信息报送详情
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
    "XXSP_LZ": { //信息审批详情
      path: '/chengkanDetail',
      query: {
        id: row.ID,
        sourceRouterName: "submitColumnc",
        activeName: "tabs-todo",
        isType: JSON.stringify("chengkan")
      }
    },
    "SEC_DUTYNOTICE": { //行政值班
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
      path: '/secretary/partyMemLeavRep/finishedDetail',
      query: {
        id: row.ID,
        type: 'detail',
      }
    },
    "D_LDHDLR": { //新建活动领导资料代办详情
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
    "D_SWSPWH": { //事务审批-流转-待办(非跨行)
      path: "/approval/detail",
      query: {
        type: 'checkLz',
        routeFrom: 'home',
        id: row.ID,
        isKh: "0" //isKh:0---非跨行；1---跨行
      }
    },
    "SW_KHSWSP": { //事务审批-流转-待办 （跨行）
      path: "/approval/detail",
      query: {
        type: "checkLz",
        routeFrom: 'home',
        id: row.ID,
        isKh: "1" //isKh:0---非跨行；1---跨行
      }
    },
    "D_BHZF": { //便函管理-制发-待办
      path: "/addproceorder",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "D_BHCB": { //便函管理-承办-待办
      path: "/underdeal",
      query: {
        id: row.ID,
        routeFrom: 'home',
      }
    },
    "ceshi": {
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
    "MARK_052": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_051": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_001bj": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_001": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_001WH": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "MARK_053": { //用印管理-常规用印
      path: "/sealManage/useSeal/draft/common",
      query: {
        id: row.ID,
        markOrderType: "3",
        routeFrom: 'home'
      }
    },
    "YZ_GWYZDJ": { //用印管理-公文用印
      path: "/sealManage/useSeal/draft/document",
      query: {
        id: row.ID,
        markOrderType: "1",
        routeFrom: 'home'
      }
    },
    "BHYYDJ": { //用印管理-公文用印
      path: "/sealManage/useSeal/draft/document",
      query: {
        id: row.ID,
        markOrderType: "1",
        routeFrom: 'home'
      }
    },
    "YZ_GWYZDJbj": { //用印管理-公文用印
      path: "/sealManage/useSeal/draft/document",
      query: {
        id: row.ID,
        markOrderType: "1",
        routeFrom: 'home'
      }
    },
    "MARK_003": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/introduction",
      query: {
        id: row.ID,
        markOrderType: "2",
        routeFrom: 'home'
      }
    },
    "MARK_003bj": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/introduction",
      query: {
        id: row.ID,
        markOrderType: "2",
        routeFrom: 'home'
      }
    },
    "MARK_005": { //用印管理-介绍信用印
      path: "/sealManage/useSeal/draft/introduction",
      query: {
        id: row.ID,
        markOrderType: "2",
        routeFrom: 'home'
      }
    },
    "MARK_004": { //用印管理-部门用印
      path: "/sealManage/useSeal/draft/department",
      query: {
        id: row.ID,
        markOrderType: "4",
        routeFrom: 'home'
      }
    },
    "D_ARCHMARKBMYY": { //用印管理-部门用印
      path: "/sealManage/useSeal/draft/department",
      query: {
        id: row.ID,
        markOrderType: "4",
        routeFrom: 'home'
      }
    },
    "HY_XTHYTZZF": { //会议-制发-待办
      path: "/meeting/zf/zfTwo",
      query: {
        id: row.ID,
      }
    },
    "HYGL_BBHYTZZF": { //会议-制发-待办
      path: "/meeting/zf/zfTwo",
      query: {
        id: row.ID,
      }
    },
    "HYGL_BMHYTZZF": { //会议-制发-待办
      path: "/meeting/zf/zfTwo",
      query: {
        id: row.ID,
      }
    },
    "D_PXTZZF": { //会议-制发-待办
      path: "/meeting/zf/zfTwo",
      query: {
        id: row.ID,
      }
    },
    "HY_XTHYTZCH": { //会议-承办-参会-待办
      path: "/meeting/chDetial",
      query: {
        id: row.ID,
      }
    },
    "HYGL_BBHYTZCH": { //会议-承办-参会-待办
      path: "/meeting/chDetial",
      query: {
        id: row.ID,
      }
    },
    "HYGL_BMHYTZCH": { //会议-承办-参会-待办
      path: "/meeting/chDetial",
      query: {
        id: row.ID,
      }
    },
    "D_PXTZCX": { //会议-承办-参会-待办
      path: "/meeting/chDetial",
      query: {
        id: row.ID,
      }
    },
    "HY_XTHYTZCB": { //会议-承办-承办-待办
      path: "/meeting/cbDetial",
      query: {
        id: row.ID,
      }
    },
    "D_PXTZCXWH": { //会议-承办-承办-待办
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
        identify: 1,
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
        identify: 1,
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
        readFlag: row.READFLAG, //readFlag:是否已读
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSWBM_XB": { //
      path: '/receiveSponsorReadonly',
      query: {
        id: row.ID,
        readFlag: row.READFLAG, //readFlag:是否已读
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "ZXDBFIRST": { //专项督办-传阅-已阅
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
    "QBCY": { //签报管理-签报-传阅
      path: "/circularizeStateWaitQsh",
      query: {
        id: row.ID,
        mainDocId: row.MAIN_DOC_ID,
        multiTenancyId: row.MULTI_TENANCY_ID,
        state: "1",
        readFlag: row.READFLAG //0---未阅读；1----已阅
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
    "DXZX_DB": { //专项督办-单项-待办
      path: "/singleSuperviseHandleBJYB",
      query: {
        id: row.ID,
        readFlag: row.READFLAG
      }
    },
    "DXZXDB_CB": { //专项督办-承办-待办
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
    "PLZXDB_CB": { //专项督办-传阅-待阅
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
    "DXZXDB_XB": { //专项督办-传阅-待阅
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
    "PLZXDB_XB": { //专项督办-传阅-待阅
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
        readFlag: row.READFLAG, //readFlag:是否已读
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSW": { //收文-实物-待办
      path: "/receiveBjYb",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSW_XB": { //收文-协办-待办
      path: "/receiveSponsorReadonly",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSWCT_XB": { //收文-协办-待办
      path: "/receiveSponsorReadonly",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "DZSW_XB": { //收文-协办-待办
      path: "/receiveSponsorReadonly",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSWCT": { //收文-传统实物收文-待办
      path: "/receiveDispatch",
      query: {
        id: row.ID,
        readFlag: row.READFLAG,
        tableId: row.table_id ? row.table_id : ''
      }
    },
    "SWSW_CB": { //收文-实物承办-待办
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
        topType: 0
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
        topType: 1
      }
    },
    "SEC_YTZ_YTBS": { // 秘书工作_预通知
      path: "/secretary/presidentMeeting/adNotice/adDetailDone",
      query: {
        status: row.status == undefined ? '1' : row.status,
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "HBHY_CB": { // 秘书工作_预通知
      path: "/secretary/presidentMeeting/adNotice/adDetailDone",
      query: {
        status: row.status == undefined ? '1' : row.status,
        id: row.ID,
        readFlag: row.READFLAG,
      }
    },
    "HBHY_CH": { // 秘书工作_报名通知
      path: "/secretary/presidentMeeting/registerNotice/registerDetailDone",
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

  // 传阅 未阅
  const CIRCULATEFORPERUSALROUTER_4 = {
    // 便函
    "D_BHZF": {
      path: "/circulate",
      query: {
        id: row.ID,
        type: '0',
        cyType: 'zf'
      }
    },
    //便函
    "D_BHCB": {
      path: "/circulate",
      query: {
        id: row.ID,
        type:'0',
        cyType: 'cb'
      }
    },
    // 事物审批
    "D_SWSP": {
      path: "/approval/detailCY",
      query: {
        id: row.ID,
        type:'checkCy',
      }
    },
    "SW_KHSWSPSPH": {
      path: "/approval/detailCY",
      query: {
        id: row.ID,
        type:'checkCy',
      }
    },
    "D_SWSPWH": {
      path: "/approval/detailCY",
      query: {
        id: row.ID,
        type:'checkCy',
      }
    },
    "SW_KHSWSP": {
      path: "/approval/detailCY",
      query: {
        id: row.ID,
        type:'checkCy',
      }
    },
    // 签报非跨行
    "DZQB": {
      path: "/circularizeStateWaitFkh",
      query: {
        id: row.ID,
        state: 0
      }
    },
    "KHQBQS": {
      path: "/circularizeStateWaitQsh",
      query: {
        id: row.ID,
        state: 0
      }
    },
    "KHQB_SP": {
      path: "/circularizeStateWaitSph",
      query: {
        id: row.ID,
        state: 0
      }
    },
    // 收文
    "DZSW": {
      path: "/reCircularizeDispatch",
      query: {
        id: row.ID,
        state: 0
      }
    }
  }
  // 传阅 已阅
  const CIRCULATEFORPERUSALROUTER_5 = {
    "D_BHZF": {
      path: "/circulate",
      query: {
        id: row.ID,
        type: '1',
        cyType: 'zf'
      }
    },
    "D_BHCB": {
      path: "/circulate",
      query: {
        id: row.ID,
        type: '1',
        cyType: 'cb'
      }
    },
    // 事物审批
    "D_SWSP": {
      path: "/approval/finDetailCY",
      query: {
        id: row.ID,
        type: 'checkCyFin',
      }
    },
    "SW_KHSWSPSPH": {
      path: "/approval/finDetailCY",
      query: {
        id: row.ID,
        type:'checkCyFin',
      }
    },
    "D_SWSPWH": {
      path: "/approval/finDetailCY",
      query: {
        id: row.ID,
        type:'checkCyFin',
      }
    },
    "SW_KHSWSP": {
      path: "/approval/finDetailCY",
      query: {
        id: row.ID,
        type:'checkCyFin',
      }
    },
    // 签报非跨行
    "DZQB": {
      path: "/circularizeStateWaitFkh",
      query: {
        id: row.ID,
        state: 1
      }
    },
    "KHQBQS": {
      path: "/circularizeStateWaitQsh",
      query: {
        id: row.ID,
        state: 1
      }
    },
    "KHQB_SP": {
      path: "/circularizeStateWaitSph",
      query: {
        id: row.ID,
        state: 1
      }
    },
    // 收文
    "DZSW": {
      path: "/reCircularizeDispatch",
      query: {
        id: row.ID,
        state: 1
      }
    }
  }
  let todoDetailRouter = TODOROUTER[rowObj.DATA_TYPE] || {};
  let doneDetailRouter = DONEROUTER[rowObj.DATA_TYPE] || {};
  let completeRouter = COMPLETEROUTER[rowObj.DATA_TYPE] || {};
  let unreadDetailRouter = CIRCULATEFORPERUSALROUTER_4[rowObj.DATA_TYPE] || {};
  let readDetailRouter =   CIRCULATEFORPERUSALROUTER_5[rowObj.DATA_TYPE] || {};
  return {
    todoDetailRouter,
    doneDetailRouter,
    completeRouter,
    unreadDetailRouter,
    readDetailRouter
  }
}
