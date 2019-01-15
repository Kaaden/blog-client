<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import scrollReveal from "scrollReveal";
export default {
  name: "app",
  data() {
    return {
      scrollReveal: scrollReveal()
    };
  },
  updated() {
    this.tools.scrollAnimate(this.scrollReveal);
  }
};
</script>


