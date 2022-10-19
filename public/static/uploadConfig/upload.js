/*
 * @Date: 2020-12-01 19:35:02
 * @Description: 上传路径配置
 * @FilePath: \ccbOA\src\util\businessCode.js
 */
var FilePathConfig = {
  time:'',
  year:'',
  month:'',
  day:'',
  path:'',
  branch:'',
};
FilePathConfig.time = new Date();
FilePathConfig.year = FilePathConfig.time.getFullYear();
FilePathConfig.month = FilePathConfig.time.getMonth()+1;
FilePathConfig.day = FilePathConfig.time.getDate();
FilePathConfig.path = FilePathConfig.year+'/'+FilePathConfig.month+'/'+FilePathConfig.day;
FilePathConfig.branch = '/'+localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))&&JSON.parse(localStorage.getItem("userInfo")).areaCode||'123456789'; // 分库机构号
var areaCode = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))&&JSON.parse(localStorage.getItem("userInfo")).areaCode||'123456789';
var uploadBasicPath = "";
var transStr = "";
var transCode = areaCode;
var default_code = ["000010000","999999999","000420000","000430000","000440000","000450000","000460000","000470000","000490000","000480000","000800000","000500000","000510000","000520000","000530000","000540000","000550000","000560000","000570000","000580000","000590000","000600000","000610000","000620000","000630000","000640000","000650000","000660000","000670000","000680000","000690000","000700000","000710000","000720000","000730000","000740000","000750000","000760000","000770000","000780000","000750831","000860000","000870000","000820000","000880000","000810000","000840000","000830000","000850000","000890000","000930000","000010002","000010276","000588311","000900000","000940000","000010001","000010003","000910000","000920000","000109914","000375461","000513969","000320061","000711664","000464536","000417942","000204925","000100543","000335968","000544371","000950000","000960000","000970000","000980000","000990000","000670667","000731740","000455066","000332409","000967630","000117164","000352323"],
university_code = ["000400000","000410000","000192499","000689296","000930238","000196795","000390619","000363665","000241564","000699180","000100493","000824546","000238131","000896187","000836425","000967079","000227707","000900761"]
if(default_code.includes(areaCode)) {
    areaCode = 'default_code'
} else if (university_code.includes(areaCode)) {
    areaCode = 'university_code'
}
switch (areaCode) {
  case "default_code":
    uploadBasicPath = "/home/ap/nas/nas_d/" //  总行（默认） VIP 审计机构 海外分行 境内子公司
    break;
  case "university_code":
    uploadBasicPath = "/home/ap/nas/nas_i/" // 建行大学
    break;
  case "000020000":
      uploadBasicPath = "/home/ap/nas/nas_e/" // 北京市分行
      break;
  case "000030000":
      uploadBasicPath = "/home/ap/nas/nas_s/" // 天津市分行
      break;
  case "000040000":
      uploadBasicPath = "/home/ap/nas/nas_k/" // 河北省分行
      break;
  case "000050000":
      uploadBasicPath = "/home/ap/nas/nas_i/" // 山西省分行
      break;
  case "000060000":
      uploadBasicPath = "/home/ap/nas/nas_j/" // 内蒙古分行
      break;
  case "000070000":
      uploadBasicPath = "/home/ap/nas/nas_t/" // 辽宁省分行
      break;
  case "000080000":
      uploadBasicPath = "/home/ap/nas/nas_q/" // 吉林省分行
      break;
  case "000090000":
      uploadBasicPath = "/home/ap/nas/nas_m/" // 黑龙江省分行
      break;
  case "000100000":
      uploadBasicPath = "/home/ap/nas/nas_r/" // 上海市分行
      break;
  case "000110000":
      uploadBasicPath = "/home/ap/nas/nas_m/" // 江苏省分行
      break;
  case "000120000":
      uploadBasicPath = "/home/ap/nas/nas_j/" // 浙江省分行
      break;
  case "000130000":
      uploadBasicPath = "/home/ap/nas/nas_o/" // 安徽省分行
      break;
  case "000140000":
      uploadBasicPath = "/home/ap/nas/nas_l/" // 福建省分行
      break;
  case "000150000":
      uploadBasicPath = "/home/ap/nas/nas_e/" // 江西省分行
      break;
  case "000160000":
      uploadBasicPath = "/home/ap/nas/nas_f/" // 山东省分行
      break;
  case "000170000":
      uploadBasicPath = "/home/ap/nas/nas_s/" // 河南省分行
      break;
  case "000180000":
      uploadBasicPath = "/home/ap/nas/nas_p/" // 湖北省分行
      break;
  case "000190000":
      uploadBasicPath = "/home/ap/nas/nas_i/" // 湖南省分行
      break;
  case "000200000":
      uploadBasicPath = "/home/ap/nas/nas_h/" // 广东省分行
      break;
  case "000210000":
      uploadBasicPath = "/home/ap/nas/nas_l/" // 广西区分行
      break;
  case "000220000":
      uploadBasicPath = "/home/ap/nas/nas_t/" // 海南省分行
      break;
  case "000230000":
      uploadBasicPath = "/home/ap/nas/nas_r/" // 重庆市分行
      break;
  case "000240000":
      uploadBasicPath = "/home/ap/nas/nas_n/" // 四川省分行
      break;
  case "000250000":
      uploadBasicPath = "/home/ap/nas/nas_n/" // 贵州省分行
      break;
  case "000260000":
      uploadBasicPath = "/home/ap/nas/nas_p/" // 云南省分行
      break;
  case "000270000":
      uploadBasicPath = "/home/ap/nas/nas_t/" // 西藏区分行
      break;
  case "000280000":
      uploadBasicPath = "/home/ap/nas/nas_q/" // 陕西省分行
      break;
  case "000290000":
      uploadBasicPath = "/home/ap/nas/nas_o/" // 甘肃省分行
      break;
  case "000300000":
      uploadBasicPath = "/home/ap/nas/nas_r/" // 青海省分行
      break;
  case "000310000":
      uploadBasicPath = "/home/ap/nas/nas_t/" // 宁夏区分行
      break;
  case "000320000":
      uploadBasicPath = "/home/ap/nas/nas_e/" // 新疆区分行
      break;
  case "000330000":
      uploadBasicPath = "/home/ap/nas/nas_s/" // 大连市分行
      break;
  case "000340000":
      uploadBasicPath = "/home/ap/nas/nas_s/" // 宁波市分行
      break;
  case "000350000":
      uploadBasicPath = "/home/ap/nas/nas_t/" // 厦门市分行
      break;
  case "000360000":
      uploadBasicPath = "/home/ap/nas/nas_t/" // 青岛市分行
      break;
  case "000370000":
      uploadBasicPath = "/home/ap/nas/nas_r/" // 深圳市分行
      break;
  case "000380000":
      uploadBasicPath = "/home/ap/nas/nas_s/" // 苏州分行
      break;
  case "000937662":
      uploadBasicPath = "/home/ap/nas/nas_u/" // 建信财险
      break;
  case "000508795":
      uploadBasicPath = "/home/ap/nas/nas_u/" // 建信投资
      break;
  default:
    uploadBasicPath = "/home/ap/nas/"
    break;
}
window.uploadSetFileConfig = {
    //remotePath: '/home/nas/p8Files/'+FilePathConfig.path,//指定上传到哪儿
    // remotePath: '/home/ap/nas/nas/log/file/p8Files/'+FilePathConfig.path +FilePathConfig.branch ,//指定上传到哪儿
    remotePath: uploadBasicPath + transCode + '/' + FilePathConfig.path,
    savePath: '/log/file/p2Files/'+FilePathConfig.path,//
  }