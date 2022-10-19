<!--
 * @Author: wy
 * @Date: 2020-07-07 15:25:50
 * @LastEditTime: 2020-09-08 15:12:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\themeLexicon\public-genus\index.vue
-->

<template>
  <div class="publicGenus">
    <div class="handleButton">
      <el-button type="primary" @click="edit()">{{buttonText}}</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">公共类属词配置</div>
      <el-input
        type="textarea"
        :rows="5"
        v-model="form.pcPublic"
        resize="none"
        :disabled="form.isDisabled"
        :style="{fontSize:'18px'}"
      ></el-input>
      <span class="message">*注意：多个主题词用英文模式下的“,”号隔开</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'publicGenus',
  components: {
  },
  props: {},
  data () {
    return {
      buttonText: '编辑',
      form: {
        pcPublic: '',
        isDisabled: true,
        detailData: []
      }
    }
  },
  computed: {},
  methods: {
    //初始化数据
    publicGenusDetail () {
      this.$api.themeLexicon.publicGenusDetail({}).then(res => {
        this.form.detailData = JSON.parse(JSON.stringify(res.data))
        let pcPublicArr = res.data && res.data.map(item => {
          return item.pcPublic
        })
        this.form.pcPublic = pcPublicArr.join(',')
      })
    },
    //编辑、保存
    edit () {
      if (this.buttonText === '保存') {
        let pcPublic = this.form.pcPublic
        this.$api.themeLexicon.publicGenusUpdate({ pcPublic }).then(res => {
          this.publicGenusDetail()
          this.buttonText = '编辑'
          this.form.isDisabled = !this.form.isDisabled
        })
      } else {
        this.buttonText = '保存'
        this.form.isDisabled = !this.form.isDisabled
      }
    }
  },
  activated () {
  },
  mounted () {
    this.publicGenusDetail()
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.publicGenus {
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
      padding-left: 20px;
      color: #ff0502;
      font-size: 12px;
      line-height: 50px;
    }
  }
}
</style>
