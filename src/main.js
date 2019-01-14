import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { tools } from "./assets/tools";
import "./assets/base.css";
Vue.config.productionTip = false;
//监听页面变化
window.addEventListener("resize", () => {
  tools.fontSize();
})

Vue.use(ElementUI);
Vue.prototype.tools = tools; //挂载全局方法调用
new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    tools.fontSize();
  },
}).$mount('#app')
