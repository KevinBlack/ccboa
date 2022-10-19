/**
  * create by jiangke
  * 一条留言显示信息。还没有成熟，随时可能会修改
  */
<template>
    <div class="message-one" :class="{'is-disabled': disabled}">
        <el-row>
            <el-col :span=24 :class="messageClassObj">
                <el-input
                    type="textarea"
                    v-model="dMessage"
                    :disabled="disabled"
                    :autosize="{minRows: 2, maxRows: 6}"
                    :placeholder="message_placeholder"
                    :readonly="message_isReadonly"
                    :resize="message_isResize"
                    @change="change('message', $event)"
                    @blur="blur('message', $event)"
                    @focus="focus('message', $event)"
                ></el-input>
            </el-col>
        </el-row>
        <!-- <slot name="messageSlot"></slot> -->
        <el-row>
            <el-col :span="8" :offset="12" :class="departmentClassObj">
                <el-input 
                    v-model="dDepartment" 
                    :disabled="disabled"
                    :readonly="department_isReadonly"
                    :placeholder="department_placeholder" 
                    @change="change('department', $event)"
                    @blur="blur('department', $event)"
                    @focus="focus('department', $event)">
                </el-input>
            </el-col>
            <el-col :span="4" :class="userClassObj">
                <el-input 
                    v-model="dUser" 
                    :disabled="disabled"
                    :readonly="user_isReadonly"
                    :placeholder="user_placeholder" 
                    @change="change('user', $event)"
                    @blur="blur('user', $event)"
                    @focus="focus('user', $event)">
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" :offset="12" :class="timeClassObj">
                <el-input 
                    v-model="dTime"
                    :disabled="disabled"
                    :readonly="time_isReadonly"
                    :placeholder="time_placeholder" 
                    @change="change('time', $event)"
                    @blur="blur('time', $event)"
                    @focus="focus('time', $event)">
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'MessageOne',
    props: {
        // 是否不可用
        disabled: {
            type: Boolean,
            default: false,
        },
        /* 留言 */
        message: {
            type: String,
            default: ''
        },
        message_modify: {
            type: String,
            default: 'enable'   // modify值有enable, hidden, disable
        },
        message_placeholder: {
            type: String,
            default: ''   
        },
        /* 部门 */
        department: {
            type: String,
            default: ''
        },
        department_modify: {
            type: String,
            default: 'hidden'
        },
        department_placeholder: {
            type: String,
            default: ''   
        },
        /* 人员 */
        user: {
            type: String,
            default: ''
        },
        user_modify: {
            type: String,
            default: 'hidden'
        },
        user_placeholder: {
            type: String,
            default: ''   
        },
        /* 时间 */
        time: {
            type: [String, Date],
            default: ''
        },
        time_modify: {
            type: String,
            default: 'hidden'
        },
        time_placeholder: {
            type: String,
            default: ''   
        },
        /* 序号 */
        index:{
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            dIndex: '',
            dMessage: '',
            dDepartment: '',
            dUser: '',
            dTime: '',
        }
    },
    computed: {
        // 传入的原始数据处理使用data,还可以使用computed得到副本再更改使用
        // // 留言
        // cMessage:{
        //     get: function(){
        //         return this.message;
        //     },
        //     set: function(newVal){
        //         console.log('cMessage set:');
        //         this.$emit('result', this.cIndex, newVal, this.cDepartment, this.cUser, this.cTime);
        //     }
        // },

        // class
        // enable-可修改，disable-不可修改， hidden-隐藏
        messageClassObj: function(){
            // let modifyStatus = this.message_modify;
            console.log('ss');
            return {
                'message-message':  true,
                'message-hidden':   this.message_modify === 'hidden',
                'message-disable':  this.message_modify === 'disable',
                'message-enable':   this.message_modify === 'enable',
            }
        },
        departmentClassObj: function(){
            return {
                'message-short':  true,
                'message-hidden':   this.department_modify === 'hidden',
                'message-disable':  this.department_modify === 'disable',
                'message-enable':   this.department_modify === 'enable',
            }
        },
        userClassObj: function(){
            return {
                'message-short':  true,
                'message-hidden':   this.user_modify === 'hidden',
                'message-disable':  this.user_modify === 'disable',
                'message-enable':   this.user_modify === 'enable',
            }
        },
        timeClassObj: function(){
            return {
                'message-short':  true,
                'message-hidden':   this.time_modify === 'hidden',
                'message-disable':  this.time_modify === 'disable',
                'message-enable':   this.time_modify === 'enable',
            }
        },

        // message输入框是否可缩放(改变尺寸)
        message_isResize: function(){
            return this.message_modify === 'disable' ? 'none' : 'vertical';
        },

        // 输入框是否只读
        message_isReadonly: function(){
            return this.message_modify === 'disable';
        },
        department_isReadonly: function(){
            return this.department_modify === 'disable';
        },
        user_isReadonly: function(){
            return this.user_modify === 'disable';
        },
        time_isReadonly: function(){
            return this.time_modify === 'disable';
        },
    },
    watch:{
        // 监视传入参数，让父组件值更新时，子组件内的值也能更新
        message: function(newVal, oldVal){
            console.log('watch message');
            this.dMessage = newVal;
        },
        message_modify: function(newVal, oldVal){
            this.dMessage_modify = newVal;
        },
        department: function(newVal, oldVal){
            this.dDepartment = newVal;
        },
        department_modify: function(newVal, oldVal){
            this.dDepartment_modify = newVal;
        },
        user: function(newVal, oldVal){
            this.dUser = newVal;
        },
        user_modify: function(newVal, oldVal){
            this.dUser_modify = newVal;
        },
        time: function(newVal, oldVal){
            this.dTime = this.toStrTime(newVal);
        },
        time_modify: function(newVal, oldVal){
            this.dTime_modify = newVal;
        },

    },
    methods: {
        // 获取焦点
        focus(flag, event){
            // console.log('focus:', flag, event);
            this.$emit('focus', flag, event);
        },
        // 失去焦点
        blur(flag, event){
            // console.log('blur:', flag, event);
            this.$emit('result', this.dIndex, this.dMessage, this.dDepartment, this.dUser, this.dTime);
        },
        // input值改变
        change(flag, event){
            // console.log('change:', flag, event);
            this.$emit('result', this.dIndex, this.dMessage, this.dDepartment, this.dUser, this.dTime);
        },
        // 格式化时间。 y-年 M-月 d-日 h-小时 m-分 s-秒
        formatDate(date,fmt){
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
        console.log('message-one -> created:', this.time);
        this.dIndex = this.index;
        this.dMessage = this.message;
        this.dDepartment = this.department;
        this.dUser = this.user;
        this.dTime = this.toStrTime(this.time);
    },
    mounted: function(){
        window.jk_message_one= this;
        console.log('message-one:mounted:', this.disabled);
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    .is-disabled {
        background-color:rgba(228, 231, 237, 0.22);
        color: #606266;
        border-color: #E4E7ED;
        cursor: not-allowed;
    }
    .message-one {
        margin: 10px 0;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        .message-message {

        }
        .message-short {
            line-height: 22px;
            /deep/ .el-input__inner {
                height: 22px;
                line-height: 22px;
            }
        }
        .message-disable {
            /deep/ .el-input__inner {
                border: none;
                cursor: default;
            }
            /deep/ .el-textarea__inner {
                border: none;
                cursor: default;
            }
        }
        .message-enable {
            /deep/ .el-input__inner {
                cursor: auto;
            }
            /deep/ .el-textarea__inner {
                cursor: auto;
            }
        }
        .message-hidden {
            display: none;
        }
    }
</style>