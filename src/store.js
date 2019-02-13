import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getBing, getContent, getDetail, getTags, getUser, getConfig, checkConfig } from "./service";
export default new Vuex.Store({
  state: {
    topLing: {
      name: "Kaaden",
      tip: "一个不甘寂寞的码畜"
    },
    bingImg: "",
    contentLst: [],
    // contentTotal: 0,
    detail: "",
    Tags: [],
    TagSel: "",
    TagsContent: {},
    user: "",
    loading: false,
    scrollTop: false,
    stopFetch: false,
    showBg: false,
  },
  mutations: {
    ChangeScroll(state, payload) {
      state.scrollTop = payload
    },
    ChangeBg(state, payload) {
      state.showBg = payload
    },
    ChangeLoading(state, payload) {
      state.loading = payload
    },
    ChangeFetch(state, payload) {
      if(!payload){
        state.contentLst=[]
      }
      state.stopFetch = payload
    },
    SaveBing(state, payload) {
      const { url, name, tip } = payload
      state.bingImg = url
      state.topLing.name = name
      state.topLing.tip = tip
      state.topLing.time = ""
    },
    SaveContent(state, payload) {
      const { list } = payload
      if (list.length) {
        for (let i = 0, len = list.length; i < len; i++) {
          list[i].content = list[i].content && list[i].content.replace(/<[^>]+>/g, "").replace(/↵/g, "");//去除所有html标签
        }
        state.stopFetch = false
      } else {
        state.stopFetch = true
      }
      state.contentLst = [...state.contentLst, ...list]
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
      if (!payload.url) {
        let { data } = await getBing()
        payload.url = data.url
      }
      commit("SaveBing", { ...payload })
    },
    // 获取列表
    async getContent({ commit, state }, payload) {
      if (state.stopFetch) {
        return
      }
      commit("ChangeLoading", true)
      let { data } = await getContent(payload)
      commit("ChangeLoading", false)
      commit("SaveContent", { list: data.list })
    },
    //详情
    async getDetail({ commit }, payload) {
      commit("ChangeLoading", true);
      let { data } = await getDetail({ id: payload })
      if (!data) {
        commit("ChangeLoading", false);
        return
      }
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
    },
    async getConfig({ dispatch }, para) {
      let changeData
      let config = window.sessionStorage.getItem("config")
      if (!config) {
        let { data } = await getConfig({ status: true })
        changeData = data.data
        window.sessionStorage.setItem("config", JSON.stringify(data.data))
      } else {
        config = JSON.parse(config)
        let hasUpdate = await checkConfig({ id: config.id, time: config.time })
        if (hasUpdate.data.isUpdate) {
          changeData = hasUpdate.data.data
          window.sessionStorage.setItem("config", JSON.stringify(hasUpdate.data.data))
        } else {
          changeData = config
        }
      }
      exChangeConfig(para, dispatch, changeData)
    }

  }
})
// 配置切换
const exChangeConfig = (route, dispatch, data) => {
  let hasData
  switch (route) {
    case "/":
      hasData = {
        name: data.hometitle,
        tip: data.homelevel,
        url: ""
      }
      break;
    case "/About":
      hasData = {
        name: data.aboutitle,
        tip: data.aboutlevel,
        url: data.aboutImg
      }
      break;
    case "/Tags":
      hasData = {
        name: data.tagstitle,
        tip: data.tagslevel,
        url: data.tagsImg
      }

      break;
  }
  dispatch("getBing", {
    name: hasData.name,
    tip: hasData.tip,
    url: hasData.url
  });
}