/**
 * 印章公共方法与参数
 * 如果可以请尽量添加无副作用的纯函数
 * 参数如果用[]包括则表示该参数可选
 * @author jiangke
 */
import Http from "../httpTansun/http.js"
import smHttp from "../httpTansun/api/sealManage/sealManageHttp.js"
export default {
    /**
     * 印章接口请求方法(默认异步，需要同步，需要修改接口方法，暂不支持)
     * @param {String} fwTranId 服务ID
     * @param {Object} jsonData 请求参数对象，如果是对象，在提交时会自动添加上com2域信息
     * @param {Object} op 额外的参数对象。可选。eg: {_extraParams:{遍历添加到jsonData中的参数}, url:xxx, ...}
     * @returns {Object} 返回Promise实例对象
     */
    cpsJsonReq(...args){
        console.log('sealUtil.cpsJsonReq:', this, args);
        return smHttp.cpsJsonReq.apply(this, args);
    },
    /**
     * OA的接口post请求
     * @param {String}  id
     * @param {Object}  data        请求参数对象
     * @param {String}  fwTranId    服务ID
     * @param {Object}  pagination  分页对象。不是分页查询，可以传''
     * @param {Boolean} needLoading 请求时是否显示遮罩，true-显示 false-不显示
     * @returns {Promise<unknown>}  返回Promise实例对象
     */
    postData(...args){
        console.log('sealUtil.postData:', this, args);
        return Http.postData.apply(this, args);
    },
    /* 常量 */
    // 所有环节的编码-名字（不稳定，可能大改）
    allNodes: {
        A00: '起草',
        A01: '申请单位主要负责人审批',
        A02: '申请单位综合处理',
        A03: '归口管理部门综合处理',
        A04: '归口管理部门领导审批',
        A05: '办公室综合处理',
        A06: '办公室经办人审核',
        A07: '办公室领导审批',
        A08: '取印人确认',
        A09: '交印人处理',
        A10: '交印人确认',
        A11: '保管人处理',  
        A12: '上级行办公室综合处理',   
        A13: '上级行印章保管人处理',
        A14: '上级行保管人处理',
        A15: '上级行交印人处理',
        A16: '上级行办公室经办人审核',
        A17: '上级行办公室领导审批',
        A20: '档案部门鉴定',
        A20: '档案部门鉴定',
        A21: '印章保管人处理',
        A23: '印章保管人销毁',
        A24: '监销人处理',
        A25: '印章保管人办结',
        A26: '下级行取印人确认',
        A99: '办结',
    },
    
    /* 公共方法 */
    /**
     * 生成128位全局唯一标示符guid(默认128位,即32位16进制数),可用于生成随机id.
     * @param   {String} preStr 前缀。可选
     * @returns {String} 
     * 备注：js中所有数值都以IEEE-754 64位格式存储,但位运算都是以32位带符号的整数进行运算的，且返回值也是一个32位带符号的整数。
     * 位运算时，NaN与Infinity被当做0来处理，非数值会先使用Number()转换成数值再计算。 'NaN'|0 === 0; '12'|0 === 12; '12px'|0 === 0;
     * 整数与0按位或|运算得到它本身，一个小数与0按位或运算可以达到取整的效果。12.8|0 == 12; -3.456|0 === -3;  12|0 === 12;
     */
    generateGUID(preStr){
        var guid = 'gxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);	// Math.random()*16|0获取0~15的整数
            return v.toString(16);	// toString(16)将数字转换为16进制的字符串
        }).toUpperCase();
        return typeof preStr === 'string' ? preStr + guid : guid;
    },

    /**
     * 深拷贝（以后会改为lodash的deepClone）
     * @param {*} target 需要进行深拷贝的值
     * @param {Set} [cache] 缓存
     * @returns {*}
     */
    deepClone(target, cache = new Set()) {
        // 注意环引用
        if ( (typeof target !== 'object' && target !== null) || cache.has(target) ) {
            return target;
        }
        if (Array.isArray(target)) {
            return target.map(t => {
                cache.add(t);
                return t;
            });
        } else {
            // 注意symbol key
            return [...Object.keys(target), ...Object.getOwnPropertySymbols(target)].reduce((res, key) => {
                cache.add(target[key]);
                res[key] = deepClone(target[key], cache);
                return res;
            }, target.constructor !== Object ? Object.create(target.constructor.prototype) : {}) // 继承
        }
    },
    /**
     * 格式化时间为指定样式的字符串
     * @param {Date|String|null|undefined} date 时间对象或new Date能识别的时间字符串。
     * @param {String} [fmt] 格式化的样式。可选。 y-年 M-月 d-日 h-小时 m-分 s-秒
     * @returns {String} 格式化后的字符串。如果传入null,undefined,''，则返回''
     * 备注:'yyyy/MM/dd hh:mm:ss' 和 'yyyy-MM-dd hh:mm:ss'格式的字符串，支持与时间相互转换
     */
    formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss'){
        if (!date) { return '' }
        date = typeof date === 'string' ? new Date(date) : date;
        if ( /(y+)/.test(fmt) ) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+':date.getMonth() + 1,
            'd+':date.getDate(),
            'h+':date.getHours(),
            'm+':date.getMinutes(),
            's+':date.getSeconds()
        };
        for(let k in o){
            if ( new RegExp(`(${k})`).test(fmt) ) {
                let str = o[k] + '';
                // M,d,h,m,s都会生成2位，无论fmt中写的是几位
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length) );
            }
        }
        return fmt;
    },
    /**
     * 判断对象是否为空
     */
    isEmptyObject(obj){
        let key;
        for (key in obj) {
            return false;
        }
        return true;
    },
    /**
     * 获取现在的时间。先获取系统时间，如果失败，则取当前电脑的时间
     * @returns {Date} 返回获取的时间
     */
    getNow(){
        let now = new Date();
        if (PJF && PJF.communication && typeof PJF.communication.getServerTime === 'function') {
            now = PJF.communication.getServerTime('yyyy-MM-dd hh:mm:ss');  // 返回的是字符串格式
        }
        return now ? new Date(now) : new Date();
    },
    /**
     * 获取全局跟踪号
     * @param {Object} data 接口成功或失败对象
     */
    getTraceId: function(data){
        let traceId = '';
        if (data && data._COMMON) {
            // P2(前端)服务器报错，只有SYS_EVT_TRACE_ID； 
            // P8服务器报错，P2S_EVT_TRACE_ID和SYS_EVT_TRACE_ID两者都有，且值相同。故这儿取SYS_EVT_TRACE_ID
            traceId = data._COMMON.SYS_EVT_TRACE_ID || '';
        }
        return traceId;
    },
    /**
     * 获取错误信息的字符串内容
     * @param   {Object|String} err 错误对象或错误字符串
     * @returns {String} 错误信息字符串
     */
    getErrorStrInfo(err){
        let info = '';
        if (err == null) {
            info = '';
        } else if(typeof err === 'string') {
            info = err;
        } else if (typeof err === 'object') {
            // 是Error对象。带有message-错误信息 和 name-错误类型；可能带有stack-栈跟踪信息
            if (Object.prototype.toString.call(err) === '[object Error]') {
                info = err.name + ':' + err.message;

            // 是P2后端接口返回的报错对象。应该有BK_DESC-错误详情 和 P2S_EVT_TRACE_ID-跟踪号
            // 是OA后端接口返回的报错对象。应该有msg-错误详情 和 code-错误编码
            } else {
                if (this.getTraceId(err)) { info += '[跟踪号: ' + this.getTraceId(err) + '] '; }
                if (err.BK_CODE) { info += '[错误码：' + err.BK_CODE + '] '; }
                if (err.BK_DESC) { info += '[详情: ' + err.BK_DESC + '] '; }
                if (err.code) { info += '[code:' + err.code + '] '; }
                if (err.msg) { info += '[msg:' + err.msg + '] '; }
            }
        }
        return info;
    },
    /**
     * 从P9下载文件，异步
     * @param {String} p9Id 文件在P9文件服务器的标识
     * @param {Function} cb 成功/失败回调函数。失败: cb(错误对象)； 成功: cb(null, 成功对象)
     */
    getFileFromP9(p9Id, cb){
        if (!p9Id || typeof p9Id !== 'string') {
            setTimeout(() => {
                cb( new Error('p9Id参数值[' +  p9Id + ']错误,应为非空字符串！') );
            }, 10);
            return;
        }

        let jsonData = {filePath: "bsmp", bizId: p9Id};
        PJF.communication.ajax({
            url: 'ecpJson.action',
            data: {
                '_fw_service_id': 'fetchFiles',
                'jsonData': JSON.stringify(jsonData)
            },
            safe: true,
            success: function (data) {
                // console.log('从P9获取的信息：', data);
                let isFail = data.BK_STATUS === '01';   // 交易是否失败
                isFail ? cb(data) : cb(null, data);
            },
            error: function (err, a, b) {
                console.log('getFileFromP9获取文件失败:', err, 'a:', a, 'b:', b);
                cb( new Error('从P9获取文件失败!') );   // TODO：添加测试信息，不知道err的第一个参数是不是err
            }
        });
    },

    /* 业务相关的函数 */
    /**
     * 检查当前操作员是否拥有指定的角色
     * @param   {Array | String} checkRoles 要检查的角色名字。字符串数组或字符串
     * @param   {Array} [allRoles] 所有的角色数组,对象数组. eg:[{codeName:'系统管理员'},...]
     * @returns {Boolean} 返回检查结果
     * @example 
     *  let isManage = this.$sealUtil.hasRole( ['系统管理员', '业务管理员'] );
     */
    hasRole(checkRoles, allRoles){
        const checks = typeof checkRoles === 'string' ? [checkRoles] : checkRoles;
        const alls = allRoles ? allRoles : (localStorage.tcHumanRole ? JSON.parse(localStorage.tcHumanRole) : []);
        let result = alls.some(item => checks.indexOf(item.codeName) > -1); // alls=[]时，会返回false
        return result;
    },
    /**
     * 查询映射的机构编号(异步)，同时支持 callback 和 promise
     * @param {Object}        vue   vue实例对象。因为取不到vue实例，只能使用参数传入。方法里的this是vue.$sealUtil
     * @param {String|Object} param 机构号（12位）或 接口参数对象
     * @param {Function}      [cb]  回调函数,可选。参数分别是映射后的机构号（9位），接口返回值
     * @returns {Object|undefined}  如果不存在回调函数cb,返回promise对象；否则返回undefined
     * 注意：在cb中更改了res的值（即promise），返回的promise值也会改变，所以有cb时就返回undefined，而不是promise
     */
    getMappingUnit(vue, param, cb){
        let p = typeof param === 'string' ? {unitCode: param} : param;
        let promise = vue.$api.sealManage.sealCommon.getUnitSyncCode(p);
        if (typeof cb === 'function') {
            promise.then((res) => {
                if (res && res.code === 'SUCCESS') {   // 成功
                    let _unitSyncCode = res.data && res.data.unitSyncCode || ''; // 映射后的机构号（9位）
                    cb(_unitSyncCode, res);
                } else { // 失败
                    cb('', res);
                }
            }, (err) => {
                cb(undefined, err);
            });
        } else {
            return promise;
        }
    },
    /**
     * 给localStorage.userInfo的对象里设置9位机构号(异步)
     * @param {Object}  vue         vue实例对象
     * @returns {Object}    返回promise,参数是获取到的当前登录人的9位机构号，失败时是''
     */
    setUnitSyncCodeToLocalStorage(vue){
        if (!localStorage.userInfo) {
            this.showMsg(vue, 'notify', 'warning', '提示', '没有localStorage中没有userInfo信息');
            return Promise.reject('');
        }
        let userInfo = JSON.parse(localStorage.userInfo);   // 当前登录人信息
        let unitId = userInfo.unitId;                       // 当前登录人的机构号
        let syncUnitId = userInfo['_unitSyncCode'] || '';   // 当前登录人的机构号（9位）
        // 存在当前登录人的9位机构号，直接成功返回
        if (syncUnitId) {
            return Promise.resolve(syncUnitId);

        // 不存在当前登录人的9位机构号，则查询获取并设置，然后再返回
        } else {
            let promise = this.getMappingUnit(vue, unitId).then((res) => {
                if (res.code === 'SUCCESS') {   // 成功
                    syncUnitId = res.data && res.data.unitSyncCode || '';    // 当前登录人的机构号（9位）
                    userInfo['_unitSyncCode'] = syncUnitId;
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    return Promise.resolve(syncUnitId);
                } else {    // 失败
                    let _msg = '通过OA机构号[' + unitId + ']获取9位机构号失败！' + 
                                (res.code ? '[code:' + res.code + ']' : '') + (res.msg ? res.msg : '');
                    this.showMsg(vue, 'notify', 'warning', '获取9位机构号失败提示(A08462500)', _msg);
                    return Promise.reject('');
                }
            }, (err) => {
                let _msg = '通过OA机构号[' + unitId + ']获取9位机构号报错！！' + this.getErrorStrInfo(err);
                this.showMsg(vue, 'notify', 'warning', '获取9位机构号报错提示(A08462500)', _msg);
                return Promise.reject('');
            });
            return promise;
        }
    },
    /**
     * 查询映射的机构编号(同步)
     * @param {Object}        vue   vue实例对象。因为取不到vue实例，只能使用参数传入。方法里的this是vue.$sealUtil
     * @param {String|Object} param 机构号（12位）或 接口(A08462500)参数对象
     * @param {Function}      cb    回调函数。成功：参数是映射后的机构号（9位），接口返回值
     */
    getMappingUnitSync(vue, param, cb){
        let p = typeof param === 'string' ? {unitCode: param} : param;
        vue.$api.sealManage.sealCommon.getUnitSyncCodeSync(p, function(data){
            let flag = data[0]; // 接口调用是否成功标志 '0'-成功，其他值为失败
            let res = data[1];  // 接口的响应值（无论成功、失败）
            if (flag === '0' && res && res.code === 'SUCCESS') {    // 成功
                let _unitSyncCode = res.data && res.data.unitSyncCode || '';  // 映射后的机构号（9位）
                cb(_unitSyncCode, res);
            } else {    // 接口失败或数据错误
                cb('', res);
            }
        });
    },
    /**
     * 给localStorage.userInfo的对象里设置9位机构号(同步)
     * @param {Object}  vue vue实例对象
     * @returns {String} 返回获取到的当前登录人的9位机构号。失败时为''
     */
    setUnitSyncCodeToLocalStorageSync(vue){
        if (!localStorage.userInfo) {
            this.showMsg(vue, 'notify', 'warning', '失败提示', 'localStorage中没有userInfo');
            return '';
        }
        let userInfo = JSON.parse(localStorage.userInfo);   // 当前登录人信息
        let unitId = userInfo.unitId;                       // 当前登录人的机构号
        let syncUnitId = userInfo['_unitSyncCode'] || '';   // 当前登录人的机构号（9位）
        // 不存在当前登录人的9位机构号，则查询并设置
        if (!syncUnitId) {
            this.getMappingUnitSync(vue, unitId, (unitSyncCode, res) => {
                if (unitSyncCode) { // 成功，设置机构号（9位）值
                    syncUnitId = unitSyncCode || '';
                    userInfo['_unitSyncCode'] = syncUnitId;
                    localStorage.setItem( 'userInfo', JSON.stringify(userInfo) );
                } else {    // 失败
                    let _msg = '通过OA机构号[' + unitId + ']获取9位机构号失败！' + 
                                (res.code ? '[code:' + res.code + ']' : '') + (res.msg ? res.msg : '');
                    this.showMsg(vue, 'notify', 'warning', '获取9位机构号失败提示(A08462500)', _msg);
                }
            }); // 同步查询
        }
        return syncUnitId;
    },
    
    /**
     * 显示提示信息
     * @param {Object} vue          vue实例对象。因为取不到vue实例，只能使用参数传入。方法里的this是vue.$sealUtil
     * @param {String} msgboxType   提示框类型，值为'notify', 'message', 'alert', 'confirm', 'prompt'
     * @param {String} type         通知类型，值为'success', 'warning', 'info', 'error'
     * @param {String} title        标题
     * @param {String} msg          信息
     * @param {Object} extraOptions 额外的配置参数对象
     */
    showMsg(vue, msgboxType, type, title, msg, extraOptions){
        let options = {},       // 配置
            defOptions = {};    // 默认的配置
        extraOptions = typeof extraOptions === 'object' ? extraOptions : {};
        // Notification通知，常用于系统级通知的被动提醒
        if (msgboxType === 'notify') {
            defOptions = {
                type:       type,
                title:      title,
                message:    msg,
                position:   'top-left',
                showClose:  true,
                offset:     80
            };
            Object.assign(options, defOptions, extraOptions);
            vue.$notify(options);

        // Message消息提示，常用于主动操作后的反馈提示
        } else if (msgboxType === 'message') {
            defOptions = {
                type:       type,
                title:      title,
                message:    msg,
                showClose:  true
            };
            Object.assign(options, defOptions, extraOptions);
            vue.$message(options);

        // MessageBox弹框：模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容
        // 支持通过Promise，或在配置对象中设置callback回调来响应。
        } else if (['alert', 'confirm', 'prompt'].indexOf(msgboxType) > -1) {
            defOptions = {type: type};
            Object.assign(options, defOptions, extraOptions);
            if (msgboxType === 'alert') {
                return vue.$alert(msg, title, options);
            } else if (msgboxType === 'confirm') {
                return vue.$confirm(msg, title, options);
            } else if (msgboxType === 'prompt') {
                return vue.$prompt(msg, title, options);
            }
        }
    }
}