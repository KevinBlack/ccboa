<!--
 * @Author: wy
 * @Date: 2020-07-21 10:04:47
 * @LastEditTime: 2020-07-21 10:45:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\newSchedule\components\newSchedule.vue
-->
<template>
  <div class="newSchedule">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button type="primary" @click="indexformData.id ? editSaveOrgInfo() : addSaveOrgInfo()">保存</el-button>
      <el-button type="primary" @click="saveAndAdd">保存并新建</el-button>
      <!--<el-button type="primary" @click="type === 'edit' ? editSaveOrgInfo(true) : addSaveOrgInfo(true)">保存并新建</el-button>-->
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">个人日常安排登记</div>
      <div>
        <div class="orgInfoTableBody">
          <m-form
            ref="mForm"
            :formCfg="indexformCfg"
            :formRules="indexformRules"
            :formData="indexformData"
            :showButton="false"
            :isInline="false"
            labelWidth="260px"
          ></m-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mForm from 'components/form/mForm'
  export default {
    name: 'newSchedule',
    components: {
      mForm
    },
    props: {},
    data() {
      return {
        // 机构索引信息
        indexformCfg: [
          {
            label: '活动类型',
            prop: 'hyDtype',
            type: 'radio',
            radios: [
              {
                label: '会议',
                value: '0'
              },
              {
                label: '约会',
                value: '1'
              },
              {
                label: '其他',
                value: '2'
              }]
          },
          {
            label: '主题',
            prop: 'hyDzt',
            type: 'input'
          }, {
            label: '日期',
            prop: 'hyDsj',
            type: 'date',
            format: "yyyy-MM-dd",
            width: '300px'
          },
          {
            label: '时间',
            prop: 'hyDsd',
            type: 'time'
          },
          {
            label: '地点',
            prop: 'hyDdd',
            type: 'input'
          },
          {
            label: '参与人员',
            prop: 'hyDry',
            type: 'input'
          },
          {
            label: '内容',
            prop: 'rzRcontent',
            type: 'textarea',
            rows:5
          }
        ],
        indexformRules: {
          hyDtype: [{required: true,message: '请选择', trigger: 'change'}],
          hyDzt: [{required: true,message: '不能为空', trigger: 'blur'}],
          hyDsd: [{required: true,message: '不能为空', trigger: 'change'}],
          hyDdd: [{required: true,message: '不能为空', trigger: 'blur'}],
          hyDry: [{required: true,message: '不能为空', trigger: 'blur'}]
        },
        indexformData: {
          hyDtype: '',
          hyDzt: '',
          hyDsd: '',
          hyDdd: '',
          hyDry: '',
          rzRcontent: '',
          hyDsj: formatBData(new Date(), 'YYYY-MM-DD')
        },
        type: 'add'
      }
    },
    methods: {
      //关闭
      close() {
        const that = this
        this.$confirm('是否保存并退出当前页面?', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          if (that.indexformData.id) {
            that.editSaveOrgInfo(false)
          } else {
            that.addSaveOrgInfo(false)
          }
        }).catch(() => {
          that.$router.back()
        })

      },
      editSaveOrgInfo(isNewAdd) {
        this.$refs.mForm.$refs.editForm.validate(valid => {
          if (valid) {
            this.$api.dailyWork.editSchedule(this.indexformData).then(res => {
              if (res.code == 'SUCCESS') {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                if (isNewAdd) {
                  return this.$refs.mForm.reset()
                }
                this.$router.back()
              } else {
                this.$message({
                  message: '保存失败',
                  type: 'error'
                });
              }
            })
          }
        })
      },
      saveAndAdd() {
        this.indexformData.id ? this.editSaveOrgInfo(true) : this.addSaveOrgInfo(true)
      },
      //保存
      addSaveOrgInfo(isNewAdd) {
        this.$refs.mForm.$refs.editForm.validate(valid => {
          if (valid) {
            console.log(this.indexformData)
            this.$api.dailyWork.addSchedule({schedule: this.indexformData}).then(res => {
              if (res.code == 'SUCCESS') {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                // if (isJump) {
                //   this.$router.push({path: '/dashboard/personalOffice/dailyWork/schedule'})
                // }
                if (isNewAdd) {
                  this.$refs.mForm.reset()
                  // this.indexformData.hyDsj = formatDate(new Date(), 'yyyy-MM-dd')
                } else {
                  this.indexformData = res.data
                }
              } else {
                this.$message({
                  message: '保存失败',
                  type: 'error'
                });
              }
            })
          }
        })
      }
    },
    activated() {
    },
    mounted() {
      this.type = this.$route.query.type
      if (this.type === 'edit') {
        this.$nextTick(() => {
          this.indexformData = JSON.parse(this.$route.query.workInfo)
        })
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .newSchedule {
    .orgInfoTable {
      padding: 8px 70px;

      .orgInfoTitle {
        margin-bottom: 15px;
        font-size: 30px;
        line-height: 75px;
        color: #ff0502;
        font-weight: 600;
        text-align: center;
      }

      .orgInfoTableBody {
        margin-left: 9%;
      }
    }
  }
</style>
