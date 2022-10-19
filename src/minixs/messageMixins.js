/**
 * messageSome组件需要用的方法。
 * 注意该方法不是通用的
 */
export default {
    data() {
        return {}
    },
    methods: {
         /**
          * 生成Message-one空对象数据.
          * @param {Object} [config] 数据的配置,可选
          * @returns {Object} 能作为Message-one组件的空对象数据
          */
         createMessageOneEmptyData(config){
            if (typeof config !== 'object') {
                config = {
                    _message_modify: 'enable', 
                    _org_modify: 'hidden', 
                    _user_modify: 'hidden', 
                    _time_modify: 'hidden'
                };
            }
            const userInfo = JSON.parse(localStorage.userInfo);
            let temp = {
                _isEmpty: true,     // 是否是生成的message-one空对象
                _message: '',
                _orgId: userInfo.currUnitId,
                _orgNm: userInfo.currUnitName,
                _org: userInfo.currUnitName + '_' + userInfo.currUnitId,
                _userId: userInfo.humanCode,
                _userNm: userInfo.humanName,
                _user: userInfo.humanName + '_' + userInfo.humanCode,
                _time: new Date(),
                _message_modify: config._message_modify,
                _org_modify: config._org_modify,
                _user_modify: config._user_modify,
                _time_modify: config._time_modify,
            };
            return temp;
        },
        /**
         * 生成Message-one需要的数据
         * @param {Array | *} list 要处理的某类数据。对象数组
         * @param {Object} [config] 数据的配置,可选
         * @param {Function} [cb] 对每项的回调处理函数，可选
         * @return {Array} 处理后的能作为message-one组件的数组数据。该数组至少包含一个对象。
         */
        createMessageOneData(list, config, cb){
            if (typeof config !== 'object') {
                config = {
                    _message_modify: 'enable', 
                    _org_modify: 'enable', 
                    _user_modify: 'enable', 
                    _time_modify: 'enable'
                };
            }
            let arr = [];
            let empty = this.createMessageOneEmptyData();   // 空的message-one对象
            /* list不是数组,则生成一个包含空message-one对象的数组 */
            if ( !Array.isArray(list) ) { return [empty]; }

            /* list是数组，则将数组值转化为message-one组件需要的值。如果有待处理项(02)，则将待处理项放在数组首位 */
            if (list.length === 0) { return [empty]; }
            if (list.length > 0) {
                arr = list.reduce((prev, cur, index) => {
                    if (typeof cur !== 'object') { return prev; }
                    let dsc = cur.hasOwnProperty('Stmp_Aply_ApvOpn_Dsc') ? cur.Stmp_Aply_ApvOpn_Dsc : '',
                        orgId = cur.hasOwnProperty('StmpAplyAprvPsnBInsID') ? cur.StmpAplyAprvPsnBInsID : '',
                        orgNm = cur.hasOwnProperty('StmpAplyAprvPBgInstNm') ? cur.StmpAplyAprvPBgInstNm : '',
                        userId = cur.hasOwnProperty('Stmp_Aply_Aprv_Psn_ID') ? cur.Stmp_Aply_Aprv_Psn_ID : '',
                        userNm = cur.hasOwnProperty('Stmp_Aply_Aprv_Psn_Nm') ? cur.Stmp_Aply_Aprv_Psn_Nm : '',
                        time = cur.hasOwnProperty('Stmp_Aply_Aprv_Tm') ? cur.Stmp_Aply_Aprv_Tm : '';
                    cur._message = dsc;
                    cur._orgId = orgId;
                    cur._orgNm = orgNm;
                    cur._org = (orgId && orgNm) ? orgNm + '_' + orgId : (orgId || orgNm);
                    cur._userId = userId;
                    cur._userNm = userNm;
                    cur._user = (userId && userNm) ? userNm + '_' + userId : (userId || userNm);
                    cur._time = time;
                    cur._message_modify = config._message_modify;
                    cur._org_modify = config._org_modify;
                    cur._user_modify = config._user_modify;
                    cur._time_modify = config._time_modify;
                    if (typeof cb === 'function') { cur = cb(cur); }
                    // 如果是待处理项(审批任务类型Stmp_Aply_ApvOpn_Cd为02，最多只有一条)，则放在首位，否则放在末尾
                    if (cur.Stmp_Aply_ApvOpn_Cd === '02') {
                        // cur._message_modify = 'enable';
                        prev.unshift(cur);
                    } else {
                        prev.push(cur);
                    }
                    return prev;
                }, []);
            }
            console.log('createMessageOneData返回值:', arr, list);
            return arr;
        },
        /**
         * 挑拣出不同的意见域
         * @param {Array | *} list 要挑选的列表数据. eg: [{},...]
         * @param {Object} flags 意见域分类对象。key为分类标示字符串。val为存储分类标示字符串的字段。
         *               eg:{A0:"Stmp_Aprv_TpCd", ...}
         * @param {Function} pinpointFunc 可选，标示是否是指定分类的函数。返回true|false;
         * @return {Object} 分类后的对象。 对象key值为分类标示字符串，val值是包含的对象数组
         */
        pickIdeaFields(list, flags, pinpointFunc){
            let obj = {};
            if ( !Array.isArray(list) ) { list = []; }
            for (let key in flags) {
                if ( flags.hasOwnProperty(key) ) {
                    let val = flags[key];   // 对象中存储标示字符串的字段
                    // 挑选指定的分类数据
                    let tempArr = list.filter(function(item, index, array){
                        if (typeof pinpointFunc === 'function') {
                            return pinpointFunc(item, key, val);
                        } else {
                            return item[val] === key;
                        }
                    });
                    obj[key] = tempArr;
                }
            }
            console.log('pickIdeaFields返回的值', obj);
            return obj;
        },
        /**
         * 给对象数组排序，越新的数据(key的value值越大)越排到数组的后边.
         * @param {Array|*} fields 需要排序的对象数组，其余类型的值直接返回
         * @param {String} key 根据对象指定key值的大小来排序
         * @returns {Array|*} 排序后的对象数组
         */
        sortIdeaFields: function(fields, key){
            if ( !Array.isArray(fields) ) { return fields; }
            if (fields.length === 0) { return fields; }
            let sortFields = fields.sort(function(a, b){
                let na = Number(a[key]);
                let nb = Number(b[key]);
                // return nb - na;     // 降序
                return na - nb;     // 升序
            });
            return sortFields;
        },
    }
}