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
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    z-index: 3;
  }
  .header-nav {
    display: flex;
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    z-index: 3;
    li a {
      display: inline-block;
      color: #fff;
      width: 1rem;
      font-weight: 800;
      font-size: 0.16rem;
    }
    li a:hover {
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
    .pad{
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
}
</style>


<template>
  <div class="header f fj" :style="{'background-image':`url(${$store.state.bingImg})`}">
    <div class="header-bg"></div>
    <a class="header-title" href="/">Kaaden Blog</a>
    <ul class="header-nav">
      <li>
        <a>HOME</a>
      </li>
      <li>
        <a>ABOUT</a>
      </li>
      <li>
        <a>TAGS</a>
      </li>
    </ul>
    <div :class="$store.state.topLing.time===''?'fc':''" class="header-center f fv">
      <strong class="line line1" :class="$store.state.topLing.time===''?'':'pad'">{{$store.state.topLing.name}}</strong>
      <span style="font-weight: 400;font-size:0.3rem">{{$store.state.topLing.tip}}</span>
      <span class="header-time">{{$store.state.topLing.time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {};
  }
};
</script>
