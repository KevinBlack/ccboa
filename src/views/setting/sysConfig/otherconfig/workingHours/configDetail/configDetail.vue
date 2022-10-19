
<!--
 * @Author: liyaling
 * @Date: 2020-11-07 17:30:19
 * @LastEditTime:
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\MenuPermissionConfig\permissionAssignment\index.vue
-->
<template>
    <div class="content">
      <p class="base-title">工作时长配置</p>
      <div class="btn-list">
        <el-button type="primary" @click="close">关闭</el-button>
        <el-button type="primary" @click="saveData" v-if="isShowSave || actionType==='0'">保存</el-button>
        <el-button type="primary" @click="isShowSave=true" v-if="!isShowSave && actionType==='1'">编辑</el-button>
      </div>
      <div class="formdata">
        <m-form :formCfg="formCfg" :formData="formData" :showButton="false" :isInline="false" :isAllDisabled="!isShowSave && actionType==='1'">
          <!-- <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly
              placeholder="机构名称"
              v-model="searchData.orgName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept> -->
        </m-form>
      </div>
      <org-tree
      v-model="showOrgTree"
      title="请选择机构"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    </div>
  </template>
  <script>
      import mForm from 'components/form/mForm'
      import selectOrgOrDept from "components/select/selectOrgOrDept";
      import orgTree from "components/tree/orgTree";
      import configsApis from '@/httpTansun/api/setting/setSysConfig.js'
      export default {
          name: 'workingHourConfigDetail',
          components: {
            mForm,
            orgTree
          },
          data() {
              return {
                //选择机构弹出框
                  showOrgTree: false,
                  isSingle: false,
                  orgOrDept: 1,
                  orgOrDeptId: "0",
                  actionType: this.$route.query.type,
                  isShowSave: false,
                  searchData: {
                    groupId: JSON.parse(localStorage.getItem("userInfo")).unitId,
                    orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
                    multiTenancyId: ''
                  },
                  optionsData: [],
                  formData: {
                    amTimeOff:"",
                    amTimeOn:"",
                    id:"",
                    ifActivate:"",
                    index:"",
                    pmTimeOff:"",
                    pmTimeOn:"",
                    unitCode:"",
                    workTime:""
                  },
                  formCfg: [
                    {
                      type: 'input',
                      prop: 'unitCode',
                      rule: "must",
                      label: '机构名称',
                      options:'',
                      showAdditionButton: true,
                      additionButtonLabel: '...',
                      additionButtonhandel: () => {
                        this.selOrg()
                        }　
                    },
                    {type: 'time', prop: 'amTimeOn', rule: "must", label: '上午上班时间'},
                    {type: 'time', prop: 'amTimeOff', rule: "must", label: '上午下班时间'},
                    {type: 'time', prop: 'pmTimeOn', rule: "must", label: '下午上班时间'},
                    {type: 'time', prop: 'pmTimeOff', rule: "must", label: '下午下班时间'},
                    {type: 'input', prop: 'workTime', label: '工作时长'},
                    {type: 'radioButton', prop: 'ifActivate', label: '是否启用'},
                  ]
              }
          },
          methods: {
              getOrgList (org) {
                if (this.orgOrDeptId == "0") {
                    // this.formData.manageBankId = org.id
                    // this.$set(this.formData, 'unitCode', org.unitName)
                    this.$set(this.formData, 'unitCode', org.id)
                }
              },
              //请求机构下拉框
                selectOrg (org) {
                  this.searchData.orgName = org.unitName;
                  this.searchData.groupId = org.id;
                  this.searchData.multiTenancyId = ''
                  this.$api.setting.workFlow.getBusiness({
                    groupId: this.searchData.groupId,
                    tplVldStcd: this.tplVldStcd
                  }).then(res => {
                    this.searchClassiOpt = res.data
                  })
                },
              //请求机构按钮点击事件-弹出框
              selOrg () {
                this.isSingle = true;
                this.orgOrDept = 1;
                this.orgOrDeptId = "0";
                this.showOrgTree = true
              },
              close() {
                  this.$router.go(-1)
              },
              saveData() {
                configsApis.workingTimeConfigSave(this.formData).then(res => {
                  console.log("----工作时长保存结果---", res)
                  this.tableData = JSON.parse(JSON.stringify(res.data))
                  this.isShowSave = false
                  return resolve(res);
                }).catch(err => {
                    this.loading = false
                });
              }
          },
          created() {
            const _this = this
            if (_this.actionType='1') {
              _this.formData = _this.$route.query.row
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
