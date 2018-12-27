import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getBing, getContent, getDetail } from "./service";
export default new Vuex.Store({
  state: {
    topLing: {
      name: "Kaaden",
      tip: "一个不甘寂寞的码畜"
    },
    bingImg: "",
    contentLst: [],
    contentTotal: 0,
    detail: ""
  },
  mutations: {
    SaveBing(state, payload) {
      state.bingImg = payload
      state.topLing.name = "Kaaden"
      state.topLing.tip = "一个不甘寂寞的码畜"
      state.topLing.time=""
    },
    SaveContent(state, payload) {
      const { total, list } = payload
      state.contentLst = list
      state.contentTotal = total
    },
    SaveDetail(state, payload) {
      state.bingImg = payload.img
      state.topLing.name = payload.title
      state.topLing.tip = payload.category
      state.topLing.time=payload.time
      state.detail = payload
    }
  },
  actions: {
    //获取每日一图
    async getBing({ commit }, payload) {
      let { data } = await getBing()
      commit("SaveBing", data.url)
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
      console.log(data)
    }

  }
})
