<style lang="less" scoped>
.row {
  width: 66.66666667%;
  li {
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    margin-bottom: 0.2rem;
  }
  li:hover {
    color: #0085a1;
  }
  .title {
    font-size: 0.26rem;
    line-height: 1.3;
    margin-bottom: 0.1rem;
  }
  .content {
    font-style: italic;
    color: #a3a3a3;
    font-size: 0.12rem;
    margin-bottom: 0.1rem;
  }
  .content:hover {
    color: #0085a1;
  }
  .time {
    font-family: Lora, "Times New Roman", serif;
    color: gray;
    font-size: 0.18rem;
    font-style: italic;
  }
  .authors {
    font-family: Lora, "Times New Roman", serif;
    color: #0085a1;
    font-size: 0.14rem;
    margin-left: 0.2rem;
    font-style: italic;
  }
  .fecthImg {
    width: 18%;
    height: 1rem;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    flex-shrink: 0;
  }
}
</style>


<template>
  <div class="container f">
    <ul class="row" v-loading="$store.state.loading">
      <li
        v-for="item in $store.state.contentLst"
        @click="goDetail(item)"
        v-cloak
        class="f fc fj"
        style="width:100%"
      >
        <div class="f fv" style="width:75%;margin-right:0.3rem">
          <h2 class="title rv">{{item.title}}</h2>
          <p class="content line line3 rv">{{item.description}}</p>
          <div class="f fc">
            <span class="time rv">{{item.time}}</span>
            <span class="authors rv">{{item.authors}}</span>
          </div>
        </div>
        <div class="fecthImg rv" :style="{'background-image':`url(${item.img})`}"></div>
      </li>
    </ul>
    <UserInfo></UserInfo>
  </div>
</template>

<script>
import UserInfo from "./userInfo";
import scrollReveal from "scrollreveal";
export default {
  name: "Main",
  components: {
    UserInfo
  },
  data() {
    return {
      scrollReveal: scrollReveal()
    };
  },
  methods: {
    goDetail(item) {
      this.tools.goNewPage(`/Detail?id=${item.id}`, this);
    }
  },
  async mounted() {
    const { $store, tools } = this;
    await $store.commit("ChangeFetch", false);
    $store.dispatch("getContent", { pageindex: 1, pageSize: 10, status: 1 });
    tools.scrollAnimate(this.scrollReveal);
  }
};
</script>
