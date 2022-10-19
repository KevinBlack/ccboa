/**
created:yinhk
侧边栏导航
@param container[string]锚点导航跳转容器
 */
<template>
  <!-- 侧边栏导航 -->
  <div class="bank_dispach_side_nav">
     <a
              href="javascript:void(0);"
              :class="active == '#wjys' ? 'active' : ''"
              @click="toTarget('#wjys')"
            >文件要素</a>
            <a
              href="javascript:void(0);"
              :class="active == '#fsdx' ? 'active' : ''"
              @click="toTarget('#fsdx')"
            >发送对象</a>
            <a
              href="javascript:void(0);"
              :class="active == '#qpyj' ? 'active' : ''"
              @click="toTarget('#qpyj')"
            >签批意见</a>
            <a
              href="javascript:void(0);"
              :class="active == '#scfj' ? 'active' : ''"
              @click="toTarget('#scfj')"
            >附件</a></div>
</template>

<script>
export default {
  props: {
    container: { type: String, default: "#bank_dispach_content" }
  },
  data() {
    return {
      active: "#wjys",
    };
  },
  mounted() {
   // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_fsdx = document.querySelector("#fsdx").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  },
  methods: {
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      if (scrolled < this.distance_fsdx) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_fsdx &&
        scrolled < this.distance_qpyj - 180
      ) {
        this.active = "#fsdx";
      } else if (
        scrolled >= this.distance_qpyj - 200 &&
        scrolled < this.distance_scfj
      ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },
    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    }
  }
};
</script>

<style lang="less">
.bank_dispach_side_nav {
  width: 45px;
  height: auto;
  position: fixed;
  bottom: 8px;
  left: 10%;
  margin-left: -43px;
  text-align: center;

  a {
    width: 45px;
    height: 70px;

    border: 2px solid #3b85ef;
    font-size: 16px;
    margin: 15px 0;
    color: #3b85ef;
    background: #fff;
    border-radius: 10px 0 0 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    background: #3b85ef;
    color: #fff;
  }
}
</style>