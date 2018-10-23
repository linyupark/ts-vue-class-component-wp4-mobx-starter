import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/**
 * 路由 EventBus
 */
const routerObserver = new Vue();

/**
 * 路由创建
 */
const routerCreate = (path, name, conf) => {
  return {
    name,
    path,
    component: () => {
      return import(/* webpackChunkName: "[request]" */ `@page/${name}`);
    },
    ...conf
  };
};

/**
 * 定义
 */
let router = new Router({
  routes: [
    routerCreate('/', 'home-page', {
      meta: {
        title: 'Home'
      }
    }),
    routerCreate('/test', 'test-page', {
      meta: {
        title: 'Test'
      }
    }),
  ]
});

/**
 * 拦截
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export { routerObserver, router };
