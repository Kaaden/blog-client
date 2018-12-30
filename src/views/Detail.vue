<style lang="less" scoped>
.content {
  width: 60%;
  margin: 20px auto;
}
</style>

<template>
  <div>
    <Header></Header>
    <div id="info" class="content" v-loading="$store.state.loading"></div>
     <Up></Up>
  </div>
</template>

<script>
import Header from "../components/Head";
import Up from "../components/Up"
export default {
  name: "home",
  components: {
    Header,
    Up
  },
  async mounted() {
    this.$store.commit("ChangeLoading", true);
    let id = this.$route.query.id;
    await this.$store.dispatch("getDetail", id);
    this.$store.state.detail.content = this.$store.state.detail.content.replace(
      /↵/g,
      ""
    );
    document.getElementById(
      "info"
    ).innerHTML = this.$store.state.detail.content;
  }
};
</script>
