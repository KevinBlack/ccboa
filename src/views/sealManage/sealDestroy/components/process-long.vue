/**
  * create by jiangke
  * 流程显示组件
  */
<template>
  <div class="process-long">
    <el-steps :active="active" :space="space" :direction="direction" :simple="simple" align-center>
        <el-step
            v-for="process in processes"
            :class="stepClassObj"
            :key="process.title"
            :title="process.title" :description="process.desc" :icon="process.icon"
            @click.native="stepClick(process.step, processes)"
            @mouseover.native="stepMouseover(process.step, processes)"
            @mouseout.native="stepMouseout(process.step, processes)">
        </el-step>
    </el-steps>
    <slot></slot>
  </div>
</template>

<script>
    export default {
        props: {
            // 所有的流程。对象数组，eg: [{step:0, title:'步骤1', desc:'这是步骤1的描述' icon:'el-icon-upload'}, {...}]
            // 数组／对象的默认值应当由一个工厂函数返回
            // processes: {type: Array, required: true, default: () => []},
            processes: {type: Array, default: () => []},
            // 当前所在流程中的步骤
            active: {type: Number, default: 0},
            // 步骤条的方向. 水平：horizontal（默认）， 竖直：vertical
            direction: {type: String, default: 'horizontal'},
            // 每个 step 的间距，不填写将自适应间距。支持百分比。
            space: [Number, String],
            simple: {type: Boolean, default: false},
            openChangeProcess: {type: Boolean, default: false},
            // 'align-center': {type: Boolean, default: false},
            // 'stepClick': Function,
        },
        data(){
            return {
                // nowActive: this.active,
                // oldActive: this.active,
            }
        },
        computed: {
            stepClassObj: function(){
                return {"step-hover": this.openChangeProcess}
            }
        },
        methods: {
            stepClick(step, processes){
                this.$emit('step-click', step, processes);
            },
            stepMouseover(step, processes){
                this.$emit('step-mouseover', step, processes);
            },
            stepMouseout(step, processes){
                this.$emit('step-mouseout', step, processes);
            },

        },
        created: function(){
            // console.log('process-long组件：', this.processes, this.active);
        },
        watch: {
            // // 只初始化时才更新吗
            // 'active': function(newVal, oldVal){
            //     // 如果父组件新传了当前流程值，则重置流程值
            //     console.log('watch-active',newVal, oldVal);
            //     this.nowActive = newVal;
            //     this.oldActive = newVal;
            // }
        },
        updated: function(){
            // console.log('updated:',this.active);
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  /*
      less中单行注释不会显示，所以这儿使用多行注释
      style标签添加scoped属性会让生成的每个dom上都添加一个唯一的动态属性，相当于作用域，这样样式就可只对当前组件有效，不会污染全局样式。
      但常见组件库element-ui，vant提供的组件的样式是不带scoped的，其组件内生成的dom上是不带唯一的动态属性的。
      当我们使用scoped方式使用这些组件库时，就会出现无法修改组件样式的问题。
      如本要选择 .my[data-v-6ce6ba38] .el-step-title 却找到了 .my .el-step-title[data-v-6ce6ba38] ，当然无法生效了。
      解决方法：
      1.使用css的 深度选择器>>> 来选择。对于less,sass等预编译可能不支持>>>操作符，可以使用 /deep/ 操作符（>>>的别名）
      2.去掉scoped方式使用这些组件库，修改这些组件样式时，添加一个自定义父元素来减少对全局样式的污染
      详情可查看“Vue scoped与深度选择器deep的原理”
  */
  .process-long {
    width: 100%;
    // border: 1px solid #333;
    border-bottom: 1px solid #333;
    padding: 10px;
    /deep/ el-step__main:hover{
      font-weight: bold;
      color: #303133;
    }
    /deep/ .el-step__title {
      font-size: 13px;
      line-height: 22px;
    }
    /deep/ .el-step__title.is-process {
      font-weight: bold;
    }
    /deep/ .el-step__title.is-finish {
      font-weight: bold;
    }

    .step-hover :hover {
      cursor: pointer;
    }
  }
</style>
