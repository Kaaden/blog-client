<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import scrollReveal from "scrollreveal";
let fetch = false;
export default {
  name: "app",
  data() {
    return {
      scrollReveal: scrollReveal(),
      vm: {
        pageindex: 1,
        pageSize: 10,
        status: 1
      }
    };
  },
  watch: {
    //监听路由事件
    $route(to, from) {
      if (to.path === "/") {
        this.vm.pageindex = 1;
      }
      this.$store.dispatch("getConfig", to.path);
    }
  },
  methods: {
    async scorll(e) {
      const { $store, $route } = this;
      e = e || window.event;
      // 顶部滚动
      let documentScroll = document.documentElement.scrollTop;
      if (documentScroll === 0) {
        $store.commit("ChangeScroll", false);
        return;
      }
      document.documentElement.scrollTop >= 470
        ? $store.commit("ChangeBg", true)
        : $store.commit("ChangeBg", false);
      if (e.wheelDelta) {
        //第一步：先判断浏览器IE，谷歌滑轮事件
        e.wheelDelta > 0
          ? $store.commit("ChangeScroll", true)
          : $store.commit("ChangeScroll", false);
      } else if (e.detail) {
        e.detail > 0
          ? $store.commit("ChangeScroll", true)
          : $store.commit("ChangeScroll", false);
      } else {
        $store.commit("ChangeScroll", false);
      }
      // 加载内容列表
      if (
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop ===
        document.documentElement.clientHeight
      ) {
        if ($route.path !== "/") {
          return;
        }
        if (fetch) {
          return;
        }
        fetch = true;
        this.vm.pageindex = this.vm.pageindex + 1;
        await $store.dispatch("getContent", this.vm);
        fetch = false;
      }
    }
  },
  mounted() {
    this.tools.scrollAnimate(this.scrollReveal);
    this.$store.dispatch("getConfig", this.$route.path);
    var scrollFunc = this.scorll;
    //给页面绑定滑轮滚动事件
    document.addEventListener &&
      document.addEventListener("scrollHead", scrollFunc, false);
    //滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = scrollFunc;
  }
};
</script>


