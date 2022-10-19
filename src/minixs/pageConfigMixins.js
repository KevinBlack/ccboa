/**
 * 页面配置需要用的方法。
 * 注意该方法不是通用的.该页面有问题，不要用
 */
export default {
    data() {
        return {
            rules: [],              // 规则
            buttonList: [],         // 操作按钮
            readFields: {},         // 控制域
            requiredFields: {},     // 控制域
            editedIdeaFields: {},   // 意见域
            requiredIdeaFields: {}, // 意见域
        }
    },
    methods: {
        // 设置对象自身属性上的所有值为指定值
        setObjSelfValues(obj, value){
            for (const key in obj) {
                if ( obj.hasOwnProperty(key) ) {
                    obj[key] = value;
                }
            }
        },
        // 保存现在页面的配置信息
        getPageConfig(){
            let config = {};
            config.rules = this.$sealUtil.deepClone(this.rules);
            config.buttonList = this.$sealUtil.deepClone(this.buttonList);
            // 控制域
            config.readFields = this.$sealUtil.deepClone(this.readFields);
            config.requiredFields = this.$sealUtil.deepClone(this.requiredFields);
            // 意见域
            config.editedIdeaFields = this.$sealUtil.deepClone(this.editedIdeaFields);
            config.requiredIdeaFields = this.$sealUtil.deepClone(this.requiredIdeaFields);
            return config;
        },
        // 获取管理员的配置信息：所有栏位可输入，所有按钮可见，校验规则为当前环节的校验规则
        getManagerPageConfig(stepPageConfig){
            let config = this.$sealUtil.deepClone(stepPageConfig);
            // 所有按钮可见
            config.buttonList = config.buttonList.map(item => {
                item.show = true;
                return item;
            });
            // 所有栏位可输入
            this.setObjSelfValues(config.readFields, false);
            this.setObjSelfValues(config.editedIdeaFields, true);
            return config;
        },
        // 获取当前环节的查看模式页面配置
        getSeePageConfig(stepPageConfig){
            let config = this.$sealUtil.deepClone(stepPageConfig);
            // 只显示关闭
            config.buttonList = config.buttonList.map(item => {
                item.show = false;
                if (item.name === '关闭') { item.show = true; }
                return item;
            });
            // 所有栏位置灰
            this.setObjSelfValues(config.readFields, true);
            this.setObjSelfValues(config.editedIdeaFields, false);
            return config;
        },
        /**
         * 获取某一环节的页面配置信息
         * @param {*} huanJieMessage 
         */
        getStepPageConfig(huanJieMessage){
            let config = {};
            // 按钮
            config.buttonList = this.showButton(
                this.buttonList,
                huanJieMessage.visibleButtons,
                huanJieMessage.visibleButtonsBycondition
            );  
            // 必填控制域
            config.requiredFields = this.setRequiredFields(
                this.requiredFields,
                huanJieMessage.requiredFields
            );  
            // 不可编辑控制域。配置了的会设置为true,与语义相同
            config.readFields = this.setReadFields(
                this.readFields,
                huanJieMessage.readFields
            ); 
            // 可编辑意见域。配置了的会设置为false,为了与语意相同，这儿反转了一下boolean值
            let editedIdeaFields = this.setEditedIdeaFields(
                this.editedIdeaFields,
                huanJieMessage.editedIdeaFields,
                huanJieMessage.editedIdeaFieldsBycondition
            );  
            config.editedIdeaFields = this.reverseObjSelfValues(editedIdeaFields);  // 反向
            // 必填意见域
            config.requiredIdeaFields = this.setRequiredIdeaFields(
                this.requiredIdeaFields,
                huanJieMessage.requiredIdeaFields
            );
            // rules规则(该方法是自己页面写的)
            config.rules = this.setRuleConfig(
                config.requiredFields, 
                config.requiredIdeaFields
            );
            return config;        
        },
    }
}