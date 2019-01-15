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
  mounted() {
    this.tools.scrollAnimate(this.scrollReveal);
  }
};
</script>


