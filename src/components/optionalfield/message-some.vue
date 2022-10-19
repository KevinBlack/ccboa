/**
  * create by jiangke
  * 一条留言显示信息。还没有成熟，随时可能会修改
  */
<template>
    <div class="message-some">
        <el-card shadow="never" class="card-minPadding">
            <div v-for="(item, index) in d_value" :key="index" :class="{'is-disabled': disabled}">
                <el-row>
                    <el-col :span="23">
                        <!-- :disabled="disabled || item._disabled || getConfig(index, '_disabled')"
                        :readonly="readonly || item._readonly || getConfig(index, '_readonly')" -->
                        <message-one 
                            message_placeholder="请输入信息"
                            :message="item._message"
                            :org-id="item._orgId"
                            :org-nm="item._orgNm"
                            :org="item._org"
                            :user-id="item._userId"
                            :user-nm="item._userNm"
                            :user="item._user"
                            :time="item._time"
                            :index="index"
                            :disabled="getConfig(index, '_disabled')"
                            :readonly="getConfig(index, '_readonly')"
                            :message_modify="item._message_modify"
                            :org_modify="item._org_modify"
                            :user_modify="item._user_modify"
                            :time_modify="item._time_modify"
                            @result="handlerResult"
                            @orgclick="handlerOrgClick"
                            @userclick="handlerUserClick"
                            @timeclick="handlerTimeClick"
                        ></message-one>
                    </el-col>
                    <el-col :span="1" style="padding-top:10px;">
                        <i 
                            class="el-icon-edit" 
                            :style="editStyleObj(index)"
                            @click="editCurIdea(index)">
                        </i>
                        <i 
                            class="el-icon-delete"
                            :style="delStyleObj(index)"
                            @click="deleteCurIdea(index)">
                        </i>
                    </el-col>
                </el-row>
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
        flag:       {type: String, default: ''},            // 该message的标识
        value:      {type: Array, required: true},          // 传入值，数组。可包含配置（可选）
        model:      {type: String, default: 'user'},        // 模式。user-普通用户(只能最新的message起效) manager-管理员（对所有的message起效）
        disabled:   {type: Boolean, default: false},        // 是否禁用(全局)
        readonly:   {type: Boolean, default: false},        // 是否只读(全局) 基本没有用这个，可能有问题
        config:     {type: Object,  default: () => {}},     // 指定项个性化配置。eg: {'1': {disabled:xx, org_modify:xx,...}}
        // delbtn_config:  {type: String, default: 'hidden'},  // 隐藏按钮配置（hidden-隐藏）
        // 编辑按钮配置。hidden-隐藏 enable-显示并可用 disable-显示不可用 default-默认(禁用时disable，非禁用时enable)
        // editbtn_config: {type: String, default: 'default'}, 
    },
    data(){
        return {
            // old_valueIsEmptyArray: false,
            d_value: [],
            d_editbtn_config: 'default',    // 编辑按钮的配置
            d_delbtn_config: 'hidden'       // 删除按钮的配置
        }
    },
    computed: {
        // 获取disabled属性的值
        getDisabledVal(){
            return function(index){
                let val = true;
                let lastIndex = this.d_value.length - 1;    // 最后一项的序号
                // user模式，除了最后一项，都是不可用(disabled)
                if (model === 'user') {
                    val = index === lastIndex ? this.disabled : true;
                } else if (model === 'manager') {
                    val = this.disabled;
                }
                return val;
            };
        },
        editStyleObj: function(){
            return function(index){
                let style = {
                    width: '100%',
                    padding: '0 0 0 6px',
                    fontSize: '20px',
                };
                if (this.model === 'user') {
                    let lastIndex = this.d_value.length - 1;    // 最后一项的序号
                    if (this.disabled === false) {  // 可用状态
                        style['display'] = index === lastIndex ? 'inline-block' : 'none';
                        style['cursor'] = index === lastIndex ? 'pointer' : 'not-allowed';
                    } else if (this.disabled === true) {    // 置灰状态
                        style['display'] = index === lastIndex ? 'inline-block' : 'none';
                        style['cursor'] = index === lastIndex ? 'not-allowed' : 'pointer';
                    }
                }
                return style;
            }
        },
        delStyleObj: function(){
            return function(index){
                let style = {
                    width: '100%',
                    padding: '0 0 0 6px',
                    fontSize: '20px',
                };
                if (this.model === 'user') {
                    style['display'] = 'none';
                } else if (this.model === 'manager') {
                    style['display'] = 'inline-block';
                }
                return style;
            }
        },
    },
    watch:{
        // value数组的某一项对象整个变化时，才触发该方法。value数组里某一项里边的值变化，则不会触发该方法
        value: function(){
            console.log('message-some:watch value', this.value);
            this.d_value = this.$sealUtil.deepClone(this.value);
        }
    },
    methods: {
        // 点击编辑按钮
        editCurIdea(index){
            // 置灰状态，直接返回
            if (this.disabled === true) {
                return;
            }
            // 可用状态，打开常用批语弹窗并请求数据
            console.log('编辑当前项', index);
            this.$emit('edit-click', this.flag, index);
        },
        // 点击删除按钮
        deleteCurIdea(index){
            // 置灰状态，直接返回
            if (this.disabled === true) {
                return;
            }
            console.log('删除当前项', index);
            this.$emit('delete-click', index);
        },
        // 获取某个message-one的配置
        getConfig(index, name){
            console.log('getConfig:', index, name, this.model, this.disabled);
            let result;     // 配置值
            let lastIndex = this.d_value.length - 1;    // 最后一项的序号
            // user模式，除了最后一项，都是不可用(disabled)
            if (this.model === 'user') {
                if (name === '_disabled') {
                    result = index === lastIndex ? this.disabled : true;
                } else if (name === '_readonly') {
                    result = index === lastIndex ? this.readonly : true;
                }
            } else if (model === 'manager') {
                if (name === '_disabled') {
                    result = this.disabled;
                } else if (name === '_readonly') {
                    result = this.readonly;
                }
            }
            // if ( this.config && this.config[index] ){
            //     if ( this.config[index].hasOwnProperty(name) ) {
            //         result = this.config[index][name];
            //     }
            // }
            return result;
        },
        // 生成Message-one空对象数据
        createMessageOneEmptyData(){
            const userInfo = JSON.parse(localStorage.userInfo);
            let temp = {
                _isEmpty: true,     // 是否是生成的message-one空对象
                _message: '',
                _orgId: userInfo._unitSyncCode,
                _orgNm: userInfo.unitName,
                _org: userInfo.unitName,
                _userId: userInfo.syncHumanCode,
                _userNm: userInfo.humanName,
                _user: userInfo.humanName,
                _time: new Date(),
                _message_modify: 'enable',
                _org_modify: 'hidden',
                _user_modify: 'hidden',
                _time_modify: 'hidden',
            };
            return temp;
        },
        handlerResult(obj){
            console.log('message-some回调函数：', obj);
            let index = obj.index;
            this.d_value[index]._message = obj.message;
            this.d_value[index]._org = obj.org;
            this.d_value[index]._orgId = obj.orgId;
            this.d_value[index]._orgNm = obj.orgNm;
            this.d_value[index]._user = obj.user;
            this.d_value[index]._userId = obj.userId;
            this.d_value[index]._userNm = obj.userNm;
            this.d_value[index]._time = obj.time;
            this.$emit('input', this.d_value);
            // 在子组件中触发element-ui的校验
            this.$parent.$emit('validate', this.d_value);
        },
        // 点击机构栏位
        handlerOrgClick(obj){
            console.log('message-some的orgClick回调函数：', obj);
            this.$emit('org-click', this.flag, obj.index, obj);
        },
        handlerUserClick(obj){
            console.log('message-some的userClick回调函数：', obj);
            this.$emit('user-click', this.flag, obj.index, obj);
        },
        handlerTimeClick(obj){
            console.log('message-some的timeClick回调函数：', obj);
            this.$emit('time-click', this.flag, obj.index, obj);
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
            let empty = this.createMessageOneEmptyData();
            this.d_value.push(empty);
        } else {
            this.d_value = this.$sealUtil.deepClone(this.value);
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