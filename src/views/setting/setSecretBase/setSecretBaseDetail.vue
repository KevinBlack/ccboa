
<!--
 * @Author: liyaling
 * @Date: 2020-11-07 18:48:19
 * @LastEditTime: 
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\MenuPermissionConfig\permissionAssignment\index.vue
-->
<template>
    <div class="content">
      <p class="base-title">定密依据配置</p>
      <div class="btn-list">
        <el-button type="primary" @click="close">关闭</el-button>
        <el-button type="primary" @click="saveData" v-if="isShowSave || actionType==='0'">保存</el-button>
        <el-button type="primary" @click="isShowSave=true" v-if="!isShowSave && actionType==='1'">编辑</el-button>
      </div>
      <div class="formdata">
        <m-form ref="mForm" :formCfg="formCfg" :formData="formData" :showButton="false" :isInline="false" :isAllDisabled="!isShowSave && actionType==='1'"></m-form>
        <span style="color: red;">填空地方请用（xx）代替，多条条款之间用回车键换行隔开</span>
      </div>
      <!-- <el-dialog title="定密依据" :visible.sync="dialogFormVisible">
        <el-radio-group v-model="radio">
            <el-radio :label="3">泄密后会使得本行</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </el-dialog> -->
    </div>
  </template>
  <script>
      import mForm from 'components/form/mForm'
      import configsApis from '@/httpTansun/api/setting/setSysConfig.js'
      export default {
          name: 'configDetail',
          components: {
            mForm
          },
          data() {
              return {
                actionType: this.$route.query.type,
                  isShowSave: false,
                  rowData: {},
                  resData:[],
                  optionsData: [],
                  formData: {
                    secretType: '',
                    secretContent: ''
                  },
                  formCfg: [
                    // {
                    //   type: 'select',
                    //   prop: 'isCodeName',
                    //   rule: "must",
                    //   label: '机构名称',
                    //   span: 22,
                    //   options: this.optionsData.join(","),
                    //   disabled: !this.isShowSave,
                    //   style: {width: '100%'}
                    // },
                    {
                      type: 'select',
                      prop: 'secretType',
                      rule: "must",
                      label: '秘密类型',
                      options: this.optionsData,
                    },
                    {
                      type: 'textarea', 
                      prop: 'secretContent', 
                      label: '定密依据',
                    },
                  ],
                  dialogFormVisible: false
              }
          },
          methods: {
            //加载详情
              loadData(id) {
                const data = {
                  id: id
                }
                configsApis.setSecretBaseConfigDetail(data).then(res => {
                  console.log(res)
                this.formData = JSON.parse(JSON.stringify(res.data))
                })
              },
              //关闭按钮
              close() {
                //判断是否保存
                this.$confirm('是否继续?').then(() => {
                  this.saveData()
                  this.$router.go(-1)
              })
              
              },
              //保存数据按钮 
              saveData() {
                console.log("----this.formData---", this.formData)
                if (!this.$refs.mForm.validate()) {
                    return
                }
                configsApis.setSecretBaseConfigSave(this.formData).then(res => {
                  console.log("----定密依据保存结果---", res)
                  this.isShowSave = false
                  return resolve(res);
                }).catch(err => {
                });
              }
          },
          created() {
            //判断，从列表跳转过来，则调用详情接口请求数据
            if (this.actionType='1') {
              this.formData = this.$route.query.row
            }else {
              //调用定密类型查询接口请求数据
              const data = {
                isCodeName: "定密类型",
                isCodeType: "secret_type",
                searchData: { sortKey: "", sort: "" },
              }
              configsApis.setSecretTypeQuery(data).then( res => {
                this.optionsData = res.data;
              })
            }
            
          }
      }
  </script>
  <style scoped lang="less" rel="stylesheet/less">
    .content {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      .formdata {
        margin-top: 24px;
      }
      .base-title {
        width: 100%;
        text-align: center;
        font-size: 32px;
        color: #3c86f0;
      }
    }
  </style>