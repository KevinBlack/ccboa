<!--
 * @Author: wy
 * @Date: 2020-07-07 15:25:09
 * @LastEditTime: 2020-10-08 15:16:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\themeLexicon\practice\index.vue
-->
<template>
  <div class="practice">
    <div class="handleButton">
      <el-button type="primary" @click="edit()">{{buttonText}}</el-button>
    </div>
    <div class="orgInfoTable">
      <div>
        <div class="orgInfoTitle">文种词设置</div>
        <el-input
          type="textarea"
          :rows="5"
          v-model="form.ftFileType"
          resize="none"
          :disabled="form.isDisabled"
          :style="{fontSize:'18px'}"
        ></el-input>
        <span class="message">*注意：多个主题词用英文模式下的“,”号隔开</span>
      </div>

      <div>
        <div class="orgInfoTitle">发文字数限制</div>
        <el-input
          type="textarea"
          :rows="3"
          v-model="form.ftFwzsxz"
          resize="none"
          :disabled="form.isDisabled"
          :style="{fontSize:'18px'}"
        ></el-input>
        <span class="message">*注意：多个主题词用英文模式下的“,”号隔开</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'practice',
  components: {
  },
  props: {},
  data () {
    return {
      buttonText: '编辑',
      form: {
        detailData: [],
        ftFileType: '',
        ftFwzsxz: '',
        isDisabled: true
      }
    }
  },
  computed: {},
  methods: {
    //初始化数据
    practiceDetail () {
      this.$api.themeLexicon.practiceDetail({}).then(res => {
        this.form.detailData = JSON.parse(JSON.stringify(res.data))
        let ftFwzsxzArr = []
        let ftFileTypeArr = res.data && res.data.map(item => {
          ftFwzsxzArr.push(item.ftFwzsxz)
          return item.ftFileType
        })
        this.form.ftFileType = ftFileTypeArr.join(',')
        this.form.ftFwzsxz = ftFwzsxzArr.join(',')
      })
    },
    //编辑、保存
    edit () {

      if (this.buttonText === '保存') {
        let ftFileTypeArr = this.form.ftFileType.split(',')
        let ftFwzsxzArr = this.form.ftFwzsxz.split(',')
        let ftFileTypeLength = ftFileTypeArr[ftFileTypeArr.length - 1] === '' ? ftFileTypeArr.length - 1 : ftFileTypeArr.length
        let ftFwzsxzArrLast = ftFwzsxzArr.length - 1
        if (ftFwzsxzArr[ftFwzsxzArrLast] === '') {
          ftFwzsxzArr.splice(ftFwzsxzArrLast, 1)
        }
        let ftFwzsxzLength = ftFwzsxzArr[ftFwzsxzArr.length - 1] === '' ? ftFwzsxzArr.length - 1 : ftFwzsxzArr.length
        if (ftFileTypeLength !== ftFwzsxzLength) {
          this.$message({
            type: 'warning',
            message: '请将文种词与发文字数限制一 一对应！'
          })
          return
        }
        let isAllNum = ftFwzsxzArr.some(item => {
          return !(/^[0-9]+$/.test(item))
        })
        if (isAllNum) {
          this.$message({
            type: 'warning',
            message: '请输入数字格式的发文字数限制！'
          })
          return
        }

        let ftFileType = this.form.ftFileType
        let ftFwzsxz = this.form.ftFwzsxz
        this.$api.themeLexicon.practiceUpdate({ ftFileType, ftFwzsxz }).then(res => {
          this.practiceDetail()
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
    this.practiceDetail()
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.practice {
  .orgInfoTable {
    padding: 0px 70px;
    .orgInfoTitle {
      margin-bottom: 20px;
      font-size: 30px;
      line-height: 65px;
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
