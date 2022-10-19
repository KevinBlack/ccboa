<!--
 * @Author: wy
 * @Date: 2020-07-07 17:57:40
 * @LastEditTime: 2021-03-25 18:42:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\themeLexicon\genus\genusConfig.vue
-->
<template>
  <div class="genusConfig">
    <div class="handleButton">
      <el-button type="primary" @click="close">关闭</el-button>
      <el-button type="primary" @click="edit()">{{buttonText}}</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">类属词配置</div>
      <m-form
        :formCfg="formCfg"
        :formData="formData"
        :showButton="false"
        :isInline="false"
        :isAllDisabled="isAllDisabled"
      ></m-form>
      <span class="message">*注意：多个主题词用英文模式下的“,”号隔开</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from 'components/form/mForm'

export default {
  name: 'genusConfig',
  components: {
    mForm
  },
  props: {},
  data () {
    return {
      //控制整个表单是否禁用
      isAllDisabled: false,
      buttonText: '保存',
      formCfg: [
        {
          label: '类别词',
          prop: 'mtTmpOne',
          type: 'select',
          width: '100%',
          isArray: true,
          options: []
        }, {
          label: '类属词',
          prop: 'mtTmpTwo',
          type: 'textarea',
          width: '100%'
        }],
      formData: {
      }
    }
  },
  computed: {},
  methods: {
    //关闭
    close () {
      this.$router.push({
        path: '/setting/themeLexicon/themeLexiconSet',
        query: {
          activeName: 'genus'
        }
      })
    },
    //编辑&保存
    edit () {
      console.log('1111111111111', this.formData);
      if (this.buttonText === '保存') {
        if (this.$route.query.id) {
          //修改
          this.$api.themeLexicon.genusUpdate(this.formData).then(res => {
            this.isAllDisabled = !this.isAllDisabled
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
          })
        } else {
          //新建
          this.$api.themeLexicon.genusAdd(this.formData).then(res => {
            this.isAllDisabled = !this.isAllDisabled
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
          })
        }
        this.buttonText = '编辑'
      } else {
        this.buttonText = '保存'
        this.isAllDisabled = !this.isAllDisabled
      }

    }
  },
  activated () {
  },
  mounted () {
    this.$api.themeLexicon.classifierDetail({}).then(res => {
      // let classifier = JSON.parse(JSON.stringify(res.data))
      // let classifierArr = classifier.map(item => {
      //   return item.mtTmpOne
      // })
      let classifierArr=[]
      classifierArr=JSON.parse(JSON.stringify(res.list))
      let classifierObject = this.formCfg.find(item => {
        return item.prop === 'mtTmpOne'
      })
      classifierObject.options = JSON.parse(JSON.stringify(classifierArr))
    })
    if (this.$route.query.id) {
      this.buttonText = '编辑'
      this.isAllDisabled = true
      let id = this.$route.query.id
      this.$api.themeLexicon.genusDetail({ id }).then(res => {
        this.formData = JSON.parse(JSON.stringify(res.data))
      })
    }
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.genusConfig {
  height: 100vh;
  .orgInfoTable {
    padding: 0px 70px;
    .orgInfoTitle {
      margin-bottom: 40px;
      font-size: 30px;
      line-height: 75px;
      color: #ff0502;
      font-weight: 600;
      text-align: center;
    }
    .el-textarea {
      .el-textarea__inner {
        font-weight: 600;
      }
    }
    .message {
      padding-left: 60px;
      color: #ff0502;
      font-size: 12px;
      line-height: 50px;
    }
  }
}
</style>
