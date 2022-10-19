<!--
 * @Author: your name
 * @Date: 2020-08-06 10:00:42
 * @LastEditTime: 2020-08-08 16:13:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\secretary\adminDuty\dutyNotice\detailedList.vue
--> 

<template>
  <div class="detailedList">
    <div class="formHeader">
      <div class="title-text">中国建设银行值班通知</div>
    </div>
    <div class="content">
        <div class="txt">
            <div class="title">{{$route.query.row.name}}：</div>
            <div class="con">您好，拟安排您于{{$route.query.row.data}}值夜班，请于值班前仔细阅读相关值班须知。</div>
            <div class="type">值班须知</div>
        </div>
        <div class="btn_list">
            <el-button type="primary">确认接收</el-button>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

    export default {
        name: "detailedList",
        components: {
        },
        props: {},
        data() {
            return {
            }
        },
        computed: {},
        methods: {

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
  .formHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  .content{
      width:80%;
      border:1px solid #ccc;
      height:450px;
      margin:auto;
      .txt{
        width:100%;
        height:85%;
        padding:2% 3%;
        .title{
            margin-bottom:15px;
        };
        .con,.type{
            text-indent: 2em; 
            line-height:24px;
        };
        .type{
            margin-top:30px;
        }
    }
  }
  

</style>

