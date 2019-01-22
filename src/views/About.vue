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
    $store.dispatch("getBing", {
      name: "About me",
      tip: "show me something",
      url:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548755589&di=56111dff399b429ad4bd87bcd6c6fdd1&imgtype=jpg&er=1&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F180818%2F12-1PQQ34Z6.jpg"
    });
    if ($store.state.user === "") {
      $store.dispatch("getUser");
    }
    tools.scrollAnimate(this.scrollReveal);
  }
};
</script>
