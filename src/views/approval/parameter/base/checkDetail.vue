<template>
  <div class="checkDetail">
    <el-button v-if="!isEdit" type="primary" style="margin-left:20px;" @click="save_btn">保存</el-button>
    <el-button v-else type="primary" style="margin-left:20px;" @click="edit_btn">编辑</el-button>
    <el-button type="primary" style="margin-left:20px;" @click="close_btn">关闭</el-button>
    <div class="checkHeader">
      <div class="title-text">事务审批基本配置</div>
    </div>
    <fd-form
      ref="fdForm"
      style="margin:0 10%"
      :data="formData"
      @event="btnevent"
      :columns="formCfg"
      :config="serverconfig"
    >
    </fd-form>
    <!--    选择树-->
    <org-tree v-model="showOrgTree"
              :title="title"
              :isSingle="isSingle"
              :orgOrDept="orgOrDept"
              :orgOrDeptId="orgOrDeptId"
              @orgList="getOrgList">
    </org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'
    import orgTree from "components/tree/orgTree";

    export default {
        name: "checkDetail",
        components: {
            FdForm,
            orgTree
        },
        props: {},
        data() {
            return {
                title: "选择机构",
                showOrgTree: false,
                isSingle: false,
                orgOrDept: 1,
                orgOrDeptId: "0",
                isEdit: Boolean,
                formCfg: [],
                formData: {},
                serverconfig: {
                    labelWidth: '160px'
                },
            }
        },
        computed: {},
        methods: {
            // loadData(){
            //     this.$api.argumentPre.baseConfigDeal(
            //         {
            //             id: this.id
            //         }
            //     ).then(res => {
            //         this.formData = res.data
            //     })
            // },
            itemClick() {

            },
            close_btn() {
                this.$router.push('/approval/parameter/base/check')
            },
            save_btn() {
                if (this.formData.id) {
                    // this.formData.id = this.id
                    this.$api.argumentPre.baseConfigAlter(
                        this.formData
                    ).then(res => {
                        if (res.code == "SUCCESS") {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$router.go(-1)
                        }
                    })
                } else {
                    this.$refs.fdForm.submit().then(data => {
                        this.$api.argumentPre.baseConfigCreate(
                            this.formData
                        ).then(res => {
                            if (res.msg == "已存在相同数据") {
                                this.$message({
                                    message: '已存在相同数据',
                                    type: 'warning'
                                });
                            }else{
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.$router.go(-1)
                            }
                        })
                    })

                }
                // this.isEdit = !this.isEdit
                // this.setFormConfig()
            },
            edit_btn() {
                this.isEdit = !this.isEdit
                this.setFormConfig()
            },
            setFormConfig() {
                this.formCfg =
                    [
                        {
                            type: 'input',
                            prop: 'manageBank',
                            label: '管理机构',
                            span: 18,
                            disabled: true,
                            rule: "must",
                            style: {width: '100%'}
                        },
                        {
                            type: 'button-primary',
                            prop: '$selectOrg',
                            span: 1,
                            value: '选择',
                            disabled: this.isEdit,
                            style: {marginLeft: '-42px'}
                        },
                        // [
                        //     {type:'input',prop:'manageBank',span:16,style:{width:'80%'},disabled:this.isEdit,rule: "must"},
                        //     {type: 'button-primary', prop: '$selectOrg', value: '选择',disabled:this.isEdit,style:{marginLeft:'16px'}},
                        //     {type: 'formitem', label:'管理机构'}
                        // ],
                        {
                            type: this.isEdit ? 'input' : 'select', prop: 'autoEndTime',
                            options: '1,2,3,4,5,6,7,8,9,10,11,12', label: '自动办结期限/月',
                            span: 22, style: {width: '90%'}, disabled: this.isEdit, rule: "must"
                        },
                    ]
            },
            btnevent(params) {
                switch (params.prop) {
                    case "$selectOrg":
                        this.title = "选择机构";
                        this.isSingle = true;
                        this.orgOrDept = 1;
                        this.orgOrDeptId = "0";
                        this.showOrgTree = true
                        break
                }
            },
            getOrgList(org) {
                if (this.orgOrDeptId == "0") {
                    this.formData.manageBankId = org.id
                    this.$set(this.formData, 'manageBank', org.unitName)
                    this.$set(this.formData, 'orgCode', org.id)
                }
            },
        },
        activated() {
        },
        mounted() {
        },
        created() {
            let rowData = this.$route.query.data
            this.isEdit = this.$route.query.type != 'edit'
            if (this.isEdit) {
                this.rowData = JSON.parse(rowData)
                this.formData = this.rowData
            }
            this.setFormConfig()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .checkDetail {
    background: white;
    margin: 0 auto;


    .checkHeader {
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
