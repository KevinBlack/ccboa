/**
  * create by jiangke
  * 一条留言显示信息。还没有成熟，随时可能会修改
  */
<template>
    <div class="message-some">
        <el-card shadow="never" class="card-minPadding">
            <div v-for="(item, index) in dValue" :key="index" :class="{'is-disabled': disabled}">
                <message-one 
                    message_placeholder="请输入备注信息"
                    :message="item._message"
                    :org="item._org"
                    :user="item._user"
                    :time="item._time"
                    :index="index"
                    :disabled="disabled || item._disabled || getConfig(index, '_disabled')"
                    :readonly="readonly || item._readonly || getConfig(index, '_readonly')"
                    :message_modify="item._message_modify || getConfig(index, '_message_modify')"
                    :org_modify="item._org_modify || getConfig(index, '_org_modify')"
                    :user_modify="item._user_modify || getConfig(index, '_user_modify')"
                    :time_modify="item._time_modify || getConfig(index, '_time_modify')"
                    @result="handlerResult"
                ></message-one>
            </div>
        </el-card>
    </div>
</template>

<script>
import MessageOne from "./message-one";
export default {
    name: 'MessageSome',
    components: {
        'message-one': MessageOne
    },
    props: {
        value: {type: Array, required: true},           // 传入值，数组。可包含配置（可选）
        disabled: {type: Boolean, default: false},      // 是否禁用(全局)
        readonly: {type: Boolean, default: false},      // 是否只读(全局)
        config:   {type: Object, default: () => {}},    // 指定项个性化配置。eg: {'1': {disabled:xx, org_modify:xx,...}}
    },
    data(){
        return {
            // oldValueIsEmptyArray: false,
            dValue: []
        }
    },
    computed: {
        
    },
    watch:{
        // value数组的某一项对象整个变化时，才触发该方法。value数组里某一项里边的值变化，则不会触发该方法
        value: function(){
            console.log('message-some:watch value', this.value);
            this.dValue = this.$sealUtil.deepClone(this.value);
        }
    },
    methods: {
        getConfig(index, name){
            // console.log('getConfig:', index, name, this.config);
            let result;
            if ( this.config && this.config[index] ){
                if ( this.config[index].hasOwnProperty(name) ) {
                    result = this.config[index][name];
                }
            }
            return result;
        },
        // 生成Message-one空对象数据
        createMessageOneEmptyData(){
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
                _message_modify: 'enable',
                _org_modify: 'hidden',
                _user_modify: 'hidden',
                _time_modify: 'hidden',
            };
            return temp;
        },
        handlerResult(index, message, org, user, time){
            console.log('message-one回调函数：', index, message, org, user, time);
            this.dValue[index]._message = message;
            this.dValue[index]._org = org;
            this.dValue[index]._user = user;
            this.dValue[index]._time = time;
            this.$emit('input', this.dValue);
            // 在子组件中触发element-ui的校验
            this.$parent.$emit('validate', this.dValue);
        },
        // 格式化时间。 y-年 M-月 d-日 h-小时 m-分 s-秒
        formatDate(date, fmt){
            console.log(/(y+)/.test(fmt))
            if(/(y+)/.test(fmt)){
                fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length))
            }
            let o = {
                'M+':date.getMonth()+1,
                'd+':date.getDate(),
                'h+':date.getHours(),
                'm+':date.getMinutes(),
                's+':date.getSeconds()
            };
            for(let k in o){
                if(new RegExp(`(${k})`).test(fmt)){
                    let str = o[k] + '';
                    fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)? str: ('00' + str).substr(str.length) );
                }
            }
            return fmt
        },
        // time的类型：string类型 或 Date类型
        toStrTime: function(time){
            return typeof time === 'string' ? time : this.formatDate(time, 'yyyy/MM/dd hh:mm:ss');
        }
    },
    created: function(){
        console.log('message-some -> created:');
        // 如果传入的初始值为[],则添加一个message-one空项
        if (this.value.length === 0) {
            // this.oldValueIsEmptyArray = true;
            let empty = this.createMessageOneEmptyData();
            this.dValue.push(empty);
        } else {
            this.dValue = this.$sealUtil.deepClone(this.value);
        }
    },
    mounted: function(){
        window.jk_message_some= this;
        console.log('message-some -> mounted:');
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    .is-disabled {
        // disabled时未设置background-color，不知道设置什么能够与原生不可用时的背景色相同。 TODO:why?
        // 如果我设置了上层元素的背景色，背景色看起来竟然变深了，两个半透明的背景色叠加后颜色变深吗？还是我设置错了。
        // background-color: #e4e7ed52;
        // background-color:rgba(228, 231, 237, 0.32);
        color: #606266;
        border-color: #E4E7ED;
        cursor: not-allowed;
    }
    .card-minPadding {
        /deep/ .el-card__body {
            padding: 0 10px;
        }
    }
</style>