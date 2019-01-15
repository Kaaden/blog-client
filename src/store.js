import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getBing, getContent, getDetail, getTags, getUser } from "./service";
export default new Vuex.Store({
  state: {
    topLing: {
      name: "Kaaden",
      tip: "一个不甘寂寞的码畜"
    },
    bingImg: "",
    contentLst: [],
    contentTotal: 0,
    detail: "",
    Tags: [],
    TagSel: "",
    TagsContent: {},
    user: "",
    loading: false,
    scrollTop: false,
  },
  mutations: {
    ChangeScroll(state, payload) {
      state.scrollTop = payload
    },
    ChangeLoading(state, payload) {
      state.loading = payload
    },
    SaveBing(state, payload) {
      const { url, name, tip } = payload
      state.bingImg = url
      state.topLing.name = name
      state.topLing.tip = tip
      state.topLing.time = ""
    },
    SaveContent(state, payload) {
      const { total, list } = payload
      if (list.length) {
        list.map(item => {
          item.content = item.content && item.content.replace(/<[^>]+>/g, "")//去除所有html标签
          item.content = item.content && item.content.replace(/↵/g, "");
        })
      }
      state.contentLst = list
      state.contentTotal = total
    },
    SaveDetail(state, payload) {
      state.bingImg = payload.img ? payload.img : state.bingImg
      state.topLing.name = payload.title
      state.topLing.tip = payload.category
      state.topLing.time = payload.time
      state.detail = payload
    },
    SaveTags(state, payload) {
      state.Tags = payload
    },
    ChangeTagSel(state, payload) {
      state.TagSel = payload
      let vm = [];
      let data = state.contentLst;
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
        state.TagsContent = vm;
      } else {
        state.TagsContent = {};
      }
    },
    SaveUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    //获取每日一图
    async getBing({ commit }, payload) {
      let url
      if (!payload.url) {
        let { data } = await getBing()
        url = data.url
      } else {
        url = payload.url
      }

      commit("SaveBing", { url, ...payload })
    },
    // 获取列表
    async getContent({ commit }, payload) {
      let { data } = await getContent(payload)
      if (data.isok) {
        commit("SaveContent", { list: data.list, total: data.total })
      }
    },
    //详情
    async getDetail({ commit }, payload) {
      let { data } = await getDetail({ id: payload })
      if (data.isok) {
        commit("SaveDetail", data.data)
      }
      commit("ChangeLoading", false);
    },
    async getTags({ commit }, ) {
      let { data } = await getTags()
      if (data.isok) {
        commit("SaveTags", data.data)
      }
    },
    async getUser({ commit }) {
      let { data } = await getUser()
      if (data.isok) {
        commit("SaveUser", data.data)
      }
    }

  }
})
