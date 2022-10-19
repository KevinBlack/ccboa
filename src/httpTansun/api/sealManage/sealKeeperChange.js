/**
 * 印章保管交接接口文件
 */
import smHttp from "./sealManageHttp"

export default{
    //OA印章保管交接-查询印章列表
    querySealList(params, op){
        return smHttp.cpsJsonReq('A0161M576', params, op);
    },
    //OA印章保管交接-查询印章保管交接
    querySealKeeperChange(params, op){
        return smHttp.cpsJsonReq('A0161M577', params, op);
    },
    //OA印章保管交接-印章保管交接新增
    sealKeeperChangeAdd(params, op){
        return smHttp.cpsJsonReq('A0161M091', params, op);
    },
    //OA印章保管交接-印章保管交接审批、移交、接收
    sealKeeperChangeUdp(params, op){
        return smHttp.cpsJsonReq('A0161M093', params, op);
    }
}

