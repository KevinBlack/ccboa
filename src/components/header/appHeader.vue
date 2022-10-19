/**
* create by zx on 2020/7/30 16:25
* 类注释：
* 备注：
*/
<template>
    <div class="appHeader">

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "appHeader",
        components: {},
        props: {},
        data() {
            return {
                ccboaLoginUserName: localStorage.getItem("ccboaHumanName")?localStorage.getItem("ccboaHumanName"):"曹阳",
            }
        },
        computed: {},
        methods: {
            handleCommand(command) {
                if (command == "loginOut") {
                    localStorage.clear()
                    this.$router.push("/login")
                }
            },
        },
        activated() {
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
