<style lang="less" scoped>
.content {
  width: 60%;
  margin: 20px auto;
  .empty {
    height: 3rem;
    .title {
      font-size: 0.3rem;
      font-weight: 600;
    }
    .back {
      font-size: 0.24rem;
      font-weight: 600;
      color: #0085a1;
      text-decoration: none;
      margin-top: 0.3rem;
    }
  }
}
</style>

<template>
  <div>
    <Header></Header>
    <div id="info" class="content" v-loading="$store.state.loading">
      <div v-if="!isContent" class="empty f fc fc-h">
        <i class="dzicon icon-kongzhuangtai-fuben" style="font-size:3rem"/>
        <div class="f fv">
          <span class="title">你所访问页面不存在</span>
          <a class="back" href="/">点击返回</a>
        </div>
      </div>
    </div>
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
      scrollReveal: scrollReveal(),
      isContent: true
    };
  },
  async mounted() {
    const { $store, tools } = this;
    const { commit, dispatch, state } = $store;
    const id = this.$route.query.id;
    await dispatch("getDetail", id);
    if (state.detail.content) {
      let content = state.detail.content.replace(/↵/g, "");
      document.getElementById("info").innerHTML = content;
      this.isContent = true;
    } else {
      this.isContent = false;
    }

    tools.scrollAnimate(this.scrollReveal);
  }
};
</script>
