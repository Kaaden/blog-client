import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from "./views/Detail.vue"
import Tags from "./views/Tags.vue"
import About from "./views/About.vue"
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/Tags',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },

  ]
})
