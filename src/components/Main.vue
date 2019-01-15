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
  li h2 {
    font-size: 0.26rem;
    line-height: 1.3;
    margin-bottom: 0.1rem;
  }
  li p {
    font-style: italic;
    color: #a3a3a3;
    font-size: 0.12rem;
    margin-bottom: 0.1rem;
  }
  li p:hover {
    color: #0085a1;
  }
  li span {
    font-family: Lora, "Times New Roman", serif;
    color: gray;
    font-size: 0.18rem;
    font-style: italic;
  }
}
</style>


<template>
  <div class="container f">
    <ul class="row" v-loading="$store.state.loading">
      <li v-for="item in $store.state.contentLst" @click="goDetail(item)" v-cloak>
        <h2 class="rv">{{item.title}}</h2>
        <p class="line line3 rv">{{item.content}}</p>
        <span class="rv">{{item.time}}</span>
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
      let { $store, vm } = this;
      vm.pageindex = e;
      $store.commit("ChangeLoading", true);
      await $store.dispatch("getContent", vm);
      $store.commit("ChangeLoading", false);
      this.vm.pageindex = e;
    }
  },
  async mounted() {
    const { $store, vm } = this;
    $store.commit("ChangeLoading", true);
    await $store.dispatch("getContent", vm);
    $store.commit("ChangeLoading", false);
    this.tools.scrollAnimate(this.scrollReveal);
  }
};
</script>
