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
        cursor: pointer;
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
    .github {
      margin-top: 0.3rem;
      cursor: pointer;
      > i {
        color: #a1a2a3;
      }
      > i:hover {
        color: #0085a1;
      }
    }
  }
}
</style>


<template>
  <div class="right f1">
    <div class="tags">
      <h4 @click="changeTag('','')">
        <a class="rv">CLASSIFICATION</a>
      </h4>
      <ul class="tags-i f fw rv">
        <li v-for="(item,index) in $store.state.Tags" @click="changeTag(index,item)">{{item}}</li>
      </ul>
    </div>
    <div class="tags f fv">
      <h4 @click="goAbout">
        <a class="rv">ABOUT ME</a>
      </h4>
      <img class="aboutMe" :src="$store.state.user.logo">
      <span class="desc">{{$store.state.user.description}}</span>
      <div class="github f fc">
        <el-tooltip class="item" effect="dark" content="github" placement="top-start">
          <i class="dzicon icon-git" style="font-size:0.4rem" @click="goOpen(0)"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="admin" placement="top-start">
          <i
            class="dzicon icon-houtai1"
            style="font-size:0.43rem;margin-left:0.15rem"
            @click="goOpen(1)"
          />
        </el-tooltip>
      </div>
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
    },
    goAbout() {
      this.tools.goNewPage(`/About`, this);
    },
    goOpen(type) {
      type === 1
        ? window.open("http://kaaden.orrzt.com/admin#/")
        : window.open("https://github.com/Kaaden");
    }
  },
  mounted() {
    if (this.$store.state.Tags.length === 0) {
      this.$store.dispatch("getTags");
    }
  }
};
</script>
