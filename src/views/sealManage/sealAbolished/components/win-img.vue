<template>
    <div class="win-img">
        <el-dialog  :visible.sync="visible"  :title="title"  :width="width">
            <div class="img-wrap">
                <img src="value" alt="图片">
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'Win-Img',
        props: {
            value: {type: String, default: ''},         // 图片的路径
            visible: {type: Boolean, default: false},   // 是否展示dialog对话框
            width: {type: String, default: '50%'},      // dialog的宽度
            title: {type: String, default: ''},         // dialog的标题
        },
        methods: {
            confirm(){
                this.$emit('update:visible', false);
            }
        },
        watch: {

        },
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    .img-wrap {
        img {
            width: 100%;
        }
    }
</style>