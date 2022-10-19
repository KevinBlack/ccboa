<!--
 * @Author: your name
 * @Date: 2020-08-04 19:21:43
 * @LastEditTime: 2020-11-24 12:49:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\approval\parameter\apply\add.vue
--> 
<template>
    <div class="add">
        <el-button type="primary" style="margin-left:20px;" @click="save_btn">保存</el-button>
        <div class="addHeader">
            <div class="title-text">事务审批种类维护</div>
        </div>
        <div class="process_content">
            <el-form :rules="rules" :model="formData" label-width="120px">
              <el-row>
                <el-form-item label='会议类型'>
                    <el-col :span="24">
                        <el-row>
                                <el-select style="width:100%" v-model="select">
                                    <el-option
                                    v-for="item in 3"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                    </el-option>
                                </el-select>
                        </el-row>
                        <span class="bottom-span">(注：只能在首次配置中出现该选项，一旦保存，不允许修改)</span>
                    </el-col>
                </el-form-item>
              </el-row>  
              <el-row>
                  <el-form-item label="是否跨行执行项目">
                      <el-radio v-model="radio1" label="1">是</el-radio>
                      <el-radio v-model="radio1" label="2">否</el-radio>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-col :span="22">
                      <el-form-item label='委托承办单位'>
                        <el-row>
                            <el-input></el-input>
                        </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                      <el-button type="primary" style="float:left">选择</el-button>
                  </el-col>
              </el-row>
              <el-form-item label="申请项目"><el-input></el-input></el-form-item>
              <el-form-item label="申请项目简称"><el-input></el-input></el-form-item>
              <el-row>
                  <el-col :span="24">
                      <el-form-item label="项目编码"><el-input></el-input></el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                      <el-form-item label="模板名称"><el-input></el-input></el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                      <el-form-item label="编号"><el-input></el-input></el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-form-item label="是否必须由申请部门生成编号">
                      <el-radio v-model="radio2" label="1">是</el-radio>
                      <el-radio v-model="radio2" label="2">否</el-radio>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="是否编号">
                      <el-radio v-model="radio3" label="1">是</el-radio>
                      <el-radio v-model="radio3" label="2">否</el-radio>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="是否移动端展示">
                      <el-radio v-model="radio4" label="1">是</el-radio>
                      <el-radio v-model="radio4" label="2">否</el-radio>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="项目状态">
                      <el-radio v-model="radio5" label="1">启动</el-radio>
                      <el-radio v-model="radio5" label="2">未启动</el-radio>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="审批行是否启用">
                      <el-radio v-model="radio5" label="1">启动</el-radio>
                      <el-radio v-model="radio5" label="2">未启动</el-radio>
                      <span class="bottom-span">(注：此字段用来确定审批行用户什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么)</span>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="审批结论">
                      <el-radio v-model="radio6" label="1">空</el-radio>
                      <el-radio v-model="radio6" label="2">同意</el-radio>
                      <el-radio v-model="radio6" label="3">不同意</el-radio>
                      <el-radio v-model="radio6" label="4">同意部分</el-radio>
                      <span class="bottom-span">(注：此字段用来确定审批行用户什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么)</span>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="附件是否存储在Domino数据库">
                      <el-radio v-model="radio7" label="1">是</el-radio>
                      <el-radio v-model="radio7" label="2">否</el-radio>
                  </el-form-item>
              </el-row>
              <el-form-item label="Excel模板备注">
                      <span>若要使用Excel正文形式!<span style="color:red">下载Excel模板</span></span>
              </el-form-item>
              <el-row>
                <el-col :span="24">
                    <el-form-item label='正文模板'>
                    <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-button type="primary" style="margin-left:20px;">浏览</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                    <el-form-item label='管理制度'>
                    <el-input ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" style="margin-left:20px;">浏览</el-button>
                </el-col>
              </el-row>
              <el-row>
                  <el-form-item label="是否使用默认流程业务分类">
                      <el-radio v-model="radio5" label="1">是</el-radio>
                      <el-radio v-model="radio5" label="2">否</el-radio>
                      <span class="bottom-span">(注：只能在首次配置中出现该选项，一旦保存，不允许修改)</span>
                  </el-form-item>
              </el-row>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "add",
        components: {},
        props: {},
        data() {
            return {
                radio1:"",
                radio2:"",
                radio3:"",
                radio4:"",
                radio5:"",
                radio6:"",
                radio7:"",
                radio8:"",
                select: "",
                rules: {},
                formData: {},
            }
        },
        computed: {},
        methods: {
            save_btn(){
                this.$intent.go(this,{path:"/approval/parameter/apply/save"})
            }
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
.add{
    background: white;
    margin: 0 auto;

    .addHeader {
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
  .process_content {
      width: 80%;
      min-height: 920px;
      padding: 20px 16px;
      margin: 0 auto;

      
      .bottom-span{

          display: block;
          font-size:14px;
          color: red;
          line-height: 20px;
      }
      
    }
}
</style>
