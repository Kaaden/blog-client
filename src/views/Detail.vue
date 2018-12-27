<template>
  <div>
    <Header>
        
    </Header>
    <div>{{$store.state.detail.content}}||"1"</div>
  </div>
</template>

<script>
import Header from "../components/Head";
export default {
  name: "home",
  components: {
    Header,
  },
  mounted(){
      let id=this.$route.query.id
      this.$store.dispatch("getDetail",id)
    
  }
};
</script>
