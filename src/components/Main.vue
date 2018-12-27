<style lang="less" scoped>
.container {
  width: 60%;
  height: 500px;
  margin: 0.2rem auto;
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
}
</style>


<template>
  <div class="container f">
    <ul class="row">
      <li v-for="item in $store.state.contentLst" @click="goDetail(item)">
        <h2>{{item.title}}</h2>
        <p
          class="line line3"
        >{{item.content}}</p>
        <span>{{item.time}}</span>
      </li>
    </ul>

    <div class="right f1">
      <div class="tags">
        <h4>
          <a>CLASSIFICATION</a>
        </h4>
        <ul class="tags-i f fw">
          <li>前端开发</li>
          <li>javaScript</li>
          <li>nodeJs</li>
          <li>umijs</li>
          <li>react</li>
          <li>vue</li>
          <li>egg</li>
        </ul>
      </div>
      <div class="tags f fv">
        <h4>
          <a>ABOUT ME</a>
        </h4>
        <img class="aboutMe" src="../assets/irv.jpg">
        <span class="desc">我终将在代码里埋下雷，就像当初你说我是个好人</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      vm: {
        pageindex: 1,
        pageSize: 10,
        status: 1
      }
    };
  },
  methods:{
    goDetail(item){
      console.log(item)
      this.tools.goNewPage(`/Detail?id=${item.id}`,this)
      console.log(this.tools)
    }
  },
  mounted() {
    this.$store.dispatch("getContent", this.vm);
  }
};
</script>
