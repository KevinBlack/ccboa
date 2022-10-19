/**
 * P2 Framework JS Library 1.0 Copyright(c) 2012, China Construction Bank.
 * 
 * @Author zhangpeng, shenye Create on: 2013-07-25 Last Updated:
 *         说明:Debug模式下用户信息的配置参数
 * Last Updated: 添加了userinfo的ccbsid信息 by shenye 2014.03.17
 */
/*
 * The configuration of PJF,each application can modify these params
 */

// PJF需要使用的常量
PJF.debug.constants = {
	// userInfo信息
	USER_NAME : '张二',
	USER_CODE : '77976569',
	ORG_CODE : '110378300',
	CCBS_ID : '510865036316',
	// otherInfo信息
	TOKEN : '',
	TRANS_SER_NO : '',
	MAC_ADDRESS : '',
	CLIENT_IP : '',
	// orgInfo信息
	ORG_SHORT_CNAME : '总行本部/财务会计部',
	ORG_CLASS : '0',
	LOGIC_TERMINAL_NO : '123123123',
	// roleInfo信息
	POSITION_ID : 'G00000000207',
	NO_REPEAT_ROLE_AUTH_INFO_LIST : [{
				ahrId : '469',
				ahrNm : '收集价格基础数据',
				aplId : 'Y0000000000000000058',
				avyId : 'n34.002.020.040',
				pstRlId : 'J000000349',
				pstRlNm : '价格管理部门价格管理岗'
			}, {
				ahrId : '53',
				ahrNm : '制定价格授权方案',
				aplId : 'Y0000000000000000042',
				avyId : 'n34.002.010.040',
				pstRlId : 'J000000024',
				pstRlNm : '价格管理部门价格管理岗'
			}, {
				ahrId : '51',
				ahrNm : '制定基准价格',
				aplId : 'Y0000000000000000042',
				avyId : 'n34.002.010.035',
				pstRlId : 'J000000023',
				pstRlNm : '价格管理部门价格管理岗'
			}],
	// DEBUG模式下不经过sendNSCommand方法,自定义Java端返回值,默认成功,并且带回10个返回信息值
	IS_SUCCESSFUL : 0,
	INFORMATION1 : '结果1',
	INFORMATION2 : '结果2',
	INFORMATION3 : '结果3',
	INFORMATION4 : '结果4',
	INFORMATION5 : '结果5',
	INFORMATION6 : '结果6',
	INFORMATION7 : '结果7',
	INFORMATION8 : '结果8',
	INFORMATION9 : '结果9',
	INFORMATION10 : '结果10',
	PSWD:{
		pchPassword:"123456"
	},
	IC_CARD_INFO:{
		 ICCardType:"111111",//ic卡类型
		 accountNo:"111111",//
		 userName:"111111",//用户名
		 ICcardNo:"111111",//ic卡号
		 cardType:"111111",
		 cardNo:"111111",   //账号
		 secDisInfo:"111111",//二磁道
		 firDisInfo:"111111",
		 balance:"111111",
		 balanceLimit:"111111",
		 validTime:"111111",
		 Cst_ID:"",//     客户编号
		 Crdt_TpCd:"",//     证件类型
		 Crdt_No:"",//      证件号码
		 Idv_Lgl_Nm:""//   客户名称

	},
	IDENTITYCARD_INFO:{
	
			name:"张三",
			identity:"510101198101011111",
			sex:"男",
			birth:'19810101',
			address:"山西省太原市学院路3号学生宿舍",
			validDate:'20061102-20161102',
			nation:'汉'
	},
	SIGNATURE:"d:\test.png",
	FINGER:"11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
   
}
if(PJF.constants.IS_DEBUG){
	PJF.apply(PJF.stm,{
		IC_CARD_INFO:{
			resType:1,
			resInfo:{
				accountNo:"111111",//
				 userName:"111111",//用户名
				 identityCardType:'111',
				 identityCardNo:'5101841123123123',
				 ICCardNo:"111111",//ic卡序列号
				 secDisInfo:"111111=213123",//二磁道
				 firDisInfo:"",
				 balance:"111111",
				 balanceLimit:"111111",
				 validTime:"111111"
			}
		},
		idenAuth:{
			isAuth:true,
			custInfo:{
				name:'古三',
				sex:'male',
				nation:'汗',
				birth:'19909090',
				address:'cd',
				identity:'510184198805301234',
				issueOffice:'机关',
				validDate:'20130303-20140404'
			}
		},
		CUSTOM_INFO:{
	   			 Cst_ID:'123123123',//     客户编号
	   			 Crdt_TpCd:'2',//     证件类型
	   			 Crdt_No:'5101841988033300012',//      证件号码
	   			 Idv_Lgl_Nm:'古晶'//   客户名称
		}		
	});
}
