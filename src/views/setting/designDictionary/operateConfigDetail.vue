<!--
 * @Author: your name
 * @Date: 2020-08-06 10:13:32
 * @LastEditTime: 2020-08-06 10:19:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\designDictionary\operateConfigDetail.vue
--> 

<!--nwl
 * @Date: 2020-08-05 20:08:33
 * @LastEditTime: 2020-08-05 20:07:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\designDictionary\moduleConfigDetail.vue
--> 

<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="writedata">编辑</el-button>
    </div>
    <p class="base-title">操作配置详情</p>

    <div class="infodetail">
      <el-row v-for="(a,index) in leftArr" :key="index">
        <el-col :span="12">
          <div class="infocell" >{{a}}</div>
        </el-col>
        <el-col :span="12">
          <div class="infocell">1</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "empty",
  components: {},
  props: {},
  data() {
    return {
        infoDetail:{},
        leftArr:[
          "模块名称",
          "模块关键字",
          "模块分类",
          "可用功能",
          "是否有转授权",
          '按年度分库数据库',
          "按年度和大小分库数据库",
          '按年度分库数据库'
        ]
    };
  },
  computed: {},
  methods: {
    closedata(){
      console.log("关闭")
      this.$router.go(-1)
    },
    writedata(){
       console.log("编辑")
    }
  },
  activated() {},
  mounted() {
    this.infoDetail= this.$route.query;
    delete this.infoDetail["index"];
    console.log(this.infoDetail);
    
    
  },
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  line-height: 36px;
  .base-title {
    width: 100%;
    margin: 16px 0px;
    text-align: center;
    color: red;
    font-size: 28px;
    font-weight: bolder;
  }
  .infodetail {
    .infocell {
      background: lightblue;
      border: 1px solid white;
      text-align: center;
    }
  }
}
</style>

