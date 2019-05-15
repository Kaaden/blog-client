<template>
  <div style="padding:30px">
    <input v-model="url">
    <button @click="submit">获取</button>
    <div>{{vm.title}}</div>
    <div>${{vm.price}}</div>
    <div>
      <div>swiper</div>
      <img style="width:100px;height:100px" v-for="(item,index)  in vm.imgs" :key="index" :src="item">
    </div>

     <div>
       <div>content</div>
      <img style="width:100px;height:100px" v-for="(item,index)  in vm.content" :key="index" :src="item">
    </div>
  </div>
</template>

<script>
import { request } from "../service.js";
export default {
  name: "home",
  data() {
    return {
      url: "",
      vm: ""
    };
  },
  methods: {
    async submit() {
      const url = this.url;
      let { data } = await request({
        method: "post",
        // url:"http://localhost:8009/fetchtb",
        url: "http://fetchtb.jishutuan.com/fetchtb",
        contentType: "application/x-www-form-urlencoded",
        data: { url }
      });
      if (!data.error) {
        this.vm = data.data;
      }
      console.log(data);
    }
  }
};
</script>
