<!--
 * @Author: 王成伍
 * @Date: 2020-01-03 11:39:53
 * @LastEditTime : 2020-05-22 18:30:37
 * @LastEditors  : Please set LastEditors
 * @Description: 全局弹框
 * @FilePath: \PGMS\src\components\tip-dialog\TipDialog.vue
 -->
<template>
  <el-dialog
    :id="tipDialogId"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    :width="dialogWidth"
    :before-close="handleClose"
  >
    <div slot="title" style="width:100%;" @mousedown="mousedown">
      <h2 v-html="title" />
    </div>
    <slot>
      <i :class="icon" />
      <span>{{ message }}</span>
    </slot>
    <div v-if="isNeedOperateBtns" slot="footer" class="dialog-footer" style="text-align: center;">
      <slot name="otherBtns" />
      <span v-if="isShowOkAndCancel">
        <el-button v-show="isNeedOk" type="primary" @click="handleOk">{{ okText || '确 定' }}</el-button>
        <el-button
          v-show="isNeedCancel"
          type="primary"
          @click="handleClose"
        >{{ cancelText || '取 消' }}</el-button>
      </span>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'TipDialog',
    props: {
      isAboutBiz: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '信息'
      },
      isShow: {
        type: Boolean,
        default: false
      },
      /** 是否显示 确定和取消 按钮 */
      isShowOkAndCancel: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dialogVisible: this.isShow,
        configOptions: null,
        callbackReqData: null
      }
    },
    computed: {
      isNeedOperateBtns() {
        return (
          !this.configOptions ? true : (this.configOptions.isNeedOperateBtns === undefined
            ? true
            : this.configOptions.isNeedOperateBtns)
        )
      },
      dialogWidth() {
        return this.isAboutBiz ? '80%' : '350px'
      },
      isNeedCancel() {
        return (
          !this.configOptions ? true : (this.configOptions.isNeedCancel === undefined
            ? true
            : this.configOptions.isNeedCancel)
        )
      },
      cancelText() {
        return this.configOptions && this.configOptions.cancelText
      },
      isNeedOk() {
        return (
          !this.configOptions ? true : (this.configOptions.isNeedOk === undefined
            ? true
            : this.configOptions.isNeedOk)
        )
      },
      okText() {
        return this.configOptions && this.configOptions.okText
      },
      message() {
        return this.configOptions && this.configOptions.message
      },
      icon() {
        return this.configOptions && this.configOptions.icon
      },
      data() {
        return this.configOptions && this.configOptions.data
      },
      /** @description:  关闭时 是否真正关闭。true（默认）: 是， false: 否*/
      isActuallyClose() {
        return !this.configOptions
          ? true
          : this.configOptions.isActuallyClose === undefined
            ? true
            : this.configOptions.isActuallyClose
      },
      /** @description: 关闭弹窗回调 */
      closeCallBack() {
        return this.configOptions && this.configOptions.closeCallBack
      },
      tipDialogId() {
        return `${this.title}i${new Date().getTime()}d`
      }
    },
    watch: {
      isShow(val) {
        this.dialogVisible = val
      }
    },
    methods: {
      /** @description: 鼠标按下事件处理 */
      mousedown(event) {
        this.selectElement = document.getElementById(this.tipDialogId)

        var div1 = this.selectElement

        this.selectElement.style.cursor = 'move'

        var distanceX = event.clientX - this.selectElement.offsetLeft

        var distanceY = event.clientY - this.selectElement.offsetTop

        // alert(distanceX)

        // alert(distanceY)

        console.log(distanceX)

        console.log(distanceY)

        document.onmousemove = function(ev) {
          var oevent = ev || event

          div1.style.left = oevent.clientX - distanceX + 'px'

          div1.style.top = oevent.clientY - distanceY + 'px'
        }

        document.onmouseup = function() {
          document.onmousemove = null

          document.onmouseup = null

          div1.style.cursor = 'default'
        }
      },
      /*
       *  @description: 显示 弹窗
       *  @param { isNeedOperateBtns: 是否需要操作按钮 }
       */
      show(configOptions) {
        this.dialogVisible = true
        this.configOptions = configOptions
      },
      handleOk() {
        this.$emit('onOk')
      // this.dialogVisible = false
      },
      /** @description: 关闭 弹窗 */
      doClose() {
        this.dialogVisible = false
        this.closeCallBack && this.closeCallBack()
      },
      handleClose(done) {
        this.$emit('onCancel', done)
        this.isActuallyClose && this.doClose()
      }
    }
  }
</script>

<style lang="less" scoped>
.el-dialog__header {
  padding: 0px;
}
.el-dialog__body {
  padding: 0px !important;
}
.el-dialog__footer {
  padding: 0px;
}
</style>
