<template>
  <div aria-label="提示" v-show="closeHandler" class="el-message-box__wrapper" style="z-index: 2017;">
    <div class="el-message-box">
      <div class="el-message-box__header">
        <div class="el-message-box__title">
          <span>提示</span>
        </div>
        <button type="button" class="el-message-box__headerbtn" @click="btnCloseHandler('3')">
          <i class="el-message-box__close el-icon-close"></i>
        </button>
      </div>
      <div class="el-message-box__content">
        <div class="el-message-box__container">
          <div class="el-message-box__status el-icon-warning"></div>
          <div class="el-message-box__message">
            <p>是否保存并退出当前页面?</p>
          </div>
        </div>
        <div class="el-message-box__input" style="display: none;">
          <div class="el-input el-input--small">
            <!---->
            <input type="text" autocomplete="off" placeholder class="el-input__inner" />
          </div>
          <div class="el-message-box__errormsg" style="visibility: hidden;"></div>
        </div>
      </div>
      <div class="el-message-box__btns">
        <button
          type="button"
          class="el-button el-button--default el-button--small"
          @click="btnCloseHandler('1')"
        >
          <span>否</span>
        </button>
        <button
          type="button"
          class="el-button el-button--default el-button--small el-button--primary"
          @click="btnCloseHandler('2')"
        >
          <span>是</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 表格数据
    closeHandler: { type: Boolean, default: false }
  },
  methods: {
    btnCloseHandler(val) {
      this.$emit("btnCloseHandler", val);
      if (val == 3) {
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "已取消关闭",
          duation: 1000
        });
      }
    }
  }
};
</script>
