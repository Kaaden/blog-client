<style lang="less" scoped>
.content {
  width: 60%;
  margin: 20px auto;
}
</style>

<template>
  <div>
    <Header></Header>
    <div id="info" class="content"></div>
  </div>
</template>

<script>
import Header from "../components/Head";
export default {
  name: "home",
  components: {
    Header
  },
  async mounted() {
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
