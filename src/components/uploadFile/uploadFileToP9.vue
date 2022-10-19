/**
  * create by jiangke
  * 上传文件到P9的对话框。该方法还不成熟，随时可能修改
  */
<template>
    <div class="uploadFileToP9">
        <!-- 设置close-on-click-modal后设置close方法应该是不起作用的 -->
        <el-dialog :title="title" :visible.sync="isShow" :show-close="false">
            <el-row class="formWrap">
                <form :id='uploadFileToP9Form' action="ecpJson.action" method="post" enctype="multipart/form-data">
                    <input ref="evidence" type="file" name="upload" /><br/>
                    <div>
                        <input type="hidden" name="_fw_service_id" value="simpleTransaction" />
                        <input type="hidden" name="savePath" :value="savePath" />
                        <input type="hidden" name="transFlag" value="p9" />
                        <input type="hidden" name="docType" :value="docType" />
                    </div>
                </form>
            </el-row>
            <slot name="showMore"></slot>
            <el-row>
                <el-button type="primary" plain @click="doCancel">取消上传</el-button>
                <el-button type="success" plain @click="doUpload">上传文件</el-button>
            </el-row>
            <el-row>
                <p class="info">{{info}}</p>
            </el-row>
            <!-- <el-upload
                class="upload-demo"
                ref="upload"
                action="ecpJson.action"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
        </el-dialog>
    </div>
</template>
<script>
    import {Message, Loading} from 'element-ui'

    export default {
        props: {
            // p8保存目录
            savePath:   {type: String, default: 'bsmp'},
            // 文件类型
            docType:    {type: String, default: 'bsmp_image'},
            // 工作模式。 默认为静默模式silent，即不弹出对话框
            mode:       {type: String, default: 'silent'},
            // 文档标题
            title:      {type: String, default: '请选择要上传的文件'},
            // 开始工作
            startWork:  {type: Boolean, default: false},
            // 白名单。即允许上传文件的类型,类型为数组
            whiteList:  {
                            type: Array, 
                            default: function(){ return [] }    // 数组／对象的默认值应当由一个工厂函数返回
                        },
            // 允许上传文件的最大尺寸（默认单位为字节），不传单位，只传数值
            maxFileSize: {
                            type: Number,
                            default: -1
                        },
            // 提示信息
            info:       {type: String, default: ''},
            // 提交前检验方法
            check:    Function,
        },
        data(){
            return {
                formId: '',
                isShow: false,
                uploadFileToP9Form: '',
                dWork: false,
            }
        },
        computed: {


        },
        watch: {
            startWork: function(newVal, oldVal){
                console.log('watch startWork:', newVal, this.mode);
                if (newVal === true) {
                    this.isShow = true;
                    setTimeout(() => {
                        if (this.mode === 'silent') {
                            this.$refs.evidence.click();
                        }
                    }, 10)
                } else {
                    this.isShow = false;
                }
            }
        },
        methods: {
            // 上传文件
            doUpload(){
                let that = this;
                let loading;    // 遮罩实例
                
                /* 检查 */
                let fileDom = this.$refs.evidence;                              // input:file原生对象
                let fileName = fileDom.value;                                   // 文件的绝对路径，没选择文件为''
                let fileSize = fileDom.files[0] ? fileDom.files[0].size : 0;    // 文件的字节大小。未做兼容，不会出问题吧。碎碎念
                let fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();  // 文件扩展名.没有后缀应该为''
                // 检查文件格式
                if (this.whiteList.length > 0){
                    if ( this.whiteList.indexOf(fileExtension) < 0 ) {
                        this.$emit('result', ['2', '', '提示：只允许上传图片，请选择正确的文件格式！']);
                        return;
                    }
                }
                // 检查文件大小
                if (this.maxFileSize > -1) {
                    if (fileSize > this.maxFileSize) {
                        this.$emit('result', ['2', '', '提示：最大只支持上传小于' + this.maxFileSize + '字节的文件！']);
                        return;
                    }
                }
                // 自定义检查
                if (typeof this.check === 'function') {
                    let checkResult = this.check(fileDom);
                    console.log('上传前检查结果:', checkResult);
                    if (!checkResult) { return; }
                }

                /* 上传。如果input:file里没值，PJF.html.upload的返回值没有_transfer_result对象 */
                loading = Loading.service({
                    lock: true,         // 锁定屏幕的滚动
                    text: "上传中..."   // 提示
                }); // 打开遮罩
                PJF.html.upload(this.uploadFileToP9Form, function(data){
                    console.log('上传文件返回值：', data);
                     loading && loading.close();    // 关闭遮罩
                    if (data.BK_STATUS === '00') {  // 成功
                        let p9val = '';
                        if (data && data._transfer_result && data._transfer_result.P9) {
                            p9val = data._transfer_result.P9;
                        }
                        that.$emit('result', ['0', p9val, data]);
                    } else if (data.BK_STATUS === '01') {   // 失败
                        that.$emit('result', ['1', '', data]);
                    }
                }); // 异步上传
            },
            // 取消上传
            doCancel(){
                this.$emit('result', ['1', '', null]);
            }
        },
        created(){
            console.log('uploadFileToP9->created');
            let nowTime = (new Date()).getTime();
            this.uploadFileToP9Form = 'uploadFileToP9Form_' + nowTime; 
        },
        mounted(){
            console.log('uploadFileToP9->mounted');
            // window.jk_uploadFileToP9 = this;
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    .formWrap{
        margin-bottom: 30px;
    }
    .info{
        margin-top: 20px;
        color: #D00;
    }
</style>