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
import scrollReveal from "scrollreveal";
import Header from "../components/Head";
import Up from "../components/Up";
export default {
  name: "home",
  components: {
    Header,
    Up
  },
  data() {
    return {
      scrollReveal: scrollReveal()
    };
  },
  async mounted() {
    const { $store, tools } = this;
    const { commit, dispatch, state } = $store;
    const id = this.$route.query.id;
    commit("ChangeLoading", true);
    await dispatch("getDetail", id);
    let content = state.detail.content
      ? state.detail.content.replace(/↵/g, "")
      : "";

    document.getElementById("info").innerHTML = content;
    tools.scrollAnimate(this.scrollReveal);
  }
};
</script>
