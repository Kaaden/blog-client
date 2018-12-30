<template>
  <div>
    <Header></Header>
    <Main></Main>
    <Up></Up>
  </div>
</template>

<script>
import Header from "../components/Head";
import Main from "../components/Main";
import Up from "../components/Up"
export default {
  name: "home",
  components: {
    Header,
    Main,
    Up,
  },
  mounted() {
    this.$store.dispatch("getBing", {
      name: "Kaaden",
      tip: "一个不甘寂寞的码畜"
    });
  }
};
</script>
