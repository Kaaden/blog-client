<style lang="less" scoped>
.row {
  width: 66.66666667%;
  .desc {
    color: gray;
    font-style: italic;
    font-size: 0.95em;
    margin: 20px 0 20px;
    border-left: 5px solid #eee;
    padding: 10px 20px;
  }
  .content {
    font-family: -apple-system, "Helvetica Neue", Arial, "PingFang SC",
      "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "Microsoft JhengHei",
      "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN",
      "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC",
      "WenQuanYi Micro Hei", SimSun, sans-serif;
    line-height: 2;
    font-size: 16px;
    color: #404040;
  }
}
</style>

<template>
  <div>
    <Header></Header>
    <div class="container f">
      <div class="row">
        <div class="desc rv">{{$store.state.user.description}}</div>
        <div class="content rv">{{$store.state.user.content}}</div>
      </div>
      <UserInfo></UserInfo>
    </div>
    <Up></Up>
  </div>
</template>

<script>
import Header from "../components/Head";
import UserInfo from "../components/userInfo";
import Up from "../components/Up";
import scrollReveal from "scrollreveal";
export default {
  name: "Tags",
  components: {
    Header,
    UserInfo,
    Up
  },
  data() {
    return {
      scrollReveal: scrollReveal()
    };
  },
  methods: {},
  async mounted() {
    const { $store, tools } = this;
    $store.dispatch("getUser");
    tools.scrollAnimate(this.scrollReveal);
  }
};
</script>
