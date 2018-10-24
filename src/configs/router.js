import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/**
 * 路由 EventBus
 */
const routerObserver = new Vue();

export const routerPageMap = {
  home: { path: '/', name: 'home-page', meta: { title: '首页' } },
  test: { path: '/test', name: 'test-page', meta: { title: '测试页' } },
};

/**
 * 定义
 */
let router = new Router({
  routes: Object.keys(routerPageMap).map(key => {
    return {
      ...routerPageMap[key],
      component: () => import(
        /* webpackChunkName: "[request]" */ 
        `@page/${routerPageMap[key].name}`
      )
    }
  })
});

/**
 * 拦截
 */
router.beforeEach((to, from, next) => {
  routerObserver.$emit('to', to);
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export { routerObserver, router };
