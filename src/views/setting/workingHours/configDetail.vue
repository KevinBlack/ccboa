
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
      <!--      <m-form :formCfg="formCfg" :formData="formData" :showButton="false" :isInline="false" :isAllDisabled="!isShowSave && actionType==='1'"></m-form>-->
      <fd-form style="margin:0 10%" :data="formData" @event="itemClick" :columns="formCfg"></fd-form>
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
    import FdForm from 'vue-elementui-freedomen/components/form'
    import selectOrgOrDept from "components/select/selectOrgOrDept";
    import orgTree from "components/tree/orgTree";
    import configsApis from '@/httpTansun/api/setting/setSysConfig.js'
    export default {
        name: 'workingHourConfigDetail',
        components: {
            FdForm,
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

                ]
            }
        },
        methods: {
            initFormConfig(){
                this.formCfg = [
                    {
                        type: 'input',
                        prop: 'unitCode',
                        rule: "must",
                        label: '机构名称',
                        span: 18,
                        disabled: !this.isShowSave,
                    },
                    {
                        type: 'button-primary',
                        prop: '$selectOrg',
                        span: 1,
                        value: '选择',
                        disabled: !this.isShowSave,
                        style: {marginLeft: '-42px'}
                    },
                    {type: 'time', prop: 'amTimeOn', rule: "must", label: '上午上班时间', disabled: !this.isShowSave},
                    {type: 'time', prop: 'amTimeOff', rule: "must", label: '上午下班时间', disabled: !this.isShowSave},
                    {type: 'time', prop: 'pmTimeOn', rule: "must", label: '下午上班时间', disabled: !this.isShowSave},
                    {type: 'time', prop: 'pmTimeOff', rule: "must", label: '下午下班时间', disabled: !this.isShowSave},
                    {type: 'input', prop: 'workTime', label: '工作时长', disabled: !this.isShowSave},
                    {type: 'radioButton', prop: 'ifActivate', label: '是否启用', disabled: !this.isShowSave},
                ]
            },
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
            itemClick(params){
                switch (params.prop) {
                    case "button-primary":
                        this.title = "选择机构";
                        this.isSingle = true;
                        this.orgOrDept = 1;
                        this.orgOrDeptId = "0";
                        this.showOrgTree = true
                        break
                    case "unitName":
                        break
                    case 'applyLongProject':
                        this.countSname()
                        break
                }
            },
            close() {
                this.$router.go(-1)
            },
            //工作时长保存结果
            saveData() {
                configsApis.workingTimeConfigSave(this.formData).then(res => {
                    console.log("----工作时长保存结果---", res)
                    this.tableData = JSON.parse(JSON.stringify(res.data))
                    this.isShowSave = false
                    this.initFormConfgi()
                    return resolve(res);
                }).catch(err => {
                    this.loading = false
                });
            }
        },
        created() {
            if (this.actionType='1') {
                this.formData = this.$route.query.row
                this.isShowSave = false
            } else {
                this.isShowSave = true
                this.initFormConfig()
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
