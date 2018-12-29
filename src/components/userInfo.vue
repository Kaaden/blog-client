<style lang="less" scoped>
.right {
  margin-left: 5%;
  .tags {
    padding: 0.1rem 0.2rem;
    border-top: 1px solid #eee;
    .tags-i {
      margin-top: 0.2rem;
      li {
        border: 1px solid #bfbfbf;
        border-radius: 999em;
        padding: 0 0.1rem;
        line-height: 0.24rem;
        font-size: 0.12rem;
        text-decoration: none;
        margin-right: 0.1rem;
        color: #bfbfbf;
        margin-bottom: 6px;
      }
      li:hover {
        border: 1px solid #0085a1;
        color: #0085a1;
      }
    }
    .aboutMe {
      width: 2.5rem;
      margin-top: 0.2rem;
      border-radius: 0.05rem;
    }
    .desc {
      color: #bfbfbf;
      font-size: 0.14rem;
      margin-top: 0.2rem;
      padding-right: 0.2rem;
    }
  }
}
</style>


<template>
  <div class="right f1">
    <div class="tags">
      <h4 @click="changeTag('','')">
        <a>CLASSIFICATION</a>
      </h4>
      <ul class="tags-i f fw">
        <li v-for="(item,index) in $store.state.Tags" @click="changeTag(index,item)">{{item}}</li>
      </ul>
    </div>
    <div class="tags f fv">
      <h4>
        <a>ABOUT ME</a>
      </h4>
      <img class="aboutMe" :src="$store.state.user.logo">
      <span class="desc">{{$store.state.user.desc}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {};
  },
  methods: {
    async changeTag(index, category) {
      let payload = {
        pageindex: 1,
        pageSize: 10,
        status: 1,
        category
      };
      await this.$store.dispatch("getContent", payload);
      this.$store.commit("ChangeTagSel", index);
      this.tools.goNewPage(`/Tags`, this);
    }
  },
  mounted() {
    if (this.$store.state.Tags.length === 0) {
      this.$store.dispatch("getTags");
    }
    if (this.$store.state.user === "") {
      this.$store.dispatch("getUser");
    }
  }
};
</script>
