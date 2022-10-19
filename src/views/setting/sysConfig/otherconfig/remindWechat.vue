<!--
 * @Author: your name
 * @Date: 2021-02-26 10:41:38
 * @LastEditTime: 2021-03-03 12:07:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0301h:\workplace\0226\src\views\setting\sysConfig\otherconfig\remindWechat.vue
--> 
<template>
  <div class="content">
    <div class="btn-list">
        <el-row :gutter="20">
          <el-col :span="6" >
            <select-org-or-dept @select="selectOrg" >
              <el-input
                type="text"
                readonly="readonly"
                placeholder="请选择机构"
                v-model="searchData.orgName"
                suffix-icon="el-icon-arrow-down"
              />
            </select-org-or-dept>
          </el-col>
          <el-button type="primary" @click="toEdit">{{isEdit?"编辑":"保存"}}</el-button>
        </el-row>
      </div>
    <!-- <el-button @click="toEdit">{{isEdit?"编辑":"保存"}}</el-button> -->
    <fd-form
      :disabled="isEdit"
      style="margin:0 1%"
      :data="applyformData"
      :columns="applyformCfg"
    ></fd-form>
  </div>
</template>
<script>
    import FdForm from 'vue-elementui-freedomen/components/form'
    import selectOrgOrDept from "components/select/selectOrgOrDept";
    export default {
        components: {
            FdForm,
            selectOrgOrDept
        },
        data() {
            return {
                isEdit: true,
                applyformData: {},
                searchData: {
                    orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
                    unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
                    unitClass: 0,
                },
            }
        },
        methods: {
            selectOrg(org) {
                this.searchData.orgName = org.unitName;
                this.searchData.unitId = org.id;
                this.applyformData.unitName = org.unitName
                this.applyformData.unitCode = org.id
                this.applyformData.isActivatedWx =''
                this.$delete(this.applyformData, 'id')
                // this.$delete(this.applyformData, 'isActivatedWx')
                console.log(8888,this.applyformData)
                this.setConfig()
                this.loadData()
            },
            toEdit() {
                this.isEdit = !this.isEdit;
                if (this.isEdit) {
                    this.$api.setSysConfig.setRemindWechat(this.applyformData).then(res => {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                    })
                }
                this.setConfig()
            },
            setConfig() {
                this.applyformCfg = [
                    {
                        type: 'radios',
                        prop: 'isActivatedWx',
                        label: '是否启用',
                        options: {1: '启用', 2: '禁用'},
                        disabled: this.isEdit
                    },
                ]
            },
            loadData() {
                this.applyformData.unitName = this.searchData.orgName
                this.applyformData.unitCode = this.searchData.unitId
                this.$api.setSysConfig.getRemindWechat(this.applyformData).then(res => {
                    if (res.data && res.data.obj) this.applyformData = res.data.obj
                })
            }
        },
        created() {

            this.setConfig()
            this.loadData()
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">

</style>
