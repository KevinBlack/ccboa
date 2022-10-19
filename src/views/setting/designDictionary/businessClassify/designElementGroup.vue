<!--
 * @Author: nwl
 * @Date: 2020-08-13 10:22:14
 * @LastEditTime: 2020-08-15 10:20:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\designDictionary\businessClassify\designElementGroup.vue
--> 
<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </div>
    <p class="base-title">设计元素集合</p>
    <div class="choRadios">
      <fd-form :data="formDataDia" :columns="formConfigDia" @event="choose"></fd-form>
    </div>
    <div class="btn-list">
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import FdForm from "vue-elementui-freedomen/components/form";
export default {
  name: "designElementGroup",
  components: {
    FdForm,
  },
  props: {},
  data() {
    return {
      checkConfig: { labelWidth: "0px" },
      testArr: [],
      selected: "",
      formDataDia: {},
      formConfigDia: [],
    };
  },
  computed: {},
  methods: {
    choose(e) {
      this.selected = e.row.checkBoxs1.join(",");
    },
    cancel() {
      this.$router.go(-1);
    },
    confirm() {
      let string = this.selected;
      this.$router.push({
        name: "businessClassifySet",
        query: { string },
      });
    },
    initDataDia() {
      this.formConfigDia = [
        {
          type: "check-boxs",
          prop: "checkBoxs1",
          options: this.testArr.join(","),
        },
      ];
    },
  },
  activated() {},
  mounted() {
    // 获取设计元素集合
    this.$api.designDictionary
      .designElementList11({ designConfigOrderVo: {} })
      .then((res) => {
        this.testArr=res.data.map(item=>item.designSetName)
        this.initDataDia();
      });
    
  },
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-checkbox {
  width: 20% !important;
}
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  line-height: 36px;
  .base-title {
    width: 100%;
    margin: 16px 0px;
    text-align: center;
    color: #3b85f0;
    font-size: 26px;
    font-weight: bolder;
  }
  .btn-list {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
  /deep/ .choRadios {
    // .el-checkbox-group {
    //   margin-left: 12%;
    // }
    .el-checkbox {
      width: 20%;
      height: 56px;
      .el-checkbox__label {
        width: 100%;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
