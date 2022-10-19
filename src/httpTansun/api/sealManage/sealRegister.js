/**
 * 印章登记接口文件
 */
import smHttp from "./sealManageHttp"

export default{
    // OA印章登记-查询印章登记列表
    querySealRegister(params, op){
        return smHttp.cpsJsonReq('A0161M575', params, op);
    },
    // OA印章登记-查询印章登记详情
    querySealRegisterDetail(params, op){
        return smHttp.cpsJsonReq('A0161M516', params, op);
    },
    
    // OA印章登记-新增、修改印章登记
    sealRegisterMgr(params, op){
        return smHttp.cpsJsonReq('A0161M090', params, op);
    },
    // OA印章登记-删除印章登记
    delSealRegister(params, op){
        return smHttp.cpsJsonReq('A0161M090', params, op);
    }
}