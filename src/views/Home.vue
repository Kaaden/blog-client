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
import Up from "../components/Up";
export default {
  name: "home",
  components: {
    Header,
    Main,
    Up
  },
  mounted() {
    if (this.$store.state.user === "") {
      this.$store.dispatch("getUser");
    }
  }
};
</script>
