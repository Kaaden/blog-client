<template>
  <div>
    <Header></Header>
    <Main></Main>
  </div>
</template>

<script>
import Header from "../components/Head";
import Main from "../components/Main";
export default {
  name: "home",
  components: {
    Header,
    Main
  },
  mounted() {
    this.$store.dispatch("getBing");
  }
};
</script>
