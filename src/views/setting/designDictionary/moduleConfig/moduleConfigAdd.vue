
<!--
 * @Author: nwl
 * @Date: 2020-08-04 17:15:18
 * @LastEditTime: 2020-08-14 16:09:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\otherconfig\designElementSetting.vue
--><template>
  <div class="content">
    <p class="base-title">模块配置详情</p>
    <div class="btn-list">
      <el-button type="primary" @click="close">关闭</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <div class="box">
      <fd-form :data="formData" :columns="formCfg"></fd-form>
    </div>

  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
export default {
  name: "designElementSetting",
  components: {
    FdForm,
  },
  data() {
    return {
      id:"",
      formData: {
          moduleType:'APP',
          isHaveAgent:'是'
      },
      formCfg: [
        {
          type: "input",
          prop: "moduleName",
          span: 24,
          label: "模块名称",
        },
        { type: "input", label: "模块关键字", prop: "moduleKeyWord", span: 24 },
        {
          type: "radios",
          prop: "moduleType",
          value: 2,
          options: { APP: "业务", SYS: "系统" },
          span: 24,
          label: "模块分类",
        },
           {
          type: "radios",
          prop: "isHaveAgent",
          value: 2,
          options: { 是: "是", 否: "否" },
          span: 24,
          label: "是否有转授权",
        },
      ],
    };
  },

  methods: {
    close() {
      // console.log("关闭");
      this.$router.go(-1);
    },
    save() {
 //保存按钮
      if (!this.formData.moduleName) {
        this.$alert("模块名称不能为空！请输入", "警告", {
          confirmButtonText: "确定",
          callback: () => {},
        });
        return;
      } else if (!this.formData.moduleKeyWord) {
        this.$alert("模块关键字不能为空！请输入", "警告", {
          confirmButtonText: "确定",
          callback: () => {},
        });
        return;
      } else if (!this.formData.moduleType) {
        this.$alert("模块分类不能为空！请输入", "警告", {
          confirmButtonText: "确定",
          callback: () => {},
        });
        return;
      }else if (!this.formData.isHaveAgent) {
        this.$alert("请选择是否有转授权", "警告", {
          confirmButtonText: "确定",
          callback: () => {},
        });
        return;
      }
      if (this.id) {
        this.$api.designDictionary
          .moduleListUpdate({
          moduleConfig: this.formData
          })
          .then((res) => {
            if (res.code == "SUCCESS") {
              this.$message({
                title: "成功",
                message: "更新成功",
                type: "success",
              });
              this.$router.go(-1);
            }
          });
      } else {
       this.$api.designDictionary.moduleSettingAdd({
        moduleConfig:this.formData
      }).then(res=>{
        this.$message({
          type:'success',
          message:"保存成功"
        })
        this.$router.go(-1)
      })
      }
    }
  },
  mounted(){
    this.id=this.$route.query.id;
     if(this.id){
        this.$api.designDictionary.moduleSettingFind(this.id).then(res=>{
          this.formData=res.data
        })
     }
  }
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
    color: #3b85f0;
    font-size: 28px;
    font-weight: bolder;
  }
  .btn-list {
    margin-bottom: 20px;
  }
  .box {
    margin: 0 auto;
  }

}
</style>
