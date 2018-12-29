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
    <div class="container">
      <ul class="tag-ie f fw">
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
            <li v-for="it in item.list" @click="goDetail(it)">{{it.title}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../components/Head";
export default {
  name: "Tags",
  components: {
    Header
  },
  data() {
    return {
      vm: {
        pageindex: 1,
        pageSize: 10,
        status: 1,
        category: ""
      }
      // td: {}
    };
  },
  methods: {
    async selChange(index, category) {
      let vm = {
        pageindex: 1,
        pageSize: 10,
        status: 1,
        category
      };
      await this.$store.dispatch("getContent", vm);
      this.$store.commit("ChangeTagSel", index);
      // this.td = this.getData();
    },
    goDetail(item) {
      this.tools.goNewPage(`/Detail?id=${item.id}`, this);
    },
    getData() {
      let vm = [];
      let data = this.$store.state.contentLst;
      if (data.length) {
        data.map(item => {
          if (vm.length == 0) {
            vm.push({ category: item.category, list: [item] });
          } else {
            let index = vm.findIndex(it => it.category === item.category);
            if (index === -1) {
              vm.push({ category: item.category, list: [item] });
            } else {
              vm[index].list.push(item);
            }
          }
        });
        return vm;
      } else {
        return {};
      }
    }
  },
  async mounted() {
    this.$store.dispatch("getBing", {
      name: "TAGS",
      tip: "Find the right one for you",
      url: "https://fairyly.github.io/myblog/img/about-bg.jpg"
    });
    this.$store.dispatch("getTags");
    if (this.$store.state.TagSel === "") {
      await this.$store.dispatch("getContent", this.vm);
      this.$store.commit("ChangeTagSel", "");
    }
  }
};
</script>
