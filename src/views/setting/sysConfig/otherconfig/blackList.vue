<!--
 * @Author: yx
 * @Date: 2020-08-13 14:15:24
 * @LastEditTime: 2021-03-23 10:23:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\sysConfig\otherconfig\blackList.vue
-->
<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" :disabled="!this.isUse==='1'" @click="savedata">{{isEdit?'编辑':'保存'}}</el-button>
    </div>
    <div class="mainCont">
      <p class="base-title">附件上传大小及白名单配置</p>
      <div class="formdata">
        <fd-form
          ref="fdForm"
          style="margin:0 1%"
          :data="applyformData"
          :columns="applyformCfg"
          :config="{labelWidth:'200px'}"
        ></fd-form>
      </div>
    </div>
  </div>
</template>
<script>
import FdForm from 'vue-elementui-freedomen/components/form'

export default {
  name: 'servereditor',
  components: {
    FdForm
  },
  data () {
    return {
      // 是否禁用编辑（保存）按钮
      isUse: '0',
      isEdit: true,
      applyformData: {},
      applyformCfg: [
        {
          type: 'radios',
          prop: 'isActivated',
          label: '是否启用附件白名单功能',
          options: { 1: '启用', 0: '禁用' },
          disabled: true
        },
        [
          { type: 'input-area', prop: 'attachWhiteList', config: { rows: 4 }, disabled: true },
          { type: 'span', value: '*多个请以英文逗号,分隔', style: { color: 'red', fontSize: '12px' } },
          { type: 'formitem', label: '白名单附件格式名' }
        ],
        {
          type: 'radios',
          prop: 'isLimitAttSize',
          label: '是否启用附件大小管理功能',
          options: { 1: '启用', 0: '禁用' },
          disabled: true
        },
        {
          type: 'input',
          label: '附件大小配置',
          prop: 'attachSize',
          rule: 'intp',
          disabled: true,
          span: 12
        },
        { type: 'span', value: 'M', span: 2, style: { "margin-left": "-58px" } },
      ],

    }
  },
  methods: {
    saveMethods () {
      this.isEdit = !this.isEdit
      this.applyformCfg = [
        {
          type: 'radios',
          prop: 'isActivated',
          label: '是否启用附件白名单功能',
          options: { 1: '启用', 0: '禁用' },
          disabled: this.isEdit
        },
        [
          { type: 'input-area', prop: 'attachWhiteList', config: { rows: 4 }, disabled: this.isEdit },
          { type: 'span', value: '*多个请以英文逗号,分隔', style: { color: 'red', fontSize: '12px' } },
          { type: 'formitem', label: '白名单附件格式名' }
        ],
        {
          type: 'radios',
          prop: 'isLimitAttSize',
          label: '是否启用附件大小管理功能',
          options: { 1: '启用', 0: '禁用' },
          disabled: this.isEdit
        },
        {
          type: 'input',
          label: '附件大小配置',
          prop: 'attachSize',
          rule: 'intp',
          // rule: 'textLong200',
          span: 12,
          disabled: this.isEdit
        },
        { type: 'span', value: 'M', span: 2, style: { "margin-left": "-58px" } },
      ]
    },
    savedata () {
      if (!this.isEdit) {
        this.$refs.fdForm.submit().then(res => {
          this.$api.setSysConfig.saveEnclosure({ ...this.applyformData }).then(res => {
            this.saveMethods()
          })
        })
      } else {
        this.saveMethods()
      }
    }
  },
  mounted () {
    this.$api.setSysConfig.getEnclosure({}).then(res => {
      this.applyformData = JSON.parse(JSON.stringify(res.data))
      this.isUse = res.data.isUse
    })
  },
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.content {
  height: 90vh;

  .mainCont {
    width: 90%;
    margin: 0 auto;
  }

  .formdata {
    margin-top: 45px;
  }

  .base-title {
    width: 100%;
    margin: 16px 0px;
    text-align: center;
    color: #3b85f0;
    font-size: 28px;
    font-weight: bolder;
  }
}
</style>
