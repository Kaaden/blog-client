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
    <ul class="row" v-loading="$store.state.loading" >
      <li v-for="item in $store.state.contentLst" @click="goDetail(item)" v-cloak class="f fc fj" style="width:100%">
        <div class="f fv" style="width:75%;margin-right:0.3rem">
          <h2 class="title rv">{{item.title}}</h2>
          <p class="content line line3 rv">{{item.content}}</p>
          <div class="f fc">
            <span class="time rv">{{item.time}}</span>
            <span class="authors rv">{{item.authors}}</span>
          </div>
        </div>
        <div class="fecthImg rv" :style="{'background-image':`url(${item.img})`}"></div>
      </li>
      <el-pagination
        layout="prev, pager, next"
        :page-size="10"
        :current-page="vm.pageindex"
        @current-change="changePage"
        :total="$store.state.contentTotal"
      />
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
      vm: {
        pageindex: 1,
        pageSize: 10,
        status: 1
      },
      scrollReveal: scrollReveal()
    };
  },
  methods: {
    goDetail(item) {
      this.tools.goNewPage(`/Detail?id=${item.id}`, this);
    },
    async changePage(e) {
      let { $store, vm, tools } = this;
      vm.pageindex = e;
      $store.commit("ChangeLoading", true);
      await $store.dispatch("getContent", vm);
      $store.commit("ChangeLoading", false);
      this.vm.pageindex = e;
      tools.scrollAnimate(this.scrollReveal);
    }
  },
  async mounted() {
    const { $store, vm, tools } = this;
    $store.commit("ChangeLoading", true);
    await $store.dispatch("getContent", vm);
    $store.commit("ChangeLoading", false);
    tools.scrollAnimate(this.scrollReveal);
  }
};
</script>
