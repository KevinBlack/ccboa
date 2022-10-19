/** 没写完，以后再写 */
<template>
    <div class="selectOrInput-Wrap">
        <el-dialog :title="title" :visible.sync="isShow">
            <el-row>
                <el-col :span="24">
                    <el-input v-model="myInput" :placeholder="myPlaceholder"></el-input>
                </el-col>
            </el-row>
            <slot></slot>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelSetDialog">取 消</el-button>
                <el-button type="primary" @click="saveSetDialog">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        isShow: {type: Boolean, default: false},
    },
    data(){
        return {
            myInput: '',        // 自由输入的值
        }
    },
    computed: {
        
    },
    watch: {
        
    },
    methods: {
        // 取消
        cancelSetDialog(){

        },
        // 确认
        saveSetDialog(){

        }
    },
    created: function(){

    },
    mounted: function(){

    },
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>