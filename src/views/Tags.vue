<style lang="less" scoped>
.tag-ie {
  li {
    background: #d6d6d6;
    border-radius: 999em;
    padding: 0 0.1rem;
    line-height: 0.24rem;
    font-size: 0.12rem;
    text-decoration: none;
    margin-right: 0.1rem;
    color: #fff;
    margin-bottom: 6px;
    cursor: pointer;
  }
  li:hover {
    background: #0085a1;
    color: #fff;
  }
}
.title {
  font-family: "beyno";
  margin-top: 0.2rem;
  color: #0085a1;
  font-size: 0.24rem;
  > span {
    margin-left: 0.1rem;
  }
}
.list {
  margin-left: 0.3rem;
  li {
    color: #404040;
    padding: 0.2rem 0;
    border-bottom: 1px solid #eee;
    line-height: 1.3;
    font-weight: 300;
    cursor: pointer;
  }
  li:hover {
    color: #0085a1;
  }
}
.selLi {
  background: #0085a1 !important;
  color: #fff !important;
}
</style>

<template>
  <div>
    <Header></Header>
    <div class="container" v-loading="$store.state.loading">
      <ul class="tag-ie f fw rv">
        <li :class="$store.state.TagSel===''?'selLi':''" @click="selChange('','')">全部</li>
        <li
          v-for="(item,index) in $store.state.Tags"
          @click="selChange(index,item)"
          :class="$store.state.TagSel===index?'selLi':''"
        >{{item}}</li>
      </ul>

      <ul>
        <li v-for="item in $store.state.TagsContent">
          <div class="title">
            <i class="el-icon-info"></i>
            <span>{{item.category}}</span>
          </div>
          <ul class="list">
            <li v-for="it in item.list" @click="goDetail(it)" class="rv">{{it.title}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <Up></Up>
  </div>
</template>

<script>
import Header from "../components/Head";
import Up from "../components/Up";
import scrollReveal from "scrollReveal";
export default {
  name: "Tags",
  components: {
    Header,
    Up
  },
  data() {
    return {
      vm: {
        pageindex: 1,
        pageSize: 10000,
        status: 1,
        category: ""
      },
      scrollReveal: scrollReveal()
    };
  },
  methods: {
    async selChange(index, category) {
      const { $store } = this;
      let vm = {
        pageindex: 1,
        pageSize: 10000,
        status: 1,
        category
      };
      $store.commit("ChangeLoading", true);
      await $store.dispatch("getContent", vm);
      await $store.commit("ChangeTagSel", index);
      $store.commit("ChangeLoading", false);
    },
    goDetail(item) {
      this.tools.goNewPage(`/Detail?id=${item.id}`, this);
    }
  },
  async mounted() {
    const { $store } = this;
    $store.commit("ChangeLoading", true);
    $store.dispatch("getBing", {
      name: "TAGS",
      tip: "Find the right one for you",
      url: "http://kaaden.orrzt.com/public/about-bg.jpg"
    });
    if ($store.state.Tags.length === 0) {
      $store.dispatch("getTags");
    }
    if ($store.state.TagSel === "") {
      await $store.dispatch("getContent", this.vm);
      $store.commit("ChangeTagSel", "");
    }
    $store.commit("ChangeLoading", false);
    this.tools.scrollAnimate(this.scrollReveal);
  }
};
</script>
