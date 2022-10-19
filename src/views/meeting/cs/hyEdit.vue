<!--
 * @Author: your name
 * @Date: 2020-08-04 10:18:57
 * @LastEditTime: 2020-08-04 14:13:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\cs\hyEdit.vue
--> 

/**
* create by zz on 2020-08-04 10:22:56
* 类注释：
* 备注：参数维护/会议系统配置/详情/编辑
*/
<template>
 <div class=" hyEdit">
     <div class="headerClick">
      <div class="right">
        <el-button v-for="(item,index) in buttonList" @click="buttonClick(item)" :key="index" size="mini" plain>{{item}}
        </el-button>
      </div>
    </div>
    <div class="hyHeader">
      <div class="title-text">会议系统配置</div>
    </div>
        <fd-form
        style="margin:0 10%;"
        :config="{labelWidth:'200px'}"
        :data="formData"
        @event="itemClick"
        :columns="formCfg">
        </fd-form>
 </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'
 export default {
     name:"hyEdit",
     components: {
         FdForm
     },
     data () {
       return {
           buttonList: ['关闭', '保存'],
           formCfg: [
            {type: 'select', prop: '13', label: '机构名称',options:{1:"qwer",2:"df"}, span: 24,},
            {type: 'input', prop: '16', label: '可填写签发意见的岗位', span: 20,},
                {type: 'button-primary', value: '选择',  prop: '$submit', span:4}
            
        ],
        formData: {},
       }
     },
    computed: {},
    methods: {
        buttonClick(params) {
                switch (params) {
                    case '保存':
                        // this.$intent.go(this,{path:"/meeting/cs/hyEdit"})
                        break
                    case '关闭':
                        this.$router.back();
                        break
                }
            },
        itemClick() {
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
    .hyEdit{
      background: white;
      margin: 0 auto;
      .headerClick {
        background: #409eff;
        color: white;
        height: 50px;
        line-height: 50px;

        .right {
          margin-left: 20px;
          float: left;
        }
      }
        .hyHeader {
            padding: 8px 70px;

            .title-text {
            margin-bottom: 15px;
            font-size: 30px;
            line-height: 75px;
            color: #409EFF;
            font-weight: 600;
            text-align: center;
            }
        }
    }
</style>


