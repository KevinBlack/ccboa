<template>
  <div class="alterOrgEdit">
    <div class="handleButton">
      <el-button type="primary" @click="$router.back()">关闭</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <div class="alterInfoTable">
      <div class="alterInfoTitle">新旧机构对应表</div>
      <div class="alterInfoTableBody">
        <m-form
          :formCfg="formCfg"
          :formData="formData"
          :showButton="false"
          :isInline="false"
          labelWidth="220px"
        ></m-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import mForm from 'components/form/mForm'

    export default {
        name: 'alterOrgEdit',
        components: {
            mForm
        },
        props: {},
        data() {
            return {
                formCfg: [
                    {
                        label: '原机构全称',
                        prop: 'unitName',
                        type: 'input',
                        disabled: true
                    }, {
                        label: '新机构全称',
                        prop: 'newUnitName',
                        type: 'input',
                        disabled: true
                    }, {
                        label: '原机构简称',
                        prop: 'unitShort',
                        type: 'input',
                        disabled: true
                    },
                    {
                        label: '新机构简称',
                        prop: 'newUnitShort',
                        type: 'input',
                        disabled: true

                    }, {
                        label: '原机构ID',
                        prop: 'unitCode',
                        type: 'input',
                        disabled: true
                    }, {
                        label: '新机构ID',
                        prop: 'newUnitCode',
                        type: 'input',
                        disabled: true
                    }, {
                        label: '备注',
                        prop: 'remark',
                        type: 'input',
                        width: '300px',
                    }
                ],
                formData: {}
            }
        },
        computed: {},
        methods: {
            save() {
                this.$api.setting.changeOrgDe.updataOrgOrDept({history: this.formData}).then(res => {
                    this.$message({type: "success", message: "保存成功"})
                    this.$router.back()
                })
            },
        },
        activated() {
        },
        mounted() {
        },
        created() {
            this.formData = JSON.parse(this.$route.query.detail)
        }

    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .alterOrgEdit {
    height: 100vh;

    .alterInfoTable {
      padding: 0px 70px;

      .alterInfoTitle {
        margin-bottom: 40px;
        font-size: 30px;
        line-height: 75px;
        color: #ff0502;
        font-weight: 600;
        text-align: center;
        border-bottom: 2px solid #ff0502;
      }

      .alterInfoTableBody {
        margin-left: 8%;
      }
    }
  }
</style>
