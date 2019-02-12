<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import scrollReveal from "scrollreveal";
export default {
  name: "app",
  data() {
    return {
      scrollReveal: scrollReveal()
    };
  },
  watch: {
    //监听路由事件
    $route(to, from) {
      this.$store.dispatch("getConfig", to.path);
    }
  },
  mounted() {
    this.tools.scrollAnimate(this.scrollReveal);
    this.$store.dispatch("getConfig", this.$route.path);
  }
};
</script>


