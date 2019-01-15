<style lang="less" scoped>
.header {
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 4.7rem;
  position: relative;
  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  .header-title {
    color: #fff;
    font-size: 0.25rem;
    font-family: "beyno";
  }
  .header-nav {
    display: flex;
    li {
      display: inline-block;
      color: #fff;
      margin-left: 1rem;
      font-weight: 800;
      font-size: 0.16rem;
      cursor: pointer;
    }
    li:hover {
      color: #777;
    }
  }
  .header-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-family: "beyno";
    font-size: 0.18rem;
    z-index: 3;
    > strong {
      font-size: 0.55rem;
      margin-bottom: 0.1rem;
    }
    .pad {
      padding-left: 0.3rem;
    }
    .header-time {
      font-family: Lora, "Times New Roman", serif;
      font-style: italic;
      font-weight: 400;
      font-size: 0.24rem;
      color: #fff;
      margin-top: 0.3rem;
    }
  }
  .header-top {
    width: 100%;
    height: 0.8rem;

    padding: 0 0.3rem;
    z-index: 3;
    transition: all 0.3s ease-out;
  }
  .header-posi {
    position: absolute;
    top: 0;
    left: 0;
  }
  .header-fix {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>


<template>
  <div class="header f fj" :style="{'background-image':`url(${$store.state.bingImg})`}" v-cloak>
    <div class="header-bg"></div>
    <div
      class="header-top f fj fc"
      :class="$store.state.scrollTop===false?'header-posi':'header-fix'"
      v-cloak
    >
      <a class="header-title" href="/">Kaaden Blog</a>
      <ul class="header-nav">
        <li v-for="item in header" @click="goNav(item.id)" v-cloak>{{item.name}}</li>
      </ul>
    </div>
    <div :class="$store.state.topLing.time===''?'fc':''" class="header-center f fv">
      <strong
        class="rv"
        :class="$store.state.topLing.time===''?'':'pad'"
        v-cloak
      >{{$store.state.topLing.name}}</strong>
      <span
        class="rv"
        style="font-weight: 400;font-size:0.3rem"
        v-cloak
      >{{$store.state.topLing.tip}}</span>
      <span class="header-time rv" v-cloak>{{$store.state.topLing.time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      header: [
        { id: 1, name: "HOME" },
        { id: 2, name: "ABOUT" },
        { id: 3, name: "TAGS" }
      ]
    };
  },
  methods: {
    goNav(type) {
      let url = "";
      switch (type) {
        case 1:
          url = "/";
          break;
        case 2:
          url = "/About";
          break;
        case 3:
          url = "/Tags";
          break;
      }
      this.tools.goNewPage(url, this);
    },
    scorll(e) {
      const { $store } = this;
      e = e || window.event;
      let documentScroll = document.documentElement.scrollTop;
      if (documentScroll === 0) {
        $store.commit("ChangeScroll", false);
        return;
      }
      if (e.wheelDelta) {
        //第一步：先判断浏览器IE，谷歌滑轮事件
        e.wheelDelta > 0
          ? $store.commit("ChangeScroll", true)
          : $store.commit("ChangeScroll", false);
      } else if (e.detail) {
        e.detail > 0
          ? $store.commit("ChangeScroll", true)
          : $store.commit("ChangeScroll", false);
      } else {
        $store.commit("ChangeScroll", false);
      }
    }
  },
  mounted() {
    var scrollFunc = this.scorll;
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
      document.addEventListener("DOMMouseScroll", scrollFunc, false);
    }
    //滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = scrollFunc;
  }
};
</script>
