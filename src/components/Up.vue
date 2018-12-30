<style lang="less" scoped>
.uptop{
    position:fixed;
    bottom: 5%;
    right: 5%;
    font-size: 0.3rem;
    width:0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: #0085a1;
    color:#fff;
    text-align: center;
    line-height: 0.6rem;
    cursor: pointer;
    transition: all 0.3s ease;
}
.show{
    opacity: 1;
    visibility: visible;
}
.hidden{
    opacity: 0;
    visibility: hidden;
}
</style>


<template>
  <i class="el-icon-upload2 uptop" @click="up"  :class="$store.state.scrollTop?'show':'hidden'"></i>
</template>

<script>
export default {
  name: "Up",
  data() {
    return {};
  },
  methods: {
      up(){
          document.documentElement.scrollTop=0
          this.$store.commit("ChangeScroll", false);
      }
  }
};
</script>
