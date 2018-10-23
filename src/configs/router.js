import Vue from 'vue';
import Router from 'vue-router';
import routerPath from './router.names';

Vue.use(Router);

/**
 * 路由字典注入全局
 */
Vue.prototype.$routerPath = routerPath;

/**
 * 路由 EventBus
 */
const routerObserver = new Vue();

/**
 * 定义
 */
let router = new Router({
  routes: [
    {
      name: routerPath.home,
      path: '/'
    },
    {
      name: routerPath.test,
      path: '/test',
      component: () => import(/* webpackChunkName: "test-page" */ '@page/TestPage')
    }
  ]
});

/**
 * 拦截
 */
router.beforeEach((to, from, next) => {
  next();
});

export { routerObserver, router };
