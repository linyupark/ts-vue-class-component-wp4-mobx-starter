import Vue from 'vue';
import App from './App';
import { router } from '@config/router';
import AppGlobal from '@lib/appGlobal';
import PluginRem from '@lib/vue-rem-plugin';
Vue.use(PluginRem);

// 全局数据注入
Vue.prototype.$App = AppGlobal;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});